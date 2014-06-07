// ==UserScript==
// @name           safeway
// @namespace      safeway
// @description    safeway low price
// @include        http://shop.safeway.com/*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
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
            try{letsJQuery();}catch(foo){}
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        // Oh man!!!! Stupid ghetto frames
	// get the 3rd frame doucment object
	// create jQuery object and narrow down the select, change it, and then refresh that page.... ugh
        $('*', unsafeWindow.parent.frames[2].document).ready(function () {
            var $select = $('*',unsafeWindow.parent.frames[2].document).find('select:eq(0)');
            setTimeout(function () {
                if ($select.val() !== '4') {
                    $select.val(4);
                    $select.change();
                }
            }, 500);
        });
    }