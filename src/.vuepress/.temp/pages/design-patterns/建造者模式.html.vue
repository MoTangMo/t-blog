<template><div><h1 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式"><span>建造者模式</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#%E7%8E%B0%E5%AE%9E%E4%B8%96%E7%95%8C">现实世界</a></li>
<li><a href="#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B">代码示例</a>
<ul>
<li><a href="#%E6%8A%AB%E8%90%A8%E7%B1%BB">披萨类</a></li>
<li><a href="#%E5%88%B6%E4%BD%9C%E6%8A%AB%E8%90%A8%E7%9A%84%E6%B5%81%E7%A8%8B">制作披萨的流程</a></li>
<li><a href="#%E6%A6%B4%E8%8E%B2%E6%8A%AB%E8%90%A8%E7%9A%84%E5%AE%9E%E7%8E%B0">榴莲披萨的实现</a></li>
<li><a href="#%E6%8A%AB%E8%90%A8%E5%BA%97">披萨店</a></li>
<li><a href="#%E6%B5%8B%E8%AF%95">测试</a></li>
</ul>
</li>
<li><a href="#%E5%BB%BA%E9%80%A0%E8%80%85%E6%A8%A1%E5%BC%8F%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9">建造者模式的优缺点</a>
<ul>
<li><a href="#%E4%BC%98%E7%82%B9">优点</a></li>
<li><a href="#%E7%BC%BA%E7%82%B9">缺点</a></li>
</ul>
</li>
<li><a href="#%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF">使用场景</a></li>
</ul>
<h2 id="现实世界" tabindex="-1"><a class="header-anchor" href="#现实世界"><span>现实世界</span></a></h2>
<blockquote>
<p>📌披萨香满巷， 饼底金黄脆。 奶酪融化长， 蔬菜色彩旺。</p>
</blockquote>
<p>路过繁华街道，闹事的一切我熟视无睹，唯独那家亮着泛黄灯光的至尊披萨，让我垂涎三尺，我加快脚步，横穿马路，进入店铺，我说老板给我来一份榴莲菠萝披萨套餐，榴莲菠萝披萨当中有榴莲，菠萝，芝士，面饼，那叫一个美滋滋，一闷一个不出声。</p>
<figure><img src="@source/design-patterns/image/image_bCMKMrZo-M.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>披萨的材料是复杂的，有主料，饼底，芝士，水果构成，而这就像我们到披萨店吃披萨一样，披萨店就是建造者，他是复杂模型披萨的建造者，我们想要披萨，披萨店帮我们做披萨，诶，这层关系就出来啦。而假榴莲，加芝士，摊饼底，加菠萝，这就是一份秘方，店员根据这个秘方做就成啦，为什么需要这份秘方呢？好处在于如果突然有一天发现加草莓口感会更好，那这时候可以直接通过改加水果的方法就可以又拓展出一个新秘方喽。</p>
<p>披萨店帮我们根据一定流程制作披萨，这就是典型的建造者模式。</p>
<p>回到编程世界，我们为什么需要使用到建造者模式呢？参考现实世界，不难想到，我们伸伸手，跟服务员说一下要个披萨就得到披萨了，而建造者模式，一样，我们伸伸手让建造者build一下对象，我们就能得到对象了，而不需要自己动手去创建对象。而如果我们想要吃点别的披萨，只需跟服务员说一下，要一个培根芝士披萨，那服务员仍然是按照制作流程制作，只是把榴莲换成了培根，然后进行烘培就OK啦～这就是拓展了，而且拓展非常方便，只需要修改对应子流程即可。</p>
<p>所以建造者模式的优势就很显然了！</p>
<h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例"><span>代码示例</span></a></h2>
<p>我们可以分析一下代码的逻辑结构：首先我们需要确认建造者是谁？显然就是披萨店，然后披萨店要帮我们做一份披萨，披萨的四要素：1. 饼底 2. 主料 3. 辅料 4. 芝士，这个其实就是披萨的抽象秘方了，也就是说披萨店做一份披萨离不开要准备好这4个材料然后进行烘培</p>
<p>通过这层关系我们可以有以下关系图</p>
<div class="language-mermaid line-numbers-mode" data-ext="mermaid" data-title="mermaid"><pre v-pre class="language-mermaid"><code><span class="token keyword">flowchart</span> LR
      A<span class="token text string">(披萨)</span><span class="token arrow operator">--></span>B<span class="token text string">[披萨制作流程]</span>
      B<span class="token arrow operator">--></span>C<span class="token text string">[榴莲披萨,培根芝士披萨]</span>
      C<span class="token arrow operator">----></span>E<span class="token text string">[披萨店]</span>
      E<span class="token arrow operator">--></span>F<span class="token text string">[完成披萨的制作]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据这个关系图，我们不难分析出来，想要完成这一流程，我们需要有4要素，也是建造者模式的4个角色</p>
