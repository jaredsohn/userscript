// ==UserScript==
// @name            Google Maps Extended
// @namespace      http://userstyles.org
//@author           Mice Chen
// @include        http://maps.google.com/*
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

//css changed


addGlobalStyle('#gaia {display:none;}');
addGlobalStyle('.noprint {display:none;}');
addGlobalStyle('#gbar {display:none;}');
addGlobalStyle('#header {display:none;}');
addGlobalStyle('#main_map {height:100%;}');