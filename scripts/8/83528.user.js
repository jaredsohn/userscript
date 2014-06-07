// ==UserScript==
// @name           Cargador de imagenes tinypic paras skynetx!
// @namespace      taringa
// @description    agrega el cargador de imagenes a la pagina de agregar post en skynetx !
// @include        *http://skynetx.cz.cc/agregar/
// ==/UserScript==  

var div= document.createElement("div");
div.setAttribute("style","float:right;margin-top:-290px;margin-right:12px;");






var id=Math.floor(Math.random()*10000000);
div.innerHTML="<iframe width='260' height='550' id='tinypic_plugin_"+id+"' frameborder='10 scrolling='no' src='http://plugin.tinypic.com/plugin/index.php?popts=l,narrow|t,images|c,forum|i,es|s,false'></iframe><br/>";
document.getElementById("post_agregar").appendChild(div);