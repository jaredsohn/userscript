// ==UserScript==
// @name           menel parasol
// @namespace      menelparasol
// @include        http://www.menelgame.pl/overview/*
// ==/UserScript==


var findString = ['http://static.pennergame.de/img/pv4/icons/fightinfo.gif']; // array of image src
var newString = ['http://i43.tinypic.com/30jmtlz.png']; // array of new image src

var allImages, thisImage;

allImages = document.evaluate(
    '//img[@src]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImages.snapshotLength; i++) {
    thisImage = allImages.snapshotItem(i);
    for (var j = 0; j < findString.length; j++) {
        if (thisImage.src.match(findString)) {
            thisImage.src = thisImage.src.replace(findString[j], newString[j]);
        }
    }
}