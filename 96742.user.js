// ==UserScript==
// @name           Make Orders Received a master screen
// @namespace      bricklink
// @description    Opens linked pages (invoice, msg, feedback, etc) in new tabs
// @icon           http://www.sculpturesupplies.com.au/GMBL.png
// @version        1.1
// @grant          none
// @include        http://www.bricklink.com/orderReceived.asp*
// @match          http://www.bricklink.com/orderReceived.asp*
// ==/UserScript==

//fetch each Anchor which has one image as a child
var snapLinkedImages = document.evaluate("//a[count(IMG)=1]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapLinkedImages.snapshotLength - 1; i >= 0; i--) {
	var img = snapLinkedImages.snapshotItem(i);
	img.target="_blank";
}

var detailLinks = document.evaluate("//a",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = detailLinks.snapshotLength - 1; i >= 0; i--) {
	var thisAnchor = detailLinks .snapshotItem(i);
	if ((thisAnchor.href.indexOf('orderDetail.asp')!=-1) ||	
	  (thisAnchor.href.indexOf('feedbackPost.asp')!=-1))
	{
	  thisAnchor.target="_blank";
        }
}
