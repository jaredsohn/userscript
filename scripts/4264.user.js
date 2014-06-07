// ==UserScript==
// @name          ComputerWorld Ad Remover
// @namespace     http://www.devdive.com/
// @description   Removes annoying ads from ComputerWorld sites.
// @include       http://*.computerworld.*/*
// ==/UserScript==

top_ad_space = document.evaluate(
    "//div[contains(@class, 'top-ad-space')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i=0;i<top_ad_space.snapshotLength;i++) {
	top_ad_space.snapshotItem(i).style.display="none";
}

left_ads = document.evaluate(
    "//div[contains(@style, 'padding-right: 4px;')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i=0;i<left_ads.snapshotLength;i++) {
	left_ads.snapshotItem(i).style.display="none";
}

img_ads = document.evaluate(
    "//img[contains(@src, '/ads/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i=0;i<img_ads.snapshotLength;i++) {
	img_ads.snapshotItem(i).style.display="none";
}

iframe_ads = document.evaluate(
    "//iframe[contains(@src, '/adserving/'|'/ad.')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i=0;i<iframe_ads.snapshotLength;i++) {
	iframe_ads.snapshotItem(i).parentNode.removeChild(iframe_ads.snapshotItem(i));
}

