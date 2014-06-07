// ==UserScript==
// @name           Facebook Hide Likes
// @namespace      KramerC
// @description    Hides the Like posts from sites and pages on the News Feed.
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

function remove_likes() {
	$('li[id*="stream_story"][data-ft*="sty":161]').remove();	// Page Like
	$('li[id*="stream_story"][data-ft*="sty":"161"]').remove();	// Page Like
	$('li[id*="stream_story"][data-ft*="sty":283]').remove();	// Site Like
	$('li[id*="stream_story"][data-ft*="sty":"283"]').remove();	// Site Like
}

window.addEventListener("load", function() { remove_likes(); }, false);
window.addEventListener("DOMNodeInserted", function() { remove_likes(); }, false);