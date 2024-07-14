<template><div><h1 id="堆" tabindex="-1"><a class="header-anchor" href="#堆"><span>堆</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#%E5%A4%A7%E6%A0%B9%E5%A0%86%E4%B8%8E%E5%B0%8F%E6%A0%B9%E5%A0%86">大根堆与小根堆</a>
<ul>
<li><a href="#%E4%BB%A3%E7%A0%81%E5%AE%9E%E7%8E%B0">代码实现</a></li>
<li><a href="#%E5%AE%8C%E6%95%B4%E4%BB%A3%E7%A0%81">完整代码</a></li>
</ul>
</li>
<li><a href="#%E5%A0%86%E6%8E%92%E5%BA%8F">堆排序</a>
<ul>
<li><a href="#%E5%AE%8C%E6%95%B4%E4%BB%A3%E7%A0%81">完整代码</a></li>
</ul>
</li>
<li><a href="#Java%E6%8F%90%E4%BE%9B%E7%9A%84%E5%A0%86">Java提供的堆</a>
<ul>
<li><a href="#%E5%8A%A8%E6%89%8B%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A0%86">动手实现自己的堆</a>
<ul>
<li><a href="#%E6%80%9D%E8%B7%AF%E5%88%86%E6%9E%90">思路分析</a></li>
<li><a href="#%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0">具体实现</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<p>虽然树的结构是复杂的，但是我们通常会使用数组来表示一颗树，即树的各个节点的位置可以使用不同的下标表示。</p>
<h2 id="大根堆与小根堆" tabindex="-1"><a class="header-anchor" href="#大根堆与小根堆"><span>大根堆与小根堆</span></a></h2>
<p>通常情况下：</p>
<p>对于数组中某一个下标为i的元素，都有</p>
<ol>
<li>左孩子节点：2*i + 1</li>
<li>右孩子节点：2*i + 2</li>
<li>父节点：（i-1）/2</li>
</ol>
<p>而堆本身就是一颗二叉树，他又被分为小根堆和大根堆</p>
<p>大根堆就是对于每棵子树来说都要满足头节点比其子节点要大</p>
<p>小根堆则反过来，要求每颗子树都要满足头节点比其子节点要小</p>
<figure><img src="@source/backend/algorithm/image/image_jdVYHOylGW.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>那么，如何制造这样的一个根堆呢？以大根堆为例，其实我们每次插入一个数据的时候，都会往这颗树的后面插入一个节点，那么每次插入一个节点的时候，我们都要</p>
<ol>
<li>比较自己与父节点的大小关系
<ol>
<li>如果比父节点大，与父节点交换位置</li>
<li>如果比父节点小或者相等，可以不动</li>
</ol>
</li>
</ol>
<figure><img src="@source/backend/algorithm/image/image_zYdJd4Wy9c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现"><span>代码实现</span></a></h3>
<p>首先对于堆来说，我需要准备这3个属性</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>       <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyMaxHeap</span> <span class="token punctuation">{</span>
        <span class="token comment">//堆数组</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> heap<span class="token punctuation">;</span>
        <span class="token comment">//目前插入数据位置</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> heapSize<span class="token punctuation">;</span>
        <span class="token comment">//堆大小限制</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> limit<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">MyMaxHeap</span><span class="token punctuation">(</span><span class="token keyword">int</span> limit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>heap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>limit<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>heapSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>limit <span class="token operator">=</span> limit<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于push 数组会有以下方法</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//越界情况</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>heapSize <span class="token operator">==</span> limit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"heap is full!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            heap<span class="token punctuation">[</span>heapSize<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token comment">//调整大根堆</span>
            <span class="token function">heapInsert</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> heapSize<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么一起来看看核心代码，看看大根堆是如何进行调整的</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code> <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">heapInsert</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> heap<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//获取父节点下标</span>
            <span class="token keyword">int</span> parent <span class="token operator">=</span> <span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token comment">//与父节点的值进行对比，直到两者相等或者比父节点小才停止循环</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>heap<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">></span> heap<span class="token punctuation">[</span>parent<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//交换自己与父节点的位置</span>
                <span class="token function">swap</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> index<span class="token punctuation">,</span> parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
                index <span class="token operator">=</span> parent<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        
        
  <span class="token comment">//交换位置</span>
 <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> temp <span class="token operator">=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> array<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            array<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大根堆处于最顶的节点显然一定是最大值，所以如果我们要求需要弹出最大值，而且还需要保持大根堆的结构，我们又该怎么做呢？这段代码就是在弹出最顶元素时</p>
<ol>
<li>需要将最后一个元素跟最顶元素做位置交换，这样做的目的是保持其他子大根堆结构不发生改变</li>
<li>由于此时最顶元素是最父节点，所以会做这么两个操作，使得能够重新调整为大根堆
<ol>
<li>先从左右子节点中找到最大值，然后跟第1步交换后的节点进行比较，如果左右节点存在比他大的，就交换位置</li>
<li>以此循环到不再存在子节点或者其左右子节点都比其小停止，由于原来的子大跟堆不会发生改变，只要存在左右子节点都比其小的情况，后面的子节点就不需要看了</li>
</ol>
</li>
</ol>
<figure><img src="@source/backend/algorithm/image/image_JygUj063gi.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>       <span class="token doc-comment comment">/**
         * @Description 弹出最父节点
         * @Author T
         * @Date 2024/6/9 16:05
         **/</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> ans <span class="token operator">=</span> heap<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">//先交换最父节点和最后一个节点的位置，相当于不要最后一个节点了</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">--</span>heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//重新调整为大根堆</span>
            <span class="token function">heapify</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * @Description 重新调整大根堆
         * @Author T
         * @Date 2024/6/9 16:04
         **/</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">heapify</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> heap<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> heapSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//先获取此时最父节点的左子节点下标</span>
            <span class="token keyword">int</span> left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> heapSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//判断是否有右节点,右节点比左节点大</span>
                <span class="token keyword">int</span> largest <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">></span> heapSize <span class="token operator">&amp;&amp;</span> heap<span class="token punctuation">[</span>left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">></span> heap<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">?</span> left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> left<span class="token punctuation">;</span>
                <span class="token comment">//最大的这个值与index比较</span>
                largest <span class="token operator">=</span> heap<span class="token punctuation">[</span>largest<span class="token punctuation">]</span> <span class="token operator">></span> heap<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">?</span> largest <span class="token operator">:</span> index<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>largest <span class="token operator">==</span> index<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token function">swap</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> largest<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
                index <span class="token operator">=</span> largest<span class="token punctuation">;</span>
                left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码"><span>完整代码</span></a></h3>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Heap</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyMaxHeap</span> <span class="token punctuation">{</span>
        <span class="token comment">//堆数组</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> heap<span class="token punctuation">;</span>
        <span class="token comment">//目前插入数据位置</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> heapSize<span class="token punctuation">;</span>
        <span class="token comment">//堆大小限制</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> limit<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">MyMaxHeap</span><span class="token punctuation">(</span><span class="token keyword">int</span> limit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>heap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>limit<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>heapSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>limit <span class="token operator">=</span> limit<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//越界情况</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>heapSize <span class="token operator">==</span> limit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"heap is full!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            heap<span class="token punctuation">[</span>heapSize<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token comment">//调整成大根堆</span>
            <span class="token function">heapInsert</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> heapSize<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * @Description 弹出最父节点
         * @Author T
         * @Date 2024/6/9 16:05
         **/</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> ans <span class="token operator">=</span> heap<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">//先交换最父节点和最后一个节点的位置，相当于不要最后一个节点了</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">--</span>heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//重新调整为大根堆</span>
            <span class="token function">heapify</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * @Description 重新调整大根堆
         * @Author T
         * @Date 2024/6/9 16:04
         **/</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">heapify</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> heap<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> heapSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//先获取此时最父节点的左子节点下标</span>
            <span class="token keyword">int</span> left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> heapSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//判断是否有右节点,右节点比左节点大</span>
                <span class="token keyword">int</span> largest <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">></span> heapSize <span class="token operator">&amp;&amp;</span> heap<span class="token punctuation">[</span>left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">></span> heap<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">?</span> left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> left<span class="token punctuation">;</span>
                <span class="token comment">//最大的这个值与index比较</span>
                largest <span class="token operator">=</span> heap<span class="token punctuation">[</span>largest<span class="token punctuation">]</span> <span class="token operator">></span> heap<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">?</span> largest <span class="token operator">:</span> index<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>largest <span class="token operator">==</span> index<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token function">swap</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> largest<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
                index <span class="token operator">=</span> largest<span class="token punctuation">;</span>
                left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">heapInsert</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> heap<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//获取父节点下标</span>
            <span class="token keyword">int</span> parent <span class="token operator">=</span> <span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token comment">//与父节点的值进行对比，直到两者相等或者比父节点小才停止循环</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>heap<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">></span> heap<span class="token punctuation">[</span>parent<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//交换自己与父节点的位置</span>
                <span class="token function">swap</span><span class="token punctuation">(</span>heap<span class="token punctuation">,</span> index<span class="token punctuation">,</span> parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
                index <span class="token operator">=</span> parent<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> temp <span class="token operator">=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> array<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            array<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="堆排序" tabindex="-1"><a class="header-anchor" href="#堆排序"><span>堆排序</span></a></h2>
<p>不管是大根堆还是小根堆目的都在于找到最值，而且人家找最值的效率还是非常高的，对于排序算法来说，其实本质就是通过不断地找最值，最后将最值组合而成一个有序的数组。</p>
<p>所以找最值的效率越高，证明这个排序算法的效率越高，而看看堆排序，其实就是将一个无序数组，通过不断地找大根堆或者小根堆来将最值找出来并进行排列，这个流程可以参考以上代码，很显然，通过大根堆的算法，我们完全可以看出来，第一，不需要遍历整个树去调整 ，第二，不需要额外的空间，所以堆排序的单次调整大根堆是LogN级别的，一共要做N次，所以总的时间复杂度应是NLogN级别</p>
<p>而且，堆排序的整个流程并不涉及递归，不需要消耗额外的空间，所以空间复杂度是确定的，是O（1）级别的</p>
<h3 id="完整代码-1" tabindex="-1"><a class="header-anchor" href="#完整代码-1"><span>完整代码</span></a></h3>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HeapSort</span> <span class="token punctuation">{</span>
    <span class="token comment">// 堆排序额外空间复杂度O(1)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">heapSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//从最后一个元素进行判断是否需要根堆调整</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">heapify</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> j<span class="token punctuation">,</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">int</span> size <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>size <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">heapify</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">--</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">heapify</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> largest <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> size <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">></span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">?</span> left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> left<span class="token punctuation">;</span>
            largest <span class="token operator">=</span> arr<span class="token punctuation">[</span>largest<span class="token punctuation">]</span> <span class="token operator">></span> arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">?</span> largest <span class="token operator">:</span> left<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>largest <span class="token operator">==</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> largest<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            index <span class="token operator">=</span> largest<span class="token punctuation">;</span>
            left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> array<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> temp <span class="token operator">=</span> array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        array<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> array<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
        array<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="java提供的堆" tabindex="-1"><a class="header-anchor" href="#java提供的堆"><span>Java提供的堆</span></a></h2>
<p>当然Java中是有提供这样的数据结构的，叫PriorityQueue</p>
<p>默认他是小根堆,测试代码如下</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> priorityQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>priorityQueue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>priorityQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java提供的堆很方便，但是有弊端，如果我们给PriorityQueue传入复杂对象，并告诉其应该如何排序，一开始确实他会根据小根堆的方式给我们进行排序，但是后续他并不支持我们进行修改，如果我们强行修改，那么再次进行的排序不一定符合小根堆的情况。具体可参考以下代码：</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>  <span class="token comment">//比较器</span>
  <span class="token keyword">class</span> <span class="token class-name">MyComp</span> <span class="token keyword">implements</span> <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Stu</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">Stu</span> o1<span class="token punctuation">,</span> <span class="token class-name">Stu</span> o2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> o1<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> o2<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我将元素放到堆中后，再修改值，堆会发生重排，这就出事了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Stu</span><span class="token punctuation">></span></span> priorityQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyComp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Stu</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stu</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"A"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Stu</span> stu2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stu</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">"B"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Stu</span> stu3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stu</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">"C"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span><span class="token punctuation">;</span>
        priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>stu2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        priorityQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>stu3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//改动stu3 Id</span>
        stu3<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>priorityQueue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>priorityQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>结果：
<span class="token function">Stu</span><span class="token punctuation">(</span>id<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token constant">A</span><span class="token punctuation">)</span>
<span class="token function">Stu</span><span class="token punctuation">(</span>id<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token constant">C</span><span class="token punctuation">)</span>
<span class="token function">Stu</span><span class="token punctuation">(</span>id<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token constant">B</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显然重排的结果是错误的，原因就在于虽然改了某个元素，但是改的元素的位置其实PriorityQueue是无法得知的，而且PriorityQueue也没有用什么东西对其进行记录，所以PriorityQueue是无法实现中途修改元素的情况的，但是这种场景其实是十分常见的。所以，这就需要自己动手实现这么一个数据结构了。</p>
<h3 id="动手实现自己的堆" tabindex="-1"><a class="header-anchor" href="#动手实现自己的堆"><span>动手实现自己的堆</span></a></h3>
<h4 id="思路分析" tabindex="-1"><a class="header-anchor" href="#思路分析"><span>思路分析</span></a></h4>
<p>思路其实就是</p>
<ol>
<li>既然PriorityQueue无法得知修改后的元素的位置，那我们就要提供一个数据结构来记录各个元素的位置不就行了嘛，那我们首选的肯定是hashmap的</li>
<li>既然得知了修改元素的所在位置，那该元素一旦被修改，是不是就可以通过子节点的计算和父节点的计算来比较大小，从而决定到底应该向上爬还是向下走呢？</li>
</ol>
<h4 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现"><span>具体实现</span></a></h4>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HeapGreater</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> heap<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> indexMap<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">int</span> heapSize<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">></span></span> comp<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token class-name">HeapGreater</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    heap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    indexMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    heapSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    comp <span class="token operator">=</span> c<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> heapSize <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> heapSize<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">contains</span><span class="token punctuation">(</span><span class="token class-name">T</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> indexMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token class-name">T</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    heap<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    indexMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">heapInsert</span><span class="token punctuation">(</span>heapSize<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">T</span> ans <span class="token operator">=</span> heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">swap</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> heapSize <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    indexMap<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>ans<span class="token punctuation">)</span><span class="token punctuation">;</span>
    heap<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token operator">--</span>heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">heapify</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">T</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">T</span> replace <span class="token operator">=</span> heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>heapSize <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> index <span class="token operator">=</span> indexMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    indexMap<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    heap<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token operator">--</span>heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token operator">!=</span> replace<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      heap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> replace<span class="token punctuation">)</span><span class="token punctuation">;</span>
      indexMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>replace<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">resign</span><span class="token punctuation">(</span>replace<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">resign</span><span class="token punctuation">(</span><span class="token class-name">T</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">heapInsert</span><span class="token punctuation">(</span>indexMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">heapify</span><span class="token punctuation">(</span>indexMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 请返回堆上的所有元素</span>
  <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">getAllElements</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> ans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">T</span> c <span class="token operator">:</span> heap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ans<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">heapInsert</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>comp<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">,</span> heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">swap</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      index <span class="token operator">=</span> <span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">heapify</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> heapSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">int</span> best <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> heapSize <span class="token operator">&amp;&amp;</span> comp<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">:</span> left<span class="token punctuation">;</span>
      best <span class="token operator">=</span> comp<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>best<span class="token punctuation">)</span><span class="token punctuation">,</span> heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">?</span> best <span class="token operator">:</span> index<span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>best <span class="token operator">==</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token function">swap</span><span class="token punctuation">(</span>best<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
      index <span class="token operator">=</span> best<span class="token punctuation">;</span>
      left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">T</span> o1 <span class="token operator">=</span> heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">T</span> o2 <span class="token operator">=</span> heap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    heap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> o2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    heap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> o1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    indexMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>o2<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    indexMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>o1<span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


