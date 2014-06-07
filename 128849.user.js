// ==UserScript==
// @name           EZTV.it font changer
// @version        0.1
// @creator        sipp11
// @namespace      userscripts.org
// @description    Changes the font family for EZTV which sucks in Linux
// @include        https://eztv.it/*
// @include        http://eztv.it/*
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

addGlobalStyle('*,body{font-family:Museo,Prelude,Roboto,'+
'Ubuntu,DejaVu Sans,monospace;}');

//eof