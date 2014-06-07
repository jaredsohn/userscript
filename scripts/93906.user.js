// ==UserScript==
// @name           Thanachart Fund My Balance % and % Change and Adjustment
// @namespace      thanachartfund.greasedev.org
// @description    Display My Balance % and % Change and Adjustment in T-Online My Balance page.
// @include        https://www.thanachartfund.com/th/tonline/mf/MyBalance.asp
// ==/UserScript==

var balanceTable = document.evaluate("//table[@width='600']", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

balanceTable.setAttribute("width", "625");

var snapResults = document.evaluate("//table[@width='625']//tbody/tr",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var tBody = document.evaluate("//table[@width='625']//tbody", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var headerRow = snapResults.snapshotItem(1);

addPercentChangeColumn(headerRow);
addPercentColumn(headerRow);
addData(snapResults);	

var netProfit = getNetProfit(snapResults);
// adjustment value should use comma (,) as 1000 separator like '1,000.00'.
var adjustmentValue = '0.00';

tBody.appendChild(createAdjustmentRow(adjustmentValue));
tBody.appendChild(createTotalRow(netProfit, adjustmentValue));

function addPercentChangeColumn(headerRow) {
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
}

function addPercentColumn(headerRow) {
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
}

function addData(snapResults) {
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
		var percentChangeColumn = createNewColumn(percentChange, fontColor, isBold);

		// Add a column for %
		var percentColumn = createNewColumn(percent, fontColor, isBold);

		dataRow.appendChild(percentChangeColumn);

		dataRow.insertBefore(percentColumn, dataRow.childNodes[6*2]);		
	} // end for*/
}

function getNetProfit(snapResults) {
	var netProfitText = '';

	var dataRow = snapResults.snapshotItem(2);

	var query = ".//td//div//a//font";

	// Find netProfit
	var lastRow = snapResults.snapshotItem(snapResults.snapshotLength-1);

	query = ".//td//div//font//b"; // query for the last row

	var snapColumnsForTheLastRow = document.evaluate(query,
	lastRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	netProfitText = snapColumnsForTheLastRow.snapshotItem(5).firstChild.textContent;

	return netProfitText;
}

function createNewColumn(value, fontColor, isBold) {
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

function createNewColumnWithColspan(value, fontColor, isBold, colspan) {
	var newColumn = createNewColumn(value, fontColor, isBold);
	newColumn.setAttribute("colspan", colspan);

	return newColumn;
}

function createAdjustmentRow(adjustmentValue) {
	var adjustmentRow = document.createElement("tr");
	adjustmentRow.setAttribute("bgcolor", "#ff9900");

	adjustmentRow.appendChild(createNewColumnWithColspan('Adjustment', '#ffffff', true, 7));
	adjustmentRow.appendChild(createNewColumn(adjustmentValue, '#ffffff', true));
	adjustmentRow.appendChild(createNewColumn('', '#ffffff', false));

	return adjustmentRow;
}

function createTotalRow(netProfitText, adjustmentValueText) {
	var	netProfitTextWithoutComma = netProfitText.replace(/,/g, '');			
	var netProfitValue = parseFloat(netProfitTextWithoutComma);

	var	adjustmentValueTextWithoutComma = adjustmentValueText.replace(/,/g, '');			
	var adjustmentValue = parseFloat(adjustmentValueTextWithoutComma);

	var adjustedProfit = netProfitValue + adjustmentValue;

	var adjustedProfitText = addCommas(adjustedProfit.toFixed(2).toString());

	var totalRow = document.createElement("tr");
	totalRow.setAttribute("bgcolor", "#ff9900");

	totalRow.appendChild(createNewColumnWithColspan('Total Result', '#ffffff', true, 7));
	totalRow.appendChild(createNewColumn(adjustedProfitText, '#ffffff', true));
	totalRow.appendChild(createNewColumn('', '#ffffff', false));

	return totalRow;
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
