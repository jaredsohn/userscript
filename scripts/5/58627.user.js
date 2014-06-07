// ==UserScript==
// @name           Show BYOND yea & nay
// @namespace      http://userscripts.org/users/cboland
// @description    Shows the yea & nay vote in blog posts on BYOND which may be hidden in the CSS
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

addGlobalStyle('.post_vote{display: inline !important;}');
addGlobalStyle('.post_vote a { display: inline !important;}');
addGlobalStyle('.post_vote a + a { display: inline !important;}');