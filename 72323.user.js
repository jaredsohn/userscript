// ==UserScript==
// @name           Show BYOND share to facebook
// @namespace      http://userscripts.org/users/cboland
// @description    Shows the share to facebook in blog posts on BYOND which may be hidden in the CSS
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

addGlobalStyle('.FBConnectButton_Text_Simple{display: inline !important;}');