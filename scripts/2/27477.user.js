// ==UserScript==
// @name           HabrWideComments
// @namespace      *
// @description    add overflow:auto to commtents on habr
// @include        http://*.habrahabr.ru/*
// @include        http://habrahabr.ru/*
// @author         Krov_za_krov

// version 1.1
// author contacts:
// icq    205592196
// mail   vladimir@ardev-studio.com

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.comment_text { overflow:auto !important; width:100% !important; margin-left:-35px !important; } ');
// ==/UserScript==