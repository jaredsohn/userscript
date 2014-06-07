// ==UserScript==
	// @name                qqq
	// @namespace	        http://www.first-realty.com.ua/rent/flat/
	// @description	        111
	// @include		http://www.first-realty.com.ua/rent/flat/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
$("#id_main_table tbody tr td table tbody tr td table tbody tr td table tbody tr td").each(function(){
	var price = /\d+\$/ig;
	var text = $(this).html();
	if (price.test(text)) {
		var price_num = text.replace('$', '');
		if (price_num > 600) {
		    $(this).closest('table').closest('td').closest('table').hide();
                        
		}
	}
	})

}