// ==UserScript==
// @name           Modificar url by Alex
// @namespace      Modificar url del face
// @description    Saltarse restricciones del proxy
// @include        http://www.facebook.com/*
// ==/UserScript==

var urlface = document.URL;
var urlface2 = urlface.substring(10);
var urldef = "http://es-es" + urlface2;
document.location = urldef;