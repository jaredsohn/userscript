// ==UserScript==
// @name           damnGmailNewUI
// @namespace      wutj.info
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
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

addGlobalStyle("TR.zE{background-color:#FFE28A}DIV.iv{background-color:#FFE28A}");
