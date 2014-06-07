//
// ==UserScript==
// @name           Ikariam Town Worth v1.0
// @namespace      ikariamScript
// @description    Displays town score (resources used / 100) and building time information
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==
//
//
// version 1.0
// 2009-05-01
// author - sifl
//
// Thanks to the makers and contributers to Town Enhancer and Inline Score for language
// information.  Questions/comments should be posted to the following page:
//

String.prototype.trim = function () { 
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); 
};

var scoreElement;

var gameServer;
var gameServerParts;
var subDomain;
var domain;

var languages = {
	en: {
		"townHall": "Town Hall",
		"academy": "Academy",
		"warehouse": "Warehouse",
		"tavern": "Tavern",
		"palace": "Palace",
		"palaceColony": "Gov. Residence",
		"museum": "Museum",
		"port": "Port",
		"shipyard": "Shipyard",
		"barracks": "Barracks",
		"wall": "Town Wall",
		"embassy": "Embassy",
		"branchOffice": "Trading Post",
		"workshop": "Workshop",
		"safehouse": "Hideout",
		"forester": "Forester",
		"glassblowing": "Glassblower",
		"alchemist": "Alchemist",
		"winegrower": "Winery",
		"stonemason": "Mason",
		"carpentering": "Carpenter",
		"optician": "Optician",
		"fireworker": "Fireworks",
		"vineyard": "Wine Cellar",
		"architect": "Architect",
		"buildingGround": "Building Ground",
		"settings-main-title": "Town Enhancer Settings",
		"settings-save-text": "Save Settings",
		"settings-research-title": "Completed Research",
		"settings-research-selector": "Highest Completed Research",
		"settings-research-pulley": "Pulley",
		"settings-research-geometry": "Geometry",
		"settings-research-spiritlevel": "Spirit Level",
		"settings-display-title": "Display Settings",
		"settings-display-buildingname": "Display Building Name",
		"settings-display-buildinglevel": "Display Building Level",
		"settings-display-upgradebutton": "Display Upgrade Button",
		"settings-display-enableupgrade": "Enable Quick Upgrade Link",
		"settings-language-title": "Language Settings",
		"settings-language-selector": "Available Languages",
		"confirm-upgrade": "Upgrade Building \"<%building%>\"? [<%old%> to <%new%>]",
		"language-name": "English"
	},
	sv: {
		"townHall": "RÃ¥dhus",
		"academy": "Akademi",
		"warehouse": "Lagerlokal",
		"tavern": "Taverna",
		"palace": "Palats",
		"palaceColony": "Guv. Residens",
		"museum": "Museum",
		"port": "Handelshamn",
		"shipyard": "Skeppsvarv",
		"barracks": "Kasern",
		"wall": "Stadsmur",
		"embassy": "Ambassad",
		"branchOffice": "Handelsstation",
		"workshop": "Verkstad",
		"safehouse": "GÃ¶mstÃ¤lle",
		"forester": "Skogvaktare",
		"glassblowing": "GlasblÃ¥sare",
		"alchemist": "Alkemist",
		"winegrower": "Vinodlare",
		"stonemason": "Stenhuggare",
		"carpentering": "Snickare",
		"optician": "Optiker",
		"fireworker": "Fyrverkerifabrik",
		"vineyard": "Vinpress",
		"architect": "Arkitekt",
		"buildingGround": "Byggnadsplats",
		"settings-main-title": "Town Enhancer InstÃ¤llningar",
		"settings-save-text": "Spara InstÃ¤llningar",
		"settings-research-title": "FÃ¤rdiga Forskningar",
		"settings-research-selector": "HÃ¶gsta FÃ¤rdiga Forskning",
		"settings-research-pulley": "Block",
		"settings-research-geometry": "Geometri",
		"settings-research-spiritlevel": "Vattenpass",
		"settings-display-title": "Visa InstÃ¤llningar",
		"settings-display-buildingname": "Visa Byggnadsnamn",
		"settings-display-buildinglevel": "Visa ByggnadsnivÃ¥",
		"settings-display-upgradebutton": "Visa uppgraderingsknapp",
		"settings-language-title": "SprÃ¥kinstÃ¤llningar",
		"settings-language-selector": "TillgÃ¤ngliga SprÃ¥k",
		"language-name": "Svenska"
	},
	de: {
		"townHall": "Rathaus",
		"academy": "Akademie",
		"warehouse": "Lagerhaus",
		"tavern": "Taverne",
		"palace": "Palast",
		"palaceColony": "Stadthaltersitz",
		"museum": "Museum",
		"port": "Handelshafen",
		"shipyard": "Kriegswerft",
		"barracks": "Kaserne",
		"wall": "Stadtmauer",
		"embassy": "Botschaft",
		"branchOffice": "Kontor",
		"workshop": "Erfinderwerkstatt",
		"safehouse": "Versteck",
		"forester": "Forsthaus",
		"glassblowing": "GlasblÃ¤serei",
		"alchemist": "Alchemistenturm",
		"winegrower": "Winzerei",
		"stonemason": "Steinmetz",
		"carpentering": "Zimmerei",
		"optician": "Optiker",
		"fireworker": "Feuerwerksplatz",
		"vineyard": "Kelterei",
		"architect": "ArchitekturbÃ¼ro",
		"buildingGround": "Bauplatz",
		"settings-main-title": "Town Enhancer Einstellungen",
		"settings-save-text": "Einstellungen speichern",
		"settings-research-title": "Abgeschlossene Forschung",
		"settings-research-selector": "HÃ¶chste abgeschlossene Forschung",
		"settings-research-pulley": "Flaschenzug",
		"settings-research-geometry": "Geometrie",
		"settings-research-spiritlevel": "Wasserwaage",
		"settings-display-title": "Anzeigeeinstellungen",
		"settings-display-buildingname": "GebÃ¤udenamen anzeigen",
		"settings-display-buildinglevel": "GebÃ¤udestufe anzeigen",
		"settings-display-upgradebutton": "Upgrade Button anzeigen",
		"settings-language-title": "Spracheinstellungen",
		"settings-language-selector": "VerfÃ¼gbare Sprachen",
		"language-name": "Deutsch"
	},
	he: {
		"townHall": "×‘× ×™×™×Ÿ ×”×¢×™×¨×™×™×”",
		"academy": "××§×“×ž×™×”",
		"warehouse": "×ž×—×¡×Ÿ",
		"tavern": "×˜×‘×¨× ×”",
		"palace": "××¨×ž×•×Ÿ",
		"palaceColony": "×ž×’×•×¨×™ ×”×ž×•×©×œ",
		"museum": "×ž×•×–×™××•×Ÿ",
		"port": "× ×ž×œ ×¡×—×¨",
		"shipyard": "×ž×¡×¤× ×”",
		"barracks": "×ž×’×•×¨×™ ×—×™×™×œ×™×",
		"wall": "×—×•×ž×ª ×”×¢×™×¨",
		"embassy": "×©×’×¨×™×¨×•×ª",
		"branchOffice": "×ª×—× ×ª ×¡×—×¨",
		"workshop": "×‘×™×ª-×ž×œ××›×”",
		"safehouse": "×ž×§×•× ×ž×—×‘×•×",
		"forester": "×‘×™×ª ×—×•×˜×‘ ×¢×¦×™×",
		"glassblowing": "×ž×¤×¢×œ ×”×–×›×•×›×™×ª",
		"alchemist": "×ž×’×“×œ ×”××œ×›×™×ž××™",
		"winegrower": "×ž×¤×¢×œ ×”×™×™×Ÿ",
		"stonemason": "×ž×—×¦×‘×”",
		"carpentering": "×‘×™×ª ×”×—×¨×•×©×ª ×œ×¢×¥",
		"optician": "×ž×©×¨×“ ×”×ž×“×¢×Ÿ",
		"fireworker": "×ž×¤×¢×œ ×”×–×™×§×•×§×™×",
		"vineyard": "×™×§×‘",
		"architect": "×ž×©×¨×“ ×”××¨×›×™×˜×§×˜×•×¨",
		"buildingGround": "×©×˜×— ×‘× ×™×™×”",
		"settings-main-title": "××¤×©×¨×•×™×•×ª ×ž×—×–×§ ×”×¢×™×¨",
		"settings-save-text": "×©×ž×•×¨ ××¤×©×¨×•×™×•×ª",
		"settings-research-title": "×”×ž×—×§×¨ ×”×•×©×œ×",
		"settings-research-selector": "×”×ž×—×§×¨ ×”××—×¨×•×Ÿ ×”×•×©×œ×",
		"settings-research-pulley": "×’×œ×’×œ×ª",
		"settings-research-geometry": "×’×™××•×ž×˜×¨×™×”",
		"settings-research-spiritlevel": "×©×œ×‘ ×¨×•×—× ×™",
		"settings-display-title": "×”×¦×’ ××¤×©×¨×•×™×•×ª",
		"settings-display-buildingname": "×”×¦×’ ××ª ×©× ×”×‘× ×™×™×Ÿ",
		"settings-display-buildinglevel": "×”×¦×’ ××ª ×©×œ×‘ ×”×‘× ×™×™×Ÿ",
		"settings-display-upgradebutton": "×”×¦×’ ×›×¤×ª×•×¨ ×©×“×¨×•×’",
		"settings-language-title": "××¤×©×¨×•×™×•×ª ×©×¤×”",
		"settings-language-selector": "×©×¤×•×ª ×§×™×™×ž×•×ª",
		"language-name": "×¢×‘×¨×™×ª"
	},
	tr: {
		"townHall": "Belediye Binasi",
		"academy": "Akademi",
		"warehouse": "Depo",
		"tavern": "Taverna",
		"palace": "Saray",
		"palaceColony": "Vali Konagi",
		"museum": "Muze",
		"port": "Ticaret Limani",
		"shipyard": "Donanma Tershanesi",
		"barracks": "Kisla",
		"wall": "Sur",
		"embassy": "Buyukelcilik",
		"branchOffice": "Ticaret Merkezi",
		"workshop": "Mucit Atolyesi",
		"safehouse": "Istihbarat Merkezi",
		"forester": "Ormanci Kulubesi",
		"glassblowing": "Cam Esya Atolyesi",
		"alchemist": "Simya Kulesi",
		"winegrower": "Bag Evi",
		"stonemason": "Mermer Atolyesi",
		"carpentering": "Marangoz Atolyesi",
		"optician": "Optik",
		"fireworker": "Havai Fisek Test Alani",
		"vineyard": "Sarap Mahzeni",
		"architect": "Mimarlik Burosu",
		"buildingGround": "Insaa Alani",
		"settings-main-title": "Town Enhancer Ayarlari",
		"settings-save-text": "Ayarlari Kaydet",
		"settings-research-title": "Tamamlanan Arastirmalar",
		"settings-research-selector": "Tamamlanmis Arastirmalar",
		"settings-research-pulley": "Palanga",
		"settings-research-geometry": "Geometri",
		"settings-research-spiritlevel": "Ruh Duzeyi",
		"settings-display-title": "Gorunum Ayarlari",
		"settings-display-buildingname": "Bina Ismini Goster",
		"settings-display-buildinglevel": "Bina Seviyesini Goster",
		"settings-display-upgradebutton": "Yukseltme Dugmesini Goster",
		"settings-language-title": "Dil Ayarlari",
		"settings-language-selector": "Diller",
		"language-name": "Turkce"
	},
	uk: {
		"townHall": "Ð Ð°Ñ‚ÑƒÑˆÐ°",
		"academy": "ÐÐºÐ°Ð´ÐµÐ¼Ñ–Ñ",
		"warehouse": "Ð¡ÐºÐ»Ð°Ð´",
		"tavern": "Ð¢Ð°Ð²ÐµÑ€Ð½Ð°",
		"palace": "ÐŸÐ°Ð»Ð°Ñ†",
		"palaceColony": "Ð ÐµÐ·Ð¸Ð´ÐµÐ½Ñ†Ñ–Ñ Ð³ÑƒÐ±ÐµÑ€Ð½Ð°Ñ‚Ð¾Ñ€Ð°",
		"museum": "ÐœÑƒÐ·ÐµÐ¹",
		"port": "Ð¢Ð¾Ñ€Ð³Ð¾Ð²Ð¸Ð¹ Ð¿Ð¾Ñ€Ñ‚",
		"shipyard": "Ð’ÐµÑ€Ñ„",
		"barracks": "Ð‘Ð°Ñ€Ð°ÐºÐ¸",
		"wall": "ÐœÑ–ÑÑŒÐºÐ° ÑÑ‚Ñ–Ð½Ð°",
		"embassy": "ÐŸÐ¾ÑÐ¾Ð»ÑŒÑÑ‚Ð²Ð¾",
		"branchOffice": "Ð¢Ð¾Ñ€Ð³Ð¾Ð²Ð¸Ð¹ Ð¿Ð¾ÑÑ‚",
		"workshop": "ÐœÐ°Ð¹ÑÑ‚ÐµÑ€Ð½Ñ",
		"safehouse": "Ð¡Ñ…Ð¾Ð²Ð°Ð½ÐºÐ°",
		"forester": "Ð”Ñ–Ð¼ Ð»Ñ–ÑÐ½Ð¸Ñ‡Ð¾Ð³Ð¾",
		"glassblowing": "Ð¡ÐºÐ»Ð¾Ð´ÑƒÐ²Ð½Ð° Ð¼Ð°Ð¹ÑÑ‚ÐµÑ€Ð½Ñ",
		"alchemist": "Ð’ÐµÐ¶Ð° Ð°Ð»Ñ…Ñ–Ð¼Ñ–ÐºÐ°",
		"winegrower": "Ð’Ð¸Ð½Ð½Ð¸Ð¹ Ð·Ð°Ð²Ð¾Ð´",
		"stonemason": "ÐšÐ°Ð¼ÐµÐ½ÑÑ€",
		"carpentering": "Ð¢ÐµÑÐ»ÑÑ€ÑÑŒÐºÐ° Ð¼Ð°Ð¹ÑÑ‚ÐµÑ€Ð½Ñ",
		"optician": "ÐžÐ¿Ñ‚Ð¸Ðº",
		"fireworker": "ÐŸÐ¾Ð»Ñ–Ð³Ð¾Ð½ Ð¿Ñ–Ñ€Ð¾Ñ‚ÐµÑ…Ð½Ñ–ÐºÐ°",
		"vineyard": "Ð’Ð¸Ð½Ð½Ð¸Ð¹ Ð¿Ñ€ÐµÑ",
		"architect": "ÐžÑ„Ñ–Ñ Ð°Ñ€Ñ…Ñ–Ñ‚ÐµÐºÑ‚Ð¾Ñ€Ð°",
		"buildingGround": "Ð‘ÑƒÐ´Ñ–Ð²ÐµÐ»ÑŒÐ½Ð¸Ð¹ Ð¿Ñ€Ð¾ÑÑ‚Ñ–Ñ€",
		"settings-main-title": "ÐÐ°Ð»Ð°ÑˆÑ‚ÑƒÐ²Ð°Ð½Ð½Ñ Town Enhancer",
		"settings-save-text": "Ð—Ð±ÐµÑ€ÐµÐ³Ñ‚Ð¸ ÐÐ°Ð»Ð°ÑˆÑ‚ÑƒÐ²Ð°Ð½Ð½Ñ",
		"settings-research-title": "Ð—Ð°Ð²ÐµÑ€ÑˆÐµÐ½Ðµ Ð”Ð¾ÑÐ»Ñ–Ð´Ð¶ÐµÐ½Ð½Ñ",
		"settings-research-selector": "ÐÐ°Ð¹Ð²Ð¸Ñ‰Ðµ Ð—Ð°Ð²ÐµÑ€ÑˆÐµÐ½Ðµ Ð”Ð¾ÑÐ»Ñ–Ð´Ð¶ÐµÐ½Ð½Ñ",
		"settings-research-pulley": "Ð¨ÐºÑ–Ð²",
		"settings-research-geometry": "Ð“ÐµÐ¾Ð¼ÐµÑ‚Ñ€Ñ–Ñ",
		"settings-research-spiritlevel": "Ð’Ð¾Ð´ÑÐ½Ð¸Ð¹ Ñ€Ñ–Ð²ÐµÐ½ÑŒ",
		"settings-display-title": "ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚Ð¸ ÐÐ°Ð»Ð°ÑˆÑ‚ÑƒÐ²Ð°Ð½Ð½Ñ",
		"settings-display-buildingname": "ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚Ð¸ ÐÐ°Ð·Ð²Ñƒ Ð‘ÑƒÐ´Ñ–Ð²Ð»Ñ–",
		"settings-display-buildinglevel": "ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚Ð¸ Ð Ñ–Ð²ÐµÐ½ÑŒ Ð‘ÑƒÐ´Ñ–Ð²Ð»Ñ–",
		"settings-display-upgradebutton": "ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚Ð¸ ÐšÐ½Ð¾Ð¿ÐºÑƒ Ð Ð¾Ð·ÑˆÐ¸Ñ€ÐµÐ½Ð½Ñ",
		"settings-language-title": "ÐÐ°Ð»Ð°ÑˆÑ‚ÑƒÐ²Ð°Ð½Ð½Ñ ÐœÐ¾Ð²Ð¸",
		"settings-language-selector": "ÐÐ°ÑÐ²Ð½Ñ– Ð¼Ð¾Ð²Ð¸",
		"language-name": "Ukrainian"
	},
	es: {
		"townHall": "Intendencia",
		"academy": "Academia",
		"warehouse": "DepÃ³sito",
		"tavern": "Taberna",
		"palace": "Palacio",
		"palaceColony": "Residencia Gob.",
		"museum": "Museo",
		"port": "Puerto Com.",
		"shipyard": "Astillero",
		"barracks": "Cuartel",
		"wall": "Muralla",
		"embassy": "Embajada",
		"branchOffice": "Tienda",
		"workshop": "Invenciones",
		"safehouse": "Escondite",
		"forester": "Guardabosques",
		"glassblowing": "Soplador Vino",
		"alchemist": "Alquimista",
		"winegrower": "Vinicultor",
		"stonemason": "Cantero",
		"carpentering": "CarpinterÃ­a",
		"optician": "Ã“ptico",
		"fireworker": "PirotÃ©cnica",
		"vineyard": "Prensa Vino",
		"architect": "Arquitecto",
		"buildingGround": "Terreno Libre",
		"settings-main-title": "Opciones de Town Enhancer",
		"settings-save-text": "Guardar Opciones",
		"settings-research-title": "InvestigaciÃ³n Completada",
		"settings-research-selector": "InvestigaciÃ³n mÃ¡s alta Completada",
		"settings-research-pulley": "Polea",
		"settings-research-geometry": "GeometrÃ­a",
		"settings-research-spiritlevel": "Nivel de Agua",
		"settings-display-title": "Opciones de VisualizaciÃ³n",
		"settings-display-buildingname": "Mostrar Nombre del Edificio",
		"settings-display-buildinglevel": "Mostrar Nivel del Edificio",
		"settings-display-upgradebutton": "Mostrar BotÃ³n de ConstrucciÃ³n",
		"settings-display-enableupgrade": "Habilitar Link de ConstrucciÃ³n RÃ¡pida",
		"settings-language-title": "Opciones de Idioma",
		"settings-language-selector": "Idiomas Disponibles",
		"confirm-upgrade": "Tiempo de construcciÃ³n \"<%building%>\"? [<%old%> to <%new%>]",
		"language-name": "EspaÃ±ol"
	},
	pl: {
		"townHall": "Ratusz",
		"academy": "Akademia",
		"warehouse": "Magazyn",
		"tavern": "Tawerna",
		"palace": "PaÅ‚ac",
		"palaceColony": "Rezydencja Gubernatora",
		"museum": "Muzeum",
		"port": "Port",
		"shipyard": "Stocznia",
		"barracks": "Koszary",
		"wall": "Mur Miejski",
		"embassy": "Ambasada",
		"branchOffice": "Bazar",
		"workshop": "Warsztat",
		"safehouse": "KryjÃ³wka",
		"forester": "LeÅ›niczÃ³wka",
		"glassblowing": "Huta SzkÅ‚a",
		"alchemist": "WieÅ¼a Alchemika",
		"winegrower": "Winnica",
		"stonemason": "Kamieniarz",
		"carpentering": "Warsztat CieÅ›li",
		"optician": "Optyk",
		"fireworker": "ZakÅ‚ad Pirotechnika",
		"vineyard": "Winiarz",
		"architect": "Biuro Architekta",
		"buildingGround": "Plac Budowy",
		"settings-main-title": "Ustawienia Wzmacniacza Miast",
		"settings-save-text": "Zapisz Ustawienia",
		"settings-research-title": "UkoÅ„czono Badanie",
		"settings-research-selector": "NajwyÅ¼sze UkoÅ„czone Badanie",
		"settings-research-pulley": "Blok",
		"settings-research-geometry": "Geometria",
		"settings-research-spiritlevel": "Poziomica",
		"settings-display-title": "Ustwienia WyÅ›wietlania",
		"settings-display-buildingname": "WyÅ›wietl NazwÄ™ Budynku",
		"settings-display-buildinglevel": "WyÅ›wietl Poziom Budynku",
		"settings-display-upgradebutton": "WyÅ›wietl Przycisk Uleprzania",
		"settings-language-title": "ZmieÅ„ JÄ™zyk",
		"settings-language-selector": "DostÄ™pne JÄ™zyki",
		"language-name": "Polski"
	},
	vn: {
		"townHall": "TÃ²a thá»‹ chÃ­nh",
		"academy": "Há»c viá»‡n",
		"warehouse": "Kho hÃ ng",
		"tavern": "QuÃ¡n RÆ°á»£u",
		"palace": "Cung Ä‘iá»‡n",
		"palaceColony": "Phá»§ thá»§ hiáº¿n",
		"museum": "Viá»‡n báº£o tÃ ng",
		"port": "Cáº£ng giao dá»‹ch",
		"shipyard": "XÆ°á»Ÿng Ä‘Ã³ng tÃ u",
		"barracks": "Tráº¡i lÃ­nh",
		"wall": "TÆ°á»ng thÃ nh",
		"embassy": "Äáº¡i sá»© quÃ¡n",
		"branchOffice": "Tráº¡m giao dá»‹ch",
		"workshop": "XÆ°á»Ÿng",
		"safehouse": "NÆ¡i áº©n nÃ¡u",
		"forester": "Tráº¡m kiá»ƒm lÃ¢m",
		"glassblowing": "Thá»£ thá»§y tinh",
		"alchemist": "ThÃ¡p giáº£ kim thuáº­t",
		"winegrower": "NgÆ°á»i trá»“ng nho",
		"stonemason": "Thá»£ xÃ¢y Ä‘Ã¡",
		"carpentering": "Thá»£ má»™c",
		"optician": "Thá»£ lÃ m kÃ­nh",
		"fireworker": "XÆ°á»Ÿng thá»­ nghiá»‡m thuá»‘c sÃºng",
		"vineyard": "MÃ¡y Ã‰p Nho",
		"architect": "VÄƒn phÃ²ng kiáº¿n trÃºc sÆ°",
		"buildingGround": "Máº·t báº±ng xÃ¢y dá»±ng trá»‘ng tráº£i",
		"settings-main-title": "CÃ i Ä‘áº·t Town Enhancer",
		"settings-save-text": "LÆ°u cÃ i Ä‘áº·t",
		"settings-research-title": "NghiÃªn cá»©u Ä‘Ã£ hoÃ n thÃ nh",
		"settings-research-selector": "Má»©c Ä‘á»™ nghiÃªn cá»©u Ä‘Ã£ hoÃ n táº¥t",
		"settings-research-pulley": " RÃ²ng rá»c ",
		"settings-research-geometry": " HÃ¬nh há»c ",
		"settings-research-spiritlevel": " ThÆ°á»›c thá»§y cÃ¢n báº±ng ",
		"settings-display-title": "CÃ i Ä‘áº·t hiá»ƒn thá»‹",
		"settings-display-buildingname": "Hiá»ƒn thá»‹ tÃªn cÃ´ng trÃ¬nh",
		"settings-display-buildinglevel": " Hiá»ƒn thá»‹ cáº¥p Ä‘á»™ cÃ´ng trÃ¬nh ",
		"settings-display-upgradebutton": "Hiá»ƒn thá»‹ nÃºt nÃ¢ng cáº¥p",
		"settings-language-title": "CÃ i Ä‘áº·t ngÃ´n ngá»¯",
		"settings-language-selector": "Nhá»¯ng ngÃ´n ngá»¯ Ä‘Æ°á»£c há»— trá»£",
		"language-name": "Tiáº¿ng Viá»‡t"
	},
	da: {
		"townHall": "RÃ¥dhus",
		"academy": "Akademi",
		"warehouse": "Lagerbygning",
		"tavern": "VÃ¦rtshus",
		"palace": "Palads",
		"palaceColony": "Guv. Residens",
		"museum": "Museum",
		"port": "Handelshavn",
		"shipyard": "SkibsvÃ¦rft",
		"barracks": "Kasserne",
		"wall": "Bymur",
		"embassy": "Ambassade",
		"branchOffice": "Handelsstation",
		"workshop": "VÃ¦rksted",
		"safehouse": "Skjulested",
		"forester": "Skovfodede",
		"glassblowing": "GlasblÃ¦ser",
		"alchemist": "Alkymist",
		"winegrower": "Vinbonde",
		"stonemason": "Stenhugger",
		"carpentering": "TÃ¸mrer",
		"optician": "Optiker",
		"fireworker": "FyrvÃ¦rkerifabrik",
		"vineyard": "Vinpresse",
		"architect": "Arkitekt",
		"buildingGround": "Byggegrund",
		"settings-main-title": "Town Enhancer Indstillinger",
		"settings-save-text": "Gem Indstillingerne",
		"settings-research-title": "FÃ¦rdige Forskninger",
		"settings-research-selector": "HÃ¸geste FÃ¦rdige Forskning",
		"settings-research-pulley": "Bloker",
		"settings-research-geometry": "Geometri",
		"settings-research-spiritlevel": "Vatterpas",
		"settings-display-title": "Vis Indstillingerne",
		"settings-display-buildingname": "Vis Bygningsnavn",
		"settings-display-buildinglevel": "Vis Bygningsniveau",
		"settings-display-upgradebutton": "Vis opgraderingsknap",
		"settings-language-title": "Sprog Indstillinger",
		"settings-language-selector": "TilgÃ¦ngelige Sprog",
		"language-name": "Dansk (Kilden af Liv)"
	},
	fr: {
		"townHall": "HÃ´tel de Ville",
		"academy": "AcadÃ©mie",
		"warehouse": "EntrepÃ´t",
		"tavern": "Taverne",
		"palace": "Palais",
		"palaceColony": "RÃ©sidence du Gouv.",
		"museum": "MusÃ©e",
		"port": "Port",
		"shipyard": "Chantier naval",
		"barracks": "Caserne",
		"wall": "Mur d'enceinte",
		"embassy": "Ambassade",
		"branchOffice": "Comptoir",
		"workshop": "Atelier",
		"safehouse": "Cachette",
		"forester": "Maison forestiÃ¨re",
		"glassblowing": "Verrier",
		"alchemist": "Tour des Alchimistes",
		"winegrower": "Pressoir Ã  Vin",
		"stonemason": "Tailleur de Pierre",
		"carpentering": "Charpentier",
		"optician": "Opticien",
		"fireworker": "Zone des Artificiers",
		"vineyard": "Cave Ã  Vin",
		"architect": "Architecte",
		"buildingGround": "Terrain Libre",
		"settings-main-title": "Options de Town Enhancer",
		"settings-save-text": "Sauvegarder les options",
		"settings-research-title": "Recherches dÃ©couvertes",
		"settings-research-selector": "Plus haute recherche dÃ©couverte",
		"settings-research-pulley": "Palan",
		"settings-research-geometry": "GÃ©omÃ©trie",
		"settings-research-spiritlevel": "Niveau Ã  eau",
		"settings-display-title": "Options de visualisation",
		"settings-display-buildingname": "Montrer le nom du bÃ¢timent",
		"settings-display-buildinglevel": "Montrer le niveau du bÃ¢timent",
		"settings-display-upgradebutton": "Montrer le bouton d'amÃ©lioration",
		"settings-display-enableupgrade": "Activer le lien d'amÃ©lioration rapide",
		"settings-language-title": "Option de langue",
		"settings-language-selector": "Langages disponibles",
		"confirm-upgrade": "AmÃ©liorer le bÃ¢timent \"<%building%>\"? [<%old%> to <%new%>]",
		"language-name": "FranÃ§ais"
	},
	nl: {
		"townHall": "Stadhuis",
		"academy": "Academie",
		"warehouse": "Warenhuis",
		"tavern": "Taverne",
		"palace": "Paleis",
		"palaceColony": "Gouverneurs Woning",
		"museum": "Museum",
		"port": "Haven",
		"shipyard": "Scheepswerf",
		"barracks": "Barakken",
		"wall": "Stadsmuur",
		"embassy": "Ambassade",
		"branchOffice": "Handelspost",
		"workshop": "Werkplaats",
		"safehouse": "Schuilplaats",
		"forester": "Houthakkers Loge",
		"glassblowing": "Glasblazer",
		"alchemist": "Alchemist",
		"winegrower": "Wijnboer",
		"stonemason": "Steenhouwer",
		"carpentering": "Timmerman",
		"optician": "Opticien",
		"fireworker": "Vuurwerk Opslag",
		"vineyard": "Wijn Pers",
		"architect": "Architectenbureau",
		"buildingGround": "Vrije Bouwgrond",
		"settings-main-title": "Town Enhancer Optie's",
		"settings-save-text": "Opslaan",
		"settings-research-title": "Afgerond Onderzoek",
		"settings-research-selector": "Hoogst Afgeronde Onderzoek",
		"settings-research-pulley": "Katrol",
		"settings-research-geometry": "Geometrie",
		"settings-research-spiritlevel": "Geest Level",
		"settings-display-title": "Display Optie's",
		"settings-display-buildingname": "Laat Gebouw naam zien",
		"settings-display-buildinglevel": "Laat Gebouw niveau zien",
		"settings-display-upgradebutton": "Laat Upgrade knop zien",
		"settings-language-title": "Taal Opties",
		"settings-language-selector": "Mogelijke Talen",
		"language-name": "Dutch (nightllion)"
	},
	hu: {
		"townHall": "VÃ¡roshÃ¡za",
		"academy": "AkadÃ©mia",
		"warehouse": "RaktÃ¡rÃ©pÃ¼let",
		"tavern": "FogadÃ³",
		"palace": "Palota",
		"palaceColony": "HelytartÃ³ SzÃ©khelye",
		"museum": "MÃºzeum",
		"port": "Kereskedelmi kikÃ¶tÅ‘",
		"shipyard": "HajÃ³gyÃ¡r",
		"barracks": "Barakk",
		"wall": "VÃ¡rosfal",
		"embassy": "NagykÃ¶vetsÃ©g",
		"branchOffice": "KereskedÅ‘ poszt",
		"workshop": "MÅ±hely",
		"safehouse": "Rejtekhely",
		"forester": "ErdÃ©szhÃ¡z",
		"glassblowing": "ÃœvegfÃºrÃ³",
		"alchemist": "Alkimista Torony",
		"winegrower": "BortermelÅ‘",
		"stonemason": "KÅ‘mÅ±ves",
		"carpentering": "Ãcsmester",
		"optician": "Optikus",
		"fireworker": "TÅ±zszerÃ©sz Teszt TerÃ¼let",
		"vineyard": "SzÅ‘lÅ‘prÃ©s",
		"architect": "Ã‰pÃ­tÃ©sz IrodÃ¡ja",
		"buildingGround": "Ã‰pÃ¼letek",
		"settings-main-title": "VÃ¡ros BÅ‘vÃ­tÅ‘ BeÃ¡llÃ­tÃ¡sai",
		"settings-save-text": "BeÃ¡llÃ­tÃ¡sok MentÃ©se",
		"settings-research-title": "Kifejlesztett KutatÃ¡s",
		"settings-research-selector": "Legmagasabb Kifejlesztett KutatÃ¡s",
		"settings-research-pulley": "EmelÅ‘csiga",
		"settings-research-geometry": "Geometria",
		"settings-research-spiritlevel": "VÃ­zszint",
		"settings-display-title": "KijelzÅ‘ BeÃ¡llÃ­tÃ¡sai",
		"settings-display-buildingname": "Ã‰pÃ¼let neve lÃ¡thatÃ³",
		"settings-display-buildinglevel": "Ã‰pÃ¼let szintje lÃ¡thatÃ³",
		"settings-display-upgradebutton": "FejesztÃ©s gomb lÃ¡thatÃ³",
		"settings-display-enableupgrade": "Gyors fejlesztÃ©s link engedÃ©lyezÃ©se",
		"settings-language-title": "Nyelv beÃ¡llÃ­tÃ¡sok",
		"settings-language-selector": "ElÃ©rhetÅ‘ nyelvek",
		"confirm-upgrade": "Ã‰pÃ¼let fejlesztÃ©se \"<%building%>\"? [errÅ‘l: <%old%> erre: <%new%>]",
		"language-name": "Magyar"
	},
	ar: {
		"townHall": "Ø¯Ø§Ø± Ø§Ù„Ø¨Ù„Ø¯ÙŠØ©",
		"academy": "Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©",
		"warehouse": "Ø§Ù„Ù…Ø®Ø²Ù†",
		"tavern": "Ø§Ù„Ø¥Ø³ØªØ±Ø§Ø­Ø©",
		"palace": "Ø§Ù„Ù‚ØµØ±",
		"palaceColony": "Ø§Ù„Ù‚Ø§Ø¦Ù… Ù…Ù‚Ø§Ù…",
		"museum": "Ø§Ù„Ù…ØªØ­Ù",
		"port": "Ø§Ù„Ù…Ø±ÙØ£ Ø§Ù„ØªØ¬Ø§Ø±ÙŠ",
		"shipyard": "Ø­ÙˆØ¶ Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø³ÙÙ†",
		"barracks": "Ø§Ù„Ø«ÙƒÙ†Ø©",
		"wall": "Ø§Ù„Ø¬Ø¯Ø§Ø±",
		"embassy": "Ø§Ù„Ø³ÙØ§Ø±Ø©",
		"branchOffice": "Ø§Ù„Ù…ØªØ¬Ø±",
		"workshop": "Ø§Ù„Ù…Ø®ØªØ±Ø¹ÙŠÙ†",
		"safehouse": "Ø§Ù„Ù…Ø®Ø¨Ø£",
		"forester": "Ø§Ù„Ø­Ø·Ø§Ø¨",
		"glassblowing": "Ù†Ø§ÙØ® Ø§Ù„Ø²Ø¬Ø§Ø¬",
		"alchemist": "Ø¨Ø±Ø¬ Ø§Ù„ÙƒÙŠÙ…ÙŠØ§Ø¡",
		"winegrower": "ÙƒØ±Ù…Ø© Ø§Ù„Ø¹Ù†Ø¨",
		"stonemason": "Ø§Ù„Ù†Ø­Ø§Øª",
		"carpentering": "Ø§Ù„Ù†Ø¬Ø§Ø±",
		"optician": "Ø§Ù„Ø¨ØµØ±ÙŠØ§Øª",
		"fireworker": "Ø§Ù„Ø§Ù„Ø¹Ø§Ø¨ Ø§Ù„Ù†Ø§Ø±ÙŠØ©",
		"vineyard": "Ø¹ØµØ§Ø±Ø© Ø§Ù„Ø¹Ù†Ø¨",
		"architect": "Ø§Ù„Ù…Ù‡Ù†Ø¯Ø³",
		"buildingGround": "Ù…ÙƒØ§Ù† ÙØ§Ø±Øº",
		"settings-main-title": "Ø§Ø¹Ø¯Ø§Ø¯Ø§Øª Ù…Ø­Ø³Ù† Ø§Ù„Ù…Ø¯Ù†",
		"settings-save-text": "Ø­ÙØ¸ Ø§Ù„Ø§Ø¹Ø¯Ø§Ø¯Ø§Øª",
		"settings-research-title": "Ø§Ù„Ø¨Ø­ÙˆØ«",
		"settings-research-selector": "Ø§Ø®Ø± Ø¨Ø­Ø« Ù…ÙƒØªÙ…Ù„",
		"settings-research-pulley": "Ø§Ù„Ø±Ø§ÙØ¹Ø©",
		"settings-research-geometry": "Ù‡Ù†Ø¯Ø³Ø©",
		"settings-research-spiritlevel": "Ù…ÙŠØ²Ø§Ù† Ø²Ø¦Ø¨Ù‚",
		"settings-display-title": "Ø§Ù„Ø§Ø¹Ø¯Ø§Ø¯Ø§Øª",
		"settings-display-buildingname": "Ø§Ø¸Ù‡Ø§Ø± Ø§Ø³Ù… Ø§Ù„Ù…Ø¨Ù†Ù‰",
		"settings-display-buildinglevel": "Ø§Ø¸Ù‡Ø§Ø± Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ù…Ø¨Ù†Ù‰",
		"settings-display-upgradebutton": "Ø§Ø¸Ù‡Ø§Ø± Ø²Ø± Ø§Ù„ØªØ·ÙˆÙŠØ±",
		"settings-language-title": "Ø§Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù„ØºØ©",
		"settings-language-selector": "Ø§Ù„Ù„ØºØ§Øª Ø§Ù„Ù…ØªÙˆÙØ±Ø©",
		"language-name": "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©"
	},
	ser: {
		"townHall": "Gradska Skupština",
		"academy": "Akademija",
		"warehouse": "Skladište",
		"tavern": "Taverna",
		"palace": "Palata",
		"palaceColony": "Guvernerova Palata",
		"museum": "Muzej",
		"port": "Luka",
		"shipyard": "Brodogradilište",
		"barracks": "Barake",
		"wall": "Gradske Zidine",
		"embassy": "Ambasada",
		"branchOffice": "Market",
		"workshop": "Radionica",
		"safehouse": "Sklonište",
		"forester": "Šumar",
		"glassblowing": "Staklarija",
		"alchemist": "Alhemičar",
		"winegrower": "Vinarija",
		"stonemason": "Zidar",
		"carpentering": "Stolar",
		"optician": "Optičar",
		"fireworker": "Vatromet",
		"vineyard": "Vinski Podrum",
		"architect": "Arhitekta",
		"buildingGround": "Zemljište",
		"settings-main-title": "Town Enhancer Podešavanja",
		"settings-save-text": "Sačuvaj Podešavanja",
		"settings-research-title": "Završeno Istraživanje",
		"settings-research-selector": "Najviše Završeno Istraživanje",
		"settings-research-pulley": "Čekrk",
		"settings-research-geometry": "Geometrija",
		"settings-research-spiritlevel": "Duhovni Nivo",
		"settings-display-title": "Prikaz Podešavanja",
		"settings-display-buildingname": "Prikaz Naziva Zgrade",
		"settings-display-buildinglevel": "Prikaz Nivoa Zgrade",
		"settings-display-upgradebutton": "Prikaz Tastera za Nadogradnju",
		"settings-language-title": "Podešavanje Jezika",
		"settings-language-selector": "Dostupni Jezici",
		"language-name": "Serbian"
	},
	pt: {
		"townHall": "Câmara Municipal",
		"academy": "Academia",
		"warehouse": "Armazém",
		"tavern": "Taberna",
		"palace": "Palácio",
		"palaceColony": "Residência Gov.",
		"museum": "Museu",
		"port": "Porto",
		"shipyard": "Estaleiro",
		"barracks": "Quartel",
		"wall": "Muralha",
		"embassy": "Embaixada",
		"branchOffice": "Mercado",
		"workshop": "Oficina",
		"safehouse": "Esconderijo",
		"forester": "Lenhador",
		"glassblowing": "Vidraceiro",
		"alchemist": "Alquimista",
		"winegrower": "Vinicultor",
		"stonemason": "Pedreiro",
		"carpentering": "Carpinteiro",
		"optician": "Optometrista",
		"fireworker": "Pirotécnico",
		"vineyard": "Cave de Vinho",
		"architect": "Arquitecto",
		"buildingGround": "Zona de Construção",
		"settings-main-title": "Definições do Town Enhancer",
		"settings-save-text": "Gravar Alterações",
		"settings-research-title": "Pesquisa Completada",
		"settings-research-selector": "Pesquisa mais alta completa",
		"settings-research-pulley": "Árvore de pesquisas",
		"settings-research-geometry": "Geometria",
		"settings-research-spiritlevel": "Spirit Level",
		"settings-display-title": "Definições de exibição",
		"settings-display-buildingname": "Mostrar Nome Edifício",
		"settings-display-buildinglevel": "Mostrar nível de construção",
		"settings-display-upgradebutton": "Mostrar Botão Upgrade",
		"settings-language-title": "Definições de linguagem",
		"settings-language-selector": "Linguagens Disponíveis",
		"language-name": "Português"
	},
	ro: {
		"townHall": "Primarie",
		"academy": "Academie",
		"warehouse": "Magazie",
		"tavern": "Taverna",
		"palace": "Palat",
		"palaceColony": "Resedinta Guv.",
		"museum": "Muzeu",
		"port": "Port",
		"shipyard": "Santier",
		"barracks": "Cazarma",
		"wall": "Zid",
		"embassy": "Ambasada",
		"branchOffice": "Punct de negot",
		"workshop": "Atelier",
		"safehouse": "Ascunzatoare",
		"forester": "Casa padurarului",
		"glassblowing": "Sticlarie",
		"alchemist": "Alchimist",
		"winegrower": "Vinificator",
		"stonemason": "Cariera",
		"carpentering": "Dulgher",
		"optician": "Optician",
		"fireworker": "Zona pirotehnica",
		"vineyard": "Presa de vin",
		"architect": "Arhitect",
		"buildingGround": "Teren liber",
		"settings-main-title": "Optiuni Imbunatarire Oras",
		"settings-save-text": "Salveaza",
		"settings-research-title": "Cercetare completata",
		"settings-research-selector": "Cel mai inalt grad de cercetare completata",
		"settings-research-pulley": "Scripete",
		"settings-research-geometry": "Geometrie",
		"settings-research-spiritlevel": "Cumpana",
		"settings-display-title": "Afiseaza optiuni",
		"settings-display-buildingname": "Afiseaza numele cladirii",
		"settings-display-buildinglevel": "Afiseaza nivelul cladirii",
		"settings-display-upgradebutton": "Afiseaza buton pentru extindere",
		"settings-language-title": "Setari limba",
		"settings-language-selector": "Limbi disponibile",
		"language-name": "Romana"
	}
};


