<template><div><h1 id="重学vue3" tabindex="-1"><a class="header-anchor" href="#重学vue3"><span>重学Vue3</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#Vue3-%E7%9A%84%E6%BA%90%E7%A0%81%E7%BB%93%E6%9E%84">Vue3 的源码结构</a>
<ul>
<li><a href="#Vue%E7%9A%84%E6%BA%90%E7%A0%81%E4%B8%8B%E8%BD%BD">Vue的源码下载</a></li>
<li><a href="#Vue%E6%BA%90%E7%A0%81%E6%90%AD%E5%BB%BA">Vue源码搭建</a>
<ul>
<li><a href="#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84">目录结构</a></li>
<li><a href="#%E8%BF%90%E8%A1%8C%E6%BA%90%E4%BB%A3%E7%A0%81">运行源代码</a></li>
</ul>
</li>
<li><a href="#%E6%89%A7%E8%A1%8C%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%B5%8B%E8%AF%95%E5%AE%9E%E4%BE%8B">执行第一个测试实例</a>
<ul>
<li><a href="#debug">debug</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#%E5%8A%A8%E6%89%8B%E6%9E%84%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84Vue%E6%A1%86%E6%9E%B6">动手构建自己的Vue框架</a>
<ul>
<li><a href="#%E5%B0%9D%E8%AF%95%E8%B7%9F%E7%9D%80Vue%E6%9D%A5%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E5%8C%85%E7%BB%93%E6%9E%84">尝试跟着Vue来搭建自己的包结构</a></li>
<li><a href="#%E5%AE%89%E8%A3%85%E6%89%93%E5%8C%85%E5%99%A8-rollup">安装打包器 rollup</a>
<ul>
<li><a href="#%E5%AE%89%E8%A3%85">安装</a></li>
<li><a href="#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6">安装插件</a></li>
<li><a href="#%E5%88%9B%E5%BB%BArollup%E9%85%8D%E7%BD%AE">创建rollup配置</a></li>
<li><a href="#%E6%B5%8B%E8%AF%95">测试</a></li>
</ul>
</li>
<li><a href="#%E9%85%8D%E7%BD%AE%E8%B7%AF%E5%BE%84%E6%98%A0%E5%B0%84">配置路径映射</a></li>
</ul>
</li>
<li><a href="#%E5%93%8D%E5%BA%94%E7%B3%BB%E7%BB%9F">响应系统</a>
<ul>
<li><a href="#js%E7%9A%84%E7%A8%8B%E5%BA%8F%E6%80%A7">js的程序性</a></li>
<li><a href="#%E4%BB%A4%E7%A8%8B%E5%BA%8F%E6%9B%B4%E5%8A%A0%E8%81%AA%E6%98%8E">令程序更加聪明</a></li>
<li><a href="#vue2-%E5%93%8D%E5%BA%94%E5%BC%8F%E9%87%87%E7%94%A8ObjectdefineProperty%E5%9C%A8%E8%AE%BE%E8%AE%A1%E4%B8%8A%E7%9A%84%E7%BC%BA%E9%99%B7">vue2 响应式采用Object.defineProperty在设计上的缺陷</a></li>
<li><a href="#vue3%E7%9A%84%E6%94%B9%E8%BF%9B%E6%96%B9%E6%A1%88">vue3的改进方案</a>
<ul>
<li><a href="#proxy%E7%9A%84%E4%BD%BF%E7%94%A8">proxy的使用</a></li>
<li><a href="#Reflect">Reflect</a></li>
</ul>
</li>
<li><a href="#%E5%88%9D%E5%85%A5reactivity%E6%A8%A1%E5%9D%97">初入reactivity模块</a>
<ul>
<li><a href="#%E9%98%85%E8%AF%BB%E6%BA%90%E7%A0%81">阅读源码</a></li>
<li><a href="#%E5%88%9D%E5%88%9Breactivity%E6%A8%A1%E5%9D%97">初创reactivity模块</a>
<ul>
<li><a href="#reactivity%E7%9A%84%E5%B0%81%E8%A3%85">reactivity的封装</a></li>
<li><a href="#effect%E7%9A%84%E5%B0%81%E8%A3%85">effect的封装</a></li>
<li><a href="#%E5%88%9D%E6%AC%A1%E8%AE%A1%E7%AE%97%E6%B5%8B%E8%AF%95">初次计算测试</a></li>
</ul>
</li>
<li><a href="#%E8%A7%A6%E5%8F%91%E8%AE%A1%E7%AE%97effect%E5%AE%9E%E7%8E%B0">触发计算effect实现</a>
<ul>
<li><a href="#%E6%B5%8B%E8%AF%95">测试</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#%E5%8D%87%E7%BA%A7%E5%93%8D%E5%BA%94%E5%BC%8F%E6%A8%A1%E5%9D%97%E4%BB%A3%E7%A0%81">升级响应式模块代码</a>
<ul>
<li><a href="#%E6%B5%8B%E8%AF%95">测试</a></li>
<li><a href="#reactivity%E7%9A%84%E5%BC%8A%E7%AB%AF">reactivity的弊端</a></li>
</ul>
</li>
<li><a href="#Ref%E7%9A%84%E7%A9%BA%E9%99%8D">Ref的空降</a>
<ul>
<li><a href="#%E6%B5%8B%E8%AF%95%E4%BB%A3%E7%A0%81">测试代码</a></li>
</ul>
</li>
<li><a href="#Computed">Computed</a>
<ul>
<li><a href="#Computed-%E6%96%B9%E6%B3%95">Computed 方法</a></li>
<li><a href="#ComputedRefImpl-%E7%B1%BB%E5%AE%9E%E7%8E%B0">ComputedRefImpl 类实现</a></li>
</ul>
</li>
<li><a href="#Watch">Watch</a>
<ul>
<li><a href="#%E4%BD%BF%E7%94%A8">使用</a></li>
<li><a href="#Scheduler%E8%A7%A3%E6%9E%90">Scheduler解析</a></li>
<li><a href="#Secheduler%E4%B8%AD%E7%9A%84%E6%87%92%E5%8A%A0%E8%BD%BD">Secheduler中的懒加载</a></li>
<li><a href="#Scheduler-%E6%8E%A7%E5%88%B6%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E7%9A%84%E6%A0%B8%E5%BF%83-queuePreFlushCb">Scheduler 控制执行顺序的核心 queuePreFlushCb</a></li>
<li><a href="#Watch%E7%9B%91%E5%90%AC%E5%99%A8">Watch监听器</a>
<ul>
<li><a href="#1-%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E5%B1%9E%E6%80%A7Reactive%E7%B1%BB%E5%9E%8B">1. 判断是否属性Reactive类型</a></li>
</ul>
</li>
<li><a href="#2-%E5%AE%9E%E7%8E%B0watch-%E8%A7%A6%E5%8F%91%E5%87%BD%E6%95%B0">2. 实现watch 触发函数</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#-Vue%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E6%B8%B2%E6%9F%93"> Vue的运行时渲染</a>
<ul>
<li><a href="#VNode">VNode</a></li>
<li><a href="#%E6%8C%82%E8%BD%BD">挂载</a></li>
<li><a href="#%E6%9B%B4%E6%96%B0">更新</a></li>
</ul>
</li>
</ul>
<h2 id="vue3-的源码结构" tabindex="-1"><a class="header-anchor" href="#vue3-的源码结构"><span>Vue3 的源码结构</span></a></h2>
<h3 id="vue的源码下载" tabindex="-1"><a class="header-anchor" href="#vue的源码下载"><span>Vue的源码下载</span></a></h3>
<p><a href="https://github.com/vuejs/core" title="https://github.com/vuejs/core" target="_blank" rel="noopener noreferrer">https://github.com/vuejs/core<ExternalLinkIcon/></a></p>
<p>到github上，fork或者clone 项目下来即可</p>
<h3 id="vue源码搭建" tabindex="-1"><a class="header-anchor" href="#vue源码搭建"><span>Vue源码搭建</span></a></h3>
<h4 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构"><span>目录结构</span></a></h4>
<p>vue的核心内容都是聚合在packages下</p>
<p>以compiler-开头的是与编译时相关的</p>
<p>以reactivity-开头的是与响应式相关的</p>
<p>以runtime-开头的是与运行时相关的</p>
<p>vue 里的是含有所有的测试实例</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>├── packages
│   ├── compiler-core          // 编译器核心，独立于平台
│   ├── compiler-dom           // 针对浏览器的 DOM 模板编译器
│   ├── compiler-sfc           // 单文件组件(.vue)编译器的实现
│   ├── compiler-ssr           // 服务端渲染编译器的实现
│   ├── dts-test               // TypeScript 类型声明测试
│   ├── global.d.ts            // 全局 TypeScript 类型声明文件
│   ├── reactivity             // 响应式系统的实现
│   ├── reactivity-transform   // 实验性代码，会在 3.4 中从 Vue 核心中删除
│   ├── runtime-core           // 运行时核心实例相关代码
│   ├── runtime-dom            // 针对浏览器的运行时实现
│   ├── runtime-test           // 运行时测试相关代码
│   ├── server-renderer        // 服务端渲染的实现
│   ├── sfc-playground         // 单文件组件在线调试器
│   ├── shared                 // package 之间共享的工具库
│   ├── template-explorer      // 模板代码在线编译器
│   ├── vue                    // vue编译后dist产物，不同场景的引入文件
│   └── vue-compat             // 兼容旧版 API 的代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行源代码" tabindex="-1"><a class="header-anchor" href="#运行源代码"><span>运行源代码</span></a></h4>
<p>首先需要安装pnpm，因为vue源码是基于pnpm进行包管理的</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-g</span> <span class="token function">pnpm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成之后就可以安装依赖了</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> i 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>依赖安装完成之后就可以进行打包操作了</p>
<p>因为我们是需要运行源代码，所以需要先把代码进行编译，编译完以后才能使用</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完成打包之后我们就可以在vue文件夹里找到dist文件夹，里面就是vue打包好的产物</p>
<p>然后我们就可以尝试使用并debug了</p>
<h3 id="执行第一个测试实例" tabindex="-1"><a class="header-anchor" href="#执行第一个测试实例"><span>执行第一个测试实例</span></a></h3>
<p>执行下面测试实例</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>../dist/vue.global.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">

    <span class="token keyword">const</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> effect <span class="token punctuation">}</span> <span class="token operator">=</span> Vue

    <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'zs'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> name<span class="token punctuation">.</span>name
    <span class="token punctuation">}</span><span class="token punctuation">)</span>


    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> name<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'ls'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于服务运行html文件</p>
