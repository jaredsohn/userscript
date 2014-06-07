// ==UserScript==
// @name        Bb CE Task Page Filter
// @namespace   uk.co.cumquat.www
// @description Adds filtering to page
// @include     http://vle.imperial.ac.uk/webct/cobaltMainFrame.dowebct
// @version     1
// ==/UserScript==
//Get the table and add some elements

var target = document.getElementById('datatable');
if(target != null)
{
	var tBody = target.getElementsByTagName('tbody')[0];
	var topRow = tBody.getElementsByTagName('tr')[0];
	
	//create extra row with cell
	var tRow = document.createElement('tr');
	var tCell = document.createElement('td');
	tCell.setAttribute('colspan', 7);
	
	//add the row in the right place
	tRow.appendChild(tCell);
	tBody.insertBefore(tRow, topRow);
	
	//create an input field
	var filter = document.createElement('input');
	filter.type = 'text';
	
	//create a button
	var doBtn = document.createElement('input');
	doBtn.type = 'button';
	doBtn.value = 'Filter';
	doBtn.onclick = function () {
		
		//get all the title elements;
		var rows = tBody.getElementsByTagName('span');
	
			for (var i = rows.length - 1; i >= 0; i--) {
				if(rows[i].title.indexOf(filter.value) == -1 )
				{
					rows[i].parentNode.parentNode.parentNode.removeChild(rows[i].parentNode.parentNode);
				}
			}
	
		
		}
	
	//add elements
	tCell.appendChild(filter);
	tCell.appendChild(doBtn);
}