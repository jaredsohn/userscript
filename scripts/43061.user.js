// ==UserScript==
// @name           ggang
// @namespace      ggang
// @description    Informations supplémentaires sur la page Territoire de Guerre des Gangs
// @include        http://apps.facebook.com/guerre-des-gangs/property.php
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.2.4.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if (typeof(unsafeWindow.jQuery) == 'undefined') { 
        window.setTimeout(GM_wait, 100); 
    } else { 
        jQuery = unsafeWindow.jQuery.noConflict(); 
        main(); 
    }
}
GM_wait();

// All your GM code must be inside this function
function main() {
    function clean_money(value) {
        return value.match(/.*\$([0-9,]+).*/)[1].replace(/,/g, "");
    }

    function format_money(value) {
        var input = value + "";
        var sep;
        var result = "";
        for (var i = 0 ; i < input.length ; i++) {
            if (i % 3 == 0 && i) {
                sep = ",";
            } else {
                sep = "";
            }
            result = input[input.length - 1 - i] + sep + result;
        }
        return result;
    }

    var best_item;
    var best_ratio = 0.0;

    jQuery("div.mod_info").each(function() {
        // Compute gains / cost ratio
        var elts = jQuery(this).find("span.green");
        var earns = jQuery(elts[0]).html();
        var costs = jQuery(elts[1]).html();
        earns = clean_money(earns);
        costs = clean_money(costs);
        var ratio = earns / costs;
        if (ratio > best_ratio) {
            best_ratio = ratio;
            best_item = jQuery(this);
        }
        // Compute total earned
        var num = jQuery(this).find("div.red").html();
        num = num.match(/.*Vous avez ([0-9]+).*/)[1];
        // Display results
        jQuery(this).append('<br/>Rapport: <span class="green">' + 
            ratio + '</span>');
        jQuery(this).append('<br/>Gains totaux: <span class="green">$' + 
            format_money(earns * num) + '</span>');
    });

    best_item.append('<div class="red" style="font-weight: bold">MEILLEUR RAPPORT!</div>');
}