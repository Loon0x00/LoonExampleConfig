# Loon脚本类型
Loon支持的脚本类型：

## http-request
### 语法
```
http-request ^https?:\/\/(www.)?(example)\.com script-path=localscript.js,tag = requestScript,enable=true,requires-body = true
```
此类型脚本会在一个http请求发起时调用，在此类脚本中可以使用如下变量

- 所有loon script API
- $request: 一个http请求信息
    - $request.url: String类型，请求URL
    - $request.method: String类型，请求方法
    - $request.headers: js对象，请求头
    - $request.body: String或者Uint8Array类型，当requires-body = true时才有值，请求的body
- $response: undefined
- $done()方法参数说明：
    - $done(): 不传任何参数，表示放弃该请求，请求连接会直接断开
    - $done({}): 空js对象，请求继续，任何请求参数不会有任何变化
    - $done({url:"https://new.example.com/"}): 替换原来的url
    - $done({headers:{}}): 替换原来的request headers
    - $done({response:{
        status:200,
        headers:{},//response headers
        body:"" //response body String type
    }}): 直接向该请求返回一个假的响应

## http-response
### 语法
```
http-response ^https?:\/\/(www.)?(example)\.com script-path=https://example.com/loon.js,timeout=10,requires-body = true,tag = responseScript,enable=true
```
此类脚本会在http请求得到响应后调用，requires-body参数表示是否截取响应体，
- 所有loon script API
- $request: http请求信息
    - $request.url: String类型，请求URL
    - $request.method: String类型，请求方法
    - $request.headers: js对象，请求头
    - $request.body: String或者Uint8Array类型，如果请求带有body，此参数才有值
- $response: http响应信息
    - $response.status: 响应状态
    - $response.headers: 响应头
    - $response.body: String或者Uint8Array类型，如果响应带有body，并且requires-body = true时此参数才有值
- $done()方法参数说明：
    - $done(): 不传任何参数，表示放弃该请求，请求连接会直接断开
    - $done({}): 空js对象，请求继续，任何请求参数不会有任何变化
    - $done({response:{
        status:200,
        headers:{},//response headers
        body:"" //response body String type
    }}): 直接向该请求返回一个假的响应

## cron
### 语法
```
cron "0 8 * * *" script-path=cron.js,tag = responseScript,enable=true
```
- 根据设定的cron表达式触发脚本
- "* * * * *" : 分 时 日 月 周 
- "* * * * * *" :秒 分 时 日 月 周

## network-changed
### 语法
```
network-changed script-path=https://raw.githubusercontent.com/Loon0x00/LoonExampleConfig/master/Script/netChanged.js, tag=changeModel,enable=true
```
当网络环境发生变化时会调用改脚本，如果有多个这种类型的脚本，只会调用配置文件中的第一个

## generic
### 语法
```
generic script-path=https://raw.githubusercontent.com/Loon0x00/LoonExampleConfig/master/Script/generic_example.js,tag=GeoLocation,timeout=10,img-url=location.fill.viewfinder.system
```
以节点、策略组、规则等配置为参数的脚本，需要在app内部页面手动进行触发，不会主动触发。