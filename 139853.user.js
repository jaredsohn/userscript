// ==UserScript==
// @name        Order View 4.1 "ENTER"
// @namespace   http://printing.arc.losrios.edu/DSF/Admin/ProductionJobTicket.aspx?
// @description Disables Navigation Bar, Enter Feature, Focus & Signature
// @include     http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx*
// @version     1.0.03
// ==/UserScript==

//Disables Navigation list of selectebles
document.getElementById("ctl00_ctl00_TabNavigatorSFAdministration_QuickMenuSearch").disabled=true;
document.getElementById("ctl00_ctl00_TabNavigatorSFAdministration_QuickMenuSearch").blur();

//Disables the GO Button
document.getElementById("ctl00_ctl00_TabNavigatorSFAdministration_btnQuickNavGo").disabled=true;
document.getElementById("ctl00_ctl00_TabNavigatorSFAdministration_btnQuickNavGo").blur();

(function enter() {
  // Add a new Global Key Listener for `Enter`
  document.addEventListener("keypress", function(e) {
    if(!e) e=window.event;
    var key = e.keyCode ? e.keyCode : e.which;
    if ( key == 13 ) {
	document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl02_OrderViewHeader_ButtonFilter').click();
    }
  }, true);

})();

//Set Focus on Tex Box
document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl02_OrderViewHeader_TextBoxFilter").focus();
//Highlights contents of the text box
document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl02_OrderViewHeader_TextBoxFilter").select();

//Puts "GreaseMonkey Scripts Loaded" in red text on the bottom of the page
document.getElementById("ctl00_ctl00_poweredByLBL").innerHTML="GreaseMonkey Scripts Loaded";
document.getElementById("ctl00_ctl00_poweredByLBL").style.color="red";

//Changes font style on the order # and status
document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_HyperLinkOrderNumber").style.fontSize="medium";
document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_LinkButtonStatus").style.fontSize="medium";