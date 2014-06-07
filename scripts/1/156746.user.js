// ==UserScript==

// @name          ebay/shop.to Turk Lirasi Donusturucu.
// @description   USD/GBP/CAD/AUD/EUR - TL Donusturur.

// @author        erdogan,Gousgounis
// @homepage      http://userscripts.org/scripts/show/156746
// @updateURL     https://userscripts.org/scripts/source/156746.meta.js
// @downloadURL   https://userscripts.org/scripts/source/156746.user.js

// @include       http://*ebay.tld/*
// @include       http://*shopto.net/*
// @exclude       http://my.ebay.*/*
// @exclude       http://*search.ebay.*/*

// @version       1.61

// ==/UserScript==

	// Configure
	var myDate = new Date().getTime()
	LastUpdate = parseInt(GM_getValue('Update', 0)); //Update every 24h
	if (myDate > LastUpdate + 86400000) {
	GM_setValue('Update',myDate+"");
	Currency = new Array("USD","GBP","CAD","AUD","EUR");
	for (i=0; i < Currency.length; i++) {
		var convertionURL = "http://finance.yahoo.com/d/quotes.csv?s="+encodeURIComponent(Currency[i]+"TRY"+"=X")+"&f=l1";
		GetRatio(convertionURL,Currency[i]);
		};
	}
		
	// Exchange rates
	perUSD = parseFloat(GM_getValue('USD',0));  // this * US dollars = my currency
	perGBP = parseFloat(GM_getValue('GBP',0));  // this * British pounds = my currency
	perCAD = parseFloat(GM_getValue('CAD',0));  // this * Canadian dollars = my currency
	perAUD = parseFloat(GM_getValue('AUD',0));  // this * Australian dollars = my currency
	perEUR = parseFloat(GM_getValue('EUR',0));  // this * Euros = my currency
	
	// Code
	
	// Round to one decimal point
	function roundC(v) {
		return Math.round(v*10)/10;
	}

	// Get all text nodes
	textnodes = document.evaluate(
	    "//text()",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    
	for (var i = 0; i < textnodes.snapshotLength; i++) {  // Loop through text nodes
	    node = textnodes.snapshotItem(i);  // This text node
	    s = node.data;  // Its contents
		var matched = false;

		// GBP
		if (s.match(/GBP\s+[\d,]+\.\d+/)) {
			var GBP = s.replace(/(.*GBP\s+)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = GBP * perGBP;  // Convert
			s = s.replace(/(GBP\s+)([\d,]+\.\d+)/, '$1$2 ('+ myCurrency.toFixed(2) + 'TL)');  // Replace
		}
		
		// GBP
		if (s.match(/£[\d,]+\.\d+/)) {
			var GBP = s.replace(/(.*£)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = GBP * perGBP;  // Convert
			s = s.replace(/(£)([\d,]+\.\d+)/, '$1$2 ('+ myCurrency.toFixed(2) + 'TL)');  // Replace
		}
		
		// CAD
		if (s.match(/C \$[\d,]+\.\d+/)) {
		matched = true;
			var CAD = s.replace(/(.*C \$)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = CAD * perCAD;  // Convert
			s = s.replace(/(C \$)([\d,]+\.\d+)/, '$1$2 ('+ myCurrency.toFixed(2) + 'TL)');  // Replace
		}
		
		// AUD
		if (s.match(/AU \$[\d,]+\.\d+/)) {
		matched = true;
			var AUD = s.replace(/(.*AU \$)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = AUD * perAUD;  // Convert
			s = s.replace(/(AU \$)([\d,]+\.\d+)/, '$1$2 ('+ myCurrency.toFixed(2) + 'TL)');  // Replace
		}

		// USD
		if (s.match(/US \$[\d,]+\.\d+/)) {
		matched = true;
			var USD = s.replace(/(.*\$)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var USD = USD.replace(/,/, '');
			var myCurrency = USD * perUSD;  // Convert
			s = s.replace(/(US \$)([\d,]+\.\d+)/, '$1$2 ('+ myCurrency.toFixed(2) + 'TL)');  // Replace
		}
		
		// USD ($ alone)
		if (s.match(/\$[\d,]+\.\d+/) && matched == false) {
			var USD = s.replace(/(.*\$)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var USD = USD.replace(/,/, '');
			var myCurrency = USD * perUSD;  // Convert
			s = s.replace(/(\$)([\d,]+\.\d+)/, '$1$2 ('+ myCurrency.toFixed(2) + 'TL)');  // Replace
		}

		// EUR
		if (s.match(/EUR\s+[\d,]+\.\d+/)) {
			var EUR = s.replace(/(.*EUR\s+)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = EUR * perEUR;  // Convert
			s = s.replace(/(EUR\s+)([\d,]+\.\d+)/, '$1$2 ('+ myCurrency.toFixed(2) + 'TL)');  // Replace
		}
		
		// EUR
		if (s.match(/€[\d,]+\.\d+/)) {
			var EUR = s.replace(/(.*€)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = EUR * perEUR;  // Convert
			s = s.replace(/(€)([\d,]+\.\d+)/, '$1$2 ('+ myCurrency.toFixed(2) + 'TL)');  // Replace
		}
		
	    node.data = s;  // Update text node
	
	}
	
	function GetRatio(link,CurrentCurrency) {
		GM_xmlhttpRequest({
		method: 'GET',
		url: link,
		onload: function(responseDetails) {
		GM_setValue(CurrentCurrency,responseDetails.responseText.replace(/\s+$/,""));
		} 
		});
	}