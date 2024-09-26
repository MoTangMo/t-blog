<template><div><h1 id="深入剖析spring" tabindex="-1"><a class="header-anchor" href="#深入剖析spring"><span>深入剖析Spring</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#%E4%BB%8E%E5%A4%A7%E4%BD%93%E5%88%B0%E5%B1%80%E9%83%A8">从大体到局部</a>
<ul>
<li><a href="#Bean-%E5%92%8C-new-%E5%87%BA%E6%9D%A5%E7%9A%84%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%8C%BA%E5%88%AB">Bean 和 new 出来的对象的区别</a></li>
<li><a href="#%E5%A4%A7%E8%87%B4%E5%9C%B0%E7%9C%8B%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5">大致地看依赖注入</a></li>
<li><a href="#Bean%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96%E8%BF%87%E7%A8%8B">Bean的初始化过程</a></li>
<li><a href="#%E6%B3%A8%E5%85%A5Bean">注入Bean</a></li>
</ul>
</li>
</ul>
<h2 id="从大体到局部" tabindex="-1"><a class="header-anchor" href="#从大体到局部"><span>从大体到局部</span></a></h2>
<p>我们先从一段代码开始切入,这段代码就是直接从AnnotationConfigApplicationContext容器中获取对应的UserService Bean</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">createBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">AppConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//获取Bean</span>
        <span class="token class-name">UserService</span> userService <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">UserService</span><span class="token punctuation">)</span>context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"userService"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userService<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而UserService则是我们创建出来的一个类，我们只是为其加上了@Component注解告诉Spring，这是Spring 的一个Bean</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> orderService<span class="token punctuation">.</span><span class="token function">testOrderService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然在UserService中依赖着OrderService</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>


    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testOrderService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"invoke OrderService test"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正是这段代码蕴含着Spring对对象的一个复杂的处理流程</p>
<h3 id="bean-和-new-出来的对象的区别" tabindex="-1"><a class="header-anchor" href="#bean-和-new-出来的对象的区别"><span>Bean 和 new 出来的对象的区别</span></a></h3>
<p>Bean实际上也是一个对象，但是我们为什么不使用new呢？这是我们研究Spring第一个要探讨的问题：</p>
<p>执行以上的代码，我们能够得到结果的，但是如果我们使用new的方式创建一个UserService对象呢，显然这段代码是错误的，因为orderService是null的，我们并没有赋值</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">newObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">UserService</span> userService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userService<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好，揭露真相了，原来Spring有帮我们做的一件事情是给我们的对象中的依赖赋值的，这个过程就是依赖注入。</p>
<p>而我们new对象的过程是</p>
<p>class → 无参构造 → 对象 </p>
<p>而这是new的过程，Spring则是为我们多做了些事情，所以我们可以这么说Bean是高级一点的对象了</p>
<p>对象→ 依赖注入 → 。。。 → Bean</p>
<h3 id="大致地看依赖注入" tabindex="-1"><a class="header-anchor" href="#大致地看依赖注入"><span>大致地看依赖注入</span></a></h3>
<p>那么怎么进行依赖注入的呢？我们可以看到在依赖上有一个非常显眼的注解@Autowried</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>首先Spring得先找到带有这类注解的依赖吧？怎么找呢？无非是遍历这些属性看谁是有这个依赖的呗</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>       <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserService</span><span class="token punctuation">></span></span> userServiceClass <span class="token operator">=</span> <span class="token class-name">UserService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Field</span> field <span class="token operator">:</span> userServiceClass<span class="token punctuation">.</span><span class="token function">getFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            field<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">Autowired</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bean的初始化过程" tabindex="-1"><a class="header-anchor" href="#bean的初始化过程"><span>Bean的初始化过程</span></a></h3>
<p>Bean在依赖注入后，其实还有一个流程，就是Bean的初始化</p>
<p>即 依赖注入 → 初始化前 → 初始化 → 初始化后 → 。。。 → Bean</p>
<p>为什么有这么一个步骤呢？又将步骤细化到这地步呢？这其实就是为了让Bean能够更具灵活性，能够让Bean的自定义性更高，就好像房屋装修，我们如果能够将房屋装修，分为规划准备，施工，验收，入住这么几个阶段，那么我们只需将我们所做的事情对号入座，然后最后串联到一起，那么这个事情就非常明了，施工起来也会十分顺利了</p>
<p>好，接下来我们来引入一个开发过程中的实例来看看Bean的初始化流程我们可以怎么利用起来吧</p>
<p>首先仍是提供的这段代码，不同的是，我给其添加了一个User实体类,我现在想要每次调用服务的时候，都能够携带admin 对象，通过Autowried 确实可以确保admin 是存在值的，但是不是admin的值，admin的值应该是需要查库得出来的结果</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> userPassword<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>

    <span class="token operator">+</span> <span class="token annotation punctuation">@Autowired</span>
    <span class="token operator">+</span> <span class="token keyword">private</span> <span class="token class-name">User</span> admin<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> orderService<span class="token punctuation">.</span><span class="token function">testOrderService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以针对这种情况，我们需要对UserService Bean创建之前介入一些操作，即帮我们查库来获取admin的值，如何进行介入呢？这就需要一个注解了PostConstruct，这个注解就是帮助我们在创建Bean之前（初始化前）调用我们指定的方法</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">getAdmin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//模拟查库</span>
        user<span class="token punctuation">.</span><span class="token function">setUserPassword</span><span class="token punctuation">(</span><span class="token string">"123"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> user<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然 @PostConstruct注解是为了在初始化前进行一些方法调用或者其他操作的，其他阶段我们怎么控制呢？</p>
<p>初始化： 实现InitializingBean接口提供的afterPropertiesSet方法</p>
<p>初始化后： 基于AOP实现，如果是实现了AOP ，对应的Bean其实是一个Proxy，即初始化前 → 初始化→ 初始化后 → 代理对象 → Bean</p>
<p>这整个过程其实就是Bean的创建生命周期</p>
<h3 id="注入bean" tabindex="-1"><a class="header-anchor" href="#注入bean"><span>注入Bean</span></a></h3>
<p>刚刚是根据无参的构造来创建Bean的，但是如果是有参的情况下呢，当然如果是多个有参的情况下会导致Spring 不知道该使用哪一个有参构造而报错的，这时候需要为Spring提供一个默认的构造函数</p>
<p>那么回到单个有参的情况下，有参的情况下，自然是调用有参方法的，但是service该从何而来呢？Spring是如何帮我们找到一个service传进来呢？</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">User</span> user<span class="token punctuation">;</span>


    <span class="token operator">+</span> <span class="token keyword">public</span> <span class="token class-name">UserService</span><span class="token punctuation">(</span><span class="token class-name">OrderService</span> service<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token operator">+</span>     <span class="token keyword">this</span><span class="token punctuation">.</span>orderService <span class="token operator">=</span> service<span class="token punctuation">;</span>
    <span class="token operator">+</span> <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


