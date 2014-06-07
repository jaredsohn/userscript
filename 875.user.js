// ==UserScript==
// @name        No ABS newwins
// @namespace   http://ttdi.us/greasemonkey/
// @description Stops new windows from popping up from links on Albino Blacksheep.
// @include     http://www.albinoblacksheep.com*
// @include     http://albinoblacksheep.com*
// ==/UserScript==
// GPL  NO WARRANTY  Don't sue  etc. etc.

(function() {
	var allLinks = document.getElementsByTagName('a') ;
	for ( var index in allLinks ) {
		thisLink = allLinks[index] ;
		thisLink.removeAttribute('target') ;
		thisLink.removeAttribute('onclick') ;
	}
})();