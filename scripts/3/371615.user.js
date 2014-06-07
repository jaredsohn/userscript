// ==UserScript==
			   // @name           MUTIUSER FORM
			   // @namespace      www.vally.in
			   // @description    Multi user quick book of e-ticket.
			   // @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
			   // @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
			   // @include        https://*irctc.co.in/*
			   // @include        http://*irctc.co.in/*
			   // ==/UserScript==
 

		heading();
		showsubmit();
 function heading()
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
	cell.bgColor='#3399CC';
	cell.setAttribute('colspan', '20');
	cell.setAttribute('align', 'center');
	cell.style.color='white';
	var cellText = document.createTextNode('click on one ticket name');
	cell.appendChild(cellText);
	row.appendChild(cell);
	 tblBody.appendChild(row);
	 var row1='';
	 var row = document.createElement('tr');
    var cell = document.createElement('td');cell.bgColor='#B6DBED';cell.addEventListener('click', fillform0, false); 
	var cellText = document.createTextNode('0001');
	cell.appendChild(cellText);
	row.appendChild(cell);
    var cell = document.createElement('td');cell.bgColor='#9DFFCE';cell.addEventListener('click', fillform1, false); 
	var cellText = document.createTextNode('0002');
	cell.appendChild(cellText);
	row.appendChild(cell);
    var cell = document.createElement('td');cell.bgColor='#B6DBED';cell.addEventListener('click', fillform2, false); 
	var cellText = document.createTextNode('_#####_');
	cell.appendChild(cellText);
	row.appendChild(cell);
	var cell = document.createElement('td');cell.bgColor='#9DFFCE';cell.addEventListener('click', fillform3, false); 
	var cellText = document.createTextNode('####');
	cell.appendChild(cellText);
	row.appendChild(cell);
	
if(row1!=''){
	tblBody.appendChild(row1);
	}
	tblBody.appendChild(row);
	 tbl.appendChild(tblBody);
	elmFoo4.parentNode.insertBefore(tbl, elmFoo4);
	 tbl.setAttribute('border', '2');
	 tbl.setAttribute('align', 'center');
}
function fillform0()
{
var form = document.forms.namedItem('BookTicketForm');
form.elements.namedItem('stationFrom').value='LOKMANYATILAK T (LTT)';
form.elements.namedItem('stationTo').value='FAIZABAD JN (FD)';
form.elements.namedItem('boardPoint').value=form.elements.namedItem('stationFrom').value;
form.elements.namedItem('day').value='13';
form.elements.namedItem('month').value='4';
form.elements.namedItem('classCode').value='Sleeper Class(SL)';
form.elements.namedItem('trainNo').value='11067';
form.elements.namedItem('ticketType').checked=true;
form.elements.namedItem('passengers[0].passengerName').value='SHYAMLAL';
form.elements.namedItem('passengers[0].passengerAge').value='55';
form.elements.namedItem('passengers[0].passengerSex').value='m';
form.elements.namedItem('passengers[0].berthPreffer').value='Lower';
form.elements.namedItem('passengers[0].seniorCitizen').checked=false;
form.elements.namedItem('passengers[1].passengerName').value='RAJPATI';
form.elements.namedItem('passengers[1].passengerAge').value='45';
form.elements.namedItem('passengers[1].passengerSex').value='f';
form.elements.namedItem('passengers[1].berthPreffer').value='lower';
form.elements.namedItem('passengers[1].seniorCitizen').checked=false;
form.elements.namedItem('passengers[2].passengerName').value='POOJA';
form.elements.namedItem('passengers[2].passengerAge').value='11';
form.elements.namedItem('passengers[2].passengerSex').value='f';
form.elements.namedItem('passengers[2].berthPreffer').value='Middle';
form.elements.namedItem('passengers[2].seniorCitizen').checked=false;
form.elements.namedItem('passengers[3].passengerName').value='';
form.elements.namedItem('passengers[3].passengerAge').value='';
form.elements.namedItem('passengers[3].passengerSex').value='';
form.elements.namedItem('passengers[3].berthPreffer').value='';
form.elements.namedItem('passengers[3].seniorCitizen').checked=false;
form.elements.namedItem('passengers[4].passengerName').value='';
form.elements.namedItem('passengers[4].passengerAge').value='';
form.elements.namedItem('passengers[4].passengerSex').value='';
form.elements.namedItem('passengers[4].berthPreffer').value='';
form.elements.namedItem('passengers[4].seniorCitizen').checked=false;
form.elements.namedItem('passengers[5].passengerName').value='';
form.elements.namedItem('passengers[5].passengerAge').value='';
form.elements.namedItem('passengers[5].passengerSex').value='';
form.elements.namedItem('passengers[5].berthPreffer').value='';
form.elements.namedItem('passengers[5].seniorCitizen').checked=false;
form.elements.namedItem('childPassengers[0].childPassengerName').value='';
form.elements.namedItem('childPassengers[0].childPassengerAge').value='';
form.elements.namedItem('childPassengers[0].childPassengerSex').value='';
form.elements.namedItem('childPassengers[1].childPassengerName').value='';
form.elements.namedItem('childPassengers[1].childPassengerAge').value='';
form.elements.namedItem('childPassengers[1].childPassengerSex').value='';
form.elements.namedItem('mobileNumber').value='9322157274';
form.elements.namedItem('gatewayID').value='4';
form.elements.namedItem('Submit').click();

}
function fillform1()

