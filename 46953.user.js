/**
Copyright 2007 Richard Laffers

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @author      Risi
// @email  rlaffers@gmail.com
// @namespace  http://userscripts.org/
// @name    Travian Task Queue
// @description  Schedule delayed constructions, upgrades and attacks.
// @include     http://s*.travian.*/*
// @include     http://s*.travian3.*/*
// @include     http://welt*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     1.2.10
// ==/UserScript==

/*****************
 * * * Settings * * * *
 ******************/
var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var iCheckEvery = 10000;  // How often do we check for tasks to trigger in miliseconds.
                          // Low value  = high accuracy in triggering tasks. To make your browser
              // unresponsive, set this to some ridiculously small number. Default is 10000
var sLang = "en";
var iPreloadTime = 20;  // How many seconds ahead is the code for building and upgrading prefetched.
                        // If the code is not available by the time the construction should start, the
            // construction will be cancelled. This value must be greater than iCheckEvery
            // in seconds (i.e. iCheckEvery/1000). Default is 20.
var bDisplayVillageNames = true;  //Display village names instead of numbers. May hit the performance.
var sCurrentServer = "";    // Set this to the server's url to override automatic server detection
                            // (i.e. s1.travian.net)
                            // Dont set it if you're playing on multiple servers simultaneously!

/**********************
**** End of Settings ****
***********************/


/** GLOBALS - do not tamper! */

var init = detectLanguage() && initialize();

