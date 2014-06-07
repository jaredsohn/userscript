// ==UserScript==
// @name			Steam Trading Cards Bulk Buyer
// @namespace		http://www.doctormckay.com/
// @version			3.0.2
// @description		Provides a button to purchase remaining cards needed for a badge in bulk
// @match			http://steamcommunity.com/*/gamecards/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @copyright		2013 - 2014 Dr. McKay
// ==/UserScript==

$.ajaxSetup({
	xhrFields: {
		withCredentials: true
	}
});

var links = $('.gamecards_inventorylink');
var cards = [];
var appid = 0;
var failures = [];

// Current currency (numerical identifier used by Steam)
var currency = 1;
// Detailed information for each currency ID (using information taken from Steam's Javascript source code)
var currencyInfo =
{
    1: { symbol: "$", separator: "." },
    2: { symbol: "£", separator: "." },
    3: { symbol: "€", separator: "," },
    5: { symbol: "RUB", separator: "," }, // No unicode support for the new symbol yet
    7: { symbol: "R$", separator: "," }
}
// Function to format the string using the currency information
function formatPrice(price, full)
{
    if(full)
	{
		return currencyInfo[currency].symbol + price.replace(".", currencyInfo[currency].separator);
	}
	return price.replace(".", currencyInfo[currency].separator);
}

var items = $('.unowned a'); // Enhanced Steam turns unowned into links
if(items.length == 0) {
	items = $('.unowned .badge_card_set_text');
	for(var i = 1; i < items.length; i++) {
		items.splice(i, 1); // Remove every other one since it's a series number
	}
}

if(links && $('.unowned').length > 0) {
	links.append('<button type="button" class="btn_grey_grey btn_small_thin" id="buycards"><span>Buy remaining cards from Market</span></button');
	$('#buycards').click(function() {
		$('#buycards').hide();
		$('.gamecards_inventorylink').append('<div id="buycardspanel" style="visibility: hidden; margin-top: 5px"></div>');
		
		var parts = window.location.href.split('/');
		appid = parts[parts.length - 1];
		if(appid == '' || appid.indexOf('?border=') == 0) {
			appid = parts[parts.length - 2];
		}
		
		if(appid.indexOf('?') != -1) {
			appid = appid.substring(0, appid.indexOf('?'));
		}
		
		updatePrices();
		
		$('#buycardspanel').css('display', 'none').css('visibility', 'visible').show('blind'); // We have to do this visibility/display thing in order for offsetWidth to work
	});
}

