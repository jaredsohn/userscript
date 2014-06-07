// ==UserScript==
// @name           Destacar nombre del juego
// @description    Destacar el nombre del juego, aplicación, etc en paginas de TuLocura.net
// @include        *gratis*.org/
// @include        *gratis*.org/descargar/blog/*
// @include        *gratis*.org/descargar/20*
// @include        *gratis*.org/categoria*
// @include        *gratis*.org/20*
// @include        *gratis*.org/top-50*
// @include        *gratis*.org/page*

// ==/UserScript==



var patronLink=/http:..www\.gratis[^\.]*\.org\/descargar\/[^\/]*/i
var losa=document.getElementsByTagName('a')
var patronNombre=/[^\[]*/i
var patronResto=/\[.*/i
for(var i=0;i<losa.length;i++){
	if(losa[i].href.match(patronLink) &&losa[i].href.match(patronLink)[0].length==losa[i].href.length-1 ){
		var nombre =losa[i].innerHTML.match(patronNombre);
		var resto =losa[i].innerHTML.match(patronResto);
		if(resto){
			losa[i].innerHTML=nombre+'<font color=\"gray\"><i>'+resto+'</font></i>'
		}
	}		
}


