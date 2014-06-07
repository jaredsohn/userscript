// ==UserScript==
// @name           LJ: Rehide Users' Notes
// @namespace      http://axisofevil.net/~xtina/
// @description    LJ, man, I swear.
// @include        http://*.livejournal.com/*
// ==/UserScript==

var allNotes = document.evaluate(
    '//span[@class="alias-value"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allNotes.snapshotLength; i++) {
	var theNode = allNotes.snapshotItem(i);
	var theNote = theNode.innerHTML.substr(2);
	theNode.previousSibling.setAttribute("title", theNote);
	theNode.previousSibling.setAttribute("alt", theNote);
	theNode.previousSibling.innerHTML += "*";
	theNode.parentNode.removeChild(theNode);
}
