// ==UserScript==
// @name            OGame-Skript
// @namespace       OGame
// @description     Erweitert OGame um nÃ¼tzliche Funktionen
// @include         http://s*.gfsrv.net/*
// @include         http://ogame*.de/*
// @include         http://game*.de/*
// @include         http://www.ogame*.de/*
// @include         http://uni*.ogame.*/*
// @include         http://de*.ogame.*/*
// ==/UserScript==
/*
OGame-Skript, ein Greasemonkey-Userscript, das OGame um einige, nuetzliche Funktionen erweitert.
Copyright (C) 2006-2007 Windows-zerstoerer, ab Maerz 2007 Eleria & Co, ab Juli 2007 hakaz & User-Gruppe des OGame-Forums

Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation veroeffentlicht, weitergeben ve/oder modifizieren, gemaess Version 2 der Lizenz.

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
/*
fuer IE support:
kein xpath mehr => getCEBF + getEBF
addEventListener => addEvent
*/

if (ogs_init != true)
{
    ogs_init = true;
    
    //browser support herstellen
    var ogs_browser = '';
    if (typeof GM_getValue != 'undefined') // firefox GM plugin
    {
        ogs_browser = 'ff';
    }
    else if (typeof PRO_getValue != 'undefined') // ie pro plugin
    {
        ogs_browser = 'ie';
        
        //functions umleiten
        GM_getValue = PRO_getValue;
        GM_setValue = PRO_setValue;
        GM_addStyle = PRO_addStyle;
        unsafeWindow = document;
    }
    
    // Startzeit des Skripts
    var ogs_startZeit = new Date();

    var MaxVers = 10; // Maximale Anzahl Versuche, das Skript durchzufuehren
    var VersWart = 2500; // Wartezeit zwischen 2 Versuchen in Millisekunden
    var Versuche = 0;
    var ZeitDiff = 0;

    // Speicher Variablen
    var settingsglobalcur = new Array();
    var settingsglobaldef = new Array();
    var settingscur = new Array();
    var settingsdef = new Array();

    // Globale Grundwerte
    settingsglobaldef['selectuniverse'] = true;
    settingsglobaldef['universe'] = 0;
    settingsglobaldef['version'] = '0.0 - Rev #0';
    settingsglobaldef['gpl'] = 0;
    settingsglobaldef['fokusonlogin'] = true;

    // aktuelle Versionsnummer abspeichern
    ogs_save('version', '1.5 - Rev #10');

    // Account Grundwerte
    settingsdef['galaxietool'] = false;
    settingsdef['skript_online'] = true;
    settingsdef['colored_ress'] = true;
    settingsdef['hp_oben'] = true;
    settingsdef['skin_advance'] = true;
    settingsdef['commander'] = false;
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
    settingsdef['skriptcolor'] = '#999900';
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
    settingsdef['handelsrechner'] = true;
    settingsdef['left_menu_fix'] = false;
    settingsdef['ml_sort'] = true;
    settingsdef['ml_typ'] = '3';
    settingsdef['ml_art'] = '0';

    settingsdef['zeit_diff'] = 0;
    settingsdef['def_plani'] = 0;

    settingsdef['show_punkte_diff'] = false;
    settingsdef['show_punkte_diff_top'] = false;
    settingsdef['punkte_diff_fontsize'] = 'smaller';
    settingsdef['stats_plusminusbuttons'] = false;
    
    settingsdef['gala_iprak_aktiv'] = false;
    settingsdef['gala_iprak_wert'] = 6;
    settingsdef['gala_iprak_max'] = true;

    //nachrichten erweiterungen
    settingsdef['spio'] = true;
    settingsdef['news_expo_aktiv'] = false;
    settingsdef['news_expo_farbe'] = 'yellow';
    settingsdef['news_pm_aktiv'] = false;
    settingsdef['news_pm_farbe'] = 'blue';
    settingsdef['news_am_aktiv'] = false;
    settingsdef['news_am_farbe'] = 'lightblue';

    //imperiumsansicht
    settingsdef['imperium_calc_resis'] = true;
    settingsdef['imperium_kosten'] = false;

    //farbliche markierung von allianzen in der gala bersicht
    settingsdef['gala_ally_faerben'] = true;
    settingsdef['gala_ally_spieler_farben'] = '';
    settingsdef['gala_statslink_show'] = false;

    //farmliste default werte
    settingsdef['farmliste_aktiv'] = false;
    settingsdef['farmliste_liste'] = '';

    //gebÃ¤ude ve forschung
    settingsdef['building_energie'] = true;
    settingsdef['building_klein'] = false;
    settingsdef['building_klein_pics_size'] = 60;
    settingsdef['building_bg'] = true;
    settingsdef['building_bg_col1'] = '#000000';
    settingsdef['building_bg_col2'] = '#453E25';
    settingsdef['building_nopics'] = false;
    settingsdef['building_doppelzeilen'] = false;

    //InGame Message
    settingsdef['igm_signatur_bool'] = false;
    settingsdef['igm_signatur'] = '';

    //techtree
    settingsdef['techtree_pics'] = true;
    settingsdef['techtree_pics_size'] = '50';
    settingsdef['techtree_bg'] = true;
    settingsdef['techtree_bg_col1'] = '#000000';
    settingsdef['techtree_bg_col2'] = '#453E25';
    settingsdef['techtree_doppelzeilen'] = false;

    //referer zum verbergen der session id zu exterenn links
    settingsdef['dereferer_use'] = true;
    settingsdef['dereferer_url'] = 'http://anonym.to/?';

    //menÃ¼ links
    settingsdef['menu_link_enable'] = true;
    settingsdef['menu_link_liste'] = 'Owiki&http://www.owiki.de/|';
    settingsdef['menu_link_pos'] = -1;

    //flottenfarben
    settingsdef['uebersicht_flotten_farben'] = '';
    settingsdef['uebersicht_flotten_farben'] += 'Spionage|ownespionage&0&#ffa500&0&0&0&0&#E6EBFB|ownespionage&1&#ffa500&1&0&0&2&#666666|espionage&0&#ffa500&0&1&0&0&#E6EBFB|espionage&1&#ffa500&1&1&0&2&#666666|';
    settingsdef['uebersicht_flotten_farben'] += 'Transport + Expeditionen|owntransport&0&#99ff66&0&0&0&0&#E6EBFB|owntransport&2&#99ff66&0&0&1&1&#E6EBFB|owntransport&1&#99ff66&1&0&0&2&#666666|transport&0&#99ff66&0&1&0&0&#E6EBFB|transport&2&#99ff66&0&1&1&1&#E6EBFB|transport&1&#99ff66&1&1&0&2&#666666|';
    settingsdef['uebersicht_flotten_farben'] += 'Tf Abbau|ownharvest&0&#88ff00&0&0&0&0&#E6EBFB|ownharvest&1&#88ff00&1&0&0&2&#666666|harvest&0&#88ff00&0&1&0&0&#E6EBFB|harvest&1&#88ff00&1&1&0&2&#666666|';
    settingsdef['uebersicht_flotten_farben'] += 'Stationieren|owndeploy&0&#00ff00&0&0&0&0&#E6EBFB|owndeploy&1&#00ff00&1&0&0&2&#666666|deploy&0&#00ff00&0&1&0&0&#E6EBFB|';
    settingsdef['uebersicht_flotten_farben'] += 'Halten|ownhold&0&#00cc70&0&0&0&0&#E6EBFB|ownhold&2&#00cc70&0&0&1&1&#E6EBFB|ownhold&1&#00cc70&1&0&0&2&#666666|hold&0&#00cc70&0&1&0&0&#E6EBFB|hold&2&#00cc70&0&1&1&1&#E6EBFB|hold&1&#00cc70&1&1&0&2&#666666|';
    settingsdef['uebersicht_flotten_farben'] += 'Angriff|ownattack&0&#d00000&0&0&0&0&#E6EBFB|ownattack&1&#d00000&1&0&0&2&#666666|attack&0&#d00000&0&1&0&0&#E6EBFB|attack&1&#d00000&1&1&0&2&#666666|';
    settingsdef['uebersicht_flotten_farben'] += 'Verbandsangriff|ownfederation&0&#8b0000&0&0&0&0&#E6EBFB|ownfederation&1&#8b0000&1&0&0&2&#666666|federation&0&#8b0000&0&1&0&0&#E6EBFB|federation&1&#8b0000&1&1&0&2&#666666|';
    settingsdef['uebersicht_flotten_farben'] += 'Mondzerst\u00F6ren|owndestroy&0&#cc6600&0&0&0&0&#E6EBFB|owndestroy&1&#cc6600&1&0&0&2&#666666|destroy&0&#cc6600&0&1&0&0&#E6EBFB|destroy&1&#cc6600&1&1&0&2&#666666|';
    settingsdef['uebersicht_flotten_farben'] += 'IP Raketen|ownmissile&0&#cc3300&0&0&0&0&#E6EBFB|missile&0&#cc3300&0&1&0&0&#E6EBFB|';
    settingsdef['uebersicht_flotten_farben'] += 'Kolonisieren|owncolony&0&#80a0C0&0&0&0&0&#E6EBFB|owncolony&1&#80a0C0&1&0&0&2&#666666|colony&0&#80a0C0&0&1&0&0&#E6EBFB|colony&1&#80a0C0&1&1&0&2&#666666|';
    settingsdef['uebersicht_flotten_farben'] += 'Phalanx|phalanx_fleet&0&#55FF00&0&0&0&0&#E6EBFB|phalanx_fleet&2&#55FF00&0&0&1&1&#E6EBFB|phalanx_fleet&1&#005500&0&0&0&0&#666666|';

    settingsdef['flotte_schiffauswahl'] = false;
    settingsdef['flotte_seite1_upsidedown'] = false;
    settingsdef['flotte_seite2_combobox'] = false;
    settingsdef['flotte_seite2_tfwahl'] = false;
    settingsdef['flotte_seite3_zeiten'] = false;

    //hintergrundbild
    settingsdef['hintergrundbild_use'] = false;
    settingsdef['hintergrundbild_url'] = 'none';

    //forschung
    settingsdef['forschung'] = '';
    
    //planiliste
    settingsdef['keine_planinamen'] = false;
    settingsdef['monde_getrennt'] = false;
    settingsdef['hp_oben'] = false;
    settingsdef['planiliste_aend'] = false;
    settingsdef['plani_combobox'] = false;
    settingsdef['plani_combobox_type'] = 0;
    settingsdef['plani_combobox_val'] = "P";
    settingsdef['plani_combobox_tooltip'] = true;

    var MLTyp = new Array('Koord', 'Name', 'Status', 'Punkte', 'Beitritt', 'Online');
    var MLArt = new Array('absteigend', 'aufsteigend');

    // Plani-Typen (entsprechen den IDs in OGame)
    var Typ_Plani = 1;
    //var Typ_TF = 2; // (noch) nicht verwendet
    var Typ_Mond = 3;

    // Schneide Leerzeichen vor/nach dem String weg
    String.prototype.trim = function() { return this.replace(/^\s*|\s*$/g, ''); }; //(/^\s*|\s*$/, ''); };

    // ein paar Grundvariablen initialisieren
    var Datei = document.URL.match(/\/game\/index.php\?page=([a-zA-Z0-9_\-\/]+)&/); // Dateiname der bearbeiteten Datei
    Datei = Datei ? Datei[0] : '';

    // Daten laden
    var Server = document.URL.match(/http:\/\/([0-9a-zA-Z\-\._]+)\//)[1]; // aktueller OGame-Server
    var SID = document.URL.match(/session=([0-9a-zA-Z]+)/); // Session-ID des Users
    SID = SID ? SID[1] : ''; // falls es eine gibt, speichern
    var PHPSIDStr = document.URL.match(/PHPSESSID=([0-9a-zA-Z]+)/);
    PHPSIDStr = PHPSIDStr ? '&PHPSESSID=' + PHPSIDStr[1] : '';

    // wird noch geladen
    var HP_ID = 0; // zum Speichern der HP-ID
    var PlaniListe = 0, Planis = 0; // zum Speichern der Planiliste
    var DefPlani = 0, AktPlani = 0;
    var TextCol = settingsdef['skriptcolor'];

    //Umlaute
    var ae = '\u00E4';	var oe = '\u00F6';	var ue = '\u00FC';
    var Ae = '\u00C4';	var Oe = '\u00D6';	var Ue = '\u00DC';
    var sz = '\u00DF';

    //hilfswerte um z.b. die farmliste anzuzeigen / ogs setup
    var neueseite_user = '';    //enthÃ¤lt den namen wer die seite zurzeit benÃ¼tzt z.b. 'farmliste' ve *sperrt* somit den zugriff fÃ¼r andere
                                //nur frei wenn '' leer.
    var neueseite_orginal;  //link auf das element das augeblendet wird
    var neueseite_neu;      //link auf das element was angezeigt wird

    // Homepage Url
    var ogs_homepage = 'http://allianz-sarin.de/Ogamescript/';

    //Buffer fÃ¼r Energiewerte
    var EnergieBuffer = new Array();

    //*******************
    // Script starten...
    //*******************
    
    // Es muesen alle Seiten einen page Eintrag bzw. bis auf "renameplanet" eine SID haben, "ainfo" ve "bericht" werden damit ausgeschlossen
    if (!((document.URL.indexOf('page=') + 1 && document.URL.indexOf('session=') + 1) || document.URL.indexOf('renameplanet') + 1))
    {
        ogs_startpage(); //startseite bearbeiten
    }
    else
    {
        startup();  //skript starten

        var vBody = document.getElementsByTagName('body'); //FindeXPath('//body');
    	
        if (vBody.length)
        {
	        vBody[0].style.overflow = "visible";
    	    
            //hintergrundbild hinzufuegen
            if (ogs_load('hintergrundbild_use'))
            {
                ogs_load('hintergrundbild_url')
                if (settingscur['hintergrundbild_url'].toLowerCase().trim() == 'none')
                {
                    vBody[0].style.backgroundImage = "none";
                }
                else if (settingscur['hintergrundbild_url'].trim() == '')
                {
                    vBody[0].style.backgroundImage = "none";
                }
                else
                {
                    vBody[0].style.backgroundImage = "url(" + settingscur['hintergrundbild_url'].trim() + ")";
                }
            }
        }
    }
}

/***********************************
* Funktionsabsatz - HilfsFunktionen
***********************************/

//set und get function fuer textareas
function setTextArea(ta,val)
{
    if (ogs_browser == "ff")
    {
        ta.value = val;
    }
    else if (ogs_browser == "ie")
    {
        ta.innerHTML = val;
    }
    else
    {
        debug("Unsupported Web-Browser");
    }
}

function getTextArea(ta)
{
    if (ogs_browser == "ff")
    {
        return ta.value;
    }
    else if (ogs_browser == "ie")
    {
        return ta.innerHTML;
    }
    else
    {
        debug("Unsupported Web-Browser");
        return '';
    }
}

// fuegt einen object eine function hinzu
function addEvent(obj, type, func, cap)
{
    if (obj.addEventListener)
    {
        obj.addEventListener(type, func, cap);
    }
    else if (obj.attachEvent)
    {
        obj.attachEvent("on"+type, func);
    }
}

// Schneide Leerzeichen vor/nach dem String weg
function Trim(Str)
{
	return Str.replace(/^\s*|\s*$/g, '');
}

// Hilfe bei Debugmeldungen
function debug(meldung)
{
	alert('Debug-Meldung:\n' + meldung);
}

// Laedt eine Einstellung des aktuellen Accounts bzw globale
function ogs_load(Name)
{
	if (typeof settingsdef[Name] == "undefined")
	{
	    if (typeof settingsglobaldef[Name] == "undefined")
	    {
		    //sollte nicht auftreten da jede einstellung auch ein default wert haben sollte
		    //diese if schleife kann nachherkomplett gelÃ¶scht werden
    		
		    if(Name.indexOf('_HP_ID') == -1) // nur abbrechen wenn es sich nicht um die hp id handelt
		    {
		        debug('Defaultwert f'+ue+'r ' + Name + ' nicht gesetzt');
		        return '';
		    }
	    }
    	
	    //wenn noch nicht geladen dann laden
	    if (typeof settingsglobalcur[Name] == "undefined")
	    {
		    settingsglobalcur[Name] = GM_getValue('global_' + Name, settingsglobaldef[Name]);				
	    }
    	
		if (typeof settingsglobaldef[Name] == "boolean" && typeof settingsglobalcur[Name] != "boolean")
		    if (settingsglobalcur[Name] == '-1')
		        settingsglobalcur[Name] = true;
		    else
		        settingsglobalcur[Name] = false;

	    return settingsglobalcur[Name];
	}
	
	//wenn unbekannt ist um welchen acc es hier geht
	if (!HP_ID)
	{
		return settingsdef[Name];
	}
	
	//wenn noch nicht geladen dann laden
	if (typeof settingscur[Name] == "undefined")
	{
		settingscur[Name] = GM_getValue(Server + '_' + HP_ID + '_' + Name, settingsdef[Name]);				

		if (typeof settingsdef[Name] == "boolean" && typeof settingscur[Name] != "boolean")
		    if (settingscur[Name] == '-1')
		        settingscur[Name] = true;
		    else
		        settingscur[Name] = false;
	}
	
	return settingscur[Name];
}

// Speichert eine Einstellung des aktuellen Accounts bzw globale einstellungen
function ogs_save(Name, Wert)
{
	if (typeof settingsdef[Name] == "undefined")
	{
	    GM_setValue('global_' + Name, Wert);
	    settingsglobalcur[Name] = Wert;
	}
	else
	{
	    if (!HP_ID) { return; }
	    GM_setValue(Server + '_' + HP_ID + '_' + Name, Wert);
	    settingscur[Name] = Wert;
	}
}

// Entferne die Tags aus dem Text
function TagsRaus(Text)
{
	return String(Text).replace(/<[^<>]*>/g, ''); // Tags entfernen
}

// erstellt ein neues Tag
function NeuesElement(Tag, Inhalt)
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
	
	if (NeuesElement.arguments.length > 2) // weitere Argumente der Funktion
	{
		for (var i = 2; i < NeuesElement.arguments.length - 1; i += 2) // alle diese Argumente
		{
			if (!NeuesElement.arguments[i + 1].length) { continue; }
			Neu.setAttribute(NeuesElement.arguments[i], NeuesElement.arguments[i + 1]); // dem Tag zuweisen
		}
	}
	
	return Neu; // zurueckgeben
}

// Verwandelt den uebergebenen Text in eine Ganzzahl
function InInt(Text)
{
	Text = TagsRaus(Text).replace(/[^0-9\-]/g, ''); // nicht-Ziffern entfernen
	return parseInt(Text, 10); // als Zahl zurueckgeben
}

