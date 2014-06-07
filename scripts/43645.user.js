// ==UserScript==
// @name           eBay currency converter
// @namespace      http://henrik.nyh.se
// @description    Shows the price in your own currency after the USD/GBP/CAD/AUD price on eBay auctions. Exchange rates are updated manually within the file. Preconfigured for SEK with exchange rates as of 2005-08-29.
// @include        http://*ebay.com/*
// @exclude        http://my.ebay.com/*
// @exclude        http://*search.ebay.com/*
// ==/UserScript==

(function() {

	// Configure
	var myCurrencyPrefix = '';  // e.g. '$'
	var myCurrencySuffix = ' Kč';  // e.g. ' SEK', ' NOK'
	
	// Please note that you need to save this file as Unicode if using non-ASCII characters such as the euro sign.

	// Exchange rates
	perUSD = 22.093;  // this * US dollars = my currency
	perGBP = 31.160;  // this * British pounds = my currency
	perCAD = 17.176;  // this * Canadian dollars = my currency
	perAUD = 14.163;  // this * Australian dollars = my currency
	
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

		// USD
		if (s.match(/US \$[\d,]+\.\d+/)) {
			var USD = s.replace(/(.*US \$)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var USD = USD.replace(/,/, '');
			var myCurrency = roundC(USD * perUSD);  // Convert
			s = s.replace(/(US \$)([\d,]+\.\d+)/, '$1$2 ('+ myCurrencyPrefix + myCurrency + myCurrencySuffix +')');  // Replace
		}
		
		// GBP
		if (s.match(/GBP\s+[\d,]+\.\d+/)) {
			var GBP = s.replace(/(.*GBP\s+)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = roundC(GBP * perGBP);  // Convert
			s = s.replace(/(GBP\s+)([\d,]+\.\d+)/, '$1$2 ('+ myCurrencyPrefix + myCurrency + myCurrencySuffix +')');  // Replace
		}
		
		// GBP
		if (s.match(/£[\d,]+\.\d+/)) {
			var GBP = s.replace(/(.*£)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = roundC(GBP * perGBP);  // Convert
			s = s.replace(/(£)([\d,]+\.\d+)/, '$1$2 ('+ myCurrencyPrefix + myCurrency + myCurrencySuffix +')');  // Replace
		}
		
		// CAD
		if (s.match(/C \$[\d,]+\.\d+/)) {
			var CAD = s.replace(/(.*C \$)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = roundC(CAD * perCAD);  // Convert
			s = s.replace(/(C \$)([\d,]+\.\d+)/, '$1$2 ('+ myCurrencyPrefix + myCurrency + myCurrencySuffix +')');  // Replace
		}
		
		// AUD
		if (s.match(/AU \$[\d,]+\.\d+/)) {
			var AUD = s.replace(/(.*AU \$)([\d,]+\.\d+)(.*)/, '$2');  // Extract
			var myCurrency = roundC(AUD * perAUD);  // Convert
			s = s.replace(/(AU \$)([\d,]+\.\d+)/, '$1$2 ('+ myCurrencyPrefix + myCurrency + myCurrencySuffix +')');  // Replace
		}

	    node.data = s;  // Update text node
	
	}

})();