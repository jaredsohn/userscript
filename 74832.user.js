// Copyright (c) 2010-2013, RxR

// ==UserScript==
// @name	KingsAge Mason
// @namespace	RxR KingsAge
// @description	It's not fair to pay more for building. Let finish old system and begin new era of free building. :D
//
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_deleteValue
// @grant	GM_log
//
// @include	http://s*.kingsage.*/*s=build_main*
//
// Auto-update function. Many thanks, Buzzy!
// @require	http://buzzy.260mb.com/AutoUpdater.js
//
// @version	0.9.10
//
// @history	0.9.10	19.03.2013 modified way of finding of free settlers because of changes in v.2.2.8 (thanks to chey for noticing me); improved French translation (thanks to tititou36)
// @history	0.9.09	02.11.2012 added checking of "overdue" and consequently refreshing the page; fixed rare case of "Conditions have not been fulfilled"
// @history	0.9.08	06.08.2012 added feature to list through settlements using left and right cursor keys
// @history	0.9.07	13.02.2012 fixed searching for "Level" string (previous way of searching failed because changes in v.2.1.0)
// @history	0.9.06	26.12.2011 fixed time processing "Completion" column; all DOM-dependent operations were moved inside main function
// @history	0.9.05	20.10.2011 added option to shift browser window up to hide unnecessary information
// @history	0.9.04	02.10.2011 refreshing was canceled if there's only memorial in building queue; "Show all" button was moved to right
// @history	0.9.03	10.09.2011 redesigning of options page: "Page refresh interval" isn't more depending on "Don't refresh the page if building queue is full" option, options page is bound to specific settlement, added link "Check for update"
// @history	0.9.02	06.09.2011 fixed two serious bugs for classic style
// @history	0.9.01	04.09.2011 "cosmetical" touch - better vertical alignment of "man at work" picture
// @history	0.99	26.08.2011 added option to don't refresh the page if building queue is full
// @history	0.98	30.06.2011 added notification on warehouse's upgrades even if KA Mason queue wasn't changed
// @history	0.97	23.06.2011 fixed searching for place for construction table
// @history	0.96	18.06.2011 only one small "touch-up" - link to userscripts.org was added to version number
// @history	0.95	26.05.2011 added Russian translation (thanks to Sergeylo); some minor corrections
// @history	0.94	23.05.2011 added Italian translation (thanks to melo983)
// @history	0.93	16.05.2011 fixed bug causing crash of script if max level of building should be constructed
// @history	0.92	11.05.2011 added option to hide maximum level buildings
// @history	0.91	21.04.2011 added notification (exclamation mark in page's title) if KA Mason queue has been changed
// @history	0.90	05.04.2011 added new feature: browsing only through settlements which are under construction using KA Mason (thanks to chicomacedo for suggestion)
// @history	0.87	03.04.2011 fixed handling of time replacement
// @history	0.86	31.03.2011 fixed building times (all times were shortened by 36 seconds)
// @history	0.85	24.03.2011 added option to replace server time by local computer time
// @history	0.84	05.02.2011 amended German translation (thanks to Andreas)
// @history	0.83	16.01.2011 better handling of demolitions
// @history	0.82	09.11.2010 added option to automatically add Miller to the KA Mason queue, if settlers are needed
// @history	0.81	31.10.2010 added option to highlight row under cursor in KA Mason queue
// @history	0.80	21.10.2010 fixed one stupid error; my apologies to all afflicted (thanks to Jonathan aka Moosemuffins for reporting)
// @history	0.79	11.10.2010 added option to limit Premium building queue
// @history	0.78	03.10.2010 fixed calculating of duration of building's construction
// @history	0.77	02.10.2010 added "Cancel all" button (thanks to scriptkiddie for suggestion); amended German translation (thanks to scriptkiddie)
// @history	0.76	25.09.2010 new feature - removing of "awesome" Premium buttons added in v.1.0.3
// @history	0.75	23.09.2010 script now finds out game's version and then will test Premium Account accordingly to version of game
// @history	0.74	22.09.2010 changed a way of Premium Account's detecting (compeled by changes in v.1.0.3)
// @history	0.73	02.09.2010 changed a way of replacement "tomorrow" by "+1"
// @history	0.72	30.08.2010 fixed bug similar to bug fixed by v.0.68; added French translation (thanks to azukae09); changed format of missing resources greater than 1 million
// @history	0.71	24.08.2010 added "Show all" button (provided same functionality as "Show all buildings in list of buildings" option)
// @history	0.70	23.08.2010 fixed calculating of missing settlers for automatically built Miller
// @history	0.69	19.08.2010 added Hungarian translation (thanks to Dome)
// @history	0.68	18.08.2010 fixed bug causing improper transformation of time in "Completion" column if user forced other language than original
// @history	0.67	15.08.2010 fixed bug enabling to add automatically built building more than once and German translation was corrected
// @history	0.66	12.08.2010 added German translation (thanks to Andreas aka seandre@gmx.de)
// @history	0.65	11.08.2010 "Build all" button is added only if there's something to upgrade
// @history	0.64	07.08.2010 fixed placing of options' formfield
// @history	0.63	07.08.2010 added option display "+1" instead of "tomorrow"
// @history	0.62	06.08.2010 added language selection
// @history	0.61	06.08.2010 fixed bug causing messy displaying of construction queue, if no building waits in KA queue; alternative detection of current village ID, if URL parameter "village" is empty
// @history	0.60	04.08.2010 added ability to set some options
// @history	0.54	03.08.2010 fixed "Build all" feature for modern styles (thanks to Prophecy for reporting)
// @history	0.53	02.08.2010 added option to display day of completion time as number of days
// @history	0.52	27.07.2010 "cosmetical" improvement - better alignment of missing resources
// @history	0.51	26.07.2010 fixed countdown of the first construction; added Dutch translation (thanks to Prophecy)
// @history	0.50	25.07.2010 indication of missing workers was slightly changed - number of missing workers is in gray if constructed Miller'll cover this number
// @history	0.49	25.07.2010 workers' amount includes increasing caused by Miller's construction; calculating of building time respects currently built Castles
// @history	0.48	20.07.2010 added "Conditions have not been fulfilled" notice to building queue
// @history	0.47	18.07.2010 added calculating of completion time
// @history	0.46	16.07.2010 added "Build all" button (thanks to Neomaster20 for suggestion)
// @history	0.45	04.07.2010 fixed problem with diacritical characters (I've been testing new editor which doesn't support UTF-8)
// @history	0.44	02.07.2010 fixed calculating of missed resources for automatically built building
// @history	0.43	25.06.2010 fixed bug restraining correctly remove automatically built building from queue if it reached maximum level
// @history	0.42	23.06.2010 fixed bug in counting of missing resources
// @history	0.41	17.06.2010 missed resources are shown in waiting queue
// @history	0.40	13.06.2010 fixed function premiumAccount() and greatly improved support of modern styles
// @history	0.39	08.06.2010 changed way of refreshing the page - there was a problem suddenly with reloading a page (both manually and using function reload())
// @history	0.38	06.06.2010 fixed bug causing crash in modern styles (thanks to SURbyte for reporting) and enhanced support for modern styles
// @history	0.37	31.05.2010 added Spanish translation (thanks to SURbyte) and partial Romanian translation (thanks to danutz)
// @history	0.36	30.05.2010 algorithm is language-independent now (e.g. no testing on strings in searching for specific node), added Slovak translation (thanks to RxR :D)
// @history	0.35	27.05.2010 language system was rewrited in way inspired by PhasmaExMachina, added Polish translation (thanks to szczeciu)
// @history	0.34	27.05.2010 buildings which requirements aren't met are added to the list of buildings ASAP
// @history	0.33	26.05.2010 fixed bug in language's recognizing
// @history	0.32	24.05.2010 fixed bug restraining correctly autoupdate (thanks to SURbyte for reporting)
// @history	0.31	22.05.2010 fixed bug restraining correctly remove automatically built building from queue if it reached maximum level
// @history	0.30	22.05.2010 fixed some bugs and added new feature: autobuilding
// @history	0.21	21.05.2010 building time is now correctly re-calculated in regard to current castle's level
// @history	0.20	20.05.2010 many, many, many improvements: support for buildings which requirements aren't met, dis/en-abling "overtaking" in queue, showing correct time, auto-refreshing, and more ...
// @history	0.10	16.05.2010 fixed two "cosmetical" bugs
// @history	0.09	10.05.2010 added support for changing of order in front
// @history	0.08	09.05.2010 many improvements and bug corrections
// @history	0.07	06.05.2010 testing of resources' availability
// @history	0.06	05.05.2010 implemented waitForReady (thanks to GIJoe)
// @history	0.05	30.04.2010 code was rewrited using objects for better manipulation
// @history	0.04	29.04.2010 fixed bug relating to Memorial
// @history	0.03	25.04.2010 added support for Memorial (only Classic Style) and auto-update function
// @history	0.02	23.04.2010 added array of images - needed for modern styles
// @history	0.01	20.04.2010 basic algorithm
//
// ==/UserScript==

const scriptID = 74832;
const scriptVersion = "0.9.10";

autoUpdate(scriptID, scriptVersion);				// Buzzy's autoupdate

if (!GM_getValue || !GM_setValue || !GM_deleteValue) return;	// opps, my precious functions're missing

// DEFINITIONS OF BUILDINGS & GLOBAL VARIABLES ****************************************************************************

const SPRTR = "&";
const SPRTRx = "=";
const settlementSPRTR = "|";					// used in getSettInfo () - separates sett's attributes
const exclamationMark = "!";
const noExclamation = "-";
const noSettlement = -1;

const cLOWER = -1;						// constants for versions' comparison
const cHIGHER = 1;
const cEQUAL  = 0;

// global settings MUST be declared here (because they're GLOBAL ;) ) but MUST be initialized and readed inside main function (because of getVillageID function)
var globalOptions;

function tOptions (_L, _S) {					// _L = label for get/set, _S = items' separator
	const fOPTION_PAGE	= "O";
	const fALL_LINKS	= "L";
	const fALL_BUILDINGS	= "B";
	const fNUMBER_OF_DAYS	= "D";
	const fINCREMENTALY	= "I";
	const fNOT_TOMORROW	= "T";
	const fREMOVE_PREMIUM	= "P";
	const fLIMIT_PREMIUM	= "M";
	const fHIGHLIGHT_ROW	= "H";
	const fADD_MILLER	= "A";
	const fREPLACE_TIME	= "R";
	const fSELECT_UCS	= "S";
	const fCHANGE_SIGNAL	= "C";
	const fHIDE_MAX_LEVEL	= "D";
	const fDONT_REFRESH	= "N";
	const fSHIFT_WINDOW	= "W";
	const fNOTHING		= "-";
	const DEFAULT_DELAY	= 5;				// default is 5 minutes
	const NO_LIMIT		= 0;				// 0 - no limit

	this.label = trimStr(_L);
	this.itemsSeparator = _S;
	this.optionVillage = noSettlement;			// contains settlement's ID for which is displayed Options page
	this.curVillage = getVillageID();

	this.showAllLinksInPA = true;				// if false, only building which requirements aren't fulfilled will be allowed to put to the KA queue for Premium Account
	this.showAllBuildings = false;				// if true, all buildings will be added to list of buildings
	this.showNumberOfDays = true;				// if false, exact date of finish time'll be displayed; if true, number of remained days'll be displayed
	this.showMissingResourcesIncrementaly = true;		// if true, missing resources will be summarized
	this.delayForRefresh = DEFAULT_DELAY;			// delay for refresh
	this.forcedLanguage = fNOTHING;				// acronym of language (or fNOTHING for automatic)
	this.showNumberInsteadOfTomorrow = false;		// if showNumberOfDays is true, this option determines if text "tomorrow" is diplayed or "+1"
	this.removeAwesomePremiumButtons = false;		// if true, removes all Premium buttons
	this.limitPremiumQueue = NO_LIMIT;
	this.highlightRow = true;				// if true, highlight row under cursor in KA Mason queue
	this.automaticallyAddMiller = false;			// if true, Miller'll be automatically added to queue if settlers are needed
	this.replaceServerTime = false;				// if true, local time will be used instead server's time
	this.selectUCS = false;					// if true, we'll move through "Under Construction" settlements
	this.changeNotification = false;			// if true, exclamation mark in page's title'll notify about changes in KA Mason queue
	this.hideMaxLevelBuilding = false;			// if true, hide buildings of maximum level
	this.dontRefreshOnFullQueue = false;			// if true, don't refresh the page if building queue is full
	this.shiftWindow = true;				// if true, window'll be shifted up to hide unnecessary information

	this.readOptions = function () {
		var options = GM_getValue(this.label, "");
		if (options == "") return;
		options = options.split(this.itemsSeparator);
		var oLength = options[0].length;

		this.showAllLinksInPA				= options[0].charAt(1)	== fALL_LINKS;
		this.showAllBuildings				= options[0].charAt(2)	== fALL_BUILDINGS;
		this.showNumberOfDays				= options[0].charAt(3)	== fNUMBER_OF_DAYS;
		this.showMissingResourcesIncrementaly		= options[0].charAt(4)	== fINCREMENTALY;
		this.showNumberInsteadOfTomorrow		= options[0].charAt(5)	== fNOT_TOMORROW;
		this.removeAwesomePremiumButtons		= options[0].charAt(6)	== fREMOVE_PREMIUM;

		if (oLength > 15) oLength = 15;			// to make following switch idiot-proof
		switch (oLength) {
			case 15: this.shiftWindow		= options[0].charAt(14)	== fSHIFT_WINDOW;
			case 14: this.dontRefreshOnFullQueue	= options[0].charAt(13)	== fDONT_REFRESH;
			case 13: this.hideMaxLevelBuilding	= options[0].charAt(12)	== fHIDE_MAX_LEVEL;
			case 12: this.changeNotification	= options[0].charAt(11)	== fCHANGE_SIGNAL;
			case 11: this.selectUCS			= options[0].charAt(10)	== fSELECT_UCS;
			case 10: this.replaceServerTime		= options[0].charAt(9)	== fREPLACE_TIME;
			case  9: this.automaticallyAddMiller	= options[0].charAt(8)	== fADD_MILLER;
			case  8: this.highlightRow		= options[0].charAt(7)	== fHIGHLIGHT_ROW;
				break;
			default:
		}

		if ((options.length > 1) && (options[1] != "")) this.delayForRefresh = options[1];
		if (options.length > 2) this.forcedLanguage = options[2];
		if (options.length > 3) this.limitPremiumQueue = options[3];
		if (options.length > 4) this.optionVillage = parseInt(options[4]);
	}
	this.saveOptions = function () {
//		var options = 	((this.optionVillage)?fOPTION_PAGE:fNOTHING) +
		var options = 	fNOTHING +
				((this.showAllLinksInPA)?fALL_LINKS:fNOTHING) +
				((this.showAllBuildings)?fALL_BUILDINGS:fNOTHING) +
				((this.showNumberOfDays)?fNUMBER_OF_DAYS:fNOTHING) +
				((this.showMissingResourcesIncrementaly)?fINCREMENTALY:fNOTHING) +
				((this.showNumberInsteadOfTomorrow)?fNOT_TOMORROW:fNOTHING) +
				((this.removeAwesomePremiumButtons)?fREMOVE_PREMIUM:fNOTHING) +
				((this.highlightRow)?fHIGHLIGHT_ROW:fNOTHING) +
				((this.automaticallyAddMiller)?fADD_MILLER:fNOTHING) +
				((this.replaceServerTime)?fREPLACE_TIME:fNOTHING) +
				((this.selectUCS)?fSELECT_UCS:fNOTHING) +
				((this.changeNotification)?fCHANGE_SIGNAL:fNOTHING) +
				((this.hideMaxLevelBuilding)?fHIDE_MAX_LEVEL:fNOTHING) +
				((this.dontRefreshOnFullQueue)?fDONT_REFRESH:fNOTHING) +
				((this.shiftWindow)?fSHIFT_WINDOW:fNOTHING);
		options += this.itemsSeparator + this.delayForRefresh +
			   this.itemsSeparator + this.forcedLanguage +
			   this.itemsSeparator + this.limitPremiumQueue +
			   this.itemsSeparator + this.optionVillage.toString();
		GM_setValue(this.label, options);		// write options
	}
	this.getDelayForRefresh = function () {			// randomize "delayForRefresh" in interval +/- 30 seconds; returns milliseconds
		return (this.delayForRefresh*60*1000 + Math.round(30*1000*(2*Math.random()-1)));
	}
	this.forceLanguage = function (lang) {			// lang: acronym of language
		if (lang == "") lang = fNOTHING;
		this.forcedLanguage = lang;
	}
	this.automaticLanguage = function () {
		return (this.forcedLanguage == fNOTHING);
	}
	this.displayNumberNotTomorrow = function () {
		return (this.showNumberOfDays && this.showNumberInsteadOfTomorrow);
	}
	this.optionPage = function () {
		return (this.optionVillage == this.curVillage);
	}
}

var bCastle	  = "main";
var bQuarry	  = "stone";
var bSawmill	  = "wood";
var bOreMine	  = "iron";
var bWarehouse	  = "storage";
var bMiller	  = "farm";
var bHideout	  = "hide";
var bBarracks	  = "barracks";
var bTownWall	  = "wall";
var bMarket	  = "market";
var bDonkeyStable = "stable";
var bAlchemist	  = "garage";
var bResidence	  = "snob";
var bGoldsmith	  = "smith";
var bMemorial	  = "statue";

var buildingsIdx = new Array();					// array of buildings' "indexes"
buildingsIdx = [bCastle, bQuarry, bSawmill, bOreMine, bWarehouse, bMiller, bHideout, bBarracks, bTownWall, bMarket, bDonkeyStable, bAlchemist, bResidence, bGoldsmith, bMemorial];
var buildingsNumber = buildingsIdx.length;			// there're 15 buildings in settlement

var structure = new Object();					// structure object'll hold all information about buildings

structure[bCastle] = {
	"name":			"Castle",
	"maxLevel":		50,
	"curLevel":		-1,				// 0 if building is in list but it wasn't built yet
	"limit": {"stone":	[85, 99, 116, 136, 159, 186, 218, 255, 298, 349, 409, 478, 559, 654, 766, 896, 1048, 1226, 1435, 1679, 1964, 2298, 2688, 3146, 3680, 4306, 5038, 5894, 6896, 8069, 9440, 11045, 12923, 15120, 17690, 20698, 24216, 28333, 33150, 38785, 45379, 53093, 62119, 72679, 85035, 99491, 116404, 136193, 159346, 186434],
		  "wood":	[70, 82, 95, 111, 129, 150, 175, 204, 238, 277, 322, 376, 438, 510, 594, 692, 806, 939, 1094, 1274, 1485, 1730, 2015, 2347, 2735, 3186, 3712, 4324, 5038, 5869, 6837, 7965, 9280, 10811, 12594, 14673, 17094, 19914, 23200, 27028, 31487, 36683, 42735, 49787, 58001, 67572, 78721, 91710, 106842, 124471],
		  "iron":	[65, 76, 88, 103, 120, 139, 163, 189, 221, 257, 299, 349, 406, 473, 551, 642, 748, 872, 1016, 1183, 1379, 1606, 1871, 2180, 2539, 2958, 3447, 4015, 4678, 5450, 6349, 7396, 8617, 10039, 11695, 13625, 15873, 18492, 21543, 25097, 29238, 34062, 39683, 46230, 53858, 62745, 73098, 85159, 99211, 115580],
		  "workers":	[2, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 3, 2, 3, 3, 4, 4, 5, 5, 5, 7, 7, 8, 9, 10, 12, 12, 14, 16, 18, 20, 22, 25, 28, 32, 35, 39, 44, 50, 55] },
	"buildTime":		["0:00:00", "0:00:06", "0:00:13", "0:00:20", "0:00:29", "0:00:40", "0:00:52", "0:01:06", "0:01:22", "0:01:41", "0:02:03", "0:02:28", "0:02:58", "0:03:32", "0:04:12", "0:04:58", "0:05:51", "0:06:53", "0:08:05", "0:09:28", "0:11:05", "0:12:57", "0:15:07", "0:17:38", "0:20:33", "0:23:56", "0:27:51", "0:32:24", "0:37:41", "0:43:49", "0:50:55", "0:59:09", "1:08:43", "1:19:48", "1:32:40", "1:47:35", "2:04:54", "2:24:59", "2:48:16", "3:15:17", "3:46:38", "4:22:59", "5:05:10", "5:54:05", "6:50:51", "7:56:40", "9:13:02", "10:41:36", "12:24:22", "14:23:33"],
	"special": {"name":	"Time factor",
		    "value":	[100.0000, 96.2023, 92.5489, 89.0341, 85.6529, 82.4001, 79.2708, 76.2603, 73.3642, 70.5781, 67.8977, 65.3192, 62.8386, 60.4522, 58.1564, 55.9478, 53.8231, 51.7791, 49.8126, 47.9209, 46.1010, 44.3503, 42.6660, 41.0457, 39.4869, 37.9873, 36.5447, 35.1568, 33.8217, 32.5372, 31.3016, 30.1128, 28.9692, 27.8691, 26.8107, 25.7925, 24.8130, 23.8707, 22.9641, 22.0920, 21.2531, 20.4459, 19.6695, 18.9225, 18.2039, 17.5125, 16.8475, 16.2077, 15.5921, 15.0000] },
	"littleImg":		"/img/buildings/main.png",
	"smallImg":		"/img/buildings_small/main3.png",
	"buildParam":		bCastle,
	"indexToTexty":		"buildingName.castle",
}

structure[bQuarry] = {
	"name":			"Quarry",
	"maxLevel": 		50,
	"curLevel":		-1,
	"limit": {"stone":	[40, 47, 55, 64, 75, 88, 103, 120, 140, 164, 192, 225, 263, 308, 360, 422, 493, 577, 675, 790, 924, 1081, 1265, 1480, 1732, 2026, 2371, 2774, 3245, 3797, 4443, 5198, 6081, 7115, 8325, 9740, 11396, 13333, 15600, 18252, 21355, 24985, 29233, 34202, 40016, 46819, 54778, 64091, 74986, 87734],
		  "wood":	[30, 35, 41, 47, 55, 64, 75, 87, 102, 119, 138, 161, 188, 218, 254, 296, 345, 402, 469, 546, 636, 741, 864, 1006, 1172, 1365, 1591, 1853, 2159, 2515, 2930, 3414, 3977, 4633, 5398, 6288, 7326, 8535, 9943, 11583, 13495, 15721, 18315, 21337, 24858, 28959, 33738, 39304, 45789, 53345],
		  "iron":	[55, 64, 75, 87, 101, 118, 138, 160, 187, 217, 253, 295, 344, 400, 467, 544, 633, 738, 859, 1001, 1166, 1359, 1583, 1844, 2149, 2503, 2916, 3398, 3958, 4611, 5372, 6258, 7291, 8494, 9896, 11528, 13431, 15647, 18228, 21236, 24740, 28822, 33578, 39118, 45573, 53092, 61852, 72058, 83947, 97799],
		  "workers":	[5, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 6, 6, 6, 7, 8, 9, 10, 10, 12, 13, 14, 15, 17, 19, 20, 23, 25, 27, 30, 33, 37, 40, 44, 49] },
	"buildTime":		["0:00:09", "0:00:16", "0:00:24", "0:00:32", "0:00:43", "0:00:55", "0:01:08", "0:01:24", "0:01:42", "0:02:02", "0:02:26", "0:02:53", "0:03:25", "0:04:01", "0:04:42", "0:05:30", "0:06:25", "0:07:28", "0:08:41", "0:10:04", "0:11:40", "0:13:31", "0:15:38", "0:18:04", "0:20:52", "0:24:05", "0:27:48", "0:32:03", "0:36:57", "0:42:35", "0:49:04", "0:56:30", "1:05:04", "1:14:55", "1:26:15", "1:39:17", "1:54:16", "2:11:30", "2:31:18", "2:54:06", "3:20:18", "3:50:26", "4:25:05", "5:04:56", "5:50:46", "6:43:29", "7:44:05", "8:53:48", "10:13:57", "11:46:08"],
	"special": {"name":	"Production per hour",
		    "value":	[30, 33, 37, 42, 46, 52, 58, 64, 72, 80, 89, 99, 111, 123, 138, 153, 171, 191, 213, 237, 264, 295, 329, 366, 408, 455, 508, 566, 631, 704, 785, 875, 975, 1087, 1212, 1352, 1507, 1680, 1873, 2089, 2329, 2597, 2895, 3228, 3599, 4012, 4473, 4988, 5561, 6200] },
	"littleImg":		"/img/buildings/stone.png",
	"smallImg":		"/img/buildings_small/stone3.png",
	"buildParam":		bQuarry,
	"indexToTexty":		"buildingName.quarry",
}