<p>下载插件 Live Server，Live Server 是可以令动态或静态文件基于服务器访问的</p>
<p>下载完成以后就可以在右键菜单栏处看到基于Live Server运行了</p>
<figure><img src="@source/frontend/image/image_C0P_TQjQps.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>点击运行后，我们可以从服务器指定端口获取资源，就证明运行成功了</p>
<figure><img src="@source/frontend/image/image_YYxGh9ENIw.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>接下来我们就可以尝试做debug处理了</p>
<h4 id="debug" tabindex="-1"><a class="header-anchor" href="#debug"><span>debug</span></a></h4>
<p>浏览器是个debug的好工具，但是浏览器中的源码只有build后的代码，想要看到构建前的代码，我们需要开启vue的sourceMap，很简单，就是到package.json 处为构建代码添加-s属性即可</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"node scripts/build.js -s"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重新构建，我们就能发现文件多了.map</p>
<figure><img src="@source/frontend/image/image_-YY_Dx4oJr.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>打开浏览器的调试工具，到sources栏下， 就能看到vue的所有相关源码了</p>
<figure><img src="@source/frontend/image/image_wfQUt5CfjM.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>打上断点，刷新就能进行debug模式啦</p>
<figure><img src="@source/frontend/image/image_XEsZOLIEwv.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="动手构建自己的vue框架" tabindex="-1"><a class="header-anchor" href="#动手构建自己的vue框架"><span>动手构建自己的Vue框架</span></a></h2>
<p>模仿也是学习的一种方法，能够在自己尝试构建Vue框架的过程中带着问题去探索源码，我觉得这样子学源码既不枯燥还能帮助自己更加好地理解脉络</p>
<h3 id="尝试跟着vue来搭建自己的包结构" tabindex="-1"><a class="header-anchor" href="#尝试跟着vue来搭建自己的包结构"><span>尝试跟着Vue来搭建自己的包结构</span></a></h3>
<p>首先创建一个Vue-next-mini的新项目</p>
<p>构建package.json</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>构建TS环境</p>
<p>安装TS依赖</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> typescirpt@4.7.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>生成默认配置</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>tsc <span class="token parameter variable">-init</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装打包器-rollup" tabindex="-1"><a class="header-anchor" href="#安装打包器-rollup"><span>安装打包器 rollup</span></a></h3>
<p>rollup是一个模块打包器，比较适合用于打包<strong>库</strong>，webpack比较适合用于大型项目的打包</p>
<p><a href="https://www.rollupjs.com/#installation" title="https://www.rollupjs.com/#installation" target="_blank" rel="noopener noreferrer">https://www.rollupjs.com/#installation<ExternalLinkIcon/></a></p>
<h4 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--global</span> rollup

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="安装插件" tabindex="-1"><a class="header-anchor" href="#安装插件"><span>安装插件</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-D</span> @rollup/plugin-commonjs@22.0.1  @rollup/plugin-node-resolve@13.3.0  @rollup/plugin-typescript@8.3.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="创建rollup配置" tabindex="-1"><a class="header-anchor" href="#创建rollup配置"><span>创建rollup配置</span></a></h4>
<p>在根目录下创建rollup.config.js</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> resolve <span class="token keyword">from</span> <span class="token string">'@rollup/plugin-node-resolve'</span>
<span class="token keyword">import</span> commonjs <span class="token keyword">from</span> <span class="token string">'@rollup/plugin-commonjs'</span>
<span class="token keyword">import</span> typescript <span class="token keyword">from</span> <span class="token string">'@rollup/plugin-typescript'</span>


<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//入口文件</span>
        <span class="token literal-property property">input</span><span class="token operator">:</span> <span class="token string">'packages/vue/src/index.ts'</span><span class="token punctuation">,</span>
        <span class="token comment">//打包路径</span>
        <span class="token literal-property property">output</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token comment">//导出iife模式的js文件</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//开启sourceMap</span>
                <span class="token literal-property property">sourceMap</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token comment">//导出文件名</span>
                <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">'packages/vue/dist/vue.js'</span><span class="token punctuation">,</span>
                <span class="token comment">//导出文件格式</span>
                <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">'iife'</span><span class="token punctuation">,</span>
                <span class="token comment">//导出文件全局变量名</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Vue'</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">//插件</span>
        <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token function">typescript</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">sourceMap</span><span class="token operator">:</span><span class="token boolean">true</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token function">commonjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="测试" tabindex="-1"><a class="header-anchor" href="#测试"><span>测试</span></a></h4>
<p>入口文件是'packages/vue/src/index.ts'，所以我们需要创建出来这个文件</p>
<p>随便输入点打印语句</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们要到package.json处输入build脚本</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code>  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"rollup -c"</span><span class="token punctuation">,</span>
    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是typescript开发的要安装插件</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code> <span class="token function">npm</span> i --save-dev tslib@2.4.0 typescript@4.7.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后就可以尝试build一下了</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>出现dist包就没有问题了</p>
<figure><img src="@source/frontend/image/image_KDnZAFCfhb.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="配置路径映射" tabindex="-1"><a class="header-anchor" href="#配置路径映射"><span>配置路径映射</span></a></h3>
<p>我们经常配置路径都需要去配置相对路径，即相对本文件的哪一层哪一层目录</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isArray <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../../shared/index.ts"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样的路径可观性不强不说，而且两个文件相差的层级较深的时候，就出现../../../../这样的情况</p>
<p>而我们现在需要配置的就是要基于某一层文件夹来做相对路径</p>
<p>比如说</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isArray <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@/utils/utils"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>就是指src目录下的utils包的utils类</p>
<p>怎么做到如上配置呢，我们就需要用到TS提供的特性了</p>
<p>在TS配置文件下添加如下配置</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code>    <span class="token property">"baseUrl"</span><span class="token operator">:</span> <span class="token string">"."</span><span class="token punctuation">,</span>
    <span class="token property">"paths"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"@vue/*"</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token string">"packages/*/src"</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一段就是对定义的@vue的文件路径与packages/ */src做了个映射</p>
