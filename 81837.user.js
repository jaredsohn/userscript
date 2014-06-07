// ==UserScript==
// @name           NewEgg Price at Checkout
// @namespace      http://jobson.us/
// @description    Calculates the Price + Shipping
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.newegg.com/*
// @include        http://www.newegg.ca/*
// ==/UserScript==

$('div.itemCell').each(function(i) {
	var price = $(this).find('input[name="priceBefore"]').attr('value').replace(/[\$,]/g,'');

	// Item has stupid "See Price in Cart" link.
	if ($(this).find('a.priceAction')) {
		$(this).find('a.priceAction').parent().before('<li class="priceFinal">$<strong>'+ price.split('.')[0] +'</strong><sup>.'+ price.split('.')[1] +'</sup></li>');
		$(this).find('a.priceAction').parent().remove();
	}
	
	// Clean-up the price.
	price = parseFloat(price.replace(/[\$,]/g,''))
		
	// Grab the shipping cost.
	var ship  = $(this).find('li.priceShip').text().match(/\d+\.*\d+/);
		ship  = (ship == null) ? 0 : parseFloat(ship);
	
	var total = (ship+price).toFixed(2);
	
	$(this).find('ul.itemPricing').append('<li class="priceTotal">$'+ total +' at checkout');
	
	var size = $(this).text().match(/(\d+\.*\d*)([tg]b)/i);
	if (size==null || size.length<3) return;
	size = (size[2].toUpperCase()==='GB') ? parseFloat(size[1]) : parseFloat(size[1])*1000;
	
	var cpgb = (total/size);

	if (cpgb >= 1) {
		cpgb = '$' + (cpgb.toFixed(2));
	} else {
		cpgb = ((cpgb*100).toFixed(1)) + '\u00a2';
	}
	
			
	$(this).find('ul.featureList').find('li:first').before('<li><strong>Cost per GB:</strong> '+ cpgb +'</li>')
});

if (/Product.aspx.+Item=/.test(window.location.href)) {
	if ($('a.blkLink em').length == 0) return;

	var w = $('div.wrapper a.blkLink').parent();

	var price;
	var i=0;
	$('input[type="radio"]').each(function() {
		if (i>0) return;
		var html = $(this).parent().html();
		if (!/switchCrossSellItem/.test(html)) return;
		i++;
		price = html.match(/'\$(.+?)'/)[1];
	});
	
	if (price) {
		$('div.wrapper a.blkLink').remove();
		$(w).append('<div id="singleFinalPrice" class="current"><span class="label">Now: </span><span>$</span>'+ price.split('.')[0] +'<sup>.'+ price.split('.')[1] +'</sup></div>');
	}

	
}

GM_addStyle('li.priceTotal { font-weight: bold; color: red; }');
