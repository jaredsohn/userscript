// ==UserScript==
// @author      Pimp Trizkit (based on TTQ by Risi and further edited by Nevam and then Pimp Trizkit)
// @namespace	http://userscripts.org/
// @name		نوبت ساخت تراوین ورژن 4
// @description	Schedule delayed constructions, upgrades and attacks travion.ir.
// @include 	http://ts*.travion.*/*.php*
// @include 	http://ts*.travion.*/
// @include 	http://tx*.travion.*/*.php*
// @include 	http://tx*.travion.*/
// @exclude		http://analytics.travian*.*/*
// @exclude 	http://*.travion*.*/hilfe.php*
// @exclude		http://*.travion*.*/logout.php*
// @exclude 	http://*.travion*.*/index.php*
// @exclude 	http://*.travion*.*/anleitung.php*
// @exclude 	http://*.travion*.*/impressum.php*
// @exclude 	http://*.travion*.*/anmelden.php*
// @exclude 	http://*.travion*.*/gutscheine.php*
// @exclude 	http://*.travion*.*/spielregeln.php*
// @exclude 	http://*.travion*.*/links.php*
// @exclude 	http://*.travion*.*/geschichte.php*
// @exclude 	http://*.travion*.*/tutorial.php*
// @exclude 	http://*.travion*.*/manual.php*
// @exclude 	http://*.travion*.*/manual.php*
// @exclude 	http://*.travion*.*/ajax.php*
// @exclude 	http://*.travion*.*/ad/*
// @exclude 	http://*.travion*.*/chat/*
// @exclude 	http://forum.travion*.*
// @exclude 	http://board.travion*.*
// @exclude 	http://shop.travion*.*
// @exclude 	http://*.travion*.*/activate.php*
// @exclude 	http://*.travion*.*/support.php*
// @exclude  	http://help.travion*.*
// @exclude 	*.css
// @exclude 	*.js
// @version     1.3d
// downloaded	3,501 times (at the time of posting)
// ==/UserScript==
// *** Begin Initialization and Globals ***
/*********************
 *		Settings 
 *********************/
var LOG_LEVEL = 0; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var CHECK_TASKS_EVERY = 10;  // How often do we check for tasks to trigger in seconds. 
                          // Low value  = high accuracy in triggering tasks. To make your browser 
						  // unresponsive, set this to some ridiculously small number. Default is 10 secs. You probably do not want to tamper with this setting. As many things in TTQ-T4 are assuming its set to 10 seconds.
var CURRENT_SERVER = "";    // Set this to the server's url to override automatic server detection (i.e. s1.travian.net)
							// Dont set it if you're playing on multiple servers simultaneously!
var MIN_REFRESH_MINUTES = 5;  //TTQ will refresh every 5 to 10 minutes
var MAX_REFRESH_MINUTES = 10; 
var MAX_PLACE_NAMES = 100; //The number of non-player village names it keeps stored. It destroys the oldest when making space.
// RACE and HISTORY LENGTH are set with user accessible menus through the GreaseMonkey icon. As well as a way to fully reset TTQ.
/*********************
 *	End of Settings
 *********************/
//-- DO NOT TAMPER WITH THE BELOW
var starttime = new Date().getTime();
var myPlayerID;
var init = initialize();
/*********************
 *		GLOBALS
 *********************/
