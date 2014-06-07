// Credit for alot of the script goes to the author of the Yahoo Fantasy Baseball Game Log linker jk
// I just adapted this for my needs.
// ==UserScript==
// @name        Yahoo Fantasy MLB Relinker - Player and game links open in same tab
// @namespace   http://userscripts.org
// @description Relinks the player links and game links not to open a new window
// @include     http://baseball.fantasysports.yahoo.com/*
// ==/UserScript==

var allElements;
var thisElement;

allElements = document.evaluate(
    "//*[contains(@target, 'sports')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < allElements.snapshotLength; i++) {

    thisElement = allElements.snapshotItem(i);

    if (thisElement.href.indexOf('news') == -1) {

      thisElement.setAttribute("target","")
          
    }
}