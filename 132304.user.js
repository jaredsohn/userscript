// ==UserScript==
// @name           Thanachart Fund NAV % Change
// @namespace      greasedev.org
// @include        http://www.thanachartfund.com/tfundweb/infoid/idp_navfund.asp*
// @include        https://www.thanachartfund.com/tfundweb/infoid/idp_navfund.asp*
// ==/UserScript==

var navTable = document.evaluate("//table[@class='thainormal']", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		
var snapResults = document.evaluate("//table[@class='thainormal']//tbody/tr",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
		
var headerRow = snapResults.snapshotItem(0);

addPercentChangeColumn(headerRow);
addData(snapResults);

function addPercentChangeColumn(headerRow) {
	var elmNewColumn = document.createElement("td");
	elmNewColumn.setAttribute("align", "center");
	
	var bold = document.createElement("b");
	bold.appendChild(document.createTextNode("Change"));
	
	var br = document.createElement("br");
	bold.appendChild(br);
	bold.appendChild(document.createTextNode("(%)"));

	elmNewColumn.appendChild(bold);

	headerRow.insertBefore(elmNewColumn, headerRow.childNodes[5*2])
}

function addData(snapResults) {
	var netCurrentValueTextWithoutComma = '';
	var netCurrentValue = 0;

	for (var i = 3; i < snapResults.snapshotLength; i+=3) {
		var dataRow = snapResults.snapshotItem(i);

		var query = ".//td";
		var fontColor = "#000000";		
		var currentValueIndex = 3;
		var changeIndex = 4;

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
	newColumn.setAttribute("class", "thainormal");
	newColumn.setAttribute("align", "right");
	newColumn.appendChild(document.createTextNode(value));

	return newColumn;
}
