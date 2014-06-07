// ==UserScript==
// @name Ogame BA : Odskocna Vrata (max/®/Nijedan brod/Svi brodovi)
// @author Flater - Modified by Sentinel for Ogame.ba
// @description Ogame BA : Odskocna Vrata (max/®/Nijedan brod/Svi brodovi)
// @language BA
// @include http://uni*.ogame.*/game/index.php?page=infos&session=*&gid=43
// @script homepage: http://userscripts.org/scripts/show/9133
// ==/UserScript==



(function(){
	
	//=========================================
	//Dodavanje + modifikacija Ogame funkcija
	//=========================================

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

	//===============
	//Rebuild tablice
	//===============

	var trnode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tr');
	    trnode[0].childNodes[1].attributes[0].nodeValue = 4 ;
	    trnode[trnode.length-1].childNodes[1].attributes[0].nodeValue = 4 ;
	
	for( i = 1; i < trnode.length-1; i++ ) 
	{
		var ship = trnode[i].childNodes[1].childNodes[0].childNodes[0] ;
		var nb_ship = trnode[i].childNodes[1].childNodes[1] ;
		var nb_ship1 = nb_ship.nodeValue.substring(1,nb_ship.nodeValue.indexOf('prisutno',0)-1);
		var class_ship = trnode[i].childNodes[3].childNodes[0].attributes[4] ;
		var class_ship1 = class_ship.nodeValue.substring(1,4) ;
		var class_ship = "'c"+class_ship1+"'";
		trnode[i].innerHTML = '<th><a href="javascript:maxShip('+class_ship+');">'+ship.nodeValue+'</a></th><th>'+nb_ship1+'<input name="maxc'+class_ship1+'" value="'+nb_ship1+'" type="hidden"></th><th><a href="javascript:maxShip('+class_ship+');">max</a> / <a href="javascript:noShip('+class_ship+');">®</a> </th><th><input tabindex="1" name="c'+class_ship1+'" size="7" maxlength="7" value="0" type="text"></th>';
	}

	var tablenode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tbody')[0];
	tablenode.innerHTML = tablenode.innerHTML.substring(0, tablenode.innerHTML.length-85)+'<th colspan="2"><a href="javascript:noShipsC();">Nijedan brod</a></th><th colspan="2"><a href="javascript:maxShipsC();">Svi brodovi</a></th>'+tablenode.innerHTML.substring(tablenode.innerHTML.length-84, tablenode.innerHTML.length-1);


})();
