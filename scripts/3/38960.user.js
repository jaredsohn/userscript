// ==UserScript==
// @name          Goodbye Wow Ads v1.2
// @namespace	  http://userscripts.org/scripts/show/38960
// @description   Removes the Advertisements from the official World of Warcraft and battle.net Forums. Copyright Robin King, 2008-2009
// @include       http*://forums.wow-europe.com/thread.html*
// @include       http*://forums.worldofwarcraft.com/thread.html*
// @include       http*://forums.wow-europe.com/board.html*
// @include       http*://forums.worldofwarcraft.com/board.html*
// @include       http*://forums.battle.net/thread.html*
// @include       http*://forums.battle.net/board.html* 
// ==/UserScript==

// Removing the top bar-fixed for bnet forums
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='advertise-vert']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.parentNode.removeChild(thisDiv.parentNode);
}

// Removing the bottom bar.
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='advertise-horz']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.parentNode.removeChild(thisDiv.parentNode);
}