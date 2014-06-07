// ==UserScript==
// @name           AntiGam_lang_de
// @description    AntiGame Übersetzung (Muss VOR dem AntiGame Script laufen) - 1.29.8
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsDE =
	{
		lbl_missAttack: 'Angreifen',
		lbl_missColony: 'Kolonisieren',
		lbl_missDeploy: 'Stationieren',
		lbl_missDestroy: 'Zerstören',
		lbl_missEspionage: 'Spionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'Verbandsangriff',
		lbl_missHarvest: 'Abbau',
		lbl_missHold: 'Halten',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Kleiner Transporter',
		lbl_shipLCargo: 'Großer Transporter',
		lbl_shipLFighter: 'Leichter Jäger',
		lbl_shipHFighter: 'Schwerer Jäger',
		lbl_shipCruiser: 'Kreuzer',
		lbl_shipBattleship: 'Schlachtschiff',
		lbl_shipColonizator: 'Kolonieschiff',
		lbl_shipRecycler: 'Recycler',
		lbl_shipSpy: 'Spionagesonde',
		lbl_shipBomber: 'Bomber',
		lbl_shipDestroyer: 'Zerstörer',
		lbl_shipRIP: 'Todesstern',
		lbl_shipBCruiser: 'Schlachtkreuzer',
		lbl_shipSatellite: 'Solarsatellit',

                lbl_defRLauncher: 'Raketenwerfer',
                lbl_defLLaser: 'Leichtes Lasergeschütz ',
                lbl_defHLaser: 'Schweres Lasergeschütz ',
                lbl_defGauss: 'Gaußkanone',
                lbl_defIon: 'Ionengeschütz',
                lbl_defPlasma: 'Plasmawerfer',
                lbl_defSShield: 'Kleine Schildkuppel',
                lbl_defLShield: 'Große Schildkuppel', 

		lbl_RequiredEnergy: 'Energiebedarf',

                rx_sendMail: /Sende Nachricht zu (.+)\./
		
	}

	AntiGame_lang.InterfaceDE =
	{
		opt_languageName: 'Deutsch',

		opt_title: 'AntiGame Optionen',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Abbr.',
		opt_btnDefault: 'Standard',

		opt_language: 'Sprache',
                opt_update_check: 'Automatisch nach Updates suchen',
                opt_thousandSeparator: 'Tausender trennen mit',
		opt_blockAutoComplete: 'Blocke automatisches Vervollständigen in Firefox',

		opt_showDeficient: 'Zeige fehlende Rohstoffe',
		opt_showResources: 'Zeige erweiterte Rohstoffinformationen',
                opt_showNames: 'Zeige Schiff/Gebäude/Forschungsname über dem Bild',
                opt_nameColorOn: 'Farbe für: verfügbar',
		opt_nameColorOff: 'Farbe für: nicht verfügbar',
		opt_nameColorDisabled: 'Farbe für: nicht genügend Ressourcen',
                opt_showConstructionTitle: 'Zeige im Bau befindliche Gebäude in der Plantenliste',
                opt_shortHeader: 'Planetenbild immer minimieren',
                opt_misc_scrollTitle: 'Zeit bis zum nächsten Ereignis in Titelleiste anzeigen',

                opt_uni_SpeedFactor: 'Geschwindigkteit des Universums',
                opt_uni_DFPercent: 'Anteil der Flotte im Trümmerfeld',
                opt_uni_DefenseToDF: 'Anteil der Verteidigung im Trümmerfeld', 

                opt_timeSetting: 'Ändere Zeitwerte (nur Stunden)',
                opt_showServerOgameClock: 'Behalte Serverzeit für Ogame-Uhr (oben rechts)',
                opt_showServerPhalanx: 'Behalte Serverzeit für Phalanx',
                opt_showPageStartTime: 'Zeige Zeit, wann die Seite zuletzt neu geladen wurde',
                opt_timeAMPM: 'Uhr auf AM/PM umstellen',

                opt_timeDontChange: 'Zeit nicht ändern',
                opt_timeLocal: 'Immer die lokale Zeitzone einstellen',
                opt_timeServer: 'Immer die Server-Zeitzone einstellen', 

                opt_killTips: 'Keine Tooltips',

		opt_evt_dimReverse: 'Zurückkehrende Flotten Schwach anzeigen',
		opt_phalanx_showDebris: 'Zeige theoretisches Trümmerfeld in der Phalanx',
		opt_evt_expandFleetsEvt: 'Zeige Flottenzusammenstellung (Eventliste)',
		opt_evt_expandFleetsPhal: 'Zeige Flottenzusammenstellung und Ladung (Phalanx)',

		opt_galaxyShowRank: 'Zeige Spieler/Allianz-Rang in der Galaxie',
		opt_galaxyRankColor: 'Spieler/Allianz-Rang Farben',
		opt_galaxyDebrisMin: 'Minimale Größe von Trümmerfeldern zeigen',
		opt_galaxyDebrisColor: 'Farbe des Trümmerfelds',
		opt_galaxyHideMoon: 'Verberge Mondbild (Zeigt nur die Größe)',
		opt_galaxy_Players: 'Hebt folgende Spieler hervor',
		opt_galaxy_PlayerColors: 'Farbe der hervorgehobenen Spieler',
		opt_galaxy_Allys: 'Hebt folgende Allianzen hervor',
		opt_galaxy_AllyColors: 'Farbe der hervorgehobnenen Allianzen',
		opt_galaxy_keepTipsPlanets: 'Behalte Tooltips für Planeten und Monde',
		opt_galaxy_keepTipsDebris: 'Behalte Tooltips für Trümmerfelder',

		opt_msg_PlunderThreshold: 'Mindestgröße für theoretische Beute (in K)',
		opt_msg_DebrisThreshold: 'Mindestgröße für theoretisches Trümmerfeld (in K)',
		opt_msg_foldSmallPlunder: 'Spionageberichte unter diesem Limit Unterschlagen',
		opt_msg_showPlunder: 'Zeige Beute in Spionageberichten',
		opt_msg_addButtons: 'Zusätzliche Nachrichtenbuttons',
		opt_msg_fixColors: 'Richtige Farben in Kampfberichten',

		opt_fleet_showCapacity: 'Zeige Schiffe, Kapazität, Geschwindigkeit',
                opt_fleet1_showResCalc: 'Zeige Ressourcenberechner',
                opt_autocopyCoords: 'Automatisches Kopieren der Koordinaten',
                opt_autocopyGlobal: 'Koordinaten von allen Internetseiten merken',
                opt_uni_maxPlayerScore: 'Der stärkste Spieler hat mehr als 5M Punkte',
		opt_fleet2_setTargetDF: 'Setze Ziel auf Trümmerfeld, wenn Recycler dabei sind',
		opt_fleet2_fixLayout: 'Verändere Anzeige (Flottenversand 2)',
		opt_fleet2_ShortLinks: 'Vorgegebene Shortlinks (Flottenversand 2)',
                opt_fleet2_MoonColor: 'Farbe für Monde in der Shortlinks-Liste',
		opt_fleet2_checkProbeCapacity: 'Prüfe Ladekapazität von Spionagesonden vor dem Abflug (Flottenversand 2)',
                opt_fleet2_MoonsToEnd: 'Monde am Ende der Shortlinks-Liste platzieren',
                opt_fleet2_expandLists: 'Erweiterte Dropdown-Menüs',

		opt_missionPriority: 'Auftragspriorität',
		
		opt_mvmt_expandFleets: 'Zeige Flotte, Schiffe und Laderraum',
		opt_mvmt_showReversal: 'Zeige Rückkehrzeit der Flotte',
		
		opt_missAttack: 'Auftragsfarbe: Angreifen',
		opt_missColony: 'Auftragsfarbe: Kolonisieren',
		opt_missDeploy: 'Auftragsfarbe: Stationieren',
		opt_missDestroy: 'Auftragsfarbe: Zerstören',
		opt_missEspionage: 'Auftragsfarbe: Spionage',
		opt_missExpedition: 'Auftragsfarbe: Expedition',
		opt_missFederation: 'Auftragsfarbe: Verbandsangriff',
		opt_missHarvest: 'Auftragsfarbe: Abbau',
		opt_missHold: 'Auftragsfarbe: Halten',
		opt_missTransport: 'Auftragsfarbe: Transport',
                opt_msg_addSimButton: 'Button hinzufügen um Spionageberichte zu Websim zu übertragen',

		lbl_missAttack: 'Angreifen',
		lbl_missColony: 'Kolonisieren',
		lbl_missDeploy: 'Stationieren',
		lbl_missDestroy: 'Zerstören',
		lbl_missEspionage: 'Spionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'Verbandsangriff',
		lbl_missHarvest: 'Abbau',
		lbl_missHold: 'Halten',
		lbl_missTransport: 'Transport',
						
		lbl_sectionGeneral: 'Allgemein',
                lbl_sectionUniverse: 'Universum',
                lbl_sectionTime: 'Zeit einstellen',
                lbl_sectionEventList: 'Ereignisliste und Phalanx',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Nachrichten',
		lbl_sectionFleetDispatch: 'Flotte versenden',
		lbl_sectionFleetMovement: 'Flottenbewegung',

                lbl_resetCoords: 'Zurücksetzen - ',

		lbl_TotalCapacity: 'Ladekapazität',
		lbl_MinSpeed: 'Minimale Geschwindigkeit',
		lbl_ExPoints: 'Expeditionspunkte',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Rohstoffe',
		lbl_debris: 'TF',
		lbl_total: 'Gesamt',
		lbl_loot: 'Beute',
		lbl_metal: 'Metall',
		lbl_crystal: 'Kristall',

		lbl_shipSCargoAlt: 'KT',
		lbl_shipLCargoAlt: 'GT',
		lbl_shipRecyclerAlt: 'Recs',
                lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Fehlende Rohstoffe',
		lbl_Production: 'Produktion',
		lbl_ArrivalACS: 'Ankunft (AKS)',

		lbl_btnMarkReadAll: 'Alle angezeigten Nachrichten als gelesen markieren',
		lbl_btnDeleteSmallPlunder: 'Spionageberichte mit < $plunder Beute und < $debris TF entfernen',

		lbl_Moon: 'Mond',

                lbl_onTop: 'Oben',
		lbl_onBottom: 'Unten',
                lbl_onLeft: 'Links',

                lbl_installNewVersion: 'Klicke hier für neue Version',
                lbl_Save: 'Speichern',
                lbl_Clear: 'Löschen',
                lbl_Quantity: 'Menge',
                lbl_Duration: 'Dauer',
                lbl_Consumption: 'Verbrauch',

                lbl_tmTime: 'Zeit',
		lbl_tmCountdown: 'Countdown'

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