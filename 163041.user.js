// ==UserScript==
// @name        eBay Shipping
// @namespace   MrBrax
// @include     http://www.ebay.co.uk/*
// @version     1.2
// @grant		none
// ==/UserScript==

// config
var cur = 9.80;
var str = "kr";

// Shipping clear
$(".ship:contains(Postage)").parent().parent().parent().remove();
$(".ship:contains(Courier)").parent().parent().parent().remove();
$(".ship:contains(Collection)").parent().parent().parent().remove();

// Total cost
$(".prc").each(function(){
	var price = parseFloat($(this).children(".g-b").html().replace( /^\D+/g, ''));
	price += parseFloat($(this).children(".ship").children(".fee").html().match(/\d+\.?\d*/g));
	price = Math.round(price*100)/100;
	loc = Math.round(price * cur);
	$(this).children(".ship").children(".fee").append("<br><br><b style='color:red;font-size:20px'>£"+price+"</b>");
	$(this).children(".ship").children(".fee").append("<br><b style='color:green;font-size:16px'>"+loc+str+"</b>");
});