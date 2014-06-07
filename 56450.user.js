// ==UserScript==
// @name           ProdOverviewDropdown
// @namespace      DS
// @author         Bananaz - Welt 26
// @description    Erzeugt ein Dropdown-Menue in der Produktions-Uebersicht, in dem man das Ziel der Dorflinks auswaehlen kann
// @include        http://de*.die-staemme.de/*screen=overview_villages*
// ==/UserScript==

var karte = false;		//<---	wenn bei der Funktion auf Karte zentrieren auch das Dorf
				//	gewechselt werden sollen, karte = true setzen
var uebernehmen = true;		//<---	wenn beim Neuladen der Übersicht die Links weiterhin
				//	veraendert sein sollen, uebernehmen = true setzen
				//	(nur fuer GM!!)

function main() {
	var select = document.createElement('select');
	var option = new Array();
	for (var a = 0; a < 14; a++) {option[a] = document.createElement('option')}
	option[0].innerHTML = '&Uuml;bersicht';
	option[0].value = 'overview';
	option[0].id = 'optionoverview';
	option[1].innerHTML = '-----';
	option[1].value = '-';
	option[1].disabled = true;
	option[2].innerHTML = 'Hauptgeb&auml;ude';
	option[2].value = 'main';
	option[3].innerHTML = 'Kaserne';
	option[3].value = 'barracks';
	option[4].innerHTML = 'Stall';
	option[4].value = 'stable';
	option[5].innerHTML = 'Werkstatt';
	option[5].value = 'garage';
	option[6].innerHTML = 'Schmiede';
	option[6].value = 'smith';
	option[7].innerHTML = 'Adelshof';
	option[7].value = 'snob';
	option[8].innerHTML = 'Markt';
	option[8].value = 'market';
	option[9].innerHTML = 'Versammlungsplatz';
	option[9].value = 'place';
	option[10].innerHTML = '-----';
	option[10].value = '-';
	option[10].disabled = true;
	option[11].innerHTML = 'Rekrutieren';
	option[11].value = 'train';
	option[12].innerHTML = 'Auf Karte zentrieren';
	option[12].value = 'map';
	option[13].innerHTML = 'Gruppe bearbeiten';
	option[13].value = 'group';
	select.addEventListener('change', function() {aendern(this.value)}, false);
	for (var a = 0; a < 14; a++) {
		if (uebernehmen && option[a].value == GM_getValue('event')) {
			option[a].selected = 'selected';
			aendern(option[a].value);
			}
		select.appendChild(option[a]);
	}
	var th = table.getElementsByTagName('th')[0];
	th.innerHTML = th.innerHTML + '<span style="white-space:pre">		</span>';
	th.appendChild(select);
}

function aendern(event) {
	index = table.getElementsByTagName('tr')[1].getElementsByTagName('a').length;
	reset();
	links = table.getElementsByTagName('a');
	var link = location.href.split('village=')[0];
	if (uebernehmen) {GM_setValue('event', event)}
	if (event == 'map') {
		if (!karte) {
			var aktuellesdorf = document.getElementsByTagName('b')[0].parentNode.previousSibling.firstChild;
			var aktuelleid = aktuellesdorf.href.split('village=')[1].split('&screen')[0];
		}
		for (a = 0; a < links.length; a = a + index) {
			if (links[a].href.match(/village=(\d+)&screen=overview&x=(\d+)&y=(\d+)/)) {
				var x = RegExp.$2;
				var y = RegExp.$3;
				if (karte) {
					var id = RegExp.$1;
					links[a].href = link + 'village=' + id + '&screen=map&x=' + x + '&y=' + y;
				}
				else {links[a].href = link + 'village=' + aktuelleid + '&screen=map&x=' + x + '&y=' + y}
			}
		}
	}
	else if (event == 'group') {
		for (a = 0; a < links.length; a = a + index) {
			if (links[a].href.match(/village=(\d+)&screen=overview&x=(\d+)&y=(\d+)/)) {
				var id = RegExp.$1;
				links[a].href = 'javascript:popup_scroll(\'groups.php?&mode=village&village_id=' + id + '\', 300, 400);';
			}
		}
	}
	else if (event != '') {
		for (a = 0; a < links.length; a = a + index) {
			if (links[a].href.match(/village=(\d+)&screen=overview&x=(\d+)&y=(\d+)/)) {
				var id = RegExp.$1;
				links[a].href = link + 'village=' + id + '&screen=' + event;
			}
		}
	}
}


function reset() {
	var links = new Array();
	links = table.getElementsByTagName('a');
	var link = location.href.split('village=')[0];
	for (a = 0; a < links.length; a = a + index) {
		if (links[a+1].href.match(/label_(\d+)\',/)) {
			var id = RegExp.$1;
		}
		var x = '';
		var y = '';
		if (links[a].href.match(/screen=map&x=(\d+)&y=(\d+)/)) {
			x = RegExp.$1;
			y = RegExp.$2;
		}
		else {
			//var text = links[a].innerHTML.split('>')[1].split('<')[0];
			if(links[a].innerHTML.match(/\((\d+)\W(\d+)\)\sK\d+/) != null) {
				var x = RegExp.$1;
				var y = RegExp.$2;
			}
		}
		links[a].href = link + 'village=' + id + '&screen=overview&x=' + x + '&y=' + y;
	}
}

var input = document.getElementById('overview');
if (input.value == 'prod' || input.value == 'combined') {
	var tables = document.getElementsByTagName('table');
	for (a = 0; a < tables.length; a++) {
		//if (a == 25) {alert(a + '\n' + tables[a].getElementsByTagName('th')[0].innerHTML)}
		if (tables[a].getElementsByTagName('th')[0] != undefined) {
			if (tables[a].getElementsByTagName('th')[0].innerHTML.match('Dorf')) {var table = tables[a]}
		}
	}
	var index = 0;
	main();
}