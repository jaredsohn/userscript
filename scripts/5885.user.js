// ==UserScript==
// @name Ogame Menu Extension Alianza K4
// @spacename
// @description Provee herramientas extras para los miembros de la alianza facilitandoles el desplazamiento por el juego (configurado para server uni11 alianza K4)
Funciona en todos los unis aunque habria que modificar el menu.
// @include http://ogame*.de/game/leftmenu.php*
// @include http://*.gfsrv.net/game/leftmenu.php*
// @include	http://*/game/*
// @include	http://drago-sim.com/*
// ==/UserScript==
(function() {


//
// obtenemos session
//
var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);
//
// obtenemos todos los <tr> de la pagina
//
var trs = document.getElementsByTagName('tr');
//
// buscamos en la coleccion de <tr>, el que contenga el link de comandante.
//
for (var i = 0; i < trs.length; i++) {

if(trs[i].innerHTML.indexOf("Info Comandante</font>") != -1){
//
// borramos el anuncio de Commandante
//
//trs[i].parentNode.removeChild(trs[i]);

}
}
///////////////////////////////////////////
///////////////////////////////////////////
//// ////
//// MENU DE USUARIOS ALIANZA K4 ////
//// ////
///////////////////////////////////////////
///////////////////////////////////////////

////...Imegen separadora
trs[trs.length-1].innerHTML ='<tr><td><center><img src="http://ogame*.de/epicblue/gfx/info-help.jpg" width="110" height="19"></center></td></tr>'+
////...Mensaje al lider
'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://ogame*.de/game/writemessages.php?session=' + Session + '&messageziel=158965" target="Hauptframe">Mensaje privado</a></font></div></td></tr>'+
////...Lista de Miembros Ordenados
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4&sort1=3&sort2=0" target="Hauptframe">Miembros K4 </a></font></div></td></tr>'+
////...Administrar Miembros Ordenados
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=7&sort1=3&sort2=0" target="Hauptframe">Admin. miembros </a></font></div></td></tr>'+
////...Foro alianza
'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://alianzaig.forogratis.es" target="newwindow">Foro K4 </a></font></div></td></tr>'+

'';
}
/* Creador del codigo Lord Mokuba agradezco a todas las personas que pusieron su granito de informacion*/