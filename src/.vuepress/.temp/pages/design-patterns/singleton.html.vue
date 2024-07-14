<template><div><h1 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式"><span>单例模式</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F">单例模式</a>
<ul>
<li><a href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F">为什么要有单例模式？</a>
<ul>
<li><a href="#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F%E7%9A%84%E4%BC%98%E7%82%B9">单例模式的优点</a></li>
<li><a href="#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F%E7%9A%84%E7%BC%BA%E7%82%B9">单例模式的缺点</a></li>
</ul>
</li>
<li><a href="#new%E5%85%B3%E9%94%AE%E5%AD%97%E7%9A%84%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B">new关键字的执行流程</a></li>
<li><a href="#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B">代码示例</a></li>
<li><a href="#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F%E7%9A%84%E9%80%9A%E7%94%A8%E6%A8%A1%E6%9D%BF">单例模式的通用模板</a></li>
<li><a href="#%E6%87%92%E6%B1%89%E6%94%B9%E9%80%A0">懒汉改造</a></li>
<li><a href="#%E5%A4%9A%E7%BA%BF%E7%A8%8B%E6%94%B9%E9%80%A0">多线程改造</a></li>
<li><a href="#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF">单例模式的使用场景</a></li>
<li><a href="#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F%E7%9A%84%E6%8B%93%E5%B1%95">单例模式的拓展</a></li>
</ul>
</li>
</ul>
<h2 id="单例模式-1" tabindex="-1"><a class="header-anchor" href="#单例模式-1"><span>单例模式</span></a></h2>
<blockquote>
<p>世俗和道德约束你，就是不希望产生第二个皇帝！</p>
</blockquote>
<p>我是皇帝我是苗，所有的臣子心中只有一个皇帝，每天跪拜上朝都是只针对一个皇帝，而这个皇帝就是所有臣子们的单例。</p>
<figure><img src="@source/design-patterns/image/image_8hL5_BruZm.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="为什么要有单例模式" tabindex="-1"><a class="header-anchor" href="#为什么要有单例模式"><span>为什么要有单例模式？</span></a></h3>
<h4 id="单例模式的优点" tabindex="-1"><a class="header-anchor" href="#单例模式的优点"><span>单例模式的优点</span></a></h4>
<p>想一下印刷机，我们不可能印刷一张纸就整一台印刷机吧？我们肯定是一台印刷机就够了，他可以不断地根据我们的需求印刷纸张。同理，有的类他只负责一件单一的事情，比如说<strong>全局配置对象</strong>，他就是全局独一份的，像这种我们只需要一个帮我们工作就行了，这样不仅省下了内存空间，还省了不断创建对象和销毁对象的性能消耗。</p>
<p>所以像<strong>日志打印</strong>，<strong>工具函数</strong>等工具类，全局配置对象，全局唯一管理，这种单一地做事的，不需要太多自定义的类，我们可以考虑使用单例模式来完成类的书写的。</p>
<h4 id="单例模式的缺点" tabindex="-1"><a class="header-anchor" href="#单例模式的缺点"><span>单例模式的缺点</span></a></h4>
<p>因为单例模式会隐藏类之间的依赖关系，可能会造成代码的耦合度增加，不利于单元测试和模块化设计。因此，在设计系统时，应根据实际情况权衡是否使用单例模式。</p>
<h3 id="new关键字的执行流程" tabindex="-1"><a class="header-anchor" href="#new关键字的执行流程"><span>new关键字的执行流程</span></a></h3>
<p>想要获取单例，就必须尽量地把对象产生的方式给禁止掉，让别人没办法产生对象，别人既然没办法产生对象，那我们就需要给别人提供获取单例的途径。</p>
<p>new 是我们最常用的创建对象的方式，从我们在编程界牙牙学语时就开始接触这个new的关键字了</p>
<p>1. new 构造函数可以在内存中创建一个空的对象</p>
<p>2. this就会指向刚才创建的空对象</p>
<p>3. 执行构造函数里面的代码 给这个空对象添加属性和方法</p>
<p>4. 返回这个对象</p>
<p>可以发现的是，new一个新对象的过程是离不开类的构造器的，想要让别人没办法进行对象的产生，我们需要做的就是不让别人使用构造器构造对象！怎么做呢？很简单，就是我们熟悉的private访问修饰符啦！</p>
<p>好，经过分析，我们总结一下，要想单例，我们就要遵循：</p>
<ol>
<li>不允许别人创建对象，对外不提供创建对象的方法</li>
<li>自己创建一个对象自己兜着</li>
<li>暴露一个获取对象的方法给外部调用（想要？管我要就行）</li>
</ol>
<h3 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例"><span>代码示例</span></a></h3>
<p>单例皇帝类</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* @Description: 简单单例
* @Param:
* <span class="token keyword">@return</span>:
* @Author: T
* @Date: 5/3/2024
*/</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Emperor</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Emperor</span> emperor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Emperor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//兜着一个对象</span>
    <span class="token keyword">private</span> <span class="token class-name">Emperor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">//不允许外部以new创建对象</span>
    <span class="token comment">//想要对象？管我要</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Emperor</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> emperor<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//皇帝发话</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"爱卿们平身！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码，就把我们提到的三件事完成了。</p>
