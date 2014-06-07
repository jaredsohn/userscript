// ==UserScript==
// @name        InterCoin Purchase
// @namespace   Commander InterCoin
// @include     http*://blockchain.info/address/1CHANGE34KLJjyapfMUtx9KyvqZvoCXzUt*
// @version     1
// @grant       none
// ==/UserScript==


var body_source = document.body.innerHTML;


var tx_loc = body_source.indexOf("<div id=\"tx-");
var intercoin_total = 0;
var end_date = new Date("2014/03/01 00:00:00");

while (tx_loc > 0) {
    tx_id = body_source.substring(tx_loc + 9, tx_loc + 21);
    tx_html = document.getElementById(tx_id).innerHTML;
    date_loc = tx_html.indexOf("201");
    date_str = tx_html.substring(date_loc, date_loc + 19).replace(/-/g, '/');
    purchase_date = new Date(date_str);
    date_diff = (end_date - purchase_date) / 1000 / 60 / 60 / 24 / 7;
    if (date_diff > 0) {
        bonus_pct = date_diff * 0.1;
        btc_start_loc = tx_html.lastIndexOf("\">") + 2;
        btc_end_loc = tx_html.lastIndexOf(" BTC");
        btc_amount = tx_html.substring(btc_start_loc, btc_end_loc).replace(/,/g, '');
        initial_purchase_amount = btc_amount * 1000;
        initial_purchase_amount = Math.round(initial_purchase_amount * Math.pow(10, 8)) / Math.pow(10, 8);
        bonus_purchased = btc_amount * 1000 * bonus_pct;
        bonus_purchased = Math.round(bonus_purchased * Math.pow(10, 8)) / Math.pow(10, 8);
        //amount_purchased = initial_purchase_amount + bonus_purchased;
        amount_purchased = initial_purchase_amount;
        amount_purchased = Math.round(amount_purchased * Math.pow(10, 8)) / Math.pow(10, 8);
        intercoin_total += amount_purchased;
        document.getElementById(tx_id).innerHTML = tx_html + "<div align=\"right\">" + " <strong>" + amount_purchased + " INC </strong> InterCoins purchased </div>";
    }
    body_source = body_source.substring(tx_loc + 1);
    tx_loc = body_source.indexOf("<div id=\"tx-");
}
intercoin_total = Math.round(intercoin_total * Math.pow(10, 8)) / Math.pow(10, 8);
document.getElementById(tx_id).innerHTML = document.getElementById(tx_id).innerHTML + "<br>" + "<div align=\"right\">Total InterCoins Purchased: <strong>" + intercoin_total + "</strong></div>";