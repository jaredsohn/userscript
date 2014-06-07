// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Opendia Testingground", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Planned functionality: (priority from 1 to 5 with 5 as most important)
//		- Rewrite Res Calc-code to use existing functions and arrays (1)
//		
// --------------------------------------------------------------------
// ==UserScript==
// @name  			Grepolis TotalMenuPT rev.2
// @namespace 		Opendia
// @description  	Funções extras para o Grepolis
// @include 		http://*.grepolis.*/*
// @exclude			http://forum.*.grepolis.*/*
// @require			http://userscripts.org/scripts/source/57756.user.js
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require			http://userscripts.org/scripts/source/62718.user.js
// @version 		0.5.3
// @history			0.5.3	A few minor bug-fixes that showed up after the last update
// @history			0.5.2	Added Ctrl+arrow to switch between cities, Updated GrepoFarmer to work with the new "Select all units"-feature, Updated Island-msg to not show above chat-window
// @history			0.5.1	Added French, thanks to randalph. 
// @history			0.5.0	First public release. Added English as both new and default language. Fixed a few small things as well.
// @history			0.4.4	A couple of bug-fixes
// @history			0.4.3	Removed a few functions and rewrote/redesigned a couple of others. Preparing for 0.5.0 which will be first public release. Report bugs to me if and when you find any.
// @history			0.4.2	Update to fix a few bugs that popped up with update 1.12 of Grepolis
// @history			0.4.1	Added new and removed obsolete functions, adjusted script for new GM-version and cleaned out some bugs.
// @history 		0.4.0	Added configuration options, added code from Grepolis Resources Calculator, changed cr formatting code, added a few new functions and removed a few bugs.
// @history 		0.3.10	Added code from GrepoFarmer, added a small array of new functions, changed the design of the quickmenu and cleaned out a few bugs.
// @history 		0.3.9	Added functionality for older versions of Firefox lacking native JSON support
// @history 		0.3.8	Bugfixes and minor changes.
// @history 		0.3.7	Modified the main-menu.
// @history 		0.3.6	Bugfix.
// @history			0.3.5	Added Script Updater.
// @history			0.3.4	Redesigned quickbar and Spy-formatter.
// @history			0.3.3	Added Island-PM functionality, to everyone/to alliance.
// @history			0.3.2	Bugfixes.
// ==/UserScript==

// novo conjunto de data XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

/**
* This script is licensed  under:
* GNU General Public License GPLv3
* To view a copy of this license, visit http://www.gnu.org/licenses/gpl.html
* Copyright Doc Marco & die PC-Helfer, 2009-2010
* Initial script Copyright Doc Marco & die PC-Helfer (C-2009)
* Tradução de: Artolas - http://ist.do.sapo.pt/
* Snipes copied from http://userscripts.org/scripts/show/71132 - Dreambraker
*Special thanks to Bart Kemps for refactoring the script and adding icons, drop down functionality and configurability
**/
	// Default Settings
	const SHOW_BUILD_LEVELS = true;
	const SHOW_IMAGES = true;
	const USE_GREPO_STATS = true; 
	const SHOW_BUILDINGS_NOT_PRESENT = false;

	const TOP_MENU_ITEMS = ['main','barracks','docks','academy',['other','market','temple','wall','hide','farm','place'],'edit_toolbar'];
	const LEFT_MENU_ITEMS = ['place'];



	// Access to window object cross-browser
	var uW;
	if(typeof unsafeWindow==='object'){uW=unsafeWindow;}else{uW=window;}

	// Get current site location
	var url = document.location.href;

	// Access jQuery
	var $=uW.jQuery;

	// Script info
	var grepo_shortcut_version='7.1.7';
	
	// Version string
	var vers_ist = "Grepolis Shortcut 7.1.7";

	// Basic player data
	var player = uW.Game.player_id;
	var town = uW.Game.townId;
	var ally = uW.Game.alliance_id;
	var csrfToken = uW.Game.csrfToken;

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
	// TODO: localized formatting
	var now = new Date();
	var day = now.getDate();
	var month = now.getMonth()+1;
	var year = now.getFullYear();
	var today = day + '-' + month + '-' + year;

	var translate = {
		de: {
			language_name:  "german/deutsch",
			main: 		"Senat",
			barracks: 	"Kaserne",
			academy: 	"Akademie",
			docks: 		"Hafen",
			market: 	"Markt",
			place: 		"Agora",
			temple: 	"Tempel",
			wall: 		"Mauer",
			hide:		"HÃƒÆ’Ã‚Â¶hle",
			farm:		"Bauernhof",
			stats:		"Deine Statistik",
			you:		"DU",
			ally:		"Allianz",
			map:		"Karte",
			pad:		"Notiz erstellen",
			manage:         "Notizen verwalten",
			aus:            "Notizen exportieren",
			imp:            "Notizen importieren",
			edit:           ".css ÃƒÆ’Ã‚Â¤ndern (Aussehen anpassen)",
			topbar:		"Topbar",
			close:		"Schliesen-Button",
			closeb:		"Schliesen",
			remove:		"Notiz lÃƒÆ’Ã‚Â¶schen",
			save:		"Speichern",
			two:		"doppel klicken um den Eintrag einfÃƒÆ’Ã‚Â¼gen/ÃƒÆ’Ã‚Â¤ndern",
			speak:		"Sprachen",
			worlds:         "Welten",
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			other:		"weitere",
			edit_toolbar:	" "
		},
		es: {
			language_name:  "spanish/espanol",
			main: 		"Senado",
			barracks: 	"Cuartel",
			academy: 	"Academia",
			docks: 		"Puerto",
			market: 	"Mercado",
			place: 		"ÃƒÆ’Ã‚Âgora",
			temple:		"Templo",
			wall: 		"Muralla",
			hide:		"Cueva",
			stats:		"Sus estadÃƒÆ’Ã‚Â­sticas",
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
			close:		"BotÃƒÆ’Ã‚Â³n cerrar",
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
			more:		"weitere",
			edit_toolbar:	" "
		},
		gr: {  
			language_name:  "ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¬/greek",
			main:           "ÃƒÅ½Ã‚Â£ÃƒÂÃ‚ÂÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â·ÃƒÂÃ¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ÃƒÂÃ¢â‚¬Å¡",    
			barracks:       "ÃƒÅ½Ã‚Â£ÃƒÂÃ¢â‚¬Å¾ÃƒÂÃ‚ÂÃƒÅ½Ã‚Â±ÃƒÂÃ¢â‚¬Å¾ÃƒÂÃ…Â½ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚ÂµÃƒÂÃ¢â‚¬Å¡",    
			academy:        "ÃƒÅ½Ã¢â‚¬ËœÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â±",    
			docks:          "ÃƒÅ½Ã¢â‚¬ÂºÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¹",    
			market:         "ÃƒÅ½ ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¶ÃƒÅ½Ã‚Â¬ÃƒÂÃ‚ÂÃƒÅ½Ã‚Â¹",    
			place:          "ÃƒÅ½Ã¢â‚¬ËœÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¿ÃƒÂÃ‚ÂÃƒÅ½Ã‚Â¬",    
			temple:         "ÃƒÅ½Ã‚ÂÃƒÅ½Ã‚Â±ÃƒÂÃ…â€™ÃƒÂÃ¢â‚¬Å¡",    
			wall:           "ÃƒÅ½Ã‚Â¤ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ÃƒÂÃ¢â‚¬Â¡ÃƒÅ½Ã‚Â¿ÃƒÂÃ¢â‚¬Å¡ ÃƒÂÃ¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÂÃ¢â‚¬Å¡ ÃƒÂÃ¢â€šÂ¬ÃƒÂÃ…â€™ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â·ÃƒÂÃ¢â‚¬Å¡",    
			hide:           "ÃƒÅ½Ã‚Â£ÃƒÂÃ¢â€šÂ¬ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¬",    
			stats:          "ÃƒÅ½Ã‚Â£ÃƒÅ½Ã‚Â¤ÃƒÅ½Ã¢â‚¬ËœÃƒÅ½Ã‚Â¤ÃƒÅ½Ã¢â€žÂ¢ÃƒÅ½Ã‚Â£ÃƒÅ½Ã‚Â¤ÃƒÅ½Ã¢â€žÂ¢ÃƒÅ½Ã…Â¡ÃƒÅ½Ã¢â‚¬Ëœ",    
			you:            "ÃƒÅ½Ã¢â‚¬Â¢ÃƒÂÃ†â€™ÃƒÂÃ‚Â",    
			ally:           "ÃƒÅ½Ã‚Â£ÃƒÂÃ¢â‚¬Â¦ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±ÃƒÂÃ¢â‚¬Â¡ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â± ÃƒÂÃ†â€™ÃƒÅ½Ã‚Â¿ÃƒÂÃ¢â‚¬Â¦",    
			map:            "ÃƒÅ½Ã‚Â§ÃƒÅ½Ã‚Â¬ÃƒÂÃ‚ÂÃƒÂÃ¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÂÃ¢â‚¬Å¡",    
			speak:          "ÃƒÅ½Ã¢â‚¬Å“ÃƒÅ½Ã‚Â»ÃƒÂÃ…Â½ÃƒÂÃ†â€™ÃƒÂÃ†â€™ÃƒÅ½Ã‚ÂµÃƒÂÃ¢â‚¬Å¡",    
			pad:	    	"ÃƒÅ½Ã‚Â£ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹ÃƒÂÃ…Â½ÃƒÂÃ†â€™ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¹ÃƒÂÃ¢â‚¬Å¡",  
			manage:         "Manage Notes",  
			aus:            "ÃƒÅ½Ã¢â‚¬Â¢ÃƒÅ½Ã‚Â¾ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â³ÃƒÂÃ¢â‚¬Â°ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â®",  
			imp:            "ÃƒÅ½Ã¢â‚¬Â¢ÃƒÅ½Ã‚Â¹ÃƒÂÃ†â€™ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â³ÃƒÂÃ¢â‚¬Â°ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â®",  
			edit:           "ÃƒÅ½Ã‚ÂµÃƒÂÃ¢â€šÂ¬ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¾ÃƒÅ½Ã‚ÂµÃƒÂÃ‚ÂÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â±ÃƒÂÃ†â€™ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â± ÃƒÂÃ†â€™ÃƒÂÃ¢â‚¬Å¾ÃƒÂÃ¢â‚¬Â¦ÃƒÅ½Ã‚Â»",  
			topbar:     	"Top bar",  
			close:      	"ÃƒÅ½Ã…Â¡ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ÃƒÂÃ†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿",  
			closeb:     	"ÃƒÅ½Ã…Â¡ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¯ÃƒÂÃ†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿",  
			remove:     	"ÃƒÅ½Ã¢â‚¬ÂÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â³ÃƒÂÃ‚ÂÃƒÅ½Ã‚Â±ÃƒÂÃ¢â‚¬ ÃƒÅ½Ã‚Â®",  
			save:       	"ÃƒÅ½Ã¢â‚¬ËœÃƒÂÃ¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â®ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚ÂµÃƒÂÃ¢â‚¬Â¦ÃƒÂÃ†â€™ÃƒÅ½Ã‚Â·",  
			two:        	"ÃƒÅ½Ã¢â‚¬Â¢ÃƒÂÃ¢â€šÂ¬ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â¾ÃƒÅ½Ã‚ÂµÃƒÂÃ‚ÂÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â±ÃƒÂÃ†â€™ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â± (ÃƒÅ½Ã‚Â´ÃƒÅ½Ã‚Â¹ÃƒÂÃ¢â€šÂ¬ÃƒÅ½Ã‚Â»ÃƒÂÃ…â€™ ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Âº)",
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			more:		"weitere",
			edit_toolbar:	" "  
		},
		fr: {
			main: 		"SÃƒÆ’Ã‚Â©nat",
			barracks: 	"Caserne",
			academy: 	"AcadÃƒÆ’Ã‚Â©mie",
			docks: 		"Port",
			market: 	"MarchÃƒÆ’Ã‚Â©",
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
			manage: 	"GÃƒÆ’Ã‚Â©rer les notes",
			aus: 		"Exporter une note",
			imp: 		"Importer une note",
			edit: 		"ÃƒÆ’Ã¢â‚¬Â°diter le modÃƒÆ’Ã‚Â¨le",
			topbar: 	"Topbar",
			close: 		"Quitter",
			closeb: 	"Fermer",
			remove: 	"Supprimer la note",
			save: 		"Sauvegarder",
			two: 		"Double clic pour ÃƒÆ’Ã‚Â©diter",
			speak:		"Langues",
			worlds:         "Mondes",
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			more:		"other",
			edit_toolbar:	" "
		},
		cz: {
			language_name:  "czech/CeÃƒâ€¦Ã‚Â¡tina",
			main: 		"SenÃƒÆ’Ã‚Â¡t",
			barracks: 	"KasÃƒÆ’Ã‚Â¡rna",
			academy: 	"Akademie",
			docks: 		"PÃƒâ€¦Ã¢â€žÂ¢ÃƒÆ’Ã‚Â­stav",
			market: 	"TrÃƒâ€¦Ã‚Â¾iÃƒâ€¦Ã‚Â¡tÃƒâ€žÃ¢â‚¬Âº",
			place: 		"Agora",
			temple: 	"ChrÃƒÆ’Ã‚Â¡m",
			wall: 		"Hradby",
			hide:		"HÃƒÆ’Ã‚Â¶hle",//TODO Translate
			stats:		"Deine Statistik",//TODO Translate
			you:		"DU",//TODO Translate
			ally:		"Allianz",//TODO Translate
			map:		"Karte",//TODO Translate
			speak:		"Languages",//TODO Translate
			pad:		"Notas",//TODO Translate
			manage:         "Notizen verwalten",//TODO Translate
			aus:            "Notizen exportieren",//TODO Translate
			imp:            "Notizen importieren",//TODO Translate
			edit:           ".css ÃƒÆ’Ã‚Â¤ndern (Aussehen anpassen)",//TODO Translate
			topbar:		"Topbar",//TODO Translate
			close:		"Schliesen-Button",//TODO Translate
			closeb:		"Schliesen",//TODO Translate
			remove:		"Notiz lÃƒÆ’Ã‚Â¶schen",//TODO Translate
			save:		"Speichern",//TODO Translate
			two:		"doppel klicken um den Eintrag einfÃƒÆ’Ã‚Â¼gen/ÃƒÆ’Ã‚Â¤ndern",//TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit_toolbar:	" "
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
			stats:		"Statistieken",
			you:		"Speler",
			ally:		"Alliantie",
			map:		"Kaart",
			speak:		"Talen",
			pad:		"Blocnote",
			manage:         "beheernota's",
			aus:            "de uitvoernota's",
			imp:            "de invoernota's",
			edit:           "geef stijl uit",
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
			edit_toolbar:	" "
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
			hide:		"HÃƒÆ’Ã‚Â¶hle",
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
			edit_toolbar:	" "
		},
		ro: {
			language_name:  "romanian/romÃƒÆ’Ã‚Â¢na",
			main: 		"Senat",
			barracks: 	"CazarmÃƒâ€žÃ†â€™",
			academy: 	"Academie",
			docks: 		"Port",
			market: 	"PiaÃƒâ€¦Ã‚Â£Ãƒâ€žÃ†â€™",
			place: 		"Agora",
			temple: 	"Templu",
			wall: 		"Zidul",
			hide:		"HÃƒÆ’Ã‚Â¶hle",//TODO Translate
			stats:		"Deine Statistik",//TODO Translate
			you:		"DU",//TODO Translate
			ally:		"Allianz",//TODO Translate
			map:		"Karte",//TODO Translate
			speak:		"Languages",//TODO Translate
			pad:		"Notas",//TODO Translate
			manage:         "Notizen verwalten",//TODO Translate
			aus:            "Notizen exportieren",//TODO Translate
			imp:            "Notizen importieren",//TODO Translate
			edit:           ".css ÃƒÆ’Ã‚Â¤ndern (Aussehen anpassen)",//TODO Translate
			topbar:		"Topbar",//TODO Translate
			close:		"Schliesen-Button",//TODO Translate
			closeb:		"Schliesen",//TODO Translate
			remove:		"Notiz lÃƒÆ’Ã‚Â¶schen",//TODO Translate
			save:		"Speichern",//TODO Translate
			two:		"doppel klicken um den Eintrag einfÃƒÆ’Ã‚Â¼gen/ÃƒÆ’Ã‚Â¤ndern", //TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit_toolbar:	" "
		},
		pl: {
			language_name:  "polish/polski",
			main: 		"Senat",
			barracks: 	"Koszary",
			academy: 	"Akademia",
			docks: 		"Port",
			market: 	"Targowisko",
			place: 		"Agora",
			temple: 	"Ãƒâ€¦Ã…Â¡wiÃƒâ€žÃ¢â‚¬Â¦tynia",
			wall: 		"Mur",
			hide:		"HÃƒÆ’Ã‚Â¶hle",//TODO Translate
			stats:		"Deine Statistik",//TODO Translate
			you:		"DU",//TODO Translate
			ally:		"Allianz",//TODO Translate
			map:		"Karte",//TODO Translate
			speak:		"Languages",//TODO Translate
			pad:		"Notas",//TODO Translate
			manage:         "Notizen verwalten",//TODO Translate
			aus:            "Notizen exportieren",//TODO Translate
			imp:            "Notizen importieren",//TODO Translate
			edit:           ".css ÃƒÆ’Ã‚Â¤ndern (Aussehen anpassen)",//TODO Translate
			topbar:		"Topbar",//TODO Translate
			close:		"Schliesen-Button",//TODO Translate
			closeb:		"Schliesen",//TODO Translate
			remove:		"Notiz lÃƒÆ’Ã‚Â¶schen",//TODO Translate
			save:		"Speichern",//TODO Translate
			two:		"doppel klicken um den Eintrag einfÃƒÆ’Ã‚Â¼gen/ÃƒÆ’Ã‚Â¤ndern", //TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit_toolbar:	" "
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
			edit_toolbar:	" "
		},
		it: {
			language_name:  "italian/italiano",
			main: 		"Senate",//TODO Translate
			barracks: 	"Barracks",//TODO Translate
			academy: 	"Academy",//TODO Translate
			docks: 		"Harbour",//TODO Translate
			market: 	"Market",//TODO Translate
			place: 		"Agora",//TODO Translate
			temple: 	"Temple",//TODO Translate
			wall: 		"Wall",//TODO Translate
			hide:		"Hide",//TODO Translate
			stats:		"Your Statistics",//TODO Translate
			you:		"YOU",//TODO Translate
			ally:		"Alliance",//TODO Translate
			map:		"Map",//TODO Translate
			speak:		"Languages",//TODO Translate
			pad:		"Note",//TODO Translate
			manage:         "diriga le note",//TODO Translate
			aus:            "Notizen exportieren",//TODO Translate
			imp:            "Notizen importieren",//TODO Translate
			edit:           ".css ÃƒÆ’Ã‚Â¤ndern (Aussehen anpassen)",//TODO Translate
			topbar:		"Topbar",//TODO Translate
			close:		"Schliesen-Button",//TODO Translate
			closeb:		"Schliesen",//TODO Translate
			remove:		"Notiz lÃƒÆ’Ã‚Â¶schen",//TODO Translate
			save:		"Speichern",//TODO Translate
			two:		"doppel klicken um den Eintrag einfÃƒÆ’Ã‚Â¼gen/ÃƒÆ’Ã‚Â¤ndern", //TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit_toolbar:	" "
		},
		sk: {
			language_name: "slovak/slovensky",
			main: "SenÃƒÆ’Ã‚Â¡t",
			barracks: "KasÃƒÆ’Ã‚Â¡rne",
			academy: "AkadÃƒÆ’Ã‚Â©mia",
			docks: "PrÃƒÆ’Ã‚Â­stav",
			market: "Trh",//original - Trhovisko
			place: "Agora",
			temple: "ChrÃƒÆ’Ã‚Â¡m",
			wall: "Hradby",
			hide: "JaskyÃƒâ€¦Ã‹â€ a",
			farm: "Farma",
			stats: "Tvoja Ãƒâ€¦ tatistika",
			you: "Ty",
			ally: "Aliancia",
			map: "Mapa",
			speak: "Jazykov",
			pad: "PoznÃƒÆ’Ã‚Â¡mky",
			manage: "PoznÃƒÆ’Ã‚Â¡mku spravovaÃƒâ€¦Ã‚Â¥",
			aus: "PoznÃƒÆ’Ã‚Â¡mku exportovaÃƒâ€¦Ã‚Â¥",
			imp: "PoznÃƒÆ’Ã‚Â¡mku importovaÃƒâ€¦Ã‚Â¥",
			edit: ".css zmeniÃƒâ€¦Ã‚Â¥ (upraviÃƒâ€¦Ã‚Â¥ vzhÃƒâ€žÃ‚Â¾ad)",
			topbar: "VrchnÃƒÆ’Ã‚Â¡ liÃƒâ€¦Ã‚Â¡ta",
			close: "TlaÃƒâ€žÃ‚Âidlo-Zatvor",
			closeb: "ZatvoriÃƒâ€¦Ã‚Â¥",
			remove: "PoznÃƒÆ’Ã‚Â¡mku odstrÃƒÆ’Ã‚Â¡Ãƒâ€¦Ã‹â€ ",
			save: "UloÃƒâ€¦Ã‚Â¾iÃƒâ€¦Ã‚Â¥",
			two: "dvojklik na vstup pre vkladanie/zmenu",
			speak: "Jazyky",
			worlds: "Svety",
			alpha: "Alpha",
			beta: "Beta",
			gamma: "Gamma",
			delta: "Delta",
                        other: "dalÃƒâ€¦Ã‚Â¡ie",
			edit_toolbar:	" "

                    },
		hu: {
			language_name: 	"hungarian/magyar",
			main: 		"SzenÃƒÆ’Ã‚Â¡tus",
			barracks: 	"KaszÃƒÆ’Ã‚Â¡rnya",
			academy: 	"AkadÃƒÆ’Ã‚Â©mia",
			docks: 		"KikÃƒÆ’Ã‚Â¶tÃƒâ€¦Ã¢â‚¬Ëœ",
			market: 	"Piac",
			place: 		"Agora",
			temple: 	"Templom",
			wall: 		"VÃƒÆ’Ã‚Â¡rosfal",
			hide: 		"Verem",
			stats: 		"StatisztikÃƒÆ’Ã‚Â¡id",
			you: 		"Te",
			ally: 		"SzÃƒÆ’Ã‚Â¶vetsÃƒÆ’Ã‚Â©g",
			map: 		"TÃƒÆ’Ã‚Â©rkÃƒÆ’Ã‚Â©p",
			speak: 		"Nyelvek",
			pad: 		"Jegyzetek",
			manage: 	"Jegyzetek kezelÃƒÆ’Ã‚Â©se",
			aus: 		"Jegyzetek exportÃƒÆ’Ã‚Â¡lÃƒÆ’Ã‚Â¡sa",
			imp: 		"Jegyzetek importÃƒÆ’Ã‚Â¡lÃƒÆ’Ã‚Â¡sa",
			edit: 		".css egyÃƒÆ’Ã‚Â©b (A megjelenÃƒÆ’Ã‚Â­tÃƒÆ’Ã‚Â©s testreszabÃƒÆ’Ã‚Â¡sa)",
			topbar: 	"Topbar",
			close: 		"BezÃƒÆ’Ã‚Â¡rÃƒÆ’Ã‚Â¡s-Gomb",
			closeb: 	"BezÃƒÆ’Ã‚Â¡rÃƒÆ’Ã‚Â¡s",
			remove: 	"Jegyzet tÃƒÆ’Ã‚Â¶rlÃƒÆ’Ã‚Â©se",
			save: 		"MentÃƒÆ’Ã‚Â©s",
			two: 		"dupla klikk a belÃƒÆ’Ã‚Â©pÃƒÆ’Ã‚Â©shez einfÃƒâ€žÃ¢â‚¬Å¡Ãƒâ€žÃ‚Â½gen/egyÃƒÆ’Ã‚Â©b", //TODO Translate
			speak: 		"Nyelv",
			worlds: 	"VilÃƒÆ’Ã‚Â¡gok",
			alpha: 		"Alpha",
			beta: 		"Beta",
			gamma: 		"Gamma",
			delta: 		"Delta",
			other: 		"EgyÃƒÆ’Ã‚Â©b",
			edit_toolbar:	" "
			},
		pt: {
			language_name:  "portuguese/portuguÃƒÆ’Ã‚Âªs",
			main: 		"Senado",
			barracks: 	"Quartel",
			academy: 	"Academia",
			docks: 		"Porto",
			market: 	"Mercado",
			place: 		"Agora",
			temple: 	"Templo",
			wall: 		"Muralha",
			hide:		"Hide",//TODO Translate
			stats:		"Your Statistics",//TODO Translate
			you:		"YOU",//TODO Translate
			ally:		"Alliance",//TODO Translate
			map:		"Map",//TODO Translate
			speak:		"Languages",//TODO Translate
			pad:		"Notas",//TODO Translate
			manage:         "Notizen verwalten",//TODO Translate
			aus:            "Notizen exportieren",//TODO Translate
			imp:            "Notizen importieren",//TODO Translate
			edit:           ".css ÃƒÆ’Ã‚Â¤ndern (Aussehen anpassen)",//TODO Translate
			topbar:		"Topbar",//TODO Translate
			close:		"Schliesen-Button",//TODO Translate
			closeb:		"Schliesen",//TODO Translate
			remove:		"Notiz lÃƒÆ’Ã‚Â¶schen",//TODO Translate
			save:		"Speichern",//TODO Translate
			two:		"doppel klicken um den Eintrag einfÃƒÆ’Ã‚Â¼gen/ÃƒÆ’Ã‚Â¤ndern", //TODO Translate
			speak:          "Language", // todo: translate
			worlds:         "Worlds", //todo: translate
			alpha:          "Alpha",
			beta:           "Beta",
			gamma:          "Gamma",
			delta:          "Delta",
			edit_toolbar:	" "
		},
		dk: {
			language_name:  "dÃƒÆ’Ã‚Â¤nisch/danish",
			main:		"Senat",
			barracks: 	"Kaserne",
			academy:	"Academi",
			docks: 		"Havn",
			market: 	"Market",
			place: 		"Agora",
			temple: 	"Tempel",
			wall: 		"Bymur",
			hide: 		"Hule",
                        farm:           "BondegÃƒÆ’Ã‚Â¥rd",
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
			edit_toolbar:	" "
		}
	};
	
	var menuUrls = {
		main: 		"building_main?action=index&town_id={town}&h={token}",
		barracks: 	"building_barracks?action=index&town_id={town}&h={token}",
		academy: 	"building_academy?action=index&town_id={town}&h={token}",
		docks: 		"building_docks?action=index&town_id={town}&h={token}",
		market: 	"building_market?action=index&town_id={town}&h={token}",
		place: 		"building_place?action=culture&town_id={town}&h={token}",
		temple: 	"building_temple?action=index&town_id={town}&h={token}",
		wall: 		"building_wall?action=index&town_id={town}&h={token}",
		hide:		"building_hide?action=index&town_id={town}&h={token}",
		farm:		"building_farm?action=index&town_id={town}&h={token}",
                edit_toolbar:   "game/quickbar?action=index&town_id={town}&h={token}",
		alpha:          "http://{lang}1.grepolis.com/game/building_main",
		beta:           "http://{lang}2.grepolis.com/game/building_main",
		gamma:          "http://{lang}3.grepolis.com/game/building_main",
		delta:          "http://{lang}4.grepolis.com/game/building_main"
	};
	
	var icons = {
		main: 		"http://static.grepolis.com/images/game/toolbar/main.png",
		barracks: 	"http://static.grepolis.com/images/game/toolbar/barracks.png",
		academy: 	"http://static.grepolis.com/images/game/toolbar/academy.png",
		docks: 		"http://static.grepolis.com/images/game/toolbar/docks.png",
		place: 		"http://static.grepolis.com/images/game/toolbar/place.png",
		market:         "http://static.grepolis.com/images/game/toolbar/trade.png",
		farm:		"http://static.grepolis.com/images/game/toolbar/farm.png",
                edit_toolbar:    "http://static.grepolis.com/images/game/layout/toolbar_edit.png",
		
		alliance:       "http://static.grepolis.com/images/game/toolbar/alliance.png",
		attack:         "http://static.grepolis.com/images/game/toolbar/attack.png",
		info:           "http://static.grepolis.com/images/game/toolbar/info.png",
		leader:		"http://static.grepolis.com/images/game/toolbar/leader.png",
		messages:        "http://static.grepolis.com/images/game/toolbar/message.png",
		other:          "http://static.grepolis.com/images/game/toolbar/other.png",
		report:         "http://static.grepolis.com/images/game/toolbar/report.png",
		edit:           "http://static.grepolis.com/images/game/layout/toolbar_edit.png",
		worlds:         "http://ftp.innogames.net/~floo/navbar/forumsearch.png"
		
	};
	
	//Get language - Dreambraker changed Ãƒâ€žÃ‚ÂÃƒÆ’Ã‚Â°Ãƒâ€šÃ‚Â¢ M@rco
	var lang=uW.location.href.substring(7,9);
	if(lang!='fr' && lang!='se' && lang!='de' && lang!='es' && lang!='en' && lang!='pl' && lang!='hu' && lang!='pt' && lang!='ro' && lang!='cz' &&lang!='it' && lang!='gr' && lang!='dk'){lang='en';}
	var trad={main:'',barracks:'',academy:'',docks:'',market:'',place:'',temple:'',wall:'',sim:'',storage:'',lumber:'',stone:'',iron:''};
	var language=[];
	language['fr']='french/francais';
	language['de']='german/deutsch';
	language['es']='spanish/espanol';
	language['pl']='polish/polski';
	language['hu']='hungarian/magyar';
	language['pt']='PortuguÃƒÆ’Ã‚Âªs';
	language['ro']='romanian/romÃƒÆ’Ã‚Â¢na';
	language['cz']='czech/CeÃƒâ€¦Ã‚Â¡tina';
	language['it']='italian/italiano';//TODO add
	language['gr']='ÃƒÅ½Ã‚ÂµÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â·ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚ÂºÃƒÅ½Ã‚Â¬/greek';
	language['en']='english/english';
	language['se']='schwedisch/swedish';
	language['dk']='dÃƒÆ’Ã‚Â¤nisch/danish';
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
	
	
	
	//Grepostats

