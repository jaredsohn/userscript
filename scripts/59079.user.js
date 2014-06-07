// ==UserScript==
// @name           AntiGam_lang_all
// @namespace      antikiller
// @description    AntiGame translation (must be run before main AntiGame) - v1.9.0
// @version	1.9.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

// Changelog:
/*
	26.12.2099 v.1.9.0
	Czech added
	
	30.11.2009	v1.8.0
	Italian added
	Romanian added
	Slovenian added
	
	BG: 1.13.8
	HR: 1.13.5
	DE: 1.13.8
	FR: 1.13.8
	IT: 1.13.7
	PT: 1.13.7
	RO: 1.13.8
	SI: 1.13.3

	01.11.2009	v1.7.0
	Croatian translation added
	
	29.10.2009	v1.6.2
	BG: up-to-date (1.10.1)
	DE: up-to-date (1.10.1)
	PT: up-to-date (1.10.1)

	21.10.2009	v1.6.1
	BG: up-to-date (1.9.0)
	ES: up-to-date (1.9.0)
	DE: up-to-date (1.9.0)
	FI: up-to-date (1.9.0)
	PT: up-to-date (1.9.0)

//	19.10.2009	v1.6.0
//	DA: up-to-date (1.8.0)
//	French translation added

//	18.10.2009	v1.5.0
//	Danish translation added (not complete, though)
//	BG: up-to-date (1.8.0)
//	FI: up-to-date (1.8.0)
//	

//	17.10.2009	v1.4.2
//	BG: up-to-date except lbl_btnDeleteSmallPlunder
//	DE: up-to-date (1.8.0)
//	PT: as for Antigame v1.7.3

// 12.10.2009	v1.4.1
// DE: up-to-date
// PT: up-to-date except lbl_btnDeleteSmallPlunder

// 12.10.2009	v1.4.0
// German translation
// PT: updated

// 10.10.2009	v1.3.1
//	BG: lbl_ArrivalACS, lbl_btnMarkReadAll

// 10.10.2009	v1.3.0
//	Spanish translation
//	lbl_btnMarkReadAll (FI only)

// 09.10.2009	v1.2.0
//	Portuguese translation
//	lbl_ArrivalACS in Finnish

// 04.10.2009	v1.1.1
//	Added translation for missing resources

// 04.10.2009	v1.1
//	Translation for loot/debris section

// 03.10.2009	v1.0
//	Initial release
//	Bulgarian, Finnish
*/

