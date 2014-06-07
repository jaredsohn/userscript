// ==UserScript==
// @name           Monetary Market Tracker
// @namespace      eRepublik
// @version        1.2
// @description    This will show you the monetary market and remove invite friends
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var localCurrencyId = 0;
var localCurrencyValue = 0.0;
var goldCurrencyValue = 0.0;
var localCountryName = '';
var localCountryCurrency = '';

function moneymod_getConversionRate( first, second, callback ) {
	$.get( 'http://www.erepublik.com/en/exchange/listOffers?select_page=select&buy_currency_history_id=buy_currencies%3D' + first + '&sell_currency_history_id=sell_currencies%3D' + second + '&account_type=citizen-&action_path=listOffers&page=page%3D1', callback, 'text' );
}

function moneymod_finalize() {
	$("#moneymod_goldvalue").html(goldCurrencyValue);
	$("#moneymod_gold").html("Gold");
	$("#moneymod_moneyname").html(localCountryCurrency);
	$("#moneymod_moneyvalue").html(localCurrencyValue);
}

function moneymod_Userbar2() {
	moneymod_getConversionRate( localCurrencyId, '62', function( data ) {
		var found = /<span class=\"special\" id=\"exchange_value_amount_(.+?)\">(.+?)<\/span>/g.exec( data );
		goldCurrencyValue = found[2];
		moneymod_finalize();
	});
}

function moneymod_Userbar1() {
	moneymod_getConversionRate( '62', localCurrencyId, function( data ) {
		var found = /<span class=\"special\" id=\"exchange_value_amount_(.+?)\">(.+?)<\/span>/g.exec( data );
		localCurrencyValue = found[2];
		moneymod_Userbar2();
	});
}

$(document).ready( function() {
	var localPageData = $("html").html();

	if( $('.user_invite').length ) {
		var currencyFind = /http:\/\/economy.erepublik.com\/en\/market\/(.+?)\"/g.exec( localPageData );
		localCurrencyId = currencyFind[1];
		var countryFind = /\/M\/(.+?).png" alt=\"(.+?)\" title=\"(.+?)\"/g.exec( localPageData );
		localCountryName = countryFind[1];
		localCountryCurrency = countryFind[2];
		
		$('.user_invite').before( '<div class="user_finances">' +
			'<div class="gold_amount">' +
			'<img src="http://www.erepublik.com/images/modules/_icons/gold_icon.png">' +
			'<strong id="moneymod_goldvalue"></strong>&nbsp;<span id="moneymod_gold"></span></div>' +
			'<div class="currency_amount">' + 
			'<img src="/images/flags_png/S/' + localCountryName + '.png">' + 
			'<strong id="moneymod_moneyvalue"></strong>&nbsp;<span id="moneymod_moneyname"></span>' + 
			'</div></div>' );
		
		$('.user_invite').remove();
		
		moneymod_Userbar1();
	}
});