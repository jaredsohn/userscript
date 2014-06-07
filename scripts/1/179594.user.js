// ==UserScript==
// @name            Global Font Family
// @include         http://*
// @include         https://*
// @run-at          document-start
// ==/UserScript==

function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body {font-family:sans-serif !important;}');
addGlobalStyle('p {font-family:sans-serif !important;}');