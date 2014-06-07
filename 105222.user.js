// ==UserScript==
// @name           Hipster High Priest
// @namespace      http://userscripts.org
// @description    Corrects the name of the true Hipster High Priest
// @include        *
// ==/UserScript==
textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('Reeves Watt','gi');
var replace = 'Hipster High Priest';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}