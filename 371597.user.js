// ==UserScript==
			   // @name           TEST
			   // @namespace      www.vally.in
			   // @description    Multi user quick book of e-ticket.
			   // @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
			   // @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
			   // @include        https://*irctc.co.in/*
			   // @include        http://*irctc.co.in/*
			   // ==/UserScript==
 


fillform2();
function fillform2()
{
var form = document.forms.namedItem('BookTicketForm');

form.elements.namedItem('day').value='02';
form.elements.namedItem('month').value='1';
form.elements.namedItem('ticketType').checked=true;
    var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = form.elements.namedItem('quota');
    elmDeleted.parentNode.removeChild(elmDeleted);
	form.elements.namedItem('quota').checked=true;
	form.elements.namedItem('qt').value='CK';
form.elements.namedItem('mobileNumber').value='9322157274';
form.elements.namedItem('gatewayID').value='24';


}