if (init) {
    var sCurrentVersion = "1.3.7";  //Version number with which we need to run the update fu
    var bUseServerTime = getOption("USE_SERVER_TIME", false, "boolean"); //IMPORTANT!!! If true, you must be using 24-hour format on your server, otherwise there WILL be errors.
                                        // Your local computer time MUST  still be correct (both time and date!).
    var bLocked = false;  // for locking the TTQ_TASKS cookie
    var bLockedCode = false;  // for locking the TTQ_CODE_0 and TTQ_CODE_0  cookies
    var bLockedHistory = false;
    var oIntervalReference = null;
    var iSessionRefreshRate = 60;  //Amount of minutes after which the session is refreshed by reloading the dorf1 page in the background. If set to 0, refreshing is disabled. Default: 60
    var iMaxPlaceNamesCookieLength = 15;  //maximum number of names stored  in the cookie before it is cleared
    var iMyRace = getOption("RACE", 0, "integer");  // 0- Romans, 1- Teutons, 2- Gauls. Set via dialogue.
    var iHistoryLength = getOption("HISTORY_LENGTH", 7, "integer");
    var aLangBuildings = [];  //multilang support
    var aLangTasks = [];  //multilang support
    var aLangStrings = [];  //multilang support
    var aLangTroops = [];

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
    cssStyle +=  "#timerForm {padding:10px 20px; }";
    cssStyle += "#timerform_wrapper {position:absolute; max-width:900px !important; margin:0; background-color:#FBEC87; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
    cssStyle += "#timerform_wrapper p {}";
    cssStyle +=  "#ttq_message {position:absolute; z-index:100; border:1px solid black; padding:10px 20px; color:black; width:335px}";
    cssStyle += ".handle {cursor: move;}";
    cssStyle += "a.ttq_sortlink, a#ttq_flush_history {color:#000000;} a.ttq_sortlink:hover, a#ttq_flush_history:hover {color:#F64809} a.ttq_sortlink_active {color:#FDFF3F}";
    cssStyle += ".ttq_sort_header {border-bottom:1px dashed #000000}";
    cssStyle += ".ttq_research_later {display:block;}";

    GM_addStyle(cssStyle);


    /** ----------------------- Translations -------------------------------
     * IMPORTANT!
     * If there is no translation available for your language, the script will not work!
     * - aLangBuildings must list all names EXACTLY as they are printed on your Travian web site. Names are case-sensitive.
     * - aLangStrings[7] (= "level" in English) must read exactly what it is on your website next to building names of higher level.
     * - aLangStrings[11] (= "Current production:" in English)  must read exactly what it is on your website on the resource site pages.
     * >>> Please submit all translations to rlaffers@gmail.com <<<
     * -------------------------------------------------------------------------
     */

switch(sLang) {
  case "sk":
    aLangBuildings = ["", "Drevorubač", "Hlinená baňa", "Železná baňa", "Obilné pole", "Píla", "Tehelňa", "Zlievareň", "Mlyn", "Pekáreň", "Sklad surovín", "Sýpka", "Kováčska dielňa", "Zbrojnica", "Aréna", "Hlavná budova", "Bod stretnutia", "Trh", "Ambasáda", "Kasárne", "Stajne", "Dielňa", "Akadémia", "Úkryt", "Radnica", "Rezidencia", "Palác", "Pokladňa", "Obchodný kancelár", "Veľké kasárne", "Veľké stajne", "Mestské hradby", "Zemná hrádza", "Palisáda", "Kamenár", "Pivovar", "Pasce", "Hrdinský dvor", "Veľký sklad", "Veľká sýpka", "Div sveta"];
    aLangTasks = ["Postaviť", "Rozšíriť", "Zaútočiť na", "Vynájsť", "Trénovať"];
    aLangStrings = ["Postaviť neskôr", "Rozšíriť neskôr", "Zaútočiť neskôr", "Vynájsť neskôr", "Naplánujte túto akciu na neskôr.", "Začali sme stavať ", " - úspech neznámy.", "úroveň", " sa nedá postaviť.", " sa nedá rozšíriť.", "Úloha je naplánovaná.", "Aktuálna produkcia:", "Túto úlohu momentálne nie je možné naplánovať.", "Momentálne nie je možné plánovať úlohy!", "Naplánované úlohy", "Zmazať", "Vyslať neskôr", "Neboli vybraté žiadne jednotky.", "Jednotky mašírujú do", "Nepodarilo sa vyslať jednotky do", "Podporiť", "Zaútočiť na", "Olúpiť", "Katapulty zacieliť na", "náhodne", "o", "alebo za", "sekúnd", "minút", "hodín", "dní", "Preskúmať jednotky a suroviny", "Preskúmať jednotky a obranné objekty", "preč", "Útok nemožno naplánovať, pretože nie je známy cieľ.", "na mieste č.", "Zoradiť podľa:", "typu ", "času ", "cieľa ", "iné ", "dediny ", "História akcií", "zmazať históriu", "Začali sme vyvíjať ", " sa nedá vynájsť.", "Vylepšiť neskôr", "Vyšpehovať", "Trénovať neskôr", "jednotky.", "Vytrénovať", "Začali sme trénovať ", " sa nedá vytrénovať." ];
    aLangTroops[0] = ["Legionár", "Pretorián", "Imperián", "Equites Legáti", "Equites Imperatoris", "Equites Caesaris", "Rímske baranidlo", "Ohnivý katapult", "Senátor", "Osadník", "Hrdina"];  //Romans
    aLangTroops[1] = ["Pálkar", "Oštepár", "Bojovník so sekerou", "Špeh", "Rytier", "Teuton jazdec", "Germánske baranidlo", "Katapult", "Kmeňový vodca", "Osadník", "Hrdina"];  //Teutons
    aLangTroops[2] = ["Falanx", "Šermiar", "Sliedič", "Theutates Blesk", "Druid jazdec", "Haeduan", "Drevené baranidlo", "Trebušé", "Náčelník", "Osadník", "Hrdina"];  //Gauls
    break;

  case "ae": //by Fahad
    aLangBuildings = ["", "الحطاب", "حفرة الطين", "منجم حديد", "حقل القمح", "معمل النجاره", "مصنع الطوب", "مصنع الحديد", "المطاحن", "المخابز","مخزن", "مخزن الحبوب", "حداد", "مستودع الاسلحة", "ساحة البطولة", "المبنى الرئيسي", "نقطة التجمع", "السوق", "السفارة" ,"ثكنه", "الاسطبل", "المصانع الحربية","الاكاديميه الحربية", "المخبأ", "البلدية", "السكن", "قصر", "الكنز","المكتب التجاري", "الثكنة الكبيرة", "الاسطبل الكبير", "الحاجز","السور الاضي", "سياج الاغريق", "الحجار","مصنع العصير", "الصياد", "قصر الابطال", "المستودعات الكبيرة", "مخازن الحبوب الكبيرة", "معجزة العالم"];
    aLangTasks = ["بناء", "تطوير", "هجوم", "فتح قسم", "تدريب"];
    aLangStrings = ["البناء لاحقا", "تطوير لاحقا", "الهجوم لاحقا", "فتح القسم لاحقا", "جدولة هذا العمل لاحقا", "لقد بداءالبناء ", " هذه العملية غير معروفة النتائج.", "المستوى", " لا يمكن ان يبناء.", " لا يمكن ان يطوير", "هذا العمل مجدول","العمل القائم", "لا يمكن ادراج هذه العملية لان.", "المهم المجدولة غير متاحه","المهام المجدولة", "حذف", "ارسال لاحقا", "لم يتم اختيار الجنود.", "الجنود متوجهين الى","جيوشك لا يمكن ارسالها الى", "مساندة", "هجوم", "نهب", "تصويب المقلاع نحو", "عشوائي","عند", "او بعد", "ثانية", "دقيقة", "ساعة", "يوم", "التجسس على الجيوش والموارد","التجسس على الجيوش والتحصينات", "بعيد","لا يمكن جدولة هذا الهجوم لان الهدف غير محدد ", "الموقع غير موجود", "فرز بواسطة:","النوع ", "الوقت ", "الهدف ", "الخيارات ", "القرية ", "مهام محفوظه", "محفوظات حالية","بداية عملية البحث ", " لا تستطيع اعادة البحث" , "تطوير لاحقا" , "تجسس" , "تدريب لاحقا" , "جنود" , "تدريب" , "تم بدء التدريب" , "لا تستطيع التدريب" ];
    aLangTroops[0] = ["جندي أول", "حراس الأمبراطور", "جندي مهاجم", "فرقة تجسس", "سلاح الفرسان", "فرسان قيصر", "كبش", "المقلاع الناري", "حكيم", "مستوطن", "بطل"];  //Romans
    aLangTroops[1] = ["مقاتل بهراوة", "مقاتل برمح", "مقاتل بفأس", "الكشاف", "مقاتل القيصر", "فرسان الجرمان", "محطمة الابواب", "المقلاع", "الزعيم", "مستوطن", "بطل"];  //Teutons
    aLangTroops[2] = ["الكتيبه", "مبارز", "المستكشف", "رعد الجرمان", "فرسان السلت", "فرسان الهيدوانر", "محطمة الابواب الخشبية", "المقلاع الحربي", "رئيس", "مستوطن", "بطل"];  //Gauls
    break;


}


    // Do not change the array below!
    var aLangStringsMaster = ["ساخته جنبی", "بهبود امکانات", "حمله بعدی", "پژوهش بعدی", "برنامه وظایف بعدی", "ما ساختن رو شروع کردیم شما بی خیال شو  ", " تلاش شما بی نتیجه بود برو بابا ", "مرحله", " ساختن انجام نشد", " لول آپ نشد", "لیست منتظر حمله ", "محصول باقی مانده:", "وظایف به درستی انجام نشد", "وظایف قابل شناسایی نیست", "وظایف برنامه ریزی شده", "پاک کردن", "بعد فرستادن نیرو", "هیچ سربازی انتخاب نشده است", "سربازان شما حمله کردند", "سربازان شما قابل فرستادن نیستند", "پشتیبانی", "حمله", "هجومی", "هدفگیری منججنیق", "تصادفی", "در", "یا عقب", "ثانیه", "دقیقه", "ساعت", "روز", "جاسوسی نیرو ومنابع", "جاسوسی قدرت دفاعی و نیروها", "away", "جمله در زمان تعیین شده نتوانست انجام شود", "در موقعیت نیست", "طبقه بندی بر اساس::", "نوع ", "زمان ", "هدف ", "تنظیمات ", "روستا ", "وظایف انجام شده", "تمام وظایف", "ما جستوجو را شروع کردیم ", " نتوانستیم جستوجو کنیم", "افزودن بعداً", "جاسوس", "تربیت بعداً", "سربازها.", "تعلیم", "ما تعلیم را شروع کردیم ", " نتوانستیم تعلیم دهیم."];
}


/**
* Custom log function .
* @param {int} level
* @param:{int} msg Message to log.
*/
function _log(level, msg) {
  if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1)
    GM_log(msg);
}


/**
 * Performs some initial checkings on conditions that have to be met to run the script
 *
 * @return true if initialization was successfull, false otherwise
 */
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
    var re = new RegExp("^http://(.+\.travian3?\.[a-zA-Z.]+)(\/.*)?$", "i");
  var server = re.exec(window.location.href);
    if ((server) && (server[1])) {
        sCurrentServer = server[1] + "_";
        _log(1, "using settings for server '" + server[1] + "'");
        return true;
    }
    else {
         _log(0, "ERROR, unknown Travian server!");
        return false;
    }
}

/**
 * Detects the language used based on the server's url
 *
 * @return true if the language is successfully detected, false otherwise
 */
function detectLanguage() {
  //if(sLang != "") {return true;}
  var re = null; re = new RegExp("([a-zA-Z]{2,3})(\/.*)?$", "i");
  var lang = re.exec(window.location.href);

    if(!lang) {
            _log(0, "failed to detect language automatically!");
    if(sLang == "") sLang = "en";
        return true;
  } else {
        sLang = lang[1];
            _log(2, "detected language '" + sLang + "'");
        return true;
    }
}

