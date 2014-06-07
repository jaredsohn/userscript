// ==UserScript==

// @name           Divider
// @description	   sets purchase value upon clicking
// @author	   Endy
// @namespace      DeNada
// @include        http://ww*.erepublik.com/*/exchange*
// @exclude        http://ww*.erepublik.com/*/exchange/create*

// ==/UserScript==

document.addEventListener('click', function(event) {
		// alert(event.target.className);

if (event.target.className == "ammount"){

if (document.getElementById("sell_currency_flag").title != "GOLD"){

var ammount = document.getElementById('sell_currency_account_float_amount').value;

var temp = event.target.id;
temp = temp.replace('form_amount_accept_','exchange_value_amount_');

var rate = document.getElementById(temp).innerHTML;

temp = temp.replace('exchange_value_amount_','initial_amount_');
var possible = document.getElementById(temp).innerHTML;


// ammount/rate

var buy = ammount/rate;


//trim decimals

buy = buy*100;
buy = buy + "a";
var stuff = buy.split('\.');
buy = stuff[0]/100;


// update value
event.target.value = buy;
}

}

}, true);