<p>接下来我们就可以替换成</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>isArray<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vue/shared'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有了这个路径映射我们就可以更好地对模块内容进行导入了</p>
<h2 id="响应系统" tabindex="-1"><a class="header-anchor" href="#响应系统"><span>响应系统</span></a></h2>
<h4 id="js的程序性" tabindex="-1"><a class="header-anchor" href="#js的程序性"><span>js的程序性</span></a></h4>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code> <span class="token keyword">let</span> product <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">price</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">quantity</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">let</span> total <span class="token operator">=</span> product<span class="token punctuation">.</span>price <span class="token operator">*</span> product<span class="token punctuation">.</span>quantity
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total price :"</span> <span class="token operator">+</span> total<span class="token punctuation">)</span><span class="token punctuation">;</span>
    product<span class="token punctuation">.</span>quantity <span class="token operator">=</span> <span class="token number">5</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total price :"</span> <span class="token operator">+</span> total<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看这段代码，两次的total结果是一样的，并不会因为quantity的修改而出发total的重新计算</p>
<p>代码按照编写的顺序执行，变量的值在计算后固定，除非被显式地重新赋值。这就是为什么两次输出的 total 都是 20，而不是第二次变为 50 的原因。如果想要在 quantity 改变后得到新的 total，需要重新执行计算并显式地更新 total 变量的值。</p>
<p>也就是说，程序没办法知道中间变量发生了改变，所以只能维持着原来的值，除非我们再执行一次</p>
<p>total = product.price * product.quantity</p>
<p>所以如何让js程序能够自己感知中间变量的改变，这就是响应式的目标了</p>
<h4 id="令程序更加聪明" tabindex="-1"><a class="header-anchor" href="#令程序更加聪明"><span>令程序更加聪明</span></a></h4>
<p>想要让程序能够感知到变化，刚刚也提了，只需再次让total计算一下就行了</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code> <span class="token keyword">let</span> product <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">price</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">quantity</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">let</span> total <span class="token operator">=</span> product<span class="token punctuation">.</span>price <span class="token operator">*</span> product<span class="token punctuation">.</span>quantity
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total price :"</span> <span class="token operator">+</span> total<span class="token punctuation">)</span><span class="token punctuation">;</span>
    product<span class="token punctuation">.</span>quantity <span class="token operator">=</span> <span class="token number">5</span>
<span class="token operator">+</span>     total <span class="token operator">=</span> product<span class="token punctuation">.</span>price <span class="token operator">*</span> product<span class="token punctuation">.</span>quantity
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total price :"</span> <span class="token operator">+</span> total<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然为了更好地进行管理我们可以将其抽出来成为一个方法</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>    <span class="token keyword">let</span> product <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">price</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">quantity</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>

 <span class="token operator">+</span>   <span class="token keyword">let</span> <span class="token function-variable function">effect</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
 <span class="token operator">+</span>       total <span class="token operator">=</span> product<span class="token punctuation">.</span>price <span class="token operator">*</span> product<span class="token punctuation">.</span>quantity
 <span class="token operator">+</span>    <span class="token punctuation">}</span>

 <span class="token operator">+</span>  <span class="token keyword">let</span> total <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 <span class="token operator">+</span>  <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total price :"</span> <span class="token operator">+</span> total<span class="token punctuation">)</span><span class="token punctuation">;</span>
    product<span class="token punctuation">.</span>quantity <span class="token operator">=</span> <span class="token number">5</span>
 <span class="token operator">+</span>  <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total price :"</span> <span class="token operator">+</span> total<span class="token punctuation">)</span><span class="token punctuation">;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过按这么看，程序貌似是变聪明了，不过我们是每次都要手动才能让他变聪明，就是踢其一脚他才走一步</p>
<p>这样子显然是不可以的</p>
<p>怎么能够让他能够自己感应值的变化而出发重新计算呢？</p>
<p>不妨我们来看看这段代码是如何处理值的</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>    <span class="token keyword">let</span> product <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">price</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">quantity</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> <span class="token function-variable function">effect</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        total <span class="token operator">=</span> product<span class="token punctuation">.</span>price <span class="token operator">*</span> product<span class="token punctuation">.</span>quantity
     <span class="token punctuation">}</span>

   <span class="token keyword">let</span> total <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
   <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//setter</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total price :"</span> <span class="token operator">+</span> total<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//getter</span>
    product<span class="token punctuation">.</span>quantity <span class="token operator">=</span> <span class="token number">5</span><span class="token comment">//setter</span>
   <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//setter</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total price :"</span> <span class="token operator">+</span> total<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//getter</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实仔细分析，我们以上的行为不过是setter 和 getter嘛</p>
