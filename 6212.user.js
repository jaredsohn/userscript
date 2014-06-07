// Google Filter Off
// ==UserScript==
// @name        Google Filter Off
// @namespace   http://home.versanet.de/~cstrebin/
// @description turns off the google filter (appends URL parameter "filter=0")
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
	var sep = loc.toString().indexOf("?") < 0 ? "?" : "&";
	loc.href += sep + "filter=0";
}
