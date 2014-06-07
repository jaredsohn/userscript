// ==UserScript==
// @name       Butt-to-Butt
// @namespace  /u/killeri404 adapted by /u/Zamiul for Butt to Butt
// @version    2
// @description  Replaces Butt with Butt :)
// @copyright  /u/killeri404 but you can do whatever the fuck you want with this
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

s = s.replace( /\bthe cloud\b/g, "my butt");
s = s.replace( /\bThe cloud\b/g, "My butt");
s = s.replace( /\bThe Cloud\b/g, "My Butt");
s = s.replace( /\bTHE CLOUD\b/g, "MY BUTT");
s = s.replace( /\bthe CLOUD\b/g, "my BUTT");
s = s.replace( /\bTHE cloud\b/g, "MY butt");
s = s.replace( /\bcloud\b/g, "butt");
s = s.replace( /\bCloud\b/g, "Butt");
s = s.replace( /\bCLOUD\b/g, "BUTT");
node.data = s;

}} })();