// ==UserScript==
// @name		eRepublik Market Enchancement
// @description		Enchancement Market Suite for eRepublik. Written by VallThore [vallthore at gmail dot com].
// @version		0.11
// @namespace		http://www.vallthore.pl/
// @downloadURL		http://vallthore.pl/erep/scripts/erep-market-enchancement.user.js
// @updateURL		http://vallthore.pl/erep/scripts/erep-market-enchancement.user.js
// @include		http://economy.erepublik.com/*
// ==/UserScript==

var money = 0;
var availableStorage = 0;
var currencyUnit;

/**
 * Example values for http://economy.erepublik.com/*
 * 
 * 0 - lang [en, pl, etc.]
 * 1 - place [market]
 * 2 - country id [35 for pl, 29 for uk, etc.]
 * 3 - product id [1 - food, 2 - weapons, etc.]
 * 4 - quality of product
 * 5-n - other/not used currently
 */
var splitedURL;

// Disregard females, aquire currency
function getMoneyAndCurrencyUnit()
{
	money = parseInt($('div.currency_amount > p').find('strong').html());
	currencyUnit = $('div.currency_amount > p').find('span').html();
}

function getDataAndInjectCode()
{
	GM_xmlhttpRequest({
		url: 'http://www.erepublik.com/en/economy/inventory',
		method: 'GET',
		onload: function(response) {
			// get data about storage
			var strToParse = $('div.storage > h4', response.responseText).find('strong').html();
			strToParse = $.trim(strToParse);
			strToParse = strToParse.replace(/,/g, '');
			strToParse = strToParse.replace('(', '');
			strToParse = strToParse.replace(')', '');
			
			var storage = strToParse.split('/');
			
				
			availableStorage = parseInt(storage[1]) - parseInt(storage[0]);
			
			getMoneyAndCurrencyUnit();
			addMAXandPPU();
		},
		onerror: function() {
			alert('nie działa');
		}
	});
}

function addMAXandPPU()
{
	var link = '<a style="margin-left: 5px;" href="javascript:;">MAX</a>';
		
	$('tbody.price_sorted > tr').each(function() {
		
		var stock = parseInt($(this).find('td.m_stock').html());
		var price = parseInt($(this).find('td.m_price > strong').html()) + 
			    (parseInt($(this).find('td.m_price').find('sup').html().substr(1,2), 10) / 100);
		var maxitems = parseInt(money / price);
		var max = (maxitems > stock ? stock : maxitems);
		
		if(splitedURL[3] in {1:1, 2:1, 3:1})
		{
			if(typeof splitedURL[4] == 'undefined') // If none quality is chosen then Q1 is default
				splitedURL[4] = 1;
			
			var price_per_unit;
			if(splitedURL[3] == 2) // in weapons we count total firepower per price, ie. firepower * durability / price
			{
				price_per_unit = Math.round(1000 * parseInt(splitedURL[4]) * parseInt(splitedURL[4]) * 20 / price) / 1000;
			}
			else
			{
				price_per_unit = Math.round(price * 1000 / (parseInt(splitedURL[4]) * (splitedURL[3] == '1' ? 2 : 1))) / 1000;
			}
			var ppu_inj = '<p>('+ price_per_unit + (splitedURL[3] == '2' ? ' FPP' : ' PPU') + ')</p>';
			$(this).find('td.m_price').append(ppu_inj);
		}
		
		if(availableStorage < max)
		      max = availableStorage;
		
		var input = $(this).find('td.m_quantity > input');
		var fullpricetag = '<p style="margin-top: 3pt">' + price.toFixed(2) + ' ' + currencyUnit + '</p>';
		
		$(this).find('td.m_quantity').append(link).find('a').click(function(){
			input.val(max);
			fullpricetag.html((input.val() * price).toFixed(2) + ' ' + currencyUnit);
		});
		
		fullpricetag = $(this).find('td.m_quantity').append(fullpricetag).find('p');
		
		input.keyup(function() {
		  fullpricetag.html((input.val() * price).toFixed(2) + ' ' + currencyUnit);
		  
		});
	});
}

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		splitedURL = location.pathname.substr(1).split('/');
		
		if(splitedURL[1] != 'market' || typeof splitedURL[3] == 'undefined')
			return;
		
		$ = unsafeWindow.jQuery;
		getDataAndInjectCode();
	}
}
GM_wait();


