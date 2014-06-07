// ==UserScript==
// @name            Grepolis Toolbar
// @version	    8.2a
// @description     Grepolis Toolbar: added the Toolbar from Premium-User
// @namespace       Doc Marco & die PC-Helfer <http://www.sdm-scholz.de>
// @author	    Doc Marco; modifie by Fwiep
// @homepage	    http://www.sdm-scholz.de
// @require         http://sizzlemctwizzle.com/updater.php?id=62989
// @require	    http://userscripts.org/scripts/source/85821.user.js
// @include         http://*.grepolis.*
// @source          http://userscripts.org/scripts/show/62989
// @license         GNU General Public License GPLv3
// ==/UserScript==
/**
* This script is licensed  under:
* GNU General Public License GPLv3
* To view a copy of this license, visit http://www.gnu.org/licenses/gpl.html
* Copyright © Doc Marco & die PC-Helfer, 2009-2010
* Initial script © Copyright Doc Marco & die PC-Helfer (aka Đð¢ M@rco PC-Ŧræk), 2009
* Snipes copied from http://userscripts.org/scripts/show/71132 - Dreambraker
*Pointsource from: http://userscripts.org/scripts/show/89114 //translate in all Languages
*Special thanks to Bart Kemps for refactoring the script and adding icons, drop down functionality and configurability
**/
	// Default Settings
	const SHOW_BUILD_LEVELS = true;
	const SHOW_IMAGES = true;
	const USE_GREPO_STATS = true;
	const USE_SCRIPT_INFO = true; 
	const SHOW_BUILDINGS_NOT_PRESENT = false;
	const TOP_MENU_ITEMS = ['main','barracks','docks','academy',['other','market','temple','wall','hide','farm','place','player'],'edit'];
	const LEFT_MENU_ITEMS = ['place'];
	const UNITS_MENU_ITEMS = ['player'];
	const GREPO_MENU_ITEMS = ['grepo','you','ally','map','player'];

	// Access to window object cross-browser
	var uW;
	if(typeof unsafeWindow==='object'){uW=unsafeWindow;}else{uW=window;}

	// Get current site location
	var url = document.location.href;

	// Access jQuery
	var $=uW.jQuery;

	// Script info
	var grepo_shortcut_version='8.2a';
	
	// Version string
	var vers_ist = "Grepolis Toolbar 8.2a";

	// Basic player data
	var player = uW.Game.player_id;
	var town = uW.Game.townId;
	var ally = uW.Game.alliance_id;
	var csrfToken = uW.Game.csrfToken;
	var lang = uW.Game.world;

	// Function allowing to use GM_setValue on event
	function GMset(string,value){
		setTimeout(function(){
			GM_setValue(string,value);
		},0);
	}
	
	var playerName=GM_getValue('playerName');
	var allyName=GM_getValue('allyName');
	var dispBL=GM_getValue('dispBL');


	// Curent date
	var now = new Date();
	var day = now.getDate();
	var month = now.getMonth()+1;
	var year = now.getFullYear();
	var today = day + '-' + month + '-' + year;

	//add a console function
	var l;
	if (typeof uW.console === 'object' && typeof uW.console.log === 'function') {
		l = uW.console.log;
	} else {
		l = function () {
			return false;
		};
	}

	var translate = {
		de: {
			language_name:  "german/deutsch",
			main: 		"Senat",
			barracks: 		"Kaserne",
			academy: 		"Akademie",
			docks: 		"Hafen",
			market: 		"Markt",
			place: 		"Agora",
			temple: 		"Tempel",
			wall: 		"Mauer",
			hide:			"Höhle",
			farm:			"Bauernhof",
			stats:		"Deine Statistik",
			you:			"DU",
			ally:			"Allianz",
			map:			"Karte",
			pad:			"Notiz erstellen",
			manage:     	"Notizen verwalten",
			aus:            	"Notizen exportieren",
			imp:            	"Notizen importieren",
			edit:           	".css ändern (Aussehen anpassen)",
			topbar:		"Topbar",
			close:		"Schliesen-Button",
			closeb:		"Schliesen",
			remove:		"Notiz löschen",
			save:		"Speichern",
			two:			"doppel klicken um den Eintrag einfügen/ändern",
			speak:		"Sprachen",
			worlds:         	"Welten",
			alpha:          	"Alpha",
			beta:           	"Beta",
			gamma:          	"Gamma",
			delta:          	"Delta",
			other:		"weitere",
			edit:			" ",
			player:		"Spielerübersicht",
			points:		"Punkteverlauf",
			rank:		"Rangverlauf",
			server:		"de",
			grepo:		"Grepostats:"
		},
		es: {
			language_name:  "spanish/espanol",
			main: 		"Senado",
			barracks: 	"Cuartel",
			academy: 	"Academia",
			docks: 		"Puerto",
			market: 	"Mercado",
			place: 		"Ágora",
			temple:		"Templo",
			wall: 		"Muralla",
			hide:		"Cueva",
			stats:		"Sus estadísticas",
			you:		"Usted",
			ally:		"Alianza",
			map:		"Mapa",
			speak:		"Idiomas",
			pad:		"Notas",
			manage:         "Editar las notas",
			aus:            "Exportar notas",
			imp:            "Importar notas",
			edit:           "Editar el estilo",
			topbar:		"Topbar",
			close:		"Botón cerrar",
			closeb:		"Cerrar",
			remove:		"Borrar Nota",
			save:		"Guardar",
			two:		"Doble click para editar",
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			more:		"more",
			edit:		" ",
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"es",
			grepo:		"Grepostats:"
		},
		gr: {  
			language_name:  "ελληνικά/greek",
			main:           "Σύγκλητος",    
			barracks:       "Στρατώνες",    
			academy:        "Ακαδημία",    
			docks:          "Λιμάνι",    
			market:         "Παζάρι",    
			place:          "Αγορά",    
			temple:         "Ναός",    
			wall:           "Τείχος της πόλης",    
			hide:           "Σπηλιά",    
			stats:          "ΣΤΑΤΙΣΤΙΚΑ",    
			you:            "Εσύ",    
			ally:           "Συμμαχία σου",    
			map:            "Χάρτης",    
			speak:          "Γλώσσα",    
			pad:	    	"Σημειώσεις",  
			manage:         "Manage Notes",  
			aus:            "Εξαγωγή",  
			imp:            "Εισαγωγή",  
			edit:           "επεξεργασία στυλ",  
			topbar:     	"Top bar",  
			close:      	"Κλείσιμο",  
			closeb:     	"Κλείσιμο",  
			remove:     	"Διαγραφή",  
			save:       	"Αποθήκευση",  
			two:        	"Επεξεργασία (διπλό κλικ)",
			worlds:         "Κόσμοι", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			more:		"περισσότερα",
			edit:		" ",
			player:		"Παίκτης",
			points:		"Points",
			rank:		"Ranking",
			server:		"gr",
			grepo:		"Grepostats:"  
		},
		fr: {
			language_name:	"french",
			main: 		"Sénat",
			barracks: 	"Caserne",
			academy: 	"Académie",
			docks: 		"Port",
			market: 	"Marché",
			place: 		"Agora",
			temple: 	"Temple",
			wall: 		"Rempart",
			hide: 		"Grotte",
			stats: 		"Mes stats",
			you: 		"Moi",
			ally: 		"Alliance",
			map: 		"Carte",
			speak: 		"Langues",
                        farm:           "Ferme",
			pad: 		"Bloc-notes",
			manage: 	"Gérer les notes",
			aus: 		"Exporter une note",
			imp: 		"Importer une note",
			edit: 		"Éditer le modèle",
			topbar: 	"Topbar",
			close: 		"Quitter",
			closeb: 	"Fermer",
			remove: 	"Supprimer la note",
			save: 		"Sauvegarder",
			two: 		"Double clic pour éditer",
			speak:		"Langues",
			worlds:         "Mondes",
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			more:		"other",
			edit:		" ",
			player:		"Aper¢u de Player",
			points:		"Points",
			rank:		"Ranking",
			server:		"fr",
			grepo:		"Grepostats:"
		},
		cz: {
			language_name: "Česky",
			main: 		"Senát",
			barracks: 	"Kasárna",
			academy: 	"Akademie",
			docks: 		"Přístav",
			market: 	"Třiště",
			place: 		"Agora",
			temple: 	"Chrám",
			wall: 		"Hradby",
			hide: 		"Jeskyně",
                        farm:           "Statek",
			stats: 		"tvoje statistika",
			you: 		"Ty",
			ally: 		"Aliance",
			map: 		"Mapa",
			speak: 		"Jazyk",
			pad: 		"Notes",
			manage: 	"správa Notesu",
			aus: 		"Export Notes",
			imp: 		"Import Notes",
			edit: 		"upravit styl",
			topbar: 	"horní lišta",
			close: 		"tlačítko – zavřít",
			closeb: 	"zavřít",
			remove: 	"smazat notes",
			save: 		"uložit",
			two: 		"dvojklikem editovat",
			speak: 		"Jazyk",
			worlds: 	"Světy",
			alpha: 		"Alpha",
			beta: 		"Beta",
			gamma: 		"Gamma",
			delta: 		"Delta",
			edit_t: 	"nastavení",
			player: 	"to jsem já",
			points:		"Points",
			rank:		"Ranking",
			server:		"cz",
			grepo: 		"Grepostats:"
		},
		nl: {
			language_name:  "Dutch/Nederlands",
			main: 		"Senaat",
			barracks: 	"Kazerne",
			academy: 	"Academie",
			docks: 		"Haven",
			market: 	"Markt",
			place: 		"Agora",
			temple: 	"Tempel",
			wall: 		"Muur",
			hide:		"Grot",
                        farm:           "Boerderij",
			stats:		"Statistieken",
			you:		"Speler",
			ally:		"Alliantie",
			map:		"Kaart",
			speak:		"Talen",
			pad:		"Blocnote",
			manage:         "beheernota's",
			aus:            "de uitvoernota's",
			imp:            "de invoernota's",
			edit:           "Bewerk",
			topbar:		"Topbar",
			close:		"dichte knoop",
			closeb:		"sluit",
			remove:		"schrap nota",
			save:		"sparen",
			two:		"dubbelklikken om nota uit te geven",
			speak:          "Taal", 
			worlds:         "Werelden", 
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit_t:		" ",//TODO Settings insert (Bewerk)
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"nl",
			grepo:		"Grepostats:"
		},
		se: {
			language_name:  "schwedisch/swedish",
			main: 		"Senaten",
			barracks: 	"Kasern",
			academy: 	"Akademi",
			docks: 		"Hamn",
			market: 	"Marknad",
			place: 		"Torg",
			temple: 	"Tempel",
			wall: 		"Wall",
			hide:		"Höhle",
			stats:		"Your Statics",//TODO Translate
			you:		"YOU",//TODO Translate
			ally:		"Alliance",//TODO Translate
			map:		"Map",//TODO Translate
			speak:		"Languages",//TODO Translate
			pad:		"Notas",//TODO Translate
			manage:         "manage Notes",//TODO Translate
			aus:            "export Notes",//TODO Translate
			imp:            "import Notes",//TODO Translate
			edit:           "edit Style",//TODO Translate
			topbar:		"Topbar",//TODO Translate
			close:		"Close-Button",//TODO Translate
			closeb:		"Close",//TODO Translate
			remove:		"delete Note",//TODO Translate
			save:		"Save",//TODO Translate
			two:		"double click to edit Note", //TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit:		" ",
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"se",
			grepo:		"Grepostats:"
		},
		ro: {
			language_name:  "romanian/româna",
			main: 		"Senat",
			barracks: 	"Cazarmă",
			academy: 	"Academie",
			docks: 		"Port",
			market: 	"Piaţă",
			place: 		"Agora",
			temple: 	"Templu",
			wall: 		"Zidul",
			hide:		"Höhle",//TODO Translate
			stats:		"Deine Statistik",//TODO Translate
			you:		"DU",//TODO Translate
			ally:		"Allianz",//TODO Translate
			map:		"Karte",//TODO Translate
			speak:		"Languages",//TODO Translate
			pad:		"Notas",//TODO Translate
			manage:         "Notizen verwalten",//TODO Translate
			aus:            "Notizen exportieren",//TODO Translate
			imp:            "Notizen importieren",//TODO Translate
			edit:           ".css ändern (Aussehen anpassen)",//TODO Translate
			topbar:		"Topbar",//TODO Translate
			close:		"Schliesen-Button",//TODO Translate
			closeb:		"Schliesen",//TODO Translate
			remove:		"Notiz löschen",//TODO Translate
			save:		"Speichern",//TODO Translate
			two:		"doppel klicken um den Eintrag einfügen/ändern", //TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit:		" ",
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"ro",
			grepo:		"Grepostats:"
		},
		pl: {
			language_name:  "polish/polski",
			main: 		"Senat",
			barracks: 	"Koszary",
			academy: 	"Akademia",
			docks: 		"Port",
			market: 	"Targowisko",
			place: 		"Agora",
			temple: 	"Świątynia",
			wall: 		"Mur",
			hide:		"Höhle",//TODO Translate
			stats:		"Deine Statistik",//TODO Translate
			you:		"DU",//TODO Translate
			ally:		"Allianz",//TODO Translate
			map:		"Karte",//TODO Translate
			speak:		"Languages",//TODO Translate
			pad:		"Notas",//TODO Translate
			manage:         "Notizen verwalten",//TODO Translate
			aus:            "Notizen exportieren",//TODO Translate
			imp:            "Notizen importieren",//TODO Translate
			edit:           ".css ändern (Aussehen anpassen)",//TODO Translate
			topbar:		"Topbar",//TODO Translate
			close:		"Schliesen-Button",//TODO Translate
			closeb:		"Schliesen",//TODO Translate
			remove:		"Notiz löschen",//TODO Translate
			save:		"Speichern",//TODO Translate
			two:		"doppel klicken um den Eintrag einfügen/ändern", //TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit:		" ",
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"pl",
			grepo:		"Grepostats:"
		},
		en: {
			language_name:  "English",
			main: 		"Senate",
			barracks: 	"Barracks",
			academy: 	"Academy",
			docks: 		"Harbour",
			market: 	"Market",
			place: 		"Agora",
			temple: 	"Temple",
			wall: 		"Wall",
			hide:		"Hide",
			stats:		"Your Statistics",
			you:		"YOU",
			ally:		"Alliance",
			map:		"Map",
			speak:		"Languages",
			pad:		"Notepad",
			manage:         "Manage Notes",
			aus:            "Export Notes",
			imp:            "Import Notes",
			edit:           "edit Style",
			topbar:		"Topbar",
			close:		"Close-Button",
			closeb:		"Close",
			remove:		"delete Note",
			save:		"Save",
			two:		"Double Click to edit", //TODO Translate
			speak:          "Language",
			worlds:         "Worlds",
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit:		" ",
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"en",
			grepo:		"Grepostats:"
		},
		it: {
			language_name: "italian/italiano",
			main: "Senato",
			barracks: "Caserma",
			academy: "Accademia",
			docks: "Porto",
			market: "Mercato",
			place: "Agora",
			temple: "Tempio",
			wall: "Mura",
			hide: "Caverna",
			farm: "Fattoria",
			stats: "Le tue statistiche",
			you: "TU",
			ally: "Alleanza",
			map: "Mappa",
			speak: "Lingue",
			pad: "Note",
			manage: "Diriga le note",
			aus: "Esporta note",
			imp: "Importa note",
			edit: "",
			topbar: "Barra",
			close: "Chiudi",
			closeb: "Chiudi",
			remove: "Cancella",
			save: "Salva",
			two: "Doppio click per inserire/modificare la nota",
			speak: "Lingua",
			worlds: "Mondi",
			alpha: "Alpha",
			beta: "Beta",
			gamma: "Gamma",
			delta: "Delta",
			//edit: "Modifica il css (stile)",
			player: "Profilo",
			points:		"Points",
			rank:		"Ranking",
			server:		"it",
			grepo: "Grepostats:"
			},
		sk: {
			language_name: 	"slovak/slovensky",
			main: 		"Senát",
			barracks: 	"Kasárne",
			academy: 	"Akadémia",
			docks: 		"Prístav",
			market: 	"Trhovisko",
			place: 		"Agora",
			temple: 	"Chrám",
			wall: 		"Hradby",
			hide: 		"Jaskyňa",
			farm: 		"Farma",
			stats: 		"Tvoja Štatistika",
			you: 		"Ty",
			ally: 		"Aliancia",
			map: 		"Mapa",
			speak: 		"Jazykov",
			pad: 		"Poznámky",
			manage: 	"Poznámku spravovať",
			aus: 		"Poznámku exportovať",
			imp: 		"Poznámku importovať",
			edit: 		".css zmeniť (upraviť vzhľad)",
			topbar: 	"Vrchná lišta",
			close: 		"Tlačidlo-Zatvor",
			closeb: 	"Zatvoriť",
			remove: 	"Poznámku odstráň",
			save: 		"Uložiť",
			two: 		"dvojklik na vstup pre vkladanie/zmenu",
			speak: 		"Jazyky",
			worlds: 	"Svety",
			alpha: 		"Alpha",
			beta: 		"Beta",
			gamma: 		"Gamma",
			delta: 		"Delta",
                        other: 		"dalšie",
			edit:		" ",
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"sk",
			grepo:		"Grepostats:"

                    },
		hu: {
			language_name: 	"hungarian/magyar",
			main: 		"Szenátus",
			barracks: 	"Kaszárnya",
			academy: 	"Akadémia",
			docks: 		"Kikötő",
			market: 	"Piac",
			place: 		"Agora",
			temple: 	"Templom",
			wall: 		"Városfal",
			hide: 		"Verem",
			stats: 		"Statisztikáid",
			you: 		"Te",
			ally: 		"Szövetség",
			map: 		"Térkép",
			speak: 		"Nyelvek",
			pad: 		"Jegyzetek",
			manage: 	"Jegyzetek kezelése",
			aus: 		"Jegyzetek exportálása",
			imp: 		"Jegyzetek importálása",
			edit: 		".css egyéb (A megjelenítés testreszabása)",
			topbar: 	"Topbar",
			close: 		"Bezárás-Gomb",
			closeb: 	"Bezárás",
			remove: 	"Jegyzet törlése",
			save: 		"Mentés",
			two: 		"dupla klikk a belépéshez einfĂĽgen/egyéb", //TODO Translate
			speak: 		"Nyelv",
			worlds: 	"Világok",
			alpha: 		"Alpha",
			beta: 		"Beta",
			gamma: 		"Gamma",
			delta: 		"Delta",
			other: 		"Egyéb",
			edit:		" ",
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"hu",
			grepo:		"Grepostats:"
			},
		pt: {
			language_name:  "Portuguese",
			main: 		"Senado",
			barracks: 	"Quartel",
			academy: 	"Academia",
			docks: 		"Porto",
			market: 	"Mercado",
			place: 		"Agora",
			temple: 	"Templo",
			wall: 		"Muralha",
			hide:		"Esconder",
			stats:		"Estatísticas",
			you:		"Você",
			ally:		"Aliança",
			map:		"Mapa",
			speak:		"Línguas",
			pad:		"Bloco Notas",
			manage:         "Notizen verwalten",//TODO Translate
			aus:            "Notizen exportieren",//TODO Translate
			imp:            "Notizen importieren",//TODO Translate
			edit:           ".css ändern (Aussehen anpassen)",//TODO Translate
			topbar:		"Topbar",//TODO Translate
			close:		"Schliesen-Button",//TODO Translate
			closeb:		"Schliesen",//TODO Translate
			remove:		"Notiz löschen",//TODO Translate
			save:		"Speichern",//TODO Translate
			two:		"doppel klicken um den Eintrag einfügen/ändern", //TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit:		" ",
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"pt",
			grepo:		"Grepostats:"
		},
		dk: {
			language_name:  "dänisch/danish",
			main:		"Senat",
			barracks: 	"Kaserne",
			academy:	"Academi",
			docks: 		"Havn",
			market: 	"Market",
			place: 		"Agora",
			temple: 	"Tempel",
			wall: 		"Bymur",
			hide: 		"Hule",
                        farm:           "Bondegård",
			stats: 		"Din statistik",
			you: 		"dig",
			ally:	 	"allieret",
			map: 		"Kort",
			speak: 		"Sprog",
			pad: 		"Noter",
			manage: 	"Opret noter",
			aus: 		"Export Noter",
			imp: 		"Import noter",
			edit: 		"Rediger Style",
			topbar:		"topbar",
			close: 		"Luk-knappen",
			closeb: 	"Luk",
			remove:		"Fjern Note",
			save: 		"sparer",
			two: 		"Dobbelt klik for at redigere", //TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit:		" ",
			player:		"Playeroverlay",
			points:		"Points",
			rank:		"Ranking",
			server:		"dk",
			grepo:		"Grepostats:"
		}
	};
	
	var menuUrls = {
		main: 		"building_main?action=index&town_id={town}&h={token}",
		barracks: 	"building_barracks?action=index&town_id={town}&h={token}",
		academy: 	"building_academy?action=index&town_id={town}&h={token}",
		docks: 		"building_docks?action=index&town_id={town}&h={token}",
		market: 	"	building_market?action=index&town_id={town}&h={token}",
		place: 		"building_place?action=culture&town_id={town}&h={token}",
		temple: 		"building_temple?action=index&town_id={town}&h={token}",
		wall: 		"building_wall?action=index&town_id={town}&h={token}",
		hide:		"building_hide?action=index&town_id={town}&h={token}",
		farm:		"building_farm?action=index&town_id={town}&h={token}",
                edit:   		"quickbar?action=index&town_id={town}&h={token}",
                alliance:       	"alliance?action=index&town_id={town}&h={token}",
		alpha:          	"http://{lang}1.grepolis.com/game/building_main",
		beta:           	"http://{lang}2.grepolis.com/game/building_main",
		gamma:          	"http://{lang}3.grepolis.com/game/building_main",
		delta:          	"http://{lang}4.grepolis.com/game/building_main",
		player:		"player?player_id={player}&town_id={town}",
		grepo:		"http://www.grepolismaps.org/",
		you:			"http://www.grepostats.com/world/{lang}/player/{player}",
		ally:		"http://www.grepostats.com/world/'+world+'/alliance/'+ally",
		map:		"http://www.grepolismaps.org/"
	};
	
	var icons = {
		main: 		"http://static.grepolis.com/images/game/toolbar/main.png",
		barracks: 	"http://static.grepolis.com/images/game/toolbar/barracks.png",
		academy: 	"http://static.grepolis.com/images/game/toolbar/academy.png",
		docks: 		"http://static.grepolis.com/images/game/toolbar/docks.png",
		place: 		"http://static.grepolis.com/images/game/toolbar/place.png",
		market:         	"http://static.grepolis.com/images/game/toolbar/trade.png",
		farm:		"http://static.grepolis.com/images/game/toolbar/farm.png",
                edit:    		"http://static.grepolis.com/images/game/layout/toolbar_edit.png",
		player:		"http://static.grepolis.com/images/game/temp/player.png",
		
		alliance:       	"http://static.grepolis.com/images/game/toolbar/alliance.png",
		attack:         	"http://static.grepolis.com/images/game/toolbar/attack.png",
		info:           	"http://static.grepolis.com/images/game/toolbar/info.png",
		leader:		"http://static.grepolis.com/images/game/toolbar/leader.png",
		messages:        	"http://static.grepolis.com/images/game/toolbar/message.png",
		other:          	"http://static.grepolis.com/images/game/toolbar/other.png",
		report:         	"http://static.grepolis.com/images/game/toolbar/report.png",
		edit:           	"http://static.grepolis.com/images/game/layout/toolbar_edit.png",
		worlds:         	"http://ftp.innogames.net/~floo/navbar/forumsearch.png",
		grepo:		"http://www.grepostats.com/img/favicon.ico"
		
	};
	
	//Get language - Dreambraker changed Đð¢ M@rco
	var lang=uW.location.href.substring(7,9);
	if(lang!='fr' && lang!='se' && lang!='de' && lang!='es' && lang!='en' && lang!='pl' && lang!='hu' && lang!='pt' && lang!='ro' && lang!='cz' &&lang!='it' && lang!='gr' && lang!='dk'){lang='en';}
	var trad={main:'',barracks:'',academy:'',docks:'',market:'',place:'',temple:'',wall:'',sim:'',storage:'',lumber:'',stone:'',iron:''};
	var language=[];
	language['fr']='french/francais';
	language['de']='german/deutsch';
	language['es']='spanish/espanol';
	language['pl']='polish/polski';
	language['hu']='hungarian/magyar';
	language['pt']='Português';
	language['ro']='romanian/româna';
	language['cz']='czech/Ceština';
	language['it']='italian/italiano';//TODO add
	language['gr']='ελληνικά/greek';
	language['en']='english/english';
	language['se']='schwedisch/swedish';
	language['dk']='dänisch/danish';
	language['nl']='nederlands'
	language['sk']='slovak'//TODO add
	var gs_langs=15;


	//Get language
	var lang='en'; // default language
	for (availableLanguage in translate) {
		if (window.location.href.indexOf("http://"+availableLanguage) == 0 || window.location.href.indexOf("https://"+availableLanguage) == 0) {
			lang = availableLanguage;
			break;
		}
	}
	
	// Cache building levels for displaying in main menu 
	if(location.href.match('game/building_main')){
		var gtb=uW.BuildingMain;
		gtb.b=gtb.buildings;
		GM_setValue('gtb_academy_level',gtb.b.academy.level);
		GM_setValue('gtb_barracks_level',gtb.b.barracks.level);
		GM_setValue('gtb_docks_level',gtb.b.docks.level);
		GM_setValue('gtb_farm_level',gtb.b.farm.level);
		GM_setValue('gtb_hide_level',gtb.b.hide.level);
		GM_setValue('gtb_ironer_level',gtb.b.ironer.level);
		GM_setValue('gtb_lumber_level',gtb.b.lumber.level);
		GM_setValue('gtb_main_level',gtb.b.main.level);
		GM_setValue('gtb_market_level',gtb.b.market.level);
		//GM_setValue('gtb_place_level',gtb.b.place.level);
		GM_setValue('gtb_stoner_level',gtb.b.stoner.level);
		GM_setValue('gtb_storage_level',gtb.b.storage.level);
		GM_setValue('gtb_temple_level',gtb.b.temple.level);
		GM_setValue('gtb_wall_level',gtb.b.wall.level);
	}

	
	
	// Set building levels
	if(location.href.match('game')){
		var buildingLevels={
			main:     GM_getValue('gtb_main_level'),
			academy:  GM_getValue('gtb_academy_level'),
			barracks: GM_getValue('gtb_barracks_level'),
			docks:    GM_getValue('gtb_docks_level'),
			farm:     GM_getValue('gtb_farm_level'),
			hide:     GM_getValue('gtb_hide_level'),
			ironer:   GM_getValue('gtb_ironer_level'),
			lumber:   GM_getValue('gtb_lumber_level'),
			market:   GM_getValue('gtb_market_level'),
			//place:: GM_getValue('gtb_place_level'),
			stoner:   GM_getValue('gtb_stoner_level'),
			storage:  GM_getValue('gtb_storage_level'),
			temple:   GM_getValue('gtb_temple_level'),
			wall:     GM_getValue('gtb_wall_level')
		}
	}
	
	// Add the menu element to the document
	var menu = $('#bar_content')[0];
	$('.toolbar').remove();
	if(menu == null) {
		menu = document.createElement('div');
		menu.setAttribute('id','sright');
		document.getElementById('lmidall').appendChild(menu);
	}
	
	// Create the menu item list (an ul)
	var elemUL = document.createElement('ul');
	elemUL.setAttribute('class','toolbar');
	menu.appendChild(elemUL)
	
	var numberOfMenuCharacters = 0;
	
	var shouldShowItem = function(item) {
		if (translate[lang][item]) if(menuUrls[item]) {
			if (SHOW_BUILDINGS_NOT_PRESENT) return true;
			if (buildingLevels[item] == null) return true;
			return (buildingLevels[item]>0);
		}
		return false;
	}
	
	
	
	for each(var item in TOP_MENU_ITEMS){
		if ($.isArray(item)){
			// sub menu
			var elemLI = document.createElement('li');
			elemLI.setAttribute('class','toolbar_toggle_menu');
			if (SHOW_IMAGES) {
				numberOfMenuCharacters += 2;
				var elemIMG = document.createElement('img');
				if (icons[item[0]]) elemIMG.setAttribute('src',icons[item[0]]);
				else elemIMG.setAttribute('src',icons.other);
				elemIMG.setAttribute('height','16');
				elemIMG.setAttribute('style','border-right:solid transparent 4px');
				elemLI.appendChild(elemIMG);
			}
			var elemA = document.createElement('a');
			elemA.href = '#';
			var txt = item[0];
			if(translate[lang][item[0]])txt = translate[lang][item[0]];
			numberOfMenuCharacters += 1 + txt.length;
			elemA.appendChild(document.createTextNode(txt));
			elemLI.appendChild(elemA);
			
			var elemDIV = document.createElement('div');
			elemDIV.setAttribute('style','display:none;');
			elemDIV.setAttribute('class','submenu');
			
			var elemUL2 = document.createElement('ul');
			for each(var subitem in item){
				if(subitem != item[0])
				{
					var elemLI2 = document.createElement('li');
					var txt2 = translate[lang][subitem];
					if (SHOW_BUILD_LEVELS) if (buildingLevels[subitem]) {			
						txt2 += ' [' + buildingLevels[subitem] + ']';
					}
					var elemA2 = document.createElement('a');
					elemA2.href = menuUrls[subitem]
						.replace('{town}',town)
						.replace('{token}',csrfToken)
						.replace('{player}',player)
						.replace('{lang}',lang);
					elemA2.appendChild(document.createTextNode(txt2));
					elemLI2.appendChild(elemA2);
					var elemSPAN = document.createElement('span')
					elemSPAN.setAttribute('class','right')
					elemLI2.appendChild(elemSPAN);
					elemUL2.appendChild(elemLI2);
				}
			}
			var elemLI3 = document.createElement('li');
			elemLI3.setAttribute('class','submenu_bottom');
			var elemSPAN2 = document.createElement('span')
			elemSPAN2.setAttribute('class','right')
			elemLI3.appendChild(elemSPAN2);
			elemUL2.appendChild(elemLI3);
			elemDIV.appendChild(elemUL2);
			elemLI.appendChild(elemDIV);
			elemUL.appendChild(elemLI);
			
		}
		else if (shouldShowItem(item)){
			var elemLI = document.createElement('li');
			elemLI.setAttribute('style','font-size:100%;text-align:center;');
			
			if (SHOW_IMAGES) if (icons[item]) {
				numberOfMenuCharacters += 2;
				var elemIMG = document.createElement('img');
				elemIMG.setAttribute('src',icons[item]);
				elemIMG.setAttribute('height','16');
				elemIMG.setAttribute('style','border-right:solid transparent 4px');
				elemLI.appendChild(elemIMG);
			}
	
			var txt = translate[lang][item];
			if (SHOW_BUILD_LEVELS) if (buildingLevels[item]) {			
				txt += ' [' + buildingLevels[item] + ']';
			}
			numberOfMenuCharacters += 1 + txt.length;
			var elemA = document.createElement('a');
			elemA.href = menuUrls[item]
				.replace('{town}',town)
				.replace('{token}',csrfToken)
				.replace('{lang}',lang);
			elemA.appendChild(document.createTextNode(txt));
			elemLI.appendChild(elemA);
			elemUL.appendChild(elemLI);
		}
	}
	
	// add hover events
	$(".toolbar_toggle_menu").hover(
		function(){
			$(this).children('div').show();
			$(this).setAttribute('style','z-index:9999');
			$(this).children('div').setAttribute('style','z-index:9999');
		},
		function(){
			$(this).children('div').hide();
		}
	);

	
	
	// auto-size: make text smaller if the menu items have too many characters
	if(numberOfMenuCharacters > 35) {
		menu.style.fontSize = '90%';
	}
	if(numberOfMenuCharacters > 45) {
		menu.style.fontSize = '70%';
	}	
	
	// Add items to the main menu on the left
	for each (var item in LEFT_MENU_ITEMS){
		if (shouldShowItem(item)) {
			var txt = translate[lang][item];
			var elemA = document.createElement("a");
			elemA.href =  menuUrls[item].replace('{town}',town).replace('{token}',csrfToken);
			elemA.appendChild(document.createTextNode(txt));
			document.getElementById("link_index").appendChild(elemA);
		}
	}
	// Add items to the Cities in Townoverlay
	if(location.href.match('game/index')) {
	for each (var item in UNITS_MENU_ITEMS){
		if (shouldShowItem(item)) {
			var txt = translate[lang][item];
			var elemA = document.createElement("a");
			elemA.href =  menuUrls[item].replace('{town}',town).replace('{player}',player).replace('{token}',csrfToken).replace('{lang}',lang);
			elemA.appendChild(document.createTextNode(txt));
			document.getElementById("unit_overview_tabs").appendChild(elemA);
		}
	}
}
	
	//Grepostats
	if (USE_GREPO_STATS) if(location.href.match('game/index')) {
		var world=uW.location.href.substring(7,uW.location.href.indexOf('.')); 
		var gs_gs_player='http://www.grepostats.com/world/'+world+'/player/'+player;
		var gs_gs_ally='http://www.grepostats.com/world/'+world+'/alliance/'+ally;
		$('#menu').append('<div id="gs_gs_container" style="text-align:center;background: url(http://www.sdm-scholz.de/grepolis/main.jpg);position:absolute;top:0px;width:150px;margin-left:1000px;opacity:0.7;"></div>');
		$('#gs_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png);"></div>');
		$('#gs_gs_container').append('<div class="game_border_top" style="float:left;height:10px;width:130px;"></div>');
		$('#gs_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -10px;"></div>');
		$('#gs_gs_container').append('<div class="game_border_left" style="float:left;width:10px;height:70px;"></div>');
		$('#gs_gs_container').append('<div id="gs_gs" style="float:left;width:130px;height:70px;font-size:10px;"></div>');
		$('#gs_gs_container').append('<div class="game_border_right" style="float:left;width:10px;height:70px;"></div>');
		$('#gs_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -30px;"></div>');
		$('#gs_gs_container').append('<div class="game_border_bottom" style="float:left;height:10px;width:130px;"></div>');
		$('#gs_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -20px;"></div>');
		$('#gs_gs').append('<span style="font-size:12px;text-decoration:overline underline;"><img src="http://www.grepostats.com/img/favicon.ico" width="12" height="12"> '+translate[lang].stats+'</span>');
		$('#gs_gs').append('<div style="text-align:middle;"><hr /><a href="http://www.grepostats.com/" alt="Grepostarts.com" target="_blank" >Grepostats</a><hr /> <a href="'+gs_gs_player+'" target="_blank">'+translate[lang].you+'</a>, <a href="'+gs_gs_ally+'" target="_blank">'+translate[lang].ally+'</a>,</div>');
		$('#gs_gs').children('div').append(' <a href="http://www.grepolismaps.org/" target="_blank">'+translate[lang].map+'</a>');
		$('#gs_gs a').css({'font-size':'12px'});
	}

	// Script info. TODO: move to better place.
	/*
	if(location.href.match('game/index')){
		var world=uW.location.href.substring(7,uW.location.href.indexOf('.')); 
		$('#menu').append('<div id="gs_gs_container2" style="text-align:center;background: url(http://www.sdm-scholz.de/grepolis/main.jpg);position:absolute;top:550px;width:150px;margin-left:10px;opacity:0.6;"></div>');
		$('#gs_gs_container2').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png);"></div>');
		$('#gs_gs_container2').append('<div class="game_border_top" style="float:left;height:10px;width:130px;"></div>');
		$('#gs_gs_container2').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -10px;"></div>');
		$('#gs_gs_container2').append('<div class="game_border_left" style="float:left;width:10px;height:70px;"></div>');
		$('#gs_gs_container2').append('<div id="gs_gs2" style="float:left;width:130px;height:70px;font-size:10px;"></div>');
		$('#gs_gs_container2').append('<div class="game_border_right" style="float:left;width:10px;height:70px;"></div>');
		$('#gs_gs_container2').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -30px;"></div>');
		$('#gs_gs_container2').append('<div class="game_border_bottom" style="float:left;height:10px;width:130px;"></div>');
		$('#gs_gs_container2').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -20px;"></div>');
		$('#gs_gs2').append('<span style="font-size:12px;text-decoration:overline underline;"><img src="http://userscripts.org/images/script_icon.png" width="12" height="12" >Version</span>');
		$('#gs_gs2').append('<div style="text-align:middle;"><hr /><a href="http://userscripts.org/scripts/show/62989" target="_blank" ><img src="http://www.sdm-scholz.de/templates/Landschaften/favicon.ico" width="12" height="12" > '+vers_ist+'</a><hr /></div>');
		$('#gs_gs2').append('<div style="text-align:middle;"><a href="http://userscripts.org/scripts/show/62989" target="_blank" ><img src="http://static.grepolis.com/images/game/units/slinger_40x40.png" width="12" height="12" > '+gs_langs+' '+translate[lang].speak+' </a><a  href="http://sdm-scholz.de" target="_blank" title="Doc Marco &amp; die PC-Helfer">!</a></div>');
		$('#gs_gs2 a').css({'font-size':'9px'});
	}
	*/

	//Scriptinfo in the senat
	if (USE_SCRIPT_INFO) if(location.href.match('game/building_main')){
		var world=uW.location.href.substring(7,uW.location.href.indexOf('.'));
		$('#menu').append('<div id="gs_gs_container2" style="text-align:center;width:150px;background: url(http://www.sdm-scholz.de/grepolis/main.jpg);position:absolute;top:465px;width:150px;margin-left:817px;opacity:0.9;"></div>');
		$('#gs_gs_container2').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png);"></div>');
		$('#gs_gs_container2').append('<div class="game_border_top" style="float:left;height:10px;width:130px;"></div>');
		$('#gs_gs_container2').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -10px;"></div>');
		$('#gs_gs_container2').append('<div class="game_border_left" style="float:left;width:10px;height:70px;"></div>');
		$('#gs_gs_container2').append('<div id="gs_gs2" style="float:left;width:130px;height:70px;font-size:10px;"></div>');
		$('#gs_gs_container2').append('<div class="game_border_right" style="float:left;width:10px;height:70px;"></div>');
		$('#gs_gs_container2').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -30px;"></div>');
		$('#gs_gs_container2').append('<div class="game_border_bottom" style="float:left;height:10px;width:130px;"></div>');
		$('#gs_gs_container2').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -20px;"></div>');
		$('#gs_gs2').append('<span style="font-size:12px;text-decoration:overline underline;"><img src="http://userscripts.org/images/script_icon.png" width="12" height="12" >Version</span>');
		$('#gs_gs2').append('<div style="text-align:middle;"><hr /><a href="http://userscripts.org/scripts/show/62989" target="_blank" ><img src="http://www.sdm-scholz.de/templates/Landschaften/favicon.ico" width="12" height="12" > '+vers_ist+'</a><hr /></div>');
		$('#gs_gs2').append('<div style="text-align:middle;"><a href="http://userscripts.org/scripts/show/62989" target="_blank" ><img src="http://static.grepolis.com/images/game/toolbar/alliance.png" width="15" height="15" > '+gs_langs+' '+translate[lang].speak+' </a><a  href="http://sdm-scholz.de" target="_blank" title="Doc Marco &amp; die PC-Helfer">!</a></div>');
		$('#gs_gs2 a').css({'font-size':'9px'});
	}


