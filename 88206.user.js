// ==UserScript==
// @name           Hide 4N Banners
// @namespace      http://www.zedoary.net
// @description    Hide 4N Banners
// @include        http://www.4networking.biz/*
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

addGlobalStyle('div.signature { display: none; } ');
addGlobalStyle('span.smallerText { display: none; } ');
addGlobalStyle('ul.smallText { display: none; } ');

addGlobalStyle('span.darkBlueText  { display: none; margin-top:-50px; } ');

var elem = document.getElementById('genericPageSlot1');
if (elem) elem.parentNode.removeChild(elem);