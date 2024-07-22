---
title: 前端开发小技巧 
icon: code
cover: /assets/images/cover3.jpg
date: 2024-07-21
star: true
sticky: true
category:
  - tool
tag:
  - 效率
  - 前端
---
# 前端开发小技巧

## 目录

- [VSCode ](#VSCode-)
- [自定义注释](#自定义注释)
  - [新建配置文件](#新建配置文件)
  - [编辑配置文件](#编辑配置文件)
  - [自定义注释模板](#自定义注释模板)
    - [Vue3](#Vue3)
    - [TSX](#TSX)
- [插件推荐](#插件推荐)
  - [Prettier - Code formatter](#Prettier---Code-formatter)
  - [Prettier - ESLint 配置解决代码格式问题](#Prettier---ESLint-配置解决代码格式问题)

## VSCode&#x20;

## 自定义注释

#### 新建配置文件

在VsCode编辑界面中通过快捷键`ctrl + shift + p` 打开设置窗口，并输入snippets，选择第一个选项(Snippets:Configure User Snippets)。

#### 编辑配置文件

进入javascript.json文件 替换以下代码

```json
{
  "Print to jsNoteTitle": {
    "prefix": "jsNoteTitle",
    "body": [
      "/*",
      " *@description:",
      " *@author: albert",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      " *@version: V1.0.5",
      "*/"
    ],
    "description": ""
  },
  "Print to jsfn": {
    "prefix": "jsfn",
    "body": [
      "/*",
      " *@functionName: ${TM_CURRENT_LINE}",
      " *@params1: ${1:参数1}",
      " *@params2: ${2:参数2}",
      " *@params3: ${3:参数3}",
      " *@params4: ${4:参数4}",
      " *@description:",
      " *@author: albert",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      " *@version: V1.0.5",
      "*/"
    ],
    "description": ""
  },
  "Print to jsModify": {
    "prefix": "jsModify",
    "body": [
      "/*",
      " *@description:",
      " *@modifyContent:",
      " *@author: albert",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      "*/"
    ],
    "description": ""
  },
  "Print to jsVariable": {
    "prefix": "jsVariable",
    "body": [
      "/*",
      " *@description:",
      " *@author: albert",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      " *@variable1: ${1:变量1}",
      " *@variable2: ${2:变量2}",
      " *@variable3: ${3:变量3}",
      " *@variable4: ${4:变量4}",
      " *@variable5: ${5:变量5}",
      "*/"
    ],
    "description": ""
  }
}


```

以上四种注释，分别是函数，class标题，变量，修改四种注释

### 自定义注释模板

#### Vue3

```json
{

  // Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
  // same ids are connected.
  // Example:
  "Print Vue Template For Vue3": {
    "prefix": "vue3",
    "body": [
      "<template> </template>",
      "<script setup></script>",
      "<style >  </style>"
    ],
    "description": "Print Vue Template For Vue3"
  }
}
```

#### TSX

```json
{
  //输出一个React 组件
  "Print a React Component": {
    "prefix": "prc",
    "body": [
      "/*",
      " *@description:${1:注释}",
      " *@author: tangzhaofeng",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      " *@version: V1",
      "*/",
      "const ${21:组件名}:React.FC<${3:接口名}> = (props) => {",
        "return <></>",
      "}"
    ],
    "description": "Print a React Component"
  },
  //定义一个接口
  "Print a interface": {
    "prefix": "pi",
    "body": [
      "/*",
      " *@description:${1:注释}",
      " *@author: tangzhaofeng",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      " *@version: V1",
      "*/",
      "interface ${2:接口名} {",
        "fieldName ?: string",
      "}"
    ],
    "description": "Print a interface"
  },
  "Print to jsFunction": {
    "prefix": "pfun",
    "body": [
      "/*",
      " *@description:${1:方法注释}",
      " *@author: tangzhaofeng",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      " *@version: V1",
      "*/",
      "const ${2:方法名} = () => {}"
    ],
    "description": "输出一个方法模板"
    },

  
}
```

## 插件推荐

所有插件的使用 以VS Code 为例

工欲善其事必先利其器，开发前端是一个非常有趣的过程，毕竟可以让我们能够真真切切地以可视化的形式看到自己的创作，当一个页面在自己的手上趋向完美时，往往就会油然而生一股自豪感和荣誉感。但是想要让自己的开发更加顺利，拥有一个更加爽快的开发体验，懂得使用辅助工具是十分重要的。

那么接下来笔者就会随着自己的开发而慢慢记录自己使用过的比较好用的插件在此文章

### Prettier - Code formatter

首先当然是我们的代码格式化工具，代码格式化相信一直是一个让人头疼的问题，一片混乱的代码，即便是一座金山，也很难让人有心情攀登，所以一款能够自动在我们写完代码以后进行格式化，美化我们的代码的工具就显得尤为重要了，这显然也是我们做好编程的第一步。

那么笔者要推荐的这一款工具就是Prettier 插件了

只需要在插件库中搜索 Prettier 即可


安装完毕以后，我们可以在我们的项目目录下创建

.prettierrc文件

写以下配置

```bash
{
    // 代码结尾不加分号
    "semi": false , 
    // 优先引号
    "singleQuote": true,
    // 不添加尾随逗号
    "trailingComma": "none"
}
```

### Prettier - ESLint 配置解决代码格式问题

ESLint ：帮助我们检测代码，已达到代码规范

Prettier ： 帮助我们根据规范整理代码

我们需要配置Prettier根据符合ESLint规定的规范来整理代码

.prettierrc文件

```json
{
    // 代码结尾不加分号
    "semi": false , 
    // 优先引号
    "singleQuote": true,
    // 不添加尾随逗号
    "trailingComma": "none"
}
```

在VSCode 中 ，勾选当我们保存文件时自动帮我们格式化文件


ESLint  与 Prettier 其实是有地方的设定是冲突的，比如说，ESLint 需要函数定义的时候函数名和()中间需要间隔一个空格，Prettier 格式化却不会这么做

这时我们就需要取消ESLint 的 函数名和()中间需要间隔一个空格 规则判断，具体操作应是到 .eslintrc.js中的rules中添加一个无视该规则

```json
'space-before-function-paren': 'off'
```
