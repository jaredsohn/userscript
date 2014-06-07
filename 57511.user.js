// ==UserScript==
// @name           Unanswered Threads
// @namespace      http://tristanroberts.name/namespace
// @description    Provides a link & function to show only unanswered threads on the Whirlpool forums.
// @include        http://forums.whirlpool.net.au/forum/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version	   1.0
// ==/UserScript==

var url = document.location.toString();

if ( url.match('show=unread') ) {
	var old_url = url.replace('?show=unread', '');
	    old_url = old_url.replace('&show=unread', '');
	
	$('#breadcrumb li:last').html('<a href="' + old_url + '">' + $('#breadcrumb li:last').text() + '</a>');
	
	$('tbody tr').each( function () {
		if ($(this).children('.reps').text() != 0) {
			$(this).hide();
		} else if ($(this).hasClass('pointer') || $(this).hasClass('deleted')) {
			$(this).hide();
		}
	});
} else {
	var new_url = url;
	    new_url += (url.indexOf('?') > -1) ? '&show=unread' : '?show=unread';
	$('#breadcrumb li:last').append(' <a href="' + new_url + '">(unread)</a> ');
}