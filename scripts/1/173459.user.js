// ==UserScript==
// @name        Cansado del SPAM.
// @namespace   @Lin9
// @description Cansado del SPAM v1
// @include     http://*taringa.net/*
// @version     1
// ==/UserScript==
/*
  EN EL POST LO DICE, PARA AGREGAR UNA NUEVA PALABRA SOLAMENTE
  EDITAR EL ARRAY CON BLOC DE NOTAS Y PONER "FULLPOST", "TARINGA", "HOLA", "ETC"
*/
jQuery = $ = unsafeWindow.jQuery; // esto incluye el jquery para que ande el script
var blocked = new Array("FULLPOST", "Lisa", "Toro"); // palabras bloqueadas en los posts
$(document).ready(function(){ // se activa cuando se carga la pagina
   $('.list-element').each(function(){ // por cada elemento (post, comment)
     for(texts in blocked){ // se buscan todas las palabras bloqueadas
        if($(this).html().indexOf(blocked[texts]) != -1){ // una sentencia para saber si tiene texto bloqueado
           $(this).remove(); // si lo tiene, borrar
        } // cierro if
     } // cierro for
   }); // cierro each
}); // cierro document ready