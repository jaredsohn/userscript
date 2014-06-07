// ==UserScript==
// @name           ANZ cc currentbalance
// @namespace      http://userscripts.org/users/201640
// @description    shows you the correct current balance according to available funds
// @include        https://*.anz.com/IBAU/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	var credit_card_limit = 18000;
	var elem = $('#AcctsListOperative td:contains(Credit Card)');
	var current_balance_cell = elem.parent().children('td:eq(2)');
	var available_funds_cell = elem.parent().children('td:eq(3)');
	calculation = credit_card_limit-parseFloat(available_funds_cell.text().trim().replace(/[^0-9\.-]/g,''));
	$('<span style="color: red; font-weight: bold">$' + calculation.toFixed(2) + '</span>').prependTo(current_balance_cell).hide().fadeIn();
});