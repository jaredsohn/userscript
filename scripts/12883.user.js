// ==UserScript==
// @name           ongmap logo rm
// @version        1
// @namespace      ongmap.com
// @description    removes logos from ongmap.com
// @include        http://ongmap.com/*
// @author         Jim M
// ==/UserScript==

window.addEventListener("load", function(e) {

// ongmap map logo
var nodesSnapshot = document.evaluate('//*[@id="logo"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {
  nodesSnapshot.snapshotItem(i).parentNode.removeChild(nodesSnapshot.snapshotItem(i));
}

// google print map logo
var nodesSnapshot = document.evaluate('/html/body/div[35]/div[2]/div/div/div/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {
  nodesSnapshot.snapshotItem(i).parentNode.removeChild(nodesSnapshot.snapshotItem(i));
}

}, true);
