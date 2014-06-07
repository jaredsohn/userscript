// ==UserScript==
// @name           AntiGam_lang_lt
// @namespace      antikiller
// @description    AntiGame lietuviškas vertimas (turi būti paleistas prieš AntiGame)
// @version	1.23.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsLT =
	{
		lbl_missAttack: 'Pulti',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Dislokacija',
		lbl_missDestroy: 'Palydovo Sunaikinimas',
		lbl_missEspionage: 'Šnipinėjimas',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'AKS puolimas',
		lbl_missHarvest: 'Perdirbti nuolaužų lauką',
		lbl_missHold: 'AKS gynyba',
		lbl_missTransport: 'Transportavimas',
		
		lbl_shipSCargo: 'Mažas Krovininis Laivas',
		lbl_shipLCargo: 'Didelis Krovininis Laivas',
		lbl_shipLFighter: 'Lengvas Kovinis Laivas',
		lbl_shipHFighter: 'Sunkus Kovinis Laivas',
		lbl_shipCruiser: 'Kreiseris',
		lbl_shipBattleship: 'Šarvuotis',
		lbl_shipColonizator: 'Kolonijinis laivas',
		lbl_shipRecycler: 'Perdirbėjas',
		lbl_shipSpy: 'Šnipinėjimo Zondas',
		lbl_shipBomber: 'Bombonešis',
		lbl_shipDestroyer: 'Naikintojas',
		lbl_shipRIP: 'Mirties Žvaigždė',
		lbl_shipBCruiser: 'Linijinis Kreiseris',
		lbl_shipSatellite: 'Saulės Satelitas',
		
		lbl_defRLauncher: 'Raketsvaidis',
		lbl_defLLaser: 'Lengvas Lazeris',
		lbl_defHLaser: 'Sunkus Lazeris',
		lbl_defGauss: 'Gauso Pabūklas',
		lbl_defIon: 'Jonų Pabūklas',
		lbl_defPlasma: 'Plazmos pabūklas',
		lbl_defSShield: 'Mažas Skydo Kupolas',
		lbl_defLShield: 'Didelis Skydo Kupolas',
		
		lbl_RequiredEnergy: 'Reikalinga energija',
		
		rx_sendMail: /Siųsti žinutę (.+)\./
		
	}
	
	AntiGame_lang.InterfaceLT =
	{
		opt_languageName: 'Lietuviškai',
	
		opt_title: 'AntiGame nustatymai',
		opt_btnOk: 'Gerai',
		opt_btnCancel: 'Atšaukti',
		opt_btnDefault: 'Pagal nutylėjimą',

		opt_language: 'Kalba',
		opt_update_check: 'Automatiškai patikrinti atnaujinimus',
		opt_thousandSeparator: 'Tūkstančio skirtukas skaičiuose',
		opt_blockAutoComplete: 'Išjungti Firefox automatinį užpildymą',
		
		opt_showDeficient: 'Rodyti trūkstamus resursus',
		opt_showResources: 'Rodyti išsamią resursų informaciją',
		opt_showNames: 'Rodyti laivų/pastatų/išradimų pavadinimus ant paveiksliuko',
		opt_nameColorOn: 'Pavadinimo spalva: prieinama',
		opt_nameColorOff: 'Pavadinimo spalva: neprieinama',
		opt_nameColorDisabled: 'Pavadinimo spalva: neužtenka resursų',
		opt_showConstructionTitle: 'Rodyti statybų pavadinimą po planetos pavadinimu',
		opt_shortHeader: 'Visada sumažinti planetos paveikslėlį',

		opt_uni_SpeedFactor: 'Šios visatos greičio faktorius',
		opt_uni_DFPercent: 'Sunaikintų laivų virsmo nuolaužomis procentas',
		opt_uni_DefenseToDF: 'Sunaikintos gynybos virsmo nuolaužomis procentas',
		
		opt_timeSetting: 'Pakeisti laiką (tik valandos)',
		opt_showServerOgameClock: 'Palikti serverio laiką oGame laikrodyje viršutiniame dešiniame kampe',
		opt_showServerPhalanx: 'Palikti serverio laiką Sensorių Falangos ataskaitoje',
		opt_showPageStartTime: 'Rodyti laiką, kada puslapis paskutinį kartą buvo atnaujintas',
		opt_timeAMPM: 'Naudoti 12 valandų formatą (AM/PM) vietoje 24 valandų',
		
		opt_timeDontChange: 'Nekeisti laiko',
		opt_timeLocal: 'Į vietos laiko juostą',
		opt_timeServer: 'Į serverio laiko juostą',

		opt_killTips: 'Išjungti iššokančius patarimus',

		opt_showEventList: 'Rodyti išsamų įvykių sąrašą Apžvalgoje',
		opt_evt_showOnTop: 'Įvykių sąrašo vieta ekrane',
		opt_evt_showReduced: 'Sumažintas įvykių sąrašas',
		opt_evt_TimeMode: 'Laikas/Atskaita - pagal nutylėjimą, sumažintame įvykių sąraše',
		opt_evt_noScroll: 'Nerodyti vartymo juostos iššokančiuose patarimuose',
		opt_phalanx_showDebris: 'Rodyti teorinį nuolaužų lauką Sensorių Falangos ataskaitoje',
		
		opt_galaxyShowRank: 'Rodyti žaidėjų/aljansų rangus galaktikos peržiūroje',
		opt_galaxyRankColor: 'Žaidėjų/aljansų spalva',
		opt_galaxyDebrisMin: 'Minimalus nuolaužų lauko dydis, kad išskirti kita spalva (0 - išjungti)',
		opt_galaxyDebrisColor: 'Išskirto nuolaužų lauko spalva',
		opt_galaxyHideMoon: 'Paslėpti Palydovo paveiksliuką (vietoj jo rodyti palydovo dydį)',
		opt_galaxy_Players: 'Išskirti šiuos žaidėjus',
		opt_galaxy_PlayerColors: 'Išskirtų žaidėjų spalva',
		opt_galaxy_Allys: 'Išskirti šiuos aljansus',
		opt_galaxy_AllyColors: 'Išskirtų aljansų spalva',
		opt_galaxy_keepTipsPlanets: 'Palikti iššokančius patarimus planetoms ir palydovams',
		opt_galaxy_keepTipsDebris: 'Palikti iššokančius patarimus nuolaužų laukams',
		
		opt_msg_PlunderThreshold: 'Mažiausia riba galimam grobiui (x1000)',
		opt_msg_DebrisThreshold: 'Mažiausia riba galimam nuolaužų laukui (x1000)',
		opt_msg_foldSmallPlunder: 'Sutraukti šnipinėjimo pranešimą su mažesniu grobiu ir nuolaužų lauku nei nustatyta riba',
		opt_msg_showPlunder: 'Rodyti galimą grobį šnipinėjimo ataskaitoje',
		opt_msg_addButtons: 'Papildomi mygtukai žinutėse',
		opt_msg_fixColors: 'Pataisyti spalvas mūšio ataskaitose',
		
		opt_fleet_showCapacity: 'Rodyti laivų talpą ir greitį',
		opt_fleet1_showResCalc: 'Rodyti resursų kalkuliatorių',
		opt_uni_maxPlayerScore: 'Stipriausias žaidėjas turi ne daugiau 5M taškų',
		opt_autocopyCoords: 'Automatinis koordinačių įkėlimas',
		opt_fleet2_setTargetDF: 'Nustatyti misiją "perdirbti nuolaužų lauką" jei laivyne yra perdirbėjų',
		opt_fleet2_fixLayout: 'Pataisyti skrydžio informacijos vietą (2 puslapis)',
		opt_fleet2_ShortLinks: 'Taikinių sąrašas greitam įkėlimui (2 puslapis)',
		opt_fleet2_MoonColor: 'Palydovo išskyrimo spalva, planetų pasirinkime',
		opt_fleet2_MoonsToEnd: 'Palydovus perkelti į planetų pasirinkimo pabaigą',
		opt_fleet2_checkProbeCapacity: 'Tikrinti Šnipinėjimo zondų talpą prieš išsiunčiant (2 puslapis)',
		
		opt_missionPriority: 'Užduočių prioritetai',
		
		opt_mvmt_expandFleets: 'Rodyti laivyno sudėti ir krovinį',
		opt_mvmt_showReversal: 'Rodyti laivyno grįžimo laiką',
		
		opt_missAttack: 'Misijos spalva: Pulti',
		opt_missColony: 'Misijos spalva: Kolonizacija',
		opt_missDeploy: 'Misijos spalva: Dislokacija',
		opt_missDestroy: 'Misijos spalva: Palydovo Sunaikinimas',
		opt_missEspionage: 'Misijos spalva: Šnipinėjimas',
		opt_missExpedition: 'Misijos spalva: Ekspedicija',
		opt_missFederation: 'Misijos spalva: AKS puolimas',
		opt_missHarvest: 'Misijos spalva: Perdirbti nuolaužų lauką',
		opt_missHold: 'Misijos spalva: AKS gynyba',
		opt_missTransport: 'Misijos spalva: Transportavimas',
		opt_msg_addSimButton: 'Šnipinėjimo ataskaitoje pridėti mygtuką mūšio simuliavimui WebSim',
	
		lbl_missAttack: 'Pulti',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Dislokacija',
		lbl_missDestroy: 'Palydovo Sunaikinimas',
		lbl_missEspionage: 'Šnipinėjimas',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'AKS puolimas',
		lbl_missHarvest: 'Perdirbti nuolaužų lauką',
		lbl_missHold: 'AKS gynyba',
		lbl_missTransport: 'Transportavimas',

		lbl_sectionGeneral: 'Bendri',
		lbl_sectionUniverse: 'Visata',
		lbl_sectionTime: 'Laiko nustatymai',
		lbl_sectionEventList: 'Įvykių sąrašas',
		lbl_sectionGalaxy: 'Galaktika',
		lbl_sectionMessages: 'Žinutės',
		lbl_sectionFleetDispatch: 'Laivyno išsiuntimas',
		lbl_sectionFleetMovement: 'Laivyno judėjimas',
		
		lbl_optionsNote1: 'Nustatymai išsisaugos tik šiai visatai',
		
		lbl_resetCoords: 'Išvalyti koordinates - ',
		
		lbl_TotalCapacity: 'Talpa viso',
		lbl_MinSpeed: 'Mažiausias greitis',
		lbl_ExPoints: 'Ekspedicijos taškai',
		lbl_mvmt_Return: 'G',
		
		lbl_resources: 'Resursai',
		lbl_debris: 'Nuolaužų laukas',
		lbl_total: 'Viso',
		lbl_loot: 'Grobis',
		lbl_metal: 'Metalas',
		lbl_crystal: 'Kristalai',
		
		lbl_shipSCargoAlt: 'Mažų krovininių laivų reiktų',
		lbl_shipLCargoAlt: 'Didelių krovininių laivų reiktų',
		lbl_shipRecyclerAlt: 'Perdirbėjų reiktų',
		lbl_shipSatelliteAlt: 'Saulės Satelitų reiktų',
		
		lbl_deficientRes: 'Trūkstami resursai',
		lbl_Production: 'Gamyba',
		lbl_ArrivalACS: 'Atvykimas (AKS)',
		
		lbl_btnMarkReadAll: 'Pažymėti visas žinutes ekrane kaip skaitytas',
		lbl_btnDeleteSmallPlunder: 'Ištrinti šnipinėjimo ataskaitas su grobiu < $plunder ir nuolaužų lauku < $debris',
		
		lbl_Moon: 'Palydovas',
		
		lbl_onTop: 'Viršuje',
		lbl_onBottom: 'Apačioje',
		lbl_onLeft: 'Kairėje',
		
		lbl_installNewVersion: 'Spragtelėkite, kad įdiegti naują versiją',
		lbl_Save: 'Išsaugoti',
		lbl_Clear: 'Išvalyti',
		lbl_Quantity: 'Kiekis',
		lbl_Duration: 'Trukmė',
		lbl_Consumption: 'Sunaudojimas',
		
		lbl_tmTime: 'Laikas',
		lbl_tmCountdown: 'Atskaita'
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