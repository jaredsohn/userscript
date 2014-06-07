// ==UserScript==
// @name           RT Ad Skipper
// @namespace      www.rottentomatoes.com
// @include        http://www.rottentomatoes.com/*
// ==/UserScript==

var overlay_body = document.getElementById('overlay_body');
if (overlay_body && overlay_body.style.display == 'block') {
	document.body.style.overflow = 'auto';
	overlay_body.style.display = 'none';
}