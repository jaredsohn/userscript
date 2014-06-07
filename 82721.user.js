// ==UserScript==
// @name           Boston Globe full page view
// @namespace      bostonGlobeFullPage
// @description    Loads all Boston.com stories in full page view
// @author         Manish Vij (based almost entirely on code by Paul Venuti)
// @include        *boston.com*
// ==/UserScript==

var url = window.location.href;

if ( (url.indexOf("articles") != -1) && (url.indexOf("?page=full") == -1) )
		window.location.href += "?page=full";

var all, element;

// Grab all the anchors

all = document.getElementsByTagName('a');

// Append print friendly query string to URL

for (i=0; i < all.length; i++) {

	element = all[i];
	
	if (element.href.indexOf("articles") != -1)
		element.href += "?page=full";
}