// ==UserScript==
// @name           163-comment-show-total
// @namespace      http://userscripts.org/users/lidaobing
// @include        http://comment.*.163.com/*
// ==/UserScript==
//
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.repliesWrapper div.title div.text span.total {display:inline}');
