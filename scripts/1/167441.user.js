// ==UserScript==
// @name        GoodLor
// @namespace   http://www.linux.org.ru/*
// @include     https://www.linux.org.ru/*
// @version     0.0.1
// @description It makes linux.org.ru site more comfortable to read
// ==/UserScript==

// MY LOR STYLES

        var temp;

        // set new LOR style
        var head, style, css;
        head = document.getElementsByTagName('head')[0];
        style = document.createElement('style');
        style.type = 'text/css';
    css =
        +'/* ### forum overview ### */'
        +'  {}'
        +' body {width: 70% !important;}';

    style.innerHTML = css;
    head.appendChild(style);