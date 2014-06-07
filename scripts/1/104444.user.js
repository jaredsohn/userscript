// ==UserScript==
// @name           Facebook share popup chrome - windows 7
// @namespace      Raktai C.
// @description    fix share button was hide
// @include        *www.facebook.com/sharer/sharer.php*
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

addStyle('div.sharerButtonContainer {bottom: 35px;}');