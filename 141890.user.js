// ==UserScript==
// @name        OpinionLab mobile.de-URLs
// @namespace   de.mobile.greasemonkey.opinionlab
// @description Changes the URLs on the OpinionLab comments summary page to mobile.de so that the links are not broken
// @include     https://oo.opinionlab.com/*
// @version     3
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function() {
    $("a.smred").each(function() {
        $(this).attr("href", function() {
            return this.href.replace(/^http(s)*?:\/\/(de|ro|pl|fr|it|en|es|cz|ru)\.(.+)$/, "http$1://$3");
        });
    });
});
