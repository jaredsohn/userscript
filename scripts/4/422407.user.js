// ==UserScript==
// @name        Sinisterly Blue Edition - Postbit Buttons
// @namespace   Uzinero
// @description Sinisterly Blue Postbit Buttons
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
    'background: rgb(11, 45, 138) url(https://www.sinister.ly/images/e-red/highlight_faint.png) repeat-x top;';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
'.postbit_button:hover {' +
    'background-color: #0E1F9C;' +
    'color: #fff;' +
'}';
document.getElementsByTagName("HEAD")[0].appendChild(link);