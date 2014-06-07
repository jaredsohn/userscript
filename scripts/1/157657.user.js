// ==UserScript==
// @name          Joel's multi-order highlighter
// @namespace     http://www.userscripts.org
// @description   A script that will highlight orders with more than one item.
// @include       https://www.etsy.com/your/orders/*
// ==/UserScript==

var oqlis = document.getElementsByClassName('item-quantity');
var oqstring = '';

for (i=0;i<oqlis.length;i++)
{
	oqstring = oqlis[i].innerHTML.replace(/\D/g,'');
	
	if (oqstring != '1') {
		oqlis[i].style.color = 'red';
	}
}