function checkSetTasks() {
    _log(2, "Checking set tasks...");
    _log(3, "oIntervalReference " + oIntervalReference);

  if(bLocked) {
      _log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
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
    data = aTasks.join("|");
      _log(3, "New task list: " + data);
    setVariable("TTQ_TASKS", data);
  }
  bLocked = false;

}

function refreshTaskList(aTasks) {
    _log(3, "-> refreshTaskList()");

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
  oTaskList.innerHTML = "<div id='ttq_draghandle' class='handle ttq_draghandle' >"+t("Scheduled Tasks")+"</div>";

  //Sort links
  var currentSort = getOption("TASKLIST_SORT", 1, "integer");
  var sortLinkWrapper = document.createElement("div");
  sortLinkWrapper.innerHTML += "<span class='ttq_sort_header'>&raquo; " +t("Sort by:")+ "</span> ";
  var sortKeys = [1,4,0,2];  //order is important
  var sortLabels = ["type ", "time ", "target ", "option ", "village "]
  sortKeys.forEach(function(el) {
    var sortLink = document.createElement("a");
    sortLink.innerHTML = t(sortLabels[el]);
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
    oDeleteLink.title = t("Delete");
    oDeleteLink.setAttribute("itaskindex", i);
    oDeleteLink.addEventListener('click',  deleteTask, false);

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
        sTaskMoreInfo = t("at site no.") + " " +aThisTask[2];
        break;
      case "2":  //attack
        //sTaskSubject = aThisTask[2];
        sTaskSubject = '<span id="ttq_placename_' +aThisTask[2]+ '">' + getPlaceName(aThisTask[2]) + '</span>';
        if(sTaskSubject == '') {sTaskSubject = aThisTask[2]};
        var aTroops = aThisTask[3].split("_");
        if(onlySpies(aTroops)) {
          sTask = t("Spy");
        } else {
          var iIndex = parseInt(aTroops[0]) + 18;
          if(iIndex == 20) sTask = t('Support');
          if(iIndex == 21) sTask = t('Attack');
          if(iIndex == 22) sTask = t('Raid');
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



    _log(3, "<- refreshTaskList()");
}

function refreshHistory(aTasks) {
    _log(3, "Refreshing history...");
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
  oHistory.innerHTML = "<div id='ttq_history_draghandle' class='handle ttq_draghandle' >"+t("Task History")+"</div>";

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

  orderList(1, "ttq_history_row");

  //flush link
  var oFlushLink = document.createElement('a');
  oFlushLink.id = 'ttq_flush_history';
  oFlushLink.innerHTML = t('flush history');
  oFlushLink.href = '#';
  oHistory.appendChild(oFlushLink);
  oFlushLink.addEventListener('click', flushHistory, false);
}

function makeHistoryRow(aTask, index, iServerTimeOffset) {
      _log(3, "-> makeHistoryRow()");
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
        sTaskMoreInfo = t("at site no.") + " " +aTask[2];
        break;
      case "2":  //attack
        sTaskSubject = '<span id="ttq_placename_history_' +aTask[2]+ '">' + getPlaceName(aTask[2]) + '</span>';
        if(sTaskSubject == '') {sTaskSubject = aTask[2]};
        var aTroops = aTask[3].split("_");
        if(onlySpies(aTroops)) {
          sTask = t("Spy");
        } else {
          var iIndex = parseInt(aTroops[0]) + 18;
          if(iIndex == 20) sTask = t('Support');
          if(iIndex == 21) sTask = t('Attack');
          if(iIndex == 22) sTask = t('Raid');
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

/**
* @param iORderBy: 0 - tasktype, 1 - timestamp, 2 - target, 3 - options, 4 - villagedid
*/
function orderList (iOrderBy, sRowId) {
  var rows = xpath('//div[contains(@id, "' +sRowId+ '")]');
  if(rows.snapshotLength > 0) {
    switch(iOrderBy) {
      case 0:
        var sortKey = "tasktype";
        break;
      case 2:
        var sortKey = "target";
        break;
      case 3:
        var sortKey = "options";
        break;
      case 4:
        var sortKey = "villagedid";
        break;
      case 1:
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
    _log(3, "-> deleteTask()");
  var iTaskIndex = e.target.parentNode.getAttribute("itaskindex");
    _log(2, "Deleting task "+iTaskIndex);

  if(bLocked) {
      _log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
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
    _log(3, "<- deleteTask()");
}

/**
  * Schedules the specified task. The task is stored in a cookie.
  * @param iTask: name of the task (0-build, 1-upgrade, 2-attack, 3-research)
  * @param iWhen: date when the task is to be triggered
  * @param target: iBuildingId, or iVillageId
  * @param options: what to build, what units to send attacking (first member specifies the type of attack: 0-support, 1-normal attack, 2-raid).
  */
function setTask(iTask, iWhen, target, options) {
    _log(3, "-> setTask()");

  var iVillageId = getActiveVillage();

  if(bLocked) {
      _log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
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
    printMsg("<span class='ttq_village_name' style='display:block;'>" +getVillageName(iVillageId)+ "</span>" +t("We can't schedule this task right now."), true);
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
          sTask = t("Spy");
      } else {
          var iIndex = parseInt(aTroops[0]) + 18;
          if(iIndex == 20) sTask = t('Support');
          if(iIndex == 21) sTask = t('Attack');
          if(iIndex == 22) sTask = t('Raid');
      }
      break;
    case "3":  //research
      sTaskSubject = aLangTroops[iMyRace][options-1];
      sTask = aLangTasks[3];
      break;
    case "4":  //training
      var aTroops = options.split("_");
      sTaskSubject = getTroopsInfo(aTroops);
      sTask = t('Train');
      break;
    default:
      break;
  }

  printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(iVillageId)+ '</span>' + t("The task was scheduled.") + '<br/><span style="font: italic 80%;">' +sTask+ ' ' +sTaskSubject+ '</span>');
  if(!oIntervalReference) {
    oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery);  //start checking if there is any task to trigger
    _log(2, "Started checking for the set tasks...");
  }
    _log(3, "<- setTask()");
}

/**
 * Performs the supplied task. Prints the report.
 * @param aTask: [task, when, target, options]
 */
function triggerTask(aTask) {
    _log(3, "-> triggerTask()");
  switch(aTask[0]) {
    case "0":
      //build new building
      build(aTask);
      break;
    case "1":
      // upgrade building
      upgrade(aTask);
      break;
    case "2":
      // upgrade building
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
    default:
      //do nothing
        _log(3, "Can't trigger an unknown task.");
        break;
  }
    _log(3, "<- triggerTask()");
}

function build(aTask) {
    _log(3, "-> build()");
  // we will assume that there is a correct up-to-date code in the cookie
  var sCode = '';

  var sCookie = getVariable("TTQ_CODE_0");
  if(sCookie != '') {
      _log(3, "building code found (TTQ_CODE_0)");
    var aCookie = sCookie.split(",");
    var iIndexOfVillageId = aCookie.indexOf(aTask[4]);
    if(iIndexOfVillageId > -1) {  //the village id found
      sCode = aCookie[iIndexOfVillageId + 1];
    }
  } else {
      _log(3, "No building code available (TTQ_CODE_0)");
  }

  //TODO: if the code is not there, or is there but incorrect, try to get a new one, register event listener, and start building when the code is updated (implement timeouts to this)

  if(sCode == '') {  // no code - no building possible
    _log(1, "No code found. Building this building is not possible.");
    printMsg("<span class='ttq_village_name' style='display:block;'>" +getVillageName(aTask[4])+ "</span>" + aLangBuildings[aTask[3]] + t(" cannot be built."), true); // Your building can't be built.
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
    _log(3, "<- build()");
}

function upgrade(aTask) {
    _log(3, "-> upgrade()");

  // try to load the code
  var sCode = '';

  var sCookie = getVariable("TTQ_CODE_1");
  if(sCookie != '') {
      _log(3, "upgrading code found (TTQ_CODE_1)");
    var aCookie = sCookie.split(",");
    var iIndexOfVillageId = aCookie.indexOf(aTask[4]);
    if(iIndexOfVillageId > -1) {  //the village id found
      sCode = aCookie[iIndexOfVillageId + 1];
    }
  } else {
      _log(3, "No upgrading code found (TTQ_CODE_1)");
  }

  if(sCode == '') {  // no code - no building possible
    _log(1, "No code found. Upgrading this building is not possible.");
    printMsg("<span class='ttq_village_name' style='display:block'>" +getVillageName(aTask[4])+ "</span>" + aLangBuildings[aTask[3]] + t(" cannot be upgraded."), true); // Your building can't be built.
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
    _log(3, sUrl);
  var myOptions = [aTask, currentActiveVillage];
  get(sUrl, handleRequestBuild, myOptions)
    _log(3, "<- upgrade()");
}

function attack(aTask) {
    _log(3, "-> attack()");

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

    _log(3, "<- attack()");
}

function research(aTask) {
    _log(3, "-> research()");

  if(aTask[4] != 'null') {
    var sNewDid = "&newdid=" +aTask[4];
  } else {
    var sNewDid = "";
  }
  var currentActiveVillage = getActiveVillage();
  var sUrl = "build.php?id=" + aTask[2] + "&a=" + aTask[3] +  sNewDid;
  var myOptions = [aTask, currentActiveVillage];
  get(sUrl, handleRequestResearch, myOptions);

    _log(3, "<- research()");
}

function train(aTask) {
    _log(3, "-> train()");

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
      _log(3, "No troops specified. Exiting function.");
    return;
  }
    _log(3, sParams);

  var myOptions = [aTask, currentActiveVillage];


  if(aTask[4] != 'null') {  //multiple villages
    //we need to switch village
      _log(2, "Switching to village:" +aTask[4]);
    var currentActiveVillage = getActiveVillage();
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "dorf1.php?newdid=" + aTask[4], true);
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) { // ok
            _log(2, "Village switched to " +aTask[4]);
          post("build.php", sParams, handleRequestTrain, myOptions);
            _log(2, "The training was requested.");
        }
      }
    };
    httpRequest.send(null);
  } else {  //only 1 village
    post("build.php", sParams, handleRequestTrain, myOptions);
      _log(2, "Training was requested.\n" + sParams);
  }

    _log(3, "<- train()");
}

/**
* @param options: [aTask, iCurrentActiveVillage] (optional)  OR sNewdid in case of finding the code for construction.
*/
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
  httpRequest.onreadystatechange = function() {
    callback(httpRequest, options)
  };
  data = encodeURI(data);
  httpRequest.open("POST", url, true);
  httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpRequest.setRequestHeader("Content-length", data.length);
  httpRequest.setRequestHeader("Connection", "close");
  //httpRequest.overrideMimeType('text/html');
  httpRequest.overrideMimeType("application/xhtml+xml");
  httpRequest.send(data);
}

function handleRequestBuild(httpRequest, options) {
    _log(3, "-> handleRequestBuild()");
  var aTask = options[0];
  var activateVillageDid = options[1];
  if (httpRequest.readyState == 4) {
    if (httpRequest.status == 200) { // ok
      var sResponse = httpRequest.responseText;
        _log(3, sResponse);
      if(!sResponse) {  // error retrieving the response
        printMsg( aLangTasks[aTask[0]] + " " + aLangBuildings[aTask[3]] + t(" was attempted with unknown result."), true );
        return;
      }
      var re = new RegExp('<div id="lbau.">.*' + aLangBuildings[aTask[3]] + '.*</div>', 'i');
      if(sResponse.match(re)) {
        printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + t("We started builing ") + aLangBuildings[aTask[3]]);  //Your building is being built.
        addToHistory(aTask, true);
      } else {
        printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + aLangBuildings[aTask[3]] + t(" cannot be built."), true); // Your building can't be built.
        addToHistory(aTask, false);
      }
    } else { // failed
        _log(2, "HTTP request status: " + httpRequest.status);
    }
    if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
  }
    _log(3, "<- handleRequestBuild()");
}

