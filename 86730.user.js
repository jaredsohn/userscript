// ==UserScript==
// @name           AntiGam_lang_hu
// @namespace      Swabber
// @description    AntiGame translation - Hungarian (must be run before main AntiGame)
// @version	1.26.1
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsHU =
	{
                lbl_missAttack: 'Támadas',
                lbl_missColony: 'Kolónizáció',
		lbl_missDeploy: 'Telepítés',
		lbl_missDestroy: 'Holdrombolás',
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
		lbl_shipSatellite: 'Nap Műhold',
		
		lbl_defRLauncher: 'Rakéta Kilövő',
		lbl_defLLaser: 'Könnyű Lézer',
		lbl_defHLaser: 'Nehéz Lézer',
		lbl_defGauss: 'Gauss Ágyú',
		lbl_defIon: 'Ion Ágyú',
		lbl_defPlasma: 'Plazma Torony',
		lbl_defSShield: 'Kis Pajzs Kupola',
		lbl_defLShield: 'Nagy Pajzs Kupola',
		
		lbl_RequiredEnergy: 'Szükséges energia',
		
		rx_sendMail: /Üzenet küldése neki: (.+)\./
		
	}
	
	AntiGame_lang.InterfaceHU =
	{
		opt_languageName: 'Magyar',
	
		opt_title: 'AntiGame Beálítások',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Mégse',
		opt_btnDefault: 'Alap',

		opt_language: 'Nyelv',
		opt_update_check: 'Frissítések automatikus keresése',
		opt_thousandSeparator: 'Ezres csoport elválasztó',
		opt_blockAutoComplete: 'Automatikus kiegészítés blokkolása Firefox-ban',
		
		opt_showDeficient: 'Hiányzó nyersanyagok kijelzése',
		opt_showResources: 'Fejlett erőforrás kijelzés',
		opt_showNames: 'Mutassa a hajó/épület/kutatás nevét a képeken',
		opt_nameColorOn: 'Szöveg színe - elérhető',
		opt_nameColorOff: 'Szöveg színe - nem elérhető',
		opt_nameColorDisabled: 'Szöveg színe - nyersanyaghiány',
		opt_showConstructionTitle: 'Aktuális építés nevének mutatása a bolygólistában',
		opt_shortHeader: 'Mindig minimalizálja a bolygók előnézeti képét',
		opt_misc_scrollTitle: 'A legközelebbi esemény jelzése a címsorban',

		opt_uni_reDesigned: 'Régi univerzum a Re-Design frissítéssel',
		opt_uni_SpeedFactor: 'Univerzum sebessége',
		opt_uni_DFPercent: 'Hajókból származó törmelék (százalékban)',
		opt_uni_DefenseToDF: 'Védelemből származó törmelék (százalékban)',
		
		opt_timeSetting: 'Időszinkronizáció beállítása',
		opt_showServerOgameClock: 'Szerver idő használata az Ogame órában',
		opt_showServerPhalanx: 'Szerver idő használata Phalanx nézetben',
		opt_showPageStartTime: 'Az oldal utolsó frissítésének ideje legyen látható',
		opt_timeAMPM: '12 órás formátum használata a 24 órás helyett',
		
		opt_timeDontChange: 'Ne változzon meg',
		opt_timeLocal: 'Helyi idő szerint',
		opt_timeServer: 'Szerver idő szerint',

		opt_killTips: 'Tippek kikapcsolása',

		opt_showEventList: 'Eseménylista mutatása az áttekintés nézetben',
		opt_evt_showOnTop: 'Eseménylista pozícója',
		opt_evt_showReduced: 'Minimalizált eseménylista',
		opt_evt_TimeMode: 'Idő/Hátralévő legyen látható a lekicsinyített eseménylistában',
		opt_evt_noScroll: 'Görgetősáv létrejöttének tiltása (mikor a tippek láthatóak)',
		opt_phalanx_showDebris: 'Elméleti törmelék mutatása Phalanx nézetben',
		opt_evt_expandFleetsEvt: 'Flotta összetétele és szállítmány látható (eseménylista)',
		opt_evt_expandFleetsPhal: 'Flotta összetétele és szállítmány látható (Phalanx)',
		
		opt_galaxyShowRank: 'Játékos/Szövetség rangok Galaxis nézetben',
		opt_galaxyRankColor: 'Rangok színe',
		opt_galaxyDebrisMin: 'Törmelékmezők kiemelésének minimális mérete (0 a kikapcsoláshoz)',
		opt_galaxyDebrisColor: 'Kiemelés színe',
		opt_galaxyHideMoon: 'Hold képének elrejtése (helyette a mérete legyen látható)',
		opt_galaxy_Players: 'A következő játékosok kiemelése',
		opt_galaxy_PlayerColors: 'Kiemelés színe',
		opt_galaxy_Allys: 'A következő szövetségek kiemelése',
		opt_galaxy_AllyColors: 'Kiemelés színe',
		opt_galaxy_keepTipsPlanets: 'Tippek megtartása a bolygókhoz és holdakhoz',
		opt_galaxy_keepTipsDebris: 'Tippek megtartása a törmelékmezőhöz',
		
		opt_msg_PlunderThreshold: 'Elméleti rablás alsó határa (x1000)',
		opt_msg_DebrisThreshold: 'Elméleti törmelék alsó határa (x1000)',
		opt_msg_foldSmallPlunder: 'Dobja el a kémjelentéseket, ahol az elméleti rablás és törmelék nem éri el a minimumot',
		opt_msg_showPlunder: 'Mutassa az elméleti rablást a kémjelentésben',
		opt_msg_addButtons: 'Extra gombok az üzenetekhez',
		opt_msg_fixColors: 'Csatajelentések színeinek javítása',
		
		opt_fleet_showCapacity: 'Hajók sebessége és kapacitása látható',
		opt_fleet1_showResCalc: 'Nyersanyag számláló látható',
		opt_uni_maxPlayerScore: 'A legerősebb játékosnak 5M pontnál több van',
		opt_autocopyCoords: 'Koordináták automatikus másolása',
		opt_autocopyGlobal: 'Megjegyzi a koordinátákat (nemcsak ezen a lapon)',
		opt_fleet2_setTargetDF: 'Célpont beállítasa a törmelékmezőre, ha van szemetes a flottában',
		opt_fleet2_fixLayout: 'Flottainformáció elrendezésének javítása (2. oldal)',
		opt_fleet2_ShortLinks: 'Célpont gyorslinkek hozzáadása (2. oldal)',
		opt_fleet2_MoonColor: 'Holdak színe a listában',
		opt_fleet2_MoonsToEnd: 'Holdak kerüljenek a lista végére',
		opt_fleet2_expandLists: 'A lenyíló menük listázása külön (Sebesség, Gyorslinkek, ACS-ek)',
		opt_fleet2_checkProbeCapacity: 'Üzemanyag ellenőrzésének javítása (2. oldal)',
		
		opt_missionPriority: 'Missziók prioritása',
		
		opt_mvmt_expandFleets: 'Flotta hajóinak és szállítmányának kijelzése',
		opt_mvmt_showReversal: 'Flotta visszatérési ideje legyen látható',
		
		opt_missAttack: 'Támadás',
		opt_missColony: 'Kolónizáció',
		opt_missDeploy: 'Telepítés',
		opt_missDestroy: 'Holdrombolás',
		opt_missEspionage: 'Kémkedés',
		opt_missExpedition: 'Expedíció',
		opt_missFederation: 'ACS Támadás',
		opt_missHarvest: 'Betakarítás',
		opt_missHold: 'ACS Védés',
		opt_missTransport: 'Szállítás',
		opt_msg_addSimButton: 'WebSim-re küldés gomb hozzáadás a kémjelentéshez',
		
		lbl_missAttack: 'Támadás',
		lbl_missColony: 'Kolónizáció',
		lbl_missDeploy: 'Telepítés',
		lbl_missDestroy: 'Holdrombolás',
		lbl_missEspionage: 'Kémkedés',
		lbl_missExpedition: 'Expedíció',
		lbl_missFederation: 'ACS Támadás',
		lbl_missHarvest: 'Betakarítás',
		lbl_missHold: 'ACS Védés',
		lbl_missTransport: 'Szállítás',

		lbl_sectionGeneral: 'Alapbeállítások',
		lbl_sectionUniverse: 'Univerzum',
		lbl_sectionTime: 'Idő',
		lbl_sectionEventList: 'Eseménylista & Phalanx',
		lbl_sectionGalaxy: 'Galaxis',
		lbl_sectionMessages: 'Üzenetek',
		lbl_sectionFleetDispatch: 'Flotta összeállítás',
		lbl_sectionFleetMovement: 'Flottamozgás',
		
		lbl_optionsNote1: 'Ez a beállítás csak erre az univerzumra vonatkozik',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Teljes kapacitás',
		lbl_MinSpeed: 'Minimális sebesség',
		lbl_ExPoints: 'Expedíciós pontok',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Nyersanyagok',
		lbl_debris: 'Törmelék',
		lbl_total: 'Teljes',
		lbl_loot: 'Rablás',
		lbl_metal: 'Fém',
		lbl_crystal: 'Kristály',
		
		lbl_shipSCargoAlt: 'KSz',
		lbl_shipLCargoAlt: 'NSz',
		lbl_shipRecyclerAlt: 'Szem.',
		lbl_shipSatelliteAlt: 'Napműhold',
		
		lbl_deficientRes: 'Hiányzó nyersanyagok',
		lbl_Production: 'Termelés',
		lbl_ArrivalACS: 'Érkező (ACS)',
		
		lbl_btnMarkReadAll: 'Minden üzenet megjelölése olvasottként',
		lbl_btnDeleteSmallPlunder: 'Törölje a kémjelentéseket, ahol a zsákmány < $plunder és a törmelék < $debris',
		
		lbl_Moon: 'Hold',
		
		lbl_onTop: 'Fent',
		lbl_onBottom: 'Lent',
		lbl_onLeft: 'Bal oldalt',
		
		lbl_installNewVersion: 'Kattints a frissítéshez',
		lbl_Save: 'Mentés',
		lbl_Clear: 'Törlés',
		lbl_Quantity: 'Mennyiság',
		lbl_Duration: 'Időtartam',
		lbl_Consumption: 'Fogyasztás',
		
		lbl_tmTime: 'Idő',
		lbl_tmCountdown: 'Hátralévő'
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