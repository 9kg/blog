# DNS
> Domain Name Server 域名服务器

## 作用
通过域名查询到具体的IP

## 查询顺序
::: tip 
若其中一步查询成功就到进入建立TCP连接的部分
:::
- 浏览器缓存( chrome 对每个域名会默认缓存60s)
- 系统缓存( hosts 文件)
- 查找本地DNS解析器缓存
- 客户端请求 LDNS(本地域名服务器)，进行递归查询
  ::: details 递归查询
  **递归查询**是一种 DNS 服务器的查询模式，在该模式下 DNS 服务器接收到客户机请求，必须使用一个准确的查询结果回复客户机。如果 DNS 服务器本地没有存储查询 DNS 信息，那么该服务器会询问其他服务器，并将返回的查询结果提交给客户机。
  :::
- LDNS(本地域名服务器) 请求 DNS 根域名服务器，进行迭代查询
  ::: details 迭代查询
  **迭代查询**指DNS 服务器会向客户机提供其他能够解析查询请求的 DNS 服务器地址。当客户机发送查询请求时，DNS 服务器并不直接回复查询结果，而是告诉客户机另一台 DNS 服务器地址，客户机再向这台 DNS 服务器提交请求，依次循环直到返回查询的结果为止。
  :::
### 递归查询和迭代查询的区别
核心区别就是 "查询递交者" 是否改变。迭代查询每次都是从 LDNS 向下一个域名服务重新发起请求，"查询递交者" 永远都是 LDNS ，没有改变。递归查询，"查询递交者"由客户端更替为 LDNS ，LDNS 代为查询并将查询结果返回

## 涉及到的基础知识
### 域名系统
![域名系统图](@assets/interview/network/domain-system.png)
### 域名服务器
![域名服务器图](@assets/interview/network/domain-server.png)