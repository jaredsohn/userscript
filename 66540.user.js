// ==UserScript==
// @name           Halb automatisches zurueck spende script pennergame 4.0 by basti1012
// @namespace      by basti1012 (visit tpennerhack.foren-city.de)
// @description    sobnald man die spenden statistik seite betretten tut werden alle penner die dir gespendet haben zurueck gespendet .und wenn man seite 1.2.3.4.5 und so weiter anklickt werden die leuten auch automtisch zurueck gespendet . ( mit rueck antwort was gespendet wurde und so )
// @include        *change_please/statistics/*
// ==/UserScript==


var url = document.location.href;
//if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var spendenlink = 'http://change.pennergame.de/change_please/';
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
var spendenlink1 = 'http://change.berlin.pennergame.de/change_please/';
}
// Linkadressen fuer Frankreich
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
var spendenlink = 'http://www.clodogame.fr/change_please/';//3468441/
}
// Linkadressen fuer Spanien
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var spendenlink = 'http://cambio.mendigogame.es/change_please/';//5082469/
}
// Linkadresse tuerkei
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
var spendenlink = 'http://change.serserionline.com/change_please/';//9220500/
}
// Linkadresse dossergame
if (url.indexOf("dossergame.co.uk")>=0) {
var link = "http://www.dossergame.co.uk"
var spendenlink = 'http://change.dossergame.co.uk/change_please/';//3193774/
}
// Linkadresse menelgame
if (url.indexOf("menelgame.pl")>=0) {
var link = "http://www.menelgame.pl"
var spendenlink = 'http://change.menelgame.pl/change_please/';//3315734/
}

document.getElementsByClassName("settingpoint")[0].getElementsByTagName("h2")[0].innerHTML = '<h2>Halb Automatisches zur&uuml;ck Spende Script By Basti1012.<a href="http://pennerhack.foren-city.de">Homepage</a></h2>';

var tablea = document.getElementsByClassName("settingpoint")[0];
var tra = tablea.getElementsByTagName("tr")[0];
var newtd = tra.appendChild(document.createElement('td'));
newtd.setAttribute('id', 'stadta');
newtd.setAttribute('style', 'vertical-align:middle;text-align:left;width:300px;');
document.getElementById('stadta').innerHTML = '<img src="http://www.fotos-hochladen.net/gedrehter65bmh8s9.jpg"</img>&nbsp;&nbsp;&nbsp;<strong>Zur&uuml;ck gespendet</strong>';




				for(x=1;x<=21;x++){
var tablea = document.getElementsByClassName("settingpoint")[0];
var aaaa = tablea.getElementsByTagName("tr")[x];


					var table = document.getElementsByClassName("settingpoint")[0];
					table.style.width = '1200px';
					var tr = table.getElementsByTagName("tr");

					var newtd = tr[x].appendChild(document.createElement('td'));
					newtd.setAttribute('id', 'stadt'+x);
					newtd.setAttribute('style', 'vertical-align:middle;text-align:left;width:300px;');



					try{
						var wer = aaaa.innerHTML.split('target="_blank">')[1].split('</a>')[0];
						var wan = aaaa.innerHTML.split('valign="bottom">')[2].split('</td>')[0];
						var id = aaaa.innerHTML.split('href="/change_please/')[1].split('/')[0];
						spenden(wan,wer,id,x)


					}catch(e){

						document.getElementById('stadt'+x).innerHTML = '<font style=\"color:red; font-size:100%;\">- - -</font>';
					}
				}



function spenden(wan,wer,id,x){

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+spendenlink+''+id+'/',
		onload: function(responseDetails) {
			var quelltext = responseDetails.responseText;

			if(quelltext.match(/Becher geworfen!/)){

		var geld1 = quelltext.split('Du hast')[1];
		var geld = geld1.split('in')[0];



				document.getElementById('stadt'+x).innerHTML = '<font style=\"color:green; font-size:100%;\">Du hast '+geld+' an ihn gespendet</font>';


			} else if(quelltext.match(/hat heute schon genug Spenden erhalten/)){
				document.getElementById('stadt'+x).innerHTML = 'Hat Heute genug Spenden erhalten';

			}else if(quelltext.match(/ist bereits bis zum Rand/)){
				document.getElementById('stadt'+x).innerHTML = 'Becher ist bis zum Rand voll';

			}else if(quelltext.match(/Refid ist nicht bekannt/)){
				document.getElementById('stadt'+x).innerHTML = 'RefId (Spendenlink) unbekannt ';

			}else if(quelltext.match(/etwas in den Becher werfen.../)){
				document.getElementById('stadt'+x).innerHTML = 'Spender ist Berliner';

			}else if(quelltext.match(/Minuten wieder Spenden/)){

				var minu1 = quelltext.split('class="settingpoint')[1];
				var minu2 = minu1.split('id="content')[0];
				var minu3 = minu2.split('counter(')[1];
				var minut = minu3.split(')')[0];
				document.getElementById('stadt'+x).innerHTML = '<font style=\"color:orange; font-size:100%;\">Du kannst erst in '+minut+' Sekunden Spenden</font>';

			}else if(quelltext.match(/Error Unknown User/)){
				document.getElementById('stadt'+x).innerHTML = 'Der User ist Unbekannt (Gel&ouml;scht)';
			}
		}
	});
}










