// ==UserScript==
// @name         essai
// @namespace      
// @version        
// @description    Deleate s the officer icons 
// @include        http://*.ogame.*
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

addGlobalStyle('#officers { height: 0px; display: none ! important; }');