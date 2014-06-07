// ==UserScript==
// @name           Ogame Progreso Estadisticas 0.84
// @author 	  Pnia
// @description    Muestra el progreso del jugador o alianza en la tabla de estadisticas sin tener que poner el raton encima. Actualizado para la version 0.84
// @include        http://*ogame*/game/index.php?page=statistics*
// ==/UserScript==

ths = document.evaluate("//table[@width='525']//tr//th[1]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 1; i < ths.snapshotLength; i++ ) {
	th = ths.snapshotItem(i);
	th.parentNode.style.whiteSpace="nowrap";
	th.innerHTML = th.innerHTML.replace(/<a href="#" onmouseover='return overlib\("<font color=(.*)>([+*-])(\d*)<\/font>(.*)<\/font><\/a>/mi, "<font color='$1'>$2$3</font>");
}
