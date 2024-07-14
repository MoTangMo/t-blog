import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "设计模式",
    icon: "check",
    children: [
      {
        text: "Java版",
        icon: "pen-to-square",
        prefix: "/design-patterns/",
        children: [
          {
            text: "单例模式",
            icon: "angle-right",
            link: "singleton"
          },
          {
            text: "工厂模式",
            icon: "angle-right",
            link: "factory"
          },
          {
            text: "建造者模式",
            icon: "angle-right",
            link: "builder"
          },
        ]
      }
    ],
  },
  {
    text: "重学后端",
    icon: "pen-to-square",
    children: [
      {
        text: "数据结构与算法",
        icon: "pen-to-square",
        prefix: "/backend/algorithm/",
        children:[
          {
            text: "堆",
            icon: "archway",
            link: "vial"
          },
          {
            text: "图",
            icon: "archway",
            link: "graph"
          },
        ]
      },
      {
        text: "SSM系列",
        icon: "pen-to-square",
        prefix: "/backend/spring/",
        children:[
          {
            text: "Spring Security",
            icon: "guitar",
            link: "SpringSecurity"
          },
          {
            text: "手写Mybatis",
            icon: "pen-to-square",
            link: "Record-Mybatis"
          }
        ]
      },
      {
        text: "代码小抄",
        icon: "pen-to-square",
        prefix: "/backend/records/",
        children:[
          {
            text: "Spring 工具类",
            icon: "guitar",
            link: "SpringUtils"
          },
        ]
      },
    ],
  },
  {
    text: "前端笔记",
    icon: "face-smile",
    prefix: "/frontend/",
    children: [
      {
        text: "重学Vue",
        icon: "font",
        link: "Record-Vue"
      },{
        text: "VS Code",
        icon: "music",
        link: "vscode-skill"
      }
    ],
  },
  {
    text: "读书笔记",
    icon: "book",
    prefix: "/reading/",
    children: [
      {
        text: "深入剖析Mybatis",
        icon: "pen",
        link: "mybatis"
      }
    ],
  }
]);
