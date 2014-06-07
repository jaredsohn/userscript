// ==UserScript==
// @name           RunedevBGtoBlack
// @namespace      RSGAD
// @description    yeah
// @include        http://runedev.info/bot/*
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

addGlobalStyle("body { background-color: #000000 ! important; background-image: none ! important; } ");
