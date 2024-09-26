<template><div><h1 id="启程" tabindex="-1"><a class="header-anchor" href="#启程"><span>启程</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#%E4%BB%8EJDBC%E7%9A%84%E7%9F%B3%E5%99%A8%E6%97%B6%E4%BB%A3%E8%AF%B4%E8%B5%B7">从 JDBC 的“石器时代”说起</a></li>
<li><a href="#JDBC%E7%9A%84%E4%BD%BF%E7%94%A8%E7%B9%81%E6%9D%82%E7%9A%84%E6%89%8B%E5%B7%A5%E6%B4%BB">JDBC 的使用——繁杂的“手工活”</a>
<ul>
<li><a href="#%E5%9F%BA%E4%BA%8EJDBC%E6%93%8D%E4%BD%9C%E6%95%B0%E6%8D%AE%E5%BA%93">基于 JDBC 操作数据库</a></li>
<li><a href="#%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8JDBC%E6%93%8D%E4%BD%9C%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AD%98%E5%9C%A8%E7%9A%84%E9%97%AE%E9%A2%98">直接使用 JDBC 操作数据库存在的问题</a></li>
<li><a href="#%E8%A7%A3%E5%86%B3%E6%80%9D%E8%B7%AF">解决思路</a></li>
</ul>
</li>
<li><a href="#%E7%A6%8F%E9%9F%B3Mybatis%E7%9A%84%E8%AF%9E%E7%94%9F">福音 Mybatis 的诞生</a></li>
<li><a href="#Mybatis%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E8%BD%BB%E6%9D%BE%E4%B8%8A%E6%89%8B%E5%91%8A%E5%88%AB%E7%BC%96%E7%A8%8B%E5%B0%8F%E7%99%BD">Mybatis 的基本使用——轻松上手，告别“编程小白”</a>
<ul>
<li><a href="#%E9%85%8D%E7%BD%AEMybatis">配置 Mybatis</a>
<ul>
<li><a href="#Spring-Mybatis">Spring-Mybatis</a>
<ul>
<li><a href="#%E4%BE%9D%E8%B5%96%E4%B8%8E%E7%89%88%E6%9C%AC%E7%9A%84%E5%AF%B9%E5%BA%94%E5%85%B3%E7%B3%BB">依赖与版本的对应关系</a></li>
<li><a href="#%E5%BC%95%E5%85%A5%E4%BE%9D%E8%B5%96">引入依赖</a></li>
</ul>
</li>
<li><a href="#SpringBoot-Mybatis">SpringBoot-Mybatis</a>
<ul>
<li><a href="#%E4%BE%9D%E8%B5%96%E7%89%88%E6%9C%AC%E7%9A%84%E5%AF%B9%E5%BA%94%E5%85%B3%E7%B3%BB">依赖版本的对应关系</a></li>
<li><a href="#%E5%BC%95%E5%85%A5%E4%BE%9D%E8%B5%96">引入依赖</a></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="从-jdbc-的-石器时代-说起" tabindex="-1"><a class="header-anchor" href="#从-jdbc-的-石器时代-说起"><span>从 JDBC 的“石器时代”说起</span></a></h2>
<p>在当今的数据驱动世界中，我们无时无刻不在与数据打交道，无论是存储、检索还是更新。在 Java 的编程领域，Java 数据库连接（JDBC）便扮演了这一交互过程的关键角色。JDBC 是 Java 编程语言中的一款应用程序编程接口（API），它精确地阐述了客户端应如何与数据库建立联系。作为一种基于 Java 技术的数据访问手段，JDBC 旨在实现 Java 与数据库的无缝对接。作为 Oracle Corporation 旗下 Java Standard Edition 平台的重要组成部分，JDBC 为我们提供了操作数据库的利器，使得查询和修改数据变得轻而易举。它的设计初衷是为了更好地服务于关系数据库系统，为 Java 开发者打开了一扇通向数据世界的大门。</p>
<figure><img src="@source/backend/ssm/mybatis/image/image_KXJ1RGvrg4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="jdbc-的使用——繁杂的-手工活" tabindex="-1"><a class="header-anchor" href="#jdbc-的使用——繁杂的-手工活"><span>JDBC 的使用——繁杂的“手工活”</span></a></h2>
<h3 id="基于-jdbc-操作数据库" tabindex="-1"><a class="header-anchor" href="#基于-jdbc-操作数据库"><span>基于 JDBC 操作数据库</span></a></h3>
<p>以 mysql 为例，接下来就一起来看看我们是如何使用 JDBC 的，其实 JDBC 的使用跟我们使用客户端连接数据库是一样一样的</p>
<p>关于数据库的查询操作，可以分为以下几个步骤</p>
<ol>
<li>做好连接准备，定义数据库的连接地址，用户名，密码这些连接的必备材料</li>
<li>激活 JDBC 的连接驱动，这是开启数据库交互之旅的魔法钥匙。</li>
<li>建立连接桥梁，拿到对应的 Connection</li>
<li>构建 SQL 语句</li>
<li>预处理 SQL 语句，对 SQL 语句进行预处理，确保其在执行前万无一失或者进行参数补充</li>
<li>将预处理后的 SQL 语句发送至数据库服务器，获取查询数据</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">URL</span> <span class="token operator">=</span> <span class="token string">"jdbc:mysql://localhost:3360/paportal?useUnicode=true&amp;allowMultiQueries=true&amp;characterEncoding=utf8&amp;useJDBCCompliantTimezoneShift=true&amp;useLegacyDatetimeCode=false&amp;serverTimezone=Asia/Shanghai&amp;useSSL=false"</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">USERNAME</span> <span class="token operator">=</span> <span class="token string">"root"</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">PASSWORD</span> <span class="token operator">=</span> <span class="token string">"root"</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token class-name">PreparedStatement</span> preparedStatement <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//加载驱动</span>
            <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">"com.mysql.cj.jdbc.Driver"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//通过数据库获取连接</span>
            connection <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token constant">URL</span><span class="token punctuation">,</span> <span class="token constant">USERNAME</span><span class="token punctuation">,</span> <span class="token constant">PASSWORD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 定义SQL 语句</span>
            <span class="token class-name">String</span> querySQL <span class="token operator">=</span> <span class="token string">"select * from sys_user where user_name = ?"</span><span class="token punctuation">;</span>
            <span class="token comment">// 预处理SQL</span>
            preparedStatement <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>querySQL<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 给SQL设置参数</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//处理完SQL了，发送给Mysql服务进行查询</span>
            <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> preparedStatement<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                 <span class="token keyword">int</span> id <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                 <span class="token class-name">String</span> username <span class="token operator">=</span> resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">"user_name "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                 <span class="token comment">// 封装User</span>
                 user<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
                 user<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClassNotFoundException</span> <span class="token operator">|</span> <span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>
            connection<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token constant">JDBC</span>查询操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="直接使用-jdbc-操作数据库存在的问题" tabindex="-1"><a class="header-anchor" href="#直接使用-jdbc-操作数据库存在的问题"><span>直接使用 JDBC 操作数据库存在的问题</span></a></h3>
