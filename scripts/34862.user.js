// ==UserScript==
// @name           softarchive link rewriter
// @description    Elimina la redireccion de anonimz
// @version        1.2
// @author         SantiagoC
// @include        http://www.softarchive.net/*
// ==/UserScript==

var enlaces = document.getElementsByTagName('a');

for(var i=0; i < enlaces.length; i++) {
	enlaces[i].href = enlaces[i].href.replace("http://anonymz.com/?","");
}