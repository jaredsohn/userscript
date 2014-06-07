// ==UserScript==
// @name           NNG-Skript
// @namespace      -
// @description    Erweitert NoNameGame um einige nützliche Funktionen
// @include        http://uni1.nonamegame.de/*
// @version        4.15
// ==/UserScript==

// Allgemeine Variablen
var version = '4.15';
var server = 'http://uni1.nonamegame.de';

var Update = {};
Update.id         = 57960;
Update.curVersion = 4.15;
Update.callback   = function () {
	alert('Es gibt eine neuere Version des Skriptes.\n\nSie werden automatisch zur Update-Seite weitergeleitet.');
	parent.location.href = 'http://userscripts.org/scripts/show/57960';
}

Update.check = function () {
   if (!Update.id)         { return; }
   if (!Update.curVersion) { return; }
   if (Update.keys && Update.keys['version'])  { Update.callback(); }
   var url = 'http://userscripts.org/scripts/source/'+Update.id+'.meta.js';
   XHR.get(url, Update.onXHR);
}
Update.onXHR = function (response) {
  var splat = response.responseText.split(/[\r\n]/),
  keys = {};
  for (var i in splat) {
    if (!splat[i]) continue;
    var matches = splat[i].match(/@([\w:]+)\s+(.+)/);
    if (!matches) continue;
    keys[matches[1]] = matches[2];
  }
  // set update keys
  Update.keys = keys;
  Update.url = 'http://userscripts.org/scripts/source/' + Update.id + '.user.js';
  if (keys['version'] && (keys['version'] != Update.curVersion)) {
    Update.callback();
  }
};

var XHR = {};
XHR.createQueryString = function (obj) {
   var ret = [];
   for (var i in obj) {
      ret.push([i, encodeURIComponent(obj[i])].join('='));
   }
   return ret.join('&');
}

XHR.createDoc = function (r, callback) {
  var doc = document.implementation.createDocument('','',null);
  var html = document.createElement('html');
  html.innerHTML = r.responseText;
  doc.appendChild(html);
  r.doc = doc;
  callback(r);
}

