// ==UserScript==
// @name           GPx2, GJ, GM, links fixer
// @description    Elimina la redireccion de links en gratisprogramas.org, gratispeliculas.org, gratisjuegos.org y gratismusica.org
// @namespace      http://userscripts.org/users/pqtkyo
// @include        http://www.gratisprogramas.org/*
// @include        http://www.gratispeliculas.org/*
// @include        http://www.gratisjuegos.org/*
// @include        http://www.gratismusica.org/*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for(var i=0; i < links.length; i++) {
	links[i].href = links[i].href.replace("http://lik.cl/?","");
}