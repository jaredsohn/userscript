// ==UserScript==
// @name       Netsuite Fix
// @namespace  netsuitefix
// @version    0.3
// @description  Fixes broken stuff in Netsuite.
// @include    https://system.netsuite.com/*
// @copyright  2012+, Brandon Adams
// ==/UserScript==


var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
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
        
         $(document).ready(function(){
            $("#messages__div").html($("#messages__div").html().replace(/&lt;br \/&gt;/gi, '<br />'));
            $("#messages__div").html($("#messages__div").html().replace(/&amp;gt;/gi, '&gt;'));
            $("#messages__div").html($("#messages__div").html().replace(/&amp;lt;/gi, '&lt;'));
        
 });

    }