function handleRequestAttack(httpRequest, options) {
    _log(3, "-> handleRequestAttack()");
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
        printMsg(t("Your troops were sent to") + " " + sPlaceName);
        addToHistory(aTask, true);
      } else {
          _log(1, "Your attack could not be sent.");
        printMsg(t("Your troops could not be sent to") + " " +sPlaceName, true);
        addToHistory(aTask, false);
      }
    } else { // failed
        _log(2, "HTTP request status: " + httpRequest.status);
    }
    if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
    return;
  }
    _log(3, "<- handleRequestAttack()");
}

function handleRequestResearch(httpRequest, options) {
    _log(3, "-> handleRequestResearch()");
  var aTask = options[0];
  var activateVillageDid = options[1];
  if (httpRequest.readyState == 4) {
    if (httpRequest.status == 200) {
      var sResponse = httpRequest.responseText;
      if(!sResponse) { // error retrieving the response
        printMsg( aLangTasks[aTask[0]] + " " + aTask[3] + t(" was attempted with unknown result."), true );
        return;
      }
      xpath("//form/table[2]//td[1]/img[@class='unit']");
      //var re = new RegExp('<div id="lbau.">.*' + aTask[3] + '.*</div>', 'i');
      var iUnit = (iMyRace == 0) ? aTask[3] : iMyRace + aTask[3];
      var re = new RegExp('<td width="\.%"><img class="unit" src="\[^"\]*img/un/u/' +iUnit+ '.gif" border="0"></td>', 'i');
      if(sResponse.match(re)) {
        printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + t("We started researching ") + aLangTroops[iMyRace][aTask[3]-1]);
        addToHistory(aTask, true);
      } else {
        printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + aLangTroops[iMyRace][aTask[3]-1] + t(" cannot be researched."), true);
        addToHistory(aTask, false);
      }
    } else { // failed
        _log(2, "HTTP request status: " + httpRequest.status);
    }
    if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
  }
    _log(3, "<- handleRequestResearch()");
}