{
var form = document.forms.namedItem('BookTicketForm');
form.elements.namedItem('stationFrom').value='DADAR (DR)';
form.elements.namedItem('stationTo').value='RENIGUNTA JN (RU)';
form.elements.namedItem('boardPoint').value=form.elements.namedItem('stationFrom').value;
form.elements.namedItem('day').value='13';
form.elements.namedItem('month').value='1';
form.elements.namedItem('classCode').value='Sleeper Class(SL)';
form.elements.namedItem('trainNo').value='12163';
form.elements.namedItem('ticketType').checked=true;
    var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	form.elements.namedItem('quota').checked=true;
	form.elements.namedItem('qt').value='CK';
form.elements.namedItem('passengers[0].passengerName').value=' B NIRANJAN ';
form.elements.namedItem('passengers[0].passengerAge').value='30';
form.elements.namedItem('passengers[0].passengerSex').value='m';
form.elements.namedItem('passengers[0].berthPreffer').value='Lower';
form.elements.namedItem('passengers[0].seniorCitizen').checked=false;
form.elements.namedItem('passengers[1].passengerName').value='';
form.elements.namedItem('passengers[1].passengerAge').value='';
form.elements.namedItem('passengers[1].passengerSex').value='';
form.elements.namedItem('passengers[1].berthPreffer').value='';
form.elements.namedItem('passengers[1].seniorCitizen').checked=false;
form.elements.namedItem('passengers[2].passengerName').value='';
form.elements.namedItem('passengers[2].passengerAge').value='';
form.elements.namedItem('passengers[2].passengerSex').value='';
form.elements.namedItem('passengers[2].berthPreffer').value='';
form.elements.namedItem('passengers[2].seniorCitizen').checked=false;
form.elements.namedItem('passengers[3].passengerName').value='';
form.elements.namedItem('passengers[3].passengerAge').value='';
form.elements.namedItem('passengers[3].passengerSex').value='';
form.elements.namedItem('passengers[3].berthPreffer').value='';
form.elements.namedItem('passengers[3].seniorCitizen').checked=false;
form.elements.namedItem('passengers[4].passengerName').value='';
form.elements.namedItem('passengers[4].passengerAge').value='';
form.elements.namedItem('passengers[4].passengerSex').value='';
form.elements.namedItem('passengers[4].berthPreffer').value='';
form.elements.namedItem('passengers[4].seniorCitizen').checked=false;
form.elements.namedItem('passengers[5].passengerName').value='';
form.elements.namedItem('passengers[5].passengerAge').value='';
form.elements.namedItem('passengers[5].passengerSex').value='';
form.elements.namedItem('passengers[5].berthPreffer').value='';
form.elements.namedItem('passengers[5].seniorCitizen').checked=false;
form.elements.namedItem('childPassengers[0].childPassengerName').value='';
form.elements.namedItem('childPassengers[0].childPassengerAge').value='';
form.elements.namedItem('childPassengers[0].childPassengerSex').value='';
form.elements.namedItem('childPassengers[1].childPassengerName').value='';
form.elements.namedItem('childPassengers[1].childPassengerAge').value='';
form.elements.namedItem('childPassengers[1].childPassengerSex').value='';
form.elements.namedItem('mobileNumber').value='9322157274';
form.elements.namedItem('gatewayID').value='4';
form.elements.namedItem('Submit').click();
}

