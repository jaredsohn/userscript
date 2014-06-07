// ==UserScript==
// @name           Profillink Fix
// @namespace      http://userscripts.org/users/33073/scripts
// @include        http://forum.mods.de/bb/*
// ==/UserScript==

var links = document.evaluate("//a[starts-with(@onClick, 'openProfile')]", document, null, 6, null), i, link, uid;
for (i=0; i<links.snapshotLength; i++) {
	link = links.snapshotItem(i);
	uid = link.getAttribute("onClick").match(/\d{2,}/g);
	link.href = "http://my.mods.de/"+uid;
	link.removeAttribute("onClick");
}