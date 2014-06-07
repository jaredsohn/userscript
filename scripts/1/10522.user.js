// ==UserScript==
// @name           Forced Anon for 4chan
// @namespace      http://img.4chan.org/b/imgboard.html
// @include        http://*.4chan.org/*
// @description    Changes all names to "Anonymous" in 4chan
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//span[@class="commentpostername"] | //span[@class="postername"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.innerHTML = "Anonymous";
}

allLinks = document.evaluate(
    '//span[@class="commentpostertrip"] | //span[@class="postertrip"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.innerHTML = "";
}
