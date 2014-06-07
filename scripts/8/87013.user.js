// ==UserScript==
// @name           Baidu album show large pic
// @description    Album show large pic.
// @namespace      Baidu_album_large_pic
// @include        http://hi.baidu.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$(document).ready(function() {
	$("img").attr("src",function() { return this.src.replace(/abpic/,'pic') });
});