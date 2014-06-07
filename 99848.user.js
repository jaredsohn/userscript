// ==UserScript==
// @name           regchulaforchr
// @namespace      Reg Chula for Chrome
// @match        https://www.reg.chula.ac.th/*
// @match        http://www.reg.chula.ac.th/*
// ==/UserScript==

// mathcing domain edited by kiak

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.levelone { position: relative; }');