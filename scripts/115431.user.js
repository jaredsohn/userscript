// ==UserScript==
// @name			Collection Grepolis Tools
// @description		Some nice little features for Grepolis (Browsergame by InnoGames)
// @copyright		(c) 2011
// @licence			Creative Commons (http://creativecommons.org/licenses/by-sa/3.0/)
// @include			http://*.grepolis.*/game/*
// @icon			http://www.imgbox.de/users/Peety/grepolis/IconGrepoCollection.png
// @resource		icongrepocoll		http://www.imgbox.de/users/Peety/grepolis/icongrepocoll.png
// @resource		iconAtt				http://www.imgbox.de/users/Peety/grepolis/iconAtt.png
// @resource		iconDef				http://www.imgbox.de/users/Peety/grepolis/iconDef.png
// @resource		iconWd				http://www.imgbox.de/users/Peety/grepolis/iconWood.png
// @resource		iconStn				http://www.imgbox.de/users/Peety/grepolis/iconStone.png
// @resource		iconSil				http://www.imgbox.de/users/Peety/grepolis/iconSilver.png
// @resource		iconFavor			http://www.imgbox.de/users/Peety/grepolis/iconFavor.png
// @resource		menubg2				http://www.imgbox.de/users/Peety/grepolis/menubg2.png
// @resource		town_list_top2		http://www.imgbox.de/users/Peety/grepolis/town_list_top2.png
// @resource		town_list_middle2	http://www.imgbox.de/users/Peety/grepolis/town_list_middle2.png
// @resource		town_list_bottom2	http://www.imgbox.de/users/Peety/grepolis/town_list_bottom2.png
// @resource		pbar_hide			http://www.imgbox.de/users/Peety/grepolis/progressbar_hide.png
// @resource		pbar_red			http://www.imgbox.de/users/Peety/grepolis/progressbar_red.png
// @resource		pbar_orange			http://www.imgbox.de/users/Peety/grepolis/progressbar_orange.png
// @resource		pbar_yellow			http://www.imgbox.de/users/Peety/grepolis/progressbar_yellow.png
// @resource		pbar_green			http://www.imgbox.de/users/Peety/grepolis/progressbar_green.png
// @resource		pbar_bgII			http://www.imgbox.de/users/Peety/grepolis/progressbar_bgII.png
// @resource		crButtonL			http://www.imgbox.de/users/Peety/grepolis/crButtonL.png
// @resource		crButtonR			http://www.imgbox.de/users/Peety/grepolis/crButtonR.png
// @resource		bMsg 				http://www.imgbox.de/users/Peety/grepolis/bMsg.png
// @resource		uLink		 		http://www.imgbox.de/users/Peety/grepolis/uLink.png
// @resource		booty				http://www.imgbox.de/users/Peety/grepolis/booty.png
// @resource		mood_drop			http://www.imgbox.de/users/Peety/grepolis/mood_drop.png
// @resource		strength			http://www.imgbox.de/users/Peety/grepolis/strength.png
// @resource		strength_drop		http://www.imgbox.de/users/Peety/grepolis/strength_drop.png
// @resource		strength_prev		http://www.imgbox.de/users/Peety/grepolis/strength_prev.png
// @resource		strength_now		http://www.imgbox.de/users/Peety/grepolis/strength_now.png
// @resource		strength_total		http://www.imgbox.de/users/Peety/grepolis/strength_total.png
// @resource		ge_button			http://www.imgbox.de/users/Peety/grepolis/ge_button.png
// @resource		ge_button2			http://www.imgbox.de/users/Peety/grepolis/ge_button2.png
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include			http://*.grepolis.*/*
// @version			0.0.3
// ==/UserScript==

