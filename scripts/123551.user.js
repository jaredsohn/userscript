// ==UserScript==
// @name       Ostatni miesiac DW
// @namespace  http://darkwarez.pl
// @version    0.1
// @description  pozwala na wyszukiwanie dodanych postow w okresie ostatniego miesiaca
// @include    http://*darkwarez.pl/forum/search.php
// @copyright  2012+, oR^
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        var data_czas = new Date();
        var dzien = data_czas.getDate();
        $('[name="search_time"]').append('<option value="'+dzien+'" style="font-weight: bold;">Ostatni miesiąc</option>');
    }