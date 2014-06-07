// ==UserScript==
// @name           PirateProxy.net Re-Writer
// @namespace      Wundark
// @include        http://pirateproxy.net/*
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
        setup();
    }
}

// All your GM code must be inside this function
function setup() {
    link_find_and_replace = function(find, replace) {
        $.each($("a"), function(index, item) {
            url = item.href;
            if (typeof url == "string" && url.indexOf(find) != -1){
                href = String(url.replace(find, replace));
                item.href = href;
            }
        });
    }
    
    link_find_and_replace("thepiratebay.se", "pirateproxy.net");
}