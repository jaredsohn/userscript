// ==UserScript==
// @name            OGame-Skript
// @namespace       OGame
// @description     Erweitert OGame um nützliche Funktionen
// @injectframes    1
// @include         http://uni*.ogame.*/*
// @include         http://www.ogame.*/*
// @include         http://ogame.*/*
// ==/UserScript==
/*
OGame-Skript, ein Greasemonkey-Userscript, das OGame um einige, nuetzliche Funktionen erweitert.
Copyright (C) 2006-2007 Windows-zerstoerer, ab Maerz 2007 Eleria & Co, ab Juli 2007 hakaz & User-Gruppe des OGame-Forums

Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation veroeffentlicht, weitergeben und/oder modifizieren, gemaess Version 2 der Lizenz.

Die Veroeffentlichung dieses Programms erfolgt in der Hoffnung, dass es dir von Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der VERWENDBARKEIT FUeR EINEN BESTIMMTEN ZWECK. Details findest du in der GNU General Public License.

Fuer weitere Details, schaue dir die volle GPL im Internet an: http://www.gnu.org/licenses/gpl.html
Auf deutsch: http://www.gnu.de/gpl-ger.html
Oder schreibe an die Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA.
*/
//---------------------------------------------------------------------------------------------------------------------------------------------------

/********************
* Grundeinstellungen
********************/
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
	else if (typeof PRO_getValue != 'undefined') // ie pro plugin
	{
		ogs.browser = 'ie';
		ogs.window = window;
		
		//functions umleiten
		GM_getValue = PRO_getValue;
		GM_setValue = PRO_setValue;
		unsafeWindow = document;
	}
	else
	{ 
		ogs.debug('Unsupported Web-Browser');
		ogs.start.versuche_max = -1; // dont run script
		unsafeWindow = document;
		ogs.window = window;
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
	settingsdef['pranger'] = true;
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

	//allgemein
	settingsdef['buildings'] = '';
	settingsdef['res_timer'] = false;
	settingsdef['uni_speed'] = 1;
	settingsdef['temperatur'] = '';

	//hintergrundbild
	settingsdef['hintergrundbild_use'] = false;
	settingsdef['hintergrundbild_url'] = 'none';

	//forschung
	settingsdef['forschung'] = '';

	//overview
	settingsdef['overview_planetenliste'] = 1;
	settingsdef['zeit_diff'] = 0;
	settingsdef['zeitverschiebung'] = 0;
	settingsdef['zeitverschiebung_auto'] = true;

	settingsdef['show_punkte_diff'] = false;
	settingsdef['show_punkte_diff_top'] = false;
	settingsdef['punkte_diff_fontsize'] = 'smaller';
	settingsdef['stats_plusminusbuttons'] = false;

	//nachrichten erweiterungen
	settingsdef['spio'] = true;
	settingsdef['news_expo_aktiv'] = false;
	settingsdef['news_expo_farbe'] = 'yellow';
	settingsdef['news_pm_aktiv'] = false;
	settingsdef['news_pm_farbe'] = 'blue';
	settingsdef['news_am_aktiv'] = false;
	settingsdef['news_am_farbe'] = 'lightblue';
	settingsdef['news_color_res'] = true;
	settingsdef['news_deletemessages'] = false;

	//imperiumsansicht
	settingsdef['imperium_calc_resis'] = true;
	settingsdef['imperium_kosten'] = false;
	settingsdef['imperium_pic_change'] = false;
	settingsdef['imperium_pic_abstand'] = 5;
	settingsdef['imperium_pic_x'] = 50;
	settingsdef['imperium_pic_y'] = 50;

	//galaxie
	settingsdef['gala_ally_faerben'] = true;
	settingsdef['gala_ally_sn_in_af'] = false;
	settingsdef['gala_ally_spieler_farben'] = '';
	settingsdef['gala_iprak_aktiv'] = false;
	settingsdef['gala_iprak_wert'] = 6;
	settingsdef['gala_iprak_max'] = true;

	//farmliste default werte
	settingsdef['farmliste_aktiv'] = false;
	settingsdef['farmliste_liste'] = '';

	//gebäude und forschung
	settingsdef['building_energie'] = true;
	settingsdef['building_klein'] = false;
	settingsdef['building_klein_pics_size'] = 60;
	settingsdef['building_bg'] = true;
	settingsdef['building_bg_col1'] = '#000000';
	settingsdef['building_bg_col2'] = '#453E25';
	settingsdef['building_nopics'] = false;
	settingsdef['building_doppelzeilen'] = false;
	settingsdef['building_reichweite'] = false;
	settingsdef['building_info'] = true;

	//InGame Message
	settingsdef['igm_signatur_bool'] = false;
	settingsdef['igm_signatur'] = '';

	//techtree
	settingsdef['tech_info'] = true;
	settingsdef['techtree_pics'] = true;
	settingsdef['techtree_pics_size'] = '50';
	settingsdef['techtree_bg'] = true;
	settingsdef['techtree_bg_col1'] = '#000000';
	settingsdef['techtree_bg_col2'] = '#453E25';
	settingsdef['techtree_doppelzeilen'] = false;

	//menü links
	settingsdef['menu_link_enable'] = true;
	settingsdef['menu_link_liste'] = 'Owiki&http://www.owiki.de/|';
	settingsdef['menu_link_pos'] = -1;
	settingsdef['menu_mode'] = 0;

	//flottenfarben
	settingsdef['uebersicht_flotten_farben'] = '';
	settingsdef['uebersicht_flotten_farben'] += '0|ownespionage&0&#ffa500&0&0&0&0&#E6EBFB|ownespionage&1&#ffa500&1&0&0&2&#666666|espionage&0&#ffa500&0&1&0&0&#E6EBFB|'; //espionage&1&#ffa500&1&1&0&2&#666666|';
	settingsdef['uebersicht_flotten_farben'] += '1|owntransport&0&#99ff66&0&0&0&0&#E6EBFB|owntransport&2&#99ff66&0&0&1&1&#E6EBFB|owntransport&1&#99ff66&1&0&0&2&#666666|transport&0&#99ff66&0&1&0&0&#E6EBFB|transport&2&#99ff66&0&1&1&1&#E6EBFB|'; //transport&1&#99ff66&1&1&0&2&#666666|';
	settingsdef['uebersicht_flotten_farben'] += '2|ownharvest&0&#88ff00&0&0&0&0&#E6EBFB|ownharvest&1&#88ff00&1&0&0&2&#666666|harvest&0&#88ff00&0&1&0&0&#E6EBFB|'; //harvest&1&#88ff00&1&1&0&2&#666666|';
	settingsdef['uebersicht_flotten_farben'] += '3|owndeploy&0&#00ff00&0&0&0&0&#E6EBFB|owndeploy&1&#00ff00&1&0&0&2&#666666|'; //deploy&0&#00ff00&0&1&0&0&#E6EBFB|';
	settingsdef['uebersicht_flotten_farben'] += '4|ownhold&0&#00cc70&0&0&0&0&#E6EBFB|ownhold&2&#00cc70&0&0&1&1&#E6EBFB|ownhold&1&#00cc70&1&0&0&2&#666666|hold&0&#00cc70&0&1&0&0&#E6EBFB|hold&2&#00cc70&0&1&1&1&#E6EBFB|'; //hold&1&#00cc70&1&1&0&2&#666666|';
	settingsdef['uebersicht_flotten_farben'] += '5|ownattack&0&#d00000&0&0&0&0&#E6EBFB|ownattack&1&#d00000&1&0&0&2&#666666|attack&0&#d00000&0&1&0&0&#E6EBFB|'; //attack&1&#d00000&1&1&0&2&#666666|';
	settingsdef['uebersicht_flotten_farben'] += '6|ownfederation&0&#8b0000&0&0&0&0&#E6EBFB|ownfederation&1&#8b0000&1&0&0&2&#666666|federation&0&#8b0000&0&1&0&0&#E6EBFB|'; //federation&1&#8b0000&1&1&0&2&#666666|';
	settingsdef['uebersicht_flotten_farben'] += '7|owndestroy&0&#cc6600&0&0&0&0&#E6EBFB|owndestroy&1&#cc6600&1&0&0&2&#666666|destroy&0&#cc6600&0&1&0&0&#E6EBFB|'; //destroy&1&#cc6600&1&1&0&2&#666666|';
	settingsdef['uebersicht_flotten_farben'] += '8|ownmissile&0&#cc3300&0&0&0&0&#E6EBFB|missile&0&#cc3300&0&1&0&0&#E6EBFB|';
	settingsdef['uebersicht_flotten_farben'] += '9|owncolony&0&#80a0C0&0&0&0&0&#E6EBFB|owncolony&1&#80a0C0&1&0&0&2&#666666|'; //colony&0&#80a0C0&0&1&0&0&#E6EBFB|colony&1&#80a0C0&1&1&0&2&#666666|';
	settingsdef['uebersicht_flotten_farben'] += '10|phalanx_fleet&0&#55FF00&0&0&0&0&#E6EBFB|phalanx_fleet&2&#55FF00&0&0&1&1&#E6EBFB|phalanx_fleet&1&#005500&0&0&0&0&#666666|';

	settingsdef['flotte_schiffauswahl'] = false;
	settingsdef['flotte_seite1_upsidedown'] = false;
	settingsdef['flotte_seite2_combobox'] = false;
	settingsdef['flotte_seite2_tfwahl'] = false;
	settingsdef['flotte_seite2_shortlinks'] = false;
	settingsdef['flotte_seite2_shortlinks_a'] = 'red';
	settingsdef['flotte_seite2_shortlinks_p'] = 'orange';
	settingsdef['flotte_seite3_zeiten'] = false;
	settingsdef['flotte_flugpos'] = '';
	settingsdef['flotte_flugpos_temp'] = '';
	settingsdef['flotte_flugpos_enable'] = false;

	//planiliste
	settingsdef['plani_verbessern'] = false;
	settingsdef['plani_shortname'] = false;
	settingsdef['plani_mondklammern'] = false;
	settingsdef['plani_linkplanetmond'] = false;
	settingsdef['plani_mondextra'] = false;
	settingsdef['plani_pnm'] = false;
	settingsdef['plani_hpmarker'] = false;

	settingsdef['plani_hptotop'] = false;

	settingsdef['plani_next'] = false;
	settingsdef['plani_next_modus'] = 0;
	settingsdef['plani_next_liste'] = 0;
	settingsdef['plani_next_tt'] = true;
	settingsdef['plani_next_nomsg'] = true;

	settingsdef['plani_combobox'] = false;
	settingsdef['plani_combobox_type'] = 0;
	settingsdef['plani_combobox_val'] = 'P';
	settingsdef['plani_combobox_tooltip'] = true;
	
	//statistiklinks
	settingsdef['statlinks_use_stats'] = false;
	settingsdef['statlinks_use_gala'] = true;
	settingsdef['statlinks_use_spio'] = false;
	settingsdef['statlinks_pn1'] = 'Spielerstats @ War-Riders.de';
	settingsdef['statlinks_pu1'] = 'http://war-riders.de/index.cgi?uni=*UNI*&page=details&type=player&name=*NAME*';
	settingsdef['statlinks_pn2'] = 'Spielerstats @ Playakind.de';
	settingsdef['statlinks_pu2'] = 'http://www.playakind.de/index_ogs.php?extern=ogs&suche=spieler&uni=*UNI*&suche2=*NAME*';
	settingsdef['statlinks_pn3'] = 'Spielerstats @ Ostat.de';
	settingsdef['statlinks_pu3'] = 'http://uni*UNI*.ostat.de/index.php?ext=player&name=*NAME*';
	settingsdef['statlinks_pn4'] = '';
	settingsdef['statlinks_pu4'] = '';
	settingsdef['statlinks_pn5'] = '';
	settingsdef['statlinks_pu5'] = '';
	settingsdef['statlinks_an1'] = 'Allystats @ War-Riders.de';
	settingsdef['statlinks_au1'] = 'http://war-riders.de/index.cgi?uni=*UNI*&page=details&type=ally&name=*NAME*';
	settingsdef['statlinks_an2'] = 'Allystats @ Playakind.de';
	settingsdef['statlinks_au2'] = 'http://www.playakind.de/index_ogs.php?extern=ogs&suche=allianz&uni=*UNI*&suche2=*NAME*';
	settingsdef['statlinks_an3'] = 'Allystats @ Ostat.de';
	settingsdef['statlinks_au3'] = 'http://uni*UNI*.ostat.de/index.php?ext=ally&name=*NAME*';
	settingsdef['statlinks_an4'] = '';
	settingsdef['statlinks_au4'] = '';
	settingsdef['statlinks_an5'] = '';
	settingsdef['statlinks_au5'] = '';

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
}

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

// Finde heraus, wieviele Ressourcen welchen Typs der Spieler hat
function HoleRessourcen() // Finde heraus, wieviele Ressourcen welchen Typs der Spieler hat
{
	var Zellen = document.getElementById('resources');
	Zellen = Zellen.rows[2].cells;
	
	var Arr = new Array(); // zum Speichern der Zahlen
	
	for (var i = 0; i < 3; i++) // Zellen 0-2
	{
		Arr[i] = InInt(Zellen[i].innerHTML); // Inhalt in Ganzzahl verwandeln und speichern
	}
	
	var Werte = Zellen[4].innerHTML.replace(/<[^<>]*>/g, '').split('/'); // die Energie an dem / trennen
	Arr[4] = InInt(Werte[0]); // und jeweils als Ganzzahl speichern, die Gesamtmenge zuerst, da sie fuer die Gebaeude und Forschungen benoetigt wird
	Arr[3] = InInt(Werte[1]);
	
	return Arr; // Zahlen zurueckgeben
}

// Breite einer Tabelle anhand der Einstellungen etc. berechnen
function TabBreite(Max, Min)
{
	return Math.max(Math.min(Math.min(ogs.load('max_tab_breite'), Max), document.body.clientWidth-10), Min);
}

function ogs_statlinks_load()
{
	var name, url;
	var statlinks = new Object();
	statlinks.pn = new Array();
	statlinks.pu = new Array();
	statlinks.an = new Array();
	statlinks.au = new Array();
	
	for (var i = 1; i < 6; i++)
	{
		name = ogs.load('statlinks_pn'+i).trim();
		url = ogs.load('statlinks_pu'+i).trim();
		if (name.length > 0 && url.length > 0)
		{
			statlinks.pn.push(name);
			statlinks.pu.push(url);
		}
		
		name = ogs.load('statlinks_an'+i).trim();
		url = ogs.load('statlinks_au'+i).trim();
		if (name.length > 0 && url.length > 0)
		{
			statlinks.an.push(name);
			statlinks.au.push(url);
		}
	}
	
	return statlinks;
}

function ogs_statlinks_creattooltipline(str, name, linkname)
{
	return '<tr><td><a href=\\\'' + ogs.getLink(str.replace(/\*UNI\*/g,ogs.ogame.server.match(/\d+/)).replace(/\*NAME\*/g,name)) + '\\\' target=\\\'_blank\\\'>'+linkname+'</a></td></tr>';
}

//*********************************************************************************************************************
//											Funktionsabsatz - Skriptfunktionen
//*********************************************************************************************************************

function ogs_FlottenFaerben()
{
	var ret = '';
	var typArt = new Array('.flight','.return','.holding');
	var typStyle = new Array('font-style: normal !important;','font-style: italic !important;');
	var typTransform = new Array('text-transform: none !important;','text-transform: uppercase !important;','text-transform: lowercase !important;'); //,'text-transform: capitalize;'
	var typDecoration = new Array('text-decoration: none !important;','text-decoration: underline !important;','text-decoration: overline !important;','text-decoration: line-through !important;','text-decoration: blink !important;');
	var typSize = new Array('font-size: inherit !important;','font-size: larger !important;','font-size: smaller !important;'); //font-size: medium;

	var thisdata = ogs.load('uebersicht_flotten_farben');

	if (thisdata.trim() == '')
		thisdata = settingsdef['uebersicht_flotten_farben'];

	var data = ogs.array.split(thisdata,'|','&');
	delete thisdata;

	ogs.load('flotten_zusatz');
	ogs.load('skin_advance');
	ogs.load('flotten_faerben');

	for (var i = 0; i < data.length; i++)
	{
		if (data[i].length > 1)
		{
			if (settingscur['flotten_faerben'])
			{
				//haupttext
				ret += ' ' + typArt[data[i][1]] + '.' + data[i][0] + ' ,' + typArt[data[i][1]] + '.' + data[i][0] + ' a { color: ' + data[i][2] + ' !important; ';
				ret += typStyle[data[i][3]] + ' ' + typTransform[data[i][4]] + ' ' + typDecoration[data[i][5]] + ' ' + typSize[data[i][6]] + '} ';
				
				//linktext
				ret += ' ' + typArt[data[i][1]] + '.' + data[i][0] + ' a { color: ' + data[i][7] + ' !important; font-size: inherit !important;} ';
			}
			
			if (settingscur['flotten_zusatz'] && settingscur['skin_advance'])
			{
				//zusatzinfos
				
				//ogame bugfix ...
				if (data[i][0] == 'ownattack')
				{
					if (data[i][1] == 0)
					{
						ret += ' span.attack a[title]:after ,';
					}
				}
				else if (data[i][0] == 'ownfederation')
				{
					if (data[i][1] == 0)
					{
						ret += ' span.federation a[title]:after ,';
					}
				}
				
				ret += ' ' + typArt[data[i][1]] + '.' + data[i][0] + ' a[title]:after { content:" ("attr(title)")"; ';
				
				if (settingscur['flotten_faerben'])
					ret += 'color: ' + data[i][2] + ' !important;}' 
				else
					ret += 'color: ' + ogs.textfarbe + ' !important;}';
			}
		}
	}

	ogs.addStyle(ret);
}

//-----------------------------
// Notizen richtig anzeigen
//-----------------------------
function ogs_notizen()
{
	var ContDiv = document.getElementById('content');
	
	ContDiv.style.position = 'relative';
	ContDiv.style.overflow = 'visible';
}

//-----------------------------
// Phalanx erweitern
//-----------------------------
function ogs_phalanx()
{
	ogs.textfarbe = ogs.load('skriptcolor');
	
	if (ogs.load('endzeiten'))
	{
		// Zeitdifferenz bestimmen
		ogs.zeitdifferenz = parseInt(ogs.load('zeit_diff'),10);
		var verschiebung = parseInt(ogs.load('zeitverschiebung'), 10);
		var vBXX = ogs.dom.getEBF(document,'div','id.match(/bxx/)');
		
		for (var i = 0; i < vBXX.length; i++)
		{
			var vP = document.createElement('b');
			vP.innerHTML = ogs.time.stamp(new Date(verschiebung * 60000 + 1000 * parseInt(vBXX[i].getAttribute('star'))));
			vBXX[i].parentNode.appendChild(vP);
		}
	}
	
	if (ogs.load('flotten_zusatz') && ogs.load('skin_advance'))
	{
		ogs.load('flotten_zusatz');
		
		var Links = document.getElementsByTagName('a');
		
		for (var i = 0; i < Links.length; i++)
		{
			if (!Links[i].title || Links[i].title.search(/^[0-9]+$/) + 1) { continue; } // bei nur aus Zahlen bestehenden Titeln nichts tun (das sind die Counter)
			
			Links[i].title = Links[i].title.replace(/([0-9])([A-Z])/g, '$1, $2');
			Links[i].title = Links[i].title.replace(/Anzahl der Schiffe ([0-9]+)/g, 'Anzahl der Schiffe $1: ');
		}
	}
	
	if (ogs.load('flotten_faerben') || (ogs.load('flotten_zusatz') && ogs.load('skin_advance')))
	{
		ogs_FlottenFaerben();
	}
}


//--------------------------------
// pranger evolution css loeschen
//--------------------------------
function ogs_pranger()
{
	csslinks = document.getElementsByTagName('link');
	
	for (var i = csslinks.length - 1; i >= 0; i--)
	{
		if (csslinks[i].href == 'http://80.237.203.201/download/use/evolution/formate.css')
		{
			csslinks[i].parentNode.removeChild(csslinks[i]);
			break;
		}
	}
}

//----------------------
// Startseiten Optionen
//----------------------
function ogs_startpage()
{
	if (ogs.load('selectuniverse'))
	{
		var uniselect = document.getElementsByName('universe');

		if (uniselect.length > 0)
		{
			uniselect = uniselect[0];
			
			function saveUni()
			{
				if (confirm(txt('login_1','"#*1*#" als Standard-Universum ausw\u00E4hlen?\n\nEs wird nur die Nummer des Universums gespeichert.\n(kein Spielername und kein Passwort!)',uniselect.value)))
					ogs.save('universe_'+ogs.ogame.serversprache, uniselect.selectedIndex);
			}
			
			var mainMenu = document.getElementById('mainmenu');
			if (mainMenu != null)
			{
				var mainMenuA = document.createElement('a');
				mainMenuA.href = '#';
				mainMenuA.innerHTML  = txt('login_2','OGS: Save Uni');
				ogs.addEvent(mainMenuA,'click', saveUni, false);
				mainMenu.appendChild(mainMenuA);
			}
			
			var value = ogs.load('universe_'+ogs.ogame.serversprache);
			
			if (value >= 0 && uniselect.length > value)
				uniselect.selectedIndex = value;
			
		}
	}
	
	if (ogs.load('fokusonlogin'))
	{
		var loginbutton = document.getElementById('button');
		
		if (loginbutton != null)
			loginbutton.focus();
	}
}




























