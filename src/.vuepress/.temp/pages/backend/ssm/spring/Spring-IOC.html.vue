<template><div><h1 id="ioc-容器篇" tabindex="-1"><a class="header-anchor" href="#ioc-容器篇"><span>IOC 容器篇</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#Spring%E6%A0%B8%E5%BF%83%E6%9C%AC%E8%B4%A8IOC">Spring 核心本质 IOC</a>
<ul>
<li><a href="#IOC%E7%9A%84%E5%BA%94%E7%94%A8">IOC 的应用</a></li>
<li><a href="#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5">依赖注入</a>
<ul>
<li><a href="#Spring%E5%AF%B9%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5%E7%9A%84%E5%AE%9E%E7%8E%B0">Spring 对依赖注入的实现</a></li>
</ul>
</li>
<li><a href="#Spring-%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5%E7%9A%84%E8%BD%BD%E4%BD%93-IOC%E5%AE%B9%E5%99%A8">Spring 依赖注入的载体 IOC 容器</a>
<ul>
<li><a href="#orgspringframeworkbeansfactoryBeanFactory">org.springframework.beans.factory.BeanFactory</a></li>
<li><a href="#orgspringframeworkcontextApplicationContext">org.springframework.context.ApplicationContext</a></li>
</ul>
</li>
<li><a href="#%E8%B5%B0%E8%BF%9BSpring-IOC%E5%AE%B9%E5%99%A8">走进 Spring IOC 容器</a>
<ul>
<li><a href="#Bean%E7%9A%84%E8%BA%AB%E4%BB%BD%E8%AF%81BeanDefinition-">Bean 的身份证 BeanDefinition </a></li>
</ul>
</li>
<li><a href="#IOC%E5%AE%B9%E5%99%A8%E7%9A%84%E5%88%9B%E5%BB%BA">IOC 容器的创建</a>
<ul>
<li><a href="#%E4%BB%8E%E6%97%A0%E5%88%B0%E6%9C%89">从无到有</a>
<ul>
<li><a href="#Bean%E4%BB%8E%E4%BD%95%E8%80%8C%E6%9D%A5">Bean 从何而来</a></li>
<li><a href="#%E5%AE%B9%E5%99%A8%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96">容器的初始化</a>
<ul>
<li><a href="#orgspringframeworkcontextsupportClassPathXmlApplicationContext%E6%9E%84%E9%80%A0%E6%96%B9%E6%B3%95">org.springframework.context.support.ClassPathXmlApplicationContext 构造方法</a></li>
<li><a href="#orgspringframeworkcontextsupportAbstractApplicationContextrefresh">org.springframework.context.support.AbstractApplicationContext#refresh()</a></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>Spring 提供了非常多的特性可供我们简化我们日常中的应用开发，Spring 提供的特性中其中最为核心的莫过于 IOC 容器</p>
<h2 id="spring-核心本质-ioc" tabindex="-1"><a class="header-anchor" href="#spring-核心本质-ioc"><span>Spring 核心本质 IOC</span></a></h2>
<p>IOC（Inversion of Control）是一种设计思想，或者说是一种设计原则， 核心思想是将程序的控制权从代码本身转移到外部容器，由容器来管理对象的创建、属性赋值和依赖关系，从而降低组件之间的直接依赖 ‌。</p>
<h3 id="ioc-的应用" tabindex="-1"><a class="header-anchor" href="#ioc-的应用"><span>IOC 的应用</span></a></h3>
<p>如何理解这些文绉绉的概念呢？上代码！</p>
<p>不妨看看以下代码，一段普通至极的代码，其实就是存在一个房子（Hourse）类 和一个沙发（Sofa）类，我想搭建一个房子，配上舒服的沙发，但是目前我实现的方式是亲力亲为，自己来 new 一个 Sofa。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Data</span>
    <span class="token annotation punctuation">@AllArgsConstructor</span>
    <span class="token keyword">class</span> <span class="token class-name">Sofa</span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">Long</span> size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">class</span> <span class="token class-name">Hourse</span> <span class="token punctuation">{</span>
        <span class="token comment">//辛苦一点，自己来做张沙发</span>
        <span class="token keyword">private</span> <span class="token class-name">Sofa</span> sofa <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sofa</span><span class="token punctuation">(</span><span class="token string">"red"</span> <span class="token punctuation">,</span> <span class="token number">10L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Sofa</span> <span class="token function">handleSofa</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> sofa<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> 我要沙发
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽说这块代码跑起来没毛病，但是却存在一个问题，就是如果哪一天，我对 Sofa 不满意，想要换成木制家具，那可咋整，只能再亲历亲为自己干？代码如下，不难发现的是，我们因为要将沙发改成木制家具而改动了不少的地方。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Data</span>
    <span class="token annotation punctuation">@AllArgsConstructor</span>
    <span class="token keyword">class</span>  <span class="token class-name">Wooden</span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">Long</span> size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">class</span> <span class="token class-name">Hourse</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">Wooden</span> wooden <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Wooden</span><span class="token punctuation">(</span><span class="token string">"red"</span> <span class="token punctuation">,</span> <span class="token number">10L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Wooden</span> <span class="token function">handleWooden</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> wooden<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> 我要改成木制家具
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就说明了一个问题，Sofa 和 Wooden 与 Hourse 形成了一个依赖，当我们改动需求的时候，会发现还需要动到底层的 Hourse，显然对我们的代码管理会产生不少的阻碍。</p>
<p>面对这样的代码，可以怎么进行处理呢？这么想，既然 Wooden 和 Sofa 与 Hourse 产生了依赖，那么能不能将 Wooden 和 Sofa 抽象出来呢？既然能够抽象那必定存在共性~，不难想到的是，两者都是家具，所以我们可以抽象出一个家具抽象类。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>  <span class="token keyword">class</span> <span class="token class-name">Sofa</span> <span class="token keyword">extends</span> <span class="token class-name">Furniture</span><span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token class-name">Sofa</span><span class="token punctuation">(</span><span class="token class-name">String</span> color<span class="token punctuation">,</span> <span class="token class-name">Long</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">super</span><span class="token punctuation">(</span>color<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">class</span>  <span class="token class-name">Wooden</span> <span class="token keyword">extends</span> <span class="token class-name">Furniture</span><span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token class-name">Wooden</span><span class="token punctuation">(</span><span class="token class-name">String</span> color<span class="token punctuation">,</span> <span class="token class-name">Long</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">super</span><span class="token punctuation">(</span>color<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//家具抽象类</span>
    <span class="token annotation punctuation">@Data</span>
    <span class="token annotation punctuation">@AllArgsConstructor</span>
    <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Furniture</span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">Long</span> size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 应用<span class="token constant">IOC</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而 Hourse 只需要依赖 Furniture 即可</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token comment">//使用IOC</span>
    <span class="token keyword">class</span> <span class="token class-name">Hourse</span> <span class="token punctuation">{</span>
       <span class="token keyword">private</span> <span class="token class-name">Furniture</span> furniture<span class="token punctuation">;</span>

       <span class="token keyword">public</span> <span class="token class-name">Hourse</span><span class="token punctuation">(</span><span class="token class-name">Furniture</span> furniture<span class="token punctuation">)</span><span class="token punctuation">{</span>
           <span class="token keyword">this</span><span class="token punctuation">.</span>furniture <span class="token operator">=</span> furniture<span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getFurniture</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>furniture<span class="token punctuation">.</span>color <span class="token operator">+</span> furniture<span class="token punctuation">.</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这么改造后，我们使用的时候会发现，我们需要什么家具，如果是 Sofa，就直接将 Sofa 传给 Hourse ，想要 Wooden，就直接将 Wooden 传给 Hourse 就行了。想要更多其他家具，只需要拓展 Furniture ，然后再传给 Hourse 就行了，完全不需要改底层的代码！这样就做到了将 Hourse 与 具体实现 Sofa 和 Wooden 解耦了！</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Hourse</span> hourse1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Hourse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Sofa</span><span class="token punctuation">(</span><span class="token string">"red"</span> <span class="token punctuation">,</span> <span class="token number">10L</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Hourse</span> hourse2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Hourse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Wooden</span><span class="token punctuation">(</span><span class="token string">"yellow"</span> <span class="token punctuation">,</span> <span class="token number">10L</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码中，IOC 的原则就藏于其中，我们可以一一分析一下：</p>
<p>根据 IOC 的设计原则</p>
<ol>
<li>
<p>依赖抽象</p>
<ol>
<li>依赖了 Sofa 和 Wooden 的抽象 Furniture</li>
</ol>
</li>
<li>
<p>将程序的控制权从代码本身转移到外部容器</p>
<ol>
<li>
<p>我们将 Hourse 本身需要构建的 Furniture 交给到外界传入了，即代码：</p>
<p>Hourse hourse1 = new Hourse(<strong>new Sofa(&quot;red&quot; , 10L)</strong>);</p>
</li>
</ol>
</li>
</ol>
<p>目前我们仍是需要亲力亲为去 new Sofa 或者 new Wooden 到 Hourse 类中使用，但是 Spring 出来了之后，福音便到了，new Sofa 或者 new Wooden 不再需要我们亲力亲为了，而是交由了外部框架，即 Spring 来完成！当然这需要依靠 Java 提供的反射机制，帮助我们不需要显式地 new 对象。</p>
<p>而 Hourse hourse1 = new Hourse(<strong>new Sofa(&quot;red&quot; , 10L)</strong>)这个流程就是 Spring IOC 容器的一大职责！也就是 DI ，依赖注入啦！</p>
<h3 id="依赖注入" tabindex="-1"><a class="header-anchor" href="#依赖注入"><span>依赖注入</span></a></h3>
<p>回过头来看看这段代码，依赖注入就是 new Sofa 或者 new Wooden 将 Sofa 或者 Wooden 通过 Hourse 的构造函数注入到了 Hourse 实例中，从而使得该 Hourse 具备了 Sofa 实例和 Wooden 实例，这是依赖注入的过程。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Hourse</span> hourse1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Hourse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Sofa</span><span class="token punctuation">(</span><span class="token string">"red"</span> <span class="token punctuation">,</span> <span class="token number">10L</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Hourse</span> hourse2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Hourse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Wooden</span><span class="token punctuation">(</span><span class="token string">"yellow"</span> <span class="token punctuation">,</span> <span class="token number">10L</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，依赖注入的根本目的就是让 Hourse 的 Sofa 属性或者 Wooden 属性有值，学习过 Java 的我们应该都清楚，除了基于构造器可以另属性赋值，还可以通过 setter 方法另属性赋值，所以 setter 注入和构造器注入是 Spring 依赖注入的其中两种方式。</p>
<p>可以想想，我们都把 Hourse 交给 Spring 进行管理，当然希望 Spring 能够返回我们一个充实的，令我们满意的 Hourse 啦！通俗的说，当我们将对象交给 Spring 管理后，Spring 的任务就是要让我们使用这个对象时，尽量确保这个对象中的各个属性（即依赖）能够有值，这也是依赖注入的结果。</p>
<h4 id="spring-对依赖注入的实现" tabindex="-1"><a class="header-anchor" href="#spring-对依赖注入的实现"><span>Spring 对依赖注入的实现</span></a></h4>
<p>依赖注入的实现有很多方式，在 Spring 中，IOC 容器就是实现这种模式的载体，它可以在对象生成或初始化时直接将数据注入到对象中，也可以通过将对象引用注入到对象数据域的方式来注入对方法调用的依赖，当然这个过程是递归的，对象会被逐层注入。</p>
<p>编程源于生活，这个过程跟我们小时候搭积木很像，就以搭建一个积木机器人为例，首先我们会将所有的部件散落在一个区域（IOC 容器），然后找到最小部件，比如说机器人的手臂（最小依赖），然后我们会将这些部件（手臂，武器）拼到一起（依赖注入），然后合并到机器人的身体组成一个更为完整的个体（更上层的依赖注入），当然积木机器人经过这一轮轮的递归终于完成了（Bean）。</p>
<figure><img src="@source/backend/ssm/spring/image/image_2bz45xh4Kq.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="spring-依赖注入的载体-ioc-容器" tabindex="-1"><a class="header-anchor" href="#spring-依赖注入的载体-ioc-容器"><span>Spring 依赖注入的载体 IOC 容器</span></a></h3>
<p>通过以上的学习，我们清楚了 IOC 容器是 Spring 对 IOC 实现的核心，而作为一个能够风靡全球的 Java 框架，Spring 是如何巧妙的设计这个容器的呢？不用说，抽象思维必不可少！那么想要大体地了解 Spring IOC 容器，我们必须先清楚 Spring IOC 对容器的规范是怎么样的~</p>
<p>想要了解这个规范，我们就要将目光聚焦到一个底层接口上了，那就是 Spring Context 中的<strong>org.springframework.beans.factory.BeanFactory</strong>接口</p>
<h4 id="org-springframework-beans-factory-beanfactory" tabindex="-1"><a class="header-anchor" href="#org-springframework-beans-factory-beanfactory"><span>org.springframework.beans.factory.BeanFactory</span></a></h4>
<blockquote>
<p>The <code v-pre>BeanFactory</code> API provides the underlying basis for Spring’s IoC functionality.</p>
</blockquote>
<p>这个接口其实就是 Spring 对 IOC 容器的行为抽象，也就是说想在 Spring 中成为一个 IOC 容器，你至少得具备或者说实现该接口的定义的各个抽象方法。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BeanFactory</span> <span class="token punctuation">{</span>

    <span class="token comment">// 关于FactoryBean的命名前缀</span>
    <span class="token class-name">String</span> <span class="token constant">FACTORY_BEAN_PREFIX</span> <span class="token operator">=</span> <span class="token string">"&amp;"</span><span class="token punctuation">;</span>

    <span class="token comment">//可以根据Bean的名称获取Bean实例</span>
    <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>

    <span class="token comment">//可以根据类型返回Provider</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">ObjectProvider</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">getBeanProvider</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> requiredType<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Bean的作用域类型检查</span>
    <span class="token keyword">boolean</span> <span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">;</span>


    <span class="token keyword">boolean</span> <span class="token function">isPrototype</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">;</span>

    <span class="token comment">//获取Bean的别名</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getAliases</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//。。。更多接口可以自行查看查看</span>

<span class="token punctuation">}</span> 基本容器的实现规范<span class="token class-name">BeanFactory</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过接口的描述，可以发现，BeanFactory 提供了较为完整的 IOC 容器的服务支持，那么实现了 BeanFactory 的容器我们都可以说这是一个 IOC 容器，比如说</p>
<ul>
<li>org.springframework.context.support.GenericApplicationContext</li>
<li>org.springframework.context.support.ClassPathXmlApplicationContext</li>
</ul>
<p>当然他们都不是直接实现的 BeanFactory，BeanFactory 接口只是定义基础的功能规范，他是 Spring IOC 容器应该实现功能的最低标准，Spring 在这之上还拓展了不少接口来提供更加多的功能规范呢！</p>
<ul>
<li>
<p>org.springframework.beans.factory.ListableBeanFactory</p>
<p>提供了获取容器中所有 Bean 的相关信息的能力。这个接口的主要目的是为了允许应用获取更多关于 Bean 工厂的信息，而不仅仅是按名称获取单个 Bean 实例</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ListableBeanFactory</span> <span class="token keyword">extends</span> <span class="token class-name">BeanFactory</span> <span class="token punctuation">{</span>

  <span class="token comment">//返回容器中涵盖的Bean定义的数量</span>
  <span class="token keyword">int</span> <span class="token function">getBeanDefinitionCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//返回Bean定义的名称</span>
  <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getBeanDefinitionNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//返回容器中所有指定类型的 Bean 的映射，其中键是 Bean 的名字，值是 Bean 实例</span>
  <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">getBeansOfType</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> type<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>

  <span class="token comment">//允许更细粒度的控制，比如是否包括非单例 Bean，以及是否允许急切初始化</span>
  <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">getBeansOfType</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> type<span class="token punctuation">,</span> <span class="token keyword">boolean</span> includeNonSingletons<span class="token punctuation">,</span> <span class="token keyword">boolean</span> allowEagerInit<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>

  <span class="token comment">// 返回容器中所有带有指定注解的 Bean 的映射</span>
  <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">getBeansWithAnnotation</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Annotation</span><span class="token punctuation">></span></span> annotationType<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>org.springframework.beans.factory.HierarchicalBeanFactory</p>
<p>它提供了对层次性（或嵌套）BeanFactory 的支持。这意味着你可以拥有一个父 BeanFactory 和多个子 BeanFactory，每个子 BeanFactory 都可以访问其父 BeanFactory 中定义的 Bean，同时也可以有自己的 Bean 定义</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">HierarchicalBeanFactory</span> <span class="token keyword">extends</span> <span class="token class-name">BeanFactory</span> <span class="token punctuation">{</span>

    <span class="token comment">//返回当前 BeanFactory 的父 BeanFactory。如果没有父 BeanFactory，则返回 null</span>
    <span class="token class-name">BeanFactory</span> <span class="token function">getParentBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">//检查当前 BeanFactory 是否包含具有给定名称的 Bean 定义，不包括父 BeanFactory 中的 Bean</span>
    <span class="token keyword">boolean</span> <span class="token function">containsLocalBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="org-springframework-context-applicationcontext" tabindex="-1"><a class="header-anchor" href="#org-springframework-context-applicationcontext"><span>org.springframework.context.ApplicationContext</span></a></h4>
<blockquote>
<p>You should use an <code v-pre>ApplicationContext</code> unless you have a good reason for not doing so, with <code v-pre>GenericApplicationContext</code> and its subclass <code v-pre>AnnotationConfigApplicationContext</code> as the common implementations for custom bootstrapping.</p>
</blockquote>
<p>BeanFactory 有这么多，我们到底要用哪个呢？Spring 给出了答案，那就是 ApplicationContext，这个 IOC 容器可是具备了 BeanFactory 的所有应该具备的功能的，从 ApplicationContext 的接口描述就能得知了。</p>
<p>其中 ListableBeanFactory ， HierarchicalBeanFactory 不正是对 BeanFactory 的功能拓展吗？而且 ， ApplicationContext 不仅仅具备了 IOC 容器应该具备的功能，还具有更多的高级功能，具体的可以查看以下 ApplicationContext 实现的各个接口的描述。</p>
<table>
<thead>
<tr>
<th>Interface</th>
<th>Feature</th>
</tr>
</thead>
<tbody>
<tr>
<td>EnvironmentCapable</td>
<td>提供了访问和应用环境的能力，这包括 profiles 和 properties。</td>
</tr>
<tr>
<td>ListableBeanFactory</td>
<td>提供了枚举（列举）所有 bean 的能力，包括非单例和单例 bean。此外，这个接口允许对 bean 进行查询操作，例如按类型或注解查找 bean。</td>
</tr>
<tr>
<td>HierarchicalBeanFactory</td>
<td>定义了容器的层次结构。这意味着一个 bean 工厂可以是另一个 bean 工厂的父工厂，子工厂可以访问父工厂中的 bean 定义和实例。</td>
</tr>
<tr>
<td>MessageSource</td>
<td>用于国际化，支持消息的解析和格式化，允许开发者定义消息代码，并在运行时根据不同的地区解析这些消息。</td>
</tr>
<tr>
<td>ApplicationEventPublisher</td>
<td>提供了发布应用事件的能力。通过这个接口，Spring 容器可以在运行时发布事件，任何注册为监听器的 bean 都可以接收到这些事件并进行相应的处理。</td>
</tr>
<tr>
<td>ResourcePatternResolver&amp;#x20;</td>
<td>用于解析资源模式（如 Ant 风格的路径模式）到 Resource 对象的列表。这通常用于加载类路径下的多个资源文件，例如配置文件或模板。</td>
</tr>
</tbody>
</table>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ApplicationContext</span> <span class="token keyword">extends</span> <span class="token class-name">EnvironmentCapable</span><span class="token punctuation">,</span> <span class="token class-name">ListableBeanFactory</span><span class="token punctuation">,</span> <span class="token class-name">HierarchicalBeanFactory</span><span class="token punctuation">,</span>
    <span class="token class-name">MessageSource</span><span class="token punctuation">,</span> <span class="token class-name">ApplicationEventPublisher</span><span class="token punctuation">,</span> <span class="token class-name">ResourcePatternResolver</span> <span class="token punctuation">{</span>

      <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token class-name">String</span> <span class="token function">getApplicationName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token class-name">String</span> <span class="token function">getDisplayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">long</span> <span class="token function">getStartupDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token class-name">ApplicationContext</span> <span class="token function">getParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token class-name">AutowireCapableBeanFactory</span> <span class="token function">getAutowireCapableBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">;</span>


<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 ApplicationContext 继承的这部分接口的详情，具体可以参考官网：</p>
<p><a href="https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-functionality-messagesource" title="https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-functionality-messagesource" target="_blank" rel="noopener noreferrer">https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-functionality-messagesource<ExternalLinkIcon/></a></p>
<h3 id="走进-spring-ioc-容器" tabindex="-1"><a class="header-anchor" href="#走进-spring-ioc-容器"><span>走进 Spring IOC 容器</span></a></h3>
<p>如果我们闯进 Spring IOC 容器这个大世界里，就会发现，原来 IOC 容器的世界也是非常丰富的，跟我们生活的地球村一样，有很多很多村民，这些村民有的常驻（单例），有的临时到访（原型），也有的只会在特定时间到访（其他作用域，如 Session，Request），有村民自然就有村长，Spring 作为 IOC 容器的大村长，推荐选拔 ApplicationContext 作为这些村民的村长，负责管理村民的生活起居（生命周期），村民们相互协助，互相依赖，共同为我们的服务提供最大的帮助。</p>
<figure><img src="@source/backend/ssm/spring/image/image_iXjnPsxh1C.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="bean-的身份证-beandefinition" tabindex="-1"><a class="header-anchor" href="#bean-的身份证-beandefinition"><span>Bean 的身份证 BeanDefinition </span></a></h4>
<p>这些村民有一个统称，叫 Spring Bean，他们跟我们一样都会带着身份证（BeanDefinition）来描述他们的身份信息，他们的身份证就是 BeanDefinition 类，BeanDefinition 描述着 Bean 的作用域（常驻村民，到访旅客等），Bean 的依赖关系（家族），是否懒加载等等信息。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BeanDefinition</span> <span class="token keyword">extends</span> <span class="token class-name">AttributeAccessor</span><span class="token punctuation">,</span> <span class="token class-name">BeanMetadataElement</span> <span class="token punctuation">{</span>


  <span class="token class-name">String</span> <span class="token constant">SCOPE_SINGLETON</span> <span class="token operator">=</span> <span class="token class-name">ConfigurableBeanFactory</span><span class="token punctuation">.</span><span class="token constant">SCOPE_SINGLETON</span><span class="token punctuation">;</span>


  <span class="token class-name">String</span> <span class="token constant">SCOPE_PROTOTYPE</span> <span class="token operator">=</span> <span class="token class-name">ConfigurableBeanFactory</span><span class="token punctuation">.</span><span class="token constant">SCOPE_PROTOTYPE</span><span class="token punctuation">;</span>


  <span class="token keyword">int</span> <span class="token constant">ROLE_APPLICATION</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>


  <span class="token keyword">int</span> <span class="token constant">ROLE_SUPPORT</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>


  <span class="token keyword">int</span> <span class="token constant">ROLE_INFRASTRUCTURE</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setParentName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> parentName<span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span> <span class="token function">getParentName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setBeanClassName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> beanClassName<span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span> <span class="token function">getBeanClassName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setScope</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> scope<span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span> <span class="token function">getScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setLazyInit</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> lazyInit<span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">boolean</span> <span class="token function">isLazyInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setDependsOn</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> dependsOn<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getDependsOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setAutowireCandidate</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> autowireCandidate<span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">boolean</span> <span class="token function">isAutowireCandidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setPrimary</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> primary<span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">boolean</span> <span class="token function">isPrimary</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setFactoryBeanName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> factoryBeanName<span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span> <span class="token function">getFactoryBeanName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setFactoryMethodName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> factoryMethodName<span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span> <span class="token function">getFactoryMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token class-name">ConstructorArgumentValues</span> <span class="token function">getConstructorArgumentValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">default</span> <span class="token keyword">boolean</span> <span class="token function">hasConstructorArgumentValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">!</span><span class="token function">getConstructorArgumentValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>


  <span class="token class-name">MutablePropertyValues</span> <span class="token function">getPropertyValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">default</span> <span class="token keyword">boolean</span> <span class="token function">hasPropertyValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">!</span><span class="token function">getPropertyValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>


  <span class="token keyword">void</span> <span class="token function">setInitMethodName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> initMethodName<span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span> <span class="token function">getInitMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token keyword">void</span> <span class="token function">setDestroyMethodName</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> destroyMethodName<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Return the name of the destroy method.
   * <span class="token keyword">@since</span> 5.1
   */</span>
  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span> <span class="token function">getDestroyMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Set the role hint for this <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">BeanDefinition</span></span></span><span class="token punctuation">}</span>. The role hint
   * provides the frameworks as well as tools an indication of
   * the role and importance of a particular <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">BeanDefinition</span></span></span><span class="token punctuation">}</span>.
   * <span class="token keyword">@since</span> 5.1
   * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">ROLE_APPLICATION</span></span>
   * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">ROLE_SUPPORT</span></span>
   * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">ROLE_INFRASTRUCTURE</span></span>
   */</span>
  <span class="token keyword">void</span> <span class="token function">setRole</span><span class="token punctuation">(</span><span class="token keyword">int</span> role<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Get the role hint for this <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">BeanDefinition</span></span></span><span class="token punctuation">}</span>. The role hint
   * provides the frameworks as well as tools an indication of
   * the role and importance of a particular <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">BeanDefinition</span></span></span><span class="token punctuation">}</span>.
   * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">ROLE_APPLICATION</span></span>
   * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">ROLE_SUPPORT</span></span>
   * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">ROLE_INFRASTRUCTURE</span></span>
   */</span>
  <span class="token keyword">int</span> <span class="token function">getRole</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Set a human-readable description of this bean definition.
   * <span class="token keyword">@since</span> 5.1
   */</span>
  <span class="token keyword">void</span> <span class="token function">setDescription</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> description<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Return a human-readable description of this bean definition.
   */</span>
  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span> <span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token comment">// Read-only attributes</span>

  <span class="token doc-comment comment">/**
   * Return a resolvable type for this bean definition,
   * based on the bean class or other specific metadata.
   * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>This is typically fully resolved on a runtime-merged bean definition
   * but not necessarily on a configuration-time definition instance.
   * <span class="token keyword">@return</span> the resolvable type (potentially <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ResolvableType</span><span class="token punctuation">#</span><span class="token field">NONE</span></span><span class="token punctuation">}</span>)
   * <span class="token keyword">@since</span> 5.2
   * <span class="token keyword">@see</span> <span class="token reference"><span class="token class-name">ConfigurableBeanFactory</span><span class="token punctuation">#</span><span class="token field">getMergedBeanDefinition</span></span>
   */</span>
  <span class="token class-name">ResolvableType</span> <span class="token function">getResolvableType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Return whether this a <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">></span></span>Singleton<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">></span></span>, with a single, shared instance
   * returned on all calls.
   * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">SCOPE_SINGLETON</span></span>
   */</span>
  <span class="token keyword">boolean</span> <span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Return whether this a <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">></span></span>Prototype<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">></span></span>, with an independent instance
   * returned for each call.
   * <span class="token keyword">@since</span> 3.0
   * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">SCOPE_PROTOTYPE</span></span>
   */</span>
  <span class="token keyword">boolean</span> <span class="token function">isPrototype</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Return whether this bean is "abstract", that is, not meant to be instantiated.
   */</span>
  <span class="token keyword">boolean</span> <span class="token function">isAbstract</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Return a description of the resource that this bean definition
   * came from (for the purpose of showing context in case of errors).
   */</span>
  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">String</span> <span class="token function">getResourceDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * Return the originating BeanDefinition, or <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span> if none.
   * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Allows for retrieving the decorated bean definition, if any.
   * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Note that this method returns the immediate originator. Iterate through the
   * originator chain to find the original BeanDefinition as defined by the user.
   */</span>
  <span class="token annotation punctuation">@Nullable</span>
  <span class="token class-name">BeanDefinition</span> <span class="token function">getOriginatingBeanDefinition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span> <span class="token class-name">BeanDefinition</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以发现 BeanDefinition 它不仅仅代表着 Bean 的身份证，而且他提供的 setter 方法还为我们提供了制造 Bean 的材料，比如说我们可以通过 setScope()设置作用域,setLazyInit()设置是否懒加载等配置来进行 Bean 的属性配置，当然这个在我们写 XML 配置 Bean 的时候尤为明显。</p>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code>   <span class="token comment">&lt;!-- 定义一个名为 user 的 Bean --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.example.model.User<span class="token punctuation">"</span></span> <span class="token attr-name">lazy-init</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>request<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ioc-容器的创建" tabindex="-1"><a class="header-anchor" href="#ioc-容器的创建"><span>IOC 容器的创建</span></a></h3>
<p>目前我们清楚了关于 IOC 容器和 Bean 的关系，并且得知了 Bean 在容器中是通过 BeanDefinition 来定制生产和标志身份信息的。</p>
<h4 id="从无到有" tabindex="-1"><a class="header-anchor" href="#从无到有"><span>从无到有</span></a></h4>
<h5 id="bean-从何而来" tabindex="-1"><a class="header-anchor" href="#bean-从何而来"><span>Bean 从何而来</span></a></h5>
<p>毋庸置疑，Bean 是由 Spring 容器来创建和管理的，但是跟之前说的一样，Bean 虽然不由我们创建，但是 Bean 的各种属性（BeanDefinition）可是可以由我们说了算的。这好比我们让 Spring 做一套沙发，那我们告诉他沙发即可，让 Spring 做一套木制家具，同理，欸，目前为止，Spring IOC 容器的 IOC 特性已经是表现得淋漓尽致了。</p>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sofa<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.example.model.Sofa<span class="token punctuation">"</span></span> <span class="token attr-name">lazy-init</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>request<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wooden <span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.example.model.Wooden <span class="token punctuation">"</span></span> <span class="token attr-name">lazy-init</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>request<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然除了用 XML 的定义方式，也可以通过注解的方式来定义 Bean，比如说@Configuration，@Bean 等等，但是不同的注解标注的 Bean 类型和特性都是不尽相同的喔，这个之后会有所介绍。</p>
<p>但是，当我们通过 XML 写下了一个个&lt;bean&gt;之后，这块内容就成了一个个 Bean 了？非也非也，我们都说这些 Bean 是由 Spring 来创建的，所以意味着 Spring 必须先找到这些我们定义的 Bean 信息，才能根据这些信息创建对应的 Bean 的！</p>
<p>那么对于 Spring 来说，他需要上哪里找到这些我们定义的 Bean 信息的呢？这就需要我们告知 Spring 了，观察下面代码，从 ClassPathXmlApplicationContext 的接口关系来看可以看出 ClassPathXmlApplicationContext 是属于 ApplicationContext，而且从命名来看就能看出该 ClassPathXmlApplicationContext 容器是专门用于处理 XML 资源文件的一个高级容器。</p>
<p>我们要告知 ClassPathXmlApplicationContext 加载 bean-config.xml 这个我们定义好了 Bean 信息的 xml，当完成了 </p>
<p>ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(&quot;bean-config.xml&quot;);</p>
<p>这段实例化代码以后，我们会发现 context 容器已经构建成功了，当我们调用该容器 getBean 方法时，根据我们配置的 bean id 就能够从容器中拿到对应的 Bean。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//实例化ClassPathXmlApplicationContext 容器</span>
        <span class="token class-name">ClassPathXmlApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">"bean-config.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//根据 bean id 获取Bean</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span>context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">//xml</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 定义一个名为 user 的 <span class="token class-name">Bean</span> <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>bean id<span class="token operator">=</span><span class="token string">"user"</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"com.example.model.User"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>property name<span class="token operator">=</span><span class="token string">"name"</span> value<span class="token operator">=</span><span class="token string">"T"</span> <span class="token operator">/</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>property name<span class="token operator">=</span><span class="token string">"age"</span> value<span class="token operator">=</span><span class="token string">"26"</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>bean<span class="token operator">></span>
 基于<span class="token class-name">ClassPathXmlApplicationContext</span> 获取<span class="token class-name">Bean</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好啦，答案呼之欲出了，Xml 定义的 Bean 的出身之地就在 ClassPathXmlApplicationContext 中，那么接下来我们就从 ClassPathXmlApplicationContext 的方向来探讨 Bean 是如何从无到有的~，但是在此之前，我们必须要先知道 IOC 容器是怎么创建出来的。</p>
<h5 id="容器的初始化" tabindex="-1"><a class="header-anchor" href="#容器的初始化"><span>容器的初始化</span></a></h5>
<h6 id="org-springframework-context-support-classpathxmlapplicationcontext-构造方法" tabindex="-1"><a class="header-anchor" href="#org-springframework-context-support-classpathxmlapplicationcontext-构造方法"><span>org.springframework.context.support.ClassPathXmlApplicationContext 构造方法</span></a></h6>
<p>追踪 ClassPathXmlApplicationContext 构造方法会发现，最终 ClassPathXmlApplicationContext 会调用到以下构造方法，从这段调用方法来看 this(new String[] {configLocation}, true, null);，显然我们只需将目光锁定到 refresh()方法即可了。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">String</span> configLocation<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>configLocation<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token comment">//ClassPathXmlApplicationContext 构造器</span>
<span class="token keyword">public</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span>
      <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> configLocations<span class="token punctuation">,</span> <span class="token keyword">boolean</span> refresh<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">ApplicationContext</span> parent<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>

    <span class="token keyword">super</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//parent 为 null</span>
    <span class="token function">setConfigLocations</span><span class="token punctuation">(</span>configLocations<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//将bean的xml配置存储起来</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>refresh<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//核心方法</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="org-springframework-context-support-abstractapplicationcontext-refresh" tabindex="-1"><a class="header-anchor" href="#org-springframework-context-support-abstractapplicationcontext-refresh"><span>org.springframework.context.support.AbstractApplicationContext#refresh()</span></a></h6>
<p>refresh 方法是 ApplicationContext 容器启动的标志，也是我们需要关注的核心方法，而且该方法采用我们比较常用的模板模式进行的编写，其将 IOC 容器生命周期展现得一目了然，非常有助于我们辨认和分析。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalStateException</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>startupShutdownMonitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Prepare this context for refreshing.</span>
      <span class="token function">prepareRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// Tell the subclass to refresh the internal bean factory.</span>
      <span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory <span class="token operator">=</span> <span class="token function">obtainFreshBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// Prepare the bean factory for use in this context.</span>
      <span class="token function">prepareBeanFactory</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// Allows post-processing of the bean factory in context subclasses.</span>
        <span class="token function">postProcessBeanFactory</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Invoke factory processors registered as beans in the context.</span>
        <span class="token function">invokeBeanFactoryPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Register bean processors that intercept bean creation.</span>
        <span class="token function">registerBeanPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Initialize message source for this context.</span>
        <span class="token function">initMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Initialize event multicaster for this context.</span>
        <span class="token function">initApplicationEventMulticaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Initialize other special beans in specific context subclasses.</span>
        <span class="token function">onRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Check for listener beans and register them.</span>
        <span class="token function">registerListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Instantiate all remaining (non-lazy-init) singletons.</span>
        <span class="token function">finishBeanFactoryInitialization</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Last step: publish corresponding event.</span>
        <span class="token function">finishRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">BeansException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isWarnEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          logger<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">"Exception encountered during context initialization - "</span> <span class="token operator">+</span>
              <span class="token string">"cancelling refresh attempt: "</span> <span class="token operator">+</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Destroy already created singletons to avoid dangling resources.</span>
        <span class="token function">destroyBeans</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Reset 'active' flag.</span>
        <span class="token function">cancelRefresh</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Propagate exception to caller.</span>
        <span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token comment">// Reset common introspection caches in Spring's core, since we</span>
        <span class="token comment">// might not ever need metadata for singleton beans anymore...</span>
        <span class="token function">resetCommonCaches</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>针对 refresh 方法，它包含了 IOC 容器启动到销毁的整个过程需要做的事情，不妨我们先来看看每个调用的方法都具体做了什么先吧</p>
<ul>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#prepareRefresh()</p>
<p>该方法主要是在容器启动前做的一些准备事项，比如记录容器开启时间，设置容器状态，配置初始化属性源，验证必要的属性，初始化早期的应用程序事件集合等</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">prepareRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Switch to active.</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>startupDate <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>closed<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    。。。

    <span class="token comment">// Initialize any placeholder property sources in the context environment.</span>
    <span class="token function">initPropertySources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Validate that all properties marked as required are resolvable:</span>
    <span class="token comment">// see ConfigurablePropertyResolver#setRequiredProperties</span>
    <span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">validateRequiredProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Store pre-refresh ApplicationListeners...</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>earlyApplicationListeners <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>earlyApplicationListeners <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>applicationListeners<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// Reset local application listeners to pre-refresh state.</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>applicationListeners<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>applicationListeners<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>earlyApplicationListeners<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    。。。
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#obtainFreshBeanFactory()</p>
<p>obtainFreshBeanFactory 就是为我们创建或者说重新创建一个 IOC 容器，并加载相关的 BeanDefinition，这里之后我们所创建的 xml 式的 Bean 就以 BeanDefinition 的形式被加载到容器内，随时准备成为 Bean 了。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>  <span class="token keyword">protected</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">refreshBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
      。。。
      <span class="token comment">//创建 Bean Factory</span>
      <span class="token class-name">DefaultListableBeanFactory</span> beanFactory <span class="token operator">=</span> <span class="token function">createBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      beanFactory<span class="token punctuation">.</span><span class="token function">setSerializationId</span><span class="token punctuation">(</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//对BeanFactory的自定义设置，比如是否允许Bean覆盖，是否允许循环依赖</span>
      <span class="token function">customizeBeanFactory</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//加载Bean Definition</span>
      <span class="token function">loadBeanDefinitions</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>beanFactory <span class="token operator">=</span> beanFactory<span class="token punctuation">;</span>
      。。。
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#prepareBeanFactory()</p>
<p>该方法主要是做了以下 4 件事情</p>
<ol>
<li>
<p>为 BeanFactory 设置了类加载器和表达式解析器（SpelExpressionParser）</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    beanFactory<span class="token punctuation">.</span><span class="token function">setBeanClassLoader</span><span class="token punctuation">(</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">setBeanExpressionResolver</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StandardBeanExpressionResolver</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">.</span><span class="token function">getBeanClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">addPropertyEditorRegistrar</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ResourceEditorRegistrar</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>添加 ApplicationContextAwareProcessor 并忽略某些依赖接口，防止重复注入</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    beanFactory<span class="token punctuation">.</span><span class="token function">addBeanPostProcessor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ApplicationContextAwareProcessor</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">ignoreDependencyInterface</span><span class="token punctuation">(</span><span class="token class-name">EnvironmentAware</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">ignoreDependencyInterface</span><span class="token punctuation">(</span><span class="token class-name">EmbeddedValueResolverAware</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">ignoreDependencyInterface</span><span class="token punctuation">(</span><span class="token class-name">ResourceLoaderAware</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">ignoreDependencyInterface</span><span class="token punctuation">(</span><span class="token class-name">ApplicationEventPublisherAware</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">ignoreDependencyInterface</span><span class="token punctuation">(</span><span class="token class-name">MessageSourceAware</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">ignoreDependencyInterface</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContextAware</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>注册可能有需要的 Bean，使得我们在需要的时候随时可以全局使用</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    beanFactory<span class="token punctuation">.</span><span class="token function">registerResolvableDependency</span><span class="token punctuation">(</span><span class="token class-name">BeanFactory</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">registerResolvableDependency</span><span class="token punctuation">(</span><span class="token class-name">ResourceLoader</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">registerResolvableDependency</span><span class="token punctuation">(</span><span class="token class-name">ApplicationEventPublisher</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">registerResolvableDependency</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>注册环境所需相关的 Bean</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>beanFactory<span class="token punctuation">.</span><span class="token function">containsLocalBean</span><span class="token punctuation">(</span><span class="token constant">ENVIRONMENT_BEAN_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      beanFactory<span class="token punctuation">.</span><span class="token function">registerSingleton</span><span class="token punctuation">(</span><span class="token constant">ENVIRONMENT_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>beanFactory<span class="token punctuation">.</span><span class="token function">containsLocalBean</span><span class="token punctuation">(</span><span class="token constant">SYSTEM_PROPERTIES_BEAN_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      beanFactory<span class="token punctuation">.</span><span class="token function">registerSingleton</span><span class="token punctuation">(</span><span class="token constant">SYSTEM_PROPERTIES_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSystemProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>beanFactory<span class="token punctuation">.</span><span class="token function">containsLocalBean</span><span class="token punctuation">(</span><span class="token constant">SYSTEM_ENVIRONMENT_BEAN_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      beanFactory<span class="token punctuation">.</span><span class="token function">registerSingleton</span><span class="token punctuation">(</span><span class="token constant">SYSTEM_ENVIRONMENT_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSystemEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#postProcessBeanFactory()#invokeBeanFactoryPostProcessors()#registerBeanPostProcessors()</p>
<p>当我们跟踪到该方法时，会发现该方法是一个空实现的方法，这是为了给我们留一个拓展点，让我们能够干预到容器的生命周期中【完成 IOC 容器初始化后的】的操作。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token keyword">implements</span> <span class="token class-name">BeanFactoryPostProcessor</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ClassPathXmlApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">"bean-config.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">addBeanFactoryPostProcessor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span>context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postProcessBeanFactory</span><span class="token punctuation">(</span><span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"容器初始化完毕。。。。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#initMessageSource()</p>
<p>该方法看名字便知道是用于初始化一些国际化资源相关的</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">initMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory <span class="token operator">=</span> <span class="token function">getBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>beanFactory<span class="token punctuation">.</span><span class="token function">containsLocalBean</span><span class="token punctuation">(</span><span class="token constant">MESSAGE_SOURCE_BEAN_NAME</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource <span class="token operator">=</span> beanFactory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token constant">MESSAGE_SOURCE_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token class-name">MessageSource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// Make MessageSource aware of parent MessageSource.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource <span class="token keyword">instanceof</span> <span class="token class-name">HierarchicalMessageSource</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HierarchicalMessageSource</span> hms <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HierarchicalMessageSource</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>hms<span class="token punctuation">.</span><span class="token function">getParentMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// Only set parent context as parent MessageSource if no parent MessageSource</span>
          <span class="token comment">// registered already.</span>
          hms<span class="token punctuation">.</span><span class="token function">setParentMessageSource</span><span class="token punctuation">(</span><span class="token function">getInternalParentMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isTraceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        logger<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span><span class="token string">"Using MessageSource ["</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource <span class="token operator">+</span> <span class="token string">"]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// Use empty MessageSource to be able to accept getMessage calls.</span>
      <span class="token class-name">DelegatingMessageSource</span> dms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DelegatingMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      dms<span class="token punctuation">.</span><span class="token function">setParentMessageSource</span><span class="token punctuation">(</span><span class="token function">getInternalParentMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource <span class="token operator">=</span> dms<span class="token punctuation">;</span>
      beanFactory<span class="token punctuation">.</span><span class="token function">registerSingleton</span><span class="token punctuation">(</span><span class="token constant">MESSAGE_SOURCE_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isTraceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        logger<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span><span class="token string">"No '"</span> <span class="token operator">+</span> <span class="token constant">MESSAGE_SOURCE_BEAN_NAME</span> <span class="token operator">+</span> <span class="token string">"' bean, using ["</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>messageSource <span class="token operator">+</span> <span class="token string">"]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#initApplicationEventMulticaster()</p>
<p>该方法用于初始化事件分发器的</p>
</li>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#onRefresh()</p>
<p>该方法是一个模板方法，允许子类在上下文刷新过程中添加特定的初始化逻辑。默认实现为空，即不做任何操作。该方法在特殊 Bean 初始化之前调用。</p>
</li>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#registerListeners()</p>
<p>向 ApplicationEventMulticaster 注册一些跟事件监听相关的 Bean</p>
</li>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#finishBeanFactoryInitialization()</p>
<p>到这里，IOC 容器算是完成实例化了，既然 IOC 容器准备好了，就可以开始生成 Bean 了，没错，这个阶段就是能够描述 Bean 的从无到有的过程，不过在这个阶段是针对非延迟（lazy-init）单例 Bean 的，具体的蕴含在 preInstantiateSingletons 方法内。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">finishBeanFactoryInitialization</span><span class="token punctuation">(</span><span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//注册上下文专用转换器</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>beanFactory<span class="token punctuation">.</span><span class="token function">containsBean</span><span class="token punctuation">(</span><span class="token constant">CONVERSION_SERVICE_BEAN_NAME</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        beanFactory<span class="token punctuation">.</span><span class="token function">isTypeMatch</span><span class="token punctuation">(</span><span class="token constant">CONVERSION_SERVICE_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token class-name">ConversionService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      beanFactory<span class="token punctuation">.</span><span class="token function">setConversionService</span><span class="token punctuation">(</span>
          beanFactory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token constant">CONVERSION_SERVICE_BEAN_NAME</span><span class="token punctuation">,</span> <span class="token class-name">ConversionService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 注册占位符解析器</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>beanFactory<span class="token punctuation">.</span><span class="token function">hasEmbeddedValueResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      beanFactory<span class="token punctuation">.</span><span class="token function">addEmbeddedValueResolver</span><span class="token punctuation">(</span>strVal <span class="token operator">-></span> <span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">resolvePlaceholders</span><span class="token punctuation">(</span>strVal<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 初始化LoadTimeWeaverAware类型Bean</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> weaverAwareNames <span class="token operator">=</span> beanFactory<span class="token punctuation">.</span><span class="token function">getBeanNamesForType</span><span class="token punctuation">(</span><span class="token class-name">LoadTimeWeaverAware</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> weaverAwareName <span class="token operator">:</span> weaverAwareNames<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">getBean</span><span class="token punctuation">(</span>weaverAwareName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//转用默认的类加载器</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">setTempClassLoader</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 将配置进行冻结，即不允许在Bean实例化过程中进行配置的改动</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">freezeConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 实例化所有非延迟单例Bean</span>
    beanFactory<span class="token punctuation">.</span><span class="token function">preInstantiateSingletons</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>org.springframework.context.support.AbstractApplicationContext#finishRefresh()</p>
<p>到该步骤，IOC 容器的创建已经完成了，以下代码就是在完成 IOC 容器创建后的收尾动作，分别有</p>
<ol>
<li>
<p>清理在之前创建 IOC 容器过程中的资源缓存</p>
</li>
<li>
<p>初始化生命周期处理器</p>
<p>将 org.springframework.context.support.DefaultLifecycleProcessor 注册到容器中</p>
</li>
<li>
<p>触发处理器刷新逻辑</p>
<p>调用 DefaultLifecycleProcessor 的 onRefresh 方法</p>
</li>
<li>
<p>发布上下文刷新事件</p>
</li>
<li>
<p>注册到 JMX 监控组件</p>
</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">finishRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//清理在之前创建IOC容器过程中的资源缓存</span>
    <span class="token function">clearResourceCaches</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//初始化生命周期处理器</span>

    <span class="token function">initLifecycleProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//触发处理器刷新逻辑</span>
    <span class="token function">getLifecycleProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">onRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//发布上下文刷新事件</span>
    <span class="token function">publishEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ContextRefreshedEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//注册到JMX监控组件</span>
    <span class="token class-name">LiveBeansView</span><span class="token punctuation">.</span><span class="token function">registerApplicationContext</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>好了，整个 refresh 流程的需要完成的各个事项都理清楚了以后，我们可以将其归纳为</p>
<ol>
<li>
<p>预备</p>
<p>创建好 BeanFactory ，为 BeanFactory 的启动和丰富的功能准备好所需的 Bean，加载好我们定义的 BeanDefintion，设置好 BeanFactory 的各种状态</p>
</li>
<li>
<p>注册</p>
<p>向容器注册可能需要用到的几个核心组件</p>
<ol>
<li>MessageSource</li>
<li>ApplicationEventMulticaster</li>
<li>ApplicationListener</li>
</ol>
</li>
<li>
<p>完成</p>
<p>生成非懒加载单例 Bean 并发布跟容器完成初始化相关的事件</p>
</li>
<li>
<p>清理</p>
<p>最后会对容器初始化过程产生的一些缓存数据进行清理</p>
</li>
</ol>
<p>当然，为了能够提供更好的拓展性，Spring 还让我们能够通过某些接口或者抽象类来干预容器初始化的过程，比如说 BeanFactoryPostProcessor 。</p>
<p>IOC 容器经过了 AbstractApplicationContext#refresh()方法的折腾，就算是创建起来了，那么我们再回到 IOC（控制反转），此时帮助我们实现控制反转的就是我们通过 refresh 方法创建的 ConfigurableListableBeanFactory 容器，即在 refresh 中的 obtainFreshBeanFactory()生成的 beanFactory。</p>
<p>所以有了这么一个 IOC 容器，我们无需在关注 Hourse 创建 Sofa 或者 Wooden 的过程了，因为这个过程我们交给了 Spring 提供的 IOC 容器来做了。</p>
<p>我们只需要告诉 IOC 容器该怎么做就行，也就是说我们将其转为了配置，而不是内部的代码，配置是由我们定义的</p>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Hourse<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.example.ioc.Hourse<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--    告知Spring IOC容器我们要配置的sofa    --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>furniture<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sofa<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

   <span class="token comment">&lt;!--    告知Spring IOC容器我们要创建的是size为3  color为red的Sofa    --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sofa<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.example.ioc.Sofa<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>size<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>3<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java.lang.Long<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过了一番配置，接下来的时候就不由我们处理了，我们只需要管 IOC 容器要就行了，怎么要呢？通过 getBean 方法获取即可，就像下列代码。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ClassPathXmlApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">"bean-config3.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Hourse</span> hourse <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">Hourse</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Sofa</span> sofa <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Sofa</span><span class="token punctuation">)</span> hourse<span class="token punctuation">.</span><span class="token function">getFurniture</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>hourse<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"家具是"</span> <span class="token operator">+</span> sofa<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这么做的好处很显然，如果我需要换成 Wooden，那么只需要加一个 bean 配置，然后修改 Hourse 的 ref 为 wooden 就行了</p>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Hourse<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.example.ioc.Hourse<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--    告知Spring IOC容器我们要配置的wooden  --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>furniture<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wooden<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>


    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wooden<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.example.ioc.Wooden<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>size<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java.lang.Long<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>像这样我们将对 Bean 的创建和管理交给了 Spring IOC 容器的这个过程就是 IOC 控制反转了，好了，目前想必我们对 Spring 的核心机制（IOC 容器）有了较为清晰的认识，对接下来我们继续探索 Bean 的出生有了很大的帮助了。</p>
</div></template>


