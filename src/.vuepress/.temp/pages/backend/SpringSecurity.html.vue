<template><div><h1 id="详谈spring-security" tabindex="-1"><a class="header-anchor" href="#详谈spring-security"><span>详谈Spring Security</span></a></h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h2>
<ul>
<li><a href="#57%E7%89%88%E6%9C%AC%E5%89%8D%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE">5.7版本前基本配置</a>
<ul>
<li><a href="#%E5%AF%BC%E5%85%A5%E4%BE%9D%E8%B5%96">导入依赖</a></li>
</ul>
</li>
<li><a href="#57%E7%89%88%E6%9C%AC%E5%90%8E%E7%9A%84%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE">5.7版本后的基本配置</a>
<ul>
<li><a href="#%E5%AF%BC%E5%85%A5%E4%BE%9D%E8%B5%96">导入依赖</a></li>
<li><a href="#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE">基本配置</a></li>
</ul>
</li>
<li><a href="#Spring-Security%E7%9A%84%E8%AE%A4%E8%AF%81">Spring Security的认证</a>
<ul>
<li><a href="#%E6%A0%B8%E5%BF%83%E7%BB%84%E4%BB%B6">核心组件</a></li>
<li><a href="#%E7%AE%80%E5%8D%95%E8%AE%A4%E8%AF%81">简单认证</a>
<ul>
<li><a href="#%E8%A1%A8%E5%8D%95%E8%AE%A4%E8%AF%81">表单认证</a></li>
<li><a href="#%E5%AF%86%E7%A0%81%E5%AD%98%E5%82%A8">密码存储</a>
<ul>
<li><a href="#%E5%86%85%E5%AD%98%E5%AD%98%E5%82%A8">内存存储</a></li>
<li><a href="#%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AD%98%E5%82%A8">数据库存储</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#%E8%AE%A4%E8%AF%81%E6%B5%81%E7%A8%8B%E5%88%86%E6%9E%90">认证流程分析</a></li>
<li><a href="#%E8%BF%87%E6%BB%A4%E5%99%A8%E9%93%BE">过滤器链</a></li>
<li><a href="#Remeber-me-">Remeber me </a>
<ul>
<li><a href="#%E5%BC%80%E5%90%AFRemeber-me">开启Remeber me</a></li>
</ul>
</li>
<li><a href="#%E6%B3%A8%E9%94%80">注销</a></li>
<li><a href="#%E8%AE%A4%E8%AF%81%E4%BA%8B%E4%BB%B6">认证事件</a></li>
<li><a href="#%E6%8B%93%E5%B1%95%E5%B7%A9%E5%9B%BA">拓展巩固</a>
<ul>
<li><a href="#%E6%95%B4%E5%90%88JWT">整合JWT</a></li>
<li><a href="#%E6%95%B4%E5%90%88SMS%E7%9F%AD%E4%BF%A1%E7%99%BB%E9%99%86%E8%AE%A4%E8%AF%81">整合SMS短信登陆认证</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<p>Spring Security是一个Java框架，用于保护应用程序的安全性。它提供了一套全面的安全解决方案，包括身份验证、授权、防止攻击等功能。Spring Security基于<strong>过滤器链</strong>的概念，可以轻松地集成到任何基于Spring的应用程序中。它支持多种身份验证选项和授权策略，开发人员可以根据需要选择适合的方式。此外，Spring Security还提供了一些附加功能，如集成第三方身份验证提供商和单点登录，以及会话管理和密码编码等。总之，Spring Security是一个强大且易于使用的框架，可以帮助开发人员提高应用程序的安全性和可靠性。</p>
<p>虽说Spring Security很强大，集成了非常多的使用场景，几乎涵盖了所有的安全需求，不过这也使得他具有一定的复杂性，不想花太多时间来研究的话，或者说没有这么大的需求的场景的话，也可以使用学习成本较低的sa-token，shiro等。</p>
<h3 id="_5-7版本前基本配置" tabindex="-1"><a class="header-anchor" href="#_5-7版本前基本配置"><span>5.7版本前基本配置</span></a></h3>
<h4 id="导入依赖" tabindex="-1"><a class="header-anchor" href="#导入依赖"><span>导入依赖</span></a></h4>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-security<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们的SpringSecurity就算是成功引入了，当我们什么都不写 的时候，其实就是启动默认的过滤链配置</p>
<p>对于配置类，首先我们需要添加这么一个注解来开启Spring Security的配置，同时还需要继承WebSecurityConfigurerAdapter类</p>
<blockquote>
<p>📌注意！这个需要注意版本：5.7以后的Spring Security 不再需要继承 WebSecurityConfigurerAdapter</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableWebSecurity</span>
<span class="token annotation punctuation">@EnableWebSecurity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomWebSecurityConfig</span> <span class="token keyword">extends</span> <span class="token class-name">WebSecurityConfigurerAdapter</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以试着重写一些配置类来看一看，当然如果我们不选择重写，Spring Security会执行一些默认配置的</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">configure</span><span class="token punctuation">(</span>http<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实我们点进去查看会发现，他已经是实现了一些默认配置了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"Using default configure(HttpSecurity). If subclassed this will potentially override subclass configure(HttpSecurity)."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">ExpressionUrlAuthorizationConfigurer<span class="token punctuation">.</span>AuthorizedUrl</span><span class="token punctuation">)</span>http<span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如说我们可以通过重写 configure(HttpSecurity http)来进行一些自定义的安全配置，而HttpSecurity 主要就是对Http访问进行一些限制配置，比如说对某些URL进行访问控制，配置登录页，注销页都是在这里进行配置</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http<span class="token punctuation">.</span>
            <span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token string">"/home"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">loginPage</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span> <span class="token comment">// 配置自定义登录页</span>
                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">// 除了 /，/home，/login 其他都需要进行校验</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
               
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以实现configureGlobal(AuthenticationManagerBuilder) 配置一些内存用户用于测试</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configureGlobal</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        auth <span class="token generics"><span class="token punctuation">&lt;</span>3<span class="token punctuation">></span></span>
            <span class="token punctuation">.</span><span class="token function">inMemoryAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"USER"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-7版本后的基本配置" tabindex="-1"><a class="header-anchor" href="#_5-7版本后的基本配置"><span>5.7版本后的基本配置</span></a></h2>
