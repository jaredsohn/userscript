//
// icosahedral hat gmail spot com
//
// ==UserScript==
// @name          CaretFilter
// @description	  Gets rid of caret wikipedia links with arbitrary text
// @include       http://metafilter.com/*
// @include       http://www.metafilter.com/*
// ==/UserScript==
//
// Edit the txt variable to your taste.


var txt = " [I HAVE NO SOUL]";
var Links = document.getElementsByTagName("a");

for(i=0; i<Links.length; i++) {
  if (Links[i].firstChild.nodeValue == '^') {
		Links[i].firstChild.nodeValue = txt;
 	}
}
