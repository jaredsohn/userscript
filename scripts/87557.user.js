// ==UserScript==
// @name           Hide solved griddlers
// @namespace      http://www.jenneth.com/greasemonkey/griddlers/hidesolved
// @description    Hides solved griddlers and triddlers from search results
// @include        http://www.griddlers.net/triddlers*
// @include        http://www.griddlers.net/griddlers*
// @include        http://griddlers.net/triddlers*
// @include        http://griddlers.net/griddlers*
// ==/UserScript==

run();

function run() {
	var puzzleList = getSearchResultRows();
	// GM_log("Found " + puzzleList.snapshotLength + " rows");
	cleanUpList(puzzleList);
}

function getSearchResultRows() {
	var snapshot = document.evaluate("//tr[contains(@class,'journal-content-article')]",
		document.getElementById("column-2"), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return snapshot;
}

function cleanUpList(snapshot) {
	var newRowNum = 0;
	for (var i=0; i<snapshot.snapshotLength; i++) {
		var row = snapshot.snapshotItem(i);
		if (cleanupRow(row, newRowNum)==1) {
			newRowNum++;
		}
	}
}

function cleanupRow(row, rowNum) {
	var solvedtd = row.childNodes[row.childNodes.length - 2];
	var prettified = 0;
	if (solvedtd.textContent.length > 2) {
		// GM_log("Removing row containing " + solvedtd.textContent);
		remove(row);
	} else {
		// GM_log("Not removing row containing " + solvedtd.textContent);
		prettify(row, rowNum);
		prettified = 1;
	}
	return prettified;
}

function remove(element) {
	element.parentNode.removeChild(element);
}

function prettify(row, rownum) {
	if (rownum%2==0) {
		row.className = row.className.replace('section-alternate','section-body');
	} else {
		row.className = row.className.replace('section-body','section-alternate');
	}
}