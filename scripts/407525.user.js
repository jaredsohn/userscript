// ==UserScript==
// @name        7958download
// @namespace   qixinglu.com
// @description 跳广告下载
// @grant       GM_xmlhttpRequest
// @include     http://*.7958.com/down_*.html
// ==/UserScript==
var url = window.location.href.replace('down_','download_');
var xmlHttp = new XMLHttpRequest();
xmlHttp.open('get',url,true);
xmlHttp.onreadystatechange=function(){
url= url.replace('download_','index/downfile/');
window.location=url;
}
xmlHttp.send();

