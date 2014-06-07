// ==UserScript==
// @name           Styrotalk
// @namespace      asb mod
// @description    replaces Starostyak" with "Styrotalk"
// @include        http://www.austriansoccerboard.at/*
// ==/UserScript==
textNodes = document.evaluate(
                              "//text()",
                              document,
                              null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                              null);
var searchRE = new RegExp('tarostyak','gi');
var replace = 'tyrotalk';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}