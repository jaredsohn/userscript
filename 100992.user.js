// ==UserScript==
// @name 		Google Search Last Year
// @namespace 		http://inkmuttinteractive.com
// @description 	Shows search for last year
// @include        	http://www.google.*/search?*
// ==/UserScript==
if(document.URL.search("&tbo=") == -1) {
window.location.search += "&tbo=1";

if(document.URL.search("&tbs=") == -1) {
window.location.search += "&tbs=qdr:y";
}
}