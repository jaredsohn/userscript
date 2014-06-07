// ==UserScript==
// @name          Relax - Embeddedhtml breaker
// @namespace     proair
// @description   Open the Embeddedhtml files for examle PDF files in the whole window 
// @include       https://relax.reutlingen-university.de/*
// @include      https://www.relax.reutlingen-university.de/
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

// Relax - embeddedhtml breaker
    function letsJQuery() {
	var data = $("#embeddedhtml").attr("data"); 
	datalow = data.toLowerCase();
	if (datalow.search(".pdf")!=-1){ 
		document.location.href=data; 
	}

    }