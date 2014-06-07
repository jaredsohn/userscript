// ==UserScript==
// @name           Cargador de imagenes tinypic para Taringa!
// @namespace      taringa
// @description    agrega el cargador de imagenes a la pagina de agregar post en Taringa y Poringa!
// @include        *taringa.net/agregar/
// @include        *poringa.net/agregar/
// ==/UserScript==

var div= document.createElement("div");
div.setAttribute("style","float:right;margin-top:-600px;margin-right:10px;");

var id=Math.floor(Math.random()*1000000);
div.innerHTML="<iframe width='260' height='510' id='tinypic_plugin_"+id+"' frameborder='0' scrolling='no' src='http://plugin.tinypic.com/plugin/index.php?popts=l,narrow|t,images|c,forum|i,es|s,false'></iframe><br/>";
document.getElementById("post_agregar").appendChild(div);