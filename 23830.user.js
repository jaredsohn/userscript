// ==UserScript==
// @name                Clean País
// @namespace           http://the-geek.org
// @description         Remove banner ad at the top of elpais.com
// @include             http://www.elpais.com/*
// @include             http://elpais.com/*
// ==/UserScript==

var divs, thisDiv;
divs = document.evaluate(
    "//div[@class='banner_top']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < divs.snapshotLength; i++) {
    thisDiv = divs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}