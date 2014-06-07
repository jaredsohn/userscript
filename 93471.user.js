// ==UserScript==
// @name           Friendfeed Font Change
// @description    Changes font to Tahoma 12px.
// @author         Nedim Arabacı
// @include        http://*friendfeed.com/*
// @version        0.1
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

addGlobalStyle('body { font-family: Tahoma, Verdana ! important; font-size: 14px ! important; color: #666666 ! important }');