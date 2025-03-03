      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[6,7,21,4,5,11,12,8,9,23,10,22,0,1,2,16,3,24,25,13,14,15,19,20,17,18]}},"star":{"/":{"path":"/star/","indexes":[6,7,21,4,5,11,12,8,9,23,10]}},"timeline":{"/":{"path":"/timeline/","indexes":[6,7,21,22,4,5,11,12,0,1,2,16,8,9]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      