XHR.post = function (url, callback, data) {
   GM_xmlhttpRequest({
         method: 'POST',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': XHR.createQueryString(data).length,
         },
         data: XHR.createQueryString(data),
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}

XHR.get = function (url, callback) {
   GM_xmlhttpRequest({
         method: 'GET',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}

// Auf aktuellste Version pruefen
Update.check();

// Seiten-URL extrahieren, sodass nach dem .php nichts anderes mehr steht
var url = document.URL.substring(0, document.URL.indexOf('.php')+4);

// Allgemeine Variablen
var max_flotten_verschickt = false;
var attTabLinkLoeschen = false;

// Schiffkosten und Namen
var kts_met = 2000; var kts_kris = 2000; var kts_deut = 0; var kts_name = "Kleiner Transporter";
var gts_met = 8000; var gts_kris = 8000; var gts_deut = 0; var gts_name = "Großer Transporter";
var kolo_met = 10000000; var kolo_kris = 6000000; var kolo_deut = 2000000; var kolo_name = "Kolonieschiff";
var rec_met = 40000; var rec_kris = 20000; var rec_deut = 6000; var rec_name = "Recycler";
var spio_met = 0; var spio_kris = 1000; var spio_deut = 0; var spio_name = "Spionagesonde";
var sats_met = 0; var sats_kris = 4000; var sats_deut = 1000; var sats_name = "Solarsatellit";
var lj_met = 3000; var lj_kris = 1000; var lj_deut = 0; var lj_name = "Leichter Jäger";
var sj_met = 5750; var sj_kris = 3800; var sj_deut = 0; var sj_name = "Schwerer Jäger";
var xer_met = 12600; var xer_kris = 5600; var xer_deut = 900; var xer_name = "Kreuzer";
var sxer_met = 22000; var sxer_kris = 10000; var sxer_deut = 3000; var sxer_name = "Schlachtkreuzer";
var ss_met = 32500; var ss_kris = 22500; var ss_deut = 8000; var ss_name = "Schlachtschiff";
var bomber_met = 85000; var bomber_kris = 20000; var bomber_deut = 9750; var bomber_name = "Bomber";
var zerri_met = 165000; var zerri_kris = 100000; var zerri_deut = 24000; var zerri_name = "Zerstörer";
var rip_met = 300000; var rip_kris = 220000; var rip_deut = 75000; var rip_name = "Todesstern";

// Einstellungen laden
var befreundeteAllianzen = loadBefreundeteAllianzen();
var befreundeteSpieler = loadBefreundeteSpieler();
var spionageBerichtKleineTransporter = parseInt(GM_getValue('nonamegame_spionageBerichtKleineTransporter', '0'));
var spionageBerichtMetall = parseInt(GM_getValue('nonamegame_spionageBerichtMetall', '0'));
var spionageBerichtKristall = parseInt(GM_getValue('nonamegame_spionageBerichtKristall', '0'));
var spionageBerichtDeuterium = parseInt(GM_getValue('nonamegame_spionageBerichtDeuterium', '0'));
var spionageBerichtRecycler = parseInt(GM_getValue('nonamegame_spionageBerichtRecycler', '0'));
var tabellenBreite = parseInt(GM_getValue('nonamegame_tabellenBreite', '600'));
var standartFlotteTyp = GM_getValue('nonamegame_spionageBerichtStandartFlotteTyp', 'ship205');
var standartFlotteAnzahl = parseInt(GM_getValue('nonamegame_spionageBerichtStandartFlotteAnzahl', '20000'));
var extraKTS = parseInt(GM_getValue('nonamegame_extraKTS', '0'));
var verkleinerteBauseiten = GM_getValue('nonamegame_verkleinerteBauseiten', '');
var verkleinerteBauseitenForschung = GM_getValue('nonamegame_verkleinerteBauseitenForschung', '');
var verkleinerteBauseitenFlotte = GM_getValue('nonamegame_verkleinerteBauseitenFlotte', '');
var verkleinerteBauseitenVerteidigung = GM_getValue('nonamegame_verkleinerteBauseitenVerteidigung', '');
var spioVerteidigungsPunkte = GM_getValue('nonamegame_spioVerteidigungsPunkte', '');
var ressourcenGesamt = GM_getValue('nonamegame_ressourcenGesamt', '');
var filterAddieren = GM_getValue('nonamegame_filterAddieren', '');
var maxSchiffe = GM_getValue('nonamegame_maxSchiffe', 'anzeigen');
var handelszentrumBild = GM_getValue('nonamegame_handelszentrumBild', '');
var menueAussehenVeraendern = GM_getValue('nonamegame_menueAussehenVeraendern', '');

// Einstellungen aendern
if (document.URL.indexOf('nng_options') != -1) {
	ausgabe = '<br><br><br><br>';
	ausgabe += '<table width="95%" border="1" align="center">';

	ausgabe += '<colgroup>';
	ausgabe += '<col width="150px">';
	ausgabe += '<col width="300px">';
	ausgabe += '<col width="*">';
	ausgabe += '</colgroup>';

	ausgabe += '<tr>';
	ausgabe += '<th align="center" style="font-weight:bold;">Name</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Einstellung</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Beschreibung</th>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td colspan="3" style="color:lime;font-weight:bold;font-family:verdana;font-size:12px;">Allgemeine Einstellungen</td>';
	ausgabe += '</tr>';
	
	menueAussehenVeraendern = GM_getValue('nonamegame_menueAussehenVeraendern', '');
	ausgabe += '<tr>';
	ausgabe += '<td>Men&uuml;-Aussehen ver&auml;ndern</td>';
	ausgabe += '<td><input type="checkbox" id="menueAussehenVeraendernInput" value="aktiviert"' + (menueAussehenVeraendern!=''?' checked':'') + '> Aktivieren</td>';
	ausgabe += '<td>Das Aussehen des Men&uuml;s auf der linken Seite kann ver&auml;ndert werden.</td>';
	ausgabe += '</tr>';
	
	maxSchiffe = GM_getValue('nonamegame_maxSchiffe', 'anzeigen');
	ausgabe += '<tr>';
	ausgabe += '<td>Anzahl möglicher baubarer Schiffe</td>';
	ausgabe += '<td><input type="checkbox" id="maxSchiffeInput" value="anzeigen"' + (maxSchiffe!=''?' checked':'') + '> Anzeigen</td>';
	ausgabe += '<td>Wird in der Zentrale ganz am Ende angezeigt.<br>Gibt an, wieviele Schiffe man, mit den aktuell lagernden Ressourcen auf dem Planeten, bauen k&ouml;nnte.<br>Die Schiffart die den gr&ouml;ßten Punktezuwachs bedeuten w&uuml;rde, wird farblich hervorgehoben.</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td>Tabellen-Breite</td>';
	ausgabe += '<td><input style="width:100px;" id="tabellenBreiteInput" value="' + GM_getValue('nonamegame_tabellenBreite', '600') + '"></td>';
	ausgabe += '<td>Breite aller großen Tabellen ver&auml;ndern</td>';
	ausgabe += '</tr>';
	
	verkleinerteBauseiten = GM_getValue('nonamegame_verkleinerteBauseiten', '');
	verkleinerteBauseitenForschung = GM_getValue('nonamegame_verkleinerteBauseitenForschung', '');
	verkleinerteBauseitenFlotte = GM_getValue('nonamegame_verkleinerteBauseitenFlotte', '');
	verkleinerteBauseitenVerteidigung = GM_getValue('nonamegame_verkleinerteBauseitenVerteidigung', '');
	ausgabe += '<tr>';
	ausgabe += '<td>Verkleinerte Bauseiten</td>';
	ausgabe += '<td><input type="checkbox" id="verkleinerteBauseitenInput" value="verkleinert"' + (verkleinerteBauseiten!=''?' checked':'') + '> Geb&auml;ude-Bauseite verkleinern';
	ausgabe += '<br><input type="checkbox" id="verkleinerteBauseitenForschungInput" value="verkleinert"' + (verkleinerteBauseitenForschung!=''?' checked':'') + '> Forschung-Bauseite verkleinern';
	ausgabe += '<br><input type="checkbox" id="verkleinerteBauseitenFlotteInput" value="verkleinert"' + (verkleinerteBauseitenFlotte!=''?' checked':'') + '> Flotten-Bauseite verkleinern';
	ausgabe += '<br><input type="checkbox" id="verkleinerteBauseitenVerteidigungInput" value="verkleinert"' + (verkleinerteBauseitenVerteidigung!=''?' checked':'') + '> Verteidigungen-Bauseite verkleinern';
	ausgabe += '</td>';
	ausgabe += '<td>Entfernt unn&ouml;tige Informationen aus den Bauseiten und sortiert die Texte neu, wodurch die komplette Tabelle kleiner wird.</td>';
	ausgabe += '</tr>';
	
	ausgabe += '<tr>';
	ausgabe += '<td>Befreundete Allianzen</td>';
	ausgabe += '<td><input style="width:300px;" id="befreundeteAllianzenInput" value="' + GM_getValue('nonamegame_befreundeteAllianzen', '') + '"></td>';
	ausgabe += '<td><b>!!! Keine Leerzeichen vor und nach dem Komma !!!</b><br>Bsp.: Allianz1,Allianz2,Allianz3</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td>Befreundete Spieler</td>';
	ausgabe += '<td><input style="width:300px;" id="befreundeteSpielerInput" value="' + GM_getValue('nonamegame_befreundeteSpieler', '') + '"></td>';
	ausgabe += '<td><b>!!! Keine Leerzeichen vor und nach dem Komma !!!</b><br>Bsp.: Spieler1,Spieler2,Spieler3</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td colspan="3" style="color:lime;font-weight:bold;font-family:verdana;font-size:12px;">Spionageberichte erweitern</td>';
	ausgabe += '</tr>';

	spioVerteidigungsPunkte = GM_getValue('nonamegame_spioVerteidigungsPunkte', '');
	ausgabe += '<tr>';
	ausgabe += '<td>Flottenpunkte (Verteidigung)</td>';
	ausgabe += '<td><input type="checkbox" id="spioVerteidigungsPunkteInput" value="aktiviert"' + (spioVerteidigungsPunkte!=''?' checked':'') + '> Verteidigungspunkte anzeigen';
	ausgabe += '<td>Wenn in den Spionageberichten eine Verteidigung angezeigt wird, und diese Option aktiviert ist, dann werden auch die Flottenpunkte, welche zus&auml;tzlich durch die Verteidigung entstehen bzw. entstanden, angezeigt.</td>';
	ausgabe += '</tr>';
	
	ressourcenGesamt = GM_getValue('nonamegame_ressourcenGesamt', '');
	ausgabe += '<tr>';
	ausgabe += '<td>Ressourcen</td>';
	ausgabe += '<td><input type="checkbox" id="ressourcenGesamtInput" value="aktiviert"' + (ressourcenGesamt!=''?' checked':'') + '> Summe aller Ressourcen anzeigen';
	ausgabe += '<td>Summiert die Ressourcen aller angezeigten Spionageberichte zusammen und zeigt diese, neben der Anzahl der angezeigten Spionageberichte, an.</td>';
	ausgabe += '</tr>';
	
	filterAddieren = GM_getValue('nonamegame_filterAddieren', '');
	ausgabe += '<tr>';
	ausgabe += '<td>Filter-Einstellung</td>';
	ausgabe += '<td><input type="checkbox" id="filterAddierenInput" value="aktiviert"' + (filterAddieren!=''?' checked':'') + '> Filter addieren';
	ausgabe += '<td>Wenn diese Einstellung aktiviert ist, werden die Filter nicht mehr jeder f&uuml;r sich, sondern als ein einzelner großer Filter angewendet.</td>';
	ausgabe += '</tr>';
	
	ausgabe += '<tr>';
	ausgabe += '<td>Filter: Metall</td>';
	ausgabe += '<td><input style="width:100px;" id="spionageBerichtMetallInput" value="' + GM_getValue('nonamegame_spionageBerichtMetall', '0') + '"> (0 deaktiviert den Filter)</td>';
	ausgabe += '<td>Es werden alle Spionageberichte ausgewählt, bei denen das Metall weniger ist, als der gespeicherte Wert.</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td>Filter: Kristall</td>';
	ausgabe += '<td><input style="width:100px;" id="spionageBerichtKristallInput" value="' + GM_getValue('nonamegame_spionageBerichtKristall', '0') + '"> (0 deaktiviert den Filter)</td>';
	ausgabe += '<td>Es werden alle Spionageberichte ausgewählt, bei denen das Kristall weniger ist, als der gespeicherte Wert.</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td>Filter: Deuterium</td>';
	ausgabe += '<td><input style="width:100px;" id="spionageBerichtDeuteriumInput" value="' + GM_getValue('nonamegame_spionageBerichtDeuterium', '0') + '"> (0 deaktiviert den Filter)</td>';
	ausgabe += '<td>Es werden alle Spionageberichte ausgewählt, bei denen das Deuterium weniger ist, als der gespeicherte Wert.</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td>Filter: Kleine Transporter</td>';
	ausgabe += '<td><input style="width:100px;" id="spionageBerichtKleineTransporterInput" value="' + GM_getValue('nonamegame_spionageBerichtKleineTransporter', '0') + '"> (0 deaktiviert den Filter)</td>';
	ausgabe += '<td>Wenn die Spionageberichte um die Anzahl der erfolderlichen Kleinen Transporter, für einen 100% Angriff, erweitert werden, werden all jene Berichte automatisch ausgewählt, bei denen die Transporter Anzahl kleiner als der gespeicherte Wert ist.</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td>Filter: Recycler</td>';
	ausgabe += '<td><input style="width:100px;" id="spionageBerichtRecyclerInput" value="' + GM_getValue('nonamegame_spionageBerichtRecycler', '0') + '"> (0 deaktiviert den Filter)</td>';
	ausgabe += '<td>Wenn die Spionageberichte um die Anzahl der erfolderlichen Recycler erweitert werden, werden all jene Berichte automatisch ausgewählt, bei denen die Recycler Anzahl kleiner als der gespeicherte Wert ist.</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td>Extra Kleine Transporter</td>';
	ausgabe += '<td><input style="width:100px;" id="extraKTSInput" value="' + GM_getValue('nonamegame_extraKTS', '0') + '"></td>';
	ausgabe += '<td>Wenn man m&ouml;chte, dass nicht nur die angezeigt Anzahl an Kleine Transporter in der Flottenzentrale eingetragen wird, sondern zus&auml;tzlich mehr eingetragen haben m&ouml;chte, dann l&auml;sst sich das hier einstellen.</td>';
	ausgabe += '</tr>';
	
	standartFlotteTyp = GM_getValue('nonamegame_spionageBerichtStandartFlotteTyp', 'ship205');
	ausgabe += '<tr>';
	ausgabe += '<td>Standard-Flotte: Typ</td>';
	ausgabe += '<td>';
	ausgabe += '<input name="spio_flotte_typ" type="radio" value="ship204"' + (standartFlotteTyp=="ship204"?' checked':'') + '> Leichter J&auml;ger';
	ausgabe += '<br><input name="spio_flotte_typ" type="radio" value="ship205"' + (standartFlotteTyp=="ship205"?' checked':'') + '> Schwerer J&auml;ger';
	ausgabe += '<br><input name="spio_flotte_typ" type="radio" value="ship206"' + (standartFlotteTyp=="ship206"?' checked':'') + '> Kreuzer';
	ausgabe += '<br><input name="spio_flotte_typ" type="radio" value="ship215"' + (standartFlotteTyp=="ship215"?' checked':'') + '> Schlachtkreuzer';
	ausgabe += '<br><input name="spio_flotte_typ" type="radio" value="ship207"' + (standartFlotteTyp=="ship207"?' checked':'') + '> Schlachtschiff';
	ausgabe += '<br><input name="spio_flotte_typ" type="radio" value="ship211"' + (standartFlotteTyp=="ship211"?' checked':'') + '> Bomber';
	ausgabe += '<br><input name="spio_flotte_typ" type="radio" value="ship213"' + (standartFlotteTyp=="ship213"?' checked':'') + '> Zerst&ouml;rer';
	ausgabe += '<br><input name="spio_flotte_typ" type="radio" value="ship214"' + (standartFlotteTyp=="ship214"?' checked':'') + '> Todesstern';
	ausgabe += '</td>';
	ausgabe += '<td><b>SF steht hier für Standard-Flotte</b><br>Wenn man auf "Angreifen mit SF" klickt, wird die ausgew&auml;hlte Schiffart mit dem gespeicherten Wert bef&uuml;llt.</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td>Standard-Flotte: Anzahl</td>';
	ausgabe += '<td><input style="width:100px;" id="spionageBerichtStandartFlotteInput" value="' + GM_getValue('nonamegame_spionageBerichtStandartFlotteAnzahl', '20000') + '"></td>';
	ausgabe += '<td><b>SF steht hier für Standard-Flotte</b><br>Wenn man auf "Angreifen mit SF" klickt, wird die ausgew&auml;hlte Schiffart mit diesem gespeicherten Wert bef&uuml;llt.</td>';
	ausgabe += '</tr>';

	ausgabe += '<tr>';
	ausgabe += '<td colspan="3" align="center"><input type="button" id="speichern" value="Speichern" style="width:400px;height:30px;color:lime;font-weight:bold;font-family:verdana;font-size:12px;"></td>';
	ausgabe += '</tr>';
	ausgabe += '</table>';
	ausgabe += '</center>';
	document.getElementsByTagName('body')[0].innerHTML = ausgabe;

	var speicher_button = document.getElementById('speichern');
	speicher_button.addEventListener("click", saveEinstellungen, true);
}

function saveEinstellungen(event) {
	befreundeteAllianzen_string = document.getElementById('befreundeteAllianzenInput').value;
	befreundeteSpieler_string = document.getElementById('befreundeteSpielerInput').value;
	spionageBerichtKleineTransporter_string = document.getElementById('spionageBerichtKleineTransporterInput').value;
	spionageBerichtRecycler_string = document.getElementById('spionageBerichtRecyclerInput').value;
	tabellenBreite_string = document.getElementById('tabellenBreiteInput').value;
	spio_flotte_typ = document.getElementsByName('spio_flotte_typ');
	for (f9 = 0; f9<spio_flotte_typ.length; f9++) {
		if (spio_flotte_typ[f9].checked==true) {
			spioStandartFlotteTyp_string =spio_flotte_typ[f9].value;
		}
	}
	spioStandartFlotteAnzahl_string = document.getElementById('spionageBerichtStandartFlotteInput').value;
	spionageBerichtMetall_string = document.getElementById('spionageBerichtMetallInput').value;
	spionageBerichtKristall_string = document.getElementById('spionageBerichtKristallInput').value;
	spionageBerichtDeuterium_string = document.getElementById('spionageBerichtDeuteriumInput').value;
	extraKTS_string = document.getElementById('extraKTSInput').value;
	if (document.getElementById('verkleinerteBauseitenInput').checked==true) {
		verkleinerteBauseiten_string = document.getElementById('verkleinerteBauseitenInput').value;
	} else {
		verkleinerteBauseiten_string = '';
	}
	if (document.getElementById('verkleinerteBauseitenForschungInput').checked==true) {
		verkleinerteBauseitenForschung_string = document.getElementById('verkleinerteBauseitenForschungInput').value;
	} else {
		verkleinerteBauseitenForschung_string = '';
	}
	if (document.getElementById('verkleinerteBauseitenFlotteInput').checked==true) {
		verkleinerteBauseitenFlotte_string = document.getElementById('verkleinerteBauseitenFlotteInput').value;
	} else {
		verkleinerteBauseitenFlotte_string = '';
	}
	if (document.getElementById('verkleinerteBauseitenVerteidigungInput').checked==true) {
		verkleinerteBauseitenVerteidigung_string = document.getElementById('verkleinerteBauseitenVerteidigungInput').value;
	} else {
		verkleinerteBauseitenVerteidigung_string = '';
	}
	if (document.getElementById('spioVerteidigungsPunkteInput').checked==true) {
		spioVerteidigungsPunkte_string = document.getElementById('spioVerteidigungsPunkteInput').value;
	} else {
		spioVerteidigungsPunkte_string = '';
	}
	if (document.getElementById('ressourcenGesamtInput').checked==true) {
		ressourcenGesamt_string = document.getElementById('ressourcenGesamtInput').value;
	} else {
		ressourcenGesamt_string = '';
	}
	if (document.getElementById('filterAddierenInput').checked==true) {
		filterAddieren_string = document.getElementById('filterAddierenInput').value;
	} else {
		filterAddieren_string = '';
	}
	if (document.getElementById('maxSchiffeInput').checked==true) {
		maxSchiffe_string = document.getElementById('maxSchiffeInput').value;
	} else {
		maxSchiffe_string = '';
	}
	if (document.getElementById('menueAussehenVeraendernInput').checked==true) {
		menueAussehenVeraendern_string = document.getElementById('menueAussehenVeraendernInput').value;
	} else {
		menueAussehenVeraendern_string = '';
	}

	GM_setValue('nonamegame_befreundeteAllianzen',befreundeteAllianzen_string);
	GM_setValue('nonamegame_befreundeteSpieler',befreundeteSpieler_string);
	GM_setValue('nonamegame_spionageBerichtKleineTransporter',spionageBerichtKleineTransporter_string);
	GM_setValue('nonamegame_spionageBerichtRecycler',spionageBerichtRecycler_string);
	GM_setValue('nonamegame_tabellenBreite',tabellenBreite_string);
	GM_setValue('nonamegame_spionageBerichtStandartFlotteTyp',spioStandartFlotteTyp_string);
	GM_setValue('nonamegame_spionageBerichtStandartFlotteAnzahl',spioStandartFlotteAnzahl_string);
	GM_setValue('nonamegame_spionageBerichtMetall',spionageBerichtMetall_string);
	GM_setValue('nonamegame_spionageBerichtKristall',spionageBerichtKristall_string);
	GM_setValue('nonamegame_spionageBerichtDeuterium',spionageBerichtDeuterium_string);
	GM_setValue('nonamegame_extraKTS',extraKTS_string);
	GM_setValue('nonamegame_verkleinerteBauseiten',verkleinerteBauseiten_string);
	GM_setValue('nonamegame_verkleinerteBauseitenForschung',verkleinerteBauseitenForschung_string);
	GM_setValue('nonamegame_verkleinerteBauseitenFlotte',verkleinerteBauseitenFlotte_string);
	GM_setValue('nonamegame_verkleinerteBauseitenVerteidigung',verkleinerteBauseitenVerteidigung_string);
	GM_setValue('nonamegame_spioVerteidigungsPunkte',spioVerteidigungsPunkte_string);
	GM_setValue('nonamegame_ressourcenGesamt',ressourcenGesamt_string);
	GM_setValue('nonamegame_filterAddieren',filterAddieren_string);
	GM_setValue('nonamegame_maxSchiffe',maxSchiffe_string);
	GM_setValue('nonamegame_menueAussehenVeraendern',menueAussehenVeraendern_string);

	befreundeteAllianzen = loadBefreundeteAllianzen();
	befreundeteSpieler = loadBefreundeteSpieler();
	spionageBerichtKleineTransporter = parseInt(GM_getValue('nonamegame_spionageBerichtKleineTransporter', '0'));
	spionageBerichtRecycler = parseInt(GM_getValue('nonamegame_spionageBerichtRecycler', '0'));
	tabellenBreite = parseInt(GM_getValue('nonamegame_tabellenBreite', '600'));
	standartFlotteTyp = GM_getValue('nonamegame_spionageBerichtStandartFlotteTyp', 'ship205');
	standartFlotteAnzahl = parseInt(GM_getValue('nonamegame_spionageBerichtStandartFlotteAnzahl', '20000'));
	spionageBerichtMetall = parseInt(GM_getValue('nonamegame_spionageBerichtMetall', '0'));
	spionageBerichtKristall = parseInt(GM_getValue('nonamegame_spionageBerichtKristall', '0'));
	spionageBerichtDeuterium = parseInt(GM_getValue('nonamegame_spionageBerichtDeuterium', '0'));
	extraKTS = parseInt(GM_getValue('nonamegame_extraKTS', '0'));
	verkleinerteBauseiten = GM_getValue('nonamegame_verkleinerteBauseiten', '');
	verkleinerteBauseitenForschung = GM_getValue('nonamegame_verkleinerteBauseitenForschung', '');
	verkleinerteBauseitenFlotte = GM_getValue('nonamegame_verkleinerteBauseitenFlotte', '');
	verkleinerteBauseitenVerteidigung = GM_getValue('nonamegame_verkleinerteBauseitenVerteidigung', '');
	spioVerteidigungsPunkte = GM_getValue('nonamegame_spioVerteidigungsPunkte', '');
	ressourcenGesamt = GM_getValue('nonamegame_ressourcenGesamt', '');
	filterAddieren = GM_getValue('nonamegame_filterAddieren', '');
	maxSchiffe = GM_getValue('nonamegame_maxSchiffe', 'anzeigen');
	menueAussehenVeraendern = GM_getValue('nonamegame_menueAussehenVeraendern', '');

	location.href='overview.php';
}

function loadBefreundeteAllianzen() {
	befreundeteAllianzen_array = new Array;
	var befreundeteAllianzen_string = GM_getValue('nonamegame_befreundeteAllianzen');
	if (befreundeteAllianzen_string != null && befreundeteAllianzen_string != "") {
			befreundeteAllianzen_array = befreundeteAllianzen_string.toLowerCase().split(",");
	}
	return befreundeteAllianzen_array;
}

function loadBefreundeteSpieler() {
	befreundeteSpieler_array = new Array;
	var befreundeteSpieler_string = GM_getValue('nonamegame_befreundeteSpieler', "Eleria");
	if (befreundeteSpieler_string != null && befreundeteSpieler_string != "") {
			befreundeteSpieler_array = befreundeteSpieler_string.toLowerCase().split(",");
	}
	return befreundeteSpieler_array;
}

function parser1(string) {
	return (parseInt(string.substr(0,1))*10)+parseInt(string.substr(1,1));
}

// Frameset
if (url.indexOf('index') != -1) {
	document.getElementsByName('LeftMenu')[0].setAttribute('scrolling','auto');
}

function uhrzeit() {
	var jetzt = new Date();
	var tag = jetzt.getDate();
	var tagAnzeige = ((tag < 10) ? "0" + tag : tag);
	var monat = jetzt.getMonth()+1;
	var monatAnzeige = ((monat < 10) ? "0" + monat : monat);
	var jahr = jetzt.getFullYear();
	var stunden = jetzt.getHours();
	var stundenAnzeige = ((stunden < 10) ? "0" + stunden : stunden);
	var minuten = jetzt.getMinutes();
	var minutenAnzeige = ((minuten < 10) ? "0" + minuten : minuten);
	var sekunden = jetzt.getSeconds();
	var sekundenAnzeige = ((sekunden < 10) ? "0" + sekunden : sekunden);
	document.getElementById('uhrzeit').innerHTML = tagAnzeige + '.' + monatAnzeige + '.' + jahr + ' ' + stundenAnzeige + ':' + minutenAnzeige + ':' + sekundenAnzeige;
	window.setTimeout(uhrzeit, 999);
}

// Linkes Frame veraendern inkl. Uhrzeit
if (url.indexOf('leftmenu') != -1) {
	ausgabe = '<center><br>';
	ausgabe += '<span style="font-size:12px;" id="uhrzeit">&nbsp;</span>';
	ausgabe += '<br><br><span style="color:lime;font-weight:bold;font-family:verdana;font-size:12px;">NNG-SKRIPT</span> (v ' + version + ')';
	ausgabe += '<br><span style="font-size:9px;font-family:arial;"><a href="options.php?nng_options" target="Mainframe">NNG-EINSTELLUNGEN</a></span>';
	ausgabe += '</center><br>';
	body = document.getElementsByTagName('body')[0];
	body.innerHTML = ausgabe + body.innerHTML.replace(/<br><br>/g,'<br>');

	// Menue-Aussehen veraendern
	if (menueAussehenVeraendern != '') {
		document.getElementsByTagName('table')[0].setAttribute('width','150');
		document.getElementsByTagName('table')[0].childNodes[1].removeChild(document.getElementsByTagName('table')[0].childNodes[1].childNodes[54]);
		document.getElementsByTagName('table')[0].childNodes[1].removeChild(document.getElementsByTagName('table')[0].childNodes[1].childNodes[32]);
		document.getElementsByTagName('table')[0].childNodes[1].removeChild(document.getElementsByTagName('table')[0].childNodes[1].childNodes[0]);
		bugMelden = document.createElement('tr');
		bugMelden2 = document.createElement('td');
		bugMelden2.innerHTML = '<div align="center"><font color="#FFFFFF"><a href="bugMelden.php" target="Mainframe" style="color:red;font-weight:bold;">Bug melden</a></font></div>';
		bugMelden.appendChild(bugMelden2);
		document.getElementsByTagName('table')[0].childNodes[1].appendChild(bugMelden);
		banned = document.createElement('tr');
		banned2 = document.createElement('td');
		banned2.innerHTML = '<div align="center"><font color="gold"><a href="banned.php" target="Mainframe" style="color:gold;font-weight:bold;">Pranger</a></font></div>';
		banned.appendChild(banned2);
		document.getElementsByTagName('table')[0].childNodes[1].appendChild(banned);
	}
	
	a = document.getElementsByTagName('a');
	for (f5 = 0; f5 < a.length; f5++) {
		if (a[f5].innerHTML.indexOf('Crew') != -1) {
			a[f5].parentNode.innerHTML = a[f5].parentNode.innerHTML + ' <a href="alliance.php?mode=memberslist&sort1=3&sort2=1" target="Mainframe">(Member)</a> <a href="alliance.php?mode=circular" target="Mainframe">(RM)</a>';
		}
		if (menueAussehenVeraendern != '' && (a[f5].innerHTML.indexOf('Kontakt') != -1 || a[f5].innerHTML.indexOf('AGB') != -1 || a[f5].innerHTML.indexOf('Impressum') != -1 || a[f5].innerHTML.indexOf('Logout') != -1)) {
			a[f5].setAttribute('style','color:gold;');
		}
		if (menueAussehenVeraendern != '' && a[f5].innerHTML.indexOf('Premium') != -1) {
			a[f5].setAttribute('style','color:lime;');
		}
	}
	uhrzeit();
}

// Zeit auf der zweiten Seite in der Flottenzentrale
if (url.indexOf('floten1') != -1) {
	tr = document.getElementsByTagName('tr');
	for (i = 0; i < tr.length; i++) {
		if (tr[i].innerHTML.indexOf('Dauer (ein Weg)') != -1) tr_dauer = tr[i];
	}
	dauer = document.getElementById('duration').innerHTML;
	tr_dauer = document.getElementById('duration').parentNode.parentNode;
	tr_ankunft_ziel = document.createElement('tr');
	tr_ankunft_home = document.createElement('tr');
	tr_dauer.parentNode.insertBefore(tr_ankunft_home,tr_dauer.nextSibling);
	tr_dauer.parentNode.insertBefore(tr_ankunft_ziel,tr_dauer.nextSibling);
	tr_ankunft_ziel.setAttribute('height',"20");
	tr_ankunft_home.setAttribute('height',"20");
	tr_ankunft_ziel.innerHTML = '<th>Ankunft am Ziel</th><th><div id="ankunft">-</div></th>';
	tr_ankunft_home.innerHTML = '<th>R&uuml;ckkehr zum Start</th><th><div id="rueckkehr">-</div></th>';
	ankunft();
}

// Zeit auf der dritten Seite in der Flottenzentrale
if (url.indexOf('floten2') != -1) {
	tr = document.getElementsByTagName('tr');
	for (i = 0; i < tr.length; i++) {
		if (tr[i].innerHTML.indexOf('Keine Rohstoffe') != -1) tr_rohstoffe = tr[i];
	}

	tr_neu0 = document.createElement('tr');
	tr_rohstoffe.parentNode.insertBefore(tr_neu0,tr_rohstoffe);
	tr_neu0.innerHTML = '<th colspan="3">&nbsp;</th>';
	tr_neu1 = document.createElement('tr');
	tr_rohstoffe.parentNode.insertBefore(tr_neu1,tr_rohstoffe);
	tr_neu1.innerHTML = '<th colspan="2">Dauer (ein Weg)</th><th id="duration">&nbsp;</th>';
	tr_neu2 = document.createElement('tr');
	tr_rohstoffe.parentNode.insertBefore(tr_neu2,tr_rohstoffe);
	tr_neu2.innerHTML = '<th colspan="2">Ankunft am Ziel</th><th><div id="ankunft">-</div></th>';
	tr_neu3 = document.createElement('tr');
	tr_rohstoffe.parentNode.insertBefore(tr_neu3,tr_rohstoffe);
	tr_neu3.innerHTML = '<th colspan="2">R&uuml;ckkehr zum Start</th><th><div id="rueckkehr">-</div></th>';
	tr_neu4 = document.createElement('tr');
	tr_rohstoffe.parentNode.insertBefore(tr_neu4,tr_rohstoffe);
	tr_neu4.innerHTML = '<th colspan="3">&nbsp;</th>';

	th = document.getElementsByTagName('th');
	for (i = 0; i < th.length; i++) {
		if (th[i].innerHTML.indexOf('submit') != -1) th_submit = th[i];
	}
	th_submit.setAttribute("colspan","3");

	var distance=document.getElementsByName("dist")[0].value;
	var slowestShipSpeed=document.getElementsByName("speedallsmin")[0].value;
	var flytime=Math.floor(((35000/(document.getElementsByName("speed")[0].value/10)) * Math.sqrt(distance*10/slowestShipSpeed)) / document.getElementsByName("speedfactor")[0].value);
	var sekunden = flytime;
	var umrechnung = {'Tage':86400,'Stunden':3600,'Minuten': 60,'Sekunden': 1}       
	var Zeit='';
	for(var k in umrechnung) {
		teiler = Math.floor(sekunden / umrechnung[k]);                   
		if (teiler<10) {
			teiler="0"+teiler;
		}
		sekunden = sekunden%umrechnung[k];                                   
		if (teiler!=0) {
			if (k == 'Tage') {
				Zeit+=teiler+':';
			}
			if (k == 'Stunden') {
				Zeit+=teiler+':';
			}
			if (k == 'Minuten') {
				Zeit+=teiler+':';
			}
			if (k == 'Sekunden') {
				Zeit+=teiler;
			}
		}
	}
	document.getElementById("duration").innerHTML=Zeit;

	ankunft();
}

function ankunft() {
	dauer = document.getElementById('duration').innerHTML;
	error = '';
	if (dauer.length == 11) {
		pattern = /([0-9]+):([0-9]+):([0-9]+):([0-9]+)/;
	} else if (dauer.length == 8) {
		pattern = /([0-9]+):([0-9]+):([0-9]+)/;
	} else if (dauer.length == 6) {
		pattern = /([0-9]+):([0-9]+):/;
		error = 'hm';
	} else if (dauer.length == 5) {
		pattern = /([0-9]+):([0-9]+)/;
	} else {
		pattern = null;
	}
	millsek = 0;
	if (pattern != null) {
		erg = pattern.exec(dauer);
		if (erg.length == 5) millsek = (parser1(erg[1])*24*60*60) + (parser1(erg[2])*60*60) + (parser1(erg[3])*60) + parser1(erg[4]);
		if (erg.length == 4) millsek = (parser1(erg[1])*60*60) + (parser1(erg[2])*60) + parser1(erg[3]);
		if (erg.length == 3 && error == '') millsek = (parser1(erg[1])*60) + parser1(erg[2]);
		if (erg.length == 3 && error == 'hm') millsek = (parser1(erg[1])*60*60) + (parser1(erg[2])*60);
	} else {
		if (dauer.length == 2) millsek = parser1(dauer);
		if (dauer.length == 3) millsek = parser1(dauer.substr(0,2))*60;
	}
	millsek = millsek * 1000;

	if (millsek == 0) {
		document.getElementById('ankunft').innerHTML = '-';
		document.getElementById('rueckkehr').innerHTML = '-';
	} else {
		var Zeit = new Date();
		var AbsolutJetzt = Zeit.getTime();
		var AbsolutDann = AbsolutJetzt + (millsek);
		Zeit.setTime(AbsolutDann);
		var dd = Zeit.getDate();
		var ddAnzeige = ((dd < 10) ? "0" + dd : dd);
		var mm = Zeit.getMonth()+1;
		var mmAnzeige = ((mm < 10) ? "0" + mm : mm);
		var jj = Zeit.getFullYear();
		var hh = Zeit.getHours();
		var hhAnzeige = ((hh < 10) ? "0" + hh : hh);
		var m = Zeit.getMinutes();
		var mAnzeige = ((m < 10) ? "0" + m : m);
		var ss = Zeit.getSeconds();
		var ssAnzeige = ((ss < 10) ? "0" + ss : ss);
		document.getElementById('ankunft').innerHTML = ddAnzeige + '.' + mmAnzeige + '.' + jj + ' ' + hhAnzeige + ':' + mAnzeige + ':' + ssAnzeige;
		
		var Zeit = new Date();
		var AbsolutJetzt = Zeit.getTime();
		var AbsolutDann = AbsolutJetzt + (millsek*2);
		Zeit.setTime(AbsolutDann);
		var dd = Zeit.getDate();
		var ddAnzeige = ((dd < 10) ? "0" + dd : dd);
		var mm = Zeit.getMonth()+1;
		var mmAnzeige = ((mm < 10) ? "0" + mm : mm);
		var jj = Zeit.getFullYear();
		var hh = Zeit.getHours();
		var hhAnzeige = ((hh < 10) ? "0" + hh : hh);
		var m = Zeit.getMinutes();
		var mAnzeige = ((m < 10) ? "0" + m : m);
		var ss = Zeit.getSeconds();
		var ssAnzeige = ((ss < 10) ? "0" + ss : ss);
		document.getElementById('rueckkehr').innerHTML = ddAnzeige + '.' + mmAnzeige + '.' + jj + ' ' + hhAnzeige + ':' + mAnzeige + ':' + ssAnzeige;
	}
	window.setTimeout(ankunft, 999);
}

// Formatiert Zahlen (Zahl die formatiert werden soll; evtl. Anzahl Nachkommastellen; Fixe Nachkommastellen ... true/false)
function formatZahl(zahl) {
	zahl = '' + zahl;
	neu = '';
	i = zahl.length
	do {
		if (i - 3 > 0) {
			neu = '.' + zahl.substring(i - 3, i) + neu;
		} else {
			neu = zahl.substring(0,i) + neu;
		}
		i = i - 3;
	} while (i > 0);
	return neu;
}

// Flotten vorab ausfuellen (Kleiner Transporter)
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1 && document.URL.indexOf('ship202')!=-1 && document.getElementsByName('ship202')[0]!=null) {
	ausdruck = /ship202=([0-9]+)/;
	ergebnis = ausdruck.exec(document.URL);
	ergebnis2 = document.getElementsByName('maxship202')[0].value;
	if (parseInt(ergebnis[1])>parseInt(ergebnis2)) {
		document.getElementsByName('ship202')[0].value = ergebnis2;
	} else {
		document.getElementsByName('ship202')[0].value = ergebnis[1];
	}
}

// Flotten vorab ausfuellen (Grosser Transporter)
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1 && document.URL.indexOf('ship204')!=-1 && document.getElementsByName('ship204')[0]!=null) {
	ausdruck = /ship204=([0-9]+)/;
	ergebnis = ausdruck.exec(document.URL);
	ergebnis2 = document.getElementsByName('maxship204')[0].value;
	if (parseInt(ergebnis[1])>parseInt(ergebnis2)) {
		document.getElementsByName('ship204')[0].value = ergebnis2;
	} else {
		document.getElementsByName('ship204')[0].value = ergebnis[1];
	}
}

// Flotten vorab ausfuellen
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1 && document.URL.indexOf('ship205')!=-1 && document.getElementsByName('ship205')[0]!=null) {
	ausdruck = /ship205=([0-9]+)/;
	ergebnis = ausdruck.exec(document.URL);
	ergebnis2 = document.getElementsByName('maxship205')[0].value;
	if (parseInt(ergebnis[1])>parseInt(ergebnis2)) {
		document.getElementsByName('ship205')[0].value = ergebnis2;
	} else {
		document.getElementsByName('ship205')[0].value = ergebnis[1];
	}
}

