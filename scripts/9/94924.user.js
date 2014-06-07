// ==UserScript==
// @name           Hide Header in Zoho Tickets
// @namespace      http://www.zedoary.net
// @description    Hide Header in Zoho Tickets
// @include        http://zedoary.estreamdesk.com/*
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

addGlobalStyle('div.header { display: none; } ');

var elem = document.getElementById('header');
if (elem) elem.parentNode.removeChild(elem);