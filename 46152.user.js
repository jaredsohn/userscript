// ==UserScript==
// @name	Link do blog de Rodolfo Viana no Orkut
// @author	Rodolfo Viana
// @description	Coloca um link para o blog de Rodolfo Viana no cabeçalho do Orkut.
// @include     http://www.orkut.com/*
// @include     http://www.orkut.com.br/*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://rodolfoviana.wordpress.com'>rodolfoviana</a></li>";