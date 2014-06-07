// JavaScript Document
// ==UserScript==
// @name           Fondo de pantalla ciudad - Background city - Ikariam
// @autor          Jorgitokapo
// @email          jorgito.kapo@gmail.com
// @namespace      Ikariam
// @description    A new background city for Ikariam - Nuevo Fondo de pantalla para la ciudad en Ikariam
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

/*TEST VERSION, SLOW CODED ONLY FOR TESTING PURPOSE*/

function addAnimStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addAnimStyle('#city #container .phase13, #city #container .phase18, #city #container .phase32 {    background-image:url(http://img363.imageshack.us/img363/6536/citylevel24yj7.jpg);}');
