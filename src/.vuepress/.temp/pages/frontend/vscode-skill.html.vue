<template><div><h1 id="前端开发小技巧" tabindex="-1"><a class="header-anchor" href="#前端开发小技巧"><span>前端开发小技巧</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#VSCode-">VSCode </a></li>
<li><a href="#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B3%A8%E9%87%8A">自定义注释</a>
<ul>
<li><a href="#%E6%96%B0%E5%BB%BA%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6">新建配置文件</a></li>
<li><a href="#%E7%BC%96%E8%BE%91%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6">编辑配置文件</a></li>
<li><a href="#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B3%A8%E9%87%8A%E6%A8%A1%E6%9D%BF">自定义注释模板</a>
<ul>
<li><a href="#Vue3">Vue3</a></li>
<li><a href="#TSX">TSX</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#%E6%8F%92%E4%BB%B6%E6%8E%A8%E8%8D%90">插件推荐</a>
<ul>
<li><a href="#Prettier---Code-formatter">Prettier - Code formatter</a></li>
<li><a href="#Prettier---ESLint-%E9%85%8D%E7%BD%AE%E8%A7%A3%E5%86%B3%E4%BB%A3%E7%A0%81%E6%A0%BC%E5%BC%8F%E9%97%AE%E9%A2%98">Prettier - ESLint 配置解决代码格式问题</a></li>
</ul>
</li>
</ul>
<h2 id="vscode" tabindex="-1"><a class="header-anchor" href="#vscode"><span>VSCode </span></a></h2>
<h2 id="自定义注释" tabindex="-1"><a class="header-anchor" href="#自定义注释"><span>自定义注释</span></a></h2>
<h4 id="新建配置文件" tabindex="-1"><a class="header-anchor" href="#新建配置文件"><span>新建配置文件</span></a></h4>
<p>在VsCode编辑界面中通过快捷键<code v-pre>ctrl + shift + p</code> 打开设置窗口，并输入snippets，选择第一个选项(Snippets:Configure User Snippets)。</p>
<h4 id="编辑配置文件" tabindex="-1"><a class="header-anchor" href="#编辑配置文件"><span>编辑配置文件</span></a></h4>
<p>进入javascript.json文件 替换以下代码</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"Print to jsNoteTitle"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prefix"</span><span class="token operator">:</span> <span class="token string">"jsNoteTitle"</span><span class="token punctuation">,</span>
    <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"/*"</span><span class="token punctuation">,</span>
      <span class="token string">" *@description:"</span><span class="token punctuation">,</span>
      <span class="token string">" *@author: albert"</span><span class="token punctuation">,</span>
      <span class="token string">" *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@version: V1.0.5"</span><span class="token punctuation">,</span>
      <span class="token string">"*/"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">""</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"Print to jsfn"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prefix"</span><span class="token operator">:</span> <span class="token string">"jsfn"</span><span class="token punctuation">,</span>
    <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"/*"</span><span class="token punctuation">,</span>
      <span class="token string">" *@functionName: ${TM_CURRENT_LINE}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@params1: ${1:参数1}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@params2: ${2:参数2}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@params3: ${3:参数3}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@params4: ${4:参数4}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@description:"</span><span class="token punctuation">,</span>
      <span class="token string">" *@author: albert"</span><span class="token punctuation">,</span>
      <span class="token string">" *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@version: V1.0.5"</span><span class="token punctuation">,</span>
      <span class="token string">"*/"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">""</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"Print to jsModify"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prefix"</span><span class="token operator">:</span> <span class="token string">"jsModify"</span><span class="token punctuation">,</span>
    <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"/*"</span><span class="token punctuation">,</span>
      <span class="token string">" *@description:"</span><span class="token punctuation">,</span>
      <span class="token string">" *@modifyContent:"</span><span class="token punctuation">,</span>
      <span class="token string">" *@author: albert"</span><span class="token punctuation">,</span>
      <span class="token string">" *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}"</span><span class="token punctuation">,</span>
      <span class="token string">"*/"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">""</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"Print to jsVariable"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prefix"</span><span class="token operator">:</span> <span class="token string">"jsVariable"</span><span class="token punctuation">,</span>
    <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"/*"</span><span class="token punctuation">,</span>
      <span class="token string">" *@description:"</span><span class="token punctuation">,</span>
      <span class="token string">" *@author: albert"</span><span class="token punctuation">,</span>
      <span class="token string">" *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@variable1: ${1:变量1}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@variable2: ${2:变量2}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@variable3: ${3:变量3}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@variable4: ${4:变量4}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@variable5: ${5:变量5}"</span><span class="token punctuation">,</span>
      <span class="token string">"*/"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">""</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上四种注释，分别是函数，class标题，变量，修改四种注释</p>
