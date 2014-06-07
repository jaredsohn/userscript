// ==UserScript==
// @name           regchulaforff
// @namespace      Reg Chula fore Firefox
// @include        http*://www.meweb.eng.chula.ac.th/course/213-EngMech/*
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

addGlobalStyle('table{ color: #000 ! important; }');