// Berechnet den Stromverbrauch/Stromproduktion des Gebaeudes ID (1=Met, 2=Kris, 3=Deut, 4=Soli, 12=Fusi) auf der angegeben Stufe
function Energie(ID, Stufe)
{
    if (typeof EnergieBuffer[ID] != "undefined" && typeof EnergieBuffer[ID][Stufe] != "undefined")
        return EnergieBuffer[ID][Stufe];
    
    if (typeof EnergieBuffer[ID] == "undefined")
        EnergieBuffer[ID] = new Array();
    
    if (ID == 12)
    {
        var tech = ogs_split(ogs_load('forschung'),'|','&');
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
function Kosten(GSMet, GSKris, GSDeut, Faktor, Stufe)
{
    //return Stufe;
	var Baukosten = new Array(Math.floor(GSMet * Math.pow(Faktor, (Stufe - 1)), 0), Math.floor(GSKris * Math.pow(Faktor, (Stufe - 1)), 0), Math.floor(GSDeut * Math.pow(Faktor, (Stufe - 1)), 0)); // Kosten-Formel
	return Baukosten;
}

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

// Farbpruefung ob gueltiger Wert
function ColorChk(colnam)
{
	if (!(ColorConv(colnam)))
	{
		var colids = new Array ('aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow');
		var colval = new Array ('00FFFF', '000000', '0000FF', 'FF00FF', '808080', '008000', '00FF00', '800000', '000080', '808000', '800080', 'FF0000', 'C0C0C0', '008080', 'FFFFFF', 'FFFF00');
		var colchk = '';
		
		for (var i = 0; i < 16; i++)
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
	var colids = new Array ('aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow');
	var defcol = settingsdef[colnam];
	var curcol = ogs_load(colnam);
	var colchk = '(z.b. red, white, #FFCC00, ...)<br /><select style="color:' + ((curcol != 'transparent') ? curcol : '#3F3F3F') + ';" id="' + colnam + 'col" ';
	colchk += 'onchange="javascript: document.getElementById(\'' + colnam + '\').value = document.getElementById(\'' + colnam + 'col\').value; document.getElementById(\'' + colnam + 'col\').style.color = (document.getElementById(\'' + colnam + 'col\').value != \'transparent\') ? document.getElementById(\'' + colnam + 'col\').value : \'#3F3F3F\';">';
	colchk += '<option style="color:' + ((curcol != 'transparent') ? curcol : '#3F3F3F') + ';" value="' + curcol + '">Farbe</option>';
	
	for (var i = 0; i < 16; i++)
	{
		colchk += '<option style="color:' + colids[i] + '; background-color:#3F3F3F;" value ="' + colids[i] + '">' + colids[i] + '</option>';
	}
	
	if (transparent == true)
	{
		colchk += '<option style="color:#3F3F3F; background-color:#7F7F7F;" value ="transparent">transparent</option>';
	}
	
	colchk += '<option style="color:' + defcol + ';" value ="' + defcol + '">Default</option>';
	return colchk + '</select>';
}

// Finde den Plani mit diesen Koords
function FindePlaniMitKoords(Planis, Gala, Sys, Pos)
{
	var i = 1;
	if (FindePlaniMitKoords.arguments.length > 4) { i = FindePlaniMitKoords.arguments[4]; }
	
	for (; i < Planis.length; i++) // alle Planis durchgehen
	{
		if (Planis[i]['Gala'] == Gala && Planis[i]['Sys'] == Sys && Planis[i]['Pos'] == Pos) { return Planis[i]; } // falls die Koords stimmen, Plani zurueckgeben
	}
	
	return 0; // nichts zurueckgeben
}

// Finde den Plani mit dieser ID
function FindePlaniMitID(Planis, ID)
{
	for (var i = 1; i < Planis.length; i++) // alle Planis durchgehen
	{
		if (Planis[i]['ID'] == ID) { return Planis[i]; } // falls die ID stimmt, zurueckgeben
	}
	
	return 0; // nichts zurueckgeben
}

// fuege des neue Element hinter dem anderen ein
function EinfuegenHinter(Neu, Hinter)
{
	Hinter.parentNode.insertBefore(Neu, Hinter.nextSibling); // Element einfuegen
	return Neu; // Element zurueckgeben
}

// gibt die Y-Koordinate des angegebenen Elemnts zurueck
//		function GetY(element)
//		{
//			return element.offsetTop + ((element.nodeName == 'BODY') ? 0 : GetY(element.offsetParent)); // aktueller offset + den des Vorgaengers, falls wir nicht schon beim Body-Tag sind
//		}

// Eine Zahl zweistellig darstellen
function Zweistellig(Zahl)
{
	var Str = String((Zahl > 0) ? Zahl : 0); // Zahl in String verwandeln
	if (Str.length == 1) { Str = '0' + Str; } // falls dieser nur eine Stelle hat, eine 0 davorsetzen
	return Str; // Ergebnis zurueckgeben
}

// Loesche dieses Element
function Loesche(element)
{
	element.parentNode.removeChild(element); // Da nur Kindelemente geloescht werden koennen, wird vom Elternknoten her geloescht
}

// formatiere die uebergebene Zeit als Langdatum
function ZeitFormatieren(Zeit)
{
	var Wochentage = new Array('So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'); // Namen der Wochentage
	var Monate = new Array('Jan', 'Feb', 'M' + ae + 'r', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'); // Namen der Monate
	return Wochentage[Zeit.getDay()] + ' ' + Zeit.getDate() + ' ' + Monate[Zeit.getMonth()] + ' ' + Zeit.getHours() + ':' + Zweistellig(Zeit.getMinutes()) + ':' + Zweistellig(Zeit.getSeconds()); // Ausgabestring formatieren
}

// Finde heraus, wieviele Ressourcen welchen Typs der Spieler hat
function HoleRessourcen() // Finde heraus, wieviele Ressourcen welchen Typs der Spieler hat
{
	var Zellen = document.getElementById('resources'); //FindeXPath('//table[@id="resources"]/tbody/tr[3]/td');
	Zellen = Zellen.rows[2].cells;
	
	var Arr = new Array(); // zum Speichern der Zahlen
	
	for (var i = 0; i < 3; i++) // Zellen 0-2
	{
		Arr[i] = InInt(Zellen[i].innerHTML); // Inhalt in Ganzzahl verwandeln und speichern
	}
	
	var Werte = TagsRaus(Zellen[3].innerHTML).split('/'); // die Energie an dem / trennen
	Arr[4] = InInt(Werte[0]); // und jeweils als Ganzzahl speichern, die Gesamtmenge zuerst, da sie fuer die Gebaeude und Forschungen benoetigt wird
	Arr[3] = InInt(Werte[1]);
	return Arr; // Zahlen zurueckgeben
}

/*
Eine Plani-Liste hat folgendes Format:
Das Element 0 enthaelt die ID des HPs
Alle weiteren Elemente sind die Planeten und Monde des Spielers, aufgelistet in der Reihenfolge der Planiliste
Jeder Planet hat folgende Eigenschaften:
	Nr: Seine Nummer im Aray (PlaniListe[Plani['Nr']] == Plani)
	Name: Sein Name
	Gala, Sys, Pos: Seine Position (Gala:Sys:Pos)
	Koords: Die Position als Text
	ID: Seine ID
	URL: Die Url, die aufgerufen wird, um zu ihm zu wechseln
	Aktiv: Gibt an ob der Plani der aktivierte ist
	Partner: Immer 0 (wird spaeter verwendet)
*/
function HolePlaniListe()
{
	var PlaniNamen =  document.getElementsByTagName('select');
	if (!PlaniNamen.length) { return 0; } // falls keine Planiliste gefunden wurde, abbruch
	PlaniNamen = PlaniNamen[0].options;
	var PlaniListe = new Array(); // Array zur Speicherung der Planis, das erste Element speichert die kleinste ID (also die des HP)
	PlaniListe[0] = 0;
	
	for (var i = 0; i < PlaniNamen.length; i++) // Ueber alle Planis des Spielers
	{
		// Daten extrahieren
		if (!(PlaniNamen[i].value.indexOf('/game/') + 1 )) { return 0; } // falls dies kein Teil des Planinamens ist, Abbruch
		var Daten = PlaniNamen[i].firstChild.nodeValue.match(/([a-zA-Z0-9 \.\-\_\(\)]+)[\s]+\[([0-9]{1,2}):([0-9]{1,3}):([0-9]{1,2})\]/); // Name und Koords rausfinden, sie stehen im angezeigten Text
		
		if (!Daten) { continue; }
		var ID = PlaniNamen[i].value.match(/cp=([0-9]+)/); // Plani-ID rausfinden
		if (!ID) { continue; }
		
		// Daten speichern
		Plani = new Array();
		Plani['Nr'] = PlaniListe.length;
		Plani['Name'] = Daten[1];
		Plani['Gala'] = parseInt(Daten[2], 10);
		Plani['Sys'] = parseInt(Daten[3], 10);
		Plani['Pos'] = parseInt(Daten[4], 10);
		Plani['Koords'] = Plani['Gala'] + ':' + Plani['Sys'] + ':' + Plani['Pos'];
		Plani['ID'] = parseInt(ID[1], 10);
		Plani['URL'] = PlaniNamen[i].value;
		Plani['Aktiv'] = (PlaniNamen[i].selected == true);
		Plani['Partner'] = 0;
		
		// die kleinste ID ermitteln
		if (!PlaniListe[0] || PlaniListe[0] > Plani['ID']) { PlaniListe[0] = Plani['ID']; }
		// Plani hinzufuegen
		PlaniListe[PlaniListe.length] = Plani;
	}
	
	return PlaniListe; // Liste der Planis zurueckgeben
}

/*
Die erweiterte Plani-Liste des ersten Durchlaufs fuegt folgende Eigenschaften zu den Planis hinzu:
	Partner: 0 wenn der Plani keinen Partner hat (der Partner eines Mondes ist der Plani auf denselben Koords, der Partner eines Plansis der dazugehoerige Mond), ansonsten die Nummer des Partners
	HP: Gibt an, ob der Plani der HP ist
	Typ: Ist gleich Typ_Plani, wenn es sich um einen Plani handelt, und gleich Typ_Mond, wenn es ein Mond ist
*/
function LadePlanis(PlaniListe)
{
	// Im ersten Durchlauf werden die Partnerplanis gefunden und ihre Typen (Plani oder Mond) gespeichert und die Nummer des HPs rausgefunden
	var HP_Nummer = 0;
	
	for (var i = 1; i < PlaniListe.length; i++)
	{
		var Plani = PlaniListe[i];
		Plani['HP'] = (Plani['ID'] == PlaniListe[0]);
		if (Plani['HP']) { HP_Nummer = i; }
		if (Plani['Partner']) { continue; } // dieser Plani hat schon einen Partner
		var Partner = FindePlaniMitKoords(PlaniListe, Plani['Gala'], Plani['Sys'], Plani['Pos'], i + 1); // nur hinter dem aktuellen Plani suchen
		
		if (!Partner)
		{
			Plani['Typ'] = Typ_Plani; // Planis ohne Partner koennen keine Monde sein
			continue; // kein Partner gefunden
		}
		
		// Die Nummern speichern
		Plani['Partner'] = Partner['Nr'];
		Partner['Partner'] = Plani['Nr'];
		
		// anhand der IDs die Typen bestimmen
		if (Partner['ID'] > Plani['ID'])
		{
			Partner['Typ'] = Typ_Mond;
			Plani['Typ'] = Typ_Plani;
		}
		else
		{
			Partner['Typ'] = Typ_Plani;
			Plani['Typ'] = Typ_Mond;
		}
	}
	if (!HP_Nummer) { return 0; }

	/*
	Die sortierte Plani-Liste des zweiten Durchlaufs aendert das Element 0 der Liste, ihre Reihenfolge und fuegt eine Eigenschaft hinzu
	Der HP wird falls gewuenscht an den Anfang gesetzt, und alle Monde werden direkt hinter ihren Plani gesetzt
	Das Element 0 enthaeklt folgende Eigenschaften:
		HP: Nummer des HPs
		Aktiv: Nummer des aktven Planis
	Die den Planis hinzugefuegte Eigenschaft ist
		Text: Speichert den in der Auswahlliste anzuzeigenen Text entsprechend der Einstellungen (ohne Einrueckung der Monde)
	*/
	// im zweiten Durchlauf werden die Liste umsortiert (HP an den Anfang, Monde zu den Planis) und die Namen angepasst
	var HPNachOben = ogs_load('hp_oben');
	var KeinePlaniNamen = ogs_load('keine_planinamen');
	var Planis = new Array(new Array()); // das erste Element speichert die Nummer des HPs und des aktiven Planis
	Planis[0]['HP'] = HP_Nummer;
	
	// Hilfsfunktion zum Hinzufuegen eines Planis samt Mond
	function FuegeHinzu(Plani)
	{
		if (Plani['Typ'] != Typ_Plani) { return; }
		
		// Eigenschaften des Planis anpassen
		Plani['Nr'] = Planis.length;
		if (Plani['Aktiv']) { Planis[0]['Aktiv'] = Plani['Nr']; }
		
		// Text bestimmen
		if (KeinePlaniNamen) // nur die Koords als Text
		{
			Plani['Text'] = Plani['Koords'];
		}
		else // der Text besteht aus Name und Koords
		{
			Plani['Text'] = Plani['Name'] + ' [' + Plani['Koords'] + ']';
		}
		
		// Plani speichern
		Planis[Planis.length] = Plani;
		if (Plani['Partner']) // falls der Plani einen Partner hat (das muss ein Mond sein, da der Plani selbst kein Mond sein kann)
		{
			var Partner = PlaniListe[Plani['Partner']];
			
			// Eigenschaften des Partner anpassen
			Partner['Nr'] = Planis.length;
			Partner['Partner'] = Plani['Nr'];
			Plani['Partner'] = Partner['Nr'];
			if (Partner['Aktiv']) { Planis[0]['Aktiv'] = Partner['Nr']; }
			
			// Den Namen korrigieren (das " (Mond)" am Ende wegmachen)
			var Name = Partner['Name'].match(/([a-zA-Z0-9 \.\-\_\(\)]+)( \([A-Za-z]+\))/);
			if (Name) { Partner['Name'] = Name[1]; }
			
			// Text bestimmen
			if (KeinePlaniNamen) // nur die Koords als Text
			{
				Partner['Text'] = Partner['Koords'] + ' (M)';
			}
			else // der Text besteht aus Name und Koords
			{
				Partner['Text'] = Partner['Name'] + ' [' + Partner['Koords'] + ']';
			}
			
			// Plani speichern
			Planis[Planis.length] = Partner;
		}
	}
	
	if (HPNachOben) { FuegeHinzu(PlaniListe[HP_Nummer]); }
	
	for (var i = 1; i < PlaniListe.length; i++)
	{
		var Plani = PlaniListe[i];
		if (HPNachOben && Plani['HP']) { continue; } // es werden nur Planis behandelt, und falls der HP an den Anfang kommt wird er uebersprungen
		FuegeHinzu(Plani);
	}
	
	return Planis;
}

// Breite einer Tabelle anhand der Einstellungen etc. berechnen
function TabBreite(Max, Min)
{
	return Math.max(Math.min(Math.min(ogs_load('max_tab_breite'), Max), document.body.clientWidth-10), Min);
}

// Differenz Serverzeit <-> lokale Zeit bestimmen
function LeseZeitDiff()
{
	var ZeitZelle = getEBF(document, 'th','colSpan == 3')[0]; //FindeXPath('//table/tbody/tr/th[@colspan=3]')[0];
	var ServerZeit = LeseZeit(ZeitZelle.firstChild.nodeValue);
	
	return (ogs_startZeit.getTime() - ServerZeit.getTime());
}

// Aktuelle Lokalzeit bestimmen
function GetAktZeit()
{
	if (!isNaN(ZeitDiff))
	{
		return new Date(new Date().getTime() - ZeitDiff);
	}
	else
	{
	    return new Date();
	}
}

// Zeitstring auslesen und als Zahl formatiert zurueckgeben
function LeseZeit(Str)
{
	var Monate = new Array();
	Monate['Jan'] = 0; Monate['Feb'] = 1; Monate['Mar'] = 2; Monate['Apr'] = 3; Monate['May'] = 4; Monate['Jun'] = 5; Monate['Jul'] = 6; Monate['Aug'] = 7; Monate['Sep'] = 8; Monate['Oct'] = 9; Monate['Nov'] = 10; Monate['Dec'] = 11;
	var ZeitStr = Str.match(/[a-zA-Z]{3} ([a-zA-Z]{3}) ([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/);
	var Zeit = new Date();
    Zeit = new Date(Zeit.getYear() + 1900, Monate[ZeitStr[1]], ZeitStr[2], ZeitStr[3], ZeitStr[4], ZeitStr[5]);
	return Zeit;
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

// Uhrzeiten von Ankuenften und Fertigstellungen berechnen, original von xsign.dll
function aTimeStamp(usetime) //d, h, m, s)
{
	if (!ogs_load('endzeiten')) return '';
	
	var zus = '<br /><font color="' + TextCol + '">';
	var now = GetAktZeit();
	//var fin = Date.parse(now) + (d * 86400 + h * 3600 + m * 60 + s) * 1000;
	//var ats = new Date(fin);
	var ats = usetime; //new Date(usetime);
	var aday = ats.getDate();
	zus += (aday != now.getDate()) ? aday + '.' + (ats.getMonth() + 1) + '&nbsp;': '';
	var ah = ats.getHours();
	var am = ats.getMinutes();
	var as = ats.getSeconds();
	if (ah < 10) { ah = '0' + ah }
	if (am < 10) { am = '0' + am }
	if (as < 10) { as = '0' + as }
	zus += '' + ah + ':' + am + ':' + as + '</font>';
	return zus;
}

function aTimeStampTextOnly(s)
{
	if (!ogs_load('endzeiten')) return '';
	
	var zus = '<br /><font color="' + TextCol + '">';
	var now = GetAktZeit();
	var fin = Date.parse(now) + s * 1000;
	var ats = new Date(fin);
	var aday = ats.getDate();
	zus += (aday != now.getDate()) ? aday + '.' + (ats.getMonth() + 1) + '.<br />': '';
	var ah = ats.getHours();
	var am = ats.getMinutes();
	var as = ats.getSeconds();
	if (ah < 10) { ah = '0' + ah }
	if (am < 10) { am = '0' + am }
	if (as < 10) { as = '0' + as }
	zus += '' + ah + ':' + am + ':' + as + '</font>';
	return zus;
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

function ogs_join(join, join1, join2)
{
    var str = '';
    
    for (var i = 0; i < join.length; i++)
    {
        str += join[i].join(join2) + join1;
    }
    
    return str;
}

function ogs_getLink(url)
{
    if (ogs_load('dereferer_use') == true)
    {
        url = url.replace(/ /g,'%2520'); // leerzeichen ersetzen
        url = url.replace(/&/g,'%26');   // & ersetzten
        return ogs_load('dereferer_url') + url;
    }
    
    return url;
}

function ogs_FlottenFaerben()
{
    var ret = '';
    var typArt = new Array('.flight','.return','.holding');
    var typStyle = new Array('font-style: normal !important;','font-style: italic !important;');
    var typTransform = new Array('text-transform: none !important;','text-transform: uppercase !important;','text-transform: lowercase !important;'); //,'text-transform: capitalize;'
    var typDecoration = new Array('text-decoration: none !important;','text-decoration: underline !important;','text-decoration: overline !important;','text-decoration: line-through !important;','text-decoration: blink !important;');
    var typSize = new Array('font-size: inherit !important;','font-size: larger !important;','font-size: smaller !important;'); //font-size: medium;
    
    var thisdata = ogs_load('uebersicht_flotten_farben');
   
    if (thisdata.trim() == '')
        thisdata = settingsdef['uebersicht_flotten_farben'];
    
	var data = ogs_split(thisdata,'|','&');
	delete thisdata;
	
	ogs_load('flotten_zusatz');
	ogs_load('skin_advance');
	ogs_load('flotten_faerben');
	
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
				    ret += 'color: ' + TextCol + ' !important;}';
		    }
	    }
	}
    
	GM_addStyle(ret);
}

//durchsucht die childnodes nach dem jeweiligen tagname
//getChildElementsByFunction

function getCEBF(element, name)
{
    var Erg = new Array();
    
    //if (typeof func == "string")
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
    else if (typeof name == "function")
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

function getEBF(element, name, att)
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
    //alert(func);
    return Erg;
}



//*********************************************************************************************************************
//                                            Funktionsabsatz - Skriptfunktionen
//*********************************************************************************************************************

//-----------------------------
// Notizen richtig anzeigen
//-----------------------------
function ogs_notizen()
{
	var ContDiv = document.getElementById('content');
	
	ContDiv.style.position = "relative";
	ContDiv.style.overflow = "visible";
}

//-----------------------------
// Phalanx erweitern
//-----------------------------
function ogs_phalanx()
{
    TextCol = ogs_load('skriptcolor');
    
    if (ogs_load('endzeiten'))
    {
        function aTimeStampPhalanx(st1, st2)
        {
	        var zus = '<font color="' + TextCol + '">';
	        var now = GetAktZeit();
	        var fin = Date.parse(now) + (st1) * 1000;
	        var ats = new Date(fin);
	        var aday = ats.getDate();
	        zus += (aday != now.getDate()) ? aday + '.' + (ats.getMonth() + 1) + '<br />': '';
	        var ah = ats.getHours();
	        var am = ats.getMinutes();
	        var as = ats.getSeconds();
	        if (ah < 10) { ah = '0' + ah }
	        if (am < 10) { am = '0' + am }
	        if (as < 10) { as = '0' + as }
	        zus += '' + ah + ':' + am + ':' + as + '</font>';
	        return zus;
        }
        
	    // Zeitdifferenz bestimmen
	    ZeitDiff = parseInt(ogs_load('zeit_diff'),10); //ZeitDiff = ogs_load('zeit_diff');
        var vBXX = getEBF(document,'div','id.match(/bxx/)'); //FindeXPath('//div[contains(@id, "bxx")]');
        
	    for (var i = 0; i < vBXX.length; i++)
	    {
		    var s1 = parseInt(vBXX[i].getAttribute('title'));
		    var s2 = parseInt(vBXX[i].getAttribute('star'));
    		
            var vP = document.createElement('b');
            vP.innerHTML = aTimeStampPhalanx(s1, s2);
            vBXX[i].parentNode.appendChild(vP);
        }
	}
	
	if (ogs_load('flotten_zusatz') && ogs_load('skin_advance'))
	{
        ogs_load('flotten_zusatz');
        
	    var Links = document.getElementsByTagName('a');
		
	    for (var i = 0; i < Links.length; i++)
	    {
		    if (!Links[i].title || Links[i].title.search(/^[0-9]+$/) + 1) { continue; } // bei nur aus Zahlen bestehenden Titeln nichts tun (das sind die Counter)
			
			Links[i].title = Links[i].title.replace(/([0-9])([A-Z])/g, '$1, $2');
			Links[i].title = Links[i].title.replace(/Anzahl der Schiffe ([0-9]+)/g, 'Anzahl der Schiffe $1: ');
	    }
	}
	
	if (ogs_load('flotten_faerben') || (ogs_load('flotten_zusatz') && ogs_load('skin_advance')))
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
        if (csslinks[i].href == "http://80.237.203.201/download/use/evolution/formate.css")
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
    if (ogs_load('selectuniverse'))
    {
        var uniselect = document.getElementsByName('universe');

        if (uniselect.length > 0)
        {
            uniselect = uniselect[0];
            
            function saveUni()
            {
                if (confirm('"' + uniselect.value + '" als Standard-Universum ausw\u00E4hlen?\n\nEs wird nur die Nummer des Universums gespeichert.\n(kein Spielername und kein Passwort!)'))
                    ogs_save('universe', uniselect.selectedIndex);
            }
            
            var mainMenu = document.getElementById('mainmenu');
            if (mainMenu != null)
            {
                var mainMenuA = document.createElement('a');
                mainMenuA.href = "#";
                mainMenuA.innerHTML  = "OGS: Save Uni";
                addEvent(mainMenuA,'click', saveUni, false);
                mainMenu.appendChild(mainMenuA);
            }
            
            var value = ogs_load('universe');
            
            if (value >= 0 && uniselect.length > value)
                uniselect.selectedIndex = value;
            
        }
    }
    
    if (ogs_load('fokusonlogin'))
    {
        var loginbutton = document.getElementById('button');
        
        if (loginbutton != null)
            loginbutton.focus();
    }
    
    return;
}































function ogameskript()
{
	//------------------
	// allgemeines Zeug
	//------------------
	// Ersatz fuer fruehere Body Var
	// oGame v0.77 content fix (original by xsign.dll) + leftmenu fix
	var ContDiv = document.getElementById('content'); //FindeXPath('//div[@id="content"]')[0];
	var LeftDiv = document.getElementById('menu'); //FindeXPath('//div[@id="menu"]')[0];

	if (ogs_browser == "ff")
	{
	    ContDiv.style.position = "relative";
	    ContDiv.style.overflow = "visible";
	    
        LeftDiv.style.position = (ogs_load('left_menu_fix')) ? "fixed" : "absolute";
        LeftDiv.style.overflow = "visible";
	}
	else if (ogs_browser == "ie")
	{
	}
    else
    {
        debug("Unsupported Web-Browser");
    }
	
	// Loeschen von <br><br><br><br> im oGame v0.77b Design
	var ContDivBr1 = getCEBF(ContDiv,'center');
	
	if (ContDivBr1.length > 0)
	{
	    var ContDivBr = getCEBF(ContDivBr1[0], 'br'); //FindeXPath('//div[@id="content"]/center/br');
	    for (var i = 0; i < ContDivBr.length; i++)
	    {
	        Loesche(ContDivBr[i]);
        }
    	
    	var ContDivBr1 = getCEBF(ContDivBr1[0],'center');
	    if (ContDivBr1.length > 0)
	    {
	        ContDivBr = getCEBF(ContDivBr1[0], 'br'); //FindeXPath('//div[@id="content"]/center/center/br');
	        for (var i = 0; i < ContDivBr.length; i++)
	        {
	            Loesche(ContDivBr[i]);
            }
        	
    	    var ContDivBr1 = getCEBF(ContDivBr1[0],'form');
	        if (ContDivBr1.length > 0)
	        {
		        ContDivBr = getCEBF(ContDivBr1[0], 'br'); //FindeXPath('//div[@id="content"]/center/center/form/br');
	            for (var i = 0; i < ContDivBr.length; i++)
	            {
	                Loesche(ContDivBr[i]);
    	        }
            }
	    }
	}
	
	// Textfarbe der eingefuegten Skripterweiterungen laden
	TextCol = ogs_load('skriptcolor');
	
	// Zeitdifferenz bestimmen
	//ZeitDiff = ogs_load('zeit_diff');
    ZeitDiff = parseInt(ogs_load('zeit_diff'),10);
    
	if (Datei == 'overview')
	{
		ZeitDiff = LeseZeitDiff();
		ogs_save('zeit_diff', '' + ZeitDiff);
	}
	
	//-----
	// GPL
	//-----
	if (!ogs_load('gpl') && ogs_load('version'))
	{
		alert('OGame-Skript v' + ogs_load('version') + ', Copyright (C) 2006-2007 Windows-zerstoerer, ab M' + ae + 'rz 2007 Eleria & Co, ab Juli 2007 hakaz & User-Gruppe des OGame-Forums\nF' + ue + 'r das OGame-Skript besteht KEINERLEI GARANTIE. OGame-Skript ist freie Software, die du unter bestimmten Bedingungen weitergeben darfst. Weitere Details findest du im Einstellungen-Men' + ue + ' unten. Mit der Verwendung des Skriptes werden die Bedingungen der GPL aktzeptiert.');
		ogs_save('gpl', 1);
	}
	
	//----------------------------------------
	// Planiliste und Planiauswahl bearbeiten
	//----------------------------------------
	// falls das Plani-Array gueltig ist - in diesem Fall gibt es eine Auswahlliste
	if (PlaniListe)
	{
		Planis = LadePlanis(PlaniListe);
		
		// eigentlich kann das garnicht passieren, aber man weiss ja nie
		if (!Planis) return;
		
		ogs_load('def_plani');
		AktPlani = Planis[Planis[0]['Aktiv']];
		DefPlani = FindePlaniMitID(Planis, ((settingscur['def_plani'] > 0) ? settingscur['def_plani'] : HP_ID));
		
		if (ogs_load('planiliste_aend'))
		{
			// fuegt Schalter rund um das Planimenue ein
			var AktNr = Planis[0]['Aktiv'];
			var AufMond = (AktPlani['Typ'] == Typ_Mond);
			
			var Select = document.getElementsByTagName('select')[0]; // das Dropdown-Menue zur Planiauswahl - darum kommen die Schalter
			Select.parentNode.style.textAlign = 'center'; // Text zentrieren
			Select.parentNode.style.whiteSpace = 'nowrap'; // kein Zeilenumbruch
			
			if (AktPlani['Partner']) // bei Planis mit Mond und bei Monden kommt oben noch was daruf
			{
				var Partner = Planis[AktPlani['Partner']];
				Select.parentNode.insertBefore(NeuesElement('a', AufMond ? ('zum Plani ' + Partner['Name']) : ('zum Mond ' + Partner['Name']), 'href', Partner['URL'], 'id', 'MondPlani'), Select); // Link vor der Dropwdown-Liste einfgen
				Select.parentNode.insertBefore(document.createElement('br'), Select); // Zeilenumbruch vor der Dropwdown-Liste einfgen
			}
			
			if (!AufMond || (AufMond && ogs_load('monde_getrennt'))) // Monde bekommen nur dann LinksRechts-Schalter wenn sie getrennt dargestellt werden
			{
				var VorhURL = 0, NachURL = 0; // erstmal kein vorheriger/naechster Plani/Mond
				
				// Vorherigen und naechsten Plani desselben Typs finden
				for (var Nr = AktNr - 1; Nr > 0; Nr--)
				{
					if (Planis[Nr]['Typ'] == AktPlani['Typ']) { VorhURL = Planis[Nr]['URL']; break; }
				}
				
				for (var Nr = AktNr + 1; Nr < Planis.length; Nr++)
				{
					if (Planis[Nr]['Typ'] == AktPlani['Typ']) { NachURL = Planis[Nr]['URL']; break; }
				}
				
				if (VorhURL)
				{
					Select.parentNode.insertBefore(NeuesElement('a', '&lt;&lt;', 'href', VorhURL, 'id', 'VorhURL'), Select); // Link vor der Dropwdown-Liste einfuegen
				}
				
				if (NachURL)
				{
					EinfuegenHinter(NeuesElement('a', '&gt;&gt;', 'href', NachURL, 'id', 'NachURL'), Select); // Link nach der Dropdown-Liste einfgen
				}
			}
			
			// Erstellt das Menue aus der extrahierten Planiliste erneut
			var MondeGetrennt = ogs_load('monde_getrennt');
			
			// alle Eintraege der Liste entfernen
			while (Select.childNodes.length > 0) 
			{
				Select.removeChild(Select.childNodes[0]);
			}
			
			// Ueber alle Planis
			for (var i = 1; i < Planis.length; i++)
			{
				if (MondeGetrennt && Planis[i]['Typ'] != Typ_Plani) { continue; }
				var EintrText = (Planis[i]['Typ'] == Typ_Plani) ? Planis[i]['Text'] : ' - ' + Planis[i]['Text'];
				var Eintrag = NeuesElement('option', EintrText, 'value', Planis[i]['URL']); // Eintrag erzeugen
				if (Planis[i]['Aktiv']) Eintrag.setAttribute('selected', 'selected'); // falls es der aktive Plani ist, markieren
				if (Planis[i]['HP']) Eintrag.style.fontWeight = 'bold'; // den HP fett machen
				Select.appendChild(Eintrag); // Eintrag einfuegen
			}
			
			if (MondeGetrennt)
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
				for (var i = 1; i < Planis.length; i++)  // Ueber alle Planis
				{
					if (Planis[i]['Typ'] != Typ_Mond) { continue; }
					
					if (!HabTrenner)
					{
						Select.appendChild(NeuesElement('option', ' ', 'value', ''));
						HabTrenner = true;
					}
					
					var Eintrag = NeuesElement('option', Planis[i]['Text'], 'value', Planis[i]['URL']);
					if (Planis[i]['Aktiv']) { Eintrag.setAttribute('selected', 'selected'); } // falls es der aktive Mond ist, markieren
					Select.appendChild(Eintrag); // Eintrag einfuegen
				}
			}
		}
	}
	
	// Zeit im linken Menu anzeigen
	if (ogs_load('zeit_links')) // Zeit im NaviMenue anzeigen
	{
		function ZeitAktualisieren2() // aktualisiere die aktuelle Uhrzeit
		{
			document.getElementById('akt_zeit').innerHTML = ZeitFormatieren(GetAktZeit()); // Ankunfszeit formatieren und anzeigen
			window.setTimeout(ZeitAktualisieren2, 999);
		}
		
		var Zeitzeile = document.getElementsByTagName('nobr')[0]; // Absatz mit der OGame-Version finden
		
		if (Zeitzeile) 
		{
			Zeitzeile.innerHTML += '<br /><b><span style="color:' + TextCol + ';" id="akt_zeit">-</span></b>';
			ZeitAktualisieren2();
		}
	}
	
	//MenÃ¼zeilen eintrÃ¤ge anzeigen!
    ogs_load('pranger');
    
    if (ogs_load('menu_link_enable') || settingscur['pranger'])
    {
        //menÃ¼table laden
        var vMenu = document.getElementById('menu').getElementsByTagName('table')[0];
        var vMenuMode = false;
        
        if (ogs_load('menu_link_pos') > -1 && vMenu.rows.length > settingscur['menu_link_pos'])
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
	        vTd.innerHTML = '<div align="center"><font color="#FFFFFF"><a href="/game/pranger.php" target="_blank">Pilori</a></font></div>';
            
            if (vMenuMode)
                vMenu.parentNode.insertBefore(vTr,vMenu);
            else
                vMenu.appendChild(vTr);
        }

        if (settingscur['menu_link_enable'])
        {
            var vMenuData = ogs_split(ogs_load('menu_link_liste'),'|','&');
            
	        for (var i = 0; i < vMenuData.length; i++)
	        {
		        if (vMenuData[i].length == 2 && vMenuData[i][0] != '' && vMenuData[i][1] != '') 
		        {
			        var vTr = document.createElement('tr');
			        var vTd = document.createElement('td');
			        vTr.appendChild(vTd);
			        vTd.innerHTML = '<div align="center"><font color="#FFFFFF"><a href="' + ogs_getLink(vMenuData[i][1]) + '" target="_blank">'+vMenuData[i][0]+'</a></font></div>';
                    
                    if (vMenuMode)
                        vMenu.parentNode.insertBefore(vTr,vMenu);
                    else
                        vMenu.appendChild(vTr);
		        }
	        }
	    }
    }
	
	// In der Schiffsauswahl
	if (Datei == 'flotten1')
	{
		// Fuegt einen weiteren Button "ben" ein, berechnet Laderaumkapazitaet der ausgewaehlten Schiffe
		var AnzeigeKap = getEBF(ContDiv,'table','width == 519'); //FindeXPath('//table[@width="519"]');
		
		//Vertauscht die Anzeigen im Flotten 1 MenÃ¼
		if (ogs_load('flotte_seite1_upsidedown')) AnzeigeKap[0].parentNode.appendChild(AnzeigeKap[0]);
			
		//Loesche(AnzeigeKap0);	
		if (AnzeigeKap[1].innerHTML.match(/Flottenverband/))
		{
		    AnzeigeKap = AnzeigeKap[2];
		}
		else
		{
		    AnzeigeKap = AnzeigeKap[1];
		}
		
		//IETODO
		AnzeigeKap.innerHTML = AnzeigeKap.innerHTML.replace('Alle Schiffe</a>', 'Alle Schiffe</a></th></tr><tr height="20"><th colspan="4">Gew&auml;hlte Ladekapazit&auml;t <div id="storage" style="color:lime;">0</div>');
		
		var BerKap = 'function () { window.setTimeout(function() { var z = 0';
		var Ress = HoleRessourcen(); // vorhandene Ressourcen bestimmen
		var RessSumme = Ress[0] + Ress[1] + ((!ogs_load('kein_deut')) ? Ress[2] : 0); // Summe der Ressourcen bestimmen, Deut nur einrechnen falls es nicht deaktiviert wurde
		var Links = getEBF(ContDiv,'a','href.match(/javascript:maxShip\\(/)'); //FindeXPath('//tbody/tr/th/a[contains(@href,"javascript:maxShip(")]'); // "max"-Links finden
		
		for (var i = 0; i < Links.length; i++) // Ueber alle max-Links
		{
			var ID = Links[i].href.match(/ship([0-9]+)/)[1]; // Schiffs-ID bestimmen
			if (ID != 210)
			{
			    BerKap += ' + (' + document.getElementsByName('capacity' + ID)[0].value + ' * document.getElementsByName(\'ship' + ID + '\')[0].value)';
			}
			
			if (ID == 202 || ID == 203 || ID == 209) // fuer kleine und grosse Transporter
			{
				var BenSchiffe; // benoetigte Anzahl Schiffe
				
				switch(ID)
				{
					case '202': BenSchiffe = Math.ceil(RessSumme / 5000); // vollen Laderaum verwenden - schliesslich kommt der Treibstoff ja auch in den Laderaum
					break;
					
					case '203': BenSchiffe = Math.ceil(RessSumme / 25000);
					break;
					
					default: BenSchiffe = Math.ceil(RessSumme / 20000);
					break;
				}
				
				var Vorhanden = document.getElementsByName('maxship' + ID)[0].value; // vorhandene Anzahl Schiffe
				// Linkziel ist ein JavaScript, das die Schiffsanzahl entsprechend setzt
				var url = 'javascript: void(document.getElementsByName("ship' + ID + '")[0].value = ' + Math.min(Vorhanden, BenSchiffe) + ');';
				var tooltiptext = '<table width=\\\'100%\\\'><tr><td><center>';
				
				if (Vorhanden < BenSchiffe) // evntl. Warnung einfuegen und Link roeten
				{
					//if (!ogs_load('warnung')) //WARNUNG
					//{
					//    url += 'alert("Achtung: Es sind nicht gen' + ue + 'gend Schiffe vorhanden.");';
					//}
					var farbe = 'color: red;';
                    tooltiptext += 'Gereken Gemi: ' + BenSchiffe + '<br />Sahip oldugun: ' + Vorhanden + '<br />eksik olan: <font style=\\\''+farbe+'\\\'>'+(BenSchiffe - Vorhanden)+'</font>';
				}
				else
                {
    				var farbe = 'color: green;';
                    tooltiptext += 'erforderlich: ' + BenSchiffe;
                }
                
                tooltiptext += '</center></td></tr></table>';
                url += 'BerKap();';
                
				Links[i].parentNode.appendChild(NeuesElement('a', 'ok', 'href', url, 'onmouseover', 'return overlib(\''+tooltiptext+'\');', 'onmouseout', 'return nd();', 'style', farbe)); // Link einfuegen
			}
		}
		
		BerKap += '; z = String(Number(z)); var i = z.length % 3; if (!i) { i = 3; } var erg = z.substr(0, i); for (; i < z.length; i += 3) { erg += \'.\' + z.substr(i, 3); } document.getElementById(\'storage\').innerHTML = erg; }, 50); }';
		BerKap = eval(BerKap);
		unsafeWindow.BerKap = BerKap;
		
		var Anzahl = getEBF(ContDiv, 'input', 'size == 10 && knoten.name.match(/ship/)');  //FindeXPath('//tbody/tr/th/input[@size="10"][contains(@name,"ship")]'); // Event onchange fuer Berechnung der Ladekapazitaet ueber Input, geht nicht ueber innerHTML
		for (var i = 0; i < Anzahl.length; i++)
		{
			addEvent(Anzahl[i],'change', BerKap, true);
		}
		
		var Anzahl = getEBF(ContDiv, 'a', 'href.match(/Ship/)'); //FindeXPath('//table[@width="519"]/tbody/tr/th/a[contains(@href,"Ship")]'); // Event onclick fuer Berechnung der Ladekapazitaet ueber Link, geht nicht ueber innerHTML
		for (var i = 0; i < Anzahl.length; i++)
		{
			addEvent(Anzahl[i],'click', BerKap, true);
		}
		
		// Ankunftszeit bei Rueckruf, original von xsign.dll
		function RTime()
		{
			var rbutton = document.getElementsByName('order_return'); //FindeXPath('//table[@width="519"]/tbody/tr/th[8]/form[1]/input');
			if(rbutton.length == 0) return;
			
			var curdate = GetAktZeit();
			
			for (var i = 0; i < rbutton.length; i++)
			{
				var senddate = LeseZeit(rbutton[i].parentNode.parentNode.parentNode.getElementsByTagName('th')[4].innerHTML);
				var ankfdate = LeseZeit(rbutton[i].parentNode.parentNode.parentNode.getElementsByTagName('th')[6].innerHTML);
				
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
				    var zus = '<br /><font color="' + TextCol + '">';
				    zus += (rdate.getDate() != curdate.getDate()) ? rdate.getDate() + '.' + (rdate.getMonth() + 1) + '.' : '&nbsp;';
				    var rh = rdate.getHours();
				    var rm = rdate.getMinutes();
				    var rs = rdate.getSeconds();
				    if (rh < 10) { rh = '0' + rh; }
				    if (rm < 10) { rm = '0' + rm; }
				    if (rs < 10) { rs = '0' + rs; }
				    zus += '<br />' + rh + ':' + rm + ':' + rs + '</font>';
				    var rspan = document.getElementById('sp' + i);
				    
				    if (rspan)
				    {
					    rspan.innerHTML = zus;
				    }
				    else
				    {
					    rbutton[i].parentNode.parentNode.innerHTML = rbutton[i].parentNode.parentNode.innerHTML.replace('ruf" type="submit">', 'ruf" type="submit"><span id="sp' + i + '">' + zus + '</span>');
				    }
				}
				else
				{
				    var rspan = document.getElementById('sp' + i);
				    if (rspan)
				    {
    					rspan.innerHTML = '';
    			    }
				}
			}
		}
		
		if (ogs_load('ankft_zeit'))
		{
		    RTime();
		    window.setInterval(RTime, 499);
		}
	}
	
	if (((Datei == 'flotten2' && Planis ) || (Datei == 'flotten3')) && unsafeWindow.shortInfo)
	{
		if (ogs_load('flotte_schiffauswahl'))
		{
		    var Schiffe = new Array();
		    Schiffe['namen'] = new Array('Kleiner Transporter', 'Gro' + sz + 'er Transporter', 'Leichter J' + ae + 'ger', 'Schwerer J' + ae + 'ger', 'Kreuzer', 'Schlachtschiff', 'Kolonieschiff', 'Recycler', 'Spionagesonde', 'Bomber', 'Solarsatellit', 'Zerst' + oe + 'rer', 'Todesstern', 'Schlachtkreuzer');
		    Schiffe['ids'] = new Array(202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215);
            var Unterwegs = new Array('<tr><td class="c" colspan="2">Schiffe</td></tr>');
            
            for (var i = 0; i < Schiffe['ids'].length; i++)
            {
                var ship = document.getElementsByName('ship'+Schiffe['ids'][i]);
                if (ship.length > 0)
                {
                    Unterwegs.push('<tr><th>'+Schiffe['namen'][i]+'</th><th>'+ship[0].value+'</th></tr>');
                }
            }
                        
			var ContDivCtr = ContDiv.getElementsByTagName('center')[0];
			ContDivCtr.appendChild(document.createElement('br'));
			NeueZeile = NeuesElement('table', '', 'align', 'center', 'width', '519');
			NeueZeile.innerHTML = Unterwegs.join('');
			ContDivCtr.appendChild(NeueZeile);
		}
		
		if (Datei == 'flotten3' && ogs_load('flotte_seite3_zeiten'))
		{
			ContDivCtr.appendChild(document.createElement('br'));
			NeueZeile = NeuesElement('table', '', 'align', 'center', 'width', '519');
			NeueZeile.innerHTML = '<tr><td class="c" colspan="2">Zeiten</td></tr><tr><th>Dauer (eine Strecke)</th><th id="duration">-</th></tr><tr><th>Ankunft (Ziel)</th><th id="ankunft_ziel">-</th></tr><tr><th>Ankunft (Ursprung)</th><th id="ankunft_ursprung">-</th></tr>'
			ContDivCtr.appendChild(NeueZeile);

            var seconds = unsafeWindow.duration();
            var hours = Math.floor(seconds / 3600);
            seconds -= hours * 3600;
            var minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            document.getElementById("duration").innerHTML = hours + ":" + minutes + ":" + seconds + " h";
			
			function AnzeigeAktualisieren()
			{
				var Flugzeit = parseInt(unsafeWindow.duration());
				
				// Zeiten aktualisieren
				var AktZeit = GetAktZeit(); // aktuelle Zeit
				Ankunft = new Date(AktZeit.getTime() + (Flugzeit * 1000)); // Ankunft: Aktuelle Uhrzeit+Flugzeit (*1000 weil es Millisekunden sind)
				Rueck = new Date(AktZeit.getTime() + (Flugzeit * 2000)); // Rueckkehr: Aktuelle Uhrzeit + 2*Flugzeit (*2000 weil es Millisekunden sind)
				document.getElementById('ankunft_ziel').firstChild.nodeValue = ZeitFormatieren(Ankunft); // Ankunfszeit formatieren und anzeigen
				document.getElementById('ankunft_ursprung').firstChild.nodeValue = ZeitFormatieren(Rueck); // Rueckkehrzeit formatieren und anzeigen
			}
			
			AnzeigeAktualisieren();
			window.setInterval(AnzeigeAktualisieren, 200);
		}
	}
	
	// In der Zielauswahl
	if (Datei == 'flotten2' && Planis && unsafeWindow.shortInfo)
	{
		//--------------------------
		// Flottenmenue berarbeiten
		//--------------------------
		
		if (ogs_load('fltmenu_buttons'))
		{
			// Fuegt hinter dem ersten vorhandenen Button einen weiteren ein, der BtnFunk ausfuehrt
			function NeuerButton(Titel, BtnFunk)
			{
				var Btn = getEBF(ContDiv,'input','type.toLowerCase() == "submit"'); //FindeXPath('//th[@colspan>1]/input[@type="submit"]'); // alle Buttons (input-Tag mit type="submit") in einer Tabellentitelzelle, deren colspan>1 ist
				if (!Btn) { return; }
				Btn = Btn[Btn.length-1]; // den letzten gefundenen Button nehmen
				var NeuBtn = document.createElement('input'); // Neuen Button erstellen
				NeuBtn.type = 'button'; // Damit es auch ein Button wird
				NeuBtn.value = Titel; // Beschriftung zuweisen
				addEvent(NeuBtn,'click', BtnFunk, true); // Klick-Funktion zuweisen
				Btn.parentNode.appendChild(NeuBtn); // neuen Button hinter den anderen setzen
			}

			// Schickt die Flotte zum Default-Plani
			function ZumDefPlSenden()
			{
				unsafeWindow.setTarget(DefPlani['Gala'], DefPlani['Sys'], DefPlani['Pos'], DefPlani['Typ']); // Flottenziel setzen
				unsafeWindow.shortInfo(); // Anzeige aktualisieren
				if (InInt(document.getElementById('storage').innerHTML) <= 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
				{
					if (!ogs_load('warnung'))
					{
						if (!confirm('Der Laderaum ist hierf' + ue + 'r zu klein. Trotzdem fortfahren?')) { return; } // falls der User es wnscht, abbrechen //WARNUNG
					}
				}
				document.forms[0].submit(); // Formular absenden
			}

			// Schickt die Flotte zum aktuellen Mond, wenn ein Plani aktiv ist, und umgekehrt
			function ZumAktPartnerSenden()
			{
				if (!AktPlani['Partner']) { return; }
				var Partner = Planis[AktPlani['Partner']];
				unsafeWindow.setTarget(Partner['Gala'], Partner['Sys'], Partner['Pos'], Partner['Typ']); // Flottenziel setzen
				unsafeWindow.shortInfo(); // Anzeige aktualisieren
				
				if (InInt(document.getElementById('storage').innerHTML) < 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
				{
					if (!ogs_load('warnung'))
					{
						if (!confirm('Der Laderaum ist hierf' + ue + 'r zu klein. Trotzdem fortfahren?')) { return; } // falls der User es wnscht, abbrechen //WARNUNG
					}
				}
				
				document.forms[0].submit(); // Formular absenden
			}
			
			function ZumPlaniButton(Plani, BtnFunk) // kleine Hilfsfunktion
			{
				NeuerButton(((Plani['Typ'] == Typ_Plani) ? 'Zum Plani ' + Plani['Name'] : 'zum Mond ' + Plani['Name']), BtnFunk);
			}
			
			if (DefPlani['ID'] != AktPlani['ID']) // wenn der aktuelle Plani nicht der default-Plani ist
			{
				ZumPlaniButton(DefPlani, ZumDefPlSenden); // neuen Button einfuegen
			}
			
			if (AktPlani['Partner'] && Planis[AktPlani['Partner']]['ID'] != DefPlani['ID']) // wenn der aktuelle Plani nen Partner hat
			{
				ZumPlaniButton(Planis[AktPlani['Partner']], ZumAktPartnerSenden);
			}
		}
		
		if (ogs_load('ankft_zeit'))
		{
			// Berechne die Ankunftszeiten und setze sie in die Felder
			function AnzeigeAktualisieren()
			{
				var Flugzeit = parseInt(unsafeWindow.duration());
				
				// Zeiten aktualisieren
				var AktZeit = GetAktZeit(); // aktuelle Zeit
				Ankunft = new Date(AktZeit.getTime() + (Flugzeit * 1000)); // Ankunft: Aktuelle Uhrzeit+Flugzeit (*1000 weil es Millisekunden sind)
				Rueck = new Date(AktZeit.getTime() + (Flugzeit * 2000)); // Rueckkehr: Aktuelle Uhrzeit + 2*Flugzeit (*2000 weil es Millisekunden sind)
				document.getElementById('ankunft_ziel').firstChild.nodeValue = ZeitFormatieren(Ankunft); // Ankunfszeit formatieren und anzeigen
				document.getElementById('ankunft_ursprung').firstChild.nodeValue = ZeitFormatieren(Rueck); // Rueckkehrzeit formatieren und anzeigen
			}
			
			// Geschwindigkeitsauswahl anordnen
			var geschw_ausw = document.getElementsByName('speed')[0];
			geschw_ausw.parentNode.style.textAlign = 'left';
			geschw_ausw.parentNode.style.textIndent = '10px';
			
			// fuegt Tabellenzeile fuer die Anzeige der Ankunftszeiten ein und startet den Timer zum Berechnen
			var TabZeile = document.getElementById('duration').parentNode.parentNode; // Zeile mit der Flugzeit
			
			// Zeile fuer Zielankunft erstellen
			var NeueZeile = document.createElement('tr'); // Neue Zeile
			NeueZeile.appendChild(NeuesElement('th', 'Ankunft (Ziel)')); // Zelle in Zeile
			var NeueZelle = NeuesElement('th', '<div id="ankunft_ziel">-</div>'); // 2. Zelle
			NeueZelle.height = '20'; // Attribute zuweisen
			NeueZeile.appendChild(NeueZelle); // Zelle in Zeile
			TabZeile = EinfuegenHinter(NeueZeile, TabZeile); // neue Zeile einfuegen
			
			// Zeile fuer Ursprungsankunft erstellen (via DOM, innerHTML klappt nicht)
			NeueZeile = document.createElement('tr'); // Neue Zeile
			NeueZeile.appendChild(NeuesElement('th', 'Ankunft (Ursprung)')); // Zelle in Zeile
			NeueZelle = NeuesElement('th', '<div id="ankunft_ursprung">-</div>'); // 2. Zelle
			NeueZelle.height = '20'; // Attribute zuweisen
			NeueZeile.appendChild(NeueZelle); // Zelle in Zeile
			TabZeile = EinfuegenHinter(NeueZeile, TabZeile); // neue Zeile einfuegen
			
			// Warnung einfuegen
			var ContDivCtr = ContDiv.getElementsByTagName('center')[0];
			ContDivCtr.appendChild(document.createElement('br'));
			NeueZeile = NeuesElement('table', '', 'align', 'center', 'width', '519');
			NeueZeile.innerHTML = '<tr><th>Bitte beachte, dass abh&auml;ngig von der Geschwindigkeit deines Internetzugangs die oben angegebene Uhrzeit um einige Sekunden daneben liegen kann. Die angenommene Serverzeit in der &Uuml;bersicht oder links &uuml;ber dem Men&uuml; kann zum Vergleichen herangezogen werden - sie dient als Grundlage f&uuml;r die hier angezeigte Uhrzeit.</th></tr>';
			ContDivCtr.appendChild(NeueZeile);
			
			// Timer starten
			AnzeigeAktualisieren();
			window.setInterval(AnzeigeAktualisieren, 200);
		}
		
		if (ogs_load('flotte_seite2_tfwahl'))
		{
		    var rec = document.getElementsByName('ship209');
		    if (rec.length > 0)
		    {
                document.getElementsByName('planettype')[0].value = 2; //tf        
		    }
		}
		
		if (ogs_load('flotte_seite2_combobox'))
		{
		    var speedselect = document.getElementsByName('speed');
		    
		    if (speedselect.length > 0)
		    {
		        for (var i = 0; i < 10; i++)
		        {
		            var test = document.createElement('a');
		            test.href = "javascript: document.getElementsByName('speed')[0].value = "+(1+i)+"; ogs_fleet2marker("+i+",0);";
		            test.innerHTML = (i*10+10) + ' ';
		            test.id = "ogs_speed"+i;
		            if (i == 9)
		                test.style.color = "red";
		            
		            speedselect[0].parentNode.insertBefore(test, speedselect[0]);
		        }
		        
		        speedselect[0].style.display = "none";
		    }

		    var planettypeselect = document.getElementsByName('planettype');
		    
		    if (planettypeselect.length > 0)
		    {
		        for (var i = 0; i < 3; i++)
		        {
		            var test = document.createElement('a');
		            test.href = "javascript: document.getElementsByName('planettype')[0].value = "+(1+i)+"; ogs_fleet2marker("+i+",1);";
		            test.innerHTML = planettypeselect[0].options[i].text + ' ';
		            test.id = "ogs_ptype"+i;
		            
		            if (planettypeselect[0].options[i].selected == true)
		                test.style.color = "red";
		            
		            planettypeselect[0].parentNode.insertBefore(test, planettypeselect[0]);
		        }
		        
		        planettypeselect[0].style.display = "none";
		    }
		    
		    function ogs_fleet2marker(id, mode)
		    {
		        if (mode == 0)
		        {
		            for (var i = 0; i < 10; i++)
		            {
		                if (id != i)
		                    document.getElementById("ogs_speed"+i).style.color = "inherit";
		                else
		                    document.getElementById("ogs_speed"+i).style.color = "red";
		            }
		        }
		        else if (mode == 1)
		        {
		            for (var i = 0; i < 3; i++)
		            {
		                if (id != i)
		                    document.getElementById("ogs_ptype"+i).style.color = "inherit";
		                else
		                    document.getElementById("ogs_ptype"+i).style.color = "red";
		            }
		        }
		        
		        unsafeWindow.shortInfo();
		    }

		    function setTarget(galaxy, solarsystem, planet, planettype)
		    {
                document.getElementsByName('galaxy')[0].value = galaxy;
                document.getElementsByName('system')[0].value = solarsystem;
                document.getElementsByName('planet')[0].value = planet;
                document.getElementsByName('planettype')[0].value = planettype;
                ogs_fleet2marker(planettype - 1, 1);
            }
		    
		    unsafeWindow.setTarget = setTarget;
		    unsafeWindow.ogs_fleet2marker = ogs_fleet2marker;
		}
	}
	
	// In der Auftragsauswahl
	if (Datei == 'flotten3' && unsafeWindow.shortInfo)
	{
		if (ogs_load('auto_auftrag'))
		{
			var vExpedition = document.getElementsByName('planet'); //FindeXPath('//tr[@height="20"][@align="left"]/td[@class="c"][@colspan="2"]');
			if (vExpedition.length > 0)
			{
				var vPlanniKoord = parseInt(vExpedition[0].value); //parseInt(vExpedition[0].innerHTML.split(':')[2]);
				if (vPlanniKoord == 16)
				{
					var Auftr = getEBF(ContDiv, 'input','type == "radio" && knoten.name == "order"'); //FindeXPath('//table/tbody/tr/th/input[@type="radio"][@name="order"]');
						Auftr[0].checked = 'checked';
				}
				else
				{
					// beteiligte Schiffe ermitteln
					var HiddenData = getEBF(ContDiv, 'input','type == "hidden" && knoten.name.match(/ship/)'); //FindeXPath('//input[@type="hidden"][contains(@name,"ship")]');
					var Beteiligt = new Array(), Kampfschiff = false, Transporter = false;
					
					for (var i = 0; i < HiddenData.length; i++) // ueber alle "hidden"-Felder
					{
						var ID = HiddenData[i].name.substr(4, 3);
						
						if (ID >= 200 && ID <= 299) // gefundene Schiffe
						{
							Beteiligt[ID] = true; // speichern
							
							// Kampfschiffe sind alle ausser Transportern, Recyclern, Kolschiffen und Spiosonden (Solsats kann man nicht schicken)
							if (ID != 202 && ID != 203 && ID != 209 && ID != 208 && ID != 210)
							{
								Kampfschiff = true;
							}
							
							if (ID == 202 || ID == 203)
							{
								Transporter = true;
							}
						}
					}
					
					// moegliche Auftraege finden
					var Auftr = getEBF(ContDiv, 'input','type == "radio" && knoten.name == "order"'); //FindeXPath('//table/tbody/tr/th/input[@type="radio"][@name="order"]'); // Alle Tags fuer die Auftragsauswahl finden
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
										if (((Beteiligt[210] && !Kampfschiff && !Transporter) || ogs_load('stationieren_vorz')) && AuftrgBoxen[4])
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
		if (ogs_load('fltmenu_buttons'))
		{
			var AltRessLaden = getEBF(ContDiv,'a','href == "javascript:maxResources()"')[0].parentNode; //FindeXPath('//table/tbody/tr/th[@colspan=3]')[0];
			var AltRessLink = ' (M-K-D)</a><br>&nbsp;<br><a href="javascript: document.getElementsByName(\'resource1\')[0].value = \'0\'; document.getElementsByName(\'resource2\')[0].value = \'0\'; document.getElementsByName(\'resource3\')[0].value = \'0\';' + ((ogs_load('kein_deut')) ? '' : ' maxResource(\'3\');') + ' maxResource(\'2\'); maxResource(\'1\');">Alle Rohstoffe (D-K-M)</a>';
			
			//Keine Ressourcen
			AltRessLaden.innerHTML = '<a href="javascript: void(document.getElementsByName(\'resource1\')[0].value = \'0\'); void(document.getElementsByName(\'resource2\')[0].value = \'0\'); void(document.getElementsByName(\'resource3\')[0].value = \'0\');">Keine Rohstoffe</a><br>&nbsp;<br>' + AltRessLaden.innerHTML.replace('</a>', AltRessLink);
			var AltRessLaden = getEBF(ContDiv,'a','href.match(/javascript:maxResource\\(\'[1-3]\'\\)/)'); //FindeXPath('//table/tbody/tr[@height="20"]/th/a/parent::th');
			
			for (var i = 0; i < 3; i++)
			{
				AltRessLaden[i].parentNode.innerHTML = '<a href="javascript: void(document.getElementsByName(\'resource'+(i+1)+'\')[0].value = \'0\'); ">min</a>&nbsp;&nbsp;' + AltRessLaden[i].parentNode.innerHTML;
			}
		}
	}
	
	//----------------------
	// Baumenues verbessern
	//----------------------
	if (Datei == 'buildings' || Datei == 'b_building')
	{
		var zeilen = getEBF(ContDiv,'table','width == 530'); //FindeXPath('//table[@width="530"]/tbody/tr');
		
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
            ogs_load('building_nopics');
            ogs_load('building_energie');
            ogs_load('building_klein');
            ogs_load('building_klein_pics_size');
            ogs_load('building_bg');
	        ogs_load('building_bg_col1');
	        ogs_load('building_bg_col2');
            ogs_load('transbuild');
            ogs_load('colored_ress');
            ogs_load('building_doppelzeilen');
            ogs_load('endzeiten');
            
            //varibalen fÃ¼rs res fÃ¤rben
            var vSucheRess = new Array(/(MÃ©tal: )<b>([\.0-9]+)/,/(Cristal: )<b>([\.0-9]+)/,/(DeutÃ©rium: )<b>([\.0-9]+)/,/(Energie: )<b>([\.0-9]+)/)
            var vColorRess = new Array(ogs_load('color_met'),ogs_load('color_kris'),ogs_load('color_deut'),ogs_load('color_eng'))
            var forschung = new Array();
            
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
                    //wenn bilder gelÃ¶scht werden sollen muss diese spalte verkleinert werden
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
                    //energie zugewinn anzeigen
                    if (Datei == 'b_building' && settingscur['building_energie'])
                    {
                        var ID = spalten[1].firstChild.href.match(/gid=([0-9]+)/)[1]; 
					    
					    if (ID <= 4 || ID == 12) // Minen und Kraftwerke
					    {
						    var TextKnot = spalten[1].childNodes[1];
						    var Stufe = 0;
    						
						    if (TextKnot.nodeType == 3) // falls der Knoten kein Textknoten ist, ist das Gebaeude auf Stufe 0
						    {
							    var Stufe = InInt(TextKnot.nodeValue);
						    }
    						
						    var Steigerung = Energie(ID, Stufe + 1) - Energie(ID, Stufe); // Steigerung des Verbrauchs/der Produktion berechnen
						    var vP;
						    
						    Steigerung = ' [' + TausenderZahl(Steigerung,true) + ' Energie]';
						    
						    //fÃ¤rben?
					        vP = document.createElement('span');
					        
				            //<!--(Stufe 0)--> fuer kompatibilitaet zur galatoolbar stufe 0 gebaude
						    if (settingscur['colored_ress'])
						    {
						        vP.innerHTML = '<!--GT: (Stufe 0)--><font style="color: '+vColorRess[3]+'">' + Steigerung + '</font>';
						    }
						    else
						    {
						        vP.innerHTML = "<!--GT: (Stufe 0)-->"+Steigerung;
						    }
						    
						    spalten[1].insertBefore(vP, spalten[1].getElementsByTagName('br')[0]);
					    }
                    }
                    
                    //transporter text anzeigen?
			        if (settingscur['transbuild'])
			        {
				        var ress0 = 0; var ress1; var ress2; var ress3; var ress4; var ress_gt = 0; var ress_kt = 0;
    					
				        if (ress1 = spalten[1].innerHTML.match(/MÃ©tal:(.*?)<br>/)) // korrektur = auf ==
				        {
					        ress2 = ress1[0].match(/>([\.0-9]+)</g);
    						
					        for (var tt = 0; tt < ress2.length; tt++)
					        {
						        ress3 = ress2[tt].replace('<', '');
						        ress4 = ress3.replace('>', '');
						        ress0 += parseInt(ress4.replace(/\./g, ''), 10);
					        }
				        }
				        else
				        {
					        if (ress1 = spalten[1].innerHTML.match(/Cristal:(.*?)<br>/))
					        {
						        ress2 = ress1[0].match(/>([\.0-9]+)</g);
    							
						        for (var tt = 0; tt < ress2.length; tt++)
						        {
							        ress3 = ress2[tt].replace('<', '');
							        ress4 = ress3.replace('>', '');
							        ress0 += parseInt(ress4.replace(/\./g, ''), 10);
						        }
					        }
					        else
					        {
						        if (ress1 = spalten[1].innerHTML.match(/DeutÃ©rium:(.*?)<br>/))
						        {
							        ress2 = ress1[0].match(/>([\.0-9]+)</g);
    								
							        for (var tt = 0; tt < ress2.length; tt++)
							        {
								        ress3 = ress2[tt].replace('<', '');
								        ress4 = ress3.replace('>', '');
								        ress0 += parseInt(ress4.replace(/\./g, ''), 10);
							        }
    								
						        }
					        }
				        }
				        ress_gt = Math.ceil(ress0 / 25000);
				        ress_kt = Math.ceil(ress0 / 5000);
    					
				        var posi = spalten[1].innerHTML.match(/<br>.+<br>Ben/);
				        //<!--(Stufe 0)--> fuer kompatibilitaet zur galatoolbar stufe 0 gebaude
				        spalten[1].innerHTML = spalten[1].innerHTML.replace(posi, ' <!--GT: (Stufe 0)-->[<span style="color:' + TextCol + ';">' + ress_gt + ' GTs</span>|<span style="color:' + TextCol + ';">' + ress_kt + ' KTs</span>]' + posi);
			        }
                    
                    //beschreibungstext entfernen
                    if (settingscur['building_klein'])
                    {
                        spalten[0].width = '1px'; //fix fÃ¼r zu bildfensterbreite
				        spalten[1].innerHTML = spalten[1].innerHTML.replace(/<br>.+<br>Ben/, '<br>Ben');
    					
					    if (spalten[2].innerHTML.match('Die Schildkuppel kann nur 1 mal gebaut werden.'))
					    {
						    spalten[2].innerHTML = spalten[2].innerHTML.replace('Die Schildkuppel kann nur 1 mal gebaut werden.', '(max. 1)');
					    }
                    }
                                        
                    //res fÃ¤rben
		            if (settingscur['colored_ress'])
		            {
			            var vText = spalten[1].innerHTML;
			            for (var j = 0; j < vSucheRess.length; j++)
			            {
				            var vFinde = vSucheRess[j].exec(vText);
				            if (vFinde)
					            vText = vText.replace(vFinde[0],vFinde[0].split(" ")[0]+" <font color='"+vColorRess[j]+"'>"+vFinde[2]+"</font>");
			            }
        				
			            spalten[1].innerHTML = vText;
                    }
                    
                    //foschung
                    if (document.URL.match('Forschung'))
                    {
                        //forschungsid suchen
                        var ID = zeilen[i].innerHTML.match(/gid=([0-9]+)/)[1];
                        
                        //forschungslevel suchen
                        var Stufe =  zeilen[i].innerHTML.match(/\(Stufe ([0-9]+)/);
                        
                        if (Stufe != null) //es gibt eine Stufe
                        {
                            Stufe = Stufe[1];
                        }
                        else //wenn nicht dann stufe 0
                        {
                            Stufe = 0;
                        }
                        
                        forschung.push(new Array(ID, Stufe));
                    }
                    
                    if (settingscur['building_doppelzeilen'])
                    {
                        spalten[2].width = 70;
                        spalten[2].align = 'center';
                    }
                    
                    //wenn bilder gelÃ¶scht werden sollen
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
                    ogs_save('forschung',ogs_join(forschung,'|','&'));
            }
            
		    //endzeit anzeigen
			if (Datei == 'buildings' && settingscur['endzeiten'])
			{
				//var vRestdauert = FindeXPath('//div[@id="content"]/center/form/form')
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
				    //hinter der zweiten form kommt wenn da der anzeige text fÃ¼r die restdauer
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
					
					if (vStd || vMin || vSek)
					{
						var vMseks = 0;
						vMseks += parseInt(vDay*86400);
						vMseks += parseInt(vStd*3600);
						vMseks += parseInt(vMin*60);
						vMseks += parseInt(vSek);
						var vFinishTime = new Date(GetAktZeit().getTime() + vMseks * 1000);
						
						var vP = document.createElement('p');
						vP.style.color = TextCol;
						vP.innerHTML = "Fertiggestellt am: " + ZeitFormatieren(vFinishTime);
						
						vRestdauert.parentNode.insertBefore(vP, vRestdauert.nextSibling);
					}
				}
			}
			
			if (document.URL.match('Forschung') && settingscur['endzeiten'])
			{
			    var bxx = document.getElementById('bxx');
			    
			    if (bxx)
			    {
			        bxx = bxx.parentNode.getElementsByTagName("script")[0];
			        var ss = parseInt(bxx.text.match(/ss=([0-9]+)/)[0].replace('ss=', ''), 10);
			        
			        var vP = document.createElement('b');
			        vP.innerHTML = aTimeStampTextOnly(ss);
			        bxx.parentNode.appendChild(vP);
			    }
            }
            
            if (Datei == 'b_building' && settingscur['endzeiten'])
            {
			    var bxx = document.getElementById('bxx');
			    
			    if (bxx)
			    {
			        bxx = bxx.parentNode.getElementsByTagName("script")[0];
			        
			        if (bxx.text.indexOf('pp="') > -1)
			        {
			            var ss = bxx.text.match(/pp="([0-9]+)/);
			            
			            if (ss.length)
			                ss = parseInt(ss[0].replace('pp="', ''), 10);
			            else
			                ss = 0;
			        }
			        else
			        {
			            var ss = bxx.text.match(/pp='([0-9]+)/);
			            
			            if (ss.length)
    			            ss = parseInt(ss[0].replace("pp='", ''), 10);
			            else
			                ss = 0;
			        }
			        
			        var vP = document.createElement('b');
			        vP.innerHTML = aTimeStampTextOnly(ss);
			        bxx.parentNode.appendChild(vP);
			    }
            }
			
			//fÃ¤rben was gewÃ¼nscht ist
            var CSSStr = '';
            if (settingscur['building_klein'])
            {
	            CSSStr += 'table tr th table tr td img, td.l img { width: ' + settingscur['building_klein_pics_size'] + 'px; height: ' + settingscur['building_klein_pics_size'] + 'px; }';
            }
            
            if (settingscur['building_bg'])
            {
	            CSSStr += 'table tr td table tr td.l  { background-image: none; background-color: ' + settingscur['building_bg_col1'] + '; border: 1px ' + settingscur['building_bg_col2'] + ' solid; padding-left: 3px; padding-right: 3px; }';
	            CSSStr += 'body table tr td table tr td.k, body form table tr td table tr td.k, body table tr td table tr td.l + td.l + td.l { background-image: none; background-color: ' + settingscur['building_bg_col1'] + '; border: 1px ' + settingscur['building_bg_col2'] + ' solid; }';
            }
            
            if (CSSStr.length > 0)
		        GM_addStyle(CSSStr);
            
			// Damit die Zeilenumbrueche neu gerendert werden und die Tabelle schicker aussieht
			var InhaltsTab = zeilen[0].parentNode.parentNode; // der "Vorfahr" einer dieser Zellen ist die grosse Tabelle (2mal parentNode, weil zuerst tbody kommt)
			if (settingscur['building_doppelzeilen'])
			{
			    InhaltsTab.removeAttribute('width');
			}
			else
			{
			    InhaltsTab.style.width = TabBreite(650, 530);
			}
			
			// anzeige fÃ¼r das button in der letzten zeile fixen
			if (!document.URL.match('Forschung') && Datei == 'buildings') 
			    zeilen[zeilen.length - 1].innerHTML = zeilen[zeilen.length - 1].innerHTML;
        }
	}// Ende der Bauseiten-Erweiterungen
	
	//-----------
	// Techseite
	//-----------
	if (Datei == 'techtree')
	{
		var zeilen = getEBF(ContDiv,'table','width == 470'); //FindeXPath('//table[@width="470"]/tbody/tr');
		zeilen = zeilen[0].rows;
        var spalten;
		
		if (zeilen.length)
		{
	        ogs_load('techtree_pics');
	        ogs_load('techtree_pics_size');
	        ogs_load('techtree_bg');
	        ogs_load('techtree_bg_col1');
	        ogs_load('techtree_bg_col2');
	        ogs_load('techtree_doppelzeilen');
	        
	        //wenn bilder gewÃ¼scht wird dann grafikpath suchen
	        if (settingscur['techtree_pics'])
	        {
                var skinpatharray = document.getElementsByTagName('link'); //FindeXPath('/html/head/link');
                var skinpath = '';
                
                for (var i = 0; i < skinpatharray.length; i++)
                {
                    if (skinpatharray[i].href.indexOf(Server) == -1)
                    {
                        skinpath = skinpatharray[i].href;
                        skinpath = skinpath.substr(0, skinpath.lastIndexOf('formate.css'));
                        break;
                    }
                    
                    if (skinpatharray[i].href.indexOf('/css/formate.css') == -1 && skinpatharray[i].href.indexOf(Server) >= 0 && skinpath == '')
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
                            spalten[1].innerHTML = "&nbsp;";
                    
                    if (settingscur['techtree_pics'])
                    {
                        if (spalten[0].className == 'l')
                        {
                            var ID = spalten[0].getElementsByTagName('a')[0].href.match(/gid=([0-9]+)/)[1];
                            var vP = spalten[0].cloneNode(false);
                            
                            vP.innerHTML = "<img src='" + skinpath + "gebaeude/" + ID + ".gif'>";
                            vP.width = "1px";
                            vP.className = "l";
                            
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
		
		    //fÃ¤rben was gewÃ¼nscht ist
            var CSSStr = '';
            if (settingscur['techtree_pics'])
            {
                CSSStr += 'body table tr td.l img { width: ' + settingscur['techtree_pics_size'] + 'px; height: ' + settingscur['techtree_pics_size'] + 'px; }';
            }
            
            if (settingscur['techtree_bg'])
            {
                CSSStr += 'body table tr td.l, body table tr td.c { background-image: none; background-color: ' + settingscur['techtree_bg_col1'] + '; border: 1px ' + settingscur['techtree_bg_col2'] + ' solid; padding-left: 3px; padding-right: 3px;  }';
            }

            if (CSSStr.length > 0)
	            GM_addStyle(CSSStr);
    	    
		    var InhaltsTab = zeilen[0].parentNode.parentNode; // der "Vorfahr" einer dieser Zellen ist die grosse Tabelle (2mal parentNode, weil zuerst tbody kommt)
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
	
	//-----------------------
	// Uebersicht verbessern
	//-----------------------
	if (Datei == 'overview')
	{
		/*var Bilder = FindeXPath('//table[@class="s"]'); // Alle Bilder in einem Link in einer Titelzelle finden
		if (Bilder.length)
		{
			var vBild = Bilder[0];
			var vBildContent = vBild.innerHTML;
			var code = '';
				code += '<tr><td class="c">Koords</td><td class="c">Planet</td><td class="c">Bauauftrag</td><td class="c">Mond</td></tr>';
			var PlaniListe = FindeXPath('//select/option');
			for (var i = 0; i < PlaniListe.length; i++)
			{
				code += '<tr><td class="c">Koords</td><td class="c">Planet</td><th class="c"> frei </td><th class="c"> - </td></tr>';
			}
				vBild.innerHTML = code;
		}*/
        if (ogs_load('flotten_faerben') || (ogs_load('flotten_zusatz') && ogs_load('skin_advance')))
        {
            ogs_FlottenFaerben();
        }
        
		if (ogs_load('ang_zeit') && !ogs_load('zeit_links'))
		{
			// aktualisiere die aktuelle Uhrzeit
			function ZeitAktualisieren()
			{
				ZeitZelle.innerHTML = '<span style="color:' + TextCol + ';">' + ZeitFormatieren(GetAktZeit()) + '</span>';
				window.setTimeout(ZeitAktualisieren, 999);
			}
			
        	var ZeitZelle = getEBF(document, 'th','colSpan == 3')[0]; //FindeXPath('//table[@width="519"]/tbody/tr/th[@colspan=3]')[0];
			ZeitAktualisieren();
		}
		
		if (SID)
		{
			// Versieht die Uebersicht mit weiteren Links
			var Bilder = getEBF(ContDiv, 'img', 'src.indexOf("/planeten/") >= 0'); //FindeXPath('//th/a/img[contains(@src,"/planeten/small/")]'); // Alle Bilder in einem Link in einer Titelzelle finden
            
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
					    var TextKn = getCEBF(Knoten.parentNode,'center')[0]; //FindeXPath('center[1]', Knoten.parentNode)[0]; // Das Center-Tag beinhaltet den Text
					    TextKn.insertBefore(NeuesElement('a', Trim(TextKn.firstChild.nodeValue), 'href', '/game/index.php?page=b_building&session=' + SID + '&cp=' + PlaniID + PHPSIDStr), TextKn.firstChild); // Den Link vor dem Text einfuegen
					    TextKn.removeChild(TextKn.childNodes[1]); // den Text loeschen
				    }
    				
				    // Link ins Flottenmenue
				    var TextKn = Knoten.parentNode; // das Tag der Tabellenzelle
				    var Link = NeuesElement('a', Trim(TextKn.firstChild.nodeValue), 'href', '/game/index.php?page=flotten1&session=' + SID + '&cp=' + PlaniID + PHPSIDStr); // Link erzeugen
				    if (PlaniID == DefPlani['ID']) { Link.style.color = '#87ceeb'; } // Default-Plani markieren
				    TextKn.insertBefore(Link, TextKn.firstChild); // Den Link vor dem Text einfuegen
				    TextKn.removeChild(TextKn.childNodes[1]); // den Text loeschen
    				
				    // Mond-Link
				    var Plani = FindePlaniMitID(Planis, PlaniID);
				    var Partner = Planis[Plani['Partner']]; // Das ist der Mond zum Plani, falls vorhanden
                    
				    if (Plani && Plani['Partner'] && !Plani['Aktiv'] && !Partner['Aktiv']) // falls der Plani gefunden wurde und dieser Plani nen Mond hat und wir nicht auf diesem Mond sind, und auch nicht beim aktiven Plani
				    {
					    var MondLink = NeuesElement('a', Partner['Name'], 'href', '/game/index.php?page=overview&session=' + SID + '&cp=' + Partner['ID'] + PHPSIDStr); // Link erzeugen
					    if (Partner['ID'] == DefPlani['ID']) { MondLink.style.color = '#87ceeb'; } // Default-Mond markieren
					    var Text = EinfuegenHinter(document.createTextNode(' ('), Link); // Klammer auf vor den Link, hinter den Planinamen
					    EinfuegenHinter(MondLink, Text); // dahinter den Link
					    EinfuegenHinter(document.createTextNode(')'), MondLink); // dahinter die Klammer zu
				    }
				}
				else
				{
			        // Das grosse Planibild finden
			        var AktPlaniBau = getCEBF(Bilder[i].parentNode,'center')[0];
			        AktPlaniBau.insertBefore(NeuesElement('a', Trim(AktPlaniBau.firstChild.nodeValue), 'href', '/game/index.php?page=b_building&session=' + SID + '&cp=' + AktPlani['ID'] + PHPSIDStr), AktPlaniBau.firstChild); // Den Link vor dem Text einfuegen
			        AktPlaniBau.removeChild(AktPlaniBau.childNodes[1]); // den Text loeschen
				}
			}
			
			// Das grosse Planibild finden
			//var AktPlaniBau = FindeXPath('//table[@width="519"]/tbody/tr/th[@colspan>=2]/center')[0];
			//AktPlaniBau.insertBefore(NeuesElement('a', Trim(AktPlaniBau.firstChild.nodeValue), 'href', '/game/index.php?page=b_building&session=' + SID + '&cp=' + AktPlani['ID'] + PHPSIDStr), AktPlaniBau.firstChild); // Den Link vor dem Text einfuegen
			//AktPlaniBau.removeChild(AktPlaniBau.childNodes[1]); // den Text loeschen
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
		if (ogs_load('bewegteress') == true)
		{
			function RessEval(a, b)
			{
				var c = eval('/' + a + ': ([\.0-9]+)/');
				return parseInt(b.match(c)[1].replace(/\./g, ''), 10);
			}
			
			function RessLoop(a, b, elems)
			{
				var s = getElementsByClassName(a, elems, 'MÃ©tal');
				var c = d = e = 0, t = '';
				
				for (var i = 0; i < s.length; i++)
				{
					t = s[i].getAttribute('onmouseover').toString();
					c += RessEval('MÃ©tal', t);
					d += RessEval('Cristal', t);
					e += RessEval('DeutÃ©rium', t);
				}
				
				if (c != 0 || d != 0 || e != 0)
				{
					code += '<tr><th>' + b + '</th><th>' + TausenderZahl(c) + '</th><th>' + TausenderZahl(d) + '</th><th>' + TausenderZahl(e) + '</th></tr>';
				}
				
				return new Array(c, d, e);
			}
			
			if (ogs_load('colored_ress'))
				var vColorRess = new Array(ogs_load('color_met'),ogs_load('color_kris'),ogs_load('color_deut'));
			else
				var vColorRess = new Array(TextCol,TextCol,TextCol);
			
			//cellpadding="0" cellspacing="0" border="1" align="center" bordercolor="#000000" style="border-collapse:collapse;
			code = '<center><br /><table width="' + TabBreite(2000, 519) + '"">';
			code += '<tr><td class="c" colspan="4">Kaynak aktarimi</td></tr>';
			code += '<tr><th><b>Kaynaklar</b></th><th><b>';
			code += "<font color='"+vColorRess[0]+"'>Metal</font></b></th><th><b>";
			code += "<font color='"+vColorRess[1]+"'>Kristal</font></b></th><th><b>";
			code += "<font color='"+vColorRess[2]+"'>Deuterium</font></b></th></tr>";
			var typ = new Array('owntransport', 'Transport', 'owndeploy', 'Stationner', 'owncolony', 'Coloniser', 'ownhold', 'Stationner (AlliÃ©)', 'ownharvest', 'Recycler', 'ownattack', 'Attaquer', 'ownfederation', 'Attaque groupÃ©e');
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
			
			code += '<tr><th><span style="color:' + TextCol + ';">Total olarak</span></th><th><span style="color:' + vColorRess[0] + ';">' + TausenderZahl(met) + '</span></th><th><span style="color:' + vColorRess[1] + ';">' + TausenderZahl(kris) + '</span></th><th><span style="color:' + vColorRess[2] + ';">' + TausenderZahl(deut) + '</span></th></tr>';
			code += '</table></center>';
			aa4 = document.createElement('div');
			aa4.innerHTML = code;
			ContDiv.appendChild(aa4);
			
			//var ttt = FindeXPath('//div[@id="content"]/div[last()]');
			//ttt[0].innerHTML = code;
			
			/*
			var ttt = FindeXPath('//div[@id="content"]/center/table/tbody')[0];
			var aa4 = document.createElement('tr');
			aa4.cellSpacing = 0;
			var aa5 = document.createElement('th');
			aa5.colSpan = 4;
			aa4.appendChild(aa5);
			ttt.appendChild(aa4);
			aa5.innerHTML = code;
			*/
		}
		
		// Handelsrechner
		if (ogs_load('handelsrechner') == true)
		{
			function handelsrechner()
			{
				var hertauschen, bek1, bek2, handel, mm = 0, nk, nk1, nk2, mm1 = 0, mm2 = 0;
				var getmenge = document.getElementById('menge');
				
				// abbruch wenn element Ã¼ber id nicht gefunden wurde
				if (getmenge == null) return;
				var menge = parseInt(getmenge.value.replace(/\./g, ''), 10);
				if (isNaN(menge)) { menge = 0; }
				var kursmet = parseFloat(document.getElementById('kursmet').value.replace(/\,/g, '.'), 10);
				var kurskris = parseFloat(document.getElementById('kurskris').value.replace(/\,/g, '.'), 10);
				var kursdeut = parseFloat(document.getElementById('kursdeut').value.replace(/\,/g, '.'), 10);
				var prozent1 = parseFloat(document.getElementById('prozent').value.replace(/\,/g, '.'), 10);
				if (isNaN(kursmet)) { kursmet = parseFloat(ogs_load('kursmet').replace(/\,/g, '.'), 10); }
				if (isNaN(kurskris)) { kurskris = parseFloat(ogs_load('kurskris').replace(/\,/g, '.'), 10); }
				if (isNaN(kursdeut)) { kursdeut = parseFloat(ogs_load('kursdeut').replace(/\,/g, '.'), 10); }
				if (isNaN(prozent1)) { prozent1 = 0; }
				var prozent2 = 100 - prozent1;
				var gt_du = 0, kt_du = 0, gt_er = 0, kt_er = 0, ress = 0;
				
				if (document.getElementById('hertauschen1').checked)
				{
					hertauschen = 'MÃ©tal';
					bek1 = 'Cristal';
					bek2 = 'DeutÃ©rium';
					
					if (document.getElementById('bekommen1').checked)
					{
						if (kursmet > kurskris) { nk = kursmet / kurskris; mm = menge / nk; }
						if (kurskris > kursmet) { nk = kurskris / kursmet; mm = menge * nk; }
						if (kursmet == kurskris) { mm = menge; }
						handel = TausenderZahl(Math.floor(mm)) + ' ' + bek1;
						ress = Math.floor(mm);
					}
					
					if (document.getElementById('bekommen2').checked)
					{
						if (kursmet > kursdeut) { nk = kursmet / kursdeut; mm = menge / nk; }
						if (kursdeut > kursmet) { nk = kursdeut / kursmet; mm = menge * nk; }
						if (kursmet == kursdeut) { mm = menge; }
						handel = TausenderZahl(Math.floor(mm)) + ' ' + bek2;
						ress = Math.floor(mm);
					}
					
					if (document.getElementById('bekommen3').checked)
					{
						if (kursmet > kurskris) { nk1 = kursmet / kurskris; mm1 = menge / 100 * prozent1 / nk1; }
						if (kurskris > kursmet) { nk1 = kurskris / kursmet; mm1 = menge / 100 * prozent1 * nk1; }
						if (kursmet == kurskris) { mm1 = menge / 100 * prozent1; }
						if (kursmet > kursdeut) { nk2 = kursmet / kursdeut; mm2 = menge / 100 * prozent2 / nk2; }
						if (kursdeut > kursmet) { nk2 = kursdeut / kursmet; mm2 = menge / 100 * prozent2 * nk2; }
						if (kursmet == kursdeut) { mm2 = menge / 100 * prozent2; }
						handel = TausenderZahl(Math.floor(mm1)) + ' ' + bek1 + ' und ' + TausenderZahl(Math.floor(mm2)) + ' ' + bek2;
						ress = Math.floor(mm1) + Math.floor(mm2);
					}
				}
				
				if (document.getElementById('hertauschen2').checked)
				{
					hertauschen = 'Cristal';
					bek1 = 'MÃ©tal';
					bek2 = 'DeutÃ©rium';
					
					if (document.getElementById('bekommen1').checked)
					{
						if (kurskris > kursmet) { nk = kurskris / kursmet; mm = menge / nk; }
						if (kursmet > kurskris) { nk = kursmet / kurskris; mm = menge * nk; }
						if (kurskris == kursmet) { mm = menge; }
						handel = TausenderZahl(Math.floor(mm)) + ' ' + bek1;
						ress = Math.floor(mm);
					}
					
					if (document.getElementById('bekommen2').checked)
					{
						if (kurskris > kursdeut) { nk = kurskris / kursdeut; mm = menge / nk; }
						if (kursdeut > kurskris) { nk = kursdeut / kurskris; mm = menge * nk; }
						if (kurskris == kursdeut) { mm = menge; }
						handel = TausenderZahl(Math.floor(mm)) + ' ' + bek2;
						ress = Math.floor(mm);
					}
					
					if (document.getElementById('bekommen3').checked)
					{
						if (kurskris > kursmet) { nk1 = kurskris / kursmet; mm1 = menge / 100 * prozent1 / nk1; }
						if (kursmet > kurskris) { nk1 = kursmet / kurskris; mm1 = menge / 100 * prozent1 * nk1; }
						if (kurskris == kursmet) { mm1 = menge / 100 * prozent1; }
						if (kurskris > kursdeut) { nk2 = kurskris / kursdeut; mm2 = menge / 100 * prozent2 / nk2; }
						if (kursdeut > kurskris) { nk2 = kursdeut / kurskris; mm2 = menge / 100 * prozent2 * nk2; }
						if (kurskris == kursdeut) { mm2 = menge / 100 * prozent2; }
						handel = TausenderZahl(Math.floor(mm1)) + ' ' + bek1 + ' und ' + TausenderZahl(Math.floor(mm2)) + ' ' + bek2;
						ress = Math.floor(mm1) + Math.floor(mm2);
					}
				}
				
				if (document.getElementById('hertauschen3').checked)
				{
					hertauschen = 'Deuterium';
					bek1 = 'Metal';
					bek2 = 'Kristal';
					
					if (document.getElementById('bekommen1').checked)
					{
						if (kursdeut > kursmet) { nk = kursdeut / kursmet; mm = menge / nk; }
						if (kursmet > kursdeut) { nk = kursmet / kursdeut; mm = menge * nk; }
						if (kursdeut == kursmet) { mm = menge; }
						handel = TausenderZahl(Math.floor(mm)) + ' ' + bek1;
						ress = Math.floor(mm);
					}
					
					if (document.getElementById('bekommen2').checked)
					{
						if (kursdeut > kurskris) { nk = kursdeut / kurskris; mm = menge / nk; }
						if (kurskris > kursdeut) { nk = kurskris / kursdeut; mm = menge * nk; }
						if (kursdeut == kurskris) { mm = menge; }
						handel = TausenderZahl(Math.floor(mm)) + ' ' + bek2;
						ress = Math.floor(mm);
					}
					
					if (document.getElementById('bekommen3').checked)
					{
						if (kursdeut > kursmet) { nk1 = kursdeut / kursmet; mm1 = menge / 100 * prozent1 / nk1; }
						if (kursmet > kursdeut) { nk1 = kursmet / kursdeut; mm1 = menge / 100 * prozent1 * nk1; }
						if (kursdeut == kursmet) { mm1 = menge / 100 * prozent1; }
						if (kursdeut > kurskris) { nk2 = kursdeut / kurskris; mm2 = menge / 100 * prozent2 / nk2; }
						if (kurskris > kursdeut) { nk2 = kurskris / kursdeut; mm2 = menge / 100 * prozent2 * nk2; }
						if (kursdeut == kurskris) { mm2 = menge / 100 * prozent2; }
						handel = TausenderZahl(Math.floor(mm1)) + ' ' + bek1 + ' ve ' + TausenderZahl(Math.floor(mm2)) + ' ' + bek2;
						ress = Math.floor(mm1) + Math.floor(mm2);
					}
				}
				
				document.getElementById('hertauschen0').innerHTML = hertauschen;
				document.getElementById('bek1').innerHTML = bek1;
				document.getElementById('bek2').innerHTML = bek2;
				document.getElementById('bek').innerHTML = bek1;
				kursmet = document.getElementById('kursmet').value;
				kurskris = document.getElementById('kurskris').value;
				kursdeut = document.getElementById('kursdeut').value;
				if (document.getElementById('kursmet').value == '') { kursmet = ogs_load('kursmet'); }
				if (document.getElementById('kurskris').value == '') { kurskris = ogs_load('kurskris'); }
				if (document.getElementById('kursdeut').value == '') { kursdeut = ogs_load('kursdeut'); }
				handelstext = 'yazdigin' + TausenderZahl(menge) + ' ' + hertauschen + '  esit ' + handel + ' dir. (Oran aralÄ±gi: ' + kursmet.replace(/\./g, ',') + ':' + kurskris.replace(/\./g, ',') + ':' + kursdeut.replace(/\./g, ',') + ')';
				if (document.getElementById('handel').innerHTML != handel || document.getElementById('handelstext').innerHTML.match(/\(Taux: (.*?)\)/)[0] != handelstext.match(/\(Kurs: (.*?)\)/)[0]) { document.getElementById('handelstext').innerHTML = handelstext; }
				document.getElementById('handel').innerHTML = handel;
				gt_du = Math.ceil(menge / 25000);
				kt_du = Math.ceil(menge / 5000);
				gt_er = Math.ceil(ress / 25000);
				kt_er = Math.ceil(ress / 5000);
				document.getElementById('transen_du').innerHTML = '<span style="color:' + TextCol + ';">' + TausenderZahl(gt_du) + ' GTs</span> ou <span style="color:' + TextCol + ';">' + TausenderZahl(kt_du) + ' PTs</span>';
				document.getElementById('transen_er').innerHTML = '<span style="color:' + TextCol + ';">' + TausenderZahl(gt_er) + ' GTs</span> ou <span style="color:' + TextCol + ';">' + TausenderZahl(kt_er) + ' PTs</span>';
			}
			
			// border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="border-collapse:collapse;"
			code2 = '<center><br /><table width="' + TabBreite(2000, 519) + '">';
			code2 += '<tr><td class="c" colspan="5">Maden Oranlari <input type="text" id="kursmet" value="' + ogs_load('kursmet') + '" size="4" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;">:<input type="text" id="kurskris" value="' + ogs_load('kurskris') + '" size="4" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;">:<input type="text" id="kursdeut" value="' + ogs_load('kursdeut') + '" size="4" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;"></th></tr>';
			code2 += '<tr><th style="text-align:left;">Maden miktarini yazin ve turunu seciniz</th><th width="100"><input type="text" id="menge" value="0" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;"></th><th width="50" style="text-align:left;"><input type="radio" name="hertauschen" id="hertauschen1" value="1">Metal</th><th width="100" style="text-align:left;"><input type="radio" name="hertauschen" id="hertauschen2" value="2">Kristal</th><th width="90" style="text-align:left;"><input type="radio" name="hertauschen" id="hertauschen3" value="3" checked>Deuterium</th></tr>';
			code2 += '<tr><th style="text-align:left;">Yazdigin maden miktarini neye donusturmek istiyorsun Su an secili olan:::<span id="hertauschen0">Deuterium</span>?</th><th width="100" style="text-align:left;"><input type="radio" name="bekommen" id="bekommen1" value="1"><span id="bek1">Metal</span></th><th width="100" style="text-align:left;"><input type="radio" name="bekommen" id="bekommen2" value="2"><span id="bek2">Kristal</span></th><th width="200" style="text-align:left;" colspan="2">  <input type="radio" name="bekommen" id="bekommen3" value="3" checked>Karistir (<input id="prozent" value="33" size="4" maxlength="3" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;">% de <span id="bek">Meetal</span>)</th></tr>';
			code2 += '<tr><th colspan="5" style="text-align:left;"><span style="color:' + TextCol + ';">Girdigin degerler sonucunda olusan oran: <span id="handel">0 Metal et 0 Kristal</span>.</span></th></tr>';
			code2 += '<tr><th colspan="5" style="text-align:left;">Elde edileni yuklemen icin<span id="transen_du">0 GTs ou 0 PTs</span>.</th></tr>';
			code2 += '<tr><th colspan="5" style="text-align:left;">elde edileni yuklemen icin\'au minimum <span id="transen_er">0 GTs ou 0 PTs</span>.</th></tr>';
			code2 += '<tr><td class="c" colspan="5">Sonucta olusan oran</td></tr>';
			code2 += '<tr><th colspan="5" style="text-align:center; padding:10px;" id="handelstext">J\'aurais Ã  proposer 0 Deuterium contre 0 Metal et 0 Kristal (Taux: ' + ogs_load('kursmet').replace(/\./g, ',') + ':' + ogs_load('kurskris').replace(/\./g, ',') + ':' + ogs_load('kursdeut').replace(/\./g, ',') + ')</th></tr>';
			code2 += '</table></center><br>';
			aa4 = document.createElement('div');
			aa4.innerHTML = code2;
			ContDiv.appendChild(aa4);
			//var ttt = FindeXPath('//div[@id="content"]/div[last()]');
			//ttt[0].innerHTML = code2;
			handelsrechner();
			window.setInterval(handelsrechner, 200);
		}
	} // Ende Uebersichtsteil
	
	// Zeiten in Tagen anzeigen
	if (SID && (Datei == 'overview' || Datei == 'flotten2'))
	{
		ogs_load('endzeiten');
		
		var v = GetAktZeit();
		var Zaehler = new Array();
		var ts = new Array();
		var ttime = new Array();
		var ZaehlerLaeuft = false;
		
		function AktZaehler()
		{
			var n = GetAktZeit();
			
			for (var i = 0; i < Zaehler.length; i++)
			{
				if (!Zaehler[i])
				    continue;
				
				var d = 0, h = 0, m = 0;
				
				if (!ts[i])
				{
				    ttime[i] = new Date(1000 * parseInt(Zaehler[i].getAttribute('star'),10));
				    //fix timezone problem
				    ttime[i].setTime(ttime[i].getTime() - (-60 - ttime[i].getTimezoneOffset()) * 60000);
				    ts[i] = aTimeStamp(ttime[i]);
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
			
			window.setTimeout(AktZaehler, 999);
		}
		
		function StarteZaehler()
		{
			if (ZaehlerLaeuft) { return; }
			ZaehlerLaeuft = true;
			if (!Zaehler.length) { return; }
			
			// Daten aus den OGame-Zaehlern fischen (dooferweise werden da 3 grundlegend verschiedene Methoden verwendet, und die muessen alle erkannt werden. Ekelhafte Programmiererei ist das...)
			for (var i = 0; i < Zaehler.length; i++)
			{
				if (Zaehler[i].getAttribute('title')) // Uebersicht und Flottenmenue
				{
					//in Ã¼bersicht den gebÃ¤uder counter richtig anzeigen.
					if (Zaehler[i].getAttribute('id') == 'bxx')
					{
					    Zaehler[i].setAttribute('star', Zaehler[i].getAttribute('title'));
					}
				}
			}
			
			AktZaehler();
		}
		
		// Die Zaehler finden
		Zaehler = getEBF(document,'div','id.match(/bxx/)'); //FindeXPath('//div[starts-with(@id, "bxx")]'); // unsafeWindow.anz = anzahl der bxxX elemente auf Ã¼bersicht +1 wenn gebÃ¤ude bau
		unsafeWindow.t = unsafeWindow.t_building = StarteZaehler; // vorhandene Funktion ueberschreiben
	}
	
	//--------------------------
	// Tagesproduktion anzeigen
	//--------------------------
	// im Ressmenue Tagesproduktion und x-Stunden/Tage-Produktion anzeigen
	if (Datei == 'resources')
	{
		//var planimond = FindeXPath('//table[@width="550"]/tbody/tr/td');
		//if (!(planimond[0].innerHTML.indexOf('(Mond)') + 1))
		//{
	    var suchesolar = getEBF(ContDiv,'table','width == 550')[0].rows; //FindeXPath('//table[@width="550"]/tbody/tr/th[1]');
	    
	    var erg1 = 0;
	    var erg2 = 0;
		var Prod = Array(0,0,0);
		var GesZeile = -1;
	    
	    for (var i = 0; i < suchesolar.length; i++)
	    {
	        var suchesolars = suchesolar[i].cells;
	        
            if (suchesolars.length > 0 && suchesolars[0].innerHTML.indexOf('Solarsatellit') + 1)
            {
                //zeile laden
                erg1 = suchesolars[0].parentNode.getElementsByTagName('th')

			    //vorletzte spalten fÃ¼r gesamtenergie durch sola sats
			    erg2 = erg1[erg1.length - 2]; 
			    var arg1 = erg2.innerHTML.replace(/\./g, '');
			    arg1 = arg1.replace(/\s/g, '');
			    var satenergie = (arg1 != '0') ? arg1.match(/>([0-9]+)</)[1] : arg1;
				
			    //sola sat anzahl
			    var satanzahl = erg1[0].innerHTML.match(/Anzahl ([\.0-9]+)/);
			    satanzahl = satanzahl[1].replace(/\./g, '');
				
			    //letzte spalte fÃ¼r % wert
			    erg2 = erg1[erg1.length - 1].getElementsByTagName('select')[0]; 
			    var prozent = parseInt(erg2.value);
				
			    var prosat = Math.floor(parseInt(satenergie) / parseInt(satanzahl));
			    erg1[0].innerHTML = erg1[0].innerHTML + '<br><span style="color:' + TextCol + ';">Energie pro Solarsatellit: ' + prosat.toString() + ' bei ' + prozent.toString() + '%</span>';
                
                //ende wenn einmal gefunden
                //break;
            }
            
            if (suchesolars[0] && suchesolars[0].innerHTML.indexOf('Gesamt:') > -1)
            {
                GesZeile = i;
                break;
            }
	    }
		
		if (GesZeile != -1)
		{
		    //var ResZeile = FindeXPath('td/font[1]', suchesolar[GesZeile]);
    		var ResZeile = suchesolar[GesZeile].getElementsByTagName('font');
    		
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
				    document.getElementById('dyn_ausg' + i).firstChild.nodeValue = TausenderZahl(Prod[i] * Multiplikator);
			    }
		    }
    		
		    function SetzeAuf(Wert)
		    {
			    var AuswahlBoxen = getEBF(ContDiv,'select','name.indexOf("last") == 0'); //FindeXPath('//table[@width="550"]/tbody/tr/th/select[starts-with(@name, "last")]');
			    for (var i = 0; i < AuswahlBoxen.length; i++)
			    {
				    var Name = AuswahlBoxen[i].name;
				    if (Name == 'last1' || Name == 'last2' || Name == 'last3' || Name == 'last4' || Name == 'last12' || Name == 'last212') { AuswahlBoxen[i].selectedIndex = Wert; }
			    }
			    document.getElementsByName('action')[0].click(); // Formular absenden (da action=Berechne sein muss geht das am einfachsten, indem man den Button drueckt - formular.submit() klappt nicht
		    }
    		
		    // Leerzeile verlÃ¤ngern
		    var LeerZelle = getEBF(ContDiv, 'th', 'height == 4 && knoten.colSpan == 6')[0]; //FindeXPath('//table[@width="550"]/tbody/tr[count(th)=1]/th[@height=4][@colspan=6]')[0];
		    LeerZelle.setAttribute('colspan', 7);
    		
		    // Zeile fuer dynamische Anzeige einfuegen
		    var NeuZeile = document.createElement('tr');
		    var AuswZelle = document.createElement('th');
		    AuswZelle.setAttribute('colspan', '2');
		    AuswZelle.appendChild(document.createTextNode('Produktion in '));
		    AuswZelle.appendChild(document.createElement('br'));
		    AuswZelle.appendChild(NeuesElement('input', '', 'type', 'text', 'id', 'dyn_anz', 'value', '30', 'size', '5', 'maxlength', '4'));
		    AuswZelle.appendChild(document.createTextNode(' '));
		    var ArtAusw = NeuesElement('select', '', 'id', 'dyn_art');
		    ArtAusw.appendChild(NeuesElement('option', 'Stunden', 'value', '1'));
		    ArtAusw.appendChild(NeuesElement('option', 'Tagen', 'value', '24', 'selected', 'selected'));
		    AuswZelle.appendChild(ArtAusw);
		    NeuZeile.appendChild(AuswZelle);
    		
		    for (var i = 0; i < 3; i++) // fuer die 3 Ressourcentypen
		    {
			    NeuZeile.appendChild(NeuesElement('td', ' ', 'class', 'k', 'style', 'color:#00FF00', 'id', 'dyn_ausg' + i));
		    }
    		
		    NeuZeile.appendChild(NeuesElement('td', '-', 'class', 'k', 'style', 'color:#00FF00'));
		    EinfuegenHinter(NeuZeile, suchesolar[suchesolar.length - 1]); // die neue Zeile nach der Gesamtsummenzeile einfuegen

		    // Alles auf 100%
		    var BtnZelle = NeuesElement('td', '', 'class', 'k');
		    var Btn = NeuesElement('input', '', 'type', 'button', 'value', 'Alles 100%', 'style', 'width: 100%');
		    addEvent(Btn,'click', function() { SetzeAuf(0); }, true);
		    BtnZelle.appendChild(Btn);
		    suchesolar[GesZeile].appendChild(BtnZelle);
            
            // Alles auf 0%
		    var BtnZelle = NeuesElement('td', '', 'class', 'k');
		    var Btn = NeuesElement('input', '', 'type', 'button', 'value', 'Alles 0%', 'style', 'width: 100%');
		    addEvent(Btn,'click', function() { SetzeAuf(10); }, true);
		    BtnZelle.appendChild(Btn);
		    
		    if (suchesolar[GesZeile + 1])
		        suchesolar[GesZeile + 1].appendChild(BtnZelle);
		    else
		        NeuZeile.appendChild(BtnZelle)
    		
		    AktDynAnz();
		    window.setInterval(AktDynAnz, 200);
        }

        var Ress = HoleRessourcen(); // vorhandene Ressourcen bestimmen
        var RessSumme = Ress[0] + Ress[1]; // Summe der Ressourcen bestimmen
        var OhneDeut = ogs_load('kein_deut');
        if (!OhneDeut) { RessSumme += Ress[2]; } // Deut nur einrechen falls es nicht
        BenKT = Math.ceil(RessSumme / 5000); // vollen laderaum verwenden - schliesslich kommt der Treibstoff ja auch in den Laderaum
        BenGT = Math.ceil(RessSumme / 25000);
        aa4 = document.createElement('div');
        aa4.innerHTML = '<center><table width="550"><tr><th>F&uuml;r die Summe von <span style="color:' + TextCol + '; font-weight:bold;">' + TausenderZahl(RessSumme.toString()) + '</span>' + ((OhneDeut) ? ' Metal ve Kristal' : ' Metal, Kristal ve Deuterium') + ' auf diesem Planeten<br>werden <span style="color:' + TextCol + '; font-weight:bold;">' + TausenderZahl(BenGT.toString()) + ' gro&szlig;e Transporter</span> oder <span style="color:' + TextCol + '; font-weight:bold;">' + TausenderZahl(BenKT.toString()) + ' kleine Transporter</span> ben&ouml;tigt.</th></tr></table></center>';
        ContDiv.appendChild(aa4);
	}
	
	//------------------------------------------------------------------------------
	// Spionagebericht auswerten und Button erstellen zum Senden an Online-Speedsim
	//------------------------------------------------------------------------------
	if (Datei == 'messages')
	{
		function Merkliste(a, b, c, d)
		{
			var e = ogs_load('merkliste').split(/::/g);
			
			for (var i = 0; i < e.length; i++)
			{
				var z = e[i].split(/:/g);
				if (z[1] == b && z[2] == c && z[3] == d) // Wenn Eintrag bereits existiert, dann loesche, Vergleich ueber Koords, Planiname kann sich aendern
				{
					ogs_save('merkliste', ogs_load('merkliste').replace(z[0] + ':' + z[1] + ':' + z[2] + ':' + z[3] + '::', ''));
					return false;
				}
			}
			
			ogs_save('merkliste', ogs_load('merkliste') + a + ':' + b + ':' + c + ':' + d + '::');
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
		
		function SpioWert(a)
		{
			return a1.match(eval('/' + a + '([-0-9]+)/'))[1];
		}
		
	    function oldspiostuff(thisthing)
	    {
		    var tables = thisthing.getElementsByTagName('table');
		    
		    if (tables.length > 1)
		    {
		        tables = tables[1].getElementsByTagName('div');
		        
		        if (tables.length > 0)
		        {
		            tables[0].removeAttribute('onmouseover');
		            tables[0].removeAttribute('onmouseout');
		        }
		    }
		    
			a1 = thisthing.innerHTML.replace(/<div(.*?)\/div>/g, '');
			a1 = a1.replace(/<(.*?)>/g,'');
			
			//var a2 = a1.match(/<(.*?)>/g);
			//for (var j = 0; j < a2.length; j++)
			//{
			//    a1 = a1.replace(a2[j], '');
			//}
			
			var code = 'http://websim.speedsim.net/index.php?lang=de';
			var dragosim;
			
			// Planetenname und Koordinaten
			if (a1.indexOf('Rohstoffe auf') + 1)
			{
			    var enemy_nam = a1.match(/Rohstoffe auf (.*?) \[/)[1];
			    code += '&enemy_name=' + enemy_nam;
			}
			
			if (a1.indexOf('Rohstoffe auf') + 1)
			{
			    var enemy_pos = a1.match(/\[(.*?)\]/)[1]; code += '&enemy_pos=' + enemy_pos; enemy_pos = enemy_pos.split(/:/g);
			}
			
			a1 = a1.replace(/\./g, '');
			
			// Ressourcen
			if (a1.indexOf('Metal:') + 1)
			{
			    var met = SpioWert('Metal:');
			    code += '&enemy_metal=' + met;
			    met = parseInt(met, 10);
            }
            
			if (a1.indexOf('Cristal:') + 1)
			{
			    var kris = SpioWert('Cristal:');
			    code += '&enemy_crystal=' + kris;
			    kris = parseInt(kris, 10);
			}
			
			if (a1.indexOf('DeutÃ©rium:') + 1)
			{
			    var deut = SpioWert('DeutÃ©rium:');
			    code += '&enemy_deut=' + deut;
			    deut = parseInt(deut, 10);
			}
			
			if (a1.indexOf('Energie:') + 1)
			{
			    // benoetigt fuer Mondbestimmung
			    var ener = SpioWert('Energie:');
			    ener = parseInt(ener, 10);
			    
			    //kÃ¼rzen der Suchliste (damit wird verhindert das schiffe im planetennamen gefunden werden)
			    dragosim = a1;
			    a1 = a1.substr(a1.indexOf('Energie:') + 8);
			} 
			
			
			// Techniken
			for (var j = 0; j < Techniken.length; j++)
			{
			    if (a1.indexOf(Techniken[j]) + 1)
			    {
			        code += '&tech_d0_' + j + '=' + SpioWert(Techniken[j]);
			    }
			}
			
			// Schiffe und Verteidigung
			for (var j = 0; j < Schiffe_und_Verteidigung.length; j++)
			{
			    if (a1.indexOf(Schiffe_und_Verteidigung[j]) + 1)
			    {
			        code += '&ship_d0_' + j + '_b=' + SpioWert(Schiffe_und_Verteidigung[j]);
			    }
			}
			
			// Praktische Beute
			var ress0 = 0.5 * Math.max(met + kris + deut, Math.min(0.75 * (2 * met + kris + deut), 2 * met + deut));
			var ress_gt = Math.ceil(ress0 / 25000);
			var ress_kt = Math.ceil(ress0 / 5000);
			
			dragosim = dragosim.replace(/\n/g, '');
			dragosim = dragosim.replace(/ /g, '');
			dragosim = dragosim.trim();
			
			// link erstellen
			code = '<br>Spionagebericht einf&uuml;gen in: <a target="_blank" href="' + ogs_getLink(code);
			code += '"><span style="color:' + TextCol + ';"><b>SpeedSim Online</b></span></a> bzw. ';
			code += '<a target="_blank" href="' + ogs_getLink('http://drago-sim.com/index.php?lang=german&referrer=ogame-script&scan=' + dragosim) + '"><span style="color:' + TextCol + ';"><b>DragoSim 2</b></span></a>';
			code += '<br>M&ouml;gliche Beute: <span style="color:' + TextCol + ';">' + TausenderZahl(Math.round(met / 2)) + ' Metal</span>, <span style="color:' + TextCol + ';">' + TausenderZahl(Math.round(kris / 2)) + ' Cristal</span>, <span style="color:' + TextCol + ';">' + TausenderZahl(Math.round(deut / 2)) + ' DeutÃ©rium</span>';
			code += '<br>Ben&ouml;tigte Ladekapazit&auml;t f&uuml;r Gesamtbeute: <span style="color:' + TextCol + ';">' + TausenderZahl(Math.round(ress0)) + ' Einheiten</span> (<a target="_blank" href="' + ogs_getLink('http://www.owiki.de/Beute') + '"><span style="color:' + TextCol + ';"><b>?</b></span></a>)';
			code += '<br>Ben&ouml;tigte Transporter beim Angriff: ';
			code += '<span style="color:' + TextCol + ';">' + ress_gt + ' GTs</span> bzw. <span style="color:' + TextCol + ';">' + ress_kt + ' KTs</span><br>&nbsp;<br>';
			//code += '<a target="_self" href="/game/index.php?page=flotten1&session=' + SID + '&galaxy=' + enemy_pos[0] + '&system=' + enemy_pos[1] + '&planet=' + enemy_pos[2] + '&planettype=' + ((enemy_nam.match(/(Mond)/g) || (enemy_nam.match(/Mond/g) && enemy_nam.length == 4 && !ener)) ? Typ_Mond : Typ_Plani) + '&target_mission=1"><span style="color:' + TextCol + ';"><b>Angreifen</b></span></a> ';
			code += '<a target="_self" href="#" onclick="javascript: return false;" name="ogs_merken_' + enemy_pos[0] + '_' + enemy_pos[1] + '_' + enemy_pos[2] + '"><b>Merken</b></a> / ';
			
			var centers = getCEBF(thisthing, 'center');
			
			if (centers.length > 0)
			{
			    centers[centers.length -1].innerHTML = code + centers[centers.length -1].innerHTML
			}
			
			// Angreifen
			MerkColor('ogs_merken_' + enemy_pos[0] + '_' + enemy_pos[1] + '_' + enemy_pos[2], mlist.match(eval('/' + enemy_pos[0] + ':' + enemy_pos[1] + ':' + enemy_pos[2] + '::/g')));
			koords.push(enemy_nam, enemy_pos[0], enemy_pos[1], enemy_pos[2]);
		}
		
		ogs_load('spio');
	    ogs_load('news_expo_aktiv');
        ogs_load('news_expo_farbe');
        ogs_load('news_pm_aktiv');
        ogs_load('news_pm_farbe');
        ogs_load('news_am_aktiv');
        ogs_load('news_am_farbe');

		var flag = 0;
		var koords = new Array();
		var mlist = ogs_load('merkliste');
		var Techniken = new Array('Waffentechnik', 'Schildtechnik', 'Raumschiffpanzerung');
		var Schiffe = new Array('Kleiner Transporter', 'Gro' + sz + 'er Transporter', 'Leichter J' + ae + 'ger', 'Schwerer J' + ae + 'ger', 'Kreuzer', 'Schlachtschiff', 'Kolonieschiff', 'Recycler', 'Spionagesonde', 'Bomber', 'Solarsatellit', 'Zerst' + oe + 'rer', 'Todesstern', 'Schlachtkreuzer');
		var Verteidigung = new Array('Raketenwerfer', 'Leichtes Lasergesch' + ue + 'tz', 'Schweres Lasergesch' + ue + 'tz', 'Gau' + sz + 'kanone', 'Ionengesch' + ue + 'tz', 'Plasmawerfer', 'Kleine Schildkuppel', 'Gro' + sz + 'e Schildkuppel');
		var Schiffe_und_Verteidigung = Schiffe.concat(Verteidigung);
		var a1 = '';
		
		//new stuff
		var tab = getEBF(ContDiv,'table','width == 519');
		
		if (tab.length > 0)
		{
		    var zeilen = tab[0].rows;
		    var spalten = null;
    		var nextspalte = null;
    		
		    for (var i = 0; i < zeilen.length; i++)
		    {
		        spalten = zeilen[i].cells;
    		    
		        if (spalten.length == 4) //daten 
		        {
		            //spionagebericht
		            if (settingscur['spio'] && spalten[3].innerHTML.indexOf('class="espionagereport"') > -1)
		            {
		                nextspalte = zeilen[i+1].cells;
		                
		                //spio bericht geÃ¶ffnet
		                if (nextspalte.length == 2)
		                {
		                    //nextspalte[1].style.backgroundColor = "yellow";
		                    //nextspalte[1].style.border = "2px solid red";
		                    oldspiostuff(nextspalte[1]);
		                    i++;
		                }
		            }
                    
                    //pm
		            else if (settingscur['news_pm_aktiv'] && spalten[3].innerHTML.indexOf('img/m.gif') > -1)
		            {
		                nextspalte = zeilen[i+1].cells;
		                
		                if (nextspalte.length == 2)
		                {
		                    nextspalte[1].style.border = "2px solid " + settingscur['news_pm_farbe'];
    		                i++;
		                }
		            }
		            
		            //ally pm
		            else if (settingscur['news_am_aktiv'] && spalten[3].innerHTML.indexOf('Rundmail deiner Allianz') > -1)
		            {
		                nextspalte = zeilen[i+1].cells;
		                
		                if (nextspalte.length == 2)
		                {
		                    nextspalte[1].style.border = "2px solid " + settingscur['news_am_farbe'];
		                    i++;
		                }
		            }
		            
		            //expo 
		            else if (settingscur['news_expo_aktiv'] && spalten[3].innerHTML.indexOf('Expeditionsergebnis') > -1)
		            {
		                nextspalte = zeilen[i+1].cells;
		                
		                if (nextspalte.length == 2)
		                {
		                    nextspalte[1].style.border = "2px solid " + settingscur['news_expo_farbe'];
		                    i++;
		                }
		            }
		        }
		    }
		}
		
		// Merkliste
		var MerkLinks = getEBF(ContDiv, 'a', 'name.indexOf("ogs_merken_") == 0'); //document.getElementsByName('ogs_merken'); //FindeXPath('//table[@width="519"]/tbody/tr/td/center/a[@href="#"]'); // Event onclick fuer Speicherfunktion der Koords geht nicht ueber innerHTML

		for (var i = 0; i < MerkLinks.length; i++)
		{
			addEvent(MerkLinks[i],'click', eval('function() { var test = Merkliste(\'' + koords[i * 4] + '\', \'' + koords[i * 4 + 1] + '\', \'' + koords[i * 4 + 2] + '\', \'' + koords[i * 4 + 3] + '\'); MerkColor(\'ogs_merken_' + koords[i * 4 + 1] + '_' + koords[i * 4 + 2] + '_' + koords[i * 4 + 3] + '\', test); }'), true);
		}
	}
	
	//---------------------------
	// Statistikseiten erweitern
	//---------------------------
	// In den Stats
	if (Datei == 'statistics' && SID)
	{
        //var was = FindeXPath('//form/table[@width="519"]/tbody/tr/th/select');
        var was = new Array();
        var wasvalue = new Array();
        
        //nur weiter wenn stats da sind (in neuen unis sind sie am start deaktiviert)
        if(document.getElementsByName('who').length > 0)
        {
            was.push(document.getElementsByName('who')[0]);
            was.push(document.getElementsByName('type')[0]);
            was.push(document.getElementsByName('start')[0]);
            
            // ausgewÃ¤hlte einstellung suchen
            for (var i = 0; i < was.length; i++)
            {
                wasvalue[i] = was[i].value;
            }
            
            if (ogs_load('galaxietool'))
            {
                var tabneu = getEBF(ContDiv,'table','width == 519'); //FindeXPath('//center/table[@width="519"]');
                
                if (tabneu.length > 0)
                {
                    var taborg = tabneu[0].cloneNode(true);
                    taborg.style.display = "none";
                }
            }
            
            if (ogs_load('stats_plusminusbuttons'))
            {
                var btn;
                btn = NeuesElement('input', '', 'type', 'button', 'value', '<', 'onclick', 'javascript: if(document.getElementsByName("start")[0].selectedIndex <= 0) return; document.getElementsByName("start")[0].selectedIndex -= 1; document.getElementsByTagName("form")[0].submit();'); //document.getElementsByName("start")[0].onchange();');
                was[2].parentNode.insertBefore(document.createElement('br'), was[2].previousSibling);
                was[2].parentNode.insertBefore(document.createElement('br'), was[2].previousSibling);
                was[2].parentNode.insertBefore(btn, was[2]);
                was[2].parentNode.insertBefore(document.createTextNode(' '), was[2]);
                
                btn = NeuesElement('input', '', 'type', 'button', 'value', '>', 'onclick', 'javascript: if(document.getElementsByName("start")[0].selectedIndex >= document.getElementsByName("start")[0].length - 1) return; document.getElementsByName("start")[0].selectedIndex += 1; document.getElementsByTagName("form")[0].submit();'); //document.getElementsByName("start")[0].onchange();');
                was[2].parentNode.insertBefore(btn, was[2].nextSilbing);
                was[2].parentNode.insertBefore(document.createTextNode(' '), was[2].nextSilbing);
            }
            
	        if (ogs_load('gala_ally_faerben'))
	        {
		        var allyspielerfarben = ogs_split(ogs_load('gala_ally_spieler_farben'),'|','&');
        		
		        var an; var pn; var an2;

                var spaltemitallynamen = 3;
                
                if (wasvalue[0] == 'ally')
                    spaltemitallynamen = 1;
	        }
    		
            ogs_load('show_punkte_diff_top');
            
		    if (ogs_load('show_punkte_diff'))
		    {
		        ogs_load('punkte_diff_fontsize');
    		    
                var eigenezeile = document.getElementsByName('SELF');
                var eigenepos = 0;
                
                for (var i = 0; i < eigenezeile.length; i++)
                {
                    var eigene = eigenezeile[i].parentNode.parentNode.getElementsByTagName('th');
                    
                    //man kann sich nicht selbst eine nachricht schreiben => richtige zeile
                    if (eigene[2].getElementsByTagName('a').length == 0)
                    {
                        eigenepos = parseInt(eigene[0].innerHTML.match(/\d+/));
                        eigenepunkte = parseInt(eigene[4].innerHTML.replace(/\./g,''));
                        
                        break;
                    }
                }
            }
            
            //platzierungsunterschied zum letzten mal anzeigen
		    var pms;
    		
		    if (wasvalue[0] != 'ally')
		    {
	            var zeilen = getEBF(ContDiv, 'table', 'width == 525'); //FindeXPath('//center/table[@width="519"]/tbody/tr');
	            zeilen = zeilen[1].rows;
            }
            else
	        {
	            var zeilen = getEBF(ContDiv, 'table', 'width == 519'); //FindeXPath('//center/table[@width="519"]/tbody/tr');
	            zeilen = zeilen[0].rows;
	        }
    	    
            var toppunkte = -1;
            
            for (var i = 1; i < zeilen.length; i++)
            {
                spalten = zeilen[i].cells; //getElementsByTagName('th');
                
                /*
                pms = spalten[0].getElementsByTagName('a');
                if(pms.length > 0)
                {
                    pms = spalten[0].getElementsByTagName('font');
                    if(pms.length > 0)
                    {
    		            pms[0].innerHTML = pms[0].parentNode.getAttribute('onmouseover', 0).match(/>(.*)</)[1];
			            pms[0].parentNode.parentNode.replaceChild(pms[0], pms[0].parentNode);
		            }
                }
                */
                
		        if (settingscur['gala_ally_faerben'])
		        {
		            if (wasvalue[0] != 'ally')
		            {
			            pn = spalten[1].innerHTML.trim();
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
    		        
		            if (pn.length > 0 || an.length > 0)
		            {
		                for (var j = 0; j < allyspielerfarben.length; j++)
		                {
		                    if (1 == allyspielerfarben[j][1])
		                    {
		                        if (an.length > 0)
		                        {
		                            if (an == allyspielerfarben[j][0])
		                            {
		                                an2.style.color = allyspielerfarben[j][2];
		                            }
		                        }
		                    }
		                    else
		                    {
		                        if (pn.length > 0)
		                        {
		                            if (pn == allyspielerfarben[j][0])
		                            {
		                                spalten[1].style.color = allyspielerfarben[j][2];
		                            }
		                        }
		                    }
		                }
                    }
		        }
                
		        var statpunkte = parseInt(spalten[4].innerHTML.replace(/\./g,''));
    		    
		        if (settingscur['show_punkte_diff_top'])
		        {
		            if (toppunkte != -1)
		            {
		                var statdiff = statpunkte - toppunkte;
    		            
		                if (statdiff != 0)
		                    spalten[4].innerHTML = spalten[4].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + TextCol + ';">' + TausenderZahl(statdiff.toString(),true) + '</font>';
		                else
		                    spalten[4].innerHTML = spalten[4].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + TextCol + ';">-</font>';
		            }
		            else
	                    spalten[4].innerHTML = spalten[4].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + TextCol + ';">-</font>';
    		        
                    toppunkte = statpunkte;
		        }
    		    
                if (settingscur['show_punkte_diff'] && eigenepos > 0)
                {
                    var thispos = parseInt(spalten[0].innerHTML.match(/\d+/));
                    
		            if (thispos != eigenepos)
		            {
			            var statdiff = statpunkte - eigenepunkte;
			            spalten[1].innerHTML = spalten[1].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + TextCol + ';">' + TausenderZahl(statdiff.toString(),true) + '</font>';
		            }
		            else
			            spalten[1].innerHTML = spalten[1].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + TextCol + ';">-</font>';
		        }
            }
            
            if (ogs_load('galaxietool'))
            {
                if (tabneu.length > 0)
                {
                    tabneu[0].parentNode.insertBefore(taborg, tabneu[0]);
                }
            }  
        }      
	}
    
    /*

	if (Datei == 'stat' && SID)
	{
        /*
		function MarkPos() // markiere die uebergebene Position und scrolle zu ihr
		{
			if (!location.hash.length) { return; } // falls keine Position markiert wurde - abgang
			var Pos = InInt(location.hash.substr(1)); // markierte Position
			var PosZellen = FindeXPath('//tr/th[1]/text()[starts-with(string(),"' + Pos + '")]');
			if (!PosZellen.length) { return; } // falls kein Tag gefunden wurde - weg
			var PosZeile = PosZellen[0].parentNode.parentNode; // Zeile mit diesem Spieler
			PosZeile.scrollIntoView(); // Zelle anzeigen
			
			//for (var i = 0; i < PosZeile.childNodes.length; i++) // alle Kindknoten der Zeile
			//{
			//	if (PosZeile.childNodes[i].nodeType == 1) { PosZeile.childNodes[i].style.fontSize = '13pt'; } // die ein Tag sind vergroessern
			//}
		}
		
		// Formular bearbeiten, damit der Anker nicht uebernommen wird
		document.forms[0].action = '/game/index.php?page=stat&session=' + SID + '#';
		MarkPos(); // damit die returns funktionieren
    }

	// in allen anderen Seiten, die Statistik-Links enthalten
	if (Datei == 'overview' || Datei == 'suche')
	{
		// Stat-Links korrigieren
		var StatLinks = getEBF(document, 'a', 'href.indexOf("page=stat") >= 0'); //FindeXPath('//a[contains(@href,"page=stat")]'); // alle Stat-Links finden
		
		for (var i = 0; i < StatLinks.length; i++) // Links berarbeiten
		{
			var Pos = InInt(StatLinks[i].firstChild.nodeValue); // Position auf die verlinkt wird (steht im Text)
			if (Pos) { StatLinks[i].href += '#' + Pos; } // falls es eine Position ist, diese als Anker hintendransetzen (der Anker wird von diesem Skript interpretiert)
		}
	}
	*/
	
	//-----------------------------
	// Die Imperiumansicht aendern
	//-----------------------------
	if (Datei == 'imperium' && ogs_load('imperium_calc_resis'))
	{
	    ogs_load('imperium_kosten');
	    
		// Init Vars
		var Schnitt = 0;
		var ProdSumme = 0;
		var Summe = 0;
		var Rows = getEBF(ContDiv, 'table', 'width == 750'); //FindeXPath('//table[@width="750"]/tbody/tr');
		Rows = Rows[0].rows;
		
		var impcode = '<b>Tagesproduktion</b>';
		var impzahl = 0;
		var impseite = 0;
        var vColorRess = new Array(ogs_load('color_met'),ogs_load('color_kris'),ogs_load('color_deut'),ogs_load('color_eng'))
		var planiEnergie = new Array();
		
		for (var z = 0; z < Rows.length; z++)
		{
			var headers = Rows[z].getElementsByTagName('td');
			
			if (headers[0])
			{
				switcher = headers[0].innerHTML.substring(0, 3);
				//headers[0].innerHTML = 'test';
			}
			
			switch(switcher)
			{
				case 'Roh': // Ress
					Summe = 0;
					Schnitt = 0;
					ProdSumme = 0;
					var Zellen = Rows[z].cells;
					
					if (Zellen.length > 1)
					{
						if (Zellen[0].innerHTML != 'Energie')
						{
							for (var i = 1; i < Zellen.length-1; i++)
							{
								var ress_neu = Zellen[i].innerHTML.match(/\s+[\.0-9]+\s+/g);
                                
								if (ress_neu[0])
								{
									Summe += parseInt(ress_neu[0].replace(/<|>|\./g, ''));
								}
								if (ress_neu[1])
								{
									ProdSumme += parseInt(ress_neu[1].replace(/<|>|\./g, ''));
									impseite += parseInt(ress_neu[1].replace(/<|>|\./g, ''));
								}
							}
							
							if (Zellen[0])
							{
								if (impseite == 0)
								{
								    Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + vColorRess[impzahl] + ';"> ' + TausenderZahl(Summe) + '</span>';
							    }
								else
								{
								    Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + vColorRess[impzahl] + ';"> ' + TausenderZahl(Summe) + '</span><br />&Sigma;<span style="color:' + vColorRess[impzahl] + ';"> ' + TausenderZahl(ProdSumme) + '</span>';
								}
								
								if (impzahl == 0)
								{
								    impcode += '<p>M: <span style="color:' + vColorRess[impzahl] + ';">' + TausenderZahl(ProdSumme * 24) + '</span><br>';
								}
								else if (impzahl == 1)
								{
								    impcode += 'K: <span style="color:' + vColorRess[impzahl] + ';">' + TausenderZahl(ProdSumme * 24) + '</span><br>';
								}
								else if (impzahl == 2)
								{
								    impcode += 'D: <span style="color:' + vColorRess[impzahl] + ';">' + TausenderZahl(ProdSumme * 24) + '</span>';
								}
								
								impzahl++;
							}
						}
						else
						{
							//var energie_zeile = z + 1; // variiert in verschiedenen Darstellungen
							for (var i = 1; i < Zellen.length-1; i++)
							{
							    var ress_neu = Zellen[i].innerHTML.match(/\s+[-\.0-9]+\s+/g);
							    
							    if (ress_neu[0] && ress_neu[1])
							    {
							        planiEnergie.push(new Array(parseInt(ress_neu[0].replace(/<|>|\./g, '')),parseInt(ress_neu[1].replace(/<|>|\./g, ''))));
							    }
                            }
						}
					}
				break;
				
				case 'Geb':
					var Zellen = Rows[z].cells;
					if (Zellen.length > 1)
					{
						Schnitt = 0;
						
						for (var i = 1; i < Zellen.length-1; i++)
						{
							var handler_neu = Zellen[i].innerHTML.match(/ [\.0-9]+ /g);
							
							if (handler_neu)
							{
								var mine = parseInt(handler_neu[0].replace(/\./g, ''));
								var nextmine = mine + 1;
								Schnitt += mine;
								
								if (settingscur['imperium_kosten'])
								{
								    var kosten = 0;
								    var energie = 0;
    								
								    if (Zellen[0].innerHTML.indexOf('MÃ©talmine') + 1)
								    {
									    kosten = Kosten(60, 15, 0, 1.5, nextmine);
									    energie = Energie(1, nextmine) - Energie(1, (nextmine - 1));
									    var f_energie = planiEnergie[i-1][0] + energie;
								    }
								    else if (Zellen[0].innerHTML.indexOf('Cristalmine') + 1)
								    {
									    kosten = Kosten(48, 24, 0, 1.6, nextmine);
									    energie = Energie(2, nextmine) - Energie(2, (nextmine - 1));
									    var f_energie = planiEnergie[i-1][0] + energie;
								    }
								    else if (Zellen[0].innerHTML.indexOf('DeutÃ©riumsynthetisierer') + 1)
								    {
									    kosten = Kosten(225, 75, 0, 1.5, nextmine);
									    energie = Energie(3, nextmine) - Energie(3, (nextmine - 1));
									    var f_energie = planiEnergie[i-1][0] + energie;;
								    }
								    else if (Zellen[0].innerHTML.indexOf('Solarkraftwerk') + 1)
								    {
									    kosten = Kosten(75, 30, 0, 1.5, nextmine);
									    energie = Energie(4, nextmine) - Energie(4, (nextmine - 1));
									    var f_energie = planiEnergie[i-1][0] + energie;
								    }
								    else if (Zellen[0].innerHTML.indexOf('Fusionskraftwerk') + 1)
								    {
									    kosten = Kosten(900, 360, 180, 1.8, nextmine);
									    energie = Energie(12, nextmine) - Energie(12, (nextmine - 1));
									    var f_energie = planiEnergie[i-1][0] + energie;
								    }
								    else if (Zellen[0].innerHTML.indexOf('Roboterfabrik') + 1)
									    kosten = Kosten(400, 120, 200, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('Nanitenfabrik') + 1)
									    kosten = Kosten(1000000, 500000, 100000, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('Raumschiffwerft') + 1)
									    kosten = Kosten(400, 200, 100, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('MÃ©talspeicher') + 1)
									    kosten = Kosten(2000, 0, 0, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('Cristalspeicher') + 1)
									    kosten = Kosten(2000, 1000, 0, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('DeutÃ©riumtank') + 1)
									    kosten = Kosten(2000, 2000, 0, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('Forschungslabor') + 1)
									    kosten = Kosten(200, 400, 200, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('Terraformer') + 1)
								    {
									    kosten = Kosten(0, 50000, 100000, 2, nextmine);
									    energie = Math.floor(1000 * Math.pow(2, (nextmine - 1)), 0);
									    var f_energie = energie - planiEnergie[i-1][1];
								    }
								    else if (Zellen[0].innerHTML.indexOf('Allianzdepot') + 1)
									    kosten = Kosten(20000, 40000, 0, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('Raketensilo') + 1)
									    kosten = Kosten(20000, 20000, 1000, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('Mondbasis') + 1)
									    kosten = Kosten(20000, 40000, 20000, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('Sensorphalanx') + 1)
									    kosten = Kosten(20000, 40000, 20000, 2, nextmine);
								    else if (Zellen[0].innerHTML.indexOf('Sprungtor') + 1)
									    kosten = Kosten(2000000, 4000000, 2000000, 2, nextmine);
    									
                                    if (energie != 0)
                                    {
								        if (f_energie >= 0)
								        {
								            f_color = 'green';
								        }
								        else
								        {
								            f_color = 'red';
								        }
								    }
								    
								    Zellen[i].innerHTML += ((kosten[0] > 0) ? '<br>M: <span style="color:' + TextCol + ';">' + TausenderZahl(kosten[0].toString()) + '</span>' : '') + ((kosten[1] > 0) ? '<br>K: <span style="color:' + TextCol + ';">' + TausenderZahl(kosten[1].toString()) + '</span>' : '') + ((kosten[2] > 0) ? '<br>D: <span style="color:' + TextCol + ';">' + TausenderZahl(kosten[2].toString()) + '</span>' : '') + ((energie != 0) ? '<br>E: <span style="color:' +TextCol + ';">' + TausenderZahl(energie.toString(),true) + '</span> (<span style="color:' + f_color + ';">' + TausenderZahl(f_energie.toString(),true) + '</span>)' : '');
                                }
							}
						}
						
						Schnitt = Math.round((Schnitt / (i - 1)) * 100) / 100;
						
						if (Zellen[0])
						{
							Zellen[0].innerHTML = Zellen[0].innerHTML + '<br />&Oslash;<span style="color:' + TextCol + ';"> ' + Schnitt + ' </span>';
						}
					}
				break;
				
				case 'For':
					var Zellen = Rows[z].cells;
					if (Zellen.length > 1)
					{
						Schnitt = 0;
						for (var i = 1; i < Zellen.length-1; i++)
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
							Zellen[0].innerHTML = Zellen[0].innerHTML + '<br />&Oslash;<span style="color:' + TextCol + ';"> ' + Schnitt + ' </span>';
						}
					}
				break;
				
				case 'Sch':
					var Zellen = Rows[z].cells;
					if (Zellen.length > 1)
					{
						Summe = 0;
						Schnitt = 0;
						for (var i = 1; i < Zellen.length-1; i++)
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
							Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + TextCol + ';"> ' + TausenderZahl(Summe) + '</span>&nbsp;&nbsp;&nbsp;&Oslash;<span style="color:' + TextCol + ';"> ' + Schnitt + ' </span>';
						}
					}
				break;
				
				case 'Ver':
					var Zellen = Rows[z].cells;
					if (Zellen.length > 1)
					{
						Summe = 0;
						Schnitt = 0;
						for (var i = 1; i < Zellen.length-1; i++)
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
							Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + TextCol + ';"> ' + TausenderZahl(Summe) + '</span>&nbsp;&nbsp;&nbsp;&Oslash;<span style="color:' + TextCol + ';"> ' + Schnitt + ' </span>';
						}
					}
				break;
			}
		}
		
		if (impseite > 0)
		{
			var LeerFeld = Rows[1].cells; //FindeXPath('//table/tbody/tr[2]/th[1]');
			
			if (LeerFeld[0].innerHTML == '')
			{
				//LeerFeld[0].setAttribute('style', 'vertical-align:top;');
				LeerFeld[0].innerHTML = impcode;
			}
			else
			{
				var LeerFeld = Rows[2].cells; //FindeXPath('//table/tbody/tr[3]/th[1]');
				//LeerFeld[0].setAttribute('style', 'vertical-align:top;');
				LeerFeld[0].innerHTML = impcode;
			}
		}
	} // Ende der Imperium-Erweiterungen
	
	//---------------------------------------
	// Memberliste bereits sortiert anzeigen
	//---------------------------------------
	if (Datei == 'allianzen')
	{
		if (!document.URL.match(/a=/) && !ContDiv.innerHTML.match(/a=1"/))
		{
			//var ML_Link = FindeXPath('//table[@width="519"]/tbody/tr[4]/th[2]/a[1]');
			var ML_Link = getEBF(ContDiv, 'table', 'width == 519');
			
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
			                if (ML_Link.innerHTML.indexOf('Mitgliederliste') + 1 && ogs_load('ml_sort'))
			                {
				                var LinkNeu = ML_Link.href + '&sort1=' + ogs_load('ml_typ') + '&sort2=' + ogs_load('ml_art');
				                ML_Link.setAttribute('href', LinkNeu);
			                }
		                }
			        }
			    }
			}
		}
		
		if((ogs_load('show_punkte_diff') || ogs_load('show_punkte_diff_top')) && document.URL.match(/\&a=4\&/))
		{
		    ogs_load('punkte_diff_fontsize');
		    ogs_load('show_punkte_diff');
		    ogs_load('show_punkte_diff_top');
		    
		    var eigenepunkte = -1;
		    var toppunkte = -1;
		    var zeilen = getEBF(ContDiv,'table', 'width == 519'); //FindeXPath('//center/table[@width="519"]/tbody/tr');
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
			            spalten[3].innerHTML = spalten[3].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + TextCol + ';">' + TausenderZahl(statdiff.toString(),true) + '</font>';
		            }
                }
                
                if (settingscur['show_punkte_diff_top'])
                {
                    if (toppunkte > -1)
                    {
		                var statdiff = toppunkte - thispunkte;
		                spalten[4].innerHTML = spalten[4].innerHTML + '<br><font style="font-size: '+ settingscur['punkte_diff_fontsize'] +'; color:' + TextCol + ';">' + TausenderZahl(statdiff.toString(),true) + '</font>';
                    }
                    
                    toppunkte = thispunkte;
                }
            }
		}
	}
	
	//------------------
	// Die Gala aendern
	//------------------
	if (Datei == 'galaxy')
	{
        if (ogs_load('galaxietool'))
        {
            var tabneu = getEBF(ContDiv, 'table', 'width == 569'); //FindeXPath('//center/table[@width="569"]');
            
            if(tabneu.length > 0)
            {
                var taborg = tabneu[0].cloneNode(true);
                taborg.style.display = "none";
            }
        }

		var FoxGameVerkl = -1; // speichert, ob FoxGame die Gala verkleinert hat
		
		if (ogs_load('tf_limit'))
		{
            ogs_load('color_met');
            ogs_load('color_kris');
            ogs_load('tf_color');
		}
		
		ogs_load('platz_anzeige');
		ogs_load('allyplatz_anzeige');
		ogs_load('gala_statslink_show');
		
		
		if (ogs_load('gala_iprak_aktiv'))
		{
		    var ipziel = document.getElementsByName('pziel');
		    
		    if (ipziel.length > 0)
		    {
		        ipziel = ipziel[0];
		        
		        var value = ogs_load('gala_iprak_wert');
                
                if (value >= 0 && ipziel.length > value)
	    	        ipziel.selectedIndex = value;
	    	    
	    	    if (ogs_load('gala_iprak_max'))
	    	    {
	    	        var ipanzahl = document.getElementsByName('anz');
	    	        
	    	        if (ipanzahl.length > 0)
	    	        {
    	    	        ipziel = ipziel.parentNode.parentNode.cells[0];
    	    	        ipanzahl[0].value = ipziel.innerHTML.match(/Raketenanzahl \(([0-9]*) vorhanden\):/)[1];
    	    	    }
	    	    }
		    }
		}
		
		if(ogs_load('gala_ally_faerben'))
		{
		    var allyspielerfarben = ogs_split(ogs_load('gala_ally_spieler_farben'),'|','&');
		}
		
		var Zeile = getEBF(ContDiv, 'table', 'width == 569'); //FindeXPath('//table[@width="569"]');

		if (Zeile.length > 0)
		{
		    Zeile = Zeile[0].rows;
		    var an; var pn;
		    
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
			                    if (Spalte[Spalte.length-1].innerHTML.match("Allianz")) // nur shortcuts off
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
				            
					        var TFM = InInt(aHref.getAttribute('onmouseover').match(/Metal:<\/th><th>([.0-9]+)/)[1]);
					        var TFK = InInt(aHref.getAttribute('onmouseover').match(/Cristal:<\/th><th>([.0-9]+)/)[1]);
					        
					        if (TFM + TFK >= ogs_load('tf_limit'))
					        {
						        PlaniName.appendChild(document.createElement('br'));
						        PlaniName.appendChild(NeuesElement('span', '(M: <font color="'+settingscur['color_met']+'">' + TausenderZahl(TFM) + '</font>, K: <font color="'+settingscur['color_kris']+'">' + TausenderZahl(TFK) + '</font>)', 'style', 'color:' + TextCol + ';'));
                                
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
					        var Platz = aHref.getAttribute('onmouseover').match(/classÃ© ([.0-9]+)/);
					        
					        if (Platz == null)
					            Platz = "???";
					        else
					            Platz = TausenderZahl(parseInt(Platz[1], 10));
					        
				            PlayerName.appendChild(document.createElement('br'));
				            PlayerName.appendChild(NeuesElement('span', '#' + Platz  + '&nbsp;', 'style', 'color:' + TextCol + ';'));
				        }
				    }
				    
		            if (settingscur['allyplatz_anzeige'])
		            {
				        var AllyName = Spalte[6-FoxGameVerkl];
				        var aHref = AllyName.getElementsByTagName('a')[0];
        				
				        if (aHref)
				        {
					        var AlPlatz = aHref.getAttribute('onmouseover').match(/classÃ©e ([.0-9]+)/);
					        if (AlPlatz == null)
					            AlPlatz = '???'
					        else 
					            AlPlatz = TausenderZahl(parseInt(AlPlatz[1], 10));
					        
					        var AnzMtgl = aHref.getAttribute('onmouseover').match(/avec ([.0-9]+)/);
					        if (AnzMtgl == null)
					            AnzMtgl = '???'
					        else 
					            AnzMtgl = TausenderZahl(parseInt(AnzMtgl[1], 10));
					        
					        AllyName.appendChild(document.createElement('br'));
					        AllyName.appendChild(NeuesElement('span', '#' + AlPlatz + ' / ' + AnzMtgl + '', 'style', 'color:' + TextCol + ';'));
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
    				        an = AllyName.innerHTML.trim();
				        }
				        else
				            an = '';
				        
				        if (pn.length > 0 || an.length > 0)
				        {
				            for (var j = 0; j < allyspielerfarben.length; j++)
				            {
				                if (1 == allyspielerfarben[j][1])
				                {
				                    if (an.length > 0)
				                    {
				                        if (an == allyspielerfarben[j][0])
				                        {
				                            AllyName.style.color = allyspielerfarben[j][2];
				                        }
				                    }
				                }
				                else
				                    if (pn.length > 0)
				                        if (pn == allyspielerfarben[j][0])
				                            PlayerName.style.color = allyspielerfarben[j][2];
				            }
                        }
				    }
				    
				    if (settingscur['gala_statslink_show'])
				    {
				        var PlayerName = Spalte[5-FoxGameVerkl].getElementsByTagName('a');
				        if (PlayerName.length > 0)
				        {
				            PlayerName = PlayerName[0];
    				        pn = PlayerName.getElementsByTagName('span')[0].innerHTML.trim();
				            PlayerName.href = ogs_getLink('http://war-riders.de/index.cgi?uni='+Server.match(/\d+/)+'&page=details&type=player&name='+pn);
			                PlayerName.target = '_blank';
			            }
                    }
		        }
		    }
		}
		
        if (ogs_load('galaxietool'))
        {
            if (tabneu.length > 0)
            {
                tabneu[0].parentNode.insertBefore(taborg, tabneu[0]);
                
                //loeschen der benÃ¶tigten ids fÃ¼r info anzeige
                var deleteme = null;
                
                deleteme = document.getElementById('fleetstatusrow');
                if (deleteme)
                    deleteme.parentNode.removeChild(deleteme);
                
                deleteme = document.getElementById('probes');
                if (deleteme)
                    deleteme.parentNode.removeChild(deleteme);
                
                deleteme = document.getElementById('recyclers');
                if (deleteme)
                    deleteme.parentNode.removeChild(deleteme);
                
                deleteme = document.getElementById('slots');
                if (deleteme)
                    deleteme.parentNode.removeChild(deleteme);
            }
        }
	}
	
	//-----------
	// Farmliste
	//-----------
	if (ogs_load('farmliste_aktiv'))
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
				
				if (planitype == 1) return "Planet";
				if (planitype == 2) return "TF";
				if (planitype == 3) return "Mond";
				
				return "";
			}

			function addCoords(event) {
				var coords = "";
				
				if (gala) {
					var planet = this.innerHTML;
					coords = gala + ':' + uklad + ':' + planet;
				}
				else 
					coords = prompt('Veuillez inscrire vos coordonnÃ©es en suivant ce format X:XXX:XX' );
				
				var desc = prompt('Veuillez inscrire votre commentaire.');
				var typ = prompt('Type , 1 - PlanÃ¨te, 2 - Champs de dÃ©bris, 3 - Lune','1');
				
				ogs_save('farmliste_liste', ogs_load('farmliste_liste')+'^'+coords+'|'+desc+'|'+typ);
				
				if (neueseite_user == 'farmliste') showFarmliste();
				
				return false;
			}
				
			function delAll()
			{
				if (confirm ('Etes vous certains de vouloir effacer toutes les coordonnÃ©es?')) {
					ogs_save('farmliste_liste','');
					
					alert('Tout les coordonnÃ©es ont Ã©tÃ© Ã©ffacÃ©!');
					
					if (neueseite_user == 'farmliste') showFarmliste();
				}
			}

			function jumpmap(e) {
				var adres = e.target.firstChild.nodeValue;
				
				adres = getCoords(adres);
				
				if (adres != null)
				{
					document.location.href='index.php?page=galaxy&galaxy='+adres[0]+'&system='+adres[1]+'&planet='+adres[2]+'&session=' + SID;
				}
				
				return false;
			}

			function delcoord(event) {
				var adresyNowe = '';
				var nr = event.target.getAttribute('nr');
				var str = ogs_load('farmliste_liste');
				var adresy = str.split( '^' );
				
				for (var i in adresy)
					if (adresy[i]!='' && i != nr)
						adresyNowe = adresyNowe + '^' + adresy[i];
				ogs_save('farmliste_liste', adresyNowe);
				
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
				var str = ogs_load('farmliste_liste');
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
				
				ogs_save('farmliste_liste', str);
			}

			function editCoord(event) {
				CoordsTab = loadCoords();
				var nr = event.target.parentNode.parentNode.firstChild.firstChild.firstChild.nodeValue;
				
				if (coords = prompt('Bitte Koords eintragen X:XXX:XX', CoordsTab[nr][0]))
					if (desc = prompt('Bezeichnung eintragen', CoordsTab[nr][1])) 
						if (typ = prompt('Typ , 1 - Planet, 2 -TF, 3 - Mond', (CoordsTab[nr][2] != "undefined") ? CoordsTab[nr][2] : "1")){
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
				//nur starten wenn man erlaubnis hat die seite zu Ã¤ndern.
				if (neueseite_user != 'farmliste')
					return;
				
				//lÃ¶schen des nodes
				neueseite_neu.parentNode.removeChild(neueseite_neu);
				
				//wiederanzeigen des orginals
				neueseite_orginal.style.display = "block";
				
				//seite freigeben
				neueseite_user = '';
				delete neueseite_orginal;
				delete neueseite_neu;
			}
			
			function showFarmliste()
			{
				//wenn seite leer ist dann werte setzten
				if (neueseite_user == '')
				{
					neueseite_user = 'farmliste';
					neueseite_orginal = document.getElementById('content');
					neueseite_neu = neueseite_orginal.parentNode.insertBefore(neueseite_orginal.cloneNode(false), neueseite_orginal);
					
					neueseite_orginal.style.display = "none";
				}
				
				//nur starten wenn man erlaubnis hat die seite zu Ã¤ndern.
				if (neueseite_user != 'farmliste')
					return;
				
				//leer machen bevor sie wieder aufgefÃ¼llt wird
				while (neueseite_neu.firstChild)
					neueseite_neu.removeChild(neueseite_neu.firstChild);
				
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
				
				var str = ogs_load('farmliste_liste');
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
							addEvent(a,'click', moveCoord, false);
							a.appendChild(document.createTextNode(i));
							th.appendChild(a);
							
							th = tr.appendChild(document.createElement('TH'));
							a = document.createElement('A');
							a.href = '#';
							addEvent(a,'click', jumpmap, false);
							a.appendChild(document.createTextNode(arr[0]));
							if (getCoords(arr[0]) == null)
							{
								a.style.color = "#ff0000";
							}
							th.appendChild(a);
							
							th = tr.appendChild(document.createElement('TH'));
							var ptext = getPlaniType(arr[2]);
							th.appendChild(document.createTextNode((ptext != "") ? ptext : arr[2]));
							
							if (ptext == "")
							{
								th.style.color = "#ff0000";
							}
							
							th = tr.appendChild(document.createElement('TH'));
							a = document.createElement('A');
							a.href = '#';
							addEvent(a,'click', editCoord, false);
							a.appendChild(document.createTextNode(arr[1]));
							th.appendChild(a);
							
							th = tr.appendChild(document.createElement('TH'));
							a = document.createElement('A');
							a.href = '#';
							a.setAttribute('nr',i);
							addEvent(a,'click', delcoord, false);
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
				addEvent(a,'click', hideFarmliste, false);
				a.appendChild(document.createTextNode('OK'));
				td.appendChild(a);
				
				neueseite_neu.appendChild(centertab);
			}

			function start1()
			{	
			    var x;
			    var y;
			    var z;
    			var vMenu = LeftDiv.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0]; //FindeXPath('//div[@id="menu"]/table/tbody')[0];
    			
    			//wenn menÃ¼ nicht gefunden dann abbruch...
    			if (vMenu.length == 0) return;
    			
				x = document.createElement('TR');
				y = document.createElement('TD');
				y.align = 'center';
				x.appendChild(y);
				z = document.createElement('INPUT');
				z.setAttribute('type','button');
				z.value='Nouvelle coordonnÃ©es';
				addEvent(z,'click',addCoords,false);
				y.appendChild(z);
				vMenu.appendChild(x);
				
				x = document.createElement('TR');
				y = document.createElement('TD');
				y.align = 'center';
				x.appendChild(y);
				z = document.createElement('INPUT');
				z.setAttribute('type','button');
				z.value='Effacer les coordonnÃ©es';
				addEvent(z,'click',delAll,false);
				y.appendChild(z);
				vMenu.appendChild(x);

				x = document.createElement('TR');
				y = document.createElement('TD');
				y.align = 'center';
				x.appendChild(y);
				z = document.createElement('INPUT');
				z.setAttribute('type','button');
				z.value='Toutes les coordonnÃ©es';
				addEvent(z,'click',showFarmliste,false);
				y.appendChild(z);
				vMenu.appendChild(x);
			}

			function start2()
			{
				//nur flottenseite
				if(Datei != 'flotten2') return;
				
				var x = document.getElementById('content').getElementsByTagName( 'table' );
				var y = x[0];
				var z = y.getElementsByTagName( 'tr' );
				var a = document.createElement( 'TR' );
				var b = document.createElement( 'TD' );
				
				b.innerHTML = 'Koordinaten-Liste';
				b.colSpan = 2;
				b.className = 'c';
				a.appendChild( b );
				y.appendChild( a );
				
				var str = ogs_load('farmliste_liste');
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
						if(arrC != null && getPlaniType(arr[2]) != "")
						{
							i++;
						
							//nÃ¤chste zeile erstellen
							if( ( i - 1 ) % 2 == 0 )
							{
								v = document.createElement( 'TR' );
							}
							
							o = document.createElement( 'TH' );
							var link = document.createElement( 'A' );
							link.href = 'javascript:setTarget('+arrC[0]+','+arrC[1]+','+arrC[2]+','+arr[2]+'); shortInfo()';				
							link.appendChild(document.createTextNode(arr[1]+' ['+arr[0]+']'));
							
							o.appendChild( link );
							v.appendChild( o );
							
							//nÃ¤chste zeile anhÃ¤ngen
							if( ( i - 1 ) % 2 == 0 )
							{
								y.appendChild( v );
							}
						}
					}
				}
			}
			
			//in gala ansicht links zum erstellen einer farm hinzufÃ¼gen
			if(Datei == 'galaxy')
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
						    addEvent(tagi[i],'click',addCoords,true);
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
	
	if (Datei == 'overview' || Datei == 'flotten1')
	{
	    if (ogs_load('skin_advance') && (ogs_load('schiffs_geschw') || ogs_load('flotten_zusatz')))
	    {
	        ogs_load('schiffs_geschw');
	        ogs_load('flotten_zusatz');
	        
		    var Links = ContDiv.getElementsByTagName('a'); //FindeXPath('//div[@id="content"]//a');
    		
		    for (var i = 0; i < Links.length; i++)
		    {
			    if (!Links[i].title || Links[i].title.search(/^[0-9]+$/) + 1) { continue; } // bei nur aus Zahlen bestehenden Titeln nichts tun (das sind die Counter)
    			
			    if (Datei == 'overview' && settingscur['flotten_zusatz'])
			    {
				    Links[i].title = Links[i].title.replace(/([0-9])([A-Z])/g, '$1, $2');
			    }
    			
			    if (Datei == 'flotten1' && settingscur['schiffs_geschw'] && (Links[i].title.indexOf('Geschwindigkeit: ') + 1 || Links[i].title.indexOf('Speed: ') + 1))
			    {
				    Links[i].setAttribute('class', 'geschw_anzeige');
			    }
		    }
        }
	}
	
	//-----------------------------
	// Einstellungsmenue erweitern
	//-----------------------------
	// In den Einstellungen
	if (Datei == 'options')
	{
		var ContDivCtr = ContDiv.getElementsByTagName('center')[0];
		ContDivCtr.appendChild(NeuesElement('span', '&nbsp;<br>OGame-Skript<br>&nbsp;', 'style', 'font-size: 12pt; font-weight: bold;'));
		var NeuTab = NeuesElement('table', '', 'align', 'center', 'width', '519');
		var HID = 0;
		var Code = '';
		
        
		NeuTab.innerHTML = Code;
		
		// Speicher-Zeile (manuell um die onclick-routine zuzuweisen)
		NeuZeile = NeuesElement('tr', '');
		NeuZelle = NeuesElement('th', '', 'colspan', '3');
		var NeuBtn = NeuesElement('input', '', 'type', 'button', 'value', 'Option');
		addEvent(NeuBtn,'click', ogs_setup_start, true);
		NeuZelle.appendChild(NeuBtn);
		NeuZeile.appendChild(NeuZelle);
		NeuTab.appendChild(NeuZeile);
		
		// Tabelle einbauen
		ContDivCtr.appendChild(NeuTab);
		
		// Lizenz-Tabelle, falls eine Version bekannt ist
		if (ogs_load('version'))
		{
			ContDivCtr.appendChild(document.createElement('br'));
			ContDivCtr.appendChild(document.createElement('br'));
			NeuTab = NeuesElement('table', '', 'align', 'center', 'width', '519');
			Code = '<tr><td class="c" colspan="2">OGame-Skript-Lizenz</td></tr>';
			Code += '<tr><th style="text-align:left;">OGame-Skript v' + ogs_load('version') + ', ein Greasemonkey-Userscript, das OGame um einige, n&uuml;tzliche Funktionen erweitert.<br />Copyright (C) 2006-2007 Windows-zerstoerer, ab M&auml;rz 2007 Eleria &amp; Co (siehe <a href="http://board.ogame.de/thread.php?threadid=435082" target="_blank">Thread im OGame-Forum</a>), ab Juli 2007 hakaz &amp; User-Gruppe des OGame-Forums (siehe <a href="' + ogs_getLink('http://allianz-sarin.de/Ogamescript/team.html') + '" target="_blank">Team</a>)</th></tr>';
			Code += '<tr><th style="text-align:left;">Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation ver&ouml;ffentlicht, weitergeben und/oder modifizieren, gem&auml;&szlig; Version 2 der Lizenz.</th></tr>';
			Code += '<tr><th style="text-align:left;">Die Ver&ouml;ffentlichung dieses Programms erfolgt in der Hoffnung, dass es dir von Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der VERWENDBARKEIT F&Uuml;R EINEN BESTIMMTEN ZWECK. Details findest du in der GNU General Public License.</th></tr>';
			Code += '<tr><th style="text-align:left;">F&uuml;r weitere Details, schaue dir die volle GPL im Internet an: <a href="' + ogs_getLink('http://www.gnu.org/licenses/gpl.html') + '" target="_blank">http://www.gnu.org/licenses/gpl.html</a><br />Auf deutsch: <a href="' + ogs_getLink('http://www.gnu.de/gpl-ger.html') + '" target="_blank">http://www.gnu.de/gpl-ger.html</a><br />Oder schreibe an die Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA.</th></tr>';
			NeuTab.innerHTML = Code;
			ContDivCtr.appendChild(NeuTab);
		}
	}

	
	//----------------
	// IGM-Messagemodus erweitern
	//----------------
	if (Datei == 'writemessages' && ogs_load('igm_signatur_bool'))
	{
		var text = document.getElementsByTagName('textarea');
		if (text.length >= 1)
		{
			setTextArea(text[0], (ogs_load('igm_signatur')).replace(/\\n/g,'\n'));
		}
	}
	
	//----------------
	// Skin erweitern
	//----------------
	if (ogs_load('skin_advance')) {
		var CSSStr = '#content table { empty-cells:show; }';
		
		switch(Datei) // Idee von Badhard
		{
			case 'flotten1':
				// Tabellen breiter machen
				CSSStr += 'table[width="519"] { width:' + TabBreite(800, 519) + 'px; }';
				
				// erforderliche GT/KT anzeigen + Schiffsgeschwindigkeiten anzeigen
				if (ogs_load('schiffs_geschw'))
				{
					CSSStr += 'a[title]:after { content:" ("attr(title)")"; color:' + TextCol + '; }';
					CSSStr += 'a.geschw_anzeige:after { content:" ("attr(title)")"; color:#009999; }';
				}
			break;
			
			case 'messages':
				// Tabellen breiter machen
				CSSStr += 'table[width="519"] { width:' + TabBreite(800, 519) + 'px; }';
				
				// Spioberichte zentrieren
				var Tabs = getEBF(document, 'table', 'width == 400'); //FindeXPath('//table[@width="400"]');
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
				var Tabs = getEBF(ContDiv, 'table', 'className == "s" && knoten.align == "top"'); //FindeXPath('//th[@class="s"]/table[@align="top"]');
				if (Tabs.length) { Tabs[0].align = 'center'; }
			break;
			
			case 'b_building' || 'buildings':
				// fehlende Ress umfaerben
				if (ogs_load('fehlress_als_text'))
				{
					CSSStr += 'a[title]:after {content:" ("attr(title)")"; color:' + TextCol + '; }';
				}
		    break;
		}
	    
	    document.getElementById('menu').firstChild.nextSibling.style.fontSize = '0pt';
		GM_addStyle(CSSStr);
	}
	
	//planiliste umgestallten
    if (ogs_load('plani_combobox'))
    {
        var head = document.getElementById('header_top');

        if (head != null)
        {
            head = head.getElementsByTagName('select');

            if (head.length > 0)
            {
                head = head[0];
                head.style.display = "none";
                
                ogs_load('plani_combobox_type');
                ogs_load('plani_combobox_val');
                ogs_load('plani_combobox_tooltip');
                
                var code = '<table class="ogs_planetenliste"><tr>';
                var line1 = '';
                var line2 = '</tr><tr>';
                var id = 0;
                var text = '';
                var textlen = 3;
                
                if (settingscur['plani_combobox_type'] == 2)
                {
                    textlen = 1;
                }
                else if (settingscur['plani_combobox_type'] == 3)
                {
                    textlen = 2;
                }
                
                for (var i = 1; i < Planis.length; i++)
                {
                    if (Planis[i]['Typ'] == 1)
                    {
                        id = i;
                        line1 += '<td><a href="#" ';
                        if (settingscur['plani_combobox_tooltip'] == true)
                            line1 += 'onmouseover="return overlib(\'<table width=\\\'100%\\\'><tr><td><center>' + Planis[id]['Name'] + '<br />' + Planis[id]['Koords'] + '</center></td></tr></table>\');" onmouseout="return nd();" ';
                        
                        line1 += 'onclick="location=\'' + Planis[id]['URL'] + '\'">';
                        
                        if (settingscur['plani_combobox_type'] == 0)
                        {
                            text = settingscur['plani_combobox_val'];
                        }
                        else if (settingscur['plani_combobox_type'] == 1)
                        {
                            text = Planis[id]['Gala']+'';
                        }
                        else
                        {
                            text = Planis[id]['Name'].substr(parseInt(settingscur['plani_combobox_val'],10),textlen)
                        }
                        
                        if (text.trim().length == 0)
                        {
                            text = "P"
                        }
                        
                        if(Planis[id]['Aktiv'])
                            line1 += '<font color="red">' + text + '<font></a></td>';
                        else
                            line1 += text + '</a></td>';
                        
                        if (Planis[i]['Partner'] > 0)
                        {
                            id = Planis[i]['Partner'];
                            line2 += '<td><a href="#" ';
                            if (settingscur['plani_combobox_tooltip'] == true)
                                line2 += 'onmouseover="return overlib(\'<table width=\\\'100%\\\'><tr><td><center>' + Planis[id]['Name'] + '<br />' + Planis[id]['Koords'] + '</center></td></tr></table>\');" onmouseout="return nd();" ';
                            
                            line2 += 'onclick="location=\'' + Planis[id]['URL'] + '\'">';

                            if(Planis[id]['Aktiv'])
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
                
                head.parentNode.innerHTML += code;
            }
        }
    }
    	
	//loadtime hinzufÃ¼gen
	var loadtimetext = "Laufzeit: " + ((new Date()).getTime() - ogs_startZeit.getTime()) + " ms";
	document.getElementById('ogs_loading').setAttribute('onmouseout','return nd();');
	document.getElementById('ogs_loading').setAttribute('onmouseover','return overlib("<table><tr><td>'+loadtimetext+'</td></tr></table>");');
	document.getElementById('ogs_version').setAttribute('onmouseout','return nd();');
	document.getElementById('ogs_version').setAttribute('onmouseover','return overlib("<table><tr><td>'+loadtimetext+'</td></tr></table>");');
}




















































































































/****************************************
* Funktionsabsatz - OGS Setup Funktionen
****************************************/

function ogs_setup_start()
{
    //wenn seite leer ist dann werte setzten
    if (neueseite_user == '')
    {
	    neueseite_user = 'ogs_setup';
	    neueseite_orginal = document.getElementById('content');
	    neueseite_neu = neueseite_orginal.parentNode.insertBefore(neueseite_orginal.cloneNode(false), neueseite_orginal);
		
	    neueseite_orginal.style.display = "none";
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
        //ja nein
	    for (var i = 0; i < ogs_setup_save_yesno.length; i++)
	    {
		    ogs_save(ogs_setup_save_yesno[i], document.getElementById('' + ogs_setup_save_yesno[i]).checked);
	    }

	    //farben
	    for (var i = 0; i < ogs_setup_save_color.length; i++)
	    {
    	    ogs_save(ogs_setup_save_color[i], (document.getElementById(ogs_setup_save_color[i]).value.toLowerCase() != "transparent") ? ColorChk(document.getElementById(ogs_setup_save_color[i]).value) : "transparent");
	    }

	    //text
	    for (var i = 0; i < ogs_setup_save_text.length; i++)
	    {
	        ogs_save(ogs_setup_save_text[i], document.getElementById(ogs_setup_save_text[i]).value);
	    }

	    //textarea
	    for (var i = 0; i < ogs_setup_save_textarea.length; i++)
	    {
	        var text = getTextArea(document.getElementById(ogs_setup_save_textarea[i]));
            text = text.replace(/\n/g,'\\n'); //sicherstellen das keine zeilenumbrueche enthalten sind
	        ogs_save(ogs_setup_save_textarea[i], text);
	    }

	    //zahlen
	    for (var i = 0; i < ogs_setup_save_zahl.length; i++)
	    {
	        var x = parseInt(document.getElementByID(ogs_setup_save_zahl[i]).value);
    	    
	        if (ogs_setup_save_zahl_min[i] != 0 && ogs_setup_save_zahl_max[i] != 0)
	        {
	            if (x < ogs_setup_save_zahl_min[i])
	                x = ogs_setup_save_zahl_min[i];
    	    
	            if (x > ogs_setup_save_zahl_max[i])
	                x = ogs_setup_save_zahl_max[i];
            }
            
            ogs_save(ogs_setup_save_zahl[i],x);
	    }

    	//option
    	for (var i = 0; i < ogs_setup_save_option.length; i++)
    	{
    	    var thisoption = document.getElementById(ogs_setup_save_option[i]);
    	    ogs_save(ogs_setup_save_option[i], thisoption.options[thisoption.selectedIndex].value);
    	}

	    //listen
	    for (var i = 0; i < ogs_setup_save_listen.length; i++)
	    {
	        eval(ogs_setup_save_listen[i]+'(0,0,5);');
	    }

	    // Speichern fertig
	    window.alert('Degisiklikleri kaydedilmistir lutfen sayfayi yenileyiniz.');
	    ogs_setup_close();
    }

	//functionen liste
	function ogs_reiter(id) // Dynamische Menues nach Code Badhard
	{
		var kartei = document.getElementById('r' + id);
		
		if (kartei.style.display == 'none')
		{
	        if (ogs_setup_open != null)
	            ogs_setup_open.style.display = 'none';
	        
	        if (ogs_browser == "ff")
	        {
		        kartei.style.display = 'table-row-group';
		    }
		    else if (ogs_browser == "ie")
		    {
		        kartei.style.display = 'block';
		    }
		    else
		    {
		        debug("Unsupported Web-Browser");
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
		var ids = id.split(" ");
		
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
				row.style.display = 'table-row';
				var inputs = row.getElementsByTagName('input');
				
				if (inputs.length && inputs[0].type=='checkbox')
				{
					inputs[0].click();
					inputs[0].click();
				}								
			}
		}
	}
	
	//functions zugÃ¤nglich machen
	unsafeWindow.ogs_reiter = ogs_reiter;
	unsafeWindow.ogs_block = ogs_block;
	
	function createCheck(id, header, content)
	{
	    //zum speichern eintragen
	    ogs_setup_save_yesno.push(id);

		if (createCheck.arguments.length > 3)
		{
		    if(!ogs_load(id))
		        hidestring += createCheck.arguments[3] + ' ';
		}
	    
		coder += '<tr id="'+id+'1"';

		if (hidestring.indexOf(id+'1')+1)
		    coder += ' style="display: none;"';
        
		coder += '><th style="color: '+ogs_load('skriptcolor')+'">'+header+'</th><th>' + content + '</th><th><input type="checkbox" id="' + id + '"';
		
		if (createCheck.arguments.length > 3)
		{
			coder += 'onchange="ogs_block(\u0027'+createCheck.arguments[3]+'\u0027,\u0027'+id+'\u0027)"';
		}
		
		if (ogs_load(id))
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

		coder += '><th style="color: '+ogs_load('skriptcolor')+';">'+header+'</th><th>' + content + '</th><th>';
		coder += '<input type="text" id="' + id + '" size="' + ((size) ? size : 10) + '" '
		
		if(maxlength) coder += 'maxlength="' + maxlength + '" '
			coder += 'value="' + ogs_load(id) + '"></th></tr>';
	}
	
	function createTextArea(id, header, content, cols, rows)
	{
	    //zum speichern eintragen
	    ogs_setup_save_textarea.push(id);
	    
		coder += '<tr id="'+id+'1"';

		if (hidestring.indexOf(id)+1)
		    coder += ' style="display: none;"';

		coder += '><th style="color: '+ogs_load('skriptcolor')+';">'+header+'</th><th>' + content + '</th><th>';
		coder += '<textarea id="' + id + '" cols="'+cols+'" rows="'+rows+'"></textarea></th></tr>';
	}
	
	function createColTxt(id,header,content,transparent)
	{
	    //zum speichern eintragen
	    ogs_setup_save_color.push(id);
	    
		//wenn text vorhanden ist absatz hinzufÃ¼gen
		if (content != '') content += "<br />";
		
		coder += '<tr id="'+id+'1"';
		
		if (hidestring.indexOf(id)+1)
		    coder += ' style="display: none;"';
		
		coder += '><th style="color: '+ogs_load('skriptcolor')+'">'+header+'</th><th>' + content + AddColorSel(id,transparent) + '</th><th>';
		coder += '<input type="text" id="' + id + '" size="10" value="' + ogs_load(id) + '"></th></tr>';
	}
	
	function createOption(id, header, content, list, selectedindex)
	{
	    //zum speichern eintragen
	    ogs_setup_save_option.push(id);
	    
		coder += '<tr id="'+id+'1"';

		if (hidestring.indexOf(id)+1)
		    coder += ' style="display: none;"';

		coder += '><th style="color: '+ogs_load('skriptcolor')+'">'+header+'</th><th>' + content + '</th><th>';
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
	
	function createHeader(header, body)
	{
		HID++;
		var code = '';
		codel += '<tr><th>';
		codel += '<center><a href="#" onclick="ogs_reiter(' + HID + ')">' + header + '</a></center></th></tr>';
		coder += '<tbody id="r' + HID + '" style="display: none;">';
	    coder += '<tr><th colspan="3"><b><u>' + header + '</u></b><br /><br />' + body + '</th></tr>';
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
            retstr += '<th align="center" style="color: '+ogs_load('skriptcolor')+';">'+listheader[i]+'</th>';
        }
        
        if (nodel != true)
            retstr += '<th align="center" style="color: '+ogs_load('skriptcolor')+';">Effacer</th>';
        
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
	                    retstr += '<th colspan="' + (listheader.length + 1) + '"><font style="font-size: larger;">' + liste[i][j] + '</font></th>';
	                }
	                else
                    {
	                    retstr += '<th align="left" colspan="' + (listheader.length) + '"><font style="font-size: larger;">' + liste[i][j] + '</font></th>';
	                }
	                
	                ueberschrift = true;
	                break; // aus schleife raus
	            }
	            else
                {
                    retstr += '<th align="center" onclick="' + functionname + '(' + j + ',' + i + ',1);"><a href="javascript: return true;">' + eval(functionname+'('+ j + ',' + i + ',0);')+'</a></th>';
                }
	        }
	        
	        if (nodel != true && ueberschrift == false)
                retstr += '<th align="center" onclick="' + functionname + '(' + j + ',' + i + ',4);"><a href="#">&lt;Entf&gt;</a></th>';
            
	        retstr += '</tr>';
	    }
	    
        if (nodel != true)
        {
	        retstr += '<tr><th colspan="' + listheader.length + '" /><th align="center">';
	        retstr += '<a href="#" onclick="' + functionname + '(0,0,3)">&lt;Neu&gt;</a></th></tr>';
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
	    4 = lÃ¶schen
	    5 = speichern
	    */
        
        if (mode == 0) //anzeigefunktionen
        {
            return ogs_menulinkliste[val][id];
        }

        if (mode == 1) //edit funktionen
        {
            var w1 = prompt('Wert eingeben:', ogs_menulinkliste[val][id]);
            w1 = w1.replace(/&/g,'%26');
            w1 = w1.replace(/|/g,'');
            
            if (w1 != null)
                ogs_menulinkliste[val][id] = w1;
            
	        createList('menu_link_liste',true, ogs_menulinkliste, new Array('Name','URL'),'ogs_menu_link_liste');
	        return;
        }
        
        if (mode == 2) return;
        
        if (mode == 3) //neues element
        {
            var w1 = 'Neuer Link';
            var w2 = 'http://www.ogame.de/';
            ogs_menulinkliste.push(new Array(w1,w2));
            
	        createList('menu_link_liste',true, ogs_menulinkliste, new Array('Name','URL'),'ogs_menu_link_liste');
	        return;
        }
        
        if (mode == 4) //lÃ¶schen
        {
            ogs_menulinkliste.splice(val,1);

	        createList('menu_link_liste',true, ogs_menulinkliste, new Array('Name','URL'),'ogs_menu_link_liste');
            return;
        }
        
	    if (mode == 5) //speicherfunktion
        {
            ogs_save('menu_link_liste',ogs_join(ogs_menulinkliste,'|','&'));
            return;
        }
	}
	
    function ogs_ally_farblist(id,val,mode,wert)
    {
	    /* mode:
	    0 = anzeigen
	    1 = editieren
	    2 = wert zuweisen
	    3 = neu
	    4 = lÃ¶schen
	    5 = speichern
	    */
	    if (mode == 0) // anzeigen
	    {
            if(id == 1)
            {
                if (ogs_allyfarbliste[val][id] == 1)
                    return 'Allianz';
                else
                    return 'Spieler';
            }
            else if(id == 2)
                return '<font color="'+ogs_allyfarbliste[val][id]+'">'+ogs_allyfarbliste[val][id]+'</font>'+ creatFarbSelecterOverLibCreator('ogs_ally_farblist',val,id);
            else
                return ogs_allyfarbliste[val][id];
	    }
	    
	    if (mode == 1) // editieren
	    {
            if (id == 1)
	        {
	            if (ogs_allyfarbliste[val][1] == 1)
	                ogs_allyfarbliste[val][1] = 0;
	            else
	                ogs_allyfarbliste[val][1] = 1;
	        }
	        else if (id == 0 || id == 2)
	        {
	            var w1 = prompt('Wert eingeben:', ogs_allyfarbliste[val][id]);
    	        w1 = w1.replace(/&/g,'');
    	        w1 = w1.replace(/\|/g,'');
    	        
	            if (w1 != null)
	                ogs_allyfarbliste[val][id] = w1;
	        }
	        
            createList('gala_ally_spieler_farben',true, ogs_allyfarbliste, new Array('Name','Ally/Spieler','Farbe'),'ogs_ally_farblist');
            return;
	    }
	    
	    if (mode == 2) // wert zuweisen
	    {
	        ogs_allyfarbliste[val][id] = wert;
	        
            createList('gala_ally_spieler_farben',true, ogs_allyfarbliste, new Array('Name','Ally/Spieler','Farbe'),'ogs_ally_farblist');
            return;
	    }
	    
	    if (mode == 3) // neu
	    {
            //alert(id + ' ' + val + ' ' + mode);
            var w1 = 'Neu'; //prompt('Allyanznamen','');
            var w2 = 1; //prompt('Ally (1) oder Spieler (0)','1');
            var w3 = '#ff0000'; //prompt('Farbwert','#ff0000');
    	    
            ogs_allyfarbliste.push(new Array(w1,w2,w3));

            createList('gala_ally_spieler_farben',true, ogs_allyfarbliste, new Array('Name','Ally/Spieler','Farbe'),'ogs_ally_farblist');
            return;
	    }
	    
	    if (mode == 4) //lÃ¶schen
	    {
	        ogs_allyfarbliste.splice(val,1);
	        
            createList('gala_ally_spieler_farben',true, ogs_allyfarbliste, new Array('Name','Ally/Spieler','Farbe'),'ogs_ally_farblist');
            return;
	    }
	    
        if (mode == 5) //speichernfunktion
        {
            ogs_save('gala_ally_spieler_farben',ogs_join(ogs_allyfarbliste,'|','&'));
            return;
        }
    }
	
	function ogs_flottenfarbenfunc(id,val,mode,wert)
	{
	    /* mode:
	    0 = anzeigen
	    1 = editieren
	    2 = wert zuweisen
	    3 = neu
	    4 = lÃ¶schen
	    5 = speichern
	    */
	    if (mode == 0) // anzeigen
	    {
	        if(id == 0)
	        {
	            if (ogs_flottenfarben[val][id].indexOf('own') == 0)
	            {
                    return 'Eigen';
                }
                else
	            {
                    return 'Fremd';
                }
            }
            if(id == 1)
            {
                if (ogs_flottenfarben[val][id] == 0)
                    return 'Hin';
                if (ogs_flottenfarben[val][id] == 1)
                    return 'R&uuml;ck';
                else
                    return 'Halt';
            }
            else if(id == 2 || id == 7)
                return '<font color="'+ogs_flottenfarben[val][id]+'">'+ogs_flottenfarben[val][id]+'</font>'+ creatFarbSelecterOverLibCreator('ogs_flottenfarbenfunc',val,id);
	        else if (id == 3)
	        {
	            if (ogs_flottenfarben[val][3] == 0)
	                return '<font style="font-style: normal;">normal</font>';
	            else if (ogs_flottenfarben[val][3] == 1)
	                return '<font style="font-style: italic;">italic</font>';
	        }
	        else if (id == 4)
	        {
	            if (ogs_flottenfarben[val][4] == 0)
	                return '<font style="text-transform: none;">normal</font>';
	            else if (ogs_flottenfarben[val][4] == 1)
	                return '<font style="text-transform: uppercase;">gro&szlig;</font>';
	            else if (ogs_flottenfarben[val][4] == 2)
	                return '<font style="text-transform: lowercase;">klein</font>';
	        }
	        else if (id == 5)
	        {
	            if (ogs_flottenfarben[val][5] == 0)
	                return '<font style="text-decoration: none;">normal</font>';
	            else if (ogs_flottenfarben[val][5] == 1)
	                return '<font style="text-decoration: underline;">unter</font>';
	            else if (ogs_flottenfarben[val][5] == 2)
	                return '<font style="text-decoration: overline;">&uuml;ber</font>';
	            else if (ogs_flottenfarben[val][5] == 3)
	                return '<font style="text-decoration: line-through;">durch</font>';
	            else if (ogs_flottenfarben[val][5] == 4)
	                return '<font style="text-decoration: blink;">blinken</font>';
	        }
	        else if (id == 6)
	        {
	            if (ogs_flottenfarben[val][6] == 0)
	                return '0';
	            else if (ogs_flottenfarben[val][6] == 1)
	                return '+';
	            else if (ogs_flottenfarben[val][6] == 2)
	                return '-';
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
	            var w1 = prompt('Wert eingeben:', ogs_flottenfarben[val][id]);

	            if (w1 == null) return;

    	        w1 = w1.replace(/&/g,'');
    	        w1 = w1.replace(/\|/g,'');
	            ogs_flottenfarben[val][id] = w1;
	        }
	        else if (id == 3)
	        {
	            ogs_flottenfarben[val][3]++;
	            
	            if (ogs_flottenfarben[val][3] > 1)
	                ogs_flottenfarben[val][3] = 0;
	        }
	        else if (id == 4)
	        {
	            ogs_flottenfarben[val][4]++;
	            
	            if (ogs_flottenfarben[val][4] > 2)
	                ogs_flottenfarben[val][4] = 0;
	        }
	        else if (id == 5)
	        {
	            ogs_flottenfarben[val][5]++;
	            
	            if (ogs_flottenfarben[val][5] > 4)
	                ogs_flottenfarben[val][5] = 0;
	        }
	        else if (id == 6)
	        {
	            ogs_flottenfarben[val][6]++;
	            
	            if (ogs_flottenfarben[val][6] > 2)
	                ogs_flottenfarben[val][6] = 0;
	                
	        }
	        
            var te = document.getElementById('test_flotten_farben1').getElementsByTagName('table');
            te = te[0].getElementsByTagName('tr');
            te[val+1].getElementsByTagName('th')[id].innerHTML = '<a href="javascript: return true;">' + ogs_flottenfarbenfunc(id,val,0) + '</a>';
            return;
	    }
	    
	    if (mode == 2) // wert zuweisen
	    {
	        ogs_flottenfarben[val][id] = wert;
	        
            var te = document.getElementById('test_flotten_farben1').getElementsByTagName('table');
            te = te[0].getElementsByTagName('tr');
            te[val+1].getElementsByTagName('th')[id].innerHTML = '<a href="javascript: return true;">' + ogs_flottenfarbenfunc(id,val,0) + '</a>';
            return;
	    }
	    
	    if (mode == 3) // neu
	    {
            return;
	    }
	    
	    if (mode == 4) //lÃ¶schen
	    {
            return;
	    }
	    
        if (mode == 5) //speichernfunktion
        {
            //fbugfix der alten versionen
            var phalanxFound = false;
            var phalanxFound2 = false;
            var statioFound = false;
            
            var zusatz = '';
            
            //loeschen aendern erkennen
            for (var i = 0; i < ogs_flottenfarben.length; i++)
            {
                if (ogs_flottenfarben[i][0] == 'IP Racketen')
                    ogs_flottenfarben[i][0] = 'IP Raketen';
                
                if (ogs_flottenfarben[i][0] == 'ownmissile' && ogs_flottenfarben[i][1] == 1)
                    ogs_flottenfarben.splice(i,1);
                
                if (ogs_flottenfarben[i][0] == 'missile' && ogs_flottenfarben[i][1] == 1)
                    ogs_flottenfarben.splice(i,1);
                
                if (ogs_flottenfarben[i][0] == 'Phalanx')
                    phalanxFound = true;
                
                if (ogs_flottenfarben[i][0] == 'phalanx_fleet')
                {
                    if (ogs_flottenfarben[i][1] == 2)
                    {
                        phalanxFound2 = true;
                    }
                }
                
                if (ogs_flottenfarben[i][0] == 'owndeploy')
                {
                    if (ogs_flottenfarben[i][1] == 1)
                    {
                        statioFound = true;
                    }
                }
            }
            
            //hinzufuegen
            if (phalanxFound == false)
            {
                zusatz += 'Phalanx|phalanx_fleet&0&#55FF00&0&0&0&0&#E6EBFB|phalanx_fleet&1&#005500&0&0&0&0&#666666|';
            }
            
            //austauschen
            zusatz = ogs_join(ogs_flottenfarben,'|','&') + zusatz;
            
            if (statioFound == false)
            {
                zusatz = zusatz.replace('|deploy&0&','|owndeploy&1&#00ff00&1&0&0&2&#666666|deploy&0&');
            }
            
            if (phalanxFound2 == false)
            {
                zusatz = zusatz.replace('|phalanx_fleet&1&','|phalanx_fleet&2&#55FF00&0&0&1&1&#E6EBFB|phalanx_fleet&1&');
            }

            ogs_save('uebersicht_flotten_farben',zusatz);
            return;
        }
	}
	
	unsafeWindow.ogs_menu_link_liste = ogs_menu_link_liste;
    unsafeWindow.ogs_ally_farblist = ogs_ally_farblist;
    unsafeWindow.ogs_flottenfarbenfunc = ogs_flottenfarbenfunc;
    unsafeWindow.creatFarbSelecterOverLib = creatFarbSelecterOverLib;
    
    function creatFarbSelecterOverLibCreator(func, val, id)
    {
	    var ret = '<a href="#" onmouseout="return nd();"';
	    ret += ' onmouseover="eval(&quot;overlib(  eval(\\\'creatFarbSelecterOverLib(\\&quot;' + func + '\\&quot;,' + val + ',' + id + ')\\\')  , STICKY, MOUSEOFF, DELAY, 500, CENTER, OFFSETY, -40)&quot;)">*</a>';
	    return ret;
    }
    
    function creatFarbSelecterOverLib(func, val, id)
    {
	    var ret = "<center><table><colgroup>";
	    for (var i = 0; i < 8; i++)
	        ret += "<col width=\'20\'>";
	    ret += "</colgroup>";
	    
	    var tfarb = Array('00','55','aa','ff');
	    
	    for (var i1 = 0; i1 < 4; i1++)
	    {
    	    for (var i2 = 0; i2 < 4; i2++)
    	    {
    	        if (i2 == 0 || i2 == 2)
            	    ret += "<tr>";
            	
	            for (var i3 = 0; i3 < 4; i3++)
	            {
	                ret += "<td onclick=\'" + func + "(" + id + ',' + val + ',2,' + "&quot;#"+ tfarb[i1] + tfarb[i2] + tfarb[i3] +"&quot;); nd();\' style=\'background-color: #" + tfarb[i1] + tfarb[i2] + tfarb[i3] + "; background-image: none;\'>&nbsp;</td>";
	            }
	            
    	        if (i2 == 1 || i2 == 3)
            	    ret += "</tr>";
            }
	    }
	    
	    ret += '</table></center>';
        return ret;
    }
    
    var HID = 0;
	var code = '';
	var codel = '<table>';
	var coder = '<table><colgroup><col width="125"><col width="250"><col width="125"></colgroup>';
	
	// Allgemein Config
	createHeader('Genel', 'bu bolÃ¼mde genel gorunumu degistirebilirsin.');
    createColTxt('skriptcolor','eklentinin kullandigi ana renk','renk uzantilari girebilir isterseniz menuden secebilirsiniz');
	createEdit('max_tab_breite','Tum panellerin genislik ayari','panelin ve resimlerin genisligi ( 520 ile1.000)',5,4);
	createCheck('left_menu_fix', 'sol menu sabitleyici', 'sol munuyu duzenler ve daha hizli ve kullanisli olmasini saglarouvez peut Ãªtre le rÃ©glÃ© par Skin)');
	createCheck('endzeiten','ay gorunumu','ay gorunumu,)');
	createColTxt('color_met','Metal','metalin rengini seciniz');
	createColTxt('color_kris','Kristal','kristalin rengini seciniz');
	createColTxt('color_deut','Deuterium','deuteriumun rengini seciniz');
	createColTxt('color_eng','Enerji','Enerjinin rengini seciniz');
	createCheck('galaxietool','Galaksi Bicimlendirme','BU secenek gizli bir istatistik kopya olusturur(aktiflestirmede problem yasiyorsanÄ±z lutfen bize bildiriniz)');
	createHeaderCloser();
	
	// Ã�bersicht Config
	createHeader('Hesaplayici', 'genel gorunumun altinda hesaplama paneli ayarlari.');
	createCheck('zeit_links','ayrilan zaman','zaman belirteci dinamik saat');
	createCheck('ang_zeit','Ozel gosterim sati','zaman belirteci ve dinamik saat');
	createCheck('bewegteress','Kaynak aktarimi','hammedde aktarimi ');
	createCheck('handelsrechner','Donusturucu','bu menu sayesinde ticaret oranlarinin degerlerini girebilirsiniz','kursmet1 kurskris1 kursdeut1');
	createEdit('kursmet','','Metal',3,3);
	createEdit('kurskris','','Kristal',3,3);
	createEdit('kursdeut','','Deuterium',3,3);
	createHeaderCloser();
	
	// Imperiumseite Config
	createHeader('Ä°mparatorluk', 'Ä°mparotorluk menu ayarlarini buradan yapabilirsiniz.');
	createCheck('imperium_calc_resis','imparatorluk tanitimi','Butunleyici metinler ve menu gosterimi ');
	createCheck('imperium_kosten','bina gosterim','Bir sonraki bina adimi icin gerekenleri gosterir.');
	createHeaderCloser();
	
	// Bauseiten Config
	createHeader('Construction', 'Avec ces options, tu peux travailler l\'air des cÃ´tÃ©s de construction (bÃ¢timent, chantier, recherche et dÃ©fense).');
	createCheck('transbuild','Transporteur nÃ©cessaires','Indique le nombre  de transporteur nÃ©cessaire');
	createCheck('building_energie','Consommation d\'Ã©nergie','La consommation d\'Ã©nergie indiquÃ© pour un niveau suplÃ©mentaire de bÃ¢timent.');
	createCheck('colored_ress','Couleur des ressources','Les ressources nÃ©cessaires pour les constructions sont colorÃ©es (Uniquement avec le commandant)');
	createCheck('building_klein','petits cÃ´tÃ©s de construction','Pour retirer le texte de desciption et pour afficher les option de taille d\'image','building_klein_pics_size1');
	createEdit('building_klein_pics_size','Taille des images','Pour choisir la taille des images des menus construction en Pixel (60, 120,...)',4,3);
	createCheck('building_bg','Option couleur','Pour afficher les options de modifications des couleur de fond et de cadre dans les menus construction','building_bg_col11 building_bg_col21');
	createColTxt('building_bg_col1','Couleur de Fond','Si vous souhaitez modifier la couleur de fond des descriptifs dans les menus construction',true);
	createColTxt('building_bg_col2','Couleur de cadre','Si vous souhaitez modifier la couleur de cadre des descriptifs dans les menus construction',true);
	createCheck('building_nopics','Masquer les images','Pour masquer les images dans les menus construction');
	createCheck('building_doppelzeilen','Doppelzeile','Zeigt zwei Eintr'+ae+'ge pro Zeile an.');
	createHeaderCloser();
	
	/*
	// Rohstoffseite Config
	createHeader('Rohstoffe', 'Mit diesen Optionen kannst du das Aussehen der Technikseite bearbeiten.');
	
	createHeaderCloser();
	*/
	
	// Flottenseite Config
	createHeader('FÄ°LO', 'Asagidaki seceneklerle filo menusunu degistirebilirsin.');
	createCheck('fltmenu_buttons','Filo Butonlari','Resimleri ve detaylari gostermek');
	createCheck('warnung','Uyari','hata mesajlarini goster');
	createCheck('ankft_zeit','gelis zamani','gelismis saat bilgisi durma varma bekleme konuclandÄ±rma');
	createCheck('auto_auftrag','Auto-commande','Choisissent automatiquement une commande d\'envoie de flotte');
	
	ogs_load('def_plani');
	var list = new Array;
	var selected = 0;
	
	for (var i = 1; i < Planis.length; i++)  // Ueber alle Planis
	{
	    list.push(Planis[i]['ID']);
	    
		if (Planis[i]['ID'] == ((settingscur['def_plani'] > 0) ? settingscur['def_plani'] : HP_ID))
		{
		    selected = i-1;
		}
		
		if (Planis[i]['Typ'] == Typ_Mond)
		    list.push(' - ' + Planis[i]['Text']);
		else
		    list.push(Planis[i]['Text']);
	}
	//nur anzeigen wenn planiliste existiert (also in gala ansicht nicht anzeigen)
	if (Planis != 0)
	    createOption('def_plani','PlanÃ¨te par Default','Vous pouvez changer et choisir votre planÃ¨te par default',list,selected);
	createCheck('kein_deut','hic deu','Des boutons dans le menu filo ne font <i>pas</i> attention au deutÃ©rium');
	createCheck('stationieren_vorz','PrÃ©fÃ©rer le stationnÃ©','PrÃ©fÃ©rer le stationner au transporter dans le choix de mission par default');
	createCheck('flotte_seite2_combobox','Liste dÃ©roulante','Cela vous permet de remlacer la liste deroulante par des liens (lune/dÃ©bris/planÃ¨te) et (10,20,30,40,50,60,70,80,90,100).');
	createCheck('flotte_seite1_upsidedown','Upside Down','Die verschickbare Flotte erscheint oben');
	createCheck('flotte_seite2_tfwahl','Rec => TF','Wenn Recycler in Flotte verhanden, TF als Ziel vorausw'+ae+'len.');
	createCheck('flotte_schiffauswahl','Schiffsauwahl','Zeigt die ausgew'+ae+'hlten Schiffe auf der zweiten und dritten Flottenseite an.');
	createCheck('flotte_seite3_zeiten','Zeiten','Zeigt Flugdauer, Ankunft am Ziel / Ursprung auf der 3 Flottenseite an.');
	createHeaderCloser();
	
	// Techseite Config
	createHeader('Technique', 'Avec ces options, tu peux modifier le menu technologie.');
	createCheck('techtree_pics','Affichage d\'images','Si vous souhaitez afficher des images dans le menu technologie','techtree_pics_size1');
	createEdit('techtree_pics_size','Grandeur d\'images','Grandeur des images en pixel dans le menu technologie (z.b. 60, 120, ...)',4,3);
	createCheck('techtree_bg','Couleur','Si vous souhaitez modifier les couleur du menu technologie','techtree_bg_col11 techtree_bg_col21');
	createColTxt('techtree_bg_col1','Couleur de cellules','Cela vous permet de choisir la couleur du fond du descriptif dans le menu technologie',true);
	createColTxt('techtree_bg_col2','Couleur de cadre','Cela vous permet de choisir la couleur du cadre du descriptif dans le menu technologie',true);
	createCheck('techtree_doppelzeilen','Doppelzeile','Zeigt zwei Eintr'+ae+'ge pro Zeile an.');
	createHeaderCloser();
	
	// Galaxie Config
	createHeader('Galaxie', 'Dans ces option vous pouvez modifier la page Galaxie');
	createEdit('tf_limit','Limite Cdr','Seuil de Debris (Au dela de ce seuil, les champs de debris sont clairement indiquÃ©s. -1 desactive l\'affichage)');
	createColTxt('tf_color','Couleur cdr','Couleur pour le cadre autour du CDR',true);
	createCheck('platz_anzeige','Classement joueur','Afficher le classement joueur en descriptif.');
	createCheck('allyplatz_anzeige','Classement alliance','Afficher le classement  et le nombre de joueur de l\'alliance en descriptif.');
	createCheck('gala_statslink_show','Lien statistique','Ajout d\'un lien vers des statistique externe (Reste a dÃ©finir pour le fr, mais vers Ogs cela est possible).');
	
	createCheck('gala_iprak_aktiv','IPR Auswahl','','gala_iprak_wert1 gala_iprak_max1');
	var list = new Array;
	list.push('0'); list.push('Alle');
	list.push('1'); list.push('roket firlaticisi');
	list.push('2'); list.push('Leichtes Laser');
	list.push('3'); list.push('Schwere Laser');
	list.push('4'); list.push('GauÃ�kanone');
	list.push('5'); list.push('Ionengesch'+ue+'tz');
	list.push('6'); list.push('Plasmawerfer');
	list.push('7'); list.push('Kl Schildkuppel');
	list.push('8'); list.push('Gr Schildkuppel');
	createOption('gala_iprak_wert','','',list,ogs_load('gala_iprak_wert'));
	createCheck('gala_iprak_max','Maximum','Raketenanzahl auf Maximalwert einstellen.');

	
	createHeaderCloser();

	// Nachrichten Config
	createHeader('Espionnage', 'Avec ces options, tu peux modifier tes fonction espionnage.');
	createCheck('spio','Espionnage avancÃ©','Cela vous permet d\'ajouter informations et option dans les rapport d\'espionnage');

	createCheck('news_expo_aktiv','Expo','Farblich umranden','news_expo_farbe1');
	createColTxt('news_expo_farbe','Farbe','',true);
	createCheck('news_pm_aktiv','Nachrichten','Farblich umranden','news_pm_farbe1');
	createColTxt('news_pm_farbe','Farbe','',true);
	createCheck('news_am_aktiv','Allynachrichten','Farblich umranden','news_am_farbe1');
	createColTxt('news_am_farbe','Farbe','',true);

	createCheck('igm_signatur_bool','Signatur','erlaubt es jeder Privat Message eine Signatur anzuh'+ae+'ngen','igm_signatur1');
	createTextArea('igm_signatur','','Signatur',30,5);
	createHeaderCloser();

	// Statistik Config
	createHeader('Statistique et alliance', 'Avec ces options, tu peux modifier l\'affichage des statistique et de l\'alliance.');
	createCheck('show_punkte_diff','DiffÃ©rence de points','Cela vous permettrai d\'afficher la diffÃ©rence de points entre vous et les autres.');
	createCheck('show_punkte_diff_top','DiffÃ©rence de points','DiffÃ©rence toujours Ã  la place prÃ©cÃ©dente.');
	createEdit('punkte_diff_fontsize','Taille des caractÃ¨res','Taille des caractÃ¨res pour la diffÃ©rence de points');
	createCheck('stats_plusminusbuttons','bouton','Pour ajouter des boutons dans le menu statistique');
	createHeaderCloser();
	
	//allyseinfÃ¤rben
	createHeader('Alliance et couleur de joueur', 'Avec ces options, tu peux commander si et dans quelles couleurs des alliances et joueurs doivent Ãªtre colorÃ©es dans le menu de galaxie et dans les statistiques');
	createCheck ('gala_ally_faerben','Activer','Pour colorer les joueurs et les alliances dans le menu galaxie et les statistiques.','gala_ally_spieler_farben1');
	var ogs_allyfarbliste = ogs_split(ogs_load('gala_ally_spieler_farben'),'|','&');
	createList('gala_ally_spieler_farben',false, ogs_allyfarbliste, new Array('Nom','Alliance/Joueur','Couleur'),'ogs_ally_farblist');
	createHeaderCloser();
	
    // Skinerweiterung
	createHeader('Skin extension', 'Avec ces options, tu peux modifier ton skin.');
	createCheck('skin_advance', 'Extension de Skin', 'Des fonctions CSS supplÃ©mentaires sont ajoutÃ©es au Skin','flotten_zusatz1 fehlress_als_text1 schiffs_geschw1');
	createCheck('flotten_zusatz','Contenus de ffilo','Des filo dans l\'aperÃ§u avec le descriptif affichÃ©es de la charge et de la composition');
	createCheck('fehlress_als_text','Ressources manquantes','Les ressources manquantes affichÃ© (des bÃ¢timents etc.) (seulement avec le compte  Commandant)');
	createCheck('schiffs_geschw','Information','Des informations supplÃ©mentaires dans le menu flotte, etc... (vitesses des vaisseaux, etc.)');
	createHeaderCloser();
	
	// Farmliste
	createHeader('Liste de coordonnÃ©es', 'Dans ces option tu peux gÃ©rer ce qui concerne la liste de coordonnÃ©es.');
	createCheck('farmliste_aktiv','Liste de coordonnÃ©es','Activer la liste de coordonnÃ©es');
	createHeaderCloser();
	
	// Planetenliste einstellen
	createHeader('PlanÃ¨te liste', 'Avec ces options, tu peux travailler ta liste de planÃ¨te.');
	createCheck('planiliste_aend','Liste de planÃ¨te transformÃ©','La liste de planÃ¨te modifiÃ©');
	createCheck('hp_oben','HP oben','HP au dÃ©but de la lite de planÃ¨te (indÃ©pendamment du classement)');
	createCheck('keine_planinamen','Aucun nom de planÃ¨te','Les noms de planÃ¨te et de lune dans Planiliste n\'indiquent pas (seulement Koords et M pour des lunes)');
	createCheck('monde_getrennt','Lune sÃ©parÃ©','SÃ©parer les planÃ¨tes des lunes dans la liste dÃ©roulate des planÃ¨tes');
	
	createCheck('plani_combobox','Combobox','Ersetzt die Combobox zur Planiauswahl.','plani_combobox_type1 plani_combobox_val1 plani_combobox_tooltip1');
	var list = new Array;
	list.push('0'); list.push('Fester Text');
	list.push('1'); list.push('Galaxie');
	list.push('2'); list.push('1 Zeichen');
	list.push('3'); list.push('2 Zeichen');
	list.push('4'); list.push('3 Zeichen');
	createOption('plani_combobox_type','','Modus',list,ogs_load('plani_combobox_type'));
	createEdit('plani_combobox_val','','Bei "Fester Text" ist das der Text der angezeigt wird, sonst die Angabe an welcher Position im Planetennamen die Zeichen stehen die angezeigt werden sollen.',3,3);
    createCheck('plani_combobox_tooltip','Tooltips','Tooltips anzeigen?')
    
	createHeaderCloser();
	
	// Menu
	createHeader('Menu', 'Avec ces options, tu peux modifier le menu Ã  gauche. Tous les liens supplÃ©mentaires apparaissent au-dessous de l\'enseigne d\'imprimeur.');
	createEdit('menu_link_pos','Position d\'insertion','Devant quel lien du menu est-ce que, les liens doivent Ãªtre insÃ©rÃ©s ?-1 signifie entiÃ¨rement Ã  la fin.');
	createCheck('pranger', 'Pilori', 'Cela te permet d\'ajouter un liens dans le menu gauche pour consulter la liste du pilori');
	createCheck('menu_link_enable','Ajouter des liens dans le menu','Si vous souhaitez ajouter des liens personnalisÃ©s dans le menu gauche','menu_link_liste1');
	var ogs_menulinkliste = ogs_split(ogs_load('menu_link_liste'),'|','&');
	createList('menu_link_liste',false, ogs_menulinkliste, new Array('Nom','URL'),'ogs_menu_link_liste');
	createHeaderCloser();
	
	// Sicherheit
	createHeader('SÃ©curitÃ©', 'Avec ces options, tu peux entreprendre des embauches de sÃ©curitÃ©.<br><br>Par un link direct sur une page Web extÃ©rieure devient aussi la session euere ID (qui peut mener vers Accountklau) transmis pour empÃªcher on peut utiliser Dereferer (dans le principe une dÃ©viation sur autre espÃ©rons que, des sÃ»rs, la page Web).');
	createCheck('dereferer_use', 'Dereferer', 'Mise sous courant ?','dereferer_url1');
	createEdit('dereferer_url','URL','Adresse de page d\'accueil de Dereferers',10);
	createCheck('hintergrundbild_use', 'L\'image de fond changent ?','Respect : La page Web, elle l\'image de fond peut finir de lire de maniÃ¨re utilisÃ©e la session euere ID, mÃªme l\'option proposÃ©e ici *Dereferer* ne peut pas empÃªcher cela.','hintergrundbild_url1');
	createEdit('hintergrundbild_url','URL','"none" oder die Zeile leer lassen l'+oe+'scht das aktuelle Hintergrundbild, alle anderen Angaben werden als URL zu einen Bild interpretiert. Bitte beachtet das die SID ausgelesen von der Webseite des Bildes ausgelesen werden kann.',10);

	createHeaderCloser();
	
	// Allymitgliederliste
	createHeader('Membres d\'alliance', 'Avec ces options, tu peux travailler la liste d\'alliance.');
	createCheck('ml_sort','Classement des Membres','Le lien de la liste des membres autour du classement de dÃ©fault complÃ©tÃ©','ml_typ1 ml_art1');

	ogs_load('ml_typ');
	var list = new Array;
	var selected = 0;
	
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

	ogs_load('ml_art');
	var list = new Array;
	var selected = 0;
	
	for (var i = 0; i < MLArt.length; i++)
	{
	    list.push(i);
	    
		if (i == settingscur['ml_art'])
		{
		    selected = i;
		}
		
		list.push(MLArt[i]);
	}
	
	createOption('ml_art','','Classement de Default liste des membres (Reihenfolge))',list,selected);
	createHeaderCloser();
	
	createHeader('Couleurs de filo', 'Dans ces option vous pourrez modifier toutes les Ã©lÃ©ments des filo dans la vue genel.(couleur, taille, style, etc...)');
	createCheck('flotten_faerben','Couleurs de Filo','Pour afficher et activer le tableau de sÃ©lection','test_flotten_farben1');
    
    var thisdata = ogs_load('uebersicht_flotten_farben');
    if (thisdata.trim() == '')
        thisdata = settingsdef['uebersicht_flotten_farben'];
    
	var ogs_flottenfarben = ogs_split(thisdata,'|','&');
    createList('test_flotten_farben',false, ogs_flottenfarben, new Array('Art','Typ','Farbe','Style 1','Style 2','Style 3','Size','Link'),'ogs_flottenfarbenfunc',true);
	createHeaderCloser();
    
    //Globale einstellungen
	createHeader('Login option', 'Avec cette option, tu peux modifier tes option Login');
	createCheck('selectuniverse','Choix d\'univers','Si le choix d\'univers activÃ©.');
	createCheck('fokusonlogin','Foyer Login bouton','Active le foyer sur le champ Login.');
	createHeaderCloser();
	
	//Im+Export
	createHeader('Im &amp; Export', 'Mit dieser Option kannst du deine Einstellungen im/exportieren.<br /><br />Bitte beachte das grade vorgenommene '+Ae+'nderungen an den Einstellungen nicht mit exportiert werden bzw. beim Import verfallen.');

    var erg = new Array();
    for (var settings in settingsdef)
    {
        //einlesen
        erg.push(settings + ':=' + ogs_load(settings));
    }

    erg = erg.join('\n');
    erg = erg.replace(/&/g, '&amp;');
    
	coder += '<tr><th style="color: '+ogs_load('skriptcolor')+';">Export</th><th colspan="2">';
	coder += '<textarea cols="'+10+'" rows="'+10+'">'+erg+'</textarea></th></tr>';

	coder += '<tr><th style="color: '+ogs_load('skriptcolor')+';">Import</th><th colspan="2">';
	coder += '<textarea id="ogs_importtextbox" cols="'+10+'" rows="'+10+'"></textarea><br /><a id="ogs_setup_import_btn" href="#">Importieren</a></th></tr>';

	coder += '<tr><th style="color: '+ogs_load('skriptcolor')+';">Default</th><th colspan="2">';
	coder += '<a id="ogs_setup_default_btn" href="#">Zur'+ue+'cksetzen auf Defaultwerte</a></th></tr>';
	createHeaderCloser();
	
	
	//Haupttabelle
    code += '<center><table style="width: 643px;" cellpadding="3"><colgroup><col width="140"><col width="500"></colgroup>';
    code += '<tr><th style="text-align: center">OGS Setup</th><th style="text-align: right"><a href="#" id="ogs_setup_exit">X</a></th></tr>';
    code += '<tr><th style="vertical-align: top;">';
    code += codel + '</table></th><td style="vertical-align: top;">';
    code += coder + '</table></td></tr>';
    code += '<tr><th></th><th style="text-align: right"><a href="#" id="ogs_setup_exit_save">KAYDET</a></th></tr></table></center>';
    neueseite_neu.innerHTML = code;
    
    //textareas zuweisten
    //textarea
    for (var i = 0; i < ogs_setup_save_textarea.length; i++)
    {
		setTextArea(document.getElementById(ogs_setup_save_textarea[i]),((ogs_load(ogs_setup_save_textarea[i])).replace(/\\n/g,'\n')));
    }
    
    addEvent(document.getElementById('ogs_setup_exit'),'click',ogs_setup_close,false);
    addEvent(document.getElementById('ogs_setup_exit_save'),'click',ogs_setup_save,false);
    
    addEvent(document.getElementById('ogs_setup_import_btn'),'click',ogs_setup_import,false);
    addEvent(document.getElementById('ogs_setup_default_btn'),'click',ogs_setup_default,false);
}