// Flotten vorab ausfuellen
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1 && document.URL.indexOf('ship206')!=-1 && document.getElementsByName('ship206')[0]!=null) {
	ausdruck = /ship206=([0-9]+)/;
	ergebnis = ausdruck.exec(document.URL);
	ergebnis2 = document.getElementsByName('maxship206')[0].value;
	if (parseInt(ergebnis[1])>parseInt(ergebnis2)) {
		document.getElementsByName('ship206')[0].value = ergebnis2;
	} else {
		document.getElementsByName('ship206')[0].value = ergebnis[1];
	}
}
// Flotten vorab ausfuellen (Schlachtschiff)
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1 && document.URL.indexOf('ship207')!=-1 && document.getElementsByName('ship207')[0]!=null) {
	ausdruck = /ship207=([0-9]+)/;
	ergebnis = ausdruck.exec(document.URL);
	ergebnis2 = document.getElementsByName('maxship207')[0].value;
	if (parseInt(ergebnis[1])>parseInt(ergebnis2)) {
		document.getElementsByName('ship207')[0].value = ergebnis2;
	} else {
		document.getElementsByName('ship207')[0].value = ergebnis[1];
	}
}
// Flotten vorab ausfuellen
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1 && document.URL.indexOf('ship211')!=-1 && document.getElementsByName('ship211')[0]!=null) {
	ausdruck = /ship211=([0-9]+)/;
	ergebnis = ausdruck.exec(document.URL);
	ergebnis2 = document.getElementsByName('maxship211')[0].value;
	if (parseInt(ergebnis[1])>parseInt(ergebnis2)) {
		document.getElementsByName('ship211')[0].value = ergebnis2;
	} else {
		document.getElementsByName('ship211')[0].value = ergebnis[1];
	}
}
// Flotten vorab ausfuellen
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1 && document.URL.indexOf('ship213')!=-1 && document.getElementsByName('ship213')[0]!=null) {
	ausdruck = /ship213([0-9]+)/;
	ergebnis = ausdruck.exec(document.URL);
	ergebnis2 = document.getElementsByName('maxship213')[0].value;
	if (parseInt(ergebnis[1])>parseInt(ergebnis2)) {
		document.getElementsByName('ship213')[0].value = ergebnis2;
	} else {
		document.getElementsByName('ship213')[0].value = ergebnis[1];
	}
}
// Flotten vorab ausfuellen
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1 && document.URL.indexOf('ship214')!=-1 && document.getElementsByName('ship214')[0]!=null) {
	ausdruck = /ship214=([0-9]+)/;
	ergebnis = ausdruck.exec(document.URL);
	ergebnis2 = document.getElementsByName('maxship214')[0].value;
	if (parseInt(ergebnis[1])>parseInt(ergebnis2)) {
		document.getElementsByName('ship214')[0].value = ergebnis2;
	} else {
		document.getElementsByName('ship214')[0].value = ergebnis[1];
	}
}
// Flotten vorab ausfuellen
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1 && document.URL.indexOf('ship215')!=-1 && document.getElementsByName('ship215')[0]!=null) {
	ausdruck = /ship215=([0-9]+)/;
	ergebnis = ausdruck.exec(document.URL);
	ergebnis2 = document.getElementsByName('maxship215')[0].value;
	if (parseInt(ergebnis[1])>parseInt(ergebnis2)) {
		document.getElementsByName('ship215')[0].value = ergebnis2;
	} else {
		document.getElementsByName('ship215')[0].value = ergebnis[1];
	}
}

// Mit der Taste "Enter" und "A" kommt man einfach weiter
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1) {
	function Tastendruck (Ereignis) {
		// "Enter" druecken um das Formular abzuschicken
		if (Ereignis.keyCode == 13) {
			document.forms[0].submit();
		}
		if (Ereignis.which == 97) {
			document.forms[0].submit();
		}
		// Durch druecken der Taste "h" halbiert sich die eingetragene Anzahl an Kleinen Transporter
		if (Ereignis.which == 104 && document.getElementsByName('ship202')[0].value!=null && document.getElementsByName('ship202')[0].value!='') {
			document.getElementsByName('ship202')[0].value = Math.ceil(parseInt(document.getElementsByName('ship202')[0].value)/2);
		}
	}
	unsafeWindow.addEventListener("keypress",Tastendruck,false);
}

// Aendert die Flottenzentrale (das Formular wird immer oben angezeigt)
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1) {
	var hauptbereich = document.getElementsByTagName('center')[2];
	var anzahl_flotten_minus = 4;
	
	if (hauptbereich.innerHTML.indexOf('Maximale Flottenanzahl erreicht!') != -1) {
		max_flotten_verschickt = true;
		anzahl_flotten_minus = 5;
	}
	
	aktuell_verschickte_flotten = hauptbereich.childNodes[5].childNodes[1].childNodes[1].childNodes.length - anzahl_flotten_minus;
	flotten_text_knoten = hauptbereich.childNodes[5].childNodes[1].childNodes[1].childNodes[0].childNodes[1];
	flotten_text = flotten_text_knoten.innerHTML;
	ausdruck = /max\. ([0-9]+)/;
	ergebnis = ausdruck.exec(flotten_text);	
	maximale_flotten = parseInt(ergebnis[1]);
	neuer_flotten_text = 'Flotten (' + aktuell_verschickte_flotten + ' von ' + maximale_flotten + ')';
	flotten_text_knoten.innerHTML = neuer_flotten_text;
	hauptbereich.insertBefore(hauptbereich.childNodes[7],hauptbereich.childNodes[5]);
}

