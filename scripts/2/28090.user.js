// ==UserScript==
// @name           jumpgate
// @namespace      Neo3000
// @description    jumpgatefix
// @include        http://*ogame*
// ==/UserScript==

const max='m\u00E1x';
const all='Todas as Naves';
const none='Nenhuma nave';

var divs = document.getElementsByTagName('div');
for (var idiv = 0; idiv < divs.length; idiv++) {
	if (divs[idiv].id == 'content') {
		var iContentDiv = idiv;
	}
}

var sessionID=document.URL.substr(document.URL.indexOf("session=")+8,12);


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
	var nb_vaisseauxL = nb_vaisseaux.length;
	var nb_vaisseaux1 = parseInt(nb_vaisseaux.nodeValue.substring(2,nb_vaisseaux.nodeValue.indexOf('(',0)+10));
	var class_vaisseaux = trnode[i].childNodes[3].childNodes[0].attributes[4] ;
	var class_vaisseaux1 = class_vaisseaux.nodeValue.substring(1,4) ;
	var class_ship = "'c"+class_vaisseaux1+"'";
	trnode[i].innerHTML = '<th><a href="index.php?page=infos&session='+sessionID+'&gid='+class_vaisseaux1+'">'+vaisseaux.nodeValue+'</a></th><th>'+nb_vaisseaux1+'<input name="maxc'+class_vaisseaux1+'" value="'+nb_vaisseaux1+'" type="hidden"></th><th><a href="javascript:maxShip('+class_ship+');">'+max+'</a></th><th><input tabindex="1" name="c'+class_vaisseaux1+'" size="7" maxlength="7" value="0" type="text"></th>';
}

		
		var tablenode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tbody')[0];
		tablenode.innerHTML = tablenode.innerHTML.substring(0, tablenode.innerHTML.length-85)+'<th colspan="2"><a href="javascript:noShipsC();">'+none+'</a></th><th colspan="2"><a href="javascript:maxShipsC();">'+all+'</a></th>'+tablenode.innerHTML.substring(tablenode.innerHTML.length-95, tablenode.innerHTML.length-1);
