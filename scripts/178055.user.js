// ==UserScript==
// @name        Reddit - "remove from saved" abridged
// @namespace   http://www.reddit.com/*
// @description replaces "delete from saved" with something less conspicuous "-save"
// @include     http://www.reddit.com/*
// @version     1.1
// ==/UserScript==

(function() {
var replacements, regex, key, textnodes, node, s;
textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
node = textnodes.snapshotItem(i);
if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
{

s = node.data;

s = s.replace( /\bdelete from saved\b/g, "-save");
node.data = s;

}} })();