// ==UserScript==
// @name           Ikariam IVV dizajn
// @namespace      Ikariam IVV grad
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

function addNewStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addNewStyle('#city #container .phase1, #city #container .phase2, #city #container .phase3, #city #container .phase4, #city #container .phase5, #city #container .phase6, #city #container .phase7, #city #container .phase8, #city #container .phase9, #city #container .phase10, #city #container .phase11, #city #container .phase12, #city #container .phase13, #city #container .phase14, #city #container .phase15, #city #container .phase16, #city #container .phase17, #city #container .phase18, #city #container .phase19, #city #container .phase20, #city #container .phase101 {background-image:url(http://img211.imageshack.us/img211/7168/ivvphasebc5.jpg);}');
addNewStyle('#city #container #mainview #locations .wall .buildingimg {background-image:url(http://img352.imageshack.us/img352/8684/spacervf7.gif);}');