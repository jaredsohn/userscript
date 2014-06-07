// ==UserScript==
// @name           SGUni Gates
// @description    SGUni Gates

// @include        *sguni.pl/*
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
addGlobalStyle('#wrotacenter{background:#0d140d url(http://img42.imageshack.us/img42/7986/stargate.gif) 50px 20px no-repeat;width:400px;height:115px;float:left;padding-top:335px;}');

