// ==UserScript==
// @name Crash Test
// @description Crash volontairement une sonde pour permettre le recyclage
// @language FR
// @author Seyguai
// @include http://*uni*.ogame.fr/game/index.php?page=galaxy*
// ==/UserScript==

var SELF_url = 'http://seyguai.free.fr/OGame/Divers/';

var server = document.URL.match(/http:\/\/(?:localhost\/)?(uni\d+\.ogame\.[a-zA-Z\.]+)\//)[1];
var session = document.URL.match(/session=([a-zA-Z0-9]+)/)[1];
var Img = GM_getValue('img_' + server, false);
var ToolTip = GM_getValue('tooltip_' + server, false);

	var tr = FindXPath('//table[@id="t1"]/tbody')[0].appendChild(document.createElement('tr'));
	tr.setAttribute('class', 'header');
		var td = tr.appendChild(document.createElement('td'));
		td.setAttribute('class', 'header');
		td.setAttribute('style', 'border: 0px none ; background-color: transparent;');
		td.setAttribute('colspan', '2');
		td.setAttribute('align', 'center');
			var i = td.appendChild(document.createElement('i'));
				var span = i.appendChild(document.createElement('span'));
					span.appendChild(document.createTextNode('Crash Test'));
			i.appendChild(document.createTextNode(' - '));
				var span = i.appendChild(document.createElement('span'));
					var u = span.appendChild(document.createElement('u'));
					u.appendChild(document.createTextNode('Options'));
				span.addEventListener('click', showhidePref, false);

// Options
var table = document.body.appendChild(document.createElement('table'));
table.setAttribute('style', 'top: 50px; left: 200px; overflow: visible; position: fixed; display: none;');
table.setAttribute('id', 'user-script-crash_test-table-option');
	var tr = table.appendChild(document.createElement('tr'));
		var td = tr.appendChild(document.createElement('td'));
		td.setAttribute('class', 'l');
		td.innerHTML = '<b>Options</b>';
	var tr = table.appendChild(document.createElement('tr'));
		var td = tr.appendChild(document.createElement('td'));
		td.setAttribute('class', 'l');
		td.innerHTML = '';
			var input = td.appendChild(document.createElement('input'));
			input.setAttribute('type', 'checkbox');
			if (ToolTip) input.setAttribute('checked', true);
			input.addEventListener('click', function () {eval('ToolTip = ' + this.checked + ';');}, false);
			td.appendChild(document.createTextNode('Lien dans ToolTip'));
			td.appendChild(document.createElement('br'));
			var input = td.appendChild(document.createElement('input'));
			input.setAttribute('type', 'checkbox');
			if (Img) input.setAttribute('checked', true);
			input.addEventListener('click', function () {eval('Img = ' + this.checked + ';');}, false);
			td.appendChild(document.createTextNode('Image dans Actions'));
			td.appendChild(document.createElement('br'));
	var tr = table.appendChild(document.createElement('tr'));
		var td = tr.appendChild(document.createElement('td'));
		td.setAttribute('class', 'l');
		td.setAttribute('align', 'right');
			var div = td.appendChild(document.createElement('div'));
			div.innerHTML = '<i>Sauver</i>';
			div.addEventListener('click', Save, false);


if (Img) {
	var tr = FindXPath('//table[@width="569"]/tbody/tr');
	var z = getRefWith('Actions');
	if (z + 1) for (var i = 2; i < 17; i++) { // Position 1 à 15
		var th = FindXPath('th[' + z + ']', tr[i])[0];
		if (!(th.innerHTML.search(/doit\(/) + 1)) continue;
		var a = FindXPath('a', th)[0];
		var a = th.insertBefore(a.cloneNode(true), a);
		a.setAttribute('onclick', a.getAttribute('onclick').replace(/doit\(\d+, (\d+, \d+, \d+, \d+), \d+\);/, 'doit2($1);'));
		var img = FindXPath('img', a)[0];
		img.setAttribute('alt', 'Créer un CDR');
		img.setAttribute('title', 'Créer un CDR');
		img.setAttribute('src', 'http://img705.imageshack.us/img705/3671/boomp.gif');
	}
}

if (ToolTip) {
	var tr = FindXPath('//table[@width="569"]/tbody/tr');
	var z = getRefWith('Planète');
	if (z + 1) for (var i = 2; i < 17; i++) { // Position 1 à 15
		var th = FindXPath('th[' + z + ']', tr[i])[0];
		if (!(th.innerHTML.search(/doit\(/) + 1)) continue;
		var a = FindXPath('a', th)[0];
		var txt = a.getAttribute('onmouseover');
		if (!(txt.search(/doit\(/) + 1)) continue;
		txt = txt.replace(/(<a href=# onclick=doit\(\d+,(\d+,\d+,\d+,\d+),\d+\) >Espionner<\/a><br>)/, '$1<a href=# onclick=doit2($2) >Créer un CDR</a><br>');
		a.setAttribute('onmouseover', txt);
	}
}

// Ajout du script
var code = '';
code += 'function doit2(galaxy, system, planet, planettype){';
code += 'strInfo = "Envoi d\'une Sonde en mode Attaque pour créer un CDR aux coordonnées "+galaxy+":"+system+":"+planet+"...";';
code += 'ajax.requestFile = "index.php?ajax=1&page=flottenversand&session=' + session + '";';
code += 'ajax.runResponse = whenResponse;';
code += 'ajax.execute = true;';
code += 'ajax.setVar("session", "' + session + '");';
code += 'ajax.setVar("order", 1);';
code += 'ajax.setVar("galaxy", galaxy);';
code += 'ajax.setVar("system", system);';
code += 'ajax.setVar("planet", planet);';
code += 'ajax.setVar("planettype", planettype);';
code += 'ajax.setVar("ship210", 1);';
code += 'ajax.setVar("speed", 10);';
code += 'ajax.setVar("reply", "short");';
code += 'ajax.runAJAX();';
code += '}';
var script = FindXPath('//div[@id="content"]')[0].appendChild(document.createElement('script'))
script.setAttribute('language', 'JavaScript');
script.innerHTML += code;

function getRefWith(txt) {
	var td = FindXPath('//table[@width="569"]/tbody/tr[2]/td[@class="c"]');
	for (var i = 0; i < td.length; i++) if (td[i].innerHTML.search(txt) + 1) return i + 1;
	return -1;
}
function showhidePref(txt) { FindXPath('//table[@id="user-script-crash_test-table-option"]')[0].style.display = txt == 'none' ? 'none' : ''; }
function Save() {
	GM_setValue('tooltip_' + server, ToolTip);
	GM_setValue('img_' + server, Img);
	showhidePref('none');
}
function FindXPath (XPath) {
	var doc = document;
	if (FindXPath.arguments.length > 1) doc = FindXPath.arguments[1];
	var Arr = new Array();
		
	var Result = document.evaluate(XPath, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	for (var next = null; next = Result.iterateNext(); ) Arr.push(next);
	
	return Arr;
}
