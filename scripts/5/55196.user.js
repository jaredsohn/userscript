// ==UserScript==
// @name           Krautchan pretty thread
// @description    Moves replies to their parent-posts and indents them automatically
// @include        http://krautchan.net/*/thread-*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var indent = "50px";

$(document).ready(function(){
	// wrap root-post
	$("blockquote:first").wrap('<div id="parent-'+$("input[type='checkbox']:first").attr("name")+'"></div>');
	
	// wrap replies
	$(".postreply,.postreply_highlighted").each(function(){
		var id = $(this).attr("id").substr(5);
		var reply = $(this).parents().get(2);
		$(reply).wrap('<div id="parent-'+id+'"></div>');
		$("a[name='"+id+"']").prependTo("#parent-"+id);
	});
	
	// move replies to their roots
	$("blockquote a[href^='\#']").each(function(){
		var parentid = $(this).attr("href").substr(1);
		var parent = $(this).parents().get(7);
		$(parent).css("margin-left", indent).appendTo("#parent-"+parentid);
	});
});