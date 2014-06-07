// ==UserScript==
// @name        TL Show Subscribed Threads
// @namespace   http://jjwhg.net/~jjwhg/
// @description This adds back the subscribed threads link to the panel on TL.net
// @include     http://www.teamliquid.net/*
// @include     http://teamliquid.net/*
// @version     1.0.0
// @grants      none
// ==/UserScript==

var uo = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

var list = document.evaluate('//a[@href="/mytlnet/editprofile.php"]',
                             document, null, uo, null);

for (var i = 0; i < list.snapshotLength; i++) {
    var item = list.snapshotItem(i)
    var bar = document.createElement("font")
    bar.innerHTML = " | "
    var link = document.createElement("a")
    link.href = "/mytlnet/mythreads.php"
    link.innerHTML = "Subscribed Threads"

    item.parentNode.insertBefore(link, item.nextSibling)
    item.parentNode.insertBefore(bar, item.nextSibling)
}
