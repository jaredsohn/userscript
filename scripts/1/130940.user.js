// ==UserScript==
// @name          Wiki Blue Background Chrome fix
// @author        Ravikiran Janardhana
// @description   Removes blue background for chrome in wikipedia pages
// @match http://en.wikipedia.org/*
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

addGlobalStyle('#mw-head-base { background-image: none;}');
addGlobalStyle('div#content { background-image: none;}');
addGlobalStyle('div#footer { background-image: none;}');
