// ==UserScript==
// @name           Kill Floating Bars
// @namespace      http://userscripts.org/scripts/show/123194
// @description    Stops elements from following you as you scroll down the page
// @include        *
// ==/UserScript==

var i;
var all = document.getElementsByTagName("*");
for(i = 0; i < all.length; i++) {
	var style = window.getComputedStyle(all[i]);
	var positioning = style.position;
	if ((positioning == 'absolute') || (positioning == 'fixed')) {
		all[i].style.position = 'static';
	}
}
