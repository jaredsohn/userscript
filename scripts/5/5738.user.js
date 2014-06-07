// ==UserScript==
// @name          Roland Piquepaille Killer
// @author	  Brendan Donahue
// @description	  Hide stories submitted by Roland Piquepaille from Slashdot.org
// @include       http://*slashdot.org/*
// ==/UserScript==
var allPiqs, thisPiq
allPiqs = document.evaluate(
    '//a[@href="http://www.primidi.com/"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allPiqs.snapshotLength; i++) {
    thisPiq = allPiqs.snapshotItem(i);
	thisPiq.parentNode.previousSibling.previousSibling.style.display = 'none';
	thisPiq.parentNode.innerHTML = 'This story was submitted by Roland Piquepaille.';
}