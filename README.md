![](https://img.shields.io/badge/LoonVer.-2.1.5-blue.svg)   ![](https://img.shields.io/badge/Coding-JavaScript-green.svg) ![](https://img.shields.io/badge/Author-Pwnint32-orange.svg) ![](https://img.shields.io/badge/FirstModify-2020%2F11%2F18-red.svg)
# Loon脚本API手册
阅读此文档需要了解基础的JavaScript语法和正则表达式

如果您有兴趣学习JavaScript的教程可以移步至：[菜鸟教程-JavaScript教程](https://www.runoob.com/js/js-tutorial.html)

如果您有兴趣学习正则表达式的内容可以移步至:[30分钟入门正则表达式](https://deerchao.cn/tutorials/regex/regex.htm)

本人非Loon作者，在官方文档没有出来之前，本API手册可作为脚本编写的API参考。

截止至编写本篇教程时,Loon版本号为:2.1.5(226),TF版本
---
## 一、Loon脚本类型
    Loon支持三种脚本类型:http-request,http-response,cron

    http-request类型:获取到表达式匹配的URL地址发生请求事件时触发的脚本
    http-response类型:获取到表达式匹配的URL地址完成请求,取得响应消息体时触发的脚本
    cron类型:定时任务脚本,在Loon中有表达式的详细注解,cron可自行百度进行学习

## 二、Loon推送通知
    Loon支持通过脚本向用户推送通知信息

```php
API名称:$notification
API方法:post
API方法参数:Title,SubTitle,Content

Title:通知标题
SubTitle:子标题
Content:内容

Tips:SubTitle和Content必须传入的,可以传入空字符串,则只会显示通知标题;SubTitle显示的内容长度有限,如果内容过长,建议写入Content。
```

```javascript
API代码示例：
function Notify_Demo()
{
    var Title,SubTitle,Content;
    TItle = "我是主标题";
    SubTitle  = "我是子标题";
    Content = "我是要推送的内容";
    $notification.post(Title,SubTitle,Content);
}
//Call Function
Notify_Demo()
```
## 三、Loon发送Http请求
    Loon支持发送Http请求,许多签到脚本的实现也是基于此API。

```php
API名称：$httpClient
API方法:get,post
本API分为两个方法,get方法和post方法,其中get请求支持两种参数格式：

GET请求的API方法参数(第一种)：Url,CallBackFunction(error,response,data)
GET请求的API方法参数(第二种)：Params,CallBackFunction(error,response,data)

POST请求的API方法参数:Params,CallBackFunction(error,response,data)

Url:请求的URL,字符串类型
CallBackFunction(error,response,data)：回调函数,用于获取请求回来的消息体,传入三个参数:error,response,data;response:消息头,对象类型;data：消息体,字符串类型;error一般表示错误信息
Params:请求对象,对象类型,其中包括三个内容：url,headers,body;分别表示请求的URL,请求头信息,需要携带的消息体;headers:对象类型,写入请求所需要的各种头部信息。
```
**GET请求的两种方式:**
```javascript
//$httpClient.get(url,callbackfunction(error,response,data));
function Get_One()//第一种方式
{
    var ExampleUrl = "https://example.com";
    $httpClient.get(ExampleUrl,function(error,response,data)
    {
        var StatusCode,ResponseHeaders;
        StatusCode = response.status;
        ResponseHeaders = response.headers;
        console.log(response);
        console.log(StatusCode);//400
        console.log(ResponseHeaders);//Object
        console.log(error);
        console.log(data);
        console.log(Json.parse(data));//if data is Json String
        //Loon支持使用Console.log输出调试信息
    })
}



//$httpClient.get(params,callbackfunction(error,response,data))
function Get_Two()//第二种方式
{
    var GetExampleParams
    {
        url:"https://www.baidu.com",
        headers:
        {
            "User-Agent":"Example.Agent",
             Cookies:"ExampleCookie",
             //...
        },
        body:"ExampleBodyMessage"
    }
    $httpClient.get(GetExampleParams,function(error,response,data)
    {
        var StatusCode,ResponseHeaders;
        StatusCode = response.status;
        ResponseHeaders = response.headers;
        console.log(response);
        console.log(StatusCode);//400
        console.log(ResponseHeaders);//Object
        console.log(error);
        console.log(data);
        console.log(Json.parse(data));//if data is Json String
        //Loon支持使用Console.log输出调试信息
    })
}
```

**POST请求**
```javascript
//$httpClient.post(params,callbackfunction(error,response,data))
function Post_Data()
{
    var GetExampleParams
    {
        url:"https://www.baidu.com",
        headers:
        {
            "User-Agent":"Example.Agent",
             Cookies:"ExampleCookie",
             //...
        },
        body:"ExampleBodyMessage"
    }
    $httpClient.post(GetExampleParams,function(error,response,data)
    {
        var StatusCode,ResponseHeaders;
        StatusCode = response.status;
        ResponseHeaders = response.headers;
        console.log(response);
        console.log(StatusCode);//400
        console.log(ResponseHeaders);//Object
        console.log(error);
        console.log(data);
        console.log(Json.parse(data));//if data is Json String
        //Loon支持使用Console.log输出调试信息
    })
}
}

```
## 三、Http-request类型
    Loon中的http-request类型的脚本,除了支持公共API外,还有自有的变量,不过该变量只有在其被触发时才有效。
```php
API名称:$request
API属性:url,headers....等等
本API只有在匹配了正则表达式匹配的URL链接才会被触发,直接运行会报错。
tips:非cron类型脚本,都需要在MITM中添加要解密的域名,否则不会生效;您需要添加正则表达式
使用$request.url可以获取到请求链接等信息,如果您不知道$request中包含哪些信息
可以使用console.log($request)输出其完整的信息
```

```javascript
//获取请求URL和请求头信息
function Get_RequestInfo()
{
    var RequestURL,RequestHeaders;
    RequestURL = $request.url;
    RequestHeaders = $request.headers;
    console.log(RequestURL);
    console.log(RequestHeaders);
}
//修改请求头信息
function Change_Request()
{
    var RequestHeaders = $request.headers;
    RequestHeaders["Cookie"] = "ChangeExampleCookie";
    $done({RequestHeaders});//修改完成之后需要调用$done
}
```
## 四、Http-response类型
    Loon中的http-response类型的脚本,除了支持公共API外,还有自有的变量,不过该变量只有在其被触发时才有效。
```php
API名称:$response
API属性:headers....等等
本API只有在匹配了正则表达式匹配的URL链接才会被触发,直接运行会报错。
tips:非cron类型脚本,都需要在MITM中添加要解密的域名,否则不会生效;您需要添加正则表达式
如果您不知道$response中包含哪些信息
可以使用console.log($response)输出其完整的信息
注意：如果要修改消息体的内容,需要打开Body开关
```

```javascript
//获取响应信息
function Get_ResponseInfo()
{
    var ResponseHeaders;
    RequestHeaders = $response.headers;
    console.log(RequestHeaders);
}
//修改消息体
function Change_ResponseBody()
{
    var RespnseBodyData = $response.body
    RespnseBodyData = Json.parse(RespnseBodyData);
    RespnseBodyData["ExampleTree"] = "ExampleChangeTree";
    $done({RespnseBodyData});//修改完成之后需要调用$done
}
```
## 五、Loon中持续化存储
    我也不知道API的意思是不是这个,姑且这么叫吧。
    在Loon中,提供了一个能在全局存储数据的API,也就是一个脚本在运行的时候,可以读取其他多个脚本运行中存入公共区域的数据。
    本函数在Loon的进程被杀死之前，存储的数据一直会被保留。
```php
API名称:$peristentStroe
方法:write,read,remove
write:用于写入数据到公共存储区
read:用于读取在公共存储区已有的数据
remove:移除公共存储区存储的数据
```
```javascript
API代码示例：
function Write_PeristentStore()//写入存储区
{
    var WriteString = "WriteExample";
    $peristentStore.write(WriteString,"ExampleKey");//参数分别代表:写入的数据,数据存储的Key名称，用于取出数据
}
function Read_PeristentStore()//读取写入的数据
{
    var ReadKey = "ExampleKey";//上一个API写入数据的KEY名称
    var ReadResult = $peristentStore.read(ReadKey);
    console.log(ReadResult);//输出数据
}
//Remove方法我就不写例子了,和read相同
```
    本API多被用于需要获取Cookie的脚本进行Cookie获取写入持续存储区,再供签到脚本读取Cookie来运行。

## 六、结束
    其实文档还没有结束,目前官方正式的文档还没有出来,希望我的文档能够帮助到大家。

    Tips:Loon中所有的内建函数,如$httpClient等,都可以使用console.log($functionName)来查看它的方法和属性。

    一个小贴士:$loon也是属于一个内建函数,可以使用本函数输出loon版本,也可以通过这个来判断脚本是否再loon中运行。

    loon的config部分我就不讲了，没有深入了解过，只了解了以上提到的内容。

    END.
                                                                                         PwnInt32
