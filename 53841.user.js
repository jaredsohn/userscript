// ==UserScript==
// @name           Bip
// @include        http://userscripts.org/scripts/show*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function skipWall() {
	if (!$('#pop_dialog_table').length) {
		window.setTimeout(skipWall,500);
		return false;
	}
	
	var skip = $('#pop_dialog_table div.dialog_buttons input[name="cancel"]');
	performClick(skip[0]);
	
	window.stop();
	
	clickPurchase();
}

function purchase() {
	if (!$('#pop_dialog_table').length) {
		window.setTimeout(purchase,1000);
		return false;
	}
	
	var bought = false
	
	var submit = $('#pop_dialog_table div.dialog_body input.inputsubmit[name="submit"]');
	if (submit.length) {
		performClick(submit[0]);
		bought = true;
	}
	
	var cancel = $('#pop_dialog_table div.dialog_content #dialog_button1');
	performClick(cancel[0]);
	
	++i;
	
	if (bought) {
		window.setTimeout(skipWall,500);
	}
	else {
}

function changePage() {
	var prev = $('div.pagination a:eq(0)');
	window.location = prev[0].href;
}

function clickPurchase() {
	if (i >= buy.length) {



var buy = $('div.right_col a.buy');

var i = 0;

if (buy.length) {
	clickPurchase();
}
else {
	if (window.location.href.indexOf('show/') === -1) {
		changePage();
	}
}