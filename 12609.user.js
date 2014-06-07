// ==UserScript==
// @name           pro-linux.de pure content
// @namespace      *
// @include        http://www.pro-linux.de/news/*
// ==/UserScript==
ellist = document.getElementsByTagName("table");

for (var i = 0; i < ellist.length; i++) {
	if (ellist[i].getAttribute('background'))
		ellist[i].parentNode.removeChild(ellist[i]);
}

ellist = document.getElementsByTagName("td");

for (var i = 0; i < ellist.length; i++) {
	if (ellist[i].getAttribute('width')==147)
		ellist[i].parentNode.removeChild(ellist[i]);
}

xpathResult = document.evaluate('/html/body/table/tbody/tr/td[2]/table', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
xpathResult.snapshotItem(0).style.display='none';
