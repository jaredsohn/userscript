// ==UserScript==
// @name           Mix Woot Price
// @namespace      http://projects.neocodenetworks.com/gm/
// @description    Adds shipping to the current Woot price
// @include        http://*.woot.com/
// @include        http://*.woot.com/Default.aspx*
// ==/UserScript==
 
function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
 
document.addEventListener("DOMContentLoaded", function(e) {
	var price = document.evaluate("/html/body/form/div[2]/div/div/h3/span/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var shipping = document.evaluate("/html/body/form/div[2]/div/div/ul/li", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if (shipping.innerHTML == "+ $5 shipping") {
		price.title = price.innerHTML + " for one w/ $5 shipping";
		var cost = parseFloat(price.innerHTML.replace("$","").replace(",",""));
		price.innerHTML = roundNumber(cost + 5.00,2);
		shipping.innerHTML = "Shipping included";
		
		if (document.getElementById("ctl00_ContentPlaceHolder_TwoForTuesdayPanel") != null)
		{
			oneCost = cost / 2.0;
			shipping.innerHTML += "<br />2fT: $" + roundNumber(oneCost,2) + "ea. w/o shipping";
		}
	}
	else {
		price.title = "Price w/ shipping was not calculated";
	}
}, false);