// Spionageberichte nachbearbeiten
// Die Ressourcen werden ausgelesen und die Anzahl der benoetigten Kleinen Transporter für den Angriff werden angezeigt (auf 1,000 aufgerundet)
// Die Recycler-Anzahl fuer eine evtl. vorhandene Flotte wird ebenfalls berechnet
if (url.indexOf('messages') != -1 && document.URL.indexOf('mode=write')==-1) {
	tabellen = document.getElementsByTagName('table');
	f4 = 0;
	spiobericht_count = 0;
	metall_gesamt = 0;
	kristall_gesamt = 0;
	deuterium_gesamt = 0;
	for (f3 = 0; f3 < tabellen.length; f3++) {
		tabelle = tabellen[f3];
		if (tabelle.innerHTML.indexOf('colspan') != -1 && tabelle.innerHTML.indexOf('Rohstoffe') != -1 && tabelle.innerHTML.indexOf('auf') != -1) {
			if (f4 < 3) {
				f4++;
			} else {
				spio_href = tabelle.childNodes[0].childNodes[0].childNodes[0].childNodes[1].href;
				spio_target = tabelle.childNodes[0].childNodes[0].childNodes[0].childNodes[1].target;
				spio_link_text = tabelle.childNodes[0].childNodes[0].childNodes[0].childNodes[1].innerHTML;
				spiobericht_count++;
				ausdruck = /<td>Metall:<\/td><td>(\-*[0-9.]+)<\/td>.*<td>Kristall:<\/td><td>(\-*[0-9.]+)<\/td>.*<td>Deuterium:<\/td><td>(\-*[0-9.]+)<\/td>/;
				ergebnis = ausdruck.exec(tabelle.innerHTML);
				met_spio = parseInt(ergebnis[1].replace(/\./g,''));
				kris_spio = parseInt(ergebnis[2].replace(/\./g,''));
				deut_spio = parseInt(ergebnis[3].replace(/\./g,''));
				
				metall_gesamt += met_spio;
				kristall_gesamt += kris_spio;
				deuterium_gesamt += deut_spio;

				if (met_spio>kris_spio && met_spio>deut_spio) tabelle.firstChild.childNodes[1].childNodes[1].setAttribute('style',"color:orange;");
				if (kris_spio>met_spio && kris_spio>deut_spio) tabelle.firstChild.childNodes[1].childNodes[3].setAttribute('style',"color:orange;");
				if (deut_spio>met_spio && deut_spio>kris_spio) tabelle.firstChild.childNodes[3].childNodes[1].setAttribute('style',"color:orange;");

				if (met_spio >= kris_spio && met_spio >= deut_spio) kts = Math.ceil(met_spio/5000000) * 1000;
				if (kris_spio >= met_spio && kris_spio >= deut_spio) kts = Math.ceil(kris_spio/5000000) * 1000;
				if (deut_spio >= met_spio && deut_spio >= kris_spio) kts = Math.ceil(deut_spio/5000000) * 1000;
				tabelle.innerHTML = tabelle.innerHTML + '<tr><td style="vertical-align:middle;font-weight:bold;color:lime;font-size:12px;" align="center" colspan="4" height="40">Kleiner Transporter: ' + formatZahl(kts) + '<br><a href="' + spio_href + '&ship202=' + (kts + extraKTS) + '&' + standartFlotteTyp + '=1" target="' + spio_target + '" style="font-size:11px;font-variant:small-caps;">(Angreifen ohne SF)</a> <a href="' + spio_href + '&ship202=' + (kts + extraKTS) + '&' + standartFlotteTyp + '=' + standartFlotteAnzahl + '" target="' + spio_target + '" style="font-size:11px;font-variant:small-caps;">(Angreifen mit SF)</a></td></tr>';

				tf_prozent = 55;
				
				flotten = null; verteidigung = null;
				for (spt = 1; spt < tabelle.parentNode.childNodes.length-1; spt++) {
					if (tabelle.parentNode.childNodes[spt].childNodes[0].childNodes[0].childNodes[0].innerHTML == 'Flotte') {
						flotten = tabelle.parentNode.childNodes[spt];
					}
					if (tabelle.parentNode.childNodes[spt].childNodes[0].childNodes[0].childNodes[0].innerHTML == 'Verteidigung') {
						verteidigung = tabelle.parentNode.childNodes[spt];
					}
				}
				
				fleet_met = 0; fleet_kris = 0;
				flottenPunkte = 0;
				verteidigungPunkte = 0;
				sim_link = '';
				anzahl_recs = 0;
if (flotten != null) {				
				if (flotten.innerHTML.indexOf(bomber_name) != -1) {
					ausdruck = /<td>Bomber<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * bomber_met; fleet_kris += anzahl * bomber_kris;
					flottenPunkte += Math.floor((anzahl * (bomber_met + bomber_kris + bomber_deut))/1000);
				}
				if (flotten.innerHTML.indexOf(zerri_name) != -1) {
					ausdruck = /<td>Zerstörer<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * zerri_met; fleet_kris += anzahl * zerri_kris;
					flottenPunkte += Math.floor((anzahl * (zerri_met + zerri_kris + zerri_deut))/1000);
				}
				if (flotten.innerHTML.indexOf(rip_name) != -1) {
					ausdruck = /<td>Todesstern<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * rip_met; fleet_kris += anzahl * rip_kris;
					flottenPunkte += Math.floor((anzahl * (rip_met + rip_kris + rip_deut))/1000);
				}
				if (flotten.innerHTML.indexOf(xer_name) != -1) {
					ausdruck = /<td>Kreuzer<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * xer_met; fleet_kris += anzahl * xer_kris;
					flottenPunkte += Math.floor((anzahl * (xer_met + xer_kris + xer_deut))/1000);
				}
				if (flotten.innerHTML.indexOf(ss_name) != -1) {
					ausdruck = /<td>Schlachtschiff<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * ss_met; fleet_kris += anzahl * ss_kris;
					flottenPunkte += Math.floor((anzahl * (ss_met + ss_kris + ss_deut))/1000);
				}
				if (flotten.innerHTML.indexOf(sxer_name) != -1) {
					ausdruck = /<td>Schlachtkreuzer<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * sxer_met; fleet_kris += anzahl * sxer_kris;
					flottenPunkte += Math.floor((anzahl * (sxer_met + sxer_kris + sxer_deut))/1000);
				}
				if (flotten.innerHTML.indexOf(sats_name) != -1) {
					ausdruck = /<td>Solarsatellit<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * sats_met; fleet_kris += anzahl * sats_kris;
					flottenPunkte += Math.floor((anzahl * (sats_kris + sats_deut))/1000);
				}
				if (flotten.innerHTML.indexOf(kts_name) != -1) {
					ausdruck = /<td>Kleiner Transporter<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * kts_met; fleet_kris += anzahl * kts_kris;
					flottenPunkte += Math.floor((anzahl * (kts_met + kts_kris))/1000);
				}
				if (flotten.innerHTML.indexOf(spio_name) != -1) {
					ausdruck = /<td>Spionagesonde<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * spio_met; fleet_kris += anzahl * spio_kris;
					flottenPunkte += Math.floor((anzahl * spio_kris)/1000);
				}
				if (flotten.innerHTML.indexOf(gts_name) != -1) {
					ausdruck = /<td>Großer Transporter<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * gts_met; fleet_kris += anzahl * gts_kris;
					flottenPunkte += Math.floor((anzahl * (gts_met + gts_kris))/1000);
				}
				if (flotten.innerHTML.indexOf(kolo_name) != -1) {
					ausdruck = /<td>Kolonieschiff<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * kolo_met; fleet_kris += anzahl * kolo_kris;
					flottenPunkte += Math.floor((anzahl * (kolo_met + kolo_kris + kolo_deut))/1000);
				}
				if (flotten.innerHTML.indexOf(rec_name) != -1) {
					ausdruck = /<td>Recycler<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * rec_met; fleet_kris += anzahl * rec_kris;
					flottenPunkte += Math.floor((anzahl * (rec_met + rec_kris + rec_deut))/1000);
				}
				if (flotten.innerHTML.indexOf(lj_name) != -1) {
					ausdruck = /<td>Leichter Jäger<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * lj_met; fleet_kris += anzahl * lj_kris;
					flottenPunkte += Math.floor((anzahl * (lj_met + lj_kris))/1000);
				}
				if (flotten.innerHTML.indexOf(sj_name) != -1) {
					ausdruck = /<td>Schwerer Jäger<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(flotten.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					fleet_met += anzahl * sj_met; fleet_kris += anzahl * sj_kris;
					flottenPunkte += Math.floor((anzahl * (sj_met + sj_kris))/1000);
				}

				tf_met = Math.ceil(fleet_met / 100 * tf_prozent); tf_kris = Math.ceil(fleet_kris / 100 * tf_prozent);
				anzahl_recs = Math.ceil((tf_met + tf_kris) / 25000);
				
				if (anzahl_recs>0) {
					ausgabe = '<tr><td align="center" colspan="6" height="60" style="vertical-align:middle;">';
					ausgabe += '<table border="0">';
					ausgabe += '<tr>';
					ausgabe += '<td colspan="2" align="center" style="color:lime;font-size:12px;font-weight:bold;">Recycler: ' + formatZahl(anzahl_recs) + '</td>';
					ausgabe += '</tr>';
					ausgabe += '<tr>';
					ausgabe += '<td style="color:rgb(242, 204, 74);font-size:10px;font-weight:normal;">Metall:</td>';
					ausgabe += '<td style="color:rgb(242, 204, 74);font-size:10px;font-weight:normal;text-align:right;">' + formatZahl(tf_met) + '</td>';
					ausgabe += '</tr>';
					ausgabe += '<tr>';
					ausgabe += '<td style="color:rgb(242, 204, 74);font-size:10px;font-weight:normal;">Kristall:</td>';
					ausgabe += '<td style="color:rgb(242, 204, 74);font-size:10px;font-weight:normal;text-align:right;">' + formatZahl(tf_kris) + '</td>';
					ausgabe += '</tr>';
					ausgabe += '<tr>';
					ausgabe += '<td colspan="2" align="center" style="color:rgb(242, 204, 74);font-size:10px;font-weight:bold;text-align:right;">Flottenpunkte:&nbsp;&nbsp;&nbsp;' + formatZahl(flottenPunkte) + '</td>';
					ausgabe += '</tr>';
					ausgabe += '</table>';
					ausgabe += '</td></tr>';
					flotten.childNodes[0].innerHTML = flotten.childNodes[0].innerHTML + ausgabe;
				}
}
if (verteidigung != null && spioVerteidigungsPunkte != '') {
				if (verteidigung.innerHTML.indexOf("Raketenwerfer") != -1) {
					ausdruck = /<td>Raketenwerfer<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * 1600)/1000);
				}
				if (verteidigung.innerHTML.indexOf("Leichtes Lasergeschütz") != -1) {
					ausdruck = /<td>Leichtes Lasergeschütz<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * (4800 + 1400))/1000);
				}
				if (verteidigung.innerHTML.indexOf("Schweres Lasergeschütz") != -1) {
					ausdruck = /<td>Schweres Lasergeschütz<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * (12000 + 3400))/1000);
				}
				if (verteidigung.innerHTML.indexOf("Gaußkanone") != -1) {
					ausdruck = /<td>Gaußkanone<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * (32000 + 9000))/1000);
				}
				if (verteidigung.innerHTML.indexOf("Ionengeschütz") != -1) {
					ausdruck = /<td>Ionengeschütz<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * (12000 + 32000))/1000);
				}
				if (verteidigung.innerHTML.indexOf("Plasmawerfer") != -1) {
					ausdruck = /<td>Plasmawerfer<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * (56000 + 13000))/1000);
				}
				if (verteidigung.innerHTML.indexOf("Kleine Schildkuppel") != -1) {
					ausdruck = /<td>Kleine Schildkuppel<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * (7500000 + 7500000 + 5000000))/1000);
				}
				if (verteidigung.innerHTML.indexOf("Große Schildkuppel") != -1) {
					ausdruck = /<td>Große Schildkuppel<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * (30000000 + 30000000 + 20000000))/1000);
				}
				if (verteidigung.innerHTML.indexOf("Abfangrakete") != -1) {
					ausdruck = /<td>Abfangrakete<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * (8000 + 2000))/1000);
				}
				if (verteidigung.innerHTML.indexOf("Interplanetarrakete") != -1) {
					ausdruck = /<td>Interplanetarrakete<\/td>\s*<td>([0-9.]+)<\/td>/; ergebnis = ausdruck.exec(verteidigung.innerHTML); anzahl = parseInt(ergebnis[1].replace(/\./g,''));
					verteidigungPunkte += Math.floor((anzahl * (12500 + 2500 + 10000))/1000);
				}
				
				ausgabe = '<tr><td align="center" colspan="6" height="48" style="vertical-align:middle;">';
				ausgabe += '<table border="0">';
				if (flotten != null && flottenPunkte > 0) {
					ausgabe += '<tr>';
					ausgabe += '<td style="color:rgb(242, 204, 74);font-size:10px;font-weight:normal;">Flottenpunkte:</td>';
					ausgabe += '<td style="color:rgb(242, 204, 74);font-size:10px;font-weight:normal;text-align:right;">' + formatZahl(flottenPunkte) + '</td>';
					ausgabe += '</tr>';
				}
				ausgabe += '<tr>';
				if (flotten != null && flottenPunkte > 0) {
					ausgabe += '<td style="color:rgb(242, 204, 74);font-size:10px;font-weight:bold;">Verteidigungspunkte:&nbsp;&nbsp;&nbsp;</td>';
				} else {
					ausgabe += '<td style="color:rgb(242, 204, 74);font-size:10px;font-weight:bold;">Flottenpunkte:&nbsp;&nbsp;&nbsp;</td>';
				}
				ausgabe += '<td style="color:rgb(242, 204, 74);font-size:10px;font-weight:bold;text-align:right;">' + formatZahl(verteidigungPunkte) + '</td>';
				ausgabe += '</tr>';
				if (flotten != null && flottenPunkte > 0) {
					ausgabe += '<tr>';
					ausgabe += '<td style="color:lime;font-size:10px;font-weight:bold;">Flottenpunkte gesamt:&nbsp;&nbsp;&nbsp;</td>';
					ausgabe += '<td style="color:lime;font-size:10px;font-weight:bold;text-align:right;">' + formatZahl(flottenPunkte + verteidigungPunkte) + '</td>';
					ausgabe += '</tr>';
				}
				ausgabe += '</table>';
				ausgabe += '</td></tr>';
				verteidigung.childNodes[0].innerHTML = verteidigung.childNodes[0].innerHTML + ausgabe;
}
				
				// checkbox der Spionageberichte
				checkbox = tabelle.parentNode.parentNode.previousSibling.firstChild.firstChild;
				//Auswahl der Spionageberichte (checkbox auf checked setzen)
				check_flag = true;
				if (filterAddieren != '') {
					if (kts>=spionageBerichtKleineTransporter
						&& anzahl_recs>=spionageBerichtRecycler
						&& met_spio>=spionageBerichtMetall
						&& kris_spio>=spionageBerichtKristall
						&& deut_spio>=spionageBerichtDeuterium) check_flag = false;
				} else {
					if (kts>=spionageBerichtKleineTransporter && spionageBerichtKleineTransporter!=0) check_flag = false;
					if (anzahl_recs>=spionageBerichtRecycler && spionageBerichtRecycler!=0) check_flag = false;
					if (met_spio>=spionageBerichtMetall && spionageBerichtMetall!=0) check_flag = false;
					if (kris_spio>=spionageBerichtKristall && spionageBerichtKristall!=0) check_flag = false;
					if (deut_spio>=spionageBerichtDeuterium && spionageBerichtDeuterium!=0) check_flag = false;
				}
				if(spionageBerichtKleineTransporter == 0 && spionageBerichtRecycler == 0 && spionageBerichtMetall == 0 && spionageBerichtKristall == 0 && spionageBerichtDeuterium == 0) {
					check_flag = false;
				}
				if (met_spio<0 || kris_spio<0 || deut_spio<0) check_flag = true;
				if (check_flag) {
					checkbox.checked = true;
				}
			}
		}
	}
	// Workaround fuer Premium und Nicht-Premium, sodass alle Tastenfunktionen im Posteingang funktionieren
	if (tabellen[4].childNodes[1].childNodes[6] != null) {
		t1 = tabellen[4].childNodes[1].childNodes[6];
	} else {
		t1 = tabellen[4].childNodes[1].childNodes[0];
	}
	t2 = document.createElement("tr");
	t1.parentNode.insertBefore(t2,t1);
	t2.innerHTML = '<td colspan="4"><span style="color:lime;font-weight:bold;font-family:verdana;font-size:12px;">Anzahl der Spionageberichte: ' + spiobericht_count + '</span></td>';
	
	
	t3 = document.createElement("tr");
	if (ressourcenGesamt != '') {
		t1.parentNode.insertBefore(t3,t1);
		t3.innerHTML = '<td colspan="4"><span style="color:lime;font-weight:bold;font-family:verdana;font-size:10px;">Summe Ressourcen: ' + formatZahl(metall_gesamt) + ' Metall, ' + formatZahl(kristall_gesamt) + ' Kristall und ' + formatZahl(deuterium_gesamt) + ' Deuterium</span></td>';
	}
	
	
	
	function Tastendruck (Ereignis) {
		if (!Ereignis) Ereignis = window.event;
		// Taste "l" markiert Kampfberichte und Flottenmeldungen rueckkehrender Flotten vom Angriff und doppelte Spionageberichte (ausser den Ersten)
		if (Ereignis.which == 108) {
			trs = document.getElementsByTagName('tr');
			koords = '';
			for (f10 = 0; f10 < trs.length; f10++) {
				try {
					if (trs[f10+1].innerHTML.indexOf('Nochmal spionieren') != -1 && trs[f10].innerHTML.indexOf('checkbox') != -1 && trs[f10].innerHTML.indexOf('Eventhandler') != -1 && trs[f10].innerHTML.indexOf('Spionagebericht') != -1 && trs[f10].innerHTML.indexOf('table') == -1) {
						trs[f10].childNodes[0].firstChild.checked = true;
					}
				} catch (e) {}
				try {
					if (trs[f10].innerHTML.indexOf('checkbox') != -1 && trs[f10].innerHTML.indexOf('Eventhandler') != -1 && trs[f10].innerHTML.indexOf('Angriff') != -1 && trs[f10].innerHTML.indexOf('table') == -1
					|| trs[f10].innerHTML.indexOf('checkbox') != -1 && trs[f10].innerHTML.indexOf('Eventhandler') != -1 && trs[f10].innerHTML.indexOf('Kampfbericht') != -1 && trs[f10].innerHTML.indexOf('table') == -1) {
						trs[f10].childNodes[0].firstChild.checked = true;
					}
				} catch (e) {}
				try {
					if (trs[f10+1].innerHTML.indexOf('Rohstoffe auf') != -1 && trs[f10+1].innerHTML.indexOf('[') != -1 && trs[f10+1].innerHTML.indexOf(']') != -1 && trs[f10].innerHTML.indexOf('checkbox') != -1 && trs[f10].innerHTML.indexOf('Eventhandler') != -1 && trs[f10].innerHTML.indexOf('Spionagebericht') != -1 && trs[f10].innerHTML.indexOf('table') == -1) {
						koord = trs[f10+1].childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes[1].innerHTML;
						if (koords.indexOf(koord) != -1) {
							trs[f10].childNodes[0].firstChild.checked = true;
						} else {
							koords += koord;
						}
					}
				} catch (e) {}
			}
			document.forms[0].submit();
		}
		// Taste "t" erstellt Att-Liste
		if (Ereignis.which == 116) {
			tabellen = document.getElementsByTagName('table');
			f13 = 0;
			spiobericht_count = 0;
			attTabs = '';
			for (f12 = 0; f12 < tabellen.length; f12++) {
				tabelle = tabellen[f12];
				if (tabelle.innerHTML.indexOf('colspan') != -1 && tabelle.innerHTML.indexOf('Rohstoffe') != -1 && tabelle.innerHTML.indexOf('auf') != -1) {
					if (f13 < 3) {
						f13++;
					} else {
						ausdruck = /<td>Metall:<\/td><td.*>(\-*[0-9.]+)<\/td>.*<td>Kristall:<\/td><td.*>(\-*[0-9.]+)<\/td>.*<td>Deuterium:<\/td><td.*>(\-*[0-9.]+)<\/td>/;
						ergebnis = ausdruck.exec(tabelle.innerHTML);
						met_spio = parseInt(ergebnis[1].replace(/\./g,''));
						kris_spio = parseInt(ergebnis[2].replace(/\./g,''));
						deut_spio = parseInt(ergebnis[3].replace(/\./g,''));
						if (met_spio >= kris_spio && met_spio >= deut_spio) kts = Math.ceil(met_spio/5000000) * 1000;
						if (kris_spio >= met_spio && kris_spio >= deut_spio) kts = Math.ceil(kris_spio/5000000) * 1000;
						if (deut_spio >= met_spio && deut_spio >= kris_spio) kts = Math.ceil(deut_spio/5000000) * 1000;

						flotten = null; verteidigung = null;
						for (spt = 1; spt < tabelle.parentNode.childNodes.length-1; spt++) {
							if (tabelle.parentNode.childNodes[spt].childNodes[0].childNodes[0].childNodes[0].innerHTML == 'Flotte') {
								flotten = tabelle.parentNode.childNodes[spt];
							}
							if (tabelle.parentNode.childNodes[spt].childNodes[0].childNodes[0].childNodes[0].innerHTML == 'Verteidigung') {
								verteidigung = tabelle.parentNode.childNodes[spt];
							}
						}
						attZiel_eintragen = 1;
if (flotten != null) {
						if (flotten.innerHTML.indexOf('Bomber') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Zerstörer') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Todesstern') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Kreuzer') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Schlachtschiff') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Schlachtkreuzer') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Solarsatellit') != -1) {
							attZiel_eintragen = 2;
						}
						if (flotten.innerHTML.indexOf('Kleiner Transporter') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Spionagesonde') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Großer Transporter') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Kolonieschiff') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Recycler') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Leichter Jäger') != -1) {
							attZiel_eintragen = 0;
						}
						if (flotten.innerHTML.indexOf('Schwerer Jäger') != -1) {
							attZiel_eintragen = 0;
						}
}
if (verteidigung != null) {						
						if (verteidigung.innerHTML.indexOf('Raketenwerfer') != -1) {
							attZiel_eintragen = 0;
						}
						if (verteidigung.innerHTML.indexOf('Leichtes Lasergeschütz') != -1) {
							attZiel_eintragen = 0;
						}
						if (verteidigung.innerHTML.indexOf('Schweres Lasergeschütz') != -1) {
							attZiel_eintragen = 0;
						}
						if (verteidigung.innerHTML.indexOf('Gausskanone') != -1) {
							attZiel_eintragen = 0;
						}
						if (verteidigung.innerHTML.indexOf('Ionengeschuetz') != -1) {
							attZiel_eintragen = 0;
						}
						if (verteidigung.innerHTML.indexOf('Plasmawerfer') != -1) {
							attZiel_eintragen = 0;
						}
						if (verteidigung.innerHTML.indexOf('Kleine Schildkuppel') != -1 && attZiel_eintragen == 1) {
							attZiel_eintragen = 2;
						}
						if (verteidigung.innerHTML.indexOf('Grosse Schildkuppel') != -1 && attZiel_eintragen == 1) {
							attZiel_eintragen = 2;
						}
}
						ohne_sf_link = tabelle.childNodes[1].childNodes[0].childNodes[0].childNodes[2].href;
						mit_sf_link = tabelle.childNodes[1].childNodes[0].childNodes[0].childNodes[4].href;
						checkbox_td = tabelle.parentNode.parentNode.previousSibling.firstChild;
						check_flag = false;

						if (attZiel_eintragen == 1) {
							attTabs = ohne_sf_link + ',' + attTabs;
							check_flag = true;
							noch_ein_attZiel_eintragen = false;
							if ((kts/2)>=spionageBerichtKleineTransporter && spionageBerichtKleineTransporter!=0) noch_ein_attZiel_eintragen = true;
							if ((met_spio/2)>=spionageBerichtMetall && spionageBerichtMetall!=0) noch_ein_attZiel_eintragen = true;
							if ((kris_spio/2)>=spionageBerichtKristall && spionageBerichtKristall!=0) noch_ein_attZiel_eintragen = true;
							if ((deut_spio/2)>=spionageBerichtDeuterium && spionageBerichtDeuterium!=0) noch_ein_attZiel_eintragen = true;
							if (noch_ein_attZiel_eintragen == true) {
								attTabs = ohne_sf_link + ',' + attTabs;
							}
							noch_ein_attZiel_eintragen = false;
							if ((kts/4)>=spionageBerichtKleineTransporter && spionageBerichtKleineTransporter!=0) noch_ein_attZiel_eintragen = true;
							if ((met_spio/4)>=spionageBerichtMetall && spionageBerichtMetall!=0) noch_ein_attZiel_eintragen = true;
							if ((kris_spio/4)>=spionageBerichtKristall && spionageBerichtKristall!=0) noch_ein_attZiel_eintragen = true;
							if ((deut_spio/4)>=spionageBerichtDeuterium && spionageBerichtDeuterium!=0) noch_ein_attZiel_eintragen = true;
							if (noch_ein_attZiel_eintragen == true) {
								attTabs = ohne_sf_link + ',' + attTabs;
							}
						} else if (attZiel_eintragen == 2) {
							attTabs = mit_sf_link + ',' + attTabs;
							check_flag = true;
							noch_ein_attZiel_eintragen = false;
							if ((kts/2)>=spionageBerichtKleineTransporter && spionageBerichtKleineTransporter!=0) noch_ein_attZiel_eintragen = true;
							if ((met_spio/2)>=spionageBerichtMetall && spionageBerichtMetall!=0) noch_ein_attZiel_eintragen = true;
							if ((kris_spio/2)>=spionageBerichtKristall && spionageBerichtKristall!=0) noch_ein_attZiel_eintragen = true;
							if ((deut_spio/2)>=spionageBerichtDeuterium && spionageBerichtDeuterium!=0) noch_ein_attZiel_eintragen = true;
							if (noch_ein_attZiel_eintragen == true) {
								attTabs = mit_sf_link + ',' + attTabs;
							}
							noch_ein_attZiel_eintragen = false;
							if ((kts/4)>=spionageBerichtKleineTransporter && spionageBerichtKleineTransporter!=0) noch_ein_attZiel_eintragen = true;
							if ((met_spio/4)>=spionageBerichtMetall && spionageBerichtMetall!=0) noch_ein_attZiel_eintragen = true;
							if ((kris_spio/4)>=spionageBerichtKristall && spionageBerichtKristall!=0) noch_ein_attZiel_eintragen = true;
							if ((deut_spio/4)>=spionageBerichtDeuterium && spionageBerichtDeuterium!=0) noch_ein_attZiel_eintragen = true;
							if (noch_ein_attZiel_eintragen == true) {
								attTabs = mit_sf_link + ',' + attTabs;
							}
						}

						if (check_flag) {
							checkbox_td.firstChild.checked = true;
						}	
					}
				}
			}
			anzahlZeichen = attTabs.length - 1;
			attTabs = attTabs.substr(0,anzahlZeichen);
			attTabsAlt = GM_getValue('nonamegame_attTabs', '');
			if (attTabsAlt != '' && attTabs !='') {
				attTabs = attTabsAlt + ',' + attTabs;
			} else if (attTabsAlt !='' && attTabs == '') {
				attTabs = attTabsAlt;
			}
			GM_setValue('nonamegame_attTabs',attTabs);
			alert('"Liste der Ziele" wurde erstellt und gespeichert\n\nMit der Taste "t" werden Ziele an die Liste angehängt\n(Es besteht die Möglichkeit diese Liste vor dem Einlesen mit "x" zu leeren)\n\nMit der Taste "a" lässt sich diese nun anzeigen\nMit der Taste "x" wird sie geleert');
		}
		// Taste "a" oeffnet die Att-Liste
		if (Ereignis.which == 97) {
			var attTabs = GM_getValue('nonamegame_attTabs', '');
			if (attTabs != '') {
				if (document.getElementsByTagName('body')[0].innerHTML.indexOf('attTabZeile') == -1) {
					var attTabArray = new Array;
					attTabArray = attTabs.split(',');
					
					headerSF = '';
					if (standartFlotteTyp == "ship204") headerSF = 'Leichte J&auml;ger';
					if (standartFlotteTyp == "ship205") headerSF = 'Schwere J&auml;ger';
					if (standartFlotteTyp == "ship206") headerSF = 'Kreuzer';
					if (standartFlotteTyp == "ship215") headerSF = 'Schlachtkreuzer';
					if (standartFlotteTyp == "ship207") headerSF = 'Schlachtschiffe';
					if (standartFlotteTyp == "ship211") headerSF = 'Bomber';
					if (standartFlotteTyp == "ship213") headerSF = 'Zerst&ouml;rer';
					if (standartFlotteTyp == "ship214") headerSF = 'Todessterne';	
					
					ausgabe = '<br><br><center><table>';
					ausgabe += '<tr>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Nummer</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Koordinaten</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Kleine Transporter</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>' + headerSF + '</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Flottenzentrale</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Aktion</b></td>';
					ausgabe += '</tr>';
					
					for (az = 0; az < attTabArray.length; az++) {
						ausdruck = /galaxy=([0-9]+)/;
						ergebnis = ausdruck.exec(attTabArray[az]);
						galaxy = ergebnis[1];
						ausdruck = /system=([0-9]+)/;
						ergebnis = ausdruck.exec(attTabArray[az]);
						system = ergebnis[1];
						ausdruck = /planet=([0-9]+)/;
						ergebnis = ausdruck.exec(attTabArray[az]);
						planet = ergebnis[1];
						ausdruck = /ship202=([0-9]+)/;
						ergebnis = ausdruck.exec(attTabArray[az]);
						angreiferFlotte1 = ergebnis[1];
						sf = false;
						if (attTabArray[az].indexOf('ship204') != -1) { ausdruck = /ship204=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship205') != -1) { ausdruck = /ship205=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship206') != -1) { ausdruck = /ship206=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship215') != -1) { ausdruck = /ship215=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship207') != -1) { ausdruck = /ship207=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship211') != -1) { ausdruck = /ship211=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship212') != -1) { ausdruck = /ship213=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship214') != -1) { ausdruck = /ship214=([0-9]+)/; sf = true; }
						if (sf == true) {
							ergebnis = ausdruck.exec(attTabArray[az]);
							angreiferFlotte2 = formatZahl(parseInt(ergebnis[1]));
						} else {
							angreiferFlotte2 = '';
						}
						
						ausgabe += '<tr id="attTabZeile' + az + '">';
						ausgabe += '<th>' + (az + 1) + '</th>';
						ausgabe += '<th><a href="http://www.nonamegame.de/galaxy.php?g=' + galaxy + '&s=' + system + '">' + galaxy + ':' + system + ':' + planet + '</a></th>';
						ausgabe += '<th>' + formatZahl(angreiferFlotte1) + '</th>';
						ausgabe += '<th>' + angreiferFlotte2 + '</th>';
						ausgabe += '<th><a id="LinkattTab' + az + '" style="cursor:pointer;">&ouml;ffnen</a></th>';
						ausgabe += '<th><a id="attTab' + az + '" style="cursor:pointer;">l&ouml;schen</a></th>';
						ausgabe += '</tr>';
					}
					
					ausgabe += '<table></center><br><br>';
					
					document.getElementsByTagName('body')[0].innerHTML = ausgabe;
					
					attTabLinkLoeschen = true;
					
					for (az = 0; az < attTabArray.length; az++) {
						LinkattTabZeile = document.getElementById('LinkattTab' + az);
						LinkattTabZeile.addEventListener("click", loescheLinkAttTabZeile, false);
						attTabZeile = document.getElementById('attTab' + az);
						attTabZeile.addEventListener("click", loescheAttTabZeile, false);
					}
				} else {
					attTabs = GM_getValue('nonamegame_attTabs', '');
					attTabArray = attTabs.split(',');
					adresse = attTabArray[0];
					if (attTabLinkLoeschen == true) {
						attTabArray.splice(0,1);
						attTabs = attTabArray.join(',');
						GM_setValue('nonamegame_attTabs',attTabs);
						attTabLinkLoeschen = false;
					}
					document.location = adresse;
				}
			} else {
				alert('Es ist zur Zeit keine "Liste der Ziele" gespeichert');
			}
		}
		// Taste "x" loescht die Att-Liste
		if (Ereignis.which == 120) {
			GM_setValue('nonamegame_attTabs','');
			alert('"Liste der Ziele" wurde gelöscht');
		}
	}
	unsafeWindow.addEventListener("keypress",Tastendruck,false);

}

