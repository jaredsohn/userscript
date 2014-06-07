// ==UserScript==
// @name           ogame-planetdatapos
// @namespace      tag:mkorun@hotmail.com,2011-04-04:Dreamy
// @description    TR.Ogame planet data pos changer for firefox.
// @include        http://*.tr.ogame.*
// ==/UserScript==


addGlobalStyle('#planetdata { width:320px; font-size:11px; height: 100px; margin:140px 75px 0 0; }');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// ==/UserScript==