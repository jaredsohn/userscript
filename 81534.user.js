// ==UserScript==
// @name Nopub
// @namespace 
// @description No pub
// @include http://*.forums-actifs.*
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

addGlobalStyle('#add-google { height: 0px; display: none ! important; } .tradeDoubler { height: 0px; display: none ! important; }');