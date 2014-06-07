// ==UserScript==
// @name           show deleted comments
// @namespace      System
// @description    Automatically show deleted reddit comments
// @include        http://*.reddit.*
// ==/UserScript==

$(".grayed+.flat-lis a:contains('permalink')").each(function(){
	var permalink=$(this).get(0);
	permalink.hostname="www.unedditreddit.com";
	$.getJSON(permalink.href+"?callback=?",function(data){
		$(permalink).parents(".entry").find(".md>p").text((data==null)?"[not found]":data.content)
	})
})