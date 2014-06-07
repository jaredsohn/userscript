// ==UserScript==
// @name       MDPC-X: Currency Converter
// @namespace  http://www.nickawilliams.com/
// @version    1.0.0
// @description  Converts all prices from EUR to USD.
// @match      http://*.mdpc-x.com/*
// @copyright  2014, Nick Williams
//
// @require         http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);

(function($) {
    var pattern = /([0-9]+\,[0-9]{2})\sEuro\b/g;
	var pageContents = $('body').text();
	var match;
	var matches = [];
	
	GM_xmlhttpRequest({
	    method: "GET",
        url: "http://download.finance.yahoo.com/d/quotes.csv?s=EURUSD=X&f=Xl1&e=.csv",
        onload: function(responseDetails) 
        {
            var response = responseDetails.responseText.split(",");
            var eurUsd = parseFloat(response[1])

            while(match = pattern.exec(pageContents)) {
				var valueEur = parseFloat(match[1].replace(',', '.'));
				var valueUsd = Math.round(valueEur * eurUsd * 100)/100;
				var value = '$ ' + valueUsd.toFixed(2);
				
				$('body *').replaceText(match[0], value);
			}
        }
    });
})(jQuery);
