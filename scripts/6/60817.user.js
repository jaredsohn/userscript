// ==UserScript==
// @name           AntiGam_lang_bg
// @namespace      antikiller
// @description    AntiGame translation - Bulgarian (must be run before main AntiGame)
// @author         Vesselin Bontchev
// @version	   1.29.1
// @date           2011-05-28
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function ()
{
	var AntiGame_lang = {};

	AntiGame_lang.LabelsBG =
	{
		lbl_missAttack: 'Атака',
		lbl_missColony: 'Колонизация',
		lbl_missDeploy: 'Стационирай',
		lbl_missDestroy: 'Разрушаване на луна',
		lbl_missEspionage: 'Шпионирай',
		lbl_missExpedition: 'Експедиция',
		lbl_missFederation: 'СБС Атака',
		lbl_missHarvest: 'Рециклирай',
		lbl_missHold: 'СБС Защита',
		lbl_missTransport: 'Транспортирай',

		lbl_shipSCargo: 'Малък Транспортьор',
		lbl_shipLCargo: 'Голям Транспортьор',
		lbl_shipLFighter: 'Лек Изтребител',
		lbl_shipHFighter: 'Тежък Изтребител',
		lbl_shipCruiser: 'Кръстосвач',
		lbl_shipBattleship: 'Боен кораб',
		lbl_shipColonizator: 'Колонизатор',
		lbl_shipRecycler: 'Рециклатор',
		lbl_shipSpy: 'Шпионска сонда',
		lbl_shipBomber: 'Бомбардировач',
		lbl_shipDestroyer: 'Унищожител',
		lbl_shipRIP: 'Звезда на смъртта',
		lbl_shipBCruiser: 'Боен Кръстосвач',
		lbl_shipSatellite: 'Соларен сателит',

		lbl_defRLauncher: 'Ракетна установка',
		lbl_defLLaser: 'Лек лазер',
		lbl_defHLaser: 'Тежък лазер',
		lbl_defGauss: 'Гаус оръдие',
		lbl_defIon: 'Йонно оръдие',
		lbl_defPlasma: 'Плазмено оръдие',
		lbl_defSShield: 'Малък щит',
		lbl_defLShield: 'Голям щит',
		
		lbl_RequiredEnergy: 'Необходима енергия',
		
		rx_sendMail: /Изпрати съобщение на (.+)\./
	}

	AntiGame_lang.InterfaceBG =
	{
		opt_languageName: 'Български',

		opt_title: 'Настройки на AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Отказ',
		opt_btnDefault: 'Оригинални',

		opt_language: 'Език',
		opt_update_check: 'Автоматична проверка за нови версии',
		opt_thousandSeparator: 'Разделител за групите нули',
		opt_blockAutoComplete: 'Блокиране на autocomplete във Firefox',

		opt_showDeficient: 'Показване на липсващите ресурси',
		opt_showResources: 'Показване на допълнителна информация за ресурсите',
		opt_showNames: 'Показване на имената на корабите/сградите/проучванията върху картинките',
		opt_nameColorOn: 'Цвят на името: достъпно',
		opt_nameColorOff: 'Цвят на името: недостъпно',
		opt_nameColorDisabled: 'Цвят на името: недостатъчно ресурси',
		opt_showConstructionTitle: 'Показване на името на строящите се сгради в списъка планети',
		opt_shortHeader: 'Минимизиране на картинката на планетата на страниците за изпращне на флот',
		opt_misc_scrollTitle: 'Показване на времето до следващото събитие в заглавието на прозореца',

		opt_uni_reDesigned: 'Това е стара вселена, конвертирана до новия дизайн',
		opt_uni_SpeedFactor: 'Множител на скоростта на тази вселена',
		opt_uni_DFPercent: 'Процент от корабите, ставащ на рециклаж',
		opt_uni_DefenseToDF: 'Процент от защитите, ставащ на рециклаж',

		opt_timeSetting: 'Променяне на времената (само часовете)',
		opt_showServerOgameClock: 'Часовникът в горния десен ъгъл да показва сърверно време',
		opt_showServerPhalanx: 'Времето на Сензора да е сърверно',
		opt_showPageStartTime: 'Показване на времето на последно обновяване на страницата',
		opt_timeAMPM: 'Използване на 12-часов формат на времето (AM/PM) вместо 24-часов',

		opt_timeDontChange: 'Да не се променят времената',
		opt_timeLocal: 'Винаги по местно време',
		opt_timeServer: 'Винаги по сърверно време',

		opt_killTips: 'Премахване на подсказките',

		opt_evt_dimReverse: 'Потъмняване на връщащите се флоти',
		opt_phalanx_showDebris: 'Показване на теоретичния рециклаж в доклада на сензора',
		opt_evt_expandFleetsEvt: 'Показване на състава и товара на флотите (Списък събития)',
		opt_evt_expandFleetsPhal: 'Показване на състава и товара на флотите (Сензор)',

		opt_galaxyShowRank: 'Показване на ранга на играчите и съюзите в режим Галактика',
		opt_galaxyRankColor: 'Оцветяване на играчите и съюзите според ранга',

		opt_galaxyDebrisMin: 'Минимален размер на рециклажа за оцветяване (0 за изключване)',
		opt_galaxyDebrisColor: 'Оцветяване големите рециклажи',
		opt_galaxyHideMoon: 'Скриване на картинката на луната (показване само на размера на луната с цифри)',
		opt_galaxy_Players: 'Оцветяване на следните играчи',
		opt_galaxy_PlayerColors: 'Цветове за оцветяване на играчите',
		opt_galaxy_Allys: 'Оцветяване на следните съюзи',
		opt_galaxy_AllyColors: 'Цветове за оцветяване на съюзите',
		opt_galaxy_keepTipsPlanets: 'Запазване на подсказките за луните и планетите',
		opt_galaxy_keepTipsDebris: 'Запазване на подсказките за рециклажа',

		opt_msg_PlunderThreshold: 'Долна граница за възможната плячка (x1000)',
		opt_msg_DebrisThreshold: 'Долна граница за възможния рециклаж (x1000)',
		opt_msg_foldSmallPlunder: 'Затваряне на шпионските доклади с възможни плячка и рециклаж под указаните граници',
		opt_msg_showPlunder: 'Показване на нужните кораби за пълен грабеж в шпионските доклади',
		opt_msg_fixColors: 'Поправка на цветовете на бойните доклади',
		opt_msg_addButtons: 'Допълнителни бутони на съобщенията',

		opt_fleet_showCapacity: 'Показване на товароподемността и скоростта на корабите',
		opt_fleet1_showResCalc: 'Показване на калкулатора за ресурси',
		opt_uni_maxPlayerScore: 'Най-силният играч във вселената има повече от 5M точки',
		opt_autocopyCoords: 'Автокопиране на координатите',
		opt_autocopyGlobal: 'Запомняне на координатите, маркирани в кой да е таб (не само в тези на играта)',
		opt_fleet2_setTargetDF: 'Установяване на рециклажа като цел на полета, ако флотът съдържа рециклатори',
		opt_fleet2_fixLayout: 'Оправяне на формата на информацията за изпращане на флота (страница 2)',
		opt_fleet2_ShortLinks: 'Списък преки пътища за целта (страница 2)',
		opt_fleet2_MoonColor: 'Цвят на луните в списъка преки пътища',
		opt_fleet2_MoonsToEnd: 'Преместване на луните в края на списъка преки пътища',
		opt_fleet2_expandLists: 'Разгръщане на падащите списъци (Скорост, Преки пътища, СБС)',
		opt_fleet2_checkProbeCapacity: 'Проверка на вместимостта на горивния резервоар на шпионските сонди преди изпращането им (страница 2)',

		opt_missionPriority: 'Приоритети на заданията',

		opt_mvmt_expandFleets: 'Показване състава и товара на флотите',
		opt_mvmt_showReversal: 'Показване на времето за връщане на флотите',

		opt_missAttack: 'Цвят на задачата: Атака',
		opt_missColony: 'Цвят на задачата: Колонизация',
		opt_missDeploy: 'Цвят на задачата: Стациониране',
		opt_missDestroy: 'Цвят на задачата: Разрушаване',
		opt_missEspionage: 'Цвят на задачата: Шпионаж',
		opt_missExpedition: 'Цвят на задачата: Експедиция',
		opt_missFederation: 'Цвят на задачата: СБС-Атака',
		opt_missHarvest: 'Цвят на задачата: Рециклиране',
		opt_missHold: 'Цвят на задачата: СБС-Защита',
		opt_missTransport: 'Цвят на задачата: Транспортиране',
		opt_msg_addSimButton: 'Добавяне на бутон за предаване на шпионските доклади на WebSim',

		lbl_missAttack: 'Атака',
		lbl_missColony: 'Колонизация',
		lbl_missDeploy: 'Стационирай',
		lbl_missDestroy: 'Разрушаване на луна',
		lbl_missEspionage: 'Шпионирай',
		lbl_missExpedition: 'Експедиция',
		lbl_missFederation: 'СБС Атака',
		lbl_missHarvest: 'Рециклирай',
		lbl_missHold: 'СБС Защита',
		lbl_missTransport: 'Транспортирай',

		lbl_sectionGeneral: 'Общи',
		lbl_sectionUniverse: 'Вселена',
		lbl_sectionTime: 'Настройки за времената',
		lbl_sectionEventList: 'Списък събития и сензор',
		lbl_sectionGalaxy: 'Галактика',
		lbl_sectionMessages: 'Съобщения',
		lbl_sectionFleetDispatch: 'Изпратен флот',
		lbl_sectionFleetMovement: 'Местене на флота',

		lbl_optionsNote1: 'Опцията се запомня само за тази вселена',

		lbl_resetCoords: 'Нулиране - ',
		
		lbl_TotalCapacity: 'Вместимост на трюмовете',
		lbl_MinSpeed: 'Минимална скорост',
		lbl_ExPoints: 'Експедиционни точки',

		lbl_mvmt_Return: 'В',

		lbl_resources: 'Ресурси',
		lbl_debris: 'Рециклаж',
		lbl_total: 'Общо',
		lbl_loot: 'Плячка',
		lbl_metal: 'Метал',
		lbl_crystal: 'Кристали',

		lbl_shipSCargoAlt: 'МТ',
		lbl_shipLCargoAlt: 'ГТ',
		lbl_shipRecyclerAlt: 'Реци',
		lbl_shipSatelliteAlt: 'Сат.',

		lbl_deficientRes: 'Липсващи ресурси',
		lbl_Production: 'Продукция',
		lbl_ArrivalACS: 'Пристигане (СБС)',
		lbl_btnMarkReadAll: 'Маркиране на всички показани съобщения като прочетени',
		lbl_btnDeleteSmallPlunder: 'Изтриване на шпионските доклади с плячка < $plunder и рециклаж < $debris',

		lbl_Moon: 'Луна',
		
		lbl_onTop: 'Отгоре',
		lbl_onBottom: 'Отдолу',
		lbl_onLeft: 'Вляво',

		lbl_installNewVersion: 'Цъкнете тук за да инсталирате новата версия',
		lbl_Save: 'Запазване',
		lbl_Clear: 'Изчистване',
		lbl_Quantity: 'Количество',
		lbl_Duration: 'Времетраене',
		lbl_Consumption: 'Консумация на гориво',
		
		lbl_tmTime: 'Време',
		lbl_tmCountdown: 'Брояч за обратно броене'
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