<p>臣子类</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Minister</span><span class="token punctuation">{</span>
    <span class="token comment">//臣子上朝</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">gotoCourt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"皇上万岁万万岁！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code> <span class="token comment">//上朝三天</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Minister</span> minister1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Minister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Minister</span> minister2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Minister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Minister</span> minister3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Minister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//三个不同臣子</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>minister1 <span class="token operator">==</span> minister2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>minister2 <span class="token operator">==</span> minister3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>minister1 <span class="token operator">==</span> minister3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//通过提供的getInstance获取皇帝单例</span>
        <span class="token class-name">Emperor</span> emperor <span class="token operator">=</span> <span class="token class-name">Emperor</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Emperor</span> emperor2 <span class="token operator">=</span> <span class="token class-name">Emperor</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第"</span><span class="token operator">+</span>i<span class="token operator">+</span><span class="token string">"天朝拜"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            minister1<span class="token punctuation">.</span><span class="token function">gotoCourt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            minister2<span class="token punctuation">.</span><span class="token function">gotoCourt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            minister3<span class="token punctuation">.</span><span class="token function">gotoCourt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"此皇帝是同一个皇帝？"</span><span class="token operator">+</span><span class="token punctuation">(</span>emperor<span class="token operator">==</span>emperor2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Emperor</span><span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token boolean">false</span>
<span class="token boolean">false</span>
<span class="token boolean">false</span>
第<span class="token number">0</span>天朝拜
皇上万岁万万岁！
皇上万岁万万岁！
皇上万岁万万岁！
此皇帝是同一个皇帝？<span class="token boolean">true</span>
爱卿们平身！
第<span class="token number">1</span>天朝拜
皇上万岁万万岁！
皇上万岁万万岁！
皇上万岁万万岁！
此皇帝是同一个皇帝？<span class="token boolean">true</span>
爱卿们平身！
第<span class="token number">2</span>天朝拜
皇上万岁万万岁！
皇上万岁万万岁！
皇上万岁万万岁！
此皇帝是同一个皇帝？<span class="token boolean">true</span>
爱卿们平身！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到这种方式，new出来的大臣都是不同的实例，但是每天朝拜的皇帝却始终是一个皇帝单例！这就是单例模式的使用。</p>
<h3 id="单例模式的通用模板" tabindex="-1"><a class="header-anchor" href="#单例模式的通用模板"><span>单例模式的通用模板</span></a></h3>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span><span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> singleton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//在类内部自行创建好需要使用的单例类</span>
  
   <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token comment">//私有化构造函数，限制new 多个对象</span>
   
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span>singleton<span class="token punctuation">;</span>
     <span class="token punctuation">}</span><span class="token comment">//通过类内部方法获取该类的唯一实例对象</span>
     
    <span class="token comment">//其他方法</span>
    <span class="token comment">//...</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="懒汉改造" tabindex="-1"><a class="header-anchor" href="#懒汉改造"><span>懒汉改造</span></a></h3>
<p>这样就可以完成类的单例模式创建了，但是这样真的好吗？</p>
<p>仔细观察，在类刚开始创建的时候我们就先创建对象了</p>
<p>private static final Singleton singleton = new Singleton();</p>
<p>也就是说我们创建应用的时候Singleton对象就已经存在并随时待命了。这就是饿汉式的单例模式，这也意味着，无论这个单例是否被使用，它都会在类加载时就被创建，这可能会有一些内存上的开销。</p>
<p>那更完美一点的情况就是需要的时候再加载呗</p>
<p>所以我们可以做以下改造</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span><span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> singleton <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token comment">//不会在一开始就提供单例对象</span>
  <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token comment">//限制产生多个对象</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//提供一个方法产生单例对象，这是被动产生单例对象，即</span>
  <span class="token comment">//需要使用的时候才会产生对象，跟上面的例子是不一致的</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>singleton <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        singleton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> singleton <span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>做了这部分改造，我们就可以实现需要的时候再产生对象，也就是懒汉式的单例模式了</p>
