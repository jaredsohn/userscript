// ==UserScript==
// @name			Reddit - Link to comments within the same page without reloading
// @description		Creates anchors for links within the same page to obviate reloading
// @author			gavin19 and Sarkos
// @include			http://*.reddit.com/*/*/comments/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$('div.md a[href]').each( function() {
	var nLink = $(this).attr('href').split('/');
	var nPage = window.location.href.split('/');
	if (nLink[6] && nPage[6] && nLink[6] == nPage[6] && $('div.thing > p.parent > a[name="' + nLink[8] + '"]').length) {
		$(this).attr('href', '#' + nLink[8]);
		$(this).attr('target', '_self');
	}
});
