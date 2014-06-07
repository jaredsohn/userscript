// ==UserScript==
// @name           اسکريپت کمکي تراوين
// @author         peyman zibaii پيمان زيبايي
// @copyright      © peyman zibaii پيمان زيبايي ( Orginally by © Serj_LV).
// @version        3.0.0
// @namespace      http://userscripts.org/scripts/show/102568
// @source         http://userscripts.org/scripts/show/102568
// @identifier     http://userscripts.org/scripts/show/102568.user.js
// @icon           http://img.tebyan.net/big/1389/03/811861481661421341336192401256096168255242.jpg
// @description    Resource bar, quick action to your villages, notes, links, save needed resource, Works on Firefox, Chromium(chrome), Opera.
// @lastchanges    Fixing reports and messages positions, Updated Smithy cost from level 1 to 20.
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include     http://*.travian.*
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
// ==/UserScript==

(function () {
var RunTime = [ new Date().getTime() ];
function allInOneOpera () {
// Start by Qusai Abu Hilal
var version = ' 5.1.1 ';// 2011/ 06/ 11
var sprt = "\t| ";
var l = "\n";

var LC; // Local language

var cranycap ; // The Cranny capacity !
var cranyprsntag ; // to save sapce left to fill var prsntag% of Cranny !
var warehouse_prsntag ; // to save sapce left to fill var warehouse_prsntag% of store !

var raceid ;
var racenm ;
var capitalname ;
var capitalcoords ;

var spLnk = '';    //link to the profile
var bksLnk = 'build.php?gid=19';    //link to the barracks
// End by Qusai Abu Hilal

notRunYet = false;
var namespace = 'http://userscripts.org/scripts/show/102568';
var audiofile = 'http://simplythebest.net/sounds/MP3/MP3_files/event_MP3_files/touch_tone.mp3';
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
var triFL = true;
var raceFL = true;
var timerRB = [];
var timerP = [];
var lastTimerP = [0,0];
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
var langs = ['انتخاب اتوماتيک زبان بازي \\ Automatic (au)',' خير الألسنة: لسان الضاد (العربية) (ar)', 'English (en)', '????????? (bg)','Bosanski (bs)','Deutsch (de)','فارسي (fa)','Français (fr)','Hrvatski (hr)','Magyar (hu)','Italiano (it)','Polski (pl)','Português (pt)','Român? (ro)','??????? (ru)','?????? (sr)','Svenska (sv)','?????????? (ua)'];
var allCookies = ['vPPH','mf','next','Dorf1','Dorf2','Dorf11','Dorf12','Dorf13','RBSetup',
				  'xy','VV','OV','Mem','Dict','DictFL','DictTR','ln','ln2','src','vHint',
				  'tropsI','tropsDic','vList','Att','trFL','AC','AS','bodyH'];
var crtPath = window.location.href;
var lMap = '';
var crtName = crtPath.match(/^.*\/\/(.+?)\//)[1];
var fullName = crtPath.match(/^.*\/\/.+\/+?/)[0];

var srv = document.title.substring(8);
var speedAK = [0,0.5,1,2];
var bgcolor = ['#66ff66','yellow','red'];
var vHColor = '#777777';
var windowID = []; // 0-Setup, 1-Overview, 2-distanceTips, 3-notes, 4-Reports, 5-links, 6-editLink, 7-editAnalyzers
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
	'side_info', // 2- include profile.
	'content', // 1- main block in center
	'side_info', // 2- right side. include village list, links, quest.
	'mid', // 3- central block. include left menu, main content and right menu
	'llist', // 4- links from plus
	'vlist', // 5- villages list
	'betaBox', // 6- server time
	];
var ver4FL = $g(pageElem3[0]) ? false: true;
var pageElem = ver4FL ? pageElem4.slice() : pageElem3.slice();

var docDir = ['left','right'];
var ltr = true;
if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction') == 'rtl') 
{ 
	docDir = ['right','left']; 
	ltr = false;
}

var sK = 1;
var sM = 1;
if( /speed|x3/i.test(crtPath) ) { sM = 3; sK = 2; }
// if( /x2/i.test(crtPath)    ) sM = 2;
if( /x2|t1/i.test(crtPath) ) sM = 2;
if( /x5/i.test(crtPath) ) { sM = 5; sK = 2; }

var RB = new Object();
	RB.village_dorf1 = [0];
	RB.village_dorf11 = [0];
	RB.village_dorf12 = [0];
	RB.village_dorf13 = [0];
	RB.village_Dorf2 = [0,0,0,0,0];
	RB.village_Var = [0,0];
	RB.village_PPH = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	RB.overview = [-1,'0'];
	RB.wantsMem = [0,0,0,0,0];
	// Added by Qsuai Abu Hilal
	RB.wantdMem = [0,0,0,0,0];// Added to save cranny capacity
	// Ended by Qusai Abu Hilal
//	1		2				3				4			5	6				7			8		9			10		11		12	 13, 14	15		16				17				18
	RB.dictionary = [0,'Ally','Merchants','Tournament Square','Duration','resource balance','Rally point','Marketplace','Barracks','Stable','Workshop','Buy','Attacks',0,'at ','Map','Reinforcement','Attack: Normal','Attack: Raid'];
	RB.dictFL = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	RB.dictTR = ['none',
		'Legionnaire','Praetorian','Imperian','Equites Legati','Equites Imperatoris','Equites Caesaris','Battering Ram','Fire Catapult','Senator','Settler',
		'Clubswinger','Spearman','Axeman','Scout','Paladin','Teutonic Knight','Ram','Catapult','Chief','Settler',
		'Phalanx','Swordsman','Pathfinder','Theutates Thunder','Druidrider','Haeduan','Ram','Trebuchet','Chieftain','Settler'];
	RB.market_fi = [0,0,0,0,0,0,0,0,0,0,0,0];
	RB.tropsI = new Array(300);
	RB.trFL = new Array(31);
	// Qusai Abu Hilal
	if( ltr )
	{ //initial position of symbols
		RB.XY = [// X(Left) then Y(Top)
			300, 245, // 0-Setup           // 5 changing the setting
			1, 23, // 1-Resource bar       // 1 Always appearing 1 from left top
			335, 110, // 2-Overview        // 9 from left top
			1, 210, // 3-Links             // 3 from left top
			690, 110, // 4-Report&Messages // A from left top
			1110, 23, // 5-Notes           // 6 from left top good for at most 7 village 
			900, 25, // 6-Alerts           // B from left top
			945, 265, // 7-vlist           // 4 from left top villages list
			1, 135, // 8-BIGicons          // 2 from left top
			335, 153, // 9-LinkEdit        // 7 from left top
			915, 23, // 10-attackInfo       // 8 from left top
			955, 99, // 11-vlist           // The new setup place for t3.5
			1025, 99 // 12-vlist           // The new setup place for t3.5
			];
	}
	else // right to left
	{
		RB.XY = [// X(Left) then Y(Top)
			335, 250,  // 0-Setup           // 5 changing the setting
			930, 23,   // 1-Resource bar     // 1 Always appearing 1 from right top
			340, 110,  // 2-Overview        // 9 from left top
			990, 210,  // 3-Links           // 3 from left top
			5, 110,    // 4-Report&Messages   // A from left top
			1, 23,  // 5-Notes             // 6 from left top
			5, 25,     // 6-Alerts             // B from left top
			1, 265,    // 7-vlist           // 4 from left top villages list
			1125, 135, // 8-BIGicons       // 2 from left top
			340, 153,  // 9-LinkEdit        // 7 from left top
			5, 23,     // 10-attackInfo         // 8 from left top
			955,  99,   // 11-vlist           // The new setup place for t3.5
			1025, 99    // 12-vlist           // The new setup place for t3.5
			];
	}
	RB.vHint = [];
	RB.vList = [];
	RB.attackList = [RunTime[0]];
	RB.bodyH = [0,0]; // 0-resourcebar,1-vlist

DICT = {
	ar: { // Arabic, Qusai Abu Hilal قصي أبو هلال
		// starting from 2011\ 04\ 14
		// Now is	 2011\ 05\ 10
		// Now is	 2011\ 06\ 18
		aclock : "هشدار \n س:د:ثا , س:د , د (من الآن)",
		accinfo: "پخش اطلاعات",
		addcur : "اضافه کردن به ليست از لينک هاي صفحه",
		addnew : "اضافه کردن يک صفحه جديد به فهرست لينک ها",
		addvtable : "أظهر جدول القرى (الإضافي)",
		addvtableh : " للإصدار الرابع 4 من ترافيان",
		adetect : "تأكد من وجود هجمة",
		adetecth : "أرسل الطلبات المخفية للمخدم \n تحذير ! \n هذا منافٍ لقوانين اللعبة",
		adetecto : ['معطّل','بدون تجميد','مفعّل'],
		adetectt : "الفاصل الزمني بين الكشف عن الهجمات",
		alert : "التنبية عن طريق المتصفح",
		analyzer : "محلل العالم",
		archive : "الأرشيف",
		arena : "ساحة البطولة",
		attak : "لا يوجد هجوم",
		audiotest : "اختبر الصوت",
		audiourl : "رابط الملف الصوتي",
		auto : "تلقائي ",
		banalyze : "محلل المعركة الداخلي",
		bidinc : "كمية الزيادة في المزاد",
		bidinch : "خاص بمزايدات الإصدار الرابع 4",
		bigicon : "أظهر الرموز الكبيرة",
		buildand : "أظهر العد التنازلي للأبنية والهجمات",
		buildandh : "في قائمة القرى",
		builtin : "الأدوات المضمنة",
		builtinh : "لجعل الإنتاج طبيعي: الأحمر - المورد الذي تحتاجه كثيراً, الأخضر - المورد الأقل احتياجاً إليه",
		cap : "العاصمة",
		capcords : "إحداثيات العاصمة",
		cancel : "إلغاء الأمر",
		cc :"استهلاك القمح لهذا المبنى ",
		close : "إغلاق",
		consnegat : "استهلاك القرية تحت الصفر. كم دقيقة تحتاج للحجز ؟",
		cranny   : "مستوى التنبيه للمخبأ (مئوياً)",
		crannyh  : "الطبيعي 80, 70 للإصدار 3.6 أو النهب مع البطل",
		cropfind : "الباحث عن الحقول القمحية المدمج",
		cor : "تم تصحيح القيم",
		cp :"نقاط الحضارة لهذا المبنى",
		curhi : "عدد الأسطر الحالي لدفتر الملاحظات",
		curwi : "عرض دفتر الملاحظات",
		defRP : "الأمر الإفتراضي في نقطة التجمع",
		defRPo :  ['تعزيز','هجوم: كامل','هجوم: للنهب'],
		deficit : " مجهول هنا !",
		del : "حذف جميع المعلومات المخزنة عن هذا الحساب",
		ding : "انتباه !",
		dontwrap : "لا تلف الصفحة العريضة",
		dontwraph : "اذا كانت قائمة القرى في الأسفل",
		duration : "المدة",
		eaudio : "صوت مضمن عن طريق الرابط الذي تضعه أنت في رابط الملف الصوتي",
		edit : "عدّل",
		err : "حدث خطأ ما يرجى التبليغ عنه في صفحة البريمج",
		faudio : "صوت مع صورة Flash",
		findcrop : " ابحث عن الحقول:",
		frm : "من القيم",
		gocran: "اضغط على رمز المخبأ حتى تذهب للمخبأ الموجود في قريتك هذه !.\nثمّ اضغط هنا مرّة ثانية.\n",		
		haudio : "صوت من لغة تصميم المواقع HTML",
		hunger : "جائع",
		incomres : "إظهار المعلومات عن الموارد القادمة",
		incomreso : ['معطّل','مفعّل','مع المعلومات','وضع معجزة العالم'],
		info : "المعلومات",
		linkdel : "هل تريد بالتأكيد حذف الرابط",
		linkname : "اسم الرابط",
		links : "الروابط",
		marketpl : "السوق",
		method : "الطريقة",
		mfilter : "الفرز أو التصفية",
		mfiltero : ['معطّل','عرض العناوين','عرض الفرز أو التصفية','الكل'],
		name2 : "الأسم التالي",
		none : "غير متاحة",
		noplace : "لا يوجد أي مكان !",
		noraly : "لم تبنِ نقطة تجمع بعد !",
		normal : "طبيعي",
		normalize : "الحالة الطبيعية للإنتاج",
		notes : "دفتر الملاحظات",
		notew : "عرض دفتر الملاحظات",
		noteh : "عدد أسطر دفتر الملاحظات",
		N_W   : "عرض",
		N_H   : "طول",
		notifi : "التنبيه",
		notification : "التنبيه بعد البناء",
		npcsum : "خلاصة للتبادل التجاري",
		npcsumh : "في السوق والأبنية",
		ok : "موافق",
		onallp : "كل الصفحات",
		opennote : "فتح دفتر الملاحظات تلقائياً",
		overview : "اضغط هنا حتى ترى نظرة عامة على قرارك كلها بما فيها المخزن وكمية الموارد وعدد الجنود",
		paranoid : "النمط المرتب",
		paranoidh : "إخفاء العمل إذا كشف عن التغييرات في تحميلها من مخطوطات خادم ترافيان.",
		prprh : "مج\\سا",
		promthi : "أدخل عدد الأسطر الجديد (طول دفتر الملاحظات) 3 فما فوق",
		promtwi : "أدخل عرض دفتر الملاحظات الجديد 5 فما فوق",
		racelist : ['الرومان','الجرمان','الإغريق'],
		redbl : "الأحمر (في الساعات)",
		refresh : "تحديث معلومات القرى",
		ressav : "كمية الموارد اللازمة حتى تصبح المخازن ممتلئة بمعدل مئوي تحدده أنت",
		resbar : "شريط الموارد",
		ResourceBar : "شريط الموارد - اضغط هنا - لترى نظرة عامة",
		resources : "الموارد",
		rpandmp : "نقطة التجمع و السوق",
		saved : "تم حفظ ملاحظاتك حتى تراها دائماً.",
		savedd : "البيانات المحفوظة",
		saveddh : "أضف الروابط والاسم الثاني. إذا حذف الحساب أو أنه ليس حاسوبك.",
		savedelall : "احذف جميع البيانات المحفوظة",
		savedelallh : "هل أنت متأكد أنك تريد أن تحذف جميع البيانات بما فيها الأسماء الإضافية والروابط ؟",
		savedls : "روابط للقرى فقط (لا تستطيع تعديل رابط الصفحة)",
		savedgls : "روابط إلى أي صفحة، (تستطيع تعديل رابط الصفحة)",
		savedm : "تم حفظ الموارد في الذاكرة حتى تستطيع نقلها من قرية ثانية إلى هنا ! ",
		savedp : "من الموارد تم حفظها في الذاكرة حتى تستطيع نقلها من قرية ثانية إلى هنا ! ",
		savedpq : "إلى أي نسبة تريد أن يمتلئ المخزن ومخزن الحبوب ؟ \n (سيتم حفظ الموارد في الذاكرة حتى تنقلها إلى هنا من إحدى قراك )",
		scrlang : "لغة هذا المخطوط البرمجي",
		searching: "استثمر وقتك بشيء مفيد ! <br/>ريثما أُنهي البحث عن الحقول القمحية...",
		sendmess : "أظهر &laquo; رمز إرسال رسالة بجانب اسم اللاعب",
		sendres  : "أظهر &laquo; رمز إرسال الموارد والقوات",
		settings : "الإعدادات",
		single : "لديك قرية واحدة فقط لا غير !",
		showls : "أظهر الروابط",
		showlso : ['معطّل','مفعّل','في نافذة'],
		showres : "عرض شريط الموارد في نافذة",
		speedart : "سرعة المخدّم",
		svers : "الإصدار",
		testing : "اضغط لتختبر طريقة التنبيه",
		to : "إلى القيم ",
		total : "المجموع ",
		troops : "القوات",
		troopsI : "إظهار المعلومات عن القوات",
		troopsIo : ['معطّل','مفعّل','ابحث في المساعدة'],
		uattak :"عليك هجوم!",


		warehouse : "المخزن",
		yellowbl: "الأصفر (في الساعات)",
		youlang : "لغة اللعبة",
		yourrace : "القبيلة"
	},
	en: {
		// ingame messages
		ok : "Ok",
		cancel : "Cancel",
		close : "Close dialoge",
		overview : "Click here to see overview (Warehouse | Resources | Troops).",
		svers : "script version",
		settings : "settings",
		notes : "notes",
		refresh : "refresh",
		warehouse : "Warehouse",
		resources : "Resources",
		troops : "Current troops in the villages",
		links : "Links",
		linkname : "link name",
		linkdel : "delete link",
		name2 : "second name",
		archive : "Archive",
		arena : "Tournament Square",
		del : "delete all data",
		edit : "edit",
		total : "Total",
		noplace : "There is no place!",
		hunger : "hunger",
		duration : "duration",
		deficit : "deficit",
		aclock : "Alarm clock\nhh:mm:ss , hh:mm , mm (from now)",
		consnegat : "Consumption in destination village is negative.\nHow many minutes you need to reserve for that village ? \nIf you put zero (0) this mean you are going to send an amount that save troops for travel time !.",
		// settings
		none : "None",
		auto : "auto",
		info : "Information",
		yourrace : "Your race",
		speedart : "Speed artefact",
		racelist : ['Romans','Teutons','Gauls'],
		cranny : "Green level of cranny (percent %)",
		crannyh : "normal 80, 70 for classic or artefact plunder (and up to 100% will be red).",
		builtin : "Built-in tools",
		builtinh : "for normalize of production: red color - most need resources, green - less need resources",
		normalize : "normalize of production",
		normal : "normal",
		banalyze : "built-in analyzer of Battle",
		cropfind : "built-in crop finder",
		adetect : "detect attack",
		adetecto : ['off','w/o freeze','on'],
		adetecth : "makes the hidden requests to the server, violating the rules. may result in punishment.",
		adetectt : "period of detect attack",
		onallp : "All pages",
		dontwrap : "Don't wrap pages",
		dontwraph : 'If the list of villages jumps down',
		buildand : "Show building countdown and attack",
		buildandh : 'In the list of villages',
		sendres : "Show &laquo;send resource/troops&raquo; icons",
		sendmess : "Show &laquo;send message&raquo; icons",
		analyzer : "World analyzer",
		bigicon : "Show BIG icons",
		addvtable : "Show additional village table",
		addvtableh : 'for travian4',
		paranoid : "Paranoid mode",
		paranoidh : 'Hide job if detected changes in downloadable from the server Travian scripts.',
		opennote : "Automatically open notes",
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
		rpandmp : "Rally point and Market place",
		incomres : "incoming resource info",
		incomreso : ['off','on','with summary','WW mode'],
		troopsI : "Information about the troops",
		troopsIo : ['off','on','scan help'],
		/// 'Reinforcement','Attack: Normal','Attack: Raid'
		defRP : "default action for rally point",
		defRPo :  ['Reinforcement','Attack: Normal','Attack: Raid'],
		showls : "Show links",
		showlso : ['off','on','in window'],
		savedls : "Automated links to villages: ",
		savedd : "Saved data",
		saveddh : 'Including Links and Second name. If an Account deleted, or not your computer.',
		savedelall : "delete all saved data",
		savedelallh : 'You sure you want to delete all data, including the links and the second name?',
		scrlang : "Script language",
		youlang : "Game's language ",
		notifi : "notification",
		notification : "notification after construction",
		method : "method of alerting",
		audiourl : "URL of audio file",
		audiotest : "Test audio",
		// by Qusai Abu Hilal
		testing : "Press This button to test the alert method you choosed.",
		alert : "Browser alert.",
		attak : "No attack",
		ResourceBar : "Resource Bar (click for overview)",
		prprh : "&#931;/h",		
		savedgls : "General links to any page you want: ",
		saved : "Your notes have been saved.",
		savedm : "The needed resource(s) have been saved.",
		savedp : "of resource(s) have been saved.",
		haudio : "HTML Audio",
		eaudio : "EMBED Audio",
		faudio : "Flash Audio",
		noteh : "Notes hight (rows)",
		notew : "Notes width (colomns) ",
		N_H   : "H",
		N_W   : "W",
		addcur : "add current page to the list",
		addnew : "add new page to the list",
		savedpq : "How much percentage (%) you want to save ?",
		// cranny percentage question
		savecpq : "How much percentage (%) of your cranny you want to save ?",
		ressav : " of your current village's resources to fill Warehouse and Granary. (click here to save the amount).",
		// center numbers
		cp :"Culture points",
		cc :"Crop consumption",
		
		// automated capital and race
		cap : "Name of your capital",
		capcords : "Coordinates of your capital",
		accinfo: "Account information",
		cor : "Corrected",
		frm : "From the values",
		to  : "To the values",
		err : "An error has occured.Please report it in script's webpage",
		curwi : "Current Notes width (colomns) ",
		curhi : "Current Notes hight (rows) ",
		promthi : "Enter the notes new Hight at least 3 rows:",
		promtwi : "Enter the notes new Width at least 5 colomns:",
		ding : "Ding ding !!!",
		gocran: "Click on Cranny icon to go to Cranny.\n After that you need to click here again.\n",
		noraly : "You did not build  rally point yet !.",
		single : "You have only one village ! \nSo you already had gotten overview !.",
		findcrop : "Find croppers:",
		searching: "I am searching for cropper(s). <br/>Please wait ...",
		
		// this is last one so it does not need comma after it !!!.
		uattak :"Under attack!"
	},
	ru: {
		// ????????? ? ????
		cancel : "??????",
		close : "???????",
		overview : "?????",
		svers : "?????? ???????",
		settings : "?????????",
		notes : "???????",
		ressav : "? % ?????????? ??????",
		refresh : "????????",
		warehouse : "??????",
		resources : "??????",
		troops : "??????",
		links : "??????",
		linkname : "???????? ??????",
		linkdel : "??????? ??????",
		name2 : "?????? ???",
		archive : "?????",
		arena : "?????",
		addcur : "???????? ??? ???????",
		del : "???????",
		edit : "????????",
		total : "?????",
		noplace : "??? ?????!",
		hunger : "??????????? ??????",
		duration : "?????????????????",
		deficit : "???????",
		consnegat : "??????????? ? ???? ??????? ?????????????. ?? ??????? ????? ????? ??????",
		// ?????????
		none : '???',
		auto : "????.",
		info : "????? ??????????",
		yourrace : "??? ?????",
		speedart : "???????? ????????",
		racelist : ['???????','????????','?????'],
		cranny : "?????? ??????? ????????? ??????? (????????)",
		crannyh : '????? - 80, 70 ??? ????????????? ??????? ??? ??? ????????? ?????????',
		builtin : "?????????? ???????????",
		builtinh : '??? ??????????? ????????????: ??????? ???? - ????? ??????????? ??????, ??????? - ?????? ????????????',
		normalize : '?????????? ????????????',
		normal : "???????",
		banalyze : "?????????? ?????????? ???",
		cropfind : "?????????? ????? ??????? ??????",
		adetect : "??????????? ?????????",
		adetecto : ['????.','??? ?????????','????????'],
		adetecth : "?????? ??????? ????????? ? ???????, ??????? ???????. ????? ??????? ?????????.",
		adetectt : "?????? ???????????",
		onallp : "?? ???? ??????????",
		dontwrap : "?? ?????? ??????????? ?????????",
		dontwraph : '???? ?????? ???????? ??????? ???? ??? ??????????????',
		buildand : "?????????? ?????? ???????? ? ?????",
		buildandh : '???????????? ??? ?????? ? ?????? ????????',
		sendres : "?????????? ?????? &laquo;???????? ???????/??????&raquo;",
		sendmess : "?????????? ?????? &laquo;???????? ?????????&raquo;",
		analyzer : "?????????? ????",
		bigicon : "?????????? ??????? ??????",
		addvtable : "?????????? ?????????????? ??????? ????????",
		addvtableh : '??? ??????? ?????? 4',
		paranoid : "?????????????? ?????",
		paranoidh : '???????? ??????, ???? ? ??????? ??????? ????????? ????? ???????.',
		opennote : "????????????? ????????? ???????",
		resbar : "??????? ????????",
		showres : "?????????? ??????? ???????? ? ????",
		redbl : "??????? (in hours)",
		yellowbl: "?????? (in hours)",
		marketpl : "?????",
		mfilter : "?????? ???????????",
		mfiltero : ['???','?????? ???????','?????? ??????','??????'],
		npcsum : "????? ???????? ??? NPC",
		npcsumh : '?? ????? ? ????????',
		bidinc : "??? ??????",
		bidinch : '??? ????????? ??????? ?????? 4',
		rpandmp : "????? ????? ? ?????",

		incomres : "?????????? ? ??????????? ????????",
		incomreso : ['???','????','? ???????','???? ?????'],
		troopsI : "?????????? ? ???????",
		troopsIo : ['???','??','?????????? ???????'],
		defRP : "???????? ?? ????????? ??? ?????? ?????",
		showls : "?????????? ??????",
		showlso : ['???','??','? ????'],
		savedls : "??????????? ??????",
		savedd : "??????????? ??????",
		saveddh : '??????? ?????? ? ?????? ??? ????????. ???? ??????? ?????? ????????? ??? ??? ?? ??? ?????????.',
		savedelall : "??????? ??? ??????",
		savedelallh : '?? ???????, ??? ?????? ??????? ??? ??????, ??????? ?????? ? ?????? ??? ?????????',
		scrlang : "???? ???????",
		youlang : "??? ????",
		notifi : "???????????",
		notification : "?????????? ????? ?????????????",
		method : "?????",
		audiourl : "URL ????????? ?????",
		// center numbers
		cp       :"??????? ????????",
		cc       :"??????????? ?????",
		
		audiotest : "????????? ????"
	},
	ua: { fb : "ru",
		archive : "?????",
		racelist : ['???????','????????','?????']
	},
	hu: { // Hungarian language. thx mrzed :)
		// ingame messages
		cancel : "Mégse",
		close : "Bez?r",
		overview : "?ttekintés",
		svers : "szkript verz?",
		settings : "be?ll?t?sok",
		notes : "jegyzetek",
		ressav : "nyersanyagokat %-ig felt?lteni",
		refresh : "friss?t",
		warehouse : "Rakt?répület",
		resources : "Nyersanyagok",
		troops : "Csapatok",
		links : "Linkek",
		linkname : "link név",
		linkdel : "link t?rlése",
		name2 : "m?sodik név",
		archive : "Arch?vum",
		arena : "Gyakorl?tér",
		total : "?sszesen",
		// settings
		none : "Nincs",
		info : "Inform?ci?k",
		yourrace : "Nép",
		speedart : "Sebesség ereklye",
		racelist : ['R?mai','Germ?n','Gall'],
		onallp : "Minden oldal",
		dontwrap : "Ne t?m?r?tse az oldalakat",
		dontwraph : 'Ha a faluk list?ja leugrik',
		buildand : "Visszasz?ml?l?k megjelen?tése",
		buildandh : 'A faluk list?j?ban (ép?tkezések, csapatmozg?sok)',
		sendres : "Nyersanyag-/csapatküldés ikonok megjelen?tése",
		sendmess : "Uzenetküldés ikonok megjelen?tése",
		bigicon : "Nagy ikonok megjelen?tése",
		paranoid : "Paranoi?s m?d",
		paranoidh : 'Elrejti a szkript m?k?dését a szerver el?l.',
		opennote : "Jegyzetek automatikus megnyit?sa",
		resbar : "Nyersanyagkijelz?",
		showres : "Nyersanyagkijelz? kül?n ablakban",
		redbl : "piros (?r?ban)",
		yellowbl: "s?rga (?r?ban)",
		marketpl : "Piactér",
		mfilter : "sz?r?",
		mfiltero : ['nincs','csak ar?ny','csak sz?r?','teljes'],
		rpandmp : "Gyülekez?tér és piactér",
		incomres : "Inform?ci? az érkez? nyersanyagokr?l",
		incomreso : ['ki','be','?sszefoglal?','WW mode'],
		troopsI : "Csapatinform?ci?k",
		showls : "Linkek megjelen?tése",
		showlso : ['ki','be','ablakban'],
		savedls : "Mentett linkek",
		scrlang : "Szkript nyelve",
		youlang : "Az ?n nyelve"
		//version = verzi?
		//Rally point = Gyülekez?tér
	},
	fa: { // Persian, thx Reza Moghadam
		// ingame messages
		ok : "موافقم",
		cancel : "لغو",
		close : "بستن",
		overview : "مرور کلي",
		svers : "ورژن اسکريپت",
		settings : "تنظيمات",
		notes : "متن",
		ressav : " منابع پر است",
		warehouse : "انبار",
		resources : "منابع",
		troops : "لشکريان",
		links : "لينک ها",
		archive : "آرشيو",
		arena : "ميدان تمرين",
		// settings
		info : "اطلاعات",
		yourrace : "دسته ي شما",
		speedart : "سرعت مصنوعي",
		racelist : ['رومي ها','توتن ها','گل ها'],
		onallp : "همه ي صفحات",
		dontwrap : 'کشيده نشدن صفحه',
		dontwraph : "اگر ليست روستاه پايين رفت",
		buildand : "نمايش شمارش معکوس ساختمان و حمله",
		buildandh : 'در ليست روستا ها',
		sendres : "نمايش آيکون هاي ارسال منابع/سربازان",
		sendmess : "نمايش آيکون هاي ارسال پيام",
		bigicon : "نمايش آيکون هاي بزرگ",
		paranoid : "حالت پارانوئيد",
		paranoidh : 'وظايف مخفي شود ، اگر تغيرات در سرور اسکريپت تراوين دريافت شد.',
		opennote : "بازشدن خودکار متن ها",
		resbar : "نوار منابع",
		showres : "نمايش نوار منابع در پنجره",
		redbl : "قرمز (در ساعت)",
		yellowbl: "زرد (در ساعت)",
		marketpl : "بازار",
		mfilter : "فيلتر",
		mfiltero : ['خاموش','تنها ارزيابي','فقط خاموش','کامل'],
		rpandmp : "اردوگاه و بازار",
		incomres : "دريافت اطلاعات منابع",
		incomreso : ['خاموش','روشن','خلاصه','WW mode'],
		showls : "نمايش ليننک ها",
		showlso : ['خاموش','روشن','در پنجره'],
		savedls : "ذخيره سازي لينک ها"
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
		ressav : "Ressources à % de la capacité",
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
		paranoid : "Mode paranoïaque",
		paranoidh : 'Cacher les tâches si les changements sont détectables depuis les scripts du serveur Travian.',
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
		notes : "Zabilje?ke",
		ressav : "Resursi do % ispunjenja",
		refresh : "Osvje?i",
		warehouse : "Skladi?te",
		resources : "Resursi",
		troops : "Vojska",
		links : "Poveznice",
		linkname : "Ime poveznice",
		linkdel : "Izbri?i poveznicu",
		name2 : "Drugi naziv",
		archive : "Arhiva",
		arena : "Arena",
		addcur : "Dodaj trenutno",
		del : "Izbri?i",
		edit : "Uredi",
		total : "Ukupno",
		noplace : "Nema mjesta!",
		hunger : "glad",
		duration : "trajanje",
		deficit : "manjak",
		aclock : "Alarm \nhh:mm:ss , hh:mm , mm (unazad)",
		// settings
		none : 'Ni?ta',
		auto : "automatsko",
		info : "Informacije",
		yourrace : "Tvoja jedinica",
		speedart : "Artefakt za brzinu",
		racelist : ['Rimljani','Teutonci','Gali'],
		cranny : "?uta razina ?itnice (postotak)",
		crannyh : 'Normalno 80, 70 za klasi?ne plja?ke ili artefakt',
		builtin : "Ugra?eni alati",
		builtinh : 'Normalizacija produkcije: crveno najvi?e potrebni, a zeleno manje potrebni resursi',
		normalize : 'Normalizacija produkcije',
		normal : "Normalno",
		banalyze : "Ugra?eni analizator bitke",
		cropfind : "Ugra?ena tra?ilica ?itnih (crop) polja",
		adetect : "Detektiranje napada",
		adetecto : ['Isklju?eno','Bez zamrzavanja','Uklju?eno'],
		adetecth : "Radi skrivene zahtjeve prema poslu?itelju kr?e?i pravila. Mo?e dovesti do kazni.",
		adetectt : "Razdoblje detektiranja napada",
		onallp : "Sve stranice",
		dontwrap : "Onemogu?i prijelom stranica",
		dontwraph : 'Korisno ako se lista naselja razlomi u dva reda',
		buildand : "Prika?i odbrojavanje izgradnje i napada",
		buildandh : 'Prikaz u listi naselja',
		sendres : "Prika?i ikonice «?alji resurse/vojska»",
		sendmess : "Prika?i ikonicu «?alji poruku»",
		analyzer : "Analizator svijeta",
		bigicon : "Prika?i VELIKE ikone",
		addvtable : "Prika?i dodatnu tablicu naselja",
		addvtableh : '(Travian 4)',
		paranoid : "Paranoja mod",
		paranoidh : 'Prikriva rad ako su prepoznate promjene u skriptama s poslu?itelja Traviana.',
		opennote : "Automatski otvori zabilje?ke",
		resbar : "Grafikon resursa",
		showres : "Prika?i grafikon u zasebnom prozoru",
		redbl : "Crveno (u satima)",
		yellowbl: "?uto (u satima)",
		marketpl : "Tr?nica",
		mfilter : "Filter",
		mfiltero : ['Isklju?eno','Samo omjer','Samo filter','Potpuno'],
		npcsum : "Sa?etak za NPC",
		npcsumh : 'Prikaz u tr?nici i zgradama',
		bidinc : "Pove?anje ponude",
		bidinch : 'Koristi se za aukcije (Travian 4)',
		rpandmp : "Okupljali?te i Tr?nica",
		incomres : "Informacije o dolaze?im resursima",
		incomreso : ['Isklju?eno','Uklju?eno','S kratkim pregledom','WW mod'],
		troopsI : "Informacije o trupama",
		troopsIo : ['Isklju?eno','Uklju?eno','Skeniraj upute'],
		defRP : "Predpostavljena akcija za okupljali?te",
		showls : "Prika?i poveznice",
		showlso : ['Isklju?eno','Uklju?eno','U zasebnom prozoru'],
		savedls : "Spremljene poveznice",
		savedd : "Pohranjeni podaci",
		saveddh : 'Uklju?uje linkove i druge nazive naselja. Korisno ako se ra?un bri?e ili ne koristi na Va?em ra?unalu.',
		savedelall : "Izbri?i sve pohranjene podatke",
		savedelallh : 'Jeste li sigurni da ?elite izbrisati sve pohranjene podatke, uklju?uju?i linkove i druge nazive naselja?',
		scrlang : "Jezik skripte",
		youlang : "Tvoj jezik",
		notifi : "Obavijest",
		notification : "obavijest nakon gradnje",
		method : "Metoda",
		audiourl : "URL audio datoteke",
		audiotest : "Testiraj audio"
	},
	bs: { fb : "hr", // Bosnian
		arena : "Mejdan",
		marketpl : "Pijaca",
		npcsumh : 'Prikaz na pijaci i zgradama',
		rpandmp : "Mjesto okupljanja i Pijaca"
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
		ressav : "Ressourcen zu % gefuellt",
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
		paranoid : "Paranoid Mode",
		paranoidh : 'Verstecke Job, wenn Veraenderungen in den downloadbaren Scripten vom Travian-Server entdeckt werden.',
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
		youlang : "Deine Sprache"
	},
	pt: { // Portuguese language, thx Herzer Duca
	// mensagens no jogo
	//traduzido por Yabadabaduca - server ptx5
		ok : "Ok",
		cancel : "Cancelar",
		close : "Fechar",
		overview : "Resumo",
		svers : "Vers?o do Script",
		settings : "Definiç?es",
		notes : "notas",
		ressav : " de recursos para encher",
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
		total : "Total",
		// definiç?es
		info : "Informaç?o",
		yourrace : "Sua raça",
		speedart : "Velocidade do artefato",
		racelist : ['Romanos','Teut?es','Gauleses'],
		onallp : "Todas as p?ginas",
		dontwrap : "N?o rolar p?ginas (lento)",
		dontwraph : 'Se a lista das aldeias pular para baixo',
		buildand : "Mostrar construç?o em contagem regressiva e atacar",
		buildandh : 'Na lista das aldeias',
		sendres : "Mostrar &laquo;Enviar reforços/tropas&raquo; icons",
		sendmess : "Mostrar &laquo;Enviar mensagem&raquo; icons",
		analyzer : "World analyzer",
		bigicon : "Mostrar ?cones grandes",
		paranoid : "Modo Paranoid",
		paranoidh : 'esconder o job se as alteraç?es forem detectadas em download a partir do servidor de scripts Travian.',
		opennote : "Abrir notas automaticamente",
		resbar : "Barra de Recursos",
		showres : "Mostrar barra de recursos na janela",
		redbl : "vermelho (em horas)",
		yellowbl: "amarelo (em horas)",
		marketpl : "Mercado",
		mfilter : "filtro",
		mfiltero : ['desligado','taxa ?nica','somente filtro','cheio'],
		rpandmp : "Ponto de encontro e Mercado",
		incomres : "informaç?es de recursos recebidos",
		incomreso : ['desligado','ligado','com sum?rio','WW mode'],
		showls : "Mostrar links",
		showlso : ['desligado','ligado','na janela'],
		savedls : "links salvos",
		scrlang : "Idioma do Script",
		youlang : "seu idioma"
	},
	bg: { // Bulgarian language, thx Mitko
		// ingame messages
		ok : "??",
		cancel : "?????",
		close : "???????",
		overview : "???????",
		svers : "?????? ?? ??????",
		settings : "?????",
		notes : "???????",
		ressav : "??????? ?? % ?????",
		refresh : "??????",
		warehouse : "?????",
		resources : "???????",
		troops : "???????",
		links : "??????",
		linkname : "??? ?? ????????",
		linkdel : "?????? ????????",
		name2 : "????? ???",
		archive : "?????",
		arena : "?????",
		addcur : "?????? ?????????",
		del : "??????",
		edit : "??????????",
		total : "????",
		noplace : "???? ?????!",
		hunger : "????",
		duration : "???????????????",
		deficit : "???????",
		// settings
		none : '?????',
		info : "??????????",
		yourrace : "?????? ????",
		speedart : "??????? ?? ?????????",
		racelist : ['???????','????????','????'],
		onallp : "?????? ????????",
		dontwrap : "?? ?????? ????????",
		dontwraph : '??????? ?? ?????? ????? ????',
		buildand : "?????? ?????????? ?? ?????? ? ?????",
		buildandh : '??? ??????? ?? ?????? ',
		sendres : "??? &laquo;??????? ?????? / ??????&raquo;",
		sendmess : "??? &laquo;??????? ?????????&raquo;",
		analyzer : "?????????? ??????????",
		bigicon : "?????? ?????? ?????",
		paranoid : "???????? ?????",
		paranoidh : '????? ??????, ??? ???????? ???????, ????? ?? ??????? ?? ??????? Travian ?????????.',
		opennote : "??????????? ???????? ?? ???????",
		resbar : "???????? ???",
		showres : "?????? ????????? ??? ? ????????",
		redbl : "??????? (??? ??????)",
		yellowbl: "???? (??? ??????)",
		marketpl : "?????",
		mfilter : "???????",
		mfiltero : ["?????????", "???? ????", "???? ??????", "?????"],
		rpandmp : "?????? ???? ? ?????",
		incomres : "??????? ??????? ??????????",
		incomreso : ["?????????", "???????? ","????????", "WW ?????"],
		troopsI : "?????????? ?? ???????",
		troopsIo : ["?????????", "???????? ","????????? ?????"],
		showls : "?????? ??????",
		showlso : ["?????????", "???????? ","? ?????????"],
		savedls : "???????? ??????",
		scrlang : "???? ?? ???????",
		youlang : "????? ????",
		notification : "??????????? ???? ????????????",
		method : "?????",
		audiourl : "URL ?? ????? ????",
		audiotest : "????"
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
		ressav : "resurse pina la %",
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
		paranoid : "mod Paranoid",
		paranoidh : 'Ascunde in cazul detectarii scriptului de catre server.',
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
		cancel : "??????",
		close : "???????",
		overview : "???????",
		svers : "??????? ???????",
		settings : "??????????",
		notes : "???????",
		ressav : "??????? ?? % ???????????",
		refresh : "??????",
		warehouse : "?????????",
		resources : "???????",
		troops : "????????",
		links : "???????",
		linkname : "??? ?????",
		linkdel : "?????? ????",
		name2 : "????? ???",
		archive : "??????",
		arena : "??????? ?????",
		addcur : "????? ???????? ??????",
		del : "??????",
		edit : "??????",
		total : "??????",
		noplace : "???? ??????? ?????!",
		hunger : "????",
		duration : "???????",
		deficit : "???????",
		// settings
		none : "?????",
		auto : "????",
		info : "????",
		yourrace : "????? ????",
		speedart : "???????? ?????",
		racelist : ['???????','????????','????'],
		cranny : "???? ???? ?????? (????????)",
		crannyh : '???????? 80, 70 ?? ???????? ? ????????',
		builtin : "???????? ?????",
		builtinh : '?? ????????????? ??????????: ?????? ???? - ????????????? ???????, ?????? - ???? ???????? ???????',
		normalize : '????????????? ??????????',
		normal : "????????",
		banalyze : "??????? ?????????? ?????",
		cropfind : "???????? ??????????? ???????",
		onallp : "??? ??????",
		dontwrap : "?? ???????? ??????",
		dontwraph : '??? ?? ????? ????, ????? ????',
		buildand : "?????? ??????????? ????????? ? ?????",
		buildandh : '? ????? ????',
		sendres : "??????? &laquo;?????? ???????/????????&raquo; ?????",
		sendmess : "??????? &laquo;?????? ??????&raquo; ?????",
		analyzer : "World analyzer",
		bigicon : "??????? ?????? ?????",
		addvtable : "??????? ??????? ?????? ?? ?????? ????",
		addvtableh : '?? ?4',
		paranoid : "???????? ???",
		paranoidh : 'Hide job if detected changes in downloadable from the server Travian scripts.',
		opennote : "?????????? ?????? ???????",
		resbar : "?????? ?? ?????????",
		showres : "??????? ?????? ?? ????????? ? ???????",
		redbl : "?????? (? ??????)",
		yellowbl: "???? (? ??????)",
		marketpl : "??????",
		mfilter : "??????",
		mfiltero : ['????????','???? ?????','???? ??????','????'],
		npcsum : "???? ?? ???",
		npcsumh : '? ?????? ? ????????',
		bidinc : "???????? ?????? ?? ?????",
		bidinch : '?? ??????? ?? ?4',
		rpandmp : "????? ???????? ? ??????",
		incomres : "???? ? ????????? ?????????",
		incomreso : ['????????','???????','?? ?????','WW ???'],
		troopsI : "??????????? ? ??????????",
		troopsIo : ['?????????','????????','????? ??? ?????????'],
		defRP : "????????????? ?????? ? ????? ????????",
		showls : "??????? ???????",
		showlso : ['?????????','????????','? ???????'],
		savedls : "???????? ???????",
		savedd : "???????? ??????",
		saveddh : '?????????? ??????? ? ????? ???. ??????? ?? ????? ???????, ??? ???? ???? ?????????.',
		savedelall : "?????? ??? ???????? ???????",
		savedelallh : '?? ?? ?? ??????? ?? ????? ?? ??????? ??? ???????? ???????, ?????????? ? ??????? ? ????? ????',
		scrlang : "????? ??????",
		youlang : "???? ?????",
		notifi : "????????????",
		notification : "???????????? ?? ????????",
		method : "??????",
		audiourl : "??? ????? ?????",
		audiotest : "???????? ?????"
	},
	pl: { // Polish translation, thx aren
		// ingame messages
		ok : "Ok",
		cancel : "Anuluj",
		close : "Zamknij",
		overview : "Przegl?d",
		svers : "wersja skryptu",
		settings : "ustawienia",
		notes : "notatki",
		ressav : "?rodk?w na % nape?niania",
		refresh : "od?wie?",
		warehouse : "Magazyn",
		resources : "Surowce",
		troops : "Jednostki",
		links : "Linki",
		linkname : "nazwa linka",
		linkdel : "usu? link",
		name2 : "druga nazwa",
		archive : "Archiwum",
		arena : "Plac Turniejowy",
		addcur : "dodaj bie??cy",
		del : "usu?",
		edit : "edytuj",
		total : "Razem",
		noplace : "Nie ma miejsca!",
		hunger : "g??d",
		duration : "czas trwania",
		deficit : "deficyt",
		// settings
		none : "Brak",
		auto : "auto",
		info : "Informacja",
		yourrace : "Twoja rasa",
		speedart : "Pr?dko?? artefaktu",
		racelist : ['Rzymianie','Germanie','Galowie'],
		cranny : "???ty poziom kryj?wki (procent)",
		crannyh : 'normalny 80, 70 do grabie?y na klasycznym lub artefakcie',
		builtin : "Wbudowane narz?dzia",
		builtinh : 'dla normalizacji produkcji: kolor czerwony - najwi?cej ?rodk?w potrzeba, zielony - potrzeba mniej zasob?w',
		normalize : 'normalizacja produkcji',
		normal : "normalny",
		banalyze : "Wbudowany analizator bitwy",
		cropfind : "Wbudowany poszukiwacz crop?w",
		onallp : "Wszystkie strony",
		dontwrap : "Nie zawijaj stron",
		dontwraph : 'Je?eli lista osad przeskocz w d?l',
		buildand : "Pokaz odliczanie budynku i ataku",
		buildandh : 'Na li?cie osad',
		sendres : "Pokaz &laquo;wy?lij surowce/jednostki&raquo; ikony",
		sendmess : "Pokaz &laquo;wy?lij wiadomo??&raquo; ikony",
		analyzer : "World analyzer",
		bigicon : "Pokaz DU?E ikony",
		addvtable : "Pokaz dodatkowa tablice osad",
		addvtableh : 'dla travian4',
		paranoid : "Paranoid mode",
		paranoidh : 'Ukryj prace skryptu w razie wykrycia zmian do pobrania z serwera Traviana.',
		opennote : "Automatycznie otw?rz notatnik",
		resbar : "Tabela surowc?w",
		showres : "Pokaz tabele surowc?w w oknie",
		redbl : "czerwony (w godzinach)",
		yellowbl: "???ty (w godzinach)",
		marketpl : "Rynek",
		mfilter : "filter",
		mfiltero : ['off','tylko stawki','tylko filter','wszystko'],
		npcsum : "podsumowanie dla NPC",
		npcsumh : 'na rynku i budynkach',
		bidinc : "przebicie oferty",
		bidinch : 'na aukcji travian4',
		rpandmp : "Miejsce zbi?rki i Rynek",
		incomres : "informacja o przychodz?cych surowcach",
		incomreso : ['off','on','z podsumowaniem','WW mode'],
		troopsI : "Informacja o jednostkach",
		troopsIo : ['off','on','scan help'],
		defRP : "domy?lna akcja dla Miejsca zbi?rki",
		showls : "Pokaz linki",
		showlso : ['off','on','w oknie'],
		savedls : "zapisane linki",
		savedd : "zapisane dane",
		saveddh : 'w tym Linki i Druga nazwa. Je?li konto usuni?te, albo nie tw?j komputer.',
		savedelall : "usun?? wszystkie zapisane dane",
		savedelallh : 'Czy na pewno chcesz usun?? wszystkie dane, w tym linki i druga nazwe?',
		scrlang : "J?zyk skryptu",
		youlang : "tw?j j?zyk",
		notifi : "powiadomienie",
		notification : "powiadomienia po zako?czeniu budowy",
		method : "metoda",
		audiourl : "Adres URL pliku audio",
		audiotest : "test audio"
	},
	sv:{ // Swedish translation, thx Dragon from the future
		// Meddelande,
		ok : "Ok",
		cansel : "Avbryt",
		close : "St?ng",
		Overview : "?verblick",
		svers : "script version",
		setting : "inst?llningar",
		notes : "Anteckningar",

		ressav : "Resurser ?ver 90 %",
		refresh : "Uppdatera",
		warehouse : "Magasin",
		resources : "R?varor",
		troops : "Soldater",
		links : "L?nkar",
		linkname : "L?nknamn",
		linkdel : "Radera l?nk",
		name2 : "Andra namn",
		archive : "Arkiv",
		arena : "Torneplats",
		addcur : "L?gg till nuvarande",
		del : "radera",
		edit : "?ndra",
		total : "Totalt",
		noplace : "Det finns ingen plats",
		hunger : "Sv?lt",
		duration : "Varaktighet",
		deficit : "Underskott",
		// inst?llningar
		none : "Inga",
		auto : "auto",
		info : "Information",
		yourrace : "Din stam",
		speedart : "Titanskor",
		racelist : ['Romare','Germaner','Galler'],
		cranny : "Gul niv? p? grotta (procent)",
		crannyh : "Normal 80, 70 f?r klssisk eller artefakt-plundrare",
		builtin : "Inbyggda hj?lpmedel",
		builtinh : "F?r att ?terst?lla produktionen: r?d f?rg - Beh?vs mest resurser, green - beh?vs mindre resurser",
		normalize : "?terst?ll produktionen",
		normal : "normal",
		banalyze : "inbyggd analysator f?r slag",
		cropfins : "inbyggd veteby-finnare",
		onallp : "Alla sidor",
		dontwrap : "Byt inte sidor",
		dontwraph : "Om bylistan hoppar ner",
		buildand : "Visa byggnings och attack nedr?kning",
		buildandh : "I bylistan",
		sendres : "Visa &laquo;s?nd r?varor/trupper&raquo; ikoner",
		sendmess : "Visa Skicka meddelande ikoner",
		analyzer : "V?rldsanalysator",
		bigicon : "Visa STORA ikoner",
		addvtable : "Visa extra bylista",
		addvtableh : "F?r travian 4",
		paranoid : "Paranoid",
		paranoidh : "D?lj uppgift om det uppt?cks f?r?ndringar i det nedladdningsbara fr?n Travian-skriptet",
		opennote : "?ppnar automatisk anteckningar",
		resbar : "R?varor-f?lt",
		showres : "Visa r?varor-f?ltet i ett eget f?nster",
		redbl : "r?d (i timmar)",
		yellowbl : "yellow (i timmar)",
		marketpl : "Marknadsplats",
		mfilter : "Filter",
		mfiltero : ['av','Endast v?rde','Endast filter','full'],
		npcsum : "summering f?r NPC",
		npcsumh : "I marknadsplats och och byggnader",
		incomres : "ikommande r?varo-info",
		incomreso : ['av','p?','med sammanfattning','V?rldsunder'],
		troppsl : "Information om soldaterna",
		troopslo : ['av','p?','i f?nster'],
		defRP : "F?rvald attacktyp p? samlingsplats",
		showls : "Visa l?nkar",
		showlso : ['av','p?','i f?nster'],
		savedls : "sparade l?nkar",
		savedd : "sparad data",
		saveddh : 'Inkluderar l?nkar och andra-namn. ?r ett konto raderat, eller inte din dator.',
		savedelall : "Radera all sparad data",
		savedelallh : '?r du s?ker p? att du vill radera all data, l?nkar och andra namnp? byar?',
		scrlang : "Script spr?k",
		youlang : "ditt spr?k",
		notifi : "notifikation",
		notification : "Notifikation efter byggande",
		method : "metod",
		audiourl : "URL f?r ljudfil",
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
		ressav : "Risorse a % della capacità",
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
		paranoid : "Modalità Paranoid",
		paranoidh : 'Arresta lo script se sul server Travian sono stati caricati nuovi script.',
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
	}
}/// finished languages.

var img_igm = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAIAQMAAAAV9pfLAAAAAXNSR0IArs4c6QAAAAZQTFRFAPBTf39/A1tvJwAAAAF0Uk5TAEDm2GYAAAAfSURBVAjXY6g/wHAggWHBAoaJCgyzFRiWLABx6w8AAGi2CK/Y99oaAAAAAElFTkSuQmCC";
var img_car = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAMAAABYzB2OAAAAAXNSR0IArs4c6QAAAEVQTFRFAAApq5lj4NSvyrqKiXhFYlMo8unM/Pv1+fTmwLaX1s2zy8Kp1M687ObV3NO629CwtamGua+R29XC5N3Ip5pw+vft5+TaHnB6ZAAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAY0lEQVQI113NVw6AQAgE0B2avZf7H1XQNW6chJ+XAVLyjBDlIRWhEEw/IoZASiOowvX8zEyfZv/KYSSMoCVLZUYOQbI+VBs5+ADSfEQ3ie55kW+Iks752AYOcNHufdkiwCVOXeVTAjD1v/82AAAAAElFTkSuQmCC";
var img_def = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASxJREFUKM+1kD1Iw1AUhb+ICCVDVxGDHSpC/QHJkMnBwYKZioJbXF2DYEcHRwuSNYOL3YRKl7aDYwkSaBG0gsEMFZduBUeX5/Bo02hMBfHC41we5333vKswUe5NXRi6ztWJppBSh5U34Xe7HO2Vxr6ZSYOh6/iuBiDSju9qGLoeg8cmHx8gVvKyzy9LXV2X+vQoNXyRGoRwcU1yor/U/4AWFpd+/fCrdwy6q8Du9itBOB0ShNI76ER3s6Om7cEWkFWng7IqvD9D4zIhUbkObQ+lWCA1VRBCsSC95foPOzItW7S99FRZVaY3LVsk7qhXs0Wz6mBaNpkhNFrfIY0WZIZgWjbNqkOvFsEUgNvTHPcPfWFaNmv7jgJwXoLBHLGp8x/Rd0aDNzdyys5Zn0/GSWQNYduyJQAAAABJRU5ErkJggg==";
var img_att = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAMAAABYzB2OAAAAAXNSR0IArs4c6QAAAF1QTFRF9OKZvM7Q/9IAgZeZ5Mum1K1w8vf3RFJTlHhN1cSowtTW6PDx0KVjprS23sBcho2OeouN5Mdcv9LUhVEAwbKZ5dKZu34gr8LEZT4Ama6w47YA3urrvY4AcYiK0OHjex9A+wAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAaUlEQVQI11WLWQ6AIBBDy2JcSEwMgjDMcP9jSuKCvq/2NQUaquKmqicYdwVn3nG5Yu2mXaWVIgofDinFHPghRvK3B2qvLKDQFeuaZdTcFSIToDl2M/jERJz862xMwLoBydtbzdMz7jNwAmmnBejV54RhAAAAAElFTkSuQmCC";
var img_pref = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMBAMAAACZySCyAAAAAXNSR0IArs4c6QAAACFQTFRFmZlmADNmMzOZM2aZZmbMZpnMmZmZmcyZzMyZzMzM////Mir4+AAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVQI1x2MvQ2AIBhEH5hQQ2MiFQ0uYFzAETT00pA4Do07wJTyedXl3Q8oZ8HcwFLhKSh8xbzgXa+UEaje2ywNnBuZSK+5WTHxzD/SaQ9KULwO5IGYwpgONG3/1H5oFA+SSflBcAAAAABJRU5ErkJggg==";
var img_refr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAACFQTFRFAAAAK1WAK1WqK4CqVYCqVYDUgICqgKqqgKrUqqrUqtTUrKrIrgAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAcklEQVQI1yWMQQqDMBBF/7QXyASLXWroRRqC1N5KkNLsszCeoHrK/iFZDI/PywOg6mBPQooOZP+YvgtH8ern+iLoAJ9Pwm0A7plg/ntvH9UKwtsytdjM5bcAl5VwbIrrk1Dq2uSx/6QwUnbSxUCfQbHAH5rAEJvdKXN3AAAAAElFTkSuQmCC";
var img_view = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAQAAADIBVVwAAAAAXNSR0IArs4c6QAAAPBJREFUGNNtkbEuBFEYhb+ZSHYjSgoFQaFbmSdQiWSbfYN5HYVWo9No9IqNeINtRYNssjRsITFEYu3/KWbGDNlTneLcc+/9DgCquZlL7zzl/he1yhgeh2pfxi4KV2ZyrRGqZmaqdt21Y31D1bfvV4QaGjdBkctboX56WEUpO47qOkNdn/N6Oi/9ZdWPajo9//OigcRLeTAe3JiqprQk8FjZFZ4Bki6xDJAC7K1OUEgYsUmf22B2wI53wJi1JthjyDcCJ8DQ+4+8M5qRFIYX9BqKNR49EzFTM7e8clB95ZdkDTzcbgHPG4rtbcoJMxfuwg8RxTrpF3oYEQAAAABJRU5ErkJggg==";
var img_del = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMAQMAAABRKa/CAAAAAXNSR0IArs4c6QAAAAZQTFRFAPBT/wAAinN9MwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2gcHFRUv1g/LlgAAACpJREFUCNdjsGBgsOFhkJNgYDdgYHzAwHiAgfkBiM0nwSDHwyDDwiDBAABSdgQyFhEKhwAAAABJRU5ErkJggg==";
var img_edit = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMAgMAAAAWidUSAAAAAXNSR0IArs4c6QAAAAxQTFRFAAAA////cdAAdXxtY+NXkgAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOUlEQVQI12NgYLBnAIJ3BxgYmHdtYGDge/WBgcF6NZBltw4o9no3UPLVG6DkKqA483sgj/8DiABiAO0ND57GNPlIAAAAAElFTkSuQmCC";
var img_notes = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAMAAABcOc2zAAAAAXNSR0IArs4c6QAAAFpQTFRFAGAAACSStiQA2yQAbUkASUlt/yQAkkkAAG3b20kkkm0AbW1tbW2Stm0AAJL/JJLbbZKSkpKSkpK225IAtra2trbbttvbttv//9tJ29vb/9v/2//////b////0AOA4wAAAAF0Uk5TAEDm2GYAAABqSURBVAjXTYqJDoMgFARXBUuh9rDgUd3//82uiMbJJi8zeQC+l4lP3/XH2NTAmzeW0bW/u4JNZW5kWyscuHF5XcPmzwp4cN44XSHjs8ccBkE/yRkUwv6wrlPFElJKCsZwDzaIaHyMuhb4A+RyDHbkWYZoAAAAAElFTkSuQmCC";
var img_save = "data:image/gif;base64,R0lGODlhLgAUAKUoAAAAABw5OTk5ORw5qjk5VTk5cTk5jjk5qhxVqjlVjlVVVTlVqlVVcTlVxlVVjlVVqlVVxlVxjlVxxnFxjnFxxnFx445xxo5x43GOjo6O446O/6qO46qO/3HGAKqqxqqq46qq/8aq/8bGxsbG48bG/8bj4+Pj4+P//////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAD8ALAAAAAAuABQAAAb+wJ/w1ykaj8ikclkcDouoqHRKrVqv0aawg+16v53tN/opmzeZdMZCoYxRYe77Q9JYT5DH422CzkkZVScmDQR7Y31yY3SBU4MmCxeHX4lvKHQVjiYmJQsUk16VbxskblGPJSMDEqBYm35jGSQSp5upqhAOiKKxISAQwA0LCwMDwAm7sF8ZIM1qF23AD8iUvCfX2NnXFs4M3t4ReQsG2uXXr3Lm5RQgaQwAAiUlEcMH5OrYm5X6/P2bFBzcCZiwCcOBgwb8KTQhoshChRTSIAjgwYMIEQoOHijwsF9DIh35TWCl54GDBAkMqCzAMSTDMCBdypR58eOWDjVz6tzJs6cKTi1OmAgdusRJEAA7";
var img_underline =	"data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=";
var img_stat = "data:image/gif;base64,R0lGODlhMQAxAKUtADdJkklJpFtbW0lbpFtbpFtbtm1tbW1tgFtttm1tklttyG1tpG1ttm1tyG2ApICAgG2AyICAkm2A24CApICAtoCA24CA7ZKSkpKSpICS7YCS/5KS25KS7ZKS/6SkpJKk7ZKk/6Sk7aSk/6S2tra2tra2yKS2/7a2/8jIyLbI/9vb29vb7e3t7f///////////////////////////////////////////////////////////////////////////yH5BAEAAD8ALAAAAAAxADEAAAb+wJ9wSCwKWy0WCkXyeC5O0pLVMlqv2F+Seel6v14pNUsutlQosHp9QamQ5axS/Xh06/i6GjWOG1UkawICXYOGg3ZgJG9+Q2dPbJGRHox+j5KYbJRVcSqQbAYGXaGkpaYGdptlnph6F3mwsYmqWYGZt5EkfVZpuL5rKJxGLLiho6fIpxcqVi29ma6y0rBtwkfEv9lrLGbP2t9tZrYXEwUDCaCiF8mliWskwkldEwQBEh0FEWvR03iSzEfSFLDXoWCGAfrAZQp2hMSAABkKSswQYB6FBuYCBAAAIMCAAQUaUIjQz101LSxASlzZQQLIAAUUSJCQISKIDhksSMAIc8H+gUOH1F2Ap4WCApYsXRa4txKE06cgRHSooGAAAwySPCBpUYBBAwRgETSgmUFDy48RC0J9KqJtWw4YKUzaCrKBXbthxY49GEDDWrZuRZgYzAHBVTZ0Q95dvHimx79RAw8efMIEhMNgtCIhoJixZ7sKCkAN3HayiROoT0CQmznx3Y8aN3os0Jn2B6ekTadGHYLABEVbOdulvVJDBglVNS4190Gy7t0nUlRgYDIYkgWxCSLt4LRlgwEACjQvPRl69BQfClQ/sqLEgQN9kf51m6ECecrmU6Q4EQCVF25DEGNAAPLN59xzqemnYH+JEEUECQ8AkJZaBh5o3nkKngCAfyf+EaHCBRJSuBZpgiGImoIohrBhIrsMgQIA90BGommn7YYiih8AgAhDf0iYQYVumRgdhik2oKMolZgBQAcW/AjYgTXaeKN+H9i1ooNGtACAWTlxN6OQU+5XgVgIbLiMNUS0EB9ONI13X5QJ3njCmHohEMADuqDpyFISGSeBBc0JSeQJG3zF2EAe8KHnERA0wFJNM1WQAQclpmbCBxtU8JVejHEmxqJarDDAhAbVVN9Mny3WKGN2evDpFUhsgABSptZaXwW4ziQBBKt2OgEJr8LKwkVmGWScrbdWoOuuvB7qALButGjGGRjwWaqtuCqrLK/c3oWAb9AqCuoRLazgQUxtFuCEbLa5ztQtRgRgAKwY0jbDAgsl0LMUsskqy+xXBfg2Qrgq1IvFvYBggF0BYkWaa6MIBBzAAhgMHO694wqLBhMYTLBARhx5lMACE3hgMcEGN/LDxkzM6/LLUixRcMoqD8HyEjjnLPO9AGYRBAA7";
var img_info = "data:image/gif;base64,R0lGODlhDAAKAIABAH9/f////yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=";
var img_tinfo = "data:image/gif;base64,R0lGODlhDAAMAMIEAACAgICAgICA/4D//////////////////yH5BAEKAAcALAAAAAAMAAwAAAMkeBohwio2R4OkhNQzqX9dplVf9pUjiaWgZ26TOALXR0fcBCkJADs=";
var img_hide = "data:image/gif;base64,R0lGODlhDAAMAIABAExMTP///yH5BAEKAAEALAAAAAAMAAwAAAIZjI8Hy20NQXIpxCmXlY/rXX1VNypcKZZVAQA7";
var img_bigIcon = [ // 0-RP, 1-barrack, 2-stable, 3-workshop, 4-market, 5-market_in, 6-ally, 7-ally_attack
	"data:image/gif;base64,R0lGODlhIAAgAKU3ADMzMzNEREREREREVURVRERVVVVVVVVmVVVmZmZmVVVmiGZmZmZmd1V3iGZ3ZlV3mWZ3d2Z3iHd3ZmZ3mXd3d2aIiGaImXeId2aIqmaIu4iId3eIqoiIiGaZu2aZzIiZiHeZu3eZzJmZiIiZu5mZmXeqzIiqu5mqmYiqzIiq3aqqmaqqqqq7qpm73bu7qru7u7vMu8zMu8zMzMzdzN3dzN3d3e7u3f///////////////////////////////////yH5BAEKAD8ALAAAAAAgACAAAAb+wJ9wSCwaj8ikcnk0HBKLRcJApUITU+bPoCGtXi+ZjFarqVRl8cu1ElEOBqTBjC7ba6fT3X6uxZt4enuDd3l+SAl2JCQfHBRRTgsQFBxeK2kJSAsyZVQIDBEYIKMZGBYTEREGnDKZRAAAP5s1JBQyLyccBgglvSUhIR4dm7euQgAUFAIBJzKbMDAzKwggKSi+wBnEK38/AAYcF7UBCyS3MtMjKevXvSEYC2EcrwxUCxwcm2EsCCYtLezavaMQhsIrBAsGCDCQYIUMGDIMjPgH0JrACBxcRCwCoAAEBAIcnMsHAcU6dtggcGDxotsrKi9ixHixoMaKBRVQ6MQWAgHiCRckXBIRwOGcAxUwypBAsIGnthMvDMo5t4IgGFYXFmQA5mECBRIt5ZgLc6Doras1aELo4AGBBhUnhA7RF+MmhwN6zsYoM61B2RUXkiSAEUOGrhUkoryoMTNMGREHNHBTsmkGFYIkDiCwNQMMxBoyHsktIiGsgS+6FBggMUMvDRs0DyipImQTC10PFCC4dOuzTdlJuoGTcdvAgwcG4tGAEZNTjQVatpgrboDSPTWfXwBncvrWohWIqZCgIaPw8+hbwlydvGUBCzEyMqPvHl9olQNw0EvXpV+LAQL9BSjggEMEAQA7",
	"data:image/gif;base64,R0lGODlhIgAgAKU1AAAAAAAkACQkACQkJEkkAG0kAABJAJIkALYkAElJAElJJElJSW1JAG1JJABtJG1JSZJJAJJJJCRtJJJJSbZJJG1tAEltbW1tSQCSJJJtAG1tbZJtJG1tkrZtAJJtbbZtJG2SkraSAJKSbZKSkpKSttuSALaSkpK2ttu2ALa2kra2tv+2ANu2tv/bALbb29vbttvb2//btv/b29v/////2////////////////////////////////////////////yH5BAEAAD8ALAAAAAAiACAAAAb+wJ9wSPzVGq1kKFFpMCqhToFCRSAKqqJ2ONpUMo2LhrMYLDadCJWCoGS3W4/GVavXZjDSArpGHN5wRCMjdnczhzMkAhkZVQcwgUQqCycqKiQkKjCIJxwDGWpXkFs1KiMwkzN2My4nIySbJCMWCaETNVuoHg8CAhoaF2IjKqouIycnFiQDUwgXuFowNSMKAgoKCw8PCb0Dc6UaCyALAhQHI4HUKgMsLDA0MjApJgsAAxysCxYWAgUIgEVKwYChYQSLGjRgnKrB4sKChyqSaRBAgMCodB4OypDB0ANCFgsmDXC1QAMqaHAUwttIAx6LjSY03Bkw0gLAQCpYjLggLaf+jJVyOKwDoA9dpB8wSmrwYKIhu5UPRogTEJKFzEiTTEirEe/Fi5UgN3HQYJUsQJRIF0jbyLYl2zEaVGh4McLDAhlGhaAly5Wt358vKLmSCUNG05tE7v7dyMIDWxYipLZrWcPDRS1kFzdMsfHFxhQjDL8cFClp03YpdnFOaBneypKIMZt58DDjT4Xv/LIYcHTIBRPzXm5U2PqvXbRDkC94ycKSiREaTPz8y4IqnLxClqOKB+NlX78xPAC4AOdBkbg05NSVvlgGZOvRGBQxxTV4e/cN7dUpMgJCkaTu/bRSWy+I0I54ADxwQVSa1DCAAJiN0NSAAurUTkMMfPABAwJ0GOCABPVoEFA9Ub2DkHseKODBLgtkEAIEAgDgAAY0YmCAiMmRAwAAAigIzAUulhBFAi4+IaMDM9LogAFETCQABAmggEIIIaCwwpVXogBBCAyEUEEASNaIAZJDqFCBAERmkMSaSVzZQgUaVtCCAEsmqaQDQQAAOw==",
	"data:image/gif;base64,R0lGODlhHwAgAKUlACQAACQkACQkJEkkAG0kAElJJElJSW1JAG1JJG1JSZJJAJJJJG1tJG1tSW1tbZJtJJJtSbZtAJJtbbZtJNttANttJJKSJJKSSbaSJJKSkraSSduSJLaSkra2Sba2ktu2Sba2tv+2Sdu2tv/bbdvb2////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAD8ALAAAAAAfACAAAAb+wJ9wSCwaj8jkEERSOo+kxyExbD6VoIgiICQZrsYSB/TLRga/DAINFpaEI4vEcTgMHIoIt51+kzoPFg8CAAoUW3w/JR0fISEfGAgCBREHAXt8IBcPDAgFBwUDegNfiSUeEBiRBHlnCVZ8JbIZB3kUEWcOiUQOIBMRGiIWWwVkuyQZBhUTJCAZCgAPxonJCBUaJAJ0ABYZuz8JBxsRGCUkJJcM3okODxvjEUwZAAcI608lDgUCCBO3uLgG1MFwT0mJBBM2TBAQIMI/CpYIIHhQ8AiIBAje/buEC6KAWqB0JckmroKWA1roVRIwQJSCBQ2UoEuIawIGlAQC5GyJMgLCJ5n9AOJqJUBBARIJCOB68OENEhBBcXHUItBbuKUhphkhkdEhtJ5GAzShg6sABgNOwyTYYFIoLgdo0/QMwOCByDALKLQVqoBUTBAHfkVgEGLQ3SElEEQQ3DECgQMZBGTgiuHWgg8fHhSo+IPOA6EHHhvopQ0BhgoQMTwaZEAAERINlN2qg8CBF2QABpzWYsFRBwYCXBfhWm9CBqfJyhSYIPhBh94dgicBIWG4NhLvTCqoBwlDgUQgBBjIDlCBpw4GggAAOw==",
	"data:image/gif;base64,R0lGODlhIAAgAKUvAAAAAEkAACQkACQkJEkkAEkkJG0kALYkAElJAElJJElJSW1JAElJbW1JJG1JSZJJALZJAG1tAEltbW1tSZJtAG1tbZJtJG1tkpJtSbZtANttAJKSAG2SkpKSSbaSAJKSbbaSJJKSkpKSttuSAJK2ttu2ALa2tra229u2ttvbAP/bALbb29vb29vb/9v//////////////////////////////////////////////////////////////////////yH5BAEAAD8ALAAAAAAgACAAAAb+wJ9wSCwOFQqWkFWRvIzQqLASklqvrOp1W3y9Ktzw0BF6irevhvYcfbI2FSW7u/xNVGXzvP4DI1QmQmtzCk8hAx8RDT8fG4F7VD8mAiwCKS8OHoNsYCGOJioDChRyeyYsCiksLykLChGlcywdKRE/LCoIJpp7Py8TESoRKA0jLKAIvSwRJSkCDxkafbm9JggaGwQGGhoGEQ+bYi8FECMB2xoEIwl6bAoHBhkBB/DcAI9sLwb73fQBGgcAADAVIIAAgAAOzFM4kM2hghD3nTMQoOEZCSYACIDIsSKAWFwUrHAhQuDGggIEDgBzRkGFFidOkAghgUEFEReQhLsyIIFjgwYkgsY8wYGBKJBSWHxAYGHBgAUMgko1qkBAmBdPLSAgUEBACKkzB4gdwKWABa0fD5mQSUIEBwUMKHFhikABPgwhKjCQoEAs0igVQCAQ0M7BBEkhQphoZ4WABQL4hrBIsCcIADs=",
	"data:image/gif;base64,R0lGODlhIAAgAMIEAAAAADMzM0xMTOXjI////////////////yH5BAEKAAQALAAAAgAgAB4AAAN9SLrc/jDKSau9VghsAdDaInwcM3ofSJbKtqAeWG6uCYP1RDuje+cQFzDm8OhEDWID+KgNV6YjYdB69ZYEZnTAzVqhVe0LZhSBnRLy8jz1TgBN6IZLFevkdK5dclWQyxx9fjAsWWB+hS2HiWZ7GAGQAQCRAYx/aoyZmpucHAkAOw==",
	"data:image/gif;base64,R0lGODlhIAAgAIQcAKocAMYcAOMcAKo5HKo5OcY5HFVVVeM5HP85AI5VOXFxcf9VHKpxVcZxVY6Ocf9xVY6Ojv+Ocaqqjqqqqsaqqv+qjsbGxuPGxv/GxuPj4//j4///4////////////////yH5BAEAAB8ALAAAAAAgACAAAAW84CeOZGmeaKqubOu+8BdFMas9T71Gy1PpqceiBzxVEMgFplhaIJE5pmghqFqjI4jW8BIErFUE6QIoA1wZ5DeM4IzIZpclkfAGEAlG5m0+tzIQDgGDAlp7InAAAWgWEoNfExaHHxRmiy8UAWWXJJmbMJWfIxmNjwKRkyqJnB+AgoSGLYl+InN1g3h6sn0kaQhrAkhuLLMlXmDBL1oQXCRUyFhMTk/RTEdJS1IjQkTaIzw+3iM31d4z4ujp3iEAOw==",
	"data:image/gif;base64,R0lGODlhIAAgAIQeAFUrK4ArAIArK6orK1VVVYBVK4BVVapVK6pVVdRVK6qAVaqAgKqAqtSAVdSAgP+AVaqqqtSqVdSqgNSqqv+qVdSq1P+qgP+qqtTUqtTU1P/Uqv/U1P/U/9T//////////yH5BAEKAB8ALAAAAAAgACAAAAX+4CeOZGmeaKqubOu+cCzPdK0KiKAi0ysoDosDYQIYGBlPZsFcmA4IiURD3WgujYMIkulWPOCksmIQFRqWtNpyoWosjYbYM+GEwWBEgyJpPB4UcXtrFhQUE3hdSnMTaW5vhYZxFJGSHh1giBMbeBIWV4SGlA97ooaIYRwQHJgbnpWmhlSBsRKJXJd0sbuUVHAJlHxiHBMQnbymgxpWk5QYuV0dHa7Ihml+jhpxabZ4uROlyJ9wg4WAgUkcHBsbGUHVpGmShg8H9gcGSx9GBGeAsIUKNQt0QAcLPX6CUTi3cFKDAC4EHCAXLs65OAZfDJjYIEFFQRljKNBD6lwELTYQPggQVKBAypcwY8qcSRNmCAA7",
	"data:image/gif;base64,R0lGODlhIAAgAOMOACQkJElJSW1tbZJtbZKSbZKSkraSkra2kra2ttu2ttvbttvb2//b2///2////////yH5BAEKAA8ALAAAAAAgACAAAAT+8MlJaVs16y2X+xgnZp8jCM6oPp6DAALjhGuGeEggLEuBzLXJDXf69Xye4K3h0v0QBxeiUGDQRIhbQeCTgo5dhEqxmGZvQ1eZOlyVFwf2OaH4+ZAKFXpK7R3QPFRIYiMKZHFZCj5ndYJlbmR3WX9TgVQHjyNDfIF7DHwECAkHKgsKDqcJQ45HBjyEWDxglj5WpgYFdWOnUAUeirWfBQSLBaWvUg1Lq7gBPnoeszO4CFbECzvGIzwOcX1TuAsMAlkLA1Oa0X0LDQfE1dhl5LAcZDMuvmXUDHdbPekf5OAr4GpBAGcntImwdyufoGpTnCncFlCQMl8XuJBS0sJbCwcpW+gpAVHtA4J5QSpgKuGgAZuUGn6YFKALZoaVBRJcsVlBpkieFfIEiQAAOw=="
	];

// Some of these Images was taken by Qusai Abu Hilal from ms99's scripts
// by Qusai Abu Hilal from travian

var imP = 'data:image/gif;base64,';
var imPNG = 'data:image/png;base64,';
//base64 coded images
var image = {

'notepad'  : imPNG + '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',

'settings': imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABGdBTUEAANkE3LLaAgAAIABJREFUeJztvXmYHeV55v2r5ZxTZ+1zeldv6lZraQltCCQkQIDMYoHxhu3Y2ImDsOMJWcYmXmYySSaxky8TLzPGTubyOJnPkj8b27E9AxgbG8YBsQsQqAUS2qXWvrS6dXo/a9X8Udtbder0ogWwP55z1VX79t73cz/P+75VdeBte9vetrftbfv/qUlv9gW8ASZVma5mRpXp30r7bSGAJIy9wzvI0MAyDGsbldkozA48SoFXMcgiYaCT5SdsB3RrreEb4LeAIL+JBBDBljFBrqWe5YRZBsxGYSkSHch0ODupIIWmdwJ9wregzDNAFp3XKNNHkV6BHDq/waT4TSCAH3CZ99BFnBsIsRaZtch0IIMcASligR0BSQEp7DvKVCbAZ+hg5AEd9Lw5bZSsZWASQ+dpCmynn808ziBeQrzlyfBWJYAIugLIfJj3EeI6VG5HpkOKgBw1BylienfFzUiBk5NaBWKGb9Ka1ydMIugTlmLomIQo8nNGeZCfcYhghXhL2VuNAHbslgGFD/M+IrwbhdtRqFESFuhx07udPRBuxJpIaxnSkTQZLUNay1jL0s50NevLHgJMtPqyB81lQ4cc+BwUxXnDJUN5xFKIMq9R5H6LDAetTd9yZHgrEEBM2hRuZw4ZPo7Cx1DpUBIm4ErC3doPdmdNF82JWTQnmklrGTprui76ReZKOU6NnqRv6BCnRk9yavQk2XzWBN/eyJo2iqCPCmQo8QuKPMwP2YStFW8RIryZBPB6+4dYR5TfQ+WjUgTUNMgJK44LVyoBTYlmZtd00VPXw2wf2NIluiMjAKpsLsvhoUP0DfWxZ2AXuVLOJYQdKvJQHjYHShyhzP0c4Zs8yQDeEPGm2JtBgErgY/wFCtcqKVBSIMd8oEvQFG9maeNyFtT1UBNJTw60Pyycp/nlPnAbYd3hoT72Duxm+5neCjIYuqkKpUEwCgxR5Fsc5ps8zVneRCK8kQTwAv8+VlDDV2zg1TqQQ3hAr4mkWdq4jKWNy0lr6cAjTnkDF3KHkwE/yXrDgL2Du3n1TC97B/a4JLDG5WEfEY7yDUsR3vDQ8EYRwAX+auqZy1dR+aiSALUBZKuqZnt1R81sljYsY0njMs8RAi92Ot4+07ucCvgq2wSRIpvL8lr/dl468SL5Us5DhvKQQIQcf84P2YhJgjeMCJeaAG5yByp38mk0/qOsURNq9Eq9BLTXzOaatrV0pGYHJnsVswFXP9m68zJ/9j+d9b4aAkC+lOO1/lfZevJFhvJDZugwwChDKQvlc2AUeJYhvsBDvIyXCJfMLiUBbK9XWU83jfyzFOYatR7UjOvtkgTtqQ6utoG39pT8R/Jf7GR1/It9V8Yks0HrJlmWK+V4+eRLvHzqJXKlnEMEvQjFU1abQp4vcz9fAopcYjW4FATwev1H+Qxh/qOcIBVu9sp9TaSGNW3Xcln9kkDQpwT8UuYAUxS3H+ig0FCtzQAgV87x/LFneOXkVhNda3l5xCSCUWQHg/whD7OVS6gGF5sAbqxfTQPz+WdUbgs1QqjW2kAyh8ubrmBN67VE1Ign43cmfX14027lu1SaFgRstXW+/kS/YjidBgb0j5/h0YOP0D9+BsMwlxlFKJwCfZRhxvlzfswmLpEaXMzicr3+3VxBLd+WNC6LtIKsucA3xBq5uWs9jbHG6qBLAcuCtgu4gKr5wgwtsIT9YAKaEqU53kJzrAVNjQKQjmRIR2rJ5gfZdnorh4YOuIeoQo4tx59jy/Hn3MYkA0pnoTgA5PkR9/NJTBKUuIgkuFgEkK0hxAf4AEn+u5IgFWmzGnKssyxvWsFVLWuIqJqnHh9VNXLlnOeqpsoBAtsBptv2H7SyWpUuYKandjE9tYvpTHWTjkzetAzwV898znsIUTGEPsT+8TP8n0O/on+831leGoHiSTAKPMduPsyL9GOS4KK0G1woAcR4H+JD3E2Sf1RrINJibSBBRI2wtv16FtZd5jljNBTlA/PvZE5NN/925FGeP/GUs4//CqdMCie5m4tRC9SUKGtmXcfyhpWkI7XTPtam3k08fvQROjJt5rGDwLdOagD5cp6nj2xm98DrTkjQc5A/AkaRnezgNl7mDCYJLjgvuBACiOCH+RAbSPKPoXoIN7iSn4ykuHXO7dTHGtwTSjAnPZcPzv8oGc0tzF0Dr/HTfT8gV56oDvgUNYKqNzXdOw0oztWzrmdd23o0JTrNg5jWe6qXdRvX8a7FNzLbIgB4vd6osmz7mW08e/QpZ7leMkmgTzBMP7fzC17iIpBAmXqTQPOC/0HuJsU/RlogXOeCXx+r544Fv0MynHK92pL3Dy74GC2JVs9BG2JNXNV8DUdH+ziXH5xRMlgVX2mylZNvr6lRPt7zh6xsugZVnubTJJZt6t3EnT+5k47aWazqWF6BkCFctOFfjtn0nYokOTl2nLJRRpJBTUF5nIgR5gO08BT7OMUF5gPnQwC/53+CFN+MtEAobYEvQ1e6i3d2vYuIGgYMDMm6Tsng8LljfOGR/8T6eetpTjR7Dq7KIVY0XoWmRjkyeoiSUXTvUTKwf/Y8GEhOGRiebe315zNoqsbdi/6U9kTnjAvovi33cc/D9zCvsZPbF9/kXLd4fANT3w3/MsmdrovW057s4EB2P2WjDJKPBBl+Rh9Z4cAztvMhgIwIfpJvRJohlHE9f0FtD+/ovAVFUZxrkwQCaKEwu87s4zsvbwwkAUBHspP5mYUcGT3ESHGoEmzJV3A+4ANJMV3wFY27F32aWbE2ZmobHtjAl5/5Mu9a/A6unbsy+BoDwHaWG95lsVCMtmQHB7P70TGVQElaJIhyHfAQpxm3Tj9jEsw0B3DBv52bpSYeUNOgtZhHkiSYXdPFTZ3vdGt0gqSKkp4vFfjXV35GS7yNJzY8EdzZY9lXXvlLsvmBwKuesg1gOo1FPvtEz710pebPaJ9sLsv7f/h+thx/nht7rmZxywJzRZWkz54OygcscXB3N2BgYoBHDvyMfClvJodlGN8PRoGdfJe1wARmNXFGtYOZKIAr+9exgDYeCtUQ0Vpdz6+L1nHj7FtQZcXdw95Z8o5VRaGnuZtHdz/OL/Y+wkeWfARN1QJPPCvexsv9z3uvRDx8lTgvVUxMbSvq13B1843T3wHoy/Zx6/duZdvpV/joynfTVd8OeOO8M49vXoKWRBt3zPsYa1rWciC7l4nSOIZvv2goSmuyjT2Du8yFMqhxKI3SyELm8BqP4HYrT9umSwC7hS8ERKV1/FxN0BZtN+O9Df76Oe8irIRdeZNcqbMlTcwFFFmhq76dzfufZeeZ1/nIko8EnjwTqWOiPMaR0YPOvkGhQBwkyb2Gmcj/7877I6JqbNoF2HuqlzX/soZxfYSPrrqdukTavUe/vAtje7ol3sY9Sz9La6KdWq2OidI4+7J7AvfX1CiJcJKjI4cBkFWQVChPcBndnOZ1XvXd0JQmT2Mb279UQJM+xlfkCIu0FvPkkgxhNczVbWtRlRAGOkg6BuYA7rQhWfPC+oZkhg9feRsP7n6Q9//w/WRz2cCLuLnt3WaVURKO6TsPkjsYVBmk6sPCzDIykbrplJtjD+1+iFQsyp2rbiMVjVecT7xf+9rtoSXeyj1LP+sh3Fiu4Ckze1q3xt2ZuSxvvNxR3VAaQnUg1fB1bmIVppMqTFP3pqMAdtyPcDs3K7X8Q7jRzEbti1jbdgNN8WYn0bM9QEz8JFEJxIROMohpUWqiSX7++mN8e+u36Wnooae+x3MRqhwio9XRO/CCx7M9yV6Qt0vTV4PrZ91GS6yDmZimhlFSwyiK7E1MfefyK2BLop0/WvqFCrU5PXqGF089Q0QNeZRCrDk0xpvJ5gYZLgwBoMShPAqGxkp6+T4zePh0KgLYcT/CQmbJPfxITZLSZrng99Qtoqd2kcs3MR4HjCXf2F7emKxlbmMHhwaO8p2XN7H91HbWz1vvyQsao7PIROrYee4Vz2EDcwCJ4ObiSeza5pvJROpntE9bqp1zhX5OjB0B8MbugGkDWNl0Db+34A8DQ01fto+njj1OSks46HnG1nFmJVrZn92DbpQB82np8jANzCPMTp7BbCCaMiGcjAB2sYaAqLKeLykxrtc6rNgjQSaaYW3bOk/M93hiwNjwjcX1MU1jWft8kODXe58MVIOWeAeZSD0HhndRMgqVXi0JylNl8OcPtpf9TtcfTFZWVe2yzAoG8/0cHz/sOY/nHq35lY3XcOe8PyBUpWFpc99m9mZfI6nFPTmDqAAGBookUxerp2/4gEl21dzfKLPaCPEgxz0vqVS1qQigAhqr6FE7+O+hegglXe+/vv1GNFVz5d0n/Z55YVrCO++X8La6JuY2tnNo4BjfeXkTQ7kh1s9b71xYS7yDBeml9A4+T9EoVJyjAuRqg2/9zS13TFZWk9ri2iuojdTz2rmtFaS0f6uaruXOeZ+a9DgP7X6IU7kj1QkgJNTxUJyx4ijZ/DkAlJj5mBkplhrb+TGuClS1agRwq3wQU27h/1OitGp21i/D/NoF5iPZYpz3ebQNit/bDTFGBhBAkgziEY2lHfNAgp+++jMODx3mfT3vcy4wGaqxSPCcqQR+Dz+PGsCc5CJqIw2TAjSZtcRns6T2CrYNPOcQ0/X8tXx07r+b8hhffOKL1KQixMKaU0ZBRLB/DbFGs5HICgVSCPRxWmnkZWM/fUzxxHE1ApiPcoEmr+dmtZ5Ph5tBiZqeH1bCrGlZiyIrFTFfbPMHKhqC/H0C/vzAv397bSM1sTgP7vgFR0YO8575IgnS9NQss0hQdK8lIB+YzrAgtZTmaHuVIpmeJUNpLq9bw0R5zAoJcH3LrXxozt3T2v/eX93L6u4lDlp23K/I6KxliqSgqRonx44D5vuR+jgYMrON7fyEKbqOgwggen9cvY5vKlFaIy2u9F9Wv5T6aIPjZUH1fie++qQ20Pt9YcG/riGVJh2P8/CuX3B09DC3z/WSYE3jTewe2sZISWwWD1aBak3EBgZ5fYIr6tZOC6jJLKrGWVJ7JevbPsD69g/Qk1429U6YbQr37/gui1q7Pdc1WS4ABjVamiMjfRT1ImA+Xl8ep5U6XjEOcIhJEsIgAjjer1zPamUWnxO9PxaKc2XzVYFgV00Eg0KDf5uAsZgf1KfSpGJxfrnvEY6NHuaa1hucGkJIDrG87mp2D/cyUjxXAXwF6FXygRO5A9zW8rFpgXUp7MtPf5mzxeO01zV5Yv1kY5sMITnEqbETgBkGjHEgRIfey0+ZpNvYTwCv99/Af1bi9Ijev6B2ERkt4/FaaZL4L25TjQSSbyyuF5fVJWpIRuM8evARnjzxKO/r/ggRxSZBmMtrr2b3yDaTBD6wp2wLkAxGy1lkWWJ+cvlFgnT6ls1l2fDgBha2zSYdS7ggi3mAJIDuq12kIjUcHT1MyVIBgHKOVuJsNg5zgiqhIKgl0CRAJ41yjHeoaRf8kBKiLdmOv3VKnLZbvvSA1iyxxc7fUubZRqpsRTOsFr7uhnZu7lnLgZGdfPjRdQwX3JbDqBLnswu/xpX1Nzjb4zt/1dZAdGrUOu4/+tWLhemM7BtbvkFZKtDZ0Oy5ZyOgjCvmre0WZBY6WKlpUMIgz+aTQART1c0PagjmJ4DT2xe+gnfJCsmQQIC2ZAeqrHpY6I9RTsuVEO+dnzgtzBOwHt96xxskg8ZkHTd0X8uBsZ387hPrGC56m4/vnP0nrKy7wdxfGKZSAE2N8bUlP7/I0E5t2VyW+56/j/mzOirKZLI8wP9rjDcTUkIOXkoS5BjvADRMVa9weHGB3eGjAhFquFlNWs/xW1lya7LN60n+tmofY/ExedJ+AalyH0ct/G37kk5NNMm1HVdzcGwndz2zjpEKEvx7VtbegNj2XlUB0GmJzuazPf+N1mjXxcR2WrbhgQ2Ml8ZY0tFVqXz+svSvk3QMw5xWZYXmeLNHBWSFpPpubsckgIpPAcQcwOnto53WyFL+PpSxXt+SIBVJ0Z2eT2AShTcPEL3Nk91Pkit44n5AG0FFzoBBJBShIdbIruFXePbsIyzLrKYu4j5csiS9mtpII68NPz9pDrA4fRV3z/kLUqGpn/C92LbhgQ38aMePuHHpCmqTKeeaxJ/YYjmVKmhqjGOjZvVTUq3X0qFU3s6jeN8tACoVQAFC4eVca0uIzaaWRBt+WQ6Sdn9y4mzvS2acMOFrIPKP/cs8BMMgGUmyouEq+iZ2cs+2dewb7fUU8MraG7mz49MV4cAermt8D3d3/QVRJX5xkZ2G3fvLe9nUu4n5LW10NjZ5yiyomuopC9+0/UtGkkRDUW8Y0FiJGQZC+MKAPSPKf1hKc5UcNuXfPlBay3gkyZ+QTGuoJmNVwoqna9cXGsRl8VCSK+uuB1nnT3esY/+4lwSram/izvbPIIYD0Lmz4zO8r+X82v8vxOynh+7bch91yRRrenqql5evzDzlblTuo6Nb3eaA7cRhmpVrWUZAV7HIBif+K3GuVAXvDykqiVDCcyGB2bXvwoPW+2OZv788cF9hO2cs5AhIOoqs0JO4EuQyf7ZnHQcmKknwufn/hKZG0dQofzz3H1iVuenSoVzFNvVuouvrXTy4+0E6mxq5fdWVhEOKe59TOEZQmXpqA4ZOQ6zRVYC4lQ80sBiTAHZtAKwZEOQfCCsac8XXudJarXUBwSaBp+uzYr3kW281+xrCtN20KS73bBsw9h9PQWFu5EoO61v5wsF1fLV7M3M0txWuNTqHP5nzFWu6u/oFT2HfOHAvug6X11zPFbU3kFSrP88I8PTRzfxs70NsfGUTA2Pmd4WumDeHFd3dpoAbunk/hiv6SJjP/gllYfjXC8vAXef/goqigR6nBzMRNL+6ZhWjTQC7+qdGbmGNJFmfX7MIYHt/hQl93J52fXF9NWIELRf6DwxrDALY/n4G3zUggYxMh7KCU/TypSPv4RNNX2NtzYecU1wI8AD/cGADPz+1iXIJfnD4PkolaAp10hTuZH5yOQklja6bn4s5nO3jycObKRWhVIJSERa0zWLF3DkkNM2SceH6rXEFGcR1/m3FeWsfWZaJhjQmiubrdtbn9BYwDQVQpRAZSTJZYxOgJlJjJRuCSYGTjofaFyjhI4hIGmu+Amyft+Pb156vIJ7dQYLCLH0ZY/pxvnfmL4nIGquS7+ZC7atHNvDYuU3Mji5EI8FQIUs2d47+iWMcHeljy2kv2KWieV9NmTQt6Qba6upJaFHLcw0TfKGwRPA992mTxFYFH0E8imGti4cS5neKMPsGJI25eAngKICdACpASEnTI9b9kSAailcPAVU8eSrwAo8RtE21bXGVImh7CZlEqR1JniBf8e3Xmdt9xz/Bv2U30RrqoUZqAkBT4jRFWzEyUCqXGMmPml8XNUDXIRrSiIY1ByxzrLtSLoBtz3seHRfDAFR6/CTz8VCCwdxZwMwDZJUEbhLoJIKiAsiAKoEih1zvlyRQJHnSHEAE2OPxwrSP1A5JnH2EXMDZz68Ovm09OUTAvlE5we/O+luWJq+tfu3TsH8+dS9PD/+YJnkBSaMRMxFzz4UBiiKTjqachXZ8xo7v9vZB4Avx3L4PT7xHAFdUBHzbCPtF1Ig3j5IgdDWLis8xgICYXwEUJclyewdJgngobmWnwYXjATfAWyu81Bc6hHt2AZS84PtDhD88VKgNUBuaxR90/D1t2tzgC5+mff/Mf+aFkYeoNbqIUGOWhQAcguwizNvy7ty7ALwhzHuSPd8xxSSwWsJXjRARJeyUmR3OZY0aplAABQlJDltYOUAYzlaemCvctz1dATpurK8AWDieowaSe8Me8MVz+kkgCdchQZs2l0/P/ieizudFz8/+99mvMVTqp0W+jHNY3czivRp4vFtc7sRuG1Dcafse3B3ce/DkAvYmvvTLOZZwLn+Kltdzbk3A+kaDoTvg299z8CiADCiy5Lb/SxJMlMfYMbiVlng7ddEGT2GLuIhEcCxINfwKIAWv89cI7GUi4J7trGOtTt/GB5s+c8Hg7xh7ittq70GTzRbC7534O7ZkH/EkbqJ3ezzZnvYD7pP/QO8OkH/7FFOGAGC4OMyJsaOM5IdNAljXJkmgGA7OTnAQOwckQDYkJNvzbYSLep4jo/s5nTtKY6yZWq3BfP3L9lapOvhOVi+AFujRUuW0eGx/juAfG8DtDZ/ktoZP+q9kxpbXx1kcv86z7Pda/pKokuDxgR+Z5xM9T/R2KokhzhriBn6wfaHE2U8SwDYq9zOAocI5zkycYiQ/jGF4yxOsedlxdgcBfwgwld8CwQ4D9uYFI8/x8cOczh2jTqunPtpMRAm7RxDHlfdfERrs4zr3KxBFbMioaPzxKUFMSfKh5ntZXXM7F8MicvCrYR9s+gxtkbl898SXPPE+aOyQIUAdwOv1YjgQQTWEYwR5e8koM1Q4x6mxExTKeQf4ivCLcw0VKKl4TTLjgBv/PYN1QJ0yZ/OnGSicpiaSJhOpIxVOe0hQ4eXCBYmyL3p10DZ+ZfDkBpjg3zv7W7RpM3ub93xtdfp2kOC7J/6mMnGzb8KvCL4cwOPR9j4EgO8nhHW+ifIEZ3OnGSpkKZfL3vYEUY2F5cLIQwJRARzvj4UhF0SAgGGklGW0nCWSD5OO1JEO1xJWIs5BxRAgXpMhXgouYfxVw4rEUyBBmzafP+v4Z6JKMhitS2Sra27HwHBJIEi6OFvh4fg8H3e/CqB94JcpMVIc4mzuDLnShNnW4Ae4QnKFScl0bLwkqFAAJAnKJa8HT4cIRaPA2fxJBgon0dQo6UgtNaFaVEnxeIoNpiNVkneoaP71XbK9fllyHb8/64tvOPi2ral5N2Cw6cRfOwCCEKfx3QMBUj6FxBsSjBSHGCoMMlwcchqZ/GXhmDhvKxGQCEPev61lgQSYGIFwvQuuByCmJkPBmKA/f5yzhePE1ATJUIpEKEVICnu8JNDrrQlP7LLvzZq+qfZj/E7TF4LvaIZWMHKEpeDvEkxla2reQ1tkAf/1yCcYL49U1NshwJvFexUUwl6vG2VGSsOMl0YZLQ5T0stuUjcNwJ1zipovlqfPAgkQ08zHRvyxXyRD0LqgIaePki+MMlA8QUTViCkJ4qEkMTXuuW6P3OMliH0nBrCh5e+4uua9wXczQ9szvoXD+Ve5JTP561qTWbu2gM92/L987cgGxssj3pVibJeClxlAUS8yVhxmvDTGaGnY8XRPMuyXd3zzAukkcVsDcsMzIAAAOkQjkCtVAdY+uZ8MU4aJHMPlHCP6WZSiQlSJEVXjRJU4EcsLA3MGCaJKks93bKRd6wm85JnajrEneezc/0RHp2yUubX2nvM+Vru2gM/N/g5fO7yBsfKIR379iR5WuJzQx5kojTFRGqOoF51vAgZ6OgHLhHPY66WAbQ0JIiqMT5sAMowMQYsK+RLTkv5pkcFXs9ApM66PMFEcQSqBIitElAiaEkeTY4SVCIr1fzEdWg93t/w97ZGLA/4ro4/x8MB9lChT1HO8MPIwE/ood9R//ryP2R7p4XOzN/KVw79fEQ7y+jgFPcdEaZy8nqOkF4O93LZpEEAMJfg83iGGRSjJ6pWUA14CqCSABVBI90r8pCDjIwPe7cV9qh3DoGwWlDHOiASUzDd+rkjdzOdnf5eYfHGSvX0TW/n+mb9CkVTLOw1K+hBPD/+EcX2YO+o/T0xOndex2yM9fHnur/nioTvYM/YSBT1PQc+5H4EWSCHJVH9vtwoBHG+3lSJgew8xrGlNoZJklgU+Jx4KgVqmEii8IE9X+icD3lGHgOHG2o/xd3N+cdHAP5zfyTdOfIIJfdQqJAkZGQkJHZ1/y36f/+fIBxjTh877HDE5yV91/oRZWhclcpOWh18VJ1PWqmWHsA2VWMXCMDQYzCmo9o0gCfLDoAqtxlOCWmWbKYcqhfD5jo18rmPjeQPht4O57fxl3y0MFE9QMooMlwYYLp1luHSWodJZJsoj6JR4feI5/vzQjYyVg79VNB1LKGm+2v0E3bHlMwK4KuDM0Klw16VjMG4ngQFoVyyyDzI0CJl4wMmovLDzSQirDQk1zd90PcAttXedNwB+OzDRy+cP3MBwaYCYYj57r1N2BsMah6QIUSnBntGX+ey+dYxeBBLMnYIEMx5gWljYyzTDbTsI8vaqBBgfhdpYlRNQ/QKrJo2T7GMPzZFOvjb3Ca6ueZ//ss7b9o/3cu+udeSKOZrCswlJEVQp5BkUYZxUMszSZrN/9FU+/fo6RksXRoKvdD/BLXV3XRDgM/F4Z3sgEoLcEKjWAz5BJhLAbMTKcUaSTNboo1bzYQCok7Fw2qogyP/c2HK+tWAb3dGL92buvtFe/uTVdeTLOdrjcwjLEQ/g/mkVcz6mJGhPdLJ/5DXueKGLvb6XTWZiCSXN59o3Tp8EBDvUdD1eXJaJwbmzoEwjCXQarsoT9AOEw3DqmKUCU50MYXnAzUxFhlvq7uJbC7aRUCZ/vHomtneklz98ZR1FPc/c9DwicgQFE2QbeEUEnhCqpFrrVOKhBN2ZOYwURvjUS+vYM3L+JABmRoIpyguE9VR3yoYEDJxxi3/0NQ7ga57wKwAYGJJksubMSZhV4ztRlZNPJzz4yQDw8Vl/w+cvYrIHsGe4l0+8sI6iXmBRYw9hRfPIvIpv8KiB6pAiGU6yqGkuo4UR7n5uHbuHLi0JKhwFrzNVSw495W6NUxqMnPHuVz7JCEJtErwKYAB64Qiv2ScoFqE0BjVa8IVVu1jwXWjQDUnwhc6N/F7zX19Qofptd7aX3396HfnSBJe3LSIia1VjftC84hlUUlqKK2YvomwU+PiT69iVvXAS3NP69aklPsDjq+YEUEGShiScPA4h6/U+Pe/8Ra2nI1IWFuiAXjjOSfsEmgYHdkNHpvIEgYoQxOgqN/WFzo1VM/1sLsvmvs1VPxtbzY6N9fGxJ9YxWhjl8o6FaIrmePNkQAflAu52Koki6nQVAAAZ5klEQVRwjJXdPZSlAu965HJ+emDTjK7Lb+9v+IxTxZ0sF5hWuVLpjJoKmbCp4CE7AczTj/flSCcEiAQoj+/iJNbJNc1kUUwxVWDK5IPKZUHLvzA7GPxsLsu9v7yXzH/JsG7jOjL/JcOm3ukV9nAhyx888X5GC6NcO38ptbEarzcHkCBQGRzwVWdekUJoqsY1PYtIajE+89QGfrxvetdVzW6pvYvPz944dfwPKkcCtsXdpj0DJ4+ZTb/2ssIgr+P9WJQBGDYBbFaUgVJxiN02AxUZThw1VaDiAvBd7DSY+876u7il7q7AQrHfmBVtwwMbpizMoUKWD/xiHXvO7eAdly2nLp52AHdius+zA0MAPmVAUAhUNFXjhiWLSUXj/OnjG/jh7k1TXttk5iGBWG5MraR+FbDnExFoTMCuVyEadbcpnvJ8LcyjAGA/dGJ+SKhY6meXfeBoDF5/FdJRqItPIkHWRUwWu5ojndzT9vXAwtjUu4lnTzzJosUat78nwwc/2MiVV9QQDsuThoKhfJb3PrCOXQM7eOfyFdQnMgJo/pjuBVWVwu4yPzkw5V+VVBRUJ0GMqhq3rFhMa10tf/TYBu7fuWkKmCe3W2rv4mvzniChpqfn8b5l/vk5dXD4IBTyrvxLEkzsZz/u18IqCGCzogQUi/0ctIGLRCCfg74D0F1vNg9PmYQIFywy+wudG6tW9U6MHeb6d8RZvCRGMhFCC6tc1lPD393xJ1X/TWQon+W2H5vgv3vVFTSkMi5o1tjv9SLgCmpFLUCxvL0yN1AtQqlEQxo3XbGI7pZGPvXIBj7363tnCLvXliVu4L/Od0kwE48X55uSUBOFwwcgnnD3LecYmNjDcUx8PV8LE0OA/f+0xf6f8ZwIXCJpqkBUhc6AUDAdRZgbW86yxA1VC+G9l99IJhNCkRQUFBRJpVNbwh8v+NvA7bO5LDffv47Xz+7gjmtW0liTcYBT/HV9VCaL/5MuxySTXSsQhxuvWMD89ka+seU+7n5w6lA1mXVHl/PfBBJM1+NtjEKK5f0HYKDfzN9sXAqneAUo4H4ixiGA4h7S+T6gBsRTl7MolKBZkkFVYXjIPOG8LhjKQ6GM05JnJxvOvDBtj+9s/g8sjK+uWgCNoQ66tCUMl8/SGOpkfeaTfKL5q4SkSMW22VyWd2xax+7BHXz0ppU0Z9KO1yuSiiwpFhnceVlSTXJJsrneWiZZ8+ZYNnsHJRlJksx+Qsmax3xhwh5jjee01nJuJMdjO5/lcPYw71t4/s3YtaFmVqXW88Tgv1Iwcp7nyjwPlYiT1kRPA8TD8MzjEA5BWHPXDb/GwxN7eR0YAsaAPKYSOM8D2CpQxGRKfqKPl6PNLJcASTElZe8umDsfljTDC8fMp1InY6WoCN2xqZt4r0zcxpWJ2ybdJpvLsm6jCf7Hb1vFrEzaBBfFBBrZGUuYoFpQIkn2Y7FSxXENDPOVbUlHxsD+8oaEjmSULfCt41jPqNuPXt12zQJS8YhTY9n4/vNv2OqOLWdufDm9Q5tBcjtybEUWH/TAMPv/mxNQH4dXt0FuAursvzyQoFxkYuDnPIcJuq0AZft8QUlgAcgNPM7zeokJ++SxOJTLsO0lU26WNttXNXlcQjLflz939rzLxDEb/N5TvXz4phW01GYqZDkohoux3Svz4YDqnyX1QhLoNBHjPZdNPEVSuXZ5J+uvncum3k2s27huxm0Y4j0e6O/zOtEkoSAZgbn1MD4G+3abOMlC/03uKM8DOVwCeP58WmwKtpPAApArnmUgf4LttkfLMiQScPwYHD8KGU1hfl3IczEQfLGjQ+Y/YVyIieC/d+0SupobLEl3QVAq4nVA1c+f8SNW/8S6vwi6AD5e4GVJRbbUZ8ncZtZf283mvs3nRQL7Hh97pm9yp7LmQzIsaZYIyfDic+bj/PEEHvUdepEncQlQwPcfAqICiATIAxODz/Koo+iSyS5FgS3PQrEoMTsVoiURrpqkiEr73W3fnVFhiGb/B68J/mIun9fugC8LwHjHQtImeL7iAd5VisDuYUQyqZ7jOSRAcRNXFBbPbead13Q71zxdEvSe6qXr6130nhKamicpV1WWWNESIqpK7N0NZ05DPGnlY1bRFwbYP7yVPZj/KWjHfc93AsUPRUq4XwoLAVr+BPn0KparcWrtxC4UgvFxGByA7rlhmmMaY0WD8XI5OCGUIT8Bz73aR2emk+XNM+vuvW/LfWx4YAN92T7e44AfqvB8WQBI9cu07alW8mcmgIq1TEaSFDPGW8meLEluzPckfjhjFw171s3Q6uuiJOMhth7Yxy/2/HLS/0QEsw3k1u/dSq6UQw3B5VdDxErixORP/JPJhXUadVGFwXM6Tz1hoKqQqhH2AQae5cfj+3gdGASGgXFMBw8kgHVX7vcCAQ2FfM0i88NRkmQSwACGhwxKRWhr0WiMRhnIFygaugO+WBMIRaBvr/l3KOlomtVt1WsDtm3u28yGBzbw7a3fBrnEXbevZF5bk9Aw4/N4MfP3jBWPZNvguySQ3cFOGu3EUQBfEtxP8gDvdqPaRDCAhtooHa1JntrxOvdv/yE3dN0Q+Be5Gx7YwBc3fxGAZBouXwOJGqrXAAy4rC7BrESIQkHn148VKRSgJu196rc0xrnD3+JfLPCzwChmKCgyDQLYn4yLTBxirHYlS0MJam0ShMNmS9PZs2WSSZWGWo3WeJKBfI6CUfaAL8tm2CiVzMfMHt3/KA/tfggtpNGZ7vR4Rl+2j029m7jn4Xv48jNfpi/bR2Ntgt+9dQWN6VRFEhZIBE8eoHhIIONXAdP7K8CXrEdFheqeU3fwgW+bIbkIGRYRolGFjpYEL+0+xP3bf+j5n+RsLsuaf1nDr/b/CoCmVtPztRiBHm+TYEltmtZEBAODx58YZ3BQJxa36v24+517nv81Yv6R5CDe6l8Zwfz1IQnrf4KANNAEzKpbx3UdH+IzosSXSmbbQCQicetNDdRnouiGwmvZfk7nRyrCgSzBa1vheB/TskhY5cpFLay9fI4Tq+3mWDFDdxM0xc0HrOmgaqEo5+btWtU/q+pnoKMbuvm8oKFTpoRulClTomyUKRsla7pE2Sha00VKwnzJKFrLzOWnB0d48LEDROUkdy2/CzBl384PFixW6F6koxsGhm5Wr8WPTRnW/JJ0PbNiGmWKPPN8lv0H8sgypDPebXOnObj7S/wtcAI4BfRjhgCbAJMqgD1WsL4cOtHHaHo588M1NNqAqtZfx+Xz0Hd0gvaWOMmYRlu0lpxeZqQ8UREOZrVJhMMK2UHQywRaJKywdH4jt147l/mzG4U4rnjlvmoo8KqBamXp4n4yQgjADQEe6bfyARDivi/mu1HfcBTA8wFnyZyKRhXaWmLsO3KWpw4+x5ZjW8iVcoTCEquujtLZLVvkc98bE2VflRRW1bXRGI2BpPPslnMcOJgDyQRfkhEghZO/5HsTfewHBoBzmN6f84MfRACRCJ5QkDvNmcwVrFFCqE4oiJhAFosGfUfHaJ+VIB6N0KLVEpHDnCkOecOBJFNfH6ZnUZTaTJh0TZhZTRotzTFam+KsWtbMO1Z30NVWSywSqUjuxFiv+kKBPV9RK3C2sZM++xiWKlitgHZLoN1gJDmxPgh8F2oEoG3gRTLYy6OawrzuBKfPTjA6VqKpKcyaqxPUN1rgS5YCibJvQE0oysra2aTDEQx09h8aoXfHMAZm0qcKr/YYBoweZOuxH/AzAfwhzFqA+Z+0PpvqfwOdWkFhgHKkkXC8gx7HqyWzs6hYgnLZoO/YCO3NKeJahPpwDY2RWk4WBtHRkWWsJlrT+0zwo7Q0x2ltTtDanCSdiFZk7/4s3wZQlHuxx85TO/ARQRZIJNtq4CSBkg98f9bPNL3eG07ED1vLCsydE2fpkiRdXRoRTbK2t7/5a3i8f1akllWZbqKK+Tey+w8P8cwL/RiGWd+34769fblAbv99fLM8wWnM2C96v90ANG0C2CSwVSA0tJ1TdVdxWThBRkzywhEzKSzrBn3Hh2hvThPXoiTUOB3aLIbLY4zrOSf58gMoVs1E0PzeL3u8OiAM+PoAKmsFbvXPTgLtmoDTbOwkfJI3IApQEwC8+N8+nm/5B/6rivuBbN2SfvfjzyZMS5PdLEl2Wiqk89TWo2zbOYCBWUWMxyv7B04+wveHtrMD0/v9Vb/AF9GmQwBP1XDiKCdqr+IqRbVCgWySIKJBsWCS4NDxQZrrktTE40QUjTlaBzIyA6Wsr2NGaEgR5VlYXkECD0GUimWqH/yARhxXBVQn7tvgS3Yzmo27WM2TROH3AlwBvufvcfxfUw9YZg01apJr05czK1KHrR5Pbe1j3+FzYJiKm7DflHNTBob380rfRh6wwB/ArfpVJH4zIQAIn5AD1MIgJWTG0gtZJoYCRYFI2HyQtKwb7D/aTyoepSFdg4xCU7iJtkgrY+UcOT3v9X6nquaqgev14jJBKXwkEGO9Ox3yTKsB1UFZqPKJPX0er5fsYnahrvZ/SaYS+IH1en3Q5951dBbG53FVchmaHMJAJ18q8NDmHRw7PQSG+YKH86ciuAqQP8epfd/kf5YnOIPr/SOYsb/IJH8fOx0CgDcpVEf2ci7aRizRSpfYBayoLgkAjpw+y9hEntaGekJKmJgSp0vrJKEmGSxmAUnIxlUf+CLglR4te8jjzxG8iaG/YchJAiUZCTcJND1esiqHVul6EjybEK5nI3q4JALu83LJBdpPgPpQhuvSq2kJNzrHGBga5uFntpMdMb8HFNHMvhj32nDi/qHv8Z3RAxzA9f4hTO+32/4DvX+mBABXDdTBlzhacxmzovU0i02/imLmBEXrnfSB4RGO9/fTXFtHXIsjo1Cr1jInOgdVCjNYygrxvJIAsjiPTx2qJIqBahBQmzCVQPZl/VbZerzelvVqnu1rR0DHoBxADK/Ha4rGisQSLosvwPyWkpk0vnrwEI++uJ18oeTKfkJAQVCAQ99n49nn2C6Afw631S8w8TsfAojmkCC7i2MNq7hMjZEQG35sEpStuv5EIc+BU8cIqSotmUYkFEJSmMZQI51aJ2XDYLQ86ni27FTZghVB8bXoVUsUvWoQQlQDJ/mzQoCD/jQTvGnJuhRABspossZl8YWsSCwlocScdSMTo/xy6wvs7DviwBaOWD18DjNd6T/+K/73cbOv3wZfTPxs6b8oBBAP4iSG5XGM/q3sqV/FonDcJIHY/Bux2gnMT5rpHBs4xYnB07TXtaCFosiSQkTSaIm00hHpRJYUxvUJJCs0eIG3QRPb9qsoRpWqnx0CxAdCnKqfkOwFZfCVkl72eLMfZJcYZWebhJpgQWwBlyeWklKTznag09u3i8e2beHcyKgDcjxuPpQLQrOwhcaxX/JA34/YbAF/Flf6x5iG9M+UAH4S2ESQy+PoZ19kb8NVLAzHSIiPgtm1AzCJIEkwmh9j+5GdyJJEU7KRkBIxiSBrNIWa6dS6Sao1jOpj6IYu9NoFqAGVBPFsI7T42YSQqn4SQXKlHiNAtqtLugtyWaCEO90SaaEntpAFsQWklKRDHtA5M3yWX23fzM6j+yiVdadkUzVux5tT8hYxjv6cBw/9iCfxgi9m/Z4On8lspiHA8I1NEkxQ7n+RPY2rWRiKkXD6ACwihMNmBlsuW/Ihw/FzJ9h3Zh/RkEZjcpYj/aoUokbN0KXNpTnSiiKFmbD+8EH2qYCdPMqSL1eoIIFbxazs/sC5leA473q3KevBIOsiCSSdhJKgU+tiWWI5zeFZRJWI55jDE1me3PM0T7z+NCPjoybtDLNlL5WqbN61FeDIz3nw0A95ElPu+/GCb8f9KaXftgshgCcslCfQz7zAnqY1Jgn8nUGKaoUEq8NClqFQznPw7H52nXqNaChKU7LVAVNCQZNjNIabmaPNJ6XWoskxSkYJHcMlgtO4U23wtv1PapJRBVQfwFXW16gZ2rVOemKX0anNIaWmLLq5wOdK47zUt4XHdj7Kyexpx6slyWzZi/n+vlCU/r6HeejgDxzwbc/3V/mmJf3OLU93Q2F7CeuBESABZIA6oB6oj9Qxa/GneX/9ZSyt9qRwsWB2IonLZRnSsQzXdt3E0ubVKJgvbci+FzxkQhSNEudKg4yWhsnpE5SNkucZP/GZP/fxr7AVAqrfctkoUcLuyStYvXm+aQrOsriSIipHSSopkmoKGYOytb/ZM1hEt6bP5c7wzKFfs+NEL7puOoLd66cooFl/0lXRC2hAcYL8gf/FA0ce5AVczz9LZWuf53GvS0EAex8ZLwnSuCSoAzJL/4zbWtZynSyEAhFwMElQKprLZOHjULFQlJVt61jWfA0ZrdkigEkIBYsUAjGKRomSXmJUHyZfNsPFeHkk8IVQuUoOYGAIXbgmePa03cIYkaOoUgjNAt0Eu+AB2iVAAZ0iu89u49VTW9jbv9Ps6tW94EY0K9bbhDC8JMgPM7TjW/zg7IvswfV8G/wRvEnfjMC3wTwfq0aCWkwS1ALpOXewcu6HeW8oSsSvAnZ40MtQKJg3ayuBqAqz0z0sb7yOhXVXEVPTPgKEPcqgCMvtbcbLw8768fIQslSFAIZBmZL5QIQcpWwUnaeBdQFUB+wKTy840ydHD9B75in2nO0lOz7geLquW2PMZ/dD1pf2xT5/kQQjRzny0hf5Xn6A05j1e7/s+zP+aUu/COT5mp8EcUwS2CGhFkinF9Cx7NPckWqno+JFEpEIuksEWdxOdhWip24VC2vXMCe1gtpI67QIYKuEvX4y0ylTNiwwBYB1D9iFQAKcHNvLtjO/ZvfgS5yb6DeBLJuAOgCXQQmZSbF9z0HA6wYc/hW/3vktHses2p3DBf4clbJ/XuDbIF6IiSSIYJIghUmCWmtIA6klf8wN7TeyNqwRmQ4RDJ8iOGSwxi3xbrpSK+hOXklLbCF14dmVZLDBt3IBRar493SP6UbJATYQdAH4gyMvcmJ8DweHt3FoeDsTxTE3totP9VjToZD7EI0YAvwkGD/DmVf/Bw/1v8h+TPAHhSGLm/BdMPg2gBdqYm9hBPNxsiSuGjgkqJlP65Wf4/2pDtqDwBc7lwzDfM7Abj8QQ0NQqIipSVrjPcxJrKYuPNsa5lAf7vKQolo7gIHheLbuPN5V5PjEdsbKgxwYfY6B/DEG88c4OPKyK+eGIO0+8MEEXrEqH5MBX8yRP/UcL738VR7DBNn2fBt4u33fn+2fN/g2eBfDxNpBGIhi5gUpXCKkgRogcdkGVnfdxlotTaoaEeycAStPsAvXIYOoCMIyf/iQJIirNbRGl+E87i109tn1b/OfPA103WCsnOX4xGve5/MEcHXfvD+5U1RQrS9z+aU9KMsf3MO+bf/Er4b2chwv+FlrbMd7++UO+23uiwLcxTKbBOJLpjFMEtTgEqAGSEbrqVvySa5tW8uVoagZFsQaQ1DCaCeNZavwxHUeAvjChv8Y9gAuCEYAUBXJm58A1jQGyIp7/qCY7gAvTGcPc3Tvj3nq8KPsxvTuYUzws9YwbC0fp8qLHRcDtItpTj8Bbl5gq0ESLxGSQCJaT2bpv+PqDj8RAtoP/GohFqaBALpPJZzjWFfn/2q2SIAKma4i7dWIVJHYBQA/eoozex/k6b3/yquY4I7ggm8Po3if5Z9RC99MALsUJuYFYdwE0Q4LtiqkrGWxaCPpyz/F1bOuYkksQ8oPeiARfKoBeBqpJeEO7SZop9NPuHMbPAyv59oJm52T2J2GQTKu+5cFqEC2j6O7f8RTBx9hH2Yst0G2wR/GJIMd68U3ei843gfZpSKAfWw7JIi5gZ0kJjEJYE/HrXXask9xxewbWFLbRftkNYbpqoVt/n/g9JvdRG1Pz8SrqwFfmCDfv5N9r3yLJwd3cQbTo8cwQbY9fwQ3zoux3n6V+6IDb9ulJIB4DlsNxLAQww0NSWs6YS2PAlr9IhoXfYTlbatZHKslFeT18hREkC7gDqcCvlpSp+vQ/zr7j7/A3m3/g1cwAc1hyr0Ivu3tfuAvqdeL9kYQwD5PUFiwG5DswSaBrQZRa7tI+1raut/JglmXM6+mlYY3iwDVkrv8OPlz+zl6dAt7d/+U3eP9zps4OUw5H8MkwKgw2MtymMBXfMPnUtsbRQDxfHZYcN5Cxm0/iOElhL1Ms4YwEIo1kZy7ns7WK+lo7KEj1ULDZDWH87GpQkBhgvzAPo6dfpUjR56j78hTzkeYCtZgA297vQ3+uDVM4ALv/3bPGwI+vPEEEM8r49YW7EYkOzzYISKKSQR7mU2WsDXYJFIW3kFXpoNMqo2apsW0h6NE0u2mUpyPieCf3c+xwij5wYOc6d/FqeNbOXVmBwNYH9USBtvjRfDHhWkbdFvq/R7/hgFv25tFAPH8NhFUvOHBDhEaLgGiwnKRCDaJFN8gA9LiD9Jp9wNnOkinWqmpuBAZo+9ZjmKBMDbAxKHHOWXNl31DCRd02+NFufeP87ig28C/KR7vtzebALaJocEe7JqDTQi7cSkSMNgksIkgkkH2Dfa5EMY2ADYg4rga8LbHBw22tItJnejtbzrwtr1VCGCbmCzKuLmCLfUi0GG8CiCuC1IEkQD2WDQ/+H6vt0G0AS34BlER7G2LvmPYgL/pwNv2ViOAaNXIIJJCJIeTDxAcDvxqYB/fEAbdN/i9XxyKvrE9iPvovuO/5eytTADRRDLYocImRbVBJE5QGABvCPBLv60CIhHs6SCg7XX2/vZx39L2m0IA0UTw/JIeBLTf4/0EEGXZrwZB+YBfKfz7/UbZbyIBgkwEtNoAOA8DVLvvIDBFb/Z79m8c4H77bSHAZCZVma5mRpXpt+1te9vetrftbXvb3ra37W1729623wL7v6nsIzvU9QXPAAAAAElFTkSuQmCC',

'g10Icon' : imP + 'R0lGODlhEAAQALMPAJlVBnJFB8t/C2VNMqtuDemmB2M8B6+addPGtKdWBpZPAYhYFZxgDYlZB4lHBQAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzIzNUQyMzg0MERDMTFFMEI4MDJGQzUzMUU4MTUyMTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzIzNUQyMzk0MERDMTFFMEI4MDJGQzUzMUU4MTUyMTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MjM1RDIzNjQwREMxMUUwQjgwMkZDNTMxRTgxNTIxMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MjM1RDIzNzQwREMxMUUwQjgwMkZDNTMxRTgxNTIxMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAA8ALAAAAAAQABAAAARp8MlJq60LgDsRyVpwaYqiaY5FmkmCLhQjEFoLuIAoLUJPnyGD5NArAgOGpCRQaPYYocEgoGtaBdSAdNqQEKwFrGE7ZXi/STG5QZAIAASqWnoItB/YeEB96NvddkgCY30HCB4TfxWHCBMRADs=',


'g11Icon': imP + 'R0lGODlhEAAQALMPAKCVb1NBLfrOA4hSBdPJnKupjJZuJX9lN7p3BubELYmGRMC1isibFeqoBXeUDgAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTIxOTcwQjg0MERCMTFFMEI1M0I5MTBDNEM1NTM1NUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTIxOTcwQjk0MERCMTFFMEI1M0I5MTBDNEM1NTM1NUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMjE5NzBCNjQwREIxMUUwQjUzQjkxMEM0QzU1MzU1QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMjE5NzBCNzQwREIxMUUwQjUzQjkxMEM0QzU1MzU1QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAA8ALAAAAAAQABAAAARp8MlJGJkYkyR6upnEdWTDhAszdiYSPsBxFIVhAEBoG3OB4xkewUf75ULDA4FgfA0BSx8QGQgQFtLDACQBGKqBhcIwKJeP5OrOXK5KyKTBAdEGTwAsOQIBDmgSCWIODnsBBS8SBQqLXA8RADs=',

'checked': imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',

'editbookmark':	imP + 'R0lGODlhEAAQAOZ/AP/x5P7z6v7t3/SdBv/8+fq3hv/lzv/69P/cvP/17PiYUffYS/VuCfpzBfhuAfV5HfVqAffZhf/Fkfq8jvmqcf/7+f7p2PZ/KfV2Gf+3d/K/NvVqBPeuKP738fu+j//+/fZyEP/38f/Djv+cRfngqP/38PVzE/nplfbcb/+zb/isMf/Hlv+9hPXaZvTCSPTRYfnWZfeCKvXHWf+4efq6jPffefp+HP+gS/WcEfXTav/o0/jhiPbcaf+MJ/7IkvrbofVxEP/GkvXUJP/Qpv/TrPyrVfLMJf+uZvfQPPfhZvmwevz03P7v5P7m1P/Ytf7ox/PCQvadIvzJovLLQvjNTvnaafjWUvveqvjaU/G4Hf/XtO/DHP1+EPixNf2gUfu5XP+oW//jyv/kyvzln/2xcfZxEPdvBv+SMvqdMPSYFPafF/u9jPjUX/XMLf53Af+8f/qHKvnnifvqw/SeCv7q3P+JIP/u3/+fS/nWbPnfo/vuzP7uz//Il//LnP/o1P///yH5BAEAAH8ALAAAAAAQABAAAAfYgH+CgwRBd3aDiX8fJYs6TiIsBH8Jk4IJWnxhRAgAe24jK2deAoIARwB9Fno5UzVPEmNmTYNDGSdQUSBlaRpJHBSJGWIaGxMBARMbWW0xlwYpcg4TiR4OLQ5rATdvBi8gHYkhXBFVag82aFRbQOGDB3URC3MmAVIMRhAeiQg9KBAFLAiCg8dFAxEhDhiQ8IPNhURkvsSRUQTMDB9XlqhQMshPgwUckPDIQ2IHjC5CMAj8I0DBAwoXIGCxguMCBQYKSgkiwORPhQIDBtCo8IeOJUUsMTxwlygQADs=',

'addbmspacer':	imP + 'R0lGODlhEwAQAOZrAP/+/f/8+vZrAPumZP/59f/7+P/JmP+SMf57B/x0APhuAPmAIf7r3fuiWvlvAP/69f/Gkvy0ef/BivqCIv727/+rYf/Ej/3ZvP/Ci/2qZ/dyDPdxCPqRPvumYv56CP/s3f6RMvytbPulYv58DP/t3f95AfqmZ/+JIP/9/Py8iv6nWv2NLvp+F/mIL/+EFvmKMv/hxv+aQPuxeP+uZ/VrBPqtcf/Sqv/GlPyqaP/69v+oWvhxB/uyef/Aiv/48//17f61ePxzAP/p1f/27/mrcf2QMf+MJv/27v7s3f57CP+LJPqpbf/Ytv/48vdtBP/9+/dsAPhyB/3Kov/79//59P/Wsv+CFP7n1f3YvPqILv/t3Pd4F//ewf3l0/+fSPyUPvt5DP/VsP/48f2pYv6vbfhzCP2HIf+IH/+mVv717f+wa////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGsALAAAAAATABAAAAengGtrDwYSgoeIYTZihwU3RVSIkjkzFk1rAEwuPpKdDxUYAUdeIZ2mBgcfECMXpp0wVjhKWVcorodPQisLHiKYt4hjGwgNaydnQUBVMSUJJGhGCV9rKjvEaw4KAjJSDlACDBPaHGs6UUkdwJJqZWYtXeqCWgcLGRpY8WtcYCZINEv5yDhhEKDGFgLqprAgEmDNkAEvEAIwVQDEAAqHfvBIcatHhDSCAgEAOw==',
'addbmthispage':	imP + 'R0lGODlhFwAQAOZ/AP/69v+rQ/l8GPV+AfaEMf/RlfqKL/2qDP3Zvf/Kmv6SMvuuI/738f/x5v/kzf/m0vacBP/48v/PgPlxBfumZf/v4f717fu7i/dxCv/27//HlP/BivWRAv/GZv/59faEA/mscf/8+vmlCP16CfyMBf+1MvzHnv/BW/ZsBP/Fkf6ubf/Ytf+DFfulYvuzef26RP7n1fypZv///v/s3f7q2fqhWv/9/P57B//Sqv+zb/mAIf/fwv/69f/+/f+6ff7dwv6mWv2HIf6zLP/VsPvLqP+sYv/Oif2taf+fSfZ/JvigBvR4APicWPqpGf+LJP6/VPuWB//UpPmna//coP/frP/79/mvef7r3feNQPSMAf/juPy3gPhzCPeTSfyWQv+aQPyhL/7z6vmeDPvBl/qpbfusbviECf2qaPeiEvqmH/2pYv/AdP/o1f+uZ/6jNP+oWv+zXP/hx/zRsfuTHP7Xtf/Ylv/Lc//Ej//NoP/Ibf+/eft5DP58DPq4h/+9gv///yH5BAEAAH8ALAAAAAAXABAAAAf/gH9/PAkbgocAFRmHgkM4EYdVGgqQjBU+OIx/AG13kD0rLJWMO3pHNpo8RRshGUgqmn8NGkYCP7EJCjMafAiHMiFVO1F1YDEVHj2HcSxnTgYwIQ8PDjsreFp1JyNfPikadCFsBjojLX8efgFwawVUUxIdTwFuc2ZlkGoYNzWCHlsT0rzIY6fDiRcL0HwAwUAQkAn8EPVBIWZBiRJCmkAYYKWhoDdcbpxD5ILEgZMHlHyQ4lFQDi5BDDxglMCkiJtKBlywpEDHGQy+BFXJAUUEhwEcIGRhEubQjj0UZqAgc6iBl41YxnRZwoEAjUMqUFwJAUKAB0EOMCQhYuFPBjkEKZbc+lNFAIgQbikYOEvDRANNFkzAoKuAwiJBFlzs/IMqlg1lG1y0/RMIADs=',
'addbookmark':	imP + 'R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==',
'bSave':	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC4AAAAUCAMAAADFhv/OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAIDBAMDBgMDhwMEBAQDhwUFBQUFhwUGBwEDigMDigIECgIEiwMECgMEiwMFCwQDiAQECAQEiQUEiQQECgQEiwUFCgUFCwUFiwYFiwYGiAaWqOYHiAcHiQQFDAUFjAUGDAYGDAYGjAYGDQYGjQcGjQcHDQcHjQcHjgcdAAcICQgHjQgHjggIDggIjwkIjgkIjwkJDgkJDwkJD/oJjgoJj/sLjAoKDwoKD/oKjwsKjwsKj/sLDwsLD/sLjwsLj/wLj/ysrKzMzMz8/PwMDQwMjQ0tLS2NjY2tra3NzcwMjgwMD/wNDg0Njw0ODw4ODg4uLi5OTk5ebk5ubm5+fn6Ojo6enp6+vr7Ozs7e3t7u/t7+/v4ODw4Ojw8PDw8fHx8/Pz9PT09fX19vb29/f38Pj/+Pj4+fn5+vr6/Pz8/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfr7zJgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAFpSURBVDhPlZNrUwFRGIBVJGldFosuNsVqY4mEaimUS5uE3JLWPbb+/1e9i+qcaZrR8+3M88x75sycVzEF2KWQS4UcfywFy8r5kjFMlNjfeSLB8xfRcDAY4LweBrt2ADn7jsMLp4tmSNvtqJP6TRZyCYMXTub58NWxasNU7wlyaYJxLnCLuq33UZjqliCfTMYoUeFoPrtd0DEUpsRHyMdvI5SwIL9Pru+1LgpTrSLkb6MBSlBwLeo7jdOEqVk+6vdQAtdXh/u0Q6/Tapw0iamGnA+6HRQuHo+F/JyPcTtpK4mpeh7yXkdE8V7GQmpgY5u2WoyYquUg74otFA/MViuUhYddi8VsxFQ1C7n43EBhzvycWrn30j4mzIQBNfVSBvJmvYbiDnFbK5HIze06QWyqUFPKQj5lq5Vy5YedAxtFUSaSNBoMqrXKtysXc+nZjyzm/wI12UwqJeewHpl0CgE/fYlkcr4e/1q+T12HLuCJR4bvAAAAAElFTkSuQmCC',


'cranny': imP + 'R0lGODlhEAAQAPQUAD89Q6ugAP/yAIxiOTs7PYuobm6zMmy2LMnKzILGM5HRRipvCVJPWT52FnavMiUkKBtJBXx4fGA5E8zLzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUAABQALAAAAAAQABAAQAVsICWOo+I4DTmtUxQxDABIUE2OydkMdbMskdYrJgg8jo/bzXRCNXwjFqLQoEEGixrLBSMcZQASmOEtJpVo5uGZUiqYhgbEt1jqJLzrT8QSRmgSWVpbQ2BhUSuFAUYPMiMuXAAEZkdKYEcCaBQhADs='
};// End of images by Qusai Abu Hilal

/*********************** common library ****************************/
// begining start point

var noGM = /Chrome/;
if (typeof GM_getValue == 'undefined' || noGM.test(navigator.appVersion) ) {
	function GM_getValue( key, defaultValue ) {
		var cookie = document.cookie.split("; ");
		for( var i = 0; i < cookie.length; i++ ) {
			var oneCookie = cookie[i].split("=");
			if( oneCookie[0] == escape( key ) ) {
				var value = unescape( oneCookie[1] );
				return value;
			}
		}
		return defaultValue;
	}
}
if (typeof GM_setValue == 'undefined' || noGM.test(navigator.appVersion) ) {
	function GM_setValue( key, value ) {
		lifeTime = 31536000;
		document.cookie = escape( key ) + "=" + escape( value ) +
		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
	}
}
if (typeof GM_deleteValue == 'undefined' || noGM.test(navigator.appVersion) ) {
	function GM_deleteValue( key ) {
		document.cookie = escape( key ) + "= ;expires=" + ( new Date( ( new Date() ).getTime() - 1000 ) ).toGMTString() + ";path=/";
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
var useDOMs = typeof window.localStorage == 'undefined' ? false: true;
function RB_getValue ( key, defaultValue ) {
	if( useDOMs ) {
		// alert("HERE YOU GO TO useDOMs" + key + defaultValue);
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

// Modified functions to solve capital name issue
function new_getValue ( key, defaultValue ) {
	return RB_getValue( crtName + '_' + getUserID() + '_' + key, defaultValue );
}
function new_setValue( key, value ) {
	RB_setValue( (crtName + '_' + getUserID() + '_') + key, value );
	return ;
}
function new_deleteValue( key ) {
	RB_deleteValue( (crtName + '_' + getUserID() + '_') + key );
}

// general functions
// Used taken from center numbers
function $ib(node, rN) {rN.parentNode.insertBefore(node, rN);};

// End of Used taken from center numbers

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

function $a(iHTML, att) { return $ee('A',iHTML,att); }

function $at(aElem, att) 
{
	if (att !== undefined) 
	{
		for (var xi = 0; xi < att.length; xi++) 
		{
			aElem.setAttribute(att[xi][0], att[xi][1]); 
		
			if (att[xi][0].toUpperCase() == 'TITLE') 
			{
				aElem.setAttribute('alt', att[xi][1]);			
			}
		};
	};
};//Acr111-addAttributes

function $c(iHTML, att) { return $ee('TD',iHTML,att); }
function $e(nElem, att) {var Elem = document.createElement(nElem); $at(Elem, att); return Elem;};

function $ee(nElem, oElem, att) {var Elem = document.createElement(nElem); if (oElem !== undefined) if( typeof(oElem) == 'object' ) Elem.appendChild(oElem); else Elem.innerHTML = oElem; $at(Elem, att); return Elem;};

function $em(nElem, mElem, att) {var Elem = document.createElement(nElem); if (mElem !== undefined) for(var i = 0; i < mElem.length; i++) { if( typeof(mElem[i]) == 'object' ) Elem.appendChild(mElem[i]); else Elem.appendChild($t(mElem[i])); } $at(Elem, att); return Elem;};

function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);};
function $gc(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByClassName(str); };

function $gn(aID) {return (aID != '' ? document.getElementsByName(aID) : null);};
function $gt(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByTagName(str); };

function $t(iHTML) {return document.createTextNode(iHTML);};

function ajaxNDIV(aR) {var ad = $ee('div',aR.responseText,[['style','display:none;']]); return ad;};
function dummy() {return;};

function offsetPosition ( el ) { var oL=0,oT=0; do {oL+=el.offsetLeft;oT+=el.offsetTop;} while(el=el.offsetParent ); return [oL,oT];}
function toNumber(aValue) {return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));};jsVoid = 'javaScript:void(0)';
jsNone = 'return false;';

function formatTime(secc, aFormat){
	if( isNaN(secc) || secc === Infinity ) return '--:--';
	var ht = secc < 0 ? "-" : "";
	var sec = Math.abs(secc);
	var h = Math.floor(sec/3600);
	var m = Math.floor(sec/60) % 60;
	var s = parseInt(sec % 60);
	switch (aFormat) {
		case 4:
		case 1: var d = Math.floor(h/24); h = h - d * 24; if( d > 0 ) ht += d + " "; break;
		case 2: h = h % 24; break;
	}
	ht += h + ":" + (m > 9 ? m: '0' + m);
	if( aFormat < 3 ) ht += ":" + (s > 9 ? s : '0' + s);
	h = null; m = null; s = null; d = null;
	return ht;
}

function toSeconds(hTime) {
	p = hTime.split(":");
	return (p[0] >= 0 ? 1:-1) * ( (Math.abs(p[0]) * 3600) + (p[1] * 60) + (p[2] * 1));
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
/********************* Qusai Abu Hilal *****************************/
// Starting function

function T(name /* arg1, ... argN */)
{
   var s = t[name];

   if ( s !== undefined ) 
   {
      // try to expand arguments substitution
      if ( arguments.length > 1 ) 
      {
         var args = arguments;
         s = s.replace(/[$](\d+)/g, 
		function(str,no)
		{ 
			return (no < args.length) ? args[no] : str; 
		});
      }
   }
   else
   {
      s = '---';
   }

   return s;
}

function $Qat(aElem, attributes)
{
   if ( attributes )
   {
      var xi;
      for ( xi = 0; xi < attributes.length; xi++ )
      {
         var attribute = attributes[xi];
         if ( attribute instanceof Array && attribute.length >= 2 )
         {
            var name = attribute[0];
            var value = attribute[1];
            if ( value !== null && value !== undefined && value !== "" )
            {
               aElem.setAttribute(name, value);
               if ( name.toUpperCase() === 'TITLE' ) 
               {
                  aElem.setAttribute('alt', value);
               }
            }
            else
            {
               aElem.removeAttribute(name);
            }
         }
      }
   }
} // Qusai Abu Hilal-addAttributes

function $Qe(aType, attributes, content)
{
   var node = document.createElement(aType); 

   if ( !(attributes instanceof Array) && !(attributes === null || attributes === undefined) )
   {
      content = attributes;
      attributes = null;
   }
   $Qat(node, attributes);
   if ( content !== null && content !== undefined )
   {
      if ( typeof content === "object" ) 
      {
         addChildren(node,content);
      }
      else if ( content !== "" ) 
      {
         node.innerHTML = content; 
      }
   }
   return node;
}

function $Qa(iHTML, att)
{
   return $Qe("a", att, iHTML);
}
// End of function by Qusai Abu Hilal

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
	var xy;
	if( ltr )
	{
		xy = txt.match(/\((-?\d{1,3})\D+?(-?\d{1,3})\)/); // correct
		return xy ? xy2id(xy[1],xy[2]): -1;
	}
	xy = txt.match(/(-?\d{1,3})\D+?\((-?\d{1,3})/); // Right to Left
	return xy ? xy2id(xy[2],xy[1]): -1;
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

function getTTime(dist, speed, arena, artefact) {
	speed *= artefact + 1;
	var aradius = ver4FL ? 20 : 30;
	if( arena > 0 && dist > aradius ) {
		return Math.round((dist-aradius)/(speed*(1+arena*0.1))*3600+aradius/speed*3600);
	} else {
		return Math.round(dist/speed*3600);
	}
}

function getUserID() {
	var uLink = $xf("//div[@id='" + pageElem[0] + "']//a[contains(@href, 'spieler.php')]");
	return (uLink) ? uLink.href.split("uid=")[1] : null;
};

var initRes = true;
function getResources() {
	if( initRes ) {
		if( ver4FL ) loadVCookie('vPPH', 'village_PPH');
		for( var i = 0; i < 4; i++ ) {
			var wholeRes = ver4FL ? $g("l" + (1+i)) : $g("l" + (4-i));
			if( ! wholeRes ) return false;
			if( ver4FL ) {
				var rt = wholeRes.parentNode.parentNode.getAttribute('title');
				if( rt ) {
					income[i] = parseInt(rt.match(/-?\d+/)[0]);
				} else {
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
			wholeRes = wholeRes.innerHTML.split("/");
			iresNow[i] = parseInt(wholeRes[0]);
			if( resNow[i] < 0 ) resNow[i] = 0;
			fullRes[i] = parseInt(wholeRes[1]);
		}
		resNow = iresNow.slice();
		initRes = false;
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
	if( loadServerTime == 0 ) loadServerTime = toSeconds($g('tp1').innerHTML.match(/\d+:\d{2}:\d{2}/)[0]);
	return loadServerTime + Math.round(((new Date().getTime()) - RunTime[0])/1e3);
}

function getTimeOffset () {
	return (new Date().getHours()) - parseInt($g('tp1').innerHTML.match(/\d+/)[0]);
}

function absTime( time , stime ) {
	var serverTime = stime || getServerTime();
	var tTime = Math.abs(time) + serverTime;
	if( Math.abs(time) < 86400 ) if( tTime > 86400 ) tTime -= 86400;
	return tTime;
}

function $eT( tO, time, ft, att ) { // tO-type of Object, time - relative time, ft - time format, att - attributes
	var tTime = absTime(time);
	var dstr = tTime > 86400 ? (new Date((tTime+getTimeOffset()*3600)*1e3+(new Date().getTime()))).toDateString()+' ':'';
	var att2 = [['title',dstr + formatTime(tTime, 2)]];
	if( att !== undefined ) att2 = att.concat( att2 );
	return $ee(tO, formatTime(time,ft), att2);
}

function showRunTime() {
	var ltime = $g(pageElem[6]);
	if( ! (ltime) ) {
		ltime = $ee('DIV',$e('BR'),[['style','position:absolute; left:5px; top:2px; color:black;']]);
		document.body.appendChild(ltime);
	}
	RunTime[1] = new Date().getTime();
	var timestring = $e("span");
	var fts = " RB:<b>" + (RunTime[1]-RunTime[0]);
	fts += "</b>/<b>" + (RunTime[1]-RunTime[2]);
	timestring.innerHTML = fts + "</b>ms"
	ltime.insertBefore(timestring, $gt('br',ltime)[0]);
}

/************* CSS & ID *****************/
var allIDs = [ // vip1
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
	'FreezePane', // 27-FreezePane
	'alarmClock', // 28-alarmClock
	];
function randomizeIDs () {
	function replacer ( n ) {
		return rtStr[parseInt(n)];
	}
		//    0   1   2   3   4   5   6   7   8   9
	var rtStr = ['d','h','w','l','c','m','t','a','b','i'];
	var UUIDs = '';
	for( var i = 0; i < allIDs.length; i++ ) {
		do {
			var rID_num = (Math.round(Math.random()*Math.pow(10,Math.random()*5+3) + 1e3)).toString();
			var rID = rID_num.replace(/\d/g, replacer);
			var Rej = new RegExp(rID);
		} while( Rej.test(UUIDs) )
		UUIDs += rID + ',';
		allIDs[i] = rID;
	}
}
randomizeIDs();

acss =	"table#"+allIDs[0]+" {width:100%; border-collapse:collapse; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#"+allIDs[0]+" td {background-color:transparent; border:1px solid silver; padding:2px;}" +

	"table#"+allIDs[0]+" td."+allIDs[18]+" {background-color:#FFE4B5;}" +
	"table#"+allIDs[1]+" {border-collapse:collapse; text-align:left; background-color:white; padding:0px; margin:0px;}" +
	"table#"+allIDs[1]+" tr {height:18px;border-collapse:collapse; text-align:left;}" +
	"table#"+allIDs[1]+" td {font-size:8pt;overflow:visible;white-space:nowrap;background-color:transparent; border:1px solid silver; padding:0px;}" +
	"table#"+allIDs[1]+" td."+allIDs[11]+" {font-size:8pt;background-color:#FFFFAF; text-align:right;}" +
	"table#"+allIDs[1]+" td."+allIDs[12]+" {background-color:#FFFFAF;height:18px; text-align:center; font-size:11px;}" +
	"table#"+allIDs[1]+" th {border:1px solid silver;height:18px;text-align:left;padding-left:3px;direction:ltr;}" +
	"table#"+allIDs[1]+" th a {color:black; font-size:11px;}" +
	"."+allIDs[2]+" {width: 250px; }" +
	"div#"+allIDs[3]+" {position:absolute;z-index:10000;border:1px solid silver;text-align:center;background-color:#FFFFE0;}" +
	"."+allIDs[4]+" {position:absolute;border:1px solid silver;text-align:center;background-color:yellow;border-radius:5px;}" +
	"."+allIDs[5]+" {width:100%;height:6px;text-align:center;background-color: #D0D0FF;cursor:move;font-size:6pt;}"+
	"table#"+allIDs[6]+" {width:auto;border-collapse:collapse; text-align:left; background-color:#F0F0F0; margin:1px;}" +
	"table#"+allIDs[6]+" td {background-color:transparent; border:1px solid silver; padding:2px;}" +
	"table#"+allIDs[6]+" td input {width:150px;text-align:right} table#"+allIDs[6]+" td.RBVals {text-align:center;}" +
	"."+allIDs[7]+" {width:auto;border-collapse:collapse; text-align:left; background-color:transparent; margin:1px;}" +
	"."+allIDs[7]+" td {background-color:transparent; border:1px solid silver; padding:0px 2px;text-align:left;}" +
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
	"table#"+allIDs[9]+" thead td {font-weight:bold;color:#3C3C3C;} table#"+allIDs[9]+" a {font-size:12px;}" +
	"."+allIDs[10]+"1 {width:100%;background-color:"+bgcolor[0]+";float:left;margin:0px; display:inline;padding:0px 2px;}" +
	"."+allIDs[10]+"2 {width:100%;background-color:"+bgcolor[1]+";float:left;margin:0px; display:inline;padding:0px 2px;}" +
	"."+allIDs[10]+"3 {width:100%;background-color:"+bgcolor[2]+";float:left;margin:0px; display:inline;padding:0px 2px;}" +
	/* "table#vlist {border-collapse:collapse;}" + */"table#vlist tbody td {background-color:transparent;} table#vlist tr:hover {background-color:#E5E5F0;}" +
	"."+allIDs[13]+" {width:100%; border-collapse:collapse; border:1px solid silver;} ."+allIDs[13]+" td{text-align:center; background-color:#FFC0C0; padding:1px; margin:1px;}" +
	"."+allIDs[19]+" {border:1px solid silver; text-align:right;}" +
	"tbody."+allIDs[20]+" {background-color:#F8FFEE;} tbody."+allIDs[20]+" td {background-color:transparent;text-align:center;} tbody."+allIDs[20]+" th {background-color:transparent;}" +
	"."+allIDs[21]+" {border-collapse:collapse;background-color:transparent;} ."+allIDs[21]+" td {background-color:transparent;}" +
	"button."+allIDs[15]+" {color:black;border-width:2px;border-style:outset;border-color:#C6B7A2;background-color:#C6B7A2;padding:0px 5px;margin:1px 2px;}" +
	"."+allIDs[24]+" { visibility:hidden; display:none; position:absolute; top:-100px; left:-100px; }" +
	"."+allIDs[25]+" { position:absolute; top:0px; left:0px; visibility:visible; display:block; width:100%; height:100%; background-color: black; z-index: 20000; opacity:0.7; padding-top: 20%; }" +
	"."+allIDs[26]+" { text-align:center; width:66%; background-color:#000015; color:white; font-size:large; border:dashed 2px #FF00AA; padding:9px; } ."+allIDs[26]+" button {color:white;}";

if( ver4FL ) acss += "table#vlist td{padding:0;line-height:14px;text-align:"+docDir[0]+";white-space:nowrap;}table#vlist thead td{background-color:#FFF;height:22px;text-align:center;padding:0 3px;}" +
	"table#vlist td.dot{width:10px;padding:0 3px;}table#vlist td.link{padding-right:10px;}table#vlist thead td a{font-weight:bold;color:#3C3C3C;}" +
	"table#vlist tbody td{font-size:12px;padding:0 2px;}table#vlist td.hl{color:#FF8000;}table#vlist td.link{font-size:14px;}table#vlist {border-collapse:collapse;}" +
	"table#vlist td a{font-weight:normal;color:#252525;}table#vlist td a.active{font-weight:bold;color:#252525;}" + //#FF8000;
	"div#build.gid17 table.send_res td {padding:2px 3px;}";

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
	var ttD = $g(allIDs[3]);
	if( ! ttD ) return;
	var wW = window.innerWidth;
	var wH = window.innerHeight;
	var x = (e.pageX + 8);
	var y = (e.pageY + 8);
	var dW = ttD.clientWidth;
	var dH = ttD.clientHeight;
	if (x + dW > wW) x = x - dW - 16;
	ttD.style.left = x + "px";
	if (y + dH > wH) y = y - dH - 16;
	ttD.style.top = y + "px";
};
/*************drag elements*****************/
var dragMaster = (function() {
	var dragObject;
	var mouseOffset;
	var mouseDownAt;
	function getMouseOffset(target, e) {
		var docPos	= getPosition(target);
		return {x:e.pageX - docPos.x, y:e.pageY - docPos.y};
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
		dragObject = this.parentNode;
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

function getPosition(e){
	var left = 0; var top = 0;
	while (e.offsetParent){
		left += e.offsetLeft; top += e.offsetTop; e = e.offsetParent;
	}
	left += e.offsetLeft; top += e.offsetTop;
	return {x:left, y:top};
}
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
	bd = $e('div',[['id',allIDs[14] + flId],['class',allIDs[4]],['style','left:'+ ix +'px;top:'+ iy +'px;z-index:'+(flId == 4? 9999:5999)+';']]);
	bdr = $ee('div','',[['class',allIDs[5]],['onmousedown',jsNone]]);
	bd.appendChild(bdr);
	bd.appendChild(flObj);
	document.body.appendChild(bd);
	dragMaster.makeDraggable(bdr);
	return allIDs[14] + flId;
}

function makeFloatD(flObj, mNum) {
	var ix = RB.XY[mNum*2] < 1 ? 1: RB.XY[mNum*2];
	var iy = RB.XY[mNum*2+1] < 1 ? 1: RB.XY[mNum*2+1];
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
	} else {
		body[0].removeAttribute('style');
		RB.bodyH[body[1]] = 0;
	}
	saveCookie('bodyH', 'bodyH');
}

/************************** build pages ****************************/
// begin Travian - add needed resources automatically under build/upgrade link
function needed_show( base ) {
	var neededRes = base.match(/>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/);
	wfl = false;
	var wantsResMem = [0,0,0,0];
	var forNPC = [0,0];
	var beforeThis = $e('DIV');
	for (var e = 0; e < 4; e++) {
		var wantsRes = resNow[e] - parseInt(neededRes[e+1]);
		forNPC[0] += wantsRes;
		forNPC[1] += incomepersecond[e];
		beforeThis.appendChild($e('IMG',[['src','img/x.gif'],['class','r' + (e+1)]]));
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
	var memP = $a('(M+)',[['href',jsVoid]]);
	memP.addEventListener('click', function(x) { return function() { saveWantsMem(x); }}(wantsResMem), 0);
	beforeThis.appendChild(memP);
	return beforeThis;

	function saveWantsMem ( wantsResM ) {
		var noplace = '';
		var ofFL = false;
		for( var i = 0; i< 4; i++ ) if( resNow[i]+wantsResM[i] > fullRes[i] ) ofFL = true;
		if( ofFL ) {
			noplace = gtext("noplace");
			RB.wantsMem = [0,0,0,0];
		} else RB.wantsMem = wantsResM.slice();
		RB.wantsMem[4] = village_aid;
		saveCookie('Mem', 'wantsMem');
		alert( noplace +"\n" + gtext("savedm") + "\n\n" + RB.wantsMem[0] + sprt + RB.wantsMem[1] + sprt + RB.wantsMem[2] + sprt + RB.wantsMem[3] + "\n");
	}
	function showPlusTimer () {
		var j=timerB.length;
		timerB[j] = new Object();
		timerB[j].time = Math.abs(Math.round(wantsRes/incomepersecond[e]));
		timerB[j].obj = $eT('SPAN', timerB[j].time, 0);
		return timerB[j].obj;
	}
}
function neededResAdd( herofl ) {
	var basee = $g("contract");
	if ( basee || herofl ) {
		var baseX = ver4FL ? $xf('.//div[@class="showCosts"]','l',cont) : $xf('.//p[@id="contract"]','l',cont);
		for( var i = 0; i < baseX.snapshotLength; i++ ) {
			var base = baseX.snapshotItem(i).innerHTML;
			if ( ! /form/i.test(base) ) {
				addToTime( baseX.snapshotItem(i) );
				var newD = needed_show( base );
				if( $gt('INPUT',baseX.snapshotItem(i).parentNode).length == 0 || wfl ) baseX.snapshotItem(i).appendChild( newD );
			}
		}
	} else {
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

	function addToTime( base ) {
		var needTime = base.innerHTML.match(/>(\d+:\d+:\d+)/)[1];
		var newTime = '<span title="'+RB.dictionary[14]+formatTime(absTime(toSeconds(needTime)),4)+'">'+needTime+'</span>';
		base.innerHTML = base.innerHTML.replace(needTime,newTime);
	}
}// end Travian - add needed resources automatically under build/upgrade link

/********************* messages & reports ***************************/
function deleteButtonAddT4() {
	if(($g("sAll"))) return;
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
	function removeBTX () {
		$g('sAll').checked = false;
	}
}

function deleteButtonAdd() {
	if( ver4FL ) { deleteButtonAddT4(); return; }
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
	function removeBTX () {
		var rm = $g('s10');
		if( rm ) rm.parentNode.removeChild(rm);
		var rm = $g(btnID);
		if( rm ) rm.parentNode.removeChild(rm);
	}
}

function convertCoordsInMessagesToLinks() {
	var messID = "//div[@*='message']";
	var cM = $xf(messID);
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
			villageLink[j] = "<a href='" + mLink + "'>" + mLink + "</a>";
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
		var mLinks = $xf(messID+"//span/a[contains(@href, 'karte.php')]", 'r');
		for( var i = 0; i < mLinks.snapshotLength; i++ ) {
			distanceTooltip(mLinks.snapshotItem(i),0);
			sendResTropAdd(mLinks.snapshotItem(i), 1);
			linkHint(mLinks.snapshotItem(i));
		}
	}
}
function addQuickLinks( url ) {
	var mLinks = $xf("//table[@id='report_surround']//a[contains(@href, 'karte.php')]", 'r');
	for( var i = 0; i < mLinks.snapshotLength; i++ ) {
		var newIns = mLinks.snapshotItem(i).parentNode;
		var vId = getVid(mLinks.snapshotItem(i).getAttribute('href'));
		linkHint(mLinks.snapshotItem(i));
		newIns.insertBefore(addARLinks(vId,1), mLinks.snapshotItem(i).nextSibling);
		distanceTooltip(mLinks.snapshotItem(i),0);
	}
}
/************************* market place ****************************/
// market filter on bye page
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
		if( RB.village_Var[0] > 0 ) {
			var market = $g("range").tBodies[0].rows;
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
			var TM = $g("range").tHead.rows[0].cells[4].innerHTML.replace(/<.*>/g, "");
			if( RB.dictionary[4] != TM ) {
				RB.dictionary[4] = TM;
				saveCookie( 'Dict', 'dictionary' );
				RB.dictFL[4] = 1;
				saveCookie( 'DictFL', 'dictFL' );
			}
		}
		return;
	}

	if ( RB.Setup[8] == 0 ) return;
	if ( crtPath.indexOf('&t=1') == -1 && crtPage.indexOf('&t=1&u=') != -1 ) return;
	var market = $g("range");
	if( ! market ) return;
	var resIMG = [];
	for ( var i=0; i<4; i++ ) {
		resIMG[i] = $g("resWrap").getElementsByTagName("table")[0].rows[0].cells[i*2].getElementsByTagName("img")[0].getAttribute("alt");
	}
	market = market.tHead.rows;
	var TM = [];
	TM.push(market[1].cells[0].innerHTML.replace(/<.*>/g, ""));
	TM.push(market[1].cells[1].innerHTML.replace(/<.*>/g, ""));
	if( RB.dictFL[4] == 0 ) {
		TM.push(market[1].cells[3].innerHTML.replace(/<.*>/g, ""));
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
function marketSend() {
	var basee = $g('send_select');
	if( ! basee ) return;
	basee.setAttribute("style","width:50%;");

	var maxC = 0;
	var rxI = new Array();
	var mName = "";
	var maxM = 0;
	var maxTr = 0;
	var lastLinkR = [0,0,0,0];
	var checkRes = [];
	var lPP = 0;

	var moC = ver4FL ? $gc('boxes-contents')[0]: $gc('mer')[0];
	if (moC) {
		var moCC = moC.innerHTML.match(/(\S+)\s+(\d+)\s*?\/\s*?(\d+)/);
		mName = moCC[1];
		maxM = parseInt(moCC[2]);
		merchInWork = parseInt(moCC[3]) - maxM;
	} else return;

	if( mName != RB.dictionary[2] ) {
		RB.dictionary[2] = mName;
		saveCookie( 'Dict', 'dictionary' );
	}

	myVid = RB_getValue(GMcookieID + 'next', -1);
	if( myVid > 0 ) {
		var arXY = id2xy( myVid );
		$gn('x')[0].value = arXY[0];
		$gn('y')[0].value = arXY[1];
		RB_setValue(GMcookieID + 'next', -1);
	}
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

		// add 100 250 500 1000
		var ref = $a('100',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkP100(x); }}( i ), false);
		// iRow.appendChild($c(ref,[['width','10%']]));
		
		var ref = $a('$$$',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkPall(x); }}( i ), false);
		// iRow.appendChild($c(ref,[['width','30%']]));
		// End 100 250 500 1000

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

	var newTR = $e('tr');
	var cM = $c('',[['colspan','3']]);
	newTR.appendChild(cM);
	basee.appendChild(newTR);
	var mhText = mName + ': ' + maxM + '<br />( &#931;= ' + maxTr + ' )';
	setMerchantsCell(mhText, 'black');

	var ref1 = $a('S',[['href',jsVoid]]);
	ref1.addEventListener('click', mhRowLinkMPlus, false);
	var ref2 = $a('Z',[['href',jsVoid]]);
	ref2.addEventListener('click', mhRowLinkMMem, false);
	newTR.appendChild($em('TD',[$ee('SUP',ref1),'/',$ee('SUB',ref2)],[['align','center'],['style','white-space:nowrap;']]));
	
	var refm = $a('-',[['href',jsVoid]]);
	refm.addEventListener('click', mhRowsLinkM, false);
	newTR.appendChild($c(refm,[['width','5%']]));
	var refmem = $a('M',[['href',jsVoid]]);
	refmem.addEventListener('click', mhRowLinkMem, false);
	var cref = $a('H',[['href',jsVoid]]);
	cref.addEventListener('click', QmhRowLinkMem, false);
	newTR.appendChild($em('TD',[$ee('SUP',refmem),'/',$ee('SUB',cref)],[['align','center'],['style','white-space:nowrap;']]));
	
	var ref = $a('+',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowsLinkP, false);
	newTR.appendChild($c(ref,[['width','5%']]));
	var refP = $a('&nbsp;%',[['href',jsVoid]]);
	refP.addEventListener('click', mhRowsLinkPP, false);
	newTR.appendChild($c(refP,[['width','5%']]));	
	
	// TODO: improvment 3 transfer every resource more than cranny can hold
	var rcref = $a('R-C',[['href',jsVoid]]);
	rcref.addEventListener('click', rMc, false);
	// newTR.appendChild($c(rcref,[['width','15%']]));
	// End by Qusai Abu Hilal
	var ss = ver4FL ? $gt('button',$gn('snd')[0])[0] : $gn('s1')[0];
	ss.addEventListener('click', removeACh, true);
	// travel time
	if( ss ) {
		ss = ss.parentNode;
		addShowDistanceIn( ss, -1 );
	}
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
	function mhRowLinkR ( RC ) {
		var totTransport = getTotTransport();
		var aR = parseInt(rxI[RC].value);
		if( isNaN(aR) ) aR = 0;//return;
		if( lastLinkR[0] != RC || lastLinkR[3] != aR ) {
			lastLinkR = [RC,0,aR];
			var totMerchants = Math.ceil(totTransport / maxC);
			var crtExceed = totTransport - maxTr;
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
	// add 100 200 250
	function mhRowLinkP100 ( RC ) {
		var aR = parseInt(rxI[RC].value);
		// alert(" aR \n" + aR);
		var i = isNaN(aR) ? maxC : aR + 100;
		rxI[RC].value = i < resNow[RC-1] ? i : resNow[RC-1];
		mhRowUpdate();
	}
	// resNow[i]
	function mhRowLinkPall ( RC ) {
		var aR = parseInt(rxI[RC].value);
		// alert(" aR \n" + aR);
		var i = isNaN(aR) ? maxC : aR + 100;
		try
		{
			aR = resNow[RC];
		}
		catch( err )
		{
			aR = 777;
		}
		// rxI[RC].value = i < resNow[RC-1] ? i : resNow[RC-1];
		rxI[RC].value = resNow[RC-1];
		mhRowUpdate();
	}
	// End 100 200 250
	function mhRowsLinkM () {
		for( var i = 1; i < 5; i++ )
			if( checkRes[i].checked ) mhRowLinkM ( i );
	}
	function mhRowsLinkP () {
		for( var i = 1; i < 5; i++ )
			if( checkRes[i].checked ) mhRowLinkP ( i );
	}
	function mhRowLinkMem () {
		loadVCookie('vPPH', 'village_PPH', RB.wantsMem[4]);
		var ht = getTTime( calcDistance(RB.wantsMem[4], village_aid), MTime[parseInt(raceid)]*sM, 0, 0 );
		for( var i = 0; i < 4; i++ ) {
			var wantRes = Math.ceil(parseInt(RB.wantsMem[i]) - RB.village_PPH[i]/3600 * ht);
			if( RB.village_PPH[i] < 0 ) {
				var deltaTime = RB.village_PPH[12] > 0 ? Math.round((new Date().getTime())/1000) - parseInt(RB.village_PPH[12]): 0;
				var leftResInV = Math.floor(RB.village_PPH[i]/3600 * (deltaTime + ht) + RB.village_PPH[i+4]);
				if( leftResInV < 0 ) {
					var nowResInV = Math.floor(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
					if( nowResInV < 0 ) nowResInV = 0;
					wantRes = nowResInV + parseInt(RB.wantsMem[i]);
				}
				var minLeft = prompt(gtext("consnegat"), 10);
				if( minLeft == null ) minLeft = 0;
				wantRes -= Math.ceil(RB.village_PPH[i]/3600 * parseInt(minLeft)*60);
			}
			if( wantRes < 0 ) wantRes = 0;
			rxI[i+1].value = wantRes < resNow[i] ? wantRes: resNow[i];
		}
		mhRowUpdate();
		sendResourses( RB.wantsMem[4] );
	}
	// Qusai Abu Hilal
	// improvment 2
	function QmhRowLinkMem () {
		loadVCookie('vPPH', 'village_PPH', RB.wantdMem[4]);
		var ht = getTTime( calcDistance(RB.wantdMem[4], village_aid), MTime[parseInt(raceid)]*sM, 0, 0 );
		for( var i = 0; i < 4; i++ ) {
			var wantRes = Math.ceil(parseInt(RB.wantdMem[i]) - RB.village_PPH[i]/3600 * ht);
			// alert("wantres \n" + wantRes);
			if( RB.village_PPH[i] < 0 ) {
				var deltaTime = RB.village_PPH[12] > 0 ? Math.round((new Date().getTime())/1000) - parseInt(RB.village_PPH[12]): 0;
				var leftResInV = Math.floor(RB.village_PPH[i]/3600 * (deltaTime + ht) + RB.village_PPH[i+4]);

				if( leftResInV < 0 ) {
					var nowResInV = Math.floor(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
					if( nowResInV < 0 ) nowResInV = 0;
					wantRes = nowResInV + parseInt(RB.wantdMem[i]);
				}
				var minLeft = prompt(gtext("consnegat"), 60);
				if( minLeft == null ) minLeft = 0;
				wantRes -= Math.ceil(RB.village_PPH[i]/3600 * parseInt(minLeft)*60);
			}
			if( wantRes < 0 ) wantRes = 0;
			rxI[i+1].value = wantRes < resNow[i] ? wantRes: resNow[i];
		}
		mhRowUpdate();
		sendResourses( RB.wantdMem[4] );
	}// End by Qusai Abu Hilal	

	// Qusai Abu Hilal
	// TODO: improvment 3 transfer every thing more than cranny
	function rMc () {
		loadVCookie('vPPH', 'village_PPH', RB.wantdMem[4]);
		var ht = getTTime( calcDistance(RB.wantdMem[4], village_aid), MTime[parseInt(raceid)]*sM, 0, 0 );
		for( var i = 0; i < 4; i++ ) 
		{
			var wantRes = Math.ceil(parseInt(RB.wantdMem[i]) - RB.village_PPH[i]/3600 * ht);
			// alert("wantres \n" + wantRes);
			if( RB.village_PPH[i] < 0 ) 
			{
				var deltaTime = RB.village_PPH[12] > 0 ? Math.round((new Date().getTime())/1000) - parseInt(RB.village_PPH[12]): 0;
				var leftResInV = Math.floor(RB.village_PPH[i]/3600 * (deltaTime + ht) + RB.village_PPH[i+4]);

				if( leftResInV < 0 ) 
				{
					var nowResInV = Math.floor(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
					if( nowResInV < 0 ) nowResInV = 0;
					wantRes = nowResInV + parseInt(RB.wantdMem[i]);
				}
				var minLeft = prompt(gtext("consnegat"), 60);
				if( minLeft == null ) minLeft = 0;
				wantRes -= Math.ceil(RB.village_PPH[i]/3600 * parseInt(minLeft)*60);
			}
			if( wantRes < 0 ) wantRes = 0;
			rxI[i+1].value = wantRes < resNow[i] ? wantRes: resNow[i];
		}
		mhRowUpdate();
		sendResourses( RB.wantdMem[4] );
	}// End improvment 3 by Qusai Abu Hilal
	
	function mhRowLinkMMem () { // change values from market sell page
		loadVCookie('vPPH', 'village_PPH', RB.wantsMem[4]);
		var ht = getTTime( calcDistance(RB.wantsMem[4], village_aid), MTime[parseInt(raceid)]*sM, 0, 0 );
		var resb4 = [0,0,0,0];
		for( var i = 0; i < 4; i++ ) {
			if( isNaN(parseInt(rxI[i+1].value)) || parseInt(rxI[i+1].value) == 0 ) continue;
			var corr = Math.floor((parseInt(RB.wantsMem[i]) * RB.village_PPH[i] * ht) / (parseInt(rxI[i+1].value) * 3600));
			/// alert("Correction is: \t" + corr );
			if( parseInt(RB.wantsMem[i]) < corr ) corr = 0;
			resb4[i] = parseInt(RB.wantsMem[i]);
			RB.wantsMem[i] = parseInt(RB.wantsMem[i]) - parseInt(rxI[i+1].value) - corr;
			if( RB.wantsMem[i] < 0 ) RB.wantsMem[i] = 0;
		}
		saveCookie('Mem', 'wantsMem');
		alert( gtext("cor") + "\n" + 
			gtext("frm") + "\n" + resb4[0] +sprt+ resb4[1] +sprt+ resb4[2] +sprt+ resb4[3] + "\n" + 
			gtext("to") + "\n" + RB.wantsMem[0] +sprt+ RB.wantsMem[1] +sprt+ RB.wantsMem[2] +sprt+ RB.wantsMem[3] );
	}
	function removeACh () {
		for( var i = 1; i < 5; i++ )
			checkRes[i].checked = false;
	}
	function mhRowsLinkPP () {
		switch (lPP) {
			case 0:
				refP.innerHTML = '&nbsp;=';
				lPP++;
				var aRc = 0;
				var aRn = 0;
				for( var i = 1; i < 5; i++ ) if( checkRes[i].checked ) { aRc++; aRn += resNow[i-1]; }
				if( aRc > 0 ) {
					for( var i = 1; i < 5; i++ ) {
						if( checkRes[i].checked ) {
							var toRes = Math.floor((resNow[i-1]/aRn) * maxTr);
							rxI[i].value = toRes < resNow[i-1] ? toRes : resNow[i-1];
						}
					}
					mhRowUpdate();
				}
				break;
				
			case 1:
				refP.innerHTML = '&nbsp;C';
				lPP++;
				var aRc = 0;
				var aRc2 = 0;
				var aRF = [0,0,0,0,0];
				for( var i = 1; i < 5; i++ ) if( checkRes[i].checked ) aRc++;
				if( aRc > 0 ) {
					do {
						var toRes = Math.floor(maxTr/aRc)+Math.floor((aRF[1]+aRF[2]+aRF[3]+aRF[4])/(aRc-aRc2));
						aRc2 = 0;
						for( var i = 1; i < 5; i++ ) {
							if( checkRes[i].checked ) {
								if( toRes < resNow[i-1] ) {
									rxI[i].value = toRes;
								} else if(aRF[i] == 0) {
									rxI[i].value = resNow[i-1];
									aRF[i] += toRes - resNow[i-1];
									aRc2++;
								}
							}
						}
					} while ( aRc2 > 0 )
					mhRowUpdate();
				}
				break;
			default:
				for( var i = 1; i < 5; i++ )
					if( checkRes[i].checked ) rxI[i].value = '';
				mhRowUpdate();
				refP.innerHTML = '&nbsp;%';
				lPP = 0;
				break;
		}
	}
	function mhRowLinkMPlus () {
		var xx = parseInt($gn('x')[0].value);
		var yy = parseInt($gn('y')[0].value);
		if( isNaN(xx) || isNaN(yy) ) return;
		RB.wantsMem = [0,0,0,0,0];
		for( var i=0; i<4; i++ )
			 if( isFinite(parseInt(rxI[i+1].value)) ) RB.wantsMem[i] = parseInt(rxI[i+1].value);
 		RB.wantsMem[4] = xy2id(xx,yy);// save village coordinates as ID
		saveCookie('Mem', 'wantsMem');
		alert(gtext("savedm") + "\n\n" + RB.wantsMem[0] +sprt+ RB.wantsMem[1] +sprt+ RB.wantsMem[2] +sprt+ RB.wantsMem[3]);
	}
}
// 'Repeat' offer possition
function marketReSel( sRow ) {
	var selTable = $g('sell_overview');
	var strow = selTable.tBodies[0].rows[sRow];

	var offer = strow.cells[1];
	var wanted = strow.cells[(ver4FL?3:2)];
	var dur = toNumber( strow.cells[(ver4FL?6:5)].innerHTML );

	offer.value = parseInt( offer.childNodes.item(1).nodeValue );
	offer.type = offer.childNodes.item(0).getAttribute('class').substring(1);
	wanted.value = parseInt( wanted.childNodes.item(1).nodeValue );
	wanted.type = wanted.childNodes.item(0).getAttribute('class').substring(1);

	$gn('rid1')[0].value = offer.type;

	$gn('m1')[0].value = offer.value;

	$gn('rid2')[0].value = wanted.type;
	$gn('m2')[0].value = wanted.value;

	if( isFinite(dur) ) {
		$gn('d1')[0].setAttribute('checked','checked');
		$gn('d2')[0].value = dur;
	} else {
		$gn('d1')[0].removeAttribute('checked');
	}
}
// automatically set min resourse as wanted & max resourse as offer
// add 'Repeat' key
function marketOffer() {
	var selTable = $g('sell');
	if( ! selTable ) return;
	var maxR = 0;
	var minR = 0;
	for( var i = 1; i < 4; i++ ) {
		if( resNow[i] > resNow[maxR] ) maxR = i;
		if( resNow[i] < resNow[minR] ) minR = i;
	}
	$gn('rid1')[0].value = maxR + 1;
	$gn('rid2')[0].value = minR + 1;

	$at(selTable.rows[0].cells[2],[['style','width:5%;']]);
	$at(selTable.rows[1].cells[2],[['style','width:5%;']]);

	var refP1 = $a('+' + RB.village_Var[0] + '+',[['href',jsVoid]]);
	refP1.addEventListener('click', mofLinkP1, false);
	selTable.rows[0].insertBefore($c(refP1),selTable.rows[0].cells[3]);
	var refM1 = $a('-' + RB.village_Var[0] + '-',[['href',jsVoid]]);
	refM1.addEventListener('click', mofLinkM1, false);
	selTable.rows[0].insertBefore($c(refM1),selTable.rows[0].cells[3]);
	var m1 = $gn('m1')[0];
	m1.addEventListener('keyup', merUpd1, false);
	m1.addEventListener('change', merUpd1, false);
	var spn1 = $e('SPAN',[['style','margin: 0px 10px;']]);
	if( ver4FL )
		selTable.parentNode.appendChild(spn1);
	else
		selTable.parentNode.getElementsByTagName('P')[0].appendChild(spn1);	
	// change down also by Qusai Abu Hilal
	var refP2 = $a('+' + RB.village_Var[0] + '+',[['href',jsVoid]]);
	refP2.addEventListener('click', mofLinkP2, false);
	selTable.rows[1].insertBefore($c(refP2),selTable.rows[1].cells[3]);
	var refM2 = $a('-' + RB.village_Var[0] + '-',[['href',jsVoid]]);
	refM2.addEventListener('click', mofLinkM2, false);
	selTable.rows[1].insertBefore($c(refM2),selTable.rows[1].cells[3]);	
	var m2 = $gn('m2')[0];	
	m2.addEventListener('keyup', merUpd2, false);
	m2.addEventListener('change', merUpd2, false);
	var spn2 = $e('SPAN',[['style','margin: 0px 10px;']]);
	if( ver4FL )
		selTable.parentNode.appendChild(spn2);
	else
		selTable.parentNode.getElementsByTagName('P')[0].appendChild(spn2);
	// finish down
	var selTable = $g('sell_overview');
	if ( ! selTable ) return;
	// add additional field
	var strows = selTable.tHead.rows;
	if( ! ver4FL ) strows[0].cells[0].setAttribute("colspan","7");
	strows[(ver4FL?0:1)].appendChild($c('&nbsp;',[['style','width:5%;']]));
	// fill rows
	var strows = selTable.tBodies[0].rows;
	for (var mr = 0; mr < strows.length; mr++ )
	{
		var newTD = $c($a('R',[['href',jsVoid]]));
		newTD.addEventListener('click', function(x) { return function() { marketReSel(x); }}( mr ), false);
		strows[mr].appendChild(newTD);
	}
	function merUpd1 () {
		var aR = parseInt(m1.value);
		spn1.innerHTML = isNaN(aR) ? '': '( '+ Math.ceil(aR/RB.village_Var[0]) + (aR % RB.village_Var[0] != 0 ? ' : -' + (RB.village_Var[0] - aR % RB.village_Var[0]):'') + ' )';
	}
	function mofLinkM1 () {
		var aR = parseInt(m1.value);
		mofLinkM2();
		mofLinkM2();
		m1.value = isNaN(aR) ? '': aR <= RB.village_Var[0] ? '': aR - RB.village_Var[0];
		merUpd1();
		merUpd2();
	}
	function mofLinkP1 (/*var row*/) {
		var aR = parseInt(m1.value);
		mofLinkP2();
		mofLinkP2();
		m1.value = isNaN(aR) ? RB.village_Var[0] : aR + RB.village_Var[0];
		merUpd1();			
		merUpd2();
	}
	function merUpd2 () {
		var aR = parseInt(m2.value);
	}
	function mofLinkM2 () {
		var aR = parseInt(m2.value);
		m2.value = isNaN(aR) ? '': aR <= RB.village_Var[0] ? '': aR - RB.village_Var[0];
		merUpd2();
	}
	function mofLinkP2 (/*var row*/) {
		var aR = parseInt(m2.value);
		m2.value = isNaN(aR) ? RB.village_Var[0] : aR + RB.village_Var[0];
		merUpd2();			
	}
}
// calculate incomming resourses
function marketSumm() {
	if( RB.Setup[10] == 0 ) return;
	if( ($g('target_validate')) ) return;
	var aT = $gc('traders');
	if( aT.length == 0 ) return;
	var cH4 = $gt('H4');
	if( cH4 ) var merchB = cH4.length;
	if( merchInWork != 0 && merchB == 1 ) {
		if( ver4FL ) {
			if( $xf('.//h4[@class="spacer haendler_unterwegs_heading"]','f',cont) ) return;
		} else {
			if( ! /<span\s+class="f10"/i.test(aT[0].innerHTML) ) return;
		}
	}
	resourceCalculatorInit();
	for (var i = 0; i < aT.length; i++) {
		// get time to go
		var incomeCell = aT[i].rows[1].cells[1].innerHTML;
		var timeToGo = toSeconds(incomeCell.match(/\d+:\d{2}:\d{2}/)[0]);
		// get incoming resources
		var incomeCell = aT[i].rows[2].cells[1].innerHTML;
		var incomingRes = incomeCell.match( /class="r1".+>\s*?(\d+).+?>\s*?(\d+).+?>\s*?(\d+).+?>\s*?(\d+)/ );

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
}
function resourceCalculator ( tObj, timeToGo, incomingRes, tType ) { // tType 0-market 1-RP
	var textIncome = '';
	var redLine = '';
	var redTime = 0;
	var rLl = redLines.length-1;
	var incomeToGoSumm = 0;
	for( var j = 0; j < 4; j++ ) {
		var extraRes = 0;
		var mColor = '';
		summIncomingRes[j] += parseInt(incomingRes[j+1]);
		incomeToGo[j] = Math.round(incomepersecond[j] * (timeToGo - lastTime) + incomeToGo[j]);
		if( incomeToGo[j] < 0 ) {
			redTime = serverTime + timeToGo - Math.floor(incomeToGo[j]/incomepersecond[j]);
			redLine += ' <img src="img/x.gif" class="r' + (j+1) + '"> ' + formatTime(redTime,1);
			extraRes = incomeToGo[j];
			mColor = 'red';
			incomeToGo[j] = 0;
		}
		incomeToGo[j] += parseInt(incomingRes[j+1])
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
		timeToZero = timeToGo - Math.round(incomeToGo[3]/incomepersecond[3]);
		if( timeToZero < 86400 )
			textIncome += ' <img src="img/x.gif" class="r5">' + formatTime(serverTime + timeToZero,2);
		if( redTime > 0 ) {
			if( redLineFL ) {
				redLines[++rLl] = [extraRes,redTime,0];
				redLineFL = false;
			}
			if( parseInt(incomingRes[4]) == 0 ) {
				redLines[rLl][0] += extraRes;
			} else {
				redLines[rLl][2] = serverTime + timeToGo;
				redLineFL = true;
			}
		} else {
			if( extraRes > 0 )
				redLines[++rLl] = [extraRes,serverTime + timeToGo,serverTime + timeToGo];
		}
	}
	if( RB.Setup[11] > 0 ) textIncome += ' (<img class="npc" src="img/x.gif"> '+incomeToGoSumm+')';
	var newFText = '<img class="clock" src="img/x.gif"> ' + formatTime(absTime(timeToGo), 1); // 2 ??
	if( tType == 0 ) {
		var newTR = $ee('tr',$c( newFText ),[['class','res']]);
		newTR.appendChild( $c( textIncome ));
		tObj.appendChild( newTR );
	} else {
		var newTR = $ee('TR',$c(newFText));
		newTR.appendChild($c(textIncome,[['colspan','11'],['style','text-align:'+docDir[0]+';']]));
		tObj.appendChild($ee('TBODY',newTR,[['class','infos']]));
	}
	lastTime = timeToGo;

	if( redLine.length > 0 ) {
		var PP = $ee('P',$ee('table',$ee('tr',$c(redLine)),[['class',allIDs[13]]]));
		tObj.parentNode.insertBefore(PP,tObj);
	}
	rpCount++;
}
function resourceCalculatorSumm ( tObj, timeToGo ) {
	if( rpCount == 0 ) return;
	var rSumm = 0;
	var newR1 = $ee('TR',$c('<img class="clock" src="img/x.gif">'));
	var newR2 = $ee('TR',$c(formatTime(serverTime + timeToGo, 1)));
	var newR3 = $ee('TR',$c('&nbsp;'));

	var t = timerB.length;
	for( var j = 0; j < 4; j++ ) {
		rSumm += summIncomingRes[j];
		newR1.appendChild($c('<img src="img/x.gif" class="r' + (j+1) + '">'));
		newR2.appendChild($c(summIncomingRes[j]));
		timerB[t] = new Object();
		timerB[t].time = incomepersecond[j] > 0 ? Math.round((fullRes[j]-incomeToGo[j]) / incomepersecond[j])+lastTime : Math.round(incomeToGo[j] / incomepersecond[j])-lastTime;
		timerB[t].obj = $eT('TD', timerB[t].time, 0);
		newR3.appendChild(timerB[t++].obj);
	}
	lastTimerB = timerB.length;

	newR1.appendChild($c('&#931;('+rpCount+')'));
	newR2.appendChild($c(rSumm));
	var MM = $a('(M-)',[['href',jsVoid]]);
	MM.addEventListener('click', linkMMem, false);
	newR3.appendChild($c(MM));
	var newT = $ee('TABLE',newR1,[['class',allIDs[7]],['style','background-color:#F8FFEE;width:100%;']]);
	newT.appendChild(newR2);
	newT.appendChild(newR3);

	tObj.parentNode.insertBefore($ee('P', newT),tObj);

	function linkMMem () {
		for( var j = 0; j < 4; j++ ) {
			RB.wantsMem[j] -= summIncomingRes[j];
			if( RB.wantsMem[j] < 0 ) RB.wantsMem[j] = 0;
		}
		saveCookie('Mem', 'wantsMem');
		alert( gtext("cor") + RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}
}
function redLinesSumm ( tObj ) {
	if( incomepersecond[3] >= 0 ) return;

	var newR = $em('TR',[$c(gtext("hunger")),$c(gtext("duration")),$c(gtext("deficit"))]);
	var newT = $ee('TABLE',newR,[['class',allIDs[7]],['style','background-color:#FFE8D8;width:100%;']]);

	for( var i=0; i<redLines.length; i++ ) {
		if( redLines[i][2] == 0 ) {
			newT.appendChild($em('TR',[$c(formatTime(td(redLines[i][1]),1)),$c('--:--'),$c('-')]));
		} else {
			var dur = redLines[i][2]-redLines[i][1];
			if( dur == 0 )
				newT.appendChild($em('TR',[$c(formatTime(td(redLines[i][1]),1)),$c('--:--'),$c('+'+redLines[i][0],[['style','color:red;background-color:white;']])]));
			else
				newT.appendChild($em('TR',[$c(formatTime(td(redLines[i][1]),1)),$c(formatTime(dur,0)),$c(redLines[i][0])]));
		}

	}
	if( redLineFL )
		newT.appendChild($em('TR',[$c(formatTime(absTime(timeToZero,serverTime),1)),$c('--:--'),$c('-')]));

	tObj.parentNode.insertBefore($ee('P', newT),tObj);

	function td ( xx ) {
		return xx>86400?xx-86400:xx;
	}
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
	if( cvT == 1 ) RB[contentCookie].length = 1;
	if( oneCookie != undefined ) {
		var cookieValue = oneCookie[2].split(cookieDelim[cvT][1]);
		var sI = cvT == 0 ? 0: 1;
		var contentLength = cvT == 0 ? RB[contentCookie].length: cookieValue[0].length == 0 ? 1: parseInt(cookieValue[0]);
		for( var j = 0; j < contentLength; j++ ) {
			RB[contentCookie][j] = cookieValue[j+sI] == undefined ? 0: cvT == 0 ? parseInt(cookieValue[j]): cookieValue[j+sI];
		}

	} else for( var j = 0; j < RB[contentCookie].length; j++ ) RB[contentCookie][j] = 0;
	if( cvT == 1 ) if( isNaN(RB[contentCookie][0]) ) RB[contentCookie][0] = 0;
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
				newCookie += contentCookie[j] + cookieDelim[cvT][1];
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
function saveCookie( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var j = 0; j < RB[contentCookie].length; j++ ) newCookie += RB[contentCookie][j] + '@_';
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}
function loadCookie( nameCoockie, contentCookie ) {
	
	try
	{

	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	if( RCookie != '' ) {
		var cookieValue = RCookie.split('@_');
		for( var j = 0; j < RB[contentCookie].length; j++ )
			if( cookieValue[j] != undefined ) if( cookieValue[j].length > 0 ) RB[contentCookie][j] = cookieValue[j];
	}
	}
	catch( err )
	{
		er( err + sprt + nameCoockie + sprt + contentCookie, '4' );
	}
}
function saveOVCookie ( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var i = 0; i < villages_id.length; i++ )
		if( contentCookie[villages_id[i]] !== undefined )
		if( contentCookie[villages_id[i]].length > 0 )
			newCookie += villages_id[i] + cookieDelim[1][1] + contentCookie[villages_id[i]] + cookieDelim[1][2];
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
	while ((oneCookie = Rej.exec(RCookie)) != null) { RB[contentCookie][oneCookie[1]] = oneCookie[2]; cCount++; }
	return cCount;
}
function loadAllCookie () {
	// improvment 1
	loadCookie('Mem', 'wantsMem');
	// improvment 2
	loadCookie('CMem', 'wantdMem');
	// improvment 3
	// loadCookie ('racid', 'raceid');
	loadVCookie ( 'Dorf2', 'village_Dorf2' );
	loadVCookie ( 'VV', 'village_Var' );
	loadCookie ( 'OV', 'overview' );
	loadCookie ( 'DictFL', 'dictFL' );
	loadCookie ( 'DictTR', 'dictTR' );
	loadCookie ( 'AS', 'serversAN' );
	if( lMap != '' && lMap != RB.dictionary[15] ) { RB.dictionary[15] = lMap; saveCookie( 'Dict', 'dictionary' ); }
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

function showAllTTime( vType, tVil, arena ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	var serverTime = getServerTime();
	var tR = vType < 1 ? parseInt(raceid) + 1: 0;
	var t = lastTimerP[0];
	timerP.length = t;
	var distance = calcDistance(tVil, village_aid);
	var newTR = $ee('TR',$c(printCoords(tVil),[['style','font-weight:bold;']]));
	newTR.appendChild($c(' &lt;-&gt; ' + parseFloat(distance.toFixed(2)),[['colspan',(tR > 0 ? 2:4)]]));
	newTABLE.appendChild(newTR);

	if( distance > 0 ) {
		if( vType < 2 ) {
			var newTR = $e('TR');
			var ht = getTTime( distance, MTime[parseInt(raceid)]*sM, 0, 0 );
			var htg = formatTime(ht, 0);
			newTR.appendChild($c(htg));
			var attr = vType < 1 ? undefined : [['colspan',3]];
			newTR.appendChild($c($e('IMG',[['src',img_car],['title',RB.dictionary[2]]]),attr));
			htf = absTime( ht );
			timerP[t] = new Object();
			timerP[t].time = htf;
			timerP[t].obj = $c(formatTime(htf, 1));
			newTR.appendChild(timerP[t++].obj);
			newTABLE.appendChild(newTR);
		}
		if( vType > -1 )
		for( var i = 0; i < TTime.length; i++ ) {
			var newTR = $e('TR');
			var ht = getTTime( distance, TTime[i][0]*sK, arena, speedAK[parseInt(RB.Setup[3])] );
			var htg = formatTime(ht, 0);
			newTR.appendChild($c(htg));
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
				htf = absTime( ht );
				timerP[t] = new Object();
				timerP[t].time = htf;
				timerP[t].obj = $c(formatTime(htf, 1));
				newTR.appendChild(timerP[t++].obj);
				newTABLE.appendChild(newTR);
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
	var newP = $e('DIV',[['style','float:'+docDir[1]+';'],['id',allIDs[0]]]);
	ss.parentNode.insertBefore(newP, ss);
	$gn('x')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	$gn('y')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	lastTimerP[2] = lastTimerP[0];
	showDistanceIn( vt );
}
function showDistanceIn ( vt ) { // travel time
	var dd = $g(allIDs[0]);
	if( ! dd ) return;
	var dX = parseInt($gn('x')[0].value);
	var dY = parseInt($gn('y')[0].value);
	var ddd = dd.firstChild;
	if( ddd ) dd.removeChild(ddd);
	lastTimerP[0] = lastTimerP[2];
	if( isNaN(dX) || isNaN(dY) ) return;
	dd.appendChild(showAllTTime(vt,xy2id(dX, dY),RB.village_Var[1]));
	lastTimerP[2] = lastTimerP[0];
	lastTimerP[0] = lastTimerP[1];
}
/************************* other ****************************/
function incomeResourcesInRP () {
	var townTables = $xf('.//table[.//td[@class="role"]/a]','l',cont);
	resourceCalculatorInit();
	for ( var i=0 ; i < townTables.snapshotLength; i++ ){
		var ttable = townTables.snapshotItem(i);
		var vID = $xf('thead/tr/td[@class="role"]/a', 'f', ttable).getAttribute('href').match(/d=(\d+)/)[1];
		if( vID != village_aid && ! ver4FL )
			$xf('tbody[@class="units"]/tr/th', 'f', ttable).innerHTML += printCoords(vID);
		var mLinks = $xf('tbody/tr/td/div[@class="res"]', 'f', ttable);
		if( mLinks && RB.Setup[10] > 0 ) {
			var timeToGo = toSeconds($xf('tbody/tr/td/div/span[contains(@id, "timer")]','f',ttable).innerHTML);
			var incomingRes = mLinks.innerHTML.match( /class="r1".+>\s*?(\d+).+?>\s*?(\d+).+?>\s*?(\d+).+?>\s*?(\d+)/ );
			resourceCalculator( ttable, timeToGo, incomingRes );
		}
	}
	if( RB.Setup[10] > 1 && rpCount > 0 ) resourceCalculatorSumm(townTables.snapshotItem(0), timeToGo);
	if( RB.Setup[10] > 2 && rpCount > 0 ) redLinesSumm(townTables.snapshotItem(0));
}
function addARLinks(myVid, aDirect) {
	var newLinks = $e('span');
	var armStyle = aDirect == 0 ? img_def: img_att;
	var ref = $ee('a',$e('img',[['src',armStyle]]),[['href','a2b.php?z=' + myVid],['onClick','return false;']]);
	ref.addEventListener('click', function(x) { return function() { sendArmy(x); }}(myVid), false);
	newLinks.appendChild(ref);
	if( aDirect < 2 ) {
		var ref = $ee('a',$e('img',[['src',img_car]]),[['href','build.php?z=' + myVid + '&gid=17'],['onClick','return false;']]);
		ref.addEventListener('click', function(x) { return function() { sendResourses(x); }}(myVid), false);
		newLinks.appendChild(ref);
	}
	return newLinks;
}
function sendResTropAdd ( aLink, aType ) {// adding send resource and troops to every village
	if( RB.Setup[15] == 0 ) return;
	var vId = getVid(aLink.getAttribute('href'));
	if( vId == village_aid ) return;
	var sp = $gc('coords',aLink);
	if( sp.length <= 0 )
	{
		aLink.parentNode.appendChild(addARLinks(vId, aType));
	}// */
}
// begin Quick actions to my other villages
function vlist_addButtonsT4() {
	try
	{
		Not_armord_vlist_addButtonsT4();
	}
	catch( err )
	{
		er( err, 'J');
	}
}
function Not_armord_vlist_addButtonsT4() {
	villages_count = loadOVCookie('vList', 'vList');
	var flNew = false;
	var vLink = [];
	var aV = $xf('.//li/a', 'l', $g('villageList'));
	armored_Get_prsntag();
	for( var i = 0; i < aV.snapshotLength; i++ ) 
	{
		try
		{
			linkVSwitch[i] = aV.snapshotItem(i).getAttribute('href');
			var nd = parseInt(linkVSwitch[i].match(/newdid=(\d+)/)[1]);
		}
		catch( err )
		{
			er(err, 'K');
			return ;
		}		
		var header = $gt('h1');// important
		if( printCoords(RB.vList[nd]) == "(-402|401)" )
		{
			flNew = true;			
		}
		else if( RB.vList[nd] === undefined ) flNew = true;
		else {			
			villages_id[i] = RB.vList[nd];
			if( /active/.test(aV.snapshotItem(i).getAttribute('class')) ) {
				village_aid = villages_id[i];
				village_aNum = i;
			}
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
	var vilT = $e('TABLE',[['id',"vlist"],['style','background-color:white']]);
	var vilB = $e('TBODY');
	if( RB.bodyH[1] == 1 ) $at(vilB,[['style','display:none']]);

	var improv1 = $a( warehouse_prsntag +'%', [['href', jsVoid],['style','font-size:12px;'],['title', '[' + warehouse_prsntag +' %] ' + gtext("ressav")]]);
	improv1.addEventListener('click', saveSpaceLeftToMem, false);
	// symbolic link to Warehouse
	var improv1_Warehouse = $ee('A', $e('IMG',[['src', image["g10Icon"]]]),[['href',jsVoid],['title',gtext("ressav")]]);
	// alert("en_improv = $ee\n" );
	improv1_Warehouse.addEventListener('click', goWarehouse, true);
	// symbolic link to Granary
	var improv1_Granary = $ee('A', $e('IMG',[['src', image["g11Icon"]]]),[['href',jsVoid],['title',gtext("ressav")]]);
	// alert("en_improv = $ee\n" );
	improv1_Granary.addEventListener('click', goGranary, true);
	var improv2 = $a( ' ' + cranyprsntag +'%', [['href', jsVoid],['style','font-size:12px;'],['title', '[' + cranyprsntag +' %] ' + gtext("ressav")]]);
	improv2.addEventListener('click', saveCrannycap, false);
	
	var improv2_Cranny = $ee('A', $e('IMG',[['src', image["cranny"]]]),[['href',jsVoid],['title',gtext("ressav")]]);
	improv2_Cranny.addEventListener('click', goCranny, true);
	// TO DO apply hiding on quick links as well !
	var hideP = $e('IMG',[['src',img_hide]]);
	hideP.addEventListener('click', function (x) { return function() { bodyHide(x); }}([vilB,1]), false);// new improvment 3 
	
	vilT.appendChild($ee('THEAD',$em('TR',[$c(hideP),$c($gt('A',$g('villageList'))[0].cloneNode(true),[['colspan',1]]),$c('('+villages_count+')'),improv1,improv1_Warehouse, improv1_Granary,improv2, improv2_Cranny])));
	
	for( var i=0; i<villages_count; i++) {		
		linkHint(aV.snapshotItem(i), villages_id[i]);
		vLink[i] = aV.snapshotItem(i).cloneNode(true);
		var cl = villages_id[i]==village_aid?"dot hl":"dot";		
		vilB.appendChild($em('TR',[$c('&#x25CF;',[['class',cl]]),$c($ee('DIV',vLink[i])),$c(printCoords(villages_id[i])),$c(addARLinks(villages_id[i],0))]));
	}
	vilT.appendChild(vilB);
	if( RB.Setup[21] > 0 ) makeFloatD(vilT,7);
}
function vlist_addButtons() {
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

			if( ! paranoidMode ) {
				var newTD = $c( addARLinks(myVid,0));
				villages[vn].appendChild(newTD);
				linkHint(linkEl, myVid);
			}
			villages_count++;
		}
		if( ! paranoidMode ) {
			var villages_c = vlist.tHead.rows;
			newTH = $c('Q' + villages_count + 'Q');
			villages_c[0].appendChild(newTH);
		}
	} else {
		villages_count = 1;
		villages_id[0] = 0;
	}
}// end Quick actions to my other villages
function calculationPPH () {
	var RCookie = RB_getValue(GMcookieID + 'vPPH','0.0.0.0.0./');
	var rows = RCookie.split('\.\/');
	for( var i=0; i < (rows.length-1); i++ ) {
		var cels = [];
		cels = rows[i].split(".");
		for ( var j=1; j < 5; j++ ) {
			sumPPH[j-1] += isFinite(parseInt(cels[j])) ? parseInt(cels[j]) :0;
		}
	}
}
var lastColor = [4,4,4,4];
function newStyle(e, j, sp) {
	var color = ( j == 2 && sp ) ? "white" : "black";
	var addCss = "."+ allIDs[16] + e + " div {color: " + color + ";background-color:" + bgcolor[j] + ";float:" + docDir[1] + "; width: 100%;height:18px;margin-top:0px; display:inline;}";
	lastColor[e] = j;
	return addCss;
}
function progressbar_updValues() {
	getResources();
	var addCss = '';
	for (var j = 0; j < 4; j++) {
		var spaceLeft = fullRes[j] - resNow[j];
		var percentUsed2 = resNow[j] / fullRes[j] * 100;
		var percentUsed = Math.round(percentUsed2);

		timerRB[j].pb.setAttribute("style", "width: " + Math.round(percentUsed2 * 2) + "px;");
		timerRB[j].pval.innerHTML = percentUsed + "% ";
		if( incomepersecond[j] != 0 ) {

			if( timerRB[j].time != 0 ) {
				timerRB[j].time += incomepersecond[j] > 0 ? -1 : 1;
				timerRB[j].val.innerHTML = formatTime(timerRB[j].time, 0);
			}
		}
		var sp = incomepersecond[j] > 0 ? true:false;
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
	if( ver4FL && RB.bodyH[0] == 1 ) {
		if( timerN.length < 4 ){
			var resource = parseInt(incomepersecond[j]*3600);
			timerN[j] = new Object();
			var resoColor = parseInt(resource) < 0 ? 'red':'black';
			timerN[j].resotime = timerRB[j].val.cloneNode(true);
			timerN[j].perreso = $e('span');
			timerN[j].divme1 = $ee('div',
				$em('span',['( ',$ee('span',resource,[['style','color:'+resoColor+';']]),' ',timerN[j].resotime,' ',timerN[j].perreso,')'],[['style',"font-size:7pt !important;background-color: white;"]]),
				[['style','width:150px; text-align: center;']]);
			$g('res').getElementsByTagName('li')[j].appendChild(timerN[j].divme1);
		}
		timerN[j].resotime.innerHTML = formatTime(timerRB[j].time,0);
		timerN[j].perreso.innerHTML = percentUsed+' %';
		function changeColor(obj,color) {
			if( timerN[j][obj+'_color'] != color ) {
				timerN[j][obj+'_color'] = color;
				timerN[j][obj].setAttribute('style','color:'+color+';');
			}
		}
		if( percentUsed < 50 ){
			changeColor('perreso','blue');
		}else if (parseInt(percentUsed) < 70){
			changeColor('perreso','#FF6600');
		}else if (parseInt(percentUsed) > 80){
			changeColor('perreso','red');
			timerN[j]['perreso'].setAttribute('style','text-decoration:blink;');
		}
		if (parseInt(timerRB[j].time) < parseFloat(RB.Setup[6])*3600){
			changeColor('resotime','red');		
		}else if (parseInt(timerRB[j].time) < parseFloat(RB.Setup[5])*3600){
			changeColor('resotime','#9900CC');
		}else{
			changeColor('resotime','green');
		}		
		} else if( timerN.length != 0 ){
			$g('res').getElementsByTagName('li')[j].removeChild(timerN[j].divme1);
			if( j == 3 ) timerN.length = 0;
		}//end code
	}
	if( addCss != '' ) GM_addStyle(addCss);
	for( var i = 0; i < timerP.length; i++ ) {
		timerP[i].obj.innerHTML = formatTime(++timerP[i].time, 1);
	}
	for( var i = 0; i < timerB.length; i++ ) {
		if( timerB[i].time != 0 ) {
			timerB[i].time += timerB[i].time > 0 ? -1 : 1;
			timerB[i].obj.innerHTML = formatTime(timerB[i].time, (typeof timerB[i].ft == 'undefined')? 0: timerB[i].ft);
		}
	}
	for( var i = 0; i < timerB3.length; i++ ) {
		if( timerB3[i].time > 0 ) timerB3[i].obj.innerHTML = formatTime(--timerB3[i].time, 3);
		else if( timerB3[i].time == 0 ) {
			timerB3[i].obj.style.color = 'red';
			timerB3[i].time--;
			show_alert();
		}
	}
	for( var i = 0; i < timerF.length; i++ ) {
		timerF[i].obj.innerHTML = formatTime(++timerF[i].time, 0);
	}
	for( var i = 0; i < timerOv.length; i++ ) {
		if( timerOv[i].time != 0 ) {
			timerOv[i].time += timerOv[i].dir;
			timerOv[i].obj.innerHTML = formatTime(timerOv[i].time, 0);
		}
	}
}
function progressbar_init() {
	calculationPPH();
	var mm = RB.Setup[22] > 0 ? normalProductionCalc( sumPPH ) : [0,0,0,0];
	var ssPPH = 0;
	var tblBody = $e("tbody");
	if( RB.bodyH[0] == 1 ) $at(tblBody,[['style','border; display:none']]);
	for (var j = 0; j < 4; j++) {
		// creates a table cell
		// here to renice the table
		var cellText = $e("div", [["class", allIDs[2]]]);

		timerRB[j] = new Object();
		timerRB[j].pb = $e('div', [['class', allIDs[16] + j]]);
		var fval = $e('DIV');
		fval.appendChild($e('IMG',[['class','r' + (j+1)],['src','img/x.gif'],['title',income[j]]]));
		timerRB[j].pval = $e('span');
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
			if( j == mm[1] ) sumAttr.push(['style','color:Blue;']);
			if( j == mm[2] ) sumAttr.push(['style','color:Magenta;']);
			// text-decoration:blink;
			if( j == mm[3] ) sumAttr.push(['style','color:Red;']);
		}
		row.appendChild($c(sumPPH[j],sumAttr));
		tblBody.appendChild(row);
	}

	var alink = $a(gtext('ResourceBar'),[['href', '#'],['onClick',jsNone],['title',gtext("overview")]]);
	alink.addEventListener('click', overviewAll, false);

	// var aImg = $e('IMG',[['src',img_pref],['title',gtext("settings")],['style','padding:0px 2px;cursor:pointer;']]);
	// aImg.addEventListener('click', rbSetup, false);

	// var aL = $e('IMG',[['src',image["bOK"]],['title',gtext("notes")],['style','padding:0px 2px;cursor:pointer;']]);
	// aL.addEventListener('click', changeNotesHight, false);

	// var note_Width = new_getValue('note_Width', '');
	// var note_Hight = new_getValue('note_Hight', '');

	// var alinkW = $a('[' + gtext("N_W") +']', [['href', jsVoid],['style','font-size:8px;'],['title',gtext("notew") + "\t" + note_Width]]);
	// alinkW.addEventListener('click', changeNotesWidth, false);
	
	
	// var alinkH = $a('[' + gtext("N_H") + ']', [['href', jsVoid],['style','font-size:8px;'],['title',gtext("noteh") + "\t" + note_Hight]]);
	// alinkH.addEventListener('click', changeNotesHight, false);

	if( ltr )
	{// improvment 1
		// var cell = $em('TH',[alink,alink2,aImg2,aImg,alink3,alinkW,alinkH],[['class','rb_head']]);
		var cell = $em('TH',[alink],[['class','rb_head']]);
	}
	else // Here to change resource bar to right align
	{// improvment 1 // rearrange them as you like
		// var cell = $em('TH',[alinkH,alinkW,alink3,aImg,aImg2,alink],[['class','rb_head']]);		
		var cell = $em('TH',[alink],[['class','rb_head']]);
		cell.style.textAlign="right";
	}
	var pphSpan = $ee('SPAN',gtext('prprh'),[['title',ssPPH]]);
	pphSpan.addEventListener('click', function (x) { return function() { bodyHide(x); }}([tblBody,0]), false);
	var tblHead = $ee("thead",$em('TR',[cell,$c(pphSpan,[['class',allIDs[12]]])]));
	var qoverviewD = $e('TABLE',[['id',allIDs[8]]]);
	var qnewTHead = $ee('THEAD',$em('TR',[$c(' '),$c(trImg('r1')),$c(trImg('r2')),$c(trImg('r3')),$c(' '),$c(trImg('r4')),$c(' '),$c(trImg('clock')),$c('')]));

	var tbl = $em('TABLE',[tblHead,tblBody],[['cellspacing', '1'],['cellpadding', '1'],['id', allIDs[1]]]);

	if( RB.Setup[4] == 0 ) {
		$g(pageElem[2]).appendChild($ee('P',tbl));
	} else {
		makeFloatD(tbl, 1);
	}
	progressbar_time = new Date().getTime();
	progressbar_updValues();
	progressbar_time = (new Date().getTime()) - progressbar_time;
}
// thanks to yenoh
function saveSpaceLeftToMem() {// making the percentage changable
    RB.wantsMem = [0,0,0,0,village_aid];
    do
    {
    	warehouse_prsntag = prompt( gtext('savedpq'), warehouse_prsntag);
    }while( parseInt(warehouse_prsntag) > 100 || parseInt(warehouse_prsntag) < 0 );
    if( !warehouse_prsntag )
    {
    	warehouse_prsntag = 75;
    	new_setValue('warehouse_prsntag', warehouse_prsntag);
    	return ;    	
    }
    new_setValue('warehouse_prsntag', warehouse_prsntag);
    
    for (var e = 0; e < 4; e++) {
        RB.wantsMem[e] = Math.round(fullRes[e] * parseInt(warehouse_prsntag) / 100) - Math.round(resNow[e]);
    }
    saveCookie('Mem', 'wantsMem');
    if( ltr )
    {
    	alert( warehouse_prsntag + " % " + gtext("savedp") + "\n\n" + RB.wantsMem[0] + sprt + RB.wantsMem[1] + sprt + RB.wantsMem[2] + sprt + RB.wantsMem[3] );
    }
    else
    {
    	alert( warehouse_prsntag + " %\n" + gtext("savedp") + "\n\n" + RB.wantsMem[0] + sprt + RB.wantsMem[1] + sprt + RB.wantsMem[2] + sprt + RB.wantsMem[3] );
    }// */
}
function distanceToMyVillages() {
	var curD = getVid(crtPath);
	var sel = $e('SELECT');
	for( var j = 0; j < 21; j++ ) sel.options[j] = new Option(j, j, false, false);
	var al = parseInt(RB.Setup[9]) == 0 ? parseInt(RB.village_Var[1]) : parseInt(RB.Setup[9]) - 1;
	sel.selected = al; sel.value = al;
	attbl = showAllTTime(1, curD, al);
	lastTimerP[2] = lastTimerP[0];
	lastTimerP[0] = lastTimerP[1];
	var pp = $em('P',[arena + ' : ',sel,attbl],[['style','margin:10px 30px;']]);
	cont.appendChild(pp);
	document.addEventListener("change", updateDistTable, false);

	var villages = $g(pageElem[5]);
	if ( ! villages ) return;
	villages = villages.tBodies[0].rows;
	for( var i = 0; i < villages_id.length; i++ ) {
		var distance = parseFloat(calcDistance( villages_id[i], curD ).toFixed(1));
		villages[i].cells[3].appendChild($t(" <-> " + distance));
	}
	function updateDistTable () {
		pp.removeChild(attbl);
		lastTimerP[0] = lastTimerP[2];
		attbl = showAllTTime(1, curD, sel.value);
		lastTimerP[0] = lastTimerP[1];
		pp.appendChild(attbl);
	}
}
function distanceToTargetVillages() {
	// here to make it easyer ! improvment 5
	var vtable = $g("villages");
	if ( ! vtable ) return;
	// add additional field
	var vtrows = vtable.tHead.rows;
	if( ! ver4FL ) vtrows[0].cells[0].setAttribute("colspan","4");
	vtrows[ver4FL?0:1].appendChild($c('&lt;-&gt;',[['style','width:10%;']]));
	// fill rows
	var vtrows = vtable.tBodies[0].rows;
	for (var mr = 0; mr < vtrows.length; mr++)
	{
		var vtLink = vtrows[mr].cells[0].getElementsByTagName('a')[0];
		var vURL = vtLink.getAttribute("href");
		// alert( " vURL \n" + vURL);
		distanceTooltip(vtLink,0);
		sendResTropAdd(vtLink, 1);
		linkHint(vtLink);
		var Rej = /d=(\d+)/i;
		var vID = Rej.exec(vURL)[1];
		var distance = parseFloat(calcDistance( vID, village_aid ).toFixed(1));
		vtrows[mr].appendChild($c(distance));
	}
}
function fillXYtoRP()
{
	try
	{
		X_armored_fillXYtoRP();
	}
	catch( err )
	{
		er( err, 'M');
	}
}

function X_armored_fillXYtoRP() {
	myVid = RB_getValue(GMcookieID + 'next', -1);
	if( myVid > 0 ) {
		var arXY = id2xy( myVid );
		$gn('x')[0].value = arXY[0];
		$gn('y')[0].value = arXY[1];
		RB_setValue(GMcookieID + 'next', -1);
	}
	if( $g('troops') ) {
		var ss = $g('btn_ok');
		if( ss ) {
			var newP = $e('DIV',[['style','float:right;'],['id',allIDs[0]]]);
			addShowDistanceIn( ss, 0 );
			ss.parentNode.addEventListener('keyup', a2bInfo, false);
			ss.parentNode.addEventListener('click', a2bInfo, false);
		}
	}
}
function sendArmy( myVid ) {
	if( $gn('t9').length > 0 ) {
		var arXY = id2xy( myVid );
		$gn('x')[0].value = arXY[0];
		$gn('y')[0].value = arXY[1];
		showDistanceIn( 0 );
	} else {
		if( myVid != village_aid ) RB_setValue(GMcookieID + 'next', myVid);
		document.location.href='a2b.php';
	}
	return false;
}
function sendResourses( myVid ) {
	if( $gn('r1').length > 0 ) {
		var arXY = id2xy( myVid );
		$gn('x')[0].value = arXY[0];
		$gn('y')[0].value = arXY[1];
		showDistanceIn( -1 );
	} else {
		if( RB.village_Dorf2[0] != 0 ) {
			if( myVid != village_aid ) RB_setValue(GMcookieID + 'next', myVid);
			document.location.href='build.php?id=' + RB.village_Dorf2[0];
		} else {
			document.location.href='build.php?z=' + myVid + '&gid=17';
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
	if( RB.village_Dorf2[4] > 0 ) { // search&save Tournament Square
		var turF = $xf('.//img[contains(@class,"g14")]','f',base).getAttribute('alt').split(' ');//.match(/\d+$/)[0];
		var tur = turF.pop();
		if( tur != RB.village_Var[1] ) {
			RB.village_Var[1] = tur;
			saveVCookie( 'VV', RB.village_Var );
		}
		var turD = turF.join(' ');
		if( turD != RB.dictionary[3] ) {
			RB.dictionary[3] = turD;
			RB.dictFL[3] = 1;
			saveCookie( 'Dict', 'dictionary' );
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
	var dictsFL = [['g17',7],['g19',8],['g20',9],['g21',10]];
	for( var i = 0 ; i < dictsFL.length; i++ ) {
		if( RB.dictFL[dictsFL[i][1]] == 0 && RB.village_Dorf2[i] > 0) {
			var turF = $xf('.//img[contains(@class,"'+dictsFL[i][0]+'")]','f',base).getAttribute('alt').split(' ');
			turF.length = turF.length - 2;
			var turD = turF.join(' ');
			RB.dictionary[dictsFL[i][1]] = turD;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[dictsFL[i][1]] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
	if( RB.dictFL[6] == 0 ) {
		var turF = $xf('.//img[contains(@class,"dx1 g16")]','f',base);
		if( turF ) {
			turF = turF.getAttribute('alt').split(' ');
			turF.length = turF.length - 2;
			var turD = turF.join(' ');
			RB.dictionary[6] = turD;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[6] = 1;
			saveCookie( 'DictFL', 'dictFL' );
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
function gtext( txt ) {
	LC = setLC();
	// alert( "LC is \n" + LC );
	var ntxt = typeof DICT['en'][txt] == 'undefined' ? 'Error!': DICT['en'][txt];
	if( typeof DICT[LC] == 'undefined' ) return ntxt;
	if( typeof DICT[LC][txt] != 'undefined' ) ntxt = DICT[LC][txt];
	else if( typeof DICT[LC]["fb"] != 'undefined' )
		if( typeof DICT[DICT[LC]["fb"]] != 'undefined' )
			if( typeof DICT[DICT[LC]["fb"]][txt] != 'undefined' ) ntxt = DICT[DICT[LC]["fb"]][txt];
	return ntxt;
}
function er( error, errno )
{
	if( !errno )
	{
		alert( gtext("err") + "\n\n\t" + error);
		return ;
	}
	alert( gtext("err") + "\n" + error + "\n # \t" + errno );
}
/// totalsettings
RB.dSetup = [
//                0,    1,   2,   3,   4,   5,   6,   7,   8,   9,
/* 0 */	    version,    0,   0,   0,   1,  16,   8,   1,   3,   0,
/* 1 */           2,    1,   2,   0,   1,   1,   1,   0,   1,   2,
/* 2 */           1,    1,   1,  10,  70,   1,   1,   0,   0,   audiofile,
/* 3 */           0,   15,  11,  15,   1,   1,   1,   1,   1,   1	];
RB.Setup = RB.dSetup.slice();

function rbSetup() {
	var analyzers = [gtext('incomreso')[0]];
	for( var i = 1; i <= serversAC; i++ ) {
		analyzers[i] = userActivityServers( i, 1, true )[0];
	}
	
	var normProd = [gtext('incomreso')[0],gtext("normal")];
	for( var i = 2; i < normalizeProductionCount+2; i++ ) {
		normProd[i] = RB.dictTR[i+(10*raceid)-1];
	}
	// 0 is type(Info,CheckBox,Text,SELect,SPan,Button), 1 is setupNum, 2 is text, 3 is ext
	var aRBS = [
		['I', 0, gtext("info"), ''],
			['SEL', 1, gtext("scrlang"), langs],
			// ['T'  , 2, gtext("yourrace"), gtext("racelist")], // no longer needed
			['SEL', 3, gtext("speedart"), [gtext('none'),'x1.5','x2','x3']],
			['SEL', 9, arena, [gtext("auto"),0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]],
			['T', 24, gtext("cranny"), gtext("crannyh")],
		['I', 0, gtext("builtin"), gtext("builtinh")],
			['SEL', 22, gtext("normalize"), normProd],
			['CB', 25, gtext("banalyze"), ''],
			['CB', 26, gtext("cropfind"), ''],
			['SEL', 30, gtext("adetect"), gtext("adetecto")],
			['T', 31, gtext("adetectt"), gtext("adetecth")],
		['I', 0, gtext("onallp"), ''],
			['CB', 7, gtext("dontwrap"), gtext("dontwraph")],
			['CB',14, gtext("buildand"), gtext("buildandh")],
			['CB',15, gtext("sendres"), ''],
			['CB',18, gtext("sendmess"), ''],
			['SEL',19, gtext("analyzer"), analyzers],
			['B', 0, gtext("analyzer"), [gtext('settings'),'analyzerSetup']],
			['CB',16, gtext("bigicon"), ''],
			['CB',21, gtext("addvtable"), gtext("addvtableh")],
			['CB',13, gtext("paranoid"), gtext("paranoidh")],
			['CB',17, gtext("opennote"), ''],
			['T' , 32, gtext("noteh"), 13 ],// note_Hight starting from 51 is made by Qusai 
			['T' , 33, gtext("notew"), 19 ],// note_Width
		['I', 0, gtext("resbar"), ''],
			['CB', 4, gtext("showres"), ''],
			['T', 6, gtext("redbl"), ''],
			['T', 5, gtext("yellowbl"), ''],
		['I', 0, gtext("marketpl"), ''],
			['SEL', 8, gtext("mfilter"), gtext("mfiltero")],
			['CB', 11, gtext("npcsum"), gtext("npcsumh")],
			['T', 23, gtext("bidinc"), gtext("bidinch")],
		['I', 0, gtext("rpandmp"), ''],
			['SEL', 10, gtext("incomres"), gtext("incomreso")],
			['SEL', 20, gtext("troopsI"), gtext("troopsIo")],
			['SEL', 27, gtext("defRP"), gtext("defRPo")],
		['I', 0, gtext("links"), ''],
			['SEL',12, gtext("showls"), gtext("showlso")],
			['T', 'ln2', gtext("savedgls"), ''],
			['T', 'ln', gtext("savedls"), ''],
		['I', 0, gtext("notifi"), ''],
			//['SEL',28, gtext("method"), [gtext('none'),gtext('alert'),'HTML5 audio','EMBED audio','FLASH player']],
			['SEL',28, gtext("method"), [gtext('none'),gtext('alert'),gtext('haudio'),gtext('eaudio'),gtext('faudio')]],
			['T', 29, gtext("audiourl"), 'http://... .mp3 .ogg .wav'],
			['B', 0, gtext("audiotest"), [ gtext("testing") ,'testAudio']],
		['I', 0, gtext("savedd"), gtext("saveddh")],
			['B', 0, gtext("savedelall"), [gtext("del"),'allStorageDelete']],
		['I', 0, '', '']
	];

	if( closeWindowN(0) ) return;
	// header
	setupD = $e('TABLE',[['id',allIDs[6]]]);
	var newTR = $ee('TR',$c(gtext("svers")+': ' + version)); //RB.Setup[0]));
	newTR.appendChild(okTD(setupSave,destroySetup));
	setupD.appendChild(newTR);
	// end of header
	// automated information
	var newTt = $ee('SPAN', gtext("accinfo"));
	var newTR = $ee('TR',$c(newTt,[['colspan','2'],['style','text-align:center']]));
	setupD.appendChild(newTR);
	// End of automated information
	
	// automated capital name
	var racetdn = $ee('SPAN',gtext("cap"));
	var racetdi = $ee('SPAN', capitalname);
	var newTR = $ee('TR',$c(racetdn,[['colspan','1'],['style','text-align:' + docDir[0] ]]) );
	newTR.appendChild( $c(racetdi,[['colspan','1'],['style','text-align:center']]) );
	setupD.appendChild(newTR);
	// end of automated capital name
	
	// automated capital coordinates
	var racetdn = $ee('SPAN', gtext("capcords"));
	var racetdi = $ee('SPAN', capitalcoords);
	var newTR = $ee('TR',$c(racetdn,[['colspan','1'],['style','text-align:' + docDir[0]]]) );
	newTR.appendChild( $c(racetdi,[['colspan','1'],['style','text-align:center']]) );
	setupD.appendChild(newTR);
	// End of automated capital coordinates
	
	var racetdn = $ee('SPAN',gtext("yourrace"));
	var racetdi = $ee('SPAN',racenm);
	// alert ( "Your racenm is \n" + racenm );
	
	var newTR = $ee('TR',$c(racetdn,[['colspan','1'],['style','text-align:' + docDir[0]]]) );
	newTR.appendChild( $c(racetdi,[['colspan','1'],['style','text-align:center']]) );
	setupD.appendChild(newTR);
	// end of automated racenm
	
	for( var i = 0; i < aRBS.length; i++ ) {
		if( aRBS[i][0] == 'I' ) {
			var newTt = $ee('SPAN',aRBS[i][2]);
			if( typeof aRBS[i][3] == 'string' && aRBS[i][3].length > 1 ) {
				$at(newTt,[['title',aRBS[i][3]]]);
				newTt.appendChild($e('IMG',[['src',img_tinfo],['style','padding:0px 6px;']]));
			}
			var newTR = $ee('TR',$c(newTt,[['colspan','2'],['style','text-align:center']]));
		} else {
			var vN = isNaN(aRBS[i][1]) ? RB_getValue(GMcookieID + aRBS[i][1], "") : RB.Setup[aRBS[i][1]];
			var newTt = $ee('SPAN',aRBS[i][2]);
			if( typeof aRBS[i][3] == 'string' && aRBS[i][3].length > 1 ) {
				$at(newTt,[['title',aRBS[i][3]]]);
				newTt.appendChild($e('IMG',[['src',img_tinfo],['style','padding:0px 6px;']]));
			}
			var newTR = $ee('TR',$c(newTt));
			switch( aRBS[i][0] ) {
				case 'CB': var newO = $e('INPUT',[['type', 'CHECKBOX']]); if(vN == 1) $at(newO, [['checked', true]]); break;
				case 'T': var newO = $e('INPUT',[['type', 'TEXT'],['value',vN]]); break;
				case 'SEL': var newO = $e('SELECT');
					for( var j = 0; j < aRBS[i][3].length; j++ ) newO.options[j] = new Option(aRBS[i][3][j], j, false, false);
					newO.selected = vN; newO.value = parseInt(vN); break;

				case 'SP': var newO = $ee('SPAN',vN); break;
				case 'B': var newO = $ee('BUTTON',aRBS[i][3][0],[['class',allIDs[15]],['type', 'BUTTON'],['onClick',jsNone]]);
					newO.addEventListener('click', eval(aRBS[i][3][1]), true);
					break;
			}
			$at(newO, [['name', aRBS[i][1]]]);
			newTR.appendChild($c( newO, [['class','RBVals']]));
		}
		setupD.appendChild(newTR);
	}
	
	var newTR = $ee('TR',$em('TD',[gtext("youlang")+': ',$ee('b',armored_Get_LC() )]));
	newTR.appendChild(okTD(setupSave,destroySetup));
	setupD.appendChild(newTR);
	windowID[0] = makeFloatD(setupD, 0);

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
		if(parseInt(RB.Setup[32]) < 5 ) RB.Setup[32] = 13;
		if(parseInt(RB.Setup[33]) < 7 ) RB.Setup[33] = 19;
		saveCookie( 'RBSetup', 'Setup' );
		destroySetup();
		location.reload(true);
	}
	function destroySetup() {
		closeWindowN(0);
	}
}

function allStorageDelete () {
	if( ! confirm(gtext("savedelallh")) ) return;
	for( var i = 0; i< allCookies.length; i++ ) {
		RB_deleteValue( GMcookieID + allCookies[i] );
	}
	new_deleteValue('warehouse_prsntag');
	new_deleteValue('cranycap');
	new_deleteValue('cranyprsntag');

	new_deleteValue('raceid');
	new_deleteValue('racenm');
	new_deleteValue('capitalname');
	new_deleteValue('capitalcoords');

//	new_deleteValue('note_Hight');
//	new_deleteValue('note_Width');
	
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
}
function parseSpieler() {
	var Rej = new RegExp('uid=' + userID);
	if( ! Rej.test(crtPath) ) return;
	var capitalS = $xf('./tbody/tr/td/span','f',$g('villages'));
	var capital = capitalS.parentNode.getElementsByTagName('A')[0].getAttribute('href').match(/d=(\d+)/)[1];
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
var vLinksPat = ver4FL? '//div[@id="villageList"]//li/a':'//table[@id="vlist"]//div/a[contains(@href, "newdid")]';
function overviewWarehouse () {
	var overviewD = $e('TABLE',[['id',allIDs[8]]]);
	var newTHead = $e('THEAD');

	var refreshImg = $e('IMG',[['src', img_refr],['title',gtext("refresh")]]);
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
		var vName = vLinks.snapshotItem(vn).cloneNode(true);
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

	function refreshOview () {
		if( (parseInt(RB.overview[1]) + 900) > nowTime ) return;
		RB.overview[0] = 0;
		RB.overview[1] = crtPath.split("?")[0] + clearAntibot( linkVSwitch[village_aNum] );
		saveCookie('OV', 'overview');
		document.location.href=fullName + 'dorf1.php';
	}

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
	var newTHead = $ee('THEAD',$em('TR',[$c(' '),$c(trImg('r1')),$c(trImg('r2')),$c(trImg('r3')),$c(' '),$c(trImg('r4')),$c(' '),$c(trImg('clock')),$c('')]));

	overviewD.appendChild(newTHead);

	var newTBody = $e('TBODY');
	var t = 0;
	var resSumm = [0,0,0,0];
	var nowTime = Math.round((new Date().getTime())/1000);
	var vLinks = $xf(vLinksPat,'l');
	for ( var vn = 0; vn < vLinks.snapshotLength; vn++ ) {
		var vName = vLinks.snapshotItem(vn).cloneNode(true);
		if( villages_id[vn] == village_aid ) $at(vName, [['style','color:#71D000;']]);
		var newTR = $ee('TR',$c(vName));
		loadVCookie('vPPH', 'village_PPH', villages_id[vn]);

		for( var i = 0; i < 4; i++ ) {
			var deltaTime = RB.village_PPH[12] > 0 ? nowTime - parseInt(RB.village_PPH[12]): 0;
			var nowResInV = Math.round(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
			if( nowResInV > RB.village_PPH[i+8] ) nowResInV = RB.village_PPH[i+8];
			if( nowResInV < 0 ) nowResInV = 0;
			resSumm[i] += nowResInV;
			var attr = [['class',allIDs[19]]];
			if( RB.village_PPH[i] < 0 ) attr[1] = ['style','color:red;'];
			newTR.appendChild($c(humanRF(nowResInV),attr));
			if( i == 2 ) newTR.appendChild($c('/'+RB.village_PPH[8],[['style','font-size:8pt;']]));
		}

		newTR.appendChild($c('/'+RB.village_PPH[11],[['style','font-size:8pt;']]));
		if( villages_id[vn] != village_aid )
			newTR.appendChild($c(formatTime(getTTime(calcDistance(villages_id[vn],village_aid),MTime[parseInt(raceid)]*sM,0,0),0)));
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
	newTR.appendChild($c(' '));
	newTR.appendChild($c(' '));
	overviewD.appendChild($ee('TFOOT',newTR));
	return overviewD;
}

function overviewTroops () {
	var overviewD = $e('TABLE',[['id',allIDs[8]]]);

	var newTBody = $e('TBODY');
	var vLinks = $xf(vLinksPat,'l');
	for ( var vn = 0; vn < vLinks.snapshotLength; vn++ ) {
		var vName = vLinks.snapshotItem(vn).cloneNode(true);
		if( villages_id[vn] == village_aid ) $at(vName, [['style','color:#71D000;']]);
		var newTR = $ee('TR',$c(vName));

		loadVCookie('Dorf12','village_dorf12',villages_id[vn],1);
		var t = 0;
		var hfl = false;
		if( RB.village_dorf12[0] > 0 ) {
			var tT = $e('TABLE',[['class',allIDs[7]],['style','width:100%;']]);
			if( RB.village_dorf12[1] == 'hero' ) hfl = true;
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
	if( villages_count < 2 ){ alert( gtext("single") );  return; }
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
}
function clearAntibot ( oldURL ) {
	var clearURL = oldURL.replace(/&c=[\w]{6,6}/,'');
	return clearURL;
}
function saveLink ( lns ) {
	var newCL = '';
	for( var i = 0; i < lns.length; i++ )
		if( /d=\d+/i.test(lns[i]) ) newCL += lns[i] + '@@_';
	RB_setValue(GMcookieID + "ln", newCL);
	$g(windowID[5]).parentNode.removeChild($g(windowID[5]));
	showLinks();
}
function showLinks () {
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

	rbLinks = $e('TABLE',[['id',allIDs[9]]]);
	var newTHead = $e('THEAD');
	var newTR = $e('TR');
	if( ! ver4FL && flKarte ) {
		var newA = $ee('A',$e('IMG',[['src',image["addbmthispage"]]]),[['href',jsVoid],['title',gtext("addcur")]]);
		newA.addEventListener('click', addLink, true);
		newTR.appendChild($c(newA));
	}
	// change symbol
	var editCL = $ee('A',$e('IMG',[['src',image["editbookmark"]]]),[['href',jsVoid],['title',gtext("edit")]]);
	editCL.addEventListener('click', editCLink, false);
	// start of trial
	var newA = $ee('A',$e('IMG',[['src',image["addbookmark"]]]),[['href',jsVoid],['title',gtext("addnew")]]);		
	newA.addEventListener('click', function() { addCLink(false); }, true);
	// var newB = $a('(+)',[['href',jsVoid],['title',gtext("addcur")],['style','color:red;']]);
	var newB = $ee('A',$e('IMG',[['src',image["addbmthispage"]]]),[['href',jsVoid],['title',gtext("addcur")]]);
	newB.addEventListener('click', function() { addCLink(true); }, true);
	// End trial
	
	var newTD = $em('TD',[gtext("links") + " ",' : ',editCL],[['colspan',(ver4FL && flKarte ? 3:2)]]);
	newTR.appendChild(newTD);
	// by Qusai
	// newTR.appendChild(newA);
	// newTR.appendChild(newB);
	// by Qusai
	newTHead.appendChild(newTR);
	rbLinks.appendChild(newTHead);

	var newTBody = $e('TBODY');
	for( var i = 0; i < clinks.length; i++ ) {
		var oneLink = clinks[i].split("\/@_");
		newTBody.appendChild($ee('TR',$c($a(oneLink[0],[['href',oneLink[1]]]),[['colspan',(ver4FL && flKarte ? 3:2)]])));
	}
	if( i > 0 ) newTBody.appendChild($ee('TR',$c(' ',[['style','height:2px;line-height:2px;background-color:silver;'],['colspan',(ver4FL && flKarte ? 3:2)]])));

	for( var i = 0; i < alinks.length; i++ ) {
		var oneLink = alinks[i].split("\/@_");
		var tVId = parseInt(oneLink[0].match(/d=(\d+)/)[1]);
		var newTR = $e('TR');
	
		//if( flKarte ) // make quick links always changable !
		{
			
			var newA = $ee('A',$e('IMG',[['src',img_del]]),[['href',jsVoid],['title',gtext("del")]]);
			newA.addEventListener('click', function(x) { return function() { removeLink(x); }}(i), false);
			var newTD = $c(newA);
			var newA = $ee('A',$e('IMG',[['src',image["editbookmark"]]]),[['href',jsVoid],['title',gtext("edit")]]);
			newA.addEventListener('click', function(x) { return function() { editLink(x); }}(i), false);
			newTD.appendChild(newA);
			newTR.appendChild(newTD);
		}
		var newA = $a(oneLink[1],[['href','/karte.php?'+oneLink[0]]]);
		distanceTooltip(newA,0);
		var newTD = $c( newA);
		newTR.appendChild(newTD);
		var newTD = $c(addARLinks(tVId,1));
		newTR.appendChild(newTD);
		newTBody.appendChild(newTR);
	}
	rbLinks.appendChild(newTBody);

	if( RB.Setup[12] == 1 ) {
		windowID[5] = allIDs[9]+'F';
		$g(pageElem[2]).appendChild($ee('P',rbLinks,[['id',windowID[5]]]));
	} else {
		windowID[5] = makeFloatD(rbLinks, 3);
	}
	function addLink () {
		var newLink = crtPath.match(/[?&](d=.*)$/i);
		if( newLink.length == 0 ) return;
		newLink = newLink[1];
		var newName = $gt('h1',cont)[0].innerHTML.replace(/<.+?>/g, "").replace(/&.+?;/g, " ");
		if( newName == null ) return;
		var newOneLink = newLink + "\/@_" + newName;
		alinks.push(newOneLink);
		saveLink( alinks );
	}
	function removeLink ( num ) {
		if( ltr )
		{
			if( ! confirm(gtext("linkdel")+' ? \n'+(alinks[num].split("\/@_")[1]) ) ) return;
		}
		else
		{
			if( ! confirm(gtext("linkdel")+' ؟ \n'+(alinks[num].split("\/@_")[1]) ) ) return;
		}
		alinks.splice(num, 1);
		saveLink( alinks );
	}
	function editLink ( num ) {
		var oneLink = alinks[num].split("\/@_");
		var newName = prompt(gtext("linkname"), oneLink[1]);
		if( newName == null ) return;
		alinks[num] = oneLink[0] + "\/@_" + newName;
		saveLink( alinks );
	}
	function editCLink () {
		if( closeWindowN(6) ) return;
		var SN = 0;
		var eBody = $e('TBODY');
		var editLinks = $ee('TABLE',eBody);
		editLinks.appendChild($em('THEAD',[$ee('TR',okTD(saveCLinks,cancelCLinks,3)),$em('TR',[$c(gtext("linkname")),$c('URL',[['colspan',2]])])]));
		for( var i = 0; i < clinks.length; i++ ) {
			var oneLink = clinks[i].split("\/@_");
			var newA = $ee('A',$e('IMG',[['src',img_del]]),[['href',jsVoid],['title',gtext("del")]]);
			newA.addEventListener('click', function(x) { return function() { removeCLink(x); }}(SN), false);
			eBody.appendChild($em('TR',[$c($e('INPUT',[['value',oneLink[0]],['name','lname'],['size',20]])), $c($e('INPUT',[['value',oneLink[1]],['name','lurl'],['size',50]])),$c(newA)],[['id','sn'+(SN++)]]));
		}
		var newA = $ee('A',$e('IMG',[['src',image["addbookmark"]]]),[['href',jsVoid],['title',gtext("addnew")]]);		
		newA.addEventListener('click', function() { addCLink(false); }, true);

		var newB = $ee('A',$e('IMG',[['src',image["addbmthispage"]]]),[['href',jsVoid],['title',gtext("addcur")]]);
		newB.addEventListener('click', function() { addCLink(true); }, true);
		
		editLinks.appendChild($ee('TFOOT',$em('TR',[$em('TD',[newA,' / ',newB],[['style','text-align:center;font-size:20px;']]),okTD(saveCLinks,cancelCLinks,2)])));

		windowID[6] = makeFloatD(editLinks, 9);

		function removeCLink ( num ) {
			eBody.removeChild($g('sn'+num));
		}
		function addCLink ( fl ) {
			var v = fl ? crtPath: '';
			var newA = $ee('A',$e('IMG',[['src',img_del]]),[['href',jsVoid],['title',gtext("del")]]);
			newA.addEventListener('click', function(x) { return function() { removeCLink(x); }}(SN), false);
			eBody.appendChild($em('TR',[$c($e('INPUT',[['value',get_Name()],['name','lname'],['size',20]])), $c($e('INPUT',[['value',v],['name','lurl'],['size',50]])),$c(newA)],[['id','sn'+(SN++)]]));
		}
		function saveCLinks () {
			var names = $gn('lname');
			var urls = $gn('lurl');
			var newCL = '';
			for( var i = 0; i < names.length; i++ ) {
				if( urls[i].value.length < 3 ) continue;
				if( names[i].value.length == 0 ) {
					if( urls[i].value.length > 25 )
						newCL += urls[i].value.slice(0,9) +'..'+ urls[i].value.slice(-14) +"\/@_"+ urls[i].value +"@@_";
					else
						newCL += urls[i].value +"\/@_"+ urls[i].value +"@@_";
				} else newCL += names[i].value +"\/@_"+ urls[i].value +"@@_";
			}
			RB_setValue(GMcookieID + "ln2", newCL);
			cancelCLinks();
			$g(windowID[5]).parentNode.removeChild($g(windowID[5]));
			showLinks();
		}
		function cancelCLinks () {
			closeWindowN(6);
		}
	}
}
// Start by Qusai Abu Hilal
// I made it to test making quick links in almost all pages
function qaddLink () 
{
	if( vilView ) 
	{
		var h1 = $gt('H1',vilView)[0];
		if( ! h1 ) 
		{
			h1 = $gt('H1',cont)[0];
		}	
		var newLink = crtPath.match(/[?&](d=.*)$/i);
		if( newLink.length == 0 ) return;
		newLink = newLink[1];
		var newName = $gt('h1',cont)[0].innerHTML.replace(/<.+?>/g, "").replace(/&.+?;/g, " ");
		if( newName == null ) return;
		var newOneLink = newLink + "\/@_" + newName;
		alinks.push(newOneLink);
		saveLink( alinks );
	}
}// END OF test making quick links in almost all pages
function addlinkT4() {
	var vilView = $g('tileDetails');
	if( vilView ) {
		var h1 = $gt('H1',vilView)[0];
		if( ! h1 ) h1 = $gt('H1',cont)[0];
		if( h1 ) {/// here is problem
			var spn = $gt('SPAN',h1);
			var xy = getVidFromCoords(spn[2].innerHTML + '-' + spn[4].innerHTML);
			var ln_cookie = RB_getValue(GMcookieID + "ln", "");
			var alinks = ln_cookie.split("@@_");
			newLink = 'd='+xy;
			var newName = spn[1].innerHTML +' '+ printCoords(xy);
			newName = prompt(gtext("linkname"), newName);
			if( newName == null ) return;
			var newOneLink = newLink + "\/@_" + newName;
			alinks[alinks.length - 1] = newOneLink;
			saveLink( alinks );
		}
	}
}
function detectNameAttaker() {
	var tmenu = ver4FL ? $gc('contentNavi tabNavi',cont)[0] : $g('textmenu');
	if( ! (tmenu) ) { alert( gtext("noraly") ); return; }
	var nameLink = $a((ver4FL?$ee('SPAN','???',[['class','tabItem']]):'???'),[['href',jsVoid]]);
	nameLink.addEventListener('click', prepareGetAttakers, false);
	var newSP = ver4FL ? $em('DIV',[$e('DIV',[['class','background-start']]),$e('DIV',[['class','background-end']]),$ee('DIV',nameLink,[['class','content']])],[['class','container normal']]):
		$em('SPAN',[$t(' | '),nameLink]);
	if( ver4FL ) tmenu.insertBefore(newSP,$gc('clear',tmenu)[0]); else tmenu.appendChild(newSP);

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
		tTD.appendChild($a(tname,[['href',tlink],['title',aname]]));
	}
	function prepareGetAttakers() {
		var allIn = $xf('.//table[tbody/tr/td/div[@class="in"]]','l',cont);
		var hrefCache = [];
		var curTO = 0;
		for( var i = 0; i < allIn.snapshotLength; i++ ) {
			ttable[i] = allIn.snapshotItem(i);
			thref[i] = $xf('thead/tr/td[@class="role"]/a', 'f', ttable[i]).getAttribute('href');
			hrefCache[thref[i]] = true;
			curTO += hrefCache[thref[i]] ? 1: getRandom(500,2000);
			setTimeout(function(x) { return function() { nameAttaker(x); }}(i), curTO);
		}
		newSP.parentNode.removeChild(newSP);
	}
}
/***************************** Activity Servers **********************************/
var serversAC = 5;
RB.serversAN = new Array(serversAC);
function userActivityServers ( num, id, user ) {
	var dsrv = RB.serversAN[num-1] !== undefined ? RB.serversAN[num-1]: srv;
	if( num == 1 ) {
		return ['travian-utils.com','http://travian-utils.com/?s='+dsrv+'&id'+(user?'u':'a')+'='+id,'http://travian-utils.com/?s=###'+dsrv+'###&idu=...'];
	} else if ( num == 3 ) {
		return ['travianbox.com','http://travianbox.com/stats/'+(user?'player':'alliance')+'/'+dsrv+'/id/'+id,'http://travianbox.com/stats/player/###'+dsrv+'###/id/...'];
	} else if ( num == 4 ) {
		if( RB.serversAN[num-1] === undefined )
		if( /ts/.test(crtPath) ) {
			dsrv = srv.match(/\D+/)[0]+'ts'+srv.match(/\d+/)[0];
			if( srv == 'com10' ) dsrv = 'comts01';
		}
		return ['travianstats.de','http://travianstats.de/index.php?m='+(user?'player':'alliance')+'_info&'+(user?'u':'a')+'id='+id+'&w='+dsrv,'http://travianstats.de/index.php?m=player_info&w=###'+dsrv+'###uid=...'];
	} else if ( num == 5 ) {
		if( RB.serversAN[num-1] === undefined ) dsrv = crtName;
		return ['gettertools.com','http://www.gettertools.com/'+dsrv+'/'+(user?'Player':'Alliance')+'/'+id+'-','http://www.gettertools.com/###'+dsrv+'###/Player/...'];
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
	cont.appendChild(newP);
}
function userActivityInfo() {
	// Get user id
	var uID = crtPath.match(/uid=(\d+)/)[1];
	ActivityInfo( uID, true );
}
function allyActivityInfo() {
	// Get server id
	var aID = crtPath.match(/aid=(\d+)/);
	if( aID ) aID = aID[1];
	else if( RB.dictionary[13] > 0 ) aID = RB.dictionary[13]; else return;
	ActivityInfo( aID, false );
}
function viewMessageIW() {
	var allRows = $xf('.//tr[td/@class="sel"]','l',cont);
	var offset =  /nachrichten/.test(crtPath) ? -67: -5;
	for( var i = 0; i < allRows.snapshotLength; i++ ) {
		var td = allRows.snapshotItem(i).cells[1];
		var newImg = $e('IMG',[['src',img_view]]);
		newImg.addEventListener('click', function(x) { return function() { selectMessage(x); }}(i), false);
		if( ver4FL )
			$at(newImg,[['style','position:relative;float:'+docDir[0]+';'+docDir[0]+':'+offset+'px;']]);
		td.insertBefore(newImg, td.firstChild);
	}
	function selectMessage (num) {
		var allRows = $xf('.//tr[td/@class="sel"]','l',cont);
		var tds = allRows.snapshotItem(num).cells;
		$gt('INPUT',tds[0])[0].setAttribute('checked',true);
		var aLinks = $xf('.//a[contains(@href, ".php?id=")]','f',tds[1]);
		var aLink = aLinks.getAttribute('href');

		var tV = /berichte/.test(aLink) ? 1: 0;
		viewMessageIWDisplay( aLink, tV );
	}
}
function viewMessageIWClose() {
	closeWindowN(4);
}
function viewMessageIWDisplay( aLink, tV ) {
	var messCr = ver4FL ? './/div[@class="paper"]' : './/form[@action="nachrichten.php"]';
	var viewPref = [
		[messCr,'messages','width:'+(ver4FL?'555px;height:620px':'440px')+';background-color:white;padding:5px;text-align:left;'],
		['.//table[@id="report_surround"]','reports','width:'+(ver4FL?'540px':'500px')+';background-color:white;padding:5px;']];

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
			windowID[4] = makeFloatD(newD, 4);
			if( ver4FL ) {
				var bigImg = $xf('.//img[contains(@class,"eportImage")]','f',aV);
				if( bigImg ) bigImg.parentNode.removeChild(bigImg);
			}
			if( tV == 1 ) { addQuickLinks(); analyzerBattle(); } else convertCoordsInMessagesToLinks();
			addRefIGM( windowID[4] );
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
		newImg.addEventListener('click', function(x) { return function() { selectMessage(x); }}(aLink), false);
		td.insertBefore(newImg, td.firstChild);
	}

	function selectMessage (aLink) {
		viewMessageIWDisplay( aLink, 1 );
	}
}
function culturePoints(){
	var aX = $gt('B',cont);
	if (aX.length < 4) return;
	var cpK = aX.length - 4;
	//production CP in all villages
	var prodCP = Math.max(toNumber(aX[cpK].innerHTML),toNumber(aX[1+cpK].innerHTML));
	//Current no of CP
	var curCP = toNumber(aX[2+cpK].innerHTML);
	//CP needed to create a new village
	var nextCP = toNumber(aX[3+cpK].innerHTML);
	if( isNaN(prodCP) || isNaN(curCP) || isNaN(nextCP) ) return;
	if( ! (prodCP > 0 && curCP > 0 && nextCP > 0) ) return;

	var classic = false;
	if( villages2cp(villages_count, classic) != nextCP ) {
		classic = true;
	}

	var newTABLE = $e('TABLE',[['class',allIDs[7]],['style','margin:2px 25px;']]);
	var newTR = $ee('TR',$c('#'));
	if( ver4FL )
		newTR.appendChild($c($xf('.//div[@class="contentNavi tabNavi"]//a[contains(@href,"s=2")]/span','f',cont).innerHTML,[['colspan',2]]));
	else
		newTR.appendChild($c($g('textmenu').getElementsByTagName('a')[1].innerHTML,[['colspan',2]]));
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

	function villages2cp( noVil, classic ) {
		// formula from TB3, from fr3nchlover
		var rV = 0;
		if( classic )
			rV = Math.round(2 * Math.pow(noVil, 2)*10) * 100;
		else
			if( /speed|x3/i.test(crtPath) )
				rV = Math.round(1.6/3 * Math.pow(noVil, 2.3)*10) * 100;
			// else if( /x2/i.test(crtPath) )
			else if( /x2|t1/i.test(crtPath) )
				rV = Math.round(1.6/2 * Math.pow(noVil, 2.3)*10) * 100;
			else if( /x5/i.test(crtPath) )
				rV = Math.round(1.6/5 * Math.pow(noVil, 2.3)*10) * 100;
			else
				rV = Math.round(1.6 * Math.pow(noVil, 2.3)) * 1000;
		return rV;
	};
}
function migrateStorage () {
	if( useDOMs ) {
		var RCookie = GM_getValue(GMcookieID + 'vPPH','');
		if( RCookie.length > 0 ) {
			for( var i = 0; i< allCookies.length; i++ ) {
				RCookie = GM_getValue(GMcookieID + allCookies[i],'');
				if( RCookie.length > 0 )
					window.localStorage.setItem(GMcookieID + allCookies[i], RCookie);
				GM_deleteValue(GMcookieID + allCookies[i]);
			}
		}
	}
}
function testScripts () {
	if( RB.Setup[13] == 0 ) return false;
	var oldScrC = RB_getValue(GMcookieID + "src", "0");
	var oldSRC = oldScrC.split('@@');
	var t=1;
	var allSRC = $gt('script');
	var URLs = '';
	var aS = false;
	var newSRC = [];
	for( var i = 0; i < allSRC.length; i++ ) {
		var sURL = allSRC[i].getAttribute('src');
		if( sURL != null ) {
			if( sURL != oldSRC[t] ) aS = true;
			newSRC[t++] = sURL;
		}
		URLs += allSRC[i].getAttribute('src') + '\n';
	}
	if( parseInt(oldSRC[0]) != t-1 ) aS = true;
	if( aS ) {
		var newSrcC = t-1;
		for( var i = 1; i < t; i++ ) {
			newSrcC += '@@' + newSRC[i];
		}
		RB_setValue(GMcookieID + "src", newSrcC);
	}
	return aS;
}
function parseDorf1 () {
	if( RB.Setup[14] == 0 ) return;
	parseBuilds();
	if( /dorf1.php/.test(crtPath) ) {
		parseAttack();
		parseTroops();
	}
	function parseBuilds() {
		loadVCookie('Dorf1','village_dorf1',village_aid,1);
		var fl = false;
		var newCookie = [0];
		var t = 1;
		var move = $g('building_contract');
		if( ! move ) {
			if( RB.village_dorf1[0] != 0 ) fl = true;
		} else {
			var descr = move.tBodies[0].rows;
			for( var i = 0; i < descr.length; i++ ) {
				newCookie[0]++;
				var td = descr[i].cells;
				newCookie[t++] = td[1].innerHTML;
				if( ver4FL ) {
					if( td.length < 3 ) {
						newCookie[t++] = 0;
						newCookie[t++] = '';
					} else {
						newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(td[2].innerHTML.match(/\d+:\d\d:\d\d/)[0]);
						newCookie[t++] = td[2].innerHTML.replace(/<.+?>/g,'').replace(/.+?\d\d\s\S+\s/,'');
					}
				} else {
					if( td.length < 4 ) {
						newCookie[t++] = 0;
						newCookie[t++] = '';
					} else {
						newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(td[2].innerHTML.match(/\d+:\d\d:\d\d/)[0]);
						newCookie[t++] = td[3].innerHTML.replace(/<.+?>/g,'');
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
		loadVCookie('Dorf11','village_dorf11',village_aid,1);
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
			var td = descr[i].cells;
			var aimg = $gt('img',td[0])[0];
			if( td.length < 2 ) break;
			var atime = td[1].innerHTML.match(/\d+:\d\d:\d\d/);
			if( aimg ) {
				newCookie[0]++;
				newCookie[t] = aimg.getAttribute('class');
				newCookie[t+2] = $gc('mov',td[1])[0].innerHTML.replace(/<.+?>/g,'');
			}
			if( atime ) {
				newCookie[t+1] = Math.round(RunTime[0]/1000) + toSeconds(atime[0]);
				t = t+3;
			}
			fl = true;
		}
		if( fl ) saveVCookie('Dorf11',newCookie,1);
	}
	function parseTroops() {
		loadVCookie('Dorf12','village_dorf12',village_aid,1);
		var newCookie = [0];
		var t = 1;
		var troops = $xf('.//tr[.//img]','r',$g("troops"));
		var fl = RB.village_dorf12[0] == troops.snapshotLength ? false : true;
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
			newTR.appendChild(timerB[t++].obj);
		} else newTR.appendChild($c('--:--'));
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
		loadVCookie('Dorf1','village_dorf1',villages_id[i],1);
		var newTD = $c('');
		if( RB.village_dorf1[0] > 0 ) {
			var dTime = RB.village_dorf1[2] - Math.round(RunTime[0]/1000);
			var color = dTime < 0 ? 'red': 'black';
			if( dTime < 0 ) dTime = 0;
			timerB3[t] = new Object();
			timerB3[t].time = dTime;
			timerB3[t].obj = $ee('SPAN',formatTime(dTime, 3),[['style','margin:0px 10px;color:'+color+';']]);
			var tb = RB.village_dorf1.slice();
			timerB3[t].obj.addEventListener("mouseover", function(x) { return function() { showTooltipBuild(x); }}(tb), false);
			timerB3[t].obj.addEventListener("mouseout", removeTooltip, false);
			newTD.appendChild(timerB3[t++].obj);
		} else newTD.appendChild($ee('SPAN','--:--',[['style','margin:0px 10px;']]));

		loadVCookie('Dorf13','village_dorf13',villages_id[i],1);
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
		loadVCookie('Dorf11','village_dorf11',villages_id[i],1);
		if( RB.village_dorf11[0] > 0 ) {
			var newdid = linkVSwitch[i].match(/newdid=\d+/i)[0];
			var newAI = $a('',[['href',fullName + 'build.php?'+newdid+'&gid=16&id=39']]);
			for( var j = 0; j < RB.village_dorf11[0]; j++ ) {
				newAI.appendChild($e('IMG',[['src','img/x.gif'],['class',RB.village_dorf11[j*3+1]]]));
			}
			var tb = RB.village_dorf11.slice();
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
	if( /&t=1(&|$)/.test(crtPath) ) return;
	var mLinks = $xf('.//a[contains(@href, "karte.php?")]', 'r', (typeof iBl == 'undefined' ? cont: iBl));
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		linkHint(mLinks.snapshotItem(j));
		distanceTooltip(mLinks.snapshotItem(j),1);
		sendResTropAdd(mLinks.snapshotItem(j), 1);
	}
}
function bigQuickLinks () {
	var bigIcon = [ // [type (true-id, false-ref), value, additional, img_ID, Dict, Dict additionnal, Background]
		[false, 'build.php?id=39'+(rpFL?'&j&k':''), '', 0, 6, 0, 0], // RP
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
	var newT = $e('TABLE',[['style','width:50px;background-color:transparent;float:'+docDir[0]+';border-collapse:collapse;'+(ver4FL?'':'margin-'+docDir[0]+':10px;')]]);
	var t = 0;
	var tdStyle = 'border:1px solid silver;background-color:white;;';
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
		makeFloatD(newT,8);
	} else {
		var insPoint = $g('plus');
		$at(insPoint,[['style','margin-left:10px;margin-right:10px;']]);
		$at($g('mtop'),[['style','width:650px;']]);
		insPoint.parentNode.insertBefore(newT, insPoint);
	}
}
function resourceBalance () {
	if( ver4FL ) return;
	var uID = crtPath.match(/uid=(\d+)/)[1];
	var linksP = $g(allIDs[0]);
	// Call trav-help
	var newP = $ee('P',$e('IMG',[['src',img_bigIcon[4]],['style','float:'+docDir[0]+';padding:0px 15px;']]));
	var newA = $a(RB.dictionary[5],[['href',jsVoid]]);
	newA.addEventListener('click', resourceBalanceShow, false);
	newP.appendChild(newA);
	if( linksP ) linksP.appendChild(newP);
		else cont.appendChild(newP);
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
					var resDict = h1[0].innerHTML.replace(/<.+?>/g,'');
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
}
var onKarteFL = false;
function distanceTooltipGenK(e) {
	var hr = this;
	onKarteFL = true;
	setTimeout(function() { distanceTooltipGenK2( hr ) }, 50);
}
function distanceTooltipGenK2( hr ) {
	removeTooltipK ();
	var dTTK = showAllTTime(0, hr.getAttribute('href').match(/[&\?][zd]=(\d+)/)[1], RB.village_Var[1]);
	$at(dTTK, [['style','background-color:white;']]); // #FFFFE0;
	windowID[2] = makeFloat( dTTK, (ltr?contRight-10:contRight-170), contTop+35);
	onKarteFL = false;
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
	if( ! allCells ) return; //alert(222);
	for( var i = 0; i < allCells.length; i++ ) {
		if( /karte.php\?d=/.test(allCells[i].getAttribute('href')) ) {
			allCells[i].addEventListener("mouseover", distanceTooltipGenK, false);
			allCells[i].addEventListener("mouseout", removeTooltipK2, false);
		}
	}
}
function karteDistance () {
	if( ver4FL ) karteDistance4();
	else karteDistance3();
}

var tileDFL = true;
function karteDistance4 () {
	var tipE = $g(windowID[2]);
	if( tipE ) tipE.parentNode.removeChild(tipE);
	var vilView = $g('tileDetails');// tileDetails
	if( vilView ) {
		if( tileDFL ) {
			addRefIGM('tileDetails');
			troopsOasis( vilView );
			viewMessageIWK( vilView );
			linkOnT4Karte( vilView );
		}
		tileDFL = false;
	} else {
		tileDFL = true;
		var tipE = $gc('tip-contents');
		if( tipE.length > 0 ) {
			var tipC = getVidFromCoords($gc('text elementText',tipE[0])[0].innerHTML);
			if( tipC > 0 ) {
				
				var topRS = contTop > 120 ? [105,90,120]: [-20,-20,-20];
				var dTTK = showAllTTime(0, tipC, RB.village_Var[1]); //xy2id(tipC[1],tipC[2])
				$at(dTTK, [['style','background-color:white;']]); // #FFFFE0;
				windowID[2] = makeFloat( dTTK, (ltr?contRight+5:contRight-185), contTop-topRS[raceid]);
			}
		}
	}
	setTimeout(karteDistance4, 1000);
}
function linkOnT4Karte ( vV ) { // fast go to !
	var vilView = vV!== undefined ? vV: cont;
	var h1 = $gt('H1',vilView)[0];
	if( h1 )
	{
		var spanLast = $gt('SPAN',h1);
		spanLast = spanLast[spanLast.length-1];
		if( RB.Setup[12]>0 ) {
			var al = $a('(+)',[['href',jsVoid],['title',gtext('addcur')],['style','margin:0px 10px;']]);
			al.addEventListener("click", addlinkT4, true);
			// Start by Qusai Abu Hilal
			var newA = $ee('A',$e('IMG',[['src',image["addbmthispage"]]]),[['href',jsVoid],['title',gtext("addcur")]]);
			newA.addEventListener('click', qaddLink, true);
			// End by Qusai Abu Hilal
			spanLast.parentNode.insertBefore(al,spanLast);
		}
		if( /position_details/.test(crtPath) )
		{
			return;
		}
		var ln = $gt('A',$gc('detailImage',vilView)[0]);
		if( ln.length > 0 ) {
			var xy = id2xy(getVid(ln[0].getAttribute('href')));
			spanLast.parentNode.insertBefore($a('->',[['href','/position_details.php?x='+xy[0]+'&y='+xy[1]],['style','margin:0px 5px;']]),spanLast);
		}
	}
	else
	{
		var al = $a('(*)',[['href',jsVoid],['title',gtext('addcur')],['style','margin:0px 10px;']]);
		al.addEventListener("click", addlinkT4, true);
		spanLast.parentNode.insertBefore(al,spanLast);
	}
}

function rbNotes() {// resource bar notes
	if( closeWindowN(3) ) return;
	var nText = RB_getValue('notes','');
	var newNB = $e('TABLE');
	// by Qusai (to change the width)	
//	var note_Width = new_getValue('note_Width', '');
//	var note_Hight = new_getValue('note_Hight', '');
/*	
	if( !note_Width || parseInt(note_Width) < 5 || isNaN(note_Width) )
	{
		note_Width = 17;
		new_setValue('note_Width', note_Width);
	}
	if( !note_Hight || parseInt(note_Hight) < 3 || isNaN(note_Hight) )
	{
		note_Hight = 19;
		new_setValue('note_Hight', note_Hight);
	}
// */
	if(parseInt(RB.Setup[32]) < 5 ) RB.Setup[32] = 13;
	if(parseInt(RB.Setup[33]) < 7 ) RB.Setup[33] = 19;
	var textNB = $ee('TEXTAREA',nText,[['rows',RB.Setup[32]],['cols',RB.Setup[33]],['style', 'background-image: url('+img_underline+');background-repeat: repeat;']]);
	// End of Qusai modification
	newNB.appendChild($ee('TR',$c(textNB)));
	var saveB = $e('IMG',[['src',image["bSave"]]]);
	saveB.addEventListener('click', saveNotes, false);
	newNB.appendChild($ee('TR',$c(saveB,[['style','text-align: center']])));
	windowID[3] = makeFloatD( newNB, 5 );

	function saveNotes () {
		RB_setValue('notes',textNB.value);
		alert( gtext('saved') );
	}
}
function addRefIGM ( idBlock ) {
	if( RB.Setup[18] == 0 && RB.Setup[19] == 0 ) return;
	var idB = idBlock || pageElem[1];
	var mLinks = $xf('.//a[contains(@href, "spieler.php?uid=")]', 'l', $g(idB));
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		var al = mLinks.snapshotItem(j);
		var uid = al.getAttribute('href').match(/uid=(\d+)/)[1];
		if( uid != userID ) {
			if( RB.Setup[19] > 0 ) al.parentNode.insertBefore($ee('A',$e('IMG',[['src',img_info],['style','padding:0px 3px;']]),[['href',userActivityServers( RB.Setup[19], uid, true )[1]],['target','_blank']]), al.nextSibling);
			if( RB.Setup[18] > 0 ) al.parentNode.insertBefore($ee('A',$e('IMG',[['src',img_igm],['style','padding:0px 3px;']]),[['href','nachrichten.php?t=1&id='+uid]]), al.nextSibling);
		}
	}
	if( RB.Setup[19] > 0 ) {
		var mLinks = $xf('.//a[contains(@href, "allianz.php?aid=")]', 'r', $g(idB));
		for( var j = 0; j < mLinks.snapshotLength; j++ ) {
			var al = mLinks.snapshotItem(j);
			var uid = al.getAttribute('href').match(/aid=(\d+)/)[1];
			al.parentNode.insertBefore($ee('A',$e('IMG',[['src',img_info],['style','padding:0px 3px;']]),[['href',userActivityServers( RB.Setup[19], uid, false )[1]],['target','_blank']]), al.nextSibling);
		}
	}
}

function parseAlly () {
	if( RB.dictFL[12] == 0 ) {
		var tm = $g('textmenu');
		if( tm ) {
			RB.dictionary[12] = $gt('A',tm)[3].innerHTML;
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
			al.appendChild($ee('A',$e('IMG',[['src',img_igm],['style','padding:0px 3px;']]),[['href','nachrichten.php?t=1&id='+uid]]));
		}
	}
}

function villageHintEdit () {
	var vNF = ver4FL ? $g('villageNameField') : $gt('h1',cont)[0];
	var vName = RB.vHint[village_aid] || '';
	var vNFC = $ee('SPAN',vName,[['style','color:'+vHColor+';font-size:10px;']]);
	var vNFA = $ee('SPAN',vNFC);
	var vNFe = $e('IMG',[['src',img_edit],['style','cursor:pointer;']]); //padding:0px 2px;
	vNFe.addEventListener('click', editVHint, false);
	vNFA.appendChild(vNFe);
	if( ver4FL ) vNF.parentNode.insertBefore(vNFA, vNF.nextSibling);
	else vNF.appendChild(vNFA);

	function editVHint () {
		newVHint = prompt(gtext("name2"), vName);
		if( newVHint == null ) return;
		if( RB.vHint[village_aid] != newVHint ) {
			RB.vHint[village_aid] = newVHint;
			saveOVCookie('vHint', RB.vHint);
			vName = newVHint;
			vNFC.innerHTML = vName;
		}
	}
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
	var ahref = aLink.getAttribute('href');
	if( ! ahref ) return;
	avID = vID || getVid(ahref);
	if( RB.vHint[avID] != undefined )
		aLink.appendChild($ee('SPAN',' '+RB.vHint[avID],[['style','color:'+vHColor+';']]));
}
// START of functions by Qusai Abu Hilal 2011 05 09
function get_Name () 
{// Qusai Abu Hilal // improvment 5
	try
	{;	
		if( get_Title() != 'position_details' )
		{;
			var newName = $gt('h1', cont)[0].innerHTML.replace(/<.+?>/g, "");
		}
		else //( get_Title() == 'position_details' )
		{;
			var newName = $gt('SPAN', cont)[0].innerHTML.replace(/<.+?>/g, "");
		}			
		if( !newName )
		{;
			return "Untitled";
		}
		return newName;
	}
	catch( err )
	{
		return get_Title();
	}
}

function get_Title()
{
	var crntLang = crtPath.split('/');	
	crntLang = crntLang[crntLang.length-1];
	var curname = crntLang.split('.');

	curname = curname[0];
	if( curname == 'dorf1' )
	{
		return "Resources";
	}
	if( curname == 'dorf2' )
	{
		return "Buildings";
	}
	return curname;
}

function meta_Content_Language() 
{
	metaCollection = document.getElementsByTagName('meta');
	
	for( i = 0; i < metaCollection.length; i++) 
	{
		nameAttribute = metaCollection[i].name.search(/content-language/);
		if (nameAttribute!= -1) 
		{
			// alert( "metaCollection[i].content \n" + metaCollection[i].content );
			return metaCollection[i].content;
		}
	}
}
function setLC()
{// By Qusai Abu Hilal arabiz
	if( RB.Setup[1] > 0 ) return langs[RB.Setup[1]].match(/\((\w+)\)/)[1];
	var con_lang = meta_Content_Language();
	switch( con_lang )
	{
		case 'sy':
		case 'ae':
		case 'eg':
		case 'sa':
		{
			return 'ar';
		}
		case 'ir':
		{
			return 'fa';
		}
		case 'fr':
		{
			return 'fr';
		}
		default:
		{
			return con_lang;
		}
	}
}// END of functions by Qusai Abu Hilal 2011 05 09
function demolishSave () {
	var dem = $g('build');
	if( ! dem ) return;
	dem = dem.getAttribute('class');
	if( dem != 'gid15' ) return;

	loadVCookie('Dorf13','village_dorf13',village_aid,1);
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
			newCookie[t++] = td[1].innerHTML.replace(/^\s*(.+?)\s*$/,'$1');
			if( td.length < 4 ) {
				newCookie[t++] = 0;
				newCookie[t++] = '';
			} else {
				newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(td[2].innerHTML.match(/\d+:\d\d:\d\d/)[0]);
				newCookie[t++] = td[3].innerHTML.replace(/<.+?>/g,'').replace(/^\s*(.+?)\s*$/,'$1');
			}
		}
		fl = true;
	}
	if( fl ) saveVCookie('Dorf13',newCookie,1);
}
function calcAllTrops() {
	if( RB.Setup[10] == 0 ) return;
	var sumT = [0,0,0,0,0,0,0,0,0,0];
	var oFL = true;
	var uFL = true;
	var townTables = $xf('.//table[.//td[@class="role"]/a[contains(@href,"'+village_aid+'")]]','l',cont);
	if( townTables.snapshotLength == 0 ) return;
	for ( var i=0 ; i < townTables.snapshotLength; i++ ){
		var ttable = townTables.snapshotItem(i);
		uFL = (new RegExp("uid="+userID)).test(ttable.rows[0].cells[1].innerHTML);
		if( oFL || ! uFL ) for( var t=0; t<10; t++ ) {
			var tC = parseInt(ttable.rows[2].cells[t+1].innerHTML);
			if( isFinite(tC) ) sumT[t] += tC;
		}
		if( oFL && uFL ) {
			var ownTable = ttable;
			oFL = false;
		}
	}
	var sumRow = ownTable.rows[2].cloneNode(true);
	for( var t=0; t<10; t++ ) {
		sumRow.cells[t+1].innerHTML = sumT[t];

		if( sumT[t] > 0 ) sumRow.cells[t+1].removeAttribute('class');
	}
	sumRow.cells[0].innerHTML = gtext('total');
	ownTable.appendChild($ee('TBODY',sumRow,[['class',allIDs[20]]]));
}

function scanTropsData () {
//                          0    1    2    3   4    5     6    7   8    9    10
	var parseRules = [true,true,true,true,true,true,true,true,true,true,false];
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

	function scanTropsDataR ( hn ) {
		ajaxRequest(fullName +'manual.php?typ=1&s='+ hn, 'GET', null, function(ajaxResp) {
			var j = (hn-1)*10;
			var allTD = [];
			var helpText = ajaxResp.responseText;
			var Rej = /td>(.+?)<\/td/gi;
			var t = 0;
			while (( allTD = Rej.exec(helpText)) != null) {
				if( parseRules[t++] ) RB.tropsI[j++] = parseInt(allTD[1].replace(/<.+?>/g,'').match(/\d+/)[0]);
			}
			RB.dictTR[hn] = helpText.match(/alt="(.+?)"/)[1];
			RB.trFL[hn] = 1;
			saveCookie('trFL','trFL');
			saveCookie('tropsI','tropsI');
			saveCookie('DictTR','dictTR');
		}, dummy);
	}
}
function troopInfo( tt, val ) {
	if( RB.dictFL[13] < 2 ) return 0;
	if( triFL ) {
		loadCookie( 'tropsI', 'tropsI' );
//				   1 2 3  4  5  6  7 8  9 10
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
		[600,440,520,5,20]];
		var j=RB.tropsI.length;
		for( var i=0; i<10; i++ )
			for( var t=0; t<10; t++ )
				RB.tropsI[j++] = parseRules2[t]<0? 0: nature[i][parseRules2[t]];
		triFL = false;
	}
	return parseInt(RB.tropsI[(tt-1)*10+val]);
}

function gti( p1, p2, p3 ) {
	var i = troopInfo(parseInt(p1),p2)*p3;
	return isNaN(i)?0:i;
}
function troopsDorf1 () {
	if( RB.Setup[20] == 0 ) return;
	var tinfoT = $g('troops');
	if( ! tinfoT ) return;
	tiImg = $e('IMG',[['src',img_tinfo],['style','padding:0px 5px;']]);
	tiImg.addEventListener("mouseover", showTroopsITT, false);
	tiImg.addEventListener("mouseout", removeTooltip, false);
	tinfoT.rows[0].cells[0].appendChild(tiImg);
}
function showTroopsITT () {
	var ITTb = $e('TBODY');
	var newITT = $ee('TABLE',ITTb,[['class',allIDs[7]]]);
	loadVCookie('Dorf12','village_dorf12',village_aid,1);
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

function troopsOasis ( vfS ) {
	if( RB.Setup[20] == 0 ) return;
	var vf = vfS || cont;
	tiImg = $e('IMG',[['src',img_tinfo],['style','padding:0px 5px;']]);
	var troopsTR = $xf('.//tr[td/img[contains(@class, "unit u")]]','l',vf );
	if( troopsTR.snapshotLength < 1 ) return;
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
	tiImg.addEventListener("mouseover", function () { makeTooltip(newITT); }, false);
	tiImg.addEventListener("mouseout", removeTooltip, false);
	if( ver4FL ) $gt('H4',vf)[1].appendChild(tiImg);
	else $g('troop_info').rows[0].cells[0].appendChild(tiImg);
}

function a2bInfo () {
	var ts = [0,0,0,0,0,0];
	if( raceFL ) {
		var troopImg = $xf('.//img[contains(@class,"unit u")]','f',cont);
		if( ! troopImg ) return;
		urrace = Math.floor(parseInt(troopImg.getAttribute('class').match(/\d+/)[0])/10);
		if( urrace != raceid ) {
			raceid = urrace;
			saveCookie( 'RBSetup', 'Setup' );
		}
		raceFL = false;
	}
	var inputs = $gt('INPUT',cont);
	for( var i=0; i<inputs.length; i++ ) {
		if( /t\d+/.test(inputs[i].getAttribute('name')) ) {
			var rtt = parseInt(inputs[i].getAttribute('name').match(/\d+/)[0]);
			if( rtt == 11 ) continue;
			var tt = rtt+(parseInt(raceid)*10);
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
	rT.appendChild($em('TR',[$c($e('IMG',[['src',img_car]])),$c(humanRF(ts[4]),[['colspan','2']])]));
	rP.appendChild(rT);
	$g('btn_ok').parentNode.appendChild(rP);
}

function show_alert () {
	var nt = new Date().getTime();
	if( lastAlert > nt-5e3 ) return;
	var audioT = $g(allIDs[22]);
	if( audioT ) audioT.parentNode.removeChild(audioT);
	switch (parseInt(RB.Setup[28])) {
		case 1: // alert
				alert( crtName + "\n" + gtext("ding") );
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
function goWarehouse()
{
	var returnpath = window.location.href;
	if( returnpath == fullName + 'build.php?gid=10' )
	{
		return ;
	}
	document.location.href = fullName + 'build.php?gid=10';
}

function goGranary()
{
	var returnpath = window.location.href;
	if( returnpath == fullName + 'build.php?gid=11' )
	{
		return ;
	}
	document.location.href = fullName + 'build.php?gid=11';
}

function goCranny()
{
	var returnpath = window.location.href;
	if( returnpath == fullName + 'build.php?gid=23' )
	{
		return ;
	}
	document.location.href = fullName + 'build.php?gid=23';
}
function saveCrannycap()
{// Qusai Abu Hilal  // improvment 2 // send resource depend on cranny size not only player percentage
	var cur_vid = RB.wantdMem[4];	
	var cur_cap = new_getValue('cranycap', '');
	if( cur_vid != village_aid ) 
	{
		alert( gtext("gocran") ) ;
		return ;	
	}
	var old = cranyprsntag;
	do
	{
		cranyprsntag = prompt( gtext("savecpq"), cranyprsntag);
	}while( parseInt(cranyprsntag) > 300 || parseInt(cranyprsntag) < 0 );
	if( !cranyprsntag || isNaN(cranyprsntag) || parseInt(cranyprsntag) < 0 || parseInt(cranyprsntag) > 300 )
	{
		cranyprsntag = old;
		return ;
	}
	new_setValue('cranyprsntag', cranyprsntag);
	RB.wantdMem = [0,0,0,0,village_aid];

	try
	{
		var curprsn = Math.round(cur_cap * parseInt(cranyprsntag) / 100);
		for (var c = 0; c < 4; c++) 
		{
			RB.wantdMem[c] = curprsn - Math.round(resNow[c]);
		}
		saveCookie('CMem', 'wantdMem');
	}
	catch(err)
	{		
		er( err, 9 );
	}
	if( ltr )
	{
		alert( cranyprsntag + " % " + gtext("savedp") + "\n\n" + RB.wantdMem[0] + sprt + RB.wantdMem[1] + sprt + RB.wantdMem[2] + sprt + RB.wantdMem[3] );
	}
	else
	{
		alert( cranyprsntag + " %\n" + gtext("savedp") + "\n\n" + RB.wantdMem[0] + sprt + RB.wantdMem[1] + sprt + RB.wantdMem[2] + sprt + RB.wantdMem[3] );
	}// */
}// */

function crannyCalc()
{// Qusai Abu Hilal // improvment 2 // send resource depend on cranny size not only player percentage
	var allB = $gt('B',cont);
	var cap = parseInt(allB[0].innerHTML);	
	new_setValue('cranycap', cap);
	RB.wantdMem = [0,0,0,0,village_aid];
	var s = parseInt(RB.Setup[24])/100;
	$at(allB[0],[['title',Math.round(cap*s)]]);
	var newT = $e('TABLE',[['class',allIDs[7]],['style','margin:2px 30px;']]);
	var t = timerB.length;
	
	for( var i=0; i<4; i++ ) {
		var pc = resNow[i] < cap ? Math.round(resNow[i]/cap*100) : 100;
		if( incomepersecond[i] > 0 && pc < 100 ) {
			timerB[t] = new Object();
			timerB[t].time = Math.round((cap-resNow[i])/incomepersecond[i]);
			// timerB[t].obj = $eT('TD',timerB[t].time, 0);
			// Qusai Abu Hilal
			timerB[t].obj = $eT('TD',timerB[t].time, 0,[['style','background-color:#FF0000;width=25px']]);
			var ct = timerB[t++].obj;
		} else var ct = $c('--:--',[['style','background-color:#FF0000;']]);
		if( incomepersecond[i] > 0 && pc < parseInt(RB.Setup[24]) ) {
			timerB[t] = new Object();
			timerB[t].time = Math.round((cap*s-resNow[i])/incomepersecond[i]);
			timerB[t].obj = $eT('TD',timerB[t].time, 0,[['style','background-color:#00FF00;width=75px']]);
			var ct8 = timerB[t++].obj;
		} else var ct8 = $c('--:--',[['style','background-color:#00FF00;']]);
		newT.appendChild($em('TR',[$c(trImg('r'+(i+1))),$c('% '+pc+' %'),ct8,ct]));
	}// */
	cont.appendChild(newT);
}
function buildDispatcher () {
	var build = $g('build');
	if( !(build) ) return;
	var gid = build.getAttribute('class');
	if( gid == 'gid17' ) {
		marketSend(); marketSumm(); marketOffer();
		if( /build.php\?.*&t=1/.test(crtPath) ) marketBuy();
		if( /build.php\?.*&t=3/.test(crtPath) ) npcForTroops();
	} else if( gid == 'gid15' ) {
		demolishSave();
	} else if( gid == 'gid16' ) {
		if( ! /tt=99/.test(crtPath) ) { incomeResourcesInRP(); detectNameAttaker(); calcAllTrops(); rpFL = true; }
	} else if( gid == 'gid23' ) {
		crannyCalc();
	}//else { alert( gid );}
}
var normalizeProductionCount = 8;
function normalizeProduction () {
	if( RB.Setup[22] < 1 ) return;
	var resT = $g('production');
	if( !(resT) ) return;
	var mm = normalProductionCalc ( income );
	$at(resT.rows[1+mm[0]], [['style','color:Green;']]);
	$at(resT.rows[1+mm[1]], [['style','color:Blue;']]);
	$at(resT.rows[1+mm[2]], [['style','color:Magenta;']]);
	$at(resT.rows[1+mm[3]], [['style','color:Red;']]);
}

function normalProductionCalc ( ires ) {
	var choise = RB.Setup[22] == 1 ? 0: (RB.Setup[22]-1)+raceid*normalizeProductionCount;
	var vNormal = [[10,12,8,6], // ?????????? ???????? (???????????? ?????)/normal development (production resources)
// ??????? / ROMANS //
	[6,5,8,2],// ????????? / Legionnaire
	[10,13,16,7],// ??????????? / Praetorian
	[15,16,21,8],// ?????????? / Imperian
	[7,8,1,2],// ?????e ?????????? / Equites Legati
	[55,44,32,10],// ??????? ?????????? / Equites Imperatoris
	[55,64,80,18],// ??????? ?????? / Equites Caesaris
	[90,36,50,7],// ?????? / Battering Ram
	[95,135,60,9],// ???????? ?????????? / Fire Catapult
// ???????? / TEUTONS //
	[19,15,8,8],// ????????? / Clubswinger
	[29,14,17,8],// ????????? / Spearman
	[13,12,17,7],// ????????? / Axeman
	[16,10,5,5],// ?????? / Scout
	[74,54,58,15],// ???????? / Paladin
	[90,103,96,16],// ??????? / Teutonic Knight
	[100,30,35,7],// ??????????? ?????? / Battering Ram
	[45,60,30,3],// ?????????? / Catapult
// ????? / GAULS //
	[20,26,11,6],// ??????? / Phalanx
	[28,30,37,12],// ??????? / Swordsman
	[17,15,2,4],// ????????? / Pathfinder
	[35,45,23,6],// ????? / Theutates Thunder
	[36,33,28,12],// ?????? / Druidrider
	[100,124,135,34],// ???? / Haeduan
	[190,111,66,15],// ?????? / Battering Ram
	[96,145,63,9]];// ????????? / Trebuchet

	var vPN = [];
	for( var i = 0; i < 4; i++ ) {
		vPN[i] = ires[i] / vNormal[choise][i];
	}
	var minI = 0, maxI = 0;
	var minVal = vPN[0], maxVal = vPN[0];
	var new_vPN = [];
	for( i = 0; i < 4 ; i++)
	{
		new_vPN[i] = vPN[i];
	}
	for( j =0; j < 3; j++)
	{
		for( k = j +1; k < 4; k++)
		{
			if( new_vPN[j] < new_vPN[k] )
			{
				var remp = new_vPN[j] ;
				new_vPN[j] = new_vPN[k] ;
				new_vPN[k] = remp ;
			}
		}
	}
	var vPN_sorted = [];
	for( j =0; j < 4; j++)
	{
		for( k = 0; k < 4; k++)
		{
			if( new_vPN[j] == vPN[k] )
			{
				vPN_sorted[j] = k;
			}
		}
	}
	return vPN_sorted;	
}
function speedBids () {
	var bform = $gc('auctionDetails',cont)[0];
	if( !(bform) ) return;
	var curBid = parseInt($gt('SPAN',bform)[0].innerHTML);
	$gn('maxBid',bform)[0].value = curBid+parseInt(RB.Setup[23]);
}
function cropFind () {
	if( RB.Setup[26] == 0 ) return;
	var cfText = $a(gtext("findcrop"),[['href',jsVoid]]);
	cfText.addEventListener('click', cropFindReq, false);	
	var XY = /[\?|&](d=|z=|x=)/.test(crtPath) ? id2xy(getVid(crtPath)): id2xy(village_aid);
	var oX = inps(XY[0],'mX');
	var oY = inps(XY[1],'mY');
	var oZ = inps(7,'zoom');
	var c15 = $e('INPUT',[['name','m15'],['type','checkbox'],['checked','checked']]);
	var c9 = $e('INPUT',[['name','m9'],['type','checkbox'],['checked','checked']]);
	var c7 = $e('INPUT',[['name','m7'],['type','checkbox']]);
	
	if( ltr )
	{
		cont.appendChild($em('DIV',['x:',oX,' y:',oY,' zoom(1-7):',oZ,' 15:',c15,' 9:',c9,' 7:',c7,' ',cfText],[['class','contents'],['style', 'white-space:nowrap;']]));
	}
	else
	{
		cont.appendChild($em('DIV',['س:',oX,' ع:',oY,' مجال البحث (1-7):',oZ,' 15:',c15,' 9:',c9,' 7:',c7,' ',cfText],[['class','contents'],['style', 'white-space:nowrap; align:' + docDir[0] ]]));
	}
	var aCC = [];

	function inps (val, iname) {
		return $e('INPUT',[['value',val],['name',iname],['class','text coordinates'],['type','text'],['size','5']]);
	}
	function cropFindReq () {
		if( $g(allIDs[18]) ) cont.removeChild($g(allIDs[18]));
		cont.appendChild($ee('DIV',$ee('span',gtext("searching"),[['style','text-decoration:blink;'],['id',allIDs[0]]]),[['id',allIDs[18]]]));
		var XY = [parseInt(oX.value),parseInt(oY.value)];
		// here is the distance I do not know why only 7 !!!
		var zoom = parseInt(oZ.value); if( zoom > 7 || zoom < 1 ) zoom = 7;
		var dX = ver4FL ? 20: 7;
		var dY = ver4FL ? 16: 7;
		var newY = XY[1] - Math.round((zoom-1)*dY/2);
		var curTO = 0;
		aCC.length = 0;
		for (var i=zoom; i>0; i--) {
			var newX = XY[0] - Math.round((zoom-1)*dX/2);
			for (var j=zoom; j>0; j--) {
				setTimeout(function(x) { return function() { cropFindGetMap(x); }}({rX:newX,rY:newY,fl:(i==1&&j==1?true:false)}), curTO);
				newX += dX;
				curTO += getRandom(500,1500);
			}
			newY += dY;
		}
	}

	function printResult ( ft, mX, mY , descr ) {
		var des = typeof descr == 'undefined' ? '': descr;
		$g(allIDs[18]).appendChild($em('DIV',[ft,' ',$a(mX+'|'+mY,[['href','/karte.php?'+(ver4FL?'x='+mX+'&y='+mY:'z='+xy2id(mX,mY))]]),' ',des]));
		aCC[aCC.length] = [ft,mX,mY,des];
	}
	function printFinal () {
		if( $g(allIDs[18]) ) cont.removeChild($g(allIDs[18]));
		var aCCs = aCC.sort(function (a,b) {
				var dA = parseFloat(calcDistance( xy2id(a[1],a[2]), village_aid ).toFixed(1));
				var dB = parseFloat(calcDistance( xy2id(b[1],b[2]), village_aid ).toFixed(1));
				if( dA < dB ) return -1;
				if( dA > dB ) return 1;
				return 0;
			});
		var newT = $e('TABLE',[['class',allIDs[7]]]);
		for( var i=0; i<aCCs.length; i++ ) {
			newT.appendChild($em('TR',[$c(aCCs[i][0]),
				$c($a(aCCs[i][1]+'|'+aCCs[i][2],[['href','/karte.php?'+(ver4FL?'x='+aCCs[i][1]+'&y='+aCCs[i][2]:'z='+xy2id(aCCs[i][1],aCCs[i][2]))]])),
				$c(aCCs[i][3]),$c('<->'),$c(parseFloat(calcDistance( xy2id(aCCs[i][1],aCCs[i][2]), village_aid ).toFixed(1)))]));
		}
		cont.appendChild($ee('P',newT,[['id',allIDs[18]]]));
		addSpeedAndRTSend($g(allIDs[18]));
	}
	function cropFindGetMap ( a ) {
		if( ver4FL ) {
			ajaxRequest(fullName+'ajax.php?cmd=mapPositionData', 'POST', 'cmd=mapPositionData&data[x]='+a.rX+'&data[y]='+a.rY+'&data[zoomLevel]=2&', function(ajaxResp) {
				var mapData = eval('(' + ajaxResp.responseText + ')');
				var pRules = [[/{k.f1}/,'Crop 9:',c9],[/{k.f6}/,'Crop 15:',c15],[/{k.f7}/,'4-4-3-7:',c7],[/{k.f8}/,'3-4-4-7:',c7],[/{k.f9}/,'4-3-4-7:',c7]];
				for( var i=0; i < mapData.data.tiles.length; i++ ) {
					if (typeof mapData.data.tiles[i].c != 'undefined') {
						for( var t=0; t<pRules.length; t++ ) {
							if( pRules[t][0].test(mapData.data.tiles[i].c)) {
								if( pRules[t][2].checked )
									printResult( pRules[t][1], mapData.data.tiles[i].x, mapData.data.tiles[i].y );
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
						for( var t=0; t<pRules.length; t++ ) {
							if( pRules[t][0] == mapData[i][j][2] ) {
								if( pRules[t][2].checked )
									printResult( pRules[t][1], mapData[i][j][0], mapData[i][j][1], mapData[i][j][7] );
							}
						}
					}
				}
				if( a.fl ) printFinal();
			}, dummy);
		}
	}
}
function addToMapT4 () {
	var md = $gc('detailImage',cont);
	
	if( md.length == 0 )
	{
		return;
	}
		
	var goMap = $xf('.//a[contains(@href,"x=")]','l',md[0]);
	if( goMap.snapshotLength > 0 )
	{
		return;
	}

	$gc('options',md[0])[0].appendChild($ee('DIV',$a(RB.dictionary[15],[['href',crtPath.replace('position_details','karte')],['class','a arrow']]),[['class','option']]));
}

function npcForTroops () {
	var npcT = $g('npc');
	if( !(npcT) ) return;
	var TR = $e('TR');
	var resNowSumm = resNow[0]+resNow[1]+resNow[2]+resNow[3];
	for( var i=1; i<11; i++ ) {
		var tN = parseInt(raceid)*10+i;
		var tRS = troopInfo(tN,3)+troopInfo(tN,4)+troopInfo(tN,5)+troopInfo(tN,6);
		var aCol = Math.floor(resNowSumm/tRS);
		var newA = $em('A',[trImg('unit u'+tN),'(',aCol,')'],[['href',jsVoid],['onclick','setTimeout(calculateRest, 250);']]);
		newA.addEventListener('click', function(x) { return function() { redistrNPC(x); }}(i), false);
		TR.appendChild($c(newA));
	}
	var tT = $ee('TABLE',TR,[['class',allIDs[7]]]);
	npcT.parentNode.insertBefore(tT, npcT);

	function redistrNPC ( num ) {
		var tN = parseInt(raceid)*10 + num;
		var tRS = troopInfo(tN,3)+troopInfo(tN,4)+troopInfo(tN,5)+troopInfo(tN,6);
		var aCol = Math.floor(resNowSumm / tRS);
		var inps = $gt('INPUT', npcT);
		if( inps.length < 8 ) return;
		var summ = 0;
		for( var i=0; i<3; i++ ) {
			var tCo = aCol * troopInfo(tN, i+3);
			summ += tCo;
			inps[i*2].value = tCo;
		}
		inps[i*2].value = resNowSumm - summ;
	}
}

function analyzerBattle () {
	if( RB.Setup[25] == 0 || RB.dictFL[13] < 2 ) return;
	var report = $g('report_surround');
	if( !(report) ) return;
	if( !($g('attacker')) ) return;
	var tt = $gt('TABLE',report);
	if( tt.length < 2 ) return;
	var attakerN = ver4FL ? $gc('role',tt[0].rows[0].cells[0])[0].innerHTML: tt[0].rows[0].cells[0].innerHTML;
	var defenderN = ver4FL ? $gc('role',tt[1].rows[0].cells[0])[0].innerHTML: tt[1].rows[0].cells[0].innerHTML;

	var kirilloid = '#a:';
	var aRow = tt[0].rows;
	var tCount = 0;
	var atS = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],0];
	var aRU = [0,8,3,4,5,6,9];
	var kirillRace = ver4FL ? [0,1,2,3,4]: [1,2,3,0,4];
	var kirillS = '';
	var atS = parseTroops( aRow, aRU, atS );
	kirilloid += kirillS+(ver4FL?'Ub':'')+'#d:';
	if( ver4FL ) kirilloid = kirilloid.replace(/r0(uUb)?/g,'');
	atS[0][1] -= atS[1][1];
	var goods = $gc('res',tt[0]);
	var ress = goods.length > 0 ? goods[0].innerHTML.match(/<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?/): [0,0,0,0,0];
	ress = [0,parseInt(ress[1]),parseInt(ress[2]),parseInt(ress[3]),parseInt(ress[4])];

	var dfS = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],0];
	var dRU = [1,2,3,4,5,6,9];
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

	var newTABLE = $e('TABLE',[['class',allIDs[7]],['style','background-color:white;width:100%;']]);
	newTABLE.appendChild($em('TR',[$c(''),$c(attakerN),$c(defenderN),$c(gtext('total'))]));
	// strength
	var newTR = $ee('TR',$em('TD',[trImg('unit u13'),'+',trImg('unit u16')]));
	var strAP = atS[0][0]-atS[2];
	newTR.appendChild($em('TD',[humanRF(strAP),' + ',humanRF(atS[2])]));
	newTR.appendChild($em('TD',[humanRF(dfS[0][0]),' + ',humanRF(dfS[0][1])]));
	var proc = [0,0];
	proc[0] = Math.round(strAP/(strAP+dfS[0][0])*100); if( isNaN(proc[0]) ) proc[0] = 0;
	proc[1] = Math.round(atS[2]/(atS[2]+dfS[0][1])*100); if( isNaN(proc[1]) ) proc[1] = 0;
	newTR.appendChild($em('TD',[proc[0],' + ',proc[1],' = ',Math.round((proc[0]+proc[1])/(proc[0]>0 && proc[1] > 0 ? 2: 1)),'%']));
	newTABLE.appendChild(newTR);
	// crop
	proc[0] = Math.round(atS[1][6]/(atS[1][6]+dfS[1][6])*100); if( isNaN(proc[0]) ) proc[0] = 0;
	var newTR = $em('TR',[$c(trImg('r5')),$em('TD',[humanRF(atS[0][6]),'/',humanRF(atS[1][6])]),
						$em('TD',[humanRF(dfS[0][6]),'/',humanRF(dfS[1][6])]),$em('TD',[proc[0],'%'])]);
	newTABLE.appendChild(newTR);
	// resource
	var newTR = $ee('TR',$em('TD',[trImg('r1'),'+',trImg('r2'),'+',trImg('r3'),'+',trImg('r4'),'=']));
	proc[0] = atS[1][2]+atS[1][3]+atS[1][4]+atS[1][5];
	if( atS[0][1] == 0 ) ress = [0,0,0,0,0];
	proc[5] = ress[1]+ress[2]+ress[3]+ress[4];
	proc[1] = dfS[1][2]+dfS[1][3]+dfS[1][4]+dfS[1][5];
	proc[4] = proc[1]+proc[5];
	proc[2] = Math.round((proc[0])/(proc[0]+proc[4])*100); if( isNaN(proc[2]) ) proc[2] = 0;
	newTR.appendChild($em('TD',[humanRF(atS[1][2]),' + ',humanRF(atS[1][3]),' + ',humanRF(atS[1][4]),' + ',humanRF(atS[1][5]),$e('BR'),' = ',humanRF(proc[0])]));
	newTR.appendChild($em('TD',[humanRF(dfS[1][2]+ress[1]),' + ',humanRF(dfS[1][3]+ress[2]),' + ',humanRF(dfS[1][4]+ress[3]),' + ',humanRF(dfS[1][5]+ress[4]),$e('BR'),' = ',humanRF(proc[4])]));
	newTR.appendChild($em('TD',[proc[2],'%']));
	newTABLE.appendChild(newTR);
	// carry
	var newTR = $ee('TR',$c($e('IMG',[['src',img_car]])));
	proc[4] = atS[0][1] > 0 ? Math.round(proc[5]/atS[0][1]*100) : 0;
	newTR.appendChild($em('TD',[proc[4],'%']));
	newTR.appendChild($c($a('(kirilloid)',[['href','http://travian.kirilloid.ru/warsim'+(ver4FL?'2':'')+'.php'+kirilloid],['target','_blank'],['style','font-size:10px;']])));
	proc[4] = proc[5] > 0 ? Math.round((proc[5]-proc[0])/proc[5]*100) : '--';
	newTR.appendChild($em('TD',[proc[4],'%']));
	newTABLE.appendChild(newTR);

	tt[0].parentNode.appendChild(newTABLE);

	function parseTroops ( pRows, pRU, ptS ) {
		var pRace = Math.floor(parseInt($gt('IMG',pRows[1].cells[1])[0].getAttribute('class').match(/u(\d+)/)[1])/10);
		for( i=10; i>0; i-- ) {
			tCount = parseInt(pRows[2].cells[i].innerHTML);
			if( isNaN(tCount) ) tCount=0;
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
}
function rpDefaultAction()
{
	try
	{
		X_Armored_rpDefaultAction();
	}
	catch( err )
	{
		er( err, 'N' );
	}
}
function X_Armored_rpDefaultAction() {
	var nc = $gn('c')[RB.Setup[27]];
	if( (!nc) || (nc.length < 3) ) return;
	if( RB.Setup[27] > 0 ) if( nc.getAttribute('disabled') === null ) nc.checked = true;
	if( RB.dictFL[16] > 0 ) return;
	for( var i=0; i<nc.length; i++ ) {
		RB.dictionary[16+i] = nc[i].parentNode.innerHTML.replace(/<.+?>/g,'').replace(/^\s+/,'').replace(/\s+$/,'');
	}
	saveCookie( 'Dict', 'dictionary' );
	RB.dictFL[16] = 1;
	saveCookie( 'DictFL', 'dictFL' );
}
function addAReportFilter () {
	var iReports = [1,2,3,4,5,6,7,15,16,17,18,19];
	var newD = $e('DIV',[['style','white-space:nowrap;padding:5px;']]);
	for( var i=0; i<iReports.length; i++ ) {
		newD.appendChild($a(trImg('iReport iReport'+iReports[i]),[['href',fullName + 'allianz.php?s=3&f='+iReports[i]+(ver4FL?'&fn=0':'')],['style','margin:2px;']]));
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
	try { RB.attackList = JSON.parse(RB_getValue(GMcookieID + 'Att','[0]')); } catch (err) { RB.attackList = [0]; }
	var timerNum = 0;
	if( RB.Setup[31] < 5 || RB.Setup[31] > 30 ) RB.Setup[31] = 15;
	var basePeriod = (parseInt(RB.Setup[31])-1)*6e4;
	var firstCheck = parseInt(RB.attackList[0]) + basePeriod - RunTime[0];
	var nextCheck = firstCheck < 3e5 ? getRandom(3e5,3e4): getRandom(firstCheck,1e5);
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
		if( RB.attackList.length < 2 ) aDv.innerHTML = gtext("attak"); else aDv.innerHTML = '';
		if( ! ver4FL && villages_count < 2 && RB.attackList.length > 1 ) {
			aDv.appendChild($ee('SPAN',gtext("uattak"),[['style','color:red;']]));
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
}

function analyzerSetup () {
	var newT = $e('TABLE',[['class',allIDs[7]]]);
	var inp = [];
	for( var i=0; i<serversAC; i++ ) {
		var ps = userActivityServers(i+1)[2].split('###');
		inp[i] = $e('INPUT',[['type','text'],['value',ps[1]],['size',(ps[1].length+2)]])
		newT.appendChild($ee('TR',$em('TD',[ps[0],inp[i],ps[2]])));
	}
	newT.appendChild($ee('TR',okTD(okAnalyzer,cancelAnalyzer)));
	windowID[7] = makeFloat(newT,200,200);

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
}
function timeToBids () { // There is conflict with new setup icon place
	var timers = $xf('.//span[contains(@id,"timer")]','l',cont);
	for( var i=0; i<timers.snapshotLength; i++ ) {
		timers.snapshotItem(i).setAttribute('title',formatTime(absTime(toSeconds(timers.snapshotItem(i).innerText)),2));
	}
}
function centerNumber () { // Added by Qusai to test it centernumbers
var dorf = 0;

var img_cp = "data:image/gif;base64,R0lGODlhEAAQAIQXAEY6A1A2I1k8J1VJCWdNOWRUCGVSRW5lKnllVI53N650PI97ao6CZ8iERv+/AP/PANDSbdTRx9zStf/YQP/nev/tl/HzsP///////////////////////////////////yH5BAEKAB8ALAAAAAAQABAAAAVw4CeO43GQaJlUz5mOhcM6TvGKxaTr9v0ZjKDBJzpEjsObiWKMJFMDCuXhMLlQA8WAWpVeP4KsojFwAKTUgwBMaLjdAC3XQRAIJASIxWIYkx12EoF5AXwWdoESgncECwiPd4qSCGt2JJGKC5YviIgjIQA7";

// ›› Add generic CSS.
function addCSS(cssString) {
	var style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	document.getElementsByTagName('HEAD')[0].appendChild(style);
}

// ›› Set styles.
function init(){
	var cssString = '.TMbuildingtags{' +
		'background-image:none !important;' +
		'background-color:white;' +
		'border:thin solid #000000 !important;' +
		'-moz-border-radius: 2em !important;' +
		'border-radius: 2em !important;' +
		'padding-top: 3px !important;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif !important;' +
		'font-size:9pt !important;' +
		'font-weight:bold !important;' +
		'text-align:center !important;' +
		'position:absolute !important;' +
		'line-height:12px !important;' +
		'width:22px !important;' +
		'height:19px !important;' +
		'cursor:pointer !important;' +
		'visibility:hidden;' +
		'z-index:50 !important;}' +
		'A.tm_uplevel:link,A.tm_uplevel:visited{color:black;};';
	addCSS(cssString);
	TM_ShowMainBuildingNumbers();
	if( /build/.test(window.location.href) ) cultureCalc();
}

function cultureCalc () {
	var blevel = $gc('level',$gt('h1',$g('content'))[0]);

	if( blevel.length == 0 ) return;
	blevel = parseInt(blevel[0].innerText.match(/\d+/)[0]);
	
	var bid = parseInt($g('build').getAttribute('class').match(/\d+/)[0]);
	var contr = $g('contract');
	var clocks = $gc('clocks',contr);
	
	if( clocks.length > 0 ) {
		var cB = $em('SPAN',[' ',$e('IMG',[['src',img_cp],['title',gtext("cp")]]),' '+bCost[bid][blevel][4]+' -> '+bCost[bid][blevel+1][4]+' ',$e('IMG',[['src','img/x.gif'],['class','r5'],['title',gtext("cc")]]),' '+bCost[bid][blevel][5]+' -> '+bCost[bid][blevel+1][5]]);
		var cl = $gc('clear',contr);
		$ib(cB,cl[cl.length-1]);
	} else {
		var cB = $em('SPAN',[' ',$e('IMG',[['src',img_cp],['title',gtext("cp")]]),' '+bCost[bid][blevel][4]+' ',$e('IMG',[['src','img/x.gif'],['class','r5'],['title',gtext("cc")]]),' '+bCost[bid][blevel][5]]);
		contr.appendChild(cB);
	}
}

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
[//blacksmithCost gid = 12 No longer exist in travian 4!

],

[//smithy (T4) gid = 13
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
};//		'f99':	'Natarian village',
function TM_ShowMainBuildingNumbers(){
	var gid;
	var imgId, countArray, dx, dy, checkWW;
	var top = 0;
	var left = 0;
	// ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).
	var map1Element;
	var mapInfo = $g('clickareas');
	if ( mapInfo ) {
		map1Element = mapInfo;
		countArray = 22;
		top = 10;
		left = 15;
		dtop = 10;
		dleft = 50;
		dorf = 2;// Buildings
	}
	var mapInfo = $g('rx');
	if ( mapInfo ) {
		map1Element = mapInfo;
		countArray = 18;
		dtop = 56;
		top = 25;

		left = -10;
		dleft = 0;
		dorf = 1;// Resources
	}
	if( !(map1Element) ) return;	
	var areaElements = $gt('area', map1Element);
	var container = $g('village_map');
	var imageElements = $gt('img',container);
	var BuildingLevel, smallDIV, coords;
	var BuildingURL = new Array(21);
	for (var i = 0; i < countArray; i++) {
		BuildingLevel = /\d+/.exec(areaElements[i].alt);
		BuildingURL = areaElements[i].href;
		coords = areaElements[i].coords.split(',');
		if (! BuildingLevel) continue;
		if (dorf == 2) {
			imgId = i;
			switch(imgId) {
				case 21:
					gid = parseInt(/\d+/.exec(imageElements[imgId].getAttribute('class'))[0]);
					break;
				case 22:
					gid = 0;
					break;
				case 8:
					if (checkWW != null) {
						gid = 40;
					} else {
						gid = parseInt(/\d+/.exec(imageElements[imgId].getAttribute('class'))[0]);
					}
					break;
				default:
					gid = parseInt(/\d+/.exec(imageElements[imgId].getAttribute('class'))[0]);
			}
			smallDIV = addDiv('TMbuildingtag' + i,'TMbuildingtags',BuildingLevel[0],'village_map',BuildingURL);
			if( ltr )
			{
				smallDIV.style.left = parseInt(coords[0]) + ( left - 0 ) +'px';
				// newD.setAttribute("rowspan","2");				
			}
			else
			{
				smallDIV.style.left = parseInt(coords[0]) + ( left - 60 ) +'px';
			}
		}
		if (dorf == 1){
			var typeOfVillage = $g('village_map').getAttribute('class');
			gid = fieldsOfVillage[typeOfVillage][i]+1;
			smallDIV = addDiv('TMbuildingtag' + i,'TMbuildingtags',BuildingLevel[0],'rx',BuildingURL);
			if( ltr )
			{
				smallDIV.style.left = parseInt(coords[0]) + ( left + 0 ) +'px';
			}
			else
			{
				smallDIV.style.left = parseInt(coords[0]) + ( left + 200 ) +'px';
			}
		}
		smallDIV.style.top = parseInt(coords[1]) + top +'px';
		smallDIV.style.visibility = "visible";
		smallDIV.style.zIndex= 9999;
		try {
			var resneed = bCost[gid][parseInt(BuildingLevel[0])+1];
		} catch (err) {
			continue;
		}
		var rWood = document.getElementById('l1').firstChild.nodeValue.split('/');
		var rClay = document.getElementById('l2').firstChild.nodeValue.split('/');
		var rIron = document.getElementById('l3').firstChild.nodeValue.split('/');
		var rCrop = document.getElementById('l4').firstChild.nodeValue.split('/');
		var reswood = parseInt(rWood[0]);
		var resclay = parseInt(rClay[0]);
		var resiron = parseInt(rIron[0]);
		var rescrop = parseInt(rCrop[0]);
		var capWood = parseInt(rWood[1]);
		var capCrop = parseInt(rCrop[1]);

		if (parseInt(BuildingLevel[0]) == getMaxLevel(gid)) {
			smallDIV.style.backgroundColor = '#A0F0A0';
		}else if( resneed[0] > capWood || resneed[1] > capWood || resneed[2] > capWood || resneed[3] > capCrop ) {
			smallDIV.style.backgroundColor = '#FFB8F0';
		}else if( (reswood+resclay+resiron+rescrop) >= (resneed[0]+resneed[1]+resneed[2]+resneed[3]) ){
			if(reswood >= resneed[0] && resclay >= resneed[1] && resiron >= resneed[2] && rescrop >= resneed[3]){
				smallDIV.style.backgroundColor = '#F8FFC8';
			}else{
				smallDIV.style.backgroundColor = '#FFC84B';
			}
		}else if (parseInt(resneed[0]) > reswood ||
			parseInt(resneed[1]) > resclay ||
			parseInt(resneed[2]) > resiron ||
			parseInt(resneed[3]) > rescrop ){
			smallDIV.style.backgroundColor = '#FF8888';
		}
	}
}
// ›› Adds a generic div.
function addDiv(id,style,html,parent,url){
	var div = $ee('div',html,[['id',id],['class',style]]);
	var a = $a(div,[['href',url],['class','tm_uplevel']]);
	$g(parent).appendChild(a);
	return div;
}
function getMaxLevel(gid) {
	var maxLevel;
	switch (gid) {
		case 1:
		case 2:
		case 3:
		case 4:
		{
			var cur_xy = id2xy(village_aid) ;
			cur_xy = "(" + cur_xy[0] + "|" + cur_xy[1] + ")";
			if( cur_xy != capitalcoords )
			{
				maxLevel = 10;
				break;
			}						
			maxLevel = 100;// No limit except resources !
			break;
		}	
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			maxLevel = 5;
			break;
		case 23:
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

if( ($g('side_navi')) ) return;
init();
}// End at: 2011\05\29

function goProfile()
{
	var returnpath = window.location.href;
	var pid = getUserID();
	if( returnpath == fullName + 'spieler.php?uid=' + pid )
	{
		return ;
	}
	document.location.href = fullName + 'spieler.php?uid=' + pid ;
}
/////////////////////////////////////////////////////////////////////
function setCapitalname() // SET capital 
{ // Qusai Abu Hilal // improvment 5 // Assign the capital automatically
	if( ver4FL )
	{
		var capnam = $gc('name',$g('content')[0]);
		for( var cnt = 1; cnt < capnam.length; cnt++)
		{	/*INFORMATION
			if it is nodelist soooo
			[0] as array BUT DO NOT USE innerHTML
			// */
			var capitalnama = $gc('mainVillage',capnam[cnt]);
			if( typeof capitalnama[0] != 'undefined' )
			{
				try
				{
					capitalname = capnam[cnt].textContent;
					capitalname = capitalname.replace( capitalnama[0].innerHTML, "");
					new_setValue('capitalname', capitalname);
				}
				catch( err )
				{
					er( "The error inside setCapitalname() is \n" + err, 'C' );				
				}			
				return ;
			}
		}
	}
	else
	{;
		var capnam = $gc('nam',$g('content')[0]);
		for( var cnt = 0; cnt < capnam.length; cnt++)
		{
			var capitalnama = $gc('mainVillage',capnam[cnt]);
			if( typeof capitalnama[0] != 'undefined' )
			{
				try
				{
					var villageid = capnam[cnt].innerHTML.match(/\?d=(\d+)/)[1];
					capitalname = capnam[cnt].textContent;
					capitalname = capitalname.replace( capitalnama[0].innerHTML, "");
					new_setValue('capitalname', capitalname);
				}
				catch( err )
				{
					er( "The error inside setCapitalname() is \n" + err, 'T' );				
				}			
				return ;
			}			
			else
			{
				try
				{
					capitalname = capnam[cnt].textContent.split("(")[0];
					new_setValue('capitalname', capitalname);
				}
				catch( err )
				{
					er( "The error inside setCapitalname() is \n" + err, 'S' );				
				}			
				return ;
			}// */
		}
	}
}// End of sitting capital name
/////////////////////////////////////////////////////////////////////
function setCapitalcoords() // SET capital coords
{ // Qusai Abu Hilal // improvment 5 // Assign the capital coordinates automatically
	if( ver4FL )
	{
		var capnam = $gc('name',$g('content')[0]);
		for( var cnt = 1; cnt < capnam.length; cnt++)
		{	/* INFORMATION:
			if it is nodelist soooo use
			[0] as array BUT DO NOT USE innerHTML
			// */
			var capitalnama = $gc('mainVillage',capnam[cnt]);
			if( typeof capitalnama[0] != 'undefined' )
			{
				try
				{
					var villageid = capnam[cnt].innerHTML.match(/\?d=(\d+)/)[1];
					var xy = id2xy(villageid);
					capitalcoords = "(" + xy[0] + "|" + xy[1] + ")";
					new_setValue('capitalcoords', capitalcoords);
				}
				catch( err )
				{
					er( "The error inside setCapitalcoords() is \n" + err, 'D' );
				}			
				return ;
			}
		}
	}
	else
	{;
		var capnam = $gc('nam',$g('content')[0]);
		for( var cnt = 0; cnt < capnam.length; cnt++)
		{
			var capitalnama = $gc('mainVillage',capnam[cnt]);
			if( typeof capitalnama[0] != 'undefined' )
			{
				try
				{
					var villageid = capnam[cnt].innerHTML.match(/\?d=(\d+)/)[1];
					var xy = id2xy(villageid);
					capitalcoords = "(" + xy[0] + "|" + xy[1] + ")";
					new_setValue('capitalcoords', capitalcoords);
				}
				catch( err )
				{
					er( "The error inside setCapitalname() is \n" + err, 'U' );				
				}			
				return ;
			}			
			else
			{
				try
				{
					var villageid = capnam[cnt].innerHTML.match(/\?d=(\d+)/)[1];				
					var xy = id2xy(villageid);
					capitalcoords = "(" + xy[0] + "|" + xy[1] + ")";					
					new_setValue('capitalcoords', capitalcoords);
				}
				catch( err )
				{
					er( "The error inside setCapitalname() is \n" + err, 'V' );				
				}			
				return ;
			}// */
		}
	}	
}// End of sitting capital coords
/////////////////////////////////////////////////////////////////////
function armored_setRaceID()
{
	if( ver4FL )
	{
		try
		{
			racenm = $gc('transparent',$g('content')[0])[0].rows[1].cells[1].innerHTML;
			new_setValue('racenm', racenm);
			for( i = 0; i < 3; i++ )
			{
				if( (racenm) == (gtext("racelist")[i]) )
				{
					new_setValue('raceid', i);
					return ;
				}// */
			}
			return ;
		}
		catch( err )
		{;
			er( "INSIDE armored_setRaceID() \n" + err, 'I' );
		}
		return ;
	}
	else
	{;
		try
		{
			racenm = $gt('td',$gc('details')[0])[1].innerHTML;			
			new_setValue('racenm', racenm);
			for( i = 0; i < 3; i++ )
			{
				if( (racenm) == (gtext("racelist")[i]) )
				{
					new_setValue('raceid', i);
					return ;
				}// */
			}
			return ;
		}
		catch( err )
		{;
			er( "INSIDE armored_setRaceID() \n" + err, 'I' );
		}
		return ;
	}
}
/////////////////////////////////////////////////////////////////////
function getCrtServer()
{
	TB3O.fullServerName = crtUrl.host;
	TB3O.gServer = TB3O.fullServerName.replace(/\.travian\./, '');
	return;
}
/////////////////////////////////////////////////////////////////////
function getcurId()
{
	return crtPath.split("uid=")[1];
}

function armored_show_armored_Get()
{
	try
	{;
		alert ( "Your raceid is \n" + raceid );
		alert ( "Your racenm is \n" + racenm );
		alert ( "Your capitalcoords is \n" + capitalcoords );
		alert ( "Your capital name is \n" + capitalname );
	}
	catch( err )
	{;
		er( "INSIDE armored_show_armored_Get() \n" + err, "R" );
	}
}

function armored_Get_prsntag()
{
	try
	{;
		warehouse_prsntag = new_getValue('warehouse_prsntag', '');
		cranyprsntag = new_getValue('cranyprsntag', '');
		if( (typeof warehouse_prsntag == 'undefined') || (!warehouse_prsntag)
			|| (parseInt(warehouse_prsntag) <= 0) ||(parseInt(warehouse_prsntag) > 100) )
		{
			warehouse_prsntag = 75;
			new_setValue('warehouse_prsntag', warehouse_prsntag);
		}
		if( (typeof cranyprsntag == 'undefined') || (!cranyprsntag)
			|| (parseInt(cranyprsntag) <= 0) || (parseInt(cranyprsntag) > 300) )
		{			
			cranyprsntag = 70;
			new_setValue('cranyprsntag', cranyprsntag);
		}
	}
	catch( err )
	{
		er( err, 'L');
	}
}

function armored_Get()
{;// Qusai Abu Hilal // load them every time !
	try
	{;		
		raceid = new_getValue('raceid', '');
		racenm = new_getValue('racenm', '');
		capitalcoords = new_getValue('capitalcoords', '');
		capitalname   = new_getValue('capitalname', '');
		
		if( (typeof raceid == 'undefined') || (raceid > 2 || raceid < 0 ) ||
		    (typeof racenm == 'undefined') || (!racenm) ||
		    (typeof capitalcoords == 'undefined') || (!capitalcoords) ||
		    (typeof capitalname   == 'undefined') || (!capitalname)   )
		{
			goProfile();
			// armored_show_armored_Get();
			return ;
		}
	}
	catch( err )
	{;
		er( "INSIDE armored_Get() \n" + err, "H" );
	}
}
function armored_Get_id_cords()
{;// Qusai Abu Hilal // load them every time !
	try
	{;
		raceid = new_getValue('raceid', '');
		capitalcoords = new_getValue('capitalcoords', '');
	}
	catch( err )
	{;
		er( "INSIDE armored_Get_id_cords() \n" + err, "H" );
	}
}// End of improvment 4
function armored_Get_LC()
{;// Qusai Abu Hilal // load them every time !
	try
	{;
		return langs[RB.Setup[1]];
	}
	catch( err )
	{;
		er( "INSIDE armored_Get_LC() \n" + err, "AA" );
		return ;
	}
}
function armored_Set_account_info()
{;// Qusai Abu Hilal // load them every time !
	try
	{;
		setCapitalname();
		setCapitalcoords();
		armored_setRaceID();
		return ;
	}
	catch( err )
	{;
		er( "INSIDE armored_Set_account_info() \n" + err, "H" );
		return ;
	}
}
/////////////////////////////////////////////////////////////////////
// 2011/06/12
// changing the setting position
function armored_Set_Setting_position()
{
    try
    {
    	var logoutbtn = $g('logoutContainer');    	
        if( logoutbtn )
        {
        	// alert( "logoutbtn \n" + logoutbtn );
        	if( ltr )
        	{
        		var aImg = $e('IMG',[['src',image["settings"]],['title',gtext("settings")],['style','border:none; width: 24px; position:absolute;right:305px; z-index: 1;']]);
        		var aImg2 = $e('IMG',[['src',image["notepad"]],['title',gtext("notes")],['style','border:none; width: 24px; hight:28; position:absolute; right:335px; z-index:1;']]);
        		var script_version = $a( version  + '&nbsp',[['href', namespace],['style','border:none; position:absolute;right:369px; z-index:1; top:1px; font-size:14px;'],['target','_blank'],['title',gtext("svers")]]);
        	}
        	else
        	{
        		var aImg = $e('IMG',[['src',image["settings"]],['title',gtext("settings")],['style','border:none; width: 25px; position:absolute;left:305px; z-index: 1;']]);
        		var aImg2 = $e('IMG',[['src',image["notepad"]],['title',gtext("notes")],['style','border:none; width: 24px; hight:28; position:absolute;left:335px; z-index:1;']]);
        		var script_version = $a( '&nbsp' + version,[['href', namespace],['style','border:none; position:absolute;left:373px; z-index:1; top:1px; font-size:14px;'],['target','_blank'],['title',gtext("svers")]]);	
        	}        	
        	aImg.addEventListener('click', rbSetup, false);
        	aImg2.addEventListener('click', rbNotes, false);
		logoutbtn.appendChild(aImg);
		logoutbtn.appendChild(aImg2);
		logoutbtn.appendChild(script_version);
        }
        else
        {;// NOT travian 4
			var set_note = $e('TABLE',['style','float:'+docDir[0]+';']);
			var newR = $e('TR');
			// Settings symbol
			var seting = $e('IMG',[['src',image["settings"]],['title',gtext("settings")],
			['style','background-color:white; width:32px; hight:32;float:'+docDir[0]+';border-collapse:collapse;']]);
			seting.addEventListener('click', rbSetup, false);
			var newD = $c(seting);
			newD.setAttribute("rowspan","2");
			newR.appendChild(newD);
			// Notepad symbol
			var notpad = $e('IMG',[['src',image["notepad"]],['title',gtext("notes")],
			['style','width:32px; hight:32;float:'+docDir[0]+';border-collapse:collapse;']]);
			notpad.addEventListener('click', rbNotes, false);
			var newD = $c(notpad);
			newD.setAttribute("rowspan","2");
			newR.appendChild(newD);// */
			/*
			var alinkW = $a('[' + gtext("N_W") +']', [['href', jsVoid],['style','color:Green;font-size:11px;'],['title',gtext("notew") + "\t" + note_Width]]);
			alinkW.addEventListener('click', changeNotesWidth, false);
			var newD = $c(alinkW);
			newR.appendChild(alinkW);// */
			/*
			var newR2 = $e('TR');
			var alinkH = $a('[' + gtext("N_H") +']', [['href', jsVoid],['style','color:Green;font-size:11px;'],['title',gtext("noteh") + "\t" + note_Hight]]);
			alinkH.addEventListener('click', changeNotesHight, false);
			var newD  = $c(alinkH);		
			newR2.appendChild(newD);// */

			// Adding the row
			set_note.appendChild(newR);
			//set_note.appendChild(newR2);
			makeFloatD(set_note,11);

			// version link
			var newT = $e('TABLE',['style','float:'+docDir[0] +';']);
			var newR = $e('TR');		
			var script_version = $a( version  + '&nbsp',[['href', namespace],		
			['style','hight:16;float:'+docDir[0]+';'],		
			['target','_blank'],['title',gtext("svers")]]);
			var newD = $c(script_version);
			newR.appendChild(newD);// */
			// Adding the row
			newT.appendChild(newR);
			makeFloatD(newT,12);
        }
    }
    catch( err )
    {
        alert( err, 'O' );
    }
}// End of changing setting position
// 2011/06/09
/*
/////////////////////////////////////////////////////////////////////
function setDefaultStatisticsMenu()
{// HERE YOU GO
   var statMenu = 
   { 
      1: ["Players",""],
      2: ["Villages",""],
      4: ["Alliances",""],
   };
   setGMcookieV2('statistics', statMenu);
}
/////////////////////////////////////////////////////////////////////
function uiCreateSearchBarWidget()
{
   if ( TB3O.O[32] === "1")
   {
      var sbc = getGMcookieV2('statistics');
      if ( sbc && sbc[1] )
      {
         var aForm = uiCreateSearchForm(sbc);
         if ( aForm )
         {
            if ( TB3O.O[33] !== "1" )
            {
               var aPar = $e("p");
               aPar.setAttribute('style', 'margin-top:0px;');
               aPar.appendChild(aForm);
               TB3O.nTASb.appendChild(aPar);
            }
            else 
            {
               var xy = TB3O.O[79].split("|");
               $df(300, xy[0], xy[1], "?", "searchbar", "searchbarTT", true, aForm);
               if ( TB3O.O[74] !== "1" ) { aForm.style.display = 'none'; }
            }
         }
      }
   }   
}

/////////////////////////////////////////////////////////////////////
function uiCreateSearchForm(sbc)
{
   var aSF = $e("form", [['id', 'searchform'], 
                         ['action', 'statistiken.php?id=' + TB3O.O[83]], 
                         ['method', 'POST']]);
   var i1 = $e("input", [['id', 'searchopt'], ['type', 'hidden'], ['value', TB3O.O[83]]]);
   var i2 = $e("input", [['type', 'text'], ['maxlength', '20'], ['size', '10'], ['value', '']]);
   var i3 = $e("input", [['type', 'submit'], ['name', 'submit'], ['value', '?']]);

   
      i2.name = 'name';
      i2.className = 'text name';
   

   var s1 = $e("select", [['id', 'searchtype']]);
   addOption(s1,sbc,1);
   addOption(s1,sbc,2);
   addOption(s1,sbc,4);
   addOption(s1,sbc,31);
   addOption(s1,sbc,32);
    { addOption(s1,sbc,8); } 
   s1.addEventListener('change', setSearchBarOption, false);
   aSF.appendChild(i1);
   aSF.appendChild(i2);

   aSF.appendChild(s1);

   aSF.appendChild(i3);
   return aSF;

   function addOption(sel,sbc,id)
   {
      if ( sbc[id] )
      {
         sel.add(new Option(sbc[id][0], id, false, (id === parseInt(TB3O.O[83]))),null);
      }
   }

   function setSearchBarOption()
   {
      var searchType = $g("searchtype").value;
      TB3O.O[83] = '' + searchType;
      saveTBOptions();
      var i1 = $g("searchopt");
      if (i1) i1.value = searchType;
      var aSF = $g("searchform");
      if ( aSF ) { aSF.action = 'statistiken.php?id=' + searchType; }
   }
}
// */
/************************** end test zone ****************************/
// starting of script
	RunTime[2] = new Date().getTime();
	if( ! ($g('l1')) ) return;
	var userID = getUserID();
	// alert( " userID \n " + userID );
	var GMcookieID = crtName + '_' + userID + '_'; // very important to eleminate conflicts
	migrateStorage();
	loadCookie ( 'RBSetup', 'Setup' );
	var paranoidMode = testScripts();

	loadOVCookie('vHint', 'vHint');
	loadCookie ( 'xy', 'XY' );
	loadCookie ( 'bodyH', 'bodyH' );
		
	if( ver4FL ) vlist_addButtonsT4(); else vlist_addButtons();
	loadCookie ( 'Dict', 'dictionary' );

	if( villages_id[0] == 0 ) if( RB.dictionary[0] == 0 ) {
		document.location.href = fullName + 'spieler.php?uid=' + userID;
	} else {
		villages_id[0] = parseInt(RB.dictionary[0]);
		village_aid = villages_id[0];
	}
	loadAllCookie();
	
	// by Qusai Abu Hilal	
	// Once you get the data bring it !
	armored_Get();
	// New place for settings
	armored_Set_Setting_position();
	// Once you get the data bring it !
	
	// LC = setLC();
	// alert( "LC is \n" + LC );
	// var LOC = meta_Content_Language();	
	
	var arena = RB.dictFL[3] == 0 ? gtext("arena") : RB.dictionary[3];
	//save "produce per hour"
	if( ! getResources() ) return;
	saveVCookie('vPPH', income.concat(resNow).concat(fullRes).concat(Math.round(RunTime[0]/1000)));
	if( /dorf[12].php/.test(crtPath) ) parseDorf1();

	if( RB.overview[0] > -1 ) {
		var i = parseInt(RB.overview[0]) +1;
		if( i > villages_count ) {
			RB.overview[0] = -2;
			saveCookie('OV', 'overview');
			setTimeout( function() { document.location.href = RB.overview[1]; }, getRandom(500,2000));
		} else {
			RB.overview[0] = i;
			saveCookie('OV', 'overview');
			var newdid = linkVSwitch[i-1].match(/newdid=\d+/i)[0];
			setTimeout( function() { document.location.href = fullName +'dorf1.php?'+ newdid; }, getRandom(500,2000));
		}
		return;
	} else if( RB.overview[0] == -2 ) {
		RB.overview[0] = -1;
		RB.overview[1] = Math.round(RunTime[0]/1000);
		saveCookie('OV', 'overview');
		overviewAll();
	}
	if( paranoidMode ) return;
	try
	{
		progressbar_init();		
	}
	catch( err )
	{
		er( err , 'G' );
	}// */
	var cont = $g(pageElem[1]);
	var contXY = offsetPosition( cont );
	var contRight = ltr ? contXY[0] + cont.clientWidth : contXY[0];
	var contTop = contXY[1];


	if( /dorf1.php/.test(crtPath) ) { troopsDorf1(); normalizeProduction(); }
	if( /dorf[12].php/.test(crtPath) || ver4FL ) { villageHintEdit(); /*by Qusai * / centerNumber (); /* */ }
	if( /dorf2.php/.test(crtPath) ) parseDorf2();
	if( /dorf3.php/.test(crtPath) ) villageHintDorf3();
	if( /(?:nachrichten|berichte).php/.test(crtPath) ) { deleteButtonAdd(); viewMessageIW(); }
	if( /nachrichten.php\?.*id=/.test(crtPath) ) convertCoordsInMessagesToLinks();
	if( /karte.php\?(.*&)?d=\d+&c=/.test(crtPath) ) { troopsOasis(); viewMessageIWK(); }
	if( /karte.php\?(.*&)?[zdxy]=/.test(crtPath) ) distanceToMyVillages();
	if( /karte.php/.test(crtPath) ) { karteDistance(); cropFind(); }
	if( /position_details.php\?(.*&)?[zdxy]=/.test(crtPath) ) 
	{ troopsOasis(); distanceToMyVillages(); viewMessageIWK(); linkOnT4Karte(); addToMapT4(); }
	if( /allianz.php\?(.*&)?s=3/.test(crtPath) ) { viewMessageIWK(); addAReportFilter(); }
	if( /allianz.php(\?aid=\d+)?$/.test(crtPath) ) allyActivityInfo();
	if( /spieler.php\?.*uid=/.test(crtPath) ) 
	{
		distanceToTargetVillages(); 
		parseSpieler(); 
		userActivityInfo(); 
		if( getcurId() == getUserID() ) // && ver4FL)
		{
			armored_Set_account_info();
		}
		if( !ver4FL ) resourceBalance(); 
	}

	if( /build.php\?(.*&)?s=2/.test(crtPath) ) { culturePoints(); /*linkOnT4Karte(); // */ }
	if( /a2b.php/.test(crtPath) ) { fillXYtoRP(); rpDefaultAction(); }
	if( /allianz.php/.test(crtPath) ) parseAlly();
	if( /berichte.php.+id=/.test(crtPath) ) { addQuickLinks(); analyzerBattle(); }
	if( ! /dorf.\.php/.test(crtPath) ) addRefIGM();
	if( /hero_auction.php/.test(crtPath) ) { speedBids(); /*timeToBids();// */ }
	if( /hero_inventory.php/.test(crtPath) ) { neededResAdd( true );  restHeroTime(); }
	if( /build.php/.test(crtPath) ) {
		neededResAdd( false );
		buildDispatcher();
		addSpeedAndRTSend();
	}
	setInterval(progressbar_updValues, 1000);
	if( RB.Setup[16] == 1 ) bigQuickLinks();
	if( RB.Setup[14] == 1 ) showDorf1();
	if( RB.Setup[12] > 0 ) showLinks();
	if( RB.Setup[17] == 1 ) rbNotes();
	if( RB.Setup[7] == 1) {
		if( ver4FL ) {; // for future
		} else { $at($g(pageElem[2]),[['style','width:auto;']]); setTimeout(pageNoWrap, 500); }
	}
	addSpeedRTSendMessageInLLinks();
	if( RB.Setup[20] > 0 ) if( RB.dictFL[13] < 2 || RB.Setup[20] == 2 ) scanTropsData();

	detectAttack();
	showRunTime();
	centerNumber();
}
function backupStart () {
	if(notRunYet) {
		var l4 = document.getElementById('l4');
		if( l4 ) allInOneOpera();
		else setTimeout(backupStart, 500);
	}
}
var notRunYet = true;
var started = false;
if( /Chrome/.test(navigator.appVersion) ) allInOneOpera();
else if (window.addEventListener) window.addEventListener("load",function () { if(notRunYet) allInOneOpera(); },false);
setTimeout(backupStart, 500);
})();


