// ==UserScript==
// @name          iStockPhoto Top Toolbar!
// @namespace     http://bitfed.net/userscripts
// @description	  Puts the iStockPhoto toolbar at the top of the page
// @include       http://istockphoto.com/*
// @include       http://www.istockphoto.com/*
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

addGlobalStyle('#toolbar { height: 27px; left: 600px; line-height: 22px; min-width: 0px;top: 83px !important; bottom: auto !important;}');