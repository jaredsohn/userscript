// ==UserScript==
// @name           Technet Width Restrictions
// @namespace      http://greencm.blogspot.com
// @description    fix technet articles to readable
// @include        http://technet.microsoft.com/*
// @include        http://msdn.microsoft.com/*
// ==/UserScript==

// taken from http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.content { width: 600px; }');