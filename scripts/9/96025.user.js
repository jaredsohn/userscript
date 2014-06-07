// ==UserScript==
// @name           Hide LinkedIn Guided Setup
// @description    Hide the guided setup in LinkedIn.com
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


addGlobalStyle('div.guided-setup { display: none; } ');
addGlobalStyle('div.ad-block {display: none; } ');

var elem = document.getElementById('genericPageSlot1');
if (elem) elem.parentNode.removeChild(elem);

