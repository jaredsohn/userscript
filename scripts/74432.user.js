// ==UserScript==
// @name           Inline Search Cleaner
// @namespace      inline_cleaner__74432
// @description    Remove in-line search links for better browsing
// @version        0.1
// @include        http://news.yahoo.com/*
// @require        http://usocheckup.dune.net/74432.js
// ==/UserScript==


var span_nodes = document.evaluate('.//span[@class="yshortcuts"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < span_nodes.snapshotLength; i++) {
     span_nodes.snapshotItem(i).setAttribute('style','');
     span_nodes.snapshotItem(i).setAttribute('id', '');
}