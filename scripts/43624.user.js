// 11x11 game show user info user script
// version 0.2 BETA!
// 2009-03-02
// Copyright (c) 2009, Aleh Krutsikau
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          11x11 Update finance page
// @namespace     http://krolser.com/
// @description   Show how much money you earn per day.
// @include       http://www.11x11.ru/finances*
// @include       http://www.11x11.ru/xml/office/finances.php*
// ==/UserScript==

// --------- Drag Functions   -----

var GLOBAL_CSS = <><![CDATA[
td.total {	
	text-align : right;
}
.positive {
	background-color : #EFE;
	color : green;	
}
.negative {
	background-color : #FEE;
	color : red;	
}
]]></>.toXMLString();

// --------- Helper Functions -----

function addGlobalStyle(css){	
	var elmHead,elmStyle;
	elmHead = document.getElementsByTagName('head')[0];	
	if (!elmHead){return;}	
	elmStyle = document.createElement('style');
	elmStyle.type ='text/css';
	elmStyle.innerHTML = css;
	elmHead.appendChild(elmStyle);
}
// -------- Functions ---------------

function getMoney(str) {
	
	var sign = str.substr(1,1);	
	var strWithOutSign = str.substr(2);
	
	var colns = strWithOutSign.split(".");
	
	var res = 0;
	var mult = 1;
	
	var i = colns.length - 1;
	while (0 <= i) {
		res += parseInt(colns[i])*mult;
		mult *= 1000;
		i--;
	}
	return sign == '+' ? res : -res;
}

// ---------- Main Code -------------

var allMainTables, thisMainTable;
var allA, thisA;
var allTd, thisTd;
var allTr, thisTr;

allMainTables = document.evaluate(
    "//table[@class='maintable']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allMainTables.snapshotLength; i++) {	
	thisMainTable = allMainTables.snapshotItem(i);		
    // do something with mainTable
	
	allTr = document.evaluate(
		    ".//tr[position()>1]",
		    thisMainTable,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
	var currentMoney = 0;
	var currentDate; 
	
	for (var j = 0; j < allTr.snapshotLength - 1; j++) {
		thisTr = allTr.snapshotItem(j);
		
		var date = thisTr.cells[0].textContent.split(" ")[0];
		var money = getMoney(thisTr.cells[2].textContent);
		
		if (date != currentDate) {
			
			if (currentDate) {
				var totalRow = thisTr.parentNode.insertRow(thisTr.rowIndex);
				totalRow.className = "total";
				
			    var dateCell  = totalRow.insertCell(0);
			    dateCell.innerHTML = currentMoney;
			    dateCell.className = "total";
			    dateCell.colSpan = 3;			    
			    // fake cell
			    dateCell  = totalRow.insertCell(1);
			    
			    // change color
			    totalRow.className = currentMoney < 0 ? "total negative" : "total positive";
			}			
			currentMoney = money;
			currentDate = date;
		} else {
			currentMoney += money; 
		}
	}
}
	
addGlobalStyle(GLOBAL_CSS);

// ✖,▲,▼,←,↑,→,↓; 


