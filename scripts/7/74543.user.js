// ==UserScript==
// @name          EventID.Net
// @include       http://www.eventid.net/*
// @include       http://eventid.net/*
// ==/UserScript==

var allmskblinks, thismskblink;
allmskblinks = document.evaluate(
    '//a[@href="/subscribersonly.asp?feature=marticle"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allmskblinks.snapshotLength; i++) {
    thismskblink = allmskblinks.snapshotItem(i);
    thismskblink.href = 'http://support.microsoft.com/kb/'+thismskblink.firstChild.nodeValue;
}