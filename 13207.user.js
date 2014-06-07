// Tells the time of the Harvest of the DF
// Version 0.77
// OCTOBER , 2007
// Copyright (c) 2006, Pete Hanson and Edited for Ogame by Lord Mokuba and Edited for elisma
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Actualiza en un intervalo de 1-5 segundos la galaxia y si algun escombro fuera recogido, este dara la hora de este echo.
// 
// ==UserScript==
// @name          Ogame D.F. harvest
// @author        TaMaX edited by elisma
// @namespace     http://www.ogame.com.es
// @description      Tells the time of the Harvest of the DF
// @include      http://*/game/index.php?page=galaxy*

function actualizar () {
document.getElementById('galaxy_form').submit();
}

var ran_unrounded=Math.random()*5000;
var ran_number=Math.floor(ran_unrounded);
window.setTimeout(actualizar,ran_unrounded) ;

z=GM_getValue("escombros"); 
var j=0;
var trs = document.getElementsByTagName('a');
  for (var i=0; i<trs.length; i++) {
   if (trs[i].innerHTML.indexOf('<img src="http://uni29.ogame.org/evolution/planeten/debris.jpg" ') != -1) {
	 j=j+1;
}
}

if (j<z ) {	
	var date = new Date();
	date.setTime(date.getTime());
	win=window.open('','','scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,location=no,status=no');
	win.document.write('DF has been harvester at:'+date.toLocaleString());	
	}
GM_setValue("escombros",j);