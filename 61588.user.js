// ==UserScript==
// @name           Kongregate.com - fullscreen game
// @namespace      http://pas-bien.net/
// @include        http://www.kongregate.com/games/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

GM_registerMenuCommand( "Toggle fullscreen mode", function() {
	$('div#headerwrap').toggle();
	$('div#full-nav-wrap').toggle();
	$('div#gamepage_header').toggle();
	$('div#subwrap').toggle();
});
