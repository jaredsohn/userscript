// ==UserScript==
// @name           AntiGam_lang_hu
// @namespace      sasikaa
// @description    AntiGame translation - Hungary (must be run before main AntiGame)
// @version	1.21.4
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsEN =
	{
		lbl_missAttack: 'Támadás',
		lbl_missColony: 'Kolonizáció',
		lbl_missDeploy: 'Telepítés',
		lbl_missDestroy: 'Hold Rombolás',
		lbl_missEspionage: 'Kémkedés',
		lbl_missExpedition: 'Expedíció',
		lbl_missFederation: 'ACS Támadás',
		lbl_missHarvest: 'Betakarítás',
		lbl_missHold: 'ACS Védekezés',
		lbl_missTransport: 'Szállítás',
		
		lbl_shipSCargo: 'Kis Szállító',
		lbl_shipLCargo: 'Nagy Szállító',
		lbl_shipLFighter: 'Könnyű Harcos',
		lbl_shipHFighter: 'Nehéz Harcos',
		lbl_shipCruiser: 'Cirkáló',
		lbl_shipBattleship: 'Csatahajó',
		lbl_shipColonizator: 'Kolóniahajó',
		lbl_shipRecycler: 'Szemetes',
		lbl_shipSpy: 'Kémszonda',
		lbl_shipBomber: 'Bombázó',
		lbl_shipDestroyer: 'Romboló',
		lbl_shipRIP: 'Halálcsillag',
		lbl_shipBCruiser: 'Csatacirkáló',
		lbl_shipSatellite: 'Nap műhold',
		
		lbl_RequiredEnergy: 'Szükséges energia',
		
		rx_sendMail: /Üzenet küldése (.+)\./
		
	}
	
	AntiGame_lang.InterfaceEN =
	{
		opt_languageName: 'Magyar',
	
		opt_title: 'AntiGame beállítás',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Mégse',
		opt_btnDefault: 'Alap',

		opt_language: 'Nyelv',
		opt_update_check: 'Frissítés autómatikus figyelése',
		opt_thousandSeparator: 'Ezer elválasztó',
		opt_blockAutoComplete: 'Block Auto-Complete in Firefox',
		
		opt_showDeficient: 'Hiányzó nyersanyag kijelzése',
		opt_showResources: 'Bővebb nyersanagy kijelzés',
		opt_showNames: 'Mutatja a hajó/épület/nyersanyag nevét a képeken',
		opt_nameColorOn: 'Nevek színe: elérhető',
		opt_nameColorOff: 'Nevek színe: nem elérhető',
		opt_nameColorDisabled: 'Nevek színe: nincs elég nyersanyag',
		opt_showConstructionTitle: 'Mutatja a fejlesztéseket a bolygókon',
		opt_shortHeader: 'Mindig minimalizálja a bolygók méretét',

		opt_uni_SpeedFactor: 'Univerzum sebessége',
		
		opt_timeSetting: 'Change time values (hours only)',
		opt_showServerOgameClock: 'Keep server time for top-right Ogame clock',
		opt_showServerPhalanx: 'Keep server time for Phalanx view',
		opt_showPageStartTime: 'Display the time the page was last refreshed',
		opt_timeAMPM: 'Use 12-hours format (AM/PM) instead of 24-hours',
		
		opt_timeDontChange: 'Ne változtassa az időt',
		opt_timeLocal: 'Mindig helyi idő',
		opt_timeServer: 'Mindig szerver idő',

		opt_killTips: 'Kikapcsolja a tippeket',

		opt_showEventList: 'Mutatja az áttekintésben a esemánylistát',
		opt_evt_showOnTop: 'Eseménylista pozícióka az áttekintés oldalon',
		opt_evt_showReduced: 'Kicsinyíti az eseménylistát',
		opt_evt_TimeMode: 'Idő/Hátralávő legyen az alap az eseménylistában',
		opt_evt_noScroll: 'Ne legyen gördíthető az eseménylista ha nem látszik minden az áttekintés oldalon',
		
		opt_galaxyShowRank: 'Szövetség/játékos megjelenítése a Galaxis nézetben',
		opt_galaxyRankColor: 'Játékos/Szövetség színe',
		opt_galaxyDebrisMin: 'Minimális mérete a DF-nek kiemelésnél (0-val kikapcsol)',
		opt_galaxyDebrisColor: 'DF kiemelésének a színe',
		opt_galaxyHideMoon: 'Hold képének elrejtése (hold méretének mutatása helyette)',
		opt_galaxy_Players: 'A követő játékosok kemelése',
		opt_galaxy_PlayerColors: 'Játékosok színe a kemelésnél',
		opt_galaxy_Allys: 'Szövetséges követő játékosok színe',
		opt_galaxy_AllyColors: 'Szövetség kiemelésének színe',
		opt_galaxy_keepTipsPlanets: 'Tartsa a tippeket a bolygóknál és a holdaknál',
		opt_galaxy_keepTipsDebris: 'Tartsa a tippeket a DF-nél',
		
		opt_msg_PlunderThreshold: 'Alacsony határérték az elméleti fosztásnál (x1000)',
		opt_msg_DebrisThreshold: 'Alacsony határérték az elméleti DF-nél (x1000)',
		opt_msg_foldSmallPlunder: 'Fold reports with plunder and debris less than the limit',
		opt_msg_showPlunder: 'Fosztás megjelenítése a kémjelentésben',
		opt_msg_addButtons: 'További gombok az üzeneteknél',
		opt_msg_fixColors: 'Színek fixálása az támadásjelentésekben',
		
		opt_fleet_showCapacity: 'Hajó kapacitás és sebesség mutatása',
		opt_fleet1_showResCalc: 'Mutatja a nyersanyag kalkulátort',
		opt_uni_maxPlayerScore: 'Erősebb játékos több mint 5m pont felett',
		opt_autocopyCoords: 'Koordináták autómatikus másolása',
		opt_fleet2_setTargetDF: 'Beálítja a célpontot DF-re ha van a flottában szemetes',
		opt_fleet2_fixLayout: 'Repülési adatok fixálása (2. oldal)',
		opt_fleet2_ShortLinks: 'Célpont gyors line (2. oldal)',
		opt_fleet2_MoonsToEnd: 'A holdat a gyorslista végére rakja',
		opt_fleet2_checkProbeCapacity: 'Ellenőrizze a szondák kapacitás indulás előtt (2. oldal)',
		
		opt_missionPriority: 'Küldetések kiemelése',
		
		opt_mvmt_expandFleets: 'Mutassa a hajókat és szállítókat',
		opt_mvmt_showReversal: 'Flották visszatérő idejét mutatja',
		
		opt_missAttack: 'Küldetés színe: Támadás',
		opt_missColony: 'Küldetés színe: Kolonizáció',
		opt_missDeploy: 'Küldetés színe: Telepítés',
		opt_missDestroy: 'Küldetés színe: Rombolás',
		opt_missEspionage: 'Küldetés színe: Kémkedés',
		opt_missExpedition: 'Küldetés színe: Expedíció',
		opt_missFederation: 'Küldetés színe: Szövetségi',
		opt_missHarvest: 'Küldetés színe: Betakarítás',
		opt_missHold: 'Küldetés színe: Hold',
		opt_missTransport: 'Küldetés színe: Szállítás',
		opt_msg_addSimButton: 'Gomb hozzáadása a WebSim-be küldéshez',
		
		lbl_missAttack: 'Támadás',
		lbl_missColony: 'Kolonizáció',
		lbl_missDeploy: 'Telepítés',
		lbl_missDestroy: 'Hold rombolás',
		lbl_missEspionage: 'Kémkedés',
		lbl_missExpedition: 'Expedíció',
		lbl_missFederation: 'ACS Támadás',
		lbl_missHarvest: 'Betakarítás',
		lbl_missHold: 'ACS Védekezés',
		lbl_missTransport: 'Szállítás',

		lbl_sectionGeneral: 'Parancsnok',
		lbl_sectionTime: 'Idő beállítás',
		lbl_sectionEventList: 'Eseméní lista',
		lbl_sectionGalaxy: 'Galaxis',
		lbl_sectionMessages: 'Üzenetek',
		lbl_sectionFleetDispatch: 'Flotta jelentés',
		lbl_sectionFleetMovement: 'Flotta mozgás',
		
		lbl_optionsNote1: 'A beállítás csak erre az univerzumra érvényes!',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Teljes kapacitás',
		lbl_MinSpeed: 'Minimális sebesség',
		lbl_ExPoints: 'Expedíció pontok',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Nyersanyag',
		lbl_debris: 'Szemét',
		lbl_total: 'Teljes',
		lbl_loot: 'Zsákmány',
		lbl_metal: 'Fém',
		lbl_crystal: 'Kristály',
		
		lbl_shipSCargoAlt: 'KSZ',
		lbl_shipLCargoAlt: 'NSZ',
		lbl_shipRecyclerAlt: 'SZEM',
		
		lbl_deficientRes: 'Hiányzó nyersanyag',
		lbl_Production: 'Termelés',
		lbl_ArrivalACS: 'Érkezés (ACS)',
		
		lbl_btnMarkReadAll: 'Minden üzenet jelölése olvasottnak',
		lbl_btnDeleteSmallPlunder: 'Kém jelentés törlése ha kevesebb a fosztás < $plunder és a DF < $debris',
		
		lbl_Moon: 'Hold',
		
		lbl_onTop: 'Tetejére',
		lbl_onBottom: 'Aljára',
		lbl_onLeft: 'Bal oldalra',
		
		lbl_installNewVersion: 'Kattints ide az új verzió telepítéséhez',
		lbl_Save: 'Mentés',
		lbl_Clear: 'Törlés',
		lbl_Quantity: 'Mennyiség',
		lbl_Duration: 'Időtartam',
		lbl_Consumption: 'Fogyasztás',
		
		lbl_tmTime: 'Idő',
		lbl_tmCountdown: 'Hátralévő idő'
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