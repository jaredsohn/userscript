// ==UserScript==
// @author      Risi (edited for 3.5 by Nevam)
// @email		userscripts@yahoo.com
// @namespace	http://userscripts.org/
// @name		Travian Task Queue
// @description	Schedule delayed constructions, upgrades and attacks.
// @include     http://*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     1.8.0
// ==/UserScript==

/*********************
 *		Settings 
 *********************/
var LOG_LEVEL = 0; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var iCheckEvery = 10000;  // How often do we check for tasks to trigger in miliseconds. 
                          // Low value  = high accuracy in triggering tasks. To make your browser 
						  // unresponsive, set this to some ridiculously small number. Default is 10000
var iPreloadTime = 20;  // How many seconds ahead is the code for building and upgrading prefetched. 
                        // If the code is not available by the time the construction should start, the 
						// construction will be cancelled. This value must be greater than iCheckEvery 
						// in seconds (i.e. iCheckEvery/1000). Default is 20.
var bDisplayVillageNames = true;  //Display village names instead of numbers. May hit the performance.
var sCurrentServer = "";    // Set this to the server's url to override automatic server detection
                            // (i.e. s1.travian.net)
                            // Dont set it if you're playing on multiple servers simultaneously!
var init = initialize();
/*********************
 *	End of Settings
 *********************/

/*********************
 *		GLOBALS
 *	  do not tamper!
 *********************/
