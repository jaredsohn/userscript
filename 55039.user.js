// ==UserScript==
// @name           4chan pretty thread
// @description    Moves replies to their parent-posts and indents them automatically
// @include        http://*.4chan.org/*/res/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var indent = "50px";

$(document).ready(function(){
	// wrap root-post
	$("blockquote:first").wrap('<div id="parent-'+$("input[type='checkbox']:first").attr("name")+'"></div>');
	
	// wrap replies
	$(".reply,.replyhl").each(function(){
		var id = $(this).attr("id");
		var reply = $(this).parents().get(2);
		$(reply).wrap('<div id="parent-'+id+'"></div>');
		$("a[name='"+id+"']").prependTo("#parent-"+id);
	});
	
	// move replies to their roots
	$(".quotelink").each(function(){
		var parentid = $(this).attr("href").substr(-9);
		var parentlevel = ($(this).parent()[0].tagName == "FONT") ? 6 : 5;
		var parent = $(this).parents().get(parentlevel);
		$(parent).find("blockquote").children("a:first,font:first,br:first").remove();		
		$(parent).css("margin-left", indent).appendTo("#parent-"+parentid);
	});
});