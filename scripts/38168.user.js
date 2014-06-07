// ==UserScript==
// @name           Mods.de Profillink Fix
// @include        http://forum.mods.de/bb/*
// @include        http://forum.mods.de/bb/searchuser.php
// ==/UserScript==

var links = document.evaluate("//a[@href='javascript:void(0);' and contains(@onClick, 'openProfile')]", document, null, 6, null), i, link, uid;
for (i=0; i<links.snapshotLength; i++) {
	link = links.snapshotItem(i);
	uid = link.getAttribute("onClick").match(/\d{2,}/g);
	link.href = "http://my.mods.de/"+uid;
	link.removeAttribute("onClick");
}