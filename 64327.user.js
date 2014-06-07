// ==UserScript==
// @name           Google Sponsored Links Remover
// @namespace      http://www.sirviejo.com/
// @description    Removes advertisements from Google .
// @author         Lautaro Rosales
// @version        1.0
// @include        http://*google.com*
// ==/UserScript==

(function(){

  var $ = function(id) {
    return document.getElementById(id);
  };
  var patrocinados_arriba = $('tads');
  var patrocinados_derecha = $('mbEnd');

  patrocinados_derecha.parentNode.removeChild(patrocinados_derecha);
  patrocinados_arriba.parentNode.removeChild(patrocinados_arriba)



})();