// ==UserScript==
// @name          Resize Forum table
// @include       http://www.blackberry.com/developers/forum/*
// ==/UserScript==


var tds = document.body.getElementsByTagName("TD");
if(tds.length > 16 && tds[16].width==520)
	tds[16].width ="100%";
