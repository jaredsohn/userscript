// ==UserScript==
// @name           AntiGam_lang_nl
// @namespace      antikiller
// @description    AntiGame translation - Dutch (must be run before main AntiGame)
// @version	1.26.0
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
		lbl_missFederation: 'federatie aanval',
		lbl_missHarvest: 'Recycle puinveld',
		lbl_missHold: 'Halt',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Klein vrachtschip',
		lbl_shipLCargo: 'Groot vrachtschip',
		lbl_shipLFighter: 'Licht gevechtschip',
		lbl_shipHFighter: 'Zwaar gevechtschip',
		lbl_shipCruiser: 'Kruiser',
		lbl_shipBattleship: 'Slagschip',
		lbl_shipColonizator: 'Kolonisatiescip',
		lbl_shipRecycler: 'Recycler',
		lbl_shipSpy: 'Spionagesonde',
		lbl_shipBomber: 'Bommenwerper',
		lbl_shipDestroyer: 'Vernietiger',
		lbl_shipRIP: 'Ster des Doods',
		lbl_shipBCruiser: 'Intercepter',
		lbl_shipSatellite: 'Zonne-energiesatelliet',
		
		lbl_defRLauncher: 'Raketlanceerder',
		lbl_defLLaser: 'Kleine Laser',
		lbl_defHLaser: 'Grote Laser',
		lbl_defGauss: 'Gausskanon',
		lbl_defIon: 'Ionkannon',
		lbl_defPlasma: 'Plasmakanon',
		lbl_defSShield: 'Kleine planetaire schildkoepel',
		lbl_defLShield: 'Grote planetaire schildkoepel',
		
		lbl_RequiredEnergy: 'Benodigde energie',
		
		rx_sendMail: /Stuur een bericht naar (.+)\./
		
	}
	
	AntiGame_lang.InterfaceNL =
	{
		opt_languageName: 'Dutch',
	
		opt_title: 'AntiGame Opties',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Annuleer',
		opt_btnDefault: 'Standaard',

		opt_language: 'Taal',
		opt_update_check: 'Zoek automatisch naar updates',
		opt_thousandSeparator: 'Duizendtal scheidingsteken',
		opt_blockAutoComplete: 'Blokkeer automatisch aanvullen in Firefox',
		
            opt_showDeficient: 'Toon missende grondstoffen',
		opt_showResources: 'Toon uitgebreide grondstof informatie',
		opt_showNames: 'Toon schip/gebouw/onderzoek namen op afbeeldingen',
                opt_nameColorOn: 'Kleur als het beschikbaar is',
                opt_nameColorOff: 'Kleur als het niet beschikbaar is',
		opt_nameColorDisabled: 'Kleur als er niet genoeg grondstoffen zijn',
		opt_showConstructionTitle: 'Toon constructies die bezig zijn in planetenlijst',
		opt_shortHeader: 'Minimaliseer planeet afbeelding altijd',
		opt_misc_scrollTitle: 'Laat volgende gebeurtenis in titel van de brower scrollen',

		opt_uni_reDesigned: 'Oud universum met Re-design layout',
		opt_uni_SpeedFactor: 'Snelheid van universum',
		opt_uni_DFPercent: 'Percentage vloot-naar-puin',
		opt_uni_DefenseToDF: 'Percentage verdediging-naar-puin',
		
		opt_timeSetting: 'Verander tijd-waarden (alleen uren)',
		opt_showServerOgameClock: 'Gebruik server tijd voor de Ogame klok rechts boven',
		opt_showServerPhalanx: 'Gebruik server tijd voor Phalanx overzicht',
		opt_showPageStartTime: 'Toon de tijd sinds laatste pagina refresh',
		opt_timeAMPM: 'Gebruik 12-uurs notatie (AM/PM) i.p.v. 24-uurs',
		
		opt_timeDontChange: 'Verander de tijd niet',
		opt_timeLocal: 'Gebruik altijd naar locale tijdzone',
		opt_timeServer: 'Gebruik altijd server tijdzone',

		opt_killTips: 'Verwijder tooltips',

		opt_showEventList: 'Toon volledige gebeurtenissenlijst op overzicht pagina',
		opt_evt_showOnTop: 'Positie van gebeurtenissenlijst op het scherm',
		opt_evt_showReduced: 'Gereduceerde gebeurtenissenlijst',
		opt_evt_TimeMode: 'Klok/aftellen standaard in de gereduceerde gebeurtenissenlijst',
		opt_evt_noScroll: 'Gebruik geen frame scrollbars als tooltips zichtbaar zijn',
            
                opt_evt_dimReverse: 'Maak terugkerende vloten dof', //Added this one since it wasn't in the AntiGam_lang_en file :)
		opt_phalanx_showDebris: 'Toon theoretisch puin in Phalanx overzicht',
		opt_evt_expandFleetsEvt: 'Toon vloot samenstelling en vracht (Gebeurtenissenlijst)',
		opt_evt_expandFleetsPhal: 'Toon vloot samenstelling en vracht (Phalanx)',
		
		opt_galaxyShowRank: 'Toon speler/alliantie ranks in melkweg',
		opt_galaxyRankColor: 'Kleur van speler/alliantie ranks',
		opt_galaxyDebrisMin: 'Minimale grootte om puinveld te markeren (0 om uit te zetten)',
		opt_galaxyDebrisColor: 'Kleur van gemarkeerd puinveld',
		opt_galaxyHideMoon: 'Toon omvang maan i.p.v. afbeelding',
		opt_galaxy_Players: 'Markeer de volgende spelers',
		opt_galaxy_PlayerColors: 'Kleuren voor speler markering',
		opt_galaxy_Allys: 'Markeer de volgende allianties',
		opt_galaxy_AllyColors: 'Kleuren voor alliantie markering',
		opt_galaxy_keepTipsPlanets: 'Behoud tooltips voor planeten en maan',
		opt_galaxy_keepTipsDebris: 'Behoud tooltips voor puinveld',
		
		opt_msg_PlunderThreshold: 'Minimale theoretische buit (x1000)',
		opt_msg_DebrisThreshold: 'Minimaal theoretisch puinveld (x1000)',
		opt_msg_foldSmallPlunder: 'Minimaliseer spionagerapporten met buit en puin onder het minimaal aantal',
		opt_msg_showPlunder: 'Toon buit in spionagerapporten',
		opt_msg_addButtons: 'Extra knoppen bij berichten',
		opt_msg_fixColors: 'Geef correcte kleur aan gevechtsrapporten',
		
		opt_fleet_showCapacity: 'Toon laadvermogen en snelheid schepen',
		opt_fleet1_showResCalc: 'Toon grondstoffen calculator',
		opt_uni_maxPlayerScore: 'De sterkste speler heeft meer dan 5M punten',
		opt_autocopyCoords: 'Kopieer coordinaten automatisch',
		opt_autocopyGlobal: 'Onthoud coordinaten van iedere pagina (Niet alleen OGame pagina\'s)',
		opt_fleet2_setTargetDF: 'Zet bestemming naar puinveld als er recyclers bij de vloot zitten',
		opt_fleet2_fixLayout: 'Pas de vlucht informatie layout aan (pagina 2)',
		opt_fleet2_ShortLinks: 'Planeet shortcut lijst (pagina 2)',
		opt_fleet2_MoonColor: 'Kleur van manen in shortcut lijst',
		opt_fleet2_MoonsToEnd: 'Verplaats manen naar het einde van de shortcut lijst',
		opt_fleet2_expandLists: 'Breid drop-down boxen uit(Snelheid, Shortcuts, AGS)',
		opt_fleet2_checkProbeCapacity: 'Controleer sonde opslagruimte voor vertrek (pagina 2)',
		
		opt_missionPriority: 'Missie prioriteit',
		
		opt_mvmt_expandFleets: 'Toon lading en schepen in vloot',
		opt_mvmt_showReversal: 'Toon terugkeer tijd voor vloten',
		
                opt_missAttack: 'Kleur voor: Aanvallen',
		opt_missColony: 'Kleur voor: Kolonisatie',
		opt_missDeploy: 'Kleur voor: Plaatsen',
		opt_missDestroy: 'Kleur voor: Vernietig maan',
		opt_missEspionage: 'Kleur voor: Spioneren',
		opt_missExpedition: 'Kleur voor: Expeditie',
		opt_missFederation: 'Kleur voor: Federatie aanval',
		opt_missHarvest: 'Kleur voor: Puinruimen',
		opt_missHold: 'Kleur voor: Halt',
		opt_missTransport: 'Kleur voor: Transport',
		opt_msg_addSimButton: 'Knoppen om spionagerapporten naar WebSim/DragoSim te zenden',
		
		lbl_missAttack: 'Aanvallen',
		lbl_missColony: 'Kolonisatie',
		lbl_missDeploy: 'Plaatsen',
		lbl_missDestroy: 'Vernietigen',
		lbl_missEspionage: 'Spioneren',
		lbl_missExpedition: 'Expeditie',
		lbl_missFederation: 'Federatie aanval',
		lbl_missHarvest: 'Puinruimen',
		lbl_missHold: 'Halt',
		lbl_missTransport: 'Transport',

		lbl_sectionGeneral: 'Algemeen',
		lbl_sectionUniverse: 'Universum',
		lbl_sectionTime: 'Tijd instellingen',
		lbl_sectionEventList: 'Gebeurtenissenlijst & Phalanx',
		lbl_sectionGalaxy: 'Melkweg',
		lbl_sectionMessages: 'Berichten',
		lbl_sectionFleetDispatch: 'Vlootverzending',
		lbl_sectionFleetMovement: 'Vlootbeweging',
		
		lbl_optionsNote1: 'Deze opties gelden enkel voor dit universum',
		
		lbl_resetCoords: 'Herstel - ',
		
		lbl_TotalCapacity: 'Totale laadvermogen',
		lbl_MinSpeed: 'Minimale snelheid',
		lbl_ExPoints: 'Expeditie punten',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Grondstoffen',
		lbl_debris: 'Puin',
		lbl_total: 'Totaal',
		lbl_loot: 'Buit',
		lbl_metal: 'Metaal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'KV',
		lbl_shipLCargoAlt: 'GV',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sats',
		
		lbl_deficientRes: 'Missende grondstoffen',
		lbl_Production: 'Productie',
		lbl_ArrivalACS: 'Aankomst (AGS)',
		
		lbl_btnMarkReadAll: 'Markeer alle zichtbare berichten als gelezen',
		lbl_btnDeleteSmallPlunder: 'Verwijder spionagerapporten met buit onder < $plunder en puin onder < $debris',
		
		lbl_Moon: 'Maan',
		
		lbl_onTop: 'Boven',
		lbl_onBottom: 'Onder menu',
		lbl_onLeft: 'Links van menu',
		
		lbl_installNewVersion: 'Klik om nieuwe versie te installeren',
		lbl_Save: 'Opslaan',
		lbl_Clear: 'Wissen',
		lbl_Quantity: 'Aantal',
		lbl_Duration: 'Duur',
		lbl_Consumption: 'Consumptie',
		
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