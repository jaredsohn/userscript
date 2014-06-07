// ==UserScript==
// @name        IdleBrainFixer
// @namespace   http://idlebrain.com
// @description This script is inteded to fix idlebrain
// @include     http://idlebrain.com/*
// @version     1
// @grant       none
// ==/UserScript==
var $;
// Add jQuery
(function () {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head') [0] || document.documentElement,
        GM_JQ = document.createElement('script');
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;
        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
}) ();
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
    //alert($);
    // check if the dollar (jquery) function works
    //alert($() .jquery);
    // check jQuery version
    $('#content > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)') .remove();
    $('#footer') .remove();
    $('#content > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)') .remove();
    $('#content > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2)') .remove();
    $('#content > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > table:nth-child(1)') .remove();
    $('*[height="970"]') .each(function () {
        $(this) .attr('width', '100%');
    });
    $('*[width="770"]') .each(function () {
        $(this) .attr('width', '100%');
        //alert($(this));
    });
    $('*[width="900"]') .each(function () {
        $(this) .attr('width', '100%');
        //alert($(this));
    });
    $('*[src^="images5/banner"]') .each(function () {
        $(this) .remove();
    });
    $('*[src^="images5/pillar"]') .each(function () {
        $(this) .remove();
    });
    $('*[src^="images4/pillar"]') .each(function () {
        $(this) .remove();
    });
    $('*[src^="images5/square"]') .each(function () {
        $(this) .remove();
    });
    $('#content > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1)') .remove();
}
