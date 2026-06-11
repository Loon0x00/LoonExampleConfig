#!name=Loon订阅解析器示例
#!desc=专门用于解析订阅节点的插件，这是一个插件示例，内容原样返回，无任何作用
#!openUrl=https://nsloon.app
#!author=Loon0x00[https://github.com/Loon0x00/LoonExampleConfig]
#!tag=解析器,官方,Demo
#!system=
#!system_version=
#!loon_version=3.5.0(969)
#!homepage=https://nsloon.app
#!icon=https://raw.githubusercontent.com/Loon0x00/Loon0x00.github.io/main/static/img/loon.png
#!date=2026-06-11 11:11:35
#!type=parser

[Argument]
UA = input,"Loon",tag=请求订阅的UA,desc=发起请求时用到的UA
resourceUrlOnly = switch,true,tag=忽略 Loon 自身解析数据,desc=忽略 Loon 自身解析数据
age-secret-key = input,"",tag=age 加密解密,desc=age 加密解密功能 可查看 https://t.me/zhetengsha/5876

[Script]
generic script-path=node_parser_ex.js,tag=NodeParser,timeout=10,,argument=[{UA},{resourceUrlOnly},{age-secret-key}]