if (init) {
    var aLangBuildings = 0;
    var aLangTasks = 0;
    var aLangStrings = 0;
    var aLangMenuOptions = 0;
    var sLang = detectServer();
	
		// Default is English. This is also the array that will be used to replace the zeros (missing words) in the below translations. The Buildlings are only used for catapult targeting.. for now. I hope to get rid of it entirely.
	var nLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "<No Building>", "Smithy", "Tournament Square", "Main Building", "Rally Point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder Of The World", "Horse Drinking Trough"];
	var nLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train", "Party", "Demolish", "Send Merchants", "Send Back/Withdraw"];
	var nLangStrings = ["Build later", "Upgrade later", "Unknown Town", "Research later", "Schedule this Task for Later", "We started building ", "<center>HALT!</center><br>Please wait, TTQ is processing this task!<br>Step", "Traps", " build request sent. However, it appears that the building is not building.", "was attempted but the server redirected us.", "The task was scheduled.", "Redirected", "We can't schedule this task right now.", "Error", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "Flush History", "We started researching ", " cannot be researched.", "Page Failed", "Spy", "train later", "troops.", "... May have not happened!", "We started training ", " cannot be trained.", "Party Later", " but not today.", "We started to ", "Close", "Add/Edit Task Schedule", "Edit and Close", "Add and Close", "Add", "Are you sure you want to [s1] [s2]?", "Demolish Later", "Demolishing", "Cannot demolish", "Invalid coordinates or no resources selected.", "Using Local Time", "Using Server Time", " was attempted but we could not find the link.", " was attempted but failed. Reason: ", "No Link", " was attempted but the building was not found.", "No Building", " was attempted but the server returned an error.", "Server:", "Confirmation Failed", "Sorry, I <b>may</b> have built the building in the wrong town.", "Misbuild:", "Sent Back/Withdrew troops.<br>Troops are going home to:", "Sent Back/Withdrew troops Failed (I think).<br>Troops were supposed to go home to: ", "Click to make this your Active Village." , "Click to see this Village Details screen.", "Timeout or TTQ Crash"];
	var nLangMenuOptions = ["TTQ: ", "Use server time", "Use local time", "Set your race", "Task History", "Reset", "\nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: ", " What is your race on this server?\nType 0 for Romans, 1 for Teutons, 2 for Gauls. Or a negative number to enable autodetect (ie: -1)\nCurrently: ", "Are you sure you want to reset all TTQ variables?"];
		// The english troop names are not really needed. But they are provided here in the situation that the the troop name autodetect (rip) does not work. (ie. no rally point)
	var nLangTroops = new Array();
	nLangTroops.push( ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero", nLangStrings[7]] );
	nLangTroops.push( ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero", nLangStrings[7]] );
	nLangTroops.push( ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero", nLangStrings[7]] );
		// The english resource names are also not really needed. But provided in the case that the resource autodetect should fail.
	var aLangResources = ["Lumber","Clay","Iron","Crop"];


	/***************************************************************************
    *								Translations
	*                            --------------------
	*  There are four translation arrays: aLangBuildings, aLangTasks, aLangStrings and aLangMenuOptions
	*  aLangTroops is ripped from rally point upon first load. aLangResources is ripped each load.
	*  If an array does not appear for your language, TTQ will use the english version instead.
	*  Words that are removed, and appear as the number zero (0), currently have no translation and the english version is used.
 	***************************************************************************/
	switch(sLang) {
	case "ae": //by Fahad (updated by Pimp Trizkit)
		aLangTasks = ["بناء", "تطوير", "هجوم", "فتح قسم", "تدريب", "احتفل", "دمر", "ارسال التجار"];
		aLangStrings = ["البناء لاحقا", "تطوير لاحقا", 0, "فتح القسم لاحقا", "جدولة هذا العمل لاحقا", "لقد بداءالبناء ", 0, 0, " لا يمكن ان يبناء.", 0, "هذا العمل مجدول", 0, "لا يمكن ادراج هذه العملية لان.", 0,"المهام المجدولة", "حذف", "ارسال لاحقا", "لم يتم اختيار الجنود.", "الجنود متوجهين الى","جيوشك لا يمكن ارسالها الى", "مساندة", "هجوم", "نهب", "تصويب المقلاع نحو", "عشوائي", "عند", "او بعد", "ثانية", "دقيقة", "ساعة", "يوم", "التجسس على الجيوش والموارد","التجسس على الجيوش والتحصينات", "بعيد","لا يمكن جدولة هذا الهجوم لان الهدف غير محدد ", "الموقع غير موجود", "فرز بواسطة:","النوع ", "الوقت ", "الهدف ", "الخيارات ", "القرية ", "مهام محفوظه", "محفوظات حالية","بداية عملية البحث ", " لا تستطيع اعادة البحث" , 0 , "تجسس" , "تدريب لاحقا" , "جنود" , 0 , "تم بدء التدريب" , "لا تستطيع التدريب"];
		break;
		
	case "ba":  //Croatian - by bhcrow(updated by Pimp Trizkit)
		aLangTasks = ["Izgradi", "Unaprijedi", "Napad", "Istraživati", "Trenirati", "Zabava", "Rušiti", "Pošalji trgovci"];
		aLangStrings = ["Gradi poslije", "Unaprijedi poslije", 0, "Istraživati poslije", "Isplaniraj ovaj zadatak za poslije.", "Poela je gradnja ", 0, 0, " ne može graditi.", 0, "Isplaniran je zadatak.", 0, "Ne možemo zakazati ovaj zadatak upravo sada.", 0, "Planirani zadaci", "Izbrisati", "Pošalji Kasnije", "Trupe nisu odabrane.", "Vaša trupe su poslane", "Vaše postrojbe nisu mogle biti poslane u", "Podrška", "Napad", "Pljačka", "Katapulti će cilj", "slučajan", "u", "ili nakon", "sekundi", "minuta", "sahati", "dana", "špijun za resurse i trupe", "špijun za trupe i obrana", "od", "Napad ne može se planirati jer odredište nije naveden.", "na stranici br."];
		break;

	case "bg": //Bulgarian - by penko & pe (updated by Pimp Trizkit)
		aLangTasks = ["Построяване на", "Надстройка на", "Атака към", "Откриване на", "Трениране на", "Партия", "Сривам", "Изпрати Търговци"];
		aLangStrings = ["Постройте по-късно", "Надстройте по-късно", 0, "Открийте по-късно", "Запишете тази задача за по-късно.", "Започна строеж ", 0, 0, " не може да бъде построено.", 0, "Задачата е планирана.", 0, "Тази задача не може да бъде планирана сега.", 0, "Планирани задачи", "Изтриване", "Изпрати по-късно", "Атаката не може да бъде планирана, защото не са избрани войници.", "Вашите войници са изпратени към", "Вашите войници не могат да бъдат изпратени към", "Подкрепление към", "Атака към", "Набег към", "Катапултите се целят в", "случайно", "в", "или след", "секунди", "минути", "часа", "дена", "Шпиониране за ресурси и войска", "Шпиониране за войска и защита", "липсва", "Атаката не може да бъде планирана, тъй като не е избрана цел.", 0, "Сортиране по:", "тип ", "време ", "цел ", "опции ", "град ", "История на задачите", "изчистване на историята", "Започна изучаването", " не може да бъде изучен.", 0, "Шпионаж", "Тренирай по-късно", "войски.", 0, "Започна тренирането ", " не може да бъде трениран."];
		break;

	case "br":  //Portuguese - by getuliojr (updated by Pimp Trizkit)
		aLangTasks = ["Construir", "Melhorar", "Atacar", "Desenvolver", "Treinar", "Festa", "Demolir", "Enviar comerciantes"];
		aLangStrings = ["Construir Mais Tarde", "Melhorar Mais Tarde", 0, "Desenvolver Mais Tarde", "Programar esta tarefa para mais tarde.", "Começamos a construir ", 0, 0, " não pode ser construído.", 0, "A tarefa foi programada.", 0, "Não conseguimos programar esta tarefa agora.", 0, "Tarefas Programadas", "Apagar", "Enviar Mais Tarde", "Não foram selecionadas tropas.", "As suas tropas foram enviadas para", "Não foi possível enviar as suas tropas para", "Reforços", "At