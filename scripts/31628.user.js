// ==UserScript==
// @name           news.yc visited links color fix
// @namespace      com.joshwand
// @description    changes visited links color to be different than metadata
// @include        http://news.ycombinator.com/*
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

addGlobalStyle('a:visited { color:#686C76;}');

