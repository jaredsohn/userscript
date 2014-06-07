// ==UserScript==
// @name CPAP-Supply Pricer
// @namespace byteforum.info/greasemonkey
// @description Redirects to real price for cpap-supply.com products which have an 'our price via email' link
// @version 
// @include http*://*.cpap-supply.com/*
// ==/UserScript==

if(String(window.location).match(/https?:\/\/www\.cpap-supply\.com\/.+\.htm/i))
{
	if(document.documentElement.innerHTML.match(/global_Current_ProductCode/gi))
	{
		var product_code = document.documentElement.innerHTML.match(/(?:help_emailbetterprice\.asp\?ProductCode=)+([^']*)/i);
		if (product_code!=null && product_code.length>1) 
		{
			window.location.href = "http://www.cpap-supply.com/ProductDetails.asp?ProductCode=" + product_code[1] + "&e=Y";
		}
	}
}
else
{
	if(String(window.location).match(/https?:\/\/www\.cpap-supply\.com\/help_emailbetterprice.asp\?ProductCode=.+/i))
	{
		var product_code = String(window.location).match(/https?:\/\/www\.cpap-supply\.com\/help_emailbetterprice.asp\?ProductCode=(.*)/i);
		if (product_code!=null && product_code.length>1) 
		{
			window.location.href = "http://www.cpap-supply.com/ProductDetails.asp?ProductCode=" + product_code[1] + "&e=Y";
		}
	}
}