function ogs_setup_import()
{
    if (!confirm("Wollen Sie die Einstellungen wirklich importieren?")) return;
    
    var text = getTextArea(document.getElementById('ogs_importtextbox'));
    text = text.split('\n');

    for(var i = 0; i < text.length; i++)
    {
        if (text[i].indexOf(':=') > 0)
        {
            var thistext = text[i].split(':=');
            
            if (typeof settingsdef[thistext[0]] != "undefined")
            {
                if (typeof settingsdef[thistext[0]] == "boolean")
                {         
                    if (thistext[1].indexOf("true") > -1) //so laeufts auch im ie       
                        ogs_save(thistext[0],true);
                    else
                        ogs_save(thistext[0],false);
                }
                else
                {
                    ogs_save(thistext[0],thistext[1]);
                }
            }
        }
    }
    
    ogs_setup_close();    
}

function ogs_setup_default()
{
    if (!confirm("Wollen Sie die Default-Einstellungen wirklich laden?")) return;
    for (var settings in settingsdef)
    {
        ogs_save(settings, settingsdef[settings]);
    }
    
    ogs_setup_close();
}

function ogs_setup_close()
{	
    //nur starten wenn man erlaubnis hat die seite zu Ã¤ndern.
    if (neueseite_user != 'ogs_setup')
	    return;
	
    //lÃ¶schen des nodes
    neueseite_neu.parentNode.removeChild(neueseite_neu);
	
    //wiederanzeigen des orginals
    neueseite_orginal.style.display = "block";
	
    //seite freigeben
    neueseite_user = '';
    delete neueseite_orginal;
    delete neueseite_neu;
}




































































