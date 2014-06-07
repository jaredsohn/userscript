// ==UserScript==
// @name          Musicovery bugfix
// @description   Fixes bug in musicovery.com, when flash plugin does not accept mouse clicks.
// @include       http://musicovery.com/*
// ==/UserScript==

if(document.getElementsByTagName('div').length >= 2) {
	document.getElementsByTagName('div')[0].style.zIndex=0;
}
