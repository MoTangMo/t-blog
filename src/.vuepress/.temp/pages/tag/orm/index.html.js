import comp from "E:/mynote/t-blog/src/.vuepress/.temp/pages/tag/orm/index.html.vue"
const data = JSON.parse("{\"path\":\"/tag/orm/\",\"title\":\"标签: ORM\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"标签: ORM\",\"dir\":{\"index\":false},\"index\":false,\"feed\":false,\"sitemap\":false,\"blog\":{\"type\":\"category\",\"name\":\"ORM\",\"key\":\"tag\"},\"layout\":\"BlogCategory\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://github.com/MoTangMo/t-blog/tag/orm/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"T-Blog\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"标签: ORM\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mr.T\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"标签: ORM\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
