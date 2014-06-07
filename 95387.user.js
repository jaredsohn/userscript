// ==UserScript==
// @name           ex-nihilo 4 small screens
// @description    makes the top margin smaller, the logo disappears and the website works better on small screens like netbooks or smartphones
// @author         Basti ' Necru
// @version        0.3
// @namespace      http://ex-nihilo.x-staff-net/
// @include        *ex-nihilo.x-staff.net*
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

addGlobalStyle('body { margin-top: 1px ! important; }');