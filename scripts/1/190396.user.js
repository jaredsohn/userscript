// ==UserScript==
// @name           Twitter DM Button
// @description    Twitter DM Button Fixer.
// @author         Serkan Algur
// @include        http://twitter.com/*
// @include	   https://twitter.com/*
// @version        0.1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.global-dm-nav {top:11px !important;}');