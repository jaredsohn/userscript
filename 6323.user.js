// ==UserScript==
// @name           Non-tracking Google News links
// @namespace      http://news.google.com/
// @description    Rewrites Google News links to go directly to the news story without being redirected and tracked by Google (for privacy and performance reasons).
// @include        http://news.google.com/*
// @include        https://news.google.com/*
// ==/UserScript==

var links = get("//a[@href]");

for(var i=0; i<links.snapshotLength; i++) {
  var a = links.snapshotItem(i);
  a.setAttribute('onclick', 'location.href='+a.href+'; return false;');
  a.setAttribute('onmousedown', 'return false;');
}

function get(query) {
  return document.evaluate(
    query,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
}
