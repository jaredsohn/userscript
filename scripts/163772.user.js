// ==UserScript==
// @name        deact_red
// @require       http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==


$(function() {
    $("tr:contains('deact')").css({"background-color":"#f9f9f9","color":"#e6e6e6"});
});