<p>好了，其实了解到这里，我们大概是有点眉目了，其实只需要监听属性的getter 和 setter 行为不就好了嘛？</p>
<p>大概方向是有了，其实js是有提供这么个方法的→Object.defineProperty()</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Learn" title="https://developer.mozilla.org/zh-CN/docs/Learn" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Learn<ExternalLinkIcon/></a></p>
<p>当然这也是vue2采用的解决方案</p>
<p>好了，万事俱备，开始改造</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>    <span class="token keyword">let</span> quantity <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> product <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">price</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">quantity</span><span class="token operator">:</span> quantity
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> total <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> <span class="token function-variable function">effect</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        total <span class="token operator">=</span> product<span class="token punctuation">.</span>price <span class="token operator">*</span> product<span class="token punctuation">.</span>quantity
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total price :"</span> <span class="token operator">+</span> total<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>product<span class="token punctuation">,</span><span class="token string">'quantity'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
        <span class="token function">set</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span><span class="token punctuation">{</span>
            quantity <span class="token operator">=</span> newVal
            <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> quantity
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码其实就是通过监听product的quantity属性是否发生了改变，即是否触发了setter行为，如果触发了就重新进行计算，通过这样的方式确实让程序智能起来了</p>
<figure><img src="@source/frontend/image/image_dfro4I2hZ2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>vue2 也是采用了这种方式来感知属性的变化的，但是vue3却放弃了使用这种方式</p>
<p>这是为什么呢？</p>
<h4 id="vue2-响应式采用object-defineproperty在设计上的缺陷" tabindex="-1"><a class="header-anchor" href="#vue2-响应式采用object-defineproperty在设计上的缺陷"><span>vue2 响应式采用Object.defineProperty在设计上的缺陷</span></a></h4>
<p>通过以上学习，我们已经清楚了Object.defineProperty是基于一个对象存在已知的getter，setter来触发重新计算的。</p>
<p>所以我们可以得知想要基于Object.defineProperty具备响应性也是要有条件的</p>
<ol>
<li>具备setter和getter属性</li>
<li>要已知属性</li>
</ol>
<p>但是如果我们给对象新增一个属性，比如说，我们通过product['desc']='......'为对象添加了一个属性，Object.defineProperty还能具备响应性吗？</p>
<p>答案是不再具备了，因为这其中破坏了已知属性，没错我监听了setter和getter，但是没监听新增属性时应该如何变化呀</p>
<h4 id="vue3的改进方案" tabindex="-1"><a class="header-anchor" href="#vue3的改进方案"><span>vue3的改进方案</span></a></h4>
<p>vue3则是基于Proxy来是实现响应式的</p>
<p>Proxy就是代理的意思，他其实就是创建了一个对象代理，从而实现基本操作的拦截和自定义，具体的可以查看mdn了解其用法和含义</p>
<h5 id="proxy的使用" tabindex="-1"><a class="header-anchor" href="#proxy的使用"><span>proxy的使用</span></a></h5>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>
    <span class="token keyword">let</span> product <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">price</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">quantity</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>


    <span class="token comment">//创建代理对象</span>
    <span class="token keyword">const</span> productProxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>product<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token comment">//监听set行为</span>
        <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newVal<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newVal
            <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">//监听get行为</span>
        <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">let</span> total <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">effect</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        total <span class="token operator">=</span> productProxy<span class="token punctuation">.</span>price <span class="token operator">*</span> productProxy<span class="token punctuation">.</span>quantity
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>total<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>total<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>proxy的使用其实不难，只需要关注被代理的对象，和需要监听的方法回调，而Proxy其实就是帮助我们创建了一个代理对象，这个代理对象拥有所有被代理对象的所有属性。</p>
<p>当然我们的操作也应该操作代理对象，与Object.defineProperty最大的不同是我们不再需要指定属性，只需关注代理的对象即可。</p>
<p>所以vue3通过Proxy实现响应式核心API之后，vue就没有存在新增属性失去响应性的问题了</p>
<h5 id="reflect" tabindex="-1"><a class="header-anchor" href="#reflect"><span>Reflect</span></a></h5>
<p>Reflect它提供了拦截 JavaScript 操作的方法，比如get，has等方法,比如说</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>    <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'iphone'</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是Reflect.get 其实跟obj.name效果是一样的，但是为什么我们还需要用到Reflect呢？</p>
<p>那就需要看Reflect.get的第三个属性 receiver，如果target对象中指定了getter，receiver则为getter调用时的this值，不妨看看以下示例</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>   <span class="token keyword">let</span> zs <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">firstName</span><span class="token operator">:</span> <span class="token string">'张'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token string">'三'</span><span class="token punctuation">,</span>
        <span class="token keyword">get</span> <span class="token function">fullName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token comment">//2次</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">Proxy</span><span class="token punctuation">(</span>zs<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"GETTER"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
            <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token comment">//一次</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>proxy<span class="token punctuation">.</span>fullName<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以先暂停下来想一想，这里的GETTER会出现几次？结果表明，只有一次，但是一次是正常的嘛？</p>
<p>仔细想想这里应该是触发了几次getter？应该是触发3次getter吧，但是结果只有一个GETTER，这就是因为fullName的this指向的是zs，而不是zs的代理对象，之前我们就说了我们的操作对象应是proxy才能使得响应性生效</p>
<p>所以我们应该怎么修改呢？我们应该借用Reflect.get的receiver来修改this的指向</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code> <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">Proxy</span><span class="token punctuation">(</span>zs<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，this的指向会发生变动，再看看，GETTER就会如期的出现三次了</p>
<figure><img src="@source/frontend/image/image_Zb6RxGF949.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>所以Reflect和Proxy其实是一对最佳搭档，Reflect可以帮助Proxy修改this的指向</p>
<h3 id="初入reactivity模块" tabindex="-1"><a class="header-anchor" href="#初入reactivity模块"><span>初入reactivity模块</span></a></h3>
<h4 id="阅读源码" tabindex="-1"><a class="header-anchor" href="#阅读源码"><span>阅读源码</span></a></h4>
<h4 id="初创reactivity模块" tabindex="-1"><a class="header-anchor" href="#初创reactivity模块"><span>初创reactivity模块</span></a></h4>
<h5 id="reactivity的封装" tabindex="-1"><a class="header-anchor" href="#reactivity的封装"><span>reactivity的封装</span></a></h5>
<div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><pre v-pre class="language-vue"><code>//创建对象
const obj = {
  name: 'zs'
}
// reactive返回代理对象
const objProxy = reactive(obj)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从这段Vue3 reactive的写法中可以看出来其实Vue3 通过reactive函数为我们提供了一个代理对象任我们操作，所以第一步我们就仿照Vue3 的方式来通过reactive方法来创建一个代理对象返回。</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token comment">//导出reactive函数</span>
export function <span class="token function">reactive</span><span class="token punctuation">(</span>target<span class="token operator">:</span> object<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>mutableHandlers<span class="token punctuation">,</span>reactiveMap<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这段代码createReactiveObject(target,mutableHandlers,reactiveMap)不难看出，所有的操作都是在createReactiveObject方法中实现的，至于target，mutableHandlers，reactiveMap，接下来将会一步一步来实现。</p>
<p>traget就是目标对象，这就没什么好说的了</p>
<p>参照源码的写法mutableHandlers是放置在baseHandlers里的，所以我们暂时给个空实现</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">mutableHandlers</span> <span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span>any<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>reactiveMap则是一个WeakMap，所谓WeakMap从名字上看Weak就是弱的意思，WeakMap是弱引用的Map即可，所以当我们的变量不再被引用的时候，Map会被回收，如果是强引用的情况下，是不会被回收的，不妨一起看看下面这段代码带来的效果</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>    <span class="token comment">//1. 弱引用集合</span>
    <span class="token keyword">let</span> wm1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'zs'</span>
    <span class="token punctuation">}</span>
    obj <span class="token operator">=</span> <span class="token keyword">null</span>
    wm1<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">"aaa"</span><span class="token punctuation">)</span>

    <span class="token comment">//2. 强引用集合</span>
    <span class="token keyword">let</span> wm2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'zs'</span>
    <span class="token punctuation">}</span>
    wm2<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">"aaa2"</span><span class="token punctuation">)</span>
    obj <span class="token operator">=</span> <span class="token keyword">null</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/frontend/image/image_GCY5N9JyPS.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>如果此时将key置空，即obj = null,可看到结果一个wm1已为null，而wm2 是仍存在结果的，所以弱引用的WeakMap是不影响垃圾回收的，也更加适用于数据需要不断发生变动的reactivity模块</p>
<figure><img src="@source/frontend/image/image_u3bzOJ1-ie.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="@source/frontend/image/image_CVBJ2PBNqG.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>所以初代方法应该是这样子，主要逻辑是设置一个代理缓存，然后从缓存中查询看有没有存有target对象的代理，有就从缓存中取，否则就创建一个target代理</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建代理对象的核心方法</span>
<span class="token keyword">function</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>Object<span class="token punctuation">,</span>
    <span class="token literal-property property">baseHandlers</span><span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span>any<span class="token operator">></span><span class="token punctuation">,</span>
    <span class="token literal-property property">proxyMap</span><span class="token operator">:</span> WeakMap<span class="token operator">&lt;</span>Object<span class="token punctuation">,</span>any<span class="token operator">></span></span>
<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//从缓存中获取对应的target</span>
    <span class="token keyword">const</span> existingProxy <span class="token operator">=</span> proxyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>existingProxy<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//缓存中存在</span>
        <span class="token keyword">return</span> existingProxy
    <span class="token punctuation">}</span>
    <span class="token comment">//不存在的话创建代理对象</span>
    <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>baseHandlers<span class="token punctuation">)</span>
    <span class="token comment">//放置缓存</span>
    proxyMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>proxy<span class="token punctuation">)</span>
    <span class="token keyword">return</span> proxy
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好接下来，我们就要关注核心的mutableHandlers了，回顾一下Proxy的使用，Proxy的第二个参数其实就是关于事件的触发监听，所以我们大概也可以猜测到mutableHandlers的作用就是监听Proxy的操作行为的</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>
    <span class="token keyword">let</span> product <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">price</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">quantity</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>


    <span class="token comment">//创建代理对象</span>
    <span class="token keyword">const</span> productProxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>product<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token comment">//监听set行为</span>
        <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newVal<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newVal
            <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">//监听get行为</span>
        <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">let</span> total <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">effect</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        total <span class="token operator">=</span> productProxy<span class="token punctuation">.</span>price <span class="token operator">*</span> productProxy<span class="token punctuation">.</span>quantity
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>total<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>total<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，回顾完Proxy的使用后我们就来看看Vue3是如何实现，Vue3其实也就是采用了闭包的处理方法将ProxyHandler给封装起来了Reflect的使用也是为了让get，set行为重新指向代理对象，而track是Vue3做的收集依赖的行为(核心)，trigger则是触发依赖的行为</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> get <span class="token operator">=</span> <span class="token function">createGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> set <span class="token operator">=</span> <span class="token function">createSetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">createGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>object<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span>string <span class="token operator">|</span> symbol<span class="token punctuation">,</span> <span class="token literal-property property">receiver</span><span class="token operator">:</span>object</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>receiver<span class="token punctuation">)</span>
        <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">)</span>
        <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">function</span> <span class="token function">createSetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>object<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span>string <span class="token operator">|</span> symbol<span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> unknown <span class="token punctuation">,</span> <span class="token literal-property property">receiver</span><span class="token operator">:</span>object</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">,</span>receiver<span class="token punctuation">)</span>
        <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span>
        <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">mutableHandlers</span> <span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span>any<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    get<span class="token punctuation">,</span>
    set
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="effect的封装" tabindex="-1"><a class="header-anchor" href="#effect的封装"><span>effect的封装</span></a></h5>
<p>在回顾一下我们以往写的第一段代码</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> effect <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token class-name">Vue</span>

    <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token char">'zs'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token char">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> name<span class="token punctuation">.</span>name
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们是用reactive来触发数据的自动更新，还需要触发对应的视图刷新，而视图刷新就是在effect函数中进行处理的。</p>
<p>经过reactivity模块的学习，其实猜也能猜出来，其实就是在name 发生变动后，触发effect中我们传入的函数，那Vue3 又是如何将其封装得漂漂亮亮的呢？Vue3 的effect其实就是交给了ReactiveEffect来处理了，大致内容如下</p>
<p>首先我们要先搞定初次渲染的情况，初次渲染简单，就是将我们传入的函数触发一次即可</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> effect<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> any<span class="token operator">></span> <span class="token punctuation">(</span><span class="token function-variable function">fn</span> <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> _effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
    <span class="token comment">//执行传入回调函数</span>
    _effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token keyword">export</span> <span class="token keyword">let</span> <span class="token literal-property property">activeEffect</span><span class="token operator">:</span>ReactiveEffect <span class="token operator">|</span> <span class="token keyword">undefined</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ReactiveEffect</span><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> any<span class="token operator">></span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
    <span class="token comment">//这个方法就是直接触发我们传递的函数</span>
    <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//标志当前Effect已被激活</span>
        activeEffect <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
         <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="初次计算测试" tabindex="-1"><a class="header-anchor" href="#初次计算测试"><span>初次计算测试</span></a></h5>
<p>当然我们可以拿回我们第一次使用的那段代码用于测试</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>    <span class="token keyword">const</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> effect <span class="token punctuation">}</span> <span class="token operator">=</span> Vue

    <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'zs'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> name<span class="token punctuation">.</span>name
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新构建项目，打开</p>
<h4 id="触发计算effect实现" tabindex="-1"><a class="header-anchor" href="#触发计算effect实现"><span>触发计算effect实现</span></a></h4>
<p>首次加载计算已经实现了，也比较简单，说白了就是传入我们的函数交给ReactiveEffect触发即可，但是后面的改动Proxy时的重新计算呢？</p>
<p>这就需要我们再次重复响应性的概念，响应性我们经过了一轮认识，也算是有所了解了，无非是在setter数据的时候该对象所有的fn函数都触发一遍，我们提到了关键词，是所有的fn 和对应的对象。</p>
<p>想要获取所有的fn函数，还要区分哪些fn函数是哪个对象的。</p>
<p>想要完成这个过程我们就需要做一个操作 1. 收集依赖 </p>
<p>而setter 所做的事情就是触发依赖了</p>
<p>这也就是我们在做封装Proxy过程中空着的两个方法了</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>object<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span>string <span class="token operator">|</span> symbol<span class="token punctuation">,</span> <span class="token literal-property property">receiver</span><span class="token operator">:</span>object</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>receiver<span class="token punctuation">)</span>
        <span class="token operator">*</span> <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">)</span> <span class="token comment">//收集依赖</span>
        <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">function</span> <span class="token function">createSetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>object<span class="token punctuation">,</span> <span class="token literal-property property">key</span><span class="token operator">:</span>string <span class="token operator">|</span> symbol<span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> unknown <span class="token punctuation">,</span> <span class="token literal-property property">receiver</span><span class="token operator">:</span>object</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>receiver<span class="token punctuation">)</span>
        <span class="token operator">*</span> <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span> <span class="token comment">//触发依赖</span>
        <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键我们先看如何收集：想知道如何收集，我们得思考，收集的目的是什么？</p>
