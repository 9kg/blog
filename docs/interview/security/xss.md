# XSS

## 什么是XSS
Cross-Site Scripting， 跨站脚本攻击, 侵入者将恶意脚本植入页面窃取用户信息等

## 为什么不是CSS
之所以叫XSS是区别于层叠样式表(Cascade Style Sheet)

## 类型

### 反射型
url参数注入脚本代码或链接，引导用户点击

### 存储性
通过类似于留言板或者评论这样的输入框写入，存储到目标网站的数据库中，在其它用户访问该页面时，这个恶意的脚本就会执行

## 防范手段

### 服务端设置HEAD
```js
//  现在主流浏览器都支持，并且默认都开启了XSS保护，设置为0可以关闭
res.set('X-XSS-Protection', 1)
```

### CSP
内容安全策略Content Security Policy，是一个附加的安全层
```yaml
# 只允许加载本站资源
​Content-Security-Policy: default-src 'self'
# 只允许加载 HTTPS 协议图片
​Content-Security-Policy: img-src https://*
# 不允许加载任何来源框架
​Content-Security-Policy: child-src 'none'
```

### HTTP-only Cookie
```js
// 即使被XSS攻击，但是可以保障最重要的用户信息不被窃取
​response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly")
```

### 对输出进行html编码