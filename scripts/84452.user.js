// ==UserScript==
// @name           grooveshark
// @namespace      http://userscripts.org/users/masf
// @include        http://listen.grooveshark.com
// ==/UserScript==

// jquery with greasemonkey code by:
// http://joanpiedra.com/jquery/greasemonkey/

//var $;


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
			// ini hide grooveshark side bar code
			$("#sidebar").css({'display': 'none', 'width': '0px'});
			$("#sidebarPane").css({'display': 'none', 'width': '0px'});
			$("#mainContentWrapper").css({'margin-right': '0px'});
			// end hide grooveshark side bar code
    }
