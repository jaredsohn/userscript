// ==UserScript==
// @name           Authnet Report Total
// @namespace      http://axisofevil.net/~xtina
// @description    Authorize.net: Displays the daily report's total successful charges.
// @include        https://account.authorize.net/*RecordCount=ALL*page=history*
// ==/UserScript==

// Get all rows of the search results.
var allRows = document.evaluate('//tr[starts-with(@class, "SearchLineItemRow")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var totalAmt = 0;

// Get the report date.  Alas, the batch date is not reliable.
// Also, Expired throws things off, so.
var q = allRows.snapshotLength - 1;
do {
	var tmp = allRows.snapshotItem(q);
	q--;
}
while (allRows.snapshotItem(q).childNodes[5] == 'Expired');

var rptDate = allRows.snapshotItem(q - 1).childNodes[7];
rptDate = rptDate.innerHTML.substr(0, 11);

// And now...
for (var x = 0; x < allRows.snapshotLength; x++) {
	// Get the row.
	var thisRow = allRows.snapshotItem(x);
	// Get the type of transaction.
	var thisTyp = thisRow.childNodes[5].innerHTML;
	if (thisTyp == "Settled Successfully<br>") {
		// Tot up the amounts.
		var thisAmt = thisRow.childNodes[15].innerHTML;
		thisAmt = parseInt(thisAmt.substr(4, thisAmt.length - 11));
		totalAmt += thisAmt;
	}
}

// Paste just below the report header on the page.
var titleBar = document.getElementById("PageHeader");
titleBar.innerHTML += "<br /><span style='font-size: 11pt; color: #606;'>Total for " + rptDate + ": <b>$" + totalAmt + ".00</b></span>";

// And, why not, let's set the title.
document.title += " -- " + rptDate;
