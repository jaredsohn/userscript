// ==UserScript==
// @name           Facebook Comic Sans mod
// @namespace      http://userscripts.org/users/65153
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==


function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('div, span, h1,h2,h3,h4,h5,h6{font-family:"Comic Sans MS" !important;}');