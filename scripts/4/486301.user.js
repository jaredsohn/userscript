// ==UserScript==
// @name       Console-to-potato
// @namespace  /u/killeri404
// @version    3
// @description  Replaces consoles with potatoes :)
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

s = s.replace( /\bgod\b/g, "GabeN");
s = s.replace( /\blord\b/g, "GabeN");
s = s.replace( /\bsaviour\b/g, "GabeN");
s = s.replace( /\bxbox\b/g, "potatobox");
s = s.replace( /\bplaystation\b/g, "potato");
s = s.replace( /\bps4\b/g, "potato 4");
s = s.replace( /\bxbone\b/g, "potatone");
s = s.replace( /\bGod\b/g, "GabeN");
s = s.replace( /\bLord\b/g, "GabeN");
s = s.replace( /\bSaviour\b/g, "GabeN");
s = s.replace( /\bXbox\b/g, "Potatobox");
s = s.replace( /\bPlayStation\b/g, "Potato");
s = s.replace( /\bPS4\b/g, "Potato 4");
s = s.replace( /\bXbone\b/g, "Potatone");
node.data = s;

}} })();