//
//
//
//
//
//
//
//


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
	if(location.href.match('game/building_main')){
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
		$('#gs_gs2').append('<div style="text-align:middle;"><a href="http://userscripts.org/scripts/show/62989" target="_blank" ><img src="http://static.grepolis.com/images/game/units/slinger_40x40.png" width="12" height="12" > '+gs_langs+' '+translate[lang].speak+' </a><a  href="http://sdm-scholz.de" target="_blank" title="Doc Marco &amp; die PC-Helfer">!</a></div>');
		$('#gs_gs2 a').css({'font-size':'9px'});
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


// segunda parte - XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


// ==/UserScript==
var scriptId = 71056;
var scriptName = "Grepolis Extended";
var scriptVersion = "0.5.3";
var scriptWright = "Cordazar";
var scriptWrightEmail = "cordazar (at) gmail (dot) com";
ScriptUpdater.check(scriptId, scriptVersion);

// START of JSON
	(function() {
	if(!this.JSON){this.JSON={};}
	(function(){function f(n){return n<10?'0'+n:n;}
	if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
	f(this.getUTCMonth()+1)+'-'+
	f(this.getUTCDate())+'T'+
	f(this.getUTCHours())+':'+
	f(this.getUTCMinutes())+':'+
	f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
	var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
	function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
	if(typeof rep==='function'){value=rep.call(holder,key,value);}
	switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
	gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
	v=partial.length===0?'[]':gap?'[\n'+gap+
	partial.join(',\n'+gap)+'\n'+
	mind+']':'['+partial.join(',')+']';gap=mind;return v;}
	if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
	v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
	mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
	if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
	rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
	return str('',{'':value});};}
	if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
	return reviver.call(holder,key,value);}
	cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
	('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
	if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
	throw new SyntaxError('JSON.parse');};}}());
	})();
// END of JSON

