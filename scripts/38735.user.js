// ==UserScript==
// @name           IEEExplore frame to pdf
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @include        http://ieeexplore.ieee.org/xpl/*
// ==/UserScript==

var pageAddr, links, a, href;
pageAddr = window.location.href;
links = document.evaluate(
                          "//a[@href]",
                          document,
                          null,
                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                          null);

for (var i = 0; i < links.snapshotLength; i++) {
  a = links.snapshotItem(i);
  
  if (a.href.match("stamp/stamp")) {
    href = a.href.replace("stamp/stamp", "stampPDF/getPDF");
    a.href = href;
  }  
}
