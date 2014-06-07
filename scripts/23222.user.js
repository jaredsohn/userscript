// ==UserScript==
// @name           Hide LinkedIn News
// @namespace      http://www.billso.com/userscripts
// @description    Hide the beta news box and ads in LinkedIn.com
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


addGlobalStyle('div.tabs { display: none; } ');
addGlobalStyle('div.news { display: none; } ');
addGlobalStyle('div.article { display: none; } ');
addGlobalStyle('div.discover { display: none; } ');
addGlobalStyle('div.news-block { display: none; } ');
addGlobalStyle('div.company-news { display: none; } ');
addGlobalStyle('div.industry-news { display: none; } ');
addGlobalStyle('div.seeall { display: none; } ');
addGlobalStyle('div.adsense { display: none; } ');
addGlobalStyle('div.textad { display: none; } ');
addGlobalStyle('div.ads728 { display: none; } ');
addGlobalStyle('div.buckets { display: none; } ');

var elem = document.getElementById('genericPageSlot1');
if (elem) elem.parentNode.removeChild(elem);