if (init) {
    var sCurrentVersion = "1.8.0";  //Version number with which we need to run the update fu
    var scriptURL = "http://userscripts.org/scripts/source/49694.user.js";
	// Your local computer time MUST  still be correct (both time and date!).
	var bUseServerTime = getOption("USE_SERVER_TIME", false, "boolean"); //IMPORTANT!!! If true, you must be using 24-hour format on your server, otherwise there WILL be errors.
    var bLocked = false;  // for locking the TTQ_TASKS variables
    var bLockedCode = false;  // for locking the TTQ_CODE_0 and TTQ_CODE_1 variables
    var bLockedHistory = false;
    var oIntervalReference = null;
    var iSessionRefreshRate = 60;  //Amount of minutes after which the session is refreshed by reloading the dorf1 page in the background. If set to 0, refreshing is disabled. Default: 60
    var iMaxPlaceNamesVariableLength = 15;  //maximum number of names stored  in the variables before it is cleared
    var iMyRace = getOption("RACE", 0, "integer");  // 0- Romans, 1- Teutons, 2- Gauls. Set via dialogue.
    var iHistoryLength = getOption("HISTORY_LENGTH", 7, "integer");
    var aLangBuildings = []; //multilang support
    var aLangTasks = []; //multilang support
    var aLangStrings = []; //multilang support
    var aLangTroops = []; //multilang support
    var aLangStringt = []; //multilang support
    var aLangUpdate = []; //multilang support
    var aLangMenuOptions = []; //multilang support
    var sLang = detectServer();

    // Images
    var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
    var sDeleteBtn = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";

    //Styles
    var cssStyle = "";
    cssStyle += "#ttq_tasklist, #ttq_history {position:absolute; background-color:#90DD43; border:1px solid #000000; color:#000000; padding:5px 10px; z-index:100; -moz-border-radius:5px;}";
    cssStyle += "#ttq_history {background-color:#D4D4EC}";
    cssStyle += ".ttq_history_row {padding:1px 5px;}";
    cssStyle += ".ttq_village_name {font-weight:bold;}";
    cssStyle += ".ttq_draghandle {font-size: 120%; font-weight:bold;}";
    cssStyle += ".ttq_time_village_wrapper {font-style:italic; font-size:80%; display:block;}";
    cssStyle += ".ttq_close_btn {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
    cssStyle +=	"#timerForm {padding:10px 20px; }";
    cssStyle += "#timerform_wrapper {position:absolute; max-width:900px !important; margin:0; background-color:#FBEC87; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
    cssStyle += "#timerform_wrapper p {}";
    cssStyle +=	"#ttq_message {position:absolute; z-index:100; border:1px solid black; padding:10px 20px; color:black; width:335px}";
    cssStyle += ".handle {cursor: move;}";
    cssStyle += "a.ttq_sortlink, a#ttq_flush_history {color:#000000;} a.ttq_sortlink:hover, a#ttq_flush_history:hover {color:#F64809} a.ttq_sortlink_active {color:#FDFF3F}";
    cssStyle += ".ttq_sort_header {border-bottom:1px dashed #000000}";
    cssStyle += ".ttq_research_later {display:block;}";
    GM_addStyle(cssStyle);

	/***************************************************************************
    *								Translations
	*                            --------------------
	*  						------>    IMPORTANT!    <------
	* - If there is no translation available for your language, the script will not work!
	* - aLangBuildings must list all names EXACTLY as they are printed on your Travian web site. Names are case-sensitive.
	* - aLangStrings[7] (= "level" in English) must read exactly what it is on your website next to building names of higher level.
	* - aLangStrings[11] (= "Current production:" in English)  must read exactly what it is on your website on the resource site pages.
	* -> Please post all translations here: http://userscripts.org/topics/27738
 	***************************************************************************/
	 
	switch(sLang) {
	case "ae": //by Fahad
		aLangBuildings = ["", "الحطاب", "حفرة الطين", "منجم حديد", "حقل القمح", "معمل النجاره", "مصنع الطوب", "مصنع الحديد", "المطاحن", "المخابز","مخزن", "مخزن الحبوب", "حداد", "مستودع الاسلحة", "ساحة البطولة", "المبنى الرئيسي", "نقطة التجمع", "السوق", "السفارة" ,"ثكنه", "الاسطبل", "المصانع الحربية","الاكاديميه الحربية", "المخبأ", "البلدية", "السكن", "قصر", "الكنز","المكتب التجاري", "الثكنة الكبيرة", "الاسطبل الكبير", "الحاجز","السور الاضي", "سياج الاغريق", "الحجار","مصنع العصير", "الصياد", "قصر الابطال", "المستودعات الكبيرة", "مخازن الحبوب الكبيرة", "معجزة العالم"];
		aLangTasks = ["بناء", "تطوير", "هجوم", "فتح قسم", "تدريب", "Party"];
		aLangStrings = ["البناء لاحقا", "تطوير لاحقا", "الهجوم لاحقا", "فتح القسم لاحقا", "جدولة هذا العمل لاحقا", "لقد بداءالبناء ", " هذه العملية غير معروفة النتائج.", "المستوى", " لا يمكن ان يبناء.", " لا يمكن ان يطوير", "هذا العمل مجدول","العمل القائم", "لا يمكن ادراج هذه العملية لان.", "المهم المجدولة غير متاحه","المهام المجدولة", "حذف", "ارسال لاحقا", "لم يتم اختيار الجنود.", "الجنود متوجهين الى","جيوشك لا يمكن ارسالها الى", "مساندة", "هجوم", "نهب", "تصويب المقلاع نحو", "عشوائي","عند", "او بعد", "ثانية", "دقيقة", "ساعة", "يوم", "التجسس على الجيوش والموارد","التجسس على الجيوش والتحصينات", "بعيد","لا يمكن جدولة هذا الهجوم لان الهدف غير محدد ", "الموقع غير موجود", "فرز بواسطة:","النوع ", "الوقت ", "الهدف ", "الخيارات ", "القرية ", "مهام محفوظه", "محفوظات حالية","بداية عملية البحث ", " لا تستطيع اعادة البحث" , "تطوير لاحقا" , "تجسس" , "تدريب لاحقا" , "جنود" , "تدريب" , "تم بدء التدريب" , "لا تستطيع التدريب", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["جندي أول", "حراس الأمبراطور", "جندي مهاجم", "فرقة تجسس", "سلاح الفرسان", "فرسان قيصر", "كبش", "المقلاع الناري", "حكيم", "مستوطن", "بطل"]; //Romans
		aLangTroops[1] = ["مقاتل بهراوة", "مقاتل برمح", "مقاتل بفأس", "الكشاف", "مقاتل القيصر", "فرسان الجرمان", "محطمة الابواب", "المقلاع", "الزعيم", "مستوطن", "بطل"]; //Teutons
		aLangTroops[2] = ["الكتيبه", "مبارز", "المستكشف", "رعد الجرمان", "فرسان السلت", "فرسان الهيدوانر", "محطمة الابواب الخشبية", "المقلاع الحربي", "رئيس", "مستوطن", "بطل"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
	
	case "ar":
		aLangBuildings = ["", "DrvosjeÄa", "Rudnik gline", "Rudnik Å¾eljeza", "Poljoprivredno imanje", "Pilana", "Ciglana", "Ljevaonica Å¾eljeza", "Mlin", "Pekara", "SkladiÅ¡te", "Silos", "KovaÄnica oruÅ¾ja", "KovaÄnica oklopa", "Mejdan", "Glavna zgrada", "Mjesto okupljanja", "Pijaca", "Ambasada", "Kasarna", "Å tala", "Radionica", "Akademija", "SkloniÅ¡te", "OpÅ¡tina", "Rezidencija", "Dvorac", "Treasury", "TrgovaÄki centar", "Velika kasarna", "Velika Å¡tala", "Gradski bedem", "Zid od zemlje", "Taraba", "Klesar", "Brewery", "PostavljaÄ zamki", "Herojska vila", "Veliko skladiÅ¡te", "Veliki silos", "Svjetsko Äudo"];
		aLangTasks = ["Izgradi", "Unaprijedi", "Napad", "IstraÅ¾i", "ObuÄi", "Party"];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "HÃ©roe"]; //Romanos
		aLangTroops[1] = ["Batinar", "Kopljanik", "Borac sa sikirom", "IzviÃ„â€˜aÃ„Â", "Paladin", "Teutonski vitez", "Ovan", "Katapult", "Poglavica", "Naseljenik", "Hero"];  //Teutons
		aLangTroops[2] = ["Palanks", "MaÃ„Âevalac", "IzviÃ„â€˜aÃ„Â", "Theutateov Grom", "druidni jahaÃ„Â", "Haeduan", "Ovan", "Katapult", "StarjeÃ…Â¡ina", "Naseljenik", "Hero"];  //Gauls
		aLangStrings = ["Gradi poslije", "Unaprijedi poslije", "Napadni poslije", "IstraÅ¾i poslije", "Isplaniraj ovaj zadatak za poslije.", "PoÄela je gradnja ", " pokuÅ¡ano je s nepoznatim rezultatom.", "stepen", " ne moÅ¾e biti izgraÄ‘eno.", " ne moÅ¾e se unaprijediti.", "Isplaniran je zadatak.", "Aktualna produkcija:", "Ne moÅ¾e se isplanirati ovaj zadatak sada.", "Planirani zadatak nije dostupan!", "Planirani zadaci", "izbriÅ¡i", "PoÅ¡alji poslije", "Trupe nisu odabrane.", "VaÅ¡a vojska je poslana na", "VaÅ¡a vojska ne moÅ¾e biti poslana na", "PodrÅ¡ka", "Napad", "PljaÄka", "Katapulti Ä‡e ruÅ¡iti", "sluÄajno", "u", "ili nakon", "sekundi", "minuta", "sahati", "dana", "Å pijuniraj resourse i trupe", "Å pijuniraj trupe i odbranu", "away", "Napad ne moÅ¾e biti isplaniran jer destinacija nije odreÄ‘ena.", "na stranici br.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "ba":  //by bhcrow
		aLangBuildings = ["", "DrvosjeÃ„Âa", "Rudnik gline", "Rudnik Ã…Â¾eljeza", "Poljoprivredno imanje", "Pilana", "Ciglana", "Ljevaonica Ã…Â¾eljeza", "Mlin", "Pekara", "SkladiÃ…Â¡te", "Silos", "KovaÃ„Ânica oruÃ…Â¾ja", "KovaÃ„Ânica oklopa", "Mejdan", "Glavna zgrada", "Mjesto okupljanja", "Pijaca", "Ambasada", "Kasarna", "Ã…Â tala", "Radionica", "Akademija", "SkloniÃ…Â¡te", "OpÃ…Â¡tina", "Rezidencija", "Dvorac", "Treasury", "TrgovaÃ„Âki centar", "Velika kasarna", "Velika Ã…Â¡tala", "Gradski bedem", "Zid od zemlje", "Taraba", "Klesar", "Brewery", "PostavljaÃ„Â zamki", "Herojska vila", "Veliko skladiÃ…Â¡te", "Veliki silos", "Svjetsko Ã„Âudo"]; 
		aLangTasks = ["Izgradi", "Unaprijedi", "Napad", "IstraÃ…Â¾i", "ObuÃ„Âi", "Party"];
		aLangStrings = ["Gradi poslije", "Unaprijedi poslije", "Napadni poslije", "IstraÃ…Â¾i poslije", "Isplaniraj ovaj zadatak za poslije.", "PoÃ„Âela je gradnja ", " pokuÃ…Â¡ano je s nepoznatim rezultatom.", "stepen", " ne moÃ…Â¾e biti izgraÃ„â€˜eno.", " ne moÃ…Â¾e se unaprijediti.", "Isplaniran je zadatak.", "Aktualna produkcija:", "Ne moÃ…Â¾e se isplanirati ovaj zadatak sada.", "Planirani zadatak nije dostupan!", "Planirani zadaci", "izbriÃ…Â¡i", "PoÃ…Â¡alji poslije", "Trupe nisu odabrane.", "VaÃ…Â¡a vojska je poslana na", "VaÃ…Â¡a vojska ne moÃ…Â¾e biti poslana na", "PodrÃ…Â¡ka", "Napad", "PljaÃ„Âka", "Katapulti Ã„â€¡e ruÃ…Â¡iti", "sluÃ„Âajno", "u", "ili nakon", "sekundi", "minuta", "sahati", "dana", "Ã…Â pijuniraj resourse i trupe", "Ã…Â pijuniraj trupe i odbranu", "away", "Napad ne moÃ…Â¾e biti isplaniran jer destinacija nije odreÃ„â€˜ena.", "na stranici br.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionar", "Preatorijanac", "Imperijanac", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ratni ovan", "Vatreni katapult", "Senator", "Naseljenik", "Hero"];  //Romans
		aLangTroops[1] = ["Batinar", "Kopljanik", "Borac sa sikirom", "IzviÃ„â€˜aÃ„Â", "Paladin", "Teutonski vitez", "Ovan", "Katapult", "Poglavica", "Naseljenik", "Hero"];  //Teutons
		aLangTroops[2] = ["Palanks", "MaÃ„Âevalac", "IzviÃ„â€˜aÃ„Â", "Theutateov Grom", "druidni jahaÃ„Â", "Haeduan", "Ovan", "Katapult", "StarjeÃ…Â¡ina", "Naseljenik", "Hero"];  //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "bg": //by penko & pe
		aLangBuildings = ["", "Сечище", "Глинена кариера", "Рудник", "Житно поле", "Дъскорезница", "Тухларна", "Леярна", "Мелница", "Пекарна", "Склад", "Хамбар", "Ковачница за брони", "Ковачница за оръжия", "Арена", "Главна сграда", "Сборен пункт", "Пазар", "Посолство", "Казарма", "Конюшня", "Работилница", "Академия", "Скривалище", "Кметство", "Резиденция", "Дворец", "Съкровищница", "Търговска Палата", "Голяма казарма", "Голяма конюшня", "Градска стена", "Земен насип", "Палисада", "Зидарска гилдия", "Пивоварна", "Трапер", "Таверна", "Голям склад", "Голям хамбар", "Чудо", "Treasure Chamber", "Horse Drinking Pool"];
		aLangTasks = ["Построяване на", "Надстройка на", "Атака към", "Откриване на", "Трениране на", "Party"];
		aLangStrings = ["Постройте по-късно", "Надстройте по-късно", "Атакувайте по-късно", "Открийте по-късно", "Запишете тази задача за по-късно.", "Започна строеж ", " Започна с неясен резултат.", "ниво", " не може да бъде построено.", " не може да бъде надстроено.", "Задачата е планирана.", "Текуща продукция:", "Тази задача не може да бъде планирана сега.", "Планираната задача не е достъпна!", "Планирани задачи", "Изтриване", "Изпрати по-късно", "Атаката не може да бъде планирана, защото не са избрани войници.", "Вашите войници са изпратени към", "Вашите войници не могат да бъдат изпратени към", "Подкрепление към", "Атака към", "Набег към", "Катапултите се целят в", "случайно", "в", "или след", "секунди", "минути", "часа", "дена", "Шпиониране за ресурси и войска", "Шпиониране за войска и защита", "липсва", "Атаката не може да бъде планирана, тъй като не е избрана цел.", "at site no.", "Сортиране по:", "тип ", "време ", "цел ", "опции ", "град ", "История на задачите", "изчистване на историята", "Започна изучаването", " не може да бъде изучен.", "Подобри по-късно", "Шпионаж", "Тренирай по-късно", "войски.", "Тренирай", "Започна тренирането ", " не може да бъде трениран.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Легионер", "Преторианец", "Империан", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Катапулт", "Огнен катапулт", "Сенатор", "Заселник", "Герой"]; //Romans
		aLangTroops[1] = ["Боец с боздуган", "Копиеносец", "Боец с брадваn", "Съгледвач", "Паладин", "Тевтонски рицар", "Таран", "Катапулт", "Предводител", "Заселник", "Герой"]; //Teutons
		aLangTroops[2] = ["Фаланга", "Мечоносец", "Следотърсач", "Theutates Thunder", "Друид конник", "Хедуан", "Таран", "Требучет", "Вожд", "Заселник", "Герой"]; //Gaul
		aLangTransModel= ["Смесена", "Само жито", "Само ресурси", "Фиксирана"];
		aLangStringt = ["Завръщане", "Автотранспорт", "Автотърговия", "Търговци", " от", "до", "Вид доставка ", "Следваща доставка след ", " минути ", "секунди", "Брой доставки:", "пъти", "Следващата доставка тръгва в:", "беше добавен.", "тръгна.", "няма достатъчно търговци.", "грешка при транспорта.", "Настройте по-късно", "Жито: ", "Автотърговията завърши.", "Автотърговията се провали.", "Ресурси:", "Дърво", "Глина", "Желязо", "Жито", "Разпределени по равно", "Разпределени по модел:", "ВНИМАНИЕ: Смяната на градът-доставчик не се препоръчва.", "Въведи 0 (нула) ако пращаш по равно дърво, глина и желязо. Ако не, въведи количество.", "Това е сървърното време.", "Това е твоето локално време.","Започни търговията в зададеното време"];
		aLangUpdate = ["Твоята версия е по-нова от тази: ", "Твоята версия е последната: ", "Има по-нова версия", "Искаш ли по-нова версия? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

	case "br":  //by getuliojr
		aLangBuildings = ["", "Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "Serraria", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de torneios", "Edifício principal", "Ponto de reunião militar", "Mercado", "Embaixada", "Quartel", "Cavalaria", "Oficina", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Tesouraria", "Companhia do Comércio", "Grande Quartel", "Grande Cavalaria", "Muralha", "Muro de Terra", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas", "Mansão do Herói", "Grande Armazém", "Grande Celeiro", "Maravilha do Mundo"];
		aLangTasks = ["Construir", "Melhorar", "Atacar", "Desenvolver", "Treinar", "Party"];
		aLangStrings = ["Construir Mais Tarde", "Melhorar Mais Tarde", "Atacar Mais Tarde", "Desenvolver Mais Tarde", "Programar esta tarefa para mais tarde.", "Começamos a construir ", " foi tentada a tarefa mas com resultado desconhecido.", "nível", " não pode ser construído.", " não pode ser melhorado.", "A tarefa foi programada.", "Em construção:", "Não conseguimos programar esta tarefa agora.", "Este agendamento não está disponível!", "Tarefas Programadas", "Apagar", "Enviar Mais Tarde", "Não foram selecionadas tropas.", "As suas tropas foram enviadas para", "Não foi possível enviar as suas tropas para", "Reforços", "Ataque:normal", "Ataque:assalto", "As catapultas irão mirar em", "Aleatório", "em", "ou depois","segundos", "minutos", "horas", "dias","Espiar recursos e tropas", "Espiar defesas e tropas", "Ausente", "O ataque não pode ser programado pois nenhum destino foi escolhido.", "na localização no.", "Ordenar por:", "tipo ", "hora ", "alvo ", "opções ", "aldeia ","Histórico das Tarefas", "apagar histórico", "Começamos a pesquisar ", " não pode ser pesquisado.", "Melhorar mais tarde", "Espiar", "Treinar mais tarde", "tropas.", "Treinar", "Começamos a treinar ", " não pode ser treinado.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador"]; //Romans
		aLangTroops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador"]; //Teutons
		aLangTroops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador"];
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Mercadores", "De", "Para", "TransportBy", "Repetir a cada", "minutos", "segundos", "Tranportar (x) vezes:", "vezes", "Hora do próximo transporte:", "foi adicionado.", "foi iniciado.", "não possui mercadores suficientes.", "erro de transporte.", "Agendar depois de", "Cereal: ", "Troca automática realizada.", "Troca automática falhou.", "Recursos desejados:", "Madeira", "Barro", "Ferro", "Cereais", "Divisão igual", "Modelo de Divisão:", "AVISO: Trocar aldeia de origem não é recomendado.", "Deixe ZERO se você quiser uma divisão idêntica entre madeira, barro e ferro. Preencha os valores se quiser diferente.","Forçar troca na hora agendada (sem verificação de atraso)"];
		aLangUpdate = ["Sua versão é mais atual que a versão atual: ", "Sua versão é a mais nova: ", "Existe uma atualização disponivel", "Você quer atualizar agora? "];
		break;
		
	case "cl":  //Chilean - by Benjamin F.
		aLangBuildings = ["", "LeÅ„ador", "Barrera", "Mina de hierro", "Granja", "SerrerÃ­a", "Ladrillar", "FundiciÃ³n de hierro", "Molino", "PanaderÃ­a", "AlmacÃ©n", "Granero", "HerrerÃ­a", "ArmerÃ­a", "Plaza de torneos", "Edificio Principal", "Plaza de reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Centro CÃ­vico", "Residencia", "Palacio", "Tesoro", "Oficina comercio", "Gran Cuartel", "Gran Establo", "Muralla", "TerraplÃ©n", "Empalizada", "MansiÃ³n del Arquitecto", "CervecerÃ­a", "Trampero", "Hogar del hÃ©roe", "Gran AlmacÃ©n", "Gran Granero", "Maravilla"];
		aLangTasks = ["Construir", "Mejorar", "Atacar", "Investigar", "Entrenar", "Party"];
		aLangStrings = ["Construir mÃ¡s tarde", "Ampliar mÃ¡s tarde", "Atacar mÃ¡s tarde", "Investigar mÃ¡s tarde", "Programar esta tarea para mÃ¡s tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "grado", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "ProducciÃ³n:", "No se puede programar esa tarea ahora.", "?La programaciÃ³n de tareas no estÃ¡ disponible!", "Tareas programadas", "Eliminar", "Enviar mÃ¡s tarde", "No se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzos", "Ataque: normal", "Ataque: asalto", "Catapultas atacarÃ¡n...", "aleatorio", "a", "o despuÃ©s", "segundos", "minutos", "horas", "dÃ­as", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "HÃ©roe"]; //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Emisario", "PaladÃ­n", "Caballero TeutÃ³n", "Ariete", "Catapulta", "Cabecilla", "Colono", "HÃ©roe"]; //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Batidor", "Trueno de Theutates", "Jinete Druida", "Jinete Eduo", "Ariete", "Catapulta de guerra", "Cacique", "Colono", "HÃ©roe"]; //Galos
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
	
	case "cn": //by Jacky-Q
		aLangBuildings = ["", "伐木场", "黏土矿", "铁矿场", "农场", "木材厂", "砖块厂", "铸造厂", "磨坊", "面包房", "仓库", "粮仓", "铁匠铺", "军械库", "竞技场", "中心大楼", "集结点", "市场", "大使馆", "兵营", "马厩", "工场", "研究所", "山洞", "市政厅", "行宫", "皇宮", "宝库", "交易所", "大兵营", "大马厩", "城墙", "土墙", "木墙", "石匠铺", "酿酒厂", "陷阱机", "英雄园", "大仓库", "大粮仓", "世界奇观"];
		aLangTasks = ["建筑", "升级", "攻击", "研发", "训练", "Party"];
		aLangStrings = ["预定建筑", "预定升级", "预定攻击", "预定研发", "将此事预定稍后进行.", "建筑开始了", " 已尝试但结果不明", "等级", " 不能建筑.", " 不能升级.", "此事项已预定稍后执行.", "目前生产", "我们暂时不能预定稍后执行.", "不能预定稍后执行!", "已预订稍后执行项目", "删除", "稍后送出", "攻击不能预定执行因为没有选择军队.","你的军队已送出", "你的军队不能送出", "支援", "攻击", "抢夺", "投石车会瞄准", "随机", "于", "或之后", "秒", "分", "时", "日", "侦察物资及军队", "侦察物资及防御","不在", "攻击无法预定执行,因为没有指定目的地.", "at site no.", "分类以:", "类型", "时间", "目标 ", "选项", "村庄", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["古罗马步兵", "禁卫兵", "帝国兵", "使节骑士", "帝国骑士", "将军骑士", "冲撞车", "火焰投石器", "参议员", "拓荒者", "英雄"]; //Romans
		aLangTroops[1] = ["棍棒兵", "矛兵", "斧头兵", "侦察兵", "圣骑士", "日耳曼骑兵", "冲撞车", "投石器", "执政官", "拓荒者", "英雄"]; //Teutons
		aLangTroops[2] = ["方阵兵", "剑士", "探路者", "雷法师", "德鲁伊骑兵", "海顿圣骑士", "冲撞车", "投石器", "首领", "拓荒者", "英雄"]; //Gauls
		aLangTransModel= ["混合模式", "只运粮食", "只运资源", "固定模式"];
		aLangStringt = ["新兵开发", "自动运输", "自动平仓", "商人", "从", "到", "运输方式", "往返用时", "分", "秒", "运输次数:", "次", "下次运输时间:", "已经设置完成！", "已经开始了！", "没有足够的商人！", "本次运输失败,资源不足或商人未回。", "不必平仓,重新计划延时", "粮食资源: ", "自动平仓成功！", "自动平仓失败！", "平仓目标:", "木", "泥", "铁", "粮", "木泥铁平均分配", "分配方案:", "注意：不要修改运输出发村。过度使用小心封号。", "保持为0表示平均分配，期望分配资源应该比实际的少。", "你正在使用服务器时间.", "你正在使用电脑本机时间.","预定时间强制平仓(无延时检测)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "cz":
		aLangBuildings = ["", "Dřevorubec", "Hliněný důl", "Železný důl", "Obilné pole", "Pila", "Cihelna", "Slévárna", "Mlýn", "Pekárna", "Sklad surovin", "Sýpka", "Kovárna", "Zbrojnice", "Turnajové hřiště", "Hlavní budova", "Shromaždiště", "Tržiště", "Ambasáda", "Kasárny", "Stáje", "Dílna", "Akademie", "Úkryt", "Radnice", "Rezidence", "Palác", "Pokladnice", "Obchodní kancelář", "Velké kasárny", "Velká stáj", "Městská zeď", "Zemní hráz", "Palisáda", "Kameník", "Pivovar", "Pasti", "Hrdinský dvůr", "Velký sklad", "Velká sýpka", "Div světa"];
		aLangTasks = ["Postavit", "Rozšířit", "Zaútočit na", "Vyzkoumat", "Trénovat", "Party"];
		aLangStrings = ["Postavit později", "Rozšířit později", "Zaútočit později", "Vyzkoumat později", "Naplánujte tuto akci na později.", "Začali jsme stavět ", " - výsledek je neznámý.", "úroveň", " se nedá postavit.", " se nedá rozšířit.", "Úloha byla naplánována.", "Aktuální produkce:", "Tuto akci momentálně není možné naplánovat.", "Momentálně není možné plánovat žádné akce!", "Naplánované akce", "Smazat", "Vyslat později", "Útok není možné naplánovat, protože nebyly vybrány žádné jednotky.", "Jednotky jsou na cestě do", "Nepodařilo se vyslat jednotky do", "Podpořit", "Zaútočit na", "Oloupit", "Katapulty zamířit na", "náhodně", "o", "anebo za", "sekund", "minut", "hodin", "dní", "Prozkoumat jednotky a suroviny", "Prozkoumat jednotky a obranné objekty", "pryč", "Útok není možné naplánovat, protože chybí cíl.", "na místě č.", "Třídit podle:", "druhu ", "času ", "cíle ", "možnosti ", "vesnice ", "Historie", "smazat historii", "Začli jsme vyvíjet ", " se nedá vynajít.", "Vylepšit později", "Vyšpehovat", "Vycvičit později", "jednotky.", "Vycvičit", "Začli jsme cvičit ", " se nedá vycvičit." , "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionář", "Pretorián", "Imperián", "Equites Legáti", "Equites Imperatoris", "Equites Caesaris", "Římanské beranidlo", "Ohnivý katapult", "Senátor", "Osadník"]; //Romans
		aLangTroops[1] = ["Pálkař", "Oštěpař", "Sekerník", "Zvěd", "Rytíř", "Teuton jezdec", "Germánské beranidlo", "Katapult", "Kmenový vůdce", "Osadník"]; //Teutons
		aLangTroops[2] = ["Falanx", "Šermíř", "Slídič", "Theutates Blesk", "Druid jezdec", "Haeduan", "Dřevěné beranidlo", "Válečný katapult", "Náčelník", "Osadník"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "de":  //by Metador
          	aLangBuildings = ["", "Holzfäller", "Lehmgrube", "Eisenmine", "Getreidefarm", "Sägewerk", "Lehmbrennerei", "Eisengießerei", "Getreidemühle", "Bäckerei", "Rohstofflager", "Kornspeicher", "Waffenschmiede", "Rüstungsschmiede", "Turnierplatz", "Hauptgebäude", "Versammlungsplatz", "Marktplatz", "Botschaft", "Kaserne", "Stall", "Werkstatt", "Akademie", "Versteck", "Rathaus", "Residenz", "Palast", "Schatzkammer", "Handelskontor", "Große Kaserne", "Großer Stall", "Stadtmauer", "Erdwall", "Palisade", "Steinmetz", "Brauerei", "Fallensteller", "Heldenhof", "Großes Rohstofflager", "Großer Kornspeicher", "Weltwunder"];
          	aLangTasks = ["Gebäude bauen", "Ausbau von", "Angriff", "Unterstützung", "verbessern", "Party"];
          	aLangStrings = ["Später bauen", "Später ausbauen", "Später angreifen", "Später unterstützen", "Führe den Auftrag später aus.", "Gebäudebau gestartet von ", " wurde versucht mit unbekannten Ergebnis.", "Stufe", " kann nicht gebaut werden.", " kann nicht ausgebaut werden.", "Der Auftrag wurde hinzugefügt.", "Produktion:", "Dieser Auftrag kann jetzt nicht Aufgegeben werden.", "Auftrag nicht verfügbar!", "Aufträge:", "Löschen", "Später senden", "Keine Truppen ausgewählt worden.", "Deine Truppen wurden geschickt zu", "Deine Truppen konnten nicht geschickt werden zu", "Unterstützung", "Angriff: Normal", "Angriff: Raubzug", "Die Katapulte zielen auf", "Zufall", "um", "oder nach", "Sekunden", "Minuten", "Stunden", "Tage", "Rohstoffe und Truppen ausspähen", "Verteidigungsanlagen und Truppen ausspähen", "weg", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Party Later", " but not today.", "We started to "];
          	aLangTroops[0] = ["Legionär", "Prätorianer", "Imperianer", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Rammbock", "Feuerkatapult", "Senator", "Siedler", "Held"];  //Romans
          	aLangTroops[1] = ["Knüppler", "Speerkämpfer", "Axtkämpfer", "Kundschafter", "Paladin", "Teutonen Reiter", "Ramme", "Katapult", "Stammesführer", "Siedler", "Held"];  //Teutons
          	aLangTroops[2] = ["Phalanx", "Schwertkämpfer", "Späher", "Theutates Blitz", "Druidenreiter", "Haeduaner", "Rammholz", "Kriegskatapult", "Häuptling", "Siedler", "Held"];  //Gauls
          	aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
          	aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
          	aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
          	aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
          	break;
		
	case "dk":  //by Polle1
		aLangBuildings = ["", "Skovhugger", "Lergrav", "Jernmine", "Kornavler", "SavvÃ¦rk", "LerbrÃ¦nderi", "JernstÃ¸beri", "KornmÃ¸lle", "Bageri", "RÃ¥stoflager", "kornkammer", "Rustningssmedje", "vÃ¥bensmedje", "Turneringsplads", "Hovedbygning", "Forsamlingsplads", "Markedsplads", "Ambassade", "Kaserne", "Stald", "VÃ¦rksted", "Akademi", "Gemmested", "RÃ¥dhus", "Residens", "Palads", "Skatkammer", "Handelskontor", "Stor Kaserne", "Stor Stald", "Bymur", "Jordvold", "Palisade", "Stenhugger", "Bryggeri", "FÃ¦ldebygger", "Heltebygning", "Stort RÃ¥stoflager", "Stort Kornkammer", "Verdensunder"];
		aLangTasks = ["Byg", "Viderebyg", "Angrib", "Udforsk", "Uddan", "Party"];
		aLangStrings = ["Byg senere", "Viderebyg senere", "Angrib senere", "Udforsk senere", "PlanlÃ¦g denne opgave til senere.", "Vi har startet byggeriet", " Blev forsÃ¸gt med ukendt resultat.", "Trin", " kan ikke bygges.", " kan ikke viderebygges.", "Opgaven blev planlagt til senere.", "NuvÃ¦rende produktion:", "Vi kan ikke planlÃ¦gge denne opgave lige nu.", "OpgaveplanlÃ¦gning er ikke tilgÃ¦ngelig!", "Planlagte opgaver", "Slet", "Send senere", "Der ikke er tropper tilgÃ¦ngelig.",  "Dine tropper blev sendt til", "Dine tropper kunne ikke sendes til", "Opbakning", "Angrib", "Plyndringstogt", "Katapulterne skyder mod", "tilfÃ¦ldigt", "mod", "eller om", "sekunder", "minutter", "timer", "dage", "Efterforsk rÃ¥stoffer og tropper", "Efterforsk forsvarsanlÃ¦g og tropper", "vÃ¦k", "Angrebet kan ikke planlÃ¦gges pga. mangel pÃ¥ mÃ¥l.", "pÃ¥ sted nr.", "Sorter efter:", "type ", "tid ", "mÃ¥l", "valg ", "landsby ", "Opgave-historik", "slet historik", "vi startede udforskning ", " kan ikke udforskes.", "Forbedr senere", "Spion", "Uddan senere", "tropper.", "Uddan", "vi startede uddannelse", " kan ikke uddannes.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["LegionÃ¦r", "PrÃ¦torianer", "Imperianer", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Rambuk", "Brandkatapult", "Senator", "BosÃ¦tter", "Helt"];  //Romans
		aLangTroops[1] = ["KÃ¸llesvinger", "SpydkÃ¦mper", "Ã˜ksekÃ¦mper", "Spejder", "Paladin", "Teutonrytter", "Rambuk", "Katapult", "StammefÃ¸rer", "BosÃ¦tter", "Helt"];  //Teutons
		aLangTroops[2] = ["Falanks", "SvÃ¦rdkÃ¦mper", "Spion", "Theutaterlyn", "Druiderytter", "Haeduaner", "RambuktrÃ¦", "Krigskatapult", "HÃ¸vding", "BosÃ¦ter", "Helt"];  //Gauls
		aLangTransModel= ["Mixed Model", "Kun korn", "Kun rÃ¥stoffer", "Fixed Model"];
		aLangStringt   = ["Send tropper hjem", "Auto Transport", "AutoHandel", "HandelsmÃ¦nd", "fra", "til", "Transport af", "tid fÃ¸r gentagelse", "minuter", "sekunder", "Rejsetid:", "gange", "Tid for nÃ¦ste Transport:", "er blevet tilfÃ¸jet.", "blev sendt.", "Der er ikke nok handelsmÃ¦nd.", "transport fejl.", "Schedule later after", "Kornavler: ", "Autohandel er fortaget.", "Autohandel fejlede.", "valgte rÃ¥stoffer:", "TrÃ¦", "Ler", "Jern", "Korn", "Del lige", "Delenings Model:", "ADVARSEL: skift af afsendelsesby er ikke anbefalet.", " Skriv ikke hvis du Ã¸nsker at dele lige over mellem rÃ¥stoffer .", "Det er server tiden.", "Dette er tiden pÃ¥ din pc.","Fremtving handel til planlagt tid (no delay check)"];
		aLangUpdate = ["Din version er stÃ¸rre: ", "Din nuvÃ¦rende version er up to date: ", "Der er en opdatering klar", "Ã˜nsker du at opdatere nu? "];
                aLangMenuOptions = ["Travian ", "Brug server tid", "brug pc tid", "Indstil dit folkeslag", "Opgave historie", "Tjek for opdateringer", "\nHvor mange opgaver skal vi vise i opgavehistorie?\n(Tast 0 hvis du ikke Ã¸nske opgavehistorie.) \nNuvÃ¦rende: ", "\nHvilket folkeslag er du pÃ¥ denne server?\n(Tast 0 for Romer, 1 for Germaner, 2 for Galler.) \nNuvÃ¦rende: "];
		break;
	
	case "ee": //by hit^
		aLangBuildings = ["", "Puuraidur", "Savikarjäär", "Rauakaevandus", "Viljapõld", "Saekaater", "Telliskivitehas", "Rauatöökoda", "Veski", "Pagar", "Ladu", "Viljaait", "Sepikoda", "Rüü sepp", "Staadion", "Peamaja", "Kogunemispunkt", "Turg", "Saatkond", "Kasarmud", "Tall", "Töökoda", "Akadeemia", "Peidik", "Raekoda", "Residents", "Palee", "Varakamber", "Kaubanduskoda", "Suured kasarmud", "Suur tall", "Kivimüür", "Muldvall", "Teivasaed", "Kivitöökoda", "Pruulikoda", "Püünisemeister", "Kindlus", "Suur ladu", "Suur viljaait", "Maailma Ime", "Varakamber", "Hobuste joogikoht"];
		aLangTasks = ["Ehita", "Täiusta", "Ründa", "Arenda", "Treeni", "Party"];
		aLangStrings = ["Ehita hiljem", "Täiusta hiljem", "Ründa hiljem", "Arenda hiljem", "Täida ülesanne hiljem.", "Alustasime ehitamist: ", " üritati teadmata tulemusega.", "tase", " ei saa ehitada.", " ei saa täiustada.", "Ülesanne seatud.", "Tootmine:", "Ülesannet ei saa hetkel ajastada.", "Ülesannete ajastamine pole saadaval!", "Ajastatud ülesanded", "Kustuta", "Saada hiljem", "Ühtegi sõdurit pole valitud.", "Sõdurid saadeti külasse", "Sõdureid ei saa saata külasse", "Tugi", "Ründa", "Rüüsta", "Katapultide sihtmärk", "juhuslik", "kell", "või peale", "sekundit", "minutit", "tundi", "päeva", "Luura ressursse ja sõdureid", "Luura sõdureid ja kaitset", "eemal", "Sihtpunkt pole määratud.", "at site no.", "Sorteeri:", "tüüp ", "aeg ", "sihtmärk ", "valikud ", "küla ", "Alalugu", "puhasta ajalugu", "Alustasime arendamist ", " ei saa arendada.", "Täiusta hiljem", "Luura", "Treeni hiljem", "sõjavägi.", "Treeni", "Alustasime treenimist: ", " ei saa treenida.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Leegionär", "Praetoorian", "Impeerian", "Skaut-ratsanik", "Imperaatori ratsanik", "Caesari ratsanik", "Müürilõhkuja", "Katapult", "Senaator", "Asunik", "Väejuht"]; //Roomlased
		aLangTroops[1] = ["Nuiamees", "Odamees", "Kirvemees", "Maakuulaja", "Paladiin", "Teutooni rüütel", "Taraan", "Katapult", "Pealik", "Asunik", "Väejuht"]; //Teutoonid
		aLangTroops[2] = ["Faalanks", "Mõõgamees", "Rajaleidja", "Theutaatese pikne", "Druiid-ratsanik", "Aeduaan", "Taraan", "Katapult", "Ülemkelt", "Asunik", "Väejuht"]; //Keldid
		aLangTransModel = ["Segamudel", "Ainult toit", "Ainult varud", "Püsimudel"];
		aLangStringt = ["Tagasi koju", "AutoTransport", "AutoKauplemine", "Kaupmehed", "Kust:", "Kuhu:", "Transportöör", "Kordusaeg", "minutit", "sekundit", "Transpordiajad:", "ajad", "Järgmise transpordi aeg:", "on lisatud.", "on alustatud.", "pole piisavalt kaupmehi.", "transpordi viga.", "Ajasta hiljem pärast", "Viljavarud: ", "Kauplemine lõpetatud.", "Kauplemine ebaõnnestus.", "Sihtvarud:", "Puit", "Savi", "Raud", "Vili", "Jagamine võrdne", "Jagamismudel:", "HOIATUS: Allikküla muutmine ei ole soovitatav.", "Hoia NULLIS, kui soovid võrdset kogust puitu, savi, rauda ja vilja. Muul juhul täida number.", "See on serveri aeg.", "See on sinu kohalik aeg.","Sunnitud kauplemine määratud ajal (viivitust ei vaadata)"];
		aLangUpdate = ["Sinu versioon on uuem, kui praegune: ", "Uuendusi pole saadaval: ", "Uuendus on saadaval", "Uuenda kohe? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

	case "fi":  // Ei vielä valmis, auttakaas !
		aLangBuildings = ["", "Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto", "Sahaamo", "Kivenhakkaaja", "Rautavalimo", "Viljamylly", "Leipomo", "Varasto", "Viljasiilo", "Aseseppä", "Haarniskapaja", "Turnausareena", "Päärakennus", "Kokoontumispiste", "Marketti", "Lähetystö", "Kasarmi", "Hevostalli", "Työpaja", "Akatemia", "Kätkö", "Kaupungin talo", "Virka-asunto", "Palatsi", "Aarrekammio", "Kauppamaja", "Suuri Kasarmi", "Suuri Hevostalli", "Kaupungin muuri", "Maamuuri", "Paaluaita", "Kivenhakkaaja", "Olut panimo", "Ansoittaja", "Sankarin kartano", "Suuri varasto", "Suuri viljasiilo", "Maailmanihme"];
		aLangTasks = ["Rakenna", "Päivitä", "Hyökkää", "Tiedustele", "Kouluta", "Party"];
		aLangStrings = ["Rakenna myöhemmin", "Päivitä myöhemmin", "Hyökkää myöhemmin", "Tiedustele myöhemmin", "Lisää rakennusjonoon", "Rakenna ", " ei tuloksia.", "taso", " ei voida rakentaa.", " ei voida päivittää.", "Tehtävä lisätty rakennusjonoon.", "Nykyinen tuotanto:", "Ei voida lisätä rakennusjonoon juuri nyt.", "Lisäys ei ole saatavilla!", "Tehtävät rakennusjonossa", "Poista", "Lähetä myöhemmin", "Hyökkäystä ei voitu lisätä jonoon, koska yhtään joukkoja ei ole valittu.", "Joukkosi on lähetetty ", "Joukkojasi ei voida lähettää ", "Ylläpito", "Hyökkäys: Normaali", "Hyökkäys: Ryöstö", "Katapulttien kohde", "satunnainen", "nyt", "tai myöhemmin", "sekuntit", "minuutit", "tunnit", "päivät", "Tiedustele resursseja ja joukkoja", "Tiedustele joukkoja ja puollustuksia","poissa", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Järjestä:", "tyyppi ", "aika ", "kohde ", "asetukset ", "kylä ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legioonalainen", "Pretoriaani", "Imperiaani", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Muurinmurtaja", "Tulikatapultti", "Senaattori", "Uudisasukas", "Sankari"];  //Romans
		aLangTroops[1] = ["Nuijamies", "Keihäsmies", "Kirvessoturi", "Tiedustelija", "Palaadiini", "Teutoniritari", "Muurinmurtaja", "Katapultti", "Päällikkö", "Uudisasukas", "Sankari"];  //Teutons
		aLangTroops[2] = ["Falangi", "Miekkasoturi", "Tunnustelija", "Teutateksen salama", "Druidiratsastaja", "Haeduaani", "Muurinmurtaja", "Heittokone", "Päällikkö", "Uudisasukas", "Sankari"];  //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minuutit", "sekunnit", "TransportTimes:", "kertaa", "The Time Of Next Transport:", "on lisätty.", "on aloitettu.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Automaattivaihto onnistui.", "Automaattivaihto epäonnistui.", "Target Resource:", "Puu", "Savi", "Rauta", "Vilja", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Sinulla on nykyistä uudempi versio: ", "Versiosi on ajantasalla: ", "Päivitys on saatavilla", "Haluatko päivittää nyt? "];
		aLangMenuOptions = ["Travian ", "Käytä palvelimen aikaa", "Käytä paikallista aikaa", "Aseta heimo", "Tehtävähistoria", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nMinkä heimon valitsit tälle serverille?\n(Vastaa 0 Roomalaiset, 1 Teutonit, 2 Gallialaiset.) \nNykyinen: "];
		break;

	case "fr":
		aLangBuildings = ["", "Bûcherons", "Carrière de terre", "Mine de fer", "Ferme", "Scierie", "Usine de poteries", "Fonderie", "Moulin", "Boulangerie", "Dépôt de ressources", "Silo de céréales", "Armurerie", "Usine d'armures", "Place du tournoi", "Bâtiment principal", "Place de rassemblement", "Place du Marché", "Ambassade", "Caserne", "Ecurie", "Atelier", "Académie", "Cachette", "Hôtel de ville", "Résidence", "Palais", "Chambre aux trésors", "Comptoir de commerce", "Grande caserne", "Grande écurie", "Mur d'enceinte", "Mur de terre", "Palissade", "Tailleur de pierre", "Brasserie", "Fabricant de pièges", "Manoir du héros", "Grand dépôt", "Grand silo", "Merveille du monde"];
		aLangTasks = ["Construire le bâtiment", "Augmenter au", "Attack", "Research", "Train", "Party"];
		aLangStrings = ["Construire plus tard", "Améliorer plus tard", "Attaquer plus tard", "Rechercher plus tard", "Programmer cette tâche pour plus tard.", "Construction commencée ", " a été tenté sans résultats.", "niveau", " ne peut être construit.", " ne peut être amélioré.", "La tâche a été programmée.", "Production courante:", "Cette tâche ne peut être programmée actuellement.", "La programmation de tâches n'est pas disponible!", "Tâches programmées", "Supprimer", "Envoyer plus tard", "L'attaque ne peut pas être programmée car aucune troupe n'a été sélectionnée.", "Vos troupes ont été envoyées à ", "Vos troupes n'ont pas pu être envoyées à ", "Assistance", "Attaque: Normal", "Attaque: pillage", "Les catapultes ont pour cible", "aléatoire", "sur", "ou après", "secondes", "minutes", "heures", "jours", "Espionner troupes et ressources", "Espionner troupes et défenses", "ailleurs", "L'attaque ne peut être programmée car aucune destination n'a été spécifiée.", "au site no.", "Trier par:", "type ", "durée ", "cible ", "options ", "village ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Légionnaire", "Prétorien", "Impérian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Bélier", "Catapule de feut", "Sénateur", "Colon", "Heros"]; //Romans
		aLangTroops[1] = ["Combattant au gourdin", "Combattant à  la lance", "Combattant à  la hache", "Eclaireur", "Paladin", "Cavalier teuton", "Bélier", "Catapulte", "Chef de tribu", "Colon", "Heros"]; //Teutons
		aLangTroops[2] = ["Phalange", "Combattant à  l'épée", "Eclaireur", "Eclair de Toutatis", "Cavalier druide", "Hédouin", "Bélier", "Catapulte de guerre", "Chef", "Colon", "Heros"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "gr": //original by askgdb (fixed by tsekouri_gr)
		aLangBuildings = ["", "Ξυλοκόπος", "Ορυχείο πηλού", "Ορυχείο σιδήρου", "Αγρόκτημα σιταριού", "Πριονιστήριο", "Φούρνος πηλού", "Χυτήριο σιδήρου", "Μύλος σιταριού", "Φούρνος", "Αποθήκη πρώτων υλών", "Σιταποθήκη", "Οπλοποιείο", "Πανοπλοποιείο", "Χώρος αθλημάτων", "Κεντρικό κτήριο", "Πλατεία συγκεντρώσεως", "Αγορά", "Πρεσβεία", "Στρατόπεδο", "Στάβλος", "Εργαστήριο", "Ακαδημία", "Κρυψώνα", "Δημαρχείο", "Μἐγαρο", "Παλάτι", "Θησαυροφυλάκιο", "Εμπορικό γραφείο", "Μεγάλο στρατόπεδο", "Μεγάλος στάβλος", "Τείχος", "Πηλινο τεἰχος", "Τείχος με πάσαλους", "Λιθοδόμος", "Ζυθοποιίο", "Άτομο που στήνει παγίδες", "Περιοχή ηρώων", "Μεγάλη αποθήκη", "Μεγάλη σιταποθήκη", "Παγκόσμιο θαύμα"];
		aLangTasks = ["Κατασκευή", "Αναβάθμιση", "Επίθεση", "Έρευνα", "Εκπαίδευση","Αποστολή Πρώτων Υλών", "Party"];
		aLangStrings = ["Κατασκευή Αργότερα", "Αναβάθμιση Αργότερα", "Επίθεση Αργότερα", "Έρευνα Αργότερα", "Πραγραμματισμός Εργασίας Για Αργότερα.", "Ξεκίνησε Κατασκευή", " Επιχειρηθείς Με Άγνωστο Αποτέλεσμα.", "Επίπεδο", " Δεν Μπορεί Να Κατασκευαστεί.", " Δεν Μπορεί Να Αναβαθμιστεί.", "Η Εργασία Πραγραμματίστηκε .", "Παραγωγή:", "Δεν Μπορεί Να Πραγραμματισθεί Αυτή Η Εργασία Τώρα.", "Ο Πραγραμματισμός Εργασίας Δεν Είναι Διαθέσιμος!", "Πραγραμματισμένες Εργασίες", "Διαγραφή", "Αποστολή Αργότερα", "Η Επίθεση Δεν Μπορεί Να Προγραμματισθεί Επειδή Δεν Επιλέχθηκαν Στρατιώτες.", "Οι Στρατιώτες Στάλθηκαν", "Οι Στρατιώτες Δεν Μπόρεσαν Να Σταλούν", "Ενίσχυσεις", "Επίθεση", "Εισβολή Αρπαγής", "Οι Καταπέλτες Θα Στοχέυσουν Σε", "Τυχαία", "Σε", "ή Μετά", "Δευτερόλεπτα", "Λεπτά", "Ώρες", "Μέρες", "Ανίχνευση Πρώτων Υλών Και Στρατευμάτων", "Ανίχνευση Οχύρωσης Και Στρατευμάτων", "Μακριά", "Η Επίθεση Δεν Μπορεί Να Προγραμματισθεί Επειδή Δεν Ορίστικαν Συντεταγμένες ή Όνομα Χωριού.", "Σε Θέση.", "Ταξινόμηση Κατά:", "Τύπο ", "Χρόνο ", "Στόχο ", "Επιλογές ", "Χωριό ","Ιστορικό Εργασιών", "Καθαρισμός Ιστορικού", "Ξεκίνησε η έρευνα ", " δεν μπορεί να ερευνηθεί.", "Βελτίωσε αργότερα", "Ανίχνευσε", "Εκπαίδευσε αργότερα", "μονάδες.", "Εκπαίδευσε", "Ξεκίνησε η εκπαίδευση ", " δεν μπορούν να εκπαιδευτούν.", "ή επανέλαβε", "φορές ", "διαφέροντας κατά ", "Καθαρισμός λίστας εργασιών ", "Έχουν αποσταλεί", "Πρόσθεσε αυτήν την εργασία στη λίστα", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Λεγεωνάριος", "Πραιτωριανός", "Ιμπεριανός", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Πολιορκητικός Κριός", "Καταπέλτης Φωτιάς", "Γερουσιαστής", "Άποικος", "Ήρωας"]; //Ρωμαίοι
		aLangTroops[1] = ["Μαχητής Με Ρόπαλο", "Μαχητής Με Ακόντιο", "Μαχητής Με Τσεκούρι", "Ανιχνευτής", "Παλατινός", "Τεύτονας Ιππότης", "Πολιορκητικός Κριός", "Καταπέλτης", "Φύλαρχος", "Άποικος", "Ήρωας"]; //Τεύτονες
		aLangTroops[2] = ["Φάλανξ", "Μαχητής Με Ξίφος", "Ανιχνευτής", "Αστραπή Του Τουτατή", "Δρουίδης", "Ιδουανός", "Πολιορκητικός Κριός", "Πολεμικός Καταπέλτης", "Αρχηγός", "Άποικος", "Ήρωας"]; //Γαλάτες
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "hk":  //by TedTed
		aLangBuildings = ["", "伐木場", "泥坑", "鐵礦場", "農場", "鋸木廠", "磚廠", "鋼鐵鑄造廠", "麵粉廠", "麵包店", "倉庫", "穀倉", "鐵匠", "盔甲廠", "競技場", "村莊大樓", "集結點", "市場", "大使館", "兵營", "馬棚", "工場", "研究院", "山洞", "城鎮廳", "行宮", "皇宮", "寶物庫", "交易所", "大兵營", "大馬棚", "城牆", "土牆", "木牆", "石匠鋪", "釀酒廠", "陷阱機", "英雄宅", "大倉庫", "大穀倉", "世界奇觀", "寶物庫", "放牧水槽"];
		aLangTasks = ["建築", "升級", "攻擊", "研發", "訓練", "Party"];
		aLangStrings = ["預定建築", "預定升級", "預定攻擊", "預定研發", "將此事項預定稍後執行.", "建築開始了 ", " 已嘗試但結果不明.", "等級", " 不能建築.", " 不能升級.", "此事項已預定稍後執行.", "目前生產:", "我們暫時不能預定稍後執行.", "不能預定稍後執行!", "已預定稍後執行項目", "删除", "稍後送出", "攻擊不能預定執行因為沒有選擇軍隊.","你的軍隊已送去", "你的軍隊不能送去", "支援", "攻擊", "搶奪", "投石車會瞄準", "隨機", "於", "或之後", "秒", "分", "時", "日", "偵察物資及軍隊", "偵察物資及防禦","不在", "攻擊無法預定執行,因為沒有指定目的地.", "at site no.", "分類以:", "類型", "時間", "目標 ", "選項", "村莊", "任務紀錄", "清除紀錄", "開始研發", "無法研發", "預定升級", "偵查", "預定訓練", "軍隊", "訓練", "開始訓練", "無法訓練", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["古羅馬步兵", "禁衛兵", "帝國兵", "使者騎士", "帝國騎士", "將軍騎士", "衝撞車", "火焰投石機", "參議員", "開拓者", "英雄"]; //Romans
		aLangTroops[1] = ["棍棒兵", "矛兵", "斧頭兵", "偵察兵", "俠客", "條頓騎士", "衝撞車", "投石車", "司令官", "開拓者", "英雄"]; //Teutons
		aLangTroops[2] = ["方陣兵", "劍士", "探路者", "雷法師", "德魯伊騎兵", "海頓聖騎", "衝撞車", "投石車", "族長", "開拓者", "英雄"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "hr":  //by Damir B.
		aLangBuildings = ["", "Drvosječa", "Glinokop", "Rudnik željeza", "Farma", "Pilana", "Ciglana", "Ljevaonica željeza", "Žitni mlin", "Pekara", "Skladište", "Žitnica", "Kovačnica", "Oružarnica", "Arena", "Glavna zgrada", "Okupljalište", "Tržnica", "Veleposlanstvo", "Vojarna", "Konjušnica", "Radionica", "Akademija", "Skrovište resursa", "Gradska vijećnica", "Rezidencija", "Dvorac", "Treasury", "Ured za trgovinu", "Velika vojarna", "Velika konjušnica", "Zidine grada", "Zemljani zid", "Drveni zid", "Klesar", "Brewery", "Zamka", "Dvorac Heroja", "Veliko skladište", "Velika žitnica", "Svjetsko čudo"];
		aLangTasks = ["Izgradi", "Nadogradi", "Napad", "Istraži", "Treniraj", "Party"];
		aLangStrings = ["Gradi poslije", "Nadogradi poslije", "Napadni poslije", "Istraži poslije", "Isplaniraj ovaj zadatak za poslije.", "Počela je gradnja ", " pokušano je s nepoznatim rezultatom.", "razina", " ne može biti izgrađeno.", " ne može se nadograditi.", "Isplaniran je zadatak.", "Aktualna produkcija:", "Ne može se isplanirati ovaj zadatak sada.", "Planirani zadatak nije dostupan!", "Planirani zadaci", "izbriši", "Pošalji poslije", "Trupe nisu odabrane.", "Vaša vojska je poslana na", "Vaša vojska ne može biti poslana na", "Podrška", "Napad", "Pljačka", "Katapulti će rušiti", "slučajno", "u", "ili nakon", "sekundi", "minuta", "sati", "dana", "Špijuniraj resourse i trupe", "Špijuniraj trupe i odbranu", "odsutan", "Napad ne može biti isplaniran jer destinacija nije određena.", "na stranici br.", "Sortiraj po:", "tip ", "vrijeme ", "meta ", "opcije ", "selo ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionar", "Preatorijan", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ovan za probijanje", "Vatreni katapult", "Senator", "Naseljenik", "Heroj"]; //Romans
		aLangTroops[1] = ["Gorštak", "Kopljanik", "Borac sa sjekirom", "Izvidnik", "Paladin", "Teutonski vitez", "Ovan za probijanje", "Katapult", "Poglavica", "Naseljenik", "Heroj"]; //Teutons
		aLangTroops[2] = ["Falanga", "Mačevalac", "Tragač", "Theutatesov grom", "Druid jahač", "Haeduan", "Ovan za probijanje", "Trebuše", "Starješina", "Naseljenik", "Heroj"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "hu": //by [TAJM]Kobra,
		aLangBuildings = ["", "Favágó", "Agyagbánya", "Vasércbánya", "Búzafarm", "Fürész üzem", "Agyagégető", "Vasöntöde", "Malom", "Pékség", "Raktár", "Magtár", "Fegyverkovács", "Páncélkovács", "Gyakorlótér", "Főépület", "Gyülekezőtér", "Piac", "Követség", "Kaszárnya", "Istálló", "Műhely", "Akadémia", "Rejtekhely", "Tanácsháza", "Rezidencia", "Palota", "Kincstár", "Kereskedelmi központ", "Nagy Kaszárnya", "Nagy Istálló", "Kőfal", "Földfal", "Cölöpfal", "Kőfaragó", " Sörfőzde", "Csapdakészítő", "Hősök háza", "Nagy Raktár", "Nagy Magtár", "Világcsoda"];
		aLangTasks = ["Építés", "Szintemelés", "Támadás", "Fejlesztés", "Kiképzés", "Party"];
		aLangStrings = ["Építés később", "Szintemelés később", "Támadás később", " Fejlesztés később", "A művelet időzítve későbbre.", "Az építés elkezdődött ", " Megpróbáltam ismeretlen eredménnyel.", "szint", "nem épülhet meg.", " nem lehet szintetemelni.", "Időzítésre került feladat:", " Jelenlegi termelés:", "Jelenleg nem időzíthető", "A feladat időzítés nem elérhető!", "Időzített feladatok:", "Törlés", "Küldés később", "A támadás nem időzíthető! Nem lettek egységek kiválasztva.", "Az egységeid elküldve", "Az egységek elküldése nem sikerült, ide:", "Támogatás", "Normál támadás", "Rablótámadás", "A katapult(ok) célpontja", "véletlenszerű", "Ekkor:", "vagy késleltetve", "másodperccel", "perccel", "órával", "nappal", "Nyersanyagok és egységek kikémlelése", "Egységek és épületek kikémlelése", "távol", "A támadás nem időzíthető! Nem lett végcél kiválasztva.", "a következő azonisítóval rendelkező helyen:", "Rendezés:", "típus ", "idő ", "célpont ", "beállítások ", "falu ", "History", "előzmények törlése", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Légiós", "Testőr", "Birodalmi", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Faltörő kos", "Tűzkatapult", "Szenátor", "Telepes"]; //Római
		aLangTroops[1] = ["Buzogányos", "Lándzsás", "Csatabárdos", "Felderítő", "Paladin", "Teuton lovag", "Faltörő kos", "Katapult", "Törzsi vezető", "Telepes"]; //Germán
		aLangTroops[2] = ["Phalanx", "Kardos", "Felderítő", "Theutat villám", "Druida lovas", "Haeduan", "Falromboló", "Harci-katapult", "Főnök", "Telepes"]; //Gall
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
	
	case "id":  //by Wiewie Liu
		aLangBuildings = ["", "Penebangan Kayu", "Penggalian Tanah Liat", "Tambang Besi", "Ladang", "Pemotong Kayu", "Pabrik Bata", "Pelebur Besi", "Penggilingan Gandum", "Toko Roti", "Gudang", "Lumbung", "Tukang Besi", "Gudang Senjata", "Pusat Kebugaran", "Bangunan Utama", "Titik Temu", "Pasar", "Kedutaan", "Barak", "Istal", "Bengkel", "Akademi", "Cranny", "Balai Desa", "Kastil", "Istana", "Gudang Ilmu", "Kantor Dagang", "Barak Besar", "Istal Besar", "Pagar Kota", "Pagar Tanah", "Pagar Kayu", "Tukang Batu", "Pabrik Minuman", "Ahli Perangkap", "Padepokan", "Gudang Besar", "Lumbung Besar", "Kejaiban Dunia"];
		aLangTasks = ["Bangun", "Upgrade", "Serang", "Research", "Train", "Party"];
		aLangStrings = ["Bangun nanti", "Upgrade nanti", "Serang nanti", "Research nanti", "Atur tugas ini untuk nanti.", "Kita mulai bangun ", " telah dicoba dengan hasil tak diketahui.", "tingkat", " tidak bisa dibangun.", " tidak bisa diupgrade.", "Tugas sudah dischedule.", "Kapasitas Produksi:", "Kita tidak bisa schedule tugas saat ini.", "Jadwal tugas tidak tersedia!", "Jadwal Tugas", "Hapus", "Kirim nanti", "Tidak ada prajurit yang dipilih.", "Prajurit terkirim ke", "Prajurit anda tidak bisa dikirim ke", "Bantuan", "Serangan", "Raid", "Catapults akan menyerang", "random", "pada", "atau setelah", "detik", "menit", "jam", "hari", "Mata-mata untuk sumber daya dan pasukan", "Mata-mata untuk pasukan dan pertahanan", "pergi", "Serangan tidak bisa dischedule karena tidak ada tujuan", "di site no.", "Sort by:", "tipe ", "waktu ", "tujuan ", "pilihan ", "desa ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

	case "ir": //by nekooee
		aLangBuildings = ["", "هیزم شکن", "آجر سازی", "معدن آهن", "گندم زار", "چوب بری", "آجر پزی", "ذوب آهن", "آسیاب", "نانوایی", "انبار", "انبار غذا", "زره سازی", "اسلحه سازی", "میدان تمرین", "ساختمان اصلی", "اردوگاه", "بازار", "سفارت خانه", "سرباز خانه", "اصطبل", "کارگاه", "دارالفنون", "مخفیگاه", "تالار", "اقامتگاه", "قصر", "خزانه", "دفتر تجارت", "پادگان بزرگ", "اصطبل بزرگ", "دیوار شهر", "دیوار گلی", "پرچین", "سنگ تراشی", "آبجوسازی", "تله ساز", "عمارت قهرمان", "انبار بزرگ", "انبار غذای بزرگ", "عمارت جادو", "خزانه داری", "آبشخور اسب"];
		aLangTasks = ["بنا کردن", "ارتقاء دادن", "حمله کردن", "تحقیق کردن", "تربیت کردن", "Party"];
		aLangStrings = ["بعدا بنا کن", "بعدا ارتقاء بده", "بعدا حمله کن", "بعدا تحقیق کن", "زمان بندی وظیفه برای بعدا", "شروع کردیم به ساختن ", " تلاش نتیجه ای نداشت.", "سطح", " نمی توان بنا کرد.", " نمی توان ارتقاء داد.", "وظیفه زمان بندی شد.", "تولید فعلی:", "نمی توانیم این وظیفه را به درستی زمانبندی کنیم همکنون.", "زمانبندی وظیفه امکان پذیر نیست!", "وظایف زمانبندی شده", "حذف کردن", "بعدا بفرست", "لشکر انتخاب نشده.", "لشکر شما فرستاده شد به", "لشکر شما را نمی توان فرستاد به", "پشتیبانی", "حمله عادی", "غارت", "منجنیقها هدف گرفتند", "تصادفی", "به سوی", "یا بعد از", "ثانیه", "دقیقه", "ساعت", "روز", "شناسایی منابع و لشکریان", "شناسایی عوامل مدافع و لشکریان", "در راه", "حمله نمی تواند زمان بندی شود زیرا مقصد مشخص نشده است.", "زیر ساخت آماده نیست.", "دسته بندی با:", "مدل ", "زمان ", "هدف ", "تنظیمات ", "دهکده ", "تاریخچه وظایف", "پاک کردن تاریخچه", "تحقیق را آغاز کردیم ", " نمی توان تحقیق را آغاز کرد.", "بعدا اضافه کن", "جاسوسی", "بعدا تربیت کن", "لشکریان.", "تربیت کردن", "تربیت کردن را آغاز کردیم ", " نمی توان تربیت کرد.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["لژیونر", "محافظ", "شمشیر زن", "خبر چین", "شوالیه", "شوالیه سزار", "دژکوب", "منجنیق آتشین", "سناتور", "مهاجر", "قهرمان"];  //Romans
		aLangTroops[1] = ["گرزدار", "نیزه دار", "تبر زن", "جاسوس", "دلاور", "شوالیه توتن", "دژکوب", "منجنیق", "رئیس مهاجر", "مهاجر", "قهرمان"];  //Teutons
		aLangTroops[2] = ["سرباز پیاده", "شمشیر زن", "ردیاب", "رعد", "کاهن سواره", "شوالیه گول", "دژکوب", "منجنیق", "رئیس قبیله", "مهاجر", "قهرمان"];  //Gauls
		aLangTransModel= ["مدل ترکیبی", "فقط غذا", "فقط منابع", "مدل تنظیم شده"];
		aLangStringt   = ["سرباز خانه", "اتوماتیک فرستادن", "اتوماتیک داد و ستد کردن", "تاجران", "از", "به", "فرستادن بوسیله", "تکرار کن در زمان", "دقیقه", "ثانیه", "فرستادن در زمان:", "زمان", "زمان فرستادن بعدی:", "قبلا اضافه شده.", "قبلا شروع شده.", "کمبود تاجر.", "مشکل در فرستادن.", "زمان بندی پس از", "منبع غله: ", "داد و ستد اتوماتیک انجام شد.", "داد و ستد اتوماتیک انجام نشد.", "منبع هدف:", "چوب", "خشت", "آهن", "گندم", "مساوی تقسیم کردن", "تقسیم کردن با مدل:", "اخطار: تعویض منبع دهکده پیشنهاد نمی شود.", "اگر می خواهید به صورت مساوی تقسیم کنید بین چوب ، خشت و آهن صفر نگه دارید. در غیر اینصورت عدد بگذارید", "این زمان سرور است.", "این زمان محلی شما است.","مجبور کن به داد و ستد در زمان برنامه ریزی شده (بدون بررسی تاخیر)"];
		aLangUpdate = ["ورژن شما جدیدتر از ورژن فعلی است: ", "شما آخرین ورژن را در اختیار دارید: ", "به روز رسانی امکان پذیر است", "آیا شما می خواهید عملیات به روز رسانی الآن آغاز شود؟"];
               aLangMenuOptions = ["در صف قرار دادن وظایف در تراوین: ", "از ساعت سرور استفاده کند", "از ساعت محلی استفاده کند", "نژاد خود را مشخص کنید", "تاریخچه وظیفه", "چک کردن برای نسخه جدید", "\nچه تعداد وظیفه را در تاریخچه نگه دارد؟\n(اگر می خواهید تاریخچه غیر فعال باشد صفر را انتخاب کنید.) \nفعلی: ", "\nنژاد شما در این سرور چیست؟\n(برای رومن 0 برای توتن 1 و برای گول 2 را وارد کنید.) \nفعلی: "];
		break;

	case "it":  //by BLM
		aLangBuildings = ["", "Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano", "Falegnameria", "Fabbrica di Mattoni", "Fonderia", "Mulino", "Forno", "Magazzino", "Granaio", "Fabbro", "Armeria", "Arena", "Centro del villaggio", "Caserma", "Mercato", "Ambasciata", "Campo d'addestramento", "Scuderia", "Officina", "Accademia", "Deposito Segreto", "Municipio", "Residence", "Castello", "Camera del tesoro", "Ufficio Commerciale", "Grande Caserma", "Grande Scuderia", "Mura cittadine", "Murata in terra", "Palizzata", "Genio civile", "Birreria", "Esperto di trappole", "Circolo degli eroi", "Grande Magazzino", "Grande Granaio", "Meraviglia", "Stanza del tesoro", "Fonte Equestre"];
		aLangTasks = ["Costruisci", "Amplia", "Attacca", "Ricerca", "Addestra", "Invia Risorse", "Party"];
		aLangStrings = ["Costruisci piu' tardi", "Amplia piu' tardi", "Attacca piu' tardi", "Ricerca piu' tardi", "Programma questa attivita'.", "E' iniziata la costruzione di ", " e' stata tentata con risultato sconosciuto.", "livello", " non puo' essere costruito.", " non puo' essere ampliato.", "L'attivita' e' stata programmata.", "Produzione:", "Non e' possibile programmare questa attivita' adesso.", "Programmazione attivita' non disponibile!", "Attivita' Programmate", "Cancella", "Invia piu' tardi", "L'attacco non puo' essere programmato in quanto non sono state selezionate truppe.", "Truppe sono state inviate a", "Non e' stato possibile inviare le truppe a", "Rinforzo", "Attacco", "Raid", "Obbiettivo catapulte:", "a caso", "all'orario", "oppure dopo", "secondi", "minuti", "ore", "giorni", "Spiare truppe e risorse", "Spiare difese e truppe", "assente", "L'attacco non puo' essere programmato in quanto non e' stato specificato l'obbiettivo.", "alla posizione n.", "Ordina per:", "tipo ", "orario ", "obbiettivo ", "opzioni ", "villaggio", "Archivio Attivita'", "svuota archivio", "La ricerca è iniziata", " non può essere ricercato", "Migliora più tardi", "Spia", "Addestra più tardi", "truppe.", "Addestra", "L'Addestramamento è iniziato ", " non può essere addestrato.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperiano", "Legionario a cavallo", "Imperiano a cavallo", "Cavalleria romana", "Ariete da sfondamento", "Catapulta", "Senatore", "Decurione", "Eroe"];
		aLangTroops[1] = ["Combattente", "Lanciere", "Combattente con ascia", "Esploratore", "Paladino", "Cavalleria teutonica", "Ariete", "Catapulta", "Comandante", "Decurione", "Eroe"];
		aLangTroops[2] = ["Lanciere", "Combattente con spada", "Esploratore", "Cavalleria gallica", "Cavalleria di difesa", "Cavalleria avanzata", "Ariete", "Catapulta", "Capo tribu'", "Decurione", "Eroe"];		
		aLangTransModel= ["Modo Misto", "Solo Cibo", "Solo Risorse", "Modo Fisso"];
		aLangStringt = ["Recluta Casa", "Autotrasporta", "AutoCommercia", "Mercanti", "Da","A","Trasporta con","minuti", "secondi", "Tempo di Trasporto:","tempi", "Orario del prossimo trasporto", "E' stato aggiunto", "E' iniziato", "mercanti insufficienti","errore di trasporto","Programmare piÃ¹ tardi dopo","Risorsa Grano","Autotrasporto avviato","Autotrasporto fallito", "Obiettivo Risorse:","Legno","Argilla","Ferro","Taglia","Dividi Equamente","Modalità di suddivisione:","Attenzione: cambiare il villaggio di origine non è raccomandabile.","Inserisci ZERO se vuoi dividere equamente tra legno,argilla e ferro. Altrimenti indica il numero che desideri","Questo è il fuso orario del server","Questo è il tuo fuso orario","Forza il Commercio Nell'Orario Stabilito (non verificare un ritardo)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

	case "jp":  //by so-men & miyako
		aLangBuildings = ["", "木こり", "粘土採掘所", "鉄鉱山", "農耕地", "製材所", "レンガ製造所", "鋳造所", "製粉所", "パン工場", "倉庫", "穀倉", "鍛冶場", "防具工場", "闘技場", "本部", "集兵所", "市場", "大使館", "兵舎", "馬舎", "作業場", "学院", "隠し倉庫", "集会所", "官邸", "宮殿", "金庫", "貿易事務所", "大兵舎", "厩舎", "城壁", "土塁", "木柵", "石工", "醸造所", "わな師", "英雄の館", "大倉庫", "大穀倉", "ワンダー・オブ・ザ・ワールド"];
		aLangTasks = ["建築", "レベル上げ", "攻撃", "研究", "訓練","資源の転送", "Party"];
		aLangStrings = ["あとで建築する", "あとでレベルを上げる", "あとで攻撃する", "あとで研究する", "このタスクをスケジュールする", "建築を始めました： ", " は不明な結果により完了していません。", "レベル", " は建てられません。", " はレベルを上げられません。", "タスクに追加されました。", "現在の生産量", "このタスクは現在スケジュールできません。", "スケジュールは現在利用できません!", "タスク一覧", "削除", "あとで送る", "兵士が選択されていません。", "兵士が送られました： ", "兵士は送られませんでした： ", "援兵", "攻撃", "奇襲", "カタパルトの狙い： ", "ランダム", "時刻指定：", "もしくは時間指定：", "秒", "分", "時", "日", "資源と兵力を偵察", "資源と防衛力を偵察", "away", "目的地が特定できなかったので、攻撃はスケジュールできませんでした。", "サイトNo.", "ソート:", "タイプ ", "時間 ", "ターゲット ", "options ", "村 ", "タスク履歴", "履歴をクリア", "研究を開始しました： ", " は研究できません。","あとで改良", "偵察", "あとで訓練", "兵士", "訓練", "訓練を開始しました： ", " は訓練できません。","タスクを ","回繰り返す - ","間隔指定： ","タスクリストをクリア ","派遣しました","タスクを順番待ちに加える", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["レジョネア", "プレトリアン", "インペリアン", "エクイーツ・レガティ", "エクイーツ・インペラトリス", "エクイーツ・カエザリス", "バッテリング・ラム", "ファイヤ・カタパルト", "議員", "開拓者", "英雄"]; //Romans
		aLangTroops[1] = ["クラブスインガー", "スピアマン", "アックスマン", "スカウト", "パラディン", "チュートニック・ナイト", "ラム", "カタパルト", "元首", "開拓者", "英雄"]; //Teutons
		aLangTroops[2] = ["ファランクス", "ソードマン", "パスファインダー", "シューテイタス・サンダー", "ドルイドライダー", "ヘジュアン", "ラム", "トレブジェ", "首領", "開拓者", "英雄"]; //Gauls
		aLangTransModel= ["MixedModel", "穀物のみ", "資源のみ", "FixedModel"];
		aLangStringt = ["RecruitHome", "自動送付", "自動トレード", "商人", "", "から", "送付元", "繰り返し回数", "分", "秒", "送信時間:", "回数", "次に送付する時間:", "が追加されました。", "が開始されました。", "商人の数が足りません。", "送付エラー。", "あとでスケジュールする。", "穀物リソース: ", "自動送付完了。", "自動送付失敗。", "ターゲットリソース:", "木", "粘土", "鉄", "穀物", "Division Equal", "Division Model:", "Warning: 送付元の村を変更することは推奨されません。", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","スケジュールされた時間に強制トレード(delay checkなし)"];
		aLangUpdate = ["Your version is greater then current version: ", "最新バージョンです: ", "次のバージョンにアップデート可能です。", "今すぐアップデートしますか？"];
		aLangMenuOptions = ["Travian ", "サーバ時間を使用する。：日本ならば、GMT標準時刻＋9時間を設定してください。", "PCの時計を使用する。", "種族の設定", "タスク履歴", "アップデートチェック", "\nタスク履歴はいくつまでリストに残しますか?\n(0に設定すると、タスク履歴は使用しません。) \n現在の設定値: ", "\nあなたの種族は?\n(ローマ：0, チュートン：1, ガウル：2) \n現在の設定値: "];
		break;
	
	case "kr": //by Kimmo
		aLangBuildings = ["", "벌목장", "점토 광산", "철광산", "농지", "제재소", "벽돌공장", "제련소", "제분소", "제과점", "창고", "곡물창고", "대장간", "병기고", "투기장", "주건물", "집결지", "장터", "대사관", "병영", "마구간", "공방", "연구소", "비밀창고", "마을 회관", "저택", "궁전", "보물창고", "교역사무소", "대병영", "대마구간", "성벽", "토벽", "목책", "석공소", "맥주공장", "함정", "영웅 저택", "대창고", "대곡물창고", "세계의 불가사의", "보물 보관실", "말 급수대"];
		aLangTasks = ["것물 짓기", "업그레이드", "공격", "연구", "훈련", "Party"];
		aLangStrings = ["건설 예약", "업그레이드 예약", "공격 예약", "연구 예약", "작업을 나중으로 예약.", "건설을 시작: ", " 은(는) 알 수 없는 결과를 가져오는 시도입니다.", "레벨", "을(를) 건설할수 없음.", "은(는) 업그레이드 할수 없음.", "작업이 예약되었습니다.", "현재 생산량:", "이 작업을 지금 시작 할 수 없습니다.", "예약된 작업이 불가능합니다!", "예정된 작업", "삭제", "보내기 예약", "선택된 병사가 없습니다.", "병력을 보냄: ", "병력을 보낼수 없음: ", "지원", "공격", "약탈", "투석기가 겨냥중: ", "임 의", "시각", "혹은 다음에", "초", "분", "시", "일", "병력과 자원을 염탐", "병력과 방어를 염탐", "송 환", "이 공격은 목적지가 지정되지 않아 불가능 합니다.", "지역 번호.", "정렬:", "유형 ", "시간 ", "대상 ", "설정 ", "마을 ", "작업 대기열", "기록 지우기", "연구를 시작: ", "은(는) 연구되지 않았습니다.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["군단병", "근위병", "제국병", "수색 기병", "황제 기병", "제국 기병", "공성추", "불 투석기", "원로원 의원", "정착민", "영웅"]; //Romans
		aLangTroops[1] = ["봉병", "창병", "도끼병", "척후병", "팔라딘", "튜턴 기사", "공성추", "투석기", "우두머리", "정착민", "영웅"]; //Teutons
		aLangTroops[2] = ["팔랑크스", "검사", "정탐꾼", "튜테이트 썬더", "드루이드 라이더", " 해두안", "공성추", "투석기", "족장", "정착민", "영웅"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
	
	case "lt":  //by NotStyle & ( GodZero, negadink daugiau skripto) 
		aLangBuildings = ["", "Medžių kirtavietė", "Molio karjeras", "Geležies kasykla", "Grūdų ferma", "Lentpjūvė", "Plytinė", "Liejykla", "Malūnas", "Kepykla", "Sandėlis", "Klėtis", "Ginklų kalvė", "Šarvų kalvė", "Arena", "Gyvenamasis pastatas", "Susibūrimo vieta", "Turgavietė", "Ambasada", "Kareivinės", "Arklidė", "Dirbtuvės", "Akademija", "Slėptuvė", "Rotušė", "Rezidencija", "Valdovo rūmai", "Iždinė", "Prekybos rūmai", "Didžiosios kareivinės", "Didžioji arklidė", "Mūrinė siena", "Gynybinis pylimas", "Statinė tvora", "Mūrininė", "Alaus darykla", "Spąstinė", "Karžygio namai", "Didysis sandėlys", "Didžioji klėtis", "Pasaulio stebuklas"];
		aLangTasks = ["Statyti", "Patobulinti", "Siųsti karius", "Tyrinėti", "Treniruoti", "Party"];
		aLangStrings = ["Statyti vėliau", "Patobulinti vėliau", "Siųsti karius vėliau", "Tyrinėti vėliau", "Užplanuoti užduotį.", "Mes pradėjome statyti ", " Pabandyta, bet rezultatas nežynomas.", "lygis", " neimanoma pastatyti.", " neimanoma patobulinti.", "Užduotis užplanuota.", "Einama gamyba:", "Mes negalime užplanuoti dabar sitą užduoti.", "Užduoties užplanavimas negalimas!", "Užplanuotos užduotys", "Ištrinti", "Siųsti vėliau", "Ataka negali būti užplanuota nes kariai nepasirinkti.", "Jūsų kariai nusiųsti į", "Jūsų kariai negali būti nusiųsti į", "Parama", "Ataka", "Reidas", "Katapultos bus nutaikyti į", "atsitiktinis", "į", "arba vėliau", "sekundės", "minutės", "valandos", "dienos", "Resursų bei pajėgų žvalgyba", "Gynybinių fortifikacijų bei pajėgų žvalgyba", "nėra", "Negalima užplanuoti atakos, nes taikinys nerastas.", "puslapyje Nr.", "Rūšiuoti pagal:", "[tipą] ", "[laiką] ", "[taikinį] ", "pasirinktys ", "[gyvenvietę] ", "Užduočių Praeitis", "[išvalyti praeitį]", "Mes pradėjome tyrinėjimą ", " negali būti tyrinėjamas.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionierius", "Pretorionas", "Imperionas", "Raitas legatas", "Imperatoriaus raitelis", "Cezario raitelis", "Mūradaužys", "Ugninė katapulta", "Senatorius", "Romėnų kolonistas", "Herojus"]; //Romėnai
		aLangTroops[1] = ["Pėstininkas su kuoka", "Ietininkas", "Pėstininkas su kirviu", "Žvalgas", "Paladinas", "Germanų raitelis", "Taranas", "Katapulta", "Germanų vadas", "Germanų kolonistas", "Herojus"]; //Germanai
		aLangTroops[2] = ["Falanga", "Pėstininkas su kardu", "Pėdsekys", "Raitas perkūnas", "Raitas druidas", "Raitas hedujas", "Taranas", "Trebušetas", "Galų kunigaikštis", "Galų kolonistas", "Herojus"]; //Galai
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

	case "lv": //by sultāns
		aLangBuildings = ["", "Cirsma", "Māla Karjers", "Dzelzs Raktuves", "Labības Lauks", "Kokzāģētava", "Ķieģeļu Fabrika", "Dzelzs Lietuve", "Dzirnavas", "Maiznīca", "Noliktava", "Klēts", "Ieroču kaltuve", "Bruņu kaltuve", "Turnīru laukums", "Galvebā ēka", "Pulcēšanās Vieta", "Tirgus laukums", "Vēstniecība", "Kazarmas", "Stallis", "Darbnīca", "Akadēmija", "Paslēptuve", "Rātsnams", "Rezidence", "Pils", "Dārgumu glabātuve", "Tirdzniecības Birojs", "Lielās Kazarmas", "Lielais Stallis", "Pilsētas Mūris", "Zemes Mūris", "Palisāde", "Akmeņlauztuve", "Alus Darītava", "Mednieku māja", "Varoņu Savrupmāja", "Lielā Noliktava", "Lielā Klēts", "Pasaules Brīnums"];
		aLangTasks = ["Būvēt", "Paplašināt", "Uzbrukt", "Izpētīt", "Apmācīt", "Party"];
		aLangStrings = ["Būvēt vēlāk", "Paplašināt vēlāk", "Uzbrukt vēlāk", "Izpētīt vēlāk", "Izveidot uzdevumu.", "Tika uzsākta būvniecība ", " mēs mēģinājām, bet rezultāts nav zināms.", "līmenis", " nevar uzbūvēt.", " nevar paplašināt.", "Uzdevums ir ieplānots.", "Tekošā ražošana:", "Mēs nevaram šobrīd to ieplānot.", "Ieplānotais uzdevums neeksistē!", "Ieplānotie uzdevumi", "Dzēst", "Sūtīt vēlāk", "Uzbrukums nevar notikt, jo nav atzīmēti kareivji.", "Jūsu kareivji tika nosūtīti uz", "Jūsu kareivji nevar tikt nosūtīti", "Papildspēki", "Uzbrukums", "Iebrukums", "Ar katapultām bombardēt", "nejaušs", "kad", "vai pēc", "sekundes", "minūtes", "stundas", "dienas", "Izlūkot resursus un kareivjus", "Izlūkot aizsardzību un kareivjus", "Prom", "Uzbrukums nevar tikt izpildīts, jo nav norādīts mērķis.", "koordinātes kartē.", "Šķirot pēc:", "tipa ", "laika ", "mērķa ", "veida ", "ciema ", "Uzdevumu vēsture", "flush history", "tika uzsākta izpēte", " nevar tikt izpētīts.", "Apmācīt vēlāk", "Izlūkot", "Uzlabot vēlāk", "kareivji.", "Uzlabot", "Tika uzsākta uzlabošana", "nevar tikt uzlaboti.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Leģionārs", "Pretorietis", "Iekarotājs", "Ziņnesis", "Romas Jātnieks", "Romas Bruņinieks", "Mūra Brucinātājs", "Uguns Katapulta", "Senators", "Kolonists", "Varonis"]; //Romieši
		aLangTroops[1] = ["Rungas Vēzētājs", "Šķēpnesis", "Karacirvja Vēzētājs", "Izlūks", "Bruņinieks", "Ģermāņu Bruņinieks", "Postītājs", "Katapultas", "Virsaitis", "Kolonists", "Varonis"]; //Ģermāņi
		aLangTroops[2] = ["Falanga", "Zobenbrālis", "Pēddzinis", "Zibens Jātnieks", "Priesteris - Jātnieks", "Edujs", "Tarāns", "Trebušets", "Barvedis", "Kolonists", "Varonis"]; //Galli
		aLangTransModel= ["Jauktā Kārtībā", "Tikai Labību", "Tikai Resursus", "Noteikta Daļa"];
		aLangStringt   = ["Sūtīt Atpakaļ", "Transportēt Automātiski", "Tirgoties Automātiski", "Tirgotāji", " no", "uz", "Transportēt ar", "Izpildes laiks", "minūtes", "sekundes", "Piegādes laiks:", "laiki", "Nākoša uzdevuma laiks:", "tika pievienots.", "ir sācies.", "nepietiek tirgotāju.", "piegādes kļūda.", "Izpildīt vēlāk pēc", "Labība: ", "Auto piegāde ir pabeigta.", "Auto piegāde netika pabeigta.", "Resursi:", "Kokmateriāls", "Māls", "Dzelzis", "Labība", "Sadalīt vienlīdzīgi", "Sadalīt pa moduļiem:", "UZMANĪBU: Mainīt resursu ciemu nav ieteicams.", "Ievadiet 0 ja gribat vienlīdzīgu sadalījumu starp koku, mālu un dzelzi. Ja nē, ievadiet skaitu.", "Šis ir servera laiks.", "Šis ir Jūsu lokālais laiks.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
			
	case  "mx":  //by fidelmty [Mexican Spanish]
		aLangBuildings = ["", "Bosque", "Barrera", "Mina de Hierro", "Granja", "Serrería", "Ladrillar", "Fundición de Hierro", "Molino", "Panadería", "Almacén", "Granero", "Herrería", "Armería", "Plaza de Torneos", "Edificio Principal", "Plaza de reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Centro Cívico", "Residencia", "Palacio", "Tesoro", "Oficina de Comercio", "Gran Cuartel", "Gran Establo", "Muralla", "Terraplen", "Empalizada", "Mansión del Arquitecto", "Cervecería", "Trampero", "Hogar del héroe", "Almacen Grande", "Granero Grande", "Maravilla" ];
		aLangTasks = [ "Construir", "Mejorar", "Atacar", "Investigar", "Entrenar", "Party"];
		aLangStrings = ["Construir más tarde", "Mejorar más tarde", "Atacar más tarde", "Investigar más tarde", "Programar esta tarea para más tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "nivel", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "Producción actual:", "No se puede programar esa tarea ahora.", "!La programación de tareas no está disponible!", "Tareas programadas", "Eliminar", "Enviar más tarde", "El ataque no ha sido programado porque no se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Saquear", "Catapultas atacarán...", "aleatorio", "a", "o después", "segundos", "minutos", "horas", "días", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Sort by:", "type ", "time ", "target ", "options ", "village " , "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "Héroe" ]; //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Emisario", "Paladín", "Caballero Teutón", "Ariete", "Catapulta", "Cabecilla", "Colono", "Héroe"];  //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Batidor", "Trueno de Theutates", "Jinete Druida", "Jinete Eduo", "Ariete", "Catapulta de guerra", "Cacique", "Colono", "Héroe"];  //Galos
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "my":
		aLangBuildings = ["", "Kawasan Pembalakan", "Kuari Tanah Liat", "Lombong Bijih Besi", "Ladang", "Kilang Papan", "Kilang Bata", "Faundri Besi", "Pengisar Bijian", "Kilang Roti", "Gudang", "Jelapang", "Kedai Perisai", "Kedai Senjata", "Gelanggang Latihan", "Bangunan Utama", "Titik Perhimpunan", "Pasar", "Kedutaan", "Berek", "Kandang Kuda", "Bengkel", "Akademi", "Gua", "Dewan Perbandaran", "Residen", "Istana", "Perbendaharaan", "Pejabat Dagangan", "Berek Besar", "Kandang Kuda Besar", "Dinding Kota", "Tembok Tanah", "Pagar Kubu", "Kedai Tukang Batu", "Brewery", "Perangkap", "Rumah Agam Wira", "Gudang Besar", "Jelapang Besar", "Wonder"];
		aLangTasks = ["Binakan", "Tingkatkan", "Serang", "Selidik", "Latih","Hantarkan sumber", "Party"];
		aLangStrings = ["Binakan kemudian", "Tingkatkan kemudian", "Serang kemudian", "Selidik kemudian", "Jadualkan tugasan ini untuk kemudian", "Memulakan pembinaan ", " telah cuba dilakukan, hasil masih unknown.", "tahap", " tidak dapat dibina.", " tidak dapat ditingkatkan.", "Tugasan telah dijadualkan.", "Produksi semasa:", "We can't schedule this task right now.", "Task scheduling is not available!", "Tugasan telah Dijadual", "Buang", "Hantarkan kemudian", "Tiada askar dipilih.", "Askar-askar anda dihantar ke", "Askar-askar anda xdapat dihantar ke", "Bantuan", "Serang", "Serbuan", "Tarbil akan mensasarkan ke", "random", "at", "or after", "saat", "minit", "jam", "hari", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.","Enhance later", "Spy", "Latih kemudia", "troops.", "Latih", "We started training ", " cannot be trained.","or repeat ","times ","espaced by ","Bersihkan senarai tugasan ","Have been dispatched","Queue this task", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Askar Legion", "Pengawal Pertahan", "Askar Empayar", "Kesatria Diplomatik", "Kesatria Empayar", "Kesatria Jeneral", "Kerata Pelantak", "Tarbil Api", "Senator", "Peneroka", "Hero"];  //Romans
		aLangTroops[1] = ["Askar Belantan", "Askar Lembing", "Askar Kapak", "Peninjau", "Kesatria Santo", "Kesatria Teutonik", "Kerata Pelantak", "Tarbil", "Penghulu", "Peneroka", "Hero"];  //Teutons
		aLangTroops[2] = ["Falanks", "Askar Pedang", "Penjelajah", "Guruh Theutates", "Penunggang Druid", "Haeduan", "Kereta Pelantak", "Tarbil", "Pemimpin", "Peneroka", "Hero"];  //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "net": //Spanish - by Carlos R (fixed by Mr.Kurt & Voltron).
		aLangBuildings = ["", "Leñador", "Barrera", "Mina", "Granja", "Serrería", "Ladrillar", "Fundición", "Molino", "Panadería", "Almacén", "Granero", "Herrería", "Armería", "Plaza de Torneos", "Edif. principal", "Plaza reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Palacio", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "Terraplén", "Empalizada", "Cantero", "Cervecería", "Trampero", "Hogar del héroe", "Almacén Grande", "Granero Grande", "Maravilla"];
		aLangTasks = ["Construir", "Mejorar", "Atacar", "Investigar", "Entrenar", "Party"];
		aLangStrings = ["Construir más tarde", "Mejorar más tarde", "Atacar más tarde", "Investigar más tarde", "Programar esta tarea para más tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "Grado", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "Producción actual:", "No se puede programar esa tarea ahora.", "ˇLa programación de tareas no está disponible!", "Tareas programadas", "Eliminar", "Enviar más tarde", "No se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Saquear", "Catapultas atacarán...", "aleatorio", "a", "o después", "segundos", "minutos", "horas", "días", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante nş", "Ordenar por:", "tipo ", "hora ", "objetivo ", "opciones ", "aldea ", "Historial de tareas", "Borrar Historial", "Se ha empezado a investigar ", " no puede ser investigado.", "Mejorar más tarde", "Espiar", "Entrenar más tarde", "tropas.", "Entrenar", "Se ha empezado a entrenar ", " no se puede entrenar.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "Héroe"]; //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Explorador", "Paladín", "Jinete Teutón", "Ariete", "Catapulta", "Jefe", "Colono", "Héroe"]; //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Batidor", "Rayo de Theutates", "Jinete Druida", "Jinete Eduo", "Ariete", "Catapulta de Guerra", "Cacique", "Colono", "Héroe"]; //Galos
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "nl": //by Roshaoar & Kris Fripont
		aLangBuildings = ["", "Houthakker", "Klei-afgraving", "IJzermijn", "Graanveld", "Zaagmolen", "Steenbakkerij", "IJzersmederij", "Korenmolen", "Bakkerij", "Pakhuis", "Graansilo", "Wapensmid", "Uitrustingssmederij", "Toernooiveld", "Hoofdgebouw", "Verzamelplaats", "Marktplaats", "Ambassade", "Barakken", "Stal", "Werkplaats", "Academie", "Schuilplaats", "Raadhuis", "Residentie", "Paleis", "Schatkamer", "Handelskantoor", "Grote Barakken", "Grote Stal", "Stadsmuur", "Aardmuur", "Palissade", "Steenbakkerij", "Brouwerij", "Vallenzetter", "Heldenhof", "Groot Pakhuis", "Grote Graansilo", "Wonder"];
		aLangTasks = ["Gebouw Bouwen", "Verbeter", "Val Aan", "Ontwikkel", "Train", "Party"];
		aLangStrings = ["Bouw later", "Verbeter later", "Val later aan", "Ontwikkel later", "Plan deze taak voor later.", "Bouw is begonnen ", " geprobeerd maar resultaat onbekend.", "niveau", " kan niet worden gebouwd.", " kan niet worden verbeterd.", "deze taak was gepland.", "Actuele productie:", "We kunnen deze taak nu niet plannen.", "Deze taak plannen is niet beschikbaar!", "Geplande taken", "Verwijder", "Stuur later", "De aanval kan niet worden gepland omdat er geen troepen zijn geselecteerd.", "Jou troepen zijn gestuurd naar", "Jou troepen konden niet worden gestuurd naar", "Versterk", "Val aan", "Roof", "De katapulten zullen mikken op", "willekeurig", "op", "of na", "seconden", "minuten", "uren", "dagen", "spioneer naar voorraden en troepen", "spioneer naar troepen en verdediging", "weg", "Het aanval kan niet worden gepland omdat geen destinatie gezet was.", "op bouwplaats nummer ", "Sorteer via:", "soort ", "tijd ", "doel ", "keuzen ", "dorp ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionair", "Praetoriaan", "Imperiaan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Vuurkatapult", "Senator", "Kolonist", "Held"]; //Romeinen
		aLangTroops[1] = ["Knuppelvechter", "Speervechter", "Bijlvechter", "Verkenner", "Paladijn", "Germaanse Ridder", "Ram", "Katapult", "Leider", "Kolonist", "Held"]; //Germanen
		aLangTroops[2] = ["Phalanx", "Zwaardvechter", "Padvinder", "Toetatis Donder", "Druideruiter", "Haeduaan", "Ram", "Trebuchet", "Onderleider", "Kolonist", "Held"]; //GalliÃƒÂ«rs
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "no":  //by Pimp Trizkit (in Norwenglish)
		aLangBuildings = ["", "Tømrer", "Leiregrop", "Jernmine", "Kornåker", "Sagbruk", "Mursteinsopplag", "Jern-smelteverk", "Mølle", "Bakeri", "Varehus", "Silo", "Rustningssmed", "Våpensmed", "Turnerings-område", "Hovedbygning", "Møteplass", "Markedsplass", "Ambassade", "Kaserne", "Stall", "Verksted", "Akademi", "Hemmelig jordkjeller", "Rådhus", "Residens", "Palass", "Skattkammer", "Handelskontor", "Stor kaserne", "Stor stall", "Bymur", "Jordmur", "Palisade", "Stenhugger", "Bryggeri", "Fellemaker", "Heltens villa", "Stort varehus", "Stor silo", "Vanningsbrønn"];
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train", "Party"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "Nivå", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

	case "ph" : // by BenzCode
		aLangBuildings = ["", "Magtrotroso", "Putikan", "Minahan ng bakal", "Taniman", "Lagarian", "Gawaan ng Laryo", "Gawaan ng bakal", "Kiskisan", "Panaderya", "Bodega", "Kamalig", "Pandayan", "Balutian", "Praktisan", "Pangunahing gusali", "Pook Tipunan", "Palengke", "Embahada", "Kwartel", "Kwartel", "Talyer", "Akademya", "Sulukan", "Bulwagan ng baryo", "Residensya", "Palasyo", "Kaban-yaman", "Opisina ng kalakalan", "Malaking Kwartel", "Malaking Kuwadra", "Pader ng Lungsod", "Pader na Putik", "Matalim na Bakod", "Mason ng Bato", "Brewery", "Mambibitag", "Mansyon ng Bayani", "Malaking Bodega", "Malaking Kamalig", "Wonder", "Treasure Chamber", "Horse Drinking Pool"];
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train", "Party"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "antas", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

	
	case "pt":  //by Guinness
		aLangBuildings = ["", "Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "Serraria", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de torneios", "Edifício principal", "Ponto de reunião militar", "Mercado", "Embaixada", "Quartel", "Cavalaria", "Oficina", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Tesouraria", "Companhia do Comércio", "Grande Quartel", "Grande Cavalaria", "Muralha", "Muro de Terra", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas", "Mansão do Herói", "Grande Armazém", "Grande Celeiro", "Maravilha do Mundo"];
		aLangTasks = ["Construir", "Melhorar", "Atacar", "Desenvolver", "Treinar", "Party"];
		aLangStrings = ["Construir Mais Tarde", "Melhorar Mais Tarde", "Atacar Mais Tarde", "Desenvolver Mais Tarde", "Programar esta tarefa para mais tarde.", "Começamos a construir ", " foi tentada a tarefa mas com resultado desconhecido.", "nível", " não pode ser construído.", " não pode ser melhorado.", "A tarefa foi programada.", "Em construção:", "Não conseguimos programar esta tarefa agora.", "Este agendamento não está disponível!", "Tarefas Programadas", "Apagar", "Enviar Mais Tarde", "Não foram selecionadas tropas.", "As suas tropas foram enviadas para", "Não foi possível enviar as suas tropas para", "Reforços", "Ataque:normal", "Ataque:assalto", "As catapultas irão mirar em", "Aleatório", "em", "ou depois","segundos", "minutos", "horas", "dias","Espiar recursos e tropas", "Espiar defesas e tropas", "Ausente", "O ataque não pode ser programado pois nenhum destino foi escolhido.", "na localização no.", "Ordenar por:", "tipo ", "hora ", "alvo ", "opções ", "aldeia ","Histórico das Tarefas", "apagar histórico", "Começamos a pesquisar ", " não pode ser pesquisado.", "Melhorar mais tarde", "Espiar", "Treinar mais tarde", "tropas.", "Treinar", "Começamos a treinar ", " não pode ser treinado.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador"]; //Romans
		aLangTroops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador"]; //Teutons
		aLangTroops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador"];
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Mercadores", "De", "Para", "TransportBy", "Repetir a cada", "minutos", "segundos", "Tranportar (x) vezes:", "vezes", "Hora do próximo transporte:", "foi adicionado.", "foi iniciado.", "não possui mercadores suficientes.", "erro de transporte.", "Agendar depois de", "Cereal: ", "Troca automática realizada.", "Troca automática falhou.", "Recursos desejados:", "Madeira", "Barro", "Ferro", "Cereais", "Divisão igual", "Modelo de Divisão:", "AVISO: Trocar aldeia de origem não é recomendado.", "Deixe ZERO se você quiser uma divisão idêntica entre madeira, barro e ferro. Preencha os valores se quiser diferente.","Forçar troca na hora agendada (sem verificação de atraso)"];
		aLangUpdate = ["Sua versão é mais atual que a versão atual: ", "Sua versão é a mais nova: ", "Existe uma atualização disponivel", "Você quer atualizar agora? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "pl":  //by Oskar(corrected by CamboX)
		aLangBuildings = ["", "Las", "Kopalnia gliny", "Kopalnia żelaza", "Pole zboża", "Tartak", "Cegielnia", "Huta stali", "Młyn", "Piekarnia", "Magazyn surowców", "Spichlerz", "Zbrojownia", "Kuźnia", "Plac turniejowy", "Główny budynek", "Miejsce zbiórki", "Rynek", "Ambasada", "Koszary", "Stajnia", "Warsztat", "Akademia", "Kryjówka", "Ratusz", "Rezydencja", "Pałac", "Skarbiec", "Targ", "Duże koszary", "Duża stajnia", "Mur obronny", "Wały", "Palisada", "Kamieniarz", "Browar", "Traper", "Dwór bohaterów", "Duży magazyn", "Duży spichlerz", "Cud"];
		aLangTasks = ["Buduj", "Rozbuduj", "Atak", "Zbadać", "Szkolić", "Party"];
		aLangStrings = ["Buduj później", "Rozbuduj później", "Atakuj później", "Zbadaj później", "Zaplanuj zadanie na później.", "Rozpoczęto budowę ", " została podjęta z nieznanym skutkiem.", "poziom", " nie może byc zbudowany.", " nie moze byc rozbudowany.", "Zadanie zostało zaplanowane.", "Aktualna produkcja:", "Nie mozna teraz zaplanowac tego zadania.", "Planowanie nie dostepne!", "Zaplanowane zadania", "Usuń", "Wyślij później", "Nie wybrano żadnych jednostek.", "Twoje jednoski zostały wysłane", "Twoje jednostki nie mogą zostać wysłane", "Pomoc", "Atak", "Grabież", "Katapulty celują w", "losowy", "o", "lub za", "sekundy", "minuty", "godziny", "dni", "Obserwuj surowce i jednostki", "Obserwuj fortyfikacje i jednostki", "nieobecny", "Atak nie może zostać zaplanowany, ponieważ nie wybrano celu.", "Na pozycji nr.", "Sortowanie:", "typ ", "czas ", "cel ", "opcje ", "osada ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "Szkolic później", "troops.", "Train", "We started training ", " cannot be trained.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionista", "Pretorianin", "Centurion", "Equites legati", "Equites imperatoris", "Equites caesaris", "Taran", "Ognista katapulta", "Konsul", "Osadnik", "Bohater"]; //Romans
		aLangTroops[1] = ["Pałkarz", "Oszczepnik", "Topornik", "Zwiadowca", "Paladyn", "Germański rycerz", "Taran", "Katapulta", "Wódz", "Osadnik", "Bohater"]; //Teutons
		aLangTroops[2] = ["Falanga", "Miecznik", "Tropiciel", "Grom Teutatesa", "Jeździec druidzki", "Haeduan", "Taran", "Trebusz", "Herszt", "Osadnik", "Bohater"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
	
	case "ro":  //Dark EingeL
		aLangBuildings = ["", "Cherestea", "Puţ de lut", "Mina de fier", "Lan de grâu", "Fabrica de cherestea", "Fabrica de caramidă", "Topitorie", "Moara", "Brutărie", "Hambar", "Grânar", "Fierărie", "Armurier", "Arena", "Primărie", "Adunare", "Târg", "Ambasada", "Cazarma", "Grajd", "Atelier", "Academie", "Beci", "Casa de cultură", "Vila", "Palat", "Trezorerie", "Oficiu comerţ", "Cazarma extinsă", "Grajd extins", "Zid", "Metereze", "Palisadă", "Arhitect", "Berărie", "Temniţe", "Reşedinţa eroului", "Hambar extins", "Grânar extins", "Minunea Lumii"];
		aLangTasks = ["Clădire", "Imbunătaţeşte", "Atacă", "Cercetează", "Instruieşte", "Party"];
		aLangStrings = ["Construieşte mai târziu", "Imbunatateşte mai târziu", "Atacă mai târziu","Cerceteaza ulterior", "Programează acesta acţiune pentru mai târziu", "Am inceput să construim", "A fost incercată cu rezultate necunoscute", "Nivel", "Nu poate fi construită","Nu poate fi upgradată", "Actiunea a fost programată", "Producţia curenta:","Nu putem programa acesta acţiune acum", "Programarea acţiuni nu este disponibilă!", "Acţiuni Programate", "Şterge", "Trimite mai târziu", "Nu sunt trupe selectate.","Trupele tale au fost trimise la", "Trupele tale nu au putut fi trimise la", "Suport","Atac", "Raid", "Catapultează","Aleator", "la", "sau după","secunde", "minute", "ore","zile", "Spionează resurse şi unităţi", "Spionează fortificaţii şi trupe", "plecate", "Atacul nu a putut fi executat pentru că nu a fost specificată destinaţia", "at site no.", "Sortează după:", "tip ", "timp ", "target ", "optiuni ", "sat ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionar", "Pretorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Berbec", "Catapultă", "Senator", "Colonist", "Erou"]; //Romani
		aLangTroops[1] = ["Măciucar", "Lancier", "Executor", "Spion", "Paladin", "Cavaler teuton", "Berbec", "Catapultă", "Căpetenie", "Colonist", "Erou"]; //Barbari
		aLangTroops[2] = ["Scutier", "Pedestru", "Iscoadă", "Calareţ Fulger", "Druidider", "Tarabones", "Berbec", "Catapultă", "General", "Colonist", "Erou"]; //Daci
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
	
	case "ru": //by Hosstor
		aLangBuildings = ["", "Лесопилка", "Глиняный карьер", "Железный рудник", "Ферма", "Лесопильный завод", "Кирпичный завод", "Чугунолитейный завод", "Мукомольная мельница", "Пекарня", "Склад", "Амбар", "Кузница оружия", "Кузница доспехов", "Арена", "Главное здание", "Пункт сбора", "Рынок", "Посольство", "Казарма", "Конюшня", "Мастерская", "Академия", "Тайник", "Ратуша", "Резиденция", "Дворец", "Сокровищница", "Торговая палата", "Большая казарма", "Большая конюшня", "Городская стена", "Земляной вал", "Изгородь", "Каменотес", "Пивоварня", "Капканщик ", "Таверна", "Большой склад", "Большой амбар", "Чудо"];
		aLangTasks = ["Построить", "Развить", "Атаковать", "Изучить", "Обучить", "Party"];
		aLangStrings = ["Построить позже", "Развить позже", "Атаковать позже", "Обучить позже", "Запланировать задачу.", "Мы начали строительство ", " мы попробовали, но результат не известен.", "уровень", " не может быть построено.", " не может быть развито.", "Задача запланирована.", "Текущее производство:", "Мы не можем планировать этого сейчас.", "Запланированной задачи не существует!", "Заплпнированные задачи", "Удалить", "Отправить позже", "Атака не может быть запланирована, поскольку войска не выбраны.", "Ваши войска были отправленны", "Ваши войска не могут быть отправлены", "Поддержка", "Атака", "Набег", "Какапульты нацелены на", "Случайно", "в", "или по истечении", "секунд", "минут", "часов", "дней", "Разведка ресурсов и войск", "Разведка войск и оборонительных сооружений", "Отсутствует", "Атака не может быть запланирована, не были заданы координаты.", "на поле номер.", "Сортивовка по:", "типу ", "времени ", "цели ", "настройкам ", "деревне ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Легионер", "Преторианец", "Империанец", "Конный разведчик", "Конница императора", "Конница Цезаря", "Таран", "Огненная катапульта", "Сенатор", "Поселенец", "Герой"]; //Римляне
		aLangTroops[1] = ["Дубинщик", "Копьеносец", "Топорщик", "Скаут", "Паладин", "Тевтонская конница", "Стенобитное орудие", "Катапульта", "Вождь", "Поселенец", "Герой"]; //Германцы
		aLangTroops[2] = ["Фаланга", "Мечник", "Следопыт", "Тевтатский гром", "Друид-всадник", "Эдуйская конница", "Таран", "Требушет", "Предводитель", "Поселенец", "Герой"]; //Галлы
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

	case "se": //Storgran
		aLangBuildings = ["", "Skogshuggare", "Lergrop", "Järngruva", "Vetefält", "Sågverk", "Murbruk", "Järngjuteri", "Vetekvarn", "Bageri", "Magasin", "Silo", "Smedja", "Vapenkammare", "Tornerplats", "Huvudbyggnad", "Samlingsplats", "Marknadsplats", "Ambassad", "Baracker", "Stall", "Verkstad", "Akademi", "Grotta", "Stadshus", "Residens", "Palats", "Skattkammare", "Handelskontor", "Stor barack", "Stort stall", "Stadsmur", "Jordvall", "Palissad", "Stenhuggare", "Bryggeri", "Fälla", "Hjältens egendom", "Stort magasin", "Stor silo", "Världsunder"];
		aLangTasks = ["Konstruera", "Uppgradera", "Attack", "Förbättra", "Träna", "Party"];
		aLangStrings = ["Konstruera senare", "Uppgradera senare", "Attackera senare", "Förbättra senare", "Schemalägg uppgiften tills senare.", "Byggnationen påbörjad ", " utfördes med okänt resultat.", "nivå", " kan inte byggas.", " kan inte uppgraderas.", "Uppgiften är schemalagd.", "Nuvarande produktion:", "Det går inte att schemalägga denna uppgift just nu.", "Schemaläggningen är inte tillgänglig!", "Schemalägg uppgift", "Ta bort", "Skicka senare", "Attacken kunde inte bli schemalagd då inga trupper valdes.", "Dina trupper skickades till", "Dina trupper kunde inte skickas till", "Förstärkning", "Attack", "Plundring", "Katapulterna ska sikta på", "random", "vid", "eller efter", "sekunder", "minuter", "timmar", "dagar", "Spionera på trupper och resurser", "Spionera på trupper och försvarsbyggnader", "borta", "Attacken misslyckades, var vänlig och välj en destination.", "ingen destination.", "Sortera efter:", "typ ", "tid ", "mal ", "alternativ ", "by ", "tidigare", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionär", "Praetorian", "Imperiesoldat", "Spårare", "Imperieriddare", "Ceasarriddare", "Murbräcka", "Eld Katapult", "Senator", "Nybyggare", "Hjälte"]; //Romans
		aLangTroops[1] = ["Klubbman", "Spjutman", "Yxman", "Scout", "Paladin", "Germansk Knekt", "Murbräcka", "Katapult", "Stamledare", "Nybyggare", "Hjälte"]; //Teutons
		aLangTroops[2] = ["Falanx", "Svärdskämpe", "Spårare", "Theutates Blixt", "Druidryttare", "Haeduan", "Murbräcka", "Krigskatapult", "Hövding", "Nybyggare", "Hjälte"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
	
	case "rs":
	case "ser":  //by isidora
		aLangBuildings = ["", "Дрвосеча", "Рудник глине", "Рудник гвожђа", "Њива", "Пилана", "Циглана", "Ливница гвожђа", "Млин", "Пекара", "Складиште", "Силос", "Ковачница оружја", "Ковачница оклопа", "Витешка арена", "Главна зграда", "Место окупљања", "Пијаца", "Амбасада", "Касарна", "Штала", "Радионица", "Академија", "Склониште", "Општина", "Резиденција", "Дворац", "Ризница", "Трговачки центар", "Велика касарна", "Велика штала", "Градски бедем", "Земљани зид", "Палисада", "Каменорезац", "Brewery", "Постављач замки", "Дворац хероја", "Велико складиште", "Велики силос", "Светско чудо"];
		aLangTasks = ["Изградња зграда", "Надоградњна на", "Напад", "Побољшати", "Започни обуку", "Party"];
		aLangStrings = ["Гради после", "Побољшај после", "Нападни после", "Истражи после", "Испланирај овај задатак за после.", "Почела је градња ", " покушано са непознатим резултатом.", "степен", " не може бити изграђено.", " не може се унапредити.", "испланиран је задатак.", "Актуелна продукција:", "Не може се испланирати овај задатак сада.", "Планирани задатак није доступан!", "Планирани задаци", "избриши", "Пошаљи после", "Трупе нису одабране.", "Ваша војска је послана на", "Ваша војска не може бити послана на", "Појачање", "Напад", "Пљачка", "Катапулти ће рушити", "случајно", "у", "или након", "секунди", "минута", "сати", "дана", "Извиђање сировина и војске", "Извиђање одбране и војске", "away", "Напад не може бити испланиран јер дестинација није одређена.", "на страници бр.", "Сортирај по:", "type ", "time ", "target ", "опције ", "село ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Легионар", "Преторијанац", "Империјанац", "Извиђач", "Императорова коњица", "Цезарева коњица", "Ован", "Ватрени катапулт", "Сенатор", "Насељеник", "Херој"]; //Romans
		aLangTroops[1] = ["Батинар", "Копљаник", "Секираш", "Извиђач", "Паладин", "Тевтонски витез", "Ован", "Катапулт", "Поглавица", "Насељеник", "Херој"]; //Teutons
		aLangTroops[2] = ["Фаланга", "Мачевалац", "Извиђач", "Галски витез", "Друид", "Коњаник", "Ован", "Катапулт", "Старешина", "Насељеник", "Херој"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;  
	
	case "si":  //by SpEkTr and matej505
		aLangBuildings = ["", "Gozdar", "Glinokop", "Rudnik železa", "Žitno polje", "Žaga", "Opekarna", "Talilnica železa", "Mlin", "Pekarna", "Skladišče", "Žitnica", "Izdelovalec orožja", "Izdelovalec oklepov", "Vadbišče", "Gradbeni ceh", "Zbirališče", "Tržnica", "Ambasada", "Barake", "Konjušnica", "Izdelovalec oblegovalnih naprav", "Akademija", "Špranja", "Mestna hiša", "Rezidenca", "Palača", "Zakladnica", "Trgovski center", "Velike barake", "Velika konjušnica", "Mestno obzidje", "Zemljen zid", "Palisada", "Kamnosek", "Pivnica", "Postavljalec pasti", "Herojeva rezidenca", "Veliko skladišče", "Velika žitnica", "Čudež sveta"];
		aLangTasks = ["Postavi nov objekt", "Nadgradi", "Napad na ", "Razišči", "Izuri", "Party"];
		aLangStrings = ["Postavi nov objekt kasneje", "Nadgradi kasneje", "Napadi kasneje", "Izuri kasneje", "Nastavi to nalogo za kasneje", "Z gradnjo začnem ", " rezultat ni znan.", "stopnja", " ne morem zgraditi.", " ne morem nadgraditi.", "Naloga je nastavljena.", "Trenutna proizvodnja:", "Te naloge trenutno ni možno nastaviti.", "Nastavljanje nalog ni možno!", "Nastavljene naloge:", "Zbriši", "Pošlji kasneje", "Nisi označil nobenih enot.", "Tvoje enote so bile poslane,", "Tvoje enote ne morejo biti poslane,", "Okrepitev", "Napad", "Roparski pohod", "Cilj katapultov je", "naključno", "ob", "ali kasneje", "sekund", "minut", "ur", "dni", "Poizvej o trenutnih surovinah in enotah", "Poizvej o obrambnih zmogljivostih in enotah", "proč", "Napad ne more biti nastavljen, ker ni bila izbrana nobena destinacija.", "na strani št.", "Sortiraj po:", "tipu ", "času ", "tarči ", "možnosti ", "vasi ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionar", "Praetorijan", "Imperijan", "Izvidnik", "Equites Imperatoris", "Equites Caesaris", "Oblegovalni oven", "Ognjeni katapult", "Senator", "Kolonist"];  //Romans
		aLangTroops[1] = ["Gorjačar", "Suličar", "Metalec sekir", "Skavt", "Paladin", "Tevtonski vitez", "Oblegovalni oven", "Mangonel", "Vodja", "Kolonist"]; //Teutons
		aLangTroops[2] = ["Falanga", "Mečevalec", "Stezosledec", "Theutatesova Strela", "Druid", "Haeduan", "Oblegovalni oven", "Trebušet", "Poglavar", "Kolonist"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "sk":
		aLangBuildings = ["", "Drevorubač", "Hlinená baňa", "Železná baňa", "Obilné pole", "Píla", "Tehelňa", "Zlievareň", "Mlyn", "Pekáreň", "Sklad surovín", "Sýpka", "Kováčska dielňa", "Zbrojnica", "Aréna", "Hlavná budova", "Bod stretnutia", "Trh", "Ambasáda", "Kasárne", "Stajne", "Dielňa", "Akadémia", "Úkryt", "Radnica", "Rezidencia", "Palác", "Pokladňa", "Obchodný kancelár", "Veľké kasárne", "Veľké stajne", "Mestské hradby", "Zemná hrádza", "Palisáda", "Kamenár", "Pivovar", "Pasce", "Hrdinský dvor", "Veľký sklad", "Veľká sýpka", "Div sveta"];
		aLangTasks = ["Postaviť", "Rozšíriť", "Zaútočiť na", "Vynájsť", "Trénovať", "Party"];
		aLangStrings = ["Postaviť neskôr", "Rozšíriť neskôr", "Zaútočiť neskôr", "Vynájsť neskôr", "Naplánujte túto akciu na neskôr.", "Začali sme stavať ", " - úspech neznámy.", "úroveň", " sa nedá postaviť.", " sa nedá rozšíriť.", "Úloha je naplánovaná.", "Aktuálna produkcia:", "Túto úlohu momentálne nie je možné naplánovať.", "Momentálne nie je možné plánovať úlohy!", "Naplánované úlohy", "Zmazať", "Vyslať neskôr", "Neboli vybraté žiadne jednotky.", "Jednotky mašírujú do", "Nepodarilo sa vyslať jednotky do", "Podporiť", "Zaútočiť na", "Olúpiť", "Katapulty zacieliť na", "náhodne", "o", "alebo za", "sekúnd", "minút", "hodín", "dní", "Preskúmať jednotky a suroviny", "Preskúmať jednotky a obranné objekty", "preč", "Útok nemožno naplánovať, pretože nie je známy cieľ.", "na mieste č.", "Zoradiť podľa:", "typu ", "času ", "cieľa ", "iné ", "dediny ", "História akcií", "zmazať históriu", "Začali sme vyvíjať ", " sa nedá vynájsť.", "Vylepšiť neskôr", "Vyšpehovať", "Trénovať neskôr", "jednotky.", "Vytrénovať", "Začali sme trénovať ", " sa nedá vytrénovať." , "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionár", "Pretorián", "Imperián", "Equites Legáti", "Equites Imperatoris", "Equites Caesaris", "Rímske baranidlo", "Ohnivý katapult", "Senátor", "Osadník", "Hrdina"]; //Romans
		aLangTroops[1] = ["Pálkar", "Oštepár", "Bojovník so sekerou", "Špeh", "Rytier", "Teuton jazdec", "Germánske baranidlo", "Katapult", "Kmeňový vodca", "Osadník", "Hrdina"]; //Teutons
		aLangTroops[2] = ["Falanx", "Šermiar", "Sliedič", "Theutates Blesk", "Druid jazdec", "Haeduan", "Drevené baranidlo", "Trebušé", "Náčelník", "Osadník", "Hrdina"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
		
	case "asia":
	case "th":  //by off99555 | off9955555@hotmail.com | http://www.google.com/profiles/off99555
		aLangBuildings = ["", "โรงตัดไม้", "บ่อโคลน", "เหมืองเหล็ก", "ทุ่งธัญพืช", "โรงเลื่อยไม้", "โรงอิฐ", "โรงหลอมเหล็ก", "โรงสีธัญพืช", "เบเกอร์รี่", "โกดัง", "ยุ้งฉาง", "โรงตีเหล็ก", "คลังแสง", "ลานประลองยุทธ์", "อาคารหลัก", "จุดระดมพล", "ตลาดสินค้า", "สถานฑูต", "ค่ายทหาร", "โรงม้า", "ห้องเครื่อง", "สถานศึกษา", "ที่ซ่อนเสบียง", "ศาลากลาง", "ที่พักอาศัย", "พระราชวัง", "คลังสมบัติ", "สำนักงานการค้า", "ค่ายทหารใหญ่", "โรงม้าใหญ่", "กำแพงเมือง", "กำแพงดิน", "รั้วไม้", "โรงหิน", "Brewery", "ผู้วางกับดัก", "คฤหาสน์ของฮีโร่", "โกดังใหญ่", "ยุ้งฉางใหญ่", "Wonder"];
		aLangTasks = ["สร้าง", "อัพเกรด", "โจมตี", "วิจัย", "ฝึก", "ส่งทรัพยากร", "Party"];
		aLangStrings = ["สร้างภายหลัง", "อัพเกรดภายหลัง", "โจมตีภายหลัง", "วิจัยภายหลัง", "กำหนดเวลาทำงานนี้ภายหลัง", "เริ่มสร้าง ", " ถูกทดลองสั่งงานโดยไม่ทราบผลลัพธ์", "ระดับ", " ไม่สามารถสร้างได้", " ไม่สามารถอัพเกรดได้", "กำหนดเวลาทำงานเป็นที่เรียบร้อย", "กำลังการผลิตในปัจจุบัน:", "ยังไม่สามารถกำหนดเวลาทำงานได้ในขณะนี้", "สั่งเพิ่มงานไม่ได้!", "เพิ่มงาน", "ลบ", "ส่งในภายหลัง", "ยังไม่ได้เลือกทหาร", "กองกำลังของคุณถูกส่งไปที่ ", "ไม่สามารถส่งกองกำลังของคุณไปยัง", "ส่งกำลังสนับสนุน", "โจมตี", "ปล้น", "เครื่องยิงเล็งไปยัง ", "สุ่ม", "ที่", "หรือหลังจาก", "วินาที", "นาที", "ชั่วโมง", "วัน", "สอดแนมกองกำลังและทรัพยากร", "สอดแนมกองกำลังและการป้องกัน", "away", "ไม่สามารถโจมตีได้เนื่องจากไม่มีหมู่บ้านที่ตำแหน่งนั้น", "ที่จุดสร้างหมายเลข", "เรียงลำดับตาม:", "ชนิด ", "เวลา ", "เป้าหมาย ", "ตัวเลือก ", "หมู่บ้าน ", "ประวัติงานที่ได้ทำไป", "เคลียร์ประวัติงาน", "เริ่มทำการวิจัย ", " ไม่สามารถวิจัยได้", "ปรับปรุงภายหลัง", "สายลับ", "ฝึกในภายหลัง", "กำลังทหาร", "ฝึก", "เริ่มการฝึก", "ไม่สามารถฝึกได้", "หรือทำซ้ำ", "ครั้ง", "เว้นช่วงห่าง", "ล้างรายการงาน", "ถูกบรรทุกแล้ว", "เข้าคิวงานอัตโนมัติ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["ลีเจียนแนร์", "แพรทอเรียน", "อิมพีเรียน", "เอควิทส์ เลกาที", "เอควิทส์ อิมเพอราทอริส", "เอควิทส์ ซีซาริส", "เครื่องกระทุ้ง", "เครื่องยิงกระสุนไฟ", "สมาชิกสภาสูง", "ผู้ตั้งถิ่นฐาน", "ฮีโร่"]; //โรมันส์
		aLangTroops[1] = ["คลับสวิงเกอร์", "สเปียร์แมน", "แอ็กซ์แมน", "หน่วยสอดแนม", "พาลาดิน", "อัศวินทูทั่นส์", "เครื่องกระทุ้ง", "เครื่องยิงกระสุน", "หัวหน้า", "ผู้ตั้งถิ่นฐาน", "ฮีโร่"]; //ทูทั่นส์
		aLangTroops[2] = ["แฟแลงซ์", "ซอร์ดแมน", "ผู้เบิกทาง", "ธูเททส์ ธันเดอร์", "ดรูอิทไรเดอร์", "แฮดวน", "เครื่องกระทุ้ง", "เทรบูเชท", "หัวหน้าเผ่า", "ผู้ตั้งถิ่นฐาน", "ฮีโร่"]; //กอลส์
		aLangTransModel= ["โมเดลผสม", "อาหารเท่านั้น", "ทรัพยากรเท่านั้น", "โมเดลซ่อม"];
		aLangStringt   = ["บ้านรับสมัคร", "ขนส่งอัตโนมัติ", "ค้าขายอัตโนมัติ", "ผู้ชายธุรกิจ", "จาก", "ถึง", "ขนส่งโดย", "เวลาซ้ำ", "นาที", "วินาที", "เวลาขนส่ง:", "เวลา", "เวลาของการขนส่งครั้งต่อไป:", "ได้ถูกเพิ่มเรียบร้อยแล้ว", "ได้ถูกเริ่มเรียบร้อยแล้ว", "มีผู้ชายธุรกิจไม่เพียงพอ", "การขนส่งผิดพลาด", "ตารางหลังหลังจาก", "ทรัพยากรข้าว: ", "ค้าขายอัตโนมัติได้ถูกทำแล้ว", "ค้าขายอัตโนมัติล้มเหลว", "ตำแหน่งทรัพยากร:", "ไม้", "โคลน", "เหล็ก", "ข้าว", "แบ่งเท่ากัน", "โมเดลแบ่ง:", "คำเตือน: การเปลี่ยนหมู่บ้านทรัพยากรเป็นสิ่งที่เราไม่แนะนำ", "ใส่ 0 ถ้าคุณต้องการแบบแบ่งเท่ากันในกลุ่ม ไม้, โคลน และเหล็ก  ถ้าไม่เช่นนั้นก็ใส่หมายเลขอื่น", "นี่คือเวลาของเซิร์ฟเวอร์ของคุณ", "นี่คือเวลาท้องถิ่นของคุณ","บังคับการค้าในเวลาที่กำหนดเวลา (ไม่ต้องมีดีเลย์ในการตรวจสอบ)"];
		aLangUpdate = ["รุ่นของคุณดีกว่ารุ่นปัจจุบัน: ", "รุ่นปัจจุบันของคุณเป็นรุ่นล่าสุดในขณะนี้: ", "มีการปรับปรุงไหม่ที่คุณยังไม่ได้ทำ", "คุณต้องการปรับปรุงตอนนี้เลยไหม? "];
		aLangMenuOptions = ["ทราเวียน ", "ใช้เวลาของเซิร์ฟเวอร์", "ใช้เวลาของท้องถิ่น", "ตั้งค่าคู่แข่ง", "หน้าต่างงาน", "ตรวจสอบหาการปรับปรุง", "\nคุณจะให้เราเก็บข้อมูลการเพิ่มงานไว้ในหน้าต่างงานเท่าไรดีล่ะ?\n(ใส่ 0 ถ้าไม่ต้องการให้แสดงหน้าต่างงาน) \nปัจจุบัน: ", "\nคู่แข่งของคุณในเซิร์ฟเวอร์คือเผ่าอะไร?\n(ใส่ 0 สำหรับโรมันส์, 1 สำหรับทูทั่นส์, 2 สำหรับกอลส์.) \nปัจจุบัน: "];
		break;
	
	case "tr": //updated by sanalbaykus
		aLangBuildings = ["", "Oduncu", "Tuğla Ocağı", "Demir Madeni", "Tarla", "Kereste Fabrikası", "Tuğla Fırını", "Demir Dökümhanesi", "Değirmen", "Ekmek Fırını", "Hammadde deposu", "Tahıl Ambarı", "Silah Dökümhanesi", "Zırh Dökümhanesi", "Turnuva Yeri", "Merkez Binası", "Askeri Üs", "Pazar Yeri", "Elçilik", "Kışla", "Ahır", "Tamirhane", "Akademi", "Sığınak", "Belediye", "Köşk", "Saray", "Hazine", "Ticari Merkez", "Büyük Kışla", "Büyük Ahır", "Sur", "Toprak Siper", "Çit", "Taşcı", "Bira Fabrikası", "Tuzakçı", "Kahraman Kışlası", "Büyük Hammadde Deposu", "Büyük Tahıl Ambarı", "Dünya Harikası"];
		aLangTasks = ["Kurulacak bina", "Geliştirilecek Bina", "Asker gönder", "geliştir", "Yetiştir", "Party"];
		aLangStrings = ["Daha sonra KUR", "Daha Sonra GELİŞTİR", "Sonra Saldır", "Sonra araştır", "Bu işlemi sonra planla.", "Yapım başladı. ", "İşlem tanımlanamadı.", "Seviye", " İnşa edilemedi.", " Yükseltilemedi.", "İşlem sıraya alındı.", "Saatlik üretim", "İşlemi şu an planlayamıyoruz.", "İşlem sıralama mümkün değildir!", "Sıradaki İşlemler", "Sil", "Daha sonra yolla", "Önce asker seçmelisiniz..", "Askerlerin gönderildiği yer ", "Askerler yollanamadı", "Destek olarak", "Normal Saldırı olarak", "Yağmala olarak", "Mancınık hedefi", "Rastgele", "Şu an", "Yada bu zaman sonra", "saniye sonra", "dakika sonra", "saat sonra", "gün sonra", "Hammadde ve askerleri izle", "Asker ve defansı izle", "uzakta","Saldırı planı için adres girmediniz.","adres", "Sıralama Kriteri:", ".Tip.", " .Süre.", ".Hedef. ", "Ayarlar", ".Köy. ","Tamamlanan işlemler", "Geçmişi sil", "Araştırılıyor.", " Araştırılamadı.", "Sonra Geliştir.", "Casus", "Sonra yetiştir", "Askerler.", "Yetiştir", "Yetiştirme Başladı ", " Yetiştirme Başlamadı.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Lejyoner", "Pretoryan", "Emperyan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Koçbaşi", "Ateş Mancınığı", "Senator", "Göçmen", "Kahraman"]; //Romalılar
		aLangTroops[1] = ["Tokmak Sallayan", "Mızrakçı", "Balta Sallayan", "Casus", "Paladin", "Toyton", "Koçbaşı", "Mancınık", "Reis", "Göçmen", "Kahraman"]; //Cermenler
		aLangTroops[2] = ["Phalanx", "Kılıçlı", "Casus", "Toytatın Şimşeği", "Druyid", "Heduan", "Koçbaşı", "Mancınık", "Kabile Reisi", "Göçmen", "Kahraman"]; //Galyalılar
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Pazarcı", "From", "To", "TransportBy", "RepeatTime", "dakika", "saniye", "TransportTimes:", "kere", "Bir sonraki nakil zamanı:", "eklendi.", "başlatıldı.", "yeterli pazarcı yok.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Odun", "Tuğla", "Demir", "Tahıl", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "Bu server saati.", "Bu yerel saat.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Kullandığınız versiyon güncel olandan daha yüksek: ", "Kullandığınız versiyon güncel: ", "Bir güncelleme mevcut", "Hemen güncellemek ister misiniz? "];
		aLangMenuOptions = ["Travian ", "Server saatini kullan", "Yerel saati kullan", "Hakını seç", "Görev geçmişi", "Güncellemeleri kontrol et", "\nGörev geçmişinde kaç adet görev görüntülensin?\n(0 yazarsanız görev geçmişi devre dışı kalır.) \nŞu anda: ", "\nBu server'daki halkınız hangisi?\n(Romalılar için 0, Cermenler için 1, Galyalılar için 2.) \nŞu anda: "];
		break;


	case "tw":  //by syrade
		aLangBuildings = ["", "伐木場", "泥坑", "鐵礦場", "農田", "鋸木廠", "磚廠", "鋼鐵鑄造廠", "麵粉廠", "麵包店", "倉庫", "穀倉", "鐵匠", "盔甲廠", "競技場", "村莊大樓", "集結點", "市場", "大使館", "兵營", "馬廄", "工場", "研究院", "山洞", "村會堂", "行宮", "皇宮", "寶物庫", "交易所", "大兵營", "大馬廄", "城牆", "土牆", "木牆", "石匠鋪", "釀酒廠", "陷阱機", "英雄宅", "大倉庫", "大穀倉", "世界奇觀", "寶物庫", "放牧水槽"];
		aLangTasks = ["建築", "升級", "攻擊", "研發", "訓練", "Party"];
		aLangStrings = ["預定建築", "預定升級", "預定攻擊", "預定研發", "將此事項預定稍後執行.", "建築開始了 ", " 已嘗試但結果不明.", "等級", " 不能建築.", " 不能升級.", "此事項已預定稍後執行.", "目前生產:", "我們暫時不能預定稍後執行.", "不能預定稍後執行!", "已預定稍後執行項目", "删除", "稍後送出", "攻擊不能預定執行因為沒有選擇軍隊.","你的軍隊已送去", "你的軍隊不能送去", "支援", "攻擊", "搶奪", "投石車會瞄準", "隨機", "於", "或之後", "秒", "分", "時", "日", "偵察物資及軍隊", "偵察物資及防禦","不在", "攻擊無法預定執行,因為沒有指定目的地.", "at site no.", "分類以:", "類型", "時間", "目標 ", "選項", "村莊", "任務紀錄", "清除紀錄", "開始研發", "無法研發", "預定升級", "偵查", "預定訓練", "軍隊", "訓練", "開始訓練", "無法訓練"  , "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["古羅馬步兵", "禁衛兵", "帝國兵", "使者騎士", "帝國騎士", "將軍騎士", "衝撞車", "火焰投石機", "參議員", "開拓者", "英雄"]; //Romans
		aLangTroops[1] = ["棍棒兵", "矛兵", "斧頭兵", "偵察兵", "遊俠", "條頓騎士", "衝撞車", "投石車", "司令官", "開拓者", "英雄"]; //Teutons
		aLangTroops[2] = ["方陣兵", "劍士", "探路者", "雷法師", "德魯伊騎兵", "海頓聖騎", "衝撞車", "投石車", "族長", "開拓者", "英雄"]; //Gauls
		aLangTransModel= ["混合模式", "只有穀物", "只有資源", "固定模式"];
		aLangStringt   = ["募兵中心", "自動運輸", "自動交易", "商人", "從", "到", "由誰運輸", "重複間隔", "分", "秒", "運輸時間:", "次數", "下次運輸時間:", "已加入排程", "已經開始", "商人不夠喔", "運輸失敗", "預定在之後", "穀物: ", "自動交易完成", "自動交易失敗", "目標資源:", "木材", "磚塊", "鋼鐵", "穀物", "平均分配", "分配模式:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["哇賽你的版本比現有版本還新耶: ", "你的版本已是最新: ", "有新的更新可以下載", "你想要馬上更新嗎? "];
		aLangMenuOptions = ["Travian ", "使用伺服器時間", "使用電腦時間", "設定種族", "任務紀錄", "檢查更新", "\n任務紀錄最多要保持幾項？\n(0 代表取消任務紀錄) \n目前設定: ", "\n你所使用的種族是？\n(0 代表羅馬人, 1 代表 條頓人, 2 代表 高盧人) \n目前設定: "];
		break;
		
	case "ua": //by Rustle rs11[@]ukr.net
		aLangBuildings = ["", "Лісоповал", "Глиняний кар'єр", "Залізна копальня", "Ферма", "Деревообробний завод", "Цегляний завод", "Чавуноливарний завод", "Млин", "Пекарня", "Склад", "Зернова комора", "Кузня зброї", "Кузня обладунків", "Арена", "Головна будівля", "Пункт збору", "Ринок", "Посольство", "Казарма", "Стайня", "Майстерня", "Академія", "Схованка", "Ратуша", "Резиденція", "Палац", "Скарбниця", "Торгівельна палата", "Велика казарма", "Велика стайня", "Мур", "Земляний вал", "Палісад", "Каменетес", "Пивоварня", "Капканник", "Таверна", "Великий склад", "Велика зернова комора", "Диво світу"];
		aLangTasks = ["Побудувати", "Розвиток", "Атакувати", "Дослідити", "тренувати", "Party"];
		aLangStrings = ["Побудувати пізніше", "Розвити пізніше", "Атакувати пізніше", "Тренувати пізніше", "Запланувати задачу.", "Ми почали будівництво ", " ми спробували, але результат невідомий.", "рівень", " неможливо побудувати.", " неможливо розвинути.", "Задача запланована.", "Поточне виробництво:", "Ми не можемо планувати це зараз.", "Запланованої задачі не існує!", "Заплпновані задачі", "Видалити", "Відправити пізніше", "Атака не може бути запланована, оскільки війська не вибрані.", "Ваші війська були відправлені", "Ваші війська не можуть бути відправлені", "Підкріплення", "Атакувати", "Розбійницький набіг", "Какапульти націлені на", "Випадково", "в", "чи через", "секунд", "хвилин", "годин", "днів", "Розвідати ресурси та військо супротивника", "Розвідати оборонні споруди та військо супротивника", "Відсутнє", "Атака неможе бути запланована бо немає цілі.", "Поле №.", "Сортувати:", "тип ", "час ", "ціль ", "настройки ", "селище ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Легіонер", "Преторіанець", "Імперіанець", "Кінний розвідник", "Кіннота імператора", "Кіннота Цезаря", "Таран", "Вогняна катапульта", "Сенатор", "Поселенець", "Герой"]; //Римляни
		aLangTroops[1] = ["Дубинник", "Списник", "Сокирщик", "Скаут", "Паладин", "Тевтонський вершник", "Стінобитне знаряддя", "Катапульта", "Ватажок", "Поселенець", "Герой"]; //Тевтонці
		aLangTroops[2] = ["Фаланга", "Мечник", "Слідопит", "Тевтацький грім", "Друїд-вершник", "Едуйська кіннота", "Таран", "Катапульта", "Лідер", "Поселенець", "Герой"]; //Галли
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
	
	case "uk":
		aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Wheat Field", "Sawmill", "Brickyard", "Iron Foundry", "Flour Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armory", "Tournament Square", "Main Building", "Rally Point", "Marketplace", "Embassy", "Barracks", "Stable", "Siege Workshop", "Academy", "Cranny", "City Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"];
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train", "Party"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this Task for Later", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "The attack cannot be scheduled because no troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"]; //Romans
		aLangTroops[1] = ["Maceman", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"]; //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;
	
	case "us":  //by m4rtini
		aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Wheat Field", "Sawmill", "Brickworks", "Iron Foundry", "Flour Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armory", "Tournament Square", "Main Building", "Rally Point", "Marketplace", "Embassy", "Barracks", "Stable", "Siege Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder of the World", "Horse Drinking Trough", "Treasure Chamber"]; 
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train", "Party"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this Task for Later", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "train later", "troops.", "Train", "We started training ", " cannot be trained.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

 	case "vn" : // by botayhix
		aLangBuildings = ["", "Tiều phu", "Mỏ Đất sét", "Mỏ sắt", "Ruộng lúa", "Xưởng Gỗ", "Lò Gạch", "Lò Rèn", "Nhà Xay Lúa", "Lò Bánh", "Nhà Kho", "Kho Lúa", "Thợ Rèn", "Lò Luyện Giáp", "Võ Đài", "Nhà Chính", "Binh Trường", "Chợ", "Đại Sứ Quán", "Trại Lính", "Chuồng Ngựa", "Xưởng", "Học Viện", "Hầm Ngầm", "Toà Thị Chính", "Lâu Đài", "Cung Điện", "Kho Bạc", "Phòng Thương Mại", "Doanh Trại Lớn", "Trại Ngựa", "Tường Thành", "Tường Đất", "Tường rào", "Thợ Xây Đá", "Quán Bia", "Hố Bẫy", "Lâu Đài Tướng", "Nhà Kho Lớn", "Kho Lúa Lớn", "Kỳ Quan", "Kho Bạc Lớn", "Tàu ngựa"];
		aLangTasks = ["Xây dựng công trình", "Nâng cấp", "Tấn Công", "Nghiên cứu", "Cướp Bóc", "Party"];
		aLangStrings = ["Xây Dựng Sau", "Nâng cấp sau", "Tấn công sau", "Nghiên cứu sau", "Kế hoạch", "Bắt đầu xây dựng ", " Không thành công.", "cấp", " Không thể xây dựng.", " Không thể nâng cấp.", "Nhiệm vụ trong kế hoạch.", "Hướng xây dựng:", "Chúng ta không thể thực hiện kế hoạch bây giờ.", "Kế hoạch không tồn tại!", "Kế hoạch nhiệm vụ", "Xoá", "Gửi Sau", "Không có quân nào được chọn.", "Quân của bạn được gửi đến", "Quân của bạn không được gửi đi", "Tiếp viện", "Tấn Công", "Cướp bóc", "Máy bắn đá tấn công vào", "Ngẫu nhiên", "Tại", "Hoặc sau đó", "Giây", "Phút", "Giờ", "Ngày", "Do thám tài nguyên và quân đội", "Do thám quân đội và phòng thủ", "Khoảng cách", "Cuộc tấn công không thể thực hiện do đích đến không đúng.", "Vị trí.", "Sort by:", "Kiểu_ ", "thời gian ", "Mục tiêu: ", "Lựa chọn ", "Làng_ ", "Task History", "Xoá history", "Bắt đầu thực hiện ", " Không thể thực hiện.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Lính Lê Dương", "Thị Vệ", "Chiến Binh Tinh Nhuệ", "Kỵ binh do thám", "Kỵ Binh", "Kỵ Binh Tinh Nhuệ", "Xe Công Thành", "Máy Phóng Lửa", "Nguyên Lão", "Dân Khai Hoang", "Hero"]; //Romans
		aLangTroops[1] = ["Lính Chuỳ", "Lính Giáo", "Lính Rìu", "Do Thám", "Hiệp sĩ Paladin", "Kỵ sĩ Teutonic", "Đội Công Thành", "Máy Bắn Đá", "Thủ Lĩnh", "Dân Khai Hoang", "Hero"]; //Teutons
		aLangTroops[2] = ["Lính Pha Lăng", "Kiếm Sĩ", "Do Thám", "Kỵ Binh Sấm Sét", "Tu Sĩ", "Kỵ Binh", "Máy Nện", "Máy Bắn Đá", "Tù Trưởng", "Dân Khai Hoang", "Hero"]; //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

	
	case "en": //Updated by COKEDUDE
	case "com":
	default: // default is english
		aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder", "Treasure Chamber", "Horse Drinking Pool"];
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train", "Party"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this Task for Later", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "train later", "troops.", "Train", "We started training ", " cannot be trained.", "Party Later", " but not today.", "We started to "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		aLangTransModel= ["MixedModel", "FoodOnly", "ResourceOnly", "FixedModel"];
		aLangStringt   = ["RecruitHome", "AutoTransport", "AutoTrade", "Businessmen", "From", "To", "TransportBy", "RepeatTime", "minutes", "seconds", "TransportTimes:", "times", "The Time Of Next Transport:", "has been added.", "has been started.", "has not enough businessmen.", "transport error.", "Schedule later after", "Corn Resource: ", "Autotrade has done.", "Autotrade failed.", "Target Resource:", "Wood", "Clay", "Iron", "Crop", "Division Equal", "Division Model:", "WARN: Chang source village is not recommend.", "Keep ZERO if you want to division equal among wood, clay and iron. fill the number otherwise.", "This is the server time.", "This is your local time.","Force Trade On Scheduled Time (no delay check)"];
		aLangUpdate = ["Your version is greater then current version: ", "Your current version is up to date: ", "There is an update available", "Do you want to update now? "];
		aLangMenuOptions = ["Travian ", "Use server time", "Use local time", "Set your race", "Task History", "Check Updates", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", "\nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: "];
		break;

		
	}
}

/*********************
 *	Custom log function
 *********************/
function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1)
		GM_log(msg);
}

/**************************************************************************
 * Performs some initial checkings on conditions that have to be met to run the script
 * @return true if initialization was successfull, false otherwise
***************************************************************************/
function initialize() {
	if (typeof GM_getValue == "undefined") {
        alert('This script requires Greasemonkey v0.3 or newer, please upgrade to latest version!');
        _log(0, "The current version of Greasemonkey is too old");
        return false;
    }
    if (sCurrentServer != "") {
        return true;
    }
    // check what Travian server we're using
	var server = location.hostname;	
    if (server) {
        sCurrentServer = server + "_";
        _log(1, "using settings for server '" + server + "'");
        return true;
    } else {
         _log(0, "ERROR, unknown Travian server!");
        return false;
    }    
}

/**************************************************************************
 * Detects the server so we can figure out the language used
 * @returns the servers location
 **************************************************************************/
function detectServer() {
	var server = location.hostname;
	var ext = server.substring(server.lastIndexOf('.') + 1);
	return ext;
}

function checkSetTasks() {
		_log(2, "Checking set tasks...");
		_log(3, "oIntervalReference " + oIntervalReference);
	
	if(bLocked) {
			_log(3, "The TTQ_TASKS variables is locked. We are not able to write it.");
		return false;
	}
	
	bLocked = true;	
	var data = getVariable("TTQ_TASKS");
	if(data == '') {  // no tasks are set
			_log(2, "No tasks are set. ");
		// stop checking, it would be pointless. Checking will be restarted when new tasks are set.
		if(oIntervalReference) {
			_log(3, "clearInterval()");
			window.clearInterval(oIntervalReference);
			oIntervalReference = null;
		}
		bLocked = false;
		return false;
	}	
	
	// Times: Server or Local?
	if(bUseServerTime) {
		var iServerTimestamp = getServerTime(true);
		if(iServerTimestamp == false) {  //error
				_log(2, "Unable to determine server's time. We can't trigger any tasks without this. Consider switching to using local time.");
			return false;
		}
		var oDate = new Date(iServerTimestamp);
	} else {  //local
		var oDate = new Date();
	}
	
	var aTasks = data.split("|");
	var bTaskDeleted = false;
	for(var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");
		
		// The stored time (Unix GMT time) should be compared against the GMT time, not local!
		if(aThisTask[1] <= oDate.getTime()/1000) {
				_log(2, "Triggering task: " + aTasks[i]);
			triggerTask(aThisTask);
			aTasks.splice(i, 1);  //delete this task
			bTaskDeleted = true;
		} else if( (aThisTask[0] < 2) && (aThisTask[1] <= ((oDate.getTime()/1000) + iPreloadTime)) ) {  //prefetch the code if the task is to be triggered in less than iPreloadTime
				_log(2, "Some building/upgrading task is set, but it is not the time yet. It is time to preload the code though.");
				getCode(aThisTask[2], aThisTask[4]);
			
		} else {
				_log(2, "Some task is set, but it is not the time yet.");
			//refresh the session if needed
			var sLastRefreshed = getOption('LAST_REFRESH', 0, "integer");	
			var iRandomMultiplier = (Math.random() < 0.5) ? 1 : -1;
			var iRandomMilliSeconds = iRandomMultiplier * 60000 * Math.round(10 * Math.random());  //for randomizing the refresh times (the scatter will be +/- 10 minutes)
			if(sLastRefreshed != '' && (iSessionRefreshRate > 0) && (sLastRefreshed + (iSessionRefreshRate * 60000) + iRandomMilliSeconds )  < oDate.getTime() ) {
					_log(2, "Refreshing the session...");
				get("dorf1.php", null, null)
				setOption('LAST_REFRESH', oDate.getTime() );
			}
		}
	}
	
	// rewrite stored tasks if any task was deleted
	if(bTaskDeleted) {
		refreshTaskList(aTasks);
			_log(3, "Rewriting task list");
			_log(3, "aTasks " + aTasks);
		data = aTasks.join("|"); 
			_log(3, "New task list: " + data);
		setVariable("TTQ_TASKS", data);
	}
	bLocked = false;
}

function refreshTaskList(aTasks) {
		_log(3,"Begin refreshTaskList()");
	// Remove old task list
	var oOldTaskList = $("ttq_tasklist");
	if(oOldTaskList) {document.body.removeChild(oOldTaskList)};
	
	//if there are no tasks set, return
	if(!aTasks || aTasks.length < 1) {
		return;
	}
	var sTime = "";	
	
	//Create new tasklist
	var oTaskList = document.createElement('div');
	oTaskList.id = "ttq_tasklist";
	oTaskList.innerHTML = "<div id='ttq_draghandle' class='handle ttq_draghandle' >"+aLangStrings[14]+"</div>";
	
	//Sort links
	var currentSort = getOption("TASKLIST_SORT", 1, "integer");
	var sortLinkWrapper = document.createElement("div");
	sortLinkWrapper.innerHTML += "<span class='ttq_sort_header'>&raquo; " +aLangStrings[36]+ "</span> ";
	var sortKeys = [37, 38, 39, 40, 41];  //order is important
	sortKeys.forEach(function(el) {
			var sortLink = document.createElement("a");
			sortLink.innerHTML = " | " + aLangStrings[el];
			sortLink.className = (currentSort == el) ? "ttq_sortlink_active" : "ttq_sortlink";
			sortLink.href = "#";
			sortLink.addEventListener("click", function(ev) {
				orderList(el, "ttq_task_row"); 
				setOption("TASKLIST_SORT", el);
				var siblings = ev.target.parentNode.childNodes;
				for(var j = 0; j < siblings.length; j++) {
					if(siblings[j].nodeName == "A") {siblings[j].className = "ttq_sortlink";}
				}
				ev.target.className = "ttq_sortlink_active";
			}, false);
			sortLinkWrapper.appendChild(sortLink);
			oTaskList.appendChild(sortLinkWrapper);
			sortLink = null;	
		}
	);
	//position the list	
	var listCoords = getOption("LIST_POSITION", "0px_687px");
	listCoords = listCoords.split("_");
	oTaskList.style.top = listCoords[0];
	oTaskList.style.left = listCoords[1];
	document.body.appendChild(oTaskList);

	makeDraggable($('ttq_draghandle'));
	
	//get the server time offset once
	if(bUseServerTime) {
		var iServerTimeOffset = getServerTimeOffset();
	}

	for(var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");
		
		//format the task time properly
		if(bUseServerTime) {			
			//create timestamp for the tasktime offset to server time
			var iTaskServerTimestamp = ( parseInt(aThisTask[1]) + (iServerTimeOffset * 3600) ) * 1000;
			//create Date obj with this timestamp
			var oDate = new Date(iTaskServerTimestamp);
			//display the date without any further offsets
			//TODO: custom localized date format: Wednesday, November 14, 2007 20:49:09
			var sTime = oDate.toGMTString();
			sTime = sTime.substring(0, sTime.length - 4);
			sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_tasktime_" +i+ "' title='This is the server time.' ttq_taskid='" +i+ "' >" + sTime + "</span>";
		} else {  //local time
			var oDate = new Date( parseInt(aThisTask[1]) * 1000 );	
			var sTime = "<span style='color:black; cursor:pointer;' id='ttq_tasktime_" +i+ "' title='This is your local time.' ttq_taskid='" +i+ "' >" + oDate.toLocaleString() + "</span>";
		}			
		
		var oDeleteLink = document.createElement('a');
		oDeleteLink.innerHTML = "<img src='" +sDeleteBtn+ "' alt='X'/>";
		oDeleteLink.href = "#";
		oDeleteLink.title = aLangStrings[15];
		oDeleteLink.setAttribute("itaskindex", i);
		oDeleteLink.addEventListener('click',	deleteTask, false);
		
		var oTaskRow = document.createElement("div");
		oTaskRow.id = "ttq_task_row_" +i;
		oTaskRow.setAttribute("tasktype", aThisTask[0]);
		oTaskRow.setAttribute("timestamp", aThisTask[1]);
		oTaskRow.setAttribute("tasktarget", aThisTask[2]);
		oTaskRow.setAttribute("taskoptions", aThisTask[3]);
		oTaskRow.setAttribute("villagedid", aThisTask[4]);
		
		var sTaskSubject = "";
		var sTask = "";
		var sTaskMoreInfo = "";
		switch(aThisTask[0]) {
			case "0":  //build
			case "1":  //upgrade
				sTaskSubject = aLangBuildings[aThisTask[3]];
				sTask = aLangTasks[aThisTask[0]];
				sTaskMoreInfo = aLangStrings[35] + " " +aThisTask[2];
				break;
			case "2":  //attack
				//sTaskSubject = aThisTask[2];
				sTaskSubject = '<span id="ttq_placename_' +aThisTask[2]+ '">' + getPlaceName(aThisTask[2]) + '</span>';
				if(sTaskSubject == '') {sTaskSubject = aThisTask[2]};
				var aTroops = aThisTask[3].split("_");
				if(onlySpies(aTroops)) { 
					sTask = aLangStrings[47]; 
				} else {
					var iIndex = parseInt(aTroops[0]) + 18; 
					if(iIndex == 20) sTask = aLangStrings[20];
					if(iIndex == 21) sTask = aLangStrings[21];
					if(iIndex == 22) sTask = aLangStrings[22];
				}				
				sTaskMoreInfo = getTroopsInfo(aTroops);
				break;
			case "3":  //research
				sTaskSubject = aLangTroops[iMyRace][aThisTask[3]-1];
				sTask = aLangTasks[3];
				break;
			case "4":  //train
				var aTroops = aThisTask[3].split("_");
				sTaskSubject = getTroopsInfo(aTroops);
				sTask = aLangTasks[4];
				break;
				
			case "5":  //research
				sTaskSubject = aLangTroops[53];
				sTask = aLangTasks[5];
				break;
				
			default:
				break;
		}	
		
		var sVillageName = '';
		if(aThisTask[4] != 'null') {
			sVillageName = " &mdash; " +getVillageName(aThisTask[4]);
		}
		
		oTaskRow.innerHTML = "<span class='ttq_time_village_wrapper' style='display:inline !important;'>" +sTime + "<span class='ttq_village_name'>" + sVillageName+ "</span>" + ":</span> <span title='" +sTaskMoreInfo+ "' style='cursor:help;' >" +sTask+ " " +sTaskSubject+ " </span></span>";
		
		oTaskRow.appendChild(oDeleteLink);
		oTaskList.appendChild(oTaskRow);
		//add listener for editing times in the task list
		var oTaskTimeSpan = $("ttq_tasktime_"+i);
		oTaskTimeSpan.addEventListener("click", editTime, false);
		oDeleteLink = null;
		oTaskRow = null;
		oDate = null;
	}
	orderList(currentSort, "ttq_task_row");
		_log(3, "End refreshTaskList()");
}

function refreshHistory(aTasks) {
		_log(3, "Begin refreshHistory()");
	// Remove old history
	var oOldHistory = $("ttq_history");
	if(oOldHistory) {document.body.removeChild(oOldHistory)};
	
	//if there are no tasks in the history, return
	if(!aTasks || aTasks.length < 1) {
		return;
	}
	var sTime = "";	
	
	//Create new tasklist
	var oHistory = document.createElement('div');
	oHistory.id = "ttq_history";
	oHistory.innerHTML = "<div id='ttq_history_draghandle' class='handle ttq_draghandle' >"+aLangStrings[42]+"</div>";
	
	//position the list	
	var listCoords = getOption("HISTORY_POSITION", "200px_687px");
	listCoords = listCoords.split("_");
	oHistory.style.top = listCoords[0];
	oHistory.style.left = listCoords[1];
	document.body.appendChild(oHistory);

	makeDraggable($('ttq_history_draghandle'));		
	
	//get the server time offset once
	if(bUseServerTime) {
		var iServerTimeOffset = getServerTimeOffset();
	} else {
		var iServerTimeOffset = false;
	}

	for(var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");		
		oHistory.appendChild( makeHistoryRow(aThisTask, i, iServerTimeOffset) );	
		var oTaskTimeSpan = $("ttq_history_tasktime_" +i);
		if(oTaskTimeSpan) { oTaskTimeSpan.addEventListener("click", editTime, false); }
	}
	
	orderList(38, "ttq_history_row"); 	
	
	//flush link
	var oFlushLink = document.createElement('a');
	oFlushLink.id = 'ttq_flush_history';
	oFlushLink.innerHTML = aLangStrings[43];
	oFlushLink.href = '#';
	oHistory.appendChild(oFlushLink);
	oFlushLink.addEventListener('click', flushHistory, false);
}

function makeHistoryRow(aTask, index, iServerTimeOffset) {
			_log(3,"Begin makeHistoryRow()");
		if(bUseServerTime && iServerTimeOffset != false) {			
			//create timestamp for the tasktime offset to server time
			var iTaskServerTimestamp = ( parseInt(aTask[1]) + (iServerTimeOffset * 3600) ) * 1000;
			var oDate = new Date(iTaskServerTimestamp);
			var sTime = oDate.toGMTString();
			sTime = sTime.substring(0, sTime.length - 4);
			sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_history_tasktime_" +index+ "' title='This is the server time.' ttq_taskid='" +index+ "' >" + sTime + "</span>";
		} else {  //local time
			var oDate = new Date( parseInt(aTask[1]) * 1000 );	
			var sTime = "<span style='color:black; cursor:pointer;' id='ttq_history_tasktime_" +index+ "' title='This is your local time.' ttq_taskid='" +index+ "' >" + oDate.toLocaleString() + "</span>";
		}		
	
		var oHistoryRow = document.createElement("div");
		oHistoryRow.id = "ttq_history_row_" +index;
		oHistoryRow.className = "ttq_history_row";
		oHistoryRow.setAttribute("tasktype", aTask[0]);
		oHistoryRow.setAttribute("timestamp", aTask[1]);
		oHistoryRow.setAttribute("tasktarget", aTask[2]);
		oHistoryRow.setAttribute("taskoptions", aTask[3]);
		oHistoryRow.setAttribute("villagedid", aTask[4]);
		
		var sTaskSubject = "";
		var sTask = "";
		var sTaskMoreInfo = "";
		switch(aTask[0]) {
			case "0":  //build
			case "1":  //upgrade
				sTaskSubject = aLangBuildings[aTask[3]];
				sTask = aLangTasks[aTask[0]];
				sTaskMoreInfo = aLangStrings[35] + " " +aTask[2];
				break;
			case "2":  //attack
				sTaskSubject = '<span id="ttq_placename_history_' +aTask[2]+ '">' + getPlaceName(aTask[2]) + '</span>';
				if(sTaskSubject == '') {sTaskSubject = aTask[2]};
				var aTroops = aTask[3].split("_");
				if(onlySpies(aTroops)) { 
					sTask = aLangStrings[47]; 
				} else {
					var iIndex = parseInt(aTroops[0]) + 18; 
					if(iIndex == 20) sTask = aLangStrings[20];
					if(iIndex == 21) sTask = aLangStrings[21];
					if(iIndex == 22) sTask = aLangStrings[22];
				}
				sTaskMoreInfo = getTroopsInfo(aTroops);
				break;
			case "3":  //research
				sTaskSubject = aLangTroops[iMyRace][aTask[3]-1];
				sTask = aLangTasks[aTask[0]];
				break;
			case "4":
				sTaskSubject = getTroopsInfo(aTask[3].split("_"));
				sTask = aLangTasks[4];
				break;				
			case "5":
				sTaskSubject = aLangTroops[53];
				sTask = aLangTasks[5];
				break;				
			default:
				break;
		}	
		
		var sBgColor = (aTask[5] == "true") ? "#90FF8F" : "#FFB89F"; 
		oHistoryRow.style.backgroundColor = sBgColor;
		
		var sVillageName = '';
		if(aTask[4] != 'null') {
			sVillageName = " &mdash; " +getVillageName(aTask[4]);
		}
		
		oHistoryRow.innerHTML = "<span class='ttq_time_village_wrapper' style='display:inline !important;'>" +sTime + "<span class='ttq_village_name'>" +sVillageName+ "</span>" + ":</span> <span title='" +sTaskMoreInfo+ "' style='cursor:help;' >" +sTask+ " " +sTaskSubject+ " </span></span>";	
		oDate = null;
		return oHistoryRow;	
}

/**************************************************************************
 * @param iORderBy: 0 - tasktype, 1 - timestamp, 2 - target, 3 - options, 4 - villagedid
 ***************************************************************************/
function orderList (iOrderBy, sRowId) {
	var rows = xpath('//div[contains(@id, "' +sRowId+ '")]');
	if(rows.snapshotLength > 0) {
		switch(iOrderBy) {
			case 37:			
				var sortKey = "tasktype";
				break;
			case 39:
				var sortKey = "target";
				break;
			case 40:
				var sortKey = "options";
				break;
			case 41:
				var sortKey = "villagedid";
				break;
			case 38:
			default:
				var sortKey = "timestamp";
				break;
		}
		var keyValue = "";
		var aRows = [];
		for(var i = 0; i < rows.snapshotLength; i++) {
			keyValue = rows.snapshotItem(i).getAttribute(sortKey);
			aRows.push([keyValue, rows.snapshotItem(i)]);
		}
		aRows.sort(sortArray);
		switch(sRowId) {
			case "ttq_history_row":
				aRows.forEach(processSortedHistory);
				break;
			case "ttq_task_row":
			default:
				aRows.forEach(processSortedTaskList);
				break;
		}
		return false;
	} else {
		return;
	}

}

function sortArray(arr1,arr2) { 
	return arr1[0] - arr2[0];
}

function processSortedTaskList(element) {
	$("ttq_tasklist").appendChild(element[1]);
}
function processSortedHistory(element) {
	$("ttq_history").appendChild(element[1]);
}

function editTime(ev) {
	var oTaskRow = ev.target.parentNode.parentNode;
	var type = parseInt(oTaskRow.getAttribute("tasktype"));
	var timestamp = oTaskRow.getAttribute("timestamp");
	var target = oTaskRow.getAttribute("tasktarget");
	var options = oTaskRow.getAttribute("taskoptions").split("_");;
	var villagedid = oTaskRow.getAttribute("villagedid");  //not supported yet. The new task will have did of currently active village.
	displayTimerForm(type, target, options, timestamp);
}

function deleteTask(e) {
		_log(3,"Begin deleteTask()");
	var iTaskIndex = e.target.parentNode.getAttribute("itaskindex");
		_log(2, "Deleting task "+iTaskIndex);	

	if(bLocked) {
			_log(3, "The TTQ_TASKS variables is locked. We are not able to write it.");
		return false;
	}
	bLocked = true;
	var data = getVariable("TTQ_TASKS");
	if(data == '') {	
			_log(2, "No tasks are set. ");
		bLocked = false;
		return false;  // no tasks are set
	}
	var aTasks = data.split("|");
	aTasks.splice(iTaskIndex, 1);  //delete this task
	data = aTasks.join("|"); 
	setVariable("TTQ_TASKS", data);
	bLocked = false;
	refreshTaskList(aTasks);
	return false;  // we return false to override default action on the link
		_log(3, "End deleteTask()");
}

/**************************************************************************
  * Schedules the specified task. The task is stored in a variable. 
  * @param iTask: name of the task (0-build, 1-upgrade, 2-attack, 3-research, 4-train)
  * @param iWhen: date when the task is to be triggered
  * @param target: iBuildingId, or iVillageId 
  * @param options: what to build, what units to send attacking (first member specifies the type of attack: 0-support, 1-normal attack, 2-raid).
  ***************************************************************************/
function setTask(iTask, iWhen, target, options) {
	var iVillageId = getActiveVillage();

	if(bLocked) {
			_log(3, "The TTQ_TASKS variables is locked. We are not able to write it.");
		return false;
	}
	
	bLocked = true;
	var data = getVariable("TTQ_TASKS");
	var oldValue = (data == null || data.length <= 1 || data == '') ? '' : data + '|';
	var newValue = oldValue + iTask + ',' + iWhen + ',' + target + ',' + options;
	if(iVillageId) {
		newValue += ',' + iVillageId;
	} else {
		newValue += ',' + 'null';
	}
		_log(2, "Writing task list: "+newValue);
		
	if(!setVariable("TTQ_TASKS", newValue)) {
		printMsg("<span class='ttq_village_name' style='display:block;'>" +getVillageName(iVillageId)+ "</span>" +aLangStrings[12], true);
		bLocked = false;
		return false;
	}
	bLocked = false;
	
	var aTasks = newValue.split("|");
	refreshTaskList(aTasks);	

	// Generate message
	var sTaskSubject = "";
	var sTask = "";
	switch(iTask) {
		case "0":  //build
		case "1":  //upgrade
			sTaskSubject = aLangBuildings[options];
			sTask = aLangTasks[iTask];
			break;
		case "2":  //attack
			sTaskSubject = '<span id="ttq_placename_' +target+ '">' +getPlaceName(target)+ '</span>';
			var aTroops = options.split("_");
			if(onlySpies(aTroops)) {
					sTask = aLangStrings[47]; 
			} else {
					var iIndex = parseInt(aTroops[0]) + 18; 
					if(iIndex == 20) sTask = aLangStrings[20];
					if(iIndex == 21) sTask = aLangStrings[21];
					if(iIndex == 22) sTask = aLangStrings[22];
			}
			break;
		case "3":  //research
			sTaskSubject = aLangTroops[iMyRace][options-1];
			sTask = aLangTasks[3];
			break;
		case "4":  //training
			var aTroops = options.split("_");
			sTaskSubject = getTroopsInfo(aTroops);
			sTask = aLangTasks[4];
			break;
		case "5":  //party
			sTaskSubject = aLangTroops[53];
			sTask = aLangTasks[5];
			break;
		default:
			break;
	}
	
	printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(iVillageId)+ '</span>' + aLangStrings[10] + '<br/><span style="font: italic 80%;">' +sTask+ ' ' +sTaskSubject+ '</span>');
	if(!oIntervalReference) {
		oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery);  //start checking if there is any task to trigger
		_log(2, "Started checking for the set tasks...");
	}
		_log(3, "End setTask()");
}

/**************************************************************************
 * Performs the supplied task. Prints the report.
 * @param aTask: [task, when, target, options]
 ***************************************************************************/
function triggerTask(aTask) {
		_log(3,"Begin triggerTask("+aTask+")");
	switch(aTask[0]) {
		case "0":
			//build new building
			build(aTask);
			break;
		case "1":
			//upgrade building
			upgrade(aTask);
			break;
		case "2":
			//attack
			attack(aTask);
			break;
		case "3":
			//research
			research(aTask);
			break;
		case "4":
			//train troops
			train(aTask);
			break;
		case "5":
			//party
			party(aTask);
			break;
			
		default:
			//do nothing
				_log(3, "Can't trigger an unknown task.");
			break;
	}
		_log(3, "End triggerTask("+aTask+")");
}

function build(aTask) {
		_log(3,"Begin build("+aTask+")");
	// we will assume that there is a correct up-to-date code in the variables
	var sCode = '';
	
	var sVariable = getVariable("TTQ_CODE_0");
	if(sVariable != '') {
			_log(3, "Building code found (TTQ_CODE_0)");
		var aVariable = sVariable.split(",");
		var iIndexOfVillageId = aVariable.indexOf(aTask[4]);
		if(iIndexOfVillageId > -1) {  //the village id found
			sCode = aVariable[iIndexOfVillageId + 1];
		}
	} else {
			_log(3, "No building code available (TTQ_CODE_0)");
	}
	//TODO: if the code is not there, or is there but incorrect, try to get a new one, register event listener, and start building when the code is updated (implement timeouts to this)
	if(sCode == '') {  // no code - no building possible
		_log(1, "No code found. Building this building is not possible.");
		printMsg("<span class='ttq_village_name' style='display:block;'>" +getVillageName(aTask[4])+ "</span>" + aLangBuildings[aTask[3]] + ''+ aLangStrings[8], true); // Your building can't be built.
		return false;
	}
	
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}
	
	var currentActiveVillage = getActiveVillage();
	var sUrl = "dorf2.php?";
	sUrl += "a=" +aTask[3]+ "&id=" +aTask[2]+ "&c=" +sCode + sNewDid; 
	var myOptions = [aTask, currentActiveVillage];	
	get(sUrl, handleRequestBuild, myOptions)
		_log(3, "End build("+aTask+")");
}

function upgrade(aTask) {
		_log(3,"Begin upgrade("+aTask+")");
		
	// try to load the code
	var sCode = '';
	var sVariable = getVariable("TTQ_CODE_1");
	if(sVariable != '') {
			_log(3, "Upgrading code found (TTQ_CODE_1)");
		var aVariable = sVariable.split(",");
		var iIndexOfVillageId = aVariable.indexOf(aTask[4]);
		if(iIndexOfVillageId > -1) {  //the village id found
			sCode = aVariable[iIndexOfVillageId + 1];
		}
	} else {
		_log(3, "No upgrading code found (TTQ_CODE_1)");
	}	
	
	if(sCode == '') {  // no code - no building possible
		_log(1, "No code found. Upgrading this building is not possible.");
		printMsg("<span class='ttq_village_name' style='display:block'>" +getVillageName(aTask[4])+ "</span>" + aLangBuildings[aTask[3]] + ''+aLangStrings[9], true); // Your building can't be built.
		return false;
	}
	
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}
	
	if(aTask[3] < 19) {  //it's resource site
		var sUrl = "dorf1.php?";
	} else {
		var sUrl = "dorf2.php?";
	}
	
	var currentActiveVillage = getActiveVillage();
	sUrl += "a=" +aTask[2]+ "&c=" +sCode + sNewDid; 
		_log(3, "" + sUrl);
	var myOptions = [aTask, currentActiveVillage];	
	get(sUrl, handleRequestBuild, myOptions)
		_log(3, "End upgrade("+aTask+")");
}

function attack(aTask) {
		_log(3,"Begin attack("+aTask+")");
		
	var aTroops = new Array();  //extract troops numbers and attack type
	aTroops = aTask[3].split("_");
	var iAttackType = aTroops[0];
	var sParams = "id=39&c=" +iAttackType+ "&kid=" +aTask[2]+ "&a=12345";  //TODO: "a" parameter may need to be specified
	for(var i = 1; i <= 11; i++) {
		sParams += "&t" +i+ "=" +aTroops[i];
	}	
	
	//Target for catapults
	if(aTroops[8] > 0) {			
		if(aTroops[12]) {
			sParams += "&kata=" +aTroops[12];
		} 
		if(aTroops[13]) {
			sParams += "&kata2=" +aTroops[13];
		}		
	}
	
	//Spying missions
	var iScoutUnit = getOption("SCOUT_UNIT", false, "integer");
	if(iScoutUnit != 3 && iScoutUnit != 4) {  //3 or 4 are the only valid values
			_log(2, "Unknown iScoutUnit. Unable to proceed with sending this attack.");
			return false;
	}
	if(aTroops[iScoutUnit] > 0 && onlySpies(aTroops) && iAttackType > 2) {  
			_log(3, "We are sendings scouts.");		
		if(aTroops[12]) {
			var iScoutMode = aTroops[12];
		} else {
			var iScoutMode = 1;  //"Spy troops  and resources" by default	
		}
		sParams += "&spy=" +iScoutMode;
	}
	
		_log(3, "sParams\n"+sParams);	
		
	if(aTask[4] != 'null') {  //multiple villages
		//we need to switch village
			_log(2, "Switching to village:" +aTask[4]);
		var currentActiveVillage = getActiveVillage();
		var myOptions = [aTask, currentActiveVillage];
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", "a2b.php?newdid=" + aTask[4], true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) { // ok
						_log(2, "Village switched to " +aTask[4]);
					post("a2b.php", sParams, handleRequestAttack, myOptions);
						_log(2, "The attack was requested.");
				}
			}
		};
		httpRequest.send(null);		
	} else {  //only 1 village. Perform attack immediately
		var myOptions = [aTask, false];
		post("a2b.php", sParams, handleRequestAttack, myOptions);
			_log(2, "The attack was requested.");
	}	
		_log(3, "End attack("+aTask+")");
}

function research(aTask) {
		_log(3,"Begin research("+aTask+")");
		
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}	
	var currentActiveVillage = getActiveVillage();
	var sUrl = "build.php?id=" + aTask[2] + "&a=" + aTask[3] +  sNewDid; 
	var myOptions = [aTask, currentActiveVillage];
	get(sUrl, handleRequestResearch, myOptions);
		_log(3, "End research("+aTask+")");
}

function party(aTask) {
		_log(3,"Begin party("+aTask+")");
		
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}	
	var currentActiveVillage = getActiveVillage();
	var sUrl = "build.php?id=" + aTask[2] + "&a=" + aTask[3] +  sNewDid; 
	var myOptions = [aTask, currentActiveVillage];
	get(sUrl, handleRequestParty, myOptions);
		_log(3, "End research("+aTask+")");
}

function train(aTask) {
		_log(0,"Begin train("+aTask+")");
	 
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}
	var currentActiveVillage = getActiveVillage();
	var sParams = "id=" +aTask[2]+ "&a=2";
	var aTroops = aTask[3].split("_");
	if(aTroops.length > 1) {
		sParams += "&z=" + aTroops[0];
		for(var i = 1; i < 11; i++) {
			if(aTroops[i] > 0) { sParams += "&t" + i + "=" + aTroops[i]; }
		}
	} else {
			_log(0, "No troops specified. Exiting function.");
		return;
	}
		_log(0, sParams);
	
	var myOptions = [aTask, currentActiveVillage];
	if(aTask[4] != 'null') {  //multiple villages
		//we need to switch village
			_log(0, "Switching to village:" +aTask[4]);
		//var currentActiveVillage = getActiveVillage();
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", "dorf1.php?newdid=" + aTask[4], true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) { //complete
				if (httpRequest.status == 200) { // ok
						_log(0, "Village switched to " +aTask[4]);
						_log(0, "sParams " +sParams);
						_log(0, "handleRequestTrain " +handleRequestTrain);
						_log(0, "myOptions " +myOptions);
					post("build.php", sParams, handleRequestTrain, myOptions);
						_log(0, "The training was requested.");
				}
			}
		};
		httpRequest.send(null);		
	} else {  //only 1 village
		post("build.php", sParams, handleRequestTrain, myOptions);
			_log(0, "Training was requested.\n" + sParams);
	}
		_log(0, "End train("+aTask+")");
}

/**************************************************************************
 * @param options: [aTask, iCurrentActiveVillage] (optional)  OR sNewdid in case of finding the code for construction.
 ***************************************************************************/
function get(url, callback, options) {
	var httpRequest = new XMLHttpRequest();
	if(callback) {
		httpRequest.onreadystatechange = function() { 
				callback(httpRequest, options); 
		};
	}
	httpRequest.open("GET", url, true);	
	httpRequest.send(null);
}

function post(url, data, callback, options) {
	var httpRequest = new XMLHttpRequest();
	data = encodeURI(data);
	httpRequest.open("POST", url, true);
	httpRequest.onreadystatechange = function() {
		callback(httpRequest, options)
	};
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", data.length);
	httpRequest.setRequestHeader("Connection", "close");
	//httpRequest.overrideMimeType('text/html');
	httpRequest.overrideMimeType("application/xhtml+xml");
	httpRequest.send(data);
	//httpRequest.close();
}

function handleRequestBuild(httpRequest, options) {
		_log(3,"Begin handleRequestBuild("+httpRequest+", "+options+")");
	var aTask = options[0];
	var activateVillageDid = options[1];
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
				_log(3, "" + sResponse);
			if(!sResponse) {  // error retrieving the response				
				printMsg( aLangTasks[aTask[0]] + " " + aLangBuildings[aTask[3]] + ''+ aLangStrings[6], true );
				return;
			}
			var re = new RegExp('<td>' + aLangBuildings[aTask[3]], 'i');
			if(sResponse.match(re)) {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + aLangStrings[5] +' '+ aLangBuildings[aTask[3]]);  //Your building is being built.
				addToHistory(aTask, true);
			} else {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + aLangBuildings[aTask[3]] + ' ' + aLangStrings[8], true); // Your building can't be built.
				addToHistory(aTask, false);
			}
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
		if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
	}
		_log(3, "End handleRequestBuild("+httpRequest+", "+options+")");
}

function handleRequestAttack(httpRequest, options) {
		_log(3,"Begin handleRequestAttack("+httpRequest+", "+options+")");
	var aTask = options[0];
	var activateVillageDid = options[1];
	
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
				_log(3, sResponse);
			if(!sResponse) {  // error retrieving the response				
					_log(2, "We didn't get any response. Impossible to determine whether the attack was sent.");
				return;
			}			
			var sPlaceName = '<span id="ttq_placename_' + aTask[2] + '">' + getPlaceName(aTask[2]) + '</span>';			
			var re = new RegExp('karte\\.php\\?d=' + aTask[2], 'i');
			if(re.test(sResponse)) {
					_log(1, "It seems your attack was successfully sent.");
				printMsg(aLangStrings[18] + " " + sPlaceName);
				addToHistory(aTask, true);
			} else {
					_log(1, "Your attack could not be sent.");
				printMsg(aLangStrings[19] + " " +sPlaceName, true);
				addToHistory(aTask, false);				
			}			
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
		if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
		return;
	}
		_log(3, "End handleRequestAttack("+httpRequest+", "+options+")");
}

function handleRequestResearch(httpRequest, options) {
		_log(3,"Begin handleRequestResearch("+httpRequest+", "+options+")");
	var aTask = options[0];
	var activateVillageDid = options[1];
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			var sResponse = httpRequest.responseText;			
			if(!sResponse) { // error retrieving the response				
				printMsg( aLangTasks[aTask[0]] + ' ' + aTask[3] + ' ' + aLangStrings[5], true );
				return;
			}
			xpath("//form/table//td/img[contains(@class,'unit')]")
			var iUnit = (iMyRace == 0) ? aTask[3] : iMyRace + aTask[3];
			var re = new RegExp('class="s7">'+aLangTroops[iMyRace][aTask[3]-1], 'i');
			if(sResponse.match(re)) {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' +''+ aLangStrings[44] + aLangTroops[iMyRace][aTask[3]-1]);  
				addToHistory(aTask, true);
			} else {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + aLangTroops[iMyRace][aTask[3]-1] +''+ aLangStrings[45], true); 
				addToHistory(aTask, false);
			}		
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
		if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
	}
		_log(3, "End handleRequestResearch("+httpRequest+", "+options+")");
}

function handleRequestParty(httpRequest, options) {
		_log(3,"Begin handleRequestParty("+httpRequest+", "+options+")");
	var aTask = options[0];
	var activateVillageDid = options[1];
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			var sResponse = httpRequest.responseText;			
			if(!sResponse) { // error retrieving the response				
				printMsg( aLangTasks[aTask[0]] + ' ' + aTask[3] + ' ' + aLangStrings[5], true );
				return;
			}
			xpath("//form/table//td/img[contains(@class,'unit')]")
			//var iUnit = (iMyRace == 0) ? aTask[3] : iMyRace + aTask[3];
			var re = new RegExp('class="s7">'+aLangTroops[53], 'i');
			if(sResponse.match(re)) {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' +''+ aLangStrings[55] + aLangTroops[53]);  
				addToHistory(aTask, true);
			} else {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + aLangTroops[53] +''+ aLangStrings[54], true); 
				addToHistory(aTask, false);
			}		
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
		if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
	}
		_log(3, "End handleRequestParty("+httpRequest+", "+options+")");
}

function handleRequestTrain(httpRequest, options) {
		_log(0,"Begin handleRequestTrain("+httpRequest+", "+options+")");
	var aTask = options[0];
	var activateVillageDid = options[1];
	
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			var sResponse = httpRequest.responseText;
				_log(0, "" + sResponse);
			if(!sResponse) { // error retrieving the response				
				printMsg( aLangTasks[aTask[0]] + ' ' + aTask[3] + ' ' + aLangStrings[6], true );
				return;
			}
			var iUnit = (iMyRace == 0) ? aTask[3] : iMyRace + aTask[3];	
			var troopsInfo = getTroopsInfo(aTask[3].split("_"));
			var  troopsInfoN = troopsInfo.split(":")
			var re = new RegExp('class="s7">'+troopsInfoN[0], 'i');
			if(sResponse.match(re)) {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + ' ' + aLangStrings[51] + troopsInfo);  
				addToHistory(aTask, true);
			} else { 
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + troopsInfo + ' ' + aLangStrings[52], true); 
				addToHistory(aTask, false);
			}		
		} else { // failed
				_log(0, "HTTP request status: " + httpRequest.status);
		}
		if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
	}
		_log(0, "End handleRequestTrain("+httpRequest+", "+options+")");
}

function handleRequestFindCode(httpRequest, sNewdid) {
		_log(3,"Begin handleRequestFindCode("+httpRequest+", "+sNewdid+")");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
				_log(3, "" + sResponse);
			if(!sResponse) {
					_log(2, "We didn't get any response. Impossible to determine the code.");
				return false;
			}
			findCode(sResponse, sNewdid);  
			return false;			
			
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
	}
		_log(3, "End handleRequestFindCode("+httpRequest+", "+sNewdid+")");
}

function switchActiveVillage(did) {
		_log(2, "Switching your village back to " +did);
	if(!isInt(did)) {return;	}
	get("dorf1.php?newdid="+did, null, null);
}

/**************************************************************************
 *  Adds task to the log DIV.
 *  @param bSuccess: true if the task was successfully performed.
 ***************************************************************************/
function addToHistory(aTask, bSuccess) {
		_log(3, "Begin Adding to history...");
	if(iHistoryLength < 1) { return; }
	
	bLockedHistory = true;
	var data = getVariable("TTQ_HISTORY");
	
	if(data != '' && data.length > 0) {
		var oldValue = trimHistory(data, iHistoryLength-1) + "|";
	} else {
		var oldValue = '';
	}
	
	var newValue = oldValue + aTask[0] + ',' + aTask[1] + ',' + aTask[2] + ',' + aTask[3];
	if(aTask[4]) {
		newValue += ',' + aTask[4];
	} else {
		newValue += ',' + 'null';
	}
	newValue += ',' + bSuccess;
		_log(2, "Writing var TTQ_HISTORY: "+newValue);
	if(!setVariable("TTQ_HISTORY", newValue)) {
			_log(2, "Failed logging to history.")
	}
	bLockedHistory = false;	
	aTasks = newValue.split("|");
	refreshHistory(aTasks);
	return;
}

/**************************************************************************
 *  This only trims the value read from variables. Variable itself is trimmed when new event is entered into history.
 *  It trimms the value down to maxlength.
 ***************************************************************************/
function trimHistory(data, maxlength) {
	if(data != '' && data.length > 0) {
		//trim history as needed
		data = data.split("|");
		var excessTasks = data.length - maxlength;
		if(excessTasks >  0) {
			data.splice(0, excessTasks);
		}
		return data.join("|");
	}
	return data;
}

function flushHistory() {
	setVariable("TTQ_HISTORY", "");
	refreshHistory();
}

function createBuildLinks() {
		_log(2,"Begin createBuildLinks()");
	var iSiteId = getBuildingId();
	if(iSiteId == false) {return false;}
	var iTask = 0;  //the default action is build
	
	// Get the building name(s)
	var xpathRes = xpath("//h1");
	if(xpathRes.snapshotLength > 0) {  //standing building
		var xpathBuildingNames = xpath("id('content')//*[contains(@class, 'new_building')]");
		if(xpathBuildingNames.snapshotLength > 0) {
			var xpathBuildingNames = xpath("//h2");
		}
		if(xpathBuildingNames.snapshotLength > 0) {   //empty building site or error
			_log(3, "This is an empty building site.");
			var re = new RegExp("^([^0-9].*)", "i");  // Will be used later. For matching all except "X. Cranny"
			var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"
			_log(3, "Regular expressions (new site):\n" + re + "\n" + re2);
		} else {
			_log(3, "This is an existing building.");
			iTask = 1;
			var xpathBuildingNames = xpathRes;
			var re = new RegExp("(.*)\\s" + aLangStrings[7] + "\\s[0-9]{1,3}$", "i");  // Will be used later for matching buildings and resource sites
			var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"
		}
			_log(3, "Regular expressions (Can be built):\n" + re + "\n" + re2);
	}
	for (var i = 0; i < xpathBuildingNames.snapshotLength; ++i) {
		//search for building id
			_log(3, "Searching for building ID...");
		var sBuildingName = xpathBuildingNames.snapshotItem(i).innerHTML;  // this can contain level X string
		var aMatches = sBuildingName.match(re);
		if(aMatches) {  //Regular building
			sBuildingName = aMatches[1];
			sBuildingName = rtrim(sBuildingName);  //trim trailing spaces
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
				_log(3, "Building or resource site name found: \"" + sBuildingName +"\" \n"+ sBuildingId);
		} else if(aMatches = sBuildingName.match(re2)) {  // Cranny has different format (e.g. "3. Cranny")
			sBuildingName = aMatches[1];
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
				_log(3, "Cranny name found: " + sBuildingName +" \n"+ sBuildingId);
		}
		if(sBuildingId > 0) {
			// building found in the list			
			var oLink = document.createElement("a");
			oLink.id = "buildLater" + i;
			oLink.innerHTML = "<br />&ndash " + aLangStrings[iTask] + " &ndash";
			oLink.title = aLangStrings[4];
			oLink.href = "#";
			oLink.setAttribute("itask", iTask);
			oLink.setAttribute("starget", iSiteId);
			oLink.setAttribute("soptions", sBuildingId);
			oLink.addEventListener('click',	displayTimerForm, false);
			if(iTask == 0) {xpathBuildingNames.snapshotItem(i).appendChild(oLink);}
			else if(iTask == 1) {xpathBuildingNames.snapshotItem(i).nextSibling.nextSibling.appendChild(oLink);}
		} else {
			_log(3, "Building name found, but it was not identified in the building list.\n"+sBuildingName+"\n"+re);
		}
	}
		_log(2, "End createBuildLinks()");
}

function createAttackLinks() {
		_log(3,"Begin createAttackLinks()");
	var xpathResult = xpath("id('content')//input[@type='text']");
	if(xpathResult.snapshotLength < 1) {
			_log(3, "We are not creating the 'Send later' button here.");
		return false;
	}
		
	// create the submit button
	var oBtn = document.createElement("input");
	oBtn.type = "button";
	oBtn.value = aLangStrings[16];
	oBtn.style.margin = "0px 0px 0px 5px";
	oBtn.style.font ="bold 10px verdana,sans-serif";
	oBtn.style.border='1px solid #59D72F';
	oBtn.style.color="#868686";
	oBtn.addEventListener("click", scheduleAttack, false);
	
	var oOkBtn = document.getElementsByName('s1');
	oOkBtn[0].parentNode.appendChild(oBtn);
	
	//create textbox for hero if it's not present
	xpathResult = xpath("id('content')/table[1]/tbody/tr/td/table/tbody/tr[3]/td[8]");
	if(xpathResult.snapshotLength < 1) {  //no hero textbox - make one
		xpathResult = xpath("id('content')/table[1]/tbody/tr/td/table/tbody/tr[3]");
		if(xpathResult.snapshotLength > 0) {
			xpathResult.snapshotItem(0).lastChild.setAttribute("colspan", "3");
			//xpathResult.snapshotItem(0).innerHTML += '<td width="20"><img class="unit" src="img/un/u/hero.gif" title="" border="0" onclick="document.snd.t11.value=\'\'; return false;" ></td><td width="35"><input class="fm" type="Text" name="t11" value="" size="2" maxlength="6"></td><td class="f8 c b"><b>(' +aLangStrings[34]+ ')</b></td>';
			
			var oTd1 = document.createElement('td');
			var oTd2 = document.createElement('td');
			var oTd3 = document.createElement('td');
			oTd1.innerHTML = '<img class="unit" src="http://i51.photobucket.com/albums/f374/wantered/hero.png" title="" border="0" >';
			oTd2.innerHTML = '<input class="fm" type="Text" name="t11" value="" size="2" maxlength="6">';
			oTd3.innerHTML = '<b>(' +aLangStrings[33]+ ')</b>';
			oTd3.className = 'f8 c b';
			xpathResult.snapshotItem(0).appendChild(oTd1);		
			xpathResult.snapshotItem(0).appendChild(oTd2);			
			xpathResult.snapshotItem(0).appendChild(oTd3);
		}
	}
		_log(3, "End createAttackLinks()");
}

function createPartyLinks() {
		_log(3,"Begin createPartyLinks()");
	var iSiteId = getBuildingId();
	
	var xpathBuildingNames = xpath("//h1");
	var re = new RegExp("(.*)\\s" + aLangStrings[7] + "\\s[0-9]{1,3}$", "i");
	var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");
	var xpathResult = xpath("id('content')//table[@class='f10 bn']//span[@class='f8']");
	
	if(xpathResult.snapshotLength > 0) {
			_log(3, "Time to party.");
			
		var xpathStart = xpath("id('content')/form/table/tbody/tr/td/div");
		var linkTxt = aLangStrings[53];		
		for(var i = 0; (i < xpathStart.snapshotLength); i++) {
			var sBuildingName = xpathBuildingNames.snapshotItem(0).innerHTML;
			var aMatches = sBuildingName.match(re);
			sBuildingName = aMatches[1];
			sBuildingName = rtrim(sBuildingName);
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
			var thisStart = xpathStart.snapshotItem(i);
			
			var pLink = document.createElement("a");
			pLink.id = "ttq_research_later" + i;
			pLink.className = "ttq_research_later";
			pLink.innerHTML = " " + linkTxt;
			pLink.title = linkTxt;
			pLink.href = "#";
			pLink.setAttribute("itask", 5);
			pLink.setAttribute("starget", iSiteId);		
			pLink.setAttribute("soptions", sBuildingId);
			pLink.addEventListener('click',	displayTimerForm, false);
			thisStart.parentNode.appendChild(pLink);
		}
	}
		_log(3,"Begin createPartyLinks()");
}
function createResearchLinks() {
		_log(3,"Begin createResearchLinks()");
	var re = /.*build\.php\?id=([0-9]{1,2})/i;
	var sLocation = window.location.href;
	var iSiteId = getBuildingId();
	if(iSiteId == false) {return false;}
	
	//is this Academy, Smithy or armory?
	var buildingName = xpath("//h1");
	if(buildingName.snapshotLength < 1) {
			_log(2, "Building name not found.")
		return;
	}
	var re = new RegExp("(.*)\\s" + aLangStrings[7] + "\\s[0-9]{1,3}$", "i");
	buildingName = buildingName.snapshotItem(0).innerHTML.match(re);
	switch(buildingName[1]) {
		case aLangBuildings[22]: //academy
			var linkTxt = aLangStrings[3];
			break;
		case aLangBuildings[12]:  //smithy
		case aLangBuildings[13]:  //armory
			var linkTxt = aLangStrings[46];
			break;
		default:
			_log(2, "No research links needed.");
			return;			
	}
	
	//build links
		_log(2, "Adding research later links...");
	var Imgs = xpath("id('content')/form/table[1]/tbody/tr/td[1]/table/tbody/tr[1]/td[1]/img | //form/table/tbody/tr/td/table/tr/td/img | id('build')/table/tbody/tr/td/img");
	var Cells = xpath("//form/table[1]/tbody/tr/td[2]/div | //form/table/tbody/tr[2]/td[2]/table/tr[2]/td/font | //form/table[1]/tbody/tr/td[2]/a | id('build')/table/tbody/tr/td[@class='act']/a");

	for(var i = 0; (i < Imgs.snapshotLength) && (i < Cells.snapshotLength); i++) {
		var thisImg = Imgs.snapshotItem(i).getAttribute('class');
		var thisCell = Cells.snapshotItem(i);
		var iTroopId = thisImg.match(/([0-9]{1,2})/i);
		if(!iTroopId) { break; }
		iTroopId = iTroopId[1];
		if(iTroopId > 20) {
			iTroopId = iTroopId - 20;
		} else if(iTroopId > 10) {
			iTroopId = iTroopId - 10;
		}
		var oLink = document.createElement("a");
		oLink.id = "ttq_research_later" + i;
		oLink.className = "ttq_research_later";
		oLink.innerHTML = " " + linkTxt;
		oLink.title = linkTxt;
		oLink.href = "#";
		oLink.setAttribute("itask", 3);
		oLink.setAttribute("starget", iSiteId);
		oLink.setAttribute("soptions", iTroopId);
		oLink.addEventListener('click',	displayTimerForm, false);	
		thisCell.parentNode.appendChild(oLink);
	}
		_log(3, "End createResearchLinks()");
}

function createTrainLinks() {
		_log(3,"Begin createTrainLinks()");
		
	var re = /.*build\.php\?id=([0-9]{1,2})/i;
	var iSiteId = getBuildingId();
	if(iSiteId == false) {return false;}
	
	//is this Barracks, Stables, Workshop, Residence or Palace?
	var buildingName = xpath("//h1");
	if(buildingName.snapshotLength < 1) {
			_log(2, "Building name not found.")
		return;
	}
	var re = new RegExp("(.*)\\s" + aLangStrings[7] + "\\s[0-9]{1,3}$", "i");
	buildingName = buildingName.snapshotItem(0).innerHTML.match(re);	
	var bIsResidence = false;
	switch(buildingName[1]) {
		case aLangBuildings[19]: //barracks
		case aLangBuildings[20]: //stables
		case aLangBuildings[21]: //workshop
			var linkTxt = aLangStrings[48];
			break;
		case aLangBuildings[25]: //residence
		case aLangBuildings[26]: //palace
			re = /s=[0-9]+/i;
			if(re.test(location.href) ) {  //not on the first page of palace/residence
				return;
			}
			bIsResidence = true;
			var linkTxt = aLangStrings[48];
			break;
		default:
			_log(2, "No train links needed.");
			return;			
	}
	if(bIsResidence) {
			_log(2, "Adding train later links for residence/palace...");
		var trainBtn = xpath("//p[2]/input[@type='image']");
		if(trainBtn.snapshotLength > 0) {  //we need to build only the button
				_log(2, "Adding train later links for residence/palace...");
			var oBtn = document.createElement("input");
			oBtn.type = "button";
			oBtn.value = linkTxt;
			oBtn.style.margin = "0px 0px 0px 5px";
			oBtn.style.font ="bold 10px verdana,sans-serif";
			oBtn.style.border='1px solid #59D72F';
			oBtn.style.color="#868686";
			oBtn.addEventListener("click", scheduleTraining, false);		
			trainBtn.snapshotItem(0).parentNode.appendChild(oBtn);	
		} else {  //we need to build the textbox
			//get the code. No code - no training
			var iCode = xpath("id('content')/form//input[@name='z']");
			if(iCode.snapshotLength < 1) {
					_log(3, "No code available. No train later link available.");
				return false;
			}
			
			var oDiv = document.createElement("table");
			oDiv.innerHTML = '<tr><td><img class="unit" src="img/un/u/20.gif"></td><td>' +aLangTroops[iMyRace][9]+ '</td><td><input type="text" value="0" size="2" maxlength="4" name="t10"/></td></td><input type="button" value="' +linkTxt+ '" id="ttq_settler_submit_btn" style="margin:3px 6px;" /></td></tr>';
			var oParent = xpath("id('lmid2')/p[2]");
			if(oParent.snapshotLength < 1) {
					_log(3, "Don't know where to attach the button. Exiting function...");
				return;				
			}
				_log(2, "Appending textbox and button...");
			oParent.snapshotItem(0).appendChild(oDiv);
			$("ttq_settler_submit_btn").addEventListener("click", scheduleTraining, false);
		}
		
	} else {	
			_log(2, "Adding train later links for barracks/stables/workshop...");
		var trainBtn = xpath("//form/p/input[@type='image']");
		if(trainBtn.snapshotLength < 1) {  //button not found
				_log(2, "The Train button not found. Exiting function...");
			return false;
		}
		var oBtn = document.createElement("input");
		oBtn.type = "button";
		oBtn.value = linkTxt;		
		oBtn.style.margin = "0px 0px 0px 5px";
		oBtn.style.font ="bold 10px verdana,sans-serif";
		oBtn.style.border='1px solid #59D72F';
		oBtn.style.color="#868686";
		oBtn.addEventListener("click", scheduleTraining, false);		
		trainBtn.snapshotItem(0).parentNode.appendChild(oBtn);		
	}
		_log(3, "End createTrainLinks()");
}

function scheduleAttack(e) {
		_log(3,"Begin scheduleAttack()");
		
	var iVillageId = window.location.href.match(/.*a2b\.php\?(newdid=[0-9]*&)?z=([0-9]*)/);  // target village
	if(iVillageId != null) {
		iVillageId = iVillageId[2];
	} else { //try to get the coordinates
		var sX = document.getElementsByName('x');
		var sY = document.getElementsByName('y');
		iX = sX[0].value;
		iY = sY[0].value;
		if(iX != '' && iY != '') {
			iVillageId = coordsXYToZ(iX, iY);
		}					
	}
	if(iVillageId == null) {
			_log(2, "Target village ID not found.");
		printMsg(aLangStrings[34], true);
		return false;
	}
	
	var aTroops = new Array();
	var iAttackType = null;
	var sXpathExpr = "id('content')//input[@type='radio']";
	var xpathRes = xpath(sXpathExpr);
	if(xpathRes.snapshotLength > 0) {
		for (var i = 0; i < xpathRes.snapshotLength; i++) {
			if(xpathRes.snapshotItem(i).checked) iAttackType = i+2;
		}
	} else {
			_log(2, "The type of attack was not determined. Unable to schedule the attack.");
		return false;
	}
	if(iAttackType != null) {aTroops[0] = iAttackType;}
	else {
			_log(2, "The type of attack was not determined. Unable to schedule the attack.");
		return false;
	}
	
	sXpathExpr = "//table//td/input[@type='text']";
	xpathRes = xpath(sXpathExpr);
	
	var bNoTroops = true;
	if(xpathRes.snapshotLength > 0) {		
		for (var i = 0; i < xpathRes.snapshotLength; i++) {
			var aThisInput = xpathRes.snapshotItem(i);
			var iTroopId = aThisInput.name.substring(1);			
			aTroops[iTroopId] = (aThisInput.value != '') ? aThisInput.value : 0;
			if(aThisInput.value) {bNoTroops = false;}  //at least 1 troop has to be sent
		}
	} else {
			_log(2, "No info about troops found. Unable to schedule the attack.");
		return false;
	}
		_log(3, "Troops:\n" + aTroops);
	
	if(bNoTroops) {
			_log(2, "No troops were selected. Unable to schedule the attack.");
		printMsg(aLangStrings[17] , true);
			return false;
	} 		
	
	// Good, we have at least 1 troop. Display the form
	displayTimerForm(2, iVillageId, aTroops);		
		_log(3, "End scheduleAttack()");
}

function scheduleTraining(e) {
	var Inputs = xpath("id('content')//input[@type='text']");
	if(Inputs.snapshotLength < 1 ) {
			_log(3, "No textboxes with troop numbers found.");
		return false;
	}
	var buildingId = getBuildingId();
	var aTroops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  //the first member  is the code
	var bNoTroops = true;
	for(var i = 0; i < Inputs.snapshotLength; i++) {
		var thisTroopType = parseInt(Inputs.snapshotItem(i).name.substring(1));
		aTroops[thisTroopType] = (Inputs.snapshotItem(i).value != '') ? Inputs.snapshotItem(i).value : 0;
		if(Inputs.snapshotItem(i).value && Inputs.snapshotItem(i).value != 0) {
			bNoTroops = false;
		} 
	}
	
	if(bNoTroops) {
			_log(2, "No troops were selected. Unable to schedule training.");
		printMsg(aLangStrings[17] , true);
			return false;
	}
	
	//get the code
	var iCode = xpath("//form//input[@name='z']");
	if(iCode.snapshotLength > 0) { 
		aTroops[0] = iCode.snapshotItem(0).value;
	} else {
			_log(3, "No code available. Exiting.");
		return false;
	}
	
	//currently, only 1 kind of troop can be trained at once - null all elements except for the oth one (code) and the first non-zero value
	var somethingFound = false;
	aTroops.forEach(function(element, index) {		
		if(index > 0 && element > 0) {			
			if(somethingFound) aTroops[index] = 0;
			somethingFound = true;			
		}
	})
	// Good, we have at least 1 troop. Display the form
	displayTimerForm(4, buildingId, aTroops);
}

/**************************************************************************
 * @param iTask: 0 - build, 1 - upgrade, 2 - attack,raid,support
 * @param target: sitedId for iTask = 0 or 1; iVillageId for siteId = 2
 * @param options: buildingId for iTask = 0; troops for attacks.
 * @param timestamp: if it is passed, suggest the time calculated from this (Caution! It is in seconds).
 * This function functions both as a Listener for Build later and Upgrade later links,
 * and as regular function when arguments are supplied (in case of scheduling attacks and editing existing tasks).
 ***************************************************************************/
function displayTimerForm(iTask, target, options, timestamp) {
		_log(3,"Begin displayTimerForm()");

	// For build and upgrade, we need to extract arguments from the event object	 
	 if(iTask != 2 && iTask != 4  && target == null) {  //if params are supplied, we do not extract them from the event object target (link)
		var el = iTask.target;  // iTask really is the Event object!
		var iTask = parseInt(el.getAttribute("itask"));
		var target = el.getAttribute("starget");
		var options = el.getAttribute("soptions");
		if(iTask == undefined || target == undefined || options == undefined) {
				_log(2, "Missing arguments:\niTask="+iTask+"\ntarget="+target+"\noptions="+options);
			return false;
		}
	}
	var sTask = ''; 
	var sWhat = '';	
	var sMoreInfo = ''
	if(iMyRace != 0 && iMyRace != 1 && iMyRace != 2) iMyRace = getOption("RACE", 0, "integer");
	
	switch(iTask) {
		case 0:  //build
		case 1:  //upgrade
			sWhat = aLangBuildings[options];
			sTask = aLangTasks[iTask]; 
			sMoreInfo = aLangStrings[35] + " " +target;
			break;
		case 2:  //Attack, Raid, Support
			sWhat = '<span id="ttq_placename_' +target+ '">' +getPlaceName(target)+ '</span>';			
			var iAttackType = parseInt(options[0]) + 18; 
			sTask = aLangStrings[iAttackType];
			var bCatapultPresent = (options[8] > 0) ? true : false;
			var bOnlySpies = onlySpies(options);
			if(options[11] == undefined) options[11] = 0;  //if no heros are specified, set them to zero
			sMoreInfo = getTroopsInfo(options); 
			options = options.join("_");
			break;
		case 3:  //Research
			sWhat = aLangTroops[iMyRace][options-1]; 
			sTask = aLangTasks[3];
			break;
		case 4:  //Training
			sWhat = aLangStrings[49]; 
			sTask = aLangTasks[4];
			sMoreInfo = getTroopsInfo(options); 
			options = options.join("_");
			break;
		case 5:  //Party
			sWhat = aLangStrings[53]; 
			sTask = aLangTasks[5];
			break;
	}
	
	var oTimerForm = document.createElement("form");
	oTimerForm.setAttribute('name','myForm');
	//Suggest the current time. Can be local or server time.
	if(bUseServerTime && !timestamp) {  //suggest the server time
		var sTimeType = "This is the server time.";
		var sTime = getServerTime();
		sTime = (!sTime) ? "" : sTime;  //clear sTime if it is false
	} else if(bUseServerTime && timestamp) {  //suggest the timestamp displayed as server time
		var iServerTimeOffset = getServerTimeOffset();
		timestamp = (parseInt(timestamp) + (iServerTimeOffset * 3600)) * 1000;		
		var oServerDate = new Date(timestamp);
		var sTime = formatDate(oServerDate.getUTCFullYear(), (oServerDate.getUTCMonth() + 1), oServerDate.getUTCDate(), oServerDate.getUTCHours(), oServerDate.getUTCMinutes(), oServerDate.getUTCSeconds());	
	} else {  //suggest the local time
		var sTimeType = "This is your local time.";
		
		if(timestamp) {
			var date = new Date(timestamp * 1000); 
		} else {
			var date = new Date(); 
		}
		var dd = date.getDate();
		var mm = date.getMonth() + 1; 
		var yyyy = date.getFullYear();
		var hh = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		
		//Convert small numbers to conventional format
		var sTime = formatDate(yyyy, mm, dd, hh, min, sec);
	}
	
	// Allow target selection for catapults if this is not support and at least 1 cata is sent
	var sCataTargets = '';
	if(iTask == 2 && iAttackType > 20 && bCatapultPresent) {
		var sCataOptions = "";
		for(var j=1; j < aLangBuildings.length; j++) {
			sCataOptions += '<option value="' +j+ '">' +aLangBuildings[j]+ '</option>';
		}	
		sCataTargets = '<select name="kata" size="" class="f8"><option value="99">' +aLangStrings[24]+ '</option>' + sCataOptions + '</select>';
		sCataTargets += '<select name="kata2" size="" class="f8"><option value="99">' +aLangStrings[24]+ '</option>' + sCataOptions + '</select>';
	}
	
	//Allow specifying the spying mode (only if there is nothing but spies being sent and if this is not a support)
	var sSpyMode = '';
	if(iTask == 2 && iAttackType > 20 && bOnlySpies) {
		sSpyMode = '<input type="radio" name="spy" value="1" checked>' +aLangStrings[31]+ ' <input type="radio" name="spy" value="2">' +aLangStrings[32];
	}
	oTimerForm.id = "timerForm";
	oTimerForm.setAttribute("class", "handle");
	var sLinkClose = "<a href='#' onclick='document.body.removeChild(document.getElementById(\"timerform_wrapper\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";
	//function(e){alert(\'oleeee\');/*e.stopPropagation();*/}
	oTimerForm.innerHTML = sLinkClose + '<input type="hidden" name="timerTask" value="' +iTask
	+ '" /><input type="hidden" name="timerTarget" value="' +target+ '" /><input type="hidden" name="timerOptions" value="' 
	+options+ '" /><p>' +sTask+ ' ' +sWhat+ '<br/>' + aLangStrings[25] 
	+ ' <input name="at" type="text" id="at" value="' +sTime+ '" onfocus="document.getElementById(\'after\').value = \'\'; this.value=\'' +sTime+ '\'" title="' +sTimeType+ '" /> ' 
	+ aLangStrings[26] 
	+ ' <input name="after" type="text" id="after" onfocus="document.getElementById(\'at\').value = \'\';" /><select name="timeUnit"><option value="1">' + aLangStrings[27] 
	+ '</option><option value="60" selected="selected">' + aLangStrings[28] 
	+ '</option><option value="3600">' + aLangStrings[29] 
	+ '</option><option value="86400">' + aLangStrings[30] 
	+ '</option></select><br/><span style="font-size:75%; cursor:default;">' +sMoreInfo+ '</span></p>';
	
	if(sCataTargets != '') {
		oTimerForm.innerHTML += '<p>' + aLangStrings[23] + ': ' +sCataTargets+ ' </p>';
	}
	if(sSpyMode != '') {
		oTimerForm.innerHTML += '<p>' +sSpyMode+ '</p>';
	}
	
	var oSubmitBtn = document.createElement("input");
	oSubmitBtn.name = "submitBtn";
	oSubmitBtn.value = "OK";
	oSubmitBtn.type = "button";	
	oSubmitBtn.addEventListener('click', function() {handleTimerForm(this.form)}, true);
	oTimerForm.appendChild(oSubmitBtn);
	
	var oWrapper = document.createElement("div");
	oWrapper.id = "timerform_wrapper";
	oWrapper.appendChild(oTimerForm);
	
	//position
	var formCoords = getOption("FORM_POSITION", "215px_215px");
	formCoords = formCoords.split("_");
	oWrapper.style.top = formCoords[0];
	oWrapper.style.left = formCoords[1];
	document.body.appendChild(oWrapper);
	makeDraggable($("timerForm"));
		_log(3, "End displayTimerForm()");	
	return false;
}
/**************************************************************************
* 0 = timerTask, 1 = timerTarget, 2 = timerOptions, 3 = at, 4 = after
* 5 = timeUnit, 6 = OK - true - 1, 7 = undefined - false - 2, 8 = undefined - OK
/**************************************************************************/
function handleTimerForm(oForm) {
		_log(3,"Begin handleTimerForm()");
	var at = oForm[3].value;
	if(at == '') {
		var after = oForm[4].value;
		var timeUnit = oForm[5].value;
		after = after*timeUnit;  // convert to seconds
		var oDate = new Date();  // current GMT date. TODO: server time
		var iTaskTime = parseInt(oDate.getTime()/1000 + after); 
	} else {
		// convert formatted date to milliseconds
		var re = new RegExp("^(2[0-9]{3})/([0-9]{1,2})/([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})$", "i");
		var aMatch = at.match(re);  
		if(!aMatch) {
			_log(1, "You entered invalid format of date!");
			return;
		}
		for(var i = 2; i < aMatch.length; i++) {
			// convert strings to integers
			if(aMatch[i].match(/0[0-9]{1}/i)) {aMatch[i] = aMatch[i].substring(1);}
			aMatch[i] = parseInt(aMatch[i]); 
		}
		
		// Time zone conversions
		if(bUseServerTime) {  //server time
			var iServerTimeOffset = getServerTimeOffset();
			if(iServerTimeOffset == false) {  //problem. do nothing.
					_log(2, "We could not schedule this task, because we were unable to determine server's timezone.");
				printMsg("We could not schedule this task, because we were unable to determine server's timezone.", true);
				return false;
			}			
			
			var oTaskDate = new Date(aMatch[1],aMatch[2]-1,aMatch[3],aMatch[4],aMatch[5],aMatch[6]);  //server time in local offset
			var newtimestamp = oTaskDate.getTime() - (oTaskDate.getTimezoneOffset() * 60000);  //server time in server's timezone
			newtimestamp = newtimestamp - (iServerTimeOffset * 3600000);  //get the UTC server time for this task			
			iTaskTime = parseInt( newtimestamp/1000 );  //convert to seconds
		} else {  //local time
			var oDate = new Date(aMatch[1],aMatch[2]-1,aMatch[3],aMatch[4],aMatch[5],aMatch[6]);
			var iTaskTime = parseInt(oDate.getTime()/1000);
		}		
	}
	document.body.removeChild($('timerform_wrapper'));
		_log(2, "Task will be scheduled for " +iTaskTime);  // The stored time is the absolute Unix GMT time.	
	
	if(oForm[6].value > 1) { //store catapults targets
		oForm[2].value += "_" +oForm[6].value;
	} 
	if(oForm[7] != undefined) {
		if(oForm[7].value > 1) { //store catapults targets
			oForm[2].value += "_" +oForm[7].value;
		}
	}
	if(oForm[6].checked == true) {  //spying mission
		oForm[2].value += "_" + oForm[6].value;
	}else if (oForm[7] != undefined){
		if(oForm[7].checked == true) {
			oForm[2].value += "_" + oForm[7].value;
		}
	}
	setTask(oForm[0].value, iTaskTime, oForm[1].value, oForm[2].value);
		_log(3, "End handleTimerForm()");
}

/**************************************************************************
 * @return true if there are only spies, false if there is anything else or no spies. 
 ***************************************************************************/
function onlySpies(aTroops) {
		_log(3,"Begin onlySpies()");
		
	var iScoutUnit = getOption("SCOUT_UNIT", false, "integer");
	if(iScoutUnit != 3 && iScoutUnit != 4) {  //3 or 4 are the only valid values
			_log(2, "Unknown iScoutUnit. Unable to determine if this is a spying mission.");
			return false;
	}
	
	if(aTroops[iScoutUnit] < 1) { //no spies
			_log(3, "No spies.");
		return false;  
	}
	for(var i=1; i <= 11; i++) { 
		if(i != iScoutUnit && parseInt(aTroops[i]) > 0) { //at least one other troop		
				_log(3, "Troops other than spies are present.");
			return false;
		}
	}	
		_log(3, "This is a spying mission.");
	return true;  
		_log(3, "End onlySpies()");
}

function printMsg(sMsg,bError) {
		_log(3,"Begin printMsg()");
	var oDate = new Date();
	var sWhen = oDate.toLocaleString() + "\n";
	_log(1, sWhen + sMsg);
	
	// delete old message
	var oOldMessage = $("ttq_message");
	if(oOldMessage) {
			_log(3, "Removing the old message." +oOldMessage);
		oOldMessage.parentNode.removeChild(oOldMessage);
	}	
	
	// here we generate a link which closes the message
	var sLinkClose = "<a href='#' onclick='document.getElementById(\"ttq_message\").parentNode.removeChild(document.getElementById(\"ttq_message\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";
	var sBgColor = (bError) ? "#FFB89F" : "#90FF8F"; 
	var oMsgBox = document.createElement("div");
	//oMsgBox.innerHTML = sLinkClose + "<div id='ttq_draghandle_msg' class='handle ttq_draghandle' style='background-color:white; -moz-opacity:0.2; border:1px dashed white;' >&nbsp;</div>" + sMsg;
	oMsgBox.innerHTML = "<div id='ttq_draghandle_msg' class='handle'>" + sLinkClose + sMsg + "</div>";
	oMsgBox.style.backgroundColor = sBgColor;
	var msgCoords = getOption("MSG_POSITION", "215px_215px");
	msgCoords = msgCoords.split("_");
	oMsgBox.style.top = msgCoords[0];
	oMsgBox.style.left = msgCoords[1];
	oMsgBox.id = "ttq_message";
	document.body.appendChild(oMsgBox);
	makeDraggable($('ttq_draghandle_msg'));
		_log(3, "End printMsg()");
}

/**************************************************************************
 * Experimental: Send messages in the game 
 * TODO: The sC parameter needs to be loaded and saved once.
 ***************************************************************************/
function sendMsg(sTo, sSubject, sMsg, sC) {
		_log(3,"Begin sendMsg()");
	if(sTo == '' || sMsg == '' || sC == '') {return false;}
	var sParams = 'c=' +sC+ '&an=' +sTo+ '&be=' +sSubject+ '&message=' +sMsg+ '&t=2&s1=';
	sParams = encodeURI(sParams);
	var httpRequest = new XMLHttpRequest();		
	httpRequest.open("POST", 'nachrichten.php', true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", sParams.length);
	httpRequest.setRequestHeader("Connection", "close");
	httpRequest.send(sParams);	
		_log(3, "End sendMsg()");
}

function hideMsg() {
		_log(3,"Begin hideMsg()");
	var oMsgBox = $("ttq_message");
	document.body.removeChild(oMsgBox);
		_log(3, "End hideMsg()");
}

/**************************************************************************
 * Retrieves the value corresponding do the given variable name and the current Travian server
 * Use greasemonkey's built-in system instead of variables to permantenly store and read settings
 * @param name The name of the variable
 * @param defaultValue  default value if name is not found
 ***************************************************************************/
function getVariable(name, defaultValue) {
		_log(3,"Begin getVariable("+name+","+defaultValue+")");
    if(!defaultValue) { var defaultValue = ''; }
    name = sCurrentServer + name;
    var data = GM_getValue(name, defaultValue);
        _log(3, "End getVariable("+name+","+defaultValue+")");
    return data;
}

/**************************************************************************
 * Sets the value for the given variable name and the current Travian server
 * Use greasemonkey's built-in system instead of variables to permantenly store and read settings
 * @param name  The name of the variable
 * @param value The value to be assigned
 ***************************************************************************/
function setVariable(name, value) {
		_log(3,"Begin setVariable("+name+","+value+")");
    name = sCurrentServer + name;
    GM_setValue(name, value);
        _log(3, "End setVariable("+name+","+value+")");
    return true;
}

function getCode(iSiteId, iNewdid) {
		_log(3,"Begin getCode("+iSiteId+","+iNewdid+")");
	if(iNewdid != 'null' && iNewdid != '') {
		var sNewdid = "&newdid=" +iNewdid;
	} else {
		var sNewdid = "";
	}
	get("build.php?id=" + iSiteId + sNewdid, handleRequestFindCode, iNewdid);	
		_log(3, "End getCode("+iSiteId+","+iNewdid+")");
}

function findCode(sPage, iNewdid) {
		_log(3,"Begin findCode()");
	var iMode = 0;  // mode is 0 for building new stuff, 1 for upgrading
	var sCode = '';
	if(!iNewdid) {
		var iNewdid = 'null';
	}
	var re0 = /dorf2\.php\?a=[0-9]{1,2}&id=[0-9]{1,2}&c=(.{3})/i;  // new building
	var re1 = /dorf[1-2]\.php\?a=.*&c=(.{3})/i;  //upgrade
	var aMatch0 = sPage.match(re0);
	var aMatch1 = sPage.match(re1);
	if(aMatch0) {
		_log(3, "Code for building new stuff found.");
		sCode = aMatch0[1];
		iMode = 0;
	} else if(aMatch1) {
		_log(3, "Code for upgrading found.");
		sCode = aMatch1[1];	
		iMode = 1;
	} else {
		_log(3, "Code not found");
		return;
	}
	
	//save the found code in the proper variables
    // deprecated!
    if(bLockedCode) {
			_log(3, "The TTQ_CODE_" + iMode + " variables is locked. We were not able to write it.");
		return false;
	}
	if(sCode != '') {
		bLockedCode = true;  // TODO check if the variables is locked. Lock it separately from tasks
		var sVariable = getVariable("TTQ_CODE_" +iMode);
		var aVariable = new Array();
		if(sVariable != '') {  //there is a Variable
			aVariable = sVariable.split(",");
			var iIndexOfVillageId = aVariable.indexOf(iNewdid);
			if(iIndexOfVillageId > -1) {  // existing old code - remove
				aVariable.splice(iIndexOfVillageId, 2);
			}
		}		
		aVariable.push(iNewdid);
		aVariable.push(sCode);
		sVariable = aVariable.join(",");
			_log(3, "Writing TTQ_CODE_"+iMode+": " + sVariable);
		setVariable('TTQ_CODE_'+iMode, sVariable);
		bLockedCode = false;
	} else {
			_log(2, "We didn't find any code. Either there is not enough resources for this task, or another building is being built/upgraded.");
		return false;
	}
		_log(3, "End findCode()");
}

/**************************************************************************
 * @return coordZ if the name is not found in the cache. 
 ***************************************************************************/
function getPlaceName(iPlaceId) {
		_log(3,"Begin getPlaceName()");
	
	if(!bDisplayVillageNames) {
		return iPlaceId;
	}
	
	//first try to load the name from the cache
	var sVariable = getVariable("TTQ_PLACE_NAMES");  // format: "123456,VillageName,233564,VillageName,"
	if(sVariable != '') {
		var aPlaces = sVariable.split(",");	
		var iPlacesLength = aPlaces.length;
		if(iPlacesLength > 0) {	
			for(var i = 0; i < iPlacesLength; i++) {				
				if(aPlaces[i].indexOf(iPlaceId) > -1) {
					return decodeURI(aPlaces[i+1]);
				}
				i++;
			}
		}
	}	
		
	var httpRequest = new XMLHttpRequest();
	httpRequest.overrideMimeType("application/xml");
	httpRequest.onreadystatechange = function() { 
			handleGetPlaceName(httpRequest, iPlaceId); 
	};
	httpRequest.open("GET", "karte.php?z=" +iPlaceId, true);
	httpRequest.send(null);

	return iPlaceId;		
		_log(3, "End getPlaceName()");
}

function handleGetPlaceName(httpRequest, iPlaceId) {
		_log(3,"Begin handleGetPlaceName("+httpRequest+", "+iPlaceId+")");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok		
				_log(3, "HTTP response retrieved.");
			var sResponse = httpRequest.responseText;  // it would be much easier to find what we want in responseXML, but it doesn't work, since it is not well-formed
			
			if(sResponse) {					
				var iCoordX = coordZToX(iPlaceId);
				var iCoordY = coordZToY(iPlaceId);
					_log(3, "Coordinates for " +iPlaceId+ ": " +iCoordX+ "|" +iCoordY);
				var re = new RegExp("onmouseover=\"map\\('([^']*)','([^']*)','[^']*','[^']*','" +iCoordX+ "','" +iCoordY+ "'\\)\"", "i");
				var aMatch = sResponse.match(re);
				if(aMatch && aMatch[1]) { 
						_log(2, "The village name found:"+aMatch[1]);
					cachePlaceName(iPlaceId, aMatch[1]);
					injectPlaceName(aMatch[1], iPlaceId);
				} else {
						_log(2, "The village name not found.");
					cachePlaceName(iPlaceId, iCoordX + "|" + iCoordY);
					injectPlaceName(iCoordX + "|" + iCoordY, iPlaceId);
				}				
			}

		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
	}
		_log(3, "End handleGetPlaceName("+httpRequest+", "+iPlaceId+")");
}

/**************************************************************************
 *  Store found names in a variables. 
 ***************************************************************************/
function cachePlaceName(iPlaceId, sPlaceName) {
		_log(3,"Begin cachePlaceId()");
	
	var aPlaces = new Array();
	var sVariable = getVariable("TTQ_PLACE_NAMES");
	if(sVariable) {
		aPlaces = sVariable.split(",");
	}
	
	if(aPlaces.length > (2 * iMaxPlaceNamesVariableLength) ) {  //variables is too long, clear it first
		aPlaces = [];
	}
	
	if(aPlaces.length > 1) {
		var iIndexId = aPlaces.indexOf(iPlaceId);
		if(iIndexId > -1) {  //this place is stored - remove
			aPlaces.splice(iIndexId, 2);
		}
	}
	aPlaces.push(iPlaceId);
	aPlaces.push(encodeURI(sPlaceName));
	var sNewVariable = aPlaces.join(",");
	setVariable("TTQ_PLACE_NAMES", sNewVariable);
		_log(3, "End cachePlaceId()");
}

function injectPlaceName(sPlaceName, iPlaceId) {
	var oSpan1 = $('ttq_placename_'+iPlaceId);
	var oSpan2 = $('ttq_placename_history_' +iPlaceId);
	if(oSpan1) {
		oSpan.innerHTML = sPlaceName;
		return;
	} 
	if(oSpan2) {
		oSpan.innerHTML = sPlaceName;
		return;
	} 
	return;
}

/**************************************************************************
 * 				Begin Drag n drop
 ***************************************************************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
	object.onmousedown = function(){
		dragObject = this;
	}
}

function getMouseOffset(target, ev){
	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
		dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		switch(dragObject.id) {
			case "ttq_message":
				var key = "MSG_POSITION";
				break;
			case "timerform_wrapper":
				var key = "FORM_POSITION";
				break;
			case "ttq_history":
				var key = "HISTORY_POSITION";
				break;
			case "ttq_tasklist":
			default:
				var key = "LIST_POSITION";
				break;
		}
		setOption(key, dragObject.style.top +"_"+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){	
var mousePos = mouseCoords(ev);
	var target = ev.target;
	iMouseDown = true;	
	if(target.getAttribute('DragObj')){
		return false;
	}	
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener("mousedown",function(ev){
		dragObject  = this.parentNode;
		mouseOffset = getMouseOffset(this.parentNode, ev);
		return false;
	}, false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);
/**************************************************************************
 * 				End Drag n drop
 ***************************************************************************/
 
function inArray(ray, str){
 return ("|"+ ray.join("|") +"|" ).indexOf("|"+str+"|")!==-1;
}

function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

/**************************************************************************
 * I know a break isn't needed after a return it's just a precaution. 
 ***************************************************************************/
function getRace() {
		_log(2,"Begin getRace()");
	var xpathResult = xpath("//img/@title");
	if (xpathResult.snapshotLength > 0) {
		for(var i = 0; i < xpathResult.snapshotLength; i++) {
			if (xpathResult.snapshotItem(i).textContent == aLangTroops[0][10]) {
				continue;
			} else {
				if (inArray(aLangTroops[2], xpathResult.snapshotItem(i).textContent)){
						_log(3, "Race Gaul: End getRace()");
					return 2;  //gaul
					break;
				} else if (inArray(aLangTroops[1], xpathResult.snapshotItem(i).textContent)){
						_log(3, "Race Teutons: End getRace()");
					return 1; //teutons
					break;
				}else if (inArray(aLangTroops[0], xpathResult.snapshotItem(i).textContent)) {
						_log(3, "Race Romans: End getRace()");
					return 0; //romans
					break;
				} else if (xpathResult.snapshotLength  < i + 2){	
					_log(2, "Race not needed in this location. End getRace()");
					return false;
 				}
			}
		}
	}
	_log(2, "Information not found. Could not determine the race. End getRace()");
	return false;
} 

function getBuildingId() { 
		_log(3,"Begin getBuildingId()");
	var xpathID = xpath("id('vlist')/table/tbody/tr[@class='sel']//a | //table[@id='vlist']/tbody/tr[td/@class='dot hl']//a");
	if (xpathID.snapshotLength > 0) {
	var iDHref = xpathID.snapshotItem(0).href;
	var iSiteId = iDHref.match(/&id=([0-9]*)/i);
		if(iSiteId[1] != null) {
			return parseInt(iSiteId[1]);
		} else {
				_log(2, "Building site ID not found");
			return false;
		}
	} else {
		var re = /.*build\.php\?([a-z=0-9&]*&)?id=([0-9]{1,2})/i;
		var iSiteId = window.location.href.match(re);
		if(iSiteId != null) {
			return parseInt(iSiteId[2]);
		} else {
				_log(2, "Building site ID not found");
			return false;
		}
	}
		_log(3,"End getBuildingId()");
}

/**************************************************************************
 * @return newdid of the currently selected village 
 ***************************************************************************/
function getActiveVillage() {
		_log(3,"Begin getActiveVillage()");
	var oActiveLink = xpath("id('vlist')/table/tbody/tr[@class='sel']//a | //table[@id='vlist']/tbody/tr[td/@class='dot hl']//a");
	if(oActiveLink.snapshotLength > 0) {
			_log(2, "Active village link found.");
		var sHref = oActiveLink.snapshotItem(0).href;
		var aMatch = sHref.match(/newdid=([0-9]*)/i);
		if(!aMatch) {
				_log(2, "Active village id could not be found.");
			return false;
		} else {
				_log(3, "Active village id was found: " +aMatch[1]);				
			return aMatch[1];
		}
	} else {
			_log(2, "Active village could not be found.");
		return false;
	}
		_log(3, "End getActiveVillage()");
}

/**************************************************************************
 * @return name of one of your one villages. 
 ***************************************************************************/
function getVillageName(iVillageDid) {
		_log(3,"Begin getVillageName()");
	if(iVillageDid == '' || iVillageDid == 'null') {  //no village id
		return '';
	}	
	var sVillageName = '';
	var xpathResult = xpath("id('vlist')//a[contains(@href, 'newdid="+iVillageDid+"')]"); // thankx danielbc
	if(xpathResult.snapshotLength > 0) {
		return xpathResult.snapshotItem(0).innerHTML;
	} else {
		return 'unknown';
	}
		_log(3, "End getVillageName()");
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}

function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

/**************************************************************************
 * Kudos to QP for writing these three functions.
 ***************************************************************************/
function coordsXYToZ(x, y) {	
	x = parseInt(x);
	y = parseInt(y);
	var coordZ = (x + 401) + ((400 - y) * 801);
	return coordZ;
}

function coordZToX(z) {
	z = parseInt(z);
	var x = ((z - 1) % 801) - 400;
	return x;
}

function coordZToY(z) {
	z = parseInt(z);
	var y = 400 - (parseInt(((z - 1) / 801)));
	return y;
}
/**************************************************************************
 * End Kudos
 ***************************************************************************/

/**************************************************************************
 * This function is called once, after user installed a new version of this script
 ***************************************************************************/
function performUpgrade() {
		_log(3,"Begin performUpgrade()");
    // Reset vars
    setVariable("TTQ_CODE_0", "");
	setVariable("TTQ_CODE_1", "");
	setVariable("TTQ_PLACE_NAMES", "");
    setVariable("TTQ_VERSION", sCurrentVersion);
	alert("Your Travian Task Queue script has been updated to Version " + sCurrentVersion + ".");	
		_log(3, "End performUpgrade()");
}

/**************************************************************************
 * @return The server timezone offset from GMT or false if it is not available. 
 ***************************************************************************/
function getServerTimeOffset() {
		_log(3,"Begin getServerTimeOffset()");
		
	var iServerTimeOffset = getOption("SERVER_TIME_OFFSET", false);
	if(iServerTimeOffset != false) {  //no automatic detection
			_log(3, "Returning the predefined iServerTimeZoneOffset.");
		return parseInt(iServerTimeOffset);
	} else {  //automatic detection
		var iOffset = xpath("id('ltime')/span[@id='tp1']");
		if(iOffset.snapshotLength < 1) {  //not found. Unknown offset.
			return false;
		} else {
			iOffset = iOffset.snapshotItem(0).innerHTML;
			var aMatch = iOffset.match( /([A-Z]{3})([-+]{1}[0-9]{1,2})/i );
			if(!aMatch) {
					_log(3, "No server time zone recognized, although it seems to be displayed.");
				return false;
			}
			
			iOffset = parseInt(aMatch[2]);
			switch(aMatch[1]) {	
				case "AST":
					return (iOffset - 4);
					break;
				case "EST":
					return (iOffset - 5);
					break;
				case "CST":
					return (iOffset - 6);
					break;
				case "MEZ":				
					return (iOffset + 1);
					break;
				case "UTC":
				case "GMT":
				default:
					return iOffset;
					break;
			}
		}
	}
	return false;
		_log(3, "End getServerTimeOffset()");
}

/**************************************************************************
 * @return Current server time as formatted string or timestamp or false if the server time cannot be determined.
 ***************************************************************************/
function getServerTime(bReturnTimestamp) {
		_log(3,"Begin getServerTime()");
	
	// get server time zone offset
	var iTimeOffset = getServerTimeOffset();			

	var sTime = xpath("id('tp1')");
	if(sTime.snapshotLength < 1) {
			_log(3, "No server time found.");
		return false;
	}
	sTime = sTime.snapshotItem(0).innerHTML;
	
	// now we need to determine server date - tricky.
	var aMatch = sTime.match( /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/i );
	if(!aMatch) {
			_log(3, "No server time found. Server date could not be determined.");
		return false;
	}
	
	// get UTC time of the server
	var UTCHoursServer =  parseInt(aMatch[1]) - iTimeOffset;
	if(UTCHoursServer > 23) {
		UTCHoursServer = UTCHoursServer - 24;
	}
	if(UTCHoursServer < 0) { 
		UTCHoursServer = UTCHoursServer + 24;
	}
	 
	// for now, we assume that the local UTC time = server UTC time. 
	//TODO: solve the situation when it's not
	var oLocalTime = new Date();
	var yy = oLocalTime.getUTCFullYear();
	var mm = oLocalTime.getUTCMonth();
	var dd = oLocalTime.getUTCDate();	
	var hh = oLocalTime.getUTCHours();
	//Now the logic:
	if(hh == UTCHoursServer) {  //the local UTC time is similar to server's UTC time. Good!
		// we can therefore use local date as server's date
	} else if(hh == 23 && UTCHoursServer == 0) {  //the server is ahead of us
		dd = dd + 1;
	} else if(hh == 0 && UTCHoursServer == 23) {  //the server is falling behind
		dd = dd - 1;
	} else {  //we do not tolerate bigger differences!
		sTimes = hh - UTCHoursServer;
		if (sTimes >= 1) {  //the server is ahead of us
			dd = dd + 1;
		} else if (sTimes <= -1) {  //the server is falling behind
			dd = dd - 1;
		}else {  //we do not tolerate bigger differences!
			_log(2, "Warning! The local time (as UTC) differs from the server time (as UTC) by more than 1 hour. Your local time is incorrect or you specified wrong timezone for your server. We can't calculate server's date.");
			return false;
		}
	}
	
	//now we can construct the Date object for the server time and return formatted string
	//var sTime = yy+"/"+mm+"/"+dd+" "+hh+":"+min+":"+sec;
	var oServerDate = new Date(yy, mm, dd, UTCHoursServer, aMatch[2], aMatch[3]);
	//the created object has wrong timestamp - it was offset by local timezone offset. Bring it back
	var newtimestamp = oServerDate.getTime() - (oLocalTime.getTimezoneOffset() * 60000);  //this is server time as UTC
	
	if(bReturnTimestamp) {  //we don't need formatted string
		return newtimestamp;
	}
	
	newtimestamp = newtimestamp + (iTimeOffset * 3600000);  //server time in the server's timezone
	var oServerDate = new Date(newtimestamp);  //this is the server's time (not UTC!)
	sTime = formatDate(oServerDate.getUTCFullYear(), (oServerDate.getUTCMonth() + 1), oServerDate.getUTCDate(), oServerDate.getUTCHours(), oServerDate.getUTCMinutes(), oServerDate.getUTCSeconds());
	return sTime;
		_log(3, "End getServerTime()");
}

/**************************************************************************
 * @param {int}
 * @return {str} Formatted date.
 ***************************************************************************/
function formatDate(yyyy, mm, dd, hh, min, sec) {
	if(dd < 10) {dd = "0" + dd;}
	if(mm < 10) {mm = "0" + mm;}
	if(min < 10) {min = "0" + min;}
	if(sec < 10) {sec = "0" + sec;}	
	return yyyy+"/"+mm+"/"+dd+" "+hh+":"+min+":"+sec;
}

function isInt(x) {
   var y = parseInt(x);
   if (isNaN(y)) {return false;}
   return x==y && x.toString()==y.toString();
} 

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  window[key] = getOption(key, defaultValue, "boolean");
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    setOption(key, !window[key]);
	
	if(key == 'USE_SERVER_TIME' && !window[key]) {
		var iServerTimeOffset = getServerTimeOffset();
		var promptMsg = (iServerTimeOffset == false) ? "Travian Task Queue:\nPlease enter your server's timezone offset from GMT in hours.\n(examples: for GMT enter 0, for MEZ enter 1, for EST enter -5)" : "Travian Task Queue:\nYour server's timezone offset was detected as " +iServerTimeOffset+ " hours from GMT.\n If this is not right, please enter the correct value. Otherwise leave the box empty.";	
		
		var userResponse = prompt(promptMsg);
		while( (userResponse != '' && !isInt(userResponse)) || (userResponse == '' && iServerTimeOffset == false) ) {
			userResponse = prompt(promptMsg);		
		} 
		var value = (userResponse != '') ? userResponse:iServerTimeOffset;
		setOption("SERVER_TIME_OFFSET", value);
	}
	location.reload();
  });
}

function useLocalTime() {
	setVariable("TTQ_USE_SERVER_TIME", false);
	bUseServerTime = false;
	setVariable("TTQ_SERVER_TIME_OFFSET", false);
	alert("Now you are using your local time for planning tasks.");
	location.reload();	
}

function useServerTime() { 
	var iServerTimeOffset = getServerTimeOffset();
	if(iServerTimeOffset == false) { 
		iServerTimeOffset = prompt("To use the server time, please enter the timezone offset (in hours) of your server from the GMT.\nExamples:\nFor EST enter \"-5\", for MEZ enter \"1\", etc.");
		if(isInt(iServerTimeOffset)) {
			setVariable("TTQ_SERVER_TIME_OFFSET", iServerTimeOffset);
			setVariable("TTQ_USE_SERVER_TIME", true);
			bUseServerTime = true;
		} else {
			alert("Invalid value. You need to specify an integer.");
		}
	} else {
		setVariable("TTQ_USE_SERVER_TIME", true);
		bUseServerTime = true;
	}
	alert("Now you are using your local time for planning tasks.");
	location.reload();
}

function getTroopsInfo(aTroops) {
	var sTroopsInfo = "";	
	for(var i = 1; i < 12; i++) {
		if(aTroops[i] > 0) {
			sTroopsInfo += aLangTroops[iMyRace][i-1] + ": " +aTroops[i]+ ", ";
		}
	}
	//trim last two characters
	sTroopsInfo = sTroopsInfo.substring(0, sTroopsInfo.length - 2);
	return sTroopsInfo;
}

function setOption(key, value) {
        _log(3,"Begin setOption("+key+","+value+")");
    
    var options = getVariable('TTQ_OPTIONS', '');
	if(options != '') options = options.split(",");
	else options = [];
    var myOption = options.indexOf(key);
	if(myOption < 0) {
		options.push(key);
		options.push(value);
	} else {
		options[myOption + 1] = value;
	}

    setVariable('TTQ_OPTIONS', options.join(","));
        _log(3, "End setOption("+key+","+value+")");
}
/**************************************************************************
 * @param key: name of the parameter in the TTQ_OPTIONS variable
 * @param defaultValue: this is returned if the parameter is not found
 * @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
 ***************************************************************************/
function getOption(key, defaultValue, type) {
        _log(3,"Begin getOption("+key+","+defaultValue+","+type+")");

    var options = getVariable('TTQ_OPTIONS', '');
	options = options.split(",");
	var myOption = options.indexOf(key);
	if(myOption < 0) {return defaultValue;}
	switch(type) {
		case "boolean":
			var myOption = ( options[myOption + 1] == "true") ? true:false;
			break;
		case "integer":
			var myOption = parseInt(options[myOption + 1]);
			break;
		case "string":
		default:
			var myOption = options[myOption + 1];
			break;				
	}
        _log(3, "End getOption("+key+","+defaultValue+","+type+")");
    return myOption;
}

function $(id) {
  return document.getElementById(id);
}

function promptRace() {
	var iMyRace = getOption("RACE", false, "integer");
	var newRace = false;
	while(!isInt(newRace)) {
		var newRace = prompt(aLangMenuOptions[0] + aLangMenuOptions[7] +iMyRace);
		if(isInt(newRace)) {
			newRace = parseInt(newRace);
			if(newRace > -1 && newRace < 3) {
				setOption("RACE", newRace);
				location.reload();
				break;
			} else {
				newRace = false;
			}
		}
	}
}

function promptHistory() {
	var newHistoryLength = false;
	while(!isInt(newHistoryLength)) {
		var newHistoryLength = prompt(aLangMenuOptions[0] + aLangMenuOptions[6] + iHistoryLength);
		if(isInt(newHistoryLength)) {
			newHistoryLength = parseInt(newHistoryLength);
			if(newHistoryLength > -1) {
				setOption("HISTORY_LENGTH", newHistoryLength);
				location.reload();
				break;
			} else {
				newHistoryLength = false;
			}
		}
	}
}

/**************************************************************************
 * Update the script (by Richard Gibson)
 ***************************************************************************/
function updateTQ() {
		try {
			if (!GM_getValue) {return};
				GM_xmlhttpRequest({
				method: 'GET',
				url: scriptURL, // don't increase the 'installed' count; just for checking
				onload: function(result) {
					if (result.status != 200) {return;}
					if (!result.responseText.match(/@version\s+([\d.]+)/)) {return;}
					var theNewVersion = RegExp.$1;
					if (theNewVersion == sCurrentVersion) {
						alert(aLangUpdate[1] + ' (v ' + sCurrentVersion + ')!');
						return;
					} else if (theNewVersion < sCurrentVersion) {
						alert(aLangUpdate[0] + ' (v ' + sCurrentVersion + ')?!');
						return;
					} else {
						if (window.confirm(aLangUpdate[2] + ' (v ' + theNewVersion + ')\n\n' + aLangUpdate[3] + '\n')) window.location.href = scriptURL;
					}
				}
			});
		} catch (ex) {}
}

function onLoad() {
		_log(3,"Begin onLoad()");
		_log(3, "oIntervalReference " + oIntervalReference);	

    if(getVariable("TTQ_VERSION", 0) != sCurrentVersion) {
		performUpgrade();		
	}
	makeMenuToggle("USE_SERVER_TIME", false, aLangMenuOptions[1], aLangMenuOptions[2], aLangMenuOptions[0]);
	GM_registerMenuCommand(aLangMenuOptions[0] + aLangMenuOptions[3], promptRace);
	GM_registerMenuCommand(aLangMenuOptions[0] + aLangMenuOptions[4], promptHistory);
	GM_registerMenuCommand(aLangMenuOptions[0] + aLangMenuOptions[5], updateTQ);

	var oDate = new Date();
	setOption("LAST_REFRESH", oDate.getTime());

	if(!oIntervalReference) {
			_log(3, "setInterval()");
		oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery); 
	}

    var re = /.*build\.php.*/i;
	if (re.test(window.location.href)) {
		createBuildLinks();
		createResearchLinks();
		createTrainLinks();
		createPartyLinks();
	}

	//var re = /.*a2b\.php\?(newdid=[0-9]*&)?z=.*/i;	
	var re = /.*a2b\.php/i
	if (re.test(window.location.href)) {
		createAttackLinks();
	}

	var iRace = getRace();
	if( iRace != false && ( iRace != getOption("RACE", false, "integer") ||  getOption("SCOUT_UNIT", false, "integer") == false ) ) {		
		switch(iRace) {
			case 0: //Romans
				setOption("SCOUT_UNIT", 4);
				setOption("RACE", 0);
				location.reload();  //we need to reload because the aLangTroops needs to be redefined
				break;
			case 1: //Teutons
				setOption("SCOUT_UNIT", 4);
				setOption("RACE", 1);
				location.reload();
				break;
			case 2: //Gauls
				setOption("SCOUT_UNIT", 3);
				setOption("RACE", 2);
				location.reload();
				break;
		}
	}
	
	var data = getVariable("TTQ_TASKS");
	if(data != '') {
		var aTasks = data.split("|");
		refreshTaskList(aTasks);
	}
	
	data = getVariable("TTQ_HISTORY");
	if(iHistoryLength > 0 && data != '') {
		var aTasks = trimHistory(data, iHistoryLength).split("|");
		refreshHistory(aTasks);
	}

		_log(3, "End onLoad()");
}

/**************************************************************************
 * --- Main Code Block ---
 ***************************************************************************/
if (init) {
        _log(0, "TTQ started");
    window.addEventListener('load', onLoad, false);
} else {
        _log(0, "Initializacion failed");
    alert("Initialization failed, Travian Task Queue is not running");
}