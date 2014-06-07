// ==UserScript==
// @name           https
// @namespace      http://userscripts.org/users/290790
// @description    highlights https items on http pages
// @include        https://*
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
			$('*[src^="http://"]').each( function(){
				$(this).css('border','1px solid red');
				$(this).css('background','red');
		    });
				$('script[src^="http://"]').each( function(){
					$("body").prepend('Script with http source: ' + $(this).attr('src')+ "<br />")
			    })
    }


