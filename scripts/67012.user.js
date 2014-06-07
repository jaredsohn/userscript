// ==UserScript==
// @name           CNC-ECKE Alle Foren Link
// @namespace      problemloeser.org
// @description    Warnung für den Button "Alle Foren gelesen"
// @include        http://cncecke.de/forum/*
// @include        http://www.cncecke.de/forum/*
// ==/UserScript==


var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@rel="nofollow"][@href="forumdisplay.php?do=markread"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.setAttribute('onclick', 'return confirm("Wirklich alle Foren auf gelesen setzen?")');
}
