/*
* $resource: 待解析资源字符串
* $resourceType: 待解析的资源类型（1:nodes, 2:rules, 3:rewrite, 4:script, 5:plugin）
* $done(result): 解析结束后返回解析后字符串
*/

var type = $resourceType
var result = ""
if (type == 1) {
    //parser resource
    result = $resource
}
$done(result)