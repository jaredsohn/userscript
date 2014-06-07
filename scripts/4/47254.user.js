//	This program is free software: you can redistribute it and/or modify
//	it under the terms of the GNU General Public License as published by
//	the Free Software Foundation, either version 3 of the License, or
//	(at your option) any later version.

//	This program is distributed in the hope that it will be useful,
//	but WITHOUT ANY WARRANTY; without even the implied warranty of
//	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//	GNU General Public License for more details.

//	You should have received a copy of the GNU General Public License
//	along with this program.  If not, see <http://www.gnu.org/licenses/>.
//	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

scr_meta=<><![CDATA[
// ==UserScript==
// @author	Richard Laffers & rasata & ALFik & DMaster
// @namespace	http://userscripts.org/
// @name	Travian Task Queue - in Hebrew
// @description	תיזמון תקיפות, בנייה, שידרוג ושליחת משאבים על גבי ציר זמן 
// @include	http://s*.travian.*/*
// @include	http://s*.travian3.*/*
// @exclude	http://forum.travian.*
// @exclude	http://www.travian.*
// @exclude	http://*.travian.*/manual.php*
// @version	2.3.8.6
// ==/UserScript==
]]></>.toString();
/*****************
 * * * Settings * * * *
 ******************/
var LOG_LEVEL = 3; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var iCheckEvery = 10000; // How often do we check for tasks to trigger in miliseconds. 
// Low value  = high accuracy in triggering tasks. To make your browser 
// unresponsive, set this to some ridiculously small number. Default is 10000
var sLang = ""; // Set this to override the automatic language detection. Available translations: see below.
var iPreloadTime = 20; // How many seconds ahead is the code for building and upgrading prefetched. 
// If the code is not available by the time the construction should start, the 
// construction will be cancelled. This value must be greater than iCheckEvery 
// in seconds (i.e. iCheckEvery/1000). Default is 20.
var bDisplayVillageNames = true; //Display village names instead of numbers. May hit the performance. 
var taskRandomCoeff = 100; // entre 0 et 100 SEc 
/**********************
**** End of Settings **** 
***********************/

/** GLOBALS - do not tamper! */

var sCurrentVersion = "2.3.8.6"; //Version number with which we need to run the update fu
var bUseServerTime = getOption("USE_SERVER_TIME", false, "boolean"); //IMPORTANT!!! If true, you must be using 24-hour format on your server, otherwise there WILL be errors.
// Your local computer time MUST  still be correct (both time and date!).
var bLocked = false; // for locking the TTQ_TASKS cookie
var bLockedCode = false; // for locking the TTQ_CODE_0 and TTQ_CODE_0  cookies
var bLockedHistory = false;
var oIntervalReference = null;
var iSessionRefreshRate = 60; //Amount of minutes after which the session is refreshed by reloading the dorf1 page in the background. If set to 0, refreshing is disabled. Default: 60
var iMaxPlaceNamesCookieLength = 15; //maximum number of names stored  in the cookie before it is cleared
var iMyRace = getOption("RACE", 0, "integer"); // 0- Romans, 1- Teutons, 2- Gauls. Set via dialogue.
var iHistoryLength = getOption("HISTORY_LENGTH", 7, "integer");
//by ALFik
var iDelay = getOption("DELAY", 10, "integer");
var aLangBuildings = []; //multilang support
var aLangTasks = []; //multilang support
var aLangStrings = []; //multilang support
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
cssStyle += "#timerForm {padding:10px 20px; }";
cssStyle += "#timerform_wrapper {position:absolute; max-width:900px !important; margin:0; background-color:#FBEC87; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#timerform_wrapper p {}";
cssStyle += "#ttq_message {position:absolute; z-index:100; border:1px solid black; padding:10px 20px; color:black; width:335px}";
cssStyle += ".handle {cursor: move;}";
cssStyle += "a.ttq_sortlink, a#ttq_flush_history {color:#000000;} a.ttq_sortlink:hover, a#ttq_flush_history:hover {color:#F64809} a.ttq_sortlink_active {color:#FDFF3F}";
cssStyle += ".ttq_sort_header {border-bottom:1px dashed #000000}";
cssStyle += ".ttq_research_later {display:block;}";

GM_addStyle(cssStyle);

detectLanguage();
/** ----------------------- Translations -------------------------------
 * IMPORTANT!
 * If there is no translation available for your language, the script will not work!
 * - aLangBuildings must list all names EXACTLY as they are printed on your Travian web site. Names are case-sensitive.
 * - aLangStrings[7] (= "level" in English) must read exactly what it is on your website next to building names of higher level.
 * - aLangStrings[11] (= "Current production:" in English)  must read exactly what it is on your website on the resource site pages.
 * >>> Please submit all translations to rlaffers@gmail.com <<<
 * -------------------------------------------------------------------------
 */

switch (sLang) {
case "he":
case "il":
default:
	// default is english
	aLangBuildings = ["", "חוטב עצים", "בור טיט", "מכרה ברזל", "שדה יבול", "מנסרה", "מפעל לבנים", "בית-יציקה לברזל", "טחנת דגן", "מאפיה", "מחסן", "אסם", "חרש נשק", "חרש שריון", "משבצת הטורניר", "מבנה מרכזי", "נקודת מפגש", "שוק", "שגרירות", "מגורי החיילים", "אורווה", "בית-מלאכה", "אקדמיה", "נקיק", "בניין העירייה", "מגורים מלכותיים", "ארמון", "משרד האוצר", "משרד סחר", "מגורי החיילים גדולים", "אורווה גדולה", "גדר", "חומת עפר", "חומת העיר", "סתת", "Brewery", "מלכודת", "אחוזת הגיבור", "מחסן גדול", "מחסן לתבואה גדול", "פלא עולם"];
	aLangTasks = ["בנה", "שדרג", "התקף", "חקור", "אמן", "שלח משאבים"];
	aLangStrings = ["בנה בעתיד", "שדרג בעתיד", "התקף בעתיד", "חקור בעתיד", "הכנס משימה זו ללוח הזמנים בעתיד.", "התחלנו לבנות ", " נוסה אך ללא הצלחה.", "שלב", " לא יכול להבנות.", " לא יכול להשתדרג.", "המשימה נכנסה ללוח הזמנים.", "מהלך יצור:", "אנחנו לא יכולים להכניס משימה זו ללוח הזמנים כרגע.", "לוח הזמנים אינו זמין כעת!", "משימות בלוח הזמנים", "מחק", "שלח בעתיד", "לא נבחרו כוחות.", "הכוחות שלך נשלחו ל", "הכוחות שלך לא יכלו להשלח ל", "עזרה", "התקפה: רגילה", "התקפה: בזיזה", "יזרק ב", "רמדומלי", "בשעה:", ", או בעוד:", "שניות", "דקות", "שעות", "ימים", "ברר אחר משאבים וכוחות", "ברר לגבי הגנות וכוחות", "רחוק", "ההתקפה לא נכנסה ללוח הזמנים משום שהיעד אינו צויין.", "מבנה מספר ", "מיין לפי:", "מיקום, ", "שעות, ", "מטרה, ", "אפשוריות ", "כפר, ", "היסטוריה", "רוקן היסטוריה", "התחלנו לבנות ", " לא יכולנו לבנות.", "הגדל בעתיד", "רגל", "אמן בעתיד", "כוחות.", "אמן", "התחלנו לאמן ", " לא יכולנו לאמן.", "עשה שוב: ", "פעמים, ", "כל: ", "נקה רשימת משימות ", "נשלחו", "שמור את המשימה"];
	aLangTroops[0] = ["לגיונר", "פרטוריאן", "אימפריאן", "אקויטס לגטי", "אקויטס אימפרטוריס", "אקויטס קיסריס", "איל ברזל", "לירות בבליסטרה", "סנטור", "מתיישב", "גיבור"]; //Romans
	aLangTroops[1] = ["מניף אלה", "לוחם חנית", "לוחם גרזן", "סייר", "פלאדין", "אביר טאוטוני", "לנגוח באייל ברזל", "בליסטרה", "ציפ", "מתיישב", "גיבור"]; //Teutons
	aLangTroops[2] = ["פלנקס", "לוחם חרב", "נווט", "רעם טאוטטס", "דרודרידר", "האדואן", "לנגוח באייל ברזל", "טרבוצט", "צ'יפטן", "מתיישב", "גיבור"]; //Gauls
	break;

}

// Do not change the array below!
var aLangStringsMaster = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "Train later", "troops.", "Train", "We started training ", " cannot be trained.", "or repeat ", "times ", "espaced by ", "Flush Task List ", "Have been dispatched", "Queue this task"];

/** 
* Custom log function .
* @param {int} level 
* @param:{int} msg Message to log.
*/
function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) GM_log(msg);
}

function checkSetTasks() {
	_log(2, "Checking set tasks...");
	_log(3, "oIntervalReference " + oIntervalReference);

	if (bLocked) {
		_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}

	bLocked = true;
	// Each Task is separated by a | 
	// and Each parameter of a Task is separated by a comma 
	var data = readCookie("TTQ_TASKS");

	if (data == '') { // no tasks are set
		_log(2, "No tasks are set. ");
		// stop checking, it would be pointless. Checking will be restarted when new tasks are set.
		if (oIntervalReference) {
			_log(3, "clearInterval()");
			window.clearInterval(oIntervalReference);
			oIntervalReference = null;
		}
		bLocked = false;
		return false;
	}

	// Times: Server or Local?
	if (bUseServerTime) {
		var iServerTimestamp = getServerTime(true);
		if (iServerTimestamp == false) { //error
			_log(2, "Unable to determine server's time. We can't trigger any tasks without this. Consider switching to using local time.");
			return false;
		}
		var oDate = new Date(iServerTimestamp);
	} else { //local
		var oDate = new Date();
	}

	var aTasks = data.split("|");
	var bTaskDeleted = false;
	for (var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");

		// The stored time (Unix GMT time) should be compared against the GMT time, not local!
		if (aThisTask[1] <= oDate.getTime() / 1000) {
			_log(2, "Triggering task: " + aTasks[i]);
			triggerTask(aThisTask);
			aTasks.splice(i, 1); //delete this task
			bTaskDeleted = true;
		} else if ((aThisTask[0] < 2) && (aThisTask[1] <= ((oDate.getTime() / 1000) + iPreloadTime))) { //prefetch the code if the task is to be triggered in less than iPreloadTime
			_log(2, "Some building/upgrading task is set, but it is not the time yet. It is time to preload the code though.");

			getCode(aThisTask[2], aThisTask[4]);

		} else {
			_log(2, "Some task is set, but it is not the time yet.");
			//refresh the session if needed
			var sLastRefreshed = getOption('LAST_REFRESH', 0, "integer");
			var iRandomMultiplier = (Math.random() < 0.5) ? 1 : -1;
			var iRandomMilliSeconds = iRandomMultiplier * 60000 * Math.round(10 * Math.random()); //for randomizing the refresh times (the scatter will be +/- 10 minutes)
			if (sLastRefreshed != '' && (iSessionRefreshRate > 0) && (sLastRefreshed + (iSessionRefreshRate * 60000) + iRandomMilliSeconds) < oDate.getTime()) {
				_log(2, "Refreshing the session...");
				get("dorf1.php", null, null)
				setOption('LAST_REFRESH', oDate.getTime());
			}
		}
	}

	// rewrite stored tasks if any task was deleted
	if (bTaskDeleted) {
		refreshTaskList(aTasks);
		_log(3, "Rewriting cookie.");
		data = aTasks.join("|");
		_log(3, "New cookie: " + data);
		createCookie("TTQ_TASKS", data, 365);
	}
	bLocked = false;
}

/**
 * Task is an Array Composed by 3 elements:
 For instance 
 5, iVillageFromId,ir1+"_"+ir2+"_"+ir3+"_"+ir4+"_"+villageTargetName+"_"+iX+"_"+iY
 - Id of the Task (Train,Update,Attack)
 - Id of your current village 
 - List of parameters you use 
 **/
