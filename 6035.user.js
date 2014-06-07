// ==UserScript==
// @name                Google Reader Fix Unread Count Position
// @namespace      	http://google.com/reader/userscript
// @description       	Shift the feed names and unread counts to the left so the unread counts don't get cut off.
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
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

addGlobalStyle('#sub-tree ul {padding-left: 0px ! important;}');