<h3 id="多线程改造" tabindex="-1"><a class="header-anchor" href="#多线程改造"><span>多线程改造</span></a></h3>
<p>不过！问题又来了，单例是一个共享资源，全局仅一份这我们都知道，所以我们要率先关注在并发调用getInstance的情况下是否有可能会有多例的情景。想想如何线程A还没来得及new Singleton()，线程B就趁虚而入了，这时候不就有可能有两个Singleton了吗？针对这种情景，我们就需要用上synchronized 保证线程安全了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
  <span class="token comment">// 声明单例对象，但不立即初始化</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> singleton<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 私有化构造函数，防止外部通过new创建实例</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 第一次检查：如果实例已经被创建，那么直接返回实例</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>singleton <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 同步块，保证线程安全</span>
      <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 第二次检查：如果实例仍然没有被创建，那么创建实例</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>singleton <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          singleton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> singleton<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 其他方法</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码就是双重检索式的单例模式，也是我们最常用的单例模式，这当中有两个关键点</p>
<ol>
<li>volatile
<ol>
<li> volatile是为了让其他线程都能正确地看到singleton的状态</li>
</ol>
</li>
<li>双重if
<ol>
<li>第一重if
<ol>
<li>提高性能，同步代码块说白了就是让线程排着队执行代码，排队执行本身就是很费时间的，所以第一重if就是singleton不为空的情况下，也就不用等了，直接返回singleton就行</li>
</ol>
</li>
<li>第二重if
<ol>
<li>保证线程安全和单例的唯一性</li>
</ol>
</li>
</ol>
</li>
</ol>
<h3 id="单例模式的使用场景" tabindex="-1"><a class="header-anchor" href="#单例模式的使用场景"><span>单例模式的使用场景</span></a></h3>
<p>在一个系统中，要求一个类有且仅有一个对象，如果出现多个对象就会出现不良反应，可以采用单例模式</p>
<ul>
<li>要求生成唯一序列号的环境</li>
<li>在整个项目中需要一个共享访问点或共享数据，例如一个Web页面上的计数器，可以不用把每次刷新都记录到数据库中，使用单例模式保持计数器的值，并确保是线程安全的</li>
<li>创建一个对象需要消耗较多资源的，如要访问IO和数据库等资源</li>
<li>需要定义大量的静态常量和静态方法（如工具类）的环境，可以采用单例模式</li>
</ul>
<h3 id="单例模式的拓展" tabindex="-1"><a class="header-anchor" href="#单例模式的拓展"><span>单例模式的拓展</span></a></h3>
<p>单例模式即由始至终只会产生一个对象，使用一个对象</p>
<p>那么能不能由始至终只会产生2，3，4，5个对象呢？当然可以</p>
<p>上代码，这回是多个皇帝</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Emperors</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> maxofEmperors <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span><span class="token comment">//定义最大数量的多例</span>
    <span class="token keyword">static</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> emperorName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//与单例不同，单例一直只有一个对象，所以不需要指定名称</span>
    <span class="token keyword">static</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Emperors</span><span class="token punctuation">></span></span> emperors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>maxofEmperors<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//容纳对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span>  <span class="token keyword">int</span> <span class="token class-name">EmperorId</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> i <span class="token operator">&lt;</span> maxofEmperors <span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            emperors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Emperors</span><span class="token punctuation">(</span><span class="token string">"皇帝"</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token comment">//静态代码块，当类被加载时执行且只执行一次</span>
    <span class="token keyword">private</span> <span class="token class-name">Emperors</span><span class="token punctuation">(</span><span class="token class-name">String</span> name <span class="token punctuation">)</span><span class="token punctuation">{</span>
        emperorName<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//获取实例对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Emperors</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Random</span> random <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">EmperorId</span> <span class="token operator">=</span> random<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>maxofEmperors<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> emperors<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">EmperorId</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//皇帝发话了</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>emperorName<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">EmperorId</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"说：众生平等！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>臣子类</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Ministers</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"皇上万岁万万岁！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> demo2 <span class="token punctuation">{</span>
    <span class="token comment">//5天朝拜</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Ministers</span> ministers <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Ministers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">Emperors</span> emperors <span class="token operator">=</span> <span class="token class-name">Emperors</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ministers<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            emperors<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>皇上万岁万万岁！
皇帝<span class="token number">1</span>说：众生平等！
皇上万岁万万岁！
皇帝<span class="token number">0</span>说：众生平等！
皇上万岁万万岁！
皇帝<span class="token number">0</span>说：众生平等！
皇上万岁万万岁！
皇帝<span class="token number">0</span>说：众生平等！
皇上万岁万万岁！
皇帝<span class="token number">0</span>说：众生平等！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从结果可得，对象始终只有两个，皇帝0，皇帝1</p>
</div></template>