<p>因为我们要触发依赖，所以每次发生变动的时候，我们需要知道是哪个对象的哪个属性发生变动了，并且需要知道触发哪部分依赖，这样才能最大的节省资源。</p>
<p>所以我们需要将依赖和对象和对象属性有所绑定，这里就需要我们之前所讲的WeakMap了</p>
<p>因为WeakMap是一个&lt;Object,any&gt;的集合，所以我们能不能以这样的层级结构将数据的关系绑定在一起呢</p>
<p>WeakMap ：</p>
<ol>
<li>key ： 响应式对象</li>
<li>value ： Map对象
<ol>
<li>key ：响应式对象对应属性</li>
<li>value ： 对象指定属性的执行函数</li>
</ol>
</li>
</ol>
<p>看这个层级结构是不是就将对象和对象属性和对应的执行函数都绑定在一块呢</p>
<p>好了，我们有思路了，就一起来看看Vue3是如何来构建这层关系的吧</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>type KeyToDeMap <span class="token operator">=</span> Map<span class="token operator">&lt;</span>any<span class="token punctuation">,</span>ReactiveEffect<span class="token operator">></span>
<span class="token keyword">const</span> targetMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token operator">&lt;</span>any<span class="token punctuation">,</span>KeyToDeMap<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Vue3 就是这样将三者关系绑定在一起的</p>
<p>那么接下来看看track是如何依靠targetMap对依赖进行收集吧，其实理解起来不难，这段代码就是为了构建上面说的WeakMap 那层关系。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/***
 * 
 * 收集依赖
 * 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>object<span class="token punctuation">,</span><span class="token literal-property property">key</span><span class="token operator">:</span>unknown</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span> 
    <span class="token keyword">let</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span><span class="token punctuation">{</span>
        targetMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span><span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>activeEffect<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关系图都够构建好了，想触发还难吗？就像给了我们一本字典，想找一个字也就轻轻松松了。那么接下来看看如何进行依赖触发的</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/***
 * 
 * 触发依赖
 * 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>object<span class="token punctuation">,</span><span class="token literal-property property">key</span><span class="token operator">:</span>unknown<span class="token punctuation">,</span><span class="token literal-property property">newValue</span><span class="token operator">:</span>unknown</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//根据target找到对应对象</span>
    <span class="token keyword">const</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//根据属性名找到对应对象的属性名</span>
    <span class="token keyword">const</span> effect <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token keyword">as</span> ReactiveEffect
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>effect<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> 
    <span class="token punctuation">}</span>
    effect<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="测试-1" tabindex="-1"><a class="header-anchor" href="#测试-1"><span>测试</span></a></h5>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> effect <span class="token punctuation">}</span> <span class="token operator">=</span> Vue

    <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'zs'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#app"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>name
    <span class="token punctuation">}</span><span class="token punctuation">)</span>



    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        obj<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'ls'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不妨我们做个延迟更新数据的操作，打开网页我们就能发现，由于属性的变动触发了effect的重新计算，从而页面也发生了变动。至此，响应式数据我们就完成了。</p>
<h3 id="升级响应式模块代码" tabindex="-1"><a class="header-anchor" href="#升级响应式模块代码"><span>升级响应式模块代码</span></a></h3>
<p>虽然数据响应性确实是完成了，但是这里其实存在着一个问题</p>
<p>不妨看看以下这段代码</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span> 
    <span class="token keyword">let</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span><span class="token punctuation">{</span>
        targetMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span><span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
 depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>activeEffect<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从这段代码不难发现，其实depsMap中仅存着一个key和一个activeEffect对应，什么意思呢？就是我们只能绑定一个activeEffect即该响应式对象。</p>
<p>想想：如果我们一个key对应着多个响应式对象呢？这样显然响应式就是不OK的了</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#app1"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>name
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#app2"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>name
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么这种情况如何处理呢？不难，相信大家都能想到，使用集合存储就可以达到一对多的效果啦！确实如此，那应该使用什么集合呢？Array？Set？其实这里使用Set会更好。那好，接下来就来看看如何强化我们的响应式功能</p>
<p>我们可以先定义个Dep类型</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ReactiveEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./effect"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> type Dep <span class="token operator">=</span> Set<span class="token operator">&lt;</span>ReactiveEffect<span class="token operator">></span>

<span class="token keyword">export</span> <span class="token keyword">const</span> createDep <span class="token operator">=</span> <span class="token punctuation">(</span>effects<span class="token operator">?</span><span class="token operator">:</span> ReactiveEffect<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token parameter">Dep</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token operator">&lt;</span>ReactiveEffect<span class="token operator">></span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span> <span class="token keyword">as</span> Dep
    <span class="token keyword">return</span> dep
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后将KeyToDeMap中的类型修改成Dep,这样就可以做到一个kep对应多个依赖了</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">KeyToDeMap</span> <span class="token operator">=</span> Map<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span>Dep<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么接下来一起来看看如何处理收集Dep的函数，此时根据key get出来的就是一个Dep类型的对象了</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">/***
 * 
 * 收集依赖
 * 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token operator">:</span>object<span class="token punctuation">,</span>key<span class="token operator">:</span><span class="token builtin">unknown</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span> 
    <span class="token keyword">let</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span><span class="token punctuation">{</span>
        targetMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span><span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> dep <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>dep<span class="token punctuation">)</span><span class="token punctuation">{</span>
        depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span><span class="token punctuation">(</span>dep <span class="token operator">=</span> <span class="token function">createDep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">trackEffects</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//往依赖集合中添加对应的依赖</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trackEffects</span><span class="token punctuation">(</span>dep<span class="token operator">:</span>Dep<span class="token punctuation">)</span><span class="token punctuation">{</span>
    dep<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token operator">!</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成了收集接下来就一起来看看如何触发对应的依赖集合</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token operator">:</span>object<span class="token punctuation">,</span>key<span class="token operator">:</span><span class="token builtin">unknown</span><span class="token punctuation">,</span>newValue<span class="token operator">:</span><span class="token builtin">unknown</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//根据target找到对应对象</span>
    <span class="token keyword">const</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//根据属性名找到对应对象的属性名</span>
    <span class="token operator">+</span> <span class="token keyword">const</span> dep<span class="token operator">:</span> Dep <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token operator">+</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>dep<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token operator">+</span>     <span class="token keyword">return</span>        
    <span class="token operator">+</span> <span class="token punctuation">}</span>
     <span class="token comment">//依次执行def内的函数</span>
    <span class="token operator">+</span> <span class="token function">triggerEffects</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为Dep 实际上就是一个Set，所以我们要从Set中获取一个个effect，然后逐个执行</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">/**
 * 依次执行def内的函数
 * @param dep 
 * 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">triggerEffects</span><span class="token punctuation">(</span>dep<span class="token operator">:</span> Dep<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//强转为数组</span>
    <span class="token keyword">const</span> effects <span class="token operator">=</span> <span class="token builtin">Array</span><span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span> <span class="token operator">?</span> dep <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span>dep<span class="token punctuation">]</span>

    <span class="token comment">//依次触发依赖</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> effect <span class="token keyword">of</span> effects<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">triggerEffect</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
<span class="token comment">/**
 * 
 * 触发依赖
 * 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">triggerEffect</span><span class="token punctuation">(</span>effect <span class="token operator">:</span> ReactiveEffect<span class="token punctuation">)</span><span class="token punctuation">{</span>
    effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="测试-2" tabindex="-1"><a class="header-anchor" href="#测试-2"><span>测试</span></a></h4>
<p>执行以下代码进行测试</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>../dist/vue.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">

    <span class="token keyword">const</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> effect <span class="token punctuation">}</span> <span class="token operator">=</span> Vue

    <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'zs'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#app1"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>name
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#app2"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>name
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        obj<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'ls'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="reactivity的弊端" tabindex="-1"><a class="header-anchor" href="#reactivity的弊端"><span>reactivity的弊端</span></a></h4>
<ol>
<li>无法对一个非对象形式的变量具备响应性，因为new Proxy 是需要接收一个对象的，而如果我们传入的不是对象，那就会报错了</li>
<li>无法对解构出来的属性具备响应性</li>
</ol>
<h3 id="ref的空降" tabindex="-1"><a class="header-anchor" href="#ref的空降"><span>Ref的空降</span></a></h3>
<p>Ref就是为了解决Reactive无法解决的基础类型数据，但是Reactive仍然是可以使用的，即如果判断数据是复杂类型的数据，仍然会调用Reactive的</p>
<p>那么Ref又是怎么对数据进行处理的呢？</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">ref</span><span class="token punctuation">(</span>value<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>  <span class="token function">createRef</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先会有一个createRef方法构建Ref数据，这里首先会判断数据是否是一个Ref数据，是否是Ref数据得从RefImpl这个Ref实现类中的_val_isRef属性进行判断的</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">/**
 * 构建Ref响应式数据
 * @param rawValue 
 * @param shallow 
 * @returns 
 */</span>
