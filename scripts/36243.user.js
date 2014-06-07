// ==UserScript==
// @name           Spiegel Online  Fotostrecke Anpassen
// @namespace      none
// @description    Verhindert, dass man am Ende einer Fotostrecke auf spiegel.de zur Übersicht aller Fotostrecken kommt
// @include        http://www.spiegel.de/fotostrecke/*
// ==/UserScript==

var bkEl = document.getElementById("spBigaControlBack");
var vonbistextNode = bkEl.nextSibling;
var vbmatch = /(\d+)(\D+)(\d+)/.exec(vonbistextNode.textContent);
if (vbmatch.length != 4) return;
vonbistextNode.textContent = vbmatch[1] + vbmatch[2] + (vbmatch[3] - 1).toString();
if (vbmatch[1] == 1) {
	var mpath = /(.+-)(\d+)(\D+)/.exec(bkEl.getAttribute("HREF"));
	if (mpath.length != 4) return;
	bkEl.setAttribute("HREF", mpath[1]+(vbmatch[3]-1).toString()+mpath[3]);
}
if (vbmatch[1] == vbmatch[3]-1){
	var mpath = /(.+)-(\d+)(\D+)/.exec(bkEl.getAttribute("HREF"));
	if (mpath.length != 4) return;
	var fwEl = document.getElementById("spBigaControlForw");
	fwEl.setAttribute("HREF", mpath[1]+mpath[3]);
	var fbi = document.getElementById("spBigaControlImg");
	fbi.setAttribute("HREF", mpath[1]+mpath[3]);
}