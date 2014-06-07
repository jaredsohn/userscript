// ==UserScript==
// @name        edmtunes FB popup remover
// @namespace   Prom.edmtunes
// @include     http://*.edmtunes.com/*
// @version     1
// @grant		none
// ==/UserScript==

// As found at: https://gist.github.com/1143845
window.unsafeWindow || (
	unsafeWindow = (function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}())
);
unsafeWindow.easyjquery_fb_checkcookie = function() {return true;};