// ==UserScript==
// @name           Thanachart Fund Historical Prices % Change
// @namespace      greasedev.org
// @include        http://www.thanachartfund.com/tfundweb/infoid/idp_navhistory.asp*
// @include        https://www.thanachartfund.com/tfundweb/infoid/idp_navhistory.asp*
// ==/UserScript==

var navTable = document.evaluate("//table[@class='thai14px']", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		
var snapResults = document.evaluate("//table[@class='thai14px']//tbody/tr",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
		
var headerRow = snapResults.snapshotItem(0);

addPercentChangeColumn(headerRow);
addData(snapResults);

function addPercentChangeColumn(headerRow) {
	var elmNewColumn = document.createElement("td");
	elmNewColumn.setAttribute("bgcolor", "#FF9933");
	elmNewColumn.setAttribute("align", "center");
		
	var div = document.createElement("div");
	div.appendChild(document.createTextNode("Change"));
	
	div.appendChild(document.createElement("br"));
	div.appendChild(document.createTextNode("(%)"));

	elmNewColumn.appendChild(div);

	headerRow.appendChild(elmNewColumn);
}

function addData(snapResults) {
	var netCurrentValueTextWithoutComma = '';
	var netCurrentValue = 0;

	for (var i = 1; i < snapResults.snapshotLength; i++) {
		var dataRow = snapResults.snapshotItem(i);

		var query = ".//td";		
		var currentValueIndex = 2;
		var changeIndex = 3;

		var snapColumns = document.evaluate(query,
		dataRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var currentValueTextWithoutComma = snapColumns.snapshotItem(currentValueIndex).firstChild.textContent.replace(/,/g, '');
		var changeTextWithoutComma = snapColumns.snapshotItem(changeIndex).firstChild.textContent.replace(/,/g, '');
		
		var currentValue = parseFloat(currentValueTextWithoutComma);
		var change = parseFloat(changeTextWithoutComma);
		var cost = currentValue - change;

		var percentChange = (change/cost*100).toFixed(2);

		// Add a column for % change
		var percentChangeColumn = createNewColumn(percentChange);
		
		dataRow.insertBefore(percentChangeColumn, dataRow.childNodes[5*2]);
	} // end for*/
}
	
function createNewColumn(value) {
	var newColumn = document.createElement("td");
	newColumn.setAttribute("align", "center");

	newColumnFont = document.createElement("font");
	
	var fontColor;
	
	if (value > 0) {
	 fontColor = "#009900";
	} else {
	 fontColor = "#993300";
	}
	
	newColumnFont.setAttribute("color", fontColor);
	newColumnFont.appendChild(document.createTextNode(value));

	newColumn.appendChild(newColumnFont);

	return newColumn;
}
