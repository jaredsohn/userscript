// ==UserScript==
// @name           6_Recursos Mejorados y Lista Planetas
// @author         Emilio, J.A. y Shuko
// @date           18-1-2008
// @version        1.0
// @namespace      OGame Pantalla de Recursos Ampliada FINAL
// @description    Pantalla de Recursos Ampliada.
// @include        http://*ogame*
// ==/UserScript==



// ****************
// ****************
// ****************
// ****************
// ****************
// ****************
// SCRIPT LISTA PLANETAS
// ****************
// ****************
// ****************
// ****************
// ****************
// ****************
// ****************
// ****************
// ****************





/*
http://userscripts.org/scripts/show/44431
*/
//---------------------------------------------------------------------------------------------------------------------------------------------------

/********************
* Grundeinstellungen
********************/


if (document.location.href.indexOf('http://uni1.mx.ogame.org/game/index.php?page=overview') != 0)
	{ }
	else
	{

var ogs_init; //ie support

if (ogs_init != true)
{
	ogs_init = true;

	var ogs = new Object();
	//functionen anbinden
	ogs.save = ogs_save;
	ogs.load = ogs_load;
	ogs.version = ogs_version;
	ogs.getLink = ogs_getLink;
	ogs.setTextArea = ogs_setTextArea;
	ogs.getTextArea = ogs_getTextArea;
	ogs.addEvent = ogs_addEvent;
	ogs.getKosten = ogs_getKosten;
	ogs.getEnergie = ogs_getEnergie;
	ogs.debug = ogs_debug;
	ogs.addOverLib = ogs_addOverLib;

	//dom or doom?!?
	ogs.dom = new Object();
	ogs.dom.newElement = ogs_dom_NeuesElement;
	ogs.dom.insertBehind = ogs_dom_EinfuegenHinter;
	ogs.dom.removeElement = ogs_dom_Loesche;
	ogs.dom.getCEBF = ogs_dom_getCEBF;
	ogs.dom.getEBF = ogs_dom_getEBF;

	//array functions
	ogs.array = new Object();
	ogs.array.dropElement = ogs_array_dropElement;
	ogs.array.getElement = ogs_array_getElement;
	ogs.array.split = ogs_split;
	ogs.array.join = ogs_join;

	//zeit
	ogs.time = new Object();
	ogs.time.einlesen = ogs_LeseZeit;
	ogs.time.now = ogs_getTime;
	ogs.time.duration = ogs_aTimeDuration;
	ogs.time.stamp = ogs_time_stamp;
	ogs.time.toString = ogs_ZeitFormatieren;

	//Startzeit des Skripts
	ogs.start = new Object();
	ogs.start.time = new Date();

	//anzahl startversuche und wartezeit
	ogs.start.versuche = 0;
	ogs.start.versuche_max = 10;
	ogs.start.versuche_warte = 2500;

	//zeitdifferenz zur lokalen Uhrzeit
	ogs.zeitdifferenz = 0;

	//browser support herstellen
	ogs.browser = '';

	if (typeof GM_getValue != 'undefined') // firefox GM plugin
	{
		ogs.browser = 'ff';
		ogs.window = unsafeWindow;
	}


	ogs.addStyle = function (text) //stylehinzufuegen anpassen
	{
		if (ogs.browser == 'ff')
			GM_addStyle(text);
		else
			PRO_addStyle(text,unsafeWindow);
	}

	//binding
	ogs.bound = new Object(); //bound bindet die funktion nur fuer den externen aufruf (z.b. eine onclick) durch den browser in firefox
	ogs.bind = function(name, func){eval('ogs.' + name + ' = func; ogs.bound.' + name + ' = func;');}; //bind bindet die funktion fuer externen aufruf und gleichzeitig an das hier verwendete ogs object
	unsafeWindow.ogs = ogs.bound;
	window.ogs = ogs;

	// Speicher Variablen
	var settingsglobalcur = new Array();
	var settingsglobaldef = new Array();
	var settingscur = new Array();
	var settingsdef = new Array();

	// zusaetzlich in das ogs Object einbinden
	ogs.settings = new Object();
	ogs.settings.global = new Object();
	ogs.settings.global.cur = settingsglobalcur;
	ogs.settings.global.def = settingsglobaldef;
	ogs.settings.cur = settingscur;
	ogs.settings.def = settingsdef;

	// Globale Grundwerte
	settingsglobaldef['selectuniverse'] = true;
	settingsglobaldef['version'] = 10000;
	settingsglobaldef['gpl'] = 0;
	settingsglobaldef['fokusonlogin'] = true;
	settingsglobaldef['ogs_language'] = 'de&de|';

	// aktuelle Versionsnummer abspeichern
	ogs.save('version', 10607);

	// Account Grundwerte
	settingsdef['skript_online'] = true;
	settingsdef['galaxietool'] = false;
	settingsdef['colored_ress'] = true;
	settingsdef['skin_advance'] = true;
	settingsdef['merkliste'] = '';
	settingsdef['kein_deut'] = false;
	settingsdef['fehlress_als_text'] = true;
	settingsdef['flotten_zusatz'] = true;
	settingsdef['flotten_faerben'] = true;
	settingsdef['color_met'] = '#FF8800';
	settingsdef['color_kris'] = '#55B4DD';
	settingsdef['color_deut'] = '#99ABCC';
	settingsdef['color_eng'] = '#F0D899';
	settingsdef['transbuild'] = true;
	settingsdef['max_tab_breite'] = 519;
	settingsdef['skriptcolor'] = '#C0C0C0';
	settingsdef['tf_limit'] = 20000;
	settingsdef['tf_color'] = 'red';
	settingsdef['platz_anzeige'] = true;
	settingsdef['endzeiten'] = false;
	settingsdef['zeit_links'] = false;
	settingsdef['ang_zeit'] = true;
	settingsdef['ankft_zeit'] = true;
	settingsdef['schiffs_geschw'] = true;
	settingsdef['fltmenu_buttons'] = true;
	settingsdef['auto_auftrag'] = true;
	settingsdef['stationieren_vorz'] = false;
	settingsdef['allyplatz_anzeige'] = true;
	settingsdef['bewegteress'] = true;
	settingsdef['pranger'] = false;
	settingsdef['warnung'] = false;
	settingsdef['kursmet'] = '3';
	settingsdef['kurskris'] = '2';
	settingsdef['kursdeut'] = '1';
	settingsdef['handelsrechner'] = false;
	settingsdef['ml_sort'] = true;
	settingsdef['ml_typ'] = '3';
	settingsdef['ml_art'] = '0';
	settingsdef['head_fix'] = false;
	settingsdef['def_plani'] = 0;

	settingsdef['temperatur'] = '';


	//overview
	settingsdef['overview_planetenliste'] = 1;
	settingsdef['zeit_diff'] = 0;
	settingsdef['zeitverschiebung'] = 0;
	settingsdef['zeitverschiebung_auto'] = true;

	//farmliste default werte
	settingsdef['farmliste_aktiv'] = false;
	settingsdef['farmliste_liste'] = '';


	//menü links
	settingsdef['menu_link_enable'] = false;
	settingsdef['menu_link_liste'] = 'Owiki&http://www.owiki.de/|';
	settingsdef['menu_link_pos'] = -1;
	settingsdef['menu_mode'] = 0;
	settingsdef['flotte_flugpos_enable'] = false;


	// Schneide Leerzeichen vor/nach dem String weg
	String.prototype.trim = function() { return this.replace(/^\s*|\s*$/g, ''); };

	// enthaelt die infos was grade angezeigt wird und dergleichen
	ogs.ogame = new Object();

	// seite welche grade dargestellt wird flotte2 galaxy overview
	ogs.ogame.page = document.URL.match(/\/game\/index.php\?page=([a-zA-Z0-9_\-\/]+)&/);
	ogs.ogame.page = ogs.ogame.page ? ogs.ogame.page[1] : '';

	// Daten laden
	ogs.ogame.server = document.URL.match(/http:\/\/([0-9a-zA-Z\-\._]+)\//)[1]; // aktueller OGame-Server
	ogs.ogame.sid = document.URL.match(/session=([0-9a-zA-Z]+)/); // Session-ID des Users
	ogs.ogame.sid = ogs.ogame.sid ? ogs.ogame.sid[1] : '';
	ogs.ogame.serversprache = ogs.ogame.server.replace(/.*\./,'');


	// wird noch geladen
	ogs.ogame.hpid = 0;		// zum Speichern der HP-ID
	ogs.planetliste = 0;	// Planetenliste aus der SelectBox erstellt

	// Plani-Typen (entsprechen den IDs in OGame)
	ogs.planettype = new Object();
	ogs.planettype.planet = 1;
	ogs.planettype.tf = 2;
	ogs.planettype.mond = 3;

	//Skripttextfarbe
	ogs.textfarbe = settingsdef['skriptcolor'];

	// Umlaute
	var ae = '\u00E4';	var oe = '\u00F6';	var ue = '\u00FC';
	var Ae = '\u00C4';	var Oe = '\u00D6';	var Ue = '\u00DC';
	var sz = '\u00DF';

	// hilfswerte um z.b. die farmliste anzuzeigen / ogs setup
	ogs.neueseite = new Object();
	ogs.neueseite.user = '';	  //enthält den namen wer die seite zurzeit benützt z.b. 'farmliste' und *sperrt* somit den zugriff für andere nur frei wenn '' leer.
	ogs.neueseite.orginal = null; //link auf das element das augeblendet wird
	ogs.neueseite.neu = null;	  //link auf das element was angezeigt wird

	// Sprachdaten erstellen
	ogs.lang = new Object();
	ogs.lang.skript = -1; //sprachdaten skript
	ogs.lang.ogame = -1;  //sprachdaten ogame
	ogs.lang.all = ogs.array.split(ogs.load('ogs_language'),'|','&'); //aktuelle einstellungen aller sprachgebiete
	ogs.lang.cur = ogs.array.getElement(ogs.lang.all,ogs.ogame.serversprache,'de',0,1); //aktuelle einstellung der sprache des unis	
	ogs.lang.data = new Array(); //alle sprachdaten aller sprachen

	if (typeof unsafeWindow.ogs_lang != 'undefined')
	{
		ogs.lang.data = unsafeWindow.ogs_lang;
		
		for(lng in ogs.lang.data)
		{
			if (ogs.lang.cur == ogs.lang.data[lng]['id'])
			{
				ogs.lang.skript = ogs.lang.data[lng]['skript'];
			}
			if (ogs.ogame.serversprache == ogs.lang.data[lng]['url'])
			{
				ogs.lang.ogame = ogs.lang.data[lng]['ogame']; 
			}
		}
	}
	unsafeWindow.ogs_lang = false;

	var resUni = exp('res',new Array('Metall', 'Kristall', 'Deuterium', 'Energie'));
	var resOGS = txt('res',new Array('Metall', 'Kristall', 'Deuterium', 'Energie'));

	ogs.time.wochentage = txt('wochentage',new Array('So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa')); // Namen der Wochentage
	ogs.time.monate = txt('monate',new Array('Jan', 'Feb', 'M&auml;r', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez')); // Namen der Monate

	// Homepage Url
	ogs.homepage = txt('hpurl','http://www.ogame-skript.com/de/');

	// Buffer für Energiewerte
	var EnergieBuffer = new Array();




	//*******************
	// Script starten...
	//*******************

	// Es muesen alle Seiten einen page Eintrag und eine ogs.ogame.sid haben
	if (ogs.ogame.sid == '' || ogs.ogame.page == '')
	{
		if (!(document.URL.indexOf('ainfo.php?') + 1)) //auf ally info nix machen
		{
			ogs_startpage(); //startseite bearbeiten
		}
	}
	else
	{
		startup();  //skript starten

		var vBody = document.getElementsByTagName('body');
		
		if (vBody.length)
		{
			vBody[0].style.overflow = 'visible';
			
			//hintergrundbild hinzufuegen
			if (ogs.load('hintergrundbild_use'))
			{
				ogs.load('hintergrundbild_url')
				if (settingscur['hintergrundbild_url'].toLowerCase().trim() == 'none')
				{
					vBody[0].style.backgroundImage = 'none';
				}
				else if (settingscur['hintergrundbild_url'].trim() == '')
				{
					vBody[0].style.backgroundImage = 'none';
				}
				else
				{
					vBody[0].style.backgroundImage = 'url(' + settingscur['hintergrundbild_url'].trim() + ')';
				}
			}
		}
	}
}}

/***********************************
* Funktionsabsatz - HilfsFunktionen
***********************************/

// Verwandelt den uebergebenen Text in eine Ganzzahl
function InInt(Text)
{
	Text = Text.replace(/<[^<>]*>/g, '').replace(/[^0-9\-]/g, ''); // nicht-Ziffern entfernen
	return parseInt(Text, 10); // als Zahl zurueckgeben
}

// Tausenderpunkte
function TausenderZahl(z, showPlus)
{
	var negativ = false;
	
	if (z < 0)
	{
		negativ = true;
		z = z * -1;
	}
	
	z = String(Number(z));
	var i = z.length % 3;
	
	if (!i)
	{ 
		i = 3;
	}
	
	var erg = z.substr(0, i);
	
	for (; i < z.length; i += 3)
	{
		erg += '.' + z.substr(i, 3);
	}
	
	if (negativ == false)
	{
		if (showPlus == true)
		{
			erg = '+' + erg;
		}
	}
	else
	{
		erg = '-' + erg;
	}
	
	return erg;
}


//--------------------------------
// Hier Startes das Hauptskript
//--------------------------------
function ogameskript()
{

	
	if (ogs.ogame.page == 'overview')
	{
		// Differenz Serverzeit <-> lokale Zeit bestimmen
		var ZeitZelle = ogs.dom.getEBF(document, 'th','colSpan == 3')[0];
		var ServerZeit = ogs.time.einlesen(ZeitZelle.firstChild.nodeValue);
		ogs.zeitdifferenz = (ogs.start.time.getTime() - ServerZeit.getTime());
		ogs.save('zeit_diff', '' + ogs.zeitdifferenz);
		
		//zeitverschiebung automatisch gerechnet werden soll
		if (ogs.load('zeitverschiebung_auto'))
		{
			//erste zeitangabe in der übersicht finden
			var firstTimer = document.getElementById('bxx1');
			if (firstTimer)
			{
				//endzeit (star) und restflugzeit (title) einlesen
				var star = firstTimer.getAttribute('star');
				var title = firstTimer.getAttribute('title');
				
				//rechnet die verzoegerung in halben stunden aus
				var verz = Math.round((Math.round(ogs.time.now().getTime() / 1000) - (star - title + parseInt(ogs.load('zeitverschiebung'),10) * 60)) / 1800);
				if (verz != 0)
				{
					if (confirm(txt('o_1','Es wurde festgestellt dass die Zeitverschiebung um #*1*# Minuten falsch eingestellt ist. Soll diese Einstellung behoben werden?\n(Diese Meldung kann im OGS-Setup unter "Allgemein" => "Auto Zeitverschiebung" abgestellt werden.)',verz * 30)))
					{
						ogs.save('zeitverschiebung', verz * 30 + parseInt(ogs.load('zeitverschiebung'),10));
					}
				}
			}
		}
	}
	
	//------------------
	// allgemeines Zeug
	//------------------
	// Ersatz fuer fruehere Body Var
	// oGame v0.77 content fix (original by xsign.dll) + leftmenu fix
	var ContDiv = document.getElementById('content');
	var LeftDiv = document.getElementById('menu');
	
	

	// Loeschen von <br><br><br><br> im oGame v0.77b Design
	var ContDivBr1 = ogs.dom.getCEBF(ContDiv,'center');
	
	if (ContDivBr1.length > 0)
	{
		var ContDivBr = ogs.dom.getCEBF(ContDivBr1[0], 'br');
		for (var i = 0; i < ContDivBr.length; i++)
		{
			ogs.dom.removeElement(ContDivBr[i]);
		}
		
		ContDivBr1 = ogs.dom.getCEBF(ContDivBr1[0],'center');
		if (ContDivBr1.length > 0)
		{
			ContDivBr = ogs.dom.getCEBF(ContDivBr1[0], 'br');
			for (var i = 0; i < ContDivBr.length; i++)
			{
				ogs.dom.removeElement(ContDivBr[i]);
			}
			
			ContDivBr1 = ogs.dom.getCEBF(ContDivBr1[0],'form');
			if (ContDivBr1.length > 0)
			{
				ContDivBr = ogs.dom.getCEBF(ContDivBr1[0], 'br');
				for (var i = 0; i < ContDivBr.length; i++)
				{
					ogs.dom.removeElement(ContDivBr[i]);
				}
			}
		}
	}
	



	//-----------------------
	// Uebersicht verbessern
	//-----------------------
	if (ogs.ogame.page == 'overview')
	{
				
		var tab = ogs.dom.getEBF(ContDiv,'table','width == 519');
		
		if (tab.length > 0)
		{
			var row = tab[0].rows;
			
			for (var i = row.length -1; i > -1; i--)
			{
				if (row[i].cells.length == 2)
				{
					var temp = row[i].cells[1].innerHTML.match(/([\-0-9]+)°C.* ([\-0-9]+)°C/);
					
					if (temp)
					{
						temp = temp[2];
						var temperatur = ogs.array.split(ogs.load('temperatur'),'|','&');
						
						for (var i = 0; i < temperatur.length; i++)
						{
							for (var ii = 0; ii < ogs.planetliste.length; ii++)
							{
								if (temperatur[i][0] == ogs.planetliste[ii]['ID'])
								{
									break;
								}
							}
							
							if (ii >= ogs.planetliste.length)
							{
								temperatur.splice(i,1);
							}
							else if (temperatur[i][0] == ogs.planetliste[0]['Aktiv']['ID'])
							{
								temperatur.splice(i,1);
							}
						}
						
						temperatur.push(new Array(ogs.planetliste[0]['Aktiv']['ID'], temp));
						ogs.save('temperatur',ogs.array.join(temperatur,'|','&'));
						break;
					}
				}
			}
		}
			

		if (ogs.load('overview_planetenliste') != 0)
		{
			// Versieht die Uebersicht mit weiteren Links
			var Bilder = ogs.dom.getEBF(ContDiv, 'img', 'src.indexOf("/planeten/") >= 0'); // Alle Bilder in einem Link in einer Titelzelle finden
			var uinfos = Array();
			var PlaniID = null;
			
			for (var i = 0; i < Bilder.length; i++) // und diese Bilder bearbeiten
			{
				if (Bilder[i].src.indexOf('/planeten/small/') +1)
				{
					//bei allen bildern ausser dem mond
					if (!(Bilder[i].src.indexOf('/planeten/small/s_mond.jpg') + 1))
					{
						//plani id suchen
						PlaniID = Bilder[i].parentNode.href.match(/cp=([0-9]+)/);
						if (PlaniID.length == 0) continue;

						PlaniID = 'P'+PlaniID[1];
						uinfos[PlaniID] = new Array();
						uinfos[PlaniID]['Bau'] = ogs.dom.getCEBF(Bilder[i].parentNode.parentNode,'center')[0].innerHTML.replace(/<.*>/,'').trim(); // + remove html tag
						uinfos[PlaniID]['Bild+'] = Bilder[i].src.replace('/small/s_','');
						uinfos[PlaniID]['Bild-'] = Bilder[i].src;
					}
				}
				else
				{
					PlaniID = 'P'+ogs.planetliste[0]['Aktiv']['ID'];
					uinfos[PlaniID] = new Array();
					uinfos[PlaniID]['Bau'] = ogs.dom.getCEBF(Bilder[i].parentNode,'center')[0].innerHTML.split('<')[0].trim(); // + remove html tag
					uinfos[PlaniID]['Bau'] = uinfos[PlaniID]['Bau'].replace(/\([0-9]*\)/,'');
					uinfos[PlaniID]['Bild+'] = Bilder[i].src;
					uinfos[PlaniID]['Bild-'] = Bilder[i].src.replace('/planeten/','/planeten/small/s_');
				}
			}
			
			var tab = ogs.dom.getEBF(ContDiv,'table','width == 519');
			
			if (tab.length > 0)
			{
				var row = tab[0].rows;
				
				for (var i = 0; i < row.length; i++)
				{
					if (row[i].cells.length == 3)
					{
						break;
					}
				}
				
				if (ogs.load('overview_planetenliste') == 1) // mini bilder liste
				{
					row = row[i].cells[2];
					var code = '<center><table>';

					for (var i = 1; i < ogs.planetliste.length; i++)
					{
						if (ogs.planetliste[i]['Typ'] == 1)
						{
							code += '<tr>';
							code += '<th rowspan="2"><a href="/game/index.php?page=overview&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['ID'] + '"><img src="' + uinfos['P' + ogs.planetliste[i]['ID']]['Bild-'] + '" alt="" style="width: 30px; height: 30px;" /></a></th>';
							if (ogs.planetliste[i]['Partner'])
								code += '<th rowspan="2"><a href="/game/index.php?page=overview&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['Partner']['ID'] + '"><img src="' + uinfos['P' + ogs.planetliste[i]['ID']]['Bild-'].replace(/\/small\/s_.*\.jpg/,'/small/s_mond.jpg') + '" alt="" style="width: 30px; height: 30px;" /></a></th>';
							else
								code += '<th rowspan="2">-</th>'
							code += '<th><a href="/game/index.php?page=overview&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['ID'] + '">' + ogs.planetliste[i]['Name'] + '</a></th>';
							if (ogs.planetliste[i]['Partner'])
								code += '<th><a href="/game/index.php?page=galaxy&galaxy=' + ogs.planetliste[i]['Gala'] + '&system=' + ogs.planetliste[i]['Sys'] + '&position=' + ogs.planetliste[i]['Pos'] + '&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['Partner']['ID'] + '">[' + ogs.planetliste[i]['Gala'] + ':' + ogs.planetliste[i]['Sys'] + ':' + ogs.planetliste[i]['Pos'] + ']</a></th>';
							else
								code += '<th><a href="/game/index.php?page=galaxy&galaxy=' + ogs.planetliste[i]['Gala'] + '&system=' + ogs.planetliste[i]['Sys'] + '&position=' + ogs.planetliste[i]['Pos'] + '&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['ID'] + '">[' + ogs.planetliste[i]['Gala'] + ':' + ogs.planetliste[i]['Sys'] + ':' + ogs.planetliste[i]['Pos'] + ']</a></th>';
							code += '</tr><tr><th colspan="2"><a href="/game/index.php?page=b_building&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['ID'] + '" style="font-size: smaller;">' + uinfos['P' + ogs.planetliste[i]['ID']]['Bau'] + '</a></th>';
							code += '</tr>';
						}
					}
					
					row.innerHTML = code + '<table></center>';
				}
				else if (ogs.load('overview_planetenliste') == 2) // modus nur liste
				{
					row = row[i].cells[2];
					var code = '<center><table>';

					code += '<tr><td class="c">Pos</td><td class="c">Planet</td><td class="c">Bau</td><td class="c">Mond</td></tr>';

					for (var i = 1; i < ogs.planetliste.length; i++)
					{
						if (ogs.planetliste[i]['Typ'] == 1)
						{
							code += '<tr>';
							if (ogs.planetliste[i]['Partner'])
								code += '<th><a href="/game/index.php?page=galaxy&galaxy=' + ogs.planetliste[i]['Gala'] + '&system=' + ogs.planetliste[i]['Sys'] + '&position=' + ogs.planetliste[i]['Pos'] + '&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['Partner']['ID'] + '">[' + ogs.planetliste[i]['Gala'] + ':' + ogs.planetliste[i]['Sys'] + ':' + ogs.planetliste[i]['Pos'] + ']</a></th>';
							else
								code += '<th><a href="/game/index.php?page=galaxy&galaxy=' + ogs.planetliste[i]['Gala'] + '&system=' + ogs.planetliste[i]['Sys'] + '&position=' + ogs.planetliste[i]['Pos'] + '&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['ID'] + '">[' + ogs.planetliste[i]['Gala'] + ':' + ogs.planetliste[i]['Sys'] + ':' + ogs.planetliste[i]['Pos'] + ']</a></th>';
							code += '<th><a href="/game/index.php?page=overview&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['ID'] + '">' + ogs.planetliste[i]['Name'] + '</a></th>';
							code += '<th><a href="/game/index.php?page=b_building&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['ID'] + '">' + uinfos['P' + ogs.planetliste[i]['ID']]['Bau'] + '</a></th>';
							if (ogs.planetliste[i]['Partner'])
								code += '<th><a href="/game/index.php?page=overview&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[i]['Partner']['ID'] + '">' + ogs.planetliste[i]['Partner']['Name'] + '</a></th>';
							else
								code += '<th>-</th>'
							code += '</tr>';
						}
					}
					
					row.innerHTML = code + '<table></center>';
				}
			}
		}
		else //verbessert die ogame eigene Uebersicht
		{
			// Finde den Plani mit dieser ID
			function FindePlaniMitID(ID)
			{
				for (var i = 1; i < ogs.planetliste.length; i++) // alle Planeten durchgehen
				{
					if (ogs.planetliste[i]['ID'] == ID) return ogs.planetliste[i]; // falls die ID stimmt, zurueckgeben
				}
				
				return 0; // nichts zurueckgeben
			}
			
			var Bilder = ogs.dom.getEBF(ContDiv, 'img', 'src.indexOf("/planeten/") >= 0'); // Alle Bilder in einem Link in einer Titelzelle finden
			
			for (var i = 0; i < Bilder.length; i++) // und diese Bilder bearbeiten
			{
				if (Bilder[i].src.indexOf('/planeten/small/') +1)
				{
					var Knoten = Bilder[i].parentNode; // den Link selbst bearbeiten
					var PlaniID = Knoten.href.match(/cp=([0-9]+)/); // PlaniID holen
					if (PlaniID.length == 0) { continue; } // falls keine drin ist - raus
					PlaniID = PlaniID[1];
					
					if (!(Bilder[i].src.indexOf('/planeten/small/s_mond.jpg') + 1))
					{
						// Link ins Gebaeudemenue
						var TextKn = ogs.dom.getCEBF(Knoten.parentNode,'center')[0]; // Das Center-Tag beinhaltet den Text
						TextKn.insertBefore(ogs.dom.newElement('a', TextKn.firstChild.nodeValue.trim(), 'href', '/game/index.php?page=b_building&session=' + ogs.ogame.sid + '&cp=' + PlaniID), TextKn.firstChild); // Den Link vor dem Text einfuegen
						TextKn.removeChild(TextKn.childNodes[1]); // den Text loeschen
					}
					
					var TextKn = Knoten.parentNode;
					var Link = ogs.dom.newElement('span', TextKn.firstChild.nodeValue.trim());
					// Default-Plani markieren
					if (PlaniID == ogs.planetliste[0]['Def']['ID']) Link.style.color = '#87ceeb';
					TextKn.insertBefore(Link, TextKn.firstChild); // Den Link vor dem Text einfuegen
					TextKn.removeChild(TextKn.childNodes[1]); // den Text loeschen
					
					// Mond-Link
					var Plani = FindePlaniMitID(PlaniID);
					var Partner = Plani['Partner']; // Das ist der Mond zum Plani, falls vorhanden
					
					if (Plani && Plani['Partner'] && !Plani['Aktiv'] && !Partner['Aktiv']) // falls der Plani gefunden wurde und dieser Plani nen Mond hat und wir nicht auf diesem Mond sind, und auch nicht beim aktiven Plani
					{
						var MondLink = ogs.dom.newElement('a', Partner['Name'], 'href', '/game/index.php?page=overview&session=' + ogs.ogame.sid + '&cp=' + Partner['ID']); // Link erzeugen
						if (Partner['ID'] == ogs.planetliste[0]['Def']['ID']) MondLink.style.color = '#87ceeb'; // Default-Mond markieren
						var Text = ogs.dom.insertBehind(document.createTextNode(' ('), Link); // Klammer auf vor den Link, hinter den Planinamen
						ogs.dom.insertBehind(MondLink, Text); // dahinter den Link
						ogs.dom.insertBehind(document.createTextNode(')'), MondLink); // dahinter die Klammer zu
					}
				}
				else
				{
					// Das grosse Planibild finden
					var AktPlaniBau = ogs.dom.getCEBF(Bilder[i].parentNode,'center')[0];
					AktPlaniBau.insertBefore(ogs.dom.newElement('a', AktPlaniBau.firstChild.nodeValue.trim(), 'href', '/game/index.php?page=b_building&session=' + ogs.ogame.sid + '&cp=' + ogs.planetliste[0]['Aktiv']['ID']), AktPlaniBau.firstChild); // Den Link vor dem Text einfuegen
					AktPlaniBau.removeChild(AktPlaniBau.childNodes[1]); // den Text loeschen
				}
			}
		}
		
		function getElementsByClassName(clsName, clsElems, what)
		{
			var arr = new Array();
			for (var i = 0; i < clsElems.length; i++)
			{
				if (clsElems[i].className == clsName)
				{
					if (clsElems[i].getAttribute('onmouseover').toString().indexOf(what) + 1)
					{
						arr.push(clsElems[i]);
					}
				}
			}
			return arr;
		}
		

		
		// Handelsrechner
		if (ogs.load('handelsrechner') == true)
		{
			var handelsrechner_lastupdate = '';
			
			function handelsrechner()
			{
				var hertauschen, bek1, bek2, handel, mm = 0, nk, nk1, nk2, mm1 = 0, mm2 = 0;
				var getmenge = document.getElementById('menge');
				
				// abbruch wenn element über id nicht gefunden wurde
				if (!getmenge) return;
				var menge = parseInt(getmenge.value.replace(/\./g, ''), 10);
				if (isNaN(menge)) menge = 0;
				var kursmet = parseFloat(document.getElementById('kursmet').value.replace(/\,/g, '.'), 10);
				var kurskris = parseFloat(document.getElementById('kurskris').value.replace(/\,/g, '.'), 10);
				var kursdeut = parseFloat(document.getElementById('kursdeut').value.replace(/\,/g, '.'), 10);
				var prozent1 = parseFloat(document.getElementById('prozent').value.replace(/\,/g, '.'), 10);
				if (isNaN(kursmet)) kursmet = parseFloat(ogs.load('kursmet').replace(/\,/g, '.'), 10);
				if (isNaN(kurskris)) kurskris = parseFloat(ogs.load('kurskris').replace(/\,/g, '.'), 10);
				if (isNaN(kursdeut)) kursdeut = parseFloat(ogs.load('kursdeut').replace(/\,/g, '.'), 10);
				if (isNaN(prozent1)) prozent1 = 0;
				var prozent2 = 100 - prozent1;
				var gt_du = 0, kt_du = 0, gt_er = 0, kt_er = 0, ress = 0;
				
				if (document.getElementById('hertauschen1').checked)
				{
					hertauschen = resOGS[0];
					bek1 = resOGS[1];
					bek2 = resOGS[2];
					
					if (document.getElementById('bekommen1').checked)
					{
						if (kursmet > kurskris) { nk = kursmet / kurskris; mm = menge / nk; }
						if (kurskris > kursmet) { nk = kurskris / kursmet; mm = menge * nk; }
						if (kursmet == kurskris) { mm = menge; }
					}
					else if (document.getElementById('bekommen2').checked)
					{
						if (kursmet > kursdeut) { nk = kursmet / kursdeut; mm = menge / nk; }
						if (kursdeut > kursmet) { nk = kursdeut / kursmet; mm = menge * nk; }
						if (kursmet == kursdeut) { mm = menge; }
					}
					else if (document.getElementById('bekommen3').checked)
					{
						if (kursmet > kurskris) { nk1 = kursmet / kurskris; mm1 = menge / 100 * prozent1 / nk1; }
						if (kurskris > kursmet) { nk1 = kurskris / kursmet; mm1 = menge / 100 * prozent1 * nk1; }
						if (kursmet == kurskris) { mm1 = menge / 100 * prozent1; }
						if (kursmet > kursdeut) { nk2 = kursmet / kursdeut; mm2 = menge / 100 * prozent2 / nk2; }
						if (kursdeut > kursmet) { nk2 = kursdeut / kursmet; mm2 = menge / 100 * prozent2 * nk2; }
						if (kursmet == kursdeut) { mm2 = menge / 100 * prozent2; }
					}
				}
				else if (document.getElementById('hertauschen2').checked)
				{
					hertauschen = resOGS[1];
					bek1 = resOGS[0];
					bek2 = resOGS[2];
					
					if (document.getElementById('bekommen1').checked)
					{
						if (kurskris > kursmet) { nk = kurskris / kursmet; mm = menge / nk; }
						if (kursmet > kurskris) { nk = kursmet / kurskris; mm = menge * nk; }
						if (kurskris == kursmet) { mm = menge; }
					}
					else if (document.getElementById('bekommen2').checked)
					{
						if (kurskris > kursdeut) { nk = kurskris / kursdeut; mm = menge / nk; }
						if (kursdeut > kurskris) { nk = kursdeut / kurskris; mm = menge * nk; }
						if (kurskris == kursdeut) { mm = menge; }
					}
					else if (document.getElementById('bekommen3').checked)
					{
						if (kurskris > kursmet) { nk1 = kurskris / kursmet; mm1 = menge / 100 * prozent1 / nk1; }
						if (kursmet > kurskris) { nk1 = kursmet / kurskris; mm1 = menge / 100 * prozent1 * nk1; }
						if (kurskris == kursmet) { mm1 = menge / 100 * prozent1; }
						if (kurskris > kursdeut) { nk2 = kurskris / kursdeut; mm2 = menge / 100 * prozent2 / nk2; }
						if (kursdeut > kurskris) { nk2 = kursdeut / kurskris; mm2 = menge / 100 * prozent2 * nk2; }
						if (kurskris == kursdeut) { mm2 = menge / 100 * prozent2; }
					}
				}
				else if (document.getElementById('hertauschen3').checked)
				{
					hertauschen = resOGS[2];
					bek1 = resOGS[0];
					bek2 = resOGS[1];
					
					if (document.getElementById('bekommen1').checked)
					{
						if (kursdeut > kursmet) { nk = kursdeut / kursmet; mm = menge / nk; }
						if (kursmet > kursdeut) { nk = kursmet / kursdeut; mm = menge * nk; }
						if (kursdeut == kursmet) { mm = menge; }
					}
					else if (document.getElementById('bekommen2').checked)
					{
						if (kursdeut > kurskris) { nk = kursdeut / kurskris; mm = menge / nk; }
						if (kurskris > kursdeut) { nk = kurskris / kursdeut; mm = menge * nk; }
						if (kursdeut == kurskris) { mm = menge; }
					}
					else if (document.getElementById('bekommen3').checked)
					{
						if (kursdeut > kursmet) { nk1 = kursdeut / kursmet; mm1 = menge / 100 * prozent1 / nk1; }
						if (kursmet > kursdeut) { nk1 = kursmet / kursdeut; mm1 = menge / 100 * prozent1 * nk1; }
						if (kursdeut == kursmet) { mm1 = menge / 100 * prozent1; }
						if (kursdeut > kurskris) { nk2 = kursdeut / kurskris; mm2 = menge / 100 * prozent2 / nk2; }
						if (kurskris > kursdeut) { nk2 = kurskris / kursdeut; mm2 = menge / 100 * prozent2 * nk2; }
						if (kursdeut == kurskris) { mm2 = menge / 100 * prozent2; }
					}
				}
				
				var handelsrechner_now = '';
				if (document.getElementById('bekommen1').checked)
				{
					handel = txt('trade_10','#*1*# #*2*#',TausenderZahl(Math.floor(mm)),bek1);
					ress = Math.floor(mm); handelsrechner_now += 1;
				}
				else if (document.getElementById('bekommen2').checked)
				{
					handel = txt('trade_10','#*1*# #*2*#',TausenderZahl(Math.floor(mm)),bek2);
					ress = Math.floor(mm); handelsrechner_now += 2;
				}
				else if (document.getElementById('bekommen3').checked)
				{
					handel = txt('trade_11','#*1*# #*2*# und #*3*# #*4*#', TausenderZahl(Math.floor(mm1)), bek1,TausenderZahl(Math.floor(mm2)),bek2);
					ress = Math.floor(mm1) + Math.floor(mm2); handelsrechner_now += 3;
				}
				
				kursmet = document.getElementById('kursmet').value;
				kurskris = document.getElementById('kurskris').value;
				kursdeut = document.getElementById('kursdeut').value;
				if (document.getElementById('kursmet').value == '') kursmet = ogs.load('kursmet');
				if (document.getElementById('kurskris').value == '') kurskris = ogs.load('kurskris');
				if (document.getElementById('kursdeut').value == '') kursdeut = ogs.load('kursdeut');

				handelsrechner_now += menge+hertauschen+kursmet+kurskris+kursdeut+ress;
				if (handelsrechner_now != handelsrechner_lastupdate) // nur wenn sich was geaendert hat
				{
					handelsrechner_lastupdate = handelsrechner_now;
					document.getElementById('handelstext').innerHTML = txt('trade_9','Ich h&auml;tte #*1*# #*2*# anzubieten und w&uuml;rde daf&uuml;r gerne #*3*# haben (Kurs: #*4*#).',TausenderZahl(menge),hertauschen,handel,kursmet.replace(/\./g, ',') + ':' + kurskris.replace(/\./g, ',') + ':' + kursdeut.replace(/\./g, ','));;				
					document.getElementById('hertauschen0').innerHTML = hertauschen;
					document.getElementById('bek1').innerHTML = bek1;
					document.getElementById('bek2').innerHTML = bek2;
					document.getElementById('bek').innerHTML = bek1;
					document.getElementById('handel').innerHTML = handel;
					gt_du = Math.ceil(menge / 25000);
					kt_du = Math.ceil(menge / 5000);
					gt_er = Math.ceil(ress / 25000);
					kt_er = Math.ceil(ress / 5000);
					document.getElementById('transen_du').innerHTML = '<span style="color:' + ogs.textfarbe + ';">' + txt('trade_12','#*1*# GTs',TausenderZahl(gt_du)) + '</span>'+txt('trade_14',' bzw. ')+'<span style="color:' + ogs.textfarbe + ';">' + txt('trade_13','#*1*# KTs',TausenderZahl(kt_du)) + '</span>';
					document.getElementById('transen_er').innerHTML = '<span style="color:' + ogs.textfarbe + ';">' + txt('trade_12','#*1*# GTs',TausenderZahl(gt_er)) + '</span>'+txt('trade_14',' bzw. ')+'<span style="color:' + ogs.textfarbe + ';">' + txt('trade_13','#*1*# KTs',TausenderZahl(kt_er)) + '</span>';
				}
			}
			

		}
	} // Ende Uebersichtsteil
	

	

	

	
	//-----------
	// Farmliste
	//-----------
	if (ogs.load('farmliste_aktiv'))
	{
		//hauptfunction
		function farmlistemain()
		{
			var gala = 0;
			var uklad = 0;

			function getCoords(coordstring)
			{
				var adres = coordstring.split(':');

				if (adres.length == 3)
				{
					adres[0] = parseInt(adres[0]);
					adres[1] = parseInt(adres[1]);
					adres[2] = parseInt(adres[2]);
					
					if (adres[0] < 1 || adres[0] > 9 )   return null;
					if (adres[1] < 1 || adres[1] > 499 ) return null;
					if (adres[2] < 1 || adres[2] > 16 )  return null; //expos erlauben
					
					return adres;
				}
				
				return null;
			}

			function getPlaniType(planistring)
			{
				var planitype = parseInt(planistring);
				
				if (planitype == 1) return 'Planet';
				if (planitype == 2) return 'TF';
				if (planitype == 3) return 'Mond';
				
				return '';
			}

			function addCoords(event) {
				var coords = '';
				var desc = '';
				var typ = '';
				
				if (gala) {
					var planet = this.innerHTML;
					coords = gala + ':' + uklad + ':' + planet;
				}
				else 
					coords = prompt('Bitte Koords eintragen X:XXX:XX');
				
				if (coords == null) return;
				if ((desc = prompt('Bezeichnung eintragen.')) == null) return;
				if ((typ = prompt('Typ , 1 - Planet, 2 -TF, 3 - Mond','1')) == null) return;
				coords = coords.replace(/[\^\|]/g,'');
				desc = desc.replace(/[\^\|]/g,'');
				typ = typ.replace(/[^0-9]/g,'');
				
				ogs.save('farmliste_liste', ogs.load('farmliste_liste')+'^'+coords+'|'+desc+'|'+typ);
				
				if (ogs.neueseite.user == 'farmliste') showFarmliste();
				
				return false;
			}
			
			function jumpmap(e) {
				var adres = e.target.firstChild.nodeValue;
				
				adres = getCoords(adres);
				
				if (adres != null)
				{
					document.location.href='index.php?page=galaxy&galaxy='+adres[0]+'&system='+adres[1]+'&planet='+adres[2]+'&session=' + ogs.ogame.sid;
				}
				
				return false;
			}

			function delcoord(event) {
				var adresyNowe = '';
				var nr = event.target.getAttribute('nr');
				var str = ogs.load('farmliste_liste');
				var adresy = str.split( '^' );
				
				for (var i in adresy)
					if (adresy[i]!='' && i != nr)
						adresyNowe = adresyNowe + '^' + adresy[i];
				ogs.save('farmliste_liste', adresyNowe);
				
				showFarmliste();
				return false;
			}

			function moveCoord(event) {
				var nr = event.target.firstChild.nodeValue;
				var CoordsTab = loadCoords();
				
				if ((poz = prompt ('Neue Position:')) && (poz>0) && (poz<CoordsTab.length))
				{
					CoordsTabNew = new Array;
					var ii = 1;
					
					for (var i in CoordsTab) if (i > 0) {
						if (ii==poz) CoordsTabNew[ii++] = CoordsTab[nr];
						if (i!=nr) CoordsTabNew[ii++] = CoordsTab[i];
						if (ii==poz) CoordsTabNew[ii++] = CoordsTab[nr];
					}
					
					saveCoords(CoordsTabNew);
					showFarmliste();
				}
			}


			
			function hideFarmliste()
			{
				//nur starten wenn man erlaubnis hat die seite zu ändern.
				if (ogs.neueseite.user != 'farmliste')
					return;
				
				//löschen des nodes
				ogs.neueseite.neu.parentNode.removeChild(ogs.neueseite.neu);
				
				//wiederanzeigen des orginals
				ogs.neueseite.orginal.style.display = 'block';
				
				//seite freigeben
				ogs.neueseite.user = '';
				delete ogs.neueseite.orginal;
				delete ogs.neueseite.neu;
			}
			
			function showFarmliste()
			{
				//wenn seite leer ist dann werte setzten
				if (ogs.neueseite.user == '')
				{
					ogs.neueseite.user = 'farmliste';
					ogs.neueseite.orginal = document.getElementById('content');
					ogs.neueseite.neu = ogs.neueseite.orginal.parentNode.insertBefore(ogs.neueseite.orginal.cloneNode(false), ogs.neueseite.orginal);
					
					ogs.neueseite.orginal.style.display = 'none';
				}
				
				//nur starten wenn man erlaubnis hat die seite zu ändern.
				if (ogs.neueseite.user != 'farmliste')
					return;
				
				//leer machen bevor sie wieder aufgefüllt wird
				while (ogs.neueseite.neu.firstChild)
					ogs.neueseite.neu.removeChild(ogs.neueseite.neu.firstChild);
				
				var centertab = document.createElement('center');
				var tab = centertab.appendChild(document.createElement('TABLE'));
				tab.style.padding = 30;
				tab = tab.appendChild(document.createElement('TBODY'));
				
				var tr = tab.appendChild(document.createElement('TR'));
				var td = tr.appendChild(document.createElement('TD'));
				td.className = 'c';
				td.colSpan = 5;
				td.appendChild(document.createTextNode('Deine persoenliche Koordinaten-Liste'));
				
				tr = tab.appendChild(document.createElement('TR'));
				td = tr.appendChild(document.createElement('TH'));
				td.appendChild(document.createTextNode('NR'));
				td = tr.appendChild(document.createElement('TH'));
				td.appendChild(document.createTextNode('Pos'));
				td = tr.appendChild(document.createElement('TH'));
				td.appendChild(document.createTextNode('Type'));
				td = tr.appendChild(document.createElement('TH'));
				td.appendChild(document.createTextNode('Name / Edit'));
				td = tr.appendChild(document.createElement('TH'));
				td.appendChild(document.createTextNode('L\u00F6schen'));
				
				var str = ogs.load('farmliste_liste');
				var array1 = str.split( '^' );
				var len = array1.length;
				
				var a;
				var th;
						
				for(var i = 0; i < len; i++)
				{
					var x = array1[i];
					
					if(x != '')
					{
						var arr = x.split( '|' );
						
						if( arr[0] != null && typeof(arr[1])!='undefined')
						{
							tr = tab.appendChild(document.createElement('TR'));
							th = tr.appendChild(document.createElement('TH'));
							a = document.createElement('A');
							a.href = '#';
							ogs.addEvent(a,'click', moveCoord, false);
							a.appendChild(document.createTextNode(i));
							th.appendChild(a);
							
							th = tr.appendChild(document.createElement('TH'));
							a = document.createElement('A');
							a.href = '#';
							ogs.addEvent(a,'click', jumpmap, false);
							a.appendChild(document.createTextNode(arr[0]));
							if (getCoords(arr[0]) == null)
							{
								a.style.color = '#ff0000';
							}
							th.appendChild(a);
							
							th = tr.appendChild(document.createElement('TH'));
							var ptext = getPlaniType(arr[2]);
							th.appendChild(document.createTextNode((ptext != '') ? ptext : arr[2]));
							
							if (ptext == '')
							{
								th.style.color = '#ff0000';
							}
							
							th = tr.appendChild(document.createElement('TH'));
							a = document.createElement('A');
							a.href = '#';
							ogs.addEvent(a,'click', editCoord, false);
							a.appendChild(document.createTextNode(arr[1]));
							th.appendChild(a);
							
							th = tr.appendChild(document.createElement('TH'));
							a = document.createElement('A');
							a.href = '#';
							a.setAttribute('nr',i);
							ogs.addEvent(a,'click', delcoord, false);
							a.appendChild(document.createTextNode('<Entf>'));
							th.appendChild(a);
						}
					}
				}

				tr = tab.appendChild(document.createElement('TR'));
				td = tr.appendChild(document.createElement('TH'));
				td.colSpan = 4;
				td = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.href = '#';
				ogs.addEvent(a,'click', hideFarmliste, false);
				a.appendChild(document.createTextNode('OK'));
				td.appendChild(a);
				
				ogs.neueseite.neu.appendChild(centertab);
			}

			function start1()
			{	
				var x;
				var y;
				var z;
				var vMenu = LeftDiv.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
				
				//wenn menü nicht gefunden dann abbruch...
				if (vMenu.length == 0) return;
				
				x = document.createElement('TR');
				y = document.createElement('TD');
				y.innerHTML = '&nbsp;';//<div align="center"><font color="#ffffff"><br /></font></div>';
				x.appendChild(y);
				vMenu.appendChild(x);

				x = document.createElement('TR');
				y = document.createElement('TD');
				y.innerHTML = '<div align="center"><font color="#ffffff"></font></div>';
				x.appendChild(y);
				z = document.createElement('A');
				z.setAttribute('href','#');
				z.innerHTML= txt('farm_new','Neue Koords');
				ogs.addEvent(z,'click',addCoords,false);
				y.getElementsByTagName('font')[0].appendChild(z);
				vMenu.appendChild(x);

				x = document.createElement('TR');
				y = document.createElement('TD');
				y.innerHTML = '<div align="center"><font color="#ffffff"></font></div>';
				x.appendChild(y);
				z = document.createElement('A');
				z.setAttribute('href','#');
				z.innerHTML= txt('farm_all','Alle Koords');
				ogs.addEvent(z,'click',showFarmliste,false);
				y.getElementsByTagName('font')[0].appendChild(z);
				vMenu.appendChild(x);
			}

			function start2()
			{
				//nur flottenseite
				if(ogs.ogame.page == 'flotten2')
				{
					var x = document.getElementById('content').getElementsByTagName( 'table' );
					var y = x[0];
				}
				else if(ogs.ogame.page == 'galaxy')
				{
					var curgalaxy = document.getElementsByName('galaxy');
					if (curgalaxy.length < 1) return;
					//curgalaxy = curgalaxy[0].value;
					
					var x = document.getElementById('content').getElementsByTagName( 'table' );
					var y = x[3];
					y = y.appendChild(document.createElement('tr'));
					y = y.appendChild(document.createElement('th'));
					y.colSpan = 8;					
					y = y.appendChild(document.createElement('table'));
					y.style.width = '100%'
				}	
				else
					return;
				
				var z = y.getElementsByTagName( 'tr' );
				var a = document.createElement( 'TR' );
				var b = document.createElement( 'TD' );
				
				b.innerHTML = 'Koordinaten-Liste';
				b.colSpan = 2;
				b.className = 'c';
				a.appendChild( b );
				y.appendChild( a );
				
				var str = ogs.load('farmliste_liste');
				var array1 = str.split('^');
				var len = array1.length;
				var v = document.createElement( 'TR' );
				var i = 0;
				
				for(var ii = 0; ii < len; ii++)
				{
					x = array1[ii];
					
					if( x != '' )
					{
						var arr = x.split( '|' );
						var arrC = getCoords(arr[0]);

						//test auf richtige angabe
						if(arrC != null && getPlaniType(arr[2]) != '')
						{
							i++;
						
							//nächste zeile erstellen
							if( ( i - 1 ) % 2 == 0 )
							{
								v = document.createElement( 'TR' );
							}
							
							o = document.createElement( 'TH' );
							var link = document.createElement( 'A' );
							var linktext = arr[1]+' '+arr[0];
							if (arr[2] == 2)
								linktext += ' (TF)';
							else if (arr[2] == 3)
								linktext += ' (Mond)';
							
							if(ogs.ogame.page == 'flotten2')
								link.href = 'javascript:setTarget('+arrC[0]+','+arrC[1]+','+arrC[2]+','+arr[2]+'); shortInfo();';				
							else
								link.href = 'javascript:showGalaxy('+arrC[0]+','+arrC[1]+','+arrC[2]+');';				
							
							link.appendChild(document.createTextNode(linktext));
							
							o.appendChild( link );
							v.appendChild( o );
							
							//nächste zeile anhängen
							if( ( i - 1 ) % 2 == 0 )
							{
								y.appendChild( v );
							}
						}
					}
				}
			}
			
			//in gala ansicht links zum erstellen einer farm hinzufügen
			if(ogs.ogame.page == 'galaxy')
			{
				var tgala = document.getElementsByName('galaxy')
				
				if (tgala.length > 0)
				{
					gala = tgala[0].value;
					uklad = document.getElementsByName('system')[0].value;
					
					var tagi = document.getElementById('content').getElementsByTagName('a');
					
					for (var i in tagi)
					{
						if (tagi[i].getAttribute && tagi[i].getAttribute('tabindex')) 
						{
							ogs.addEvent(tagi[i],'click',addCoords,true);
						}
					}
				}
			}
			
			//starten
			start1();
			start2();
		}
		
		//starten
		farmlistemain();
	}
	

	//loadtime hinzufügen
	var loadtimetext = txt('laufzeit','Laufzeit: #*1*# ms',((new Date()).getTime() - ogs.start.time.getTime()));
	ogs.addOverLib(document.getElementById('ogs_version'),'<table><tr><td>'+loadtimetext+'</td></tr></table>');
	ogs.addOverLib(document.getElementById('ogs_loading'),'<table><tr><td>'+loadtimetext+'</td></tr></table>');
}

function ogs_addOverLib(obj,code)
{
	ogs.addEvent(obj,'mouseout',ogs.window.nd,true);
	ogs.addEvent(obj,'mouseover',eval('new Function(\'\',\"ogs.window.overlib(\\\"'+code+'\\\");\")'),true);
} 



/**************
* Skript Start
**************/

function startup()
{

	function HolePlaniListe()
	{
		//default
		var defaultPlanet = parseInt(ogs.load('def_plani'),10);
		
		//Hilfsarray zum bestimmen der Partner
		var partnersuche = new Array(); // :p
		
		//Daten suchen
		var namen =  document.getElementsByTagName('select');
		if (!namen.length) return 0; // falls keine Planiliste gefunden wurde, abbruch
		namen = namen[0].options;
		
		//Array zur Speicherung der Planeten
		var liste = new Array();
		
		//Hilfswerte fer spaetere Verarbeitung
		liste[0] = new Array();
		liste[0]['HPID'] = 0;		//ID des HPs
		liste[0]['HP'] = null;		//pointer auf das HP Planet
		liste[0]['Aktiv'] = null;	//pointer auf den aktiven Planeten
		liste[0]['Def'] = null;		//pointer auf den default Planeten
		
		for (var i = 0; i < namen.length; i++) // Ueber alle Planeten des Spielers
		{
			//Daten extrahieren
			if (namen[i].value.indexOf('/game/') < 0 ) return 0; // falls dies kein Teil des Planinamens ist, Abbruch
			var Daten = namen[i].firstChild.nodeValue.match(/([a-zA-Z0-9 \.\-\_\(\)]+)[\s]+\[([0-9]{1,2}):([0-9]{1,3}):([0-9]{1,2})\]/); // Name und Koords rausfinden, sie stehen im angezeigten Text
			var ID = namen[i].value.match(/cp=([0-9]+)/); // Plani-ID rausfinden
			if (!ID || !Daten) continue;
			
			//Daten speichern
			var planet = new Array();
			planet['Name'] = Daten[1];
			planet['Gala'] = parseInt(Daten[2], 10);
			planet['Sys'] = parseInt(Daten[3], 10);
			planet['Pos'] = parseInt(Daten[4], 10);
			planet['Koords'] = planet['Gala'] + ':' + planet['Sys'] + ':' + planet['Pos'];
			planet['ID'] = parseInt(ID[1], 10);
			planet['URL'] = namen[i].value;
			planet['Aktiv'] = (namen[i].selected == true);
			planet['HP'] = false;
			
			//partnersuche
			if (partnersuche[planet['Koords']])
			{
				var partner = partnersuche[planet['Koords']];
				
				//die nummer des partners eintragen
				planet['Partner'] = partner; 
				partner['Partner'] = planet;
				
				if (partner['ID'] > planet['ID'])
				{
					planet['Typ'] = ogs.planettype.planet;
					partner['Typ'] = ogs.planettype.mond;
				}
				else
				{
					planet['Typ'] = ogs.planettype.mond;
					partner['Typ'] = ogs.planettype.planet;
				}
			}
			else
			{
				planet['Partner'] = null;
				planet['Typ'] = ogs.planettype.planet;
				partnersuche[planet['Koords']] = planet;
			}
			
			//aktiven planeten eintragen
			if (planet['Aktiv']) liste[0]['Aktiv'] = planet;
			
			//die kleinste ID ermitteln
			if (liste[0]['HPID'] == 0 || liste[0]['HPID'] > planet['ID'])
			{
				liste[0]['HPID'] = planet['ID'];
				liste[0]['HP'] = planet;
			}
			
			//default Planet
			if (defaultPlanet > 0 && planet['ID'] == defaultPlanet)
			{
				liste[0]['Def'] = planet;
			}

			//Planet in Liste hinzufuegen
			liste[liste.length] = planet;
		}
		
		if (liste[0]['HPID'] != 0)
		{
			//HP auf true setzten beim HP
			liste[0]['HP']['HP'] = true;
			
			//wenn kein default plani dann hp als default
			if (!liste[0]['Def']) liste[0]['Def'] = liste[0]['HP'];
			
			return liste; //Liste zurueckgeben
		}
		else
		{
			return 0;
		}
	}

	ogs.start.versuche++;

	if (!ogs.ogame.hpid) // HP-ID versuchen zu laden
	{
		ogs.ogame.hpid = parseInt(ogs.load(ogs.ogame.server + '_HP_ID'),10); // ID des HPs laden, falls vorhanden
	}
	
	// Planiliste laden
	ogs.planetliste = HolePlaniListe();
	
	if (ogs.planetliste && ogs.ogame.hpid != ogs.planetliste[0]['HPID'])
	{
		ogs.ogame.hpid = ogs.planetliste[0]['HPID'];
		ogs.save(ogs.ogame.server + '_HP_ID', ogs.ogame.hpid); // speichere die HP-ID
	}
	
	//Bei extra Seiten deren Code aufrufen
	if (ogs.ogame.page == 'phalanx')
	{
		if (ogs.ogame.hpid > 0)
		{
			ogs_phalanx();
			return;
		}
	}
	else if (ogs.ogame.page == 'notizen')
	{
		ogs_notizen();
		return;
	}
	else if(ogs.ogame.page == 'pranger')
	{
		ogs_pranger();
		return;
	}
	else //normale startfunktion
	{
		// Hinweis in der Navi
		var OGameVersion = document.getElementsByTagName('nobr')[0]; // Absatz mit der OGame-Version finden
		
		if (ogs.ogame.hpid && OGameVersion && !(ogs.ogame.page == 'b_building' && document.URL.match(/bau=/))) // Check auf fehlende ogs.ogame.hpid und leere Zwischenladeseiten durch OGame
		{

			unsafeWindow.ogs_setup_start = function()
			{
				window.setTimeout(ogs_setup_start, 0);
			};
			
			unsafeWindow.turnoff = function()
			{
				window.setTimeout(turnoff, 0);
			};

			// wenn eingeschalten dann ausführen
			if (ogs.load('skript_online'))
			{
				ogameskript();

				document.getElementById('ogs_loading').style.color = 'green';
			}
			else
			{
				document.getElementById('ogs_loading').innerHTML = 'OFF';
				document.getElementById('ogs_loading').style.color = 'red';
			}
			
			return;
		}
	}
	
	if (ogs.start.versuche <= ogs.start.versuche_max)
	{
		// falls es keine HP-ID gibt und noch nicht genuegend Versuche gemacht wurden, nochmal versuchen
		window.setTimeout(startup, ogs.start.versuche_warte);
	} 
}

//this one is for strings which have to match gamestrings
function exp(id, text)
{
	var ret;
	var i;
	
	if (ogs.lang.ogame != -1 && typeof ogs.lang.ogame[id] != 'undefined')
	{
		ret = ogs.lang.ogame[id];
		
		if (typeof text == typeof ret) //typengleichheit texten
		{
			if (typeof text == 'object') //bei array
			{
				if (text.length != ret.length) ret = text; //das ganze array replacen
				/*
				for (i = ret.length; i < text.length; i++) //length testen fehlende eintraege mit default ersetzen
				{
					ret[i] = text[i];
				}
				*/
			}
		}
		else
		{
			ret = text;
		} 
	}
	else
	{
		ret = text;
	}

	if (exp.arguments.length > 2)
	{
		for (var i = 2; i < exp.arguments.length; i++)
		{
			ret = ret.replace('#*'+(i-1)+'*#', exp.arguments[i]);
		}
	}
	
	return ret;
}

//this one is for strings for ogs only
function txt(id, text)
{
	var ret;
	var i;
	
	if (ogs.lang.skript != -1 && typeof ogs.lang.skript[id] != 'undefined')
	{
		ret = ogs.lang.skript[id];
		
		if (typeof text == typeof ret) //typengleichheit texten
		{
			if (typeof text == 'object') //bei array
			{
				if (text.length != ret.length) ret = text; //das ganze array replacen
				/*
				for (i = ret.length; i < text.length; i++) //length testen fehlende eintraege mit default ersetzen
				{
					ret[i] = text[i];
				}
				*/
			}
		}
		else
		{
			ret = text;
		} 
	}
	else
	{
		ret = text;
	}
	
	
	if (txt.arguments.length > 2)
	{
		for (i = 2; i < txt.arguments.length; i++)
		{
			ret = ret.replace('#*'+(i-1)+'*#', txt.arguments[i]);
		}
	}
	
	return ret;
}


/*************************************************/
/* Auf diese Functionen nur ueber ogs. zugreifen */
/*************************************************/

//version des ogs formatieren
function ogs_version()
{
	var nr = parseInt(ogs.load('version'),10);
	return (Math.floor(nr / 10000)) + '.' + (Math.floor(nr / 100) % 100) + ' - Rev #' + (nr % 100);
}

// Laedt eine Einstellung des aktuellen Accounts bzw globale
function ogs_load(name)
{
	if (typeof settingsdef[name] == 'undefined')
	{
		if (typeof settingsglobaldef[name] == 'undefined')
		{
			//sollte nicht auftreten da jede einstellung auch ein default wert haben sollte
			//diese if schleife kann nachherkomplett gelöscht werden
			
			if(name.indexOf('_HP_ID') == -1 && name.indexOf('universe_') == -1) // nur abbrechen wenn es sich nicht um die hp id handelt
			{
				ogs.debug('Defaultwert f'+ue+'r ' + name + ' nicht gesetzt');
				return '';
			}
		}
		
		//wenn noch nicht geladen dann laden
		if (typeof settingsglobalcur[name] == 'undefined')
		{
			settingsglobalcur[name] = GM_getValue('global_' + name, settingsglobaldef[name]);				
		}
		
		if (typeof settingsglobaldef[name] == 'boolean' && typeof settingsglobalcur[name] != 'boolean')
			if (settingsglobalcur[name] == '-1')
				settingsglobalcur[name] = true;
			else
				settingsglobalcur[name] = false;

		return settingsglobalcur[name];
	}
	
	//wenn unbekannt ist um welchen acc es hier geht
	if (!ogs.ogame.hpid)
	{
		return settingsdef[name];
	}
	
	//wenn noch nicht geladen dann laden
	if (typeof settingscur[name] == 'undefined')
	{
		settingscur[name] = GM_getValue(ogs.ogame.server + '_' + ogs.ogame.hpid + '_' + name, settingsdef[name]);				

		if (typeof settingsdef[name] == 'boolean' && typeof settingscur[name] != 'boolean')
			if (settingscur[name] == '-1')
				settingscur[name] = true;
			else
				settingscur[name] = false;
	}
	
	return settingscur[name];
}

// Speichert eine Einstellung des aktuellen Accounts bzw globale einstellungen
function ogs_save(name, wert)
{
	if (typeof settingsdef[name] == 'undefined')
	{
		GM_setValue('global_' + name, wert);
		settingsglobalcur[name] = wert;
	}
	else
	{
		if (!ogs.ogame.hpid) { return; }
		GM_setValue(ogs.ogame.server + '_' + ogs.ogame.hpid + '_' + name, wert);
		settingscur[name] = wert;
	}
}

function ogs_split(str, split1, split2)
{
	var temp1 = str.split(split1);
	var temp2 = new Array;
	
	for (var i = 0; i < temp1.length; i++)
	{
		if (temp1[i] != '')
		{
			temp2.push(temp1[i].split(split2));
		}
	}
	
	return temp2;
}

function ogs_join(arr, join1, join2)
{
	var join = '';
	
	for (var i = 0; i < arr.length; i++)
	{
		join += arr[i].join(join2) + join1;
	}
	
	return join;
}

function ogs_getLink(url)
{
	url = url.replace(/ /g,'%2520');	// leerzeichen ersetzen
	url = url.replace(/&/g,'%26');		// & ersetzten
	//url = url.replace(/\?/g,'%3F');	// ? ersetzten
	//url = url.replace(/=/g,'%3D');	// = ersetzten
	//url = url.replace(/\//g,'%2F');	// / ersetzten
	//url = url.replace(/:/g,'%3A');	// : ersetzten
	//url = url.replace(/\[/g,'%5B');	// [ ersetzten
	//url = url.replace(/\]/g,'%5D');	// ] ersetzten
	//url = url.replace(/`/g,'%60');	// ` ersetzten
	return '/game/redir.php?url=' + url; //encodeURI()
}

//set und get function fuer textareas
function ogs_setTextArea(ta,val)
{
	if (ogs.browser == 'ff')
	{
		ta.value = val;
	}
	else
	{
		ta.innerHTML = val;
	}
}

function ogs_getTextArea(ta)
{
	if (ogs.browser == 'ff')
	{
		return ta.value;
	}
	else
	{
		return ta.innerHTML;
	}
}

// fuegt einen object eine function hinzu
function ogs_addEvent(obj, type, func, cap)
{
/*	if (obj.addEventListener)
	{
		obj.addEventListener(type, func, cap);
	}
	else if (obj.attachEvent)
	{
		obj.attachEvent('on'+type, func);
	}
	*/
}

// Berechnet den Stromverbrauch/Stromproduktion des Gebaeudes ID (1=Met, 2=Kris, 3=Deut, 4=Soli, 12=Fusi) auf der angegeben Stufe
function ogs_getEnergie(ID, Stufe)
{
	if (typeof EnergieBuffer[ID] != 'undefined' && typeof EnergieBuffer[ID][Stufe] != 'undefined')
		return EnergieBuffer[ID][Stufe];
	
	if (typeof EnergieBuffer[ID] == 'undefined')
		EnergieBuffer[ID] = new Array();
	
	if (ID == 12)
	{
		var tech = ogs.array.split(ogs.load('forschung'),'|','&');
		var techstufe = 0;
		
		for (var i = 0; i < tech.length; i++)
		{
			if (tech[i][0] == 113)
			{
				techstufe = tech[i][1];
				break;
			}
		}
		
		EnergieBuffer[ID][Stufe] = Math.floor(30 * Stufe * (Math.pow(1.05 + 0.01 * techstufe, Stufe)));
	}
	else
	{
		var Faktor = (ID == 1 || ID == 2) ? 10 : ((ID == 3 || ID == 4) ? 20 : 0);
		if (ID <= 3) // Minen
			Faktor *= -1;
		
		EnergieBuffer[ID][Stufe] = Math.floor(Faktor * Stufe * Math.pow(1.1, Stufe)); // Energieverbrauchs-Formel
	}
	
	return EnergieBuffer[ID][Stufe];
}

// Berechnet die Baukosten eines Gebaeudes der angegeben Stufe auf Basis der Grundkosten und des Exponentialfaktors
function ogs_getKosten(GSMet, GSKris, GSDeut, Faktor, Stufe)
{
	//return Stufe;
	var Baukosten = new Array(Math.floor(GSMet * Math.pow(Faktor, (Stufe - 1)), 0), Math.floor(GSKris * Math.pow(Faktor, (Stufe - 1)), 0), Math.floor(GSDeut * Math.pow(Faktor, (Stufe - 1)), 0)); // Kosten-Formel
	return Baukosten;
}

// Hilfe bei Debugmeldungen
function ogs_debug(meldung)
{
	// alert('Debug-Meldung:\n' + meldung);
}

//sucht in einen Array das Element dessen nameid den wert name besitzt und gibt den wert von valid zurueck,
//wenn nix gefunden wird gibt es def zurueck
function ogs_array_getElement(arr, name, def, nameid, valid)
{
	for (var i = 0; i < arr.length; i++)
	{
		if (arr[i][nameid] == name)
		{
			return arr[i][valid];
		}
	}
	
	return def;
}

//entfernt das element dessen nameid den wert name besitzt (entfernt nur ein element nicht mehrere)
function ogs_array_dropElement(arr, name, nameid)
{
	for (var i = 0; i < arr.length; i++)
	{
		if (arr[i][nameid] == name)
		{
			arr.splice(i,1);
			return;
		}
	}
}

// erstellt ein neues Tag
function ogs_dom_NeuesElement(Tag, Inhalt)
{
	var Neu = document.createElement(Tag); // erste Zelle (Titel)
	
	if (Inhalt.indexOf('<') + 1 || Inhalt.indexOf('&') + 1) // falls Tags oder &;-Umschreibungen im Text sind
	{
		Neu.innerHTML = Inhalt; // Text als HTML-Code
	}
	else
	{
		if (Inhalt.length > 0) // ansonsten, und falls es ueberhaupt einen Text gibt
		{
			Neu.appendChild(document.createTextNode(Inhalt)); // Text als Attribut
		}
	}
	
	if (ogs.dom.newElement.arguments.length > 2) // weitere Argumente der Funktion
	{
		for (var i = 2; i < ogs.dom.newElement.arguments.length - 1; i += 2) // alle diese Argumente
		{
			if (!ogs.dom.newElement.arguments[i + 1].length) { continue; }
			Neu.setAttribute(ogs.dom.newElement.arguments[i], ogs.dom.newElement.arguments[i + 1]); // dem Tag zuweisen
		}
	}
	
	return Neu; // zurueckgeben
}

// fuege des neue Element hinter dem anderen ein
function ogs_dom_EinfuegenHinter(Neu, Hinter)
{
	Hinter.parentNode.insertBefore(Neu, Hinter.nextSibling); // Element einfuegen
	return Neu; // Element zurueckgeben
}

// Loesche dieses Element
function ogs_dom_Loesche(element)
{
	element.parentNode.removeChild(element); // Da nur Kindelemente geloescht werden koennen, wird vom Elternknoten her geloescht
}

//durchsucht die childnodes nach dem jeweiligen tagname
function ogs_dom_getCEBF(element, name)
{
	var Erg = new Array();
	
	//if (typeof func == 'string')
	//{
	name = name.toLowerCase();

	for (var i = 0; i < element.childNodes.length; i++)
	{
		if (element.childNodes[i].nodeName.toLowerCase() == name)
		{
			Erg.push(element.childNodes[i]);
		}
	}
	/*
	}
	else if (typeof name == 'function')
	{
		for (var i = 0; i < element.childNodes.length; i++)
		{
			if (name(element.childNodes[i]))
			{
				Erg.push(element.childNodes[i]);
			}
		}
	}
	*/
	
	return Erg;
}

function ogs_dom_getEBF(element, name, att)
{
	var Erg = new Array;
	var data = element.getElementsByTagName(name);
	var func = new Function('knoten','return (knoten.' + att + ');');
	
	for (var i = 0; i < data.length; i++)
	{
		if (func(data[i]))
		{
			Erg.push(data[i]);
		}
	}
	
	return Erg;
}
/******************/
/* ZEIT functions */
/******************/

// formatiere die uebergebene Zeit als Langdatum
function ogs_ZeitFormatieren(zeit)
{
	// Eine Zahl zweistellig darstellen
	function zweistellig(zahl)
	{
		if (zahl < 10)
			return '0'+zahl;
		else
			return String(zahl);
	}
	
	return ogs.time.wochentage[zeit.getDay()] + ' ' + zeit.getDate() + ' ' + ogs.time.monate[zeit.getMonth()] + ' ' + zeit.getHours() + ':' + zweistellig(zeit.getMinutes()) + ':' + zweistellig(zeit.getSeconds()); // Ausgabestring formatieren
}

// Aktuelle Serverzeit bestimmen
function ogs_getTime()
{
	if (!isNaN(ogs.zeitdifferenz))
	{
		return new Date(new Date().getTime() - ogs.zeitdifferenz);
	}
	else
	{
		return new Date();
	}
}

// Zeitstring auslesen und als Zahl formatiert zurueckgeben
function ogs_LeseZeit(str)
{
	var Monate = new Array();
	Monate['Jan'] = 0; Monate['Feb'] = 1; Monate['Mar'] = 2; Monate['Apr'] = 3; Monate['May'] = 4; Monate['Jun'] = 5; Monate['Jul'] = 6; Monate['Aug'] = 7; Monate['Sep'] = 8; Monate['Oct'] = 9; Monate['Nov'] = 10; Monate['Dec'] = 11;
	var ZeitStr = str.match(/[a-zA-Z]{3} ([a-zA-Z]{3}) ([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/);
	var zeit = new Date();
	zeit = new Date(((zeit.getYear() < 1900) ? zeit.getYear() + 1900 : zeit.getYear()), Monate[ZeitStr[1]], ZeitStr[2], ZeitStr[3], ZeitStr[4], ZeitStr[5]);
	return zeit;
}

// zeitpunkt relativ zu jetzt angeben
function ogs_time_stamp(time, zweizeilig)
{
	var zus = '<font color="' + ogs.textfarbe + '">';
	var now = ogs.time.now();
	var ats = time;
	var aday = ats.getDate();
	zus += (aday != now.getDate()) ? aday + '.' + (ats.getMonth() + 1) + ((zweizeilig == true) ? '.<br />' : '&nbsp;'): '';
	var ah = ats.getHours();
	var am = ats.getMinutes();
	var as = ats.getSeconds();
	if (ah < 10) { ah = '0' + ah }
	if (am < 10) { am = '0' + am }
	if (as < 10) { as = '0' + as }
	zus += '' + ah + ':' + am + ':' + as + '</font>';
	return zus;
}

function ogs_aTimeDuration(s)
{
	var d = Math.floor(s / 86400);
	s -= d * 86400;
	var h = Math.floor(s / 3600);
	s -= h * 3600;
	var m = Math.floor(s / 60);
	s -= m * 60;
	if (h < 10) { h = '0' + h }
	if (m < 10) { m = '0' + m }
	if (s < 10) { s = '0' + s }
	var erg = h + ':' + m + ':' + s + ' h';
	if (d>0) erg = d + 't ' + erg;
	return erg;
}

/************************/
/* Kopfzeile bearbeiten */
/************************/
function ogs_kopfzeile()
{
	var HeadDiv = document.getElementById('header_top');
	if (!HeadDiv) return;
	
	//--------------------
	// Kopfzeile fixieren
	//--------------------
	if (ogs.load('head_fix'))
	{
		if (ogs.browser == 'ff')
		{
			HeadDiv.style.position = 'fixed';
			HeadDiv.style.overflow = 'visible';
			HeadDiv.style.zIndex = 10;
		}
		else
		{
			
		}
	}
	
	//----------------------------------------
	// Planiliste und Planiauswahl bearbeiten
	//----------------------------------------
	
	// HP nach oben sortieren wenn gewuenscht
	if (ogs.load('plani_hptotop')) sortiereHPToTop();
	
	// das Dropdown-Menue zur Planiauswahl
	var headselect = HeadDiv.getElementsByTagName('select');
	var headselectfound = false;
	
	if (headselect.length > 0)
	{
		headselect = headselect[0];
		headselectfound = true;
	}
	
	ogs.load('plani_combobox');
	ogs.load('plani_verbessern');
	
	if (headselectfound && (ogs.load('plani_next') || (settingscur['plani_verbessern'] && ogs.load('plani_linkplanetmond'))))
	{
		headselect.parentNode.style.textAlign = 'center'; // Text zentrieren
		headselect.parentNode.style.whiteSpace = 'nowrap'; // kein Zeilenumbruch
		
		// bei Planeten mit Mond und bei Monden kommt oben noch was darauf (nur wenn combobox deaktiv)
		if (!settingscur['plani_combobox'] && settingscur['plani_verbessern'] && ogs.load('plani_linkplanetmond') && ogs.planetliste[0]['Aktiv']['Partner'])
		{
			var Partner = ogs.planetliste[0]['Aktiv']['Partner'];
			headselect.parentNode.insertBefore(ogs.dom.newElement('a', (ogs.planetliste[0]['Aktiv']['Typ'] == ogs.planettype.mond) ? (txt('plani_p','P: #*1*#',Partner['Name'])) : (txt('plani_m','M: #*1*#',Partner['Name'])), 'href', Partner['URL'], 'id', 'MondPlani'), headselect); // Link vor der Dropwdown-Liste einfgen
			headselect.parentNode.insertBefore(document.createElement('br'), headselect); // Zeilenumbruch vor der Dropwdown-Liste einfgen
		}
	}
	
	//combox deaktiviert das hier
	if (!settingscur['plani_combobox'] && settingscur['plani_verbessern'] && headselectfound)
	{
		// Monde zu Planeten ziehen
		if (ogs.load('plani_pnm')) sortierePListe();
		
		var i;
		ogs.load('plani_shortname');
		ogs.load('plani_mondklammern');
		ogs.load('plani_mondextra');
		ogs.load('plani_hpmarker');
		
		// alle Eintraege der PlanetenSelectBox entfernen
		while (headselect.childNodes.length > 0) 
		{
			headselect.removeChild(headselect.childNodes[0]);
		}
		
		// generie text fuer die planeten und monde
		var planetenText = new Array();
		
		// Ueber alle Planeten
		for (i = 1; i < ogs.planetliste.length; i++)
		{
			//Text erstellen
			if (settingscur['plani_shortname']) // nur die Koords als Text
			{
				planetenText[i] = ogs.planetliste[i]['Koords'] + ((ogs.planetliste[i]['Typ'] == ogs.planettype.mond) ? ' (M)' : '');
			}
			else // der Text besteht aus Name und Koords
			{
				planetenText[i] = ogs.planetliste[i]['Name'];
				
				if (settingscur['plani_mondklammern'] && ogs.planetliste[i]['Typ'] == ogs.planettype.mond)
				{
					planetenText[i] = planetenText[i].replace(/ \([A-Za-z]+\)/,'');
				}
				
				planetenText[i] = planetenText[i] + ' [' + ogs.planetliste[i]['Koords'] + ']';
			}
			if (!settingscur['plani_mondextra'] && ogs.planetliste[i]['Typ'] == ogs.planettype.mond) planetenText[i] = ' - ' + planetenText[i]
			
			// nur eintragen wenn jetzt schon moeglich sonst nur planeten und monde spaeter
			if (settingscur['plani_mondextra'] && ogs.planetliste[i]['Typ'] != ogs.planettype.planet) continue;
			var Eintrag = ogs.dom.newElement('option', planetenText[i], 'value', ogs.planetliste[i]['URL']); // Eintrag erzeugen
			if (ogs.planetliste[i]['Aktiv']) Eintrag.setAttribute('selected', 'selected'); // falls es der aktive Plani ist, markieren
			if (ogs.planetliste[i]['HP'] && settingscur['plani_hpmarker']) Eintrag.style.fontWeight = 'bold'; // den HP fett machen
			headselect.appendChild(Eintrag); // Eintrag einfuegen
		}
		
		if (settingscur['plani_mondextra'])
		{
			// Trenner
			function auswahl(el) // neue Auswahlfunktion, kompatibel mit dem Trenner
			{
				var url = el.options[el.selectedIndex].value;
				if (url.length)	{ location.href = el.options[el.selectedIndex].value; }
			}
			
			// vorhandenen Funktion ueberschreiben
			unsafeWindow.haha = auswahl; 
			var HabTrenner = false;
			
			// Monde einfuegen
			for (var i = 1; i < ogs.planetliste.length; i++)  // Ueber alle Planeten
			{
				if (ogs.planetliste[i]['Typ'] != ogs.planettype.mond) continue;
				
				if (!HabTrenner)
				{
					headselect.appendChild(ogs.dom.newElement('option', ' ', 'value', ''));
					HabTrenner = true;
				}
				
				var Eintrag = ogs.dom.newElement('option', planetenText[i], 'value', ogs.planetliste[i]['URL']);
				if (ogs.planetliste[i]['Aktiv']) Eintrag.setAttribute('selected', 'selected'); // falls es der aktive Mond ist, markieren
				headselect.appendChild(Eintrag); // Eintrag einfuegen
			}
		}
	}

	
	
	//planiliste umgestallten
	if (settingscur['plani_combobox'] && headselectfound)
	{
		headselect.style.display = 'none';
		
		ogs.load('plani_hpmarker');
		ogs.load('plani_combobox_type');
		ogs.load('plani_combobox_val');
		ogs.load('plani_combobox_tooltip');
		
		var code = '<table class="ogs_planetenliste"><tr>';
		var line1 = '';
		var line2 = '</tr><tr>';
		var text = '';
		var textlen = 2;
		
		if (settingscur['plani_combobox_type'] >= 2)
		{
			textlen = settingscur['plani_combobox_type'] -1;
		}
		
		for (var i = 1; i < ogs.planetliste.length; i++)
		{
			if (ogs.planetliste[i]['Typ'] == 1)
			{
				line1 += '<td><a href="#" ';
				if (settingscur['plani_combobox_tooltip'] == true)
					line1 += 'onmouseover="return overlib(\'<table width=\\\'100%\\\'><tr><td><center>' + ogs.planetliste[i]['Name'] + '<br />' + ogs.planetliste[i]['Koords'] + '</center></td></tr></table>\');" onmouseout="return nd();" ';
				
				line1 += 'onclick="location=\'' + ogs.planetliste[i]['URL'] + '\'">';
				
				if (settingscur['plani_combobox_type'] == 0)
				{
					text = settingscur['plani_combobox_val'];
				}
				else if (settingscur['plani_combobox_type'] == 1)
				{
					text = ogs.planetliste[i]['Gala']+'';
				}
				else
				{
					text = ogs.planetliste[i]['Name'].substr(parseInt(settingscur['plani_combobox_val'],10),textlen)
				}
				
				if (text.trim().length == 0)
				{
					text = 'P'
				}
				
				if(ogs.planetliste[i]['Aktiv'])
					line1 += '<font color="red">' + text + '<font></a></td>';
				else
					line1 += text + '</a></td>';
				
				if (ogs.planetliste[i]['Partner'])
				{
					line2 += '<td><a href="#" ';
					if (settingscur['plani_combobox_tooltip'] == true)
						line2 += 'onmouseover="return overlib(\'<table width=\\\'100%\\\'><tr><td><center>' + ogs.planetliste[i]['Partner']['Name'] + '<br />' + ogs.planetliste[i]['Partner']['Koords'] + '</center></td></tr></table>\');" onmouseout="return nd();" ';
					
					line2 += 'onclick="location=\'' + ogs.planetliste[i]['Partner']['URL'] + '\'">';

					if(ogs.planetliste[i]['Partner']['Aktiv'])
						line2 += '<font color="red">M<font></a></td>';
					else
						line2 += 'M</a></td>';
				}
				else
				{
					line2 += '<td></td>'
				}
			}
		}
		
		code += line1 + line2 + '</tr></table>';
		headselect.parentNode.appendChild(ogs.dom.newElement('div',code));
	}
		
	// Die sortierte die Monde zu den Planeten
	function sortierePListe()
	{
		var Planis = new Array();
		Planis[0] = ogs.planetliste[0]; //Infos aus dem ersten Element uebernehmen
		
		// Hilfsfunktion zum Hinzufuegen eines Planetens samt Mond
		function addPlani(Plani)
		{
			if (Plani['Typ'] != ogs.planettype.planet) return;
			Planis[Planis.length] = Plani;
			if (Plani['Partner']) Planis[Planis.length] = Plani['Partner'];
		}
		
		//Rest hintenweg
		for (var i = 1; i < ogs.planetliste.length; i++)
		{
			addPlani(ogs.planetliste[i]);
		}
		
		ogs.planetliste = Planis;
	}
	
	// Die sortierte den HP planeten an den anfang
	function sortiereHPToTop()
	{
		var Planis = new Array();
		Planis[0] = ogs.planetliste[0]; //Infos aus dem ersten Element uebernehmen
		
		//HP hinzufuegen
		Planis[Planis.length] = ogs.planetliste[0]['HP'];
		
		//Rest hintenweg
		for (var i = 1; i < ogs.planetliste.length; i++)
		{
			if (!ogs.planetliste[i]['HP']) Planis[Planis.length] = ogs.planetliste[i];
		}
		
		ogs.planetliste = Planis;
	}

		
}