// Todoxbox360.com - Atomarxfondo 
// Hecho por Sandbag. Modificado por blitz
// All your base are belong to us
// ==UserScript==
// @name           Todoxbox360 background change
// @namespace      Todoxbox360 background change
// @include        http://todoxbox360.com/*
// @include        http://www.todoxbox360.com/*
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

addGlobalStyle(' body {background-image: url(http://img443.imageshack.us/img443/408/fskyrimtkpfp.jpg); background-attachment: fixed;} ')