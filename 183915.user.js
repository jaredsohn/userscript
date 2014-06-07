// ==UserScript==
// @name           Nicer Facebook Chat Online Indicator
// @author		   Tobias Jenal
// @namespace      fbcoi
// @description    Nicer Facebook Chat Online Indicator
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*

// ==/UserScript==

// ==============
// ==NoBanner==
var i = window.setInterval(t, 5000);
function t() {
	Array.prototype.forEach.call(document.getElementsByClassName('_5t30'), function(e) {
		e.style.display = 'none';
		if('Web' != e.innerHTML && '' == e.previousSibling.innerHTML) {
			e.nextSibling.style.backgroundImage = 'url(http://topy.in/images/mobile_green.png)';
			e.nextSibling.style.backgroundPosition = '0px 0px';
		}
	});
}
// ==============
