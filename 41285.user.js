// ==UserScript==
// @name           Google Reader Header Font Size Changer
// @version        1.0
// @creator        Adriano Prado
// @description    Changes the font size from Google Reader headers
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

addGlobalStyle('A.entry-title-link {font-size: 15px;}');

// Comment line above and uncoment the below to change the header   
// color from unread msgs 
//addGlobalStyle('A.entry-title-link {font-size: 15px; color:black; }');

//eof