<h3 id="导入依赖-1" tabindex="-1"><a class="header-anchor" href="#导入依赖-1"><span>导入依赖</span></a></h3>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-security<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置"><span>基本配置</span></a></h3>
<p>基本配置已不再需要继承WebSecurityConfigurerAdapter了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableWebSecurity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfig</span><span class="token punctuation">{</span>
    

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以往我们需要通过继承重写configure这个方法来配置过滤链规则，而新版本则是需要构建了一个过滤链对象并通过@Bean注解注入到IOC容器中，相当于我们配置了一个新的过滤规则插入到过滤链里了</p>
<p>为什么这么干呢？我的理解是</p>
<ol>
<li>以Bean的方式注入到AuthenticationManager中一是更能让我们理解Spring Security的工作模式，就是让我们可以更加直观地操作过滤链，二是提高重用性，毕竟以Bean的形式存在，意味着我们可以随时重用这份配置。</li>
<li>新的配置方式更好地支持响应式编程模型，允许在响应式应用程序中使用Spring Security</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
          http
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    auth
                            <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">cors</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了这部分配置Spring Security还提供了许多其他的配置</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>【常用】#permitAll() 方法，所有用户可访问。
【常用】#denyAll() 方法，所有用户不可访问。
【常用】#authenticated() 方法，登录用户可访问。
#anonymous() 方法，无需登录，即匿名用户可访问。
#rememberMe() 方法，通过 remember me 登录的用户可访问。
#fullyAuthenticated() 方法，非 remember me 登录的用户可访问。
#hasIpAddress(String ipaddressExpression) 方法，来自指定 IP 表达式的用户可访问。
【常用】#hasRole(String role) 方法， 拥有指定角色的用户可访问。
【常用】#hasAnyRole(String... roles) 方法，拥有指定任一角色的用户可访问。
【常用】#hasAuthority(String authority) 方法，拥有指定权限(authority)的用户可访问。
【常用】#hasAuthority(String... authorities) 方法，拥有指定任一权限(authority)的用户可访问。
【最牛】#access(String attribute) 方法，当 Spring EL 表达式的执行结果为 true 时，可以访问。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring-security的认证" tabindex="-1"><a class="header-anchor" href="#spring-security的认证"><span>Spring Security的认证</span></a></h2>
<blockquote>
<p>📌认证是指我们如何验证试图访问特定资源的人的身份。一个常见的验证用户的方法是要求用户输入用户名和密码。一旦进行了认证，我们就知道了身份并可以执行授权。</p>
</blockquote>
<p>在我们导入SpringSecurity框架时，框架会默认帮我们添加一层保护给系统的资源，每次访问资源都会先经过一层身份的校验。</p>
<p><strong>SpringSecurity功能的实现主要由一系列的过滤链相互配合完成，也称为过滤器链条。</strong></p>
<h3 id="核心组件" tabindex="-1"><a class="header-anchor" href="#核心组件"><span>核心组件</span></a></h3>
<p>支撑Spring Security 的对Servlet 应用的一套认证流程都是依赖着以下几个组件：</p>
<figure><img src="@source/backend/image/image_HLmwMKcAy8.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>
<p>SecurityContextHandler </p>
<ul>
<li>用于管理SpringContext的</li>
<li>一个工具类，它提供了对安全上下文的访问，默认情况下，使用了一个ThreadLocal对象来存储安全上下文，这意味着它是线程安全的</li>
<li> 使用 ThreadLocal 来存储这些细节，这很重要，意味着SpringContext 在同一线程下都是可以取来用的</li>
</ul>
</li>
<li>
<p>SecurityContext </p>
<ul>
<li>他其实就包含了一个Authentication对象，而Authentication里面存的就是用户的详细认证信息的，为什么是一个呢？结合ThreadLocal来看，这个Authentication其实就是当前用户的认证信息。即我们可以从SecurityContext中获取当前用户的认证信息</li>
</ul>
</li>
<li>
<p>Authentication  </p>
<ul>
<li>存储了当前用户的详细信息</li>
<li>Principal 可以理解为用户的信息</li>
<li>Credentials 可以理解为密码（凭证）</li>
<li>Authorities 可以理解为权限</li>
</ul>
</li>
<li>
<p>GrantedAuthority</p>
<p>这是用于管理用户权限的，可以通过<code v-pre>Authentication.getAuthorities()</code>法来获取</p>
</li>
<li>
<p>UserDetails</p>
<ul>
<li>具备一系列的属性约束的</li>
</ul>
</li>
<li>
<p>UserDetailsService</p>
<ul>
<li>从数据存储中根据用户名找到用户
UserDetailsService只定义了这么一个接口方法</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserDetailsService</span> <span class="token punctuation">{</span>
    <span class="token class-name">UserDetails</span> <span class="token function">loadUserByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> var1<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UsernameNotFoundException</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>这两个对象不负责认证工作，只是提供数据，所以我们一般都通过拓展来实现自定义的数据库结构</p>
<ul>
<li>AuthenticationManager
<ul>
<li>这是定义了Spring Securiy 的Filter是如何执行认证的API，也就是用来管理Spring Security的认证过滤链的了</li>
<li>也就是说如果我们想要定义一个自己的Filter，可以通过实现AuthenticationManager来完成</li>
</ul>
</li>
<li>ProviderManager
<ul>
<li>
<p>这是最常用的AuthenticationManager实现类，其内部是由一连串的过滤链组成，这些过滤链会层层传递，一层出错或者说认证错误就不能够继续向下执行了，会抛出AuthenticationException</p>
<figure><img src="@source/backend/image/image_BuD9G2nIWy.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
<li>
<p>另外AuthenticationManager是可以有多个继承类的，这意味着我们可以为我们的应用设置多套过滤链，说人话就是我们可以有手机号认证的同时也可以有账号、密码认证等多种认证方式</p>
<figure><img src="@source/backend/image/image_qZuTrLGZ-n.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
</ul>
<blockquote>
<p>你可以在 <a href="https://springdoc.cn/spring-security/servlet/authentication/architecture.html#servlet-authentication-providermanager" title="ProviderManager" target="_blank" rel="noopener noreferrer">ProviderManager<ExternalLinkIcon/></a> 中注入多个 <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/authentication/AuthenticationProvider.html" title="AuthenticationProvider" target="_blank" rel="noopener noreferrer">AuthenticationProvider<ExternalLinkIcon/></a> 实例。每个 <code v-pre>AuthenticationProvider</code> 都执行一种特定类型的认证。例如， <a href="https://springdoc.cn/spring-security/servlet/authentication/passwords/dao-authentication-provider.html#servlet-authentication-daoauthenticationprovider" title="DaoAuthenticationProvider" target="_blank" rel="noopener noreferrer">DaoAuthenticationProvider<ExternalLinkIcon/></a> 支持基于用户名/密码的认证，而 <code v-pre>JwtAuthenticationProvider</code> 支持认证JWT令牌。</p>
</blockquote>
</li>
<li>AbstractAuthenticationProcessingFilter
<ul>
<li>
<p>这是校验用户凭证很重要的一个Filter，他其实是过滤链（SecurityFilterChain）中的一环</p>
</li>
<li>
<p>以下是他认证的流程，这是比较重要的，理解下来，对于我们后面对认证流程的理解做拓展是非常有帮助的，其实所有的认证流程都是这么跑的，只是这图对对应的FIlter和校验信息Authentication做了抽象而已，不妨我们对比一下两张图，上图就是认证流程，下图是用户表单提交的认证流程。</p>
<figure><img src="@source/backend/image/image_iF8AjzuH0o.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="@source/backend/image/image_XYuC61IfQF.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol>
<li>当用户提交凭证的时候，AbstractAuthenticationProcessingFilter会从HttpServletRequest中创建一个会根据校验类型来创建要进行认证的Authentication</li>
<li>交给AuthenticationManager进行认证</li>
<li>如果认证失败
<ol>
<li>SecurityContextHolder被清空</li>
<li>RememberMeServices.loginFail方法会被调用</li>
<li>AuthenticationFailureHandler 被调用</li>
</ol>
</li>
<li>认证成功
<ol>
<li>SessionAuthenticationStrategy 被通知有新登陆</li>
<li>Authentication 是在SecurityContextHolder上设置的，如果想要保存SecurityContext以便在后面的请求中自动设置，需要调用SecurityContext Repository,saveContext</li>
<li>RemeberMeServices.loginSuccess被调用</li>
<li>ApplicationEventPublisher 发布一个InteractiveAuthenticationSuccessEvent事件</li>
<li>AuthenticationSuccessHandler被调用</li>
</ol>
</li>
</ol>
</li>
</ul>
</li>
</ul>
<h3 id="简单认证" tabindex="-1"><a class="header-anchor" href="#简单认证"><span>简单认证</span></a></h3>
<h4 id="表单认证" tabindex="-1"><a class="header-anchor" href="#表单认证"><span>表单认证</span></a></h4>
<p>表单认证其实配置起来还是比较简单的，也就是一句配置的事儿，而Spring Security 表单登录是默认被启用的，所以如果是想要默认的表单登录方式的话，其实是不需要配置的，如果想要配置我们需要这样配置，其实就是对formLogin进行配置</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">filterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  http
    <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以配置具体的登陆页面，或者说登陆接口</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">filterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  http
    <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>form <span class="token operator">-></span> form
      <span class="token punctuation">.</span><span class="token function">loginPage</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们什么都不配置，直接启动的话，就会得到一个临时的密码，结合初始化用户名user就可以跑通默认的认证逻辑了</p>
<figure><img src="@source/backend/image/image_fJtmOLTwA6.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="密码存储" tabindex="-1"><a class="header-anchor" href="#密码存储"><span>密码存储</span></a></h4>
<h5 id="内存存储" tabindex="-1"><a class="header-anchor" href="#内存存储"><span>内存存储</span></a></h5>
<p>Spring Security提供的密码存储方式是非常多的，最简单的，也是我们学习过程中便于用来测试的就是直接把用户信息存在内存里了,当然我们还需要指定使用的加密方式</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">UserDetailsService</span> <span class="token function">users</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">UserDetails</span> user <span class="token operator">=</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">username</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">"$2a$16$lPDF8WO5iqGy9xTGwj3iDeDh8G8u47pdkKcb1OKz0wOcQqgr0EF5i"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">"USER"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">InMemoryUserDetailsManager</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">BCryptPasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>密码生成我们可以采用以下代码设置</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Create an encoder with strength 16</span>
        <span class="token class-name">BCryptPasswordEncoder</span> encoder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> encoder<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring Security还为我们提供了非常多的加密方式的，不过其默认采用的是DelegatingPasswordEncoder加密方式，更多的可以浏览官方说明</p>
<p><a href="https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-dpe" title="https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-dpe" target="_blank" rel="noopener noreferrer">https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-dpe<ExternalLinkIcon/></a></p>
<p>里面提到很多加密方式都是相对安全的，当然选择了对应的加密方式，我们还需要把对应的<code v-pre>PasswordEncoder</code>暴露出来供Spring使用才行喔，就像下面这样</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">PasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="数据库存储" tabindex="-1"><a class="header-anchor" href="#数据库存储"><span>数据库存储</span></a></h5>
<p>当然我们在日常开发中是需要使用到数据库的，而Spring Security是给我们提供了JDBC的存储方式的，包括修改密码，都可以通过配置进行处理</p>
<p>接下来就以Spring Security + Mysql为例</p>
<p>首先我们当然需要先具备一张User 表</p>
<div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>sys_user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户ID'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>user_name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户账号'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>nick_name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户昵称'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>user_type<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">'00'</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户类型（00系统用户）'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>email<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户邮箱'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>phonenumber<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span> <span class="token keyword">COMMENT</span> <span class="token string">'手机号码'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>sex<span class="token punctuation">`</span></span> <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户性别（0男 1女 2未知）'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>avatar<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span> <span class="token keyword">COMMENT</span> <span class="token string">'头像地址'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>password<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span> <span class="token keyword">COMMENT</span> <span class="token string">'密码'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span> <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'帐号状态（0正常 1停用）'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>login_ip<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span> <span class="token keyword">COMMENT</span> <span class="token string">'最后登录IP'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>login_date<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'最后登录时间'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>remark<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8 <span class="token keyword">COLLATE</span> utf8_general_ci <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'备注'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>create_user<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'创建者'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>create_time<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'创建时间'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>update_user<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'更新者'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>update_time<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'更新时间'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>del_flag<span class="token punctuation">`</span></span> <span class="token keyword">bit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'逻辑删除(1:已删除，0:未删除)'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1686027685614125058</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb3 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">'用户信息表'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导入Druid 驱动 和 Mybatis plus 用于操作数据库</p>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code>       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.2.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-plus-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.5.4.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们需要创建一个实体类，Spring Security 给我们提供了User基础实体类给我们使用的，我们只需写一些额外的属性即可</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Setter</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserVo</span> <span class="token keyword">extends</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> phone<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> sex<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">UserVo</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">,</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> authorities<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">,</span> authorities<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不妨我们可以点进User看看，可以看到这个基础实体类中已经含有username和password，并且实现了UserDetails了，如果不想使用该提供的User类，我们也要模拟这个做法，实现UserDetails接口，这样才能综合UserDetailsServices接口获取用户持久化凭证信息</p>
<p>不过从User这个类可以看出来他配置的是username和password，不一定就跟我们的数据库是对应上的</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">implements</span> <span class="token class-name">UserDetails</span><span class="token punctuation">,</span> <span class="token class-name">CredentialsContainer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">610L</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Log</span> logger <span class="token operator">=</span> <span class="token class-name">LogFactory</span><span class="token punctuation">.</span><span class="token function">getLog</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> authorities<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> accountNonExpired<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> accountNonLocked<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> credentialsNonExpired<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> enabled<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是我们自创的UserVo 不想使用User的话，那实现UserDetails即可，这个是用于接受我们输入的数据的</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@TableName</span><span class="token punctuation">(</span>value <span class="token operator">=</span><span class="token string">"sys_user"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@ToString</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SysUser</span>  <span class="token keyword">implements</span> <span class="token class-name">Serializable</span><span class="token punctuation">,</span> <span class="token class-name">UserDetails</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 用户ID
     */</span>
    <span class="token annotation punctuation">@TableId</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">IdType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户账号
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userName<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户昵称
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> nickName<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户类型（00系统用户）
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userType<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户邮箱
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 手机号码
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> phonenumber<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户性别（0男 1女 2未知）
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> sex<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 头像地址
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> avatar<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 密码
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 帐号状态（0正常 1停用）
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> status<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 最后登录IP
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> loginIp<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 最后登录时间
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> loginDate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 备注
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> remark<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建者
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> createUser<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建时间
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> createTime<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 更新者
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> updateUser<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 更新时间
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> updateTime<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 逻辑删除(1:已删除，0:未删除)
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> del_flag<span class="token punctuation">;</span>


    <span class="token keyword">private</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> authorities<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>exist <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> <span class="token function">getAuthorities</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> authorities<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> password<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isAccountNonExpired</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isAccountNonLocked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isCredentialsNonExpired</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们就需要创建一个UserImpl实现SpringSecurity提供的UserDetailsService接口，可以看到他就是用UserDetails进行接收我们的用户信息的，这也是我们要通过实体类实现这个接口的原因</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SysUserServiceImpl</span> <span class="token keyword">extends</span> <span class="token class-name">ServiceImpl</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SysUserMapper</span><span class="token punctuation">,</span> <span class="token class-name">SysUser</span><span class="token punctuation">></span></span>
    <span class="token keyword">implements</span> <span class="token class-name">SysUserService</span><span class="token punctuation">,</span> <span class="token class-name">UserDetailsService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">UserDetails</span> <span class="token function">loadUserByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UsernameNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只需要实现loadUserByUsername方法，跑通该方法，用户凭证信息就会被存于UserDetails</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">UserDetails</span> <span class="token function">loadUserByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UsernameNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SysUser</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">,</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getOne</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么用户信息如何进行校验呢？只需使用AuthenticationManager帮助我们进行校验即可，方法还是非常简单的</p>
<p>先全局注入AuthenticationManager Bean </p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">AuthenticationManager</span> <span class="token function">getAuthenticationManager</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationConfiguration</span> authenticationConfiguration<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> authenticationConfiguration<span class="token punctuation">.</span><span class="token function">getAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">AuthenticationManager</span> authenticationManager<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">Login</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">SysUser</span> sysUser<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">UsernamePasswordAuthenticationToken</span> token <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span>sysUser<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sysUser<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Authentication</span> authenticate <span class="token operator">=</span> authenticationManager<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>authenticate<span class="token punctuation">.</span><span class="token function">isAuthenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token string">"fail"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">"success"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们需要修改Spring Security 配置，requestMatchers表示对该路径请求放行，并禁用默认开启的cors，csrf，formLogin</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http
<span class="token comment">//                .userDetailsService(userService)</span>
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    auth
                            <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token string">"/system/auth/login"</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">cors</span><span class="token punctuation">(</span>c <span class="token operator">-></span> <span class="token punctuation">{</span>
                    c<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>c <span class="token operator">-></span> <span class="token punctuation">{</span>
                    c<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>f <span class="token operator">-></span> <span class="token punctuation">{</span>
                    f<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成至这部，简单的用户认证就算完成了。</p>
<figure><img src="@source/backend/image/image_6W62PtYUyY.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="认证流程分析" tabindex="-1"><a class="header-anchor" href="#认证流程分析"><span>认证流程分析</span></a></h3>
<p>浅试了Spring Security 的认证，那么接下来就一起来看看以上的用户认证是怎么在Spring Security 跑通的吧,首先大家可以先回头回顾一下核心组件的内容，然后我们就一块走进Spring Security咯</p>
<p>首先我们需要先找到入口，从以下代码来看，我们是通过请求中传过来的用户名，密码包装成UsernamePasswordAuthenticationToken传给了Authentication，所以很显然，Authentication就是我们需要探索的入口</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>  <span class="token class-name">UsernamePasswordAuthenticationToken</span> token <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span>sysUser<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sysUser<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">Authentication</span> authenticate <span class="token operator">=</span> authenticationManager<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AuthenticationManager</span> <span class="token punctuation">{</span>
    <span class="token class-name">Authentication</span> <span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token class-name">Authentication</span> authentication<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跑进去后，我们发现AuthenticationManager是 一个接口，不过ProviderManager是AuthenticationManager最常用的实现类了，所以我们果断将断点打到该实现类上，以下就是认证核心代码</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>      <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Authentication</span><span class="token punctuation">></span></span> toTest <span class="token operator">=</span> authentication<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">AuthenticationException</span> lastException <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">AuthenticationException</span> parentException <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Authentication</span> result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Authentication</span> parentResult <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> currentPosition <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>providers<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Iterator</span> var9 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getProviders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span><span class="token punctuation">(</span>var9<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">AuthenticationProvider</span> provider <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">AuthenticationProvider</span><span class="token punctuation">)</span>var9<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>provider<span class="token punctuation">.</span><span class="token function">supports</span><span class="token punctuation">(</span>toTest<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isTraceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Log</span> var10000 <span class="token operator">=</span> logger<span class="token punctuation">;</span>
                    <span class="token class-name">String</span> var10002 <span class="token operator">=</span> provider<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token operator">++</span>currentPosition<span class="token punctuation">;</span>
                    var10000<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span><span class="token class-name">LogMessage</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"Authenticating request with %s (%d/%d)"</span><span class="token punctuation">,</span> var10002<span class="token punctuation">,</span> currentPosition<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    result <span class="token operator">=</span> provider<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">copyDetails</span><span class="token punctuation">(</span>authentication<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InternalAuthenticationServiceException</span> <span class="token operator">|</span> <span class="token class-name">AccountStatusException</span> var14<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">prepareException</span><span class="token punctuation">(</span>var14<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">throw</span> var14<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">AuthenticationException</span> var15<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    lastException <span class="token operator">=</span> var15<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                parentResult <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parent<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
                result <span class="token operator">=</span> parentResult<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ProviderNotFoundException</span> var12<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">AuthenticationException</span> var13<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                parentException <span class="token operator">=</span> var13<span class="token punctuation">;</span>
                lastException <span class="token operator">=</span> var13<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>eraseCredentialsAfterAuthentication <span class="token operator">&amp;&amp;</span> result <span class="token keyword">instanceof</span> <span class="token class-name">CredentialsContainer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">CredentialsContainer</span><span class="token punctuation">)</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eraseCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>parentResult <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>eventPublisher<span class="token punctuation">.</span><span class="token function">publishAuthenticationSuccess</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>lastException <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                lastException <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProviderNotFoundException</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>messages<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token string">"ProviderManager.providerNotFound"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>toTest<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"No AuthenticationProvider found for {0}"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>parentException <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">prepareException</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationException</span><span class="token punctuation">)</span>lastException<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">throw</span> lastException<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们主要关注这部分，这部分可不就是跟图对应起来了吗？没错ProviderManager就是管理所有的AuthenticationProvider，而代码中不就是遍历所有的AuthenticationProvider，并把我们传入的待认证信息传给每个AuthenticationProvider进行校验吗？</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>  <span class="token keyword">while</span><span class="token punctuation">(</span>var9<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">AuthenticationProvider</span> provider <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">AuthenticationProvider</span><span class="token punctuation">)</span>var9<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>provider<span class="token punctuation">.</span><span class="token function">supports</span><span class="token punctuation">(</span>toTest<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isTraceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Log</span> var10000 <span class="token operator">=</span> logger<span class="token punctuation">;</span>
                    <span class="token class-name">String</span> var10002 <span class="token operator">=</span> provider<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token operator">++</span>currentPosition<span class="token punctuation">;</span>
                    var10000<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span><span class="token class-name">LogMessage</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"Authenticating request with %s (%d/%d)"</span><span class="token punctuation">,</span> var10002<span class="token punctuation">,</span> currentPosition<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    result <span class="token operator">=</span> provider<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">copyDetails</span><span class="token punctuation">(</span>authentication<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InternalAuthenticationServiceException</span> <span class="token operator">|</span> <span class="token class-name">AccountStatusException</span> var14<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">prepareException</span><span class="token punctuation">(</span>var14<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">throw</span> var14<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">AuthenticationException</span> var15<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    lastException <span class="token operator">=</span> var15<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/backend/image/image_BuD9G2nIWy.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>那我们先来看看providers中都有什么，第一个就是DaoAuthenticationProvider，进入该Provider看看他是做什么的，点进去我们会发现该Provider 是继承于AbstractUserDetailsAuthenticationProvider的，Dao如果我们猜的话，应该不难猜出来他应该是通过查询数据库或者说是属于一个数据层的实现，不过我们还是得先看看其父类到底做了什么？再逐步回到子类对父类方法的实现</p>
<figure><img src="@source/backend/image/image_ZFQtLDcSZp.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>跑到父类AbstractUserDetailsAuthenticationProvider，最最显眼的自然就是authenticate了，从名字看就能看出来他应该是认证的核心方法了，其实这段代码很明显是做了用户认证信息的检查校验了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">Authentication</span> <span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token class-name">Authentication</span> authentication<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> authentication<span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token keyword">this</span><span class="token punctuation">.</span>messages<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token string">"AbstractUserDetailsAuthenticationProvider.onlySupports"</span><span class="token punctuation">,</span>
            <span class="token string">"Only UsernamePasswordAuthenticationToken is supported"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token function">determineUsername</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> cacheWasUsed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token comment">//从缓存中获取用户信息</span>
    <span class="token class-name">UserDetails</span> user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userCache<span class="token punctuation">.</span><span class="token function">getUserFromCache</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>user <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      cacheWasUsed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">//缓存没有的情况</span>
        user <span class="token operator">=</span> <span class="token function">retrieveUser</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">)</span> authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UsernameNotFoundException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"Failed to find user '"</span> <span class="token operator">+</span> username <span class="token operator">+</span> <span class="token string">"'"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>hideUserNotFoundExceptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BadCredentialsException</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>messages
          <span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token string">"AbstractUserDetailsAuthenticationProvider.badCredentials"</span><span class="token punctuation">,</span> <span class="token string">"Bad credentials"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">notNull</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token string">"retrieveUser returned null - a violation of the interface contract"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">//前检查由DefaultPreAuthenticationChecks类实现（主要判断当前用户是否锁定，过期，冻结User接口）</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>preAuthenticationChecks<span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//校验信息，由子类实现</span>
      <span class="token function">additionalAuthenticationChecks</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">)</span> authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">AuthenticationException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cacheWasUsed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// There was a problem, so try again after checking</span>
      <span class="token comment">// we're using latest data (i.e. not from the cache)</span>
      cacheWasUsed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      user <span class="token operator">=</span> <span class="token function">retrieveUser</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">)</span> authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>preAuthenticationChecks<span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">additionalAuthenticationChecks</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">)</span> authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>postAuthenticationChecks<span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cacheWasUsed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>userCache<span class="token punctuation">.</span><span class="token function">putUserInCache</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Object</span> principalToReturn <span class="token operator">=</span> user<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>forcePrincipalAsString<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      principalToReturn <span class="token operator">=</span> user<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">createSuccessAuthentication</span><span class="token punctuation">(</span>principalToReturn<span class="token punctuation">,</span> authentication<span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么接下来我们就来看看子类是怎么实现这些方法的，其中有两个方法是子类实现的，两个方法的逻辑很简单明了了，1是调用了loadUserByUsername方法，2是密码比对，而loadUserByUsername就是我们实现的Service方法了</p>
<p>校验主要有三步</p>
<ol>
<li>preAuthenticationChecks 前检查由DefaultPreAuthenticationChecks类实现主要判断当前用户是否锁定，过期，冻结</li>
<li>additionalAuthenticationChecks（抽象方法，子类实现）密码比对</li>
<li>postAuthenticationChecks 检测用户密码是否过期</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
  <span class="token keyword">protected</span> <span class="token keyword">final</span> <span class="token class-name">UserDetails</span> <span class="token function">retrieveUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span> authentication<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span> <span class="token punctuation">{</span>
    <span class="token function">prepareTimingAttackProtection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token class-name">UserDetails</span> loadedUser <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getUserDetailsService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">loadUserByUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>loadedUser <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InternalAuthenticationServiceException</span><span class="token punctuation">(</span>
            <span class="token string">"UserDetailsService returned null, which is an interface contract violation"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> loadedUser<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UsernameNotFoundException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">mitigateAgainstTimingAttack</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InternalAuthenticationServiceException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InternalAuthenticationServiceException</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
  <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"deprecation"</span><span class="token punctuation">)</span>
  <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">additionalAuthenticationChecks</span><span class="token punctuation">(</span><span class="token class-name">UserDetails</span> userDetails<span class="token punctuation">,</span>
      <span class="token class-name">UsernamePasswordAuthenticationToken</span> authentication<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>authentication<span class="token punctuation">.</span><span class="token function">getCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"Failed to authenticate since no credentials provided"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BadCredentialsException</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>messages
        <span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token string">"AbstractUserDetailsAuthenticationProvider.badCredentials"</span><span class="token punctuation">,</span> <span class="token string">"Bad credentials"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> presentedPassword <span class="token operator">=</span> authentication<span class="token punctuation">.</span><span class="token function">getCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>passwordEncoder<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>presentedPassword<span class="token punctuation">,</span> userDetails<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"Failed to authenticate since password does not match stored value"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BadCredentialsException</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>messages
        <span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token string">"AbstractUserDetailsAuthenticationProvider.badCredentials"</span><span class="token punctuation">,</span> <span class="token string">"Bad credentials"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本的用户名，密码的认证流程可以先到这个告一段落了，为了能让整个流程更加直观，可以根据下图再跑跑debug ，相信会更加清晰的</p>
<figure><img src="@source/backend/image/image_ZuSTsAricF.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="过滤器链" tabindex="-1"><a class="header-anchor" href="#过滤器链"><span>过滤器链</span></a></h3>
<p>基本的认证流程到这里相信大家有了不少了解，而刚刚我们研究的都只是Spring Security 中的一条过滤链，即UsernamePasswordAuthenticationFilter，而在Spring Security中还是有很多过滤链的，包括我们需要拓展Spring Security的功能，最好的方式也是添加一个Filter到其中</p>
<p>Spring Security 是由一系列的过滤链配合完成，更加直观地说呢，就是不管你是请求还是响应，都必须经过他每一层过滤器的校验，校验<strong>都通过</strong>才能顺利访问到后端服务器，他就是我们访问后端服务器路途中的层层关卡</p>
<figure><img src="@source/backend/image/image_gcZer2ZKEp.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>当然每个过滤器都有其职责的</p>
<ul>
<li>WebAsyncManagerIntegrationFilter 此过滤器用于集成SecurityContext到Spring异步执行机制中的WebAsyncManager</li>
<li>UsernamePasswordAuthenticationFilter 认证操作全靠这个过滤器，默认匹配URL为/login且必须为POST请求。</li>
<li>BasicAuthenticationFilter 此过滤器会自动解析HTTP请求中头部名字为Authentication，且以Basic开头的头信息。</li>
<li>DefaultLoginPageGeneratingFilter 默认的登陆页面生成过滤器，用于生成一个登录页，如果没有禁用，则系统会自动给我们生成对应的登陆页，这就是为什么当我们引入Spring Security时会自动产生一个登录页的原因</li>
<li>DefaultLogoutPageGeneratingFilter 如果没有禁用该功能，会生成一个注销页</li>
<li>ExceptionTranslationFilter 异常转换过滤器位于整个springSecurityFilterChain的后方，用来转换整个链路中出现的异常</li>
<li>FilterSecurityInterceptor  获取所配置资源访问的授权信息，根据SecurityContextHolder中存储的用户信息来决定其是否有权限。</li>
</ul>
<p>把整个过滤器链熟悉下来，对于后面对Spring Security 拓展是十分有帮助的，在这里我们先花点时间记住这条过滤器链。</p>
<p>当我们开启Spring Security 日志时，Spring 项目开启时，会出现以下日志</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>context<span class="token punctuation">.</span></span>SecurityContextPersistenceFilter</span><span class="token annotation punctuation">@8851ce1</span><span class="token punctuation">,</span>
<span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>header<span class="token punctuation">.</span></span>HeaderWriterFilter</span><span class="token annotation punctuation">@6a472566</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>csrf<span class="token punctuation">.</span></span>CsrfFilter</span><span class="token annotation punctuation">@61cd1c71</span><span class="token punctuation">,</span>
<span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>authentication<span class="token punctuation">.</span>logout<span class="token punctuation">.</span></span>LogoutFilter</span><span class="token annotation punctuation">@5e1d03d7</span><span class="token punctuation">,</span>
<span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>authentication<span class="token punctuation">.</span></span>UsernamePasswordAuthenticationFilter</span><span class="token annotation punctuation">@122d6c22</span><span class="token punctuation">,</span>
<span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>savedrequest<span class="token punctuation">.</span></span>RequestCacheAwareFilter</span><span class="token annotation punctuation">@5ef6fd7f</span><span class="token punctuation">,</span>
<span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servletapi<span class="token punctuation">.</span></span>SecurityContextHolderAwareRequestFilter</span><span class="token annotation punctuation">@4beaf6bd</span><span class="token punctuation">,</span>
<span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>authentication<span class="token punctuation">.</span></span>AnonymousAuthenticationFilter</span><span class="token annotation punctuation">@6edcad64</span><span class="token punctuation">,</span>
<span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span>SessionManagementFilter</span><span class="token annotation punctuation">@5e65afb6</span><span class="token punctuation">,</span>
<span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>access<span class="token punctuation">.</span></span>ExceptionTranslationFilter</span><span class="token annotation punctuation">@5b9396d3</span><span class="token punctuation">,</span>
<span class="token class-name"><span class="token namespace">o<span class="token punctuation">.</span>s<span class="token punctuation">.</span>s<span class="token punctuation">.</span>web<span class="token punctuation">.</span>access<span class="token punctuation">.</span>intercept<span class="token punctuation">.</span></span>FilterSecurityInterceptor</span><span class="token annotation punctuation">@3c5dbdf8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>许多过滤器其实都是望文生义的。</p>
<h3 id="remeber-me" tabindex="-1"><a class="header-anchor" href="#remeber-me"><span>Remeber me </span></a></h3>
<p>为解决session 过期后用户的直接访问问题，Spring Security 提供开箱即用的配置remember me</p>
<p>原理：</p>
<figure><img src="@source/backend/image/image_LLFEoToHsv.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>当用户第一次访问时，需要用户名密码认证，所以会走UserPasswordAuthenticationFilter，认证成功后会在RemembermeService生成Token并通过TokenRepository写到数据库中，发送到浏览器的Token会存储到cookies当中。</li>
<li>第二次访问或者服务重启后，浏览器再次访问会带着Token进行访问，此时会走RemembermeAuthenticationFilter，RemembermeAuthenticationFilter主要就是Cookies中获取Token通过RemembermeService查询数据库，最后获取响应信息存储到UserDetails中。</li>
<li>使用cookie 存储用户名，过期时间，以及一个HashHash是由md5(用户名+过期时间+密码+key)</li>
</ul>
<h4 id="开启remeber-me" tabindex="-1"><a class="header-anchor" href="#开启remeber-me"><span>开启Remeber me</span></a></h4>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">,</span><span class="token class-name">RememberMeServices</span> rememberMeServices<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http
<span class="token comment">//                .userDetailsService(userService)</span>
                <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    auth
                            <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token string">"/system/auth/login"</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">cors</span><span class="token punctuation">(</span>c <span class="token operator">-></span> <span class="token punctuation">{</span>
                    c<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span>c <span class="token operator">-></span> <span class="token punctuation">{</span>
                    c<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>f <span class="token operator">-></span> <span class="token punctuation">{</span>
                    f<span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">rememberMe</span><span class="token punctuation">(</span>r <span class="token operator">-></span> <span class="token punctuation">{</span>
                    r<span class="token punctuation">.</span><span class="token function">rememberMeServices</span><span class="token punctuation">(</span>rememberMeServices<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">RememberMeServices</span> <span class="token function">rememberMeServices</span><span class="token punctuation">(</span><span class="token class-name">UserDetailsService</span> userDetailsService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">TokenBasedRememberMeServices<span class="token punctuation">.</span>RememberMeTokenAlgorithm</span> encodingAlgorithm <span class="token operator">=</span> <span class="token class-name">TokenBasedRememberMeServices<span class="token punctuation">.</span>RememberMeTokenAlgorithm</span><span class="token punctuation">.</span><span class="token constant">SHA256</span><span class="token punctuation">;</span>
        <span class="token class-name">TokenBasedRememberMeServices</span> rememberMe <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TokenBasedRememberMeServices</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">,</span> userDetailsService<span class="token punctuation">,</span> encodingAlgorithm<span class="token punctuation">)</span><span class="token punctuation">;</span>
        rememberMe<span class="token punctuation">.</span><span class="token function">setMatchingAlgorithm</span><span class="token punctuation">(</span><span class="token class-name">TokenBasedRememberMeServices<span class="token punctuation">.</span>RememberMeTokenAlgorithm</span><span class="token punctuation">.</span><span class="token constant">MD5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> rememberMe<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注销" tabindex="-1"><a class="header-anchor" href="#注销"><span>注销</span></a></h3>
<p>Spring Security本身就对注销有支持的，默认的url是/logout,当我们注销的时候，Spring Security会有一些默认行为</p>
<ul>
<li>使 HTTP session无效 </li>
<li>清理 <a href="https://springdoc.cn/spring-security/servlet/authentication/session-management.html#use-securitycontextholderstrategy" title="SecurityContextHolderStrategy" target="_blank" rel="noopener noreferrer">SecurityContextHolderStrategy<ExternalLinkIcon/></a></li>
<li>清理 <a href="https://springdoc.cn/spring-security/servlet/authentication/persistence.html#securitycontextrepository" title="SecurityContextRepository" target="_blank" rel="noopener noreferrer">SecurityContextRepository<ExternalLinkIcon/></a></li>
<li>清理任何 <a href="https://springdoc.cn/spring-security/servlet/authentication/rememberme.html" title="RememberMe 认证" target="_blank" rel="noopener noreferrer">RememberMe 认证<ExternalLinkIcon/></a> </li>
<li>清除任何已保存的 <a href="https://springdoc.cn/spring-security/servlet/exploits/csrf.html" title="CSRF token" target="_blank" rel="noopener noreferrer">CSRF token<ExternalLinkIcon/></a></li>
<li><a href="https://springdoc.cn/spring-security/servlet/authentication/events.html" title="触发" target="_blank" rel="noopener noreferrer">触发<ExternalLinkIcon/></a> <code v-pre>LogoutSuccessEvent</code></li>
</ul>
<p>当然我们可以自定义url，在配置中进行配置即可，还可以配置注销成功后指向的请求</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>http
    <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span><span class="token punctuation">(</span>authorize<span class="token punctuation">)</span> <span class="token operator">-></span> authorize
        <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token string">"/my/success/endpoint"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">(</span>logout<span class="token punctuation">)</span> <span class="token operator">-></span> logout<span class="token punctuation">.</span><span class="token function">logoutSuccessUrl</span><span class="token punctuation">(</span><span class="token string">"/my/success/endpoint"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注销其实也是为了做一个用户信息清理的工作或者其他清理的工作，Spring Security也是提供了部分清理的方法我们使用的</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token class-name">CookieClearingLogoutHandler</span> cookies <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CookieClearingLogoutHandler</span><span class="token punctuation">(</span><span class="token string">"our-custom-cookie"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
http
    <span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">(</span>logout<span class="token punctuation">)</span> <span class="token operator">-></span> logout<span class="token punctuation">.</span><span class="token function">addLogoutHandler</span><span class="token punctuation">(</span>cookies<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有更为安全的清理方式，使用Clear-Site-Data来清理，这是会直接清理所有跟自己网站相关的缓存，cookie，storage的，其实就是给请求头添加一个Clear-Site-Data，让浏览器执行该指令的</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token class-name">HeaderWriterLogoutHandler</span> clearSiteData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HeaderWriterLogoutHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClearSiteDataHeaderWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
http
    <span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">(</span>logout<span class="token punctuation">)</span> <span class="token operator">-></span> logout<span class="token punctuation">.</span><span class="token function">addLogoutHandler</span><span class="token punctuation">(</span>clearSiteData<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有时候我们需要自定义一些注销成功的事件，我们可以这么做，HttpStatusReturningLogoutSuccessHandler 可以替换成我们自定义的</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>http
    <span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">(</span>logout<span class="token punctuation">)</span> <span class="token operator">-></span> logout<span class="token punctuation">.</span><span class="token function">logoutSuccessHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HttpStatusReturningLogoutSuccessHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="认证事件" tabindex="-1"><a class="header-anchor" href="#认证事件"><span>认证事件</span></a></h3>
<p>Spring Security 对每一个认证成功或者失败都会触发相应的事件，为了监听这些事件，你必须先发布一个 AuthenticationEventPublisher。Spring Security的 DefaultAuthenticationEventPublisher 可以很好地实现这一目的，然后你可以使用Spring的 @EventListener 支持</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">AuthenticationEventPublisher</span> authenticationEventPublisher
        <span class="token punctuation">(</span><span class="token class-name">ApplicationEventPublisher</span> applicationEventPublisher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DefaultAuthenticationEventPublisher</span><span class="token punctuation">(</span>applicationEventPublisher<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthenticationEvents</span> <span class="token punctuation">{</span>
  <span class="token annotation punctuation">@EventListener</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onSuccess</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationSuccessEvent</span> success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@EventListener</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onFailure</span><span class="token punctuation">(</span><span class="token class-name">AbstractAuthenticationFailureEvent</span> failures<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拓展巩固" tabindex="-1"><a class="header-anchor" href="#拓展巩固"><span>拓展巩固</span></a></h3>
<h4 id="整合jwt" tabindex="-1"><a class="header-anchor" href="#整合jwt"><span>整合JWT</span></a></h4>
<p>JWT（JSON Web Token）是一种基于JSON的开放标准（RFC 7519），用于在网络应用程序之间安全地传递信息。它被用作身份验证和授权机制，用于验证用户身份和访问权限。</p>
<p>想要进一步了解的可以看：<a href="https://jwt.io/" title="https://jwt.io/" target="_blank" rel="noopener noreferrer">https://jwt.io/<ExternalLinkIcon/></a></p>
<p>优势：</p>
<ol>
<li>简单：JWT 非常简单，易于实现和理解。</li>
<li>安全：JWT 使用密码学保证数据的完整性和机密性。</li>
<li>跨域：JWT 可以在不同的域之间传递，使得跨域通信变得更加容易。</li>
<li>灵活：JWT 可以存储多种类型的数据，例如用户ID、角色、权限等。</li>
<li>标准化：JWT 是一种开放标准，可以在各种编程语言和框架中使用。</li>
</ol>
<p>劣势：</p>
<ol>
<li>有限的用途：JWT 通常用于身份验证和授权，但在其他场景中可能不适用。</li>
<li>容易受到中间人攻击：如果 JWT 没有正确设置，容易受到中间人攻击，导致数据泄露或伪造。</li>
<li>密钥管理：JWT 使用密码学保证数据的完整性和机密性，但是密钥管理需要谨慎，否则容易受到攻击。</li>
<li>有限的信息：JWT 只能存储有限的数据，过多的装载会使得请求头过重</li>
<li>有限的签名算法：JWT 使用哈希函数进行签名，但是目前只支持 SHA-1 和 SHA-256 算法，这可能会受到安全问题的影响。</li>
</ol>
<p>JWT工作流程</p>
<figure><img src="@source/backend/image/image_S_i3hAv6Fp.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>代码实践</p>
<p>首先需要引入依赖</p>
<div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-api --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.11.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-impl --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt-impl<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.11.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-jackson --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt-jackson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.11.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就是创建一个JWT工具类帮助我们创建jwt</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JwtUtils</span> <span class="token punctuation">{</span>

    <span class="token comment">//创建密钥</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Key</span> <span class="token constant">JWT_KEY</span> <span class="token operator">=</span> <span class="token class-name">Keys</span><span class="token punctuation">.</span><span class="token function">secretKeyFor</span><span class="token punctuation">(</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//传入SysUser 是为了测试，正常情况下应是传入UserDetails</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">createJwt</span><span class="token punctuation">(</span><span class="token class-name">SysUser</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">long</span> now <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">claim</span><span class="token punctuation">(</span><span class="token string">"userId"</span><span class="token punctuation">,</span>user<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">claim</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">,</span>user<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setSubject</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setIssuedAt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//签名时间</span>
                <span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>now <span class="token operator">+</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//过期时间</span>
                <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span><span class="token constant">JWT_KEY</span><span class="token punctuation">,</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS256</span><span class="token punctuation">)</span> <span class="token comment">//签名密钥</span>
                <span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchAlgorithmException</span> <span class="token punctuation">{</span>
        <span class="token class-name">JwtUtils</span> jwtUtils <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JwtUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SysUser</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SysUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        user<span class="token punctuation">.</span><span class="token function">setUserName</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jwtUtils<span class="token punctuation">.</span><span class="token function">createJwt</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试可以看到生成了对应的token 了</p>
<figure><img src="@source/backend/image/image_HUyL-m0yyc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>通过createJwt工具方法创建了token后，我们可以构建一个方法来对token进行校验，下面代码对两个地方进行校验，1是过期时间，2是是否能够取到数据</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>   <span class="token doc-comment comment">/**
     * @Description 通过token获取Claims
     * @Author T
     * @Date 2024/4/28 18:51
     **/</span>
    <span class="token keyword">private</span> <span class="token class-name">Claims</span> <span class="token function">getClaimsByJwt</span><span class="token punctuation">(</span><span class="token class-name">String</span> jwt<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span>  <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span><span class="token constant">JWT_KEY</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>jwt<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
   <span class="token doc-comment comment">/**
     * @Description 检查Token是否过期
     * @Author T
     * @Date 2024/4/28 18:55     
     **/</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">validateJwt</span><span class="token punctuation">(</span><span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Claims</span> claims <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            claims <span class="token operator">=</span> <span class="token function">getClaimsByJwt</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> claims<span class="token punctuation">.</span><span class="token function">getExpiration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了有了这么个JWT工具类后，就可以尝试来完成过滤器部分了，即我们要创建一个JWTFilter放到Spring Security的过滤链上</p>
<p>JWTFilter工作有两个</p>
<ol>
<li>校验token</li>
<li>校验通过，刷新token</li>
<li>校验不通过，清除SecurityContext</li>
</ol>
<p>而token的格式我们可以设置为在请求头Authorization上 ，以T开头后跟token，当然这个可以自己来设定，但是在校验的时候要记得处理</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">checkJwtToken</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> authorization <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>authorization <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> authorization<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">"T "</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> token <span class="token operator">=</span> authorization<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>jwtUtils<span class="token punctuation">.</span><span class="token function">validateJwt</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> token<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们创建的JWTFilter要继承OncePerRequestFilter类，该Filter的功能还是相对比较简单的，就是校验token，有效就构建UsernamePasswordAuthenticationToken放在Context中表示已登陆，无效则清除了Context</p>
<p>构建UsernamePasswordAuthenticationToken的时候要注意，我们的目的其实是让 authenticated为true 让后面的UsernamePasswordAuthenticationFilter过滤器能够放行，这也是为什么我们需要把JWTFilter放在UsernamePasswordAuthenticationFilter的原因</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span><span class="token class-name">Object</span> principal<span class="token punctuation">,</span> <span class="token class-name">Object</span> credentials<span class="token punctuation">,</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> authorities<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>authorities<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>principal <span class="token operator">=</span> principal<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>credentials <span class="token operator">=</span> credentials<span class="token punctuation">;</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JWTFilter</span> <span class="token keyword">extends</span> <span class="token class-name">OncePerRequestFilter</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">JwtUtils</span> jwtUtils<span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doFilterInternal</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
         <span class="token class-name">String</span> token <span class="token operator">=</span> <span class="token function">checkJwtToken</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>token <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> username <span class="token operator">=</span> jwtUtils<span class="token punctuation">.</span><span class="token function">getClaimsByJwt</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSubject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">UsernamePasswordAuthenticationToken</span> authenticationToken <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            authenticationToken<span class="token punctuation">.</span><span class="token function">setDetails</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WebAuthenticationDetailsSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">buildDetails</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAuthentication</span><span class="token punctuation">(</span>authenticationToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Authentication</span> authentication <span class="token operator">=</span> <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
            filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">clearContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">checkJwtToken</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> authorization <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>authorization <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> authorization<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">"T "</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> token <span class="token operator">=</span> authorization<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>jwtUtils<span class="token punctuation">.</span><span class="token function">validateJwt</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> token<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，至此一个简单的JWTFilter 也差不多完成了。</p>
<h4 id="整合sms短信登陆认证" tabindex="-1"><a class="header-anchor" href="#整合sms短信登陆认证"><span>整合SMS短信登陆认证</span></a></h4>
<p>我们都知道其实Spring Security其实就是一条的过滤链，所以如果说我们想要对其进行拓展，是不是多加一条过滤链就行了呢？结果正是如此！跟JWT Filter一样的，只要校验通过了就直接SecurityContextHolder.getContext().setAuthentication(authenticationToken)就可以了，那么后面的用户名，密码校验就能通过了。</p>
<p>既然Spring Security是一条过滤链，那么现在就需要给这条链加一个过滤器，SmsAuthenticationFilter，</p>
<p>既然都是用于登录的过滤器，那么我们应该参考UsernamePasswordAuthenticationFilter是如何设计的，看源码可得知UsernamePasswordAuthenticationFilter继承于AbstractAuthenticationProcessingFilter</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UsernamePasswordAuthenticationFilter</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractAuthenticationProcessingFilter</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么我们就来模仿一下</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SmsAuthenticationFilter</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractAuthenticationProcessingFilter</span> <span class="token punctuation">{</span>


    <span class="token keyword">protected</span> <span class="token class-name">SmsAuthenticationFilter</span><span class="token punctuation">(</span><span class="token class-name">String</span> defaultFilterProcessesUrl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>defaultFilterProcessesUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">SmsAuthenticationFilter</span><span class="token punctuation">(</span><span class="token class-name">RequestMatcher</span> requiresAuthenticationRequestMatcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>requiresAuthenticationRequestMatcher<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Authentication</span> <span class="token function">attemptAuthentication</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> httpServletRequest<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> httpServletResponse<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来看看UsernamePasswordAuthenticationFilter源码，UsernamePasswordAuthenticationFilter会从request中获取username，password，同样其实我们是需要从request 中获取手机号</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">SPRING_SECURITY_FORM_USERNAME_KEY</span> <span class="token operator">=</span> <span class="token string">"username"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">SPRING_SECURITY_FORM_PASSWORD_KEY</span> <span class="token operator">=</span> <span class="token string">"password"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> usernameParameter <span class="token operator">=</span> <span class="token string">"username"</span><span class="token punctuation">;</span> 
    <span class="token keyword">private</span> <span class="token class-name">String</span> passwordParameter <span class="token operator">=</span> <span class="token string">"password"</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> postOnly <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">//判断请求必须是post请求</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好，再回到源码当中</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Authentication</span> <span class="token function">attemptAuthentication</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span> <span class="token punctuation">{</span>
        <span class="token comment">//判断必须是post请求</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>postOnly <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>request<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">AuthenticationServiceException</span><span class="token punctuation">(</span><span class="token string">"Authentication method not supported: "</span> <span class="token operator">+</span> request<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">//从request中获取用户名和密码</span>
            <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">obtainUsername</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> password <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">obtainPassword</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>username <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                username <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>password <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                password <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//生成未经认证的Token</span>
            username <span class="token operator">=</span> username<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">UsernamePasswordAuthenticationToken</span> authRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setDetails</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> authRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAuthenticationManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span>authRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里都非常好模仿，从这里便能得知了解源码的重要性了！</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Authentication</span> <span class="token function">attemptAuthentication</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> httpServletRequest<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> httpServletResponse<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AuthenticationException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        <span class="token comment">//判断必须是post请求</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>postOnly <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>httpServletRequest<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">AuthenticationServiceException</span><span class="token punctuation">(</span><span class="token string">"Authentication method not supported: "</span> <span class="token operator">+</span> httpServletRequest<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">//从request中获取手机号</span>
            <span class="token class-name">String</span> mobile <span class="token operator">=</span> <span class="token function">obtainMobile</span><span class="token punctuation">(</span>httpServletRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>mobile <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                mobile <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            mobile <span class="token operator">=</span> mobile<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     *
     * 从request 中获取 手机号码
     *
     * */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">obtainMobile</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> httpServletRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> httpServletRequest<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">"mobile"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来再来看看UsernamePasswordAuthenticationToken是怎么构建的？</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractAuthenticationToken</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">530L</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> principal<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Object</span> credentials<span class="token punctuation">;</span>
    
    <span class="token comment">//构建未认证的Token</span>
    <span class="token keyword">public</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span><span class="token class-name">Object</span> principal<span class="token punctuation">,</span> <span class="token class-name">Object</span> credentials<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token punctuation">)</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>principal <span class="token operator">=</span> principal<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>credentials <span class="token operator">=</span> credentials<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//构建已认证的Token</span>
    <span class="token keyword">public</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span><span class="token class-name">Object</span> principal<span class="token punctuation">,</span> <span class="token class-name">Object</span> credentials<span class="token punctuation">,</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> authorities<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>authorities<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>principal <span class="token operator">=</span> principal<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>credentials <span class="token operator">=</span> credentials<span class="token punctuation">;</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>credentials<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getPrincipal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>principal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> isAuthenticated<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IllegalArgumentException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isAuthenticated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"Cannot set this token to trusted - use constructor which takes a GrantedAuthority list instead"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eraseCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">eraseCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>credentials <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拿到了mobile以后，我们也需要创建一个未经认证的Token</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> principal<span class="token punctuation">;</span>

    <span class="token comment">//构建未认证的Token</span>
    <span class="token keyword">public</span> <span class="token class-name">SmsAuthenticationToken</span><span class="token punctuation">(</span><span class="token class-name">Object</span> principal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>principal <span class="token operator">=</span> principal<span class="token punctuation">;</span>
        <span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//构建已认证的token</span>
    <span class="token keyword">public</span> <span class="token class-name">SmsAuthenticationToken</span><span class="token punctuation">(</span><span class="token class-name">Object</span> principal<span class="token punctuation">,</span>
                                      <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">></span></span> authorities<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>authorities<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>principal <span class="token operator">=</span> principal<span class="token punctuation">;</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getPrincipal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> principal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> authenticated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>authenticated<span class="token punctuation">)</span><span class="token punctuation">{</span>
           <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span>
                   <span class="token string">"Cannot set this token to trusted - use constructor which takes a GrantedAuthority list instead"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
           <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eraseCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">eraseCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解下来就可以回到创建未经认证的token处了，我们也需要通过mobile来创建token</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>  <span class="token comment">//构建未经认证的token</span>
  <span class="token class-name">SmsAuthenticationToken</span> token <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SmsAuthenticationToken</span><span class="token punctuation">(</span>mobile<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>再回到UsernamePasswordAuthenticationToken ，看看token是如何setDetails()的</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">setDetails</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span> authRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        authRequest<span class="token punctuation">.</span><span class="token function">setDetails</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>authenticationDetailsSource<span class="token punctuation">.</span><span class="token function">buildDetails</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显，只需要把token 和request 交给AuthenticationDetails 存储就行了</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">setDetails</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">SmsAuthenticationToken</span> authRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        authRequest<span class="token punctuation">.</span><span class="token function">setDetails</span><span class="token punctuation">(</span>authenticationDetailsSource<span class="token punctuation">.</span><span class="token function">buildDetails</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到此为止，我们再看看这张图，就很清晰了，过程其实是非常相似的</p>
<figure><img src="@source/backend/image/image_EvEbIMofpe.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>好了，至此，这个Filter其实就差不多该完成了</p>
</div></template>


