// ==UserScript==
// @name Astro Empires Light CSS
// @namespace AELCSS
// @description change css on astroempires.com only to be used with the dark astro theme
// @include http://*.astroempires.com/*
// @include *.astroempires.com/*
// ==/UserScript==

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	if (!head) return;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss('@import "http://aetrades.co.uk/script/style.css"');