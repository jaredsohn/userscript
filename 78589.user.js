// ==UserScript==
// @name           AntiGame_lang_DA
// @namespace      antikiller
// @description    AntiGame translation (must be run before main AntiGame) v 1.02
// @version	   1.02
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==
// Translated by Jump
// for errors contact on IRC #ogame.dk 

// Changelog:
/*


1.02: Antigame translated to Danish, up to date with Antigame 1.23.0

1.01: Antigame translated to Danish, up to date with Antigame 1.10.0

1.00: Antigame translated to Danish, up to date with Antigame 1.2

*/

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsDA =
	{  
		lbl_missAttack: 'Angrib',  
		lbl_missColony: 'Koloniser',  
		lbl_missDeploy: 'Stationer',  
		lbl_missDestroy: 'Ødelæg',  
		lbl_missEspionage: 'Spioner',  
		lbl_missExpedition: 'Expedition',  
		lbl_missFederation: 'Flåde sammenslutning',  
		lbl_missHarvest: 'Recycle',  
		lbl_missHold: 'Hold',  
		lbl_missTransport: 'Transporter',  

		lbl_shipSCargo: 'Lille Transporter',  
		lbl_shipLCargo: 'Stor Transporter',  
		lbl_shipLFighter: 'Lille Jæger',  
		lbl_shipHFighter: 'Stor Jæger',  
		lbl_shipCruiser: 'Krydser',  
		lbl_shipBattleship: 'Slagskib',  
		lbl_shipColonizator: 'Koloniskib',  
		lbl_shipRecycler: 'Recycler',  
		lbl_shipSpy: 'Spionagesonde',  
		lbl_shipBomber: 'Bomber',  
		lbl_shipDestroyer: 'Destroyer',  
		lbl_shipRIP: 'Dødsstjerne',  
		lbl_shipBCruiser: 'Interceptor',  
		lbl_shipSatellite: 'Solarsatellit',
		
		lbl_RequiredEnergy: 'Energi behøvet'
	}  

	AntiGame_lang.InterfaceDA =  
	{  
		opt_languageName: 'Dansk',  

		opt_title: 'AntiGame Indstillinger',  
		opt_btnOk: 'OK',  
		opt_btnCancel: 'Annuler',  
		opt_btnDefault: 'Standard',

		opt_language: 'Sprog',  
		opt_thousandSeparator: 'Tusinde seperator',
		opt_blockAutoComplete: 'Bloker auto complete i Firefox',  

		opt_showDeficient: 'Vis manglende ressourcer',
		opt_showResources: 'Vis udvidede ressource information',
		opt_showNames: 'Vis skibs/bygnings/forsknings navne over billeder',
		opt_nameColorOn: 'Farve navn: tilgængelig',
		opt_nameColorOff: 'Farve navn: ikke tilgængelig',
		opt_nameColorDisabled: 'Farve: ikke nok resourcer',
		opt_showConstructionTitle: 'Vis bygninger under opførelse i planet navn',

		opt_uni_SpeedFactor: 'Hastigheds faktor for universet',
		opt_uni_DFPercent: 'Procent af flåde til ruinmark',
		opt_uni_DefenseToDF: 'Procent af forsvar til ruinmark',

		opt_timeSetting: 'Skift tiden (Kun timer)',
		opt_showServerOgameClock: 'Behold server tid på uret i øverste højre hjørne',
		opt_showServerPhalanx: 'Behold server tid under phalanx',
		opt_timeAMPM: 'Benyt 12-timers format (AM/PM) istedet for 24-timers',
		opt_showPageStartTime: 'Vis tidspunktet siden sidst blev opdateret',
		
		opt_timeDontChange: 'Skift ikke tiden',
		opt_timeLocal: 'Benyt altid lokal tidszone',
		opt_timeServer: 'Benyt altid server tidszone',

		opt_killTips: 'Fjern tooltips',

		opt_showEventList: 'Vis detaljeret flåde oversigt i oversigten',
		opt_evt_showOnTop: 'Position af flåde oversigt på skærmen',
		opt_evt_noScroll: 'Ingen frame scrollbar når værktøjs tips vises',
		opt_phalanx_showDebris: 'Vis teoretisk ruinmark i phalanx billede',
		opt_evt_TimeMode: 'Tid/Nedtælling som standard i reduceret flåde oversigt',
		opt_evt_showReduced: 'Reduceret flåde oversigt',

		opt_galaxyShowRank: 'Vis spiller/alliance placering i galakse oversigt',
		opt_galaxyRankColor: 'Spiller/alliance placering farve',
		opt_galaxyDebrisMin: 'Minimum størrelse af ruin mark til highlight (sæt til 0 for at slå fra)',  
		opt_galaxyDebrisColor: 'Farve til highlighted ruin mark',  

		opt_galaxyHideMoon: 'Skjul måne billede (vis istedet måne størrelse)',
		opt_galaxy_Players: 'Fremhæv følgende spillere',
		opt_galaxy_PlayerColors: 'Farver til de fremhævede spillere',
		opt_galaxy_Allys: 'Fremhæv følgende  alliancer',
		opt_galaxy_AllyColors: 'Farver til de fremhævede alliance',
		opt_galaxy_keepTipsPlanets: 'Behold tips til planeter og måner',
		opt_galaxy_keepTipsDebris: 'Behold tips til ruin marker',

		opt_showLocalTime: 'Vis lokal tid i stedet for server tid',  
		opt_galaxyShowRank: 'Vis spiller/alliance ranks i Galakse oversigt',  
		opt_galaxyRankColor: 'Spiller/alliance ranks farver',  

		opt_msg_PlunderThreshold: 'Lav grænse for teoretisk udplyndre (x1000)',
		opt_msg_DebrisThreshold: 'Lav grænse for teoretisk ruinmark (x1000)',
		opt_msg_foldSmallPlunder: 'Vis ikke rapporter med plyndring og ruinmarker der er mindre end den grænse',
		opt_msg_showPlunder: 'Vis mængde af resurser der kan hentes i spy raport',  
		opt_msg_fixColors: 'Fix farver i kamp rapporter',  
		opt_msg_addButtons: 'Ekstra knapper i beskeder',  

		opt_fleet_showCapacity: 'Vis skibes kapacitet og hastighed',
		opt_fleet1_showResCalc: 'Vis resource beregner',
		opt_autocopyCoords: 'Auto-kopier koordinater',  
		opt_fleet2_setTargetDF: 'Destination sættes til RM hvis flåde inkludere recyclere',
		opt_fleet2_fixLayout: 'Fix flåde information layout (side 2)',
		opt_uni_maxPlayerScore: 'Den stærkeste spiller har mere end 5M point',
		opt_fleet2_ShortLinks: 'Mål shortlinks (side 2)',
		opt_fleet2_checkProbeCapacity: 'Check spiosonders kapacitet før afsendelse (side 2)',
		opt_fleet2_MoonsToEnd: 'Flyt måner til sidst i genvejs listen',


		opt_missionPriority: 'Mission prioritet',  

		opt_mvmt_expandFleets: 'Vis flåde skibe og transtortere',  
		opt_mvmt_showReversal: 'Vis  flådens tilbagevending ankomst (klokkeslæt)',  
		opt_msg_addSimButton: 'Tilføj knap til videresending af spion rapporter til WebSim',

		opt_missAttack: 'Mission farve: Angrib',  
		opt_missColony: 'Mission farve: kolonisere',  
		opt_missDeploy: 'Mission farve: Stationer',  
		opt_missDestroy: 'Mission farve: Ødelæg',  
		opt_missEspionage: 'Mission farve: spionere',  
		opt_missExpedition: 'Mission farve: Ekspedition',  
		opt_missFederation: 'Mission farve: Flåde sammenslutning',  
		opt_missHarvest: 'Mission farve: Recycle',  
		opt_missHold: 'Mission farve: Hold',  
		opt_missTransport: 'Mission farve: Transporter',  

		// these labels are shown in Options  
		lbl_missAttack: 'Angrib',  
		lbl_missColony: 'Kolonisere',  
		lbl_missDeploy: 'Stationer',  
		lbl_missDestroy: 'Ødelæg',  
		lbl_missEspionage:'Spionere',  
		lbl_missExpedition: 'Ekspedition',  
		lbl_missFederation: 'Flåde sammenslutning',  
		lbl_missHarvest: 'Harvest',  
		lbl_missHold: 'Hold',  
		lbl_missTransport: 'Transporter',  
		//  
		
		lbl_sectionGeneral: 'Generelt',
		lbl_sectionGalaxy: 'Galakse',
		lbl_sectionMessages: 'Beskeder',
		lbl_sectionFleetMovement: 'Flåde bevægelse',
		lbl_sectionUniverse: 'Univers',
		lbl_sectionTime: 'Tids instillinger',
		lbl_sectionEventList: 'Flåde oversigt',
		lbl_sectionFleetDispatch: 'Flåde afsendelse',



		lbl_optionsNote1: 'Denne valgmulighed er gemt kun for dette univers',
		
		lbl_resetCoords: 'Reset - ',

		lbl_TotalCapacity: 'Total kapacity',
		lbl_MinSpeed: 'Minimums fart',
		lbl_mvmt_Return: 'R',  
		lbl_mvmt_Expedition: 'E',  

		lbl_resources: 'Ressourcer',  
		lbl_debris: 'Ruin mark',  
		lbl_total: 'Total',  
		lbl_loot: 'Bytte',  
		lbl_metal: 'Metal',  
		lbl_crystal: 'Krystal',  

		lbl_shipSCargoAlt: 'LT',
		lbl_shipLCargoAlt: 'ST',
		lbl_shipRecyclerAlt: 'RC',

		lbl_deficientRes: 'Manglende Ressourcer',  
		lbl_ArrivalACS: 'Ankomst (AKS)',  
		lbl_Production: 'Produktion',

		lbl_btnMarkReadAll: 'Marker alle viste beskeder som læste',
		lbl_btnDeleteSmallPlunder: 'Slet Spion reporter og kamp reporter < $plyndring og ruinmark < $ruinmark',

		lbl_Moon: 'Måne',
		
		lbl_onTop: 'Toppen',
		lbl_onBottom: 'Bunden',
		lbl_onLeft: 'Venstre',
		lbl_tmTime: 'Tid',
		lbl_tmCountdown: 'Nedtælling'

	}
	
	
	// -------------------------------
	// Don't modify the code below

	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (!mywindow.AntiGame_lang)
		mywindow.AntiGame_lang = AntiGame_lang;
	else
		for (var i in AntiGame_lang)
			mywindow.AntiGame_lang[i] = AntiGame_lang[i];

}) ()