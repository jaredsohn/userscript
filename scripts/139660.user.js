// ==UserScript==
// @name        Bb CE Map Converter
// @namespace   uk.co.cumquat.www
// @description Converts table for Word and writes into iFrame.
// @include     http://vle.imperial.ac.uk/webct/cobaltMainFrame.dowebct
// @version     1
// ==/UserScript==
//Make sure script is working
//alert("test");
//Add an iFrame below the table
//1. get the table element
//2. create the table element
//3. append the table
///html/body/form/table/tbody/tr[4]/td/table/tbody/tr
//Get table
var table = document.evaluate("//*[@id='datatable']", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//Get table rows
var tableRows = document.evaluate("//*[@id='datatable']//tr[1]", 
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

//Define objects

//Make container
var container = document.createElement('table');

var containerRow = document.createElement('tr');
var containerCell = document.createElement('td');

containerRow.appendChild(containerCell.cloneNode(true));
containerRow.appendChild(containerCell.cloneNode(true));

//Set alignment
containerRow.lastChild.vAlign = 'top';

container.appendChild(containerRow);

//Make reconfigured table and put in container. Also text carrier.
var newTable = document.createElement('table');
newTable.id = 'migrationTable';
newTable.width = 800;

var htmlTxt = '';

containerRow.firstChild.appendChild(newTable);
newTable.border = 1;

//Make text area and put in container
var tf = document.createElement('textarea');
tf.cols = 50;
tf.rows = 10;

containerRow.lastChild.appendChild(tf);

//Make refresh button
var btn = document.createElement('input');
btn.type = 'button';
btn.value = 'Refresh';
btn.onclick = function(){
	
	writeHTML();
	
}
containerRow.lastChild.appendChild(btn);

//Make save title
var title = document.evaluate("//h3", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = title.snapshotLength - 1; i >= 0; i--) {
	if(title.snapshotItem(i) != null)
	{
		var saveTitleTxt = title.snapshotItem(i).innerHTML.replace(/ /g, "_") +' '+title.snapshotItem(i).innerHTML;
		title.snapshotItem(i).innerHTML = saveTitleTxt;
	}
	
}


if(table.snapshotItem(0) != null)
{
	
	//for (var i = tableRows.snapshotLength - 1; i >= 0; i--) {
	for (i = 0; i < tableRows.snapshotLength; i++) {
		if(i > 1)
		{
			var newRow = tableRows.snapshotItem(i).cloneNode(true);
			newTable.appendChild(newRow);	
		}	
	}
	
	table.snapshotItem(0).parentNode.appendChild(container);
	
	
	//Correct table
	var rows = newTable.getElementsByTagName("tr");
	
	//Find number columns
	var columns = 0;
	
	for (i=0; i<rows.length; i++) 
	{
		var row = rows[i];
		var cells = row.getElementsByTagName("td");
		
		if(cells.length > columns){
			columns = cells.length;
		}
	}
	
	//Extra columns
	var extraColumns = 2;
	
	for (i=0; i<rows.length; i++) 
	{
		var row = rows[i];
		cells = row.getElementsByTagName("td");
		
		
		for(var j=0; j<cells.length; j++)
		{
			if(columns - cells.length + extraColumns > 0 )
			{	
				var padding = document.createElement('td');
				//padding.innerHTML = '&nbsp;';
				
				var sel = document.createElement('select');
				sel.name = 'select';
				sel.onchange = function()
				{
					writeHTML();
				}
				
				var op1 = document.createElement('option');
				var op2 = document.createElement('option');
				var op3 = document.createElement('option');
				var op4 = document.createElement('option');
				var op5 = document.createElement('option');
				var op6 = document.createElement('option');
				
				op1.value = 'BLANK';
				op1.innerHTML = '&nbsp;';
				
				op2.value = 'Course Content';
				op2.innerHTML = 'Course Content';
				
				op3.value = 'Assessment';
				op3.innerHTML = 'Assessment';
				
				op4.value = 'MOVE';
				op4.innerHTML = 'MOVE';
				
				op5.value = 'DELETE';
				op5.innerHTML = 'DELETE';
				
				op6.value = 'Discover & Learn';
				op6.innerHTML = 'Discover & Learn';
				
				//ignore first row
				if(i>0){
				
					//Last column
					if(cells.length == columns + extraColumns -1)
					{	
						sel.appendChild(op1);
						sel.appendChild(op2);
						sel.appendChild(op3);
						sel.appendChild(op6);
						padding.appendChild(sel);
					}
					
					//Second to last column
					if(cells.length == columns + extraColumns -2)
					{	
						sel.appendChild(op1);
						sel.appendChild(op4);
						sel.appendChild(op5);
						
						padding.appendChild(sel);
					}

				}
				row.appendChild(padding);
			}
		}
			
	}
	addAdditionalContent();
	
	writeHTML();
	

}

function addAdditionalContent(){
	
	var img = document.createElement('img');
	img.src = 'images/om_menu_folder_closed.gif';
	img.align = 'absmiddle';
	img.border = '0';
	
	var del = document.createElement('td');
	del.appendChild(document.createTextNode('DELETE'));
	
	var toDo = document.createElement('td');
	var sel = document.createElement('select');
	sel.name = 'select';
	sel.onchange = function()
	{
		writeHTML();
	}
	toDo.appendChild(sel);
	
	var destination = document.createElement('td');
	var sel1 = document.createElement('select');
	sel1.name = 'select';
	sel1.onchange = function()
	{
		writeHTML();
	}
	destination.appendChild(sel1);
	
	var op1 = document.createElement('option');
	var op2 = document.createElement('option');
	var op3 = document.createElement('option');
	var op4 = document.createElement('option');
	var op5 = document.createElement('option');
	var op6 = document.createElement('option');

	op1.value = 'BLANK';
	op1.innerHTML = '&nbsp;';
	
	op2.value = 'Discover & Learn';
	op2.innerHTML = 'Discover & Learn';
	
	op3.value = 'Assessments';
	op3.innerHTML = 'Assessments';
	
	op4.value = 'MOVE';
	op4.innerHTML = 'MOVE';
	
	op5.value = 'DELETE';
	op5.innerHTML = 'DELETE';
	
	op6.value = 'See special instructions below';
	op6.innerHTML = 'See special instructions below';
	
	sel.appendChild(op1);
	sel.appendChild(op4);
	sel.appendChild(op5);
	sel.appendChild(op6);
	
	sel1.appendChild(op1.cloneNode());
	sel1.appendChild(op2.cloneNode());
	sel1.appendChild(op3.cloneNode());
	
	var information = document.createElement('td');
	var img1 = img.cloneNode();
	information.appendChild(img1);
	information.appendChild(document.createTextNode('Information'));
	
	var assessments = document.createElement('td');
	var img2 = img.cloneNode();
	assessments.appendChild(img2);
	assessments.appendChild(document.createTextNode('Assessments'));
	
	var assignments = document.createElement('td');
	var img3 = img.cloneNode();
	assignments.appendChild(img3);
	assignments.appendChild(document.createTextNode('Assignments'));
	
	var lms = document.createElement('td');
	var img4 = img.cloneNode();
	lms.appendChild(img4);
	lms.appendChild(document.createTextNode('Learning Modules'));
	
	var links = document.createElement('td');
	var img5 = img.cloneNode();
	links.appendChild(img5);
	links.appendChild(document.createTextNode('Web Links'));
	
	var medLib = document.createElement('td');
	var img7 = img.cloneNode();
	medLib.appendChild(img7);
	medLib.appendChild(document.createTextNode('Media Library'));
	
	var title = document.createElement('td');
	var txt = document.createTextNode('Special Instructions: Below');
	title.appendChild(txt);
	
	var specialInstructions = document.createElement('td');
	var tArea = document.createElement('textarea');
	tArea.onchange = function()
	{
		writeHTML();
	}
	
	tArea.innerHTML = 'No special instructions';
	tArea.id = 'specialInstructions';
	tArea.cols = 50;
	tArea.rows = 10;
	specialInstructions.appendChild(tArea);

	newTable.appendChild(makeRow(information.cloneNode(), del.cloneNode()));
	newTable.insertBefore(makeRow(assessments.cloneNode(), toDo.cloneNode(), destination.cloneNode()), newTable.firstChild);
	newTable.appendChild(makeRow(assessments.cloneNode(), toDo.cloneNode(), destination.cloneNode()));
	newTable.appendChild(makeRow(assignments.cloneNode(), toDo.cloneNode(), destination.cloneNode()));
	newTable.appendChild(makeRow(lms.cloneNode(), toDo.cloneNode(), destination.cloneNode()));
	newTable.appendChild(makeRow(links.cloneNode(), toDo.cloneNode(), destination.cloneNode()));
	newTable.appendChild(makeRow(medLib.cloneNode(), del.cloneNode()));
	newTable.appendChild(makeRow(null, title.cloneNode()));
	newTable.appendChild(makeRow(null, specialInstructions.cloneNode()));
}

function writeHTML(){
	var finalTable = document.getElementById('migrationTable');
	var finalTableClone = finalTable.cloneNode(true);
	
	var finalSelects = finalTable.getElementsByTagName('select');
	var finalSelectsClone = finalTableClone.getElementsByTagName('select');
	
	var finalInstructions = finalTable.getElementsByTagName('textarea')[0];
	var finalInstructionsClone = finalTableClone.getElementsByTagName('textarea')[0];
	var finalValue = finalInstructions.value;
	finalInstructionsClone.parentNode.innerHTML = finalValue;

	for (i = finalSelects.length - 1; i >= 0; i--)
	{
		var finalSelect = finalSelects[i];
		var finalOptions = finalSelect.getElementsByTagName('option');
		var finalValue = finalOptions[finalSelect.selectedIndex].innerHTML;
		
		
		finalSelectsClone[i].parentNode.innerHTML = finalValue;
	}
	
	//Tidy up HTML
	var hrefs = finalTableClone.getElementsByTagName('a');
	
	for (i = hrefs.length - 1; i >= 0; i--)
	{
		hrefs[i].parentNode.removeChild(hrefs[i]);
	}
	
	//Add non-breaking spaces to cells
	var allCells = finalTableClone.getElementsByTagName('td');
	for(i=0; i < allCells.length; i++)
	{
			var spacer = document.createTextNode('&nbsp;');
			allCells[i].appendChild(spacer);
	}
	
	
	
	var textReplace = finalTableClone.outerHTML.replace(/\/webct\//g, '');
	textReplace = textReplace.replace(/Home Page/, 'Course Content');
	
	
	
	
	tf.innerHTML = textReplace;
}

function makeRow(a,b,c,d,e){
	var aRow = document.createElement('tr');
	
	for(i=0; i<columns + extraColumns; i++){
		
		var aCell = document.createElement('td');
		aRow.appendChild(aCell);

		if(i==0)
		{	
			if(a != null)
			{
				aRow.replaceChild(a, aCell);
			}

		}
		
		if(i==1)
		{
			if(b != null)
			{
				aRow.replaceChild(b, aCell);
			}
		}
		
		if(i==2)
		{
			if(c != null)
			{
				aRow.replaceChild(c, aCell);
			}
		}
		
		if(i==3)
		{
			if(d != null)
			{
				aRow.replaceChild(d, aCell);
			}
		}
		
		if(i==4)
		{
			if(e != null)
			{
				aRow.replaceChild(e, aCell);
			}
		}
		
															  
	}
	return aRow;
}

/*var frame = document.createElement('iframe');
frame.width = 300;
frame.height = 300;*/