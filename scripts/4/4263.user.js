// ==UserScript==
// @name          UseMyComputer.com Direct Link to Images
// @namespace     http://www.devdive.com/
// @description   Replace links on UseMyComputer.com to point directly to images instead of HTML pages that show images and ads.
// @include       http://usemycomputer.com/*
// @include       http://www.usemycomputer.com/*
// ==/UserScript==

var links, a;
links = document.evaluate(
    "//a[contains(@href, '=/indeximages')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);	
	a.href = a.href.replace(/.com\/.*\/indeximages/,".com/indeximages");
}