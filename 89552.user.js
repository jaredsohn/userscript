// ==UserScript==
// @name           Facebook font-size changer
// @namespace      Deepak Mittal
// @description    Undo the recent font-size change in facebook
// @include        http://*facebook.com/*
// @include        https://*facebook.com/*
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

addStyle('div.actorName{display:inline;} h1,h2,h3,h4,h5,h6{font-size:13px !important; color:#333 !important;}');