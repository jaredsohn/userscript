// ==UserScript==
// @name           filestube - direct link to sources
// @namespace      ak
// @include        http://www.filestube.com/*
// ==/UserScript==

var xpathResult = document.evaluate('//span[starts-with(., "http://")]',
  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < xpathResult.snapshotLength; i++) {
  var span = xpathResult.snapshotItem(i);
  span.innerHTML = "<a href=\"" + span.textContent + "\">" + span.textContent + "</a>"
}