// <base data> !! DO NOT EDIT !! (report errors on the ikariamlibrary forum)
var data = {
	"townHall": [
		{ }, // 1
		{ w: 158, t: 3544 },
		{ w: 335, t: 3960 },
		{ w: 623, t: 4440 },
		{ w: 923, m: 285, t: 4980 }, // 5
		{ w: 1390, m: 551, t: 5640 },
		{ w: 2015, m: 936, t: 6480 },
		{ w: 2706, m: 1411, t: 7380 },
		{ w: 3661, m: 2091, t: 8460 },
		{ w: 4776, m: 2945, t: 9720 }, // 10
		{ w: 6173, m: 4072, t: 11160 },
		{ w: 8074, m: 5664, t: 12900 },
		{ w: 10281, m: 7637, t: 14880 },
		{ w: 13023, m: 10214, t: 17280 },
		{ w: 16424, m: 13575, t: 20040 }, // 15
		{ w: 20986, m: 18254, t: 23220 },
		{ w: 25423, m: 23250, t: 27000 },
		{ w: 32285, m: 31022, t: 31440 },
		{ w: 40232, m: 40599, t: 36600 },
		{ w: 49286, m: 52216, t: 42660 }, // 20
		{ w: 61207, m: 68069, t: 49740 },
		{ w: 74804, m: 87316, t: 57960 },
		{ w: 93956, m: 115101, t: 67680 },
		{ w: 113035, m: 145326, t: 78960 },
		{ w: 141594, m: 191053, t: 90000 }, // 25
		{ w: 170213, m: 241039, t: 104400 },
		{ w: 210011, m: 312128, t: 122499 }
	],
	"academy": [
		{ w: 64, t: 504 }, // 1
		{ w: 68, t: 1354 },
		{ w: 115, t: 1768 },
		{ w: 263, t: 2266 },
		{ w: 382, g: 225, t: 2863 }, // 5
		{ w: 626, g: 428, t: 3580 },
		{ w: 982, g: 744, t: 4440 },
		{ w: 1330, g: 1089, t: 5460 },
		{ w: 2004, g: 1748, t: 6660 },
		{ w: 2665, g: 2454, t: 8160 }, // 10
		{ w: 3916, g: 3786, t: 9960 },
		{ w: 5156, g: 5216, t: 12060 },
		{ w: 7446, g: 7862, t: 14640 },
		{ w: 9753, g: 10729, t: 17760 },
		{ w: 12751, g: 14599, t: 21420 }, // 15
		{ w: 18163, g: 21627, t: 25860 },
		{ w: 23691, g: 29321, t: 31200 },
		{ w: 33450, g: 43020, t: 37560 },
		{ w: 43571, g: 58213, t: 45240 },
		{ w: 56728, g: 78724, t: 54480 } // 20
	],
	"warehouse": [
		{ w: 160, t: 562 }, // 1
		{ w: 288, t: 1583 },
		{ w: 442, t: 2107 },
		{ w: 626, m: 96, t: 2704 },
		{ w: 847, m: 211, t: 3385 }, // 5
		{ w: 1113, m: 349, t: 4140 },
		{ w: 1431, m: 515, t: 5040 },
		{ w: 1813, m: 714, t: 6000 },
		{ w: 2272, m: 953, t: 7206 },
		{ w: 2822, m: 1240, t: 8460 }, // 10
		{ w: 3483, m: 1584, t: 9960 },
		{ w: 4275, m: 1997, t: 11700 },
		{ w: 5226, m: 2492, t: 13620 },
		{ w: 6368, m: 3086, t: 15840 },
		{ w: 7737, m: 3800, t: 18360 }, // 15
		{ w: 9380, m: 4656, t: 21240 },
		{ w: 11353, m: 5683, t: 24540 },
		{ w: 13719, m: 6915, t: 28260 },
		{ w: 16559, m: 8394, t: 32520 },
		{ w: 19967, m: 10169, t: 37380 }, // 20
		{ w: 24056, m: 12299, t: 39360 },
		{ w: 28963, m: 14855, t: 47046 },
		{ w: 34852, m: 17921, t: 56460 },
		{ w: 41917, m: 21602, t: 64680 },
		{ w: 50398, m: 26019, t: 74040 }, // 25
		{ w: 60574, m: 31319, t: 84720 },
		{ w: 72784, m: 37679, t: 93600 },
		{ w: 87437, m: 45310, t: 108000 },
		{ w: 105021, m: 54468, t: 126000 },
		{ w: 126333, m: 65457, t: 144000 }, // 30
		{ w: 151441, m: 78645, t: 162000 }
	],
	"tavern": [
		{ w: 101, t: 1008 }, // 1
		{ w: 222, t: 1695 }, 
		{ w: 367, t: 2423 },
		{ w: 541, m: 94, t: 3195 },
		{ w: 750, m: 122, t: 3960 }, // 5
		{ w: 1001, m: 158, t: 4860 },
		{ w: 1302, m: 206, t: 5760 },
		{ w: 1663, m: 267, t: 6720 },
		{ w: 2097, m: 348, t: 7800 },
		{ w: 2617, m: 452, t: 8880 }, // 10
		{ w: 3241, m: 587, t: 10020 },
		{ w: 3990, m: 764, t: 11280 },
		{ w: 4888, m: 993, t: 12540 },
		{ w: 5967, m: 1290, t: 13920 },
		{ w: 7261, m: 1677, t: 15420 }, // 15
		{ w: 8814, m: 2181, t: 16980 },
		{ w: 10678, m: 2835, t: 18600 },
		{ w: 12914, m: 3685, t: 20340 },
		{ w: 15598, m: 4791, t: 22200 },
		{ w: 18818, m: 6228, t: 24180 }, // 20
		{ w: 22683, m: 8097, t: 26220 },
		{ w: 27320, m: 10526, t: 28440 },
		{ w: 32885, m: 13684, t: 30780 },
		{ w: 39562, m: 17789, t: 33240 }
	],
	"palace": [
		{ w: 712, t: 16080 }, // 1
		{ w: 5824, m: 1434, t: 22560 },
		{ w: 16048, m: 4546, s: 3089, t: 31560 },
		{ w: 36496, W: 10898, m: 10770, s: 10301, t: 44220 },
		{ w: 77392, W: 22110, m: 23218, g: 21188, s: 24725, t: 61920 }, // 5
		{ w: 159184, W: 44534, m: 48114, g: 42400, s: 53573, t: 86700 },
		{ w: 322768, W: 89382, m: 97906, g: 82842, s: 111269, t: 118800 },
		{ w: 649935, W: 179078, m: 185744, g: 169671, s: 226661, t: 169200 },
		{ w: 1304271, W: 356470, m: 396658, g: 339368, s: 457445, t: 237600 }
	],
	"palaceColony": [
		{ w: 712, t: 16080 }, // 1
		{ w: 5824, m: 1434, t: 22560 },
		{ w: 16048, m: 4546, s: 3089, t: 31560 },
		{ w: 36496, W: 10898, m: 10770, s: 10301, t: 44220 },
		{ w: 77392, W: 22110, m: 23218, g: 21188, s: 24725, t: 61920 }, // 5
		{ w: 159184, W: 44534, m: 48114, g: 42400, s: 53573, t: 86700 },
		{ w: 322768, W: 89382, m: 97906, g: 82842, s: 111269, t: 118800 },
		{ w: 649935, W: 179078, m: 185744, g: 169671, s: 226661, t: 169200 },
		{ w: 1304271, W: 356470, m: 396658, g: 339368, s: 457445, t: 237600 }
	],
	"museum": [
		{ w: 560, m: 280, t: 5760 }, // 1
		{ w: 1435, m: 1190, t: 7740 },
		{ w: 2748, m: 2573, t: 9900 },
		{ w: 4716, m: 4676, t: 12300 },
		{ w: 7669, m: 7871, t: 14940 }, // 5
		{ w: 12099, m: 12729, t: 17820 },
		{ w: 18744, m: 20112, t: 21000 },
		{ w: 28710, m: 31335, t: 24540 },
		{ w: 47733, m: 52895, t: 28380 },
		{ w: 66084, m: 74322, t: 32640 }, // 10
		{ w: 99723, m: 113735, t: 37260 },
		{ w: 150181, m: 173642, t: 42420 }
	],
	"port": [
		{ w: 60, t: 504 }, // 1
		{ w: 150, t: 1386 },
		{ w: 274, t: 1821 },
		{ w: 429, t: 2321 },
		{ w: 637, t: 2895 }, // 5
		{ w: 894, m: 176, t: 3557 },
		{ w: 1207, m: 326, t: 4260 },
		{ w: 1645, m: 540, t: 5160 },
		{ w: 2106, m: 791, t: 6180 },
		{ w: 2735, m: 1138, t: 7320 }, // 10
		{ w: 3537, m: 1598, t: 8640 },
		{ w: 4492, m: 2176, t: 10200 },
		{ w: 5689, m: 2928, t: 11940 },
		{ w: 7103, m: 3859, t: 13980 },
		{ w: 8850, m: 5051, t: 16260 }, // 15
		{ w: 11094, m: 6628, t: 18960 },
		{ w: 13731, m: 8566, t: 22020 },
		{ w: 17062, m: 11089, t: 25560 },
		{ w: 21097, m: 14265, t: 29640 },
		{ w: 25965, m: 18241, t: 34320 }, // 20
		{ w: 31810, m: 23197, t: 39720 },
		{ w: 39190, m: 29642, t: 45900 },
		{ w: 47998, m: 37636, t: 52980 },
		{ w: 58713, m: 47703, t: 61214 }
	],
	"shipyard": [
		{ w: 105, t: 2592 }, // 1
		{ w: 202, t: 3078 },
		{ w: 324, t: 3588 },
		{ w: 477, t: 4080 },
		{ w: 671, t: 4680 }, // 5
		{ w: 914, m: 778, t: 5220 },
		{ w: 1222, m: 1052, t: 5880 },
		{ w: 1609, m: 1397, t: 6540 },
		{ w: 2096, m: 1832, t: 7233 },
		{ w: 2711, m: 2381, t: 7920 }, // 10
		{ w: 3485, m: 3071, t: 8700 },
		{ w: 4460, m: 3942, t: 9480 },
		{ w: 5689, m: 5038, t: 10320 },
		{ w: 7238, m: 6420, t: 11160 },
		{ w: 9190, m: 8161, t: 12060 }, // 15
		{ w: 11648, m: 10354, t: 13020 },
		{ w: 14745, m: 13117, t: 14040 }
	],
	"barracks": [
		{ w: 49, t: 396 }, // 1
		{ w: 114, t: 1044 },
		{ w: 195, t: 1321 },
		{ w: 296, t: 1626 },
		{ w: 420, t: 1962 }, // 5
		{ w: 574, t: 2330 },
		{ w: 766, t: 2736 },
		{ w: 1003, t: 3183 },
		{ w: 1297, m: 178, t: 3660 },
		{ w: 1662, m: 431, t: 4200 }, // 10
		{ w: 2115, m: 745, t: 4800 },
		{ w: 2676, m: 1134, t: 5460 },
		{ w: 3371, m: 1616, t: 6180 },
		{ w: 4234, m: 2214, t: 6960 },
		{ w: 5304, m: 2956, t: 7800 }, // 15
		{ w: 6630, m: 3875, t: 8760 },
		{ w: 8275, m: 5015, t: 9840 },
		{ w: 10314, m: 6429, t: 10980 },
		{ w: 12843, m: 8183, t: 12240 },
		{ w: 15979, m: 10357, t: 13680 }, // 20
		{ w: 19868, m: 13052, t: 15180 },
		{ w: 24690, m: 16395, t: 16920 },
		{ w: 30669, m: 20540, t: 18780 },
		{ w: 38083, m: 25680, t: 20820 },
		{ w: 47277, m: 32054, t: 23040 }, // 25
		{ w: 58772, m: 39957, t: 25560 },
		{ w: 72932, m: 49839, t: 28260 },
		{ w: 90490, m: 61909, t: 31260 }
	],
	"wall": [
		{ w: 114, t: 1260 }, // 1
		{ w: 361, m: 203, t: 3096 },
		{ w: 657, m: 516, t: 3720 },
		{ w: 1012, m: 892, t: 4380 },
		{ w: 1439, m: 1344, t: 5160 }, // 5
		{ w: 1951, m: 1885, t: 6000 },
		{ w: 2565, m: 2535, t: 6960 },
		{ w: 3302, m: 3315, t: 7980 },
		{ w: 4186, m: 4251, t: 9060 },
		{ w: 5247, m: 5374, t: 10320 }, // 10
		{ w: 6521, m: 6721, t: 11700 },
		{ w: 8049, m: 8338, t: 13140 },
		{ w: 9882, m: 10279, t: 14820 },
		{ w: 12083, m: 12608, t: 16620 },
		{ w: 14724, m: 15402, t: 18600 }, // 15
		{ w: 17892, m: 18755, t: 20820 },
		{ w: 21695, m: 22779, t: 23220 },
		{ w: 26258, m: 27607, t: 25860 },
		{ w: 31733, m: 33402, t: 28740 },
		{ w: 38304, m: 40355, t: 31980 }, // 20
		{ w: 46189, m: 48699, t: 35460 },
		{ w: 55650, m: 58711, t: 39360 },
		{ w: 67004, m: 70726, t: 43620 },
		{ w: 80629, m: 85144, t: 48300 },
		{ w: 96978, m: 102445, t: 53460 }, // 25
		{ w: 116599, m: 123208, t: 59160 },
		{ w: 140142, m: 148121, t: 65400 },
		{ w: 168395, m: 178019, t: 72240 },
		{ w: 202298, m: 213896, t: 79800 }
	],
	"embassy": [
		{ w: 242, m: 155, t: 4320 }, // 1
		{ w: 415, m: 342, t: 5040 },
		{ w: 623, m: 571, t: 5760 },
		{ w: 873, m: 850, t: 6540 },
		{ w: 1173, m: 1190, t: 7380 }, // 5
		{ w: 1532, m: 1606, t: 8280 },
		{ w: 1964, m: 2112, t: 9180 },
		{ w: 2482, m: 2730, t: 10140 },
		{ w: 3103, m: 3484, t: 11160 },
		{ w: 3849, m: 4404, t: 12240 }, // 10
		{ w: 4743, m: 5527, t: 13320 },
		{ w: 5817, m: 6896, t: 14520 },
		{ w: 7105, m: 8566, t: 15780 },
		{ w: 8651, m: 10604, t: 17040 },
		{ w: 10507, m: 13090, t: 18420 }, // 15
		{ w: 12733, m: 16123, t: 19800 },
		{ w: 15404, m: 19824, t: 21399 },
		{ w: 18498, m: 24339, t: 22920 },
		{ w: 22457, m: 29846, t: 24540 },
		{ w: 27074, m: 36564, t: 26280 }, // 20
		{ w: 32290, m: 45216, t: 28080 },
		{ w: 39261, m: 54769, t: 30000 },
		{ w: 47240, m: 66733, t: 32040 },
		{ w: 56812, m: 81859, t: 34140 }
	],
	"branchOffice": [
		{ w: 48, t: 1440 }, // 1
		{ w: 173, t: 2520 },
		{ w: 346, t: 3660 },
		{ w: 581, t: 4980 },
		{ w: 896, m: 540, t: 6420 }, // 5
		{ w: 1314, m: 792, t: 7980 },
		{ w: 1863, m: 1123, t: 9720 },
		{ w: 2580, m: 1555, t: 11640 },
		{ w: 3509, m: 2115, t: 13740 },
		{ w: 4706, m: 2837, t: 16080 }, // 10
		{ w: 6241, m: 3762, t: 18600 },
		{ w: 8203, m: 4945, t: 21420 },
		{ w: 10699, m: 6450, t: 24480 },
		{ w: 13866, m: 8359, t: 27900 },
		{ w: 17872, m: 10774, t: 31620 }, // 15
		{ w: 22926, m: 13820, t: 35700 },
		{ w: 29285, m: 17654, t: 40260 }
	],
	"workshop": [
		{ w: 220, m: 95, t: 2520 }, // 1
		{ w: 383, m: 167, t: 3240 },
		{ w: 569, m: 251, t: 3960 },
		{ w: 781, m: 349, t: 4740 },
		{ w: 1023, m: 461, t: 5580 }, // 5
		{ w: 1299, m: 592, t: 6480 },
		{ w: 1613, m: 744, t: 7380 },
		{ w: 1972, m: 920, t: 8340 },
		{ w: 2380, m: 1125, t: 9360 },
		{ w: 2846, m: 1362, t: 10440 }, // 10
		{ w: 3377, m: 1637, t: 11520 },
		{ w: 3982, m: 1956, t: 12720 },
		{ w: 4672, m: 2326, t: 13980 },
		{ w: 5458, m: 2755, t: 15240 },
		{ w: 6355, m: 3253, t: 16620 }, // 15
		{ w: 7377, m: 3831, t: 18057 }, 
		{ w: 8542, m: 4500, t: 19500 },
		{ w: 9870, m: 5279, t: 21120 }, 
		{ w: 11385, m: 6180, t: 22740 },
		{ w: 13111, m: 7226, t: 24480 }, // 20
		{ w: 15078, m: 8439, t: 26280 },
		{ }, // 22 - unknown
		{ }, // 23 - unknown
		{ w: 22796, m: 13373, t: 0 }, // time unknown
		{ w: 26119, m: 15570, t: 34560 }, // 25
		{ w: 29909, m: 18118, t: 36840 },
		{ w: 34228, m: 21074, t: 0 }, // time unknown
		{ w: 39153, m: 24503, t: 0 }, // time unknown
		{ }, // 29 - unknown
		{ }, // 30 - unknown
		{ w: 58462, m: 38447, t: 50160 }
	],
	"safehouse": [
		{ w: 113, t: 1440 }, // 1
		{ w: 248, t: 2160 },
		{ w: 402, t: 2916 },
		{ w: 578, m: 129, t: 3660 },
		{ w: 779, m: 197, t: 4500 }, // 5
		{ w: 1007, m: 275, t: 5400 },
		{ w: 1267, m: 366, t: 6300 },
		{ w: 1564, m: 471, t: 7260 },
		{ w: 1903, m: 593, t: 8280 },
		{ w: 2288, m: 735, t: 9360 }, // 10
		{ w: 2728, m: 900, t: 10440 },
		{ w: 3230, m: 1090, t: 11640 },
		{ w: 3801, m: 1312, t: 12900 },
		{ w: 4453, m: 1569, t: 14160 },
		{ w: 5195, m: 1866, t: 15540 }, // 15
		{ w: 6042, m: 2212, t: 16920 },
		{ w: 7007, m: 2613, t: 18420 },
		{ w: 8107, m: 2924, t: 20040 },
		{ w: 9547, m: 3617, t: 21660 },
		{ w: 10793, m: 4242, t: 23400 }, // 20
		{ w: 12422, m: 4967, t: 25247 },
		{ w: 14282, m: 5810, t: 27120 },
		{ w: 16400, m: 6785, t: 29160 },
		{ w: 18815, m: 7919, t: 31260 },
		{ w: 21570, m: 9233, t: 33480 }, // 25
		{ w: 24708, m: 10757, t: 35760 }
	],
	"forester": [
		{ w: 250, t: 1080 }, // 1
		{ w: 430, m: 104, t: 1800 },
		{ w: 664, m: 237, t: 2592 },
		{ w: 968, m: 410, t: 3463 },
		{ w: 1364, m: 635, t: 4380 }, // 5
		{ w: 1878, m: 928, t: 5460 },
		{ w: 2546, m: 1309, t: 6600 },
		{ w: 3415, m: 1803, t: 7860 },
		{ w: 4544, m: 2446, t: 9300 },
		{ w: 6013, m: 3282, t: 10857 }, // 10
		{ w: 7922, m: 4368, t: 12540 },
		{ w: 10403, m: 5781, t: 14422 },
		{ w: 13629, m: 7617, t: 16440 },
		{ w: 17823, m: 10004, t: 18720 },
		{ w: 23274, m: 13108, t: 21180 }, // 15
		{ w: 30362, m: 17142, t: 23940 }
	],
	"glassblowing": [
		{ w: 274, t: 1080 }, // 1
		{ w: 467, m: 116, t: 1800 },
		{ w: 718, m: 255, t: 2592 },
		{ w: 1045, m: 436, t: 3463 },
		{ w: 1469, m: 671, t: 4380 }, // 5
		{ w: 2021, m: 977, t: 5460 },
		{ w: 2738, m: 1375, t: 6600 },
		{ w: 3671, m: 1892, t: 7860 },
		{ w: 4883, m: 2564, t: 9300 },
		{ w: 6459, m: 3437, t: 10857 }, // 10
		{ w: 8508, m: 4572, t: 12540 },
		{ w: 11172, m: 6049, t: 14422 },
		{ w: 14634, m: 7968, t: 16440 },
		{ w: 19135, m: 10462, t: 18720 },
		{ w: 24987, m: 13705, t: 21180 }, // 15
		{ w: 32594, m: 17921, t: 23940 },
		{ w: 42483, m: 23402, t: 26940 },
		{ w: 55339, m: 30527, t: 30240 },
		{ w: 72050, m: 39790, t: 33900 }
	],
	"alchemist": [
		{ w: 274, t: 1080 }, // 1 
		{ w: 467, m: 116, t: 1800 },
		{ w: 718, m: 255, t: 2592 },
		{ w: 1045, m: 436, t: 3463 },
		{ w: 1469, m: 671, t: 4380 }, // 5
		{ w: 2021, m: 977, t: 5460 },
		{ w: 2738, m: 1375, t: 6600 },
		{ w: 3671, m: 1892, t: 7860 },
		{ w: 4883, m: 2564, t: 9300 },
		{ w: 6459, m: 3437, t: 10857 }, // 10
		{ w: 8508, m: 4572, t: 12540 },
		{ w: 11172, m: 6049, t: 14422 },
		{ w: 14634, m: 7968, t: 16440 },
		{ w: 19135, m: 10462, t: 18720 },
		{ w: 24987, m: 13705, t: 21180 }, // 15
		{ w: 32594, m: 17921, t: 23940 },
		{ w: 42483, m: 23402, t: 26940 },
		{ w: 55339, m: 30527, t: 30240 },
		{ w: 72050, m: 39790, t: 33900 }
	],
	"winegrower": [
		{ w: 274, t: 1080 }, // 1
		{ w: 467, m: 116, t: 1800 },
		{ w: 718, m: 255, t: 2592 },
		{ w: 1045, m: 436, t: 3463 },
		{ w: 1469, m: 671, t: 4380 }, // 5
		{ w: 2021, m: 977, t: 5460 },
		{ w: 2738, m: 1375, t: 6600 },
		{ w: 3671, m: 1892, t: 7860 },
		{ w: 4883, m: 2564, t: 9300 },
		{ w: 6459, m: 3437, t: 10857 }, // 10
		{ w: 8508, m: 4572, t: 12540 },
		{ w: 11172, m: 6049, t: 14422 },
		{ w: 14634, m: 7968, t: 16440 },
		{ w: 19135, m: 10462, t: 18720 },
		{ w: 24987, m: 13705, t: 21180 }, // 15
		{ w: 32594, m: 17921, t: 23940 },
		{ w: 42483, m: 23402, t: 26940 },
		{ w: 55339, m: 30527, t: 30240 },
		{ w: 72050, m: 39790, t: 33900 }
	],
	"stonemason": [
		{ w: 274, t: 1080 }, // 1
		{ w: 467, m: 116, t: 1800 },
		{ w: 718, m: 255, t: 2592 },
		{ w: 1045, m: 436, t: 3463 },
		{ w: 1469, m: 671, t: 4380 }, // 5
		{ w: 2021, m: 977, t: 5460 },
		{ w: 2738, m: 1375, t: 6600 },
		{ w: 3671, m: 1892, t: 7860 },
		{ w: 4883, m: 2564, t: 9300 },
		{ w: 6459, m: 3437, t: 10857 }, // 10
		{ w: 8508, m: 4572, t: 12540 },
		{ w: 11172, m: 6049, t: 14422 },
		{ w: 14634, m: 7968, t: 16440 },
		{ w: 19135, m: 10462, t: 18720 },
		{ w: 24987, m: 13705, t: 21180 }, // 15
		{ w: 32594, m: 17921, t: 23940 },
		{ w: 42483, m: 23402, t: 26940 },
		{ w: 55339, m: 30527, t: 30240 },
		{ w: 72050, m: 39790, t: 33900 }
	],
	"carpentering": [
		{ w: 63, t: 792 }, // 1
		{ w: 122, t: 1008 },
		{ w: 192, t: 1237 },
		{ w: 274, t: 1480 },
		{ w: 372, t: 1737 }, // 5
		{ w: 486, t: 2010 },
		{ w: 620, t: 2299 },
		{ w: 777, m: 359, t: 2605 },
		{ w: 962, m: 444, t: 2930 },
		{ w: 1178, m: 546, t: 3274 }, // 10
		{ w: 1432, m: 669, t: 3639 },
		{ w: 1730, m: 816, t: 4020 },
		{ w: 2078, m: 993, t: 4380 },
		{ w: 2486, m: 1205, t: 4860 },
		{ w: 2964, m: 1459, t: 5280 }, // 15
		{ w: 3524, m: 1765, t: 5820 },
		{ w: 4178, m: 2131, t: 6300 },
		{ w: 4933, m: 2571, t: 6840 }, 
		{ w: 5841, m: 3731, t: 7440 },
		{ w: 6890, m: 3731, t: 8040 }, // 20
		{ w: 8117, m: 4490, t: 8700 },
		{ w: 9550, m: 5402, t: 9420 },
		{ w: 11229, m: 6496, t: 10140 },
		{ w: 13190, m: 7808, t: 10980 },
		{ w: 15484, m: 9383, t: 11760 }, // 25
		{ w: 18167, m: 11273, t: 12600 },
		{ w: 21299, m: 15397, t: 13560 },
		{ w: 24946, m: 16256, t: 14520 },
		{ w: 29245, m: 19531, t: 15540 },
		{ }, // 30 - unknown
		{ }, // 31 - unknown
		{ } // 32 - unknown
	],
	"optician": [
		{ w: 119, t: 828 }, // 1
		{ w: 188, m: 35, t: 1044 },
		{ w: 269, m: 96, t: 1273 },
		{ w: 362, m: 167, t: 1516 },
		{ w: 471, m: 249, t: 1773 }, // 5
		{ w: 597, m: 345, t: 2046 },
		{ w: 742, m: 455, t: 2335 },
		{ w: 912, m: 584, t: 2641 },
		{ w: 1108, m: 733, t: 2966 },
		{ w: 1335, m: 905, t: 3310 }, // 10
		{ w: 1600, m: 1106, t: 3660 },
		{ w: 1906, m: 1338, t: 4020 },
		{ w: 2261, m: 1608, t: 4440 },
		{ w: 2673, m: 1921, t: 4860 },
		{ w: 3152, m: 2283, t: 5340 }, // 15
		{ w: 3706, m: 2704, t: 5820 }
	],
	"fireworker": [
		{ w: 273, m: 135, t: 972 }, // 1
		{ w: 353, m: 212, t: 1188 },
		{ w: 445, m: 302, t: 1417 },
		{ w: 551, m: 405, t: 1660 },
		{ w: 673, m: 526, t: 1917 }, // 5
		{ w: 813, m: 665, t: 2190 },
		{ w: 974, m: 827, t: 2479 },
		{ w: 1159, m: 1015, t: 2785 },
		{ w: 1373, m: 1233, t: 3110 },
		{ w: 1618, m: 1486, t: 3454 }, // 10
		{ w: 1899, m: 1779, t: 3780 },
		{ w: 2223, m: 2120, t: 4200 },
		{ w: 2596, m: 2514, t: 4560 },
		{ w: 3025, m: 2972, t: 5040 },
		{ w: 3517, m: 3503, t: 5460 }, // 15
		{ w: 4084, m: 4119, t: 6000 }
	],
	"vineyard": [
		{ w: 339, m: 123, t: 1368 }, // 1
		{ w: 423, m: 198, t: 1584 },
		{ w: 520, m: 285, t: 1813 },
		{ w: 631, m: 387, t: 2056 },
		{ w: 758, m: 504, t: 2313 }, // 5
		{ w: 905, m: 640, t: 2586 },
		{ w: 1074, m: 798, t: 2875 },
		{ w: 1269, m: 981, t: 3181 },
		{ w: 1492, m: 1194, t: 3506 },
		{ w: 1749, m: 1440, t: 3840 }, // 10
		{ w: 2045, m: 1726, t: 4200 },
		{ w: 2384, m: 2058, t: 4560 },
		{ w: 2775, m: 2443, t: 4980 },
		{ w: 3225, m: 2889, t: 5400 },
		{ w: 3741, m: 3407, t: 5880 }, // 15
		{ w: 4336, m: 4008, t: 6360 },
		{ w: 5132, m: 4705, t: 6900 },
		{ w: 5813, m: 5513, t: 7440 },
		{ w: 6875, m: 6450, t: 8040 },
		{ w: 7941, m: 7537, t: 8640 }, // 20
		{ w: 8944, m: 8800, t: 9300 }
	],
	"architect": [
		{ w: 185, m: 106, t: 972 }, // 1
		{ w: 291, m: 160, t: 1188 },
		{ w: 413, m: 222, t: 1417 },
		{ w: 555, m: 295, t: 1660 },
		{ w: 720, m: 379, t: 1917 }, // 5
		{ w: 911, m: 475, t: 2190 },
		{ w: 1133, m: 587, t: 2479 },
		{ w: 1390, m: 716, t: 2785 },
		{ w: 1689, m: 865, t: 3110 },
		{ w: 2035, m: 1036, t: 3454 }, // 10
		{ w: 2437, m: 1233, t: 3780 },
		{ w: 2902, m: 1460, t: 4200 },
		{ w: 3443, m: 1722, t: 4560 },
		{ w: 4070, m: 2023, t: 5040 },
		{ w: 4797, m: 2369, t: 5460 }, // 15
		{ w: 5640, m: 2767, t: 6000 },
		{ w: 6618, m: 3226, t: 6300 },
		{ w: 7754, m: 3752, t: 7030 },
		{ w: 9070, m: 4358, t: 7620 },
		{ w: 10598, m: 5056, t: 8220 }, // 20
		{ w: 12369, m: 5857, t: 8880 },
		{ w: 14424, m: 6777, t: 9600 },
		{ w: 16807, m: 7836, t: 10320 },
		{ w: 19573, m: 9052, t: 11100 }
	]
};



