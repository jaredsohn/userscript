// ==UserScript==
// @name           Netvibes: Remove visted items
// @namespace      http://www.netvibes.com/
// @include        http://www.netvibes.com/*
// ==/UserScript==

/*

29-Apr-09 - Matt Collinge. http://www.mattcollinge.co.uk/
09-Dec-09 - Matt Collinge. Made it work better with Wasabi beta

*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.read { display: none; clear: none }');
addGlobalStyle('.nv-feedList { height:auto !important; }');