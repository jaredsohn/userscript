// Google Filter Off
// ==UserScript==
// @name        Google Filter Color
// @namespace   http://home.versanet.de/~cstrebin/
// @description changes background color if google filter is enabled
// @include     http://*.google.*/search?*
// @include     http://google.*/search?*
// ==/UserScript==

var loc = window.content.location;
var params = loc.search.substring(1).split("&");

var filtered = 1;
for (var i in params) {
	if (params[i] == "filter=0") { filtered = 0; break; }
}

if (filtered) {
	javascript:document.getElementsByTagName("body")[0].style.backgroundColor = "lightyellow";
}
