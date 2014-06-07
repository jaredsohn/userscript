// ==UserScript==
// @name           GLB Link2Post
// @namespace      PackMan97
// @description    Adds a direct link to forum posts.
// @include       http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

$(document).ready( function() {
	var search = window.location.search;
	if ( search.match(/page=last/) ) {
		var page = $(".page_selector_selected").children("a:first").html();
		search = search.replace(/last/g, page);
	}
	$('.post').each( function() {
		var post = $(this);
		var id = post.children('a:first').attr('id');
		$('.post_buttons a:first', post).after("&nbsp;|&nbsp;<a href=" + window.location.pathname + search + 

"#" + id + ">Link</a>");
	});
});