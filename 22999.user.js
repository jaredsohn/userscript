// Avisa la hora de la recogida de escombros
// Version 0.1
// Febrero , 2006
// Copyright (c) 2006, Pete Hanson and Edited for Ogame by Lord Mokuba
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Actualiza en un intervalo de 1-5 segundos la galaxia y si algun escombro fuera recogido, este dara la hora de este echo.
// 
// ==UserScript==
// @name          OGame - Aviso Recolección Escombros
// @author        TaMaX - Modificado por FryGuy
// @namespace     http://www.ogame.com.es
// @description   Avisa de la hora de la recolecta de escombros
// @include       http://*/game/index.php?page=galaxy*

function actualizar () {
  document.getElementById('galaxy_form').submit();
}

var ran_unrounded = Math.random() * 5000;
var ran_number = Math.floor(ran_unrounded);
window.setTimeout(actualizar, ran_unrounded) ;

z = GM_getValue("escombros"); 
var j = 0;
var trs = document.getElementsByTagName('a');
for (var i=0; i < trs.length; i++) {
  if (trs[i].innerHTML.indexOf('debris') != -1) { //debrisText
    j = j + 1;
  }
}
if (j < z) {	
  var date = new Date();
	date.setTime(date.getTime());
	win = window.open('','','scrollbars=no,menubar=no,height=100,width=800,resizable=yes,toolbar=no,location=no,status=no');
	win.document.write('escombros han sido recogidos a esta hora: ' + date.toLocaleString());	
}
GM_setValue("escombros", j);

