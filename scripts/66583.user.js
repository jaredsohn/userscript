// ==UserScript==
// @name           Grey4All
// @namespace      http://userstyles.org
// @description    Gray background for any website
// @include        http://www.nytimes.com/*
// ==/UserScript==

var myBgColor='gray'

addGlobalStyle('body {background-color:'+myBgColor+'}');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
