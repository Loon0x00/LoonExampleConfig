/**
 * 本脚本实现HTTP代理协议，可用于Loon的自定义协议（custom类型）
 * 使用方式：
 * [Proxy]
 * customHttp = custom, remoteAddress, port, script-path=https://raw.githubusercontent.com/Loon0x00/LoonExampleConfig/master/Script/http.js
 * 
 * 脚本：
 * 全局参数 $session 表示当前的一个tcp会话，一个session对象样例
 * $session = {
     "uuid":"xxxx",//会话id
     "type":0,
     "conHost":"google.com",
     "conPort":443,
     "proxy":{
         "name":"customHttp",
         "host":"192.168.1.139",
         "port":"7222",
         "userName":"username",
         "password":"password",
         "encryption":"aes-128",
         "allowInsecure":false,
         "ceritificateHost":"",
         "isTLS":false
     }
 }
 *  实现5个session的生命周期方法
 *  function tunnelDidConnected(); //会话tcp连接成功回调
 *  function tunnelTLSFinished(); //会话进行tls握手成功
 *  function tunnelDidRead(data); //从代理服务器读取到数据回调
 *  function tunnelDidWrite(); //数据发送到代理服务器成功
 *  function tunnelDidClose(); //会话已关闭
 * 
 *  $tunnel对象，主要用来操作session的一些方法
 *  $tunnel.write($session, data); //想代理服务器发送数据，data可以为ArrayBuffer也可以为string
 *  $tunnel.read($session); //从代理服务器读取数据
 *  $tunnel.readTo($session, trialData); //从代理服务器读取数据，一直读到数据末尾是trialData为止
 *  $tunnel.established($session); //会话握手成功，开始进行数据转发，一般在协议握手成功后调用
 *  
 */

let HTTP_STATUS_INVALID = -1
let HTTP_STATUS_CONNECTED = 0
let HTTP_STATUS_WAITRESPONSE = 1
let HTTP_STATUS_FORWARDING = 2
var httpStatus = HTTP_STATUS_INVALID

function tunnelDidConnected() {
    console.log($session)
    if ($session.proxy.isTLS) {
        //https
    } else {
        //http
        _writeHttpHeader()
        httpStatus = HTTP_STATUS_CONNECTED
    }
    return true
}

function tunnelTLSFinished() {
    _writeHttpHeader()
    httpStatus = HTTP_STATUS_CONNECTED
    return true
}

function tunnelDidRead(data) {
    if (httpStatus == HTTP_STATUS_WAITRESPONSE) {
        //check http response code == 200
        //Assume success here
        console.log("http handshake success")
        httpStatus = HTTP_STATUS_FORWARDING
        $tunnel.established($session)//可以进行数据转发
        return null//不将读取到的数据转发到客户端
    } else if (httpStatus == HTTP_STATUS_FORWARDING) {
        return data
    }
}

function tunnelDidWrite() {
    if (httpStatus == HTTP_STATUS_CONNECTED) {
        console.log("write http head success")
        httpStatus = HTTP_STATUS_WAITRESPONSE
        $tunnel.readTo($session, "\x0D\x0A\x0D\x0A")//读取远端数据直到出现\r\n\r\n
        return false //中断wirte callback
    }
    return true
}

function tunnelDidClose() {
    return true
}

//Tools
function _writeHttpHeader() {
    let conHost = $session.conHost
    let conPort = $session.conPort

    var header = `CONNECT ${conHost}:${conPort} HTTP/1.1\r\nHost:${conHost}\r\nConnection: keep-alive\r\nUser-Agent:Loon2.1.18\r\nProxy-Connection: keep-alive\r\n\r\n`
    $tunnel.write($session, header)
}
