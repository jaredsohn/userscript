// ==UserScript==
// @name           Google Ad Remover (2011)
// @namespace      userscripts.org
// @description    Removes Google Ad's in search
// @version        0.01
// @include     http://*google.*
// @include     https://*google.*
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

addStyle('#tads { display: none; }');
addStyle('#mbEnd { display: none; }');
