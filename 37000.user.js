// SUNAT libre
// version 0.1 BETA!
// 2008-11-15
// Copyright (c) 2008, Juan Pablo Scaletti
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Este es un script de Greasemonkey.
//
// Para instalarlo, necesitas Greasemonkey: http://greasemonkey.mozdev.org/
// Reinicia Firefox y vuelve a cargar la página de este script.
//
// Para desinstalar, anda a 'Herramientas' > 'Greasemonkey' > 'Administrar scripts'
// selecciona 'SUNAT libre', y haz click en 'Desinstalar'.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SUNAT libre
// @namespace     http://jpscaletti.com/
// @description   Le da a todos los elementos de los formularios un 'id' (si no tiene ya uno) igual a su 'name'. Parche para que los scripts de la SUNAT no sean solo para IE.
// @include       http://*.sunat.gob.pe/*
// @include       https://*.sunat.gob.pe/*

// ==/UserScript==

for (var i=0, f; f=document.forms[i]; i++){
  for (var j=0, el; el=f.elements[j]; j++){
    if (el.id == '' && el.name){
      //No darle un ID que otro elemento ya tenga
      if (!document.getElementById(el.name)){
        el.id = el.name;
      }
    }
  }
}
