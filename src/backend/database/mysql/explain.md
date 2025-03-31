---
title:  Explain详解
icon: pen-to-square
date: 2023-11-19
category:
  - MySQL
tag:
  - SQL
  - Database
---
# Explain详解

## 目录

- [Explain 工具的作用](#Explain-工具的作用)
- [Explain的使用](#Explain的使用)
  - [explain](#explain)
    - [id](#id)
    - [select\_type](#select_type)
    - [type（重要）](#type重要)
    - [possible\_keys](#possible_keys)
    - [key](#key)
    - [key\_len（重要）](#key_len重要)
    - [row](#row)
    - [Extra（重要）](#Extra重要)
- [SQL的优化实践](#SQL的优化实践)
  - [生成数据](#生成数据)
    - [建表](#建表)
    - [创建存储过程构建10万数据](#创建存储过程构建10万数据)
    - [courses 表信息](#courses-表信息)
  - [开始实战](#开始实战)
    - [慢SQL查询](#慢SQL查询)
      - [慢SQL参数解析](#慢SQL参数解析)
      - [配置](#配置)
      - [日志分析工具](#日志分析工具)
    - [联合索引](#联合索引)
    - [join](#join)
      - [嵌套循环连接Nested-Loop Join(NLJ) 算法](#嵌套循环连接Nested-Loop-JoinNLJ-算法)
      - [基于块的嵌套循环连接 Block Nested-Loop Join(BNL)算法](#基于块的嵌套循环连接-Block-Nested-Loop-JoinBNL算法)
    - [in 和 exist](#in-和-exist)
    - [count](#count)
- [索引失效场景](#索引失效场景)
  - [对索引使用左或者左右模糊查询](#对索引使用左或者左右模糊查询)
  - [对索引使用函数](#对索引使用函数)
  - [对索引进行隐式类型转换](#对索引进行隐式类型转换)

### Explain 工具的作用

MySQL 的 SQL优化，离不开一个MySQL提供的一个工具，Explain，MySQL的EXPLAIN工具是一个非常有用的功能，它用于分析SELECT查询语句的执行计划。通过EXPLAIN，用户可以了解MySQL是如何执行查询的，包括如何连接表、如何使用索引、查询的顺序以及哪些表可能会被用到等。

该工具是我们优化SQL的一个得力助手，通过他我们可以得知很多SQL执行的信息：

- **查看查询类型**：EXPLAIN可以显示查询是简单还是复杂，是全表扫描还是索引查找。
- **显示表顺序**：在多表连接查询中，EXPLAIN可以显示MySQL执行查询时读取表的顺序。
- **显示使用索引**：EXPLAIN会显示查询中是否使用了索引，以及使用了哪些索引。
- **查看索引使用情况**：它可以告诉你MySQL是否选择了正确的索引，以及索引的效率如何。
- **估算成本**：EXPLAIN会为每个查询的执行计划提供一个估算的成本值，这有助于比较不同查询计划的效率。
- **查看数据行数**：EXPLAIN可以显示MySQL预计会扫描的行数，这对于评估查询性能非常有用。
- **查找潜在问题**：通过EXPLAIN分析查询计划，可以找出潜在的性能问题，比如全表扫描、文件排序等。

Explain其实就是模拟Mysql提供的一个组件（优化器）执行查询语句，然后记录下各种信息帮助我们理解查询是如何执行的，以及发现瓶颈，优化查询性能。

### Explain的使用

在使用Explain之前，我们可以先构建几张简单的测试表和测试数据

首先是学生表，这里面涵盖了一个主键索引和birth\_date的普通索引

```sql
CREATE TABLE `students` (
  `student_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `birth_date` DATE NOT NULL,
  PRIMARY KEY (`student_id`),
  INDEX `idx_birth_date` (`birth_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


###具体数据
INSERT INTO `students` (`first_name`, `last_name`, `birth_date`) VALUES
('Alice', 'Smith', '2000-05-15'),
('Bob', 'Johnson', '2001-07-23'),
('Charlie', 'Williams', '2002-09-10'),
('David', 'Brown', '2003-12-01'),
('Eva', 'Jones', '2004-03-05');

 students
```


第二张是学生成绩表，`score_id` 是主键索引，`student_id` 有一个普通索引，而 `subject` 和 `score` 则构成了一个联合索引

```sql
CREATE TABLE `student_scores` (
  `score_id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `subject` VARCHAR(50) NOT NULL,
  `score` INT NOT NULL,
  PRIMARY KEY (`score_id`),
  INDEX `idx_student_id` (`student_id`),
  INDEX `idx_subject_score` (`subject`, `score`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


###具体数据
INSERT INTO `student_scores` (`student_id`, `subject`, `score`) VALUES
(1, 'Math', 95),
(1, 'Science', 88),
(2, 'Math', 76),
(2, 'Science', 90),
(3, 'Math', 85),
(3, 'Science', 85),
(4, 'Math', 92),
(4, 'Science', 78),
(5, 'Math', 89),
(5, 'Science', 95);

 student_scores
```


第三个是学生班级表，在这个表中，`class_id` 是主键索引，而 `class_name` 和 `teacher_id` 构成了一个联合索引

```sql
CREATE TABLE `student_classes` (
  `class_id` INT NOT NULL AUTO_INCREMENT,
  `class_name` VARCHAR(50) NOT NULL,
  `teacher_id` INT NOT NULL,
  PRIMARY KEY (`class_id`),
  INDEX `idx_class_name_teacher_id` (`class_name`, `teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

###具体数据
INSERT INTO `student_classes` (`class_name`, `teacher_id`) VALUES
('Class A', 101),
('Class B', 102),
('Class C', 103),
('Class D', 104),
('Class E', 105);

 student_classes
```


最后是学生附加信息表，other\_info，其中id为主键

```sql
CREATE TABLE `other_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name_eng` varchar(100) DEFAULT NULL,
  `hobby` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


### 具体数据
INSERT INTO test.other_info
(id, name_eng, hobby)
VALUES(1, 'kun', 'basketball');


```


#### explain

explain的使用还是非常简单的，只需要在我们执行的SQL语句前面添加explain即可

```sql
EXPLAIN SELECT STUDENT_ID, FIRST_NAME, LAST_NAME, BIRTH_DATE
FROM students s ;

```


执行完成以后会得到下面的结果，当然不同的Mysql 版本结果可能会大同小异

```text
id|select_type|table|partitions|type|possible_keys|key|key_len|ref|rows|filtered|Extra|
--+-----------+-----+----------+----+-------------+---+-------+---+----+--------+-----+
 1|SIMPLE     |s    |          |ALL |             |   |       |   |   5|   100.0|     |
```


首先先得认识一下查询出来的这几个结果，这些结果对我们分析SQL是起到很大作用的

##### id

该值可以看成Mysql将一个完整的SQL拆分成了多段SQL，然后ID如果相同可以认为是一组SQL，且如果ID越大，优先级越高，执行得越早

##### select\_type

select\_type是有几个结果的

1. simple ： 简单查询，查询不包含子查询和union的查询
   1. 像单表查询，不涉及多表的情况下，就属于简单查询
      ```sql
      EXPLAIN SELECT STUDENT_ID, FIRST_NAME, LAST_NAME, BIRTH_DATE
      FROM students s ;
      ```

2. primary：复杂查询中最外层的select
   1. 外层包裹着select ，含有子查询的就属于复杂查询
      ```sql
      select (select  1  from students  s where s.student_id = 1)
      from students s2
      ```

3. subquery：包含在select中的子查询
   1. 在select的时候包含子查询
      ```sql
      select (select  1  from students  s where s.student_id = 1)
      from students s2
      ```

4. derived：包含在from子句中的子查询，Mysql会将结果存放在一个临时表中，也称为派生表
   1. 先执行以下语句，关闭派生合并
      ```sql
      set session OPTIMIZER_SWITCH = 'derived_merge=off'
      ```

   2. 再执行语句
      ```sql
      select ( select 1 from students s where s.student_id = 1) from (select 1
      from student_scores ss where ss.score_id = 1) aa
      ```


##### type（重要）

该列表示关联类型或者访问类型，即Mysql决定如何查找表中的行，查找数据记录的大概范围

从最优到最差分别是：system > const > eq\_ref > ref > range > index > ALL

system ，const

mysql能够对查询的某部分进行优化并将其转为常量，用于primary key 或unique key的所有列和常数比较时，所以表最多有一个匹配行。&#x20;

```sql
explain SELECT student_id, first_name, last_name, birth_date
FROM test.students where student_id = 1;

--结果
id|select_type|table   |partitions|type |possible_keys|key    |key_len|ref  |rows|filtered|Extra|
--+-----------+--------+----------+-----+-------------+-------+-------+-----+----+--------+-----+
 1|SIMPLE     |students|          |const|PRIMARY      |PRIMARY|4      |const|   1|   100.0|     |

```


eq\_ref

primary\_key 或者unique\_key索引的所有部分被连接使用，最多只会返回一条符合条件的记录。

比如以下语句student\_id 和 id 都是各自表的主键，对应只有一条符合条件的记录，所以type是eq\_ref

```sql
explain select * from students s join other_info oi on s.student_id = oi.id 

--结果
id|select_type|table|partitions|type  |possible_keys|key    |key_len|ref       |rows|filtered|Extra      |
--+-----------+-----+----------+------+-------------+-------+-------+----------+----+--------+-----------+
 1|SIMPLE     |oi   |          |ALL   |PRIMARY      |       |       |          |   1|   100.0|           |
 1|SIMPLE     |s    |          |eq_ref|PRIMARY      |PRIMARY|4      |test.oi.id|   1|   100.0|Using where|

```


ref

相比起eq\_ref，不使用唯一索引，而是使用普通索引或者唯一性索引的部分前缀，索引要和某个值相比较，可能会找到多个符合条件的行数据

如下语句就没有全部采用主键索引，而是使用普通索引

```sql
explain select * from students s join student_scores ss  on s.student_id = ss.student_id

-- 结果
id|select_type|table|partitions|type|possible_keys |key           |key_len|ref              |rows|filtered|Extra|
--+-----------+-----+----------+----+--------------+--------------+-------+-----------------+----+--------+-----+
 1|SIMPLE     |s    |          |ALL |PRIMARY       |              |       |                 |   5|   100.0|     |
 1|SIMPLE     |ss   |          |ref |idx_student_id|idx_student_id|4      |test.s.student_id|   2|   100.0|     |
```


range

范围扫描通常出现在in(),between,>,<等范围查询的操作中，使用一个索引来检索给定范围的行数据

index

扫描全索引就能拿到结果集，一般是扫描某个二级索引，这种扫描不会从索引树根节点开始快速查找，而是直接对二级索引的叶子结点遍历和扫描，速度还是比较慢的。

```sql
explain select * from student_classes sc  

-- 结果
id|select_type|table|partitions|type |possible_keys|key                      |key_len|ref|rows|filtered|Extra      |
--+-----------+-----+----------+-----+-------------+-------------------------+-------+---+----+--------+-----------+
 1|SIMPLE     |sc   |          |index|             |idx_class_name_teacher_id|206    |   |   5|   100.0|Using index|

```


all

全表扫描，扫描索引的所有叶子结点，最慢

##### possible\_keys

这一列显示查询可能使用哪些索引来查找

##### key

这一列显示实际采用了哪个索引来优化对该表的访问，如果没有使用索引，结果为null

##### key\_len（重要）

使用索引的长度

计算规则如下：

- 字符串
  - char ：n字节长度
  - varchar：如果是utf-8 ，则是3n+2，其中2是存储的字符串长度
- 数值
  - tinyint ： 1字节
  - smallint：2字节
  - int：4字节
  - bigint：8字节
- 时间类型
  - date：3字节
  - timestamp：4字节
  - datetime：8字节
- 如果字段允许为null，需要1字节记录是否为null

索引最大长度为768字节，当字符串过长时，mysql会做一个类似左前缀索引的处理

##### row

这一列是mysql估计读取并检测的行数 ，但是这并不是实际查询出来的行数

##### Extra（重要）

附加信息

1. Using index
   1. 只需要跑索引表无需进行回表的查询方式
      ```sql
      SELECT student_id from students s 

      ```

2. Using where
   1. 使用where 语句处理结果集，并查询的列未被索引覆盖
      ```sql
      select s2.first_name  from students s2 where s2.last_name  = 'Smith'
      ```

3. Using temporary
   1. 需要创建一张临时表来处理查询，出现这一情况一般是要优化的

      比如说
      ```sql
      # first_name 使用了二级索引，直接遍历索引树即可获取
      select distinct first_name from students;

      # last_name 没有索引，通过临时表保存结果再处理
      select distinct last_name from students;
      ```

4. Using filesort

   将用外部排序而不是索引排序，数据较小时从内存排序，否则需要在磁盘完成排序。这种情况下一般 &#x20;
   也是要考虑使用索引来优化的
   ```sql
    #name 不是索引，所以以下执行结果为 Using filesort
    explain select * from `user` u order by u.name
   ```


## SQL的优化实践

通过以上学习，想必我们对explain会有一个综合性的了解，但是实验才能得真知，所以接下来我们就来耍耍explain，在此之前我们必须准备一张大表，不然可没有说服力喔\~

### 生成数据

#### 建表

```sql
-- `review-think-record`.courses definition

CREATE TABLE `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(100) NOT NULL,
  `teacher` varchar(50) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `student_count` int DEFAULT '0',
  `class_hours` int NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_online` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`course_id`),
) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE courses 
ADD INDEX idx_teacher_price_online (teacher, price, is_online);
 建表语句
```


#### 创建存储过程构建10万数据

```sql
-- 创建生成测试数据的存储过程
DELIMITER $$
CREATE PROCEDURE GenerateCourseData()
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE teachers_count INT DEFAULT 5;
    DECLARE course_prefix VARCHAR(20);
    DECLARE course_suffix VARCHAR(20);
    
    -- 开始事务
    START TRANSACTION;
    
    WHILE i < 100000 DO
        -- 生成随机课程名称
        SET course_prefix = ELT(FLOOR(1 + RAND() * 6), 
            '基础', '进阶', '高级', '实战', '理论', '专题');
        SET course_suffix = ELT(FLOOR(1 + RAND() * 6),
            '编程', '算法', '数据库', '网络', '安全', '人工智能');
            
        INSERT INTO courses (
            course_name,
            teacher,
            price,
            student_count,
            class_hours,
            start_date,
            end_date,
            is_online
        ) VALUES (
            CONCAT(course_prefix, course_suffix, '课程'),
            CONCAT('教师', FLOOR(1 + RAND() * teachers_count)),
            ROUND(100 + RAND() * 400, 2),
            FLOOR(50 + RAND() * 500),
            FLOOR(10 + RAND() * 50),
            NOW() - INTERVAL FLOOR(100 + RAND() * 365) DAY,
            NOW() + INTERVAL FLOOR(100 + RAND() * 365) DAY,
            ROUND(RAND())
        );
        
        SET i = i + 1;
    END WHILE;
    
    -- 提交事务
    COMMIT;
END$$
DELIMITER ;

{ CALL `review-think-record`.GenerateCourseData() }

```


#### courses 表信息

- 索引
  - 主键索引&#x20;
    - course\_id
  - 普通索引&#x20;
    - teacher
    - price
    - is\_online
  - 联合索引
    - teacher, price, is\_online

### 开始实战

#### 慢SQL查询

SQL优化的目的就是为SQL提速，令SQL更少地成为我们系统性能的瓶颈，不过在优化之前我们肯定需要先清楚哪些SQL是需要优化的吧\~，所以慢SQL的查询分析就尤为重要，而这需要依靠Mysql提供的慢SQL日志，Mysql的慢查询日志用来记录在MySQL中响应时间超过阀值的语句。

具体环境中，运行时间超过long\_query\_time值的SQL语句，则会被记录到慢查询日志中long\_query\_time的默认值为10，意思是记录运行10秒以上的语句。默认情况下，MySQL数据库并不启动慢查询日志，需要手动来设置这个参数。

##### 慢SQL参数解析

- slow\_query\_log：是否开启慢查询日志，1表示开启，0表示关闭。
- log-slow-queries ：旧版（5.6以下版本）MySQL数据库慢查询日志存储路径。可以不设置该参数，系统则会默认给一个缺省的文件host\_name-slow\.log
- slow-query-log-file：新版（5.6及以上版本）MySQL数据库慢查询日志存储路径。可以不设置该参数，系统则会默认给一个缺省的文件host\_name-slow\.log
- long\_query\_time：慢查询阈值，当查询时间多于设定的阈值时，记录日志。
- log\_queries\_not\_using\_indexes：未使用索引的查询也被记录到慢查询日志中（可选项）。
- log\_output：日志存储方式。log\_output='FILE'表示将日志存入文件，默认值是'FILE'。
- log\_output='TABLE'表示将日志存入数据库。

##### 配置

通过show variables  like '%slow\_query\_log%';可以查看慢SQL日志是否开启，其实如果不是为了SQL优化，平时也可以不开的，毕竟能省则省嘛\~

```sql
show variables  like '%slow_query_log%';

#结果
Variable_name      |Value                   |
-------------------+------------------------+
slow_query_log     |ON                      |
slow_query_log_file|CHINAMI-9UTFHL8-slow.log|

```


没开的话可以执行以下一句开启慢SQL日志

```sql
set global slow_query_log=1;
```


如果想要看慢SQL的阈值的话，可以执行以下命令，并且也可以通过命令修改这个阈值

```sql
show variables like 'long_query_time%';

# 设置慢SQL的执行阈值为4s
set global long_query_time=4;

```


当然如果想要修改日志的打印方式，可以使用以下命令

```sql
 show variables like '%log_output%';

 # 设置以表的形式进行输出
 set global log_output='TABLE';
 
 #查询慢SQL日志表记录
 select * from mysql.slow_log;
```


而接下来这项是比较有意思的，就是可以查询出没使用索引的SQL，这个在我调优过程中起着很大作用喔\~

```sql
show variables like 'log_queries_not_using_indexes';

#开启记录全表扫描选项
set global log_queries_not_using_indexes=1;

```


##### 日志分析工具

Mysql也提供着比较好用的日志分析工具，mysqldumpslow，它可以帮助我们对慢SQL的日志文件进行分析

```sql
# mysqldumpslow --help
 Usage: mysqldumpslow [ OPTS... ] [ LOGS... ]
 
Parse and summarize the MySQL slow query log. Options are
 
  --verbose    verbose
  --debug      debug
  --help       write this text to standard output
 
  -v           verbose
  -d           debug
  -s ORDER     what to sort by (al, at, ar, c, l, r, t), 'at' is default（排序方式）
                 al: average lock time（平均锁定时间）
                 ar: average rows sent（平均返回记录数）
                 at: average query time（平均查询时间）
                  c: count（访问计数）
                  l: lock time（锁定时间）
                  r: rows sent（返回记录）
                  t: query time（查询时间）
   -r           reverse the sort order (largest last instead of first)
   -t NUM       just show the top n queries（返回前面n条数据）
   -a           don't abstract all numbers to N and strings to 'S'
   -n NUM       abstract numbers with at least n digits within names
   -g PATTERN   grep: only consider stmts that include this string（正则匹配模式，大小写不敏感）
   -h HOSTNAME  hostname of db server for *-slow.log filename (can be wildcard),
                default is '*', i.e. match all
   -i NAME      name of server instance (if using mysql.server startup script)
   -l           don't subtract lock time from total time
```


用起来其实也简单，比如获取访问次数最多的10个SQL

```sql
mysqldumpslow -s c -t 10 /database/mysql/mysql06_slow.log

```


#### 联合索引

1. 尽量符合最左匹配

   首先说到联合索引，我们尽量要做到索引覆盖，即条件查询的条件要跟我们创建的联合索引一致，当然最好就是满足最左匹配，虽然即便如下sql不满足最左匹配，但是mysql内置的优化器其实是会帮助我们做语句优化的，所以的出来的结果是仍是走了索引，但是我们想想，MySQL优化也是一种消耗嘛\~，既然是性能优化，我们就不要有一点点的性能浪费\~
   ```sql
     # KEY `idx_teacher_price_online` (`teacher`,`price`,`is_online`)
     
   explain SELECT course_id, course_name, teacher, price, student_count, class_hours, start_date, end_date, is_online, created_at
   FROM `review-think-record`.courses2 where teacher = '教师3'  and  price > 300 and  is_online = 1

   #结果：
   id|select_type|table  |partitions|type|possible_keys                                            |key       |key_len|ref  |rows |filtered|Extra      |
   --+-----------+-------+----------+----+---------------------------------------------------------+----------+-------+-----+-----+--------+-----------+

     1|SIMPLE     |courses|          |ref |idx_teacher,idx_price,idx_online,idx_teacher_price_online|idx_online|2      |const|49896|    25.0|Using where|

   ```

2. 联合索引的第一个字段最好别用范围查询

   mysql内部可能觉得第一个字段就用范围，结果集应该很大，回表效率不高，还不如就全表扫描
3. in 和 or 如果数据量比较大时会走索引，但是如果记录不多可能会跑全表

   这取决于优化器通过计算后的结果来判断是走索引还是全表成本高而定的，另外in或者or后面如果跟范围查询也会走全表扫描
   ```sql
   explain SELECT course_id, course_name, teacher, price, student_count, class_hours, start_date, end_date, is_online, created_at
   FROM `review-think-record`.courses2 where  teacher in ('教师3','教师2') and  price = 300   and  is_online = 1
   #结果，走索引
   id|select_type|table   |partitions|type |possible_keys           |key                     |key_len|ref|rows|filtered|Extra                |
   --+-----------+--------+----------+-----+------------------------+------------------------+-------+---+----+--------+---------------------+
    1|SIMPLE     |courses2|          |range|idx_teacher_price_online|idx_teacher_price_online|208    |   |   2|   100.0|Using index condition|

   explain SELECT course_id, course_name, teacher, price, student_count, class_hours, start_date, end_date, is_online, created_at
   FROM `review-think-record`.courses2 where  (teacher ='教师3' or teacher = '教师2') and  price > 300   and  is_online = 1

   #结果，or后跟范围查询，走全表
   id|select_type|table   |partitions|type|possible_keys           |key|key_len|ref|rows |filtered|Extra      |
   --+-----------+--------+----------+----+------------------------+---+-------+---+-----+--------+-----------+
    1|SIMPLE     |courses2|          |ALL |idx_teacher_price_online|   |       |   |95884|    3.98|Using where|

   ```

4. order by 与 group by

   order by 最好就是基于索引字段来进行排序，否则会跑Using filesort，而filesort的方式效率会稍微第一点的

   当然，如果是filesort的话，会有三种排序方式
   - 单路排序：是一次性取出满足条件行的所有字段，然后在sort buffer中进行排序；用trace工具可以看到sort\_mode信息里显示< sort\_key, additional\_fields >或者< sort\_key, packed\_additional\_fields >
   - 双路排序（又叫回表排序模式）：是首先根据相应的条件取出相应的排序字段和可以直接定位行数据的行 ID，然后在 sort buffer 中进行排序，排序完后需要再次取回其它需要的字段；用trace工具可以看到sort\_mode信息里显示< sort\_key, rowid >
   - 如果sort buffer都装不下排序的数据，那就只能利用磁盘文件进行外部排序了，使用的是归并排序，这种方式效率最低。
     MySQL 通过比较系统变量 max\_length\_for\_sort\_data(默认1024字节) 的大小和需要查询的字段总大小来判断使用哪种排序模式。
   - 如果 字段的总长度小于max\_length\_for\_sort\_data ，那么使用 单路排序模式；
   - 如果 字段的总长度大于max\_length\_for\_sort\_data ，那么使用 双路排序模式。
   ```sql

   explain SELECT course_id, course_name, teacher, price, student_count, class_hours, start_date, end_date, is_online, created_at
   FROM `review-think-record`.courses where price > 300 and teacher ='教师2' and is_online = 1 order by start_date;

   #结果
   id|select_type|table  |partitions|type|possible_keys                                            |key        |key_len|ref  |rows |filtered|Extra                      |
   --+-----------+-------+----------+----+---------------------------------------------------------+-----------+-------+-----+-----+--------+---------------------------+
    1|SIMPLE     |courses|          |ref |idx_teacher,idx_price,idx_online,idx_teacher_price_online|idx_teacher|202    |const|34816|    25.0|Using where; Using filesort|

   ```

   而且排序的字段最好要满足最左匹配，那样才会使用索引排序
   ```sql
   explain SELECT course_id, course_name, teacher, price, student_count, class_hours, start_date, end_date, is_online, created_at
   FROM `review-think-record`.courses where teacher ='教师2' and  price > 300 and is_online in (1,0) order by teacher,price;

   #结果
   id|select_type|table  |partitions|type |possible_keys                                            |key                     |key_len|ref|rows |filtered|Extra                |
   --+-----------+-------+----------+-----+---------------------------------------------------------+------------------------+-------+---+-----+--------+---------------------+
    1|SIMPLE     |courses|          |range|idx_teacher,idx_price,idx_online,idx_teacher_price_online|idx_teacher_price_online|206    |   |18948|   100.0|Using index condition|

   ```

   针对这种情况可以使用覆盖索引来优化，所谓覆盖索引就是要让搜索列跟联合索引一致
   ```sql
   explain SELECT  teacher, price,  is_online
   FROM `review-think-record`.courses where teacher ='教师2' and  price = 300 and is_online in (1,0) order by is_online,price,teacher;

   #结果
   id|select_type|table  |partitions|type |possible_keys                                            |key                     |key_len|ref|rows|filtered|Extra                   |
   --+-----------+-------+----------+-----+---------------------------------------------------------+------------------------+-------+---+----+--------+------------------------+
    1|SIMPLE     |courses|          |range|idx_teacher,idx_price,idx_online,idx_teacher_price_online|idx_teacher_price_online|208    |   |   2|   100.0|Using where; Using index|

   ```

5. 要正确选择索引

   在选择索引的时候，我们需要衡量回表的问题，好比如以下语句，采用了name作为索引查询，但是这样会存在回表的情况，而这个结果集又可能比较大，索引带来的效率就不高了
   ```sql
   select * from courser where teacher > 'a'
   ```

   正确的做法是可以采用覆盖索引的方式进行查询，避免了回表的情况，在具备联合索引的情况下查询联合索引字段，就可以不需要回主表查询了
   ```sql
   select teacher ,price , is_online form courser where teacher > 'a'
   ```


#### join

在mysql中的join提供有两种算法

- Nested-Loop Join 算法&#x20;

  如果关联字段使用的是索引的话
- Block Nested-Loop Join 算法

  如果关联字段不是使用的索引的话

##### 嵌套循环连接Nested-Loop Join(NLJ) 算法

一次一行循环地从第一张表（称为驱动表）中读取行，在这行数据中取到关联字段，根据关联字段在另一张表（被驱动表）里取出满足条件的行，然后取出两张表的结果合集，如果是left join的话，左表为驱动表，如果是right join的话，右表为驱动表，join的话，mysql会取数据量较少的表作为驱动表，执行计划 Extra 中未出现Using join buffer则表示使用的 join 算法是 NLJ

##### 基于块的嵌套循环连接 Block Nested-Loop Join(BNL)算法

把驱动表的数据读入到 join\_buffer 中，然后扫描被驱动表，把被驱动表每一行取出来跟 join\_buffer 中的数据做对比，两张表都会做全量扫描，并且还需要在内存中进行计算排序，所以这显然性能会较慢。

所以关于join表查询，可以这么做

- 关联字段加索引，让mysql做join操作时尽量选择NLJ算法，驱动表因为需要全部查询出来，所以过滤的条件也尽量要走索引，避免全表扫描，总之，能走索引的过滤条件尽量都走索引
- 小表驱动大表（所谓小表是指进行了条件过滤完之后的出来的结果集更少的表），写多表连接sql时如果明确知道哪张表是小表可以用straight\_join写法固定连接驱动方式，省去mysql优化器自己判断的时间

#### in 和 exist

- in：当B表的数据集小于A表的数据集时，in优于exists
  ```sql
  select * from A where id in (select id from B) 

  ```

- exists：当A表的数据集小于B表的数据集时，exists优于in
  ```sql
  select * from A where exists (select 1 from B where B.id = A.id)
  ```


#### count

count( \*)≈count(1)>count(字段)>count(主键 id)  如果字段有索引

count( \*)≈count(1)>count(主键 id)>count(字段)  如果字段没有索引

## 索引失效场景

想要理解索引使用以及索引失效的场景，我们必须要融合索引的结构一起来理解\~

### 对索引使用左或者左右模糊查询

由于我们最常用的索引的结构是B+Tree，而B+ Tree 的数据是以顺序排列的，比如黄xx一定是排在林xx前面，所以如果我们以黄% 查询， 是能够通过索引查询到的，但是%黄或者%黄%那肯定是无法通过索引查询的，%的内容根本无从得知，怎么进行排序查询呢？所以只能通过全表扫描了\~

```sql
select * from courser where teacher like '%黄' ; x


select * from courser where teacher like '黄%' ; ✔

```


### 对索引使用函数

对索引使用函数也会导致索引失效的，索引存储的是字段的原始值，而不是函数处理后的结果，所以如果使用函数对索引进行操作会使得索引失效的。

### 对索引进行隐式类型转换

对索引进行隐式的类型转换也会导致索引失效
