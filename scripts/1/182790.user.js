// ==UserScript==
// @name       Lieferservice.de Bitcoinpreise
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  Zeigt Preise in mBTC auf Lieferservice.de
// @match      http://www.lieferservice.de/*
// @copyright  2013+, DerKorb
// ==/UserScript==

$(function() 
{
	$.getJSON("https://bitpay.com/api/rates", function(data) 
	{ 
		$("a[itemprop='price']").each(function(i,v) 
		{
			price = ($(v).html().replace("€ ","").replace(",",".")*1000/data[1].rate).toFixed(1);
			$(v).html($(v).html() + " = " + price + "mBTC");
		});
	});
});