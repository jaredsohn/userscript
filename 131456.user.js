// ==UserScript==
// @name           Order View 4 "COMLETE"
// @namespace      http://printing.arc.losrios.edu/DSF/Admin/ProductionJobTicket.aspx?
// @description    PRESS COMPLETE IF ONLY ONE ORDER LOADED ON THE PAGE
// @include        http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx
// @version        1.0.00
// ==/UserScript==


document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl02_OrderViewHeader_TextBoxFilter").blur();
//**************HIT COMLETE BUTTON***************
document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_ButtonComplete').click();

//Set Focus on Tex Box
document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl02_OrderViewHeader_TextBoxFilter").focus();
//Set Highlights contents of the text box
document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl02_OrderViewHeader_TextBoxFilter").select();

//Puts "Auto Complete is ON" in red text on top of the page
document.getElementById("ctl00_ctl00_C_M_LabelFacility").innerHTML="Auto Complete is ON";
document.getElementById("ctl00_ctl00_C_M_LabelFacility").style.color="red";

