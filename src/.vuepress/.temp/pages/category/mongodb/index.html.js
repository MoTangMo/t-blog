import comp from "E:/mynote/t-blog/src/.vuepress/.temp/pages/category/mongodb/index.html.vue"
const data = JSON.parse("{\"path\":\"/category/mongodb/\",\"title\":\"MongoDB 分类\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MongoDB 分类\",\"dir\":{\"index\":false},\"index\":false,\"feed\":false,\"sitemap\":false,\"blog\":{\"type\":\"category\",\"name\":\"MongoDB\",\"key\":\"category\"},\"layout\":\"BlogCategory\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://github.com/MoTangMo/t-blog/category/mongodb/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"T-Blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"MongoDB 分类\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mr.T\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"MongoDB 分类\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
