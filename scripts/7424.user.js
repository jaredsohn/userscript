// ==UserScript==
// @name           Hide LinkedIn Ads
// @namespace      http://www.johnweldon.com/userscripts
// @description    Hide annoying ads
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

addGlobalStyle('div.adsense { display: none; } ');
addGlobalStyle('div.textad { display: none; } ');
addGlobalStyle('div.ads728 { display: none; } ');
addGlobalStyle('div.buckets { display: none; } ');

var elem = document.getElementById('genericPageSlot1');
if (elem) elem.parentNode.removeChild(elem);

