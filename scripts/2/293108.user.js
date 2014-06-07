// ==UserScript==
// @name       VOL.AT Banner away
// @version    1.0
// @description  Weg mit diesem nervigen Banner. 
// @include      http://www.vol.at/*
// @match      http://www.vol.at/*
// @include      http://*.vol.at/*
// @match      http://*.vol.at/*
// @copyright  2014, Lirux
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

addGlobalStyle('#dfb8 { visibility: hidden !important; }');