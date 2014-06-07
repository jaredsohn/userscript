// ==UserScript==
// @name           Gaia-Center-Site-BG-Changer
// @namespace      http://userscripts.org/users/227975
// @description    Changes the background image on Gaia's centered site.
// @include        http://*gaiaonline.com/*
// @exclude        http://*gaiaonline.com/profiles/*
// ==/UserScript==


/* --------------------------------------------------- */
/* CHANGE THESE VARS TO YOUR CUSTOM IMAGE AND POSITION */
/* --------------------------------------------------- */

var CUSTOM_BG_URL='http://oi46.tinypic.com/21c9mdc.jpg';
var BACKGROUND_POSITION='center bottom';


/* --------------------------------------------------- */
/*     ! DO NOT CHANGE THIS PORTION OF THE CODE !      */
/* --------------------------------------------------- */

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

if (/core2_centered.css/i.test (document.head.innerHTML) ) {
   addGlobalStyle('body { background-image: url('+CUSTOM_BG_URL+') !important; background-attachment: fixed !important; background-size: cover !important; background-position: '+BACKGROUND_POSITION+' !important; }');
}