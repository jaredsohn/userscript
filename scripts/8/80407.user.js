// ==UserScript==
// @name           Xbox-Scene Header Link Fixer
// @namespace      http://xs.seanharlow.info
// @description    Replaces full header link to PS3Scene on Xbox-Scene with a link back to the homepage like most expect.
// @include        http://www.xbox-scene.com/*
// ==/UserScript==
var links = document.evaluate("//a[contains(@href, 'ps3scene')]", document, null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i=0; i < links.snapshotLength; i++) 
{ 
  var thisLink = links.snapshotItem(i); 
  thisLink.href = 'http://www.xbox-scene.com'; 
}