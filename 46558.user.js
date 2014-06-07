// ==UserScript==
// @name           Photoethnography - Remove eBay Usage Warning
// @namespace      http://userscripts.org/users/40332
// @description    Remove the warning about using the copyrighted text on eBay listings. This script is intended for those that are not planning on doing anything of the sort but would prefer to not have to read a warning which should not be required repeatedly.
// @include        http://www.photoethnography.com/*
// ==/UserScript==
var str = "Using the text or images on this website without permission on an ebay auction or any other site is a violation of federal law.";

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i);
    node.data = node.data.replace(str, ''); 
}