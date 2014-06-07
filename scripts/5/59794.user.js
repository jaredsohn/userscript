
// Disable opening links in new windows for HUJI sites.
// version 0.2
// 2009-10-14
// Written by Noam Yorav-Raphael.
// Released to the public domain.
//
// ==UserScript==
// @name          HUJI No New Windows
// @description   Disable opening links in new windows for HUJI sites.
// @include       http://*.huji.ac.il/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function open_href(x) {
    document.location.href = x;
}
unsafeWindow.solution = open_href;
unsafeWindow.newWin = open_href;

var allLinks = xpath('//a[@href][@target]');
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
    var newLink = document.createElement("a");
    newLink.href = thisLink.href;
    newLink.innerHTML = thisLink.innerHTML;
    newLink.className = thisLink.className;
    thisLink.parentNode.replaceChild(newLink, thisLink);
}

// Version history:
// 0.1: Initial release
// 0.2: Avoid a popup in the university's SHNATON
