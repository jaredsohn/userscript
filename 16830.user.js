// ==UserScript==
// @name           JHunz's VB forum despoiler
// @namespace      hunsley@gmail.com
// @include        *forums.kingdomofloathing.com*
// @description    KOL forum despoiler for the new VB forums
// ==/UserScript==

// ---------------------------------------------------------------------------
// Turns the black boxes on the forum into grey, just like Picklish's did for
// the previous forums
// ---------------------------------------------------------------------------

var tds=document.evaluate('//td[@bgcolor="black"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i=0; i < tds.snapshotLength; i++) {
	tds.snapshotItem(i).bgColor = 'grey';
} 