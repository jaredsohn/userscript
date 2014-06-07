// ==UserScript==
// @name           Pennergame Bandeneigentum_Upgrades
// @description    Verfügbarer Plunder kann eingezahlt werden, Menge kann bestimmt werden. Script ist von abwasch, gefixt für Koeln by Bengy
// @include        *pennergame.de/gang/stuff/*
// @version        2.0 Mai hinzugefügt, bei Fehlern bitte mir über userscripts melden! Spiele nur in Köln 
// ==/UserScript==

var ScriptID = '101032';
var THISSCRIPTINSTALL_URLQ = 'http://userscripts.org/scripts/show/'+ScriptID+'';
var THISSCRIPTSOURCE_URLQ = 'http://userscripts.org/scripts/source/'+ScriptID+'.user.js';
var version = '2.0';
update()

//======================HISTORY====================================//
//
// @version        1.9 Kamelle hinzugefügt
// @version        1.8 Kleiner Fix mit den Prosssssseccopullen, Feuerwerk entfernt, GUTEN RUTSCH EUCH ALLEN UND ALLES GUTE FÜR DAS NEUE JAHR!!! 
// @version        1.7 Silvesterparty hinzugefügt, MARRY X-MAS euch allen :P
// @version        1.6 Missionsplunder Änderungen by niceguy0815
// @version        1.5 Berlin+München erweitert und HHreloaded hinzugefügt
// @version        1.4 Bandenmissionsplunder hinzugefügt für Köln
// @version        1.3 Updatefunktion optimiert by niceguy0815
// @version        1.2 Script wieder fuer alle deutschen Games fitt gemacht
// @version        1.1 Bug mit dem Geschärften Messer gefixt
// @version        1.0 Grundversion von abwasch
//
//==================================================================//