function handleRequestTrain(httpRequest, options) {
    _log(3, "-> handleRequestTrain()");
  var aTask = options[0];
  var activateVillageDid = options[1];

  if (httpRequest.readyState == 4) {
    if (httpRequest.status == 200) {
      var sResponse = httpRequest.responseText;
        _log(3, sResponse);
      if(!sResponse) { // error retrieving the response
        printMsg( aLangTasks[aTask[0]] + " " + aTask[3] + t(" was attempted with unknown result."), true );
        return;
      }
      var iUnit = (iMyRace == 0) ? aTask[3] : iMyRace + aTask[3];
      var troopsInfo = getTroopsInfo(aTask[3].split("_"));
      var re = new RegExp('width="\.%"><img class="unit" src="\[^"\]*img/un/u/' +iUnit+ '.gif" border="0">', 'i');
      if(sResponse.match(re)) {
        printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + t("We started training ") + troopsInfo);
        addToHistory(aTask, true);
      } else {
        printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + troopsInfo + t(" cannot be trained."), true);
        addToHistory(aTask, false);
      }
    } else { // failed
        _log(2, "HTTP request status: " + httpRequest.status);
    }
    if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
  }



    _log(3, "<- handleRequestTrain()");
}

function handleRequestFindCode(httpRequest, sNewdid) {
    _log(3, "-> handleRequestFindCode()");
  if (httpRequest.readyState == 4) {
    if (httpRequest.status == 200) { // ok
      var sResponse = httpRequest.responseText;
        _log(3, sResponse);
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
    _log(3, "<- handleRequestFindCode()");
}

function switchActiveVillage(did) {
    _log(2, "Switching your village back to " +did);
  if(!isInt(did)) {return;  }
  get("dorf1.php?newdid="+did, null, null);
}

/**
* Adds task to the log DIV.
* @param bSuccess: true if the task was successfully performed.
*/
function addToHistory(aTask, bSuccess) {
    _log(3, "Adding to history...");
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

/**
* This only trims the value read from cookie. Cookie itself is trimmed when new event is entered into history.
* It trimms the value down to maxlength.
*/
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
    _log(3, "-> createBuildLinks()");
  var iSiteId = getBuildingId();
  if(iSiteId == false) {return false;}

  var iTask = 0;  //the default action is build


  // Get the building name(s)
  var sXpathExpr = "//h1/b";
  var xpathRes = xpath(sXpathExpr);

  if(xpathRes.snapshotLength > 0) {  //standing building
      _log(3, "This is an existing building.");
    iTask = 1;
    var xpathBuildingNames = xpathRes;
    var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i");  // Will be used later for matching buildings and resource sites
    var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"
      _log(3, "Regular expressions (existing site):\n" + re + "\n" + re2);
  } else {  //empty building site or error
      _log(3, "This is an empty building site.");
    var xpathBuildingNames = xpath("//h2");
    var re = new RegExp("^([^0-9].*)", "i");  // Will be used later. For matching all except "X. Cranny"
    var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"
      _log(3, "Regular expressions (new site):\n" + re + "\n" + re2);
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
      oLink.innerHTML = " " + aLangStrings[iTask];
      oLink.title = t("Schedule this task for later.");
      oLink.href = "#";
      oLink.setAttribute("itask", iTask);
      oLink.setAttribute("starget", iSiteId);
      oLink.setAttribute("soptions", sBuildingId);
      oLink.addEventListener('click',  displayTimerForm, false);

      if(iTask == 0) {xpathBuildingNames.snapshotItem(i).nextSibling.nextSibling.appendChild(oLink);}
      else if(iTask == 1) {xpathBuildingNames.snapshotItem(i).parentNode.nextSibling.nextSibling.appendChild(oLink);}
    } else {
      _log(2, "Building name found, but it was not identified in the building list.\n"+sBuildingName+"\n"+re);
    }
  }

    _log(3, "<- createBuildLinks()");
}

function createAttackLinks() {
    _log(3, "-> createAttackLinks()");

  var xpathResult = xpath("id('lmid2')//input[@type='text']");
  if(xpathResult.snapshotLength < 1) {
      _log(3, "We are not creating the 'Send later' button here.");
    return false;
  }

  // create the submit button
  var oBtn = document.createElement("input");
  oBtn.type = "button";
  oBtn.value = t("Send later");
  oBtn.style.margin = "3px 6px";
  oBtn.addEventListener("click", scheduleAttack, false);

  var oOkBtn = document.getElementsByName('s1');
  oOkBtn[0].parentNode.appendChild(oBtn);

  //create textbox for hero if it's not present
  xpathResult = xpath("id('lmid2')/table[1]/tbody/tr/td/table/tbody/tr[3]/td[8]");
  if(xpathResult.snapshotLength < 1) {  //no hero textbox - make one
    xpathResult = xpath("id('lmid2')/table[1]/tbody/tr/td/table/tbody/tr[3]");
    if(xpathResult.snapshotLength > 0) {
      xpathResult.snapshotItem(0).lastChild.setAttribute("colspan", "3");
      //xpathResult.snapshotItem(0).innerHTML += '<td width="20"><img class="unit" src="img/un/u/hero.gif" title="" border="0" onclick="document.snd.t11.value=\'\'; return false;" ></td><td width="35"><input class="fm" type="Text" name="t11" value="" size="2" maxlength="6"></td><td class="f8 c b"><b>(' +aLangStrings[33]+ ')</b></td>';

      var oTd1 = document.createElement('td');
      var oTd2 = document.createElement('td');
      var oTd3 = document.createElement('td');
      oTd1.innerHTML = '<img class="unit" src="img/un/u/hero.gif" title="" border="0" >';
      oTd2.innerHTML = '<input class="fm" type="Text" name="t11" value="" size="2" maxlength="6">';
      oTd3.innerHTML = '<b>(' +t("away")+ ')</b>';
      oTd3.className = 'f8 c b';
      xpathResult.snapshotItem(0).appendChild(oTd1);
      xpathResult.snapshotItem(0).appendChild(oTd2);
      xpathResult.snapshotItem(0).appendChild(oTd3);

    }
  }

    _log(3, "<- createAttackLinks()");
}

function createResearchLinks() {
    _log(3, "-> createResearchLinks()");
  var re = /.*build\.php\?id=([0-9]{1,2})/i;
  var sLocation = window.location.href;
  var iSiteId = getBuildingId();
  if(iSiteId == false) {return false;}

  //is this Academy, Smithy or armory?
  var buildingName = xpath("//h1/b");
  if(buildingName.snapshotLength < 1) {
      _log(2, "Building name not found.")
    return;
  }
  var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i");
  buildingName = buildingName.snapshotItem(0).innerHTML.match(re);
  switch(buildingName[1]) {
    case aLangBuildings[22]: //academy
      var linkTxt = t("Research later");
      break;
    case aLangBuildings[12]:  //smithy
    case aLangBuildings[13]:  //armory
      var linkTxt = t("Enhance later");
      break;
    default:
      _log(2, "No research links needed.");
      return;
  }

  //build links
    _log(2, "Adding research later links...");
  var Imgs = xpath("id('lmid2')/form/table[1]/tbody/tr/td[1]/table/tbody/tr[1]/td[1]/img");
  var Cells = xpath("//form/table[1]/tbody/tr/td[2]/div | //form/table[1]/tbody/tr/td[2]/a");
  for(var i = 0; (i < Imgs.snapshotLength) && (i < Cells.snapshotLength); i++) {
    var thisImg = Imgs.snapshotItem(i);
    var thisCell = Cells.snapshotItem(i);
    var iTroopId = thisImg.src.match(/([0-9]{1,2})\.gif/i);
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
    oLink.addEventListener('click',  displayTimerForm, false);
    thisCell.parentNode.appendChild(oLink);
  }

    _log(3, "<- createResearchLinks()");
}

function createTrainLinks() {
    _log(3, "-> createTrainLinks()");

  var re = /.*build\.php\?id=([0-9]{1,2})/i;
  var iSiteId = getBuildingId();
  if(iSiteId == false) {return false;}

  //is this Barracks, Stables, Workshop, Residence or Palace?
  var buildingName = xpath("//h1/b");
  if(buildingName.snapshotLength < 1) {
      _log(2, "Building name not found.")
    return;
  }
  var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i");
  buildingName = buildingName.snapshotItem(0).innerHTML.match(re);
  var bIsResidence = false;
  switch(buildingName[1]) {
    case aLangBuildings[19]: //barracks
    case aLangBuildings[20]: //stables
    case aLangBuildings[21]: //workshop
      var linkTxt = t("Train later");
      break;
    case aLangBuildings[25]: //residence
    case aLangBuildings[26]: //palace
      re = /s=[0-9]+/i;
      if(re.test(location.href) ) {  //not on the first page of palace/residence
        return;
      }
      bIsResidence = true;
      var linkTxt = t("Train later");
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
      oBtn.style.margin = "3px 6px";
      oBtn.addEventListener("click", scheduleTraining, false);
      trainBtn.snapshotItem(0).parentNode.appendChild(oBtn);
    } else {  //we need to build the textbox
      //get the code. No code - no training
      var iCode = xpath("id('lmid2')/form//input[@name='z']");
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
    var trainBtn = xpath("id('lmid2')/form/p/input[@type='image']");
    if(trainBtn.snapshotLength < 1) {  //button not found
        _log(2, "The Train button not found. Exiting function...");
      return false;
    }
    var oBtn = document.createElement("input");
    oBtn.type = "button";
    oBtn.value = linkTxt;
    oBtn.style.margin = "3px 6px";
    oBtn.addEventListener("click", scheduleTraining, false);
    trainBtn.snapshotItem(0).parentNode.appendChild(oBtn);
  }

    _log(3, "<- createTrainLinks()");
}


function scheduleAttack(e) {
    _log(3, "-> scheduleAttack()");

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
    printMsg(t("The attack cannot be scheduled because no destination was specified."), true);
    return false;
  }

  var aTroops = new Array();
  var iAttackType = null;
  var sXpathExpr = "//div[@class='f10']/input[@type='radio']";
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

  sXpathExpr = "//table[@class='p1']//table//td/input[@type='text']";
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
    printMsg(t("سرباز برای این حمله تعیین نکردید  بی مغز.") , true);
      return false;
  }

  // Good, we have at least 1 troop. Display the form
  displayTimerForm(2, iVillageId, aTroops);
    _log(3, "<- scheduleAttack()");
}

