// ==UserScript==
// @name NoNig 
// @namespace http://www.endoftheinter.net/
// @include http://*.endoftheinter.net/*
// @include http://endoftherinter.net/*
// @include https://endoftherinter.net/*
// @include https://*.endoftheinter.net/*
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

s = s.replace( /\bnigger\b/g, "black gentleman");
s = s.replace( /\bnigga\b/g, "black friend");
s = s.replace( /\bniggers\b/g, "black gentlemen");
s = s.replace( /\bniggas\b/g, "black friends");
s = s.replace( /\bniggaz\b/g, "black friends");
s = s.replace( /\bnig\b/g, "black guy");
s = s.replace( /\bnigs\b/g, "black gentlemen");
s = s.replace( /\bnigz\b/g, "black gentlemen");
s = s.replace( /\bniglit\b/g, "black child");
s = s.replace( /\bniglet\b/g, "black child");
s = s.replace( /\bnigette\b/g, "black lady");
s = s.replace( /\bnigettes\b/g, "black ladies");


node.data = s;

}} })();
