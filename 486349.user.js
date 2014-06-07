// ==UserScript==
// @name       4k to butt
// @namespace  /u/killeri404
// @version    3
// @description  Replaces 4k with butts
// @copyright  Me but you can do whatever the fuck you want with this
// @include *
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

s = s.replace( /\b4K\b/g, "Butt");
s = s.replace( /\b4k\b/g, "butt");

node.data = s;

}} })();