<p>虽然上面的代码看起来也不多，但是还是暴露了几个问题：</p>
<ol>
<li>数据库连接创建，释放资源频繁，每次在操作数据库前我们都要手动创建数据库连接，最后释放，创建连接本身就是比较耗时的连接，不适宜每次都进行新建</li>
<li>SQL 语句直接就在代码中硬编码了，代码不容易维护，动不动就要改代码</li>
<li>虽然可以使用 PrepareStatement 可以帮助我们实现具备参数的 SQL 的解析和使用，但是 where 的条件千变万化的，如果我们需要要把这么多的条件整合起来，写成一句 SQL 再交由 PrePareStatement 来处理，这样的 SQL 看起来不得把不断长脑子了？</li>
<li>对结果集解析存在硬编码，就是需要我们手动取结果然后再转化为我们所需的对象，这样稍微改改数据库的字段信息，那代码的改动可不得了喽</li>
</ol>
<h3 id="解决思路" tabindex="-1"><a class="header-anchor" href="#解决思路"><span>解决思路</span></a></h3>
<p>面对以上的问题，不妨我们先设身处地地想想解决方案</p>
<ol>
<li>
<p>针对数据库连接频繁创建，频繁释放造成的资源浪费</p>
<p>使用数据库连接池初始化连接资源，达到资源的复用</p>
</li>
<li>
<p>针对 SQL 硬编码</p>
<p>将 SQL 语句抽取成 xml 配置文件</p>
</li>
<li>
<p>针对结果映射硬编码</p>
<p>使用反射，内省等技术，自动将实体类跟数据表字段和属性进行自动映射，只要有数据表字段跟实体类属性的对应关系，那他们之间的赋值不就轻轻松松吗</p>
</li>
</ol>
<p>这些解决思路其实也是从刚开始的 JDBC 的使用一点点优化而来的，经过了不断地挖掘弊端，优化抽取，最终 Mybatis 就诞生了。</p>
<h2 id="福音-mybatis-的诞生" tabindex="-1"><a class="header-anchor" href="#福音-mybatis-的诞生"><span>福音 Mybatis 的诞生</span></a></h2>
<p>Mybatis 的根本目的就是在于解决使用 JDBC 时存在的弊端，所以我们刚刚提到的解决思路也正是 Mybatis 采用的解决方案，只是相比起这部分解决思路，Mybatis 想到的更加多，也更加丰富。</p>
<p>Mybatis 提供了一种半自动化的 ORM（Object-Relational Mapping）实现，既保留了灵活的 SQL 操作，又提供了便捷的对象映射功能。</p>
<h2 id="mybatis-的基本使用——轻松上手-告别-编程小白" tabindex="-1"><a class="header-anchor" href="#mybatis-的基本使用——轻松上手-告别-编程小白"><span>Mybatis 的基本使用——轻松上手，告别“编程小白”</span></a></h2>
<p>官网：<a href="https://mybatis.org/spring/" title="https://mybatis.org/spring/" target="_blank" rel="noopener noreferrer">https://mybatis.org/spring/<ExternalLinkIcon/></a></p>
<p>快速上手：<a href="https://mybatis.org/spring/getting-started.html" title="https://mybatis.org/spring/getting-started.html" target="_blank" rel="noopener noreferrer">https://mybatis.org/spring/getting-started.html<ExternalLinkIcon/></a></p>
<h3 id="配置-mybatis" tabindex="-1"><a class="header-anchor" href="#配置-mybatis"><span>配置 Mybatis</span></a></h3>
<h4 id="spring-mybatis" tabindex="-1"><a class="header-anchor" href="#spring-mybatis"><span>Spring-Mybatis</span></a></h4>
<p>Spring 配置 Mybatis 可以有两种方式，一种是 xml 配置文件方式，另一种是注解与配置类的方式。</p>
<h5 id="依赖与版本的对应关系" tabindex="-1"><a class="header-anchor" href="#依赖与版本的对应关系"><span>依赖与版本的对应关系</span></a></h5>
<table>
<thead>
<tr>
<th>MyBatis-Spring</th>
<th>MyBatis</th>
<th>Spring Framework</th>
<th>Spring Batch</th>
<th>Java</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>3.0</strong></td>
<td>3.5+</td>
<td>6.0+</td>
<td>5.0+</td>
<td>Java 17+</td>
</tr>
<tr>
<td><strong>2.1</strong></td>
<td>3.5+</td>
<td>5.x</td>
<td>4.x</td>
<td>Java 8+</td>
</tr>
<tr>
<td><strong>2.0</strong></td>
<td>3.5+</td>
<td>5.x</td>
<td>4.x</td>
<td>Java 8+</td>
</tr>
<tr>
<td><strong>1.3</strong></td>
<td>3.4+</td>
<td>3.2.2+</td>
<td>2.1+</td>
<td>Java 6+</td>
</tr>
</tbody>
</table>
<h5 id="引入依赖" tabindex="-1"><a class="header-anchor" href="#引入依赖"><span>引入依赖</span></a></h5>
<p>Mybatis 的基本使用还是非常简单的，我们可以根据 JDBC 的使用逻辑帮助我们记忆</p>
<p>当然，首先我们需要将依赖引入</p>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.0.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.5.16<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>8.0.33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
 mybatis依赖
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>既然 Mybatis 是对 JDBC 的封装，那 Mybatis 的使用跟 JDBC 的使用大部分肯定都是相同的，所以我们只要跟着 JDBC 的使用逻辑来进行就行了</p>
<ol>
<li>
<p>做好连接准备，定义数据库的连接地址，用户名，密码这些连接的必备材料</p>
<ol>
<li>在 Spring 中我们可以通过 xml 来定义 Bean 的方式来定义数据源<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code>    <span class="token comment">&lt;!-- 配置数据源 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.zaxxer.hikari.HikariDataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClassName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mysql.cj.jdbc.Driver<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbcUrl<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc:mysql://localhost:3306/mybatis_example<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>xxxxx<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span> 配置数据源
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>当然也可以通过@Bean 注解,数据源信息可以提取到 properties 进行配置化<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">PooledDataSource</span> dataSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PooledDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setUrl</span><span class="token punctuation">(</span><span class="token string">"jdbc:mysql://localhost:3306/mybatis_example"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"root"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"xxxxx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setDriver</span><span class="token punctuation">(</span><span class="token string">"com.mysql.cj.jdbc.Driver"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> dataSource<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>激活 JDBC 的连接驱动，这是开启数据库交互之旅的魔法钥匙。</p>
</li>
<li>
<p>建立连接桥梁，拿到对应的 Connection</p>
<p>对于构建跟数据库服务的连接和管理这些连接，这是固定的操作，这也是我们刚刚提到的直接使用 JDBC 的缺陷，而 Mybatis 已经交给 SqlSessionFactoryBean 帮我们干了这事了，所以我们只需要注入该 Bean 让 Spring 知道 SqlSessionFactoryBean 的存在就行</p>
<ol>
<li>xml 方式配置，构建了 DataSource Bean ，赋值给 sqlSessionFactory 的 dataSource 即可<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sqlSessionFactory<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.mybatis.spring.SqlSessionFactoryBean<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span> 注入SqlSessionFactoryBean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>注解方式配置<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">sqlSessionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">SqlSessionFactoryBean</span> factoryBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        factoryBean<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span><span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> factoryBean<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>构建 SQL 语句</p>
</li>
<li>
<p>预处理 SQL 语句，对 SQL 语句进行预处理，确保其在执行前万无一失或者进行参数补充</p>
<ol>
<li>
<p>SQL 语句我们说了，需要提取成配置文件，Mybatis 就是这么干的，我们可以通过创建一个 xml 跟接口类进行关联</p>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mapper</span> <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Mapper 3.0//EN"</span> <span class="token string">"http://mybatis.org/dtd/mybatis-3-mapper.dtd"</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.example.mapper.UserMapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>getUserById<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.example.model.User<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        SELECT id, name, email
        FROM users
        WHERE id = #{id}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mapper</span><span class="token punctuation">></span></span>
 UserMapper.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>或者通过注解的方式直接绑定 SQL （不推荐，可读性差，而且无法配置 ResultMap 进行结果映射）</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserMapper</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"SELECT id, name, email FROM usersWHERE id = #{id}"</span><span class="token punctuation">)</span>
    <span class="token class-name">User</span> <span class="token function">getUserById</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>将预处理后的 SQL 语句发送至数据库服务器，获取查询数据</p>
