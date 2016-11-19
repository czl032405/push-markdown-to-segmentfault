# push-markdown-to-segmentfault
push-markdown-to-segmentfault


## api验证原理
- cookie需要带上gr_user_id：任意guid值
- 需要以下header：X-Requested-With,Host,Origin,Referer,Content-Type:application/x-www-form-urlencoded
- querystring需要?_=值正确，和phpsessid相关, 值等于window.SF.token, 在login的html里面
- 网站上login.js 和 login.min.js内容是不一样的
- 1分钟内只能新增一个markdown

## 使用方法
- 将本地md文件放置在同目录内
- 修改username和pw
- 执行action方法