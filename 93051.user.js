// ==UserScript==
// @name           Allegro - Big editor
// @namespace      Allegro
// @description    Powieksza edytor podczas wystawiania nowej aukcji
// @include        http://*allegro.pl/*
// ==/UserScript==

(function() {
  var frm=document.getElementById('EditRTF');
  if (frm!=null && frm!=undefined){
    frm.style.height='750px';
  }
})();