var link = document.URL.split('pennergame')[0]+'pennergame.de';
var url = document.location.href;
if (url.indexOf('koeln.pennergame') >=0) {
var plunder_name = new Array('Geschärftes Messer', 'Rostiger Nagel', 'Marodes Holzbrett', 'Glasscherbe', 'Fester Holzpanzer', 'Bindfaden', 'Cowboystiefel', 'Fahrrad', 'Fußball', 'Baseballschläger', 'Jetons', 'Bierdeckel', 'Stofftier', 'Dreiblättriges Kleeblatt', 'Doppel-D-Wimpel', 'Schweißbrenner');
var plunder_img = new Array('plunder_new/scharfes_messer.png', 'plunder_new/rostiger_nagel.png', 'plunder_new/marodes_holzbrett.png', 'plunder_new/glasscherbe.png', 'plunder_new/holzpanzer.png', 'plunder_new/bindfaden.png', 'plunder_new/cowboystiefel.png', 'plunder_new/fahrrad.png', 'plunder_new/fussball.png', 'plunder_new/baseball.png', 'plunder_new/jetons.png', 'plunder_new/bierdeckel.png', 'plunder_new/stofftier.png', 'plunder_new/drei_kleeblatt.png', 'plunder_new/doppel_d_wimpel.png', 'plunder_new/schweissbrenner.png');
//var plunder_image_link = 'plunder_new/';
}
if (url.indexOf('reloaded.pennergame') >=0) {
var plunder_name = new Array('Geschärftes Messer', 'Rostiger Nagel', 'Marodes Holzbrett', 'Glasscherbe', 'Fester Holzpanzer', 'Bindfaden', 'Cowboystiefel', 'Fahrrad', 'Fußball', 'Baseballschläger', 'Jetons', 'Bierdeckel', 'Stofftier', 'Dreiblättriges Kleeblatt', 'Doppel-D-Wimpel', 'Schweißbrenner');
var plunder_img = new Array('plunder_new/scharfes_messer.png', 'plunder_new/rostiger_nagel.png', 'plunder_new/marodes_holzbrett.png', 'plunder_new/glasscherbe.png', 'plunder_new/holzpanzer.png', 'plunder_new/bindfaden.png', 'plunder_new/cowboystiefel.png', 'plunder_new/fahrrad.png', 'plunder_new/fussball.png', 'plunder_new/baseball.png', 'plunder_new/jetons.png', 'plunder_new/bierdeckel.png', 'plunder_new/stofftier.png', 'plunder_new/drei_kleeblatt.png', 'plunder_new/doppel_d_wimpel.png', 'plunder_new/schweissbrenner.png');
//var plunder_image_link = 'plunder_new';
}
if (url.indexOf('berlin.pennergame') >=0) {
var plunder_name = new Array('Textilfetzen', 'Rostiger Nagel', 'Marodes Holzbrett', 'Glasscherbe', 'Dir-unbekanntes Artefakt', 'Kaputte Brille', 'Baseballschläger', 'Jetons', 'Bierdeckel', 'Tageskarte', 'iWin', 'Doppel-D-Wimpel', 'Schweißbrenner');
var plunder_img = new Array('plunder_new/textilfetzen.png', 'plunder_new/rostiger_nagel.png', 'plunder_new/marodes_holzbrett.png', 'plunder_new/glasscherbe.png', 'plunder_new/unbekanntes_artefakt.png', 'plunder_new/kaputte_brille.png', 'plunder_new/baseball.png', 'plunder_new/jetons.png', 'plunder_new/bierdeckel.png', 'plunder_new/tageskarte.png', 'plunder_new/iwin.png', 'plunder_new/doppel_d_wimpel.png', 'plunder_new/schweissbrenner.png');
//var plunder_image_link = 'plunder/';
}
if (url.indexOf('muenchen.pennergame') >=0) {
var plunder_name = new Array('Textilfetzen', 'Rostiger Nagel', 'Marodes Holzbrett', 'Glasscherbe', 'Dir-unbekanntes Artefakt', 'Kaputte Brille', 'Baseballschläger', 'Jetons', 'Bierdeckel', 'Tageskarte', 'iWin', 'Doppel-D-Wimpel', 'Schweißbrenner');
var plunder_img = new Array('plunder_new/textilfetzen.png', 'plunder_new/rostiger_nagel.png', 'plunder_new/marodes_holzbrett.png', 'plunder_new/glasscherbe.png', 'plunder_new/unbekanntes_artefakt.png', 'plunder_new/kaputte_brille.png', 'plunder_new/baseball.png', 'plunder_new/jetons.png', 'plunder_new/bierdeckel.png', 'plunder_new/tageskarte.png', 'plunder_new/iwin.png', 'plunder_new/doppel_d_wimpel.png', 'plunder_new/schweissbrenner.png');
//var plunder_image_link = 'plunder';
}
if (url.indexOf('www.pennergame') >=0) {
var plunder_name = new Array('Textilfetzen', 'Rostiger Nagel', 'Marodes Holzbrett', 'Glasscherbe', 'Dir-unbekanntes Artefakt', 'Kaputte Brille', 'Baseballschläger', 'Jetons', 'Bierdeckel', 'Tageskarte', 'iWin', 'Doppel-D-Wimpel', 'Schweißbrenner');
var plunder_img = new Array('plunder_new/textilfetzen.png', 'plunder_new/rostiger_nagel.png', 'plunder_new/marodes_holzbrett.png', 'plunder_new/glasscherbe.png', 'plunder_new/unbekanntes_artefakt.png', 'plunder_new/kaputte_brille.png', 'plunder_new/baseball.png', 'plunder_new/jetons.png', 'plunder_new/bierdeckel.png', 'plunder_new/tageskarte.png', 'plunder_new/iwin.png', 'plunder_new/doppel_d_wimpel.png', 'plunder_new/schweissbrenner.png');
//var plunder_image_link = 'plunder';
}


var plunder_menge = new Array();
var plunder_verf = new Array();
var plunder_id = new Array();

newdiv = document.createElement('div');
newid = document.createAttribute('id');
newid.nodeValue = 'plunderbank';
newdiv.setAttributeNode(newid);
document.getElementsByClassName('tiername')[0].parentNode.insertBefore(newdiv, document.getElementsByClassName('tiername')[0]);

