// ==UserScript==
// @name           azet
// @namespace      azet
// @description    azet 1000 chars password + visible password (only in profile) 
// @include        http://pokec.azet.sk/sluzby/nastavenia/*
// ==/UserScript==


var limited;
limited=document.evaluate(
"//input[@maxlength]",
document, 
null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0; i<limited.snapshotLength; i++) 
{
	limited.snapshotItem(i).setAttribute("maxlength", "1000");
	limited.snapshotItem(i).setAttribute("type", "text");
	limited.snapshotItem(i).setAttribute("AUTOCOMPLETE", "off");
}