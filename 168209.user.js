// ==UserScript==
// @name            Goole Baidu 自动跳转 (auto follow/jump)
// @namespace       http://userscripts.org/123
// @description     点击 Google 搜索结果中的百度项目, 会重定向到一个百度页面, 本脚本将会从此页面自动跳转到预期的目标页面. 修改自 qingshan 的作品.
// @include         http://www.baidu.com/search/ressafe.html?q=&ms=3&url=*
// @version         1.0
// @author          Keiyso
// @run-at          document-start
// ==/UserScript==
document.getElementsByTagName("html")[0].style.display="none";
var url = location.href;
location.href = url.substr(url.lastIndexOf("url=")+4); 
