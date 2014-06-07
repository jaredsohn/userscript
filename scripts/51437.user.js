// ==UserScript==
// @name           doumail alert
// @namespace      URI<nuomi.org>
// @description    by nuomi
// @include        http://www.douban.com/*
// @exclude        http://www.douban.com/doumail/*
// @author	   nuomi
// ==/UserScript==
//
//

if(typeof unsafeWindow.jQuery !== "undefined") {
   var jQuery = unsafeWindow.jQuery;
   var $ = jQuery 
}

window.oldtitle=document.title;

window.setInterval(function(){
	$("#doumail").remove();
	$("<div id='doumail'/>").load("/doumail/ .m", function(){
		var reqs = $("#doumail").children().length;
		if (reqs > 0) {document.title=reqs+'封新豆邮'+' '+window.oldtitle;}
			else  {document.title=window.oldtitle;}
	}).appendTo("body").hide();
},40000);
