/* eBay - Display Totals with Shipping
Created : 07/20/06

Change log:
1.1.0 Feb 23 2008
	Extensively modified by Ben Shepherd:
	Replaces shipping prices with totals including shipping.
	Works with prices in italics (converted from other currencies)
	Slightly more robust and uses regexps to match prices
	Add support to guess the currency based on TLD (currently UK only)
1.0.0 07/20/06 Initial Version
*/

// ==UserScript==
// @name          eBay - Display Totals with Shipping
// @namespace     http://userscripts.org/people/2042
// @namespace     http://ben-shepherd.blogspot.com/
// @description	Computes and displays the total price with shipping added.  Makes a new column that shows the final price for both the BuyItNow and auction price added to the shipping prices.  Note: Works with international prices.
// @include       http://*.ebay.tld/*
// ==/UserScript==

var currencySymbol = '$'; //default to dollars
var price = /\$([\d\,]*.\d\d)/; // regexp to test for currency
var shippingText = 'Shipping';

// decide currency based on TLD
// there's probably a better way...
// I'll add more if there's a demand, but European ones are a little harder since the order and separators change
var hostSplit = location.host.split ('.');
var tld = hostSplit [hostSplit.length - 1];
switch (tld) {
case 'uk':
	currencySymbol = '£';
	price = /£([\d\,]*.\d\d)/;
	shippingText = 'Postage';
	break;
}
FindAllRows();

function FindAllRows() {
	var ListingsRows = [];
	var allElements = document.getElementsByTagName('tr');
	for (var i = 0; i < allElements.length; ++i) {
		if (allElements[i].parentNode.tagName == 'THEAD') {
			allElements[i].innerHTML = allElements[i].innerHTML.replace (shippingText, 'Including ' + shippingText.toLowerCase());
		} else if (allElements[i].className == "ebHlOdd single") {
			ListingsRows.push(allElements[i]);
		} else if (allElements[i].className == "single") {
			ListingsRows.push(allElements[i]);
		}
	}
	
	if (ListingsRows.length > 0) {
		for (var i = 0; i < ListingsRows.length; ++i) {
			WorkOnRow(ListingsRows[i]);
		}
	}	
}

function WorkOnRow(RowElement) {
	var buyItNowPrice = -1;
	var biddingPrice = -1;
	var shippingPrice = -1;
	var allElements = RowElement.getElementsByTagName('td');

	for (var i = 0; i < allElements.length; ++i) {
		if (allElements[i].className == "ebcPr") {
			var spans = allElements[i].getElementsByTagName('span')

			if (spans.length >= 1) {
				biddingPrice = parseFloat (spans[0].textContent.match (price)[1].replace (',',''));
			}
			if (spans.length > 1) {
				buyItNowPrice = parseFloat (spans[1].textContent.match (price)[1].replace (',',''));
			}			
		}
		if (allElements[i].className == "ebcShpNew") {
			var spans = allElements[i].getElementsByTagName('span')
			
			if (spans.length >= 1) {
				var tc = spans[0].textContent;
				if (/Free/.test (tc) || (/Digital delivery/.test (tc))) {
					shippingPrice = 0;
				} else if (/Not specified/.test (tc)) {
					shippingPrice = '?';
				} else if (price.test (tc)) {
					shippingPrice = parseFloat (tc.match (price)[1].replace (',',''));
				}
			}

			var shippingTrNode = allElements[i];
		}
	}
	
	var buyItNowTotal;
	if (buyItNowPrice != -1) {
		if (isNaN(buyItNowPrice) || isNaN(shippingPrice)) buyItNowTotal = "?";
		else buyItNowTotal = (buyItNowPrice + shippingPrice).toFixed(2);
	}
	
	if (biddingPrice != -1) {
		if (isNaN(biddingPrice) || isNaN(shippingPrice)) var biddingTotal = "?";
		else var biddingTotal = (biddingPrice + shippingPrice).toFixed(2);
		var html = '<span class="shpTxt" align="left">' + currencySymbol + biddingTotal + '</span>';
		if (buyItNowPrice != -1 && !isNaN(buyItNowPrice)) {
			html += '<br><span class="shpTxt" align="left">' + currencySymbol + buyItNowTotal + '</span>';
		}
		shippingTrNode.innerHTML = html;
	}
	
}



