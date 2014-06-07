// ==UserScript==
// @name        Neopets Auctions - commas r gr8

// @namespace   NPpetfinder

// @include     *neopets.com/auctions*

// @version     1

// @grant       none

// ==/UserScript==

var lastbid = $(".content > center > table:first-of-type > tbody > tr[bgcolor*=\"#ffff\"] > td:nth-of-type(6) > b");
var currentbid = $(".content > center > table:first-of-type > tbody > tr[bgcolor*=\"#ffff\"] > td:nth-of-type(7) > b");

lastbid.each(function() {
	var text = $(this).text();
	var number = parseInt(text);
	var formatted = number.toLocaleString();
	
	$(this).text(formatted)
	/*lert(formatted);*/
});

currentbid.each(function() {
	var text = $(this).text();
	var number = parseInt(text);
	var formatted = number.toLocaleString();
	
	$(this).text(formatted)
	/*lert(formatted);*/
});