var scriptId = 115431;
var scriptName = "Collection Grepolis Tools";
var scriptVersion = "0.0.3";
var scriptWright = "";
var scriptforum = "";

	// START of JSON
	(function() {
		if (!this.JSON) {this.JSON = {};}
		(function() {function f(n) {return n < 10 ? '0'+ n : n;}
		if (typeof Date.prototype.toJSON !== 'function') {Date.prototype.toJSON = function(key) {return isFinite(this.valueOf()) ? this.getUTCFullYear() +'-'+
		f(this.getUTCMonth() + 1) +'-'+ f(this.getUTCDate()) +'T'+ f(this.getUTCHours() ) +':'+ f(this.getUTCMinutes()) +':'+
		f(this.getUTCSeconds()) +'Z' : null;}; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {return this.valueOf();};}
		var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
		function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if (value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
		if (typeof rep==='function') {value=rep.call(holder,key,value);}
		switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
		gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
		v=partial.length===0?'[]':gap?'[\n'+gap+
		partial.join(',\n'+gap)+'\n'+
		mind+']':'['+partial.join(',')+']';gap=mind;return v;}
		if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
		v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
		mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
		if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space) {var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
		rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
		return str('',{'':value});};}
		if(typeof JSON.parse!=='function') {JSON.parse=function(text,reviver) {var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
		return reviver.call(holder,key,value);}
		cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
		('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
		if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
		throw new SyntaxError('JSON.parse');};}}());
	})();
	// END of JSON
	
	// START of FUNCTIONS & VARIABLES
	// Variables
	var GE = {};
	GE.location = window.location.href;
	GE.counters = [];
	if (typeof unsafeWindow === 'object') {
		var uW = unsafeWindow;
	} else {
		var uW = window;
	}
	var $ = uW.jQuery;
	var jsVoid = 'javaScript:void(0);';
	if (document.body == undefined) return; 	//  not ready?
	if (document.body == null) return;			//  not ready?
	GE.Server = /http\:\/\/(\w+)\.grepolis\..*/.exec( uW.document.URL );
	if (GE.Server == undefined) return;
	if (uW.GameData == undefined) return;
	if (uW.Game == undefined) return;
	GE.GameData = uW.GameData;
	GE.Game	= uW.Game;
	if (GE.Game.townId == undefined) { return; }
	GE.Controller = GE.Game.controller;
	if (GE.Game.action == undefined) { GE.Action = ""; } else { GE.Action = GE.Game.action; }
	GE.Alliance_id = GE.Game.alliance_id;
	GE.Alliance_name = [];
	GE.Alliance_name[0] = GM_getValue("optAlliance", "0");
	GE.Alliance_name[1] = GM_getValue("Alliance_name_"+ GE.Server[1], "");
	GE.Layout = uW.Layout;
	GE.time = Number(GE.Game.server_time) + 1;
	GE.Buildings = [];
	GE.Builds = [];
	GE.Positions = [];
	GE.Debug = false;
	GE.L = [];
	GE.Lang = [];
	GE.Units = [];
	GE.Server[2] = GE.Server[1].substr(0,2);
	GE.Server[3] = GE.Server[1].substr(2,5);
	
	var pr_bar = 0;
	var hideMinIron = 15000;
	var Res_Pass = GM_getValue("ResPass_"+ GE.Server[1], "");
	var Res_Key = GM_getValue("ResKey_"+ GE.Server[1], "");
	var Polis_Search = GM_getValue("PolisSearch_"+ GE.Server[1], "");
	var Map_Key = GM_getValue("MapKey_"+ GE.Server[1], "");
	var Link1_Name = GM_getValue("Link1Name_"+ GE.Server[1], "");
	var Own_Link1 = GM_getValue("OwnLink1_"+ GE.Server[1], "");
	var Link2_Name = GM_getValue("Link2Name_"+ GE.Server[1], "");
	var Own_Link2 = GM_getValue("OwnLink2_"+ GE.Server[1], "");
	
	var pImage = {
		'icongrepocoll'		: GM_getResourceURL('icongrepocoll'),
		'iconWd'			: GM_getResourceURL('iconWd'),
		'iconStn'			: GM_getResourceURL('iconStn'),
		'iconSil'			: GM_getResourceURL('iconSil'),
		'iconFavor'			: GM_getResourceURL('iconFavor'),
		'iconAtt'			: GM_getResourceURL('iconAtt'),
		'iconDef'			: GM_getResourceURL('iconDef'),
		'menubg2'			: GM_getResourceURL('menubg2'),
		'town_list_top2' 	: GM_getResourceURL('town_list_top2'),
		'town_list_middle2' : GM_getResourceURL('town_list_middle2'),
		'town_list_bottom2' : GM_getResourceURL('town_list_bottom2'),
		'pbar_hide'			: GM_getResourceURL('pbar_hide'),
		'pbar_red'			: GM_getResourceURL('pbar_red'),
		'pbar_orange'		: GM_getResourceURL('pbar_orange'),
		'pbar_yellow'		: GM_getResourceURL('pbar_yellow'),
		'pbar_green'		: GM_getResourceURL('pbar_green'),
		'pbar_bgII'			: GM_getResourceURL('pbar_bgII'),
		'crButtonL'			: GM_getResourceURL('crButtonL'),
		'crButtonR'			: GM_getResourceURL('crButtonR'),
		'bMsg'				: GM_getResourceURL('bMsg'),
		'uLink'				: GM_getResourceURL('uLink'),
		'booty'				: GM_getResourceURL('booty'),
		'mood_drop'			: GM_getResourceURL('mood_drop'),
		'strength'			: GM_getResourceURL('strength'),
		'strength_drop'		: GM_getResourceURL('strength_drop'),
		'strength_prev'		: GM_getResourceURL('strength_prev'),
		'strength_now'		: GM_getResourceURL('strength_now'),
		'strength_total'	: GM_getResourceURL('strength_total'),
		'ge_button'			: GM_getResourceURL('ge_button'),
		'ge_button2'		: GM_getResourceURL('ge_button2'),
		'desire'			: ['http://www.imgbox.de/users/Peety/grepolis/desire.png'],
		'fair_wind'			: ['http://www.imgbox.de/users/Peety/grepolis/fair_wind.png'],
		'strength_of_heroes': ['http://www.imgbox.de/users/Peety/grepolis/strength_of_heroes.png'],
		'iconWood'			: ['http://www.imgbox.de/users/Peety/grepolis/iconWood.png'],
		'iconStone'			: ['http://www.imgbox.de/users/Peety/grepolis/iconStone.png'],
		'iconSilver'		: ['http://www.imgbox.de/users/Peety/grepolis/iconSilver.png']
	};
	
	function L_de() {
		var t = [];
		t["SCRIPTNAME"] = "Script Name";
		t["SCRIPTVER"] = "Script Version";
		t["SCRIPTWRIGHT"] = "Autoren";
		// Options Settings
		t["MENU_EXTRAS"] = "Tools";
		t["TAB1"] = "Optionen 1";
		t["TAB2"] = "Optionen 2";
		t["TAB3"] = "Optionen 3";
		t["TAB4"] = "Optionen "+ t["MENU_EXTRAS"] +"-Menü";
		t["UPDATE"] = "Update";
		t["ABOUT"] = "Über";
		t["SETTINGS"] = "Collection Grepolis Tools";
		t["OPTIONSTXT"] = "Einstellungen";
		t["OPTSETTXT1"] = " ";
		t["OPTSETTXT2"] = " ";
		t["OPTSETTXT3"] = " ";
		t["OPTSETTXT4"] = "<b>"+ t["MENU_EXTRAS"] +"-Menü der Schnellleiste konfigurieren</b> <br>Hinweise: Nur Schlüssel / Passwort eingeben - nicht die Kommas mitkopieren!<br>Die Einstellungen dieser Seite werden nach Welten getrennt gesichert.<br><br>";
		t["OPTSETTXT4A"] = "(...reservation/"+ GE.Server[3] +",<b>Code</b>,<b>Passwort</b>)";
		t["ForumLnk"] = "» Link zum deutschen Forum «";
		t["ABOUTTEXT"] = "<br><b>Collection Grepolis Tools</b> ist eine Sammlung von Scripten verschiedener Autoren.<br>Zusammengestellt als Ergänzung zu Faarks GrepoTools.<br>Herzlichen Dank an alle Autoren.<br><br>GrepoCollection sollte in der Script-Reihenfolge hinter Faarks GrepoTools stehen!<br><br>© - Hinweise:<br>Lizenz: Creative Commons - http://creativecommons.org/licenses/by-sa/3.0/de/<br>Es werden Grafiken von InnoGames/Grepolis verwendet.<br><br><a href="+ scriptforum +" target='_blank'><b>"+ t['ForumLnk'] +"</b></a>";
		t["OPTSETFOOTER"] = " Version " + scriptVersion;
		t["OPTCANCEL"] = "Abbruch";
		t["OPTSAVE"] = "Schließen";
		t["OPTFORMATTER"] = "Berichte formatieren (Text / BB-Code)";
		t["OPTREPRES"] = "Verluste in Berichten anzeigen";
		t["OPTTOOLBAR"] = "erweiterte Schnellleiste anzeigen";
		t["ToolbarText"] = "Schnellleiste  muss aktiviert sein";
		t["OPTPRODINFO"] = "Produktions-Info anzeigen";
		t["OPTFARMERHELP"] = "Farmhilfe für Bauerndörfer";
		t["OPTFARMINFO"] = "Bauerndorf Infos auf der Karte anzeigen";
		t["OPTREPORTINFO"] = "Berichte in der Übersicht farbig markieren";
		t["OPTTOWNLIST"] = "mehrspaltige Städteliste";
		t["TownlistText"] = "1 bis 4 Spalten";
		t["OPTALLIANCE"] = "eigenen Allianznamen anzeigen";
		t["NOALLIANCE"] = "keine Allianz";
		t["AllianceText"] = "statt Collection Grepolis Tools";
		t["OPTCULTURE"] = "Erweiterung der Kulturübersicht";
		t["OPTMARKET"] = "Erweiterungen in Markt und Höhlenübersicht";
		t["OPTBUILDINGPNTS"] = "Gebäudepunkte im Senat anzeigen";
		t["OPTUSERLINKS"] = "Playerlinks anzeigen";
		t["OPTALLYLINKS"] = "Allylinks anzeigen";
		t["OPTREDIRECTCLEANER"] = "direkte Weiterleitung von Links";
		t["WarnPage"] = "Warnhinweis umgehen";
		t["OPTRESCALC"] = "Verluste in Mauer und Simulator anzeigen";
		t["OPTARROWCNTRL"] = "nächster Bericht mit rechter/linker Pfeiltaste";
		t["OPTSWCITYCNTRL"] = "nächste Stadt mit [Strg]+rechter/linker Pfeiltaste";
		t["POLISSEARCH"] = "Polissuche (Tonda+Faark) Schlüssel: ";
		t["POLISSRCHPOPUP"] = "\"Suche speichern\" anklicken ";
		t["MAPKEY"] = "Karte grepolismaps.org Schlüssel: ";
		t["MAPPOPUP"] = "Karte anzeigen";
		t["RESPASSWORD"] = "Reservierungstool Passwort: ";
		t["RESPASSPOPUP"] = " ";
		t["RESPASSKEY"] = "Reservierungstool Code: ";
		t["RESERVATIONTXT"] = "Reservierung *";
		t["POLISSEARCHTXT"] = "Polissuche *";
		t["GPMAP"] ="Karte *";
		t["OptText"] = "* siehe Optionen";
		t["OPTLINK1NAM"] = "angezeigter Name für Link1:";
		t["OPTLINK1"] = "Link1:";
		t["OPTLINK2NAM"] = "angezeigter Name für Link2:";
		t["OPTLINK2"] = "Link2:";
		t["OPTLINK3NAM"] = "shown name for Link 3:";
		t["OPTLINK3"] = "Link 3:";
		t["OPTLINK4NAM"] = "shown name for Link 4:";
		t["OPTLINK4"] = "Link 4:";
		t["PAOnly"] = "nur mit aktiviertem Verwalter";
		t["OPTUPDTXT"] = "<b> Überprüfen, ob ein Update für "+ scriptName +" verfügbar ist </b>";
		t["NOTREADY"] = "noch nicht fertig";
		t["OPTLINE1"] = "— <small>  "+ t['PAOnly'] +":  </small> ——————————————————————";
		t["OPTLINE2"] = "—————————————————————————";
		t["OPTLNKTXT"] = "<b>eigene Links für das "+ t["MENU_EXTRAS"] +"-Menü</b> —— <small>(beginnend mit <b>http://</b>  oder  <b>/game/</b>) </small>",
		t["OPTLINE4"] = "_______________________________________________________________________";
		// Updater
		t["UPDTITLE"] = "Update Finder";
		t["UPDUPD"] = "Überprüfe auf Updates";
		t["SRCHFORUPD"] = "nach Update suchen";
		t["UPDNEW"] = "Eine neue Version von";
		t["UPDREADY"] = "steht bereit zur Installation.";
		t["UPDCURRENT"] = "Deine vorhandene Version ist";
		t["UPDLATEST"] = "Verfügbar ist Version";
		t["UPDONE"] = " Jede Stunde";
		t["UPDSIX"] = " Alle 6 Stunden";
		t["UPDDAY"] = " Jeden Tag";
		t["UPDWEEK"] = " Jede Woche";
		t["UPDWEEK4"] = " Alle 4 Wochen";
		t["UPDNEVER"] = " Nie (nicht empfohlen)";
		t["UPDCANCEL"] = "Abbruch";
		t["UPDINST"] = "Installieren";
		// End of Updater
		t["NONE"] = "kein";
		t["OFMAX"] = "von max.";
		t["WITHQUEUE"] = "mit Bauschleife";
		t["POINTS"] = "Punkte";
		t["LEVEL"] = "Stufe";
		t["ALLPOINTS"] = "Punkte";
		t["ALLPOP"] = "BH";
		t["ATTACKR"] = "Angreifer";
		t["DEFENDR"] = "Verteidiger";
		t["BPNTS"] = "Kampfpunkte";
		t["UBBC"] = "mit BB-Code";
		t["TXTC"] = "als Text";
		t["ATK"] = " vs ";
		t["REPTIME"] = "Zeit";
		t["GHTOWN"] = "Geisterstadt";
		t["CITB"] = "Kampfboni";
		t["LOST"] = "verloren";
		t["LOOT"] = "Beute";
		t["NOLOOT"] = "Es wurden keine Rohstoffe erbeutet";
		t["WALL"] = "Stadtmauer";
		t["NOWALL"] = "keine Stadtmauer";
		t["NON"] = "keine Einheiten in der Stadt";
		t["NON2"] = "Einheiten nicht sichtbar";
		t["NON3"] = "Land-Einheiten nicht sichtbar";
		t["Wood"] = "Holz";
		t["Stone"] = "Stein";
		t["Iron"] = "Silber";
		t["Favor"] = "Gunst";
		t["BH"] = "Kampfpunkte";
		t["ABOUT"] = "About";
		t["IN"] = "in";
		t["APNTS"] = "Attacker points";
		t["DPNTS"] = "Defender points";
		t["FROM"] = "from";
		t["OF_WHICH"] = "of which";
		t["WITH"] = "with";
		t["REPTITLE"] = "Angriffsbericht";
		t["SPYTITLE"] = "Spionagebericht";
		t["RESOURCES"] = "Rohstoffe";
		t["RESOURCES2"] = "Rohstoffe ([color=#006600]plünderbar[/color])";
		t["SPYCOST"] = "Eingesetzte Silbermünzen";
		t["SPY"] = "spioniert";
		t["POWER"] = "Zauber";
		t["MORALE"] = "Moral";
		t["LUCK"] = "Glück";
		t["NBONUS"] = "Nachtbonus";
		t["UNITS"] = "Einheiten";
		t["BUILDINGS"] = "Gebäude";
		t["HOUR"] = "h";
		t["RESCNTR"] = "Restzeit";
		t["NOTEMPLE"] = "kein Tempel";
		t["NOGOD"] = " kein Gott";
		t["FARM_RES"] = "max. Beute aktueller Angriff";
		t["FARM_MOOD_DROP"] = "Stimmungsverlust";
		t["FARM_STR_DROP"] = "Stärkeverlust aktueller Angriff";
		t["FARM_STR"] = "Stärkesteigerung aktueller Angriff";
		t["FARM_STR_PREV"] = "Stärke bei vorherigem Angriff";
		t["FARM_STR_NOW"] = "aktuelle Stärke";
		t["FARM_STR_TOTAL"] = "neue Stärke";
		t["FARM_TOWN_ID"] = "Diese ID gehört zur Stadt mit dem BB-Code: ";
		t["GREPO_FARM_NOT_COMPATIBLE"] = "Die FarmHilfe ist nicht kompatibel mit dieser Version von Grepolis";
		t["OPENINPOPUP"] = "öffnet Link in Popup-Window";
		t["CLICKNCOPY"] = "Klicke einmal und kopiere (ctrl+c)";
		t["NOMILITIA"] = "<em>Miliz zählt nicht</em>";
		t["RCATT_LOST"] = "Gesamtverlust Angreifer";
		t["RCDEF_LOST"] = "Gesamtverlust Verteidiger";
		t["OPENRESBOX"] = "Statistik";
		t["CLOSERESBOX"] = "Statistik schließen";
		t["WALLYOURCOSTS"] = "deine Kosten";
		t["WALLFOECOSTS"] = "Gegner Kosten";
		t["RESTABLE"] = "Ressourcen Vorschau";
		t["LostTitle"] = "Ressourcen insgesamt";
		t["MYCOSTS"] = "Eigene";
		t["FOECOSTS"] = "Gegner";
		t["SIMSTATS"] = "Simulator Statistik";
		t["STATS"] = "Statistik";
		t["WALLSTATS1"] = "Kills Off: ";
		t["WALLSTATS2"] = "Kills Deff: ";
		t["WALLSTATS3"] = "Verluste Off: ";
		t["WALLSTATS4"] = "Verluste Deff: ";
		// units
		t["militia"] = "Milizen";
		t["unknown"] = "unbekannt";
		t["sword"] = "Schwerter";
		t["slinger"] = "Schleuderer";
		t["archer"] = "Bogenschützen";
		t["hoplite"] = "Hoplits";
		t["rider"] = "Reiter";
		t["chariot"] = "Streitwagen";
		t["catapult"] = "Katas";
		t["big_transporter"] = "Langsame Transporter";
		t["bireme"] = "Biremen";
		t["attack_ship"] = "Feuerschiffe";
		t["demolition_ship"] = "Brander";
		t["small_transporter"] = "Schnelle Transporter";
		t["trireme"] = "Triremen";
		t["colonize_ship"] = "Kolo";
		t["minotaur"] = "Minotaurus";
		t["manticore"] = "Mantikor";
		t["zyklop"] = "Zyklop";
		t["sea_monster"] = "Hydra";
		t["harpy"] = "Harpie";
		t["medusa"] = "Medusa";
		t["centaur"] = "Zentaur";
		t["pegasus"] = "Pegasus";
		// toolbar & buildings
		t["main"] = "Senat";
		t["barracks"] = "Kaserne";
		t["docks"] = "Hafen";
		t["academy"] = "Akademie";
		t["academyshort"] = "Aka";
		t["market"] = "Markt";
		t["wall"] = "Mauer";
		t["place"] = "Agora";
		t["simulator"] = "Simulator";
		t["simulatorshort"] = "Sim";
		t["temple"] = "Tempel";
		t["hide"] = "Höhle";
		t["farm"] = "Farm";
		t["ironer"] = "Silber";
		t["lumber"] = "Holzfäller";
		t["stoner"] = "Stein";
		t["storage"] = "Speicher";
		t["theater"] = "Theater";
		t["thermal"] = "Therme";
		t["library"] = "Bibliothek";
		t["lighthouse"] = "Leuchtturm";
		t["tower"] = "Turm";
		t["statue"] = "Götterstatue";
		t["oracle"] = "Orakel";
		t["trade_office"] = "Handelskontor";
		t["barracksshort"] = "Barr";
		t["wallshort"] = "Wall";
		// other
		t["highlighting"] = "Farbige Kennzeichnung";
		t["GWLanguage"] = "deutsch";
		if (GE.Alliance_name[0] == "1") { t["SETTINGS"] = GE.Alliance_name[1].substr(0,25); }
		GE.Lang['de'] = t;
	};
	L_de();
	
	function L_en() {
		var t = [];
		t["SCRIPTNAME"] = "Script name";
		t["SCRIPTVER"] = "Script version";
		t["SCRIPTWRIGHT"] = "Script authors";
		// Options Settings
		t["MENU_EXTRAS"] = "Tools";
		t["TAB1"] = "Options 1";
		t["TAB2"] = "Options 2";
		t["TAB3"] = "Options 3";
		t["TAB4"] = "Options "+ t["MENU_EXTRAS"] +"-Menu";
		t["UPDATE"] = "Update";
		t["ABOUT"] = "About";
		t["SETTINGS"] = "Collection Grepolis Tools";
		t["OPTIONSTXT"] = "Settings";
		t["OPTSETTXT1"] = " ";
		t["OPTSETTXT2"] = " ";
		t["OPTSETTXT3"] = " ";
		t["OPTSETTXT4"] = "<b>Config "+ t["MENU_EXTRAS"] +"-Menu</b> <br>Notes: copy only the key  - do not copy the \'/\' <br>The settings of this side are saved separately for every world.<br><br>";
		t["OPTSETTXT4A"] = "(...reservation/"+ GE.Server[3] +",<b>Code</b>,<b>Passwort</b>)";
		t["ForumLnk"] = "» Link to the German GrepoCollection forum «";
		t["ABOUTTEXT"] = "<br><b>Collection Grepolis Tools</b> is a collection of scripts of many authors.<br>Thanx to all.<br><br><br>©-notes:<br>License: Creative Commons - http://creativecommons.org/licenses/by-sa/3.0/<br>InnoGames/Grepolis graphics are used.<br><br><br><a href="+ scriptforum +" target='_blank'><b>"+ t['ForumLnk'] +"</b></a><br>";
		t["OPTSETFOOTER"] = " Version " + scriptVersion;
		t["OPTCANCEL"] = "Cancel";
		t["OPTSAVE"] = "Close";
		t["OPTFORMATTER"] = "Report Formatter (Text / BB-Code)";
		t["OPTREPRES"] = "Show Losses in Reports";
		t["OPTTOOLBAR"] = "Show advanced Toolbar";
		t["ToolbarText"] = "Grepo toolbar must be enabled";
		t["OPTPRODINFO"] = "Show Productioninfo";
		t["OPTFARMERHELP"] = "Help for Farming Villages";
		t["OPTFARMINFO"] = "Show farming village infos on the map";
		t["OPTREPORTINFO"] = "Colored Report Overview";
		t["OPTTOWNLIST"] = "Multiple Columns Townlist";
		t["TownlistText"] = "1 to 4 columns";
		t["OPTALLIANCE"] = "Show name of the own Alliance";
		t["NOALLIANCE"] = "No Alliance";
		t["AllianceText"] = "Instead of Collection Grepolis Tools";
		t["OPTCULTURE"] = "Extended Culture Overview";
		t["OPTMARKET"] = "Extended Market and Hide Overview";
		t["OPTBUILDINGPNTS"] = "Show buildingpoints in the Senate";
		t["OPTUSERLINKS"] = "Playerlinks to Grepo-world";
		t["OPTALLYLINKS"] = "Allylinks to Grepo-world";
		t["OPTREDIRECTCLEANER"] = "Remove redirect from external links";
		t["WarnPage"] = "skip warningpage ";
		t["OPTRESCALC"] = "Show resourcetables in Wall & Simulator";
		t["OPTARROWCNTRL"] = "Jump report with right / left keys";
		t["OPTSWCITYCNTRL"] = "Switch city with ctrl + right / left key";
		t["POLISSEARCH"] = "Polissearch (Tonda+Faark) Key: ";
		t["POLISSRCHPOPUP"] = "Click \"Save Search\" for the Key";
		t["MAPKEY"] = "grepolismaps.org Map Key: ";
		t["MAPPOPUP"] = "Show Map (grepolismaps.org)";
		t["RESPASSWORD"] = "Reservation Password: ";
		t["RESPASSPOPUP"] = " ";
		t["RESPASSKEY"] = "Reservation Code: ";
		t["RESERVATIONTXT"] = "Reservation *";
		t["POLISSEARCHTXT"] = "Polissearch *";
		t["GPMAP"] ="GP Map *";
		t["OptText"] = "* see options";
		t["OPTLINK1NAM"] = "shown name for Link 1:";
		t["OPTLINK1"] = "Link 1:";
		t["OPTLINK2NAM"] = "shown name for Link 2:";
		t["OPTLINK2"] = "Link 2:";
		t["OPTLINK3NAM"] = "shown name for Link 3:";
		t["OPTLINK3"] = "Link 3:";
		t["OPTLINK4NAM"] = "shown name for Link 4:";
		t["OPTLINK4"] = "Link 4:";
		t["PAOnly"] = "only with Administrator";
		t["OPTUPDTXT"] = "<b> Is there an Update for "+ scriptName +" available ?</b>";
		t["NOTREADY"] = "not ready yet";
		t["OPTLINE1"] = "— <small>  "+ t['PAOnly'] +":  </small> ——————————————————————";
		t["OPTLINE2"] = "—————————————————————————";
		t["OPTLNKTXT"] = "<b>Own Links for the "+ t["MENU_EXTRAS"] +"-Menu</b> —— <small>(starting with <b>http://</b>  oder  <b>/game/</b>) </small>",
		t["OPTLINE4"] = "_______________________________________________________________________";
		// Updater
		t["UPDTITLE"] = "Update Finder";
		t["UPDUPD"] = "Check for Updates";
		t["SRCHFORUPD"] = "Search for Update";
		t["UPDNEW"] = "A new version of";
		t["UPDREADY"] = "is available";
		t["UPDCURRENT"] = "Your version is";
		t["UPDLATEST"] = "Available version";
		t["UPDONE"] = " Every hour";
		t["UPDSIX"] = " Every 6 hours";
		t["UPDDAY"] = " Every day";
		t["UPDWEEK"] = " Every week";
		t["UPDWEEK4"] = " Every 4 weeks";
		t["UPDNEVER"] = " Never (not recommended)";
		t["UPDCANCEL"] = "Cancel";
		t["UPDINST"] = "Install";
		// End of Updater
		t["NONE"] = "None";
		t["OFMAX"] = "of max.";
		t["WITHQUEUE"] = "with Queue";
		t["POINTS"] = "Points";
		t["LEVEL"] = "Level";
		t["ALLPOINTS"] = "Points";
		t["ALLPOP"] = "Population";
		t["ATTACKR"] = "Attacker";
		t["DEFENDR"] = "Defender";
		t["BPNTS"] = "Bashpoints";
		t["UBBC"] = "with BB-Code";
		t["TXTC"] = "Pure Text";
		t["ATK"] = "attacks";
		t["REPTIME"] = "Time";
		t["GHTOWN"] = "Ghosttown";
		t["CITB"] = "Combat bonus";
		t["LOST"] = "Lost";
		t["LOOT"] = "Booty";
		t["NOLOOT"] = "No recources found";
		t["WALL"] = "Wall";
		t["NOWALL"] = "no wall";
		t["NON"] = "no units in the city";
		t["NON2"] = "no units visible";
		t["NON3"] = "Landunits not visible";
		t["Wood"] = "Wood";
		t["Stone"] = "Stone";
		t["Iron"] = "Iron";
		t["Favor"] = "Favor";
		t["BH"] = "Population";
		t["ABOUT"] = "About";
		t["IN"] = "in";
		t["APNTS"] = "Attacker points";
		t["DPNTS"] = "Defender points";
		t["FROM"] = "from";
		t["OF_WHICH"] = "of which";
		t["WITH"] = "with";
		t["REPTITLE"] = "Attack Report";
		t["SPYTITLE"] = "Spy Report";
		t["RESOURCES"] = "Resources";
		t["RESOURCES2"] = "Resources ([color=#006600]lootable[/color])";
		t["SPYCOST"] = "Spy cost";
		t["SPY"] = "spy at";
		t["POWER"] = "Power";
		t["MORALE"] = "Morale";
		t["LUCK"] = "Luck";
		t["NBONUS"] = "Nightbonus";
		t["UNITS"] = "Units";
		t["BUILDINGS"] = "Buildings";
		t["HOUR"] = "h";
		t["RESCNTR"] = "Time until full";
		t["NOTEMPLE"] = "No Temple";
		t["NOGOD"] = " No God";
		t["FARM_RES"] = "max. Beute aktueller Angriff";
		t["FARM_MOOD_DROP"] = "Stimmungsverlust";
		t["FARM_STR_DROP"] = "Stärkeverlust aktueller Angriff";
		t["FARM_STR"] = "Stärkesteigerung aktueller Angriff";
		t["FARM_STR_PREV"] = "Stärke bei vorherigem Angriff";
		t["FARM_STR_NOW"] = "aktuelle Stärke";
		t["FARM_STR_TOTAL"] = "neue Stärke";
		t["FARM_TOWN_ID"] = "This ID links to the town with the following bb-code: ";
		t["GREPO_FARM_NOT_COMPATIBLE"] = "Die FarmHilfe ist nicht kompatibel mit dieser Version von Grepolis";
		t["OPENINPOPUP"] = "Open link in popup-window";
		t["CLICKNCOPY"] = "Click once and copy (ctrl+c)";
		t["NOMILITIA"] = "<em>'Militia'</em> doesn't count";
		t["RCATT_LOST"] = "Total losses for Attacker";
		t["RCDEF_LOST"] = "Total losses for Defender";
		t["OPENRESBOX"] = "Open resource window";
		t["CLOSERESBOX"] = "Close resource window";
		t["WALLYOURCOSTS"] = "Your expenses";
		t["WALLFOECOSTS"] = "Your opponents expenses";
		t["RAWMATSINCL"] = "Used resources";
		t["RESTABLE"] = "Resource table";
		t["LostTitle"] = "Ressource Overview";
		t["MYCOSTS"] = "My expenses";
		t["FOECOSTS"] = "Opponents expenses";
		t["SIMSTATS"] = "Simulator statistics";
		t["STATS"] = "Statistic";
		t["WALLSTATS1"] = "Kills Off: ";
		t["WALLSTATS2"] = "Kills Deff: ";
		t["WALLSTATS3"] = "Verluste Off: ";
		t["WALLSTATS4"] = "Verluste Deff: ";
		// units
		t["militia"] = "Militia";
		t["unknown"] = "unbekannt";
		t["sword"] = "Swordsman";
		t["slinger"] = "Slinger";
		t["archer"] = "Archer";
		t["hoplite"] = "Hoplite";
		t["rider"] = "Rider";
		t["chariot"] = "Chariot";
		t["catapult"] = "Catapult";
		t["big_transporter"] = "Transport boat";
		t["bireme"] = "Bireme";
		t["attack_ship"] = "Light ship";
		t["demolition_ship"] = "Fire ship";
		t["small_transporter"] = "Fast transport ship";
		t["trireme"] = "Trireme";
		t["colonize_ship"] = "Colony ship";
		t["minotaur"] = "Minotaur";
		t["manticore"] = "Manticore";
		t["zyklop"] = "Cyclop";
		t["sea_monster"] = "Hydra";
		t["harpy"] = "Harpy";
		t["medusa"] = "Medusa";
		t["centaur"] = "Centaur";
		t["pegasus"] = "Pegasus";
		// toolbar & buildings
		t["main"] = "Senate";
		t["barracks"] = "Barracks";
		t["docks"] = "Harbor";
		t["academy"] = "Academy";
		t["academyshort"] = "Aca";
		t["market"] = "Market";
		t["wall"] = "City Wall";
		t["place"] = "Agora";
		t["simulator"] = "Simulator";
		t["simulatorshort"] = "Sim";
		t["temple"] = "Temple";
		t["hide"] = "Cave";
		t["farm"] = "Farm";
		t["ironer"] = "Silver mine";
		t["lumber"] = "Timber camp";
		t["stoner"] = "Quarry";
		t["storage"] = "Warehouse";
		t["theater"] = "Theater";
		t["thermal"] = "Thermal bats";
		t["library"] = "Library";
		t["lighthouse"] = "Lighthouse";
		t["tower"] = "Tower";
		t["statue"] = "Divine statue";
		t["oracle"] = "Oracle";
		t["trade_office"] = "Merchant's shop";
		t["barracksshort"] = "Barr";
		t["wallshort"] = "Wall";
		// other
		t["highlighting"] = "Colored Report Overview";
		t["GWLanguage"] = "english";
		if (GE.Alliance_name[0] == 1) { t["SETTINGS"] = GE.Alliance_name[1].substr(0,25); }
		GE.Lang['en'] = t;
	};
	L_en();
	
	function L_it() {
		var t = [];
		t["SCRIPTNAME"] = "Nome Script";
		t["SCRIPTVER"] = "Versione Script";

		t["SCRIPTWRIGHT"] = "Script authors";
		// Options Settings
		t["MENU_EXTRAS"] = "Tools";
		t["TAB1"] = "Options 1";
		t["TAB2"] = "Options 2";
		t["TAB3"] = "Options 3";
		t["TAB4"] = "Options "+ t["MENU_EXTRAS"] +"-Menu";
		t["UPDATE"] = "Update";
		t["ABOUT"] = "About";
		t["SETTINGS"] = "Collection Grepolis Tools";
		t["OPTIONSTXT"] = "Settings";
		t["OPTSETTXT1"] = " ";
		t["OPTSETTXT2"] = " ";
		t["OPTSETTXT3"] = " ";
		t["OPTSETTXT4"] = "<b>Config "+ t["MENU_EXTRAS"] +"-Menu</b> <br>Notes: copy only the key  - do not copy the \'/\' <br>The settings of this side are saved separately for every world.<br><br>";
		t["OPTSETTXT4A"] = "(...reservation/"+ GE.Server[3] +",<b>Code</b>,<b>Passwort</b>)";
		t["ForumLnk"] = "» Link to the German GrepoCollection forum «";
		t["ABOUTTEXT"] = "<br><b>Collection Grepolis Tools</b> is a collection of scripts of many authors.<br>Thanx to all.<br><br><br>©-notes:<br>License: Creative Commons - http://creativecommons.org/licenses/by-sa/3.0/<br>InnoGames/Grepolis graphics are used.<br><br><br><a href="+ scriptforum +" target='_blank'><b>"+ t['ForumLnk'] +"</b></a><br>";
		t["OPTSETFOOTER"] = " Version " + scriptVersion;
		t["OPTCANCEL"] = "Cancel";
		t["OPTSAVE"] = "Close";
		t["OPTFORMATTER"] = "Report Formatter (Text / BB-Code)";
		t["OPTREPRES"] = "Show Losses in Reports";
		t["OPTTOOLBAR"] = "Show advanced Toolbar";
		t["ToolbarText"] = "Grepo toolbar must be enabled";
		t["OPTPRODINFO"] = "Show Productioninfo";
		t["OPTFARMERHELP"] = "Help for Farming Villages";
		t["OPTFARMINFO"] = "Show farming village infos on the map";
		t["OPTREPORTINFO"] = "Colored Report Overview";
		t["OPTTOWNLIST"] = "Multiple Columns Townlist";
		t["TownlistText"] = "1 to 4 columns";
		t["OPTALLIANCE"] = "Show name of the own Alliance";
		t["NOALLIANCE"] = "No Alliance";
		t["AllianceText"] = "Instead of Collection Grepolis Tools";
		t["OPTCULTURE"] = "Extended Culture Overview";
		t["OPTMARKET"] = "Extended Market and Hide Overview";
		t["OPTBUILDINGPNTS"] = "Show buildingpoints in the Senate";
		t["OPTUSERLINKS"] = "Playerlinks to Grepo-world";
		t["OPTALLYLINKS"] = "Allylinks to Grepo-world";
		t["OPTREDIRECTCLEANER"] = "Remove redirect from external links";
		t["WarnPage"] = "skip warningpage ";
		t["OPTRESCALC"] = "Show resourcetables in Wall & Simulator";
		t["OPTARROWCNTRL"] = "Jump report with right / left keys";
		t["OPTSWCITYCNTRL"] = "Switch city with ctrl + right / left key";
		t["POLISSEARCH"] = "Polissearch (Tonda+Faark) Key: ";
		t["POLISSRCHPOPUP"] = "Click \"Save Search\" for the Key";
		t["MAPKEY"] = "grepolismaps.org Map Key: ";
		t["MAPPOPUP"] = "Show Map (grepolismaps.org)";
		t["RESPASSWORD"] = "Reservation Password: ";
		t["RESPASSPOPUP"] = " ";
		t["RESPASSKEY"] = "Reservation Code: ";
		t["RESERVATIONTXT"] = "Reservation *";
		t["POLISSEARCHTXT"] = "Polissearch *";
		t["GPMAP"] ="GP Map *";
		t["OptText"] = "* see options";
		t["OPTLINK1NAM"] = "shown name for Link 1:";
		t["OPTLINK1"] = "Link 1:";
		t["OPTLINK2NAM"] = "shown name for Link 2:";
		t["OPTLINK2"] = "Link 2:";
		t["OPTLINK3NAM"] = "shown name for Link 3:";
		t["OPTLINK3"] = "Link 3:";
		t["OPTLINK4NAM"] = "shown name for Link 4:";
		t["OPTLINK4"] = "Link 4:";
		t["PAOnly"] = "only with Administrator";
		t["OPTUPDTXT"] = "<b> Is there an Update for "+ scriptName +" available ?</b>";
		t["NOTREADY"] = "not ready yet";
		t["OPTLINE1"] = "— <small>  "+ t['PAOnly'] +":  </small> ——————————————————————";
		t["OPTLINE2"] = "—————————————————————————";
		t["OPTLNKTXT"] = "<b>Own Links for the "+ t["MENU_EXTRAS"] +"-Menu</b> —— <small>(starting with <b>http://</b>  oder  <b>/game/</b>) </small>",
		t["OPTLINE4"] = "_______________________________________________________________________";
		// Updater
		t["UPDTITLE"] = "Update Finder";
		t["UPDUPD"] = "Check for Updates";
		t["SRCHFORUPD"] = "Search for Update";
		t["UPDNEW"] = "A new version of";
		t["UPDREADY"] = "is available";
		t["UPDCURRENT"] = "Your version is";
		t["UPDLATEST"] = "Available version";
		t["UPDONE"] = " Every hour";
		t["UPDSIX"] = " Every 6 hours";
		t["UPDDAY"] = " Every day";
		t["UPDWEEK"] = " Every week";
		t["UPDWEEK4"] = " Every 4 weeks";
		t["UPDNEVER"] = " Never (not recommended)";
		t["UPDCANCEL"] = "Cancel";
		t["UPDINST"] = "Install";
		// End of Updater
		t["NONE"] = "None";
		t["OFMAX"] = "of max.";
		t["WITHQUEUE"] = "with Queue";
		t["POINTS"] = "Points";
		t["LEVEL"] = "Level";
		t["ALLPOINTS"] = "Points";
		t["ALLPOP"] = "Population";
		t["ATTACKR"] = "Attacker";
		t["DEFENDR"] = "Defender";
		t["BPNTS"] = "Bashpoints";
		t["UBBC"] = "with BB-Code";
		t["TXTC"] = "Pure Text";
		t["ATK"] = "attacks";
		t["REPTIME"] = "Time";
		t["GHTOWN"] = "Ghosttown";
		t["CITB"] = "Combat bonus";
		t["LOST"] = "Lost";
		t["LOOT"] = "Booty";
		t["NOLOOT"] = "No recources found";
		t["WALL"] = "Wall";
		t["NOWALL"] = "no wall";
		t["NON"] = "no units in the city";
		t["NON2"] = "no units visible";
		t["NON3"] = "Landunits not visible";
		t["Wood"] = "Wood";
		t["Stone"] = "Stone";
		t["Iron"] = "Iron";
		t["Favor"] = "Favor";
		t["BH"] = "Population";
		t["ABOUT"] = "About";
		t["IN"] = "in";
		t["APNTS"] = "Attacker points";
		t["DPNTS"] = "Defender points";
		t["FROM"] = "from";
		t["OF_WHICH"] = "of which";
		t["WITH"] = "with";
		t["REPTITLE"] = "Attack Report";
		t["SPYTITLE"] = "Spy Report";
		t["RESOURCES"] = "Resources";
		t["RESOURCES2"] = "Resources ([color=#006600]lootable[/color])";
		t["SPYCOST"] = "Spy cost";
		t["SPY"] = "spy at";
		t["POWER"] = "Power";
		t["MORALE"] = "Morale";
		t["LUCK"] = "Luck";
		t["NBONUS"] = "Nightbonus";
		t["UNITS"] = "Units";
		t["BUILDINGS"] = "Buildings";
		t["HOUR"] = "h";
		t["RESCNTR"] = "Time until full";
		t["NOTEMPLE"] = "No Temple";
		t["NOGOD"] = " No God";
		t["FARM_RES"] = "max. Beute aktueller Angriff";
		t["FARM_MOOD_DROP"] = "Stimmungsverlust";
		t["FARM_STR_DROP"] = "Stärkeverlust aktueller Angriff";
		t["FARM_STR"] = "Stärkesteigerung aktueller Angriff";
		t["FARM_STR_PREV"] = "Stärke bei vorherigem Angriff";
		t["FARM_STR_NOW"] = "aktuelle Stärke";
		t["FARM_STR_TOTAL"] = "neue Stärke";
		t["FARM_TOWN_ID"] = "This ID links to the town with the following bb-code: ";
		t["GREPO_FARM_NOT_COMPATIBLE"] = "Die FarmHilfe ist nicht kompatibel mit dieser Version von Grepolis";
		t["OPENINPOPUP"] = "Open link in popup-window";
		t["CLICKNCOPY"] = "Click once and copy (ctrl+c)";
		t["NOMILITIA"] = "<em>'Militia'</em> doesn't count";
		t["RCATT_LOST"] = "Total losses for Attacker";
		t["RCDEF_LOST"] = "Total losses for Defender";
		t["OPENRESBOX"] = "Open resource window";
		t["CLOSERESBOX"] = "Close resource window";
		t["WALLYOURCOSTS"] = "Your expenses";
		t["WALLFOECOSTS"] = "Your opponents expenses";
		t["RAWMATSINCL"] = "Used resources";
		t["RESTABLE"] = "Resource table";
		t["LostTitle"] = "Ressource Overview";
		t["MYCOSTS"] = "My expenses";
		t["FOECOSTS"] = "Opponents expenses";
		t["SIMSTATS"] = "Simulator statistics";
		t["STATS"] = "Statistic";
		t["WALLSTATS1"] = "Kills Off: ";
		t["WALLSTATS2"] = "Kills Deff: ";
		t["WALLSTATS3"] = "Verluste Off: ";
		t["WALLSTATS4"] = "Verluste Deff: ";
		// units
		t["militia"] = "Militia";
		t["unknown"] = "unbekannt";
		t["sword"] = "Swordsman";
		t["slinger"] = "Slinger";
		t["archer"] = "Archer";
		t["hoplite"] = "Hoplite";
		t["rider"] = "Rider";
		t["chariot"] = "Chariot";
		t["catapult"] = "Catapult";
		t["big_transporter"] = "Transport boat";
		t["bireme"] = "Bireme";
		t["attack_ship"] = "Light ship";
		t["demolition_ship"] = "Fire ship";
		t["small_transporter"] = "Fast transport ship";
		t["trireme"] = "Trireme";
		t["colonize_ship"] = "Colony ship";
		t["minotaur"] = "Minotaur";
		t["manticore"] = "Manticore";
		t["zyklop"] = "Cyclop";
		t["sea_monster"] = "Hydra";
		t["harpy"] = "Harpy";
		t["medusa"] = "Medusa";
		t["centaur"] = "Centaur";
		t["pegasus"] = "Pegasus";
		// toolbar & buildings
		t["main"] = "Senate";
		t["barracks"] = "Barracks";
		t["docks"] = "Harbor";
		t["academy"] = "Academy";
		t["academyshort"] = "Aca";
		t["market"] = "Market";
		t["wall"] = "City Wall";
		t["place"] = "Agora";
		t["simulator"] = "Simulator";
		t["simulatorshort"] = "Sim";
		t["temple"] = "Temple";
		t["hide"] = "Cave";
		t["farm"] = "Farm";
		t["ironer"] = "Silver mine";
		t["lumber"] = "Timber camp";
		t["stoner"] = "Quarry";
		t["storage"] = "Warehouse";
		t["theater"] = "Theater";
		t["thermal"] = "Thermal bats";
		t["library"] = "Library";
		t["lighthouse"] = "Lighthouse";
		t["tower"] = "Tower";
		t["statue"] = "Divine statue";
		t["oracle"] = "Oracle";
		t["trade_office"] = "Merchant's shop";
		t["barracksshort"] = "Barr";
		t["wallshort"] = "Wall";
		// other
		t["highlighting"] = "Colored Report Overview";
		t["GWLanguage"] = "english";
		if (GE.Alliance_name[0] == 1) { t["SETTINGS"] = GE.Alliance_name[1].substr(0,25); }
		GE.Lang['en'] = t;
	};
	L_it();
	
	var server = GE.Server[3];
	var language = GE.Server[2];
	var text_translations = {
		"de" : {
			popups : {
				// Texts uses in pop-ups.
				show_games	: "Anzeige Olympischer Spiele an/aus.",
				show_theater: "Anzeige Theaterspiele an/aus.",
				show_party 	: "Anzeige Stadtfeste an/aus.",
				show_triumph: "Anzeige Triumphzüge an/aus.",
				next_party 	: "Click zum <b>Ausführen</b> eines Stadtfestes.",
				auto_party	: "Click zum <b>automatischen Ausführen</b> möglicher Stadtfeste.",
				no_party	: "Kein weiteres Stadtfest möglich.",
				next_triumph: "Click zum <b>Ausführen</b> eines Triumphzugs.",
				auto_triumph: "Click zum <b>automatischen Ausführen</b> möglicher Triumphzüge.",
				no_triumph	: "Kein weiterer Triumphzug möglich."
			}
		},
		"en" : {
			popups : {
				// Texts uses in pop-ups.
				show_games	: "Show Olympic Games on/off.",
				show_theater: "Show theater plays on/off.",
				show_party	: "Show town parties on/off.",
				show_triumph: "Show triumph parties on/off.",
				next_party	: "Click for <b>start</b> of one town party.",
				auto_party	: "Click for <b>automatic start</b> of all possible town parties.",
				no_party	: "No further town party available.",
				next_triumph: "Click for <b>start</b> of one victory procession.",
				auto_triumph: "Click for <b>automatic start</b> of all possible victory processions.",
				no_triumph	: "No further triumph party available."
			}
		}
	};
	
	switch (GE.Server[2]) { // languages: de en
		case 'de':
			GE.L = GE.Lang['de']; break;
		case 'en':
			GE.L = GE.Lang['en']; break;
		case 'zz':
			GE.L = GE.Lang['en']; break;
		default:
			GE.L = GE.Lang['en'];
	};
	
	var unitCosts = {
		// Wood, Stone, Iron, FoodPoints, Favor, Name, Booty
		'militia':				[0, 0, 0, 0, 0, 0, GE.L['militia'], 0],
		'unkown':				[0, 0, 0, 0, 0, 0, GE.L['unknown'], 0],   // 'unkown': Fehler in Grepo, soll wohl 'unknown' heißen
		'sword':				[95, 0, 85, 1, 0, 16, GE.L['sword'], 16],
		'slinger':				[55, 100, 40, 1, 0, 8, GE.L['slinger'], 8],
		'archer':				[120, 0, 75, 1, 0, 24, GE.L['archer'], 24],
		'hoplite':				[0, 75, 150, 1, 0, 8, GE.L['hoplite'], 8],
		'rider':				[240, 120, 360, 3, 0, 72, GE.L['rider'], 72],
		'chariot':				[200, 440, 320, 4, 0, 64, GE.L['chariot'], 64],
		'catapult':				[1200, 1200, 1200, 15, 0, 400, GE.L['catapult'], 400],
		'big_transporter':		[500, 500, 400, 7, 0, 20, GE.L['big_transporter'], 0],
		'bireme':				[800, 700, 180, 8, 0, 0, GE.L['bireme'], 0],
		'attack_ship':			[1300, 300, 800, 10, 0, 0, GE.L['attack_ship'], 0],
		'demolition_ship':		[500, 750, 150, 8, 0, 0, GE.L['demolition_ship'], 0],
		'small_transporter':	[800, 0, 400, 5, 0, 10, GE.L['small_transporter'], 0],
		'trireme':				[2000, 1300, 900, 16, 0, 0, GE.L['trireme'], 0],
		'colonize_ship':		[10000, 10000, 10000, 170, 0, 0, GE.L['colonize_ship'], 0],
		'minotaur':				[1400, 600, 3100, 30, 202, 480, GE.L['minotaur'], 480],
		'manticore':			[4400, 3000, 3400, 45, 405, 360, GE.L['manticore'], 360],
		'zyklop':				[2000, 4200, 3360, 40, 360, 320, GE.L['zyklop'], 320],
		'sea_monster':			[5400, 2800, 3800, 50, 400, 0, GE.L['sea_monster'], 0],
		'harpy':				[1600, 400, 1360, 14, 130, 340, GE.L['harpy'], 340],
		'medusa':				[1500, 3800, 2200, 18, 210, 400, GE.L['medusa'], 400],
		'centaur':				[1740, 300, 700, 12, 100, 200, GE.L['centaur'], 200],
		'pegasus':				[2800, 360, 80, 20, 180, 160, GE.L['pegasus'], 160]
	};
	
	GE.buildingStats = [];
	GE.buildingStats["main"] = [GE.L['main'],110,11,12,13,15,16,18,19,22,23,26,29,31,35,38,41,46,51,56,61,67,74,81,90,98];
	GE.buildingStats["lumber"] = [GE.L['lumber'],22,2,3,2,3,3,4,4,4,5,5,6,6,7,8,8,9,10,11,13,13,15,16,18,20,21,24,26,29,32,35,38,43,46,51,56,62,68,75,82];
	GE.buildingStats["farm"] = [GE.L['farm'],17,2,2,3,2,4,3,4,5,5,5,6,7,8,9,10,11,12,14,16,17,20,21,25,27,31,34,38,43,48,54,61,67,76,85,95,106,120,133,150];
	GE.buildingStats["stoner"] = [GE.L['stoner'],22,2,3,2,3,3,4,4,4,5,5,6,6,7,8,8,9,10,11,13,13,15,16,18,20,21,24,26,29,32,35,38,43,46,51,56,62,68,75,82];
	GE.buildingStats["storage"] = [GE.L['storage'],15,2,2,3,3,4,4,4,5,6,7,8,8,10,12,13,15,16,20,22,25,28,33,37,42,48,55,63,71,81];
	GE.buildingStats["ironer"] = [GE.L['ironer'],22,2,3,2,3,3,4,4,4,5,5,6,6,7,8,8,9,10,11,13,13,15,16,18,20,21,24,26,29,32,35,38,43,46,51,56,62,68,75,82];
	GE.buildingStats["barracks"] = [GE.L['barracks'],33,4,5,4,6,6,6,8,8,9,10,12,13,14,16,17,20,22,24,28,30,34,38,42,47,52,59,65,73,81];
	GE.buildingStats["wall"] = [GE.L['wall'],34,4,4,5,6,6,7,8,9,10,11,13,14,16,17,20,22,25,27,31,35,39,44,48,55];
	GE.buildingStats["hide"] = [GE.L['hide'],60,12,14,18,20,25,30,36,43,52];
	GE.buildingStats["docks"] = [GE.L['docks'],66,7,7,8,9,9,11,12,12,15,15,17,19,21,23,25,27,31,33,37,40,44,49,54,59,65,72,78,87,95];
	GE.buildingStats["academy"] = [GE.L['academy'],67,8,9,10,12,12,15,16,17,20,23,25,28,31,35,40,44,49,56,62,69,78,87,98,109,122,137,154,172,193];
	GE.buildingStats["temple"] = [GE.L['temple'],216,17,19,20,22,23,26,27,30,32,34,38,40,43,47,51,55,59,64,69,75,80,87,94,102];
	GE.buildingStats["market"] = [GE.L['market'],108,9,9,10,11,12,12,14,15,16,17,19,20,22,23,26,27,30,32,34,37,41,43,47,51,55,59,64,69,74];
	GE.buildingStats["place"] = [GE.L['place'],33];
	GE.buildingStats["theater"] = [GE.L['theater'],500];
	GE.buildingStats["thermal"] = [GE.L['thermal'],500];
	GE.buildingStats["library"] = [GE.L['library'],500];
	GE.buildingStats["lighthouse"] = [GE.L['lighthouse'],500];
	GE.buildingStats["tower"] = [GE.L['tower'],500];
	GE.buildingStats["statue"] = [GE.L['statue'],500];
	GE.buildingStats["oracle"] = [GE.L['oracle'],500];
	GE.buildingStats["trade_office"] = [GE.L['trade_office'],500];
	GE.Positions = GE_getValue("Positions"+ GE.Game.player_id);

	// START of SCRIPTUPDATER
	Updater = {
		//------------------------------------------- "public" methods --------------------------------------
		check:function(scriptId, currentVersion, callback) {
			Updater.initVars(scriptId, currentVersion, callback, true, false);
			var d = new Date();
			if (Updater.getInterval() > 0 && d.getTime() - Updater.getLastCheck() > Updater.getInterval())
				Updater.checkRemoteScript();
		},
		forceCheck:function(scriptId, currentVersion, callback) {
			Updater.initVars(scriptId, currentVersion, callback, true, false);
			Updater.checkRemoteScript();
		},
		getLatestVersion:function(scriptId, callback) {
			if (typeof(callback) != 'function') {
				error_log("Updater Fehler:\n\n Updater.getLatestVersion() benötigt eine Callback-Funktion als drittes Argument");
			}
			Updater.initVars(scriptId, callback, false, false, false);
			Updater.checkRemoteScript();
		},
		forceNotice:function(scriptId, currentVersion, callback) {
			Updater.initVars(scriptId, currentVersion, callback, true, true);
			Updater.checkRemoteScript();
		},
		checkStored:function() {
			if (typeof(Updater.scriptId) != 'undefined' && typeof(Updater.scriptCurrentVersion) != 'undefined') {
				return (typeof(GM_getValue('Updater_versionAvailable')) != 'undefined' && Updater.scriptCurrentVersion.toString() != GM_getValue('Updater_versionAvailable').toString());
			} else return false;
		},
		//------------------------------------------- "private" methods --------------------------------------
		$:function(id) {
			return document.getElementById(id);
		},
		initVars: function (scriptId, currentVersion, callbackFunction, useNotice, forceNoticeEnabled) {
			Updater.scriptId = scriptId;
			Updater.scriptCurrentVersion = typeof(currentVersion) != 'undefined' ? currentVersion.toString() : false;
			Updater.callbackFunction = typeof(callbackFunction) == 'function' ? callbackFunction : false;
			Updater.useNotice = useNotice;
			Updater.forceNoticeEnabled = forceNoticeEnabled;
		},
		checkRemoteScript:function() {
			if (Updater.scriptCurrentVersion && !Updater.alreadyOffered(Updater.scriptCurrentVersion))
				Updater.addOffer(Updater.scriptCurrentVersion);
			var d = new Date();
			Updater.setVal('lastCheck', d.getTime());
			// check the userscripts.org code review page
			GM_xmlhttpRequest ({
				method: "GET",
				url: "http://userscripts.org/scripts/source/" + Updater.scriptId + '.meta.js',
				headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
				onload: function (response) {
					Updater.meta = Updater.parseHeaders(response.responseText);
					// store latest version available
					GM_setValue('Updater_versionAvailable', Updater.meta.version);
					if (Updater.forceNoticeEnabled || (!Updater.alreadyOffered(Updater.meta.version) && Updater.useNotice)) {
						if (!Updater.alreadyOffered(Updater.meta.version)) Updater.addOffer(Updater.meta.version);
						Updater.showNotice();
					}
					if (typeof(Updater.callbackFunction) == 'function') Updater.callbackFunction(Updater.meta.version);
				}
			});
		},
		parseHeaders: function (metadataBlock) {
			var source = metadataBlock;
			var headers = {};
			var tmp = source.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);
			if (tmp) {
				var lines = tmp[0].match(/@(.*?)(\n|\r)/g);
				for (var i = 0; i < lines.length; i++) {
					var tmp = lines[i].match(/^@([^\s]*?)\s+(.*)/);
					var key = tmp[1];
					var value = tmp[2];
					if (headers[key] && !(headers[key] instanceof Array)) headers[key] = new Array(headers[key]);
					if (headers[key] instanceof Array) headers[key].push(value);
					else headers[key] = value;
				}
			}
			return headers;
		},
		showNotice: function() {
			if (Updater.meta.name && Updater.meta.version) {
				var iButtonWidth =  (9 + L('UPDINST').length) * 6;
				var cButtonWidth =  (10 + L('UPDCANCEL').length) * 6;
				GM_addStyle("\
					#UpdaterMask { position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000000; opacity:.3; z-index:9000; } \
					#UpdaterBody * { border:none; font-size:13px; color:#303010; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; } \
					#UpdaterBody { background:url(http://static.grepolis.com/images/game/border/brown.png) repeat scroll 0 0 transparent; width:607px; margin:auto;  position:fixed; left:20.2%; top:111px; text-align:left; border:1px solid #000000; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:0 0 12px 12px; cursor:default; z-index:9010; color:#202010; padding-bottom:1em ; } \
					#UpdaterBody a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; } \
					#UpdaterBody strong { font-weight:bold; } \
					#UpdaterBody h1 { background:url(http://static.grepolis.com/images/game/border/header.png) repeat scroll 0 0 transparent; font-size:13px; color:#ffffff; font-weight:bold; padding:.5em; border-bottom:2px solid #000000;  margin-bottom:.75em; } \
					#UpdaterBody h2 { font-weight:bold; margin:.5em 1em; } \
					#UpdaterBody h1 a { font-size:14px; font-weight:bold; color:#ffffff; text-decoration:none; cursor:help; } \
					#UpdaterBody h1 a:hover { text-decoration:underline; } \
					#UpdaterBody table { width:auto; margin:0 1em; } \
					#UpdaterBody table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; } \
					#UpdaterBody table tr td { line-height:2em; font-weight:bold; } \
					#UpdaterBody li { list-style-type:circle; } \
					#UpdaterBody p { font-size:12px; font-weight:normal; margin:1em; } \
					#UpdaterHistory { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; } \
					#UpdaterHistory ul { margin-left:2em; } \
					#UpdaterClose { float:right; cursor:pointer; height:15px; opacity:.5; } \
					#UpdaterClose:hover { opacity:.7; } \
					#UpdaterInterval { background:url(http://static.grepolis.com/images/game/border/even.png) repeat scroll 0 0 transparent; border:1px dotted #332211; color:#48341b } \
					#UpdaterInterval option { background:url(http://static.grepolis.com/images/game/border/brown.png) repeat scroll 0 0 transparent; border:none; color:#48341b } \
					#UpdaterFooter { padding: .9em 1em 0 !important;} \
					#UpdaterFooter input { border:1px #000000 outset; padding:4px 12px 4px 27px !important; font-weight:bold; background:no-repeat 7px center #48341b; -moz-border-radius:5px; color:#ffcc66; cursor:pointer; float:right; margin-left:1em !important; } \
					#UpdaterCloseButton { width:"+ cButtonWidth +"px; } \
					#UpdaterInstallButton { width:"+ iButtonWidth +"px; } \
					#UpdaterFooter input:hover {border:1px #000000 inset; background-color:#48341b #947854; color:#ffb400 } \
				");

				var noticeBg = document.createElement('div');
				noticeBg.id = "UpdaterMask";
				document.body.appendChild(noticeBg);

				var noticeWrapper = document.createElement('div');
				noticeWrapper.setAttribute('style', 'position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;');
				noticeWrapper.id = "UpdaterBodyWrapper";
				var upd_available = (Updater.scriptCurrentVersion && (Updater.scriptCurrentVersion < Updater.meta.version));
				var html = new Array();
				var notice = document.createElement('div');
				notice.id = "UpdaterBody";
				html.push('<h1><img id="UpdaterClose" src="');
				html.push(Updater.icons.close);
				html.push('" title="Close"/><img src="');
				html.push(Updater.icons.uso);
				html.push('" align="absmiddle" style="margin-top:-2px;"/> '+ L('UPDTITLE') +' </h1>');
				if (!Updater.forceNoticeEnabled) {
					html.push('<p>'+ (upd_available ? L('UPDNEW') : '') +' <strong><a href="http://userscripts.org/scripts/show/');
					html.push(Updater.scriptId);
					html.push('" target="_blank" title="Go to script page">');
					html.push(Updater.meta.name);
					html.push('</a> </strong> '+ (upd_available ? L('UPDREADY') : '') +'</p>');
				} else {
					html.push('<p><strong><a href="http://userscripts.org/scripts/show/');
					html.push(Updater.scriptId);
					html.push('" target="_blank" title="Go to script page" style="margin:0; padding:0;">');
					html.push(Updater.meta.name);
					html.push('</a> </strong></p>');
				}
				if (Updater.scriptCurrentVersion) {
					html.push('<p>'+ L('UPDCURRENT') +' <strong>');
					html.push(Updater.scriptCurrentVersion)
					html.push('</strong>.<br> '+  L('UPDLATEST') +' <strong>');
					html.push(Updater.meta.version);
					html.push('</strong></p>');
				}
				if (Updater.meta.history) {
					html.push('<h2>Version History:</h2><div id="UpdaterHistory">');
					var history = new Array();
					var version, desc;
					if (typeof(Updater.meta.history) != 'string') {
						for (var i = 0; i < Updater.meta.history.length; i++) {
							var tmp = Updater.meta.history[i].match(/(\S+)\s+(.*)$/);
							version = tmp[1];
							change = tmp[2];
							history[version] = typeof(history[version]) == 'undefined' ? new Array() : history[version];
							history[version].push(change);
						}
					} else {
						var tmp = Updater.meta.history.match(/(\S+)\s+(.*)$/);
						version = tmp[1];
						change = tmp[2];
						history[version] = typeof(history[version]) == 'undefined' ? new Array() : history[version];
						history[version].push(change);
					}
					for (var v in history) {
						html.push('<div style="margin-top:.75em;"><strong>v' + v + '</strong></div><ul>');
						for (var i = 0; i < history[v].length; i++)
							html.push('<li>' + history[v][i] + '</li>');
						html.push('</ul>');
					}
					html.push('</div>');
				}
				html.push('<p> <small> '+ L('UPDUPD') +': </small>');
				html.push('<select id="UpdaterInterval"> \
					<option value="3600000"> '+ L('UPDONE') +'</option>\
					<option value="21600000"> '+ L('UPDSIX') +'</option>\
					<option value="86400000"> '+ L('UPDDAY') +'</option>\
					<option value="604800000"> '+ L('UPDWEEK') +'</option>\
					<option value="2419200000"> '+ L('UPDWEEK4') +'</option>\
					<option value="0"> '+ L('UPDNEVER') +'</option>\
					</select>');
				html.push('</p></div>');

				html.push('<div id="UpdaterFooter">');
				html.push('<input type="button" id="UpdaterCloseButton" value="'+ L('UPDCANCEL') +'" style="background-image:url(');
				html.push(Updater.icons.close);
				html.push(')"/>');
				if (upd_available) {
					html.push('<input type="button" id="UpdaterInstallButton" value="'+ L('UPDINST') +'" style="background-image:url(');
					html.push(Updater.icons.install);
					html.push(');"/>');
				}

				notice.innerHTML = html.join('');
				noticeWrapper.appendChild(notice);
				document.body.appendChild(noticeWrapper);
				Updater.$('UpdaterClose').addEventListener('click', Updater.closeNotice, true);
				Updater.$('UpdaterCloseButton').addEventListener('click', Updater.closeNotice, true);
				if (upd_available) {
					Updater.$('UpdaterInstallButton').addEventListener('click', function() {
						setTimeout(Updater.closeNotice, 300);
						document.location = typeof(Updater.installUrl) == 'string' ? Updater.installUrl : 'http://userscripts.org/scripts/source/' + Updater.scriptId + '.user.js';
					}, true);
				}
				window.addEventListener('keyup', Updater.keyUpHandler, true);
				// set current interval in selector
				var selector = Updater.$('UpdaterInterval');
				for(var i = 0; i < selector.options.length; i++) {
					if (selector.options[i].value.toString() == Updater.getInterval().toString())
						selector.options[i].selected = true;
				}
				selector.addEventListener('change', function() {
					Updater.setInterval(this.value);
				}, true);
				noticeWrapper.style.height = document.documentElement.clientHeight +'px';
				$('#UpdaterMask')[0].style.height = (unsafeWindow.scrollMaxY + unsafeWindow.innerHeight) +'px';
			}
		},
		closeNotice:function() {
			document.body.removeChild(Updater.$('UpdaterBodyWrapper'));
			document.body.removeChild(Updater.$('UpdaterMask'));
			window.removeEventListener('keyup', Updater.keyUpHandler, true);
		},
		keyUpHandler:function (e) {
			if (e.keyCode == 27) { Updater.closeNotice(); }
		},
		getVal:function(key) {
			key = 'Updater.'+ key;
			return eval(GM_getValue(key, ('({})')));
		},

		setVal:function(key, value) {
			key = 'Updater.'+ key;
			GM_setValue(key, '('+ JSON.stringify(value) + ')');
		},
		alreadyOffered:function(version) {
			var offers = Updater.getOffers();
			if (offers.length == 0) {
				Updater.addOffer(version);
				return true;
			}
			for(var i = 0; i < offers.length; i++)
				if (version.toString() == offers[i].toString()) { return true; }
			return false;
		},
		getOffers:function() {
			var offers = Updater.getVal('versionsOffered');
			return (typeof(offers) == 'undefined' || typeof(offers.length) == 'undefined' || typeof(offers.push) == 'undefined') ? new Array() : offers;
		},
		addOffer:function(version) {
			var offers = Updater.getOffers();
			offers.push(version);
			Updater.setVal('versionsOffered', offers);
		},
		getInterval:function() {
			var interval = Updater.getVal('interval');
			return (typeof(interval) == 'undefined' || !interval.toString().match(/^\d+$/)) ? 86400000 : parseInt(interval.toString(), 10);
		},
		setInterval:function(interval) {
			Updater.setVal('interval', parseInt(interval, 10));
		},
		getLastCheck:function() {
			var lastCheck = Updater.getVal('lastCheck');
			return (typeof(lastCheck) == 'undefined' || !lastCheck.toString().match(/^\d+$/)) ? 0: parseInt(lastCheck.toString(), 10);
		},
		icons:{
			install:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
			close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
			uso:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D",
		},
	};
	// END of SCRIPTUPDATER



	function GE_getValue(varname) { return eval(GM_getValue(varname, '[]')); }

	
	
