// ==UserScript==
// @name           Springpad Wide
// @namespace      http://userscripts.org/users/455023
// @description    Changes Springpad Layout to full browser width.
// @include        http://springpad.com/*
// @include        http://www.springpad.com/*
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

//stylesheet
addGlobalStyle('.sectioned-page > * > * {width: 100% !important;}.explore-panel > .explore-nb {width: 100% !important;}');
