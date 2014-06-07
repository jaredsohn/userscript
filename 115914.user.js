// ==UserScript==
// @name   Metacritic Emphasiser for IMDb 
// @namespace  
// @description Reworks the Metacritic Score on IMDb to be more prominent
// @include			http://www.imdb.com/*
// ==/UserScript==
textNodes = document.evaluate(
  "//text(Metascore)",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('incentivize','gi');
var replace = 'pling';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);