/**
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

console.log(resourceType);
console.log(url);

if (resourceType == 0) {
    //$done(解析后的资源字符串)
    $done("# generate by ResourceParserExample.js\n" + resource);
}