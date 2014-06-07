// ==UserScript==
// @name           Total Resources for Travian3 Beyond - ML&CN
// @namespace      seveq
// @version        1.0.1.1
// @description    Extension for Travian3 Beyond - ML&CN adding a row to the village list with the total resources; REQUIRES T3 Beyond - ML&CN!!!
// @include        http://*.travian*.*/*.php*
// ==/UserScript==

function appendSumRow(dataArray, activeCellArray, elm)
{
	var sumRow = document.createElement("tr");
	var dotTD = document.createElement("td");
	dotTD.className = "dot";
	dotTD.innerHTML = "●";
	
	var headerTD = document.createElement("td");
	headerTD.colSpan = "2";
	headerTD.innerHTML = "Total: ";
	headerTD.style.fontWeight="bold";
	sumRow.appendChild(dotTD);
	sumRow.appendChild(headerTD);
	
	for(var iSum = 3; iSum < dataArray.length; iSum++)
	{
		var sumTD = document.createElement("td");
		var imgTD = document.createElement("td");

		if(activeCellArray[iSum])
		{
			if(activeCellArray[iSum].nodeName && activeCellArray[iSum].nodeName == "IMG")
			{
				var node = activeCellArray[iSum].cloneNode(true);
				logMe("Image: " + node);
				sumTD.appendChild(node);
			}
			else
			{
				sumTD.innerHTML = ""+dataArray[iSum];
				if(dataArray[iSum] < 0) sumTD.style.color="red";
			}
		}
		sumRow.appendChild(sumTD);
	}
	
	
	elm.insertBefore(sumRow, elm.firstChild);
}

function logMe(data)
{
	// unsafeWindow.console.log(data);
	GM_log(data);
}

function initArray(count)
{
	var theArray = new Array(count);
	for(var i = 0; i < count; i++) theArray[i] = 0;
	return theArray;
}

function parseResources()
{
	var vList = document.getElementById('vlist');
	var rows = vList.rows.length;
	
	var valArray = null;
	var sumArray = null;
	var activeCellArray = null;
	
	var longestRow = 0;
	for(var i = 0; i < rows; i++)
	{
		longestRow = Math.max(vList.rows[i].cells.length, longestRow);
	}
	
	valArray = initArray(longestRow);
	sumArray = initArray(longestRow);
	activeCellArray = initArray(longestRow);
	
	
	var rowsWithValues = initArray(rows);

	for(var i = 0; i < rows; i++)
	{
		var row = vList.rows[i];
		for(var j = 0; j < row.cells.length; j++)
		{
			var cell = row.cells[j];
			var val = parseInt(cell.innerHTML);
			
			if(!isNaN(val)) 
			{
				if(val > 0) rowsWithValues[i] = 1;
				sumArray[j] += val;
				activeCellArray[j]++;
			}
		}
	}
	
	for(var i = 0; i < rows; i++)
	{
		if(rowsWithValues[i] <= 0) continue;

		logMe("Fetching Images from Row " + i);

		var row = vList.rows[i];
		for(var j = 0; j < row.cells.length-1; j++)
		{
			var cell = row.cells[j];
			var img = cell.getElementsByTagName("IMG")[0];
			
			if(activeCellArray[j+1] > 0 && cell.firstChild.nodeName != "A" && img)
			{
				activeCellArray[j] = img;
			}
		}
	}
	
	var tBody = vList.getElementsByTagName("tbody")[0];
	appendSumRow(sumArray, activeCellArray, tBody);
}

function sumUp(inputArray, sumArray)
{
	if(sumArray.length != inputArray.length) throw "Array length must match";
	for(var i=0; i < inputArray.length; i++) 
	{
		sumArray[i] += inputArray[i];
	}
	return sumArray;
}

function svqFunctionMainTR()
{
	parseResources();
}

window.addEventListener('load', svqFunctionMainTR, false);
