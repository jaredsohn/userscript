// ==UserScript==  
// @name         12306 Plus
// @version      1.0.0
// @author       Lonze
// @namespace    http://12306.lonze.net
// @description  改变12306
// @include      *://dynamic.12306.cn/otsweb/*
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript== 

$(function($){
if(window.location.href.indexOf('http://www.12306.cn/'))
	window.location.href='https://dynamic.12306.cn/otsweb/';
var loadStyle=function(string){
	var $style=$("<style></style>").text(string);
	$("head").append($style);
};
loadStyle("html,body{overflow:hidden;height:100%;}");
});