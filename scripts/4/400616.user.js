// ==UserScript==
// @name		Wok Up and Smell the Coffee
// @description Replaces the Facepunch useful rating.
// @match		http://facepunch.com/*
// @match		http://www.facepunch.com/*
// @version		1
// @grant		none
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
	var srcMatch = src.match('http://www.facepunch.com/fp/ratings/wrench.png');
	if (srcMatch != null) {
  thisImg.src = 'http://i.imgur.com/1KIeovd.png';
	}
}