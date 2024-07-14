export const themeData = JSON.parse("{\"encrypt\":{},\"author\":{\"name\":\"Mr.T\",\"url\":\"www.tcoding.fun\"},\"logo\":\"https://tg-blog.oss-cn-guangzhou.aliyuncs.com/home/avatar.svg\",\"repo\":\"vuepress-theme-hope/vuepress-theme-hope\",\"docsDir\":\"src\",\"footer\":\"默认页脚\",\"displayFooter\":true,\"blog\":{\"description\":\"后端掌舵，前端航行，志在暴富！\",\"intro\":\"/intro.html\"},\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"navbarLocales\":{\"langName\":\"简体中文\",\"selectLangAriaLabel\":\"选择语言\"},\"metaLocales\":{\"author\":\"作者\",\"date\":\"写作日期\",\"origin\":\"原创\",\"views\":\"访问量\",\"category\":\"分类\",\"tag\":\"标签\",\"readingTime\":\"阅读时间\",\"words\":\"字数\",\"toc\":\"此页内容\",\"prev\":\"上一页\",\"next\":\"下一页\",\"lastUpdated\":\"上次编辑于\",\"contributors\":\"贡献者\",\"editLink\":\"在 GitHub 上编辑此页\",\"print\":\"打印\"},\"blogLocales\":{\"article\":\"文章\",\"articleList\":\"文章列表\",\"category\":\"分类\",\"tag\":\"标签\",\"timeline\":\"时间轴\",\"timelineTitle\":\"昨日不在\",\"all\":\"全部\",\"intro\":\"个人介绍\",\"star\":\"星标\",\"empty\":\"$text 为空\"},\"paginationLocales\":{\"prev\":\"上一页\",\"next\":\"下一页\",\"navigate\":\"跳转到\",\"action\":\"前往\",\"errorText\":\"请输入 1 到 $page 之前的页码！\"},\"outlookLocales\":{\"themeColor\":\"主题色\",\"darkmode\":\"外观\",\"fullscreen\":\"全屏\"},\"routeLocales\":{\"skipToContent\":\"跳至主要內容\",\"notFoundTitle\":\"页面不存在\",\"notFoundMsg\":[\"这里什么也没有\",\"我们是怎么来到这儿的？\",\"这 是 四 零 四 !\",\"看起来你访问了一个失效的链接\"],\"back\":\"返回上一页\",\"home\":\"带我回家\",\"openInNewWindow\":\"Open in new window\"},\"navbar\":[\"/\",{\"text\":\"设计模式\",\"icon\":\"check\",\"children\":[{\"text\":\"Java版\",\"icon\":\"pen-to-square\",\"prefix\":\"/design-patterns/\",\"children\":[{\"text\":\"单例模式\",\"icon\":\"angle-right\",\"link\":\"singleton\"},{\"text\":\"工厂模式\",\"icon\":\"angle-right\",\"link\":\"factory\"},{\"text\":\"建造者模式\",\"icon\":\"angle-right\",\"link\":\"builder\"}]}]},{\"text\":\"重学后端\",\"icon\":\"pen-to-square\",\"children\":[{\"text\":\"数据结构与算法\",\"icon\":\"pen-to-square\",\"prefix\":\"/backend/algorithm/\",\"children\":[{\"text\":\"堆\",\"icon\":\"archway\",\"link\":\"vial\"},{\"text\":\"图\",\"icon\":\"archway\",\"link\":\"graph\"}]},{\"text\":\"SSM系列\",\"icon\":\"pen-to-square\",\"prefix\":\"/backend/spring/\",\"children\":[{\"text\":\"Spring Security\",\"icon\":\"guitar\",\"link\":\"SpringSecurity\"},{\"text\":\"手写Mybatis\",\"icon\":\"pen-to-square\",\"link\":\"Record-Mybatis\"}]},{\"text\":\"代码小抄\",\"icon\":\"pen-to-square\",\"prefix\":\"/backend/records/\",\"children\":[{\"text\":\"Spring 工具类\",\"icon\":\"guitar\",\"link\":\"SpringUtils\"}]}]},{\"text\":\"前端笔记\",\"icon\":\"face-smile\",\"prefix\":\"/frontend/\",\"children\":[{\"text\":\"重学Vue\",\"icon\":\"font\",\"link\":\"Record-Vue\"},{\"text\":\"VS Code\",\"icon\":\"music\",\"link\":\"vscode-skill\"}]},{\"text\":\"读书笔记\",\"icon\":\"book\",\"prefix\":\"/reading/\",\"children\":[{\"text\":\"深入剖析Mybatis\",\"icon\":\"pen\",\"link\":\"mybatis\"}]}],\"sidebar\":{\"/\":[{\"text\":\"设计模式\",\"icon\":\"laptop-code\",\"prefix\":\"design-patterns/\",\"link\":\"design-patterns/\",\"children\":\"structure\"},{\"text\":\"后端笔记\",\"icon\":\"laptop-code\",\"prefix\":\"backend/\",\"link\":\"backend/\",\"children\":\"structure\"},{\"text\":\"前端笔记\",\"icon\":\"laptop-code\",\"prefix\":\"frontend/\",\"link\":\"frontend/\",\"children\":\"structure\"}]}}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}