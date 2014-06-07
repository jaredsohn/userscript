// ==UserScript==
// @name          f7u12 Alt Text in Comments
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Automatically displays any alt text on images in the f7u12 comments.
// @author        josh_bubs
// @include       http://www.reddit.com/r/fffffffuuuuuuuuuuuu/comments/*
// @include       http://*.reddit.com/r/fffffffuuuuuuuuuuuu/comments/*
// @run-at document-start
// ==/UserScript==
(function(){
var $ = unsafeWindow.$;
var jQuery = unsafeWindow.jQuery;

$(".md a").each(function(){
	if($(this).attr("title")!="")
	{
		$(this).wrap("<span'></span>");
		$(this).parent().html($(this).parent().html() + "<span style='background-color:skyblue;border:1px solid black;font-weight:bold;padding:0 4px 0 4px;'>" + $(this).attr("title") + "</span>");
	}
})
})()