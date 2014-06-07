// ==UserScript==
// @name           GLB Forum Link to Post
// @namespace      rockitsauce
// @description    Adds a direct link to forum posts.   Clicking scrolls the window to the top of the post.  Any user with this script installed will jump directly to the post.
// @include       http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

$(document).ready( function() {
	var href = window.location.href;
	
	$('.post').each( function() {
		var post = $(this);
		var id = post.children('a:first').attr('id');
		$('.post_buttons a:first', post).after("&nbsp;|&nbsp;<a href=" + href + "#" + id + ">Link</a>");
	});
});