function scheduleTraining(e) {
  var Inputs = xpath("id('lmid2')//table//input[@type='text']");
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
    if(Inputs.snapshotItem(i).value && Inputs.snapshotItem(i).value != 0) {bNoTroops = false;}
  }

  if(bNoTroops) {
      _log(2, "No troops were selected. Unable to schedule training.");
    printMsg(t("No troops were selected.") , true);
      return false;
  }

  //get the code
  var iCode = xpath("id('lmid2')/form//input[@name='z']");
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

/**
 * @param iTask: 0 - build, 1 - upgrade, 2 - attack,raid,support
 * @param target: sitedId for iTask = 0 or 1; iVillageId for siteId = 2
 * @param options: buildingId for iTask = 0; troops for attacks.
 * @param timestamp: if it is passed, suggest the time calculated from this (Caution! It is in seconds).
 * This function functions both as a Listener for Build later and Upgrade later links,
 * and as regular function when arguments are supplied (in case of scheduling attacks and editing existing tasks).
 */
function displayTimerForm(iTask, target, options, timestamp) {
    _log(3, "-> displayTimerForm()");

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
      sMoreInfo = t("at site no.") + " " +target;
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
      sWhat = t("troops.");
      sTask = aLangTasks[4];
      sMoreInfo = getTroopsInfo(options);
      options = options.join("_");
      break;
  }

  var oTimerForm = document.createElement("form");

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
    sCataTargets = '<select name="kata" size="" class="f8"><option value="99">' +t("random")+ '</option>' + sCataOptions + '</select>';
    sCataTargets += '<select name="kata2" size="" class="f8"><option value="99">' +t("random")+ '</option>' + sCataOptions + '</select>';
  }

  //Allow specifying the spying mode (only if there is nothing but spies being sent and if this is not a support)
  var sSpyMode = '';
  if(iTask == 2 && iAttackType > 20 && bOnlySpies) {
    sSpyMode = '<input type="radio" name="spy" value="1" checked>' +t("Spy for resources and troops")+ ' <input type="radio" name="spy" value="2">' +t("Spy for troops and defenses");
  }

  oTimerForm.id = "timerForm";
  oTimerForm.setAttribute("class", "handle");
  var sLinkClose = "<a href='#' onclick='document.body.removeChild(document.getElementById(\"timerform_wrapper\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";

  oTimerForm.innerHTML = sLinkClose + '<input type="hidden" name="timerTask" value="' +iTask+ '" /><input type="hidden" name="timerTarget" value="' +target+ '" /><input type="hidden" name="timerOptions" value="' +options+ '" /><p>' +sTask+ ' ' +sWhat+ '<br/>' + t("at") + ' <input name="at" onmousedown="function(e){alert(\'oleeee\');/*e.stopPropagation();*/}" type="text" id="at" value="' +sTime+ '" onfocus="document.getElementById(\'after\').value = \'\'; this.value=\'' +sTime+ '\'" title="' +sTimeType+ '" /> ' + t("or after") + ' <input name="after" type="text" id="after" onfocus="document.getElementById(\'at\').value = \'\';" /><select name="timeUnit"><option value="1">' + t("seconds") + '</option><option value="60" selected="selected">' + t("minutes") + '</option><option value="3600">' + t("hours") + '</option><option value="86400">' + t("days") + '</option></select><br/><span style="font-size:75%; cursor:default;">' +sMoreInfo+ '</span></p>';

  if(sCataTargets != '') {
    oTimerForm.innerHTML += '<p>' + t("Catapults will aim at") + ': ' +sCataTargets+ ' </p>';
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
    _log(3, "<- displayTimerForm()");
  return false;
}