/**************
* Skript Start
**************/

function startup()
{
    // warten bis eine HP-ID da ist
	Versuche++;
	
	// Planiliste laden
	PlaniListe = HolePlaniListe();
	
	if (PlaniListe)
	{
		HP_ID = PlaniListe[0];
		ogs_save(Server + '_HP_ID', HP_ID); // speichere die HP-ID
	}
	
	if (!HP_ID) // falls es keine HP-ID gibt, versuche sie zu laden
	{
		HP_ID = (ogs_load(Server + '_HP_ID')) ? ogs_load(Server + '_HP_ID') : 0; // ID des HPs laden, falls vorhanden
	}
	
	//Bei extra Seiten deren Code aufrufen
	if (Datei == 'phalanx')
	{
	    if (HP_ID > 0)
        {
	        ogs_phalanx();
            return;
        }
    }
    else if (Datei == 'notizen')
    {
        ogs_notizen();
        return;
    }
    else if(Datei == "pranger")
    {
        ogs_pranger();
        return;
    }
	else //normale startfunktion
	{
	    // Hinweis in der Navi
	    var OGameVersion = document.getElementsByTagName('nobr')[0]; // Absatz mit der OGame-Version finden
    	
	    if (HP_ID && OGameVersion && !(Datei == 'b_building' && document.URL.match(/bau=/))) // Check auf fehlende HP_ID und leere Zwischenladeseiten durch OGame
	    {
		    //-------------------
		    // Ausschaltfunktion
		    //-------------------
		    function turnoff()
		    {
		        var vCheck = !ogs_load('skript_online');
			    ogs_save('skript_online', vCheck);
    			
			    if (vCheck)
			    {
			        document.getElementById('ogs_loading').innerHTML = 'ON';
			        document.getElementById('ogs_loading').style.color = 'green';
			        alert("Skript aktiviert");
			    }
			    else
			    {
                    document.getElementById('ogs_loading').innerHTML = 'OFF';
			        document.getElementById('ogs_loading').style.color = 'red';
			        alert("Skript deaktiviert");
			    }
			    location.reload();
		    }
		    
		    OGameVersion.innerHTML = OGameVersion.innerHTML.replace('Universum','Uni') +'<br /><a href="' + ogs_getLink(ogs_homepage) + '" target="_blank">OGame-Skript</a><br /><a href="#" onclick="ogs_setup_start()" id="ogs_version">' + ogs_load('version') + ': </a><a style="color: yellow" id="ogs_loading" href="#" onclick="turnoff()">ERROR</a><br />'; // in der Navi einen Hinweis setzen
    		/*
    		var newtag;
    		OGameVersion.appendChild(document.createElement('br'));
    		
    		newtag = document.createElement('a');
    		newtag.href = ogs_getLink(ogs_homepage);
    		newtag.target = "_blank";
    		newtag.innerHTML = "Ogame-Skript";
    		OGameVersion.appendChild(newtag);

    		OGameVersion.appendChild(document.createElement('br'));
    		
    		newtag = document.createElement('a');
    		newtag.href = "#";
    		newtag.id = "ogs_version";
    		newtag.innerHTML = ogs_load('version') + ': ';
    		addEvent(newtag,'click', ogs_setup_start, true);
    		OGameVersion.appendChild(newtag);
    		
    		newtag = document.createElement('a');
    		newtag.href = "#";
    		newtag.id = "ogs_loading";
    		newtag.innerHTML = "ERROR";
    		newtag.style.color = "yellow";
    		addEvent(newtag,'click', turnoff, true);
    		OGameVersion.appendChild(newtag);
    		
    		OGameVersion.appendChild(document.createElement('br'));
    		*/
    		
		    /*
		    OGameVersion.parentNode.style.width = "auto";
            if (document.getElementById('header_top') != null)
            {
                document.getElementById('header_top').style.zIndex = 1;
            }
            */

    		
		    //unsafeWindow.turnoff = turnoff;
		    //unsafeWindow.ogs_setup_start = ogs_setup_start;
    		unsafeWindow.ogs_setup_start = function()
    		{
                window.setTimeout(ogs_setup_start, 0);
            };
            
    		unsafeWindow.turnoff = function()
    		{
                window.setTimeout(turnoff, 0);
            };

		    // wenn eingeschalten dann ausfÃ¼hren
		    if (ogs_load('skript_online'))
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
    		
		    //Versuche = MaxVers + 1;
		    return;
	    }
	}
	if (Versuche <= MaxVers) { window.setTimeout(startup, VersWart); } // falls es keine HP-ID gibt und noch nicht genuegend Versuche gemacht wurden, nochmal versuchen
}

