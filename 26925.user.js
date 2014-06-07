// ==UserScript==
// @name          News.YC un-scribdify
// @namespace     http://noway.ratry.ru/jsn/
// @description   unscribdify pdf links at news.YC
// @include       http://news.ycombinator.com/*
// ==/UserScript==


var links = document.evaluate(
        "//a[@href]", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) ;

for (var i = 0; i < links.snapshotLength; i++) {
    var l = links.snapshotItem(i);
    var m = l.href.match(/http:\/\/(www\.)?scribd\.com\/vacuum\?url=(.*\.pdf\.*)/i) ;
    if (m) {
        var scribd = document.createElement('span');
        scribd.innerHTML = ' <a href="' + l.href + '">[scribd]</a>' ;
        l.parentNode.insertBefore(scribd, l.nextSibling);
        l.href = m[2] ;
    }
}

