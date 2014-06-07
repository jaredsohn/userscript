// ==UserScript==
// @name           schoolie-banner
// @namespace      http://www.soccer-hooligan.com
// @description    looneybanner
// @include        http://www.soccer-hooligan.com/*
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
	var srcMatch = src.match('^http://www.soccer-hooligan.com/images/misc/shbanner24yj.jpg');
	if (srcMatch != null) {
  thisImg.src = 'http://users.on.net/~djdesign/sh-banner-6.jpg';
	}
}

