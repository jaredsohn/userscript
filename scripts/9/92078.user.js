// ==UserScript==
// @name           how many beers?
// @namespace      www.simonbrahan.co.uk
// @description    Find out how many beers things will cost
// @include        http://www.amazon.co.uk/*
// ==/UserScript==
var beerPrice = 3.1;
var catchPrices = /£\d*\.\d{2}/g;
var pageBody = document.body.innerHTML;
var prices = pageBody.match(catchPrices);
if (prices != null) {
	for (x in prices) {
		price = prices[x]
		numeric_price = price.substr(1);
		beer_price = Math.round(numeric_price / beerPrice * 100) / 100;
		pageBody = pageBody.replace(price,beer_price+' beers');
	}
}

document.body.innerHTML = pageBody;