// var start = new Date().getMilliseconds();

	// START of FUNCTIONS & VARIABLES

	// Variables
	var GE = {};
	GE.location = window.location.href;
	GE.counters = [];
	var uW = unsafeWindow;
	var $ = uW.jQuery;
	var jsVoid = 'javaScript:void(0);';
	GE.Server = /http\:\/\/(\w+)\.grepolis\..*/.exec( uW.document.URL );
	GE.GameData = uW.GameData;
	GE.Game	= uW.Game;
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
	
	if (GE.Game.townId == undefined) { return; }

	var imP = 'data:image/gif;base64,';
	var imPNG = 'data:image/png;base64,';
	//base64 coded images
	var image = {
		"bMsg": imP + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVVJREFUeNpMUE1Lw0AUnN1N0rSobSHWGJqKFlRQ1IMgiB93f4U/w7N/p2cP/QOih9Z6aMHSCoXooYfSJmmS2qQxb0FwYFne25md94Y9Ptw39nasM38+5/FyCUKyWiFNU6ySBHGcgHOGn2Ucvry2usrF+cnN9dVlhYiKoiDJSP9BvTiOEYYhBIfBBWfrvu9jNBpBzZchhJBHVVXoawaU4iEGgwEmkwlqNXuDB0GQbm5tg0T9XhtqwZBkkSsCahkf7SeMx2OYpkmGKQ8yK2gV1Ot1+dDtPAOFXSBnotdqwnEc+aZpGlbZbgrNRoiiCJZlwXVd9DtNMMawWCxg27bci2q5U5YMQ/QtU6lWq/KmeQl/NTnTh5mIKY7z5U+n0zxZUpNzjlKpJAVEJhiGAc/zMBx+ztjd7UHj+Gj/VNf1LByRCk4pcTkCy8QEzlg6c73w7b3b+xVgAFkfms3iRzimAAAAAElFTkSuQmCC',
		"bPopup": imP + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAnRJREFUeNqkVb2PElEQn10ecHwcJJBLtoOCxgIrE02wglDR0WhBKCxsTK6k81+guJoWC41iAxWNBYkJzcUW5CMEWIwccnggy5czm8fK7rEIOskv+97befOb+b23s8Jms4Fde/n8ye7UinAhfAgvwoEQ4bCtETPEGHGDuGOGoEazEUEwGLyy2+0JOMHm83mx1Wpd4nDB/uJLlXitVmsiGo2C3+8/imA4HEK5XKakXlM1RCIgGM+aglr4GqzXax9CQgBmBY1G4ygSURRpL3B5LYwT7NUdHb3L5TJAGwaDARjPz8wEQdiSUBxhW4EvHo9feTwene6z2QxGoxF0u11Ip9OnHAlks1ltzLa6u93uBBKBaHVqL+9uh9Dv9yGfz0O73T6JZLVa/ZGPn4GDFinz92/z8HP8HT68ewOTyQRKpRKgZBAIBODB42cgSRIsFgt1vG9OSblcLnXPLgkdskgk9CIWi6lPuk30jEQiuqw6nQ5Uq1XTOZksy7o92hWmgLVaTec8nU7V67i74eHTlAqzORlVZ0ryKPpCL+ztF+j1elCpVLSlUfuTmv02sHFudiaqka73LzxTr+N/yEX3eKOr5D7JGdhsNo1kKn+GUCikgsZkxrlBLuphK3awEosTnE4nhMNhyGQyJ11h/HCLvEkuDlfCPOA4v4BUKgXJZBIURdF99blcDur1+ivGWBsxNunCCpHQrvV+uewAdgkcWJHjfIpev8hTe01VYvAm9qqvPCDweKQVSaNQ/owvzEjDxvVHwJZ+bCsnAoKM02/YqX+Y+TLOOMavvVgoFE76Z6B8mu6H/Bgv6abZbF7y/v8vfz/lkPNvAQYANS5S08jAjgMAAAAASUVORK5CYII=',
		"bGStats": imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAM5JREFUeNqEkr0Ng0AMhe8kWqqbIxNkgEyQKnNkhLTZIlIqmrQZIBOkpqW4giv4EXAXPUsPchCIJUvGz59tDDqEoNbsmV1HEXXee3U4nnWi/pgxRooBFUUhuU2obVvVNI1AwzAo59wEvV93WYMdYbv9Sfd9L8VwaF3XTRASaZoqxmVZSowigguIIidhrV8Q4mgSnVeaNwMYQexEAM+Evt+J+QU0n0SNHq1nrR0hXhDr5Hk+FtP01h+xZsnjdgm4Vl3X8iGrqlo4NOqo/QgwAJiJC8adQxVlAAAAAElFTkSuQmCC',
		"bClose": imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+xJREFUeNpsVFtoXFUUXXfmztyZuUk6aRObhGZMatokVVDrI6AIRSkkAdsUijQNpSUltP2oFi340Q8VIpTaj0JBRVEChSqIaOmHrehPwVellND6kdRKQtLJTCeTzCPzuvNy7dO5lzF4YHPea6+99zpHe/PILkhzuVzQdV0Zx6bb7R7keMjr9e7weDytnJcrlcpiLpe7XSgUvq9Wq7/QUC6XUSqVIGNpOtY1bowS6D2/399LMMcJQREIBHq5/hoBT8/Pz19PJBJnNE27VX/fPfBMlz3WyeKiaZpnDcNoEY/iuVgsKsvn81hbW0M6nYY4CoVCPbwztrq6+oD9tANiU6Wnj+l9QsZkoFJgG0NVvTQJMRqNIh6Po7293eR8am5ursj9yyp1woJ2lKwmBNyyrBqjnLosYGL2WO3T5N7CwgIYEYLB4Cck0Sf3BHATQ50UBnJYLgabm9GzrR/l0qNwbVBx0tDQgO4ntktIak2YErCJGB+IExcXDzDhbTKpkGE+l8HuoQMYf+s8Rt44ilKxoECz2Qza2jpw+MT7OHhsEq2tm5mavJNj02zYx75PEvO6xK4Aya4KDXenf5V6Y+fLe7H/4HHks2nmqwNjE2ewYdMWxML38DASlswrlpJzn8/wcGFQZ6j9sujoSPfg5m83YDZ+hH1jp/HsS3vgNfxo79yGxuYOxCP3cemzSaTSKUrJ6+SWIcv153VONtQDKi0R9KdrVxhuCSOjp/Dkc7vVenjuL1z6fBLx5RUYPp8CqylEGdtmXVVQAGk1YT+SSrmC+7N3YBWy8BgBtReLziOyFCbjgANWD6jkxdwlq+ukIQUIPd6F42+fg9nUgnQiQgcWnh4Yxtj4KadQ9nnpZU6VRNz9WzcOUvk9tjfZ2NIZwsl3zyPY0omHD+7hwocnEVv6B0/tfAUdoR0INpm4M/2HKopEJOzkXjKZ/FIYXhX9yYaqWD6L4T2jrGYnooszuHjuHSxFIvj5x6v4ZuosQSoY2LWfTrsd8UtLpVIWsa65+7qb/ybQIb6URlUYeiuXi1iNLeKrqQvqmRmGj1XUMTtzl05mkYiHKa0/ycpycre8vPwt73+qjby6VdiN8wV8wbesmJZUfkpMvk/9MnbipVlWgZWr0IkfLkpF9mOxWDKbzb7IYs66e7uCAnKbYT9GLb0gX5XGKrul17T/yEnGwlRMIpGz/MIk3CMEu6H2BbB2+Ad+URsJMiBebbD1gLIuspLxyspKmmATJHLZ0bANWGsCOsOn1CsiFfXXiVb18kQzmYyAydlDPHPd3v/fH5ubXzP872jDHA8xrH4yapXnzoqGabfI7grXfrf/yPr2rwADAL/FaxnBTkjkAAAAAElFTkSuQmCC',
		"islandPME": imPNG + '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',
		"islandPMA": imPNG + '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',

		'booty':  imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAABd0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYyLjW8h8n+AAAEvElEQVRIS+2WX0hbVxzHhe1tD2kHPhZZKZTtoZeVrWxOOLDWwgrhbqCV6cYtxkZrpVkD0Tobg4raGWNi/hpjamKSRmNMY82azc3q/nQPG3RMKLJWYfggfdlg9KkP47fzPXKypHag256GgR+/c3Mu93N+3+/vnHvLyvZ/+woUKbC1taXb3NxUNjY22OrqKltaWmLT09NKOBzW/SdCeTwjOq/PrQRDE+x6NMEiU0kWS6TY0vJXGofT+vo6ra2t0crKCnEoedwuNRKJ/Hv4iN2mcDiNjU8QB1I4Ehd5Jp2lm/M5yuU/FxnzLYazxKGIClS9uLioS6fTyuTkJAuFQsqeFuQb7mADXQbSq+/R6ycqRWBcV6/ROYORPjKbKOyxUjabJQ6i5MSgM+01q2nneZYIWDX8Nzo6Khbkcw0ou7Lhi0+jutSUQ7s9bRcgCZb5THUlDfc209JkC+WCF+izmIVuhc2UGWkSMeO7SJfOVdPJ44eox1xDA13n2a7AC3NBhcPJH/DtAAOKykcunyFL/QlqqzkmshzL69eOvECIjlaVOtve3R04Gnaw+HW7kBSg4koBbao/JcCAFIMB726sEoFqEXsCu4e7WF9fd4m/T8NlxRKELMGY0791RISQ2tqqocHy+TyiAvmZ0gfsJiXqbBGVNaiVZG9UyN96XES+/xilLeUUMR0ik/6wqBjQ/ovVBTDGsmJ4jQYb87s115BV41BKTgWe3Wzf3mit+O6G0fboThut375AIYtCdu1FEb11B0S06w+KLAHIDSdfEgs11laJMfLksIHi8bgIFHLtSh35nTYtlUqV76iaAxVAf7troif3BwW8t+Eo6V99nt6vfI6Mp3QlYMAQvqtnRfUDxjeFApAcGXJDdjQbFOBQRGnDbd216h59064BzMf06/c99Pielcatp+ntV7bBiPqqA2IBCCk5QNJr2em4xoIAhipF4NpCxYD+snxFBfD3e3YBRX583yd8xopRNaCQerT5sPB7rOWguDaePlrwWYJR8dPgubk54ifbNpjLqdtctgjoD6lmujNeRw++tNFPCx2iWkvNy+QyVVLq4zeE52guBHyW0gsVuK+AIWTHF4MNBgMBzIOV8YeX/5w3q/ASYAkHCA9Dxhw8Rzy8qQnPMScDFUNKSFoss1wE5nAmOBwOHKUqB5eX/Zi9zFAZgPBTNhWqxnYBVHY4xrhnZvCdEtnhP6zAw1E1OhgBT5Hbm6oF1NZ9VeV5ex9/HWuphbzwFADZUPgPHYrrYjjAWJRsLrGVeFd3dnZSIBCgWCwmO7eQ5+fnye9x/AUFOOttrI0PNhSqxYP/eOCkBade+PTkYVAsCBJLNTAHmeXphHdyf59Nc7vdLBqN4uOAYcsgZmdnWSaTUTi89MRKuZvZ3NglWnB/KKqD5KgI2wTVBK81if2MwIJgCyyArKgymUxSaMyt7vkrhEPLM/5WFXAc6uLk4dLBH3/fB+L0wYmDOXiFecwNDQ0RJOQVqhz+z74+OFQ3FehBt5HX6y14hbM1MfGJDQD4hwbhcgofMcdlVHdIuKuXb9FNHKrjZ6rCP1dYMBhkiUSC8S8MJZfLVeCDDv+7XC7m8/kYB4u5v33T7BW+f///UoE/AYTAXK4rQPb3AAAAAElFTkSuQmCC',
		'mood_drop':  imPNG + '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',
		'strength_drop':  imPNG + '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',
		'strength':  imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACDVJREFUeNq8V2tsHFcV/ua1Ozs7s2+/1t6sYztOGufh0BLapG6SknepKIISFCpVKqggxJ9WQgL1B6qExA9AIFSJ/oEWhEoVIK1oCaFNQkpD4zZpXk2cZG1nvV7Hu5u1vY/Zmd15Xu66TRrnQR8grjSzd2buvd+553znfHeZ3//4K3hv+C1w8bvAyR2Aa+PjNr/kw7PP/xkT2dy1d4/t2nlqcnJCP3B0ZN3Vdx0tAey4bxC//tMb18bx13osB54XKDDzsYEJcOfK5Us26q4m247tIYTUx6Yzi1SzbofbfE8RAsnr8Roruhdrruu+TqecWQhMQZ3yBFJTM7BsFwwzvyiaJnDs7Q1hGOZBnpg/7OoLghEIOI7F0oEB6jQWYur4jyzXADFYcNSCS9nC924GZliQeglSfQ5Vk0HZ8EDgCTWCYFa14OEZsMzNBvAc+7Mzqem9rcuUQyLHRxclurHuc+tRKMygohWQzY+hNKcXUiP5TcnOaHbB3A/Np67mXHQEOcQFHotihE428IcDVzCaq8O99aZVek3E+bDLsSw0rYZF8V74hBD+ceSv1FiWho+zVd2YODs6Xb9+IntDzN6/6M2ku20J8dg91IZtK6IQuNu6XGBoUBzXneeIadogTtOJLFziwnVJc6Jw4yT2P5GHroVq3UFPmwi/yFH333q4bdtoNBr0u5caKNBYC/AIXhiGCce6dZbwH8XcprkN08U3tvRA8FsYPlfB4VNzC8a0xDogBXiYlklD4tBdG/NXayyOkq3REbOfHPjaQMpu2yXYsCIISmC8fvpD8Pvu3oKh9UMYz6Rw+vw7yKQnsW3jl9DftxyHDhzGscOpTw9MPvitGy62ro7SNHOx/2R5/t3w8cO4OHkCn793J9pb4qiWNIheEXv+8hxGR9KfztW3ag2a60NL/biUriFVtpEtpJV8mUF6MoX1a7fCNCwcfOsVqLUK6hVH+a+BbRpD0HgTnofRcPhkJ2fniauXiuZLiuKJ1mY158C+lzY4lM42w/3LobWoUrKa9dT85MCkmV6k3XXcfN+ylZBl6YvZs+993eFkcfODzE+m9hXfZGbI7pFLM/PDt66Ux3LFmnUhj+3LEgHcofAoJ0NYGpE+HjCZDyqzXvBxT0iMsIZhyM85T+gZObF04/mjmYe1hovcAePtpaHom3euikgvH5kU3p3QrN5OkfHwhhBPtO64q1d+6Eq1fsdMhfnu9p7omY8GpjlUmLE625et/h30yR7WqSKvc79459V3MyZ79qwk+2BZBAPJ5OY1SZJEo7JpsL/1xZyp/Zb3BPgNS5TEsoDv5eKc7lE1F4mQ8oOaVn/8g0r3ITDz/q3Zb6NubZNF7m6DcI9eSl/uMRkZGo1QXrW5cCTwzaGBdqebr8NvN5CrWRt9vH9j1qvAlavr1q2BXCsVEjsHJYYnxFNt5jit85xR+aohRfbSxz9eA6ZATxk2lhiW3c0QEqNKFVYNO85SApWmJ3FxzodgKAjWMc1Eomv11v5IF04fxUxVRb1oopzm0bVpC/Yfzy+uVmr2plbX9jG2UGJ80CQRpHyFShzP/m1UFb5/vauXr137nZMnR+INvYJIyA+eHgTGcnqzuCMYiWBpwE8Lfyshlp0WvXz9WBnJlpY+OHQ/4aCFmi+M80UNi1sVRkjEIt2y4Q7T8nzZ1wZrsR/+jhqsXBabk/ICZvMdXd35Rb19cfXkCcTbAyCmRRcVcaXioKu3H+pICj6JZfQaa0zlZu3hcxO21y/xkYBE85VyYW4aelUnK3s7OE3VOo/UOU/VcKDVxhCLyFQseMTbOqD4vb4FIrH/78MHE8sGEYy2w9E1qo4M4jERrtlANBrEhk33wHI4d2auoqhaPUk1mJvK5DA6NoXU2DRyU0WqTA4zlZuLzpRrPlWtozRbpsWkgOpcFRdTGZh1E6++dsy4Hpg7n5oYG1yRvJ+TY20Kb6JUKIALdsJVOiAHw5AUBdO5WUctazUCQq1mfQp1v+ilSkf1zycKCPp9bizoL0qiN+MQJkzPDMJghEM/U0FI8RG5s1Pr7oq9sO2Br41ec3XqUj79q9+88sTuhzc/seq++x84cPBtlFkFNaNKdwJ4BQG2Q7Oa5fx+iua3NLuZAXIgrJP2YE0QBNnvoUzk+Yoo8NNsrZxkLhckS9NQ50R093ZqZyenvlUsll67SY9PnZs6+Oxz+75NBO9xKdLRPAnB6+HnP5uWg5nirBAgxUhMmJNkt8iVc+Mw9bIjeMVsFIbap2Y8VmY8nJ6eVUyfomhiANVQO2XuGlT0ktiG3EP3DoR2LnD11U6polVrmjYtENY/ebl4aCQ1tScoe7NU+31qpSyt6gt6JZ5WYI5hZC89wMH2zpmiS8yG9JmAI7YzmjQ+PRvP6KzYk2xjqrx80R8NX2gLebtpTAY4qfXODTt2P3PLyrXn5aP7vQJ/wnbcKj3KaCdOj4YFgW9/5MtDu/rWrnvStYjI8pxALAOjl7JI/3PkjZlabdF4IDIUtlRujd/01e0pBKYKODah780tWT7+hc2fHewbvFsaPnb+1I0HjI9sia5oS393+z3RSCAZjUS6opFQj6o3SgM9rXrLTPqx8dMjijfWAiGogA9GwSoB8Ir0wvN7Dj55pVgbWpxs7z99LrM/k71y4hMB38CJZngohs/56dOPPj7Qm/jlyRPn6L+QoOPw0uWSqqUz6elsavzyS8eOj+zV9frVkFKKEnxa4AWtb3FL7JFd258ul8vK2QuTwxfHciO1Wj2rqnredhztZsX7HwE3m0/0dNJFOL1h5m8l+LcFvv7h/9n+LcAA20y+7X7+TCsAAAAASUVORK5CYII=',
		'strength_prev':  imPNG + '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',
		'strength_now':  imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACAZJREFUeNq8VmlsXFcV/t42y5v3ZjyLd4/Hy8RJ4yZxSAhZmq2kaZICLUJtqlAUVFAKEX8SCQnUX5X6DwQIVaRFKqUgVVWAJNAqDSWpEtoSN3adpY6deMl4FnvsjO1Z3rw3nrdyxzDW2HFVShBHc+ece8/R/e499yyP+torAu6HbrwoYiyeXJg/e/DAtVhsTDl/eWBrea2+2o39O7rw6h8vLdix9wO6JfHtDdbqG7sUUxZ0Q7dZllUYmYg2S2pB99Y6n7cs8HabvfhgS6tsmubfSuesBP4VGd8n40QFP1qxjiW6BX7F+ade1mre2BT2gOIsMAyNlZ2dMHUajqHeFzWzCKtIgyEnuBOf+mElMF3a4M9HJFTyMmhpvlRXyQ2/tPFS9411SqE4Y5gmGhuasfVL27AivAKNjUEwHCDJytSHvYOrZ7Pyy5XeKgGjYKTx5ndiePzX4jwvbVyel9dKNmXbSj6bK4yxLGsyNA1ZzqO5oR0tTWFIUhY0RYNlGV1SimP9wxP5e4Cz+iSefrUZZbmSV+pfOXxlXi7xf9uXXM5RoFC6MctyUFUdlgFQ5CCmZcI0LapkszQ+5oFlc2ZhoSw/9/om/Oxb78yPklzWleQK+1IsQNd1zM3NgWPt4Ih/GTJsnB3FogpD05cNzFJwnTj++/3lgMEyMpbqKm1KVB2oB+9moWoqTBjk1sX5URNoQFqXicXMssBHyyevvMUycuV80fqOzY9g+7btGI0O4frgFUQjMTy66+voCK/Ge+cvoufi0LLA903dvRdxO9aHLz90AHXVDcilZTjsDpz8y2sYHoh8qqvvm+JTEXEyQyESG8K2TXuhFjVc+MdbkPJZFLKGuCzwU7P78ElPDyyKRU4xYbcxoFgb6r0mKTsmorEC0hkdflL2VJrksGrC53JBL8js5eG07vbQSjqlnhZFmz8/Ixvnz57eaZBw1inmQ8MElU1rpXqqfv4bW+RnWXWmYU6GV62BIPCPx/s/+abBCI49X6V+kjibep+atg4N3JmeN9+7RhhJpvLarUnsWxV04wGRRSZUhZU+/j8DJlWOELWNczLHeIpbT1HWzxlb1UtCcOWuwcvRJ+U5E8nzxY9WVvnf37DWx5/5IMZ9PCZr7Y0OysYWuYZgzf6N7cITd3OFB6az1A/2tflvfDYwSfmpaa2xbtW630GJtdFGDpMK84srb38cVen+fl5wQtMsdIZCe9aHrBDmsru7OmreTKry66zNze5cIQZXuZ1nUrOKTZJNBKvEH+flwhGys7QImPrXX0muJW6tFRzM5qLFHL4TGW9TKQEyeaFJSWe8Pvd3t3fWGS1sAS59Dsm8tsvJunbF7SJMIbd163oI+fRU8EAXT7GWZcuVcpylwBSzTxV53yky/cMCMAF6vqhjRVHTWyjLCoBmvFJRb6BZFumJGG7POuGp8oA2VDUYbFq3t8PXhOuXMZ2TUEipyERYNO1+BOd6J1tz2by+u8bUnZTOpSknZN4BK3MXYFj6nWGJ+1Glq1dv2nT06tWBhjklC1+VC6ypYySplIo7PD4fVrpdpPDXWJamRxx2ttCTQai6OgyD3Mfr0ZB3ejGYktFaI1JcMOBrEYpmNynP485aaK0uuOrz0JJx7AkJiyKbrW9qmWxuDzdIV/vQUOeGpWpkUwfuZg00tXdAGhiCk6cpJU8XE8kZvfvmmG538azPzZN8JbEwOwElp1hr2usZWZIbPygwtlzRgJwfQcAnkGbBoqG2HqLL7lzUJM79tftCcFUXPP46GIoMiqHQEHDAVOfg93uwc/cWaAZjTs9mRUkuhFiGZhLRJIZHEhgamUAykSKdyaASyVn/dCbvlCSS9zMZUkymkJvN4fZQFGpBxdvv9hQrgZnBobGRrgdDDzNCoFZkVaSnpsB4GmGK9RA8XvCiiInkjCFl5LwFi5yadorE/Q476XSk/zkdHDwupxnwuFK8wx41LMpLUeC6fAw6qCyqRKclNDbKLU2BNx597OnhBVcP3ZmMnPjNW8cOPbnn2NodDz92/sJHyNAi8sUcuQlg5zjoBslqmnG5CJpLk/VSBghur2LVefIcxwkuG4lEls06OHaCzmdC1PgUr8kyCowDLe2Ncn8s8VwqlX73nn587Wbiwsuvnf2exdl7eV89eRcCaGPn1apmYDo1w7mtlC/AzfKCmWIyyVGoSsbg7I64H0UpLEVtWnTUG5mYEVWnKMoON3JVdSRy1yOrpB21SD7xUGfVgUWuLgvprJzLy/IEZ9Gu2HjqvYGhxEmPYI+zNJxSNsOvDXvsPEsqMENRgp18wEG3z6oO01Ln+C+4DUcdJfOjEzMNUYV2tIVqqRwr3Hb5vbdqq+wt5E06Gb5mw879h15atnKdPHP5nJ1j+3TDzJFPGbnv+rCX49i6Z76x/WB409bjpmY5aJbhLK2I4TtxRP4+cGk6n28edfu2ezWJWe9SnQU9AXdiCj1jyqnkitWjX9nzxa5w12a+u2fw2pLi+NkUbPJXd7TUbfH73CG/z9fk91W1ScpcurOtRqmejjw7en1AtAeqwXlEsB4/aNENVuTf+O3JC8fvpvLbW0N1HddvRs9F43f7PhfwkpgoPQ/BcBo/feHwkc724C+v9t0EI3gMg+XH05IciUYm4kOj46d7egdOKUqh/KQkRC38t8CLKNxaHXjm4L4XMpmM2H8r1n17JDmQzxfikqRM6oYh39vx/kfAJXI6bI1kE0aZUyeXa/ifClw5+X/SPwUYAHa73u2ZHKW1AAAAAElFTkSuQmCC',
		'strength_total':  imPNG + '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',
		'ge_button':	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAIAAABd+SbeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxNJREFUeNrsnE1rE1EUhu98pNPUj0TFLGxxoSC6cqc7F/oL4qo/ofgHRETEleimOxHcicvQrIqlmy5FRKlUsIgbEYmM7dA05mNm7tzxznSi5QwKhpyhDe9Dcrnka/HmcHLnPpkRAhSCoe/bK/Nm+bSII2GW1MDTj8ThrupvWcfPKd+zyjW584nM//GCqO8e6reM8Mn75yrsWjM1w3JU0DGdqur/0E9VrtxLwnab11FxfOy+faxHW9/NqYoeHz5dQihj587CTf/bWha0MCw9vGgsIxcOnLkbQrxMgla9lh49z0MoHJjTJ7OKNpyqHmUYIhQO2q/uDnu0k0QeyQChcOC2VRa0XoIkoxwgFA7mzl8WYjVtHaWZZO0cRQiFg6jbyiraOXNNiCURxwiFA/vEJSE2kqBj2d+LHqFwEIedrKJl+3PygELQLPS+rw8PWNIdj2SvAzAwXZkVomUiiII6dXoEPpVWtEIcLD1adrOg4zTi9tf3CIWD0im9jv64d2RY3VquJz+OZsmwy2nTtq2js1Hni57oL8SuXsjP//YCwz5yqN8ywifvn1vlmnXsbLK28Hf0ck7fsoYBAAD/D5whnOGkQJ1h87WLUMZO/WqNOsPFZw3kwgF1hq6LimaBOsMw8BEKB9QZygAqiwXqDGXQQygc5J0hLDgLeWeIbVIWqDM0YFh4yDtDiVA4yDlDhb+EsQBnWGynFn+cIXo0T49OnWGCt7aAOPjYXpn/fWQIZwhnCAA4iMAZwhlOCtQZbrpNhDJ2Ltbq1Bk+bywiFw7gDAuCOkPfx6YSC9QZ+gNsk7JAnaHfQ9AsUGcoA5z+xgJ1hgrKkAfqDFVkIBQOqDOM0KJ5oM4wwuqOBzjDYju1GDpDnKHM1aPhDIsBzhDOEABw0IEzhDOcFKgzfHD7FkIZO/cfPaHO8M27D8iFA+oMOz9xshAL1BkqnMPCA3WGSsGwsJC7NikUCw/UGSJoJnLOENcm5YE6wxhB80CdISqaCeoMUdFMwBkW26nF0Bmiorl6NLk26frGJkLhANcmhTMEYGR+CTAAIricGO1N/3gAAAAASUVORK5CYII=',
		'ge_button2':	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAIoAAABkCAIAAADWqz/BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAg9JREFUeNrsnL1OwmAYRovxIrwJvQ9HTRjkItwdmBjcvQgcSJTN2RswKgu7IUqQgYIgbb9WExJJutEQciTnJCSwPifv90OfNIoETO33c3TcNAggH71WpB4mKymHf79Pzq4NBcLr/dXqy1pPlHyaC421nkX8bhxcPdPZ3Di4evIQjIOrJ4TMOMjTkxgHV08RUuMA68lz4+DqifLCOMB6IqdHPVJRT6Ee9N7jtRS9uHk0wHFgBP9l73F6XNykmp7J24txQPVYNxARkZ1hDZGLNUQu5Rpio9kxFAjtVr1874mnFqnA19LhaGwcXD1xPDEOrp6Q2XND67HnRtaTqoesJyyNg6vHlihaj1UQth6flpL11Oy5oaencHFD7z1eS50e2QRriJ7cZBuLmyc3sJ7BU9c4oHqsG4iIyM6whsjFGiKXcg3xptMwFAiX9Xb53jObx+bCvZaOxkPj4OqJJ04PWE+W+UABrCdN1APWk6gHvbgt1UPWk/o4DqzHFiJaj6/UYevJa8bh4iaV9PgSeKdHNsMaoic32cbJzTTAeh67A+OA6rFuICIiO8MaIhdriFzKNcSL81NDgXB791C+9yRLX3kEvpbOvhbGwdXz7fSQ9eT+6UbWU/iXNXp6HB729OjHxU2qLm5OD3l6DMPFTdSzl3uPYZD12KQCYg3RvUecnj2fnude3zigeqwbiMh+8SPAAP8EwUDq5HyqAAAAAElFTkSuQmCC',
		'crButton':		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAPUAAABkCAYAAABei3aDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAFkpJREFUeNrsnV2MJNdVx09VdVV/Tvd89czO7I69u7G94M0aDDgQsGQUDEEokiXDA+KFSEQiKEICBBI8gBYJniDKAyF5wCISSAlIyBKYCBSZjW0SJ44tvP5ar73ZD+/Ox+7OTM9Mf3dXVxXnf25VTa+n89JtlPVwzm5vV1Xfur9bK9Wpc27d+79WFEWkpqZ2eMzCTb300J/pna2mdkgsk2w899t/RxnHokLOoZmf/xJFYUjdq/9KTuko2bl54gMUdLbIW3iY/O0L7A5syh75Gdr99h+R7RYpM3eGwm5Ntu3CIjnFZeqt/hfZ2VkKWhuUmTlFYWeTIr9BrfVXKFua5ypcqdNyPOq0W1Qoz1Pl43+pbGUrewJ2+qR++4s7NPPYF9XNqakdlif1+Rf+Wb7funCR1tfXKZMrUW56mQadOnX3brJ3yFEe+70m9Rq3yWavkysv8n6L+q2alLfYswR+VzwMtqMoQIRPTiYrx8PQF2+UyU5RdqrKP1kUDfrym9/Zo5C3pVHKVrayx2anN/XFtYF8n/38U/TvT3+NwT1a/vEnqHz0QVp9+V8YukHHH/00w7bo+ne/SjPHf5KOfPSTtH7+36izs06lxfuotXmVCrMr1G/vMNMhN1embv0Wn7NJ+Zmj5ObLso3yucoiVU89xuXv4YvJkt/eo73V16l29WVlK1vZE7Cds2fP0ue//M2zv//Yq/TUsy06efxe6s8+TEGvTTvXXuGTpmj2xCO0e/28eJli9STV195irzFFDnuWzYvf5MqW2ZNss5c5yoCbNOi2uBFr4m2K1eMU9NlDtXbE2+RnjrEHK1KntkqNjbfFQ0WBT15xmqYWH+D/hCPKVrayJ2CnN/Uf/8o1+uunt+iBBx+ita0mFeePS+iwt/aGPP7LR0+zh3mT7IzLYYErFaKBra1r0ihY4HcklMiVF+QDCI6hHoQOAdcDb+SVZvnYPDeAG9HcZu9zmS/8Ha7rKtfvKVvZyp6AnXaUvfqH/0hLv3mNnvj1z9B/PPO0VICCXnFGYnzHK/CjvSIexyvOUnv7PfnGYx+VOW6eLCfDx69LzlBefpAbtcoxfyh5QhjnFDgfhguyOQ9o3r4k++gJHDZlK1vZ47HTm/rFzz1FJz+7wTf1b9Gzz56T2ByF5WU2J+Rh0JdHvGXb0rAoNDm4W6hIQ2DdvVuyj8rhiRD/I2yw7IyUj8JA8gXkCq3NK5ITZLIlvuDLUi8SfuwrW9nKHp+ddpSVFk7xvxtSePbkx6QSA2lLco/wIHDbEkoMeg3xGsXqCc4B6nKO8TJlLrsrDUJIAA/k5qcl3IBHQh4Aj1KcPyGhBT65iiUJPraRgyhb2cqejL1/U5/5HQxBkTu9eeuSeBBUlDz2EecTFSjDyT4qw+/wRigDUH39LenCxzY8k+VUJcmHJwn6ndiLDKi0eL/UjxwDHgaNcLycdBwgzFC2spU9GTvtKPvMmWfor/7pMj30079Ab77yvHiK8tKPSCNChvTqt6SB8DJI2uFVkMxjP0ns8W6u19wSgM2xP/KE4TACXfH4vV27wZHBR6SXD04EuUMmVzS9hZwjKFvZyh6fnebUr//5C7Tw5PP0qSd/g5771kvyyEe4gHdp8BaI30sL90m8396+IZXhcY/KBt2m8Rwc1wOO8AFhAS4E+QO64uGJYI6X54tYEg+Dd21I+lEOOUVGevgiZStb2ROw0/Dbrf4E//t8PNrFkkc8GpIYPAAaWN94WwDIB5ALwJtIws+VIz9AA+F5UAb76BBAQ2QUTGzIK5KkHl3+aDguEJ4M+YGyla3s8dnpTR35LfnGIx4vsE0CXpGX4TB4DZyEiqS3jr0GjqHMoNtIK48olKQf3sQKHakLFwYozsGQOXwjv0Dij4uQbn6ZAmopW9nKnpCd3tSY/SE3NYcAePwDZLrdDRTD1HB8v7vdhBJ4smMb41QlznezAkCIj5wBF5DAkgvDOainV980ZTmfMGFEpGxlK3tCtp1OrHaLZsSK9KKF8pGu9KAf97bZ6XFxAhwC4EU4wgNA4JnMIz+Ke/V6JrdgiOQR3Hh4IHQUmAuqy7ZbmDYv1blBSf3KVrayx2enNzVhZglubicjT+vEcJMjJEAIIb1vSfHAeA+UTz0Jg8U7yYt0P07qPSmbRAH9Zi2tCy/S0WB06SehiLKVrezJ2Gnv94UvrNLs41/hZP0YBaiAT5CKYrkjVGI5DiIHk/wPH8coGfEeUTpiBg1APhGFkbxzM17K4nChbTwLGur3pGG4EHlHZxkfo2xlK3t89n5HWXynt2urH9hkbST5+96oPXJb9v8PJoorW9n/X9n7HWX9Xdr6+hNk56rUv/USeUc+TrV3nqGpuRXKHnucMtP3Ue/Gs3TznXO0dPpTIs3ib71GQWuNrm606fQnfpfWv/e3NDu/TJ36BpVP/rI4iijoke1NidwKyjrFJc7fyxT5TXKm7qGgeYO6t89zPsDHBh2ysxVlK1vZE7BVeFBN7ZCZpRLBamqHy2z9L1BT05taTU3tbg+/NadWUzs8pmL+yla2ivmrqal9KJ7Uw2L+m7ttGbIGtUIjLL4l4mnZcpWCXkfmbmJ0jFeak5EsmDGC8hjpgtEzRmjcivWXLBlFIyNngoEcw6RvCKrBQgxMj2emYNQNTNnKVvb47JFi/t957ZoUWDz9uKg23HrzGyIYfuynflWmeW289nWRM52/7+fo9tvnRJ6lMHdPrMV0RGacJGJraCzOgag59rGN8mgstI4xkRzjVXGxjZsXRSJV2cpW9vjskWL+0conZMgZwBn2DpWVM1RfNxO387PHqHn7+/Ec0SzVrnyPK1sQMTQsEQI4Bqj36rdjUfOj0ng0At4mP23UICDdAnVFlMc4V8xSKc4dN55K2cpW9tjskWL+NX9KCkKMHAJpePxPxUJq0EWyLEe8itEoXpcwA2YmeDfEOyHsSNYNkmln3MBw0JUGieQpH8NcUJSBdAvE06DphDmjyla2ssdnjxTzf/niLakAJ0FPCR4FmkvYxoRvNNasHjBjlvmIlR0QDmCiNzwSQgojaB5RdmohntTdl4uF4YJwYVh9wNidb9WUrWxlj8ceKeb/6lUz9zOZrC3JeTxNTFbaC4N4tT2SGB4fWLIyXzjwJXFHo6DLlAqNR6GEEFhZAN7KKDXkRVnRqDfYsq9sZSt7fPZIMf/KsTPiMVAIsTt65yB+BqUFKDVgG/M4sViXHOfGIDwADDkBKgYcoQPqMR5nlgIOG9AALB6GieNY3Av78DKydGfGU7aylT0he6SYf3vneqoljJAAXe2JIgM8TCJ5lMTzADVuvptC4ZkQNiDs6OyuSUONFwmoMHevqCn6nV250ERzCdtoZLumbGUrexJ2Gn6/8RcvUfWJb9Cvffr36MXzlyVMqBz7qDz2/W5detqQpKP3DoZudCMynpUwAI0AHB5H1s1lDyI6Sn5POgFQDj13kF1JlvrEaBvkBFgyBIk/wg6Tiyhb2coelz1SzP+NDTsWEl+QxiE/QMyOFfxgaCBCAjzu4RmM4oIlngbyLehWR6KfqCFCeByhhMwgyRhvhaQ/UVBMOg+SvEHZylb2+OwfIOafEzDW2E0MHge5AN6fwWMgjscjH2CEA9BPEvEz/phwoz0kNO7E9RqDRzKjaiIJIdBwXCAuHF5K2cpW9vjskWL+8CxJAo53YvJ+DBVg/VuGSW+dZacrB6Ch6I1DboALwDnwJvA88CDiTWTJECfu6XMow42XXIJzgnQ5z1gLWdnKVvb47JFi/njMowdO3ptBS1jGppocwHyiuBI7FSg3Y097cr50xQckDTLi5M6QyHlg1tZ1s3FjBtJYU2eobGUre0L2SDF/E/tH8ePdlxffCSjJC/DYRyUiNB47gvSpj9UJhnWIbVsSfjQcFyHLiXSb0gAszYnvO+tXtrKVPS57pJg/HunpYfYMZsHrXBpWmOO+VIyyZjswouLxUiNJOICww3goA0fYgU4E/IbeQdQvi2kXTCiibGUrezJ2WrPlZOX73HMvyIwSTBWL4oJxgB8DOSwIgjuO73sYikfMWNIYhy8KvetodGc3i1+ky96K19qVd2tBIALmtu1yi4xgubKVrezx2SPF/D9IQX81NbUfkkiCivkrW9kq5q+mpnYXmor5q6kdMlPdbzU1vanV1NTu+vBbc2o1tcNjKuavbGWrmL+amtqH4kmdiPl/+cqf0HrnCuWcIk27VeoGLdr1N8m1szTnHaF20KS6vy37FXeOf29Tc7Ar5W3+40fxeFTLoTDWWHItT44PIl9mqhScKSq7RuQcx/phjzpcr8/fMGUrW9njsw+I+X/1H75G//OldQr6IZ34xVma/kiOrvxnjdqbPp16skq93QFdemaL5k8XaeXRCr13bpdat/pUvjdHjbUelY541NsbcKhhkVdyqL3lU3dnQMUFl9yiI9vtzT7l51xaemSKSstZcjyL+o2Ati+2afONlrKVrewJ2AfE/KsPFql0NEtBN6LNN1vkFmxa/LESbV1oU78eUPmeLO1c6sjJLuffa9/Zo+KiJw3BNxo2aIfUvt2nzvaApvhigl5IPT4XZUpLHmVytjRy5/sd6mwNKAogcZqh6RM5ylddZStb2ROwD4j5Lz9SpubNPk0dy1J+JkO1d7GOT0Cz9xdo512Ip2HdHksa65Uz1FyDkLgj482DXkT9ZkD5eZfys654ExzLz2WkjN8JqMMNyk5nKMd14wJQZu+9Lu1d61HjBmay2MpWtrInYB8Q8//YH6zQ639vJFZyfFK2zAVbIWXyNnlTjniJHDcWYUC2kqFOzScPj/ysLQ1pbvQp9EMOKfLUYueAiSWFBYimReJNOttmVkoSjuxd645M9pWtbGWPx05z6k6nl4I8DhHcIuZrEnuQkGN3/m4FErfDmh2ulEMJwBBOoCFSB8f2iOsDnyvvhnJOoeoJLPTNq3BMGUOuUL/R5QZYVF7JyXbym4Qcyla2ssdmHxTz5x+qZ4pSCbYHfCKSe4QHg47Z7jc4bud8ocIN7XOlKAcv43LSjrge1t0JxTl47IUQbiBc6DdC8SjllayEFsgJYIUFT7Zt9mjKVrayJ2MfFPNn75CECniUw6Mg4bcdSyoNB2iETcQeBl4EMIBq77bTJzw8EXKJDIcLe/BU/VDKBRwyzB8vSP1I6OFhcEGOR9JLCC+lbGUrezL2ATH/R//0OL3yN0YkoXqmJN4EyXj7ti8NGw4DAJLGcJyPMAAhAL6xj1wgCqP0GBqLnjtcBC5KOgnYszTXe3KBuFipN85FlK1sZY/HHlI+6aUweAMUwjYag8ahkspxIxaO5BwzNnFMOgVqgXgZfOA9EB4AhpwAPXnJdoPrQgNxoUj6G6s9Sfrhdbrs0dAZoGxlK3tCdnJTJ2L+SMAhiYSQALA0PF82Ddy9bLrf0SjE//AskvAHZMIGDgMKVZf8ZiD7mTw3xOWQom+S+AHHFGgwGoBPLu72xwVKb185o2xlK3sCdjr1MhHzd/iu79UHaS94Yuhyh1cBTHrw+MZPQgW8CEdij/dotm1GzaBmjHiBR0H3O7bhdfC7xd94p1Zc8ORihR+ZXkFlK1vZk7EPivm7RlsYFbhxmIBtDHkbNmmcRZKcwxPhZToagMQdybrDRJyHC4AXQVl4IWHF0QBCDpSFB0IHHUIIZStb2ZOxD4j546R9zxGkvXPvNxyX5J29SiY7JB+OBofmd3ESnmXCeU74pWzOji/IbCMMwTe8zLApW9nKHo99QMxfknF3/zC6ytG7hjBiuEHShc7xPMojD4dXAVhegNsm9kc9Dn9QNokC0MuHXjpsI9RAzoB9jKqBx1K2spU9GTt9pXXhC6s0+/hXqHjEk4QbJ+CThAryiI+BYXDn8XQ1EByKY34TLljp0z/xXMk2zkveq6FRGFEjdREpW9nKnoB9QMxfxpJ+QOa397eHw/rh7VH7yla2ssdnq5i/spWtYv5qamp3s6mYv5raITPV/VZT05taTU3trg+/NadWUzs8pmL+yla2ivmrqal9KJ7Uw2L+e/42eXYuFRJvDHbIsTI07c5TP+zy/q7slzMz1As7Ij6O8o7liGC5SdZtCsm8DPfsrByH8HjEf7J2nkqZivyGY/itG7YpiOKZK8pWtrLHZo8U81/7bl2Gth372QpNrWRp9b/3qL3t04lfmhG50+vP7dLM/XlafLgkZXsQEl/yZDQapFtk5ohjpp1BzgUTw0XCFCLnvI3ykE+FThO0nDB8DgPRdy93qXaprWxlK3sC9kgx//kfLcqQM+gRYzzpzAN5aQjmdGJ1AOgX4zgGl2++3hKZU8zpLMx7RlOpH1F324Agr4LGQ6sYM1YwtxTjVfF7/QZ7rpoROcdKA6VlT7SMla1sZY/PHinmj0HmJS6YrTi0e61LYS8SmZU6g6x4AjiW+kADoZbo5s3AdUwFw0Tv/IwrU80AiLiuZNoZRMdFLon3cxXzO9QbIPVSv97junyZaqZsZSt7fPZIMf/b55smTi87ojncj+eHAgCPAyUGrOKBaWTwHvgNXgnhAMTT4JEQUkCUHFaYc2WWCqaP9WJd4yQcaSRyLu97qaZsZSt7PHZ6U7/4uafo5Gc35KauvdOWCdcU7g9REfUFnBDP40xGl8qqAgUzwRsSLdiHwgOmmAGencmIV8I5uCDMM0WugNwAnkfWG8LMsHhqGfaVrWxlj88eKeY/e6ogioeYr4m4PxEZTx79omHMsT68EI6jHED4YB+rDiTaSkn4ADlTP14DCDkD8gGRSeUGQTYV2xAvV7aylT0Ze6SYf3PTyJOKUmGcrMMTwJ3AQ6AyTOBO4nmLQdA0TrwPpFUQVkCFAZ4kEV1AnVgNsLHWF48DD4OlQ4jrxzZ68aCuqGxlK3t89kgx/9Vv70mYgPBBVtJrBZK040RIlcLQ6yZxftwYacTA9MBhX0KLyOgopV4njvuRI8CLobsfqwOKZCrUFpkpuYiyla3ssdk/QMzfkRNl4Wz2AsgP4BGmjmZNmS1fvAk6AKQrvWEkTSEvnI17+wCDpxF10njBP7yHQ7KPC4VYmllnyDcXyQyEEcpWtrInY48U85deOQZ34p41WLHqycnokg+6Rv0QYmdYsU88CzwGzuVPbtaEG0G8qFfSFZ/0CMBxpBwOIaCJLJ5q03ThK1vZyh6fvf+kHhLzhxeAJ0GlaAQMXe5YGSCIdZDQQ5fAJJHnsCDRO0ayLgtnO5aMjoE3AdRKVFAt06MnawTBywx18ytb2cqejD1azJ//IjRABUlvW5IDyCdO8AFNlgJJ1vzBOdIBEC/RaRoXw7JmRT/85timMbIsib+vnKhsZSt7MvZoMf/IVAqPITKkkB6NQYm3EaBjhMbFewxplMtiXQNTEL+hYfBWchHJCn4QHed8A9368lLdtvbrV7aylT02e6SY/7CgeBivUP/+ShO9YjzZxQMFpnJ4EtE6HphwAOH8MBxhA5YPkfWEdgeSM6D3LwlFlK1sZU/GTsNvyzG9bhef3pSEPQkX9jVSzLKagEQB3XH8gJyKLfO9JRRI1s9NvBQiAckFEEr0w3RkDHr50rBD2cpW9tjskWL+H6Sgv5qa2g9JJEHF/JWtbBXzV1NTuwtNxfzV1A6Zqe63mtohs/8VYAB/Gb/p8SVf1wAAAABJRU5ErkJggg==',
		'crButton2':	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAUAAABkCAYAAABOx/oaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNrskk9Kw0AUh2cmE1NSgmIotKDVXQUJXXkGD6HSO3Thzo3exit4BUFQQVQQdGFFabVNTfNnJlFnWl/jy8KFuMqsfvMlM+895qNZlpGfi9a9gxztnR9SfrZ/TChjhJoOaR9tqw+ssXdN6jtXueNsabWtglFtAAyHT7MI8LsitwEurnj6uLMGMBg8qJDJCUAZ64307wHyiqNTmgBkBtcsHgFMJsNpofU5GI71n0EPoOXUpo0aANNEVzddD2A0HqgQP58CpJSqcHdzOdcSt1Ro1jieyG7tAhSRbikTMDvvn3SI6F8Q8Xb7ud3ScLPb/Lox/5pFT8xIwSqEpQylDH8mg7thYxmCl+SXMrgtG8vgP0ZYBhGmWIaFqlEgg0mxDLEvC2R4l1iGyrKJZZBRimUIXwWWgejieRm4xbAMs4lyMiSBLGUoZfhfGT4EGABtayHg/V2EvgAAAABJRU5ErkJggg==',
		'iconFavor':	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABIBJREFUeNpsVFlMXFUY/u4yM3eGGWZjuDBsZceBQuk0MB0qFoXUQqm1ahd9oInRovXBWBPXN2tiTB+MNWmjaUxNH4xR8UGpRcBK2YpFipV9LdsMMJQZGBhmufd6ZqBEEk/y3Zyc/z/f+e53/v8AZyVs4zWJwomBHAAsAYXKm8CbEouapSRYXg+vbY7qW4CxAHipD3glYIGpyLC1Z3vQEIIA4dwGzRZBYdxMDHmBjZAKgv8QVidiI2uF7wPqZAZLvUD/t4BCZobPoScxZpuVtxNiMQAIG5sIhTQUyx2Aik8gYRnuvAMsDbOE2Iygd3Mt7QWQOR0hYBXhbyKUfMwOxbE2bCZIAgGRG9jI3sVripFyvAxyvRqeUXKYLw4yTS7k2rjIZr8bEIUYMHJiR75eyaAayUftUBiiI1yWs4AmhSRyUWZiQRwtSJas+EDNkT1ReT/S588/YGiV4OyoB8OlsgpVbkgWnU5saoffBXAGHrnvaZVpVW+Yo8RyR+6LOesSK6Dv4ldEkA+iSHyhuGw87K9gVMbT9pxo+5kSie0c8Ssdyv02kUtIZFnw8bypeGWufwHxj4tIO5nLqE3PxWfYnz9okVV/WEVrNTqDySXyGW7tAROMVi1kSobBbNMcpn7+W3T1Dg56M5PbF5LS79282ie2v3UDEz80MruqLLbCjD2T0841ceXBFOZvc6w+47DKe0+xJmn4fTka7v7QzPr0rAMrywtKab4jAO+kn4G5jMKedwUMXXWSy3B61QWlUs/HLawmrk/xxOWDVmth6WmbQr8s6vULLr+PcrW2IaG81NN9uXFxbn65X7Jldra2uBZH/xySei7UYar+NubbRik820UR79IR8j9FyTXWM4fSTnaP+ySdXk/vTqE0x/KB8mxglFh76RePd3B2zWOMMRr/GnIsjk17FkLKpFRMN8xgqfsOgp5mzDS2ktJ0sqgrClfvOGRRDyWd5W699rrNPdLg8q89DLRwaYbho8/s1Z/SMJ/8tCJ8f+WzIfl6e5f52LUTrvv106G+736D5dW9GL0+ibnmZnCmAVKaa4RPfFR51FYdKlHZ9AU0qefI/BBBGZ6urzt6RZJU5V+OgVFcIF1QoqqZGKaSKz8n8VLYL52DYfdxMk8lkG81Ck1vEYdVh0AxPgje21if6yJn3UX6qd+ZgUsfDY4ueLmJr9ugy+tlqm8U782OjWbi7UqwUW6sz96AQkd6G4vg9wcQUyiEFTP/7W/kvx3upiC51VXYLnLIeblA4ktKQnJDSUCdK4+21j5pL953uLaMNY35ks3BuPKUDfVjvKTLUyGpUgZd1ipcPUH4nBK1gzjiiMRGWpeWiYgtUlPa7ExFQe2nwY4POinO6EViRZbVXnGkp+mb+4HZ9hasjreRS3OQpliGb36J7PURCOxO4rAjxBISgEgeJ2ebW3LdG95IqmzAdFM3+cNJCFJCL29ND07+2krUtSC09g/JJ68VAtt7CRGN/x+P3joBFL1KCHvAyEYi1eO41bLhdv4huYc6t0jnCDxbSoOP1P0rwAAkf9GQOT3AIQAAAABJRU5ErkJggg=='
	};

	function L_en() {
		var t = [];
		t["SCRIPTNAME"] = "Script name";
		t["SCRIPTVER"] = "Script version";
		t["SCRIPTWRIGHT"] = "Script creator";
		t["SETTINGS"] = "Configurações";
		t["SETTINGS_TEXT"] = "Escolhe as extenções que desejas.";
		t["SETTINGS_FOOTER"] = "Nota: Podes ter de fazer refresh á página para ver as mudanças.";
		t["OPTFORMATTER"] = "Formato de relatório";
		t["OPTQUICKBAR"] = "Barra de acesso rápido";
		t["OPTPRODINFO"] = "Produção";
		t["OPTFARMERHELP"] = "Ajuda";
		t["OPTISLANDPM"] = "Mensagem na ilha (aliança/todos)";
		t["OPTMESSAGELINK"] = "Msg-Popup";
		t["OPTREPORTLINK"] = "Relatóio-Popup";
		t["OPTBUILDINGPNTS"] = "Mostrar os pontos dos efificios no senado";
		t["OPTUSERLINKS"] = "Ligações para o mundo-Grepo";
		t["OPTALLYLINKS"] = "Ligações da aliança para o mundo-Grepo";
		t["OPTREDIRECTCLEANER"] = "Remover caminho para Ligações externas";
		t["OPTRESCALC"] = "Mostrar recursos na Parede e Simulador";
		t["OPTARROWCNTRL"] = "Saltar relatório com teclas direita/esquerda";
		t["OPTSWCITYCNTRL"] = "Mudar de cidade com teclas ctrl + direita ou esquerda";
		t["OPTWALLSTATS"] = "Formato para quadro de estatisticas";
		t["OPTQUICKCAST"] = "Abrir janela dos deuses clicando no corrente deus";
		t["ABOUT"] = "Acerca";
		t["NONE"] = "Nenhum";
		t["IN"] = "em";
		t["ATTACKR"] = "Atacante";
		t["DEFENDR"] = "Defensor";
		t["CBPNTS"] = "Pontos de combate";
		t["APNTS"] = "Pontos de ataque";
		t["DPNTS"] = "Pontos de defesa";
	//	t["UBBC"] = "BB-CodeXXX";
	//	t["TXTC"] = "Modo textoXXX";
		t["FROM"] = "de";	
		t["ATK"] = "ataca";
		t["CITB"] = "Bonus de combate";
		t["OF_WHICH"] = "dos quais -> ";
		t["WITH"] = "com";
		t["LOST"] = "Perdas";
		t["LOOT"] = "Saque";
		t["NOLOOT"] = "Nada";
		t["NON"] = "nenhumas unidades";
		t["Wood"] = "Madeira";
		t["Stone"] = "Pedra";
		t["Iron"] = "Moedas de prata";
		t["Favor"] = "Favores";
		t["BH"] = "População";
		t["RESOURCES"] = "Recursos";
		t["SPYCOST"] = "Custo da espionagem";
		t["SPY"] = "espiar em";
		t["UNITS"] = "Unidades";
		t["BUILDINGS"] = "Edificios";
		t["MENU_EXTRAS"] = "Ligações";
		t["HOUR"] = "h";
		t["RESCNTR"] = "Tempo até cheio";
		t["NOTEMPLE"] = "Nenhum templo";
		t["islandPME"] = "Enviar mensagem a todos os jogadores da ilha";
		t["islandPMA"] = "Enviar mensagem aos companheiros da ilha";
		t["TILX_RES"] = "Saque máximo do corrente ataque";
		t["TILX_MOOD_DROP"] = "Redução da moral do corrente ataque(se saque máximo)";
		t["TILX_STR_DROP"] = "Redução da força do corrente ataque (se saque máximo)";
		t["TILX_STR"] = "Aumento da força do corrente ataque";
		t["TILX_STR_PREV"] = "Aumento da força dos ataque anteriores";
		t["TILX_STR_NOW"] = "Força corrente da aldeia barbara";
		t["TILX_STR_TOTAL"] = "Nova força";
		t["TILX_TOWN_ID"] = "Esta ID liga para a cidade com o seguinte bb-code: ";
		t["GREPO_FARM_NOT_COMPATIBLE"] = "Esta extensão de Ajuda não é compativel com esta versão do Grepolis";
		t["OPENINPOPUP"] = "Abrir o link numa popup-window";
		t["CLICKNCOPY"] = "Click uma vez e copiar (ctrl+c)";
		t["NOMILITIA"] = "<em>'Melicia'</em> não conta";
		t["RCATT_LOST"] = "Total de perdas do Atacante";
		t["RCDEF_LOST"] = "Total de perdas do Defensor";
		t["OPENRESBOX"] = "Abrir janela de recursos";
		t["CLOSERESBOX"] = "Fechar janela de recursos";
		t["WALLYOURCOSTS"] = "Suas despesas";
		t["WALLFOECOSTS"] = "Despesas do Oponente";
		t["RAWMATSINCL"] = "Recursos usados";
		t["RESTABLE"] = "Tabela de recursos";
		t["QuickCastText"] = "A imagem mostra o deus<br /> que esta cidade venera.<br /><br />Clicando nele <br />abre a janela de poderes<br />para a cidade corrente.";
		t["MYCOSTS"] = "Minhas despesas";
		t["FOECOSTS"] = "Despesas do oponente";
		t["SIMSTATS"] = "Simulador de estatisticas";
		t["STATS"] = "Estatisticas";
		t["WALLSTATS1"] = "Vencedor como atacante: ";
		t["WALLSTATS2"] = "Vencedor como defensor: ";
		t["WALLSTATS3"] = "Derrotado como atacante: ";
		t["WALLSTATS4"] = "Derrotado como Defemsor: ";
		t["militia"] = "Melicia";
		t["sword"] = "Espadachim";
		t["slinger"] = "Fundibulário";
		t["archer"] = "Arqueiro";
		t["hoplite"] = "Hoplita";
		t["rider"] = "Cavaleiro";
		t["chariot"] = "Biga";
		t["catapult"] = "Catapulta";
		t["big_transporter"] = "Transporte";
		t["bireme"] = "Bireme";
		t["attack_ship"] = "Ligeiro";
		t["demolition_ship"] = "Farol";
		t["small_transporter"] = "Transporte rápido";
		t["trireme"] = "Trireme";
		t["colonize_ship"] = "Colonizador";
		t["minotaur"] = "Minotauro";
		t["manticore"] = "Manticora";
		t["zyklop"] = "Ciclope";
		t["sea_monster"] = "Hydra";
		t["harpy"] = "Harpya";
		t["medusa"] = "Medusa";
		t["centaur"] = "Centauro";
		t["pegasus"] = "Pegasus";
		t["academy"] = "Academia";
		t["barracks"] = "Quartel";
		t["docks"] = "Porto";
		t["farm"] = "Quinta";
		t["hide"] = "Gruta";
		t["ironer"] = "Mina de prata";
		t["lumber"] = "Serração";
		t["stoner"] = "Pedreira";
		t["main"] = "Senado";
		t["market"] = "Mercado";
		t["storage"] = "Armazém";
		t["temple"] = "Templo";
		t["wall"] = "Muralha";
		t["place"] = "Agora";
		t["theater"] = "Teatro";
		t["thermal"] = "Termas";
		t["library"] = "Libraria";
		t["lighthouse"] = "Farol";
		t["tower"] = "Torre";
		t["statue"] = "Estátua Divina";
		t["oracle"] = "Oráculo";
		t["trade_office"] = "Loja do Mercador";
		t["GWLanguage"] = "english";
		//t[""] = "";
		GE.Lang['en'] = t;
	};
	L_en();




