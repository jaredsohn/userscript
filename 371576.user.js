// ==UserScript==
			   // @name           kanikram_rqbook_65
			   // @namespace      www.vally.in
			   // @description    Rapid data entry for quick book of e-ticket.
			   // @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do
			   // ==/UserScript==
 
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
	cell.style.color='white';
	cell.style.fontWeight='bold';
		var cellText = document.createTextNode('Fill ticket details');
		cell.appendChild(cellText);
	row.appendChild(cell);
	 tblBody.appendChild(row);
		cell.addEventListener('click', addthing, false);  
		tbl.appendChild(tblBody);
		 elmFoo1.parentNode.insertBefore(tbl, elmFoo1);
	}
		