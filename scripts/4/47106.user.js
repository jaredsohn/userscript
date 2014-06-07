// ==UserScript==
// @name           Erepublick Persian Font
// @namespace      ALL TAHOMA
// @description    By V1T4L @ PC7
// @include        http://*.erepublik.com/*
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
 addGlobalStyle('body {' + 
 'font-family: tahoma;' + 
 'font-size:10pt;' + 
 'font-color:navy;' + 
 '}');		