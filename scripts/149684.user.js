// ==UserScript==
// @name          vcdq poster
// @namespace     Fhorst aka ANONYOUSTI
// @description   show poster thumb on releases of vcdq.com
// @include       http://www.vcdq.com/*
// ==/UserScript==


var allImgs = document.evaluate('//td[@id="posterField"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<allImgs.snapshotLength;i++) {

if (allImgs.snapshotItem(i).getElementsByTagName("a").item(0)!=null) {
 var thisImg = allImgs.snapshotItem(i).getElementsByTagName("a").item(0);
  var src = thisImg.href;
 if (src!= null)
 {
 	// create our link
	var poster = document.createElement('img');
	poster.height = 100;
    poster.width = 70;
	poster.src = src;
	thisImg.parentNode.insertBefore(poster, thisImg);
 }
 }
}
