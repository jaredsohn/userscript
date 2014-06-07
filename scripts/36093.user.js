// ==UserScript==
// @name           mods.de thumbnail fix
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        http://forum.mods.de/bb/*
// ==/UserScript==

var links = document.evaluate("//a[@href and starts-with(.,'[img]') and substring(text(), string-length(text())-5, string-length(text())) = '[/img]']", document, null, 6, null), i;
for (i=0; i<links.snapshotLength; i++) {
	links.snapshotItem(i).innerHTML = links.snapshotItem(i).innerHTML.replace(/^\[img\]/i, "<img src='").replace(/\[\/img\]$/i, "'/>");
	//links.snapshotItem(i).innerHTML = links.snapshotItem(i).innerHTML.replace("[img]", "<img src='").replace("[/img]", "'/>");
}