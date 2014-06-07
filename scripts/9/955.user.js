// Google Suggest Greasemonkey script
// version 0.3
// 2005-04-01
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// See http://www.holovaty.com/blog/archive/2005/03/19/1826
//
// Changelog:
// 0.1 (2005-03-19) -- Original release.
// 0.2 (2005-03-22) -- Now using ev.handleEvent instead of setTimeout
//                     hack. (Thanks, Follower!)
// 0.3 (2005-04-01) -- Now including on google.* instead of just on
//                     google.com. (Thanks, Etienne!)
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Google Suggest
// @namespace       http://www.holovaty.com/code/firefox/greasemonkey/
// @description     Adds Google Suggest dropdown to normal Google searches
// @include         http://*.google.*/*
// ==/UserScript==

(function() {
    get_search_form = function() {
        return document.evaluate("//form[@action='/search']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    // Find the search form. If it doesn't exist on this page, don't bother.
    if (!get_search_form()) return;

    // "Import" Google Suggest JavaScript by dynamically appending it to the
    // current page as a <script> element.
    var s = document.createElement('script');
    s.src = 'http://www.google.com/ac.js';
    var ev = new Object();
    ev.handleEvent = function (e) {
        var f = get_search_form();
        InstallAC(f, f.q, f.btnG, 'search', 'en');
    };
    s.addEventListener('load', ev, true);
    document.getElementsByTagName('head')[0].appendChild(s);
})();
