// ==UserScript==
// @name           Ikariam Ar Board Panchin Image Remover
// @namespace      vryko.ikariam
// @description    remove panchin image from argentine board
// @include        http://board.ar.ikariam.com/*
// @version        0.1 
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
	var srcMatch = src.match('^http://img96.imageshack.us/img96/9168/panchin3.png');
	if (srcMatch != null) {
  thisImg.src = '';
	}
}
