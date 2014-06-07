// ==UserScript==
// @name        Add Delicious recommended / popular tags by François
// @namespace   http://etherpad.com/MFlEqjEStX
// @description Adds all recommended/popular tags to the bookmark to be saved.
// @include     http://delicious.com/save*
// ==/UserScript==


var tags = [];

var result = document.evaluate("//li[@id=\"save-reco-tags\"]//a/text() | //li[@id=\"save-pop-tags\"]//a/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < result.snapshotLength; i++) {
    thisLink = result.snapshotItem(i);
    tags.push(thisLink.nodeValue);
}

document.getElementById('tags').value += tags.join(' ');
