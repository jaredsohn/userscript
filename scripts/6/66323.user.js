// ==UserScript==
// @name           TimeNoSee
// @namespace      http://www.google.com/profiles/jhenri
// @description    Removes the '(See some other stupid thing)' links from Time.com
// @include        http://www.time.com/*
// @include        http://time.com/*
// ==/UserScript==

var allSpans, thisSpan;
allSpans = document.evaluate(
    "//span[@class='see']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisSpan = allSpans.snapshotItem(i);
    thisSpan.parentNode.removeChild(thisSpan);
}