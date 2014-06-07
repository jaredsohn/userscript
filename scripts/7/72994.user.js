// ==UserScript==
// @name           No new tabs
// @namespace      http://google.com
// @description    Stops websites from telling you that you want a link to open in a new window
// @include        *
// ==/UserScript==

var links = document.evaluate('//a[@target="_blank"]',
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var len = links.snapshotLength;

for (var i=0; i<len; i++)
    links.snapshotItem(i).target = "";
