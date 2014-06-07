// ==UserScript==
// @name           Humble Bundle Store prices in Euro
// @namespace      32666266
// @description    Show Humble Bundle Store prices in Euro instead of USD
// @include        https://www.humblebundle.com/store
// @include        https://www.humblebundle.com/store/*
// @version        2013.12.25
// ==/UserScript==

(function(){
	var rate=1.3684;
	var trials = 0, interval = 100, test = setTimeout(function () {
		//console.log(trials);
		if (document.getElementById('js-shopping-cart-holder').firstChild) {
			$(".sale-price, .cart-item-price").each(function(idx,item){
			    var price=item.textContent;
				 if(price.substr(0,1)=='$') {
					 price=price.substr(1);
				    item.textContent="€"+(parseFloat(price)/rate).toFixed(2);
				 }
			});
		} else {
			test = setTimeout(arguments.callee, interval);
			if (trials++ >= 100) clearTimeout(test);
		}
	}, interval);
}());
