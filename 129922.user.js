// ==UserScript==
// @name           Make Chrome Faster
// @description    remove ads
// @include        http://*.facebook.com/*
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
addGlobalStyle('.logoutButton{display:none ! important}');
