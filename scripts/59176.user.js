// ==UserScript==
// @name           SA photos.cx fixer
// @namespace      neito
// @description    Replaces "http://j.photos.cx" with "http://j.photos.cx:8080/" to fix Photos.cx links that don't work anymore. Only triggers on SA.
// @include        http://forums.somethingawful.com/*
// ==/UserScript==

textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('http://j.photos.cx/','gi');
var replace = 'http://j.photos.cx:8080/';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}