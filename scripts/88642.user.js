// ==UserScript==
// @name           Hide BS
// @namespace      02J
// @description    Hides signatures and other crap.
// @include        http://bimmerforums.com/*
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

addGlobalStyle("div.signature { display: none; }"); //hides undesired user info