// ==UserScript==
// @name		Fusker Cleaner
// @description	Fix alt tags for viewing fusker sites in firefox
// @include	http://*special=preview*
// @exclude	http://*lid=*
// ==/UserScript==

var allImgs, thisImg, i;
	
allImgs = document.evaluate('//img[@alt!=""]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < allImgs.snapshotLength; i++) {
    thisImg = allImgs.snapshotItem(i);
    altImage = document.createElement('img');
	altImage.width=thisImg.width;
	altImage.src=thisImg.src;
	altImage.alt="Unavailable";
    thisImg.parentNode.replaceChild(altImage, thisImg);

}