//Set Playerpoints on Map
(function () {
	//access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}


	//Object.create() by Douglas Crockford
	if(typeof Object.create !== 'function'){
		Object.create = function (o) {
			var F = function () {};
			F.prototype = o;
			return new F();
		};
	} 

	var GrepoStat = (function () {
		var TownInfo;
		var init_old;
		var PlayerID = 0;

		var init_new = function () {
			var o=init_old.apply(TownInfo, arguments);
			AppendStatTab();
			return o;
		};

		var AppendStatTab = function () {
      var Tabs = $("#town_info_tabs");
      if (TownInfo.type==='town_info' ){
            $('#info_tab_window_bg').tabs("add", "#town_stats", "<img src='http://www.sdm-scholz.de/grepolis/stats.png' style='position: relative; top: 4px; left: 4px;' />");
            $('#info_tab_window_bg').bind("tabsload", TabLoad);
            $('#info_tab_window_bg').bind("tabsselect", TabSelect);
      }
		};

		var TabLoad = function (event, ui) {
			if (ui.index == 0) {
				var href = $("#towninfo_towninfo .list_item_left a").attr("href");
				PlayerID = getUrlVars(href)["player_id"];
			}
		};
		var TabSelect = function (event, ui) {
			if (ui.index == 6) {
				var world = window.location.host.split('.')[0];
				var stats="<p id='Stats' style='height:285px;width:460px;margin:5px 10px;overflow:auto;'>";
				stats+=""+translate[lang].points+":<br /><img src='http://"+translate[lang].server+".grepostats.com/image/"+world+"/graph?action=player&type=points&player_id="+PlayerID+"' />";
				stats+="<br />"+translate[lang].rank+":<br /><img src='http://"+translate[lang].server+".grepostats.com/image/"+world+"/graph?action=player&type=rank&player_id="+PlayerID+"' />";
				stats+="</p>";
				$(ui.panel).after(stats);
			}
			else
			{
				$("#Stats").remove();
			}
		};

		return function () {
			if (document.URL.indexOf("game/map") != -2)
                        if (document.URL.indexOf("game/player") != -2)
			{
				TownInfo = uW.TownInfo;
				init_old = TownInfo.init;
				TownInfo.init = init_new;
			}
		};
	}());

	GrepoStat();
}());