<span class="token keyword">function</span> <span class="token function">createRef</span><span class="token punctuation">(</span>rawValue<span class="token operator">:</span><span class="token builtin">unknown</span> <span class="token punctuation">,</span> shallow<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isRef</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> rawValue
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RefImpl</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">,</span>shallow<span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token comment">/**
 * 
 * 判断是否是Ref类型数据
 * 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isRef</span><span class="token punctuation">(</span>r<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span>r <span class="token keyword">is</span> Ref<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span>r <span class="token operator">&amp;&amp;</span> r<span class="token punctuation">.</span>__v_isRef <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而Ref Impl中就是做主要的转换Reactive或保留value的逻辑</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">RefImpl<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> _value<span class="token operator">:</span> <span class="token constant">T</span>

    <span class="token keyword">public</span> dep<span class="token operator">?</span><span class="token operator">:</span>Dep <span class="token operator">=</span> <span class="token keyword">undefined</span>

    <span class="token keyword">public</span> <span class="token keyword">readonly</span> __v_isRef <span class="token operator">=</span> <span class="token boolean">true</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>value<span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">,</span><span class="token keyword">public</span> <span class="token keyword">readonly</span> __v_isShallow<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//__v_isShallow：判断是否是一个复杂对象，如果是一个复杂对象就直接转为Reactive对象即可</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> __v_isShallow <span class="token operator">?</span> value <span class="token operator">:</span> <span class="token function">toReactive</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>toReactive的实现就比较简单了，就是判断value是不是一个复杂的对象类型</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">/**
 * 将传入的数据转为Reactive数据，如果不是复杂对象类型则直接返回value
 * @param value 
 * @returns 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> toReactive <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">unknown</span></span><span class="token operator">></span><span class="token punctuation">(</span>value <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">reactive</span><span class="token punctuation">(</span>value <span class="token keyword">as</span> object<span class="token punctuation">)</span> <span class="token operator">:</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * 判断数据是否数据一个object类型
 * @param val 
 * @returns 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">isObject</span> <span class="token operator">=</span> <span class="token punctuation">(</span>val<span class="token operator">:</span><span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token operator">=></span>  <span class="token punctuation">{</span>
    <span class="token keyword">return</span> val <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> val <span class="token operator">===</span> <span class="token string">'object'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成了数据转换之后，我们就可以完成set 和 get方法的设置的，跟reactive一样的，就是get做依赖收集，set做依赖触发，关注这段代码，就能解密我们为什么使用ref的时候需要xxx.value 或者 xxx.value = yyy这样的方式获取值或者赋值了，原因就在于ref为get/set设了value的方法名了</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code>   <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//收集依赖</span>
        <span class="token function">trackRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value
    <span class="token punctuation">}</span>

    <span class="token comment">//依赖触发不同的是就是通过判断新旧值是否有改变来决定是否进行触发依赖</span>
    <span class="token keyword">set</span> <span class="token function">value</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">hasChanged</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue <span class="token operator">=</span>  newVal
            <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> <span class="token function">toReactive</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
            <span class="token function">triggerRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>依赖收集方法，依赖收集跟reactive也是一样的</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">/**
 * 收集依赖，根据activeEffect来判断该依赖是否被激活，是的话就直接收集起来
 * @param ref 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trackRefValue</span><span class="token punctuation">(</span>ref<span class="token operator">:</span>RefImpl<span class="token operator">&lt;</span><span class="token builtin">unknown</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">trackEffects</span><span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep <span class="token operator">||</span> <span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token function">createDep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而触发依赖的方法其实跟reactive也是大差不差，就是取dep中的依赖循环触发而已</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">triggerRefValue</span><span class="token punctuation">(</span>ref<span class="token operator">:</span><span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">triggerEffects</span><span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实代码看下来，核心思想在于简单类型被封装成了一个RefImpl的复杂对象类型了，但是并没有创建Proxy方法进行get 和set 监听，这也是简单类型和复杂的对象数据类型的不同点。</p>
<h4 id="测试代码" tabindex="-1"><a class="header-anchor" href="#测试代码"><span>测试代码</span></a></h4>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>    <span class="token keyword">const</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> effect<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token operator">=</span> Vue

    <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">'zs'</span><span class="token punctuation">)</span>

    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app1'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> obj<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        obj<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">'ls'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">2000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="computed" tabindex="-1"><a class="header-anchor" href="#computed"><span>Computed</span></a></h3>
<p>Computed的作用是创建一个只读的属性，它能够接收一个getter函数，即需要有一份明确的返回值</p>
<p>所以我们明确了Computed是需要接收一个getter函数的，也就是说我们需要去触发他，这不就是触发依赖嘛</p>
<p>所以说Computed在初始化的时候就要进行依赖触发了，那问题是Computed是怎么根据属性变化来发生依赖触发呢？</p>
<p>我们带着问题一起先来动手做一个mini computed吧</p>
<h4 id="computed-方法" tabindex="-1"><a class="header-anchor" href="#computed-方法"><span>Computed 方法</span></a></h4>
<p>首先我们先创建一个computed方法，其实这就很像Ref的做法了，就是采用Impl类来处理整个依赖收集和依赖触发过程</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span>getterOrOptions<span class="token operator">:</span><span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> getter
    <span class="token comment">//判断是否是函数</span>
    <span class="token keyword">const</span> onlyGetter <span class="token operator">=</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>getterOrOptions<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>onlyGetter<span class="token punctuation">)</span><span class="token punctuation">{</span>
        getter <span class="token operator">=</span> getterOrOptions
    <span class="token punctuation">}</span>
    <span class="token comment">//Computed核心类</span>
    <span class="token keyword">const</span> cRef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ComputedRefImpl</span><span class="token punctuation">(</span>getter<span class="token punctuation">)</span>
    <span class="token keyword">return</span> cRef
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>isFunction方法的实现也是非常简单的</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token comment">/**
 * 判断传入的值是否属于函数类型
 * @param val 
 * @returns 
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> isFunction <span class="token operator">=</span> <span class="token punctuation">(</span>val<span class="token operator">:</span><span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token operator">:</span>val <span class="token keyword">is</span> <span class="token builtin">Function</span> <span class="token operator">=></span> <span class="token keyword">typeof</span> val <span class="token operator">===</span> <span class="token string">'function'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="computedrefimpl-类实现" tabindex="-1"><a class="header-anchor" href="#computedrefimpl-类实现"><span>ComputedRefImpl 类实现</span></a></h4>
<p>ComputedRefImpl 中多出了一个_dirty 的脏标识，这个值的作用很大，决定着是否触发依赖，所以如果出发了Computed函数时，就会将_dirty 改为true，方便后面的get函数用于根据_dirty 来判断是否重新触发依赖。</p>
<p>而我们可以从这段代码发现，这里只有get函数，没有set函数，这么设计就是为了</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ComputedRefImpl<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span><span class="token punctuation">{</span>
    <span class="token comment">//依赖集合</span>
    <span class="token keyword">public</span> dep<span class="token operator">?</span> <span class="token operator">:</span> Dep <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token comment">//值</span>
    <span class="token keyword">private</span> _value <span class="token operator">!</span><span class="token operator">:</span> <span class="token constant">T</span> 
    <span class="token comment">//副作用触发，用于触发依赖</span>
    <span class="token keyword">public</span> <span class="token keyword">readonly</span> effect <span class="token operator">:</span> ReactiveEffect<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
    <span class="token comment">//这是打上了Ref标识的</span>
    <span class="token keyword">public</span> <span class="token keyword">readonly</span> __v_isRef <span class="token operator">=</span> <span class="token boolean">true</span>


    <span class="token comment">//脏数据，用于判断该数据是否发生了改变，决定着是否需要重新触发依赖</span>
    <span class="token keyword">public</span> _dirty <span class="token operator">=</span> <span class="token boolean">false</span>
    
    <span class="token function">constructor</span><span class="token punctuation">(</span>getter<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dirty<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_dirty <span class="token operator">=</span> <span class="token boolean">true</span>
                <span class="token function">triggerRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token comment">//初始化值，需要先触发一次依赖</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">//用于收集依赖</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>effect<span class="token punctuation">.</span>computed <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//依赖收集</span>
        <span class="token function">trackRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token comment">//如果数据脏了，那才需要执行依赖收集从而进行依赖触发</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dirty<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>_dirty <span class="token operator">=</span> <span class="token boolean">false</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="watch" tabindex="-1"><a class="header-anchor" href="#watch"><span>Watch</span></a></h3>
<h4 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h4>
<p>从vue提供的watch方法来看，他一共是接收三个参数</p>
<ol>
<li>监听的响应式对象</li>
<li>回调函数，即监听对象发生变化所触发的回调函数</li>
<li>配置对象
<ol>
<li>immediate : watch 初始化完成后被触发一次</li>
<li>deep：深度监听</li>
</ol>
</li>
</ol>
<h4 id="scheduler解析" tabindex="-1"><a class="header-anchor" href="#scheduler解析"><span>Scheduler解析</span></a></h4>
<p>不管是watch还是computed scheduler这个调度器是他们执行依赖的核心</p>
<p>vue中提供的scheduler具备两个参数 </p>
<ol>
<li>lazy 控制是否懒执行</li>
<li>scheduler 调度器 
<ol>
<li>控制执行顺序 →通过开启异步执行微任务来调整执行顺序</li>
<li>控制执行规则</li>
</ol>
</li>
</ol>
<h4 id="secheduler中的懒加载" tabindex="-1"><a class="header-anchor" href="#secheduler中的懒加载"><span>Secheduler中的懒加载</span></a></h4>
<p>控制是否懒加载其实非常好实现，无非是提供一个lazy参数外部填写，在effect中根据lazy来判断是否马上执行方法</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">ReactiveEffectOptions</span><span class="token punctuation">{</span>
    lazy<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
    scheduler<span class="token operator">?</span><span class="token operator">:</span> EffectScheduler
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">effect</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span> <span class="token punctuation">(</span><span class="token function-variable function">fn</span> <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token constant">T</span><span class="token punctuation">,</span>options<span class="token operator">?</span><span class="token operator">:</span> ReactiveEffectOptions<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> _effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
    <span class="token comment">//判断懒执行</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>options <span class="token operator">||</span> <span class="token operator">!</span>options<span class="token punctuation">.</span>lazy<span class="token punctuation">)</span><span class="token punctuation">{</span>
        _effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="scheduler-控制执行顺序的核心-queuepreflushcb" tabindex="-1"><a class="header-anchor" href="#scheduler-控制执行顺序的核心-queuepreflushcb"><span>Scheduler 控制执行顺序的核心 queuePreFlushCb</span></a></h4>
<p>queuePreFlushCb是控制Scheduler的核心，接下来就一起来看看他是如何控制执行顺序的，以下就是具体的核心代码</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> isFlushPending <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token keyword">const</span> pendingPreFlushCbs<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">const</span> resolvePromise <span class="token operator">=</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span>

<span class="token keyword">let</span> currentFlushPromise <span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">queuePreFlushCb</span><span class="token punctuation">(</span>cb<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">queueCb</span><span class="token punctuation">(</span>cb<span class="token punctuation">,</span> pendingPreFlushCbs<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">queueCb</span> <span class="token operator">=</span> <span class="token punctuation">(</span>cb<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">,</span> pendingPreFlushCbs<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>

    pendingPreFlushCbs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span>

    <span class="token function">queueFlush</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">queueFlush</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isFlushPending<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        isFlushPending <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token comment">//开启异步微任务的执行</span>
        currentFlushPromise <span class="token operator">=</span> resolvePromise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>flushJobs<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">flushJobs</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">//标志任务执行</span>
    isFlushPending <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token comment">//开启任务的循环执行</span>
    <span class="token function">flushPreFlushCbs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token comment">/*
 *@description: 循环执行列表中的函数
 *@author: T
 *@date: 2024-07-01 18:17:07
*/</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">flushPreFlushCbs</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>pendingPreFlushCbs<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//对函数列表去重</span>
        <span class="token keyword">let</span> activePreFlushCbs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>pendingPreFlushCbs<span class="token punctuation">)</span><span class="token punctuation">]</span>
        pendingPreFlushCbs<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token comment">//循环执行</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> activePreFlushCbs<span class="token punctuation">.</span>length <span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            activePreFlushCbs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以发现的是，Scheduler是通过queuePreFlushCb来控制函数的执行顺序的，他会通过pendingPreFlushCbs来将要执行的函数收集好，然后在queueFlush 方法中通过开启异步任务执行的方式来执行pendingPreFlushCbs中的函数</p>
