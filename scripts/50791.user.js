// ==UserScript==
// @name           Make AP Text Readable
// @namespace      http://chriscombs.net
// @include        http://www.apimages.com/*
// @include        http://apimages.com/*

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

addGlobalStyle("  div { color:#000000 !important ; font-weight: bold !important; } ");  
