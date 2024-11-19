<template><div><h1 id="mongodb-高可用方案" tabindex="-1"><a class="header-anchor" href="#mongodb-高可用方案"><span>MongoDB 高可用方案</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#%E5%A4%8D%E5%88%B6%E9%9B%86">复制集</a>
<ul>
<li><a href="#%E9%AB%98%E5%8F%AF%E7%94%A8%E7%89%B9%E6%80%A7">高可用特性</a></li>
<li><a href="#%E5%A4%8D%E5%88%B6%E9%9B%86%E7%BB%93%E6%9E%84">复制集结构</a>
<ul>
<li><a href="#PSS%E6%A8%A1%E5%BC%8F%E5%AE%98%E6%96%B9%E6%8E%A8%E8%8D%90">PSS 模式（官方推荐）</a></li>
<li><a href="#PSA%E6%A8%A1%E5%BC%8F">PSA 模式</a></li>
</ul>
</li>
<li><a href="#%E5%A4%8D%E5%88%B6%E9%9B%86%E4%B8%AD%E7%9A%84%E5%90%84%E4%B8%AA%E8%A7%92%E8%89%B2">复制集中的各个角色</a>
<ul>
<li><a href="#Primary--%E4%B8%BB%E8%8A%82%E7%82%B9">Primary → 主节点</a></li>
<li><a href="#Secondary--%E5%A4%87%E8%8A%82%E7%82%B9">Secondary → 备节点</a></li>
<li><a href="#Arbiter--%E6%80%BB%E8%A3%81%E8%8A%82%E7%82%B9">Arbiter → 总裁节点</a></li>
</ul>
</li>
<li><a href="#%E6%95%B0%E6%8D%AE%E5%A4%8D%E5%88%B6">数据复制</a>
<ul>
<li><a href="#oplog">oplog</a></li>
</ul>
</li>
<li><a href="#%E9%80%89%E4%B8%BE">选举</a>
<ul>
<li><a href="#%E9%80%89%E4%B8%BE%E5%8E%9F%E7%90%86">选举原理</a></li>
<li><a href="#%E5%B8%B8%E8%A7%81%E9%80%89%E9%A1%B9">常见选项</a></li>
</ul>
</li>
<li><a href="#%E8%87%AA%E5%8A%A8%E6%95%85%E9%9A%9C%E8%BD%AC%E7%A7%BB">自动故障转移</a></li>
<li><a href="#%E6%90%AD%E5%BB%BAMongoDB%E5%A4%8D%E5%88%B6%E9%9B%86">搭建 MongoDB 复制集</a>
<ul>
<li><a href="#%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E7%9B%AE%E5%BD%95">创建数据目录</a></li>
<li><a href="#%E5%87%86%E5%A4%87%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6">准备配置文件</a></li>
<li><a href="#%E5%BC%80%E5%90%AF%E6%9C%8D%E5%8A%A1">开启服务</a></li>
<li><a href="#%E9%85%8D%E7%BD%AE%E5%A4%8D%E5%88%B6%E9%9B%86">配置复制集</a>
<ul>
<li><a href="#%E6%96%B9%E5%BC%8F%E4%B8%80">方式一</a></li>
<li><a href="#%E6%96%B9%E5%BC%8F%E4%BA%8C">方式二</a></li>
</ul>
</li>
<li><a href="#%E6%9F%A5%E7%9C%8B%E7%8A%B6%E6%80%81">查看状态</a></li>
<li><a href="#%E5%85%B6%E4%BB%96%E5%B8%B8%E7%94%A8%E6%8C%87%E4%BB%A4">其他常用指令</a></li>
<li><a href="#%E5%A4%8D%E5%88%B6%E9%9B%86%E7%9A%84%E8%BF%9E%E6%8E%A5%E6%96%B9%E5%BC%8F">复制集的连接方式</a></li>
</ul>
</li>
<li><a href="#%E5%AE%89%E5%85%A8%E8%AE%A4%E8%AF%81">安全认证</a>
<ul>
<li><a href="#%E8%BF%9E%E6%8E%A5%E4%B8%BB%E6%9C%8D%E5%8A%A1%E5%99%A8">连接主服务器</a></li>
<li><a href="#%E5%88%9B%E5%BB%BA%E7%94%A8%E6%88%B7">创建用户</a></li>
<li><a href="#%E5%81%9C%E6%AD%A2%E6%9C%8D%E5%8A%A1">停止服务</a></li>
<li><a href="#%E5%88%9B%E5%BB%BAkeyFile%E6%96%87%E4%BB%B6">创建 keyFile 文件</a></li>
<li><a href="#%E5%90%AF%E5%8A%A8%E6%9C%8D%E5%8A%A1">启动服务</a></li>
<li><a href="#%E6%B5%8B%E8%AF%95%E8%BF%9E%E6%8E%A5">测试连接</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="复制集" tabindex="-1"><a class="header-anchor" href="#复制集"><span>复制集</span></a></h2>
<h3 id="高可用特性" tabindex="-1"><a class="header-anchor" href="#高可用特性"><span>高可用特性</span></a></h3>
<p>复制集高可用的方面体现在两个方面</p>
<ol>
<li>数据写入时将数据迅速复制到另一个独立节点上</li>
<li>在接受写入的节点发生故障时自动选举出一个新的替代节点</li>
</ol>
<h3 id="复制集结构" tabindex="-1"><a class="header-anchor" href="#复制集结构"><span>复制集结构</span></a></h3>
<h4 id="pss-模式-官方推荐" tabindex="-1"><a class="header-anchor" href="#pss-模式-官方推荐"><span>PSS 模式（官方推荐）</span></a></h4>
<p>官方推荐也是最为典型的一个模式 PSS 由 3 个以上具有投票权的节点组成，包括：</p>
<ol>
<li>主节点（PRIMARY）：接受写入操作和选举时投票</li>
<li>两个（或多个）从节点（SECONDARY）：复制主节点上的新数据和选举时投票</li>
<li>如果主节点不可用，则复制集选择备节点作为主节点并继续正常操作。旧的主节点在可用时重新加入复制集</li>
</ol>
<h4 id="psa-模式" tabindex="-1"><a class="header-anchor" href="#psa-模式"><span>PSA 模式</span></a></h4>
<p>PSA 模式由一个主节点、一个备节点和一个仲裁者节点组成，Arbiter 节点不存储数据副本，也不提供业务的读写操作。Arbiter 节点发生故障不影响业务，仅影响选举投票</p>
<h3 id="复制集中的各个角色" tabindex="-1"><a class="header-anchor" href="#复制集中的各个角色"><span>复制集中的各个角色</span></a></h3>
<h4 id="primary-→-主节点" tabindex="-1"><a class="header-anchor" href="#primary-→-主节点"><span>Primary → 主节点</span></a></h4>
<p>主节点，其接收所有的写请求，然后把修改同步到所有备节点。一个复制集只能有一个主节点，当主节点“挂掉”后，其他节点会重新选举出来一个主节点</p>
<h4 id="secondary-→-备节点" tabindex="-1"><a class="header-anchor" href="#secondary-→-备节点"><span>Secondary → 备节点</span></a></h4>
<p>备节点，与主节点保持同样的数据集。当主节点“挂掉”时，参与竞选主节点。</p>
<h4 id="arbiter-→-总裁节点" tabindex="-1"><a class="header-anchor" href="#arbiter-→-总裁节点"><span>Arbiter → 总裁节点</span></a></h4>
<p>仲裁节点，只用于参与选举投票，本身不承载任何数据，只作为投票角色。</p>
<h3 id="数据复制" tabindex="-1"><a class="header-anchor" href="#数据复制"><span>数据复制</span></a></h3>
<p>当一个修改操作（插入，更新或删除）到达主节点时，他对数据的操作将会被记录下来，这部分记录下来的数据成为 oplog，从节点通过在主节点上打开一个 tailable 游标不断获取新进入主节点的 oplog，并在自己的数据上回放，以此保持跟主节点的数据一致</p>
<h4 id="oplog" tabindex="-1"><a class="header-anchor" href="#oplog"><span>oplog</span></a></h4>
<p>MongoDB oplog 是 Local 库下的一个集合，用来保存写操作所产生的<strong>增量日志</strong>，且是一个<strong>固定集合</strong>，固定集合意味着他的大小是一定的，如果数据量达到了这个大小，就会删掉最老的历史数据，主节点产生新的 oplog Entry，从节点通过复制 oplog 并应用来保持和主节点的状态一致，oplog 对数据的事务回滚，数据复制起着非常关键性的作用。</p>
<p>当然我们可以通过命令来查看 oplog</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>use local
db<span class="token punctuation">.</span>oplog<span class="token punctuation">.</span>rs<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token property"><span class="token keyword">$natural</span></span><span class="token operator">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pretty</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>更多的 oplog 操作</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>local<span class="token punctuation">.</span>system<span class="token punctuation">.</span>replset：用来记录当前复制集的成员。
local<span class="token punctuation">.</span>startup_log：用来记录本地数据库的启动日志信息。
local<span class="token punctuation">.</span>replset<span class="token punctuation">.</span>minvalid：用来记录复制集的跟踪信息，如初始化同步需要的字段。
ts： 操作时间，当前timestamp <span class="token operator">+</span> 计数器，计数器每秒都被重置
v：oplog版本信息
<span class="token property">op：操作类型</span><span class="token operator">:</span>
i：插⼊操作
u：更新操作
d：删除操作
c：执行命令（如createDatabase，dropDatabase）
n：空操作，特殊用途
ns：操作针对的集合
o：操作内容
o2：操作查询条件，仅update操作包含该字段
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="选举" tabindex="-1"><a class="header-anchor" href="#选举"><span>选举</span></a></h3>
<h4 id="选举原理" tabindex="-1"><a class="header-anchor" href="#选举原理"><span>选举原理</span></a></h4>
<p>MongoDB 出现主节点故障，内部会通过选举的方式完成故障恢复，选举的方法是通过 Raft 算法来实现的</p>
<p>Raft 算法：<a href="https://raft.github.io/" title="https://raft.github.io/" target="_blank" rel="noopener noreferrer">https://raft.github.io/<ExternalLinkIcon/></a></p>
<p>MongoDB 在 Raft 的标准算法上还加了一些自己的扩展：</p>
<ul>
<li>支持 chainingAllowed 链式复制，即备节点不只是从主节点上同步数据，还可以选择一个离自己最近（心跳延时最小）的节点来复制数据。</li>
<li>增加了预投票阶段，即 preVote，这主要是用来避免网络分区时产生 Term(任期)值激增的问题</li>
<li>支持投票优先级，如果备节点发现自己的优先级比主节点高，则会主动发起投票并尝试成为新的主节点。</li>
</ul>
<p>具体流程可分为</p>
<ol>
<li>
<p>具有投票权的节点之间两两互相发送心跳</p>
</li>
<li>
<p>当 5 次心跳未收到时判断节点失联</p>
</li>
<li>
<p>如果主节点失联，从节点会发起选举，选出新的主节点</p>
<p>被选举为主节点的节点</p>
<ol>
<li>能够与多数节点建立连接</li>
<li>具有较新的 oplog</li>
<li>具有较高的优先级</li>
</ol>
</li>
<li>
<p>如果失联的是从节点则不会产生新的选举</p>
</li>
<li>
<p>选举基于 RAFT 一致性算法实现，选举成功的必要条件是大多数投票节点存活</p>
</li>
<li>
<p>复制集中最多可以有 50 个节点，但具有投票权的节点最多 7 个，因为一旦过多的成员参与数据复制、投票过程，将会带来更多可靠性方面的问题</p>
<table>
<thead>
<tr>
<th>投票成员数</th>
<th>大多数</th>
<th>容忍</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
<td>0</td>
</tr>
<tr>
<td>3</td>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td>4</td>
<td>3</td>
<td>1</td>
</tr>
<tr>
<td>5</td>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>6</td>
<td>4</td>
<td>2</td>
</tr>
<tr>
<td>7</td>
<td>4</td>
<td>3</td>
</tr>
</tbody>
</table>
</li>
</ol>
<p>当复制集内存活的成员数量不足大多数时，整个复制集将无法选举出主节点，此时<strong>无法提供写服务</strong>，这些节点都将处于<strong>只读状态</strong>。此外，如果希望避免平票结果的产生，<strong>最好使用奇数个节点成员</strong>，比如 3 个或 5 个。当然，在 MongoDB 复制集的实现中，对于平票问题已经提供了解决方案：</p>
<ul>
<li>为选举定时器增加少量的<strong>随机时间偏差</strong>，这样避免各个节点在同一时刻发起选举，提高成功率</li>
<li>使用<strong>仲裁者角色</strong>，该角色不做数据复制，也不承担读写业务，仅仅用来投票</li>
</ul>
<h4 id="常见选项" tabindex="-1"><a class="header-anchor" href="#常见选项"><span>常见选项</span></a></h4>
<p>复制集节点有以下常见的选项配置</p>
<ul>
<li>是否具有投票权（v 参数）：有则参与投票</li>
<li>优先级（priority）：优先级越高的节点越优先成为主节点，优先级为 0 的节点无法成为主节点，这个通常可用于将性能较高的或者距离较近的节点将其优先级设高一点</li>
<li>隐藏（hidden）：复制数据，但对应用不可见，而且优先级必须为 0，但是具备投票权，设置了 hidden 的节点往往是用于数据备份中心的</li>
<li>延迟（slaveDelay）：复制 n 秒之前的数据，保持与主节点的时间差，因为删除操作也会被同步到其他备节点的，所以如果不小心触发了删除操作，那将是一个非常危险的操作，而这个配置就是将数据同步延迟</li>
</ul>
<h3 id="自动故障转移" tabindex="-1"><a class="header-anchor" href="#自动故障转移"><span>自动故障转移</span></a></h3>
<p>两个关键性问题：</p>
<ol>
<li>
<p>备节点如何感知到主节点已经发生故障了？</p>
<p>心跳机制：</p>
<p>一个影响检测机制的因素是心跳，在复制集组建完成之后，各成员节点会开启定时器，持续向其他成员发起心跳，这里涉及的参数为<strong>heartbeatIntervalMillis</strong>，即心跳间隔时间，默认值是<strong>2s</strong>。如果心跳成功，则会持续以 2s 的频率继续发送心跳；如果心跳失败，则会立即重试心跳，一直到心跳恢复成功</p>
<p>选举超时检测：</p>
<p>一次心跳检测失败并不会立即触发重新选举。实际上除了心跳，成员节点还会启动一个选举超时检测定时器，该定时器默认以<strong>10s</strong>的间隔执行，具体可以通过<strong>electionTimeoutMillis</strong>参数指定：</p>
<p>心跳响应成功 → 则取消上一次的 electionTimeout 调度，并发起新一轮的 electionTimeout 定时检测</p>
<p>心跳响应时间内不能成功 → 触发<strong>electionTimeoutMillis</strong>任务，开启选举</p>
</li>
<li>
<p>如何降低故障转移对业务产生的影响？</p>
<p>在复制集发生主备节点切换的情况下，会出现短暂的无主节点阶段，此时无法接受业务写操作。如果因为主节点故障导致的切换，则对于该节点的所有读写操作都会产生超时。如果使用 MongoDB 3.6 及以上版本的驱动，则可以通过开启<strong>retryWrite</strong>来降低影响。</p>
<ol>
<li>如果想不丢数据重启复制集，更优雅的打开方式应该是这样的：
<ol>
<li>逐个重启复制集里所有的 Secondary 节点（主仍可接受数据）</li>
<li>对 Primary 发送 rs.stepDown()命令，等待 primary 降级为 Secondary(令新主提供服务)</li>
<li>重启降级后的 Primary</li>
</ol>
</li>
</ol>
</li>
</ol>
<h3 id="搭建-mongodb-复制集" tabindex="-1"><a class="header-anchor" href="#搭建-mongodb-复制集"><span>搭建 MongoDB 复制集</span></a></h3>
<h4 id="创建数据目录" tabindex="-1"><a class="header-anchor" href="#创建数据目录"><span>创建数据目录</span></a></h4>
<p>Linux/MacOS</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mongodb/db<span class="token punctuation">{</span><span class="token number">1,2</span>,3<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Windows 系统的话就在自定义盘下创建 3 个存储数据库信息的目录</p>
<h4 id="准备配置文件" tabindex="-1"><a class="header-anchor" href="#准备配置文件"><span>准备配置文件</span></a></h4>
<p>当然各个实例在生产环境中都是应该要在不同的机器上进行部署的，而单机实验的话就需要注意各个 mongodb 实例的 port 要不一样，systemLog.path 要不一样和 storage.dbPath 要不一样</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code> # <span class="token operator">/</span>data<span class="token operator">/</span>db1<span class="token operator">/</span>mongod<span class="token punctuation">.</span>conf
 <span class="token property">systemLog</span><span class="token operator">:</span>
   <span class="token property">destination</span><span class="token operator">:</span> file
   <span class="token property">path</span><span class="token operator">:</span> <span class="token operator">/</span>mongodb<span class="token operator">/</span>db1<span class="token operator">/</span>mongod<span class="token punctuation">.</span>log<span class="token operator">/</span> or <span class="token operator">/</span>mongodb<span class="token operator">/</span>db2<span class="token operator">/</span>mongod<span class="token punctuation">.</span>log or <span class="token operator">/</span>mongodb<span class="token operator">/</span>db3<span class="token operator">/</span>mongod<span class="token punctuation">.</span>log # log path
   <span class="token property">logAppend</span><span class="token operator">:</span> <span class="token boolean">true</span>
 <span class="token property">storage</span><span class="token operator">:</span>
   <span class="token property">dbPath</span><span class="token operator">:</span> <span class="token operator">/</span>mongodb<span class="token operator">/</span>db1 or <span class="token operator">/</span>mongodb<span class="token operator">/</span>db2  or <span class="token operator">/</span>mongodb<span class="token operator">/</span>db3 # data directory
 <span class="token property">net</span><span class="token operator">:</span>
   <span class="token property">bindIp</span><span class="token operator">:</span> <span class="token number">0.0</span><span class="token number">.0</span><span class="token number">.0</span>
   <span class="token property">port</span><span class="token operator">:</span> <span class="token number">28017</span><span class="token operator">/</span><span class="token number">28018</span><span class="token operator">/</span><span class="token number">28019</span> # port
 <span class="token property">replication</span><span class="token operator">:</span>
   <span class="token property">replSetName</span><span class="token operator">:</span> rs0
 <span class="token property">processManagement</span><span class="token operator">:</span>
   <span class="token property">fork</span><span class="token operator">:</span> <span class="token boolean">true</span> mongodb配置文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="开启服务" tabindex="-1"><a class="header-anchor" href="#开启服务"><span>开启服务</span></a></h4>
<p>接下来就可以通过配置文件开启 MongoDB 服务了</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>bin/mongod <span class="token parameter variable">-f</span> /mongodb/db1/mongodb.conf
bin/mongod <span class="token parameter variable">-f</span> /mongodb/db2/mongodb.conf
bin/mongod <span class="token parameter variable">-f</span> /mongodb/db3/mongodb.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置复制集" tabindex="-1"><a class="header-anchor" href="#配置复制集"><span>配置复制集</span></a></h4>
<p>上面 👆 我们看了 3 个服务实例，但是他们之间是互不相关的，也不知道各自的存在，所以我们需要将他们关联到一起</p>
<p>有两种配置方式，首先我们得先通过 mongosh 进入主节点</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>mongosh <span class="token parameter variable">--port</span> <span class="token number">28017</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="方式一" tabindex="-1"><a class="header-anchor" href="#方式一"><span>方式一</span></a></h5>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs<span class="token punctuation">.</span><span class="token function">initate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

rs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"HOSTNAME:28018"</span><span class="token punctuation">)</span>
rs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"HOSTNAME:28019"</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过 hostname -f linux 命令查看 hostname</p>
<h5 id="方式二" tabindex="-1"><a class="header-anchor" href="#方式二"><span>方式二</span></a></h5>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs<span class="token punctuation">.</span><span class="token function">initiate</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

  <span class="token property">_id</span><span class="token operator">:</span> <span class="token string">"rs0"</span><span class="token punctuation">,</span>
  <span class="token property">members</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">_id</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">host</span><span class="token operator">:</span> <span class="token string">"localhost:28017"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
       <span class="token property">_id</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">host</span><span class="token operator">:</span> <span class="token string">"localhost:28018"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
     <span class="token property">_id</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">host</span><span class="token operator">:</span> <span class="token string">"localhost:28019"</span>
  <span class="token punctuation">]</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的配置是将 id 为 0 的实例配置为主机，其他的为从机，完成了配置后，主机实例的身份会发生变化</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs0 <span class="token punctuation">[</span><span class="token property">direct</span><span class="token operator">:</span> other<span class="token punctuation">]</span> test<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>主从配置完成后，主机允许读写，从机是不允许读写的，从机想要进行读取，需要进行配置</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs0 <span class="token punctuation">[</span><span class="token property">direct</span><span class="token operator">:</span> primary<span class="token punctuation">]</span> test<span class="token operator">></span> db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property">name</span><span class="token operator">:</span><span class="token string">"test1"</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token property">name</span><span class="token operator">:</span><span class="token string">"test2"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token property">acknowledged</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">insertedIds</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'0'</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'6723974161bdf98fff964033'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string-property property">'1'</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'6723974161bdf98fff964034'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 主机写操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs0 <span class="token punctuation">[</span><span class="token property">direct</span><span class="token operator">:</span> primary<span class="token punctuation">]</span> test<span class="token operator">></span> db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'6723974161bdf98fff964033'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'test1'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token property">_id</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'6723974161bdf98fff964034'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'test2'</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span> 从机读操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们 mongosh 连接从机时，会发现从机的身份也发生了变化，并且当我们写数据的时候，系统会提示我们：说该节点不是主节点</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs0 <span class="token punctuation">[</span><span class="token property">direct</span><span class="token operator">:</span> secondary<span class="token punctuation">]</span> test<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs0 <span class="token punctuation">[</span><span class="token property">direct</span><span class="token operator">:</span> secondary<span class="token punctuation">]</span> test<span class="token operator">></span> db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token property">name</span><span class="token operator">:</span><span class="token string">"test3"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token property">DeprecationWarning</span><span class="token operator">:</span> Collection<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> is deprecated<span class="token punctuation">.</span> Use insertOne<span class="token punctuation">,</span> insertMany<span class="token punctuation">,</span> or bulkWrite<span class="token punctuation">.</span>
