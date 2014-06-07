// ==UserScript==
// @name           Thanachart Fund My Return % Change
// @namespace      thanachartfund.greasedev.org
// @description    Display Return % Change in T-Online My Return page.
// @include        https://www.thanachartfund.com/th/tonline/mf/MyReturn.asp
// ==/UserScript==

var wrapperTable = document.evaluate("//table[@width='600']", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
wrapperTable.setAttribute("width", "625");		

var returnTable = document.evaluate("//table[@width='625']//tbody//tr//td//table", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

returnTable.setAttribute("width", "625");

var snapResults = document.evaluate("//table[@width='625']//tbody//tr//td//table[@width='625']//tbody/tr",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var headerRow = snapResults.snapshotItem(0);

// Add new column
	var elmNewColumn = document.createElement("td");
	elmNewColumn.setAttribute("class", "thai14px");
	elmNewColumn.setAttribute("valign", "top");
	elmNewColumn.setAttribute("align", "center");

	var fontElem = document.createElement("font");
	fontElem.setAttribute("color", "#ffffff");

	elmNewColumn.appendChild(fontElem);

	var bold1 = document.createElement("b");
	bold1.appendChild(document.createTextNode("Change"));

	var bold2 = document.createElement("b");
	bold2.appendChild(document.createTextNode("(%)"));

	fontElem.appendChild(bold1);
	fontElem.appendChild(document.createElement("br"));
	fontElem.appendChild(bold2);

	headerRow.appendChild(elmNewColumn);

// Add new data
	for (var i = 1; i < snapResults.snapshotLength; i++) {
		var dataRow = snapResults.snapshotItem(i);

		var query = ".//td//div";
		var costIndex = 4;
		var changeIndex = 6;

		if (i == snapResults.snapshotLength-1)
		{
			query = ".//td";
			costIndex = 2;
			changeIndex = 4;
		}

		var snapColumns = document.evaluate(query,
		dataRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var costTextWithoutComma = snapColumns.snapshotItem(costIndex).firstChild.textContent.replace(/,/g, '');
		var changeTextWithoutComma = snapColumns.snapshotItem(changeIndex).firstChild.textContent.replace(/,/g, '');

		var cost = parseFloat(costTextWithoutComma);
		var change = parseFloat(changeTextWithoutComma);

		var percentChange = (change/cost*100).toFixed(2);

		if (isNaN(percentChange))
		{
			percentChange = "-";
		}

		var newColumn = document.createElement("td");
		newColumn.setAttribute("class", "thai14px");
		newColumn.setAttribute("height", "20");

		if (i == snapResults.snapshotLength-1)
		{
			newColumn.setAttribute("valign", "middle");
			newColumn.setAttribute("align", "right");
			newColumn.appendChild(document.createTextNode(percentChange));
		} else {
			var newColumnDiv = document.createElement("div");
			newColumnDiv.setAttribute("align", "right");
			newColumn.appendChild(newColumnDiv);
			newColumnDiv.appendChild(document.createTextNode(percentChange));
		}

		dataRow.appendChild(newColumn);
	}