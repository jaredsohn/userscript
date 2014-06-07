// ==UserScript==
// @name          Google about.com remover
// @namespace     http://www.arantius.com/misc/greasemonkey/
// @description	  Removes results for any "about.com" page from google.
// @include       http://www.google.com/search*
// ==/UserScript==

//
// Inspired by Tyler Karaszewski's script
//  ( http://tylerkaraszewski.com/gmscripts/googleabout )
//
// Written because I wanted to learn some more XPath and because 
// it's only 5 lines long!  (Or two without wrapping and braces.)
//

var results=document.evaluate('//a[contains(@href, "about.com/")]/..', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var result=null, i=0; result=results.snapshotItem(i); i++) {
	result.style.display='none';
}
