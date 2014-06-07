// ==UserScript==
// @name   Deincentivize 
// @namespace  http://www.example.com/~juliet/
// @description Replace "incentivize" on corporate homepage
// @include  file:///*
// ==/UserScript==
textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('incentivize','gi');
var replace = 'pling';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);