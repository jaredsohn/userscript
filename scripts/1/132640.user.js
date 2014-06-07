// ==UserScript==
// @name           Thanachart Fund Homepage Percent Change
// @namespace      greasedev.org
// @include        http://www.thanachartfund.com/index.html
// ==/UserScript==

window.addEventListener('load', function() {
	var doc = document.getElementsByTagName("frame")[0].contentDocument;
	
	var doc2 = doc.getElementsByTagName("iframe")[1].contentDocument;
		
	var snapResults = doc2.evaluate("//table[@width='95%']//tbody/tr",
		doc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var headerRow = snapResults.snapshotItem(0);
	
	addPercentChangeColumn(headerRow);	
	addData(snapResults, doc2);
}, false);

function addPercentChangeColumn(headerRow) {
	var elmNewColumn = document.createElement("td");
	elmNewColumn.setAttribute("align", "center");
		
	var b = document.createElement("b");
	b.appendChild(document.createTextNode("Change"));
	
	b.appendChild(document.createElement("br"));
	b.appendChild(document.createTextNode("(%)"));

	elmNewColumn.appendChild(b);

	headerRow.insertBefore(elmNewColumn, headerRow.childNodes[5*2]);
}

function addData(snapResults, doc2) {
	var netCurrentValueTextWithoutComma = '';
	var netCurrentValue = 0;

	for (var i = 1; i < snapResults.snapshotLength; i++) {
		var dataRow = snapResults.snapshotItem(i);
				
		var query = ".//td";		
		var currentValueIndex = 3;
		var changeIndex = 4;
				
		var snapColumns = doc2.evaluate(query,
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
	newColumn.setAttribute("align", "right");

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

