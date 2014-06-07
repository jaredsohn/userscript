// ==UserScript==
// @name           OGame galaxia sin ventanas emergentes
// @author	  Pnia
// @description   Elimina las ventanas emergentes de las columnas del jugador y alianza en la vista de galaxia, saldrán si haces click.
// @include        http://*ogame.com.es/game/index.php?page=galaxy*
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var element=xpath("//table[@width='569']").snapshotItem(0);
var tablagalaxia = element;

for(var i=2;i<17;i++){ //recorro todas las filas de la tabla
tablagalaxia.rows[i].cells[4].innerHTML=tablagalaxia.rows[i].cells[4].innerHTML.replace(/onmouseover=/g,'onclick=');	tablagalaxia.rows[i].cells[5].innerHTML=tablagalaxia.rows[i].cells[5].innerHTML.replace(/onmouseover=/g,'onclick=');
}