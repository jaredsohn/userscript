// ==UserScript==
// @name          Verizon Wireless Payment Method - v0.2
// @namespace     http://userscripts.org/scripts/show/5212
// @description   When paying your Verizon Wireless bill online, it isn't very clear whether your paying by credit card or by debit.  Since Verizon Wireless perfers you to pay by debit, it's presented to you first.  This script makes it *very obvious* that you're paying by debit.
// @include       https://ebillpay.verizonwireless.com/vzw/payment/manual/input/submit.do
// ==/UserScript==

var table_cells = document.getElementsByTagName('td');
var search = /^\s+ATM Card/;

for (i = 0; i < table_cells.length; i++) {
     if (search.exec(table_cells[i].innerHTML)) {
	  GM_log(i + ": " + table_cells[i].innerHTML);
	  table_cells[i].innerHTML = "<h1 style='color: darkred'>** ATM CARD **</h1>";
	  var input_tags = document.getElementsByTagName('input');
	  var input_reg_exp = /\/vzw\/images\/btn_accept.gif/;
	  for (p = 0; p < input_tags.length; p++) {
	       if (input_reg_exp.exec(input_tags[p].src)) {
		    GM_log(p + ": " + input_tags[p].src);
/*		    input_tags[p].src = '';
		    input_tags[p].class = '';
		    input_tags[p].alt = '';*/
		    input_tags[p].type = 'hidden';

	       }
	  }
     }
}
