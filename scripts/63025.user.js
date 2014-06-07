// ==UserScript==
// @name           AntiGam_lang_ro
// @namespace      antikiller
// @description    AntiGame translation - Romanian (must be run before main AntiGame)
// @version	1.15.6
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function ()
{
	var AntiGame_lang = {};

	AntiGame_lang.LabelsRO =
	{

		lbl_missAttack: 'Atac',
		lbl_missColony: 'Colonizare',
		lbl_missDeploy: 'Desfasurare',
		lbl_missDestroy: 'Distruge',
		lbl_missEspionage: 'Spionaj',
		lbl_missExpedition: 'Expeditie',
		lbl_missFederation: 'Atac SAL',
		lbl_missHarvest: 'Reciclare',
		lbl_missHold: 'Aparare SAL',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Transportor Mic',
		lbl_shipLCargo: 'Transportor Mare',
		lbl_shipLFighter: 'Vanator Usor',
		lbl_shipHFighter: 'Vanator Greu',
		lbl_shipCruiser: 'Crucisator',
		lbl_shipBattleship: 'Nava de Razboi',
		lbl_shipColonizator: 'Nava de Colonizare',
		lbl_shipRecycler: 'Reciclator',
		lbl_shipSpy: 'Proba de Spionaj',
		lbl_shipBomber: 'Bombardierr',
		lbl_shipDestroyer: 'Distrugator',
		lbl_shipRIP: 'RIP',
		lbl_shipBCruiser: 'Interceptor',
		lbl_shipSatellite: 'Satelit Solar',
		
		lbl_RequiredEnergy: 'Energie necesara'
		
	}

AntiGame_lang.InterfaceRO =
	{
		opt_languageName: 'Romana',
				
		opt_title: 'Optiuni AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Renunta',
		opt_btnDefault: 'Default',

		opt_language: 'Limba',
		opt_autocopyCoords: 'Auto-inserare de coordonate',
		opt_showLocalTime: 'Arata ora locala in loc de ora serverului (doar ora)',
		opt_showServerOgameClock: 'Arata ora serverului in dreapta-sus',
		opt_blockAutoComplete: 'Deconecteaza Auto-Fill in Firefox',
		
		opt_showDeficient: 'Arata resurse insuficiente',
		opt_showResources: 'Afiseaza extins informatiile despre resurse',
		opt_showNames: 'Aata denumirea navelor/uzinelor/cercetarilor peste imagine',
		opt_nameColorOn: 'Culoare misiunei: disponibil',
		opt_nameColorOff: 'Culoare misiunei: indisponibil',
		opt_nameColorDisabled: 'Culoare misiunei: Nu ajung resurse',
		opt_showConstructionTitle: 'Arata denumirea misiunei a constructiilor langa lista planetelor',

		opt_uni_SpeedFactor: 'Factorul de accelerare in acest univers',
		
		opt_killTips: 'Block pop-up sfaturi',

		opt_showEventList: 'Arata detaliat lista evenimentelor',
		opt_evt_showOnTop: 'Locatia listei de evenimente',
		opt_evt_noScroll: 'Nu arata liniile de derulare cadrului din afisarea sfaturilor',
		
		opt_galaxyShowRank: 'Arata rank-ul jucator/alianta in sistem',
		opt_galaxyRankColor: 'Culoarea pentru rank/alianta',
		opt_galaxyDebrisMin: 'CR-ul minim pentru iluminare (0 - nu este iluminat)',
		opt_galaxyDebrisColor: 'Culoarea ce ilumineaza CR-ului',
		opt_galaxyHideMoon: 'Ascunde imaginea Lunii (in schimb arat dimensiunea Lunei)',
		opt_galaxy_Players: 'Ilumineaza urmatorii jucatori',
		opt_galaxy_PlayerColors: 'Culoarea pentru iluminarea jucatorilor',
		opt_galaxy_Allys: 'Ilumineaza urmatoarele aliante',
		opt_galaxy_AllyColors: 'Culoare pentru iluminarea aliantelor',
		opt_galaxy_keepTipsPlanets: 'Salveaza sfaturile pentru planete si luni',
		opt_galaxy_keepTipsDebris: 'Salveaza sfaturile pentru campurile de ramasite',

		opt_msg_PlunderThreshold: 'Limita minima pentru o posibila captura (x1000)',
		opt_msg_DebrisThreshold: 'Limina minima pentru un posibil derbis (x1000)',
		opt_msg_foldSmallPlunder: 'Minimizeaza rapoartele capturate unde dobanda si derbisul limita',
		opt_msg_showPlunder: 'Arata posibila capacitate capturata in rapoartele de spionaj',
		opt_msg_fixColors: 'Corecteaza culorile rapoartelor de lupta',
		opt_msg_addButtons: 'Butoane suplimentare un casuta de mesaje',
                opt_msg_addSimButton: 'Adauga butonul de simulare a raportului de lupta WebSim',

		
		opt_missionPriority: 'Sarcini prioritare',
		
		opt_fleet_showCapacity: 'Arata capacitatea cargo si viteza navelor',
		opt_fleet2_setTargetDF: 'Trimite la CR daca in flota exista reciclatoare',
		opt_fleet2_fixLayout: 'Corecteaza locatia si informatia despre misiune (pagina2)',
		opt_fleet2_ShortLinks: 'Lista tintelor pentru atasare rapida (pagina 2)',
                opt_fleet2_checkProbeCapacity: 'Arata capacitatea de stocare a probelor inainte de a trimite (pagina 2)',
		
		opt_mvmt_expandFleets: 'Arata resursele si structura flotelor',
		opt_mvmt_showReversal: 'Arata timpul de retur la retragere',
		
		opt_missAttack: 'Culoare flota, misiune: Atac',
		opt_missColony: 'Culoare flota, misiune: Colonizare',
		opt_missDeploy: 'Culoare flota, misiune: Desfasurare',
		opt_missDestroy: 'Culoare flota, misiune: Distruge',
		opt_missEspionage: 'Culoare flota, misiune: Spionaj',
		opt_missExpedition: 'Culoare flota, misiune: Expeditie',
		opt_missFederation: 'Culoare flota, misiune: Atac SAL',
		opt_missHarvest: 'Culoare flota, misiune: Reciclare',
		opt_missHold: 'Culoare flota, misiune: Mentinere',
		opt_missTransport: 'Culoare flota, misiune: Transport',

		// these label are shown in Options
		lbl_missAttack: 'Аtac',
		lbl_missColony: 'Colonizare',
		lbl_missDeploy: 'Desfasurare',
		lbl_missDestroy: 'Distruge',
		lbl_missEspionage: 'Spionaj',
		lbl_missExpedition: 'Expeditie',
		lbl_missFederation: 'Atac SAL',
		lbl_missHarvest: 'Reciclare',
		lbl_missHold: 'Mentinere',
		lbl_missTransport: 'Transport',
		//
		
		lbl_sectionGeneral: 'Total',
		lbl_sectionEventList: 'Lista evenimentelor',
		lbl_sectionGalaxy: 'Univers',
		lbl_sectionMessages: 'Mesaj',
		lbl_sectionFleetDispatch: 'Trimite flota',
		lbl_sectionFleetMovement: 'Lista flotei',
		
		lbl_optionsNote1: 'Setarea este salvata numai pentru acest univers',
		
		lbl_resetCoords: 'Renunta - ',
		
		lbl_TotalCapacity: 'capacitatea totala',
		lbl_MinSpeed: 'Viteza minima',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Resurse',
		lbl_debris: 'Derbis',
		lbl_total: 'Total',
		lbl_loot: 'Dobanda',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'Transportor Mic',
		lbl_shipLCargoAlt: 'Ttransportor Mare',
		lbl_shipRecyclerAlt: 'Reciclatoare',
		
		lbl_deficientRes: 'Lipsa de resurse',
		lbl_Production: 'Producere',
		lbl_ArrivalACS: 'Intoarcere (SAL)',
		
		lbl_btnMarkReadAll: 'Noteaza toate mesajele ca fiind citite',
		lbl_btnDeleteSmallPlunder: 'Sterge toate mesajele cu dobanda de < $plunder si derbis de < $debris',
		
		lbl_Moon: 'Luna',
		lbl_onTop: 'Sus',
		lbl_onBottom: 'Jos',
		lbl_onLeft: 'In stanga'
	}
	// -------------------------------
	// Don't modify the code below

	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (! mywindow.AntiGame_lang)
		mywindow.AntiGame_lang = AntiGame_lang;
	else
		for (var i in AntiGame_lang)
			mywindow.AntiGame_lang [i] = AntiGame_lang [i];

}) ();