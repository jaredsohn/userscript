// ==UserScript==
// @name       Confluence main nav stay in place
// @namespace  http://pure-essence.net
// @version    0.1
// @description  Specifically for confluence, this script makes the navigation bar stay in place on wiki pages.
// @grant       none
// @match      https://confluence.meredith.com/display/*
// @copyright  2012+, You
// ==/UserScript==


// insert jquery
// http://joanpiedra.com/jquery/greasemonkey/
var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
        
        GM_JQ.src = '//code.jquery.com/jquery-latest.min.js';
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

    if($('#navigation').length > 0) {
        $('#navigation').css({
            'position': 'fixed',
            'right': '0',
            'background-color': '#fff'
        });
    }

}
