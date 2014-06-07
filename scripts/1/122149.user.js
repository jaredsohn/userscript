// ==UserScript==
// @name           snip.it frame killer
// @namespace      http://owenstrain.com
// @include        http://snip.it/*
// @match          http://snip.it/*
// @description   A Greasemonkey / NinjaKit script to automatically get rid of the snip.it carousel frame.
// ==/UserScript==
if (document.getElementById('postFrame')) {
	// Use window.location.replace to simulate a redirect 
	window.location.replace(document.getElementById('postFrame').getAttribute('src'));
}