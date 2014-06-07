// ==UserScript==
// @name           Monetary Market Güvenlik Scripti
// @include        http://ww*.erepublik.com/*/exchange/create*
// ==/UserScript==


//Uyarı eklentisi
var junk = document.getElementById('form_amount');

junk.addEventListener('input', Update, false);

var stuff = document.getElementById('form_exchange_rate');

stuff.addEventListener('input', Update, false);


var crap = document.getElementById('submit_save_button');

var newElement = document.createElement('div');
newElement.innerHTML = '<div></div>';

crap.parentNode.insertBefore(newElement, crap.nextSibling);

function Update()
{
var final = stuff.value * junk.value;

var currency_id  = document.getElementsByClassName('currency forminfo change_ajax_buy_currency');
newElement.innerHTML = '<div>' + final + ' ' + currency_id[0].innerHTML + '</div>';


var sell = document.getElementById('sell_currency');

	if (stuff.value>0 && stuff.value<1){

		if ( sell.value=="62"){
			alert("Dikkat Et Goldlarini ucuza satiyorsun!!");
		}

	}

}
