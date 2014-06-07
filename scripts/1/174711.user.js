// ==UserScript==
// @name           Craigslist Focuser
// @author         Carlton Kenney
// @namespace      none
// @description    Focusses on the Craigslist search box, plain and simple.
// @copyright      2013 by Carlton Kenney
// @version        0.1b
// @lastupdated    7/31/2013
// @include        *.craigslist.org*
// ==/UserScript==

if(document.getElementById('query')) {
	var query = document.getElementById('query');
	var value = query.value;
	query.focus();
	query.value = "";
	query.value = value;
}

