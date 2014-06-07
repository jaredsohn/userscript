// ==UserScript==
// @name        Order View 4.2 "COMLETE"
// @namespace   http://printing.arc.losrios.edu/DSF/Admin/ProductionJobTicket.aspx?
// @description PRESS COMPLETE IF ONLY ONE ORDER LOADED ON THE PAGE
// @include     http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx*
// @version     1.0.04
// ==/UserScript==

//Puts "Auto Complete is ON" in red text on top of the page
document.getElementById("ctl00_ctl00_C_M_LabelFacility").innerHTML="Auto Complete is ON";
document.getElementById("ctl00_ctl00_C_M_LabelFacility").style.color="red";

//Changes order status to "Completed"
(function completed() {
a=document.getElementsByTagName("a")[19];
b = a.getAttribute("id");
	if (b !=="ctl00_ctl00_HLLanguage") {
 //	alert("More than one order");
	//Disables "Auto Complete" Button
	document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_ButtonComplete').disabled=true;
		a=document.getElementsByTagName("a")[20];
		b = a.getAttribute("id");
		if (b =="ctl00_ctl00_HLLanguage") {
//		alert("Only one order");
		//Enables "Auto Complete" on the next page
		document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_ButtonComplete').disabled=false;
		//**************HIT COMLETE BUTTON***************
		document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_ButtonComplete').click();
		}
	}
	if (b =="ctl00_ctl00_HLLanguage") {
 //	alert("Only one order");
	//**************HIT COMLETE BUTTON***************
	document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_ButtonComplete').click();
	}
})();

