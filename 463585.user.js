// ==UserScript==
// @name       Anti anti-adblock for writing.com
// @namespace  http://www.writing.com
// @version    0.2
// @description Removes the whiny stuff about adblock from writing.com
// @match      http://www.writing.com/*
// @copyright  2014, Phoenix_the_II
// @run-at document-start
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
    (function ($) 
     { 
         if ($.adblock === undefined) 
         { 
             $.adblock = false; 
         } 
         $.fn.showOnAdBlock = function () 
         {  
             if ($.adblock) 
             { 
                 //this.show(); 
             } return this; 
         }; 
     })
    (jQuery);
    
}
