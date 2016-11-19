# vue 2

## vue-cli
[https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)

Vue.js provides an official CLI for quickly scaffolding ambitious Single Page Applications.

```
$ vue init <template-name> <project-name>
```


## vue.js 2


## vue-router 2


## vue-loader
打包的时候把template-compiler的活干了,理论上让runtime-only的速度比standalone的速度更快
vue-loader内的loaders配置只管vue文件内的template script style

## 坑s
- runtime-only  vs standalone
node安装的是runtime-only  
cdn或其他途径获取直接在浏览器中使用的是standalone  
standalone具有很多runtime-only没有的功能，比如[vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler)
