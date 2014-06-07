// ==UserScript==
// @name           ptna_visited_links_Fix
// @author         DODeath
// @namespace      puretna.com
// @include        http://puretna.com/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    document.getElementsByTagName('body')[0].appendChild(style);
}

//(function (){
//})();


addGlobalStyle('a:visited {color:#6800a4 !important;}');
addGlobalStyle('a.darklink:visited {color:#fff !important;}');

