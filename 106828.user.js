// ==UserScript==

// @name Rules Update

// @description adds an updated rule list

// @include http://*playstarfleet*/info/rules*

// ==/UserScript==

textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('Pushing','gi');
var replace = 'pling';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);