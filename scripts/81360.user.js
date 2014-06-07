// ==UserScript==
// @name          Grepolis Shortcut
// @version       7.0.dev.5
// @description   Grepolis Shortcut
// @namespace     Doc Marco & die PC-Helfer <http://www.sdm-scholz.de>
// @author        Fwiep, based on the original code by Doc Marco
// @include       http://*.grepolis.*
// @source        http://userscripts.org/scripts/show/81360
// @license       GNU General Public License GPLv3
// ==/UserScript==
/**
 * This script is licensed  under:
 * GNU General Public License GPLv3
 * To view a copy of this license, visit http://www.gnu.org/licenses/gpl.html
 * Copyright © Doc Marco & die PC-Helfer, 2009-2010
 * Initial script © Copyright Doc Marco & die PC-Helfer (aka Đð¢ M@rco PC-Ŧræk), 2009
 * Snipes copied from http://userscripts.org/scripts/show/71132 - Dreambraker
 * Refactored and improved by Fwiep
 **/
const VERSION = '7.0.dev.5';

// Configuration
const SHOW_BUILD_LEVELS = true;
const SHOW_IMAGES = true;
const USE_GREPO_STATS = true;
const SHOW_BUILDINGS_NOT_PRESENT = false;
const TOP_MENU_ITEMS = ['main', ['buildings', 'barracks', 'docks', 'academy', 'market', 'temple', 'hide'],'beta', 'gamma'];
const LEFT_MENU_ITEMS = ['place'];
const OVERRIDE_REQUIREMENT = true;

