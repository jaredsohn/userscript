// ==UserScript==
// @name          colora_inattivi
// @namespace     http://
// @description	  Colora di giallo gli inattivi
// @include  http://ogame*/galaxy.php*   
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
	
//Script creado por Adelsork.    



