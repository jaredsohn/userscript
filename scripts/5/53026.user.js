// ==UserScript==
// @name          qgpatches
// @namespace     
// @description   
// @include       http://*.qguys.*/*
// ==/UserScript== 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }

    style = document.createElement('link');
    style.rel='stylesheet';
    style.type='text/css';
    style.href='data:text/css;charset=utf-8,'+escape(css);

    head.appendChild(style);
}

addGlobalStyle('a.username:visited {text-decoration: line-through !important;}');
addGlobalStyle('a.noul:visited {text-decoration: line-through !important;}');
addGlobalStyle('div.nam a:visited {text-decoration: line-through !important;}');
addGlobalStyle('div.nams a:visited {text-decoration: line-through !important;}');
addGlobalStyle('div.nn a:visited {text-decoration: line-through !important;}');
addGlobalStyle('div.op a:visited {text-decoration: line-through !important;}');
addGlobalStyle('div.who a:visited {text-decoration: line-through !important;}');
addGlobalStyle('div.pokname a:visited {text-decoration: line-through !important;}');

