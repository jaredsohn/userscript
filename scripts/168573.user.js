// ==UserScript==
// @name        TL Home Button
// @namespace   http://jjwhg.net/~jjwhg/
// @description Returnts TL.net's home button to its rightful place
// @include     http://www.teamliquid.net/*
// @include     http://teamliquid.net/*
// @version     1.0.1
// @grant       none
// ==/UserScript==

// Change Log:
// 1.0.1  May 24, 2013
//   * Re-align the dropdown menus

var uo = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

var list = document.evaluate('//ul[@id="filters"]',
                             document, null, uo, null);

for (var i = 0; i < list.snapshotLength; i++) {
    var item = list.snapshotItem(i)

    item.parentNode.removeChild(item)
}

var list = document.evaluate('//li[@class="tb-sprite smallnavstart"]',
                             document, null, uo, null);

for (var i = 0; i < list.snapshotLength; i++) {
    var item = list.snapshotItem(i)

    item.parentNode.removeChild(item)
}

var list = document.evaluate('//div[@id="dropdown-menu-features"]',
                             document, null, uo, null);

for (var i = 0; i < list.snapshotLength; i++) {
    var item = list.snapshotItem(i)

    item.style.left = "125px"
}

var list = document.evaluate('//div[@id="dropdown-menu-liquipedia"]',
                             document, null, uo, null);

for (var i = 0; i < list.snapshotLength; i++) {
    var item = list.snapshotItem(i)

    item.style.left = "100px"
}
