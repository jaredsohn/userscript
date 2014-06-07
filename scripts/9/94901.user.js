// ==UserScript==
// @name           Hidden Price Revealer 2
// @namespace      Cavingdeep-Psi
// @description    Reveals some hidden prices on Newegg.com and Newegg.com.
// @include        http://www.newegg.com/Product/ProductList.aspx*
// @include        http://www.newegg.ca/Product/ProductList.aspx*
// @include        http://www.newegg.com/Store/SubCategory.aspx*
// @include        http://www.newegg.ca/Store/SubCategory.aspx*
// ==/UserScript==

function GM_LoadjQuery() {

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);

    waitForScriptLoading();
}

function waitForScriptLoading() {
	if (navigator.userAgent.indexOf("Firefox") != -1){
		if (typeof unsafeWindow.jQuery == 'undefined') {
			unsafeWindow.setTimeout(waitForScriptLoading, 100);
		} else {
			unsafeWindow.jQuery.noConflict();
			jQry124 = unsafeWindow.jQuery;
			letsjQuery();
		}
	} else {
		if (typeof window.jQuery == 'undefined') {
			window.setTimeout(waitForScriptLoading, 100);
		} else {
			window.jQuery.noConflict();
			jQry124 = window.jQuery;
			letsjQuery();
		}
	}
}

function letsjQuery() {
	var itemPricing = jQry124('.itemPricing');
	
	for ( var i = 0; i < itemPricing.length; i++){
		var priceMap = jQry124('.priceMAP a', itemPricing[i]);
		if (priceMap.length > 0){
			var priceNote = jQry124('.priceNote', itemPricing[i]);
			revealPrice(priceMap, priceNote);
		}
	}
}

function revealPrice(priceVar, rebateVar) {
	var a = priceVar;
    var priceUrl = a.attr("onclick").toString().match(/http:[^'"]+/)[0];

    jQry124.get(
        priceUrl,
        function(data) {
            var finalPrice = jQry124('.final', data);
			var rebate = jQry124('.rebate', data);
			var p = finalPrice.text().split('$')[1];
            a.replaceWith("<span class='priceFinal'>$<strong>" + p.split('.')[0] + "</strong><sup>." + p.split('.')[1] +"</sup></span>");
			rebateVar.replaceWith(rebate[1]);
        });
}

window.addEventListener("load", GM_LoadjQuery, false);
//GM_LoadjQuery();