structure[bSawmill] = {
	"name":			"Sawmill",
	"maxLevel": 		50,
	"curLevel":		-1,
	"limit": {"stone":	[55, 64, 75, 88, 103, 121, 141, 165, 193, 226, 264, 309, 362, 423, 495, 580, 678, 793, 928, 1086, 1271, 1487, 1740, 2035, 2381, 2786, 3260, 3814, 4462, 5221, 6109, 7147, 8362, 9784, 11447, 13393, 15669, 18333, 21450, 25096, 29363, 34354, 40195, 47028, 55023, 64376, 75320, 88125, 103106, 120634],
		  "wood":	[30, 35, 41, 47, 55, 64, 75, 87, 102, 119, 138, 161, 188, 218, 254, 296, 345, 402, 469, 546, 636, 741, 864, 1006, 1172, 1365, 1591, 1853, 2159, 2515, 2930, 3414, 3977, 4633, 5398, 6288, 7326, 8535, 9943, 11583, 13495, 15721, 18315, 21337, 24858, 28959, 33738, 39304, 45789, 53345],
		  "iron":	[40, 47, 54, 63, 74, 86, 100, 117, 136, 158, 184, 215, 250, 291, 339, 395, 461, 537, 625, 728, 848, 988, 1151, 1341, 1563, 1821, 2121, 2471, 2879, 3354, 3907, 4552, 5303, 6178, 7197, 8384, 9768, 11379, 13257, 15444, 17993, 20962, 24420, 28450, 33144, 38612, 44983, 52406, 61053, 71126],
		  "workers":	[5, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 6, 6, 6, 7, 8, 9, 10, 10, 12, 13, 14, 15, 17, 19, 20, 23, 25, 27, 30, 33, 37, 40, 44, 49] },
	"buildTime":		["0:00:09", "0:00:16", "0:00:24", "0:00:32", "0:00:43", "0:00:55", "0:01:08", "0:01:24", "0:01:42", "0:02:02", "0:02:26", "0:02:53", "0:03:25", "0:04:01", "0:04:42", "0:05:30", "0:06:25", "0:07:28", "0:08:41", "0:10:04", "0:11:40", "0:13:31", "0:15:38", "0:18:04", "0:20:52", "0:24:05", "0:27:48", "0:32:03", "0:36:57", "0:42:35", "0:49:04", "0:56:30", "1:05:04", "1:14:55", "1:26:15", "1:39:17", "1:54:16", "2:11:30", "2:31:18", "2:54:06", "3:20:18", "3:50:26", "4:25:05", "5:04:56", "5:50:46", "6:43:29", "7:44:05", "8:53:48", "10:13:57", "11:46:08"],
	"special": {"name":	"Production per hour",
		    "value":	[30, 33, 37, 42, 46, 52, 58, 64, 72, 80, 89, 99, 111, 123, 138, 153, 171, 191, 213, 237, 264, 295, 329, 366, 408, 455, 508, 566, 631, 704, 785, 875, 975, 1087, 1212, 1352, 1507, 1680, 1873, 2089, 2329, 2597, 2895, 3228, 3599, 4012, 4473, 4988, 5561, 6200] },
	"littleImg":		"/img/buildings/wood.png",
	"smallImg":		"/img/buildings_small/wood3.png",
	"buildParam":		bSawmill,
	"indexToTexty":		"buildingName.sawmill",
}

structure[bOreMine] = {
	"name":			"Ore Mine",
	"maxLevel": 		50,
	"curLevel":		-1,
	"limit": {"stone":	[55, 64, 75, 88, 103, 121, 141, 165, 193, 226, 264, 309, 362, 423, 495, 580, 678, 793, 928, 1086, 1271, 1487, 1740, 2035, 2381, 2786, 3260, 3814, 4462, 5221, 6109, 7147, 8362, 9784, 11447, 13393, 15669, 18333, 21450, 25096, 29363, 34354, 40195, 47028, 55023, 64376, 75320, 88125, 103106, 120634],
		  "wood":	[40, 47, 54, 63, 74, 86, 100, 117, 136, 158, 184, 215, 250, 291, 339, 395, 461, 537, 625, 728, 848, 988, 1151, 1341, 1563, 1821, 2121, 2471, 2879, 3354, 3907, 4552, 5303, 6178, 7197, 8384, 9768, 11379, 13257, 15444, 17993, 20962, 24420, 28450, 33144, 38612, 44983, 52406, 61053, 71126],
		  "iron":	[30, 35, 41, 47, 55, 64, 75, 87, 102, 119, 138, 161, 188, 218, 254, 296, 345, 402, 469, 546, 636, 741, 864, 1006, 1172, 1365, 1591, 1853, 2159, 2515, 2930, 3414, 3977, 4633, 5398, 6288, 7326, 8535, 9943, 11583, 13495, 15721, 18315, 21337, 24858, 28959, 33738, 39304, 45789, 53345],
		  "workers":	[5, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 6, 6, 6, 7, 8, 9, 10, 10, 12, 13, 14, 15, 17, 19, 20, 23, 25, 27, 30, 33, 37, 40, 44, 49] },
	"buildTime":		["0:00:09", "0:00:16", "0:00:24", "0:00:32", "0:00:43", "0:00:55", "0:01:08", "0:01:24", "0:01:42", "0:02:02", "0:02:26", "0:02:53", "0:03:25", "0:04:01", "0:04:42", "0:05:30", "0:06:25", "0:07:28", "0:08:41", "0:10:04", "0:11:40", "0:13:31", "0:15:38", "0:18:04", "0:20:52", "0:24:05", "0:27:48", "0:32:03", "0:36:57", "0:42:35", "0:49:04", "0:56:30", "1:05:04", "1:14:55", "1:26:15", "1:39:17", "1:54:16", "2:11:30", "2:31:18", "2:54:06", "3:20:18", "3:50:26", "4:25:05", "5:04:56", "5:50:46", "6:43:29", "7:44:05", "8:53:48", "10:13:57", "11:46:08"],
	"special": {"name":	"Production per hour",
		    "value":	[30, 33, 37, 42, 46, 52, 58, 64, 72, 80, 89, 99, 111, 123, 138, 153, 171, 191, 213, 237, 264, 295, 329, 366, 408, 455, 508, 566, 631, 704, 785, 875, 975, 1087, 1212, 1352, 1507, 1680, 1873, 2089, 2329, 2597, 2895, 3228, 3599, 4012, 4473, 4988, 5561, 6200] },
	"littleImg":		"/img/buildings/iron.png",
	"smallImg":		"/img/buildings_small/iron3.png",
	"buildParam":		bOreMine,
	"indexToTexty":		"buildingName.oreMine",
}

structure[bWarehouse] = {
	"name":			"Warehouse",
	"maxLevel": 		50,
	"curLevel":		-1,
	"limit": {"stone":	[43, 50, 59, 69, 81, 94, 110, 129, 151, 177, 207, 242, 283, 331, 387, 453, 530, 620, 726, 849, 994, 1162, 1360, 1591, 1862, 2178, 2549, 2982, 3489, 4082, 4776, 5588, 6538, 7649, 8949, 10471, 12251, 14333, 16770, 19621, 22956, 26859, 31425, 36767, 43018, 50331, 58887, 68898, 80610, 94314],
		  "wood":	[40, 47, 54, 63, 74, 86, 100, 117, 136, 158, 184, 215, 250, 291, 339, 395, 461, 537, 625, 728, 848, 988, 1151, 1341, 1563, 1821, 2121, 2471, 2879, 3354, 3907, 4552, 5303, 6178, 7197, 8384, 9768, 11379, 13257, 15444, 17993, 20962, 24420, 28450, 33144, 38612, 44983, 52406, 61053, 71126],
		  "iron":	[35, 41, 48, 55, 64, 75, 88, 102, 119, 138, 161, 188, 219, 255, 297, 346, 403, 469, 547, 637, 742, 865, 1007, 1174, 1367, 1593, 1856, 2162, 2519, 2934, 3419, 3983, 4640, 5405, 6297, 7336, 8547, 9957, 11600, 13514, 15744, 18341, 21368, 24893, 29001, 33786, 39361, 45855, 53421, 62236],
		  "workers":	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1] },
	"buildTime":		["0:01:10", "0:01:22", "0:01:36", "0:01:51", "0:02:09", "0:02:29", "0:02:51", "0:03:16", "0:03:44", "0:04:15", "0:04:50", "0:05:29", "0:06:13", "0:07:02", "0:07:57", "0:08:59", "0:10:08", "0:11:25", "0:12:52", "0:14:28", "0:16:17", "0:18:18", "0:20:34", "0:23:07", "0:25:58", "0:29:09", "0:32:43", "0:36:43", "0:41:12", "0:46:13", "0:51:50", "0:58:07", "1:05:10", "1:13:04", "1:21:54", "1:31:48", "1:42:54", "1:55:18", "2:09:13", "2:24:48", "2:42:14", "3:01:47", "3:23:40", "3:48:11", "4:15:38", "4:46:23", "5:20:49", "5:59:23", "6:42:35", "7:30:58"],
	"special": {"name":	"Capacity",
		    "value":	[1000, 1150, 1323, 1522, 1750, 2013, 2315, 2663, 3063, 3523, 4052, 4661, 5361, 6166, 7092, 8157, 9382, 10792, 12412, 14277, 16421, 18887, 21724, 24987, 28739, 33056, 38020, 43731, 50299, 57853, 66542, 76536, 88031, 101252, 116460, 133951, 154069, 177209, 203824, 234436, 269646, 310145, 356726, 410303, 471926, 542805, 624330, 718098, 825950, 950000] },
	"littleImg":		"/img/buildings/storage.png",
	"smallImg":		"/img/buildings_small/storage3.png",
	"buildParam":		bWarehouse,
	"indexToTexty":		"buildingName.warehouse",
}

