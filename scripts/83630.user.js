// ==UserScript==
// @name           name
// @namespace      the namespace
// @description    the description
// @include        http://www.cnn.com/US
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('cnn_maintopt1')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#cnn_maintopt1 { display: none ! important; }');