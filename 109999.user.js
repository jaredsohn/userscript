// ==UserScript==
// @name        asdasd
// @author	asdsss
// @homepage	asd
// @namespace	sd
// @version 	asd
// @description	as
// @copyright	© _eNeRGy_, 2008-2010
// @include	http://it-s-web0001.it.abb.com/asknet/Content/AdministrationUsers.aspx
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
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
        $('.floatingGrid').parent().css('height','150px!important;');
		$('.floatingGrid').parent().hover().ToggleDown();
    }