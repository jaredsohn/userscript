// ==UserScript==
// @name           Highlight Text
// @description    Highlights text you want, in 3 different colors of your choice. To change highlighted words and color, use the user script command menu
// @include        http://is.eranet.pl/*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://usocheckup.dune.net/56520.js?maxage=2
// ==/UserScript==

var TEXT = "kwierzbicki";
var COLOR = "red";

var allText = document.evaluate( "//text()[contains(., '" + TEXT + "' )]", document, null, XPathResult. ORDERED_NODE_SNAPSHOT_TYPE , null);

for(var i = 0; i < allText.snapshotLength; i++)
{
var cur = allText.snapshotItem(i);
var par = cur.parentNode;
var textInd;
var curName = cur.nodeName;
do
{
var curText = cur.nodeValue;
GM_log("curText: " + curText);
textInd = curText.indexOf(TEXT);
if(textInd != -1)
{
var before = document.createTextNode( curText.substring(0, textInd ) );
var highlight = document. createElement("span");
highlight.class = "highlight";
highlight.textContent = TEXT;
highlight.style.color = COLOR;
var after = document.createTextNode( curText.substring(textInd + TEXT.length) );
par.insertBefore(before, cur);
par.insertBefore(highlight, cur);
par.insertBefore(after, cur);
par.removeChild(cur);
cur = after;
}
} while(textInd != -1)
}