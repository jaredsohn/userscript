// ==UserScript==
// @author         junecaz
// @name           ECAZ Monetary Market Tool
// @version        0.1
// @description    Calculate monetary market total
// @namespace      http://userscripts.org/users/141843
// @include        http://ww*.erepublik.com/**/exchange*
// ==/UserScript==


var populate_function = null;

function main() {
    window.setTimeout(
        function() {            
            var total = 0;
            var offer_list = $('span[id^="initial_amount_"]');
            for (var i = 0; i < offer_list.length; i++) {
                total += parseFloat (offer_list[i].innerHTML);
            }
            // alert ("Total of offers: " + total);
            if ($('#total_sum').length == 0) {
                $('#table_list_offers tr:last').after('<tr><td id="total_sum">Total:</td><td colspan="3">' + total + '</td></tr>');
            }
            setTimeout(main(), 200);
        }, 1500);
};


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; main(); }
}

GM_wait();

