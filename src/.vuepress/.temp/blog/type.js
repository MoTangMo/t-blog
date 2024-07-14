      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[7,8,9,10,0,1,2,5,3,11,12,13,4,6,14]}},"star":{"/":{"path":"/star/","indexes":[7,8,9,10]}},"timeline":{"/":{"path":"/timeline/","indexes":[7,8,0,1,2,5,9]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      