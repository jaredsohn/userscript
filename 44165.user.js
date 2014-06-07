// ==UserScript==
// @name          Twitter replies-search 3
// @namespace     http://twitter.com/robotwisdom/
// @description   For each tweet with an embedded @-link, adds a link to search.twitter.com to find replies to the mentioned user
// @include       http://twitter.com/*
// @license     Creative Commons Attribution License
// @version     0.1
// ==/UserScript==

var allSpans, thisSpan;
var myRegExp = /@<a href="\/([A-Za-z0-9]+)/;

allSpans = document.evaluate(
    "//span[@class='entry-content']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisSpan = allSpans.snapshotItem(i);
    thisSpan.innerHTML = thisSpan.innerHTML.replace(myRegExp, '<a href="http://search.twitter.com/search?q=%40' + myRegExp.$1 + '">@<a href="/' + myRegExp.$1);
}

