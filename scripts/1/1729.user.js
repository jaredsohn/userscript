// ==UserScript==
// @name          Snopes Header Shrink
// @namespace     http://gotmarko.com/userscripts/
// @description   Remove the Snopes header graphics so more content is visible
// @include       http://snopes.com/*
// @include       http://www.snopes.com/*
// ==/UserScript==

// v1 - 050908
//    original version

(function() {

    var theTable = document.evaluate(
	'//table[descendant::div[@id="container"]]/.',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null).snapshotItem(0);

    if (theTable) {
	theTable.parentNode.removeChild(theTable);
    }

    var theContent = document.evaluate(
	'//div[@id="main-content"]/.',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null).snapshotItem(0);

    if (theContent) {
	theContent.style.top = '0px';

	var allTDs, thisTD;
	allTDs = document.evaluate(
	    '//td',
	    theContent,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allTDs.snapshotLength; i++) {
	    thisTD = allTDs.snapshotItem(i);
	    thisTD.style.verticalAlign = 'top';
	}
    }

})();
