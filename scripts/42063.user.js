// ==UserScript==
// @name           Twitter Hashtags for Tagalus
// @namespace      http://tagal.us
// @description    Links Hashtags on Twitter to definitions on Tagalus
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var e, t;

e = document.evaluate(
    "//*[@class='entry-content']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var x = 0; x < e.snapshotLength; x++) { t = e.snapshotItem(x);
    t.innerHTML = t.innerHTML.replace(/#([^ ]+)/g, '#<a href="http://tagal.us/tag/$1" title="$1" target="_blank">$1</a>');
}