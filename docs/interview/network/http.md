# HTTP
> 超文本传输协议（Hyper Text Transfer Protocol，HTTP）是一个简单的请求-响应协议，它通常运行在TCP之上。
## 网络协议分层--经典五层模型
1. 物理层：定义物理设备之间如何传输数据
2. 数据链路层：在通信的实体间建立数据链路链接
3. 网络层：为数据在节点之间的传输创建逻辑链路，并分组转发数据
4. 传输层：向用户提供可靠的端到端的服务，传输层通过封装向高层屏蔽了下层数据通信的细节
5. 应用层：为应用软件提供了很多服务，构建于tcp协议之上，屏蔽了网络传输相关的细节

## HTTP报文结构
对于TCP而言，在传输时分为两个部分: TCP头和数据部分  
而HTTP类似，也是`header`+`body`的结构，除此之外，请求报文和响应报文有一定差异。

### 请求报文
![请求报文](@assets/interview/network/request-format.png)

### 响应报文
![响应报文](@assets/interview/network/response-format.png)

### 结构描述
#### 头部字段名格式要求
- 不区分大小写
- 不允许出现空格
- 不可以出现下划线`_`
- 后面必须紧跟着`:`
#### 空行
区分头部和实体
#### 实体
body部分，请求报文对应请求体，响应报文对应响应体。

## 请求方法
:::tip
方法名都是大写
:::
- `HEAD`: 获取数据元信息
- `GET`: 获取数据
- `POST`: 提交数据
- `PUT`: 修改数据
- `DELETE`: 删除数据
- `CONNECT`: 建立连接隧道，用于代理服务器
- `OPTIONS`: 列出可用的请求方法，用于跨域请求
- `TRACE`: 追踪请求-响应的传输路径

### GET和POST的区别
#### 本质上的区别: 
- **语义**
- **幂等性**: `GET` 幂等，而 `POST` 不是
#### 基于浏览器来看的区别:
- **缓存**: 浏览器会主动缓存 `GET` 请求
- **参数**: 浏览器中的GET无请求体，因而参数只能存在于URL中
  - 受制于URL，参数长度有限
  - 受制于URL，只能接收ASCII字符，否则需要经过URI编码
- **发包次数**: 从**TCP**的角度，GET请求一般会将请求报文一次性发送出去，而POST会分为2个TCP数据包，先发header部分，如果服务器响应100（continue），然后发body部分。（火狐除外，它的POST只发一个TCP包）

## URI
> 统一资源标识符（Uniform Resource Identifier），用于区分互联网上不同的资源。

![URI结构](@assets/interview/network/uri-format.png)
- `scheme://`: 表示协议名，比如http，https，ftp，file等等。后面必须和`://`连在一起。
- `user:passwd@`: 表示登录主机时的用户信息，亦有这样的用法-`access_token@`。
- `host:port`: 表示主机名和端口。
- `path`: 表示请求路径，标记资源所在位置。
- `?query`: 表示查询参数，为key=value这种形式，多个键值对之间用`&`隔开。
- `#fragment`: 表示`URI`所定位的资源内的一个锚点，浏览器可以根据这个锚点跳转到对应的位置。

### 编码
**URI**只能使用`ASCII`, ASCII之外的字符是不支持显示的，且部分符号是界定符，如果不处理就会导致解析出错。  
因此，URI引入了编码机制，将所有界定符和非ASCII码字符转为十六进制字节值，然后在前面加个`%`。  
> 比如，`%`被转义成`%25`，`[`被转义成`%5B`，`{`被转义成`%7B`，`好好学习`被转义成`%E5%A5%BD%E5%A5%BD%E5%AD%A6%E4%B9%A0`

## HTTP状态码
| 起始位 | 含义 |
| ----- | --- |
| 1xx | 表示目前是协议处理的中间态，还需要后续操作 |
| 2xx | 表示成功状态 |
| 3xx | 重定向，资源位置发生变化 |
| 4xx | 请求有误 |
| 5xx | 服务端发生错误 |

### 常用状态码
| 状态码 | 状态文本 | 描述 |
| ----- | --- | --- |
| 100 | Continue | 服务器仅接收到部分请求，但是一旦服务器并没有拒绝该请求，客户端应该继续发送其余的请求。 |
| 101 | Switching Protocols | 服务器转换协议：服务器将遵从客户的请求转换到另外一种协议。比如在HTTP升级为WebSocket的时候，如果服务器同意变更，就会发送状态码`101`。 |
| 200 | OK | 请求成功（其后是对GET和POST请求的应答文档。） |
| 204 | No Content | 没有新文档。含义与 200 相同，但响应头后没有`body`数据。 |
| 206 | Partial Content | 客户发送了一个带有Range头的GET请求，服务器完成了它。 |
| 301 | Moved Permanently | 永久重定向至新的url |
| 302 | Found | 临时重定向至新的url |
| 304 | Not Modified | 协商缓存命中时会返回这个状态码，服务器告诉客户端，原来缓存的文档还可以继续使用 |
| 400 | Bad Request | 服务器未能理解请求 |
| 401 | Unauthorized | 被请求的页面需要用户名和密码 |
| 403 | Forbidden | 对被请求页面的访问被禁止 |
| 404 | Not Found | 服务器无法找到被请求的页面 |
| 405 | Method Not Allowed | 请求中指定的方法不被允许 |
| 413 | Request Entity Too Large | 请求的实体的太大，服务器不会接受请求 |
| 414 | Request-URI Too Long | 请求行里的 URI 太大 |
| 500 | Internal Server Error | 请求未完成。服务器遇到不可预知的情况。 |
| 502 | Bad Gateway | 请求未完成。服务器从上游服务器收到一个无效的响应。 |
| 503 | Service Unavailable | 请求未完成。服务器临时过载或宕机 |
| 504 | Gateway Timeout | 网关超时 |

