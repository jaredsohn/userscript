// ==UserScript==
// @name           Kongregate.com - fullscreen game (no menu)
// @namespace      http://pas-bien.net/
// @include        http://www.kongregate.com/games/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('body').append('<div id="gm_fullscreen">fullscreen</div>');

$('#gm_fullscreen').css(
	'position', 'fixed').css(
	'top', '2px').css(
	'right', '2px').css(
	'background-color', '#991111').css(
	'color', 'white').css(
	'cursor', 'pointer').css(
	'padding', '2px 4px 2px 4px').css(
	'border', 'solid 1px #000000').css(
	'font-weight', 'bold').click(function() {
	$('div#headerwrap').toggle();
	$('div#full-nav-wrap').toggle();
	$('div#gamepage_header').toggle();
	$('div#subwrap').toggle();
});
