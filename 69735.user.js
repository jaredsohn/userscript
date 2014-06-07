// ==UserScript==
// @name           Odoponizator2
// @namespace      http://drewniacki.blip.pl
// @description    Omija rdir.pl - nie pojawi Ci sie Pan Oponka
// @include        http://blip.pl/*
// @include        *.blip.pl/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
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
        $('a[href^=http://rdir.pl/]').each(function(index){
            $(this).attr("href", $(this).attr("title"));
        });
    }