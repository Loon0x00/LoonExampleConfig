/*
network-changed script-path=https://raw.githubusercontent.com/Loon0x00/LoonExampleConfig/master/Script/netChanged.js
*/

var confStr = $config.getConfig()
console.log(confStr)

var conf = JSON.parse(confStr)
if (conf.ssid == "your ssid name") {
    /*
    0:Global Direct
    1:By Rule
    2:Global Proxy
    */
    $config.setRunningModel(0)
    $config.setSelectPolicy("⛔ 广告拦截","DIRECT")
    $notification.post("Network changed","Change Running Model to Global Direct","⛔ 广告拦截 to DIRECT")
} else {
    $config.setRunningModel(1)
    $config.setSelectPolicy("⛔ 广告拦截","REJECT")
    $notification.post("Network changed","Change Running Model to Filter by rule","⛔ 广告拦截 to REJECT")
}