// ==UserScript==
// @name          Inactivos en Rojo para OGame  Es
// @namespace     http://
// @description	  Colorea los Usuarios Inactivos de OGame
// @include  http://*ogame.*/game/index.php*   
// ==/UserScript==

var allElements, thisElement;
var cadena, suma;
allElements = document.getElementsByTagName('span');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    
	if (thisElement.className.substring(0,8)=='inactive')
		{

		thisElement.style.color = "red";
		
		}
	if (thisElement.className.substring(0,12)=='longinactive')
		{

		thisElement.style.color = "red";
		
		}
}
	
//Script creado por FireFoxGuy, ( Angelous - Unis 17, 34, 41 y 42 )