function loescheAttTabZeile(ev) {
	attTabs = GM_getValue('nonamegame_attTabs', '');
	attTabArray = attTabs.split(',');

	if (!ev) ev = window.event;
	attTabZiel = ev.currentTarget;
	index = attTabZiel.getAttribute('id');
	ausdruck = /attTab([0-9]+)/;
	ergebnis = ausdruck.exec(index); 
	index = parseInt(ergebnis[1]);

	attTabArray.splice(index,1);
	
	attTabs = attTabArray.join(',');
	GM_setValue('nonamegame_attTabs',attTabs);
	
	attTabZeile = document.getElementById('attTabZeile' + index);
	attTabZeile.parentNode.removeChild(attTabZeile);
	
	trs = document.getElementsByTagName('tr');
	for (azz = 1; azz < trs.length; azz++) {
		tr = trs[azz];
		tr.setAttribute('id','attTabZeile'+(azz-1));
		tr.childNodes[4].firstChild.setAttribute('id','LinkattTab'+(azz-1));
		tr.childNodes[5].firstChild.setAttribute('id','attTab'+(azz-1));
	}
}
function loescheLinkAttTabZeile(ev) {
	attTabs = GM_getValue('nonamegame_attTabs', '');
	attTabArray = attTabs.split(',');
	
	if (!ev) ev = window.event;
	attTabZiel = ev.currentTarget;
	index = attTabZiel.getAttribute('id');
	ausdruck = /attTab([0-9]+)/;
	ergebnis = ausdruck.exec(index); 
	index = parseInt(ergebnis[1]);
	adresse = attTabArray[index];
	
	attTabArray.splice(index,1);
	
	attTabs = attTabArray.join(',');
	GM_setValue('nonamegame_attTabs',attTabs);
	
	attTabZeile = document.getElementById('attTabZeile' + index);
	attTabZeile.parentNode.removeChild(attTabZeile);
	
	trs = document.getElementsByTagName('tr');
	for (azz = 1; azz < trs.length; azz++) {
		tr = trs[azz];
		tr.setAttribute('id','attTabZeile'+(azz-1));
		tr.childNodes[4].firstChild.setAttribute('id','LinkattTab'+(azz-1));
		tr.childNodes[5].firstChild.setAttribute('id','attTab'+(azz-1));
	}
	
	document.location = adresse;
}

// Gebaeude-Bauseite komprimieren
if (verkleinerteBauseiten != '' && url.indexOf('buildings') != -1 && document.URL.indexOf('mode=fleet') == -1 && document.URL.indexOf('mode=research') == -1 && document.URL.indexOf('mode=defense') == -1) {
	ausgabe = '<colgroup>';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '</colgroup>';
	ausgabe += '<tr>';
	ausgabe += '<th align="center" style="font-weight:bold;">Geb&auml;ude</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Level</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Metall</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Kristall</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Deuterium</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Dauer</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Bau</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">R&uuml;ckbau</th>';
	ausgabe += '</tr>';

	counter = '';
	var zeilen = document.getElementsByTagName('tr');
	for (f12 = 0; f12<zeilen.length; f12++) {
		zeile = zeilen[f12];
		if (zeile.innerHTML.indexOf('infos.php?') != -1 && zeile.innerHTML.indexOf('table') == -1) {
			gebaeude_name = zeile.childNodes[3].childNodes[1].innerHTML;
			gebaeude_info_link = zeile.childNodes[3].childNodes[1].href;
			ausdruck = /a>(.*)<br>/;
			ergebnis = ausdruck.exec(zeile.childNodes[3].innerHTML);
			gebaeude_stufe = ergebnis[1];
			if (gebaeude_stufe.indexOf('(') != -1 && gebaeude_stufe.indexOf(')') != -1) {
				gebaeude_stufe = gebaeude_stufe.substring(2,gebaeude_stufe.length-1);
			}
			var1 = zeile.childNodes[5].childNodes.length;
			bau = '';
			abbau = '';
			if (var1 == 2 || var1 == 5) {
				if (zeile.childNodes[5].childNodes[0].href != null) bau = '<a href="' + zeile.childNodes[5].childNodes[0].href + '">' + zeile.childNodes[5].childNodes[0].innerHTML + '</a>';
				if (zeile.childNodes[5].innerHTML.indexOf('<center>-</center>') != -1) bau = '<center>-</center>';
			}
			if (var1 == 5) {
				if (zeile.childNodes[5].childNodes[3].href != null) abbau = '<a href="' + zeile.childNodes[5].childNodes[3].href + '">' + zeile.childNodes[5].childNodes[3].innerHTML + '</a>';
			}
			if (var1 == 6) {
				counter = zeile.childNodes[5].innerHTML;
				counter_ende = zeile.childNodes[5].lastChild.previousSibling.innerHTML;
				bau = '<div id="bxx">&nbsp;</div>';
			}
			bau = bau.replace(/<br>/g,' ');
			abbau = abbau.replace(/<br>/g,' ');

			metall = '';
			kristall = '';
			deuterium = '';

			if (zeile.childNodes[3].innerHTML.indexOf('Metall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') != -1) {
				metall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
				kristall = zeile.childNodes[3].getElementsByTagName('span')[1].innerHTML;
				deuterium = zeile.childNodes[3].getElementsByTagName('span')[2].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') != -1) {
				metall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
				deuterium = zeile.childNodes[3].getElementsByTagName('span')[1].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') != -1 ) {
				metall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
				kristall = zeile.childNodes[3].getElementsByTagName('span')[1].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Kristall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') != -1) {
				kristall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
				deuterium = zeile.childNodes[3].getElementsByTagName('span')[1].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') == -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') == -1) {
				metall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') == -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') == -1) {
				kristall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') == -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') == -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') != -1) {
				deuterium = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
			}

			produktionsdauer = '';
			if (zeile.childNodes[3].innerHTML.indexOf('Produktionsdauer') != -1) {
				produktionsdauer_anfang = zeile.childNodes[3].innerHTML.indexOf('Produktionsdauer');
				produktionsdauer_laenge = zeile.childNodes[3].innerHTML.length;
				produktionsdauer = zeile.childNodes[3].innerHTML.substring(produktionsdauer_anfang +18 , produktionsdauer_laenge);
			}

			// Eigene Ressourcen auslesen		
			var metallEigene = parseInt(document.getElementById('metalblock').innerHTML.replace(/\./g,''));
			var kristallEigene = parseInt(document.getElementById('crystalblock').innerHTML.replace(/\./g,''));
			var deuteriumEigene = parseInt(document.getElementById('deuteriumblock').innerHTML.replace(/\./g,''));
			
			met = parseInt(metall.replace(/\./g,''));
			kris = parseInt(kristall.replace(/\./g,''));
			deut = parseInt(deuterium.replace(/\./g,''));
			if (metallEigene < met) {
				farbeMetall = 'red';
				fehlend = met - metallEigene;
				fehlend_formatiert = formatZahl(fehlend);
				fehlendMetall = ' title="-' + fehlend_formatiert + '"';
			} else {
				farbeMetall = 'lime';
				fehlendMetall = '';
			}
			if (kristallEigene < kris) {
				farbeKristall = 'red';
				fehlend = kris - kristallEigene;
				fehlend_formatiert = formatZahl(fehlend);
				fehlendKristall = ' title="-' + fehlend_formatiert + '"';
			} else {
				farbeKristall = 'lime';
				fehlendKristall = '';
			}
			if (deuteriumEigene < deut) {
				farbeDeuterium = 'red';
				fehlend = deut - deuteriumEigene;
				fehlend_formatiert = formatZahl(fehlend);
				fehlendDeuterium = ' title="-' + fehlend_formatiert + '"';
			} else {
				farbeDeuterium = 'lime';
				fehlendDeuterium = '';
			}

			ausgabe += '<tr>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;"><a href="' + gebaeude_info_link + '">' + gebaeude_name + '</a></td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;">' + gebaeude_stufe + '</td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;"><span style="color:' + farbeMetall + '"' + fehlendMetall + '>' + metall + '</span></td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;"><span style="color:' + farbeKristall + '"' + fehlendKristall + '>' + kristall + '</span></td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;"><span style="color:' + farbeDeuterium + '"' + fehlendDeuterium + '>' + deuterium + '</span></td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;">' + produktionsdauer + '</td>';
			if (var1 != 6) {
				ausgabe += '<td class="l" align="center" style="vertical-align:middle;">' + bau + '</td>';
			} else {
				ausgabe += '<td class="l" align="center"  style="vertical-align:middle;" colspan="2">' + bau + '</td>';
			}
			if (var1 != 6) {
				ausgabe += '<td class="l" align="center" style="vertical-align:middle;">' + abbau + '</td>';
			}
			ausgabe += '</tr>';
		}
	}
	document.getElementsByTagName('table')[5].innerHTML = ausgabe;
	if(counter != '') {
		vergangeneZeit = new Date();
		ausdruck = /ss=([0-9]+);/;
		ergebnis = ausdruck.exec(counter);
		ss = parseInt(ergebnis[1]);
		ausdruck = /<a(.*)a>/;
		ergebnis = ausdruck.exec(counter);
		counter_abbrechen = '<a' + ergebnis[1] + 'a>';
		bauzeit();
	}
}

// Forschung-Bauseite komprimieren
if (verkleinerteBauseitenForschung != '' && url.indexOf('buildings') != -1 && document.URL.indexOf('mode=fleet') == -1 && document.URL.indexOf('mode=research') != -1 && document.URL.indexOf('mode=defense') == -1) {
	ausgabe = '<colgroup>';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '<col width="*">';
	ausgabe += '</colgroup>';
	ausgabe += '<tr>';
	ausgabe += '<th align="center" style="font-weight:bold;">Forschung</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Level</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Metall</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Kristall</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Deuterium</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Energie</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Dauer</th>';
	ausgabe += '<th align="center" style="font-weight:bold;">Bau</th>';
	ausgabe += '</tr>';
	
	counter = '';
	var zeilen = document.getElementsByTagName('tr');
	for (f12 = 0; f12<zeilen.length; f12++) {
		zeile = zeilen[f12];
		if (zeile.innerHTML.indexOf('infos.php?') != -1 && zeile.innerHTML.indexOf('table') == -1) {
			forschung_name = zeile.childNodes[3].childNodes[1].innerHTML;
			forschung_info_link = zeile.childNodes[3].childNodes[1].href;
			ausdruck = /a>\s\((.*)\)<br>/;
			ergebnis = ausdruck.exec(zeile.childNodes[3].innerHTML);
			forschung_stufe = ergebnis[1];
			produktionsdauer = '';
			if (zeile.childNodes[3].innerHTML.indexOf('Produktionsdauer') != -1) {
				produktionsdauer_anfang = zeile.childNodes[3].innerHTML.indexOf('Produktionsdauer');
				produktionsdauer_laenge = zeile.childNodes[3].innerHTML.length;
				produktionsdauer = zeile.childNodes[3].innerHTML.substring(produktionsdauer_anfang +18 , produktionsdauer_laenge);
			}
			if (produktionsdauer.indexOf('Eventhandler') != -1 ) {
				produktionsdauer = produktionsdauer.replace(/\stitle=".*"/,'');
			}
			metall = '';
			kristall = '';
			deuterium = '';
			energie = '';
			if (zeile.childNodes[3].innerHTML.indexOf('Metall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') != -1) {
				metall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
				kristall = zeile.childNodes[3].getElementsByTagName('span')[1].innerHTML;
				deuterium = zeile.childNodes[3].getElementsByTagName('span')[2].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') != -1) {
				metall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
				deuterium = zeile.childNodes[3].getElementsByTagName('span')[1].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') != -1 ) {
				metall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
				kristall = zeile.childNodes[3].getElementsByTagName('span')[1].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Kristall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') != -1) {
				kristall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
				deuterium = zeile.childNodes[3].getElementsByTagName('span')[1].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') == -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') == -1) {
				metall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') == -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') != -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') == -1) {
				kristall = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Metall:') == -1 && zeile.childNodes[3].innerHTML.indexOf('Kristall:') == -1 && zeile.childNodes[3].innerHTML.indexOf('Deuterium:') != -1) {
				deuterium = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
			} else if (zeile.childNodes[3].innerHTML.indexOf('Energie:') != -1) {
				energie = zeile.childNodes[3].getElementsByTagName('span')[0].innerHTML;
			}
			var1 = zeile.childNodes[4];
			bau = '';
			if (var1.innerHTML.indexOf('mode=research') != -1 && (var1.innerHTML.indexOf('&bau') != -1|| var1.innerHTML.indexOf('&amp;bau') != -1)) {
				bau = '<a href="' + var1.childNodes[1].href + '">' + var1.childNodes[1].innerHTML + '</a>';
			}
			if (var1.innerHTML.indexOf('mode=research') != -1 && (var1.innerHTML.indexOf('&unbau') != -1 || var1.innerHTML.indexOf('&amp;unbau') != -1)) {
				counter = var1.innerHTML;
				counter_ende = var1.lastChild.previousSibling.innerHTML;
				bau = '<div id="bxx">&nbsp;</div>';
			}
			if (var1.innerHTML.indexOf('<center>-</center>') != -1) bau = '<center>-</center>';
			bau = bau.replace(/<br>/g,' ');

			// Eigene Ressourcen auslesen
			var metallEigene = parseInt(document.getElementById('metalblock').innerHTML.replace(/\./g,''));
			var kristallEigene = parseInt(document.getElementById('crystalblock').innerHTML.replace(/\./g,''));
			var deuteriumEigene = parseInt(document.getElementById('deuteriumblock').innerHTML.replace(/\./g,''));
			var energieEigene = parseInt(document.getElementById('energieblock').innerHTML.replace(/.*\//,'').replace(/\./g,''));		
			met = parseInt(metall.replace(/\./g,''));
			kris = parseInt(kristall.replace(/\./g,''));
			deut = parseInt(deuterium.replace(/\./g,''));
			power = parseInt(energie.replace(/\./g,''));
			if (metallEigene < met) {
				farbeMetall = 'red';
				fehlend = met - metallEigene;
				fehlend_formatiert = formatZahl(fehlend);
				fehlendMetall = ' title="-' + fehlend_formatiert + '"';
			} else {
				farbeMetall = 'lime';
				fehlendMetall = '';
			}
			if (kristallEigene < kris) {
				farbeKristall = 'red';
				fehlend = kris - kristallEigene;
				fehlend_formatiert = formatZahl(fehlend);
				fehlendKristall = ' title="-' + fehlend_formatiert + '"';
			} else {
				farbeKristall = 'lime';
				fehlendKristall = '';
			}

			if (deuteriumEigene < deut) {
				farbeDeuterium = 'red';
				fehlend = deut - deuteriumEigene;
				fehlend_formatiert = formatZahl(fehlend);
				fehlendDeuterium = ' title="-' + fehlend_formatiert + '"';
			} else {
				farbeDeuterium = 'lime';
				fehlendDeuterium = '';
			}
			if (energieEigene < power) {
				farbeEnergie = 'red';
				fehlend = power - energieEigene;
				fehlend_formatiert = formatZahl(fehlend);
				fehlendEnergie = ' title="-' + fehlend_formatiert + '"';
			} else {
				farbeEnergie = 'lime';
				fehlendEnergie = '';
			}
			ausgabe += '<tr>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;"><a href="' + forschung_info_link + '">' + forschung_name + '</a></td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;">' + forschung_stufe + '</td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;"><span style="color:' + farbeMetall + '"' + fehlendMetall + '>' + metall + '</span></td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;"><span style="color:' + farbeKristall + '"' + fehlendKristall + '>' + kristall + '</span></td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;"><span style="color:' + farbeDeuterium + '"' + fehlendDeuterium + '>' + deuterium + '</span></td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;"><span style="color:' + farbeEnergie + '"' + fehlendEnergie + '>' + energie + '</span></td>';
			ausgabe += '<td class="l" align="center" style="vertical-align:middle;">' + produktionsdauer + '</td>';
			ausgabe += '<td class="l" align="center"  style="vertical-align:middle;">' + bau + '</td>';
			ausgabe += '</tr>';
		}
	}
	document.getElementsByTagName('table')[5].innerHTML = ausgabe;
	if(counter != '') {
		vergangeneZeit = new Date();
		ausdruck = /ss=([0-9]+);/;
		ergebnis = ausdruck.exec(counter);
		ss = parseInt(ergebnis[1]);
		ausdruck = /<a(.*)Abbrechen<br><br><\/a>/;
		ergebnis = ausdruck.exec(counter);
		counter_abbrechen = '<a' + ergebnis[1] + 'Abbrechen</a>';
		bauzeit2();
	}
}

