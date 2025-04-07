---
title:  Spring 事务篇
icon: pen-to-square
date: 2025-4-7
star: true
sticky: true
category:
  - SSM
tag:
  - Spring
  - Java
  - 源码
  - Transcation
---
# Spring 事务篇

## 目录

- [开启事务 @EnableTransactionManagement](#开启事务-EnableTransactionManagement)
  - [org.springframework.context.annotation.AutoProxyRegistrar](#orgspringframeworkcontextannotationAutoProxyRegistrar)
    - [ImportBeanDefinitionRegistrar](#ImportBeanDefinitionRegistrar)
    - [AutoProxyRegistrar](#AutoProxyRegistrar)
  - [org.springframework.transaction.annotation.ProxyTransactionManagementConfiguration](#orgspringframeworktransactionannotationProxyTransactionManagementConfiguration)
    - [org.springframework.transaction.interceptor.BeanFactoryTransactionAttributeSourceAdvisor](#orgspringframeworktransactioninterceptorBeanFactoryTransactionAttributeSourceAdvisor)
      - [org.springframework.transaction.interceptor.TransactionAttributeSourcePointcut](#orgspringframeworktransactioninterceptorTransactionAttributeSourcePointcut)
        - [setClassFilter](#setClassFilter)
      - [TransactionAttributeSourcePointcut#matches](#TransactionAttributeSourcePointcutmatches)
        - [org.springframework.transaction.interceptor.AbstractFallbackTransactionAttributeSource#getTransactionAttribute](#orgspringframeworktransactioninterceptorAbstractFallbackTransactionAttributeSourcegetTransactionAttribute)
- [事务调用](#事务调用)
  - [org.springframework.transaction.interceptor.TransactionAspectSupport#invokeWithinTransaction](#orgspringframeworktransactioninterceptorTransactionAspectSupportinvokeWithinTransaction)
- [创建事务](#创建事务)
  - [org.springframework.transaction.interceptor.TransactionAspectSupport#createTransactionIfNecessary](#orgspringframeworktransactioninterceptorTransactionAspectSupportcreateTransactionIfNecessary)
  - [org.springframework.transaction.support.AbstractPlatformTransactionManager#getTransaction](#orgspringframeworktransactionsupportAbstractPlatformTransactionManagergetTransaction)
- [开启事务](#开启事务)
  - [org.springframework.transaction.support.AbstractPlatformTransactionManager#startTransaction](#orgspringframeworktransactionsupportAbstractPlatformTransactionManagerstartTransaction)
    - [org.springframework.jdbc.datasource.DataSourceTransactionManager#doBegin](#orgspringframeworkjdbcdatasourceDataSourceTransactionManagerdoBegin)
    - [org.springframework.jdbc.datasource.DataSourceTransactionManager#doGetTransaction](#orgspringframeworkjdbcdatasourceDataSourceTransactionManagerdoGetTransaction)
      - [org.springframework.transaction.support.TransactionSynchronizationManager#doGetResource](#orgspringframeworktransactionsupportTransactionSynchronizationManagerdoGetResource)
- [事务挂起](#事务挂起)
  - [org.springframework.transaction.support.AbstractPlatformTransactionManager#suspend](#orgspringframeworktransactionsupportAbstractPlatformTransactionManagersuspend)
- [处理子事务](#处理子事务)
  - [org.springframework.transaction.support.AbstractPlatformTransactionManager#handleExistingTransaction](#orgspringframeworktransactionsupportAbstractPlatformTransactionManagerhandleExistingTransaction)
  - [PROPAGATION\_NEVER](#PROPAGATION_NEVER)
  - [PROPAGATION\_NOT\_SUPPORTED](#PROPAGATION_NOT_SUPPORTED)
  - [PROPAGATION\_REQUIRES\_NEW](#PROPAGATION_REQUIRES_NEW)
  - [PROPAGATION\_NESTED](#PROPAGATION_NESTED)
- [默认的情况](#默认的情况)
- [事务处理-提交或回滚](#事务处理-提交或回滚)
  - [提交事务](#提交事务)
    - [org.springframework.transaction.support.AbstractPlatformTransactionManager#commit](#orgspringframeworktransactionsupportAbstractPlatformTransactionManagercommit)
  - [回滚事务](#回滚事务)
    - [org.springframework.transaction.interceptor.TransactionAspectSupport#completeTransactionAfterThrowing](#orgspringframeworktransactioninterceptorTransactionAspectSupportcompleteTransactionAfterThrowing)
    - [执行回滚](#执行回滚)
      - [org.springframework.transaction.support.AbstractPlatformTransactionManager#processRollback](#orgspringframeworktransactionsupportAbstractPlatformTransactionManagerprocessRollback)
        - [org.springframework.transaction.support.AbstractPlatformTransactionManager#doRollback](#orgspringframeworktransactionsupportAbstractPlatformTransactionManagerdoRollback)

在了解Spring事务之前还是要先了解Spring AOP喔，因为Spring 事务就是基于Spring AOP实现的。

#### 开启事务 @EnableTransactionManagement

一般我们使用的时候会通过@EnableTransactionManagement注解来开启事务

```java 
/**
 * @author T
 * @description Transcational Example
 * @date 2025年03月15日 15:06
 */
@Configuration
@EnableTransactionManagement
public class TranscationExample {




}

```


当我们点击进入@EnableTransactionManagement 时，该注解其实导入了一个TransactionManagementConfigurationSelector的配置类，这是一个关键点

```java 
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(TransactionManagementConfigurationSelector.class)
public @interface EnableTransactionManagement {
  ...
}
```


那么我们就跟随关键点来看看TransactionManagementConfigurationSelector 是如何进行事务管理器的选择的

通过以下代码，我们可以发现selectImports方法中正是描述了应该如何选择，在这里会传入一个AdviceMode 类型的数据，这个AdviceMode 其实是一个枚举，了解过AOP的同学应该都知道AOP是基于动态代理实现的，上一篇帐我们也有说过，Spring AOP我们可以通过两种方式来实现，一种是Spring自己的（JDK或者CGLib 这种运行时增强的）还有就是可以通过AspectJ来实现（编译期增强的），所以TransactionManagementConfigurationSelector 提供的两种选择就是这两种了，当然AspectJ的模式很少用到，我们暂时只需关注Proxy模式就行了。

```java 
public enum AdviceMode {

  /**
   * JDK proxy-based advice.
   */
  PROXY,

  /**
   * AspectJ weaving-based advice.
   */
  ASPECTJ

}


public class TransactionManagementConfigurationSelector extends AdviceModeImportSelector<EnableTransactionManagement> {

 
  //实现这个接口可以根据类名进行Bean导入，所以这里会根据选择将AutoProxyRegistrar，ProxyTransactionManagementConfiguration
  //或者determineTransactionAspectClass涉及的Class导入到容器中
  @Override
  protected String[] selectImports(AdviceMode adviceMode) {
    switch (adviceMode) {
      case PROXY:
        return new String[] {AutoProxyRegistrar.class.getName(),
            ProxyTransactionManagementConfiguration.class.getName()};
      case ASPECTJ:
        return new String[] {determineTransactionAspectClass()};
      default:
        return null;
    }
  }

  private String determineTransactionAspectClass() {
    return (ClassUtils.isPresent("javax.transaction.Transactional", getClass().getClassLoader()) ?
        TransactionManagementConfigUtils.JTA_TRANSACTION_ASPECT_CONFIGURATION_CLASS_NAME :
        TransactionManagementConfigUtils.TRANSACTION_ASPECT_CONFIGURATION_CLASS_NAME);
  }

}
```


我们看到在PROXY模式下，其实会导入AutoProxyRegistrar和ProxyTransactionManagementConfiguration两个类，下面我们就来一一了解以下。

##### org.springframework.context.annotation.AutoProxyRegistrar

通过名称我们就能知晓他就是用来进行注册代理类的，而且该类实现了ImportBeanDefinitionRegistrar 接口，ImportBeanDefinitionRegistrar 接口就是用于给我们向容器导入BeanDefinition的

###### ImportBeanDefinitionRegistrar

先来回顾回顾接口的作用

###### AutoProxyRegistrar

```java 
public class AutoProxyRegistrar implements ImportBeanDefinitionRegistrar {

  private final Log logger = LogFactory.getLog(getClass());

  @Override
  public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
    boolean candidateFound = false;
    Set<String> annTypes = importingClassMetadata.getAnnotationTypes();
    for (String annType : annTypes) {
      AnnotationAttributes candidate = AnnotationConfigUtils.attributesFor(importingClassMetadata, annType);
      if (candidate == null) {
        continue;
      }
      Object mode = candidate.get("mode");
      Object proxyTargetClass = candidate.get("proxyTargetClass");
      if (mode != null && proxyTargetClass != null && AdviceMode.class == mode.getClass() &&
          Boolean.class == proxyTargetClass.getClass()) {
        candidateFound = true;
        if (mode == Advice  Mode.PROXY) {
          //向容器注册InfrastructureAdvisorAutoProxyCreator，才可以对Bean继续AOP
          AopConfigUtils.registerAutoProxyCreatorIfNecessary(registry);
          if ((Boolean) proxyTargetClass) {
            AopConfigUtils.forceAutoProxyCreatorToUseClassProxying(registry);
            return;
          }
        }
      }
    }
    if (!candidateFound && logger.isInfoEnabled()) {
      String name = getClass().getSimpleName();
      logger.info(String.format("%s was imported but no annotations were found " +
          "having both 'mode' and 'proxyTargetClass' attributes of type " +
          "AdviceMode and boolean respectively. This means that auto proxy " +
          "creator registration and configuration may not have occurred as " +
          "intended, and components may not be proxied as expected. Check to " +
          "ensure that %s has been @Import'ed on the same class where these " +
          "annotations are declared; otherwise remove the import of %s " +
          "altogether.", name, name, name));
    }
  }

}

```


&#x20;AopConfigUtils.registerAutoProxyCreatorIfNecessary(registry)方法的目的就是为了开启AOP，我们可以稍微看看其内部实现，我们一直往里进就会发现这段代码，他会将InfrastructureAdvisorAutoProxyCreator注入至容器当中，而InfrastructureAdvisorAutoProxyCreator就是AbstractAdvisorAutoProxyCreator ，AOP篇时，我们就提过AbstractAdvisorAutoProxyCreator 是AOP的基石，所以导入InfrastructureAdvisorAutoProxyCreator 目的即使为了AOP生效。

```java 
  public class InfrastructureAdvisorAutoProxyCreator extends AbstractAdvisorAutoProxyCreator {

  }
  
  @Nullable
  public static BeanDefinition registerAutoProxyCreatorIfNecessary(
      BeanDefinitionRegistry registry, @Nullable Object source) {

    return registerOrEscalateApcAsRequired(InfrastructureAdvisorAutoProxyCreator.class, registry, source);
  }
```


##### org.springframework.transaction.annotation.ProxyTransactionManagementConfiguration

ProxyTransactionManagementConfiguration会向容器导入三个Bean，其中包括BeanFactoryTransactionAttributeSourceAdvisor ，仔细看该Bean的实现，我们会发现其需要注入TransactionAttributeSource 和 TransactionInterceptor 类型的Bean，这两种Bean其实都有在下面实现的。

```java 
@Configuration(proxyBeanMethods = false)
@Role(BeanDefinition.ROLE_INFRASTRUCTURE)
public class ProxyTransactionManagementConfiguration extends AbstractTransactionManagementConfiguration {

  @Bean(name = TransactionManagementConfigUtils.TRANSACTION_ADVISOR_BEAN_NAME)
  @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
  public BeanFactoryTransactionAttributeSourceAdvisor transactionAdvisor(
      TransactionAttributeSource transactionAttributeSource, TransactionInterceptor transactionInterceptor) {
    //这里面就隐含了符合BeanFactoryTransactionAttributeSourceAdvisor 的条件
    BeanFactoryTransactionAttributeSourceAdvisor advisor = new BeanFactoryTransactionAttributeSourceAdvisor();
    //这里其实就是注册一个切面，以Transactional注解为切面
    advisor.setTransactionAttributeSource(transactionAttributeSource);
    //将设置的拦截器交给该切面
    advisor.setAdvice(transactionInterceptor);
    if (this.enableTx != null) {
      advisor.setOrder(this.enableTx.<Integer>getNumber("order"));
    }
    return advisor;
  }

  // 主要是表示@Transcational注解的元信息
  @Bean
  @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
  public TransactionAttributeSource transactionAttributeSource() {
    return new AnnotationTransactionAttributeSource();
  }

  //具体的事务拦截器，这是我们主要探索的地方
  @Bean
  @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
  public TransactionInterceptor transactionInterceptor(TransactionAttributeSource transactionAttributeSource) {
    TransactionInterceptor interceptor = new TransactionInterceptor();
    interceptor.setTransactionAttributeSource(transactionAttributeSource);
    if (this.txManager != null) {
      interceptor.setTransactionManager(this.txManager);
    }
    return interceptor;
  }

}

```


###### org.springframework.transaction.interceptor.BeanFactoryTransactionAttributeSourceAdvisor

来到BeanFactoryTransactionAttributeSourceAdvisor 方法，我们需要关注一下他是如何定义切点，从getPointcut的实现来看，切点的逻辑就在TransactionAttributeSourcePointcut 的构建内。

```java 
public class BeanFactoryTransactionAttributeSourceAdvisor extends AbstractBeanFactoryPointcutAdvisor {

  @Nullable
  private TransactionAttributeSource transactionAttributeSource;

  //定义切点
  private final TransactionAttributeSourcePointcut pointcut = new TransactionAttributeSourcePointcut() {
    @Override
    @Nullable
    protected TransactionAttributeSource getTransactionAttributeSource() {
      return transactionAttributeSource;
    }
  };


  public void setTransactionAttributeSource(TransactionAttributeSource transactionAttributeSource) {
    this.transactionAttributeSource = transactionAttributeSource;
  }

  public void setClassFilter(ClassFilter classFilter) {
    this.pointcut.setClassFilter(classFilter);
  }

  @Override
  public Pointcut getPointcut() {
    return this.pointcut;
  }

}

```


###### org.springframework.transaction.interceptor.TransactionAttributeSourcePointcut

首先在TransactionAttributeSourcePointcut初始化时，会先初始化TransactionAttributeSourceClassFilter并将结果返回给ClassFilter了，ClassFilter是父类StaticMethodMatcherPointcut 的属性，看命名就知道他其实就是告诉我们哪些类是符合该切点的。

当然具体的我们也可以通过查看matches方法来，显然matches方法就是查看目标方法是否有TransactionAttributeSource的，即配置了Spring事务的相关内容

```java 
abstract class TransactionAttributeSourcePointcut extends StaticMethodMatcherPointcut implements Serializable {

  protected TransactionAttributeSourcePointcut() {
    setClassFilter(new TransactionAttributeSourceClassFilter());
  }


  @Override
  public boolean matches(Method method, Class<?> targetClass) {
    TransactionAttributeSource tas = getTransactionAttributeSource();
    return (tas == null || tas.getTransactionAttribute(method, targetClass) != null);
  }

  @Override
  public boolean equals(@Nullable Object other) {
    if (this == other) {
      return true;
    }
    if (!(other instanceof TransactionAttributeSourcePointcut)) {
      return false;
    }
    TransactionAttributeSourcePointcut otherPc = (TransactionAttributeSourcePointcut) other;
    return ObjectUtils.nullSafeEquals(getTransactionAttributeSource(), otherPc.getTransactionAttributeSource());
  }

  @Override
  public int hashCode() {
    return TransactionAttributeSourcePointcut.class.hashCode();
  }

  @Override
  public String toString() {
    return getClass().getName() + ": " + getTransactionAttributeSource();
  }


  /**
   * Obtain the underlying TransactionAttributeSource (may be {@code null}).
   * To be implemented by subclasses.
   */
  @Nullable
  protected abstract TransactionAttributeSource getTransactionAttributeSource();


  /**
   * {@link ClassFilter} that delegates to {@link TransactionAttributeSource#isCandidateClass}
   * for filtering classes whose methods are not worth searching to begin with.
   */
  private class TransactionAttributeSourceClassFilter implements ClassFilter {

    @Override
    public boolean matches(Class<?> clazz) {
      if (TransactionalProxy.class.isAssignableFrom(clazz) ||
          TransactionManager.class.isAssignableFrom(clazz) ||
          PersistenceExceptionTranslator.class.isAssignableFrom(clazz)) {
        return false;
      }
      TransactionAttributeSource tas = getTransactionAttributeSource();
      return (tas == null || tas.isCandidateClass(clazz));
    }
  }

}

```


###### setClassFilter

TransactionAttributeSourceClassFilter是TransactionAttributeSourcePointcut的内部类，我们可以通过matches，看看哪些是符合条件的，当然笔者直接将最后的代码贴出来，过程就不跟了，反正有SpringTransaction相关的就跟下去就对了。

跟到SpringTransactionAnnotationParser我们就能很清晰地看到只有满足目标Bean是有Transactional注解的我们才能符合切点类的ClassFilter

```java 
  //SpringTransactionAnnotationParser
  public class SpringTransactionAnnotationParser implements TransactionAnnotationParser, Serializable {

    @Override
    public boolean isCandidateClass(Class<?> targetClass) {
      return AnnotationUtils.isCandidateClass(targetClass, Transactional.class);
    }
  
    ....
  
  }
```


###### TransactionAttributeSourcePointcut#matches

完成了setClassFilter后，我们会看到这里还会有一个matches

```java 
abstract class TransactionAttributeSourcePointcut extends StaticMethodMatcherPointcut implements Serializable {

  @Override
  public boolean matches(Method method, Class<?> targetClass) {
    TransactionAttributeSource tas = getTransactionAttributeSource();
    return (tas == null || tas.getTransactionAttribute(method, targetClass) != null);
  }

  ...

}

```


###### org.springframework.transaction.interceptor.AbstractFallbackTransactionAttributeSource#getTransactionAttribute

这个方法不用多说了，就是将@Transcational注解中我们配置的信息提取出来并封装起来,   封装成TransactionAttribute并返回

```java 
public TransactionAttribute getTransactionAttribute(Method method, @Nullable Class<?> targetClass) {
    if (method.getDeclaringClass() == Object.class) {
      return null;
    }

    // First, see if we have a cached value.
    Object cacheKey = getCacheKey(method, targetClass);
    TransactionAttribute cached = this.attributeCache.get(cacheKey);
    if (cached != null) {
      // Value will either be canonical value indicating there is no transaction attribute,
      // or an actual transaction attribute.
      if (cached == NULL_TRANSACTION_ATTRIBUTE) {
        return null;
      }
      else {
        return cached;
      }
    }
    else {
      // 解析配置信息，并缓存结果
      TransactionAttribute txAttr = computeTransactionAttribute(method, targetClass);
      // Put it in the cache.
      if (txAttr == null) {
        this.attributeCache.put(cacheKey, NULL_TRANSACTION_ATTRIBUTE);
      }
      else {
        String methodIdentification = ClassUtils.getQualifiedMethodName(method, targetClass);
        if (txAttr instanceof DefaultTransactionAttribute) {
          DefaultTransactionAttribute dta = (DefaultTransactionAttribute) txAttr;
          dta.setDescriptor(methodIdentification);
          dta.resolveAttributeStrings(this.embeddedValueResolver);
        }
        if (logger.isTraceEnabled()) {
          logger.trace("Adding transactional method '" + methodIdentification + "' with attribute: " + txAttr);
        }
        this.attributeCache.put(cacheKey, txAttr);
      }
      return txAttr;
    }
  }
```


#### 事务调用

事务方法一经调用，就会执行TransactionInterceptor 这个事务拦截器的invoke方法，这个TransactionInterceptor Bean可是在ProxyTransactionManagementConfiguration 阶段就被注册到容器中了喔\~

```java 
  @Override
  @Nullable
  public Object invoke(MethodInvocation invocation) throws Throwable {
    
    //获取目标类
    Class<?> targetClass = (invocation.getThis() != null ? AopUtils.getTargetClass(invocation.getThis()) : null);

    
    return invokeWithinTransaction(invocation.getMethod(), targetClass, invocation::proceed);
  }
```


##### org.springframework.transaction.interceptor.TransactionAspectSupport#invokeWithinTransaction

这个方法就是整个事务处理的大体框架，把这个读懂了，那Spring 事务是如何进行处理的，我们就属于是手拿把掐了哈！

```java 
  protected Object invokeWithinTransaction(Method method, @Nullable Class<?> targetClass,
      final InvocationCallback invocation) throws Throwable {

   
    TransactionAttributeSource tas = getTransactionAttributeSource();
    
    //拿到@Transcational的属性值
    final TransactionAttribute txAttr = (tas != null ? tas.getTransactionAttribute(method, targetClass) : null);
    
    //拿到Spring容器中类型为TransactionManager 的Bean对象
    //这是我们自己配置的那个事务管理器
    //   public PlatformTransactionManager transactionManager(){
    //    DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
    //    transactionManager.setDataSource(dataSource());
    //    return transactionManager;
    //}
    final TransactionManager tm = determineTransactionManager(txAttr);

    //这是处理ReactiveTranscationManager的，ReactiveTranscationManager用的比较少，但是流程和普通的基本一样的
    if (this.reactiveAdapterRegistry != null && tm instanceof ReactiveTransactionManager) {
       ...
    }
    
    //将事务管理器强制类型转为PlatformTransactionManager 
    PlatformTransactionManager ptm = asPlatformTransactionManager(tm);
    
    //joinpoint的唯一标识，即当前执行的方法名
    final String joinpointIdentification = methodIdentification(method, targetClass, txAttr);

    //CallbackPreferringPlatformTransactionManager表示拥有回调功能的PlatformTransactionManager 
    if (txAttr == null || !(ptm instanceof CallbackPreferringPlatformTransactionManager)) {

      //创建事务，这里就涉及到事务传播机制的实现
      TransactionInfo txInfo = createTransactionIfNecessary(ptm, txAttr, joinpointIdentification);

      Object retVal;
      try {
        //执行下一个Interceptor或被代理对象的方法
        retVal = invocation.proceedWithInvocation();
      }
      catch (Throwable ex) {
        // 先回滚再抛异常
        completeTransactionAfterThrowing(txInfo, ex);
        throw ex;
      }
      finally {
        cleanupTransactionInfo(txInfo);
      }

      if (retVal != null && vavrPresent && VavrDelegate.isVavrTry(retVal)) {
        // Set rollback-only in case of Vavr failure matching our rollback rules...
        TransactionStatus status = txInfo.getTransactionStatus();
        if (status != null && txAttr != null) {
          retVal = VavrDelegate.evaluateTryFailure(retVal, txAttr, status);
        }
      }

      commitTransactionAfterReturning(txInfo);
      return retVal;
    }

    else {
      Object result;
      final ThrowableHolder throwableHolder = new ThrowableHolder();

      // It's a CallbackPreferringPlatformTransactionManager: pass a TransactionCallback in.
      try {
        result = ((CallbackPreferringPlatformTransactionManager) ptm).execute(txAttr, status -> {
          TransactionInfo txInfo = prepareTransactionInfo(ptm, txAttr, joinpointIdentification, status);
          try {
            Object retVal = invocation.proceedWithInvocation();
            if (retVal != null && vavrPresent && VavrDelegate.isVavrTry(retVal)) {
              // Set rollback-only in case of Vavr failure matching our rollback rules...
              retVal = VavrDelegate.evaluateTryFailure(retVal, txAttr, status);
            }
            return retVal;
          }
          catch (Throwable ex) {
            if (txAttr.rollbackOn(ex)) {
              // A RuntimeException: will lead to a rollback.
              if (ex instanceof RuntimeException) {
                throw (RuntimeException) ex;
              }
              else {
                throw new ThrowableHolderException(ex);
              }
            }
            else {
              // A normal return value: will lead to a commit.
              throwableHolder.throwable = ex;
              return null;
            }
          }
          finally {
            cleanupTransactionInfo(txInfo);
          }
        });
      }
      catch (ThrowableHolderException ex) {
        throw ex.getCause();
      }
      catch (TransactionSystemException ex2) {
        if (throwableHolder.throwable != null) {
          logger.error("Application exception overridden by commit exception", throwableHolder.throwable);
          ex2.initApplicationException(throwableHolder.throwable);
        }
        throw ex2;
      }
      catch (Throwable ex2) {
        if (throwableHolder.throwable != null) {
          logger.error("Application exception overridden by commit exception", throwableHolder.throwable);
        }
        throw ex2;
      }

      // Check result state: It might indicate a Throwable to rethrow.
      if (throwableHolder.throwable != null) {
        throw throwableHolder.throwable;
      }
      return result;
    }
  }
```


#### 创建事务

##### org.springframework.transaction.interceptor.TransactionAspectSupport#createTransactionIfNecessary

```java 
protected TransactionInfo createTransactionIfNecessary(@Nullable PlatformTransactionManager tm,
      @Nullable TransactionAttribute txAttr, final String joinpointIdentification) {

    // If no name specified, apply method identification as transaction name.
    if (txAttr != null && txAttr.getName() == null) {
      txAttr = new DelegatingTransactionAttribute(txAttr) {
        @Override
        public String getName() {
          return joinpointIdentification;
        }
      };
    }
    
    //一般不会为空，这里为了保险起见，还是先做个非空判断
    TransactionStatus status = null;
    if (txAttr != null) {
      if (tm != null) {
        //核心，在这里开启事务
        status = tm.getTransaction(txAttr);
      }
      else {
        if (logger.isDebugEnabled()) {
          logger.debug("Skipping transactional joinpoint [" + joinpointIdentification +
              "] because no transaction manager has been configured");
        }
      }
    }
    return prepareTransactionInfo(tm, txAttr, joinpointIdentification, status);
  }
```


##### org.springframework.transaction.support.AbstractPlatformTransactionManager#getTransaction

```java 
public final TransactionStatus getTransaction(@Nullable TransactionDefinition definition)
      throws TransactionException {

    // Use defaults if no transaction definition given.
    TransactionDefinition def = (definition != null ? definition : TransactionDefinition.withDefaults());
    
    //获取一个新的DataSourceTransacationObject对象
    Object transaction = doGetTransaction();
    boolean debugEnabled = logger.isDebugEnabled();
    
    //判断目前是否开启了事务
    if (isExistingTransaction(transaction)) {
      return handleExistingTransaction(def, transaction, debugEnabled);
    }

    // 检查timeout的配置
    if (def.getTimeout() < TransactionDefinition.TIMEOUT_DEFAULT) {
      throw new InvalidTimeoutException("Invalid transaction timeout", def.getTimeout());
    }

    if (def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_MANDATORY) {
      throw new IllegalTransactionStateException(
          "No existing transaction found for transaction marked with propagation 'mandatory'");
    }
    //如果当前线程中没有事务的话，三个事务的处理是一样的
    else if (def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRED ||
        def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRES_NEW ||
        def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NESTED) {
      //没有事务需要挂起，不过TransactionSynchronization有可能需要挂起
      SuspendedResourcesHolder suspendedResources = suspend(null);
      if (debugEnabled) {
        logger.debug("Creating new transaction with name [" + def.getName() + "]: " + def);
      }
      try {
        //开启事务
        return startTransaction(def, transaction, debugEnabled, suspendedResources);
      }
      catch (RuntimeException | Error ex) {
        resume(null, suspendedResources);
        throw ex;
      }
    }
    else {
      // Create "empty" transaction: no actual transaction, but potentially synchronization.
      if (def.getIsolationLevel() != TransactionDefinition.ISOLATION_DEFAULT && logger.isWarnEnabled()) {
        logger.warn("Custom isolation level specified but no actual transaction initiated; " +
            "isolation level will effectively be ignored: " + def);
      }
      boolean newSynchronization = (getTransactionSynchronization() == SYNCHRONIZATION_ALWAYS);
      return prepareTransactionStatus(def, null, true, newSynchronization, debugEnabled, null);
    }
  }
```


#### 开启事务

##### org.springframework.transaction.support.AbstractPlatformTransactionManager#startTransaction

我们先关注如何开启的事务，所以先看看doBegin是如何跑的

```java 
  private TransactionStatus startTransaction(TransactionDefinition definition, Object transaction,
      boolean debugEnabled, @Nullable SuspendedResourcesHolder suspendedResources) {

    boolean newSynchronization = (getTransactionSynchronization() != SYNCHRONIZATION_NEVER);
    DefaultTransactionStatus status = newTransactionStatus(
        definition, transaction, true, newSynchronization, debugEnabled, suspendedResources);
    doBegin(transaction, definition);
    prepareSynchronization(status, definition);
    return status;
  }

```


###### org.springframework.jdbc.datasource.DataSourceTransactionManager#doBegin

这个方法目的就是为了创建出来一个数据库连接并给到DataSourceTransactionObject进行配置,当然开启事务的本质其实就是获取一个数据库连接,通过配置数据库连接直接开启事务,以下代码就是描述了如何配置的数据库连接的.

```java 
protected void doBegin(Object transaction, TransactionDefinition definition) {
    DataSourceTransactionObject txObject = (DataSourceTransactionObject) transaction;
    Connection con = null;

    try {
    
      //如果当前线程中所使用的DataSource还没有创建过数据库连接，就创建一个新的数据库连接
      if (!txObject.hasConnectionHolder() ||
          txObject.getConnectionHolder().isSynchronizedWithTransaction()) {
        Connection newCon = obtainDataSource().getConnection();
        if (logger.isDebugEnabled()) {
          logger.debug("Acquired Connection [" + newCon + "] for JDBC transaction");
        }
        txObject.setConnectionHolder(new ConnectionHolder(newCon), true);
      }

      txObject.getConnectionHolder().setSynchronizedWithTransaction(true);
      con = txObject.getConnectionHolder().getConnection();

      //根据@Transactional注解中的设置，设置Connection的readOnly与隔离级别
      //当然如果我们没有配置，则采用数据库默认的
      Integer previousIsolationLevel = DataSourceUtils.prepareConnectionForTransaction(con, definition);
      //设置对应的隔离级别
      txObject.setPreviousIsolationLevel(previousIsolationLevel);
      //设置该连接为只读（即不允许我们通过Spring事务来进行写操作）
      txObject.setReadOnly(definition.isReadOnly());
      

      //将autocommit修改为false
      if (con.getAutoCommit()) {
        txObject.setMustRestoreAutoCommit(true);
        if (logger.isDebugEnabled()) {
          logger.debug("Switching JDBC Connection [" + con + "] to manual commit");
        }
        con.setAutoCommit(false);
      }

      
      prepareTransactionalConnection(con, definition);
      txObject.getConnectionHolder().setTransactionActive(true);

      int timeout = determineTimeout(definition);
      if (timeout != TransactionDefinition.TIMEOUT_DEFAULT) {
        txObject.getConnectionHolder().setTimeoutInSeconds(timeout);
      }

      // Bind the connection holder to the thread.
      if (txObject.isNewConnectionHolder()) {
        TransactionSynchronizationManager.bindResource(obtainDataSource(), txObject.getConnectionHolder());
      }
    }

    catch (Throwable ex) {
      if (txObject.isNewConnectionHolder()) {
        DataSourceUtils.releaseConnection(con, obtainDataSource());
        txObject.setConnectionHolder(null, false);
      }
      throw new CannotCreateTransactionException("Could not open JDBC Connection for transaction", ex);
    }
  }
```


###### org.springframework.jdbc.datasource.DataSourceTransactionManager#doGetTransaction

其中TransactionSynchronizationManager.getResource(obtainDataSource());实质上是会存到一个存着事务资源的ThreadLocal中去根据DataSource去取的。

```java 
  @Override
  protected Object doGetTransaction() {
    //每次都会实例化一个DataSourceTransactionObject 
    DataSourceTransactionObject txObject = new DataSourceTransactionObject();
    txObject.setSavepointAllowed(isNestedTransactionAllowed());
    //从ThreadLocal中获取数据库连接，并设置到txObject中，有可能为空
    ConnectionHolder conHolder =
        (ConnectionHolder) TransactionSynchronizationManager.getResource(obtainDataSource());
    //后面的false，表示此次连接不是一个新的连接
    txObject.setConnectionHolder(conHolder, false);
    return txObject;
  }
```


我们可以尝试跟一跟getResource方法，直到跟到org.springframework.transaction.support.TransactionSynchronizationManager#doGetResource方法

###### org.springframework.transaction.support.TransactionSynchronizationManager#doGetResource

```java 
//key为DataSrouce对象，value为ConnectionHolder对象
private static final ThreadLocal<Map<Object, Object>> resources =
      new NamedThreadLocal<>("Transactional resources");


private static Object doGetResource(Object actualKey) {
    Map<Object, Object> map = resources.get();
    if (map == null) {
      return null;
    }
    Object value = map.get(actualKey);
    // Transparently remove ResourceHolder that was marked as void...
    if (value instanceof ResourceHolder && ((ResourceHolder) value).isVoid()) {
      map.remove(actualKey);
      // Remove entire ThreadLocal if empty...
      if (map.isEmpty()) {
        resources.remove();
      }
      value = null;
    }
    return value;
  }
```


#### 事务挂起

##### org.springframework.transaction.support.AbstractPlatformTransactionManager#suspend

所谓事务挂起，说白了就是我先这个事务晾到一边，开一个新的事务，但是既然是晾到一边，那肯定需要先记录下来嘛\~，所以这里就会用ThreadLocal将这个挂起的事务的信息先记录下来。

```java 
protected final SuspendedResourcesHolder suspend(@Nullable Object transaction) throws TransactionException {
    if (TransactionSynchronizationManager.isSynchronizationActive()) {
      // 调用TranscationSynchronization的suspend方法，并清空和返回当前线程中的所有TransactionSynchronization对象
      // 使用方法 ->
      // TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
      //      @Override
      //      public void suspend() {
      //         TransactionSynchronization.super.suspend();
      //     }
      // });
      List<TransactionSynchronization> suspendedSynchronizations = doSuspendSynchronization();
      try {
        Object suspendedResources = null;
        if (transaction != null) {
          suspendedResources = doSuspend(transaction);
        }
        
        //获取并清空当前线程中关于TransactionSynchronizationManager的设置
        //获取是为了将事务的信息先记到另一个ThreadLocal
        String name = TransactionSynchronizationManager.getCurrentTransactionName();
        TransactionSynchronizationManager.setCurrentTransactionName(null);
        boolean readOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        TransactionSynchronizationManager.setCurrentTransactionReadOnly(false);
        Integer isolationLevel = TransactionSynchronizationManager.getCurrentTransactionIsolationLevel();
        TransactionSynchronizationManager.setCurrentTransactionIsolationLevel(null);
        boolean wasActive = TransactionSynchronizationManager.isActualTransactionActive();
        TransactionSynchronizationManager.setActualTransactionActive(false);
        //将前事务的信息记录到SuspendedResourcesHolder
        return new SuspendedResourcesHolder(
            suspendedResources, suspendedSynchronizations, name, readOnly, isolationLevel, wasActive);
      }
      catch (RuntimeException | Error ex) {
        // doSuspend failed - original transaction is still active...
        doResumeSynchronization(suspendedSynchronizations);
        throw ex;
      }
    }
    else if (transaction != null) {
      // Transaction active but no synchronization active.
      Object suspendedResources = doSuspend(transaction);
      return new SuspendedResourcesHolder(suspendedResources);
    }
    else {
      // Neither transaction nor synchronization active.
      return null;
    }
  }

```


#### 处理子事务

当事务已经被创建出来了，也就是说目前发现ThreadLocal中有事务了，就会执行handleExistingTransaction方法，这里面就包含了各种传播级别的处理方法了

```java 
if (isExistingTransaction(transaction)) {
      // Existing transaction found -> check propagation behavior to find out how to behave.
      return handleExistingTransaction(def, transaction, debugEnabled);
 }
```


##### org.springframework.transaction.support.AbstractPlatformTransactionManager#handleExistingTransaction

```java 
private TransactionStatus handleExistingTransaction(
      TransactionDefinition definition, Object transaction, boolean debugEnabled)
      throws TransactionException {

    //如果子事务的事务传播级别为PROPAGATION_NEVER的话就报异常
    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NEVER) {
      throw new IllegalTransactionStateException(
          "Existing transaction found for transaction marked with propagation 'never'");
    }
     
    //如果子方法的事务传播级别为PROPAGATION_NOT_SUPPORTED的话，子方法就不采用Spring提供的事务数据连接了
    //因为我们可以看到他只是做了挂起，并没有新建一个事务，所以意味着子方法是不受Spring事务管理的
    //可以对比对比PROPAGATION_REQUIRES_NEW传播级别的处理
    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NOT_SUPPORTED) {
      if (debugEnabled) {
        logger.debug("Suspending current transaction");
      }
      //挂起事务 ， 即清空了事务管理器当前事务的信息
      Object suspendedResources = suspend(transaction);
      boolean newSynchronization = (getTransactionSynchronization() == SYNCHRONIZATION_ALWAYS);
      return prepareTransactionStatus(
          definition, null, false, newSynchronization, debugEnabled, suspendedResources);
    }

    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRES_NEW) {
      if (debugEnabled) {
        logger.debug("Suspending current transaction, creating new transaction with name [" +
            definition.getName() + "]");
      }
      //挂起事务
      SuspendedResourcesHolder suspendedResources = suspend(transaction);
      try {
        //开启一个新事务，重点关注，他会把挂起的SuspendedResourcesHolder 传给了startTransaction方法
        //这就是晾到一边的意思，因为有可能是需要恢复
        return startTransaction(definition, transaction, debugEnabled, suspendedResources);
      }
      catch (RuntimeException | Error beginEx) {
        resumeAfterBeginException(transaction, suspendedResources, beginEx);
        throw beginEx;
      }
    }

    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NESTED) {
      if (!isNestedTransactionAllowed()) {
        throw new NestedTransactionNotSupportedException(
            "Transaction manager does not allow nested transactions by default - " +
            "specify 'nestedTransactionAllowed' property with value 'true'");
      }
      if (debugEnabled) {
        logger.debug("Creating nested transaction with name [" + definition.getName() + "]");
      }
      if (useSavepointForNestedTransaction()) {
        // Create savepoint within existing Spring-managed transaction,
        // through the SavepointManager API implemented by TransactionStatus.
        // Usually uses JDBC 3.0 savepoints. Never activates Spring synchronization.
        DefaultTransactionStatus status =
            prepareTransactionStatus(definition, transaction, false, false, debugEnabled, null);
        status.createAndHoldSavepoint();
        return status;
      }
      else {
        // Nested transaction through nested begin and commit/rollback calls.
        // Usually only for JTA: Spring synchronization might get activated here
        // in case of a pre-existing JTA transaction.
        return startTransaction(definition, transaction, debugEnabled, null);
      }
    }

    // Assumably PROPAGATION_SUPPORTS or PROPAGATION_REQUIRED.
    if (debugEnabled) {
      logger.debug("Participating in existing transaction");
    }
    if (isValidateExistingTransaction()) {
      if (definition.getIsolationLevel() != TransactionDefinition.ISOLATION_DEFAULT) {
        Integer currentIsolationLevel = TransactionSynchronizationManager.getCurrentTransactionIsolationLevel();
        if (currentIsolationLevel == null || currentIsolationLevel != definition.getIsolationLevel()) {
          Constants isoConstants = DefaultTransactionDefinition.constants;
          throw new IllegalTransactionStateException("Participating transaction with definition [" +
              definition + "] specifies isolation level which is incompatible with existing transaction: " +
              (currentIsolationLevel != null ?
                  isoConstants.toCode(currentIsolationLevel, DefaultTransactionDefinition.PREFIX_ISOLATION) :
                  "(unknown)"));
        }
      }
      if (!definition.isReadOnly()) {
        if (TransactionSynchronizationManager.isCurrentTransactionReadOnly()) {
          throw new IllegalTransactionStateException("Participating transaction with definition [" +
              definition + "] is not marked as read-only but existing transaction is");
        }
      }
    }
    boolean newSynchronization = (getTransactionSynchronization() != SYNCHRONIZATION_NEVER);
    return prepareTransactionStatus(definition, transaction, false, newSynchronization, debugEnabled, null);
  }

```


这段代码涉及的代码会稍微有点跳，所以我们大概地浏览了一遍后，来对代码拆分一下，主要是根据事务的传播机制处理来拆分

##### PROPAGATION\_NEVER

```java 
 //如果子事务的事务传播级别为PROPAGATION_NEVER的话就报异常
    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NEVER) {
      throw new IllegalTransactionStateException(
          "Existing transaction found for transaction marked with propagation 'never'");
    }
```


##### PROPAGATION\_NOT\_SUPPORTED

```java 
    //如果子方法的事务传播级别为PROPAGATION_NOT_SUPPORTED的话，子方法就不采用Spring提供的事务数据连接了
    //因为我们可以看到他只是做了挂起，并没有新建一个事务，所以意味着子方法是不受Spring事务管理的
    //可以对比对比PROPAGATION_REQUIRES_NEW传播级别的处理
    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NOT_SUPPORTED) {
      if (debugEnabled) {
        logger.debug("Suspending current transaction");
      }
      //挂起事务 ， 即清空了事务管理器当前事务的信息
      Object suspendedResources = suspend(transaction);
      boolean newSynchronization = (getTransactionSynchronization() == SYNCHRONIZATION_ALWAYS);
      return prepareTransactionStatus(
          definition, null, false, newSynchronization, debugEnabled, suspendedResources);
    }

```


##### PROPAGATION\_REQUIRES\_NEW

```java 
if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRES_NEW) {
      if (debugEnabled) {
        logger.debug("Suspending current transaction, creating new transaction with name [" +
            definition.getName() + "]");
      }
      //挂起事务
      SuspendedResourcesHolder suspendedResources = suspend(transaction);
      try {
        //开启一个新事务，重点关注，他会把挂起的SuspendedResourcesHolder 传给了startTransaction方法
        //这就是晾到一边的意思，因为有可能是需要恢复
        return startTransaction(definition, transaction, debugEnabled, suspendedResources);
      }
      catch (RuntimeException | Error beginEx) {
        resumeAfterBeginException(transaction, suspendedResources, beginEx);
        throw beginEx;
      }
    }
```


在startTransaction方法中会有一个步骤，叫newTransactionStatus，显然这个方法就是将新旧的事务信息绑定在一起了并以DefaultTransactionStatus返回

```java 
private TransactionStatus startTransaction(TransactionDefinition definition, Object transaction,
      boolean debugEnabled, @Nullable SuspendedResourcesHolder suspendedResources) {
    ...
    DefaultTransactionStatus status = newTransactionStatus(
        definition, transaction, true, newSynchronization, debugEnabled, suspendedResources);
    ...
    return status;
  }
  
//org.springframework.transaction.support.AbstractPlatformTransactionManager#newTransactionStatus
protected DefaultTransactionStatus newTransactionStatus(
      TransactionDefinition definition, @Nullable Object transaction, boolean newTransaction,
      boolean newSynchronization, boolean debug, @Nullable Object suspendedResources) {

    boolean actualNewSynchronization = newSynchronization &&
        !TransactionSynchronizationManager.isSynchronizationActive();
    return new DefaultTransactionStatus(
        transaction, newTransaction, actualNewSynchronization,
        definition.isReadOnly(), debug, suspendedResources);
  }
```


这个DefaultTransactionStatus会一直返回，直到回到org.springframework.transaction.interceptor.TransactionAspectSupport#createTransactionIfNecessary方法，到了该方法会被prepareTransactionInfo处理

```java 
protected TransactionInfo createTransactionIfNecessary(@Nullable PlatformTransactionManager tm,
      @Nullable TransactionAttribute txAttr, final String joinpointIdentification) {
    ...
    status = tm.getTransaction(txAttr);
    ...
    return prepareTransactionInfo(tm, txAttr, joinpointIdentification, status);
  }
  
//org.springframework.transaction.interceptor.TransactionAspectSupport#prepareTransactionInfo
protected TransactionInfo prepareTransactionInfo(@Nullable PlatformTransactionManager tm,
      @Nullable TransactionAttribute txAttr, String joinpointIdentification,
      @Nullable TransactionStatus status) {
    //将当前事务信息和事务属性重新封装一个TransactionInfo 
    TransactionInfo txInfo = new TransactionInfo(tm, txAttr, joinpointIdentification);
    if (txAttr != null) {
      // We need a transaction for this method...
      if (logger.isTraceEnabled()) {
        logger.trace("Getting transaction for [" + txInfo.getJoinpointIdentification() + "]");
      }
       //并且将状态重置，而且经过了整个流程下来，我们是清楚status内是含有挂起事务的信息的
       txInfo.newTransactionStatus(status);
    }
    else {
    
      if (logger.isTraceEnabled()) {
        logger.trace("No need to create transaction for [" + joinpointIdentification +
            "]: This method is not transactional.");
      }
    }

    //将事务信息绑定到ThreadLocal内
    txInfo.bindToThread();
    return txInfo;
  }
```


那么接下来就来看看他是怎么将事务信息跟线程绑定到一起的

```java 
private static final ThreadLocal<TransactionInfo> transactionInfoHolder =
      new NamedThreadLocal<>("Current aspect-driven transaction");


private void bindToThread() {
  //就旧的事务信息取出来记录下来
  this.oldTransactionInfo = transactionInfoHolder.get();
  //将新的事务信息绑定到transactionInfoHolder内
  transactionInfoHolder.set(this);
}
```


##### PROPAGATION\_NESTED

```java 
if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NESTED) {
      if (!isNestedTransactionAllowed()) {
        throw new NestedTransactionNotSupportedException(
            "Transaction manager does not allow nested transactions by default - " +
            "specify 'nestedTransactionAllowed' property with value 'true'");
      }
      if (debugEnabled) {
        logger.debug("Creating nested transaction with name [" + definition.getName() + "]");
      }
      if (useSavepointForNestedTransaction()) {
        DefaultTransactionStatus status =
            prepareTransactionStatus(definition, transaction, false, false, debugEnabled, null);
        //创建一个save point ，用于回滚的时候回到到该save point
        //先记住，到看回滚代码的时候就一目了然了
        status.createAndHoldSavepoint();
        return status;
      }
      else {
        return startTransaction(definition, transaction, debugEnabled, null);
      }
    }
```


#### 默认的情况

```java 
  boolean newSynchronization = (getTransactionSynchronization() != SYNCHRONIZATION_NEVER);
  return prepareTransactionStatus(definition, transaction, false, newSynchronization, debugEnabled, null);
```


#### 事务处理-提交或回滚

好了，我们重新回到invokeWithinTransaction方法来，createTransactionIfNecessary创建事务的流程我们都清楚是怎么个流程了，创建完成后便会返回当前的事务信息，记住当前的事务信息会因为事务的当前的事务传播机制的不同而不同。

```java 

protected Object invokeWithinTransaction(Method method, @Nullable Class<?> targetClass,
      final InvocationCallback invocation) throws Throwable {
      
    ...  
    PlatformTransactionManager ptm = asPlatformTransactionManager(tm);
    final String joinpointIdentification = methodIdentification(method, targetClass, txAttr);

    if (txAttr == null || !(ptm instanceof CallbackPreferringPlatformTransactionManager)) {
      // Standard transaction demarcation with getTransaction and commit/rollback calls.
      TransactionInfo txInfo = createTransactionIfNecessary(ptm, txAttr, joinpointIdentification);

      Object retVal;
      try {
        // This is an around advice: Invoke the next interceptor in the chain.
        // This will normally result in a target object being invoked.
        retVal = invocation.proceedWithInvocation();
      }
      catch (Throwable ex) {
        // target invocation exception
        completeTransactionAfterThrowing(txInfo, ex);
        throw ex;
      }
      finally {
        cleanupTransactionInfo(txInfo);
      }

      if (retVal != null && vavrPresent && VavrDelegate.isVavrTry(retVal)) {
        // Set rollback-only in case of Vavr failure matching our rollback rules...
        TransactionStatus status = txInfo.getTransactionStatus();
        if (status != null && txAttr != null) {
          retVal = VavrDelegate.evaluateTryFailure(retVal, txAttr, status);
        }
      }

      commitTransactionAfterReturning(txInfo);
      return retVal;
    }
    ...
    
}
```


##### 提交事务

###### org.springframework.transaction.support.AbstractPlatformTransactionManager#commit

commitTransactionAfterReturning方法描述的就是提交事务做的事情，

```java 
public final void commit(TransactionStatus status) throws TransactionException {
    if (status.isCompleted()) {
      throw new IllegalTransactionStateException(
          "Transaction is already completed - do not call commit or rollback more than once per transaction");
    }
    
    DefaultTransactionStatus defStatus = (DefaultTransactionStatus) status;
    //加入我们设置了强制回滚，那就直接在这里回滚事务
    //其实就是我们通过以下代码进行手动回滚时，挥动操作就会在这里处理
    //TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
    if (defStatus.isLocalRollbackOnly()) {
      if (defStatus.isDebug()) {
        logger.debug("Transactional code has requested rollback");
      }
      processRollback(defStatus, false);
      return;
    }

    //判断此事务在之前是否设置了需要回滚，跟globalRollbackOnParticipationFailure有关
    if (!shouldCommitOnGlobalRollbackOnly() && defStatus.isGlobalRollbackOnly()) {
      if (defStatus.isDebug()) {
        logger.debug("Global transaction is marked as rollback-only but transactional code requested commit");
      }
      processRollback(defStatus, true);
      return;
    }
    //最终提交事务
    processCommit(defStatus);
  }
```


org.springframework.transaction.support.AbstractPlatformTransactionManager#processCommit方法强调的是提交的步骤，在这里会有比较多的回调方法，可以让我们在提交事务的过程中做点什么。怎么使用的上边代码已有说明。

不仅如此，这里还描述了事务提交的一系列操作，包括

1. 事务提交前的操作
   1. prepareForCommit() 事务准备提交
   2. triggerBeforeCommit() 事务提交前 （事务提交特有的回调，Rollback那边是没有的）
   3. triggerBeforeCompletion()流程完成前
   4. doCommit() 提交事务&#x20;
      1. 在这个过程中会有一些异常回滚回调
   5. triggerAfterCommit() 提交完成后
   6. triggerAfterCompletion()流程完成后
   7. cleanupAfterCompletion(); 恢复前事务的信息

```java 
private void processCommit(DefaultTransactionStatus status) throws TransactionException {
    try {
      boolean beforeCompletionInvoked = false;

      try {
        boolean unexpectedRollback = false;
        prepareForCommit(status);
        //提交特有的回调，Rollback那边是没有的
        triggerBeforeCommit(status);
        triggerBeforeCompletion(status);
        beforeCompletionInvoked = true;

        if (status.hasSavepoint()) {
          if (status.isDebug()) {
            logger.debug("Releasing transaction savepoint");
          }
          unexpectedRollback = status.isGlobalRollbackOnly();
          status.releaseHeldSavepoint();
        }
        else if (status.isNewTransaction()) {
          if (status.isDebug()) {
            logger.debug("Initiating transaction commit");
          }
          unexpectedRollback = status.isGlobalRollbackOnly();
          doCommit(status);
        }
        else if (isFailEarlyOnGlobalRollbackOnly()) {
          unexpectedRollback = status.isGlobalRollbackOnly();
        }

        // Throw UnexpectedRollbackException if we have a global rollback-only
        // marker but still didn't get a corresponding exception from commit.
        if (unexpectedRollback) {
          throw new UnexpectedRollbackException(
              "Transaction silently rolled back because it has been marked as rollback-only");
        }
      }
      catch (UnexpectedRollbackException ex) {
        // can only be caused by doCommit
        triggerAfterCompletion(status, TransactionSynchronization.STATUS_ROLLED_BACK);
        throw ex;
      }
      catch (TransactionException ex) {
        // can only be caused by doCommit
        if (isRollbackOnCommitFailure()) {
          doRollbackOnCommitException(status, ex);
        }
        else {
          triggerAfterCompletion(status, TransactionSynchronization.STATUS_UNKNOWN);
        }
        throw ex;
      }
      catch (RuntimeException | Error ex) {
        if (!beforeCompletionInvoked) {
          triggerBeforeCompletion(status);
        }
        doRollbackOnCommitException(status, ex);
        throw ex;
      }

      // Trigger afterCommit callbacks, with an exception thrown there
      // propagated to callers but the transaction still considered as committed.
      try {
        triggerAfterCommit(status);
      }
      finally {
        triggerAfterCompletion(status, TransactionSynchronization.STATUS_COMMITTED);
      }

    }
    finally {
      cleanupAfterCompletion(status);
    }
  }
```


事务的提交非常简单就是调用数据库连接的commit方法就完事了

```java 
protected void doCommit(DefaultTransactionStatus status) {
    DataSourceTransactionObject txObject = (DataSourceTransactionObject) status.getTransaction();
    Connection con = txObject.getConnectionHolder().getConnection();
    if (status.isDebug()) {
      logger.debug("Committing JDBC transaction on Connection [" + con + "]");
    }
    try {
      //进行事务提交
      con.commit();
    }
    catch (SQLException ex) {
      throw translateException("JDBC commit", ex);
    }
  }
```


完成了事务提交了，我们需要关注一下在这个流程完全OK的时候，他会跑一个finally 的方法cleanupAfterCompletion，在这里做了一些比较关键的步骤

```java 
private void cleanupAfterCompletion(DefaultTransactionStatus status) {
    //标志当前事务已经完成了
    status.setCompleted();
    //还记得之前我们分析PROPAGATION_REQUIRES_NEW传播机制的时候
    //开启新的事物后会给这个属性打上标记，表示这个是一个新开的事务
    //在这里就会将其清除掉
    if (status.isNewSynchronization()) {
      TransactionSynchronizationManager.clear();
    }
    if (status.isNewTransaction()) {
      //这里会关闭当前数据库连接
      doCleanupAfterCompletion(status.getTransaction());
    }
    //如果有被挂起的事务资源
    if (status.getSuspendedResources() != null) {
      if (status.isDebug()) {
        logger.debug("Resuming suspended transaction after completion of inner transaction");
      }
      Object transaction = (status.hasTransaction() ? status.getTransaction() : null);
      //恢复被挂起的资源到当前线程中
      resume(transaction, (SuspendedResourcesHolder) status.getSuspendedResources());
    }
  }
```


##### 回滚事务

事务提交看完了就可以到事务回滚处瞧瞧了

###### org.springframework.transaction.interceptor.TransactionAspectSupport#completeTransactionAfterThrowing

```java 
protected void completeTransactionAfterThrowing(@Nullable TransactionInfo txInfo, Throwable ex) {
    if (txInfo != null && txInfo.getTransactionStatus() != null) {
      if (logger.isTraceEnabled()) {
        logger.trace("Completing transaction for [" + txInfo.getJoinpointIdentification() +
            "] after exception: " + ex);
      }
      //查看异常是否是事务属性配置的异常
      //@Transactional(rollbackFor = Exception.class , noRollbackFor = NullPointerException.class)
      if (txInfo.transactionAttribute != null && txInfo.transactionAttribute.rollbackOn(ex)) {
        try {
          txInfo.getTransactionManager().rollback(txInfo.getTransactionStatus());
        }
        catch (TransactionSystemException ex2) {
          logger.error("Application exception overridden by rollback exception", ex);
          ex2.initApplicationException(ex);
          throw ex2;
        }
        catch (RuntimeException | Error ex2) {
          logger.error("Application exception overridden by rollback exception", ex);
          throw ex2;
        }
      }
      else {
        // We don't roll back on this exception.
        // Will still roll back if TransactionStatus.isRollbackOnly() is true.
        try {
          txInfo.getTransactionManager().commit(txInfo.getTransactionStatus());
        }
        catch (TransactionSystemException ex2) {
          logger.error("Application exception overridden by commit exception", ex);
          ex2.initApplicationException(ex);
          throw ex2;
        }
        catch (RuntimeException | Error ex2) {
          logger.error("Application exception overridden by commit exception", ex);
          throw ex2;
        }
      }
    }
  }
```


###### 执行回滚

###### org.springframework.transaction.support.AbstractPlatformTransactionManager#processRollback

跟提交事务一样的，我们需要跟进到processRollback方法就能看到整个回滚流程了

```java 
private void processRollback(DefaultTransactionStatus status, boolean unexpected) {
    try {
      boolean unexpectedRollback = unexpected;

      try {
        triggerBeforeCompletion(status);
        //是否标志回滚到的位置，适用于propagation = Propagation.NESTED
        //比如mysql 的save point
        if (status.hasSavepoint()) {
          if (status.isDebug()) {
            logger.debug("Rolling back transaction to savepoint");
          }
          //回滚到save point处
          status.rollbackToHeldSavepoint();
        }
        //如果事务是属于一个新事务
        else if (status.isNewTransaction()) {
          if (status.isDebug()) {
            logger.debug("Initiating transaction rollback");
          }
          //直接回滚
          doRollback(status);
        }
        else {
          //如果当前事务不是这个方法创建的，则会通过设置全局回滚的标识符，然后在提交事务那边进行回滚，
          //具体的可以回到提交事务那边再验证验证
          //就是以下情况
          //@Transaction
          //public void a (){
          //  b();
          //}
          //@Transaction
          //public void b (){
          //  throw ....
          //}
          if (status.hasTransaction()) {
            if (status.isLocalRollbackOnly() || isGlobalRollbackOnParticipationFailure()) {
              if (status.isDebug()) {
                logger.debug("Participating transaction failed - marking existing transaction as rollback-only");
              }
              //该值会设置到ThreadLocal的数据库连接处
              doSetRollbackOnly(status);
            }
            else {
              if (status.isDebug()) {
                logger.debug("Participating transaction failed - letting transaction originator decide on rollback");
              }
            }
          }
          else {
            logger.debug("Should roll back transaction but cannot - no transaction available");
          }
          // Unexpected rollback only matters here if we're asked to fail early
          if (!isFailEarlyOnGlobalRollbackOnly()) {
            unexpectedRollback = false;
          }
        }
      }
      catch (RuntimeException | Error ex) {
        triggerAfterCompletion(status, TransactionSynchronization.STATUS_UNKNOWN);
        throw ex;
      }

      triggerAfterCompletion(status, TransactionSynchronization.STATUS_ROLLED_BACK);

      // Raise UnexpectedRollbackException if we had a global rollback-only marker
      if (unexpectedRollback) {
        throw new UnexpectedRollbackException(
            "Transaction rolled back because it has been marked as rollback-only");
      }
    }
    finally {
      cleanupAfterCompletion(status);
    }
  }
```


###### org.springframework.transaction.support.AbstractPlatformTransactionManager#doRollback

跟提交事务一样，单纯的事务回滚其实是非常简单的，就是调用数据库连接的rollback方法而已

```java 
  @Override
  protected void doRollback(DefaultTransactionStatus status) {
    DataSourceTransactionObject txObject = (DataSourceTransactionObject) status.getTransaction();
    Connection con = txObject.getConnectionHolder().getConnection();
    if (status.isDebug()) {
      logger.debug("Rolling back JDBC transaction on Connection [" + con + "]");
    }
    try {
      //事务回滚
      con.rollback();
    }
    catch (SQLException ex) {
      throw translateException("JDBC rollback", ex);
    }
  }
```
