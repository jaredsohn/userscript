// ==UserScript==
// @name           Grooveshark Ad Remover
// @namespace      http://technoblogia.net
// @description    Removes all ads from Grooveshark player and maximizes the main panel
// @require	   https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include        http://grooveshark.com*
// ==/UserScript==

// Dec 1st:
// - Code for resizing main content div removed.
// - Add an interval which constantly removes adds from page.

$(document).ready(function() {
	window.setInterval('$("div#capital, div[id*=\'artistCapitalWrapper\'], div#theme_page_header").remove()', 3000);
});