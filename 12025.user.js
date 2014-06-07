// ==UserScript==
// @name           Ogame Progreso Estadisticas 0.77a v.2
// @author 	  Pnia
// @description    Muestra el progreso del jugador o alianza en la tabla de estadisticas sin tener que poner el raton encima. Actualizado para la version 0.77a
// @include        http://*ogame*/game/index.php?page=stat*
// ==/UserScript==
var todo;
var pos;
var mouse;
var menurows = document.getElementsByTagName('th');
for (var i = 0; i < menurows.length; i++) {
	todo=menurows[i].innerHTML;
	pos=menurows[i].innerHTML.indexOf("+");
	mouse=menurows[i].innerHTML.indexOf("mouseover");
	if (pos!=-1 && mouse!=-1) {
		todo = "<font color=\"lime\">"+menurows[i].innerHTML.substring(pos,todo.indexOf('</font')+7);
		menurows[i].innerHTML=menurows[i].innerHTML.substring(0,menurows[i].innerHTML.indexOf('<a'))+todo;
	}
	pos=menurows[i].innerHTML.indexOf("-");
	if (pos!=-1 && mouse!=-1) {
		todo = "<font color=\"red\">"+menurows[i].innerHTML.substring(pos,todo.indexOf('</font')+7);
		menurows[i].innerHTML=menurows[i].innerHTML.substring(0,menurows[i].innerHTML.indexOf('<a'))+todo;
	}
}
