// ==UserScript==
// @name        Reddit Loch Ness Monster Scout
// @namespace   http://localhost
// @description Highlights instances of debauchery 
// @include     http://reddit.com*
// @version     1
// ==/UserScript==


var TEXT = "tree fiddy";
var COLOR = "blue";

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