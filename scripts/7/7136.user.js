// ==UserScript==
// @name           PVR Cinemas: Remove blank spacer images
// @namespace      http://www.pvrcinemas.com/*
// @description    Removes annoying blank spacer images from PVR Cinemas' search results
// @include        http://www.pvrcinemas.com/*
// ==/UserScript==

var spacers = document.evaluate('//img[@src="../images/spacer_trans.gif"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < spacers.snapshotLength; i++) {
  var thisSpacer = spacers.snapshotItem(i);
  thisSpacer.style.visibility = 'hidden';
}
