// ==UserScript==
// @name	deviantART full view
// @namespace   http://orinx.merseine.nu/
// @description Always go straight to the full view for deviations
// @include	http://*.deviantart.com/*
// ==/UserScript==

var nodes = window.document.evaluate("//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var links = new Array( nodes.snapshotLength );

for (var i=0; i<links.length; i++) {
	links[i] = nodes.snapshotItem(i);
}

for (var i=0; i<links.length; i++) {
	var link = links[i];
	var ss1 = link.href.substring(0,36);
	if (ss1=='http://www.deviantart.com/deviation/') {
		link.href = 'http://www.deviantart.com/view/' + link.href.substring(36);
	}
}
