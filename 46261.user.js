// ==UserScript==
// @name	Link do blog Suceço no Orkut
// @author	Rodolfo Viana
// @description	Coloca um link para o blog Suceço no cabeçalho do Orkut.
// @include     http://www.orkut.com/*
// @include     http://www.orkut.com.br/*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.suceco.com.br'>Suceço</a></li>";