// ==UserScript==
// @name           Perfiles privados
// @namespace      tuenti
// @description    Te permite ver en grande la foto principal de los contactos que te sean privados 
// @include        http://perfiles*.tuenti.net/*
// ==/UserScript==

var NewUrl = window.location.href;
NewUrl = "http://imagenes"+NewUrl.charAt(15)+".tuenti.net"+NewUrl.substring(55,64)+"600"+NewUrl.substring(84,NewUrl.length);
window.location.href = NewUrl;