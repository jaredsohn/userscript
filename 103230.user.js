// ==UserScript==
// @name           ShowMeZeroR
// @namespace      http://www.developpez.net/forums/search.php?*
// @description    script golgotha
// @include        http://www.developpez.net/forums/*
//@Author Golgotha
// ==/UserScript==
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//td[@class='alt1'][@align='center']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	if (thisDiv.textContent == 0)
		thisDiv.style.backgroundColor = 'red';
}
