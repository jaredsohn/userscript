// ==UserScript==
// @name           Team Fortress 2 Classless update hidden link alert
// @namespace      http://mike.thedt.net
// @description    Automatically refreshes all "hidden" update pages, and alerts you when a link is found. Please don't run this for extended periods of time.
// @include        http://www.teamfortress.com/classless/hidden/*
// ==/UserScript==

var links = document.getElementsByTagName('a');
if (links.length==0)
	document.location.reload();
else
{
	GM_openInTab(links[0].href);
	alert ('Found a link and opened it in a new tab!');
}