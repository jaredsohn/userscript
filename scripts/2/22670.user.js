// ==UserScript==
// @name           Fixed SchuelerVZ-Menu
// @namespace      http://suwandhi.de/svz/site
// @description    Linkes Menue ist fixed, scrollt mit
// @include        http://*schuelervz.net/*
// @version        1.0
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
addGlobalStyle('#masterLeft {position:fixed !important;}');