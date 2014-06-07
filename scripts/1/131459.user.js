// ==UserScript==
// @name           Order View 1
// @namespace      http://printing.arc.losrios.edu/DSF/Admin/ProductionJobTicket.aspx?
// @description    Disables Navigation Bar, Enter Feature, Focus & Signature,Changes status to Printed
// @include        http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx*
// @version        1.0.03
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
//Set Highlights contents of the text box
document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl02_OrderViewHeader_TextBoxFilter").select();

//Puts "GreaseMonkey Scripts Loaded" in red text on the bottom of the page
document.getElementById("ctl00_ctl00_poweredByLBL").innerHTML="GreaseMonkey Scripts Loaded";
document.getElementById("ctl00_ctl00_poweredByLBL").style.color="red";

//Puts "Auto Printed mode is ON" in red text on top of the page
document.getElementById("ctl00_ctl00_C_M_LabelFacility").innerHTML="Auto Printed mode is ON";
document.getElementById("ctl00_ctl00_C_M_LabelFacility").style.color="green";

//Increase Font size for job status and odrer number.
document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_LinkButtonStatus").style.fontSize="medium";
document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_HyperLinkOrderNumber").style.fontSize="medium";

(function printed() {
a=document.getElementsByTagName("a")[19];
b = a.getAttribute("id");
	if (b !=="ctl00_ctl00_HLLanguage") {
//	alert("More than one order");
	//Disables "Auto Complete" on the next page
	document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_ButtonComplete').disabled=true;
	//Disables the Status Linck
	//document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_DropDownListStatus').disabled=true;
		z=document.getElementsByTagName("a")[20];
		b = z.getAttribute("id");
		if (b =="ctl00_ctl00_HLLanguage") {
//		alert("Only one order D");
		var stt=document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_LinkButtonStatus").innerHTML;
			if (stt =="In Production") {
			//Enables "Auto Complete" on the next page
			document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_ButtonComplete').disabled=false;
			//Enables the Status Linck
			//document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_DropDownListStatus').disabled=false;
			var firstorder = document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_HyperLinkOrderNumber").innerHTML;
			//Click The Staus Link
			document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_LinkButtonStatus").click();
			alert("Your'e about to change status of the order # " + firstorder + " to Pinted"+ '\n' + "Press OK to continue");
			var kx = document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_DropDownListStatus');
			kx.click();
			kx.options[7].selected=true;
			document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl02_OrderViewHeader_ButtonFilter').click();
			}
		}
	}
	if (b =="ctl00_ctl00_HLLanguage") {
//	alert("Only one order A");
	var stt=document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_LinkButtonStatus").innerHTML;
		if (stt =="In Production") {
		//Click The Staus Link
		var firstorder = document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_HyperLinkOrderNumber").innerHTML;
		document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_LinkButtonStatus").click();
		alert("Your'e about to change status of the order # " + firstorder + " to Pinted"+ '\n' + "Press OK to continue");
		var kx = document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_DropDownListStatus');
		kx.click();
		kx.options[7].selected=true;
		document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl02_OrderViewHeader_ButtonFilter').click();
		}
	}
})();




