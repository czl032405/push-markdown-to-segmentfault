
# express笔记

## 路由
路由的定义由如下结构组成：app.METHOD(PATH, HANDLER)。其中，app 是一个 express 实例；METHOD 是某个 HTTP 请求方式中的一个；PATH 是服务器端的路径；HANDLER 是当路由匹配到时需要执行的函数。
```javascript
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```

## 中间件
中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

### 应用级中间件

```javascript
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```
### 路由级中间件
```javascript
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

### 错误处理中间件
错误处理中间件有 4 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。
```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## 模板引擎
```javascript
app.set('views', './views')
app.set('view engine', 'jade')
//index.jade
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

### vue2 server side rendering
https://github.com/vuejs/vue-hackernews-2.0


## 错误处理
如果向 next() 传入参数（除了 ‘route’ 字符串），Express 会认为当前请求有错误的输出，因此跳过后续其他非错误处理和路由/中间件函数。

## 调试
在启动应用时，设置 DEBUG 环境变量为 express:*，可以查看 Express 中用到的所有内部日志。
设置 DEBUG 的值为 express:router，只查看路由部分的日志；设置 DEBUG 的值为 express:application，只查看应用部分的日志，依此类推。

## 进程守护
Process managers for Express apps

The most popular process managers for Express and other Node applications are:
- [StrongLoop Process Manager](http://www.expressjs.com.cn/advanced/pm.html#sl)
- [PM2](http://www.expressjs.com.cn/advanced/pm.html#pm2)
- [Forever](http://www.expressjs.com.cn/advanced/pm.html#forever)

## yeo生成器(MVC框架)
https://github.com/petecoop/generator-express
``` cli
npm install yo -g
npm install generator-express -g
yo express
```


## 常用中间件

[http://www.expressjs.com.cn/resources/middleware.html](http://www.expressjs.com.cn/resources/middleware.html)

### 静态文件托管 express.static中间件
```javascript
app.use(express.static('public'));
//可以多次调用 express.static 中间件：
app.use(express.static('files'));
```


### cookie-parser
Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
```javascript
var express      = require('express')
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())
app.get('/', function(req, res) {
  console.log('Cookies: ', req.cookies)
})
app.listen(8080)
```

> [参考资料]
 http://expressjs.com/
 http://www.expressjs.com.cn/
 https://github.com/expressjs/express
 https://github.com/expressjs/cookie-parser
 https://github.com/petecoop/generator-express


