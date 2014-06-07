// ==UserScript==
// @name Google Restore Underline
// @namespace GRU
// @description Restores underlining to Google title results.
// @version 122.13.13.0145
// @run-at  document-ready
// @include http://www.google.*/*
// @include https://www.google.*/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author drhouse
// ==/UserScript==

$(document).ready(function () {
    
    $('#res a').css('text-decoration','underline');
    
});