// ==UserScript==
// @name           Show MasterCoin Purchases
// @namespace      dacoinminster
// @description    When viewing the Exodus Address, display how many MasterCoins were purchased
// @include        http*://blockchain.info/address/1EXoDusjGwvnjZUyKkxZ4UHEf77z6A5S4P*
// @grant          none
// ==/UserScript==

var body_source = document.body.innerHTML;


var tx_loc = body_source.indexOf("<div id=\"tx-");
var mastercoin_total = 0;
var end_date = new Date("2013/09/01 00:00:00");

while(tx_loc > 0) {
	tx_id = body_source.substring(tx_loc + 9, tx_loc + 20);
	tx_html = document.getElementById(tx_id).innerHTML;
	date_loc = tx_html.indexOf("2013-0");
	date_str = tx_html.substring(date_loc, date_loc + 19).replace(/-/g,'/');
	purchase_date = new Date(date_str);
	date_diff = (end_date - purchase_date)/1000/60/60/24/7;
	if(date_diff > 0) {
		bonus_pct = date_diff * 0.1;
        	btc_start_loc = tx_html.lastIndexOf("\">") + 2;
		btc_end_loc = tx_html.lastIndexOf(" BTC");
		btc_amount = tx_html.substring(btc_start_loc, btc_end_loc).replace(/,/g,'');
		initial_purchase_amount = btc_amount*100;
		initial_purchase_amount = Math.round(initial_purchase_amount*Math.pow(10,8))/Math.pow(10,8);
		bonus_purchased = btc_amount * 100 * bonus_pct;
		bonus_purchased = Math.round(bonus_purchased*Math.pow(10,8))/Math.pow(10,8);
		amount_purchased = initial_purchase_amount + bonus_purchased;
		amount_purchased = Math.round(amount_purchased*Math.pow(10,8))/Math.pow(10,8);
		mastercoin_total += amount_purchased;
		document.getElementById(tx_id).innerHTML = tx_html + "<div align=\"right\">(" + initial_purchase_amount + " + " + bonus_purchased  + " = <strong>" + amount_purchased + "</strong> MasterCoins purchased)</div>";
	}
	body_source = body_source.substring(tx_loc + 1);
	tx_loc = body_source.indexOf("<div id=\"tx-");
}
mastercoin_total = Math.round(mastercoin_total*Math.pow(10,8))/Math.pow(10,8);
document.getElementById(tx_id).innerHTML = document.getElementById(tx_id).innerHTML + "<br>" + "<div align=\"right\">Total MasterCoins Purchased: <strong>" + mastercoin_total + "</strong></div>";
