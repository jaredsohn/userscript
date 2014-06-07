// ==UserScript==
// @name   Stop the stupid (2012 edition)
// @namespace  http://www.weshouldbedancing.com/
// @description Shut the fuck up about 2012
// @include  http://www.fluther.com/*
// ==/UserScript==
textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('2012','gi');
var replace = 'STFU';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}