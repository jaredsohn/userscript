// ==UserScript==
// @name        BTC-E - LTC - Eur to Gbp
// @namespace   Sxx
// @include     https://btc-e.com/exchange/ltc_eur
// @version     1.6
// @grant       none
// ==/UserScript==
var eur_to_gbp_modifier = 0.84; // Edit this to change €->£ rate.
var buy_in = 276 // Edit this to change how much you have bought in.
    
var base_ltc_string = "Sell LTC";
function show_gbp_amount(){
	var balance_ltc_element = document.getElementsByClassName("money_ltc");
	var ltc_in_use = balance_ltc_element[0].innerHTML;
	var ltc_to_eur_modifier = document.getElementById("max_price").innerHTML;
	var balance_in_gbp = parseFloat(ltc_in_use * ltc_to_eur_modifier * eur_to_gbp_modifier).toFixed(4);
	var profit = parseFloat(balance_in_gbp - buy_in).toFixed(2);
	var header_elements = document.getElementsByTagName("h1");
	header_elements[1].innerHTML = base_ltc_string+' <small>('+balance_in_gbp+'/'+buy_in+'/'+profit+')</small> <a id="refresh_button" onclick="return false;" href="">&#x21bb;</a>';
	var refresh_button = document.getElementById("refresh_button");
	refresh_button.addEventListener('click', show_gbp_amount, true);
}
     
show_gbp_amount();

