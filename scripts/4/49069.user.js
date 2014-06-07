// ==UserScript==
// @name           taghdeffer
// @namespace      http://haakonnilsen.com
// @include        http://twitter.com/*
// ==/UserScript==

var tweets = document.evaluate("//a[contains(@class, 'hashtag')]",
                               document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < tweets.snapshotLength; i++) {
    var item = tweets.snapshotItem(i);
    var tag = item.innerHTML.substring(1);
    item.href = "http://tagdef.com/" + tag;
}
