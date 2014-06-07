// ==UserScript==
// @name           Academic PDF decoding v1.1
// @include        *
// ==/UserScript==

var lianks = document.evaluate( 
"//a[contains(@href, 'pdf+html')]", 
document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null); 
//this covers one type of journal website
for (var i = 0; i < lianks.snapshotLength; i++) { 
var link = lianks.snapshotItem(i); 
link.href = link.href.replace("pdf+html","pdf") 
}

var lianks1 = document.evaluate( 
"//a[contains(@href, 'reprint')]", 
document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null); 
//this covers the other
for (var i = 0; i < lianks1.snapshotLength; i++) { 
var link = lianks1.snapshotItem(i); 
link.href = link.href + '.pdf' 
}