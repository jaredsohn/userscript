// ==UserScript==
// @name           RHMB
// @namespace      by Sandbag
// @include        http://www.radiohead.com/msgboard/*
// @include        http://radiohead.com/msgboard/*
// @include        http://radiohead.co.uk/msgboard/*
// @include        http://www.radiohead.co.uk/msgboard/*
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

addGlobalStyle(' body {background-color: #6699CC;}');