<h4 id="watch监听器" tabindex="-1"><a class="header-anchor" href="#watch监听器"><span>Watch监听器</span></a></h4>
<h5 id="_1-判断是否属性reactive类型" tabindex="-1"><a class="header-anchor" href="#_1-判断是否属性reactive类型"><span>1. 判断是否属性Reactive类型</span></a></h5>
<p>想要判断属性是否属于Reactive类型，我们的方法是在Reactive类型创建之后，为Reactive类型的对象添加上Reactive标识，那么我们先要找找看Reactive在哪里创建的呢，以往我们就写过，就在createReactiveObject中，我们接受一个对象并创建对应的Proxy对象，我们为其添加了__v_isReactive标识，标识该对象是一个Reactive类型的对象</p>
<div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="token operator">+</span> <span class="token comment">//创建一个Reactive属性的标志</span>
<span class="token operator">+</span> <span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token keyword">enum</span> ReactiveFlags <span class="token punctuation">{</span>
<span class="token operator">+</span>     <span class="token constant">IS_REACTIVE</span> <span class="token operator">=</span> <span class="token string">'__v_isReactive'</span>
<span class="token operator">+</span> <span class="token punctuation">}</span>


<span class="token keyword">function</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>
    target<span class="token operator">:</span>Object<span class="token punctuation">,</span>
    baseHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">,</span>
    proxyMap<span class="token operator">:</span> WeakMap<span class="token operator">&lt;</span>Object<span class="token punctuation">,</span><span class="token builtin">any</span><span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//从缓存中获取对应的target</span>
    <span class="token keyword">const</span> existingProxy <span class="token operator">=</span> proxyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>existingProxy<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//缓存中存在</span>
        <span class="token keyword">return</span> existingProxy
    <span class="token punctuation">}</span>
    <span class="token comment">//不存在的话创建代理对象</span>
    <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>baseHandlers<span class="token punctuation">)</span>
    <span class="token comment">//创建了proxy后，为proxy添加一个Reactive类型标识</span>
    <span class="token operator">+</span> proxy<span class="token punctuation">[</span>ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_REACTIVE</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>


    <span class="token comment">//放置缓存</span>
    proxyMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>proxy<span class="token punctuation">)</span>
    <span class="token keyword">return</span> proxy
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-实现watch-触发函数" tabindex="-1"><a class="header-anchor" href="#_2-实现watch-触发函数"><span>2. 实现watch 触发函数</span></a></h4>
<h2 id="vue的运行时渲染" tabindex="-1"><a class="header-anchor" href="#vue的运行时渲染"><span> Vue的运行时渲染</span></a></h2>
<p>运行时函数简单地理解就是将Vue代码渲染到Html页面上，这里可以分为两个步骤</p>
<ol>
<li>制成VNode </li>
<li>将VNode挂载到指定位置</li>
</ol>
<h3 id="vnode" tabindex="-1"><a class="header-anchor" href="#vnode"><span>VNode</span></a></h3>
<p>不妨我们先来看看什么是VNode，VNode是用来干什么的？首先我们要先了解两块内容</p>
<ol>
<li>
<p>HTML DOM 节点树</p>
<p>以以下代码为例</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span> hello h1 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- 注释 --></span>
  hello div
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的一段html代码所组成的结构是这样的，是一个树的结构，所以说这段是HTML DOM节点树</p>
<figure><img src="@source/frontend/image/image_gBi8HMhWZu.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
<li>
<p>虚拟DOM 树</p>
</li>
</ol>
<p>不过如果我们需要频繁地去做DOM操作的时候，更新都还好，毕竟树的查询效率是比较快的，但是如果是删除或者新增DOM的话，这就会引起树结构的重绘，这样带来的性能消耗的巨大的。所以不建议我们直接操作DOM元素，这也是Vue诞生的核心原因之一。</p>
<p>为了让我们既能操作DOM元素，又不想频繁地去操作DOM元素，React提出了虚拟DOM的概念，记住这是一个概念，他需要有具体的实现。</p>
<p>虚拟DOM节点理解起来其实也不难，他就是给真实DOM整出了一个备份然后用特定的数据结构来表示，既然是备份那就肯定要跟真实DOM保持一致啦。这样会带来什么好处呢？</p>
<p>首先我们不再需要操作真实DOM了，提而代之的是操作虚拟DOM，而虚拟DOM可以提供批量更新的功能，比如说我可以屯一段时间内的更新操作来一次性做一个更新，这样真实DOM的重绘次数不就减少了吗</p>
<p>第二则是虚拟DOM还可以跟真实DOM做对比，如果更新的内容跟原来的内容一致，那我可以选择不同步真实DOM嘛，这样又减少了不少不必要的操作了，又或者我可以取最后一次更新来进行对比</p>
<p>当然虚拟DOM带来的好处是非常多的，更多的可以浏览一下Vue是如何看待并实现虚拟DOM的</p>
<p><a href="https://cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom" title="https://cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom" target="_blank" rel="noopener noreferrer">https://cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom<ExternalLinkIcon/></a></p>
<figure><img src="@source/frontend/image/image_76Jbx8ejd-.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>接下来我们直接上代码，还是这段代码示例</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span> hello h1 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- 注释 --></span>
  hello div
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们需要转成虚拟节点可以怎么转呢？我们可以转成以下这样的对象形式</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'h1'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'hello h1'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token constant">COMMENT</span><span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'注释'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">'hello div'</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么在运行过程中，Vue会给提供一个渲染器render来将这段结构构建成真实的DOM节点树，这个过程我们可以管他叫做挂载（mount）</p>
<p>当然如果说需要更新的时候，虚拟DOM会跟真实DOM进行对比，找到不同的地方进行节点更新，这个过程我们可以管他叫做更新或者协调</p>
<h3 id="挂载" tabindex="-1"><a class="header-anchor" href="#挂载"><span>挂载</span></a></h3>
<p>刚刚我们已经懂了，原来在浏览器中所有的Node会组成一棵树的结构，那么挂载其实就是我们将Node像挂祝福卡一样，找到指定位置给他挂到下面去就行了。</p>
<p>那我们现在就来实现一下挂载的过程，其实就是一个照猫画虎的过程，我们从上面小节得知一个node节点的结构是这样的，那其实我们也可以弄一个一样的结果放到指定id的元素作为其children节点吧</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>  <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'h1'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'hello h1'</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>    <span class="token keyword">const</span> VNode <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token string">'hello new node '</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">oldVNode<span class="token punctuation">,</span> newVNode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//触发新节点不存在 -> 挂载流程</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>oldVNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">mount</span><span class="token punctuation">(</span>newVNode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">function</span> <span class="token function">mount</span><span class="token punctuation">(</span><span class="token parameter">newVNode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建一个指定类型的元素</span>
        <span class="token keyword">const</span> ele <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>newVNode<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
        ele<span class="token punctuation">.</span>innerText <span class="token operator">=</span> newVNode<span class="token punctuation">.</span>children
        <span class="token comment">//给元素添加到指定容器中 = 挂载</span>
        container<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>ele<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">render</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> VNode<span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记住这个流程，其实Vue对挂载的处理也是围绕着这个流程的，虽然Vue做了不少的优化和多场景的考虑，但是核心流程都是这个的。</p>