function refreshTaskList(aTasks) {
	_log(3, "-> refreshTaskList()");
	// Remove old task list
	var oOldTaskList = $("ttq_tasklist");
	if (oOldTaskList) {
		document.body.removeChild(oOldTaskList)
	};

	//if there are no tasks set, return
	if (!aTasks || aTasks.length < 1) {
		return;
	}
	var sTime = "";

	//Create new tasklist
	var oTaskList = document.createElement('div');

	oTaskList.id = "ttq_tasklist";
	oTaskList.innerHTML = "<div id='ttq_draghandle' class='handle ttq_draghandle' >" + t("Scheduled Tasks") + "</div>";

	//Sort links
	var currentSort = getOption("TASKLIST_SORT", 1, "integer");
	var sortLinkWrapper = document.createElement("div");
	sortLinkWrapper.innerHTML += "<span class='ttq_sort_header'>&raquo; " + t("Sort by:") + "</span> ";
	var sortKeys = [1, 4, 0, 2]; //order is important
	var sortLabels = ["type ", "time ", "target ", "option ", "village "]
	sortKeys.forEach(function(el) {
		var sortLink = document.createElement("a");
		sortLink.innerHTML = t(sortLabels[el]);
		sortLink.className = (currentSort == el) ? "ttq_sortlink_active": "ttq_sortlink";
		sortLink.href = "#";
		sortLink.addEventListener("click",
		function(ev) {
			orderList(el, "ttq_task_row");
			setOption("TASKLIST_SORT", el);
			var siblings = ev.target.parentNode.childNodes;
			for (var j = 0; j < siblings.length; j++) {
				if (siblings[j].nodeName == "A") {
					siblings[j].className = "ttq_sortlink";
				}
			}
			ev.target.className = "ttq_sortlink_active";
		},
		false);
		sortLinkWrapper.appendChild(sortLink);
		oTaskList.appendChild(sortLinkWrapper);
		sortLink = null;
	});

	//position the list	
	var listCoords = getOption("LIST_POSITION", "0px_687px");
	listCoords = listCoords.split("_");
	oTaskList.style.top = listCoords[0];
	oTaskList.style.left = listCoords[1];
	// Append the OTaskList  to the Document 
	document.body.appendChild(oTaskList);
	makeDraggable($('ttq_draghandle'));

	//get the server time offset once
	if (bUseServerTime) {
		var iServerTimeOffset = getServerTimeOffset();
	}

	for (var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");
		_log(3, "RefreshTaskList=>" + aThisTask);

		//format the task time properly
		if (bUseServerTime) {
			//create timestamp for the tasktime offset to server time
			var iTaskServerTimestamp = (parseInt(aThisTask[1]) + (iServerTimeOffset * 3600)) * 1000;
			//create Date obj with this timestamp
			var oDate = new Date(iTaskServerTimestamp);
			//display the date without any further offsets
			//TODO: custom localized date format: Wednesday, November 14, 2007 20:49:09
			var sTime = oDate.toGMTString();
			sTime = sTime.substring(0, sTime.length - 4);
			sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_tasktime_" + i + "' title='זמן שרת:' ttq_taskid='" + i + "' >" + sTime + "</span>";
		} else { //local time
			var oDate = new Date(parseInt(aThisTask[1]) * 1000);
			var sTime = "<span style='color:black; cursor:pointer;' id='ttq_tasktime_" + i + "' title='זמן מחשב:' ttq_taskid='" + i + "' >" + oDate.toLocaleString() + "</span>";
		}

		var oDeleteLink = document.createElement('a');
		oDeleteLink.innerHTML = "<img src='" + sDeleteBtn + "' alt='X'/>";
		oDeleteLink.href = "#";
		oDeleteLink.title = t("Delete");
		oDeleteLink.setAttribute("itaskindex", i);
		oDeleteLink.addEventListener('click', deleteTask, false);

		var oTaskRow = document.createElement("div");
		oTaskRow.id = "ttq_task_row_" + i;
		oTaskRow.setAttribute("tasktype", aThisTask[0]);
		oTaskRow.setAttribute("timestamp", aThisTask[1]);
		oTaskRow.setAttribute("tasktarget", aThisTask[2]);
		oTaskRow.setAttribute("taskoptions", aThisTask[3]);
		oTaskRow.setAttribute("villagedid", aThisTask[4]);

		var sTaskSubject = "";
		var sTask = "";
		var sTaskMoreInfo = "";
		switch (aThisTask[0]) {
		case "0":
			//build
		case "1":
			//upgrade
			sTaskSubject = aLangBuildings[aThisTask[3]];
			sTask = aLangTasks[aThisTask[0]];
			sTaskMoreInfo = t("at site no.") + " " + aThisTask[2];
			break;
		case "2":
			//attack
			//sTaskSubject = aThisTask[2];
			sTaskSubject = '<span id="ttq_placename_' + aThisTask[2] + '">' + getPlaceName(aThisTask[2]) + '</span>';
			if (sTaskSubject == '') {
				sTaskSubject = aThisTask[2]
			};
			var aTroops = aThisTask[3].split("_");
			if (onlySpies(aTroops)) {
				sTask = t("Spy");
			} else {
				var iIndex = parseInt(aTroops[0]) + 18;
				if (iIndex == 20) sTask = t('Support');
				if (iIndex == 21) sTask = t('Attack');
				if (iIndex == 22) sTask = t('Raid');
			}
			sTaskMoreInfo = getTroopsInfo(aTroops);
			break;
		case "3":
			//research
			sTaskSubject = aLangTroops[iMyRace][aThisTask[3] - 1];
			sTask = aLangTasks[3];
			break;
		case "4":
			//train
			var aTroops = aThisTask[3].split("_");
			sTaskSubject = getTroopsInfo(aTroops);
			sTask = aLangTasks[4];
			break;
		case "5":
			//send Ressource in a delayed time 
			sTask = aLangTasks[5];
			var listOfParams = aThisTask[3].split("_#");
			//5, iVillageFromId,ir1+"_"+ir2+"_"+ir3+"_"+ir4+"_"+villageTargetName+"_"+iX+"_"+iY
			sTaskSubject = "<table cellspacing=\"1\" cellpadding=\"2\" border=1 width=\"150px\">" + "<tr class=\"rbg\"><td colspan=4>" + t("יעד:") + listOfParams[4] + " " + listOfParams[5] + "|" + listOfParams[6] + "</td></tr>" + "<tr class=\"nbr\">" + "<td style=\"background-color:white\"><img class=\"res\" src=\"img/un/r/1.gif\" title=\"עץ\">" + (listOfParams[0] == '' ? 0 : listOfParams[0]) + "</td>" + "<td style=\"background-color:white\"><img class=\"res\" src=\"img/un/r/2.gif\" title=\"טיט\">" + (listOfParams[1] == '' ? 0 : listOfParams[1]) + "</td>" + "<td style=\"background-color:white\"><img class=\"res\" src=\"img/un/r/3.gif\" title=\"ברזל\">" + (listOfParams[2] == '' ? 0 : listOfParams[2]) + "</td>" + "<td style=\"background-color:white\"><img class=\"res\" src=\"img/un/r/4.gif\" title=\"יבול\">" + (listOfParams[3] == '' ? 0 : listOfParams[3]) + "</td>" + "</tr>	" + "</table>";
			sTaskMoreInfo = "ראה תגובה";

			break;
		default:
			break;
		}
		// Get the village on which the Task is applied 
		var sVillageName = '';
		if (aThisTask[4] != 'null') {
			sVillageName = " &mdash; " + getVillageName(aThisTask[4]);
		}
		// Appende each line of the future Task			
		oTaskRow.innerHTML = "<span class='ttq_time_village_wrapper' style='display:inline !important;'>" + sTime + "<span class='ttq_village_name'>" + sVillageName + "</span>" + ":</span>" + " <span title='" + sTaskMoreInfo + "' style='cursor:help;' >" + sTask + " " + sTaskSubject + " </span></span>";
		oTaskRow.appendChild(oDeleteLink);
		oTaskList.appendChild(oTaskRow);
		//add listener for editing times in the task list
		var oTaskTimeSpan = $("ttq_tasktime_" + i);
		oTaskTimeSpan.addEventListener("click", editTime, false);

		oDeleteLink = null;
		oTaskRow = null;
		oDate = null;
	}
	orderList(currentSort, "ttq_task_row");

	// Append a link to flush all the list of Task 
	var oDeleteAllTask = document.createElement('a');
	oDeleteAllTask.innerHTML = "<img src='" + sDeleteBtn + "' alt='X'/>" + '<font color=black>' + t("Flush Task List ") + '</font>';
	oDeleteAllTask.href = "#";
	oDeleteAllTask.setAttribute("taskNumber", aTasks.length);
	oDeleteAllTask.title = t("Flush Task List ");
	oDeleteAllTask.addEventListener('click', deleteAllTask, false);
	oTaskList.appendChild(oDeleteAllTask);

	_log(3, "<- refreshTaskList()");
}

