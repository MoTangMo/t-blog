---
title: 深入剖析Spring 
icon: pen-to-square
cover: /assets/images/cover2.jpg
date: 2024-07-21
star: true
sticky: true
category:
  - SSM
tag:
  - 源码
  - Spring 系列
  - Java
---
# 深入剖析Spring

## 目录

- [从大体到局部](#从大体到局部)
  - [Bean 和 new 出来的对象的区别](#Bean-和-new-出来的对象的区别)
  - [大致地看依赖注入](#大致地看依赖注入)
  - [Bean的初始化过程](#Bean的初始化过程)
  - [注入Bean](#注入Bean)

## 从大体到局部

我们先从一段代码开始切入,这段代码就是直接从AnnotationConfigApplicationContext容器中获取对应的UserService Bean

```java
    @Test
    public void createBean(){
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        //获取Bean
        UserService userService = (UserService)context.getBean("userService");
        System.out.println(userService.test());
    }


```

而UserService则是我们创建出来的一个类，我们只是为其加上了@Component注解告诉Spring，这是Spring 的一个Bean

```java
@Component
public class UserService {

    @Autowired
    OrderService orderService;


    public String test(){
        return orderService.testOrderService();
    }

}

```

当然在UserService中依赖着OrderService

```java
@Component
public class OrderService {


    public String testOrderService(){
        return "invoke OrderService test";
    }

}

```

正是这段代码蕴含着Spring对对象的一个复杂的处理流程

### Bean 和 new 出来的对象的区别

Bean实际上也是一个对象，但是我们为什么不使用new呢？这是我们研究Spring第一个要探讨的问题：

执行以上的代码，我们能够得到结果的，但是如果我们使用new的方式创建一个UserService对象呢，显然这段代码是错误的，因为orderService是null的，我们并没有赋值

```java
    @Test
    public void newObject(){
        UserService userService = new UserService();
        userService.test();
    }
```

好，揭露真相了，原来Spring有帮我们做的一件事情是给我们的对象中的依赖赋值的，这个过程就是依赖注入。

而我们new对象的过程是

class → 无参构造 → 对象&#x20;

而这是new的过程，Spring则是为我们多做了些事情，所以我们可以这么说Bean是高级一点的对象了

对象→ 依赖注入 → 。。。 → Bean

### 大致地看依赖注入

那么怎么进行依赖注入的呢？我们可以看到在依赖上有一个非常显眼的注解@Autowried

```java
    @Autowired
    OrderService orderService;
```

首先Spring得先找到带有这类注解的依赖吧？怎么找呢？无非是遍历这些属性看谁是有这个依赖的呗

```java
       Class<UserService> userServiceClass = UserService.class;
        for (Field field : userServiceClass.getFields()) {
            field.getAnnotation(Autowired.class);
            ...
        }
```

### Bean的初始化过程

Bean在依赖注入后，其实还有一个流程，就是Bean的初始化

即 依赖注入 → 初始化前 → 初始化 → 初始化后 → 。。。 → Bean

为什么有这么一个步骤呢？又将步骤细化到这地步呢？这其实就是为了让Bean能够更具灵活性，能够让Bean的自定义性更高，就好像房屋装修，我们如果能够将房屋装修，分为规划准备，施工，验收，入住这么几个阶段，那么我们只需将我们所做的事情对号入座，然后最后串联到一起，那么这个事情就非常明了，施工起来也会十分顺利了

好，接下来我们来引入一个开发过程中的实例来看看Bean的初始化流程我们可以怎么利用起来吧

首先仍是提供的这段代码，不同的是，我给其添加了一个User实体类,我现在想要每次调用服务的时候，都能够携带admin 对象，通过Autowried 确实可以确保admin 是存在值的，但是不是admin的值，admin的值应该是需要查库得出来的结果

```java
@Component
public class User {

    private String username;

    private String userPassword;

}
```

```java
@Component
public class UserService {

    @Autowired
    OrderService orderService;

    + @Autowired
    + private User admin;

    public String test(){
        return orderService.testOrderService();
    }

}
```

所以针对这种情况，我们需要对UserService Bean创建之前介入一些操作，即帮我们查库来获取admin的值，如何进行介入呢？这就需要一个注解了PostConstruct，这个注解就是帮助我们在创建Bean之前（初始化前）调用我们指定的方法

```java
    @PostConstruct
    public User getAdmin(){
        //模拟查库
        user.setUserPassword("123");
        user.setUsername("123456");
        return user;
    }
```

当然 @PostConstruct注解是为了在初始化前进行一些方法调用或者其他操作的，其他阶段我们怎么控制呢？

初始化： 实现InitializingBean接口提供的afterPropertiesSet方法

初始化后： 基于AOP实现，如果是实现了AOP ，对应的Bean其实是一个Proxy，即初始化前 → 初始化→ 初始化后 → 代理对象 → Bean

这整个过程其实就是Bean的创建生命周期

### 注入Bean

刚刚是根据无参的构造来创建Bean的，但是如果是有参的情况下呢，当然如果是多个有参的情况下会导致Spring 不知道该使用哪一个有参构造而报错的，这时候需要为Spring提供一个默认的构造函数

那么回到单个有参的情况下，有参的情况下，自然是调用有参方法的，但是service该从何而来呢？Spring是如何帮我们找到一个service传进来呢？

```java
public class UserService {

    @Autowired
    OrderService orderService;

    @Autowired
    private User user;


    + public UserService(OrderService service){
    +     this.orderService = service;
    + }

```
