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
<li><a href="#%E6%8E%A2%E7%B4%A2%E6%BA%90%E7%A0%81">探索源码</a>
<ul>
<li><a href="#%E5%93%8D%E5%BA%94%E7%B3%BB%E7%BB%9F">响应系统</a>
<ul>
<li><a href="#js%E7%9A%84%E7%A8%8B%E5%BA%8F%E6%80%A7">js的程序性</a></li>
<li><a href="#%E4%BB%A4%E7%A8%8B%E5%BA%8F%E6%9B%B4%E5%8A%A0%E8%81%AA%E6%98%8E">令程序更加聪明</a></li>
<li><a href="#vue2-%E5%93%8D%E5%BA%94%E5%BC%8F%E9%87%87%E7%94%A8ObjectdefineProperty%E5%9C%A8%E8%AE%BE%E8%AE%A1%E4%B8%8A%E7%9A%84%E7%BC%BA%E9%99%B7">vue2 响应式采用Object.defineProperty在设计上的缺陷</a></li>
<li><a href="#vue3%E7%9A%84%E6%94%B9%E8%BF%9B%E6%96%B9%E6%A1%88">vue3的改进方案</a></li>
</ul>
</li>
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
<figure><img src="@source/frontend/vue/image/image_DCvvNECOPB.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>点击运行后，我们可以从服务器指定端口获取资源，就证明运行成功了</p>
<figure><img src="@source/frontend/vue/image/image_-mkeJCEFUS.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>接下来我们就可以尝试做debug处理了</p>
<h4 id="debug" tabindex="-1"><a class="header-anchor" href="#debug"><span>debug</span></a></h4>
<p>浏览器是个debug的好工具，但是浏览器中的源码只有build后的代码，想要看到构建前的代码，我们需要开启vue的sourceMap，很简单，就是到package.json 处为构建代码添加-s属性即可</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"node scripts/build.js -s"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重新构建，我们就能发现文件多了.map</p>
<figure><img src="@source/frontend/vue/image/image_5ki6vRH0mZ.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>打开浏览器的调试工具，到sources栏下， 就能看到vue的所有相关源码了</p>
<figure><img src="@source/frontend/vue/image/image_FGuOHGLJ-m.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>打上断点，刷新就能进行debug模式啦</p>
<figure><img src="@source/frontend/vue/image/image_DxyuyajuUX.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
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
<figure><img src="@source/frontend/vue/image/image_HLs1MOWgm-.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
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
<h2 id="探索源码" tabindex="-1"><a class="header-anchor" href="#探索源码"><span>探索源码</span></a></h2>
<h3 id="响应系统" tabindex="-1"><a class="header-anchor" href="#响应系统"><span>响应系统</span></a></h3>
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
<figure><img src="@source/frontend/vue/image/image_a3r7U-7x3Y.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
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
</div></template>


