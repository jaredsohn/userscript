// ==UserScript==
// @name           Motherless Auto-Open Download Links
// @include        http://*motherless.com/*
// @description    On motherless.com this script will automatically open the download links for movies in new window
// @require   http://usocheckup.dune.net/67518.js?maxage=10
// @version		   0.1
// ==/UserScript==

// Release Notes
// 0.1
// -initial code
// End Release Notes

window.addEventListener("load",function() {
	var ss = document.evaluate('//a[contains(@href,"http://members.motherless.com/movies")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < ss.snapshotLength; i++) {
		var node = ss.snapshotItem(i);
		window.open(node.getAttribute('href'));
	}
}, false);
