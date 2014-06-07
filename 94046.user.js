// ==UserScript==
// @name           OLEV BLOCKER by bcfu
// @namespace      4chan
// @include        http://boards.4chan.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var $;
var jQuery;
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

    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

function letsJQuery() {

	// Simple Javascript Array where the bad words can be edited
	var badwords = new Array('OLEV','olev','OL3V','SANJAY','sanjay','Sanjay');

	$.each(badwords, function(index, value) { 
		$('td:contains("'+value+'")').each(function() {
			$(this).hide();					
		});
	});
		
}