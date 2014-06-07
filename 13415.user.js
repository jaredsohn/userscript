// ==UserScript==
// @name           Clean Codex
// @namespace      http://www.bluecannonball.com/
// @description    On RPG Codex, this reduces the junk in the forum header.
// @include        *rpgcodex.net/*
// ==/UserScript==

/*
Script by Jack Skellington.
Authored on 2007-10-13.
Updated on 2008-09-28.
Version: 1.0.1
*/

var allTables, thisTable;
allTables = document.evaluate(
	"//table[@width='95%']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);
for (var i = 0; i < allTables.snapshotLength; i++) {
	thisTable = allTables.snapshotItem(i);
	killSiblings = 1;
	loopCheck = 0;
	while (killSiblings) {
		loopCheck++;
		if (loopCheck > 100) {
			killSiblings = 0;
		}
		if (thisTable.previousSibling) {
			if (thisTable.previousSibling.attributes) {
				for (var x = 0; x < thisTable.previousSibling.attributes.length; x++) {
					if (thisTable.previousSibling.attributes[x].nodeName.toLowerCase() == 'background') {
						if ((thisTable.previousSibling.attributes[x].nodeValue == '/image/navigation/headerbg.gif') || (thisTable.previousSibling.attributes[x].nodeValue == '/images/header-line.jpg')) {
							killSiblings = 0;
						}
					}
					else if (thisTable.previousSibling.attributes[x].nodeName.toLowerCase() == 'id') {
						if ((thisTable.previousSibling.attributes[x].nodeValue == 'n1') || (thisTable.previousSibling.attributes[x].nodeValue == 'n2')) {
							killSiblings = 0;
						}
					}
				}
			}
		}
		else {
			killSiblings = 0;
		}
		if (killSiblings) {
			thisTable.parentNode.removeChild(thisTable.previousSibling);
		}
	}
}