<span class="token property">Uncaught</span><span class="token operator">:</span>
MongoBulkWriteError<span class="token punctuation">[</span>NotWritablePrimary<span class="token punctuation">]</span><span class="token operator">:</span> not primary
 从节点写数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然如果我们想要从节点进行读取数据的操作，需要执行指令</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs<span class="token punctuation">.</span><span class="token function">secondaryOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看状态" tabindex="-1"><a class="header-anchor" href="#查看状态"><span>查看状态</span></a></h4>
<p>通过 rs.status()可以查看集群状态</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs0 <span class="token punctuation">[</span><span class="token property">direct</span><span class="token operator">:</span> primary<span class="token punctuation">]</span> test<span class="token operator">></span> rs<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token property">set</span><span class="token operator">:</span> <span class="token string">'rs0'</span><span class="token punctuation">,</span>
  <span class="token property">date</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:40.489Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token property">myState</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">term</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token property">syncSourceHost</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
  <span class="token property">syncSourceId</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">heartbeatIntervalMillis</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'2000'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token property">majorityVoteCount</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">writeMajorityCount</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">votingMembersCount</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">writableVotingMembersCount</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">optimes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">lastCommittedOpTime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">lastCommittedWallTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.189Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">readConcernMajorityOpTime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">appliedOpTime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">durableOpTime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">lastAppliedWallTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.189Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">lastDurableWallTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.189Z'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">lastStableRecoveryTimestamp</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386345</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token property">electionCandidateMetrics</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">lastElectionReason</span><span class="token operator">:</span> <span class="token string">'electionTimeout'</span><span class="token punctuation">,</span>
    <span class="token property">lastElectionDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:34:44.934Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">electionTerm</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">lastCommittedOpTimeAtElection</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730385274</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'-1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">lastSeenOpTimeAtElection</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730385274</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'-1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">numVotesNeeded</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">priorityAtElection</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">electionTimeoutMillis</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'10000'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">numCatchUpOps</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'0'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">newTermStartDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:34:45.067Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">wMajorityWriteAvailabilityDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:34:45.169Z'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">members</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">_id</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'localhost:28017'</span><span class="token punctuation">,</span>
      <span class="token property">health</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">state</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">stateStr</span><span class="token operator">:</span> <span class="token string">'PRIMARY'</span><span class="token punctuation">,</span>
      <span class="token property">uptime</span><span class="token operator">:</span> <span class="token number">82606</span><span class="token punctuation">,</span>
      <span class="token property">optime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">optimeDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.000Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastAppliedWallTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.189Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastDurableWallTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.189Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">syncSourceHost</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token property">syncSourceId</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">infoMessage</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token property">electionTime</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730385284</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">electionDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:34:44.000Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">configVersion</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">configTerm</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">self</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">lastHeartbeatMessage</span><span class="token operator">:</span> <span class="token string">''</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">_id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'localhost:28018'</span><span class="token punctuation">,</span>
      <span class="token property">health</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">state</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">stateStr</span><span class="token operator">:</span> <span class="token string">'SECONDARY'</span><span class="token punctuation">,</span>
      <span class="token property">uptime</span><span class="token operator">:</span> <span class="token number">1086</span><span class="token punctuation">,</span>
      <span class="token property">optime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">optimeDurable</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">optimeDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.000Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">optimeDurableDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.000Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastAppliedWallTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.189Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastDurableWallTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.189Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastHeartbeat</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:39.625Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastHeartbeatRecv</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:40.295Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">pingMs</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'0'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastHeartbeatMessage</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token property">syncSourceHost</span><span class="token operator">:</span> <span class="token string">'localhost:28017'</span><span class="token punctuation">,</span>
      <span class="token property">syncSourceId</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">infoMessage</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token property">configVersion</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">configTerm</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">_id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">name</span><span class="token operator">:</span> <span class="token string">'localhost:28019'</span><span class="token punctuation">,</span>
      <span class="token property">health</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">state</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">stateStr</span><span class="token operator">:</span> <span class="token string">'SECONDARY'</span><span class="token punctuation">,</span>
      <span class="token property">uptime</span><span class="token operator">:</span> <span class="token number">1085</span><span class="token punctuation">,</span>
      <span class="token property">optime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">optimeDurable</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">optimeDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.000Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">optimeDurableDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.000Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastAppliedWallTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.189Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastDurableWallTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:35.189Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastHeartbeat</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:39.625Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastHeartbeatRecv</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:52:39.160Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">pingMs</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'0'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">lastHeartbeatMessage</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token property">syncSourceHost</span><span class="token operator">:</span> <span class="token string">'localhost:28018'</span><span class="token punctuation">,</span>
      <span class="token property">syncSourceId</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">infoMessage</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token property">configVersion</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">configTerm</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">ok</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token string-property property">'$clusterTime'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">clusterTime</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">signature</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">hash</span><span class="token operator">:</span> Binary<span class="token punctuation">.</span><span class="token function">createFromBase64</span><span class="token punctuation">(</span><span class="token string">'AAAAAAAAAAAAAAAAAAAAAAAAAAA='</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">keyId</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'0'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">operationTime</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386355</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要常关注的有</p>
<ul>
<li>health：成员是否健康，通过心跳检测</li>
<li>state/stateStr:成员的状态，PRIMARY 表示主节点，SECONDARY 表示从节点，如果节点出现故障的话，会出现其他状态，比如 RECOVERY</li>
<li>uptime：成员的启动时间</li>
<li>optime、optimeDate：成员同步最后一条 oplog 的时间</li>
<li>optimeDurable、optimeDurableDate：成员同步最后一条 oplog 持久化的时间</li>
<li>pingMs：成员与当前节点的 ping 时延</li>
<li>syncingTo：成员的同步来源</li>
</ul>
<p>当然我们还可以通过 db.isMaster()来查看当前节点的角色，配置信息包含了复制集的成员列表，Primary，协议等相关配置信息</p>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>rs0 <span class="token punctuation">[</span><span class="token property">direct</span><span class="token operator">:</span> primary<span class="token punctuation">]</span> test<span class="token operator">></span> db<span class="token punctuation">.</span><span class="token function">isMaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token property">topologyVersion</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">processId</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'6722570abb0dee2cb80de1ea'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">counter</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'6'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">hosts</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">'localhost:28017'</span><span class="token punctuation">,</span> <span class="token string">'localhost:28018'</span><span class="token punctuation">,</span> <span class="token string">'localhost:28019'</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">setName</span><span class="token operator">:</span> <span class="token string">'rs0'</span><span class="token punctuation">,</span>
  <span class="token property">setVersion</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">ismaster</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">secondary</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">primary</span><span class="token operator">:</span> <span class="token string">'localhost:28017'</span><span class="token punctuation">,</span>
  <span class="token property">me</span><span class="token operator">:</span> <span class="token string">'localhost:28017'</span><span class="token punctuation">,</span>
  <span class="token property">electionId</span><span class="token operator">:</span> <span class="token builtin keyword">ObjectId</span><span class="token punctuation">(</span><span class="token string">'7fffffff0000000000000001'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token property">lastWrite</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">opTime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386645</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">lastWriteDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:57:25.000Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">majorityOpTime</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">ts</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386645</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">majorityWriteDate</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:57:25.000Z'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">maxBsonObjectSize</span><span class="token operator">:</span> <span class="token number">16777216</span><span class="token punctuation">,</span>
  <span class="token property">maxMessageSizeBytes</span><span class="token operator">:</span> <span class="token number">48000000</span><span class="token punctuation">,</span>
  <span class="token property">maxWriteBatchSize</span><span class="token operator">:</span> <span class="token number">100000</span><span class="token punctuation">,</span>
  <span class="token property">localTime</span><span class="token operator">:</span> <span class="token builtin keyword">ISODate</span><span class="token punctuation">(</span><span class="token string">'2024-10-31T14:57:33.568Z'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token property">logicalSessionTimeoutMinutes</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
  <span class="token property">connectionId</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
  <span class="token property">minWireVersion</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">maxWireVersion</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">,</span>
  <span class="token property">readOnly</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">ok</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token string-property property">'$clusterTime'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">clusterTime</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386645</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">signature</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">hash</span><span class="token operator">:</span> Binary<span class="token punctuation">.</span><span class="token function">createFromBase64</span><span class="token punctuation">(</span><span class="token string">'AAAAAAAAAAAAAAAAAAAAAAAAAAA='</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">keyId</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'0'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">operationTime</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730386645</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token property">isWritablePrimary</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="其他常用指令" tabindex="-1"><a class="header-anchor" href="#其他常用指令"><span>其他常用指令</span></a></h4>
<table>
<thead>
<tr>
<th>命令</th>
<th>功能描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>`rs.add()`</td>
<td>将节点添加到副本集</td>
</tr>
<tr>
<td>`rs.addArb()`</td>
<td>将仲裁节点添加到副本集</td>
</tr>
<tr>
<td>`rs.conf()`</td>
<td>返回副本集配置文档</td>
</tr>
<tr>
<td>`rs.freeze()`</td>
<td>阻止当前节点在一段时间内寻求选举为主节点</td>
</tr>
<tr>
<td>`rs.help()`</td>
<td>返回副本集函数的基本帮助文本</td>
</tr>
<tr>
<td>`rs.initiate()`</td>
<td>初始化新的副本集</td>
</tr>
<tr>
<td>`rs.printReplicationInfo()`</td>
<td>从主节点的角度打印副本集状态的格式化报告</td>
</tr>
<tr>
<td>`rs.printSecondaryReplicationInfo()`</td>
<td>从从节点的角度打印副本集状态的格式化报告</td>
</tr>
<tr>
<td>`rs.reconfig()`</td>
<td>通过应用新的副本集配置对象来重新配置副本集</td>
</tr>
<tr>
<td>`rs.remove()`</td>
<td>从副本集中删除节点</td>
</tr>
<tr>
<td>`rs.status()`</td>
<td>返回包含副本集状态信息的文档</td>
</tr>
<tr>
<td>`rs.stepDown()`</td>
<td>导致当前的 主节点变为强制选举的从节点</td>
</tr>
<tr>
<td>`rs.syncFrom()`</td>
<td>设置该副本集节点与哪个节点进行同步，复写默认的同步目标选择逻辑</td>
</tr>
<tr>
<td>`applyOps`</td>
<td>将 oplog 条目应用于当前数据集的内部命令</td>
</tr>
<tr>
<td>`hello`</td>
<td>显示该节点在副本集中的角色信息，包括是否为主副本</td>
</tr>
<tr>
<td>`replSetAbortPrimaryCatchUp`</td>
<td>强制当选的主节点放弃同步（追赶）过程，然后完成到主节点的过渡</td>
</tr>
<tr>
<td>`replSetFreeze`</td>
<td>阻止当前节点在一段时间内寻求选举为主节点</td>
</tr>
<tr>
<td>`replSetGetConfig`</td>
<td>返回副本集的配置对象</td>
</tr>
<tr>
<td>`replSetGetStatus`</td>
<td>返回报告副本集状态的文档</td>
</tr>
<tr>
<td>`replSetInitiate`</td>
<td>初始化新的副本集</td>
</tr>
<tr>
<td>`replSetMaintenance`</td>
<td>启用或禁用维护模式，该模式使从节点处于 RECOVERING 状态</td>
</tr>
<tr>
<td>`replSetReconfig`</td>
<td>将新配置应用于现有副本集</td>
</tr>
<tr>
<td>`replSetResizeOplog`</td>
<td>动态调整 oplog 大小</td>
</tr>
</tbody>
</table>
<h4 id="复制集的连接方式" tabindex="-1"><a class="header-anchor" href="#复制集的连接方式"><span>复制集的连接方式</span></a></h4>
<p>当我们想要连接 Mongodb 的复制集时，一种方式是如果我们知道主节点可以直接连接主节点来完成读写操作，但是如果主节点发生了故障，主节点便会切换，这个时候就无法通过访问旧的主节点来访问复制集了</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>mongosh <span class="token parameter variable">--port</span> <span class="token number">28017</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以强烈推荐第二种，通过高可用 Uri 的方式连接 MongoDB，当主节点故障切换后，MongoDB 引擎可自动感知并将流量路由到新的主节点</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>mongosh mongodb://localhost:28017,localhost:28018,localhost:28019/admin?replicaSet<span class="token operator">=</span>rs0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安全认证" tabindex="-1"><a class="header-anchor" href="#安全认证"><span>安全认证</span></a></h3>
<p>作为数据库，安全是首要重要的，所以如何为复制集配安全认证呢？</p>
<h4 id="连接主服务器" tabindex="-1"><a class="header-anchor" href="#连接主服务器"><span>连接主服务器</span></a></h4>
<p>首先连接到主服务器 mongodb，使用 admin</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>bin/mongosh <span class="token parameter variable">--port</span> <span class="token number">28017</span>
use admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建用户" tabindex="-1"><a class="header-anchor" href="#创建用户"><span>创建用户</span></a></h4>
<div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code>
 db<span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span> <span class="token punctuation">{</span>
   <span class="token property">user</span><span class="token operator">:</span> <span class="token string">"tang"</span><span class="token punctuation">,</span>
   <span class="token property">pwd</span><span class="token operator">:</span> <span class="token string">"tang"</span><span class="token punctuation">,</span>
   <span class="token property">roles</span><span class="token operator">:</span> <span class="token punctuation">[</span>
     <span class="token punctuation">{</span> <span class="token property">role</span><span class="token operator">:</span> <span class="token string">"clusterAdmin"</span><span class="token punctuation">,</span> <span class="token property">db</span><span class="token operator">:</span> <span class="token string">"admin"</span> <span class="token punctuation">}</span> <span class="token punctuation">,</span>
     <span class="token punctuation">{</span> <span class="token property">role</span><span class="token operator">:</span> <span class="token string">"userAdminAnyDatabase"</span><span class="token punctuation">,</span> <span class="token property">db</span><span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
     <span class="token punctuation">{</span> <span class="token property">role</span><span class="token operator">:</span> <span class="token string">"userAdminAnyDatabase"</span><span class="token punctuation">,</span> <span class="token property">db</span><span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
     <span class="token punctuation">{</span> <span class="token property">role</span><span class="token operator">:</span> <span class="token string">"readWriteAnyDatabase"</span><span class="token punctuation">,</span> <span class="token property">db</span><span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

 创建用户
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mongodb line-numbers-mode" data-ext="mongodb" data-title="mongodb"><pre v-pre class="language-mongodb"><code><span class="token comment">//响应结果</span>
<span class="token punctuation">{</span>
  <span class="token property">ok</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token string-property property">'$clusterTime'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">clusterTime</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730543556</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token property">signature</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">hash</span><span class="token operator">:</span> Binary<span class="token punctuation">.</span><span class="token function">createFromBase64</span><span class="token punctuation">(</span><span class="token string">'AAAAAAAAAAAAAAAAAAAAAAAAAAA='</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token property">keyId</span><span class="token operator">:</span> <span class="token function">Long</span><span class="token punctuation">(</span><span class="token string">'0'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">operationTime</span><span class="token operator">:</span> <span class="token builtin keyword">Timestamp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token property">t</span><span class="token operator">:</span> <span class="token number">1730543556</span><span class="token punctuation">,</span> <span class="token property">i</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="停止服务" tabindex="-1"><a class="header-anchor" href="#停止服务"><span>停止服务</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>bin/mongod  <span class="token parameter variable">-f</span> /mongodb/db1/mongo.conf <span class="token parameter variable">--shutdown</span>
bin/mongod  <span class="token parameter variable">-f</span> /mongodb/db2/mongo.conf <span class="token parameter variable">--shutdown</span>
bin/mongod  <span class="token parameter variable">-f</span> /mongodb/db3/mongo.conf <span class="token parameter variable">--shutdown</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建-keyfile-文件" tabindex="-1"><a class="header-anchor" href="#创建-keyfile-文件"><span>创建 keyFile 文件</span></a></h4>
<p>keyFile 是集群之间的安全认证，增加安全认证机制 KeyFile，开启 keyFile 认证就默认开启了 auth 认证</p>
<p>基于 openssl 创建一个 64 位密钥存储到 mongo.key 文件内</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>openssl rand <span class="token parameter variable">-base64</span> <span class="token number">756</span> <span class="token operator">></span> /mongodb/db1/mongo.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>调整 key 文件为 600 权限，即只有文件所有者可以读写</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>openssl rand <span class="token parameter variable">-base64</span> <span class="token number">756</span> <span class="token operator">></span> /mongodb/db1/mongo.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后就可以通过 keyFile 来开启 mongodb 服务了</p>
<h4 id="启动服务" tabindex="-1"><a class="header-anchor" href="#启动服务"><span>启动服务</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code> bin/mongod  <span class="token parameter variable">-f</span> /mongodb/db1/mongo.conf <span class="token parameter variable">--keyFile</span> /mongodb/db1/mongo.key
 bin/mongod  <span class="token parameter variable">-f</span> /mongodb/db2/mongo.conf <span class="token parameter variable">--keyFile</span> /mongodb/db1/mongo.key
 bin/mongod  <span class="token parameter variable">-f</span> /mongodb/db3/mongo.conf <span class="token parameter variable">--keyFile</span> /mongodb/db1/mongo.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="测试连接" tabindex="-1"><a class="header-anchor" href="#测试连接"><span>测试连接</span></a></h4>
<p>如果直接连接服务器的话，访问数据会被拒绝</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>rs0 <span class="token punctuation">[</span>direct: primary<span class="token punctuation">]</span> admin<span class="token operator">></span> db.user.find<span class="token punctuation">(</span><span class="token punctuation">)</span>
MongoServerError<span class="token punctuation">[</span>Unauthorized<span class="token punctuation">]</span>: <span class="token builtin class-name">command</span> <span class="token function">find</span> requires authentication

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于用户名密码登录</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>mongosh <span class="token parameter variable">--port</span> <span class="token number">28017</span> <span class="token parameter variable">-u</span> tang <span class="token parameter variable">-p</span> tang <span class="token parameter variable">--authenticationDatabase</span><span class="token operator">=</span>admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


