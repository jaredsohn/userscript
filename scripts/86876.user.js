// ==UserScript==
// @name           Complemento al granjeo
// @namespace      Hecho por Penitencia
// @description    Hecho por Penitencia
// @include        http://*guerrastribales.es/game.php?*&screen=map*
// ==/UserScript==
function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var pueblos = xpath('//a[contains(@href,"screen=info_village")]');
var doc = document;
var i=0;
var lista = null;
for (i = 0; i < pueblos.snapshotLength; i++) 
	{
		//Miramos si es un pueblo bárbaro:
		temp = pueblos.snapshotItem(i).parentNode.innerHTML;
		if(!(temp.indexOf("v2_left.png?1")!=-1||temp.indexOf("b2_left.png?1")!=-1||temp.indexOf("v1_left.png?1")!=-1||temp.indexOf("v3_left.png?1")!=-1))
			continue;
		temp = temp.substring(temp.indexOf("(")+1,temp.length);
		coord = temp.substring(temp.indexOf("(")+1,temp.indexOf(")"));
		if(coord.indexOf("|")==-1)
			continue;
		if(lista==null)
			lista=coord;
		else
			lista = lista+" "+coord;
	}
alert(lista);