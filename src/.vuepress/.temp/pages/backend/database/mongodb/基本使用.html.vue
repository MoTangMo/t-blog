<template><div><h1 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用"><span>基本使用</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#%E5%AE%98%E7%BD%91">官网</a></li>
<li><a href="#MongoDB">MongoDB</a></li>
<li><a href="#MongoDB%E8%B7%9F%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%B9%E6%AF%94">MongoDB 跟关系型数据库对比</a></li>
<li><a href="#%E6%90%AD%E5%BB%BAMongoDB%E6%9C%8D%E5%8A%A1">搭建 MongoDB 服务</a>
<ul>
<li><a href="#%E5%AE%89%E8%A3%85%E5%8C%85%E4%B8%8B%E8%BD%BD">安装包下载</a></li>
<li><a href="#%E5%90%AF%E5%8A%A8MongoDB-%E6%9C%8D%E5%8A%A1">启动 MongoDB 服务</a></li>
<li><a href="#%E5%85%B3%E9%97%AD%E6%9C%8D%E5%8A%A1">关闭服务</a></li>
<li><a href="#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%BC%80%E5%90%AF%E6%9C%8D%E5%8A%A1">配置文件开启服务</a></li>
</ul>
</li>
<li><a href="#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AE%89%E8%A3%85">客户端安装</a>
<ul>
<li><a href="#%E6%89%A7%E8%A1%8C%E7%AE%80%E5%8D%95%E6%8C%87%E4%BB%A4">执行简单指令</a></li>
<li><a href="#%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4">常用命令</a></li>
</ul>
</li>
<li><a href="#%E5%AE%89%E5%85%A8%E8%AE%A4%E8%AF%81">安全认证</a>
<ul>
<li><a href="#%E5%88%9B%E5%BB%BA%E7%94%A8%E6%88%B7">创建用户</a></li>
<li><a href="#%E5%BC%80%E5%90%AF%E5%AE%89%E5%85%A8%E8%AE%A4%E8%AF%81">开启安全认证</a></li>
</ul>
</li>
<li><a href="#GUI%E5%B7%A5%E5%85%B7">GUI 工具</a></li>
<li><a href="#%E5%9F%BA%E6%9C%AC%E6%95%B0%E6%8D%AE%E6%93%8D%E4%BD%9C">基本数据操作</a>
<ul>
<li><a href="#%E6%96%B0%E5%BB%BA%E6%95%B0%E6%8D%AE%E5%BA%93">新建数据库</a></li>
<li><a href="#%E6%96%B0%E5%BB%BA%E9%9B%86%E5%90%88">新建集合</a></li>
<li><a href="#%E6%96%B0%E5%A2%9E%E6%95%B0%E6%8D%AE">新增数据</a></li>
<li><a href="#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE">查询数据</a>
<ul>
<li><a href="#%E6%AF%94%E8%BE%83%E8%BF%90%E7%AE%97%E7%AC%A6">比较运算符</a></li>
<li><a href="#%E9%80%BB%E8%BE%91%E8%BF%90%E7%AE%97%E7%AC%A6">逻辑运算符</a></li>
</ul>
</li>
<li><a href="#%E6%9B%B4%E6%96%B0%E6%95%B0%E6%8D%AE">更新数据</a></li>
<li><a href="#%E5%88%A0%E9%99%A4%E6%95%B0%E6%8D%AE">删除数据</a></li>
</ul>
</li>
<li><a href="#%E8%81%9A%E5%90%88%E6%93%8D%E4%BD%9C">聚合操作</a>
<ul>
<li><a href="#%E8%81%9A%E5%90%88%E7%AE%A1%E9%81%93">聚合管道</a></li>
<li><a href="#%E8%81%9A%E5%90%88%E7%AE%A1%E9%81%93%E4%B8%89%E8%A6%81%E7%B4%A0">聚合管道三要素</a></li>
<li><a href="#%E5%B8%B8%E7%94%A8%E7%9A%84%E7%AE%A1%E9%81%93%E8%81%9A%E5%90%88%E9%98%B6%E6%AE%B5">常用的管道聚合阶段</a>
<ul>
<li><a href="#match">$match</a></li>
<li><a href="#count">$count</a></li>
<li><a href="#group">$group</a>
<ul>
<li><a href="#accumulator%E6%93%8D%E4%BD%9C%E7%AC%A6">accumulator 操作符</a></li>
</ul>
</li>
<li><a href="#lookup">$lookup</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#SpringBoot-%E6%95%B4%E5%90%88-MongoDB">SpringBoot 整合 MongoDB</a>
<ul>
<li><a href="#%E5%88%9B%E5%BB%BA%E5%AE%9E%E4%BD%93%E7%B1%BB">创建实体类</a></li>
<li><a href="#%E6%B7%BB%E5%8A%A0%E6%96%87%E6%A1%A3">添加文档</a></li>
<li><a href="#%E6%9F%A5%E8%AF%A2%E6%96%87%E6%A1%A3">查询文档</a></li>
<li><a href="#%E6%9B%B4%E6%96%B0%E6%96%87%E6%A1%A3">更新文档</a></li>
<li><a href="#%E5%88%A0%E9%99%A4%E6%96%87%E6%A1%A3">删除文档</a></li>
</ul>
</li>
</ul>
<h3 id="官网" tabindex="-1"><a class="header-anchor" href="#官网"><span>官网</span></a></h3>
<p><a href="https://www.mongodb.com/docs" title="官网" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></p>
<h3 id="mongodb" tabindex="-1"><a class="header-anchor" href="#mongodb"><span>MongoDB</span></a></h3>
<ul>
<li>文档数据库-以 JSON 为数据模型</li>
<li>一款介于关系数据库和非关系数据库之间的产品</li>
</ul>
<h3 id="mongodb-跟关系型数据库对比" tabindex="-1"><a class="header-anchor" href="#mongodb-跟关系型数据库对比"><span>MongoDB 跟关系型数据库对比</span></a></h3>
<table>
<thead>
<tr>
<th>SQL</th>
<th>MongoDB</th>
</tr>
</thead>
<tbody>
<tr>
<td>数据库（database）</td>
<td>数据库（database）</td>
</tr>
<tr>
<td>表（table）</td>
<td>集合（collection）</td>
</tr>
<tr>
<td>行（row）</td>
<td>文档（document）</td>
</tr>
<tr>
<td>列（column）</td>
<td>字段（field）</td>
</tr>
<tr>
<td>索引（index）</td>
<td>索引（index）</td>
</tr>
<tr>
<td>主键（primary key）</td>
<td>字段 \_id</td>
</tr>
<tr>
<td>视图（view）</td>
<td>视图（view）</td>
</tr>
<tr>
<td>表连接（table join）</td>
<td>聚合操作（\$lookup）</td>
</tr>
</tbody>
</table>
<h3 id="搭建-mongodb-服务" tabindex="-1"><a class="header-anchor" href="#搭建-mongodb-服务"><span>搭建 MongoDB 服务</span></a></h3>
<p>MongoDB 的服务搭建还是非常简单的</p>
<p><a href="https://www.mongodb.com/try/download/community-kubernetes-operator" title="https://www.mongodb.com/try/download/community-kubernetes-operator" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/try/download/community-kubernetes-operator<ExternalLinkIcon/></a></p>
<h4 id="安装包下载" tabindex="-1"><a class="header-anchor" href="#安装包下载"><span>安装包下载</span></a></h4>
<p>可到该页面拿到对应的下载链接，选择合适自己的系统</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel8-8.0.0.tgz linux版本下载安装包
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果下载过程中出现无法建立 SSL 连接的情况可以设置参数跳过 SSL 连接检查</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code> <span class="token function">wget</span> https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel8-8.0.0.tgz --no-check-certificate 跳过SSL连接检查
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下载完成后解压</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>tar <span class="token operator">-</span>zxvf mongodb<span class="token operator">-</span>linux<span class="token operator">-</span>x86_64<span class="token operator">-</span>rhel8<span class="token operator">-</span><span class="token number">8.0</span><span class="token number">.0</span><span class="token punctuation">.</span>tgz 解压mongdb压缩包
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="启动-mongodb-服务" tabindex="-1"><a class="header-anchor" href="#启动-mongodb-服务"><span>启动 MongoDB 服务</span></a></h4>
<p>我们只需要进入 MongoDB 提供的 bin 目录</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> mongodb-linux-x86_64-rhel88-8.0.0/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会看到有 3 个可运行程序</p>
<ul>
<li>install_compass</li>
<li>mongod mongodb 服务的运行程序</li>
<li>mongos mongodb 分片集群相关的运行程序</li>
</ul>
<p>创建日志和数据存储的文件夹,这样便于我们后面可以更加方便的查看日志和数据</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mongodb/data /mongodb/log

 <span class="token function">touch</span> /mongodb/log/mongodb.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然也可以参考进行 yum 的安装</p>
