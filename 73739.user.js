// ==UserScript==
// @name           eRep Monetary Market Totals
// @version        0.12
// @description    Calculates totals for monetary market
// @author         Marko Kocic <marko.kocic@gmail.com>
// @namespace      http://userscripts.org/users/146767
// @include        http://ww*.erepublik.com/**/exchange*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

function totals() {
    var total = 0;
	var offer_list = $('span[id^="initial_amount_"]');
	for (var i = 0; i < offer_list.length; i++) {
        total += parseFloat (offer_list[i].innerHTML);
    }
	if (total > 0) {
		if ($('#total_sum').length == 0) {
			$('#table_list_offers tr:last').after('<tr><td id="total_sum">Total:</td><td id="total_val" colspan="3">' + total + '</td></tr>');
		} else {
			$('#total_val').innerHTML = total;
		}
	}
	setTimeout(totals, 200);
};
totals();
