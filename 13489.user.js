// This is a Greasemonkey user script.

// ==UserScript==
// @name clean_vgames
// @include *forum.vgames.co.il/forumdisplay.php?f=*
// @include *forum.vgames.co.il/forum.php
// ==/UserScript==

//Delet the top msn bar

var allDivs, thisDiv;

allDivs = document.evaluate(

    "//table[@width='1015']",

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {

    thisDiv = allDivs.snapshotItem(i);

    thisDiv.parentNode.removeChild(thisDiv)

}

//Delet the top news bar
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//td[@class='paddTop4']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv)
}


//Delet the top banner
allDivs = document.evaluate(
    "//td[@class='topBanner']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv)
}


//Delet the right side banner
allDivs = document.evaluate(
    "//a[@href='http://shop.vgames.co.il/']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv)
}
