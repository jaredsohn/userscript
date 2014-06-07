// ==UserScript==
// @name        liangziResizer
// @namespace   s2ss
// @description liangzi_taobao_contentRight_Resizer
// @include     http://lz.taobao.com/*
// @version     1.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

//页面上双击激发
$(window).dblclick(function(){

	$("#contentLeft").remove();
	$("#contentRight").css("width","920px");
	$("#keyword-table-wrap").css("width","600px");
}); 

