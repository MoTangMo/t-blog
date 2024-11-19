      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[16,4,5,18,6,7,19,20,21,17,0,1,2,11,3,22,23,8,9,10,13,14,15,12]}},"star":{"/":{"path":"/star/","indexes":[16,4,5,18,6,7,19,20,21]}},"timeline":{"/":{"path":"/timeline/","indexes":[16,17,4,5,18,6,7,0,1,2,11,19,20]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      