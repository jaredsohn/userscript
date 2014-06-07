// ==UserScript==
// @name           Blenderartists: Add replies/views
// @description    Makes post replies and views visible.
// @include        http://blenderartists.org/forum/*
// ==/UserScript==

var allTds, thisTd, newElement;

allTds = document.evaluate(
    "//td[@class='alt2' and @title]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allTds.snapshotLength; i++) {
    thisTd = allTds.snapshotItem(i);
	newElement = document.createElement('td');
	newElement.style.whiteSpace = 'nowrap';
	newElement.className = 'smallfont';
	newElement.appendChild(document.createTextNode(thisTd.title));
	thisTd.parentNode.insertBefore(newElement, thisTd);
}