// ==UserScript==
// @name           HTFR - Master Chief bar Fix
// @namespace      http://xboxnation.net
// @description    Changes the Halo 1 MC to the Halo 3 MC on the bar.
// @include        http://z3.invisionfree.com/The_Final_Retreat/*
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

addGlobalStyle('.maintitle { background-image: url(http://i39.tinypic.com/zc1mw.png) ! important; }');