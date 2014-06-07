// ==UserScript==
// @name	Facebook Old Style Font
// @description	Reverts to the old font size (13px) on Facebook.
// @author	Alex Aplin
// @include	http://*facebook.com/*
// @include	https://*facebook.com/*
// ==/UserScript==

function oldStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

oldStyle('h1,h2,h3,h4,h5,h6,.uiStream .uiStreamMessage .actorName{display:inline !important;}h1,h2,h3,h4,h5,h6,td,.uiList,input[type="button"]{font-size:13px !important;}');