(function () {
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

		lbl_RequiredEnergy: 'Необходима енергия'
	}

	AntiGame_lang.InterfaceBG =
	{
		opt_languageName: 'Български',

		opt_title: 'Настройки на AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Отказ',
		opt_btnDefault: 'Оригинални',

		opt_language: 'Език',
		opt_autocopyCoords: 'Автокопиране на координатите',
		opt_showLocalTime: "Показване на локалното време вместо на сърверното (само за часовете)",
		opt_showServerOgameClock: 'Часовникът в горния десен ъгъл да показва сърверно време',
		opt_blockAutoComplete: 'Блокиране на autocomplete във Firefox',

		opt_showDeficient: 'Показване на липсващите ресурси',
		opt_showResources: 'Показване на допълнителна информация за ресурсите',
		opt_showNames: 'Показване на имената на корабите/сградите/проучванията върху картинките',
		opt_nameColorOn: 'Цвят на името: достъпно',
		opt_nameColorOff: 'Цвят на името: недостъпно',
		opt_nameColorDisabled: 'Цвят на името: недостатъчно ресурси',
		
		opt_uni_SpeedFactor: 'Множител на скоростта на тази вселена',

		opt_killTips: 'Премахване на подсказките',

		opt_showEventList: 'Показване на разгърнатия списък полети в Общ изглед',
		opt_evt_showOnTop: 'Място на разгърнатия списък полети на екрана',
		opt_evt_noScroll: 'Да не се показват рамки при показване на подсказки',

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
		opt_fleet2_setTargetDF: 'Установяване на рециклажа като цел на полета, ако флотът съдържа рециклатори',
		opt_fleet2_fixLayout: 'Оправяне на формата на втората страница за изпращане на флота',
		opt_fleet2_ShortLinks: 'Списък преки пътища',

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
		lbl_sectionEventList: 'Списък полети',
		lbl_sectionGalaxy: 'Галактика',
		lbl_sectionMessages: 'Съобщения',
		lbl_sectionFleetDispatch: 'Изпратен флот',
		lbl_sectionFleetMovement: 'Местене на флота',

		lbl_optionsNote1: 'Опцията се запомня само за тази вселена',

		lbl_resetCoords: 'Нулиране - ',
		
		lbl_TotalCapacity: 'Вместимост на трюмовете',
		lbl_MinSpeed: 'Минимална скорост',

		lbl_mvmt_Return: 'В',
		lbl_mvmt_Expedition: 'Е',

		lbl_resources: 'Ресурси',
		lbl_debris: 'Рециклаж',
		lbl_total: 'Общо',
		lbl_loot: 'Плячка',
		lbl_metal: 'Метал',
		lbl_crystal: 'Кристали',

		lbl_shipSCargoAlt: 'МТ',
		lbl_shipLCargoAlt: 'ГТ',
		lbl_shipRecyclerAlt: 'Реци',

		lbl_deficientRes: 'Липсващи ресурси',
		lbl_Production: 'Продукция',
		lbl_ArrivalACS: 'Пристигане (СБС)',
		lbl_btnMarkReadAll: 'Маркиране на всички показани съобщения като прочетени',
		lbl_btnDeleteSmallPlunder: 'Изтриване на шпионските доклади с плячка < $plunder и рециклаж < $debris',

		lbl_Moon: 'Луна',
		
		lbl_onTop: 'Отгоре',
		lbl_onBottom: 'Отдолу',
		lbl_onLeft: 'Вляво'
	}
	
	AntiGame_lang.LabelsCZ =
	{
		lbl_missAttack: 'Útok',
		lbl_missColony: 'Kolonizace',
		lbl_missDeploy: 'Rozmístění',
		lbl_missDestroy: 'Likvidace měsíce',
		lbl_missEspionage: 'Špionáž',
		lbl_missExpedition: 'Expedice',
		lbl_missFederation: 'APP Útok',
		lbl_missHarvest: 'Vytěžit pole trosek',
		lbl_missHold: 'APP Obrana',
		lbl_missTransport: 'Transport',

		lbl_shipSCargo: 'Malý transportér',
		lbl_shipLCargo: 'Velký transportér',
		lbl_shipLFighter: 'Lehký stíhač',
		lbl_shipHFighter: 'Těžký stíhač',
		lbl_shipCruiser: 'Křižník',
		lbl_shipBattleship: 'Bitevní loď',
		lbl_shipColonizator: 'Kolonizační loď',
		lbl_shipRecycler: 'Recyklátor',
		lbl_shipSpy: 'Špionážní sonda',
		lbl_shipBomber: 'Bombardér',
		lbl_shipDestroyer: 'Destroyer',
		lbl_shipRIP: 'Hvězda smrti',
		lbl_shipBCruiser: 'Bitevní křižník',
		lbl_shipSatellite: 'Solární satelit',

		lbl_RequiredEnergy: 'Spotřeba energie'
	}

	AntiGame_lang.InterfaceCZ =
	{
		opt_languageName: 'Čeština',

		opt_title: 'AntiGame Nastavení',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Zrušit',
		opt_btnDefault: 'Základní',

		opt_language: 'Jazyk',
		opt_thousandSeparator: 'Oddělovač tisíců',
		opt_blockAutoComplete: 'Blokovat Automatické doplnění ve Firefox',

		opt_showDeficient: 'Zobrazovat chybějící suroviny',
		opt_showResources: 'Zobrazovat rozšířené informace o surovinách',
		opt_showNames: 'Zobrazovat názvy lodí/budov/výzkumů nad obrázkem',
		opt_nameColorOn: 'Barva pro: dostupný',
		opt_nameColorOff: 'Barva pro: nedostupný',
		opt_nameColorDisabled: 'Barva pro: nedostatek surovin',
		opt_showConstructionTitle: 'Zobrazovat názvy staveb v listu planet',

		opt_uni_SpeedFactor: 'Rychlost tohoto vesmíru',

		opt_timeSetting: 'Měnit čas (hodiny)',
		opt_showServerOgameClock: 'Seřizovat čas podle serveru',
		opt_showServerPhalanx: 'Seřizovat čas podle serveru pro Falangské zobrazení',
		opt_timeAMPM: 'Používat 12ti hodinový formát času (AM/PM) místo 24 hodinového',

		opt_timeDontChange: 'Neměnit čas',
		opt_timeLocal: 'Nastavit podle časové zóny',
		opt_timeServer: 'Nastavit podle serveru',

		opt_killTips: 'Nezobrazovat popisky i po najetí myši na odkaz',

		opt_showEventList: 'Zobrazovat úplný list událostí v přehledu',
		opt_evt_showOnTop: 'Umístění listu událostí na obrazovce',
		opt_evt_noScroll: 'Zakázat scroolbary při zobrazení popisku',

		opt_galaxyShowRank: 'Zobrazovat umístění hráčů/aliancí v galaxii',
		opt_galaxyRankColor: 'Barva umístění hráčů/aliancí',
		opt_galaxyDebrisMin: 'Minimální množství trosek pro upozornění (0 je vypnuto)',
		opt_galaxyDebrisColor: 'Barva upozornění na trosky',
		opt_galaxyHideMoon: 'Skrýt obrázky měsíců (zobrazovat raději velikost měsíce)',
		opt_galaxy_Players: 'Upozornit na připlouvající hráče',
		opt_galaxy_PlayerColors: 'Barva upozornění připlouvajících hráčů',
		opt_galaxy_Allys: 'Upozornit na připlouvající aliance',
		opt_galaxy_AllyColors: 'Barva upozornění připlouvajících aliancí',
		opt_galaxy_keepTipsPlanets: 'Popisky pro planety a měsíce',
		opt_galaxy_keepTipsDebris: 'Popisky pro pole trosek',

		opt_msg_PlunderThreshold: 'Minimum pro kořist (x1000)',
		opt_msg_DebrisThreshold: 'Minimum pro pole trosek (x1000)',
		opt_msg_foldSmallPlunder: 'Ukládat hlášení s kořistí nebo vytěženým polem trosek menším než je limit',
		opt_msg_showPlunder: 'Zobrazovat kořist ve špionážní zprávě',
		opt_msg_addButtons: 'Pomocná tlačítka pro Zprávy',
		opt_msg_fixColors: 'Opravit barvy válečných hlášení',

		opt_fleet_showCapacity: 'Zobrazovat rychlost a kapacitu lodí',
		opt_autocopyCoords: 'Automaticky kopírovat souřadnice',
		opt_fleet2_setTargetDF: 'Nastavit plán na pole trosek pokud flotila obsahuje recyklátory',
		opt_fleet2_fixLayout: 'Opravit informace o letech na straně 2',
		opt_fleet2_ShortLinks: 'Link na straně 2',
		opt_fleet2_checkProbeCapacity: 'Ověřit kapacitu sondy před odletem (strana 2)',

		opt_missionPriority: 'Priorita misí',

		opt_mvmt_expandFleets: 'Zobrazovat flotilu lodí a nákladu',
		opt_mvmt_showReversal: 'Zobrazovat čas návratu flotily',

		opt_missAttack: 'Barva Mise: Útok',
		opt_missColony: 'Barva Mise: Kolonizace',
		opt_missDeploy: 'Barva Mise: Rozmístění',
		opt_missDestroy: 'Barva Mise: Likvidace měsíce',
		opt_missEspionage: 'Barva Mise: Špionáž',
		opt_missExpedition: 'Barva Mise: Expedice',
		opt_missFederation: 'Barva Mise: APP Útok',
		opt_missHarvest: 'Barva Mise: Vytěžit pole trosek',
		opt_missHold: 'Barva Mise: APP Obrana',
		opt_missTransport: 'Barva Mise: Transport',
		opt_msg_addSimButton: 'Přidat tlačítka pro potvrzení špionážních zpráv v přehledu',

		lbl_missAttack: 'Útok',
		lbl_missColony: 'Kolonizace',
		lbl_missDeploy: 'Rozmístění',
		lbl_missDestroy: 'Likvidace měsíce',
		lbl_missEspionage: 'Špionáž',
		lbl_missExpedition: 'Expedice',
		lbl_missFederation: 'APP Útok',
		lbl_missHarvest: 'Vytěžit pole trosek',
		lbl_missHold: 'APP Obrana',
		lbl_missTransport: 'Transport',

		lbl_sectionGeneral: 'Hlavní',
		lbl_sectionTime: 'Nastavení času',
		lbl_sectionEventList: 'List událostí',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Zprávy',
		lbl_sectionFleetDispatch: 'Vyslání flotil',
		lbl_sectionFleetMovement: 'Pohyb flotil',

		lbl_optionsNote1: 'Nastavení je uloženo pouze pro tento vesmír',

		lbl_resetCoords: 'Resetovat - ',

		lbl_TotalCapacity: 'Celková kapacita',
		lbl_MinSpeed: 'Minimální rychlost',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',

		lbl_resources: 'Suroviny',
		lbl_debris: 'Pole trosek',
		lbl_total: 'Celková',
		lbl_loot: 'Kořist',
		lbl_metal: 'Kov',
		lbl_crystal: 'Krystaly',

		lbl_shipSCargoAlt: 'SC',
		lbl_shipLCargoAlt: 'LC',
		lbl_shipRecyclerAlt: 'Recs',

		lbl_deficientRes: 'Chybějící suroviny',
		lbl_Production: 'Produkce',
		lbl_ArrivalACS: 'Přílet (APP)',

		lbl_btnMarkReadAll: 'Označit všechny zprávy jako přečtené',
		lbl_btnDeleteSmallPlunder: 'Smazat špionážní zprávy s kořistí < $plunder a s polem trosek < $debris',

		lbl_Moon: 'Měsíc',

		lbl_onTop: 'Nahoře',
		lbl_onBottom: 'Dole',
		lbl_onLeft: 'Vlevo'
	}

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
		opt_btnDefault: 'Standart',

		opt_language: 'Sprog',  
		opt_autocopyCoords: 'Auto-kopier koordinater',  
		opt_showLocalTime: "Vis lokal tid i stedet for server tid",  
		opt_blockAutoComplete: 'Bloker auto complete i Firefox',  

		opt_galaxyShowRank: 'Vis spiller/alliance ranks i Galakse oversigt',  
		opt_galaxyRankColor: 'Spiller/alliance ranks farver',  

		opt_galaxyDebrisMin: 'Minimum størrelse af ruin mark til highlight (sæt til 0 for at slå fra)',  
		opt_galaxyDebrisColor: 'Farve til highlighted ruin mark',  

		opt_msg_PlunderThreshold: 'Lav grænse for teoretisk udplyndre (x1000)',
		opt_msg_DebrisThreshold: 'Lav grænse for teoretisk ruinmark (x1000)',
		opt_msg_foldSmallPlunder: 'hvis ikke rapporter med plyndring og ruinmarker der er mindre end den grænse',
		opt_msg_showPlunder: 'Vis mængde af resurser der kan hentes i spy raport',  
		opt_msg_fixColors: 'Fix farver i kamp rapporter',  
		opt_msg_addButtons: 'Ekstra knapper i beskeder',  

		opt_showResources: 'Vis udvidede ressource information',
		opt_showDeficient: 'Vis manglende ressourcer',


		opt_missionPriority: 'Mission prioritet',  

		opt_mvmt_expandFleets: 'Vis flåde skibe og transtortere',  
		opt_mvmt_showReversal: 'Vis  flådens tilbagevending ankomst (klokkeslæt)',  

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

		// these label are shown in Options  
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
		
		lbl_sectionGeneral: 'Generalt',
		lbl_sectionGalaxy: 'Galakse',
		lbl_sectionMessages: 'Beskeder',
		lbl_sectionFleetMovement: 'Flåde bevægelse',

		lbl_TotalCapacity: 'Total capacity',
		lbl_MinSpeed: 'Minimal fart',
		lbl_mvmt_Return: 'R',  
		lbl_mvmt_Expedition: 'E',  

		lbl_resources: 'Ressourcer',  
		lbl_debris: 'Debris',  
		lbl_total: 'Total',  
		lbl_loot: 'Loot',  
		lbl_metal: 'Metal',  
		lbl_crystal: 'Krystal',  

		lbl_deficientRes: 'Manglende Ressourcer',  
		lbl_ArrivalACS: 'Ankomst (AKS)',  
		lbl_Production: 'Produktion',

		lbl_btnMarkReadAll: 'Mærker alle viste beskeder som læste',
		lbl_btnDeleteSmallPlunder: 'Slet Spion reporter og kamp reporter < $plyndring og ruinmark < $ruinmark'
	}

	AntiGame_lang.LabelsDE =
	{
		lbl_missAttack: 'Angreifen',
		lbl_missColony: 'Kolonisieren',
		lbl_missDeploy: 'Stationieren',
		lbl_missDestroy: 'Zerst&ouml;ren',
		lbl_missEspionage: 'Spionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'Verbandsangriff',
		lbl_missHarvest: 'Abbau',
		lbl_missHold: 'Halten',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Kleiner Transporter',
		lbl_shipLCargo: 'Gro&szlig;er Transporter',
		lbl_shipLFighter: 'Leichter J&auml;ger',
		lbl_shipHFighter: 'Schwerer J&auml;ger',
		lbl_shipCruiser: 'Kreuzer',
		lbl_shipBattleship: 'Schlachtschiff',
		lbl_shipColonizator: 'Kolonieschiff',
		lbl_shipRecycler: 'Recycler',
		lbl_shipSpy: 'Spionagesonde',
		lbl_shipBomber: 'Bomber',
		lbl_shipDestroyer: 'Zerst&ouml;rer',
		lbl_shipRIP: 'Todesstern',
		lbl_shipBCruiser: 'Schlachtkreuzer',
		lbl_shipSatellite: 'Solar Satellit',

		lbl_RequiredEnergy: 'Energiebedarf'
		
	}

	AntiGame_lang.InterfaceDE =
	{
		opt_languageName: 'Deutsch',
	
		opt_title: 'AntiGame Optionen',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Abbr.',
		opt_btnDefault: 'Standart',

		opt_language: 'Sprache',
		opt_autocopyCoords: 'Auto-Kopieren der Koordinaten',
		opt_showLocalTime: "Zeige Lokale zeit",
		opt_showServerOgameClock: 'Behalte Serverzeit f&uuml;r Ogame Uhr',
		opt_blockAutoComplete: 'Block Auto Complete in Firefox',

		opt_showDeficient: 'Zeige Fehlende Rohstoffe',
		opt_showResources: 'Zeige Erweiterte Rohstoff Informationen',
        opt_showNames: 'Zeige Schiff/Geb&auml;ude/Forschungsname &uuml;ber dem Bild',
        opt_nameColorOn: 'Farbe f&uuml;r: Verf&uuml;gbar',
		opt_nameColorOff: 'Farbe f&uuml;r: Nicht Verf&uuml;gbar',
		opt_nameColorDisabled: 'Farbe f&uuml;r: Nicht gen&uuml;gend Ressourcen',


        opt_uni_SpeedFactor: 'Geschwindigkteit des Universums',
        opt_killTips: 'Keine Tooltips',


        opt_showEventList: 'Zeige Aufgeklappte Eventliste in der Übersicht',
        opt_evt_showOnTop: 'Position der Eventliste in der &Uuml;bersicht',
        opt_evt_noScroll: 'Keine Scrollbalken anzeigen, wenn Tooltips in Eventliste angezeigt werden',

		opt_galaxyShowRank: 'Zeige Spieler/Allianz Rang in der Galaxie',
		opt_galaxyRankColor: 'Spieler/Allianz Rang Farben',
		opt_galaxyDebrisMin: 'Minimale Gr&ouml;&szlig;e von Tr&uuml;mmerfeldern Zeigen',
		opt_galaxyDebrisColor: 'Farbe vom Tr&uuml;mmerfeld',
		opt_galaxyHideMoon: 'Verberge Mond Bild (Zeigt nur die Gr&ouml;&szlig;e)',
		opt_galaxy_Players: 'Hebt folgende Spieler hervor',
		opt_galaxy_PlayerColors: 'Farbe der hervorgehobenen Spieler',
		opt_galaxy_Allys: 'Hebt folgende Allianzen hervor',
		opt_galaxy_AllyColors: 'Farbe der hervorgehobnenen Allianzen',

		opt_galaxy_keepTipsPlanets: 'Behalte Tooltips f&uuml;r Planeten und Monde',
		opt_galaxy_keepTipsDebris: 'Behalte Tooltips f&uuml;r Tr&uuml;mmerfelder',

		

		opt_msg_PlunderThreshold: 'Mindestgr&ouml;&szlig;e f&uuml;r theoretische Beute (in K)',
		opt_msg_DebrisThreshold: 'Mindestgr&ouml;&szlig;e f&uuml;r theoretisches Tr&uuml;mmerfeld (in K)',
		opt_msg_foldSmallPlunder: 'Spionageberichte unter diesem Limit Unterschlagen',
		opt_msg_showPlunder: 'Zeige Beute in Spionageberichten',
		opt_msg_addButtons: 'Zus&auml;tzliche Nachrichtenfelder',
		opt_msg_fixColors: 'Richtige Farben in Kampfberichten',
		



		opt_fleet_showCapacity: 'Zeige Schiffe, Kapazit&auml;t, Geschwindigkeit',
		opt_fleet2_setTargetDF: 'Setze Ziel auf Tr&uuml;mmerfeld, wenn Recycler dabei sind',
		opt_fleet2_fixLayout: 'Ver&auml;ndere Anzeige (Flottenversand)',
		opt_fleet2_ShortLinks: 'Vorgegebene Shortlinks',

		opt_missionPriority: 'Auftragspriorit&auml;t',
		
		opt_mvmt_expandFleets: 'Zeige Flotte, Schiffe und Laderraum',
		opt_mvmt_showReversal: 'Zeige R&uuml;ckkehrzeit der Flotte',
		
		opt_missAttack: 'Auftragsfarbe: Angreifen',
		opt_missColony: 'Auftragsfarbe: Kolonisieren',
		opt_missDeploy: 'Auftragsfarbe: Stationieren',
		opt_missDestroy: 'Auftragsfarbe: Zerst&ouml;ren',
		opt_missEspionage: 'Auftragsfarbe: Spionage',
		opt_missExpedition: 'Auftragsfarbe: Expedition',
		opt_missFederation: 'Auftragsfarbe: Verbandsangriff',
		opt_missHarvest: 'Auftragsfarbe: Abbau',
		opt_missHold: 'Auftragsfarbe: Halten',
		opt_missTransport: 'Auftragsfarbe: Transport',

		// these label are shown in Options
		lbl_missAttack: 'Angreifen',
		lbl_missColony: 'Kolonisieren',
		lbl_missDeploy: 'Stationieren',
		lbl_missDestroy: 'Zerst&ouml;ren',
		lbl_missEspionage: 'Spionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'Verbandsangriff',
		lbl_missHarvest: 'Abbau',
		lbl_missHold: 'Halten',
		lbl_missTransport: 'Transport',
		//
				
		lbl_sectionGeneral: 'Allgemein',
                lbl_sectionEventList: 'Event Liste',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Nachrichten',
		lbl_sectionFleetDispatch: 'Flotte Versenden',
		lbl_sectionFleetMovement: 'Flottenbewegung',

                lbl_resetCoords: 'Zur&uuml;cksetzen - ',

		lbl_optionsNote1: 'Diese Option ist nur f&uuml;r dieses Universum gespeichert',

		lbl_TotalCapacity: 'Ladekapazit&auml;t',
		lbl_MinSpeed: 'Minimale Geschwindigkeit',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Rohstoffe',
		lbl_debris: 'TF',
		lbl_total: 'Gesamt',
		lbl_loot: 'Beute',
		lbl_metal: 'Metall',
		lbl_crystal: 'Kristall',

		lbl_shipSCargoAlt: 'KT',
		lbl_shipLCargoAlt: 'GT',
		lbl_shipRecyclerAlt: 'Recs',
		
		lbl_deficientRes: 'Fehlende Rohstoffe',
		lbl_Production: 'Produktion',
		lbl_ArrivalACS: 'Ankunft (AKS)',

		lbl_btnMarkReadAll: 'Alle Angezeigten Nachrichten als gelesen markieren',
		lbl_btnDeleteSmallPlunder: 'Spionageberichte mit < $plunder Beute und < $debris TF entfernen',

		lbl_Moon: 'Mond',

                lbl_onTop: 'Oben',
		lbl_onBottom: 'Unten',
                lbl_onLeft: 'Links'

	}

	AntiGame_lang.LabelsES =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Deployment',
		lbl_missDestroy: 'Destruccion Lunar',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedicion',
		lbl_missFederation: 'ACS Ataque',
		lbl_missHarvest: 'Harvest',
		lbl_missHold: 'ACS Defensa',
		lbl_missTransport: 'Transporte',

		lbl_shipSCargo: 'Carguero Pequeño',
		lbl_shipLCargo: 'Carguero Grande',
		lbl_shipLFighter: 'Caza Ligero',
		lbl_shipHFighter: 'caza Pesado',
		lbl_shipCruiser: 'Crucero',
		lbl_shipBattleship: 'Nave de batalla',
		lbl_shipColonizator: 'Colonizador',
		lbl_shipRecycler: 'Reciclador',
		lbl_shipSpy: 'Sonda Espionaje',
		lbl_shipBomber: 'Bombardero',
		lbl_shipDestroyer: 'Acorazado',
		lbl_shipRIP: 'Estralla de la Muerte',
		lbl_shipBCruiser: 'Crucero de Batalla',
		lbl_shipSatellite: 'Satelite Solar',

		lbl_RequiredEnergy: 'Energia necesaria'
	}

	AntiGame_lang.InterfaceES =
	{
		opt_languageName: 'Español',

		opt_title: 'AntiGame Opciones',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Defecto',

		opt_language: 'Lenguaje',
		opt_autocopyCoords: 'Auto-copiar cordenadas',
		opt_showLocalTime: "Mostrar la hora local en lugar de servidor (solo horas)",
		opt_blockAutoComplete: 'Bloquear Auto-Completar en Firefox',

		opt_galaxyShowRank: 'Mostrar ranking jugador/alianza en la vista de la Galaxia',
		opt_galaxyRankColor: 'Color del ranking jugador/alianza',

		opt_galaxyDebrisMin: 'Tamaño mínimo de los escombros para recogerlos (0 to turn off)',
		opt_galaxyDebrisColor: 'Color de los escombros',

		opt_msg_PlunderThreshold: 'El límite bajo para el saqueo teórico (x1000)',
		opt_msg_DebrisThreshold: 'El límite bajo de los escombros teórico (x1000)',
		opt_msg_foldSmallPlunder: 'Fold reports with plunder and debris less than the limit',
		opt_msg_showPlunder: 'Mostrar el posible saqueo en los informes de espionaje',
		opt_msg_addButtons: 'Otros botones de mensajes',
		opt_msg_fixColors: 'Fijar los colores de los informes de lucha',

		opt_showDeficient: 'Mostrar los recursos que faltan',
		opt_showResources: 'Mostrar ampliado los recursos de información',

		opt_missionPriority: 'Prioridad de la misión',

		opt_mvmt_expandFleets: 'Mostrar la flota de buques y la carga',
		opt_mvmt_showReversal: 'Mostrar la hora de vuelta de las flotas',

		opt_missAttack: 'Color para la mision: Ataque',
		opt_missColony: 'Color para la mision: Colonizar',
		opt_missDeploy: 'Color para la mision: Despliegue',
		opt_missDestroy: 'Color para la mision: Destruir',
		opt_missEspionage: 'Color para la mision: Espionaje',
		opt_missExpedition: 'Color para la mision: Expedicion',
		opt_missFederation: 'Color para la mision: Federacion',
		opt_missHarvest: 'Color para la mision: Recoleccion',
		opt_missHold: 'Color para la mision: Mantener',
		opt_missTransport: 'Color para la mision: Transporte',

		// these label are shown in Options
		lbl_missAttack: 'Ataque',
		lbl_missColony: 'Colonizacion',
		lbl_missDeploy: 'Despliegue',
		lbl_missDestroy: 'Destrucion Lunar',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedicion',
		lbl_missFederation: 'Ataque ACS',
		lbl_missHarvest: 'Recoleccion',
		lbl_missHold: 'Defensa ACS',
		lbl_missTransport: 'Transporte',
		//

		lbl_sectionGeneral: 'General',
		lbl_sectionGalaxy: 'Galaxia',
		lbl_sectionMessages: 'Mesajes',
		lbl_sectionFleetMovement: 'Movimiento de Flotas',


		lbl_TotalCapacity: 'Capacidad total',
		lbl_MinSpeed: 'Velocidad minima',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',

		lbl_resources: 'Recursos',
		lbl_debris: 'Escombros',
		lbl_total: 'Total',
		lbl_loot: 'Botín',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',

		lbl_deficientRes: 'Recursos necesarios',
		lbl_Production: 'Produccion',
		lbl_ArrivalACS: 'Llegada (ACS)',

		lbl_btnMarkReadAll: 'Marcar todos los mensajes como leídos',
		lbl_btnDeleteSmallPlunder: 'Eliminar los informes de espionaje con el botín < $plunder y los escombros < $debris',

		lbl_Moon: 'Luna'
	}
	
	AntiGame_lang.LabelsFI =
	{
		lbl_missAttack: 'Hyökkäys',
		lbl_missColony: 'Kolonisaatio',
		lbl_missDeploy: 'Sijoitus',
		lbl_missDestroy: 'Kuun tuhoaminen',
		lbl_missEspionage: 'Vakoilu',
		lbl_missExpedition: 'Retkikunta',
		lbl_missFederation: 'LTS Hyökkäys',
		lbl_missHarvest: 'Kierrätä rauniokenttä',
		lbl_missHold: 'LTS Puolustus',
		lbl_missTransport: 'Kuljetus',
		lbl_shipSCargo: 'Pieni Rahtialus',
		lbl_shipLCargo: 'Suuri Rahtialus',
		lbl_shipLFighter: 'Kevyt Hävittäjä',
		lbl_shipHFighter: 'Raskas Hävittäjä',
		lbl_shipCruiser: 'Risteilijä',
		lbl_shipBattleship: 'Taistelualus',
		lbl_shipColonizator: 'Siirtokunta-alus',
		lbl_shipRecycler: 'Kierrättäjä',
		lbl_shipSpy: 'Vakoiluluotain',
		lbl_shipBomber: 'Pommittaja',
		lbl_shipDestroyer: 'Tuhoaja',
		lbl_shipRIP: 'Kuolemantähti',
		lbl_shipBCruiser: 'Taisteluristeilijä',
		lbl_shipSatellite: 'Aurinkosatelliitti',
		lbl_RequiredEnergy: 'Tarvittava energia'
	} 
	
	AntiGame_lang.InterfaceFI =
	{
		opt_languageName: 'Suomi',

		opt_title: 'AntiGame Asetukset',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Peruuta',
		opt_btnDefault: 'Oletus',

		opt_language: 'Kieli',
		opt_autocopyCoords: 'Auto-kopioi koordinaatit',
		opt_showLocalTime: "Näytä paikallinen aika serveriajan sijasta (vain tunnit)",
		opt_blockAutoComplete: 'Estä Auto-Complete Firefoxissa',

		opt_galaxyShowRank: 'Näytä pelaaja/liittouma tilastot Galaksinäkymässä',
		opt_galaxyRankColor: 'Pelaaja/Liittouma tilastovärit',

		opt_galaxyDebrisMin: 'Masennuskentän minimikoko korostukseen (0 pois päältä)',
		opt_galaxyDebrisColor: 'Korostetut kentän väri',

		opt_msg_PlunderThreshold: 'Alaraja teoreettiselle saaliille (x1000)',
		opt_msg_DebrisThreshold: 'Alaraja teoreettiselle romukentälle (x1000)',
		opt_msg_foldSmallPlunder: 'Pienennä raportit joissa saalis ja romukenttä ovat pienemmät kuin alarajat',
		opt_msg_showPlunder: 'Näytä saalis vakoiluraportissa',
		opt_msg_addButtons: 'Uusia painikkeita Viesteihin',
		opt_msg_fixColors: 'Korjaa taisteluraporttien värit',

		opt_showDeficient: 'Näytä puuttuvat resurssit',
		opt_showResources: 'Näytä laajennetut resurssitiedot',

		opt_missionPriority: 'Tehtävän prioriteetti',

		opt_mvmt_expandFleets: 'Näytä laivaston laivat ja rahti',
		opt_mvmt_showReversal: 'Näytä peruutusajat laivastoille',

		opt_missAttack: 'Tehtävän väri: Hyökkäys',
		opt_missColony: 'Tehtävän väri: Kolonisaatio',
		opt_missDeploy: 'Tehtävän väri: Sijoitus',
		opt_missDestroy: 'Tehtävän väri: Kuun tuhoaminen',
		opt_missEspionage: 'Tehtävän väri: Vakoilu',
		opt_missExpedition: 'Tehtävän väri: Retkikunta',
		opt_missFederation: 'Tehtävän väri: LTS Hyökkäys',
		opt_missHarvest: 'Tehtävän väri: Kierrätä rauniokenttä',
		opt_missHold: 'Tehtävän väri: LTS Puolustus',
		opt_missTransport: 'Tehtävän väri: Kuljetus',

		// these label are shown in Options
		lbl_missAttack: 'Hyökkäys',
		lbl_missColony: 'Kolonisaatio',
		lbl_missDeploy: 'Sijoitus',
		lbl_missDestroy: 'Kuun tuhoaminen',
		lbl_missEspionage: 'Vakoilu',
		lbl_missExpedition: 'Retkikunta',
		lbl_missFederation: 'LTS Hyökkäys',
		lbl_missHarvest: 'Kierrätä rauniokenttä',
		lbl_missHold: 'LTS Puolustus',
		lbl_missTransport: 'Kuljetus',
		//

		lbl_sectionGeneral: 'Yleisnäkymä',
		lbl_sectionGalaxy: 'Galaksi',
		lbl_sectionMessages: 'Viestit',
		lbl_sectionFleetMovement: 'laivueen liikkeet',


		lbl_TotalCapacity: 'Kokonaiskapasiteetti',
		lbl_MinSpeed: 'Miniminopeus',
		lbl_mvmt_Return: 'P',
		lbl_mvmt_Expedition: 'T',

		lbl_resources: 'Resurssit',
		lbl_debris: 'Romukenttä',
		lbl_total: 'Yhteensä',
		lbl_loot: 'Saalis',
		lbl_metal: 'Metalli',
		lbl_crystal: 'Kristalli',

		lbl_deficientRes: 'Resursseja puuttuu',
		lbl_Production: 'Tuotanto',
		lbl_ArrivalACS: 'Saapuu (LTS)',

		lbl_btnMarkReadAll: 'Merkitse näkyvät viestit luetuiksi',
		lbl_btnDeleteSmallPlunder: 'Poista vakoiluraportit, joissa saalis < $plunder ja romukenttä < $debris',
		
		lbl_Moon: 'Kuu'
	} 	
	
	AntiGame_lang.LabelsFR =
	{
		lbl_missAttack: 'Attaquer',
		lbl_missColony: 'Coloniser',
		lbl_missDeploy: 'Déployer',
		lbl_missDestroy: 'Détruire une lune',
		lbl_missEspionage: 'Espionner',
		lbl_missExpedition: 'Expédition',
		lbl_missFederation: 'Attaque ACS',
		lbl_missHarvest: 'Recycler',
		lbl_missHold: 'Défendre ACS',
		lbl_missTransport: 'Transporter',
		
		lbl_shipSCargo: 'Transporteur léger',
		lbl_shipLCargo: 'Transporteur lourd',
		lbl_shipLFighter: 'Chasseur léger',
		lbl_shipHFighter: 'Chasseur lourd',
		lbl_shipCruiser: 'Croiseur',
		lbl_shipBattleship: 'Vaisseau de bataille',
		lbl_shipColonizator: 'Vaisseau de colonisation',
		lbl_shipRecycler: 'Recycleur',
		lbl_shipSpy: 'Sonde d\'espionnage',
		lbl_shipBomber: 'Bombardier',
		lbl_shipDestroyer: 'Destructeur',
		lbl_shipRIP: 'Étoile de la mort',
		lbl_shipBCruiser: 'Vaisseau de bataille',
		lbl_shipSatellite: 'Satellite solaire',
		
		lbl_RequiredEnergy: 'Énergie requise'
		
	}
	
	AntiGame_lang.InterfaceFR =
	{
		opt_languageName: 'Français',

		opt_title: 'Options AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Annuler',
		opt_btnDefault: 'Par défaut',

		opt_language: 'Langage',
		opt_thousandSeparator: 'Séparateur pour les milliers',
		opt_blockAutoComplete: 'Bloquer l\'auto-complétion dans firefox',
		
		opt_showDeficient: 'Afficher les ressources manquantes',
		opt_showResources: 'Afficher les informations de ressources avancées',
		opt_showNames: 'Afficher les noms des vaisseaux/constructions/recherches sur les images',
		opt_nameColorOn: 'Couleur du nom: disponible',
		opt_nameColorOff: 'Couleur du nom: indisponible',
		opt_nameColorDisabled: 'Couleur du nom: pas assez de ressources',
		opt_showConstructionTitle: 'Afficher les titres des constructions dans la liste des planètes',

		opt_uni_SpeedFactor: 'Facteur de vitesse pour cet univers',
		
		opt_timeSetting: 'Changer les valeurs de temps (les heures seulement)',
		opt_showServerOgameClock: 'Garder l\'heure du serveur pour l\'horloge en haut à droite',
		opt_showServerPhalanx: 'Garder l\'heure du serveur pour la vue Phalanx',
		
		opt_timeDontChange: 'Ne pas changer l\'heure',
		opt_timeLocal: 'Toujours régler à l\'heure locale',
		opt_timeServer: 'Toujours régler à l\'heure serveur',

		opt_killTips: 'Désactiver les info-bulles',

		opt_showEventList: 'Afficher la liste des évènements dans la vue générale',
		opt_evt_showOnTop: 'Position de la liste des évènements sur l\'écran',
		opt_evt_noScroll: 'Pas de scrollbar lorsque les info-bulles sont affichées',
		
		opt_galaxyShowRank: 'Afficher le rang des joueurs/alliances dans la vue Galaxie',
		opt_galaxyRankColor: 'Couleur des rangs Joueur/alliance',
		opt_galaxyDebrisMin: 'Taille minimale pour surligner les débris (0 pour désactiver)',
		opt_galaxyDebrisColor: 'Couleur des débris surlignés',
		opt_galaxyHideMoon: 'Cacher l\'image de la lune (afficher sa taille à la place)',
		opt_galaxy_Players: 'Surligner les joueurs suivants',
		opt_galaxy_PlayerColors: 'Couleur des joueurs surlignés',
		opt_galaxy_Allys: 'Surligner les alliances suivantes',
		opt_galaxy_AllyColors: 'Couleur des alliances surlignées',
		opt_galaxy_keepTipsPlanets: 'Garder les infos-bulles pour les lunes et planètes',
		opt_galaxy_keepTipsDebris: 'Garder les infos-bulles pour les champs de débris',
		
		opt_msg_PlunderThreshold: 'Taille minimale pour pillage théorique (en K)',
		opt_msg_DebrisThreshold: 'Taille minimale pour recyclage théorique (en K)',
		opt_msg_foldSmallPlunder: 'Pliez les rapports avec le pillage et les débris inférieurs à la limite',
		opt_msg_showPlunder: 'Afficher le pillage dans les rapports d\'espionnage',
		opt_msg_addButtons: 'Ajouter des boutons pour les messages',
		opt_msg_fixColors: 'Fixer la couleur des rapports de combat', 
		
		opt_fleet_showCapacity: 'Afficher la vitesse et la capacité des flottes',
		opt_autocopyCoords: 'Copier automatiquement les coordonnées',
		opt_fleet2_setTargetDF: 'Sélectionner automatiquement le champ de débris si la flotte inclus un recycleur',
		opt_fleet2_fixLayout: 'Corriger les informations d\'agencement',
		opt_fleet2_ShortLinks: 'Raccourcis de cibles',
		opt_fleet2_checkProbeCapacity: 'Vérifier la capacité des sondes avant le départ(page 2)',	
		
		opt_missionPriority: 'Priorité de la mission',
		
		opt_mvmt_expandFleets: 'Montrez la flotte et la cargaison de celle-ci',
		opt_mvmt_showReversal: 'Afficher le temps inversé pour les flottes',
		
		opt_missAttack: 'Couleur de mission: Attaquer',  
		opt_missColony: 'Couleur de mission: Coloniser',  
		opt_missDeploy: 'Couleur de mission: Déployer', 
		opt_missDestroy: 'Couleur de mission: Détruire',  
		opt_missEspionage: 'Couleur de mission: Espionner',   
		opt_missExpedition: 'Couleur de mission: Expédition', 
		opt_missFederation: 'Couleur de mission: Fédération',  
		opt_missHarvest: 'Couleur de mission: Recycler', 
		opt_missHold: 'Couleur de mission: Soutenir',   
		opt_missTransport: 'Couleur de mission: Transporter',
                opt_msg_addSimButton: 'Ajouter un bouton pour envoyer le rapport d\'espionnage sur WebSim',
		
		lbl_missAttack: 'Attaquer',  
		lbl_missColony: 'Coloniser',  
		lbl_missDeploy: 'Stationner',  
		lbl_missDestroy: 'Détruire',  	
		lbl_missEspionage: 'Espionner',  
		lbl_missExpedition: 'Expédition',  
		lbl_missFederation: 'Attaque groupée',  
		lbl_missHarvest: 'Recycler champ de débris',  
		lbl_missHold: 'Stationner chez cet allié',  
		lbl_missTransport: 'Transporter',

		lbl_sectionGeneral: 'Général',
		lbl_sectionTime: 'Time settings',
		lbl_sectionEventList: 'Mouvements de flotte',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Messages',
		lbl_sectionFleetDispatch: 'Envoi de flottes',
		lbl_sectionFleetMovement: ' Mouvements de flotte',
		
		lbl_optionsNote1: 'L\'option est sauvegardée uniquement pour cet univers',

                lbl_resetCoords: 'Réinitialiser  - ',

		lbl_TotalCapacity: 'Capacité totale',
		lbl_MinSpeed: 'Vitesse minimale',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Ressources',
		lbl_debris: 'Débris',
		lbl_total: 'Total',
		lbl_loot: 'Butin',
		lbl_metal: 'Métal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'PT',
		lbl_shipLCargoAlt: 'GT',
		lbl_shipRecyclerAlt: 'Recs',

		lbl_deficientRes: 'Ressources manquantes',
		lbl_Production: 'Production',
		lbl_ArrivalACS: 'Arrivée (ACS)',
		
		lbl_btnMarkReadAll: 'Marquer tous les messages sélectionnés comme lus',
		lbl_btnDeleteSmallPlunder: 'Supprimer les rapports d\'espionnage avec pillage < $plunder et débris < $debris',

		lbl_Moon: 'Lune',
		
		lbl_onTop: 'Au dessus',
		lbl_onBottom: 'En dessous',
		lbl_onLeft: 'A gauche'
	}

	AntiGame_lang.LabelsHR =
	{
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizirati',
		lbl_missDeploy: 'Stationirati',
		lbl_missDestroy: 'Uništiti',
		lbl_missEspionage: 'Špijunaža',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'AKS Napad',
		lbl_missHarvest: 'Recikliraj ruševinu',
		lbl_missHold: 'Pauzirati',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Mali transporter',
		lbl_shipLCargo: 'Veliki transporter',
		lbl_shipLFighter: 'Mali lovac',
		lbl_shipHFighter: 'Veliki lovac',
		lbl_shipCruiser: 'Krstarica',
		lbl_shipBattleship: 'Borbeni brod',
		lbl_shipColonizator: 'Kolonijalni brod',
		lbl_shipRecycler: 'Recikler',
		lbl_shipSpy: 'Sonde za špijunažu',
		lbl_shipBomber: 'Bombarder',
		lbl_shipDestroyer: 'Razarač',
		lbl_shipRIP: 'Zvijezda smrti',
		lbl_shipBCruiser: 'Oklopna krstarica',
		lbl_shipSatellite: 'Solarni satelit',
		
		lbl_RequiredEnergy: 'Potrebno energije'
		
	}
	
	AntiGame_lang.InterfaceHR =
	{
		opt_languageName: 'Hrvatski',
	
		opt_title: 'AntiGame Opcije',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancel',
		opt_btnDefault: 'Default',

		opt_language: 'Jezik',
		opt_autocopyCoords: 'Auto-kopirati koordinate',
		opt_showLocalTime: "Prikaži lokalno vrijeme umjesto serverskog vremena (samo sati)",
		opt_showServerOgameClock: 'Zadrži serversko vrijeme za Ogame sat u gornjem desnom uglu',
		opt_blockAutoComplete: 'Blokiraj Auto-Complete u Firefoxu',

                opt_uni_SpeedFactor: 'Faktor brzine za ovaj uni',
		
		opt_showEventList: 'Prikaži otvorena Događanja na pregledu',
		opt_evt_showOnTop: 'Pozicija Događanja na ekranu',
		opt_evt_noScroll: 'Nema frejm skrolbara na prikazu tultipova ;)',

		opt_galaxyShowRank: 'Prikaži statistiku igrača/saveza u pregledu galaksije',
		opt_galaxyRankColor: 'Statistike igrača/saveza u boji',
		opt_galaxyDebrisMin: 'Minimalna veličina ruševine za označavanje (0 za isključiti)',
		opt_galaxyDebrisColor: 'Boja označenih ruševina',
		opt_galaxyHideMoon: 'Sakrij sliku mjeseca (umjesto slike prikaži veličinu mjeseca)',
		opt_galaxy_Players: 'Označi slijedeće igrače',
		opt_galaxy_PlayerColors: 'Boje za označavanje igrača',
		opt_galaxy_Allys: 'Označi slijedeće saveze',
		opt_galaxy_AllyColors: 'Boje za označavanje saveza',

		opt_galaxy_killTips: 'Makni sve tooltips na prikazu galaksije',
		opt_galaxy_keepTipsPlanets: 'Zadrži prikaz tooltipsa za planete i mjesece',
		opt_galaxy_keepTipsDebris: 'Zadrži prikaz tooltipsa za ruševine',
		
		opt_msg_PlunderThreshold: 'Donji limit za teoretski plijen (x1000)',
		opt_msg_DebrisThreshold: 'Donji limit za teoretsku ruševinu (x1000)',
		opt_msg_foldSmallPlunder: 'Presaviti izvješća s pljačkom i ruševinama manjih od granica',
		opt_msg_showPlunder: 'Prikaži plijen u izvješću špijunaže',
		opt_msg_addButtons: 'Dodatne tipke na porukama',
		opt_msg_fixColors: 'Podesi boje borbenih izvještaja',
		
		opt_showDeficient: 'Pokaži nedostajuće resurse',
		opt_showResources: 'Prikaži dodatne informacije o resursima',
		
		opt_fleet_showCapacity: 'Prikaži kapacitet i brzinu brodova',
		opt_fleet2_setTargetDF: 'Namjesti cilj na RU ako u floti ima reciklera',
		opt_fleet2_fixLayout: 'Podesi prikaz izvještaja',
		opt_fleet2_ShortLinks: 'Prečac do mete',
		
		opt_missionPriority: 'Prioritet misija',
		
		opt_mvmt_expandFleets: 'Prikaži brodove i teret flote',
		opt_mvmt_showReversal: 'Prikaži vrijeme povratka flote',
		
		opt_missAttack: 'Boja misije: Napad',
		opt_missColony: 'Boja misije: Kolonizacija',
		opt_missDeploy: 'Boja misije: Stacioniranje',
		opt_missDestroy: 'Boja misije: Uništi',
		opt_missEspionage: 'Boja misije: Špijunaža',
		opt_missExpedition: 'Boja misije: Ekspedicija',
		opt_missFederation: 'Boja misije: AKS',
		opt_missHarvest: 'Boja misije: Recikliranje',
		opt_missHold: 'Boja misije: Pauziraj',
		opt_missTransport: 'Boja misije: Transport',
		
		// these label are shown in Options
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Stacioniranje',
		lbl_missDestroy: 'Rušenje mjeseca',
		lbl_missEspionage: 'Špijunaža',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'AKS Napad',
		lbl_missHarvest: 'Recikliranje',
		lbl_missHold: 'Pauziranje',
		lbl_missTransport: 'Transport',
		//
		
		lbl_sectionGeneral: 'Općenito',
		lbl_sectionEventList: 'Događanja',
		lbl_sectionGalaxy: 'Galaksija',
		lbl_sectionMessages: 'Poruke',
		lbl_sectionFleetDispatch: 'Otpremanje flota',
		lbl_sectionFleetMovement: 'Kretanje flota',
		
		lbl_optionsNote1: 'Opcija je spremljena samo za ovaj uni',
		
		lbl_TotalCapacity: 'Ukupni kapacitet',
		lbl_MinSpeed: 'Minimalna brzina',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Resursi',
		lbl_debris: 'Ruševine',
		lbl_total: 'Ukupno',
		lbl_loot: 'Plijen',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'VT',
		lbl_shipRecyclerAlt: 'Rec',

		
		lbl_deficientRes: 'Nedostajući resursi',
		lbl_Production: 'Proizvodnja',
		lbl_ArrivalACS: 'Dolazak (AKS)',
		
		lbl_btnMarkReadAll: 'Označi sve prikazane poruke kao pročitane',
		lbl_btnDeleteSmallPlunder: 'Izbriši sva izvješća špijunaže gdje je pljačka < $plunder i ruševina < $debris',
		
		lbl_Moon: 'Mjesec',

		lbl_onTop: 'Na vrhu',
		lbl_onBottom: 'Na dnu'

	}

	AntiGame_lang.LabelsIT =
	{
		lbl_missAttack: 'Attacco',
		lbl_missColony: 'Colonizzazione',
		lbl_missDeploy: 'Schieramento',
		lbl_missDestroy: 'Distruzione Luna',
		lbl_missEspionage: 'Spionaggio',
		lbl_missExpedition: 'Spedizione',
		lbl_missFederation: 'Attacco Federale',
		lbl_missHarvest: 'Raccolta',
		lbl_missHold: 'Difesa Federale',
		lbl_missTransport: 'Trasporto',
		
		lbl_shipSCargo: 'Cargo Leggero',
		lbl_shipLCargo: 'Cargo Pesante',
		lbl_shipLFighter: 'Caccia Leggero',
		lbl_shipHFighter: 'Caccia Pesante',
		lbl_shipCruiser: 'Incrociatore',
		lbl_shipBattleship: 'Nave da battaglia',
		lbl_shipColonizator: 'Colonizzatrice',
		lbl_shipRecycler: 'Riciclatrice',
		lbl_shipSpy: 'Sonda Spia',
		lbl_shipBomber: 'Bombardiere',
		lbl_shipDestroyer: 'Corazzata',
		lbl_shipRIP: 'Morte Nera',
		lbl_shipBCruiser: 'Incrociatore da Battaglia',
		lbl_shipSatellite: 'Satellite solare',
		
		lbl_RequiredEnergy: 'Energia richiesta'
	}
	
	AntiGame_lang.InterfaceIT =
	{
		opt_languageName: 'Italiano',

		opt_title: 'Opzioni AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Annulla',
		opt_btnDefault: 'Default',

		opt_language: 'Langage',
		opt_autocopyCoords: 'Copiare automaticamente le coordinate',
		opt_showLocalTime: "Usa ora locale invece che ora del server (le ore solamente)",
		opt_showServerOgameClock: 'Mantenere l\'ora del server per l\'orologio in alto a destra',
		opt_blockAutoComplete: 'Blocca autocompilazione di FireFox',
		
		opt_showDeficient: 'Visualizza risorse mancanti',
		opt_showResources: 'Mostra informazioni avanzate per le risorse',
		opt_showNames: 'Mostra i nomi delle navi sulle immagini',
		
		opt_uni_SpeedFactor: 'Fattore di velocitа per l\'universo',

		opt_killTips: 'Disabilitare i suggerimenti',

		opt_showEventList: 'Visualizzare l\'elenco degli eventi nel riepilogo',
		opt_evt_showOnTop: 'Posizione della lista degli eventi sullo schermo',
		opt_evt_noScroll: 'Nessuna barra di scorrimento quando i suggerimenti vengono visualizzati',
		
		opt_galaxyShowRank: 'Mostra il rank di giocatori/alleanza nella vista Galassia',
		opt_galaxyRankColor: 'Colora il rank dei giocatori/alleanza',
		opt_galaxyDebrisMin: 'Valore minimo di detriti da evidenziare in Galassia (0 per disattivare)',
		opt_galaxyDebrisColor: 'Colore dei detriti evidenziati',
		opt_galaxyHideMoon: 'Visualizza dimensioni luna invece che immagine luna in Galassia',
		opt_galaxy_Players: 'Evidenziare i seguenti giocatori',
		opt_galaxy_PlayerColors: 'Colore dei giocatori evidenziati',
		opt_galaxy_Allys: 'Evidenzia le seguenti alleanze',
		opt_galaxy_AllyColors: 'Colore delle alleanze evidenziate',
		opt_galaxy_keepTipsPlanets: 'Tenere il tooltip per le lune e pianeti',
		opt_galaxy_keepTipsDebris: 'Tenere il tooltip per i campi detriti',
		
		opt_msg_PlunderThreshold: 'Limite minimo per le farmate (in K)',
		opt_msg_DebrisThreshold: 'Limite minimo per il riciclaggio (in K)',
		opt_msg_foldSmallPlunder: 'Nascondere il rapporto con il saccheggio e detriti inferiori al limite',
		opt_msg_showPlunder: 'Mostra saccheggio nei rapporti di spionaggio',
		opt_msg_addButtons: 'Aggiungi i bottoni per i messaggi',
		opt_msg_fixColors: 'Impostare il colore per i rapporti di combattimento', 
		
		opt_fleet_showCapacity: 'Visualizza velocitа e capacitа flotta',
		opt_fleet2_setTargetDF: 'Selezionare automaticamente campo detriti se la flotta contiene una riciclatrice',
		opt_fleet2_fixLayout: 'Correggi la disposizione delle infomazioni',
		opt_fleet2_ShortLinks: 'Shortlink per gli obiettivi',	
		
		opt_missionPriority: 'Seleziona prioritа di missione',
		
		opt_mvmt_expandFleets: 'Visualizza la flotta e il carico della stessa',
		opt_mvmt_showReversal: 'Mostra tempi di rientro per la flotta',
		
		opt_missAttack: 'Colore della missione: Attacco',  
		opt_missColony: 'Colore della missione: Colonizzazione',  
		opt_missDeploy: 'Colore della missione: Schieramento', 
		opt_missDestroy: 'Colore della missione: Distruzione',  
		opt_missEspionage: 'Colore della missione: Spionaggio',   
		opt_missExpedition: 'Colore della missione: Spedizione', 
		opt_missFederation: 'Colore della missione: Attacco ACS',  
		opt_missHarvest: 'Colore della missione: Riciclaggio', 
		opt_missHold: 'Colore della missione: Stazionamento',   
		opt_missTransport: 'Colore della missione: Trasporto',
		
		// these label are shown in Options
		lbl_missAttack: 'Attacco',  
		lbl_missColony: 'Colonizzazione',  
		lbl_missDeploy: 'Stazionamento',  
		lbl_missDestroy: 'Distruzione',  	
		lbl_missEspionage: 'Spionaggio',  
		lbl_missExpedition: 'Spedizione',  
		lbl_missFederation: 'Attacco ACS',  
		lbl_missHarvest: 'Riciclaggio',  
		lbl_missHold: 'Stazionamento',  
		lbl_missTransport: 'Trasporto',
		//
		
		lbl_sectionGeneral: 'Generale',
		lbl_sectionEventList: 'Movimenti flotta',
		lbl_sectionGalaxy: 'Galassia',
		lbl_sectionMessages: 'Messaggi',
		lbl_sectionFleetDispatch: 'Invio di una flotta',
		lbl_sectionFleetMovement: ' Movimenti flotta',
				
		lbl_optionsNote1: 'Questa opzione и salvata solo per questo universo',

		lbl_TotalCapacity: 'Capacitа totale',
		lbl_MinSpeed: 'Velocitа minima',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Risorse',
		lbl_debris: 'Detriti',
		lbl_total: 'Totale',
		lbl_loot: 'Bottino',
		lbl_metal: 'Metallo',
		lbl_crystal: 'Cristallo',
		
		lbl_shipSCargoAlt: 'CL',
		lbl_shipLCargoAlt: 'CP',
		lbl_shipRecyclerAlt: 'Recy',

		lbl_deficientRes: 'Risorse mancanti',
		lbl_Production: 'Produzione',
		lbl_ArrivalACS: 'Arrivo (ACS)',
		
		lbl_btnMarkReadAll: 'Marcare tutti i messaggi visualizzati come letti',
		lbl_btnDeleteSmallPlunder: 'Cancella rapporti di spionaggio con risorse < $plunder et detriti < $debris',

		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Sopra',
		lbl_onBottom: 'Sotto',
		lbl_onLeft: 'A sinistra'
	}
	
	AntiGame_lang.InterfaceFR =
	{
		opt_languageName: 'Français',

		opt_title: 'Options AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Annuler',
		opt_btnDefault: 'Par défaut',

		opt_language: 'Langage',
		opt_autocopyCoords: 'Copier automatiquement les coordonnées',
		opt_showLocalTime: "Afficher l'heure locale plutôt que l'heure du serveur (les heures seulement)",
		opt_showServerOgameClock: 'Gardez les heures du serveur pour l\'horloge en haut à droite',
		opt_blockAutoComplete: 'Bloquer l\'auto-complétion dans firefox',
		
		opt_showDeficient: 'Afficher les ressources manquantes',
		opt_showResources: 'Afficher les informations de ressources avancées',
		opt_showNames: 'Afficher les noms des vaisseaux/constructions/recherches sur les images',
		opt_nameColorOn: 'Couleur du nom: disponible',
		opt_nameColorOff: 'Couleur du nom: indisponible',
		opt_nameColorDisabled: 'Couleur du nom: pas assez de ressources',

		
		opt_uni_SpeedFactor: 'Facteur de vitesse pour cet univers',

		opt_killTips: 'Désactiver les info-bulles',

		opt_showEventList: 'Afficher la liste des évènements dans la vue générale',
		opt_evt_showOnTop: 'Position de la liste des évènements sur l\'écran',
		opt_evt_noScroll: 'Pas de scrollbar lorsque les info-bulles sont affichées',
		
		opt_galaxyShowRank: 'Afficher le rang des joueurs/alliances dans la vue Galaxie',
		opt_galaxyRankColor: 'Couleur des rangs Joueur/alliance',
		opt_galaxyDebrisMin: 'Taille minimale pour surligner les débris (0 pour désactiver)',
		opt_galaxyDebrisColor: 'Couleur des débris surlignés',
		opt_galaxyHideMoon: 'Cacher l\'image de la lune (afficher sa taille à la place)',
		opt_galaxy_Players: 'Surligner les joueurs suivants',
		opt_galaxy_PlayerColors: 'Couleur des joueurs surlignés',
		opt_galaxy_Allys: 'Surligner les alliances suivantes',
		opt_galaxy_AllyColors: 'Couleur des alliances surlignées',
		opt_galaxy_keepTipsPlanets: 'Garder les infos-bulles pour les lunes et planètes',
		opt_galaxy_keepTipsDebris: 'Garder les infos-bulles pour les champs de débris',
		
		opt_msg_PlunderThreshold: 'Taille minimale pour pillage théorique (en K)',
		opt_msg_DebrisThreshold: 'Taille minimale pour recyclage théorique (en K)',
		opt_msg_foldSmallPlunder: 'Pliez les rapports avec le pillage et les débris inférieurs à la limite',
		opt_msg_showPlunder: 'Afficher le pillage dans les rapports d\'espionnage',
		opt_msg_addButtons: 'Ajouter des boutons pour les messages',
		opt_msg_fixColors: 'Fixer la couleur des rapports de combat', 
		
		opt_fleet_showCapacity: 'Afficher la vitesse et la capacité des flottes',
		opt_fleet2_setTargetDF: 'Selectionner automatiquement le champ de débris si la flotte inclus un recycleur',
		opt_fleet2_fixLayout: 'Corriger les informations d\'agencement',
		opt_fleet2_ShortLinks: 'Mini-liens de cibles',	
		
		opt_missionPriority: 'Priorité de la mission',
		
		opt_mvmt_expandFleets: 'Montrez la flotte et la cargaison de celle-ci',
		opt_mvmt_showReversal: 'Afficher le temps inversé pour les flottes',
		
		opt_missAttack: 'Couleur de mission: Attaquer',  
		opt_missColony: 'Couleur de mission: Coloniser',  
		opt_missDeploy: 'Couleur de mission: Déployer', 
		opt_missDestroy: 'Couleur de mission: Détruire',  
		opt_missEspionage: 'Couleur de mission: Espionner',   
		opt_missExpedition: 'Couleur de mission: Expédition', 
		opt_missFederation: 'Couleur de mission: Fédération',  
		opt_missHarvest: 'Couleur de mission: Recycler', 
		opt_missHold: 'Couleur de mission: Soutenir',   
		opt_missTransport: 'Couleur de mission: Transporter',
		
		// these label are shown in Options
		lbl_missAttack: 'Attaquer',  
		lbl_missColony: 'Coloniser',  
		lbl_missDeploy: 'Stationner',  
		lbl_missDestroy: 'Détruire',  	
		lbl_missEspionage: 'Espionner',  
		lbl_missExpedition: 'Expédition',  
		lbl_missFederation: 'Attaque groupée',  
		lbl_missHarvest: 'Recycler champ de débris',  
		lbl_missHold: 'Stationner chez cet allié',  
		lbl_missTransport: 'Transporter',
		//
		
		lbl_sectionGeneral: 'Général',
		lbl_sectionEventList: 'Mouvements de flotte',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Messages',
		lbl_sectionFleetDispatch: 'Envoi de flottes',
		lbl_sectionFleetMovement: ' Mouvements de flotte',
				
		lbl_optionsNote1: 'L\'option est sauvegardée uniquement pour cet univers',

                lbl_resetCoords: 'Réinitialiser  - ',

		lbl_TotalCapacity: 'Capacité totale',
		lbl_MinSpeed: 'Vitesse minimale',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Ressources',
		lbl_debris: 'Débris',
		lbl_total: 'Total',
		lbl_loot: 'Butin',
		lbl_metal: 'Métal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'PT',
		lbl_shipLCargoAlt: 'GT',
		lbl_shipRecyclerAlt: 'Recs',

		lbl_deficientRes: 'Ressources manquantes',
		lbl_Production: 'Production',
		lbl_ArrivalACS: 'Arrivée (ACS)',
		
		lbl_btnMarkReadAll: 'Marquer tous les messages sélectionnés comme lus',
		lbl_btnDeleteSmallPlunder: 'Supprimer les rapports d\'espionnage avec pillage < $plunder et débris < $debris',

		lbl_Moon: 'Lune',
		
		lbl_onTop: 'Au dessus',
		lbl_onBottom: 'En dessous',
		lbl_onLeft: 'A gauche'
	}

	AntiGame_lang.LabelsPT =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruír Lua',
		lbl_missEspionage: 'Espiar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'Ataque de Aliança',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Manter Posição',
		lbl_missTransport: 'Тransportar',

		lbl_shipSCargo: 'Cargueiro Pequeno',
		lbl_shipLCargo: 'Cargueiro Grande',
		lbl_shipLFighter: 'Caça Ligeiro',
		lbl_shipHFighter: 'Caça Pesado',
		lbl_shipCruiser: 'Cruzador',
		lbl_shipBattleship: 'Nave de Batalha',
		lbl_shipColonizator: 'Nave de Colonização',
		lbl_shipRecycler: 'Reciclador',
		lbl_shipSpy: 'Sonda de Espionagem',
		lbl_shipBomber: 'Bombardeiro',
		lbl_shipDestroyer: 'Destruídor',
		lbl_shipRIP: 'Estrela da Morte',
		lbl_shipBCruiser: 'Interceptor',
		lbl_shipSatellite: 'Satélite Solar',
		
		lbl_RequiredEnergy: 'Energia necessária'
	}

	AntiGame_lang.InterfacePT =
	{
		opt_languageName: 'Português',

		opt_title: 'Opções do AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Padrão',

		opt_language: 'Idioma',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_showLocalTime: "Mostrar hora local em vez da do servidor(apenas horas)",
		opt_showServerOgameClock: 'Manter hora do servidor no relógio do canto superior direito',
		opt_blockAutoComplete: 'Bloquear função Auto-Complete do Firefox',
		
		opt_uni_SpeedFactor: 'Velocidade deste universo',
		
		opt_killTips: 'Desactivar Tooltips',
		
		opt_showEventList: 'Mostrar Lista de Eventos na Vista Geral',
		opt_evt_showOnTop: 'Posição da Lista de Eventos',
		opt_evt_noScroll: 'Não mostrar barras de scroll ao visualizar tooltips',

		opt_galaxyShowRank: 'Mostrar Rank do jogador/aliança na Vista da Galáxia',
		opt_galaxyRankColor: 'Côr do rank do jogador/aliança',
		opt_galaxyDebrisMin: 'Tamanho mínimo de Destroços para destacar(0 para desligar)',
		opt_galaxyDebrisColor: 'Côr dos Destroços destacados',
		opt_galaxyHideMoon: 'Substituír imagem da Lua pelo tamanho',
		opt_galaxy_Players: 'Realçar os seguintes jogadores',
		opt_galaxy_PlayerColors: 'Côres para os jogadores realçados',
		opt_galaxy_Allys: 'Realçar as seguintes alianças',
		opt_galaxy_AllyColors: 'Côres para as alianças realçadas',
		opt_galaxy_keepTipsPlanets: 'Manter tooltips para Planetas e Luas',
		opt_galaxy_keepTipsDebris: 'Manter tooltips para os Campos de Destroços',

		opt_msg_PlunderThreshold: 'Valor mais baixo para o roubo teórico (x1000)',
		opt_msg_DebrisThreshold: 'Valor mais baixo para os destroços teóricos (x1000)',
		opt_msg_foldSmallPlunder: 'Apagar relatórios de espionagem com valores de roubo e destroços teóricos abaixo do mínimo',
		opt_msg_showPlunder: 'Mostrar detalhes de roubo nos Relatórios de Espionagem',
		opt_msg_addButtons: 'Botões adicionais nas Mensagens',
		opt_msg_fixColors: 'Mudar cores dos Relatórios de Combate',

		opt_showDeficient: 'Mostrar recursos em falta',
		opt_showResources: 'Mostrar informação adicional de recursos',
		opt_showNames: 'Mostrar nomes das naves/edifícios/tecnologias sobre as imagens',

		opt_fleet_showCapacity: 'Mostrar capacidade e velocidade das naves',
		opt_fleet2_setTargetDF: 'Definir destino "Campo de Destroços" se a frota incluír Recicladores',
		opt_fleet2_fixLayout: 'Corrigir o layout da página de briefing(Fleet2)',
		opt_fleet2_ShortLinks: 'Atalhos para outros planetas',
		
		opt_missionPriority: 'Prioridade das missões',

		opt_mvmt_expandFleets: 'Mostrar naves e carga da frota',
		opt_mvmt_showReversal: 'Mostrar hora de chegada após retirada da frota',

		opt_missAttack: 'Côr da Missão: Atacar',
		opt_missColony: 'Côr da Missão: Colonizar',
		opt_missDeploy: 'Côr da Missão: Transferir',
		opt_missDestroy: 'Côr da Missão: Destruír Lua',
		opt_missEspionage: 'Côr da Missão: Espiar',
		opt_missExpedition: 'Côr da Missão: Expedição',
		opt_missFederation: 'Côr da Missão: Ataque de Aliança',
		opt_missHarvest: 'Côr da Missão: Reciclar',
		opt_missHold: 'Côr da Missão: Manter Posição',
		opt_missTransport: 'Côr da Missão: Transportar',

		lbl_TotalCapacity: 'Capacidade Total',

		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruír Lua',
		lbl_missEspionage: 'Espiar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'Ataque de Aliança',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Manter Posição',
		lbl_missTransport: 'Transportar',
		
		lbl_sectionGeneral: 'Geral',
		lbl_sectionEventList: 'Lista de Eventos',
		lbl_sectionGalaxy: 'Galáxia',
		lbl_sectionMessages: 'Mensagens',
		lbl_sectionFleetDispatch: 'Envido de Frota',
		lbl_sectionFleetMovement: 'Movimento da Frota',
		
		lbl_optionsNote1: 'Esta opção será guardada apenas para este universo',

		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',

		lbl_resources: 'Recursos',
		lbl_debris: 'Destroços',
		lbl_total: 'Total',
		lbl_loot: 'Farm',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'CP',
		lbl_shipLCargoAlt: 'CG',
		lbl_shipRecyclerAlt: 'Recs',

		lbl_deficientRes: 'Recursos em falta',
		lbl_ArrivalACS: 'Chegada (ACS)',
		lbl_btnMarkReadAll: 'Marcar todas as mensagens como lidas',
		lbl_MinSpeed: 'Velocidade máxima',
		lbl_Production: 'Produção',

		lbl_Moon: 'Lua',
		lbl_onTop: 'Em cima',
		lbl_onBottom: 'Em baixo',
		lbl_onLeft: 'À esquerda'
	}
	
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
		
		opt_showDeficient: 'Arata lipsa de resurse',
		opt_showResources: 'Afiseaza extins informatiile despre resurse',
		opt_showNames: 'Aata denumirea navelor/uzinelor/cercetarilor peste imagine',
		opt_nameColorOn: 'Culoare misiunei: disponibil',
		opt_nameColorOff: 'Culoare misiunei: indisponibil',
		opt_nameColorDisabled: 'Culoare misiunei: Nu ajung resurse',
		
		opt_uni_SpeedFactor: 'Factorul de accelerare in acest univers',
		
		opt_killTips: 'Block pop-up sfaturi',

		opt_showEventList: 'Arata detaliat lista evenimentelor',
		opt_evt_showOnTop: 'Locatia listei de evenimente',
		opt_evt_noScroll: 'Nu arata liniile de derulare cadrului din afisarea sfaturilor',
		
		opt_galaxyShowRank: 'Arata rank-ul jucator/alianta in sistem',
		opt_galaxyRankColor: 'Culoarea pentru rank/alianta',
		opt_galaxyDebrisMin: 'CR-ul minim pentru iluminare (0 - nu este iluminat)',
		opt_galaxyDebrisColor: 'Culoarea ce ilumineaza CR',
		opt_galaxyHideMoon: 'Ascunde imaginea Lunii (in schimb arat dimensiunea Lunei)',
		opt_galaxy_Players: 'Ilumineaza urmatorii jucatori',
		opt_galaxy_PlayerColors: 'Culoarea pentru iluminarea jucatorilor',
		opt_galaxy_Allys: 'Ilumineaza urmatoarele aliante',
		opt_galaxy_AllyColors: 'Culoare pentru iluminarea aliantelor',
		opt_galaxy_keepTipsPlanets: 'Salveaza sfaturile pentru planete si luni',
		opt_galaxy_keepTipsDebris: 'Salveaza sfaturile pentru campurile de ramasite',

		opt_msg_PlunderThreshold: 'Limita minima pentru o posibila captura (x1000)',
		opt_msg_DebrisThreshold: 'Limina minima pentru un posibil derbis (x1000)',
		opt_msg_foldSmallPlunder: 'Minimizeaza rapoartele capturate cu o dobanda si derbis mai mic decat',
		opt_msg_showPlunder: 'Arata posibila capacitate capturata in rapoartele de spionaj',
		opt_msg_fixColors: 'Corecteaza culorile rapoartelor de lupta',
		opt_msg_addButtons: 'Butoane suplimentare un casuta de mesaje',
		
		opt_missionPriority: 'Sarcini prioritare',
		
		opt_fleet_showCapacity: 'Arata capacitatea cargo si viteza navelor',
		opt_fleet2_setTargetDF: 'Trimite la CR daca in flota exista reciclatoare',
		opt_fleet2_fixLayout: 'Corecteaza locatia si informatia despre misiune',
		opt_fleet2_ShortLinks: 'Lista tintelor pentru atasare rapida',
		
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
		
		lbl_shipSCargoAlt: 'Tm',
		lbl_shipLCargoAlt: 'TM',
		lbl_shipRecyclerAlt: 'Reciclatoare',
		
		lbl_deficientRes: 'Lipsa de resurse',
		lbl_Production: 'Producere',
		lbl_ArrivalACS: 'Intoarcere (SAL)',
		
		lbl_btnMarkReadAll: 'Noteaza toate mesajele ca fiind citite',
		lbl_btnDeleteSmallPlunder: 'A sterge toate mesajele cu dobanda de < $plunder si derbis de < $debris',
		
		lbl_Moon: 'Luna',
		lbl_onTop: 'Sus',
		lbl_onBottom: 'Jos',
		lbl_onLeft: 'In stanga'
	}
	
	AntiGame_lang.LabelsSI =
	{
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Premik',
		lbl_missDestroy: 'Unicenje lune',
		lbl_missEspionage: 'Vohuni',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'ACS napad',
		lbl_missHarvest: 'Recikliraj ruševine',
		lbl_missHold: 'ACS obramba',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Majhna tovorna ladja',
		lbl_shipLCargo: 'Velika tovorna ladja',
		lbl_shipLFighter: 'Lahek lovec',
		lbl_shipHFighter: 'Težki lovec',
		lbl_shipCruiser: 'Križarka',
		lbl_shipBattleship: 'Bojna ladja',
		lbl_shipColonizator: 'Kolonizacijska ladja',
		lbl_shipRecycler: 'Recikler',
		lbl_shipSpy: 'Vohunska sonda',
		lbl_shipBomber: 'Bombnik',
		lbl_shipDestroyer: 'Uničevalec',
		lbl_shipRIP: 'Zvezda smrti',
		lbl_shipBCruiser: 'Bojna križarka',
		lbl_shipSatellite: 'Sončni satelit',
		
		lbl_RequiredEnergy: 'Potrebno energije'
		
	}
	
	AntiGame_lang.InterfaceSI =
	{
		opt_languageName: 'Slovenski',
	
		opt_title: 'AntiGame možnosti',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Prekliči',
		opt_btnDefault: 'Privzeto',

		opt_language: 'Jezik',
		opt_autocopyCoords: 'Avtomatsko kopiraj koordinate',
		opt_showLocalTime: "Pokaži lokalni čas namesto časa strežnika (samo ure)",
		opt_showServerOgameClock: 'Obdrži čas strežnika za uro v zgornjem desnem kotu',
		opt_blockAutoComplete: 'Blokiraj avtomatsko dokončanje v Firefoxu',

		opt_showEventList: 'Prikaži premike flot razširjene na Pregledu',
		opt_evt_showOnTop: 'Položaj premikov flot na strani Pregled',
		opt_evt_noScroll: 'Ne prikazuj drsnikov pri prikazu namigov',
		
		opt_galaxyShowRank: 'Prikaži mesto (toplista) igralca/alianse v Galaksiji',
		opt_galaxyRankColor: 'Barva mesta igralca/alianse',
		opt_galaxyDebrisMin: 'Minimalna velikost ruševin, ki so označene (vnesi 0 za izklop)',
		opt_galaxyDebrisColor: 'Določi barvo za označitev ruševin',
		opt_galaxyHideMoon: 'Skrij sliko Lune (namesto slike prikaži velikost lune)',
		opt_galaxy_Players: 'Označi naslednje igralce',
		opt_galaxy_PlayerColors: 'Določi barve za označitev igralcev',
		opt_galaxy_Allys: 'Označi naslednje alianse',
		opt_galaxy_AllyColors: 'Določi barve za označitev alians',
		opt_galaxy_killTips: 'Skrij vse namige (bljižnice) v Galaksiji',
		opt_galaxy_keepTipsPlanets: 'Obdrži namige (bljižnice) za planete in lune',
		opt_galaxy_keepTipsDebris: 'Obdrži namige (bljižnice) za ruševine',
		
		opt_msg_PlunderThreshold: 'Spodnji limit za teoretični plen (x1000)',
		opt_msg_DebrisThreshold: 'Spodnji limit za teoretične ruševine (x1000)',
		opt_msg_foldSmallPlunder: 'Preskoči poročila z plenom in ruševinami manjšimi od limita',
		opt_msg_showPlunder: 'Prikaži plen v vohunskih poročilih',
		opt_msg_addButtons: 'Dodatni gumbi pri Sporočilih',
		opt_msg_fixColors: 'Popravi barve poročil bitk',
		
		opt_showDeficient: 'Prikaži manjkajoče surovine',
		opt_showResources: 'Prikaži dodatne informacije o surovinah',
		
		opt_fleet_showCapacity: 'Prikaži kapaciteto ladij in hitrost',
		opt_fleet2_setTargetDF: 'Nastavi destinacijo na ruševine, če flota vsebuje reciklerje',
		opt_fleet2_fixLayout: 'Popravi okno misije',
		opt_fleet2_ShortLinks: 'Bljižnice do tarče',
		
		opt_missionPriority: 'Prioriteta misij',
		
		opt_mvmt_expandFleets: 'Prikaži ladje in tovor flote',
		opt_mvmt_showReversal: 'Prikaži čase vrnitve za flote',
		
		opt_missAttack: 'Barva misije: Napad',
		opt_missColony: 'Barva misije: Kolonizacija',
		opt_missDeploy: 'Barva misije: Premik',
		opt_missDestroy: 'Barva misije: Uničenje lune',
		opt_missEspionage: 'Barva misije: Vohuni',
		opt_missExpedition: 'Barva misije: Ekspedicija',
		opt_missFederation: 'Barva misije: ACS napad',
		opt_missHarvest: 'Barva misije: Recikliraj',
		opt_missHold: 'Barva misije: ACS obramba',
		opt_missTransport: 'Barva misije: Transport',
		
		// these label are shown in Options
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Premik',
		lbl_missDestroy: 'Uničenje lune',
		lbl_missEspionage: 'Vohuni',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'ACS napad',
		lbl_missHarvest: 'Recikliraj ruševine',
		lbl_missHold: 'ACS obramba',
		lbl_missTransport: 'Transport',
		//
		
		lbl_sectionGeneral: 'Splošno',
		lbl_sectionEventList: 'Premiki flot',
		lbl_sectionGalaxy: 'Galaksija',
		lbl_sectionMessages: 'Sporočila',
		lbl_sectionFleetDispatch: 'Pošiljanje flot',
		lbl_sectionFleetMovement: 'Premiki flot',
		
		lbl_optionsNote1: 'Možnost je shranjena samo za to vesolje',
		
		lbl_TotalCapacity: 'Skupna kapaciteta',
		lbl_MinSpeed: 'Minimalna hitrost',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Surovine',
		lbl_debris: 'Ruševine',
		lbl_total: 'Skupno',
		lbl_loot: 'Plen',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'VT',
		lbl_shipRecyclerAlt: 'Rec',
		
		lbl_deficientRes: 'Manjkajoče surovine',
		lbl_Production: 'Proizvodnja',
		lbl_ArrivalACS: 'Prihod (ACS)',
		
		lbl_btnMarkReadAll: 'Označi vsa prikazana sporočila kot prebrana',
		lbl_btnDeleteSmallPlunder: 'Izbriši vohunska poročila s plenom < $plunder in ruševinami < $debris',
		
		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Na vrhu',
		lbl_onBottom: 'Na dnu'
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