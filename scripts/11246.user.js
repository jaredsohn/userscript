// ==UserScript==
// @name           mbl_Remove_Blog
// @namespace      haffi.fylleri.is
// @description    Delete the blogbox on mbl.is news articles
// @include http://mbl.is/*
// @include http://*.mbl.is/*
// ==/UserScript==
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='newsblog']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}
