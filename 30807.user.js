// ==UserScript==
// @name          Flickr Ad Killer
// @namespace     Your Mom
// @description	  Kills the ads left over after Adblock Plus kills the graphical ones
// @include       http://*.flickr.com/*
// @include       http://flickr.com/*
// @include       http://www.flickr.com/*
//
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

addGlobalStyle('.AdSpot {display:none!important;visibility:hidden!important;}');
