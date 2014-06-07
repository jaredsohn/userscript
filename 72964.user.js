// ==UserScript==
// @name 		 Letzte Bandeneinzahlungen Pennergame by basti1012 & Boggler
// @namespace basti1012 @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @description Zeigt eine kleines feld an den rechten rand .wo die letzten bandenkassen eintrege drinne stehen fuer alle Pennergames
// @include        http://*serserionline.com*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*pennergame.de*
// @include        http://*dossergame.co.uk*
// @include        http://*menelgame.pl*
// @include        http://*bumrise.com*
// @license		 Creative Commons by-nc-sa
// ==/UserScript==


//Linkadressen definieren
var url = document.location.href;
//Linkadressen fuer Hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
}
//Linkadressen fuer Berlin
if (url.indexOf("berlin")>=0) {
var link = "http://berlin.pennergame.de"
var sig = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}
//Linkadressen fuer Muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var link = "http://muenchen.pennergame.de"
var sig = 'http://inodes.pennergame.de/mu_DE/signaturen/';
}

//Linkadressen fuer Dossergame
if (url.indexOf("dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var sig = 'http://inodes.dossergame.co.uk/en_EN/signaturen/';
}
//Linkadressen fuer Menelgame
if (url.indexOf("menelgame")>=0) {
var link = "http://www.menelgame.pl"
var sig = 'http://inodes.clodogame.fr/pl_PL/signaturen/';
}
//Linkadressen fuer Clodogame
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
var sig = 'http://inodes.clodogame.fr/fr_FR/signaturen/';
}
//Linkadressen fuer Mendigogame
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var sig = 'http://inodes.mendigogame.es/es_ES/signaturen/';
}
//Linkadressen fuer Serserionline
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
var sig = 'http://inodes.pennergame.de/tr_TR/signaturen/';
}
//Linkadressen fuer Bumrise
if (url.indexOf("bumrise")>=0) {
var link = "http://www.bumrise.com"
var sig = 'http://inodes.pennergame.de/us_EN/signaturen/';
}

//Farben und sowas
//var VonOben = '50'; //px
//var VonRechts = '60'; //px
var borderfarbe = 'blue';
var hintergrundfarbe = 'grey';
var schrieftfarbe = 'black';
var schrieftfarbe1 = 'green';
var schrieftgroese = '120';
var borderbreite = '3';

if(GM_getValue('anzahl') == null){
GM_setValue('anzahl', 5)
}
if(GM_getValue('left') == null){
GM_setValue('left', 50)
}
if(GM_getValue('top') == null){
GM_setValue('top', 50)
}
//Grundmenue erstellen
var grundmenue = '<div id="letzte" name="letzte" style="position:fixed;top:'+GM_getValue('top')+'px;right:'+GM_getValue('left')+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite+'px solid '+borderfarbe+'; background-color:'+hintergrundfarbe+'">'
							+'<span style=\"color:'+schrieftfarbe+'; font-size:'+schrieftgroese+'%;\"><div id="infos"></div></span><br><a id="setting">Settings</a><br><div id="settings"></div></div>';
document.getElementsByTagName('body')[0].innerHTML += grundmenue;
//<input type="text" name="anzahl" id="anzahl" size="3"  value="'+GM_getValue("anzahl")+'"><input type="button" name="menge" id="menge" value="auswahl">


document.getElementById('setting').addEventListener('click', function settingoeffnen () {
document.getElementById('settings').innerHTML = ''
+'Right(px): <input type="text" size="2" id="left" value="'+GM_getValue('left')+'"> Top(px): <input type="text" size="2" value="'+GM_getValue('top')+'" id="top"> Anzahl: <input type="text" size="2" value="'+GM_getValue('anzahl')+'" id="menge"><br>'
+'<a id="speichern">Speichern</a>';

document.getElementById('speichern').addEventListener('click', function speichern(){
GM_setValue("anzahl", document.getElementById('menge').value);
GM_setValue("left", document.getElementById('left').value);
GM_setValue("top", document.getElementById('top').value);
window.location.reload();
			},false); 




},false);

x=0;
suchen(x);
function suchen(x){
var anzahl = GM_getValue("anzahl");


if(x<Number(anzahl)) {
GM_xmlhttpRequest({
method: 'GET',
    	url: ''+link+'/gang/credit/?showall=1',
    	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var table = content.split('Gesamt:')[1].split('Nur 20 anzeigen')[0];
		var tr = table.split('<tr>')[x+1].split('</table>')[0];
			var wer = tr.split('">')[2].split('</a>')[0];
			var wann = tr.split('am ')[1].split('</span>')[0];
		try{
			var was = tr.split('Kommentar:')[1].split('</td>')[0];
		}catch(e){
			var was = '';
		}
			var wieviela = tr.split('style="float:right">')[1].split('</span>')[0];	
			if(wieviela.indexOf('+')>0){
			var wieviel = '<font style="color:green">'+wieviela+'</font>';
			}else{
			var wieviel = '<font style="color:red">'+wieviela+'</font>';
			}
			var inhalt = '<br><a href="/profil/'+wer+'/">'+wer+'</a>'+wann+was+wieviel;
			document.getElementById('infos').innerHTML += inhalt;
			x++;
			suchen(x);
					}
		});
		}
}


// Copyright (c) by basti1012 @ Pennerhack ( visit: http://www.pennerhack.de.tc )
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.