// Flotten-Bauseite komprimieren
if (verkleinerteBauseitenFlotte != '' && url.indexOf('buildings') != -1 && document.URL.indexOf('mode=fleet') != -1 && document.URL.indexOf('mode=research') == -1 && document.URL.indexOf('mode=defense') == -1) {
	var zeilen = document.getElementsByTagName('tr');
	document.getElementsByTagName('form')[0].setAttribute('action',document.getElementsByTagName('form')[0].getAttribute('action') + '?mode=fleet');
	for (f12 = 0; f12<zeilen.length; f12++) {
		zeile = zeilen[f12];
		if (zeile.innerHTML.indexOf('infos.php?') != -1 && zeile.innerHTML.indexOf('table') == -1) {
			zeile.childNodes[0].parentNode.removeChild(zeile.childNodes[0]);
			zeile.childNodes[0].innerHTML = zeile.childNodes[0].innerHTML.replace(/<br>.*<br>Schild/,'<br>Schild').replace(/<br>Lagerkap/,' Lagerkap').replace(/Benötigt:<br>/,'').replace(/<br>Kristall:/,'Kristall:').replace(/<br>Deuterium:/,'Deuterium:').replace(/<\/b>Kristall:/,'</b> Kristall:').replace(/<\/b>Deuterium:/,'</b> Deuterium:').replace(/<br>Produktionsdauer:/,'Produktionsdauer:');
		}
	}
}

// Verteidigung-Bauseite komprimieren
if (verkleinerteBauseitenVerteidigung != '' && url.indexOf('buildings') != -1 && document.URL.indexOf('mode=fleet') == -1 && document.URL.indexOf('mode=research') == -1 && document.URL.indexOf('mode=defense') != -1) {
	var zeilen = document.getElementsByTagName('tr');
	document.getElementsByTagName('form')[1].setAttribute('action',document.getElementsByTagName('form')[0].getAttribute('action') + '?mode=defense');
	for (f12 = 0; f12<zeilen.length; f12++) {
		zeile = zeilen[f12];
		if (zeile.innerHTML.indexOf('infos.php?') != -1 && zeile.innerHTML.indexOf('table') == -1) {
			zeile.childNodes[0].parentNode.removeChild(zeile.childNodes[0]);
			zeile.childNodes[0].innerHTML = zeile.childNodes[0].innerHTML.replace(/<br>.*<br>Schild/,'<br>Schild').replace(/<br>Lagerkap/,' Lagerkap').replace(/Benötigt:<br>/,'').replace(/<br>Kristall:/,'Kristall:').replace(/<br>Deuterium:/,'Deuterium:').replace(/<\/b>Kristall:/,'</b> Kristall:').replace(/<\/b>Deuterium:/,'</b> Deuterium:').replace(/<br>Produktionsdauer:/,'Produktionsdauer:');
		}
	}
}

function bauzeit() {
	var bxx=document.getElementById('bxx');
	neueZeit = new Date();
	s = ss-Math.round((neueZeit.getTime()-vergangeneZeit.getTime())/1000.);
	m = 0;
	h = 0;
	if(s < 0) {
		window.location.href = './buildings.php';
	} else {
		if (s > 59){
			m = Math.floor(s/60);
			s = s-m*60;
		}
		if (m>59) {
			h = Math.floor(m/60);
			m = m-h*60;
		}
		if (s<10) {
			s = "0" + s;
		}
		if (m<10) {
			m="0" + m;
		}
		bxx.innerHTML = h+':'+m+':'+s+'<br>' + counter_abbrechen + '<br><span style="color:orange;">' + counter_ende + '</span>';
	}
	window.setTimeout(bauzeit,999);
}
function bauzeit2() {
	var bxx = document.getElementById('bxx');
	neueZeit = new Date();
	s = ss-Math.round((neueZeit.getTime()-vergangeneZeit.getTime())/1000.);
	d = 0;
	m = 0;
	h = 0;
	if (s < 0) {
		window.location.href = './buildings.php?mode=research';  
	} else {
		if (s > 86400) {
			d = Math.floor(s/86400);
			s = s-d*86400;
		}
		if (s > 59) {
			m = Math.floor(s/60);
			s = s-m*60;
			if (m < 10){
				m = "0"+m;
			}
		}
		if (m > 59) {
			h = Math.floor(m/60);
			m = m-h*60;
			if (h < 10) {
				h = "0"+h;
			}
		}
		if ( d > 0 )
		{
			bxx.innerHTML = d+'D '+h+':'+m+':'+s+'<br>' + counter_abbrechen + '<br><span style="color:orange;">' + counter_ende + '</span>';
		}
		else
		{
			bxx.innerHTML = h+':'+m+':'+s+'<br>' + counter_abbrechen + '<br><span style="color:orange;">' + counter_ende + '</span>';
		} 
	}
	window.setTimeout(bauzeit2,999);
}

// Betrifft alle Seiten auf denen die Planetenliste und die Ressourcen angezeigt werden
if (url.indexOf('overview') != -1 ||
	url.indexOf('buildings') != -1 ||
	url.indexOf('resources') != -1 ||
	url.indexOf('fleet') != -1 ||
	url.indexOf('techtree') != -1 ||
	url.indexOf('options') != -1 ||
	url.indexOf('trading') != -1) {

	tabellen = document.getElementsByTagName('table');
	for (f6 = 0; f6<tabellen.length; f6++) {
		if (tabellen[f6].getAttribute('width') == "519") {
			tabellen[f6].setAttribute('width',"" + tabellenBreite);
		} else if (tabellen[f6].getAttribute('width') == 530) {
			tabellen[f6].setAttribute('width',tabellenBreite);
		}
	}
	if (url.indexOf('overview') != -1) {
		var zeilen = document.getElementsByTagName('tr');
		for (f11 = 0; f11 < zeilen.length; f11++) {
			zeile = zeilen[f11];
			// Wenn die Kleine bzw. Grosse Schildkuppel auf dem Planeten nicht vorhanden ist, wird diese Information aus der Uebersicht entfernt
			ersatz_tr = document.createElement('tr');
			if (zeile.innerHTML.indexOf('childkuppel') != -1 && zeile.innerHTML.indexOf('Nicht vorhanden') != -1 && zeile.innerHTML.indexOf('table') == -1) {
				zeile.parentNode.replaceChild(ersatz_tr,zeile);
			}
			// Wenn im Lager am Markt keine Rohstoffe vorhanden sind, wird diese Information aus der Uebersicht entfernt
			if (zeile.innerHTML.indexOf('Lager am Markt') != -1 && zeile.innerHTML.indexOf('Keine Rohstoffe vorhanden') != -1 && zeile.innerHTML.indexOf('table') == -1) {
				zeile.parentNode.replaceChild(ersatz_tr,zeile);
			}
			// Wenn im lokalen oder normalen Truemmerfeld kein Metall und kein Kristall vorhanden ist, wird die jeweilige Information aus der Uebersicht entfernt
			if (zeile.innerHTML.indexOf('Trümmerfeld') != -1 && zeile.innerHTML.indexOf('Metall: 0 / Kristall: 0') != -1 && zeile.innerHTML.indexOf('table') == -1) {
				zeile.parentNode.replaceChild(ersatz_tr,zeile);
			}
			// Wenn zur Zeit nichts erforscht wird, wird diese Information aus der Uebersicht entfernt
			if (zeile.innerHTML.indexOf('Forschung') != -1 && zeile.innerHTML.indexOf('frei') != -1 && zeile.innerHTML.indexOf('table') == -1) {
				zeile.parentNode.replaceChild(ersatz_tr,zeile);
			}
			// Entfernt in der Uebersicht den extra Zeilenumbruch nach den Count-Downs und den Uhrzeiten an denen die Flotten an- bzw. zurueckkommen
			if (zeile.innerHTML.indexOf('script><br>') != -1) {
				zeile.innerHTML = zeile.innerHTML.replace(/script><br>/g,'script>');
			}
		}
	}

	// Eigene Ressourcen auslesen
	var metall = parseInt(document.getElementById('metalblock').innerHTML.replace(/\./g,''));
	var kristall = parseInt(document.getElementById('crystalblock').innerHTML.replace(/\./g,''));
	var deuterium = parseInt(document.getElementById('deuteriumblock').innerHTML.replace(/\./g,''));
	var ressourcen = metall + kristall + deuterium;

	// Eigene Ressourcen weiter auseinander geben
	document.getElementById('metalblock').parentNode.setAttribute('width','100');
	document.getElementById('crystalblock').parentNode.setAttribute('width','100');
	document.getElementById('deuteriumblock').parentNode.setAttribute('width','100');
	document.getElementById('energieblock').parentNode.setAttribute('width','100');

	// Anzahl möglicher baubarer Schiffe
	if ((url.indexOf('overview') != -1 || document.URL.indexOf('buildings.php?mode=fleet') != -1) && maxSchiffe != '') {
		kts_anzahl = Math.min(Math.floor(metall/kts_met),Math.floor(kristall/kts_kris));
		gts_anzahl = Math.min(Math.floor(metall/gts_met),Math.floor(kristall/gts_kris));
		lj_anzahl = Math.min(Math.floor(metall/lj_met),Math.floor(kristall/lj_kris));
		sj_anzahl = Math.min(Math.floor(metall/sj_met),Math.floor(kristall/sj_kris));
		spio_anzahl = Math.floor(kristall/spio_kris);
		sats_anzahl = Math.min(Math.floor(kristall/sats_kris),Math.floor(deuterium/sats_deut));
		kolo_anzahl = Math.min(Math.min(Math.floor(metall/kolo_met),Math.floor(kristall/kolo_kris)),Math.floor(deuterium/kolo_deut));
		rec_anzahl = Math.min(Math.min(Math.floor(metall/rec_met),Math.floor(kristall/rec_kris)),Math.floor(deuterium/rec_deut));
		xer_anzahl = Math.min(Math.min(Math.floor(metall/xer_met),Math.floor(kristall/xer_kris)),Math.floor(deuterium/xer_deut));
		sxer_anzahl = Math.min(Math.min(Math.floor(metall/sxer_met),Math.floor(kristall/sxer_kris)),Math.floor(deuterium/sxer_deut));
		ss_anzahl = Math.min(Math.min(Math.floor(metall/ss_met),Math.floor(kristall/ss_kris)),Math.floor(deuterium/ss_deut));
		bomber_anzahl = Math.min(Math.min(Math.floor(metall/bomber_met),Math.floor(kristall/bomber_kris)),Math.floor(deuterium/bomber_deut));
		zerri_anzahl = Math.min(Math.min(Math.floor(metall/zerri_met),Math.floor(kristall/zerri_kris)),Math.floor(deuterium/zerri_deut));
		rip_anzahl = Math.min(Math.min(Math.floor(metall/rip_met),Math.floor(kristall/rip_kris)),Math.floor(deuterium/rip_deut));
		kts_punkte = Math.floor((kts_anzahl * (kts_met + kts_kris))/1000);
		gts_punkte = Math.floor((gts_anzahl * (gts_met + gts_kris))/1000);
		lj_punkte = Math.floor((lj_anzahl * (lj_met + lj_kris))/1000);
		sj_punkte = Math.floor((sj_anzahl * (sj_met + sj_kris))/1000);
		spio_punkte = Math.floor((spio_anzahl * spio_kris)/1000);
		sats_punkte = Math.floor((sats_anzahl * (sats_kris + sats_deut))/1000);
		kolo_punkte = Math.floor((kolo_anzahl * (kolo_met + kolo_kris + kolo_deut))/1000);
		rec_punkte = Math.floor((rec_anzahl * (rec_met + rec_kris + rec_deut))/1000);
		xer_punkte = Math.floor((xer_anzahl * (xer_met + xer_kris + xer_deut))/1000);
		sxer_punkte = Math.floor((sxer_anzahl * (sxer_met + sxer_kris + sxer_deut))/1000);
		ss_punkte = Math.floor((ss_anzahl * (ss_met + ss_kris + ss_deut))/1000);
		bomber_punkte = Math.floor((bomber_anzahl * (bomber_met + bomber_kris + bomber_deut))/1000);
		zerri_punkte = Math.floor((zerri_anzahl * (zerri_met + zerri_kris + zerri_deut))/1000);
		rip_punkte = Math.floor((rip_anzahl * (rip_met + rip_kris + rip_deut))/1000);
		max_punkte = Math.max(rip_punkte,Math.max(zerri_punkte,Math.max(bomber_punkte,Math.max(ss_punkte,Math.max(sxer_punkte,Math.max(xer_punkte,Math.max(rec_punkte,Math.max(kolo_punkte,Math.max(sats_punkte,Math.max(spio_punkte,Math.max(sj_punkte,Math.max(lj_punkte,Math.max(kts_punkte,gts_punkte)))))))))))));

		ausgabe = '<tr><td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Schifftyp</b></td><td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>M&ouml;gliche baubare Anzahl</b></td><td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Metall</b></td><td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Kristall</b></td><td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Deuterium</b></td><td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>M&ouml;glicher Punktezuwachs</b></td></tr>';
		ausgabe += '<tr' + (max_punkte==kts_punkte?' style="color:orange;"':'') + '><th>' + kts_name + '</th><th>' + formatZahl(kts_anzahl) + '</th><th>' + formatZahl(kts_anzahl*kts_met) + '</th><th>' + formatZahl(kts_anzahl*kts_kris) + '</th><th>' + formatZahl(kts_anzahl*kts_deut) + '</th><th>' + formatZahl(kts_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==gts_punkte?' style="color:orange;"':'') + '><th>' + gts_name + '</th><th>' + formatZahl(gts_anzahl) + '</th><th>' + formatZahl(gts_anzahl*gts_met) + '</th><th>' + formatZahl(gts_anzahl*gts_kris) + '</th><th>' + formatZahl(gts_anzahl*gts_deut) + '</th><th>' + formatZahl(gts_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==kolo_punkte?' style="color:orange;"':'') + '><th>' + kolo_name + '</th><th>' + formatZahl(kolo_anzahl) + '</th><th>' + formatZahl(kolo_anzahl*kolo_met) + '</th><th>' + formatZahl(kolo_anzahl*kolo_kris) + '</th><th>' + formatZahl(kolo_anzahl*kolo_deut) + '</th><th>' + formatZahl(kolo_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==rec_punkte?' style="color:orange;"':'') + '><th>' + rec_name + '</th><th>' + formatZahl(rec_anzahl) + '</th><th>' + formatZahl(rec_anzahl*rec_met) + '</th><th>' + formatZahl(rec_anzahl*rec_kris) + '</th><th>' + formatZahl(rec_anzahl*rec_deut) + '</th><th>' + formatZahl(rec_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==spio_punkte?' style="color:orange;"':'') + '><th>' + spio_name + '</th><th>' + formatZahl(spio_anzahl) + '</th><th>' + formatZahl(spio_anzahl*spio_met) + '</th><th>' + formatZahl(spio_anzahl*spio_kris) + '</th><th>' + formatZahl(spio_anzahl*spio_deut) + '</th><th>' + formatZahl(spio_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==sats_punkte?' style="color:orange;"':'') + '><th>' + sats_name + '</th><th>' + formatZahl(sats_anzahl) + '</th><th>' + formatZahl(sats_anzahl*sats_met) + '</th><th>' + formatZahl(sats_anzahl*sats_kris) + '</th><th>' + formatZahl(sats_anzahl*sats_deut) + '</th><th>' + formatZahl(sats_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==lj_punkte?' style="color:orange;"':'') + '><th>' + lj_name + '</th><th>' + formatZahl(lj_anzahl) + '</th><th>' + formatZahl(lj_anzahl*lj_met) + '</th><th>' + formatZahl(lj_anzahl*lj_kris) + '</th><th>' + formatZahl(lj_anzahl*lj_deut) + '</th><th>' + formatZahl(lj_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==sj_punkte?' style="color:orange;"':'') + '><th>' + sj_name + '</th><th>' + formatZahl(sj_anzahl) + '</th><th>' + formatZahl(sj_anzahl*sj_met) + '</th><th>' + formatZahl(sj_anzahl*sj_kris) + '</th><th>' + formatZahl(sj_anzahl*sj_deut) + '</th><th>' + formatZahl(sj_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==xer_punkte?' style="color:orange;"':'') + '><th>' + xer_name + '</th><th>' + formatZahl(xer_anzahl) + '</th><th>' + formatZahl(xer_anzahl*xer_met) + '</th><th>' + formatZahl(xer_anzahl*xer_kris) + '</th><th>' + formatZahl(xer_anzahl*xer_deut) + '</th><th>' + formatZahl(xer_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==sxer_punkte?' style="color:orange;"':'') + '><th>' + sxer_name + '</th><th>' + formatZahl(sxer_anzahl) + '</th><th>' + formatZahl(sxer_anzahl*sxer_met) + '</th><th>' + formatZahl(sxer_anzahl*sxer_kris) + '</th><th>' + formatZahl(sxer_anzahl*sxer_deut) + '</th><th>' + formatZahl(sxer_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==ss_punkte?' style="color:orange;"':'') + '><th>' + ss_name + '</th><th>' + formatZahl(ss_anzahl) + '</th><th>' + formatZahl(ss_anzahl*ss_met) + '</th><th>' + formatZahl(ss_anzahl*ss_kris) + '</th><th>' + formatZahl(ss_anzahl*ss_deut) + '</th><th>' + formatZahl(ss_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==bomber_punkte?' style="color:orange;"':'') + '><th>' + bomber_name + '</th><th>' + formatZahl(bomber_anzahl) + '</th><th>' + formatZahl(bomber_anzahl*bomber_met) + '</th><th>' + formatZahl(bomber_anzahl*bomber_kris) + '</th><th>' + formatZahl(bomber_anzahl*bomber_deut) + '</th><th>' + formatZahl(bomber_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==zerri_punkte?' style="color:orange;"':'') + '><th>' + zerri_name + '</th><th>' + formatZahl(zerri_anzahl) + '</th><th>' + formatZahl(zerri_anzahl*zerri_met) + '</th><th>' + formatZahl(zerri_anzahl*zerri_kris) + '</th><th>' + formatZahl(zerri_anzahl*zerri_deut) + '</th><th>' + formatZahl(zerri_punkte) + '</th></tr>';
		ausgabe += '<tr' + (max_punkte==rip_punkte?' style="color:orange;"':'') + '><th>' + rip_name + '</th><th>' + formatZahl(rip_anzahl) + '</th><th>' + formatZahl(rip_anzahl*rip_met) + '</th><th>' + formatZahl(rip_anzahl*rip_kris) + '</th><th>' + formatZahl(rip_anzahl*rip_deut) + '</th><th>' + formatZahl(rip_punkte) + '</th></tr>';

		center = document.createElement('center');
		maxSchiffeTabelle = document.createElement('table');
		maxSchiffeTabelle.innerHTML = ausgabe;
		pagebreak1 = document.createElement('p');
		pagebreak1.innerHTML = '&nbsp;';
		center.appendChild(pagebreak1);
		center.appendChild(maxSchiffeTabelle);
		pagebreak2 = document.createElement('p');
		pagebreak2.innerHTML = '&nbsp;';
		center.appendChild(pagebreak2);
		document.getElementsByTagName('body')[0].appendChild(center);
	}

	// Benoetigte Schiffe in der Flottenzentrale
	if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1) {
		alltr = document.getElementsByTagName('tr');
		last_fleet_row2 = null;
		for (f1 = 0; f1 < alltr.length; f1++) {
			if (alltr[f1].innerHTML.indexOf('Geschwindigkeit') != -1 && alltr[f1].innerHTML.indexOf('ship212') == -1) {
				last_fleet_row2 = alltr[f1];
				schiff = alltr[f1].childNodes[25].childNodes[0].getAttribute('name').substring(4,alltr[f1].childNodes[25].childNodes[0].getAttribute('name').length);
				laderaum = parseInt(document.getElementsByName('capacity' + schiff)[0].getAttribute('value'));
				verfuegbar = parseInt(document.getElementsByName('maxship' + schiff)[0].getAttribute('value'));
				benoetigt = Math.ceil(ressourcen/laderaum);
				eintragen = benoetigt;
				if (benoetigt>verfuegbar) {
					farbe = 'red';
					eintragen = verfuegbar;
					fehlend = benoetigt - verfuegbar;
					fehlend_formatiert = formatZahl(fehlend);
					fehlend_text = 'title="-' + fehlend_formatiert + '"';
				} else {
					farbe = 'lime';
					fehlend_text = '';
				}
				ben = '<a style="cursor:pointer;color:' + farbe + '" onClick="document.getElementsByName(\'ship' + schiff + '\')[0].value=\'' + eintragen + '\'" ' + fehlend_text + '>ben</a>';
				alltr[f1].childNodes[23].innerHTML = alltr[f1].childNodes[23].innerHTML + ' ' + ben;
			}
		}
		if (max_flotten_verschickt == true && last_fleet_row2 != null) {
			last_fleet_row2.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.childNodes[2].innerHTML = 'Maximale Flottenanzahl erreicht!';
			last_fleet_row2.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.setAttribute('style','background-color:red;color:white;font-weight:bold;font-size:12px;')
		}
	}

	// Miniatur Planetenbild entfernen
	document.getElementsByTagName('td')[2].innerHTML = "";
	var planeten_select = document.getElementsByTagName('select')[0];
	var himmelskoerper = new Array();
	var ausgewaehlt = 0;
	nummer = 0;
	for (i = 0; i < planeten_select.childNodes.length; i++) {
		planeten = planeten_select.childNodes[i].innerHTML;
		planeten_link = planeten_select.childNodes[i].value;
		planeten_selected = planeten_select.childNodes[i].selected;
		if (planeten != null && planeten!='undefined') {
			himmelskoerper[nummer] = new Object();
			ausdruck = /(.*)\s\[(([0-9]+):([0-9]+):([0-9]+))\]/;
			ergebnis = ausdruck.exec(planeten);
			himmelskoerper[nummer]['name'] = ergebnis[1];
			himmelskoerper[nummer]['koordinaten'] = ergebnis[2];
			himmelskoerper[nummer]['galaxie'] = ergebnis[3];
			himmelskoerper[nummer]['system'] = ergebnis[4];
			himmelskoerper[nummer]['planet'] = ergebnis[5];
			himmelskoerper[nummer]['link'] = planeten_link;
			himmelskoerper[nummer]['ausgewaehlt'] = planeten_selected;
			if (planeten_selected) {
				ausgewaehlt = nummer;
			}
			nummer++;
		}
	}

	var style = "font-size:1.8em;font-weight:bold;";
	var pfeil_links = document.createElement("a");
	pfeil_links_span = document.createElement("span");
	pfeil_links_text = document.createTextNode("< ");
	pfeil_links_span.appendChild(pfeil_links_text);
	pfeil_links_style = document.createAttribute("style");
	pfeil_links_style.nodeValue = style;
	pfeil_links_span.setAttributeNode(pfeil_links_style);
	pfeil_links.appendChild(pfeil_links_span);
	var pfeil_rechts = document.createElement("a");
	pfeil_rechts_span = document.createElement("span");
	pfeil_rechts_text = document.createTextNode(" >");
	pfeil_rechts_span.appendChild(pfeil_rechts_text);
	pfeil_rechts_style = document.createAttribute("style");
	pfeil_rechts_style.nodeValue = style;
	pfeil_rechts_span.setAttributeNode(pfeil_rechts_style);
	pfeil_rechts.appendChild(pfeil_rechts_span);

	if (ausgewaehlt > 0) {
		pfeil_links_href = document.createAttribute("href");
		pfeil_links_href.nodeValue = url + himmelskoerper[ausgewaehlt-1]['link'];
		pfeil_links.setAttributeNode(pfeil_links_href);
		document.getElementsByTagName('td')[3].insertBefore(pfeil_links, planeten_select);
	}
	if (ausgewaehlt < (himmelskoerper.length - 1)) {
		pfeil_rechts_href = document.createAttribute("href");
		pfeil_rechts_href.nodeValue = url + himmelskoerper[ausgewaehlt+1]['link'];
		pfeil_rechts.setAttributeNode(pfeil_rechts_href);
		document.getElementsByTagName('td')[3].insertBefore(pfeil_rechts, planeten_select.nextSibling);
	}

	function Tastendruck (Ereignis) {
		if (!Ereignis) Ereignis = window.event;
		// nach links
		if (Ereignis.keyCode == 37 && ausgewaehlt > 0) {
			document.location = url + himmelskoerper[ausgewaehlt-1]['link'];
		}
		// nach rechts
		if (Ereignis.keyCode == 39 && ausgewaehlt < (himmelskoerper.length - 1)) {
			document.location = url + himmelskoerper[ausgewaehlt+1]['link'];
		}
		// Auf der Seite der Fabrik bzw. Schutzanlagen "Enter" druecken um das Formular abzuschicken
		if (Ereignis.keyCode == 13) {
			if (document.URL.indexOf('buildings.php?mode=defense') != -1) {
				document.forms[1].submit();
			} else if (url.indexOf("buildings") != -1) {
				document.forms[0].submit();
			}
		}
	}
	unsafeWindow.addEventListener("keypress",Tastendruck,false);
}

