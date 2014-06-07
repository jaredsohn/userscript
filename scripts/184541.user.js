// ==UserScript==
// @name       Enable Loyal text Select
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    https://*.loyalbank.com/*
// @copyright  2012+, You
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

addGlobalStyle('* { user-select:text !important; }');
addGlobalStyle('* { -o-user-select: text !important; }');
addGlobalStyle('* { -moz-user-select: text !important; }');
addGlobalStyle('* { -webkit-user-select:text !important; }');

addGlobalStyle('iframe { user-select:text !important; }');
addGlobalStyle('iframe { -o-user-select: text !important; }');
addGlobalStyle('iframe { -moz-user-select: text !important; }');
addGlobalStyle('iframe { -webkit-user-select:text !important; }');


document.body.setAttribute('onload',''); 

document.body.setAttribute('onselectstart',''); 