function updatePrices() {
	$('#buycardspanel').html('');
	
	for(var i = 0; i < items.length; i++) {
		var name = getCardName(items[i]);
		$('#buycardspanel').append('<span class="cardname" style="padding-right: 10px; text-align: right; display: inline-block; font-weight: bold">' + name + '</span><span class="cardprice" data-name="' + name.replace(/"/g, '&quot;') + '">Loading...</span>' + '<br />');
		$.get('/market/listings/753/' + appid + '-' + encodeURIComponent(name + ((window.location.href.indexOf('?border=1') != -1) ? ' (Foil)' : '')), onCardPriceLoaded)
			.fail(function() {
				priceElement(name).html('Error');
			});
	}
	
	var elements = $('.cardname');
	var largestWidth = 0;
	for(var i = 1; i < elements.length; i++) {
		if(elements[i].offsetWidth > elements[largestWidth].offsetWidth) {
			largestWidth = i;
		}
	}
	
	$('.cardname').css('width', elements[largestWidth].offsetWidth + 'px');
}

function onCardPriceLoaded(data, textStatus) {
	var html = $('<div></div>');
	html.append($(data));
	
	var title = html.find('title').text();
	var name = title.substring(title.indexOf('-') + 1);
	
	if(data.indexOf('There are no listings for this item.') != -1 && name.indexOf('(Trading Card)') == -1 && name.indexOf('(Foil Trading Card)') == -1) {
		$.get('/market/listings/753/' + title.substring(title.indexOf('Listings for') + 13, title.indexOf('-')) + '-' + encodeURIComponent(name) + ' (' + ((window.location.href.indexOf('?border=1') != -1) ? 'Foil ' : '') + 'Trading Card)', onCardPriceLoaded)
			.fail(function() {
				priceElement(name).html('Error');
			});
		return;
	}
	
	name = name.replace(' (Trading Card)', '').replace(' (Foil Trading Card)', '').replace(' (Foil)', '');
	
	var item = findElementByClass(html, 'div', 'market_listing_row');
	var price = findElementByClass($(item), 'span', 'market_listing_price_with_fee');
	var pricenofee = findElementByClass($(item), 'span', 'market_listing_price_without_fee');
	
	if(textStatus != 'success' || !item || !price || !pricenofee) {
		priceElement(name).html('Error');
	} else {
		var pos = data.indexOf('g_sessionID = "') + 15;
		var pos2 = data.indexOf('"', pos);
		var sessionID = data.substring(pos, pos2);
		
		var listingID = $(item).attr('id').split('_')[1];
        
		// Find out which currency we are dealing with by looking for the valuta symbol
        $.each(currencyInfo, function(index) {
            if($(price).text().indexOf(this.symbol) !== -1)
            {
                currency = index;
            }
        });
		
		// Just translate all commas to dots so we have floating point values
		var totalPrice = $(price).html().replace(",", ".").replace(/[^0-9.]/g, '');
		var theirPrice = $(pricenofee).html().replace(",", ".").replace(/[^0-9.]/g, '');
		
		if(totalPrice == 'Sold!') {
			$.get('/market/listings/753/' + title.substring(title.indexOf('Listings for') + 13), onCardPriceLoaded)
				.fail(function() {
					priceElement(name).html('Error');
				});
			return;
		}
		
		cards.push({session: sessionID, listing: listingID, total: totalPrice, theirs: theirPrice, name: name});
		
		// Use new currency information
		priceElement(name).html(formatPrice(totalPrice, true));
	}
	
	if(cards.length == $('.cardprice').length) {
		var total = 0;
		for(var i = 0; i < cards.length; i++) {
			total += parseFloat(cards[i].total);
		}
		
		// Use new currency information
		$('#buycardspanel').append('<br /><span style="font-weight: bold; display: inline-block; width: ' + $('.cardname').css('width') + '; padding-right: 10px; text-align: right">Total</span><b>' + currencyInfo[currency].symbol + '<span id="totalprice">' + formatPrice(total.toFixed(2)) + '</span></b><br /><br /><button type="button" id="buycardsbutton" class="btn_green_white_innerfade btn_medium_wide" style="padding: 10px 20px 10px 20px; margin-left: ' + ($('.cardname').css('width').replace('px', '') / 2) + 'px">PURCHASE</button>');
		$('#buycardsbutton').click(function() {
			failures = [];
			$('#buycardsbutton').hide();
			buyCard();
		});
	}
}

function findElementByClass(dom, element, classname) {
	var items = dom.find(element);
	for(var i = 0; i < items.length; i++) {
		var classes = items[i].className.split(' ');
		for(var j = 0; j < classes.length; j++) {
			if(classes[j] == classname) {
				if((element == 'div' && $(findElementByClass($(items[i]), 'span', 'market_listing_price_with_fee')).html().indexOf('Sold!') == -1) || element != 'div') {
					return items[i];
				}
			}
		}
	}
}

function buyCard() {
	if(cards.length < 1) {
		if(failures.length > 0) {
			var retry = [];
			for(var i = 0; i < items.length; i++) {
				if(failures.indexOf(getCardName(items[i])) != -1) {
					retry.push(items[i]);
				}
			}
			
			items = retry;
			$('#buycardspanel').append('<button type="button" id="reloadfailuresbutton" class="btn_green_white_innerfade btn_medium_wide" style="padding: 10px 20px 10px 20px; margin-left: ' + ($('.cardname').css('width').replace('px', '') / 2 - 40) + 'px">RELOAD FAILURES</button>');
			$('#reloadfailuresbutton').click(updatePrices);
		} else {
			$('#buycardspanel').append('<button type="button" id="reloadbutton" class="btn_green_white_innerfade btn_medium_wide" style="padding: 10px 20px 10px 20px; margin-left: ' + ($('.cardname').css('width').replace('px', '') / 2 - 25) + 'px">RELOAD PAGE</button>');
			$('#reloadbutton').click(function() {
				window.location.reload();
			});
		}
		return;
	}
	
	var item = cards[0];
	if(!item) {
		return;
	}
	
	priceElement(item.name)[0].innerHTML += ' - Purchasing...';
	// Use new currency indicator
	$.post('https://steamcommunity.com/market/buylisting/' + item.listing, {sessionid: item.session, currency: currency, subtotal: Math.round(item.theirs * 100), fee: Math.round((item.total * 100) - (item.theirs * 100)), total: Math.round(item.total * 100)}, function(data, textStatus) {
		if(textStatus != 'success' || !data || !data.wallet_info || !data.wallet_info.success) {
			priceElement(item.name).html('Failure');
			failures.push(item.name);
			decrementTotal(item.total);
		} else {
			priceElement(item.name).html('Purchased');
		}
		
		cards.splice(0, 1);
		buyCard();
	}).fail(function(jqXHR) {
		try {
			var json = JSON.parse(jqXHR.responseText);
			priceElement(item.name).text(json.message);
		} catch(ex) {
			console.error('JSON.parse exception: ' + ex.message);
			priceElement(item.name).text('Failure');
		}
		
		failures.push(item.name);
		decrementTotal(item.total);
		
		cards.splice(0, 1);
		buyCard();
	});
}

function decrementTotal(total) {
	// Replace any commas to dots so we get a valid double
	$('#totalprice').text(formatPrice(($('#totalprice').text().replace(",", ".") - total).toFixed(2)));
}

function getCardName(element) {
	// Use text instead of html to prevent encoding mismatches in URLs
	return $.trim($(element).text().replace('<div style="clear: right"></div>', ''));
}

function priceElement(name) {
	var elements = $('.cardprice');
	for(var i = 0; i < elements.length; i++) {
		if($(elements[i]).data('name') == name) {
			return $(elements[i]);
		}
	}
	return null;
}