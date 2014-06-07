// ==UserScript==
// @name        facebook checker
// @namespace   http://userscripts.org/users
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @version     1
// @grant       GM_registerMenuCommand
// ==/UserScript==

GM_registerMenuCommand("Cochez les cases à cocher", function(){
	var cbs = document.getElementsByClassName('checkbox');

	for(i in cbs) {
		cbs[i].click();
	}
});