// ==UserScript==
// @name        TL Don't Highlight TL+ Users
// @description Don't highlight TL+ users on TL
// @namespace   http://jjwhg.net/~jjwhg/
// @include     http://www.teamliquid.net/*
// @include     http://teamliquid.net/*
// @include     https://www.teamliquid.net/*
// @include     https://teamliquid.net/*
// @version     1.0.1
// ==/UserScript==

var uo = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

var list = document.evaluate('//td[@class="titelbalk plus1"]',
                             document, null, uo, null);

for (var i = 0; i < list.snapshotLength; i++) {
    var item = list.snapshotItem(i)

    item.setAttribute("class", "titelbalk")
}

var list = document.evaluate('//td[@class="titelbalk plus5"]',
                             document, null, uo, null);

for (var i = 0; i < list.snapshotLength; i++) {
    var item = list.snapshotItem(i)

    item.setAttribute("class", "titelbalk")
}
