      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[4,5,15,6,7,16,17,18,0,1,2,10,3,19,8,9,12,13,14,11]}},"star":{"/":{"path":"/star/","indexes":[4,5,15,6,7,16,17,18]}},"timeline":{"/":{"path":"/timeline/","indexes":[4,5,15,6,7,0,1,2,10,16,17]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      