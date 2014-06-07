// JavaScript Document
// ==UserScript==
// @name           BYBS Ikariam Ally Sorter
// @autor          domz
// @email          domz_fort@yahoo.com
// @namespace      domz
// @description    A little script that sorts the Ikariam Ally Members by score
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==


function getPos(row) {
	// Return the score value
	return parseInt(row.cells[4].innerHTML.replace(/,/,""));
	//return parseInt(row.cells[(row.cells.length - 3)].innerHTML.replace(/,/,""));
}

function sortAlly() {
	// Return if we are not in the ally page (thanks to Luca Saba)
	if(document.getElementById('memberList') == null) return;
	// Sort the ally table
	var table, i, rows, min, max, newRow, newCell;
	table = document.getElementById('memberList');
	
	// Add a column (for rank) and remove an unused column
	newHead = table.tHead.rows[0];
	newHead.innerHTML = "<th></th>" + newHead.innerHTML.replace("<th></th>","");

	max = table.rows.length;
	for (i=0; i<max -1; i++)
    {
	  // Select the minimum row score
	  min = findMin(i, table);
      newRow = table.insertRow(1);
	  if ( i % 2 == 1) {
		newRow.setAttribute('class', 'alt');
	  }
	  newRow.insertCell(0);
	  var slice = 1;
      for (c=1; c<6 /* -- */; c++)	  
        {
		  if (c>2) slice = 0;
		  // Copy the row to the top of the table
		  newCell = newRow.insertCell(c);
		  newCell.setAttribute('class', table.rows[findMin(i+2, table)].cells[c-slice].getAttribute('class'));
		  newCell.innerHTML = table.rows[findMin(i+2, table)].cells[c-slice].innerHTML;
		}
	  // Add rank number	
	  newRow.cells[0].innerHTML=(max-i-1)+".";			
	  table.deleteRow(findMin(i+2, table));
    }		
}

function findMin(index, sTable) {
  // Finds the minimum value for remaining rows
  var pos, currentMin;
  currentMin = index;
  for (i = index; i < sTable.rows.length; i++) {
  	if ( getPos(sTable.rows[i]) < getPos(sTable.rows[currentMin]) )
		{
			currentMin=i;
		}
  }
  return currentMin;
}


// ++++++++++++++++ Start +++++++++++++++++
sortAlly();
// +++++++++++++++++ End ++++++++++++++++++