alert(GE.Poritions);
(function(){
    var ff = (typeof unsafeWindow !== 'undefined');
    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;
    
    var n = /(\w+)(\d+)\.grepolis\.com/.exec(window.location.host);
    var lang = (n[1] || 'en'), server = (n[1] + n[2]);
    var townId = parseInt(uW.Game.townId, 10);
    
    function update(){
      if (uW.Layout.town_list_toggle){
        setTimeout(update,200);
        return;
      }
      if (!$('#town_list').is(':visible')){
        return;
      }
      $('#town_list').css('z-index',9);
      $('#town_link_clicked_menu').css('z-index',301);
      $('#town_list a').each(function(i, e){
          var url = $(e).attr('href');
          var m = /[?&]town_id=(\d+)/.exec(url);
          if (m && m[1]) {
            var newurl = "return Layout.townLinkClicked(this, " + m[1] + ", '0', '/game/map?target_town_id=" + m[1] + "&town_id=" + townId + "', '_self')";
            $(e).addClass('gpT');
            $(e).after('<a href="#" onclick="' + newurl + '"><img src="http://static.grepolis.com/images/game/temp/bbcode_town.png"/></a>');
          }
       });
    }

    uW.Layout.toggleTownList=createSequence(uW.Layout.toggleTownList,function(){
      setTimeout(update, 200);
    });

function createSequence(method, fcn, scope){
        return (typeof fcn != 'function') ?
                this :
                function(){
                    var retval = method.apply(this || window, arguments);
                    fcn.apply(scope || this || window, arguments);
                    return retval;
         };
}

})();