<h3 id="自定义注释模板" tabindex="-1"><a class="header-anchor" href="#自定义注释模板"><span>自定义注释模板</span></a></h3>
<h4 id="vue3" tabindex="-1"><a class="header-anchor" href="#vue3"><span>Vue3</span></a></h4>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>

  <span class="token comment">// Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and </span>
  <span class="token comment">// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:</span>
  <span class="token comment">// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the </span>
  <span class="token comment">// same ids are connected.</span>
  <span class="token comment">// Example:</span>
  <span class="token property">"Print Vue Template For Vue3"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prefix"</span><span class="token operator">:</span> <span class="token string">"vue3"</span><span class="token punctuation">,</span>
    <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"&lt;template> &lt;/template>"</span><span class="token punctuation">,</span>
      <span class="token string">"&lt;script setup>&lt;/script>"</span><span class="token punctuation">,</span>
      <span class="token string">"&lt;style >  &lt;/style>"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Print Vue Template For Vue3"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="tsx" tabindex="-1"><a class="header-anchor" href="#tsx"><span>TSX</span></a></h4>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">//输出一个React 组件</span>
  <span class="token property">"Print a React Component"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prefix"</span><span class="token operator">:</span> <span class="token string">"prc"</span><span class="token punctuation">,</span>
    <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"/*"</span><span class="token punctuation">,</span>
      <span class="token string">" *@description:${1:注释}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@author: tangzhaofeng"</span><span class="token punctuation">,</span>
      <span class="token string">" *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@version: V1"</span><span class="token punctuation">,</span>
      <span class="token string">"*/"</span><span class="token punctuation">,</span>
      <span class="token string">"const ${21:组件名}:React.FC&lt;${3:接口名}> = (props) => {"</span><span class="token punctuation">,</span>
        <span class="token string">"return &lt;>&lt;/>"</span><span class="token punctuation">,</span>
      <span class="token string">"}"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Print a React Component"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">//定义一个接口</span>
  <span class="token property">"Print a interface"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prefix"</span><span class="token operator">:</span> <span class="token string">"pi"</span><span class="token punctuation">,</span>
    <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"/*"</span><span class="token punctuation">,</span>
      <span class="token string">" *@description:${1:注释}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@author: tangzhaofeng"</span><span class="token punctuation">,</span>
      <span class="token string">" *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@version: V1"</span><span class="token punctuation">,</span>
      <span class="token string">"*/"</span><span class="token punctuation">,</span>
      <span class="token string">"interface ${2:接口名} {"</span><span class="token punctuation">,</span>
        <span class="token string">"fieldName ?: string"</span><span class="token punctuation">,</span>
      <span class="token string">"}"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Print a interface"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"Print to jsFunction"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prefix"</span><span class="token operator">:</span> <span class="token string">"pfun"</span><span class="token punctuation">,</span>
    <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"/*"</span><span class="token punctuation">,</span>
      <span class="token string">" *@description:${1:方法注释}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@author: tangzhaofeng"</span><span class="token punctuation">,</span>
      <span class="token string">" *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}"</span><span class="token punctuation">,</span>
      <span class="token string">" *@version: V1"</span><span class="token punctuation">,</span>
      <span class="token string">"*/"</span><span class="token punctuation">,</span>
      <span class="token string">"const ${2:方法名} = () => {}"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"输出一个方法模板"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="插件推荐" tabindex="-1"><a class="header-anchor" href="#插件推荐"><span>插件推荐</span></a></h2>
<p>所有插件的使用 以VS Code 为例</p>
<p>工欲善其事必先利其器，开发前端是一个非常有趣的过程，毕竟可以让我们能够真真切切地以可视化的形式看到自己的创作，当一个页面在自己的手上趋向完美时，往往就会油然而生一股自豪感和荣誉感。但是想要让自己的开发更加顺利，拥有一个更加爽快的开发体验，懂得使用辅助工具是十分重要的。</p>
<p>那么接下来笔者就会随着自己的开发而慢慢记录自己使用过的比较好用的插件在此文章</p>
<h3 id="prettier-code-formatter" tabindex="-1"><a class="header-anchor" href="#prettier-code-formatter"><span>Prettier - Code formatter</span></a></h3>
<p>首先当然是我们的代码格式化工具，代码格式化相信一直是一个让人头疼的问题，一片混乱的代码，即便是一座金山，也很难让人有心情攀登，所以一款能够自动在我们写完代码以后进行格式化，美化我们的代码的工具就显得尤为重要了，这显然也是我们做好编程的第一步。</p>
<p>那么笔者要推荐的这一款工具就是Prettier 插件了</p>
<p>只需要在插件库中搜索 Prettier 即可</p>
<p>安装完毕以后，我们可以在我们的项目目录下创建</p>
<p>.prettierrc文件</p>
<p>写以下配置</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span>
    // 代码结尾不加分号
    <span class="token string">"semi"</span><span class="token builtin class-name">:</span> <span class="token boolean">false</span> , 
    // 优先引号
    <span class="token string">"singleQuote"</span><span class="token builtin class-name">:</span> true,
    // 不添加尾随逗号
    <span class="token string">"trailingComma"</span><span class="token builtin class-name">:</span> <span class="token string">"none"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prettier-eslint-配置解决代码格式问题" tabindex="-1"><a class="header-anchor" href="#prettier-eslint-配置解决代码格式问题"><span>Prettier - ESLint 配置解决代码格式问题</span></a></h3>
<p>ESLint ：帮助我们检测代码，已达到代码规范</p>
<p>Prettier ： 帮助我们根据规范整理代码</p>
<p>我们需要配置Prettier根据符合ESLint规定的规范来整理代码</p>
<p>.prettierrc文件</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// 代码结尾不加分号</span>
    <span class="token property">"semi"</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">,</span> 
    <span class="token comment">// 优先引号</span>
    <span class="token property">"singleQuote"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 不添加尾随逗号</span>
    <span class="token property">"trailingComma"</span><span class="token operator">:</span> <span class="token string">"none"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在VSCode 中 ，勾选当我们保存文件时自动帮我们格式化文件</p>
<p>ESLint  与 Prettier 其实是有地方的设定是冲突的，比如说，ESLint 需要函数定义的时候函数名和()中间需要间隔一个空格，Prettier 格式化却不会这么做</p>
<p>这时我们就需要取消ESLint 的 函数名和()中间需要间隔一个空格 规则判断，具体操作应是到 .eslintrc.js中的rules中添加一个无视该规则</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code>'space-before-function-paren'<span class="token operator">:</span> 'off'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


