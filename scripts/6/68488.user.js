// ==UserScript==
// @name           AntiGam_lang_rs
// @namespace      antikiller
// @description    AntiGame translation - Serbian (must be run before main AntiGame)
// @version	1.20.1
// @include        http://*.ogame.rs/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsEN =
	{
		lbl_missAttack: 'Напад',
		lbl_missColony: 'Колонизација',
		lbl_missDeploy: 'Стационажа',
		lbl_missDestroy: 'Уништење Месеца',
		lbl_missEspionage:  'Шпијунажа',
		lbl_missExpedition: 'Експедиција',
		lbl_missFederation: 'АКС Напад',
		lbl_missHarvest: 'Рециклирај рушевине',
		lbl_missHold: 'АКС Одбрана',
		lbl_missTransport: 'Транспорт',
		
		lbl_shipSCargo: 'Мали транспортер',
		lbl_shipLCargo: 'Велики транспортер',
		lbl_shipLFighter: 'Лаки ловац',
		lbl_shipHFighter: 'Тешки ловац',
		lbl_shipCruiser: 'Крстарица',
		lbl_shipBattleship: 'Борбени брод',
		lbl_shipColonizator: 'Колонзациони брод',
		lbl_shipRecycler: 'Рециклер',
		lbl_shipSpy:  'Шпијунске сонде',
		lbl_shipBomber: 'Бомбардер',
		lbl_shipDestroyer: 'Разарач',
		lbl_shipRIP: 'Звезда Смрти',
		lbl_shipBCruiser: 'Оклопна крстарица',
		lbl_shipSatellite: 'Соларни сателит',
		
		lbl_RequiredEnergy: 'Потребна енергија',
		
		rx_sendMail: /Пошаљи поруку (.+)\./,
		lbl_ownFleet: 'Флота'
		
	}
	
	AntiGame_lang.InterfaceEN =
	{
		opt_languageName: 'Српски',
	
		opt_title: 'АнтиГаме Подешавања',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Поништи',
		opt_btnDefault: 'Default',

		opt_language: 'Језик',
		opt_update_check: 'Аутоматски тажи апдејт',
		opt_thousandSeparator: 'Thousand separator',
		opt_blockAutoComplete: 'Block Auto-Complete in Firefox',
		
		opt_showDeficient: 'Прикажи ресурсе који недостају',
		opt_showResources: 'Прикажи проширене информације о ресурсима',
		opt_showNames: 'Прикажи имена преко слика бродова/жграда/истраживања',
		opt_nameColorOn: 'Назив боје: доступна',
		opt_nameColorOff: 'Назив боје: недоступна',
		opt_nameColorDisabled: 'Назив боје: нема довољно ресурса',
		opt_showConstructionTitle: 'Прикажи имена зграда на листи планета',

		opt_uni_SpeedFactor: 'Фактор брзине универзума',
		
		opt_timeSetting: 'Промени време (само сате)',
		opt_showServerOgameClock: 'Задржи време сервера са горњег-десног Огаме сата',
		opt_showServerPhalanx: 'Задрзи време сервера за Сензор Фалангу',
		opt_timeAMPM: 'Користи 12-часовни формат уместо 24-часовног',
		
		opt_timeDontChange: 'Немој променити време',
		opt_timeLocal: 'Увек намести на локалну часовну зону',
		opt_timeServer: 'Увек намести на часовну зону сервера',

		opt_killTips: 'Непоказуј толтипсе',

		opt_showEventList: 'Приказуј отворену листу догађања на Прегледу',
		opt_evt_showOnTop: 'Позиција листе догађања на Прегледу',
		opt_evt_noScroll: 'Нема фрејм скролбара на приказу толтипса',
		
		opt_galaxyShowRank: 'Прикажи ранг играча/савеза на прегледу галаксије',
		opt_galaxyRankColor: 'Боја ранга играча/савеза',
		opt_galaxyDebrisMin: 'Минимална величина рушевина које да буду означене (0 да се искључи)',
		opt_galaxyDebrisColor: 'Боја означених рушевина',
		opt_galaxyHideMoon: 'Сакри слику месеца (уместо слике прикажи величину)',
		opt_galaxy_Players: 'Означи следеће играче',
		opt_galaxy_PlayerColors: 'Боја за означавање играча',
		opt_galaxy_Allys: 'Означи следеће савезе',
		opt_galaxy_AllyColors: 'Боја за означавање савеза',
		opt_galaxy_keepTipsPlanets: 'Задржи толтипсе за планете и месеце',
		opt_galaxy_keepTipsDebris: 'Задржи тултипсе за рушевине',
		
		opt_msg_PlunderThreshold: 'Доња граница за теоретски плен (x1000)',
		opt_msg_DebrisThreshold: 'Доња граница за теоретске рушевине (x1000)',
		opt_msg_foldSmallPlunder: 'Сакриј извештаје плена и рушевина који су мањи од доње границе',
		opt_msg_showPlunder: 'Прикажи плен у ижвештајима шпијунаже',
		opt_msg_addButtons: 'Додатни дугмићи у Порукама',
		opt_msg_fixColors: 'Поправи боје од извештаја борби',
		
		opt_fleet_showCapacity: 'Прикажи капацитет бродова и брзину',
		opt_fleet1_showResCalc: 'Прикажи какулатор за ресурсе',
		opt_autocopyCoords: 'Аутоматски копирај кординате',
		opt_fleet2_setTargetDF: 'Намести мисију на Рушевине, ако флота укључује рециклере',
		opt_fleet2_fixLayout: 'Поправи информације лета (страна 2)',
		opt_fleet2_ShortLinks: 'Пречице ка мети (страна 2)',
		opt_fleet2_checkProbeCapacity: 'Провери капацитет сонда прије слања (страна 2)',
		
		opt_missionPriority: 'Важност мисија',
		
		opt_mvmt_expandFleets: 'Прикажи бродове и терет флоте',
		opt_mvmt_showReversal: 'Прикажи време повратка флоте',
		
		opt_missAttack: 'Боја мисије: Напад',
		opt_missColony: 'Боја мисије: Колонизација',
		opt_missDeploy: 'Боја мисије: Стационажа',
		opt_missDestroy: 'Боја мисије: Уништење Месеца',
		opt_missEspionage: 'Боја мисије: Шпијунажа',
		opt_missExpedition: 'Боја мисије: Eкспедиција',
		opt_missFederation: 'Боја мисије: АКС Напад',
		opt_missHarvest: 'Боја мисије: Рециклирај рушевине',
		opt_missHold: 'Боја мисије: Рециклирај рушевине',
		opt_missTransport: 'Боја мисије: Транспорт',
		opt_msg_addSimButton: 'Додај дугмиђ за симулацију са WebSim-ом',
		
		lbl_missAttack: 'Напад',
		lbl_missColony: 'Колонизација',
		lbl_missDeploy: 'Стационажа',
		lbl_missDestroy: 'Уништење Месеца',
		lbl_missEspionage:  'Шпијунажа',
		lbl_missExpedition: 'Експедиција',
		lbl_missFederation: 'АКС Напад',
		lbl_missHarvest: 'Рециклирај рушевине',
		lbl_missHold: 'Рециклирај рушевине',
		lbl_missTransport: 'Транспорт',

		lbl_sectionGeneral: 'Опште',
		lbl_sectionTime: 'Подешавање времена',
		lbl_sectionEventList: 'Листа догађаја',
		lbl_sectionGalaxy: 'Галаксија',
		lbl_sectionMessages: 'Поруке',
		lbl_sectionFleetDispatch: 'Слање флоте',
		lbl_sectionFleetMovement: 'Кретање флоте',
		
		lbl_optionsNote1: 'Подешаванја су сачувана само за овај универзум',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Тотални капацитет',
		lbl_MinSpeed: 'Минимална брзина',
		lbl_ExPoints: 'Поени експедиције',
		lbl_mvmt_Return: 'Повратак',
		lbl_mvmt_Expedition: 'Eкспедиција',
		
		lbl_resources: 'Reсурси',
		lbl_debris: 'Рушевине',
		lbl_total: 'Укупно',
		lbl_loot: 'Плен',
		lbl_metal: 'Mетал',
		lbl_crystal: 'Кристал',
		
		lbl_shipSCargoAlt: 'М.транс.',
		lbl_shipLCargoAlt: 'В.транс.',
		lbl_shipRecyclerAlt: 'Рециклера',
		
		lbl_deficientRes: 'РЕсурси који недостају',
		lbl_Production: 'Производња',
		lbl_ArrivalACS: 'Долазак (АКС)',
		
		lbl_btnMarkReadAll: 'Обележи све приказане поруке као прочитане',
		lbl_btnDeleteSmallPlunder: 'Обриши известаје шпијунажа са пленом < $plunder и рушевинама < $debris',
		
		lbl_Moon: 'Mесец',
		
		lbl_onTop: 'На врху',
		lbl_onBottom: 'На дну',
		lbl_onLeft: 'Лево',
		
		lbl_installNewVersion: 'Притисните да инстаалирате нову верзију',
		lbl_Save: 'Сачувај',
		lbl_Clear: 'Очисти',
		lbl_Quantity: 'Количина',
		lbl_Duration: 'Трајанје',
		lbl_Consumption: 'Потрошнја'
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