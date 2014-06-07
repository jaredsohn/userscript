// ==UserScript==
// @name           testAnchorOnClick
// @namespace      http://userscripts.org
// @include        http://www.google.com/
// ==/UserScript==

function testingFunction()
{
	alert("test function");
}

function addData(newTable, list)
{
	// Create row to hold the info
	var newRow = document.createElement('tr');
	var newCol = document.createElement('td');


	// Create a line holding each of the strings retrieved from the list
	var innerTable = document.createElement('table');
	for each(var string in list) {
		var innerRow = document.createElement('tr');
		var innerCol1 = document.createElement('td');
		innerCol1.setAttribute('width','75');
		var fontEl = document.createElement('font');
		fontEl.setAttribute('size', '2');
		var anchorEl = document.createElement('a');
		var methodCall = 'javascript:addToFavorites("'+string+'");';
		//anchorEl.addEventListener('click', function(string){ return function() {
		//						alert("test"); }
		//						}(string),true);
		//anchorEl.onClick = testingFunction;
		anchorEl.setAttribute('href', 'javascript:void(0)');

		anchorEl.addEventListener('click', function(event){ alert("test");}, false);      // Here is the event listener

		anchorEl.innerHTML = 'Click Me';
		fontEl.appendChild(anchorEl);
		innerCol1.appendChild(fontEl);
		innerRow.appendChild(innerCol1);
		var innerCol2 = document.createElement('td');
		innerCol2.setAttribute('class','bodytext');
		innerCol2.innerHTML += string;
		innerRow.appendChild(innerCol2);
		innerTable.appendChild(innerRow);
	}
	newCol.appendChild(innerTable);


	// First and last col's which are blank. Used just for looks.
	colFiller1 = document.createElement('td');
	colFiller1.setAttribute('width', '30');
	colFiller2 = document.createElement('td');
	colFiller2.setAttribute('width', '30');

	// Put everything in place.
	newRow.appendChild(colFiller1);
	newRow.appendChild(newCol);
	newRow.appendChild(colFiller2);
	newTable.appendChild(newRow);
}



var table = document.getElementsByTagName('table')[0];

var newTable = document.createElement('table');
var newList = [];
for(i=1;i<5;i++)
	newList.push("some string "+i);

addData(newTable, newList);
table.parentNode.appendChild(newTable);