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
      text: "后端主航",
      icon: "laptop-code",
      prefix: "backend/",
      link: "backend/",
      children: "structure",
    },
    {
      text: "前端掌舵",
      icon: "laptop-code",
      prefix: "frontend/",
      link: "frontend/",
      children: "structure",
    },
    {
      text: "读书笔记",
      icon: "laptop-code",
      prefix: "reading/",
      link: "reading/",
      children: "structure",
    },
    {
      text: "周记",
      icon: "laptop-code",
      prefix: "weekly-diary/",
      link: "weekly-diary/",
      children: "structure",
    }
  ],
});
