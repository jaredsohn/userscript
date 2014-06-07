// ==UserScript==
// @name           Capitalize
// @namespace      Capitalize
// @description    Replaces lower case with upper case letters
// @include        http://*bungie.net/*
// @include        http://mods.jmh9072.com/
// ==/UserScript==

(function() {
var replacements, regex, key, textnodes, node, s;
textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 1; i < textnodes.snapshotLength; i++) {
node = textnodes.snapshotItem(i);
if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
{

s = node.data;

s = s.replace( /\b..a\b/g, " . A");

s = s.replace( /\b..b\b/g, " . B");

s = s.replace( /\b..c\b/g, " . C");

s = s.replace( /\b..'s\b/g, " 's");









node.data = s;

}} })();

// lol y r u here???? burritosenior rawks!!!111