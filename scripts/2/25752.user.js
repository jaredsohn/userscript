// ==UserScript==

// @name           Sjorod

// @namespace      Sjorod

// @include        http://www.sjorod.se/

// ==/UserScript==
var elements = ['jsn-header_wrapper','jsn-promo','jsn-footer_wrapper'];

for (i = 0; i < elements.length; ++i) {
    var element = document.getElementById(elements[i]);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#jsn-body_wrapper { background: #192532; }');