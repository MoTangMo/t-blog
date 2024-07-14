<template><div><h1 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式"><span>工厂模式</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F%E7%9A%84%E4%BC%98%E5%8A%BF">工厂模式的优势</a></li>
<li><a href="#%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%8A%A3%E5%8A%BF">工厂模式的劣势</a></li>
<li><a href="#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B">代码示例</a></li>
<li><a href="#%E9%A9%AC%E8%89%AF%E5%8F%AF%E4%B8%8D%E4%BB%85%E4%BB%85%E7%94%BB%E9%A9%AC">马良可不仅仅画马</a>
<ul>
<li><a href="#%E5%B7%A5%E5%8E%82%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F">工厂方法模式</a></li>
</ul>
</li>
<li><a href="#%E6%8B%93%E5%B1%95">拓展</a></li>
</ul>
<blockquote>
<p>📌少年应有鸿鹄志，当骑骏马他平川。</p>
</blockquote>
<p>神笔马良要赏我一批骏马，令我踏平川，问我想要一批什么配置的骏马，我把我的需求跟马良哥说了，我说我要一匹黑马，时速达100km/h的黑马，他唰唰唰给我画了一匹。</p>
<figure><img src="@source/design-patterns/image/image_VukRZjRW6M.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>回到编程的世界里，马良就是我的工厂，我需要告诉马良哥马的颜色，速度配置，马良抬笔整匹马给我驰骋，但是马良如何画马的，我不必关心，也许我想要棕马，蓝马，那我把需求告诉马良哥就行了。这就是接口的好处啦，接口只需关心参数，需求，然后具体的实现是工厂的事，开发者如果需要拓展，只需实现接口就行了，无需改动其他代码，这就是工厂方法的好处。</p>
<h2 id="工厂模式的优势" tabindex="-1"><a class="header-anchor" href="#工厂模式的优势"><span>工厂模式的优势</span></a></h2>
<ol>
<li><strong>创建对象的解耦</strong>：工厂模式将对象的创建逻辑与使用逻辑分离，客户端只需要知道它们需要什么类型的对象，而不需要知道对象是如何创建的。这降低了客户端和具体产品类之间的耦合度。</li>
<li><strong>扩展性和灵活性</strong>：工厂模式允许系统通过引入新的产品类来扩展，而无需修改现有的客户端代码。只需添加新的工厂类或修改现有的工厂类即可支持新的产品类型。</li>
<li><strong>统一的管理</strong>：工厂模式可以提供一个集中的位置来管理对象创建的逻辑，这使得对象的创建过程更加易于管理和维护。</li>
<li><strong>降低维护成本</strong>：由于客户端与具体产品类的解耦，当产品类发生变化时，只需要修改工厂类，而不需要修改使用产品类的客户端代码，这样可以降低维护成本。</li>
<li><strong>代码的可复用性</strong>：工厂模式可以创建可复用的对象，这些对象可以在多个不同的客户端之间共享。</li>
</ol>
<h2 id="工厂模式的劣势" tabindex="-1"><a class="header-anchor" href="#工厂模式的劣势"><span>工厂模式的劣势</span></a></h2>
<ol>
<li><strong>复杂性</strong>：引入工厂模式可能会增加系统的复杂性，尤其是在简单的应用程序中，可能会导致不必要的开销和过度工程化。</li>
<li><strong>性能开销</strong>：在某些情况下，工厂模式可能会引入额外的性能开销，因为需要通过工厂来创建对象，而不是直接实例化。</li>
<li><strong>违反开闭原则</strong>：虽然工厂模式可以提高系统的扩展性，但是当需要添加新的产品类时，可能需要修改工厂类，这违反了开闭原则，即软件实体应该对扩展开放，对修改关闭。</li>
<li><strong>难以追踪</strong>：在使用工厂模式时，如果实现不够透明，可能会使得对象的创建过程变得难以追踪和理解，尤其是当工厂逻辑变得复杂时。</li>
</ol>
<h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例"><span>代码示例</span></a></h2>
<p>那好，接下来可以尝试分析一下这个过程使用代码该怎么完成，感受一下工厂模式可以如何给我们带来更好的代码维护。</p>
<p>我们可以理清一下整段代码逻辑：我 → 黑马需求 → 马良 → 抽象马 → 黑马</p>
<p> 逻辑有了，那我们得分析我们需要什么？</p>
<ol>
<li>需要马良也就是工厂</li>
<li>马良是给我们画马的，想要马良不要那么辛苦，我们可以有一匹抽象马，抽象马是所有马的共同特征，比如说颜色，速度之类的，就像我们画画得先把轮廓画出来，然后再加以点缀</li>
</ol>
<p>好啦，我们一步一步实现</p>
<p>首先是马良，马良只给我们一个静态的方法就是画马的方法</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MaliangImpl</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">AbstractHouse</span> <span class="token function">drawHouse</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">AbstractHouse</span> house <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"black"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BlackHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WhiteHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> house<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们就来一个马的轮廓</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractHouse</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> speed<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">talk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后现在有白马和黑马两个具体实现</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * @Description 黑马
 * @Author T
 * @Date 2024/5/4 18:37     
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BlackHouse</span> <span class="token keyword">extends</span><span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">talk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setColor</span><span class="token punctuation">(</span><span class="token string">"黑马"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setSpeed</span><span class="token punctuation">(</span><span class="token string">"100km/h"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"我是"</span><span class="token operator">+</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"，冲冲冲"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