function fillform2()
{
var form = document.forms.namedItem('BookTicketForm');
form.elements.namedItem('stationFrom').value='SURAT (ST)';
form.elements.namedItem('stationTo').value='PANVEL (PNVL)';
form.elements.namedItem('boardPoint').value=form.elements.namedItem('stationFrom').value;
form.elements.namedItem('classCode').value='Sleeper Class(SL)';
form.elements.namedItem('trainNo').value='16333';
form.elements.namedItem('ticketType').checked=true;
    var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	form.elements.namedItem('quota').checked=true;
	form.elements.namedItem('qt').value='CK';
form.elements.namedItem('passengers[0].passengerName').value='vijay v';
form.elements.namedItem('passengers[0].passengerAge').value='38';
form.elements.namedItem('passengers[0].passengerSex').value='m';
form.elements.namedItem('passengers[0].berthPreffer').value='Lower';
form.elements.namedItem('passengers[0].seniorCitizen').checked=false;
form.elements.namedItem('passengers[1].passengerName').value='';
form.elements.namedItem('passengers[1].passengerAge').value='';
form.elements.namedItem('passengers[1].passengerSex').value='';
form.elements.namedItem('passengers[1].berthPreffer').value='';
form.elements.namedItem('passengers[1].seniorCitizen').checked=false;
form.elements.namedItem('passengers[2].passengerName').value='';
form.elements.namedItem('passengers[2].passengerAge').value='';
form.elements.namedItem('passengers[2].passengerSex').value='';
form.elements.namedItem('passengers[2].berthPreffer').value='';
form.elements.namedItem('passengers[2].seniorCitizen').checked=false;
form.elements.namedItem('passengers[3].passengerName').value='';
form.elements.namedItem('passengers[3].passengerAge').value='';
form.elements.namedItem('passengers[3].passengerSex').value='';
form.elements.namedItem('passengers[3].berthPreffer').value='';
form.elements.namedItem('passengers[3].seniorCitizen').checked=false;
form.elements.namedItem('passengers[4].passengerName').value='';
form.elements.namedItem('passengers[4].passengerAge').value='';
form.elements.namedItem('passengers[4].passengerSex').value='';
form.elements.namedItem('passengers[4].berthPreffer').value='';
form.elements.namedItem('passengers[4].seniorCitizen').checked=false;
form.elements.namedItem('passengers[5].passengerName').value='';
form.elements.namedItem('passengers[5].passengerAge').value='';
form.elements.namedItem('passengers[5].passengerSex').value='';
form.elements.namedItem('passengers[5].berthPreffer').value='';
form.elements.namedItem('passengers[5].seniorCitizen').checked=false;
form.elements.namedItem('childPassengers[0].childPassengerName').value='';
form.elements.namedItem('childPassengers[0].childPassengerAge').value='';
form.elements.namedItem('childPassengers[0].childPassengerSex').value='';
form.elements.namedItem('childPassengers[1].childPassengerName').value='';
form.elements.namedItem('childPassengers[1].childPassengerAge').value='';
form.elements.namedItem('childPassengers[1].childPassengerSex').value='';
form.elements.namedItem('gatewayID').value='4';
form.elements.namedItem('Submit').click();


}