## HTTP特点
- **灵活可扩展**
  - 语义自由：只规定了基本格式，没有严格的语法限制
  - 传输形式多样性：文本，图片，视频等任意数据
- **可靠传输**：基于`TCP/IP`，所以继承了TCP的特性
- **请求-应答**
- **无状态**：每次请求都是独立、无关的，因此通信过程中没有上下文信息

## HTTP缺点
- **无状态**：部分场景需要保存大量上下文信息，无状态就是缺点了。
- **明文传输**
- **队头阻塞**：当 http 开启长连接时，共用一个 TCP 连接，同一时刻只能处理一个请求，那么当前请求耗时过长的情况下，其它的请求只能处于阻塞状态。

## Accept字段
### 数据格式
HTTP 从MIME type取了一部分来标记报文 body 部分的数据类型，这些类型体现在`Content-Type`这个字段。  
当然这是针对于发送端而言，接收端想要收到特定类型的数据，也可以用`Accept`字段。
``` yml
# 发送端
Content-Type: text/html; charset=utf-8
# 接收端
Accept-Charset: text/html
``` 
### 压缩方式
一般这些数据都是会进行编码压缩的，采取什么样的压缩方式就体现在了发送方的`Content-Encoding`字段上。  
同样的，接收什么样的压缩方式体现在了接受方的`Accept-Encoding`字段上。这个字段的取值有下面几种：
- `gzip`: 当今最流行的压缩格式
- `deflate`: 另外一种著名的压缩格式
- `br`: 一种专门为 HTTP 发明的压缩算法
``` yml
# 发送端
Content-Encoding: gzip
# 接收端
Accept-Encoding: gzip
``` 
### 支持语言
对于发送方而言，是`Content-Language`字段，在需要实现国际化的方案当中，可以用来指定支持的语言，在接受方对应的字段为`Accept-Language`。
``` yml
# 发送端
Content-Language: zh-CN, zh, en
# 接收端
Accept-Language: zh-CN, zh, en
``` 
### 字符集
在接收端对应为`Accept-Charset`，指定可以接受的字符集。  
而在发送端并没有对应的`Content-Charset`, 而是直接放在了`Content-Type`中，以`charset`属性指定。
``` yml
# 发送端
Content-Type: text/html; charset=utf-8
# 接收端
Accept-Charset: charset=utf-8
``` 

## 如何传输定长的数据
对于定长包体而言，发送端在传输的时候一般会带上 Content-Length, 来指明包体的长度。
``` js
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', 10);
    res.write("helloworld");
  }
})

server.listen(8080, () => {
  console.log("成功启动");
})
```
如上服务端代码，在浏览器中将显示`helloworld`  
如果将长度设置小， 比如`res.setHeader('Content-Length', 8);`，那么浏览器中的内容将是`hellowor`。  
如果将长度设置大， 比如`res.setHeader('Content-Length', 18);`，那么将直接传输失败。

## 如何传输不定长的数据
通过如下头部字段：
``` yml
Transfer-Encoding: chunked
``` 
这表示分块传输数据，设置这个字段后会自动产生两个效果:
- Content-Length 字段会被忽略
- 基于长连接持续推送动态内容

服务端示例代码：
``` js
const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.setHeader('Content-Length', 10);
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write("<p>开始~</p>");
    setTimeout(() => {
      res.write("这是第一次传输<br/>");
    }, 1500);
    setTimeout(() => {
      res.write("这是第二次传输");
      res.end()
    }, 3500);
  }
})
server.listen(5211, () => {
  console.log("成功启动");
})
```
浏览器效果如下：  
![分块传输示例](@assets/interview/network/chunked-demo.gif)

## HTTP如何处理大文件的传输
HTTP 针对这一场景，采取了范围请求的解决方案，允许客户端仅仅请求一个资源的一部分，用来告知客户端这边是支持范围请求的。
``` yml
Accept-Ranges: none
``` 

## 如何处理表单数据的提交
体现在两种不同的Content-Type取值：
- `application/x-www-form-urlencoded`: 
  - 其中的数据会被编码成以`&`分隔的键值对
  - 接着将字符以URL编码方式编码
