// ==UserScript==
// @name           BasilMarket Tweak - Remove Link Protector
// @namespace      http://www.w3.org/1999/xhtml
// @description    Removes the link protection from BasilMarket links
// @include        http://www.basilmarket.com/*
// ==/UserScript==

function getElementsByClass(searchClass) {
	var classElements = new Array();
	var els = document.getElementsByTagName('*');
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var links = getElementsByClass('link');
var linkProtector = "http://www.basilmarket.com/bye.php?u=";

for(i=0; i<links.length; i++)
	{
		link = links[i].href;
		if (link.indexOf(linkProtector) != -1)
			links[i].href = "http://" + link.split('u=')[1];
	}