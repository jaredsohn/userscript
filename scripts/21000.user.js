// ==UserScript==
// @name           news.com.au ad remover
// @namespace      http://pjf.id.au/
// @description    Remove text-only ads from news.com.au that aren't blocked by AdBlock plus
// @include        http://www.news.com.au/*
// ==/UserScript==

// AdBlock Plus is great, and gets rid of most of the ads on news.com.au.
// However there are still some bothersome text-only ads on the site.
// This simple script finds and removes them.

// Paul Fenwick <pjf@cpan.org>
// January 2008
// Version 1.00

var unloved = getElementsByClass("network sponsors",null,null);

for (i = 0; i < unloved.length; i++) {
	unloved[i].parentNode.removeChild(unloved[i]);
}

// getElementByClass by Dustin Diaz
// http://www.dustindiaz.com/getelementbyclass/

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