function getUrlVars(path) {
	var vars = {};
	var parts = path.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}



//Notepad integrieren //TODO Notepad
		var BASE_Z_INDEX = 100000;
		var STYLE_VERSION = 1;

		var STATE_DISPLAY = 0;
		var STATE_EDIT    = 1;
		var STATE_MOVE    = 2;
		var STATE_RESIZE  = 3;
		var MIN_SIZE      = 15;

		var DEFAULT_STYLESHEET =
		"/* "+translate[lang].edit+" */\n\
		.at-ac-tuwien-student-e0427417-sticky-note {\n\
		  border-style:     solid groove;\n\
		  background: url(/images/game/buildings/main.jpg);\n\
		  padding:          10px;\n\
		  border-width:      6px;\n\
		  border-color:     #663300;\n\
		  cursor:           auto;\n\
		}\n\
		\n\
		/* "+translate[lang].topbar+" */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-top {\n\
		  text-align:       right;\n\
		  background-color: inherit;\n\
		  margin-top:       -4px;\n\
		}\n\
		\n\
		/* "+translate[lang].close+" */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-top a {\n\
		  font-family:     DejaVu Sans, sans-serif;\n\
		  text-decoration: none;\n\
		  font-weight:     bold;\n\
		  color:           #ccaa22;\n\
		  font-size:       13pt;\n\
		  cursor:          pointer;\n\
		}\n\
		\n\
		/* "+translate[lang].close+" when hovered */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-top a:hover {\n\
		  color: #333333;\n\
		}\n\
		\n\
		/* text when displayed / editing */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-display-text,\n\
		.at-ac-tuwien-student-e0427417-sticky-note-edit-text {\n\
		  font-family:      sans-serif;\n\
		  font-size:        10pt;\n\
		  background-color: inherit;\n\
		  color:            #333333;\n\
		  text-align:       left;\n\
		}\n\
		\n\
		/* Note when editing */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-edit-mode {\n\
		  opacity: 1;\n\
		}\n\
		\n\
		/* Note when displayed / moving / resizing */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-display-mode,\n\
		.at-ac-tuwien-student-e0427417-sticky-note-move-mode,\n\
		.at-ac-tuwien-student-e0427417-sticky-note-resize-mode {\n\
		  opacity: 0.85;\n\
		}\n\
		\n\
		/* Note when moving */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-move-mode {\n\
		  cursor: move;\n\
		}\n\
		\n\
		/* resize grabber */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-resize-grabber {\n\
		  position: absolute;\n\
		  right:    -2px;\n\
		  bottom:   -2px;\n\
		  width:    16px;\n\
		  height:   16px;\n\
		  cursor:   se-resize;\n\
		}\n\
		\n\
		/* blanket */\n\
		#at-ac-tuwien-student-e0427417-sticky-note-blanket {\n\
		  background-color: #111111;\n\
		  opacity:          0.65;\n\
		}\n\
		\n\
		/* overlay */\n\
		#at-ac-tuwien-student-e0427417-sticky-note-overlay {\n\
		  text-align:       left;\n\
		  padding:          15px;\n\
		  color:            #ffffff;\n\
		  background: url(/images/game/buildings/main.jpg);\n\
		  border:           5px groove #663300;\n\
		  width:            600px;\n\
		  height:           400px;\n\
		}\n\
		\n\
		.at-ac-tuwien-student-e0427417-sticky-note-overlay-buttons {\n\
		  text-align: right;\n\
		}\n\
		\n\
		.at-ac-tuwien-student-e0427417-sticky-note-overlay-buttons input {\n\
		  margin:  2px;\n\
		  padding: 2px;\n\
		  height: 24px;\n\
		}\n\
		\n\
		/* management interface */\n\
		#at-ac-tuwien-student-e0427417-sticky-note-manage {\n\
		  overflow:      auto;\n\
		  font-size:     12pt;\n\
		  padding-right: 10px;\n\
		}\n\
		\n\
		#at-ac-tuwien-student-e0427417-sticky-note-manage ul {\n\
		  padding:    0px 0px 0px 30px;\n\
		  margin:     0px;\n\
		  list-style: square outside;\n\
		}\n\url(/images/game/buildings/main.jpg);\n\
		\n\
		#at-ac-tuwien-student-e0427417-sticky-note-manage li ul {\n\
		  list-style: disc outside;\n\
		}\n\
		\n\
		/* delete icon in management interface */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-delete {\n\
		  float:       right;\n\
		  font-weight: bold;\n\
		}\n\
		\n\
		/* site row in management interface */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-site:hover {\n\
		  background-color: #D0D0D0;\n\
		}\n\
		\n\
		/* note row in management interface */\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-note:hover {\n\
		  background-color: #D0D0D0;\n\
		}\n\
		\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-site,\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-note {\n\
		  cursor: pointer;\n\
		}\n\
		\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-site a,\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-note a {\n\
		  color:  #000000;\n\
		  cursor: pointer;\n\
		}\n\
		\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-site a:hover,\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-note a:hover {\n\
		  color: #FF0000;\n\
		}\n\
		\n\
		.at-ac-tuwien-student-e0427417-sticky-note-manage-link {\n\
		  float: right;\n\
		}";

		function StickyNote(x,y,width,height,text) {
			var stickyNote = this;

			stickyNote._moveX = 0;
			stickyNote._moveY = 0;
			stickyNote._state = STATE_DISPLAY;

			stickyNote.container = document.createElement("div");
			stickyNote.container.style.position = "absolute";
			stickyNote._width  = width  == undefined || width  < MIN_SIZE ? 150 : width;
			stickyNote._height = height == undefined || height < MIN_SIZE ? 150 : height;
			stickyNote._x = x == undefined ? ((window.innerWidth - stickyNote._width) / 2 + window.pageXOffset) : x;
			stickyNote._y = y == undefined ? ((window.innerHeight - stickyNote._height) / 2 + window.pageYOffset) : y;
			stickyNote.container.style.left = stickyNote._x + "px";
			stickyNote.container.style.top  = stickyNote._y + "px";

			stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-display-mode at-ac-tuwien-student-e0427417-sticky-note";

			stickyNote.container.style.width=stickyNote._width + "px";

			// hopefully high enough z-index:
			stickyNote.container.style.zIndex=BASE_Z_INDEX;

			var div = document.createElement("div");
			div.className = "at-ac-tuwien-student-e0427417-sticky-note-top";
			div.style.MozUserSelect = "none";

			var a = document.createElement("a");

			stickyNote.remove = function() {
				stickyNote.container.parentNode.removeChild(stickyNote.container);
			};

			a.addEventListener("click", function() {
				stickyNote.remove();
				removeStickyNote(stickyNote);
			}, true);

			a.title = ''+translate[lang].remove+'';
			a.appendChild(document.createTextNode("\xD7"));
			div.appendChild(a);
			stickyNote.container.appendChild(div);

			var resizeGrabber = document.createElement("div");
			resizeGrabber.className = "at-ac-tuwien-student-e0427417-sticky-note-resize-grabber";
			resizeGrabber.style.MozUserSelect="none";
			stickyNote.container.appendChild(resizeGrabber);

			stickyNote.displayText = document.createElement("div");
			stickyNote.displayText.className = "at-ac-tuwien-student-e0427417-sticky-note-display-text";
			stickyNote.editText    = document.createElement("textarea");
			stickyNote.editText.className = "at-ac-tuwien-student-e0427417-sticky-note-edit-text";

			stickyNote.displayText.style.width  = stickyNote.editText.style.width  = "100%";
			stickyNote.displayText.style.height = stickyNote.editText.style.height = stickyNote._height + "px";
			stickyNote.displayText.style.overflow  = "auto";
			stickyNote.displayText.style.MozUserSelect = "none";
			stickyNote.editText.style.display = "none";
			stickyNote.editText.style.border  = "none";
			stickyNote.editText.style.margin  = "0px";
			stickyNote.editText.style.padding = "0px";
			stickyNote.displayText.title = ''+translate[lang].two+'';

			stickyNote.container.appendChild(stickyNote.displayText);
			stickyNote.container.appendChild(stickyNote.editText);

			stickyNote.setText = function(text) {
				stickyNote.displayText.innerHTML = text.replace(/\n/g,"<br/>");
				stickyNote.editText.value        = text;
			};

			stickyNote.getText = function() {
				return stickyNote.editText.value;
			};

			var body = document.getElementsByTagName("body")[0];

			resizeGrabber.addEventListener("mousedown", function(e) {
				if (e.button == 0 && stickyNote._state != STATE_EDIT) {
					stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-resize-mode at-ac-tuwien-student-e0427417-sticky-note";
					body.style.MozUserSelect="none";
					stickyNote._state = STATE_RESIZE;
					stickyNote._moveX = e.pageX;
					stickyNote._moveY = e.pageY;
					return false;
				}
				return true;
			}, true);

			stickyNote.container.addEventListener("mousedown", function(e) {
				moveToTop(stickyNote);
				if (e.button == 0 && stickyNote._state == STATE_DISPLAY) {
					stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-move-mode at-ac-tuwien-student-e0427417-sticky-note";
					body.style.MozUserSelect="none";
					stickyNote._state = STATE_MOVE;
					stickyNote._moveX = e.pageX;
					stickyNote._moveY = e.pageY;
					return false;
				}
				return true;
			}, true);
	
			window.addEventListener("mouseup", function(e) {
				if (e.button == 0 && (stickyNote._state == STATE_MOVE || stickyNote._state == STATE_RESIZE)) {
					stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-display-mode at-ac-tuwien-student-e0427417-sticky-note";
					body.style.MozUserSelect="text";
					stickyNote._state = STATE_DISPLAY;
					saveStickyNotes();
				}
			}, true);
	
			window.addEventListener("mousemove", function(e) {
				switch (stickyNote._state) {
				case STATE_MOVE:
					stickyNote._x += e.pageX - stickyNote._moveX;
					stickyNote._y += e.pageY - stickyNote._moveY;

					stickyNote.container.style.left = stickyNote._x + "px";
					stickyNote.container.style.top  = stickyNote._y + "px";
			
					stickyNote._moveX = e.pageX;
					stickyNote._moveY = e.pageY;
					return false;
				case STATE_RESIZE:
					var newWidth  = stickyNote._width  + e.pageX - stickyNote._moveX;
					var newHeight = stickyNote._height + e.pageY - stickyNote._moveY;

					if (newWidth >= MIN_SIZE) {
						stickyNote._width = newWidth;
						stickyNote._moveX = e.pageX;
						stickyNote.container.style.width = stickyNote._width + "px";
					}

					if (newHeight >= MIN_SIZE) {
						stickyNote._height = newHeight;
						stickyNote._moveY  = e.pageY;
						stickyNote.editText.style.height = stickyNote.displayText.style.height = stickyNote._height + "px";
					}


					return false;
				}
				return true;
			}, true);

			stickyNote.container.addEventListener("dblclick", function() {	
				stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-edit-mode at-ac-tuwien-student-e0427417-sticky-note";
				stickyNote.displayText.style.display="none";
				stickyNote.editText.style.display="block";
				stickyNote._state = STATE_EDIT;
				stickyNote.editText.focus();
			}, true);
	


			function endEdit() {
				stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-display-mode at-ac-tuwien-student-e0427417-sticky-note";
				stickyNote.displayText.style.display="block";
				stickyNote.editText.style.display="none";
				stickyNote._state = STATE_DISPLAY;
				stickyNote.displayText.innerHTML = stickyNote.editText.value.replace(/\n/g,"<br/>");
				saveStickyNotes();
			};
	
			stickyNote.editText.addEventListener("keyup", function(e) {
				if (e.which == 27) {
					endEdit();
				}
			}, true);

			stickyNote.editText.addEventListener("blur", endEdit, true);

			stickyNote.getX = function() {
				return stickyNote._x;
			}

			stickyNote.getY = function() {
				return stickyNote._y;
			}

			stickyNote.getWidth = function() {
				return stickyNote._width;
			}

			stickyNote.getHeight = function() {
				return stickyNote._height;
			}

			stickyNote.setX = function(x) {
				stickyNote._x = x;
				stickyNote.container.style.left = x + "px";
			}

			stickyNote.setY = function(y) {
				stickyNote._y = y;
				stickyNote.container.style.top = y + "px";
			}


			stickyNote.setWidth = function(width) {
				stickyNote.container.style.width = width + "px";
				stickyNote._width = width;
			}

			stickyNote.setHeight = function(height) {
				stickyNote.editText.style.height = stickyNote.displayText.style.height = height + "px";
				stickyNote._height = height;
			}

			if (text != undefined) {
				stickyNote.setText(text);
			}

			body.appendChild(stickyNote.container);
		}

		var stickyNotes = [];
		var siteId = location.href.split('#')[0];

		function listSites() {
			return [name for each (name in GM_listValues()) if (name != "stylesheet")];
		}

		function listStickyNotes(site) {
			var s = GM_getValue(site);
			var notesList = [];

			if (s != undefined) {
				var notes = s.split(" ");

				for (var i = 0; i < notes.length; ++ i) {
					var note = notes[i];

					if (note.length > 0) {
						var data = note.split(":");
						var x = parseInt(data[0]);
						var y = parseInt(data[1]);
						var width;
						var height;
						var text;
				
						if (data.length == 5) {
							width  = parseInt(data[2]);
							height = parseInt(data[3]);
							text   = unescape(data[4]);
						}
						else {
							width  = undefined;
							height = undefined;
							text   = unescape(data[2]);
						}

						notesList.push([x,y,width,height,text]);
					}
				}
			}

			return notesList;
		}

		function reloadStickyNotes() {
			for each (note in stickyNotes) {
				note.remove();
			}
			stickyNotes = [];
			loadStickyNotes();
		}

		function loadStickyNotes() {
			for each ([x,y,width,height,text] in listStickyNotes(siteId)) {
				stickyNotes.push(new StickyNote(x,y,width,height,text));
			}
		}

		function saveStickyNotesFor(site,notes) {
			if (notes.length == 0) {
				GM_deleteValue(site);
			}
			else {
				GM_setValue(site, [(x+':'+y+':'+w+':'+h+':'+escape(text))
					for each ([x,y,w,h,text] in notes)].join(' '));
			}
		}

		function saveStickyNotes() {
			saveStickyNotesFor(siteId, [[
				note.getX(), note.getY(),
				note.getWidth(), note.getHeight(),
				note.getText()] for each (note in stickyNotes)]);
		}

		function removeStickyNote(stickyNote) {
			stickyNotes = [note for each (note in stickyNotes) if (note != stickyNote)];
			saveStickyNotes();
		}

		function moveToTop(stickyNote) {
			stickyNotes = [note for each (note in stickyNotes) if (note != stickyNote)];
			stickyNotes.push(stickyNote);

			var zIndex = BASE_Z_INDEX;
			for each (note in stickyNotes) {
				note.container.style.zIndex = zIndex;
				++ zIndex;
			}
		}

		function showOverlay(element, buttons) {
			if (buttons == undefined) {
				buttons = [];
			}

			buttons.push(createButton(''+translate[lang].closeb+'', hideOverlay));

			var buttonDiv = document.createElement('div');
			buttonDiv.className = 'at-ac-tuwien-student-e0427417-sticky-note-overlay-buttons';

			for (var i = 0; i < buttons.length; ++ i) {
				var button = buttons[i];
				buttonDiv.appendChild(button);
			}

			var overlay = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-overlay");
			var blanket = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-blanket");

			if (blanket == null) {
				blanket = document.createElement("div");
				blanket.id = "at-ac-tuwien-student-e0427417-sticky-note-blanket";
				blanket.style.position = 'absolute';
				blanket.style.left = '0px';
				blanket.style.top = '0px';
				var height = document.body.parentNode.scrollHeight;
				if (window.innerHeight > height) {
					height = window.innerHeight;
				}
				blanket.style.width = '100%';
				blanket.style.height = height + 'px';
				blanket.style.zIndex = '100101';
				document.body.appendChild(blanket);
			}
			else {
				blanket.style.display = 'block';
			}

			if (overlay == null) {
				var overlay = document.createElement("div");
				overlay.id = "at-ac-tuwien-student-e0427417-sticky-note-overlay";
				overlay.style.position = 'fixed';
				overlay.style.margin = 'auto';
				overlay.style.zIndex = '100102';
				document.body.appendChild(overlay);
			}
			else {
				overlay.innerHTML = '';
				overlay.style.display = 'block';
			}
	
			overlay.appendChild(element);
			overlay.appendChild(buttonDiv);

			var compStyle = getComputedStyle(overlay,'');
			var overlayWidth = px(compStyle.width) || overlay.offsetWidth;
			var overlayHeight = px(compStyle.height) || overlay.offsetHeight;

			overlay.style.left = ((window.innerWidth - overlayWidth) / 2) + 'px';
			overlay.style.top  = ((window.innerHeight - overlayHeight) / 2) + 'px';

			compStyle = getComputedStyle(buttonDiv,'');
			var buttonsHeigth = compStyle.height;
			var contentWidth = overlayWidth;
			var contentHeight = (overlayHeight -
				(px(compStyle.height) || buttonDiv.offsetHeight) -
				px(compStyle.marginTop) -
				px(compStyle.marginBottom) -
				px(compStyle.paddingTop) -
				px(compStyle.paddingBottom) -
				px(compStyle.borderTopWidth) -
				px(compStyle.borderBottomWidth));

			compStyle = getComputedStyle(element,'');
			var elementWidth = (contentWidth -
				px(compStyle.marginLeft) -
				px(compStyle.marginRight) -
				px(compStyle.paddingLeft) -
				px(compStyle.paddingRight) -
				px(compStyle.borderLeftWidth) -
				px(compStyle.borderRightWidth));
			var elementHeight = (contentHeight -
				px(compStyle.marginTop) -
				px(compStyle.marginBottom) -
				px(compStyle.paddingTop) -
				px(compStyle.paddingBottom) -
				px(compStyle.borderTopWidth) -
				px(compStyle.borderBottomWidth));

			element.style.width  = elementWidth + 'px';
			element.style.height = elementHeight + 'px';
		}

		function px(x) {
			return parseFloat(x.split('px')[0]);
		}

		function hideOverlay() {
			var overlay = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-overlay");
			var blanket = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-blanket");

			if (overlay != null) {
				overlay.style.display = 'none';
			}

			if (blanket != null) {
				blanket.style.display = 'none';
			}
		}

		function createButton(label,callback) {
			var btn = document.createElement('input');
			btn.type = 'button';
			btn.value = label;
			btn.addEventListener('click', callback, true);
			return btn;
		}

		function createTextarea(text) {
			var textarea = document.createElement("textarea");
			if (text != undefined) {
				textarea.value = text;
			}
			return textarea;
		}

		function deleteNote(list, li) {
			return function () {
				var origNotes = list.stickyNotes;
				var delIndex = li.stickyNoteIndex;
				var notes = [];

				for (var i = 0; i < origNotes.length; ++ i) {
					if (i != delIndex) {
						notes.push(origNotes[i]);
					}
				}

				var sibling = li.nextSibling;

				while (sibling != null) {
					if (sibling.stickyNoteIndex != undefined) {
						-- stickyNoteIndex.stickyNoteIndex;
					}
					sibling = sibling.nextSibling;
				}

				list.stickyNotes = notes;
				list.removeChild(li);
				saveStickyNotesFor(list.stickyNoteSite, notes);

				if (siteId == list.stickyNoteSite) {
					reloadStickyNotes();
				}
			};
		}

		function expandNote(div) {
			return function () {
				if (div.style.display == 'none') {
					div.style.display = 'block';
				}
				else {
					div.style.display = 'none';
				}
			};
		}

		function expandSite(site, list) {
			return function () {
				if (list.style.display == 'none') {
					var notes = listStickyNotes(site);
					for (var index = 0; index < notes.length; ++ index) {
						var [x, y, w, h, text] = notes[index];
						var li = document.createElement('li');
						var titleDiv = document.createElement('div');
						var titleA = document.createElement('a');
						var delA = document.createElement('a');
						var noteDiv = document.createElement('div');
				
						li.stickyNoteIndex = index;

						titleDiv.className = 'at-ac-tuwien-student-e0427417-sticky-note-manage-note';
						titleA.appendChild(document.createTextNode('x: ' + x + ', y: ' + y));

						delA.style.MozUserSelect = 'none';
				
						delA.className = 'at-ac-tuwien-student-e0427417-sticky-note-manage-delete';
						delA.appendChild(document.createTextNode("\xD7"));
						noteDiv.style.display = 'none';
						noteDiv.innerHTML = text;

						titleDiv.addEventListener('click', expandNote(noteDiv), true);
						delA.addEventListener('click', deleteNote(list, li), true);

						titleDiv.appendChild(titleA);
						titleDiv.appendChild(delA);
						li.appendChild(titleDiv);
						li.appendChild(noteDiv);
						list.appendChild(li);
					}

					list.stickyNotes = notes;
					list.style.display = 'block';
				}
				else {
					list.innerHTML = '';
					list.style.display = 'none';
				}
			};
		}

		function manageStickyNotes() {
			var div = document.createElement('div');
			var list = document.createElement('ul');
			var sites = listSites();
			sites.sort();
			div.id = 'at-ac-tuwien-student-e0427417-sticky-note-manage';

			for each (site in sites) {
				var li = document.createElement('li');
				var siteDiv = document.createElement('div');
				var titleA = document.createElement('a');
				var gotoA = document.createElement('a');
				var siteList = document.createElement('ul');

				siteDiv.className = 'at-ac-tuwien-student-e0427417-sticky-note-manage-site';
				siteList.stickyNoteSite = site;

				titleA.appendChild(document.createTextNode(site));
				siteList.style.display = 'none';

				siteDiv.addEventListener('click', expandSite(site, siteList), true);

				gotoA.className = 'at-ac-tuwien-student-e0427417-sticky-note-manage-link';
				gotoA.href = site;
				gotoA.appendChild(document.createTextNode('[link]'));

				siteDiv.appendChild(titleA);
				siteDiv.appendChild(document.createTextNode(' '));
				siteDiv.appendChild(gotoA);
				li.appendChild(siteDiv);
				li.appendChild(siteList);
				list.appendChild(li);
			}

			div.appendChild(list);
			showOverlay(div);
		}

		function exportStickyNotes() {
			var text = [
				(name + '\n' + GM_getValue(name))
				for each (name in GM_listValues())
				if (name != "stylesheet")].join('\n');
			showOverlay(createTextarea(text));
		}

		function importStickyNotes() {
			var textarea = createTextarea();
			var importButton = createButton(''+translate[lang].imp+'', function() {
				var notes = textarea.value.split("\n");

				for (var i = 0; i < notes.length; i += 2) {
					var href = notes[i];

					while (href.length == 0 && (++i) < notes.length) {
						href = notes[i];
					}

					if (href.length == 0) {
						break;
					}

					var siteNotes = GM_getValue(href);

					if ((i+1) >= notes.length || notes[i+1].length == 0) {
						break;
					}

					var newNotes = notes[i+1];
			
					if (siteNotes != undefined) {
						var s = siteNotes;
						var siteNotes = siteNotes.split(" ");
						var newNotes  = newNotes.split(" ");
				
						for (var inn = 0; inn < newNotes.length; ++ inn) {
							var newNote = newNotes[inn];
							var exists = false;
							for (var isn = 0; isn < siteNotes.length; ++ isn) {
								if (newNote == siteNotes[isn]) {
									exists = true;
									break;
								}
							}

							if (!exists && newNote.length > 0) {
								s += newNote + " ";
							}
						}
						GM_setValue(href,s);

					}
					else {
						GM_setValue(href,newNotes);
					}
				}

				for (var i = 0; i < stickyNotes.length; ++ i) {
					stickyNotes[i].remove();
				}
				stickyNotes = [];
				loadStickyNotes();
				hideOverlay();
			});
			showOverlay(textarea, [importButton]);
		}

		function saveStylesheet(style) {
			GM_setValue("stylesheet", '/*vers' + STYLE_VERSION + '*/\n' + style);
		}

		function loadStylesheet() {
			var style = GM_getValue("stylesheet");

			if (style == undefined) {
				style = DEFAULT_STYLESHEET;
			}
			else {
				// reset style if its to old
				var match = /\/\*vers(\d+)\*\/\n/.exec(style);
				var vers = 0;

				if (match == null) {
					GM_deleteValue("stylesheet");
					style = DEFAULT_STYLESHEET;
				}
				else {
					vers = parseInt(match[1]);

					if (vers < STYLE_VERSION) {
						GM_deleteValue("stylesheet");
						style = DEFAULT_STYLESHEET;
					}
					else {
						style = style.substring(match[0].length);
					}
				}
			}

			setStylesheet(style);
		}

		function setStylesheet(style) {
			var styleElem = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-style");

			if (styleElem == undefined) {
				styleElem = document.createElement("style");
				styleElem.id = "at-ac-tuwien-student-e0427417-sticky-note-style";
				styleElem.type = "text/css";
				var head = document.getElementsByTagName("head")[0];
				head.appendChild(styleElem);
			}
			else {
				styleElem.innerHTML = '';
			}

			styleElem.appendChild(document.createTextNode(style));
		}

		function getStylesheet() {
			var styleElem = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-style");

			if (styleElem == undefined) {
				return DEFAULT_STYLESHEET;
			}
			else {
				return styleElem.innerHTML;
			}
		}

		function editStylesheet() {
			var textarea = createTextarea(getStylesheet());
			var resetButton = createButton("Reset", function() {
				textarea.value = DEFAULT_STYLESHEET;
			});
			var saveButton = createButton(''+translate[lang].save+'', function() {
				saveStylesheet(textarea.value);
				setStylesheet(textarea.value);
				hideOverlay();
			});
	
			textarea.style.fontFamily = 'monospace';
			textarea.addEventListener("keydown", function(e) {
				if (e.ctrlKey && e.which == 13) {
					saveStylesheet(textarea.value);
					setStylesheet(textarea.value);
					hideOverlay();
				}
			}, true);

			showOverlay(textarea, [resetButton, saveButton]);
		}

		function addStickyNote() {
			stickyNotes.push(new StickyNote());
		}

		unsafeWindow.addStickyNote = addStickyNote;

		// HACK: This should be done by greasemonkey..
		window.addEventListener('keydown', function(e) {
			if (e.altKey && e.which == 78) {
				addStickyNote();
			}
		}, true);

		GM_registerMenuCommand(''+translate[lang].pad+'', addStickyNote, "n", "alt", "N");
		GM_registerMenuCommand(''+translate[lang].manage+'', manageStickyNotes, undefined, undefined, "M");
		GM_registerMenuCommand(''+translate[lang].aus+'', exportStickyNotes, undefined, undefined, "E");
		GM_registerMenuCommand(''+translate[lang].imp+'', importStickyNotes, undefined, undefined, "I");
		GM_registerMenuCommand(''+translate[lang].edit+'', editStylesheet, undefined, undefined, "S");
		GM_registerMenuCommand('Buildinglevel', SHOW_BUILD_LEVELS, "b", "alt", "B");

		loadStylesheet();
		loadStickyNotes();
