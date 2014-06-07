// ==UserScript==

// @name           RPG.net poster delinkifier

// @namespace      forum.rpg.net

// @description    Turns quoted links in RPG.net posts into images

// @include        http://forum.rpg.net/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

    if (thisLink.innerHTML.match(/^http/i) && 
        thisLink.innerHTML.match(/\.(jpg|gif|png)/i)) {
       thisLink.innerHTML = '<img src="' + thisLink.href + '">';
    }
}