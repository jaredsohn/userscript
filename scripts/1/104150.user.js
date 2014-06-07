// ==UserScript==
			   // @name           Ticket Reservation
			   // @namespace      www.ram.com
			   // @description    Rapid data entry for Plan My Travel.
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
		var cellText = document.createTextNode('GO PROCESS');
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
	var cellText = document.createTextNode('SUBMIT AT 7:59:51');
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
form.elements.namedItem('passengers[0].passengerName').checked=true;
form.elements.namedItem('passengers[0].passengerAge').checked=true;
form.elements.namedItem('passengers[0].passengerSex').checked=true;
form.elements.namedItem('passengers[0].berthPreffer').checked=true;
form.elements.namedItem('passengers[0].seniorCitizen').checked=false;
form.elements.namedItem('passengers[1].passengerName').checked=true;
form.elements.namedItem('passengers[1].passengerAge').checked=true;
form.elements.namedItem('passengers[1].passengerSex').checked=true;
form.elements.namedItem('passengers[1].berthPreffer').checked=true;
form.elements.namedItem('passengers[1].seniorCitizen').checked=false;
form.elements.namedItem('passengers[2].passengerName').checked=true;
form.elements.namedItem('passengers[2].passengerAge').checked=true;
form.elements.namedItem('passengers[2].passengerSex').checked=true;
form.elements.namedItem('passengers[2].berthPreffer').checked=true;
form.elements.namedItem('passengers[2].seniorCitizen').checked=false;
form.elements.namedItem('passengers[3].passengerName').checked=true;
form.elements.namedItem('passengers[3].passengerAge').checked=true;
form.elements.namedItem('passengers[3].passengerSex').checked=true;
form.elements.namedItem('passengers[3].berthPreffer').checked=true;
form.elements.namedItem('passengers[3].seniorCitizen').checked=false;
form.elements.namedItem('passengers[4].passengerName').checked=true;
form.elements.namedItem('passengers[4].passengerAge').checked=true;
form.elements.namedItem('passengers[4].passengerSex').checked=true;
form.elements.namedItem('passengers[4].berthPreffer').checked=true;
form.elements.namedItem('passengers[4].seniorCitizen').checked=false;
form.elements.namedItem('passengers[5].passengerName').checked=true;
form.elements.namedItem('passengers[5].passengerAge').checked=true;
form.elements.namedItem('passengers[5].passengerSex').checked=true;
form.elements.namedItem('passengers[5].berthPreffer').checked=true;
form.elements.namedItem('passengers[5].seniorCitizen').checked=false;
form.elements.namedItem('childPassengers[0].childPassengerName').value='';
form.elements.namedItem('childPassengers[0].childPassengerAge').value='';
form.elements.namedItem('childPassengers[0].childPassengerSex').value='';
form.elements.namedItem('childPassengers[1].childPassengerName').value='';
form.elements.namedItem('childPassengers[1].childPassengerAge').value='';
form.elements.namedItem('childPassengers[1].childPassengerSex').value='';
//form.elements.namedItem('Submit').click();
timeshow();
showsubmit();
}
function timeshow()
			   {
 		var today=new Date();
		var h=today.getHours();
		var m=today.getMinutes();
		var s=today.getSeconds();
		m=checkTime1(m);
		s=checkTime1(s);
		if(h<8){
			kk();
			}
				   }
function kk()
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
	var cellText = document.createTextNode('AUTO SUBMIT AT 7:59:51');
	cell.appendChild(cellText);
	row.appendChild(cell);
	tblBody.appendChild(row);
    cell.addEventListener('click',pp, false); 
	tbl.appendChild(tblBody);
	elmFoo4.parentNode.insertBefore(tbl, elmFoo4);
	tbl.setAttribute('border', '2');
	tbl.setAttribute('align', 'center');
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
 elmNewContent0.appendChild(document.createTextNode('SUBMIT'));
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
			    function timeshow1()
			   {
 		var today=new Date();
		var h=today.getHours();
		var m=today.getMinutes();
		var s=today.getSeconds();
		m=checkTime1(m);
		s=checkTime1(s);
		timelabel.innerHTML='';
		timelabel.innerHTML=h+':'+m+':'+s;
		if(h==7 &&m==59 && s==51){
		timelabel.style.visibility='hidden';
			form.elements.namedItem('Submit').click();
			}
		var timet=timelabel.innerHTML;
		timelabel.style.color='black';
		timelabel.style.fontWeight ='bold';
		timelabel.style.fontSize ='23';
		timelabel.name='detailvally';
		var elmFoo1 = form.elements.namedItem('arrtime');
		elmFoo1.parentNode.insertBefore(timelabel, elmFoo1);
				   }
				function pp(){
				   for(k=1;k<1000;k++){
			  setTimeout(function seco(){
				timeshow1();
				},k*1000);}}
//	seco();
function checkTime1(i)
{
if (i<10)
{
i='0' + i;
}
return i;
}

