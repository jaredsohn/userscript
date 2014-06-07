// ==UserScript==
// @name           Twitter Hashtags
// @namespace      http://www.chimeric.de
// @description    Auto-Links Twitter Hashtags
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var entries, entry;

entries = document.evaluate(
    "//*[@class='entry-content']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i = 0; i < entries.snapshotLength; i++) {
    entry = entries.snapshotItem(i);
    entry.innerHTML = entry.innerHTML.replace(/#([^ ]+)/g, '<a href="http://hashtags.org/tag/$1" title="$1" target="_blank">#$1</a>');
}
