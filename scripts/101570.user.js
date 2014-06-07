// ==UserScript==
// @name           PrimeGrid Account Page
// @namespace      http://www.primegrid.com/show_user.php?userid=57266
// @description    Removes the randomness of the Free-DC image, to make it readable.
// @include        http://www.primegrid.com/home.php
// @version        1.0.0
// ==/UserScript==

textNodes = document.evaluate(  "//text()",  document,  null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
var yourID = textNodes.snapshotItem(139).data;

var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',  document,  null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);

for (var i=0;i<allImgs.snapshotLength;i++) {
	var thisImg = allImgs.snapshotItem(i);
	var src = thisImg.src;
	var srcMatch = src.match('^http://stats.free-dc.org/');
	if (srcMatch != null) {
		thisImg.src = 'http://stats.free-dc.org/pgridtag.php?id='+yourID.toString()+'&theme=1';
	}
}