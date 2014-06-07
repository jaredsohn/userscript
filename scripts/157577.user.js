// ==UserScript==
// @name            baidu自动跳转
// @namespace       http://userscripts.org/123
// @description     点击google搜索结果中的百度知道,重定向到一个百度页面[a], 本脚本将会从页面[a]自动再跳转到目标页面
// @include         http://www.baidu.com/search/ressafe.html?q=&ms=3&url=*
// @updateURL       http://userscripts.org/scripts/source/157577.user.js
// @version         1.7
// @author          qingshan
// @run-at          document-start
// ==/UserScript==
document.getElementsByTagName("html")[0].style.display="none";
var url = location.href;
location.href = url.substr(url.lastIndexOf("=")+1);
