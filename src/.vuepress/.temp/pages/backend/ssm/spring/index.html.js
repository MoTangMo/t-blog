import comp from "E:/mynote/t-blog/src/.vuepress/.temp/pages/backend/ssm/spring/index.html.vue"
const data = JSON.parse("{\"path\":\"/backend/ssm/spring/\",\"title\":\"Spring 源码系列\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Spring 源码系列\",\"index\":false,\"icon\":\"code\",\"category\":[\"Spring\",\"Java\",\"源码\"],\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://github.com/MoTangMo/t-blog/backend/ssm/spring/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"T-Blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Spring 源码系列\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mr.T\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Spring 源码系列\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mr.T\\\",\\\"url\\\":\\\"www.tcoding.fun\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.06,\"words\":17},\"filePathRelative\":\"backend/ssm/spring/README.md\",\"excerpt\":\"\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
