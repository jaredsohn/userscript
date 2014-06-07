// ==UserScript==
// @name           Powody usuwania zdjęć
// @namespace      http://www.fotka.pl/profil/suchar
// @description    Dodaje możliwość wpisania powodu kasowania zdjęcia
// @include        http://www.fotka.pl/profil/*
// @version        1.0
// @copyright      2013+, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// ==/UserScript==

var u = unsafeWindow;
var $ = u.$;

function newElem(type){
    return document.createElement(type);
}

function uruchamiaj() {
  var powody = document.getElementById("zdjecia_menu");
  
  var zReki = newElem("a");
  zReki.href = "javascript:void(0)";
  zReki.className = 'no zdjecia_powod k10';
  zReki.innerHTML = "Inne powody";
  zReki.id = 'powod_5';
  powody.appendChild(zReki);
}

var initTimeout = setTimeout(function() { uruchamiaj(); }, 1000);