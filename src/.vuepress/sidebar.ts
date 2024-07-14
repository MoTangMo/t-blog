import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
      {
      text: "设计模式",
      icon: "laptop-code",
      prefix: "design-patterns/",
      link: "design-patterns/",
      children: "structure",
    },
    {
      text: "后端笔记",
      icon: "laptop-code",
      prefix: "backend/",
      link: "backend/",
      children: "structure",
    },
    {
      text: "前端笔记",
      icon: "laptop-code",
      prefix: "frontend/",
      link: "frontend/",
      children: "structure",
    }
  ],
});
