// ==UserScript==
// @name           CSD Auth community simplifier
// @namespace      http://mike.thedt.net
// @description    Removes some stuff from CSD Auth Community
// @include        http://csdauthcommunity.freeforums.org/**
// ==/UserScript==

var logo = document.getElementById('logo');
if (logo) {
    logo.parentNode.removeChild(logo);
}

var clock = document.getElementById('portal_clock');
if (clock) {
    clock.parentNode.removeChild(clock);
}

GM_addStyle("html, body { background: none; }");