// ==UserScript==
// @name           changeurl ptpimg to ip
// @namespace      userscripts.org
// @description    test for http://stackoverflow.com/q/10267423/33499
// @include        *passthepopcorn.me/*
// ==/UserScript==

var links,thisLink;
links = document.evaluate("//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);

    thisLink.href = thisLink.href.replace('ptpimg.me/',
                                          '94.75.232.179/');
}