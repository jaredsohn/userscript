// ==UserScript==
// @name           Placements IITB page
// @namespace      http://placements.iitb.ac.in/placements/
// @description    Beautify your IITB placement (JAFs) page
// @include        http://placements.iitb.ac.in/placements/studjaf4stud.jsp
// ==/UserScript==

//Default theme
//r[i].style.backgroundColor = "#f3f3f3";
//r[i].style.color="#000000";

document.body.style.background = "#ffffff";

var tables=document.getElementsByTagName("table");

var r = tables[0].rows;
var i=0;
for(i=8; i < r.length - 3; i++ )
{
	r[i].style.backgroundColor = "#f3f3f3";
	r[i].style.color="#000000";
	var str = r[i].cells[12].innerHTML;
	if(str.search("Not Eligible!!") > -1)
	{
		r[i].cells[10].innerHTML="<img src='http://www.cse.iitb.ac.in/~mayurma/images/haha.jpg' />";
	}
}


//Creating extra row for dropdown lists
var fifthRow = tables[0].insertRow(5);
var cell1=fifthRow.insertCell(0);
var cell2=fifthRow.insertCell(1);
var cell3=fifthRow.insertCell(2);
var cell4=fifthRow.insertCell(3);
var cell5=fifthRow.insertCell(4);
var cell6=fifthRow.insertCell(5);
var cell7=fifthRow.insertCell(6);
var cell8=fifthRow.insertCell(7);
var cell9=fifthRow.insertCell(8);
var cell10=fifthRow.insertCell(9);
var cell11=fifthRow.insertCell(10);
var cell12=fifthRow.insertCell(11);
var cell13=fifthRow.insertCell(12);

//Set theme dropdown list in cell5
var aryThemes = new Array();

aryThemes[0] = "Default";
aryThemes[1] = "Grey-Red";
aryThemes[2] = "Peach";
aryThemes[3] = "Aqua";

var themeOptions="<option value=''>Choose Theme</option>";
for(var i=0;i<aryThemes.length;i++)
{
	themeOptions+="<option value='" + aryThemes[i] + "'>" + aryThemes[i] + "</option>";
}
  
cell5.innerHTML = cell5.innerHTML + "<select id='themeSetter'>" + themeOptions + "<select>";

//Adding the load event to the dropdown
var oSelect= document.getElementById("themeSetter");
oSelect.addEventListener("change",loadTheme,true);


function loadTheme()
{
  var selectedValue = document.getElementById("themeSetter").options[document.getElementById("themeSetter").options.selectedIndex].value;
  var r = tables[0].rows;
  if(selectedValue == "Default")
  {
	document.body.style.background = "#ffffff";
	for(i=9; i < r.length - 3; i++ )
	{
	r[i].style.backgroundColor = "#f3f3f3";
	r[i].style.color="#000000";
	}
  }
  else if(selectedValue == "Grey-Red")
  {
	document.body.style.background = "#ffffff";
	for(i=9; i < r.length - 3; i++ )
	{
	r[i].style.backgroundColor = "#c8c8c8";
	r[i].style.color="#ff0000";
	}
  }
  else if(selectedValue == "Peach")
  {
	document.body.style.background = "#FFD39B";
	for(i=9; i < r.length - 3; i++ )
	{
	r[i].style.backgroundColor = "#FF9966";
	r[i].style.color="#000000";
	}
  }
  else if(selectedValue == "Aqua")
  {
	document.body.style.background = "#F5F5F5";
	for(i=9; i < r.length - 3; i++ )
	{
	r[i].style.backgroundColor = "#40E0D0";
	r[i].style.color="#000000";
	}
  }
}



//List of options to user
var aryTopics = new Array();

aryTopics[0] = "All";
aryTopics[1] = "Unsigned";
aryTopics[2] = "Signed";
aryTopics[3] = "Not Eligible";
aryTopics[4] = "Closed JAFs";

//Creating a drop down menu with the above options
var options="<option value=''>Filter Options</option>";

for(var i=0;i<aryTopics.length;i++)
{
	options+="<option value='" + aryTopics[i] + "'>" + aryTopics[i] + "</option>";
}
  
cell13.innerHTML = cell13.innerHTML + "<select id='gsFilter'>" + options + "<select>";
  
//Adding the load event to the dropdown
var oSelect= document.getElementById("gsFilter");
oSelect.addEventListener("change",loadPage,true);

function loadPage()
{
  var selectedValue = document.getElementById("gsFilter").options[document.getElementById("gsFilter").options.selectedIndex].value;
  var r = tables[0].rows;
  var i=0;
  if(selectedValue == "Unsigned")
  {
	showUnsigned();
  }
  else if(selectedValue == "Signed")
  {
	showSigned();
  }
  else if(selectedValue == "Closed JAFs")
  {
	showClosedJAFs();
  }
  else if(selectedValue == "Not Eligible")
  {
	showNotEligible();
  }
  else if(selectedValue == "All")
  {
	showAll();
  }
}


function showAll()
{
var r = tables[0].rows;
var i=0;
for(i=9; i < r.length - 3; i++ )
  {
	var row = tables[0].rows[i];
	row.style.display = '';
  }
}

function showNotEligible()
{
var r = tables[0].rows;
var i=0;
for(i=9; i < r.length - 3; i++ )
  {
	var str = r[i].cells[12].innerHTML;
	if(str.search("Not Eligible!!") < 0)
	{
		var row = tables[0].rows[i];
		row.style.display = 'none';
	}
	else
	{
		var row = tables[0].rows[i];
		row.style.display = '';
	}
  }
}


function showClosedJAFs()
{
var r = tables[0].rows;
var i=0;
for(i=9; i < r.length - 3; i++ )
  {
	var str = r[i].cells[12].innerHTML;
	if(str.search("Jaf Closed") < 0)
	{
		var row = tables[0].rows[i];
		row.style.display = 'none';
	}
	else
	{
		var row = tables[0].rows[i];
		row.style.display = '';
	}
  }
}

function showSigned()
{
var r = tables[0].rows;
var i=0;
for(i=9; i < r.length - 3; i++ )
  {
	var str = r[i].cells[12].innerHTML;
	if(str.search("unsign") < 0)
	{
		var row = tables[0].rows[i];
		row.style.display = 'none';
	}
	else
	{
		var row = tables[0].rows[i];
		row.style.display = '';
	}
  }
}

function showUnsigned()
{
var r = tables[0].rows;
var i=0;
for(i=9; i < r.length - 3; i++ )
  {
	var str = r[i].cells[12].innerHTML;
	if(str.search("unsign") > -1 || str.search("Jaf Closed") > -1 || str.search("Not Eligible!!") > -1)
	{
		var row = tables[0].rows[i];
		row.style.display = 'none';
	}
	else
	{
		var row = tables[0].rows[i];
		row.style.display = '';
	}
  }
}