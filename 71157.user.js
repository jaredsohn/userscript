// ==UserScript==
// @name           Hide Ars Ads
// @version        1.1
// @namespace      http://fellas.org
// @description    Hide the "ad columns" from the ARS News Articles.
// @include        http://arstechnica.com/*
// @require        http://usocheckup.redirectme.net/71157.js
// ==/UserScript==
//******************************************************************************

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
      $("div.adFrameContainer").each(function(i) { 
        //this.style.display="none"; 
        this.style.width = "0px"; 
        this.style.height = "0px"; 
        this.style.overflow = "hidden"; 
      });
    }
 