// ==UserScript==
// @name           AntiGam_lang_nl
// @namespace      Ogame.nl Official Channel
// @description    AntiGame translation - Dutch (must be run before main AntiGame)
// @version	1.20.x
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsNL =
	{
		lbl_missAttack: 'Aanvallen',
		lbl_missColony: 'Koloniseren',
		lbl_missDeploy: 'Plaatsen',
		lbl_missDestroy: 'Vernietigen',
		lbl_missEspionage: 'Spioneren',
		lbl_missExpedition: 'Expeditie',
		lbl_missFederation: 'Federatie aanval',
		lbl_missHarvest: 'Recycle Puinveld',
		lbl_missHold: 'Halt',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Klein vrachtschip',
		lbl_shipLCargo: 'Groot vrachtschip',
		lbl_shipLFighter: 'Licht gevechtsschip',
		lbl_shipHFighter: 'Zwaar gevechtsschip',
		lbl_shipCruiser: 'Kruiser',
		lbl_shipBattleship: 'Slagschip',
		lbl_shipColonizator: 'Kolonisatieschip',
		lbl_shipRecycler: 'Recycler',
		lbl_shipSpy: 'Spionagesonde',
		lbl_shipBomber: 'Bommenwerper',
		lbl_shipDestroyer: 'Vernietiger',
		lbl_shipRIP: 'Ster des Doods',
		lbl_shipBCruiser: 'Interceptor',
		lbl_shipSatellite: 'Zonne-energiesatelliet',
		
		lbl_RequiredEnergy: 'Energie benodigd',
		
		rx_sendMail: /Verstuur een bericht naar (.+)\./
		
	}
	
	AntiGame_lang.InterfaceNL =
	{
		opt_languageName: 'Dutch',
	
		opt_title: 'AntiGame Opties',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Annuleer',
		opt_btnDefault: 'Standaard',

		opt_language: 'Taal',
		opt_update_check: 'Controleer voor updates',
		opt_thousandSeparator: 'Duizend scheiding',
		opt_blockAutoComplete: 'Block Auto-Complete in Firefox',
		
		opt_showDeficient: 'Toon benodigde grondstoffen',
		opt_showResources: 'Toon info uitgebreide grondstoffen',
		opt_showNames: 'Toon schip/gebouw/onderzoek namen over de afbeeldingen',
		opt_nameColorOn: 'Naam kleur: beschikbaar',
		opt_nameColorOff: 'Naam kleur: niet beschikbaar',
		opt_nameColorDisabled: 'Naam kleur: onvoldoende grondstoffen',
		opt_showConstructionTitle: 'Toon bouwtitels in de planeetlijst',

		opt_uni_SpeedFactor: 'Speed factor van dit universum',
		
		opt_timeSetting: 'Wijzig tijdinstellingen (alleen uren)',
		opt_showServerOgameClock: 'Bewaar Servertijd voor Ogame klok',
		opt_showServerPhalanx: 'Bewaar Servertijd voor Phalanx overzicht',
		opt_showPageStartTime: 'Laat tijd zien wanneer de pagina is herladen',
		opt_timeAMPM: 'Gebruik 12-uur formaat (AM/PM) in plaats van 24-uur formaat',
		
		opt_timeDontChange: 'Tijd niet aanpassen',
		opt_timeLocal: 'Zet tijd op lokale tijdzone',
		opt_timeServer: 'Zet tijd op server tijdzone',

		opt_killTips: 'In/Uitschakelen van de tooltips',

		opt_showEventList: 'Show unfolded Event list on Overview',
		opt_evt_showOnTop: 'Position of the Event list on the screen',
		opt_evt_showReduced: 'Reduced Event list',
		opt_evt_noScroll: 'No frame scrollbars appear when tooltips are displayed',
		
		opt_galaxyShowRank: 'Show player/alliance ranks in Galaxy view',
		opt_galaxyRankColor: 'Player/alliance ranks color',
		opt_galaxyDebrisMin: 'Minimal size of debris to highlight (0 to turn off)',
		opt_galaxyDebrisColor: 'Color of highlighted debris',
		opt_galaxyHideMoon: 'Hide Moon picture (display moon size instead)',
		opt_galaxy_Players: 'Highlight the following players',
		opt_galaxy_PlayerColors: 'Colors for player highlighting',
		opt_galaxy_Allys: 'Highlight the following alliances',
		opt_galaxy_AllyColors: 'Colors for alliance highlighting',
		opt_galaxy_keepTipsPlanets: 'Keep tooltips for planets and moons',
		opt_galaxy_keepTipsDebris: 'Keep tooltips for debris fields',
		
		opt_msg_PlunderThreshold: 'Low limit for theoretical plunder (x1000)',
		opt_msg_DebrisThreshold: 'Low limit for theoretical debris (x1000)',
		opt_msg_foldSmallPlunder: 'Fold reports with plunder and debris less than the limit',
		opt_msg_showPlunder: 'Show plunder in spy reports',
		opt_msg_addButtons: 'Additional buttons on Messages',
		opt_msg_fixColors: 'Fix colors of combat reports',
		
		opt_fleet_showCapacity: 'Show ships capacity and speed',
		opt_fleet1_showResCalc: 'Show resource calculator',
		opt_uni_maxPlayerScore: 'The strongest player has more than 5M points',
		opt_autocopyCoords: 'Auto-copy coordinates',
		opt_fleet2_setTargetDF: 'Set target to DF if the fleet includes recyclers',
		opt_fleet2_fixLayout: 'Fix flight information layout (page 2)',
		opt_fleet2_ShortLinks: 'Target shortlinks (page 2)',
		opt_fleet2_checkProbeCapacity: 'Check probes capacity before departure(page 2)',
		
		opt_missionPriority: 'Prioriteit van Missie',
		
		opt_mvmt_expandFleets: 'Toon vloot schepen en opslag',
		opt_mvmt_showReversal: 'Toon tijd van terugkeer voor vloten',
		
		opt_missAttack: 'Kleur van missie: Aanvallen',
		opt_missColony: 'Kleur van missie: Koloniseren',
		opt_missDeploy: 'Kleur van missie: Plaatsen',
		opt_missDestroy: 'Kleur van missie: Vernietigen',
		opt_missEspionage: 'Kleur van missie: Spioneren',
		opt_missExpedition: 'Kleur van missie: Expeditie',
		opt_missFederation: 'Kleur van missie: Federatie',
		opt_missHarvest: 'Kleur van missie: Puinruimen',
		opt_missHold: 'Kleur van missie: Halt',
		opt_missTransport: 'Kleur van missie: Transport',
		opt_msg_addSimButton: 'Voeg WebSim-knop toe aan spionagerapporten',
		
		lbl_missAttack: 'Aanvallen',
		lbl_missColony: 'Koloniseren',
		lbl_missDeploy: 'Plaatsen',
		lbl_missDestroy: 'Vernietigen',
		lbl_missEspionage: 'Spioneren',
		lbl_missExpedition: 'Expeditie',
		lbl_missFederation: 'Federatie aanval',
		lbl_missHarvest: 'Puinruimen',
		lbl_missHold: 'Halt',
		lbl_missTransport: 'Transport',

		lbl_sectionGeneral: 'Algemeen',
		lbl_sectionTime: 'Tijd instellingen',
		lbl_sectionEventList: 'Gebeurtenissenlijst',
		lbl_sectionGalaxy: 'Melkweg',
		lbl_sectionMessages: 'Berichten',
		lbl_sectionFleetDispatch: 'Vloot verzending',
		lbl_sectionFleetMovement: 'Vlootbeweging',
		
		lbl_optionsNote1: 'Deze optie is alleen opgeslagen voor dit universum',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Total capacity',
		lbl_MinSpeed: 'Minimal speed',
		lbl_ExPoints: 'Expedition points',
		lbl_mvmt_Return: 'R',
		/*lbl_mvmt_Expedition: 'E',*/
		
		lbl_resources: 'Grondstoffen',
		lbl_debris: 'Puin',
		lbl_total: 'Totaal',
		lbl_loot: 'Plunder',
		lbl_metal: 'Metaal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'KV',
		lbl_shipLCargoAlt: 'GV',
		lbl_shipRecyclerAlt: 'Recs',
		
		lbl_deficientRes: 'Benodigde grondstoffen',
		lbl_Production: 'Productie',
		lbl_ArrivalACS: 'Aankomst (Halt)',
		
		lbl_btnMarkReadAll: 'Markeer alle getoonde berichten als gelezen',
		lbl_btnDeleteSmallPlunder: 'Verwijder spionagerapporten met buit < $plunder en puin < $debris',
		
		lbl_Moon: 'Maan',
		
		lbl_onTop: 'Bovenkant',
		lbl_onBottom: 'Onderkant',
		lbl_onLeft: 'Links',
		
		lbl_installNewVersion: 'Klik om de nieuwe versie te installeren',
		lbl_Save: 'Opslaan',
		lbl_Clear: 'Vrijmaken',
		lbl_Quantity: 'Hoeveelheid',
		lbl_Duration: 'Duur',
		lbl_Consumption: 'Verbruik',
		
		lbl_tmTime: 'Tijd',
		lbl_tmCountdown: 'Aftellen'
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