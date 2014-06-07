// ==UserScript==
// @name           AntiGam_lang_HR
// @namespace      antikiller
// @description    AntiGame prijevod - Hrvatski (pokrenuti prije glavne skripte Antigame)
// @version	1.15.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

// Changelog:
// 08.12.2009	v1.0.3 za 1.15.0
// 20.11.2009	v1.0.2 za 1.13.5
// 08.11.2009	v1.0.1
//	Za AntiGame Version 1.13.0
//	Hrvatski
// 30.10.2009	v1.0.0
//	Za AntiGame Version 1.10.0
//	Hrvatski

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsHR =
	{
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizirati',
		lbl_missDeploy: 'Stationirati',
		lbl_missDestroy: 'Uništiti',
		lbl_missEspionage: 'Špijunaža',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'AKS Napad',
		lbl_missHarvest: 'Recikliraj ruševinu',
		lbl_missHold: 'Pauzirati',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Mali transporter',
		lbl_shipLCargo: 'Veliki transporter',
		lbl_shipLFighter: 'Mali lovac',
		lbl_shipHFighter: 'Veliki lovac',
		lbl_shipCruiser: 'Krstarica',
		lbl_shipBattleship: 'Borbeni brod',
		lbl_shipColonizator: 'Kolonijalni brod',
		lbl_shipRecycler: 'Recikler',
		lbl_shipSpy: 'Sonde za špijunažu',
		lbl_shipBomber: 'Bombarder',
		lbl_shipDestroyer: 'Razarač',
		lbl_shipRIP: 'Zvijezda smrti',
		lbl_shipBCruiser: 'Oklopna krstarica',
		lbl_shipSatellite: 'Solarni satelit',
		
		lbl_RequiredEnergy: 'Potrebno energije'
		
	}
	
	AntiGame_lang.InterfaceHR =
	{
		opt_languageName: 'Hrvatski',
	
		opt_title: 'AntiGame Opcije',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancel',
		opt_btnDefault: 'Default',

		opt_language: 'Jezik',
		opt_autocopyCoords: 'Auto-kopirati koordinate',
		opt_showLocalTime: 'Prikaži lokalno vrijeme umjesto serverskog vremena (samo sati)',
		opt_showServerOgameClock: 'Zadrži serversko vrijeme za Ogame sat u gornjem desnom uglu',
		opt_blockAutoComplete: 'Blokiraj Auto-Complete u Firefoxu',

		opt_showDeficient: 'Prikaži nedostajuće resurse',
		opt_showResources: 'Prikaži dodatne informacije o resursima',
		opt_showNames: 'Prikaži imena preko slika za brodove/zgrade/istraživanja',
		opt_nameColorOn: 'Naziv boje: Moguće',
		opt_nameColorOff: 'Naziv boje: Nije moguće',
		opt_nameColorDisabled: 'Naziv boje: Nema dovoljno resursa',
		opt_showConstructionTitle: 'Prikaži nazive gradnji na listi planeta',

                opt_uni_SpeedFactor: 'Faktor brzine za ovaj uni',
		
		opt_killTips: 'Ne prikazuj tooltipse',

		opt_showEventList: 'Prikaži otvorena Događanja na pregledu',
		opt_evt_showOnTop: 'Pozicija Događanja na ekranu',
		opt_evt_noScroll: 'Nema frejm skrolbara na prikazu tultipova ;)',

		opt_galaxyShowRank: 'Prikaži statistiku igrača/saveza u pregledu galaksije',
		opt_galaxyRankColor: 'Statistike igrača/saveza u boji',
		opt_galaxyDebrisMin: 'Minimalna veličina ruševine za označavanje (0 za isključiti)',
		opt_galaxyDebrisColor: 'Boja označenih ruševina',
		opt_galaxyHideMoon: 'Sakrij sliku mjeseca (umjesto slike prikaži veličinu mjeseca)',
		opt_galaxy_Players: 'Označi slijedeće igrače',
		opt_galaxy_PlayerColors: 'Boje za označavanje igrača',
		opt_galaxy_Allys: 'Označi slijedeće saveze',
		opt_galaxy_AllyColors: 'Boje za označavanje saveza',

		opt_galaxy_killTips: 'Makni sve tooltips na prikazu galaksije',
		opt_galaxy_keepTipsPlanets: 'Zadrži prikaz tooltipsa za planete i mjesece',
		opt_galaxy_keepTipsDebris: 'Zadrži prikaz tooltipsa za ruševine',
		
		opt_msg_PlunderThreshold: 'Donji limit za teoretski plijen (x1000)',
		opt_msg_DebrisThreshold: 'Donji limit za teoretsku ruševinu (x1000)',
		opt_msg_foldSmallPlunder: 'Presaviti izvješća s pljačkom i ruševinama manjih od granica',
		opt_msg_showPlunder: 'Prikaži plijen u izvješću špijunaže',
		opt_msg_addButtons: 'Dodatne tipke na porukama',
		opt_msg_fixColors: 'Podesi boje borbenih izvještaja',
		
		opt_showDeficient: 'Pokaži nedostajuće resurse',
		opt_showResources: 'Prikaži dodatne informacije o resursima',
		
		opt_fleet_showCapacity: 'Prikaži kapacitet i brzinu brodova',
		opt_fleet2_setTargetDF: 'Namjesti cilj na RU ako u floti ima reciklera',
		opt_fleet2_fixLayout: 'Podesi prikaz izvještaja',
		opt_fleet2_ShortLinks: 'Prečac do mete',
		opt_fleet2_checkProbeCapacity: 'Provjeri kapacitet sonde prije slanja (stranica 2)',
		
		opt_missionPriority: 'Prioritet misija',
		
		opt_mvmt_expandFleets: 'Prikaži brodove i teret flote',
		opt_mvmt_showReversal: 'Prikaži vrijeme povratka flote',
		
		opt_missAttack: 'Boja misije: Napad',
		opt_missColony: 'Boja misije: Kolonizacija',
		opt_missDeploy: 'Boja misije: Stacioniranje',
		opt_missDestroy: 'Boja misije: Uništi',
		opt_missEspionage: 'Boja misije: Špijunaža',
		opt_missExpedition: 'Boja misije: Ekspedicija',
		opt_missFederation: 'Boja misije: AKS',
		opt_missHarvest: 'Boja misije: Recikliranje',
		opt_missHold: 'Boja misije: Pauziraj',
		opt_missTransport: 'Boja misije: Transport',
		opt_msg_addSimButton: 'Dodaj gumb za simulaciju s WebSim-om',

		
		// these label are shown in Options
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Stacioniranje',
		lbl_missDestroy: 'Rušenje mjeseca',
		lbl_missEspionage: 'Špijunaža',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'AKS Napad',
		lbl_missHarvest: 'Recikliranje',
		lbl_missHold: 'Pauziranje',
		lbl_missTransport: 'Transport',
		//
		
		lbl_sectionGeneral: 'Općenito',
		lbl_sectionEventList: 'Događanja',
		lbl_sectionGalaxy: 'Galaksija',
		lbl_sectionMessages: 'Poruke',
		lbl_sectionFleetDispatch: 'Otpremanje flota',
		lbl_sectionFleetMovement: 'Kretanje flota',
		
		lbl_optionsNote1: 'Opcija je spremljena samo za ovaj uni',
		
		lbl_TotalCapacity: 'Ukupni kapacitet',
		lbl_MinSpeed: 'Minimalna brzina',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Resursi',
		lbl_debris: 'Ruševine',
		lbl_total: 'Ukupno',
		lbl_loot: 'Plijen',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'VT',
		lbl_shipRecyclerAlt: 'Rec',

		
		lbl_deficientRes: 'Nedostajući resursi',
		lbl_Production: 'Proizvodnja',
		lbl_ArrivalACS: 'Dolazak (AKS)',
		
		lbl_btnMarkReadAll: 'Označi sve prikazane poruke kao pročitane',
		lbl_btnDeleteSmallPlunder: 'Izbriši sva izvješća špijunaže gdje je pljačka < $plunder i ruševina < $debris',
		
		lbl_Moon: 'Mjesec',

		lbl_onTop: 'Na vrhu',
		lbl_onBottom: 'Na dnu',
		lbl_onLeft: 'Na lijevo'

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