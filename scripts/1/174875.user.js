// ==UserScript==
// @name        Malaysia Bay Cleaner
// @namespace   http://lesleh.co.uk/
// @include     http://lanunbay.org/*
// @updateURL http://userscripts.org/scripts/source/174875.user.js
// @version     1.0
// @description Cleans malaysiabay.org
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function($) {
    
    // Remove ads
    $('iframe').remove();
    $('.creatives').remove();
    $('#main-content').css('margin-left', 0);
    
    // Block popup
    unsafeWindow.open = function() { return false; }

})(jQuery);