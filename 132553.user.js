// ==UserScript== 
// @name vchan Direct Image 
// @namespace dmitryn
// @include *vchan.org*
// @exclude *vchan.org/*/src/*
// ==/UserScript==
var lianks = document.evaluate( 
"//a[contains(@href, '.gs/url/')]", 
document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null); 

for (var i = 0; i < lianks.snapshotLength; i++) { 
var link = lianks.snapshotItem(i); 
link.href = link.href.substring(27);
}