//--------------------------------
// Hier Startes das Hauptskript
//--------------------------------
function ogameskript()
{
	//-----
	// GPL
	//-----
	if (!ogs.load('gpl'))
	{
		alert('OGame-Skript v' + ogs.version() + ', Copyright (C) 2006-2007 Windows-zerstoerer, ab M&auml;rz 2007 Eleria & Co, ab Juli 2007 hakaz & User-Gruppe des OGame-Forums\nF' + ue + 'r das OGame-Skript besteht KEINERLEI GARANTIE. OGame-Skript ist freie Software, die du unter bestimmten Bedingungen weitergeben darfst. Weitere Details findest du im Einstellungen-Men' + ue + ' unten. Mit der Verwendung des Skriptes werden die Bedingungen der GPL aktzeptiert.');
		ogs.save('gpl', 1);
	}
	
	// Textfarbe der eingefuegten Skripterweiterungen laden
	ogs.textfarbe = ogs.load('skriptcolor');
	
	// Zeitdifferenz bestimmen
	ogs.zeitdifferenz = parseInt(ogs.load('zeit_diff'),10);
	
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
	
	if (ogs.load('menu_mode') > 0)
	{
		if (ogs.browser == 'ff')
		{
			ContDiv.style.position = 'relative';
			ContDiv.style.overflow = 'visible';
			
			if (settingscur['menu_mode'] == 1)
				LeftDiv.style.position = 'fixed';
			else 
				LeftDiv.style.position = 'absolute';
			
			LeftDiv.style.overflow = 'visible';
		}
		else
		{
			/*
			ContDiv.style.position = 'relative';
			ContDiv.style.overflow = 'visible';
			
			if (settingscur['menu_mode'] == 1)
				LeftDiv.style.position = 'fixed';
			else
				LeftDiv.style.position = 'absolute';
			
			LeftDiv.style.overflow = 'visible';
			*/
		}
	}

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
	
	ogs_kopfzeile();
	
	// Zeit im linken Menu anzeigen
	if (ogs.load('zeit_links')) // Zeit im NaviMenue anzeigen
	{
		function ZeitAktualisieren2() // aktualisiere die aktuelle Uhrzeit
		{
			document.getElementById('akt_zeit').innerHTML = ogs.time.toString(ogs.time.now()); // Ankunfszeit formatieren und anzeigen
			window.setTimeout(ZeitAktualisieren2, 999);
		}
		
		var Zeitzeile = document.getElementsByTagName('nobr')[0]; // Absatz mit der OGame-Version finden
		
		if (Zeitzeile) 
		{
			Zeitzeile.innerHTML += '<br /><b><span style="color:' + ogs.textfarbe + ';" id="akt_zeit">-</span></b>';
			ZeitAktualisieren2();
		}
	}

	//Menüzeilen einträge anzeigen!
	ogs.load('pranger');
	
	if (ogs.load('menu_link_enable') || settingscur['pranger'])
	{
		//menütable laden
		var vMenu = document.getElementById('menu').getElementsByTagName('table')[0];
		var vMenuMode = false;
		
		if (ogs.load('menu_link_pos') > -1 && vMenu.rows.length > settingscur['menu_link_pos'])
		{
			vMenu = vMenu.rows[settingscur['menu_link_pos']];
			vMenuMode = true;
		}
		else
		{
			var vTr = document.createElement('tr');
			var vTd = document.createElement('td');
			vTr.appendChild(vTd);
			vTd.innerHTML = '&nbsp;';
			vMenu.appendChild(vTr);
		}
		
		if (settingscur['pranger'])
		{
			var vTr = document.createElement('tr');
			var vTd = document.createElement('td');
			vTr.appendChild(vTd);
			vTd.innerHTML = '<div align="center"><font color="#FFFFFF"><a href="/game/pranger.php" target="_blank">'+txt('m_1','Pranger')+'</a></font></div>';
			
			if (vMenuMode)
				vMenu.parentNode.insertBefore(vTr,vMenu);
			else
				vMenu.appendChild(vTr);
		}

		if (settingscur['menu_link_enable'])
		{
			var vMenuData = ogs.array.split(ogs.load('menu_link_liste'),'|','&');
			
			for (var i = 0; i < vMenuData.length; i++)
			{
				if (vMenuData[i].length == 2 && vMenuData[i][0] != '' && vMenuData[i][1] != '') 
				{
					var vTr = document.createElement('tr');
					var vTd = document.createElement('td');
					vTr.appendChild(vTd);
					vTd.innerHTML = '<div align="center"><font color="#FFFFFF"><a href="' + ogs.getLink(vMenuData[i][1]) + '" target="_blank">'+vMenuData[i][0]+'</a></font></div>';
					
					if (vMenuMode)
						vMenu.parentNode.insertBefore(vTr,vMenu);
					else
						vMenu.appendChild(vTr);
				}
			}
		}
	}
	
	// In der Schiffsauswahl
	if (ogs.ogame.page == 'flotten1')
	{
		// Fuegt einen weiteren Button 'ben' ein, berechnet Laderaumkapazitaet der ausgewaehlten Schiffe
		var AnzeigeKap = ogs.dom.getEBF(ContDiv,'table','width == 519');
		
		//Vertauscht die Anzeigen im Flotten 1 Menü
		if (ogs.load('flotte_seite1_upsidedown')) AnzeigeKap[0].parentNode.appendChild(AnzeigeKap[0]);
			
		//ogs.dom.removeElement(AnzeigeKap0);	
		if (AnzeigeKap[1].innerHTML.match(/Flottenverband/))
		{
			AnzeigeKap = AnzeigeKap[2];
		}
		else
		{
			AnzeigeKap = AnzeigeKap[1];
		}
		
		var zeile = document.createElement('tr');
		var zelle = document.createElement('th');
		ogs.dom.insertBehind(zeile,ogs.dom.getEBF(ContDiv,'a','href.match("maxShips()")')[0].parentNode.parentNode);
		zeile.appendChild(zelle);
		zeile.style.height = '20px';
		zelle.colSpan = 4;
		zelle.innerHTML = txt('f_storage','Gew&auml;hlte Ladekapazit&auml;t')+'<br /><div id="storage" style="color:lime;">0</div>';
		
		var Ress = HoleRessourcen(); // vorhandene Ressourcen bestimmen
		var RessSumme = Ress[0] + Ress[1] + ((!ogs.load('kein_deut')) ? Ress[2] : 0); // Summe der Ressourcen bestimmen, Deut nur einrechnen falls es nicht deaktiviert wurde
		var Links = ogs.dom.getEBF(ContDiv,'a','href.match(/javascript:maxShip\\(/)'); // 'max'-Links finden
		
		for (var i = 0; i < Links.length; i++) // Ueber alle max-Links
		{
			var ID = Links[i].href.match(/ship([0-9]+)/)[1]; // Schiffs-ID bestimmen
			
			if (ID == 202 || ID == 203 || ID == 209) // fuer kleine und grosse Transporter
			{
				var BenSchiffe; // benoetigte Anzahl Schiffe
				
				switch(ID)
				{
					case '202': BenSchiffe = Math.ceil(RessSumme / 5000); break;
					case '203': BenSchiffe = Math.ceil(RessSumme / 25000); break;
					default: BenSchiffe = Math.ceil(RessSumme / 20000); break;
				}
				
				var Vorhanden = document.getElementsByName('maxship' + ID)[0].value; // vorhandene Anzahl Schiffe
				// Linkziel ist ein JavaScript, das die Schiffsanzahl entsprechend setzt
				var url = 'javascript: void(document.getElementsByName("ship' + ID + '")[0].value = ' + Math.min(Vorhanden, BenSchiffe) + ');';
				var tooltiptext = '<table width=\\\'100%\\\'><tr><td><center>';
				
				var tooltiplang = txt('f_8',new Array('erforderlich: ','vorhanden: ','fehlend: '));
				
				if (Vorhanden < BenSchiffe)
				{
					var farbe = 'red';
					tooltiptext += tooltiplang[0] + BenSchiffe + '<br />' + tooltiplang[1] + Vorhanden + '<br />' + tooltiplang[2] + '<font style=\\\'color: '+farbe+'\\\'>'+(BenSchiffe - Vorhanden)+'</font>';
				}
				else
				{
					var farbe = 'green';
					tooltiptext += tooltiplang[0] + BenSchiffe;
				}
				
				tooltiptext += '</center></td></tr></table>';
				url += 'ogs.calcLaderaum();';
				
				var link = ogs.dom.newElement('a', 'ben', 'href', url);
				ogs.addOverLib(link,tooltiptext);
				link.style.color = farbe;
				Links[i].parentNode.appendChild(link); // Link einfuegen
			}
		}
		
		function ogs_calcLaderaum()
		{
			window.setTimeout(function()
			{
				var z = 0;
				
				for (var i = 200; i < 220; i++)
				{
					if (document.getElementsByName('ship' + i).length > 0 && i != 210)
						z += document.getElementsByName('capacity' + i)[0].value * document.getElementsByName('ship' + i)[0].value;
				}
				
				document.getElementById('storage').innerHTML = TausenderZahl(z);
			}, 50);
		}
		ogs.bind('calcLaderaum',ogs_calcLaderaum);
		
		var Anzahl = ogs.dom.getEBF(ContDiv, 'input', 'size == 10 && knoten.name.match(/ship/)'); // Event onchange fuer Berechnung der Ladekapazitaet ueber Input, geht nicht ueber innerHTML
		for (var i = 0; i < Anzahl.length; i++) ogs.addEvent(Anzahl[i],'change', ogs.calcLaderaum, true);
		
		var Anzahl = ogs.dom.getEBF(ContDiv, 'a', 'href.match(/Ship/)'); // Event onclick fuer Berechnung der Ladekapazitaet ueber Link, geht nicht ueber innerHTML
		for (var i = 0; i < Anzahl.length; i++) ogs.addEvent(Anzahl[i],'click', ogs.calcLaderaum, true);
		
		// Ankunftszeit bei Rueckruf, original von xsign.dll
		function RTime()
		{
			var rbutton = document.getElementsByName('order_return');
			if(rbutton.length == 0) return;
			
			var curdate = ogs.time.now();
			
			for (var i = 0; i < rbutton.length; i++)
			{
				var senddate = ogs.time.einlesen(rbutton[i].parentNode.parentNode.parentNode.getElementsByTagName('th')[4].innerHTML);
				var ankfdate = ogs.time.einlesen(rbutton[i].parentNode.parentNode.parentNode.getElementsByTagName('th')[6].innerHTML);
				
				var curstamp = curdate.getTime();
				var sendstamp = senddate.getTime();
				var ankfstamp = ankfdate.getTime();
				
				//jahreswechselsupport
				if (sendstamp > ankfstamp)
				{
					ankfdate.setFullYear(ankfdate.getFullYear() + 1);
					ankfstamp = ankfdate.getTime();
				}
				
				if (curstamp <= ankfstamp) // + 3000) //erst 3 sekunden nachher ruckzug entfernen.
				{
					var rdate = new Date(2 * curstamp - sendstamp);
					var zus = '<br /><font color="' + ogs.textfarbe + '">';
					zus += (rdate.getDate() != curdate.getDate()) ? rdate.getDate() + '.' + (rdate.getMonth() + 1) + '.' : '&nbsp;';
					var rh = rdate.getHours();
					var rm = rdate.getMinutes();
					var rs = rdate.getSeconds();
					if (rh < 10) { rh = '0' + rh; }
					if (rm < 10) { rm = '0' + rm; }
					if (rs < 10) { rs = '0' + rs; }
					zus += '<br />' + rh + ':' + rm + ':' + rs + '</font>';
					var rspan = document.getElementById('sp' + i);
					
					if (!rspan)
					{
						rspan = document.createElement('span');
						rspan.id = 'sp'+i;
						rbutton[i].parentNode.appendChild(rspan);
					}
					
					rspan.innerHTML = zus;
				}
				else
				{
					var rspan = document.getElementById('sp' + i);
					if (rspan) rspan.innerHTML = '';
				}
			}
		}
		
		if (ogs.load('ankft_zeit'))
		{
			RTime();
			window.setInterval(RTime, 499);
		}
	}
	
	if (((ogs.ogame.page == 'flotten2' && ogs.planetliste) || (ogs.ogame.page == 'flotten3')) && ogs.window.shortInfo)
	{
		if (ogs.load('flotte_schiffauswahl'))
		{
			var Schiffe = new Array();
			Schiffe['namen'] = txt('ship_name', new Array('Kleiner Transporter', 'Gro' + sz + 'er Transporter', 'Leichter J&auml;ger', 'Schwerer J&auml;ger', 'Kreuzer', 'Schlachtschiff', 'Kolonieschiff', 'Recycler', 'Spionagesonde', 'Bomber', 'Solarsatellit', 'Zerst&ouml;rer', 'Todesstern', 'Schlachtkreuzer'));
			Schiffe['ids'] = new Array(202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215);
			var Unterwegs = new Array('<tr><td class="c" colspan="2">'+txt('f_1','Schiffe')+'</td></tr>');
			
			for (var i = 0; i < Schiffe['ids'].length; i++)
			{
				var ship = document.getElementsByName('ship'+Schiffe['ids'][i]);
				if (ship.length > 0) Unterwegs.push('<tr><th>'+Schiffe['namen'][i]+'</th><th>'+ship[0].value+'</th></tr>');
			}
			
			var element = document.createElement('center');
			element.innerHTML = '<table width="519">'+Unterwegs.join('')+'</table>';
			ContDiv.appendChild(document.createElement('br'));
			ContDiv.appendChild(element);
		}
		
		if (ogs.ogame.page == 'flotten3' && ogs.load('flotte_seite3_zeiten'))
		{
			var element = document.createElement('center');
			element.innerHTML = '<table width="519"><tr><td class="c" colspan="2">'+txt('f_6','Zeiten')+'</td></tr><tr><th>'+txt('f_7','Dauer (eine Strecke)')+'</th><th id="duration">-</th></tr><tr><th>'+txt('f_3','Ankunft (Ziel)')+'</th><th id="ankunft_ziel">-</th></tr><tr><th>'+txt('f_4','Ankunft (Ursprung)')+'</th><th id="ankunft_ursprung">-</th></tr></table>';
			ContDiv.appendChild(document.createElement('br'));
			ContDiv.appendChild(element);
			
			var seconds = ogs.window.duration();
			var hours = Math.floor(seconds / 3600);
			seconds -= hours * 3600;
			var minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60;
			if (minutes < 10) minutes = '0' + minutes;
			if (seconds < 10) seconds = '0' + seconds;
			document.getElementById('duration').innerHTML = hours + ':' + minutes + ':' + seconds + ' h';
			
			function ogs_flotte3_akt() // Zeiten aktualisieren
			{
				var Flugzeit = parseInt(ogs.window.duration());
				var AktZeit = ogs.time.now().getTime();
				Ankunft = new Date(AktZeit + (Flugzeit * 1000)); // Ankunft: Aktuelle Uhrzeit+Flugzeit (*1000 weil es Millisekunden sind)
				Rueck = new Date(AktZeit + (Flugzeit * 2000)); // Rueckkehr: Aktuelle Uhrzeit + 2*Flugzeit (*2000 weil es Millisekunden sind)
				document.getElementById('ankunft_ziel').firstChild.nodeValue = ogs.time.toString(Ankunft); // Ankunfszeit formatieren und anzeigen
				document.getElementById('ankunft_ursprung').firstChild.nodeValue = ogs.time.toString(Rueck); // Rueckkehrzeit formatieren und anzeigen
			}
			
			ogs_flotte3_akt();
			window.setInterval(ogs_flotte3_akt, 200);
		}
	}
	
	// In der Zielauswahl
	if (ogs.ogame.page == 'flotten2' && ogs.planetliste)
	{
		//--------------------------
		// Flottenmenue berarbeiten
		//--------------------------
		
		if (ogs.load('fltmenu_buttons'))
		{
			// Fuegt hinter dem ersten vorhandenen Button einen weiteren ein, der BtnFunk ausfuehrt
			function NeuerButton(Titel, BtnFunk)
			{
				var Btn = ogs.dom.getEBF(ContDiv,'input','type.toLowerCase() == "submit"'); // alle Buttons (input-Tag mit type="submit") in einer Tabellentitelzelle, deren colspan>1 ist
				if (!Btn) return;
				Btn = Btn[Btn.length-1]; // den letzten gefundenen Button nehmen
				var NeuBtn = document.createElement('input'); // Neuen Button erstellen
				NeuBtn.type = 'button'; // Damit es auch ein Button wird
				NeuBtn.value = Titel; // Beschriftung zuweisen
				ogs.addEvent(NeuBtn,'click', BtnFunk, true); // Klick-Funktion zuweisen
				Btn.parentNode.appendChild(NeuBtn); // neuen Button hinter den anderen setzen
			}

			// Schickt die Flotte zum Default-Plani
			function ZumDefPlSenden()
			{
				ogs.window.setTarget(ogs.planetliste[0]['Def']['Gala'], ogs.planetliste[0]['Def']['Sys'], ogs.planetliste[0]['Def']['Pos'], ogs.planetliste[0]['Def']['Typ']); // Flottenziel setzen
				ogs.window.shortInfo(); // Anzeige aktualisieren
				if (InInt(document.getElementById('storage').innerHTML) <= 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
					if (!ogs.load('warnung'))
						if (!confirm('Der Laderaum ist hierf' + ue + 'r zu klein. Trotzdem fortfahren?')) { return; } // falls der User es wnscht, abbrechen //WARNUNG
				
				document.forms[0].submit(); // Formular absenden
			}

			// Schickt die Flotte zum aktuellen Mond, wenn ein Plani aktiv ist, und umgekehrt
			function ZumAktPartnerSenden()
			{
				if (!ogs.planetliste[0]['Aktiv']['Partner']) return;
				var Partner = ogs.planetliste[0]['Aktiv']['Partner'];
				ogs.window.setTarget(Partner['Gala'], Partner['Sys'], Partner['Pos'], Partner['Typ']); // Flottenziel setzen
				ogs.window.shortInfo(); // Anzeige aktualisieren
				
				if (InInt(document.getElementById('storage').innerHTML) < 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
					if (!ogs.load('warnung'))
						if (!confirm('Der Laderaum ist hierf' + ue + 'r zu klein. Trotzdem fortfahren?')) { return; } // falls der User es wnscht, abbrechen //WARNUNG
				
				document.forms[0].submit(); // Formular absenden
			}
			
			function ZumPlaniButton(Plani, BtnFunk) // kleine Hilfsfunktion
			{
				NeuerButton(((Plani['Typ'] == ogs.planettype.planet) ? txt('f_p','zum Plani #*1*#',Plani['Name']) : txt('f_m','zum Mond #*1*#',Plani['Name'])), BtnFunk);
			}
			
			if (ogs.planetliste[0]['Def']['ID'] != ogs.planetliste[0]['Aktiv']['ID']) // wenn der aktuelle Plani nicht der default-Plani ist
				ZumPlaniButton(ogs.planetliste[0]['Def'], ZumDefPlSenden); // neuen Button einfuegen
			
			if (ogs.planetliste[0]['Aktiv']['Partner'] && ogs.planetliste[0]['Aktiv']['Partner']['ID'] != ogs.planetliste[0]['Def']['ID']) // wenn der aktuelle Plani nen Partner hat
				ZumPlaniButton(ogs.planetliste[0]['Aktiv']['Partner'], ZumAktPartnerSenden);
		}
		
		if (ogs.load('ankft_zeit'))
		{
			// Berechne die Ankunftszeiten und setze sie in die Felder
			function ogs_flotte2_akt()
			{
				var Flugzeit = parseInt(ogs.window.duration());
				
				// Zeiten aktualisieren
				var AktZeit = ogs.time.now().getTime(); // aktuelle Zeit
				Ankunft = new Date(AktZeit + (Flugzeit * 1000)); // Ankunft: Aktuelle Uhrzeit+Flugzeit (*1000 weil es Millisekunden sind)
				Rueck = new Date(AktZeit + (Flugzeit * 2000)); // Rueckkehr: Aktuelle Uhrzeit + 2*Flugzeit (*2000 weil es Millisekunden sind)
				document.getElementById('ankunft_ziel').firstChild.nodeValue = ogs.time.toString(Ankunft); // Ankunfszeit formatieren und anzeigen
				document.getElementById('ankunft_ursprung').firstChild.nodeValue = ogs.time.toString(Rueck); // Rueckkehrzeit formatieren und anzeigen
			}
			
			// Geschwindigkeitsauswahl anordnen
			var geschw_ausw = document.getElementsByName('speed')[0];
			geschw_ausw.parentNode.style.textAlign = 'left';
			geschw_ausw.parentNode.style.textIndent = '10px';
			
			// fuegt Tabellenzeile fuer die Anzeige der Ankunftszeiten ein und startet den Timer zum Berechnen
			var TabZeile = document.getElementById('duration').parentNode.parentNode; // Zeile mit der Flugzeit
			
			// Zeile fuer Zielankunft erstellen
			var NeueZeile = document.createElement('tr'); // Neue Zeile
			NeueZeile.appendChild(ogs.dom.newElement('th', txt('f_3','Ankunft (Ziel)'))); // Zelle in Zeile
			var NeueZelle = ogs.dom.newElement('th', '<div id="ankunft_ziel">-</div>'); // 2. Zelle
			NeueZelle.height = '20'; // Attribute zuweisen
			NeueZeile.appendChild(NeueZelle); // Zelle in Zeile
			TabZeile = ogs.dom.insertBehind(NeueZeile, TabZeile); // neue Zeile einfuegen
			
			// Zeile fuer Ursprungsankunft erstellen (via DOM, innerHTML klappt nicht)
			NeueZeile = document.createElement('tr'); // Neue Zeile
			NeueZeile.appendChild(ogs.dom.newElement('th', txt('f_4','Ankunft (Ursprung)'))); // Zelle in Zeile
			NeueZelle = ogs.dom.newElement('th', '<div id="ankunft_ursprung">-</div>'); // 2. Zelle
			NeueZelle.height = '20'; // Attribute zuweisen
			NeueZeile.appendChild(NeueZelle); // Zelle in Zeile
			TabZeile = ogs.dom.insertBehind(NeueZeile, TabZeile); // neue Zeile einfuegen
			
			// Warnung einfuegen
			var element = document.createElement('center');
			element.innerHTML = '<table width="519"><tr><th>'+txt('f_5','Bitte beachte, dass abh&auml;ngig von der Geschwindigkeit deines Internetzugangs die oben angegebene Uhrzeit um einige Sekunden daneben liegen kann. Die angenommene Serverzeit in der &Uuml;bersicht oder links &uuml;ber dem Men&uuml; kann zum Vergleichen herangezogen werden - sie dient als Grundlage f&uuml;r die hier angezeigte Uhrzeit.')+'</th></tr></table>';
			ContDiv.appendChild(document.createElement('br'));
			ContDiv.appendChild(element);
			
			// Timer starten
			ogs_flotte2_akt();
			window.setInterval(ogs_flotte2_akt, 200);
		}
		
		if (ogs.load('flotte_seite2_tfwahl'))
		{
			var rec = document.getElementsByName('ship209');
			if (rec.length > 0) document.getElementsByName('planettype')[0].value = 2; //tf
		}
		
		if (ogs.load('flotte_seite2_combobox'))
		{
			var speedselect = document.getElementsByName('speed');
			
			if (speedselect.length > 0)
			{
				for (var i = 0; i < 10; i++)
				{
					var test = document.createElement('a');
					test.href = 'javascript: document.getElementsByName("speed")[0].value = '+(1+i)+'; ogs.fleet2marker('+i+',0);';
					test.innerHTML = (i*10+10) + ' ';
					
					test.id = 'ogs_speed'+i;
					if (i == 9) test.style.color = 'red';
					
					speedselect[0].parentNode.insertBefore(test, speedselect[0]);
				}
				
				speedselect[0].style.display = 'none';
				speedselect[0].parentNode.removeAttribute('style');
			}

			var planettypeselect = document.getElementsByName('planettype');
			
			if (planettypeselect.length > 0)
			{
				for (var i = 0; i < 3; i++)
				{
					var test = document.createElement('a');
					test.href = 'javascript: document.getElementsByName("planettype")[0].value = '+(1+i)+'; ogs.fleet2marker('+i+',1);';
					test.innerHTML = planettypeselect[0].options[i].text + ' ';
					test.id = 'ogs_ptype'+i;
					
					if (planettypeselect[0].options[i].selected == true)
						test.style.color = 'red';
					
					planettypeselect[0].parentNode.insertBefore(test, planettypeselect[0]);
				}
				
				planettypeselect[0].style.display = 'none';
			}
			
			function ogs_fleet2marker(id, mode)
			{
				if (mode == 0)
				{
					for (var i = 0; i < 10; i++)
					{
						if (id != i)
							document.getElementById('ogs_speed'+i).style.color = '';
						else
							document.getElementById('ogs_speed'+i).style.color = 'red';
					}
				}
				else if (mode == 1)
				{
					for (var i = 0; i < 3; i++)
					{
						if (id != i)
							document.getElementById('ogs_ptype'+i).style.color = '';
						else
							document.getElementById('ogs_ptype'+i).style.color = 'red';
					}
				}
				
				ogs.window.shortInfo();
			}

			function setTarget(galaxy, solarsystem, planet, planettype)
			{
				document.getElementsByName('galaxy')[0].value = galaxy;
				document.getElementsByName('system')[0].value = solarsystem;
				document.getElementsByName('planet')[0].value = planet;
				document.getElementsByName('planettype')[0].value = planettype;
				ogs.fleet2marker(planettype - 1, 1);
			}
			
			ogs.window.setTarget = setTarget;
			ogs.bind('fleet2marker',ogs_fleet2marker);
		}
		
		if (ogs.load('flotte_seite2_shortlinks'))
		{
			var tab = ogs.dom.getEBF(ContDiv,'table','width == 519');
			var absatz = 0;
			
			if (tab.length > 0)
			{
				var zeilen = tab[0].rows;
				var spalten = null;
				var nextspalte = null;
				
				//suche shortlinks und loesche bestehende
				for (var i = 0; i < zeilen.length; i++)
				{
					spalten = zeilen[i].cells;
					
					if (spalten.length == 1)
					{
						absatz++;
						if(absatz > 2) break;
					}
					else
					{
						if (absatz == 2)
						{
							tab[0].deleteRow(i);
							i--;
						}
					}
				}
				
				if (absatz > 1 && i > 0)
				{
					var shortlinkid = i;
					var code = '<table class="ogs_shortlinks" style="width: 100%;">';
					var bezeichnung = txt('f_2',new Array('-','TF','Expo'));
					var posmarker;
					
					for (var i = 1; i < ogs.planetliste.length; i++)
					{
						if (ogs.planetliste[i]['Typ'] == ogs.planettype.planet)
						{
							if(ogs.planetliste[i]['Aktiv'] || (ogs.planetliste[i]['Partner'] && ogs.planetliste[i]['Partner']['Aktiv']))
								posmarker = ' style="color: '+ogs.load('flotte_seite2_shortlinks_p')+';"';
							else
								posmarker = '';

							//Planet
							code += '<th><a href="javascript:setTarget(' + ogs.planetliste[i]['Gala'] + ',' + ogs.planetliste[i]['Sys'] + ',' + ogs.planetliste[i]['Pos'] + ',1); shortInfo()"';
							if(ogs.planetliste[i]['Aktiv'])
								code += ' style="color: '+ogs.load('flotte_seite2_shortlinks_a')+';"';
							else
								code += posmarker;
							
							code += '>' + ogs.planetliste[i]['Name'] + ' ' + ogs.planetliste[i]['Koords'] + '</a></th>';
							
							//Mond
							if (ogs.planetliste[i]['Partner'])
							{
								code += '<th><a href="javascript:setTarget(' + ogs.planetliste[i]['Gala'] + ',' + ogs.planetliste[i]['Sys'] + ',' + ogs.planetliste[i]['Pos'] + ',3); shortInfo()"';
								if(ogs.planetliste[i]['Partner']['Aktiv'])
									code += ' style="color: '+ogs.load('flotte_seite2_shortlinks_a')+';"';
								else
									code += posmarker;
								code += '>' + ogs.planetliste[i]['Partner']['Name'] + '</a></th>';
							}
							else
							{
								code += '<th>'+bezeichnung[0]+'</th>'
							}
							
							// TF
							code += '<th><a'+posmarker+' href="javascript:setTarget(' + ogs.planetliste[i]['Gala'] + ',' + ogs.planetliste[i]['Sys'] + ',' + ogs.planetliste[i]['Pos'] + ',2); shortInfo()">'+bezeichnung[1]+'</a></th>';
							
							// Expo
							code += '<th><a'+posmarker+' href="javascript:setTarget(' + ogs.planetliste[i]['Gala'] + ',' + ogs.planetliste[i]['Sys'] + ',16,1); shortInfo()">'+bezeichnung[2]+'</a></th>';

							code += '</tr>';
						}
					}
					
					tab[0].insertRow(shortlinkid);
					tab[0].rows[shortlinkid].insertCell(0);
					tab[0].rows[shortlinkid].cells[0].colSpan = 2;
					tab[0].rows[shortlinkid].cells[0].innerHTML = code + '</tr></table>';
				}
			}
		}
	}
	
	// In der Auftragsauswahl
	if (ogs.ogame.page == 'flotten3')
	{
		if (ogs.load('auto_auftrag'))
		{
			var vExpedition = document.getElementsByName('planet');
			if (vExpedition.length > 0)
			{
				var vPlanniKoord = parseInt(vExpedition[0].value); //parseInt(vExpedition[0].innerHTML.split(':')[2]);
				if (vPlanniKoord == 16)
				{
					var Auftr = ogs.dom.getEBF(ContDiv, 'input','type == "radio" && knoten.name == "order"');
						Auftr[0].checked = 'checked';
				}
				else
				{
					// beteiligte Schiffe ermitteln
					var HiddenData = ogs.dom.getEBF(ContDiv, 'input','type == "hidden" && knoten.name.match(/ship/)');
					var Beteiligt = new Array(), Kampfschiff = false, Transporter = false;
					
					for (var i = 0; i < HiddenData.length; i++) // ueber alle 'hidden'-Felder
					{
						var ID = HiddenData[i].name.substr(4, 3);
						
						if (ID >= 200 && ID <= 299) // gefundene Schiffe
						{
							Beteiligt[ID] = true; // speichern
							
							// Kampfschiffe sind alle ausser Transportern, Recyclern, Kolschiffen und Spiosonden (Solsats kann man nicht schicken)
							if (ID != 202 && ID != 203 && ID != 209 && ID != 208 && ID != 210) Kampfschiff = true;
							if (ID == 202 || ID == 203) Transporter = true;
						}
					}
					
					// moegliche Auftraege finden
					var Auftr = ogs.dom.getEBF(ContDiv, 'input','type == "radio" && knoten.name == "order"'); // Alle Tags fuer die Auftragsauswahl finden
					var AuftrgBoxen = new Array(), BereitsMarkiert = false;
					
					for (var i = 0; i < Auftr.length; i++) //  Ueer alle Auftragsauswahl-Tags
					{
						AuftrgBoxen[Auftr[i].value] = Auftr[i]; // speichern
						if (Auftr[i].checked) // falls diese Box vormakrkiert ist
						{
							BereitsMarkiert = true; // speichere eine Vormarkierung
							break; // Ende der Schleife - es wird nichts markiert, weil schon was markiert ist
						}
					}
					
					if (!BereitsMarkiert)
					{
						if (Kampfschiff && AuftrgBoxen[1])
						{
							if (AuftrgBoxen[2])
								AuftrgBoxen[2].checked = 'checked'; // 2 = Verbandsangriff
							else
								AuftrgBoxen[1].checked = 'checked'; // 1 = Angreifen
						}
						else
						{
							if (Beteiligt[210] && AuftrgBoxen[6])
							{
								AuftrgBoxen[6].checked = 'checked'; // 210 = Spiosonde, 6 = Spionieren
							}
							else
							{
								if (Beteiligt[209] && AuftrgBoxen[8])
								{
									AuftrgBoxen[8].checked = 'checked'; // 209 = Recycler, 8 = Abbau
								}
								else
								{
									if (Beteiligt[208] && AuftrgBoxen[7])
									{
										AuftrgBoxen[7].checked = 'checked'; // 208 = Koloschiff, 7 = Kolonisieren
									}
									else
									{
										if (((Beteiligt[210] && !Kampfschiff && !Transporter) || ogs.load('stationieren_vorz')) && AuftrgBoxen[4])
										{
											AuftrgBoxen[4].checked = 'checked'; // 210 = Spiosonde alleine, 4= Stationieren
										}
										else
										{
											if (AuftrgBoxen[3])
											{
												AuftrgBoxen[3].checked = 'checked'; // alle anderen Faelle, 3 = Transport
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		// Alternative Beladungsreihenfolge D-K-M
		if (ogs.load('fltmenu_buttons'))
		{
			var AltRessLaden = ogs.dom.getEBF(ContDiv,'a','href == "javascript:maxResources()"')[0].parentNode;
			var AltRessLink = ' (M-K-D)</a><br>&nbsp;<br><a href="javascript: document.getElementsByName(\'resource1\')[0].value = \'0\'; document.getElementsByName(\'resource2\')[0].value = \'0\'; document.getElementsByName(\'resource3\')[0].value = \'0\';' + ((ogs.load('kein_deut')) ? '' : ' maxResource(\'3\');') + ' maxResource(\'2\'); maxResource(\'1\');">'+txt('f_res_all','Alle Rohstoffe (D-K-M)')+'</a>';
			
			//Keine Ressourcen
			AltRessLaden.innerHTML = '<a href="javascript: void(document.getElementsByName(\'resource1\')[0].value = \'0\'); void(document.getElementsByName(\'resource2\')[0].value = \'0\'); void(document.getElementsByName(\'resource3\')[0].value = \'0\');">'+txt('f_res_no','Keine Rohstoffe')+'</a><br>&nbsp;<br>' + AltRessLaden.innerHTML.replace(/<\/a>/i, AltRessLink);
			var AltRessLaden = ogs.dom.getEBF(ContDiv,'a','href.match(/javascript:maxResource\\(\'[1-3]\'\\)/)');
			
			for (var i = 0; i < 3; i++)
			{
				AltRessLaden[i].parentNode.innerHTML = '<a href="javascript: void(document.getElementsByName(\'resource'+(i+1)+'\')[0].value = \'0\'); ">min</a>&nbsp;&nbsp;' + AltRessLaden[i].parentNode.innerHTML;
			}
		}
	}
	
	//----------------------
	// Baumenues verbessern
	//----------------------
	if (ogs.ogame.page == 'buildings' || ogs.ogame.page == 'b_building')
	{
		var zeilen = ogs.dom.getEBF(ContDiv,'table','width == 530');
		
		var spalten;
		var zeilenbr = false;

		if (zeilen.length > 0)
		{
			zeilen = zeilen[0].rows;
		}
		else
		{
			//nix machen kommt vor wenn man keinen skin verwendet ^^ da tabelle dann 468 px
		}
		
		if (zeilen.length > 0)
		{
			//einstellungen laden
			ogs.load('building_nopics');
			ogs.load('building_energie');
			ogs.load('building_klein');
			ogs.load('building_klein_pics_size');
			ogs.load('building_bg');
			ogs.load('building_bg_col1');
			ogs.load('building_bg_col2');
			ogs.load('transbuild');
			ogs.load('colored_ress');
			ogs.load('building_doppelzeilen');
			ogs.load('endzeiten');
			ogs.load('building_reichweite');
			
			//varibalen fürs res färben
			var vSucheRess = exp('b_res_1',new Array(/(Metall: )<b>([\.0-9]+)/,/(Kristall: )<b>([\.0-9]+)/,/(Deuterium: )<b>([\.0-9]+)/,/(Energie: )<b>([\.0-9]+)/));
			var vColorRess = new Array(ogs.load('color_met'),ogs.load('color_kris'),ogs.load('color_deut'),ogs.load('color_eng'));
			var forschung = new Array();
			var forschunganzahl = 0;
			var buildings = '';
			
			//variable für kt gt auslesen
			var ktgtRess = exp('b_res_2',new Array(/Metall:(.*?)<br>/,/Kristall:(.*?)<br>/,/Deuterium:(.*?)<br>/))
			var ktgtName = txt('b_cargo',new Array('KTs','GTs'));
			
			//variable fuer verkleinern
			var buildsmall = exp('b_small',new Array(/<br>.+?<br>Ben/,'<br>Ben'));
			
			for (var i = 0; i < zeilen.length; i++)
			{
				spalten = zeilen[i].getElementsByTagName('td');

				if (spalten.length == 1)
				{
					spalten[0].colSpan += 1;
					
					if (settingscur['building_nopics'])
					{
						spalten[0].colSpan = spalten[0].colSpan - 1;
					}

					if (settingscur['building_doppelzeilen'])
					{
						spalten[0].colSpan *= 2;
					}
				}
				
				//handelt sich um einen bauauftrag am anfang der tabelle
				if (spalten.length == 2)
				{
					//wenn bilder gelöscht werden sollen muss diese spalte verkleinert werden
					if (settingscur['building_nopics'])
					{
						spalten[0].colSpan = spalten[0].colSpan - 1;
					}

					if (settingscur['building_doppelzeilen'])
					{
						spalten[0].colSpan += spalten[0].colSpan + spalten[1].colSpan;
					}
				}
				
				//handelt sich um einen eintrag in der tabelle mit bild
				if (spalten.length == 3)
				{
					if (ogs.ogame.page == 'b_building')
					{
						var ID = spalten[1].firstChild.href.match(/gid=([0-9]+)/)[1]; 

						var stufen_wert = spalten[1].innerHTML.match(/<\/[aA]>([^<]+)<[bB][rR]/);
						var Stufe = 0;
						
						if (stufen_wert) // falls der Knoten kein Textknoten ist, ist das Gebaeude auf Stufe 0
						{
							var Stufe = InInt(stufen_wert[1]);
						}
						
						buildings += ID +'='+Stufe+':'; 
						
						// Minen und Kraftwerke Energie anzeige
						if ((ID <= 4 || ID == 12) && settingscur['building_energie']) 
						{
							var Steigerung = ogs.getEnergie(ID, Stufe + 1) - ogs.getEnergie(ID, Stufe); // Steigerung des Verbrauchs/der Produktion berechnen
							var vP;
							
							Steigerung = ' [' + TausenderZahl(Steigerung,true) + '&nbsp;' + resOGS[3] + ']';
							
							//färben?
							vP = document.createElement('span');
							
							//<!--(Stufe 0)--> fuer kompatibilitaet zur galatoolbar stufe 0 gebaude
							if (settingscur['colored_ress'])
							{
								vP.innerHTML = '<!--GT: (Stufe 0)--><font style="color: '+vColorRess[3]+'">' + Steigerung + '</font>';
							}
							else
							{
								vP.innerHTML = '<!--GT: (Stufe 0)-->'+Steigerung;
							}
							
							spalten[1].insertBefore(vP, spalten[1].getElementsByTagName('br')[0]);
						}
						else if (ID == 42 && settingscur['building_reichweite']) //Sensor
						{
							if (Stufe > 0) // falls der Knoten kein Textknoten ist, ist das Gebaeude auf Stufe 0
							{
								var Reichweite = Math.pow(Stufe, 2) - 1;
								var Sys = ogs.planetliste[0]['Aktiv']['Sys'];
								
								spalten[1].innerHTML += 'Reichweite: ' + Reichweite + ' (' + Math.max(Sys - Reichweite, 1) + ' bis ' + Math.min(Sys + Reichweite,499) + ')<br />';
							}
						}
					}
					
					if (document.URL.match('Verteidigung'))
					{
						var ID = spalten[1].firstChild.href.match(/gid=([0-9]+)/)[1]; 
						
						if (ID == 503 && settingscur['building_reichweite']) //IPrak
						{
							var TextKnot = spalten[1].childNodes[1];
							
							if (TextKnot.nodeType == 3) // falls der Knoten kein Textknoten ist, ist das Gebaeude auf Stufe 0
							{
								var tech = ogs.array.split(ogs.load('forschung'),'|','&');
								
								for (var ii = 0; ii < tech.length; ii++)
								{
									if (tech[ii][0] == 117)
									{
										tech = parseInt(tech[ii][1], 10);
										break;
									}
								}
								
								var Reichweite = 5 * tech - 1;
								var Sys = ogs.planetliste[0]['Aktiv']['Sys'];
								
								if (Reichweite > 0)
								{
									spalten[1].innerHTML += 'Reichweite: ' + Reichweite + ' (' + Math.max(Sys - Reichweite, 1) + ' bis ' + Math.min(Sys + Reichweite,499) + ')<br />';
								}
							}
						}
					}
					
					//transporter text anzeigen?
					if (settingscur['transbuild'])
					{
						var ress0 = 0; var ress_gt = 0; var ress_kt = 0;
						
						var ress1 = ktgtRess[0].exec(spalten[1].innerHTML);
						if (!ress1) ress1 = ktgtRess[1].exec(spalten[1].innerHTML);
						if (!ress1) ress1 = ktgtRess[1].exec(spalten[1].innerHTML);
						
						if (ress1)
						{
							ress1 = ress1[0].match(/>([\.0-9]+)</g);
							
							for (var tt = 0; tt < ress1.length; tt++)
							{
								ress0 += parseInt(ress1[tt].replace(/<|>|\./g, ''), 10);
							}
						}
						
						ress_gt = Math.ceil(ress0 / 25000);
						ress_kt = Math.ceil(ress0 / 5000);
						
						var posi = buildsmall[0].exec(spalten[1].innerHTML);
						//<!--(Stufe 0)--> fuer kompatibilitaet zur galatoolbar stufe 0 gebaude
						spalten[1].innerHTML = spalten[1].innerHTML.replace(posi, ' <!--GT: (Stufe 0)-->[<span style="color:' + ogs.textfarbe + ';">' + ress_gt + '&nbsp;'+ktgtName[1]+'</span>|<span style="color:' + ogs.textfarbe + ';">' + ress_kt + '&nbsp;'+ktgtName[0]+'</span>]' + posi);
					}
					
					//beschreibungstext entfernen
					if (settingscur['building_klein'])
					{
						spalten[0].width = '1px'; //fix für zu bildfensterbreite
						var pic = spalten[0].getElementsByTagName('img');
						if (pic.length > 0)
						{
							pic[0].className = 'ogs_pic';
						}
						
						spalten[1].innerHTML = spalten[1].innerHTML.replace(buildsmall[0].exec(spalten[1].innerHTML),buildsmall[1]);
						
						if (spalten[2].innerHTML.match('Die Schildkuppel kann nur 1 mal gebaut werden.'))
						{
							spalten[2].innerHTML = spalten[2].innerHTML.replace('Die Schildkuppel kann nur 1 mal gebaut werden.', '(max. 1)');
						}
					}
					
					//res färben
					if (settingscur['colored_ress'])
					{
						var vText = spalten[1].innerHTML;
						for (var j = 0; j < vSucheRess.length; j++)
						{
							var vFinde = vSucheRess[j].exec(vText);
							if (vFinde)
								vText = vText.replace(vFinde[0],vFinde[0].split(' ')[0]+' <font color="'+vColorRess[j]+'">'+vFinde[2]+'</font>');
						}
						
						spalten[1].innerHTML = vText;
					}
					
					//foschung
					if (document.URL.match('Forschung'))
					{
						//forschungsid suchen
						var ID = zeilen[i].innerHTML.match(/gid=([0-9]+)/)[1];
						
						//forschungslevel suchen
						var Stufe =  zeilen[i].innerHTML.match(/\([a-zA-Z]+ ([0-9]+)\)/);
						
						if (Stufe != null) //es gibt eine Stufe
						{
							Stufe = parseInt(Stufe[1], 10);
						}
						else //wenn nicht dann stufe 0
						{
							Stufe = 0;
						}
						
						forschung.push(new Array(ID, Stufe));
						forschunganzahl += Stufe;
					}
					
					if (settingscur['building_doppelzeilen'])
					{
						spalten[2].width = 70;
						spalten[2].align = 'center';
					}
					
					//wenn bilder gelöscht werden sollen
					if (settingscur['building_nopics'])
					{
						spalten[0].parentNode.removeChild(spalten[0]);
					}
					
					if (settingscur['building_doppelzeilen'])
					{
						if (zeilenbr == true)
						{
							zeilen[i-1].appendChild(spalten[0].cloneNode(true));
							zeilen[i-1].appendChild(spalten[1].cloneNode(true));
							
							if (!settingscur['building_nopics'])
								zeilen[i-1].appendChild(spalten[2].cloneNode(true));
							
							zeilen[i].parentNode.removeChild(zeilen[i]);
							
							i--;
						}
						
						zeilenbr = !zeilenbr;
					}
				}
			}
			
			if (document.URL.match('Forschung'))
			{
				// fuer die ogame zeit funktion... in verbindung mit der doppelspalte das bxx element wiederfinden
				if (document.getElementById('bxx') != null)
					unsafeWindow.bxx = document.getElementById('bxx');
				
				//nur wenn forschungen gefunden wurden.
				if (forschung.length > 0)
					ogs.save('forschung', ogs.array.join(forschung,'|','&'));
				
				//anzahl forschungspunkte anzeigen
				if (zeilen.length > 0 && forschunganzahl > 0)
				{
					zeilen[0].parentNode.insertRow(zeilen.length);
					i = zeilen.length - 1;
					zeilen[i].insertCell(0);
					zeilen[i].cells[0].className = 'c';
					zeilen[i].cells[0].style.textAlign = 'center';
					zeilen[i].cells[0].innerHTML = txt('b_1','Forschungspunkte:&nbsp;#*1*#',forschunganzahl);
					zeilen[i].cells[0].colSpan = (settingscur['building_nopics'] ? 2 : 3) * (settingscur['building_doppelzeilen'] ? 2 : 1);
				}
			}
			
			if (ogs.ogame.page == 'b_building' && buildings.length > 0)
			{
				var allbuildings = ogs.array.split(ogs.load('buildings'),'|','&');
				var planiNichtGefunden;
				
				for (var i = 0; i < allbuildings.length; i++)
				{
					planiNichtGefunden = true;
					for (var ii = 0; ii < ogs.planetliste.length; ii++)
					{
						if (allbuildings[i][0] == ogs.planetliste[ii]['ID'])
						{
							planiNichtGefunden = false;
							break;
						}
					}
					
					//nicht gefundene planeten loeschen und den aktuellen planeten loeschen um ihn nachher wieder einzutragen
					if (ii >= ogs.planetliste.length || allbuildings[i][0] == ogs.planetliste[0]['Aktiv']['ID'])
					{
						allbuildings.splice(i,1);
						i--;
					}
				}
				
				allbuildings.push(new Array(ogs.planetliste[0]['Aktiv']['ID'], buildings));
				ogs.save('buildings',ogs.array.join(allbuildings,'|','&'));
			}
			
			//endzeit anzeigen
			if (ogs.ogame.page == 'buildings' && settingscur['endzeiten'])
			{
				var vRestdauert = ContDiv.getElementsByTagName('center');
				if (vRestdauert.length > 0)
				{
					vRestdauert = vRestdauert[0].getElementsByTagName('form');
					
					if (vRestdauert.length > 0)
					{
						vRestdauert = vRestdauert[0].getElementsByTagName('form');
					}
				}
				
				if (vRestdauert.length > 0)
				{
					//hinter der zweiten form kommt wenn da der anzeige text für die restdauer
					vRestdauert = vRestdauert[0].nextSibling;
					
					var vDay = 0;
					var vStd = 0;
					var vMin = 0;
					var vSek = 0;
					var vX = '';
					
					var vRestIHTML = vRestdauert.nodeValue;
						vX = vRestIHTML.match(/([0-9]+) Tag /);
					if (vX) { vDay = vX[1]; }
						vX = vRestIHTML.match(/([0-9]+) Tage /);
					if (vX) { vDay = vX[1]; }
						vX = vRestIHTML.match(/([0-9]+) h /);
					if (vX) { vStd = vX[1]; }
						vX = vRestIHTML.match(/([0-9]+) m /);
					if (vX) { vMin = vX[1]; }
						vX = vRestIHTML.match(/([0-9]+) s/);
					if (vX) { vSek = vX[1]; }
					
					if (vDay || vStd || vMin || vSek)
					{
						var vMseks = 0;
						vMseks += parseInt(vDay*86400);
						vMseks += parseInt(vStd*3600);
						vMseks += parseInt(vMin*60);
						vMseks += parseInt(vSek);
						var vFinishTime = new Date(ogs.time.now().getTime() + vMseks * 1000);
						
						var vP = document.createElement('p');
						vP.style.color = ogs.textfarbe;
						vP.innerHTML = txt('g_done','Fertiggestellt am: ') + ogs.time.toString(vFinishTime);
						
						vRestdauert.parentNode.insertBefore(vP, vRestdauert.nextSibling);
					}
				}
			}
			
			//endzeiten anzeigen
			if (settingscur['endzeiten']) 
			{
				var bxx = document.getElementById('bxx');;
				
				if (bxx)
				{
					var buildtime = 0;
					var timescript;
					var bxx = bxx.parentNode.getElementsByTagName('script')[0];
					
					if(document.URL.match('Forschung')) //bei forschung
					{
						timescript = bxx.text.match(/ss=([0-9]+)/);
					}
					else if(ogs.ogame.page == 'b_building')
					{
						if (bxx.text.indexOf('pp="') > -1) //bei buildings
						{
							timescript = bxx.text.match(/pp="([0-9]+)/);
						}
						else
						{
							timescript = bxx.text.match(/pp='([0-9]+)/);
						}
					}
					
					if (timescript && timescript.length > 1)
					{
						buildtime = parseInt(timescript[1], 10);
					}

					var vP = document.createElement('b');
					vP.innerHTML = '<br />' + ogs.time.stamp(new Date(ogs.time.now().getTime() + buildtime * 1000), true);
					bxx.parentNode.appendChild(vP);
				}
			}
			
			//färben was gewünscht ist
			var CSSStr = '';
			if (settingscur['building_klein'])
			{
				CSSStr += 'table tr th table tr td img, td.l img.ogs_pic { width: ' + settingscur['building_klein_pics_size'] + 'px; height: ' + settingscur['building_klein_pics_size'] + 'px; }';
			}
			
			if (settingscur['building_bg'])
			{
				CSSStr += 'table tr td table tr td.l  { background-image: none; background-color: ' + settingscur['building_bg_col1'] + '; border: 1px ' + settingscur['building_bg_col2'] + ' solid; padding-left: 3px; padding-right: 3px; }';
				CSSStr += 'body table tr td table tr td.k, body form table tr td table tr td.k, body table tr td table tr td.l + td.l + td.l { background-image: none; background-color: ' + settingscur['building_bg_col1'] + '; border: 1px ' + settingscur['building_bg_col2'] + ' solid; }';
			}
			
			if (CSSStr.length > 0) ogs.addStyle(CSSStr);
			
			// Damit die Zeilenumbrueche neu gerendert werden und die Tabelle schicker aussieht
			var InhaltsTab = zeilen[0].parentNode.parentNode; // der 'Vorfahr' einer dieser Zellen ist die grosse Tabelle (2mal parentNode, weil zuerst tbody kommt)
			if (settingscur['building_doppelzeilen'])
			{
				InhaltsTab.removeAttribute('width');
			}
			else
			{
				InhaltsTab.style.width = TabBreite(650, 530);
			}
			
			// anzeige für das button in der letzten zeile fixen (veraltet)
			//if (!document.URL.match('Forschung') && ogs.ogame.page == 'buildings') 
			//	zeilen[zeilen.length - 1].innerHTML = zeilen[zeilen.length - 1].innerHTML;
		}
	}// Ende der Bauseiten-Erweiterungen
	
	//-----------
	// Techseite
	//-----------
	if (ogs.ogame.page == 'techtree')
	{
		var zeilen = ogs.dom.getEBF(ContDiv,'table','width == 470');
		zeilen = zeilen[0].rows;
		var spalten;
		
		if (zeilen.length)
		{
			ogs.load('techtree_pics');
			ogs.load('techtree_pics_size');
			ogs.load('techtree_bg');
			ogs.load('techtree_bg_col1');
			ogs.load('techtree_bg_col2');
			ogs.load('techtree_doppelzeilen');
			
			//wenn bilder gewüscht wird dann grafikpath suchen
			if (settingscur['techtree_pics'])
			{
				var skinpatharray = document.getElementsByTagName('link');
				var skinpath = '';
				
				for (var i = 0; i < skinpatharray.length; i++)
				{
					if (skinpatharray[i].href == 'css/formate.css' || skinpatharray[i].href == 'css/default.css') continue; //IE
					
					if (skinpatharray[i].href.indexOf(ogs.ogame.server) == -1)
					{
						skinpath = skinpatharray[i].href;
						skinpath = skinpath.substr(0, skinpath.lastIndexOf('formate.css'));
						break;
					}
					
					if (skinpatharray[i].href.indexOf('/css/formate.css') == -1 && skinpatharray[i].href.indexOf(ogs.ogame.server) >= 0 && skinpath == '')
					{
						skinpath = skinpatharray[i].href;
						skinpath = skinpath.substr(0, skinpath.lastIndexOf('formate.css'));
					}
				}
			}
			
			if (settingscur['techtree_pics'] || settingscur['techtree_bg'] || settingscur['techtree_doppelzeilen'])
			{
				var zeilenbr = false;
				
				for (var i = 0; i < zeilen.length; i++)
				{
					spalten = zeilen[i].cells;
					
					if (settingscur['techtree_bg'])
						if (spalten[1].innerHTML.length == 1)
							spalten[1].innerHTML = '&nbsp;';
					
					if (settingscur['techtree_pics'])
					{
						if (spalten[0].className == 'l')
						{
							var ID = spalten[0].getElementsByTagName('a')[0].href.match(/gid=([0-9]+)/)[1];
							var vP = spalten[0].cloneNode(false);
							
							vP.innerHTML = '<img class="ogs_pic" src="' + skinpath + 'gebaeude/' + ID + '.gif">';
							vP.width = '1px';
							vP.className = 'l';
							
							spalten[0].parentNode.insertBefore(vP, spalten[0]);
						}
						
						if (spalten[0].className == 'c')
						{
							spalten[0].colSpan = spalten[0].colSpan + 1;
						}
					}
					
					if (settingscur['techtree_doppelzeilen'])
					{
						if (spalten[0].className == 'l')
						{
							if (zeilenbr == true)
							{
								zeilen[i-1].appendChild(spalten[0].cloneNode(true));
								zeilen[i-1].appendChild(spalten[1].cloneNode(true));
								
								if (settingscur['techtree_pics'])
									zeilen[i-1].appendChild(spalten[2].cloneNode(true));
								
								zeilen[i].parentNode.removeChild(zeilen[i]);
								i--;
							}
						}
						else if (spalten[0].className == 'c')
						{
							zeilenbr = true;
							zeilen[i].appendChild(spalten[0].cloneNode(true));
							zeilen[i].appendChild(spalten[1].cloneNode(true));
							
							if (i > 0)
							{
								var z = document.createElement('tr');
								z.style.height = '20px';
								
								zeilen[i].parentNode.insertBefore(z,zeilen[i]);
								i++;
							}
						}
						
						zeilenbr = !zeilenbr;
					}
				}
			}
		
			//färben was gewünscht ist
			var CSSStr = '';
			if (settingscur['techtree_pics'])
			{
				CSSStr += 'body table tr td.l img.ogs_pic { width: ' + settingscur['techtree_pics_size'] + 'px; height: ' + settingscur['techtree_pics_size'] + 'px; }';
			}
			
			if (settingscur['techtree_bg'])
			{
				CSSStr += 'body table tr td.l, body table tr td.c { background-image: none; background-color: ' + settingscur['techtree_bg_col1'] + '; border: 1px ' + settingscur['techtree_bg_col2'] + ' solid; padding-left: 3px; padding-right: 3px;  }';
			}

			if (CSSStr.length > 0)
				ogs.addStyle(CSSStr);
			
			var InhaltsTab = zeilen[0].parentNode.parentNode; // der 'Vorfahr' einer dieser Zellen ist die grosse Tabelle (2mal parentNode, weil zuerst tbody kommt)
			if (settingscur['techtree_doppelzeilen'])
			{
				InhaltsTab.removeAttribute('width');
			}
			else
			{
				InhaltsTab.style.width = TabBreite(650, 530);
			}
		}
	}
	
	//--------------------
	// techtree + gebinfo
	//--------------------
	
	// auf bauseiten anzeigen wenn building_info true und auf tech und forschungseite anzeigen wenn tech_info true
	if ((ogs.ogame.page == 'buildings' && ogs.load('building_info')) || (ogs.ogame.page == 'b_building' && ogs.load('building_info')) || (((ogs.ogame.page == 'buildings' && document.URL.match('Forschung')) || ogs.ogame.page == 'techtree') && ogs.load('tech_info')))
	{
		var links = ogs.dom.getEBF(ContDiv,'a','href.match(/gid=[0-9]+/)');
		var infos = new Array();
		var id;
		var code;
		var i;

		//techs laden
		var data = ogs.array.split(ogs.load('forschung'),'|','&');
		var techs = new Array();
		techs[111] = 0; techs[109] = 0; techs[110] = 0; techs[115] = 0; techs[117] = 0; techs[118] = 0;
		
		for (i = 0; i < data.length; i++)
		{
			techs[data[i][0]] = data[i][1];
		}
		
		//buildings laden
		var buildings = ogs.array.split(ogs.load('buildings'),'|','&');
		
		for (i = 0; i < buildings.length; i++)
		{
			if (buildings[i][0] == ogs.planetliste[0]['Aktiv']['ID'])
			{
				buildings = ogs.array.split(buildings[i][1],':','=');
				
				for (i = 0; i < buildings.length; i++)
				{
					techs[buildings[i][0]] = buildings[i][1];
				}
				
				break;
			}
		}
		
		//textdaten
		infos[3] = txt('techinfo_3',new Array('Deuteriumsynthetisierer','','','','','','Fusionskraftwerk'));
		infos[14] = txt('techinfo_14',new Array('Roboterfabrik','','','Raumschiffwerft','','','','','','','','Nanitenfabrik||(nur Planet)'));
		infos[15] = txt('techinfo_15',new Array('Nanitenfabrik','','Terraformer'));
		infos[21] = txt('techinfo_21',new Array('Raumschiffwerft','','Raketensilo||Leichter J&auml;ger||Solarsatellit||Raketenwerfer||Kleine Schildkuppel||Abfangrakete||Interplanetarrakete','Kleiner Transporter||Leichtes Lasergesch&uuml;tz','Schwerer J&auml;ger||Spionagesonde','Gro&szlig;er Transporter||Kolonieschiff||Recycler||Schweres Lasergesch&uuml;tz||Ionengesch&uuml;tz','Kreuzer','Gro&szlig;e Schildkuppel','Schlachtschiff','Bomber||Schlachtkreuzer||Plasmawerfer','Zerst&ouml;rer','','','Todesstern'));
		infos[31] = txt('techinfo_31',new Array('Forschungslabor','','Computertechnik||Energietechnik','Raumschiffpanzerung||Impulstriebwerk','Spionagetechnik','Waffentechnik||Ionentechnik','','Schildtechnik','Hyperraumtechnik','','','Intergalaktisches Forschungsnetzwerk','','Gravitonforschung'));
		infos[41] = txt('techinfo_41',new Array('Mondbasis','+3 Mondfelder','Sensorphalanx||Sprungtor'));
		infos[44] = txt('techinfo_44',new Array('Raketensilo','','','Abfangrakete','','Interplanetarrakete'));
		
		infos[106] = txt('techinfo_106',new Array('Spionagetechnik','Bessere Spionage','','Anzahl Feindschiffe||Spionagesonde','','Zusammensetzung Feindschiffe||Expeditionstechnik','','','','Anzahl und Typ'));
		infos[108] = txt('techinfo_108',new Array('Computertechnik','+1 Flotten','','','','','','','','Intergalaktisches Forschungsnetzwerk','','Nanitenfabrik'));
		infos[109] = txt('techinfo_109',new Array('Waffentechnik','+10% Schaden','','','Gau&szlig;kanone'));
		infos[110] = txt('techinfo_110',new Array('Schildtechnik','+10% Schilde','Gau&szlig;kanone','Recycler||Kleine Schildkuppel','','','Hyperraumtechnik','Gro&szlig;e Schildkuppel'));
		infos[111] = txt('techinfo_111',new Array('Raumschiffpanzerung','+10% Panzer','','Schwerer J&auml;ger'));
		infos[113] = txt('techinfo_113',new Array('Energietechnik','Produktion Fusionskraftwerk','Verbrennungstriebwerk||Impulstriebwerk||Leichtes Lasergesch&uuml;tz','Lasertechnik','Fusionskraftwerk||Schildtechnik||Schweres Lasergesch&uuml;tz','Ionentechnik','Hyperraumtechnik','Gau&szlig;kanone','','Plasmatechnik','','','','Terraformer'));
		infos[114] = txt('techinfo_114',new Array('Hyperraumtechnik','','','','Hyperraumantrieb','','Zerst&ouml;rer||Schlachtkreuzer','Todesstern','Sprungtor','Intergalaktisches Forschungsnetzwerk'));
		infos[115] = txt('techinfo_115',new Array('Verbrennungstriebwerk','+10% Geschwindigkeit','Leichter J&auml;ger','Kleiner Transporter','Spionagesonde','','','Gro&szlig;er Transporter||Recycler'));
		infos[117] = txt('techinfo_117',new Array('Impulstriebwerk','+20% Geschwindigkeit||+5 Reichweite Interplanetarrakete','','Schwerer J&auml;ger','Expeditionstechnik||Kolonieschiff','Kreuzer','Neuer Antrieb f&uuml;r: Kleiner Transporter','Bomber'));
		infos[118] = txt('techinfo_118',new Array('Hyperraumantrieb','+30% Geschwindigkeit','','','','Schlachtschiff','Schlachtkreuzer','Zerst&ouml;rer','Todesstern','Neuer Antrieb f&uuml;r: Bomber'));
		infos[120] = txt('techinfo_120',new Array('Lasertechnik','','','','Leichtes Lasergesch&uuml;tz','','Ionentechnik','Schweres Lasergesch&uuml;tz','','','','Plasmatechnik','','Schlachtkreuzer'));
		infos[121] = txt('techinfo_121',new Array('Ionentechnik','','','Kreuzer','','Ionengesch&uuml;tz','Plasmatechnik'));
		infos[122] = txt('techinfo_122',new Array('Plasmatechnik','','','','','','Bomber','','Plasmawerfer'));
		infos[123] = txt('techinfo_123',new Array('Intergalaktisches Forschungsnetzwerk','','2 Foschungslabore','3 Foschungslabore','4 Foschungslabore','5 Foschungslabore','6 Foschungslabore','7 Foschungslabore','8 Foschungslabore','9 Foschungslabore'));
		infos[124] = txt('techinfo_124',new Array('Expeditionstechnik','+1h Haltezeit','1 Expedition','','','2 Expeditionen','','','','','3 Expeditionen'));
		infos[199] = txt('techinfo_199',new Array('Gravitonforschung','','Todesstern'));
		
		
		// strukturpunkte, schilde, angriff, laderaum, triebwert1, speed1, treibstoff1, triebwert2, speed2, treibstoff2, stufe speed2
		infos[202] = new Array(4000,10,5,5000,0,5000,10,1,10000,20,5);
		infos[203] = new Array(12000,25,5,25000,0,7500,50);
		infos[204] = new Array(4000,10,50,50,0,12500,20);
		infos[205] = new Array(10000,25,150,100,1,10000,75);
		infos[206] = new Array(27000,50,400,800,1,15000,300);
		infos[207] = new Array(60000,200,1000,1500,2,10000,500);
		infos[208] = new Array(30000,100,50,7500,1,2500,1000);
		infos[209] = new Array(16000,10,1,20000,0,2000,300);
		infos[210] = new Array(1000,0,0,5,0,100000000,1);
		infos[211] = new Array(75000,500,1000,500,1,4000,1000,2,5000,1000,8);
		infos[212] = new Array(2000,1,1,0,0,0,0);
		infos[213] = new Array(110000,500,2000,2000,2,5000,1000);
		infos[214] = new Array(9000000,50000,200000,1000000,2,100,1);
		infos[215] = new Array(70000,400,700,750,2,10000,250);
		
		infos[401] = new Array(2000,20,80);
		infos[402] = new Array(2000,25,100);
		infos[403] = new Array(8000,100,250);
		infos[404] = new Array(35000,200,1100);
		infos[405] = new Array(8000,500,150);
		infos[406] = new Array(100000,300,3000);
		infos[407] = new Array(20000,2000,1);
		infos[408] = new Array(100000,10000,1);
		infos[502] = new Array(8000,1,1);
		infos[503] = new Array(15000,1,12000);
		
		for (i = 0; i < links.length; i++)
		{
			id = links[i].href.match(/gid=([0-9]+)/)[1];
			if (typeof infos[id] == 'undefined') continue;
			
			code = '';
			
			if (id >= 0 && id < 200)
			{
				var text = txt('techinfo_info_1', new Array('Stufe','Beschreibung'));
				code += '<tr><td class=\'c\'><center>'+text[0]+'</center></td><td class=\'c\'>'+text[1]+'</td></tr>';
				
				for (var ii = 2; ii < infos[id].length; ii++)
				{
					if (infos[id][ii] != '')
					{
						code += '<tr><th>'+(ii-1)+'</th><th style=\'text-align: left;'+((ii-1 <= techs[id])?' color: lime;':' color: red;') +'\'>'+infos[id][ii].replace(/\|\|/g,'<br />')+'</th></tr>';
					}
				}
				
				if (infos[id][1] != '')
				{
					code += '<tr><th>&infin;</th><th style=\'text-align: left; color: red;\'>'+infos[id][1].replace(/\|\|/g,'<br />')+'</th></tr>';
				}
			}
			else
			{
				var text = txt('techinfo_info_2', new Array('Basis','Aktuell'));
				var text2 = txt('techinfo_info_3', new Array('Strukturpunkte','Schildst&auml;rke','Angriffswert','Ladekapazit&auml;t','Geschwindigkeit','Treibstoffverbrauch'));
				code += '<tr><td class=\'c\'></td><td class=\'c\'><center>'+text[0]+'</center></td><td class=\'c\'><center>'+text[1]+'</center></td></tr>';
				var werte = new Array();
				
				werte.push(infos[id][0], parseInt(infos[id][0]*(1 + techs[111]/10),10));
				werte.push(infos[id][1], parseInt(infos[id][1]*(1 + techs[110]/10),10));
				werte.push(infos[id][2], parseInt(infos[id][2]*(1 + techs[109]/10),10));
				
				if(infos[id].length > 3) //bei schiffen
				{
					werte.push(infos[id][3], infos[id][3]);
					var antrieb = new Array(techs[115],techs[117],techs[118]);
					if(infos[id][10] > 0 && antrieb[infos[id][7]] >= infos[id][10])
					{
						werte.push(infos[id][8], parseInt(infos[id][8]*(1 + antrieb[infos[id][7]] / 10 * (1 + infos[id][7])),10));
						werte.push(infos[id][9], infos[id][9]);
					}
					else
					{
						werte.push(infos[id][5], parseInt(infos[id][5]*(1 + antrieb[infos[id][4]] / 10 * (1 + infos[id][4])),10));
						werte.push(infos[id][6], infos[id][6]);
					}
				}
				
				for (var ii = 0; ii < werte.length / 2; ii++)
				{
					code += '<tr><th>'+text2[ii]+'</th><th style=\'text-align: right;\'>'+TausenderZahl(werte[ii*2])+'</th><th style=\'text-align: right;\'>'+TausenderZahl(werte[ii*2+1])+'</th></tr>';
				}
			}
			
			ogs.addOverLib(links[i],'<table width=\'100%\'><tr><td><table width=\'100%\' style=\'white-space: nowrap;\'>'+code+'</table></td></tr></table>');
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
			
		if (ogs.load('flotten_faerben') || (ogs.load('flotten_zusatz') && ogs.load('skin_advance')))
		{
			ogs_FlottenFaerben();
		}
		
		if (ogs.load('ang_zeit') && !ogs.load('zeit_links'))
		{
			// aktualisiere die aktuelle Uhrzeit
			function ZeitAktualisieren()
			{
				ZeitZelle.innerHTML = '<span style="color:' + ogs.textfarbe + ';">' + ogs.time.toString(ogs.time.now()) + '</span>';
				window.setTimeout(ZeitAktualisieren, 999);
			}
			
			var ZeitZelle = ogs.dom.getEBF(document, 'th','colSpan == 3')[0];
			ZeitAktualisieren();
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
		
		// Uebersicht ueber die bewegten Ressourcen
		if (ogs.load('bewegteress') == true)
		{
			function RessEval(a, b)
			{
				var c = eval('/' + a + ': ([\.0-9]+)/');
				return parseInt(b.match(c)[1].replace(/\./g, ''), 10);
			}
			
			function RessLoop(a, b, elems)
			{
				var s = getElementsByClassName(a, elems, resUni[0]);
				var c = d = e = 0, t = '';
				
				for (var i = 0; i < s.length; i++)
				{
					t = s[i].getAttribute('onmouseover').toString();
					c += RessEval(resUni[0], t);
					d += RessEval(resUni[1], t);
					e += RessEval(resUni[2], t);
				}
				
				if (c != 0 || d != 0 || e != 0)
				{
					code += '<tr><th>' + b + '</th><th>' + TausenderZahl(c) + '</th><th>' + TausenderZahl(d) + '</th><th>' + TausenderZahl(e) + '</th></tr>';
				}
				
				return new Array(c, d, e);
			}
			
			if (ogs.load('colored_ress'))
				var vColorRess = new Array(ogs.load('color_met'),ogs.load('color_kris'),ogs.load('color_deut'));
			else
				var vColorRess = new Array(ogs.textfarbe,ogs.textfarbe,ogs.textfarbe);
			
			code = '<center><br /><table width="' + TabBreite(2000, 519) + '">';
			code += '<tr><td class="c" colspan="4">'+txt('resmove_1','&Uuml;bersicht der bewegten Ressourcen')+'</td></tr>';
			code += '<tr><th><b>'+txt('resmove_2','Auftrag')+'</b></th><th><b>';
			code += '<font color="'+vColorRess[0]+'">'+resOGS[0]+'</font></b></th><th><b>';
			code += '<font color="'+vColorRess[1]+'">'+resOGS[1]+'</font></b></th><th><b>';
			code += '<font color="'+vColorRess[2]+'">'+resOGS[2]+'</font></b></th></tr>';
			var typ = txt('resmove_4',new Array('owntransport', 'Transport', 'owndeploy', 'Stationieren', 'owncolony', 'Kolonisieren', 'ownhold', 'Halten', 'ownharvest', 'Abbau', 'ownattack', 'Angreifen', 'ownfederation', 'Verbandsangriff'));
			var mkd = new Array();
			
			var elems = document.getElementsByTagName('a');
				
			for (var i = 0; i < typ.length; i += 2)
			{
				mkd = mkd.concat(RessLoop(typ[i], typ[i + 1], elems));
			}
			
			var met = kris = deut = 0;
			
			for (var i = 0; i < mkd.length; i += 3)
			{
				met += mkd[i];
				kris += mkd[i + 1];
				deut += mkd[i + 2];
			}
			
			code += '<tr><th><span style="color:' + ogs.textfarbe + ';">'+txt('resmove_3','Gesamt:')+'</span></th><th><span style="color:' + vColorRess[0] + ';">' + TausenderZahl(met) + '</span></th><th><span style="color:' + vColorRess[1] + ';">' + TausenderZahl(kris) + '</span></th><th><span style="color:' + vColorRess[2] + ';">' + TausenderZahl(deut) + '</span></th></tr>';
			code += '</table></center>';
			aa4 = document.createElement('div');
			aa4.innerHTML = code;
			ContDiv.appendChild(aa4);
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
			
			ogs.addStyle('.ogs_trade {border-color:' + ogs.textfarbe + '; color:' + ogs.textfarbe + '; text-align:center; font-weight:bold; background-color:transparent;}', unsafeWindow);
			
			code2 = '<center><br /><table width="' + TabBreite(2000, 519) + '">';
			code2 += '<colgroup><col width="35%"><col width="20%"><col width="15%"><col width="15%"><col width="15%"></colgroup>';
			code2 += '<tr><td class="c" colspan="5">'+txt('trade_1','Handelskurs: ')+'<input type="text" id="kursmet" value="' + ogs.load('kursmet') + '" size="4" class="ogs_trade"> : <input type="text" id="kurskris" value="' + ogs.load('kurskris') + '" size="4" class="ogs_trade"> : <input type="text" id="kursdeut" value="' + ogs.load('kursdeut') + '" size="4" class="ogs_trade"></th></tr>';
			code2 += '<tr><th style="text-align:left;">'+txt('trade_2','Was m&ouml;chtest du hertauschen?')+'</th><th><input type="text" id="menge" value="0" class="ogs_trade"></th><th style="text-align:left;"><nobr><input type="radio" name="hertauschen" id="hertauschen1" value="1">'+resOGS[0]+'</nobr></th><th style="text-align:left;"><nobr><input type="radio" name="hertauschen" id="hertauschen2" value="2">'+resOGS[1]+'</nobr></th><th style="text-align:left;"><nobr><input type="radio" name="hertauschen" id="hertauschen3" value="3" checked>'+resOGS[2]+'</nobr></th></tr>';
			code2 += '<tr><th style="text-align:left;">'+txt('trade_3','Was m&ouml;chtest du f&uuml;r dein #*1*#?','<span id="hertauschen0"></span>')+'</th><th style="text-align:left;"><nobr><input type="radio" name="bekommen" id="bekommen1" value="1"><span id="bek1">'+resOGS[0]+'</span></nobr></th><th style="text-align:left;"><nobr><input type="radio" name="bekommen" id="bekommen2" value="2"><span id="bek2">'+resOGS[1]+'</span></nobr></th><th style="text-align:left;" colspan="2"><nobr><input type="radio" name="bekommen" id="bekommen3" value="3" checked>'+txt('trade_4','Mix (#*1*#% davon #*2*#)','<input id="prozent" value="50" size="4" maxlength="3" class="ogs_trade">','<span id="bek">'+resOGS[0]+'</span>')+'</nobr></th></tr>';
			code2 += '<tr><th colspan="5" style="text-align:left;"><span style="color:' + ogs.textfarbe + ';">'+txt('trade_5','Du w&uuml;rdest #*1*# bekommen.','<span id="handel"></span>')+'</span></th></tr>';
			code2 += '<tr><th colspan="5" style="text-align:left;">'+txt('trade_6','F&uuml;r den Transport wirst du min. #*1*# ben&ouml;tigen.','<span id="transen_du"></span>')+'</th></tr>';
			code2 += '<tr><th colspan="5" style="text-align:left;">'+txt('trade_7','F&uuml;r den Transport wird dein Handelspartner min. #*1*# ben&ouml;tigen.','<span id="transen_er"></span>')+'</th></tr>';
			code2 += '<tr><td class="c" colspan="5">'+txt('trade_8','Angebots-Text')+'</td></tr>';
			code2 += '<tr><th colspan="5" style="text-align:center; padding:10px;" id="handelstext"></th></tr>';
			code2 += '</table></center><br>';
			ContDiv.appendChild(ogs.dom.newElement('div', code2));
			
			handelsrechner();
			window.setInterval(handelsrechner, 500);
		}
	} // Ende Uebersichtsteil
	
	// Zeiten in Tagen anzeigen
	if (ogs.ogame.page == 'overview' || ogs.ogame.page == 'flotten2')
	{
		ogs.load('endzeiten');
		
		var v = ogs.time.now();
		var Zaehler = new Array();
		var ts = new Array();
		var ttime = new Array();
		var verschiebung = parseInt(ogs.load('zeitverschiebung'), 10);
		
		function AktZaehler()
		{
			var n = ogs.time.now();
			var verschiebung = parseInt(ogs.load('zeitverschiebung'), 10);
			
			for (var i = 0; i < Zaehler.length; i++)
			{
				if (!Zaehler[i]) continue;
				
				var d = 0, h = 0, m = 0;
				
				if (!ts[i])
				{
					ttime[i] = new Date(1000 * parseInt(Zaehler[i].getAttribute('star'),10));
					ttime[i].setTime(ttime[i].getTime() + verschiebung * 60000);
					ts[i] = (settingscur['endzeiten']) ? ('<br />' + ogs.time.stamp(ttime[i])) : '';
				}

				var s = Math.round((ttime[i] - n.getTime()) / 1000);
				
				if (s <= 0)
				{
					Zaehler[i].innerHTML = '-' + ts[i];
					continue;
				}
				
				// Tage, Stunden, Minuten, Sekunden ermitteln und formatieren
				if (s > 59)
				{
					m = Math.floor(s / 60);
					s %= 60;
				}
				
				if (m > 59)
				{
					h = Math.floor(m / 60);
					m %= 60;
				}
				
				if (h > 23)
				{
					d = Math.floor(h / 24);
					h %= 24;
				}
				
				if (s < 10) { s = '0' + s; }
				if (m < 10) { m = '0' + m; }
				if (h < 10) { h = '0' + h; }
				var Text = ((d) ? d + 'T&nbsp;' : '') + h + ':' + m + ':' + s + ts[i];
				
				Zaehler[i].innerHTML = Text;
			}
		}
		
		// vorhandene Funktion loeschen
		ogs.window.t = ogs.window.t_building = function(){};
		
		// Die Zaehler finden
		Zaehler = ogs.dom.getEBF(document,'div','id.match(/bxx/)');
		
		// Daten aus den OGame-Zaehlern fischen (dooferweise werden da 3 grundlegend verschiedene Methoden verwendet, und die muessen alle erkannt werden. Ekelhafte Programmiererei ist das...)
		for (var i = 0; i < Zaehler.length; i++)
		{
			if (Zaehler[i].getAttribute('title')) // Uebersicht und Flottenmenue
			{
				//in übersicht den gebäuder counter richtig anzeigen.
				if (Zaehler[i].getAttribute('id') == 'bxx')
				{
					Zaehler[i].setAttribute('star', Zaehler[i].getAttribute('title'));
				}
			}
		}
		
		AktZaehler();
		window.setInterval(AktZaehler, 999);
	}
	
	//--------------------------
	// Tagesproduktion anzeigen
	//--------------------------
	// im Ressmenue Tagesproduktion und x-Stunden/Tage-Produktion anzeigen
	if (ogs.ogame.page == 'resources')
	{
		var suchesolar = ogs.dom.getEBF(ContDiv,'table','width == 550')[0].rows;
		
		var erg1 = 0;
		var erg2 = 0;
		var Prod = Array(0,0,0);
		var GesZeile = -1;
		var ships = exp('ship_name',new Array('Kleiner Transporter', 'Gro' + sz + 'er Transporter', 'Leichter J' + ae + 'ger', 'Schwerer J' + ae + 'ger', 'Kreuzer', 'Schlachtschiff', 'Kolonieschiff', 'Recycler', 'Spionagesonde', 'Bomber', 'Solarsatellit', 'Zerst' + oe + 'rer', 'Todesstern', 'Schlachtkreuzer'));
		
		for (var i = 0; i < suchesolar.length; i++)
		{
			var suchesolars = suchesolar[i].cells;
			
			if (suchesolars.length > 0 && suchesolars[0].innerHTML.indexOf(ships[10]) + 1)
			{
				//zeile laden
				erg1 = suchesolars[0].parentNode.getElementsByTagName('th')

				//vorletzte spalten für gesamtenergie durch sola sats
				erg2 = erg1[erg1.length - 2]; 
				var arg1 = erg2.innerHTML.replace(/\./g, '');
				arg1 = arg1.replace(/\s/g, '');
				var satenergie = (arg1 != '0') ? arg1.match(/>([0-9]+)</)[1] : arg1;
				
				//sola sat anzahl
				var satanzahl = erg1[0].innerHTML.match(/[\.0-9]+/);
				satanzahl = satanzahl[0].replace(/\./g, '');
				
				//letzte spalte für % wert
				erg2 = erg1[erg1.length - 1].getElementsByTagName('select')[0]; 
				var prozent = parseInt(erg2.value);
				
				var prosat = Math.floor(parseInt(satenergie) / parseInt(satanzahl));
				erg1[0].innerHTML = erg1[0].innerHTML + '<br><span style="color:' + ogs.textfarbe + ';">'+txt('res_1','Energie pro Solarsatellit: #*1*#  bei #*2*#%',prosat.toString(),prozent.toString()) + '</span>';
			}
			
			if (suchesolars[0] && suchesolars[0].innerHTML.indexOf(exp('res_1','Gesamt:')) > -1)
			{
				GesZeile = i;
				break;
			}
		}
		
		if (GesZeile != -1)
		{
			var ResZeile = suchesolar[GesZeile].getElementsByTagName('font');
			var zelle;
			var zeile;
			
			//produktion einlesen auch energie
			if (ResZeile.length >= 3)
			{
				for (var i = 0; i < 3; i++)
				{
					Prod[i] = InInt(ResZeile[i].firstChild.nodeValue); // Produktion dieses Rohstoffs speichern
				}
			}
			
			function AktDynAnz()
			{
				var Anz = InInt(document.getElementById('dyn_anz').value);
				if (isNaN(Anz)) return;
				
				var Art = document.getElementById('dyn_art');
				Art = InInt(Art.options[Art.selectedIndex].value);
				var Multiplikator = Anz * Art;
				
				for (var i = 0; i < 3; i++)
				{
					document.getElementById('dyn_ausg' + i).innerHTML = TausenderZahl(Prod[i] * Multiplikator);
				}
			}
			
			function SetzeAuf(Wert)
			{
				var AuswahlBoxen = ogs.dom.getEBF(ContDiv,'select','name.indexOf("last") == 0');
				for (var i = 0; i < AuswahlBoxen.length; i++)
				{
					var Name = AuswahlBoxen[i].name;
					if (Name == 'last1' || Name == 'last2' || Name == 'last3' || Name == 'last4' || Name == 'last12' || Name == 'last212') AuswahlBoxen[i].selectedIndex = Wert;
				}
				document.getElementsByName('action')[0].click(); // Formular absenden (da action=Berechne sein muss geht das am einfachsten, indem man den Button drueckt - formular.submit() klappt nicht
			}
			
			// Leerzeile verlängern
			ogs.dom.getEBF(ContDiv, 'th', 'height == 4 && knoten.colSpan == 6')[0].colSpan = 7;
			
			// Zeile hinzufuegen
			zeile = document.createElement('tr');
			zeile.appendChild(document.createElement('th'));
			zeile.appendChild(document.createElement('td'));
			zeile.appendChild(document.createElement('td'));
			zeile.appendChild(document.createElement('td'));
			zeile.appendChild(document.createElement('td'));
			suchesolar[0].parentNode.appendChild(zeile);
			
			zeile.cells[0].innerHTML = txt('res_2','Produktion')+'<br/><input type="text" id="dyn_anz" value="30" size="5" maxlength="4"/> <select id="dyn_art"><option value="1">'+txt('res_3','Stunden')+'</option><option value="24" selected="selected">'+txt('res_4','Tagen')+'</option></select>';
			zeile.cells[0].colSpan = 2;
			zeile.cells[1].className = 'k';
			zeile.cells[2].className = 'k';
			zeile.cells[3].className = 'k';
			zeile.cells[4].className = 'k';
			zeile.cells[1].innerHTML = '<font id="dyn_ausg0" style="color: #00ff00;"></font>';
			zeile.cells[2].innerHTML = '<font id="dyn_ausg1" style="color: #00ff00;"></font>';
			zeile.cells[3].innerHTML = '<font id="dyn_ausg2" style="color: #00ff00;"></font>';
			zeile.cells[4].innerHTML = '<font style="color: rgb(0, 255, 0)">-</font>';
			
			// Alles auf 100%
			zelle = document.createElement('td');
			zelle.className = 'k';
			zelle.innerHTML = '<input type="button" value="' + txt('res_5','Alles 100%') + '" style="width: 100%;"/>';
			suchesolar[GesZeile].appendChild(zelle);
			ogs.addEvent(zelle.getElementsByTagName('input')[0],'click', function(){SetzeAuf(0);}, true);

			// Alles auf 0%
			zelle = document.createElement('td');
			zelle.className = 'k';
			zelle.innerHTML = '<input type="button" value="' + txt('res_6','Alles 0%') + '" style="width: 100%;"/>';
			suchesolar[GesZeile + 1].appendChild(zelle);
			ogs.addEvent(zelle.getElementsByTagName('input')[0],'click', function(){SetzeAuf(10);}, true);
			
			AktDynAnz();
			window.setInterval(AktDynAnz, 200);
		}
		
		var Ress = HoleRessourcen(); // vorhandene Ressourcen bestimmen
		var RessSumme = Ress[0] + Ress[1]; // Summe der Ressourcen bestimmen
		var OhneDeut = ogs.load('kein_deut');
		if (!OhneDeut) { RessSumme += Ress[2]; } // Deut nur einrechen falls es nicht
		BenKT = Math.ceil(RessSumme / 5000); // vollen laderaum verwenden - schliesslich kommt der Treibstoff ja auch in den Laderaum
		BenGT = Math.ceil(RessSumme / 25000);
		ContDiv.appendChild(ogs.dom.newElement('center','<table width="550"><tr><th>'+txt('res_7','F&uuml;r die Summe von #*1*# #*2*# auf diesem Planeten werden #*3*# oder #*4*# ben&ouml;tigt.','<span style="color:' + ogs.textfarbe + '; font-weight:bold;">' + TausenderZahl(RessSumme.toString()) + '</span>',((OhneDeut) ? txt('res_8','Metall und Kristall') : txt('res_9','Metall, Kristall und Deuterium')), '<span style="color:' + ogs.textfarbe + '; font-weight:bold;">' + TausenderZahl(BenGT.toString()) + '&nbsp;'+ships[1]+'</span>','<span style="color:' + ogs.textfarbe + '; font-weight:bold;">' + TausenderZahl(BenKT.toString()) + '&nbsp;'+ships[0]+'</span>') + '</th></tr></table>'));
	}
	
	//------------------------------------------------------------------------------
	// Spionagebericht auswerten und Button erstellen zum Senden an Online-Speedsim
	//------------------------------------------------------------------------------
	if (ogs.ogame.page == 'messages')
	{
		function Merkliste(a, b, c, d)
		{
			var e = ogs.load('merkliste').split(/::/g);
			var r = true;
			
			for (var i = 0; i < e.length; i++)
			{
				var z = e[i].split(/:/g);
				if (z[1] == b && z[2] == c && z[3] == d) // Wenn Eintrag bereits existiert, dann loesche, Vergleich ueber Koords, Planiname kann sich aendern
				{
					window.setTimeout(function(){ogs.save('merkliste', ogs.load('merkliste').replace(z[0] + ':' + z[1] + ':' + z[2] + ':' + z[3] + '::', ''));},0);
					return false;
				}
			}
			
			window.setTimeout(function(){ogs.save('merkliste', ogs.load('merkliste') + a + ':' + b + ':' + c + ':' + d + '::');},0);
			return true;
		}
		
		function MerkColor(a, b)
		{
			var c = document.getElementsByName(a);
			
			for (var i = 0; i < c.length; i++)
			{
				c[i].style.color = (b) ? 'green' : 'red';
				c[i].parentNode.parentNode.style.border = (b) ? '2px solid green' : '0px solid transparent';
			}
		}
		
		function spiostuff(thisthing)
		{
			var value = new Array();
			var valuetemp = thisthing.innerHTML.replace(/<td>(.*?)<\/td>[^<]*?<td>([0-9]+)[^0-9<]*([0-9]*)[^0-9<]*([0-9]*)[^0-9<]*([0-9]*)<\/td>/ig,'|||$1|||$2$3$4$5|||').split('|||');
			
			for (var i = 0; i < valuetemp.length-1; i=i+3)
			{
				value[valuetemp[i+1]] = parseInt(valuetemp[i+2],10);
			}
			
			var speedsim = 'http://websim.speedsim.net/index.php?lang='+txt('speedsim_lang','de')+'&referrer=ogs';
			var dragosim = 'http://drago-sim.com/index.php?lang='+txt('dragosim_lang','german')+'&referrer=ogs';
			
			//eigene techs
			speedsim += '&tech_a0_0=' + battletech['Waffen'] + '&tech_a0_1=' + battletech['Schild'] + '&tech_a0_2=' + battletech['Panzer'];
			dragosim += '&techs[0][0][w_t]=' + battletech['Waffen'] + '&techs[0][0][s_t]=' + battletech['Schild'] + '&techs[0][0][r_p]=' + battletech['Panzer'];

			//gegner pos
			var gegner = thisthing.innerHTML.match(/<td class="{0,1}c"{0,1} colspan="{0,1}4"{0,1}>(.*?)<a.*? onclick="{0,1}showGalaxy\(([0-9]+),([0-9]+),([0-9]+)\)/i);
			if (gegner)
			{
				var enemy_nam = gegner[1].replace(exp('m_res','Rohstoffe auf '),'').trim();
				var enemy_pos = new Array(gegner[2],gegner[3],gegner[4]);
				speedsim += '&enemy_name=' + enemy_nam + '&enemy_pos=' + gegner[2]+':'+gegner[3]+':'+gegner[4];
				dragosim += '&v_planet=' + enemy_nam + '&v_coords=' + gegner[2]+':'+gegner[3]+':'+gegner[4];
			}
			else return;

			// Ressourcen
			var met = value[resUni[0]+':'];
			var kris = value[resUni[1]+':'];
			var deut = value[resUni[2]+':'];
			var ener = value[resUni[3]+':'];

			speedsim += '&enemy_metal=' + met + '&enemy_crystal=' + kris + '&enemy_deut=' + deut;
			dragosim += '&v_met=' + met + '&v_kris=' + kris + '&v_deut=' + deut;
			
			// Techniken
			for (var j = 0; j < Techniken.length; j++)
			{
				if (value[Techniken[j]])
				{
					speedsim += '&tech_d0_' + j + '=' + value[Techniken[j]];
					dragosim += '&techs[1][0]['+TechnikenDrago[j]+']='+value[Techniken[j]];
				}
			}
			
			// Schiffe und Verteidigung
			for (var j = 0; j < SchiffeundVerteidigung.length; j++)
			{
				if (value[SchiffeundVerteidigung[j]])
				{
					speedsim += '&ship_d0_' + j + '_b=' + value[SchiffeundVerteidigung[j]];
					dragosim += '&numunits[1][0]['+SchiffeundVerteidigungDrago[j]+']=' + value[SchiffeundVerteidigung[j]];
				}
			}
			
			if (value[IPAIPRaketen[0]])
			{
				speedsim += '&abm_b='+value[IPAIPRaketen[0]]; 
				dragosim += '&missiles_available_v='+value[IPAIPRaketen[0]];
			}
			
			// Praktische Beute
			var ress0 = 0.5 * Math.max(met + kris + deut, Math.min(0.75 * (2 * met + kris + deut), 2 * met + deut));
			var ress_gt = Math.ceil(ress0 / 25000);
			var ress_kt = Math.ceil(ress0 / 5000);
			
			// link erstellen
			code = '<br>'+txt('spio_adv_1','Spionagebericht einf&uuml;gen in: #*1*# bzw. #*2*#','<a target="_blank" href="' + ogs.getLink(speedsim) + '"><span style="color:' + ogs.textfarbe + ';"><b>SpeedSim Online</b></span></a>','<a target="_blank" href="' + ogs.getLink(dragosim) + '"><span style="color:' + ogs.textfarbe + ';"><b>DragoSim 2</b></span></a>');
			code += '<br>'+txt('spio_adv_2','M&ouml;gliche Beute: #*1*# Metall, #*2*# Kristall, #*3*# Deuterium','<span style="color:' + vColorRess[0] + ';">' + TausenderZahl(Math.round(met / 2)) + '</span>','<span style="color:' + vColorRess[1] + ';">' + TausenderZahl(Math.round(kris / 2)) + '</span>','<span style="color:' + vColorRess[2] + ';">' + TausenderZahl(Math.round(deut / 2)) + '</span>');
			code += '<br>'+txt('spio_adv_3','Ben&ouml;tigte Ladekapazit&auml;t f&uuml;r Gesamtbeute: #*1*# Einheiten','<span style="color:' + ogs.textfarbe + ';">' + TausenderZahl(Math.round(ress0)) + '</span>');
			code += '<br>'+txt('spio_adv_4','Ben&ouml;tigte Transporter beim Angriff: #*1*# GTs bzw. #*2*# KTs','<span style="color:' + ogs.textfarbe + ';">' + ress_gt + '</span>','<span style="color:' + ogs.textfarbe + ';">' + ress_kt + '</span>');
			code += '<br>&nbsp;<br>';
			code += '<a target="_self" href="#" onclick="javascript: return false;" name="ogs_merken_' + enemy_pos[0] + '_' + enemy_pos[1] + '_' + enemy_pos[2] + '"><b>'+txt('spio_adv_5','Merken')+'</b></a> / ';
			
			var centers = ogs.dom.getCEBF(thisthing, 'center');
			
			if (centers.length > 0)
			{
				centers[centers.length -1].innerHTML = code + centers[centers.length -1].innerHTML
			}
			
			// Angreifen
			MerkColor('ogs_merken_' + enemy_pos[0] + '_' + enemy_pos[1] + '_' + enemy_pos[2], mlist.match(eval('/' + enemy_pos[0] + ':' + enemy_pos[1] + ':' + enemy_pos[2] + '::/g')));
			koords.push(enemy_nam, enemy_pos[0], enemy_pos[1], enemy_pos[2]);
		}
		
		ogs.load('spio');
		ogs.load('news_expo_aktiv');
		ogs.load('news_expo_farbe');
		ogs.load('news_pm_aktiv');
		ogs.load('news_pm_farbe');
		ogs.load('news_am_aktiv');
		ogs.load('news_am_farbe');
		
		if (ogs.load('news_color_res'))
			var vColorRess = new Array(ogs.load('color_met'),ogs.load('color_kris'),ogs.load('color_deut'));
		
		//eigene techs laden wenn benötigt
		if (settingscur['spio'])
		{
			var tech = ogs.array.split(ogs.load('forschung'),'|','&');
			var battletech = Array();
			
			for (var ii = 0; ii < tech.length; ii++)
			{
				if (tech[ii][0] == 109)
					battletech['Waffen'] = parseInt(tech[ii][1], 10);
				else if (tech[ii][0] == 110)
					battletech['Schild'] = parseInt(tech[ii][1], 10);
				else if (tech[ii][0] == 111)
					battletech['Panzer'] = parseInt(tech[ii][1], 10);
			}
		}
		
		var flag = 0;
		var koords = new Array();
		var mlist = ogs.load('merkliste');
		var IPAIPRaketen = exp('ip_name', new Array('Abfangrakete','Interplanetarrakete'));
		var Techniken = exp('btechs_name',new Array('Waffentechnik', 'Schildtechnik', 'Raumschiffpanzerung'));
		var Schiffe = exp('ship_name', new Array('Kleiner Transporter', 'Gro' + sz + 'er Transporter', 'Leichter J' + ae + 'ger', 'Schwerer J' + ae + 'ger', 'Kreuzer', 'Schlachtschiff', 'Kolonieschiff', 'Recycler', 'Spionagesonde', 'Bomber', 'Solarsatellit', 'Zerst' + oe + 'rer', 'Todesstern', 'Schlachtkreuzer'));
		var Verteidigung = exp('def_name', new Array('Raketenwerfer', 'Leichtes Lasergesch' + ue + 'tz', 'Schweres Lasergesch' + ue + 'tz', 'Gau' + sz + 'kanone', 'Ionengesch' + ue + 'tz', 'Plasmawerfer', 'Kleine Schildkuppel', 'Gro' + sz + 'e Schildkuppel'));
		var SchiffeundVerteidigung = Schiffe.concat(Verteidigung);
		
		var TechnikenDrago = new Array('w_t','s_t','r_p');
		var SchiffeundVerteidigungDrago = new Array('k_t','g_t','l_j','s_j','kr','sc','ko','re','sp','bo','so','z','t','sk','ra','l_l','s_l','g','i','p','k_s','g_s')
		var a1 = '';
		
		//new stuff
		var tab = ogs.dom.getEBF(ContDiv,'table','width == 519');
		
		if (tab.length > 0)
		{
			var zeilen = tab[0].rows;
			var spalten = null;
			var nextspalte = null;
			var ressearcher = new Array(
				eval('/([\.0-9]+) ('+resUni[0]+')/g'),
				eval('/([\.0-9]+) ('+resUni[1]+')/g'),
				eval('/([\.0-9]+) ('+resUni[2]+')/g'),
				eval('/('+resUni[0]+':)([\.0-9]+) ('+resUni[1]+':)([\.0-9]+) ('+resUni[2]+':)([\.0-9]+)/g'));
			
			for (var i = 0; i < zeilen.length; i++)
			{
				spalten = zeilen[i].cells;
				
				if (spalten.length == 4) //daten 
				{
					//spionagebericht
					if (spalten[3].innerHTML.match(/class="{0,1}espionagereport"{0,1}/)) //.indexOf('class="espionagereport"') > -1)
					{
						if (!settingscur['spio']) continue;
						
						nextspalte = zeilen[i+1].cells;
						
						//spio bericht geöffnet
						if (nextspalte.length == 2)
						{
							spiostuff(nextspalte[1]);
							i++;
						}
					}
					
					//pm
					else if (spalten[3].innerHTML.indexOf('img/m.gif') > -1)
					{
						if (!settingscur['news_pm_aktiv']) continue;
						nextspalte = zeilen[i+1].cells;
						
						if (nextspalte.length == 2)
						{
							nextspalte[1].style.border = '2px solid ' + settingscur['news_pm_farbe'];
							i++;
						}
					}
					
					//ally pm
					else if (spalten[3].innerHTML.indexOf('Rundmail deiner Allianz') > -1)
					{
						if (!settingscur['news_am_aktiv']) continue;
						nextspalte = zeilen[i+1].cells;
						
						if (nextspalte.length == 2)
						{
							nextspalte[1].style.border = '2px solid ' + settingscur['news_am_farbe'];
							i++;
						}
					}
					
					//expo 
					else if (spalten[3].innerHTML.indexOf('Expeditionsergebnis') > -1)
					{
						if (!settingscur['news_expo_aktiv']) continue;
						nextspalte = zeilen[i+1].cells;
						
						if (nextspalte.length == 2)
						{
							nextspalte[1].style.border = '2px solid ' + settingscur['news_expo_farbe'];
							i++;
						}
					}
					
					//kbs
					else if (spalten[3].innerHTML.match(/class="{0,1}combatreport_/)) //.indexOf('class="espionagereport"') > -1)
					{
						//nothing
					}
					
					//sonstige nachrichten
					else
					{
						if (!settingscur['news_color_res']) continue;
						nextspalte = zeilen[i+1].cells;
						
						if (nextspalte.length == 2)
						{
							nextspalte[1].innerHTML = nextspalte[1].innerHTML.replace(ressearcher[3],'$1&nbsp;<span style="color:'+vColorRess[0]+'">$2</span> $3&nbsp;<span style="color:'+vColorRess[1]+'">$4</span> $5&nbsp;<span style="color:'+vColorRess[2]+'">$6</span>').replace(ressearcher[0],'<span style="color:'+vColorRess[0]+'">$1</span>&nbsp;$2').replace(ressearcher[1],'<span style="color:'+vColorRess[1]+'">$1</span>&nbsp;$2').replace(ressearcher[2],'<span style="color:'+vColorRess[2]+'">$1</span>&nbsp;$2');
							i++;
						}
					}
				}			
			}
		}
		
		// Merkliste
		var MerkLinks = ogs.dom.getEBF(ContDiv, 'a', 'name.indexOf("ogs_merken_") == 0'); // Event onclick fuer Speicherfunktion der Koords geht nicht ueber innerHTML

		for (var i = 0; i < MerkLinks.length; i++)
		{
			ogs.addEvent(MerkLinks[i],'click', eval('function() { var test = Merkliste(\'' + koords[i * 4] + '\', \'' + koords[i * 4 + 1] + '\', \'' + koords[i * 4 + 2] + '\', \'' + koords[i * 4 + 3] + '\'); MerkColor(\'ogs_merken_' + koords[i * 4 + 1] + '_' + koords[i * 4 + 2] + '_' + koords[i * 4 + 3] + '\', test); }'), true);
		}
		
		if (ogs.load('news_deletemessages'))
		{
			var delmsg_org = document.getElementsByName('deletemessages');
			var delmsg_ogs = null;
			
			if (delmsg_org.length > 0)
			{
				delmsg_org = delmsg_org[0].parentNode.parentNode;
				delmsg_ogs = delmsg_org.cloneNode(true);
				
				delmsg_org.getElementsByTagName('select')[0].setAttribute('id','deletemessages');
				delmsg_org.getElementsByTagName('select')[0].setAttribute('onchange','document.getElementById("deletemessages_ogs").options[this.selectedIndex].selected="true"');
				delmsg_ogs.getElementsByTagName('select')[0].setAttribute('name','deletemessages_ogs');
				delmsg_ogs.getElementsByTagName('select')[0].setAttribute('id','deletemessages_ogs');
				delmsg_ogs.getElementsByTagName('select')[0].setAttribute('onchange','document.getElementById("deletemessages").options[this.selectedIndex].selected="true"');

				delmsg_org.getElementsByTagName('input')[0].setAttribute('id','deletemessages_button');
				delmsg_ogs.getElementsByTagName('input')[0].setAttribute('id','deletemessages_button_ogs');
				delmsg_ogs.getElementsByTagName('input')[0].setAttribute('onclick','document.getElementById("deletemessages_button").click()');

				delmsg_org.parentNode.insertBefore(delmsg_ogs, delmsg_org.parentNode.firstChild);
			}
		}
	}
	
	//---------------------------
	// Statistikseiten erweitern
	//---------------------------
	// In den Stats
	if (ogs.ogame.page == 'statistics')
	{
		var was = new Array();
		var wasvalue = new Array();
		
		//nur weiter wenn stats da sind (in neuen unis sind sie am start deaktiviert)
		if(document.getElementsByName('who').length > 0)
		{
			was.push(document.getElementsByName('who')[0]);
			was.push(document.getElementsByName('type')[0]);
			was.push(document.getElementsByName('start')[0]);
			
			// ausgewählte einstellung suchen
			for (var i = 0; i < was.length; i++)
			{
				wasvalue[i] = was[i].value;
			}
			
			if (ogs.load('galaxietool'))
			{
				if (wasvalue[0] != 'ally')
				{
					var tabneu = ogs.dom.getEBF(ContDiv, 'table', 'width == 525')[1];
				}
				else
				{
					var tabneu = ogs.dom.getEBF(ContDiv, 'table', 'width == 519')[0];
				}
				
				if (tabneu)
				{
					var taborg = tabneu.cloneNode(true);
					taborg.style.display = 'none';
				}
			}
			
			if (ogs.load('stats_plusminusbuttons'))
			{
				var btn;
				btn = ogs.dom.newElement('input', '', 'type', 'button', 'value', '<');
				ogs.addEvent(btn,'click',function () {if(document.getElementsByName("start")[0].selectedIndex <= 0) return; document.getElementsByName("start")[0].selectedIndex -= 1; document.getElementsByTagName("form")[0].submit();},true);
				was[2].parentNode.insertBefore(document.createElement('br'), was[2].previousSibling);
				was[2].parentNode.insertBefore(document.createElement('br'), was[2].previousSibling);
				was[2].parentNode.insertBefore(btn, was[2]);
				was[2].parentNode.insertBefore(document.createTextNode(' '), was[2]);
				
				btn = ogs.dom.newElement('input', '', 'type', 'button', 'value', '>');
				ogs.addEvent(btn,'click',function () {if(document.getElementsByName("start")[0].selectedIndex >= document.getElementsByName("start")[0].length - 1) return; document.getElementsByName("start")[0].selectedIndex += 1; document.getElementsByTagName("form")[0].submit();},true);
				was[2].parentNode.insertBefore(btn, was[2].nextSibling);
				was[2].parentNode.insertBefore(document.createTextNode(' '), was[2].nextSibling);
			}
			
			var an; var an2; var pn; var pn2;
			
			if (ogs.load('gala_ally_faerben'))
			{
				ogs.load('gala_ally_sn_in_af');
				
				var allyspielerfarben = ogs.array.split(ogs.load('gala_ally_spieler_farben'),'|','&');
				for (var j = 0; j < allyspielerfarben.length; j++)
				{
					allyspielerfarben[j][0] = allyspielerfarben[j][0].split(',');
				}
			}

			if (ogs.load('statlinks_use_stats'))
			{
				var statlinks = ogs_statlinks_load();
				var LinkText;
			}
			
			if (settingscur['gala_ally_faerben'] || settingscur['statlinks_use_stats'])
			{
				var spaltemitallynamen = 3;
				
				if (wasvalue[0] == 'ally')
					spaltemitallynamen = 1;
			}
			
			var toppunkte = -1;
			var pms;
			
			if (wasvalue[0] != 'ally')
			{
				var zeilen = ogs.dom.getEBF(ContDiv, 'table', 'width == 525');
				zeilen = zeilen[1].rows;
			}
			else
			{
				var zeilen = ogs.dom.getEBF(ContDiv, 'table', 'width == 519');
				zeilen = zeilen[0].rows;
			}
			
			ogs.load('show_punkte_diff_top');
			ogs.load('punkte_diff_fontsize');
			
			if (ogs.load('show_punkte_diff'))
			{
				var eigenepos = 0;
				var eigenepunkte = 0;

				for (var i = 1; i < zeilen.length; i++)
				{
					spalten = zeilen[i].cells;
					
					//link auf href="#" ist die eigene posi
					if(ogs.dom.getEBF(spalten[1],'a','getAttribute("href") == "#"').length > 0)
					{
						eigenepos = parseInt(spalten[0].innerHTML.match(/\d+/));
						eigenepunkte = parseInt(spalten[4].innerHTML.trim().replace(/\./g,''));
						break;
					}
				}
			}
			
			for (var i = 1; i < zeilen.length; i++)
			{
				spalten = zeilen[i].cells;
				
				var statpunkte = parseInt(spalten[4].innerHTML.replace(/\./g,''));
				
				if (settingscur['show_punkte_diff_top'])
				{
					if (toppunkte != -1)
					{
						var statdiff = statpunkte - toppunkte;
						
						if (statdiff != 0)
							spalten[4].innerHTML = spalten[4].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + ogs.textfarbe + ';">' + TausenderZahl(statdiff.toString(),true) + '</font>';
						else
							spalten[4].innerHTML = spalten[4].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + ogs.textfarbe + ';">-</font>';
					}
					else
						spalten[4].innerHTML = spalten[4].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + ogs.textfarbe + ';">-</font>';
					
					toppunkte = statpunkte;
				}
				
				if (settingscur['show_punkte_diff'] && eigenepos > 0)
				{
					var thispos = parseInt(spalten[0].innerHTML.match(/\d+/));
					
					if (thispos != eigenepos)
					{
						var statdiff = statpunkte - eigenepunkte;
						spalten[1].innerHTML = spalten[1].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + ogs.textfarbe + ';">' + TausenderZahl(statdiff.toString(),true) + '</font>';
					}
					else
						spalten[1].innerHTML = spalten[1].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + ogs.textfarbe + ';">-</font>';
				}

				if (settingscur['gala_ally_faerben'] || settingscur['statlinks_use_stats'])
				{
					pn2 = spalten[1].getElementsByTagName('a');
					
					if (wasvalue[0] != 'ally' && pn2.length > 0)
					{
						pn2 = pn2[0];
						pn = pn2.innerHTML.trim();
					}
					else
						pn = '';
					
					an2 = spalten[spaltemitallynamen].getElementsByTagName('a');
					
					if (an2.length > 0)
					{
						an2 = an2[0];
						an = an2.innerHTML.trim();
					}
					else
					{
						an = ''; //eigene ally
					}
				}
				
				if (settingscur['gala_ally_faerben'])
				{
					if (pn.length > 0 || an.length > 0)
					{
						for (var j = 0; j < allyspielerfarben.length; j++)
						{
							for (var j2 = 0; j2 < allyspielerfarben[j][0].length; j2++)
							{
								if (1 == allyspielerfarben[j][1])
								{
									if (an.length > 0 && an == allyspielerfarben[j][0][j2])
									{
										try {an2.style.color = allyspielerfarben[j][2];} catch(e){}
										
										if (settingscur['gala_ally_sn_in_af'] && pn.length > 0)
											try {pn2.style.color = allyspielerfarben[j][2];} catch(e){}
									}
								}
								else
								{
									if (pn.length > 0 && pn == allyspielerfarben[j][0][j2])
										try {pn2.style.color = allyspielerfarben[j][2];} catch(e){}
								}
							}
						}
					}
				}
				
				if (settingscur['statlinks_use_stats'])
				{
					if (pn.length > 0 && statlinks.pn.length > 0)
					{
						LinkText = '<tr><td class\'c\'>'+pn+'</td></tr><tr><th><table>';
						
						var pnpos = pn2.href.match(/p1=([0-9]+)&p2=([0-9]+)&p3=([0-9]+)/);
						if (pnpos) LinkText = '<tr><td class\'c\'><a href=\''+pn2.href+'\'>'+pn+' ['+pnpos[1]+':'+pnpos[2]+':'+pnpos[3]+']</a></td></tr><tr><th><table>';
						
						for (var j = 0; j < statlinks.pn.length; j++)
							LinkText += ogs_statlinks_creattooltipline(statlinks.pu[j], pn, statlinks.pn[j]);
						
						ogs.addOverLib(pn2,'<table width=\'240\'>'+LinkText+'</table></th></tr></table>\\\", '+ogs.window.STICKY+', '+ogs.window.MOUSEOFF+', '+ogs.window.DELAY+', 500, '+ogs.window.CENTER+', '+ogs.window.OFFSETY+', -20,\\\"');
					}
					
					if (an.length > 0 && statlinks.an.length > 0)
					{
						LinkText = '<tr><td class\'c\'>'+an+'</td></tr><tr><th><table>';
						
						for (var j = 0; j < statlinks.an.length; j++)
							LinkText += ogs_statlinks_creattooltipline(statlinks.au[j], an, statlinks.an[j]);
						
						ogs.addOverLib(an2,'<table width=\'240\'>'+LinkText+'</table></th></tr></table>\\\", '+ogs.window.STICKY+', '+ogs.window.MOUSEOFF+', '+ogs.window.DELAY+', 500, '+ogs.window.CENTER+', '+ogs.window.OFFSETY+', -20,\\\"');
					}
				}
			}
			
			if (ogs.load('galaxietool'))
			{
				if (tabneu)
				{
					tabneu.parentNode.insertBefore(taborg, tabneu);
				}
			}
		}	  
	}
	
	//-----------------------------
	// Die Imperiumansicht aendern
	//-----------------------------
	
	if (ogs.ogame.page == 'imperium' && ogs.load('imperium_pic_change'))
	{
		var Rows = ogs.dom.getEBF(ContDiv, 'table', 'width == 750');
		Rows = Rows[0].rows;
		var bildzeile = null;
		
		if (Rows[1].cells[0].innerHTML == '')
			bildzeile = Rows[1];
		else
			bildzeile = Rows[2];
		
		Rows = ogs.dom.getEBF(bildzeile,'th','getAttribute("style")');
		if (Rows)
		{
			for (var i = 0; i < Rows.length; i++)
			{
				if (Rows[i].style.padding)
				{
					Rows[i].style.padding = ogs.load('imperium_pic_abstand')+'px';
				}
			}
		}
		Rows = ogs.dom.getEBF(bildzeile,'div','getAttribute("style")');
		if (Rows)
		{
			for (var i = 0; i < Rows.length; i++)
			{
				if (Rows[i].style.padding)
					Rows[i].style.width = ogs.load('imperium_pic_x')+'px';
			}
		}

		Rows = ogs.dom.getEBF(bildzeile,'img','src.match("/planeten/")');
		if (Rows)
		{
			for (var i = 0; i < Rows.length; i++)
			{
				Rows[i].setAttribute('width',ogs.load('imperium_pic_x'));
				Rows[i].setAttribute('height',ogs.load('imperium_pic_y'));
			}
		}
	}
	
	var produktion = new Array();
	
	if (ogs.ogame.page == 'imperium' && ogs.load('imperium_calc_resis'))
	{
		ogs.load('imperium_kosten');
		
		// Init Vars
		var Schnitt = 0;
		var ProdSumme = 0;
		var Summe = 0;
		
		var gebwerte = new Array();
		gebwerte[1] = new Array(60, 15, 0, 1.5);
		gebwerte[2] = new Array(48, 24, 0, 1.6);
		gebwerte[3] = new Array(225, 75, 0, 1.5);
		gebwerte[4] = new Array(75, 30, 0, 1.5);
		gebwerte[12] = new Array(900, 360, 180, 1.8);
		gebwerte[14] = new Array(400, 120, 200, 2);
		gebwerte[15] = new Array(1000000, 500000, 100000, 2);
		gebwerte[21] = new Array(400, 200, 100, 2);
		gebwerte[22] = new Array(2000, 0, 0, 2);
		gebwerte[23] = new Array(2000, 1000, 0, 2);
		gebwerte[24] = new Array(2000, 2000, 0, 2);
		gebwerte[31] = new Array(200, 400, 200, 2);
		gebwerte[33] = new Array(0, 50000, 100000, 2);
		gebwerte[34] = new Array(20000, 40000, 0, 2);
		gebwerte[44] = new Array(20000, 20000, 1000, 2);
		gebwerte[41] = new Array(20000, 40000, 20000, 2);
		gebwerte[42] = new Array(20000, 40000, 20000, 2);
		gebwerte[43] = new Array(2000000, 4000000, 2000000, 2);
		var buildings = new Array();
		var planiids = new Array();
			
		var Rows = ogs.dom.getEBF(ContDiv, 'table', 'width == 750');
		Rows = Rows[0].rows;
		
		var impcode = '<b>Tagesproduktion</b>';
		var improhstoffzeile = 0;
		var impTDnr = 0;
		var vColorRess = new Array(ogs.load('color_met'),ogs.load('color_kris'),ogs.load('color_deut'),ogs.load('color_eng'))
		var planiEnergie = new Array();
		var reszeilen = new Array();
		var ress_wert;
		
		//planet oder mond?
		var impplanettype = document.location.toString().match(/planettype=([0-9])/);
		if (impplanettype) impplanettype = parseInt(impplanettype[1])
		else impplanettype = 1;
		
		var impstart = false;
		
		for (var z = 0; z < Rows.length; z++)
		{
			var Zellen = Rows[z].cells;
			
			//summenspalte entfernen
			var zellenlength = Zellen.length;
			if (zellenlength > 2)
			{
				zellenlength--;
				Rows[z].deleteCell(zellenlength);
			}
			else if (zellenlength == 1)
			{
				Rows[z].colSpan -= 1;

				if (Zellen[0].tagName.match(/td/i))
				{
					switcher = Zellen[0].innerHTML.substring(0, 3);
					impTDnr++;
				}
			}
			
			if (zellenlength < 2) continue;
			
			//gebaeude id lauslesen
			var gid = Zellen[0].innerHTML.match(/gid=([0-9]+)/);
			if (gid) gid = parseInt(gid[1]);
			else gid = 0;
			
			if (gid == 0) // Ress
			{
				if (impTDnr != 2) continue;
				
				Summe = 0;
				ProdSumme = 0;
				
				if (improhstoffzeile == 0 || improhstoffzeile == 1 || improhstoffzeile == 2)
				{
					var rezeilenwerte = new Array();
					
					for (var i = 1; i < zellenlength; i++)
					{
						var ress_neu = Zellen[i].innerHTML.match(/\s+[\.0-9]+\s+/g);
						if (ress_neu)
							ress_wert = parseInt(ress_neu[0].replace(/<|>|\./g, ''));
						else
							ress_wert = 0;
						
							Summe += ress_wert;
						
						rezeilenwerte.push(ress_wert);
						
						if (ress_neu && ress_neu[1])
							ProdSumme += parseInt(ress_neu[1].replace(/<|>|\./g, ''));
						
						if (impplanettype == 1)
							Zellen[i].innerHTML = Zellen[i].innerHTML.replace(/[^<]\//,'<br />');
						else
							Zellen[i].innerHTML = Zellen[i].innerHTML.replace(/>[\s]*\/[\s]*0/,'>');
					}
					
					if (impplanettype == 1)
						Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + vColorRess[improhstoffzeile] + ';"> ' + TausenderZahl(Summe) + '</span><br />&Sigma;<span style="color:' + vColorRess[improhstoffzeile] + ';"> ' + TausenderZahl(ProdSumme) + '</span>';
					else
						Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + vColorRess[improhstoffzeile] + ';"> ' + TausenderZahl(Summe) + '</span>';
					
					if (improhstoffzeile == 0)
						impcode += '<p>M: <span style="color:' + vColorRess[0] + ';">' + TausenderZahl(ProdSumme * 24) + '</span><br>';
					else if (improhstoffzeile == 1)
						impcode += 'K: <span style="color:' + vColorRess[1] + ';">' + TausenderZahl(ProdSumme * 24) + '</span><br>';
					else if (improhstoffzeile == 2)
						impcode += 'D: <span style="color:' + vColorRess[2] + ';">' + TausenderZahl(ProdSumme * 24) + '</span></p>';

					produktion.push(ProdSumme);
					reszeilen.push(Rows[z],rezeilenwerte);
				}
				else if (improhstoffzeile == 3)
				{
					for (var i = 1; i < zellenlength; i++)
					{
						var ress_neu = Zellen[i].innerHTML.match(/\s+[-\.0-9]+\s+/g);
						
						if (ress_neu && ress_neu[0] && ress_neu[1])
						{
							planiEnergie.push(new Array(parseInt(ress_neu[0].replace(/<|>|\./g, '')),parseInt(ress_neu[1].replace(/<|>|\./g, ''))));
						}
						
						if (impplanettype == 1)
							Zellen[i].innerHTML = Zellen[i].innerHTML.replace(/[\s]+\/[\s]+/,'<br />');
						else
							Zellen[i].innerHTML = '0';
					}
				}
				
				improhstoffzeile++;				
			}
			else if (gid < 100) // Gebaeude
			{
				Schnitt = 0;
				
				for (var i = 1; i < zellenlength; i++)
				{
					var handler_neu = Zellen[i].innerHTML.match(/ [\.0-9]+ /g);
					
					if (handler_neu)
					{
						var mine = parseInt(handler_neu[0].replace(/\./g, ''));
						var nextmine = mine + 1;
						Schnitt += mine;
						
						if (!buildings[i-1]) buildings[i-1] = '';
						buildings[i-1] += gid +'='+mine+':';
						
						if (!planiids[i-1])
						{
							var pid = Zellen[i].innerHTML.match(/cp=([0-9]+)/);
							if (pid) planiids[i-1] = parseInt(pid[1],10);
						}

						if (gid == 22 || gid == 23 || gid == 24) // speicher
						{
							ogs.addOverLib(reszeilen[(gid-22)*2].cells[i], '<table width=\'100%\'><tr><td><table width=\'100%\'><tr><th>Speicher:</th><th>'+Math.floor(reszeilen[(gid-22)*2+1][i-1] / (50 * Math.ceil(1 + Math.pow(1.6, mine)))) / 10 + '%</th></tr></table></td></tr></table>');
						}
						
						if (settingscur['imperium_kosten'])
						{
							var kosten = 0;
							var energie = 0;
							
							if (gebwerte[gid])
								kosten = ogs.getKosten(gebwerte[gid][0],gebwerte[gid][1],gebwerte[gid][2],gebwerte[gid][3],nextmine);
							
							if (gid <= 4 || gid == 12)
							{
								energie = ogs.getEnergie(gid, nextmine) - ogs.getEnergie(gid, (nextmine - 1));
								var f_energie = planiEnergie[i-1][0] + energie;
							}
							else if (gid == 33)
							{
								energie = Math.floor(1000 * Math.pow(2, (nextmine - 1)), 0);
								var f_energie = energie - planiEnergie[i-1][1];
							}
								
							if (energie != 0)
							{
								if (f_energie >= 0)
									f_color = 'green';
								else
									f_color = 'red';
							}
							
							Zellen[i].innerHTML += ((kosten[0] > 0) ? '<br>M:&nbsp;<span style="color:' + ogs.textfarbe + ';">' + TausenderZahl(kosten[0].toString()) + '</span>' : '') + ((kosten[1] > 0) ? '<br>K:&nbsp;<span style="color:' + ogs.textfarbe + ';">' + TausenderZahl(kosten[1].toString()) + '</span>' : '') + ((kosten[2] > 0) ? '<br>D:&nbsp;<span style="color:' + ogs.textfarbe + ';">' + TausenderZahl(kosten[2].toString()) + '</span>' : '') + ((energie != 0) ? '<br>E:&nbsp;<span style="color:' +ogs.textfarbe + ';">' + TausenderZahl(energie.toString(),true) + '</span> (<span style="color:' + f_color + ';">' + TausenderZahl(f_energie.toString(),true) + '</span>)' : '');
						}
					}
				}
				
				Schnitt = Math.round((Schnitt / (i - 1)) * 100) / 100;
				
				if (Zellen[0])
				{
					Zellen[0].innerHTML = Zellen[0].innerHTML + '<br />&Oslash;<span style="color:' + ogs.textfarbe + ';"> ' + Schnitt + ' </span>';
				}
			}
			else if (gid < 200) //Forschung
			{
				Schnitt = 0;
				
				for (var i = 1; i < zellenlength; i++)
				{
					var handler = Zellen[i].innerHTML;
					var handler_neu = handler.match(/>\s*[\.0-9]+\s*</g);
					if (handler_neu) 
					{
						Schnitt += parseInt(handler_neu[0].replace(/<|>|\./g, ''));
					}
				}
				
				Schnitt = Math.round((Schnitt / (i - 1)) * 100) / 100;
				
				if (Zellen[0])
				{
					Zellen[0].innerHTML = Zellen[0].innerHTML + '<br />&Oslash;<span style="color:' + ogs.textfarbe + ';"> ' + Schnitt + ' </span>';
				}
			}
			else //Schiffe Verteidigung
			{
				Summe = 0;
				Schnitt = 0;

				for (var i = 1; i < zellenlength; i++)
				{
					var handler = Zellen[i].innerHTML;
					var handler_neu = handler.match(/>\s*[\.0-9]+\s*</g);
					if (handler_neu)
					{
						h2 = parseInt(handler_neu[0].replace(/<|>|\./g, ''));
						Schnitt += h2;
						Summe += h2;
					}
				}

				Schnitt = Math.round((Schnitt / (i - 1)) * 100) / 100;
				
				if (Zellen[0])
				{
					Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + ogs.textfarbe + ';"> ' + TausenderZahl(Summe) + '</span>&nbsp;&nbsp;&nbsp;&Oslash;<span style="color:' + ogs.textfarbe + ';"> ' + Schnitt + ' </span>';
				}
			}
		}
		
		if (impplanettype == 1)
		{
			var LeerFeld = Rows[1].cells;
			
			if (LeerFeld[0].innerHTML == '')
			{
				LeerFeld[0].innerHTML = impcode;
			}
			else
			{
				var LeerFeld = Rows[2].cells;
				LeerFeld[0].innerHTML = impcode;
			}
		}
		 
		if (buildings.length > 0)
		{
			var allbuildings = ogs.array.split(ogs.load('buildings'),'|','&');
			
			for (var i = 0; i < planiids.length; i++)
			{
				if (!planiids[i] || !buildings[i]) continue;
				
				//bereits vorhande planis loeschen um neue werte dann einzutragen
				for (var ii = 0; ii < allbuildings.length; ii++)
				{
					if (allbuildings[ii][0] == planiids[i])
					{
						allbuildings.splice(ii,1);
						ii--;
					}
				}
				
				allbuildings.push(new Array(planiids[i], buildings[i]));
			}
			
			ogs.save('buildings',ogs.array.join(allbuildings,'|','&'));
		}		
	} // Ende der Imperium-Erweiterungen
	
	//---------------------------------------
	// Memberliste bereits sortiert anzeigen
	//---------------------------------------
	if (ogs.ogame.page == 'allianzen')
	{
		if (!document.URL.match(/a=/) && !ContDiv.innerHTML.match(/a=1"/))
		{
			var ML_Link = ogs.dom.getEBF(ContDiv, 'table', 'width == 519');
			
			if (ML_Link.length > 0)
			{
				ML_Link = ML_Link[0].rows;
				if (ML_Link.length >= 4)
				{
					ML_Link = ML_Link[3].cells;
					if (ML_Link.length >= 2)
					{
						ML_Link = ML_Link[1].getElementsByTagName('a');
						if (ML_Link.length > 0)
						{
							ML_Link = ML_Link[0];
							if (ML_Link.innerHTML.indexOf('Mitgliederliste') + 1 && ogs.load('ml_sort'))
							{
								var LinkNeu = ML_Link.href + '&sort1=' + ogs.load('ml_typ') + '&sort2=' + ogs.load('ml_art');
								ML_Link.setAttribute('href', LinkNeu);
							}
						}
					}
				}
			}
		}
		
		if((ogs.load('show_punkte_diff') || ogs.load('show_punkte_diff_top')) && document.URL.match(/\&a=4\&/))
		{
			ogs.load('punkte_diff_fontsize');
			ogs.load('show_punkte_diff');
			ogs.load('show_punkte_diff_top');
			
			var eigenepunkte = -1;
			var toppunkte = -1;
			var zeilen = ogs.dom.getEBF(ContDiv,'table', 'width == 519');
			zeilen = zeilen[0].rows;
			
			if (settingscur['show_punkte_diff'])
			{
				for (var i = 2; i < zeilen.length; i++)
				{
					spalten = zeilen[i].getElementsByTagName('th');
					
					//keine pm in spalte wenn man es selbst ist
					if(spalten[2].getElementsByTagName('a').length == 0)
					{
						eigenepunkte = spalten[4].innerHTML.trim();
						eigenepunkte = parseInt(eigenepunkte.replace(/\./g,''));
						
						break;
					}
				}
			}
			
			for (var i = 2; i < zeilen.length; i++)
			{
				spalten = zeilen[i].getElementsByTagName('th');
				
				var thispunkte = spalten[4].innerHTML.trim();
				thispunkte = parseInt(thispunkte.replace(/\./g,''));
				
				if (eigenepunkte > -1 && settingscur['show_punkte_diff'])
				{
					if (thispunkte != eigenepunkte)
					{
						var statdiff = thispunkte - eigenepunkte;
						spalten[3].innerHTML = spalten[3].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + ogs.textfarbe + ';">' + TausenderZahl(statdiff.toString(),true) + '</font>';
					}
				}
				
				if (settingscur['show_punkte_diff_top'])
				{
					if (toppunkte > -1)
					{
						var statdiff = toppunkte - thispunkte;
						spalten[4].innerHTML = spalten[4].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + ogs.textfarbe + ';">' + TausenderZahl(statdiff.toString(),true) + '</font>';
					}
					
					toppunkte = thispunkte;
				}
			}
		}
	}
	
	//------------------
	// Die Gala aendern
	//------------------
	if (ogs.ogame.page == 'galaxy')
	{
		if (ogs.load('galaxietool'))
		{
			var tabneu = ogs.dom.getEBF(ContDiv, 'table', 'width == 569');
			
			if(tabneu.length > 0)
			{
				var taborg = tabneu[0].cloneNode(true);
				taborg.style.display = 'none';
			}
		}

		var FoxGameVerkl = -1; // speichert, ob FoxGame die Gala verkleinert hat
		
		if (ogs.load('tf_limit'))
		{
			ogs.load('color_met');
			ogs.load('color_kris');
			ogs.load('tf_color');
		}
		
		ogs.load('platz_anzeige');
		ogs.load('allyplatz_anzeige');
		
		if (ogs.load('statlinks_use_gala')) var statlinks = ogs_statlinks_load();
		
		if (ogs.load('gala_iprak_aktiv'))
		{
			var ipziel = document.getElementsByName('pziel');
			
			if (ipziel.length > 0)
			{
				ipziel = ipziel[0];
				
				var value = ogs.load('gala_iprak_wert');
				
				if (value >= 0 && ipziel.length > value)
					ipziel.selectedIndex = value;
				
				if (ogs.load('gala_iprak_max'))
				{
					var ipanzahl = document.getElementsByName('anz');
					
					if (ipanzahl.length > 0)
					{
						ipziel = ipziel.parentNode.parentNode.cells[0];
						ipanzahl[0].value = exp('g_rak',/Raketenanzahl \(([0-9]*) vorhanden\):/).exec(ipziel.innerHTML)[1];
					}
				}
			}
		}
		
		if(ogs.load('gala_ally_faerben'))
		{
			ogs.load('gala_ally_sn_in_af');
			
			var allyspielerfarben = ogs.array.split(ogs.load('gala_ally_spieler_farben'),'|','&');
			for (var j = 0; j < allyspielerfarben.length; j++)
			{
				allyspielerfarben[j][0] = allyspielerfarben[j][0].split(',');
			}
		}
		
		var Zeile = ogs.dom.getEBF(ContDiv, 'table', 'width == 569');

		if (Zeile.length > 0)
		{
			Zeile = Zeile[0].rows;
			var an; var pn;
			var platzexp = exp('g_rank',new Array(/Platz ([.0-9]+)/,/Platz ([.0-9]+)/,/mit ([.0-9]+)/));
			
			for (var i = 0; i < Zeile.length; i++)
			{
				var Spalte = Zeile[i].cells;
				
				if (Spalte.length > 4)
				{
					// wenn es keine 8. Spalte mehr gibt war hier wohl FoxGame am Werk
					if (FoxGameVerkl == -1) 
					{
						if (Spalte.length < 8)
						{
							if (Spalte.length == 6) //foxgame und shortcuts off
							{
								FoxGameVerkl = 1;
							}
							else
							{
								if (Spalte[Spalte.length-1].innerHTML.match('Allianz')) // nur shortcuts off
									FoxGameVerkl = 0;
								else //foxgame
									FoxGameVerkl = 1;
							}
						}
						else 
						{
							FoxGameVerkl = 0;
						}
					}
					
					if (settingscur['tf_limit'] >= 0)
					{
						var PlaniName = Spalte[2-FoxGameVerkl];
						var TFInhalt = Spalte[4-FoxGameVerkl];
						var aHref = TFInhalt.getElementsByTagName('a');
						
						if (aHref.length > 0)
						{
							aHref = aHref[0];
							var TFM = InInt(exp('g_tf_met',/Metall:<\/th><th>([.0-9]+)/).exec(aHref.getAttribute('onmouseover').toString())[1]);
							var TFK = InInt(exp('g_tf_kri',/Kristall:<\/th><th>([.0-9]+)/).exec(aHref.getAttribute('onmouseover').toString())[1]);
							
							if (TFM + TFK >= ogs.load('tf_limit'))
							{ 
								PlaniName.appendChild(document.createElement('br'));
								PlaniName.appendChild(ogs.dom.newElement('span', '(M: <font color="'+settingscur['color_met']+'">' + TausenderZahl(TFM) + '</font>, K: <font color="'+settingscur['color_kris']+'">' + TausenderZahl(TFK) + '</font>)', 'style', 'color:' + ogs.textfarbe + ';'));
								
								//tf umranden
								aHref = aHref.getElementsByTagName('img');
								
								if (aHref)
								{
									aHref[0].style.border = '3px';
									aHref[0].style.borderColor = settingscur['tf_color'];
									aHref[0].style.borderStyle = 'solid';
								}
							}
						}
					}
					
					if (settingscur['platz_anzeige'])
					{
						var PlayerName = Spalte[5-FoxGameVerkl];
						var aHref = PlayerName.getElementsByTagName('a')[0];
						
						if (aHref)
						{
							if (!PlayerName.getElementsByTagName('span')[0].innerHTML.length) { continue; } // oGame v0.77 fix (iI) Geisterspieler
							var Platz = platzexp[0].exec(aHref.getAttribute('onmouseover').toString());
							
							if (Platz)
								Platz = TausenderZahl(parseInt(Platz[1], 10));
							else
								Platz = '???';
							
							PlayerName.appendChild(document.createElement('br'));
							PlayerName.appendChild(ogs.dom.newElement('span', '#' + Platz  + '&nbsp;', 'style', 'color:' + ogs.textfarbe + ';'));
						}
					}
					
					if (settingscur['allyplatz_anzeige'])
					{
						var AllyName = Spalte[6-FoxGameVerkl];
						var aHref = AllyName.getElementsByTagName('a')[0];
						
						if (aHref)
						{
							var AlPlatz = platzexp[1].exec(aHref.getAttribute('onmouseover').toString());
							if (AlPlatz)
								AlPlatz = TausenderZahl(parseInt(AlPlatz[1], 10));
							else 
								AlPlatz = '???';
							
							var AnzMtgl = platzexp[2].exec(aHref.getAttribute('onmouseover').toString());
							if (AnzMtgl)
								AnzMtgl = TausenderZahl(parseInt(AnzMtgl[1], 10));
							else 
								AnzMtgl = '???';
							
							AllyName.appendChild(document.createElement('br'));
							AllyName.appendChild(ogs.dom.newElement('span', '#' + AlPlatz + ' / ' + AnzMtgl + '', 'style', 'color:' + ogs.textfarbe + ';'));
						}
					}				

					if (settingscur['gala_ally_faerben'])
					{
						var PlayerName = Spalte[5-FoxGameVerkl].getElementsByTagName('a');
						var AllyName = Spalte[6-FoxGameVerkl].getElementsByTagName('a');
						
						if (PlayerName.length > 0)
						{
							PlayerName = PlayerName[0].getElementsByTagName('span')[0];
							pn = PlayerName.innerHTML.trim();
						}
						else
							pn = '';
							
						if (AllyName.length > 0)
						{
							AllyName = AllyName[0];
							an = AllyName.innerHTML.replace(/<.*?>/g,'').trim();
						}
						else
							an = '';
						
						if (pn.length > 0 || an.length > 0)
						{
							for (var j = 0; j < allyspielerfarben.length; j++)
							{
								for (var j2 = 0; j2 < allyspielerfarben[j][0].length; j2++)
								{
									if (1 == allyspielerfarben[j][1])
									{
										if (an.length > 0 && an == allyspielerfarben[j][0][j2])
										{
											try {AllyName.style.color = allyspielerfarben[j][2];} catch(e){}
											AllyName.innerHTML = an;
											
											if (settingscur['gala_ally_sn_in_af'] && pn.length > 0)
												try {PlayerName.style.color = allyspielerfarben[j][2];} catch(e){}
										}
									}
									else
									{
										if (pn.length > 0 && pn == allyspielerfarben[j][0][j2])
											try {PlayerName.style.color = allyspielerfarben[j][2];} catch(e){}
									}
								}
							}
						}
					}
					
					if (settingscur['statlinks_use_gala'])
					{
						var Link = null;
						var LinkText = null;
						
						function ogs_addOverLibTest(obj,code)
						{
							obj.removeAttribute('onmouseout');
							obj.removeAttribute('onmouseover');
							
							ogs.addEvent(obj,'mouseout',ogs.window.nd,true);
							ogs.addEvent(obj,'mouseover',eval('new Function(\'\',\"ogs.window.'+code.replace(/\n/g,'').replace(/.*overlib\(\'/,'overlib(\\\"').replace(/\', .*/,'\\\", '+ogs.window.STICKY+', '+ogs.window.MOUSEOFF+', '+ogs.window.DELAY+', 750, '+ogs.window.CENTER+', '+ogs.window.OFFSETY+', -40);')+'\")'),true);
						} 
						
						//spieler
						Link = Spalte[5-FoxGameVerkl].getElementsByTagName('a');
						if (Link.length > 0 && statlinks.pn.length > 0)
						{
							Link = Link[0];
							LinkText = '';
							
							for (var j = 0; j < statlinks.pn.length; j++)
								LinkText += ogs_statlinks_creattooltipline(statlinks.pu[j], Link.getElementsByTagName('span')[0].innerHTML.trim(),statlinks.pn[j]);
							
							ogs_addOverLibTest(Link,Link.getAttribute('onmouseover').toString().replace('</table></th>','</table></th></tr><tr><th><table>' + LinkText + '</table></th></tr>'));
						}
						
						//ally
						Link = Spalte[6-FoxGameVerkl].getElementsByTagName('a');
						if (Link.length > 0 && statlinks.an.length > 0)
						{
							Link = Link[0];
							LinkText = '';

							for (var j = 0; j < statlinks.an.length; j++)
								LinkText += ogs_statlinks_creattooltipline(statlinks.au[j], Link.innerHTML.replace(/<.*?>/g,'').trim(),statlinks.an[j]);

							ogs_addOverLibTest(Link,Link.getAttribute('onmouseover').toString().replace('</table></th>','</table></th></tr><tr><th><table>' + LinkText + '</table></th></tr>'));
						}
					}
				}
			}
		}
		
		if (ogs.load('galaxietool'))
		{
			if (tabneu.length > 0)
			{
				tabneu[0].parentNode.insertBefore(taborg, tabneu[0]);
				
				//loeschen der benötigten ids für info anzeige
				var deleteme = null;
				
				deleteme = document.getElementById('fleetstatusrow');
				if (deleteme) deleteme.parentNode.removeChild(deleteme);
				
				deleteme = document.getElementById('probes');
				if (deleteme) deleteme.parentNode.removeChild(deleteme);
				
				deleteme = document.getElementById('recyclers');
				if (deleteme) deleteme.parentNode.removeChild(deleteme);
				
				deleteme = document.getElementById('slots');
				if (deleteme) deleteme.parentNode.removeChild(deleteme);
			}
		}
	}
	
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

			function loadCoords() {
				var CoordsTab = new Array;
				var str = ogs.load('farmliste_liste');
				var adresy = str.split( '^' );
				
				for (var i in adresy)
					if (adresy[i]!='')
						CoordsTab[i] = adresy[i].split('|');
				
				return CoordsTab;
			}

			function saveCoords(CoordsTab) {
				var str = '';
				
				for (var i in CoordsTab) if (i > 0)
					if (typeof(CoordsTab[i]) != 'undefined')
						str = str + '^' + CoordsTab[i][0] + '|' + CoordsTab[i][1] + '|' + CoordsTab[i][2];
				
				ogs.save('farmliste_liste', str);
			}

			function editCoord(event) {
				CoordsTab = loadCoords();
				var nr = event.target.parentNode.parentNode.firstChild.firstChild.firstChild.nodeValue;
				
				if (coords = prompt('Bitte Koords eintragen X:XXX:XX', CoordsTab[nr][0]))
					if (desc = prompt('Bezeichnung eintragen', CoordsTab[nr][1])) 
						if (typ = prompt('Typ , 1 - Planet, 2 -TF, 3 - Mond', (CoordsTab[nr][2] != 'undefined') ? CoordsTab[nr][2] : '1')){
							coords = coords.replace(/[\^\|]/g,'');
							desc = desc.replace(/[\^\|]/g,'');
							typ = typ.replace(/[^0-9]/g,'');
							CoordsTab[nr][0] = coords;
							CoordsTab[nr][1] = desc;
							CoordsTab[nr][2] = typ;
							saveCoords(CoordsTab);
							showFarmliste();
						}
				
				return false;
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
	
	//------------------------
	// allgemeine Korrekturen
	//------------------------
	// title-Tags bearbeiten
	
	if (ogs.ogame.page == 'overview' || ogs.ogame.page == 'flotten1')
	{
		if (ogs.load('skin_advance') && (ogs.load('schiffs_geschw') || ogs.load('flotten_zusatz')))
		{
			ogs.load('schiffs_geschw');
			ogs.load('flotten_zusatz');
			
			var Links = ContDiv.getElementsByTagName('a');
			
			for (var i = 0; i < Links.length; i++)
			{
				if (!Links[i].title || Links[i].title.search(/^[0-9]+$/) + 1) { continue; } // bei nur aus Zahlen bestehenden Titeln nichts tun (das sind die Counter)
				
				if (ogs.ogame.page == 'overview' && settingscur['flotten_zusatz'])
				{
					Links[i].title = Links[i].title.replace(/([0-9])([A-Z])/g, '$1, $2');
				}
				
				if (ogs.ogame.page == 'flotten1' && settingscur['schiffs_geschw'] && (Links[i].title.indexOf('Geschwindigkeit: ') + 1 || Links[i].title.indexOf('Speed: ') + 1))
				{
					Links[i].setAttribute('class', 'geschw_anzeige');
				}
			}
		}
	}
		
	//----------------
	// IGM-Messagemodus erweitern
	//----------------
	if (ogs.ogame.page == 'writemessages' && ogs.load('igm_signatur_bool'))
	{
		var text = ContDiv.getElementsByTagName('textarea');
		if (text.length >= 1)
		{
			ogs.setTextArea(text[0], (ogs.load('igm_signatur')).replace(/\\n/g,'\n'));
		}
	}
	
	//----------------
	// Skin erweitern
	//----------------
	if (ogs.load('skin_advance')) {
		var CSSStr = '#content table { empty-cells:show; }';
		
		switch(ogs.ogame.page) // Idee von Badhard
		{
			case 'flotten1':
				// Tabellen breiter machen
				CSSStr += 'table[width="519"] { width:' + TabBreite(800, 519) + 'px; }';
				
				// erforderliche GT/KT anzeigen + Schiffsgeschwindigkeiten anzeigen
				if (ogs.load('schiffs_geschw'))
				{
					CSSStr += 'a[title]:after { content:" ("attr(title)")"; color:' + ogs.textfarbe + '; }';
					CSSStr += 'a.geschw_anzeige:after { content:" ("attr(title)")"; color:#009999; }';
				}
			break;
			
			case 'messages':
				// Tabellen breiter machen
				CSSStr += 'table[width="519"] { width:' + TabBreite(800, 519) + 'px; }';
				
				// Spioberichte zentrieren
				var Tabs = ogs.dom.getEBF(document, 'table', 'width == 400');
				for (var i = 0; i < Tabs.length; i++)
				{
					Tabs[i].align = 'center';
				}
			break;
			
			case 'options':
				// Tabellen breiter machen
				CSSStr += 'table[width="519"] { width:' + TabBreite(650, 519) + 'px; }';
			break;
			
			case 'resources':
				// Tabellen breiter machen
				CSSStr += 'table[width="500"] { width:' + TabBreite(550, 500) + 'px; }';
			break;
			
			case 'galaxy':
				// Tabellen breiter machen
				CSSStr += 'table[width="569"] { width:' + TabBreite(700, 569) + 'px; }';
			break;
			
			case 'overview':
				// Tabellen breiter machen
				CSSStr += 'table[width="519"] { width:' + TabBreite(2000, 519) + 'px; }';
				
				// Planibilder zentrieren
				var Tabs = ogs.dom.getEBF(ContDiv, 'table', 'className == "s" && knoten.align == "top"');
				if (Tabs.length) { Tabs[0].align = 'center'; }
			break;
			
			case 'b_building' || 'buildings':
				// fehlende Ress umfaerben
				if (ogs.load('fehlress_als_text'))
				{
					CSSStr += 'a[title]:after {content:" ("attr(title)")"; color:' + ogs.textfarbe + '; }';
				}
			break;
		}
		
		document.getElementById('menu').firstChild.nextSibling.style.fontSize = '0pt';
		ogs.addStyle(CSSStr);
	}

	// info seite der gebaeude (sprungtor zeitpunkt von wider bereit)
	if (ogs.ogame.page == 'infos' && ogs.load('endzeiten'))
	{
		var gid = document.URL.match(/gid=([0-9]+)/);
		
		if (gid.length > 1)
		{
			gid = parseInt(gid[1]);
			
			if (gid == 43) //sprungtor
			{
				var el = ogs.dom.getCEBF(ContDiv, 'center');
				
				if (el.length > 0)
				{
					el = ogs.dom.getCEBF(el[0], 'center');
					
					if (el.length > 0)
					{
						el = el[0];

						var min = el.innerHTML.match(/ ([0-9]+)min /);
						if (min) min = parseInt(min[1]);
						else min = 0;
						
						var sec = el.innerHTML.match(/ ([0-9]+)sec /);
						if (sec) sec = parseInt(sec[1]);
						else sec = 0;
						
						if (min > 0 || sec > 0)
						{
							el.innerHTML += '<br />' + ogs.time.stamp(new Date(ogs.time.now().getTime() + min * 60000 + sec * 1000));
						}
					}
				}
			}
		}
	}
	
	//-----------------------------
	// Einstellungsmenue erweitern
	//-----------------------------
	// In den Einstellungen
	if (ogs.ogame.page == 'options')
	{
		var ContDivCtr = ContDiv.getElementsByTagName('center')[0];
		ContDivCtr.appendChild(document.createElement('br'));
		ContDivCtr.appendChild(document.createElement('br'));
		ContDivCtr.appendChild(document.createElement('br'));
		ContDivCtr.appendChild(document.createElement('br'));
		ContDivCtr.appendChild(document.createElement('br'));
		
		var NeuTab = ogs.dom.newElement('div', '');
		code = '<table width="519"><tr><td class="c">'+txt('options_1','OGame-Skript: Setup')+'</td></tr><tr><td class="c">'+txt('options_2','OGame-Skript: Lizenz')+'</td></tr><tr><th style="text-align: justify;">';
		code += txt('options_3','OGame-Skript v#*1*#, ein Greasemonkey-Userscript, das OGame um einige, n&uuml;tzliche Funktionen erweitert.<br /><br />Copyright (C) 2006-2007 Windows-zerstoerer, ab M&auml;rz 2007 Eleria &amp; Co (siehe #*2*#), ab Juli 2007 hakaz &amp; User-Gruppe des OGame-Forums (siehe unter Team auf #*3*#)',ogs.version(),'<a href="http://board.ogame.de/thread.php?threadid=435082" target="_blank">http://board.ogame.de/thread.php?threadid=435082</a>','<a href="' + ogs.getLink(ogs.homepage) + '" target="_blank">'+ogs.homepage+'</a>')+'<br /><br />';
		code += txt('options_4','Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation ver&ouml;ffentlicht, weitergeben und/oder modifizieren, gem&auml;&szlig; Version 2 der Lizenz.')+'<br /><br />';
		code += txt('options_5','Die Ver&ouml;ffentlichung dieses Programms erfolgt in der Hoffnung, dass es dir von Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der VERWENDBARKEIT F&Uuml;R EINEN BESTIMMTEN ZWECK. Details findest du in der GNU General Public License.')+'<br /><br />';
		code += txt('options_6','F&uuml;r weitere Details, schau dir die volle GPL im Internet an:<br />#*1*# (Englisch)<br />#*2*# (Deutsch)<br /><br />Oder schreibe an die Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA.','<a href="' + ogs.getLink('http://www.gnu.org/licenses/gpl.html') + '" target="_blank">http://www.gnu.org/licenses/gpl.html</a>','<a href="' + ogs.getLink('http://www.gnu.de/gpl-ger.html') + '" target="_blank">http://www.gnu.de/gpl-ger.html</a>') + '</th></tr></table>';
		NeuTab.innerHTML = code;
		
		var NeuZeile = NeuTab.getElementsByTagName('table')[0].insertRow(1);
		var NeuZelle = ogs.dom.newElement('th', '');
		var NeuBtn = ogs.dom.newElement('input', '', 'type', 'button', 'value', txt('options','Zu den Einstellungen'));
		ogs.addEvent(NeuBtn,'click', ogs_setup_start, true);
		NeuZelle.appendChild(NeuBtn);
		NeuZeile.appendChild(NeuZelle);

		ContDivCtr.appendChild(NeuTab);
	}
	
	//-------------------------
	// ich weiß wo du warst ;)
	//-------------------------
	
	if (ogs.ogame.page == 'flottenversand')
	{
		var table = document.getElementById('content').getElementsByTagName('table');
		var endpos = null;;
		var startpos = null;
		
		if (table.length > 0)
		{
			table = table[0];
			if (table.rows[0].innerHTML.match(/class="{0,1}success"{0,1}/)) // nur updaten wenn angriff auch raus ging
			{
				for (i = 1; i < table.rows.length; i++)
				{
					endpos = table.rows[i].innerHTML.match(/\[([0-9]{1,2}:[0-9]{1,3}:[0-9]{1,2})\]/);
					
					if (endpos && startpos)
						break;
					else
						startpos = endpos;
					
					endpos = null;
				}
			}
		}
		
		if (endpos && startpos)
		{
			//speichern wenn start und end pos gefunden wurde und mit temp ubereinstimmen
			var temp = ogs.load('flotte_flugpos_temp');
			if (temp.length > 0 && temp.indexOf(endpos[1]+':') == 0)
				ogs.save('flotte_flugpos',temp);
			else
				ogs.save('flotte_flugpos','');
		}
		else 
			ogs.save('flotte_flugpos','');
		
		//temp pos loeschen
		ogs.save('flotte_flugpos_temp','');
	}
	
	if (ogs.ogame.page == 'flotten3')
	{
		//auswahl temp speichern um nachher zu entscheiden ob mond / plani / tf
		ogs.save('flotte_flugpos_temp', document.getElementsByName('galaxy')[0].value.trim() + ':' + document.getElementsByName('system')[0].value.trim() + ':' + document.getElementsByName('planet')[0].value.trim() + ':' + document.getElementsByName('planettype')[0].value.trim());
	}

	if (ogs.load('flotte_flugpos_enable'))
	{
		if (ogs.ogame.page == 'flotten2')
		{
			var pos = ogs.load('flotte_flugpos').split(':');
			
			if (pos.length == 4)
			{
				var tab = ogs.dom.getEBF(ContDiv,'table','width == 519');
				
				if (tab.length > 0)
				{
					var text = new Array('','Planet','TF','Mond');
					tab[0].insertRow(3);
					tab[0].rows[3].appendChild(document.createElement('th'));
					tab[0].rows[3].appendChild(document.createElement('th'));
					tab[0].rows[3].cells[0].innerHTML = txt('f_last_target','Letztes Ziel');
					tab[0].rows[3].cells[1].innerHTML = '<a href="javascript:setTarget('+pos[0]+','+pos[1]+','+pos[2]+','+pos[3]+'); shortInfo()">'+text[parseInt(pos[3])]+' ['+pos[0]+':'+pos[1]+':'+pos[2]+']</a>';
				}
			}
		}
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





















































/****************************************
* Funktionsabsatz - OGS Setup Funktionen
****************************************/

function ogs_setup_start()
{
	//wenn seite leer ist dann werte setzten
	if (ogs.neueseite.user == '')
	{
		ogs.neueseite.user = 'ogs_setup';
		ogs.neueseite.orginal = document.getElementById('content');
		ogs.neueseite.neu = ogs.neueseite.orginal.parentNode.insertBefore(ogs.neueseite.orginal.cloneNode(false), ogs.neueseite.orginal);
		
		ogs.neueseite.orginal.style.display = 'none';
	}
	else //die seite ist bereits offen oder eine andere! => exit
	{
		return;
	}
	
	var ogs_setup_save_text = new Array;
	var ogs_setup_save_textarea = new Array;
	var ogs_setup_save_zahl = new Array;
	var ogs_setup_save_zahl_min = new Array;
	var ogs_setup_save_zahl_max = new Array;
	var ogs_setup_save_yesno = new Array;
	var ogs_setup_save_color = new Array;
	var ogs_setup_save_option = new Array;
	var ogs_setup_save_listen = new Array;
	var ogs_setup_open = null;
	var hidestring = ''; 
	
	function ogs_setup_save()
	{
		//spezial save stuff
		var ogssavelanguage = document.getElementById('ogs_language');
		ogs.lang.cur = ogssavelanguage.options[ogssavelanguage.selectedIndex].value;
		ogs.array.dropElement(ogs.lang.all, ogs.ogame.serversprache, 0);
		ogs.lang.all.push(new Array(ogs.ogame.serversprache, ogs.lang.cur));
		ogs.save('ogs_language', ogs.array.join(ogs.lang.all,'|','&'));
		
		
		//ja nein
		for (var i = 0; i < ogs_setup_save_yesno.length; i++)
		{
			ogs.save(ogs_setup_save_yesno[i], document.getElementById('' + ogs_setup_save_yesno[i]).checked);
		}

		//farben
		for (var i = 0; i < ogs_setup_save_color.length; i++)
		{
			ogs.save(ogs_setup_save_color[i], (document.getElementById(ogs_setup_save_color[i]).value.toLowerCase() != 'transparent') ? ColorChk(document.getElementById(ogs_setup_save_color[i]).value) : 'transparent');
		}

		//text
		for (var i = 0; i < ogs_setup_save_text.length; i++)
		{
			var text = document.getElementById(ogs_setup_save_text[i]).value;
			if (text.length < 1) text = ''; //IE FIX
			ogs.save(ogs_setup_save_text[i], text);
		}

		//textarea
		for (var i = 0; i < ogs_setup_save_textarea.length; i++)
		{
			var text = ogs.getTextArea(document.getElementById(ogs_setup_save_textarea[i]));
			text = text.replace(/\n/g,'\\n'); //sicherstellen das keine zeilenumbrueche enthalten sind
			ogs.save(ogs_setup_save_textarea[i], text);
		}

		//zahlen
		for (var i = 0; i < ogs_setup_save_zahl.length; i++)
		{
			var x = parseInt(document.getElementByID(ogs_setup_save_zahl[i]).value);
			
			if (ogs_setup_save_zahl_min[i] != 0 || ogs_setup_save_zahl_max[i] != 0)
			{
				if (x < ogs_setup_save_zahl_min[i])
					x = ogs_setup_save_zahl_min[i];
			
				if (x > ogs_setup_save_zahl_max[i])
					x = ogs_setup_save_zahl_max[i];
			}
			
			ogs.save(ogs_setup_save_zahl[i],x);
		}

		//option
		for (var i = 0; i < ogs_setup_save_option.length; i++)
		{
			var thisoption = document.getElementById(ogs_setup_save_option[i]);
			ogs.save(ogs_setup_save_option[i], thisoption.options[thisoption.selectedIndex].value);
		}

		//listen
		for (var i = 0; i < ogs_setup_save_listen.length; i++)
		{
			eval(ogs_setup_save_listen[i]+'(0,0,5);');
		}

		// Speichern fertig
		window.alert(txt('setup_savetext','Einstellungen wurden erfolgreich gespeichert! Bitte beachte, dass die Einstellungen nur f'+ue+'r den aktuellen Account und den aktuellen Computer gelten und erst mit dem n'+ae+'chsten Seitenaufruf angezeigt werden.'));
		ogs_setup_close();
	}

	//functionen liste
	function ogs_reiter(id) // Dynamische Menues nach Code Badhard
	{
		//ein/ausblenden
		var kartei = document.getElementById('r' + id);
		if (kartei.style.display == 'none')
		{
			if (ogs_setup_open != null)
				ogs_setup_open.style.display = 'none';
			
			if (ogs.browser == 'ff')
			{
				kartei.style.display = 'table-row-group';
			}
			else
			{
				kartei.style.display = 'block';
			}
			ogs_setup_open = kartei;
		}
		else
		{
			kartei.style.display = 'none';
			ogs_setup_open = null;
		}
	}
	
	function ogs_block(id, main)
	{
		var ids = id.split(' ');
		
		for (var i = 0; i < ids.length; i++)
		{
			var row = document.getElementById(ids[i]);
			var haupt = document.getElementById(main);
			var hauptTR = document.getElementById(main+'1').style.display;
			
			if(!haupt.checked) 
			{
				row.style.display = 'none';
				if (!hauptTR)
				{
					var inputs = row.getElementsByTagName('input');
					
					if (inputs.length && inputs[0].type=='checkbox')
					{
						inputs[0].click();
						inputs[0].click();
					}
				}
			}
			else
			{
				if (ogs.browser == 'ff')
				{
					row.style.display = 'table-row';
				}
				else
				{
					row.style.display = 'block';
				}
				
				var inputs = row.getElementsByTagName('input');
				
				if (inputs.length && inputs[0].type=='checkbox')
				{
					inputs[0].click();
					inputs[0].click();
				}								
			}
		}
	}
	
	//functions zugänglich machen
	ogs.bound.reiter = ogs_reiter;
	ogs.bound.block = ogs_block;
	
	function createCheck(id, header, content)
	{
		//zum speichern eintragen
		ogs_setup_save_yesno.push(id);

		if (createCheck.arguments.length > 3)
		{
			if(!ogs.load(id))
				hidestring += createCheck.arguments[3] + ' ';
		}
		
		coder += '<tr id="'+id+'1"';

		if (hidestring.indexOf(id+'1')+1)
			coder += ' style="display: none;"';
		
		coder += '><th style="color: '+ogs.load('skriptcolor')+'">' + txt('sn_'+id,header)+'</th><th>' + txt('si_'+id,content) + '</th><th><input type="checkbox" id="' + id + '"';
		
		if (createCheck.arguments.length > 3)
		{
			coder += 'onclick="ogs.block(\u0027'+createCheck.arguments[3]+'\u0027,\u0027'+id+'\u0027)"';
		}
		
		if (ogs.load(id))
		{
			coder += ' checked';
		}
							
		coder += '></th></tr>';
	}
	
	function createEdit(id, header, content, size, maxlength, minv, maxv) 
	{
		//zum speichern eintragen
		if (typeof settingsdef[id] == 'int')
		{
			ogs_setup_save_zahl.push(id);
			ogs_setup_save_zahl_min.push(parseInt(minv, 10));
			ogs_setup_save_zahl_max.push(parseInt(maxv, 10));
		}
		else
		{
			ogs_setup_save_text.push(id);
		}
		
		coder += '<tr id="'+id+'1"';

		if (hidestring.indexOf(id)+1)
			coder += ' style="display: none;"';

		coder += '><th style="color: '+ogs.load('skriptcolor')+';">' + txt('sn_'+id,header)+'</th><th>' + txt('si_'+id,content) + '</th><th>';
		coder += '<input type="text" id="' + id + '" size="' + ((size) ? size : 10) + '" '
		
		if(maxlength) coder += 'maxlength="' + maxlength + '" '
			coder += 'value="' + ogs.load(id) + '"></th></tr>';
	}
	
	function createTextArea(id, header, content, cols, rows)
	{
		//zum speichern eintragen
		ogs_setup_save_textarea.push(id);
		
		coder += '<tr id="'+id+'1"';

		if (hidestring.indexOf(id)+1)
			coder += ' style="display: none;"';

		coder += '><th style="color: '+ogs.load('skriptcolor')+';">' + txt('sn_'+id,header)+'</th><th>' + txt('si_'+id,content) + '</th><th>';
		coder += '<textarea id="' + id + '" cols="'+cols+'" rows="'+rows+'"></textarea></th></tr>';
	}
	
	function createColTxt(id,header,content,transparent)
	{
		//zum speichern eintragen
		ogs_setup_save_color.push(id);
		
		//wenn text vorhanden ist absatz hinzufügen
		if (content != '') content += '<br />';
		
		coder += '<tr id="'+id+'1"';
		
		if (hidestring.indexOf(id)+1)
			coder += ' style="display: none;"';
		
		coder += '><th style="color: '+ogs.load('skriptcolor')+'">' + txt('sn_'+id,header)+'</th><th>' + txt('si_'+id,content) + AddColorSel(id,transparent) + '</th><th>';
		coder += '<input type="text" id="' + id + '" size="10" value="' + ogs.load(id) + '"></th></tr>';
	}

	// Farbpruefung ob gueltiger Wert
	function ColorChk(colnam)
	{
		// Farbumwandlung Hex->RGB mit Korrekturberechnung
		function ColorConv(colhex, lum, hlt)
		{
			if (colhex.match(/#[0-9A-Fa-f]/))
			{
				var c = new Array(3);
				lum = (lum) ? 1 : .66;
				hlt = (hlt == 1) ? 192 : ((hlt == 2) ? 128 : 0);
				
				for (var i = 0; i < 3; i++)
				{
					c[i] = colhex.substr((i * 2 + 1), 2);
					c[i] = (c[i]) ? c[i] : 0;
					c[i] = parseInt(c[i], 16) + hlt;
					c[i] = parseInt(((parseInt(c[i] / 255)) ? 255 : c[i]) * lum);
				}
				
				colhex = 'rgb(' + c[0] + ', ' + c[1] + ', ' + c[2] + ')';
			}
			else
			{
				colhex = 0;
			}
			
			return colhex;
		}
			
		if (!(ColorConv(colnam)))
		{
			var colids = new Array ('aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow', 'orange', 'midnightblue', 'indigo', 'crimson', 'deepskyblue');
			var colval = new Array ('00FFFF', '000000', '0000FF', 'FF00FF', '808080', '008000', '00FF00', '800000', '000080', '808000', '800080', 'FF0000', 'C0C0C0', '008080', 'FFFFFF', 'FFFF00', 'FFA500', '191970', '4B0082' ,'DC143C' ,'00BFFF');
			var colchk = '';
			
			for (var i = 0; i < colids.length; i++)
			{
				colchk += (colnam.toLowerCase() == colids[i]) ? colval[i] : '';
			}
			
			colnam = (colchk.length) ? '#' + colchk : '#7F7F7F';
		}
		
		return colnam.substr(0, 7).toUpperCase();
	}

	// Dropdownmenue fuer Farbwahl in Einstellungen
	function AddColorSel(colnam, transparent)
	{
		var colids = new Array ('aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow', 'orange', 'midnightblue', 'indigo', 'crimson', 'deepskyblue');
		var defcol = settingsdef[colnam];
		var curcol = ogs.load(colnam);
		var colchk = '(z.b. red, white, #FFCC00, ...)<br /><select style="color:' + ((curcol != 'transparent') ? curcol : '#3F3F3F') + ';" id="' + colnam + 'col" ';
		colchk += 'onchange="javascript: document.getElementById(\'' + colnam + '\').value = document.getElementById(\'' + colnam + 'col\').value; document.getElementById(\'' + colnam + 'col\').style.color = (document.getElementById(\'' + colnam + 'col\').value != \'transparent\') ? document.getElementById(\'' + colnam + 'col\').value : \'#3F3F3F\';">';
		colchk += '<option style="color:' + ((curcol != 'transparent') ? curcol : '#3F3F3F') + ';" value="' + curcol + '">Farbe</option>';
		
		for (var i = 0; i < colids.length; i++)
		{
			colchk += '<option style="color:' + colids[i] + '; background-color:#3F3F3F;" value ="' + colids[i] + '">' + colids[i] + '</option>';
		}
		
		if (transparent)
		{
			colchk += '<option style="color:#3F3F3F; background-color:#7F7F7F;" value ="transparent">transparent</option>';
		}
		
		colchk += '<option style="color:' + defcol + ';" value ="' + defcol + '">Default</option>';
		return colchk + '</select>';
	}

	function createOption(id, header, content, list, selectedindex, dontsaveme)
	{
		//zum speichern eintragen
		if (dontsaveme != true)
			ogs_setup_save_option.push(id);
		
		coder += '<tr id="'+id+'1"';

		if (hidestring.indexOf(id)+1)
			coder += ' style="display: none;"';

		coder += '><th style="color: '+ogs.load('skriptcolor')+'">' + txt('sn_'+id,header)+'</th><th>' + txt('si_'+id,content) + '</th><th>';
		coder += '<select id="'+id+'">';
		
		for (var i = 0; i < list.length; i += 2)
		{
			coder += '<option value="' + list[i] + '"';
			
			if (i / 2 == parseInt(selectedindex, 10))
			{
				coder += ' selected';
			}
			
			coder += '>';
			coder += list[i+1] + '</option>';
		}
		
		coder += '</select></th></tr>';
	}
	
	function createHeader(id,header, body)
	{
		HID++;
		var code = '';
		codel += '<tr><th><center><a href="#" onclick="ogs.reiter(' + HID + ')">' + txt('sh_'+id,header) + '</a></center></th></tr>';
		coder += '<tbody id="r' + HID + '" style="display: none;">';
		coder += '<tr><th colspan="3"><b><u>' + txt('sh_'+id,header) + '</u></b><br /><br />' + txt('sp_'+id,body) + '</th></tr>';
	}
			
	function createHeaderCloser()
	{
		coder += '</tbody>';
	}		
	
	function createList(id, bindit, liste, listheader, functionname, nodel)
	{
		var retstr = ''
		
		if (bindit == false)
		{
			retstr = '<tr id="'+id+'1"';
			
			if (hidestring.indexOf(id)+1)
				retstr += ' style="display: none;"';
				
			retstr += '>';
			
			//zum speichern eintragen
			ogs_setup_save_listen.push(functionname);
		}
		
		retstr += '<th colspan="3"><center><table><tr>';
		
		for (var i = 0; i < listheader.length; i++)
		{
			retstr += '<th align="center" style="color: '+ogs.load('skriptcolor')+';">'+listheader[i]+'</th>';
		}
		
		if (nodel != true)
			retstr += '<th align="center" style="color: '+ogs.load('skriptcolor')+';">'+txt('sl_del_t','L&ouml;schen')+'</th>';
		
		retstr += '</tr>';
		
		for (var i = 0; i < liste.length; i++)
		{
			retstr += '<tr>';
			var ueberschrift = false;

			for (var j = 0; j < liste[i].length; j++)
			{
				if (liste[i].length < listheader.length)
				{
					if (nodel != true)
					{
						retstr += '<th colspan="' + (listheader.length + 1) + '"><font style="font-size: larger;">' + eval(functionname+'('+ j + ',' + i + ',6);') + '</font></th>';
					}
					else
					{
						retstr += '<th align="left" colspan="' + (listheader.length) + '"><font style="font-size: larger;">' + eval(functionname+'('+ j + ',' + i + ',6);') + '</font></th>';
					}
					
					ueberschrift = true;
					break; // aus schleife raus
				}
				else
				{
					retstr += '<th align="center" onclick="' + functionname + '(' + j + ',' + i + ',1);"><a href="javascript: return true;">' + eval(functionname+'('+ j + ',' + i + ',0);') + '</a></th>';
				}
			}
			
			if (nodel != true && ueberschrift == false)
				retstr += '<th align="center" onclick="' + functionname + '(' + j + ',' + i + ',4);"><a href="#">'+txt('sl_del','&lt;Entf&gt;')+'</a></th>';
			
			retstr += '</tr>';
		}
		
		if (nodel != true)
		{
			retstr += '<tr><th colspan="' + listheader.length + '" /><th align="center">';
			retstr += '<a href="#" onclick="' + functionname + '(0,0,3)">'+txt('sl_new','&lt;Neu&gt;')+'</a></th></tr>';
		}
		
		retstr += '</table></center></th>';
		
		if (bindit == false)
		{
			retstr += '</tr>';
			coder += retstr;
		}
		else
		{
			//IETODO
			document.getElementById(id+'1').innerHTML = retstr;
		}
	}
	
	function ogs_menu_link_liste(id,val,mode)
	{
		/* mode:
		0 = anzeigen
		1 = editieren
		2 = wert zuweisen
		3 = neu
		4 = löschen
		5 = speichern
		6 = kopfzeile
		*/
		var text;
		
		if (mode == 0) //anzeigefunktionen
		{
			return ogs_menulinkliste[val][id];
		}

		if (mode == 1) //edit funktionen
		{
			text = txt('sld_m',new Array('Wert eingeben:'));
			var w1 = prompt(text[0], ogs_menulinkliste[val][id]);
			w1 = w1.replace(/&/g,'%26');
			w1 = w1.replace(/|/g,'');
			
			if (w1 != null)
				ogs_menulinkliste[val][id] = w1;
			
			createList('menu_link_liste',true, ogs_menulinkliste, txt('sli_m',new Array('Name','URL')),'ogs.menu_link_liste');
			return;
		}
		
		if (mode == 2) return;
		
		if (mode == 3) //neues element
		{
			text = txt('sln_m', new Array('Ogame','http://www.ogame.de/'));
			var w1 = text[0];
			var w2 = text[1];
			ogs_menulinkliste.push(new Array(w1,w2));
			
			createList('menu_link_liste',true, ogs_menulinkliste, txt('sli_m',new Array('Name','URL')),'ogs.menu_link_liste');
			return;
		}
		
		if (mode == 4) //löschen
		{
			ogs_menulinkliste.splice(val,1);

			createList('menu_link_liste',true, ogs_menulinkliste, txt('sli_m',new Array('Name','URL')),'ogs.menu_link_liste');
			return;
		}
		
		if (mode == 5) //speicherfunktion
		{
			window.setTimeout(function(){ogs.save('menu_link_liste',ogs.array.join(ogs_menulinkliste,'|','&'))},0);
			return;
		}

		if (mode == 6) return ''; //kopfzeile
	}
	
	function ogs_ally_farblist(id,val,mode,wert)
	{
		/* mode:
		0 = anzeigen
		1 = editieren
		2 = wert zuweisen
		3 = neu
		4 = löschen
		5 = speichern
		6 = kopfzeile
		*/
		var text;
		
		if (mode == 0) // anzeigen
		{
			if(id == 0) return ogs_allyfarbliste[val][id].replace(/,/g,'<br />');
			if(id == 1)
			{
				text = txt('sld_ac_1',new Array('Spieler','Allianz'));
				if (ogs_allyfarbliste[val][id] == 1) return text[1];
				return text[0];
			}
			return '<font color="'+ogs_allyfarbliste[val][id]+'">'+ogs_allyfarbliste[val][id]+'</font>'+ creatFarbSelecterOverLibCreator('ogs.ally_farblist',val,id);
		}
		
		if (mode == 1) // editieren
		{
			if (id == 0)
			{
				text = txt('sld_ac_0',new Array('Wert eingeben:\nz.B. "Spieler1,Spieler2,Spieler3"'));
				var w1 = prompt(text[0], ogs_allyfarbliste[val][id]);
				w1 = w1.replace(/&/g,'');
				w1 = w1.replace(/\|/g,'');
				
				if (w1 != null) ogs_allyfarbliste[val][id] = w1;
			}
			else if (id == 1)
			{
				if (ogs_allyfarbliste[val][1] == 1)
					ogs_allyfarbliste[val][1] = 0;
				else
					ogs_allyfarbliste[val][1] = 1;
			}
			else if (id == 2)
			{
				text = txt('sld_ac_2',new Array('Farbwert eingeben:\nz.B. "#ff0000" oder "red"'));
				var w1 = prompt(text[0], ogs_allyfarbliste[val][id]);
				w1 = w1.replace(/&/g,'');
				w1 = w1.replace(/\|/g,'');
				
				if (w1 != null) ogs_allyfarbliste[val][id] = w1;
			}
			
			createList('gala_ally_spieler_farben',true, ogs_allyfarbliste, txt('sli_ac',new Array('Name','Ally/Spieler','Farbe')),'ogs.ally_farblist');
			return;
		}
		
		if (mode == 2) // wert zuweisen
		{
			ogs_allyfarbliste[val][id] = wert;
			
			createList('gala_ally_spieler_farben',true, ogs_allyfarbliste, txt('sli_ac',new Array('Name','Ally/Spieler','Farbe')),'ogs.ally_farblist');
			return;
		}
		
		if (mode == 3) // neu
		{
			text = txt('sln_ac', new Array('Neu'));
			var w1 = text[0];
			var w2 = 1;
			var w3 = '#ff0000';
			
			ogs_allyfarbliste.push(new Array(w1,w2,w3));

			createList('gala_ally_spieler_farben',true, ogs_allyfarbliste, txt('sli_ac',new Array('Name','Ally/Spieler','Farbe')),'ogs.ally_farblist');
			return;
		}
		
		if (mode == 4) //löschen
		{
			ogs_allyfarbliste.splice(val,1);
			
			createList('gala_ally_spieler_farben',true, ogs_allyfarbliste, txt('sli_ac',new Array('Name','Ally/Spieler','Farbe')),'ogs.ally_farblist');
			return;
		}
		
		if (mode == 5) //speichernfunktion
		{
			window.setTimeout(function(){ogs.save('gala_ally_spieler_farben',ogs.array.join(ogs_allyfarbliste,'|','&'))},0);
			return;
		}

		if (mode == 6) return ''; //kopfzeile
	}
	
	function ogs_flottenfarbenfunc(id,val,mode,wert)
	{
		/* mode:
		0 = anzeigen
		1 = editieren
		2 = wert zuweisen
		3 = neu
		4 = löschen
		5 = speichern
		6 = kopfzeile
		*/
		var text;
		
		if (mode == 0) // anzeigen
		{
			if(id == 0)
			{
				text = txt('sld_fc_0',new Array('Eigen','Fremd'));
				
				if (ogs_flottenfarben[val][id].indexOf('own') == 0) return text[0];
				
				return text[1];
			}
			if(id == 1)
			{
				text = txt('sld_fc_1',new Array('Hin','R&uuml;ck','Halt'));
				
				if (ogs_flottenfarben[val][id] == 0) return text[0];
				if (ogs_flottenfarben[val][id] == 1) return text[1];
				return text[2];
			}
			if(id == 2 || id == 7)
				return '<font color="'+ogs_flottenfarben[val][id]+'">'+ogs_flottenfarben[val][id]+'</font>'+ creatFarbSelecterOverLibCreator('ogs.flottenfarbenfunc',val,id);
			if (id == 3)
			{
				text = txt('sld_fc_3',new Array('normal','italic'));
				
				if (ogs_flottenfarben[val][3] == 0) return '<font style="font-style: normal;">'+text[0]+'</font>';
				return '<font style="font-style: italic;">'+text[1]+'</font>';
			}
			if (id == 4)
			{
				text = txt('sld_fc_4',new Array('normal','gro&szlig;','klein'));
				
				if (ogs_flottenfarben[val][4] == 0) return '<font style="text-transform: none;">'+text[0]+'</font>';
				if (ogs_flottenfarben[val][4] == 1) return '<font style="text-transform: uppercase;">'+text[1]+'</font>';
				return '<font style="text-transform: lowercase;">'+text[2]+'</font>';
			}
			if (id == 5)
			{
				text = txt('sld_fc_5',new Array('normal','unter','&uuml;ber','durch','blinken'));
				
				if (ogs_flottenfarben[val][5] == 0) return '<font style="text-decoration: none;">'+text[0]+'</font>';
				if (ogs_flottenfarben[val][5] == 1) return '<font style="text-decoration: underline;">'+text[1]+'</font>';
				if (ogs_flottenfarben[val][5] == 2) return '<font style="text-decoration: overline;">'+text[2]+'</font>';
				if (ogs_flottenfarben[val][5] == 3) return '<font style="text-decoration: line-through;">'+text[3]+'</font>';
				return '<font style="text-decoration: blink;">'+text[4]+'</font>';
			}
			if (id == 6)
			{
				text = txt('sld_fc_6',new Array('0','+','-'));
				
				if (ogs_flottenfarben[val][6] == 0)
					return text[0];
				if (ogs_flottenfarben[val][6] == 1)
					return text[1];
				return text[2];
			}
		}
		
		if (mode == 1) // editieren
		{
			if (id == 0 || id == 1)
			{
				//nix
			}
			else if (id == 2 || id == 7)
			{
				text = txt('sld_fc_2',new Array('Wert eingeben:'));
				var w1 = prompt(text[0], ogs_flottenfarben[val][id]);
				if (w1 == null) return;
				w1 = w1.replace(/&/g,'');
				w1 = w1.replace(/\|/g,'');
				ogs_flottenfarben[val][id] = w1;
			}
			else if (id == 3)
			{
				ogs_flottenfarben[val][3]++;
				if (ogs_flottenfarben[val][3] > 1) ogs_flottenfarben[val][3] = 0;
			}
			else if (id == 4)
			{
				ogs_flottenfarben[val][4]++;
				if (ogs_flottenfarben[val][4] > 2) ogs_flottenfarben[val][4] = 0;
			}
			else if (id == 5)
			{
				ogs_flottenfarben[val][5]++;
				if (ogs_flottenfarben[val][5] > 4) ogs_flottenfarben[val][5] = 0;
			}
			else if (id == 6)
			{
				ogs_flottenfarben[val][6]++;
				if (ogs_flottenfarben[val][6] > 2) ogs_flottenfarben[val][6] = 0;
			}
			
			var te = document.getElementById('test_flotten_farben1').getElementsByTagName('table');
			te = te[0].getElementsByTagName('tr');
			te[val+1].getElementsByTagName('th')[id].innerHTML = '<a href="javascript: return true;">' + ogs.flottenfarbenfunc(id,val,0) + '</a>';
			return;
		}
		
		if (mode == 2) // wert zuweisen
		{
			ogs_flottenfarben[val][id] = wert;
			
			var te = document.getElementById('test_flotten_farben1').getElementsByTagName('table');
			te = te[0].getElementsByTagName('tr');
			te[val+1].getElementsByTagName('th')[id].innerHTML = '<a href="javascript: return true;">' + ogs.flottenfarbenfunc(id,val,0) + '</a>';
			return;
		}
		
		if (mode == 3) return; //neu
		if (mode == 4) return; //löschen
		
		if (mode == 5) //speichernfunktion
		{
			window.setTimeout(function(){ogs.save('uebersicht_flotten_farben',ogs.array.join(ogs_flottenfarben,'|','&'))},0);
			return;
		}
		
		if (mode == 6) //kopfzeile
		{
			return txt('slh_fc',new Array('Spionage','Transport + Expeditionen','Tf Abbau','Stationieren','Halten','Angriff','Verbandsangriff','Mondzerst\u00F6ren','IP Raketen','Kolonisieren','Phalanx'))[ogs_flottenfarben[val][id]];
		}
	}
	
	ogs.bind('menu_link_liste',ogs_menu_link_liste);
	ogs.bind('ally_farblist',ogs_ally_farblist);
	ogs.bind('flottenfarbenfunc',ogs_flottenfarbenfunc);
	ogs.bind('creatFarbSelecterOverLib',creatFarbSelecterOverLib);
		
	function creatFarbSelecterOverLibCreator(func, val, id)
	{
		var ret = '<a href="#" onmouseout="return nd();"';
		ret += ' onmouseover="eval(&quot;overlib(  eval(\\\'ogs.creatFarbSelecterOverLib(\\&quot;' + func + '\\&quot;,' + val + ',' + id + ')\\\')  , STICKY, MOUSEOFF, DELAY, 500, CENTER, OFFSETY, -40)&quot;)">*</a>';
		return ret;
	}
	
	function creatFarbSelecterOverLib(func, val, id)
	{
		var ret = '<center><table><colgroup>';
		for (var i = 0; i < 8; i++)
			ret += '<col width=\'20\'>';
		ret += '</colgroup>';
		
		var tfarb = Array('00','55','aa','ff');
		
		for (var i1 = 0; i1 < 4; i1++)
		{
			for (var i2 = 0; i2 < 4; i2++)
			{
				if (i2 == 0 || i2 == 2)
					ret += '<tr>';
				
				for (var i3 = 0; i3 < 4; i3++)
				{
					ret += '<td onclick=\'' + func + '(' + id + ',' + val + ',2,' + '&quot;#'+ tfarb[i1] + tfarb[i2] + tfarb[i3] +'&quot;); nd();\' style=\'background-color: #' + tfarb[i1] + tfarb[i2] + tfarb[i3] + '; background-image: none;\'>&nbsp;</td>';
				}
				
				if (i2 == 1 || i2 == 3)
					ret += '</tr>';
			}
		}
		
		ret += '</table></center>';
		return ret;
	}
	
	function ogs_updatesuche()
	{
		function versiontext(nr)
		{
			return (Math.floor(nr / 10000)) + '.' + (Math.floor(nr / 100) % 100) + ' - Rev #' + (nr % 100);
		}
		
		function getversioninfo(v, nv, tlang, dtext)
		{
			if (v >= nv)
				return txt(tlang,dtext,'<span style="color: green;">'+txt('setup_update_5','Kein Update vorhanden')+'</span>') + '<br />';
			else
				return txt(tlang,dtext,'<a href="' + ogs.getLink(ogs.homepage) + '" target="_blank" style="text-decoration: blink; color: red;">'+txt('setup_update_6','Update: #*1*#',versiontext(nv)) + '</a>') + '<br />';
		}
		
		var version = ogs.load('version');
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.ogame-skript.com/data/update.php?version=' + version + '&lang=' + ogs.ogame.serversprache,
			onload: function(responseDetails)
			{
				var code = '<br />'+txt('setup_update_1','Die Updatesuche ergab:')+'<br /><br />';
				
				if (responseDetails.status == 200)
				{
					var version_gm = responseDetails.responseText.match(/\<div id=\"version_gm\"\>(\d*)\<\/div\>/)[1];
					var version_xp = responseDetails.responseText.match(/\<div id=\"version_xp\"\>(\d*)\<\/div\>/)[1];
					var version_ie = responseDetails.responseText.match(/\<div id=\"version_ie\"\>(\d*)\<\/div\>/)[1];

					code += getversioninfo(version,version_gm,'setup_update_2','GM Version: #*1*#');
					code += getversioninfo(version,version_xp,'setup_update_3','XPI Version: #*1*#');
					code += getversioninfo(version,version_ie,'setup_update_4','IE Version: #*1*#');
				}
				else
				{
					code += '<span style="color: red;">'+txt('setup_update_7','Es konnten keine Versionsinfos abgerufen werden.')+'</span>';
				}
				
				document.getElementById('ogs_update_result').innerHTML = code;
			}	
		});
	}
	
	ogs.bound.updatesuche = function()
	{
		window.setTimeout(ogs_updatesuche, 0);
	};
	
	var HID = 0;
	var code = '';
	var codel = '';
	var coder = '';
	
	// Loginscreen
	coder += '<tbody id="r0" style="display: none;">';
	coder += '<tr><th colspan="3"><b><u>'+txt('setup_wellcome_1','Willkommen im OGS Setup')+'</u></b>';
	coder += '<br /><br />'+txt('setup_wellcome_2','Hier hast du die M&ouml;glichkeit alle Einstellungen am OGS vorzunehmen. W&auml;hle dazu einfach einen der Men&uuml;punkte aus und passe dann das OGS deinen W&uuml;nschen an. Um diese &Auml;nderungen dauerhaft zu speichern kann es mit unter vonn&ouml;ten sein (nach dem Bet&auml;tigen der "Speichern"-Schaltfl&auml;che) den Webbrowser neuzustarten.');
	coder += '<br /><br />'+txt('setup_wellcome_3','Zurzeit ist Version: "#*1*#" installiert.',ogs.version());
	coder += '<br /><br /></tr><tr><th colspan="3"><br /><a href="javascript:ogs.updatesuche();">'+txt('setup_wellcome_4','Update suchen')+'</a><br /><div id="ogs_update_result"></div><br />';
	coder += '</th></tr>';
	createHeaderCloser();
	
	// Allgemein Config
	createHeader('all','Allgemein', 'Auf dieser Seite kannst du allgemeine Einstellungen f&uuml;r das OGS vornehmen.');
	var list = new Array;
	var selected = 0;
	
	list.push('de'); list.push('Deutsch');
	for(lng in ogs.lang.data)
	{
		list.push(ogs.lang.data[lng]['id']);
		list.push(ogs.lang.data[lng]['name']);
		
		if (ogs.lang.cur == ogs.lang.data[lng]['id'])
		{
			selected = 1+parseInt(lng,10);
		}
	}
	createOption('ogs_language','Sprache','',list,selected,true);

	createEdit('uni_speed','Speed','Geschwindigkeit des Universums',3,3,1,5);
	createColTxt('skriptcolor','Skriptfarbe','Textfarbe f&uuml;r die eingef&uuml;gten Skripterweiterungen');
	createEdit('max_tab_breite','Tabellenbreite','Maximale Breite der Tabellen in Pixeln (zwischen 520 und 2.000)',5,4,520,2000);
	createCheck('head_fix','Kopfzeile-Fix','Fixiert die Kopfzeile so das sie immer Sichtbar bleibt');
	createCheck('res_timer','Res Timer','Zeigt die Res in der Kopfzeile in Echtzeit an');
	createCheck('endzeiten','Endzeiten','Endzeiten anzeigen (Bauende, Flottenankunft, etc.)');
	createColTxt('color_met','Metall','Textfarbe f&uuml;r Metall');
	createColTxt('color_kris','Kristall','Textfarbe f&uuml;r Kristall');
	createColTxt('color_deut','Deuterium','Textfarbe f&uuml;r Deuterium');
	createColTxt('color_eng','Energie','Textfarbe f&uuml;r Energie');
	createEdit('zeitverschiebung','Zeitverschiebung','Zeitverschiebung in Minuten die durch z.B. andere Zeitzonen n&ouml;tig wird.',5,5);
	createCheck('zeitverschiebung_auto','Auto Zeitverschiebung','Automatisch erkennen wenn die Zeitverschiebung nicht richtig eingestellt ist.');
	createCheck('galaxietool','Galaxietool<br />Support','Diese Option erstellt ein unsichtbares Duplikat der Statistik und Galaxieansicht f&uuml;r das Galaxietool (aktiviert diese Option nur wenn ihr Probleme mit dem Galaxietool habt, andere Skripte ausser dem OGS werden dann mit unter aber nichtmehr angezeigt, da sie nur auf die unsichtbaren Tabellen wirken und damit ebenfalls zu Problemen mit dem Galaxietool f&uuml;ren k&ouml;nnen).');
	createCheck('hintergrundbild_use', 'Hintergrundbild &auml;ndern?','<u>Achtung:</u> Die Webseite von der ihr das Hintergrundbild benutzt kann eure Session ID auslesen.','hintergrundbild_url1');
	createEdit('hintergrundbild_url','URL','"none" oder die Zeile leer lassen l&ouml;scht das aktuelle Hintergrundbild, alle anderen Angaben werden als URL zu einen Bild interpretiert.',15);
	createHeaderCloser();
	
	// übersicht Config
	createHeader('over','&Uuml;bersicht', 'Mit diesen Optionen kannst du das Aussehen der &Uuml;bersichsseite bearbeiten.');
	createCheck('zeit_links','Zeit links','Angenommene Serverzeit &uuml;ber dem linken Men&uuml; anzeigen');
	createCheck('ang_zeit','RT Uhr','Angenommene Serverzeit in der &Uuml;bersicht anzeigen (automatisch unterdr&uuml;ckt, wenn Serverzeit &uuml;ber dem linken Men&uuml; angezeigt wird)');
	createCheck('bewegteress','bewegte Ressourcen','&Uuml;bersicht der bewegten Ressourcen anzeigen');
	createCheck('handelsrechner','Handelsrechner','Handelsrechner anzeigen','kursmet1 kurskris1 kursdeut1');
	createEdit('kursmet','','Metall',3,3);
	createEdit('kurskris','','Kristall',3,3);
	createEdit('kursdeut','','Deuterium',3,3);
	var list = new Array;
	list.push('0'); list.push('Ogame Standard');
	list.push('1'); list.push('Liste + Bild');
	list.push('2'); list.push('Nur Liste');
	createOption('overview_planetenliste','Planetenliste','Ver&auml;ndert die Liste mit den Planetenbilder.',list,ogs.load('overview_planetenliste'));
	createHeaderCloser();
	
	// Imperiumseite Config
	createHeader('imp','Imperium', 'Mit diesen Optionen kannst du das Aussehen der Imperiumsseite bearbeiten.');
	createCheck('imperium_calc_resis','Imperiumsinfo','Zusatztexte und Informationen in der Imperiums&uuml;bersicht anzeigen','imperium_kosten1');
	createCheck('imperium_kosten','Kosten Anzeigen','Zeigt die Kosten f&uuml;r die n&auml;chste Geb&auml;udestufe an.');
	createCheck('imperium_pic_change','Bilder bearbeiten','&Auml;ndert die Gr&ouml;&szlig;e der Bilder.','imperium_pic_abstand1 imperium_pic_x1 imperium_pic_y1');
	createEdit('imperium_pic_abstand','Abstand','Abstand zum Zellenrand (20 = Grundeinstellung)',3,3,0,30);
	createEdit('imperium_pic_x','Bildbreite','(75 = Grundeinstellung)',3,3,0,200);
	createEdit('imperium_pic_y','Bildh&ouml;he','(71 = Grundeinstellung)',3,3,0,200);
	createHeaderCloser();
	
	// Bauseiten Config
	createHeader('build','Bauseiten', 'Mit diesen Optionen kannst du das Aussehen der Bauseiten (Geb&auml;ude, Schiffswerft, Forschung und Verteidigung) bearbeiten.');
	createCheck('building_info','Infos','Zus&auml;tzliche Informationen per Tooltip auf den Bauseiten.');
	createCheck('transbuild','Ben&ouml;tigte Transporter','Minimalanzahl an Transportern f&uuml;r die zum Bau ben&ouml;tigten Ressourcen anzeigen');
	createCheck('building_energie','Energieverbrauch','Zus&auml;tzlicher Energieverbrauch bei Minen und die zus&auml;tzliche Produktion bei Kraftwerken anzeigen.');
	createCheck('colored_ress','eingef&auml;rbte Ressourcen','Die ben&ouml;tigten Ressourcen f&uuml;r die Konstruktionen werden eingef&auml;rbt');
	createCheck('building_klein','kleine Bauseiten','Bauseiten verkleinern','building_klein_pics_size1');
	createEdit('building_klein_pics_size','Bildergr&ouml;&szlig;e','Gr&ouml;&szlig;e der verkleinerten Bilder auf den Bauseiten in Pixel (z.b. 60, 120, ...)',4,3);
	createCheck('building_bg','gef&auml;rbte Bauseiten','Bauseiten umf&auml;rben','building_bg_col11 building_bg_col21');
	createColTxt('building_bg_col1','Zellenfarbe','Hintergrundfarbe f&uuml;r die Tabellen',true);
	createColTxt('building_bg_col2','Rahmenfarbe','Rahmenfarbe f&uuml;r die Tabellen',true);
	createCheck('building_nopics','Bilder l&ouml;schen','L&ouml;scht die Bilder.');
	createCheck('building_doppelzeilen','Doppelzeile','Zeigt in jeder Zeile nicht nur Element an sondern zwei (z.B. Metall- und Kristallmine in einer Zeile)');
	createCheck('building_reichweite','Reichweite','Zeigt die Reichweite von der Sensorphalanx und den Interplanetarraketen auf den Geb&auml;udeseiten an.');
	createHeaderCloser();
	
	// Flottenseite Config
	createHeader('fleet','Flotte', 'Mit diesen Optionen kannst du das Aussehen der Flottenseiten bearbeiten.');
	createCheck('fltmenu_buttons','Flottenbuttons','Weitere Schaltfl&auml;chen (zum Default Planeten / Partner und Optionen beim Ressourcen einladen) im Flottenmen&uuml; anzeigen', 'warnung1');
	createCheck('warnung','Warnungen','Warnungen ausschalten');
	createCheck('ankft_zeit','Ankunftszeit','Weitere Zeitinformationen (R&uuml;ckkehrzeit bei Abbruch, Ankunftszeit der Flotte in der Zielauswahl) anzeigen');
	createCheck('auto_auftrag','Auto-Auftrag','Automatisch einen sinnvollen Auftrag beim Flottenverschicken ausw&auml;hlen','stationieren_vorz1');
	createCheck('stationieren_vorz','Station vorziehen','Bei der Auftragsauswahl im Flottenmen&uuml; den Auftrag Stationieren dem Transportieren vorziehen');
	
	ogs.load('def_plani');
	var list = new Array;
	var selected = 0;
	
	for (var i = 1; i < ogs.planetliste.length; i++)  // Ueber alle Planeten
	{
		list.push(ogs.planetliste[i]['ID']);
		
		if (ogs.planetliste[i]['ID'] == ((settingscur['def_plani'] > 0) ? settingscur['def_plani'] : ogs.ogame.hpid))
		{
			selected = i-1;
		}
		
		if (ogs.planetliste[i]['Typ'] == ogs.planettype.mond)
			list.push(' - ' + ogs.planetliste[i]['Name']);
		else
			list.push(ogs.planetliste[i]['Name']);
	}
	//nur anzeigen wenn planiliste existiert (also in gala ansicht nicht anzeigen)
	if (ogs.planetliste != 0) createOption('def_plani','Default-Planet','Default-Plani (f&uuml;r den Button im Flottenmen&uuml; und die &Uuml;bersicht)',list,selected);
	createCheck('kein_deut','Kein Deut','Bei Buttons im Flottenmen&uuml; Deuterium <i>nicht</i> beachten');
	createCheck('flotte_seite2_combobox','Comboboxen','Tauscht die Comboboxen zur Auswahl der Geschwindigtkeit und Planet / Mond / TF gegen Buttons aus');
	createCheck('flotte_seite1_upsidedown','Upside Down','Die verschickbare Flotte erscheint oben');
	createCheck('flotte_seite2_tfwahl','Rec => TF','Wenn Recycler in Flotte verhanden, TF als Ziel vorausw&auml;hlen.');
	createCheck('flotte_schiffauswahl','Schiffauswahl','Zeigt die ausgew&auml;hlten Schiffe auf der zweiten und dritten Flottenseite an.');
	createCheck('flotte_seite3_zeiten','Zeiten','Zeigt Flugdauer, Ankunft am Ziel / Ursprung auf der 3 Flottenseite an.');
	createCheck('flotte_seite2_shortlinks','Shortlinks','Shortlinks der zweiten Flottenseite &uuml;berarbeiten und sortieren.','flotte_seite2_shortlinks_a1 flotte_seite2_shortlinks_p1');
	createColTxt('flotte_seite2_shortlinks_a','Aktive Farbe','Farbe f&uuml;r den aktiven Planten / Mond');
	createColTxt('flotte_seite2_shortlinks_p','Passive Farbe','Farbe f&uuml;r die Zeile des aktiven Planten / Mond');
	createCheck('flotte_flugpos_enable','Flugpos','Ermittelt die letzte angeflogene Position und bietet sie auf Flottenseite 2 als Auswahl an.');
	createHeaderCloser();
	
	// Techseite Config
	createHeader('tech','Technik', 'Mit diesen Optionen kannst du das Aussehen der Technikseite bearbeiten.');
	createCheck('tech_info','Infos','Zus&auml;tzliche Informationen per Tooltip was die jeweilige Forschungsstufe erm&ouml;glicht zu bauen.');
	createCheck('techtree_pics','Bilder hinzuf&uuml;gen','Bilder hinzuf&uuml;gen','techtree_pics_size1');
	createEdit('techtree_pics_size','Bildergr&ouml;&szlig;e','Gr&ouml;&szlig;e der Bilder auf den Technikseite in Pixel (z.b. 60, 120, ...)',4,3);
	createCheck('techtree_bg','gef&auml;rbte Technikseite','Technikseite umf&auml;rben','techtree_bg_col11 techtree_bg_col21');
	createColTxt('techtree_bg_col1','Zellenfarbe','Hintergrundfarbe f&uuml;r die Technikseitentabelle',true);
	createColTxt('techtree_bg_col2','Rahmenfarbe','Rahmenfarbe f&uuml;r die Technikseitentabelle',true);
	createCheck('techtree_doppelzeilen','Doppelzeile','Zeigt in jeder Zeile nicht nur Element an sondern zwei (z.B. Metall- und Kristallmine in einer Zeile)');
	createHeaderCloser();
	
	// Galaxie Config
	createHeader('gala','Galaxie', 'Mit diesen Optionen kannst du das Aussehen der Galaxieansicht bearbeiten.');
	createEdit('tf_limit','TF-Limit','TF-Limit (Diese Gr&ouml;&szlig;e muss ein TF mindestens haben damit es als Text angezeigt wird. -1 deaktiviert die Ausgabe als Text vollst&auml;ndig)');
	createColTxt('tf_color','TF-Farbe','Farbe f&uuml;r den Rahmen um die TFs',true);
	createCheck('platz_anzeige','Spielerplatzierungen','Platzierung der Spieler direkt in der Galaxie-Ansicht anzeigen');
	createCheck('allyplatz_anzeige','Allyplatzierungen','Platzierung der Ally direkt in der Galaxie-Ansicht anzeigen');
	
	createCheck('gala_iprak_aktiv','IPR Auswahl','Automatische Auswahl f&uuml;r Interplanetarraketen','gala_iprak_wert1 gala_iprak_max1');
	var list = new Array;
	var listtext = txt('sx_ip_target',new Array('Alle','Raketenwerfer', 'Leichtes Lasergesch' + ue + 'tz', 'Schweres Lasergesch' + ue + 'tz', 'Gau' + sz + 'kanone', 'Ionengesch' + ue + 'tz', 'Plasmawerfer', 'Kleine Schildkuppel', 'Gro' + sz + 'e Schildkuppel'));
	
	for (var i = 0; i < 9; i++)
	{
		list.push(i.toString()); list.push(listtext[i]);
	}
	createOption('gala_iprak_wert','','Raketenziel',list,ogs.load('gala_iprak_wert'));
	createCheck('gala_iprak_max','','Raketenanzahl auf Maximalwert einstellen.');
	createHeaderCloser();

	// Nachrichten Config
	createHeader('news','Nachrichten', 'Mit diesen Optionen kannst du das Aussehen der Nachrichtenseite bearbeiten.');
	createCheck('spio','Spioberichte erweitern','Spionageberichte mit Infotext und Link zu Kampfsims erweitern');

	createCheck('news_expo_aktiv','Expo','Farblich umranden','news_expo_farbe1');
	createColTxt('news_expo_farbe','Farbe','',true);
	createCheck('news_pm_aktiv','Nachrichten','Farblich umranden','news_pm_farbe1');
	createColTxt('news_pm_farbe','Farbe','',true);
	createCheck('news_am_aktiv','Allynachrichten','Farblich umranden','news_am_farbe1');
	createColTxt('news_am_farbe','Farbe','',true);
	createCheck('news_color_res','Resourcenf&auml;rben','F&auml;rbt die Resourcen ein');
	createCheck('news_deletemessages','L&ouml;schfunktion','F&uuml;gt eine weitere L&ouml;schfunktion f&uuml;r Nachrichten am Anfang der Liste hinzu.');

	createCheck('igm_signatur_bool','Signatur','In eigenen Nachrichten eine Signatur anh&auml;ngen','igm_signatur1');
	createTextArea('igm_signatur','','Signatur',30,5);
	createHeaderCloser();

	// Statistik Config
	createHeader('stats','Statistik &amp; Allianz', 'Mit diesen Optionen kannst du das Aussehen der Statistik- und Allianzseite bearbeiten.');
	createCheck('show_punkte_diff','Punktedifferenz','Differenz immer zum eigenen Punktestand (Punktedifferenz wird nur auf den Statistikseiten angezeigt auf den man selbst vertreten ist.)');
	createCheck('show_punkte_diff_top','Punktedifferenz','Differenz immer zum vorhergehenden Platz.');
	createEdit('punkte_diff_fontsize','Schriftgr&ouml;&szlig;e','Schriftgr&ouml;&szlig;e f&uuml;r die Punktedifferenz');
	createCheck('stats_plusminusbuttons','Navibuttons','F&uuml;gt ein vor und zur&uuml;ck Button in die Statistikseite ein.');
	createHeaderCloser();
	
	//allyseinfärben
	createHeader('acolor','Allianz &amp; Spielerfarben', 'Mit diesen Optionen kannst du bestimmen ob und in welchen Farben Allianzen und Spieler in der Galaxieansicht und in den Statistiken gef&auml;rbt werden sollen.');
	createCheck ('gala_ally_faerben','Aktivieren','F&auml;rbt Spieler und oder Allianzen in der Galaxie-Ansicht und den Statistiken.','gala_ally_spieler_farben1 gala_ally_sn_in_af1');
	createCheck ('gala_ally_sn_in_af','Spielerfarbe','F&auml;rbt den Spielernamen in der Farbe der Allianz');
	
	var ogs_allyfarbliste = ogs.array.split(ogs.load('gala_ally_spieler_farben'),'|','&');
	createList('gala_ally_spieler_farben',false, ogs_allyfarbliste, txt('sli_ac',new Array('Name','Ally/Spieler','Farbe')),'ogs.ally_farblist');
	createHeaderCloser();
	
	// Skinerweiterung
	createHeader('skin','Skin Erweiterung', 'Mit diesen Optionen kannst du Skin Erweiterung ein und ausschalten.');
	createCheck('skin_advance', 'Skin-Erweiterung', 'Es werden zus&auml;tzliche CSS-Funktionen dem Skin hinzugef&uuml;gt','flotten_zusatz1 fehlress_als_text1 schiffs_geschw1');
	createCheck('flotten_zusatz','Flotteninhalte','Flotten in der &Uuml;bersicht mit Ladung/Zusammensetzung anzeigen');
	createCheck('fehlress_als_text','Fehlende Ressourcen','Fehlende Ressourcen (bei Geb&auml;uden usw.) als Text anzeigen (nur bei Commander m&ouml;glich)');
	createCheck('schiffs_geschw','Schiffsinfos','Zusatzinformationen (Schiffsgeschwindigkeiten, etc.) im Flottenmen&uuml; anzeigen bzw. umf&auml;rben');
	createHeaderCloser();
	
	// Farmliste
	createHeader('farm','Farmliste', 'Mit diesen Optionen kannst du die Farmliste bearbeiten.');
	createCheck('farmliste_aktiv','Farmliste','Farmliste aktivieren');
	createHeaderCloser();
	
	// Planetenliste einstellen
	createHeader('plani','Planetenliste', 'Mit diesen Optionen kannst du die Planetenliste bearbeiten und festlegen wie diese aussehen soll.');
	createCheck('plani_verbessern','Planetenliste Verbessern','Die Planetenliste verbessern (Diese Option wird deaktiviert wenn "Combobox" aktiviert ist)','plani_shortname1 plani_mondklammern1 plani_linkplanetmond1 plani_mondextra1 plani_hpmarker1 plani_pnm1');
	createCheck('plani_shortname','Kurze Planetennamen','Die Planeten- und Mondnamen nicht in der Planetenliste anzeigen (nur die Koords und <i>(M)</i> f&uuml;r Monde)');
	createCheck('plani_pnm','Mond zu Planet','H&auml;ngt den Mond hinter den dazugeh&ouml;rigen Planeten.');
	createCheck('plani_mondextra','Monde seperat','Monde in der Planetenauswahl getrennt von den Planeten darunter anzeigen');
	createCheck('plani_mondklammern','Mondklammern','Entfernt das "(Mond)" beim Mondnamen in der Planetenliste');
	createCheck('plani_linkplanetmond','Link zum P/M','F&uuml;gt einen Link zum dazugeh&ouml;rigen Planeten / Mond hinzu');
	createCheck('plani_hpmarker','HP Markieren','Hebt den Heimatplaneten in der Liste hervor');
	createCheck('plani_hptotop','HP oben','Den HP an den Anfang der Planiliste stellen');
	createCheck('plani_next','&lt;&lt; Planet &gt;&gt;','F&uuml;gt Links zum n&auml;chsten und vorherigen Planeten hinzu, sofern es diese gibt','plani_next_modus1 plani_next_liste1 plani_next_tt1 plani_next_nomsg1');
	var list = new Array;
	list.push('0'); list.push('Nur Links');
	list.push('1'); list.push('Nur Tastatur');
	list.push('2'); list.push('Links + Tastatur');
	createOption('plani_next_modus','','Modus: Wie soll die Liste gesteuert werden?<br />Tastatur reagiert erst 0,2 Sekunde nach Seitenaufruf (Spamschutz) und 5 Sekunden nach letzter Eingabe (Nachrichten schreiben)',list,ogs.load('plani_next_modus'));
	var list = new Array;
	list.push('0'); list.push('alle Planeten alle Monde');
	list.push('1'); list.push('Planet Mond Planet Mond');
	list.push('2'); list.push('nur Monde / Planeten');
	createOption('plani_next_liste','','Liste: In welcher Reihenfolge soll die Liste der Planeten durchschaltbar sein?',list,ogs.load('plani_next_liste'));
	createCheck('plani_next_tt','','Tooltips anzeigen?');
	createCheck('plani_next_nomsg','','Auf den Seiten der eigenen Allianz und beim schreiben von Nachrichten die Tastatur deaktivieren.');
	createCheck('plani_combobox','Combobox','Ersetzt die Combobox zur Planiauswahl.','plani_combobox_type1 plani_combobox_val1 plani_combobox_tooltip1');
	var list = new Array;
	list.push('0'); list.push('Fester Text');
	list.push('1'); list.push('Galaxie');
	list.push('2'); list.push('1 Zeichen');
	list.push('3'); list.push('2 Zeichen');
	list.push('4'); list.push('3 Zeichen');
	list.push('5'); list.push('4 Zeichen');
	createOption('plani_combobox_type','','Modus',list,ogs.load('plani_combobox_type'));
	createEdit('plani_combobox_val','','Bei "Fester Text" ist das der Text der angezeigt wird, sonst die Angabe an welcher Position im Planetennamen die Zeichen stehen die angezeigt werden sollen.',3,3);
	createCheck('plani_combobox_tooltip','Tooltips','Tooltips anzeigen?')
	createHeaderCloser();
	
	// Menu
	createHeader('menu','Men&uuml;', 'Mit diesen Optionen kannst du das links Men&uuml; bearbeiten. Alle zus&auml;tzlichen Links erscheinen unterhalb des Impressums.');
	var list = new Array;
	list.push('0'); list.push('Normal');
	list.push('1'); list.push('Fixiert');
	list.push('2'); list.push('Scrollen');
	createOption('menu_mode','Men&uuml; Modus','Bestimmt wie das Linke Men&uuml; angezeigt werden soll.',list,ogs.load('menu_mode'));

	createEdit('menu_link_pos','Einf&uuml;geposition','Vor welcher Stelle des Men&uuml;s sollen die Links eingef&uuml;gt werden? -1 bedeutet ganz am Ende.');
	createCheck('pranger', 'Pranger', 'Link zum Pranger im linken Men&uuml; anzeigen');
	createCheck('menu_link_enable','Men&uuml;linkliste','Einschalten?','menu_link_liste1');
	var ogs_menulinkliste = ogs.array.split(ogs.load('menu_link_liste'),'|','&');
	createList('menu_link_liste',false, ogs_menulinkliste, new Array('Name','URL'),'ogs.menu_link_liste');
	createHeaderCloser();
	
	// Allymitgliederliste
	createHeader('ally','Allianzmitglieder', 'Mit diesen Optionen kannst du die Allianzliste bearbeiten.');
	createCheck('ml_sort','Member-Sortierung','Memberlisten-Link um Default-Sortierung erg&auml;nzen','ml_typ1 ml_art1');

	ogs.load('ml_typ');
	var list = new Array;
	var selected = 0;
	var MLTyp = txt('mltyp',new Array('Koord', 'Name', 'Status', 'Punkte', 'Beitritt', 'Online'));

	for (var i = 0; i < MLTyp.length; i++)
	{
		list.push(i);
		
		if (i == settingscur['ml_typ'])
		{
			selected = i;
		}
		
		list.push(MLTyp[i]);
	}
	
	createOption('ml_typ','','Default-Sortierung der Memberliste (nach Typ)',list,selected);

	ogs.load('ml_art');
	var list = new Array;
	var selected = 0;
	var MLArt = txt('mlart',new Array('absteigend', 'aufsteigend'));
	
	for (var i = 0; i < MLArt.length; i++)
	{
		list.push(i);
		
		if (i == settingscur['ml_art'])
		{
			selected = i;
		}
		
		list.push(MLArt[i]);
	}
	
	createOption('ml_art','','Default-Sortierung der Memberliste (Reihenfolge)',list,selected);
	createHeaderCloser();
	
	createHeader('fcolor','Flottenfarben', 'Mit dieser Option kannst du die Farben f&uuml;r Flotten einstellen.<br /><br />Style 1, Style 2 und Style 3 &auml;ndern das Erscheinungsbild der Schrift, was durch den angezeigten Wert dargestellt wird. Size macht die Schrift gr&ouml;&szlig;er oder kleiner. Die Farbe des Textes wird durch die *Farbe* und die *Link*-Farbe angegeben, wobei die *Link*-Farbe nur f&uuml;r die Elemente mit Tooltip und die Koordinaten verwendet wird.');
	createCheck('flotten_faerben','Flotten f&auml;rben','Flotten in der &Uuml;bersicht umf&auml;rben','test_flotten_farben1');
	
	var ogs_flottenfarben = ogs.load('uebersicht_flotten_farben');
	if (ogs_flottenfarben.trim() == '')
		ogs_flottenfarben = ogs.array.split(settingsdef['uebersicht_flotten_farben'],'|','&');
	else
	{
		ogs_flottenfarben = ogs.array.split(ogs_flottenfarben,'|','&');
		
		//default settings mit aktuellen ueberschreiben => keine probs mehr bei aenderungen
		var org = ogs.array.split(settingsdef['uebersicht_flotten_farben'],'|','&');
		
		for (var i = 0; i < org.length; i++)
		{
			if (org[i].length > 1)
			{
				var curid = -1;
				
				for (var ii = 0; ii < ogs_flottenfarben.length; ii++)
				{
					if(org[i][0] == ogs_flottenfarben[ii][0] && org[i][1] == ogs_flottenfarben[ii][1])
					{
						curid = ii;
						break;
					}
				}
				
				if (curid != -1)
				{
					for (var ii = 2; ii < org[i].length; ii++)
					{
						org[i][ii] = ogs_flottenfarben[curid][ii];
					}
				}
			}
		}
		
		ogs_flottenfarben = org;
	}
	
	createList('test_flotten_farben',false, ogs_flottenfarben, txt('sli_fc',new Array('Art','Typ','Farbe','Style 1','Style 2','Style 3','Size','Link')),'ogs.flottenfarbenfunc',true);
	createHeaderCloser();
	
	//Statistiklinks
	createHeader('statlinks','Statistiklinks', 'Mit dieser Option kannst du Links zu Spielerstatistiken &auml;ndern.<br /><br />*UNI* = Nummer des Universiums<br />*NAME* = Names des Spielers / der Allianz');
	createCheck('statlinks_use_stats','Statistikseite','aktivieren?');
	createCheck('statlinks_use_gala','Galaxieseite','aktivieren?');
	//createCheck('statlinks_use_spio','Spionageberichte','aktivieren?');
	
	createEdit('statlinks_pn1','Spielerlink 1','Name',50);
	createEdit('statlinks_pu1','','Url',50);
	createEdit('statlinks_pn2','Spielerlink 2','Name',50);
	createEdit('statlinks_pu2','','Url',50);
	createEdit('statlinks_pn3','Spielerlink 3','Name',50);
	createEdit('statlinks_pu3','','Url',50);
	createEdit('statlinks_pn4','Spielerlink 4','Name',50);
	createEdit('statlinks_pu4','','Url',50);
	createEdit('statlinks_pn5','Spielerlink 5','Name',50);
	createEdit('statlinks_pu5','','Url',50);
	createEdit('statlinks_an1','Allianzlink 1','Name',50);
	createEdit('statlinks_au1','','Url',50);
	createEdit('statlinks_an2','Allianzlink 2','Name',50);
	createEdit('statlinks_au2','','Url',50);
	createEdit('statlinks_an3','Allianzlink 3','Name',50);
	createEdit('statlinks_au3','','Url',50);
	createEdit('statlinks_an4','Allianzlink 4','Name',50);
	createEdit('statlinks_au4','','Url',50);
	createEdit('statlinks_an5','Allianzlink 5','Name',50);
	createEdit('statlinks_au5','','Url',50);
	createHeaderCloser();
	
	//Globale einstellungen
	createHeader('login','Loginoptionen', 'Mit dieser Option kannst du Logineinstellungen &auml;ndern.');
	createCheck('selectuniverse','Uniauswahl','Aktiviert die Uniauswahl.');
	createCheck('fokusonlogin','Fokus Loginbutton','Aktiviert den Fokus auf das Loginfeld.');
	createHeaderCloser();
	
	//Im+Export
	createHeader('import','Im &amp; Export', 'Mit dieser Option kannst du deine Einstellungen im/exportieren.<br /><br />Bitte beachte das grade vorgenommene &Auml;nderungen an den Einstellungen nicht mit exportiert werden bzw. beim Import verfallen.');

	var erg = new Array();
	for (var settings in settingsdef)
	{
		//einlesen
		erg.push(settings + ':=' + ogs.load(settings));
	}

	erg = erg.join('\n');
	erg = erg.replace(/&/g, '&amp;');
	
	coder += '<tr><th style="color: '+ogs.load('skriptcolor')+';">'+txt('sx_export','Export')+'</th><th colspan="2">';
	coder += '<textarea cols="'+10+'" rows="'+10+'">'+erg+'</textarea></th></tr>';

	coder += '<tr><th style="color: '+ogs.load('skriptcolor')+';">'+txt('sx_import','Import')+'</th><th colspan="2">';
	coder += '<textarea id="ogs_importtextbox" cols="'+10+'" rows="'+10+'"></textarea><br /><a id="ogs_setup_import_btn" href="#">'+txt('sx_import_btn','Einstellungen importieren')+'</a></th></tr>';

	coder += '<tr><th style="color: '+ogs.load('skriptcolor')+';">'+txt('sx_default','Default')+'</th><th colspan="2">';
	coder += '<a id="ogs_setup_default_btn" href="#">'+txt('sx_default_btn','Zur&uuml;cksetzen auf Defaultwerte')+'</a></th></tr>';
	createHeaderCloser();
	
	
	//Haupttabelle
	code += '<center><table cellpadding="3">';
	code += '<tr><th style="text-align: center">'+txt('setup_head','OGS Setup')+'</th><th style="text-align: right;">';
	
	//Sprache
	code += '<div style="float: left;">';
	code += '<a href="javascript:document.getElementById(\'ogs_language\').selectedIndex=0; alert(\'Sprache: Deutsch\');ogs.setup_flag();"><img src="http://nwlng.gameforge.de/out/ogame/de/de.gif" alt="Deutsch"></a>';
	for(lng in ogs.lang.data)
	{
		code += '&nbsp;<a href="javascript:document.getElementById(\'ogs_language\').selectedIndex='+(1 + parseInt(lng,10))+';alert(\''+ogs.lang.data[lng]['info']+'\');ogs.setup_flag();"><img src="http://nwlng.gameforge.de/out/ogame/de/'+ogs.lang.data[lng]['icon']+'.gif" alt="'+ogs.lang.data[lng]['name']+'"></a>';
	}
	code += '</div>';
	ogs.bound.save = ogs.save;
	ogs.bind('setup_flag',ogs_setup_flag);
	ogs.bind('setup_save',ogs_setup_save);
	
	code += '<div>';
	code += '<a href="javascript:ogs.reiter(0);" id="ogs_setup_startpage">?</a>&nbsp;&nbsp;<a href="#" id="ogs_setup_exit">X</a></div></th></tr>';
	code += '<tr><th style="vertical-align: top;">';
	code += '<table style="width: 150px">' + codel + '</table></th><td style="vertical-align: top;">';
	code += '<table style="width: 600px"><colgroup><col width="2*"><col width="5*"><col width="2*"></colgroup>' + coder + '</table></td></tr>';
	code += '<tr><th>&nbsp;</th><th style="text-align: right"><a href="#" id="ogs_setup_exit_save">'+txt('setup_save','Speichern')+'</a></th></tr></table></center>';
	ogs.neueseite.neu.innerHTML = code;
	
	//textareas zuweisten
	for (var i = 0; i < ogs_setup_save_textarea.length; i++)
	{
		ogs.setTextArea(document.getElementById(ogs_setup_save_textarea[i]),((ogs.load(ogs_setup_save_textarea[i])).replace(/\\n/g,'\n')));
	}
	
	//show info
	ogs_reiter(0);
	
	ogs.addEvent(document.getElementById('ogs_setup_exit'),'click',ogs_setup_close,false);
	ogs.addEvent(document.getElementById('ogs_setup_exit_save'),'click',ogs_setup_save,false);
	
	ogs.addEvent(document.getElementById('ogs_setup_import_btn'),'click',ogs_setup_import,false);
	ogs.addEvent(document.getElementById('ogs_setup_default_btn'),'click',ogs_setup_default,false);
}

function ogs_setup_flag()
{
	window.setTimeout(function()
	{
		ogs.setup_save();
		
		ogs.lang.skript = -1;
		
		if (typeof unsafeWindow.ogs_lang != 'undefined')
		{
			for(lng in ogs.lang.data)
			{
				if (ogs.lang.cur == ogs.lang.data[lng]['id'])
				{
					ogs.lang.skript = ogs.lang.data[lng]['skript'];
				}
			}
		}
		
		ogs_setup_start();
	},0);
}

function ogs_setup_import()
{
	if (!confirm(txt('sx_import_msg','Wollen Sie die Einstellungen wirklich importieren?'))) return;
	
	var text = ogs.getTextArea(document.getElementById('ogs_importtextbox'));
	text = text.split('\n');

	for(var i = 0; i < text.length; i++)
	{
		if (text[i].indexOf(':=') > 0)
		{
			var thistext = text[i].split(':=');
			
			if (typeof settingsdef[thistext[0]] != 'undefined')
			{
				if (typeof settingsdef[thistext[0]] == 'boolean')
				{		 
					if (thistext[1].indexOf('true') > -1) //so laeufts auch im ie
						ogs.save(thistext[0],true);
					else
						ogs.save(thistext[0],false);
				}
				else
				{
					ogs.save(thistext[0],thistext[1]);
				}
			}
		}
	}
	
	ogs_setup_close();	
}

function ogs_setup_default()
{
	if (!confirm(txt('sx_default_msg','Wollen Sie die Default-Einstellungen wirklich laden?'))) return;
	for (var settings in settingsdef)
	{
		ogs.save(settings, settingsdef[settings]);
	}
	
	ogs_setup_close();
}

function ogs_setup_close()
{	
	//nur starten wenn man erlaubnis hat die seite zu ändern.
	if (ogs.neueseite.user != 'ogs_setup')
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




































































/**************
* Skript Start
**************/

function startup()
{
	/*
	Eine Plani-Liste hat folgendes Format:
	Das Element 0 enthaelt die ID des HPs
	Alle weiteren Elemente sind die Planeten und Monde des Spielers, aufgelistet in der Reihenfolge der Planiliste
	Jeder Planet hat folgende Eigenschaften:
		Name: Sein Name
		Gala, Sys, Pos: Seine Position (Gala:Sys:Pos)
		Koords: Die Position als Text
		ID: Seine ID
		URL: Die Url, die aufgerufen wird, um zu ihm zu wechseln
		Aktiv: Gibt an ob der Plani der aktivierte ist
		Partner: Nummer des Partner Planeten / Mondes
		Typ: mond oder plani
		HP: hp ja oder nein
		
	*/
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
			//-------------------
			// Ausschaltfunktion
			//-------------------
			function turnoff()
			{
				var vCheck = !ogs.load('skript_online');
				ogs.save('skript_online', vCheck);
				
				if (vCheck)
				{
					document.getElementById('ogs_loading').innerHTML = 'ON';
					document.getElementById('ogs_loading').style.color = 'green';
					alert('Skript aktiviert');
				}
				else
				{
					document.getElementById('ogs_loading').innerHTML = 'OFF';
					document.getElementById('ogs_loading').style.color = 'red';
					alert('Skript deaktiviert');
				}
				location.reload();
			}
			
			OGameVersion.innerHTML = OGameVersion.innerHTML.replace(exp('uni','Universum'),txt('uni_s','Uni')) +'<br /><a href="' + ogs.getLink(ogs.homepage) + '" target="_blank">OGame-Skript</a><br /><a href="#" onclick="ogs_setup_start()" id="ogs_version">' + ogs.version() + ': </a><a style="color: yellow" id="ogs_loading" href="#" onclick="turnoff()">ERROR</a><br />'; // in der Navi einen Hinweis setzen

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
				
				// on angezeigt
				document.getElementById('ogs_loading').innerHTML = 'ON';
				document.getElementById('ogs_loading').style.color = 'green';
			}
			else
			{
				// off anzeigen
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





/*
fuer IE support:
kein xpath mehr => ogs.dom.getCEBF + ogs.dom.getEBF
addEventListener => ogs.addEvent
*/

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
	if (obj.addEventListener)
	{
		obj.addEventListener(type, func, cap);
	}
	else if (obj.attachEvent)
	{
		obj.attachEvent('on'+type, func);
	}
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
	alert('Debug-Meldung:\n' + meldung);
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

	if (headselectfound && ogs.load('plani_next'))
	{
		ogs.load('plani_next_modus'); // nur links, nur tasta, beides
		ogs.load('plani_next_liste');
		ogs.load('plani_next_tt');
		
		var navliste = new Array();
		var navliste_p = new Array();
		var navcurpos = 0;
		
		for (i = 0; i < ogs.planetliste.length; i++)
		{
			if (settingscur['plani_next_liste'] == 0) // alle planis geflogt von alle monde
			{
				if (ogs.planetliste[i]['Typ'] == ogs.planettype.planet)
				{
					navliste[navliste.length] = ogs.planetliste[i];
					if (ogs.planetliste[i]['Aktiv'])  navcurpos = navliste.length - 1;
					
					if (ogs.planetliste[i]['Partner'])
					{
						navliste_p[navliste_p.length] = ogs.planetliste[i]['Partner'];
						if (ogs.planetliste[i]['Partner']['Aktiv']) navcurpos = -1 * navliste_p.length;;
					}
				}
			}
			else if (settingscur['plani_next_liste'] == 1) // plani mond plani mond...
			{
				if (ogs.planetliste[i]['Typ'] == ogs.planettype.planet)
				{
					navliste[navliste.length] = ogs.planetliste[i];
					if (ogs.planetliste[i]['Aktiv'])  navcurpos = navliste.length - 1;
					
					if (ogs.planetliste[i]['Partner'])
					{
						navliste[navliste.length] = ogs.planetliste[i]['Partner'];
						if (ogs.planetliste[i]['Partner']['Aktiv']) navcurpos = navliste.length - 1;
					}
				}
			}
			else // nur planis bzw nur monde
			{
				if (ogs.planetliste[i]['Typ'] == ogs.planetliste[0]['Aktiv']['Typ'])
				{
					navliste[navliste.length] = ogs.planetliste[i];
					if (ogs.planetliste[i]['Aktiv'])  navcurpos = navliste.length - 1;
				}
			}
		}
		
		if (navcurpos < 0) navcurpos = navcurpos * -1 + navliste.length -1;
		navliste = navliste.concat(navliste_p);
		
		var nav_vor = navcurpos + 1; if (nav_vor >= navliste.length) nav_vor = 0;
		var nav_zur = navcurpos - 1; if (nav_zur < 0 ) nav_zur = navliste.length - 1;
		var nav_ele
		
		if (settingscur['plani_next_modus'] == 0 || settingscur['plani_next_modus'] == 2) //nur liste oder beides
		{
			if (nav_zur != navcurpos)
			{
				nav_ele = ogs.dom.newElement('a', '&lt;&lt;'+ ((settingscur['plani_combobox']) ? '&nbsp;&nbsp;' : ''), 'href', navliste[nav_zur]['URL'], 'id', 'VorhURL');
				if (settingscur['plani_next_tt']) ogs.addOverLib(nav_ele, '<table width=\'100%\'><tr><td><table width=\'100%\'>'+navliste[nav_zur]['Koords'] + ' ' + navliste[nav_zur]['Name']+'</table></td></tr></table>');
				headselect.parentNode.insertBefore(nav_ele, headselect); // Link vor der Dropwdown-Liste einfuegen
			}
			
			if (nav_vor != navcurpos)
			{
				nav_ele = ogs.dom.newElement('a', ((settingscur['plani_combobox']) ? '&nbsp;&nbsp;' : '') + '&gt;&gt;', 'href', navliste[nav_vor]['URL'], 'id', 'NachURL');
				if (settingscur['plani_next_tt']) ogs.addOverLib(nav_ele, '<table width=\'100%\'><tr><td><table width=\'100%\'>'+navliste[nav_vor]['Koords'] + ' ' + navliste[nav_vor]['Name']+'</table></td></tr></table>');
				ogs.dom.insertBehind(nav_ele, headselect); // Link nach der Dropdown-Liste einfgen
			}
		}
		
		if (settingscur['plani_next_modus'] == 1 || settingscur['plani_next_modus'] == 2) //nur tasta oder beides
		{
			var keyboardevent_urls = new Array();
			if (nav_zur != navcurpos)
				keyboardevent_urls.push(navliste[nav_zur]['URL']);
			else
				keyboardevent_urls.push(null);
			
			if (nav_vor != navcurpos)
				keyboardevent_urls.push(navliste[nav_vor]['URL']);
			else
				keyboardevent_urls.push(null);
			
			if (navliste[navcurpos]['Partner']) 
				keyboardevent_urls.push(navliste[navcurpos]['Partner']['URL']);
			else
				keyboardevent_urls.push(null);
			
			var keyboardevent_lastkeypress = (new Date()).getTime() - 4800; // spamschutz
			
			function keyboardevent(e)
			{
				if (!e) if (event) e = event; else return;
				var i = -1;
				if(e.keyCode == 37) i = 0;
				else if(e.keyCode == 39) i = 1;
				else if(e.keyCode == 38) i = 2;
				else if(e.keyCode == 40) i = 2;
				else keyboardevent_lastkeypress = (new Date()).getTime();
				
				if (i >= 0 && keyboardevent_urls[i] != null && keyboardevent_lastkeypress + 5000 <= (new Date()).getTime())
				{
					keyboardevent_lastkeypress = (new Date()).getTime();
					document.location = keyboardevent_urls[i];
				}
			}
			
			//nur wenn auf msg seiten gewuenscht wird
			if (!ogs.load('plani_next_nomsg') || (ogs.ogame.page != 'allianzen' && ogs.ogame.page != 'writemessages'))
				unsafeWindow.onkeydown = keyboardevent;	
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
	
	//-----------
	// res timer
	//-----------
	if (ogs.load('res_timer'))
	{
		//Array mit Berechnungsdaten
		var resUpdate = new Array();
		resUpdate['UniSpeed'] = Math.max(1,parseInt(ogs.load('uni_speed'),10));
		//geologe einrechnen
		if (HeadDiv.innerHTML.match('img/geologe_ikon.gif') != null) resUpdate['UniSpeed'] *= 1.1;
		resUpdate['OnStart'] = new Array();
		resUpdate['Element'] = new Array();
		resUpdate['ElementInfo'] = new Array();
		resUpdate['Stufe'] = new Array(0,0,0);
		resUpdate['StartTime'] = (new Date).getTime();
		resUpdate['GrundPro'] = new Array(20,10,0);
		resUpdate['Faktor'] = new Array(30,20,10);
		resUpdate['Speicher'] = new Array(0,0,0);
		resUpdate['Farbe'] = new Array(ogs.load('color_met'),ogs.load('color_kris'),ogs.load('color_deut'))
		resUpdate['Temp'] = 0;
		resUpdate['ProdFaktor'] = 1;
		resUpdate['OverLib'] = new Array(false,false,false);

		var temperatur = ogs.array.split(ogs.load('temperatur'),'|','&');
		for (var i = 0; i < temperatur.length; i++)
		{
			if (temperatur[i][0] == ogs.planetliste[0]['Aktiv']['ID'])
			{
				resUpdate['Temp'] = temperatur[i][1];
				break;
			}
		}
		
		var runupdate = false;

		var resZellen = document.getElementById('resources').rows[2].cells;;

		for (var i = 0; i < 3; i++)
		{
			resUpdate['OnStart'][i] = InInt(resZellen[i].innerHTML);
			resUpdate['Element'][i] = resZellen[i];
			resUpdate['ElementInfo'][i] = document.getElementById('resources').rows[0].cells[i].getElementsByTagName('img')[0];
		}
		
		var prod = resZellen[4].innerHTML.replace(/<[^<]*>/g,'').split('/');
		prod[0] = InInt(prod[0],10);
		prod[1] = InInt(prod[1],10);
		
		if (prod[0] < 0)
			resUpdate['ProdFaktor'] = Math.round(100*prod[1]/(prod[1]-prod[0])) / 100;
		else if (prod[1] == 0)
			resUpdate['ProdFaktor'] = 0;
		else
			resUpdate['ProdFaktor'] = 1.00;
		
		var buildings = ogs.array.split(ogs.load('buildings'),'|','&');
		
		for (var i = 0; i < buildings.length; i++)
		{
			if (buildings[i][0] == ogs.planetliste[0]['Aktiv']['ID'])
			{
				buildings = ogs.array.split(buildings[i][1],':','=');
				
				for (var i = 0; i < buildings.length; i++)
				{
					if (0 < buildings[i][0] && buildings[i][0] < 4)
					{
						resUpdate['Stufe'][buildings[i][0]-1] = buildings[i][1];
						runupdate = true;
					}
					if (21 < buildings[i][0] && buildings[i][0] < 25)
					{
						resUpdate['Speicher'][buildings[i][0]-22] = buildings[i][1];
					}
				}
				
				break;
			}
		}
		
		function updateRes()
		{
			var t = (new Date).getTime();
			for (var i = 0; i < 3; i++)
			{
				var resprod = Math.floor(resUpdate['ProdFaktor'] * resUpdate['UniSpeed'] * Math.floor(resUpdate['GrundPro'][i] + resUpdate['Faktor'][i] * resUpdate['Stufe'][i] * Math.pow(1.1, resUpdate['Stufe'][i])));
				if (i == 2) resprod = Math.floor(resprod * (-0.002 * resUpdate['Temp'] + 1.28));
				
				var resneu = resprod * (t-resUpdate['StartTime']) / 3600000;					
				resneu = Math.floor(resneu) + resUpdate['OnStart'][i]
				
				var speicher = 50000 * Math.ceil(1 + Math.pow(1.6,resUpdate['Speicher'][i]));
				resneu = Math.max(resUpdate['OnStart'][i],Math.min(speicher,resneu));
				
				if (speicher <= resneu)
					resUpdate['Farbe'][i] = '#ff0000';
				
				resUpdate['Element'][i].innerHTML = '<font color="'+resUpdate['Farbe'][i]+'">'+TausenderZahl(resneu)+'</font>';
				
				if (!resUpdate['OverLib'][i])
				{
					resUpdate['OverLib'][i] = true;
					ogs.addOverLib(resUpdate['ElementInfo'][i],'<table width=\'100%\'><tr><td><table width=\'100%\'><tr><th>Speicher</th><th style=\'text-align: right;\'><span style=\'color: '+resUpdate['Farbe'][i]+';\' id=\'ogs_res_now_'+i+'\'>'+TausenderZahl(resneu)+'</span></th></tr><tr><th>Max</th><th style=\'text-align: right;\'>'+TausenderZahl(speicher)+'</th></tr><tr><th>Res / h</th><th style=\'text-align: right;\'>'+TausenderZahl(resprod)+'</th></tr><tr><th>Voll in</th><th style=\'text-align: right;\'><span id=\'ogs_res_time_'+i+'\'>'+ogs.time.duration(Math.max(0, (resprod == 0) ? 0 : Math.floor((speicher - resUpdate['OnStart'][i]) / resprod * 3600 - (t-resUpdate['StartTime']) / 1000)))+'</span></th></tr></table></td></tr></table>');
				}
				
				var el = document.getElementById('ogs_res_time_'+i);
				if (el) el.innerHTML = ogs.time.duration(Math.max(0,(resprod == 0) ? 0 : Math.floor((speicher - resUpdate['OnStart'][i]) / resprod * 3600 - (t-resUpdate['StartTime']) / 1000)));
				el = document.getElementById('ogs_res_now_'+i);
				if (el) el.innerHTML = TausenderZahl(resneu);
			}
		}
		
		updateRes();
		//nur wenn es produktion gibt sprich minen
		if (runupdate) window.setInterval(updateRes, 333);
	}
}

