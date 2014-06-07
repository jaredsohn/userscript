// ==UserScript==
// @name          Fix Gaia Profile Columns 
// @description   Fix columns on gaia profile for screen resolution below 1024 768
// @include       http://gaiaonline.com/profiles/*
// @include       http://*.gaiaonline.com/profiles/*
// @include       https://gaiaonline.com/profiles/*
// @include       https://*.gaiaonline.com/profiles/*
// @include       http://gaiaonline.com/p/*
// @include       http://*.gaiaonline.com/p/*
// @include       https://gaiaonline.com/p/*
// @include       https://*.gaiaonline.com/p/*
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

addGlobalStyle(
'#columns {min-width:1022px !important;} );