function refreshHistory(aTasks) {
	_log(3, "Refreshing history...");
	// Remove old history
	var oOldHistory = $("ttq_history");
	if (oOldHistory) {
		document.body.removeChild(oOldHistory)
	};

	//if there are no tasks in the history, return
	if (!aTasks || aTasks.length < 1) {
		return;
	}
	var sTime = "";

	//Create new tasklist
	var oHistory = document.createElement('div');
	oHistory.id = "ttq_history";
	oHistory.innerHTML = "<div id='ttq_history_draghandle' class='handle ttq_draghandle' >" + t("Task History") + "</div>";

	//position the list	
	var listCoords = getOption("HISTORY_POSITION", "200px_687px");
	listCoords = listCoords.split("_");
	oHistory.style.top = listCoords[0];
	oHistory.style.left = listCoords[1];

	document.body.appendChild(oHistory);

	makeDraggable($('ttq_history_draghandle'));

	//get the server time offset once
	if (bUseServerTime) {
		var iServerTimeOffset = getServerTimeOffset();
	} else {
		var iServerTimeOffset = false;
	}

	for (var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");
		oHistory.appendChild(makeHistoryRow(aThisTask, i, iServerTimeOffset));
		var oTaskTimeSpan = $("ttq_history_tasktime_" + i);
		if (oTaskTimeSpan) {
			oTaskTimeSpan.addEventListener("click", editTime, false);
		}
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
	if (bUseServerTime && iServerTimeOffset != false) {
		//create timestamp for the tasktime offset to server time
		var iTaskServerTimestamp = (parseInt(aTask[1]) + (iServerTimeOffset * 3600)) * 1000;
		var oDate = new Date(iTaskServerTimestamp);
		var sTime = oDate.toGMTString();
		sTime = sTime.substring(0, sTime.length - 4);
		sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_history_tasktime_" + index + "' title='זמן שרת:' ttq_taskid='" + index + "' >" + sTime + "</span>";
	} else { //local time
		var oDate = new Date(parseInt(aTask[1]) * 1000);
		var sTime = "<span style='color:black; cursor:pointer;' id='ttq_history_tasktime_" + index + "' title='זמן מחשב:' ttq_taskid='" + index + "' >" + oDate.toLocaleString() + "</span>";
	}

	var oHistoryRow = document.createElement("div");
	oHistoryRow.id = "ttq_history_row_" + index;
	oHistoryRow.className = "ttq_history_row";
	oHistoryRow.setAttribute("tasktype", aTask[0]);
	oHistoryRow.setAttribute("timestamp", aTask[1]);
	oHistoryRow.setAttribute("tasktarget", aTask[2]);
	oHistoryRow.setAttribute("taskoptions", aTask[3]);
	oHistoryRow.setAttribute("villagedid", aTask[4]);

	var sTaskSubject = "";
	var sTask = "";
	var sTaskMoreInfo = "";
	switch (aTask[0]) {
	case "0":
		//build
	case "1":
		//upgrade
		sTaskSubject = aLangBuildings[aTask[3]];
		sTask = aLangTasks[aTask[0]];
		sTaskMoreInfo = t("at site no.") + " " + aTask[2];
		break;
	case "2":
		//attack
		sTaskSubject = '<span id="ttq_placename_history_' + aTask[2] + '">' + getPlaceName(aTask[2]) + '</span>';
		if (sTaskSubject == '') {
			sTaskSubject = aTask[2]
		};
		var aTroops = aTask[3].split("_");
		if (onlySpies(aTroops)) {
			sTask = t("Spy");
		} else {
			var iIndex = parseInt(aTroops[0]) + 18;
			if (iIndex == 20) sTask = t('Support');
			if (iIndex == 21) sTask = t('Attack');
			if (iIndex == 22) sTask = t('Raid');
		}
		sTaskMoreInfo = getTroopsInfo(aTroops);
		break;
	case "3":
		//research
		sTaskSubject = aLangTroops[iMyRace][aTask[3] - 1];
		sTask = aLangTasks[aTask[0]];
		break;
	case "4":
		sTaskSubject = getTroopsInfo(aTask[3].split("_"));
		sTask = aLangTasks[4];
	default:
		break;
	}

	var sBgColor = (aTask[5] == "true") ? "#90FF8F": "#FFB89F";
	oHistoryRow.style.backgroundColor = sBgColor;

	var sVillageName = '';
	if (aTask[4] != 'null') {
		sVillageName = " &mdash; " + getVillageName(aTask[4]);
	}

	oHistoryRow.innerHTML = "<span class='ttq_time_village_wrapper' style='display:inline !important;'>" + sTime + "<span class='ttq_village_name'>" + sVillageName + "</span>" + ":</span> <span title='" + sTaskMoreInfo + "' style='cursor:help;' >" + sTask + " " + sTaskSubject + " </span></span>";

	oDate = null;

	return oHistoryRow;
}

/**
* @param iORderBy: 0 - tasktype, 1 - timestamp, 2 - target, 3 - options, 4 - villagedid
*/
function orderList(iOrderBy, sRowId) {
	var rows = xpath('//div[contains(@id, "' + sRowId + '")]');
	if (rows.snapshotLength > 0) {
		switch (iOrderBy) {
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
		for (var i = 0; i < rows.snapshotLength; i++) {
			keyValue = rows.snapshotItem(i).getAttribute(sortKey);
			aRows.push([keyValue, rows.snapshotItem(i)]);
		}
		aRows.sort(sortArray);
		switch (sRowId) {
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

function sortArray(arr1, arr2) {
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
	var villagedid = oTaskRow.getAttribute("villagedid"); //not supported yet. The new task will have did of currently active village.
	displayTimerForm(type, target, options, timestamp);
}

function deleteTask(e) {
	_log(3, "-> deleteTask()");
	var iTaskIndex = e.target.parentNode.getAttribute("itaskindex");
	_log(2, "Deleting task " + iTaskIndex);

	if (bLocked) {
		_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}

	bLocked = true;
	var data = readCookie("TTQ_TASKS");
	if (data == '') {
		_log(2, "No tasks are set. ");
		bLocked = false;
		return false; // no tasks are set
	}
	var aTasks = data.split("|");
	aTasks.splice(iTaskIndex, 1); //delete this task
	data = aTasks.join("|");
	createCookie("TTQ_TASKS", data, 365);
	bLocked = false;
	refreshTaskList(aTasks);
	return false; // we return false to override default action on the link
	_log(3, "<- deleteTask()");
}

function deleteAllTask(e) {
	_log(3, "-> deleteAllTask()");
	var iTaskIndex = e.target.parentNode.getAttribute("taskNumber");
	_log(2, "Deleting All task ");

	if (bLocked) {
		_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}

	bLocked = true;
	var data = readCookie("TTQ_TASKS");
	if (data == '') {
		_log(2, "No tasks are set. ");
		bLocked = false;
		return false; // no tasks are set
	}
	// Delete the  cookie	
	data = '';
	// R?initialisation du tableau de t?che 
	//var aTasks = data.split("|");
	createCookie("TTQ_TASKS", data, 365);
	bLocked = false;
	refreshTaskList(null);
	return false; // we return false to override default action on the link
	_log(3, "<- deleteTask()");
}

function setTaskFromEvent(event) {
	var myduration = event.target.getAttribute("iduration");
	setTask(event.target.getAttribute("iTask"), getEndOfTheLastScheduledTask(parseInt(event.target.getAttribute("iTask")), getActiveVillage()), event.target.getAttribute("iTarget"), event.target.getAttribute("iOptions"), myduration);
}

/**
  * Schedules the specified task. The task is stored in a cookie. 
  * @param iTask: name of the task (0-build, 1-upgrade, 2-attack, 3-research), 5 send resource
  * @param iWhen: date when the task is to be triggered
  * @param target: iBuildingId, or iVillageId 
  * @param options: what to build, what units to send attacking (first member specifies the type of attack: 0-support, 1-normal attack, 2-raid).
  *@param taskDuration : Duration of The Task 
  */
function setTask(iTask, iWhen, target, options, taskDuration) {
	_log(3, "-> setTask()");
	var iVillageId = getActiveVillage();

	if (bLocked) {
		_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}

	bLocked = true;
	var data = readCookie("TTQ_TASKS");
	var oldValue = (data == null || data.length <= 1 || data == '') ? '': data + '|';
	var newValue = oldValue + iTask + ',' + iWhen + ',' + target + ',' + options;
	if (iVillageId) {
		newValue += ',' + iVillageId;
	} else {
		newValue += ',' + 'null';
	}

	// We add the potential Task Duration ==> How long in seconds will last the Task ?
	// It will be the Last Parameter in order to make this Easy 
	if (taskDuration) {
		newValue += ',' + taskDuration;
	}

	_log(2, "Writing cookie: " + newValue);
	if (!createCookie("TTQ_TASKS", newValue, 365)) {
		printMsg("<span class='ttq_village_name' style='display:block;'>" + getVillageName(iVillageId) + "</span>" + t("We can't schedule this task right now."), true);
		bLocked = false;
		return false;
	}
	_log(3, " Village for the task " + getVillageName(iVillageId));
	bLocked = false;

	var aTasks = newValue.split("|");
	refreshTaskList(aTasks);

	// *************************************	
	// Generate The Confirmation Message
	// *************************************
	var sTaskSubject = "";
	var sTask = "";
	switch (iTask) {
	case "0":
		//build
	case "1":
		//upgrade
		sTaskSubject = aLangBuildings[options];
		sTask = aLangTasks[iTask];
		break;
	case "2":
		//attack
		sTaskSubject = '<span id="ttq_placename_' + target + '">' + getPlaceName(target) + '</span>';
		var aTroops = options.split("_");
		if (onlySpies(aTroops)) {
			sTask = t("Spy");
		} else {
			var iIndex = parseInt(aTroops[0]) + 18;
			if (iIndex == 20) sTask = t('Support');
			if (iIndex == 21) sTask = t('Attack');
			if (iIndex == 22) sTask = t('Raid');
		}
		break;
	case "3":
		//research
		sTaskSubject = aLangTroops[iMyRace][options - 1];
		sTask = aLangTasks[3];
		break;
	case "4":
		//training
		var aTroops = options.split("_");
		sTaskSubject = getTroopsInfo(aTroops);
		sTask = t('Train');
		break;
	case "5":
		//send Ressource in a delayed time 
		sTask = aLangTasks[5];
		var listOfParams = options.split("_#");
		sTaskSubject = "";
		sTaskMoreInfo = "ראה תגובה";
		break;
	default:
		break;
	}

	printMsg('<span class="ttq_village_name" style="display:block;">' + getVillageName(iVillageId) + '</span>' + t("The task was scheduled.") + '<br/><span style="font: italic 80%;">' + sTask + ' ' + sTaskSubject + '</span>');
	if (!oIntervalReference) {
		oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery); //start checking if there is any task to trigger
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
	switch (aTask[0]) {
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
	case "5":
		sendResource(aTask);
		break;
	default:
		//do nothing
		_log(3, "Can't trigger an unknown task.");
		break;
	}
	_log(3, "<- triggerTask()");
}

// *****************************************************************
// aTask format : 1,1214553491,6,2,141598   [? / Time / BuildingId / ? / VillageId
// *****************************************************************
function build(aTask) {
	_log(3, "-> build()");
	// we will assume that there is a correct up-to-date code in the cookie
	var sCode = '';

	var sCookie = readCookie("TTQ_CODE_0");
	if (sCookie != '') {
		_log(3, "Cookie found.");
		var aCookie = sCookie.split(",");
		var iIndexOfVillageId = aCookie.indexOf(aTask[4]);
		if (iIndexOfVillageId > -1) { //the village id found
			sCode = aCookie[iIndexOfVillageId + 1];
		}
	} else {
		_log(3, "No cookie available.");
	}

	//TODO: if the code is not there, or is there but incorrect, try to get a new one, register event listener, and start building when the code is updated (implement timeouts to this)
	if (false && sCode == '') { // no code - no building possible
		_log(1, "No code found. Building this building is not possible.");
		printMsg("<span class='ttq_village_name' style='display:block;'>" + getVillageName(aTask[4]) + "</span>" + aLangBuildings[aTask[3]] + t(" cannot be built."), true); // Your building can't be built.
		return false;
	}

	if (aTask[4] != 'null') {
		var sNewDid = "&newdid=" + aTask[4];
	} else {
		var sNewDid = "";
	}

	var currentActiveVillage = getActiveVillage();

	var sUrl = "dorf2.php?";
	sUrl += "a=" + aTask[3] + "&id=" + aTask[2] + "&c=" + sCode + sNewDid;
	var myOptions = [aTask, currentActiveVillage];
	get(sUrl, handleRequestBuild, myOptions)
	_log(3, "<- build()");
}

//*****************************************************************
// UPGRADE A BUILDING 
// aTask format : 1,1214553491,6,2,141598   [? / Time / BuildingId / ? / VillageId
// *****************************************************************
function upgrade(aTask) {
	_log(3, "-> upgrade()");

	// try to load the code
	var sCode = '';

	var sCookie = readCookie("TTQ_CODE_1");
	if (sCookie != '') {
		_log(3, "Cookie found.");
		var aCookie = sCookie.split(",");
		var iIndexOfVillageId = aCookie.indexOf(aTask[4]);
		if (iIndexOfVillageId > -1) { //the village id found
			sCode = aCookie[iIndexOfVillageId + 1];
		}
	} else {
		_log(3, "No cookie found.");
	}

	if (sCode == '') { // no code - no building possible
		_log(1, "No code found. Upgrading this building is not possible.");
		printMsg("<span class='ttq_village_name' style='display:block'>" + getVillageName(aTask[4]) + "</span>" + aLangBuildings[aTask[3]] + t(" cannot be upgraded."), true); // Your building can't be built.
		return false;
	}

	if (aTask[4] != 'null') {
		var sNewDid = "&newdid=" + aTask[4];
	} else {
		var sNewDid = "";
	}

	if (aTask[3] < 19) { //it's resource site
		var sUrl = "dorf1.php?";
	} else {
		var sUrl = "dorf2.php?";
	}

	var currentActiveVillage = getActiveVillage();
	sUrl += "a=" + aTask[2] + "&c=" + sCode + sNewDid;
	_log(3, sUrl);
	var myOptions = [aTask, currentActiveVillage];

	get(sUrl, handleRequestBuild, myOptions)
	_log(3, "<- upgrade()");
}

function attack(aTask) {
	_log(3, "-> attack()");

	var aTroops = new Array(); //extract troops numbers and attack type
	aTroops = aTask[3].split("_");
	var iAttackType = aTroops[0];

	var sParams = "id=39&c=" + iAttackType + "&kid=" + aTask[2] + "&a=12345"; //TODO: "a" parameter may need to be specified
	for (var i = 1; i <= 11; i++) {
		sParams += "&t" + i + "=" + aTroops[i];
	}

	//Target for catapults
	if (aTroops[8] > 0) {
		if (aTroops[12]) {
			sParams += "&kata=" + aTroops[12];
		}
		if (aTroops[13]) {
			sParams += "&kata2=" + aTroops[13];
		}
	}

	//Spying missions
	var iScoutUnit = getOption("SCOUT_UNIT", false, "integer");
	if (iScoutUnit != 3 && iScoutUnit != 4) { //3 or 4 are the only valid values
		_log(2, "Unknown iScoutUnit. Unable to proceed with sending this attack.");
		return false;
	}
	if (aTroops[iScoutUnit] > 0 && onlySpies(aTroops) && iAttackType > 2) {
		_log(3, "We are sendings scouts.");
		if (aTroops[12]) {
			var iScoutMode = aTroops[12];
		} else {
			var iScoutMode = 1; //"Spy troops  and resources" by default	
		}
		sParams += "&spy=" + iScoutMode;
	}

	_log(3, "sParams\n" + sParams);

	if (aTask[4] != 'null') { //multiple villages
		//we need to switch village
		_log(2, "Switching to village:" + aTask[4]);
		var currentActiveVillage = getActiveVillage();
		var myOptions = [aTask, currentActiveVillage];
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", "a2b.php?newdid=" + aTask[4], true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) { // ok
					_log(2, "Village switched to " + aTask[4]);
					post("a2b.php", sParams, handleRequestAttack, myOptions);
					_log(2, "The attack was requested.");
				}
			}
		};
		httpRequest.send(null);
	} else { //only 1 village. Perform attack immediately
		var myOptions = [aTask, false];
		post("a2b.php", sParams, handleRequestAttack, myOptions);
		_log(2, "The attack was requested.");
	}

	_log(3, "<- attack()");
}

/**
 Permet d'envoyer dans la ressource 
 **/
function sendResource(aTask) {
	_log(3, "-> send Ressource ()");
	var infos = new Array(); //extract troops numbers and attack type
	infos = aTask[3].split("_");
	var currentActiveVillage = getActiveVillage();
	var sParams = "&r1=" + (infos[0] != '#' ? infos[0] : '') + "&r2=" + (infos[1] != '#' ? infos[1].substring(1, infos[1].length) : '') + "&r3=" + (infos[2] != '#' ? infos[2].substring(1, infos[2].length) : '') + "&r4=" + (infos[3] != '#' ? infos[3].substring(1, infos[3].length) : '') + "&dname=" + (infos[4] != '#' ? infos[4].substring(1, infos[4].length) : '') + "&x=" + (infos[5] != '#' ? infos[5].substring(1, infos[5].length) : '') + "&y=" + (infos[6] != '#' ? infos[6].substring(1, infos[6].length) : '') + "&id=" + (infos[7] != '#' ? infos[7].substring(1, infos[7].length) : '');
	_log(3, sParams);
	if (aTask[4] != 'null') { //multiple villages
		_log(2, "Moresone vilage.");
		//we need to switch village
		_log(2, "Switching to village:" + aTask[4]);
		var currentActiveVillage = getActiveVillage();
		var myOptions = [aTask, currentActiveVillage, sParams];
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", "build.php?newdid=" + aTask[4], true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) { // ok
					_log(2, "Village switched to " + aTask[4]);
					post("build.php", sParams, handleRequestSendResource, myOptions);
					_log(2, "The Send Resourced was requested.");
				}
			}
		};
		httpRequest.send(null);
	} else { //only 1 village. Perform attack immediately
		_log(2, "Only one vilage.");
		var currentActiveVillage = getActiveVillage();
		var myOptions = [aTask, currentActiveVillage, ];
		post("build.php", sParams, handleRequestSendResource, myOptions);
		_log(2, "The resource was send .");
	}
}

function research(aTask) {
	_log(3, "-> research()");

	if (aTask[4] != 'null') {
		var sNewDid = "&newdid=" + aTask[4];
	} else {
		var sNewDid = "";
	}
	var currentActiveVillage = getActiveVillage();
	var sUrl = "build.php?id=" + aTask[2] + "&a=" + aTask[3] + sNewDid;
	var myOptions = [aTask, currentActiveVillage];
	get(sUrl, handleRequestResearch, myOptions);

	_log(3, "<- research()");
}

function train(aTask) {
	_log(3, "-> train()");

	if (aTask[4] != 'null') {
		var sNewDid = "&newdid=" + aTask[4];
	} else {
		var sNewDid = "";
	}
	var currentActiveVillage = getActiveVillage();

	var sParams = "id=" + aTask[2] + "&a=2";

	var aTroops = aTask[3].split("_");
	if (aTroops.length > 1) {
		sParams += "&z=" + aTroops[0];
		for (var i = 1; i < 11; i++) {
			if (aTroops[i] > 0) {
				sParams += "&t" + i + "=" + aTroops[i];
			}
		}
	} else {
		_log(3, "No troops specified. Exiting function.");
		return;
	}
	_log(3, sParams);

	var myOptions = [aTask, currentActiveVillage];

	if (aTask[4] != 'null') { //multiple villages
		//we need to switch village
		_log(2, "Switching to village:" + aTask[4]);
		var currentActiveVillage = getActiveVillage();
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", "dorf1.php?newdid=" + aTask[4], true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) { // ok
					_log(2, "Village switched to " + aTask[4]);
					post("build.php", sParams, handleRequestTrain, myOptions);
					_log(2, "The training was requested.");
				}
			}
		};
		httpRequest.send(null);
	} else { //only 1 village
		post("build.php", sParams, handleRequestTrain, myOptions);
		_log(2, "The attack was requested.\n" + sParams);
	}

	_log(3, "<- train()");
}

/**
* @param options: [aTask, iCurrentActiveVillage] (optional)  OR sNewdid in case of finding the code for construction.
*/
function get(url, callback, options) {
	var httpRequest = new XMLHttpRequest();
	if (callback) {
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
			if (!sResponse) { // error retrieving the response				
				printMsg(aLangTasks[aTask[0]] + " " + aLangBuildings[aTask[3]] + t(" was attempted with unknown result."), true);
				return;
			}
			var re = new RegExp('<div id="lbau.">.*' + aLangBuildings[aTask[3]] + '.*</div>', 'i');
			if (sResponse.match(re)) {
				printMsg('<span class="ttq_village_name" style="display:block;">' + getVillageName(aTask[4]) + '</span>' + t("We started builing ") + aLangBuildings[aTask[3]]); //Your building is being built.
				addToHistory(aTask, true);
			} else {
				printMsg('<span class="ttq_village_name" style="display:block;">' + getVillageName(aTask[4]) + '</span>' + aLangBuildings[aTask[3]] + t(" cannot be built."), true); // Your building can't be built.
				addToHistory(aTask, false);
				//by ALFik +   Modified by @Rasatavohary to make it run after the last building task 				
				if (iDelay > 0) {
					var iTaskTime = getEndOfTheLastScheduledTask(aTask[0]);
					setTask(aTask[0], iTaskTime, aTask[2], aTask[3]);
				}
				//by ALFik -
			}
		} else { // failed
			_log(2, "HTTP request status: " + httpRequest.status);
		}
		if (isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
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
			if (!sResponse) { // error retrieving the response				
				_log(2, "We didn't get any response. Impossible to determine whether the attack was sent.");
				return;
			}
			var sPlaceName = '<span id="ttq_placename_' + aTask[2] + '">' + getPlaceName(aTask[2]) + '</span>';
			var re = new RegExp('karte\\.php\\?d=' + aTask[2], 'i');
			if (re.test(sResponse)) {
				_log(1, "It seems your attack was successfully sent.");
				printMsg(t("Your troops were sent to") + " " + sPlaceName);

				addToHistory(aTask, true);
			} else {
				_log(1, "Your attack could not be sent.");
				printMsg(t("Your troops could not be sent to") + " " + sPlaceName, true);
				addToHistory(aTask, false);
				//by ALFik +
				if (iDelay > 0) {
					var after = after = iDelay * 60;
					var oDate = new Date(); // current GMT date. TODO: server time
					var iTaskTime = parseInt(oDate.getTime() / 1000 + after);
					setTask(aTask[0], iTaskTime, aTask[2], aTask[3]);
				}
				//by ALFik -
			}
		} else { // failed
			_log(2, "HTTP request status: " + httpRequest.status);
		}
		if (isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
		return;
	}
	_log(3, "<- handleRequestAttack()");
}

