// ==UserScript==
// @name        ULN Buttons
// @namespace   http://www.MegaCoder.com
// @description Highlight nav words so that they look like buttons
// @include     http://linux.oracle.com/*
// @include     https://linux.oracle.com/*
// @require     http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

$(document).ready( function()   {
    $('a.t20NavBar').css({
        'border'  : '3px outset #DDDFDF',
        'padding' : '2px 4px 2px 4px',
        'margin'  : '0px 10px 0px 10px'
    });
});

// vim: et sw=4 ts=4
