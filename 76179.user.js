// ==UserScript==
// @name           NZ Herald Single page
// @namespace      http://userscripts.org/users/patbolo
// @description    Multi pages articles are displayed as one page.
// @include        http://*.nzherald.co.nz/*
// ==/UserScript==

var param = /pnum=0/;
var separator = /\?/;
if ((param.test(window.location) == false) && (separator.test(window.location) == true))  {
	window.location = window.location + "&pnum=0";
}


