      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[4,5,11,12,6,7,13,14,0,1,2,10,3,15,8,9]}},"star":{"/":{"path":"/star/","indexes":[4,5,11,12,6,7,13,14]}},"timeline":{"/":{"path":"/timeline/","indexes":[4,5,11,12,6,7,0,1,2,10,13]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      