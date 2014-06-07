// ==UserScript==
// @name           Southwest Airlines Check-in All Passengers
// @namespace      zansstuff.com
// @description    After you click the "Retrieve Reservation" button on the "Passenger Information" page, this script selects all passengers on the "Check In and Print Travel Documents" page and automatically clicks the "Print Selected Document(s)" button.
// @include        http://www.southwest.com/flight/selectPrintDocument.html*
//This is NOT an auto-check-in script. It only saves you the time of manually clicking the check-boxes on the "Check In and Print Travel Documents" page. However, every second counts!
//After you click the "Retrieve Reservation" button on the "Passenger Information" page, this script selects all passengers on the "Check In and Print Travel Documents" page and automatically clicks the "Print Selected Document(s)" button. Saves you the time of clicking the check-boxes and button manually.
// ==/UserScript==
window.aa=document.getElementById('checkinOptions');
for (var i=0; i < window.aa.elements.length; i++){window.aa.elements[i].checked = true;}
document.getElementById('printDocumentsButton').click();