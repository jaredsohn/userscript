// ==UserScript==
			   // @name           hari>>POWER
			   // @namespace      hari>>>super>>>timer
			   // @description    IRCTC OUTO GO
			   // @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/bookticket.do*
			   // @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/bookticket.do*
			   // @include        https://irctc.co.in/cgi-bin/bv60.dll/irctc/booking/bookticket.do*
			   // ==/UserScript==
  function heading()
     {
		var form = document.forms.namedItem('BookTicketForm');
		var futurebutton = document.createElement('label');
		var elmFoo1 = form.elements.namedItem('arrtime');
		var tbl     = document.createElement('table');
    var tblBody = document.createElement('tbody');
	var row = document.createElement('tr');
    var cell = document.createElement('td');
	cell.bgColor='Black';
	cell.setAttribute('colspan', '20');
	cell.setAttribute('align', 'center');
	cell.style.color='Yellow';
	cell.style.fontWeight='Bold';
		var cellText = document.createTextNode('SUPER PROCESS');
		cell.appendChild(cellText);
	row.appendChild(cell);
	 tblBody.appendChild(row);
		cell.addEventListener('click', addthing, false);  
		tbl.appendChild(tblBody);
		 elmFoo1.parentNode.insertBefore(tbl, elmFoo1);
	}
		heading();
 function addthing()
{
	var form = document.forms.namedItem('BookTicketForm');
	var elmFoo4 = form.elements.namedItem('arrtime');
	var line2 = document.createElement('br');
	elmFoo4.parentNode.insertBefore(line2, elmFoo4);
	var line2 = document.createElement('br');
	elmFoo4.parentNode.insertBefore(line2, elmFoo4);
	var tbl     = document.createElement('table');
    var tblBody = document.createElement('tbody');var row = document.createElement('tr');
var cell = document.createElement('td');
	cell.bgColor='Blue';
	cell.setAttribute('colspan', '20');
	cell.setAttribute('align', 'center');
	cell.style.color='white';
	var cellText = document.createTextNode('');
	cell.appendChild(cellText);
	row.appendChild(cell);
	 tblBody.appendChild(row);
	 var row1='';
	 var row = document.createElement('tr');
    var cell = document.createElement('td');cell.bgColor='Aqua';cell.addEventListener('click', fillform0, false); 
	var cellText = document.createTextNode('SUBMIT AT 8:00:01');
	cell.appendChild(cellText);
	row.appendChild(cell);
if(row1!=''){
	tblBody.appendChild(row1);
	}
