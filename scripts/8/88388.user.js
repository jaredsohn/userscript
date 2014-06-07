// ==UserScript==
// @name		  OCB Theme
// @description   Get the ROBLOX OBC theme
// @include	   http://www.roblox.com/*
// ==/UserScript==

linknodes = document.evaluate(
	"//link",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (var i = 0; i < linknodes.snapshotLength; i++) {
	link = linknodes.snapshotItem(i);
	if(link.id=="ctl00_Imports")
	{
	link.href="/CSS/Base/CSS/AllCSS.ashx?v=20100924qrwef&t=Outrageous";
	}
}		