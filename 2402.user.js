// ==UserScript==
// @name          	Remove Crawl - Washington Times
// @description   	Remove Crawl from Washington Times pages
// @include	 		http://washingtontimes.com/*
// ==/UserScript==
	
var allElements, thisElement;
allElements = document.getElementsByTagName('marquee');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    thisElement.parentNode.removeChild(thisElement);
}