//---------------------------------------------------------------------------------------------------------------------------------------------------

/***********
* MÃ¼llhalde
***********/

/*
for (var i = 1; i < Planis.length; i++)
{
    alert(Planis[i]['Nr'] + ' ' + Planis[i]['Name'] + ' ' + Planis[i]['Koords'] + ' ' + Planis[i]['ID'] + ' ' + Planis[i]['Aktiv'] + ' ' + Planis[i]['Partner'] + ' ' + Planis[i]['Typ']);
}
*/



/*
try
{
    getElement();
}
catch(e)
{
    alert(e);
}
*/


/*
var t = new Date;
var s = '';
for (var i = 0; i < 100000; i++)
{
    s += '0';
}



alert((new Date).getTime() - t.getTime());
*/

//ogs_save('uebersicht_flotten_farben', prompt("Gebe Farbauswahl ein:", ogs_load('uebersicht_flotten_farben')));
/*prompt("Aktuelle einstellung:", (ogs_load('uebersicht_flotten_farben')))
var neu = prompt('Neue Einstellung angeben:','')

if (neu != null && neu != '')
    ogs_save('uebersicht_flotten_farben', neu);*/
    




//alert(unsafeWindow.ogs_lang);
//alert(GM_getValue('de.global_test'));





/* remnew
// finde alle Kindknoten dieses Knotens, die diese Bedingung erfuellen, und suche noch KinderEbenen Ebenen tiefer
function FindeKinder(Knoten, Bedingung, KinderEbenen)
{
	var Arr = new Array(); // Arry zum Speichern
	
	if ((typeof Bedingung) != 'function') // falls die Bedingung ein String ist, mache sie zu einer Funktion, die dieses Tag als true nimmt und den Rest als falsch
	{
		Bedingung = new Function('Kn', 'return (Kn.nodeName=="' + Bedingung.toUpperCase() + '");');
	}
	
	for (var i = 0; i < Knoten.childNodes.length; i++) // ueber alle Kindknoten
	{
		if (Bedingung(Knoten.childNodes[i])) // Bedingung testen
		{
			Arr[Arr.length] = Knoten.childNodes[i]; // falls positiv, speichern
		}
		if (KinderEbenen) // falls ueberhaupt Unterebenen getestet werden sollen
		{
			Arr = Arr.concat(FindeKinder(Knoten.childNodes[i], Bedingung, KinderEbenen - 1)); // eine Ebene tiefer, daher eine weniger testen
		}
	}
	
	return Arr; // Knoten zurueckgeben
}
*/
