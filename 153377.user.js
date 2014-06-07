// ==UserScript==
// @name eBay Back Button Protector
// @version 0.4
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @match *://*.ebay.com/*
// ==/UserScript==

(function($) {
    var bind_protect_fn = null;
    var bind_protect = function() {
        if (bind_protect_fn) {
            return;
        }
        bind_protect_fn = function(e) {
            return 'Are you sure?';
        };
        $(window).bind('beforeunload', bind_protect_fn);
    };
    var unbind_protect = function() {
        if (bind_protect_fn) {
            $(window).unbind('beforeunload', bind_protect_fn);
            bind_protect_fn = null;
        }
    }
    $(document).ready(function() {
        if ($.trim($('#brdcmb').find('.level1').text()) != "SELL YOUR ITEM") {
            return;
        }
        $('form').bind('submit', function() {
            unbind_protect();
        });
        $('a').bind('click', function() {
            unbind_protect();
        });
        $(document).click(function(e) { 
            bind_protect();
        });
        $(document).keypress(function(e) { 
            bind_protect();
        });
    });
})(window.jQuery);