/**
	Permet de r?cup?rer la r?ponse ? la deuxi?me requ?te et donc de savoir si les marchands
	ont ?t? envoy?s ou non.
**/
function handleRequestSendResource2(httpRequest, options) {
	var aTask = options[0];
	var activateVillageDid = options[1];
	var sParams = options[2];
	_log(3, "<- handleRequestSendResource2()");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
			_log(3, sResponse);
			if (!sResponse) { // error retrieving the response				
				_log(2, "We didn't get any response. Impossible to determine whether the attack was sent.");
				return;
			}
			var villageName = '<span id="ttq_placename_' + aTask[2] + '">' + getVillageName(aTask[2]) + '</span>';
			var merchants_number = countString(sResponse, '<span class="c0">');
			if (parseInt(merchants_number) > parseInt(options[3])) {
				_log(1, "It seems your merchant were successfully sent.");
				printMsg(t("Your merchant were probably sent to") + " " + villageName);
				addToHistory(aTask, true);
			} else {
				_log(1, "Your merchant could not be sent.");
				printMsg(t("Your merchant could not be sent to") + " " + villageName, true);
				addToHistory(aTask, false);
				//by ALFik +
				if (iDelay > 0) {
					var after = after = iDelay * 60;
					var oDate = new Date(); // current GMT date. TODO: server time
					var iTaskTime = parseInt(oDate.getTime() / 1000 + after);
					setTask(aTask[0], iTaskTime, aTask[2], aTask[3]);
				}
				//by ALFik -
			}
		} else { // failed
			_log(2, "HTTP request status: " + httpRequest.status);
			printMsg(t("Your merchant could not be sent to") + " " + villageName, true);
			addToHistory(aTask, false);
		}
		if (isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
		return;
	}
	_log(3, "<- handleRequestSendResource2()");
}

function countString(htmlResponse, stringToFind) {
	return htmlResponse.split(stringToFind).length - 1;
}