getElementsByClass = function(inElement, className, findIn) 
{
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) 
  {
    if (findIn == true) 
    {
        if (all[e].className.indexOf(className) > 0) 
        {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) 
        {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};



function insertAfter(newElement, targetElement) 
{
    var parent = targetElement.parentNode;

    if(parent.lastchild == targetElement) 
    {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}



function defineLanguage(langTDL) {
    switch (langTDL) {
        case "fr":
            thisLanguage = {
            fetch:"cargando...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Points",
            military:"Troupes"};
            break;
        case "gr":
            thisLanguage = {
            fetch:"ανάκτηση...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Βαθμολογία",
            military:"Στρατεύματα"};
            break;
        case "de":
            thisLanguage = {
            fetch:"Laden...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Gesamtpunkte",
            military:"Generäle"}
            break;
        case "tr":
            thisLanguage = {
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Toplam Puan",
            military:"Askeri Puan"};
            break;
        case "cz":
            thisLanguage = {
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score: "Celkové skóre",
            military: "Vojenské skóre"};
            break;
        case "sk":
            thisLanguage = {
            fetch:"nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Celkové Skóre",
            military:"Vojenské skóre"};
            break;
        case "tw":
            thisLanguage = {
            fetch:"讀取中...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"總積分",
            military:"戰爭將軍"};
            break;
        case "hu":
            thisLanguage = {
            fetch:"Töltés...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Összpontszám",
            military:"Katonai pont"};
            break;
        case "se":
            thisLanguage = {
            fetch:"hämtar...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Totalpoäng",
            military:"Generalspoäng"}
            break;
        case "pl":
            thisLanguage = {
            fetch:"Ładowanie...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Całkowity Wynik",
            military:"Generałowie"};
            break;
        case "ro":
            thisLanguage = {
            fetch:"Incarc...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            score:"Scor Total",
            military:"Scor Armata"};
            break;
        case "il":
            thisLanguage = {
            fetch:"טוען...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"ניקוד",
            military:"כח צבאי"};
            break;
        case "vn":
            thisLanguage = { 
            fetch:"Đang tải...",
            unknown:"Không biết",
            allyscore:"Liên minh",
            score:"Tổng điểm",
            military:"Quân sự" }
            break;
        case "ikariam":
            switch (subDomain) 
            {
                case "fi":
                    thisLanguage = {
                    fetch:"haetaan...",
                    unknown:"Unknown",
                    allyscore:"Ally Score",
                    score:"Kokonaispisteet",
                    military:"Sotilaspisteet"};
                    break;
                case  "ae":
                    thisLanguage = {
                    fetch:"يجلب...",
                    unknown:"Unknown",
                    allyscore:"نقاط التحالف",
                    score:"المجموع الكلي",
                    military:"النقاط العسكريه"};
                    break;
                case  "ba":
                    thisLanguage = {
                    fetch:"dohvati...",
                    unknown:"nemoguce",
                    allyscore:"Bodovi Saveza",
                    score:"Ukupni Rezultat",
                    military:"Vojska" };
                    break;
                case  "ar":
                    thisLanguage = {
                    fetch:"Cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntaje de Alianza",
                    score:"Puntaje Total",
                    military:"Puntaje Militar" };
                    break;
            }
            break;
        default:
            thisLanguage = {
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Total Score",
            military:"Military Score",
            townscore:"Town score",
            buildtime:"Build time" };
            break;
    }
    return thisLanguage;
}



// add thousands separator to this number
function stringThousands(nStr)
{
  nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}



// create the info box
function addTownWorthBox(townScore, buildTime, accurate) 
{
    scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "townworth");
    
      var scoreDiv = <>
          <li style="margin: 2px 10px;font-size:11px" id="town_score" class="ally">
              <span style="float:left;" class="textLabel">{lang['townscore']}:</span>
              <div id="townscore">{stringThousands(Math.round(townScore))} <a title="Total resources used / 100">(?)</a></div>
          </li>
          <li style="margin: 2px 10px;font-size:11px" id="build_time" class="ally">
              <span style="float:left;" class="textLabel">{lang['buildtime']}:</span>
              <div id="buildtime">{Math.round(buildTime/8640)/10} days <a title="Total time to create all buildings">(?)</a></div>
          </li>
      </>;
      
    if (!accurate)
    {
      scoreDiv += <>
          <li style="margin: 2px 10px;font-size:11px" id="accuracy_info" class="ally">
              <span style="float:left;" class="textLabel">Note:</span>
              <div id="accuracy_value">approximate values</div>
          </li>
      </>
    }
    
    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) 
    { 
        informationContainer = document.getElementById('information'); 
    }
    
    var allyClass = getElementsByClass(informationContainer, "ally") 
    
    insertAfter(scoreElement, allyClass[0]);
}



// adds town worth information to the information box on the left side
function addTownWorthInformation()
{
  var buildTime = 0;
  var missingInfo = false;
  
  var usedWood = 0;
  var usedWine = 0;
  var usedMarble = 0;
  var usedCrystal = 0;
  var usedSulphur = 0;
  var location;

  var i;

  // find total resource and time cost for each building
  for (location = 0; location < 15; location++)
  {
    // look for location object

    var locationObject = document.getElementById("position" + location);
    
    // if object doesn't exist, we're done here
    if (!locationObject)
    {
      continue;
    }
    
    // find class name
		var buildingClass = locationObject.className.split(" ")[0].trim();
		
		// if this is an empty space, no need to search for a cost
		if (buildingClass == "buildingGround")
		{
		  continue;
		}

		// get the building name and level (i.e. "Barracks", 17)
		var buildingName = language[buildingClass];
		var buildingLevel = parseInt(locationObject.getElementsByTagName("a")[0].title.split(" ")[locationObject.getElementsByTagName("a")[0].title.split(" ").length - 1].trim());

    // add up resources used to get to this level
    i = 0;
    if (buildingClass == "townHall")
    {
      i++;
    }
    for (; i < buildingLevel; i++)
    {
      // if this information is missing, no need to add it
      if (!data[buildingClass][i])
      {
        GM_log(buildingClass + i);
        missingInfo = true;
        continue;
      }
    
      // if info exists, but time is not reported, then info is missing
      if (!data[buildingClass][i].t)
      {
        GM_log(buildingClass + i);
        missingInfo = true;
        continue;
      }
      
      // add up values
      if (data[buildingClass][i].t)
      {
        buildTime += data[buildingClass][i].t;
      }
      if (data[buildingClass][i].w)
      {
        usedWood += data[buildingClass][i].w;
      }
      if (data[buildingClass][i].W)
      {
        usedWine += data[buildingClass][i].W;
      }
      if (data[buildingClass][i].m)
      {
        usedMarble += data[buildingClass][i].m;
      }
      if (data[buildingClass][i].g)
      {
        usedCrystal += data[buildingClass][i].g;
      }
      if (data[buildingClass][i].s)
      {
        usedSulphur += data[buildingClass][i].s;
      }
    }

  }
  
  townScore = (usedWood + usedWine + usedMarble + usedCrystal + usedSulphur) * 0.01;

  // create the town worth div box
  addTownWorthBox(townScore, buildTime, !missingInfo);

}



// returns true iff we're on the city view
function isCityView()
{
  return (document.getElementsByTagName("body")[0].id == "city");
}



// script calls and executes this routine
function init() 
{

  // if we're on a city view page, execute the script
  if (isCityView)
  {
  
    activeLanguage = GM_getValue(server+"_tE_Language", "en");
    language = languages[activeLanguage];


    lang = defineLanguage(domain);
  
    gameServer = top.location.host;
    gameServerParts = gameServer.split(".");
    subDomain = gameServerParts[1];
    domain = gameServerParts[2];
  
  
    addTownWorthInformation();

  }
  
}


var server = (function() { var host = document.location.hostname.split("."); if (host.length == 3 && host[1].toLowerCase() == "ikariam" && host[0].toLowerCase() != "board") { return host[0].trim(); } else { if (host.length == 4 && host[2].toLowerCase() == "ikariam") { return host[0].trim(); } else { return false; } } })();
var activeLanguage;
var language;

// call the init procedure
init();
