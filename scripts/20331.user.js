// ==UserScript==
// @name           Kill Long Myspace Bulletin Titles
// @namespace      xenomark
// @description    limits length of bulletin titles, so hey don't stretch outside the table..
// @include        http://home.myspace.com/index.cfm?fuseaction=user
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

addGlobalStyle('#home_bulletins table.cols tr td a{display:block; width:90px; height:26px; overflow: hidden !important; } }');