<h3 id="更新" tabindex="-1"><a class="header-anchor" href="#更新"><span>更新</span></a></h3>
<p>而更新节点又是如何操作的呢？其实就是旧节点删了，将新节点重新添加</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>
    <span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">oldVNode<span class="token punctuation">,</span> newVNode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//触发新节点不存在 -> 挂载流程</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>oldVNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">mount</span><span class="token punctuation">(</span>newVNode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
       <span class="token operator">+</span> <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
       <span class="token operator">+</span>     <span class="token function">patch</span><span class="token punctuation">(</span>oldVNode<span class="token punctuation">,</span> newVNode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
       <span class="token operator">+</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

  <span class="token operator">+</span>  <span class="token keyword">function</span> <span class="token function">unmount</span><span class="token punctuation">(</span><span class="token parameter">container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">+</span>      <span class="token comment">//清空容器</span>
  <span class="token operator">+</span>      container<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">''</span>
  <span class="token operator">+</span>  <span class="token punctuation">}</span>


  <span class="token operator">+</span>  <span class="token keyword">function</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token parameter">oldVNode<span class="token punctuation">,</span> newVNode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">+</span>      <span class="token comment">//删除节点</span>
  <span class="token operator">+</span>      <span class="token function">unmount</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span>
  <span class="token operator">+</span>      <span class="token comment">//重新添加节点</span>
  <span class="token operator">+</span>      <span class="token comment">//创建一个指定类型的元素</span>
  <span class="token operator">+</span>      <span class="token keyword">const</span> ele <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>newVNode<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  <span class="token operator">+</span>      ele<span class="token punctuation">.</span>innerText <span class="token operator">=</span> oldVNode<span class="token punctuation">.</span>children
  <span class="token operator">+</span>     <span class="token comment">//给元素添加到指定容器中 = 挂载</span>
  <span class="token operator">+</span>      container<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>ele<span class="token punctuation">)</span>
  <span class="token operator">+</span>  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