function auslesen(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/gang/stuff/',
		onload: function(responseDetails){
			var web = responseDetails.responseText;
			var bestand = web.match(/<tr class=\"msglist\" onmouseover=\"\">(\s|.)*?<\/tr>/g);
			for (var i = 0; i < plunder_name.length; i++){
				plunder_menge[i] = '0';
				for (var a = 0; a < bestand.length; a++){
					if (bestand[a].search(plunder_name[i]) != -1){
						plunder_menge[i] = bestand[a].split('font-size:12px;">')[1].split(' <span')[0];
					}
				}
			}
			var verf = web.match(/<option value(\s|.)*?<\/option>/g);
			for (var i = 0; i < plunder_name.length; i++){
				plunder_verf[i] = '0';
				plunder_id[i] = '';
				for (var a = 0; a < verf.length; a++){
					if (verf[a].search(plunder_name[i]) != -1){
						plunder_verf[i] = verf[a].split('[x')[1].split(']')[0];
						plunder_id[i] = verf[a].split('="')[1].split('">')[0];
					}
				}
			}
			anzeige()
		},
	}, false);
}

function anzeige(){
	var table = '<table><tr height=\"22\"><td colspan="2">Bandenkasse - Plunderbank<\/td><\/tr><tr height=\"22\" bgcolor=\"#000000\">\n'
		+'<th width=\"40px\"><\/th>'
		+'<th width=\"220\">Plunder<\/th>'
		+'<th width=\"80\" align=\"center\">Menge<\/th>'
		+'<th width=\"80\" align=\"center\">Verfügbar<\/th>'
		+'<th width=\"100\"><\/th><\/tr>\n';
	for (var i = 0; i < plunder_name.length; i++){
		table += '<tr>\n<td height=\"31\"><img src=\"http://static.pennergame.de/img/pv4/'+plunder_img[i]+'\" style=\"background-image: url(http://static.pennergame.de/img/pv4/plunder_new/empty.png); border:1px solid #000; width: 34px; -moz-border-radius:3px\"><\/td>\n'
			+'<td style="vertical-align:middle\">'+plunder_name[i]+'<\/td>\n'
			+'<td style="vertical-align:middle; text-align:center\">'+plunder_menge[i]+'<\/td>\n'
			+'<td style="vertical-align:middle; text-align:center\"><input style="text-align:right\" type=\"text\" size=\"1\" maxlength=\"4\" id=\"einzahlen_'+plunder_name[i]+'\"  value=\"'+plunder_verf[i]+'\"><\/td>\n'
			+'<td style="vertical-align:middle; text-align:center\"><input type=\"submit\" id=\"'+plunder_id[i]+'\" value=\"Einzahlen\" disabled=\"disabled\" style=\"cursor:pointer\"><\/td>\n<\/tr>\n';
	}
	table += '<\/table><br>\n';
	document.getElementById('plunderbank').innerHTML = table;
	for (i = 0; i < plunder_name.length; i++){
		addListener(plunder_name[i], plunder_id[i], plunder_verf[i])
	}
}

function addListener(name, id, verf){
	if (id != ''){
		document.getElementById(id).disabled = '';
		document.getElementById(id).addEventListener('click', function einzahlen(){
			var einzahlen = document.getElementById('einzahlen_'+name).value;
			if (einzahlen*1 <= verf*1){
				GM_xmlhttpRequest({
					method: 'POST',
					url: link+'/gang/stuff/payin/',
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('pid='+id+'&f_count='+einzahlen+'&button=Einzahlen'),
					onload: function() {
						window.setTimeout("PgFunction.showMsg($('notifyme'), 'Hinweis', 'Du hast erfolgreich in die Plunderbank eingezahlt!', 'ok')", 1000);
						auslesen();
					}
				});
			}
			else {confirm('Es können nur '+verf+' "'+name+'" eingezahlt werden.');}
			auslesen()
		},false);
	}	
}

auslesen()

//updatefunktion 
function update(){		
	var now = (new Date().getTime()/86400000).toString().split('\.')[0];
	var last_update = GM_getValue('last_update','0');
	if (now-last_update >= 1){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+ScriptID+'.meta.js',
			onload: function(content) {
				var scriptname = (/@name\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversionhistory = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversion = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1].substr(0, 3);
				if (newversion != version){
					if (confirm('Es gibt eine neue Version des Skriptes '+scriptname+':\n\nVersion: \n'+newversionhistory+'\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n '+THISSCRIPTINSTALL_URLQ+'\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschliessend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt.')){
						window.location.href = ''+THISSCRIPTSOURCE_URLQ+'';
					}
				}
			}
		}, false);
		GM_setValue('last_update', now);
	}
}