// ==UserScript==
// @name           zerochan
// @namespace      zzz
// @description    preview image
// @include        http://www.zerochan.net/
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


$(document).ready(function(){									
	$("p.thumb a img").mouseenter(function(){
		link = $(this).attr("src").substring(0, 23) + "600/" + $(this).attr("src").substring(27, $(this).attr("src").length);		
		
		$("body").append("<div id='test'></div>");	
		//$("div#test").html(link);
		$("div#test").css("position", "fixed");
		$("div#test").css("top", "0");
		$("div#test").css("right", "200px");
		$("div#test").css("zIndex", "999");		
		$("div#test").append("<img src="+link+" />");		
	});
	
	$("p.thumb a img").mouseleave(function(){
		$("div#test").remove();
	});
});