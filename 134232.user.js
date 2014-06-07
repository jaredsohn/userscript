// ==UserScript==
// @name       Ultimate Guitar hide background ad
// @version    0.1
// @description  enter something useful
// @match      http://ultimate-guitar.com/*
// @match      http://www.ultimate-guitar.com/*
// @copyright  Aviem Zur
// ==/UserScript==

var allAds = document.evaluate(
    "//a[@class='img1' or @class='img2']",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allAds.snapshotLength; i++) {
	var ad = allAds.snapshotItem(i);
    ad.parentNode.removeChild(ad);
}