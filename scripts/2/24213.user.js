// ==UserScript==
// @name           schuelervz in schwarz/orange by http://www.schuelervz-tricks.de.vu
// @namespace      http://www.schuelervz-tricks.de.vu
// @description    Das SchuelerVZ in Schwarz/Orange anstatt Rot/Rosa by http://www.schuelervz-tricks.de.vu
// @include        http://*schuelervz.net/*
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
addGlobalStyle('@import url(http://svztricks.ifrance.com/new/svz/svz.css);');