<p><a href="https://www.mongodb.com/zh-cn/docs/manual/tutorial/install-mongodb-on-red-hat/" title="https://www.mongodb.com/zh-cn/docs/manual/tutorial/install-mongodb-on-red-hat/" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/zh-cn/docs/manual/tutorial/install-mongodb-on-red-hat/<ExternalLinkIcon/></a></p>
<p>万事俱备，可以开启服务了</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>
bin/mongod <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">27017</span> <span class="token parameter variable">--dbpath</span><span class="token operator">=</span>/mongodb/data <span class="token parameter variable">--logpath</span><span class="token operator">=</span>/mongodb/log/mongodb.log <span class="token parameter variable">--bind_ip</span><span class="token operator">=</span><span class="token number">0.0</span>.0.0 <span class="token parameter variable">--fork</span> 开启服务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有几个参数我们需要认识</p>
<ul>
<li>—dbpath 指定数据文件存放位置</li>
<li>—logpath 指定日志文件存放位置</li>
<li>—logappend 使用追加的方式记录日志</li>
<li>—port 端口 默认 27017</li>
<li>—bind_ip 绑定 ip</li>
<li>—fork 后台启动</li>
<li>—auth 开启认证模式</li>
</ul>
<h4 id="关闭服务" tabindex="-1"><a class="header-anchor" href="#关闭服务"><span>关闭服务</span></a></h4>
<p>关闭服务只需要—showdown 即可</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>
bin/mongod <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">27017</span> <span class="token parameter variable">--dbpath</span><span class="token operator">=</span>/mongodb/data <span class="token parameter variable">--logpath</span><span class="token operator">=</span>/mongodb/log/mongodb.log <span class="token parameter variable">--bind_ip</span><span class="token operator">=</span><span class="token number">0.0</span>.0.0 <span class="token parameter variable">--fork</span> <span class="token parameter variable">--shutdown</span> 关闭服务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置文件开启服务" tabindex="-1"><a class="header-anchor" href="#配置文件开启服务"><span>配置文件开启服务</span></a></h4>
<p>当然，如何觉得这样开启服务太不方便了，可以将配置存储到配置文件当中，通过配置文件启动 mongodb</p>
<p>创建配置文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">touch</span> /mongodb/conf/mongod.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>写入配置</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">systemLog</span><span class="token punctuation">:</span>
  <span class="token key atrule">destination</span><span class="token punctuation">:</span> file
  <span class="token key atrule">path</span><span class="token punctuation">:</span> /mongodb/log/mongod.log
  <span class="token key atrule">logAppend</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">storage</span><span class="token punctuation">:</span>
  <span class="token key atrule">dbPath</span><span class="token punctuation">:</span> /mongodb/data
  <span class="token key atrule">engine</span><span class="token punctuation">:</span> wiredTiger <span class="token comment">#存储引擎</span>
<span class="token key atrule">net</span><span class="token punctuation">:</span>
  <span class="token key atrule">bindIp</span><span class="token punctuation">:</span> 0.0.0.0
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">27017</span>
<span class="token key atrule">processManagement</span><span class="token punctuation">:</span>
  <span class="token key atrule">fork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开启服务</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>bin/mongod <span class="token parameter variable">-f</span> /mongodb/conf/mongod.conf 开启服务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="客户端安装" tabindex="-1"><a class="header-anchor" href="#客户端安装"><span>客户端安装</span></a></h3>
