// ==UserScript==
// @name           Google Reader Font Changer
// @version        1.0
// @creator        Adriano Prado
// @description    Changes the font family and size from Google Reader page
// @namespace      userscripts.org
// @include        https://www.google.com/reader/*
// @include        http://www.google.com/reader/*

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

addGlobalStyle('.entry-body{font-family:Georgia,Bookman Old Style,JackInput,Trebuchet MS;font-size:108%;line-height:135%;}');

//eof