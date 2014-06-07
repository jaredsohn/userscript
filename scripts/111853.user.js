// ==UserScript==
// @name          5mentarios
// @namespace     http://diarionocturno.com/blog
// @description   Oculta los comentarios en Periodicos Online de Colombia
// @include       http://*.elespectador.com/*
// @include       http://*.semana.com/*
// @include       http://*.eltiempo.com/*
// @include       http://*.caracol.com.co/*
// ==/UserScript==

var clase;
var ruta=""+window.location;

if(ruta.search("elespectador.com/")!=-1)
	clase = "opiniones";//ee
if(ruta.search("semana.com/")!=-1)
	clase = "content_comentarios";//se
if(ruta.search("eltiempo.com/")!=-1)
	clase = "container-comentarios";//et
if(ruta.search("caracol.com.co/")!=-1)
	clase = "Comenta";//ca
	
var capas = document.getElementsByTagName('div');

for (i=0; i<capas.length; i++)
	if(capas[i].className==clase) 
		capas[i].style.display="none";
