// ==UserScript==
// @name       119G Redirect to DownloadPage
// @namespace   http://userscripts.org/users/tumuyan
// @version    0.1
// @description  
// @include     http://d.119g.com/f/*.html*
// ==/UserScript==
// down可以设置为 wt(网通) dx（电信） bf（备份）下载通道（但是我觉得没什么区别吧？）
// pop 可以设置为 1（自动弹出迅雷链接地址） 0（不弹出迅雷链接地址）
var down='wt'
var pop=1

if (document.URL.match(/([A-Z 0-9]){5,18}.html/))
{
var URL=document.URL.replace(".html","_" + down + ".html")
location.href = URL
}


if (pop)
{
var link1 = document.documentElement.innerHTML.match(/thunderhref="thunder.*?\={0,2}"/) ;
var link = link1[0].replace(/thunderhref="/,"")
link = link.replace('"',"");
prompt('Thunder Link Get!',link)
}