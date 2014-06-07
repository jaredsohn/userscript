// ==UserScript==
// @name           Hide LinkedIn Ads v2
// @namespace      http://www.johnweldon.com/userscripts
// @description    Hide annoying ads - edited version
// @include        http://www.linkedin.com/*
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

addGlobalStyle('div.ad-block { display: none; } ');
addGlobalStyle('div.ad-hdr-2b { display: none; } ');
addGlobalStyle('div.ad-home-1 { display: none; } ');

var elem = document.getElementById('genericPageSlot1');
if (elem) elem.parentNode.removeChild(elem);