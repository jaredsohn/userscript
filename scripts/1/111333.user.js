// ==UserScript==
// @name Netflix4KidsOnly
// @description Disables navigation on Netflix Kids page so Kids can watch streaming movies without accessing account info or navigate out of the kids section.
// @version 1.0.2
// @include http://movies.netflix.com/Kids
// @include http://movies.netflix.com/Kids*
//@namespace http://userscripts.org/users/392696/scripts
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
        $('#netflix').css({'visibility':'hidden'});
		$('#top-nav').css({'display':'none'});
		$('#global-tools ul').css({'visibility':'hidden'});
		$('#footer').css({'visibility':'hidden'});
    }
