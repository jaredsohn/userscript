// ==UserScript==
// @name           Kronos MCAnime - Top Links + Style
// @namespace      Zeyth
// @description    Soluciona la funcion regresar arriba (Link) al usar el estilo http://userstyles.org/styles/49925/
// @include        http://kronos.mcanime.net/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href="#top"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	thisLink.href = "#wrapper";
}