// ==UserScript==
// @name           Woot Titler
// @namespace      http://projects.neocodenetworks.org/gm/
// @description    Puts the product name in the title
// @include        http://*.woot.com/
// @include        http://*.woot.com/Default.aspx*
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(e) {
	product = document.evaluate("/html/body/form/div/div/div/h2", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
	price = document.evaluate("/html/body/form/div/div/div/h3/span/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
	
	var soldout = "";
	if (document.getElementById("ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_HyperLinkWantOne").className == "soldOut")
	{
		soldout = "[SOLD OUT] "
	}

	document.title = "Woot : " + soldout + product + " ($" + price + ")";
}, false);