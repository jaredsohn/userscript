// Reddit Thread Lines
// version 0.1
// 2009-07-07
//
// --------------------------------------------------------------------
// Nothing to complicated here... Just draws left border on reddit
// comments for easier reading.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          reddit Lines On Threads
// @namespace     http://www.reddit.com
// @description   Draw left border on child comments for easier reading
// @include       http://www.reddit.com/*/comments/*
// ==/UserScript==

var allDivs, thisDiv;
childDivs = document.evaluate("//div[@class='child']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < childDivs.snapshotLength; i++) {
    thisDiv = childDivs.snapshotItem(i);
    thisDiv.style.borderLeft = '1px solid #CCCCCC';
}