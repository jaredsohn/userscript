// ==UserScript==
// @name           BBC News black text
// @namespace      http://joewalp.homeip.net/
// @description    Changes BBC News article text color
// @include        http://www.bbc.co.uk/news/*
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

var css = "";
css += "p { color: black !important; }";
addGlobalStyle(css);
