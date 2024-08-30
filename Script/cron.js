/*
cron 语法
* * * * * : 分 时 日 月 周
* * * * * * :秒 分 时 日 月 周";

脚本配置
[script]
cron "0 8 * * *" script-path=https://raw.githubusercontent.com/Loon0x00/LoonExampleConfig/master/Script/cron.js,tag = cronExample,enable=true
*/


console.log('Start cron JS Demo');

let appName = $argument.appName; //这个参数是从插件配置中获取到的，见插件：https://raw.githubusercontent.com/Loon0x00/LoonExampleConfig/master/Plugin/Plugin_Arg.plugin
console.log(appName);

$notification.post("Cron测试脚本","这是一个测试cron的脚本","仅供测试使用，不要安装");
$done();