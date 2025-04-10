import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "设计模式",
    icon: "check",
    link: "/design-patterns/"
    
  },
  {
    text: "后端主航",
    icon: "pen-to-square",
    link: "/backend/ssm/"
    
  },
  {
    text: "前端掌舵",
    icon: "face-smile",
    link: "/frontend/",
  },
  {
    text: "读书笔记",
    icon: "book",
    link: "/reading/",
  },
  {
    text: "周记",
    icon: "pen-to-square",
    link: "/weekly-diary/",
  },
  {
    text: "AI系列",
    icon: "pen-to-square",
    link: "/ai/",
  }
]);
