// ==UserScript==
// @name          OGame - Galaxia sin ventanas emergentes 2
// @author	  Pnia Editado por cumbiambero
// @description   Elimina las ventanas emergentes de las columnas del jugador y alianza en la vista de galaxia, saldrán si haces click. Editado del script de Pnia
// @include       http://*ogame.com.es/game/index.php?page=galaxy*
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var element=xpath("//table[@width='569']").snapshotItem(0);
var tablagalaxia = element;

for(var i=2;i<17;i++){ //recorro todas las filas de la tabla

// Borrar la siguiente fila si quiere que aparescan ventanas emergentes en Alianza
tablagalaxia.rows[i].cells[6].innerHTML=tablagalaxia.rows[i].cells[6].innerHTML.replace(/onmouseover=/g,'onclick=');

// Borrar la siguiente fila si quiere que aparescan ventanas emergentes en Jugador
tablagalaxia.rows[i].cells[5].innerHTML=tablagalaxia.rows[i].cells[5].innerHTML.replace(/onmouseover=/g,'onclick=');

// Borrar la siguiente fila si quiere que aparescan ventanas emergentes en Escombros
tablagalaxia.rows[i].cells[4].innerHTML=tablagalaxia.rows[i].cells[4].innerHTML.replace(/onmouseover=/g,'onclick=');

// Borrar la siguiente fila si quiere que aparescan ventanas emergentes en Luna
tablagalaxia.rows[i].cells[3].innerHTML=tablagalaxia.rows[i].cells[3].innerHTML.replace(/onmouseover=/g,'onclick=');

// Borrar la siguiente fila si quiere que aparescan ventanas emergentes en Planeta
tablagalaxia.rows[i].cells[1].innerHTML=tablagalaxia.rows[i].cells[1].innerHTML.replace(/onmouseover=/g,'onclick=');
}