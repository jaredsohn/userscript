// ==UserScript==
// @name           TableParse
// @namespace      ParsingTables
// @description    Table PArse testh
// @include        http://www.lostpower.com/game/itemmarket.php*
// ==/UserScript==


//var head = document.getElementsByTagName('HEAD');
//head[0].innerHTML +="<script src='http://www.joostdevalk.nl/code/sortable-table/current/sortable_us.js'></script>";
//var table = document.getElementsByTagName('table');
//table[0].innerhtml ="<table class='sortable' id='sortable_example'>";
var arTableRows = document.getElementsByTagName('tr');
arTableRows[0].innerHTML+="<th>Per</th>";
for (var i = arTableRows.length -1; i >= 0; i--) {
	var CurrRow = arTableRows[i];
	var arCells = CurrRow.getElementsByTagName('td');
	for (var j = arCells.length -1; j >= 0; j--) {
	var currCell = arCells[j];
	var iCellIndex = currCell.cellIndex;
	}
var itemcost = arCells[2].innerHTML.replace(/[^0-9]/g, '');
var numberof = arCells[1].innerHTML.replace(/[^0-9]/g, '');
var costper = itemcost/numberof;
if (costper <= 350000) {
	CurrRow.innerHTML+="<td align='center'><b><font color='red'>"+costper+"</font></b></td>";
	}	
	else {
		CurrRow.innerHTML+="<td align='center'>"+costper+"</td>";
	}
}


