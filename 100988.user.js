// ==UserScript==
// @name Hackear bux.to
// @namespace buxto
// @description Abre todos los enlaces de bux.to/surf.php automáticamente
// @include http://www.bux.to/surf.php
// ==/UserScript==

var retardo = 5, ventanaAbierta;

function abrirEnlaces(array){
 this.copia = this.copia || array;
 if(!this.copia.length){ return false; } // Arriba es undefined
 ventanaAbierta = window.open(this.copia.shift().href);
 console.log(ventanaAbierta);
 setTimeout(function(){
  ventanaAbierta.x = 0;
  ventanaAbierta.y = 0;
  ventanaAbierta.close();
  abrirEnlaces(array); 
 }, retardo * 1000);
};
  
window.addEventListener(
'load', 
function(){
 document.body.addEventListener(
  'click',
  function(){
   abrirEnlaces([].slice.call(document.querySelectorAll('a.al4')));
  },
  false
 );
},
false
);   