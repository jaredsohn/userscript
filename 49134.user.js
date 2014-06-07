// ==UserScript==
// @name 		Google Always Show Search Options
// @namespace 		http://twitter.com/digideth
// @description 	This script enables you to add '&tbo=1' to a URL of google's search result automatically
// @include        	http://www.google.*/search?*
// ==/UserScript==
if(document.URL.search("&tbo=") == -1)
{
	window.location.search += "&tbo=1";
}