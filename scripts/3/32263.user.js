// ==UserScript==
// @name           block mark nolan
// @namespace      http://www.andydremeaux.com
// @include        http://www.ratebeer.com/forums/*
// @exclude        http://www.ratebeer.com/Forums/Forum-*.htm
// @exclude        http://*ratebeer.com/Forums/forum.asp*
// ==/UserScript==


var allSpans, thisSpan;
allSpans = document.evaluate(
    "//a[@href='/View-User-37204.htm']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisSpan = allSpans.snapshotItem(i);  	thisSpan.parentNode.parentNode.parentNode.parentNode.removeChild(thisSpan.parentNode.parentNode.parentNode);
}