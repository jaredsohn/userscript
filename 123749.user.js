// ==UserScript==
// @name           Ebay - Feedback Thumbnails
// @description    Shows thumbnails related to the rated auction within the feedback page
// @include        http://feedback.ebay.*
// ==/UserScript==

var allTables,thisTable,tableBody,messageRow;
allTables = document.evaluate(
	"//table[@class='FbOuterYukon']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thisTable = allTables.snapshotItem(0);
if (thisTable) {
	tableBody = thisTable.tBodies[0];
	messageRow = find90DaysMessage();
	addPictureColumn();
}


function addPictureColumn() {
	var j, newCell;
	// first row = Header
	newCell = tableBody.rows[0].insertCell(0);
	if (messageRow < 0) {
		addPictureCell(1, tableBody.rows.length);
	} else {
		addPictureCell(1, messageRow-1);
		// row with 90days message
		newCell = tableBody.rows[messageRow].insertCell(0);
		addPictureCell(messageRow+1,tableBody.rows.length);
	}
}

function addPictureCell(from, to) {
	var urlString, urlSrgList, number, picString;
	for (j=from; j < to; j+=2) {
		picString = '';
		// extract the number of the auction
		urlString = tableBody.rows[j+1].getElementsByTagName('a')[0];
		if (urlString) {
			urlSrgList = urlString.href.split('/');
			number = urlSrgList[urlSrgList.length-1];
			picString = '<img width=50 src=http://thumbs.ebaystatic.com/pict/' + number + '_1.jpg>';
		}
		// create the new cell
		newCell = tableBody.rows[j].insertCell(0);
		newCell.rowSpan = 2;
		// add the thumbnail picture
		newCell.innerHTML = picString;
	}
}

function find90DaysMessage() {
	var ret, message = document.getElementById('info90daysMsg');
	if (message) {
		ret = message.parentNode.rowIndex;
	} else {
		ret = -1;
	}
	return ret;
}