// Button hinzufuegen, damit man die komplette Produktion mit nur einem Klick auf 100% stellen kann
if (url.indexOf('resources') != -1) {
	ausgabe = '<input type="button" id="setTo0" value="Alles 0%" style="width:200px;height:30px;font-weight:bold;font-family:verdana;font-size:9px;">&nbsp;<input type="button" id="setTo100" value="Alles 100%" style="width:200px;height:30px;font-weight:bold;font-family:verdana;font-size:9px;">';
	center = document.createElement('center');
	center.innerHTML = ausgabe;
	document.getElementsByTagName('body')[0].appendChild(center);
	var uebernehmen_button1 = document.getElementById('setTo100');
	var uebernehmen_button2 = document.getElementById('setTo0');
	uebernehmen_button1.addEventListener("click", setAllTo100, false);
	uebernehmen_button2.addEventListener("click", setAllTo0, false);
}

function setAllTo100(event) {
	selects = document.getElementsByTagName('select');
	for (f16 = 1; f16 < selects.length; f16++) {
		selects[f16].value = '100';
	}
	document.forms[0].submit();
}

function setAllTo0(event) {
	selects = document.getElementsByTagName('select');
	for (f16 = 1; f16 < selects.length; f16++) {
		selects[f16].value = '0';
	}
	document.forms[0].submit();
}

// Mit der Taste "a" kommt man auf den beiden weiteren Flotten-Seiten einfach weiter
// Mit der Taste "Enter" kommt man auf den beiden weiteren Flotten-Seiten einfach weiter
if (url.indexOf('floten1') != -1 || url.indexOf('floten2') != -1) {
	function Tastendruck (Ereignis) {
		if (!Ereignis) Ereignis = window.event;
		// Auf den Flotten-Seiten "a" druecken um das Formular abzuschicken
		if (Ereignis.which == 97) {
			document.forms[0].submit();
		}
	// Auf den Flotten-Seiten "Enter" druecken um das Formular abzuschicken
		if (Ereignis.keyCode == 13) {
			document.forms[0].submit();
		}
	}
	unsafeWindow.addEventListener("keypress",Tastendruck,false);
}
// Mit der Taste "p" kommt man anschließend wieder in den Posteingang
// Mit der Taste "Enter" kommt man anschließend wieder in die Flottenzentrale
if (url.indexOf('floten3') != -1) {
	function Tastendruck (Ereignis) {
		if (!Ereignis) Ereignis = window.event;
		// Auf den Flotten-Seiten "p" druecken um zum Posteingang (Spionageberichte) zurueck zu kommen
		if (Ereignis.which == 112) {
			document.location = 'messages.php?aktion=spi';
		}
		// Auf den Flotten-Seiten "Enter" druecken um zum Flottenmenue zurueck zu kommen
		if (Ereignis.keyCode == 13) {
			document.location = 'fleet.php';
		}
		// Auf der letzten Flotten-Seite "a" druecken dann kommt man wieder in die Att-Liste
		if (Ereignis.which == 97) {
			var attTabs = GM_getValue('nonamegame_attTabs', '');
			if (attTabs != '') {
				if (document.getElementsByTagName('body')[0].innerHTML.indexOf('attTabZeile') == -1) {
					var attTabArray = new Array;
					attTabArray = attTabs.split(',');
					
					headerSF = '';
					if (standartFlotteTyp == "ship204") headerSF = 'Leichte J&auml;ger';
					if (standartFlotteTyp == "ship205") headerSF = 'Schwere J&auml;ger';
					if (standartFlotteTyp == "ship206") headerSF = 'Kreuzer';
					if (standartFlotteTyp == "ship215") headerSF = 'Schlachtkreuzer';
					if (standartFlotteTyp == "ship207") headerSF = 'Schlachtschiffe';
					if (standartFlotteTyp == "ship211") headerSF = 'Bomber';
					if (standartFlotteTyp == "ship213") headerSF = 'Zerst&ouml;rer';
					if (standartFlotteTyp == "ship214") headerSF = 'Todessterne';	
					
					ausgabe = '<br><br><center><table>';
					ausgabe += '<tr>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Nummer</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Koordinaten</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Kleine Transporter</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>' + headerSF + '</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Flottenzentrale</b></td>';
					ausgabe += '<td class="c" align="center" style="padding-left:10px;padding-right:10px;"><b>Aktion</b></td>';
					ausgabe += '</tr>';
					
					for (az = 0; az < attTabArray.length; az++) {
						ausdruck = /galaxy=([0-9]+)/;
						ergebnis = ausdruck.exec(attTabArray[az]);
						galaxy = ergebnis[1];
						ausdruck = /system=([0-9]+)/;
						ergebnis = ausdruck.exec(attTabArray[az]);
						system = ergebnis[1];
						ausdruck = /planet=([0-9]+)/;
						ergebnis = ausdruck.exec(attTabArray[az]);
						planet = ergebnis[1];
						ausdruck = /ship202=([0-9]+)/;
						ergebnis = ausdruck.exec(attTabArray[az]);
						angreiferFlotte1 = ergebnis[1];
						sf = false;
						if (attTabArray[az].indexOf('ship204') != -1) { ausdruck = /ship204=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship205') != -1) { ausdruck = /ship205=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship206') != -1) { ausdruck = /ship206=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship215') != -1) { ausdruck = /ship215=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship207') != -1) { ausdruck = /ship207=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship211') != -1) { ausdruck = /ship211=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship212') != -1) { ausdruck = /ship213=([0-9]+)/; sf = true; }
						if (attTabArray[az].indexOf('ship214') != -1) { ausdruck = /ship214=([0-9]+)/; sf = true; }
						if (sf == true) {
							ergebnis = ausdruck.exec(attTabArray[az]);
							angreiferFlotte2 = formatZahl(parseInt(ergebnis[1]));
						} else {
							angreiferFlotte2 = '';
						}
						
						ausgabe += '<tr id="attTabZeile' + az + '">';
						ausgabe += '<th>' + (az + 1) + '</th>';
						ausgabe += '<th><a href="http://www.nonamegame.de/galaxy.php?g=' + galaxy + '&s=' + system + '">' + galaxy + ':' + system + ':' + planet + '</a></th>';
						ausgabe += '<th>' + formatZahl(angreiferFlotte1) + '</th>';
						ausgabe += '<th>' + angreiferFlotte2 + '</th>';
						ausgabe += '<th><a id="LinkattTab' + az + '" style="cursor:pointer;">&ouml;ffnen</a></th>';
						ausgabe += '<th><a id="attTab' + az + '" style="cursor:pointer;">l&ouml;schen</a></th>';
						ausgabe += '</tr>';
					}
					
					ausgabe += '<table></center><br><br>';
					
					document.getElementsByTagName('body')[0].innerHTML = ausgabe;
					
					attTabLinkLoeschen = true;
					
					for (az = 0; az < attTabArray.length; az++) {
						LinkattTabZeile = document.getElementById('LinkattTab' + az);
						LinkattTabZeile.addEventListener("click", loescheLinkAttTabZeile, false);
						attTabZeile = document.getElementById('attTab' + az);
						attTabZeile.addEventListener("click", loescheAttTabZeile, false);
					}
				} else {
					attTabs = GM_getValue('nonamegame_attTabs', '');
					attTabArray = attTabs.split(',');
					adresse = attTabArray[0];
					if (attTabLinkLoeschen == true) {
						attTabArray.splice(0,1);
						attTabs = attTabArray.join(',');
						GM_setValue('nonamegame_attTabs',attTabs);
						attTabLinkLoeschen = false;
					}
					document.location = adresse;
				}
			} else {
				alert('Es ist zur Zeit keine "Liste der Ziele" gespeichert');
			}
		}
	}
	unsafeWindow.addEventListener("keypress",Tastendruck,false);
}

// Bewegte Ressourcen
if (url.indexOf('overview') != -1) {
	var met_gesamt = 0; kris_gesamt = 0; deut_gesamt = 0;
	var met_stationieren = 0; kris_stationieren = 0; deut_stationieren = 0;
	var met_recyceln = 0; kris_recyceln = 0; deut_recyceln = 0;
	var met_angreifen = 0; kris_angreifen = 0; deut_angreifen = 0;
	var met_transportieren = 0; kris_transportieren = 0; deut_transportieren = 0;

	eigeneFlotten = false;
	var zeilen = document.getElementsByTagName('th');
	for (f2 = 0; f2 < zeilen.length; f2++) {
		zeile = zeilen[f2];
		if (zeile.innerHTML.indexOf('Flotten')!=-1 && zeile.innerHTML.indexOf('Auftrag')!=-1 && zeile.innerHTML.indexOf('Metall')!=-1 && zeile.innerHTML.indexOf('Kristall')!=-1 && zeile.innerHTML.indexOf('Deuterium')!=-1)  {
			eigeneFlotten = true;
			ressNode = zeile.lastChild;
			if (ressNode.innerHTML.indexOf('Diamant') != -1) {
				ressNode = zeile.childNodes[4];
			}
			if (ressNode.innerHTML == "Stationieren") {
				ress = ressNode.getAttribute('title');
				ausdruck = /Metall: (.*) Kristall: (.*) Deuterium: (.*)/;
				ergebnis = ausdruck.exec(ress);
				met_stationieren += parseInt(ergebnis[1].replace(/\./g,''));
				kris_stationieren += parseInt(ergebnis[2].replace(/\./g,''));
				deut_stationieren += parseInt(ergebnis[3].replace(/\./g,''));
			}
			if (ressNode.innerHTML == "Recyceln" && zeile.innerHTML.indexOf("Der Auftrag lautete") != -1) {
				ress = ressNode.getAttribute('title');
				ausdruck = /Metall: (.*) Kristall: (.*) Deuterium: (.*)/;
				ergebnis = ausdruck.exec(ress);
				met_recyceln += parseInt(ergebnis[1].replace(/\./g,''));
				kris_recyceln += parseInt(ergebnis[2].replace(/\./g,''));
				deut_recyceln += parseInt(ergebnis[3].replace(/\./g,''));
			}
			if (ressNode.innerHTML == "Angreifen" && zeile.innerHTML.indexOf("Der Auftrag lautete") != -1) {
				ress = ressNode.getAttribute('title');
				ausdruck = /Metall: (.*) Kristall: (.*) Deuterium: (.*)/;
				ergebnis = ausdruck.exec(ress);
				met_angreifen += parseInt(ergebnis[1].replace(/\./g,''));
				kris_angreifen += parseInt(ergebnis[2].replace(/\./g,''));
				deut_angreifen += parseInt(ergebnis[3].replace(/\./g,''));
			}
			if (ressNode.innerHTML == "Transport" && zeile.innerHTML.indexOf("Der Auftrag lautete") != -1) {
				ress = ressNode.getAttribute('title');
				ausdruck = /Metall: (.*) Kristall: (.*) Deuterium: (.*)/;
				ergebnis = ausdruck.exec(ress);
				met_transportieren += parseInt(ergebnis[1].replace(/\./g,''));
				kris_transportieren += parseInt(ergebnis[2].replace(/\./g,''));
				deut_transportieren += parseInt(ergebnis[3].replace(/\./g,''));
			}
			// Schrift veraendern bei zurueckkehrenden Flotten
			if (zeile.innerHTML.indexOf("Der Auftrag lautete") != -1) {
				zeile.setAttribute('style','font-style:italic;');
				zeile.innerHTML = zeile.innerHTML.replace(/font color="lime"/g,'font color="#C0C0C0"').replace(/font color="orange"/g,'font color="#C0C0C0"');
			}
		}
	}
	met_gesamt = met_stationieren + met_recyceln + met_angreifen + met_transportieren;
	kris_gesamt = kris_stationieren + kris_recyceln + kris_angreifen + kris_transportieren;
	deut_gesamt = deut_stationieren + deut_recyceln + deut_angreifen + deut_transportieren;

	ausgabe = '<br><table width="100%">';
	ausgabe += '<tr><td class="c" align="center"><b>Auftrag</b></td><td class="c" align="center"><b>Metall</b></td><td class="c" align="center"><b>Kristall</b</td><td class="c" align="center"><b>Deuterium</b></td></tr>';
	if (met_angreifen > 0 || kris_angreifen > 0 || deut_angreifen > 0)
		ausgabe += '<tr><th>Angreifen:</th><th>' + formatZahl(met_angreifen) + '</th><th>' + formatZahl(kris_angreifen) + '</th><th>' + formatZahl(deut_angreifen) + '</th></tr>';
	if (met_recyceln > 0 || kris_recyceln > 0 || deut_recyceln > 0)
		ausgabe += '<tr><th>Recyceln:</th><th>' + formatZahl(met_recyceln) + '</th><th>' + formatZahl(kris_recyceln) + '</th><th>' + formatZahl(deut_recyceln) + '</th></tr>';
	if (met_stationieren > 0 || kris_stationieren > 0 || deut_stationieren > 0)
		ausgabe += '<tr><th>Stationieren:</th><th>' + formatZahl(met_stationieren) + '</th><th>' + formatZahl(kris_stationieren) + '</th><th>' + formatZahl(deut_stationieren) + '</th></tr>';
	if (met_transportieren > 0 || kris_transportieren > 0 || deut_transportieren > 0)
		ausgabe += '<tr><th>Transportieren:</th><th>' + formatZahl(met_transportieren) + '</th><th>' + formatZahl(kris_transportieren) + '</th><th>' + formatZahl(deut_transportieren) + '</th></tr>';
	ausgabe += '<tr><th class="c"><b><font color="lime">Gesamt:</font></b></th><th class="c"><b><font color="lime">' + formatZahl(met_gesamt) + '</font></b></<th><th class="c"><b><font color="lime">' + formatZahl(kris_gesamt) + '</font></b></th><th class="c"><b><font color="lime">' + formatZahl(deut_gesamt) + '</font></b></th></tr>';
	ausgabe += '</table><br>';

	if (eigeneFlotten == true) {
		trs = document.getElementsByTagName('tr');
		for (f2 = 0; f2<trs.length; f2++) {
			zeile = trs[f2];
			if (zeile.innerHTML.indexOf('Durchmesser') != -1 && zeile.innerHTML.indexOf('km') != -1 && zeile.innerHTML.indexOf('Felder') != -1 && zeile.innerHTML.indexOf('table') == -1) {
				durchmesserZeile = zeile;
			}
		}
		
		bewegte_ress_row = document.createElement('tr');
		th1 = document.createElement('th');
		th1.innerHTML = '&Uuml;bersicht der bewegten Ressourcen';
		th2 = document.createElement('th');
		th2.setAttribute('colspan','3');
		th2.innerHTML = ausgabe;
		bewegte_ress_row.appendChild(th1);
		bewegte_ress_row.appendChild(th2);
		durchmesserZeile.parentNode.insertBefore(bewegte_ress_row,durchmesserZeile);
	}
}

