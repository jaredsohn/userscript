// ==UserScript==
// @name           kxcd caption
// @namespace      kxcd_caption
// @description    Display the caption for xkcd comics
// @include        http://*.xkcd.com/*
// @include        http://xkcd.com/*
// @include        http://*.xkcd.org/*
// @include        http://xkcd.org/*
// @include        http://*.xkcd.net/*
// @include        http://xkcd.net/*
//
// ==/UserScript==

var comic;
var parent;
var sibling;
var title;
var images = document.evaluate("//div[@class='s']/img[@title]",
                               document,
                               null,
                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                               null);

if (images && images.snapshotLength > 0) {
    comic = images.snapshotItem(0);
    title = comic.title;
} else {
    // Ah.  Probably one of the cool hyperlinked comics, which
    // means parent is above the link surrounding the image.
    images = document.evaluate("//div[@class='s']/a/img[@title]",
                               document,
                               null,
                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                               null);
    if (images && images.snapshotLength > 0) {
        comic = images.snapshotItem(0);
        title = comic.title;
        comic = comic.parentNode;
    }
}

if (comic && title) {
    var caption = document.createElement('div');
    var moniker = document.createElement('p');

    moniker.appendChild(document.createTextNode(title));
    caption.appendChild(moniker);

    comic.parentNode.insertBefore(caption, comic.nextSibling);
}
