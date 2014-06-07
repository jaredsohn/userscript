// ==UserScript==
// @name           Citibank NA Direct Statements
// @namespace      tag:nphs,2009-01-03:citi
// @description    Removes the JavaScript wrapper from statement links. Chain with the Firefox extension "Download them All" to quickly pull down all your statements.
// @include        https://online.citibank.com/*
// ==/UserScript==

// You can use the Download them All "Fast Filtering" to highlight just statements, e.g. try "dateClicked".
// This script also reformats date links to be YYYY-MM-DD so that you can use the renaming mask *text*.*ext* in
// Download them All, and get filenames that lend themselves to easy sorting.

var allLinks, thisLink;
allLinks = document.evaluate(
    "//a[@class='appLsLink']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	 thisLink.href = thisLink.href.replace(/javascript:dateClicked\('(.*)'\)/, "$1");
	 thisLink.innerHTML = thisLink.innerHTML.replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
}