export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/index.html.js"), meta: {"t":"T-Blog","i":"home"} }],
  ["/intro.html", { loader: () => import(/* webpackChunkName: "intro.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/intro.html.js"), meta: {"u":true,"v":"/assets/images/cover5.jpg","t":"介绍页","i":"circle-info","O":9,"y":"a"} }],
  ["/design-patterns/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/design-patterns/index.html.js"), meta: {"c":["设计模式"],"t":"设计模式","i":"code","y":"a"} }],
  ["/design-patterns/builder.html", { loader: () => import(/* webpackChunkName: "builder.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/design-patterns/builder.html.js"), meta: {"a":"Mr.T","d":1715472000000,"l":"2024年5月12日","c":["设计模式"],"g":["Java"],"v":"/assets/images/cover7.jpg","t":"建造者模式","i":"code","y":"a"} }],
  ["/design-patterns/factory.html", { loader: () => import(/* webpackChunkName: "factory.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/design-patterns/factory.html.js"), meta: {"a":"Mr.T","d":1714694400000,"l":"2024年5月3日","c":["设计模式"],"g":["Java"],"v":"/assets/images/cover6.jpg","t":"工厂模式","i":"code","y":"a"} }],
  ["/design-patterns/singleton.html", { loader: () => import(/* webpackChunkName: "singleton.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/design-patterns/singleton.html.js"), meta: {"a":"Mr.T","d":1714694400000,"l":"2024年5月3日","c":["设计模式"],"g":["Java"],"v":"/assets/images/cover4.jpg","t":"单例模式","i":"code","y":"a"} }],
  ["/frontend/Record-Vue.html", { loader: () => import(/* webpackChunkName: "Record-Vue.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/frontend/Record-Vue.html.js"), meta: {"d":1721520000000,"l":"2024年7月21日","c":["Vue"],"g":["源码","前端","JavaScript"],"u":true,"v":"/assets/images/cover5.jpg","t":"重学Vue3","i":"code","y":"a"} }],
  ["/frontend/vscode-skill.html", { loader: () => import(/* webpackChunkName: "vscode-skill.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/frontend/vscode-skill.html.js"), meta: {"d":1721520000000,"l":"2024年7月21日","c":["tool"],"g":["效率","前端"],"u":true,"v":"/assets/images/cover3.jpg","t":"前端开发小技巧","i":"code","y":"a"} }],
  ["/reading/mybatis.html", { loader: () => import(/* webpackChunkName: "mybatis.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/reading/mybatis.html.js"), meta: {"t":"深入解读Mybatis","y":"a"} }],
  ["/backend/algorithm/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/algorithm/index.html.js"), meta: {"c":["算法"],"t":"数据结构与算法","i":"code","y":"a"} }],
  ["/backend/algorithm/graph.html", { loader: () => import(/* webpackChunkName: "graph.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/algorithm/graph.html.js"), meta: {"d":1718150400000,"l":"2024年6月12日","c":["algorithm"],"g":["算法","数据结构","Java"],"u":true,"v":"/assets/images/cover3.jpg","t":"图","i":"pen-to-square","y":"a"} }],
  ["/backend/algorithm/pileUp.html", { loader: () => import(/* webpackChunkName: "pileUp.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/algorithm/pileUp.html.js"), meta: {"d":1718150400000,"l":"2024年6月12日","c":["algorithm"],"g":["算法","数据结构","Java"],"u":true,"v":"/assets/images/cover5.jpg","t":"堆","i":"pen-to-square","y":"a"} }],
  ["/backend/records/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/records/index.html.js"), meta: {"c":["代码记录"],"t":"代码小抄","i":"code","y":"a"} }],
  ["/backend/records/SpringUtils.html", { loader: () => import(/* webpackChunkName: "SpringUtils.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/records/SpringUtils.html.js"), meta: {"a":"Mr.T","d":1714521600000,"l":"2024年5月1日","c":["Spring"],"g":["Spring 系列","records"],"v":"/assets/images/cover1.jpg","t":"Spring常用工具类","i":"code","O":3,"y":"a"} }],
  ["/backend/spring/Record-Mybatis.html", { loader: () => import(/* webpackChunkName: "Record-Mybatis.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/spring/Record-Mybatis.html.js"), meta: {"d":1721520000000,"l":"2024年7月21日","c":["SSM"],"g":["源码","SSM 系列","Java"],"u":true,"v":"/assets/images/cover2.jpg","t":"手写Mybatis","i":"pen-to-square","y":"a"} }],
  ["/backend/spring/Record-Spring.html", { loader: () => import(/* webpackChunkName: "Record-Spring.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/spring/Record-Spring.html.js"), meta: {"d":1721520000000,"l":"2024年7月21日","c":["SSM"],"g":["源码","Spring 系列","Java"],"u":true,"v":"/assets/images/cover2.jpg","t":"深入剖析Spring","i":"pen-to-square","y":"a"} }],
  ["/backend/spring/SpringSecurity.html", { loader: () => import(/* webpackChunkName: "SpringSecurity.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/spring/SpringSecurity.html.js"), meta: {"d":1714521600000,"l":"2024年5月1日","c":["SSM"],"g":["安全框架","Spring 系列","Java"],"u":true,"v":"/assets/images/cover2.jpg","t":"Spring Security","i":"pen-to-square","y":"a"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/404.html.js"), meta: {"t":""} }],
  ["/frontend/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/frontend/index.html.js"), meta: {"t":"Frontend"} }],
  ["/reading/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/reading/index.html.js"), meta: {"t":"Reading"} }],
  ["/backend/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/index.html.js"), meta: {"t":"Backend"} }],
  ["/backend/spring/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/backend/spring/index.html.js"), meta: {"t":"Spring"} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/category/index.html.js"), meta: {"t":"分类","I":false} }],
  ["/category/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/category/设计模式/index.html.js"), meta: {"t":"设计模式 分类","I":false} }],
  ["/category/%E7%AE%97%E6%B3%95/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/category/算法/index.html.js"), meta: {"t":"算法 分类","I":false} }],
  ["/category/algorithm/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/category/algorithm/index.html.js"), meta: {"t":"algorithm 分类","I":false} }],
  ["/category/%E4%BB%A3%E7%A0%81%E8%AE%B0%E5%BD%95/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/category/代码记录/index.html.js"), meta: {"t":"代码记录 分类","I":false} }],
  ["/category/spring/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/category/spring/index.html.js"), meta: {"t":"Spring 分类","I":false} }],
  ["/category/ssm/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/category/ssm/index.html.js"), meta: {"t":"SSM 分类","I":false} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/tag/index.html.js"), meta: {"t":"标签","I":false} }],
  ["/tag/java/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/tag/java/index.html.js"), meta: {"t":"标签: Java","I":false} }],
  ["/tag/%E7%AE%97%E6%B3%95/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/tag/算法/index.html.js"), meta: {"t":"标签: 算法","I":false} }],
  ["/tag/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/tag/数据结构/index.html.js"), meta: {"t":"标签: 数据结构","I":false} }],
  ["/tag/spring-%E7%B3%BB%E5%88%97/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/tag/spring-系列/index.html.js"), meta: {"t":"标签: Spring 系列","I":false} }],
  ["/tag/records/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/tag/records/index.html.js"), meta: {"t":"标签: records","I":false} }],
  ["/tag/%E6%BA%90%E7%A0%81/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/tag/源码/index.html.js"), meta: {"t":"标签: 源码","I":false} }],
  ["/tag/ssm-%E7%B3%BB%E5%88%97/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/tag/ssm-系列/index.html.js"), meta: {"t":"标签: SSM 系列","I":false} }],
  ["/tag/%E5%AE%89%E5%85%A8%E6%A1%86%E6%9E%B6/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/tag/安全框架/index.html.js"), meta: {"t":"标签: 安全框架","I":false} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/article/index.html.js"), meta: {"t":"文章","I":false} }],
  ["/star/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/star/index.html.js"), meta: {"t":"星标","I":false} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/a0000/Documents/project/t-blog/src/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"t":"时间轴","I":false} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
