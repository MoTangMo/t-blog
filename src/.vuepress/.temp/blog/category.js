export const categoriesMap = {"category":{"/":{"path":"/category/","map":{"设计模式":{"path":"/category/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/","indexes":[0,1,2,3]},"Vue":{"path":"/category/vue/","indexes":[4]},"tool":{"path":"/category/tool/","indexes":[5]},"algorithm":{"path":"/category/algorithm/","indexes":[6,7]},"算法":{"path":"/category/%E7%AE%97%E6%B3%95/","indexes":[8]},"代码记录":{"path":"/category/%E4%BB%A3%E7%A0%81%E8%AE%B0%E5%BD%95/","indexes":[9]},"Spring":{"path":"/category/spring/","indexes":[10]},"SSM":{"path":"/category/ssm/","indexes":[11,12,13]}}}},"tag":{"/":{"path":"/tag/","map":{"Java":{"path":"/tag/java/","indexes":[11,12,6,7,13,0,1,2]},"源码":{"path":"/tag/%E6%BA%90%E7%A0%81/","indexes":[4,11,12]},"前端":{"path":"/tag/%E5%89%8D%E7%AB%AF/","indexes":[4,5]},"JavaScript":{"path":"/tag/javascript/","indexes":[4]},"效率":{"path":"/tag/%E6%95%88%E7%8E%87/","indexes":[5]},"算法":{"path":"/tag/%E7%AE%97%E6%B3%95/","indexes":[6,7]},"数据结构":{"path":"/tag/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/","indexes":[6,7]},"Spring 系列":{"path":"/tag/spring-%E7%B3%BB%E5%88%97/","indexes":[12,13,10]},"records":{"path":"/tag/records/","indexes":[10]},"SSM 系列":{"path":"/tag/ssm-%E7%B3%BB%E5%88%97/","indexes":[11]},"安全框架":{"path":"/tag/%E5%AE%89%E5%85%A8%E6%A1%86%E6%9E%B6/","indexes":[13]}}}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

