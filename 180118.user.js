// ==UserScript==
// @name        eBay Ship actions
// @namespace   http://bo33b.dyndns.org
// @include     http://k2b-bulk.ebay.com/ws/eBayISAPI.dll?SalesRecordConsole&status=Wait*
// @include     http://k2b-bulk.ebay.com/ws/eBayISAPI.dll?MyEbaySellingSoldListingsAction
// @include     http://k2b-bulk.ebay.com/ws/eBayISAPI.dll
// @include     http://k2b-print.ebay.com/ws/eBayISAPI.dll
// @version     2.1
// @grant       none
// ==/UserScript==

if (document.title.indexOf('Sold Listings') > 1) {

	document.title = "eBay Selling Manager";
	elem = document.getElementById('v4-21_anc');
	elem.innerHTML = "<b>Print Labels and Packing Slips</b>";
	elem.onclick = function(){document.getElementById('v4-22_mu_3_anch').click()};

} else if (document.title.indexOf('Print for w') > 1) {

	document.title = "Please Wait";
	function doClick(num) {
		var i,inputs=document.getElementsByTagName('input');
		for (i in inputs) if (inputs[i].name=='printTemplate') inputs[i].value=num;
		document.getElementById('frmSubmit').target = "_blank";
		document.getElementById('frmSubmit').submit();
	}
	doClick(2);  // slips
	doClick(4);  // labels
	history.go(-1);

} else if (document.title.indexOf('Print Invoice') > 1) {

	document.title = "Print Packing Slips";
	document.getElementById('InvoicePrintAnchor').innerHTML = '<input type="button"'+
	' value="~ PRINT ~" style="position:fixed;top:220px;left:220px;font:48px Arial"'+
	' onclick="this.style.display=\'none\'; setTimeout(function(){window.print();'+
	' window.close()},400);" />';

} else if (document.title.indexOf('Print Address Label') > 1) {

	document.title = "Print Address Labels";

}
