// ==UserScript==
// @name          UseMyPorn.com Direct Link to Images
// @namespace     Hacked from http://www.devdive.com/
// @description   Replace links on UseMyPorn.com to point directly to images instead of HTML pages that show images and ads.
// @include       http://usemyporn.com/*
// @include       http://www.usemyporn.com/*
// ==/UserScript==

var links, a;
links = document.evaluate(
    "//a[contains(@href, '=/galleries')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);	
	a.href = a.href.replace(/.com\/.*\/galleries/,".com/galleries");
}
