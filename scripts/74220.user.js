// ==UserScript==
// @name           thaiwittercustomcolor
// @namespace      thaiWitter Custom Color
// @include        http*://tw.dt.in.th/thaiWitter/*
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
var randomnumber=Math.floor(Math.random()*111)
addGlobalStyle('@import "http://www.gearsedge.in.th/external/thaiwittercc.css?'+randomnumber+'";');