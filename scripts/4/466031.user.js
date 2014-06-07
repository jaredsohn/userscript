// ==UserScript==
// @name       DAHHHH
// @namespace  YOUR WEBSITE/WHATEVER HERE
// @version    VERSION NUMBER HERE
// @description  DESCRIPTION HERE, DUH
// @copyright  COPYRIGHT
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

s = s.replace( /\bfriend\b/g, "fucker");

node.data = s;

}} })();