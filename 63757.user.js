// ==UserScript==
// @name           AntiGam_lang_SK
// @namespace      admiral..mirek
// @description    AntiGame preklad - Slovenský
// @version	1.15.4
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsSK =
	{
		lbl_missAttack: 'Zaútočiť',
		lbl_missColony: 'Kolonizácia',
		lbl_missDeploy: 'Rozmiestnenie',
		lbl_missDestroy: 'Zničenie mesiaca',
		lbl_missEspionage: 'Špionáž',
		lbl_missExpedition: 'Expedícia',
		lbl_missFederation: 'Aliančný útok',
		lbl_missHarvest: 'Vyťažiť troskové pole',
		lbl_missHold: 'Aliančná obrana',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Malý transportér',
		lbl_shipLCargo: 'Veľký transportér',
		lbl_shipLFighter: 'Ľahký stíhač',
		lbl_shipHFighter: 'Ťažký stíhač',
		lbl_shipCruiser: 'Krížnik',
		lbl_shipBattleship: 'Bojová loď',
		lbl_shipColonizator: 'Kolonizačná loď',
		lbl_shipRecycler: 'Recyklátor',
		lbl_shipSpy: 'Šionážna sonda',
		lbl_shipBomber: 'Bombardér',
		lbl_shipDestroyer: 'Devastátor',
		lbl_shipRIP: 'Hviezda smrti',
		lbl_shipBCruiser: 'Bojový krížnik',
		lbl_shipSatellite: 'Solárny satelit',
		
		lbl_RequiredEnergy: 'Spotreba energie'
		
	}
	
	AntiGame_lang.InterfaceSK =
	{
		opt_languageName: 'Slovenský',
	
		opt_title: 'AntiGame Nastavenia',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Späť',
		opt_btnDefault: 'Pôvodné',

		opt_language: 'Jazyk',
		opt_autocopyCoords: 'Automaticky kopírovať súradnice',
		opt_showLocalTime: "Ukazuj miestny čas namiesto času servera",
		opt_showServerOgameClock: 'Ukazuj čas servera vpravo hore',
		opt_blockAutoComplete: 'Zablokuj funkciu Auto-Complete vo Firefoxe',
		
		opt_showDeficient: 'Zobrazuj chýbajúce suroviny',
		opt_showResources: 'Zobrazuj rozšírené info o zdrojoch a skladoch',
		opt_showNames: 'Zobrazuj názvy lodí/budov/výskumu na obrázkoch',
		opt_nameColorOn: 'Farba názvu budov, ktoré možno postaviť',
		opt_nameColorOff: 'Farba názvu budov, ktoré nemožno postaviť',
		opt_nameColorDisabled: 'Farba názvu budov, na ktoré chýbajú zdroje',
		opt_showConstructionTitle: 'Zobrazuj názvy výstavby v zozname planét',

		opt_uni_SpeedFactor: 'Rýchlostný faktor tohto vesmíru (nemeniť)',
		
		opt_killTips: 'Zruš bublinové popisky',

		opt_showEventList: 'Zobrazuj rozbalený Pohyb flotíl v Prehľade',
		opt_evt_showOnTop: 'Umiestnenie zoznamu Pohyb flotíl',
		opt_evt_noScroll: 'Zrušiť scrollbary pri vyskakovaní bublinových popiskov',
		
		opt_galaxyShowRank: 'Zobraz pozíciu hráča/aliancie v Galaxiách',
		opt_galaxyRankColor: 'Hráčova/aliančná farba podľa rebríčku',
		opt_galaxyDebrisMin: 'Minimálna veľkosť trosiek na označenie (0 = off)',
		opt_galaxyDebrisColor: 'Farba označenia trosiek',
		opt_galaxyHideMoon: 'Skry obrázok mesiaca (zobrazí veľkosť mesiaca)',
		opt_galaxy_Players: 'Označ farebne týchto hráčov',
		opt_galaxy_PlayerColors: 'Farba označených hráčov',
		opt_galaxy_Allys: 'Označ farebne tieto aliancie',
		opt_galaxy_AllyColors: 'Farba označených aliancií',
		opt_galaxy_keepTipsPlanets: 'Ponechaj bublinové popisky pre planéty a mesiace',
		opt_galaxy_keepTipsDebris: 'Ponechaj bublinové popisky pre trosky',
		
		opt_msg_PlunderThreshold: 'Najnižší limit pre teoretickú korisť (x1000)',
		opt_msg_DebrisThreshold: 'Najnižší limit pre teoretické trosky (x1000)',
		opt_msg_foldSmallPlunder: 'Skry doplnkový report pre korist a trosky pod limit',
		opt_msg_showPlunder: 'Zobrazuj doplnkový report v špionážnych správach',
		opt_msg_addButtons: 'Doplnkové tlačidlá pri správach',
		opt_msg_fixColors: 'Uprav farby správ z boja',
		
		opt_fleet_showCapacity: 'Zobrazuj kapacitu a rýchlosť lodí',
		opt_fleet2_setTargetDF: 'Ak letka obsahuje recyklátory, nastav cieľ na trosky',
		opt_fleet2_fixLayout: 'Uprav rozloženie inrormácii letu (strana 2)',
		opt_fleet2_ShortLinks: 'Zoznam rýchlych cieľov (strana 2)',
		opt_fleet2_checkProbeCapacity: 'Over kapacitu sond pred odletom (strana 2)',
		
		opt_missionPriority: 'Automatický výber misie v poradí',
		
		opt_mvmt_expandFleets: 'Zobraz lode a náklad namiesto ikony flotily',
		opt_mvmt_showReversal: 'Zobraz čas pre odvolanie letu',
		
		opt_missAttack: 'Farba misie: Útok',
		opt_missColony: 'Farba misie: Kolonizácia',
		opt_missDeploy: 'Farba misie: Rozmiestnenie',
		opt_missDestroy: 'Farba misie: Zničenie mesiaca',
		opt_missEspionage: 'Farba misie: Špionáž',
		opt_missExpedition: 'Farba misie: Expedícia',
		opt_missFederation: 'Farba misie: Aliančný útok',
		opt_missHarvest: 'Farba misie: Ťažba trosiek',
		opt_missHold: 'Farba misie: Aliančná obrana',
		opt_missTransport: 'Farba misie: Transport',
		opt_msg_addSimButton: 'Pridaj tlačítko na načítanie reportu vo WebSime',
		
		// these label are shown in Options
		lbl_missAttack: 'Útok',
		lbl_missColony: 'Kolonizácia',
		lbl_missDeploy: 'Rozmiestnenie',
		lbl_missDestroy: 'Zničenie mesiaca',
		lbl_missEspionage: 'Špionáž',
		lbl_missExpedition: 'Expedícia',
		lbl_missFederation: 'Aliančný útok',
		lbl_missHarvest: 'Ťažba trosiek',
		lbl_missHold: 'Aliančná obrana',
		lbl_missTransport: 'Transport',
		//
		
		lbl_sectionGeneral: 'Všeobecné',
		lbl_sectionEventList: 'Pohyb flotíl',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Správy',
		lbl_sectionFleetDispatch: 'Flotily',
		lbl_sectionFleetMovement: 'Pohyb flotily',
		
		lbl_optionsNote1: 'Nastavenie platí iba pre tento vesmír',
		
		lbl_resetCoords: 'Reset predvolených súradníc - ',
		
		lbl_TotalCapacity: 'Celková kapacita',
		lbl_MinSpeed: 'Minimálna rýchlosť',
		lbl_mvmt_Return: 'N',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Zdroje',
		lbl_debris: 'Trosky',
		lbl_total: 'Celkove',
		lbl_loot: 'Korisť',
		lbl_metal: 'Kovy',
		lbl_crystal: 'Kryštály',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'VT',
		lbl_shipRecyclerAlt: 'Recy',
		
		lbl_deficientRes: 'Chýbajúce zdroje',
		lbl_Production: 'Produkcia',
		lbl_ArrivalACS: 'Prílet (ACS)',
		
		lbl_btnMarkReadAll: 'Označ všetky správy ako prečítané',
		lbl_btnDeleteSmallPlunder: 'Vymaž reporty s korisťou < $plunder and troskami < $debris',
		
		lbl_Moon: 'Mesiac',
		
		lbl_onTop: 'Hore',
		lbl_onBottom: 'Dole',
		lbl_onLeft: 'Vľavo'
	}
	
	// -------------------------------
	// Don't modify the code below

	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (!mywindow.AntiGame_lang)
		mywindow.AntiGame_lang = AntiGame_lang;
	else
		for (var i in AntiGame_lang)
			mywindow.AntiGame_lang[i] = AntiGame_lang[i];

}) ()