function handleTimerForm(oForm) {
    _log(3, "-> handleTimerForm()");
  var at = oForm.at.value;
  if(at == '') {
    var after = oForm.after.value;
    var timeUnit = oForm.timeUnit.value;
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

  if(oForm.kata) { //store catapults targets
    oForm.timerOptions.value += "_" +oForm.kata.value;
  }

  if(oForm.kata2) { //store catapults targets
    oForm.timerOptions.value += "_" +oForm.kata2.value;
  }

  if(oForm.spy) {  //spying mission
    for(var i = 0; i < oForm.spy.length; i++) {
      if(oForm.spy[i].checked) {oForm.timerOptions.value += "_" + oForm.spy[i].value;}
    }
  }

  setTask(oForm.timerTask.value, iTaskTime, oForm.timerTarget.value, oForm.timerOptions.value);
    _log(3, "<- handleTimerForm()");
}


/** @return true if there are only spies, false if there is anything else or no spies. */
function onlySpies(aTroops) {
    _log(3, "-> onlySpies()");

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
    _log(3, "<- onlySpies()");
}

function printMsg(sMsg,bError) {
    _log(3, "-> printMsg()");
  var oDate = new Date();
  var sWhen = oDate.toLocaleString() + "\n";
  _log(1, sWhen + sMsg);
  //alert(sMsg);

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
    _log(3, "<- printMsg()");
}

/** Experimental: Send messages in the game
 * TODO: The sC parameter needs to be loaded and saved once.
 */
function sendMsg(sTo, sSubject, sMsg, sC) {
    _log(3, "-> sendMsg()");
  if(sTo == '' || sMsg == '' || sC == '') {return false;}
  var sParams = 'c=' +sC+ '&an=' +sTo+ '&be=' +sSubject+ '&message=' +sMsg+ '&t=2&s1=';
  sParams = encodeURI(sParams);
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("POST", 'nachrichten.php', true);
  httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpRequest.setRequestHeader("Content-length", sParams.length);
  httpRequest.setRequestHeader("Connection", "close");
  httpRequest.send(sParams);
    _log(3, "<- sendMsg()");
}

function hideMsg() {
    _log(3, "-> hideMsg()");
  var oMsgBox = $("ttq_message");
  document.body.removeChild(oMsgBox);
    _log(3, "<- hideMsg()");
}

/**
 * Retrieves the value corresponding do the given variable name and the current Travian server
 * Use greasemonkey's built-in system instead of cookies to permantenly store and read settings
 *
 * @param name          The name of the variable
 * @param defaultValue  default value if name is not found
 */
function getVariable(name, defaultValue) {
    _log(3, "-> getVariable()");

    //if(!name) { var name = "TTQ_TASKS"; }
    if(!defaultValue) { var defaultValue = ''; }

    name = sCurrentServer + name;
    var data = GM_getValue(name, defaultValue);

        _log(3, "<- getVariable()");
    return data;
}

/**
 * Sets the value for the given variable name and the current Travian server
 * Use greasemonkey's built-in system instead of cookies to permantenly store and read settings
 *
 * @param name  The name of the variable
 * @param value The value to be assigned
 */
function setVariable(name, value) {
    _log(3, "-> setVariable()");

    name = sCurrentServer + name;
    GM_setValue(name, value);

        _log(3, "<- setVariable()");
    return true;
}

/**
 * Removes a cookie by setting its expire date to yesterday
 *
 * @param name  The name of the cookie
 */
function eraseCookie(name) {
        var date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name + "=" + expires + "; path=/";
}

function getCode(iSiteId, iNewdid) {
    _log(3, "-> getCode()");

  if(iNewdid != 'null' && iNewdid != '') {
    var sNewdid = "&newdid=" +iNewdid;
  } else {
    var sNewdid = "";
  }

  get("build.php?id=" + iSiteId + sNewdid, handleRequestFindCode, iNewdid);
    _log(3, "<- getCode()");

}

function findCode(sPage, iNewdid) {
    _log(3, "-> findCode()");
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


  //save the found code in the proper cookie
    // deprecated!
    if(bLockedCode) {
      _log(3, "The TTQ_CODE_" + iMode + " cookie is locked. We were not able to write it.");
    return false;
  }
  if(sCode != '') {
    bLockedCode = true;  // TODO check if the cookie is locked. Lock it separately from tasks
    var sCookie = getVariable("TTQ_CODE_" +iMode);
    var aCookie = new Array();
    if(sCookie != '') {  //there is a cookie
      aCookie = sCookie.split(",");
      var iIndexOfVillageId = aCookie.indexOf(iNewdid);
      if(iIndexOfVillageId > -1) {  // existing old code - remove
        aCookie.splice(iIndexOfVillageId, 2);
      }
    }
    aCookie.push(iNewdid);
    aCookie.push(sCode);
    sCookie = aCookie.join(",");
      _log(3, "Writing TTQ_CODE_"+iMode+": " + sCookie);
    setVariable('TTQ_CODE_'+iMode, sCookie);
    bLockedCode = false;
  } else {
      _log(2, "We didn't find any code. Either there is not enough resources for this task, or another building is being built/upgraded.");
    return false;
  }

    _log(3, "<- findCode()");
}


/** @return coordZ if the name is not found in the cache. */
function getPlaceName(iPlaceId) {
    _log(3, "-> getPlaceName()");

  if(!bDisplayVillageNames) {
    return iPlaceId;
  }

  //first try to load the name from the cache
  var sCookie = getVariable("TTQ_PLACE_NAMES");  // format: "123456,VillageName,233564,VillageName,"
  if(sCookie != '') {
    var aPlaces = sCookie.split(",");
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
    _log(3, "<- getPlaceName()");
}

function handleGetPlaceName(httpRequest, iPlaceId) {
    _log(3, "-> handleGetPlaceName()");
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

    _log(3, "<- handleGetPlaceName()");
}

/** Store found names in a cookie. */
function cachePlaceName(iPlaceId, sPlaceName) {
    _log(3, "-> cachePlaceId()");

  var aPlaces = new Array();
  var sCookie = getVariable("TTQ_PLACE_NAMES");
  if(sCookie) {
    aPlaces = sCookie.split(",");
  }

  if(aPlaces.length > (2 * iMaxPlaceNamesCookieLength) ) {  //cookie is too long, clear it first
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
  var sNewCookie = aPlaces.join(",");
  setVariable("TTQ_PLACE_NAMES", sNewCookie);


    _log(3, "<- cachePlaceId()");
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

/************************ Drag n drop*******************************/
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

/************************************************************************************/

function xpath(query, object) {
  if(!object) var object = document;
  return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getRace() {
    _log(3, "-> getRace()");
  var xpathResult = xpath("//img[@class='unit']");
  if (xpathResult.snapshotLength > 0) {
    var src = xpathResult.snapshotItem(0).src;
    var iTroopType = src.match(/([0-9]{1,2})\.gif/i);
    if(!iTroopType || !iTroopType[1]) {
      _log(2, "Image not found. Could not determine the race.");
      return false;
    }
    iTroopType = parseInt(iTroopType[1]);
    if(iTroopType > 20) {
      return 2; //gaul
    } else if(iTroopType > 10) {
      return 1; //teutons
    } else {
      return 0; //Romans
    }
  } else {
      _log(2, "Image not found. Could not determine the race.");
      return false;
  }
    _log(3, "<- getRace()");
}

function getBuildingId() {
  var re = /.*build\.php\?([a-z=0-9&]*&)?id=([0-9]{1,2})/i;
  var iSiteId = window.location.href.match(re);
  if(iSiteId != null) {
    return parseInt(iSiteId[2]);
  } else {
      _log(2, "Building site ID not found");
    return false;
  }
}

/** @return newdid of the currently selected village */
function getActiveVillage() {
    _log(3, "-> getActiveVillage()");
  var oActiveLink = xpath("//a[@class='active_vl']");
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
    _log(3, "<- getActiveVillage()");
}

/** @return name of one of your one villages. */
function getVillageName(iVillageDid) {
    _log(3, "-> getVillageName()");
  if(iVillageDid == '' || iVillageDid == 'null') {  //no village id
    return '';
  }
  var sVillageName = '';
  var xpathResult = xpath("id('lright1')/table/tbody/tr/td/a[contains(@href, '" +iVillageDid+ "')]");
  if(xpathResult.snapshotLength > 0) {
    return xpathResult.snapshotItem(0).innerHTML;
  } else {
    return 'unknown';
  }
    _log(3, "<- getVillageName()");
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

/** Kudos to QP for writing this function. */
function coordsXYToZ(x, y) {
  x = parseInt(x);
  y = parseInt(y);
  var coordZ = (x + 401) + ((400 - y) * 801);
  return coordZ;
}

/** Kudos to QP for writing this function. */
function coordZToX(z) {
  z = parseInt(z);
  var x = ((z - 1) % 801) - 400;
  return x;
}

/** Kudos to QP for writing this function. */
function coordZToY(z) {
  z = parseInt(z);
  var y = 400 - (parseInt(((z - 1) / 801)));
  return y;
}

/**
 * This function is called once, after user installed a new version of this script
 */
function performUpgrade() {
    _log(3, "-> performUpgrade()");

    // Remove old cookies created with previous version of the script to avoid being dectected ;)
    eraseCookie("TTQ_CODE_0");
  eraseCookie("TTQ_CODE_1");
  eraseCookie("TTQ_PLACE_NAMES");
  eraseCookie("TTQ_LIST_POSITION");
  eraseCookie("TTQ_LAST_REFRESH");
    eraseCookie("TTQ_TASKS");
    eraseCookie("TTQ_HISTORY");
    eraseCookie("TTQ_OPTIONS");

    // Reset vars
    setVariable("TTQ_CODE_0", "");
  setVariable("TTQ_CODE_1", "");
  setVariable("TTQ_PLACE_NAMES", "");

    setVariable("TTQ_VERSION", sCurrentVersion);
  alert("Your Travian Task Queue script has been updated.");
    _log(3, "<- performUpgrade()");
}

/**
* @return The server timezone offset from GMT or false if it is not available.
*/
function getServerTimeOffset() {
    _log(3, "-> getServerTimeOffset()");
  var iServerTimeOffset = getOption("SERVER_TIME_OFFSET", false);
  if(iServerTimeOffset != false) {  //no automatic detection
      _log(3, "Returning the predefined iServerTimeZoneOffset.");
    return parseInt(iServerTimeOffset);
  } else {  //automatic detection
    var iOffset = xpath("id('ltime')/span[2]");
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
    _log(3, "<- getServerTimeOffset()");
}

/**
* @return Current server time as formatted string or timestamp or false if the server time cannot be determined.
*/
function getServerTime(bReturnTimestamp) {
    _log(3, "-> getServerTime()");

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
      _log(2, "Warning! The local time (as UTC) differs from the server time (as UTC) by more than 1 hour. Your local time is incorrect or you specified wrong timezone for your server. We can't calculate server's date.");
    return false;
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



    _log(3, "<- getServerTime()");
}

/**
* @param {int}
* @return {str} Formatted date.
*/
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
        _log(3, "-> setOption()");

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
        _log(3, "<- setOption()");
}
/**
* @param key: name of the parameter in the TTQ_OPTIONS variable
* @param defaultValue: this is returned if the parameter is not found
* @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
*/
function getOption(key, defaultValue, type) {
        _log(3, "-> getOption()");

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
        _log(3, "<- getOption()");
    return myOption;
}

function t(str) {
  var index = aLangStringsMaster.indexOf(str);
  var sTranslatedStr =  aLangStrings[index];
  if(sTranslatedStr) {
    return sTranslatedStr;
  } else {
    return str;
  }
}

function $(id) {
  return document.getElementById(id);
}

function promptRace() {
  var iMyRace = getOption("RACE", false, "integer");
  var newRace = false;
  while(!isInt(newRace)) {
    var newRace = prompt("Travian Task Queue: \nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: " +iMyRace);
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
    var newHistoryLength = prompt("Travian Task Queue: \nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: " +iHistoryLength);
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

function onLoad() {
    _log(3, "-> onLoad()");
    _log(3, "oIntervalReference " + oIntervalReference);

    if(getVariable("TTQ_VERSION", 0) != sCurrentVersion) {
    performUpgrade();
  }

  makeMenuToggle("USE_SERVER_TIME", false, "Use server time", "Use local time", "Travian Task Queue: ");
  GM_registerMenuCommand("Travian Task Queue: Set your race", promptRace);
  GM_registerMenuCommand("Travian Task Queue: Task History", promptHistory);

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

    _log(3, "<- onLoad()");
}

if (init) {
    // --- Main Code Block ---
        _log(0, "TTQ started");

    window.addEventListener('load', onLoad, false);
}
else {
        _log(0, "Initializacion failed");
    alert("Initialization failed, Travian Task Queue is not running");
}