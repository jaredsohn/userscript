// ==UserScript==
// @name           Thanachart Fund My Balance % and % Change
// @namespace      thanachartfund.greasedev.org
// @description    Display My Balance % and % Change in T-Online My Balance page.
// @include        https://www.thanachartfund.com/th/tonline/mf/MyBalance.asp
// ==/UserScript==

var balanceTable = document.evaluate("//table[@width='600']", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

balanceTable.setAttribute("width", "625");

var snapResults = document.evaluate("//table[@width='625']//tbody/tr",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var headerRow = snapResults.snapshotItem(1);

// Add new column (% Change)
	var elmNewColumn = document.createElement("td");
	elmNewColumn.setAttribute("class", "thainormal");
	elmNewColumn.setAttribute("valign", "top");

	var fontElem = document.createElement("font");
	fontElem.setAttribute("color", "#ffffff");

	var div1 = document.createElement("div");
	div1.setAttribute("align", "center");
	var bold1 = document.createElement("b");
	bold1.appendChild(document.createTextNode("Change"));
	div1.appendChild(bold1);

	var div2 = document.createElement("div");
	div2.setAttribute("align", "center");
	var bold2 = document.createElement("b");
	bold2.appendChild(document.createTextNode("(%)"));

	div2.appendChild(bold2);

	fontElem.appendChild(div1);
	fontElem.appendChild(div2);

	elmNewColumn.appendChild(fontElem);

	headerRow.appendChild(elmNewColumn);

// Add new column (%)
	elmNewColumn = document.createElement("td");
	elmNewColumn.setAttribute("class", "thainormal");
	elmNewColumn.setAttribute("valign", "top");

	fontElem = document.createElement("font");
	fontElem.setAttribute("color", "#ffffff");

	div1 = document.createElement("div");
	div1.setAttribute("align", "center");
	bold1 = document.createElement("b");
	//bold1.appendChild(document.createTextNode("Change"));
	div1.appendChild(bold1);

	div2 = document.createElement("div");
	div2.setAttribute("align", "center");
	bold2 = document.createElement("b");
	bold2.appendChild(document.createTextNode("%"));

	div2.appendChild(bold2);

	fontElem.appendChild(div1);
	fontElem.appendChild(div2);

	elmNewColumn.appendChild(fontElem);

	headerRow.insertBefore(elmNewColumn, headerRow.childNodes[6*2]);

// Add new data
	var netCurrentValueTextWithoutComma = '';
	var netCurrentValue = 0;
	for (var i = 2; i < snapResults.snapshotLength; i++) {
		var dataRow = snapResults.snapshotItem(i);

		var query = ".//td//div//a//font";
		var fontColor = "#000000";
		var costIndex = 4;
		var currentValueIndex = 5;
		var changeIndex = 6;

		if (i == snapResults.snapshotLength-1)
		{
			query = ".//td//div//font//b";
			costIndex = 2;
			currentValueIndex = 3;
			changeIndex = 4;
			fontColor = "#ffffff";
		}

		var snapColumns = document.evaluate(query,
		dataRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		// Find netCurrentValue
		if (i == 2) // Find first time only
		{
			var lastRow = snapResults.snapshotItem(snapResults.snapshotLength-1);

			query = ".//td//div//font//b"; // query for the last row

			var snapColumnsForTheLastRow = document.evaluate(query,
			lastRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

			netCurrentValueTextWithoutComma = snapColumnsForTheLastRow.snapshotItem(3).firstChild.textContent.replace(/,/g, '');			
			netCurrentValue = parseFloat(netCurrentValueTextWithoutComma);
		}

		var costTextWithoutComma = snapColumns.snapshotItem(costIndex).firstChild.textContent.replace(/,/g, '');
		var currentValueTextWithoutComma = snapColumns.snapshotItem(currentValueIndex).firstChild.textContent.replace(/,/g, '');
		var changeTextWithoutComma = snapColumns.snapshotItem(changeIndex).firstChild.textContent.replace(/,/g, '');

		var cost = parseFloat(costTextWithoutComma);
		var currentValue = parseFloat(currentValueTextWithoutComma);
		var change = parseFloat(changeTextWithoutComma);

		var percentChange = (change/cost*100).toFixed(2);

		var percent = (currentValue/netCurrentValue*100).toFixed(2);

		var isBold = (i == snapResults.snapshotLength-1);

		// Add a column for % change
		var percentChangeColumn = createNewColumn(percentChange, isBold);

		// Add a column for %
		var percentColumn = createNewColumn(percent, isBold);

		dataRow.appendChild(percentChangeColumn);

		dataRow.insertBefore(percentColumn, dataRow.childNodes[6*2]);		
	}

function createNewColumn(value, isBold) {
	var newColumn = document.createElement("td");
	newColumn.setAttribute("class", "thainormal");
	newColumn.setAttribute("height", "20");

	newColumnDiv = document.createElement("div");
	newColumnDiv.setAttribute("align", "right");
	newColumn.appendChild(newColumnDiv);

	newColumnFont = document.createElement("font");
	newColumnFont.setAttribute("color", fontColor);

	if (isBold)
	{
		var newColumnBold = document.createElement("b");
		newColumnBold.appendChild(document.createTextNode(value));

		newColumnFont.appendChild(newColumnBold);
	} else{
		newColumnFont.appendChild(document.createTextNode(value));
	}

	newColumnDiv.appendChild(newColumnFont);

	return newColumn;
}