// Bewegte Ressourcen in der Flottenzentrale
if (url.indexOf('fleet') != -1 && url.indexOf('fleet_attsim') == -1) {
	var met_gesamt = 0; kris_gesamt = 0; deut_gesamt = 0;
	var met_stationieren = 0; kris_stationieren = 0; deut_stationieren = 0;
	var met_recyceln = 0; kris_recyceln = 0; deut_recyceln = 0;
	var met_angreifen = 0; kris_angreifen = 0; deut_angreifen = 0;
	var met_transportieren = 0; kris_transportieren = 0; deut_transportieren = 0;

	ths = document.getElementsByTagName('th');
	for (f14 = 0; f14 < ths.length; f14++) {
		th = ths[f14].innerHTML;
		if (th.indexOf('Metall:') != -1 && th.indexOf('Kristall:') != -1 && th.indexOf('Deuterium:') != -1) {
			if (ths[f14].previousSibling.previousSibling.previousSibling.firstChild.innerHTML == "Angreifen") {
				ausdruck = /Metall: ([0-9.]+) Kristall: ([0-9.]+) Deuterium: ([0-9.]+)/;
				ergebnis = ausdruck.exec(th);
				met_angreifen += parseInt(ergebnis[1].replace(/\./g,''));
				kris_angreifen += parseInt(ergebnis[2].replace(/\./g,''));
				deut_angreifen += parseInt(ergebnis[3].replace(/\./g,''));
			}
			if (ths[f14].previousSibling.previousSibling.previousSibling.firstChild.innerHTML == "Transportieren") {
				ausdruck = /Metall: ([0-9.]+) Kristall: ([0-9.]+) Deuterium: ([0-9.]+)/;
				ergebnis = ausdruck.exec(th);
				met_transportieren += parseInt(ergebnis[1].replace(/\./g,''));
				kris_transportieren += parseInt(ergebnis[2].replace(/\./g,''));
				deut_transportieren += parseInt(ergebnis[3].replace(/\./g,''));
			}
			if (ths[f14].previousSibling.previousSibling.previousSibling.firstChild.innerHTML == "Stationieren") {
				ausdruck = /Metall: ([0-9.]+) Kristall: ([0-9.]+) Deuterium: ([0-9.]+)/;
				ergebnis = ausdruck.exec(th);
				met_stationieren += parseInt(ergebnis[1].replace(/\./g,''));
				kris_stationieren += parseInt(ergebnis[2].replace(/\./g,''));
				deut_stationieren += parseInt(ergebnis[3].replace(/\./g,''));
			}
			if (ths[f14].previousSibling.previousSibling.previousSibling.firstChild.innerHTML == "Recyceln") {
				ausdruck = /Metall: ([0-9.]+) Kristall: ([0-9.]+) Deuterium: ([0-9.]+)/;
				ergebnis = ausdruck.exec(th);
				met_recyceln += parseInt(ergebnis[1].replace(/\./g,''));
				kris_recyceln += parseInt(ergebnis[2].replace(/\./g,''));
				deut_recyceln += parseInt(ergebnis[3].replace(/\./g,''));
			}
		}
	}
	met_gesamt = met_stationieren + met_recyceln + met_angreifen + met_transportieren;
	kris_gesamt = kris_stationieren + kris_recyceln + kris_angreifen + kris_transportieren;
	deut_gesamt = deut_stationieren + deut_recyceln + deut_angreifen + deut_transportieren;

	ausgabe = '<tr><td class="c" align="center"><b>Auftrag</b></td><td class="c" align="center"><b>Metall</b></td><td class="c" align="center"><b>Kristall</b</td><td class="c" align="center"><b>Deuterium</b></td></tr>';
	if (met_angreifen > 0 || kris_angreifen > 0 || deut_angreifen > 0)
		ausgabe += '<tr><th>Angreifen:</th><th>' + formatZahl(met_angreifen) + '</th><th>' + formatZahl(kris_angreifen) + '</th><th>' + formatZahl(deut_angreifen) + '</th></tr>';
	if (met_recyceln > 0 || kris_recyceln > 0 || deut_recyceln > 0)
		ausgabe += '<tr><th>Recyceln:</th><th>' + formatZahl(met_recyceln) + '</th><th>' + formatZahl(kris_recyceln) + '</th><th>' + formatZahl(deut_recyceln) + '</th></tr>';
	if (met_stationieren > 0 || kris_stationieren > 0 || deut_stationieren > 0)
		ausgabe += '<tr><th>Stationieren:</th><th>' + formatZahl(met_stationieren) + '</th><th>' + formatZahl(kris_stationieren) + '</th><th>' + formatZahl(deut_stationieren) + '</th></tr>';
	if (met_transportieren > 0 || kris_transportieren > 0 || deut_transportieren > 0)
		ausgabe += '<tr><th>Transportieren:</th><th>' + formatZahl(met_transportieren) + '</th><th>' + formatZahl(kris_transportieren) + '</th><th>' + formatZahl(deut_transportieren) + '</th></tr>';
	ausgabe += '<tr><th class="c"><b><font color="lime">Gesamt:</font></b></th><th class="c"><b><font color="lime">' + formatZahl(met_gesamt) + '</font></b></<th><th class="c"><b><font color="lime">' + formatZahl(kris_gesamt) + '</font></b></th><th class="c"><b><font color="lime">' + formatZahl(deut_gesamt) + '</font></b></th></tr>';

	center = document.createElement('center');
	neue_tabelle = document.createElement('table');
	neue_tabelle.setAttribute('width',tabellenBreite);
	neue_tabelle.innerHTML = ausgabe;
	pagebreak = document.createElement('p');
	pagebreak.innerHTML = '&nbsp;';
	pagebreak2 = document.createElement('p');
	pagebreak2.innerHTML = '&nbsp;';
	center.appendChild(pagebreak);
	center.appendChild(neue_tabelle);
	center.appendChild(pagebreak2);
	if (met_gesamt != 0 || kris_gesamt != 0 || deut_gesamt != 0) document.getElementsByTagName('body')[0].appendChild(center);
}

// Veraenderungen im Orbit
if (url.indexOf('galaxy') != -1) {
	function Tastendruck (Ereignis) {
		if (!Ereignis) Ereignis = window.event;
		// nach links
		if (Ereignis.keyCode == 37) {
			galadoit("systemLeft");
		}
		// nach oben
		if (Ereignis.keyCode == 38) {
			galadoit("galaxyRight");
		}
		// nach rechts
		if (Ereignis.keyCode == 39) {
			galadoit("systemRight");
		}
		// nach unten
		if (Ereignis.keyCode == 40) {
			galadoit("galaxyLeft");
		}
		// Mit "Enter" aktualisieren
		if (Ereignis.keyCode == 13) {
			document.forms[0].submit();
		}
	}
	unsafeWindow.addEventListener("keypress",Tastendruck,false);
	// NNG interne Javascript Funktion; 1zu1 uebernommen, da es den Wechsel im Orbit sehr vereinfacht
	function galadoit (value) {
		document.getElementById('auto').name = value;
		document.getElementById('galaxy_form').submit();
	}

	// Tabellen-Breite
	tabellen = document.getElementsByTagName('table');
	for (f7 = 0; f7<tabellen.length; f7++) {
		if (tabellen[f7].getAttribute('width') == "569") {
			tabellen[f7].setAttribute('width',"" + tabellenBreite);
		}
	}

	// Spionage-Button von befreundeten Allianzen/Spielern entfernen oder wenn ein Spieler im Urlaubsmodus oder gesperrt ist
	var zeilen = document.getElementsByTagName('tr');
	for (i = (8+6); i < (23+6); i++) {
		del = false;
		zeile = zeilen[i].innerHTML;
		// alert(zeile);
		if (zeile.indexOf('title="') != -1 && zeile.indexOf('hat') != -1 && zeile.indexOf('Mitglied') != -1) {
			ausdruck = /title=.(.*)\shat.*Mitglied.*>(.*)<\/a>/i;
			ergebnis = ausdruck.exec(zeile);
			erg = ergebnis[1].toLowerCase();
			erg2 = ergebnis[2].toLowerCase();
			if (befreundeteAllianzen.indexOf(erg) != -1 || befreundeteAllianzen.indexOf(erg2) != -1) {
				del = true;
			}
		}
		if (zeile.indexOf('title="Spieler') != -1 && zeile.indexOf('auf Platz') == -1) {
			ausdruck = /title=.Spieler\s(.*)\s\s"\salt/i;
			ergebnis = ausdruck.exec(zeile);
			erg = ergebnis[1].toLowerCase();
			if (befreundeteSpieler.indexOf(erg) != -1) {
				del = true;
			}
		}
		if (zeile.indexOf('title="Spieler') != -1 && zeile.indexOf('auf Platz') != -1) {
			ausdruck = /title=.Spieler\s(.*)\sauf\sPlatz.*"\salt/i;
			ergebnis = ausdruck.exec(zeile);
			erg = ergebnis[1].toLowerCase();
			if (befreundeteSpieler.indexOf(erg) != -1) {
				del = true;
			}
		}
		if (zeile.indexOf('class="banned"') != -1 || zeile.indexOf('class="vacation"') != -1 || zeile.indexOf('span style="color: red;">s</span') != -1) {
				del = true;
		}
		
		if (del) {
			ausdruck = /<a.*style=.cursor:.*pointer.*><img src=.*e\.gif.*alt=.Spionieren.*title=.Spionieren.*><\/a>/i;
			zeile = zeile.replace(ausdruck,"");
			zeilen[i].innerHTML = zeile;
		}
	}
}

// Kommandobruecke
if (url.indexOf('imperium') != -1) {
	trs = document.getElementsByTagName('tr');
	anzahlPlaneten = 0;
	ges_met_prod = 0;
	ges_kris_prod = 0;
	ges_deut_prod = 0;
	for (f17 = 7; f17<trs.length; f17++) {
		zeile = trs[f17];
		if (anzahlPlaneten == 0) anzahlPlaneten = Math.floor(zeile.childNodes.length / 4);
		//Felder (Tooltip entfernen)
		if (zeile.childNodes[1].innerHTML == "Felder") {
			for (f18 = 1; f18<=anzahlPlaneten; f18++) {
				
				zeile.childNodes[(1+(f18*4))].removeAttribute('style');
				zeile.childNodes[(1+(f18*4))].removeAttribute('onmouseover');
				zeile.childNodes[(1+(f18*4))].removeAttribute('onmouseout');
			}
		}
		//Gesamt-Ressourcen
		if (zeile.childNodes[1].innerHTML == "Metall" || zeile.childNodes[1].innerHTML == "Kristall" || zeile.childNodes[1].innerHTML == "Deuterium") {
			ress = 0;
			produktion = 0;
			for (f18 = 1; f18<=anzahlPlaneten; f18++) {
				ress += parseInt(zeile.childNodes[(1+(f18*4))].childNodes[0].innerHTML.replace(/\./g,''));
				produktion += parseInt(zeile.childNodes[(1+(f18*4))].innerHTML.replace(/\s/g,'').replace(/<a.*href.*a>\//,'').replace(/\./g,''));
			}
			if (zeile.childNodes[1].innerHTML == "Metall") ges_met_prod = produktion;
			if (zeile.childNodes[1].innerHTML == "Kristall") ges_kris_prod = produktion;
			if (zeile.childNodes[1].innerHTML == "Deuterium") ges_deut_prod = produktion;
			zeile.childNodes[1].innerHTML += '<br><span style="color:orange;white-space:nowrap;">&sum; ' + formatZahl(ress) + ' / &sum; ' + formatZahl(produktion*10) + '</span>';
		}
		trs[7].childNodes[1].innerHTML = '<b>Gesamte Tagesproduktion</b><br><br>Metall:<br><span style="color:orange;white-space:nowrap;">' + formatZahl(ges_met_prod*24) + '</span><br>Kristall:<br><span style="color:orange;white-space:nowrap;">' + formatZahl(ges_kris_prod*24) + '</span><br>Deuterium:<br><span style="color:orange;white-space:nowrap;">' + formatZahl(ges_deut_prod*24) + '</span>';
		//Gebaeude-Durchschnitt
		if (zeile.innerHTML.indexOf("mine") != -1
			|| zeile.innerHTML.indexOf("Deuteriumsynthetisierer") != -1
			|| zeile.innerHTML.indexOf("kraftwerk") != -1
			|| zeile.innerHTML.indexOf("fabrik") != -1
			|| zeile.innerHTML.indexOf("Raumschiffwerft") != -1
			|| zeile.innerHTML.indexOf("speicher") != -1
			|| zeile.innerHTML.indexOf("Deuteriumtank") != -1
			|| zeile.innerHTML.indexOf("Forschungslabor") != -1
			|| zeile.innerHTML.indexOf("Terraformer") != -1
			|| zeile.innerHTML.indexOf("Allianzdepot") != -1
			|| zeile.innerHTML.indexOf("Intergalaktisches Forschungsnetzwerk") != -1
			|| zeile.innerHTML.indexOf("Raketensilo") != -1) {
			stufe = 0;
			for (f18 = 1; f18<=anzahlPlaneten; f18++) {
				if (zeile.childNodes[(3+(f18*4))].childNodes[0].innerHTML != null) {
					stufe += parseInt(zeile.childNodes[(3+(f18*4))].childNodes[0].innerHTML);
				}
			}
			if (stufe != 0) {
				stufe = '' + (stufe/anzahlPlaneten);
				stufe = stufe.replace(/\./,',');
				stufe = stufe.substring(0,stufe.indexOf(',')+3);
			}
			zeile.childNodes[3].innerHTML += '<br><span style="color:orange;white-space:nowrap;">&Oslash; ~' + stufe + '</span>';
		}
		//Gesamt-Schiffe / Schiffe-Durschnitt
		if (zeile.innerHTML.indexOf("Transporter") != -1
			|| zeile.innerHTML.indexOf("Jäger") != -1
			|| zeile.innerHTML.indexOf("reuzer") != -1
			|| zeile.innerHTML.indexOf("Schlachtschiff") != -1
			|| zeile.innerHTML.indexOf("Kolonieschiff") != -1
			|| zeile.innerHTML.indexOf("Recycler") != -1
			|| zeile.innerHTML.indexOf("Spionagesonde") != -1
			|| zeile.innerHTML.indexOf("Bomber") != -1
			|| zeile.innerHTML.indexOf("Solarsatellit") != -1
			|| zeile.innerHTML.indexOf("Zerstörer") != -1
			|| zeile.innerHTML.indexOf("Todesstern") != -1) {
			anzahl = 0;
			for (f18 = 1; f18<=anzahlPlaneten; f18++) {
				if (zeile.childNodes[(3+(f18*4))].childNodes[0].innerHTML != null) {
					anzahl += parseInt(zeile.childNodes[(3+(f18*4))].childNodes[0].innerHTML.replace(/\./g,''));
				}
			}
			if (anzahl != 0) {
				anzahl2 = Math.round(anzahl/anzahlPlaneten);
			} else {
				anzahl2 = 0;
			}
			zeile.childNodes[3].innerHTML += '<br><span style="color:orange;white-space:nowrap;">&sum; ' + formatZahl(anzahl) + ' / &Oslash; ~' + formatZahl(anzahl2) + '</span>';
		}
		//Gesamt-Verteidigung / Verteidigung-Durschnitt
		if (zeile.innerHTML.indexOf("werfer") != -1
			|| zeile.innerHTML.indexOf("geschütz") != -1
			|| zeile.innerHTML.indexOf("Gaußkanone") != -1
			|| zeile.innerHTML.indexOf("Schildkuppel") != -1
			|| zeile.innerHTML.indexOf("rakete") != -1) {
			anzahl = 0;
			for (f18 = 1; f18<=anzahlPlaneten; f18++) {
				if (zeile.childNodes[(3+(f18*4))].childNodes[0].innerHTML != null) {
					anzahl += parseInt(zeile.childNodes[(3+(f18*4))].childNodes[0].innerHTML.replace(/\./g,''));
				}
			}
			if (anzahl != 0) {
				anzahl2 = Math.round(anzahl/anzahlPlaneten);
			} else {
				anzahl2 = 0;
			}
			zeile.childNodes[3].innerHTML += '<br><span style="color:orange;white-space:nowrap;">&sum; ' + formatZahl(anzahl) + ' / &Oslash; ~' + formatZahl(anzahl2) + '</span>';
		}
	}
}

// Laufschrift duch nicht beweglichen Text ersetzen (Text bleibt der gleiche)
if (document.getElementsByTagName('body')[0].innerHTML.indexOf('marquee') != -1) {
	laufschrift = document.getElementsByTagName('marquee')[0].innerHTML;
	laufschrift_center = document.createElement('center');
	laufschrift_center.innerHTML = '<div style="width:' + tabellenBreite + 'px;color:orange;font-weight:bold;">' + laufschrift + '</div>';
	document.getElementsByTagName('marquee')[0].parentNode.replaceChild(laufschrift_center, document.getElementsByTagName('marquee')[0]);
}