structure[bMiller] = {
	"name":			"Miller",
	"maxLevel": 		50,
	"curLevel":		-1,
	"limit": {"stone":	[65, 76, 89, 104, 122, 143, 167, 195, 228, 267, 312, 366, 428, 500, 585, 685, 801, 938, 1097, 1284, 1502, 1757, 2056, 2405, 2814, 3293, 3853, 4507, 5274, 6170, 7219, 8446, 9882, 11562, 13528, 15828, 18518, 21667, 25350, 29659, 34701, 40601, 47503, 55578, 65027, 76081, 89015, 104148, 121853, 142568],
		  "wood":	[50, 58, 68, 79, 92, 107, 125, 146, 170, 198, 230, 268, 313, 364, 424, 494, 576, 671, 781, 910, 1060, 1235, 1439, 1677, 1953, 2276, 2651, 3089, 3598, 4192, 4884, 5689, 6628, 7722, 8996, 10480, 12210, 14224, 16571, 19306, 22491, 26202, 30525, 35562, 41430, 48265, 56229, 65507, 76316, 88908],
		  "iron":	[50, 58, 67, 78, 91, 105, 122, 141, 164, 190, 221, 256, 297, 344, 399, 463, 537, 623, 723, 839, 973, 1129, 1309, 1519, 1762, 2044, 2371, 2750, 3190, 3700, 4292, 4979, 5776, 6700, 7772, 9016, 10458, 12132, 14073, 16324, 18936, 21966, 25480, 29557, 34286, 39772, 46136, 53517, 62080, 72013],
		  "workers":	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
	"buildTime":		["0:00:44", "0:00:53", "0:01:05", "0:01:20", "0:01:36", "0:01:54", "0:02:15", "0:02:39", "0:03:07", "0:03:38", "0:04:13", "0:04:54", "0:05:40", "0:06:32", "0:07:32", "0:08:41", "0:09:59", "0:11:28", "0:13:09", "0:15:04", "0:17:16", "0:19:46", "0:22:37", "0:25:52", "0:29:35", "0:33:48", "0:38:37", "0:44:06", "0:50:22", "0:57:30", "1:05:38", "1:14:54", "1:25:29", "1:37:32", "1:51:16", "2:06:56", "2:24:47", "2:45:08", "3:08:20", "3:34:48", "4:04:57", "4:39:20", "5:18:31", "6:03:11", "6:54:07", "7:52:11", "8:58:22", "10:13:50", "11:39:51", "13:17:55"],
	"special": {"name":	"Maximum settlers",
		    "value":	[250, 279, 310, 346, 385, 429, 478, 533, 594, 662, 737, 821, 915, 1020, 1136, 1266, 1410, 1571, 1751, 1951, 2173, 2422, 2698, 3006, 3349, 3732, 4158, 4633, 5162, 5751, 6408, 7140, 7955, 8864, 9876, 11004, 12260, 13660, 15220, 16958, 18894, 21052, 23456, 26134, 29119, 32444, 36149, 40276, 44876, 50000] },
	"littleImg":		"/img/buildings/farm.png",
	"smallImg":		"/img/buildings_small/farm3.png",
	"buildParam":		bMiller,
	"indexToTexty":		"buildingName.miller",
}

structure[bHideout] = {
	"name":			"Hideout",
	"maxLevel": 		30,
	"curLevel":		-1,
	"limit": {"stone":	[50, 59, 68, 80, 94, 110, 128, 150, 176, 205, 240, 281, 329, 385, 450, 527, 617, 721, 844, 987, 1155, 1352, 1581, 1850, 2165, 2533, 2963, 3467, 4057, 4746],
		  "wood":	[40, 47, 54, 63, 74, 86, 100, 117, 136, 158, 184, 215, 250, 291, 339, 395, 461, 537, 625, 728, 848, 988, 1151, 1341, 1563, 1821, 2121, 2471, 2879, 3354],
		  "iron":	[40, 47, 54, 63, 74, 86, 100, 117, 136, 158, 184, 215, 250, 291, 339, 395, 461, 537, 625, 728, 848, 988, 1151, 1341, 1563, 1821, 2121, 2471, 2879, 3354],
		  "workers":	[1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 2, 1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 6, 8] },
	"buildTime":		["0:00:05", "0:00:11", "0:00:20", "0:00:31", "0:00:45", "0:01:01", "0:01:20", "0:01:44", "0:02:12", "0:02:45", "0:03:25", "0:04:14", "0:05:12", "0:06:21", "0:07:45", "0:09:25", "0:11:25", "0:13:49", "0:16:42", "0:20:10", "0:24:19", "0:29:18", "0:35:17", "0:42:28", "0:51:04", "1:01:24", "1:13:49", "1:28:41", "1:46:33", "2:07:59"],
	"special": {"name":	"Capacity",
		    "value":	[150, 179, 212, 253, 301, 358, 426, 507, 603, 718, 854, 1017, 1210, 1439, 1713, 2038, 2426, 2887, 3435, 4088, 4864, 5789, 6888, 8197, 9755, 11608, 13814, 16438, 19562, 23278] },
	"requirements":		[0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"littleImg":		"/img/buildings/hide.png",
	"smallImg":		"/img/buildings_small/hide1.png",
	"buildParam":		bHideout,
	"indexToTexty":		"buildingName.hideout",
}

structure[bBarracks] = {
	"name":			"Barracks",
	"maxLevel": 		30,
	"curLevel":		-1,
	"limit": {"stone":	[180, 221, 272, 335, 412, 507, 623, 767, 943, 1160, 1427, 1755, 2158, 2655, 3265, 4017, 4940, 6077, 7474, 9193, 11308, 13908, 17107, 21042, 25882, 31835, 39157, 48163, 59240, 72865],
		  "wood":	[180, 218, 264, 319, 386, 467, 565, 684, 827, 1001, 1211, 1465, 1773, 2145, 2596, 3141, 3800, 4599, 5564, 6733, 8147, 9857, 11928, 14432, 17463, 21130, 25568, 30937, 37434, 45295],
		  "iron":	[120, 146, 179, 218, 266, 324, 396, 483, 589, 718, 877, 1069, 1305, 1592, 1942, 2369, 2890, 3526, 4302, 5248, 6403, 7812, 9530, 11627, 14185, 17305, 21112, 25757, 31424, 38337],
		  "workers":	[6, 1, 1, 2, 1, 2, 2, 3, 3, 4, 4, 5, 5, 7, 8, 9, 11, 13, 14, 17, 21, 23, 28, 32, 38, 44, 52, 60, 71, 83] },
	"buildTime":		["0:01:39", "0:02:06", "0:02:38", "0:03:17", "0:04:04", "0:05:00", "0:06:07", "0:07:28", "0:09:04", "0:11:01", "0:13:20", "0:16:07", "0:19:28", "0:23:28", "0:28:17", "0:34:04", "0:41:00", "0:49:19", "0:59:18", "1:11:17", "1:25:40", "1:42:55", "2:03:37", "2:28:27", "2:58:16", "3:34:02", "4:16:58", "5:08:29", "6:10:18", "7:24:29"],
	"special": {"name":	"Time factor",
		    "value":	[80.0000, 74.4644, 69.3119, 64.5159, 60.0518, 55.8965, 52.0288, 48.4287, 45.0777, 41.9586, 39.0553, 36.3529, 33.8374, 31.4961, 29.3167, 27.2882, 25.4000, 23.6424, 22.0065, 20.4838, 19.0664, 17.7471, 16.5191, 15.3761, 14.3122, 13.3218, 12.4000, 11.5420, 10.7434, 10.0000] },
	"requirements":		[0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"littleImg":		"/img/buildings/barracks.png",
	"smallImg":		"/img/buildings_small/barracks3.png",
	"buildParam":		bBarracks,
	"indexToTexty":		"buildingName.barracks",
}

structure[bTownWall] = {
	"name":			"Town Wall",
	"maxLevel": 		20,
	"curLevel":		-1,
	"limit": {"stone":	[60, 70, 82, 96, 112, 132, 154, 180, 211, 247, 288, 337, 395, 462, 540, 632, 740, 866, 1013, 1185],
		  "wood":	[40, 47, 54, 63, 74, 86, 100, 117, 136, 158, 184, 215, 250, 291, 339, 395, 461, 537, 625, 728],
		  "iron":	[30, 35, 40, 47, 54, 63, 73, 85, 98, 114, 132, 154, 178, 207, 240, 278, 322, 374, 434, 503],
		  "workers":	[4, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 5, 6, 7, 8, 11, 12, 15, 17, 22] },
	"buildTime":		["0:03:47", "0:04:44", "0:05:55", "0:07:21", "0:09:06", "0:11:13", "0:13:50", "0:17:00", "0:20:52", "0:25:36", "0:31:21", "0:38:23", "0:46:58", "0:57:26", "1:10:12", "1:25:46", "1:44:46", "2:07:57", "2:36:14", "3:10:45"],
	"special": {"name":	"Reinforcement",
		    "value":	[1.050, 1.090, 1.140, 1.180, 1.230, 1.280, 1.330, 1.380, 1.430, 1.490, 1.550, 1.610, 1.680, 1.740, 1.810, 1.880, 1.960, 2.040, 2.120, 2.200] },
	"requirements": 	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
	"littleImg":		"/img/buildings/wall.png",
	"smallImg":		"/img/buildings_small/wall3.png",
	"buildParam":		bTownWall,
	"indexToTexty":		"buildingName.townWall",
}

structure[bMarket] = {
	"name":			"Market",
	"maxLevel": 		30,
	"curLevel":		-1,
	"limit": {"stone":	[100, 117, 137, 160, 187, 219, 257, 300, 351, 411, 481, 562, 658, 770, 901, 1054, 1233, 1443, 1688, 1975, 2311, 2703, 3163, 3701, 4330, 5066, 5927, 6935, 8113, 9493],
		  "wood":	[80, 93, 109, 126, 147, 172, 200, 233, 271, 316, 368, 429, 500, 583, 679, 791, 921, 1073, 1250, 1456, 1697, 1977, 2303, 2683, 3125, 3641, 4242, 4942, 5757, 6707],
		  "iron":	[70, 81, 94, 109, 127, 147, 171, 198, 229, 266, 309, 358, 416, 482, 559, 649, 752, 873, 1012, 1174, 1362, 1580, 1833, 2126, 2467, 2861, 3319, 3850, 4466, 5181],
		  "workers":	[10, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 10, 11, 13, 15, 18, 21, 25, 28, 34, 39, 46, 54, 63, 74, 86, 100, 118, 138] },
	"buildTime":		["0:03:09", "0:03:43", "0:04:22", "0:05:06", "0:05:58", "0:06:57", "0:08:04", "0:09:23", "0:10:52", "0:12:36", "0:14:34", "0:16:51", "0:19:28", "0:22:28", "0:25:56", "0:29:55", "0:34:29", "0:39:45", "0:45:48", "0:52:46", "1:00:46", "1:09:59", "1:20:34", "1:32:45", "1:46:45", "2:02:51", "2:21:22", "2:42:39", "3:07:09", "3:35:18"],
	"special": {"name":	"Amount of donkeys",
		    "value":	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 23, 28, 34, 42, 51, 63, 77, 95, 117, 143, 176, 216, 265, 325, 398, 489, 600] },
	"requirements": 	[0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"littleImg":		"/img/buildings/market.png",
	"smallImg":		"/img/buildings_small/market3.png",
	"buildParam":		bMarket,
	"indexToTexty":		"buildingName.market",
}

structure[bDonkeyStable] = {
	"name":			"Donkey Stable",
	"maxLevel": 		30,
	"curLevel":		-1,
	"limit": {"stone":	[240, 281, 329, 384, 450, 526, 616, 720, 843, 986, 1154, 1350, 1579, 1848, 2162, 2529, 2959, 3462, 4051, 4740, 5545, 6488, 7591, 8881, 10391, 12158, 14225, 16643, 19472, 22782],
		  "wood":	[200, 233, 271, 316, 368, 429, 500, 583, 679, 791, 921, 1073, 1250, 1456, 1697, 1977, 2303, 2683, 3125, 3641, 4242, 4942, 5757, 6707, 7814, 9103, 10605, 12355, 14393, 16768],
		  "iron":	[220, 255, 296, 343, 398, 462, 536, 622, 721, 837, 971, 1126, 1306, 1515, 1757, 2038, 2365, 2743, 3182, 3691, 4281, 4966, 5761, 6683, 7752, 8992, 10431, 12100, 14036, 16282],
		  "workers":	[10, 1, 1, 1, 2, 1, 2, 1, 2, 3, 2, 3, 2, 4, 3, 4, 4, 5, 5, 5, 6, 7, 7, 9, 8, 10, 11, 12, 13, 15] },
	"buildTime":		["0:04:54", "0:05:44", "0:06:40", "0:07:46", "0:09:01", "0:10:28", "0:12:07", "0:14:02", "0:16:13", "0:18:45", "0:21:39", "0:24:59", "0:28:50", "0:33:14", "0:38:19", "0:44:09", "0:50:52", "0:58:35", "1:07:28", "1:17:40", "1:29:25", "1:42:55", "1:58:27", "2:16:18", "2:36:50", "3:00:27", "3:27:37", "3:58:51", "4:34:46", "5:16:04"],
	"special": {"name":	"Production per hour",
		    "value":	[4, 5, 6, 7, 8, 9, 11, 13, 15, 18, 21, 25, 29, 35, 41, 49, 57, 68, 80, 95, 112, 132, 156, 184, 217, 257, 303, 358, 423, 500] },
	"requirements": 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	"littleImg":		"/img/buildings/stable.png",
	"smallImg":		"/img/buildings_small/stable3.png",
	"buildParam":		bDonkeyStable,
	"indexToTexty":		"buildingName.donkeyStable",
}

structure[bAlchemist] = {
	"name":			"Alchemist",
	"maxLevel": 		5,
	"curLevel":		-1,
	"limit": {"stone":	[400, 468, 548, 641, 750],
		  "wood":	[600, 699, 814, 949, 1105],
		  "iron":	[500, 580, 673, 780, 905],
		  "workers":	[50, 20, 28, 39, 55] },
	"buildTime":		["0:09:24", "0:19:24", "0:39:24", "1:19:24", "2:39:24"],
	"requirements": 	[0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
	"littleImg":		"/img/buildings/garage.png",
	"smallImg":		"/img/buildings_small/garage3.png",
	"buildParam":		bAlchemist,
	"indexToTexty":		"buildingName.alchemist",
}

structure[bResidence] = {
	"name":			"Residence",
	"maxLevel": 		10,
	"curLevel":		-1,
	"limit": {"stone":	[30000, 39000, 50700, 65910, 85683, 111388, 144804, 188246, 244719, 318135],
		  "wood":	[25000, 32500, 42250, 54925, 71403, 92823, 120670, 156871, 203933, 265112],
		  "iron":	[25000, 32500, 42250, 54925, 71403, 92823, 120670, 156871, 203933, 265112],
		  "workers":	[100, 20, 24, 29, 34, 42, 50, 59, 72, 86] },
	"buildTime":		["1:51:54", "2:14:24", "2:41:24", "3:13:48", "3:52:41", "4:39:20", "5:35:19", "6:42:30", "8:03:08", "9:39:53"],
	"special": {"name":	"Time factor",
		    "value":	[0.80, 0.72, 0.64, 0.58, 0.52, 0.46, 0.42, 0.37, 0.33, 0.30] },
	"requirements": 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
	"littleImg":		"/img/buildings/snob.png",
	"smallImg":		"/img/buildings_small/snob2.png",
	"buildParam":		bResidence,
	"indexToTexty":		"buildingName.residence",
}

structure[bGoldsmith] = {
	"name":			"Goldsmith",
	"maxLevel": 		5,
	"curLevel":		-1,
	"limit": {"stone":	[4000, 5600, 7840, 10976, 15366],
		  "wood":	[3000, 4200, 5880, 8232, 11525],
		  "iron":	[2500, 3500, 4900, 6860, 9604],
		  "workers":	[25, 5, 6, 7, 9] },
	"buildTime":		["0:08:47", "0:10:39", "0:12:54", "0:15:36", "0:18:50"],
	"requirements": 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	"littleImg":		"/img/buildings/smith.png",
	"smallImg":		"/img/buildings_small/smith1.png",
	"buildParam":		bGoldsmith,
	"indexToTexty":		"buildingName.goldsmith",
}

structure[bMemorial] = {
	"name":			"Memorial",
	"maxLevel": 		1,
	"curLevel":		-1,
	"limit": {"stone":	[400000],
		  "wood":	[400000],
		  "iron":	[400000],
		  "workers":	[0] },
	"buildTime":		["35:59:24"],
	"requirements": 	[50, 50, 50, 50, 50, 50, 30, 30, 20, 30, 30, 5, 10, 5, 0],
	"littleImg":		"/img/buildings/statue.png",
	"smallImg":		"/img/buildings_small/statue1.png",
	"buildParam":		bMemorial,
	"indexToTexty":		"buildingName.memorial",
}

const AT_THE_END = -1;
const MS_OF_DAY = 86400000;					// milliseconds of one day - 24*60*60*1000
const timeSeparator = ":";

const BUILD = "BUILD";
const BT_buildings	= 0;					// column numbers of buildings' list
const BT_demandStone	= 1;
const BT_demandWood	= 2;
const BT_demandOre	= 3;
const BT_demandSettlers	= 4;
const BT_buidingTime	= 5;
const BT_upgradeToLevel	= 6;

const CT_buildingContract	= 0;				// column numbers of buildings' list
const CT_buildingprogress	= 1;
const CT_duration		= 2;
const CT_completion		= 3;
const CT_abort			= 4;

var resources = ["stone", "wood", "iron", "workers"];
var resourcesList = new Object();				// will hold current supplies

resourcesList[resources[0]] = {					// "stone"
	"amount":	0,
	"img":		"/img/res2.png",
	"missing":	0,
}
resourcesList[resources[1]] = {					// "wood"
	"amount":	0,
	"img":		"/img/res1.png",
	"missing":	0,
}
resourcesList[resources[2]] = {					// "iron"
	"amount":	0,
	"img":		"/img/res3.png",
	"missing":	0,
}
resourcesList[resources[3]] = {					// "workers"
	"amount":	0,
	"img":		"/img/worker.png",
	"missing":	0,
}

var buildingQueue;						// array of buildings waiting for construction
var constructionQueue;						// array of currently constructed buildings
var UCSList;							// list of "Under Construction Settlements"
var fLink = "";							// link for forward listing through settlemens
var bLink = "";							// link for backward listing through settlemens

// game version template
function tGameVersion () {
	this.bigVer = 0;
	this.midVer = 0;
	this.lowVer = 0;

	this.getGameVersion = function () {
	// <div class="status" style="padding-left:10px;">Version <a href="game.php?village=35689&amp;s=changelog">1.0.3</a></div>
		var statusNodes = xpath(document, '//div[(@class="status")]/a[contains(@href, "s=changelog")]');
		if (statusNodes.snapshotLength == 1) {
			statusNodes = statusNodes.snapshotItem(0).innerHTML.split(".");
			this.bigVer = statusNodes[0];
			this.midVer = statusNodes[1];
			this.lowVer = statusNodes[2];
		}
	}
	this.getGameVersion();
	this.compareWith = function (ver) {				// ver is string e.g. "1.1.2"
		ver = ver.split(".");

		var bVer = parseInt(ver[0], 10);
		var mVer = (ver.length > 1)?parseInt(ver[1], 10):0;
		var lVer = (ver.length > 2)?parseInt(ver[2], 10):0;

		if (this.bigVer < bVer) return (cLOWER);
		if (this.bigVer > bVer) return (cHIGHER);
		if (this.midVer < mVer) return (cLOWER);
		if (this.midVer > mVer) return (cHIGHER);
		if (this.lowVer < lVer) return (cLOWER);
		if (this.lowVer > lVer) return (cHIGHER);
		return (cEQUAL);
	}
	this.premiumAccount = function () {
		if (this.compareWith("1.0.3") == cLOWER) {
			// up to version 1.0.2
			var premiumNodes = xpath(document, '//table[(@class="shortcut") and contains(@style, "sc_premium_middle.png")]');
			return (premiumNodes.snapshotLength < 1);
		}
		else {	// from version 1.0.3
			var premiumNodes = xpath(document, '//div[(@class="buff") and contains(@style, "premium-account.png")]');
			return (premiumNodes.snapshotLength > 0);
		}
	}
}
var gameVersion;

// settlement template
function tSettlement (_ID, _name, _x, _y, _ch, _wl) {
	this.ID = parseInt(_ID);
	this.name = trimStr(_name);
	this.x = parseInt(_x);
	this.y = parseInt(_y);
	this.changed = (_ch == true);
	this.wLevel = parseInt(_wl);					// level of warehouse
//	this.mLevel = parseInt(_ml);					// level of market
// GM_log(this.ID+" "+this.changed);

	this.getRec = function (_IS) {
		return (this.ID.toString() + _IS + this.name + _IS + this.x.toString() + _IS + this.y.toString() + _IS + ((this.changed == true)?exclamationMark:noExclamation)+ _IS + this.wLevel.toString());
	}
	this.setName = function (_name) {
		this.name = trimStr(_name);
	}
	this.getSettInfo = function () {
		var settDiv = document.getElementById("settlement");	// <div id="settlement" style="display:none;">746|595|57S - Radograd|10.000|0|5400|0|11601|3000|0|0|0|0|1|</div>
		if (settDiv) {
			settDiv = settDiv.innerHTML.split(settlementSPRTR);
			this.x = parseInt(settDiv[0]);
			this.y = parseInt(settDiv[1]);
			this.name = trimStr(settDiv[2]);
		}
	}
	this.setWLevel = function () {
		this.wLevel = structure[bWarehouse].curLevel;
	}
}

// list of settlements template
function tUnderConstructionList (_label, _RS, _IS) {			// list of settlements which are under construction
	const noSett = -1;
	this.Queue = new Array();
	this.label = _label;
	this.recordSeparator = _RS;
	this.itemSeparator = _IS;

	this.sortByName = function (a, b) {
		return (a.name > b.name);
	}
	this.putSett = function (_ID, _name, _x, _y, _ch, _wl) {
		var ix = this.getSettIndex(_ID);
		if (ix != noSett) {					// we already have such settlement
			this.Queue[ix].setName(_name);			// set the name
			if (this.Queue[ix].wLevel != _wl) {		// compare warehouse's level
				if (this.Queue[ix].wLevel != 0) this.Queue[ix].changed = true;
				this.Queue[ix].wLevel = _wl;
			}
		}
		else {
			var c = new tSettlement(_ID, _name, _x, _y, _ch, _wl);

			this.Queue.push(c);
			this.Queue.sort(this.sortByName);
		}
	}
	this.putSettStr = function (_str) {
		_str = _str.split(this.itemSeparator);
		this.putSett(_str[0], _str[1], _str[2], _str[3], (_str.length > 4)?_str[4]==exclamationMark:false, (_str.length > 5)?_str[5]:0);
	}
	this.removeSett = function (_ID) {
		for (var i = 0; i < this.Queue.length; i++) {
			if (this.Queue[i].ID == _ID) {
				this.Queue.splice(i, 1);		// remove i-th building
				break;
			}
		}
	}
	this.emptyQueue = function () {					// remove all buildings
		if (this.Queue.length > 0) this.Queue.splice(0, this.Queue.length);
	}
	this.readQueue = function () {
		this.emptyQueue();
		var settList = GM_getValue(this.label, "");		// read string
		if (settList != "") {
			settList = settList.split(this.recordSeparator);
			for (var i = 0; i < settList.length; i++) this.putSettStr(settList[i]);
		}
	}
	this.saveQueue = function (logIt) {
		if (this.isFilled()) {
			var txt = "";
			for (var i = 0; i < this.Queue.length; i++)	// create string
				txt += ((i > 0)?this.recordSeparator:"") + this.Queue[i].getRec(this.itemSeparator);
if (logIt) GM_log("UCS saveQueue: "+txt);
			GM_setValue(this.label, txt);			// write new queue
		}
		else	GM_deleteValue(this.label);			// remove queue
	}
	this.isFilled = function () {
		return (this.Queue.length > 0);
	}
	this.getSettIndex = function (_ID) {
		var qLength = this.Queue.length;
		for (var i = 0; i < qLength; i++) if (this.Queue[i].ID == _ID) return (i);
		return (noSett);
	}
	this.getPreviousSett = function (_ID) {
		var currSett = this.getSettIndex(_ID);
		if ((currSett != noSett) && (currSett > 0)) return (currSett - 1);
		return (noSett);
	}
	this.getNextSett = function (_ID) {
		var currSett = this.getSettIndex(_ID);
		if ((currSett != noSett) && (currSett < (this.Queue.length-1))) return (currSett + 1);
		return (noSett);
	}
	this.setChange = function (_ID) {
		var currSett = this.getSettIndex(_ID);
		if (currSett != noSett) {
			this.readQueue();				// read it first, another page could change it
			this.Queue[currSett].changed = true;
		}
	}
	this.clearChange = function (_ID) {
		var currSett = this.getSettIndex(_ID);
		if (currSett != noSett) {
			this.readQueue();				// read it first, another page could change it
			this.Queue[currSett].changed = false;
		}
	}
	this.isChanged = function (_ID) {
		var currSett = this.getSettIndex(_ID);
		return ((currSett != noSett)?this.Queue[currSett].changed == true:false);
	}
}

// building template
function tWaitingBuilding (_build, _doNotOvertake, _autoBuild) {	// object we want to build
	this.build = _build;
	this.level = 1*0;						// level we're upgrading to
	this.doNotOvertake = new Boolean(_doNotOvertake);
	this.autoBuild = new Boolean(_autoBuild);

	this.getRec = function (_IS) {
		return (this.build+_IS+((this.isOvertakeble() == true)?"O":"N")+_IS+((this.buildAutomatically() == true)?"B":"N"));
	}
	this.fromRec = function (ret, _IS) {
		var xxx = ret.split (_IS);
		var l_xxx = xxx.length;
		this.build = xxx[0];
		if (l_xxx > 1) {
			this.doNotOvertake = (xxx[1] == "N");
			if (l_xxx > 2) {
				this.autoBuild = (xxx[2] == "B");
			}
		}
	}
	this.legal = function () {
		return (structure[this.build] != undefined);
	}
	this.getLevel = function () {
		return (1*this.level);
	}
	this.getDuration = function (_C) {				// return number of milliseconds
		var lvl = this.getLevel();				// _C is level of currently built Castle
		var inc = (this.build != bCastle)?0:1;
		if (this.buildAutomatically()) {
			var str = structure[this.build];
			var ms = 0;
			while (lvl <= str.maxLevel) {
				ms += getRealTime(this.build, lvl++, _C);
				_C += inc;
			}
			return (ms);
		}
		return (getRealTime(this.build, lvl, _C));
	}
	this.getDurationTxt = function (_C) {				// _C is level of currently built Castle
		return (millisecondsToString(this.getDuration(_C), true));
	}
	this.getAmount = function (resource) {
		var lvl = this.getLevel() - 1;
		var str = structure[this.build];
		if (this.buildAutomatically()) {
			var x = 0;
			while (lvl < str.maxLevel) x += str.limit[resource][lvl++];
			return (x);
		}
		return (str.limit[resource][lvl]);
	}
	this.setMinLevel = function () {
		if (this.getLevel() <= structure[this.build].curLevel) this.level = structure[this.build].curLevel + 1;
	}
	this.settlersNeeded = function () {
		var buildLevel = this.getLevel() - 1;
		return (structure[this.build].limit["workers"][buildLevel] > resourcesList["workers"].amount);
	}
	this.resourcesNeeded = function () {
		var buildLevel = this.getLevel() - 1;
		var myBuilding = structure[this.build];
		return ((myBuilding.limit["stone"][buildLevel] > resourcesList["stone"].amount) ||
			(myBuilding.limit["wood"][buildLevel]  > resourcesList["wood"].amount)  ||
			(myBuilding.limit["iron"][buildLevel]  > resourcesList["iron"].amount));
	}
	this.readyForBuilding = function () {
		return (!this.settlersNeeded() && !this.resourcesNeeded() && this.requirementsMet());
	}
	this.requirementsMet = function () {
		var myBuilding = structure[this.build];
		if (myBuilding.requirements != undefined)
		for (var i = 0; i < buildingsIdx.length; i++) {
			var x = myBuilding.requirements[i];
			if ((x > 0) && (structure[buildingsIdx[i]].curLevel < x)) return (false);
		}
		return (true);
	}
	this.getName = function() {
		return (structure[this.build].name);
	}
	this.getType = function() {
		return (this.build);
	}
	this.getImg = function () {
		return (structure[this.build].littleImg);
	}
	this.isOvertakeble = function () {
		return (this.doNotOvertake == false);
	}
	this.changeOvertaking = function () {
		this.doNotOvertake = !this.doNotOvertake;
	}
	this.buildAutomatically = function () {
		return (this.autoBuild == true);
	}
	this.changeAutobuilding = function () {
		this.autoBuild = !this.autoBuild;
	}
	this.getWorkersFutureNumber = function() {
		return (structure[bMiller].special.value[((this.buildAutomatically())?structure[bMiller].maxLevel:this.getLevel())-1]);
	}
}

// buildings template
function tWaitingQueue (_label, _RS, _IS) {				// array of objects we want to build
	this.Queue = new Array();
	this.label = _label;
	this.levelTXT = "";
	this.recordSeparator = _RS;
	this.itemSeparator = _IS;

	this.putBuilding = function (_B, _NOT, _AB, num) {
		var c = new tWaitingBuilding(_B, _NOT, _AB);
		if (c.legal()) {
			c.setMinLevel();

			if (num < 0) this.Queue.push(c);
			else if (num == 0) this.Queue.unshift(c);
			else if (num < this.Queue.length) this.Queue.splice(num, 0, c);
			else this.Queue.push(c);

			this.checkLevel();
		}
	}
	this.putBuildingStr = function (_str) {
		var c = new tWaitingBuilding("", false, false);		// create "empty" overtakeble not automatically constructed building
		c.fromRec(_str, this.itemSeparator);
		if (c.legal) {
			c.setMinLevel();
			this.Queue.push(c);
			this.checkLevel();
		}
	}
	this.removeBuilding = function (num) {
		if ((num > -1) && (num < this.Queue.length)) {
			this.Queue.splice(num, 1);			// remove i-th building
			this.checkLevel();
		}
	}
	this.removeAllBuildings = function () {
		this.Queue.splice(0, this.Queue.length);
	}
	this.moveBuildingUp = function (num) {
		if ((num > 0) && (num < this.Queue.length)) {
			var o = new tWaitingBuilding(this.Queue[num].build, !this.Queue[num].isOvertakeble(), this.Queue[num].buildAutomatically());
			this.Queue.splice(num, 1);			// remove i-th building
			this.Queue.splice(num-1, 0, o);			// insert it
			this.checkLevel();
		}
	}
	this.moveBuildingDown = function (num) {
		if ((num > -1) && (num < this.Queue.length-1)) {
			var o = new tWaitingBuilding(this.Queue[num].build, !this.Queue[num].isOvertakeble(), this.Queue[num].buildAutomatically());
			this.Queue.splice(num, 1);			// remove i-th building
			this.Queue.splice(num+1, 0, o);			// insert it
			this.checkLevel();
		}
	}
	this.changeOvertaking = function (num) {
		if ((num > -1) && (num < this.Queue.length)) this.Queue[num].changeOvertaking();
	}
	this.changeAutobuilding = function (num) {
		if ((num > -1) && (num < this.Queue.length)) this.Queue[num].changeAutobuilding();

	}
	this.canOvertake = function (num) {
		if ((num > -1) && (num < this.Queue.length)) {
			for (var i = 0; i < num; i++) if (!this.Queue[i].isOvertakeble()) return (false);
			return (true);
		}
		return (false);
	}
	this.readQueue = function () {					// read what to build
		var buildingQueue = trimStr(GM_getValue(this.label, ""));
		if (buildingQueue != "") {
			buildingQueue = buildingQueue.split(this.recordSeparator);
			this.levelTXT = buildingQueue[0];
			for (var i = 1; i < buildingQueue.length; i++)	// insert to array
				this.putBuildingStr(buildingQueue[i]);
			this.checkLevel();
		}
	}
	this.saveQueue = function () {
		if (this.isFilled()) {
			var txt = this.levelTXT;
			for (var i = 0; i < this.Queue.length; i++)	// create text queue
				txt += this.recordSeparator + this.Queue[i].getRec(this.itemSeparator);
			GM_setValue(this.label, txt);			// write new queue
		}
		else	GM_deleteValue(this.label);			// remove queue
	}
	this.isFilled = function () {
		return (this.Queue.length > 0);
	}
	this.checkLevel = function () {			// call of removeBuilding makes this function recursive
		if (this.isFilled()) {
			// reset all levels to minimum
			for (var i = 0; i < this.Queue.length; i++) {
				var maxL = constructionQueue.getMaxLevel(this.Queue[i].build);
				if (maxL < 0) maxL = 0;				// could return -1 if this building doesn't exist
				if (maxL >= structure[this.Queue[i].build].maxLevel) this.removeBuilding(i--);
				else this.Queue[i].level = maxL + 1;
			}
			if (this.Queue.length > 1) {
				for (var i = 1; i < this.Queue.length; i++) {
					for (var j = 0; j < i; j++) if (this.Queue[i].build == this.Queue[j].build) ++this.Queue[i].level;
					if (this.Queue[i].level > structure[this.Queue[i].build].maxLevel) this.removeBuilding(i--);
				}
			}
		}
	}
	this.getMaxLevel = function (_BT) {				// buiding type
		var maxLevel = constructionQueue.getMaxLevel(_BT);	// find level in construction queue
		for (var i = this.Queue.length-1; i >= 0; i--) {
			if (this.Queue[i].build == _BT) {
				if (this.Queue[i].buildAutomatically()) maxLevel = structure[this.Queue[i].build].maxLevel;
				else maxLevel = this.Queue[i].getLevel();
				break;
			}
		}
		return (maxLevel);
	}
	this.getActLevel = function (_BT) {				// buiding type
		return (structure[_BT].curLevel);
	}
	this.findLevelTXT = function () {
		var myLines = xpath(document, '//table/tbody/tr/td/h1');
		if (myLines.snapshotLength == 1) {
			var r_e = /\((\D{1,}) (\d{1,})\)/;	// (<at least one non-digit> <at least one digit>)
			var _match = myLines.snapshotItem(0).innerHTML.match(r_e);
			if (_match && (_match.length == 3)) this.levelTXT = _match[1];
		}
	}
}

// construction template
function tConstruction (_build, _completion, _level) {			// object, which is building
	this.build	= _build;
	this.completion	= _completion;
	this.level	= 1*_level;					// level we're upgrading to

	this.getLevel = function () {
		return (1*this.level);
	}
	this.getType = function() {
		return (this.build);
	}
	this.getDuration = function (_C) {				// return number of milliseconds; _C is level of currently built Castle
		return (getRealTime(this.build, this.getLevel(), _C));
	}
	this.getDurationTxt = function (_C) {				// _C is level of currently built Castle
		return (millisecondsToString(this.getDuration(_C), true));
	}
	this.isDemolition = function () {
		return (this.level == 0);
	}
}

// constructions template
function tConstructions (_CT, _PA) {				// array of objects which are built
	this.Queue = new Array();				// _CT = construction table, _PA = premium Account
	this.premiumAccount = new Boolean(_PA == true);
	this.thereIsCT = new Boolean(_CT != null);
	this.demolitionsNumber = 0;

	if (this.thereIsCT == true) for (var i = 1; i < _CT.rows.length; i++) {
		var myLine = _CT.rows[i];
		if (myLine.cells.length >= CT_completion) {
			var c = new tConstruction(getBuildingType(myLine.cells[CT_buildingContract]), myLine.cells[CT_completion].innerHTML, getBuildingLevel(myLine.cells[CT_buildingContract]));
			this.Queue.push(c);
			if (c.isDemolition()) ++this.demolitionsNumber;
		}
	}

//	this.isFilled = function () {
//		return (this.Queue.length > 0);
//	}
	this.hasSpace = function () {
		if (this.premiumAccount == true) return ((globalOptions.limitPremiumQueue == 0) || (this.Queue.length < globalOptions.limitPremiumQueue));
		return ((this.Queue.length - this.demolitionsNumber) < 3);
	}
	this.getMaxLevel = function (_BT) {			// buiding type
		var maxLevel = structure[_BT].curLevel;
		for (var i = this.Queue.length-1; i >= 0; i--) {
			if (this.Queue[i].build == _BT) {
				maxLevel = this.Queue[i].getLevel();
				break;
			}
		}
		return (maxLevel);
	}
	this.isBuilt = function (_BT, _L) {			// return true if building _BT is upgraded
		var maxLevel = 0;				// to level _L
		for (var i = this.Queue.length-1; i >= 0; i--) {
			if (this.Queue[i].build == _BT) {
				maxLevel = this.Queue[i].getLevel();
				break;
			}
		}
		return (maxLevel >= _L);
	}
}

const OPTIONS_FORM_NAME		= "RxR_options_form";
const I_NUMBER_OF_DAYS		= "RxR_number_of_days";
const I_SUMMARIZE_MISSING	= "RxR_summarize_missing";
const I_ALL_BUILDINGS		= "RxR_all_buildings";
const I_ALL_LINKS_IN_PA		= "RxR_all_links_in_PA";
const I_REMOVE_PREMIUM_BUTTONS	= "RxR_remove_premium_buttons";
const I_ADD_MILLER		= "RxR_add_miller";
const I_HIGHLIGHT_ROW		= "RxR_highlight_row";
const I_REPLACE_SERVER_TIME	= "RxR_replace_time";
const I_CHANGE_SIGNAL		= "RxR_change_signal";
const I_HIDE_MAX_LEVEL		= "RxR_hide_max_level";
const I_DELAY_FOR_REFRESH	= "RxR_delay_for_refresh";
const I_FORCED_LANGUAGE		= "RxR_forced_language";
const I_NUMBER_OR_TOMORROW	= "RxR_number_or_tomorrow";
const D_NUMBER_OR_TOMORROW	= "RxR_div_number_or_tomorrow";
const I_LIMIT_PREMIUM_QUEUE	= "RxR_limit_premium_queue";
const I_DONT_REFRESH		= "RxR_dont_refresh";
const I_SHIFT_WINDOW		= "RxR_shift_window";

const RxR	   = "RxR_";
const RxR_up	   = "RxRu_";
const RxR_down	   = "RxRd_";
const RxR_delete   = "RxRd_";
const RxR_overtake = "RxRo_";
const RxR_repeat   = "RxRr_";

var villageID = noSettlement;						// villageID is global variable -> initialize it at the start of main function

var upgradeLink = "";							// "original" link to upgrade

var currSettlement = new tSettlement(villageID, "", 0, 0, false, 0);

var itIsModernStyle = new Boolean();					// do we use Modern Style?
var itIsPremiumAccount = new Boolean();					// do we have Premium Account?

// TRANSLATIONS ***********************************************************************************************************
var translations = {
	en: {	languageName			: "English",		// thanks to me :)
		constructionTable: {
			buildingContract	: "Building contract",
			buildingProgress	: "Building progress",
			duration		: "Duration",
			completion		: "Completion",
			abort			: "Abort",
			timeColumn: {
				toDelete: {				// these strings'll be deleted from "Completion" time
					today	: "today ",
					at	: "at ",
					clock	: " Clock",
					oClock	: " O'Clock",		// v.2.0.0 changed a way how time is displayed
					onThe	: "on the ",
				},
				tomorrow	: "tomorrow",
			},
			forgetAboutPremium	: "Forget about Premium account's free building queue. After all you have <strong>KA Mason</strong> installed.",
			additionalCosts		: "Additional costs caused by the KA Mason building queue:",
			willBeRefunded		: "If aborted, the additional costs of the KA Mason building list will be refunded ;)",
			requirementsNotMet	: "Conditions have not been fulfilled",
		},
		buildingName: {
			castle			: "Castle",
			quarry			: "Quarry",
			sawmill			: "Sawmill",
			oreMine			: "Ore Mine",
			warehouse		: "Warehouse",
			hideout			: "Hideout",
			miller			: "Miller",
			barracks		: "Barracks",
			townWall		: "Town Wall",
			donkeyStable		: "Donkey Stable",
			market			: "Market",
			alchemist		: "Alchemist",
			residence		: "Residence",
			goldsmith		: "Goldsmith",
			memorial		: "Memorial",
		},
		listOfBuildings: {
			buildingTime		: "Building time:",
			requires		: "Requires:",
		},
		titleText: {
			level			: "Level",
			duration		: "duration",
		},
		buildTab			: "Build",
		masonSettingsTab		: "KA Mason settings",
		buildAll			: "Build all",
		buildAllTitle			: "Add all buildings to KA Mason building queue",
		cancelAll			: "Cancel all",
		cancelAllTitle			: "Remove all buildings from KA Mason building queue",
		showAll				: "Show all",
		showAllTitle			: "Show all buildings in the list of buidings",
		doNotShowAll			: "Don't show all",
		doNotShowAllTitle		: "Show only buildings which requirements are almost fulfilled in the list of buidings",
		acknowledgeChanges		: "Acknowledge changes",
		acknowledgeChangesTitle		: "Exclamation mark'll be removed from page's title",
		turnOnUCSBrowsingTitle		: "Turn on browsing through currently constructed settlements",
		turnOffUCSBrowsingTitle		: "Turn off browsing through currently constructed settlements",
		options: {
			legend			: "KA Mason options",
			numberOfDays		: "Display number of days in \"Completion\" column instead of exact date",
			numberButNotTomorrow	: "Display '+1' in \"Completion\" column instead of 'tomorrow'",
			summarizeMissingResources : "Summarize missing resources",
			showAllBuildings	: "Show all buildings in list of buildings",
			showAllLinksInPA	: "Allow to add every building to the KA Mason queue under Premium account",
			removePremiumButtons	: "Remove \"awesome\" Premium buttons",
			automaticallyAddMiller	: "Automatically add Miller to queue if settlers are needed",
			delayForRefresh		: "Page refresh interval (in minutes)",
			language		: "Language",
			automaticLanguage	: "set automatically",
			apply			: "Apply options",
			checkForUpdate		: "Check for update",
			limitPremiumQueue	: "Limit of Premium building queue",
			noLimitPremiumQueue	: "no limit",
			highlightRow		: "Highlight row under cursor in KA Mason queue",
			replaceTime		: "Use computer time instead of server time",
			changeNotification	: "Notify of changes in KA Mason queue (exclamation mark in page's title)",
			hideMaxLevelBuilding	: "Hide buildings of maximum level",
			dontRefresh		: "Don't refresh the page if building queue is full",
			shiftWindow		: "Shift browser window up to hide header of page"
		},
	},
	sk: {	languageName			: "Slovenčina",		// thanks to me again :D
		constructionTable: {
			buildingContract	: "Stavebná zákazka",
			buildingProgress	: "Priebeh výstavby",
			duration		: "Trvanie",
			completion		: "Ukončenie",
			abort			: "Zrušiť",
			timeColumn: {
				toDelete: {
					today	: "dnes ",
					at	: "v ",
					clock	: " hodín",
					onThe	: "dňa ",
				},
				tomorrow	: "zajtra",
			},
			forgetAboutPremium	: "Zabudni na neobmedzenú stavebnú frontu Prémiového účtu. Veď máš nainštalovaného <strong>KA Stavbára</strong>.",
			additionalCosts		: "Dodatočné platby spôsobené čakaním v stavebnej fronte KA Stavbára:",
			willBeRefunded		: "Ak sa stavba zruší, dodatočné suroviny KA Stavbára budú uhradené ;)",
			requirementsNotMet	: "Podmienky neboli splnené",
		},
		buildingName: {
			castle			: "Hrad",
			quarry			: "Kameňolom",
			sawmill			: "Píla",
			oreMine			: "Železná baňa",
			warehouse		: "Sklad",
			hideout			: "Úkryt",
			miller			: "Mlyn",
			barracks		: "Kasárne",
			townWall		: "Mestský múr",
			donkeyStable		: "Oslia stajňa",
			market			: "Trh",
			alchemist		: "Alchymista",
			residence		: "Rezidencia",
			goldsmith		: "Zlatníctvo",
			memorial		: "Pamätník",
		},
		listOfBuildings: {
			buildingTime		: "Doba stavby:",
			requires		: "Vyžaduje:",
		},
		titleText: {
			level			: "Úroveň",
			duration		: "výstavba",
		},
		buildTab			: "Budovať",
		masonSettingsTab		: "Nastavenia KA Stavbára",
		buildAll			: "Budovať všetko",
		buildAllTitle			: "Pridať všetky budovy do stavebnej fronty KA Stavbára",
		cancelAll			: "Zrušiť všetko",
		cancelAllTitle			: "Odstrániť všetky budovy zo stavebnej fronty KA Stavbára",
		showAll				: "Zobraziť všetko",
		showAllTitle			: "V zozname budov zobraz všetky budovy",
		doNotShowAll			: "Nezobraziť všetko",
		doNotShowAllTitle		: "V zozname budov zobraz len budovy s takmer splnenými podmienkami",
		acknowledgeChanges		: "Potvrdiť zmeny",
		acknowledgeChangesTitle		: "Odstráni výkričník z titulu stránky",
		turnOnUCSBrowsingTitle		: "Zapnúť listovanie cez práve budované osady",
		turnOffUCSBrowsingTitle		: "Vypnúť listovanie cez práve budované osady",
		options: {
			legend			: "Nastavenia KA Stavbára",
			numberOfDays		: "Namiesto dátumu zobraziť v stĺpci \"Ukončenie\" počet dní",
			numberButNotTomorrow	: "Namiesto 'zajtra' zobraziť v stĺpci \"Ukončenie\" '+1'",
			summarizeMissingResources : "Spočítavať chýbajúce suroviny",
			showAllBuildings	: "V zozname budov zobraziť všetky budovy",
			showAllLinksInPA	: "Povoliť pridanie všetkých budov do stavebnej fronty KA Stavbára pod prémiovým účtom",
			removePremiumButtons	: "Odstrániť \"úžasné\" Prémium tlačidlá",
			automaticallyAddMiller	: "Automaticky pridať Mlyn do stavebnej fronty, keď sú potrební osadníci",
			delayForRefresh		: "Interval obnovovania stránky (v minútach)",
			language		: "Jazyk",
			automaticLanguage	: "nastaviť automaticky",
			apply			: "Použiť nastavenia",
			checkForUpdate		: "Skontrolovať aktualizácie",
			limitPremiumQueue	: "Obmedzenie stavebnej fronty prémiového účtu",
			noLimitPremiumQueue	: "bez obmedzenia",
			highlightRow		: "Zvýrazniť riadok pod kurzorom v stavebnej fronte KA Stavbára",
			replaceTime		: "Použiť čas počítača namiesto času servera",
			changeNotification	: "Upozorniť na zmeny v stavebnej fronte KA Stavbára (výkričník v titule stránky)",
			hideMaxLevelBuilding	: "Skryť budovy maximálnej úrovne",
			dontRefresh		: "Neobnovovať stránku, ak je stavebná fronta plná",
			shiftWindow		: "Posuň stránku prehliadača nahor, aby sa skryla hlavička stránky"
		},
	},
	pl: {	languageName			: "Polszczyzna",	// thanks to szczeciu
		constructionTable: {
			buildingContract	: "Lista budowy",
			buildingProgress	: "Postęp budowy",
			duration		: "Czas trwania",
			completion		: "Ukończenie",
			abort			: "Przerwij",
			timeColumn: {
				toDelete: {
					today	: "dziś ",
					at	: "o ",
					clock	: "",
					onThe	: "dnia ",
				},
				tomorrow	: "jutro",
			},
			forgetAboutPremium	: "Zapomnij o darmowej kolejce budowy w Premium. W końcu masz <strong>KA Mason</strong>.",
			additionalCosts		: "Dodatkowe koszty spowodowane przez listę budowy KA Mason:",
			willBeRefunded		: "Dodatkowe koszty listy budowy KA Mason są zwracane w przypadku przerwania ;)",
			requirementsNotMet	: "Wymagania nie spełnione",
		},
		buildingName: {
			castle			: "Castle",
			quarry			: "Quarry",
			sawmill			: "Sawmill",
			oreMine			: "Ore Mine",
			warehouse		: "Warehouse",
			hideout			: "Kryjówka",
			miller			: "Miller",
			barracks		: "Koszary",
			townWall		: "Mur miejski",
			donkeyStable		: "Hodowla osłów",
			market			: "Rynek",
			alchemist		: "Alchemik",
			residence		: "Dwór",
			goldsmith		: "Złotnik",
			memorial		: "Pomnik",
		},
		titleText: {
			level			: "Poziom",
			duration		: "ukończenie",
		},
	},
	es: {	languageName			: "Español",		// thanks to SURbyte
		constructionTable: {
			buildingContract	: "Contrato de construcción",
			buildingProgress	: "Desarrollo construcciones",
			duration		: "Duración",
			completion		: "Conclusión",
			abort			: "Cancelar",
			timeColumn: {
				toDelete: {
					today	: "hoy ",
					at	: "a las ",
					clock	: " Horas",
					onThe	: "el ",
				},
				tomorrow	: "mañana",
			},
			forgetAboutPremium	: "Olvídate de la cola de construcción gratuita de la cuenta premium. Después de todo, tenés instalado <strong>KA Mason</strong>.",
			additionalCosts		: "Costos adicionales causados por cola de construcción KA Mason:",
			willBeRefunded		: "Si cancelás, los costos adicionales de la lista de construccion KA Mason serán reenfundados ;)",
			requirementsNotMet	: "No se cumplen las condiciones",
		},
		buildingName: {
			castle			: "Castillo",
			quarry			: "Cantera",
			sawmill			: "Aserradero",
			oreMine			: "Mina de mineral",
			warehouse		: "Almacén",
			hideout			: "Escondite",
			miller			: "Molino",
			barracks		: "Barracones",
			townWall		: "Muralla",
			donkeyStable		: "Establo",
			market			: "Mercado",
			alchemist		: "Alquimista",
			residence		: "Mansión",
			goldsmith		: "Orfebrería",
			memorial		: "Monumento",
		},
		titleText: {
			level			: "Nivel",
			duration		: "duración",
		},
	},
	ro: {	languageName			: "Română",		// thanks to danutz
		constructionTable: {
			buildingContract	: "Tipul constructiei",
			buildingProgress	: "Constructie in curs",
			duration		: "Durata",
			completion		: "Indeplinire",
			abort			: "Renunta",
			timeColumn: {
				toDelete: {
					today	: "azi ",
					at	: "la ",
					clock	: " ora",
					onThe	: "pe ",
				},
				tomorrow	: "maine",
			},
			forgetAboutPremium	: "Forget about Premium account's free building queue. After all you have <strong>KA Mason</strong> installed.",
			additionalCosts		: "Additional costs caused by the KA Mason building queue:",
			willBeRefunded		: "If aborted, the additional costs of the KA Mason building list will be refunded ;)",
			requirementsNotMet	: "Requirements not met",
		},
		buildingName: {
			castle			: "Castel",
			quarry			: "Cariera",
			sawmill			: "Fabrica de cherestea",
			oreMine			: "Mina",
			warehouse		: "Depozit",
			hideout			: "Ascunzatoare",
			miller			: "Morar",
			barracks		: "Cazarme",
			townWall		: "Zidul orasului",
			donkeyStable		: "Grajd",
			market			: "Piata",
			alchemist		: "Alchimist",
			residence		: "Rezidenta",
			goldsmith		: "Aurar",
			memorial		: "Comemorativ",
		},
		titleText: {
			level			: "Nivel",
			duration		: "durata",
		},
	},
	nl: {	languageName			: "Nederlands",		// thanks to Prophecy
		constructionTable: {
			buildingContract	: "Gebouw Contracten",
			buildingProgress	: "Bouw voortgang",
			duration		: "Duur",
			completion		: "Afronding",
			abort			: "Afbreken",
			timeColumn: {
				toDelete: {
					today	: "vandaag ",
					at	: "om ",
					clock	: " Uur",
					onThe	: "om ",
				},
				tomorrow	: "morgen",
			},
			forgetAboutPremium	: "Vergeet Premium account's gratis wachtrij. Je hebt tenslotte KA Mason geinstalleerd.",
			additionalCosts		: "Toegevoegde kosten door de KA Mason gebouwen wachtrij:",
			willBeRefunded		: "Wanneer geannuleerd, zullen de toegevoegde kosten van de KA Mason bouwlijst teruggegeven worden ;)",
			requirementsNotMet	: "Condities hoeven niet voldaan te worden",
		},
		buildingName: {
			castle			: "Kasteel",
			quarry			: "Groeve",
			sawmill			: "Zagerij",
			oreMine			: "Ertsmijn",
			warehouse		: "Warenhuis",
			hideout			: "Schuilplaats",
			miller			: "Molenaar",
			barracks		: "Barraken",
			townWall		: "Stadsmuur",
			donkeyStable		: "Ezel Stal",
			market			: "Markt",
			alchemist		: "Alchemist",
			residence		: "Paleis",
			goldsmith		: "Goudsmid",
			memorial		: "Monument",
		},
		listOfBuildings: {
			buildingTime		: "Bouwtijd:",
			requires		: "Benodigds:",
		},
		titleText: {
			level			: "Niveau",
			duration		: "duur",
		},
		buildTab			: "Bouw",
		masonSettingsTab		: "KA Mason instellingen",
		buildAll			: "Bouw Alles",
	},
	de: {	languageName			: "Deutsch",		// thanks to Andreas aka seandre@gmx.de (fixed by scriptkiddie )
		constructionTable: {
			buildingContract	: "Bauauftrag",
			buildingProgress	: "Baufortschritt",
			duration		: "Dauer",
			completion		: "Fertigstellung",
			abort			: "Abbruch",
			timeColumn: {
				toDelete: {
					today	: "heute ",
					at	: "um ",
					clock	: " Uhr",
					onThe	: "on the ",
				},
				tomorrow	: "Morgen",
			},
			forgetAboutPremium	: "Vergiss den Premiumaccount! Freies Bauen ist angesagt! Deswegen hast du <strong>KA Mason</strong> installiert!",
			additionalCosts		: "Zusätzliche von der KA Maurer-Bauwarteschlange verursachte Kosten:",
			willBeRefunded		: "Wenn du abbrichst, werden die zusätzlichen Kosten des KA Maurers, aus der Bauliste, zurückerstattet ;)",
			requirementsNotMet	: "Bedingungen sind nicht erfüllt ",
		},
		buildingName: {
			castle			: "Burg",
			quarry			: "Steinbruch",
			sawmill			: "Sägewerk",
			oreMine			: "Erzbergwerk",
			warehouse		: "Lagerhaus",
			hideout			: "Versteck",
			miller			: "Müller",
			barracks		: "Kaserne",
			townWall		: "Stadtmauer",
			donkeyStable		: "Eselzucht",
			market			: "Markt",
			alchemist		: "Alchemist",
			residence		: "Residenz",
			goldsmith		: "Goldschmiede",
			memorial		: "Denkmal",
		},
		listOfBuildings: {
			buildingTime		: "Bauzeit:",
			requires		: "Verlangt:",
		},
		titleText: {
			level			: "Größe",
			duration		: "dauer",
		},
		buildTab			: "Bauen",
		masonSettingsTab		: "KA Mason Einstellungen",
		buildAll			: "Alles Ausbauen",
		buildAllTitle			: "Alle Gebäude in die KA Mason Warteschlange einfügen",
		cancelAll			: "Alle abbrechen",
		cancelAllTitle			: "Entferne alle Gebäude aus der KA Mason Warteschlange",
		showAll				: "Alle Anzeigen",
		doNotShowAll			: "Ausblenden",
		showAllTitle			: "Siehe alle Gebäude in der Gebäudeliste",
		doNotShowAllTitle		: "Siehe nur Gebäude die schon gebaut wurden",
		acknowledgeChanges		: "Hinweis bestätigen",
		acknowledgeChangesTitle		: "Ausrufezeichen im Titelreiter entfernen",
		turnOnUCSBrowsingTitle		: "Einschalten, Durchsuchen aktuell Bauwarteschlange in Siedlungen",
		turnOffUCSBrowsingTitle		: "Ausschalten, Durchsuchen aktuell Bauwarteschlange in Siedlungen",
		options: {
			legend			: "KA Mason Einstellungenn",
			numberOfDays		: "Anzeige von Stunden bis zur \"Fertigstellung\" statt des genauen Datums",
			numberButNotTomorrow	: "Anzeige '+1' zur \"Fertigstellung\" statt 'Morgen'",
			summarizeMissingResources : "Die fehlenden Rohstoffe zusammen rechnen",
			showAllBuildings	: "Zeige alle Gebäude in der Liste",
			showAllLinksInPA	: "Erlauben Sie, jedes Gebäude zur KA Maurer-Warteschlange hinzuzufügen",
			removePremiumButtons	: "Premiumbuttons entfernen",
			automaticallyAddMiller	: "Automatisch hinzufügen von Müller in die Warteschlange, wenn Siedler benötigt werden",
			delayForRefresh		: "Zeitintervall zur Aktualiesierung der Seite (in minuten)",
			language		: "Sprachauswahl",
			automaticLanguage	: "Sprachauswahl Automatisch",
			apply			: "Speichern",
			checkForUpdate		: "Prüfe auf Update",
			limitPremiumQueue	: "Begrenzung auf Premium Bauleiste",
			noLimitPremiumQueue	: "Kein Limit",
			highlightRow		: "Markieren Sie Zeile unter dem Cursor in KA Mason Warteschlange",
			replaceTime		: "Verwenden Rechnerzeit statt Serverzeit",
			changeNotification	: "Benachrichtigt von Veränderungen in KA Mason Warteschlange (Ausrufezeichen im Seitentitel)",
			hideMaxLevelBuilding	: "Ausblenden der Gebäude bei maximalem Ausbau",
			dontRefresh		: "Nicht die Seite aktualisieren, wenn Gebäude Warteschlange voll ist",
			shiftWindow		: "Verdecken der Kopfseite bis zur Statuszeile"
		},
	},
	hu: {	languageName			: "Magyar",		// thanks to Dome (http://domenet.co.cc) Fordította: Dome (http://domenet.co.cc)
		constructionTable: {
			buildingContract	: "Építési szerződés",
			buildingProgress	: "Építés állapota",
			duration		: "Időtartam",
			completion		: "Befejezés",
			abort			: "Megszakít",
			timeColumn: {
				toDelete: {
					today	: "ma ",
					at	: "ekkor ",
					clock	: " Óra",
					onThe	: "on the ",
				},
				tomorrow	: "holnap",
			},
			forgetAboutPremium	: "Felejtsd el az ingyenes Prémium építési listát, hiszen telepítetted a KA Mason-t :)",
			additionalCosts		: "További költségek a KA Mason építési listán:",
			willBeRefunded		: "Ha megszakítod, a KA Mason kiegészítő költségeit vissza fogod kapni ;) .",
			requirementsNotMet	: "Nem elérhető",
		},
		buildingName: {
			castle			: "Vár",
			quarry			: "Kőbánya",
			sawmill			: "Fűrésztelep",
			oreMine			: "Ércbánya",
			warehouse		: "Raktár",
			hideout			: "Rejtekhely",
			miller			: "Molnár",
			barracks		: "Kaszárnya",
			townWall		: "Városfal",
			donkeyStable		: "Öszvéristálló",
			market			: "Piac",
			alchemist		: "Alkimista laboratórium",
			residence		: "Kastély",
			goldsmith		: "Aranyműves boltja",
			memorial		: "Emlékmű",
		},
		listOfBuildings: {
			buildingTime		: "Építési idő:",
			requires		: "Szükséges:",
		},
		titleText: {
			level			: "Szint",
			duration		: "Időtartam",
		},
		buildTab			: "Építés",
		masonSettingsTab		: "KA Mason beállítások",
		buildAll			: "Minden építése",
		options: {
			legend			: "KA Mason beállítások",
			numberOfDays		: "Napok számának mutatása a \"Befejezés\" oszlopon pontos dátum helyett",
			numberButNotTomorrow	: "'+1' mutatása a \"Befejezés\" oszlopon 'holnap' helyett",
			summarizeMissingResources : "Hiányzó nyersanyagok összegzése",
			showAllBuildings	: "Minden épület mutatása az építési listán (Vár)",
			showAllLinksInPA	: "Minden épület hozzáadásának engedélyezése a KA Mason listához Prémium alatt.",
			delayForRefresh		: "Lap automatikus frissítésének ideje (perc)",
			language		: "Nyelv",
			automaticLanguage	: "Automatikus nyelvfelismerés",
			apply			: "Beállítások alkalmazása",
		},
	},
	fr: {	languageName			: "Français",		// thanks to azukae09 and tititou36
		constructionTable: {
			buildingContract	: "Ordre de construction",
			buildingProgress	: "Progrès de construction",
			duration		: "Durée",
			completion		: "Achèvement",
			abort			: "Annuler",
			timeColumn: {
				toDelete: {
					today	: "aujourd'hui",
					at	: "à",
					clock	: " Horloge",
					onThe	: "dès le ",
				},
				tomorrow	: "demain",
			},
			forgetAboutPremium	: "Oubliez la liste de construction gratuite du compte Premium. Car vous avez installé KA Mason.",
			additionalCosts		: "Coûts additionnels dus à la file d'attente KA Mason:",
			willBeRefunded		: "Si annulé, les coûts additionnels de la liste de construction KA Mason seront remboursés ;)",
			requirementsNotMet	: "Les conditions ne sont pas remplies",
		},
		buildingName: {
			castle			: "Château",
			quarry			: "Carrière",
			sawmill			: "Scierie",
			oreMine			: "Mine de minerai",
			warehouse		: "Entrepôt",
			hideout			: "Cachette",
			miller			: "Moulin",
			barracks		: "Caserne",
			townWall		: "Rempart",
			donkeyStable		: "Élevage d'ânes",
			market			: "Marché",
			alchemist		: "Laboratoire",
			residence		: "Résidence",
			goldsmith		: "Orfèvrerie",
			memorial		: "Mémorial",
		},
		listOfBuildings: {
			buildingTime		: "temps de construction:",
			requires		: "Requis:",
		},
		titleText: {
			level			: "Niveau",
			duration		: "durée",
		},
		buildTab			: "Construire",
		masonSettingsTab		: "Paramètres KA Mason",
		buildAll			: "Tout construire",
		buildAllTitle			: "Ajouter toutes les constructions à la file d'attente KA Mason",
		cancelAll			: "Tout annuler",
		cancelAllTitle			: "Supprimer toutes les constructions de la file d'attente KA Mason",
		showAll				: "Tout montrer",
		doNotShowAll			: "Ne pas tout montrer",
		showAllTitle			: "Montrer toutes les constructions dans la liste des constructions",
		doNotShowAllTitle		: "Ne montrer que les bâtiments dont les pré-requis sont remplis dans la liste des constructions",
		acknowledgeChanges		: "Valider les changements",
		acknowledgeChangesTitle		: "Supprimer le point d'exclamation de la page de titre",
		turnOnUCSBrowsingTitle		: "Activer la navigation automatique entre les villages",
		turnOffUCSBrowsingTitle		: "Désactiver la navigation automatique entre les villages",
		options: {
			legend			: "Options KA Mason",
			numberOfDays		: "Afficher le nombre de jours dans la colonne \"Achèvement\" plutôt que la date exacte",
			numberButNotTomorrow	: "Afficher '+1' dans la colonne \"Achèvement\" plutôt que 'demain'",
			summarizeMissingResources : "Résumer les ressources manquantes",
			showAllBuildings	: "Montrer toutes les constructions dans la liste des constructions",
			showAllLinksInPA	: "Permettre l'ajout de chaque construction à la liste KA Mason avec un compte Premium",
			removePremiumButtons	: "Supprimer les boutons \"awesome\" Premium",
			automaticallyAddMiller	: "Ajouter automatiquement un moulin à la file d'attente si des villageaois sont nécessaires",
			delayForRefresh		: "temps de rafraichissement des pages (en minutes)",
			language		: "Langue",
			automaticLanguage	: "choix automatique",
			apply			: "Appliquer les options",
			checkForUpdate		: "Recherche de mise à jour",
			limitPremiumQueue	: "Limite à la file d'attente Premium",
			noLimitPremiumQueue	: "pas de limite",
			highlightRow		: "Mettre en surbrillance la ligne sous le pointeur de souris dans la file d'attente KA Mason",
			replaceTime		: "Utiliser l'heure de l'ordinateur à la place de l'heure du serveur",
			changeNotification	: "Notifier les changements dans la file d'attente KA Mason (point d'exclamation dans le titre de la page)",
			hideMaxLevelBuilding	: "Cacher les batiments au niveau maximal",
			dontRefresh		: "Ne pas rafraichir la page si la liste de construction est pleine",
			shiftWindow		: "Positionner la fenêtre du navigateur pour masquer l'entête de la page",
		},
	},
	it: {	languageName			: "Italiano",		// thanks to melo983
		constructionTable: {
			buildingContract	: "Incarico di costruzione",
			buildingProgress	: "Progresso delle costruzioni",
			duration		: "Durata",
			completion		: "Completamento",
			abort			: "Annulla",
			timeColumn: {
				toDelete: {
					today	: "oggi ",
					at	: "alle ",
					clock	: "",			//this word doesn't to be used to indicate a time in italian language
					onThe	: "il ",
				},
				tomorrow	: "domani",
			},
			forgetAboutPremium	: "Dimenticati della coda di costruzione illimitata dell'account Premium. Dopotutto hai KA Mason installato.",
			additionalCosts		: "Costi addizionali dovuti alla coda di costruzione KA Mason:",
			willBeRefunded		: "In caso di interruzione, i costi addizionali della coda di costruzione KA Mason saranno restituiti ;)",
			requirementsNotMet	: "Mancano i requisiti",
		},
		buildingName: {
			castle			: "Castello",
			quarry			: "Cava di pietra",
			sawmill			: "Segheria",
			oreMine			: "Miniera metallifera",
			warehouse		: "Magazzino",
			hideout			: "Nascondiglio",
			miller			: "Mugnaio",
			barracks		: "Caserma",
			townWall		: "Mura cittadine",
			donkeyStable		: "Allevamento d'asini",
			market			: "Mercato",
			alchemist		: "Alchimista",
			residence		: "Residenza",
			goldsmith		: "Oreficeria",
			memorial		: "Monumento",
		},
		listOfBuildings: {
			buildingTime		: "Tempo di costruz.:",
			requires		: "Richede:",
		},
		titleText: {
			level			: "Livello",
			duration		: "durata",
		},
		buildTab			: "Costruisci",
		masonSettingsTab		: "Settaggi KA Mason",
		buildAll			: "Costruisci tutti",
		buildAllTitle			: "Aggiungi tutti gli edifici alla coda di costruzione KA Mason",
		cancelAll			: "Cancella tutti",
		cancelAllTitle			: "Rimuovi tutti gli edifici dalla coda di costruzione KA Mason",
		showAll				: "Mostra tutti",
		showAllTitle			: "Mostra tutti gli edifici nella lista degli edifici",
		doNotShowAll			: "Non mostrare tutti",
		doNotShowAllTitle		: "Mostra soltanto gli edifici i cui requisiti sono stati già soddisfatti nella lista degli edifici",
		acknowledgeChanges		: "Cambiamenti verificati",
		acknowledgeChangesTitle		: "Il punto esclamativo verrà rimosso dal titolo della pagina",
		turnOnUCSBrowsingTitle		: "Abilita la navigazione tra gli insediamenti attualmente costruiti",
		turnOffUCSBrowsingTitle		: "Disabilita la navigazione tra gli insediamenti attualmente costruiti",
		options: {
			legend			: "Settaggi KA Mason",
			numberOfDays		: "Mostra numero di giorni nella colonna \"Completamento\" al posto della data esatta",
			numberButNotTomorrow	: "Mostra '+1' nella colonna \"Completamento\" al posto di 'domani'",
			summarizeMissingResources : "Riassumi le risorse mancanti",
			showAllBuildings	: "Mostra tutti gli edifici nella lista degli edifici",
			showAllLinksInPA	: "Permetti di aggiungere ogni edificio alla coda KA Mason in caso di account Premium",
			removePremiumButtons	: "Rimuovi i \"fantastici\" pulsanti Premium",
			automaticallyAddMiller	: "Aggiungi automaticamente Mugnaio alla coda se sono necessari coloni",
			delayForRefresh		: "Intervallo di refresh della pagina (in minuti)",
			language		: "Lingua",
			automaticLanguage	: "Scegli automaticamente",
			apply			: "Applica",
			checkForUpdate		: "Controlla aggiornamenti",
			limitPremiumQueue	: "Limite della coda di costruzione Premium",
			noLimitPremiumQueue	: "Nessun limite",
			highlightRow		: "Evidenzia righe al passaggio del cursore del mouse nella coda KA Mason",
			replaceTime		: "Usa orologio del computer invece di quello del server",
			changeNotification	: "Notifica dei cambiamenti nella coda KA Mason (punto esclamativo nel titolo della pagina)",
			hideMaxLevelBuilding	: "Nascondi gli edifici di livello massimo"
		},
	},
	ru: { languageName			: "Русский", 		// thanks to Sergeylo
		constructionTable: {
			buildingContract	: "Заказ на строительство",
			buildingProgress	: "Состояние строительства",
			duration		: "Продолжительность",
			completion		: "Завершение",
			abort			: "Отменить",
			timeColumn: {
				toDelete: {
					today	: "Сегодня ",
					at	: "в ",
					clock	: " часов",
					onThe	: "к ",
				},
				tomorrow	: "завтра",
			},
			forgetAboutPremium	: "Забудьте про Премиум-аккаунт с его бесплатной очередью строительства. Теперь есть KA Mason.",
			additionalCosts		: "Дополнительные траты от очереди KA Mason:",
			willBeRefunded		: "При отмене, дополнительные траты от KA Mason building вернутся ;)",
			requirementsNotMet	: "Не все условия выполнены",
		},
		buildingName: {
			castle			: "Замок",
			quarry			: "Карьер",
			sawmill			: "Лесопилка",
			oreMine			: "Шахта",
			warehouse		: "Склад",
			hideout			: "Убежище",
			miller			: "Мельница",
			barracks		: "Бараки",
			townWall		: "Городская стена",
			donkeyStable		: "Стойло",
			market			: "Рынок",
			alchemist		: "Алхимик",
			residence		: "Резиденция",
			goldsmith		: "Казна",
			memorial		: "Мемориал",
		},
		listOfBuildings: {
			buildingTime		: "Время строительства:",
			requires		: "Потребуется:",
		},
		titleText: {
			level			: "Уровень",
			duration		: "продолжительность",
		},
		buildTab			: "Строить",
		masonSettingsTab		: "Настройки KA Mason",
		buildAll			: "Строить всё",
		buildAllTitle			: "Добавить все стройки в очередь KA Mason",
		cancelAll			: "Отменить все",
		cancelAllTitle			: "Удалить все стройки из очереди KA Mason",
		showAll				: "Показать все",
		showAllTitle			: "Показать все постройки в списке",
		doNotShowAll			: "Не показывать все",
		doNotShowAllTitle		: "Показывать только здания, удовлетворяющие требованиям",
		acknowledgeChanges		: "Известные изменения",
		acknowledgeChangesTitle		: "Пометка изменений убирается из заголовка",
		turnOnUCSBrowsingTitle		: "Включить просмотр отстроенных поселений",
		turnOffUCSBrowsingTitle		: "Выключить просмотр отстроенных поселений",
		options: {
			legend			: "Опции KA Mason",
			numberOfDays		: "Отображать количество дней в колонке \"Завершение\" вместо реальной даты",
			numberButNotTomorrow	: "Отображать '+1' в колонке \"Завершение\" вместо 'завтра'",
			summarizeMissingResources : "Подсчитать недостающие ресурсы",
			showAllBuildings	: "Отобразить все постройки в списке",
			showAllLinksInPA	: "Позволить KA Mason добавлять в очередь при включённом Премиум-аккаунте",
			removePremiumButtons	: "Убрать лишние кнопки Премиум-аккаунта",
			automaticallyAddMiller	: "Автоматически добавлять мельницу в очередь при нехватке поселенцев",
			delayForRefresh		: "Интервал обновления страницы (в минутах)",
			language		: "Язык",
			automaticLanguage	: "авто",
			apply			: "Принять",
			checkForUpdate		: "Проверить обновления",
			limitPremiumQueue	: "Ограничить очередь Премиум-аккаунта",
			noLimitPremiumQueue	: "без ограничений",
			highlightRow		: "Подсвечивать строку очереди KA Mason при наведении",
			replaceTime		: "Использовать время браузера (вместо серверного)",
			changeNotification	: "Уведомлять об изменениях в очереди KA Mason (пометка в заголовке)",
			hideMaxLevelBuilding	: "Скрыть здания максимального уровня"
		},
	},
}

// initialize translation system
var caption = new tCaption (window.location.hostname, translations);

// PICTURES ***************************************************************************************************************
const arrowDown  = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%01oIDATx%9Cc%F8%FF%FF%3F%03%10%00)%CFi%0F%40%14H%C0%BE%EB6%83%CB%5C%10O%3A%FD%90%7C%CDU%90%18%08%A7%BFD%E20%40%F5%81%B0f%F3M(G%A6%E0l%E0%DC%A7%82%D1%5B\'O%9E%0C%128%F6%E4%3FB%19%100%3A-%07!%EB%99%10Q%84a%9A%A5g%2C%7B%EF%1Bt%DCE1%98!%F6%E1%96%5B%FF%B2%D7%BDO%5C%FE%9A%2Bz%17%8AQ%20V%EEC%B89%08%09%06%18%40%97%60%F5X%0D%B4%19%DDr%20H_%F9B%BE%F1%0E%AB%CFrtW5%EE%FA%00t%95%40%F8Z%84%AB%18%E2%0F(%17%9F%03%3A%09%E8O%A5%A4%D5%FC%B1%7B%18%D8%05%A1%3A%D8RO%D7%EE%FA%9A%B6%1A%E4%5C%06i%3B%14%3B4%1A%EE%CE9%FF%9FA%2F%13%DDU%20V%CA%E5%FFH%80%01%85%83%03%E0%D4%00%8C3%EFy%20%FFH%D6%DE%16%AE%B8%0A%F1%15%3E%0DJy\'%8A7%BD%01%06%BD%5E%DB%5D%60L%F2%85%AC%C4%AE%01n50%AE%FA%0F~v%9F%F6%C4e%EA%13%C7%89%0F%E0%C1%83%EC6h%EC%01C%04%18%81S%8E%FF%80%04J%D4%A2%97%C0%60%03%A1%85oX%03%D61%F0i%A3G%05%88%15%F7L%A4%F0%D2%FE%87%FF%81aY%B4%F9K%E5%F6%AF%22Y\'%18%94%82%F0%F9%01%C4%CF%7D%07%F4w%C0%9C%D7%0C%8E%13%D0%94b%D7%00%01b%81%B3%B0%8A%03%01%00%91R%F4%C2%AD%AE%A0%D4%00%00%00%00IEND%AEB%60%82";
const emptySpace = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%00%19IDATx%9Cc%F8%0F%06%0Cx(ZpF%25%C8%93%18%D5%40W%0D%00%81L%FD%1F%D5r%D3%1A%00%00%00%00IEND%AEB%60%82";
const arrowUp    = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%01xIDATx%9Cc%F8%0F%06%0C%40%EC8%F1%01%03%94%A7Yz%86%01%08%80L%91%C2K%95%DB%BFBUH%A7%1F%12%AE%B8%0A%E5%C0%01%88S%BB%EB%2B%83R%10%88%03%04%EE%D3%9E0%40%00P%40%BE%F1%0E%84%81%D0%E3%3D%EF%05%83%E3%04%14%FDl%A9%A7%A7%1C%FF%91%B8%FCu%E0%DC%A7%81%0B%DF0%F0i%23t(%E5%9D0%E8%B8%AB%D9%7C%13b%0EB%82%01%09%A0H%00%81X%E0%2Ct7%82%A8%DCw%01s%5E%C3%95C%25%18%E2%9E%ED%7F%F8%BFh%F3%17%91%AC%13%08%A3%18b%1Fn%B9%F5%2Fm%F5%FB%A8E%2F%81%AEb%0DX%07%F5%07%04%F4%1F%FC%EC2%F5%89%40%F8Z%B8%FDP%8D%C5%9B%DE%E8%B5%DD%E5%0BY%89%EE*%A0%B7%25ko%B3%FA%2C\'%C5%1F%08%87%E6%3EdH%B9%8C%ECt%2C%FE%83r%D2_j4%DC%3D%F6%E4%FF%9C%F3%FF%E5k%AE2%E8ebj%83Y%14%FB%10%18%F4%40%7F%02%230%7B%DD%7B%A0o%81q%00D%5C%D1%BB%18%A4%ED0%02*%FE%80L%C1Y%E5%E2s%F6%5D%B7%81%AAAq5%F7%A9%E7%B4%07JI%AB%05%A3%B7%F2%C7%EEap%99%CB%C0.8y%F2dt%CF%01%13T%E3%AE%0F%96%BD%F7%81%08%18%99%F0%60%C3%E9i%60RK_%F9%02%18%E9%C0%F4%03%F4%03%24%D4%D0%BC%81%C2atZ%CE%EA%B1%1AH2Z%CF%84%20%02%1A%FE%A3%06%3C%A6j%20%00%00%E2%26%F4%C2Q!z%E2%00%00%00%00IEND%AEB%60%82";
const stopIcon   = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%EF%00%EE%00%E9%BE%88%F0%E9%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%02%24IDATx%9Ccx%FF%EE%25%101%00%F1%FF%FF%FF%19%A0%BCo%8D%E9%AFR%A3A%BC%BF%B7%AF%FC%98%5C%F787%09%C4y%90%12%FD%3C%26b%87%BF%11T%1DT%F5%C3%D2%B2%0F%13%EA~t%97%BE%3B%7D%98%E1%FB%AA%05%FF%C1%60O%889%C3%A3%3D%9B%DE%B7%D6~%99%3F%17j%05%C8%8C%D2%D2%1F%87%F6%FE%3C%7D%F8Q~%EA%93%7D%DB%A0%12_%D7-%F9%D0%5D%F6%26.%18%82%BE%F46%1CM%0F%00I%DC%0E%F5%FA%90%1C%FA2%C2%07%88%9E%85%7B%7F%5D4%EF%D2%9C%0E%A8Q%AF%CE%1D9%9C%EE%BF7%D0%FC%D2%9CN%847%B0%22%90%C4%AB%C3%07%DEN%EA%FDy%F9%CC%97%CD%2B%2Fg%25%40%25%3E%5C%3C%F3y%D9%A2_3%DB%3E%F6V%FE%9CX%FBc%EB%F2S%A9%A1%20%89%FB%D5%E5%BFV%CD%81%3B%E9SY%D2%CB%BAr%90%C4%AD%B4%A4%1F%AD%F9%FFa%00%E8%B0%8F%B3%A7%82%24%1E%2C%9B%F7m%D5%C2w%A9%81P%E7F%06%1E%F67%86Z~%26%CE%EF%EB%D2%05%2F%93%A2%DE5%D7%5C%8F%09%B8%B5c9%C2%B9%D7%E6O%D8%17n%B3%2F%D9%ED%F5%D1%DDX%FC%F1%E1%EC%F1%E7kV%DD%AF%A9%BC%93%99q%2B3%EDNY%C1%C3U%8B%DF%9D%3F%8E%EE%3F%88%17%1F%E4%E6%7DZ%B3%F2%EF%9D%1B%BFv%AE%FD%B5h%C2%AF9%5D%BFW%CC%FEs%7C%E7%CB%AA%FC%B3%09%81%8F%F6nAhx%B6z%F9%AB%A6%9A%3FW%CE%02%15%7D%9FT%FB%AE%B3%E4%5Bs6%1C%7D%AEH%FA%B1n%F1%05%3F%DB%EB%0B\'A5%DC%CEI%FF%B9c%DD%AFIu%1FZ%10%FEG%0E%88w%99%B1%1F%E7L%DD%17l%0D%D5p%B3%24%EF%5Dw%C3%F7%09%B5%9F%8Bb%20%81%82%82%A2%FC%3E4U%3D%AA*%D9%9F%E0%06%D5%F0%FA%F2%A9%8By%09%8F%B3%12%BE%AE%5E%00%0C%F4W%D1%FE%A0%80%8C%F0%7D%16%EA%FD%2C%D4%FF%CB%C2%B9%D7%E2%83%F7DZ%BF%3F%B0%15%25%94%1E%EC%D9x%22)%F0L%A0%F5%8B%CA%92w%13%FB%80%E8Iy%C1%01%1F%A3%DD%116%B7%B6%AF%40%0F%25%E2%11%00%B3W%3A%AD%88%9B%83%D2%00%00%00%1EIDATx%9Cc%60%C0%0B%FE%E3%97%26B!%D1%26%60%E8%F8O%AE%01%04M%26%DA%5C%00m%E9%07%F9%12c%89%5D%00%00%00%00IEND%AEB%60%82";
const manAtWork  = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%12%08%02%00%00%01AiB%A8%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%03lIDATx%9CES%5Dh%1CU%14%3Ew%EE%9D%DF%FDI2%3B%3B%D9%DD%EE_%B2%89%BB%95%86R%15%11D%AD%95j%EAO%1FRJ%83%B4TP%A8%D8D4%05%F5%C5%1FbQP%14%11%7C%09E%C5\'%9F%AA%89%85%D26m)j%A5%E4E%0An(i1mPJm%95%D2%C6%EE%EE%DC%7B%8Fg%1Ab%86%CB%CC%E5%9C%FB%7D%E7%DC%EF%3B%03%ADe%EBv%ABG*%80%A8%93%F9p%B2%A1h%97O%C3%0F%DF%158%03%C0%B6%FB%E7%B5%10%EC%84%A15%80%09%C08%05%D1%DA9Z%1F%DE%D6M%A8%F8x%AB%9DA%AC%9C%9E%DD%80(%B0%E3%12%C8%C2%96W.zZ%26U%C7%81j%D5%04%C6%10S%A8%1C%AD%88%00%12o%BE%F3%88R%14b1%AD%01T%C9n%9E%1F%40Lj%CD%E0%F4%AF%B5HW%E8%183%D8%EC%A92%60%E4.%FE%5E%3D%7C%B40%3D%DD%BB%B04%40%80%B3%E7%02%3A%A8%24G%C5%E0%CAbN%08fA%17%C4%3C%D4%9DO%A4DM%AD%C5%EC%F2v%09%84Q%AFy%9C%F1e%D5%DBi%5B%3A%F2Q%9B%1D%25%E2%F4%D4%A1%FA%F6%A7%BDw\'%C3%5D%3B%BAdd_%5C%BA%2F%17%A4%5D%01s%E7j%F1%DD%A2%3B%09%8C%18%FE%EB%A3%B2%C6_K%8D%8E%A4%3A%D2%A2KDR%80%92%DE%E1%EF%FBf%8E%94%CE7%7B%86%EA%5E)%B0%14RG%20%B5%0DW%FF%F67n%0A%B9A%92%C1%CD%E5%22IF%20MW%26%CE%FD%FB%7C%2F)H%05%60%E6%5B%07%D2%A8c%15V%16%EC%D9%99%04%9E%F8h%EAa%0E%24O%E1%FFD%9C%DB%F6d%D7%DB%1F%D4%01%F8%2B%13%3D%11%9AJ%92%9A%96%94%AE%22M%B7%0C%5B\'%A6%C3%D1%17r%AF%8FU\'%C6R%88%09Db%8EK%02%B7%88%AAF8)%C9%A8%EC%A3%0Fe%C9%CA7%0E%14Q\'%20%ED%89%AF%BF*%8F%ED%0Bo%DD%F2%9Ex%CC\'%7B%E3%C5%8C%ED%23!%E9%CEu%C4Q%0ADgu%99%88%F6%99%B3E%DB%10%DCp%0D%B0%BF%F96%ADP(m%90%13Z%1A%1D%AA%18%89%B8%5B%89%D9%BD%7B%82%D8%DC%BB%8F%01%7C%A0%EC%CC%2F4%9A%0B%E1%E7%9F%96%7F%FC)%DF%8A%BA%A2%C8%C1%A8%5B%2B%83%94%A62JYpq%C1%FB%F2P%9F%23%C4%8B%E3%B5%C77%E7%D8%DD)%00%E6%D0%E7%B3O%02%EA%5E%AF%AA%85%18%BFWL%8E%D5A%EC%3E~%AA%E8%25%5D%9A%25%C1%5C3)%AA%F5%8Ci%8AJ%C1%FC%EDBQ%E3%9A%C8%2Bc%B7%86l%2F%F7%3F%B7%25%05%9C%B9%01%B9b%0Dm%CC%E4%B3%E6%03C%EE%D5k%25%ADm%D5%F1%A8C%AD%8DU%24%5BC%CA%3B%C1S%CF%DA%D4%DB%CCL%E3%D8%F1%7B%83%D0Ny%89%D1%E7%7B%DF%9F%2C%5D%BF%91C%24%A4%89%8AfB%D0%F8h%E9%C8v%96%221%F2%C2%25%BF2(*Y%E7%C6%E5u%97%96%FCuU%2Ba%C2%C9%D9%90%FE%92%E6%7Cv%FCe%FF%C4%D1%C1%B9%B9%C1%FD%2F%25%A7%BE%E8%8D4%C5m)%A9%B8%01%5B7gH%94%83%1Fg%FF%FA%E3%FEr%D9vS%FC%97%B9%7B(M%DA%2C%5E%E9%DB%BD7%C39i%9Ea%96%C7%04m%C4%83%1B%9C%9B%FF%D0%00%9Ap%F0%BD%EE%89W%7B%AEw%823%3F%A7G%9E%E1%CD%F9%02b%E9%E4%91%FC%A6%3Eh%94%A1Qg%8D%01X_%83F%0D%D6%F7%C7%EFz%3F%E4C%18%DE*%FE%03%D8%8B%BDJ%D0z%B3%BF%00%00%00%00IEND%AEB%60%82";
const repeatIt   = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%01%9AIDATx%9C%85R%CBj%C2P%10%F5o%8A%B9F%24u%11%05%C5%22%B8jU%24%8B%C4E%40%10l%C1%85%20%FE%84k%1F%AD%B8r%A3%92U%1FTlm%EB%03%8D%D7%D8R%A8b%FB5%EDIo0%BEJ%87!%B93g%E6%CE%9C%938%BE%7F%CD%F1%D7%EB%8C%9E%E1)%BF%CAf%40%86%C4%F9%E8%F4%3Ex%AD%02%AB%2C%DDOkK%AD%40%0B%01%1Ap%B8u%B7%8D%B4%E6-%EE%85%23%23b_z%AE%9F%AB%0B5%B5J)%AF%0AB%CF%D4c%02%BE%99%AF%FD%DEf%15%82.%84%8C%90g%F8%0B%A0%FD%E2%EEb%7D%23%D7%E7%EC%AB%60%99%DB%8C%D8%11%2B%A3%CA%D6%E2%FBf%02%DA%A7%86%99%98%8C%F9%D8%A2%BE%AC%5B%40%82%26%F2%93%BCY%B1%D4%24*%C9o%B2%09d%BB%D9%E3%E91k%AF%EA%D5%80%11%C0V%26%20vE%F2D%0E%CC(%8F%CA%8C*%B3p%3F%AC%5C%2B%D6%0C%88%06%0C%EA%99z%0CIs%DE%B4%D7%C5%FA%20%01*%5B%EBn%DA%D5%E2*%3F%CB\'\'I8%0E%08%D7P%ED%A3f7h%2BM%1AK%CA%9B%02%07%93Sz%0A%C7%81eTC%95%E7%F2%09%3D%B1%1A.%E7%97A%1A%8C%D0Hn%90%DB%19X4%8A%C8GgQ%B8W%F7Z%0D%FE%9E_0%04~%C0o%96V%C6%95%A3%9B%23%D2%23%FC3%CF%1C%A1%D5%00N%60%0D%CA%F8%11%F6%05%2B-J%8D%AF%C6.%E9x\'%0E%81%B8%81%F9%DD%D7m8%20D%92%0CH%EC%3E%B6%AB%12%E4D%1B%FB%D5%5C%13%17%9C%8DE%92)%7DX%D6%7F%ED%07%C2%A1%3D0%F4%F9%CCF%00%00%00%1EIDATx%9Cc%60%20%0E%FC\'K%8A%18%83%FFS%C3%14%22-%81s%FF%FF\'%CA%3E%00%CD%89%0B%F5%3C%FDJD%00%00%00%00IEND%AEB%60%82";
const deleteIt   = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%10%08%02%00%00%0113%82%C5%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%01%CCIDATx%9Cc%B8T%1B%F7%FF%FF%7F%06%20%FE%AF%C2%06%A6%80%BC%FBq%E6P%C1%7F%B9%19%0F%CA%FC%A1%9C%0B%A6%EC%40%F2%84%83%14%C3%830K%88%D2%2F%EB\'0%DC%F4%D2%B9%1Dc%F9%82%9F%01f%909%3F%D4%9C%7Fj%BC%40%EAE%9E%3B%88%F3%DCU%E7%7FU%C9%2B%07y%88%E4%C7y%25\'%24%E0Z%FE%FF%FF%D1%98%F8%DFK%FB%AF%0AT%1A*%F1%AC%22%FC%BF%BD%C6%EF%9E%BCg%AB*%EE%F01%20%24%BE%F23%FCG%02%97T%98%40%12%E7%9Du%FE%A3%82%2B-%99%0C%FFK%F3%FE%BB%9B%C2%85%5E%9A%89%1DwU%06k7%11%FB%A7%AE%04%A4%AF%C9%0B%FE%B0%B1B8%E6%8B*%EB%7F%07%DD%3F%1E%BA%08%0BA%81!%C3rC%9D%E1%AA%A20B%F4%A5%06%C3k%5E%10%E3%A4*%D3%BF%207%90%E8I%03%81%FFZ%3Cp%DB6%89%81%3D%F9%40%96%FD%83%95*%B2%CB%8E%F0%B31%BC%F6%B7%F8%DBV%F7%DF%DB%E1%8D%95%C2%7F%1C%E0b%80%C1.%3E%9ESA.%0C%2F%9B%12%BF%E8%88%FE%0Fu%FF%5B%99%FB%DFT%E7%B1%A9%16%5C%D1%87%9E%AC%C7%02%EC%8F%98%19%DE%B9%EA%A1%B8%19%08%EE%A4Z%7F%92%E5%FE%1F%EC%FAG%9B%EB%BD%1A%D7%7F%3E%A6%0F%A2%0C%8F%D2m%91-A%09L%20%F8h%CA%FF%DFZ%F0_%B8%F9%171%86%3Fm9h%B2%08%D5%0FSL%FE%C82%FC5V%7D%AD%CA%F1%B5%C0%FD%A2!%EF%3D%19%C6%B7%9A%D2%E8%AA%DFN.%B8%20%CF%F0%DFQ%11%18%B2%F7%23m%10%F6LN8.%C9p%95%0Da%22%C3%D3e%85Od%98%FF%EB(%BE%12d%00%05%0E%06%B8%11%A6%3AO%8A%F1uv%00%D4%EC%DB%D3%B3%8E%E7%7B%E2%0A%3E%088%DC%92%0A%24%01%3F%89%14!%14(%A3%93%00%00%00%0FIDATx%9Cc%60%18q%E0%3Fn)%00%1B%F3%01%00%1A%AA%FF%BA%00%00%00%00IEND%AEB%60%82";

const delayForReady = 10;					// delay in milliseconds for waitForReady's setTimeout
waitForReady(main, delayForReady);				// wait until document is ready and then call main()

// ************************************************************************************************************************
function main() {

villageID = getVillageID();					// get village's ID
if (villageID == noSettlement) return;				// we couldn't find village's ID

// initialize and read global options
globalOptions = new tOptions(window.location.hostname.toUpperCase() + " settings", SPRTR);
globalOptions.readOptions();

caption.setLanguage(globalOptions.forcedLanguage);		// force language

currSettlement.getSettInfo();					// read current settlement's attributes

gameVersion = new tGameVersion();

itIsModernStyle = modernStyle("mainBuild");			// it could be "mainBuildList" or "mainBuildModern"
itIsPremiumAccount = gameVersion.premiumAccount();

var listOfBuildings = getListOfBuildings(itIsModernStyle);	// find table of buildings
if (!listOfBuildings) return;					// if cannot find it - quit

var windowLocationHost = window.location.protocol + '//' + window.location.host;

const upperCaseHref = window.location.href.toUpperCase();	// convert href to upper case
var mParam = paramValue("M", upperCaseHref);			// read value of M parameter
if (mParam == "") mParam = BUILD;				// if empty set to BUILD
if (mParam != BUILD) return;					// we aren't building - demolishing perhaps?

// find one of original links to upgrade
var myLines;
if (itIsModernStyle)
	myLines = xpath(document, '//div[@class="button"]/a[contains(@href,"a=buildBuilding")]');	// modern styles
else	myLines = xpath(listOfBuildings, 'descendant::td/a[contains(@href,"a=buildBuilding")]');	// classic style
if (myLines.snapshotLength > 0) upgradeLink = myLines.snapshotItem(0).href;

const masonLabel = window.location.hostname.toUpperCase() + " " + villageID;	// label for get/set/deleteValue of building queue
const settsLabel = window.location.hostname.toUpperCase() + " " + "UCS";	// label for get/set/deleteValue of "Under Construction Settlements"

var constructionTable = getConstructionTable();					// find constructionTable
constructionQueue = new tConstructions(constructionTable, itIsPremiumAccount);	// create constructionQueue

// process "overdue"
if (constructionTable) {		// search for <span class="countdown" time="-4" reload="true">overdue</span>
	var mySpan = xpath(constructionTable, 'descendant::span[@class="countdown"]');
	if (mySpan.snapshotLength == 1) {
		mySpan = mySpan.snapshotItem(0);
		if (mySpan.hasAttribute("time"))
		if (parseInt(mySpan.getAttribute("time")) < 1) {
			window.location.href = window.location.href;
			return;
		}
	}
}

// add delay function
var delayFunction = setTimeout(function() { window.location.href = window.location.href; }, globalOptions.getDelayForRefresh());	// refresh page every "delayForRefresh" milliseconds

// find where to place construction table if the one doesn't exist
// first look for tabs' bar
var placeForCT = xpath(document, '//div[contains(@style,"img/tabs/menue_back.png")]');
if (placeForCT.snapshotLength == 1) placeForCT = placeForCT.snapshotItem(0);
else placeForCT = listOfBuildings;	// if there's no tabs' bar, place construction table before list of buildings
do {
	placeForCT = getPreviousSibling(placeForCT);
}
while (placeForCT && (placeForCT.nodeName != "BR"));
if (!placeForCT && !constructionTable) return;				// nowhere to place construction table

setCurrentLevels(listOfBuildings);					// find current level of buildings (constructionQueue MUST be created)
currSettlement.setWLevel();						// set level of warehouse

// initialize and read tUnderConstructionList BEFORE initializing and reading tWaitingQueue
UCSList = new tUnderConstructionList(settsLabel, SPRTR, SPRTRx);	// initialize "Under Construction Settlements" list
UCSList.readQueue();							// read "Under Construction Settlements" list

waitingQueue = new tWaitingQueue(masonLabel, SPRTR, SPRTRx);		// call setCurrentLevels before reading building queue (readQueue() -> checkLevel() -> constructionQueue.getMaxLevel)
waitingQueue.readQueue();						// read building queue
waitingQueue.findLevelTXT(itIsModernStyle, listOfBuildings);		// find Level string

if (waitingQueue.isFilled()) UCSList.putSett(villageID, currSettlement.name, currSettlement.x, currSettlement.y, false, currSettlement.wLevel);	// put settlement to UCS list
else UCSList.removeSett(villageID);					// remove settlement from UCS list
UCSList.saveQueue(false);						// save it

// modify "ressilist" panel for browsing through "Under Construction Settlements"
if (UCSList.isFilled()) {						// we're building something...
	// search for <table class="ressilist"><tbody>
	var myCell = xpath(document, '//table[@class="ressilist"]/tbody/tr/td[1]');
	if (myCell.snapshotLength == 1) {				// we found it
		myCell = myCell.snapshotItem(0);
		var fChild = getFirstChild(myCell);			// remember original first child
		var myImg = document.createElement("img");		// create <img
		myImg.src = manAtWork;
		myImg.style.border = "1px solid black";
		myImg.style.position = "relative";			// don't use verticalAlign, it'll move up remained items
		myImg.style.top = "2px";
		myImg.style.right = "1px";
		if (globalOptions.selectUCS) myImg.title = caption.getTranslation("turnOffUCSBrowsingTitle");
		else {
			myImg.title = caption.getTranslation("turnOnUCSBrowsingTitle");
			myImg.style.opacity = "0.3";
		}
		myImg.alt = myImg.title;

		var aNode = document.createElement("a");		// create <a href=...
		aNode.appendChild(myImg);				// insert <img to <a
		aNode.href = window.location.href;
		aNode.addEventListener("click", function() {
			globalOptions.selectUCS = !globalOptions.selectUCS;
			globalOptions.saveOptions();			// save options
			// switch to "UC" settlement if needed
			if (globalOptions.selectUCS && (UCSList.getSettIndex(villageID) < 0)) this.href = "game.php?village=" + UCSList.Queue[0].ID + "&s=build_main&m=build";
		}, true);
		myCell.insertBefore(aNode, myCell.firstChild);

		if (globalOptions.selectUCS) {				// we should browse through "Under Construction Settlements"
			var sChild = getNextSibling(fChild);
/*			it seemed like good idea - but it wasn't ;)
			if (UCSList.Queue.length == 1) {		// we're building only one settlement so jump to it
				if (villageID != UCSList.Queue[0].ID) window.location.href = "game.php?village=" + UCSList.Queue[0].ID + "&s=build_main&m=build";
			}
*/
			if (fChild.nodeName != "B") {			// if you've got only one settlement, there're no arrows
				var ix = UCSList.getPreviousSett(villageID);
				if (ix < 0) {				// no previous settlement
					if (fChild.nodeName == "A") {	// make IMG and replace A
						myImg = document.createElement("img");
						myImg.src = windowLocationHost + "/img/arrow_left_i.png";
						myImg.alt = "";
						fChild.parentNode.replaceChild(myImg, fChild);
					}
				}
				else {					// some previous settlement
					if (fChild.nodeName == "IMG") {	// make A and replace IMG
						aNode = document.createElement("a");
						aNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_left.png" alt="" />';
						aNode.href = window.location.href;
						fChild.parentNode.replaceChild(aNode, fChild);
					}
					else if (fChild.nodeName == "A") {
						fChild.href = bLink = "game.php?village=" + UCSList.Queue[ix].ID + "&s=build_main&m=build";
					}
				}
				ix = UCSList.getNextSett(villageID);
				if (ix < 0) {				// no next settlement
					if (sChild.nodeName == "A") {	// make IMG and replace A
						myImg = document.createElement("img");
						myImg.src = windowLocationHost + "/img/arrow_right_i.png";
						myImg.alt = "";
						sChild.parentNode.replaceChild(myImg, sChild);
					}
				}
				else {					// some next settlement
					if (sChild.nodeName == "IMG") {
						aNode = document.createElement("a");
						aNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right.png" alt="" />';
						aNode.href = window.location.href;
						sChild.parentNode.replaceChild(aNode, sChild);
					}
					else if (sChild.nodeName == "A") {
						sChild.href = fLink = "game.php?village=" + UCSList.Queue[ix].ID + "&s=build_main&m=build";
					}
				}
			}
		}

		// replace <b> with <span ... to enable positioning
		aNode = xpath(myCell, 'child::b');
		if (aNode.snapshotLength == 1) {			// we found it
			aNode = aNode.snapshotItem(0);
			fChild = document.createElement("span");
			fChild.style.fontWeight = "bold";
			fChild.style.position = "relative";
			fChild.style.bottom = "2px";
			while (aNode.hasChildNodes()) {			// copy all child nodes
				fChild.appendChild(aNode.firstChild.cloneNode(true));
				aNode.removeChild(aNode.firstChild);
			}
			myCell.replaceChild(fChild, aNode);
		}
	}
}

/*
document.onkeyup = function (e) {
	if (!e) e = window.event;
	switch (e.keyCode) {
		case 37:						// left arrow
			if (bLink != "") {
				var oldWindow = window;
				if (e.ctrlKey) {
					var newWindow = window.open(window.location.href, "_blank");
					newWindow.blur();
				oldWindow.focus();
				oldWindow.location.href = bLink;
				}
			}
			return (false);					// return "false" will avoid further events
		case 39:						// right arrow
			if (fLink != "") {
				if (e.ctrlKey) {
					var newWindow = window.open(fLink, "_blank");
					newWindow.focus();
				}
				else window.location.href = fLink;
			}
			return (false);					// return "false" will avoid further events
	}
	return;								//using "return" allows other attached events will execute
}
*/

// search for tabs "Build" and "Demolition"
myLines = xpath(document, '//div[contains(@style,"img/tabs/menue_back.png")]/table');
var myTable;
if (myLines.snapshotLength == 1) myTable = myLines.snapshotItem(0);
else {	// if there're no tabs, create it
	var divNode = document.createElement("div");			// create separator
	listOfBuildings.parentNode.insertBefore(divNode, listOfBuildings);
	var curCell = document.createElement("br");			// create <br>
	divNode.parentNode.insertBefore(curCell, listOfBuildings);
	divNode.style.backgroundImage = "url(img/tabs/menue_back.png)";
	divNode.style.backgroundPosition = "left";
	divNode.style.backgroundRepeat = "repeat-x";
	divNode.width = "100%";

	myTable = document.createElement("table");			// create tabs
	divNode.appendChild(myTable);
	myTable.cellSpacing = "0";
	myTable.cellPadding = "0";
	myTable.insertRow(0);
	curCell = myTable.rows[0].insertCell(0);
	curCell.innerHTML = '<img src="' + windowLocationHost + '/img/tabs/menue_s_left.png" >';
	curCell = myTable.rows[0].insertCell(1);
	curCell.style.backgroundImage = "url(img/tabs/menue_s_back.png)";
	curCell.innerHTML = '<a href="' + windowLocationHost + '/game.php?village=' + villageID + '&s=build_main&m=build">' + caption.getTranslation("buildTab") + '</a>';
	curCell = myTable.rows[0].insertCell(2);
	curCell.innerHTML = '<img src="' + windowLocationHost + '/img/tabs/menue_s_right.png" >';
}

// insert "settings tab"
var myRow = myTable.rows[0];
var myImg = getFirstChild(myRow.cells[myRow.cells.length-1]);
if (globalOptions.optionPage()) {
	//myImg = getFirstChild(myRow.cells[myRow.cells.length-1])
	getFirstChild(myRow.cells[0]).src = "/img/tabs/menue_n_left.png";
	myRow.cells[1].style.backgroundImage = "url(/img/tabs/menue_n_back.png)";
	if (myRow.cells.length > 3) getFirstChild(myRow.cells[2]).src = "/img/tabs/menue_nn_center.png";
	myImg.src = "/img/tabs/menue_ns_center.png";
}
else myImg.src = (myRow.cells.length > 3)?"/img/tabs/menue_nn_center.png":"/img/tabs/menue_sn_center.png";	// if selected demolition: /img/tabs/menue_sn_center.png
var newNode = myRow.insertCell(AT_THE_END);
newNode.style.backgroundImage = (globalOptions.optionPage())?"url(/img/tabs/menue_s_back.png)":"url(/img/tabs/menue_n_back.png)";
myImg = document.createElement("a");
myImg.href = "game.php?village=" + villageID + "&s=build_main&m=build";
myImg.innerHTML = caption.getTranslation("masonSettingsTab");
myImg.addEventListener("click", function() {
	globalOptions.optionVillage = villageID;
	globalOptions.saveOptions();
}, true);
newNode.appendChild(myImg);
newNode = myRow.insertCell(AT_THE_END);
myImg = document.createElement("img");
myImg.src = (globalOptions.optionPage())?"/img/tabs/menue_s_right.png":"/img/tabs/menue_n_right.png";
newNode.appendChild(myImg);

// remove premium buttons
if (globalOptions.removeAwesomePremiumButtons) {
	// <a href="#" class="awesome-button premium-button" onclick="overlay.show({type: 'build', eventId: 18214579}); return false;"><img src="img/premium/premium-crown-icon.png" width="16" height="16" onload="fixPNG(this);" /></a>
	var myButtons = xpath(document, '//a[contains(@class,"awesome-button") and contains(@class,"premium-button")]');
	for (var i = 0; i < myButtons.snapshotLength; i++) {
		var myButton = myButtons.snapshotItem(i);
		myButton.parentNode.removeChild(myButton)
	}
}

// add exclamation mark to page's title if something was changed
if (UCSList.isChanged(villageID) == true) {
	if (globalOptions.changeNotification)
	if (document.title.indexOf(exclamationMark) != 0) document.title = exclamationMark + " " + document.title;
}
else document.title = document.title.replace(exclamationMark+" ","");

if (globalOptions.optionPage()) {
	clearTimeout(delayFunction);					// no refresh on options' page

	removeAllChilds(listOfBuildings);				// remove list of buildings
	var pNode = listOfBuildings.parentNode;				// set pNode

	// Options
	var myNode = document.createElement("div");			// create div
	myNode.style.cssFloat = "left";					// set position
	myNode.style.margin = "0 100px 15px 0";
	myNode.style.backgroundImage = "url(img/layout/bg_table_cell2.jpg)";
	myNode.style.backgroundPosition = "left top";
	myNode.style.backgroundRepeat = "repeat-x";
	pNode.insertBefore(myNode, listOfBuildings);			// insert before former listOfBuildings
	pNode.removeChild(listOfBuildings);				// remove listOfBuildings itself
	var tmpNode = document.createElement("form");			// create form
	myNode.appendChild(tmpNode);					// insert it to div
	myNode = tmpNode;
	tmpNode.method = "post";
	tmpNode.action = window.location.href;
	tmpNode.name = OPTIONS_FORM_NAME;
	tmpNode = document.createElement("fieldset");			// create fieldset
	myNode.appendChild(tmpNode);					// insert it to form
	myNode = tmpNode;
	tmpNode.style.padding = "10px";
 	tmpNode.style.maxWidth = "820px";
	tmpNode.style.maxHeight = "342px";				// height of checkbox line is 17px

	tmpNode = document.createElement("legend");			// create legend
	myNode.appendChild(tmpNode);					// insert it to fieldset
	tmpNode.innerHTML = " " + caption.getTranslation("options.legend") + " ";

	// showNumberOfDays
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_NUMBER_OF_DAYS;
	tmpNode.checked = globalOptions.showNumberOfDays;
	tmpNode.addEventListener("click", function() {
		var iNode = document.getElementById(I_NUMBER_OR_TOMORROW);
		iNode.disabled = !this.checked;
		iNode = document.getElementById(D_NUMBER_OR_TOMORROW);
		iNode.style.color = (this.checked)?"":"DarkGray";
	}, true);
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.numberOfDays"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// showNumberInsteadOfTomorrow
	pNode = document.createElement("div");				// create div which will encapsulate input + text
	myNode.appendChild(pNode);					// append it to fieldset
	if (!globalOptions.showNumberOfDays) pNode.style.color = "DarkGray";
	pNode.id = D_NUMBER_OR_TOMORROW;
	pNode.style.position = "relative";
	pNode.style.left = "20px";
	pNode.style.margin = "0";
	tmpNode = document.createElement("input");			// create input
	pNode.appendChild(tmpNode);					// append it to div
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_NUMBER_OR_TOMORROW;
	tmpNode.checked = globalOptions.showNumberInsteadOfTomorrow;
	tmpNode.disabled = !globalOptions.showNumberOfDays;		// set disabled according to showNumberOfDays
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.numberButNotTomorrow"));
	pNode.appendChild(tmpNode);					// append it to div

	// showMissingResourcesIncrementaly
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_SUMMARIZE_MISSING;
	tmpNode.checked = globalOptions.showMissingResourcesIncrementaly;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.summarizeMissingResources"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// showAllBuildings
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_ALL_BUILDINGS;
	tmpNode.checked = globalOptions.showAllBuildings;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.showAllBuildings"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// showAllLinksInPA
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_ALL_LINKS_IN_PA;
	tmpNode.checked = globalOptions.showAllLinksInPA;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.showAllLinksInPA"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// automaticallyAddMiller
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_ADD_MILLER;
	tmpNode.checked = globalOptions.automaticallyAddMiller;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.automaticallyAddMiller"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// removeAwesomePremiumButtons
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_REMOVE_PREMIUM_BUTTONS;
	tmpNode.checked = globalOptions.removeAwesomePremiumButtons;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.removePremiumButtons"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// highlightRow
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_HIGHLIGHT_ROW;
	tmpNode.checked = globalOptions.highlightRow;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.highlightRow"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// replace server time
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_REPLACE_SERVER_TIME;
	tmpNode.checked = globalOptions.replaceServerTime;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.replaceTime"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// notifying about changes in KA Mason queue
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_CHANGE_SIGNAL;
	tmpNode.checked = globalOptions.changeNotification;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.changeNotification"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// hide buildings of maximum level
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_HIDE_MAX_LEVEL;
	tmpNode.checked = globalOptions.hideMaxLevelBuilding;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.hideMaxLevelBuilding"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// don't refresh if building queue is full
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_DONT_REFRESH;
	tmpNode.checked = globalOptions.dontRefreshOnFullQueue;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.dontRefresh"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// shift window up
	tmpNode = document.createElement("input");			// create input
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.type = "checkbox";
	tmpNode.value = "ON";
	tmpNode.id = tmpNode.name = I_SHIFT_WINDOW;
	tmpNode.checked = globalOptions.shiftWindow;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.shiftWindow"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// delayForRefresh
	tmpNode = document.createElement("select");			// create select
	myNode.appendChild(tmpNode);					// append it to div
	tmpNode.style.margin = "10 3 0 4";
	tmpNode.innerHTML = "<option" + ((globalOptions.delayForRefresh == 1)?" selected":"") + ">1</option><option" + ((globalOptions.delayForRefresh == 2)?" selected":"") + ">2</option><option" + ((globalOptions.delayForRefresh == 3)?" selected":"") + ">3</option><option" + ((globalOptions.delayForRefresh == 4)?" selected":"") + ">4</option><option" + ((globalOptions.delayForRefresh == 5)?" selected":"") + ">5</option><option" + ((globalOptions.delayForRefresh == 10)?" selected":"") + ">10</option>";
	tmpNode.size = "1";
	tmpNode.id = tmpNode.name = I_DELAY_FOR_REFRESH;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.delayForRefresh"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// forcedLanguage
	tmpNode = document.createElement("select");			// create select
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.style.margin = "10 3 0 4";
	tmpNode.innerHTML = "<option" + ((globalOptions.automaticLanguage())?" selected":"") + ">" + caption.getTranslation("options.automaticLanguage") + "</option>";
	var languageSet = caption.getLanguageList();
	for (var lng in languageSet)
		tmpNode.innerHTML += '<option value="' + lng + '"'+ ((globalOptions.forcedLanguage == lng)?" selected":"") + ">" + languageSet[lng] + "</option>";
	tmpNode.size = "1";
	tmpNode.id = tmpNode.name = I_FORCED_LANGUAGE;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.language"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// limitPremiumQueue
	tmpNode = document.createElement("select");			// create select
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode.style.margin = "10 3 0 4";
	tmpNode.innerHTML = '<option value="0"' + ((globalOptions.limitPremiumQueue == 0)?" selected":"") + ">" + caption.getTranslation("options.noLimitPremiumQueue") + "</option>";
	for (var i = 3; i < 11; i++)
		tmpNode.innerHTML += "<option" + ((globalOptions.limitPremiumQueue == i)?" selected":"") + ">" + i + "</option>";
	tmpNode.size = "1";
	tmpNode.id = tmpNode.name = I_LIMIT_PREMIUM_QUEUE;
	tmpNode = document.createTextNode(" " + caption.getTranslation("options.limitPremiumQueue"));
	myNode.appendChild(tmpNode);					// append it to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	myNode.appendChild(versionParagraph(scriptVersion, scriptID));	// append version to fieldset
	tmpNode = document.createElement("br");				// create <br>
	myNode.appendChild(tmpNode);					// append it to fieldset

	// "Apply options" button
	tmpNode = document.createElement("a");
	tmpNode.style.margin = "10 3 0 4";
	tmpNode.href = window.location.href;
	tmpNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + caption.getTranslation("options.apply");
	tmpNode.addEventListener("click", function() {
		var iNode = document.getElementById(I_NUMBER_OF_DAYS);
		if (iNode) globalOptions.showNumberOfDays = iNode.checked;
		iNode = document.getElementById(I_SUMMARIZE_MISSING);
		if (iNode) globalOptions.showMissingResourcesIncrementaly = iNode.checked;
		iNode = document.getElementById(I_ALL_BUILDINGS);
		if (iNode) globalOptions.showAllBuildings = iNode.checked;
		iNode = document.getElementById(I_ALL_LINKS_IN_PA);
		if (iNode) globalOptions.showAllLinksInPA = iNode.checked;
		iNode = document.getElementById(I_DELAY_FOR_REFRESH);
		if (iNode) globalOptions.delayForRefresh = iNode.options[iNode.selectedIndex].value;
		iNode = document.getElementById(I_FORCED_LANGUAGE);
		if (iNode) globalOptions.forceLanguage(iNode.options[iNode.selectedIndex].value);
		iNode = document.getElementById(I_NUMBER_OR_TOMORROW);
		if (iNode) globalOptions.showNumberInsteadOfTomorrow = iNode.checked;
		iNode = document.getElementById(I_REMOVE_PREMIUM_BUTTONS);
		if (iNode) globalOptions.removeAwesomePremiumButtons = iNode.checked;
		iNode = document.getElementById(I_LIMIT_PREMIUM_QUEUE);
		if (iNode) globalOptions.limitPremiumQueue = iNode.options[iNode.selectedIndex].value;
		iNode = document.getElementById(I_HIGHLIGHT_ROW);
		if (iNode) globalOptions.highlightRow = iNode.checked;
		iNode = document.getElementById(I_ADD_MILLER);
		if (iNode) globalOptions.automaticallyAddMiller = iNode.checked;
		iNode = document.getElementById(I_REPLACE_SERVER_TIME);
		if (iNode) globalOptions.replaceServerTime = iNode.checked;
		iNode = document.getElementById(I_CHANGE_SIGNAL);
		if (iNode) globalOptions.changeNotification = iNode.checked;
		iNode = document.getElementById(I_HIDE_MAX_LEVEL);
		if (iNode) globalOptions.hideMaxLevelBuilding = iNode.checked;
		iNode = document.getElementById(I_DONT_REFRESH);
		if (iNode) globalOptions.dontRefreshOnFullQueue = iNode.checked;
		iNode = document.getElementById(I_SHIFT_WINDOW);
		if (iNode) globalOptions.shiftWindow = iNode.checked;

		globalOptions.optionVillage = noSettlement;
		globalOptions.saveOptions();				// save options
	}, true);
	myNode.appendChild(tmpNode);					// append it to fieldset

	// "check for update" button
	tmpNode = document.createElement("a");
	tmpNode.style.cssFloat = "right";
	tmpNode.href = window.location.href;
	tmpNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + caption.getTranslation("options.checkForUpdate");
	tmpNode.addEventListener("click", function() {
		GM_deleteValue("update");				// Buzzy's autoUpdater label
	}, true);
	myNode.appendChild(tmpNode);					// append it to fieldset
}
else {	// test if there's some "hidden" building and add it to list of buildings
	myLines = getBuildingsList(listOfBuildings);
	if (myLines.snapshotLength < buildingsNumber) {			// yes - add something :)
		for (var i = 0; i < buildingsNumber; i++) {
			var myBuilding = structure[buildingsIdx[i]];
			if (myBuilding.requirements == undefined) continue;	// continue, if there are no requirements

			var numNotMet = 0;
			if (!globalOptions.showAllBuildings) {
				for (var j = 0; j < buildingsIdx.length; j++) {		// test all requirements
					var xBld = buildingsIdx[j];			// building type
					var xLvl = myBuilding.requirements[j];		// required level

					if ((xLvl > 0) && (structure[xBld].curLevel < xLvl))
					if (constructionQueue.isBuilt(xBld, xLvl) == false) {
						numNotMet++;
						break;
					}
				}
			}

			var buildingToAdd = structure[buildingsIdx[i]];
			if ((numNotMet != 0) || (buildingToAdd.curLevel >= 0)) continue;	// some requirements aren't met nor are built OR building is already built

			if (itIsModernStyle) {
				var outerBox = document.createElement("div");
				outerBox.className = "box";
				listOfBuildings.appendChild(outerBox);

				var innerBox = document.createElement("div");
				innerBox.className = "image";
				innerBox.innerHTML = '<img src="' + windowLocationHost + buildingToAdd.smallImg + '" />';
				outerBox.appendChild(innerBox);

				innerBox = document.createElement("div");
				innerBox.className = "name";
				innerBox.innerHTML = '<a href="game.php?village=' + villageID +'&s=build_' + buildingToAdd.buildParam + '"><b>' + caption.getTranslation(buildingToAdd.indexToTexty) + '</b></a>';	// <br />(Level 27 + 1)';
				outerBox.appendChild(innerBox);

				innerBox = document.createElement("div");
				innerBox.className = "description";
				innerBox.innerHTML = "";
				outerBox.appendChild(innerBox);

				innerBox = document.createElement("div");
				innerBox.className = "needs";
				innerBox.innerHTML = caption.getTranslation("listOfBuildings.requires");
				outerBox.appendChild(innerBox);

				innerBox = document.createElement("div");
				innerBox.className = "res1";
				innerBox.innerHTML = amountToString(buildingToAdd.limit["wood"][0], resourcesList["wood"].amount);
				outerBox.appendChild(innerBox);

				innerBox = document.createElement("div");
				innerBox.className = "res2";
				innerBox.innerHTML = amountToString(buildingToAdd.limit["stone"][0], resourcesList["stone"].amount);
				outerBox.appendChild(innerBox);

				innerBox = document.createElement("div");
				innerBox.className = "res3";
				innerBox.innerHTML = amountToString(buildingToAdd.limit["iron"][0], resourcesList["iron"].amount);
				outerBox.appendChild(innerBox);

				innerBox = document.createElement("div");
				innerBox.className = "workers";
				innerBox.innerHTML = amountToString(buildingToAdd.limit["workers"][0], resourcesList["workers"].amount);
				outerBox.appendChild(innerBox);

				innerBox = document.createElement("div");
				innerBox.className = "buildtime";
				innerBox.innerHTML = caption.getTranslation("listOfBuildings.buildingTime") + " " + buildingToAdd.buildTime[0];
				outerBox.appendChild(innerBox);

				innerBox = document.createElement("div");
				innerBox.className = "button";
				innerBox.innerHTML = '<table class="noborder" cellspacing="0" cellpadding="0"><tr><td style="color:#C2C2C2; font-size:9px; line-height:10px; height:18px; width:185px;" align="center" valign="middle">' + caption.getTranslation("constructionTable.requirementsNotMet") + '</td></tr></table>';
				outerBox.appendChild(innerBox);
			}
			else {								// classic style
				var outerTable = myLines.snapshotItem(0);
				var innerTable = document.createElement("table");
				outerTable = outerTable.cloneNode(true);		// clone including child nodes
				removeAllChilds(outerTable.rows[0].cells[1]);		// destroy old inner table
				outerTable.rows[0].cells[1].appendChild(innerTable);	// append new inner table
				listOfBuildings.rows[1].cells[0].appendChild(outerTable);

				innerTable.cellSpacing = "0";
				innerTable.cellPadding = "0";
				innerTable.style.width = "790px";

				innerTable.insertRow(0);
				var xCell = innerTable.rows[0].insertCell(BT_buildings);
				xCell.className = "nowrap";
				xCell.style.width = "180px";
				xCell.innerHTML = '<img src="' + windowLocationHost + buildingToAdd.littleImg + '"> <a href="game.php?village=' + villageID +'&s=build_' + buildingToAdd.buildParam + '">' + caption.getTranslation(buildingToAdd.indexToTexty) + '</a>';

				xCell = innerTable.rows[0].insertCell(BT_demandStone);
				xCell.className = "nowrap";
				xCell.style.width = "76px";
				xCell.innerHTML = '<img src="' + windowLocationHost + resourcesList["stone"].img + '"> ' + amountToString(buildingToAdd.limit["stone"][0], resourcesList["stone"].amount);

				xCell = innerTable.rows[0].insertCell(BT_demandWood);
				xCell.className = "nowrap";
				xCell.style.width = "76px";
				xCell.innerHTML = '<img src="' + windowLocationHost + resourcesList["wood"].img + '"> ' + amountToString(buildingToAdd.limit["wood"][0], resourcesList["wood"].amount);

				xCell = innerTable.rows[0].insertCell(BT_demandOre);
				xCell.className = "nowrap";
				xCell.style.width = "76px";
				xCell.innerHTML = '<img src="' + windowLocationHost + resourcesList["iron"].img + '"> ' + amountToString(buildingToAdd.limit["iron"][0], resourcesList["iron"].amount);

				xCell = innerTable.rows[0].insertCell(BT_demandSettlers);
				xCell.className = "nowrap";
				xCell.style.width = "46px";
				xCell.innerHTML = '<img src="' + windowLocationHost + resourcesList["workers"].img + '"> ' + amountToString(buildingToAdd.limit["workers"][0], resourcesList["workers"].amount);

				xCell = innerTable.rows[0].insertCell(BT_buidingTime);
				xCell.style.width = "90px";
				xCell.style.textAlign = "center";
				xCell.innerHTML = buildingToAdd.buildTime[0];

				xCell = innerTable.rows[0].insertCell(BT_upgradeToLevel);
				xCell.className = "notice_small";
				xCell.style.textAlign = "center";
				xCell.innerHTML = caption.getTranslation("constructionTable.requirementsNotMet");
			}
		}
	}

	// should we hide useless information?
	if (globalOptions.hideMaxLevelBuilding) {
		var outerTables = getBuildingsList(listOfBuildings);
		for (var i = 0; i < outerTables.snapshotLength; i++)
		if (itIsModernStyle == true) {
			var xDiv = outerTables.snapshotItem(i);
			var myType = getBuildingType(getFirstChild(xDiv));	// first child should be <div class="image">
			if (myType && (waitingQueue.getActLevel(myType) >= structure[myType].maxLevel)) {
				xDiv.parentNode.removeChild(xDiv);
			}
			else removeMultipleBR(xDiv);
		}
		else {
			var oTable = outerTables.snapshotItem(i);
			var myLine = getInnerTable(oTable).rows[0];	// first line of inner table
			var myType = getBuildingType(myLine.cells[BT_buildings]);
			if (myType && (waitingQueue.getActLevel(myType) >= structure[myType].maxLevel)) {
				oTable.parentNode.removeChild(oTable);
			}
		}
	}

	// add "(Don't) Show All" button
	var myButton = document.createElement("div");			// create button
	myButton.className = "smallButton";				// set button's properties
	myButton.title = caption.getTranslation((globalOptions.showAllBuildings)?"doNotShowAllTitle":"showAllTitle");
	myButton.style.cssFloat = "right";
	myButton.style.margin = "2px 0px 0px 0px";
	myButton.style.padding = "3px 3px 0px 3px";
	myButton.innerHTML = '<a href="' + getBuildMainLink() + '">' + caption.getTranslation((globalOptions.showAllBuildings)?"doNotShowAll":"showAll") + '</a>';
	myButton.addEventListener("click", function() {
		globalOptions.showAllBuildings = !globalOptions.showAllBuildings;
		globalOptions.saveOptions();				// save options
	}, true);
	myTable.parentNode.insertBefore(myButton, myTable);		// insert button

	// add "Cancel all" button
	if (waitingQueue.isFilled() == true) {
		var myButton = document.createElement("div");		// create button
		myButton.className = "smallButton";			// set button's properties
		myButton.title = caption.getTranslation("cancelAllTitle");
		myButton.style.cssFloat = "right";
		myButton.style.margin = "2px 5px 0px 0px";
		myButton.style.padding = "3px 3px 0px 3px";
		myButton.innerHTML = '<a href="' + getBuildMainLink() + '">' + caption.getTranslation("cancelAll") + '</a>';
		myButton.addEventListener("click", function() {
			// remove all waiting structures from queue
			waitingQueue.removeAllBuildings();		// remove everything
			waitingQueue.saveQueue();			// save it

			UCSList.removeSett(villageID);			// remove settlement from UCS list
			UCSList.saveQueue(false);				// save it
		}, true);
		myTable.parentNode.insertBefore(myButton, myTable);	// insert button
	}

	// add "Build all" button
	if (thereIsSomethingToUpgrade(listOfBuildings)) {
		var myButton = document.createElement("div");		// create button
		myButton.className = "smallButton";			// set button's properties
		myButton.title = caption.getTranslation("buildAllTitle");
		myButton.style.cssFloat = "right";
		myButton.style.margin = "2px 5px 0px 0px";
		myButton.style.padding = "3px 3px 0px 3px";
		myButton.innerHTML = '<a href="' + getBuildMainLink() + '">' + caption.getTranslation("buildAll") + '</a>';
		myButton.addEventListener("click", function() {
			// insert all "buildable" structures to queue
			var outerTables = getBuildingsList(listOfBuildings);
			for (var i = 0; i < outerTables.snapshotLength; i++)
			if (itIsModernStyle == true) {
				var xDiv = getFirstChild(outerTables.snapshotItem(i));	// it should be <div class="image">
				var myType = getBuildingType(xDiv);
				if (myType && (waitingQueue.getMaxLevel(myType) < structure[myType].maxLevel)) {
					waitingQueue.putBuilding(myType, false, true, -1);	// overtakeble & automatically
				}
			}
			else {
				var innerTable = getInnerTable(outerTables.snapshotItem(i));
				var myLine = getInnerTable(outerTables.snapshotItem(i)).rows[0];// first line of inner table
				var myType = getBuildingType(myLine.cells[BT_buildings]);
				if (myType && (waitingQueue.getMaxLevel(myType) < structure[myType].maxLevel)) {
					waitingQueue.putBuilding(myType, false, true, -1);	// overtakeble & automatically
				}
			}

			waitingQueue.saveQueue();			// save it

			UCSList.putSett(villageID, currSettlement.name, currSettlement.x, currSettlement.y, false, currSettlement.wLevel);	// put settlement to UCS list
			UCSList.saveQueue(false);			// save it
		}, true);
		myTable.parentNode.insertBefore(myButton, myTable);	// insert button
	}

	// add "Acknowledge changes" button
	if (globalOptions.changeNotification)
	if (UCSList.isChanged(villageID) == true) {
		var myButton = document.createElement("div");		// create button
		myButton.className = "smallButton";			// set button's properties
		myButton.title = caption.getTranslation("acknowledgeChangesTitle");
		myButton.style.cssFloat = "right";
		myButton.style.margin = "2px 5px 0px 0px";
		myButton.style.padding = "3px 3px 0px 3px";
		myButton.innerHTML = '<a href="' + getBuildMainLink() + '">' + caption.getTranslation("acknowledgeChanges") + '</a>';
		myButton.addEventListener("click", function() {
			UCSList.clearChange(villageID);			// clear settlement's "change" flag in UCS list
			UCSList.saveQueue(true);			// save it
GM_log("UCS ClearEventListener: "+villageID);
		}, true);
		myTable.parentNode.insertBefore(myButton, myTable);	// insert button
	}
}

var constructionTableHasSpace = new Boolean();
constructionTableHasSpace = constructionQueue.hasSpace();

getSupplies();								// find out resources' amount

if (globalOptions.shiftWindow) window.scrollTo(0, 153);			// shift browser's window up to hide unnecessary information

// process construction table and KA Mason table
if (waitingQueue.isFilled() == true) {					// some building's waiting
	if (constructionTableHasSpace == true) {			// is room in Construction Table?
		// try to put something from KA waiting queue to construction queue
		for (var i = 0; i < waitingQueue.Queue.length; i++)
		if ((i == 0) || (waitingQueue.canOvertake(i))) {
			// add Miller to the front if there isn't enough of workers
			if (globalOptions.automaticallyAddMiller && (waitingQueue.Queue[i].settlersNeeded() == true) && (waitingQueue.Queue[i].resourcesNeeded() == false) && (waitingQueue.Queue[i].requirementsMet() == true)) waitingQueue.putBuilding(bMiller, false, false, i);

			if ((waitingQueue.Queue[i].readyForBuilding() == true) && (upgradeLink != "")) {
				var tmpBuild = waitingQueue.Queue[i].build;
				if ((waitingQueue.Queue[i].buildAutomatically() == false) || (waitingQueue.Queue[i].getLevel() >= structure[waitingQueue.Queue[i].build].maxLevel)) {
					waitingQueue.removeBuilding(i);	// remove i-th item
					waitingQueue.saveQueue();	// save modified queue

					// remove settlement from UCS list if no more buildings're waiting
					if (waitingQueue.isFilled() != true) UCSList.removeSett(villageID);
				}

				UCSList.setChange(villageID);		// remark change for this settlement's queue in UCS list
GM_log("UCS processed queue: "+villageID);
				UCSList.saveQueue(true);			// save it

				// construct new window.location.href
				window.location.href = replaceValue(upgradeLink, "build", tmpBuild);
				break;
			}
		}

		// cancel refreshing if there's only memorial in building queue
		if ((waitingQueue.Queue.length == 1) && (waitingQueue.Queue[0].build == bMemorial)) clearTimeout(delayFunction);
	}
	else {								// there's no room in Construction Table
		// clear timeout if user chose so
		if (globalOptions.dontRefreshOnFullQueue) clearTimeout(delayFunction);

		if (constructionQueue.thereIsCT == true) {
			var lastRow = constructionTable.rows[constructionTable.rows.length-1];
			if (lastRow.cells.length > 1) {
				lastRow = constructionTable.insertRow(-1);
				lastRow.insertCell(-1);
				lastRow.cells[0].colSpan = constructionTable.rows[0].cells.length;
			}
			lastRow.cells[0].innerHTML = '<a href="' + window.location.href.replace(window.location.search, "?village=" + villageID + "&s=premium") + '"> '+ getTextPremiumAccount() + '</a>';
		}
	}

	if (constructionTable == null) {			// if constructionTable doesn't exist create it
		constructionTable = createConstructionTable(placeForCT);
		constructionTableHasSpace = true;
	}

	if (constructionTableHasSpace == true) {
		if (constructionTable != null) {
			var lastRow = constructionTable.insertRow(-1);
			lastRow.insertCell(0);
			lastRow.cells[0].colSpan = constructionTable.rows[0].cells.length;
			lastRow.cells[0].innerHTML = caption.getTranslation("constructionTable.additionalCosts") + '<b>0%</b><br><span class="text_info">' + caption.getTranslation("constructionTable.willBeRefunded") + '</span>';
		}
	}
	else {
		var rowBeforeLast = constructionTable.rows[constructionTable.rows.length-2];
		if (rowBeforeLast.cells.length < 2) {
			rowBeforeLast.cells[0].colSpan = 3;
			rowBeforeLast.insertCell(0);
			rowBeforeLast.cells[0].colSpan = 2;
		}
		else {
			rowBeforeLast = constructionTable.insertRow(constructionTable.rows.length-1);
			rowBeforeLast.insertCell(-1);
			rowBeforeLast.cells[0].colSpan = constructionTable.rows[0].cells.length;
		}
		rowBeforeLast.cells[0].innerHTML = caption.getTranslation("constructionTable.additionalCosts") + '<b>0%</b><br><span class="text_info">' + caption.getTranslation("constructionTable.willBeRefunded") + '</span>';
	}

	// modify constructionTable
	var finishTime = "";						// completion time of the last building
	var numCells = constructionTable.rows[0].cells.length;

	var castleFutureLevel = structure[bCastle].curLevel;
	var lastRow = constructionTable.insertRow(constructionTable.rows.length);
	var lng = caption.getAutomaticLanguage();
	for (var i = 0; i < constructionTable.rows.length; i++) {
		for (var j = 0; j < constructionTable.rows[i].cells.length; j++) constructionTable.rows[i].cells[j].style.width = "";
		// set align=center for last column
		if (constructionTable.rows[i].cells.length >= numCells) constructionTable.rows[i].cells[numCells-1].style.textAlign = "center";

		// remove unnecessary texts from timeColumn and modify construction time
		if (constructionTable.rows[i].cells.length >= CT_completion) {
			var timeCell = constructionTable.rows[i].cells[CT_completion];
			timeCell.style.textAlign = "center";
			if (i > 0) {					// ignore header
				// remove unnecessary text
				for (var _txt in lng.constructionTable.timeColumn.toDelete) {
					timeCell.innerHTML = timeCell.innerHTML.replace(lng.constructionTable.timeColumn.toDelete[_txt], "");
				}
				if (i == 1) {				// modify completion time for first construction
					if (globalOptions.replaceServerTime) {
						var firstDuration = getMilliseconds(getFirstChild(constructionTable.rows[i].cells[CT_duration]).innerHTML);
						finishTime = timeCell.innerHTML = getFinishTime(getComputerTime(), firstDuration);
					}
// try to make it text-independent - remember O'Clock !!!
					else finishTime = timeCell.innerHTML = getFinishTime(timeCell.innerHTML, 0);
				}
				else {					// modify times for remaining constructions
					var tDuration;
					if (constructionQueue.Queue[i-1].isDemolition()) tDuration = getMilliseconds(constructionTable.rows[i].cells[CT_duration].innerHTML);
					else {
						tDuration = constructionQueue.Queue[i-1].getDuration(castleFutureLevel);
						constructionTable.rows[i].cells[CT_duration].innerHTML = millisecondsToString(tDuration, true);
					}
					finishTime = timeCell.innerHTML = getFinishTime(finishTime, tDuration);
				}
				if (constructionQueue.Queue[i-1].getType() == bCastle)
				if (constructionQueue.Queue[i-1].isDemolition()) --castleFutureLevel;
				else ++castleFutureLevel;
			}
		}
	}
	// set new width of columns
	constructionTable.rows[0].cells[CT_buildingContract].style.width = "190px";
	constructionTable.rows[0].cells[CT_buildingprogress].style.width = "250px";
	constructionTable.rows[0].cells[CT_duration].style.width = "100px";
//		constructionTable.rows[0].cells[CT_completion].style.width = "210px";
	constructionTable.rows[0].cells[CT_abort].style.width = "100px";

	// append waiting buildings underneath construction table
	var workersCurrentNumber = structure[bMiller].special.value[structure[bMiller].curLevel-1];
	var workersFutureNumber = workersCurrentNumber;			// find out numbers of workers
	for (var i = constructionQueue.Queue.length-1; i >= 0; i--) {
		if (constructionQueue.Queue[i].getType() == bMiller) {
			workersFutureNumber = structure[bMiller].special.value[constructionQueue.Queue[i].getLevel()-1];
			break;
		}
	}
	castleFutureLevel = constructionQueue.getMaxLevel(bCastle);
	for (var i = 0; i < waitingQueue.Queue.length; i++) {
		var lastRow = constructionTable.insertRow(constructionTable.rows.length);

		for (var j = 0; j < numCells; j++) {			// insert cells
			var xCell = lastRow.insertCell(j);
			if (globalOptions.highlightRow) {
				xCell.addEventListener("mouseover", function() {
					var TR = this.parentNode;
					for (var i = 0; i < TR.cells.length; i++)
						TR.cells[i].style.backgroundImage = "url(img/layout/bg_table_head.png)";
				}, true);
				xCell.addEventListener("mouseout", function() {
					var TR = this.parentNode;
					for (var i = 0; i < TR.cells.length; i++)
						TR.cells[i].style.backgroundImage = "url(img/layout/bg_table_cell.jpg)";
				}, true);
			}
		}

		lastRow.cells[CT_buildingContract].innerHTML = '<img src="' + waitingQueue.Queue[i].getImg() + '" /> ' + caption.getTranslation(structure[waitingQueue.Queue[i].getType()].indexToTexty) + " ("+waitingQueue.levelTXT+" "+waitingQueue.Queue[i].getLevel()+")";

		if (waitingQueue.Queue[i].requirementsMet() == true) {
			var innerTXT = '<table class="noborder" cellpadding="0" cellspacing="0" width="100%"><colgroup><col width="72" span="3" /><col /></colgroup><tbody><tr>';
			for (var j = 0; j < resources.length; j++) {	// create innerHTML
				var rsrc = resources[j];
				var needed = waitingQueue.Queue[i].getAmount(rsrc);
				var presentAmount = resourcesList[rsrc].amount;
				if (globalOptions.showMissingResourcesIncrementaly)
					resourcesList[rsrc].missing += needed;
				else	resourcesList[rsrc].missing = needed;
				innerTXT += '<td class="nowrap">' + ((resourcesList[rsrc].missing>presentAmount)?'<img src="' + windowLocationHost + resourcesList[rsrc].img + '" />' + amountToLesserString(resourcesList[rsrc].missing, presentAmount, presentAmount+((rsrc == "workers")?workersFutureNumber-workersCurrentNumber:0)):" ") + '</td>';
			}
			lastRow.cells[CT_buildingprogress].innerHTML = innerTXT + '</tr></tbody></table>';
		}
		else {
			lastRow.cells[CT_buildingprogress].className = "notice_small";
			lastRow.cells[CT_buildingprogress].style.textAlign = "center";
			lastRow.cells[CT_buildingprogress].style.verticalAlign = "middle";
			lastRow.cells[CT_buildingprogress].innerHTML = caption.getTranslation("constructionTable.requirementsNotMet");
		}
		if (waitingQueue.Queue[i].getType() == bMiller) workersFutureNumber = waitingQueue.Queue[i].getWorkersFutureNumber();

		var tDuration = waitingQueue.Queue[i].getDuration(castleFutureLevel);
		if (waitingQueue.Queue[i].getType() == bCastle) {
			if (waitingQueue.Queue[i].buildAutomatically()) castleFutureLevel = structure[bCastle].maxLevel;
			else ++castleFutureLevel;
		}
		lastRow.cells[CT_duration].innerHTML = millisecondsToString(tDuration, true);
		lastRow.cells[CT_duration].style.textAlign = "center";
		// add time
		if (i > 0) finishTime = constructionTable.rows[constructionTable.rows.length-2].cells[CT_completion].innerHTML;
		lastRow.cells[CT_completion].innerHTML = getFinishTime(finishTime, tDuration);
/*
		if (finishTime == "") {
			var stNode = getServerTimeNode();
			if (stNode) {
				var tickCount = Math.round(parseInt(stNode.getAttribute("time")) + tDuration/1000);
				lastRow.cells[CT_completion].innerHTML = ((dFinish != "")?dFinish+" ":"") + '<span id="RxR_buildTime" class="countup" time="' + tickCount + '">' + millisecondsToString(tFinish, true) + "</span>";
				// use "Location hack" to insert node to timersUp array
				location.href = "javascript:(" + function() {
					var sNode = document.getElementById("RxR_buildTime");
					if (sNode) timersUp.push(sNode);
				} + ")()";
			}
		}
*/
		lastRow.cells[CT_completion].style.textAlign = "center";
		lastRow.cells[CT_abort].style.textAlign = "center";

		var aHref = window.location.href.replace(window.location.search, "?village=" + villageID + "&s=build_main");
		var aNode;

		if (i < waitingQueue.Queue.length-1) {
			aNode = document.createElement("a");		// <a href=...
			aNode.innerHTML = '<img src="' + arrowDown + '" alt="" />';
			aNode.href = aHref;
			aNode.id = RxR_down + i;
			aNode.addEventListener("click", function() {
				var number = 1*(this.id.replace(RxR_down, ""));	// what's the number?
				waitingQueue.moveBuildingDown(number);		// move number-th item down
				waitingQueue.saveQueue();			// save modified queue
			}, true);
		}
		else {
			aNode = document.createElement("img");		// <img src=...
			aNode.src = arrowDown;
			aNode.alt = "";
			aNode.style.visibility = "hidden";
		}
		lastRow.cells[4].appendChild(aNode);			// append node
		aNode = document.createTextNode(" ");
		lastRow.cells[4].appendChild(aNode);			// append node

		aNode = document.createElement("a");			// <a href=...
		aNode.innerHTML = '<img src="' + deleteIt + '" alt="" />';
		aNode.href = aHref;
		aNode.id = RxR_delete + i;
		aNode.addEventListener("click", function() {
			var number = 1*(this.id.replace(RxR_delete, ""));	// what's the number?
			waitingQueue.removeBuilding(number);			// remove number-th item
			waitingQueue.saveQueue();				// save modified queue

			if (waitingQueue.isFilled() != true) {		// no more building's waiting
				UCSList.removeSett(villageID);		// remove settlement from UCS list
				UCSList.saveQueue(false);		// save it
			}
		}, true);
		lastRow.cells[4].appendChild(aNode);			// append link
		aNode = document.createTextNode(" ");
		lastRow.cells[4].appendChild(aNode);			// append node

		if (i > 0) {
			aNode = document.createElement("a");		// <a href=...
			aNode.innerHTML = '<img src="' + arrowUp + '" alt="" />';
			aNode.href = aHref;
			aNode.id = RxR_up + i;
			aNode.addEventListener("click", function() {
				var number = 1*(this.id.replace(RxR_up, ""));	// what's the number?
				waitingQueue.moveBuildingUp(number);		// move number-th item up
				waitingQueue.saveQueue();			// save modified queue
			}, true);
		}
		else {
			aNode = document.createElement("img");		// <img src=...
			aNode.src = arrowUp;
			aNode.alt = "";
			aNode.style.visibility = "hidden";
		}
		lastRow.cells[4].appendChild(aNode);			// append node
		aNode = document.createTextNode(" ");
		lastRow.cells[4].appendChild(aNode);			// append node

		aNode = document.createElement("a");			// <a href=...
		aNode.innerHTML = '<img src="' + stopIcon + '" alt="" />';
		aNode.href = aHref;
		aNode.id = RxR_overtake + i;
		aNode.addEventListener("click", function() {
			var number = 1*(this.id.replace(RxR_overtake, ""));	// what's the number?
			waitingQueue.changeOvertaking(number);			// change overtaking of number-th item
			waitingQueue.saveQueue();				// save modified queue
		}, true);
		lastRow.cells[4].appendChild(aNode);			// append node
		aNode = getFirstChild(aNode);				// get image
		if (waitingQueue.Queue[i].isOvertakeble()) aNode.style.opacity = "0.2";
		aNode = document.createTextNode(" ");
		lastRow.cells[4].appendChild(aNode);			// append node

		aNode = document.createElement("a");			// <a href=...
		aNode.innerHTML = '<img src="' + repeatIt + '" alt="" />';
		aNode.href = aHref;
		aNode.id = RxR_repeat + i;
		aNode.addEventListener("click", function() {
			var number = 1*(this.id.replace(RxR_repeat, ""));	// what's the number?
			waitingQueue.changeAutobuilding(number);		// change autobuilding of number-th item
			waitingQueue.saveQueue();				// save modified queue
		}, true);
		lastRow.cells[4].appendChild(aNode);			// append node
		aNode = getFirstChild(aNode);				// get image
		if (!waitingQueue.Queue[i].buildAutomatically()) aNode.style.opacity = "0.2";
	}
}
else {	// no building's waiting for construction
	if (!itIsPremiumAccount)
	if (constructionQueue.thereIsCT == true)			// there is the Construction Table
	// if there's space or we're demolish (e.g. there's no space but many rows)
	if (constructionTableHasSpace == true || (constructionTable.rows[constructionTable.rows.length-1].cells.length > CT_abort)) {
		var lastLine = constructionTable.insertRow(-1);		// insert row at the end
		lastLine.insertCell(0);
		lastLine.cells[0].colSpan = CT_abort+1;
		lastLine.cells[0].innerHTML = caption.getTranslation("constructionTable.additionalCosts") + '<b>0%</b><br><span class="text_info">' + caption.getTranslation("constructionTable.willBeRefunded") + '</span>';
	}
	else {
		var rowBeforeLast = constructionTable.rows[constructionTable.rows.length-2];
		rowBeforeLast.cells[0].colSpan = 3;
		rowBeforeLast.insertCell(0);
		rowBeforeLast.cells[0].colSpan = 2;
		rowBeforeLast.cells[0].innerHTML = caption.getTranslation("constructionTable.additionalCosts") + '<b>0%</b><br><span class="text_info">' + caption.getTranslation("constructionTable.willBeRefunded") + '</span>';
		constructionTable.rows[constructionTable.rows.length-1].cells[0].innerHTML = '<a href="' + window.location.href.replace(window.location.search, "?village=" + villageID + "&s=premium") + '"> '+ getTextPremiumAccount() + '</a>';
	}
}

// insert links
if (!globalOptions.optionPage()) {
	var myLines = getBuildingsList(listOfBuildings);
	if (itIsModernStyle) {
	// <div class="button"><table class="noborder" cellspacing="0" cellpadding="0"><tr><td style="color:#C2C2C2; font-size:9px; line-height:10px; height:18px; width:185px;" align="center" valign="middle">Suroviny dostupné zajtra v 14:36:07 hodín</td></tr></table></div>
	// <div class="button"><a href="game.php?village=60434&amp;s=build_main&amp;a=buildBuilding&amp;p=bdb3&amp;build=stone" style="color:#F7D48E; position:relative; top:2px;">Zvýšiť na úroveň 8</a></div>

		for (var i = 0; i < myLines.snapshotLength; i++) {
			var myNodes = xpath(myLines.snapshotItem(i), 'child::div[@class="button"]');	// find <div class="button">
			if (myNodes.snapshotLength == 1) {
				var thereIsNoLink = getFirstChild(myNodes.snapshotItem(0));
				thereIsNoLink = (thereIsNoLink == null) || (thereIsNoLink.nodeName != "A");
				var myNode = getFirstChild(myLines.snapshotItem(i));		// it should be <div class="image">
				var myType = getBuildingType(myNode);

				if (myType &&
				    (waitingQueue.getMaxLevel(myType) < structure[myType].maxLevel) &&
				    (!itIsPremiumAccount || globalOptions.showAllLinksInPA || thereIsNoLink)) {
					myNode = getFirstChild(myNodes.snapshotItem(0));	// <table or <a
					if (myNode.nodeName == "TABLE") {
						var myLine = myNode.rows[0];			// first line of table
						var newNode = document.createElement("td");	// create new cell
						newNode.style.textAlign = "right";
						newNode.style.verticalAlign = "top";
						newNode.appendChild(createLink(myType));	// create and append link
						myLine.appendChild(newNode);
					}
					else if (myNode.nodeName == "A") {
						var newTable = document.createElement("table");	// create new table
						newTable.insertRow(0);				// insert row and 2 cells
						newTable.className = "noborder";
						newTable.cellSpacing = "0";
						newTable.cellPadding = "0";
						newTable.width = "100%";
						newTable.rows[0].insertCell(0);
						newTable.rows[0].insertCell(1);
						newTable.rows[0].cells[0].style.textAlign = "center";
						newTable.rows[0].cells[0].appendChild(myNode.cloneNode(true));
						newTable.rows[0].cells[1].style.textAlign = "right";
						newTable.rows[0].cells[1].verticalAlign = "top";
						newTable.rows[0].cells[1].padding = "0px";
						newTable.rows[0].cells[1].width = "15px";
						newTable.rows[0].cells[1].appendChild(createLink(myType));	// create and append link
						myNode.parentNode.replaceChild(newTable, myNode);	// replace <a with <table
					}
				}
			}
		}
	}
	else for (var i = 0; i < myLines.snapshotLength; i++) {
		var myLine = getInnerTable(myLines.snapshotItem(i)).rows[0];		// first line of inner table
		var myType = getBuildingType(myLine.cells[BT_buildings]);
		if (myType && (waitingQueue.getMaxLevel(myType) < structure[myType].maxLevel)) {
			var thereIsNoLink = null;
			if (myLine.cells.length > BT_upgradeToLevel) thereIsNoLink = getFirstChild(myLine.cells[BT_upgradeToLevel]);
			thereIsNoLink = (thereIsNoLink == null) || (thereIsNoLink.nodeName != "A");

			if (!itIsPremiumAccount || globalOptions.showAllLinksInPA || thereIsNoLink) {
				var newNode = document.createElement("td");		// create new cell
				newNode.style.textAlign = "right";
				newNode.style.verticalAlign = "top";
				newNode.padding = "0px";
				newNode.width = "15px";
				newNode.appendChild(createLink(myType));		// create and append link
				myLine.appendChild(newNode);
			}
		}
	}
}

globalOptions.optionVillage = noSettlement;				// invalidate option page to not to stuck here forever ;
globalOptions.saveOptions();

} // DO NOT TOUCH!! -> function main() {

// FUNCTIONS *************************************************************************************************************

function versionParagraph (ver, ID) {
	var pNode = document.createElement("p");			// create paragraph

	var aNode = document.createElement("a");			// create link to userscripts.org
	aNode.href="http://userscripts.org/scripts/show/" + ID;
	aNode.style.fontWeight = "bold";
	aNode.alt = aNode.title = "KingsAge Mason @ userscripts.org";
	aNode.target = "_blank";
	aNode.innerHTML = "v." + ver;					// set the version

	pNode.appendChild(aNode);
	pNode.style.cssFloat = "right";
	pNode.style.fontWeight = "bold";
	return (pNode);
}

function thisIsDemolition (_cell) {
	return (getBuildingLevel(_cell) == 0);
}

function thereIsSomethingToUpgrade (_LoB) {				// _LoB = listOfBuildings
	var outerTables = getBuildingsList(_LoB);
	for (var i = 0; i < outerTables.snapshotLength; i++)
	if (itIsModernStyle == true) {
		var xDiv = getFirstChild(outerTables.snapshotItem(i));	// it should be <div class="image">
		var myType = getBuildingType(xDiv);
		if (myType && (waitingQueue.getMaxLevel(myType) < structure[myType].maxLevel)) return (true);
	}
	else {
		var innerTable = getInnerTable(outerTables.snapshotItem(i));
		var myLine = getInnerTable(outerTables.snapshotItem(i)).rows[0];// first line of inner table
		var myType = getBuildingType(myLine.cells[BT_buildings]);
		if (myType && (waitingQueue.getMaxLevel(myType) < structure[myType].maxLevel)) return (true);
	}
	return (false);
}

function getVillageID () {
	var vID = paramValue("VILLAGE", window.location.href.toUpperCase());	// get village's ID
	if (isNaN(vID)) {
		vID = noSettlement;
		var aLogoutNode = xpath(document, '//a[contains(@href,"a=logout")]');	// get all links to logout
		if (aLogoutNode.snapshotLength > 0) {
			vID = paramValue("VILLAGE", aLogoutNode.snapshotItem(0).href);
			if (isNaN(vID)) vID = noSettlement;
		}
	}
	return (vID);
}

function getNumberOfDays (_date) {					// returns number of day between today and _day
	var today = new Date();
	today.setHours(0); today.setMinutes(0); today.setSeconds(0);	// ignore time
	_date.setHours(0); _date.setMinutes(0); _date.setSeconds(0);

	return (Math.round(Math.abs(today.getTime()-_date.getTime())/MS_OF_DAY));
}

function getFinishTime (_finish, _duration) {				// _finish is hh:mm:ss
	const errDate = "???";						// _duration is number of milliseconds
	const tomorrowSubstitution = "+1";
	_finish = trimStr(_finish);
	if (_finish == "") return (" ");
	var tFinish = getMilliseconds(exctractTime(_finish)) + _duration;
	var dFinish = exctractDate(_finish);
	var numberOfDays = Math.floor(tFinish / MS_OF_DAY);
	var tomorrowText = caption.getOriginalText("constructionTable.timeColumn.tomorrow");
	if (numberOfDays > 0) {
		tFinish %= MS_OF_DAY;
		// process dFinish
		if ((numberOfDays < 2) && (dFinish == "")) dFinish = tomorrowText;
		else {
			var d = new Date();
			if ((dFinish == "") || (dFinish == tomorrowText)) {
				d.setDate(d.getDate()+numberOfDays+((dFinish != "")?1:0));
				if (globalOptions.showNumberOfDays) dFinish = "+" + getNumberOfDays(d);
				else dFinish = d.getDate() + "." + (d.getMonth()+1) + ".";
			}
			else if (globalOptions.showNumberOfDays) {
				var dd = parseInt(dFinish);		// exctract number of days
				dd += 1*numberOfDays;
				dFinish = "+" + dd;
			}
			else {
				var dd = parseInt(dFinish);		// exctract day
				if (!isNaN(dd)) {
					var iDot = dFinish.indexOf(".");
					if (iDot > 0) {			// exctract month
						var mm = parseInt(dFinish.substr(iDot+1));
						if (!isNaN(mm)) {
							d.setFullYear(d.getFullYear(), mm-1, dd);
							d.setDate(d.getDate()+numberOfDays);
							if (globalOptions.showNumberOfDays) dFinish = "+" + getNumberOfDays(d);
							else dFinish = d.getDate() + "." + (d.getMonth()+1) + ".";
						}
						else dFinish = errDate;
					}
					else dFinish = errDate;
				}
				else dFinish = errDate;
			}
		}
	}
	if (!globalOptions.displayNumberNotTomorrow()) {
		if (dFinish == tomorrowSubstitution) dFinish = tomorrowText;
	}
	else if (globalOptions.showNumberOfDays) dFinish = dFinish.replace(tomorrowText, tomorrowSubstitution);

	return ((dFinish != "")?dFinish+" ":"") + millisecondsToString(tFinish, true);
}

function getRealTime (_B, _L, _C) {				// returns building time for structure _B at level _L (_L is from range 1..maxLevel)
	if ((_L < 1) || (_L-- > structure[_B].maxLevel)) return(0);	// _C is level of currently built Castle
	var castle = structure[bCastle];
	var curLevel = castle.curLevel - 1;
	var maxLevel = castle.maxLevel - 1;
	if ((--_C < curLevel) || (_C > maxLevel)) _C = curLevel;
	return (getMilliseconds(structure[_B].buildTime[_L])*castle.special.value[_C]/castle.special.value[maxLevel]);
}

function millisecondsToString (_MS, add0) {
	function two (x) { return (((x>9)?"":"0") + x); }

	_MS = Math.round(_MS / 1000);				// milliseconds -> seconds
	var txt = two(_MS % 60);				// get seconds and convert to string
	_MS = Math.floor(_MS / 60);				// seconds -> minutes
	txt = two(_MS % 60) + timeSeparator + txt;		// get minutes and convert to string
//	return (((add0 && (_MS < 600))?'<span style="visibility: hidden">0</span>':"") + Math.floor(_MS / 60) + timeSeparator + txt);	// get hours and combine the string
	return (((add0 && (_MS < 600))?"0":"") + Math.floor(_MS / 60) + timeSeparator + txt);	// get hours and combine the string
}

function getMilliseconds (str) {				// str is time in format hh:mm:ss
	var x = str.split(timeSeparator);
	return (1000*(1*x[2]+60*(1*x[1]+60*1*x[0])));
}

function getTextPremiumAccount () {				// forget about Premium Account
	return (caption.getTranslation("constructionTable.forgetAboutPremium") + ' <img src="/img/forum/smilies/cool.png" alt="" />');
}

function createConstructionTable (_P2I) {			// _P2I = place to insert
	if (_P2I == null) return (null);			// _P2I is first <br> before list of buildings
	var numColls = 5
	var newTable = document.createElement("table");
	newTable.className = "borderlist";
	newTable.width = "820";
	var newLine = newTable.insertRow(0);
	for (var i = 0; i < numColls; i++) newLine.appendChild(document.createElement("th"));

	newLine.cells[0].innerHTML = caption.getTranslation("constructionTable.buildingContract");
	newLine.cells[1].style.width = "205px";
	newLine.cells[1].innerHTML = caption.getTranslation("constructionTable.buildingProgress");
	newLine.cells[2].style.width = "100px";
	newLine.cells[2].style.textAlign = "center";
	newLine.cells[2].innerHTML = caption.getTranslation("constructionTable.duration");
	newLine.cells[3].style.width = "200px";
	newLine.cells[3].innerHTML = caption.getTranslation("constructionTable.completion");
	newLine.cells[4].innerHTML = caption.getTranslation("constructionTable.abort");

	_P2I.parentNode.insertBefore(newTable, _P2I);		// insert table
	newLine = document.createElement("br");			// and one <br> after CT
	_P2I.parentNode.insertBefore(newLine, _P2I);
	newLine = document.createElement("br");			// and one <br> before CT
	_P2I.parentNode.insertBefore(newLine, newTable);
	return (newTable);
}

function getBuildingsList(_LoB) {
	return ((itIsModernStyle)?xpath(_LoB, 'child::div[(@class="box") or (@class="boxDone")]'):xpath(_LoB.rows[1].cells[0], 'child::table[@class="noborder"]'));
}

function getInnerTable(outerTable) {
	return (getFirstChild(outerTable.rows[0].cells[1]));
}

function getBuildingType(_cell) {
	var myImg = getFirstChild(_cell);			// it should be <img

	// find the type of building - http://s3.kingsage.org/img/buildings/iron.png
	var r_e = /\/([a-z]{1,})\.png$/i;			// pattern: <string>.png (classic style + constructionTable of modern style)
	var myType = myImg.src.match(r_e);
	if (myType) return (((myType.length > 1) && (structure[myType[1]] != undefined))?myType[1]:null);

	r_e = /\/([a-z]{1,})(\d{1})\.png$/i;			// pattern: <string>1.png (list of buildings of modern styles)
	myType = myImg.src.match(r_e);
	return ((myType && (myType.length > 1) && (structure[myType[1]] != undefined))?myType[1]:null);
}

function getBuildingLevel(_cell) {				// set 0 for building in list but not built yet
	var r_e = /\((\D{1,}) (\d{1,})\)/;			// pattern: (<non_digit> <digit>)
	var _match = _cell.innerHTML.match(r_e);
	if (_match) return (1*((_match.length == 3)?_match[2]:0));

	// in modern style search also for (Level 5 + 2)
	r_e = /\((\D{1,}) (\d{1,}) \+ (\d{1,})\)/;	// pattern: (<non_digit> <digit> + <digit>)
	_match = _cell.innerHTML.match(r_e);
	return (1*((_match && (_match.length == 4))?_match[2]:0));
}

function setCurrentLevels(_LoB) {					// set current level for all buildings
	var outerTables = getBuildingsList(_LoB);
	for (var i = 0; i < outerTables.snapshotLength; i++) {
		if (itIsModernStyle == true) {
			var xDiv = getFirstChild(outerTables.snapshotItem(i));	// it should be <div class="image">
			var buildingType = getBuildingType(xDiv);
			xDiv = getNextSibling(xDiv);			// it should be <div class="name">
			if (buildingType) structure[buildingType].curLevel = getBuildingLevel(xDiv);
		}
		else {
			var innerTable = getInnerTable(outerTables.snapshotItem(i));
			if (innerTable) {
				var buildingType = getBuildingType(innerTable.rows[0].cells[0]);
				if (buildingType) structure[buildingType].curLevel = getBuildingLevel(innerTable.rows[0].cells[BT_buildings]);
			}
		}
	}
}

function getSupplies () {
	for (var i = 0; i < 3; i++) resourcesList[resources[i]].amount = getAmount(document.getElementById(resources[i]));

	resourcesList[resources[3]].amount = -1;
	var fnd = "";
	if (gameVersion.compareWith("2.2.8") == cLOWER)
		fnd = '//table[@class="ressilist"]/tbody/tr/td[3]/span';
	else    fnd = '//div[@class="villageInfobar"]/div[@class="freeSettlers"]/span';
	var myNodes = xpath(document, fnd);
	if (myNodes.snapshotLength == 1)
		resourcesList[resources[3]].amount = getAmount(myNodes.snapshotItem(0));
}

function getAmount(node) {
	var amount = -1;
	if (node) {
		var txt = node.innerHTML;
		amount = (txt.indexOf('class="zero"') < 0)?txt.replace(".",""):0;
	}
	return (1*amount);
}

function amountToString(needed, present) {				// only positive numbers
	var txt = needed.toString();

	if (1*needed > 999999) txt = txt.substr(0, 1) + "." + txt.substr(1, 2) + " M";
	else if (1*needed > 999) txt = txt.substr(0, txt.length-3) + "." + txt.substr(-3);

	if (needed > present) txt = '<span style="color:#CC0000">' + txt + '</span>';
	return (txt);
}

function amountToLesserString(needed, present, future_present) {	// only positive numbers
	var rest = needed - present;
	if (rest > 0) {
		if (future_present > present) {
			if (needed > future_present) return ('<span class="text_info"> ' + amountToString(needed-future_present, 0) + '</span>');
			return ('<span class="notice_small"> ' + amountToString(rest, rest+1) + '</span>');
		}
		return ('<span class="text_info"> ' + amountToString(rest, 0) + '</span>');
	}
	return ("");
}

function createLink (myID) {
	var xLevel = waitingQueue.getMaxLevel(myID) + 1;
	if (xLevel < 1) xLevel = 1;					// for new building
	var xTitle = caption.getTranslation("titleText.level") + ": " + xLevel + ", " + caption.getTranslation("titleText.duration") + ": " + millisecondsToString(getRealTime(myID, xLevel, waitingQueue.getMaxLevel(bCastle)), false);	// do not add 0
	var newNode = document.createElement("a");			// create link
	newNode.href = getBuildMainLink();
	newNode.id = RxR + myID;
	var myImg = document.createElement("img");			// create <img
	myImg.src = manAtWork;
	myImg.style.border = ((itIsModernStyle)?"0px":"1px") + " solid black";
	myImg.style.position = "relative";
	myImg.style.top = (itIsModernStyle)?"2px":"1px";
	myImg.style.right = (itIsModernStyle)?"-1px":"-5px";
	myImg.alt = myImg.title = xTitle;
//	newNode.innerHTML = '<img style="position: relative; top: 2px; right: -1px" width="19" height="18" src="' + manAtWork + '" alt="' + xTitle + '" title="' + xTitle + '" />';
	newNode.appendChild(myImg);

	newNode.addEventListener("click", function(e) {
		var myBuild = this.id.replace(RxR, "");
		waitingQueue.putBuilding(myBuild, false, false, -1);	// false = overtakeble & not-automatically
		waitingQueue.saveQueue();				// save it
	}, true);
	return (newNode);
}

function getBuildMainLink() {
	return (window.location.href.replace(window.location.search, "?village=" + villageID + "&s=build_main"));
}

function modernStyle(_class) {
	var temp = xpath(document, '//div[contains(@class,"'+_class+'")]');
	return (temp.snapshotLength > 0);
}

function getListOfBuildings(modernStyle) {
	var myNodes = xpath(document, (modernStyle)?'//div[contains(@class,"mainBuild")]':'//table[@class="borderlist"]/tbody/tr/td[@class="shadow"]/../../..');
	return ((myNodes.snapshotLength == 1)?myNodes.snapshotItem(0):null);
}

function getConstructionTable() {
	var constructionTable = null;
	var myNodes = xpath(document, '//table[@class="borderlist"]');		// search for construction table
	for (var i = 0; i < myNodes.snapshotLength; i++) {
		constructionTable = myNodes.snapshotItem(i);
//		if (constructionTable.rows[0].cells[0].innerHTML != caption.getTranslation("constructionTable.buildingContract")) constructionTable = null;
		if (constructionTable.rows[0].cells.length != 5) constructionTable = null;
		else break;
	}
	return (constructionTable);
}

function getServerTimeNode () {
	// <span id="servertime" class="countup" time="1279445636">11:33:56</span>
	// time attribute contains seconds not milliseconds
	return (document.getElementById("servertime"));
}

function getServerTime () {
	const allowedDiff = 300000;					// 5 minutes in milliseconds

	var tNode = getServerTimeNode();
	var compTime = getComputerTime();				// returns hh:mm:ss
	if (tNode) {
		var servTime = tNode.innerHTML;
		if (servTime.indexOf("NaN") >= 0) return (compTime);
/*
		const timeAttribute = "time";
		if (tNode.hasAttribute(timeAttribute)) {
			// time attribute contains seconds not milliseconds
			var servTimeFull = new Date (1000 * parseInt(tNode.getAttribute(timeAttribute)));
			// this time can vary from displayed time
		}
*/
		return ((Math.abs(getMilliseconds(compTime) - getMilliseconds(servTime)) > allowedDiff)?compTime:servTime);
	}
	return (compTime);
}

function getComputerTime () {						// returns "now" as hh:mm:ss
	return (getHMSString(new Date()));
}

function getHMSString (d) {						// gets Date() and returns hh:mm:ss
	function formatTimeNumber (N) { return(((N<10)?"0":"") + N.toString()); }

	return (formatTimeNumber(d.getHours()) + timeSeparator + formatTimeNumber(d.getMinutes()) + timeSeparator + formatTimeNumber(d.getSeconds()));
}

function getHMS (str) {							// gets hh:mm:ss and returns array
	return (str.split(timeSeparator));
}

function exctractTime(txt) {
	var r_e = /(\d{1,2}\:\d{2}:\d{2})/;			// pattern: ([<digit>]<digit>:<digit><digit>:<digit><digit>)
	var _match = txt.match(r_e);
	if (_match) return (_match[0]);
//	else return (millisecondsToString(getServerTime(), false));
	return (getServerTime());
}

function exctractDate(txt) {
	if ((txt != "") && (txt != exctractTime(txt))) {
		var tomorrowText = caption.getOriginalText("constructionTable.timeColumn.tomorrow");
		if (txt.indexOf(tomorrowText) >= 0) return (tomorrowText);

		// pattern: ([<digit>]<digit>.[<digit>]<digit>.) or (+<digit>[<digit>...]
		var r_e = (globalOptions.showNumberOfDays)?/(\+\d{1,})/:/(\d{1,2}\.\d{1,2}\.)/;
		var _match = txt.match(r_e);
		return ((_match)?_match[0]:"???");
	}
	return ("");
}

function waitForReady(callback, delayInMS) {			// thanks to GIJoe
	var docState = "";					// since readyState returns String... should be string null
	try {
		docState = window.document.readyState;
	}
	catch(e) {}

	if (docState != "complete") {
		window.setTimeout(waitForReady, delayInMS, callback);
		return;
	}
	callback();
}

function xpath(node, query) {
	return document.evaluate(query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function paramValue(name, url_string) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url_string);
	return ((results != null)?results[1]:"");
}

function replaceValue(url_string, name, newValue) {
	var uriArray = url_string.split("?");			// break up url/query
	if (uriArray.length < 2) return (url_string);		// doesn't contain "?" or there's nothing after "?"

	var paramsArray = uriArray[1].split("&");		// break up the query
	var i = 0;

	while (i < paramsArray.length) {
		var itemsArray = paramsArray[i].split("=");	// split name/value pairs

		if (itemsArray[0] == name) {
			if (newValue != "") paramsArray[i] = itemsArray[0] + "=" + newValue;
			else paramsArray.splice(i--, 1);	// remove this parameter and decrement index, it'll be incremented bellow
		}
		i++;
	}
	return (uriArray[0] + "?" + paramsArray.join("&"));
}

function getFirstChild(node) {
	node = node.firstChild;
	while (node && (node.nodeType != 1)) node = node.nextSibling;
	return (node);
}

function getPreviousSibling(node) {
	do { node = node.previousSibling; } while (node && (node.nodeType != 1));
	return (node);
}

function getNextSibling(node) {
	do { node = node.nextSibling; } while (node && (node.nodeType != 1));
	return (node);
}

function removeAllChilds(node) {
	while (node.firstChild) node.removeChild(node.firstChild);
}

function trimStr(str) {		// thanks to Steve @ http://blog.stevenlevithan.com/archives/faster-trim-javascript
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function tCaption (domain, txtObj) {					// language handling
	const unknownSomething = "???";
	const unknownLanguage = "unknownLanguage";
	var languageIndex = {unknownLanguage: "en", "org": "en", "sk": "sk", "pl": "pl", "ar": "es", "es": "es", "ro": "ro", "nl": "nl", "de": "de", "hu": "hu", "fr": "fr", "it": "it", "ru": "ru"};
	var languageID = unknownLanguage;
	var automaticLanguageID = unknownLanguage;
	var _texty = txtObj;

	var m, n;							// get top domain
	n = (m = domain.match(new RegExp("\.([a-z]{2,6})$","i"))) ? m[1] : unknownLanguage;
	if (typeof languageIndex[n] == "undefined") n = unknownLanguage;
	this.automaticLanguageID = n;
	this.languageID = n;

	this.getLanguage = function () {				// returns appropriate part of translations
		return (_texty[languageIndex[this.languageID]]);
	}
	this.getAutomaticLanguage = function () {			// returns appropriate original part of translations
		return (_texty[languageIndex[this.automaticLanguageID]]);
	}
	this.setLanguage = function (lang) {				// force some language
		for (var key in languageIndex) if (languageIndex[key] == lang) {
			this.languageID = key;
			break;
		}
	}
	this.getTranslation = function (txt) {
		return ((_texty != "undefined")?this.getTextByLanguageId(txt, this.languageID):unknownSomething);
	}
	this.getOriginalText = function (txt) {
		return ((_texty != "undefined")?this.getTextByLanguageId(txt, this.automaticLanguageID):unknownSomething);
	}
	this.getTextByLanguageId = function (txt, langID) {
		var lang = languageIndex[langID];
		var langObj = _texty[lang];

		var tokens = txt.split('.');
		for (var i = 0; i < tokens.length; i++) {
			if(typeof(langObj[tokens[i]]) != "undefined") langObj = langObj[tokens[i]];
			else return ((langID == unknownLanguage)? unknownSomething : this.getTextByLanguageId(txt, unknownLanguage));
		}
		return (langObj);
	}
	this.getLanguageList = function () {				// returns array of pairs acronym:languageName
		var languageList = new Object();
		for (var key in languageIndex) if (!(languageIndex[key] in languageList))
			languageList[languageIndex[key]] = this.getTextByLanguageId("languageName", key);
		return (languageList);
	}
}

function removeMultipleBR (node) {					// reduces multiple <br> to one
	var pNode = getPreviousSibling(node);
	if (pNode && (pNode.nodeName == "BR")) {
		var ppNode = getPreviousSibling(pNode);
		while (ppNode && (ppNode.nodeName == "BR")) {
			pNode.parentNode.removeChild(ppNode);
			ppNode = getPreviousSibling(pNode);
		}
	}
}
