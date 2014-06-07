// JavaScript Document
// ==UserScript==
// @name           Ikariam Background (18-32)
// @autor          SieNoK
// @email          bsienok@yahoo.com
// @namespace      Ikariam
// @description    Insert ikariam background (http://images4.wikia.nocookie.net/ikariam/images//3/3a/Cityphasen8ww9.jpg)
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

/*TEST VERSION, SLOW CODED ONLY FOR TESTING PURPOSE*/

function addAnimStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addAnimStyle('#city #container .phase13, #city #container .phase18, #city #container .phase32 {    background-image:url(http://images4.wikia.nocookie.net/ikariam/images//3/3a/Cityphasen8ww9.jpg);}');
