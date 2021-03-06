# TCP
> 传输控制协议（TCP，Transmission Control Protocol）是一种面向连接的、可靠的、基于字节流的传输层通信协议。

## 特点
- 提供面向连接的，可靠的字节流服务
- 为上层应用层提供服务，不关心具体传输的内容是什么，也不知道是二进制流，还是ascii字符。

## 如何保证可靠性
- **分块传送**：数据被分割成最合适的数据块（`UDP`的数据报长度不变）
- **等待确认**：通过定时器等待接收端发送确认请求，收不到确认则重发
- **确认回复**：收到确认后发送确认回复(不是立即发送，通常推迟几分之一秒)
- **数据校验**：保持首部和数据的校验和，检测数据传输过程有无变化
- **乱序排序**：接收端能重排序数据，以正确的顺序交给应用端
- **重复丢弃**：接收端能丢弃重复的数据包
- **流量缓冲**：两端有固定大小的缓冲区（滑动窗口），防止速度不匹配丢数据

## 三次握手
1. 客户端发生`SYN`，表明要向服务器建立连接，同时带上序列号`ISN`
2. 服务器返回`ACK`(序号为客户端序列号`+1`)作为确认。同时发送`SYN`作为应答（`SYN`的序列号为服务端唯一的序号）。
3. 客户端发送`ACK`确认收到回复（序列号为服务端序列号`+1`）
### 为什么是三次握手
因为TCP链接是全双工的，数据在两个方向上能同时传递。所以需要确保双方的收发能力：
- 第一次握手确认了客户端的发送能力
- 第二次握手确认了服务端的发送和接收能力
- 第三次握手确认了客户端的接收能力

## 四次挥手
1. 主动关闭的一方发送`FIN`，表示要单方面关闭数据的传输
2. 服务端收到`FIN`后，发送一个`ACK`作为确认（序列号为收到的序列号`+1`）
3. 等服务器数据传输完毕，也发送一个`FIN`标识，表示关闭这个方向的数据传输
4. 客户端回复`ACK`以确认回复
### 为什么是四次挥手
因为tcp连接是全双工的，数据在两个方向上能同时传递。  
同时tcp支持半关闭（发送一方结束发送还能接收数据的功能）。  
因此每个方向都要单独关闭，且收到关系通知需要发送确认回复。
### 为什么要支持半关闭
客户端需要通知服务端，它的数据已经传输完毕  
同时仍要接收来自服务端的数据  
使用半关闭的单连接效率要比使用两个tcp连接更好

## 滑动窗口协议
- 解决了什么问题：发送方和接收方速率不匹配时，保证可靠传输和包乱序的问题
- 机制：接收方根据目前缓冲区大小，通知发送方目前能接收的最大值。发送方根据接收方的处理能力来发送数据。通过这种协调机制，防止接收端处理不过来。
- 窗口大小：接收方发给发送端的这个值称为窗口大小

![滑动窗口示意图](@assets/interview/network/tcp-window.webp)
- 整体向右滑动
- 黑框表示滑动窗口
- #1表示收到ack确认的数据
- #2表示还没收到ack的数据
- #3表示在窗口中还没有发出的（接收方还有空间）
- #4窗口以外的数据（接收方没空间）

### 拥塞窗口
- 解决什么问题：发送方发送速度过快，导致中转路由器拥堵的问题
- 机制：发送方增加一个拥塞窗口（cwnd），每次受到ack，窗口值加1。发送时，取拥塞窗口和接收方发来的窗口大小取最小值发送
- 起到发送方流量控制的作用

### 滑动窗口会引发的问题
#### 零窗口
如何发生： 接收端处理速度慢，发送端发送速度快。窗口大小慢慢被调为0  
如何解决：ZWP技术。发送zwp包给接收方，让接收方ack他的窗口大小。
#### 糊涂窗口综合征
如何发生：接收方太忙，取不完数据，导致发送方越来越小。最后只让发送方传几字节的数据。  
缺点：数据比tcp和ip头小太多，网络利用率太低。  
如何解决：避免对小的窗口大小做响应。  
- 发送端：Nagle算法。
  ::: details Nagle算法
  解决什么问题：微小分组导致在广域网出现的拥堵问题  
  核心：减少了通过广域网传输的小分组数目  
  原理：要求一个tcp连接上最多只能有一个未被确认的未完成的分组，该分组的确认到达之前，不能发送其他分组。tcp收集这些分组，确认到来之前以一个分组的形式发出去  
  优点：自适应。确认到达的快，数据发送越快。确认慢，发送更少的组。  
  使用注意：局域网很少使用该算法。且有些特殊场景需要禁用该算法
  :::
- 接收端：窗口大小小于某个值，直接ack（0），阻止发送数据。窗口变大后再发。