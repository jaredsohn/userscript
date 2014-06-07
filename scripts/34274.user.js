// ==UserScript==
// @name           Popmundo Income Aggregator
// @namespace      Scriptmundo
// @description  View income and Expenses for locales as it should be: day by day
// @include        http://www*.popmundo.com/Common/Company.asp?action=ViewLocaleSales*
// @include        http://www*.popmundo.com/Common/Company.asp?action=ViewLocalePurchases*
// @description  Group locales' income by day.
//@version 1.1.0
// ==/UserScript==

var INCOMES_ROWS_XPATH = "/html/body/table[3]/tbody/tr/td[1]/table[2]/tbody/tr/td/table/tbody/tr[(position()>1)]";

function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var incomeNodes = xpathNodes(INCOMES_ROWS_XPATH);
var addedRows = 0;

for (var i = 0; i < incomeNodes.snapshotLength; i++) {
	var incomeRow = incomeNodes.snapshotItem(i);
	var incomeCells = incomeRow.getElementsByTagName('td');
	var day = incomeCells[0].innerHTML.match(/([\d\/]{1,})/)[1];
	var income = parseFloat(incomeCells[2].textContent);
	var ammount = parseInt(incomeCells[3].textContent);
	
	if (i == 0) {
		var monthDay = day;
		var dayIncome = 0;
		var dayAmmount = 0;
	}
	else if (monthDay != day) {
		var trClass = incomeRow.getAttribute('class');
		var newRowClass = (trClass == 'DarkColumnHL') ? 'DarkColumnHL' : null;
		var newRow2Class = (newRowClass == 'DarkColumnHL') ? null : 'DarkColumnHL';
		var tbody = incomeRow.parentNode;
		var newRow = tbody.insertRow(i + 1 + addedRows);
		newRow.setAttribute('class', newRowClass);
		for (var j = 0; j <= 3; j++) {
			newCell = newRow.insertCell(j);
			newCell.setAttribute('style', 'border-top-style: groove; border-top-width: thin;');
			newCell.setAttribute('height', 17);
			switch (j){
				case 0:
					newCell.innerHTML = "<b>&nbsp;&nbsp;" + monthDay + "</b>";
					break;
				case 1:
					newCell.innerHTML = "<b>Total</b>";
					break;
				case 2:
					newCell.innerHTML = "<b>" + dayIncome.toFixed(1) + "</b>";
					break;
				case 3:
					newCell.innerHTML = "<b>" + dayAmmount + "</b>";
					break;
				default:
					break;
			}
		}
		var newRow2 = tbody.insertRow(i + 2 + addedRows);
		newRow2.setAttribute('class', newRow2Class);
		newCell = newRow2.insertCell(0);
		newCell.setAttribute('colspan', 4);
		newCell.innerHTML = "&nbsp;";
		
		var monthDay = day;		
		var dayIncome = 0;
		var dayAmmount = 0;
		
		addedRows += 2;
	}
	
	if (i == (incomeNodes.snapshotLength - 1)) {
	
		//GM_log(income);
		dayIncome += income;
		//GM_log(dayIncome);
		dayAmmount += ammount;
		// GM_log(dayIncome);
		var trClass = incomeRow.getAttribute('class');
		var newRowClass = (trClass == 'DarkColumnHL') ? null : 'DarkColumnHL';
		var newRow2Class = (newRowClass == 'DarkColumnHL') ? null : 'DarkColumnHL';
		var tbody = incomeRow.parentNode;
		var newRow = tbody.insertRow(-1);
		newRow.setAttribute('class', newRowClass);
		for (var j = 0; j <= 3; j++) {
			newCell = newRow.insertCell(j);
			newCell.setAttribute('style', 'border-top-style: groove; border-top-width: thin;');
			newCell.setAttribute('height', 17);
			switch (j){
				case 0:
					newCell.innerHTML = "<b>&nbsp;&nbsp;" + monthDay + "</b>";
					break;
				case 1:
					newCell.innerHTML = "<b>Total</b>";
					break;
				case 2:
					newCell.innerHTML = "<b>" + dayIncome.toFixed(1) + "</b>";
					break;
				case 3:
					newCell.innerHTML = "<b>" + dayAmmount + "</b>";
					break;
				default:
					break;
			}
		}
	}
	
	//GM_log(income);
	dayIncome += income;
	//GM_log(dayIncome);
	dayAmmount += ammount;
}