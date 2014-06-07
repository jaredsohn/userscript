/*
Google on Blingo or PCH
version 2.0
Adding a google search link to the top of Blingo or PCH search pages
Because sometimes you just want Google instead

If you haven't joined up yet, here's my invite link:
http://www.blingo.com/friends?ref=Y8PCYdrYUZkXWMuR4JQ1%2F9idgpo

*/
// ==UserScript==
// @name          Google on Blingo or PCH
// @namespace     http://userscripts.org/users/674;scripts
// @description	  Adds a Google link to Blingo's Search page
// @include       http://www.blingo.com/search*
// @include       http://search.pch.com/search*
// ==/UserScript==

var res = document.location.search.match(/(\?|&)q=([^&]+)/);
if (res.length == 3)
{
	var bl = document.createElement('a');
	bl.href = 'http://www.google.com/search?q=' + res[2];
	bl.innerHTML = 'Google';

	var x = document.evaluate(
		"//div[@class='searchSelector']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
	if (x.snapshotLength > 0){
		var t = x.snapshotItem(0);
		t.appendChild(document.createTextNode(' \u00a0'));
		t.appendChild(bl);
	}
}





