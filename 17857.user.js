// ==UserScript==
// @name           Scan Galaxie
// @namespace      Scan Galaxie
// @description    Scan Galaxie automatique
// @author          Seyguai
// @include        http://*/game/index.php*page=galaxy*
// ==/UserScript==

var ScanType = GM_getValue('ScanGalaType', false);
if (ScanType) ScanType = ScanType.split('|');
var form = document.getElementById('content').getElementsByTagName('form')[0];
var galaxy = document.getElementsByName('galaxy')[0].value * 1;
var system = document.getElementsByName('system')[0].value * 1;
var url = document.URL.replace(/.+index\.php/, 'index.php').replace(/(session=[0-9a-zA-Z]+)&.+/, '$1');

function Scan() {
var Etap;
if (this.getAttribute('id') == 'U') Etap = 'U|0';
else if (this.getAttribute('id') == 'U2') Etap = 'U|' + (galaxy - 1);
else Etap = 'G|' + (galaxy - 1);
GM_setValue('ScanGalaType', Etap);
}

if (ScanType) {
	if (system * 1 < 499) document.getElementsByName('systemRight')[0].click();
	else if (ScanType[0] == 'U') {
			if (ScanType[1] != galaxy) {
				document.getElementsByName('system')[0].value = 1;
				GM_setValue('ScanGalaType', ScanType[0] + '|' + galaxy)
				document.getElementsByName('galaxyRight')[0].click();
			} else {
				GM_setValue('ScanGalaType', false);
				alert('Scan Univers ' + document.URL.match(/uni(\d+)\.ogame/)[1] + ' terminé.');
				window.setTimeout("location.replace('" + url + "');", 1500);
			}
		} else {
			GM_setValue('ScanGalaType', false);
			alert('Scan Galaxie ' + galaxy + ' terminé.');
			window.setTimeout("location.replace('" + url + "');", 1500);
		}
} else {
	var td = document.getElementById('content').getElementsByTagName('td');
	for (var i = 0; i < td.length; i++) {
		if (td[i].innerHTML.search(/<input.+value="Afficher"/) + 1) {
			var align = document.createAttribute('align');
			align.nodeValue = "right";
			td[0].setAttributeNode(align);
			td[i].innerHTML = '<input id="G" type="button" value="Scanner la G' + galaxy + '" onclick="location.replace(\'' + url + '&amp;galaxy=' + galaxy + '&amp;system=1\');">';
			td[i].innerHTML += ' <input id="G2" type="button" value="Scanner la G' + galaxy + ' à partir d\'ici" onclick="location.replace(\'' + url + '&amp;' + galaxy + '&amp;system=' + (system * 1 + 1) + '\');">';
			td[i].innerHTML += ' <input type="submit" value="Afficher">';
			td[i].innerHTML += ' <input id="U" type="button" value="Scanner Tout" onclick="location.replace(\'' + url + '&amp;galaxy=1&amp;system=1\');">';
			td[i].innerHTML += ' <input id="U2" type="button" value="Scanner Tout à partir d\'ici" onclick="location.replace(\'' + url + '&amp;' + galaxy + '&amp;system=' + (system * 1 + 1) + '\');">';
		}
	}
	document.getElementById('G').addEventListener('click',Scan,true);
	document.getElementById('G2').addEventListener('click',Scan,true);
	document.getElementById('U').addEventListener('click',Scan,true);
	document.getElementById('U2').addEventListener('click',Scan,true);
}