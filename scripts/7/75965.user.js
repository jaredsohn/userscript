// ==UserScript==
// @name           Philly.com Hide Comments
// @namespace      http://userscripts.org/users/boourns
// @description    Hides all the horrible user comments on Philly.com news articles.
// @version        1.0
// @include        http://*.philly.com/*
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

addGlobalStyle('.comment_entry,#recent_comm { display:none; }');