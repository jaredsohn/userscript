// ==UserScript==
// @name           permalinks
// @namespace      johnpowell
// @description    permanent permalinks
// @include        http://www.fluther.com/*
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

addGlobalStyle('a.permalink { visibility: visible ! important; color: #77868A ! important; }');