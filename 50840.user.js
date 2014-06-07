// ==UserScript==
// @name           Ogame cleaner
// @namespace      Im Me
// @description    Ogame cleaner with advanced jump gate
// @include        http://*/game/index.php*
// ==/UserScript==

var sid = location.search.split('&')[1].split('=')[1];
// Begin of Configuration
var darkmatter = true;
var jump_gate_text = 'Springportal';
var advanced_jump_gate = true;
var external_links = true;
var internal_links = true;
var elems = new Array();
var elems = ['page=commander', 'page=offiziere', 'tutorial.', 'regeln.', 'impressum.', 'go=about'];
// End of Configuration
if (!darkmatter)
	elems.push('page=trader');

if (advanced_jump_gate && location.search.indexOf('gid=43', 0) >= 0)
{
	var tables = document.getElementById('content').getElementsByTagName('table');
	if (tables.length >= 5)
	{
		var regexp = /(\([0-9]+)/;
		var trs = tables[3].getElementsByTagName('tr');
		for (var i = 1; i < (trs.length - 1); i++)
		{
			var ths = trs[i].getElementsByTagName('th');
			ths[1].innerHTML += '<input id="buttonMax'+i+'" type="button" value="max" onclick="this.previousSibling.value='+ths[0].innerHTML.match(regexp)[0].substr(1)+'">';
		}
		trs[i].getElementsByTagName('th')[0].innerHTML += '&nbsp;<input type="button" value="All" onclick="for (var i = 1; i < '+(trs.length - 1)+'; i++)document.getElementById(\'buttonMax\'+i).click();">&nbsp;<input type="reset">';
	}
}
var obj = document.getElementById('darkmatter2');
if (obj) obj.parentNode.removeChild(obj);
var obj = document.getElementById('combox_container');
if (obj) obj.parentNode.removeChild(obj);
var td = document.getElementById('menu').getElementsByTagName('td');
for (var i = 0; i < td.length; i++)
	for (var elem in elems)
		if (td[i].innerHTML.indexOf(elems[elem], 0) >= 0)
		{
			if (elems[elem] == 'tutorial.' && jump_gate_text)
				td[i].innerHTML = '<div style="text-align:center;"><a href="index.php?page=infos&session='+sid+'&gid=43">'+jump_gate_text+'</a></div>';
			else
				td[i].setAttribute('style', 'display:none;');
		}
var last_item = td[i - 1].parentNode;
if (external_links || internal_links)
{
	if (external_links)
		for (var key in external_links)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerHTML = '<div style="text-align:center;"><a target="_blank" href="'+external_links[key].url+'" style="color:'+external_links[key].color+';">'+external_links[key].name+'</a></div>';
			tr.appendChild(td);
			last_item.parentNode.insertBefore(tr, last_item);
		}
	if (internal_links)
		for (var key in internal_links)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerHTML = '<div style="text-align:center;"><a href="'+internal_links[key].url+'" style="color:'+internal_links[key].color+';">'+internal_links[key].name+'</a></div>';
			tr.appendChild(td);
			last_item.parentNode.insertBefore(tr, last_item);
		}
	last_item.parentNode.removeChild(last_item);
}
var resources = document.getElementById('resources');
if (resources && !darkmatter)
{
	var td = resources.getElementsByTagName('td');
	td[13].parentNode.removeChild(td[13]);
	td[8].parentNode.removeChild(td[8]);
	td[3].parentNode.removeChild(td[3]);
}
var header_top = document.getElementById('header_top');
if (header_top)
{
	var img = header_top.getElementsByTagName('img');
	for (var i = img.length - 1; i > 4; i--)
		if (img[i].src.indexOf('ikon_un.gif', 0) >= 0)
			img[i].setAttribute('style', 'display:none;');
}
if (obj = document.getElementById('content'))
	obj.style.height = 'auto';
document.getElementsByTagName('body')[0].setAttribute('style', 'overflow:auto;');

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
	cell1.innerHTML = '<a href="javascript:noShipsC();">Ingen Skibe</a>';
	var cell2 = document.createElement("th");
	cell2.setAttribute("colSpan","2");
	cell2.innerHTML = '<a href="javascript:maxShipsC();">Alle Skibe</a>';
	var row = document.createElement("tr");
	row.appendChild(cell1);
	row.appendChild(cell2);
 	trnode[0].parentNode.insertBefore(row,trnode[trnode.length-1]);

})();