// ==UserScript==
// @name           TOG [DONE]
// @namespace      http://www.theoldergamers.com/forum/members/basie.html
// @description    Greys out thread titles that lead with [DONE]
// @include        http://*.theoldergamers.com/forum/*
// ==/UserScript==

var threadTitles = document.evaluate(
    "//a[contains(@id,'thread_title') and starts-with(text(),'[DONE]')] | //a[contains(@id,'thread_title')]//span[starts-with(text(),'[DONE]')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var threadTitle;
for (var i = 0; i < threadTitles.snapshotLength; i++) {
    threadTitle = threadTitles.snapshotItem( i );

    threadTitle.style.color = 'grey';
    threadTitle.style.fontStyle = 'italic';
    threadTitle.style.fontSize = '0.8em';
}