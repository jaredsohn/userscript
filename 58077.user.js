// Hsjp.pwn.pl - Słownik Języka Polskiego - remix
// version 0.1
// 2009−09−19
// Copyright (c) 2009, Jakub Chodorowicz - http://www.jakub.chodorowicz.pl/
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           sjp.pwn.pl - Słownik Języka Polskiejgo - remix
// @namespace      http://www.jakub.chodorowicz.pl/
// @description    wybiera automatycznie "w słowniku języka polskiego" jako domyślny zakres poszukiwań
// @include        http://sjp.pwn.pl/*
// @include        http://www.pwn.pl/*
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
        //alert($); // check if the dollar (jquery) function works
        $("#topwyszukiwarka select[name='gdzie']").val("3");
    }