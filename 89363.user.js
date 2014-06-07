// ==UserScript==
// @name Practice Mate Fixer
// @namespace http://thecodemill.biz/
// @description Fix all Pratice Mate (PM) IE only bugs so that PM works in FF & Chrome
// @version 0.1
// @include     http*://pm.officeally.com/*
// ==/UserScript==

var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = document.location.protocol + '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
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
    $('iframe').map(function(){
        this.src = this.src.replace(/(\\|%5C)/g, '/').replace(/^.*\/\//, '/')
    })
}
