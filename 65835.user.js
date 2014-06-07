// ==UserScript==
// @name           AntiGam_lang_PL
// @namespace      antikiller
// @description    AntiGame translation - Polish (must be run before main AntiGame)
// @version	1.18.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsPL =
	{
		lbl_missAttack: 'Atakuj',
		lbl_missColony: 'Kolonizuj',
		lbl_missDeploy: 'Stacjonuj',
		lbl_missDestroy: 'Niszcz',
		lbl_missEspionage: 'Szpieguj',
		lbl_missExpedition: 'Ekspedycja',
		lbl_missFederation: 'Atak związku',
		lbl_missHarvest: 'Redukuj pola zniszczeń',
		lbl_missHold: 'Zatrzymaj',
		lbl_missTransport: 'Transportuj',
		
		lbl_shipSCargo: 'Mały transporter',
		lbl_shipLCargo: 'Duży transporter',
		lbl_shipLFighter: 'Lekki myśliwiec',
		lbl_shipHFighter: 'Ciężki myśliwiec',
		lbl_shipCruiser: 'Krążownik',
		lbl_shipBattleship: 'Okręt wojenny',
		lbl_shipColonizator: 'Statek kolonizacyjny',
		lbl_shipRecycler: 'Recycler',
		lbl_shipSpy: 'Sonda szpiegowska',
		lbl_shipBomber: 'Bombowiec',
		lbl_shipDestroyer: 'Niszczyciel',
		lbl_shipRIP: 'Gwiazda Śmierci',
		lbl_shipBCruiser: 'Pancernik',
		lbl_shipSatellite: 'Satelita słoneczny',
		
		lbl_RequiredEnergy: 'Potrzebna energia'
	}
	
	AntiGame_lang.InterfacePL =
	{
		opt_languageName: 'Polski',
	
		opt_title: 'Opcje AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Anuluj',
		opt_btnDefault: 'Domyślne',

		opt_language: 'Język',
		opt_update_check: 'Sprawdzaj czy są aktualizacje',
		opt_thousandSeparator: 'Separator tysiąca',
		opt_blockAutoComplete: 'Blokuj autouzupełnianie w Firefox',
		
		opt_showDeficient: 'Pokazuj brakujące surowce',
		opt_showResources: 'Pokazuj rozszerzone informacje o surowcach',
		opt_showNames: 'Pokazuj nazwy statków/budynków/badań na obrazkach',
		opt_nameColorOn: 'Nazwa koloru: dostępne',
		opt_nameColorOff: 'Nazwa koloru: niedostępne',
		opt_nameColorDisabled: 'Nazwa koloru: brak surowców',
		opt_showConstructionTitle: 'Pokazuj nazwy budowanych konstrukcji pod nazwami planet',

		opt_uni_SpeedFactor: 'Współczynnik prędkości tego uniwersum',
		
		opt_timeSetting: 'Ustaw godzine',
		opt_showServerOgameClock: 'Nie zmieniaj czasu Ogame zegara z prawego górnego rogu',
		opt_showServerPhalanx: 'Nie zmieniaj czasu serwera dla widoku Falangi Czujników',
		opt_timeAMPM: 'Uzyj 12-godzinnego formatu (AM/PM) zamiast 24-godzinnego',
		
		opt_timeDontChange: 'Nie zmieniaj czasu',
		opt_timeLocal: 'Ustaw do lokalnej strefy czasowej',
		opt_timeServer: 'Ustaw do strefy czasowej serwera',

		opt_killTips: 'Usuń tooltipsy',

		opt_showEventList: 'Pokazuj pełna Listę Zdarzeń w Podglądzie',
		opt_evt_showOnTop: 'Pozycja Listy Zdarzeń na ekranie',
		opt_evt_noScroll: 'Nie pokazuj suwaków, gdy tooltipsy są wyświetlane',
		
		opt_galaxyShowRank: 'Pokazuj pozycje graczy/sojuszów w widoku Galaktyki',
		opt_galaxyRankColor: 'Kolor pozycji graczy/sojuszów',
		opt_galaxyDebrisMin: 'Minimalny rozmiar Pola Zniszczeń do podświetlenia (0&nbsp;wyłącza)',
		opt_galaxyDebrisColor: 'Kolor podświetlania Pola Zniszczeń',
		opt_galaxyHideMoon: 'Ukrywaj ikonę Księżyca, a pokazuj jego rozmiar',
		opt_galaxy_Players: 'Koloruj nazwy danych graczy',
		opt_galaxy_PlayerColors: 'Kolor nazwy danych graczy',
		opt_galaxy_Allys: 'Kolor nazwy danych sojuszy',
		opt_galaxy_AllyColors: 'Koloruj nazwy dane sojusze',
		opt_galaxy_keepTipsPlanets: 'Pozostaw tooltips dla planet i księżyców',
		opt_galaxy_keepTipsDebris: 'Pozostaw tooltips dla Pola Zniszczeń',
		
		opt_msg_PlunderThreshold: 'Minimalny teoretyczny rabunek (x1000)',
		opt_msg_DebrisThreshold: 'Minimalny rozmiar Pola Zniszczeń (x1000)',
		opt_msg_foldSmallPlunder: 'Zwijaj raporty z rabunkiem i odpadkami mniejszymi niż podany powyżej minimalny limit',
		opt_msg_showPlunder: 'Pokazuj rabunek w raportach szpiegowskich',
		opt_msg_addButtons: 'Dodatkowe przyciski w Wiadomościach',
		opt_msg_fixColors: 'Popraw kolory raportów wojennych',
		
		opt_fleet_showCapacity: 'Pokazuj pojemność i prędkość statków',
		opt_fleet1_showResCalc: 'Pokazuj kalkulator surowców',
		opt_autocopyCoords: 'Autokopiowanie koordynatów planet',
		opt_fleet2_setTargetDF: 'Ustawiaj cel: Pole Zniszczeń, jeśli flota zawiera Recyklery',
		opt_fleet2_fixLayout: 'Poprawiaj wygląd informacji o flocie (strona 2) [Nie działa poprawnie?]',
		opt_fleet2_ShortLinks: 'Pomocne linki (strona 2).<br />Format: G#S#P#T#N, gdzie:<br />G#S#P = koordynaty<br />T = 1 - planeta, 2 - szczątki, 3 - księżyc<br />N - nazwa, która jest opcjonalna<br />Kolejne wpisy oddzielamy przecinkiem ","',
		opt_fleet2_checkProbeCapacity: 'Sprawdzaj pojemność sond przed wyruszeniem (strona 2)',
		
		opt_missionPriority: 'Priorytety misji',
		
		opt_mvmt_expandFleets: 'Pokazuj w Ruchach Flot statki i zawartość ładowni',
		opt_mvmt_showReversal: 'Pokazuj czas powrotu po zawróceniu',
		
		opt_missAttack: 'Kolor misji: Atakuj',
		opt_missColony: 'Kolor misji: Kolonizuj',
		opt_missDeploy: 'Kolor misji: Stacjonuj',
		opt_missDestroy: 'Kolor misji: Niszcz',
		opt_missEspionage: 'Kolor misji: Szpieguj',
		opt_missExpedition: 'Kolor misji: Ekspedycja',
		opt_missFederation: 'Kolor misji: Atak związku',
		opt_missHarvest: 'Kolor misji: Redukuj pola zniszczeń',
		opt_missHold: 'Kolor misji: Zatrzymaj',
		opt_missTransport: 'Kolor misji: Transportuj',
		opt_msg_addSimButton: 'Dodaj przycisk do wysyłania raportów szpiegowskich do WebSim\'a',
		
		lbl_missAttack: 'Atakuj',
		lbl_missColony: 'Kolonizuj',
		lbl_missDeploy: 'Stacjonuj',
		lbl_missDestroy: 'Niszcz księżyc',
		lbl_missEspionage: 'Szpieguj',
		lbl_missExpedition: 'Ekspedycja',
		lbl_missFederation: 'Atak związku',
		lbl_missHarvest: 'Redukuj pola zniszczeń',
		lbl_missHold: 'Zatrzymaj',
		lbl_missTransport: 'Transportuj',

		lbl_sectionGeneral: 'Główne',
		lbl_sectionTime: 'Ustawienia czasu',
		lbl_sectionEventList: 'Lista Zdarzeń',
		lbl_sectionGalaxy: 'Galaktyka',
		lbl_sectionMessages: 'Wiadomości',
		lbl_sectionFleetDispatch: 'Wyświetlanie floty',
		lbl_sectionFleetMovement: 'Ruchy floty',
		
		lbl_optionsNote1: 'Te opcje są zapisane tylko dla tego uniwersum',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Pojemność',
		lbl_MinSpeed: 'Maksymalna prędkość',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Surowce',
		lbl_debris: 'Pole Zniszczeń',
		lbl_total: 'Razem',
		lbl_loot: 'Rabunek',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kryształ',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'DT',
		lbl_shipRecyclerAlt: 'Rec',
		
		lbl_deficientRes: 'Brakujące surowce',
		lbl_Production: 'Produkcja',
		lbl_ArrivalACS: 'Przybycie (ACS)',
		
		lbl_btnMarkReadAll: 'Zaznacz wszystkie wyświetlone wiadomości jako przeczytane',
		lbl_btnDeleteSmallPlunder: 'Usuń raporty szpiegowskie z rabunkiem < $plunder i odpadkami < $debris',
		
		lbl_Moon: 'Księżyc',
		
		lbl_onTop: 'Na górze',
		lbl_onBottom: 'Na dole',
		lbl_onLeft: 'Po lewej',
		
		lbl_installNewVersion: 'Kliknij, aby zainstalować nową wersję',
		lbl_Save: 'Zapisz',
		lbl_Clear: 'Wyczyść',
		lbl_Quantity: 'Ilość',
		lbl_Duration: 'Czas trwania',
		lbl_Consumption: 'Konsumpcja'
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