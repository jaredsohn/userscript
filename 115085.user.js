// UsableScripts
// Version 2.4
// Feb 14, 2014
//
// Copyright (c) 2011 USA, Lone Hood (TM)
// Released under the GNU General Public License, version 3 (GPL-3.0)
// https://gnu.org/licenses/gpl-3.0.txt
//
// --------------------------------------------------------------------
//
// Changes in this version:
//
// Also covers HTTPS links
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "UsableScripts", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name  UsableScripts
// @namespace  Doyousketch2
// @description  Widens Userscripts Forum pages
//
// @grant  GM_info
// @grant  GM_getValue
// @grant  GM_setValue
// @grant  GM_xmlhttpRequest
// @grant  GM_registerMenuCommand
//
// @include  http*://userscripts.org/topics*
// @include  http*://userscripts.org/posts*
// @include  http*://userscripts.org/forum*
// @include  http*://userscripts.org/script*
// @include  http*://userscripts.org/home/scripts
//
// @require  http://sizzlemctwizzle.com/115085.js
// @require  http://code.jquery.com/jquery-1.6.2.min.js
//
// ==/UserScript==
$('body') .ready(function () {
    // Widen content area
    $('.container') .css('width', '98%');
    $('#content') .css('width', '100%');
    if (window.location.pathname.match('/forum*')) {
        $('#content') .css('width', '-=180');
    } else if (window.location.pathname.match('/scripts/show/*')) {
        $('#content') .css('width', '-=220');
    } else if (window.location.pathname.match('/scripts')) {
        $('#content') .css('width', '-=0');
    } else {
        $('#content') .css('width', '-=110');
    };
    $('#content') .css('display', 'block');
    $('th.la') .attr('width', '');
    // Shrink stuff on right
    if (window.location.pathname.match('/forum*')) {
        $('div#right') .css('width', '160px');
    } else if (window.location.pathname.match('/scripts/show/*')) {
        $('div#right') .css('width', '200px');
    } else {
        $('div#right') .css('width', '77px');
    };
    $('div#right') .css('padding-left', '8px');
    $('div#right') .css('padding-bottom', '6px');
    $('div#right') .css('float', 'right');
    var PreWide = $('div#content') .innerWidth();
    var PostWide = (PreWide - 135 + 'px');
    var PostWide2 = (PreWide - 210 + 'px');
    // easier to add !important tags with GM_addStyle than jQuery
    x = '#content .body.entry-content pre {max-width : ' + PostWide + ' !important}';
    x += 'blockquote {max-width : ' + PostWide + ' !important}';
    x += 'table.posts tr td {max-width : ' + PostWide + ' !important}';
    if (window.location.pathname.match('/scripts')) {
        x += 'body.home #main {width : ' + PostWide2 + ' }';
    };
    GM_addStyle(x);
    // Check for browser, if mozilla you can fit to size
    var ua = $.browser;
    if (ua.mozilla) {
        $('#content .body.entry-content pre') .css('width', '-moz-max-content');
        $('blockquote') .css('width', '-moz-fit-content');
    } else {
        $('#content .body.entry-content pre') .css('width', '95%');
        $('blockquote') .css('width', '95%');
    };
    // Remove padding because it wrecks scroll bars
    $('pre') .css('padding', '0px');
    $('pre') .css('margin-left', '9px');
    $('pre') .css('border-width', '0px');
    $('pre') .css('outline', '#EEEEEE solid 9px');
    $('.posts .post .body blockquote') .css('padding', '0px');
    $('.posts .post .body blockquote') .css('margin-left', '7px');
    $('.posts .post .body blockquote') .css('border-width', '2px 0px 0px 0px');
    $('.posts .post .body blockquote') .css('outline', '#EEFFCC solid 7px');
});
