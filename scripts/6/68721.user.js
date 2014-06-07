// ==UserScript==
// @name   Stop the stupid
// @namespace  http://www.weshouldbedancing.com/
// @description HC is a fucking idiot
// @include  http://www.fluther.com/*
// ==/UserScript==
textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('Fact from fiction, truth from diction.','gi');
var replace = 'I might be stupid.';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}