- `multipart/form-data`

实际的场景中，对于图片等文件的上传，基本采用`multipart/form-data`而不用`application/x-www-form-urlencoded`。  
因为没有必要做 URL 编码，带来巨大耗时的同时也占用了更多的空间。

## 如何解决队头阻塞问题
### 什么是队头阻塞
HTTP 传输是基于请求-应答的模式进行的，报文必须是一发一收。  
但值得注意的是，里面的任务被放在一个任务队列中串行执行，一旦队首的请求处理太慢，就会阻塞后面请求的处理。  
这就是著名的HTTP队头阻塞问题。
### 如何解决
#### 并发连接
对于一个域名允许分配多个长连接，那么相当于增加了任务队列，不至于一个队伍的任务阻塞其它所有任务。  
在RFC2616规定过客户端最多并发 2 个连接，不过事实上在现在的浏览器标准中，这个上限要多很多，Chrome 中是 6 个。
#### 域名分片
一个域名不是可以并发 6 个长连接吗？那我们就多分几个域名。
比如 content1.baidu.com 、content2.baidu.com。
这样一个baidu.com域名下可以分出非常多的二级域名，而它们都指向同样的一台服务器，能够并发的长连接数更多了，事实上也更好地解决了队头阻塞的问题。
除此之外，静态资源使用第三方cdn也基于这个原理缓解了队头阻塞的问题。

## Cookie
### 有效期
Cookie 的有效期可以通过`Expires`和`Max-Age`两个属性来设置。
- `Expires`即过期时间
- `Max-Age`用的是一段时间间隔，单位是秒，从浏览器收到报文开始计算。

若 Cookie 过期，则这个 Cookie 会被删除，并不会发送给服务端。
### 作用域
关于作用域也有两个属性: `Domain`和`path`, 给 Cookie 绑定了域名和路径。  
在发送请求之前，发现域名或者路径和这两个属性不匹配，那么就不会带上 Cookie。  
值得注意的是，对于路径来说，`/`表示域名下的任意路径都允许使用 Cookie。
### 安全相关
- 如果带上`Secure`，说明只能通过HTTPS传输cookie。
- 如果Cookie字段带上`HttpOnly`，那么说明只能通过HTTP协议传输，不能通过JS访问，这也是预防`XSS`攻击的重要手段。
- 相应的，对于`CSRF`攻击的预防，也有`SameSite`属性。SameSite可以设置为三个值: 
  - `Strict` 浏览器完全禁止第三方请求携带Cookie。比如请求baidu.com网站只能在baidu.com域名当中请求才能携带Cookie，在其他网站请求都不能。
  - `Lax` 宽松一点了，但是只能在 get 方法提交表单况或者`a`标签发送get请求的情况下可以携带Cookie，其他情况均不能。
  - `None` 默认模式，请求会自动携带上Cookie。
### 缺点
- **体积上限小**: 只有`4KB`，只能用来存储少量的信息。
- **性能**: Cookie 紧跟域名，不管域名下面的某一个地址需不需要这个 Cookie ，请求都会携带上完整的 Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求携带了很多不必要的内容。但可以通过`Domain`和`Path`指定作用域来解决。
- **安全**: 由于 Cookie 以纯文本的形式在浏览器和服务器中传递，很容易被非法用户截获，然后进行一系列的篡改，在 Cookie 的有效期内重新发送给服务器，这是相当危险的。另外，在HttpOnly为 false 的情况下，Cookie 信息能直接通过 JS 脚本来读取。

## HTTP 代理
作为代理的服务器相当于一个中间人的角色，对于客户端而言，表现为服务器进行响应；而对于源服务器，表现为客户端发起请求，具有双重身份。
### 代理的功能
- **负载均衡**: 代理服务器拿到请求之后，可以通过特定的算法分发给不同的源服务器，让各台源服务器的负载尽量平均。
- **保障安全**: 利用心跳机制监控后台的服务器，一旦发现故障机就将其踢出集群。并且对于上下行的数据进行过滤，对非法 IP 限流等
- **缓存代理**: 将内容缓存到代理服务器，使得客户端可以直接从代理服务器获得而不用到源服务器那里，比如`CDN`的实现原理

## HTTP缓存及缓存代理
### HTTP缓存
又叫作浏览器缓存。
- 强缓存: 通过`Cache-Control`验证强缓存是否可用
- 协商缓存: 过请求头中的`If-Modified-Since`或者`If-None-Match`这些条件请求字段检查资源是否更新

![HTTP缓存](@assets/interview/network/http-cache.png)
### 为什么需要代理缓存
对于源服务器来说，它也是有缓存的，比如`Redis`, `Memcache`，但对于HTTP缓存来说，如果每次客户端缓存失效都要到源服务器获取，那给源服务器的压力是很大的。  
由此引入了缓存代理的机制。让代理服务器接管一部分的服务端HTTP缓存，客户端缓存过期后就近到代理缓存中获取，代理缓存过期了才请求源服务器，这样流量巨大的时候能明显降低源服务器的压力。