// Thanks to randalph

	
	switch (GE.Server[2]) {
		case 'se':
			GE.L = GE.Lang['se'];break;
		case 'en':
			GE.L = GE.Lang['en'];break;
		// case 'de':
			// GE.L = GE.Lang['de'];break;
		// case 'nl':
			// GE.L = GE.Lang['nl'];break;
		// case 'gr':
			// GE.L = GE.Lang['gr'];break;
		case 'fr':
			GE.L = GE.Lang['fr'];break;
		default:
			GE.L = GE.Lang['en'];break;
	}


	var unitCosts = {
		//Wood, Stone, Iron, FoodPoints, Favor, Name, Booty
		'militia': [0, 0, 0, 0, 0, 0, L('militia'), 0],
		'sword': [95, 0, 85, 1, 0, 16, L('sword'), 16],
		'slinger': [55, 100, 40, 1, 0, 8, L('slinger'), 8],
		'archer': [120, 0, 75, 1, 0, 24, L('archer'), 24],
		'hoplite': [0, 75, 150, 1, 0, 8, L('hoplite'), 8],
		'rider': [240, 120, 360, 3, 0, 72, L('rider'), 72],
		'chariot': [200, 440, 320, 4, 0, 64, L('chariot'), 64],
		'catapult': [1200, 1200, 1200, 15, 0, 400, L('catapult'), 400],

		'big_transporter': [500, 500, 400, 7, 0, 20, L('big_transporter'), 0],
		'bireme': [800, 700, 180, 8, 0, 0, L('bireme'), 0], 
		'attack_ship': [1300, 300, 800, 10, 0, 0, L('attack_ship'), 0], 
		'demolition_ship': [500, 750, 150, 8, 0, 0, L('demolition_ship'), 0], 
		'small_transporter': [800, 0, 400, 5, 0, 10, L('small_transporter'), 0], 
		'trireme': [2000, 1300, 900, 16, 0, 0, L('trireme'), 0],
		'colonize_ship': [10000, 10000, 10000, 170, 0, 0, L('colonize_ship'), 0],

		'minotaur': [1400, 600, 3100, 30, 202, 480, L('minotaur'), 480],
		'manticore': [4400, 3000, 3400, 45, 405, 360, L('manticore'), 360],
		'zyklop': [2000, 4200, 3360, 40, 360, 320, L('zyklop'), 320],
		'sea_monster': [5400, 2800, 3800, 50, 400, 0, L('sea_monster'), 0],
		'harpy': [1600, 400, 1360, 14, 130, 340, L('harpy'), 340],
		'medusa': [1500, 3800, 2200, 18, 210, 400, L('medusa'), 400],
		'centaur': [1740, 300, 700, 12, 100, 200, L('centaur'), 200],
		'pegasus': [2800, 360, 80, 20, 180, 160, L('pegasus'), 160] 
	};

	GE.buildingStats = [];
	GE.buildingStats["academy"] = [L('academy'),"67","8","9","10","11","13","14","16","18","20","22","25","28","31","35","39","44","49","55","62","69","77","87","97","109","122","136","153","171","192"];
	GE.buildingStats["barracks"] = [L('barracks'),"33","4","4","5","5","6","7","7","8","9","10","11","13","14","16","17","19","22","24","27","30","33","37","42","46","52","58","64","72","80"];
	GE.buildingStats["docks"] = [L('docks'),"66","7","7","8","9","10","11","12","13","14","16","17","19","21","23","25","28","31","34","37","41","45","49","54","60","66","72","80","88","96"];
	GE.buildingStats["farm"] = [L('farm'),"17","2","2","3","3","3","4","4","5","5","6","6","7","8","9","10","11","12","14","16","18","20","22","25","28","31","35","39","44","49","55","62","69","77","87","97","109","122","136","153"];
	GE.buildingStats["hide"] = [L('hide'),"21","6","8","11","14","18","23","30","39","51"];
	GE.buildingStats["ironer"] = [L('ironer'),"22","2","2","3","3","3","4","4","4","5","5","6","6","7","8","8","9","10","11","12","13","15","16","18","20","22","24","26","29","32","35","38","42","46","51","56","62","68","75","82"];
	GE.buildingStats["lumber"] = [L('lumber'),"22","2","2","3","3","3","4","4","4","5","5","6","6","7","8","8","9","10","11","12","13","15","16","18","20","22","24","26","29","32","35","38","42","46","51","56","62","68","75","82"];
	GE.buildingStats["stoner"] = [L('stoner'),"22","2","2","3","3","3","4","4","4","5","5","6","6","7","8","8","9","10","11","12","13","15","16","18","20","22","24","26","29","32","35","38","42","46","51","56","62","68","75","82"];
	GE.buildingStats["main"] = [L('main'),"110","11","12","13","15","16","18","20","22","24","26","29","32","35","38","42","46","51","56","62","68","75","82","90","99"];
	GE.buildingStats["market"] = [L('market'),"108","9","9","10","11","12","13","14","15","16","17","19","20","22","24","26","28","30","32","35","38","41","44","47","51","55","60","64","70","75"];
	GE.buildingStats["storage"] = [L('storage'),"15","2","2","3","3","4","4","5","5","6","7","8","9","10","12","13","15","17","20","22","25","29","33","38","43","49","56","64","73","83"];
	GE.buildingStats["temple"] = [L('temple'),"216","17","19","20","22","24","25","27","30","32","35","37","40","44","48","51","55","59","64","69","78","81","87","94","102"];
	GE.buildingStats["wall"] = [L('wall'),"34","4","5","5","6","6","7","8","9","10","11","13","14","16","18","20","22","25","28","31","35","39","44","49","55"];
	GE.buildingStats["place"] = [L('place'),"33"];
	GE.buildingStats["theater"] = [L('theater'),"500"];
	GE.buildingStats["thermal"] = [L('thermal'),"500"];
	GE.buildingStats["library"] = [L('library'),"500"];
	GE.buildingStats["lighthouse"] = [L('lighthouse'),"500"];
	GE.buildingStats["tower"] = [L('tower'),"500"];
	GE.buildingStats["statue"] = [L('statue'),"500"];
	GE.buildingStats["oracle"] = [L('oracle'),"500"];
	GE.buildingStats["trade_office"] = [L('trade_office'),"500"];

	GE.Positions = GE_getValue("Positions"+GE.Game.player_id);

	var Css = ""+
		" #uList {border-top:1px solid #ccaa88;padding-top:13px;margin-top:8px;}"+
		" #uList textarea {width:98%;font:10px arial;}"+
		" #message_messages .message_subject {width:375px;} "+
		" #message_messages .message_date {margin-left:375px;}"+
		" .report_subject a {font-size:10px;} "+
		" .message_subject a {font-size:11px;}"+
		" #GE_Report {position:absolute;left:300px;top:360px;z-index:10;text-align:left;}"+
		// Wall- and sim-stats
		" #GE_Stats_Tbl {font-size: 10px;font-family:tahoma, arial;}"+
		" #GE_Stats_Tbl table {width:100px;border-collapse:collapse;text-align:center;margin:0 5px;}"+
		" #GE_Stats_Tbl th {border-bottom: 1px solid #9a8c6c;}"+
		" #GE_Stats_Tbl tr td:nth-child(odd) {background:url(http://static.grepolis.com/images/game/border/brown.png);}"+
		" #GE_Stats_Tbl tr td:nth-child(even) {background:url(http://static.grepolis.com/images/game/border/odd.png);border-style:solid;border-color:#9a8c6c;border-width:0 1px;}"+
		" #GE_Stats_Tbl tr td:first-child {background: transparent url(http://www.opendia.net/grepoex/images/grepo/icon_attHack.png) no-repeat scroll center center;}"+
		" #GE_Stats_Tbl tr:last-child td:first-child {background-image: url(http://www.opendia.net/grepoex/images/grepo/icon_defDistance.png);}"+
		" #GE_Stats_Tbl td {padding:4px 5px;text-align:center;height:20px;white-space:nowrap;}"+
		" #place_simulator {top:16px;}"+
		" #fcWallShow, #fcSimShow {background:url(/images/game/place/showhide.png) no-repeat scroll 0 0 transparent;height:22px;float:right;}"+
		" #fcWallShow:hover, #fcSimShow:hover {background:url(/images/game/place/showhide.png) no-repeat scroll 0 -23px transparent;height:22px;}"+
		" #GE_Stats_Tbl h6 {margin:10px 5px 5px;}"+
		" #GE_Stats_Report {font-size:11px;font-family:courier new, serif;width:95%;margin:0 5px 0 5px;}"+
		" #GE_Stats_Tbl th {min-width:45px;}"+
		" #GE_Stats_Tbl table tr td:first-child {min-width:10px;background-position:center center;}"+
		" #GE_Stats_Tbl th {background: transparent url(http://www.opendia.net/grepoex/images/grepo/icon_wood.png) no-repeat scroll center center;height:22px;width:100%;}"+
		" #GE_Stats_Tbl th:first-child {background:transparent url();}"+
		" #HeadStone {background-image: url(http://www.opendia.net/grepoex/images/grepo/icon_stone.png) !important;}"+
		" #HeadIron {background-image: url(http://www.opendia.net/grepoex/images/grepo/icon_silver.png) !important;}"+
		" #HeadFavor {background-image: url(http://www.opendia.net/grepoex/images/grepo/icon_favor.png) !important;}"+
		" #HeadBH {background-image: url(http://www.opendia.net/grepoex/images/grepo/icon_pop.png) !important;}"+
		" .building_special span.image {background-position:100% 100%;cursor:default;}"+
		" .thread .lastpost > a:first-child {display:inline;padding:2px 3px 0 3px;}"+
		" .thread .lastpost form a {display:inline;padding:0;}"+
		" .thread .date {display:block;}"+
		" .author .date {display:inline;}"+
		" .frmUserLink, .thread .frmUserLink {vertical-align:baseline;display:inline;}"+
		" .thread .frmUserLink a {padding:0;}"+
		" .forum_lastpost {margin-top:4px;margin-right:2px;}"+
		" #market_search .game_header, #market_offers_table .game_header, #market_create .game_header {font-size:12px;}"+
		" .text_bg, .text_fg {font-size:11px;}"+
		" #GE_prodinfo {position: absolute;margin-top:-4px;right:0px;color:#FFFFFF;font-style:italic;font-weight:normal;font-size: 10px;z-index: 10;font-family:verdana;}"+
		" #GE_prodinfo td span {color:#FFCC66;font-style:normal;font-weight:bold; display:inline;margin: 0;}"+
		" #GE_prodinfo img {width:15px;margin-bottom:-4px;}"+
		" .GE_bl {background:rgba(80,85,91,0.6);border:2px ridge rgba(53,57,66,0.6);color:#fff;font-family:tahoma;font-size:9px;z-index:10;position:absolute;width:12px;height:12px;valign:middle;text-align:center;padding:1px;}"+
		// Quickmenu and submenu
		" .toolbar li {float:left;margin:-4px 0 0 0;}"+
		" .toolbar li a {display:block; float:left; height:28px; line-height:28px; color:#FFCC66; text-decoration:none; font-family:tahoma;font-size:10px; text-align:center; padding:0 0 0 3px;}"+
		" .toolbar li a b {float:right; display:block; padding:0 7px 0 3px;margin-right:-1px;}"+
		" .toolbar li a:hover, .aHov {color:#ffb400; background:transparent url(http://opendia.net/library/gm/grepolis/menubg2.png) left top;}"+
		" .toolbar li a:hover b, .bHov {background:transparent url(http://opendia.net/library/gm/grepolis/menubg2.png) no-repeat right top;}"+
		" .liTop a img, .aTop img {margin-top:10px;margin-right:-2px;border:0;}"+
		" .toolbar li ul {border-left: 1px solid #7489a6;border-right:1px solid #b3b3b3;background: #f4f4f4;width:10em;font-size:90%;position: absolute;left:999em;z-index:20;top:27px;text-align:left;margin-left:1px;}"+
		" .toolbar li:hover ul {left: auto;z-index:99999}"+
		" .toolbar li li {background:none;float:none;border:none;border: 1px solid #999;border-top:1px solid #fff;border-right:none;border-left:none;padding-left:0;margin:0;display:block;line-height:1.4em;position:relative;}"+
		" .toolbar li li a, .toolbar li li a:link, .toolbar li li a:visited, .toolbar li li a:hover {color:#000;padding: 3px 10px 2px;display:block;float:none;line-height:1.4em;text-align:left;height:1.4em;}"+
		" .toolbar li li a:hover {color:#000;background:#e8d995;}"+
		" .fcWinHeader {cursor:move;font-weight:bold;background-image: url(http://static.grepolis.com/images/game/border/header.png);background-position: 0 -1px;padding: 3px 6px 3px 6px;text-align:center;color: #FFF;font-family:tahoma,arial;font-size:12px;line-height:16px;}"+
		" .ge_button {background-image:url("+image['ge_button']+"); background-repeat:no-repeat; color:#FFCC66 !important; height:19px; margin:3px 2px 0 5px; font-size:12px;line-height:18px; font-family:tahoma; text-align:center; width:120px;float:right;}"+
		" #GE_wood, #GE_silver, #GE_stone, #GE_favor {background:url(http://static.grepolis.com/images/game/res/res_small.png) no-repeat scroll 0 0 transparent;padding-left:20px;}"+
		" #GE_stone {background-position:0 -16px;}"+
		" #GE_silver {background-position:0 -32px;}"+
		" #GE_favor {background-image:url("+image['iconFavor']+")}"+
		" #GE_Settings {top:390px;margin:0 auto;position:absolute;width:152px;height:25px;left:11px;}"+
		" #GE_Settings_A {background-image:url("+image['ge_button2']+"); background-repeat:no-repeat; color:#ffb400; display:block; height:25px; margin:0 auto; font-size:10px;line-height:24px; font-family:tahoma; text-align:center; width:138px;}"+
		" #GE_Settings_A:hover {background-position:0 -25px;}"+
		" #GE_Settings_A:focus {background-position:0 -75px;}"+
		" #GE_TownId {float:right;}"+
		" .fight_bonus {display:inline;font-size:11px;padding:3px;}"+
		" .oldwall, .morale {float:left;} .luck, .nightbonus {float:right;}"+
		" a.crButton, a#forumMarkAsRead {background: transparent url(http://opendia.net/library/gm/grepolis/crButtonR.png) no-repeat scroll top right;display: block;float: right;height: 24px;margin-right: 6px;margin-top:1px;padding-right: 5px; text-decoration: none;color:#FFCC66 !important; font-size:12px;}"+
		" a.crButton span, a#forumMarkAsRead span {background: transparent url(http://opendia.net/library/gm/grepolis/crButtonL.png) no-repeat top left; display: block; line-height: 20px;padding: 2px 10px 2px 15px;}"+
		" a.crButton:hover span, a#forumMarkAsRead:hover span {background-position: left -25px;} a.crButton:hover {background-position: right -25px;}"+
		" a.crButtonA span {background-position: left -50px;} a.crButtonA {background-position: right -50px;}"+
		" a.crButtonA:hover span {background-position: left -75px;} a.crButtonA:hover {background-position: right -75px;}"+
		" a#forumMarkAsRead {margin-top:-25px;float:left;}"+
		" .report_units_overview #resources {margin-top:35px;padding:0;}"+
		" .report_icon, #resources hr {display:none;} "+
		" .report_units_overview #resources #load, .report_units_overview #resources > span:last-child {border-bottom:1px solid #CCAA88;border-top:1px solid #CCAA88;padding:5px 0;margin:5px 0;}"+ 
		" .report_units_overview #resources > span:last-child {border-top:1px solid transparent;display:block;padding-top:0;}"+
		" .fight_bonus {height:10px;}"+
		" .report_units_overview #resources h4, .report_units_overview #resources .bold {font-size:11px;}"+
		" .report_units_overview .res_background .bold {color:#FFCC66;margin-top:3px;}"+
		" #resources > ul {width:200px;}"+
		" #right_side h4 {text-align:center;}"+
		" .report_units_overview .res_background, .report_units_overview #resources > ul > li {background:url('http://static.grepolis.com/images/game/layout/bg_resources.png') no-repeat scroll 0 0 transparent;width:62px;margin:0;padding:2px;}"+
		" .report_units_overview .res_background .wood_img, .report_units_overview .res_background .stone_img, .report_units_overview .res_background .iron_img {display:block;height:31px;margin-left:15px;margin-top:0px;width:35px;}"+
		" .empty {z-index:4;}"+
		" #report_reports .report_subject {width:550px;font-size:11px;}"+
		" #tilx_res_cont {min-width:120px;}"+
		" .tilx_infos {display:block; padding:7px 2px 0 40px; height:23px; border:solid #f7cd81 0px; overflow:hidden; white-space:nowrap; background-position:3px 50%; background-repeat:no-repeat;font-size:11px;}"+
		" .tilx_infos.error, .tilx_infos .error {color:#c00}"+
		" #tilx_booty {vertical-align:-2px;}";
	GM_addStyle(Css);

	GE_Positions = GE.Positions.toString();
	GE_Positions = GE_Positions.split(",");
	var topX, leftX;
	if (!(GE_Positions[1] == "")) {
		leftX = GE_Positions[1];
		topX = GE_Positions[2];
	} else {
		leftX = "300px";
		topX = "360px";
	}

	// Functions
	function ajaxND(aR) {var ansdoc = document.implementation.createDocument("", "", null); var ans = $e('HTML', aR.responseText); ansdoc.appendChild(ans); return ansdoc;};
	function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
	function $t(att) {var aTb = document.createElement("TABLE"); $at(aTb, att);	return aTb;};
	function $tx(iHTML){ return document.createTextNode(iHTML); };
	function $r(att) {var aRow = document.createElement("TR"); $at(aRow, att); return aRow;};
	function $hc(iHTML, att) {var aHeaderCell = document.createElement("TH"); aHeaderCell.innerHTML = iHTML; $at(aHeaderCell, att); return aHeaderCell;};
	function $c(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; $at(aCell, att); return aCell;};
	function $img(att) {var aImg = document.createElement("IMG"); $at(aImg, att); return aImg;};
	function $a(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; $at(aLink, att); return aLink;};
	function $ul(iHTML, att) {var aUl = document.createElement("UL"); aUl.innerHTML = iHTML; $at(aUl, att); return aUl;};
	function $li(iHTML, att) {var aLi = document.createElement("LI"); aLi.innerHTML = iHTML; $at(aLi, att); return aLi;};
	function $i(att) {var aInput = document.createElement("INPUT"); $at(aInput, att); return aInput;};
	function $d(iHTML, att) {var aDiv = document.createElement("DIV"); aDiv.innerHTML = iHTML; $at(aDiv, att); return aDiv;};
	function $sc(iHTML, att) {var aScript = document.createElement("SCRIPT"); aScript.innerHTML = iHTML; $at(aScript, att); return aScript;};
	function $f(iHTML, att) {var aForm = document.createElement("FORM"); aForm.innerHTML = iHTML; $at(aForm, att); return aForm;};
	function $s(iHTML, att) {var aSpan = document.createElement("SPAN"); aSpan.innerHTML = iHTML; $at(aSpan, att); return aSpan;};
	function $ta(iHTML, att) {var aTextarea = document.createElement("TEXTAREA"); aTextarea.innerHTML = iHTML; $at(aTextarea, att); return aTextarea;};
	function dummy() {return;}; //does nothing. Used when there is no other choice but need to use a function
	function getRndtime(maxrange) {return Math.floor(maxrange * (0.6 + 0.4 * Math.random())); };
	function basename(path) {return path.replace(/.*\//, "");}; //name of a file from a path or URL
	function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);}; //returns the element with the aID id (wrapper for getElementById)
	function $gt(e) {return document.getElementsByTagName(e);}
	function $gc(e) {return document.getElementsByClassName(e);}
	function arrayByN(a, n) {var b = arrayClone(a); for (var i in b) {b[i] *= n;}; return b;}; //multiply every element of the "a" array by "n"
	function arrayClone(a) {var b = new Array(); for (var i in a) {b[i] = a[i];}; return b;}; //return a copy of the "a" array
	function dF(s) {var s1 = unescape(s.substr(0, s.length - 1)); var ts = ''; for (i = 0; i < s1.length; i++) ts += String.fromCharCode(s1.charCodeAt(i) - s.substr(s.length - 1, 1)); return ts;};
	function arrayAdd(a, b) {if (!a) return arrayClone(b); if (!b) return arrayClone(a); var c = new Array(); for (var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]); return c;};
	function removeElement(ex) {if (ex && ex.parentNode) ex.parentNode.removeChild(ex);}; //remove the "ex" element from the current document
	function L(xT) {if (GE.L[xT] != undefined && GE.L[xT] != '') return GE.L[xT]; else if(GE.Lang['se'][xT] != undefined && GE.Lang['se'][xT] != '') {return GE.Lang['se'][xT]; }else { return '---';}}; //translated t item if available
	function moveElement(ex, dest) {removeElement(ex); dest.appendChild(ex);}; //move the "ex" element from the current parent to the destination "dest" node of the DOM
	function arrayToInt(arr) {var h = 0; for (var i in arr) {h += arr[i];}; return h;}; //Sum all the values of the arr array
	function insertAfter(node, referenceNode) {node.parentNode.insertBefore(referenceNode, node.nextSibling);}; //insert a referenceNode after a specified node
	function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;}; //Create a new element of the DOM (type, innerHTML)
	function $ls(aX) {return aX.toLocaleString();}; //convert a number to local string
	function pauseScript(ms) {var ms1 = getRndtime(ms); var aDate = new Date(); var crtDate = new Date(); do {crtDate = new Date();} while (crtDate - aDate < ms1);};
	function gG(url) {
		var point = url.indexOf('?') + 1;
		url = url.substring(point,url.length);
		url = url.split('&');
		var gets = [];
		for (var x in url) {
			var ok = url[x].split('=');
			gets[ok[0]] = ok[1];
		}
		return gets;
	}
	function GE_getValue(varname){return eval(GM_getValue(varname,'[]'));};
	function GE_setValue(varname,vardata){GM_setValue(varname,vardata.toSource());};
	function setAttributeOfElement(attributeName,attributeValue,ElementXpath) {
		var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (i=0; i<alltags.snapshotLength; i++)
		alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
	} 
	function ajaxRequest(url, aMethod, param, onSuccess, onFailure){
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = function() {if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest); else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);};
		xmlHttpRequest.open(aMethod, url, true);
		if (aMethod == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		xmlHttpRequest.send(param);
	};
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	function $xf(xpath, xpt, startnode, aDoc) {
		if (!aDoc) aDoc = document;
		if (!startnode) startnode = document;
		var xpres = XPFirst;
		switch (xpt) {case 'i': xpres = XPIterator; break; case 'l': xpres = XPList; break; case 'r': xpres = XPResult; break;};
		var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
		return (xpres == XPFirst ? ret.singleNodeValue : ret);
	};
	for (var i in GE.Positions) {
		var pos = GE.Positions[i];
		if (pos && $g(pos[0])) {
			$g(pos[0]).style.left = (pos[1].substr(0,pos[2].length-2) < 0 ? "0px" : pos[1]);
			$g(pos[0]).style.top = (pos[2].substr(0,pos[2].length-2) < 0 ? "0px" : pos[2]);
		}
	}
	function ft(sec) {
		var hour,min,time;
		time = "";
		hour = Math.floor(sec/3600);
		sec = (sec-(hour*3600));
		min = Math.floor(sec/60);
		sec = Math.floor(sec-(min*60));
		if (hour < 10) { time += "0"; } time += hour+":";
		if (min < 10) { time += "0"; } time += min+":";
		if (sec < 10) { time += "0"; } time += sec;
		return time;
	};
	function counters() {
		for (var i in GE.counters) {
			if (GE.counters[i] && $g(GE.counters[i][0])) {
				if (GE.counters[i][1] > 0) {
					GE.counters[i][1] = GE.counters[i][1]-1;
					$g(GE.counters[i][0]).innerHTML = ft(GE.counters[i][1]);
				} else {
					if (GE.counters[i][2] != null) {
						$g(GE.counters[i][2]).style.display = "none";
					} else {
						$g(GE.counters[i][0]).style.color = "#CC0000";
					}
				}
			}
		}
	};
	window.setInterval(counters,1000);
	$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
		return $.getUrlVars()[name];
	  }
	});
	function trim (zeichenkette) {
		return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
	}
	//cookie-based alternative for GM_*Value functions
	var value, newValueLib = function (prefix) {
		var prefix = 'tilx_' + prefix + '_';
		//cookie-functions by Peter-Paul Koch (http://www.quirksmode.org/js/cookies.html#script)
		var createCookie = function (name, value, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		};
		var readCookie = function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') { c = c.substring(1,c.length); }
				if (c.indexOf(nameEQ) == 0) { return c.substring(nameEQ.length,c.length); }
			}
			return undefined;
		};
		return {
			set: function (name, value) { createCookie(prefix + name, value, 365); }, 
			get: function (name, def) {
				var ret = readCookie(prefix + name);
				if(ret !== undefined) { return ret; } else { return def; }
			}
		};
	};
	function uniqueArr(a) {
	 temp = new Array();
	 for(i=0;i<a.length;i++){
	  if(!contains(temp, a[i])){
	   temp.length+=1;
	   temp[temp.length-1]=a[i];
	  }
	 }
	 return temp;
	}
	function contains(a, e) {
	 for(j=0;j<a.length;j++)if(a[j]==e)return true;
	 return false;
	}
	//Object.create() by Douglas Crockford
	if (typeof Object.create !== 'function') { Object.create = function (o) { var F = function () {}; F.prototype = o; return new F(); }; } 
	// Start of Drag-n-drop ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© Copyright 2007 Richard Laffers (http://userscripts.org/scripts/show/35277)
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;
	function mouseCoords(ev) {return {x:ev.pageX, y:ev.pageY};};
	function getMouseOffset(target, ev) {var docPos = getPosition(target); var mousePos = mouseCoords(ev); return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};};
	function mouseDown(ev) {var target = ev.target; iMouseDown = true; if (target.getAttribute('DragObj')) return false;};
	function getPosition(e) {
		var dx = 0;
		var dy = 0;
		while (e.offsetParent) {
			dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
			dy += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
			e = e.offsetParent;
		};
		dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		dy  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		return { x:dx, y:dy };
	};
	function mouseMove(ev) {
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		if (dragObject) {
			oSpos = dragObject.style.position;
			dragObject.style.position = 'absolute';
			dragObject.style.top = (mousePos.y - mouseOffset.y) + 'px';
			dragObject.style.left = (mousePos.x - mouseOffset.x) + 'px';
			dragObject.style.position = oSpos;
		};
		lMouseState = iMouseDown;
		return false;
	};
	function mouseUp(ev){
		if (dragObject) {
			var dOx = dragObject.style.left;
			var dOy = dragObject.style.top;
			switch (dragObject.id) {
				case "GE_Report" : GE.Positions[0] = [dragObject.id,dOx,dOy]; break;
			}
			GE_setValue('Positions'+GE.Game.player_id, GE.Positions);
		};
		dragObject = null;
		iMouseDown = false;
	};
	function makeDraggable(parent, item){
		document.addEventListener('mousemove', mouseMove, false);
		document.addEventListener('mousedown', mouseDown, false);
		document.addEventListener('mouseup', mouseUp, false);
		if (!parent || !item) return;
		item.addEventListener('mousedown',function(ev){
			dragObject = parent;
			mouseOffset = getMouseOffset(parent, ev);
			document.body.appendChild(parent);
			return false;
		}, false);
	};
	// End of Drag-n-drop
	function GE_Report_Clean() { $g("GE_Report").innerHTML = ''; }
	// END of FUNCTIONS & VARIABLES

	// START of CONFIG
	if (1 == 1) {
		Config.scriptName = scriptName;
		Config.css = "\
					#ConfigMask { position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; } \
					#ConfigBody * { border:none; font-size:12px; color:#333; font-weight:normal !important; margin:0 !important; padding:0 !important; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; line-height:1.2em; } \
					#ConfigBody { -moz-border-radius:0;width:500px; margin:auto !important; top:100px; position:fixed; left:35%; text-align:left; background:#f9f9f9; border:1px ridge #576c89; padding:0 !important; font-family:Arial; font-size:14px; cursor:default; z-index:9010; color:#333; padding-bottom:1em !important; } \
					#ConfigBody a { text-decoration:underline; color:#000099 !important; } \
					#ConfigBody strong, #ConfigContentBox strong { font-weight:bold !important; } \
					#ConfigBody h1 { font-size:13px; font-weight:bold !important; padding:.5em !important; border-bottom:1px solid #333; margin-bottom:.75em !important;padding-left:2.2em !important;background:#2b3843 url(http://opendia.net/temp/icon-settings2.png) 0.5em no-repeat; } \
					#ConfigBody h1 img {display:none;} \
					#ConfigBody h2 { font-weight:bold; margin:.5em 1em !important; } \
					#ConfigBody h1 { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; } \
					#ConfigBody h1 a:hover { text-decoration:underline; } \
					#ConfigBody li { list-style-type:circle; } \
					#ConfigBody p { font-size:12px; font-weight:normal; margin-bottom:1em !important; } \
					#ConfigContentPadding { margin:0 1em !important; }\
					#ConfigTabs { margin-top:20px !important; }\
					#ConfigTabs span { border:1px solid #666; padding: 2px 10px !important; position:relative; top:-2px; background-color:#2b3843;color:#fff; cursor:pointer; }\
					#ConfigTabs span:hover { background-color:#41444d; }\
					#ConfigTabs span.active { background-color:#F9F9F9; top:-1px; border-bottom:none;color:#000; padding-top:3px !important; font-weight:bold; cursor:inherit; }\
					#ConfigTabs span.active:hover { background-color:#F9F9F9; }\
					#ConfigContentBox { border:1px inset #666; padding:1.5em 1em 1em !important; }\
					#ConfigContentBox table { width:auto !important; }\
					#ConfigContentBox td { font-weight:normal; }\
					#ConfigContentBox input { border:1px inset #666 !important; }\
					#ConfigContentBox td.fieldLabel { text-align:right !important; padding-right:.5em !important; font-weight:bold !important; }\
					#ConfigContentBox td input { float:left; }\
					#ConfigContentBox td select { border:1px inset #666; }\
					#ConfigHistory { margin:0 1em 1em 1em !important; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em !important; width:448px; } \
					#ConfigHistory ul { margin-left:2em !important; } \
					#ConfigClose { float:right; cursor:pointer; height:14px; opacity:.5; } \
					#ConfigClose:hover { opacity:.9; } \
					#ConfigFooter { padding:1.5em 1em 0 !important; } \
					#ConfigFooter input { -moz-border-radius:0; border:1px outset #576c89; padding:3px 5px 5px 20px !important; background:url(http://opendia.net/temp/icon-save.png) no-repeat 4px center #2b3843; color:#fff; cursor:pointer; width:120px; float:right; margin-left:.5em !important; } \
					#ConfigFooter input:hover { background-color:#41444d; } \
					#ConfigFooter select { border:1px inset #666; }\
					#ConfigContentBox #ConfigFieldTable td { padding-bottom:.5em !important; }";
		Config.footerHtml = '<span style="font-size:.9em;">'+L('SETTINGS_FOOTER')+'</span>',
		Config.tabs = {
			"Settings": {
				html:'<p>'+L('SETTINGS_TEXT')+'</p>',
				fields: {
					optFormatter: {
						type:'checkbox',
						label:L('OPTFORMATTER'),
						value:true,
					},
					optQuickbar: {
						type:'checkbox',
						label:L('OPTQUICKBAR'),
						value:true,
					},
					optProdinfo: {
						type:'checkbox',
						label:L('OPTPRODINFO'),
						value:true,
					},
					optFarmerhelp: {
						type:'checkbox',
						label:L('OPTFARMERHELP'),
						value:true,
					},
					optIslandpm: {
						type:'checkbox',
						label:L('OPTISLANDPM'),
						value:true,
					},
					optMessagelink: {
						type:'checkbox',
						label:L('OPTMESSAGELINK'),
						value:true,
					},
					optReportlink: {
						type:'checkbox',
						label:L('OPTREPORTLINK'),
						value:true,
					},
					optRedirectcleaner: {
						type:'checkbox',
						label:L('OPTREDIRECTCLEANER'),
						value:true,
					},
					optWallStats: {
						type:'checkbox',
						label:L('OPTWALLSTATS'),
						value:true,
					},
				}
			},
			"Settings 2": {
				html:'<p>'+L('SETTINGS_TEXT')+'</p>',
				fields: {
					optBuildingpnts: {
						type:'checkbox',
						label:L('OPTBUILDINGPNTS'),
						value:true,
					},
					optUserlinks: {
						type:'checkbox',
						label:L('OPTUSERLINKS'),
						value:true,
					},
					optAllylinks: {
						type:'checkbox',
						label:L('OPTALLYLINKS'),
						value:true,
					},
					optRescalc: {
						type:'checkbox',
						label:L('OPTRESCALC'),
						value:true,
					},
					optSwCitycntrl: {
						type:'checkbox',
						label:L('OPTSWCITYCNTRL'),
						value:true,
					},
					optArrowcntrl: {
						type:'checkbox',
						label:L('OPTARROWCNTRL'),
						value:true,
					},
					optQuickCast: {
						type:'checkbox',
						label:L('OPTQUICKCAST'),
						value:true,
					},				
				}
			},
			"About": {
				html: '<p><strong>'+L('SCRIPTNAME')+':</strong> '+scriptName+'</p><p><strong>'+L('SCRIPTVER')+':</strong> '+scriptVersion+'</p><p><strong>'+L('SCRIPTWRIGHT')+':</strong> '+scriptWright+', '+scriptWrightEmail+'</p>',
			}
		};
		var GE_Settings_Div = $d('',[['id','GE_Settings']]);
		var GE_Settings_A = $a(L('SETTINGS'),[['href',jsVoid],['id','GE_Settings_A']]);
		GE_Settings_A.addEventListener('click',Config.show,false);
		GE_Settings_Div.appendChild(GE_Settings_A);
		$(GE_Settings_Div).insertAfter($('#links'));
	}
	// END of CONFIG

	// START of QUICKBAR
	if (Config.get('optQuickbar')) {
		var curCity = GE.Game.townId;
		var curMenu = ''+
			'<li><a href="/game/building_main?town_id='+curCity+'"><b>'+L('main')+'</b></a></li>'+
			'<li><a href="/game/building_barracks?town_id='+curCity+'"><b>'+L('barracks')+'</b></a></li>'+
			'<li><a href="/game/building_academy?town_id='+curCity+'"><b>'+L('academy')+'</b></a></li>'+
			'<li><a href="/game/building_docks?town_id='+curCity+'"><b>'+L('docks')+'</b></a></li>'+
			'<li><a href="/game/building_market?town_id='+curCity+'"><b>'+L('market')+'</b></a></li>'+
			'<li><a href="/game/building_wall?town_id='+curCity+'"><b>'+L('wall')+'</b></a></li>'+
			'<li><a href="/game/building_place?town_id='+curCity+'"><b>'+L('place')+'</b></a></li>'+
			'<li><a href="/game/building_temple?town_id='+curCity+'"><b>'+L('temple')+'</b></a></li>'+
			'<li><a href="/game/building_hide?town_id='+curCity+'"><b>'+L('hide')+'</b></a></li>'+
			'<li class="liTop"><a class="aTop" href="#"><img src="http://opendia.net/library/gm/grepolis/menuDown.png" /><b>'+L('MENU_EXTRAS')+'</b></a>'+
				'<ul class="ulSub">'+
					// '<li><hr /></li>'+
					'<li><a href="http://www.grepostats.com/world/'+GE.Server[1]+'/index" target="_blank">Grepostats</a></li>'+
					'<li><a href="http://'+GE.Server[1]+'.grepolismaps.org" target="_blank">Grepomapas</a></li>'+
					'<li><a href="http://www.grepo-world.com/index.php?view=top_players&land='+GE.Server[2]+'&world='+GE.Server[3]+'" target="_blank">GrepolisWorld</a></li>'+
//					'<li><a href="http://www.grepotools.de/" target="_blank">Grepolis Tools</a></li>'+
				'</ul>'+
			'</li>';
		if ($gc('toolbar')[0]) {
			$gc('toolbar')[0].innerHTML = curMenu;
// REMEMBER TO COMMENT OUT THE FOLLOWING
		// } else if ($g('casted_powers_wrapper')) {
			// $g('bar_content').insertBefore($ul(curMenu,[['class','toolbar']]), $g('casted_powers_wrapper'));
		// } else {
			// document.getElementById('bar_content').innerHTML = '<ul class="toolbar">'+curMenu+'</ul>';
// REMEMBER TO COMMENT OUT THE ABOVE
		}
		$(".liTop").hover(function() {
			$(".aTop").toggleClass("aHov");
			$(".aTop > b").toggleClass("bHov");
		});
	}
	// END of QUICKBAR

	// START of ARROWCONTROL
	if (Config.get('optArrowcntrl')) {
		if (uW.Game.controller == "report") {
			function keyCheck(e) {
				var keyID = (window.event) ? event.keyCode : e.keyCode;
				switch(keyID) {
					case 37:
					window.location.href = prevRep.getAttribute("href");
					break;
					case 39:
					window.location.href = nextRep.getAttribute("href");
					break;
				}
			}
			var nextRep = $gc("next_report game_arrow_right")[0];
			var prevRep = $gc("last_report game_arrow_left")[0];
			window.addEventListener('keyup', keyCheck, true); 
		}
	}
	// END of ARROWCONTROL

	// START of ARROWCONTROL2
	if (Config.get('optSwCitycntrl')) {
		if ($('.prev_city.game_arrow_left').length != 0) {
			function keydown(evt) {
				if (!evt)
					evt = event;
				if (evt.ctrlKey && evt.keyCode == 37) {
					window.location.href = prevRep.getAttribute("href");
				} else if (evt.ctrlKey && evt.keyCode == 39) {
					window.location.href = nextRep.getAttribute("href");
				}
			} // function keydown(evt)
			var nextRep = $gc("prev_city game_arrow_right")[0];
			var prevRep = $gc("next_city game_arrow_left")[0];
			window.addEventListener('keydown', keydown, true); 
		}
	}
	// END of ARROWCONTROL2

	// START of ISLANDPM
	if (Config.get('optIslandpm')) {
		function GE_IslandPM() {
			if (uW.Game.controller == "map") {
				var islands = uW.MapTiles.mapData.towns_cache;
				PMEarr = [];var PMElist = "";
				PMAarr = [];var PMAlist = "";
				var coordX, coordY, ally = "";
				for (var i in islands) {
					var island = islands[i];
					for (var y in island) {
						var village = island[y];
						if (village.css_class == "own_town" && village.id == GE.Game.townId) {
							coordX = village.x;
							coordY = village.y;
							ally = village.alliance_name;
						}
					}
					for (var z in island) {
						var village2 = island[z];
						if (coordX == village2.x && coordY == village2.y) { 
							if (!(village2.player_name == undefined)) { 
								if (!(village2.player_name == "")) { 
									if (!(village2.css_class == "own_town")) {
										PMEarr.push(village2.player_name);
									}
								}
							}
						}
					}
					if (!(ally == "" || ally === undefined)) {
						for (var x in island) {
							var village3 = island[x];
							if (coordX == village3.x && coordY == village3.y) { 
								if (!(village3.player_name == undefined)) { 
									if (!(village3.player_name == "")) { 
										if (!(village3.css_class == "own_town")) {
											if (village3.alliance_name == ally) {
												PMAarr.push(village3.player_name);
											}
										}
									}
								}
							}
						}
					}
				}
				PMEarr = uniqueArr(PMEarr).slice(0);
				for (var pmX in PMEarr) {
					PMElist += PMEarr[pmX]+";";
				}
				PMAarr = uniqueArr(PMAarr).slice(0);
				for (var pmX in PMAarr) {
					PMAlist += PMAarr[pmX]+";";
				}
				PMElist = PMElist.substring(0, PMElist.length-1);
				PMAlist = PMAlist.substring(0, PMAlist.length-1);
				var scrPop = $sc('$(\'#islandPME\').mousePopup(new MousePopup("'+L('islandPME')+'"));',[['type','text/javascript']]);
				var scrPop2 = $sc('$(\'#islandPMA\').mousePopup(new MousePopup("'+L('islandPMA')+'"));',[['type','text/javascript']]);
				var uid = GE.Game.player_id;
				if (!(PMElist == "")) {
					var aPM = $f('',[['method','POST'],['id','write_message_form'+uid],['style','position:absolute;right:0;margin:0px 5px;bottom:0;z-index:5;']]);
					aPM.appendChild($i([['type','hidden'],['value',PMElist],['name','recipients']]));
					var aPML = $a('&nbsp;',[['onclick',"submit_form('write_message_form"+ uid +"', 'message', 'new');"],['href',jsVoid],['id','islandPME']]);
					aPML.appendChild($img([['src',image['islandPME']]]));
					aPM.appendChild(scrPop);
					aPM.appendChild(aPML);
					$g("content").appendChild(aPM);
				}
				if (!(PMAlist == "")) {
					uid += "2";
					var aPM2 = $f('',[['method','POST'],['id','write_message_form'+uid],['style','position:absolute;right:40px;margin:0px 5px;bottom:0;z-index:5;']]);
					aPM2.appendChild($i([['type','hidden'],['value',PMAlist],['name','recipients']]));
					var aPML2 = $a('&nbsp;',[['onclick',"submit_form('write_message_form"+ uid +"', 'message', 'new');"],['href',jsVoid],['id','islandPMA']]);
					aPML2.appendChild($img([['src',image['islandPMA']]]));
					aPM2.appendChild(scrPop2);
					aPM2.appendChild(aPML2);
					$g("content").appendChild(aPM2);
				}
			}
		}
	}
	// END of ISLANDPM

	// START of PRODINFO
	if (Config.get('optProdinfo')) {
		function GE_ProdInfo() {
			var wrm = (((GE.Layout.storage_volume-(GE.Layout.resources.wood+GE.Layout.resources.wood_offset))/(GE.Layout.production.wood))*3600);
			var strm = (((GE.Layout.storage_volume-(GE.Layout.resources.stone+GE.Layout.resources.stone_offset))/(GE.Layout.production.stone))*3600);
			var sirm = (((GE.Layout.storage_volume-(GE.Layout.resources.iron+GE.Layout.resources.iron_offset))/(GE.Layout.production.iron))*3600);
			var farm = (((GE.Layout.max_favor-(GE.Layout.favor))/GE.Layout.favor_production)*3600);
			wrm2 = ft(wrm);
			strm2 = ft(strm);
			sirm2 = ft(sirm);
			farm2 = ft(farm);
			if (farm == "Infinity") { farm2 = L('NOTEMPLE'); } else { farm2 = ft(farm); }
			var prodinfoHTML =	'<table><tr>'+
								'	<td id="GE_wood"> ('+GE.Layout.production.wood+',<span id="GE_wood_C">'+wrm2+'</span>)</td>'+
								'	<td id="GE_stone"> ('+GE.Layout.production.stone+',<span id="GE_stone_C">'+strm2+'</span>)</td>'+
								'	<td id="GE_silver"> ('+GE.Layout.production.iron+',<span id="GE_silver_C">'+sirm2+'</span>)</td>'+
								'	<td id="GE_favor"> ('+GE.Layout.favor_production+',<span id="GE_favor_C">'+farm2+'</span>)</td>'+
								'</tr></table>';
			if ($g('GE_prodinfo')) {
				$g('GE_prodinfo').innerHTML = prodinfoHTML;
			} else {
				prodinfo = $d(prodinfoHTML,[['id','GE_prodinfo']]);
				$g("box").appendChild(prodinfo);
			}
			var scrPop = $sc(''+
			'$(\'#GE_wood\').mousePopup(new MousePopup("(<em>'+L('Wood')+'/'+L('HOUR')+'</em>,'+L('RESCNTR')+')"));'+
			'$(\'#GE_stone\').mousePopup(new MousePopup("(<em>'+L('Stone')+'/'+L('HOUR')+'</em>,'+L('RESCNTR')+')"));'+
			'$(\'#GE_silver\').mousePopup(new MousePopup("(<em>'+L('Iron')+'/'+L('HOUR')+'</em>,'+L('RESCNTR')+')"));'+
			'$(\'#GE_favor\').mousePopup(new MousePopup("(<em>'+L('Favor')+'/'+L('HOUR')+'</em>,'+L('RESCNTR')+')"));'+	
			'',[['type','text/javascript']]);
			prodinfo.appendChild(scrPop);
			GE.counters["GE_wood_C"] = ["GE_wood_C",wrm];
			if (!(strm == "Infinity")) { GE.counters["GE_stone_C"] = ["GE_stone_C",strm]; }
			if (!(sirm == "Infinity")) { GE.counters["GE_silver_C"] = ["GE_silver_C",sirm]; }
			if (!(farm == "Infinity")) { GE.counters["GE_favor_C"] = ["GE_favor_C",farm]; }
		}
	}
	// END of PRODINFO

	// START of QUICKCAST
	if (Config.get('optQuickCast')) {
		function quickCast(){
			uW.PopupFactory.addTexts({quickCastTxt: L('QuickCastText')});
			$("#god_mini").css("cursor","pointer");
			$("#god_mini").setPopup('quickCastTxt');
			$("#god_mini").click( function( ) { uW.TownInfo.init(GE.Game.townId,'town_info',false,"#content");$("#info_tab_window_bg").tabs('select',4); } );
		}
		quickCast();
	}
	// END of QUICKCAST

	// START of QUICKTOWN
	if (!Config.get('optQuickTown')) {
		function quicktown(aEl) {
			if (aEl.parentNode && aEl.parentNode.innerHTML.indexOf(imP) == -1 && aEl.parentNode.innerHTML.indexOf('message?') != -1) {
				var aBt = $a("&nbsp;&nbsp;",[['id','GE_Link'],['href', jsVoid]]);
				aBt.addEventListener("click", GE_Message(aEl), false);
				aBt.appendChild($img([['src',image['bPopup']],['style','float: right;z-index: 30;'],['class','ajaxMessageLink']]));
				$(aBt).insertAfter(aEl);
			}
			function GE_Message(aEl) {
				return function() {
					ajaxRequest(aEl.href, 'GET', null, function(ajaxResp) {
						var ad = ajaxND(ajaxResp);
						var aV = ad.getElementById('message_message_list');
						$g("GE_Report").innerHTML = '';
						$g("GE_Report").appendChild(aV);
						var mH;
						var elm = $g("GE_Report").getElementsByTagName('div');
						for (i=0; i<elm.length; i++) {
							if (elm[i].className == 'game_header bold') {
								mH = elm[i];
								break;
							}
						}
						if (mH) {
							mH.style.cursor = 'move';
							var cBt = $a("&nbsp;&nbsp;",[['id','GE_Link'],['href', jsVoid]]);
							cBt.addEventListener("click", GE_Report_Clean, false);
							cBt.appendChild($img([['src',image['bClose']],['style','float:right;margin-top:-15px;']]));
							mH.appendChild(cBt);
							if (Config.get('optUserlinks')) {insertUserLinks($g("GE_Report"));}
							makeDraggable($g("GE_Report"),mH);
							var btnEl = $gc('middle');
							for (i=0; i < btnEl.length; i++) { 
								if (btnEl[i].innerHTML == "Vidarebefordra") { 
									var elem = btnEl[i].parentNode;
									if (elem.href.match(/(message\?id\=)(\d{1,})/i)) {
										uW.Message.id = RegExp.$2;
									}
								}
							}					
						}
					}, dummy);
				};
			};
		};
		if (GE.Game.controller == 'message') {
			if ($g('message_messages')) {
				var report = $d('',[['id','GE_Report'],["style","top:"+topX+";left:"+leftX+";"]]);
				$(report).insertAfter($g("box"));
				var ML = $g('message_list');
				var links = ML.getElementsByTagName("a");
				for (i=0; i<links.length; i++) {
					addmessagelink(links[i]);
				}
				var scrPop = $sc('$(\'.ajaxMessageLink\').mousePopup(new MousePopup("'+L('OPENINPOPUP')+'"));',[['type','text/javascript']]);
				$g('folder_container').appendChild(scrPop);
			}
		}
	}
	// END of QUICKTOWN
	
	// START of USERLINKS
	if (Config.get('optUserlinks')) {
		function insertUserLinksMap() { if($g('townWindow')) { insertUserLinks($g('townWindow')); } };
		function insertUserLinks(el) {
			var links = el.getElementsByTagName("a");
			for (i=0; i<links.length; i++) {
				if (links[i].href.indexOf('player_id=') != -1) {
					if (links[i].parentNode.id == "GE_QuickMsg" 
					|| links[i].href == "#"
					|| links[i].parentNode.id == "invitation_form" 
					|| links[i].parentNode.id == "arrows_citynames" 
					|| links[i].parentNode.parentNode.parentNode.id == "links" 
					|| links[i].parentNode.className == "arising"
					|| links[i].parentNode.className == "running"
					|| links[i].className == "cancel") { break; }
					insertUserLink(links[i]);
				}
			}
		}
		function insertUserLink(uEl) {
			var href = uEl.href;
			var uid = gG(href)['player_id'];
			var uname = $(uEl).text();
			if ($.getUrlVar('action') == 'members_show') {uname = uname.substr(1);}
			var aPM = $f('',[['method','POST'],['id','GE_QuickMsg'+uid],['class','frmUserLink']]);
			aPM.appendChild($i([['type','hidden'],['value',uname],['name','recipients']]));
			var aPML = $a('&nbsp;',[['onclick',"submit_form('GE_QuickMsg"+ uid +"', 'message', 'new');"],['href',jsVoid]]);
			aPML.appendChild($img([['src',image['bMsg']]]));
			aPM.appendChild(aPML);
			var aSL = $a('&nbsp;',[['id','GE_ULink'+uid],['target','_blank'],['href', 'http://www.grepo-world.com/statistic.php?view=player_details&land='+GE.Server[2]+'&world='+GE.Server[3]+'&player='+uname+'&language='+L('GWLanguage')]]);
			aSL.appendChild($img([['src',image['bGStats']]]));
			aPM.appendChild(aSL);
			uEl.parentNode.insertBefore(aPM, uEl.nextSibling);
		}
		insertUserLinks(document);
	}
	// END of USERLINKS
	
	// START of ALLYLINKS
	if (Config.get('optAllylinks')) {
		function insertAllyLinksMap() { if($g('townWindow')) {insertAllyLinks($g('townWindow'));} };
		function insertAllyLinks(el) {
			var links = el.getElementsByTagName("a");
			for (i=0; i<links.length; i++) {
				if (links[i].href.indexOf('alliance_id=') != -1) {
					if (links[i].href == "#" 
					|| links[i].innerHTML == L('SETTINGS') 
					|| links[i].parentNode.parentNode.parentNode.id == "links" 
					) {break;}
					insertAllyLink(links[i]);
				}
			}
		}
		function insertAllyLink(aEl) {
			var href = aEl.href;
			var aid = gG(href)['alliance_id'];
			var aname = aEl.innerHTML;
			var aSL = $a('&nbsp;',[['id','GE_ALink'+aid],['target','_blank'],['href', 'http://www.grepo-world.com/statistic.php?view=alliance_details&land='+GE.Server[2]+'&world='+GE.Server[3]+'&alliance='+aname]]);
			aSL.appendChild($img([['src',image['bGStats']]]));
			aEl.parentNode.insertBefore(aSL, aEl.nextSibling);
		}
		insertAllyLinks(document);
	}
	// END of ALLYLINKS
	
	// START of BUILDINGPOINTS
	if (Config.get('optBuildingpnts')) {
		function GE_Builds() {
			if (GE.Game.controller == 'building_main' ) {
				GE.Builds = uW.BuildingMain.orders;
				GE.Buildings = uW.BuildingMain.buildings;
				for (var i in $g('buildings').childNodes) {
					el = $g('buildings').childNodes[i];
					if (el.nodeName == "DIV") {
						B = GE.Buildings[el.id.replace('building_main_','')];
						if (B) {
							bName = B.controller.replace('building_','');
							if (!(bName == "place")) {
								p = GE.buildingStats[bName][B.next_level];
								if (p !== undefined) {
									el.getElementsByClassName('name')[0].appendChild($s(' '+p+'p',[['style','display:inline;font-size:9px;font-family:arial;z-index:10;']]));
								}
							}
						}
					}
				}
				for (z=0; z < $gc('building_special').length; z++) {
					for (i=0;i <4;i++) {
						$gc('building_special')[z].appendChild($s('500p',[['class','image'],['style','display: inline-block; font-size: 9px;text-align:center; font-family: arial; margin-top:1px;']]));
					}
				}
			}
		}
	}
	// END of BUILDINGPOINTS

	// START of WALLSTATS
	if (Config.get('optWallStats')) {
		if (GE.Game.controller == "building_wall") {
			var defeatedUnits = $('.list_item_left');
			var lostUnits   = $('.list_item_right');
			var unitRE = /\/(\w+)_50x50\.png(?:.+?)class="place_unit_black bold">(\d+)<\/span>/ig;
			var uList;
			uList = $g('menu_inner_subject_middle').innerHTML +'\n';
			uList += L('WALLSTATS1');			
			unitRow = defeatedUnits[2];
			var html = unitRow.innerHTML.replace(/(\x0a\x0d|\x0d\x0a|\n)/g,"");			
			var r;
			while ( r = unitRE.exec( html ) ) {
				uList += unitCosts[r[1]][6] + ' - ' + r[2] + ', ';
			}
			uList += "\n" + L('WALLSTATS2');
			unitRow = defeatedUnits[4];
			html = unitRow.innerHTML.replace(/(\x0a\x0d|\x0d\x0a|\n)/g,"");
			r;
			while ( r = unitRE.exec( html ) ) {
				uList += unitCosts[r[1]][6] + ' - ' + r[2] + ', ';
			}
			uList += "\n" + L('WALLSTATS3');
			unitRow = lostUnits[2];
			html = unitRow.innerHTML.replace(/(\x0a\x0d|\x0d\x0a|\n)/g,"");
			r;
			while ( r = unitRE.exec( html ) ) {
				uList += unitCosts[r[1]][6] + ' - ' + r[2] + ', ';
			}
			uList += "\n" + L('WALLSTATS4');
			unitRow = lostUnits[4];
			html = unitRow.innerHTML.replace(/(\x0a\x0d|\x0d\x0a|\n)/g,"");
			r;
			while ( r = unitRE.exec( html ) ) {
				uList += unitCosts[r[1]][6] + ' - ' + r[2] + ', ';
			}
			var scrPop = $sc('$("#uList").mousePopup(new MousePopup("'+L('CLICKNCOPY')+'"));',[['type','text/javascript']]);
			divU = $d('',[['id','uList']]);
			iU = $ta(uList,[['onClick','this.select()']]);
			divU.appendChild(iU);
			divU.appendChild(scrPop);
			$('.game_list li:first-child p').append(divU);
		}
	}
	// END of WALLSTATS
	
	// START of CR FORMATTER
	if (Config.get('optFormatter')) {
		var aTown, aTownId, aPlayer, aAlly, GE_AP;
		var dTown, dTownId, dPlayer, dAlly, GE_DP;
		function GE_Report_Participants() {
			tName = [];tId = [];tOwner = [];tOwnerA = [];
			for (var c = 0; c < document.getElementsByTagName('li').length; c++) {
				if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_name') {
					if (document.getElementsByTagName('li')[c].innerHTML.match("<a")) {
						var townVar = uW.document.getElementsByTagName('li')[c].getElementsByTagName('a')[0].onclick;
						townVar = townVar.toString();
						tId.push(townVar.split("target_town_id=")[1].split("&")[0]);
					}
				}
				if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_name') {
					tName.push(document.getElementsByTagName('li')[c].getElementsByTagName('a')[0].innerHTML);
				}
				if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_owner') {
					if (document.getElementsByTagName('li')[c].innerHTML.match(">")) tOwner.push(document.getElementsByTagName('li')[c].innerHTML.split(">")[1].split("<")[0]);
				}
				if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_owner_ally') {
					if (document.getElementsByTagName('li')[c].innerHTML.match(">")) tOwnerA.push(document.getElementsByTagName('li')[c].innerHTML.split(">")[1].split("<")[0]);
				}
			}
			aTown = tName[0]; aTownId = tId[0]; aPlayer = tOwner[0]; aAlly = tOwnerA[0];
			dTown = tName[1]; dTownId = tId[1]; dPlayer = tOwner[1]; dAlly = tOwnerA[1];
		}
		function GE_Report_Format(el) {
			el = $g(el);
			if ($g('payed_iron')) {
				if ($g('menu_inner_subject_container')) {
					msgb = $g('report_date').parentNode;
					aubb = $a('',[['href',jsVoid],['class','crButton'],['id','UBBC']]);
					aubb.addEventListener('click',GE_Report_UBB_Spy,false);
					aubb.appendChild($s(L('UBBC'),[]));
					msgb.appendChild(aubb);
					aubb2 = $a('',[['href',jsVoid],['class','crButton'],['id','TXTC']]);
					aubb2.addEventListener('click',GE_Report_TXT_Spy,false);
					aubb2.appendChild($s(L('TXTC'),[]));
					msgb.appendChild(aubb2);
				}
			} else if ($g('resources')) {
				if (!($g('trade_report_container')) || !($g('report_power_symbol')) ) {
					var nodes = el.getElementsByClassName(  "report_units report_side_attacker"  );
					if ( (!nodes) || nodes.length == 0 ) {
						var AWood = 0;var AStone = 0;var ASilver = 0;var AFP = 0;var AFavor = 0;
					} else {
						var node = nodes[0];
						var AWood = 0;var AStone = 0;var ASilver = 0;var AFP = 0;var AFavor = 0;
						var units = node.getElementsByClassName("report_unit");
						for (var i=0 ; i<units.length ; i++) {
							var unit = units[i];
							var type = unit.className.replace("report_unit report_side_attacker unit_",'');
							var countel = unit.parentNode.getElementsByClassName("report_losts")[0];
							var count = -parseInt( countel.innerHTML, 10 );
							var uc = unitCosts[ type ];
							if ( uc ) {
								AWood += count * uc[0];AStone += count * uc[1];ASilver += count * uc[2];AFP += count * uc[3];AFavor += count * uc[4];
								GE_AP = AFP;
							}
						}
					}
					var nodes = el.getElementsByClassName( "report_units report_side_defender" );
					if ( (!nodes) || nodes.length === 0 ) {
						var DWood = 0;var DStone = 0;var DSilver = 0;var DFP = 0;var DFavor = 0;
					} else {
						var node = nodes[0];
						var DWood = 0;var DStone = 0;var DSilver = 0;var DFP = 0;var DFavor = 0;
						var units = node.getElementsByClassName("report_unit");
						for (var i=0 ; i<units.length ; i++) {
							var unit = units[i];
							var type = unit.className.replace("report_unit report_side_defender unit_",'');
							var countel = unit.parentNode.getElementsByClassName("report_losts")[0];
							var count = -parseInt( countel.innerHTML, 10 );
							var uc = unitCosts[ type ];
							if ( uc ) {
								DWood += count * uc[0];DStone += count * uc[1];DSilver += count * uc[2];DFP += count * uc[3];DFavor += count * uc[4];
								GE_DP = DFP;
							}
						}
					}
					if (GE_AP === undefined) { GE_AP = 0}
					if (GE_DP === undefined) { GE_DP = 0}
					var RI = $d('',[['id','GE_Stats_Tbl']]);
					var scrPop = $sc(''+
					'$(\'.defendr\').mousePopup(new MousePopup("'+L('DEFENDR')+'"));'+
					'$(\'.attackr\').mousePopup(new MousePopup("'+L('ATTACKR')+'"));'+
					'$(\'#AFP\').mousePopup(new MousePopup("'+L('APNTS')+'"));'+
					'$(\'#DFP\').mousePopup(new MousePopup("'+L('DPNTS')+'"));'+
					'',[['type','text/javascript']]);
					RI.appendChild(scrPop);
					var tbl = $t([]);
						row = $r([]);
						row.appendChild($hc('',[]));
						row.appendChild($hc('<img alt="'+L('Wood')+'" src="http://www.opendia.net/grepoex/images/grepo/icon_wood.png">',[]));
						row.appendChild($hc('<img alt="'+L('Stone')+'" src="http://www.opendia.net/grepoex/images/grepo/icon_stone.png">',[]));
						row.appendChild($hc('<img alt="'+L('Iron')+'" src="http://www.opendia.net/grepoex/images/grepo/icon_silver.png">',[]));
						row.appendChild($hc('<img alt="'+L('BH')+'" src="http://www.opendia.net/grepoex/images/grepo/icon_pop.png">',[]));
					tbl.appendChild(row);
						row = $r([]);
						row.appendChild($c('',[['class','attackr']]));
						row.appendChild($c(AWood,[]));
						row.appendChild($c(AStone,[]));
						row.appendChild($c(ASilver,[]));
						row.appendChild($c(AFP,[['id','AFP']]));
					tbl.appendChild(row);
						row = $r([]);
						row.appendChild($c('',[['class','defendr']]));
						row.appendChild($c(DWood,[]));
						row.appendChild($c(DStone,[]));
						row.appendChild($c(DSilver,[]));
						row.appendChild($c(DFP,[['id','DFP']]));
					tbl.appendChild(row);
					RI.appendChild(tbl);
					$g('report_booty_bonus_fight').appendChild(RI);
					if ($g('report_date')) {
						msgb = $g('report_date').parentNode;
						aubb = $a('',[['href',jsVoid],['class','crButton'],['id','UBBC']]);
						aubb.addEventListener('click',GE_Report_UBB_Normal,false);
						aubb.appendChild($s(L('UBBC'),[]));
						msgb.appendChild(aubb);
						aubb2 = $a('',[['href',jsVoid],['class','crButton'],['id','TXTC']]);
						aubb2.addEventListener('click',GE_Report_TXT_Normal,false);
						aubb2.appendChild($s(L('TXTC'),[]));
						msgb.appendChild(aubb2);
					}
				}
			}
		};
		function GE_Report_UBB_Spy() {
			GE_Report_Participants();
			$('#UBBC').addClass('crButtonA');
			if ($g('ReportTextArea2')) { 
				$g('ReportTextArea2').style.display = 'none'; 			
				$('#TXTC').removeClass('crButtonA');
			}
			if ($g('ReportTextArea')) {
				if ($g('ReportTextArea').style.display == "block") { 
					$g('ReportTextArea').style.display = 'none'; 
					$('#UBBC').removeClass('crButtonA');
				} else { 
					$g('ReportTextArea').style.display = 'block'; 
					$('#UBBC').addClass('crButtonA');
				}
				return;
			}
			var imageURL = 'http://static.grepolis.com/images/game/';
			if ($g('left_side')) {
				var ReportArea = $e("textarea");
				$at(ReportArea,[['id', 'ReportTextArea'],['onclick', 'this.select()'],['style', 'z-index: 10; position: absolute; top: 100px; left: 1px; display:block; border:0px; width:745px; height:'+($g('report_game_body').clientHeight-$g('report_header').clientHeight - 1)+'px;']]);
				$g('left_side').appendChild(ReportArea);
			}
			if ($g('report_date')) { var reportDate = $g('report_date').innerHTML; }
			var units = {};
			var buildings = {};
			for (var i in $g('left_side').getElementsByClassName('report_unit')) {
				el = $g('left_side').getElementsByClassName('report_unit')[i];
				if (el.className.indexOf("report_unit unit_") != -1) {
					units[el.className.replace("report_unit unit_","")] = el.getElementsByClassName("place_unit_black")[0].innerHTML;
				} else {
					buildings[el.id] = el.getElementsByClassName("place_unit_black")[0].innerHTML;
				}
			}
			var cost = $g('payed_iron').getElementsByTagName('span')[0].innerHTML;
			var wood = 0;var stone = 0;var silver = 0;
			if ($g('resources')) {
				var els = $g('resources').getElementsByTagName("span");
				wood = Number(els[0].innerHTML);
				stone = Number(els[1].innerHTML);
				silver = Number(els[2].innerHTML);
			}		
			var UBB = "";
			UBB += "[quote][b][player]" + aPlayer + "[/player] " + L('FROM') + " ([town]"+aTownId+"[/town]) "+ L('SPY') + " [player]" + dPlayer + "[/player] " + L('IN') + " ([town]" + dTownId + "[/town])[/b] @ [i]"+ reportDate +"[/i] \n\n";
			UBB += "[b]"+L('RESOURCES')+"[/b]: "+L('Wood')+": [i]"+wood+"[/i], "+L('Stone')+": [i]"+stone+"[/i], "+L('Iron')+": [i]"+silver+"[/i]\n[b]"+L('SPYCOST')+"[/b]: "+cost+" \n\n";
			UBB += "[b] "+L('UNITS') +": [/b]\n";
			if (units.toSource() != "({ })" ) { for (var i in units) { UBB += "[img]" +imageURL+ "units/" + i + "_40x40.png[/img] " + units[i] + " "; }} else { UBB += L('NON')+"\n";}
			UBB += "\n[b] "+L('BUILDINGS') +": [/b]\n";
			if (buildings.toSource() != "({ })" ) {var element_count = 0; for (var i in buildings) { element_count++; UBB += "[img]" +imageURL+ "main/" + i.replace("building_","") + ".png[/img] " + buildings[i] + " "; if (element_count == 8) {UBB += "\n\n"} }} else { UBB += L('NON')+"\n";}
			UBB += "\n[/quote]";
			$g('ReportTextArea').innerHTML = UBB;
		}
		function GE_Report_TXT_Spy() {
			GE_Report_Participants();
			$('#TXTC').addClass('crButtonA');
			if ($g('ReportTextArea')) { 
				$g('ReportTextArea').style.display = 'none'; 			
				$('#UBBC').removeClass('crButtonA');
			}
			if ($g('ReportTextArea2')) {
				if ($g('ReportTextArea2').style.display == "block") { 
					$g('ReportTextArea2').style.display = 'none'; 
					$('#TXTC').removeClass('crButtonA');
				} else { 
					$g('ReportTextArea2').style.display = 'block'; 
					$('#TXTC').addClass('crButtonA');
				}
				return;
			}
			if ($g('left_side')) {
				var ReportArea = $e("textarea");
				$at(ReportArea,[['id', 'ReportTextArea2'],['onclick', 'this.select()'],['style', 'z-index: 10; position: absolute; top: 100px; left: 1px; display:block; border:0px; width:745px; height:'+($g('report_game_body').clientHeight-$g('report_header').clientHeight - 1)+'px;']]);
				$g('left_side').appendChild(ReportArea);
			}
			if ($g('report_date')) { var reportDate = $g('report_date').innerHTML; }
			var units = {};
			var buildings = {};
			for (var i in $g('left_side').getElementsByClassName('report_unit')) {
				el = $g('left_side').getElementsByClassName('report_unit')[i];
				if (el.className.indexOf("report_unit unit_") != -1) {
					units[el.className.replace("report_unit unit_","")] = el.getElementsByClassName("place_unit_black")[0].innerHTML;
				} else {
					buildings[el.id] = el.getElementsByClassName("place_unit_black")[0].innerHTML;
				}
			}
			var cost = $g('payed_iron').getElementsByTagName('span')[0].innerHTML;
			var wood = 0;var stone = 0;var silver = 0;
			if ($g('resources')) {
				var els = $g('resources').getElementsByTagName("span");
				wood = Number(els[0].innerHTML);
				stone = Number(els[1].innerHTML);
				silver = Number(els[2].innerHTML);
			}		
			var UBB = "";
			UBB += aPlayer+" "+L('FROM')+" ("+aTown+") "+L('SPY')+" "+dPlayer+" "+L('IN')+" ("+dTown+") @ "+reportDate+"\n";
			UBB += ""+L('SPYCOST')+": "+cost+" &mdash; "+L('RESOURCES')+": "+L('Wood')+": "+wood+", "+L('Stone')+": "+stone+", "+L('Iron')+": "+silver+"\n";
			UBB += L('UNITS') +" &mdash; ";
			if (units.toSource() != "({ })" ) { for (var i in units) { UBB += unitCosts[i][6]+": "+units[i] + ", "; }} else { UBB += L('NON')+"\n";}
			UBB += "\n"+L('BUILDINGS') +" &mdash; ";
			if (buildings.toSource() != "({ })" ) { for (var i in buildings) { UBB += GE.buildingStats[i.replace("building_","")][0]+": "+buildings[i] + ", "; }} else { UBB += L('NON');}
			$g('ReportTextArea2').innerHTML = UBB;
		}
		function GE_Report_UBB_Normal() {
			GE_Report_Participants();
			$('#UBBC').addClass('crButtonA');
			if ($g('ReportTextArea2')) { 
				$g('ReportTextArea2').style.display = 'none'; 			
				$('#TXTC').removeClass('crButtonA');
			}
			if ($g('ReportTextArea')) {
				if ($g('ReportTextArea').style.display == "block") { 
					$g('ReportTextArea').style.display = 'none'; 
					$('#UBBC').removeClass('crButtonA');
				} else { 
					$g('ReportTextArea').style.display = 'block'; 
					$('#UBBC').addClass('crButtonA');
				}
				return;
			}
			for(var c = 0; c < document.getElementsByTagName('div').length; c++) {
				if (document.getElementsByTagName('div')[c].getAttribute('class')=='report_units_overview') {
					var ReportFormat=document.getElementsByTagName('div')[c];
					break;
				}
			}
			if (ReportFormat) {
				var ReportArea = document.createElement("textarea");
				$at(ReportArea,[['id', 'ReportTextArea'],['onclick', 'this.select()'],['style', 'z-index: 10; position: absolute; top: 100px; left: 1px; display:block; border:0px; width:745px; height:'+($g('report_game_body').clientHeight-$g('report_header').clientHeight - 1)+'px;']]);
				ReportFormat.appendChild(ReportArea);
			}				
			var output='[quote]';
			//General
				var imageURL = 'http://static.grepolis.com/images/game/units/';
				if ($g('report_date')) { var reportDate = $g('report_date').innerHTML; reportDate = "[i]"+reportDate+"[/i]"; }
				if (dTownId == undefined) { 
					output += '[b][player]'+aPlayer+'[/player] '+L('FROM')+' ([town]'+aTownId+'[/town]) '+L('ATK')+' [town]'+dTownId+'[/town][/b] @ '+reportDate;
				} else {
					output += '[b][player]'+aPlayer+'[/player] '+L('FROM')+' ([town]'+aTownId+'[/town]) '+L('ATK')+' [player]'+dPlayer+'[/player] '+L('IN')+' ([town]'+dTownId+'[/town])[/b] @ '+reportDate;
				}
				output += '\r\r';
			//Resources
				var morale = $.trim($('.morale').text());
				var luck = $.trim($('.luck').text());
				output += '[b]'+L('CITB')+':[/b] '+morale+', '+luck+'\r';
				output += '[b]'+L('CBPNTS')+':[/b] '+L('DPNTS')+' ([i]'+GE_AP+'[/i]), '+L('APNTS')+' ([i]'+GE_DP+'[/i]) \r';
				var res=[];
				res['total'] = $('#load').html();
				res['wood'] = $('.wood_img').siblings('span').html();
				res['stone'] = $('.stone_img').siblings('span').html();
				res['iron'] = $('.iron_img').siblings('span').html();
				if (res['total'] !== null) {
					output += '[b]'+res['total']+'[/b] '+L('OF_WHICH')+' '+L('Wood')+':[i] '+res['wood']+'[/i], '+L('Stone')+':[i] '+res['stone']+'[/i], '+L('Iron')+':[i] '+res['iron']+'[/i]';
				} else { output += '[b]'+L('LOOT')+':[/b] '+L('NOLOOT');}
			//Attacker Units
				output += '\r\r[b]'+L('ATTACKR')+'[/b]\r';
				var gt_aunits=[];
				for (var aU = 0; aU < $gc('report_side_attacker_unit').length; aU++) {
					for (var uArr in unitCosts) {
						gt_aunits[uArr] = $('.report_side_attacker .unit_'+uArr).children('.place_unit_black').html();
						gt_aunits[uArr+'-l'] = $('.report_side_attacker .unit_'+uArr).siblings('span').html();
					}
				}
				for (var uArr in unitCosts) {
					if (gt_aunits[uArr]!=null) {output += '[img]'+imageURL+uArr+'_25x25.png[/img] '+gt_aunits[uArr]+' ([color=#ff0000]'+gt_aunits[uArr+'-l']+'[/color]) ';}
				}
			//Defender Units
				var wall = $.trim($('.oldwall').text());
				output += '\r\r[b]'+L('DEFENDR')+'[/b] '+L('WITH');
				if (wall !== "") {output += ' '+wall;}
				output += '\r';
				var gt_dunits=[];
				for (var dU = 0; dU < $gc('report_side_defender_unit').length; dU++) {
					for (var uArr in unitCosts) {
						gt_dunits[uArr] = $('.report_side_defender .unit_'+uArr).children('.place_unit_black').html();
						gt_dunits[uArr+'-l'] = $('.report_side_defender .unit_'+uArr).siblings('span').html();
					}
				}
				var uOutput = "";
				for (var uArr in unitCosts) {
					if (gt_dunits[uArr]!=null) {uOutput += '[img]'+imageURL+uArr+'_25x25.png[/img] '+gt_dunits[uArr]+' ([color=#ff0000]'+gt_dunits[uArr+'-l']+'[/color]) ';}
				}
				if (uOutput == "") {output += L('NON');} else { output += uOutput;}
			output += '[/quote]';
			if ($g('ReportTextArea')) {
				$g('ReportTextArea').innerHTML = output;
			}
		}
		function GE_Report_TXT_Normal() {
			GE_Report_Participants();
			$('#TXTC').addClass('crButtonA');
			if ($g('ReportTextArea')) { 
				$g('ReportTextArea').style.display = 'none'; 			
				$('#UBBC').removeClass('crButtonA');
			}
			if ($g('ReportTextArea2')) {
				if ($g('ReportTextArea2').style.display == "block") { 
					$g('ReportTextArea2').style.display = 'none'; 
					$('#TXTC').removeClass('crButtonA');
				} else { 
					$g('ReportTextArea2').style.display = 'block'; 
					$('#TXTC').addClass('crButtonA');
				}
				return;
			}
			for(var c = 0; c < document.getElementsByTagName('div').length; c++) {
				if (document.getElementsByTagName('div')[c].getAttribute('class')=='report_units_overview') {
					var ReportFormat=document.getElementsByTagName('div')[c];
					break;
				}
			}
			if (ReportFormat) {
				var ReportArea = document.createElement("textarea");
				$at(ReportArea,[['id', 'ReportTextArea2'],['onclick', 'this.select()'],['style', 'z-index: 10; position: absolute; top: 100px; left: 1px; display:block; border:0px; width:745px; height:'+($g('report_game_body').clientHeight-$g('report_header').clientHeight - 1)+'px;']]);
				ReportFormat.appendChild(ReportArea);
			}				
			var output = '';
			//General
				if ($g('report_date')) { var reportDate = $g('report_date').innerHTML; }
				if (dPlayer == undefined) { 
					output += aPlayer+' '+L('FROM')+' ('+aTown+') '+L('ATK')+' '+dTown+' @ '+reportDate+'\r';
				} else {
					output += aPlayer+' '+L('FROM')+' ('+aTown+') '+L('ATK')+' '+dPlayer+' '+L('IN')+' ('+dTown+') @ '+reportDate+'\r';
				}
			//Resources
				var morale = $.trim($('.morale').text());
				var luck = $.trim($('.luck').text());
				output += ''+L('CITB')+': '+morale+', '+luck+'\r';
				output += ''+L('CBPNTS')+': '+L('DPNTS')+' ('+GE_AP+'), '+L('APNTS')+' ('+GE_DP+') \r';
				var res=[];
				res['total'] = $('#load').html();
				res['wood'] = $('.wood_img').siblings('span').html();
				res['stone'] = $('.stone_img').siblings('span').html();
				res['iron'] = $('.iron_img').siblings('span').html();
				if (res['total'] !== null) {
					output += ''+res['total']+' '+L('OF_WHICH')+' '+L('Wood')+': '+res['wood']+', '+L('Stone')+': '+res['stone']+', '+L('Iron')+': '+res['iron']+'';
				} else { output += L('LOOT')+': '+L('NOLOOT');}
			//Attacker Units
				output += '\r'+L('ATTACKR')+' -'+L('WITH')+'- ';
				var gt_aunits=[];
				for (var aU = 0; aU < $gc('report_side_attacker_unit').length; aU++) {
					for (var uArr in unitCosts) {
						gt_aunits[uArr] = $('.report_side_attacker .unit_'+uArr).children('.place_unit_black').html();
						gt_aunits[uArr+'-l'] = $('.report_side_attacker .unit_'+uArr).siblings('span').html();
					}
				}
				for (var uArr in unitCosts) {
					if (gt_aunits[uArr]!=null) {output += unitCosts[uArr][6]+' '+gt_aunits[uArr]+' '+gt_aunits[uArr+'-l']+', ';}
				}
			//Defender Units
				var wall = $.trim($('.oldwall').text());
				output += '\r'+L('DEFENDR')+' -'+L('WITH')+'- ';
				if (wall !== "") {output += wall;}
				var gt_dunits=[];
				for (var dU = 0; dU < $gc('report_side_defender_unit').length; dU++) {
					for (var uArr in unitCosts) {
						gt_dunits[uArr] = $('.report_side_defender .unit_'+uArr).children('.place_unit_black').html();
						gt_dunits[uArr+'-l'] = $('.report_side_defender .unit_'+uArr).siblings('span').html();
					}
				}
				var uOutput = "";
				for (var uArr in unitCosts) {
					if (gt_dunits[uArr]!=null) {uOutput += unitCosts[uArr][6]+' '+gt_dunits[uArr]+' ('+gt_dunits[uArr+'-l']+'), ';}
				}
				if (uOutput == "") {output += L('NON');} else { output += uOutput;}
			output += '';
			if ($g('ReportTextArea2')) {
				$g('ReportTextArea2').innerHTML = output;
			}
		}
		if ($g('report_report')) {
			GE_Report_Format("report_report");
			for(i in $g("report_report").getElementsByTagName("div")){
				if($g("report_report").getElementsByTagName("div")[i].className == 'report_fight_classic'){
					$g("report_report").getElementsByTagName("div")[i].style.display = "block";
				}
				if($g("report_report").getElementsByTagName("div")[i].className == 'report_fight_modern'){
					$g("report_report").getElementsByTagName("div")[i].style.display = "none";
				}
			}
		}
	}
	// END of CR FORMATTER

	// START of ADDMESSAGELINK
	if (Config.get('optMessagelink')) {
		function addmessagelink(aEl) {
			if (aEl.parentNode && aEl.parentNode.innerHTML.indexOf(imP) == -1 && aEl.parentNode.innerHTML.indexOf('message?') != -1) {
				var aBt = $a("&nbsp;&nbsp;",[['id','GE_Link'],['href', jsVoid]]);
				aBt.addEventListener("click", GE_Message(aEl), false);
				aBt.appendChild($img([['src',image['bPopup']],['style','float: right;z-index: 30;'],['class','ajaxMessageLink']]));
				$(aBt).insertAfter(aEl);
			}
			function GE_Message(aEl) {
				return function() {
					ajaxRequest(aEl.href, 'GET', null, function(ajaxResp) {
						var ad = ajaxND(ajaxResp);
						var aV = ad.getElementById('message_message_list');
						$g("GE_Report").innerHTML = '';
						$g("GE_Report").appendChild(aV);
						var mH;
						var elm = $g("GE_Report").getElementsByTagName('div');
						for (i=0; i<elm.length; i++) {
							if (elm[i].className == 'game_header bold') {
								mH = elm[i];
								break;
							}
						}
						if (mH) {
							mH.style.cursor = 'move';
							var cBt = $a("&nbsp;&nbsp;",[['id','GE_Link'],['href', jsVoid]]);
							cBt.addEventListener("click", GE_Report_Clean, false);
							cBt.appendChild($img([['src',image['bClose']],['style','float:right;margin-top:-15px;']]));
							mH.appendChild(cBt);
							if (Config.get('optUserlinks')) {insertUserLinks($g("GE_Report"));}
							makeDraggable($g("GE_Report"),mH);
							var btnEl = $gc('middle');
							for (i=0; i < btnEl.length; i++) { 
								if (btnEl[i].innerHTML == "Vidarebefordra") { 
									var elem = btnEl[i].parentNode;
									if (elem.href.match(/(message\?id\=)(\d{1,})/i)) {
										uW.Message.id = RegExp.$2;
									}
								}
							}					
						}
					}, dummy);
				};
			};
		};
		if (GE.Game.controller == 'message') {
			if ($g('message_messages')) {
				var report = $d('',[['id','GE_Report'],["style","top:"+topX+";left:"+leftX+";"]]);
				$(report).insertAfter($g("box"));
				var ML = $g('message_list');
				var links = ML.getElementsByTagName("a");
				for (i=0; i<links.length; i++) {
					addmessagelink(links[i]);
				}
				var scrPop = $sc('$(\'.ajaxMessageLink\').mousePopup(new MousePopup("'+L('OPENINPOPUP')+'"));',[['type','text/javascript']]);
				$g('folder_container').appendChild(scrPop);
			}
		}
	}
	// END of ADDMESSAGELINK
	
	// START of ADDREPORTLINK
	if (Config.get('optReportlink')) {
		function addreportlink(aEl) {
			if (aEl.parentNode && aEl.parentNode.innerHTML.indexOf(imP) == -1) { 
				var aBt = $a("&nbsp;&nbsp;",[['id','GE_Link'],['href', jsVoid]]);
				aBt.addEventListener("click", GE_Report(aEl), false);
				aBt.appendChild($img([['src',image['bPopup']],['style','float: right;z-index: 30;padding-right: 20px;'],['class','ajaxReportLink']]));
				$(aBt).insertAfter(aEl);
			}
			function GE_Report(aEl) {
				return function() {
					ajaxRequest(aEl.href, 'GET', null, function(ajaxResp) {
						var ad = ajaxND(ajaxResp);
						var aV = ad.getElementById('report_report');
						$g("GE_Report").innerHTML = '';
						$g("GE_Report").appendChild(aV);
						$g('report_report_header').style.cursor = 'move';
						var cBt = $a("&nbsp;&nbsp;",[['id','GE_Link'],['href', jsVoid]]);
						cBt.addEventListener("click", GE_Report_Clean, false);
						cBt.appendChild($img([['src',image['bClose']],['style','float:right;']]));
						$g('report_report_header').appendChild(cBt);
						for (i in $g("GE_Report").getElementsByTagName("div")) {
							if ($g("GE_Report").getElementsByTagName("div")[i].className == 'report_fight_classic') {
								$g("GE_Report").getElementsByTagName("div")[i].style.display = "block";
							}
							if ($g("GE_Report").getElementsByTagName("div")[i].className == 'report_fight_modern') {
								$g("GE_Report").getElementsByTagName("div")[i].style.display = "none";
							}
						}
						if (Config.get('optFormatter')) {GE_Report_Format("GE_Report");}
						if (Config.get('optUserlinks')) {insertUserLinks($g("GE_Report"));}
						makeDraggable($g("GE_Report"),$g("report_report_header"));
					}, dummy);
				};
			};
		};
		if (GE.Game.controller == 'report') {
			if ($g('report_reports')) {
				var report = $d('',[['id','GE_Report'],["style","top:"+topX+";left:"+leftX+";"]]);
				$(report).insertAfter($g("box"));
				var RL = $g('report_list');
				var links = RL.getElementsByTagName("a");
				for (i=0; i<links.length; i++) {	
					addreportlink(links[i]);
				}
				var scrPop = $sc('$(\'.ajaxReportLink\').mousePopup(new MousePopup("'+L('OPENINPOPUP')+'"));',[['type','text/javascript']]);
				$g('folder_container').appendChild(scrPop);
			}
		}
	}
	// END of ADDREPORTLINK
	
	// START of REDIRECT CLEANER
	if (Config.get('optRedirectcleaner')) {
		for (var i = 0; i < document.links.length; i++) {
		  linkx = document.links[i];
		  switch(0) {
			case linkx.href.indexOf("http://"+GE.Server[2]+".grepolis.com/start/redirect?url=") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 42)); break;
		  }
		}
	}
	// END of REDIRECT CLEANER

	// START of FARMER HELP
	if (Config.get('optFarmerhelp')) {
		if (GE.Game.controller == "map" || GE.Game.controller == "player") {
			(function () {
				//add a console function
				var l;
				if (typeof uW.console === 'object' && typeof uW.console.log === 'function') { l = uW.console.log; } else { l = function () { return false; }; }
				//the actual script
				var grepoFarmHelper = (function () {
					var GameData;
					var TownInfo;
					var bindDurationCounter_old;
					var sendUnits_old;
					var init_old;
					var townId = parseInt(uW.Game.townId, 10);
					var strength_prev = 0;
					var strength_now = 0;
					var mood_now = 0;
					var booty;
					var tilx_str_tot;
					var r = function (n, x) {var f = Math.pow(10, x);return Math.round(n * f) / f;};
					var r2 = function (n) {return Math.round(n * 100) / 100;};
					var calcRes = function () {
						var res = 0;
						$('.unit_input_ground').each(function () {
							var uCount = parseInt($(this).val(), 10);
							if (isNaN(uCount)) { uCount = 0; }
							if (GE.Game.controller == "map") {
								res += parseInt(GE.GameData.units[$(this).attr('name')].booty, 10) * uCount;
							} else if (GE.Game.controller == "player") {
								res += parseInt(unitCosts[$(this).attr('name')][7], 10) * uCount;
							}
						});
						if ($('#tilx_booty').is(':checked')) { res *= 1.3; }
						res = Math.floor(res);
						return res;
					};
					var handleResFarm = function () {
						var res = calcRes();
						value.set('booty' + townId, $('#tilx_booty').is(':checked'));
						booty = $('#tilx_booty').is(':checked');
						var percent=(strength_prev + strength_now)/100;
						if (percent>1){ percent=1;}
						var maxLoot = Math.round(6005*Math.pow( percent, Math.sqrt(2) ));
						var text = res;
						if (res > maxLoot ) {
							$('#tilx_res').addClass('error');
							text = res + "/" + maxLoot;
							res = maxLoot;
						} else {
							$('#tilx_res').removeClass('error');
						}
						var strength_total = (strength_prev + strength_now) / 100;
						$('#tilx_res').text(text);
						$('#tilx_mood_drop').text(r2( - res / (125 * strength_total)));
						$('#tilx_strength_drop').text(r2( - res / (375 * strength_total)));
					};
					var handleResPlayer = function () {
						var res = calcRes();
						value.set('booty' + townId, $('#tilx_booty').is(':checked'));
						booty = $('#tilx_booty').is(':checked');
						$('#tilx_res').text(res);
					};
					var calcStrength = function () {
						var strength = 0, strength_total = strength_prev + strength_now;
						$('.unit_input_ground').each(function () {
							var uCount = parseInt($(this).val(), 10);
							if (isNaN(uCount)) {
								uCount = 0;
							}
							strength += parseInt(GE.GameData.units[$(this).attr('name')].population, 10) * uCount / 5;
						});
						if (strength > 15) { 
							$('#tilx_strength').addClass('error');
							strength = 15;
						} else {
							$('#tilx_strength').removeClass('error');
						}
						strength_total += strength;
						if (strength_total > 100) {
							$('#tilx_strength_total').addClass('error');
							strength_total = 100;
						} else {
							$('#tilx_strength_total').removeClass('error');
						}
						$('#tilx_strength').text(r2(strength));
						$('#tilx_strength_total').text(r2(strength_total));
						tilx_str_tot = r2(strength_total);
						return strength;
					};
					var unitQuantity = function(){
						var $this = $(this);
						if ($("#attack_type_input").val() == 'farm_attack') {
							var population =  (GE.GameData.units[$this.attr('id')].population)/5;
							var missing_strength = 101 - $('#tilx_strength_total').text();
							if(missing_strength > 15) missing_strength  = 15;
							var total = Math.floor(missing_strength/population);
							var maxU = $this.find("span.black").text();
							total = total > maxU ? maxU : total;
							$('#unit_type_'+$this.attr('id')).attr('value', total);
						} else if($("#attack_type_input").val() == 'ask_farm_for_resources') {
							var booty = parseInt(GE.GameData.units[$this.attr('id')].booty, 10);
							booty = $('#tilx_booty').is(':checked') ? booty *= 1.3 : booty;
							var percent=(strength_prev + strength_now)/100;
							percent = percent > 1 ? 1:percent;
							var res = calcRes();
							var maxLoot = Math.floor(6005*Math.pow( percent, Math.sqrt(2) ));
							res = maxLoot - res;
							res = res < 0 ? 0:res;
							var total = Math.ceil(res/booty);
							var maxU = $this.find("span.black").text();
							total = total > maxU ? maxU : total;
							$('#unit_type_'+$this.attr('id')).attr('value',  total);
						} else { // 'ask_farm_for_units'
							$('#unit_type_' + $this.attr('id')).attr('value', $this.find("span.black").text());
						}
					};
					var calc = function () { handleResFarm(); calcStrength(); };
					var bindDurationCounter_new = function () {
						if (TownInfo.type == 'farm_town_info' && GE.Game.controller !== 'player') {
							if ($('#duration_container').length !== 1 || $('#attack_type').length !== 1) {
								alert(L('GREPO_FARM_NOT_COMPATIBLE'));
								return false; 
							}
							$g('units_form').getElementsByClassName('middle')[0].style.color = moodColor;
							if ($('#GE_FH_03').length != 0) { $('#GE_FH_03').text(" "+mood_now+"%"); } else { $g('units_form').getElementsByClassName('middle')[0].innerHTML += "<span style=\"font-weight:normal;\" id=\"GE_FH_03\"> ("+mood_now+"%)</span>"; }
							var html =	'<div style="position: absolute; width: auto; right: 107px; top: 235px;" id="GE_FH_01">' +
											'<div class="tilx_infos" style="background-image:url(' + image.booty + ');border-width:1px 0 1px 1px;padding-right:5px;width:auto;" id="tilx_res_cont">' +
												'<span id="tilx_res">0</span> ' + 
												'<label><input type="checkbox" id="tilx_booty"> <em>'+L('LOOT')+'</em></label>' +
											'</div>' +
											'<div class="tilx_infos" style="background-image:url(' + image.mood_drop + ');float:left;width:auto;border-width:0 1px 1px;padding-right:10px;" id="tilx_mood_drop">0</div>' +
											'<div class="tilx_infos" style="background-image:url(' + image.strength_drop + ');border-width:0 0 1px;width:auto;padding-right:10px;" id="tilx_strength_drop">0</div>' +
										'</div>' +
										'<div style="position: absolute; top: 172px; left: 373px;" id="GE_FH_02">' +
											'<div class="tilx_infos" style="background-image:url(' + image.strength + ');margin-top:3px;border-width:1px 1px 0;" id="tilx_strength">0</div>' +
											'<div class="tilx_infos" style="background-image:url(' + image.strength_prev + ');border-width:0 1px;" id="tilx_strength_prev">' + r2(strength_prev) + '</div>' +
											'<div class="tilx_infos" style="background-image:url(' + image.strength_now + ');border-width:0 1px;" id="tilx_strength_now">' + r2(strength_now) + '</div>' +
											'<div class="tilx_infos" style="background-image:url(' + image.strength_total + ');border-width:1px;border-top-style:dashed;" id="tilx_strength_total">0</div>' +
										'</div>';
							if ($('#GE_FH_01') && $('#GE_FH_02')) {
								$('#GE_FH_01').remove();
								$('#GE_FH_02').remove();
							}
							$('#units').after(html);
							if (booty) { $('#tilx_booty').attr('checked', 'checked'); }
							$('#tilx_res_cont').setPopup('tilx_res');
							$('#tilx_mood_drop').setPopup('tilx_mood_drop');
							$('#tilx_strength_drop').setPopup('tilx_strength_drop');
							$('#tilx_strength').setPopup('tilx_strength');
							$('#tilx_strength_prev').setPopup('tilx_strength_prev');
							$('#tilx_strength_now').setPopup('tilx_strength_now');
							$('#tilx_strength_total').setPopup('tilx_strength_total');
							$('.index_unit').attr('onclick',''); 
							$('.index_unit').bind('click', unitQuantity);
							$('.index_unit').bind('click', calc);
							$('.unit_input').bind('keyup', calc);
							$('.ui-slider').bind('slide', calc);
							$('.unit_input').bind('onchange', calc);
							$('#tilx_booty').bind('click', calc);
							calc();
							if (tilx_str_tot < 100) {
								TownInfo.setAttackType('attack_type_input', 'farm_attack');
							}
						} else if (TownInfo.type == 'town_info' || GE.Game.controller == 'player') {
							var html =	'<div class="tilx_infos" style="background-image:url(' + image.booty + ');float:right;padding-right:90px;" id="tilx_res_cont">' +
											'<span id="tilx_res"></span> ' + 
											'<label><input type="checkbox" id="tilx_booty"> <em>'+L('LOOT')+'</em></label>' + 
										'</div>';
							if ($('#tilx_res_cont').length != 0) {
								$('#tilx_res_cont').remove();
							}
							$('#duration_container').prepend(html).width(370);
							$('#way_duration, #arrival_time').width(70);
							if (booty) { $('#tilx_booty').attr('checked', 'checked'); }
							$("#tilx_res_cont").setPopup('tilx_res');
							$('.index_unit').bind('click', handleResPlayer);
							$('.unit_input').bind('keyup', handleResPlayer);
							$('#tilx_booty').bind('click', handleResPlayer);
							$('#town_info_units a').bind('click', handleResPlayer);
						}
						return bindDurationCounter_old.apply(TownInfo, arguments);
					};
					var sendUnits_new = function () {
						if (TownInfo.type === 'farm_town_info' && $('#attack_type_input').val() === 'farm_attack') {
							strength_prev += calcStrength();
							$('#tilx_strength_prev').text(r2(strength_prev));
						}
						return sendUnits_old.apply(TownInfo, arguments);
					};
					var init_new = (function() {
						var handleAjaxComplete = function () {
								uW.PopupFactory.addTexts({
									tilx_town_id: L('TILX_TOWN_ID') + "<em>[town]"+uW.TownInfo.town_id+"[/town]</em>",
									tilx_res: L('TILX_RES'),
									tilx_mood_drop: L('TILX_MOOD_DROP'),
									tilx_strength_drop: L('TILX_STR_DROP'),
									tilx_strength: L('TILX_STR'),
									tilx_strength_prev: L('TILX_STR_PREV'),
									tilx_strength_now: L('TILX_STR_NOW'),
									tilx_strength_total: L('TILX_STR_TOTAL'),
								});
								if ($(this).find('#farmtown_strength').length === 1) { 
									strength_now = parseInt($('#farmtown_strength .farm_bar_container').text(), 10); 
								}
								if ($(this).find('#farmtown_mood').length === 1) {
									var moodLevel = document.getElementById("farmtown_mood").getElementsByTagName("div")[0].id;
									mood_now = parseInt($('#farmtown_mood .farm_bar_container').text(), 10); 
									if (moodLevel == "mood1") { moodColor = "#00ff00"; } else if (moodLevel == "mood2") { moodColor = "#ffff00"; } else if (moodLevel == "mood3") { moodColor = "#ffa500"; } else { moodColor = "#ff0000"; };
								}
								if (Config.get('optUserlinks')) { insertUserLinksMap(); }
								if (Config.get('optAllylinks')) { insertAllyLinksMap(); }
								if (($('#townWindow #towninfo_towninfo').length === 1)&&($("#GE_TownId").length === 0)) {
									$('#townWindow #towninfo_towninfo .game_header').append("<span id=\"GE_TownId\">ID: "+uW.TownInfo.town_id+"</span>");
									$("#GE_TownId").setPopup('tilx_town_id');
								}
								$('#townWindow').unbind('ajaxComplete', handleAjaxComplete);
						};
						return function (tid) {
							var r = init_old.apply(TownInfo, arguments);
							strength_prev = 0;
							$('#townWindow').ajaxComplete(handleAjaxComplete);
							return r;
						}
					}());
					return function () {
						value = newValueLib(scriptId);
						if (GE.Game.controller == 'map' || GE.Game.controller == 'player') {
							booty = value.get('booty' + townId, 'false') == 'true';
							TownInfo = uW.TownInfo;
							if (typeof TownInfo !== 'object' 
							|| typeof TownInfo.bindDurationCounter !== 'function' 
							|| typeof TownInfo.sendUnits !== 'function' 
							|| typeof GE.GameData !== 'object' 
							|| typeof GE.GameData.units !== 'object') {
								alert(L('GREPO_FARM_NOT_COMPATIBLE'));
								return false;
							}
							bindDurationCounter_old = TownInfo.bindDurationCounter;
							sendUnits_old =  TownInfo.sendUnits;
							init_old =  TownInfo.init;
							TownInfo.bindDurationCounter = bindDurationCounter_new;
							TownInfo.sendUnits = sendUnits_new;
							TownInfo.init = init_new;
						}
					}
				}());
				grepoFarmHelper();
			}());
		}
	}
	// END of FARMER HELP

	// START of RESOURCES at SIMULATOR
	if (Config.get('optRescalc')) {
		ResCalc = {
			uW : null,
			$  : null,

			init : function() {
				// Get the unsafe window outside of GM.
				if (typeof unsafeWindow === 'object')
					ResCalc.uW = unsafeWindow;
				else 
					ResCalc.uW = window;

				var uW = ResCalc.uW;
				var $ = ResCalc.$;

				ResCalc.server = "";

				if ( GE.Server[1] )
					ResCalc.server = GE.Server[1];

				//get jQuery (used by Grepo, but also very usefull for us)
				ResCalc.$ = ResCalc.uW.jQuery;
				var $ = ResCalc.$;

				// Get GameData
				if ( uW.GameData && uW.GameData.units && uW.GameData.units.archer ) {
					var gunits = ResCalc.unwrap( uW.GameData.units );
					ResCalc.UnitData = {};
					for (var u in gunits) {
						var nu = 
						{ resources: gunits[u].resources,
						  population: gunits[u].population,
						  favor: gunits[u].favor
						};
						ResCalc.UnitData[ u ] = nu;
					}
					ResCalc.storeValue( "Units", ResCalc.UnitData );
				} else {
					var gunits = ResCalc.readValue( "Units" );
					if ( gunits && gunits.length > 0 )
						eval( "ResCalc.UnitData = "+gunits );
					else {
						//unitCosts
						//Wood, Stone, Iron, FoodPoints, Favor, Name, Booty
						var gzunits = unitCosts;
						ResCalc.UnitData = {};
						for (var u in gzunits) {
							var nu = 
							{ resources: { wood: gzunits[u][0], stone: gzunits[u][1], iron: gzunits[u][2] },
							  population: gzunits[u][3],
							  favor: gzunits[u][4]
							};
							ResCalc.UnitData[ u ] = nu;
						}
						ResCalc.storeValue( "Units", ResCalc.UnitData );
						ResCalc.rclog( "No unit definition found - using defaults from grepo v.1.16");
					}
				}

				// Add Pop-up texts we use here (will be bound to html elements later by "setPopup" calls)
				uW.PopupFactory.addTexts({
							rcwood_lost  : '<h4>'+L('Wood')+'</h4>'+L('NOMILITIA'),
							rcstone_lost : '<h4>'+L('Stone')+'</h4>'+L('NOMILITIA'),
							rciron_lost  : '<h4>'+L('Iron')+'</h4>'+L('NOMILITIA'),
							rcfavor_lost : '<h4>'+L('Favor')+'</h4>',
							rcbh_lost    : '<h4>'+L('BH')+'</h4>'+L('NOMILITIA'),
							rcatt_lost   : L('RCATT_LOST'),
							rcdef_lost   : L('RCDEF_LOST'),
							openResBox   : L('OPENRESBOX'),
							closeResBox  : L('CLOSERESBOX'),
							wallYourCosts: L('WALLYOURCOSTS'),
							wallFoeCosts : L('WALLFOECOSTS'),
							clickncopy	 : L('CLICKNCOPY')
						});

				uW.rc_ShowPopup = ResCalc.ShowPopup;

				if ( ResCalc.UnitData )	{
					if ( uW.document.getElementById('report_mood_strength') ) {
						ResCalc.rclog("FARM");
						// TODO
					} else if ( uW.document.URL.indexOf( "action=simulator") > 0 ) {
						ResCalc.rclog("SIM");
						// Simulation

						var oldSuccess = uW.HumanMessage.success;
						oldSuccess.bind( uW.HumanMessage );

						// Hook for the  message after simulation
						uW.HumanMessage.success = function(message) {
							var attCosts = ResCalc.calcSimRes( "building_place_att_losses_" );
							var defCosts = ResCalc.calcSimRes( "building_place_def_losses_" );
							var yourCntrl = "";
							var foeCntrl = "";							

							for( var res in {'Wood':1,'Stone':1,'Iron':1,'Favor':1,'BH':1} ) {
								$('#Att'+res ).text( attCosts[ res ] );
								$('#Def'+res ).text( defCosts[ res ] );
								yourCntrl += L(res) + ': ' + attCosts[ res ] + ', ';
								foeCntrl += L(res) + ': ' + defCosts[ res ] + ', ';
							}
							$('#GE_Stats_Report').text(L('SIMSTATS')+'\n'+L('MYCOSTS')+' ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ' + yourCntrl + '\n'+L('FOECOSTS')+' ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ' + foeCntrl);
							oldSuccess(message);
						};

						$(".game_header").parent().prepend( '<div id="fcSimShow" onclick="'
							// Adjust it below and at the right side of the last cell of the fight bonus table
							+'rc_ShowPopup(\'fcSim\',\'building_place_def_losses_wall_level\', \'right\')'
							+ '" class="place_sim_showhide" style="float:right"/>' );

						ResCalc.$('#fcSimShow').setPopup( 'openResBox');
						ResCalc.createResPopup('fcSim', L('RESTABLE'));

					} else if ( uW.document.URL.indexOf( "game/building_wall?") > 0 ) {
						// "Building wall"
						ResCalc.rclog("WALL");

						// The lists always contain 5 rows
						// #0 - Title row   ("Defeated..." / "Losses...")
						// #1 - Subtile row ("...as aggressors"  )
						// #2 - unit row
						// #3 - Subtile row ("...as defenders" )
						// #4 - unit row

						// Items on the left side - "Defeated..."
						var defeatedUnits = $('.list_item_left');

						var foeCounters = 
						{ Wood  : 0,
						  Stone : 0,
						  Iron  : 0,
						  Favor : 0,
						  BH    : 0 };

						ResCalc.calcWallRes( defeatedUnits[2], foeCounters );
						ResCalc.calcWallRes( defeatedUnits[4], foeCounters );

						// Items on the right side - "Losses..."
						var lostUnits   = $('.list_item_right');

						var yourCounters = 
						{ Wood  : 0,
						  Stone : 0,
						  Iron  : 0,
						  Favor : 0,
						  BH    : 0 };

						ResCalc.calcWallRes( lostUnits[2], yourCounters );
						ResCalc.calcWallRes( lostUnits[4], yourCounters );

						// Add "+"-Button
						$(".game_header").parent().prepend( '<div id="fcWallShow" onclick="'
							+'rc_ShowPopup(\'fcWall\',\'fcWallShow\', \'right\')'
							+ '" class="place_sim_showhide" style="float:right"/>' );

						ResCalc.createResPopup( 'fcWall', L('RAWMATSINCL') );

						$('#AttLosts').setPopup('wallYourCosts')
						$('#DefLosts').setPopup('wallFoeCosts')

						// Update counters in pop-up.
						var yourCntr = "";
						var foeCntr = "";
						for( var res in {'Wood':1,'Stone':1,'Iron':1,'Favor':1,'BH':1} ) {
							$('#Att'+res ).text( ResCalc.fInt( yourCounters[ res ] ) );
							$('#Def'+res ).text( ResCalc.fInt( foeCounters[ res ] ) );
							yourCntr += L(res) +': ' + ResCalc.fInt( yourCounters[ res ] ) + ', ';
							foeCntr += L(res) +': ' + ResCalc.fInt( foeCounters[ res ] ) + ', ';
						}
						$('#GE_Stats_Report').text(L('STATS')+'\n'+L('MYCOSTS')+' ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ' + yourCntr + '\n'+L('FOECOSTS')+' ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ' + foeCntr);
					}
				}
			},
			
			// Our console function
			// Used for debugging purposes.
			rclog : function(msg) {
				try {
					if ( typeof GM_log !== 'undefined' )
						GM_log( msg );
					else {
						ResCalc.uW.console.log(msg);
					}
				}
				catch (e) { };
			},
			
			// Some DOM functions return "wrapped" objects with restricted access to some properties.
			// We need the real ones... 
			unwrap : function(node) {
				return (node && node.wrappedJSObject) ? node.wrappedJSObject : node;
			},

			/**
			 * Escapes a string for use in object dumps,
			 * without any prototype magic.
			 */
			escapeString : function(str) {  
			  var sb = "";
			  for (var i=0;i<str.length;i++) {
				var c=str[i];
				var cc=str.charCodeAt(i);
				if ((cc>=0x000 && cc<=0x01F) || (cc>=0x007F && cc<=0x09F)) {
				  // Use Unicode
				  sb += "\\u";
				  var hexval= cc.toString(16);
				  while( hexval.length<2) hexval = "0"+hexval;
				  sb += hexval;
				} 
				else
				  switch (c) {
					case "'" : sb += "\\'" ; break;
					case '"' : sb += "\\\""; break;
					case '\\': sb += "\\\\"; break;
					case '/' : sb += "\\/" ; break;
					case '\b': sb += "\\b" ; break;
					case '\f': sb += "\\f" ; break;
					case '\n': sb += "\\n" ; break;
					case '\r': sb += "\\r" ; break;
					case '\t': sb += "\\t" ; break;
					default  : sb += c     ; break;
				  }
			  }
			  return sb;
			},

			
			/**
			 * JSON like stringify funtion.
			 * Creates simple javascript source from objects, but not real JSON.
			 */
			xString : function(obj) {
			  if (obj===null) return 'null';

			  switch (typeof obj) {
				case 'undefined':
				case 'unknown'  : return '';
				case 'function' :
				case 'number'   :
				case 'boolean'  : return obj.toString();
				case 'string'   :
				  return '"'+ResCalc.escapeString(obj)+'"';
				case 'object':
				  if (obj.nodeType != 1) {
					var x=[];
					if ('splice' in obj && 'join' in obj) { 
					  // Array
					  for (var e in obj)
						x.push(ResCalc.xString(obj[e]));
					  return '['+x.join(',')+']';
					} else {
					  for (var e in obj)
						x.push( '"'+e+'":'+ResCalc.xString(obj[e]));
					  return '{'+x.join(',')+'}';
					}
				  }
				break;
			  }
			  return obj.toString();
			},

			storeValue : function( name, value ) {
				try {
						ResCalc.rclog( "storing "+ResCalc.server+"."+name );
						value = ResCalc.xString( value );
						GM_setValue( ResCalc.server+"."+name, value );
					}
				catch (e) {
					ResCalc.rclog( "failed - "+e );
				}
			},

			readValue : function( name ) {
				try {
					var data = GM_getValue( ResCalc.server+"."+name );
					return data;
				} catch (e) {
					ResCalc.rclog( e );
				}
				return null;
			},
			
			// Convenience replacement for "parseInt".
			pInt : function( txt, dft ) {
			  var v=parseInt( txt, 10 );
			  if (isNaN(v)) v=(dft===undefined)?0:dft;
			  return v;
			},

			// Fills up numbers (to look more pretty)
			pad : function(number, digits) {
			  var x = ""+number;
			  while(x.length<digits) x = "0"+x;
			  return x;
			},
			
			// Format large integer values
			// E.g. "1000" will be "1.000"
			fInt : function( val ) {
				  var txt = "";
				  while( val >= 1000 ) {
					  var nv = Math.floor(val/1000);
					  txt = " "+ResCalc.pad(val-(nv*1000),3)+txt;
					  val = nv;
				  }
				  txt = ""+val+txt;
				  return txt;
			},
			
			// Crossbrowser event fixing (stupid IE).
			cbFix : function(e) { 
			  if (undefined == e) e=ResCalc.uW.event;
			  if (undefined == e.layerX) e.layerX=e.offsetX;
			  if (undefined == e.layerY) e.layerY=e.offsetY;
			  return e;
			},
			
			// Get the absolute left position of some html element inside the page. 
			getLeft : function(el) {
			   var x = 0;
			   while (el != null) { x += el.offsetLeft; el = el.offsetParent;}
			   return x;
			},
			
			// Get the absolute top position of some html element inside the page.
			getTop : function(el) {
			   var y = 0;
			   while (el != null) { y += el.offsetTop; el = el.offsetParent;}
			   return y;
			},
			
			//////////////////////////////////////////////
			// Simple "drag" support.
			//////////////////////////////////////////////
			drag : {
			   obj : null,

			   init : function(oAnchor, oRoot ) {
				  var a = ResCalc.unwrap( ResCalc.uW.document.getElementById(oAnchor) );
				  var o = ResCalc.unwrap( ResCalc.uW.document.getElementById(oRoot) );
				  
				  a.onmousedown = ResCalc.drag.start;
				  a.root = o ? o: a;

				  if (isNaN(parseInt(a.root.style.left))) a.root.style.left= "0px";
				  if (isNaN(parseInt(a.root.style.top ))) a.root.style.top = "0px";
			   },

			   start : function(e) {
				  var o = ResCalc.drag.obj = ResCalc.unwrap(this);
				  var e = ResCalc.cbFix(e);
				  var y = ResCalc.pInt(o.root.style.top);
				  var x = ResCalc.pInt(o.root.style.left);
				  o.lastMouseX   = e.clientX;
				  o.lastMouseY   = e.clientY;

				  var d = ResCalc.uW.document;
				  d.onmousemove = ResCalc.drag.drag;
				  d.onmouseup   = ResCalc.drag.end;
				  return false;
			   },

			   drag : function(e) {
				  e = ResCalc.cbFix(e);
				  var o = ResCalc.drag.obj;
				  var rt = o.root;

				  var ey= e.clientY;
				  var ex= e.clientX;
				  var y = ResCalc.pInt(rt.style.top);
				  var x = ResCalc.pInt(rt.style.left);
				  var w = rt.offsetWidth;
				  var nx, ny;

				  nx = ex - o.lastMouseX;
				  ny = ey - o.lastMouseY;

				  var rtLeft = ResCalc.getLeft(rt);
				  var ww = ResCalc.uW.innerWidth;

				  x+=nx;
				  if (x<0) x=0;
				  if ((x+w)>ww) x=ww-w;

				  y+=ny;
				  if (y<0) y=0;

				  rt.style.left = x+"px";
				  rt.style.top  = y+"px";

				  o.lastMouseX   = ex;
				  o.lastMouseY   = ey;

				  return false;
			   },

			   end : function() {
				  var d = ResCalc.uW.document;
				  d.onmousemove = null;
				  d.onmouseup   = null;
				  ResCalc.drag.obj = null;
			   }
			},

			/** 
			 * Create some pop-up as hidden div add the end of body. 
			 * Used by the other "create" functions, simply to encapsulate
			 * the general code for handling "grepo-style" pop-ups here).
			 * @param idPrefix  Prefix to use for all IDs (to make it unique).
			 * @param title     Text to display in title.
			 * @param content   HTML code to put in the content area of the popup.
			 */
			createPopup : function( idPrefix, title, content ) {
				ResCalc.$( "body" ).after( 

					'<div style="z-index: 21; position:absolute; left:0px; top:0px; display:none;" id="'+idPrefix+'ResCostBox">'+
						'<table cellspacing="0" cellpadding="0" class="popup" style="z-index: 21;">'+
						'	<tbody><tr class="popup_top">'+
						'		<td class="popup_top_left"></td>'+
						'		<td class="popup_top_middle"></td>'+
						'		<td class="popup_top_right"></td>'+
						'	</tr>'+
						'	<tr>'+
						'		<td class="popup_middle_left"></td>'+
						'		<td id="popup_content" class="popup_middle_middle"><div class="fcWinHeader" id="'+idPrefix+'boxDragBar">'+title+'</div>'+content+'</td>'+
						'		<td class="popup_middle_right"></td>'+
						'	</tr>'+
						'	<tr class="popup_bottom">'+
						'		<td class="popup_bottom_left"></td>'+
						'		<td class="popup_bottom_middle"></td>'+
						'		<td class="popup_bottom_right"></td>'+
						'	</tr>'+
						'</tbody></table>'+
					'</div>' );

				// Delay drag binding, otherwise some of the properties may not be initializied.
				ResCalc.uW.setTimeout( ResCalc.drag.init, 100, idPrefix+'boxDragBar', idPrefix+'ResCostBox' );
			},


			/** 
			 * Create the a resource pop-up. 
			 * @param idPrefix  Prefix to use for all IDs (to make it unique).
			 * @param title     Text to display in title.
			 */
			createResPopup : function( idPrefix, title ) {
				ResCalc.createPopup( idPrefix, title, 

				  '<div id="GE_Stats_Tbl"><table>'
				+ '<tr>'
				+    '<th><h6>'+L('STATS')+'</h6></th>'
				+    '<th id="HeadWood" />'
				+    '<th id="HeadStone" />'
				+    '<th id="HeadIron" />'
				+    '<th id="HeadFavor" />'
				+    '<th id="HeadBH" />'
				+ '</tr>'
				+ '<tr>'
				+    '<td id="AttLosts" />'
				+    '<td id="AttWood" />'
				+    '<td id="AttStone" />'
				+    '<td id="AttIron" />'
				+    '<td id="AttFavor" />'
				+    '<td id="AttBH" "/>'
				+ '</tr>'
				+ '<tr>'
				+    '<td id="DefLosts" />'
				+    '<td id="DefWood" />'
				+    '<td id="DefStone" />'
				+    '<td id="DefIron" />'
				+    '<td id="DefFavor" />'
				+    '<td id="DefBH" />'
				+ '</tr>' 
				+ '</table><h6>'+L('STATS')+' - '+L('TXTC')+'</h6><textarea id="GE_Stats_Report" onclick="this.select()"></textarea></div>'
				+ '</div>' );

				var $ = ResCalc.$;
				// Bind info pop-ups to headers.
				$('#HeadWood' ).setPopup('rcwood_lost' );
				$('#HeadStone').setPopup('rcstone_lost');
				$('#HeadIron' ).setPopup('rciron_lost' );
				$('#HeadFavor').setPopup('rcfavor_lost');
				$('#HeadBH'   ).setPopup('rcbh_lost'   );
				$('#AttLosts').setPopup('rcatt_lost');
				$('#DefLosts').setPopup('rcdef_lost');
				$('#GE_Stats_Report').setPopup('clickncopy');
			},

			// Flags to initicate that a pop-up was already shown and should not be aligned again.
			bBoxOnceShown : {},

			/** 
			 * Displays a pop-up.
			 * @param idPrefix    see createResPopup
			 * @param adjustToId  Id of element that should be used to adjust the box.
			 * @param adjustMode  "left" or "right"
			 */
			ShowPopup : function(idPrefix, adjustToId, adjustMode) {
				var $ = ResCalc.$;
				var showBox = $('#'+idPrefix+'Show')[0];
				var resBox = $('#'+idPrefix+'ResCostBox')[0];

				var bShow = resBox.style.display === "none";

				showBox.className = bShow ? "place_sim_bonuses_more_confirm" : "place_sim_showhide";
				$('#'+idPrefix+'Show').setPopup( bShow ? 'closeResBox' : 'openResBox' );
				resBox.style.display = bShow ? "block" : "none";
				
				if ( !ResCalc.bBoxOnceShown[idPrefix] ) {
					ResCalc.bBoxOnceShown[idPrefix] = true;
					var adjNode = $( '#'+adjustToId )[0];
					if (idPrefix == "fcSim") { resBoxTop = -140; resBoxLeft = 80; } else if (idPrefix == "fcWall") { resBoxTop = 2; resBoxLeft = 2; }
					resBox.style.top  = ( ResCalc.getTop( adjNode )+adjNode.offsetHeight + resBoxTop )+"px";
					resBox.style.left = ( ResCalc.getLeft( adjNode) + adjNode.offsetWidth - resBox.offsetWidth + resBoxLeft )+"px";
				}
				return false;
			},
			
			/**
			 * Get data from  simulation result.
			 * @param idPrefix  Prefix for html ids which contain result values.
			 */
			calcSimRes : function ( idPrefix ) {
				var sWood    = 0;
				var sStone   = 0;
				var sSilver  = 0;
				var sBH      = 0;
				var sFavor   = 0;
			
				for (var uName in ResCalc.UnitData) {
					var node = ResCalc.uW.document.getElementById( idPrefix+uName );
					if ( node ) {
						var count = parseInt( node.innerHTML );
						if ( ! isNaN( count ) ) {
							var uc = ResCalc.UnitData[ uName];
							if ( uc ) {
								if ( uc.resources ) {
									sWood    += count * uc.resources.wood;
									sStone   += count * uc.resources.stone;
									sSilver  += count * uc.resources.iron;
								}
								if ( uc.population )
									sBH      += count * uc.population;
								if ( uc.favor )
									sFavor   += count * uc.favor;
							}
						}
					}
				}
				return { Wood  : ResCalc.fInt(sWood),
						 Stone : ResCalc.fInt(sStone),
						 Iron  : ResCalc.fInt(sSilver),
						 Favor : ResCalc.fInt(sFavor ),
						 BH    : ResCalc.fInt(sBH) };
			},
			
			calcWallRes : function ( unitRow, counters ) {
				var unitRE = /\/(\w+)_50x50\.png(?:.+?)class="place_unit_black bold">(\d+)<\/span>/ig;
				var html = unitRow.innerHTML.replace(/(\n)/g,"");
				var r;
				try {
					while ( r = unitRE.exec( html ) ) {
						var count = parseInt( r[2] );
						if ( ! isNaN( count ) ) {
							var uc = ResCalc.UnitData[ r[1] ];
							if ( uc ) {
								if ( uc.resources ) {
									counters.Wood += count * uc.resources.wood;
									counters.Stone+= count * uc.resources.stone;
									counters.Iron += count * uc.resources.iron;
								}
								if ( uc.population )
									counters.BH   += count * uc.population;
								if ( uc.favor )
									counters.Favor+= count * uc.favor;
							}
						}
					}
				} catch(e) {
					ResCalc.rclog( e );
				}
			}
		};
		if (GE.Game.controller == 'building_wall' || uW.document.URL.indexOf( "action=simulator") > 0) {
			ResCalc.init();
		}
	}
	// END of RESOURCES at SIMULATOR