<span class="token doc-comment comment">/**
 * @Description 白马
 * @Author T
 * @Date 2024/5/4 18:38
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WhiteHouse</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractHouse</span><span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">talk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setColor</span><span class="token punctuation">(</span><span class="token string">"白马"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setSpeed</span><span class="token punctuation">(</span><span class="token string">"60km/h"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"我是"</span><span class="token operator">+</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"，冲冲冲"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好啦，这样其实一个工厂就算是完成啦</p>
<p>怎么用呢？很简单，我们只需要告诉马良要画什么马就行了，就像以下代码</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">AbstractHouse</span> house <span class="token operator">=</span> <span class="token class-name">MaliangImpl</span><span class="token punctuation">.</span><span class="token function">drawHouse</span><span class="token punctuation">(</span><span class="token string">"black"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        house<span class="token punctuation">.</span><span class="token function">talk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>结果：我是黑马，冲冲冲
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这就是工厂模式的书写方式，也是很常用的一个工厂方法，工厂对外提供了静态方法来创建类，而不需要开发new，而如果不想要黑马，白马，还要拓展几款马，那我们只需要创建一个OtherHouse继承AbstractHouse，然后实现自己的方法就行啦，而不需要改其他代码了。</p>
<p>这就是简单工厂模式。</p>
<h2 id="马良可不仅仅画马" tabindex="-1"><a class="header-anchor" href="#马良可不仅仅画马"><span>马良可不仅仅画马</span></a></h2>
<p>我们都知道马良哥可不仅仅只会画马喔，他还能画很多很多东西，就因为马良哥能画的东西非常非常多，随着马良工厂越来越复杂，可能就会有画马的静态方法，画车的静态方法，画小狗狗的静态方法一大堆，对于使用工厂模式的开发者来说，这并不好处理的。</p>
<h3 id="工厂方法模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式"><span>工厂方法模式</span></a></h3>
<p>而面对着形形色色的工厂，我们能不能进对外提供一个对应的创建工厂的接口，我们只管使用该接口来创建对应的工厂再完成对应的产品创建即可。</p>
<p>当然可以，我们只需有一个Product的类，不管是马，还是车，还是小狗狗都是马良个产品，所以我们需要有一个产品类</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>马良只管画产品，也就是</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Maliang</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * @Description 画马接口
     * @Author T
     * @Date 2024/5/4 18:35     
     **/</span>
    <span class="token class-name">Product</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而我们可以把马良能画的内容抽象成一个个具体的动作</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DrawHouse</span> <span class="token keyword">implements</span> <span class="token class-name">Maliang</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Product</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"white"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">WhiteHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BlackHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们就可以尝试着通过Maliang这个接口构建不同的工厂，再通过工厂来创建不同的产品啦</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Maliang</span> maliang <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DrawHouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">AbstractHouse</span> house <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">AbstractHouse</span><span class="token punctuation">)</span> maliang<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token string">"black"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        house<span class="token punctuation">.</span><span class="token function">talk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以也许我们想画车啦，我们只需面对Maliang这个接口就行了</p>
<p>也就是说我们只需要拓展一个画车工厂类就行</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DrawCar</span> <span class="token keyword">implements</span> <span class="token class-name">Maliang</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Product</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BlackCar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractCar</span> <span class="token keyword">extends</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> color<span class="token punctuation">;</span>

    <span class="token class-name">String</span> speed<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BlackCar</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractCar</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"black car go"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，我们只需面对Maliang这个接口类创建一个我们想要的工厂类，再用该工厂类来生产产品即可</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Maliang</span> maliang <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DrawCar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">AbstractCar</span> car <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">AbstractCar</span><span class="token punctuation">)</span> maliang<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token string">"black"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        car<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是工厂模式的正确使用姿势，工厂模式的应用范围还是非常广的，比如说<strong>支付网关</strong>，<strong>日志记录</strong>，像这种<strong>需要提供一个统一的接口来创建不同类型的对象</strong>，毕竟他可以解开具体产品和开发者创建产品的耦合，使得创建产品的方式更好拓展，而且还能让我们更好地控制类生产的生命周期。</p>
<h2 id="拓展" tabindex="-1"><a class="header-anchor" href="#拓展"><span>拓展</span></a></h2>
<p>工厂模式时常会有一个好搭档，那就是单例模式，单例工厂的应用也非常广阔，毕竟想想工厂只是根据我们的需求生产类，没有必要每次生产的时候都要创建销毁吧？这不就出发了单例的关键词了吗？所以结合单例，能帮助工厂省下不少的性能开销呢！</p>
<p>当然在日常的开发当中，其实简单工厂模式已经是完全足以了，既简单又好用。</p>
</div></template>


