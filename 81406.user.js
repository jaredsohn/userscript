// ==UserScript==
// @name          Cosplayer's Cure Photo Downloader
// @namespace     http://k900.ath.cx/
// @description   Adds a download link to photos on en.curecos.com
// @include       http://en.curecos.com/picture/detail?id=*
// @match       http://en.curecos.com/picture/detail?id=*
// ==/UserScript==
function XPathQuery(query)
{
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var allImgs, thisImg;
allImgs = XPathQuery("//img[@class='detail-img']");
if (allImgs.snapshotLength > 0)
{
	for (var i = 0; i < allImgs.snapshotLength; i++) {
		thisImg = allImgs.snapshotItem(i);
		newElement = document.createElement('a');
		newElement.href = thisImg.src;
		newElement.innerHTML = 'Download this image';
		descrDiv = XPathQuery("//div[@class='description']").snapshotItem(0);
		descrDiv.insertBefore(newElement, null);
	}
}