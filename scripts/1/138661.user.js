// ==UserScript==
// @name           Japanese All the time font changer
// @description    Changes hard to read font to readable font!
// @author         James Thomas
// @include        http://*.alljapaneseallthetime.*
// @include        https://*.alljapaneseallthetime.*
// @version        1.1
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

addGlobalStyle('body, a, h1, h2, h3, h4, h5, h6, th, div, input[type="text"], span, label, button, textarea { font-family: "Open Sans", sans-serif; }');
