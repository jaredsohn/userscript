// ==UserScript==
// @name       Peasant Script
// @namespace  /u/Dudles
// @version    3
// @description  Replaces Peasant Devices with Peasant
// @copyright  Based off killers source code.  Modified by /u/Dudles
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

s = s.replace( /\bconsole\b/g, "PeasantMachine");
s = s.replace( /\bconsoles\b/g, "PeasantMachines");
s = s.replace( /\bxbox\b/g, "PeasantBox");
s = s.replace( /\bplaystation\b/g, "PeasantStation");
s = s.replace( /\bps4\b/g, "Peasant Station 4");
s = s.replace( /\bxbone\b/g, "PeasantBoxOne");
s = s.replace( /\bConsole\b/g, "PeasantMachine");
s = s.replace( /\bConsoles\b/g, "PeasantMachines");
s = s.replace( /\bXbox\b/g, "Peasant Box");
s = s.replace( /\bPlayStation\b/g, "Peasant Station");
s = s.replace( /\bPS4\b/g, "Peasant Station 4");
s = s.replace( /\bXbone\b/g, "Peasant Box One");
node.data = s;

}} })();