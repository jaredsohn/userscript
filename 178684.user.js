// ==UserScript==
// @name       FtB: Dark Coffee
// @author     nejuer, Ripazhakgggdkp
// @namespace  http://www.thorgaming.com/feelthebeats/?r=user&view_id=1199
// @version    Dark
// @include    http://*.thorgaming.com/feelthebeats/*
// @run-at     document-start
// @grant      none
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

addGlobalStyle('@import url(http://rawgithub.com/Ripazhakgggdkp/Dark-Coffee/master/css/DarkCoffee.css)');