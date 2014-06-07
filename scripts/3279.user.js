// ==UserScript==
// @name           Batch URL input
// @namespace      http://henrik.nyh.se
// @description    Input a series of URLs like http://www.example.com/1.html##http://www.example.com/2.html, separated by ##, into the address bar to open all those URLs in separate tabs. Intended to be used to simplify sharing groups of URLs through IM. Due to Greasemonkey limitations, the first URL must be a web page, as opposed to e.g. an image.
// @include        *##*
// ==/UserScript==

var urls = location.href.split("##");

location.hash = '';

for (var i = 1; i < urls.length; i++)
	GM_openInTab(urls[i]);
