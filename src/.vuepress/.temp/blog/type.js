      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[9,10,5,6,11,12,0,1,2,8,3,13,14,15,4,7]}},"star":{"/":{"path":"/star/","indexes":[9,10,5,6,11,12]}},"timeline":{"/":{"path":"/timeline/","indexes":[9,10,5,6,0,1,2,8,11]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      