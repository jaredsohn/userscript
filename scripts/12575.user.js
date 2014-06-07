// ==UserScript==
// @name          Google Search Unhighlighter
// @namespace     http://www.zonafirefox.net
// @description   Elimina el texto resaltado en los resultados de búsqueda de Google.
// @include       http://*.google.*/search?*
// ==/UserScript==

var strReplaceAll = document.getElementById('res').innerHTML;
var indice = strReplaceAll.indexOf( "<b>" );


while (indice != -1){
	// Relace out the current instance.
	strReplaceAll = strReplaceAll.replace( "<b>", "" )
	 
	// Get the index of any next matching substring.
	indice = strReplaceAll.indexOf( "<b>" );
}


while (indice != -1){
	// Relace out the current instance.
	strReplaceAll = strReplaceAll.replace( "</b>", "" )
	 
	// Get the index of any next matching substring.
	indice = strReplaceAll.indexOf( "</b>" );
}
 
document.getElementById('res').innerHTML = strReplaceAll;