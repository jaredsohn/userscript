// ==UserScript==
// @name           Torrentleech Release Filter
// @description    Hide any type of release from Torrentleech
// @include        http://torrentleech.org*
// @include        http://www.torrentleech.org*
// ==/UserScript==

var filter = new Array("GERMAN", "German", "DUBBED", "HebSub");

var allLinks = document.evaluate('//a[@href]', document, null,
               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	var thisLink = allLinks.snapshotItem(i);
	for (var k = 0; k < filter.length; k++) {
		if (thisLink.text.search(filter[k]) >= 0) {
			var row = thisLink.parentNode.parentNode;
			row.parentNode.deleteRow(row.sectionRowIndex);
			break;
		}
	}
}