// ==UserScript==
// @name           Order View 2
// @namespace     http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx 
// @description    Coditional Scripts
// @include        http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx
// @version        1.0.00
// ==/UserScript==


//Wipes out code below if only one order loaded
//document.getElementById("ctl00_ctl00_C_M_DataGridOrders_ctl04_OrderViewItem_HyperLinkOrderNumber").innerHTML;

(function o() {
//Displays correct, but I can't do anything with it
var stt=document.getElementById("ctl00_ctl00_C_M_lblDueDateTime").innerHTML;
var patt=/tus:/g;
var result=patt.test(stt);
 if (result==Monday){
alert("True"); 
}
 else
      {
   //   alert("FALSE");
      }
})();

//Disables "Auto Complete" on the next page
document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_ButtonComplete').disabled=true;
//Disables the Status Linck
document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_DropDownListStatus').disabled=true;

