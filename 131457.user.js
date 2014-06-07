// ==UserScript==
// @name           Order View 3
// @namespace      http://printing.arc.losrios.edu/DSF/Admin/ProductionJobTicket.aspx?
// @description    Click The Status Link 
// @include        http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx
// @version        1.0.00
// ==/UserScript==


//http://wiki.greasespot.net/Content_Scope_Runner
//http://blog.bogojoker.com/category/greasemonkey/


  //Click The Staus Link
document.getElementById('ctl00_ctl00_C_M_DataGridOrders_ctl03_OrderViewItem_LinkButtonStatus').click();
