// ==UserScript==
// @name       EventBrite FreeCheckout
// @namespace  Bogdan
// @version    0.4
// @description 
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==

var quant = 2;
var quantity = document.getElementsByTagName('select');

if (document.querySelectorAll('page_eventview').length && document.querySelectorAll('.ticket_table_select').length > 0) {
	quantity[0].value = quant;
	freeCheckout();
} else if (!document.querySelectorAll('#page_registration').length) {
	location.reload();
}