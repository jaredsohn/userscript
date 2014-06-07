// ==UserScript==
// @name          Ogame - Renkli inaktifler
// @namespace     http://
// @description	  inaktifleri renkli hale getirerek farkedilmelerini kolaylastirir
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

		thisElement.style.color = "red";
		
		}
	if (thisElement.className.substring(0,12)=='longinactive')
		{

		thisElement.style.color = "red";
		
		}
}
	
//Script sonu.