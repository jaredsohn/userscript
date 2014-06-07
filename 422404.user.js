// ==UserScript==
// @name        Sinisterly Green Edition - Postbit Buttons
// @namespace   Uzinero
// @description Sinisterly Green Postbit Buttons
// @include     https://sinister.ly/*
// @include     https://www.sinister.ly/*
// @version     1
// @grant       none
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
'.postbit_button {' +
    'background: rgb(30, 138, 11) url(https://www.sinister.ly/images/e-red/highlight_faint.png) repeat-x top;';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
'.postbit_button:hover {' +
    'background-color: #219C0E;' +
    'color: #fff;' +
'}';
document.getElementsByTagName("HEAD")[0].appendChild(link);