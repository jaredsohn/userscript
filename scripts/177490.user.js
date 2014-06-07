// ==UserScript==
// @name        arkWiki
// @description XWiki tuning
// @namespace   chooz
// @author      chooz
// @version     1.1.201309
// @updateURL   http://userscripts.org/scripts/source/177490.user.js
// @include     http://wiki.intra.arkea.com:8080/*
// ==/UserScript==

var sURL = window.location.toString();

var sURLclean = unescape(sURL);

if (sURL.match(/%E9/)) {
	window.location = sURLclean;
}