function handleRequestSendResource(httpRequest, options) {
	_log(3, "-> handleRequestSendResource()");
	var aTask = options[0];
	var activateVillageDid = options[1];
	var sParams = options[2];
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
			_log(3, sResponse);
			if (!sResponse) { // error retrieving the response				
				_log(2, "We didn't get any response. Impossible to determine whether the attack was sent.");
				return;
			}
			// On r?cup?r les param?tres 			
			var val_id = sResponse.match(/<input type=['"]hidden['"] name=['"]id["'] value=['"]([0-9a-zA-Z]+)['"]>/)[1];
			var val_a = sResponse.match(/<input type=['"]hidden['"] name=['"]a["'] value=['"]([0-9a-zA-Z]+)['"]>/)[1];
			var val_sz = sResponse.match(/<input type=['"]hidden['"] name=['"]sz["'] value=['"]([0-9a-zA-Z]+)['"]>/)[1];
			var val_kid = sResponse.match(/<input type=['"]hidden['"] name=['"]kid["'] value=['"]([0-9a-zA-Z]+)['"]>/)[1];

			var val_number_of_merchants = countString(sResponse, '<span class="c0">');
			sParams = sParams + "&sz=" + val_sz + "&kid=" + val_kid + "&a=" + val_a;
			var newOptions = [options[0], options[1], sParams, val_number_of_merchants]; //
			//alert('next Params' + sParams);		
			_log(3, sParams);
			post("build.php", sParams, handleRequestSendResource2, newOptions);
		}
	}
	_log(3, "<- handleRequestSendResource()");
}

function handleRequestResearch(httpRequest, options) {
	_log(3, "-> handleRequestResearch()");
	var aTask = options[0];
	var activateVillageDid = options[1];
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			var sResponse = httpRequest.responseText;
			if (!sResponse) { // error retrieving the response				
				printMsg(aLangTasks[aTask[0]] + " " + aTask[3] + t(" was attempted with unknown result."), true);
				return;
			}
			xpath("//form/table[2]//td[1]/img[@class='unit']");
			//var re = new RegExp('<div id="lbau.">.*' + aTask[3] + '.*</div>', 'i');
			var iUnit = (iMyRace == 0) ? aTask[3] : iMyRace + aTask[3];
			var re = new RegExp('<td width="\.%"><img class="unit" src="\[^"\]*img/un/u/' + iUnit + '.gif" border="0"></td>', 'i');
			if (sResponse.match(re)) {
				printMsg('<span class="ttq_village_name" style="display:block;">' + getVillageName(aTask[4]) + '</span>' + t("We started researching ") + aLangTroops[iMyRace][aTask[3] - 1]);
				addToHistory(aTask, true);
			} else {
				printMsg('<span class="ttq_village_name" style="display:block;">' + getVillageName(aTask[4]) + '</span>' + aLangTroops[iMyRace][aTask[3] - 1] + t(" cannot be researched."), true);
				addToHistory(aTask, false);
				//by ALFik +
				if (iDelay > 0) {
					var after = after = iDelay * 60;
					var oDate = new Date(); // current GMT date. TODO: server time
					var iTaskTime = parseInt(oDate.getTime() / 1000 + after);
					setTask(aTask[0], iTaskTime, aTask[2], aTask[3]);
				}
				//by ALFik -
			}
		} else { // failed
			_log(2, "HTTP request status: " + httpRequest.status);
		}
		if (isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
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
			if (!sResponse) { // error retrieving the response				
				printMsg(aLangTasks[aTask[0]] + " " + aTask[3] + t(" was attempted with unknown result."), true);
				return;
			}
			var iUnit = (iMyRace == 0) ? aTask[3] : iMyRace + aTask[3];
			var troopsInfo = getTroopsInfo(aTask[3].split("_"));
			var re = new RegExp('width="\.%"><img class="unit" src="\[^"\]*img/un/u/' + iUnit + '.gif" border="0">', 'i');
			if (sResponse.match(re) || GM_getValue('currentNumberOfTraining') > 0) {
				printMsg('<span class="ttq_village_name" style="display:block;">' + getVillageName(aTask[4]) + '</span>' + t("We started training ") + troopsInfo);
				addToHistory(aTask, true);
			} else {
				printMsg('<span class="ttq_village_name" style="display:block;">' + getVillageName(aTask[4]) + '</span>' + troopsInfo + t(" cannot be trained."), true);
				addToHistory(aTask, false);
				//by ALFik +
				if (iDelay > 0) {
					var after = after = iDelay * 60;
					var oDate = new Date(); // current GMT date. TODO: server time
					var iTaskTime = parseInt(oDate.getTime() / 1000 + after);

					setTask(aTask[0], iTaskTime, aTask[2], aTask[3]);
				}
				//by ALFik -
			}
		} else { // failed
			_log(2, "HTTP request status: " + httpRequest.status);
		}
		if (isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
	}

	_log(3, "<- handleRequestTrain()");
}

function handleRequestFindCode(httpRequest, sNewdid) {
	_log(3, "-> handleRequestFindCode()");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
			_log(3, sResponse);
			if (!sResponse) {
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
	_log(2, "Switching your village back to " + did);
	if (!isInt(did)) {
		return;
	}
	get("dorf1.php?newdid=" + did, null, null);
	return;
}

/**
* Adds task to the log DIV.
* @param bSuccess: true if the task was successfully performed.
*/
function addToHistory(aTask, bSuccess) {
	_log(3, "Adding to history...");
	if (iHistoryLength < 1) {
		return;
	}

	bLockedHistory = true;
	var data = readCookie("TTQ_HISTORY");

	if (data != '' && data.length > 0) {
		var oldValue = trimHistory(data, iHistoryLength - 1) + "|";
	} else {
		var oldValue = '';
	}

	var newValue = oldValue + aTask[0] + ',' + aTask[1] + ',' + aTask[2] + ',' + aTask[3];
	if (aTask[4]) {
		newValue += ',' + aTask[4];
	} else {
		newValue += ',' + 'null';
	}
	newValue += ',' + bSuccess;
	_log(2, "Writing cookie TTQ_HISTORY: " + newValue);
	if (!createCookie("TTQ_HISTORY", newValue, 365)) {
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
	if (data != '' && data.length > 0) {
		//trim history as needed
		data = data.split("|");
		var excessTasks = data.length - maxlength;
		if (excessTasks > 0) {
			data.splice(0, excessTasks);
		}
		return data.join("|");
	}
	return data;
}

function flushHistory() {
	createCookie("TTQ_HISTORY", "");
	refreshHistory();
}

/**
 * Create a Queue Links => Queue the Upgrade Or the Creation of The Buildings
 **/
function createQueueLinks() {
	_log(3, "-> createQueueLinks()");
	var iSiteId = getBuildingId();
	if (iSiteId == false) {
		return false;
	}
	var iTask = 0; //the default action is build	
	// Get the building name(s)
	var sXpathExpr = "//h1/b";
	var xpathRes = xpath(sXpathExpr);
	if (xpathRes.snapshotLength > 0) { //standing building
		_log(3, "This is an existing building.");
		iTask = 1;
		var xpathBuildingNames = xpathRes;
		var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i"); // Will be used later for matching buildings and resource sites
		var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i"); // Will be used later. For matching "X. Cranny"	
		_log(3, "Regular expressions (existing site):\n" + re + "\n" + re2);
	} else { //empty building site or error
		_log(3, "This is an empty building site.");
		var xpathBuildingNames = xpath("//h2");
		var re = new RegExp("^([^0-9].*)", "i"); // Will be used later. For matching all except "X. Cranny"
		var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i"); // Will be used later. For matching "X. Cranny"	
		_log(3, "Regular expressions (new site):\n" + re + "\n" + re2);
	}

	for (var i = 0; i < xpathBuildingNames.snapshotLength; ++i) {
		//search for building id
		_log(3, "Searching for building ID...");

		var sBuildingName = xpathBuildingNames.snapshotItem(i).innerHTML; // this can contain level X string		
		var aMatches = sBuildingName.match(re);
		if (aMatches) { //Regular building
			sBuildingName = aMatches[1];
			sBuildingName = rtrim(sBuildingName); //trim trailing spaces
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
			_log(3, "Building or resource site name found: \"" + sBuildingName + "\" \n" + sBuildingId);
		} else if (aMatches = sBuildingName.match(re2)) { // Cranny has different format (e.g. "3. Cranny")
			sBuildingName = aMatches[1];
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
			_log(3, "Cranny name found: " + sBuildingName + " \n" + sBuildingId);
		}
		if (sBuildingId > 0) {
			// Nous r?cup?rons la dur?e de construction du building 
			if (iTask == 0) {
				// Construction d'un batiment
				var xPathConstruct = "/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/h2[" + (i + 1) + "]/../table[1]/tbody/tr/td[1]";
				var resultXpath = xpath(xPathConstruct);
			} else if (iTask == 1) {
				// Am?lioration d'un batiment 
				var xPathUpGrad = "/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/div/table/tbody/tr/td";
				var resultXpath = xpath(xPathUpGrad);
			}
			if (resultXpath.snapshotLength > 0) {
				// On r?cup?re l'heure
				var strTime = resultXpath.snapshotItem(0).textContent;
				var myRegExp = new RegExp("([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})");
				var myMatch = myRegExp.exec(strTime);
				//alert(myMatch[0]);
				// alert(myMatch[1]*3600);
				// alert(myMatch[2]*60);
				// alert(myMatch[3]);
				//alert(strTime + " /" +myMatch);
				var duration = parseInt(myMatch[1] * 3600) + parseInt(myMatch[2] * 60) + parseInt(myMatch[3]); // The default unit is Seconds
			}
			//alert('Create Queue Time:' + myMatch[0] +': ' + duration); 
			// building found in the list			
			var oLink = document.createElement("a");
			oLink.id = "buildLater" + i;
			try {
				var queueTask = aLangStrings[58];
				if (queueTask == '' || queueTask == null || queueTask == undefined) {
					queueTask = 'Queue this Task';
				}
			} catch(Error) {
				_log(3, 'Current Language aLangString not correct');
				var queueTask = 'Queue this Task';
			}

			oLink.innerHTML = "<br> " + queueTask;
			oLink.title = t("Schedule this task for later.");
			oLink.href = "#";
			oLink.setAttribute("iTask", iTask);
			oLink.setAttribute("iTarget", iSiteId);
			oLink.setAttribute("iOptions", sBuildingId);
			oLink.setAttribute("iSiteId", iSiteId);
			if (duration) {
				oLink.setAttribute("iduration", duration);
			}
			oLink.addEventListener('click', setTaskFromEvent, false);
			//setTask(iTask, iTaskTime, iSiteId, sBuildingId);
			_log(3, '--> CreateQueueLink : ' + iTask + " / To Be Set /" + iSiteId + "/" + sBuildingId);

			if (iTask == 0) {
				xpathBuildingNames.snapshotItem(i).nextSibling.nextSibling.appendChild(oLink);
			} else if (iTask == 1) {
				xpathBuildingNames.snapshotItem(i).parentNode.nextSibling.nextSibling.appendChild(oLink);
			}
		} else {
			_log(2, "Building name found, but it was not identified in the building list.\n");
		}
	}
	_log(3, "<- createQueueLinks()");
}

/**
 * @iTask Type of The Task, this will retrieve the Estimated Time of the Last Scheduled Task 
 */
function getEndOfTheLastScheduledTask(iTask, villagedid) {
	var data = readCookie("TTQ_TASKS");
	var Tasks = data.split("|");
	var endOfLastScheduledTask = (new Date()).getTime() / 1000 + 30; // Delay between the instance you programmed it and the execution of the task
	//alert('Cityt Id' + villagedid);
	for (var i = 0; i < Tasks.length; i++) {
		// Param?tres
		var params = Tasks[i].split(",");
		// On r?cup?re le type de la tache 
		var iTaskType = parseInt(params[0]);
		var iTaskTime = parseInt(params[1]);
		var iCityId = parseInt(params[4]); // Id of the village so that it is on the same village which it is calculated
		var iDuration = parseInt(params[5]); // Duration in Msec
		// C'est le m?me type de t?che 
		// et que nous avons un village Identique alors on prend la derni?re heure sinon on prend l'heure courante		
		//case "0":  //build
		//case "1":  //upgrade
		//case "2":  //attack
		//case "3":  //research
		//case "4":  //training
		//case "5": //send Ressource in a delayed time 
		if ((iTaskType == iTask || iTaskType == 0 && iTask == 1 || iTaskType == 1 && iTask == 0) && (iCityId == villagedid || villagedid == false)) {
			if (endOfLastScheduledTask < iTaskTime + iDuration + 30) {
				endOfLastScheduledTask = iTaskTime + iDuration + 30;
			}
		}
	}
	return endOfLastScheduledTask;
}

function createBuildLinks() {
	_log(3, "-> createBuildLinks()");
	var iSiteId = getBuildingId();
	if (iSiteId == false) {
		return false;
	}

	var iTask = 0; //the default action is build
	// Get the building name(s)
	var sXpathExpr = "//h1/b";
	var xpathRes = xpath(sXpathExpr);
	if (xpathRes.snapshotLength > 0) { //standing building
		_log(3, "This is an existing building.");
		iTask = 1;
		var xpathBuildingNames = xpathRes;
		var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i"); // Will be used later for matching buildings and resource sites
		var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i"); // Will be used later. For matching "X. Cranny"	
		_log(3, "Regular expressions (existing site):\n" + re + "\n" + re2);
	} else { //empty building site or error
		_log(3, "This is an empty building site.");
		var xpathBuildingNames = xpath("//h2");
		var re = new RegExp("^([^0-9].*)", "i"); // Will be used later. For matching all except "X. Cranny"
		var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i"); // Will be used later. For matching "X. Cranny"	
		_log(3, "Regular expressions (new site):\n" + re + "\n" + re2);
	}

	for (var i = 0; i < xpathBuildingNames.snapshotLength; ++i) {
		//search for building id
		_log(3, "Searching for building ID...");

		var sBuildingName = xpathBuildingNames.snapshotItem(i).innerHTML; // this can contain level X string
		var aMatches = sBuildingName.match(re);
		if (aMatches) { //Regular building
			sBuildingName = aMatches[1];
			sBuildingName = rtrim(sBuildingName); //trim trailing spaces
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
			_log(3, "Building or resource site name found: \"" + sBuildingName + "\" \n" + sBuildingId);
		} else if (aMatches = sBuildingName.match(re2)) { // Cranny has different format (e.g. "3. Cranny")
			sBuildingName = aMatches[1];
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
			_log(3, "Cranny name found: " + sBuildingName + " \n" + sBuildingId);
		}
		if (sBuildingId > 0) {
			// Nous r?cup?rons la dur?e de construction du building 
			if (iTask == 0) {
				// Construction d'un batiment
				var xPathConstruct = "/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/h2[" + (i + 1) + "]/../table[1]/tbody/tr/td[1]";
				var resultXpath = xpath(xPathConstruct);
			} else if (iTask == 1) {
				// Am?lioration d'un batiment 
				var xPathUpGrad = "/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/div/table/tbody/tr/td";
				var resultXpath = xpath(xPathUpGrad);
			}
			if (resultXpath.snapshotLength > 0) {
				// On r?cup?re l'heure
				var strTime = resultXpath.snapshotItem(0).textContent;
				var myRegExp = new RegExp("([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})");
				var myMatch = myRegExp.exec(strTime);
				//alert(strTime + " /" +myMatch);
				var duration = (parseInt(myMatch[1]) * 3600 + parseInt(myMatch[2]) * 60 + parseInt(myMatch[3])); // The default unit is Seconds
				//alert(duration);
			}

			// building found in the list			
			var oLink = document.createElement("a");
			oLink.id = "buildLater" + i;
			oLink.innerHTML = " " + aLangStrings[iTask];
			oLink.title = t("Schedule this task for later.");
			oLink.href = "#";
			oLink.setAttribute("itask", iTask);
			oLink.setAttribute("starget", iSiteId);
			oLink.setAttribute("soptions", sBuildingId);
			// Specify the potential duration of the task
			if (duration) {
				oLink.setAttribute("iduration", duration);
			}

			oLink.addEventListener('click', displayTimerForm, false);

			if (iTask == 0) {
				xpathBuildingNames.snapshotItem(i).nextSibling.nextSibling.appendChild(oLink);
			}
			else if (iTask == 1) {
				xpathBuildingNames.snapshotItem(i).parentNode.nextSibling.nextSibling.appendChild(oLink);
			}
		} else {
			_log(2, "Building name found, but it was not identified in the building list.\n");
		}
	}

	_log(3, "<- createBuildLinks()");
}

/**
    * Cr?ation du lien pour envoyer 
    **/
function createSendResourceLinks() {
	_log(3, "-> createSendResourceLinks()");
	var xpathResult1 = xpath("//html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/form/table/tbody/tr/td[1]/table/tbody/tr[1]/td[3]/input[@id='r1']");
	var xpathResult2 = xpath("//html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/form/table/tbody/tr/td[1]/table/tbody/tr[2]/td[3]/input[@id='r2']");
	var xpathResult3 = xpath("//html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/form/table/tbody/tr/td[1]/table/tbody/tr[3]/td[3]/input[@id='r3']");
	var xpathResult4 = xpath("//html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/form/table/tbody/tr/td[1]/table/tbody/tr[4]/td[3]/input[@id='r4']");
	if (xpathResult1.snapshotLength > 0 && xpathResult2.snapshotLength > 0 && xpathResult3.snapshotLength > 0 && xpathResult4.snapshotLength > 0) {
		// create the submit button
		var oBtn = document.createElement("input");
		oBtn.type = "button";
		oBtn.value = t("Send later");
		oBtn.style.margin = "3px 6px";
		oBtn.addEventListener("click", scheduleSendResource, false);

		var oOkBtn = document.getElementsByName('s1');
		oOkBtn[0].parentNode.appendChild(oBtn);
	}
	_log(3, "-> createSendResourceLinks()");
}

function createAttackLinks() {
	_log(3, "-> createAttackLinks()");

	var xpathResult = xpath("id('lmid2')//input[@type='text']");
	if (xpathResult.snapshotLength < 1) {
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
	if (xpathResult.snapshotLength < 1) { //no hero textbox - make one
		xpathResult = xpath("id('lmid2')/table[1]/tbody/tr/td/table/tbody/tr[3]");
		if (xpathResult.snapshotLength > 0) {
			xpathResult.snapshotItem(0).lastChild.setAttribute("colspan", "3");
			//xpathResult.snapshotItem(0).innerHTML += '<td width="20"><img class="unit" src="img/un/u/hero.gif" title="" border="0" onclick="document.snd.t11.value=\'\'; return false;" ></td><td width="35"><input class="fm" type="Text" name="t11" value="" size="2" maxlength="6"></td><td class="f8 c b"><b>(' +aLangStrings[33]+ ')</b></td>';
			var oTd1 = document.createElement('td');
			var oTd2 = document.createElement('td');
			var oTd3 = document.createElement('td');
			oTd1.innerHTML = '<img class="unit" src="img/un/u/hero.gif" title="" border="0" >';
			oTd2.innerHTML = '<input class="fm" type="Text" name="t11" value="" size="2" maxlength="6">';
			oTd3.innerHTML = '<b>(' + t("away") + ')</b>';
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
	if (iSiteId == false) {
		return false;
	}

	//is this Academy, Smithy or armory?
	var buildingName = xpath("//h1/b");
	if (buildingName.snapshotLength < 1) {
		_log(2, "Building name not found.")
		return;
	}
	var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i");
	buildingName = buildingName.snapshotItem(0).innerHTML.match(re);
	switch (buildingName[1]) {
	case aLangBuildings[22]:
		//academy
		var linkTxt = t("Research later");
		break;
	case aLangBuildings[12]:
		//smithy
	case aLangBuildings[13]:
		//armory
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
	for (var i = 0;
	(i < Imgs.snapshotLength) && (i < Cells.snapshotLength); i++) {
		var thisImg = Imgs.snapshotItem(i);
		var thisCell = Cells.snapshotItem(i);
		var iTroopId = thisImg.src.match(/([0-9]{1,2})\.gif/i);
		if (!iTroopId) {
			break;
		}
		iTroopId = iTroopId[1];

		if (iTroopId > 20) {
			iTroopId = iTroopId - 20;
		} else if (iTroopId > 10) {
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
		oLink.addEventListener('click', displayTimerForm, false);
		thisCell.parentNode.appendChild(oLink);
	}

	_log(3, "<- createResearchLinks()");
}

function createTrainLinks() {
	_log(3, "-> createTrainLinks()");

	var re = /.*build\.php\?id=([0-9]{1,2})/i;
	var iSiteId = getBuildingId();
	if (iSiteId == false) {
		return false;
	}

	//is this Barracks, Stables, Workshop, Residence or Palace?
	var buildingName = xpath("//h1/b");
	if (buildingName.snapshotLength < 1) {
		_log(2, "Building name not found.")
		return;
	}
	var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i");
	buildingName = buildingName.snapshotItem(0).innerHTML.match(re);
	var bIsResidence = false;
	switch (buildingName[1]) {
	case aLangBuildings[19]:
		//barracks
	case aLangBuildings[20]:
		//stables
	case aLangBuildings[21]:
		//workshop
		var linkTxt = t("Train later");
		break;
	case aLangBuildings[25]:
		//residence
	case aLangBuildings[26]:
		//palace
		re = /s=[0-9]+/i;
		if (re.test(location.href)) { //not on the first page of palace/residence
			return;
		}
		bIsResidence = true;
		var linkTxt = t("Train later");
		break;
	default:
		_log(2, "No train links needed.");
		return;
	}

	if (bIsResidence) {
		_log(2, "Adding train later links for residence/palace...");
		var trainBtn = xpath("//p[2]/input[@type='image']");
		if (trainBtn.snapshotLength > 0) { //we need to build only the button
			_log(2, "Adding train later links for residence/palace...");
			var oBtn = document.createElement("input");
			oBtn.type = "button";
			oBtn.value = linkTxt;
			oBtn.style.margin = "3px 6px";
			oBtn.addEventListener("click", scheduleTraining, false);
			trainBtn.snapshotItem(0).parentNode.appendChild(oBtn);
		} else { //we need to build the textbox
			//get the code. No code - no training
			var iCode = xpath("id('lmid2')/form//input[@name='z']");
			if (iCode.snapshotLength < 1) {
				_log(3, "No code available. No train later link available.");
				return false;
			}

			var oDiv = document.createElement("table");
			oDiv.innerHTML = '<tr><td><img class="unit" src="img/un/u/20.gif"></td><td>' + aLangTroops[iMyRace][9] + '</td><td><input type="text" value="0" size="2" maxlength="4" name="t10"/></td></td><input type="button" value="' + linkTxt + '" id="ttq_settler_submit_btn" style="margin:3px 6px;" /></td></tr>';
			var oParent = xpath("id('lmid2')/p[2]");
			if (oParent.snapshotLength < 1) {
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
		if (trainBtn.snapshotLength < 1) { //button not found
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

/**
 Current function that lets you temporate the sending ressources 
 to a specified village . 
**/
function scheduleSendResource(e) {
	_log(3, "-> scheduleSendResource()");
	// Get the current village of the User 		
	var hiddenId = getValueOfInput("id");

	var iVillageFromId = getActiveVillage();
	_log(3, "Current Village =>" + iVillageFromId);
	// Get the targeted Village of Ressouces 
	var villageTargetName = getValueOfInput("dname");
	// We get The Id of the Targeted village  with the Coordinate 
	var iX = getValueOfInput("x");
	var iY = getValueOfInput("y");
	if (iX != '' && iY != '') {
		var iVillageTargetId = coordsXYToZ(iX, iY);
		_log(3, "Send Resource delayed to Village[Did] : " + iVillageTargetId);
	} else {
		if (villageTargetName == '') {
			_log(3, "No target specified.");
			printMsg(t("The sending ressource cannot be delayed, beaucause no target specified."), true);
			return false;
		}
	}
	_log(3, "Send Resource delayed to Village[Name] : " + villageTargetName);

	// Get the number of ressource and check if there is Ressources to be SENT 
	var ir1 = getValueOfInput("r1"); // Bois		
	var ir2 = getValueOfInput("r2"); // Terre
	var ir3 = getValueOfInput("r3"); // Fer
	var ir4 = getValueOfInput("r4"); //C?r?ale		
	_log(3, "=> Bois : " + ir1);
	_log(3, "=> Terre : " + ir2);
	_log(3, "=> Fer : " + ir3);
	_log(3, "=> C?r?ale : " + ir4);
	if (ir1 == '' && ir2 == '' && ir3 == '' && ir4 === '') {
		_log(3, "No quantity specified.");
		printMsg(t("You must specify quantity of resource to send."), true);
		return false;
	} else {
		_log(3, "=> Bois : " + ir1);
		_log(3, "=> Terre : " + ir2);
		_log(3, "=> Fer : " + ir3);
		_log(3, "=> C?r?ale : " + ir4);
	}
	_log(3, "==> Ressource Sent " + "&" + iVillageFromId + "&dname=" + villageTargetName + "&r1=" + ir1 + "&r2=" + ir2 + "&r3=" + ir3 + "&r4=" + ir4 + "&dname=" + villageTargetName + "&x=" + iX + "&y=" + iY + "&=" + hiddenId);

	// Display the form to specifiy the delay of sending resources 
	// Value 5 is the new SendResource Task5
	displayTimerForm(5, iVillageFromId, ir1 + "_#" + ir2 + "_#" + ir3 + "_#" + ir4 + "_#" + villageTargetName + "_#" + iX + "_#" + iY + "_#" + hiddenId);
	_log(3, "<- scheduleSendResource");
}

function scheduleAttack(e) {
	_log(3, "-> scheduleAttack()");
	var iVillageId = window.location.href.match(/.*a2b\.php\?(newdid=[0-9]*&)?z=([0-9]*)/); // target village
	if (iVillageId != null) {
		iVillageId = iVillageId[2];
	} else { //try to get the coordinates
		var sX = document.getElementsByName('x');
		var sY = document.getElementsByName('y');
		iX = sX[0].value;
		iY = sY[0].value;
		if (iX != '' && iY != '') {
			iVillageId = coordsXYToZ(iX, iY);
		}
	}

	if (iVillageId == null) {
		_log(2, "Target village ID not found.");
		printMsg(t("The attack cannot be scheduled because no destination was specified."), true);
		return false;
	}

	var aTroops = new Array();
	var iAttackType = null;
	var sXpathExpr = "//div[@class='f10']/input[@type='radio']";
	var xpathRes = xpath(sXpathExpr);
	if (xpathRes.snapshotLength > 0) {
		for (var i = 0; i < xpathRes.snapshotLength; i++) {
			if (xpathRes.snapshotItem(i).checked) iAttackType = i + 2;
		}
	} else {
		_log(2, "The type of attack was not determined. Unable to schedule the attack.");
		return false;
	}
	if (iAttackType != null) {
		aTroops[0] = iAttackType;
	}
	else {
		_log(2, "The type of attack was not determined. Unable to schedule the attack.");
		return false;
	}

	sXpathExpr = "//table[@class='p1']//table//td/input[@type='text']";
	xpathRes = xpath(sXpathExpr);

	var bNoTroops = true;
	if (xpathRes.snapshotLength > 0) {
		for (var i = 0; i < xpathRes.snapshotLength; i++) {
			var aThisInput = xpathRes.snapshotItem(i);
			var iTroopId = aThisInput.name.substring(1);
			aTroops[iTroopId] = (aThisInput.value != '') ? aThisInput.value: 0;
			if (aThisInput.value) {
				bNoTroops = false;
			} //at least 1 troop has to be sent
		}
	} else {
		_log(2, "No info about troops found. Unable to schedule the attack.");
		return false;
	}

	_log(3, "Troops:\n" + aTroops);

	if (bNoTroops) {
		_log(2, "No troops were selected. Unable to schedule the attack.");
		printMsg(t("The attack cannot be scheduled because no troops were selected."), true);
		return false;
	}

	// Good, we have at least 1 troop. Display the form
	displayTimerForm(2, iVillageId, aTroops);
	_log(3, "<- scheduleAttack()");
}

function scheduleTraining(e) {
	var Inputs = xpath("id('lmid2')//table//input[@type='text']");
	if (Inputs.snapshotLength < 1) {
		_log(3, "No textboxes with troop numbers found.");
		return false;
	}
	var buildingId = getBuildingId();
	var aTroops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //the first member  is the code
	var bNoTroops = true;
	for (var i = 0; i < Inputs.snapshotLength; i++) {
		var thisTroopType = parseInt(Inputs.snapshotItem(i).name.substring(1));
		aTroops[thisTroopType] = (Inputs.snapshotItem(i).value != '') ? Inputs.snapshotItem(i).value: 0;
		if (Inputs.snapshotItem(i).value && Inputs.snapshotItem(i).value != 0) {
			bNoTroops = false;
		}
	}

	if (bNoTroops) {
		_log(2, "No troops were selected. Unable to schedule the attack.");
		printMsg(t("No troops were selected."), true);
		return false;
	}

	//get the code
	var iCode = xpath("id('lmid2')/form//input[@name='z']");
	if (iCode.snapshotLength > 0) {
		aTroops[0] = iCode.snapshotItem(0).value;
	} else {
		_log(3, "No code available. Exiting.");
		return false;
	}

	//currently, only 1 kind of troop can be trained at once - null all elements except for the oth one (code) and the first non-zero value
	var somethingFound = false;
	aTroops.forEach(function(element, index) {
		if (index > 0 && element > 0) {
			if (somethingFound) aTroops[index] = 0;
			somethingFound = true;
		}
	})

	// Good, we have at least 1 troop. Display the form
	displayTimerForm(4, buildingId, aTroops);
}

/**
  * Let you get the current number of Element you've programmed to train 
  */
function getNumberOfCurrentTraining() {
	var xpathString = "/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/form/table[2]/tbody/tr/td/img";
	var object = xpath(xpathString);
	if (object != null) {
		return object.snapshotLength;
	} else {
		return 0;
	}

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
	if (iTask != 2 && iTask != 4 && target == null) { //if params are supplied, we do not extract them from the event object target (link)
		var el = iTask.target; // iTask really is the Event object!
		var iTask = parseInt(el.getAttribute("itask"));
		var target = el.getAttribute("starget");
		var options = el.getAttribute("soptions");
		var taskDuration = el.getAttribute("iduration"); // Task Duration in Msec
		//alert(taskDuration);	
		if (iTask == undefined || target == undefined || options == undefined) {
			_log(2, "Missing arguments:\niTask=" + iTask + "\ntarget=" + target + "\noptions=" + options);
			return false;
		}
	}
	var sTask = '';
	var sWhat = '';
	var sMoreInfo = ''
	if (iMyRace != 0 && iMyRace != 1 && iMyRace != 2) iMyRace = getOption("RACE", 0, "integer");

	switch (iTask) {
	case 0:
		//build
	case 1:
		//upgrade
		sWhat = aLangBuildings[options];
		sTask = aLangTasks[iTask];
		sMoreInfo = t("at site no.") + " " + target;
		break;
	case 2:
		//Attack, Raid, Support
		sWhat = '<span id="ttq_placename_' + target + '">' + getPlaceName(target) + '</span>';
		var iAttackType = parseInt(options[0]) + 18;
		sTask = aLangStrings[iAttackType];
		var bCatapultPresent = (options[8] > 0) ? true: false;
		var bOnlySpies = onlySpies(options);
		if (options[11] == undefined) options[11] = 0; //if no heros are specified, set them to zero
		sMoreInfo = getTroopsInfo(options);
		options = options.join("_");
		break;
	case 3:
		//Research
		sWhat = aLangTroops[iMyRace][options - 1];
		sTask = aLangTasks[3];
		break;
	case 4:
		//Training
		sWhat = t("troops.");
		sTask = aLangTasks[4];

		sMoreInfo = getTroopsInfo(options);
		options = options.join("_");
		var numberOfTraining = getNumberOfCurrentTraining();
		GM_setValue('currentNumberOfTraining', numberOfTraining);
		break;
	case 5:
		// Sending Resource Delayed Time 
		sTask = aLangTasks[5];
		var infos = options.split("_");
		_log(3, " options.split =>" + infos);
		_log(3, "Task Send Ressource => " + sTask);
		sWhat = t(" ? :") + "[" + infos[4].substring(1, infos[4].length); // Then 5  value of the options is the name of the destination village 			
		sWhat = sWhat + " " + infos[5].substring(1, infos[5].length) + " |" + infos[6].substring(1, infos[6].length) + "]"; // Then 5  value of the options is the name of the destination village 			
		smoreInfo = t("Delayed sending resource");
		break;
	}

	var oTimerForm = document.createElement("form");

	//Suggest the current time. Can be local or server time.
	if (bUseServerTime && !timestamp) { //suggest the server time
		var sTimeType = "זמן שרת:";
		var sTime = getServerTime();
		sTime = (!sTime) ? "": sTime; //clear sTime if it is false
	} else if (bUseServerTime && timestamp) { //suggest the timestamp displayed as server time
		var iServerTimeOffset = getServerTimeOffset();
		timestamp = (parseInt(timestamp) + (iServerTimeOffset * 3600)) * 1000;
		var oServerDate = new Date(timestamp);
		var sTime = formatDate(oServerDate.getUTCFullYear(), (oServerDate.getUTCMonth() + 1), oServerDate.getUTCDate(), oServerDate.getUTCHours(), oServerDate.getUTCMinutes(), oServerDate.getUTCSeconds());
	} else { //suggest the local time
		var sTimeType = "זמן מחשב:";

		if (timestamp) {
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
	if (iTask == 2 && iAttackType > 20 && bCatapultPresent) {
		var sCataOptions = "";
		for (var j = 1; j < aLangBuildings.length; j++) {
			sCataOptions += '<option value="' + j + '">' + aLangBuildings[j] + '</option>';
		}
		sCataTargets = '<select name="kata" size="" class="f8"><option value="99">' + t("random") + '</option>' + sCataOptions + '</select>';
		sCataTargets += '<select name="kata2" size="" class="f8"><option value="99">' + t("random") + '</option>' + sCataOptions + '</select>';
	}

	//Allow specifying the spying mode (only if there is nothing but spies being sent and if this is not a support)
	var sSpyMode = '';
	if (iTask == 2 && iAttackType > 20 && bOnlySpies) {
		sSpyMode = '<input type="radio" name="spy" value="1" checked>' + t("Spy for resources and troops") + ' <input type="radio" name="spy" value="2">' + t("Spy for troops and defenses");
	}

	// Allow specifying repeated attack on a village => N times spaced by M Secondes or Days 
	var sTaskRepeated = '';
	sTaskRepeated = ' ' + t("or repeat ") + ' <input width="5" name="nbOfRepeat" type="text" id="nbOfRepeat" value = "0";" /> ' + t("times ") + ' ' + t("espaced by ") + '<input name="espacedTime"  type="text" id="espacedTime" value ="0";" />' + '<select name="timeUnitRepeat">' + '<option value="1">' + t("seconds") + '</option>' + '<option value="60" selected="selected">' + t("minutes") + '</option>' + '<option value="3600">' + t("hours") + '</option>' + '<option value="86400">' + t("days") + '</option>' + '</select><br/>';

	oTimerForm.id = "timerForm";
	oTimerForm.setAttribute("class", "handle");
	var sLinkClose = "<a href='#' onclick='document.body.removeChild(document.getElementById(\"timerform_wrapper\"));' class='ttq_close_btn'><img src='" + sCloseBtn + "' alt='X' /></a>";

	oTimerForm.innerHTML = sLinkClose + '<input type="hidden" name="timerTask" value="' + iTask + '" />' + '<input type="hidden" name="timerTarget" value="' + target + '" />' + '<input type="hidden" name="timerOptions" value="' + options + '" /><p>' + '<input type="hidden" name="taskDuration" value="' + taskDuration + '"/>' + sTask + ' ' + sWhat + '<br/>' + t("at") + ' <input name="at" onmousedown="function(e){alert(\'oleeee\');/*e.stopPropagation();*/}" type="text" id="at" value="' + sTime + '" onfocus="document.getElementById(\'after\').value = \'\'; this.value=\'' + sTime + '\'" title="' + sTimeType + '" /> ' + t("or after") + ' <input name="after" type="text" id="after" onfocus="document.getElementById(\'at\').value = \'\';" />' + '<select name="timeUnit">' + '<option value="1">' + t("seconds") + '</option>' + '<option value="60" selected="selected">' + t("minutes") + '</option>' + '<option value="3600">' + t("hours") + '</option>' + '<option value="86400">' + t("days") + '</option>' + '</select><br/>' + sTaskRepeated + '<span style="font-size:75%; cursor:default;">' + sMoreInfo + '</span></p>';

	if (sCataTargets != '') {
		oTimerForm.innerHTML += '<p>' + t("Catapults will aim at") + ': ' + sCataTargets + ' </p>';
	}

	if (sSpyMode != '') {
		oTimerForm.innerHTML += '<p>' + sSpyMode + '</p>';
	}

	var oSubmitBtn = document.createElement("input");
	oSubmitBtn.name = "submitBtn";
	oSubmitBtn.value = "אישור";
	oSubmitBtn.type = "button";
	oSubmitBtn.addEventListener('click',
	function() {
		handleTimerForm(this.form)
	},
	true);
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
	// At a specified Time 
	var at = oForm.at.value;

	// Calcule de la date de la t?che ? une date pr?cise 
	if (at == '') {
		var after = oForm.after.value;
		var timeUnit = oForm.timeUnit.value;
		after = after * timeUnit; // convert to seconds
		var oDate = new Date(); // current GMT date. TODO: server time
		var iTaskTime = parseInt(oDate.getTime() / 1000 + after);
	} else {
		// convert formatted date to milliseconds
		var re = new RegExp("^(2[0-9]{3})/([0-9]{1,2})/([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})$", "i");
		var aMatch = at.match(re);
		if (!aMatch) {
			_log(1, "You entered invalid format of date!");
			return;
		}
		for (var i = 2; i < aMatch.length; i++) {
			// convert strings to integers
			if (aMatch[i].match(/0[0-9]{1}/i)) {
				aMatch[i] = aMatch[i].substring(1);
			}
			aMatch[i] = parseInt(aMatch[i]);
		}

		// Time zone conversions
		if (bUseServerTime) { //server time
			var iServerTimeOffset = getServerTimeOffset();
			if (iServerTimeOffset == false) { //problem. do nothing.
				_log(2, "We could not schedule this task, because we were unable to determine server's timezone.");
				printMsg("We could not schedule this task, because we were unable to determine server's timezone.", true);
				return false;
			}

			var oTaskDate = new Date(aMatch[1], aMatch[2] - 1, aMatch[3], aMatch[4], aMatch[5], aMatch[6]); //server time in local offset
			var newtimestamp = oTaskDate.getTime() - (oTaskDate.getTimezoneOffset() * 60000); //server time in server's timezone
			newtimestamp = newtimestamp - (iServerTimeOffset * 3600000); //get the UTC server time for this task			
			iTaskTime = parseInt(newtimestamp / 1000); //convert to seconds
		} else { //local time
			var oDate = new Date(aMatch[1], aMatch[2] - 1, aMatch[3], aMatch[4], aMatch[5], aMatch[6]);
			var iTaskTime = parseInt(oDate.getTime() / 1000);
		}
	}

	document.body.removeChild($('timerform_wrapper'));
	_log(2, "Task will be scheduled for " + iTaskTime); // The stored time is the absolute Unix GMT time.	
	if (oForm.kata) { //store catapults targets
		oForm.timerOptions.value += "_" + oForm.kata.value;
	}

	if (oForm.kata2) { //store catapults targets
		oForm.timerOptions.value += "_" + oForm.kata2.value;
	}

	if (oForm.spy) { //spying mission
		for (var i = 0; i < oForm.spy.length; i++) {
			if (oForm.spy[i].checked) {
				oForm.timerOptions.value += "_" + oForm.spy[i].value;
			}
		}
	}
	// *********************************************************************		
	// We repeat the task a certain number of Time  and get the Repeat parameters 				
	// *********************************************************************
	if (oForm.nbOfRepeat != null && oForm.espacedTime != null && oForm.espacedTime.value != "0" && oForm.nbOfRepeat.value != "0") {
		_log(3, "=> Repeat Task " + oForm.nbOfRepeat.value + " espaced by" + oForm.espacedTime.value);
		var nbOfIteration = oForm.nbOfRepeat.value;
		var timeBetweenIteration = oForm.espacedTime.value;

		var timeUnitRepeat = oForm.timeUnitRepeat.value;
		var timeRepeatInterval = timeBetweenIteration * timeUnitRepeat; // convert to seconds						
		// REPEAT  THE ACTION FOR A CERTAIN TIME ESPACED BY A PERIOD TIME
		for (var k = 0; k < nbOfIteration; k++) {
			// We add a Random time Repetition which is between 
			var randomValue = taskRandomCoeff * Math.random();
			if (k != 0) {
				iTaskTime = parseInt(iTaskTime + timeRepeatInterval + randomValue);
			}
			setTask(oForm.timerTask.value, iTaskTime, oForm.timerTarget.value, oForm.timerOptions.value);
		}
		_log(3, "<== Repeat Task");
	} else {
		// *********************************************************************		
		// No repetition Needed
		// *********************************************************************
		setTask(oForm.timerTask.value, iTaskTime, oForm.timerTarget.value, oForm.timerOptions.value);
		_log(3, "<- handleTimerForm()");
	}
	//alert('--> HandleTimerForm : ' + oForm.timerTask.value +" /" + iTaskTime +"/ " +oForm.timerTarget.value+" /" + oForm.timerOptions.value);		
}

/** @return true if there are only spies, false if there is anything else or no spies. */
function onlySpies(aTroops) {
	_log(3, "-> onlySpies()");

	var iScoutUnit = getOption("SCOUT_UNIT", false, "integer");
	if (iScoutUnit != 3 && iScoutUnit != 4) { //3 or 4 are the only valid values
		_log(2, "Unknown iScoutUnit. Unable to determine if this is a spying mission.");
		return false;
	}

	if (aTroops[iScoutUnit] < 1) { //no spies
		_log(3, "No spies.");
		return false;
	}
	for (var i = 1; i <= 11; i++) {
		if (i != iScoutUnit && parseInt(aTroops[i]) > 0) { //at least one other troop		
			_log(3, "Troops other than spies are present.");
			return false;
		}
	}
	_log(3, "This is a spying mission.");
	return true;
	_log(3, "<- onlySpies()");
}

function printMsg(sMsg, bError) {
	_log(3, "-> printMsg()");
	var oDate = new Date();
	var sWhen = oDate.toLocaleString() + "\n";
	_log(1, sWhen + sMsg);
	// delete old message
	var oOldMessage = $("ttq_message");
	if (oOldMessage) {
		_log(3, "Removing the old message." + oOldMessage);
		oOldMessage.parentNode.removeChild(oOldMessage);
	}

	// here we generate a link which closes the message
	var sLinkClose = "<a href='#' onclick='document.getElementById(\"ttq_message\").parentNode.removeChild(document.getElementById(\"ttq_message\"));' class='ttq_close_btn'><img src='" + sCloseBtn + "' alt='X' /></a>";

	var sBgColor = (bError) ? "#FFB89F": "#90FF8F";
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
	if (sTo == '' || sMsg == '' || sC == '') {
		return false;
	}
	var sParams = 'c=' + sC + '&an=' + sTo + '&be=' + sSubject + '&message=' + sMsg + '&t=2&s1=';
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

function readCookie(name) {
	_log(3, "-> readCookie()");
	if (!name) {
		var name = "TTQ_TASKS";
	}
	var reg = new RegExp(name + "=([^;\n\r]*);?", "i");
	var data = reg.exec(document.cookie);
	if (data == null || data.length <= 1) {
		return '';
	}
	return data[1];
	_log(3, "<- readCookie()");
}

function createCookie(name, value, days) {
	_log(3, "-> createCookie()");
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";

	document.cookie = name + "=" + value + expires + "; path=/";

	_log(3, "<- createCookie()");
	return true;
}

function getCode(iSiteId, iNewdid) {
	_log(3, "-> getCode()");

	if (iNewdid != 'null' && iNewdid != '') {
		var sNewdid = "&newdid=" + iNewdid;
	} else {
		var sNewdid = "";
	}

	get("build.php?id=" + iSiteId + sNewdid, handleRequestFindCode, iNewdid);
	_log(3, "<- getCode()");

}

function findCode(sPage, iNewdid) {
	_log(3, "-> findCode()");
	var iMode = 0; // mode is 0 for building new stuff, 1 for upgrading
	var sCode = '';
	if (!iNewdid) {
		var iNewdid = 'null';
	}

	var re0 = /dorf2\.php\?a=[0-9]{1,2}&id=[0-9]{1,2}&c=(.{3})/i; // new building
	var re1 = /dorf[1-2]\.php\?a=.*&c=(.{3})/i; //upgrade
	var aMatch0 = sPage.match(re0);
	var aMatch1 = sPage.match(re1);
	if (aMatch0) {
		_log(3, "Code for building new stuff found.");
		sCode = aMatch0[1];
		iMode = 0;
	} else if (aMatch1) {
		_log(3, "Code for upgrading found.");
		sCode = aMatch1[1];
		iMode = 1;
	} else {
		_log(3, "Code not found");
		return;
	}

	//save the found code in the proper cookie
	if (bLockedCode) {
		_log(3, "The TTQ_CODE_" + iMode + " cookie is locked. We were not able to write it.");
		return false;
	}
	if (sCode != '') {
		bLockedCode = true; // TODO check if the cookie is locked. Lock it separately from tasks
		var sCookie = readCookie("TTQ_CODE_" + iMode);
		var aCookie = new Array();
		if (sCookie != '') { //there is a cookie
			aCookie = sCookie.split(",");
			var iIndexOfVillageId = aCookie.indexOf(iNewdid);
			if (iIndexOfVillageId > -1) { // existing old code - remove
				aCookie.splice(iIndexOfVillageId, 2);
			}
		}
		aCookie.push(iNewdid);
		aCookie.push(sCode);
		sCookie = aCookie.join(",");
		_log(3, "Writing cookie: " + sCookie);
		createCookie('TTQ_CODE_' + iMode, sCookie, 365);
		bLockedCode = false;
	} else {
		_log(2, "We didn't find any code. Either there is not enough resources for this task, or another building is being built/upgraded.");
		return false;
	}

	_log(3, "<- findCode()");
}

function detectLanguage() {
	if (sLang != "") {
		return;
	}
	var re = null;
	re = new RegExp("^http://[^/]*\.([a-zA-Z]{2,3})\/.*$", "i");
	var lang = window.location.href.match(re);
	if (!lang) {
		return;
	} else {
		sLang = lang.pop();
	}
}

/** @return coordZ if the name is not found in the cache. */
function getPlaceName(iPlaceId) {
	_log(3, "-> getPlaceName()");

	if (!bDisplayVillageNames) {
		return iPlaceId;
	}

	//first try to load the name from the cache
	var sCookie = readCookie("TTQ_PLACE_NAMES"); // format: "123456,VillageName,233564,VillageName,"	
	if (sCookie != '') {
		var aPlaces = sCookie.split(",");
		var iPlacesLength = aPlaces.length;
		if (iPlacesLength > 0) {
			for (var i = 0; i < iPlacesLength; i++) {
				if (aPlaces[i].indexOf(iPlaceId) > -1) {
					return decodeURI(aPlaces[i + 1]);
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
	httpRequest.open("GET", "karte.php?z=" + iPlaceId, true);
	httpRequest.send(null);

	return iPlaceId;
	_log(3, "<- getPlaceName()");
}

function handleGetPlaceName(httpRequest, iPlaceId) {
	_log(3, "-> handleGetPlaceName()");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok		
			_log(3, "HTTP response retrieved.");
			var sResponse = httpRequest.responseText; // it would be much easier to find what we want in responseXML, but it doesn't work, since it is not well-formed
			if (sResponse) {

				var iCoordX = coordZToX(iPlaceId);
				var iCoordY = coordZToY(iPlaceId);
				_log(3, "Coordinates for " + iPlaceId + ": " + iCoordX + "|" + iCoordY);
				var re = new RegExp("onmouseover=\"map\\('([^']*)','([^']*)','[^']*','[^']*','" + iCoordX + "','" + iCoordY + "'\\)\"", "i");
				var aMatch = sResponse.match(re);
				if (aMatch && aMatch[1]) {
					_log(2, "The village name found:" + aMatch[1]);
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
	var sCookie = readCookie("TTQ_PLACE_NAMES");
	if (sCookie) {
		aPlaces = sCookie.split(",");
	}

	if (aPlaces.length > (2 * iMaxPlaceNamesCookieLength)) { //cookie is too long, clear it first
		aPlaces = [];
	}

	if (aPlaces.length > 1) {
		var iIndexId = aPlaces.indexOf(iPlaceId);
		if (iIndexId > -1) { //this place is stored - remove
			aPlaces.splice(iIndexId, 2);
		}
	}
	aPlaces.push(iPlaceId);
	aPlaces.push(encodeURI(sPlaceName));
	var sNewCookie = aPlaces.join(",");
	createCookie("TTQ_PLACE_NAMES", sNewCookie, 1); //this cookie is valid 1 day

	_log(3, "<- cachePlaceId()");
}

function injectPlaceName(sPlaceName, iPlaceId) {
	var oSpan1 = $('ttq_placename_' + iPlaceId);
	var oSpan2 = $('ttq_placename_history_' + iPlaceId);
	if (oSpan1) {
		oSpan.innerHTML = sPlaceName;
		return;
	}
	if (oSpan2) {
		oSpan.innerHTML = sPlaceName;
		return;
	}
	return;
}

/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown = false;
var lMouseState = false;
var dragObject = null;
var curTarget = null;

function mouseCoords(ev) {
	return {
		x: ev.pageX,
		y: ev.pageY
	};
}

function makeClickable(object) {
	object.onmousedown = function() {
		dragObject = this;
	}
}

function getMouseOffset(target, ev) {
	var docPos = getPosition(target);
	var mousePos = mouseCoords(ev);
	return {
		x: mousePos.x - docPos.x,
		y: mousePos.y - docPos.y
	};
}

function getPosition(e) {
	var left = 0;
	var top = 0;
	while (e.offsetParent) {
		left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
		top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
		e = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
	top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
	return {
		x: left,
		y: top
	};
}

function mouseMove(ev) {
	var target = ev.target;
	var mousePos = mouseCoords(ev);

	if (dragObject) {
		dragObject.style.position = 'absolute';
		dragObject.style.top = (mousePos.y - mouseOffset.y) + "px";
		dragObject.style.left = (mousePos.x - mouseOffset.x) + "px";
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev) {
	if (dragObject) {
		switch (dragObject.id) {
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
		setOption(key, dragObject.style.top + "_" + dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev) {
	var mousePos = mouseCoords(ev);
	var target = ev.target;
	iMouseDown = true;
	if (target.getAttribute('DragObj')) {
		return false;
	}
}

function makeDraggable(item) {
	if (!item) return;
	item.addEventListener("mousedown",
	function(ev) {
		dragObject = this.parentNode;
		mouseOffset = getMouseOffset(this.parentNode, ev);
		return false;
	},
	false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);

/************************************************************************************/

function xpath(query, object) {
	if (!object) var object = document;
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getRace() {
	_log(3, "-> getRace()");
	var xpathResult = xpath("//img[@class='unit']");
	if (xpathResult.snapshotLength > 0) {
		var src = xpathResult.snapshotItem(0).src;
		var iTroopType = src.match(/([0-9]{1,2})\.gif/i);
		if (!iTroopType || !iTroopType[1]) {
			_log(2, "Image not found. Could not determine the race.");
			return false;
		}
		iTroopType = parseInt(iTroopType[1]);
		if (iTroopType > 20) {
			return 2; //gaul
		} else if (iTroopType > 10) {
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
	if (iSiteId != null) {
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
	if (oActiveLink.snapshotLength > 0) {
		_log(2, "Active village link found.");
		var sHref = oActiveLink.snapshotItem(0).href;
		var aMatch = sHref.match(/newdid=([0-9]*)/i);
		if (!aMatch) {
			_log(2, "Active village id could not be found.");
			return false;
		} else {
			_log(3, "Active village id was found: " + aMatch[1]);
			return aMatch[1];
		}
	} else {
		// Try another way to get the active village
		var buildLink = xpath("/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/div/a");
		if (buildLink.snapshotLength > 0) {
			var sUrl = buildLink.snapshotItem(0).href;
			var aMatch2 = sUrl.match(/&a=([0-9]*)/i);
			if (!aMatch) {
				_log(2, "Active village id could not be found.");
				return false;
			} else {
				_log(3, "Active village id was found: " + aMatch[1]);
				return aMatch[0];
			}
		} else {
			_log(2, "Active village could not be found.");
			return false;
		}
	}
	_log(3, "<- getActiveVillage()");
}

/** @return name of one of your one villages. */
function getVillageName(iVillageDid) {
	_log(3, "-> getVillageName()");
	if (iVillageDid == '' || iVillageDid == 'null') { //no village id
		return '';
	}
	var sVillageName = '';
	var xpathResult = xpath("id('lright1')/table/tbody/tr/td/a[contains(@href, '" + iVillageDid + "')]");
	if (xpathResult.snapshotLength > 0) {
		return xpathResult.snapshotItem(0).innerHTML;
	} else {
		return 'unknown';
	}
	_log(3, "<- getVillageName()");
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g, "");
}

function ltrim(stringToTrim) {

	return stringToTrim.replace(/^\s+/, "");
}

function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/, "");
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

	createCookie("TTQ_CODE_0", "", -1);
	createCookie("TTQ_CODE_1", "", -1);
	createCookie("TTQ_PLACE_NAMES", "", -1);
	createCookie("TTQ_LIST_POSITION", "", -1);
	createCookie("TTQ_LAST_REFRESH", "", -1);

	GM_setValue("TTQ_VERSION", sCurrentVersion);
	alert("הסקריפט עודכן");
	_log(3, "<- performUpgrade()");
}

/**
* @return The server timezone offset from GMT or false if it is not available. 
*/
function getServerTimeOffset() {
	_log(3, "-> getServerTimeOffset()");
	var iServerTimeOffset = getOption("SERVER_TIME_OFFSET", false);
	if (iServerTimeOffset != false) { //no automatic detection
		_log(3, "Returning the predefined iServerTimeZoneOffset.");
		return parseInt(iServerTimeOffset);
	} else { //automatic detection	
		var iOffset = xpath("id('ltime')/span[2]");
		if (iOffset.snapshotLength < 1) { //not found. Unknown offset.
			return false;
		} else {
			iOffset = iOffset.snapshotItem(0).innerHTML;
			var aMatch = iOffset.match(/([A-Z]{3})([-+]{1}[0-9]{1,2})/i);
			if (!aMatch) {
				_log(3, "No server time zone recognized, although it seems to be displayed.");
				return false;
			}

			iOffset = parseInt(aMatch[2]);
			switch (aMatch[1]) {
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
	if (sTime.snapshotLength < 1) {
		_log(3, "No server time found.");
		return false;
	}
	sTime = sTime.snapshotItem(0).innerHTML;

	// now we need to determine server date - tricky.
	var aMatch = sTime.match(/^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/i);
	if (!aMatch) {
		_log(3, "No server time found. Server date could not be determined.");
		return false;
	}

	// get UTC time of the server
	var UTCHoursServer = parseInt(aMatch[1]) - iTimeOffset;
	if (UTCHoursServer > 23) {
		UTCHoursServer = UTCHoursServer - 24;
	}
	if (UTCHoursServer < 0) {
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
	if (hh == UTCHoursServer) { //the local UTC time is similar to server's UTC time. Good!
		// we can therefore use local date as server's date
	} else if (hh == 23 && UTCHoursServer == 0) { //the server is ahead of us
		dd = dd + 1;
	} else if (hh == 0 && UTCHoursServer == 23) { //the server is falling behind
		dd = dd - 1;
	} else { //we do not tolerate bigger differences!
		_log(2, "Warning! The local time (as UTC) differs from the server time (as UTC) by more than 1 hour. Your local time is incorrect or you specified wrong timezone for your server. We can't calculate server's date.");
		return false;
	}

	//now we can construct the Date object for the server time and return formatted string
	//var sTime = yy+"/"+mm+"/"+dd+" "+hh+":"+min+":"+sec;
	var oServerDate = new Date(yy, mm, dd, UTCHoursServer, aMatch[2], aMatch[3]);
	//the created object has wrong timestamp - it was offset by local timezone offset. Bring it back
	var newtimestamp = oServerDate.getTime() - (oLocalTime.getTimezoneOffset() * 60000); //this is server time as UTC
	if (bReturnTimestamp) { //we don't need formatted string
		return newtimestamp;
	}

	newtimestamp = newtimestamp + (iTimeOffset * 3600000); //server time in the server's timezone
	var oServerDate = new Date(newtimestamp); //this is the server's time (not UTC!)
	sTime = formatDate(oServerDate.getUTCFullYear(), (oServerDate.getUTCMonth() + 1), oServerDate.getUTCDate(), oServerDate.getUTCHours(), oServerDate.getUTCMinutes(), oServerDate.getUTCSeconds());
	return sTime;

	_log(3, "<- getServerTime()");
}

/**
* @param {int}
* @return {str} Formatted date.
*/
function formatDate(yyyy, mm, dd, hh, min, sec) {
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	if (min < 10) {
		min = "0" + min;
	}
	if (sec < 10) {
		sec = "0" + sec;
	}
	return yyyy + "/" + mm + "/" + dd + " " + hh + ":" + min + ":" + sec;
}

function isInt(x) {
	var y = parseInt(x);
	if (isNaN(y)) {
		return false;
	}
	return x == y && x.toString() == y.toString();
}

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
	window[key] = getOption(key, defaultValue, "boolean");
	GM_registerMenuCommand((prefix ? prefix + ": ": "") + (window[key] ? toggleOff: toggleOn),
	function() {
		setOption(key, !window[key]);

		if (key == 'USE_SERVER_TIME' && !window[key]) {
			var iServerTimeOffset = getServerTimeOffset();
			var promptMsg = (iServerTimeOffset == false) ? "אנא הכנס את איזור הזמן שאתה נמצא בו\n אם אתם גולשים בישראל תכניסו את הספרה 2": "הסקריפט זיהה שאיזור הזמן הוא: " + iServerTimeOffset + " GMT. \nאם הנתון שגוי אנא תקן אותו, אם הוא נכון השאר את השורה ריקה ואשר\n(אם אתם גולשים בישראל אז הסקריפט אמור לזהות GMT 2)";

			var userResponse = prompt(promptMsg);
			while ((userResponse != '' && !isInt(userResponse)) || (userResponse == '' && iServerTimeOffset == false)) {
				userResponse = prompt(promptMsg);
			}
			var value = (userResponse != '') ? userResponse: iServerTimeOffset;
			setOption("SERVER_TIME_OFFSET", value);
		}

		location.reload();
	});
}

function useLocalTime() {
	GM_setValue("TTQ_USE_SERVER_TIME", false);
	bUseServerTime = false;
	GM_setValue("TTQ_SERVER_TIME_OFFSET", false);

	alert("Now you are using your local time for planning tasks.");
	location.reload();
}

function useServerTime() {
	var iServerTimeOffset = getServerTimeOffset();
	if (iServerTimeOffset == false) {
		iServerTimeOffset = prompt('אנא הכנס את איזור הזמן שאתה נמצא בו\n אם אתם גולשים בישראל תכניסו את הספרה 2": "הסקריפט זיהה שאיזור הזמן הוא: " + iServerTimeOffset + " GMT. \nאם הנתון שגוי אנא תקן אותו, אם הוא נכון השאר את השורה ריקה ואשר\n(אם אתם גולשים בישראל אז הסקריפט אמור לזהות GMT 2)');
		if (isInt(iServerTimeOffset)) {
			GM_setValue("TTQ_SERVER_TIME_OFFSET", iServerTimeOffset);
			GM_setValue("TTQ_USE_SERVER_TIME", true);
			bUseServerTime = true;
		} else {
			alert("Invalid value. You need to specify an integer.");
		}
	} else {
		GM_setValue("TTQ_USE_SERVER_TIME", true);
		bUseServerTime = true;
	}
	alert("Now you are using your local time for planning tasks.");
	location.reload();
}

function getTroopsInfo(aTroops) {
	var sTroopsInfo = "";
	for (var i = 1; i < 12; i++) {
		if (aTroops[i] > 0) {
			sTroopsInfo += aLangTroops[iMyRace][i - 1] + ": " + aTroops[i] + ", ";
		}
	}
	//trim last two characters
	sTroopsInfo = sTroopsInfo.substring(0, sTroopsInfo.length - 2);
	return sTroopsInfo;
}

function setOption(key, value) {
	var options = readCookie("TTQ_OPTIONS");
	if (options != '') options = options.split(",");
	else options = [];
	var myOption = options.indexOf(key);
	if (myOption < 0) {
		options.push(key);
		options.push(value);
	} else {
		options[myOption + 1] = value;
	}
	options.join(",");
	createCookie("TTQ_OPTIONS", options, 365);
}
/**
* @param key: name of the parameter in the cookie.
* @param defaultValue: this is returned if the parameter is not found in the cookie.
* @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
*/
function getOption(key, defaultValue, type) {
	var options = readCookie('TTQ_OPTIONS');
	options = options.split(",");
	var myOption = options.indexOf(key);
	if (myOption < 0) {
		return defaultValue;
	}
	switch (type) {
	case "boolean":
		var myOption = (options[myOption + 1] == "true") ? true: false;
		break;
	case "integer":
		var myOption = parseInt(options[myOption + 1]);
		break;
	case "string":
	default:
		var myOption = options[myOption + 1];
		break;
	}
	return myOption;
}

function t(str) {
	var index = aLangStringsMaster.indexOf(str);
	var sTranslatedStr = aLangStrings[index];
	if (sTranslatedStr) {
		return sTranslatedStr;
	} else {
		_log(3, '=> ' + index + ']' + str);
		return str;
	}
}

function $(id) {
	return document.getElementById(id);
}

function promptRace() {
	var iMyRace = getOption("RACE", false, "integer");
	var newRace = false;
	while (!isInt(newRace)) {
		var newRace = prompt("איזה גזע אתה בשרת הזה ?\n0- לרומאים\n1- לטאוטונים\n2- לגאלים\nכרגע: " + iMyRace);
		if (isInt(newRace)) {
			newRace = parseInt(newRace);
			if (newRace > -1 && newRace < 3) {
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
	while (!isInt(newHistoryLength)) {
		var newHistoryLength = prompt("כמה משימות ברצונך לשמור בפנקס ההיסטוריה ?\nהכנס 0 אם ברצונך לבטל את פנקס ההיסטוריה \nכרגע: " + iHistoryLength);
		if (isInt(newHistoryLength)) {
			newHistoryLength = parseInt(newHistoryLength);
			if (newHistoryLength > -1) {
				setOption("HISTORY_LENGTH", newHistoryLength);
				location.reload();
				break;
			} else {
				newHistoryLength = false;
			}
		}
	}
}

//by ALFik +
function promptDelay() {
	var newDelay = false;
	while (!isInt(newDelay)) {
		var newDelay = prompt("כמה דקות להוסיף למשימה במקרה של תקלה ?\nהכנס 0 אם אתה לא רוצה להוסיף כלל זמן\nכרגע: " + iDelay);
		if (isInt(newDelay)) {
			newDelay = parseInt(newDelay);
			if (newDelay > -1) {
				setOption("DELAY", newDelay);
				location.reload();
				break;
			} else {
				newDelay = false;
			}
		}
	}
}
//by ALFik -
// *************************************************
// Get Value of Input from name of Id
// *************************************************
function getValueOfInput(name) {
	var object = document.getElementsByName(name)[0];
	if (object != undefined) {
		var result = object.value;
		return result;
	} else {
		object = document.getElementsById(name)[0];
		if (object != undefined) {
			var result = object.value;
			return result;
		}
	}
	return object;
}
function getValueOfInputFromAttribute(attributeName, attributeValue) {
	var result = 'undefined';
	var object = getElementsByAttribute(document, "input", attributeName, attributeValue);
	if (object != 'undefined' && object.length > 0) {
		// On r?cup?re uniquement un objet, si plusieurs tant pis 
		result = object[0].value;
	}
	_log(3, result);
	return result;
}
// *************************************************
// Get Elements by attribute 
// *************************************************
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue) {
	var arrElements = (strTagName == "*" && document.all) ? document.all: oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined") ? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
	var oCurrent;
	var oAttribute;
	for (var i = 0; i < arrElements.length; i++) {
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute(strAttributeName);
		if (typeof oAttribute == "string" && oAttribute.length > 0) {
			if (typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))) {
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}

function onLoad() {
	_log(3, "-> onLoad()");
	_log(3, "oIntervalReference " + oIntervalReference);

	if (GM_getValue("TTQ_VERSION", 0) != sCurrentVersion) {
		performUpgrade();
	}

	makeMenuToggle("USE_SERVER_TIME", false, "השתמש בשעון השרת", "השתמש בשעון המחשב", "TTQ - in Hebrew");
	GM_registerMenuCommand("TTQ - in Hebrew: קבע את הגזע", promptRace);
	GM_registerMenuCommand("TTQ - in Hebrew: הגדרות היסטוריה", promptHistory);
	//by ALFik
	GM_registerMenuCommand("TTQ - in Hebrew: הגדרות דחייה אוטומטית", promptDelay);

	var oDate = new Date();
	setOption("LAST_REFRESH", oDate.getTime());

	if (!oIntervalReference) {
		_log(3, "setInterval()");
		oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery);
	}

	var re = /.*build\.php.*/i;
	if (re.test(window.location.href)) {
		createBuildLinks();
		createResearchLinks();
		createTrainLinks();
		createSendResourceLinks();
		createQueueLinks();
	}

	//var re = /.*a2b\.php\?(newdid=[0-9]*&)?z=.*/i;	
	var re = /.*a2b\.php/i
	if (re.test(window.location.href)) {
		createAttackLinks();
	}

	var iRace = getRace();
	if (iRace != false && (iRace != getOption("RACE", false, "integer") || getOption("SCOUT_UNIT", false, "integer") == false)) {
		switch (iRace) {
		case 0:
			//Romans
			setOption("SCOUT_UNIT", 4);
			setOption("RACE", 0);
			location.reload(); //we need to reload because the aLangTroops needs to be redefined
			break;
		case 1:
			//Teutons
			setOption("SCOUT_UNIT", 4);
			setOption("RACE", 1);
			location.reload();
			break;
		case 2:
			//Gauls
			setOption("SCOUT_UNIT", 3);
			setOption("RACE", 2);
			location.reload();
			break;
		}
	}

	var data = readCookie("TTQ_TASKS");
	if (data != '') {
		var aTasks = data.split("|");
		refreshTaskList(aTasks);
	}

	data = readCookie("TTQ_HISTORY");
	if (iHistoryLength > 0 && data != '') {
		var aTasks = trimHistory(data, iHistoryLength).split("|");
		refreshHistory(aTasks);
	}

	_log(3, "<- onLoad()");
}

// --- Main Code Block ---
_log(0, "TTQ started");

window.addEventListener('load', onLoad, false);

// Auto Update http://userscripts.org/scripts/show/38017
aaus_38017 = {
	i: '47254',
	d: 2,
	n: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
	v: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1],
	t: new Date().getTime() | 0,
	ca: function(r) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://userscripts.org/scripts/source/' + this.i + '.meta.js',
			headers: {
				'User-agent': window.navigator.userAgent,
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(x) {
				aaus_38017.co(x, r)
			}
		})
	},
	co: function(x, r) {
		this.xv = /\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);
		this.xn = /\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);
		if (this.xv && this.xn[1] == this.n) {
			this.xv = this.xv[1];
			this.xn = this.xn[1];
		} else {
			if (x.responseText.match('Uh-oh! The page could not be found!') || this.xn[1] != this.n) GM_setValue('updated', 'off');
			return false;
		}
		if (this.xv != this.v && confirm('גרסא חדשה של הסקריפט Travian Task Queue - in Hebrew זמינה להורדה. האם ברצונך לעדכן ?')) {
			GM_setValue('updated', this.t);
			GM_openInTab('http://userscripts.org/scripts/source/' + this.i + '.user.js')
		} else if (this.xv && this.xv != this.v) {
			if (confirm('האם ברצונך לבטל בדיקת עידכונים לסקריפט זה ?')) {
				GM_setValue('updated', 'off');
				GM_registerMenuCommand("TTQ - in Hebrew: אפשר עידכונים אוטומטיים",
				function() {
					GM_setValue('updated', new Date().getTime() | 0);
					aaus_38017.ca('return')
				});
				alert('ניתן לחדש את בדיקת  העידכונים מהתפריט של GreasMonkey תת תפריט- פקודות סקריפט')
			} else {
				GM_setValue('updated', this.t)
			}
		} else {
			if (r) alert('אין עדכונים עבור ' + this.n);
			GM_setValue('updated', this.t)
		}
	},
	ch: function() {
		if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.t);
		if (GM_getValue('updated', 0) != 'off' && +this.t > +GM_getValue('updated', 0) + 86400000 * this.d) {
			this.ca()
		} else if (GM_getValue('updated', 0) == 'off') {
			GM_registerMenuCommand("TTQ - in Hebrew: אפשר בדיקת עידכונים אוטומטית",
			function() {
				GM_setValue('updated', new Date().getTime() | 0);
				aaus_38017.ca(true)
			})
		} else {
			GM_registerMenuCommand("TTQ - in Hebrew: חפש עידכון לסקריפט",
			function() {
				GM_setValue('updated', new Date().getTime() | 0);
				aaus_38017.ca(true)
			})
		}
	}
};
if (self.location == top.location && GM_xmlhttpRequest) aaus_38017.ch();