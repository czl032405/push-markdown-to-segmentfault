# egret 笔记

20161026

## 目录结构
- src 目录，存放我们的代码。我们编写的代码都放在src目录下面。
- bin-debug 目录，项目编译和运行的debug目录，一般我们不要修改该目录下的内容。
- libs 目录，这里面存放我们的库文件，包括 Egret 核心库和其他扩展库。当然以后添加了第三方库的话也会放在这里。
- resource 目录，这里放置我们的资源文件，这里面有一个default.res.json 配置文件，用来配置资源。
- template 目录，这里是项目调试过程中所需的目录，一般我们不需要修改该目录下的内容。
- egretProperties.json 项目的配置文件，一般我们会用到里面的modules 字段来配置项目的模块。
- index.html 项目访问的入口文件，我们可以在这里面配置项目的旋转缩放模式背景颜色等。
- favicon.ico 一个ico。


## stage
Stage 类代表主绘图区。可以利用 DisplayObject 实例的 stage 属性进行访问。
stage.stageWidth 绘图区宽度


