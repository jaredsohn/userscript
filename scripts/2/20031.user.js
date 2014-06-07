// ==UserScript==
// @name Ogame : Sicrama Geciti (hepsi/hicbir gemi)
// @namespace Sicrama Geciti (hepsi/hicbir gemi)
// @description Ogame : Sicrama gecidi originate: Jump Gate (all/no ships)
// @source http://userscripts.org/scripts/show/13344
// @identifier http://userscripts.org/scripts/source/13344.user.js
// @version 1.0
// @date 2008-01-05
// @creator ogameclub Black Cat
// @include http://*/game/index.php?page=infos*&gid=43*
// @exclude
// ==/UserScript==

(function(){

	//==========================
	//Supprime table description 
	//==========================
	var supp_image_porte = document.getElementById("content").getElementsByTagName("table")[0];
	if (supp_image_porte.innerHTML.indexOf('gebaeude/43.gif') != -1)
		supp_image_porte.parentNode.removeChild(supp_image_porte);

	//=========================================
	//Insere + modifie les fonctions js d'ogame
	//=========================================
	var doc = document.getElementsByTagName('form')[0];
	var script1 = document.createElement('script');
	script1.setAttribute("type","text/javascript");
	script1.setAttribute("language","javascript");
	script1.setAttribute("src","js/flotten.js");
	doc.parentNode.insertBefore(script1, doc);
	var script2 = document.createElement('script');
	script2.setAttribute("type","text/javascript");
	script2.setAttribute("language","javascript");
	script2.text = 'function maxShipsC() {var id;for (i = 200; i < 220; i++) {id = "c"+i; maxShip(id); }} function noShipsC() {var id;for (i = 200; i < 220; i++) {id = "c"+i; noShip(id); }}';
	doc.parentNode.insertBefore(script2, doc);

	//===============
	//Rebuilding table
	//===============
	var trnode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tr');
	trnode[0].getElementsByTagName('td')[0].setAttribute("colSpan","4");
	trnode[trnode.length-1].getElementsByTagName('th')[0].setAttribute("colSpan","4");

	for( i = 1; i < trnode.length-1; i++ ) {
		var vaisseaux= trnode[i].getElementsByTagName('th')[0].getElementsByTagName('a')[0].innerHTML;
		var nb_vaisseaux = trnode[i].getElementsByTagName('th')[0].childNodes[1].nodeValue.replace(/\D/g,"");
		var class_vaisseaux = trnode[i].getElementsByTagName('th')[1].getElementsByTagName('input')[0].getAttribute("name");
		var cell1 = document.createElement("th");
		cell1.innerHTML = '<a>'+vaisseaux+'</a>';
		var cell2 = document.createElement("th");
		cell2.innerHTML = nb_vaisseaux+'<input name="max'+class_vaisseaux+'" value="'+nb_vaisseaux+'" type="hidden">';
		var cell3 = document.createElement("th");
		cell3.innerHTML = '<a href="javascript:maxShip(\''+class_vaisseaux+'\');">max</a>';
		var cell4 = document.createElement("th");
		cell4.innerHTML = '<input tabindex="'+i+'" name="'+class_vaisseaux+'" size="7" maxlength="7" value="0" type="text">';
		while (trnode[i].firstChild)
			trnode[i].removeChild(trnode[i].firstChild);
		trnode[i].appendChild(cell1);
		trnode[i].appendChild(cell2);
		trnode[i].appendChild(cell3);
		trnode[i].appendChild(cell4);
	}

	var cell1 = document.createElement("th");
	cell1.setAttribute("colSpan","2");
	cell1.innerHTML = '<a href="javascript:noShipsC();">Hic bir gemi</a>';
	var cell2 = document.createElement("th");
	cell2.setAttribute("colSpan","2");
	cell2.innerHTML = '<a href="javascript:maxShipsC();">Tüm gemiler</a>';
	var row = document.createElement("tr");
	row.appendChild(cell1);
	row.appendChild(cell2);
 	trnode[0].parentNode.insertBefore(row,trnode[trnode.length-1]);

})();
