// ==UserScript==
// @name		eBay - extra deluxe
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @namespace	http://mixey.ebay.com/
// @include		http://*.ebay.*/*
// @updateURL   http://userscripts.org/scripts/source/133727.meta.js
// @author		Mixey
// @version		1.2
// ==/UserScript==

(function(){
	var ratio = 1;
	
	function doProcess() {
		$(".bids").each(function(){
			$(this).parent().parent().parent().parent().css("background-color","#DDE2FF");
		});


		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.google.com/ig/calculator?hl=en&q=1usd=?rur',
			onload: function onLoad(response) {
				ratio = parseFloat(/rhs.+?(\d+.\d+)/.exec(response.responseText)[1]);
				$(".g-grBig, .g-b, .stk-thr, .ms-orp, .sh-cst, span[itemprop='price'], #prcIsumConv, .fee").each(addRubLabel);
			}			
		});
	}
	
	function addRubLabel() {
		var v = $(this).text().replace(",", "");
		var re = /\$\d+\.\d+/;		
		if (!re.test(v)) return;
						
		var USD = parseFloat(/\$(\d+\.\d+)/.exec(v)[1]);

		$(this).html($(this).html() + "<div style='font-family: arial; font-size: 12px; color: orange; padding-top: 5px;'>R " 
				+ formatCurrency((USD * ratio).toFixed(2)) 
				+ "</div>"); 		
	}
	
	function formatCurrency(num) {
		num = num.toString().replace(/\$|\,/g, '');
		if (isNaN(num))
			num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * 100 + 0.50000000001);
		cents = num % 100;
		num = Math.floor(num / 100).toString();
		if (cents < 10)
			cents = "0" + cents;
		for ( var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
			num = num.substring(0, num.length - (4 * i + 3)) + ','
				+ num.substring(num.length - (4 * i + 3));
		} 
			
		return (((sign) ? '' : '-') + num + '.' + cents);
	}
	
	doProcess();
})(jQuery);