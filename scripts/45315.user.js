// ==UserScript==
// @name           Authorize.net Receipt Link
// @namespace      http://axisofevil.net/~xtina/
// @description    Adds a link in search forms to the receipt.
// @include        https://account.authorize.net/*page=search*
// ==/UserScript==

// Get all rows of the search results.
var allRows = document.evaluate('//tr[starts-with(@class, "SearchLineItemRow")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var x = 0; x < allRows.snapshotLength; x++) {
	var thisRow = allRows.snapshotItem(x).childNodes[1];
// Get the transaction ID.
	var thisNum = thisRow.childNodes[0].childNodes[0].nodeValue;

// Create the link.
	var recLink = document.createElement("a");
	recLink.setAttribute("href", "https://account.authorize.net/UI/themes/anet/popup.aspx?page=history&sub=printtrandetail&transid=" + thisNum);
	recLink.setAttribute("target", "_blank");
	recLink.appendChild(document.createTextNode("Receipt"));

// Append it all appropriately.
	thisRow.appendChild(document.createElement("br"));
	thisRow.appendChild(recLink);
}
