# 深入解读 Mybatis

## 目录

- [Mybatis 的核心组件](#Mybatis的核心组件)
  - [Executor](#Executor)
  - [MappedStatement](#MappedStatement)
  - [StatementHandler](#StatementHandler)
  - [TypeHandler](#TypeHandler)
  - [ParameterHandler](#ParameterHandler)
  - [ResultSetHandler](#ResultSetHandler)
- [SqlSession 的创建过程](#SqlSession的创建过程)
  - [3 个阶段](#3个阶段)
  - [Configuration 的创建过程](#Configuration的创建过程)
    - [Configuration 的作用](#Configuration的作用)
    - [SqlSession 开始创建](#SqlSession开始创建)
- [SqlSession 执行 Mapper 过程](#SqlSession执行Mapper过程)
  - [Mapper 接口的注册过程](#Mapper接口的注册过程)
    - [getMapper 的秘密](#getMapper的秘密)
  - [Mapper 配置 SQL 的注册过程](#Mapper-配置SQL的注册过程)
    - [MappedStatement 对象的创建及注册过程](#MappedStatement对象的创建及注册过程)
  - [Mapper 方法调用过程](#Mapper-方法调用过程)
    - [MethodSignature 对象的创建过程](#MethodSignature对象的创建过程)
    - [ParamNameResolver 的处理流程](#ParamNameResolver的处理流程)
    - [开始执行 SQL 方法](#开始执行SQL-方法)
  - [SqlSession 执行 Mapper 过程](#SqlSession-执行-Mapper-过程)
    - [SimpleExecutor 实现细节](#SimpleExecutor实现细节)
    - [StatementHandler 实现细节](#StatementHandler实现细节)

### Mybatis 的核心组件

Mybatis 核心就是对 JDBC 进行了封装，说到底就是帮助我们简化 JDBC 的操作，所以他必然目的就是跟直接跟 JDBC 交流。为了更高的扩展性，Mybatis 可是用尽了浑身解数了，将 JDBC 的操作封装了 8 个核心组件。

![](image/image_ofrKBS2gb6.png)

接下来我们先了解了解 Mybatis 提供的八大组件，为我们后面的手写 Mybatis 做个铺垫

#### Executor

SqlSession 是 MyBatis 提供的操作数据库的 API，但是真正执行 SQL 的是 Executor 组件。Executor 接口中定义了对数据库的增删改查方法，其中 query()和 queryCursor()方法用于执行查询操作，update()方法用于执行插入、删除、修改操作。

![](image/image_d9MC84l14f.png)

- &#x20;BaseExecutor 中定义的方法的执行流程及通用的处理逻辑，具体的方法由子类来实现，是典型的模板方法模式的应用
- SimpleExecutor 是基础的 Executor，能够完成基本的增删改查操作
- ResueExecutor 对 JDBC 中的 Statement 对象做了缓存，当执行相同的 SQL 语句时，直接从缓存中取出 Statement 对象进行复用，避免了频繁创建和销毁 Statement 对象，从而提升系统性能，这是享元思想的应用。
- BatchExecutor 则会对调用同一个 Mapper 执行的 update、insert 和 delete 操作，调用 Statement 对象的批量操作功能

Mybatis 作为一款优秀的持久层框架，在国内 Java 开发领域具有广泛的应用。它不仅简化了数据库操作，提高了开发效率，还提供了灵活的映射规则和插件机制。然而，你是否曾想过，Mybatis 背后的原理究竟是什么？它是如何实现 SQL 的动态绑定、参数映射、结果集映射等功能的呢？

想要循序渐进地了解 Mybatis 的层层复杂架构，我们必须先了解他的目的是什么？没错，刚刚介绍了目的在于**简化了数据库操作，提高了开发效率，还提供了灵活的映射规则和插件机制**，所以我们所有的行为最终的目标是要做到最大的简化数据库操作，并使得其更好地拓展。

#### MappedStatement

用于描述 SQL 配置信息，MyBatis 框架启动时，XML 文件或者注解配置的 SQL 信息会被转换为 MappedStatement 对象注册到 Configuration 组件中。

#### StatementHandler

StatementHandler 组件封装了对 JDBC Statement 的操作，例如设置 Statement 对象的 fetchSize 属性、设置查询超时时间、调用 JDBC Statement 与数据库交互等。

#### TypeHandler

类型处理器，用于 Java 类型与 JDBC 类型之间的转换。

#### ParameterHandler

当使用 PreparedStatement 或者 CallableStatement 对象时，如果 SQL 语句中有参数占位符，在执行 SQL 语句之前，就需要为参数占位符设置值。ParameterHandler 的作用是在 PreparedStatementHandler 和 CallableStatementHandler 操作对应的 Statement 执行数据库交互之前为参数占位符设置值。

#### ResultSetHandler

ResultSetHandler 用于在 StatementHandler 对象执行完查询操作或存储过程后，对结果集或存储过程的执行结果进行处理。

## SqlSession 的创建过程

### 3 个阶段

1. Configuration 实例的创建过程
2. SqlSessionFactory 实例的创建过程
3. SqlSession 实例化的过程

### Configuration 的创建过程

Configuration 是用于注册配置处理器并存储配置信息的，这些配置信息有环境信息，Mapper 信息，所以 SqlSession 的创建离不开 Configuration 中的配置信息的。

#### Configuration 的作用

- 用于描述 MyBatis 配置信息，例如\<settings>标签配置的参数信息。
- 作为容器注册 MyBatis 其他组件，例如 TypeHandler、MappedStatement 等。
- 提供工厂方法，创建 ResultSetHandler、StatementHandler、Executor、ParameterHandler 等组件实例

而通常我们会将 mapper，环境等信息以 xml 的形式书写，所以解析 xml 必然是 Configuration 创建最开始干的事

当然 Mybatis 将解析 xml 的方法进行了封装，封装成了 XMLConfigBuilder 类，我们只需要将用该类的 parse 方法，就会将配置解析成对应的 Configuration 进行返回了

```java
public Configuration parse() {
        if (this.parsed) {
            throw new BuilderException("Each XMLConfigBuilder can only be used once.");
        } else {
            this.parsed = true;
            this.parseConfiguration(this.parser.evalNode("/configuration"));
            return this.configuration;
        }
    }
```

MyBatis 框架启动后，首先创建 Configuration 对象，然后解析所有配置信息，将解析后的配置信息存放在 Configuration 对象中。

#### SqlSession 开始创建

MyBatis 中的 SqlSession 实例使用工厂模式创建，所以在创建 SqlSession 实例之前需要先创建 SqlSessionFactory 工厂对象，然后调用 SqlSessionFactory 对象的 openSession()方法

而 SqlSessionFactory 是由 SqlSessionFactoryBuilder 来创建的

```java
public SqlSessionFactory build(Reader reader, String environment, Properties properties) {
        SqlSessionFactory var5;
        try {
            XMLConfigBuilder parser = new XMLConfigBuilder(reader, environment, properties);
            var5 = this.build(parser.parse());
        } catch (Exception var14) {
            Exception e = var14;
            throw ExceptionFactory.wrapException("Error building SqlSession.", e);
        } finally {
            ErrorContext.instance().reset();

            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException var13) {
            }

        }

        return var5;
    }
```

指向的 build 方法就是创建一个 DefaultSessionFactory

```java
    public SqlSessionFactory build(Configuration config) {
        return new DefaultSqlSessionFactory(config);
    }

```

接下来通过 DefaultSqlSessionFactory 的 openSession 方法便能解密 SqlSession 的创建过程了

而 DefaultSqlSessionFactory 的 openSession 方法的实现如下：

```java
public SqlSession openSession() {
        return this.openSessionFromDataSource(this.configuration.getDefaultExecutorType(), (TransactionIsolationLevel)null, false);
}

```

而 openSessionFromDataSource 的实现如下：

```java
private SqlSession openSessionFromDataSource(ExecutorType execType, TransactionIsolationLevel level, boolean autoCommit) {
        Transaction tx = null;

        DefaultSqlSession var8;
        try {
            // 获取Mybatis主配置文件配置的环境，Environment信息会经过xml解析并将可用的配置信息存至Configuration中
            Environment environment = this.configuration.getEnvironment();
            // 创建事务管理器工厂
            TransactionFactory transactionFactory = this.getTransactionFactoryFromEnvironment(environment);
            tx = transactionFactory.newTransaction(environment.getDataSource(), level, autoCommit);
            // Configuration既是管理配置信息的，也是某些配置的工厂类
            Executor executor = this.configuration.newExecutor(tx, execType);
            var8 = new DefaultSqlSession(this.configuration, executor, autoCommit);
        } catch (Exception var12) {
            Exception e = var12;
            this.closeTransaction(tx);
            throw ExceptionFactory.wrapException("Error opening session.  Cause: " + e, e);
        } finally {
            ErrorContext.instance().reset();
        }

        return var8;
    }

```

上面的实现首先通过 Configuration 对象获取 MyBatis 主配置文件中通过\<environment>标签配置的环境信息，然后根据配置的事务管理器类型创建对应的事务管理器工厂。

MyBatis 提供了两种事务管理器，分别为 JdbcTransaction 和 ManagedTransaction。其中，JdbcTransaction 是使用 JDBC 中的 Connection 对象实现事务管理的，而 ManagedTransaction 表示事务由外部容器管理。

DefaultSqlSession 对象中持有 Executor 对象的引用，真正执行 SQL 操作的是 Executor 对象。

## SqlSession 执行 Mapper 过程

执行 Mapper 过程可以分成 4 个阶段

1. Mapper 接口的注册过程
2. MapperStatement 对象的注册过程
3. Mapper 方法的调用过程
4. SqlSession 调用 Mapper 的过程

### Mapper 接口的注册过程

不妨来看看 Mapper 调用的过程，整个过程就是将 xml 我们配置的文件信息通过加载成流的方式进行 SqlSession 的构建，通过 SqlSession 中的内置方法 getMapper 来获取映射对象，为什么通过 getMapper 就能拿到对应的映射器对象呢？

```java
 // 1. 从SqlSessionFactory中获取SqlSession
 Reader reader = Resources.getResourceAsReader("mybatis-config-datasources.xml");
 SessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
 SqlSession sqlSession = sqlSessionFactory.openSession();
 // 2. 获取映射器对象
 IUserDao userDao = sqlSession.getMapper(IUserDao.class);
```

#### getMapper 的秘密

Session 提供的 getMapper 方法实则是调用了 configuration 的 getMapper 方法，而 configuration 是从 MapperRegistry Mapper 注册器中获取的，具体代码如下

```java
 public <T> T getMapper(Class<T> type, SqlSession sqlSession) {
    final MapperProxyFactory<T> mapperProxyFactory = (MapperProxyFactory) knownMappers.get(type);
    if (mapperProxyFactory == null) {
      throw new BindingException("Type " + type + " is not known to the MapperRegistry.");
    }
    try {
      return mapperProxyFactory.newInstance(sqlSession);
    } catch (Exception e) {
      throw new BindingException("Error getting mapper instance. Cause: " + e, e);
    }
  }
```

可以发现的是 Mapper 是通过我们传入的 Class 类型到 knownMappers 中去找，找对应的工厂，从这里我们大概可以猜到的是：

Mybatis 将 Class 类型和 Mapper 工厂绑定到一起组成一个 Map 类型存在内存中了，然后我们调用的时候就从这里获取，后面就通过代理工厂 mapperProxyFactory.newInstance(sqlSession)直接帮助我们实例化具体的类了，

当然往上看看，看到这个证明我们猜对了

```java
private final Map<Class<?>, MapperProxyFactory<?>> knownMappers = new HashMap<>();
```

不妨再努努力看看他是如何将信息存至 knownMappers 的呢

```java
public <T> void addMapper(Class<T> type) {
    if (type.isInterface()) {
      if (hasMapper(type)) {
        throw new BindingException("Type " + type + " is already known to the MapperRegistry.");
      }
      boolean loadCompleted = false;
      try {
        knownMappers.put(type, new MapperProxyFactory<>(type));
        // It's important that the type is added before the parser is run
        // otherwise the binding may automatically be attempted by the
        // mapper parser. If the type is already known, it won't try.
        MapperAnnotationBuilder parser = new MapperAnnotationBuilder(config, type);
        parser.parse();
        loadCompleted = true;
      } finally {
        if (!loadCompleted) {
          knownMappers.remove(type);
        }
      }
    }
  }


   /**
   * @since 3.2.2
   */
  public void addMappers(String packageName, Class<?> superType) {
    ResolverUtil<Class<?>> resolverUtil = new ResolverUtil<>();
    resolverUtil.find(new ResolverUtil.IsA(superType), packageName);
    Set<Class<? extends Class<?>>> mapperSet = resolverUtil.getClasses();
    for (Class<?> mapperClass : mapperSet) {
      addMapper(mapperClass);
    }
  }

```

MyBatis 框架在应用启动时会解析所有的 Mapper 接口，然后调用 MapperRegistry 对象的 addMapper()方法将 Mapper 接口信息和对应的 MapperProxyFactory 对象注册到 MapperRegistry 对象中

### Mapper 配置 SQL 的注册过程

MyBatis 通过 MappedStatement 类描述 Mapper 的 SQL 配置信息。SQL 配置有两种方式：一种是通过 XML 文件配置；另一种是通过 Java 注解，而 Java 注解的本质就是一种轻量级的配置信息。

在 Configuration 中存在着这么个 Map，该属性用于注册 MyBatis 中所有的 MappedStatement 对象

```java
 protected final Map<String, MappedStatement> mappedStatements = new StrictMap<MappedStatement>("Mapped Statements collection")
      .conflictMessageProducer((savedValue, targetValue) ->
          ". please check " + savedValue.getResource() + " and " + targetValue.getResource());
```

mappedStatements 属性是一个 Map 对象，它的 Key 为 MapperSQL 配置的 Id，如果 SQL 是通过 XML 配置的，则 Id 为命名空间加上\<select|update|delete|insert>标签的 Id，如果 SQL 通过 Java 注解配置，则 Id 为 Mapper 接口的完全限定名（包括包名）加上方法名称。

当然在 Configuration 中也提供了添加 MappedStatement 的方法

```java
  public void addMappedStatement(MappedStatement ms) {
    mappedStatements.put(ms.getId(), ms);
  }

```

#### MappedStatement 对象的创建及注册过程

MappedStatement 对象创建莫过于解析我们写在 xml 或者写在注解上的 SQL 信息成 MappedStatement 对象，解析 xml 中，关键在于\<mappers>的元素解析，\<mappers>标签是通过 XMLConfigBuilder 类的 mapperElement()方法来解析的。

```java

/**
  可以对照着这个mappers配置信息进行源码阅读
  <mappers>
    <mapper resource="org/mybatis/builder/AuthorMapper.xml"/>
    <mapper resource="org/mybatis/builder/BlogMapper.xml"/>
    <mapper resource="org/mybatis/builder/PostMapper.xml"/>
    <package name="org.mybatis.builder"/>
  </mappers>
*/
private void mappersElement(XNode context) throws Exception {
    if (context == null) {
      return;
    }
    for (XNode child : context.getChildren()) {
      //通过package指定包名
      if ("package".equals(child.getName())) {
        String mapperPackage = child.getStringAttribute("name");
        configuration.addMappers(mapperPackage);
      } else {

        String resource = child.getStringAttribute("resource");
        String url = child.getStringAttribute("url");
        String mapperClass = child.getStringAttribute("class");
        //通过resource 指定XML文件路径
        if (resource != null && url == null && mapperClass == null) {
          ErrorContext.instance().resource(resource);
          try (InputStream inputStream = Resources.getResourceAsStream(resource)) {
            XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, resource,
                configuration.getSqlFragments());
            mapperParser.parse();
          }
        } else if (resource == null && url != null && mapperClass == null) {

          ErrorContext.instance().resource(url);
          try (InputStream inputStream = Resources.getUrlAsStream(url)) {
            XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, url,
                configuration.getSqlFragments());
            mapperParser.parse();
          }
        } else if (resource == null && url == null && mapperClass != null) {
          //通过class指定接口的完全限定名
          Class<?> mapperInterface = Resources.classForName(mapperClass);
          configuration.addMapper(mapperInterface);
        } else {
          throw new BuilderException(
              "A mapper element may only specify a url, resource or class, but not more than one.");
        }
      }
    }
  }

```

注意这段代码，这里会创建 XMLMapperBuilder 来进行进一步的元素抽取

```java
 XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, url,
                configuration.getSqlFragments());
            mapperParser.parse();
```

跟踪进去便可以发现，他其实是对 mapper 下的元素进行处理了

```java
  public void parse() {
    if (!configuration.isResourceLoaded(resource)) {
      configurationElement(parser.evalNode("/mapper"));
      configuration.addLoadedResource(resource);
      bindMapperForNamespace();
    }
    configuration.parsePendingResultMaps(false);
    configuration.parsePendingCacheRefs(false);
    configuration.parsePendingStatements(false);
  }
```

这里面便是我们平时写在 xml 上的 SQL 处理了

```java
  private void configurationElement(XNode context) {
    try {
    //获取命名空间
      String namespace = context.getStringAttribute("namespace");
      if (namespace == null || namespace.isEmpty()) {
        throw new BuilderException("Mapper's namespace cannot be empty");
      }
      builderAssistant.setCurrentNamespace(namespace);
      cacheRefElement(context.evalNode("cache-ref"));
      cacheElement(context.evalNode("cache"));
      parameterMapElement(context.evalNodes("/mapper/parameterMap"));
      //解析resultMap标签
      resultMapElements(context.evalNodes("/mapper/resultMap"));
      //解析SQL 标签
      sqlElement(context.evalNodes("/mapper/sql"));
      buildStatementFromContext(context.evalNodes("select|insert|update|delete"));
    } catch (Exception e) {
      throw new BuilderException("Error parsing Mapper XML. The XML location is '" + resource + "'. Cause: " + e, e);
    }
  }
```

其实我们比较关注的当然是他是如何解析我们的 SQL 语句的，代码显示他是调用了 buildStatementFromContext 这个方法的

```java
  private void buildStatementFromContext(List<XNode> list, String requiredDatabaseId) {
    for (XNode context : list) {
      final XMLStatementBuilder statementParser = new XMLStatementBuilder(configuration, builderAssistant, context,
          requiredDatabaseId);
      try {
        statementParser.parseStatementNode();
      } catch (IncompleteElementException e) {
        configuration.addIncompleteStatement(statementParser);
      }
    }
  }
```

原来 SQL 交给了 XMLStatementBuilder 来处理了，并调用了其 parseStatementNode 方法，虽然这里兜兜转转的，但是其实想想确实是合理的，各个类各施其职，这样不仅好维护，代码结构也十分清晰，跟踪进去之后，对 sql 的核心处理逻辑就在这里了

```java
 public void parseStatementNode() {
    String id = context.getStringAttribute("id");
    String databaseId = context.getStringAttribute("databaseId");

    if (!databaseIdMatchesCurrent(id, databaseId, this.requiredDatabaseId)) {
      return;
    }

    String nodeName = context.getNode().getNodeName();
    SqlCommandType sqlCommandType = SqlCommandType.valueOf(nodeName.toUpperCase(Locale.ENGLISH));
    boolean isSelect = sqlCommandType == SqlCommandType.SELECT;
    boolean flushCache = context.getBooleanAttribute("flushCache", !isSelect);
    boolean useCache = context.getBooleanAttribute("useCache", isSelect);
    boolean resultOrdered = context.getBooleanAttribute("resultOrdered", false);

    // Include Fragments before parsing
    XMLIncludeTransformer includeParser = new XMLIncludeTransformer(configuration, builderAssistant);
    includeParser.applyIncludes(context.getNode());

    String parameterType = context.getStringAttribute("parameterType");
    Class<?> parameterTypeClass = resolveClass(parameterType);

    String lang = context.getStringAttribute("lang");
    LanguageDriver langDriver = getLanguageDriver(lang);

    // Parse selectKey after includes and remove them.
    processSelectKeyNodes(id, parameterTypeClass, langDriver);

    // Parse the SQL (pre: <selectKey> and <include> were parsed and removed)
    KeyGenerator keyGenerator;
    String keyStatementId = id + SelectKeyGenerator.SELECT_KEY_SUFFIX;
    keyStatementId = builderAssistant.applyCurrentNamespace(keyStatementId, true);
    if (configuration.hasKeyGenerator(keyStatementId)) {
      keyGenerator = configuration.getKeyGenerator(keyStatementId);
    } else {
      keyGenerator = context.getBooleanAttribute("useGeneratedKeys",
          configuration.isUseGeneratedKeys() && SqlCommandType.INSERT.equals(sqlCommandType))
              ? Jdbc3KeyGenerator.INSTANCE : NoKeyGenerator.INSTANCE;
    }

    SqlSource sqlSource = langDriver.createSqlSource(configuration, context, parameterTypeClass);
    StatementType statementType = StatementType
        .valueOf(context.getStringAttribute("statementType", StatementType.PREPARED.toString()));
    Integer fetchSize = context.getIntAttribute("fetchSize");
    Integer timeout = context.getIntAttribute("timeout");
    String parameterMap = context.getStringAttribute("parameterMap");
    String resultType = context.getStringAttribute("resultType");
    Class<?> resultTypeClass = resolveClass(resultType);
    String resultMap = context.getStringAttribute("resultMap");
    if (resultTypeClass == null && resultMap == null) {
      resultTypeClass = MapperAnnotationBuilder.getMethodReturnType(builderAssistant.getCurrentNamespace(), id);
    }
    String resultSetType = context.getStringAttribute("resultSetType");
    ResultSetType resultSetTypeEnum = resolveResultSetType(resultSetType);
    if (resultSetTypeEnum == null) {
      resultSetTypeEnum = configuration.getDefaultResultSetType();
    }
    String keyProperty = context.getStringAttribute("keyProperty");
    String keyColumn = context.getStringAttribute("keyColumn");
    String resultSets = context.getStringAttribute("resultSets");
    boolean dirtySelect = context.getBooleanAttribute("affectData", Boolean.FALSE);

    builderAssistant.addMappedStatement(id, sqlSource, statementType, sqlCommandType, fetchSize, timeout, parameterMap,
        parameterTypeClass, resultMap, resultTypeClass, resultSetTypeEnum, flushCache, useCache, resultOrdered,
        keyGenerator, keyProperty, keyColumn, databaseId, langDriver, resultSets, dirtySelect);
  }

```

代码很长，但是概括起来这段代码做了以下的几件事情

（1）获取\<select|insert|delete|update>标签的所有属性信息。

（2）将\<include>标签引用的 SQL 片段替换为对应的\<sql>标签中定义的内容。

（3）获取 lang 属性指定的 LanguageDriver，通过 LanguageDriver 创建 SqlSource。MyBatis 中的 SqlSource 表示一个 SQL 资源，后面章节中会对 SqlSource 做更详细的介绍。

（4）获取 KeyGenerator 对象。KeyGenerator 的不同实例代表不同的主键生成策略。

（5）所有解析工作完成后，使用 MapperBuilderAssistant 对象的 addMappedStatement()方法创建 MappedStatement 对象。创建完成后，调用 Configuration 对象的 addMappedStatement()方法将 MappedStatement 对象注册到 Configuration 对象中。

这样 MappedStatement 对象的配置就算是完成了

### Mapper 方法调用过程

以往节我们清楚了 getMapper 是通过动态代理的方式来创建对应接口的代理对象

```java
SqlSession sqlSession = sqlSessionFactory.openSession();
 // 2. 获取映射器对象
 IUserDao userDao = sqlSession.getMapper(IUserDao.class);
```

```java
 public <T> T getMapper(Class<T> type, SqlSession sqlSession) {
    final MapperProxyFactory<T> mapperProxyFactory = (MapperProxyFactory) knownMappers.get(type);
    if (mapperProxyFactory == null) {
      throw new BindingException("Type " + type + " is not known to the MapperRegistry.");
    }
    try {
      return mapperProxyFactory.newInstance(sqlSession);
    } catch (Exception e) {
      throw new BindingException("Error getting mapper instance. Cause: " + e, e);
    }
  }
```

那么代理当中做了什么呢？

由于是实现的 JDK 提供的代理，所以我们需要到 MapperProxy 中查看 invoke 干了什么就行了。

```java
@Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    try {
      //Object类型的 不做处理
      if (Object.class.equals(method.getDeclaringClass())) {
        return method.invoke(this, args);
      }
      return cachedInvoker(method).invoke(proxy, method, args, sqlSession);
    } catch (Throwable t) {
      throw ExceptionUtil.unwrapThrowable(t);
    }
  }
```

其中这么一段代码为的就是排除 toString(),equals()这些直接来自于 Object 的方法，因为 Java 中的对象基本上都是继承与 Object 的，所以如果是这类 Object 的原生方法，则是不需要再做处理，直接调用即可。否则会进行 cachedInvoker 做额外的调用，比如查询数据库的接口方法。

```java
  if (Object.class.equals(method.getDeclaringClass())) {
        return method.invoke(this, args);
      }
```

而 cachedInvoker 则是创建并缓存 MapperMethodInvoker 实例，这些实例用于调用 Mybatis 映射器接口中定义的方法。

```java
 private MapperMethodInvoker cachedInvoker(Method method) throws Throwable {
    try {
      return MapUtil.computeIfAbsent(methodCache, method, m -> {
        if (!m.isDefault()) {
          return new PlainMethodInvoker(new MapperMethod(mapperInterface, method, sqlSession.getConfiguration()));
        }
        try {
          if (privateLookupInMethod == null) {
            return new DefaultMethodInvoker(getMethodHandleJava8(method));
          }
          return new DefaultMethodInvoker(getMethodHandleJava9(method));
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException
            | NoSuchMethodException e) {
          throw new RuntimeException(e);
        }
      });
    } catch (RuntimeException re) {
      Throwable cause = re.getCause();
      throw cause == null ? re : cause;
    }
  }

```

从这段代码我们看到了他其实有 new 一个 MapperMethod&#x20;

```java
  public MapperMethod(Class<?> mapperInterface, Method method, Configuration config) {
    this.command = new SqlCommand(config, mapperInterface, method);
    this.method = new MethodSignature(config, mapperInterface, method);
  }

```

在 MapperMethod 构造方法中创建了一个 SqlCommand 对象和一个 MethodSignature 对象：SqlCommand 对象用于获取 SQL 语句的类型、Mapper 的 Id 等信息；MethodSignature 对象用于获取方法的签名信息，例如 Mapper 方法的参数名、参数注解等信息。

那么接下来我们就需要解密 SqlCommand 和 MethodSignature 都做了些什么

首先是 SqlCommand，SqlCommoand 中存储了对应的 sql 语句和 sql 类型

```java
public static class SqlCommand {

    private final String name; //Mapper ID
    private final SqlCommandType type; //SQL 类型

    public SqlCommand(Configuration configuration, Class<?> mapperInterface, Method method) {
      final String methodName = method.getName();
      final Class<?> declaringClass = method.getDeclaringClass();
      MappedStatement ms = resolveMappedStatement(mapperInterface, methodName, declaringClass, configuration);
      if (ms == null) {
        if (method.getAnnotation(Flush.class) == null) {
          throw new BindingException(
              "Invalid bound statement (not found): " + mapperInterface.getName() + "." + methodName);
        }
        name = null;
        type = SqlCommandType.FLUSH;
      } else {
        name = ms.getId();
        type = ms.getSqlCommandType();
        if (type == SqlCommandType.UNKNOWN) {
          throw new BindingException("Unknown execution method for: " + name);
        }
      }
    }
    。。。
 }

```

而 resolveMappedStatement 是为了根据 Mapper 接口的完全限定名和方法名获取对应的 MappedStatement 对象

```java

    private MappedStatement resolveMappedStatement(Class<?> mapperInterface, String methodName, Class<?> declaringClass,
        Configuration configuration) {
      String statementId = mapperInterface.getName() + "." + methodName;
      if (configuration.hasStatement(statementId)) {
        return configuration.getMappedStatement(statementId);
      }
      if (mapperInterface.equals(declaringClass)) {
        return null;
      }
      //如果方法是在Mapper父接口定义的，则根据父接口获取对应的MappedStatement对象
      for (Class<?> superInterface : mapperInterface.getInterfaces()) {
        if (declaringClass.isAssignableFrom(superInterface)) {
          MappedStatement ms = resolveMappedStatement(superInterface, methodName, declaringClass, configuration);
          if (ms != null) {
            return ms;
          }
        }
      }
      return null;
    }
  }
```

以上代码首先将接口的完全限定名和方法名进行拼接，作为 Mapper 的 Id 从 Configuration 对象中查找对应的 MappedStatement 对象，如果查找不到，则判断该方法是否是从父接口中继承的，如果是，就以父接口作为参数递归调用 resolveMappedStatement()方法，若找到对应的 MappedStatement 对象，则返回该对象，否则返回 null。

#### MethodSignature 对象的创建过程

MethodSignature 对象在创建时主要完成了以下三件事情

1. 获取 Mapper 方法的返回值类型，具体是哪种类型，通过 boolean 类型的属性进行标记。例如，当返回值类型为 void 时，returnsVoid 属性值为 true，当返回值类型为 List 时，将 returnsMap 属性值设置为 true。

   ```java

       private final boolean returnsMany;
       private final boolean returnsMap;
       private final boolean returnsVoid;
       private final boolean returnsCursor;
       private final boolean returnsOptional;
   ```

2. 记录 RowBounds 参数位置，用于处理后续的分页查询，同时记录 ResultHandler 参数位置，用于处理从数据库中检索的每一行数据。
   ```java
       private Integer getUniqueParamIndex(Method method, Class<?> paramType) {
         Integer index = null;
         final Class<?>[] argTypes = method.getParameterTypes();
         for (int i = 0; i < argTypes.length; i++) {
           if (paramType.isAssignableFrom(argTypes[i])) {
             if (index != null) {
               throw new BindingException(
                   method.getName() + " cannot have multiple " + paramType.getSimpleName() + " parameters");
             }
             index = i;
           }
         }
         return index;
       }
   ```
3. 创建 ParamNameResolver 对象。ParamNameResolver 对象用于解析 Mapper 方法中的参数名称及参数注解信息。

具体代码如下：

```java
public MethodSignature(Configuration configuration, Class<?> mapperInterface, Method method) {
      //获取返回数据类型
      Type resolvedReturnType = TypeParameterResolver.resolveReturnType(method, mapperInterface);
      if (resolvedReturnType instanceof Class<?>) {
        this.returnType = (Class<?>) resolvedReturnType;
      } else if (resolvedReturnType instanceof ParameterizedType) {
        this.returnType = (Class<?>) ((ParameterizedType) resolvedReturnType).getRawType();
      } else {
        this.returnType = method.getReturnType();
      }
      //返回的类型为void
      this.returnsVoid = void.class.equals(this.returnType);
      //返回的类型为集合
      this.returnsMany = configuration.getObjectFactory().isCollection(this.returnType) || this.returnType.isArray();
      //返回的类型为Cursor
      this.returnsCursor = Cursor.class.equals(this.returnType);
      //返回的类型为Optional
      this.returnsOptional = Optional.class.equals(this.returnType);
      //返回的类型为map
      this.mapKey = getMapKey(method);
      this.returnsMap = this.mapKey != null;
      this.rowBoundsIndex = getUniqueParamIndex(method, RowBounds.class);
      this.resultHandlerIndex = getUniqueParamIndex(method, ResultHandler.class);
      //解析maper方法参数
      this.paramNameResolver = new ParamNameResolver(configuration, method);
    }
```

#### ParamNameResolver 的处理流程

ParamNameResolver 是用于 mapper 方法的参数解析的，具体实现如下：

```java
 public ParamNameResolver(Configuration config, Method method) {
    this.useActualParamName = config.isUseActualParamName();
    final Class<?>[] paramTypes = method.getParameterTypes();
    // 获取所有参数注解
    final Annotation[][] paramAnnotations = method.getParameterAnnotations();
    final SortedMap<Integer, String> map = new TreeMap<>();
    int paramCount = paramAnnotations.length;
    // 从@Param注解中获取参数名称
    for (int paramIndex = 0; paramIndex < paramCount; paramIndex++) {
      if (isSpecialParameter(paramTypes[paramIndex])) {
        continue;
      }
      String name = null;
      for (Annotation annotation : paramAnnotations[paramIndex]) {
        //方法中是有含有Param注解
        if (annotation instanceof Param) {
          hasParamAnnotation = true;
          //获取参数名称
          name = ((Param) annotation).value();
          break;
        }
      }
      if (name == null) {
        // @Param was not specified.
        if (useActualParamName) {
          name = getActualParamName(method, paramIndex);
        }
        if (name == null) {
          // use the parameter index as the name ("0", "1", ...)
          // gcode issue #71
          name = String.valueOf(map.size());
        }
      }
      map.put(paramIndex, name);
    }
    names = Collections.unmodifiableSortedMap(map);
  }
```

在 ParamNameResolver 构造方法中，对所有 Mapper 方法的所有参数信息进行遍历，首先判断参数中是否有@Param 注解，如果包含@Param 注解，就从注解中获取参数名称，如果参数中没有@Param 注解，就根据 MyBatis 主配置文件中的 useActualParamName 参数确定是否获取实际方法定义的参数名称，若 useActualParamName 参数值为 true，则使用方法定义的参数名称。解析完毕后，将参数信息保存在一个不可修改的 names 属性中，该属性是一个 SortedMap\<Integer, String>类型的对象。

至此，SqlSession 执行 Mapper 的注册过程已经完成，纵观全局，其实这个过程无非是在为 Configuration 收集信息，为下一步执行 SQL 方法做准备。

#### 开始执行 SQL 方法

不妨我们再次回首，看看 MapperProxy 中是如何处理 invoke 的 ，显然核心逻辑是在 cachedInvoker(method).invoke(proxy, method, args, sqlSession)这里

```java
@Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    try {
      if (Object.class.equals(method.getDeclaringClass())) {
        return method.invoke(this, args);
      }
      return cachedInvoker(method).invoke(proxy, method, args, sqlSession);
    } catch (Throwable t) {
      throw ExceptionUtil.unwrapThrowable(t);
    }
  }

```

&#x20;MapperProxy 提供了 MapperMethodInvoker →invoke 方法来执行调用 MapperMethod 的 execute 方法

```java
  interface MapperMethodInvoker {
    Object invoke(Object proxy, Method method, Object[] args, SqlSession sqlSession) throws Throwable;
  }

  private static class PlainMethodInvoker implements MapperMethodInvoker {
    private final MapperMethod mapperMethod;

    public PlainMethodInvoker(MapperMethod mapperMethod) {
      this.mapperMethod = mapperMethod;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args, SqlSession sqlSession) throws Throwable {
      return mapperMethod.execute(sqlSession, args);
    }
  }

  private static class DefaultMethodInvoker implements MapperMethodInvoker {
    private final MethodHandle methodHandle;

    public DefaultMethodInvoker(MethodHandle methodHandle) {
      this.methodHandle = methodHandle;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args, SqlSession sqlSession) throws Throwable {
      return methodHandle.bindTo(proxy).invokeWithArguments(args);
    }
  }
```

好了，接下来我们就可以追踪到 MapperMethod 的 execute 方法了

```java
   private final SqlCommand command;
  private final MethodSignature method;

  public MapperMethod(Class<?> mapperInterface, Method method, Configuration config) {
    this.command = new SqlCommand(config, mapperInterface, method);
    this.method = new MethodSignature(config, mapperInterface, method);
  }


 public Object execute(SqlSession sqlSession, Object[] args) {
    Object result;
    // 获取SQL 类型
    switch (command.getType()) {
      case INSERT: {
        //获取参数信息
        Object param = method.convertArgsToSqlCommandParam(args);
        //调用sqlSession的insert 方法 ， 然后调用rowCountResult()方法统计行数
        result = rowCountResult(sqlSession.insert(command.getName(), param));
        break;
      }
      case UPDATE: {
        // 调用SqlSession对象的update()方法
        Object param = method.convertArgsToSqlCommandParam(args);
        result = rowCountResult(sqlSession.update(command.getName(), param));
        break;
      }
      case DELETE: {
        Object param = method.convertArgsToSqlCommandParam(args);
        result = rowCountResult(sqlSession.delete(command.getName(), param));
        break;
      }
      case SELECT:
        //判断返回类型
        if (method.returnsVoid() && method.hasResultHandler()) {
          executeWithResultHandler(sqlSession, args);
          result = null;
        } else if (method.returnsMany()) {
          result = executeForMany(sqlSession, args);
        } else if (method.returnsMap()) {
          result = executeForMap(sqlSession, args);
        } else if (method.returnsCursor()) {
          result = executeForCursor(sqlSession, args);
        } else {
          Object param = method.convertArgsToSqlCommandParam(args);
          result = sqlSession.selectOne(command.getName(), param);
          if (method.returnsOptional() && (result == null || !method.getReturnType().equals(result.getClass()))) {
            result = Optional.ofNullable(result);
          }
        }
        break;
      case FLUSH:
        result = sqlSession.flushStatements();
        break;
      default:
        throw new BindingException("Unknown execution method for: " + command.getName());
    }
    if (result == null && method.getReturnType().isPrimitive() && !method.returnsVoid()) {
      throw new BindingException("Mapper method '" + command.getName()
          + "' attempted to return null from a method with a primitive return type (" + method.getReturnType() + ").");
    }
    return result;
  }
```

总结：Mapper 的调用就是通过动态代理将 Mapper 方法的调用转换为调用 SqlSession 提供的增删改查方法，以 Mapper 的 Id 作为参数，执行数据库的增删改查操作

### SqlSession 执行 Mapper 过程

观察一下 MapperMethod 的 execute 方法,可以发现在这里是通过执行 sqlSession 的 insert，selectOned 等方法来执行 SQL 返回结果的

```java
public Object execute(SqlSession sqlSession, Object[] args) {
    Object result;
    switch (command.getType()) {
      case INSERT: {
        Object param = method.convertArgsToSqlCommandParam(args);
        result = rowCountResult(sqlSession.insert(command.getName(), param));
        break;
      }
      case UPDATE: {
        Object param = method.convertArgsToSqlCommandParam(args);
        result = rowCountResult(sqlSession.update(command.getName(), param));
        break;
      }
      case DELETE: {
        Object param = method.convertArgsToSqlCommandParam(args);
        result = rowCountResult(sqlSession.delete(command.getName(), param));
        break;
      }
      case SELECT:
        if (method.returnsVoid() && method.hasResultHandler()) {
          executeWithResultHandler(sqlSession, args);
          result = null;
        } else if (method.returnsMany()) {
          result = executeForMany(sqlSession, args);
        } else if (method.returnsMap()) {
          result = executeForMap(sqlSession, args);
        } else if (method.returnsCursor()) {
          result = executeForCursor(sqlSession, args);
        } else {
          Object param = method.convertArgsToSqlCommandParam(args);
          result = sqlSession.selectOne(command.getName(), param);
          if (method.returnsOptional() && (result == null || !method.getReturnType().equals(result.getClass()))) {
            result = Optional.ofNullable(result);
          }
        }
        break;
      case FLUSH:
        result = sqlSession.flushStatements();
        break;
      default:
        throw new BindingException("Unknown execution method for: " + command.getName());
    }
    if (result == null && method.getReturnType().isPrimitive() && !method.returnsVoid()) {
      throw new BindingException("Mapper method '" + command.getName()
          + "' attempted to return null from a method with a primitive return type (" + method.getReturnType() + ").");
    }
    return result;
  }
```

所以执行 Mapper 的过程，我们应该把注意力放在 Session 接口方法的调用过程

```java
public interface SqlSession extends Closeable {

  /**
   * Retrieve a single row mapped from the statement key.
   *
   * @param <T>
   *          the returned object type
   * @param statement
   *          the statement
   *
   * @return Mapped object
   */
  <T> T selectOne(String statement);

  /**
   * Retrieve a single row mapped from the statement key and parameter.
   *
   * @param <T>
   *          the returned object type
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param parameter
   *          A parameter object to pass to the statement.
   *
   * @return Mapped object
   */
  <T> T selectOne(String statement, Object parameter);

  /**
   * Retrieve a list of mapped objects from the statement key.
   *
   * @param <E>
   *          the returned list element type
   * @param statement
   *          Unique identifier matching the statement to use.
   *
   * @return List of mapped object
   */
  <E> List<E> selectList(String statement);

  /**
   * Retrieve a list of mapped objects from the statement key and parameter.
   *
   * @param <E>
   *          the returned list element type
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param parameter
   *          A parameter object to pass to the statement.
   *
   * @return List of mapped object
   */
  <E> List<E> selectList(String statement, Object parameter);

  /**
   * Retrieve a list of mapped objects from the statement key and parameter, within the specified row bounds.
   *
   * @param <E>
   *          the returned list element type
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param parameter
   *          A parameter object to pass to the statement.
   * @param rowBounds
   *          Bounds to limit object retrieval
   *
   * @return List of mapped object
   */
  <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds);

  /**
   * The selectMap is a special case in that it is designed to convert a list of results into a Map based on one of the
   * properties in the resulting objects. Eg. Return a of Map[Integer,Author] for selectMap("selectAuthors","id")
   *
   * @param <K>
   *          the returned Map keys type
   * @param <V>
   *          the returned Map values type
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param mapKey
   *          The property to use as key for each value in the list.
   *
   * @return Map containing key pair data.
   */
  <K, V> Map<K, V> selectMap(String statement, String mapKey);

  /**
   * The selectMap is a special case in that it is designed to convert a list of results into a Map based on one of the
   * properties in the resulting objects.
   *
   * @param <K>
   *          the returned Map keys type
   * @param <V>
   *          the returned Map values type
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param parameter
   *          A parameter object to pass to the statement.
   * @param mapKey
   *          The property to use as key for each value in the list.
   *
   * @return Map containing key pair data.
   */
  <K, V> Map<K, V> selectMap(String statement, Object parameter, String mapKey);

  /**
   * The selectMap is a special case in that it is designed to convert a list of results into a Map based on one of the
   * properties in the resulting objects.
   *
   * @param <K>
   *          the returned Map keys type
   * @param <V>
   *          the returned Map values type
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param parameter
   *          A parameter object to pass to the statement.
   * @param mapKey
   *          The property to use as key for each value in the list.
   * @param rowBounds
   *          Bounds to limit object retrieval
   *
   * @return Map containing key pair data.
   */
  <K, V> Map<K, V> selectMap(String statement, Object parameter, String mapKey, RowBounds rowBounds);

  /**
   * A Cursor offers the same results as a List, except it fetches data lazily using an Iterator.
   *
   * @param <T>
   *          the returned cursor element type.
   * @param statement
   *          Unique identifier matching the statement to use.
   *
   * @return Cursor of mapped objects
   */
  <T> Cursor<T> selectCursor(String statement);

  /**
   * A Cursor offers the same results as a List, except it fetches data lazily using an Iterator.
   *
   * @param <T>
   *          the returned cursor element type.
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param parameter
   *          A parameter object to pass to the statement.
   *
   * @return Cursor of mapped objects
   */
  <T> Cursor<T> selectCursor(String statement, Object parameter);

  /**
   * A Cursor offers the same results as a List, except it fetches data lazily using an Iterator.
   *
   * @param <T>
   *          the returned cursor element type.
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param parameter
   *          A parameter object to pass to the statement.
   * @param rowBounds
   *          Bounds to limit object retrieval
   *
   * @return Cursor of mapped objects
   */
  <T> Cursor<T> selectCursor(String statement, Object parameter, RowBounds rowBounds);

  /**
   * Retrieve a single row mapped from the statement key and parameter using a {@code ResultHandler}.
   *
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param parameter
   *          A parameter object to pass to the statement.
   * @param handler
   *          ResultHandler that will handle each retrieved row
   */
  void select(String statement, Object parameter, ResultHandler handler);

  /**
   * Retrieve a single row mapped from the statement using a {@code ResultHandler}.
   *
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param handler
   *          ResultHandler that will handle each retrieved row
   */
  void select(String statement, ResultHandler handler);

  /**
   * Retrieve a single row mapped from the statement key and parameter using a {@code ResultHandler} and
   * {@code RowBounds}.
   *
   * @param statement
   *          Unique identifier matching the statement to use.
   * @param parameter
   *          the parameter
   * @param rowBounds
   *          RowBound instance to limit the query results
   * @param handler
   *          ResultHandler that will handle each retrieved row
   */
  void select(String statement, Object parameter, RowBounds rowBounds, ResultHandler handler);

  /**
   * Execute an insert statement.
   *
   * @param statement
   *          Unique identifier matching the statement to execute.
   *
   * @return int The number of rows affected by the insert.
   */
  int insert(String statement);

  /**
   * Execute an insert statement with the given parameter object. Any generated autoincrement values or selectKey
   * entries will modify the given parameter object properties. Only the number of rows affected will be returned.
   *
   * @param statement
   *          Unique identifier matching the statement to execute.
   * @param parameter
   *          A parameter object to pass to the statement.
   *
   * @return int The number of rows affected by the insert.
   */
  int insert(String statement, Object parameter);

  /**
   * Execute an update statement. The number of rows affected will be returned.
   *
   * @param statement
   *          Unique identifier matching the statement to execute.
   *
   * @return int The number of rows affected by the update.
   */
  int update(String statement);

  /**
   * Execute an update statement. The number of rows affected will be returned.
   *
   * @param statement
   *          Unique identifier matching the statement to execute.
   * @param parameter
   *          A parameter object to pass to the statement.
   *
   * @return int The number of rows affected by the update.
   */
  int update(String statement, Object parameter);

  /**
   * Execute a delete statement. The number of rows affected will be returned.
   *
   * @param statement
   *          Unique identifier matching the statement to execute.
   *
   * @return int The number of rows affected by the delete.
   */
  int delete(String statement);

  /**
   * Execute a delete statement. The number of rows affected will be returned.
   *
   * @param statement
   *          Unique identifier matching the statement to execute.
   * @param parameter
   *          A parameter object to pass to the statement.
   *
   * @return int The number of rows affected by the delete.
   */
  int delete(String statement, Object parameter);

  /**
   * Flushes batch statements and commits database connection. Note that database connection will not be committed if no
   * updates/deletes/inserts were called. To force the commit call {@link SqlSession#commit(boolean)}
   */
  void commit();

  /**
   * Flushes batch statements and commits database connection.
   *
   * @param force
   *          forces connection commit
   */
  void commit(boolean force);

  /**
   * Discards pending batch statements and rolls database connection back. Note that database connection will not be
   * rolled back if no updates/deletes/inserts were called. To force the rollback call
   * {@link SqlSession#rollback(boolean)}
   */
  void rollback();

  /**
   * Discards pending batch statements and rolls database connection back. Note that database connection will not be
   * rolled back if no updates/deletes/inserts were called.
   *
   * @param force
   *          forces connection rollback
   */
  void rollback(boolean force);

  /**
   * Flushes batch statements.
   *
   * @return BatchResult list of updated records
   *
   * @since 3.0.6
   */
  List<BatchResult> flushStatements();

  /**
   * Closes the session.
   */
  @Override
  void close();

  /**
   * Clears local session cache.
   */
  void clearCache();

  /**
   * Retrieves current configuration.
   *
   * @return Configuration
   */
  Configuration getConfiguration();

  /**
   * Retrieves a mapper.
   *
   * @param <T>
   *          the mapper type
   * @param type
   *          Mapper interface class
   *
   * @return a mapper bound to this SqlSession
   */
  <T> T getMapper(Class<T> type);

  /**
   * Retrieves inner database connection.
   *
   * @return Connection
   */
  Connection getConnection();
}

```

对于 SqlSession 来说，Mybatis 只提供了一个 DefaultSqlSession

```java
public class DefaultSqlSession implements SqlSession {

  private final Configuration configuration;
  private final Executor executor;

  private final boolean autoCommit;
  private boolean dirty;
  private List<Cursor<?>> cursorList;

  public DefaultSqlSession(Configuration configuration, Executor executor, boolean autoCommit) {
    this.configuration = configuration;
    this.executor = executor;
    this.dirty = false;
    this.autoCommit = autoCommit;
  }

  public DefaultSqlSession(Configuration configuration, Executor executor) {
    this(configuration, executor, false);
  }

  @Override
  public <T> T selectOne(String statement) {
    return this.selectOne(statement, null);
  }

  @Override
  public <T> T selectOne(String statement, Object parameter) {
    // Popular vote was to return null on 0 results and throw exception on too many.
    List<T> list = this.selectList(statement, parameter);
    if (list.size() == 1) {
      return list.get(0);
    }
    if (list.size() > 1) {
      throw new TooManyResultsException(
          "Expected one result (or null) to be returned by selectOne(), but found: " + list.size());
    } else {
      return null;
    }
  }

  @Override
  public <K, V> Map<K, V> selectMap(String statement, String mapKey) {
    return this.selectMap(statement, null, mapKey, RowBounds.DEFAULT);
  }

  @Override
  public <K, V> Map<K, V> selectMap(String statement, Object parameter, String mapKey) {
    return this.selectMap(statement, parameter, mapKey, RowBounds.DEFAULT);
  }

  @Override
  public <K, V> Map<K, V> selectMap(String statement, Object parameter, String mapKey, RowBounds rowBounds) {
    final List<? extends V> list = selectList(statement, parameter, rowBounds);
    final DefaultMapResultHandler<K, V> mapResultHandler = new DefaultMapResultHandler<>(mapKey,
        configuration.getObjectFactory(), configuration.getObjectWrapperFactory(), configuration.getReflectorFactory());
    final DefaultResultContext<V> context = new DefaultResultContext<>();
    for (V o : list) {
      context.nextResultObject(o);
      mapResultHandler.handleResult(context);
    }
    return mapResultHandler.getMappedResults();
  }

  @Override
  public <T> Cursor<T> selectCursor(String statement) {
    return selectCursor(statement, null);
  }

  @Override
  public <T> Cursor<T> selectCursor(String statement, Object parameter) {
    return selectCursor(statement, parameter, RowBounds.DEFAULT);
  }

  @Override
  public <T> Cursor<T> selectCursor(String statement, Object parameter, RowBounds rowBounds) {
    try {
      MappedStatement ms = configuration.getMappedStatement(statement);
      dirty |= ms.isDirtySelect();
      Cursor<T> cursor = executor.queryCursor(ms, wrapCollection(parameter), rowBounds);
      registerCursor(cursor);
      return cursor;
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error querying database.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }

  @Override
  public <E> List<E> selectList(String statement) {
    return this.selectList(statement, null);
  }

  @Override
  public <E> List<E> selectList(String statement, Object parameter) {
    return this.selectList(statement, parameter, RowBounds.DEFAULT);
  }

  @Override
  public <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds) {
    return selectList(statement, parameter, rowBounds, Executor.NO_RESULT_HANDLER);
  }

  private <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds, ResultHandler handler) {
    try {
      MappedStatement ms = configuration.getMappedStatement(statement);
      dirty |= ms.isDirtySelect();
      return executor.query(ms, wrapCollection(parameter), rowBounds, handler);
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error querying database.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }

  @Override
  public void select(String statement, Object parameter, ResultHandler handler) {
    select(statement, parameter, RowBounds.DEFAULT, handler);
  }

  @Override
  public void select(String statement, ResultHandler handler) {
    select(statement, null, RowBounds.DEFAULT, handler);
  }

  @Override
  public void select(String statement, Object parameter, RowBounds rowBounds, ResultHandler handler) {
    selectList(statement, parameter, rowBounds, handler);
  }

  @Override
  public int insert(String statement) {
    return insert(statement, null);
  }

  @Override
  public int insert(String statement, Object parameter) {
    return update(statement, parameter);
  }

  @Override
  public int update(String statement) {
    return update(statement, null);
  }

  @Override
  public int update(String statement, Object parameter) {
    try {
      dirty = true;
      MappedStatement ms = configuration.getMappedStatement(statement);
      return executor.update(ms, wrapCollection(parameter));
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error updating database.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }

  @Override
  public int delete(String statement) {
    return update(statement, null);
  }

  @Override
  public int delete(String statement, Object parameter) {
    return update(statement, parameter);
  }

  @Override
  public void commit() {
    commit(false);
  }

  @Override
  public void commit(boolean force) {
    try {
      executor.commit(isCommitOrRollbackRequired(force));
      dirty = false;
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error committing transaction.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }

  @Override
  public void rollback() {
    rollback(false);
  }

  @Override
  public void rollback(boolean force) {
    try {
      executor.rollback(isCommitOrRollbackRequired(force));
      dirty = false;
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error rolling back transaction.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }

  @Override
  public List<BatchResult> flushStatements() {
    try {
      return executor.flushStatements();
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error flushing statements.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }

  @Override
  public void close() {
    try {
      executor.close(isCommitOrRollbackRequired(false));
      closeCursors();
      dirty = false;
    } finally {
      ErrorContext.instance().reset();
    }
  }

  private void closeCursors() {
    if (cursorList != null && !cursorList.isEmpty()) {
      for (Cursor<?> cursor : cursorList) {
        try {
          cursor.close();
        } catch (IOException e) {
          throw ExceptionFactory.wrapException("Error closing cursor.  Cause: " + e, e);
        }
      }
      cursorList.clear();
    }
  }

  @Override
  public Configuration getConfiguration() {
    return configuration;
  }

  @Override
  public <T> T getMapper(Class<T> type) {
    return configuration.getMapper(type, this);
  }

  @Override
  public Connection getConnection() {
    try {
      return executor.getTransaction().getConnection();
    } catch (SQLException e) {
      throw ExceptionFactory.wrapException("Error getting a new connection.  Cause: " + e, e);
    }
  }

  @Override
  public void clearCache() {
    executor.clearLocalCache();
  }

  private <T> void registerCursor(Cursor<T> cursor) {
    if (cursorList == null) {
      cursorList = new ArrayList<>();
    }
    cursorList.add(cursor);
  }

  private boolean isCommitOrRollbackRequired(boolean force) {
    return !autoCommit && dirty || force;
  }

  private Object wrapCollection(final Object object) {
    return ParamNameResolver.wrapToMapIfCollection(object, null);
  }

  /**
   * @deprecated Since 3.5.5
   */
  @Deprecated
  public static class StrictMap<V> extends HashMap<String, V> {

    private static final long serialVersionUID = -5741767162221585340L;

    @Override
    public V get(Object key) {
      if (!super.containsKey(key)) {
        throw new BindingException("Parameter '" + key + "' not found. Available parameters are " + this.keySet());
      }
      return super.get(key);
    }

  }

}

```

以 selectList 为例：

```java
 private <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds, ResultHandler handler) {
    try {
      //根据提供的ID获取MappedStatement
      MappedStatement ms = configuration.getMappedStatement(statement);
      dirty |= ms.isDirtySelect();
      // 执行query方法
      return executor.query(ms, wrapCollection(parameter), rowBounds, handler);
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error querying database.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }

```

在 DefaultSqlSession 的 selectList()方法中，首先根据 Mapper 的 Id 从 Configuration 对象中获取对应的 MappedStatement 对象，然后以 MappedStatement 对象作为参数，调用 Executor 实例的 query()方法完成查询操作。

接下来需要跟踪 query 方法，Executor 是个接口，他有一个实现 BaseExecutor，该类的 query 方法就是我们的研究对象，在 BaseExecutor 类的 query()方法中，首先从 MappedStatement 对象中获取 BoundSql 对象，BoundSql 类中封装了经过解析后的 SQL 语句及参数映射信息。然后创建 CacheKey 对象，该对象用于缓存的 Key 值。

```java
  @Override
  public <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler)
      throws SQLException {
    BoundSql boundSql = ms.getBoundSql(parameter);
    CacheKey key = createCacheKey(ms, parameter, rowBounds, boundSql);
    return query(ms, parameter, rowBounds, resultHandler, key, boundSql);
  }

```

当然，query 还有一个重载实现，在重载的 query()方法中，首先从 MyBatis 一级缓存中获取查询结果，如果缓存中没有，则调用 BaseExecutor 类的 queryFromDatabase()方法从数据库中查询

```java
  @SuppressWarnings("unchecked")
  @Override
  public <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler,
      CacheKey key, BoundSql boundSql) throws SQLException {
    ErrorContext.instance().resource(ms.getResource()).activity("executing a query").object(ms.getId());
    if (closed) {
      throw new ExecutorException("Executor was closed.");
    }
    if (queryStack == 0 && ms.isFlushCacheRequired()) {
      clearLocalCache();
    }
    List<E> list;
    try {
      queryStack++;
      list = resultHandler == null ? (List<E>) localCache.getObject(key) : null;
      if (list != null) {
        handleLocallyCachedOutputParameters(ms, key, parameter, boundSql);
      } else {
        list = queryFromDatabase(ms, parameter, rowBounds, resultHandler, key, boundSql);
      }
    } finally {
      queryStack--;
    }
    if (queryStack == 0) {
      for (DeferredLoad deferredLoad : deferredLoads) {
        deferredLoad.load();
      }
      // issue #601
      deferredLoads.clear();
      if (configuration.getLocalCacheScope() == LocalCacheScope.STATEMENT) {
        // issue #482
        clearLocalCache();
      }
    }
    return list;
  }
```

像以上代码，Mybatis 首先会尝试从缓存中获取结果，缓存中没有就会调用 queryFromDatabase 方法从数据库中获取数据，以下代码核心逻辑在于调用 doQuery()方法进行查询，然后将查询结果进行缓存，doQuery()是一个模板方法，由 BaseExecutor 子类实现。

```java
private <E> List<E> queryFromDatabase(MappedStatement ms, Object parameter, RowBounds rowBounds,
      ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {
    List<E> list;
    localCache.putObject(key, EXECUTION_PLACEHOLDER);
    try {
      //执行查询方法
      list = doQuery(ms, parameter, rowBounds, resultHandler, boundSql);
    } finally {
      localCache.removeObject(key);
    }
    //从缓存中获取结果
    localCache.putObject(key, list);
    if (ms.getStatementType() == StatementType.CALLABLE) {
      localOutputParameterCache.putObject(key, parameter);
    }
    return list;
  }



```

#### SimpleExecutor 实现细节

Executor 有几个不同的实现，分别为 BatchExecutor、SimpleExecutor 和 ReuseExecutor

首先先来查看 SimpleExecutor 对 Executor 的实现

```java
public class SimpleExecutor extends BaseExecutor {

  public SimpleExecutor(Configuration configuration, Transaction transaction) {
    super(configuration, transaction);
  }

  ...

  @Override
  public <E> List<E> doQuery(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler,
      BoundSql boundSql) throws SQLException {
    Statement stmt = null;
    try {
      Configuration configuration = ms.getConfiguration();
      // 获取StatementHandler对象
      StatementHandler handler = configuration.newStatementHandler(wrapper, ms, parameter, rowBounds, resultHandler,
          boundSql);
      // 通过prepareStatement方法创建Statement并设置参数
      stmt = prepareStatement(handler, ms.getStatementLog());
      // 最后交由StatementHandler进行查询处理
      return handler.query(stmt, resultHandler);
    } finally {
      closeStatement(stmt);
    }
  }

 ...
}
```

在 SimpleExecutor 类的 doQuery()方法中，首先调用 Configuration 对象的 newStatementHandler()方法创建 StatementHandler 对象。newStatementHandler()方法返回的是 RoutingStatementHandler 的实例。在 RoutingStatementHandler 类中，会根据配置 Mapper 时 statementType 属性指定的 StatementHandler 类型创建对应的 StatementHandler 实例进行处理，例如 statementType 属性值为 SIMPLE 时，则创建 SimpleStatementHandler 实例。

StatementHandler 对象创建完毕后，接着调用 SimpleExecutor 类的 prepareStatement()方法创建 JDBC 中的 Statement 对象，然后为 Statement 对象设置参数操作。Statement 对象初始化工作完成后，再调用 StatementHandler 的 query()方法执行查询操作。

prepareStatement()是如何对参数进行配置的呢？

```java
  private Statement prepareStatement(StatementHandler handler, Log statementLog) throws SQLException {
    Statement stmt;
    Connection connection = getConnection(statementLog);
    stmt = handler.prepare(connection, transaction.getTimeout());
    handler.parameterize(stmt);
    return stmt;
  }
```

prepareStatement 方法首先获取 JDBC 中的 Connection 对象，然后调用 StatementHandler 对象的 prepare()方法创建 Statement 对象，接着调用 StatementHandler 对象的 parameterize()方法（parameterize()方法中会使用 ParameterHandler 为 Statement 对象设置参数）。

#### StatementHandler 实现细节

MyBatis 的 StatementHandler 接口有几个不同的实现类，分别为 SimpleStatementHandler、PreparedStatementHandler 和 CallableStatementHandler。MyBatis 默认情况下会使用 PreparedStatementHandler 与数据库交互。既然如此，那就着重探讨一下 PreparedStatementHandler 是如何进行数据库访问的。从以上的 doQuery 方法来看，查询最终会执行 handler 的 query 方法，即 PreparedStatementHandler 的 query 方法。

在这里会首先调用 PreparedStatement 对象的 execute()方法执行 SQL 语句，然后调用 ResultSetHandler 的 handleResultSets()方法处理结果集。ResultSetHandler 在 PreparedStatement 的父类 BaseStatementHandler 中有定义

```java
  @Override
  public <E> List<E> query(Statement statement, ResultHandler resultHandler) throws SQLException {
    PreparedStatement ps = (PreparedStatement) statement;
    ps.execute();
    return resultSetHandler.handleResultSets(ps);
  }
```

而 ResultSetHandler 只有一个默认的实现，即 DefaultResultSetHandler 类。

```java
  //
  // HANDLE RESULT SETS
  //
  @Override
  public List<Object> handleResultSets(Statement stmt) throws SQLException {
    ErrorContext.instance().activity("handling results").object(mappedStatement.getId());

    final List<Object> multipleResults = new ArrayList<>();

    int resultSetCount = 0;
    ResultSetWrapper rsw = getFirstResultSet(stmt);

    List<ResultMap> resultMaps = mappedStatement.getResultMaps();
    int resultMapCount = resultMaps.size();
    validateResultMapsCount(rsw, resultMapCount);
    while (rsw != null && resultMapCount > resultSetCount) {
      ResultMap resultMap = resultMaps.get(resultSetCount);
      handleResultSet(rsw, resultMap, multipleResults, null);
      rsw = getNextResultSet(stmt);
      cleanUpAfterHandlingResultSet();
      resultSetCount++;
    }

    String[] resultSets = mappedStatement.getResultSets();
    if (resultSets != null) {
      while (rsw != null && resultSetCount < resultSets.length) {
        ResultMapping parentMapping = nextResultMaps.get(resultSets[resultSetCount]);
        if (parentMapping != null) {
          String nestedResultMapId = parentMapping.getNestedResultMapId();
          ResultMap resultMap = configuration.getResultMap(nestedResultMapId);
          handleResultSet(rsw, resultMap, null, parentMapping);
        }
        rsw = getNextResultSet(stmt);
        cleanUpAfterHandlingResultSet();
        resultSetCount++;
      }
    }
    //如果只有一个结果集，则返回结果集中的元素，否则返回多个结果集
    return collapseSingleResultList(multipleResults);
  }

```

这里的具体逻辑如下：

1. 首先从 Statement 对象中获取 ResultSet 对象，然后将 ResultSet 包装为 ResultSetWrapper 对象，通过 ResultSetWrapper 对象能够更方便地获取数据库字段名称以及字段对应的 TypeHandler 信息。
2. 获取 Mapper SQL 配置中通过 resultMap 属性指定的 ResultMap 信息，一条 SQL Mapper 配置一般只对应一个 ResultMap。
3. 调用 handleResultSet()方法对 ResultSetWrapper 对象进行处理，将结果集转换为 Java 实体对象，然后将生成的实体对象存放在 multipleResults 列表中。
4. 调用 collapseSingleResultList()方法对 multipleResults 进行处理，如果只有一个结果集，就返回结果集中的元素，否则返回多个结果集。

自此，整个 Mapper 的执行过程也就结束了。

## Mybatis 中的缓存

### 一级缓存

MyBatis 的缓存分为一级缓存和二级缓存，一级缓存默认是开启的，而且不能关闭。至于一级缓存为什么不能关闭，MyBatis 核心开发人员做出了解释：MyBatis 的一些关键特性（例如通过\<association>和\<collection>建立级联映射、避免循环引用（circular references）、加速重复嵌套查询等）都是基于 MyBatis 一级缓存实现的，而且 MyBatis 结果集映射相关代码重度依赖 CacheKey，所以目前 MyBatis 不支持关闭一级缓存。

MyBatis 提供了一个配置参数 localCacheScope，用于控制一级缓存的级别

1. SESSION
2. STATEMENT

当指定 localCacheScope 参数值为 SESSION 时，缓存对整个 SqlSession 有效，只有执行 DML 语句（更新语句）时，缓存才会被清除。当 localCacheScope 值为 STATEMENT 时，缓存仅对当前执行的语句有效，当语句执行完毕后，缓存就会被清空。

### 二级缓存

1. 在 MyBatis 主配置文件中指定 cacheEnabled 属性值为 true。
2. 在 MyBatis Mapper 配置文件中，配置缓存策略、缓存刷新频率、缓存的容量等属性
3. 在配置 Mapper 时，通过 useCache 属性指定 Mapper 执行时是否使用缓存。另外，还可以通过 flushCache 属性指定 Mapper 执行后是否刷新缓存

通过上面的配置，MyBatis 的二级缓存就可以生效了。执行查询操作时，查询结果会缓存到二级缓存中，执行更新操作后，二级缓存会被清空

### Mybatis 缓存的实现

MyBatis 的缓存基于 JVM 堆内存实现，即所有的缓存数据都存放在 Java 对象中，并且为缓存的操作行为定义了接口。

```java
public interface Cache {

  /**
   * @return The identifier of this cache
   */
  String getId();

  /**
   * @param key
   *          Can be any object but usually it is a {@link CacheKey}
   * @param value
   *          The result of a select.
   */
  void putObject(Object key, Object value);

  /**
   * @param key
   *          The key
   *
   * @return The object stored in the cache.
   */
  Object getObject(Object key);

  /**
   * As of 3.3.0 this method is only called during a rollback for any previous value that was missing in the cache. This
   * lets any blocking cache to release the lock that may have previously put on the key. A blocking cache puts a lock
   * when a value is null and releases it when the value is back again. This way other threads will wait for the value
   * to be available instead of hitting the database.
   *
   * @param key
   *          The key
   *
   * @return Not used
   */
  Object removeObject(Object key);

  /**
   * Clears this cache instance.
   */
  void clear();

  /**
   * Optional. This method is not called by the core.
   *
   * @return The number of elements stored in the cache (not its capacity).
   */
  int getSize();

  /**
   * Optional. As of 3.2.6 this method is no longer called by the core.
   * <p>
   * Any locking needed by the cache must be provided internally by the cache provider.
   *
   * @return A ReadWriteLock
   */
  default ReadWriteLock getReadWriteLock() {
    return null;
  }

}

```

MyBatis 中的缓存类采用装饰器模式设计，Cache 接口有一个基本的实现类，即 PerpetualCache 类，该类的实现比较简单，通过一个 HashMap 实例存放缓存对象。需要注意的是，PerpetualCache 类重写了 Object 类的 equals()方法，当两个缓存对象的 Id 相同时，即认为缓存对象相同。

```java
public class PerpetualCache implements Cache {

  private final String id;

  private final Map<Object, Object> cache = new HashMap<>();

  public PerpetualCache(String id) {
    this.id = id;
  }

  @Override
  public String getId() {
    return id;
  }

  @Override
  public int getSize() {
    return cache.size();
  }

  @Override
  public void putObject(Object key, Object value) {
    cache.put(key, value);
  }

  @Override
  public Object getObject(Object key) {
    return cache.get(key);
  }

  @Override
  public Object removeObject(Object key) {
    return cache.remove(key);
  }

  @Override
  public void clear() {
    cache.clear();
  }

  @Override
  public boolean equals(Object o) {
    if (getId() == null) {
      throw new CacheException("Cache instances require an ID.");
    }
    if (this == o) {
      return true;
    }
    if (!(o instanceof Cache)) {
      return false;
    }

    Cache otherCache = (Cache) o;
    return getId().equals(otherCache.getId());
  }

  @Override
  public int hashCode() {
    if (getId() == null) {
      throw new CacheException("Cache instances require an ID.");
    }
    return getId().hashCode();
  }

}

```

除了基础的 PerpetualCache 类之外，MyBatis 中为了对 PerpetualCache 类的功能进行增强，提供了一些缓存的装饰器类

BlockingCache：阻塞版本的缓存装饰器，能够保证同一时间只有一个线程到缓存中查找指定的 Key 对应的数据。

FifoCache：先入先出缓存装饰器，FifoCache 内部有一个维护具有长度限制的 Key 键值链表（LinkedList 实例）和一个被装饰的缓存对象，Key 值链表主要是维护 Key 的 FIFO 顺序，而缓存存储和获取则交给被装饰的缓存对象来完成。

LoggingCache：为缓存增加日志输出功能，记录缓存的请求次数和命中次数，通过日志输出缓存命中率。

LruCache：最近最少使用的缓存装饰器，当缓存容量满了之后，使用 LRU 算法淘汰最近最少使用的 Key 和 Value。LruCache 中通过重写 LinkedHashMap 类的 removeEldestEntry()方法获取最近最少使用的 Key 值，将 Key 值保存在 LruCache 类的 eldestKey 属性中，然后在缓存中添加对象时，淘汰 eldestKey 对应的 Value 值。具体实现细节读者可参考 LruCache 类的源码。

ScheduledCache：自动刷新缓存装饰器，当操作缓存对象时，如果当前时间与上次清空缓存的时间间隔大于指定的时间间隔，则清空缓存。清空缓存的动作由 getObject()、putObject()、removeObject()等方法触发。

SerializedCache：序列化缓存装饰器，向缓存中添加对象时，对添加的对象进行序列化处理，从缓存中取出对象时，进行反序列化处理。SoftCache：软引用缓存装饰器，SoftCache 内部维护了一个缓存对象的强引用队列和软引用队列，缓存以软引用的方式添加到缓存中，并将软引用添加到队列中，获取缓存对象时，如果对象已经被回收，则移除 Key，如果未被回收，则将对象添加到强引用队列中，避免被回收，如果强引用队列已经满了，则移除最早入队列的对象的引用。

SynchronizedCache：线程安全缓存装饰器，SynchronizedCache 的实现比较简单，为了保证线程安全，对操作缓存的方法使用 synchronized 关键字修饰。TransactionalCache：事务缓存装饰器，该缓存与其他缓存的不同之处在于，TransactionalCache 增加了两个方法，即 commit()和 rollback()。当写入缓存时，只有调用 commit()方法

Cache 的使用也是非常简单，我们可以使用 MyBatis 提供的缓存装饰器类对基础的 PerpetualCache 类的功能进行增强，使用不同的装饰器后，缓存对象则拥有对应的功能。

```java
    public void testCache() {
        final int N = 10000;
        Cache cache = new PerpetualCache("default");
        cache = new TransactionalCache(cache);
        for (int i = 0; i < N; i++) {
            cache.putObject(i,i);
            ((TransactionalCache)cache).commit();
        }
       log.info(String.valueOf(cache.getSize()));
    }
```

### 一级缓存的实现原理

MyBatis 的一级缓存是 SqlSession 级别的缓存，SqlSession 提供了面向用户的 API，但是真正执行 SQL 操作的是 Executor 组件。Executor 采用模板方法设计模式，BaseExecutor 类用于处理一些通用的逻辑，其中一级缓存相关的逻辑就是在 BaseExecutor 类中完成的。

那么接下来我们就动手进入到 BaseExecutor 中看看，一级缓存使用 PerpetualCache 实例实现，在 BaseExecutor 类中维护了两个 PerpetualCache 属性

1. localCache 属性用于缓存 MyBatis 查询结果
2. localOutputParameterCache 属性用于缓存存储过程调用结果

```java
public abstract class BaseExecutor implements Executor {

  private static final Log log = LogFactory.getLog(BaseExecutor.class);

  protected Transaction transaction;
  protected Executor wrapper;

  protected ConcurrentLinkedQueue<DeferredLoad> deferredLoads;
  protected PerpetualCache localCache;
  protected PerpetualCache localOutputParameterCache;
  protected Configuration configuration;

...
}
```

在初始化的时候，Mybatis 就创建了 key 为 LocalCache 和 LocalOutputParameterCache 的缓存了，如果两次查询操作 CacheKey 对象相同，就认为这两次查询执行的是相同的 SQL 语句

```java
  protected BaseExecutor(Configuration configuration, Transaction transaction) {
    this.transaction = transaction;
    this.deferredLoads = new ConcurrentLinkedQueue<>();
    this.localCache = new PerpetualCache("LocalCache");
    this.localOutputParameterCache = new PerpetualCache("LocalOutputParameterCache");
    this.closed = false;
    this.configuration = configuration;
    this.wrapper = this;
  }
```

在查询 query 方法时会使用到 Cache

```java
  @Override
  public <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler)
      throws SQLException {
    BoundSql boundSql = ms.getBoundSql(parameter);
    CacheKey key = createCacheKey(ms, parameter, rowBounds, boundSql);
    return query(ms, parameter, rowBounds, resultHandler, key, boundSql);
  }
```

createCacheKey 是查询时采用的构建一级缓存的方法，而这段代码就是描述了在什么条件下我们认为两次查询的 SQL 的结果是一致 的

1. Mapper 的 Id，即 Mapper 命名空间与\<select|update|insert|delete>标签的 Id 组成的全局限定名。
2. 查询结果的偏移量及查询的条数。
3. 具体的 SQL 语句及 SQL 语句中需要传递的所有参数。
4. MyBatis 主配置文件中，通过\<environment>标签配置的环境信息对应的 Id 属性值。

执行两次查询时，只有上面的信息完全相同时，才会认为两次查询执行的是相同的 SQL 语句，缓存才会生效

```java
@Override
  public CacheKey createCacheKey(MappedStatement ms, Object parameterObject, RowBounds rowBounds, BoundSql boundSql) {
    if (closed) {
      throw new ExecutorException("Executor was closed.");
    }
    CacheKey cacheKey = new CacheKey();
    cacheKey.update(ms.getId());//Mapper ID
    cacheKey.update(rowBounds.getOffset()); // 偏移量
    cacheKey.update(rowBounds.getLimit()); // 条数
    cacheKey.update(boundSql.getSql());// SQL语句
    List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
    TypeHandlerRegistry typeHandlerRegistry = ms.getConfiguration().getTypeHandlerRegistry();
    // mimic DefaultParameterHandler logic
    MetaObject metaObject = null;
    for (ParameterMapping parameterMapping : parameterMappings) {
      if (parameterMapping.getMode() != ParameterMode.OUT) {
        Object value;
        String propertyName = parameterMapping.getProperty();
        if (boundSql.hasAdditionalParameter(propertyName)) {
          value = boundSql.getAdditionalParameter(propertyName);
        } else if (parameterObject == null) {
          value = null;
        } else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
          value = parameterObject;
        } else {
          if (metaObject == null) {
            metaObject = configuration.newMetaObject(parameterObject);
          }
          value = metaObject.getValue(propertyName);
        }
        cacheKey.update(value);
      }
    }
    if (configuration.getEnvironment() != null) {
      // issue #176
      cacheKey.update(configuration.getEnvironment().getId());
    }
    return cacheKey;
  }
```

好，我们明白了什么情况下会使用 cache 了，那么 cache 是如何使用的呢，继续回头看 query 方法，他最终会返回 query 的重载方法，在 BaseExecutor 类的 query()方法中，首先根据缓存 Key 从 localCache 属性中查找是否有缓存对象，如果查找不到，则调用 queryFromDatabase()方法从数据库中获取数据，然后将数据写入 localCache 对象中。如果 localCache 中缓存了本次查询的结果，则直接从缓存中获取。需要注意的是，如果 localCacheScope 属性设置为 STATEMENT，则每次查询操作完成后，都会调用 clearLocalCache()方法清空缓存。

```java
  @SuppressWarnings("unchecked")
  @Override
  public <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler,
      CacheKey key, BoundSql boundSql) throws SQLException {
    ErrorContext.instance().resource(ms.getResource()).activity("executing a query").object(ms.getId());
    if (closed) {
      throw new ExecutorException("Executor was closed.");
    }
    if (queryStack == 0 && ms.isFlushCacheRequired()) {
      clearLocalCache();
    }
    List<E> list;
    try {
      queryStack++;
      //从缓存中获取结果
      list = resultHandler == null ? (List<E>) localCache.getObject(key) : null;
      if (list != null) {
        handleLocallyCachedOutputParameters(ms, key, parameter, boundSql);
      } else {
        //缓存中获取不到了，到数据库中获取
        list = queryFromDatabase(ms, parameter, rowBounds, resultHandler, key, boundSql);
      }
    } finally {
      queryStack--;
    }
    if (queryStack == 0) {
      for (DeferredLoad deferredLoad : deferredLoads) {
        deferredLoad.load();
      }
      // issue #601
      deferredLoads.clear();
      if (configuration.getLocalCacheScope() == LocalCacheScope.STATEMENT) {
        // issue #482
        clearLocalCache();
      }
    }
    return list;
  }
```

除此之外，MyBatis 会在执行完任意更新语句后清空缓存，我们可以看一下 BaseExecutor 类的 update()方法，可以看到，MyBatis 在调用 doUpdate()方法完成更新操作之前，首先会调用 clearLocalCache()方法清空缓存。

```java
  @Override
  public int update(MappedStatement ms, Object parameter) throws SQLException {
    ErrorContext.instance().resource(ms.getResource()).activity("executing an update").object(ms.getId());
    if (closed) {
      throw new ExecutorException("Executor was closed.");
    }
    clearLocalCache();
    return doUpdate(ms, parameter);
  }
```

在分布式环境下，务必将 MyBatis 的 localCacheScope 属性设置为 STATEMENT，避免其他应用节点执行 SQL 更新语句后，本节点缓存得不到刷新而导致的数据一致性问题。

### 二级缓存的实现原理

MyBatis 二级缓存在默认情况下是关闭的，因此需要通过设置 cacheEnabled 参数值为 true 来开启二级缓存。

之前就有提到过，作为处理 Mapper 的 Executor 有着多种实现，其中 CachingExecutor 相对于其他几个实现来说，多增加了二级缓存的功能

在 Configuration 类中有着一个非常典型的工厂方法模式的使用，就是 Executor 实例的生成，在 Configuration 中有一个 newExecutor 方法用于根据 executorType 来判断使用什么 Executor 的

下面代码：如果 cacheEnabled 属性值为 true（开启了二级缓存），则使用 CachingExecutor 对普通的 Executor 对象进行装饰，CachingExecutor 在普通 Executor 的基础上增加了二级缓存功能

```java
  public Executor newExecutor(Transaction transaction, ExecutorType executorType) {
    executorType = executorType == null ? defaultExecutorType : executorType;
    Executor executor;
    if (ExecutorType.BATCH == executorType) {
      executor = new BatchExecutor(this, transaction);
    } else if (ExecutorType.REUSE == executorType) {
      executor = new ReuseExecutor(this, transaction);
    } else {
      executor = new SimpleExecutor(this, transaction);
    }
    //  这里就是根据cacheEnabled来判断是否使用CachingExecutor，这里使用了装饰者模式增强功能
    if (cacheEnabled) {
      executor = new CachingExecutor(executor);
    }
    return (Executor) interceptorChain.pluginAll(executor);
  }
```

好，我们目前清楚了 CachingExecutor 是如何诞生的，那么接下来我们就深入到 CachingExecutor 中，看看他是如何实现二级缓存的吧

首先我们看看他维护了什么的资源，CachingExecutor 是个增强类，所以肯定是先需要一个普通的 Executor 的，然后就是 TransactionalCacheManager，TransactionalCacheManager 用于管理所有的二级缓存对象。

```java
public class CachingExecutor implements Executor {

  private final Executor delegate;
  private final TransactionalCacheManager tcm = new TransactionalCacheManager();
```

不妨我们先探究一下 TransactionalCacheManager 是如何实现的

以下代码通过一个 HashMap 对象维护所有二级缓存实例对应的 TransactionalCache 对象，在 TransactionalCacheManager 类的 getObject()方法和 putObject()方法中都会调用 getTransactionalCache()方法获取二级缓存对象对应的 TransactionalCache 对象，然后对 TransactionalCache 对象进行操作。

```java
public class TransactionalCacheManager {

  // 维护着二级缓存对应的TransactionalCache实例
  private final Map<Cache, TransactionalCache> transactionalCaches = new HashMap<>();

  public void clear(Cache cache) {
    getTransactionalCache(cache).clear();
  }

  public Object getObject(Cache cache, CacheKey key) {
    return getTransactionalCache(cache).getObject(key);
  }

  public void putObject(Cache cache, CacheKey key, Object value) {
    getTransactionalCache(cache).putObject(key, value);
  }

  public void commit() {
    for (TransactionalCache txCache : transactionalCaches.values()) {
      txCache.commit();
    }
  }

  public void rollback() {
    for (TransactionalCache txCache : transactionalCaches.values()) {
      txCache.rollback();
    }
  }

  private TransactionalCache getTransactionalCache(Cache cache) {
    // 获取二级缓存对应的TransactionalCache，如果获取不到则创建一个添加到啊Map中
    return MapUtil.computeIfAbsent(transactionalCaches, cache, TransactionalCache::new);
  }

}

```

好了，对于管理缓存的对象我们已经找到了，那么接下来我们就要探讨一下 CachingExecutor 是如何基于二级缓存来进行查询的吧

首先他跟我们以往看过的 SImpleExecutor 的 query 是没什么区别的

```java
 @Override
  public <E> List<E> query(MappedStatement ms, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler)
      throws SQLException {
    BoundSql boundSql = ms.getBoundSql(parameterObject);
    CacheKey key = createCacheKey(ms, parameterObject, rowBounds, boundSql);
    return query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);
  }
```

关键在于返回的 query 重载方法上

在 CachingExecutor 的 query()方法中，首先调用 createCacheKey()方法创建缓存 Key 对象，然后调用 MappedStatement 对象的 getCache()方法获取 MappedStatement 对象中维护的二级缓存对象。然后尝试从二级缓存对象中获取结果，如果获取不到，则调用目标 Executor 对象的 query()方法从数据库获取数据，再将数据添加到二级缓存中。当执行更新语句后，同一命名空间下的二级缓存将会被清空。

```java
 @Override
  public <E> List<E> query(MappedStatement ms, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler,
      CacheKey key, BoundSql boundSql) throws SQLException {
    // MappedStatement对象中获取维护的二级缓存对象
    Cache cache = ms.getCache();
    if (cache != null) {
      // 判断是否需要刷新二级缓存
      flushCacheIfRequired(ms);
      if (ms.isUseCache() && resultHandler == null) {
        ensureNoOutParams(ms, boundSql);
        @SuppressWarnings("unchecked")
        //从TransactionalCacheManager中根据cache和key获取对应的数据
        List<E> list = (List<E>) tcm.getObject(cache, key);
        if (list == null) {
          // 获取不到则从数据库中获取
          list = delegate.query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);
          //重新将数据添加到缓存管理中
          tcm.putObject(cache, key, list); // issue #578 and #116
        }
        return list;
      }
    }
    return delegate.query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);
  }
```

跟 SimpleExecutor 相似的就是缓存也会在触发 update 方法时被刷新或者清除

```java
 @Override
  public int update(MappedStatement ms, Object parameterObject) throws SQLException {
    flushCacheIfRequired(ms);
    return delegate.update(ms, parameterObject);
  }

```

而是否进行清除缓存需要查看\<select|update|delete|insert>标签的 flushCache 属性，如果属性值为 true，就清空缓存。\<select>标签的 flushCache 属性值默认为 false，而\<update|delete|insert>标签的 flushCache 属性值默认为 true。

```java
  private void flushCacheIfRequired(MappedStatement ms) {
    Cache cache = ms.getCache();
    if (cache != null && ms.isFlushCacheRequired()) {
      tcm.clear(cache);
    }
  }
```

二级缓存的实现就是这样的了，而刚刚有提到 Cache 其实是从 MappedStatement 对象中获取的，所以这部分我们也是需要一探究竟的

XMLMapperBuilder 在解析 Mapper 配置时会调用 cacheElement()方法解析\<cache>标签，在获取\<cache>标签的所有属性信息后，调用 MapperBuilderAssistant 对象的 userNewCache()方法创建二级缓存实例，然后通过 MapperBuilderAssistant 的 currentCache 属性保存二级缓存对象的引用。在调用 MapperBuilderAssistant 对象的 addMappedStatement()方法创建 MappedStatement 对象时会将当前命名空间对应的二级缓存对象的引用添加到 MappedStatement 对象中。

```java
public class XMLMapperBuilder extends BaseBuilder {


  private final MapperBuilderAssistant builderAssistant;

...
}
```

```java
  private void cacheElement(XNode context) {
    if (context != null) {
      String type = context.getStringAttribute("type", "PERPETUAL");
      Class<? extends Cache> typeClass = typeAliasRegistry.resolveAlias(type);
      String eviction = context.getStringAttribute("eviction", "LRU");
      Class<? extends Cache> evictionClass = typeAliasRegistry.resolveAlias(eviction);
      Long flushInterval = context.getLongAttribute("flushInterval");
      Integer size = context.getIntAttribute("size");
      boolean readWrite = !context.getBooleanAttribute("readOnly", false);
      boolean blocking = context.getBooleanAttribute("blocking", false);
      Properties props = context.getChildrenAsProperties();
      builderAssistant.useNewCache(typeClass, evictionClass, flushInterval, size, readWrite, blocking, props);
    }
  }
```

useNewCache 就是将 currentCache 设置为传入的 cache

```java
  public Cache useNewCache(Class<? extends Cache> typeClass, Class<? extends Cache> evictionClass, Long flushInterval,
      Integer size, boolean readWrite, boolean blocking, Properties props) {
    Cache cache = new CacheBuilder(currentNamespace).implementation(valueOrDefault(typeClass, PerpetualCache.class))
        .addDecorator(valueOrDefault(evictionClass, LruCache.class)).clearInterval(flushInterval).size(size)
        .readWrite(readWrite).blocking(blocking).properties(props).build();
    configuration.addCache(cache);
    currentCache = cache;
    return cache;
  }
```

而在 addMapperStatement 中就实现了将 Cache 添加到 MapperStatement 了

```java
  public MappedStatement addMappedStatement(String id, SqlSource sqlSource, StatementType statementType,
      SqlCommandType sqlCommandType, Integer fetchSize, Integer timeout, String parameterMap, Class<?> parameterType,
      String resultMap, Class<?> resultType, ResultSetType resultSetType, boolean flushCache, boolean useCache,
      boolean resultOrdered, KeyGenerator keyGenerator, String keyProperty, String keyColumn, String databaseId,
      LanguageDriver lang, String resultSets, boolean dirtySelect) {

    。。。

    MappedStatement.Builder statementBuilder = new MappedStatement.Builder(configuration, id, sqlSource, sqlCommandType)
        .resource(resource).fetchSize(fetchSize).timeout(timeout).statementType(statementType)
        .keyGenerator(keyGenerator).keyProperty(keyProperty).keyColumn(keyColumn).databaseId(databaseId).lang(lang)
        .resultOrdered(resultOrdered).resultSets(resultSets)
        .resultMaps(getStatementResultMaps(resultMap, resultType, id)).resultSetType(resultSetType)
        .flushCacheRequired(flushCache).useCache(useCache).cache(currentCache).dirtySelect(dirtySelect);

    。。。
    configuration.addMappedStatement(statement);
    return statement;
  }
```
