// ==UserScript==
// @name           eBay - Hilight Items With Bids
// @namespace      http://userscripts.org/users/126140
// @include        http://*.ebay.*/*
// @grant	   none
// @updateURL	   https://userscripts.org/scripts/source/66089.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/66089.user.js
// @version	   2.2.1
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @description	   Hilights items that have bids with a red border and yellow background.
// ==/UserScript==


$('document').ready(function() {
	$(".bids").each(function() {
		var text = $(this).text();
		var regExp = /[0-9]+.(b|B)ids?/;
		
		if (regExp.test(text)) {
			var match = regExp.exec(text);
			var sNumBids = match[0].split(" ",1);
			var numBids = parseInt(sNumBids, 10);
			if(numBids > 0) {
				$(this).closest('table').css("border","3px solid red");
				$(this).closest('table').css("background-color","yellow");
			}
		}
	});

});