<p>服务是搭建好了，接下来可以下载 mongodb shell 这个 Mongodb 提供的客户端进行服务端连接与交互了</p>
<p>同样的到官网获取下载链接</p>
<p><a href="https://www.mongodb.com/try/download/shell" title="https://www.mongodb.com/try/download/shell" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/try/download/shell<ExternalLinkIcon/></a></p>
<p>执行指令</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://downloads.mongodb.com/compass/mongosh-2.3.1-linux-x64.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解压压缩包</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> mongosh-2.3.1-linux-x64.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来执行 mongosh 即可</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>bin/mongosh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中 —host 可以指定连接 IP </p>
<h4 id="执行简单指令" tabindex="-1"><a class="header-anchor" href="#执行简单指令"><span>执行简单指令</span></a></h4>
<p>我们可以执行 show dbs 查看数据库信息</p>
<p>执行 show tables 查看集合信息</p>
<p>执行 db.system.version.find()查看 mongodb 的版本信息</p>
<p>可以发现的我们执行 db.system.version.find()就像我们面向对象编程一样 xx.xx.xx()执行一个方法</p>
<h4 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h4>
<table>
<thead>
<tr>
<th>命令</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>`show dbs`</td>
<td>显示所有数据库列表</td>
</tr>
<tr>
<td>`use &lt;database&gt;`</td>
<td>切换到指定数据库</td>
</tr>
<tr>
<td>`db`</td>
<td>显示当前数据库</td>
</tr>
<tr>
<td>`show collections`</td>
<td>显示当前数据库中的所有集合（collection）</td>
</tr>
<tr>
<td>`db.createCollection(name, options)`</td>
<td>在当前数据库中创建一个新的集合</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.insertOne(document)`</td>
<td>向集合中插入一个文档</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.insertMany([documents])`</td>
<td>向集合中插入多个文档</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.find(query, projection)`</td>
<td>从集合中查询文档，可以指定查询条件和投影（返回的字段）</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.findOne(query, projection)`</td>
<td>从集合中查询一个文档，可以指定查询条件和投影</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.updateOne(filter, update, options)`</td>
<td>更新集合中的单个文档</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.updateMany(filter, update, options)`</td>
<td>更新集合中的多个文档</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.replaceOne(filter, replacement, options)`</td>
<td>替换集合中的单个文档</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.deleteOne(filter, options)`</td>
<td>删除集合中的一个文档</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.deleteMany(filter, options)`</td>
<td>删除集合中的多个文档</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.countDocuments(query)`</td>
<td>计算符合查询条件的文档数量</td>
</tr>
<tr>
<td>`db.dropDatabase()`</td>
<td>删除当前数据库</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.drop()`</td>
<td>删除当前数据库中的集合</td>
</tr>
<tr>
<td>`db.stats()`</td>
<td>显示当前数据库的统计信息</td>
</tr>
<tr>
<td>`db.&lt;collection&gt;.stats()`</td>
<td>显示当前集合的统计信息</td>
</tr>
<tr>
<td>`db.getMongo()`</td>
<td>显示当前数据库的连接信息</td>
</tr>
<tr>
<td>`db.serverStatus()`</td>
<td>显示 MongoDB 服务器的当前状态</td>
</tr>
<tr>
<td>`db.version()`</td>
<td>显示 MongoDB 服务器的版本信息</td>
</tr>
</tbody>
</table>
<h3 id="安全认证" tabindex="-1"><a class="header-anchor" href="#安全认证"><span>安全认证</span></a></h3>
<h4 id="创建用户" tabindex="-1"><a class="header-anchor" href="#创建用户"><span>创建用户</span></a></h4>
<p>Mongodb 也是有提供安全认证的，安全认证的信息就存储在 admin 这个集合中，当我们输入以下命令时，可以获取到 Mongodb 提供的所有的角色</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>use admin


show roles

-- 结果
<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    role: <span class="token string">'dbOwner'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'__queryableBackup'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'userAdmin'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'readWriteAnyDatabase'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'enableSharding'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'directShardOperations'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'readWrite'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'clusterManager'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'readAnyDatabase'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'__system'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'root'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'read'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'dbAdminAnyDatabase'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'clusterMonitor'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'dbAdmin'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'userAdminAnyDatabase'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'restore'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'backup'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'hostManager'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    role: <span class="token string">'clusterAdmin'</span>,
    db: <span class="token string">'admin'</span>,
    isBuiltin: true,
    roles: <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    inheritedRoles: <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么基于这些角色，我们可以使用 db.createUser()命令来创建用户</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token property">user</span><span class="token operator">:</span><span class="token string">"tang"</span><span class="token punctuation">,</span><span class="token property">pwd</span><span class="token operator">:</span><span class="token string">"tang"</span><span class="token punctuation">,</span><span class="token property">roles</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"userAdmin"</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span> 创建用户语句
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然我们平时使用的时候不会直接赋予用户 Admin 角色的，如果是只是给用户对应的 DB 权限，可以到对应的 DB，然后给用户 dbOwner 权限</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>use appdb

db<span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token property">user</span><span class="token operator">:</span><span class="token string">"tang"</span><span class="token punctuation">,</span><span class="token property">pwd</span><span class="token operator">:</span><span class="token string">"tang"</span><span class="token punctuation">,</span><span class="token property">roles</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"dbOwner"</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="开启安全认证" tabindex="-1"><a class="header-anchor" href="#开启安全认证"><span>开启安全认证</span></a></h4>
<p>我们只需要在启动服务的时候添加—auth 参数，表示启动安全认证就行了</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>bin/mongod <span class="token parameter variable">-f</span> /mongodb/conf/mongod.conf <span class="token parameter variable">--auth</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在使用 mongosh 进行客户端连接的时候通过—username —password 来输入对应的用户名密码即可</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>mongosh <span class="token parameter variable">--username</span> tang <span class="token parameter variable">--password</span> tang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="gui-工具" tabindex="-1"><a class="header-anchor" href="#gui-工具"><span>GUI 工具</span></a></h2>
<p>MongoDB 提供了非常不错的 GUI 工具来协助我们进行 Mongodb 的数据操作，以下是下载地址</p>
<p><a href="https://www.mongodb.com/try/download/compass" title="https://www.mongodb.com/try/download/compass" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/try/download/compass<ExternalLinkIcon/></a></p>
<h2 id="基本数据操作" tabindex="-1"><a class="header-anchor" href="#基本数据操作"><span>基本数据操作</span></a></h2>
<h3 id="新建数据库" tabindex="-1"><a class="header-anchor" href="#新建数据库"><span>新建数据库</span></a></h3>
<p>Mongodb 中，使用 use + 数据库名是指有数据库则使用数据库，没有的话就创建一个该命名的数据库，使用起来还是非常方便的</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>use test_db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="新建集合" tabindex="-1"><a class="header-anchor" href="#新建集合"><span>新建集合</span></a></h3>
<p>跟 SQL 一样的是，我们需要先创建库，再创建表，在 mangodb 中就是集合，才能插入数据</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span><span class="token function">createCollection</span><span class="token punctuation">(</span><span class="token string">"test_collection"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="新增数据" tabindex="-1"><a class="header-anchor" href="#新增数据"><span>新增数据</span></a></h3>
<p>MongoDB 新增数据是以 JSON 的格式新增的，而且调用的方式跟我们面向对象编程的方式是一样的，db.集合名.insert(JSON 数据)</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code><span class="token comment">// 插入单条数据</span>
db<span class="token punctuation">.</span>test_collection<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">"id"</span><span class="token operator">:</span><span class="token string">"1"</span><span class="token punctuation">,</span><span class="token string-property property">"name"</span><span class="token operator">:</span><span class="token string">"zs"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//查询结果</span>
<span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'67054659b320d640c7964033'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">id</span><span class="token operator">:</span> <span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'zs'</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment">//插入多条数据</span>
db<span class="token punctuation">.</span>test_collection<span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string-property property">"id"</span><span class="token operator">:</span><span class="token string">"3"</span><span class="token punctuation">,</span><span class="token string-property property">"name"</span><span class="token operator">:</span><span class="token string">"ww"</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token string-property property">"id"</span><span class="token operator">:</span><span class="token string">"2"</span><span class="token punctuation">,</span><span class="token string-property property">"name"</span><span class="token operator">:</span><span class="token string">"ls"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">//查询结果</span>
<span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'67054659b320d640c7964033'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">id</span><span class="token operator">:</span> <span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'zs'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'67054718b320d640c7964034'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">id</span><span class="token operator">:</span> <span class="token string">'3'</span><span class="token punctuation">,</span> <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'ww'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'67054718b320d640c7964035'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">id</span><span class="token operator">:</span> <span class="token string">'2'</span><span class="token punctuation">,</span> <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'ls'</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而且对于 MongoDB 来说，我们可以随时增加一个字段</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span>test_collection<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">"id"</span><span class="token operator">:</span><span class="token string">"4"</span><span class="token punctuation">,</span><span class="token string-property property">"name"</span><span class="token operator">:</span><span class="token string">"ll"</span><span class="token punctuation">,</span><span class="token string-property property">"sex"</span><span class="token operator">:</span><span class="token string">"man"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//查询结果</span>
<span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'67054659b320d640c7964033'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">id</span><span class="token operator">:</span> <span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'zs'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'67054718b320d640c7964034'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">id</span><span class="token operator">:</span> <span class="token string">'3'</span><span class="token punctuation">,</span> <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'ww'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'67054718b320d640c7964035'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">id</span><span class="token operator">:</span> <span class="token string">'2'</span><span class="token punctuation">,</span> <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'ls'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'67054779b320d640c7964036'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">id</span><span class="token operator">:</span> <span class="token string">'4'</span><span class="token punctuation">,</span>
    <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'ll'</span><span class="token punctuation">,</span>
    <span class="token property">sex</span><span class="token operator">:</span> <span class="token string">'man'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想数据保持不丢失，那么我们需要通过 wirteConcern 的 j 设置为 true 保证每次写入数据都要对数据进行持久化，也可以 wirteConcern 的 w 参数设置同步节点</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span>test_collection<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">"id"</span><span class="token operator">:</span><span class="token string">"4"</span><span class="token punctuation">,</span><span class="token string-property property">"name"</span><span class="token operator">:</span><span class="token string">"ll"</span><span class="token punctuation">,</span><span class="token string-property property">"sex"</span><span class="token operator">:</span><span class="token string">"man"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>
  <span class="token property">wirteConcern</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">w</span><span class="token operator">:</span><span class="token string">"majority"</span><span class="token punctuation">,</span><span class="token property">j</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token property">wtimeout</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然想知道更多的指令,可以通过 db.test_collection.help()方法来查看</p>
<h3 id="查询数据" tabindex="-1"><a class="header-anchor" href="#查询数据"><span>查询数据</span></a></h3>
<p>查询数据也是非常简单的，通过 db.集合名.find()可以查询到以 20 为页的数据，可以通过输入 it 来进行翻页浏览</p>
<p>等值条件查询的话需要配合 json 数据才可以进行查询，比如以下语句是查询 id 为 3 的数据</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span>test_collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string-property property">"id"</span><span class="token operator">:</span><span class="token string">"3"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符"><span>比较运算符</span></a></h4>
<p>这只是等值查询，那如果是大于，小于这种呢？我们需要配合 mongodb 提供我们的特殊运算符一起使用才可以</p>
<table>
<thead>
<tr>
<th>运算符</th>
<th>MQL</th>
</tr>
</thead>
<tbody>
<tr a:1="">
<td>a=1</td>
<td></td>
</tr>
<tr>
<td>a &lt;&gt; 1</td>
<td>{a:{\$ne : 1}}</td>
</tr>
<tr>
<td>a &gt; 1</td>
<td>{a:{\$gt:1}}</td>
</tr>
<tr>
<td>a&gt;=1</td>
<td>{a: {\$gte : 1}}</td>
</tr>
<tr>
<td>a&lt;1</td>
<td>{a:{\$lt : 1}}</td>
</tr>
<tr>
<td>a&lt;=1</td>
<td>{a: { \$lte : 1}}</td>
</tr>
</tbody>
</table>
<h4 id="逻辑运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符"><span>逻辑运算符</span></a></h4>
<p>除了比较，我们一般还会将比较条件合并成复合条件，比如 a=1 和 b =1 类似的条件，在 SQL 中就是 AND 和 OR，在 MongoDB 我们仍然是需要配置成 json 的方式</p>
<table>
<thead>
<tr>
<th>运算符</th>
<th>MQL</th>
</tr>
</thead>
<tbody>
<tr>
<td>a=1 AND b=1</td>
<td>{\$and:\[{a : 1 , b : 1 }]}</td>
</tr>
<tr>
<td>a = 1 OR b = 1</td>
<td>{\$or : \[{a : 1 , b : 1 }]}</td>
</tr>
<tr>
<td>a IS NULL</td>
<td>{a : {\$exists : false}}</td>
</tr>
<tr>
<td>a IN (1,2,3 )</td>
<td>{a : {\$in : \[1,2,3]}}</td>
</tr>
</tbody>
</table>
<p>当然分页 limit</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span>people<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>排序 sort()</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token property">age</span> <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token property">posts</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新数据" tabindex="-1"><a class="header-anchor" href="#更新数据"><span>更新数据</span></a></h3>
<p>更新数据可以通过$set 来进行数据设置</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span>people<span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span>
   <span class="token punctuation">{</span> <span class="token property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property"><span class="token keyword">$gt</span></span><span class="token operator">:</span> <span class="token number">25</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token property"><span class="token keyword">$set</span></span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">status</span><span class="token operator">:</span> <span class="token string">"C"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一种可以是可以使用 findAndModify()方法进行更新</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span>books<span class="token punctuation">.</span><span class="token function">findAndModify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

  <span class="token property">query</span><span class="token operator">:</span><span class="token punctuation">{</span>条件json<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">update</span><span class="token operator">:</span><span class="token punctuation">{</span>更新方式<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">new</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">//是否返回最新值，如果不填true返回的是旧值</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除数据" tabindex="-1"><a class="header-anchor" href="#删除数据"><span>删除数据</span></a></h3>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span>people<span class="token punctuation">.</span><span class="token function">deleteMany</span><span class="token punctuation">(</span> <span class="token punctuation">{</span> <span class="token property">status</span><span class="token operator">:</span> <span class="token string">"D"</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当然也可以通过 findOneAndDelete()删除一项符合条件的数据，而且该方法是有序删除，意味着我们可以通过该方法实现队列先进先出的效果</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>db<span class="token punctuation">.</span>books<span class="token punctuation">.</span><span class="token function">finndOneAndDelete</span><span class="token punctuation">(</span>条件json<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Mongodb 提供了非常多的操作数据的方法，详细的可以看官网，官网提供了很多的示例，也提供了 SQL 和 MongoDB 的对比，非常方便记忆</p>
<p><a href="https://www.mongodb.com/zh-cn/docs/manual/reference/sql-comparison/" title="https://www.mongodb.com/zh-cn/docs/manual/reference/sql-comparison/" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/zh-cn/docs/manual/reference/sql-comparison/<ExternalLinkIcon/></a></p>
<h2 id="聚合操作" tabindex="-1"><a class="header-anchor" href="#聚合操作"><span>聚合操作</span></a></h2>
<h4 id="聚合管道" tabindex="-1"><a class="header-anchor" href="#聚合管道"><span>聚合管道</span></a></h4>
<p>聚合管道是 Mongodb 中用于数据聚合和处理的强大工具。它允许开发者通过一系列有序的阶段（Stages）对数据进行筛选、转换、分组和计算，从而生成符合需求的聚合结果。每个阶段都定义了一种操作，数据在每个阶段经过处理后，传递给下一个阶段，最终得到所需的聚合结果。</p>
<p>其实效果跟我们使用 SQL 中的 join on ，group by，sort by 是一样的，而聚合管道的核心原理是基于流水线处理模式。数据从输入开始，依次流经每个阶段，每个阶段都执行特定的操作，并将处理后的数据传递给下一个阶段。</p>
<figure><img src="@source/backend/database/mongodb/image/image_o9KlXNmr2B.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="聚合管道三要素" tabindex="-1"><a class="header-anchor" href="#聚合管道三要素"><span>聚合管道三要素</span></a></h4>
<p>1. 流水线处理</p>
<p>聚合管道采用流水线处理模式，这意味着数据从输入开始，通过一个接一个的阶段（Stages）进行处理，直到达到最终输出。每个阶段都负责执行特定的操作，如筛选、分组、排序等。</p>
<p>2. 阶段（Stages）</p>
<p>聚合管道由多个阶段组成，每个阶段都定义了对数据执行的操作。这些阶段是有序的，数据按照定义的顺序流经每个阶段。每个阶段都可以使用不同的操作符来执行不同的操作。</p>
<p>3. 操作符（Operators）</p>
<p>操作符是定义在聚合管道阶段中的指令，它们告诉 MongoDB 如何处理数据。例如，match 操作符用于筛选文档， group 操作符用于将文档分组</p>
<p>下面的图示将 Mongodb 拆分得非常仔细了，不过最好还是到官网翻一翻，官网提供的 SQL+MongoDB 的对比理解真的可以帮助我们更快地学习这部分内容的：</p>
<p><a href="https://www.mongodb.com/zh-cn/docs/manual/reference/operator/aggregation-pipeline/" title="https://www.mongodb.com/zh-cn/docs/manual/reference/operator/aggregation-pipeline/" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/zh-cn/docs/manual/reference/operator/aggregation-pipeline/<ExternalLinkIcon/></a></p>
<figure><img src="@source/backend/database/mongodb/image/image_GgJLycTyj9.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="常用的管道聚合阶段" tabindex="-1"><a class="header-anchor" href="#常用的管道聚合阶段"><span>常用的管道聚合阶段</span></a></h4>
<table>
<thead>
<tr>
<th>MongoDB 聚合阶段/表达式</th>
<th>描述</th>
<th>SQL 对应操作</th>
</tr>
</thead>
<tbody>
<tr>
<td>`$group`</td>
<td>将集合中的文档分组，用于统计结果</td>
<td>`GROUP BY`</td>
</tr>
<tr>
<td>`$match`</td>
<td>过滤数据，只输出符合条件的文档</td>
<td>`WHERE`</td>
</tr>
<tr>
<td>`$project`</td>
<td>修改输入文档的结构，选择、重命名、增加或删除字段</td>
<td>`SELECT`</td>
</tr>
<tr>
<td>`$lookup`</td>
<td>左外连接</td>
<td>`LEFT OUTER JOIN`</td>
</tr>
<tr>
<td>`$sort`</td>
<td>将输入文档排序后输出</td>
<td>`ORDER BY`</td>
</tr>
<tr>
<td>`$limit`</td>
<td>限制聚合管道返回的文档数</td>
<td>`LIMIT`</td>
</tr>
<tr>
<td>`$skip`</td>
<td>跳过指定数量的文档，返回余下的文档</td>
<td>`OFFSET`</td>
</tr>
<tr>
<td>`$sum`</td>
<td>计算总和</td>
<td>`SUM`</td>
</tr>
<tr>
<td>`$avg`</td>
<td>计算平均值</td>
<td>`AVG`</td>
</tr>
<tr>
<td>`$min`</td>
<td>获取最小值</td>
<td>`MIN`</td>
</tr>
<tr>
<td>`$max`</td>
<td>获取最大值</td>
<td>`MAX`</td>
</tr>
<tr>
<td>`$push`</td>
<td>在结果文档中插入值到一个数组中</td>
<td>-（SQL 中没有直接对应操作，通常需要结合`GROUP BY`和聚合函数使用）</td>
</tr>
</tbody>
</table>
<p>使用起来也是基于 json 格式来使用的，xx.xx.aggregate([$stage1 , $stage2 ... ])</p>
<h5 id="match" tabindex="-1"><a class="header-anchor" href="#match"><span>$match</span></a></h5>
<p>跟 where 很相似，$match 是用于对文档进行条件筛选</p>
<p>在使用的时候，可以尽量将$match 提到前面去，这样一是可以在后面的管道操作里面尽量对更少的数据进行处理，二是如果在投射和分组之前执行$match，查询会使用到索引</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code><span class="token comment">// 找到category为科普的book数据</span>
db<span class="token punctuation">.</span>book<span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property"><span class="token keyword">$match</span></span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">category</span><span class="token operator">:</span><span class="token string">"科普"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="count" tabindex="-1"><a class="header-anchor" href="#count"><span>$count</span></a></h5>
<p>计数并返回查询匹配的结果树</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code><span class="token comment">// 返回category为科普且计算其总数赋值给kepu_total</span>
db<span class="token punctuation">.</span>book<span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property"><span class="token keyword">$match</span></span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">category</span><span class="token operator">:</span><span class="token string">"科普"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token property"><span class="token keyword">$count</span></span><span class="token operator">:</span> <span class="token string">"kepu_total"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="group" tabindex="-1"><a class="header-anchor" href="#group"><span>$group</span></a></h5>
<p>按指定的表达式对文档进行分组，并将每个不同分组的文档输出到下一个阶段。</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code><span class="token punctuation">{</span> <span class="token property"><span class="token keyword">$group</span></span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token operator">&lt;</span>expression<span class="token operator">></span><span class="token punctuation">,</span> <span class="token operator">&lt;</span>field1<span class="token operator">></span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token operator">&lt;</span>accumulator1<span class="token operator">></span> <span class="token operator">:</span> <span class="token operator">&lt;</span>expression1<span class="token operator">></span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> 语法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>_id 字段是必填的;但是，可以指定_id 值为 null 来为整个输入文档计算累计值。</li>
<li>剩余的计算字段是可选的，并使用&lt;accumulator&gt;运算符进行计算。</li>
<li>_id 和&lt;accumulator&gt;表达式可以接受任何有效的表达式。</li>
</ul>
<p>另外，group 阶段的内存限制为 100M。默认情况下，如果 stage 超过此限制，group 将产生错误。但是，要允许处理大型数据集，请将 allowDiskUse 选项设置为 true 以启用$group 操作以写入临时文件。</p>
<h6 id="accumulator-操作符" tabindex="-1"><a class="header-anchor" href="#accumulator-操作符"><span>accumulator 操作符</span></a></h6>
<table>
<thead>
<tr>
<th>MongoDB accumulator 操作符</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>`$sum`</td>
<td>计算分组内值的总和。</td>
</tr>
<tr>
<td>`$avg`</td>
<td>计算分组内值的平均值。</td>
</tr>
<tr>
<td>`$first`</td>
<td>从分组中的文档获取第一个值。</td>
</tr>
<tr>
<td>`$last`</td>
<td>从分组中的文档获取最后一个值。</td>
</tr>
<tr>
<td>`$max`</td>
<td>获取分组内的最大值。</td>
</tr>
<tr>
<td>`$min`</td>
<td>获取分组内的最小值。</td>
</tr>
<tr>
<td>`$push`</td>
<td>将分组内的值添加到一个数组中。</td>
</tr>
<tr>
<td>`$addToSet`</td>
<td>将分组内的值添加到一个集合中，确保集合中的值是唯一的。</td>
</tr>
<tr>
<td>`$stdDevPop`</td>
<td>计算分组内值的总体标准偏差。</td>
</tr>
<tr>
<td>`$stdDevSamp`</td>
<td>计算分组内值的样本标准偏差。</td>
</tr>
</tbody>
</table>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code><span class="token comment">// 不对字段分组，并计算总数和price的平均值</span>
db<span class="token punctuation">.</span>book<span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property"><span class="token keyword">$group</span></span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">_id</span><span class="token operator">:</span><span class="token keyword">null</span> <span class="token punctuation">,</span> <span class="token property">count</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property"><span class="token keyword">$sum</span></span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token property">avg</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property"><span class="token keyword">$avg</span></span><span class="token operator">:</span><span class="token string">"$price"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code><span class="token comment">// 根据category进行分组计算总数和price的平均数</span>
db<span class="token punctuation">.</span>book<span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property"><span class="token keyword">$group</span></span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">_id</span><span class="token operator">:</span><span class="token string">"$category"</span> <span class="token punctuation">,</span> <span class="token property">count</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property"><span class="token keyword">$sum</span></span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token property">avg</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property"><span class="token keyword">$avg</span></span><span class="token operator">:</span><span class="token string">"$price"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="lookup" tabindex="-1"><a class="header-anchor" href="#lookup"><span>$lookup</span></a></h5>
<p>每个输入待处理的文档，经过$lookup 阶段的处理，输出的新文档中会包含一个新生成的数组（可根据需要命名新 key ）。数组列存放的数据是来自被 Join 集合的适配文档，如果没有，集合为空（即 为[ ])</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code> db<span class="token punctuation">.</span>collection<span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span>
   <span class="token property"><span class="token keyword">$lookup</span></span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token property">from</span><span class="token operator">:</span> <span class="token string">"&lt;collection to join>"</span><span class="token punctuation">,</span>
   <span class="token property">localField</span><span class="token operator">:</span> <span class="token string">"&lt;field from the input documents>"</span><span class="token punctuation">,</span>
   <span class="token property">foreignField</span><span class="token operator">:</span> <span class="token string">"&lt;field from the documents of the from collection>"</span><span class="token punctuation">,</span>
   <span class="token property">as</span><span class="token operator">:</span> <span class="token string">"&lt;output array field>"</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span> 语法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>from 同一个数据库下等待被 Join 的集合</li>
<li>localField 源集合中的 match 值，如果输入的集合中，某文档没有 localField 这个 Key（Field），在处理的过程中，会默认为此文档含有 localField：null 的键值对</li>
<li>foreignField 待 Join 的集合的 match 值，如果待 Join 的集合中，文档没有 foreignField 值，在处理的过程中，会默认为此文档含有 foreignField：null 的键值对。</li>
<li>as 为输出文档的新增值命名。如果输入的集合中已存在该值，则会覆盖掉</li>
</ul>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code><span class="token comment">// join order on book.id = order.bookId</span>
db<span class="token punctuation">.</span>book<span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property"><span class="token keyword">$lookup</span></span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">from</span><span class="token operator">:</span> <span class="token string">"order"</span> <span class="token punctuation">,</span> <span class="token property">localField</span><span class="token operator">:</span> <span class="token string">"_id"</span> <span class="token punctuation">,</span> <span class="token property">foreignField</span> <span class="token operator">:</span> <span class="token string">"bookId"</span> <span class="token punctuation">,</span> <span class="token property">as</span><span class="token operator">:</span><span class="token string">"o"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>更多的可以自行查看文档，Mongodb 的文档还是非常不错的</p>
<p><a href="https://www.mongodb.com/zh-cn/docs/manual/reference/operator/aggregation-pipeline/" title="https://www.mongodb.com/zh-cn/docs/manual/reference/operator/aggregation-pipeline/" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/zh-cn/docs/manual/reference/operator/aggregation-pipeline/<ExternalLinkIcon/></a></p>
<h2 id="springboot-整合-mongodb" tabindex="-1"><a class="header-anchor" href="#springboot-整合-mongodb"><span>SpringBoot 整合 MongoDB</span></a></h2>
<p>SpringBoot 对 MongoDB 有着不错的支持，所以整合 MongoDB 也是比较简单的，首先我们先开启 SpringBoot 提供的 mongodb 的 starter</p>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-mongodb<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置 mongodb 信息</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">data</span><span class="token punctuation">:</span>
    <span class="token key atrule">mongodb</span><span class="token punctuation">:</span>
    <span class="token key atrule">uri</span><span class="token punctuation">:</span> mongodb<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span>27017/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>连接格式如下：mongodb+srv://[username:password@]host[/[defaultauthdb][?options]]</p>
<p>具体的可看官网:<a href="https://www.mongodb.com/zh-cn/docs/manual/reference/connection-string/" title="https://www.mongodb.com/zh-cn/docs/manual/reference/connection-string/" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/zh-cn/docs/manual/reference/connection-string/<ExternalLinkIcon/></a></p>
<p>接下来我们就可以使用 SpringBoot 提供的 MongoTemplate 就行了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MongoTemplate</span> mongoTemplate<span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testCollection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> exists <span class="token operator">=</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">collectionExists</span><span class="token punctuation">(</span><span class="token string">"book"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>exists<span class="token punctuation">)</span><span class="token punctuation">{</span>
            mongoTemplate<span class="token punctuation">.</span><span class="token function">dropCollection</span><span class="token punctuation">(</span><span class="token string">"book"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        mongoTemplate<span class="token punctuation">.</span><span class="token function">createCollection</span><span class="token punctuation">(</span><span class="token string">"book"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建实体类" tabindex="-1"><a class="header-anchor" href="#创建实体类"><span>创建实体类</span></a></h3>
<p>跟使用 Mybatis 一样，我们要创建一个实体类和数据库中我们定义的数据属性进行关系映射</p>
<ul>
<li>Document 指定文档名称</li>
<li>@Id 指定 Id 属性</li>
<li>@Field 指定字段名称</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span><span class="token string">"book"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Books</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span><span class="token string">"bookName"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> bookName<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span><span class="token string">"description"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span><span class="token string">"author"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span><span class="token string">"category"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span><span class="token string">"price"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Double</span> price<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加文档" tabindex="-1"><a class="header-anchor" href="#添加文档"><span>添加文档</span></a></h3>
<p>紧接着就可以写 Dao 层了，跟 Mybatis 一样，只需要调用提供的 insert API 就可以实现插入数据或者批量插入数据了</p>
<p>使用 save 也可以实现保存数据，但是 insert 可以一次性插入数据，而 save 会先遍历所有数据，再一个一个插入数据</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * @Description 保存
     * @Author T
     * @Date 2024/10/19 15:25
     **/</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveBook</span><span class="token punctuation">(</span><span class="token class-name">Books</span> books<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mongoTemplate<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>books<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * @Description 批量保存
     * @Author T
     * @Date 2024/10/19 15:25
     **/</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveBookList</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Books</span><span class="token punctuation">></span></span> books<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mongoTemplate<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>books<span class="token punctuation">,</span> <span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询文档" tabindex="-1"><a class="header-anchor" href="#查询文档"><span>查询文档</span></a></h3>
<p>首先是基础查询，即没有带条件的查询</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * @Description 查询所有
     * @Author T
     **/</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Books</span><span class="token punctuation">></span></span> <span class="token function">selectList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * @Description 查询一条记录
     * @Author T
     **/</span>
    <span class="token keyword">public</span> <span class="token class-name">Books</span> <span class="token function">selectOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
     <span class="token doc-comment comment">/**
     * @Description 根据ID查询记录
     * @Author T
     **/</span>
    <span class="token keyword">public</span> <span class="token class-name">Books</span> <span class="token function">selectById</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> <span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>条件查询的话就需要 Criteria 这个接口将单个或多个条件组合一起，一起进行查询</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>     <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Books</span><span class="token punctuation">></span></span> <span class="token function">selectByCondition</span><span class="token punctuation">(</span><span class="token class-name">Books</span> books<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token class-name">Query</span> query <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">ObjectUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>books<span class="token punctuation">.</span><span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
             <span class="token comment">//基于正则模糊查询</span>
             query<span class="token punctuation">.</span><span class="token function">addCriteria</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"author"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">regex</span><span class="token punctuation">(</span>books<span class="token punctuation">.</span><span class="token function">getAuthor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">ObjectUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>books<span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
             <span class="token comment">//查询price大于books.getPrice()的数据</span>
             query<span class="token punctuation">.</span><span class="token function">addCriteria</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"price"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">gt</span><span class="token punctuation">(</span>books<span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token comment">//查询price大于等于40的数据</span>
             <span class="token comment">// query.addCriteria(Criteria.where("price").gte(40));</span>
         <span class="token punctuation">}</span>
        <span class="token keyword">return</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> <span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要联合条件的话，我们就需要通过 Criteria 的 andOperator 或者 orOperator 构建 Criteria 了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>     <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Books</span><span class="token punctuation">></span></span> <span class="token function">selectByCondition</span><span class="token punctuation">(</span><span class="token class-name">Books</span> books<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token class-name">Query</span> query <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">Criteria</span> criteria <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Criteria</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">//查询author 包含Bruce 且 price >= 40的数据</span>
         criteria<span class="token punctuation">.</span><span class="token function">andOperator</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"author"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">regex</span><span class="token punctuation">(</span><span class="token string">"Bruce"</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"price"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">gte</span><span class="token punctuation">(</span><span class="token number">40.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> <span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然还有排序，也可以通过 Query.with 进行配置</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Books</span><span class="token punctuation">></span></span> <span class="token function">selectByCondition</span><span class="token punctuation">(</span><span class="token class-name">Books</span> books<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
         <span class="token comment">//基于price 进行排序</span>
         query<span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token class-name">Sort</span><span class="token punctuation">.</span><span class="token function">by</span><span class="token punctuation">(</span><span class="token class-name">Sort<span class="token punctuation">.</span>Direction</span><span class="token punctuation">.</span><span class="token constant">DESC</span><span class="token punctuation">,</span> <span class="token string">"price"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> <span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有</p>
<ul>
<li>.skip(0) //指定跳过记录数</li>
<li> .limit(4); //每页显示记录数</li>
</ul>
<h3 id="更新文档" tabindex="-1"><a class="header-anchor" href="#更新文档"><span>更新文档</span></a></h3>
<p>更新返回的结果都是受行数影响，如果更新前后的结果一样，则返回 0，提供的 API 有</p>
<ul>
<li>updateFirst() 只更新满足条件的第一条记录</li>
<li>updateMulti() 更新所有满足条件的记录</li>
<li>upsert() 没有符合条件的记录则插入数据</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">//查询price大于80的数据</span>
         <span class="token class-name">Query</span> query <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         query<span class="token punctuation">.</span><span class="token function">addCriteria</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"price"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">gt</span><span class="token punctuation">(</span><span class="token number">80.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">//更新数据</span>
         <span class="token class-name">Update</span> update <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">//price 更新为 70</span>
         update<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"price"</span><span class="token punctuation">,</span> <span class="token number">70.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">//price大于80的都更新为70</span>
         <span class="token class-name">UpdateResult</span> updateResult <span class="token operator">=</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">updateMulti</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> update<span class="token punctuation">,</span> <span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"更新的记录数："</span> <span class="token operator">+</span> updateResult<span class="token punctuation">.</span><span class="token function">getModifiedCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">//如果没有的则添加一条记录</span>
         query<span class="token punctuation">.</span><span class="token function">addCriteria</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         updateResult <span class="token operator">=</span> mongoTemplate<span class="token punctuation">.</span><span class="token function">upsert</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span>update<span class="token punctuation">,</span> <span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"更新的记录数："</span> <span class="token operator">+</span> updateResult<span class="token punctuation">.</span><span class="token function">getModifiedCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


     <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除文档" tabindex="-1"><a class="header-anchor" href="#删除文档"><span>删除文档</span></a></h3>
<p>删除文档就比较简单了，提供条件并调用 mongoTemplate.remove 即可</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deleteById</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mongoTemplate<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Query</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Books</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


