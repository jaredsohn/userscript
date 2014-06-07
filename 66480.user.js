// ==UserScript==
// @name           Xing SearchPic Enlarger
// @namespace      zas-kar
// @description    Enlarges the Search Pics to Normal Size *185px x 140px*
// @include        https://www.xing.com/app/search?*
// @include        https://www.xing.com/app/contact?op=toconfirm*
// @include        https://www.xing.com/app/network?op=showmembers.search*
// @include        https://www.xing.com/app/contact?op=csvresult*
// @include        https://www.xing.com/events*
// @include        https://www.xing.com/expand_network*
// @exclude        https://www.xing.com/app/search?op=list;type=59
// ==/UserScript==


var allImgs, thisImg;
allImgs = document.evaluate(
    "//img[contains(@src,'users')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImgs.snapshotLength; i++) {
	thisImg = allImgs.snapshotItem(i);
	thisImg.src = thisImg.src.replace(/\_s(1|2|3)?(,(.)*)?\./, ".");


        // here you can change the size //

	thisImg.style.height="185px";
	thisImg.style.width="140px";
}