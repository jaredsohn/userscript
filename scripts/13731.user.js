// ==UserScript==
// Datingcafe v0.1
// Nov 9 2007 by c0rtex
//
// und fuer die Maedels, besucht doch mal auf DC mein Profil (c0rtex), Frauen die Greasemonkey installiert
// haben UND auch noch die Source lesen sind bestimmt interessant :)...
//
// @name           Datingcafe v0.1
// @namespace      userscripts.org
// @include        http://www.datingcafe.de/*
//
// ==/UserScript==

var allImgs, thisImg;
allImgs = document.evaluate(
    "//img[contains(@src,'pk')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImgs.snapshotLength; i++) {
	thisImg = allImgs.snapshotItem(i);
	thisImg.src = thisImg.src.replace("/pk/", "/pG/");
	thisImg.src = thisImg.src.replace("pk", "pG");

}