// ==UserScript==
// @name                True Portalbear
// @namespace	        http://ruirize.co.uk/
// @description	        Makes a portal bear.
// @include		http://www.portalbear.com/*
// ==/UserScript==

var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('^http://www.portalbear.com/PublishingImages/bear_large.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i.imgur.com/ezEgO.png?whyyy';
	}
}