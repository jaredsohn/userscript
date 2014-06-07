// ==UserScript==
// @name        Gyazo Direct Link
// @namespace   agsking
// @author      agsking
// @description Automatically redirects Gyazo image links to the image file itself.
// @match       http://gyazo.com/*
// @include     http://gyazo.com/*
// @version     1.0
// @scriptsource   http://userscripts.org/scripts/show/179267
// ==/UserScript==

if (location.href.match(/gyazo.com\/[0-9a-f]{32}$/)) {

	var image = document.getElementById("gyazo_img").src;
	window.location = image;
}