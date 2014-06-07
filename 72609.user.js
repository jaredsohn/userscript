// ==UserScript==
// @name           Reddit Helvetica
// @namespace      reconchrist
// @include        http://www.reddit.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';	
    style.innerText = css;    
    head.appendChild(style);
}

addGlobalStyle('body {font-family:"Verdana"}');