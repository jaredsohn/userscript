// ==UserScript==
// @name           Ver comentarios
// @namespace      taringa
// @description    agrega un peque�o icono al lado de cada comentarios que lleva a la pagina donde vemos los ultimos comentarios de ese usuario
// @include        *taringa.net/posts/*
// @include        *poringa.net/posts/*
// ==/UserScript==

function obtenerNombre(texto){
var cortado=texto.substring(texto.indexOf("/mensajes/a/")+12);
cortado=cortado.substring(0,cortado.indexOf('"'));
return cortado;
}

var links=document.getElementsByTagName("ul");
var linkmsj=[];
for(x=0;x<links.length;x++)
if((links[x].getAttribute("class")=="floatR")) linkmsj.push(links[x]);

for(x=0;x<linkmsj.length;x++)
{
var li=document.createElement('li');
var comentarios=document.createElement('a');
comentarios.setAttribute("href","/comentarios/"+obtenerNombre(linkmsj[x].innerHTML));
comentarios.innerHTML=' <span style="position: relative;"> <img src="http://i.t.net.ar/images/big1v8.gif" style="position: absolute; top: -831px; clip: rect(831px, 16px, 847px, 0px);" border="0"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 16px;" align="absmiddle" border="0"></span>';
li.appendChild(comentarios);
linkmsj[x].appendChild(li);
}

