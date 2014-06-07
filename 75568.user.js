// ==UserScript==
// @name           AntiGam_lang_si
// @namespace      antikiller
// @description    AntiGame prevod - Slovenščina (potrebno ga je zagnati pred glavno skripto)
// @version	1.29.8
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsSI =
	{
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Premik',
		lbl_missDestroy: 'Uničenje lune',
		lbl_missEspionage: 'Vohuni',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'ACS napad',
		lbl_missHarvest: 'Recikliraj',
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
		
		lbl_defRLauncher: 'Raketnik',
		lbl_defLLaser: 'Lahki laser',
		lbl_defHLaser: 'Težek Laser',
		lbl_defGauss: 'Gaussov top',
		lbl_defIon: 'Ionski top',
		lbl_defPlasma: 'Plazemski top',
		lbl_defSShield: 'Majhen ščit',
		lbl_defLShield: 'Velik ščit',
		
		lbl_RequiredEnergy: 'Potrebna energija',
		
		rx_sendMail: /Pošlji sporočilo (.+)\./
		
	}
	
	AntiGame_lang.InterfaceSI =
	{
		opt_languageName: 'Slovenščina',
	
		opt_title: 'AntiGame Možnosti',
		opt_btnOk: 'V redu',
		opt_btnCancel: 'Prekliči',
		opt_btnDefault: 'Privzeto',

		opt_language: 'Jezik',
		opt_update_check: 'Samodejno preveri za posodobitve',
		opt_thousandSeparator: 'Ločilo tisočic',
		opt_blockAutoComplete: 'Prepreči samodejno dokončanje v Firefox-u',
		
		opt_showDeficient: 'Pokaži manjkajoče surovine',
		opt_showResources: 'Pokaži razširjene informacije o surovinah',
		opt_showNames: 'Pokaži imena ladij/zgradb/raziskav na slikah',
		opt_nameColorOn: 'Barva imena: na voljo',
		opt_nameColorOff: 'Barva imena: ni na voljo',
		opt_nameColorDisabled: 'Barva imena: premalo surovin',
		opt_showConstructionTitle: 'Pokaži kaj se gradi na seznamu planetov',
		opt_shortHeader: 'Vedno pomanjšaj sliko planeta',
		opt_misc_scrollTitle: 'Zavrti čas do naslednjega dogodka v naslovu okna',

		opt_uni_SpeedFactor: 'Hitrost tega vesolja',
		opt_uni_DFPercent: 'Odstotek flote v ruševine',
		opt_uni_DefenseToDF: 'Odstotek obrambe v ruševine',
		
		opt_timeSetting: 'Spremeni časovne vrednosti (samo ure)',
		opt_showServerOgameClock: 'Ohrani strežniški čas za OGame uro desno zgoraj',
		opt_showServerPhalanx: 'Ohrani strežniški čas v pogledu Senzorske falange',
		opt_showPageStartTime: 'Pokaži čas zadnje osvežitve strani',
		opt_timeAMPM: 'Uporabi 12-urni format (AM/PM) namesto 24-urnega',
		
		opt_timeDontChange: 'Ne spremeni časa',
		opt_timeLocal: 'Vedno nastavi na lokalni čas',
		opt_timeServer: 'Vedno nastavi na strežniški čas',

		opt_killTips: 'Prepreči oblačke',

		opt_evt_dimReverse: 'Zatemni vračajoče se flote',
		opt_phalanx_showDebris: 'Pokaži teoretične ruševine v pogledu Senzorske falange',
		opt_evt_expandFleetsEvt: 'Pokaži sestavo in tovor flote (Seznam dogodkov)',
		opt_evt_expandFleetsPhal: 'Pokaži sestavo in tovor flote (Senzorska falanga)',
		
		opt_galaxyShowRank: 'Pokaži ranke igralcev/alians v pogedu Galaksije',
		opt_galaxyRankColor: 'Barva rankov igralcev/alians',
		opt_galaxyDebrisMin: 'Najmanjše označene ruševine (0 da izklopite)',
		opt_galaxyDebrisColor: 'Barva označenih ruševin',
		opt_galaxyHideMoon: 'Skrij sliko lune (namesto nje prikaži velikost lune)',
		opt_galaxy_Players: 'Označi naslednje igralce',
		opt_galaxy_PlayerColors: 'Barva označenih igralcev',
		opt_galaxy_Allys: 'Označi naslednje alianse',
		opt_galaxy_AllyColors: 'Barva označenih alians',
		opt_galaxy_keepTipsPlanets: 'Obdrži oblačke za planete in lune',
		opt_galaxy_keepTipsDebris: 'Obdrži oblačke za ruševine',
		
		opt_msg_PlunderThreshold: 'Spodnja meja za teoretični plen (x1000)',
		opt_msg_DebrisThreshold: 'Spodnja meja za teoretične ruševine (x1000)',
		opt_msg_foldSmallPlunder: 'Skrči poročila s plenom in ruševinami pod spodnjo mejo',
		opt_msg_showPlunder: 'Pokaži plen na vohunskih poročilih',
		opt_msg_addButtons: 'Dodatni gumbi v pogledu Sporočil',
		opt_msg_fixColors: 'Popravi barve bojnih poročil',
		
		opt_fleet_showCapacity: 'Pokaži hitrost in kapaciteto ladij',
		opt_fleet1_showResCalc: 'Pokaži kalkulator surovin',
		opt_uni_maxPlayerScore: 'Najmočnejši igralec ima več kot 5 mio. točk',
		opt_autocopyCoords: 'Samodejno kopiraj koordinate',
		opt_autocopyGlobal: 'Zapomni si koordinate s katere koli strani (ne le z zavihka trenutnega vesolja)',
		opt_fleet2_setTargetDF: 'Nastavi tarčo na ruševine, če so v floti reciklerji',
		opt_fleet2_fixLayout: 'Popravi postavitev na informacijah o poletu (stran 2)',
		opt_fleet2_ShortLinks: 'Bližnjice do tarč (stran 2)',
		opt_fleet2_MoonColor: 'Barva lun v bližnjicah',
		opt_fleet2_MoonsToEnd: 'Premakni lune na konec seznama bližnjic',
		opt_fleet2_expandLists: 'Razširi spustljive okvirje (Hitrost, Bližnjice, ACS)',
		opt_fleet2_checkProbeCapacity: 'Preveri kapaciteto sond pred vzletom (stran 2)',
		
		opt_missionPriority: 'Pomembnost misij',
		
		opt_mvmt_expandFleets: 'Pokaži ladje in tovor v flotah',
		opt_mvmt_showReversal: 'Pokaži vzratni čas v flotah',
		
		opt_missAttack: 'Barva misije: Napad',
		opt_missColony: 'Barva misije: Kolonizacija',
		opt_missDeploy: 'Barva misije: Premik',
		opt_missDestroy: 'Barva misije: Uničenje lune',
		opt_missEspionage: 'Barva misije: Vohunjenje',
		opt_missExpedition: 'Barva misije: Ekspedicija',
		opt_missFederation: 'Barva misije: ACS napad',
		opt_missHarvest: 'Barva misije: Reciklaža',
		opt_missHold: 'Barva misije: ACS obramba',
		opt_missTransport: 'Barva misije: Transport surovin',
		opt_msg_addSimButton: 'Dodaj gumbe za objavo vohunskih poročil na WebSim',
		
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Premik',
		lbl_missDestroy: 'Uničenje lune',
		lbl_missEspionage: 'Vohunjenje',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'ACS napad',
		lbl_missHarvest: 'Reciklaža',
		lbl_missHold: 'ACS obramba',
		lbl_missTransport: 'Transport surovin',

		lbl_sectionGeneral: 'Splošno',
		lbl_sectionUniverse: 'Vesolje',
		lbl_sectionTime: 'Časovne nastavitve',
		lbl_sectionEventList: 'Seznam dogodkov in Senzorska falanga',
		lbl_sectionGalaxy: 'Galaksija',
		lbl_sectionMessages: 'Sporočila',
		lbl_sectionFleetDispatch: 'Vzlet flot',
		lbl_sectionFleetMovement: 'Premiki flot',
		
		lbl_optionsNote1: 'Ta možnost je shranjena samo za trenutno vesolje',
		
		lbl_resetCoords: 'Ponastavi - ',
		
		lbl_TotalCapacity: 'Skupna kapaciteta',
		lbl_MinSpeed: 'Najmanjša hitrost',
		lbl_ExPoints: 'Točke ekspedicije',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Surovine',
		lbl_debris: 'Ruševine',
		lbl_total: 'Skupaj',
		lbl_loot: 'Plen',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'Majhna tovorna ladja',
		lbl_shipLCargoAlt: 'Velika tovorna ladja',
		lbl_shipRecyclerAlt: 'Reciklerji',
		lbl_shipSatelliteAlt: 'Sončni sateliti',
		
		lbl_deficientRes: 'Manjkajoče surovine',
		lbl_Production: 'Proizvodnja',
		lbl_ArrivalACS: 'Prihod (ACS)',
		
		lbl_btnMarkReadAll: 'Označi vsa prikazana sporočila kot prebrana',
		lbl_btnDeleteSmallPlunder: 'Izbriši vohunska poročila s plenom < $plunder in ruševinami < $debris',
		
		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Na vrhu',
		lbl_onBottom: 'Na dnu',
		lbl_onLeft: 'Na levi',
		
		lbl_installNewVersion: 'Kliknite, da namestite novejšo različico',
		lbl_Save: 'Shrani',
		lbl_Clear: 'Počisti',
		lbl_Quantity: 'Količina',
		lbl_Duration: 'Trajanje',
		lbl_Consumption: 'Poraba',
		
		lbl_tmTime: 'Čas',
		lbl_tmCountdown: 'Odštevanje'
			
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