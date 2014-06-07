// ==UserScript==
// @name           Mercadolibre enlaces a la mano
// @namespace      crramirez
// @description    Este script pone los enlaces de "Seguir esta publicación" y "Enviar a un amigo" en el cuadro de descripción general del producto. Antes eso estaba así y mercadolibre lo eliminó no se por qué. 
// @include        http://articulo.mercadolibre.com*/ML*
// ==/UserScript==

var tables = document.getElementsByTagName("table");
var table = tables[3];
var tbody = table.children[0];


var tr = document.createElement("tr");
tr.innerHTML = '<td colspan="2"><span class="font11"><a href=javascript:mailPopUp();>Enviar a un amigo</a> | <a href=javascript:enLaMira();>Seguir esta publicación</a></span></td>';
tbody.appendChild( tr);