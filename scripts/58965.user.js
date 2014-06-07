// ==UserScript==
// @name           Google Widescreen Search
// @namespace      http://www.shrigmedia.com/
// @description    Makes better use of screen real estate on Google search pages by using all of the horizontal space. Just like ye olde days.
// @include        *google.*/search*
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

addGlobalStyle('#cnt {max-width:100%; !important; }');