function fillform3()
{
var form = document.forms.namedItem('BookTicketForm');
form.elements.namedItem('stationFrom').value='LOKMANYATILAK T (LTT)';
form.elements.namedItem('stationTo').value='VIJAYAWADA JN (BZA)';
form.elements.namedItem('boardPoint').value=form.elements.namedItem('stationFrom').value;
form.elements.namedItem('day').value='04';
form.elements.namedItem('month').value='11';
form.elements.namedItem('classCode').value='Sleeper Class(SL)';
form.elements.namedItem('trainNo').value='2750';
form.elements.namedItem('ticketType').checked=true;
    var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	form.elements.namedItem('quota').checked=true;
	form.elements.namedItem('qt').value='CK';
form.elements.namedItem('passengers[0].passengerName').value='ravindra';
form.elements.namedItem('passengers[0].passengerAge').value='29';
form.elements.namedItem('passengers[0].passengerSex').value='m';
form.elements.namedItem('passengers[0].berthPreffer').value='Lower';
form.elements.namedItem('passengers[0].seniorCitizen').checked=false;
form.elements.namedItem('passengers[1].passengerName').value='';
form.elements.namedItem('passengers[1].passengerAge').value='';
form.elements.namedItem('passengers[1].passengerSex').value='';
form.elements.namedItem('passengers[1].berthPreffer').value='';
form.elements.namedItem('passengers[1].seniorCitizen').checked=false;
form.elements.namedItem('passengers[2].passengerName').value='';
form.elements.namedItem('passengers[2].passengerAge').value='';
form.elements.namedItem('passengers[2].passengerSex').value='';
form.elements.namedItem('passengers[2].berthPreffer').value='';
form.elements.namedItem('passengers[2].seniorCitizen').checked=false;
form.elements.namedItem('passengers[3].passengerName').value='';
form.elements.namedItem('passengers[3].passengerAge').value='';
form.elements.namedItem('passengers[3].passengerSex').value='';
form.elements.namedItem('passengers[3].berthPreffer').value='';
form.elements.namedItem('passengers[3].seniorCitizen').checked=false;
form.elements.namedItem('passengers[4].passengerName').value='';
form.elements.namedItem('passengers[4].passengerAge').value='';
form.elements.namedItem('passengers[4].passengerSex').value='';
form.elements.namedItem('passengers[4].berthPreffer').value='';
form.elements.namedItem('passengers[4].seniorCitizen').checked=false;
form.elements.namedItem('passengers[5].passengerName').value='';
form.elements.namedItem('passengers[5].passengerAge').value='';
form.elements.namedItem('passengers[5].passengerSex').value='';
form.elements.namedItem('passengers[5].berthPreffer').value='';
form.elements.namedItem('passengers[5].seniorCitizen').checked=false;
form.elements.namedItem('childPassengers[0].childPassengerName').value='';
form.elements.namedItem('childPassengers[0].childPassengerAge').value='';
form.elements.namedItem('childPassengers[0].childPassengerSex').value='';
form.elements.namedItem('childPassengers[1].childPassengerName').value='';
form.elements.namedItem('childPassengers[1].childPassengerAge').value='';
form.elements.namedItem('childPassengers[1].childPassengerSex').value='';
form.elements.namedItem('gatewayID').value='9';
form.elements.namedItem('Submit').click();

}

	function showsubmit()
	{
		var form = document.forms.namedItem('BookTicketForm');
var elmFoo4 = form.elements.namedItem('arrtime');
var line2 = document.createElement('br');
	elmFoo4.parentNode.insertBefore(line2, elmFoo4);
var tbl     = document.createElement('table');
    var tblBody = document.createElement('tbody');
	var row = document.createElement('tr');
    var cell = document.createElement('td');
	cell.bgColor='#3399CC';
	cell.setAttribute('colspan', '20');
	cell.setAttribute('align', 'center');
	cell.style.color='white';
 var elmNewContent0 = document.createElement('div');
 elmNewContent0.appendChild(document.createTextNode('Submit'));
 elmNewContent0.style.fontsize=10;
	elmNewContent0.style.color='black';
	elmNewContent0.style.fontWeight='bold';
	elmNewContent0.style.align='center';
 cell.appendChild(elmNewContent0);
 cell.addEventListener('click',submitbutton, false);
	row.appendChild(cell);
	tblBody.appendChild(row);
	tbl.appendChild(tblBody);
	elmFoo4.parentNode.insertBefore(tbl, elmFoo4);
	tbl.setAttribute('border', '2');
	tbl.setAttribute('align', 'center');
		}
var form = document.forms.namedItem('BookTicketForm');
var timelabel = document.createElement('button');
timelabel.type='button';
function submitbutton(){
form.elements.namedItem('Submit').click();
}
			 
