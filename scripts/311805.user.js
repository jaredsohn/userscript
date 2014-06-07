// ==UserScript==
// @name            PirateBayEnhancer
// @version         0.1.0
// @namespace       http://www.thepiratebay.se
// @include         http://thepiratebay.*
//
// @require         http://code.jquery.com/jquery-2.1.0.min.js
//
// @grant           none
//
// Author:          Tobias Schneider
// Changelog:
//                  0.1.0       - Add: Maximum page size

// ==/UserScript==

$(function () {

    $('#content').css({
    'margin' : '15px',
    'max-width' : '100%'
    });

    $('#main-content').css({
    'margin-left' : '0px'
    });

});
