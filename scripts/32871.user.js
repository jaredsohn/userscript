// ==UserScript==
// @name           FiledicPlus
// @namespace      FiledicPlus
// @description    Show the clubbox name on the each files from the search result in filedic.com
// @include        http://filedic.com/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink

	if (thisLink && thisLink.href.match(/cluburl/i)) {
		var logo = document.createElement("font");
		logo.color="blue";
		cluburl = thisLink.href.match(/cluburl=(.*)/i);
		logo.innerHTML = ' {{' + cluburl[1] + '}} ';
		thisLink.parentNode.insertBefore(logo, thisLink.nextSibling);

	}
}