<p>最后我们开启 Spring 容器加载配置文件，获取对应的 Mapper Bean 调用对应接口方法即可</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//配置类开启Spring</span>
    <span class="token comment">//AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);</span>
    <span class="token comment">//配置xml 开启Spring</span>
        <span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">"spring-config.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">UserMapper</span> userService <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">UserMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">getUserById</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" - "</span> <span class="token operator">+</span> user<span class="token punctuation">.</span><span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="springboot-mybatis" tabindex="-1"><a class="header-anchor" href="#springboot-mybatis"><span>SpringBoot-Mybatis</span></a></h4>
<p>官网：<a href="https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/" title="https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/" target="_blank" rel="noopener noreferrer">https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/<ExternalLinkIcon/></a></p>
<p>基于 SpringBoot 配置 Mybatis 就更加简单了，Spring 中 SqlSessionFactoryBean 是我们手动配置的，SpringBoot 提供的 mybatis-spring-boot-starter 会帮助我们自动化配置，只需要我们提供数据源信息就行了。</p>
<h5 id="依赖版本的对应关系" tabindex="-1"><a class="header-anchor" href="#依赖版本的对应关系"><span>依赖版本的对应关系</span></a></h5>
<table>
<thead>
<tr>
<th>MyBatis-Spring-Boot-Starter</th>
<th>MyBatis-Spring</th>
<th>Spring Boot</th>
<th>Java</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>3.0</strong></td>
<td>3.0</td>
<td>3.0 - 3.1</td>
<td>17 or higher</td>
</tr>
<tr>
<td><strong>2.3</strong></td>
<td>2.1</td>
<td>2.5 - 2.7</td>
<td>8 or higher</td>
</tr>
<tr>
<td><strong>2.2 (EOL)</strong></td>
<td>2.0 (need 2.0.6+ for enable all features)</td>
<td>2.5 - 2.7</td>
<td>8 or higher</td>
</tr>
<tr>
<td><strong>2.1 (EOL)</strong></td>
<td>2.0 (need 2.0.6+ for enable all features)</td>
<td>2.1 - 2.4</td>
<td>8 or higher</td>
</tr>
<tr>
<td><strong>2.0 (EOL)</strong></td>
<td>2.0</td>
<td>2.0 or 2.1</td>
<td>8 or higher</td>
</tr>
<tr>
<td><strong>1.3 (EOL)</strong></td>
<td>1.3</td>
<td>1.5</td>
<td>6 or higher</td>
</tr>
<tr>
<td><strong>1.2 (EOL)</strong></td>
<td>1.3</td>
<td>1.4</td>
<td>6 or higher</td>
</tr>
<tr>
<td><strong>1.1 (EOL)</strong></td>
<td>1.3</td>
<td>1.3</td>
<td>6 or higher</td>
</tr>
<tr>
<td><strong>1.0 (EOL)</strong></td>
<td>1.2</td>
<td>1.3</td>
<td>6 or higher</td>
</tr>
</tbody>
</table>
<h5 id="引入依赖-1" tabindex="-1"><a class="header-anchor" href="#引入依赖-1"><span>引入依赖</span></a></h5>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.1.11<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis.spring.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.0.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.5.16<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>8.0.33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>既然 SqlSessionFactory 都配好了，接下来的跟 Spring 配置 Mybatis 一样直接使用就行了，当然在此之前我们先要将数据源信息配置好</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8001</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/mybatis_example<span class="token punctuation">?</span>useSSL=false<span class="token important">&amp;serverTimezone=GMT%2B8</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> xxxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将配置对应的 Mapper 接口和 SQL 语句</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserMapper</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"SELECT id, userAccount, userPassword, unionId, mpOpenId, userName, userAvatar, userProfile, userRole, createTime, updateTime, isDelete\n"</span> <span class="token operator">+</span>
            <span class="token string">"        FROM `user` where #{id}"</span><span class="token punctuation">)</span>
    <span class="token class-name">User</span> <span class="token function">getUserById</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就完成了！简单吧，接下来就是尝试调用该接口，当然我们需要将 mapper 所在的地方通过注解 MapperScan 告诉 SpringBoot 引用，好让 SpringBoot 能够扫到并配置成 Bean</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span><span class="token string">"com.example.mapper"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span>  <span class="token keyword">implements</span> <span class="token class-name">CommandLineRunner</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Main</span><span class="token punctuation">(</span><span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>userMapper <span class="token operator">=</span> userMapper<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Main</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userMapper<span class="token punctuation">.</span><span class="token function">getUserById</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了 Mybatis 使得我们能够将更多的精力放在写业务 SQL 上而不需要管理 JDBC 的 Connection，PreparedStatement 的状态，也不需要直接在代码上硬编码 SQL，SQL 出问题了可以直接找 Mapper.xml 中的 SQL 进行调试和更改，而且，Mybatis 也帮助我们做了默认的结果映射（可以通过 ResultMap 进行配置更多的结果映射），也正因如此，Mybatis 成了 Spring 进行数据交互的好搭档。</p>
<p>Mybatis 是通过什么样的方式进行 JDBC 封装从而让我们享受 JDBC 给我们带来的欢乐而不是痛苦呢？除了对 JDBC 进行封装，Mybatis 还给我们带来哪些更加高级的功能呢，接下来我们就要开始 Mybatis 的深度剖析，解密 Mybatis，学习其中的精髓与奥秘。</p>
</div></template>


