// ==UserScript==
// @name           SalisteBien NavKeys
// @namespace      Bortoli German - aKa Germanaz0
// @description    Simple script que sirve para cambiar las fotos con el teclado ( las flechas de izquierda y derecha ) para el sitio salistebien.com
// @include        http://salistebien.com/galeria.php*
// @include        http://www.salistebien.com/galeria.php*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

/*
 * Licencia GNU/GPL v3.0 
 * http://www.gnu.org/licenses/gpl-3.0.html * 
 * */
//
$(document).ready(function(){
   $(document).bind('keypress', function(e) { 
      if (e.keyCode == 39 ) {
         $('#cuerpo_contenido_fotos_galeria_2 img').attr('src', 'http://i48.tinypic.com/9k9k77.gif');
         var link_img = $('#cuerpo_contenido_fotos_galeria_botones a[href]:last').attr('href');
         link_img = link_img.substring(0, link_img.length - 1);
         $(location).attr('href',link_img);
           
      }
      if (e.keyCode == 37 ){
         if ($('#cuerpo_contenido_fotos_galeria_botones a[href]').length < 2) return false;
         $('#cuerpo_contenido_fotos_galeria_2 img').attr('src', 'http://i48.tinypic.com/9k9k77.gif');
            var link_img = $('#cuerpo_contenido_fotos_galeria_botones a[href]:first').attr('href');
            link_img = link_img.substring(0, link_img.length - 1);
            $(location).attr('href',link_img);
      }
         
   });
});
