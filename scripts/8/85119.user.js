// ==UserScript==
// @name           Hide left column in Digg v4
// @namespace      http://userscripts.org/
// @description    Hides left column of Digg v4.
// @version        0.01
// @include        http://*.digg.com/*
// @include        http://new.digg.com/*
// @include        http://www.digg.com/*
// @include        http://digg.com/*
// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('ul.sidebar-menu { visibility: hidden !important; }');
addStyle('div.columns.double { padding-left: 0px !important; }');

