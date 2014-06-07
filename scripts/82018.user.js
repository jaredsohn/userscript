// ==UserScript==
// @name           Dragon Cave View links for AP
// @namespace      http://www.jenneth.com/greasemonkey/dragoncave/viewlinksforap
// @description    Adds a "View" link to all eggs on the abandoned page
// @include        http://dragcave.net/abandoned
// ==/UserScript==

var eggLinkSnapshot = document.evaluate("//a[contains(@href,'abandoned')]",
	document.getElementById("middle"), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i<eggLinkSnapshot.snapshotLength; i++) {
	var viewLink = document.createElement('a');
	viewLink.href = eggLinkSnapshot.snapshotItem(i).href.replace(/abandoned/,'view');
	viewLink.appendChild(document.createTextNode("View"));
	eggLinkSnapshot.snapshotItem(i).parentNode.appendChild(document.createElement('br'));
	eggLinkSnapshot.snapshotItem(i).parentNode.appendChild(viewLink);
}
