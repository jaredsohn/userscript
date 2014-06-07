// ==UserScript==
// @name           Hide BYOND share to facebook
// @namespace      http://userscripts.org/users/cboland
// @description    Hides the share to facebook button
// @include        http://www.byond.com/*
// @include        http://byond.com/*
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

addGlobalStyle('.FBConnectButton_Text_Simple{display: none !important;}');