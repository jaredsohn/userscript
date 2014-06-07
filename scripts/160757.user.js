// ==UserScript==
// @name Facebook Ticker Shrinker
// @version 0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @match *://*.facebook.com/*
// @copyright 2013+, Adam Saponara
// ==/UserScript==
(function($) {
    $(document).ready(function() {
        $('#pagelet_ticker').css('height', '20%');
    });
})(window.jQuery);
