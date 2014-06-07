// ==UserScript==
// @name           Index - Remove article overlays
// @namespace      Index
// @description    Removes article overlays on the new Index homepage
// @include        htt*://index.hu/*
// @grant		   none
// @match          http://*.index.hu/*
// @match          https://*.index.hu/*
// @version        1.0
// @encoding       UTF-8
// ==/UserScript==

var links = document.querySelectorAll('a.overlay_link');
for (var i = 0; i < links.length; i++) {
	links[i].classList.remove('overlay_link');
}