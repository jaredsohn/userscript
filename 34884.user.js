// ==UserScript==
// @name           MITVideoLinker
// @namespace      MIT
// @description    Corrects rm video links to be able to download videos in the MIT OCW site
// @include        http://ocw.mit.edu/*
// ==/UserScript==

var elements = document.evaluate("//a[contains(@href, '.rm')]",
								document,
								null,
								XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
								null);

for(var i=0; i < elements.snapshotLength; i++) {
	elements.snapshotItem(i).href = elements.snapshotItem(i).toString().replace('http://mfile.akamai.com/7870/rm/mitstorage.download.akamai.com/', 'http://ocw.mit.edu/ans');
}