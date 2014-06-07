// ==UserScript==
// @name          Justin.TV Chatbox Alignment
// @namespace     http://userscripts.org/users/jephrei
// @description	  This script will bring the chatbox next to the video, to make up for space if you use an ad blocker.
// @include       http://justin.tv/*
// @include       http://www.justin.tv/*
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

addGlobalStyle('#chat_container {margin-top:200px;}');
