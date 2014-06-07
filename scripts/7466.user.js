// ==UserScript==
// @name 	Ogame NL : Sprong Poort (max/nul/geen/alle schepen)
// @author 	OgamerNL
// @description Ogame NL : Sprong Poort (max/nul/geen/alle schepen)
// @language 	NL
// @include 	http://uni*.ogame.nl/game/index.php?page=infos*&gid=43
// ==/UserScript==


var divs = document.getElementsByTagName('div');
for (var idiv = 0; idiv < divs.length; idiv++) {
	if (divs[idiv].id == 'content') {
		var iContentDiv = idiv;
	}
}

var script = window.document.createElement('span');
script.innerHTML = '<script src="js/flotten.js" type="text/javascript"></script><script language="JavaScript">function maxShipsC() {var id;for (i = 200; i < 220; i++) {id = "c"+i; maxShip(id); }}function noShipsC (){var id;for (i = 200; i < 220; i++) {id = "c"+i;noShip(id);}}</script>';

var doc = document.getElementsByTagName('div')[iContentDiv].getElementsByTagName('form')[0];
doc.parentNode.insertBefore(script,doc);

var trnode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tr');
trnode[0].childNodes[1].attributes[0].nodeValue=4;
trnode[trnode.length-1].childNodes[1].attributes[0].nodeValue=4;

for(i=1; i<trnode.length-1; i++ ) {
	var vaisseaux= trnode[i].childNodes[1].childNodes[0].childNodes[0] ;
	var nb_vaisseaux = trnode[i].childNodes[1].childNodes[1] ;
	var nb_vaisseaux1 = nb_vaisseaux.nodeValue.substring(1,nb_vaisseaux.nodeValue.indexOf('aanwezig',0)-1);
	var class_vaisseaux = trnode[i].childNodes[3].childNodes[0].attributes[4] ;
	var class_vaisseaux1 = class_vaisseaux.nodeValue.substring(1,4) ;
	var class_ship = "'c"+class_vaisseaux1+"'";
	trnode[i].innerHTML = '<th><a href="javascript:maxShip('+class_ship+');">'+vaisseaux.nodeValue+'</a></th><th>'+nb_vaisseaux1+'<input name="maxc'+class_vaisseaux1+'" value="'+nb_vaisseaux1+'" type="hidden"></th><th><a href="javascript:maxShip('+class_ship+');">max</a> / <a href="javascript:noShip('+class_ship+');">nul</a> </th><th><input tabindex="1" name="c'+class_vaisseaux1+'" size="7" maxlength="7" value="0" type="text"></th>';
}
		
var tablenode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tbody')[0];
tablenode.innerHTML = tablenode.innerHTML.substring(0, tablenode.innerHTML.length-85)+'<th colspan="2"><a href="javascript:noShipsC();">geen schepen</a></th><th colspan="2"><a href="javascript:maxShipsC();">alle schepen</a></th>'+tablenode.innerHTML.substring(tablenode.innerHTML.length-84, tablenode.innerHTML.length-1);