// var stop = new Date().getMilliseconds();
// var executionTime = stop - start;
// console.log("Grepolis Extended executed in " + executionTime + " milliseconds");

// };

function functionMain(e) {
	if (Config.get('optIslandpm')) { GE_IslandPM(); }
	if (Config.get('optProdinfo')) { GE_ProdInfo(); }
	if (Config.get('optBuildingpnts') || Config.get('optBuildingfrmt')) { GE_Builds(); }
}

window.addEventListener('load', functionMain, false);

//
//
//
//
// optimizador de recursos



( function() {

	// access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object') {
		uW = unsafeWindow;
	} else {
		uW = window;
	}

	// get jQuery
	var $ = uW.jQuery;

	// add a console function
	var l;
	if (typeof uW.console === 'object' && typeof uW.console.log === 'function') {
		l = uW.console.log;
	} else {
		l = function() {
			return false;
		};
	}

	// cookie-based alternative for GM_*Value functions
	var value, newValueLib = function(prefix) {
		var prefix = 'tilx_' + prefix + '_';

		// cookie-functions by Peter-Paul Koch
		// (http://www.quirksmode.org/js/cookies.html#script)
		var createCookie = function(name, value, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		};
		var readCookie = function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for ( var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1, c.length);
				}
				if (c.indexOf(nameEQ) == 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
			return undefined;
		};

		return {
			set : function(name, value) {
				createCookie(prefix + name, value, 365);
			},
			get : function(name, def) {
				var ret = readCookie(prefix + name);
				if (ret !== undefined) {
					return ret;
				} else {
					return def;
				}
			}
		};
	};

	// Object.create() by Douglas Crockford
	if (typeof Object.create !== 'function') {
		Object.create = function(o) {
			var F = function() {
			};
			F.prototype = o;
			return new F();
		};
	}


