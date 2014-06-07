// ==UserScript==
// @name        TL Hide News Sidebar
// @namespace   http://jjwhg.net/~jjwhg/
// @description Remove the "News" left sidebar on TL.net
// @include     http://www.teamliquid.net/*
// @include     http://teamliquid.net/*
// @version     1.0.0
// @grants      none
// ==/UserScript==

var uo = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

var list = document.evaluate('//a[@id="nav_news_left_mid"]',
                             document, null, uo, null);

for (var i = 0; i < list.snapshotLength; i++) {
    var item = list.snapshotItem(i)

    item.parentNode.removeChild(item.nextSibling)
    item.parentNode.removeChild(item)
}
