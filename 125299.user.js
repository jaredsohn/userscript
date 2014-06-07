// ==UserScript==
// @name           PriceTranslate
// @namespace      CBCYEJS_PriceTranslate
// @description    PriceTranslate
// ==/UserScript==

/*
Author: Gary Zhang
Blog  : http://www.cbcye.com
E-mail: cbcye@live.com
Date: 2012/2/9
*/

(function() {   
  window.addEventListener('DOMContentLoaded', priceTranslate(), false);

//thranslate the price
function priceTranslate()
   {  
	var contents = document.body.innerHTML;
	//express for the dollar price
	var dollarPrice = /[$]([0-9]{1,6}(.[0-9]{1,2}))/ig;
    var arrMactches = contents.match(dollarPrice);
    for (var i=0;i < arrMactches.length ; i++)
    {
       var dollarPrice = arrMactches[i]; 
	   var yuanPrice = "￥"+parseFloat(parseFloat(dollarPrice.replace("$",""))*6.5).toFixed(2);
	   contents = contents.replace(dollarPrice,yuanPrice);
    }
	//display
	document.body.innerHTML = contents;
  }
})();
