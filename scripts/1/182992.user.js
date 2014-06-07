// ==UserScript==
// @name          Mejora eltiempo.com
// @namespace     Monty_Oso
// @description   Quita los panales que se ven a los lados de la noticia.
// @include       http://www.eltiempo.com/*
// @version       0.1.2
// @grant         none
// @icon          http://s3.amazonaws.com/uso_ss/icon/182992/large.png?1384494867
// ==/UserScript==

var EsNoticia = document.getElementsByClassName("despliegue-txt");

if (EsNoticia.length){
	var col_wrapper = document.getElementsByClassName("a");
	var len = col_wrapper.length;
	var i = 0;

	for (i = 0; i < len; i++) {
		col_wrapper[i].style.display="none";
	}

	col_wrapper = document.getElementsByClassName("c");
	len = col_wrapper.length;

	for (i = 0; i < len; i++) {
		col_wrapper[i].style.display="none";
	}

	col_wrapper = document.getElementsByClassName("b");
	len = col_wrapper.length;

	for (i = 0; i < len; i++) {
		col_wrapper[i].style.width="auto";
	}

	col_wrapper = null;
	len = null;
	i = null;
}
EsNoticia = null;
