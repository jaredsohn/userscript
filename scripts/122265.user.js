// ==UserScript==
// @name			Cebu Pacific Script Local
// @description	         	Itinerary redirect
// @version			1.0
// @include			https://book.cebupacificair.com/ManageBooking.aspx
// @copyright		 2011 Copyrighted parts may not be reproduced without written consent
// ==/UserScript==
document.getElementById("buttonPrintReceipt").onclick=function(){window.location="https://book.cebupacificair.com/printItineraryReceipt.aspx"};