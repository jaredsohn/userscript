// ==UserScript==
// @name           Facebook font-size changer
// @namespace      Raktai C.
// @description    Undo the recent font-size change in facebook
// @include        *facebook.com/*
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

addStyle('div.actorName{display:inline;} h1,h2,h3,h4,h5,h6,div,span{font-size:14px !important;}');

