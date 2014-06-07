// ==UserScript==
// @name           AntiGam_lang_SI
// @namespace      antikiller
// @description    AntiGame prevod - Slovenski (treba ga je zagnati pred glavno AntiGame skripto)
// @version	   1.13.3
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

// Avtor prevoda: Zmade
// Vse pravice pridržane. (C)
// Changelog (zadnje spremembe):

// Datum: 9.11.2009
// Za AntiGame različico 1.13.3
// Jezik: Slovenski


(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsSI =
	{
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Premik',
		lbl_missDestroy: 'Unicenje lune',
		lbl_missEspionage: 'Vohuni',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'ACS napad',
		lbl_missHarvest: 'Recikliraj ruševine',
		lbl_missHold: 'ACS obramba',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Majhna tovorna ladja',
		lbl_shipLCargo: 'Velika tovorna ladja',
		lbl_shipLFighter: 'Lahek lovec',
		lbl_shipHFighter: 'Težki lovec',
		lbl_shipCruiser: 'Križarka',
		lbl_shipBattleship: 'Bojna ladja',
		lbl_shipColonizator: 'Kolonizacijska ladja',
		lbl_shipRecycler: 'Recikler',
		lbl_shipSpy: 'Vohunska sonda',
		lbl_shipBomber: 'Bombnik',
		lbl_shipDestroyer: 'Uničevalec',
		lbl_shipRIP: 'Zvezda smrti',
		lbl_shipBCruiser: 'Bojna križarka',
		lbl_shipSatellite: 'Sončni satelit',
		
		lbl_RequiredEnergy: 'Potrebno energije'
		
	}
	
	AntiGame_lang.InterfaceSI =
	{
		opt_languageName: 'Slovenski',
	
		opt_title: 'AntiGame možnosti',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Prekliči',
		opt_btnDefault: 'Privzeto',

		opt_language: 'Jezik',
		opt_autocopyCoords: 'Avtomatsko kopiraj koordinate',
		opt_showLocalTime: "Pokaži lokalni čas namesto časa strežnika (samo ure)",
		opt_showServerOgameClock: 'Obdrži čas strežnika za uro v zgornjem desnem kotu',
		opt_blockAutoComplete: 'Blokiraj avtomatsko dokončanje v Firefoxu',

		opt_showEventList: 'Prikaži premike flot razširjene na Pregledu',
		opt_evt_showOnTop: 'Položaj premikov flot na strani Pregled',
		opt_evt_noScroll: 'Ne prikazuj drsnikov pri prikazu namigov',
		
		opt_galaxyShowRank: 'Prikaži mesto (toplista) igralca/alianse v Galaksiji',
		opt_galaxyRankColor: 'Barva mesta igralca/alianse',
		opt_galaxyDebrisMin: 'Minimalna velikost ruševin, ki so označene (vnesi 0 za izklop)',
		opt_galaxyDebrisColor: 'Določi barvo za označitev ruševin',
		opt_galaxyHideMoon: 'Skrij sliko Lune (namesto slike prikaži velikost lune)',
		opt_galaxy_Players: 'Označi naslednje igralce',
		opt_galaxy_PlayerColors: 'Določi barve za označitev igralcev',
		opt_galaxy_Allys: 'Označi naslednje alianse',
		opt_galaxy_AllyColors: 'Določi barve za označitev alians',
		opt_galaxy_killTips: 'Skrij vse namige (bljižnice) v Galaksiji',
		opt_galaxy_keepTipsPlanets: 'Obdrži namige (bljižnice) za planete in lune',
		opt_galaxy_keepTipsDebris: 'Obdrži namige (bljižnice) za ruševine',
		
		opt_msg_PlunderThreshold: 'Spodnji limit za teoretični plen (x1000)',
		opt_msg_DebrisThreshold: 'Spodnji limit za teoretične ruševine (x1000)',
		opt_msg_foldSmallPlunder: 'Preskoči poročila z plenom in ruševinami manjšimi od limita',
		opt_msg_showPlunder: 'Prikaži plen v vohunskih poročilih',
		opt_msg_addButtons: 'Dodatni gumbi pri Sporočilih',
		opt_msg_fixColors: 'Popravi barve poročil bitk',
		
		opt_showDeficient: 'Prikaži manjkajoče surovine',
		opt_showResources: 'Prikaži dodatne informacije o surovinah',
		
		opt_fleet_showCapacity: 'Prikaži kapaciteto ladij in hitrost',
		opt_fleet2_setTargetDF: 'Nastavi destinacijo na ruševine, če flota vsebuje reciklerje',
		opt_fleet2_fixLayout: 'Popravi okno misije',
		opt_fleet2_ShortLinks: 'Bljižnice do tarče',
		
		opt_missionPriority: 'Prioriteta misij',
		
		opt_mvmt_expandFleets: 'Prikaži ladje in tovor flote',
		opt_mvmt_showReversal: 'Prikaži čase vrnitve za flote',
		
		opt_missAttack: 'Barva misije: Napad',
		opt_missColony: 'Barva misije: Kolonizacija',
		opt_missDeploy: 'Barva misije: Premik',
		opt_missDestroy: 'Barva misije: Uničenje lune',
		opt_missEspionage: 'Barva misije: Vohuni',
		opt_missExpedition: 'Barva misije: Ekspedicija',
		opt_missFederation: 'Barva misije: ACS napad',
		opt_missHarvest: 'Barva misije: Recikliraj',
		opt_missHold: 'Barva misije: ACS obramba',
		opt_missTransport: 'Barva misije: Transport',
		
		// these label are shown in Options
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Premik',
		lbl_missDestroy: 'Uničenje lune',
		lbl_missEspionage: 'Vohuni',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'ACS napad',
		lbl_missHarvest: 'Recikliraj ruševine',
		lbl_missHold: 'ACS obramba',
		lbl_missTransport: 'Transport',
		//
		
		lbl_sectionGeneral: 'Splošno',
		lbl_sectionEventList: 'Premiki flot',
		lbl_sectionGalaxy: 'Galaksija',
		lbl_sectionMessages: 'Sporočila',
		lbl_sectionFleetDispatch: 'Pošiljanje flot',
		lbl_sectionFleetMovement: 'Premiki flot',
		
		lbl_optionsNote1: 'Možnost je shranjena samo za to vesolje',
		
		lbl_TotalCapacity: 'Skupna kapaciteta',
		lbl_MinSpeed: 'Minimalna hitrost',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Surovine',
		lbl_debris: 'Ruševine',
		lbl_total: 'Skupno',
		lbl_loot: 'Plen',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'VT',
		lbl_shipRecyclerAlt: 'Rec',
		
		lbl_deficientRes: 'Manjkajoče surovine',
		lbl_Production: 'Proizvodnja',
		lbl_ArrivalACS: 'Prihod (ACS)',
		
		lbl_btnMarkReadAll: 'Označi vsa prikazana sporočila kot prebrana',
		lbl_btnDeleteSmallPlunder: 'Izbriši vohunska poročila s plenom < $plunder in ruševinami < $debris',
		
		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Na vrhu',
		lbl_onBottom: 'Na dnu'
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