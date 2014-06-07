// ==UserScript==
// @name        TraderaFilter
// @namespace   MrBrax
// @include     http://www.tradera.com/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1
// @grant       none
// ==/UserScript==

// Add your annoying sellers here, in array format
var filter = ["game-world","annoying-user"];

var listings = $(".Box-F");
for(i=0;i<listings.length;i++){
	seller = $(listings[i]).find(".seller a").html();
	if(!$.inArray(seller,filter)) $(listings[i]).hide();
}