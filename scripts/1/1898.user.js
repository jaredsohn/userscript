// ==UserScript==
// @name          Google experts-exchange.com remover
// @namespace     http://www.google.com
// @description	  Removes results for any "experts-exchange.com" page from google.
// @include       http://www.google.com/search*
// @include       http://www.google.co.uk/search*
// ==/UserScript==

// Hacked from arantius' "Google about.com remover"
//   http://www.arantius.com/misc/greasemonkey/

var results=document.evaluate('//a[contains(@href, "experts-exchange.com/")]/..', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var result=null, i=0; result=results.snapshotItem(i); i++) {
	result.style.display='none';
}