// ==UserScript==
// @name          Google safari5.bvdep.com remover
// @namespace     http://www.google.com
// @description	  Removes results for any "safari5.bvdep.com" page from google.
// @include       http://www.google.com/search*
// @include       http://www.google.co.uk/search*
// ==/UserScript==

// Hacked from Roop's "Google experts-exchange.com remover"
//   http://userscripts.org/scripts/show/1898
// Which was hacked from arantius' "Google about.com remover"
//   http://www.arantius.com/misc/greasemonkey/



var results=document.evaluate('//a[contains(@href, "safari5.bvdep.com/")]/..', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var result=null, i=0; result=results.snapshotItem(i); i++) {
	result.style.display='none';
}
