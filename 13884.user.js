// ==UserScript==
// @name           MyStudiVZ (Dunkelblau)
// @namespace:     http://userscripts.org/scripts/show/13884      
// @identifier:    http://userscripts.org/scripts/source/13884.user.js
// @version:       V1
// @date:          2008-02-13 
// @description    StudiVZ in darkblue
// @include        http://*studivz.net/*
// @include        http://*schuelervz.net/*
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
addGlobalStyle('@import url(http://www.jstarke.de/mystudivz.css);');
