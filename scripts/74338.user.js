// ==UserScript==
// @name           CC_Neue Nachricht
// @namespace      http://jaroschmidt.ja.funpic.de/tagebuch/
// @description    Zeigt ein Popup an wenn eine neue Nachricht vorhanden ist.
// @include        http://www.schueler.cc/*
// ==/UserScript==


function index() {
  for (var i=0; i<5; i++) {
    var bild=string(getElementsByTagName("img")[i]);
    alert(bild); 
  }  
}

index();  