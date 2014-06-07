// ==UserScript==
// @name           	Stocks Seller
// @namespace      	http://www.darkztar.com
// @description    	Sells a certain amount of stocks from all lots (default is 1000, but can be edited below)
// @include        	http://www.neopets.com/stockmarket.phtml?type=portfolio
// @include			http://www.neopets.com/process_stockmarket.phtml
// ==/UserScript==

var amount = 1000;	// CHANGE THIS VALUE TO THE AMOUNT OF STOCKS YOU WANT TO SELL FOR EACH LOT (MAX 1000)

function random(from, to) {
	
	return Math.floor(Math.random() * (to - from + 1) + from);

}

if (document.location == "http://www.neopets.com/stockmarket.phtml?type=portfolio") {

	var inputs = document.getElementsByTagName('input');
	var j = 0;

	for (i = 0; i < inputs.length; i++) {
		
			var input = inputs[i];
	
       		if (input.type == "text" && input.value == "") {
	
           		input.value = amount;
				
				j = 1;

       		}

		}
	
	if (j == 1) {
	
	setTimeout("document.getElementsByTagName('form')[1].submit()",random(3000,3500));
	
	}

}

else if (document.location == "http://www.neopets.com/process_stockmarket.phtml") {

	setTimeout("window.location = 'http://www.neopets.com/stockmarket.phtml?type=portfolio'",random(500,800));

}