---
title: VS CODE 模板
cover: /assets/images/cover1.jpg
icon: code
order: 3
author: Mr.T
# 设置写作时间
date: 2024-05-01
category:
  - VS CODE
tag:
  - VS CODE
  - 前端
footer: 要有一双发现美的眼睛
copyright: 无版权
---
# VS CODE 模板

ctrl + shitf + p 打开Configure user snippets 配置js 或 ts文件 模板

```json
{
  "Print to React Commpent": {
    "prefix": "prc",
    "body": [
      "const ${1:组件名} = (${2:Props}) => {",
      " return (<>",
      "</>);"
    ],
    "description": "输出一个基本的React函数式组件"
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
  "Print to jsNoteTitle": {
    "prefix": "jszs",
    "body": [
      "/*",
      " *@description:",
      " *@author: tangzhaofeng",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      " *@version: V1",
      "*/"
    ],
    "description": ""
  },
  "Print to jsfn": {
    "prefix": "jszsfn",
    "body": [
      "/*",
      " *@functionName: ${TM_CURRENT_LINE}",
      " *@params1: ${1:参数1}",
      " *@params2: ${2:参数2}",
      " *@params3: ${3:参数3}",
      " *@params4: ${4:参数4}",
      " *@description:",
      " *@author: tangzhaofeng",
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
      " *@author: tangzhaofeng",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      "*/"
    ],
    "description": ""
  },
  "Print to jsVariable": {
    "prefix": "jszsv",
    "body": [
      "/*",
      " *@description:",
      " *@author: tangzhaofeng",
      " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
      " *@variable1: ${1:变量1}",
      " *@variable2: ${2:变量2}",
      " *@variable3: ${3:变量3}",
      " *@variable4: ${4:变量4}",
      " *@variable5: ${5:变量5}",
      "*/"
    ],
    "description": ""
  },
}
```


### TSX模板

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
  }

  // Place your snippets for typescriptreact here. Each snippet is defined under a snippet name and has a prefix, body and 
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
  // same ids are connected.
  // Example:
  // "Print to console": {
  //   "prefix": "log",
  //   "body": [
  //     "console.log('$1');",
  //     "$2"
  //   ],
  //   "description": "Log output to console"
  // }
}
```
