// ==UserScript==
// @name           Force Arial font
// @namespace      http://userscripts.org/scripts/review/486747
// @description    Force Arial for facebook. Modified  from https://userscripts.org/scripts/show/107669
// @include        https://www.facebook.com/*
// @include        https://github.com/*
// ==/UserScript==

// font and target
fontFamily = "arial, sans-serif";
blocks = [ 'sans', 'inputtext', 'span', 'p', 'a', 'div'];

// body
document.body.style.fontFamily = fontFamily;

// tags
for (index = 0; index < a.length; index++) {
	elements = document.getElementsByTagName(blocks[index]);
	for(i = 0 ; i < elements.length ; i++) {
		elements[i].style.fontFamily = fontFamily;
	}
}