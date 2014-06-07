// ==UserScript==
// @name           SchÃ¼lerVZ/StudiVZ/MeinVZ Foto-Rechtsklick aktivieren
// @include        http://*.schuelervz.net/Photos/*
// @include	   http://*.studivz.net/Photos/*
// @include        http://*.meinvz.net/Photos/*
// ==/UserScript==

var pc, bild;
if((pc = document.getElementById('PhotoContainer')) && (bild = pc.getElementsByTagName("img")[0])){
  bild.setAttribute("oncontextmenu", "", true);
}

var imgs=document.images;for(var i=0;i<imgs.length;i++){
  imgs[i].oncontextmenu="";
}