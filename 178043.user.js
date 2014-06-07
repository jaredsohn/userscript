// ==UserScript==
// @name        Remove annoying slashdot tagline
// @namespace   http://userscripts.org/users/lorriman
// @description Find the tagline at the bottom of the slashdot page annoying? This gets rid of it except for the front page.
// @include     http://slashdot.org/?page=*
// @match     http://slashdot.org/?page=*
// @grant          none
// @version     .1
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


addGlobalStyle(".msg.grid_24 {display:none}");
