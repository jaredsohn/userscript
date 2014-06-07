// ==UserScript==
// @name           BvS FIGHTO Hider
// @namespace      BvS
// @description    Hide FIGHTO tournaments when you already have the part or when you lack Kaiju status.
// @include        http://*animecubed.com/billy/bvs/villagerobofightowide*
// ==/UserScript==

(function() {
	var tourneyTable = document.evaluate("//table[@class='robotourney']/tbody/tr/td[8]", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	// Check td[8] of all table rows
	var td;
	for (var i = 0; td = tourneyTable.snapshotItem(i); i++)
		if (/have part/i.test(td.innerHTML) || /not kaiju/i.test(td.innerHTML))
			td.parentNode.parentNode.removeChild(td.parentNode);
}());
