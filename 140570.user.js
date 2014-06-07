// ==UserScript==
// @id             DBankRedirectLite@jiayiming
// @name           DBank Redirect Lite
// @version        1.2
// @namespace      jiayiming
// @author         jiayiming
// @description    免登录浏览器直接下载
// @include        http://dl.dbank.com/*
// @include        http://dl.vmall.com/*
// @updateURL      https://userscripts.org/scripts/source/140570.meta.js
// @downloadURL    https://userscripts.org/scripts/source/140570.user.js
// @run-at document-end
// ==/UserScript==

location.href='javascript:globallinkdata.data[\'profile.productid\' ]=28;adsShow=false;void(0);'
var marker=document.getElementById("filelist_marker");
marker.parentNode.removeChild(marker);