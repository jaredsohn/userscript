// ==UserScript==
// @name          Remove experts-exchange.com from Google Search
// @namespace     http://www.google.com
// @description	  Removes results for any "experts-exchange.com" page from google.
// @include       http://*.google.*/search*
// @include       https://*.google.*/search*
// ==/UserScript==

// Taken from http://userscripts.org/scripts/show/1898
// with fix suggested by http://userscripts.org/topics/21889
// And originally hacked from arantius' "Google about.com remover"
//   http://www.arantius.com/misc/greasemonkey/

var results=document.evaluate('//a[contains(@href, "experts-exchange.com/")]/..', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var result=null, i=0; result=results.snapshotItem(i); i++) {
	result.parentNode.style.display='none';
}