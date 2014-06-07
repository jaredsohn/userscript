// ==UserScript==
// @name           Fok Hilton
// @namespace      http://frontpage.fok.nl
// @description    Verwijderd nieuws over Paris Hilton van frontpage van fok.nl
// @include        http://frontpage.fok.nl/*
// ==/UserScript==
// versie 1.0      Eerste release
var divNews, links, curLink, curTitle, curLI;
links = document.evaluate( "//DIV/UL/LI/A[@title]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i++) {
  curLink = links.snapshotItem(i);
  curTitle = curLink.title;
  if (curTitle.match('Hilton') != null) {
    curLI = curLink.parentNode;
    curLink.parentNode.parentNode.removeChild(curLI);
  }
  curLink = null;
  curTitle = null;
}