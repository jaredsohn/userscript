// ==UserScript==
// @name           ILoveClassics.com Widener
// @namespace      http://www.iloveclassics.com
// @description    Widens ILoveClassics.com torrent browse listings.
// @include        http://*.iloveclassics.com/browse*
// @include        http://iloveclassics.com/browse*
// ==/UserScript==

GM_addStyle(' table.mainouter > td.outer > table.none + table > tbody > tr + tr > td + td {max-width:100% !important; width:100% !important;} table.mainouter > td.outer, table.mainouter {max-width:96% !important; width:auto !important;}');

var x, nodes = document.evaluate("//table[@class='mainouter']/tbody/tr/td[@class='outer']/table[2]/tbody/tr/td[2]/a/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (x=0;x<nodes.snapshotLength;x++) {
	nodes.snapshotItem(x).textContent = nodes.snapshotItem(x).parentNode.title;
}