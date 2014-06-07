// I was always annoyed with the necessity to click on search box whenever I open craigslist

// ==UserScript==
// @name           Craigslist main page autofocus
// @namespace      http://kuzmeech.blogspot.com
// @include        http://*.craigslist.org/
// @include        http://*.craigslist.ca/
// @include        http://*.craigslist.co.uk/
// ==/UserScript==

var query = document.getElementById("query");
if (query) {
	query.focus();
}