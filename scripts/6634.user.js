// ==UserScript==
// @name Ogame: Casilla busqueda en menu izquierdo
// @author kovan (Modificado por warbird)
// @description Casilla busqueda en menu izquierdo
// @include http://ogame*.de/game/leftmenu.php*
// ==/UserScript==

(function(){

var reg = /session=([a-z0-9]+)/;
var resultado = reg.exec(document.body.innerHTML);
var sesion=resultado[0];
var formulario = document.createElement('form');
formulario.setAttribute("action","suche.php?"+sesion);
formulario.setAttribute("target","Hauptframe");
formulario.setAttribute("method","post");

var texto = document.createElement('input');
texto.setAttribute("type","text");
texto.setAttribute("name","searchtext");
var boton = document.createElement('input');
boton.setAttribute("type","submit");
boton.setAttribute("value","Buscar");

formulario.innerHTML += '<select name="type"><option value="playername" selected>Nombre del jugador</option>     <option value="planetname" >Nombre del planeta</option>     <option value="allytag" >Etiqueta de la alianza</option>     <option value="allyname" >Nombre de la alianza</option></select>';
formulario.appendChild(texto);
formulario.appendChild(boton);

var p = document.body.appendChild(document.createElement('p'));
p.appendChild(formulario);
document.body.appendChild(p);

//document.body.innerHTML += '<a href="http://ogame310.de/game/allianzen.php?'+sesion+'&a=4&sort1=3&sort2=0" target="Hauptframe">Miembros</a>';

})();