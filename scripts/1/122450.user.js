// ==UserScript==
// @name           AntiGam_lang_all
// @namespace      antikiller
// @description    AntiGame translation (must be run before main AntiGame)
// @date           2012-01-15
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsBA =
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
		lbl_shipCruiser: 'Krstarice',
		lbl_shipBattleship: 'Borbeni brodovi',
		lbl_shipColonizator: 'Kolonijalni brod',
		lbl_shipRecycler: 'Recikler',
		lbl_shipSpy: 'Sonde za spijunazu',
		lbl_shipBomber: 'Bombarder',
		lbl_shipDestroyer: 'Razaraci',
		lbl_shipRIP: 'Zvijezda smrti',
		lbl_shipBCruiser: 'Oklopna krstarica',
		lbl_shipSatellite: 'Solarni satelit',
		
		lbl_defRLauncher: 'Raketobacaci',
		lbl_defLLaser: 'Mali laser',
		lbl_defHLaser: 'Veliki laser',
		lbl_defGauss: 'Gaussov top',
		lbl_defIon: 'Ionski top',
		lbl_defPlasma: 'Plazma top',
		lbl_defSShield: 'Mala stitna kupola',
		lbl_defLShield: 'Velika stitna kupola',
		
		lbl_RequiredEnergy: 'Potrebno energije',
		
		rx_sendMail: /Pošalji poruku (.+)\./
	};
	
	AntiGame_lang.InterfaceBA =
	{
		opt_languageName: 'Bosnian',
	
		opt_title: 'AntiGame Opcije',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Poništi',
		opt_btnDefault: 'Zadano',

		opt_language: 'Jezik',
		opt_update_check: 'Automatska provjera za nadogradnju',
		opt_thousandSeparator: 'Zarez za hiljadu',
		opt_blockAutoComplete: 'Blokiraj Auto-Complete u Firefoxu',
		
		opt_showDeficient: 'Prikaži nedostajuce resurse',
		opt_showResources: 'Prikaži dodatne informacije o resursima',
		opt_showNames: 'Prikaži imena preko slika za brodove/zgrade/istraživanja',
		opt_nameColorOn: 'Naziv boje: Moguce',
		opt_nameColorOff: 'Naziv boje: Nije moguce',
		opt_nameColorDisabled: 'Naziv boje: nedovoljno resursa',
		opt_showConstructionTitle: 'Prikaži nazive gradnji na listi planeta',
		opt_shortHeader: 'Uvijek smanji sliku planete',
		opt_misc_scrollTitle: 'Prikaži vrijeme sljedece flote u naslovu prozora/taba',

		opt_uni_SpeedFactor: 'Faktor brzine za ovaj uni',
		opt_uni_DFPercent: 'Postotak flote koji se pretvara u ruševinu',
		opt_uni_DefenseToDF: 'Postotak obrane koji se pretvara u ruševinu',
		
		opt_timeSetting: 'Promjeni postavke vremena (samo za sate)',
		opt_showServerOgameClock: 'Zadrži prikaz vremena servera u gornjem desnom uglu',
		opt_showServerPhalanx: 'Zadrži vrijeme servera za Falangu',
		opt_showPageStartTime: 'Prikaži vrijeme kada je stranica zadnji puta osvježena',
		opt_timeAMPM: 'Koristi 12-satni format (AM/PM) umjesto 24-satnog',
		
		opt_timeDontChange: 'Ne mijenjaj vrijeme',
		opt_timeLocal: 'Uvijek prikazuj lokalno vrijeme',
		opt_timeServer: 'Uvijek prikazuj vrijeme servera',

		opt_killTips: 'Ne prikazuj tooltipse',

		opt_evt_dimReverse: 'Zatamni flote na povratku',
		opt_phalanx_showDebris: 'Prikaži teoretsku velicinu ruševine u Falangi',
		opt_evt_expandFleetsEvt: 'Prikaži sastav flote i teret (u listi dogadanja)',
		opt_evt_expandFleetsPhal: 'Prikaži sastav flote i teret (Falanga)',

		opt_galaxyShowRank: 'Prikaži rang igraca/saveza u galaksiji',
		opt_galaxyRankColor: 'Boja za rang igraca/saveza',
		opt_galaxyDebrisMin: 'Minimalna velicina ruševine koja ce se istaknuti (0 za iskljuciti)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Boja istaknutih ruševina',
		opt_galaxyHideMoon: 'Sakrij sliku mjeseca (umjesto slike prikaži velicinu mjeseca)',
		opt_galaxy_Players: 'Oznaci sljedece igrace',
		opt_galaxy_PlayerColors: 'Boje za oznacavanje igraca',
		opt_galaxy_Allys: 'Oznaci slijedece saveze',
		opt_galaxy_AllyColors: 'Boje za oznacavanje saveza',
		opt_galaxy_keepTipsPlanets: 'Zadrži prikaz tooltipsa za planete i mjesece',
		opt_galaxy_keepTipsDebris: 'Zadrži prikaz tooltipsa za ruševine',
		
		opt_msg_PlunderThreshold: 'Donji limit za teoretski plijen (x1000)',
		opt_msg_DebrisThreshold: 'Donji limit za teoretsku ruševinu (x1000)',
		opt_msg_foldSmallPlunder: 'Skopiti izvješca s pljackom i ruševinama manjih od zadanog minimuma',
		opt_msg_showPlunder: 'Prikaži plijen u izvješcu špijunaže',
		opt_msg_addButtons: 'Dodatne tipke na porukama',
		opt_msg_fixColors: 'Podesi boje borbenih izvještaja',
		
		opt_fleet_showCapacity: 'Prikaži kapacitet i brzinu brodova',
		opt_fleet1_showResCalc: 'Prikaži kalkulator za resurse',
		opt_uni_maxPlayerScore: 'Najjaci igrac ima više bodova',
		opt_autocopyCoords: 'Automatski kopiraj koordinate',
		opt_autocopyGlobal: 'Zapamti koordinate sa bilokoje stranice (sa svih OGame tabova)',
		opt_fleet2_setTargetDF: 'Namjesti cilj na ruševinu ako u floti ima reciklera',
		opt_fleet2_fixLayout: 'Popravi prikaz menija za slanje flote (stranica 2)',
		opt_fleet2_ShortLinks: 'Precica do mete (stranica 2)',
		opt_fleet2_MoonColor: 'Boja za mjesece u izborniku',
		opt_fleet2_MoonsToEnd: 'Premjesti mjesece na kraj liste',
		opt_fleet2_expandLists: 'Proširi padajuce izbornike (Brzina, Kratice za planete, AKS)',
		opt_fleet2_checkProbeCapacity: 'Provjeri kapacitet sonde prije slanja (stranica 2)',
		
		opt_missionPriority: 'Prioritet misije',
		
		opt_mvmt_expandFleets: 'Pokaži sastav flote i teret flote',
		opt_mvmt_showReversal: 'Pokaži vrijeme povratka flote',
		
		opt_missAttack: 'Boja misije: Napad',
		opt_missColony: 'Boja misije: Kolonizacija',
		opt_missDeploy: 'Boja misije: Stationirati',
		opt_missDestroy: 'Boja misije: Unistiti',
		opt_missEspionage: 'Boja misije: Spijunaza',
		opt_missExpedition: 'Boja misije: Ekspedicija',
		opt_missFederation: 'Boja misije: AKS',
		opt_missHarvest: 'Boja misije: Recikliraj ruševinu',
		opt_missHold: 'Boja misije: Pauzirati',
		opt_missTransport: 'Boja misije: Transport',
		opt_msg_addSimButton: 'Dodaj gumbove za online simulaciju borbi',

		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Stationirati',
		lbl_missDestroy: 'Unistiti',
		lbl_missEspionage: 'Spijunaza',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'AKS napad',
		lbl_missHarvest: 'Reciklirati ruševinu',
		lbl_missHold: 'Pauzirati',
		lbl_missTransport: 'Transport',

		lbl_sectionGeneral: 'Opcenito',
		lbl_sectionUniverse: 'Universe',
		lbl_sectionTime: 'Postavke vremena',
		lbl_sectionEventList: 'Dogadanja & Falanga',
		lbl_sectionGalaxy: 'Galaksija',
		lbl_sectionMessages: 'Poruke',
		lbl_sectionFleetDispatch: 'Otpremanje flota',
		lbl_sectionFleetMovement: 'Kretanje flota',
		
		lbl_optionsNote1: 'Opcija je spremljena samo za ovaj uni',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Ukupni kapacitet',
		lbl_MinSpeed: 'Minimalna brzina',
		lbl_ExPoints: 'Ekspedicijski poeni',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Resursi',
		lbl_debris: 'Ruševine',
		lbl_total: 'Ukupno',
		lbl_loot: 'Plijen',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'VT',
		lbl_shipRecyclerAlt: 'Rec',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Nedostajuci resursi',
		lbl_Production: 'Proizvodnja',
		lbl_ArrivalACS: 'Dolazak (AKS)',
		
		lbl_btnMarkReadAll: 'Oznaci sve prikazane poruke kao procitane',
		lbl_btnDeleteSmallPlunder: 'Izbriši sva izvješca gdje je plijen < $plunder i ruševina < $debris',
		
		lbl_Moon: 'Mjesec',
		
		lbl_onTop: 'Na vrhu',
		lbl_onBottom: 'Na dnu',
		lbl_onLeft: 'Na lijevo',
		
		lbl_installNewVersion: 'Klikni za instalaciju nove verzije',
		lbl_Save: 'Sacuvaj',
		lbl_Clear: 'Ocisti',
		lbl_Quantity: 'Kolicina',
		lbl_Duration: 'Trajanje',
		lbl_Consumption: 'Potrošnja',
		
		lbl_tmTime: 'Vrijeme',
		lbl_tmCountdown: 'Odbrojavanje'
	};
	
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
		opt_galaxyDebrisMul: 'Стандартни (СИ) съкращения за размера на отломките',
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
		opt_msg_addButtons: 'Допълнителни бутони на съобщенията',
		opt_msg_fixColors: 'Поправка на цветовете на бойните доклади',

		opt_fleet_showCapacity: 'Показване на товароподемността и скоростта на корабите',
		opt_fleet1_showResCalc: 'Показване на калкулатора за ресурси',
		opt_uni_maxPlayerScore: 'Най-силният играч във вселената има точки',
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
	
	AntiGame_lang.LabelsBR =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espionar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'Ataque em Aliança',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Guardar Posições',	
		lbl_missTransport: 'Transportar',

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
		lbl_shipDestroyer: 'Destruidor',
		lbl_shipRIP: 'Estrela da Morte',
		lbl_shipBCruiser: 'Interceptador',
		lbl_shipSatellite: 'Satélite Solar',

		lbl_defRLauncher: 'Lançador de Mísseis',
		lbl_defLLaser: 'Laser Ligeiro',
		lbl_defHLaser: 'Laser Pesado',
		lbl_defGauss: 'Canhão de Gauss',
		lbl_defIon: 'Canhão de Íons',
		lbl_defPlasma: 'Canhão de Plasma',
		lbl_defSShield: 'Pequeno Escudo Planetário',
		lbl_defLShield: 'Grande Escudo Planetário',

		lbl_RequiredEnergy: 'Energia necessária',

		rx_sendMail: /Enviar uma mensagem a (.+)\./
	};

	AntiGame_lang.InterfaceBR =
	{
		opt_languageName: 'Português (BR)',

		opt_title: 'Opções AntiGame',
		opt_btnOk: 'Confirmar',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Padrão',

		opt_language: 'Idioma',
		opt_update_check: 'Procura automática de atualizações',
		opt_thousandSeparator: 'Separador de Milhares',
		opt_blockAutoComplete: 'Bloquear Autocompletar do Firefox',

		opt_showDeficient: 'Mostrar os recursos que faltam',
		opt_showResources: 'Mostrar informações adicionais de recursos',
		opt_showNames: 'Mostrar os nomes de naves/edifícios/pesquisas sobre as imagens',
		opt_nameColorOn: 'Cor no Nome: disponível',
		opt_nameColorOff: 'Cor no Nome: indisponível',
		opt_nameColorDisabled: 'Cor no Nome: sem recursos suficientes',
		opt_showConstructionTitle: 'Mostrar as construções em curso na lista do planeta',
		opt_shortHeader: 'Minimizar sempre a imagem do Planeta',
		opt_misc_scrollTitle: 'Passar no título da janela o tempo para o próximo evento',

		opt_uni_SpeedFactor: 'Velocidade do Universo',
		opt_uni_DFPercent: 'Percentagem de frota para destroços',
		opt_uni_DefenseToDF: 'Percentagem de defensa para destroços',

		opt_timeSetting: 'Mudar valores do tempo (só horas)',
		opt_showServerOgameClock: 'Manter a hora do servidor no relógio superior direito do OGame',
		opt_showServerPhalanx: 'Manter a hora do servidor na vista Phalanx',
		opt_showPageStartTime: 'Mostrar a hora em que a página foi atualizada pela ultima vez',
		opt_timeAMPM: 'Usar formato 12horas (AM/PM) no lugar do formato 24horas',

		opt_timeDontChange: 'Não alterar a hora',
		opt_timeLocal: 'Manter sempre a hora local',
		opt_timeServer: 'Manter sempre a hora do servidor',

		opt_killTips: 'Desactivar tooltips',

		opt_evt_dimReverse: 'Escurecer as frotas em retorno',
		opt_phalanx_showDebris: 'Mostrar os destroços teóricos na vista Phalanx',
		opt_evt_expandFleetsEvt: 'Mostrar a composição da frota e capacidade de carga (Lista de Eventos)',
		opt_evt_expandFleetsPhal: 'Mostrar a composição da frota e capacidade de carga (Phalanx)',

		opt_galaxyShowRank: 'Mostrar classificação jogador/aliança na vista Galáxia',
		opt_galaxyRankColor: 'Cor na classificação jogador/aliança',
		opt_galaxyDebrisMin: 'Tamanho mínimo dos destroços em destaque (0 para desativar)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Cor dos destroços em destaque',
		opt_galaxyHideMoon: 'Eliminar imagem das Luas (mostrar unicamente o tamanho)',
		opt_galaxy_Players: 'Jogadores seguintes em destaque',
		opt_galaxy_PlayerColors: 'Cor para jogadores seguintes',
		opt_galaxy_Allys: 'Alianças seguintes em destaque',
		opt_galaxy_AllyColors: 'Cor para as alianças seguintes',
		opt_galaxy_keepTipsPlanets: 'Manter tooltips para planetas e luas',
		opt_galaxy_keepTipsDebris: 'Manter tooltips para destroços',

		opt_msg_PlunderThreshold: 'Valor mínimo para roubo teórico (x1000)',
		opt_msg_DebrisThreshold: 'Valor mínimo para destroços teórico (x1000)',
		opt_msg_foldSmallPlunder: 'Ocultar as informações do roubo e destroços abaixo desse valor',
		opt_msg_showPlunder: 'Mostrar o roubo no relatório de espionagem',
		opt_msg_addButtons: 'Adicionar botões às mensagens',
		opt_msg_fixColors: 'Corrigir cores nos relatórios de combate',

		opt_fleet_showCapacity: 'Mostrar a capacidade de carga e velocidade das naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_uni_maxPlayerScore: 'O jogador mais forte tem pontos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_autocopyGlobal: 'Memorizar coordenadas de qualquer página (não só no separador do universo atual)',
		opt_fleet2_setTargetDF: 'Definir destino Campo de Destroços se a sua frota incluir recicladores',
		opt_fleet2_fixLayout: 'Corrigir layout de informação de voo (página 2)',
		opt_fleet2_ShortLinks: 'Direcionar atalhos (página 2)',
		opt_fleet2_MoonColor: 'Colorir luas na lista de atalhos',
		opt_fleet2_MoonsToEnd: 'Mover luas para o final da lista de atalhos',
		opt_fleet2_expandLists: 'Expandir caixas de seleção (Velocidade, Atalhos, ACSs)',
		opt_fleet2_checkProbeCapacity: 'Verificar a capacidade das sondas antes do envio (página 2)',

		opt_missionPriority: 'Prioridade da missão',

		opt_mvmt_expandFleets: 'Mostrar as naves e capacidade de carga da frota',
		opt_mvmt_showReversal: 'Mostrar a hora do regresso da frota',

		opt_missAttack: 'Cor para a missão: Atacar',
		opt_missColony: 'Cor para a missão: Colonizar',
		opt_missDeploy: 'Cor para a missão: Transferir',
		opt_missDestroy: 'Cor para a missão: Destruir Lua',
		opt_missEspionage: 'Cor para a missão: Espiar',
		opt_missExpedition: 'Cor para a missão: Expedição',
		opt_missFederation: 'Cor para a missão: Ataque em Aliança',
		opt_missHarvest: 'Cor para a missão: Reciclar',
		opt_missHold: 'Cor para a missão: Manter posições',
		opt_missTransport: 'Cor para a missão: Transportar',
		opt_msg_addSimButton: 'Adicionar botões para submeter os relatórios de espionagem ao simulador',

		lbl_missAttack: 'Ataque',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espiar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'Ataque em Aliança',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Manter posições',
		lbl_missTransport: 'Transportar',

		lbl_sectionGeneral: 'Geral',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Configurações da Hora',
		lbl_sectionEventList: 'Lista de Eventos & Phalanx',
		lbl_sectionGalaxy: 'Galáxia',
		lbl_sectionMessages: 'Mensagens',
		lbl_sectionFleetDispatch: 'Envio de Frota',
		lbl_sectionFleetMovement: 'Movimento de Frotas',

		lbl_optionsNote1: 'A opção é guardada apenas para este Universo',

		lbl_resetCoords: 'Limpar coordenada - ',

		lbl_TotalCapacity: 'Capacidade total',
		lbl_MinSpeed: 'Velocidade mínima',
		lbl_ExPoints: 'Pontos de Expedição',
		lbl_mvmt_Return: 'R',

		lbl_resources: 'Recursos',
		lbl_debris: 'Destroços',
		lbl_total: 'Total',
		lbl_loot: 'Roubo',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',

		lbl_shipSCargoAlt: 'CP',
		lbl_shipLCargoAlt: 'CG',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat.',

		lbl_deficientRes: 'Recursos necessários',
		lbl_Production: 'Produção',
		lbl_ArrivalACS: 'Chegada (ACS)',

		lbl_btnMarkReadAll: 'Marcar todas as mensagens como lidas',
		lbl_btnDeleteSmallPlunder: 'Apagar os relatórios de espionagem com roubo < $roubo e destroços < $destroços',

		lbl_Moon: 'Lua',

		lbl_onTop: 'No topo',
		lbl_onBottom: 'Em baixo',
		lbl_onLeft: 'À esquerda',

		lbl_installNewVersion: 'Clique para instalar a nova versão',
		lbl_Save: 'Guardar',
		lbl_Clear: 'Limpar',
		lbl_Quantity: 'Quantidade',
		lbl_Duration: 'Duração',
		lbl_Consumption: 'Consumo',

		lbl_tmTime: 'Hora',
		lbl_tmCountdown: 'Contagem regressiva'
	};	

	AntiGame_lang.LabelsCZ =
	{
		lbl_missAttack: 'Útok',
		lbl_missColony: 'Kolonizace',
		lbl_missDeploy: 'Rozmístìní',
		lbl_missDestroy: 'Znièení Mìsíce',
		lbl_missEspionage: 'Špionáž',
		lbl_missExpedition: 'Expedice',
		lbl_missFederation: 'APP útok',
		lbl_missHarvest: 'Vytìžit pole trosek',
		lbl_missHold: 'APP obrana',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Malý transportér',
		lbl_shipLCargo: 'Velký transportér',
		lbl_shipLFighter: 'Lehký stíhaè',
		lbl_shipHFighter: 'Tìžký stíhaè',
		lbl_shipCruiser: 'Køížník',
		lbl_shipBattleship: 'Bitevní loï',
		lbl_shipColonizator: 'Kolonizaèní loï',
		lbl_shipRecycler: 'Recyklátor',
		lbl_shipSpy: 'Špionážní sonda',
		lbl_shipBomber: 'Bombardér',
		lbl_shipDestroyer: 'Destroyer',
		lbl_shipRIP: 'Hvìzda smrti',
		lbl_shipBCruiser: 'Bitevní krížník',
		lbl_shipSatellite: 'Solární satelit',
		
		lbl_defRLauncher: 'Raketomet',
		lbl_defLLaser: 'Lehký laser',
		lbl_defHLaser: 'Težký laser',
		lbl_defGauss: 'Gauss kanón',
		lbl_defIon: 'Ion kanón',
		lbl_defPlasma: 'Plasmová vìž',
		lbl_defSShield: 'Malý planetární štít',
		lbl_defLShield: 'Velký planetární štít',
		
		lbl_RequiredEnergy: 'Potøebná energie',
		
		rx_sendMail: /Odešli zprávu (.+)\./
	};
	
	AntiGame_lang.InterfaceCZ =
	{
		opt_languageName: 'Èeština',
	
		opt_title: 'AntiGame Origin nastavení',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Storno',
		opt_btnDefault: 'Výchozí',

		opt_language: 'Jazyk',
		opt_update_check: 'Automaticky kontrolovat aktualizace',
		opt_thousandSeparator: 'Oddìlovaè tisícù',
		opt_blockAutoComplete: 'Blokovat automatické doplòování ve Firefoxu',
		
		opt_showDeficient: 'Zobrazovat chybìjící suroviny',
		opt_showResources: 'Zobrazovat rozšíøené info o zdrojích',
		opt_showNames: 'Zobrazovat názvy lodí/budov/výzkumù (pøes obrázky)',
		opt_nameColorOn: 'Typ barvy: dostupné',
		opt_nameColorOff: 'Typ barvy: nedostupné',
		opt_nameColorDisabled: 'Typ barvy: nedostatek zdrojù',
		opt_showConstructionTitle: 'Zobrazovat názvy výstavby v seznamu planet',
		opt_shortHeader: 'Vždy zmenšit obrázky planet',
		opt_misc_scrollTitle: 'Zobrazovat èas do další události v titulku okna',

		opt_uni_SpeedFactor: 'Faktor rychlosti tohoto vesmíru',
		opt_uni_DFPercent: 'Procenta složení letky z nichž vzniknou trosky',
		opt_uni_DefenseToDF: 'Procenta obrany z nichž vzniknou trosky', 
		
		opt_timeSetting: 'Zmìnit èasové hodnoty (jen hodiny)',
		opt_showServerOgameClock: 'Nechat Ogame hodiny vpravo nahoøe ukazovat serverový èas',
		opt_showServerPhalanx: 'Nechat serverový èas pro zobrazení falang',
		opt_showPageStartTime: 'Zobrazovat èas poslední aktualizace stránky',
		opt_timeAMPM: 'Používat 12hodinový formát èasu (AM/PM) namísto 24hodinového',
		
		opt_timeDontChange: 'Nemìnit èas',
		opt_timeLocal: 'Vždy nastavit na místní èasové pásmo',
		opt_timeServer: 'Vždy nastavit na èasové pásmo serveru',

		opt_killTips: 'Zakázat bublinové nápovìdy',

		opt_evt_dimReverse: 'Potlaèit vracející se letky',
		opt_phalanx_showDebris: 'Zobrazovat teoretické trosky v zobrazení senzoru falang', 
		opt_evt_expandFleetsEvt: 'Zobrazit složení letky a transportu (Seznam událostí)',
		opt_evt_expandFleetsPhal: 'Zobrazit složení letky a transportu (Senzor Falang)', 
		
		opt_galaxyShowRank: 'Zobrazovat hodnocení hráèe/aliance v pøehledu Galaxie',
		opt_galaxyRankColor: 'Barvy hodnocení hráèe/aliance',
		opt_galaxyDebrisMin: 'Minimální velikost trosek pro zvýraznìní (0 = vypnuto)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Barva zvýraznìných trosek',
		opt_galaxyHideMoon: 'Skrýt obrázek mìsíce (zobrazit jeho velikost)',
		opt_galaxy_Players: 'Zvýraznit následující hráèe',
		opt_galaxy_PlayerColors: 'Barvy pro zvýraznìní hráèù',
		opt_galaxy_Allys: 'Zvýraznit následující aliance',
		opt_galaxy_AllyColors: 'Barvy pro zvýraznìní aliancí',
		opt_galaxy_keepTipsPlanets: 'Ponechat bublinové nápovìdy pro planety a jejich mìsíce',
		opt_galaxy_keepTipsDebris: 'Ponechat bublinové nápovìdy pro pole trosek',
		
		opt_msg_expandBox: 'Zvìtšit výšku zobrazených zpráv',
		opt_msg_PlunderThreshold: 'Nejnižší hranice pro teoretickou koøist (x1000)',
		opt_msg_DebrisThreshold: 'Nejnižší hranice pro teoretické trosky (x1000)',
		opt_msg_foldSmallPlunder: 'Rozvinout zprávy s koøistí a troskami nižšími než nejnižší hranice',
		opt_msg_showPlunder: 'Zobrazovat koøist ve špionážních zprávách',
		opt_msg_addButtons: 'Pøídavná tlaèítka u zpráv',
		opt_msg_fixColors: 'Upravit barvy bitevních zpráv',
		
		opt_fleet_showCapacity: 'Odeslání letky I: Zobrazovat kapacitu a rychlost lodí',
		opt_fleet1_showResCalc: 'Odeslání letky I: Zobrazovat kalkulaèku zdrojù',
		opt_uni_maxPlayerScore: 'Odeslání letky I: Nejsilnìjší hráè má bodù',
		opt_fleet1_killTips: 'Odeslání letky I: Zrušit bublinové nápovìdy',
		opt_autocopyCoords: 'Odeslání letky II: Automaticky kopírovat souøadnice',
		opt_autocopyGlobal: 'Odeslání letky II: Pamatovat si souøadnice ze všech stránek (nejen panely s tímto vesmírem)', 
		opt_fleet2_setTargetDF: 'Odeslání letky II: Nastavit cíl na DF pokud letka obsahuje recyklátory',
		opt_fleet2_fixLayout: 'Odeslání letky II: Opravit rozložení letových informací (strana 2)',
		opt_fleet2_ShortLinks: 'Odeslání letky II: Seznam zkratek (strana 2)',
		opt_fleet2_MoonColor: 'Odeslání letky II: Barvy mìsícù v seznamu zkratek',
		opt_fleet2_MoonsToEnd: 'Odeslání letky II: Umístit mìsíce na konec seznamu zkratek',
		opt_fleet2_expandLists: 'Odeslání letky II: Rozbalovat rozbalovací nabídky (Rychlost, Seznam zkratek, ACS)',
		opt_fleet2_checkProbeCapacity: 'Odeslání letky II: Zkontrolovat kapacitu špionážních sond pøi odesílání (strana 2)',
		opt_missionPriority: 'Odeslání letky III: Priorita misí',
		
		opt_mvmt_expandFleets: 'Zobrazovat lodì a transportéry letky',
		opt_mvmt_showReversal: 'Zobrazovat obrácený èas pro letky',
		
		opt_missColor: 'Barva mise: ',
		opt_msg_addSimButton: 'Pøidat tlaèítko pro naèítání reportu do simulátoru',
		
		lbl_sectionGeneral: 'Obecné',
		lbl_sectionUniverse: 'Vesmír',
		lbl_sectionTime: 'Nastavení èasu',
		lbl_sectionEventList: 'Seznam událostí a senzor falang',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Zprávy',
		lbl_sectionFleetDispatch: 'Odeslání letky',
		lbl_sectionFleetMovement: 'Pøesun letky',
		
		lbl_optionsNote1: 'Volba je uložena pouze pro tento vesmír',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Celková kapacita',
		lbl_MinSpeed: 'Minimální rychlost',
		lbl_ExPoints: 'Body expedice',
		lbl_mvmt_Return: 'N',
		
		lbl_resources: 'Zdroje',
		lbl_debris: 'Trosky',
		lbl_total: 'Celkem',
		lbl_loot: 'Koøist',
		lbl_metal: 'Kov',
		lbl_crystal: 'Krystaly',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'VT',
		lbl_shipRecyclerAlt: 'Rec',
		lbl_shipSatelliteAlt: 'Sat',
		
		lbl_deficientRes: 'Chybìjící zdroje',
		lbl_Production: 'Produkce',
		lbl_ArrivalACS: 'Pøílet (APP)',
		
		lbl_btnMarkReadAll: 'Oznaèit všechny zobrazené zprávy jako pøeètené',
		lbl_btnDeleteSmallPlunder: 'Smazat špionážní zprávy s koøistí nižší než < $plunder a troskami < $debris',
		
		lbl_Moon: 'Mìsíc',
		
		lbl_onTop: 'Nahoøe',
		lbl_onBottom: 'Dole',
		lbl_onLeft: 'Vlevo',
		
		lbl_installNewVersion: 'Pro instalaci nové verze kliknìte',
		lbl_Save: 'Uložit',
		lbl_Clear: 'Vymazat',
		lbl_Quantity: 'Množství',
		lbl_Duration: 'Trvání',
		lbl_Consumption: 'Spotøeba deuteria',
		
		lbl_tmTime: 'Èas',
		lbl_tmCountdown: 'Odpoèet'
	};
	
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
	};

	AntiGame_lang.InterfaceDE =
	{
		opt_languageName: 'Deutsch',
	
		opt_title: 'AntiGame Optionen',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Abbr.',
		opt_btnDefault: 'Standart',

		opt_language: 'Sprache',
		opt_update_check: 'Automatisch nach Updates suchen',
		opt_thousandSeparator: 'Tausender trennen mit',
		opt_blockAutoComplete: 'Blocke automatisches Vervollständigen in Firefox',
		
		opt_showDeficient: 'Zeige Fehlende Rohstoffe',
		opt_showResources: 'Zeige Erweiterte Rohstoff Informationen',
		opt_showNames: 'Zeige Schiff/Gebäude/Forschungsname über dem Bild',
		opt_nameColorOn: 'Farbe für: verfügbar',
		opt_nameColorOff: 'Farbe für: nicht verfügbar',
		opt_nameColorDisabled: 'Farbe für: nicht genügend Ressourcen',
		opt_showConstructionTitle: 'Zeige im Bau befindliche Gebäude in der Plantenliste',
		opt_shortHeader: 'Planetenbild immer minimieren',
		opt_misc_scrollTitle: 'Zeit bis zum nächsten Ereignis in Titelleiste anzeigen',

		opt_uni_SpeedFactor: 'Geschwindigkteit des Universums',
		opt_uni_DFPercent: 'Prozent-Anteil von Flotte in Trümmerfeld',
		opt_uni_DefenseToDF: 'Prozent-Anteil von Verteidigung in Trümmerfeld',
		
		opt_timeSetting: 'Zeitversatz (nur Stunden)',
		opt_showServerOgameClock: 'Behalte Serverzeit für Ogame-Uhr (oben rechts)',
		opt_showServerPhalanx: 'Behalte Serverzeit für Phalanxansicht',
		opt_showPageStartTime: 'Zeige die Zeit der letzten Aktualisierung',
		opt_timeAMPM: 'Benutze 12 Stunden Anzeige (AM/PM) statt 24 Stunden Anzeige',
		
		opt_timeDontChange: 'Zeit nicht ändern',
		opt_timeLocal: 'Immer die aktuelle Zeitzone setzen',
		opt_timeServer: 'Immer die Server-Zeitzone setzen',

		opt_killTips: 'Keine Tooltips',

		opt_evt_dimReverse: 'Zurückkehrende Flotten Schwach anzeigen',
		opt_phalanx_showDebris: 'Zeige theoretisches Trümmerfeld in der Phalanx',
		opt_evt_expandFleetsEvt: 'Zeige Flottenzusammenstellung (Eventliste)',
		opt_evt_expandFleetsPhal: 'Zeige Flottenzusammenstellung und Ladung (Phalanx)',

		opt_galaxyShowRank: 'Zeige Spieler/Allianz-Rang in der Galaxie',
		opt_galaxyRankColor: 'Spieler/Allianz-Rang Farben',
		opt_galaxyDebrisMin: 'Minimale Größe von Trümmerfeldern zeigen',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Farbe des Trümmerfelds',
		opt_galaxyHideMoon: 'Verberge Mondbild (Zeigt nur die Größe)',
		opt_galaxy_Players: 'Hebt folgende Spieler hervor',
		opt_galaxy_PlayerColors: 'Farbe der hervorgehobenen Spieler',
		opt_galaxy_Allys: 'Hebt folgende Allianzen hervor',
		opt_galaxy_AllyColors: 'Farbe der hervorgehobnenen Allianzen',
		opt_galaxy_keepTipsPlanets: 'Behalte Tooltips für Planeten und Monde',
		opt_galaxy_keepTipsDebris: 'Behalte Tooltips für Trümmerfelder',

		opt_msg_PlunderThreshold: 'Mindestgr&ouml;&szlig;e f&uuml;r theoretische Beute (in K)',
		opt_msg_DebrisThreshold: 'Mindestgr&ouml;&szlig;e f&uuml;r theoretisches Tr&uuml;mmerfeld (in K)',
		opt_msg_foldSmallPlunder: 'Spionageberichte unter diesem Limit Unterschlagen',
		opt_msg_showPlunder: 'Zeige Beute in Spionageberichten',
		opt_msg_addButtons: 'Zus&auml;tzliche Nachrichtenfelder',
		opt_msg_fixColors: 'Richtige Farben in Kampfberichten',

		opt_fleet_showCapacity: 'Zeige Schiffe, Kapazität, Geschwindigkeit',
		opt_fleet1_showResCalc: 'Zeige Resourcen-Rechner',
		opt_uni_maxPlayerScore: 'Der stärkste Spieler hat Punkte',
		opt_autocopyCoords: 'Koordinaten automatisch kopieren',
		opt_autocopyGlobal: 'Merke Koordinaten von der letzen Seite (Nicht nur aktuelles OGame-Tab)',
		opt_fleet2_setTargetDF: 'Setze Ziel auf Tr&uuml;mmerfeld, wenn Recycler dabei sind',
		opt_fleet2_fixLayout: 'Verändere Anzeige (Flottenversand)',
		opt_fleet2_ShortLinks: 'Vorgegebene Shortlinks',
		opt_fleet2_MoonColor: 'Farbe für Mond in der Shortlink-Liste',
		opt_fleet2_MoonsToEnd: 'Verschiebe Monde an das Ende der Shortlink-Liste',
		opt_fleet2_expandLists: 'Auswahlboxen aufklappen (Geschwindigkeit, Shortcuts, AKSs)',
		opt_fleet2_checkProbeCapacity: 'Prüfe Sondenkapazität vor absenden(Seite 2)',
		
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
		opt_msg_addSimButton: 'Füge Buttons hinzu für übertragung an WebSim',
		
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
		lbl_sectionUniverse: 'Universe',
		lbl_sectionTime: 'Zeiteinstellungen',
		lbl_sectionEventList: 'Ereignis Liste',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Nachrichten',
		lbl_sectionFleetDispatch: 'Flotte Versenden',
		lbl_sectionFleetMovement: 'Flottenbewegung',

		lbl_optionsNote1: 'Diese Option ist nur f&uuml;r dieses Universum gespeichert',
		
		lbl_resetCoords: 'Zurücksetzen - ',

		lbl_TotalCapacity: 'Ladekapazit&auml;t',
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

		lbl_btnMarkReadAll: 'Alle Angezeigten Nachrichten als gelesen markieren',
		lbl_btnDeleteSmallPlunder: 'Spionageberichte mit < $plunder Beute und < $debris TF entfernen',

		lbl_Moon: 'Mond',

		lbl_onTop: 'Oben',
		lbl_onBottom: 'Unten',
		lbl_onLeft: 'Links',

		lbl_installNewVersion: 'Klicken zum installieren der neuen Version',
		lbl_Save: 'Speichern',
		lbl_Clear: 'Löschen',
		lbl_Quantity: 'Menge',
		lbl_Duration: 'Dauer',
		lbl_Consumption: 'Verbrauch',
		
		lbl_tmTime: 'Zeit',
		lbl_tmCountdown: 'Countdown'
	};

	AntiGame_lang.LabelsDK =
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
		
		lbl_defRLauncher: 'Rocket Launcher',
		lbl_defLLaser: 'Light Laser',
		lbl_defHLaser: 'Heavy Laser',
		lbl_defGauss: 'Gauss Cannon',
		lbl_defIon: 'Ion Cannon',
		lbl_defPlasma: 'Plasma Turret',
		lbl_defSShield: 'Small Shield Dome',
		lbl_defLShield: 'Large Shield Dome',
		
		lbl_RequiredEnergy: 'Energi behøvet',
		
		rx_sendMail: /Send a message to (.+)\./
	};
	
	AntiGame_lang.InterfaceDK =
	{
		opt_languageName: 'Dansk',  

		opt_title: 'AntiGame Indstillinger',  
		opt_btnOk: 'OK',  
		opt_btnCancel: 'Annuler',  
		opt_btnDefault: 'Standart',

		opt_language: 'Sprog',  
		opt_update_check: 'Auto-check for updates',
		opt_thousandSeparator: 'Thousand separator',
		opt_blockAutoComplete: 'Bloker auto complete i Firefox',  

		opt_showResources: 'Vis udvidede ressource information',
		opt_showDeficient: 'Vis manglende ressourcer',
		opt_showNames: 'Show ship/building/research names over images',
		opt_nameColorOn: 'Name color: available',
		opt_nameColorOff: 'Name color: unavailable',
		opt_nameColorDisabled: 'Name color: not enough resources',
		opt_showConstructionTitle: 'Show construction titles in the planet list',
		opt_shortHeader: 'Always minimize planet image',
		opt_misc_scrollTitle: 'Scroll time to the next event in the window title',
		
		opt_uni_SpeedFactor: 'Speed factor of this universe',
		opt_uni_DFPercent: 'Percentage of fleet structure to debris',
		opt_uni_DefenseToDF: 'Percentage of defense to debris',

		opt_timeSetting: 'Change time values (hours only)',
		opt_showServerOgameClock: 'Keep server time for top-right Ogame clock',
		opt_showServerPhalanx: 'Keep server time for Phalanx view',
		opt_showPageStartTime: 'Display the time the page was last refreshed',
		opt_timeAMPM: 'Use 12-hours format (AM/PM) instead of 24-hours',

		opt_timeDontChange: 'Don\'t change time',
		opt_timeLocal: 'Always set to local timezone',
		opt_timeServer: 'Always set to server timezone',

		opt_killTips: 'Kill tooltips',

		opt_evt_dimReverse: 'Dim returning fleets',
		opt_phalanx_showDebris: 'Show theoretical debris in Phalanx view',
		opt_evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',
		opt_evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',

		opt_galaxyShowRank: 'Vis spiller/alliance ranks i Galakse oversigt',  
		opt_galaxyRankColor: 'Spiller/alliance ranks farver',  
		opt_galaxyDebrisMin: 'Minimum størrelse af ruin mark til highlight (sæt til 0 for at slå fra)',  
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Farve til highlighted ruin mark',  
		opt_galaxyHideMoon: 'Hide Moon picture (display moon size instead)',
		opt_galaxy_Players: 'Highlight the following players',
		opt_galaxy_PlayerColors: 'Colors for player highlighting',
		opt_galaxy_Allys: 'Highlight the following alliances',
		opt_galaxy_AllyColors: 'Colors for alliance highlighting',
		opt_galaxy_keepTipsPlanets: 'Keep tooltips for planets and moons',
		opt_galaxy_keepTipsDebris: 'Keep tooltips for debris fields',
		
		opt_msg_PlunderThreshold: 'Lav grænse for teoretisk udplyndre (x1000)',
		opt_msg_DebrisThreshold: 'Lav grænse for teoretisk ruinmark (x1000)',
		opt_msg_foldSmallPlunder: 'hvis ikke rapporter med plyndring og ruinmarker der er mindre end den grænse',
		opt_msg_showPlunder: 'Vis mængde af resurser der kan hentes i spy raport',  
		opt_msg_addButtons: 'Ekstra knapper i beskeder',  
		opt_msg_fixColors: 'Fix farver i kamp rapporter',  

		opt_fleet_showCapacity: 'Show ships capacity and speed',
		opt_fleet1_showResCalc: 'Show resource calculator',
		opt_uni_maxPlayerScore: 'The strongest player has points',
		opt_autocopyCoords: 'Auto-copy coordinates',
		opt_autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',
		opt_fleet2_setTargetDF: 'Set target to DF if the fleet includes recyclers',
		opt_fleet2_fixLayout: 'Fix flight information layout (page 2)',
		opt_fleet2_ShortLinks: 'Target shortlinks (page 2)',
		opt_fleet2_MoonColor: 'Color for moons in the shortlink list',
		opt_fleet2_MoonsToEnd: 'Move moons to the end of the shortlinks list',
		opt_fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',
		opt_fleet2_checkProbeCapacity: 'Check probes capacity before departure(page 2)',

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
		opt_msg_addSimButton: 'Add buttons for submitting spy reports to simulator',

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
		
		lbl_sectionGeneral: 'Generalt',
		lbl_sectionUniverse: 'Universe',
		lbl_sectionTime: 'Time settings',
		lbl_sectionEventList: 'Event list & Phalanx',
		lbl_sectionGalaxy: 'Galakse',
		lbl_sectionMessages: 'Beskeder',
		lbl_sectionFleetDispatch: 'Fleet dispatch',
		lbl_sectionFleetMovement: 'Flåde bevægelse',
		
		lbl_optionsNote1: 'The option is stored for this universe only',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Total capacity',
		lbl_MinSpeed: 'Minimal fart',
		lbl_ExPoints: 'Expedition points',
		lbl_mvmt_Return: 'R',  

		lbl_resources: 'Ressourcer',  
		lbl_debris: 'Debris',  
		lbl_total: 'Total',  
		lbl_loot: 'Loot',  
		lbl_metal: 'Metal',  
		lbl_crystal: 'Krystal',  

		lbl_shipSCargoAlt: 'SC',
		lbl_shipLCargoAlt: 'LC',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Manglende Ressourcer',  
		lbl_Production: 'Produktion',
		lbl_ArrivalACS: 'Ankomst (AKS)',  

		lbl_btnMarkReadAll: 'Mærker alle viste beskeder som læste',
		lbl_btnDeleteSmallPlunder: 'Slet Spion reporter og kamp reporter < $plyndring og ruinmark < $ruinmark',
	
		lbl_Moon: 'Moon',
		
		lbl_onTop: 'On top',
		lbl_onBottom: 'On bottom',
		lbl_onLeft: 'On left',
		
		lbl_installNewVersion: 'Click to install new version',
		lbl_Save: 'Save',
		lbl_Clear: 'Clear',
		lbl_Quantity: 'Quantity',
		lbl_Duration: 'Duration',
		lbl_Consumption: 'Consumption',
		
		lbl_tmTime: 'Time',
		lbl_tmCountdown: 'Countdown'
	};

	AntiGame_lang.LabelsES =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedición',
		lbl_missFederation: 'Ataque en confederación',
		lbl_missHarvest: 'Recolectar',
		lbl_missHold: 'Mantener en posición',
		lbl_missTransport: 'Transporte',

		lbl_shipSCargo: 'Nave de Carga Pequeña',
		lbl_shipLCargo: 'Nave de Carga Grande',
		lbl_shipLFighter: 'Cazador Ligero',
		lbl_shipHFighter: 'Cazador Pesado',
		lbl_shipCruiser: 'Crucero',
		lbl_shipBattleship: 'Nave de batalla',
		lbl_shipColonizator: 'Colonizador',
		lbl_shipRecycler: 'Reciclador',
		lbl_shipSpy: 'Sonda Espionaje',
		lbl_shipBomber: 'Bombardero',
		lbl_shipDestroyer: 'Acorazado',
		lbl_shipRIP: 'Estrella de la Muerte',
		lbl_shipBCruiser: 'Acorazado',
		lbl_shipSatellite: 'Satélite Solar',

		lbl_defRLauncher: 'Lanzamisiles',
		lbl_defLLaser: 'Láser Pequeño',
		lbl_defHLaser: 'Láser Grande',
		lbl_defGauss: 'Cañón Gauss',
		lbl_defIon: 'Cañón Iónico',
		lbl_defPlasma: 'Cañón de Plasma',
		lbl_defSShield: 'Cúpula de Protección Pequeña',
		lbl_defLShield: 'Cúpula de Protección Grande',
		
		lbl_RequiredEnergy: 'Energía necesaria',

		rx_sendMail: /Enviar mensaje a (.+)\./
	};

	AntiGame_lang.InterfaceES =
	{
		opt_languageName: 'Español',

		opt_title: 'Opciones AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Defecto',

		opt_language: 'Lenguaje',
		opt_update_check: 'Auto-check actualizaciones',
		opt_thousandSeparator: 'Separador de Miles',
		opt_blockAutoComplete: 'Bloquear Autocompletar en Firefox',		

		opt_showDeficient: 'Mostrar los recursos que faltan',
		opt_showResources: 'Mostrar ampliado los recursos de información',
		opt_showNames: 'Mostrar los nombres de naves/edificios/investigaciones sobre las imágenes',
		opt_nameColorOn: 'Colorear Nombre: disponible',
		opt_nameColorOff: 'Colorear Nombre: no disponible',
		opt_nameColorDisabled: 'Colorear Nombre: sin recursos suficientes',
		opt_showConstructionTitle: 'Mostrar las construcciones en curso en la lista de planetas',
		opt_shortHeader: 'Minimizar siempre la imagen del Planeta',
		opt_misc_scrollTitle: 'Tiempo restante para el próximo evento en el título de la ventana del navegador',		
		
		opt_uni_SpeedFactor: 'Velocidad de este Universo',
		opt_uni_DFPercent: 'Porcentaje de flota a escombros',
		opt_uni_DefenseToDF: 'Porcentaje de defensa a escombros',
		
		opt_timeSetting: 'Cambiar valores de hora (sólo horas)',
		opt_showServerOgameClock: 'Mantener la hora del servidor en el reloj superior derecho de OGame',
		opt_showServerPhalanx: 'Mantener la hora del servidor en el informe de Phalanx',
		opt_showPageStartTime: 'Mostrar la hora a la que la página ha sido actualizada',
		opt_timeAMPM: 'Usar formato 12-hors (AM/PM) en lugar del fomato 24-horas',
		
		opt_timeDontChange: 'No cambiar la hora',
		opt_timeLocal: 'Mantener siempre la hora local',
		opt_timeServer: 'Mantener siempre hora del servidor',

		opt_killTips: 'Eliminar tooltips',	
		
		opt_evt_dimReverse: 'Resaltar flotas en retorno',
		opt_phalanx_showDebris: 'Mostrar escombros teóricos en el informe de Phalanx',
		opt_evt_expandFleetsEvt: 'Mostrar la composición y capacidad de carga de la flota (Lista de Eventos)',
		opt_evt_expandFleetsPhal: 'Mostrar la composición y capacidad de carga de la flota (Phalanx)',
		
		opt_galaxyShowRank: 'Mostrar ranking jugador/alianza en la vista de la Galaxia',
		opt_galaxyRankColor: 'Color del ranking jugador/alianza',
		opt_galaxyDebrisMin: 'Tamaño mínimo de los escombros para recogerlos (0 para desactivar)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Color de los escombros',
		opt_galaxyHideMoon: 'Eliminar imagen de las Lunas (mostra únicamente el tamaño)',
		opt_galaxy_Players: 'Resaltar a los siguientes Jugadores',
		opt_galaxy_PlayerColors: 'Colores para los Jugadores resaltados',
		opt_galaxy_Allys: 'Resaltar a las siguientes Alianzas',
		opt_galaxy_AllyColors: 'Colores para las Alianzas resaltadas',
		opt_galaxy_keepTipsPlanets: 'Mantener tooltips para planetas y lunas',
		opt_galaxy_keepTipsDebris: 'Mantener tooltips para escombros',
		
		opt_msg_PlunderThreshold: 'El límite mínimo para el saqueo teórico (x1000)',
		opt_msg_DebrisThreshold: 'El límite mínimo de los escombros teórico (x1000)',
		opt_msg_foldSmallPlunder: 'Ocultar los informes de batalla y de reciclaje por debajo del límite',
		opt_msg_showPlunder: 'Mostrar el posible saqueo en los informes de espionaje',
		opt_msg_addButtons: 'Otros botones de mensajes',
		opt_msg_fixColors: 'Fijar los colores de los informes de batalla',

		opt_fleet_showCapacity: 'Mostrar la capacidad de carga y velocidad de las naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_uni_maxPlayerScore: 'El Top 1 tiene más puntos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_autocopyGlobal: 'Memorizar coordenadas de cualquier página',
		opt_fleet2_setTargetDF: 'Configurar escombros como objetivo si la flota incluye recicladores',
		opt_fleet2_fixLayout: 'Arreglar el diseño de la página de información del vuelo (página 2)',
		opt_fleet2_ShortLinks: 'Accesos directos a objetivos (page 2)',
		opt_fleet2_MoonColor: 'Colorear lunas en la lista de accesos directos',
		opt_fleet2_MoonsToEnd: 'Mover lunas al final de la lista de accesos directos',
		opt_fleet2_expandLists: 'Expandir desplegables (Velocidad, Atajos, SAC\'s)',
		opt_fleet2_checkProbeCapacity: 'Comprobar capacidad de las sondas antes del envío (página 2)',

		opt_missionPriority: 'Prioridad de la misión',

		opt_mvmt_expandFleets: 'Mostrar la flota de buques y la carga',
		opt_mvmt_showReversal: 'Mostrar la hora de vuelta de las flotas',

		opt_missAttack: 'Color para la misión: Ataque',
		opt_missColony: 'Color para la misión: Colonizar',
		opt_missDeploy: 'Color para la misión: Despliegar',
		opt_missDestroy: 'Color para la misión: Destruir',
		opt_missEspionage: 'Color para la misión: Espionaje',
		opt_missExpedition: 'Color para la misión: Expedición',
		opt_missFederation: 'Color para la misión: Ataque en confederación',
		opt_missHarvest: 'Color para la misión: Recolectar',
		opt_missHold: 'Color para la misión: Mantener en posición',
		opt_missTransport: 'Color para la misión: Transporte',
		opt_msg_addSimButton: 'Añadir botones para enviar los informes de espionaje al simulador',

		lbl_missAttack: 'Ataque',
		lbl_missColony: 'Colonización',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedición',
		lbl_missFederation: 'Ataque en confederación',
		lbl_missHarvest: 'Recolectar',
		lbl_missHold: 'Mantener en posición',
		lbl_missTransport: 'Transporte',

		lbl_sectionGeneral: 'General',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Configuración de Hora',
		lbl_sectionEventList: 'Lista de Eventos & Phalanx',
		lbl_sectionGalaxy: 'Galaxia',
		lbl_sectionMessages: 'Mensajes',
		lbl_sectionFleetDispatch: 'Envío de Flota',
		lbl_sectionFleetMovement: 'Movimiento de Flotas',

		lbl_optionsNote1: 'La opción se guardará sólo en este Universo',
		
		lbl_resetCoords: 'Resetear - ',

		lbl_TotalCapacity: 'Capacidad total',
		lbl_MinSpeed: 'Velocidad mínima',
		lbl_ExPoints: 'Puntos de Espedición',
		lbl_mvmt_Return: 'R',

		lbl_resources: 'Recursos',
		lbl_debris: 'Escombros',
		lbl_total: 'Total',
		lbl_loot: 'Botín',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',

		lbl_shipSCargoAlt: 'NPC',
		lbl_shipLCargoAlt: 'NPG',
		lbl_shipRecyclerAlt: 'Recis',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Recursos necesarios',
		lbl_Production: 'Producción',
		lbl_ArrivalACS: 'Llegada (SAC)',

		lbl_btnMarkReadAll: 'Marcar todos los mensajes como leídos',
		lbl_btnDeleteSmallPlunder: 'Eliminar los informes de espionaje con el botón < $plunder y los escombros < $debris',

		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Arriba',
		lbl_onBottom: 'Abajo',
		lbl_onLeft: 'Izquierda',
		
		lbl_installNewVersion: 'Click para instalar la nueva versión',
		lbl_Save: 'Guardar',
		lbl_Clear: 'Borrar',
		lbl_Quantity: 'Cantidad',
		lbl_Duration: 'Duración',
		lbl_Consumption: 'Consumo',
		
		lbl_tmTime: 'Hora',
		lbl_tmCountdown: 'Cuenta atrás'		
	};

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
		lbl_missHold: 'Défence groupée',
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

		lbl_defRLauncher: 'Lanceur de missiles',
		lbl_defLLaser: 'Artillerie laser légère',
		lbl_defHLaser: 'Artillerie laser lourde',
		lbl_defGauss: 'Canon de Gauss',
		lbl_defIon: 'Artillerie à ions',
		lbl_defPlasma: 'Lanceur de plasma',
		lbl_defSShield: 'Petit bouclier',
		lbl_defLShield: 'Grand bouclier',
		
		lbl_RequiredEnergy: 'Énergie requise',
		
		rx_sendMail: /Envoyer un message à (.+)\./
	};
	
	AntiGame_lang.InterfaceFR =
	{
		opt_languageName: 'Français',

		opt_title: 'Options AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Annuler',
		opt_btnDefault: 'Par défaut',

		opt_language: 'Langage',
		opt_update_check: 'Mise à jour automatique',
		opt_thousandSeparator: 'Séparateur pour les milliers',
		opt_blockAutoComplete: 'Bloquer l\'auto-complétion dans firefox',
		
		opt_showDeficient: 'Afficher les ressources manquantes',
		opt_showResources: 'Afficher les informations de ressources avancées',
		opt_showNames: 'Afficher les noms des vaisseaux/constructions/recherches sur les images',
		opt_nameColorOn: 'Couleur du nom: disponible',
		opt_nameColorOff: 'Couleur du nom: indisponible',
		opt_nameColorDisabled: 'Couleur du nom: pas assez de ressources',
		opt_showConstructionTitle: 'Afficher les titres des constructions dans la liste des planètes',
		opt_shortHeader: 'Toujours réduire les images planètes',
		opt_misc_scrollTitle: 'Temps restant avant le prochain évènement dans le titre de la fenêtre',
		
		opt_uni_SpeedFactor: 'Facteur de vitesse pour cet univers',
		opt_uni_DFPercent: 'Percentage of fleet structure to debris',
		opt_uni_DefenseToDF: 'Pourcentage de la défence dans les débris',
		
		opt_timeSetting: 'Changer les valeurs de temps (les heures seulement)',
		opt_showServerOgameClock: 'Garder l\'heure du serveur pour l\'horloge en haut à droite',
		opt_showServerPhalanx: 'Garder l\'heure du serveur pour la vue Phalanx',
		opt_showPageStartTime: 'Afficher l`heure du dernier raffraichisement de la page',
		opt_timeAMPM: 'Utilisez le format 12h (AM/PM) au lieu de 24h',
		
		opt_timeDontChange: 'Ne pas changer l\'heure',
		opt_timeLocal: 'Toujours régler à l\'heure locale',
		opt_timeServer: 'Toujours régler à l\'heure serveur',

		opt_killTips: 'Désactiver les info-bulles',

		opt_evt_dimReverse: 'Assombrir les flottes de retour',
		opt_phalanx_showDebris: 'Afficher les débris théoriques sur la phalange',
		opt_evt_expandFleetsEvt: 'Afficher la composition et la cargaison de la flotte dans la liste d\'événement (EventList)',
		opt_evt_expandFleetsPhal: 'Afficher la composition et la cargaison de la flotte sur la phalange (Phalanx)',
		
		opt_galaxyShowRank: 'Afficher le rang des joueurs/alliances dans la vue Galaxie',
		opt_galaxyRankColor: 'Couleur des rangs Joueur/alliance',
		opt_galaxyDebrisMin: 'Taille minimale pour surligner les débris (0 pour désactiver)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
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
		opt_fleet1_showResCalc: 'Afficher le calculateur de ressources',
		opt_uni_maxPlayerScore: 'Le joueur le plus fort à points',
		opt_autocopyCoords: 'Copier automatiquement les coordonnées',
		opt_autocopyGlobal: 'Mémoriser les coords sur toutes les pages (pas seulement la page courante d\ogame)',
		opt_fleet2_setTargetDF: 'Sélectionner automatiquement le champ de débris si la flotte inclus un recycleur',
		opt_fleet2_fixLayout: 'Corriger les informations d\'agencement',
		opt_fleet2_ShortLinks: 'Raccourcis de cibles',
		opt_fleet2_MoonColor: 'Couleur de la lune dans la liste de raccourcis',
		opt_fleet2_MoonsToEnd: 'Deplacer la lune à la fin de la liste de raccourcis',
		opt_fleet2_expandLists: 'Epandre la liste de selectionner pour la vitesse et attaques groupées',
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
		lbl_sectionUniverse: 'Univers',
		lbl_sectionTime: 'Paramètres de l\'heure',
		lbl_sectionEventList: 'Mouvements de flotte',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Messages',
		lbl_sectionFleetDispatch: 'Envoi de flottes',
		lbl_sectionFleetMovement: ' Mouvements de flotte',
		
		lbl_optionsNote1: 'L\'option est sauvegardée uniquement pour cet univers',

		lbl_resetCoords: 'Réinitialiser  - ',

		lbl_TotalCapacity: 'Capacité totale',
		lbl_MinSpeed: 'Vitesse minimale',
		lbl_ExPoints: 'Expedition points',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Ressources',
		lbl_debris: 'Débris',
		lbl_total: 'Total',
		lbl_loot: 'Butin',
		lbl_metal: 'Métal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'PT',
		lbl_shipLCargoAlt: 'GT',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat.',

		lbl_deficientRes: 'Ressources manquantes',
		lbl_Production: 'Production',
		lbl_ArrivalACS: 'Arrivée (AG)',
		
		lbl_btnMarkReadAll: 'Marquer tous les messages sélectionnés comme lus',
		lbl_btnDeleteSmallPlunder: 'Supprimer les rapports d\'espionnage avec pillage < $plunder et débris < $debris',

		lbl_Moon: 'Lune',
		
		lbl_onTop: 'Au dessus',
		lbl_onBottom: 'En dessous',
		lbl_onLeft: 'A gauche',
		
		lbl_installNewVersion: 'Cliquer pour installer la nouvelle version',
		lbl_Save: 'Sauver',
		lbl_Clear: 'Effacer',
		lbl_Quantity: 'Quantité',
		lbl_Duration: 'Durée',
		lbl_Consumption: 'Consommation',
		
		lbl_tmTime: 'Heure',
		lbl_tmCountdown: 'Compte à rebours'
	};

	AntiGame_lang.LabelsGR =
	{
		lbl_missAttack: 'Επίθεση',
		lbl_missColony: 'Αποίκιση',
		lbl_missDeploy: 'Παράταξη',
		lbl_missDestroy: 'Καταστροφή Φεγγαριού',
		lbl_missEspionage: 'Κατασκοπεία',
		lbl_missExpedition: 'Αποστολή',
		lbl_missFederation: 'Επίθεση ACS',
		lbl_missHarvest: 'Ανακυκλώστε το πεδίο συντριμμιών',
		lbl_missHold: 'Άμυνα ACS',
		lbl_missTransport: 'Μεταφορά',
		
		lbl_shipSCargo: 'Μικρό Μεταγωγικό',
		lbl_shipLCargo: 'Μεγάλο Μεταγωγικό',
		lbl_shipLFighter: 'Ελαφρύ Μαχητικό',
		lbl_shipHFighter: 'Βαρύ Μαχητικό',
		lbl_shipCruiser: 'Καταδιωκτικό',
		lbl_shipBattleship: 'Καταδρομικό',
		lbl_shipColonizator: 'Σκάφος Αποικιοποίησης',
		lbl_shipRecycler: 'Ανακυκλωτής',
		lbl_shipSpy: 'Κατασκοπευτικό Στέλεχος',
		lbl_shipBomber: 'Βομβαρδιστικό',
		lbl_shipDestroyer: 'Destroyer',
		lbl_shipRIP: 'Deathstar',
		lbl_shipBCruiser: 'Θωρηκτό Αναχαίτισης',
		lbl_shipSatellite: 'Ηλιακοί Συλλέκτες',
		
		lbl_defRLauncher: 'Εκτοξευτής Πυραύλων',
		lbl_defLLaser: 'Ελαφρύ Λέιζερ',
		lbl_defHLaser: 'Βαρύ Λέιζερ',
		lbl_defGauss: 'Κανόνι Gauss',
		lbl_defIon: 'Κανόνι Ιόντων',
		lbl_defPlasma: 'Πυργίσκοι Πλάσματος',
		lbl_defSShield: 'Μικρός Αμυντικός Θόλος',
		lbl_defLShield: 'Μεγάλος Αμυντικός Θόλος',

		lbl_RequiredEnergy: 'Χρειάζεται ενέργεια:',
		
		rx_sendMail: /συγγραφή μηνύματος (.+)\./
	};
	
	AntiGame_lang.InterfaceGR =
	{
		opt_languageName: 'Ελληνικά',
	
		opt_title: 'AntiGame Επιλογές',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Άκυρο',
		opt_btnDefault: 'Default',

		opt_language: 'Γλώσσα',
		opt_update_check: 'Έλεγχος για ενημερώσεις',
		opt_thousandSeparator: 'Διαχωριστής πλήθους αριθμών',
		opt_blockAutoComplete: 'Σταμάτημα αυτόματης ολοκλήρωσης στον Firefox',
		
		opt_showDeficient: 'Εμφάνιση πόρων που λείπουν',
		opt_showResources: 'Εμφάνιση εκτεταμένων πληροφοριών πόρων',
		opt_showNames: 'Εμφάνιση ονομάτων από διαστημόπλοια/κτήρια/έρευνες πάνω από τις εικόνες',
		opt_nameColorOn: 'Χρώμα ονόματος: Διαθέσιμο',
		opt_nameColorOff: 'Χρώμα ονόματος: Μη διαθέσιμο',
		opt_nameColorDisabled: 'Χρώμα ονόματος: Δεν υπάρχουν αρκετοί πόροι',
		opt_showConstructionTitle: 'Εμφάνιση κατασκευών στην επισκόπηση',
		opt_shortHeader: 'Απόκρυψη εικόνας πλανήτη',
		opt_misc_scrollTitle: 'Scroll time to the next event in the window title',
		
		opt_uni_SpeedFactor: 'Ταχύτητα του σύμπαντος',
		opt_uni_DFPercent: 'Ποσοστό αξίας στόλου σε πεδίο συντριμμιών',
		opt_uni_DefenseToDF: 'Ποσοστό αξίας άμυνας σε πεδίο συντριμμιών',
		
		opt_timeSetting: 'Ρυθμίσεις ώρας',
		opt_showServerOgameClock: 'Χρήση ρυθμίσεων ώρας του server (πάνω δεξιά)',
		opt_showServerPhalanx: 'Χρήση ρυθμίσεων ώρας για την Φάλαγγα',
		opt_showPageStartTime: 'Εμφάνισε το χρόνο της τελευταίας ανανέωσης σελίδας',
		opt_timeAMPM: 'Χρήση 12ωρου αντί 24ωρου',
		
		opt_timeDontChange: 'Καμία άλλαγή - Αρχικές ρυθμίσεις',
		opt_timeLocal: 'Ρύθμιση σε τοπική ζώνη ώρας',
		opt_timeServer: 'Ρύθμιση με βάση την ώρα του server',

		opt_killTips: 'Να μην εμφανίζονται tooltips',

		opt_evt_dimReverse: 'Dim returning fleets',
		opt_phalanx_showDebris: 'Εμφάνιση θεωρητικών συντριμμιών στη Φάλαγγα',
		opt_evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',
		opt_evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',
		
		opt_galaxyShowRank: 'Εμφάνιση επιπέδων παίκτη/συμμαχίας στον γαλαξία',
		opt_galaxyRankColor: 'Χρώμα των επιπέδων παίκτη/συμμαχίας',
		opt_galaxyDebrisMin: 'Ελάχιστο μέγεθος από συντρίμμια για επισήμανση (0 για να απενεργοποιηθεί)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Χρώμα των επισημανόμενων συντριμμιών',
		opt_galaxyHideMoon: 'Κρύψε την φωτογραφία του φεγγαριού (δείξε το μέγεθος του φεγγαριού αντί της φωτογραφίας)',
		opt_galaxy_Players: 'Επισήμανε τους εξής παίκτες',
		opt_galaxy_PlayerColors: 'Χρώματα για την επισήμανση των παικτών',
		opt_galaxy_Allys: 'Επισήμανε τις εξής συμμαχίες',
		opt_galaxy_AllyColors: 'Χρώματα για την επισήμανση των συμμαχιών',
		opt_galaxy_keepTipsPlanets: 'Διατήρηση tooltips για τους πλανήτες και τα φεγγάρια',
		opt_galaxy_keepTipsDebris: 'Διατήρηση tooltips για τα πεδία των συντριμμιών',
		
		opt_msg_PlunderThreshold: 'Ελάχιστο όριο για λεηλάτηση (x1000)',
		opt_msg_DebrisThreshold: 'Ελάχιστο όριο για συντρίμμια (x1000)',
		opt_msg_foldSmallPlunder: 'Μην ενημερώσεις σχετικά με λεηλάτηση ή συντρίμμια χαμηλότερα από το όριο',
		opt_msg_showPlunder: 'Συμπεριέλαβε την λεηλασία στις αναφορές σχετικά με κατασκοπεία',
		opt_msg_addButtons: 'Πρόσθετα κουμπιά στα μηνύματα',
		opt_msg_fixColors: 'Αλλαγή χρωμάτων στις αναφορές μάχης',
		
		opt_fleet_showCapacity: 'Εμφάνιση χωρητικότητας και ταχύτητας διαστημοπλοίων',
		opt_fleet1_showResCalc: 'Εμφάνιση υπολογιστή πόρων',
		opt_uni_maxPlayerScore: 'Ο δυνατότερος παίκτης έχει βαθμούς',
		opt_autocopyCoords: 'Αυτόματη αντιγραφή συντεταγμένων',
		opt_autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',
		opt_fleet2_setTargetDF: 'Θέσε τον στόχο σε DF αν ο στόλος περιλαμβάνει Ανακυκλωτές',
		opt_fleet2_fixLayout: 'Δημιουργία έκθεσης πληροφοριών πτήσης (σελίδα 2)',
		opt_fleet2_ShortLinks: 'Μικροσύνδεσμοι στόχων (σελίδα 2)',
		opt_fleet2_MoonColor: 'Χρωματισμός φεγγαριών στη λίστα συντομεύσεων',
		opt_fleet2_MoonsToEnd: 'Μετακίνηση φεγγαριών στο τέλος της λίστας συντομεύσεων',
		opt_fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',
		opt_fleet2_checkProbeCapacity: 'Έλεγχος χωρητικότητας πριν την αναχώρηση',
		
		opt_missionPriority: 'Προτεραιότητα αποστολής',
		
		opt_mvmt_expandFleets: 'Εμφάνισε τα διαστημόπλοια του στόλου και τα φορτία',
		opt_mvmt_showReversal: 'Εμφάνισε τον χρόνο επιστροφής του στόλου',
		
		opt_missAttack: 'Χρώμα αποστολής: Επίθεση',
		opt_missColony: 'Χρώμα αποστολής: Αποίκιση',
		opt_missDeploy: 'Χρώμα αποστολής: Παράταξη',
		opt_missDestroy: 'Χρώμα αποστολής: Καταστροφή',
		opt_missEspionage: 'Χρώμα αποστολής: Κατασκοπεία',
		opt_missExpedition: 'Χρώμα αποστολής: Εκστρατεία',
		opt_missFederation: 'Χρώμα αποστολής: Επίθεση ACS',
		opt_missHarvest: 'Χρώμα αποστολής: Συγκομιδή',
		opt_missHold: 'Χρώμα αποστολής: Άμυνα ΑCS',
		opt_missTransport: 'Χρώμα αποστολής: Μεταφορά',
		opt_msg_addSimButton: 'Πρόσθεση κουμπιών για υποβολή των αναφορών κατασκοπείας στο WebSim',
		
		lbl_missAttack: 'Επίθεση',
		lbl_missColony: 'Αποίκιση',
		lbl_missDeploy: 'Παράταξη',
		lbl_missDestroy: 'Καταστροφή φεγγαριού',
		lbl_missEspionage: 'Κατασκοπεία',
		lbl_missExpedition: 'Εκστρατεία',
		lbl_missFederation: 'Επίθεση ACS',
		lbl_missHarvest: 'Συγκομιδή',
		lbl_missHold: 'Άμυνα ACS',
		lbl_missTransport: 'Μεταφορά',

		lbl_sectionGeneral: 'Γενικές Ρυθμίσεις',
		lbl_sectionUniverse: 'Σύμπαν',
		lbl_sectionTime: 'Ρυθμίσεις ώρας',
		lbl_sectionEventList: 'Λίστα γεγονότων',
		lbl_sectionGalaxy: 'Γαλαξίας',
		lbl_sectionMessages: 'Μηνύματα',
		lbl_sectionFleetDispatch: 'Αποστολή στόλου',
		lbl_sectionFleetMovement: 'Μετακίνηση στόλου',
		
		lbl_optionsNote1: 'Η επιλογή έχει αποθηκευτεί για το συγκεκριμένο σύμπαν',
		
		lbl_resetCoords: 'Επαναφορά - ',
		
		lbl_TotalCapacity: 'Συνολική χωρητικότητα',
		lbl_MinSpeed: 'Ελάχιστη ταχύτητα',
		lbl_ExPoints: 'Βαθμοί Αποστολής',
		lbl_mvmt_Return: 'Ε',
		
		lbl_resources: 'Πόροι',
		lbl_debris: 'Συντρίμμια',
		lbl_total: 'Συνολικά',
		lbl_loot: 'Λάφυρα',
		lbl_metal: 'Μέταλλο',
		lbl_crystal: 'Κρύσταλλο',
		
		lbl_shipSCargoAlt: 'Μικρό Μεταγωγικό',
		lbl_shipLCargoAlt: 'Μεγάλο Μεταγωγικό',
		lbl_shipRecyclerAlt: 'Ανακυκλωτής',
		lbl_shipSatelliteAlt: 'Η.Σ.',
		
		lbl_deficientRes: 'Έλλειψη πόρων',
		lbl_Production: 'Παραγωγή',
		lbl_ArrivalACS: 'Άφιξη ACS',
		
		lbl_btnMarkReadAll: 'Σημείωσε όλα τα μηνύματα ως διαβασμένα',
		lbl_btnDeleteSmallPlunder: 'Διαγραφή κατασκοπευτικών αναφορών με λάφυρα < $plunder και συντρίμμια < $debris',
		
		lbl_Moon: 'φεγγάρι',
		
		lbl_onTop: 'Στην κορυφή της σελίδας',
		lbl_onBottom: 'Στο τέλος της σελίδας',
		lbl_onLeft: 'Στα αριστερά',

		lbl_installNewVersion: 'Κάντε κλικ για εγκατάσταση νέας έκδοσης',
		lbl_Save: 'Αποθήκευση',
		lbl_Clear: 'Καθαρισμός',
		lbl_Quantity: 'Ποσότητα',
		lbl_Duration: 'Διάρκεια',
		lbl_Consumption: 'Κατανάλωση',
		
		lbl_tmTime: 'Χρόνος',
		lbl_tmCountdown: 'Αντίστροφη μέτρηση'
	};

	AntiGame_lang.LabelsHR =
	{
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizirati',
		lbl_missDeploy: 'Stacionirati',
		lbl_missDestroy: 'Uništenje mjeseca',
		lbl_missEspionage: 'Špijunaža',
		lbl_missExpedition: 'Expedicija',
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
		lbl_shipColonizator: 'Kolonijacni brod',
		lbl_shipRecycler: 'Recikler',
		lbl_shipSpy: 'Sonda za špijunažu',
		lbl_shipBomber: 'Bombarder',
		lbl_shipDestroyer: 'Razarac',
		lbl_shipRIP: 'Zvijezda smrti',
		lbl_shipBCruiser: 'Oklopna krstarica',
		lbl_shipSatellite: 'Solarni satelit',
		
		lbl_defRLauncher: 'Raketobacac',
		lbl_defLLaser: 'Mali laser',
		lbl_defHLaser: 'Veliki laser',
		lbl_defGauss: 'Gaussov top',
		lbl_defIon: 'Ionski top',
		lbl_defPlasma: 'Plazma top',
		lbl_defSShield: 'Mala štitna kupola',
		lbl_defLShield: 'Velika štitna kupola',
		
		lbl_RequiredEnergy: 'Potrebno energije',
		
		rx_sendMail: /Pošalji poruku (.+)\./
	};
	
	AntiGame_lang.InterfaceHR =
	{
		opt_languageName: 'Hrvatski',
	
		opt_title: 'AntiGame Opcije',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Poništi',
		opt_btnDefault: 'Zadano',

		opt_language: 'Jezik',
		opt_update_check: 'Automatska provjera za nadogradnju',
		opt_thousandSeparator: 'Zarez za tisucu',
		opt_blockAutoComplete: 'Blokiraj Auto-Complete u Firefoxu',
		
		opt_showDeficient: 'Prikaži nedostajuce resurse',
		opt_showResources: 'Prikaži dodatne informacije o resursima',
		opt_showNames: 'Prikaži imena preko slika za brodove/zgrade/istraživanja',
		opt_nameColorOn: 'Naziv boje: Moguce',
		opt_nameColorOff: 'Naziv boje: Nije moguce',
		opt_nameColorDisabled: 'Naziv boje: nedovoljno resursa',
		opt_showConstructionTitle: 'Prikaži nazive gradnji na listi planeta',
		opt_shortHeader: 'Uvijek smanji sliku planete',
		opt_misc_scrollTitle: 'Prikaži vrijeme sljedece flote u naslovu prozora/taba',

		opt_uni_SpeedFactor: 'Faktor brzine za ovaj uni',
		opt_uni_DFPercent: 'Postotak flote koji se pretvara u ruševinu',
		opt_uni_DefenseToDF: 'Postotak obrane koji se pretvara u ruševinu',
		
		opt_timeSetting: 'Promjeni postavke vremena (samo za sate)',
		opt_showServerOgameClock: 'Zadrži prikaz vremena servera u gornjem desnom uglu',
		opt_showServerPhalanx: 'Zadrži vrijeme servera za Falangu',
		opt_showPageStartTime: 'Prikaži vrijeme kada je stranica zadnji puta osvježena',
		opt_timeAMPM: 'Koristi 12-satni format (AM/PM) umjesto 24-satnog',
		
		opt_timeDontChange: 'Ne mijenjaj vrijeme',
		opt_timeLocal: 'Uvijek prikazuj lokalno vrijeme',
		opt_timeServer: 'Uvijek prikazuj vrijeme servera',

		opt_killTips: 'Ne prikazuj tooltipse',

		opt_evt_dimReverse: 'Zatamni flote na povratku',
		opt_phalanx_showDebris: 'Prikaži teoretsku velicinu ruševine u Falangi',
		opt_evt_expandFleetsEvt: 'Prikaži sastav flote i teret (u listi dogadanja)',
		opt_evt_expandFleetsPhal: 'Prikaži sastav flote i teret (Falanga)',

		opt_galaxyShowRank: 'Prikaži rang igraca/saveza u galaksiji',
		opt_galaxyRankColor: 'Boja za rang igraca/saveza',
		opt_galaxyDebrisMin: 'Minimalna velicina ruševine koja ce se istaknuti (0 za iskljuciti)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Boja istaknutih ruševina',
		opt_galaxyHideMoon: 'Sakrij sliku mjeseca (umjesto slike prikaži velicinu mjeseca)',
		opt_galaxy_Players: 'Oznaci sljedece igrace',
		opt_galaxy_PlayerColors: 'Boje za oznacavanje igraca',
		opt_galaxy_Allys: 'Oznaci slijedece saveze',
		opt_galaxy_AllyColors: 'Boje za oznacavanje saveza',
		opt_galaxy_keepTipsPlanets: 'Zadrži prikaz tooltipsa za planete i mjesece',
		opt_galaxy_keepTipsDebris: 'Zadrži prikaz tooltipsa za ruševine',
		
		opt_msg_PlunderThreshold: 'Donji limit za teoretski plijen (x1000)',
		opt_msg_DebrisThreshold: 'Donji limit za teoretsku ruševinu (x1000)',
		opt_msg_foldSmallPlunder: 'Skopiti izvješca s pljackom i ruševinama manjih od zadanog minimuma',
		opt_msg_showPlunder: 'Prikaži plijen u izvješcu špijunaže',
		opt_msg_addButtons: 'Dodatne tipke na porukama',
		opt_msg_fixColors: 'Podesi boje borbenih izvještaja',
		
		opt_fleet_showCapacity: 'Prikaži kapacitet i brzinu brodova',
		opt_fleet1_showResCalc: 'Prikaži kalkulator za resurse',
		opt_uni_maxPlayerScore: 'Najjaci igrac ima bodova',
		opt_autocopyCoords: 'Automatski kopiraj koordinate',
		opt_autocopyGlobal: 'Zapamti koordinate sa bilokoje stranice (sa svih OGame tabova)',
		opt_fleet2_setTargetDF: 'Namjesti cilj na ruševinu ako u floti ima reciklera',
		opt_fleet2_fixLayout: 'Popravi prikaz menija za slanje flote (stranica 2)',
		opt_fleet2_ShortLinks: 'Precac do mete (stranica 2)',
		opt_fleet2_MoonColor: 'Boja za mjesece u izborniku',
		opt_fleet2_MoonsToEnd: 'Premjesti mjesece na kraj liste',
		opt_fleet2_expandLists: 'Proširi padajuce izbornike (Brzina, Kratice za planete, AKS)',
		opt_fleet2_checkProbeCapacity: 'Provjeri kapacitet sonde prije slanja (stranica 2)',
		
		opt_missionPriority: 'Prioritet misije',
		
		opt_mvmt_expandFleets: 'Pokaži sastav flote i teret flote',
		opt_mvmt_showReversal: 'Pokaži povratno vrijeme flote',
		
		opt_missAttack: 'Boja misije: Napad',
		opt_missColony: 'Boja misije: Kolonizacija',
		opt_missDeploy: 'Boja misijer: Stacioniranje',
		opt_missDestroy: 'Boja misije: Uništenje mjeseca',
		opt_missEspionage: 'Boja misije: Špijunaža',
		opt_missExpedition: 'Boja misije: Expedicija',
		opt_missFederation: 'Boja misije: AKS',
		opt_missHarvest: 'Boja misije: Recikliranje',
		opt_missHold: 'Boja misije: Pauziranje',
		opt_missTransport: 'Boja misije: Transport',
		opt_msg_addSimButton: 'Dodaj gumbove za online simulaciju borbi',

		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Stacioniranje',
		lbl_missDestroy: 'Rušenje mjeseca',
		lbl_missEspionage: 'Špijunaža',
		lbl_missExpedition: 'Expedicija',
		lbl_missFederation: 'AKS napad',
		lbl_missHarvest: 'Recikliranje',
		lbl_missHold: 'Pauziranje',
		lbl_missTransport: 'Transport',

		lbl_sectionGeneral: 'Opcenito',
		lbl_sectionUniverse: 'Universe',
		lbl_sectionTime: 'Postavke vremena',
		lbl_sectionEventList: 'Dogadanja & Falanga',
		lbl_sectionGalaxy: 'Galaksija',
		lbl_sectionMessages: 'Poruke',
		lbl_sectionFleetDispatch: 'Otpremanje flota',
		lbl_sectionFleetMovement: 'Kretanje flota',
		
		lbl_optionsNote1: 'Opcija je spremljena samo za ovaj uni',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Ukupni kapacitet',
		lbl_MinSpeed: 'Minimalna brzina',
		lbl_ExPoints: 'Bodovi expedicije',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Resursi',
		lbl_debris: 'Ruševine',
		lbl_total: 'Ukupno',
		lbl_loot: 'Plijen',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'VT',
		lbl_shipRecyclerAlt: 'Rec',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Nedostajuci resursi',
		lbl_Production: 'Proizvodnja',
		lbl_ArrivalACS: 'Dolazak (AKS)',
		
		lbl_btnMarkReadAll: 'Oznaci sve prikazane poruke kao procitane',
		lbl_btnDeleteSmallPlunder: 'Izbriši sva izvješca gdje je plijen < $plunder i ruševina < $debris',
		
		lbl_Moon: 'Mjesec',
		
		lbl_onTop: 'Na vrhu',
		lbl_onBottom: 'Na dnu',
		lbl_onLeft: 'Na lijevo',
		
		lbl_installNewVersion: 'Klikni za instalaciju nove verzije',
		lbl_Save: 'Sacuvaj',
		lbl_Clear: 'Ocisti',
		lbl_Quantity: 'Kolicina',
		lbl_Duration: 'Trajanje',
		lbl_Consumption: 'Potrošnja',
		
		lbl_tmTime: 'Vrijeme',
		lbl_tmCountdown: 'Odbrojavanje'
	};
	
	AntiGame_lang.LabelsHU =
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
		
		lbl_defRLauncher: 'Rakéta Kilövő',
		lbl_defLLaser: 'Könnyű Lézer',
		lbl_defHLaser: 'Nehéz Lézer',
		lbl_defGauss: 'Gauss Ágyú',
		lbl_defIon: 'Ion Ágyú',
		lbl_defPlasma: 'Plazma Torony',
		lbl_defSShield: 'Kis Pajzs Kupola',
		lbl_defLShield: 'Nagy Pajzs Kupola',
		
		lbl_RequiredEnergy: 'Szükséges energia',
		
		rx_sendMail: /Üzenet küldése (.+)\./
		
	}
	
	AntiGame_lang.InterfaceHU =
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
		opt_misc_scrollTitle: 'A legközelebbi esemény jelzése a címsorban',

		opt_uni_SpeedFactor: 'Univerzum sebessége',
		opt_uni_DFPercent: 'Hajókból származó törmelék (százalékban)',
		opt_uni_DefenseToDF: 'Védelemből származó törmelék (százalékban)',
		
		opt_timeSetting: 'Change time values (hours only)',
		opt_showServerOgameClock: 'Keep server time for top-right Ogame clock',
		opt_showServerPhalanx: 'Keep server time for Phalanx view',
		opt_showPageStartTime: 'Display the time the page was last refreshed',
		opt_timeAMPM: 'Use 12-hours format (AM/PM) instead of 24-hours',
		
		opt_timeDontChange: 'Ne változtassa az időt',
		opt_timeLocal: 'Mindig helyi idő',
		opt_timeServer: 'Mindig szerver idő',

		opt_killTips: 'Kikapcsolja a tippeket',

		opt_evt_dimReverse: 'Dim returning fleets',	// Needs translation
		opt_phalanx_showDebris: 'Elméleti törmelék mutatása Phalanx nézetben',
		opt_evt_expandFleetsEvt: 'Flotta összetétele és szállítmány látható (eseménylista)',
		opt_evt_expandFleetsPhal: 'Flotta összetétele és szállítmány látható (Phalanx)',
		
		opt_galaxyShowRank: 'Szövetség/játékos megjelenítése a Galaxis nézetben',
		opt_galaxyRankColor: 'Játékos/Szövetség színe',
		opt_galaxyDebrisMin: 'Minimális mérete a DF-nek kiemelésnél (0-val kikapcsol)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
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
		opt_uni_maxPlayerScore: 'Erősebb játékos több pont felett',
		opt_autocopyCoords: 'Koordináták autómatikus másolása',
		opt_autocopyGlobal: 'Megjegyzi a koordinátákat (nemcsak ezen a lapon)',
		opt_fleet2_setTargetDF: 'Beálítja a célpontot DF-re ha van a flottában szemetes',
		opt_fleet2_fixLayout: 'Repülési adatok fixálása (2. oldal)',
		opt_fleet2_ShortLinks: 'Célpont gyors line (2. oldal)',
		opt_fleet2_MoonColor: 'Holdak színe a listában',
		opt_fleet2_MoonsToEnd: 'A holdat a gyorslista végére rakja',
		opt_fleet2_expandLists: 'A lenyíló menük listázása külön (Sebesség, Gyorslinkek, ACS-ek)',
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
		lbl_sectionUniverse: 'Univerzum',
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
		
		lbl_shipSCargoAlt: 'KSz',
		lbl_shipLCargoAlt: 'NSz',
		lbl_shipRecyclerAlt: 'Szem.',
		lbl_shipSatelliteAlt: 'Napműhold',
		
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
	
	AntiGame_lang.LabelsIT =
	{
		lbl_missAttack: 'Attacco',
		lbl_missColony: 'Colonizzazione',
		lbl_missDeploy: 'Schieramento',
		lbl_missDestroy: 'Distruzione Luna',
		lbl_missEspionage: 'Spionaggio',
		lbl_missExpedition: 'Spedizione',
		lbl_missFederation: 'Attacco Federale',
		lbl_missHarvest: 'Riciclaggio',
		lbl_missHold: 'Difesa Federale',
		lbl_missTransport: 'Trasporto',
		
		lbl_shipSCargo: 'Cargo Leggero',
		lbl_shipLCargo: 'Cargo Pesante',
		lbl_shipLFighter: 'Caccia Leggero',
		lbl_shipHFighter: 'Caccia Pesante',
		lbl_shipCruiser: 'Incrociatore',
		lbl_shipBattleship: 'Nave da Battaglia',
		lbl_shipColonizator: 'Colonizzatrice',
		lbl_shipRecycler: 'Riciclatrice',
		lbl_shipSpy: 'Sonda Spia',
		lbl_shipBomber: 'Bombardiere',
		lbl_shipDestroyer: 'Corazzata',
		lbl_shipRIP: 'Morte Nera',
		lbl_shipBCruiser: 'Incrociatore da Battaglia',
		lbl_shipSatellite: 'Satellite Solare',
        		
		lbl_defRLauncher: 'Lanciamissili',
		lbl_defLLaser: 'Laser Leggero',
		lbl_defHLaser: 'Laser Pesante',
		lbl_defGauss: 'Cannone di Gauss',
		lbl_defIon: 'Cannone Ionico',
		lbl_defPlasma: 'Cannone al Plasma',
		lbl_defSShield: 'Cupola Scudo',
		lbl_defLShield: 'Cupola Scudo Potenziata',
		
		lbl_RequiredEnergy: 'Energia necessaria',
		
		rx_sendMail: /Send a message to (.+)\./
	};
	
	AntiGame_lang.InterfaceIT =
	{
		opt_languageName: 'Italiano',
	
		opt_title: 'Opzioni di AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Annulla',
		opt_btnDefault: 'Default',

		opt_language: 'Lingua',
		opt_update_check: 'Controllo automatico aggiornamenti',
		opt_thousandSeparator: 'Separatore delle migliaia',
		opt_blockAutoComplete: 'Blocca l\'autocompletamento in Firefox',
		
		opt_showDeficient: 'Mostra le risorse mancanti',
		opt_showResources: 'Mostra informazioni estese sulle risorse',
		opt_showNames: 'Mostra i nomi di navi/costruzioni/ricerche sulle immagini',
		opt_nameColorOn: 'Colore per: disponibile',
		opt_nameColorOff: 'Colore per: non disponibile',
		opt_nameColorDisabled: 'Colore per: risorse insufficienti',
		opt_showConstructionTitle: 'Mostra il nome della costruzione nella lista pianeti',
		opt_shortHeader: 'Riduci sempre l\'immagine dei pianeti',
		opt_misc_scrollTitle: 'Mostra l\'orario del prossimo evento nel titolo della finestra',
		
		opt_uni_SpeedFactor: 'Fattore di velocità di questo universo',
		opt_uni_DFPercent: 'Percentuale di flotta nel Campo Detriti',
		opt_uni_DefenseToDF: 'Percentuale di difese nel Campo Detriti',
		
		opt_timeSetting: 'Cambia le impostazioni dell\'orario (solo per le ore)',
		opt_showServerOgameClock: 'Mantieni l\'ora del server nell\'orologio in alto a destra di Ogame',
		opt_showServerPhalanx: 'Mantieni l\'ora del server nella visuale Falange',
		opt_showPageStartTime: 'Mostra l\'orario in cui la pagina è stata aggiornata l\'ultima volta',
		opt_timeAMPM: 'Usa il formato 12 ore (AM/PM) al posto di quello 24 ore',
		
		opt_timeDontChange: 'Non cambiare l\'orario',
		opt_timeLocal: 'Imposta sempre il fuso orario locale',
		opt_timeServer: 'Imposta sempre il fuso orario del server',

		opt_killTips: 'Nascondi i suggerimenti',

		opt_evt_dimReverse: 'Dim returning fleets',
		opt_phalanx_showDebris: 'Mostra i detriti teorici nella vista Falange',
		opt_evt_expandFleetsEvt: 'Mostra la composizione di flotta e le risorse trasportate (Lista Eventi)',
		opt_evt_expandFleetsPhal: 'Mostra la composizione di flotta e le risorse trasportate (Falange)',

		opt_galaxyShowRank: 'Mostra la posizione in classifica del giocatore/alleanza nella visuale galassia',
		opt_galaxyRankColor: 'Colore della posizione in classifica del giocatore/alleanza',
		opt_galaxyDebrisMin: 'Dimensione minima del campo detriti da evidenziare (0 per disabilitarlo)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Colore del campo detriti evidenziato',
		opt_galaxyHideMoon: 'Nascondi l\'immagine della Luna (mostra la dimensione al suo posto)',
		opt_galaxy_Players: 'Evidenzia i seguenti giocatori',
		opt_galaxy_PlayerColors: 'Colori da usare per evidenziare i giocatori',
		opt_galaxy_Allys: 'Evidenzia le seguenti alleanze',
		opt_galaxy_AllyColors: 'Colori da usare per evidenziare le alleanze',
		opt_galaxy_keepTipsPlanets: 'Mantieni i suggerimenti per pianeti e lune',
		opt_galaxy_keepTipsDebris: 'Mantieni i suggerimenti per i campi detriti',
		
		opt_msg_PlunderThreshold: 'Valore minimo per il saccheggio teorico (x1000)',
		opt_msg_DebrisThreshold: 'Valore minimo per i detriti teorici (x1000)',
		opt_msg_foldSmallPlunder: 'Elimina i rapporti con saccheggio e campo detriti inferiori al minimo',
		opt_msg_showPlunder: 'Mostra il saccheggio nei rapporti di spionaggio',
		opt_msg_addButtons: 'Pulsanti aggiuntivi nei messaggi',
		opt_msg_fixColors: 'Correggi i colori dei rapporti di combattimento',
		
		opt_fleet_showCapacity: 'Mostra la stiva e la velocità delle navi',
		opt_fleet1_showResCalc: 'Mostra il calcolatore di risorse',
		opt_uni_maxPlayerScore: 'Il giocatore più forte ha punti',
		opt_autocopyCoords: 'Copia automatica delle coordinate',
		opt_autocopyGlobal: 'Memorizza le coordinate da qualunque pagina (non solo dalla scheda del corrente universo di Ogame)',
		opt_fleet2_setTargetDF: 'Imposta l\'obiettivo a Campo detriti se la flotta include riciclatrici',
		opt_fleet2_fixLayout: 'Correggi l\'impostazione delle informazioni di volo (pagina 2)',
		opt_fleet2_ShortLinks: 'Collegamento rapido all\'obiettivo (pagina 2)',
		opt_fleet2_MoonColor: 'Colore delle lune nella lista scorciatoie',
		opt_fleet2_MoonsToEnd: 'Sposta le lune alla fine della lista scorciatoie',
		opt_fleet2_expandLists: 'Espandi i menu a tendina (Velocità, Scorciatoie, ACS)',
		opt_fleet2_checkProbeCapacity: 'Verifica la capacità delle sonde spia prima dell\'invio (pagina 2)',
		
		opt_missionPriority: 'Priorità della missione',
		
		opt_mvmt_expandFleets: 'Mostra le navi della flotta',
		opt_mvmt_showReversal: 'Mostra il conto alla rovescia per le flotte',
		
		opt_missAttack: 'Colore della missione: Attacco',
		opt_missColony: 'Colore della missione: Colonizzazione',
		opt_missDeploy: 'Colore della missione: Schieramento',
		opt_missDestroy: 'Colore della missione: Distruzione',
		opt_missEspionage: 'Colore della missione: Spionaggio',
		opt_missExpedition: 'Colore della missione: Spedizione',
		opt_missFederation: 'Colore della missione: Federazione',
		opt_missHarvest: 'Colore della missione: Riciclaggio',
		opt_missHold: 'Colore della missione: Stazionamento',
		opt_missTransport: 'Colore della missione: Trasporto',
		opt_msg_addSimButton: 'Aggiungi i pulsanti per inviare il rapporto di spionaggio a WebSim',

		lbl_missAttack: 'Attacco',
		lbl_missColony: 'Colonizzazione',
		lbl_missDeploy: 'Schieramento',
		lbl_missDestroy: 'Distruzione Luna',
		lbl_missEspionage: 'Spionaggio',
		lbl_missExpedition: 'Spedizione',
		lbl_missFederation: 'Attacco Federale',
		lbl_missHarvest: 'Riciclaggio',
		lbl_missHold: 'Difesa Federale',
		lbl_missTransport: 'Trasporto',

		lbl_sectionGeneral: 'Generale',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Impostazioni orario',
		lbl_sectionEventList: 'Lista Eventi',
		lbl_sectionGalaxy: 'Galassia',
		lbl_sectionMessages: 'Messaggi',
		lbl_sectionFleetDispatch: 'Invio della flotta',
		lbl_sectionFleetMovement: 'Movimenti di flotta',
		
		lbl_optionsNote1: 'L\'opzione viene memorizzata solo per questo universo',
		
		lbl_resetCoords: 'Annulla - ',
		
		lbl_TotalCapacity: 'Capacità Totale',
		lbl_MinSpeed: 'Velocità minima',
		lbl_ExPoints: 'Punti spedizione',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Risorse',
		lbl_debris: 'Detriti',
		lbl_total: 'Totale',
		lbl_loot: 'Bottino',
		lbl_metal: 'Metallo',
		lbl_crystal: 'Cristallo',
		
		lbl_shipSCargoAlt: 'CL',
		lbl_shipLCargoAlt: 'CP',
		lbl_shipRecyclerAlt: 'Recy',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Risorse mancanti',
		lbl_Production: 'Produzione',
		lbl_ArrivalACS: 'Arrivo (ACS)',
		
		lbl_btnMarkReadAll: 'Segna tutti i messaggi visualizzati come letti',
		lbl_btnDeleteSmallPlunder: 'Cancella i rapporti di spionaggio con saccheggio < di $plunder e detriti < di $debris',
				
		lbl_Moon: 'Luna',
				
		lbl_onTop: 'In alto',
		lbl_onBottom: 'In basso',
		lbl_onLeft: 'A sinistra',
		
		lbl_installNewVersion: 'Clicca per installare la nuova versione',
		lbl_Save: 'Salva',
		lbl_Clear: 'Azzera',
		lbl_Quantity: 'Quantità',
		lbl_Duration: 'Durata',
		lbl_Consumption: 'Consumo',
		
		lbl_tmTime: 'Orario',
		lbl_tmCountdown: 'Conto alla rovescia'
	};
	
	AntiGame_lang.LabelsLT =
	{
		lbl_missAttack: 'Pulti',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Dislokacija',
		lbl_missDestroy: 'Palydovo Sunaikinimas',
		lbl_missEspionage: 'Šnipinėjimas',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'AKS puolimas',
		lbl_missHarvest: 'Perdirbti nuolaužų lauką',
		lbl_missHold: 'AKS gynyba',
		lbl_missTransport: 'Transportavimas',
		
		lbl_shipSCargo: 'Mažas Krovininis Laivas',
		lbl_shipLCargo: 'Didelis Krovininis Laivas',
		lbl_shipLFighter: 'Lengvas Kovinis Laivas',
		lbl_shipHFighter: 'Sunkus Kovinis Laivas',
		lbl_shipCruiser: 'Kreiseris',
		lbl_shipBattleship: 'Šarvuotis',
		lbl_shipColonizator: 'Kolonijinis laivas',
		lbl_shipRecycler: 'Perdirbėjas',
		lbl_shipSpy: 'Šnipinėjimo Zondas',
		lbl_shipBomber: 'Bombonešis',
		lbl_shipDestroyer: 'Naikintojas',
		lbl_shipRIP: 'Mirties Žvaigždė',
		lbl_shipBCruiser: 'Linijinis Kreiseris',
		lbl_shipSatellite: 'Saulės Satelitas',
		
		lbl_defRLauncher: 'Raketsvaidis',
		lbl_defLLaser: 'Lengvas Lazeris',
		lbl_defHLaser: 'Sunkus Lazeris',
		lbl_defGauss: 'Gauso Pabūklas',
		lbl_defIon: 'Jonų Pabūklas',
		lbl_defPlasma: 'Plazmos pabūklas',
		lbl_defSShield: 'Mažas Skydo Kupolas',
		lbl_defLShield: 'Didelis Skydo Kupolas',
		
		lbl_RequiredEnergy: 'Reikalinga energija',
		
		rx_sendMail: /Siųsti žinutę (.+)\./
		
	};
	
	AntiGame_lang.InterfaceLT =
	{
		opt_languageName: 'Lietuviškai',
	
		opt_title: 'AntiGame nustatymai',
		opt_btnOk: 'Gerai',
		opt_btnCancel: 'Atšaukti',
		opt_btnDefault: 'Pagal nutylėjimą',

		opt_language: 'Kalba',
		opt_update_check: 'Automatiškai patikrinti atnaujinimus',
		opt_thousandSeparator: 'Tūkstančio skirtukas skaičiuose',
		opt_blockAutoComplete: 'Išjungti Firefox automatinį užpildymą',
		
		opt_showDeficient: 'Rodyti trūkstamus resursus',
		opt_showResources: 'Rodyti išsamią resursų informaciją',
		opt_showNames: 'Rodyti laivų/pastatų/išradimų pavadinimus ant paveiksliuko',
		opt_nameColorOn: 'Pavadinimo spalva: prieinama',
		opt_nameColorOff: 'Pavadinimo spalva: neprieinama',
		opt_nameColorDisabled: 'Pavadinimo spalva: neužtenka resursų',
		opt_showConstructionTitle: 'Rodyti statybų pavadinimą po planetos pavadinimu',
		opt_shortHeader: 'Visada sumažinti planetos paveikslėlį',
		opt_misc_scrollTitle: 'Scroll time to the next event in the window title',	// Needs translation

		opt_uni_SpeedFactor: 'Šios visatos greičio faktorius',
		opt_uni_DFPercent: 'Sunaikintų laivų virsmo nuolaužomis procentas',
		opt_uni_DefenseToDF: 'Sunaikintos gynybos virsmo nuolaužomis procentas',
		
		opt_timeSetting: 'Pakeisti laiką (tik valandos)',
		opt_showServerOgameClock: 'Palikti serverio laiką oGame laikrodyje viršutiniame dešiniame kampe',
		opt_showServerPhalanx: 'Palikti serverio laiką Sensorių Falangos ataskaitoje',
		opt_showPageStartTime: 'Rodyti laiką, kada puslapis paskutinį kartą buvo atnaujintas',
		opt_timeAMPM: 'Naudoti 12 valandų formatą (AM/PM) vietoje 24 valandų',
		
		opt_timeDontChange: 'Nekeisti laiko',
		opt_timeLocal: 'Į vietos laiko juostą',
		opt_timeServer: 'Į serverio laiko juostą',

		opt_killTips: 'Išjungti iššokančius patarimus',

		opt_evt_dimReverse: 'Dim returning fleets',	// Needs translation
		opt_phalanx_showDebris: 'Rodyti teorinį nuolaužų lauką Sensorių Falangos ataskaitoje',
		opt_evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',	// Needs translation
		opt_evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',	// Needs translation
		
		opt_galaxyShowRank: 'Rodyti žaidėjų/aljansų rangus galaktikos peržiūroje',
		opt_galaxyRankColor: 'Žaidėjų/aljansų spalva',
		opt_galaxyDebrisMin: 'Minimalus nuolaužų lauko dydis, kad išskirti kita spalva (0 - išjungti)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Išskirto nuolaužų lauko spalva',
		opt_galaxyHideMoon: 'Paslėpti Palydovo paveiksliuką (vietoj jo rodyti palydovo dydį)',
		opt_galaxy_Players: 'Išskirti šiuos žaidėjus',
		opt_galaxy_PlayerColors: 'Išskirtų žaidėjų spalva',
		opt_galaxy_Allys: 'Išskirti šiuos aljansus',
		opt_galaxy_AllyColors: 'Išskirtų aljansų spalva',
		opt_galaxy_keepTipsPlanets: 'Palikti iššokančius patarimus planetoms ir palydovams',
		opt_galaxy_keepTipsDebris: 'Palikti iššokančius patarimus nuolaužų laukams',
		
		opt_msg_PlunderThreshold: 'Mažiausia riba galimam grobiui (x1000)',
		opt_msg_DebrisThreshold: 'Mažiausia riba galimam nuolaužų laukui (x1000)',
		opt_msg_foldSmallPlunder: 'Sutraukti šnipinėjimo pranešimą su mažesniu grobiu ir nuolaužų lauku nei nustatyta riba',
		opt_msg_showPlunder: 'Rodyti galimą grobį šnipinėjimo ataskaitoje',
		opt_msg_addButtons: 'Papildomi mygtukai žinutėse',
		opt_msg_fixColors: 'Pataisyti spalvas mūšio ataskaitose',
		
		opt_fleet_showCapacity: 'Rodyti laivų talpą ir greitį',
		opt_fleet1_showResCalc: 'Rodyti resursų kalkuliatorių',
		opt_uni_maxPlayerScore: 'Stipriausias žaidėjas turi taškų',
		opt_autocopyCoords: 'Automatinis koordinačių įkėlimas',
		opt_autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',	// Needs translation
		opt_fleet2_setTargetDF: 'Nustatyti misiją "perdirbti nuolaužų lauką" jei laivyne yra perdirbėjų',
		opt_fleet2_fixLayout: 'Pataisyti skrydžio informacijos vietą (2 puslapis)',
		opt_fleet2_ShortLinks: 'Taikinių sąrašas greitam įkėlimui (2 puslapis)',
		opt_fleet2_MoonColor: 'Palydovo išskyrimo spalva, planetų pasirinkime',
		opt_fleet2_MoonsToEnd: 'Palydovus perkelti į planetų pasirinkimo pabaigą',
		opt_fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',	// Needs translation
		opt_fleet2_checkProbeCapacity: 'Tikrinti Šnipinėjimo zondų talpą prieš išsiunčiant (2 puslapis)',
		
		opt_missionPriority: 'Užduočių prioritetai',
		
		opt_mvmt_expandFleets: 'Rodyti laivyno sudėti ir krovinį',
		opt_mvmt_showReversal: 'Rodyti laivyno grįžimo laiką',
		
		opt_missAttack: 'Misijos spalva: Pulti',
		opt_missColony: 'Misijos spalva: Kolonizacija',
		opt_missDeploy: 'Misijos spalva: Dislokacija',
		opt_missDestroy: 'Misijos spalva: Palydovo Sunaikinimas',
		opt_missEspionage: 'Misijos spalva: Šnipinėjimas',
		opt_missExpedition: 'Misijos spalva: Ekspedicija',
		opt_missFederation: 'Misijos spalva: AKS puolimas',
		opt_missHarvest: 'Misijos spalva: Perdirbti nuolaužų lauką',
		opt_missHold: 'Misijos spalva: AKS gynyba',
		opt_missTransport: 'Misijos spalva: Transportavimas',
		opt_msg_addSimButton: 'Šnipinėjimo ataskaitoje pridėti mygtuką mūšio simuliavimui WebSim',
	
		lbl_missAttack: 'Pulti',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Dislokacija',
		lbl_missDestroy: 'Palydovo Sunaikinimas',
		lbl_missEspionage: 'Šnipinėjimas',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'AKS puolimas',
		lbl_missHarvest: 'Perdirbti nuolaužų lauką',
		lbl_missHold: 'AKS gynyba',
		lbl_missTransport: 'Transportavimas',

		lbl_sectionGeneral: 'Bendri',
		lbl_sectionUniverse: 'Visata',
		lbl_sectionTime: 'Laiko nustatymai',
		lbl_sectionEventList: 'Įvykių sąrašas',
		lbl_sectionGalaxy: 'Galaktika',
		lbl_sectionMessages: 'Žinutės',
		lbl_sectionFleetDispatch: 'Laivyno išsiuntimas',
		lbl_sectionFleetMovement: 'Laivyno judėjimas',
		
		lbl_optionsNote1: 'Nustatymai išsisaugos tik šiai visatai',
		
		lbl_resetCoords: 'Išvalyti koordinates - ',
		
		lbl_TotalCapacity: 'Talpa viso',
		lbl_MinSpeed: 'Mažiausias greitis',
		lbl_ExPoints: 'Ekspedicijos taškai',
		lbl_mvmt_Return: 'G',
		
		lbl_resources: 'Resursai',
		lbl_debris: 'Nuolaužų laukas',
		lbl_total: 'Viso',
		lbl_loot: 'Grobis',
		lbl_metal: 'Metalas',
		lbl_crystal: 'Kristalai',
		
		lbl_shipSCargoAlt: 'Mažų krovininių laivų reiktų',
		lbl_shipLCargoAlt: 'Didelių krovininių laivų reiktų',
		lbl_shipRecyclerAlt: 'Perdirbėjų reiktų',
		lbl_shipSatelliteAlt: 'Saulės Satelitų reiktų',
		
		lbl_deficientRes: 'Trūkstami resursai',
		lbl_Production: 'Gamyba',
		lbl_ArrivalACS: 'Atvykimas (AKS)',
		
		lbl_btnMarkReadAll: 'Pažymėti visas žinutes ekrane kaip skaitytas',
		lbl_btnDeleteSmallPlunder: 'Ištrinti šnipinėjimo ataskaitas su grobiu < $plunder ir nuolaužų lauku < $debris',
		
		lbl_Moon: 'Palydovas',
		
		lbl_onTop: 'Viršuje',
		lbl_onBottom: 'Apačioje',
		lbl_onLeft: 'Kairėje',
		
		lbl_installNewVersion: 'Spragtelėkite, kad įdiegti naują versiją',
		lbl_Save: 'Išsaugoti',
		lbl_Clear: 'Išvalyti',
		lbl_Quantity: 'Kiekis',
		lbl_Duration: 'Trukmė',
		lbl_Consumption: 'Sunaudojimas',
		
		lbl_tmTime: 'Laikas',
		lbl_tmCountdown: 'Atskaita'
	}
	
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
		
	};
	
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

                opt_evt_dimReverse: 'Maak terugkerende vloten dof', //Added this one since it wasn't in the AntiGam_lang_en file :)
		opt_phalanx_showDebris: 'Toon theoretisch puin in Phalanx overzicht',
		opt_evt_expandFleetsEvt: 'Toon vloot samenstelling en vracht (Gebeurtenissenlijst)',
		opt_evt_expandFleetsPhal: 'Toon vloot samenstelling en vracht (Phalanx)',
		
		opt_galaxyShowRank: 'Toon speler/alliantie ranks in melkweg',
		opt_galaxyRankColor: 'Kleur van speler/alliantie ranks',
		opt_galaxyDebrisMin: 'Minimale grootte om puinveld te markeren (0 om uit te zetten)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
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
		opt_uni_maxPlayerScore: 'De sterkste speler heeft punten',
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
	};
	
	AntiGame_lang.LabelsNO =
	{
		lbl_missAttack: 'Angrep',
		lbl_missColony: 'Kolonisering',
		lbl_missDeploy: 'Anvendelse',
		lbl_missDestroy: 'Måne-Ødeleggelse',
		lbl_missEspionage: 'Spionasje',
		lbl_missExpedition: 'Ekspedisjon',
		lbl_missFederation: 'ACS Angrep',
		lbl_missHarvest: 'Resirkuler ruinmark',
		lbl_missHold: 'ACS Forsvar',
		lbl_missTransport: 'Transport',

		lbl_shipSCargo: 'Lite Lasteskip',
		lbl_shipLCargo: 'Stort Lasteskip',
		lbl_shipLFighter: 'Lett Jeger',
		lbl_shipHFighter: 'Tung Jeger',
		lbl_shipCruiser: 'Krysser',
		lbl_shipBattleship: 'Slagskip',
		lbl_shipColonizator: 'Koloni Skip',
		lbl_shipRecycler: 'Resirkulerer',
		lbl_shipSpy: 'Spionasjesonde',
		lbl_shipBomber: 'Bomber',
		lbl_shipDestroyer: 'Destroyer',
		lbl_shipRIP: 'Døds stjerne',
		lbl_shipBCruiser: 'Slagkrysser',
		lbl_shipSatellite: 'Solar Satelitt',

		lbl_defRLauncher: 'Rakettkaster',
		lbl_defLLaser: 'Lett laser',
		lbl_defHLaser: 'Tung Laser',
		lbl_defGauss: 'Gauss Kannon',
		lbl_defIon: 'Ion Kannon',
		lbl_defPlasma: 'Plasma Tårn',
		lbl_defSShield: 'Liten Skjold-Kuppel',
		lbl_defLShield: 'Stor Skjold-Kuppel',

		lbl_RequiredEnergy: 'Energi behov',

		rx_sendMail: /Send a message to (.+)\./
	}

	AntiGame_lang.InterfaceNO =
	{
		opt_languageName: 'Norsk',

		opt_title: 'AntiGame Innstillinger',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Avbryt',
		opt_btnDefault: 'standard',

		opt_language: 'Språk',
		opt_update_check: 'Auto-check for updates',
		opt_thousandSeparator: 'Thousand separator',
		opt_blockAutoComplete: 'Block Auto-Complete in Firefox',

		opt_showDeficient: 'Vis manglende ressurser',
		opt_showResources: 'Vis utvidet ressursene informasjon',
		opt_showNames: 'Vis skip / bygg / forskning navn over bildene',
		opt_nameColorOn: 'Navn farge: tilgjengelig',
		opt_nameColorOff: 'Navn farge: utilgjengelig ',
		opt_nameColorDisabled: 'Navn farge: ikke nok ressurser',
		opt_showConstructionTitle: 'Vis byggingens titler i planet listen',
		opt_shortHeader: 'Alltid minimere planet bilde',
		opt_misc_scrollTitle: 'Bla til neste arrangement i vinduet tittelen',

		opt_uni_SpeedFactor: 'Speed faktor i dette univers',
		opt_uni_DFPercent: 'Prosentandel av flåtestruktur til avfallsavdeling',
		opt_uni_DefenseToDF: 'Prosentandel av forsvar til avfallsavdeling',

		opt_timeSetting: 'Endre tids verdier (Kun timer )',
		opt_showServerOgameClock: 'Keep server time for top-right Ogame clock',
		opt_showServerPhalanx: 'Beholde server tid for Phalanx visning',
		opt_showPageStartTime: 'Vise tiden, siden ble oppdatert sist',
		opt_timeAMPM: 'Bruk 12-timers format (AM / PM) i stedet for 24-timers',

		opt_timeDontChange: 'Ikke endre tid',
		opt_timeLocal: 'Alltid sett til lokal tidssone',
		opt_timeServer: 'Alltid sett til server tidssone',

		opt_killTips: 'Kill tooltips',

		opt_evt_dimReverse: 'Dimme returnere flåter',
		opt_phalanx_showDebris: 'Vis teoretisk avfallsavdeling i Phalanx visning',
		opt_evt_expandFleetsEvt: 'Vis flåte sammensetning og lasteskip (EventList)',
		opt_evt_expandFleetsPhal: 'Vis flåte sammensetning og lasteskip (Phalanx)',

		opt_galaxyShowRank: 'Vis spiller / allianse rank i Galaxy visning',
		opt_galaxyRankColor: 'Spiller / allianse rank farge',
		opt_galaxyDebrisMin: 'Minste størrelse på avfallsavdeling som fremheves (0 for å slå av)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Farge på uthevet avfallsavdeling',
		opt_galaxyHideMoon: 'Skjul Måne bilde (vis måne størrelse i stedet)',
		opt_galaxy_Players: 'Uthev følgende spillere',
		opt_galaxy_PlayerColors: 'Farger på spilleren som fremheves',
		opt_galaxy_Allys: 'Uthev følgende allianser',
		opt_galaxy_AllyColors: 'Farger på alliansen som fremheves',
		opt_galaxy_keepTipsPlanets: 'Beholde tooltips på planeter og måner',
		opt_galaxy_keepTipsDebris: 'Beholde tooltips på avfallsavdeling felt',

		opt_msg_PlunderThreshold: 'Lavest grense for teoretisk plyndring (x1000)',
		opt_msg_DebrisThreshold: 'Lavest grense for teoretisk avfallsavdeling (x1000)',
		opt_msg_foldSmallPlunder: 'Fold reports with plunder and debris less than the limit',
		opt_msg_showPlunder: 'Vis byttet i spion rapporter',
		opt_msg_addButtons: 'Ekstra knapper på meldinger',
		opt_msg_fixColors: 'Fiks farger av kamp rapporter',

		opt_fleet_showCapacity: 'Vis skips kapasitet og hastighet',
		opt_fleet1_showResCalc: 'Vis ressurs kalkulator',
		opt_uni_maxPlayerScore: 'Den sterkeste spilleren har poeng',
		opt_fleet1_killTips: 'Fleet 1: Kill tooltips',		
		opt_autocopyCoords: 'Auto-kopi koordinater',
		opt_autocopyGlobal: 'Lagrer koordinater fra en side (ikke bare Gjeldende Ogame universet faner)',
		opt_fleet2_setTargetDF: 'Sett målet til DF hvis flåte inneholder gjenvinnere',
		opt_fleet2_fixLayout: 'Fiks flygeinformasjon layout (side 2)',
		opt_fleet2_ShortLinks: 'Mål shortlinks (side 2)',
		opt_fleet2_MoonColor: 'Farge på månene i shortlink listen',
		opt_fleet2_MoonsToEnd: 'Flytt måner til slutten av shortlinks listen',
		opt_fleet2_expandLists: 'Utvid rullegardinmenyen (Speed??, Snarveier, ACSs)',
		opt_fleet2_checkProbeCapacity: 'Sjekk probers kapasitet før avreise (side 2)',
		opt_missionPriority: 'oppdrags prioritet',

		opt_mvmt_expandFleets: 'Vis flåte skip og lasteskip',
		opt_mvmt_showReversal: 'Vis returtid tid på flåter',

		opt_missAttack: 'oppdrags farge: Angrep',
		opt_missColony: 'oppdrags farge: Kolonisering',
		opt_missDeploy: 'oppdrags farge: Anvendelse',
		opt_missDestroy: 'oppdrags farge: Ødelegge',
		opt_missEspionage: 'oppdrags farge: Spionasje',
		opt_missExpedition: 'oppdrags farge: Ekspedisjon',
		opt_missFederation: 'oppdrags farge: føderasjon',
		opt_missHarvest: 'oppdrags farge: innhøstning',
		opt_missHold: 'oppdrags farge: Acs forsvar',
		opt_missTransport: 'oppdrags farge: Transport',
		opt_msg_addSimButton: 'Legg til knapper for å sende spion rapporter til simulator',

		lbl_missAttack: 'Angrep',
		lbl_missColony: 'Kolonisering',
		lbl_missDeploy: 'Anvendelse',
		lbl_missDestroy: 'Måne-Ødeleggelse',
		lbl_missEspionage: 'Spionasje',
		lbl_missExpedition: 'Ekspedisjon',
		lbl_missFederation: 'ACS Angrep',
		lbl_missHarvest: 'Innhøstning',
		lbl_missHold: 'ACS Forsvar',
		lbl_missTransport: 'Transport',

		lbl_sectionGeneral: 'Generell',
		lbl_sectionUniverse: 'Univers',
		lbl_sectionTime: 'tidsinnstillinger',
		lbl_sectionEventList: 'Event liste og Phalanx',
		lbl_sectionGalaxy: 'Galakse',
		lbl_sectionMessages: 'Meldinger',
		lbl_sectionFleetDispatch: 'flåte utsendelse',
		lbl_sectionFleetMovement: 'flåte bevegelse',

		lbl_optionsNote1: 'Alternativet er lagret for kun dette universet',

		lbl_resetCoords: 'Reset - ',

		lbl_TotalCapacity: 'Total kapasitet',
		lbl_MinSpeed: 'minste hastighet',
		lbl_ExPoints: 'Ekepedisjons poeng',
		lbl_mvmt_Return: 'R',

		lbl_resources: 'ressurser',
		lbl_debris: 'vrakrester',
		lbl_total: 'Totall',
		lbl_loot: 'bytte',
		lbl_metal: 'Metall',
		lbl_crystal: 'Krystal',

		lbl_shipSCargoAlt: 'LL',
		lbl_shipLCargoAlt: 'SL',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat.',

		lbl_deficientRes: 'manglende ressurser',
		lbl_Production: 'Produksjon',
		lbl_ArrivalACS: 'Ankomst (ACS)',

		lbl_btnMarkReadAll: 'Marker alle vises meldinger som lest ',
		lbl_btnDeleteSmallPlunder: 'Slett spion rapporter med Bytte <$ Bytte og vrakrester <$ vrakrester',

		lbl_Moon: 'Måne',

		lbl_onTop: 'på toppen',
		lbl_onBottom: 'på bunden',
		lbl_onLeft: 'til venstre',

		lbl_installNewVersion: 'Klikk for å installere ny versjon',
		lbl_Save: 'Lagre',
		lbl_Clear: 'Slett',
		lbl_Quantity: 'Antall',
		lbl_Duration: 'varighet',
		lbl_Consumption: 'forbruk',

		lbl_tmTime: 'Tid',
		lbl_tmCountdown: 'nedtelling'
	}
	
	AntiGame_lang.LabelsPL =
	{
		lbl_missAttack: 'Atakuj',
		lbl_missColony: 'Kolonizuj',
		lbl_missDeploy: 'Stacjonuj',
		lbl_missDestroy: 'Niszcz',
		lbl_missEspionage: 'Szpieguj',
		lbl_missExpedition: 'Ekspedycja',
		lbl_missFederation: 'Atak związku',
		lbl_missHarvest: 'Zbieraj',
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

		bl_defRLauncher: 'Wyrzutnia rakiet',
		lbl_defLLaser: 'Lekkie działo laserowe',
		lbl_defHLaser: 'Ciężkie działo laserowe',
		lbl_defGauss: 'Działo Gaussa',
		lbl_defIon: 'Działo jonowe',
		lbl_defPlasma: 'Wyrzutnia plazmy',
		lbl_defSShield: 'Mała powłoka ochronna',
		lbl_defLShield: 'Duża powłoka ochronna',
		
		lbl_RequiredEnergy: 'Potrzebna energia',
		
		rx_sendMail: /Wyślij wiadomość do (.+)\./
	};

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
		opt_shortHeader: 'Zawsze minimalizuj obrazek planety',
		opt_misc_scrollTitle: 'Przewijaj czas do nastepnego zdarzenia w nagłówku przeglądarki',

		opt_uni_SpeedFactor: 'Współczynnik prędkości tego uniwersum',
		opt_uni_DFPercent: 'Procent debrisu z floty',
		opt_uni_DefenseToDF: 'Procent debrisu z obrony',

		opt_timeSetting: 'Ustaw godzine',
		opt_showServerOgameClock: 'Nie zmieniaj czasu Ogame zegara z prawego górnego rogu',
		opt_showServerPhalanx: 'Nie zmieniaj czasu serwera dla widoku Falangi Czujników',
		opt_showPageStartTime: 'Wyświetlaj czas ostatniego odświeżenia strony',
		opt_timeAMPM: 'Uzyj 12-godzinnego formatu (AM/PM) zamiast 24-godzinnego',

		opt_timeDontChange: 'Nie zmieniaj czasu',
		opt_timeLocal: 'Ustaw do lokalnej strefy czasowej',
		opt_timeServer: 'Ustaw do strefy czasowej serwera',

		opt_killTips: 'Zamknij tooltips',

		opt_evt_dimReverse: 'Przyciemnij sloty powracających flot',
		opt_phalanx_showDebris: 'Pokazuj przybliżone pole zniszczeń, powstałe z lecącej floty widocznej na falandze',
		opt_evt_expandFleetsEvt: 'Pokazuj skład floty i ładunek w podglądzie lotów na stronie głównej',
		opt_evt_expandFleetsPhal: 'Pokazuj skład floty i ładunek w falandze',

		opt_galaxyShowRank: 'Pokazuj pozycje graczy/sojuszów w widoku Galaktyki',
		opt_galaxyRankColor: 'Kolor pozycji graczy/sojuszów',
		opt_galaxyDebrisMin: 'Minimalny rozmiar Pola Zniszczeń do podświetlenia (0&nbsp;wyłącza)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
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
		
		opt_fleet_showCapacity: 'Pokazuj ładowność i prędkość statków',
		opt_fleet1_showResCalc: 'Pokazuj kalkulator zasobów',
		opt_uni_maxPlayerScore: 'Silniejszy gracz ma punktów',
		opt_autocopyCoords: 'Auto-kopiowanie koordynatów',
		opt_autocopyGlobal: 'Zapamiętaj koordynaty z dowolnej strony (nie tylko z Ogame)',
		opt_fleet2_setTargetDF: 'Automatycznie ustaw miejsce przeznaczenia: "PZ" gdy wysylasz recyklery',
		opt_fleet2_fixLayout: 'Poprawiaj wygląd informacji o flocie (strona 2)',
		opt_fleet2_ShortLinks: 'Pomocne linki (strona 2).<br />Format: G#S#P#T#N, gdzie:<br />G#S#P = koordynaty<br />T = 1 - planeta, 2 - szczątki, 3 - księżyc<br />N - nazwa, która jest opcjonalna<br />Kolejne wpisy oddzielamy przecinkiem","',
		opt_fleet2_MoonColor: 'Kolor dla księżycy w krótkiej liście - druga zakładka',
		opt_fleet2_MoonsToEnd: 'Prznieś księżyce na koniec listy wyboru koordynatów',
		opt_fleet2_expandLists: 'Pokazuj w drugiej zakładce wysyłania floty skróty do koordynatów planet i ataków ACS',
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
		lbl_sectionUniverse: 'Uniwersum',
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
		lbl_ExPoints: 'Punkty ekpedycji',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Surowce',
		lbl_debris: 'Pole Zniszczeń',
		lbl_total: 'Razem',
		lbl_loot: 'Rabunek',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kryształ',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'DT',
		lbl_shipRecyclerAlt: 'Rec',
		lbl_shipSatelliteAlt: 'Sat.',
		
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
		lbl_Consumption: 'Konsumpcja',

		lbl_tmTime: 'Czas',
		lbl_tmCountdown: 'Odliczanie'
	};
	
	AntiGame_lang.LabelsPT =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espiar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'Ataque em Aliança',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Manter posições',
		lbl_missTransport: 'Transportar',

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
		lbl_shipDestroyer: 'Destruidor',
		lbl_shipRIP: 'Estrela da Morte',
		lbl_shipBCruiser: 'Interceptor',
		lbl_shipSatellite: 'Satélite Solar',

		lbl_defRLauncher: 'Lançador de Mísseis',
		lbl_defLLaser: 'Laser Ligeiro',
		lbl_defHLaser: 'Laser Pesado',
		lbl_defGauss: 'Canhão de Gauss',
		lbl_defIon: 'Canhão de Iões',
		lbl_defPlasma: 'Canhão de Plasma',
		lbl_defSShield: 'Pequeno Escudo Planetário',
		lbl_defLShield: 'Grande Escudo Planetário',

		lbl_RequiredEnergy: 'Energia necessária',

		rx_sendMail: /Enviar uma mensagem a (.+)\./
	};

	AntiGame_lang.InterfacePT =
	{
		opt_languageName: 'Português',

		opt_title: 'Opções AntiGame',
		opt_btnOk: 'Confirmar',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Padrão',

		opt_language: 'Idioma',
		opt_update_check: 'Procura automática de atualizações',
		opt_thousandSeparator: 'Separador de Milhares',
		opt_blockAutoComplete: 'Bloquear Autocompletar do Firefox',

		opt_showDeficient: 'Mostrar os recursos que faltam',
		opt_showResources: 'Mostrar informações adicionais de recursos',
		opt_showNames: 'Mostrar os nomes de naves/edifícios/pesquisas sobre as imagens',
		opt_nameColorOn: 'Cor no Nome: disponível',
		opt_nameColorOff: 'Cor no Nome: indisponível',
		opt_nameColorDisabled: 'Cor no Nome: sem recursos suficientes',
		opt_showConstructionTitle: 'Mostrar as construções em curso na lista do planeta',
		opt_shortHeader: 'Minimizar sempre a imagem do Planeta',
		opt_misc_scrollTitle: 'Passar no título da janela o tempo para o próximo evento',

		opt_uni_SpeedFactor: 'Velocidade do Universo',
		opt_uni_DFPercent: 'Percentagem de frota para destroços',
		opt_uni_DefenseToDF: 'Percentagem de defensa para destroços',

		opt_timeSetting: 'Mudar valores do tempo (só horas)',
		opt_showServerOgameClock: 'Manter a hora do servidor no relógio superior direito do OGame',
		opt_showServerPhalanx: 'Manter a hora do servidor na vista Phalanx',
		opt_showPageStartTime: 'Mostrar a hora em que a página foi atualizada pela ultima vez',
		opt_timeAMPM: 'Usar formato 12horas (AM/PM) no lugar do formato 24horas',

		opt_timeDontChange: 'Não alterar a hora',
		opt_timeLocal: 'Manter sempre a hora local',
		opt_timeServer: 'Manter sempre a hora do servidor',

		opt_killTips: 'Desactivar tooltips',

		opt_evt_dimReverse: 'Escurecer as frotas em retorno',
		opt_phalanx_showDebris: 'Mostrar os destroços teóricos na vista Phalanx',
		opt_evt_expandFleetsEvt: 'Mostrar a composição da frota e capacidade de carga (Lista de Eventos)',
		opt_evt_expandFleetsPhal: 'Mostrar a composição da frota e capacidade de carga (Phalanx)',

		opt_galaxyShowRank: 'Mostrar classificação jogador/aliança na vista Galáxia',
		opt_galaxyRankColor: 'Cor na classificação jogador/aliança',
		opt_galaxyDebrisMin: 'Tamanho mínimo dos destroços em destaque (0 para desativar)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Cor dos destroços em destaque',
		opt_galaxyHideMoon: 'Eliminar imagem das Luas (mostrar unicamente o tamanho)',
		opt_galaxy_Players: 'Jogadores seguintes em destaque',
		opt_galaxy_PlayerColors: 'Cor para jogadores seguintes',
		opt_galaxy_Allys: 'Alianças seguintes em destaque',
		opt_galaxy_AllyColors: 'Cor para as alianças seguintes',
		opt_galaxy_keepTipsPlanets: 'Manter tooltips para planetas e luas',
		opt_galaxy_keepTipsDebris: 'Manter tooltips para destroços',

		opt_msg_PlunderThreshold: 'Valor mínimo para roubo teórico (x1000)',
		opt_msg_DebrisThreshold: 'Valor mínimo para destroços teórico (x1000)',
		opt_msg_foldSmallPlunder: 'Ocultar as informações do roubo e destroços abaixo desse valor',
		opt_msg_showPlunder: 'Mostrar o roubo no relatório de espionagem',
		opt_msg_addButtons: 'Adicionar botões às mensagens',
		opt_msg_fixColors: 'Corrigir cores nos relatórios de combate',

		opt_fleet_showCapacity: 'Mostrar a capacidade de carga e velocidade das naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_uni_maxPlayerScore: 'O jogador mais forte tem pontos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_autocopyGlobal: 'Memorizar coordenadas de qualquer página (não só no separador do universo atual)',
		opt_fleet2_setTargetDF: 'Definir destino Campo de Destroços se a sua frota incluir recicladores',
		opt_fleet2_fixLayout: 'Corrigir layout de informação de voo (página 2)',
		opt_fleet2_ShortLinks: 'Direcionar atalhos (página 2)',
		opt_fleet2_MoonColor: 'Colorir luas na lista de atalhos',
		opt_fleet2_MoonsToEnd: 'Mover luas para o final da lista de atalhos',
		opt_fleet2_expandLists: 'Expandir caixas de seleção (Velocidade, Atalhos, ACSs)',
		opt_fleet2_checkProbeCapacity: 'Verificar a capacidade das sondas antes do envio (página 2)',

		opt_missionPriority: 'Prioridade da missão',

		opt_mvmt_expandFleets: 'Mostrar as naves e capacidade de carga da frota',
		opt_mvmt_showReversal: 'Mostrar a hora do regresso da frota',

		opt_missAttack: 'Cor para a missão: Atacar',
		opt_missColony: 'Cor para a missão: Colonizar',
		opt_missDeploy: 'Cor para a missão: Transferir',
		opt_missDestroy: 'Cor para a missão: Destruir Lua',
		opt_missEspionage: 'Cor para a missão: Espiar',
		opt_missExpedition: 'Cor para a missão: Expedição',
		opt_missFederation: 'Cor para a missão: Ataque em Aliança',
		opt_missHarvest: 'Cor para a missão: Reciclar',
		opt_missHold: 'Cor para a missão: Manter posições',
		opt_missTransport: 'Cor para a missão: Transportar',
		opt_msg_addSimButton: 'Adicionar botões para submeter os relatórios de espionagem ao simulador',

		lbl_missAttack: 'Ataque',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espiar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'Ataque em Aliança',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Manter posições',
		lbl_missTransport: 'Transportar',

		lbl_sectionGeneral: 'Geral',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Configurações da Hora',
		lbl_sectionEventList: 'Lista de Eventos & Phalanx',
		lbl_sectionGalaxy: 'Galáxia',
		lbl_sectionMessages: 'Mensagens',
		lbl_sectionFleetDispatch: 'Envio de Frota',
		lbl_sectionFleetMovement: 'Movimento de Frotas',

		lbl_optionsNote1: 'A opção é guardada apenas para este Universo',

		lbl_resetCoords: 'Limpar coordenada - ',

		lbl_TotalCapacity: 'Capacidade total',
		lbl_MinSpeed: 'Velocidade mínima',
		lbl_ExPoints: 'Pontos de Expedição',
		lbl_mvmt_Return: 'R',

		lbl_resources: 'Recursos',
		lbl_debris: 'Destroços',
		lbl_total: 'Total',
		lbl_loot: 'Roubo',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',

		lbl_shipSCargoAlt: 'CP',
		lbl_shipLCargoAlt: 'CG',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat.',

		lbl_deficientRes: 'Recursos necessários',
		lbl_Production: 'Produção',
		lbl_ArrivalACS: 'Chegada (ACS)',

		lbl_btnMarkReadAll: 'Marcar todas as mensagens como lidas',
		lbl_btnDeleteSmallPlunder: 'Apagar os relatórios de espionagem com roubo < $roubo e destroços < $destroços',

		lbl_Moon: 'Lua',

		lbl_onTop: 'No topo',
		lbl_onBottom: 'Em baixo',
		lbl_onLeft: 'À esquerda',

		lbl_installNewVersion: 'Clique para instalar a nova versão',
		lbl_Save: 'Guardar',
		lbl_Clear: 'Limpar',
		lbl_Quantity: 'Quantidade',
		lbl_Duration: 'Duração',
		lbl_Consumption: 'Consumo',

		lbl_tmTime: 'Hora',
		lbl_tmCountdown: 'Contagem regressiva'
	};	

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

		lbl_defRLauncher: 'Rocket Launcher',
		lbl_defLLaser: 'Light Laser',
		lbl_defHLaser: 'Heavy Laser',
		lbl_defGauss: 'Gauss Cannon',
		lbl_defIon: 'Ion Cannon',
		lbl_defPlasma: 'Plasma Turret',
		lbl_defSShield: 'Small Shield Dome',
		lbl_defLShield: 'Large Shield Dome',
		
		lbl_RequiredEnergy: 'Energie necesara',
		
		rx_sendMail: /Send a message to (.+)\./
	};

	AntiGame_lang.InterfaceRO =
	{
		opt_languageName: 'Romana',
				
		opt_title: 'Optiuni AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Renunta',
		opt_btnDefault: 'Default',

		opt_language: 'Limba',
		opt_update_check: 'Auto-check for updates',
		opt_thousandSeparator: 'Thousand separator',
		opt_blockAutoComplete: 'Deconecteaza Auto-Fill in Firefox',
		
		opt_showDeficient: 'Arata resurse insuficiente',
		opt_showResources: 'Afiseaza extins informatiile despre resurse',
		opt_showNames: 'Aata denumirea navelor/uzinelor/cercetarilor peste imagine',
		opt_nameColorOn: 'Culoare misiunei: disponibil',
		opt_nameColorOff: 'Culoare misiunei: indisponibil',
		opt_nameColorDisabled: 'Culoare misiunei: Nu ajung resurse',
		opt_showConstructionTitle: 'Arata denumirea misiunei a constructiilor langa lista planetelor',
		opt_shortHeader: 'Always minimize planet image',
		opt_misc_scrollTitle: 'Scroll time to the next event in the window title',
		
		opt_uni_SpeedFactor: 'Factorul de accelerare in acest univers',
		opt_uni_DFPercent: 'Percentage of fleet structure to debris',
		opt_uni_DefenseToDF: 'Percentage of defense to debris',

		opt_timeSetting: 'Change time values (hours only)',
		opt_showServerOgameClock: 'Keep server time for top-right Ogame clock',
		opt_showServerPhalanx: 'Keep server time for Phalanx view',
		opt_showPageStartTime: 'Display the time the page was last refreshed',
		opt_timeAMPM: 'Use 12-hours format (AM/PM) instead of 24-hours',
		
		opt_timeDontChange: 'Don\'t change time',
		opt_timeLocal: 'Always set to local timezone',
		opt_timeServer: 'Always set to server timezone',
		
		opt_killTips: 'Block pop-up sfaturi',

		opt_evt_dimReverse: 'Dim returning fleets',
		opt_phalanx_showDebris: 'Show theoretical debris in Phalanx view',
		opt_evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',
		opt_evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',
		
		opt_galaxyShowRank: 'Arata rank-ul jucator/alianta in sistem',
		opt_galaxyRankColor: 'Culoarea pentru rank/alianta',
		opt_galaxyDebrisMin: 'CR-ul minim pentru iluminare (0 - nu este iluminat)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Culoarea ce ilumineaza CR-ului',
		opt_galaxyHideMoon: 'Ascunde imaginea Lunii (in schimb arat dimensiunea Lunei)',
		opt_galaxy_Players: 'Ilumineaza urmatorii jucatori',
		opt_galaxy_PlayerColors: 'Culoarea pentru iluminarea jucatorilor',
		opt_galaxy_Allys: 'Ilumineaza urmatoarele aliante',
		opt_galaxy_AllyColors: 'Culoare pentru iluminarea aliantelor',
		opt_galaxy_keepTipsPlanets: 'Salveaza sfaturile pentru planete si luni',
		opt_galaxy_keepTipsDebris: 'Salveaza sfaturile pentru campurile de ramasite',

		opt_msg_PlunderThreshold: 'Limita minima pentru o posibila captura (x1000)',
		opt_msg_DebrisThreshold: 'Limina minima pentru un posibil derbis (x1000)',
		opt_msg_foldSmallPlunder: 'Minimizeaza rapoartele capturate unde dobanda si derbisul limita',
		opt_msg_showPlunder: 'Arata posibila capacitate capturata in rapoartele de spionaj',
		opt_msg_addButtons: 'Butoane suplimentare un casuta de mesaje',
		opt_msg_fixColors: 'Corecteaza culorile rapoartelor de lupta',

		opt_fleet_showCapacity: 'Arata capacitatea cargo si viteza navelor',
		opt_fleet1_showResCalc: 'Show resource calculator',
		opt_uni_maxPlayerScore: 'The strongest player has points',
		opt_autocopyCoords: 'Auto-copy coordinates',
		opt_autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',
		opt_fleet2_setTargetDF: 'Trimite la CR daca in flota exista reciclatoare',
		opt_fleet2_fixLayout: 'Corecteaza locatia si informatia despre misiune (pagina2)',
		opt_fleet2_ShortLinks: 'Lista tintelor pentru atasare rapida (pagina 2)',
		opt_fleet2_MoonColor: 'Color for moons in the shortlink list',
		opt_fleet2_MoonsToEnd: 'Move moons to the end of the shortlinks list',
		opt_fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',
		opt_fleet2_checkProbeCapacity: 'Arata capacitatea de stocare a probelor inainte de a trimite (pagina 2)',
		
		opt_missionPriority: 'Sarcini prioritare',
	
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
		opt_msg_addSimButton: 'Adauga butonul de simulare a raportului de lupta WebSim',

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
		
		lbl_sectionGeneral: 'Total',
		lbl_sectionUniverse: 'Universe',
		lbl_sectionTime: 'Time settings',
		lbl_sectionEventList: 'Lista evenimentelor',
		lbl_sectionGalaxy: 'Univers',
		lbl_sectionMessages: 'Mesaj',
		lbl_sectionFleetDispatch: 'Trimite flota',
		lbl_sectionFleetMovement: 'Lista flotei',
		
		lbl_optionsNote1: 'Setarea este salvata numai pentru acest univers',
		
		lbl_resetCoords: 'Renunta - ',
		
		lbl_TotalCapacity: 'capacitatea totala',
		lbl_MinSpeed: 'Viteza minima',
		lbl_ExPoints: 'Expedition points',
		lbl_mvmt_Return: 'R',

		lbl_resources: 'Resurse',
		lbl_debris: 'Derbis',
		lbl_total: 'Total',
		lbl_loot: 'Dobanda',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'Transportor Mic',
		lbl_shipLCargoAlt: 'Ttransportor Mare',
		lbl_shipRecyclerAlt: 'Reciclatoare',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Lipsa de resurse',
		lbl_Production: 'Producere',
		lbl_ArrivalACS: 'Intoarcere (SAL)',
		
		lbl_btnMarkReadAll: 'Noteaza toate mesajele ca fiind citite',
		lbl_btnDeleteSmallPlunder: 'Sterge toate mesajele cu dobanda de < $plunder si derbis de < $debris',
		
		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Sus',
		lbl_onBottom: 'Jos',
		lbl_onLeft: 'In stanga',
		
		lbl_installNewVersion: 'Click to install new version',
		lbl_Save: 'Save',
		lbl_Clear: 'Clear',
		lbl_Quantity: 'Quantity',
		lbl_Duration: 'Duration',
		lbl_Consumption: 'Consumption',
		
		lbl_tmTime: 'Time',
		lbl_tmCountdown: 'Countdown'
	};

	AntiGame_lang.LabelsSI =
	{
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Premik',
		lbl_missDestroy: 'Uničenje lune',
		lbl_missEspionage: 'Vohuni',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'ACS napad',
		lbl_missHarvest: 'Recikliraj',
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
		
		lbl_defRLauncher: 'Raketnik',
		lbl_defLLaser: 'Lahki laser',
		lbl_defHLaser: 'Težek Laser',
		lbl_defGauss: 'Gaussov top',
		lbl_defIon: 'Ionski top',
		lbl_defPlasma: 'Plazemski top',
		lbl_defSShield: 'Majhen ščit',
		lbl_defLShield: 'Velik ščit',
		
		lbl_RequiredEnergy: 'Potrebna energija',
		
		rx_sendMail: /Pošlji sporočilo (.+)\./
		
	};
	
	AntiGame_lang.InterfaceSI =
	{
		opt_languageName: 'Slovenščina',
	
		opt_title: 'AntiGame možnosti',
		opt_btnOk: 'V redu',
		opt_btnCancel: 'Prekliči',
		opt_btnDefault: 'Privzeto',

		opt_language: 'Jezik',
		opt_update_check: 'Samodejno preveri za posodobitve',
		opt_thousandSeparator: 'Ločilo za tisočice',
		opt_blockAutoComplete: 'Blokiraj samodejno dokončanje v Firefox-u',
		
		opt_showDeficient: 'Pokaži manjkajoče surovine',
		opt_showResources: 'Pokaži podrobne informacije o surovinah',
		opt_showNames: 'Pokaži imena ladij/zgradb/raziskav na slikah',
		opt_nameColorOn: 'Barva imena: na voljo',
		opt_nameColorOff: 'Barva imena: ni na voljo',
		opt_nameColorDisabled: 'Barva imena: ni dovolj surovin',
		opt_showConstructionTitle: 'Pokaži imena zgradb na seznamu planetov',
		opt_shortHeader: 'Vedno pomanjšaj sliko planeta',
		opt_misc_scrollTitle: 'Zavrti čas do naslednjega dogodka v naslovu okna',
		
		opt_uni_SpeedFactor: 'Hitrost tega vesolja',
                opt_uni_DFPercent: 'Odstotek flote v ruševinah',
		opt_uni_DefenseToDF: 'Odstotek obrambe v ruševinah',
		
		opt_timeSetting: 'Spremeni časovne vrednosti (samo ure)',
		opt_showServerOgameClock: 'Ohrani strežnikov čas za OGame uro',
		opt_showServerPhalanx: 'Ohrani strežnikov čas za pogled Senzorske falange',
		opt_showPageStartTime: 'Pokaži čas zadnje osvežitve strani',
		opt_timeAMPM: 'Uporabi 12 urni format (AM/PM) namesto 24 urnega',

		opt_timeDontChange: 'Ne spremeni časa',
		opt_timeLocal: 'Vedno nastavi na lokalni čas',
		opt_timeServer: 'Vedno nastavi na strežniški čas',

		opt_killTips: 'Prepreči oblačke',
		
		opt_evt_dimReverse: 'Dim-aj vračajoče se flote',
		opt_phalanx_showDebris: 'Pokaži teoretične ruševine v pogledu Senzorske Falange',
		opt_evt_expandFleetsEvt: 'Pokaži sestavo flote in tovor (Seznam dogodkov)',
		opt_evt_expandFleetsPhal: 'Pokaži sestavo flote in tovor (Senzorska Falanga)',
		
		opt_galaxyShowRank: 'Pokaži rank igralca/alianse v pogledu galaksije',
		opt_galaxyRankColor: 'Barve rankov igralca/alianse',
		opt_galaxyDebrisMin: 'Najmanjša velikost ruševin, ki bodo označene (0, da izklopite)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Barva označenih ruševin',
		opt_galaxyHideMoon: 'Skrij ikono lune (namesto tega pokaži njeno velikost)',
		opt_galaxy_Players: 'Označi naslednje igralce',
		opt_galaxy_PlayerColors: 'Barve označenih igralcev',
		opt_galaxy_Allys: 'Označi naslednje alianse',
		opt_galaxy_AllyColors: 'Barve označenih alians',
		opt_galaxy_keepTipsPlanets: 'Ohrani oblačke za planete in lune',
		opt_galaxy_keepTipsDebris: 'Ohrani oblačke za ruševine',
		
		opt_msg_PlunderThreshold: 'Spodnja meja za teoretični plen (x1000)',
		opt_msg_DebrisThreshold: 'Spodnja meja za teoretične ruševine (x1000)',
		opt_msg_foldSmallPlunder: 'Skrij poročila, ki vsebujejo plen in ruševine pod mejo',
		opt_msg_showPlunder: 'Pokaži plen v vohunskih sporočilih',
		opt_msg_addButtons: 'Dodatni gumbi v pogledu Sporočila',
		opt_msg_fixColors: 'Popravi barve za poročilo bitk',
		
		opt_fleet_showCapacity: 'Pokaži hitrost in kapaciteto ladij',
		opt_fleet1_showResCalc: 'Pokaži kalkulator surovin',
		opt_uni_maxPlayerScore: 'Najmočnejši igralec ima točk',
		opt_autocopyCoords: 'Samodejno kopiraj koordinate',
		opt_autocopyGlobal: 'Zapomni si koordinate s katerekoli strani (ne samo trenutne zavihke Ogame vesolja)',
		opt_fleet2_setTargetDF: 'Nastavi tarčo na ruševine, če flota vsebuje reciklerje',
		opt_fleet2_fixLayout: 'Popravi ozadje informacij o letu (stran 2)',
		opt_fleet2_ShortLinks: 'Bližnjice do tarč (stran 2)',
		opt_fleet2_MoonColor: 'Barve za lune v bližnjicah do tarč',
		opt_fleet2_MoonsToEnd: 'Premakni lune na konec seznama bližnjic do tarč',
		opt_fleet2_expandLists: 'Razširi razširljive okvirje (Hitrost, bližnjice, ACS)',
		opt_fleet2_checkProbeCapacity: 'Preveri kapaciteto sond pred vzletom (stran 2)',
		
		opt_missionPriority: 'Prioriteta misij',
		
		opt_mvmt_expandFleets: 'Pokaži ladje in tovor v floti',
		opt_mvmt_showReversal: 'Pokaži vzratni čas za floto',
		
		opt_missAttack: 'Barva misije: Napad',
		opt_missColony: 'Barva misije: Kolonizacija',
		opt_missDeploy: 'Barva misije: Premik',
		opt_missDestroy: 'Barva misije: Uničenje lune',
		opt_missEspionage: 'Barva misije: Vohunjenje',
		opt_missExpedition: 'Barva misije: Ekspedicija',
		opt_missFederation: 'Barva misije: ACS Napad',
		opt_missHarvest: 'Barva misije: Reciklaža',
		opt_missHold: 'Barva misije: ACS Obramba',
		opt_missTransport: 'Barva misije: Transport surovin',
		opt_msg_addSimButton: 'Dodaj gumbe za objavo vohunskih poročil na WebSim',
		
		lbl_missAttack: 'Napad',
		lbl_missColony: 'Kolonizacija',
		lbl_missDeploy: 'Premik',
		lbl_missDestroy: 'Uničenje lune',
		lbl_missEspionage: 'Vohunjenje',
		lbl_missExpedition: 'Ekspedicija',
		lbl_missFederation: 'ACS napad',
		lbl_missHarvest: 'Reciklaža',
		lbl_missHold: 'ACS obramba',
		lbl_missTransport: 'Transport',

		lbl_sectionGeneral: 'Splošno',
                lbl_sectionUniverse: 'Vesolje',
		lbl_sectionTime: 'Časovne nastavitve',
		lbl_sectionEventList: 'Seznam dogodkov',
		lbl_sectionGalaxy: 'Galaksija',
		lbl_sectionMessages: 'Sporočila',
		lbl_sectionFleetDispatch: 'Pošiljanje flote',
		lbl_sectionFleetMovement: 'Premiki flote',
		
		lbl_optionsNote1: 'Ta možnost v uporabi samo za trenutno vesolje',
		
		lbl_resetCoords: 'Ponastavi - ',
		
		lbl_TotalCapacity: 'Skupna kapaciteta',
		lbl_MinSpeed: 'Najmanjša hitrost',
		lbl_ExPoints: 'Točke ekspedicije',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Surovine',
		lbl_debris: 'Ruševine',
		lbl_total: 'Skupaj',
		lbl_loot: 'Plen',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'Majhne tovorne ladje',
		lbl_shipLCargoAlt: 'Velike tovorne ladje',
		lbl_shipRecyclerAlt: 'Reciklerji',
		lbl_shipSatelliteAlt: 'Sateliti',
		
		lbl_deficientRes: 'Manjkajoče surovine',
		lbl_Production: 'Produkcija',
		lbl_ArrivalACS: 'Prihod (ACS)',
		
		lbl_btnMarkReadAll: 'Označi vsa sporočila kot prebrana',
		lbl_btnDeleteSmallPlunder: 'Izbriši vohunska sporočila s plenom < $plunder in ruševinami < $debris',
		
		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Na vrhu',
		lbl_onBottom: 'Na dnu',
		lbl_onLeft: 'Na levi strani',
		
		lbl_installNewVersion: 'Kliknite tu, da namestite novo različico',
		lbl_Save: 'Shrani',
		lbl_Clear: 'Počisti',
		lbl_Quantity: 'Količina',
		lbl_Duration: 'Trajanje',
		lbl_Consumption: 'Poraba',
		
		lbl_tmTime: 'Čas',
		lbl_tmCountdown: 'Odštevanje'
			
	};
	
	AntiGame_lang.LabelsSK =
	{
		lbl_missAttack: 'Zaútočiť',
		lbl_missColony: 'Kolonizácia',
		lbl_missDeploy: 'Rozmiestnenie',
		lbl_missDestroy: 'Zničenie Mesiaca',
		lbl_missEspionage: 'Špionáž',
		lbl_missExpedition: 'Expedícia',
		lbl_missFederation: 'Aliančný útok',
		lbl_missHarvest: 'Vyťažiť troskové pole',
		lbl_missHold: 'Aliančná obrana',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Malý transportér',
		lbl_shipLCargo: 'Veľký transportér',
		lbl_shipLFighter: 'Ľahký stíhač',
		lbl_shipHFighter: 'Ťažký stíhač',
		lbl_shipCruiser: 'Krížnik',
		lbl_shipBattleship: 'Bojová loď',
		lbl_shipColonizator: 'Kolonizačná loď',
		lbl_shipRecycler: 'Recyklátor',
		lbl_shipSpy: 'Špionážna sonda',
		lbl_shipBomber: 'Bombardér',
		lbl_shipDestroyer: 'Devastátor',
		lbl_shipRIP: 'Hviezda smrti',
		lbl_shipBCruiser: 'Bojový krížnik',
		lbl_shipSatellite: 'Solárny satelit',
		
		lbl_defRLauncher: 'Raketový komplet',
		lbl_defLLaser: 'Ľahký laser',
		lbl_defHLaser: 'Ťažký laser',
		lbl_defGauss: 'Gaussov kanón',
		lbl_defIon: 'Iónový kanón',
		lbl_defPlasma: 'Plazmová veža',
		lbl_defSShield: 'Malý planetárny štít',
		lbl_defLShield: 'Veľký planetárny štít',
		
		lbl_RequiredEnergy: 'Potrebná energia',
		
		rx_sendMail: /Odošli správu (.+)\./
	};
	
	AntiGame_lang.InterfaceSK =
	{
		opt_languageName: 'Slovenčina',
	
		opt_title: 'AntiGame Origin nastavenia',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Storno',
		opt_btnDefault: 'Pôvodné',

		opt_language: 'Jazyk',
		opt_update_check: 'Auto-kontrola aktualizácií',
		opt_thousandSeparator: 'Oddelovač tisícov',
		opt_blockAutoComplete: 'Zablokuj Auto-dokončovanie vo Firefoxe',
		
		opt_showDeficient: 'Ukáž chýbajúce suroviny',
		opt_showResources: 'Ukáž rozšírené info o zdrojoch',
		opt_showNames: 'Ukáž názvy lodí/budov/výskumu cez obrázky',
		opt_nameColorOn: 'Typ farby: dostupné',
		opt_nameColorOff: 'Typ farby: nedostupné',
		opt_nameColorDisabled: 'Typ farby: nedostatok zdrojov',
		opt_showConstructionTitle: 'Zobraz názvy výstavby v zozname planét',
		opt_shortHeader: 'Vždy zmenši obrázky planét',
		opt_misc_scrollTitle: 'Ukáž čas do ďalšej udalosti v názve karty',

		opt_uni_SpeedFactor: 'Faktor rýchlosti tohoto vesmíru',
		opt_uni_DFPercent: 'Percentáž letky do poľa trosiek',
		opt_uni_DefenseToDF: 'Percentáž obrany do poľa trosiek',
		
		opt_timeSetting: 'Zmeň časové hodnoty (iba hodiny)',
		opt_showServerOgameClock: 'Ponechaj serverový čas pre Ogame hodiny vpravo-hore',
		opt_showServerPhalanx: 'Ponechaj serverový čas pre Falangu',
		opt_showPageStartTime: 'Zobraz čas poslednej obnovy stránky',
		opt_timeAMPM: 'Použi 12-hodinový formát (AM/PM) namiesto 24-hodinového',
		
		opt_timeDontChange: 'Nemeniť čas',
		opt_timeLocal: 'Lokálna časová zóna',
		opt_timeServer: 'Serverová časová zóna',

		opt_killTips: 'Zruš informačné okno',

		opt_evt_dimReverse: 'Ztmav vracajúce sa flotily',
		opt_phalanx_showDebris: 'Ukáž teoretické trosky vo Falange',
		opt_evt_expandFleetsEvt: 'Ukáž zloženie flotily a nákladu (List Udalostí)',
		opt_evt_expandFleetsPhal: 'Ukáž zloženie flotily a nákladu (Falanga)',
		
		opt_galaxyShowRank: 'Ukáž pozíciu hráča/aliancie v prehľade Galaxie',
		opt_galaxyRankColor: 'Farba pozície hráča/aliancie',
		opt_galaxyDebrisMin: 'Minimálna veľkosť trosiek k zobrazeniu (0 pre vypnutie)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Farba zvýraznených trosiek',
		opt_galaxyHideMoon: 'Skry obrázok Mesiaca (zobraz namiesto toho veľkosť Mesiaca)',
		opt_galaxy_Players: 'Zvýrazni nasledujúcich hráčov',
		opt_galaxy_PlayerColors: 'Farby pre zvýrazneného hráča',
		opt_galaxy_Allys: 'Zvýrazni nasledujúce aliancie',
		opt_galaxy_AllyColors: 'Farby pre zvýraznenú alianciu',
		opt_galaxy_keepTipsPlanets: 'Ponechaj informačné okná pre planéty a Mesiace',
		opt_galaxy_keepTipsDebris: 'Ponechaj informačné okná pre troskové polia',
		
		opt_msg_PlunderThreshold: 'Najnižší limit pre teoretickú korisť (x1000)',
		opt_msg_DebrisThreshold: 'Najnižší limit pre teoretické trosky (x1000)',
		opt_msg_foldSmallPlunder: 'Skry doplnkový report pre korisť a trosky pod limit',
		opt_msg_showPlunder: 'Ukáž doplnkový report v špionážnych správach',
		opt_msg_addButtons: 'Doplnkové tlačidlá v správach',
		opt_msg_fixColors: 'Uprav farby správ z boja',
		
		opt_fleet_showCapacity: 'Ukáž kapacitu a rýchlosť lodí',
		opt_fleet1_showResCalc: 'Ukáž  resource calculator',
		opt_uni_maxPlayerScore: 'Silnejší hráč má bodov',
		opt_autocopyCoords: 'Auto-kopíruj súradnice',
		opt_autocopyGlobal: 'Pamätaj súradnice z akejkoľvek stránky (nielen pre aktuálne karty Ogame vesmírov)',
		opt_fleet2_setTargetDF: 'Nastav cieľ na trosky ak flotila obsahuje Recyklátor',
		opt_fleet2_fixLayout: 'Uprav rozloženie informácii letu (strana 2)',
		opt_fleet2_ShortLinks: 'Skratky cieľov (strana 2)',
		opt_fleet2_MoonColor: 'Farby pre Mesiace liste skratiek',
		opt_fleet2_MoonsToEnd: 'Presuň Mesiace na koniec listu skratiek',
		opt_fleet2_expandLists: 'Rozšír rozbaľovacie ponuky (Rýchlosť, Skratky, Bojové zoskupenia)',
		opt_fleet2_checkProbeCapacity: 'Over kapacitu sond pred odletom (strana 2)',
		
		opt_missionPriority: 'Automatický výber úlohy',
		
		opt_mvmt_expandFleets: 'Ukáž lode a náklad namiesto ikony flotily',
		opt_mvmt_showReversal: 'Ukáž čas pre odvolanie letu',
		
		opt_missAttack: 'Farba úlohy: Útok',
		opt_missColony: 'Farba úlohy: Kolonizácia',
		opt_missDeploy: 'Farba úlohy: Rozmiestnenie',
		opt_missDestroy: 'Farba úlohy: Zničenie Mesiaca',
		opt_missEspionage: 'Farba úlohy: Špionáž',
		opt_missExpedition: 'Farba úlohy: Expedícia',
		opt_missFederation: 'Farba úlohy: Aliančný útok',
		opt_missHarvest: 'Farba úlohy: Ťažba trosiek',
		opt_missHold: 'Farba úlohy: Aliančná obrana',
		opt_missTransport: 'Farba úlohy: Transport',
		opt_msg_addSimButton: 'Pridaj tlačítko na načítanie reportu vo WebSime',
		
		lbl_missAttack: 'Útok',
		lbl_missColony: 'Kolonizácia',
		lbl_missDeploy: 'Rozmiestnenie',
		lbl_missDestroy: 'Zničenie Mesiaca',
		lbl_missEspionage: 'Špionáž',
		lbl_missExpedition: 'Expedícia',
		lbl_missFederation: 'Aliančný útok',
		lbl_missHarvest: 'Ťažba trosiek',
		lbl_missHold: 'Aliančná obrana',
		lbl_missTransport: 'Transport',

		lbl_sectionGeneral: 'Všeobecné',
		lbl_sectionUniverse: 'Vesmír',
		lbl_sectionTime: 'Časové nastavenia',
		lbl_sectionEventList: 'List udalostí a Falanga',
		lbl_sectionGalaxy: 'Galaxia',
		lbl_sectionMessages: 'Správy',
		lbl_sectionFleetDispatch: 'Flotila',
		lbl_sectionFleetMovement: 'Pohyb flotily',
		
		lbl_optionsNote1: 'Nastavenie platí iba pre tento vesmír',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Celková kapacita',
		lbl_MinSpeed: 'Minimálna rýchlosť',
		lbl_ExPoints: 'Expedičné body',
		lbl_mvmt_Return: 'N',
		
		lbl_resources: 'Zdroje',
		lbl_debris: 'Trosky',
		lbl_total: 'Celkovo',
		lbl_loot: 'Korisť',
		lbl_metal: 'Kov',
		lbl_crystal: 'Kryštáľ',
		
		lbl_shipSCargoAlt: 'MT',
		lbl_shipLCargoAlt: 'VT',
		lbl_shipRecyclerAlt: 'Recy',
		lbl_shipSatelliteAlt: 'Sat',
		
		lbl_deficientRes: 'Chýbajúce zdroje',
		lbl_Production: 'Produkcia',
		lbl_ArrivalACS: 'Prílet (ACS)',
		
		lbl_btnMarkReadAll: 'Označ všetky správy ako prečítané',
		lbl_btnDeleteSmallPlunder: 'Vymaž špionážne správy s korisťou < $plunder and debris < $debris',
		
		lbl_Moon: 'Mesiac',
		
		lbl_onTop: 'Hore',
		lbl_onBottom: 'Dole',
		lbl_onLeft: 'Naľavo',
		
		lbl_installNewVersion: 'Klikni pre nainštalovanie novej verzie',
		lbl_Save: 'Ulož',
		lbl_Clear: 'Zmaž',
		lbl_Quantity: 'Množstvo',
		lbl_Duration: 'Trvanie',
		lbl_Consumption: 'Spotreba',
		
		lbl_tmTime: 'Čas',
		lbl_tmCountdown: 'Odpočítavanie'
	};
	
	AntiGame_lang.LabelsSR =
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
		
		lbl_defRLauncher: 'Rocket Launcher',	// Needs translation
		lbl_defLLaser: 'Light Laser',	// Needs translation
		lbl_defHLaser: 'Heavy Laser',	// Needs translation
		lbl_defGauss: 'Gauss Cannon',	// Needs translation
		lbl_defIon: 'Ion Cannon',	// Needs translation
		lbl_defPlasma: 'Plasma Turret',	// Needs translation
		lbl_defSShield: 'Small Shield Dome',	// Needs translation
		lbl_defLShield: 'Large Shield Dome',	// Needs translation
		
		lbl_RequiredEnergy: 'Потребна енергија',
		
		rx_sendMail: /Пошаљи поруку (.+)\./,
		lbl_ownFleet: 'Флота'
		
	};
	
	AntiGame_lang.InterfaceSR =
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
		opt_shortHeader: 'Always minimize planet image',	// Needs translation
		opt_misc_scrollTitle: 'Scroll time to the next event in the window title',	// Needs translation

		opt_uni_SpeedFactor: 'Фактор брзине универзума',
		opt_uni_DFPercent: 'Percentage of fleet structure to debris',	// Needs translation
		opt_uni_DefenseToDF: 'Percentage of defense to debris',	// Needs translation
		
		opt_timeSetting: 'Промени време (само сате)',
		opt_showServerOgameClock: 'Задржи време сервера са горњег-десног Огаме сата',
		opt_showServerPhalanx: 'Задрзи време сервера за Сензор Фалангу',
		opt_showPageStartTime: 'Display the time the page was last refreshed',	// Needs translation
		opt_timeAMPM: 'Користи 12-часовни формат уместо 24-часовног',
		
		opt_timeDontChange: 'Немој променити време',
		opt_timeLocal: 'Увек намести на локалну часовну зону',
		opt_timeServer: 'Увек намести на часовну зону сервера',

		opt_killTips: 'Непоказуј толтипсе',

		opt_evt_dimReverse: 'Dim returning fleets',	// Needs translation
		opt_phalanx_showDebris: 'Show theoretical debris in Phalanx view',	// Needs translation
		opt_evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',	// Needs translation
		opt_evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',	// Needs translation
		
		opt_galaxyShowRank: 'Прикажи ранг играча/савеза на прегледу галаксије',
		opt_galaxyRankColor: 'Боја ранга играча/савеза',
		opt_galaxyDebrisMin: 'Минимална величина рушевина које да буду означене (0 да се искључи)',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
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
		opt_uni_maxPlayerScore: 'The strongest player has points',	// Needs translation
		opt_autocopyCoords: 'Аутоматски копирај кординате',
		opt_autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',	// Needs translation
		opt_fleet2_setTargetDF: 'Намести мисију на Рушевине, ако флота укључује рециклере',
		opt_fleet2_fixLayout: 'Поправи информације лета (страна 2)',
		opt_fleet2_ShortLinks: 'Пречице ка мети (страна 2)',
		opt_fleet2_MoonColor: 'Color for moons in the shortlink list',	// Needs translation
		opt_fleet2_MoonsToEnd: 'Move moons to the end of the shortlinks list',	// Needs translation
		opt_fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',	// Needs translation
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
		lbl_sectionUniverse: 'Universe',	// Needs translation
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
		lbl_mvmt_Return: 'П',
		
		lbl_resources: 'Reсурси',
		lbl_debris: 'Рушевине',
		lbl_total: 'Укупно',
		lbl_loot: 'Плен',
		lbl_metal: 'Mетал',
		lbl_crystal: 'Кристал',
		
		lbl_shipSCargoAlt: 'М.транс.',
		lbl_shipLCargoAlt: 'В.транс.',
		lbl_shipRecyclerAlt: 'Рециклера',
		lbl_shipSatelliteAlt: 'Sat.',	// Needs translation
		
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
		lbl_Consumption: 'Потрошнја',
		
		lbl_tmTime: 'Time',
		lbl_tmCountdown: 'Countdown'
	};
	
	AntiGame_lang.LabelsTR =
	{
		lbl_missAttack: 'Saldırı',
		lbl_missColony: 'Sömürgeleştirme',
		lbl_missDeploy: 'Konuşlandırma',
		lbl_missDestroy: 'Aya Saldırı',
		lbl_missEspionage: 'Casusluk',
		lbl_missExpedition: 'Keşif',
		lbl_missFederation: 'İttifak Saldırısı',
		lbl_missHarvest: 'Harabeyi Sök',
		lbl_missHold: 'Durmak',
		lbl_missTransport: 'Nakliye',
		
		lbl_shipSCargo: 'Küçük Nakliye Gemisi',
		lbl_shipLCargo: 'Büyük Nakliye Gemisi',
		lbl_shipLFighter: 'Hafif Avcı',
		lbl_shipHFighter: 'Ağır Avcı',
		lbl_shipCruiser: 'Kruvazör',
		lbl_shipBattleship: 'Komuta Gemisi',
		lbl_shipColonizator: 'Koloni Gemisi',
		lbl_shipRecycler: 'Geri Dönüşümcü',
		lbl_shipSpy: 'Casus Sondası',
		lbl_shipBomber: 'Bombardıman Gemisi',
		lbl_shipDestroyer: 'Muhrip',
		lbl_shipRIP: 'Ölüm Yıldızı',
		lbl_shipBCruiser: 'Fırkateyn',
		lbl_shipSatellite: 'Solar Uydu',
		
		lbl_defRLauncher: 'Roketatar',
		lbl_defLLaser: 'Hafif Lazer Topu',
		lbl_defHLaser: 'Ağır Lazer Topu',
		lbl_defGauss: 'Gaus Topu',
		lbl_defIon: 'İyon Topu',
		lbl_defPlasma: 'Plazma Atıcı',
		lbl_defSShield: 'Küçük Kalkan Kubbesi',
		lbl_defLShield: 'Büyük Kalkan Kubbesi',
		
		lbl_RequiredEnergy: 'Enerji Gerekli',
		
		rx_sendMail: /Send a message to (.+)\./
	};
	
	AntiGame_lang.InterfaceTR =
	{
		opt_languageName: 'Türkçe',
	
		opt_title: 'AntiGame Seçenekleri',
		opt_btnOk: 'Tamam',
		opt_btnCancel: 'İptal',
		opt_btnDefault: 'Varsayılan',

		opt_language: 'Dil',
		opt_update_check: 'Güncelleştirmeleri Otomatik Yükle',
		opt_thousandSeparator: 'Binleri ayır',
		opt_blockAutoComplete: 'Blokları Firefoxda Otomatik Tamamla',
		
		opt_showDeficient: 'Gerekli Kaynağı Göster',
		opt_showResources: 'Genişletilmiş Kaynak Bilgilerini Göster',
		opt_showNames: 'Gemi/Bina/Araştırma Adını Resmin Altında Göster',
		opt_nameColorOn: 'İsim Rengi: Mevcut',
		opt_nameColorOff: 'İsim Rengi: Mevcut Değil',
		opt_nameColorDisabled: 'İsim Rengi: Gerekli Kaynak Yok',
		opt_showConstructionTitle: 'İnşa Adını Gezegen Listesinde Göster',
		opt_shortHeader: 'Her zaman gezegen resmini küçült',
		opt_misc_scrollTitle: 'Sonraki filo haraketini pencere başlığında kayarak göster',

		opt_uni_SpeedFactor: 'Bu Evren için Hız Faktörü',
		opt_uni_DFPercent: 'Filodan çıkan harabe oranı',
		opt_uni_DefenseToDF: 'Savunmadan çıkan harabe oranı',
		
		opt_timeSetting: 'Zaman Değerini Değiştir ( Sadece Saat )',
		opt_showServerOgameClock: 'Server Saatini Ogame Saatinde Tut',
		opt_showServerPhalanx: 'Server Saatini Phalanx Görünümünde tut',
		opt_showPageStartTime: 'Sayfanın son yenilenme süresini göster',
		opt_timeAMPM: '24 Saat Yerine 12 ( PM/AM ) Sistemini Kullan',
		
		opt_timeDontChange: 'Saati Değiştirme',
		opt_timeLocal: 'Her Zaman Yerel Saati Kullan',
		opt_timeServer: 'Her Zaman Server Saatini Kullan',

		opt_killTips: 'İpuçlarını kaldır',

		opt_evt_dimReverse: 'Filolar dönerken renklerini soluklaştır',
		opt_phalanx_showDebris: 'Show theoretical debris in Phalanx view',	// Needs translation
		opt_evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',	// Needs translation
		opt_evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',	// Needs translation
		
		opt_galaxyShowRank: 'Galaksi Görünümünde Üye ve İttifak Derecelerini Göster',
		opt_galaxyRankColor: 'Üye ve İttifak Derecelerini Renklendir',
		opt_galaxyDebrisMin: 'Vurgulanacak Minimum Enkaz Boyutu ( Kapatmak İçin 0 )',
		opt_galaxyDebrisMul: 'Standard (SI) multiples for debris',
		opt_galaxyDebrisColor: 'Vurgulanan Enkazın Rengi: ',
		opt_galaxyHideMoon: 'Ay Resmini Kaldır ( Resim Yerine Ay Büyüklüğü )',
		opt_galaxy_Players: 'Belirtilen Oyuncuları Vurgula',
		opt_galaxy_PlayerColors: 'Vurgulanacak Oyuncuların Rengi',
		opt_galaxy_Allys: 'Belirtilen İttifakları Vurgula',
		opt_galaxy_AllyColors: 'Vurgulanacak İttifakların Rengi',
		opt_galaxy_keepTipsPlanets: 'İpuçlarını Gezegen ve Ayda Göster',
		opt_galaxy_keepTipsDebris: 'İpuçlarını Harabelerde Göster',
		
		opt_msg_PlunderThreshold: 'Teorik Olarak En Düşük Yağma ( x1000 )',
		opt_msg_DebrisThreshold: 'Teorik Olarak En Düşük Harabe ( x1000 )',
		opt_msg_foldSmallPlunder: 'Limitin Altındaki Yağma ve Harabeleri Katla',
		opt_msg_showPlunder: 'Casus Raporlarında Yağmaları Göster',
		opt_msg_addButtons: 'Mesajlara Ek Düğmeler Ekle',
		opt_msg_fixColors: 'Savaş Raporlarının Renklerini Tasarla',
		
		opt_fleet_showCapacity: 'Gemilerin Hız ve Kapasitelerini Göster',
		opt_fleet1_showResCalc: 'Kaynak Hesaplayıcısını Göster',
		opt_uni_maxPlayerScore: 'En güçlü oyuncu puana sahip',
		opt_autocopyCoords: 'Koordinatı Otomatik Kopyala',
		opt_autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',	// Needs translation
		opt_fleet2_setTargetDF: 'Filo Geridönüşümcü İçeriyorsa Hedefi DF ye Ayarla',
		opt_fleet2_fixLayout: 'Uçuş Bilgi Düzenini Tasarla ( Sayfa 2 )',
		opt_fleet2_ShortLinks: 'Hedef Kısayollar ( Sayfa 2 )',
		opt_fleet2_MoonColor: 'Color for moons in the shortlink list',	// Needs translation
		opt_fleet2_MoonsToEnd: 'Move moons to the end of the shortlinks list',	// Needs translation
		opt_fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',	// Needs translation
		opt_fleet2_checkProbeCapacity: 'Ayrılmadan Önce Kapasiteyi Sorgula ( Sayfa 2 )',
		
		opt_missionPriority: 'Görev Önceliği',
		
		opt_mvmt_expandFleets: 'Filolarda Gemi ve Kargolarını Göster',
		opt_mvmt_showReversal: 'Filolarda Kalan Zamanı Göster',

                opt_missAttack: 'Görev Rengi: Saldırı',
		opt_missColony: 'Görev Rengi: Kolonileştir',
		opt_missDeploy: 'Görev Rengi: Konuşlandır',
		opt_missDestroy: 'Görev Rengi: Ay Saldırısı',
		opt_missEspionage: 'Görev Rengi: Casusluk',
		opt_missExpedition: 'Görev Rengi: Keşif',
		opt_missFederation: 'Görev Rengi: İttifak Saldırısı',
		opt_missHarvest: 'Görev Rengi: Harabeyi Sök',
		opt_missHold: 'Görev Rengi: Durmak',
		opt_missTransport: 'Görev Rengi: Nakliye',
		opt_msg_addSimButton: 'Casus Raporlarına WebSim Tuşu Ekle',
		
		lbl_missAttack: 'Saldırı',
		lbl_missColony: 'Kolonileştir',
		lbl_missDeploy: 'Konuşlandır',
		lbl_missDestroy: 'Ay Saldırısı',
		lbl_missEspionage: 'Casusluk',
		lbl_missExpedition: 'Keşif',
		lbl_missFederation: 'İttifak Saldırısı',
		lbl_missHarvest: 'Harabeyi Sök',
		lbl_missHold: 'Durmak',
		lbl_missTransport: 'Nakliye',

		lbl_sectionGeneral: 'Genel',
		lbl_sectionUniverse: 'Evren',
		lbl_sectionTime: 'Zaman Ayarları',
		lbl_sectionEventList: 'Olay Listesi',
		lbl_sectionGalaxy: 'Galaksi',
		lbl_sectionMessages: 'Mesajlar',
		lbl_sectionFleetDispatch: 'Filo Gönderme',
		lbl_sectionFleetMovement: 'Filo Hareketleri',
		
		lbl_optionsNote1: 'Ayarlar Bu Evren İçin Geçerlidir',
		
		lbl_resetCoords: 'Sıfırlamak - ',
		
		lbl_TotalCapacity: 'Toplam Kapasite',
		lbl_MinSpeed: 'Minimum Hız',
		lbl_ExPoints: 'Karşılık Gelen Puan',
		lbl_mvmt_Return: 'G',
		
		lbl_resources: 'Kaynaklar',
		lbl_debris: 'Harabeler',
		lbl_total: 'Toplam',
		lbl_loot: 'Yağma',
		lbl_metal: 'Metal',
		lbl_crystal: 'Kristal',
		
		lbl_shipSCargoAlt: 'KK',
		lbl_shipLCargoAlt: 'BK',
		lbl_shipRecyclerAlt: 'GD',
		lbl_shipSatelliteAlt: 'Sat.',	// Needs translation
		
		lbl_deficientRes: 'Gereken Kaynak',
		lbl_Production: 'Üretim',
		lbl_ArrivalACS: 'Varış ( İttifak )',
		
		lbl_btnMarkReadAll: 'Görünen Bütün Mesajları Okunmuş Say',
		lbl_btnDeleteSmallPlunder: ' < $plunder Yağma ve < $debris Harabeden Düşük Raporları Sil ',
		
		lbl_Moon: 'Ay',
		
		lbl_onTop: 'Üste',
		lbl_onBottom: 'Altta',
		lbl_onLeft: 'Solda',
		
		lbl_installNewVersion: 'Yeni Versiyon Yükle',
		lbl_Save: 'Kaydet',
		lbl_Clear: 'Sil',
		lbl_Quantity: 'Miktar',
		lbl_Duration: 'Süre',
		lbl_Consumption: 'Tüketim',
		
		lbl_tmTime: 'Time',
		lbl_tmCountdown: 'Countdown'
	};
	
	// -------------------------------
	// Don't modify the code below

	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (!mywindow.AntiGame_lang)
		mywindow.AntiGame_lang = AntiGame_lang;
	else
		for (var i in AntiGame_lang)
			mywindow.AntiGame_lang[i] = AntiGame_lang[i];

}) ();
