// ==UserScript==
// @name           Imdb Linker for Cuevana.tv
// @namespace      http://www.cuevana.tv
// @description    Adds a link to Imdb in Cuevana.tv titles
// @include        http://www.cuevana.tv/peliculas*
// @include        http://www.cuevana.tv/series*
// ==/UserScript==

var parrafo = document.createElement("a");
parrafo.style.position = 'relative';
parrafo.style.top = "-13.6em";
parrafo.style.left = "21em";

var url=window.location.pathname;
url = url.slice(1, -1)
var tipo = url.substring(0,url.indexOf('/'));
var title =""

if(tipo=="peliculas"){
	title = url.substring(url.lastIndexOf('/')+1);	
}
else{
	url = url.slice(7,url.length);
	title = url.substring(url.indexOf('/')+1,url.lastIndexOf('/'));
}

title =title.replace(/-/g,"+");
var imdb_search="http://www.imdb.com/find?s=all&q="+title;

var contenido = document.createElement("img");
contenido.setAttribute('src', 'http://www.nielbushnell.com/images/IMDB_ico.gif');

parrafo.setAttribute('href',imdb_search);

parrafo.appendChild(contenido);

var a = document.getElementById("tit");
a.appendChild(parrafo);
