// ==UserScript==
// @name           Facebook Old Style Font
// @namespace      Rishabh Agarwal
// @description    Get the old font style back of Facebook
// @include        http://*facebook.com/*
// ==/UserScript==

function oldStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

oldStyle('div.actorName{display:inline;} h1,h2,h3,h4,h5,h6{font-size:13px !important; color:#333 !important;}');