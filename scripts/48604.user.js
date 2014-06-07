// ==UserScript==
// @name           Gmail Tasks, make room
// @namespace      none
// @include        https://mail.google.com/mail/*
// ==/UserScript==



function addGlobalStyle(css) {
    var head = document.getElementsByTagName("head")[0];
    if (!head) { return; }
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.q0CeU{margin-right:239px;}');
