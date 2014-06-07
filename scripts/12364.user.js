// ==UserScript==
// @name          Ogame - Inactivos en amarillo (v 0.77)
// @namespace     http://
// @description	  Muestra los Inactivos en amarillo (Se puede editar el color, solo cambien los yellow por el color que quieran siempre y cuando sea en ingles)
// @include  http://ogame*/galaxy.php*
// @include  http://uni*.ogame.*/index.php?page=galaxy*   
// ==/UserScript==

var allElements, thisElement;
var cadena, suma;
allElements = document.getElementsByTagName('span');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    
	if (thisElement.className.substring(0,8)=='inactive')
		{

		thisElement.style.color = "yellow";
		
		}
	if (thisElement.className.substring(0,12)=='longinactive')
		{

		thisElement.style.color = "yellow";
		
		}
}
	
//Script creado por cumbiambero.    



