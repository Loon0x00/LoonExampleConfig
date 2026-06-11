/**
 * $resourceType: 解析器脚本自带全局变量，资源类型，枚举，详见下方
 * $resource: 解析器脚本自带全局变量，资源内容，string
 * $resourceUrl: 解析器脚本自带全局变量，资源url，string
 * 
 * 资源类型
 * 0:config
 * 1:nodes
 * 2:rules
 * 3:rewrites
 * 4:scripts
 * 5:plugin
 */
let resourceType = $resourceType;
//资源内容
let resource = $resource;
//资源url
let url = $resourceUrl;

console.log("resourceType:" + resourceType);
console.log("resource url:" + url);

/*
* 下面是来自插件中的参数
*/
let pluginParams = console.log($argument);

let ua = $argument.UA
let resourceOnly = $argument.resourceUrlOnly
let ageKey = $argument["age-secret-key"]

console.log("ua:" + ua);
console.log("resourceOnly:" + resourceOnly);
console.log("ageKey:" + ageKey);

//$done(解析后的资源字符串)
$done("# generate by ResourceParserExample.js\n" + resource);
