/**
 * 这是一个读取插件中用户配置参数的脚本，通过 $argument.xxx 获取配置的相关参数
 */

console.log($argument);

let appName = $argument.appName;
let category = $argument.appCategory;
let isC = $argument.isSupportChinese;

console.log("appName:" + appName);
console.log("category:" + category);
console.log("isSupportChinese:" + isC);

$done({});