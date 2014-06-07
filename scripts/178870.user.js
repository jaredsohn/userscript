// ==UserScript==
// @name       Remove Facebook Right Column Ad
// @namespace  http://www.minitw.com/
// @version    0.1
// @description  Just remove facebook right column ad
// @match      https://*.facebook.com/*
// @copyright  2012+, free
// ==/UserScript==

var adFacebook = document.getElementById('rightCol');

if (adFacebook) {
	adFacebook.parentNode.removeChild(adFacebook);
}