// ==UserScript==
// @name         Trueblood
// @namespace    Brandyn
// @description	  Trueblood
// @include       *.watchtruebloodseries.com/*
// ==/UserScript==
//

var domainnames = ['www.watchtruebloodseries.com/ad.html?oldURL=','dl.php/Bleach/anime/bp-mkv/'];
var ipaddresses = ['',''];	

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	for (var j = 0; j < domainnames.length; j++) {
		if (thisLink.href.match(domainnames[j])) {
			thisLink.href = thisLink.href.replace(domainnames[j], ipaddresses[j]);
		}
	}
}