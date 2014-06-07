// ==UserScript==
// @name          IMEEM layer blocking script thing
// @namespace     http://asolis.net/script/gm.maha
// @description   get rid of the annoying black-ish layer that prevents you from playing music on IMEEM.
// @include       *://*.imeem.com/*
// ==/UserScript==
//Thanks to xEU for the suggestion on how to block the login prompt!

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    var t=setTimeout("closeFloatingWindow()",500);
}

addGlobalStyle('div.dialogUnderlay { display:none !important; }');