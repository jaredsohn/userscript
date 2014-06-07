// ==UserScript==
// @name	          More Readable Aldebaran
// @version	1.2
// @namespace     http://greasemonkey.org/download/
// @description	Remove Aldebaran left navigation/ad bar
// @include	http://lib.aldebaran.ru/author/*
// ==/UserScript==

var rows = document.evaluate(
    "//td[@class='kol3']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0; i < rows.snapshotLength; i++) {
    var bar = rows.snapshotItem(i);
	bar.parentNode.removeChild(bar);
	//break; // remove only left bar
}
adBar = document.getElementById('imho');
if (adBar) {
    adBar.parentNode.removeChild(adBar);
}
adBar = document.getElementById('banner800x90_nofon');
if (adBar) {
    adBar.parentNode.removeChild(adBar);
}
