// ==UserScript==
// @name           Facebook Cleaner
// @namespace      http://www.stealmycode.se/
// @description    Removes all the fucking cruft from facebook that Ad Block Plus doesn't already fix.
// @version        2012.11.10.4
// @author         @rubenpauladrian
// @match          http*://*facebook.com/*
// @copyright      None, code is algorithms, algorithms are math, and math is free for all. Fuck copyright.
// @downloadURL    http://userscripts.org/scripts/source/152152.user.js
// @updateURL      http://userscripts.org/scripts/source/152152.meta.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
(function($) {
    $(function() {
        $('#pagelet_ego_pane_w').remove();
    });
}(jQuery));