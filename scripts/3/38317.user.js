// ==UserScript==
// @name          Facebook Auto Expand More
// @namespace     http://almaer.com/firefox/userscripts/
// @description   Show all of the apps instead of the "more >>" link
// @include       http://*.facebook.com/*
// ==/UserScript==

// Capture the keystroke
/*
document.addEventListener("load", function(e) {
	if (typeof expand_more_list == 'function') {
		expand_more_list();
}, false);

window.setTimeout(function() {
	location.href = 'javascript:void(expand_more_list());';
}, 10000);
*/

location.href = 'javascript:void(expand_more_list());';
