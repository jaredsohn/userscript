// ==UserScript==
// @name           Limpiar Enlaces
// @namespace      limpiarEnlaces
// @description    Limpia los enlaces de las redirecciones
// @include        http://www.faveladogame.com.br/gang/
// @include        http://www.faveladogame.com.br/gang/*
// @include        http://www.faveladogame.com.br/messages*
// ==/UserScript==

var links = document.getElementsByTagName("a");

for (i=0; i<=links.length; i++){
    var valor = links[i].getAttribute("href");
    var valorNew = valor.replace('http://www.faveladogame.com.br/redirect/?site=','');
    //alert('Valor del atributo viejo:'+valorOld+'Valor Nuevo:'+valor);
    links[i].setAttribute("href", valorNew);
}