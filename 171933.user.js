// ==UserScript==
// @name            Hack Forums - Next/Previous page on left/right keypress
// @namespace       Snorlax
// @description     Goes to next or previous page when pressing arrows
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

$(document).on('keydown',function(e) {
	key = e.which;
	if ($(e.target).is('input, textarea, select')) return;
	if ($(".pagination_previous")[0]){
		if(e.which == 37){
			window.location.href = $(".pagination_previous").attr("href");
		}
	}
    if ($(".pagination_next")[0]){
		if(e.which == 39){
			window.location.href = $(".pagination_next").attr("href");
		}
	}
});