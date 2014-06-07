// ==UserScript==
// @name Ogame: Opciones menu izquierdo
// @author Editado por Lord Mokuba
// @description cosas para el menu de ogame
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

	// ** Input Text de la busqueda.
var texto = document.createElement('input');
texto.setAttribute("type","text");
texto.setAttribute("name","searchtext");

	// ** boton de "Buscar"	
var boton = document.createElement('input');
boton.setAttribute("type","submit");
boton.setAttribute("value","Buscar");

	// ** Selector.
var oSelect = document.createElement('select');
oSelect.setAttribute("name","type");

var oOption = document.createElement("option");
oOption.setAttribute("text", 'Nombre del jugador' );
oOption.setAttribute("value", 'playername' );
oSelect.add(oOption);

var oOption = document.createElement("option");
oOption.setAttribute("text", 'Nombre del planeta' );
oOption.setAttribute("value", 'planetname' );
oSelect.add(oOption);

var oOption = document.createElement("option");
oOption.setAttribute("text", 'Etiqueta de la alianza' );
oOption.setAttribute("value", 'allytag' );
oSelect.add(oOption);


//iba abajo
formulario.appendChild(texto);
formulario.appendChild(boton);
formulario.appendChild(oSelect);

//formulario.innerHTML += '<select name="type"><option value="playername" selected>Nombre del jugador</option>     <option value="planetname" >Nombre del planeta</option><option value="allytag" >Etiqueta de la alianza</option>     <option value="allyname" >Nombre de la alianza</option></select>';


var p = document.body.appendChild(document.createElement('p'));
p.appendChild(formulario);
document.body.appendChild(p);

document.body.innerHTML += '<a href="http://ogame443.de/game/allianzen.php?'+sesion+'&a=4&sort1=3&sort2=0" target="Hauptframe">Miembros</a>';

})();