// Translations
const translations = {
	de: {
		language_name: "german/deutsch",
		need_curator: "You need a curator to use this userscript.",
		//curator, trader, priest, commander, captain
		main: "Senat",
		barracks: "Kaserne",
		academy: "Akademie",
		docks: "Hafen",
		market: "Markt",
		place: "Agora",
		temple: "Tempel",
		wall: "Mauer",
		hide: "Höhle",
		stats: "Deine Statistik",
		you: "DU",
		ally: "Allianz",
		map: "Karte",
		pad: "Notiz erstellen",
		manage: "Notizen verwalten",
		aus: "Notizen exportieren",
		imp: "Notizen importieren",
		edit: ".css ändern (Aussehen anpassen)",
		topbar: "Topbar",
		close: "Schliesen-Button",
		closeb: "Schliesen",
		remove: "Notiz löschen",
		save: "Speichern",
		two: "doppel klicken um den Eintrag einfügen/ändern",
		speak: "Sprachen",
		buildings: "Gebäude",
		worlds: "Welten",
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	es: {
		language_name: "spanish/espanol",
		need_curator: "You need a curator to use this userscript.",
		main: "Senado",
		barracks: "Cuartel",
		academy: "Academia",
		docks: "Puerto",
		market: "Mercado",
		place: "Ágora",
		temple: "Templo",
		wall: "Muralla",
		hide: "Cueva",
		stats: "Sus estadísticas",
		you: "Usted",
		ally: "Alianza",
		map: "Mapa",
		speak: "Idiomas",
		pad: "Notas",
		manage: "Editar las notas",
		aus: "Exportar notas",
		imp: "Importar notas",
		edit: "Editar el estilo",
		topbar: "Topbar",
		close: "Botón cerrar",
		closeb: "Cerrar",
		remove: "Borrar Nota",
		save: "Guardar",
		two: "Doble click para editar",
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	gr: {
		language_name: "ελληνικά/greek",
		need_curator: "You need a curator to use this userscript.",
		main: "Σύγκλητος",
		barracks: "Στρατώνες",
		academy: "Ακαδημία",
		docks: "Λιμάνι",
		market: "Παζάρι",
		place: "Αγορά",
		temple: "Ναός",
		wall: "Τείχος της πόλης",
		hide: "Σπηλιά",
		stats: "ΣΤΑΤΙΣΤΙΚΑ",
		you: "Εσύ",
		ally: "Συμμαχία σου",
		map: "Χάρτης",
		speak: "Γλώσσες",
		pad: "Σημειώσεις",
		manage: "Manage Notes",
		aus: "Εξαγωγή",
		imp: "Εισαγωγή",
		edit: "επεξεργασία στυλ",
		topbar: "Top bar",
		close: "Κλείσιμο",
		closeb: "Κλείσιμο",
		remove: "Διαγραφή",
		save: "Αποθήκευση",
		two: "Επεξεργασία (διπλό κλικ)",
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	fr: {
		language_name: "french/francais",
		need_curator: "You need a curator to use this userscript.",
		main: "Sénat",
		barracks: "Caserne",
		academy: "Académie",
		docks: "Port",
		market: "Marché",
		place: "Agora",
		temple: "Temple",
		wall: "Mur",
		hide: "Grotte",
		stats: "Ta statistique",
		you: "Tu",
		ally: "Alliance",
		map: "Carte",
		pad: "Notes",
		manage: "contrôlez les notes",
		aus: "notes d'exportation",
		imp: "notes d'importation",
		edit: "éditez le modèle",
		topbar: "Topbar",
		close: "bouton étroit",
		closeb: "fin",
		remove: "note de suppression",
		save: "sauf",
		two: "double clic pour éditer la note",
		speak: "Langues",
		buildings: "Buildings",
		worlds: "Mondes",
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	cz: {
		language_name: "czech/Ceština",
		need_curator: "You need a curator to use this userscript.",
		main: "Senát",
		barracks: "Kasárna",
		academy: "Akademie",
		docks: "Přístav",
		market: "Tržiště",
		place: "Agora",
		temple: "Chrám",
		wall: "Hradby",
		hide: "Höhle",
		//TODO Translate
		stats: "Deine Statistik",
		//TODO Translate
		you: "DU",
		//TODO Translate
		ally: "Allianz",
		//TODO Translate
		map: "Karte",
		//TODO Translate
		speak: "Languages",
		//TODO Translate
		pad: "Notas",
		//TODO Translate
		manage: "Notizen verwalten",
		//TODO Translate
		aus: "Notizen exportieren",
		//TODO Translate
		imp: "Notizen importieren",
		//TODO Translate
		edit: ".css ändern (Aussehen anpassen)",
		//TODO Translate
		topbar: "Topbar",
		//TODO Translate
		close: "Schliesen-Button",
		//TODO Translate
		closeb: "Schliesen",
		//TODO Translate
		remove: "Notiz löschen",
		//TODO Translate
		save: "Speichern",
		//TODO Translate
		two: "doppel klicken um den Eintrag einfügen/ändern",
		//TODO Translate
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	nl: {
		need_curator: "Om van dit userscript gebruik te maken heb je een bestuurder nodig.",
		language_name: "Dutch/Nederlands",
		main: "Senaat",
		barracks: "Kazerne",
		academy: "Academie",
		docks: "Haven",
		market: "Markt",
		place: "Agora",
		temple: "Tempel",
		wall: "Muur",
		hide: "Grot",
		stats: "Statistieken",
		you: "Speler",
		ally: "Alliantie",
		map: "Kaart",
		speak: "Talen",
		pad: "Blocnote",
		manage: "beheernota's",
		aus: "de uitvoernota's",
		imp: "de invoernota's",
		edit: "geef stijl uit",
		topbar: "Topbar",
		close: "Sluiten",
		closeb: "sluit",
		remove: "Nota verwijderen",
		save: "Opslaan",
		two: "dubbelklikken om nota uit te geven",
		speak: "Taal",
		buildings: "Gebouwen",
		worlds: "Werelden",
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	se: {
		language_name: "schwedisch/swedish",
		need_curator: "You need a curator to use this userscript.",
		main: "Senaten",
		barracks: "Kasern",
		academy: "Akademi",
		docks: "Hamn",
		market: "Marknad",
		place: "Torg",
		temple: "Tempel",
		wall: "Wall",
		hide: "Höhle",
		stats: "Your Statics",
		//TODO Translate
		you: "YOU",
		//TODO Translate
		ally: "Alliance",
		//TODO Translate
		map: "Map",
		//TODO Translate
		speak: "Languages",
		//TODO Translate
		pad: "Notas",
		//TODO Translate
		manage: "manage Notes",
		//TODO Translate
		aus: "export Notes",
		//TODO Translate
		imp: "import Notes",
		//TODO Translate
		edit: "edit Style",
		//TODO Translate
		topbar: "Topbar",
		//TODO Translate
		close: "Close-Button",
		//TODO Translate
		closeb: "Close",
		//TODO Translate
		remove: "delete Note",
		//TODO Translate
		save: "Save",
		//TODO Translate
		two: "double click to edit Note",
		//TODO Translate
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	ro: {
		language_name: "romanian/româna",
		need_curator: "You need a curator to use this userscript.",
		main: "Senat",
		barracks: "Cazarmă",
		academy: "Academie",
		docks: "Port",
		market: "Piaţă",
		place: "Agora",
		temple: "Templu",
		wall: "Zidul",
		hide: "Höhle",
		//TODO Translate
		stats: "Deine Statistik",
		//TODO Translate
		you: "DU",
		//TODO Translate
		ally: "Allianz",
		//TODO Translate
		map: "Karte",
		//TODO Translate
		speak: "Languages",
		//TODO Translate
		pad: "Notas",
		//TODO Translate
		manage: "Notizen verwalten",
		//TODO Translate
		aus: "Notizen exportieren",
		//TODO Translate
		imp: "Notizen importieren",
		//TODO Translate
		edit: ".css ändern (Aussehen anpassen)",
		//TODO Translate
		topbar: "Topbar",
		//TODO Translate
		close: "Schliesen-Button",
		//TODO Translate
		closeb: "Schliesen",
		//TODO Translate
		remove: "Notiz löschen",
		//TODO Translate
		save: "Speichern",
		//TODO Translate
		two: "doppel klicken um den Eintrag einfügen/ändern",
		//TODO Translate
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	pl: {
		language_name: "polish/polski",
		need_curator: "You need a curator to use this userscript.",
		main: "Senat",
		barracks: "Koszary",
		academy: "Akademia",
		docks: "Port",
		market: "Targowisko",
		place: "Agora",
		temple: "Świątynia",
		wall: "Mur",
		hide: "Höhle",
		//TODO Translate
		stats: "Deine Statistik",
		//TODO Translate
		you: "DU",
		//TODO Translate
		ally: "Allianz",
		//TODO Translate
		map: "Karte",
		//TODO Translate
		speak: "Languages",
		//TODO Translate
		pad: "Notas",
		//TODO Translate
		manage: "Notizen verwalten",
		//TODO Translate
		aus: "Notizen exportieren",
		//TODO Translate
		imp: "Notizen importieren",
		//TODO Translate
		edit: ".css ändern (Aussehen anpassen)",
		//TODO Translate
		topbar: "Topbar",
		//TODO Translate
		close: "Schliesen-Button",
		//TODO Translate
		closeb: "Schliesen",
		//TODO Translate
		remove: "Notiz löschen",
		//TODO Translate
		save: "Speichern",
		//TODO Translate
		two: "doppel klicken um den Eintrag einfügen/ändern",
		//TODO Translate
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	en: {
		language_name: "English",
		need_curator: "You need a curator to use this userscript.",
		main: "Senate",
		barracks: "Barracks",
		academy: "Academy",
		docks: "Harbour",
		market: "Market",
		place: "Agora",
		temple: "Temple",
		wall: "Wall",
		hide: "Hide",
		stats: "Your Statistics",
		you: "YOU",
		ally: "Alliance",
		map: "Map",
		speak: "Languages",
		pad: "Notepad",
		manage: "Manage Notes",
		aus: "Export Notes",
		imp: "Import Notes",
		edit: "edit Style",
		topbar: "Topbar",
		close: "Close-Button",
		closeb: "Close",
		remove: "delete Note",
		save: "Save",
		two: "Double Click to edit",
		//TODO Translate
		speak: "Language",
		buildings: "Buildings",
		worlds: "Worlds",
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	it: {
		language_name: "italian/italiano",
		need_curator: "You need a curator to use this userscript.",
		main: "Senate",
		//TODO Translate
		barracks: "Barracks",
		//TODO Translate
		academy: "Academy",
		//TODO Translate
		docks: "Harbour",
		//TODO Translate
		market: "Market",
		//TODO Translate
		place: "Agora",
		//TODO Translate
		temple: "Temple",
		//TODO Translate
		wall: "Wall",
		//TODO Translate
		hide: "Hide",
		//TODO Translate
		stats: "Your Statistics",
		//TODO Translate
		you: "YOU",
		//TODO Translate
		ally: "Alliance",
		//TODO Translate
		map: "Map",
		//TODO Translate
		speak: "Languages",
		//TODO Translate
		pad: "Note",
		//TODO Translate
		manage: "diriga le note",
		//TODO Translate
		aus: "Notizen exportieren",
		//TODO Translate
		imp: "Notizen importieren",
		//TODO Translate
		edit: ".css ändern (Aussehen anpassen)",
		//TODO Translate
		topbar: "Topbar",
		//TODO Translate
		close: "Schliesen-Button",
		//TODO Translate
		closeb: "Schliesen",
		//TODO Translate
		remove: "Notiz löschen",
		//TODO Translate
		save: "Speichern",
		//TODO Translate
		two: "doppel klicken um den Eintrag einfügen/ändern",
		//TODO Translate
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	sk: {
		language_name: "slovak",
		need_curator: "You need a curator to use this userscript.",
		main: "Senát",
		barracks: "Armáda",
		//original- Kasárne  
		academy: "Akad.",
		//original- Akadémia  
		docks: "Lode",
		//original- Prístav  
		market: "Trh",
		//original- Trhovisko  
		place: "Agora",
		temple: "Chrám",
		wall: "Múr",
		//original- Hradby  
		hide: "Jaskyňa",
		stats: "Tvoja Štatistika",
		you: "Ty",
		ally: "Aliancia",
		map: "Mapa",
		speak: "Jazykov",
		pad: "Notes",
		manage: "Poznámku spravovať",
		aus: "Poznámku exportovať",
		imp: "Poznámku importovať",
		edit: ".css zmeniť (upraviť vzhľad)",
		topbar: "Vrchná lišta",
		close: "Tlačidlo-Zatvor",
		closeb: "Zatvoriť",
		remove: "Poznámku odstráň",
		save: "Uložiť",
		two: "dvojklik na vstup pre vkladanie/zmenu",
		//TODO Translate
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	hu: {
		language_name: "hungarian/magyar",
		need_curator: "You need a curator to use this userscript.",
		main: "Szenátus",
		barracks: "Kaszárnya",
		academy: "Akadémia",
		docks: "Kiköto",
		market: "Piac",
		place: "Agora",
		temple: "Templom",
		wall: "Városfal",
		hide: "Hide",
		//TODO Translate
		stats: "Your Statistics",
		//TODO Translate
		you: "YOU",
		//TODO Translate
		ally: "Alliance",
		//TODO Translate
		map: "Map",
		//TODO Translate
		speak: "Languages",
		//TODO Translate
		pad: "Notas",
		//TODO Translate
		manage: "Notizen verwalten",
		//TODO Translate
		aus: "Notizen exportieren",
		//TODO Translate
		imp: "Notizen importieren",
		//TODO Translate
		edit: ".css ändern (Aussehen anpassen)",
		//TODO Translate
		topbar: "Topbar",
		//TODO Translate
		close: "Schliesen-Button",
		//TODO Translate
		closeb: "Schliesen",
		//TODO Translate
		remove: "Notiz löschen",
		//TODO Translate
		save: "Speichern",
		//TODO Translate
		two: "doppel klicken um den Eintrag einfügen/ändern",
		//TODO Translate
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	pt: {
		language_name: "portuguese/português",
		need_curator: "You need a curator to use this userscript.",
		main: "Senado",
		barracks: "Quartel",
		academy: "Academia",
		docks: "Porto",
		market: "Mercado",
		place: "Agora",
		temple: "Templo",
		wall: "Muralha",
		hide: "Hide",
		//TODO Translate
		stats: "Your Statistics",
		//TODO Translate
		you: "YOU",
		//TODO Translate
		ally: "Alliance",
		//TODO Translate
		map: "Map",
		//TODO Translate
		speak: "Languages",
		//TODO Translate
		pad: "Notas",
		//TODO Translate
		manage: "Notizen verwalten",
		//TODO Translate
		aus: "Notizen exportieren",
		//TODO Translate
		imp: "Notizen importieren",
		//TODO Translate
		edit: ".css ändern (Aussehen anpassen)",
		//TODO Translate
		topbar: "Topbar",
		//TODO Translate
		close: "Schliesen-Button",
		//TODO Translate
		closeb: "Schliesen",
		//TODO Translate
		remove: "Notiz löschen",
		//TODO Translate
		save: "Speichern",
		//TODO Translate
		two: "doppel klicken um den Eintrag einfügen/ändern",
		//TODO Translate
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	},
	dk: {
		language_name: "dänisch/danish",
		need_curator: "You need a curator to use this userscript.",
		main: "Senat",
		barracks: "Kaserne",
		academy: "Academi",
		docks: "Havn",
		market: "Market",
		place: "Agora",
		temple: "Tempel",
		wall: "Bymur",
		hide: "Hule",
		stats: "Din statistik",
		you: "dig",
		ally: "allieret",
		map: "Kort",
		speak: "Sprog",
		pad: "Noter",
		manage: "Opret noter",
		aus: "Export Noter",
		imp: "Import noter",
		edit: "Rediger Style",
		topbar: "topbar",
		close: "Luk-knappen",
		closeb: "Luk",
		remove: "Fjern Note",
		save: "sparer",
		two: "Dobbelt klik for at redigere",
		//TODO Translate
		speak: "Language",
		// todo: translations
		buildings: "Buildings",
		worlds: "Worlds",
		//todo: translations
		alpha: "Alpha",
		beta: "Beta",
		gamma: "Gamma",
		delta: "Delta"
	}
};

const menuUrls = {
	main: "building_main?town_id={town}&action=index&h={token}",
	barracks: "building_barracks?action=index&town_id={town}&h={token}",
	academy: "building_academy?action=index&town_id={town}&h={token}",
	docks: "building_docks?action=index&town_id={town}&h={token}",
	market: "building_market?action=index&town_id={town}&h={token}",
	place: "building_place?action=culture&town_id={town}&h={token}",
	temple: "building_temple?action=index&town_id={town}&h={token}",
	wall: "building_wall?action=index&town_id={town}&h={token}",
	hide: "building_hide?action=index&town_id={town}&h={token}",
	alpha: "http://{lang}1.grepolis.com/game/index?login=1",
	beta: "http://{lang}2.grepolis.com/game/index?login=1",
	gamma: "http://{lang}3.grepolis.com/game/index?login=1",
	delta: "http://{lang}3.grepolis.com/game/index?login=1",
	need_curator: "premium_features?action=index&town_id={town}&h={token}"
};

const icons = {
	main: "http://static.grepolis.com/images/game/toolbar/main.png",
	barracks: "http://static.grepolis.com/images/game/toolbar/barracks.png",
	academy: "http://static.grepolis.com/images/game/toolbar/academy.png",
	docks: "http://static.grepolis.com/images/game/toolbar/docks.png",
	place: "http://static.grepolis.com/images/game/toolbar/place.png",
	market: "http://static.grepolis.com/images/game/toolbar/trade.png",
	alliance: "http://static.grepolis.com/images/game/toolbar/alliance.png",
	attack: "http://static.grepolis.com/images/game/toolbar/attack.png",
	info: "http://static.grepolis.com/images/game/toolbar/info.png",
	leader: "http://static.grepolis.com/images/game/toolbar/leader.png",
	message: "http://static.grepolis.com/images/game/toolbar/message.png",
	other: "http://static.grepolis.com/images/game/toolbar/other.png",
	report: "http://static.grepolis.com/images/game/toolbar/report.png",
	edit: "http://static.grepolis.com/images/game/layout/toolbar_edit.png",
	worlds: "http://ftp.innogames.net/~floo/navbar/forumsearch.png",
	alpha: "http://ftp.innogames.net/~floo/navbar/forumsearch.png",
	beta: "http://ftp.innogames.net/~floo/navbar/forumsearch.png",
	gamma: "http://ftp.innogames.net/~floo/navbar/forumsearch.png",
	delta: "http://ftp.innogames.net/~floo/navbar/forumsearch.png",
	help: "http://ftp.innogames.net/~floo/navbar/help.png"

};
// -----------------------------------------------------------------------------

/*
	GameData.add({units  : {"militia":{"id":"militia","attack_type":"pierce","attack":2,"def_hack":6,"def_pierce":8,"def_distance":4,"speed":0,"resources":null,"favor":0,"population":0,"kill_points":0,"build_time":1,"god_id":null,"research_dependencies":null,"building_dependencies":null,"description":"Militie","name":"Militie"},"sword":{"attack_type":"hack","attack":5,"def_hack":14,"def_pierce":8,"def_distance":30,"booty":16,"speed":8,"resources":{"wood":95,"stone":0,"iron":85},"favor":0,"population":1,"kill_points":1,"build_time":540,"god_id":null,"research_dependencies":[],"building_dependencies":null,"id":"sword","description":"Zwaardvechters vormen de basisverdediging van de stad: ze zijn slecht in aanvallen, verdedigen bijzonder goed tegen afstandswapens en zijn bestand tegen slagwapens. Goedkope eenheid.","name":"Zwaardvechter"},"slinger":{"attack_type":"distance","attack":23,"def_hack":7,"def_pierce":8,"def_distance":2,"booty":8,"speed":14,"resources":{"wood":55,"stone":100,"iron":40},"favor":0,"population":1,"kill_points":1,"build_time":600,"god_id":null,"research_dependencies":["slinger"],"building_dependencies":null,"id":"slinger","name":"Slingeraar","description":"Slingeraars zijn een goede aanvalseenheid. Ze zijn bijzonder goed in aanvallen en slecht in verdedigen. Goedkope en snelle eenheid."},"archer":{"attack_type":"distance","attack":8,"def_hack":6,"def_pierce":25,"def_distance":12,"booty":24,"speed":12,"resources":{"wood":120,"stone":0,"iron":75},"favor":0,"population":1,"kill_points":1,"build_time":570,"god_id":null,"research_dependencies":["archer"],"building_dependencies":null,"id":"archer","name":"Boogschutter","description":"Boogschutters zijn bijzonder bruikbaar voor de verdediging. Ze zijn zeer sterk en vooral goed bestand tegen steekwapens. Ze leveren tijdens een aanval geen grote bijdrage aan de overwinning, maar ze kunnen wel veel oorlogsbuit dragen."},"hoplite":{"attack_type":"pierce","attack":16,"def_hack":18,"def_pierce":12,"def_distance":7,"booty":8,"speed":6,"resources":{"wood":0,"stone":75,"iron":150},"favor":0,"population":1,"kill_points":1,"build_time":690,"god_id":null,"research_dependencies":["hoplite"],"building_dependencies":null,"id":"hoplite","name":"Hopliet","description":"Hoplieten kunnen goed worden ingezet, zowel defensief als offensief. Hun zware pantser beschermt ze tegen slag- en steekwapens, maar verlaagt wel hun snelheid."},"rider":{"attack_type":"hack","attack":55,"def_hack":18,"def_pierce":1,"def_distance":24,"booty":72,"speed":22,"resources":{"wood":240,"stone":120,"iron":360},"favor":0,"population":3,"kill_points":3,"build_time":2160,"god_id":null,"research_dependencies":["rider"],"building_dependencies":{"barracks":10},"id":"rider","name":"Ruiter","description":"Ruiters zijn een goede aanvalseenheid. Ze zijn snel en sterk, en kunnen veel dragen. Ze zijn niet bruikbaar voor verdediging. Ze zijn vooral kwetsbaar voor scherpe wapens."},"chariot":{"attack_type":"pierce","attack":56,"def_hack":76,"def_pierce":16,"def_distance":56,"booty":64,"speed":18,"resources":{"wood":200,"stone":440,"iron":320},"favor":0,"population":4,"kill_points":4,"build_time":2880,"god_id":null,"research_dependencies":["chariot"],"building_dependencies":{"barracks":15},"id":"chariot","name":"Strijdwagen","description":"Strijdwagens kunnen zowel defensief als offensief worden ingezet. Ze zijn bijzonder goed bestand tegen afstands- en slagwapens."},"catapult":{"attack_type":"distance","attack":100,"def_hack":30,"def_pierce":30,"def_distance":30,"booty":400,"speed":1,"resources":{"wood":1200,"stone":1200,"iron":1200},"favor":0,"population":15,"kill_points":15,"build_time":10800,"god_id":null,"research_dependencies":["catapult"],"building_dependencies":null,"id":"catapult","name":"Katapult","description":"De katapult brengt schade toe aan de vijandelijke stadsmuur en verlaagt de verdedigingskracht van de stad."},"minotaur":{"attack_type":"hack","attack":420,"def_hack":675,"def_pierce":300,"def_distance":560,"booty":480,"speed":10,"resources":{"wood":1400,"stone":600,"iron":3100},"favor":202,"population":30,"kill_points":30,"build_time":8100,"god_id":"zeus","research_dependencies":[],"building_dependencies":{"temple":10},"id":"minotaur","name":"Minotaurus","description":"Minotaurussen zijn enorme monsters, half mens, half stier. Hun krachtige bijlslagen breken elk schild. Door hun enorme kracht zijn ze moeilijk te overwinnen."},"manticore":{"attack_type":"pierce","attack":945,"def_hack":170,"def_pierce":225,"def_distance":505,"booty":360,"speed":22,"resources":{"wood":4400,"stone":3000,"iron":3400},"favor":405,"population":45,"kill_points":45,"build_time":16200,"god_id":"zeus","research_dependencies":[],"building_dependencies":{"temple":15},"id":"manticore","flying":true,"name":"Manticore","description":"Manticoren hebben de kop van een leeuw, de vleugels van een draak en de staart van een schorpioen. Ze storten uit de hemel, grijpen hun prooi met hun klauwen of steken hun prooi dood met hun enorme gifstekel. Manticoren kunnen zonder transportschepen naar andere eilanden vliegen."},"zyklop":{"attack_type":"distance","attack":756,"def_hack":945,"def_pierce":10,"def_distance":1310,"booty":320,"speed":8,"resources":{"wood":2000,"stone":4200,"iron":3360},"favor":360,"population":40,"kill_points":40,"build_time":14340,"god_id":"poseidon","research_dependencies":[],"building_dependencies":{"temple":12},"id":"zyklop","name":"Cycloop","description":"Cyclopen zijn eenogige reuzen die rotsblokken naar de vijand slingeren. Je kunt je alleen tegen ze verdedigen met steekwapens."},"harpy":{"attack_type":"hack","attack":266,"def_hack":105,"def_pierce":70,"def_distance":1,"booty":340,"speed":25,"resources":{"wood":1600,"stone":400,"iron":1360},"favor":130,"population":14,"kill_points":14,"build_time":5040,"god_id":"hera","research_dependencies":[],"building_dependencies":{"temple":5},"id":"harpy","flying":true,"name":"Harpij","description":"Volgens veel boeren storten er op stormachtige dagen soms wezens uit de lucht die half vogel en half vrouw zijn. Ze grijpen hun prooi in een oogwenk, om met dezelfde snelheid weer te verdwijnen. Harpijen kunnen zonder transportschepen naar andere eilanden vliegen."},"medusa":{"attack_type":"pierce","attack":425,"def_hack":625,"def_pierce":435,"def_distance":375,"booty":400,"speed":6,"resources":{"wood":1500,"stone":3800,"iron":2200},"favor":210,"population":18,"kill_points":18,"build_time":11250,"god_id":"hera","research_dependencies":[],"building_dependencies":{"temple":10},"id":"medusa","name":"Medusa","description":"Elke krijger die naar de ogen van Medusa kijkt, voelt zijn armen en benen stijf worden, hoe onverschrokken hij ook is. Daarna verbrijzelt het slangenwezen het standbeeld van de versteende strijder."},"centaur":{"attack_type":"distance","attack":156,"def_hack":150,"def_pierce":450,"def_distance":60,"booty":200,"speed":18,"resources":{"wood":1740,"stone":300,"iron":700},"favor":100,"population":12,"kill_points":12,"build_time":4095,"god_id":"athena","research_dependencies":[],"building_dependencies":{"temple":4},"id":"centaur","name":"Centaur","description":"Een centaur is een krijger met het onderlichaam van een paard. Een centaur galoppeert snel langs de vijand en schiet nauwkeurig pijlen af, om daarna met dezelfde snelheid weer te verdwijnen. Centaurs zijn bijzonder goed bestand tegen steekwapens."},"pegasus":{"attack_type":"pierce","attack":100,"def_hack":900,"def_pierce":250,"def_distance":300,"booty":160,"speed":35,"resources":{"wood":2800,"stone":360,"iron":80},"favor":180,"population":20,"kill_points":20,"build_time":7200,"god_id":"athena","research_dependencies":[],"building_dependencies":{"temple":12},"id":"pegasus","flying":true,"name":"Pegasus","description":"Een pegasus is een gevleugeld paard dat tijdens uitzichtloze veldslagen uit de hemel stort om de stad te helpen. Hij is bijzonder goed bestand tegen slagwapens. Pegasi kunnen zonder transportschepen naar andere eilanden vliegen."},"big_transporter":{"attack":20,"defense":1,"transport":null,"speed":8,"resources":{"wood":500,"stone":500,"iron":400},"favor":0,"population":7,"kill_points":7,"build_time":4800,"god_id":null,"research_dependencies":[],"building_dependencies":null,"id":"big_transporter","capacity":20,"name":"Transportboot","description":"Transportboten kunnen hun eigen troepen vervoeren tussen twee eilanden. In een veldslag kunnen ze geen schade toebrengen aan schepen of landeenheden."},"bireme":{"attack":24,"defense":160,"transport":null,"speed":15,"resources":{"wood":800,"stone":700,"iron":180},"favor":0,"population":8,"kill_points":8,"build_time":4950,"god_id":null,"research_dependencies":["bireme"],"building_dependencies":null,"id":"bireme","capacity":0,"name":"Bireem","description":"Biremen zijn sterke schepen die vooral goed kunnen worden ingezet voor verdediging."},"attack_ship":{"attack":200,"defense":60,"transport":null,"speed":13,"resources":{"wood":1300,"stone":300,"iron":800},"favor":0,"population":10,"kill_points":10,"build_time":7200,"god_id":null,"research_dependencies":["attack_ship"],"building_dependencies":null,"id":"attack_ship","capacity":0,"name":"Vuurschip","description":"Vuurschepen steken vijandelijke schepen in brand. Dit wapen is bijzonder sterk bij aanvallen, maar biedt weinig verdediging."},"demolition_ship":{"attack":20,"defense":1,"transport":null,"speed":5,"resources":{"wood":500,"stone":750,"iron":150},"favor":0,"population":8,"kill_points":8,"build_time":2000,"god_id":null,"research_dependencies":["demolition_ship"],"building_dependencies":null,"id":"demolition_ship","capacity":0,"name":"Brander","description":"Branders zijn brandende schepen die vijandelijke vloten naderen en in brand steken. Alleen de verdediger kan branders gebruiken. Elke brander vernietigt een vijandelijk schip en brandt daarna zelf af. Branders zijn bijzonder traag."},"small_transporter":{"attack":20,"defense":1,"transport":null,"speed":15,"resources":{"wood":800,"stone":0,"iron":400},"favor":0,"population":5,"kill_points":5,"build_time":3600,"god_id":null,"research_dependencies":["small_transporter"],"building_dependencies":null,"id":"small_transporter","capacity":10,"name":"Snel transportschip","description":"Snelle transportschepen kunnen landeenheden vervoeren tussen eilanden. Ze zijn sneller dan transportboten, maar bieden minder ruimte."},"trireme":{"attack":180,"defense":250,"transport":null,"speed":9,"resources":{"wood":2000,"stone":1300,"iron":900},"favor":0,"population":16,"kill_points":16,"build_time":7200,"god_id":null,"research_dependencies":["trireme"],"building_dependencies":null,"id":"trireme","capacity":0,"name":"Trireem","description":"Triremen zijn de sterkste oorlogsschepen. Je kunt ze offensief en defensief inzetten op zee."},"colonize_ship":{"attack":0,"defense":500,"transport":null,"speed":3,"resources":{"wood":10000,"stone":10000,"iron":10000},"favor":0,"population":170,"kill_points":170,"build_time":32400,"god_id":null,"research_dependencies":["colonize_ship"],"building_dependencies":{"docks":20,"academy":22},"id":"colonize_ship","capacity":0,"name":"Kolonisatieschip ","description":"Kolonisatieschepen kunnen buitenlandse steden veroveren. Het culturele  van je stad moet ook hoog genoeg zijn om een buitenlandse stad te veroveren. Kolonisatieschepen vechten niet en zijn bijzonder traag."},"sea_monster":{"attack":1000,"defense":715,"transport":null,"speed":8,"resources":{"wood":5400,"stone":2800,"iron":3800},"favor":400,"population":50,"kill_points":50,"build_time":21000,"god_id":"poseidon","research_dependencies":[],"building_dependencies":{"temple":22},"id":"sea_monster","capacity":0,"name":"Hydra","description":"Er is geen golf, storm en vijand die door zeelieden zo wordt gevreesd als de aanval van een hydra. Het negenkoppige monster verrijst uit het water, vermorzelt hele schepen in zijn bekken en verscheurt de bemanning of sleurt deze mee naar de diepten van Poseidon."}}});
	GameData.add({powers : {"divine_sign":{"id":"divine_sign","name":"Goddelijk teken","description":"Er breekt een straal licht door de wolken en er daalt een strijdwagen neer in de stad.","favor":50,"god_id":"zeus","lifetime":0,"temple__sum_dependency":1,"effect":"De geselecteerde stad krijgt een strijdwagen."},"bolt":{"id":"bolt","name":"Schicht","description":"Er verschijnen duistere wolken boven de stad en er slaat een donderende bliksem in die slechts een beschadigd gebouw achterlaat.","favor":200,"god_id":"zeus","lifetime":0,"temple__sum_dependency":4,"effect":"Brengt schade toe aan een willekeurig gebouw in de stad."},"fair_wind":{"id":"fair_wind","name":"Gunstige wind","description":"De stem van Zeus echoot door de lucht, de wind zet de zeilen op de schepen strak en de pijlen en schichten gonzen met precisie naar de vijand.","favor":250,"god_id":"zeus","lifetime":0,"temple__sum_dependency":1,"effect":"De aanvallende marine krijgt 10% meer kracht."},"transformation":{"id":"transformation","name":"Zeus' razernij","description":"Zeus verscheurt de lucht met bliksemschichten en werpt soldaten door de lucht; sommigen klampen zich vast aan bomen, anderen worden verzwolgen door de hemel.","favor":300,"god_id":"zeus","lifetime":0,"temple__sum_dependency":1,"effect":"Vernietigt 10-30% van de aanvallende landeenheden."},"wedding":{"id":"wedding","name":"Bruiloft","description":"Er komen edelmannen uit alle omliggende landen om de stad en de bruid, de dochter van de koning, geschenken te brengen.","favor":30,"god_id":"hera","lifetime":0,"temple__sum_dependency":1,"effect":"De stad krijgt 125 hout, 200 steen en 200 zilverstukken."},"happiness":{"id":"happiness","name":"Tevredenheid","description":"'s Nachts omhult Hera de drukke arbeiders met een warme sluier, en tijdens de hitte overdag zorgt ze voor verkwikkende verkoeling.","favor":120,"god_id":"hera","lifetime":21600,"temple__sum_dependency":1,"effect":"Verhoogt de hout-, steen- en zilverproductie 6 uur lang met 50%."},"fertility_improvement":{"id":"fertility_improvement","name":"Bevolkingsgroei","description":"Er is een nieuwe trotse krijger geboren. Hera is deze stad gunstig gezind.","favor":80,"god_id":"hera","lifetime":21600,"temple__sum_dependency":1,"effect":"In de kazerne zullen alle rekruteringen, waarvoor in de komende 6 uur opdracht wordt gegeven, 100% sneller zijn."},"desire":{"id":"desire","name":"Heimwee","description":"De trotse krijgers krijgen heimwee; hun hart gaat niet langer uit naar de strijd, maar naar hun familie thuis.","favor":140,"god_id":"hera","lifetime":0,"temple__sum_dependency":1,"effect":"De aanvallende troepen krijgen 10% minder kracht."},"kingly_gift":{"id":"kingly_gift","name":"Geschenk van de oceaan","description":"Er spoelt hout aan bij de kust van de stad. Poseidon laat zich van zijn goede kant zien.","favor":25,"god_id":"poseidon","lifetime":0,"temple__sum_dependency":1,"effect":"De stad krijgt 800 hout."},"call_of_the_ocean":{"id":"call_of_the_ocean","name":"Roep van de oceaan","description":"Er breken sterke golven op de kust; de bouwlieden worden overrompeld door een dringende behoefte om de roep van de oceaan te volgen.","favor":60,"god_id":"poseidon","lifetime":21600,"temple__sum_dependency":1,"effect":"In de haven zullen alle bouwopdrachten, waarvoor in de komende 6 uur opdracht wordt gegeven, 100% sneller zijn."},"earthquake":{"id":"earthquake","name":"Aardbeving","description":"De grond verschuift en beeft, en grote stukken van de stadsmuur storten in de diepte.","favor":350,"god_id":"poseidon","lifetime":0,"temple__sum_dependency":1,"effect":"De stadsmuur raakt 1-3 s kwijt."},"sea_storm":{"id":"sea_storm","name":"Zeestorm","description":"Poseidon staat op en zijn golven beuken furieus tegen de schepen. Het is geen goede dag voor zeelieden.","favor":280,"god_id":"poseidon","lifetime":0,"temple__sum_dependency":1,"effect":"Vernietigt 10-30% van de beoogde schepen."},"patroness":{"id":"patroness","name":"Beschermvrouwe","description":"Dappere krijgers beantwoorden de roep en snellen de stad van de beschermvrouwe in.","favor":60,"god_id":"athena","lifetime":0,"temple__sum_dependency":1,"effect":"De stad krijgt 5 willekeurige landeenheden."},"wisdom":{"id":"wisdom","name":"Wijsheid","description":"Er cirkelt een uil boven de vijandelijke troepen, die rapport uitbrengt over hun kracht.","favor":140,"god_id":"athena","lifetime":0,"temple__sum_dependency":1,"effect":"Je krijgt een spionagerapport over de vijandelijke troepen."},"town_protection":{"id":"town_protection","name":"Stadsbescherming","description":"Athene spreidt haar schild uit over de stad.","favor":130,"god_id":"athena","lifetime":21600,"temple__sum_dependency":1,"effect":"De stad kan 6 uur lang niet door gunsten worden be\u00efnvloed."},"strength_of_heroes":{"id":"strength_of_heroes","name":"Hero\u00efsche kracht","description":"De soldaten raken vervuld door kracht en moed. Ze rennen dapper en onder luid geschreeuw naar de vijand.","favor":200,"god_id":"athena","lifetime":0,"temple__sum_dependency":1,"effect":"Landeenheden worden in het volgende gevecht 10% sterker."}}});
	GameData.add({buildings : {"main":{"name":"Senaat","image":null,"":null,"max_":25,"min_":1,"requiredBuildings":null,"resources":{"wood":6,"stone":2,"iron":2},"pop":1,"wood_factor":2.15,"stone_factor":2.53,"iron_factor":2.3,"pop_factor":1.5,"hide_factor":null,"points":100,"points_factor":1.1,"build_time":150,"build_time_factor":1.8,"bolt_protected":null,"image_s":[1,8,16],"dependencies":[],"coordinates":"323,144,317,180,399,213,498,140,482,112,413,85","description":"In de senaat kun je nieuwe gebouwen neerzetten of bestaande gebouwen uitbreiden. Hoe hoger het  van de senaat, des te sneller de bouwwerkzaamheden zijn afgerond.","controller":"building_main"},"hide":{"name":"Grot","image":null,"":null,"max_":10,"min_":1,"requiredBuildings":null,"resources":{"wood":200,"stone":400,"iron":700},"pop":3,"wood_factor":1.3,"stone_factor":1,"iron_factor":0.9,"pop_factor":0.5,"hide_factor":null,"points":50,"points_factor":1.2,"build_time":210,"build_time_factor":1.456,"bolt_protected":null,"image_s":[1,4,7],"dependencies":{"main":9,"storage":5},"coordinates":"408,306,394,314,394,332,402,343,420,335,419,314","description":"In de grot kun je spionnen benoemen om vijandelijke steden te verkennen.","controller":"building_hide"},"storage":{"name":"Pakhuis","image":null,"":null,"max_":30,"min_":1,"requiredBuildings":null,"resources":{"wood":35,"stone":55,"iron":15},"pop":0,"wood_factor":1.52,"stone_factor":1.52,"iron_factor":1.66,"pop_factor":1,"hide_factor":100,"points":13,"points_factor":1.14,"build_time":900,"build_time_factor":1.23,"bolt_protected":null,"image_s":[1,10,20],"dependencies":[],"storage_factor":200,"storage_pow":1.35399,"coordinates":"307,192,279,210,279,239,371,281,400,259,394,220,355,203,345,209","description":"De grondstoffen van de stad worden opgeslagen in het pakhuis. Hoe hoger het uitbreidings van het pakhuis, des te meer grondstoffen je er kunt opslaan. In ieder uitbreidings worden 100 stuks van elke grondstof tegen plundering beschermd.","controller":"building_storage"},"farm":{"name":"Boerderij","image":null,"":null,"max_":40,"min_":1,"requiredBuildings":null,"resources":{"wood":8,"stone":5,"iron":1},"pop":0,"wood_factor":1.87,"stone_factor":2.03,"iron_factor":2.4,"pop_factor":0,"hide_factor":null,"points":15,"points_factor":1.12,"build_time":150,"build_time_factor":1.7,"bolt_protected":null,"image_s":[1,14,28],"dependencies":[],"farm_pow":1.455,"farm_factor":14,"coordinates":"387,0,443,86,505,123,563,139,599,106,599,0","description":"De boerderij voorziet de arbeiders en troepen van voedsel. Je moet de boerderij uitbreiden om de stad te laten groeien. Hoe hoger het uitbreidings van de boerderij, des te meer inwoners je kunt verzorgen \u2013 en des te meer troepen je kunt voeden.","controller":"building_farm"},"place":{"name":"Agora","image":null,"":null,"max_":1,"min_":1,"requiredBuildings":null,"resources":{"wood":10,"stone":0,"iron":0},"pop":1,"wood_factor":2,"stone_factor":2,"iron_factor":2,"pop_factor":0,"hide_factor":null,"points":30,"points_factor":1.11,"build_time":0.5,"build_time_factor":2.17,"bolt_protected":true,"image_s":[1,4,7],"dependencies":[],"coordinates":"469,179,446,218,452,238,488,238,496,218","description":"Op de agora kun je een overzicht krijgen van de troepen binnen en buiten de stad. Hier kun je ook de culturele prestaties van de stad bewonderen en de volgende campagnes plannen met de veldslagsimulator.","controller":"building_place"},"lumber":{"name":"Houthakkerskamp","image":null,"":null,"max_":40,"min_":1,"requiredBuildings":null,"resources":{"wood":2.6,"stone":2,"iron":1.49},"pop":1,"wood_factor":1.9,"stone_factor":2.1,"iron_factor":2.1,"pop_factor":1.25,"hide_factor":null,"points":20,"points_factor":1.1,"build_time":60,"build_time_factor":1.9,"bolt_protected":null,"image_s":[1,14,28],"dependencies":[],"coordinates":"454,357,429,386,451,451,522,462,564,395,519,375","description":"In de dichtbegroeide wouden buiten de polis hakken houthakkers de enorme bomen om die nodig zijn om de stad uit te breiden en de troepen van materiaal te voorzien. Hoe hoger het uitbreidings van het houthakkerskamp, des te meer hout de houthakkers kunnen produceren.","controller":"building_lumber"},"stoner":{"name":"Steengroeve","image":null,"":null,"max_":40,"min_":1,"requiredBuildings":null,"resources":{"wood":1.3,"stone":2.6,"iron":2.4},"pop":1,"wood_factor":2.1,"stone_factor":1.9,"iron_factor":2.1,"pop_factor":1.25,"hide_factor":null,"points":20,"points_factor":1.1,"build_time":150,"build_time_factor":1.62,"bolt_protected":null,"image_s":[1,14,28],"dependencies":[],"coordinates":"0,178,0,303,66,333,183,312,189,249,66,229,59,178","description":"In de steengroeve kunnen de arbeiders de stenen winnen die nodig zijn voor de ontwikkeling van de stad. Hoe hoger het uitbreidings, des te meer steen er wordt gewonnen.","controller":"building_stoner"},"ironer":{"name":"Zilvermijn","image":null,"":null,"max_":40,"min_":1,"requiredBuildings":null,"resources":{"wood":5,"stone":2,"iron":4},"pop":1,"wood_factor":1.9,"stone_factor":2,"iron_factor":1.8,"pop_factor":1.25,"hide_factor":null,"points":20,"points_factor":1.1,"build_time":300,"build_time_factor":1.41,"bolt_protected":null,"image_s":[1,14,28],"dependencies":{"lumber":3},"coordinates":"52,12,41,35,85,81,132,56,89,20","description":"In de zilvermijn schrapen de arbeiders het kostbare zilvererts bij elkaar waaruit de zilverstukken worden geslagen. Hoe hoger het uitbreidings van de mijn, des te meer zilverstukken je kunt slaan.","controller":"building_ironer"},"market":{"name":"Marktplaats","image":null,"":null,"max_":30,"min_":1,"requiredBuildings":null,"resources":{"wood":50,"stone":20,"iron":5},"pop":2,"wood_factor":1.48,"stone_factor":1.62,"iron_factor":1.98,"pop_factor":1.1,"hide_factor":null,"points":100,"points_factor":1.08,"build_time":240,"build_time_factor":1.6,"bolt_protected":null,"image_s":[1,10,20],"dependencies":{"main":12,"hide":5,"storage":6},"coordinates":"599,159,561,142,504,153,501,183,519,223,554,236,599,233","description":"Op de marktplaats kun je grondstoffen naar andere spelers sturen. Je kunt ook handelen met de boerendorpen op het eiland.","controller":"building_market"},"docks":{"name":"Haven","image":null,"":null,"max_":30,"min_":1,"requiredBuildings":null,"resources":{"wood":400,"stone":200,"iron":100},"pop":4,"wood_factor":0.9,"stone_factor":0.98,"iron_factor":1.1,"pop_factor":1,"hide_factor":null,"points":60,"points_factor":1.1,"build_time":750,"build_time_factor":1.1,"bolt_protected":null,"image_s":[1,8,16],"dependencies":{"main":14,"lumber":15,"ironer":10},"coordinates":"270,303,166,408,260,462,342,462,400,384","description":"In de haven breid je de vloot uit. Hier kun je zowel transport- als gevechtseenheden bouwen. De snelheid waarmee de scheepswerkers de schepen voltooien, is afhankelijk van het uitbreidings van de haven.","controller":"building_docks"},"barracks":{"name":"Kazerne","image":null,"":null,"max_":30,"min_":1,"requiredBuildings":null,"resources":{"wood":70,"stone":20,"iron":40},"pop":1,"wood_factor":1.22,"stone_factor":1.67,"iron_factor":1.54,"pop_factor":1.3,"hide_factor":null,"points":30,"points_factor":1.115,"build_time":450,"build_time_factor":1.25,"bolt_protected":null,"image_s":[1,10,20],"dependencies":{"main":4,"farm":4},"coordinates":"186,96,92,183,133,201,190,207,265,161,260,135","description":"In de kazerne kun je reguliere troepen en mythische eenheden rekruteren. Hoe hoger het uitbreidings van de kazerne, des te sneller je de troepen kunt trainen.","controller":"building_barracks"},"wall":{"name":"Stadsmuur","image":null,"":null,"max_":25,"min_":1,"requiredBuildings":null,"resources":{"wood":400,"stone":350,"iron":200},"pop":2,"wood_factor":0,"stone_factor":1,"iron_factor":1.1,"pop_factor":1.16,"hide_factor":null,"points":30,"points_factor":1.12,"build_time":450,"build_time_factor":1.3,"bolt_protected":null,"image_s":[1,8,16],"dependencies":{"main":7,"stoner":8},"coordinates":"0,151, 26,151, 72,145, 78,170, 87,185, 107,199, 136,206, 170,208, 201,215, 239,210, 243,266, 278,263, 314,274, 350,287, 384,284, 416,270, 442,254, 439,305, 495,332, 529,345, 568,346, 601,342,\n\t\t\t601,368, 566,375, 521,373, 484,363, 433,333, 421,297, 386,307, 348,312, 309,302, 277,290, 230,291, 228,237, 199,239, 169,231, 136,228, 104,227, 77,205, 70,191, 69,168, 28,176, 0,176","catapult_factor":1.05,"catapult_power":0.5,"def_factor_per_":1.037,"description":"De stadsmuur beschermt de polis tegen vijandelijke troepen. Ze versterkt de grondverdediging en verhoogt de verdedigingswaarde van de troepen.","controller":"building_wall"},"academy":{"name":"Academie","image":null,"":null,"max_":30,"min_":1,"requiredBuildings":null,"resources":{"wood":100,"stone":200,"iron":120},"pop":3,"wood_factor":1.21,"stone_factor":1.1,"iron_factor":1.2,"pop_factor":1,"hide_factor":null,"points":60,"points_factor":1.12,"build_time":600,"build_time_factor":1.25,"bolt_protected":null,"image_s":[1,8,16],"dependencies":{"main":8,"farm":6,"barracks":5},"coordinates":"334,0,293,22,277,76,346,103,402,67,383,16","description":"In de academie kun je onderzoek verrichten. Grepolis biedt diverse technologie\u00ebn die troepen versterken, bouwvaardigheden effectiever maken of nieuwe gevechtstechnieken opleveren. Hoe hoger het uitbreidings van de academie, des te meer technologie\u00ebn je kunt ontdekken.","controller":"building_academy"},"temple":{"name":"Tempel","image":null,"":null,"max_":25,"min_":1,"requiredBuildings":null,"resources":{"wood":500,"stone":900,"iron":600},"pop":5,"wood_factor":0.865,"stone_factor":0.7,"iron_factor":0.82,"pop_factor":1,"hide_factor":null,"points":200,"points_factor":1.08,"build_time":1800,"build_time_factor":1.145,"bolt_protected":null,"image_s":[1,8,16],"dependencies":{"main":15,"stoner":12,"wall":6},"coordinates":"20,52,2,70,2,124,40,139,85,131,49,57","description":"In de tempel kun je een god naar keuze aanbidden. Elke god in Grepolis heeft andere goddelijke krachten en kan andere mythische eenheden tot leven brengen. Voor beide heb je een goddelijke gunst nodig van de god die in de tempel wordt aanbeden. Hoe hoger het uitbreidings van de tempel, des te meer goddelijke gunsten je krijgt.","controller":"building_temple"},"theater":{"name":"Theater","image":null,"":null,"max_":1,"min_":0,"requiredBuildings":null,"resources":{"wood":8000,"stone":8000,"iron":8000},"pop":60,"wood_factor":2,"stone_factor":2,"iron_factor":2,"pop_factor":1,"hide_factor":null,"points":500,"points_factor":1,"build_time":32400,"build_time_factor":2.17,"bolt_protected":true,"image_s":[1],"dependencies":{"main":24,"lumber":35,"ironer":32,"docks":5,"academy":5},"coordinates":"154,54,227,81,278,50,273,13,239,1,182,6,154,30","description":"Door een theater te bouwen, kun je grootse drama's opvoeren voor de bevolking en daarmee de culturele waarde van de polis vergroten.","controller":"building_theater"},"thermal":{"name":"Badhuis","image":null,"":null,"max_":1,"min_":0,"requiredBuildings":null,"resources":{"wood":9000,"stone":6000,"iron":9000},"pop":60,"wood_factor":2,"stone_factor":2,"iron_factor":2,"pop_factor":1,"hide_factor":null,"points":500,"points_factor":1,"build_time":32400,"build_time_factor":2.17,"bolt_protected":true,"image_s":[1],"dependencies":{"main":24,"farm":35,"docks":5,"academy":5},"coordinates":"141,40,143,62,200,87,277,46,276,18,217,0","description":"In het oude Griekenland hechtte men veel belang aan hygi\u00ebne. Door badhuizen te bouwen, kun je de gezondheid van de bevolking verbeteren en het bevolkingsaantal met 10% verhogen.","controller":"building_thermal"},"library":{"name":"Bibliotheek","image":null,"":null,"max_":1,"min_":0,"requiredBuildings":null,"resources":{"wood":9500,"stone":7500,"iron":7000},"pop":60,"wood_factor":2,"stone_factor":2,"iron_factor":2,"pop_factor":1,"hide_factor":null,"points":500,"points_factor":1,"build_time":32400,"build_time_factor":2.17,"bolt_protected":true,"image_s":[1],"dependencies":{"main":24,"academy":20,"docks":5},"coordinates":"203,0,158,23,158,57,195,72,280,39,264,0","description":"Kennis is macht. Door een bibliotheek te bouwen krijg je 12 extra onderzoekspunten die je kunt investeren in de ontdekking van nieuwe technologie\u00ebn in de academie.","controller":"building_library"},"lighthouse":{"name":"Vuurtoren","image":null,"":null,"max_":1,"min_":0,"requiredBuildings":null,"resources":{"wood":6000,"stone":10000,"iron":8000},"pop":60,"wood_factor":2,"stone_factor":2,"iron_factor":2,"pop_factor":1,"hide_factor":null,"points":500,"points_factor":1,"build_time":32400,"build_time_factor":2.17,"bolt_protected":true,"image_s":[1],"dependencies":{"main":24,"docks":20,"academy":5},"coordinates":"6,318,0,412,35,421,73,373,20,317","description":"De vuurtoren van Alexandri\u00eb werd beschouwd als een van de zeven wereldwonderen. Door een kleinere versie bij de haven te bouwen, verhoog je de snelheid van de vloot met 15%, omdat een vuurtoren de navigatie verbetert.","controller":"building_lighthouse"},"tower":{"name":"Toren","image":null,"":null,"max_":1,"min_":0,"requiredBuildings":null,"resources":{"wood":8000,"stone":10000,"iron":6000},"pop":60,"wood_factor":2,"stone_factor":2,"iron_factor":2,"pop_factor":1,"hide_factor":null,"points":500,"points_factor":1,"build_time":32400,"build_time_factor":2.17,"bolt_protected":true,"image_s":[1],"dependencies":{"main":21,"wall":20,"temple":5,"market":5},"coordinates":"511,244,489,264,486,320,501,335,534,340,556,324,559,265,539,246","description":"Een machtige wachttoren verhoogt de verdedigingskracht van de troepen met 10% en verandert de polis in een bijna onneembare vesting.","controller":"building_tower"},"statue":{"name":"Godenbeeld","image":null,"":null,"max_":1,"min_":0,"requiredBuildings":null,"resources":{"wood":6000,"stone":10500,"iron":7500},"pop":60,"wood_factor":2,"stone_factor":2,"iron_factor":2,"pop_factor":1,"hide_factor":null,"points":500,"points_factor":1,"build_time":32400,"build_time_factor":2.17,"bolt_protected":true,"image_s":[1],"dependencies":{"main":21,"temple":12,"market":5},"coordinates":"517,245,500,317,506,332,535,339,551,326,542,249","description":"De Griekse goden zijn moeilijk te behagen en eisen talloze offers. Met dit goddelijke standbeeld kun je laten zien hoe belangrijk ze zijn en daarmee de goddelijke gunst in de tempel vergroten.","controller":"building_statue"},"oracle":{"name":"Orakel","image":null,"":null,"max_":1,"min_":0,"requiredBuildings":null,"resources":{"wood":6500,"stone":7000,"iron":9500},"pop":60,"wood_factor":2,"stone_factor":2,"iron_factor":2,"pop_factor":1,"hide_factor":null,"points":500,"points_factor":1,"build_time":32400,"build_time_factor":2.17,"bolt_protected":true,"image_s":[1],"dependencies":{"main":21,"hide":10,"market":5,"temple":5},"coordinates":"494,270,483,316,501,338,549,340,567,316,558,274,529,264","description":"Met behulp van het orakel worden vijandelijke spionnen ontmaskerd. Op die manier weet je door wie je bespioneerd wordt en kun je je beter voorbereiden op aanstaande aanvallen.","controller":"building_oracle"},"trade_office":{"name":"Handelskantoor","image":null,"":null,"max_":1,"min_":0,"requiredBuildings":null,"resources":{"wood":10500,"stone":7000,"iron":6500},"pop":60,"wood_factor":2,"stone_factor":2,"iron_factor":2,"pop_factor":1,"hide_factor":null,"points":500,"points_factor":1,"build_time":32400,"build_time_factor":1,"bolt_protected":true,"image_s":[1],"dependencies":{"main":21,"market":15,"temple":5},"coordinates":"519,250,487,278,486,322,558,349,590,321,591,279","description":"Verhoogt de maximale handelsverhouding van de boerendorpen.","controller":"building_trade_office"}}});
	[{"id":"nl2","name":"Beta","playing_on":true},{"id":"nl3","name":"Gamma","playing_on":true},{"id":"nl1","name":"Alpha","playing_on":false},{"id":"nl4","name":"Delta","playing_on":false}]
*/

// class representing an item link in the menu bar
function menuItem(firstParameter, icon, url) {
	
	// constructor with one string array argument
	function constructor_array(items) {
		constructor_name(items.shift());
		addRange.call(this, items);
		return true;
	}
	

	
	// constructor with tree arguments
	function constructor_full(text, icon, url) {
		this.name = text;
		this.text = text;
		this.icon = icon;
		this.url = url;
		return true;
	}

	// constructor with one string argument
	function constructor_name(name) {
		this.buildings = JSON.parse(GM_getValue(currentWorld + '_gtb_buildings'));
		this.worlds = JSON.parse(GM_getValue('gtb_worlds'));
		this.name = name;
		this.icon = icons[name];
		if(!trySetBuilding.call(this,name)) if (!trySetWorld.call(this,name)) setOther.call(this,name);
		return true;
	}

	// add children
	function addRange(items)
	{
		this.children = [];
		for each(item in items) {
			this.children.push(new menuItem(item));
		}
	}
	
	// private function initializing the menu-item as a building
	// returns true if successful
	function trySetBuilding(name) {
		var building = buildings[name];
		if (building == null) return false;
		this.isBuilding = true;
		this.buildingLevel = building.level;
		this.text = building.name;
		this.url = menuUrls[name].replace('{town}', uW.Game.townId).replace('{token}', uW.Game.csrfToken);
		return true;
	}
	
	// private function initializing the menu-item as a world
	// returns true if successful
	function trySetWorld(name) {
		for each(var world in this.worlds) {
			if(name.toLowerCase() == world.name.toLowerCase()) {
				this.isWorld = true;
				this.text = world.name;
				this.icon = icons.worlds;
				this.url = 'http://' + world.id + '.grepolis.com/game/';
				this.isPlayedWorld = world.playing_on;
				return true;
			}
		}
		return false;
	}
	
	// private function initializing the menu-item
	function setOther(name)
	{
		this.text = name;
		this.url = '#';
	}
	
	// private function returning the full link text
	function fullText() {
		if (SHOW_BUILD_LEVELS && this.isBuilding && this.buildingLevel > 0 && this.name!='place') {
			return this.text + " [" + this.buildingLevel + "]";
		}
		return this.text;
	}
	
		
	function addDropDownPanel(parent)
	{
		parent.setAttribute('class', 'toolbar_toggle_menu');
		var panel = document.createElement('div');
		panel.setAttribute('style', 'display:none');
		panel.setAttribute('class', 'submenu');

		var itemlist = document.createElement('ul');
		for each(var item in this.children) {
			if (item.shouldShow()) {
				itemlist.appendChild(item.toSubMenuItem());
			}
		}

		var bottom = document.createElement('li');
		bottom.setAttribute('class', 'submenu_bottom');
		var right = document.createElement('span');
		right.setAttribute('class', 'right');
		bottom.appendChild(right);
		itemlist.appendChild(bottom);
		panel.appendChild(itemlist);
		parent.appendChild(panel);
		//alert(JSON.stringify(this.children));
	}
	
	// create the top menu item html
	this.toElement = function()
	{
		var element = document.createElement('li');
		element.setAttribute('style', 'font-size:100%;text-align:center;');

		var link = document.createElement('a');
		if (SHOW_IMAGES) if (this.icon) {
			var image = document.createElement('img');
			image.setAttribute('src', this.icon);
			image.setAttribute('height', '16');
			image.setAttribute('style', 'border-right:solid transparent 4px');
			link.appendChild(image);
		}
		link.href = this.url;
		link.appendChild(document.createTextNode(fullText.call(this)));
		element.appendChild(link);
		if (this.children) {
			addDropDownPanel.call(this, element);	
		}

		return element
	}
	
	// create the left menu item html
	this.toLeftMenuElement = function()
	{
		var link = document.createElement('a');
		link.href = this.url;
		link.appendChild(document.createTextNode(fullText.call(this)));
		return link;
	}

	// public function indiciting if the item should be shown
	this.shouldShow = function () {
		if (this.isWorld) {
			return (document.location.href.substring(1, 10) != this.url.substring(1, 10));
		}
		if (this.isBuilding) {
			return SHOW_BUILDINGS_NOT_PRESENT || (this.buildingLevel > 0);
		}
		return true;
	}
	
	// public function returning a li-item representing the sub menu item
	this.toSubMenuItem = function ()
	{
		var element = document.createElement('li');
		var link = document.createElement('a');
		link.href = this.url
		link.setAttribute('class', 'submenu_item');
		link.appendChild(document.createTextNode(fullText.call(this)));
		element.appendChild(link);
		var span = document.createElement('span')
		span.setAttribute('class', 'right')
		element.appendChild(span);
		return element
	}
	
	// constructor selector	
	if (typeof(url) == 'string') return constructor_full.call(this, firstParameter, icon, url);
	if (typeof(firstParameter) == 'string') return constructor_name.call(this, firstParameter);
	if ($.isArray(firstParameter)) return constructor_array.call(this, firstParameter);
	return false;	
}

// class representing the top menu 
function topMenu()
{
	function constructor()
	{
		return true;
	}
		// Create the menu item list (an ul)
	function toElement()
	{
		var element = document.createElement('ul');
		element.setAttribute('class', 'toolbar');
		for each(var name in TOP_MENU_ITEMS) {
			var item = new menuItem(name);
			if (item.shouldShow()) {
				element.appendChild(item.toElement());
			}
		}
		return element
	}
	
	
	function addDropDownEvent()
	{
		// show dropdownmenu
		$(".toolbar_toggle_menu").hover(
		
			function () {
				$(".toolbar_toggle_menu").children('div').hide();
				var elements = $("#town_background").find('*').attr('style', 'z-index:1');
				$(this).children('div').attr('style', 'opacity:1');
				$(this).children('div').show();
			},
			function () {
				$(this).children('div').fadeOut();
		});
	}
	
	function addHoverEvent()
	{
		// mouseover submenuitems
		$(".submenu_item").hover(
			function () {
				$(this).css('color', '#0088bb');
			},
			function () {
				$(this).animate({
					color: '#804000'
				}, 500);
		});

	}
	
	this.instantiateIn = function (element){
		element.appendChild(toElement.call(this));
		addDropDownEvent.call(this);
		addHoverEvent.call(this);
	}
	
	// actual constructor
	return constructor.call(this);
}


/// Determine what world we're in


function getCurrentWorld() {
	var expression = /https?:\/\/(.+?)\..*/;
	var currentWorld = expression.exec(document.location.href)[1]; // e.g. 'nl2'
	return currentWorld;
}

/// Deternmine the two letter language abbrevation based on the url


function getCurrentLanguage() {
	return '';//getCurrentWorld().substr(0, 2);
}


// Function allowing to use GM_setValue on event


function setWorlds(value) {
	setTimeout(function () {
		GM_setValue('gtb_worlds', JSON.stringify(value));
	}, 0);
}


function addLeftMenuItems(container) {
	// Add items to the main menu on the left
	for each(var name in LEFT_MENU_ITEMS) {
		var item = new menuItem(name);
		if (item.shouldShow()) {
			container.appendChild(item.toLeftMenuElement());
		}
	}
}



//Grepostats


function grepoStats() {
	var world = uW.location.href.substring(7, uW.location.href.indexOf('.'));
	var gs_gs_player = 'http://www.grepostats.com/world/' + world + '/player/' + uW.Game.player_id;
	var gs_gs_ally = 'http://www.grepostats.com/world/' + world + '/alliance/' + uW.Game.alliance_id;
	$('#menu').append('<div id="gs_gs_container" style="text-align:center;background: url(http://www.sdm-scholz.de/grepolis/main.jpg);position:absolute;top:465px;width:150px;margin-left:817px;opacity:0.7;"></div>');
	$('#gs_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png);"></div>');
	$('#gs_gs_container').append('<div class="game_border_top" style="float:left;height:10px;width:130px;"></div>');
	$('#gs_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -10px;"></div>');
	$('#gs_gs_container').append('<div class="game_border_left" style="float:left;width:10px;height:70px;"></div>');
	$('#gs_gs_container').append('<div id="gs_gs" style="float:left;width:130px;height:70px;font-size:10px;"></div>');
	$('#gs_gs_container').append('<div class="game_border_right" style="float:left;width:10px;height:70px;"></div>');
	$('#gs_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -30px;"></div>');
	$('#gs_gs_container').append('<div class="game_border_bottom" style="float:left;height:10px;width:130px;"></div>');
	$('#gs_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -20px;"></div>');
	$('#gs_gs').append('<span style="font-size:12px;text-decoration:overline underline;"><img src="http://www.grepostats.com/img/favicon.ico" width="12" height="12"> ' + translations.en.stats + '</span>');
	$('#gs_gs').append('<div style="text-align:middle;"><hr /><a href="http://www.grepostats.com/" alt="Grepostarts.com" target="_blank" >Grepostats</a><hr /> <a href="' + gs_gs_player + '" target="_blank">' + translations.en.you + '</a>, <a href="' + gs_gs_ally + '" target="_blank">' + translations.en.ally + '</a>,</div>');
	$('#gs_gs').children('div').append(' <a href="http://www.grepolismaps.org/" target="_blank">' + translations.en.map + '</a>');
	$('#gs_gs a').css({
		'font-size': '12px'
	});
}

//Scriptinfo in the senat


function aboutBox() {
	var world = uW.location.href.substring(7, uW.location.href.indexOf('.'));
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
	$('#gs_gs2').append('<div style="text-align:middle;"><hr /><a href="http://userscripts.org/scripts/show/62989" target="_blank" ><img src="http://www.sdm-scholz.de/templates/Landschaften/favicon.ico" width="12" height="12" > ' + VERSION + '</a><hr /></div>');
	$('#gs_gs2').append('<div style="text-align:middle;"><a href="http://userscripts.org/scripts/show/62989" target="_blank" ><img src="http://static.grepolis.com/images/game/units/slinger_40x40.png" width="12" height="12" > ' + gs_langs + ' ' + translations.en.speak + ' </a><a  href="http://sdm-scholz.de" target="_blank" title="Doc Marco &amp; die PC-Helfer">!</a></div>');
	$('#gs_gs2 a').css({
		'font-size': '9px'
	});
}



// -----------------------------------------------------------------------------	

// Access to window object cross-browser
var uW;
if (typeof unsafeWindow === 'object') {
	uW = unsafeWindow;
} else {
	uW = window;
}
var $ = uW.jQuery;
var lang = getCurrentLanguage();
var currentWorld = getCurrentWorld();

// Discover played worlds
if (uW.Login) {
	uW.Login.fetchWorlds = function (showWorldsAfterFetch) {
		var $worlds = function (return_data) {
			setWorlds(return_data);
			uW.Login.worlds = return_data;
			uW.Login.fetchedFor = uW.data.name;
			if (uW.data.showWorldsAfterFetch !== "undefined") uW.Login.showWorlds();
		}
		var data = {};
		data.name = $.trim($("#name").val());
		data.password = $.trim($("#password").val());
		data.passwordhash = $.trim($("#passwordhash").val());
		data.showWorldsAfterFetch = typeof showWorldsAfterFetch;
		uW.data = data;
		uW.Ajax.post("/start/index?action=ajax_played_worlds", null, data, $worlds, {}, null, false, false);
		return true;
	}
}

// Discover buildings
if (uW.buildings) {
	GM_setValue(currentWorld + '_gtb_buildings', JSON.stringify(uW.buildings));
}

// Get game data
if (location.href.match('game')) {
	var buildings = JSON.parse(GM_getValue(currentWorld + '_gtb_buildings'));
	var worlds = JSON.parse(GM_getValue('gtb_worlds'));
}

// Add the menu element to the document
var toolbar = $('.toolbar');
var toolbarAlreadyPresent = 1 == toolbar.length;
toolbar.remove();
var menu = $('#bar_content')[0];
if (menu == null) {
	menu = document.createElement('div');
	menu.setAttribute('id', 'sright');
	var lmidall = $('#lmidall');
	if (lmidall.length==1) lmidall.appendChild(menu);
}

new topMenu().instantiateIn(menu);

addLeftMenuItems(document.getElementById("link_index"));
if (USE_GREPO_STATS) if (location.href.match('game/index')) grepoStats();
if (location.href.match('game/building_main')) aboutBox();