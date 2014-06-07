// ==UserScript==
// @name           Blue Dot Right
// @namespace      http://bluedot.us
// @description    Make Blue Dot images right justified
// @include        http://bluedot.us/*
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

addGlobalStyle('ul.dotList div.note img { float:right ! important; }');
