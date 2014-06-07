// ==UserScript==
// @name           Block Background Image Ad
// @namespace      www.matthewneilcowan.com
// @description    Blocks annoying background image ads
// @include        http://www.stltoday.com/*
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

	
addGlobalStyle( 'body { background-image: -moz-linear-gradient(top,  #EEEEEE,  #EEEEEE); height: 100%; background-attachment: fixed;}');
