// ==UserScript==
// @name           vPopulus orders
// @namespace      Anatoxin
// @version        0.02
// @date           2012-01-25
// @description    vPopulus battle orders in main page
// @include        *.vpopulus.*
// ==/UserScript==

var address = 'orders_address';            // the full address of page with orders

var orderbox = document.getElementById('events');
if  (orderbox) {
var orders = document.createElement("div");
    orders.innerHTML = '<div class="searchholder" id="searchholder"><b>Military orders:</b><br/>' + 
'<iframe src="' + address + '" width="333" height="111" frameborder="0" allowTransparency="true"></iframe>' + 
'</div>';

var targetElement = document.getElementById('events');
var origHTML = targetElement.innerHTML;
	 
targetElement.innerHTML = orders.innerHTML + origHTML;
	
}