// ==UserScript==
// @name           Jappy Style
// @namespace      Jappy
// @description    Jappy Style

// @made by		   Gabbahead77

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.site {width: 1000px;}.jpy {margin-left: 400px;}#header.frame {margin-left: 410px;} #header .top {width: 830px;} #no {min-height: 0px;');



// ==/UserScript==