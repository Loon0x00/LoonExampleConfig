/**
 * 这是一个读取插件中用户配置参数的脚本，通过 $arguement.xxx 获取配置的相关参数
 */

let appName = $arguement.appName
let category = $arguement.appCategory
let isC = $arguement.isSupportChinese

console.log($arguement)

$done({});