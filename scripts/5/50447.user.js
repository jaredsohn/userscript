// ==UserScript==
// @name	Professor Evandro de Matemática
// @author	Evandro Souza Rocha
// @description	Coloca um link para o site na pagina inicial do orkut proximo de COMUNIDADES.
// @include     http://www.orkut.com/*
// @include     http://www.orkut.com.br/*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://evandropromat.webnode.com'>| Professor Evandro |</a></li>";