// ==UserScript==
// @name           Wikipedia Site Notice "Personal Appeal" Remover
// @namespace      http://www.ericg.us
// @description    Remove 'please read: a personal appeal...' notice bar on Wikipedia
// @include        http://en.wikipedia.org/*
// ==/UserScript==

// helper functions
function xpath(query) {
    return document.evaluate(query,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

ads = xpath('//*[@id="siteNotice"]');
for (var i = 0;i < ads.snapshotLength;i++) {
	ad = ads.snapshotItem(i);
	ad.parentNode.removeChild(ad);
}