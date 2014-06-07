// ==UserScript==
// @name            Youtube Logo - link to Subscriptions feed
// @description     This script changes Youtube logo to link to user's Subscription feed section instead of default Youtube homepage (only works if you are signed in Youtube)
// @version         1.0.2b
// @include         http://*.youtube.com/*
// @include         https://*.youtube.com/*
// @updateURL       http://userscripts.org/scripts/source/167966.user.js
// @author          tolanri
// ==/UserScript==

cnr = function(el) {
    if (/\/(:?\W|$)/.test(el.getAttribute('href'))) {
        return el.href = '/feed/subscriptions';
    }
}

var logo = document.getElementById('logo-container');
var signedin = document.getElementById('yt-masthead-user') != null;

if ( signedin == true ) {
    cnr(logo);
    var els = logo.getElementsByTagName('*');
    for (var i = 0, l = els.length; i < l; i++) {
        cnr(els[i]);
    }
}