<ol>
<li>披萨类 → 产品类</li>
<li>对披萨流程的抽象 → 抽象建造着类</li>
<li>具体披萨的实现 → 具体建造者类</li>
<li>披萨店 → 指挥者类</li>
</ol>
<p>好了，认识到这里，思路就清晰了，动起手来</p>
<h4 id="披萨类" tabindex="-1"><a class="header-anchor" href="#披萨类"><span>披萨类</span></a></h4>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/** 
* @Description: 披萨实体
* @Param: 
* <span class="token keyword">@return</span>: 
* @Author: T
* @Date: 5/10/2024
*/</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> ingredients<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> accessories<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> fruit<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> cheese<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getIngredients</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> ingredients<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setIngredients</span><span class="token punctuation">(</span><span class="token class-name">String</span> ingredients<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ingredients <span class="token operator">=</span> ingredients<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAccessories</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> accessories<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAccessories</span><span class="token punctuation">(</span><span class="token class-name">String</span> accessories<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>accessories <span class="token operator">=</span> accessories<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getFruit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> fruit<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setFruit</span><span class="token punctuation">(</span><span class="token class-name">String</span> fruit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fruit <span class="token operator">=</span> fruit<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCheese</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> cheese<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setCheese</span><span class="token punctuation">(</span><span class="token class-name">String</span> cheese<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cheese <span class="token operator">=</span> cheese<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="制作披萨的流程" tabindex="-1"><a class="header-anchor" href="#制作披萨的流程"><span>制作披萨的流程</span></a></h3>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * @Description 披萨的秘方
 * @Author T
 * @Date 2024/5/12 16:08
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">PizzaRecipe</span> <span class="token punctuation">{</span>


    <span class="token keyword">protected</span>  <span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Pizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * @Description 添加主料
     * @Author T
     * @Date 2024/5/12 16:10
     **/</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">addIngredients</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>



    <span class="token doc-comment comment">/**
     * @Descriptio 添加辅料
     * @Author T
     * @Date 2024/5/12 16:10
     **/</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">addAccessories</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * @Descriptio 添加水果
     * @Author T
     * @Date 2024/5/12 16:10
     **/</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">addFruit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * @Descriptio 添加芝士
     * @Author T
     * @Date 2024/5/12 16:10
     **/</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">addCheese</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * @Description 制作披萨
     * @Author T
     * @Date 2024/5/12 16:16
     **/</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Pizza</span> <span class="token function">buildPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="榴莲披萨的实现" tabindex="-1"><a class="header-anchor" href="#榴莲披萨的实现"><span>榴莲披萨的实现</span></a></h3>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * @Description 榴莲披萨
 * @Author T
 * @Date 2024/5/12 16:14
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DurianPizza</span> <span class="token keyword">extends</span> <span class="token class-name">PizzaRecipe</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addIngredients</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pizza<span class="token punctuation">.</span><span class="token function">setIngredients</span><span class="token punctuation">(</span><span class="token string">"榴莲"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addAccessories</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pizza<span class="token punctuation">.</span><span class="token function">setAccessories</span><span class="token punctuation">(</span><span class="token string">"不放"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addFruit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pizza<span class="token punctuation">.</span><span class="token function">setFruit</span><span class="token punctuation">(</span><span class="token string">"菠萝"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addCheese</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pizza<span class="token punctuation">.</span><span class="token function">setCheese</span><span class="token punctuation">(</span><span class="token string">"添加芝士"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Pizza</span> <span class="token function">buildPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> pizza<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="披萨店" tabindex="-1"><a class="header-anchor" href="#披萨店"><span>披萨店</span></a></h3>
<p>披萨店就很简单了，就是拿到对应的流程，照着了流程来做披萨就行了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * @Description 披萨店
 * @Author T
 * @Date 2024/5/12 16:37
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Pizzeria</span> <span class="token punctuation">{</span>

      <span class="token keyword">private</span> <span class="token class-name">PizzaRecipe</span> recipe<span class="token punctuation">;</span>

      <span class="token keyword">public</span> <span class="token class-name">Pizzeria</span><span class="token punctuation">(</span><span class="token class-name">PizzaRecipe</span> recipe<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>recipe <span class="token operator">=</span> recipe<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>


      <span class="token keyword">public</span> <span class="token class-name">Pizza</span> <span class="token function">orderPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
          recipe<span class="token punctuation">.</span><span class="token function">addIngredients</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          recipe<span class="token punctuation">.</span><span class="token function">addCheese</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          recipe<span class="token punctuation">.</span><span class="token function">addAccessories</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          recipe<span class="token punctuation">.</span><span class="token function">addFruit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> recipe<span class="token punctuation">.</span><span class="token function">buildPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试"><span>测试</span></a></h3>
<p>接下来，就是测试类，其实就是我到披萨店，让披萨店给我上一份榴莲披萨的过程</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 跟披萨店说 来一份榴莲披萨</span>
        <span class="token class-name">Pizzeria</span> pizzeria <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Pizzeria</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DurianPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 披萨店制作榴莲披萨</span>
        <span class="token class-name">Pizza</span> pizza <span class="token operator">=</span> pizzeria<span class="token punctuation">.</span><span class="token function">makePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 得到一份披萨</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>pizza<span class="token punctuation">.</span><span class="token function">getIngredients</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>pizza<span class="token punctuation">.</span><span class="token function">getFruit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>pizza<span class="token punctuation">.</span><span class="token function">getAccessories</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>榴莲
菠萝
不放

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此，建造者模式就OK了</p>
<h2 id="建造者模式的优缺点" tabindex="-1"><a class="header-anchor" href="#建造者模式的优缺点"><span>建造者模式的优缺点</span></a></h2>
<h3 id="优点" tabindex="-1"><a class="header-anchor" href="#优点"><span>优点</span></a></h3>
<ol>
<li>将产品本身和产品的创建过程进行了解藕，刚刚使用的过程中也能够感受到，对于我们使用而言，我们只需告诉披萨店，我们需要什么就行了，后面的只需执行makePizza方法就能得到披萨了。</li>
<li>很容易进行拓展，想想，如果我们想要再有一个别的披萨，是不是只需要创建一个新的类继承PizzaRecipe就行了呢？</li>
<li>对于复杂对象来说，也许他的构建过程是复杂的，但是我们一经过建造者模式来优化之后，很明显的是，代码的结构特征明显多了，如果哪里出现错误，我们的定位也是相当快的。</li>
</ol>
<h3 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点"><span>缺点</span></a></h3>
<p>虽然拓展很简单，比如我要一个培根披萨，那我只需要创建一个培根披萨类继承PizzaRecipe就行，但是培根披萨和榴莲披萨结构其实是相似的，流程也相似，这样代码会冗余，而且代码结构也复杂了。</p>
<h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h2>
<p>建造者模式的使用场景还是非常丰富的</p>
<p>比如说对对象的链式赋值，比如说以下代码为我们在Web开发时经常使用的统一返回结果</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@ToString</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">R</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> data<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> code<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> msg<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">R</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> data<span class="token punctuation">,</span> <span class="token class-name">String</span> code<span class="token punctuation">,</span> <span class="token class-name">String</span> msg<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>code <span class="token operator">=</span> code<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> msg<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">R</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">R</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        data <span class="token operator">=</span> builder<span class="token punctuation">.</span>datas<span class="token punctuation">;</span>
        code <span class="token operator">=</span> builder<span class="token punctuation">.</span>code<span class="token punctuation">;</span>
        msg <span class="token operator">=</span> builder<span class="token punctuation">.</span>msg<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> datas  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">String</span> code<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">String</span> msg<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">data</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token class-name">Object</span> data<span class="token punctuation">)</span><span class="token punctuation">{</span>
            datas<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">code</span><span class="token punctuation">(</span><span class="token class-name">String</span> code<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>code <span class="token operator">=</span> code<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">msg</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> msg<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">R</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">R</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那我们在构建的时候看起来就比较优雅了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">R</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">R<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span><span class="token string">"zhangsan"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span><span class="token string">"18"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">code</span><span class="token punctuation">(</span><span class="token string">"200"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">msg</span><span class="token punctuation">(</span><span class="token string">"success"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token class-name">R</span><span class="token punctuation">(</span>data<span class="token operator">=</span><span class="token punctuation">{</span>name<span class="token operator">=</span>zhangsan<span class="token punctuation">,</span> age<span class="token operator">=</span><span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">,</span> code<span class="token operator">=</span><span class="token number">200</span><span class="token punctuation">,</span> msg<span class="token operator">=</span>success<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Lombok中的Builder 也正是将这个原理的。</p>
<p>这种方式对于一些需要构建一些复杂对象是很友好的， 比如说有时候我们需要传入很多很多的构造参数，这样既不好看，而且也很不清晰，比如说下面的这个对象</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> cpu<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> ram<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> screen<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> camera<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> battery<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这么多参数，我们构建的时候就需要这样来创建对象，首先对于代码阅读来说就存在一定困难，而且也容易出错</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token class-name">Phone</span> phone <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">,</span><span class="token string">"2"</span><span class="token punctuation">,</span><span class="token string">"3"</span><span class="token punctuation">,</span><span class="token string">"4"</span><span class="token punctuation">,</span><span class="token string">"5"</span><span class="token punctuation">,</span><span class="token string">"6"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