// the actual script
	var grepoFarmer = ( function() {

		var SCRIPTNAME = 'grepoFarmer';

		var images = {
			'booty' :'data:image/png;base64,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',
			'mood_drop' :'data:image/png;base64,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',
			'strength_drop' :'data:image/png;base64,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',
			'strength' :'data:image/png;base64,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',
			'strength_prev' :'data:image/png;base64,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',
			'strength_now' :'data:image/png;base64,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',
			'strength_total' :'data:image/png;base64,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'
		};

		var GameData;
		var TownInfo;

		var bindDurationCounter_old;
		var sendUnits_old;
		var init_old;

		var townId = parseInt(uW.Game.townId, 10);

		var strength_prev = 0;
		var strength_now = 0;
		var booty;

		var r = function(n, x) {
			var f = Math.pow(10, x);
			return Math.round(n * f) / f;
		};

		var r2 = function(n) {
			return Math.round(n * 100) / 100;
		};

		var initStyle = function() {
			var style = [];
			style
					.push('.tilx_infos {display:block; padding:7px 0 0 35px; height:23px; border:solid #f7cd81 0px; overflow:hidden; white-space:nowrap; background-position:3px 50%; background-repeat:no-repeat; }');
			style.push('.tilx_infos.error, .tilx_infos .error {color:#c00}');
			$('<style type="text/css">' + style.join("\n") + '</style>')
					.appendTo('head');
		}

		var calcRes = function() {
			var res = 0;

			$('.unit_input_ground').each(
					function() {
						var uCount = parseInt($(this).val(), 10);
						if (isNaN(uCount)) {
							uCount = 0;
						}
						res += parseInt(
								GameData.units[$(this).attr('name')].booty, 10)
								* uCount;
					});
			if ($('#tilx_booty').is(':checked')) {
				res *= 1.3;
			}
			res = Math.floor(res);

			return res;
		};

		var handleResFarm = function() {
			var res = calcRes();

			value.set('booty' + townId, $('#tilx_booty').is(':checked'));
			booty = $('#tilx_booty').is(':checked');

			// var maxLoot = Math.round(9*Math.pow( strength_now, Math.sqrt(2)
			// ));
			var percent = (strength_prev + strength_now) / 100;
			if (percent > 1) {
				percent = 1;
			}
			var maxLoot = Math.round(6005 * Math.pow(percent, Math.sqrt(2)));
			var text = res;

			if (res > maxLoot) {
				$('#tilx_res').addClass('error');
				text = res + "/" + maxLoot;
				res = maxLoot;

			} else {
				$('#tilx_res').removeClass('error');
			}

			var strength_total = (strength_prev + strength_now) / 100;

			$('#tilx_res').text(text);
			$('#tilx_mood_drop').text(r2(-res / (125 * strength_total)));
			$('#tilx_strength_drop').text(r2(-res / (375 * strength_total)));
		};

		var handleResPlayer = function() {
			var res = calcRes();

			value.set('booty' + townId, $('#tilx_booty').is(':checked'));
			booty = $('#tilx_booty').is(':checked');

			$('#tilx_res').text(res);
		};

		var calcStrength = function() {
			var strength = 0, strength_total = strength_prev + strength_now;

			$('.unit_input_ground').each(
					function() {
						var uCount = parseInt($(this).val(), 10);
						if (isNaN(uCount)) {
							uCount = 0;
						}
						strength += parseInt(GameData.units[$(this)
								.attr('name')].population, 10)
								* uCount / 5;
					});

			if (strength > 15) {
				$('#tilx_strength').addClass('error');
				strength = 15;
			} else {
				$('#tilx_strength').removeClass('error');
			}

			strength_total += strength;
			if (strength_total > 100) {
				$('#tilx_strength_total').addClass('error');
				strength_total = 100;
			} else {
				$('#tilx_strength_total').removeClass('error');
			}

			$('#tilx_strength').text(r2(strength));
			$('#tilx_strength_total').text(r2(strength_total));

			return strength;
		};

		var unitQuantity = function() {
			var $this = $(this);
			if ($("#attack_type_input").val() == 'farm_attack') {
				var population = (GameData.units[$this.attr('id')].population) / 5;
				var missing_strength = 100 - $('#tilx_strength_total').text();
				if (missing_strength > 15)
					missing_strength = 15;
				var total = Math.floor(missing_strength / population);
				var maxU = $this.find("span.black").text();
				total = total > maxU ? maxU : total;
				$('#unit_type_' + $this.attr('id')).attr('value', total);
			} else if ($("#attack_type_input").val() == 'ask_farm_for_resources') {
				var booty = parseInt(GameData.units[$this.attr('id')].booty, 10);
				booty = $('#tilx_booty').is(':checked') ? booty *= 1.3 : booty;
				var percent = (strength_prev + strength_now) / 100;
				percent = percent > 1 ? 1 : percent;
				var res = calcRes();
				var maxLoot = Math
						.floor(6005 * Math.pow(percent, Math.sqrt(2)));
				res = maxLoot - res;
				res = res < 0 ? 0 : res;

				var total = Math.ceil(res / booty);
				var maxU = $this.find("span.black").text();
				total = total > maxU ? maxU : total;

				$('#unit_type_' + $this.attr('id')).attr('value', total);
			}else{//'ask_farm_for_units'
				$('#unit_type_' + $this.attr('id')).attr('value', $this.find("span.black").text());
			}
		};

		var calc = function() {
			handleResFarm();
			calcStrength();

		};

		var bindDurationCounter_new = function() {
			if (TownInfo.type === 'farm_town_info') {
				if ($('#duration_container').length !== 1
						|| $('#attack_type').length !== 1) {
					alert('Benoetigte HTML-Elemente nicht vorhanden! Das Script grepoFarmhelper ist mit diese Version von Grepolis nicht kompatibel.');
					return false;
				}

				TownInfo.setAttackType('attack_type_input', 'farm_attack');

				var html = '<div style="position: absolute; width: auto; right: 107px; top: 235px;">'
						+ '<div class="tilx_infos" style="background-image:url('
						+ images.booty
						+ ');border-width:1px 0 1px 1px;padding-right:5px;width:auto;" id="tilx_res_cont">'
						+ '<span id="tilx_res">0</span> '
						+ '<label><input type="checkbox" id="tilx_booty"> With <em>Booty</em></label>'
						+ '</div>'
						+ '<div class="tilx_infos" style="background-image:url('
						+ images.mood_drop
						+ ');float:left;width:auto;border-width:0 1px 1px;padding-right:10px;" id="tilx_mood_drop">0</div>'
						+ '<div class="tilx_infos" style="background-image:url('
						+ images.strength_drop
						+ ');border-width:0 0 1px;width:auto;" id="tilx_strength_drop">0</div>'
						+ '</div>'
						+ '<div style="position: absolute; top: 172px; left: 373px;">'
						+ '<div class="tilx_infos" style="background-image:url('
						+ images.strength
						+ ');margin-top:3px;border-width:1px 1px 0;width:35px;" id="tilx_strength">0</div>'
						+ '<div class="tilx_infos" style="background-image:url('
						+ images.strength_prev
						+ ');border-width:0 1px;" id="tilx_strength_prev">'
						+ r2(strength_prev)
						+ '</div>'
						+ '<div class="tilx_infos" style="background-image:url('
						+ images.strength_now
						+ ');border-width:0 1px;" id="tilx_strength_now">'
						+ r2(strength_now)
						+ '</div>'
						+ '<div class="tilx_infos" style="background-image:url('
						+ images.strength_total
						+ ');border-width:1px;border-top-style:dashed;" id="tilx_strength_total">0</div>'
						+ '</div>';

				$('#units').after(html);

				if (booty) {
					$('#tilx_booty').attr('checked', 'checked');
				}

				$('#tilx_res_cont').setPopup('tilx_res');
				$('#tilx_mood_drop').setPopup('tilx_mood_drop');
				$('#tilx_strength_drop').setPopup('tilx_strength_drop');
				$('#tilx_strength').setPopup('tilx_strength');
				$('#tilx_strength_prev').setPopup('tilx_strength_prev');
				$('#tilx_strength_now').setPopup('tilx_strength_now');
				$('#tilx_strength_total').setPopup('tilx_strength_total');

				$('.index_unit').attr('onclick', '');
				$('.index_unit').bind('click', unitQuantity);
				$('.index_unit').bind('click', calc);

				$('.unit_input').bind('keyup', calc);
				$('#tilx_booty').bind('click', calc);

				calc();
			} else if (TownInfo.type === 'town_info') {
				var html = '<div class="tilx_infos" style="background-image:url('
						+ images.booty
						+ ');float:right;" id="tilx_res_cont">'
						+ '<span id="tilx_res"></span> '
						+ '<label><input type="checkbox" id="tilx_booty"> With <em>Booty</em></label>'
						+ '</div>';

				$('#duration_container').prepend(html).width(300);

				$('#way_duration, #arrival_time').width(70);

				if (booty) {
					$('#tilx_booty').attr('checked', 'checked');
				}

				$("#tilx_res_cont").setPopup('tilx_res');

				$('.index_unit').bind('click', handleResPlayer);
				$('.unit_input').bind('keyup', handleResPlayer);
				$('#tilx_booty').bind('click', handleResPlayer);
			}

			return bindDurationCounter_old.apply(TownInfo, arguments);
		};

		var sendUnits_new = function() {
			if (TownInfo.type === 'farm_town_info'
					&& $('#attack_type_input').val() === 'farm_attack') {
				strength_prev += calcStrength();
				$('#tilx_strength_prev').text(r2(strength_prev));
			}

			return sendUnits_old.apply(TownInfo, arguments);
		};

		var init_new = ( function() {
			var handleAjaxComplete = function() {
				if ($(this).find('#farmtown_strength').length === 1) {
					strength_now = parseInt($(
							'#farmtown_strength .farm_bar_container').text(),
							10);
				}
				$('#townWindow').unbind('ajaxComplete', handleAjaxComplete);
			};

			return function(tid) {
				var r = init_old.apply(TownInfo, arguments);

				strength_prev = 0;

				$('#townWindow').ajaxComplete(handleAjaxComplete);

				return r;
			}
		}());

		return function() {
			value = newValueLib(SCRIPTNAME);
			if (document.URL.indexOf('game/map') !== -1) {
				initStyle();

				booty = value.get('booty' + townId, 'false') == 'true';

				GameData = uW.GameData;
				TownInfo = uW.TownInfo;

				if (typeof TownInfo !== 'object'
						|| typeof TownInfo.bindDurationCounter !== 'function'
						|| typeof TownInfo.sendUnits !== 'function'
						|| typeof GameData !== 'object'
						|| typeof GameData.units !== 'object') {
					alert('This version is not compatible with the current grepolis version!');
					return false;
				}

				bindDurationCounter_old = TownInfo.bindDurationCounter;
				sendUnits_old = TownInfo.sendUnits;
				init_old = TownInfo.init;

				TownInfo.bindDurationCounter = bindDurationCounter_new;
				TownInfo.sendUnits = sendUnits_new;
				TownInfo.init = init_new;

				uW.PopupFactory
						.addTexts( {
							tilx_res :'Maximum loot of the current attack',
							tilx_mood_drop :'Mood lowering of the current attack (when fully looted)',
							tilx_strength_drop :'Strength reduction of the current attack (when fully looted)',
							tilx_strength :'Increasing strength of the current attack',
							tilx_strength_prev :'Increased strength of previous attacks',
							tilx_strength_now :'Strength of the farming village at the moment',
							tilx_strength_total :'New strength in total'
						});
			}
		}
	}());

	grepoFarmer();
}());