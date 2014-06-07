// ==UserScript==
// @name           Good old Google
// @namespace      http://philipproplesch.de/greasemonkey
// @description    Removes the background image on google.
// @include        http://www.google.de/
// @include        http://google.de/
// ==/UserScript==

// http://joanpiedra.com/jquery/greasemonkey/

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
        $(document).ready(function() {
			// Removes the background image.
			$("img#fpdi").remove();
			
			// Replace the logo.
			$("#logo").css("background-image", "url('http://www.google.de/intl/en_com/images/srpr/logo1w.png')");	

			// Remove shadows from links.
			$("#fctr, #fctr a, #fctr p, .sblc a, #cpFooter a, #cpf a, #prm a, #addlang, #addlang a").css({
				"text-shadow" : "none",
				"color" : "#0000CC"
			});
			
			$("#fctr p").attr("style", "color: #0000CC !important; text-shadow: none;");
		});
    }