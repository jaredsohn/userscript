// ==UserScript==
// @name           replace FYROM
// @namespace      erep
// @description    Rangers
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @include        http://static.erepublik.com/*
// ==/UserScript==

textNodes = document.evaluate(
"//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var searchRE = new RegExp("Republic of Macedonia \\(FYROM\\)",'gi');
var replace = 'Македонија';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}

