// ==UserScript==
			   // @name           SINGLE FROM
			   // @namespace      www.vally.in
			   // @description    Single user quick book of e-ticket.
			   // @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
			   // @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
			   // @include        https://*irctc.co.in/*
			   // @include        http://*irctc.co.in/*
			   // ==/UserScript==
 


fillform2();
function fillform2()
{
var form = document.forms.namedItem('BookTicketForm');
form.elements.namedItem('stationFrom').value='DADAR (DR)';
form.elements.namedItem('stationTo').value='NEW DELHI (NDLS)';
form.elements.namedItem('boardPoint').value=form.elements.namedItem('stationFrom').value;
form.elements.namedItem('day').value='12';
form.elements.namedItem('month').value='1';
form.elements.namedItem('year').value='2011';
form.elements.namedItem('classCode').value='Sleeper Class(SL)';
form.elements.namedItem('trainNo').value='11057';
form.elements.namedItem('ticketType').checked=true;
    var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	form.elements.namedItem('quota').checked=true;
	form.elements.namedItem('qt').value='CK';
form.elements.namedItem('passengers[0].passengerName').value='AKASH PANDEY ';
form.elements.namedItem('passengers[0].passengerAge').value='23';
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
