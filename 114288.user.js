// ==UserScript==
// @name           GrooveShark sin publicidad
// @namespace      groovesharksinpublicidad
// @version        0.1
// @description    Eliminar publicidad lateral
// @include        http://*grooveshark.com/*
// @author         kiwinho
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==

//Eliminar barra lateral
window.onload = function () {
    var main = document.getElementById("mainContainer");
    var ads = document.getElementById("capital");
    var app = document.getElementById("application");
    main.removeChild(ads);
    app.style.marginRight = '0px'};

//Eliminar publicidad de la busqueda
setInterval(function () {
    var x = document.getElementById("searchCapitalWrapper");
    x.parentElement.removeChild(x);
}, 1000);