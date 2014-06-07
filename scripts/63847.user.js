var meta = <><![CDATA[
// ==UserScript==
// @Change By 		Ali Mojallali
// @author		ms99 (Nux, Lux, onetmt, Velonis Petros, Richard Laffers, Szabka, Victor Garcia-aka Croc-)
// @name value	
// @version 	3.8.8.9.2
// @description
// @source 		
// @identifier 	
// @copyright	© ms99, 2008-2010 (parts of this script © Nux, Lux, onetmt, Velonis Petros, Richard Laffers, Szabka, Victor Garcia-aka Croc-)
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
]]></>.toString();

/**
*The original script from Victor Garcia (aka Croc) is licensed under the
*Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License
*To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/
*
*The updated script from ms99 is licensed under the
*Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
*To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/de/
*
*An English translation of the "Creative Commons Attribution-Noncomercial-Share Alike 3.0 License"
*can be found here http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en
/*****************************************************************************
*Copyright © ms99, 2008-2010
*Parts of this script Copyright © Nux, 2008
*Setup page behavior Copyright © Lux, 2008
*Big icons behavior (except default & except Setup) Copyright © onetmt, 2009
*Until then & Residue calculations Copyright © Velonis Petros (mail: velonis.gr) , 2009
*Parts of this script Copyright © Szabka, 2008
*Initial script Copyright Victor Garcia (aka Croc) ©, 2007
*Parts of this script (functions for moving a report/message displayed as a pop-up with the mouse) Copyright © Richard Laffers, 2007
*
*Parts of this code are provided or based on ideas and/or code written by others
*Additional images embedded in this script provided by ms99, Nux, Lux, DMaster, Brains, fr3nchlover, CuPliz13
*Translations to different languages are provided by users of this script
*
*IMPORTANT CONTRIBUTIONS TO THIS SCRIPT (listed in alphabetical order):
*ACE, Acr111, BmW, Brains, Chu Chee Meng, CuPliz13, Dakkie, digital012, david.macej, DMaster, Dream1, EXEMOK, ezGertieY,
*FitForTheLooneyVille, friedturnip, fr3nchlover, Lassie, Lux, MarioCheng, matteo466, MrRyMan, napkin, Nux, onetmt,
*phob0z, rtellezi, Rypi, Sag, samad909, someweirdnobody, Thornheart, vampiricdust, Velonis Petros, yabash, zerokmatrix, Zippo
*
*Please have understanding if I've forgotten somebody with a relevant contribution to this script
*Please send a message via the userscripts.org mailing facility, for credits
*
*Other contributors' (nick)names may be provided in the header of (or inside) the functions
*SPECIAL THANKS to all contributors and translators of this script !
*
*FUCK-OFF swarnava/piece of stinky shit ! You're only a stupid, idiot copy-paster ! We all reject you as you're nothing else than an abortion !
*****************************************************************************/

function functionMain(e) {
	var crtPage = window.location.href;
	var TB3O = new Object();
	TB3O.TBStartTime = new Date().getTime();
	TB3O.version = '3.8.8.9.2';
	TB3O.TBEndTime = TB3O.TBStartTime;
	TB3O.usoL = 'http://userscripts.org/scripts/';
	TB3O.usoNo = '28129';
	TB3O.url = TB3O.usoL + 'source/' + TB3O.usoNo + '.user.js';
	TB3O.shN = 'TB3-ML&CN';
	TB3O.sn = 'Waiting for the storm';
	TB3O.usoA = TB3O.usoL + 'show/' + TB3O.usoNo;
	TB3O.origMap = true;
	TB3O.BrT = "";
	TB3O.TBTRT = function() {return TB3O.TBEndTime - TB3O.TBStartTime;};
	TB3O.versionText = function() {return TB3O.version + " - " + TB3O.sn;};
	TB3O.nTARbT = '';
	TB3O.nTASb = '';
	TB3O.nTAUb = '';
	TB3O.nTANb = '';
	TB3O.FmapServer = '';
	TB3O.FmapLanguage = '';
	TB3O.boolIsThisNPC = false;
	TB3O.boolIsNPCExluded = false;
	TB3O.T35 = false;
	TB3O.M35 = 0;
	TB3O.avBar = false;
	TB3O.boolShowNPCLink = crtPage.indexOf(".org") == -1;
	TB3O.gServer;
	TB3O.fullServerName;
	TB3O.UserID = '0';
	TB3O.plusAcc = false;
	TB3O.AVP = 0;
	TB3O.Mcap = 0;
	TB3O.VillageRes = '';
	TB3O.hOffBonus = 0;
	TB3O.tPpH = [0, 0, 0, 0, 0];//total production per hour for all villages -> requires to open all villages on a regular basis to get current data
	TB3O.d2spB = [0, 0, 0, 0, 0, 0, 0, 0, 0];//cpbuilding, barracks, big barracks, workshop, stable, big stable, tournament square, townhall, horse drinking through
	//crt coords
	TB3O.xCrt = -1000;
	TB3O.yCrt = -1000;
	//CN colors (CN_COL_TXT, CN_COL_NEUTRAL, CN_COL_MAX_LVL, CN_COL_NO_UPG, CN_COL_UPG_VIA_NPC)
	TB3O.CNc = ['#000000', '#FDF8C1', '#7DFF7D', '#FF9696', '#FFC84B'];

	TB3O.wH = window.innerHeight;
	TB3O.wW = window.innerWidth;
	
	TB3O.isTtB = false;
	
	TB3O.language = 'en';
	var ddX = '680';
	//doc direction
	var docDir = ['left', 'right'];
	if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction") == 'rtl') {docDir = ['right', 'left']; ddX = '100';};
	
	//setup defaults
	TB3O.OD = [
	'0', '0', '1', '0', '1', '1', '1', '1', '1', '1',
	'0', '0', '1', '1', '1', '1', '1', '1', '1', '1',
	'1', '1', '1', '1', '0', '0', '1', '0', '1', '0',
	'1', '1', '1', '1', '1', '1', '0', '1', '1', '1',
	'1', '1', '0', '1', '1', '1', '1', '0', '0', '0',
	'3', '0', '0', '1', '1', '0', '1', '1', '0', '0', 
	'1', '1', '0', '1', '0', '',  '',  '',  '',  '0',
	'1', '1', '1', '1', '1', ddX + '|150', ddX + '|170', ddX + '|210', ddX + '|190', ddX + '|220',
	'1', '1', '1', '1'];
	TB3O.O = TB3O.OD;
	
	//transition to new setup GM "cookie" system => remove all items related to "TB3O.oldOpt" on the 15th of November, 2009
	TB3O.oldOpt = ['scriptlang',//0
	'serverversion2','removeadbanner','forcet31tcap','showbigiconmarket','showbigiconmilitary','showbigiconmilitary2','showbigiconmisc','alliance','showmenusection3','warsim',//10
	'repsite','showinouticons','showcentermapicon','showsendtroopsresources','showpphinvl','showccinvl','showpopinvl','showvl2table','showbipattinvl','showbookmarks',//20
	'floatbookmarks','noteblock','floatnoteblock','nbsize','nbheight','npcassistant','wsanalyser','showstatlinks','mapanalyser','showtravmapuserlinks',//30
	'showtravmapallylinks','showsearchbar','floatsearchbar','showcpinupgtables','showccinupgtables','showuntilthenresidue','showresupgradetable','showcolorreslevels','showresbartable','floatresbartable',//40
	'showbupgtable','showsortedbiupgt','showcenternumbers','showcolorbuildlevels','showbblink','showaddinfomarr','47','marketpreload','rpdefact','noofscouts',//50
	'51','52','showtroopinfotooltips','showrprinfotooltips','55','showcelltypeinfo','showdisttimes','showmaptable','mesreppreload','showmesopenlinks',//60
	'showrepdeltable','showigmlinkforme','showtb3battlereport','showbrstatdetails','cncolorneutral','cncolormaxlevel','cncolornoupgrade','cncolornpcupgrade','consoleloglevel','showresbartable_state',//70
	'showbookmarks_state','noteblock_state','showvl2table_state','showsearchbar_state','resbarXY','userBookmarksXY','noteblockXY','vList2XY','searchbarXY',	'80',//80
	'81','lockbookmarks','83'];
	
	//available races
	avRace = ['Romans', 'Teutons', 'Gauls'];
	//merchants speed (normal servers)
	var mts = {'Romans': 16, 'Teutons': 12, 'Gauls': 24};
	//user information: username(0), race(1), disprace(2), capital name(3), capital vid(4), capital newdid (5), capitalxy(6), deltaRaceImg (7)
	TB3O.U = ['', '', '', '', '', '', '', 1];
	//available languages
	var arAvLang = ['Server language', 'ae', 'ar', 'ba', 'bg', 'br', 'cl', 'cn', 'cz', 'de', 'dk', 'el', 'en', 'es', 'fi', 'fr', 'gr', 'hk', 'hr', 'hu', 'id', 'il', 'ir', 'it', 'jp', 'kr', 'lt', 'lv', 'mx', 'my', 'nl', 'no', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'vn'];
	//village information
	function xVillage(aName, vID, newdid, x, y, vLink) {this.vName = aName;this.vID = vID;this.vNewdid = newdid;this.vx = x;this.vy = y;this.vLink = vLink; return this;};
	//a building being upgraded
	function xBiP(aName, tEnd) {var txtLvl = aName[1].replace(")", "");var lvl = txtLvl.split(" ");this.name = aName[0];this.txtLvl = txtLvl;this.lvl = lvl[1];this.endTime = tEnd; return this;};
	function xTiT(aType, aName, t1) {this.type = aType;this.name = aName;this.t1 = t1;var aD = new Date();aD.setTime(aD.getTime());this.crtDate = aD; return this;};
	function yTiT(tType, intNo, strName) {this.tType = tType;this.intNo = intNo;this.strName = strName; return this;};
	//a troop movement (from dorf1.php)
	function xTrMov(iT, no, fT) {this.type = iT;this.no = no;this.fT = fT; return this;};
	function xTtT(tType, necRes, tTime, aRes) {this.necRes = necRes;this.tType = tType;this.tTime = tTime;this.aRes = aRes; return this;};
	
	var vList = new Array();
	//active village
	var actV = new xVillage('', 0, 0, -1000, -1000, '');
	
	var arrTtT = new Array();
	var vNames = '';
	var defaultMF = [5, 5, 4, 2, 4];
	var marketFilters;
	var localGP = "";
	var wsSName;
	var wsURLCropFinderLinkV2 = "http://crop-finder.com/";
	var wsAnalyser =	[["World Analyser", "http://www.travian.ws/analyser.pl?s="], ["Travian Utils", "http://travian-utils.com/?s="], ["Travianbox.com", "http://travianbox.com/stats/"]];
	var mapAnalyser =	[["Travmap", "http://travmap.shishnet.org/"], ["Flash map", "http://travian.org.ua/"]];
	var repSite =		[["Travilog", "http://travilog.org.ua/"], ["T-Reports.net", "http://travian-reports.net/"]];
	var warsimLink = 	["warsim.php", "http://travian.kirilloid.ru/warsim.php"];
	
	var wsURLTravianBox = "http://travianbox.com";
	var urlNow = window.location.pathname + window.location.search;
	jsVoid = 'javaScript:void(0)';
	xGIF = "a/x.gif";
	dlright1 = 'lright1';
	dmid = 'lmidall';
	dTop5 = 'ltop5';
	dTop1 = 'ltop1';
	dmid2 = 'lmid2';
	dleft = 'lleft';
	dmid1 = 'lmid1';
	dmap = 'map1';
	gIc = new Array();

	crtResUnits = new Array(5);//current resource units
	capacity = new Array(4);//capacity of the warehouse/granary
	prodPerHour = new Array(7);//production per hour for the four resource types
	timeToFill = [[-1, ""], [-1, ""], [-1, ""], [-1, ""]];//time to fill the warehouse/granary
	
	NPCResources = 'npcResources';
	NPCbacklinkName = 'npcBackLink';
	NPCURL = '/build.php?gid=17&t=3';

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

	//css Style declarations
	acss = "#upgTable {position:absolute; width:682px; border-collapse:collapse; border:1px solid silver; background-color:white; font-size:8pt; margin:1px; padding:2px; text-align:" + docDir[0] + "; empty-cells:show; line-height:16px;}" +
	"table#upgTable td.tb3uthc {background-color:#ECECEC; border:1px solid silver; padding:2px; margin:0px; vertical-align:middle; font-size:10pt; font-weight:normal; text-align:center; width:25%; }" +
	"table#upgTable td.tb3utbc {background-color:white; border:1px solid silver; padding:2px; margin:0px; vertical-align:top; font-size:10pt; font-weight:normal; text-align:center; width:25%; }" +

	"table#mapTable {position:absolute; width:682px; border-collapse:collapse; border:1px solid silver; background-color:white; font-size:8pt; margin:0px; padding:0px; text-align:center; empty-cells:show; line-height:16px;}" +
	"table#mapTable td.tb3mthcp {border:1px solid silver; background-color:#ECECEC; font-size:9pt; font-weight:bold; text-align:center; padding:1px; cursor:pointer; vertical-align:middle;}" +
	"table#mapTable td.tb3mthc {border:1px solid silver; background-color:#ECECEC; font-size:9pt; font-weight:bold; text-align:center; padding:1px; vertical-align:middle;}" +
	"table#mapTable td.tb3mtc {border:1px solid silver; background-color:white; padding:1px; margin:0px; font-size:8pt; font-weight:normal; text-align:center; vertical-align:middle;}" +
	"table#mapTable td.tb3mtcu {border:1px solid silver; background-color:white; padding:1px; margin:0px; font-size:8pt; font-weight:bold; color:blue; text-align:center; vertical-align:middle;}" +
	"table#mapTable td.tb3mtcp {border:1px solid silver; background-color:white; padding-" + docDir[1] + ":5px; margin:0px; font-size:8pt; font-weight:normal; color:black; text-align:" + docDir[1] + "; vertical-align:middle;}" +
	
	"div#updDiv {position:absolute; top:200px; " + docDir[0] + ":120px; display:block; padding:1px; z-index:50; clear:both; border:2px solid #C0C0C0; background-color:black; color:yellow;}" +
	
	"table#userbookmarks {border-collapse:collapse; border:0px medium none; background-color:white; line-height:16px;}" +
	"table#userbookmarks td {border:0px none transparent; background-color:white; text-align:" + docDir[0] + "; padding:2px;}" +
	"table#userbookmarks tr, table#userbookmarks td.tb3cnb {width:auto; line-height:16px; font-size:13px; text-align:" + docDir[0] + "; vertical-align:middle; padding:0px 0px 0px 2px; margin:0px; white-space:nowrap; border-collapse:collapse; border:0px none transparent; }" +
	"table#userbookmarks img {cursor:pointer;}" +
	
	"table#mkls {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#mkls tr {background-color:white; text-align:center; line-height:18px;}" +
	"table#mkls td {border:1px solid silver; font-size:normal; font-size:8pt; color:black; text-align:" + docDir[1] + "; vertical-align:middle; line-height:18px; padding:2px 3px 2px 3px; white-space:nowrap;}" +
	"table#mkls td.mklshh {background-color:#ECECEC; text-align:center; line-height:18px; width:16%; font-size:8pt; font-weight:normal;}" +
	"table#mkls td.mklsc {background-color:white; text-align:center; line-height:18px; font-size:8pt; font-weight:normal;}" +
	
	"table#stla {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:1px; margin:1px;}" +
	"table#stla tr {background-color:white; text-align:center; line-height:18px;}" +
	"table#stla td {border:1px solid silver; font-size:normal; font-size:8pt; color:black; text-align:" + docDir[1] + "; vertical-align:middle; line-height:18px; padding:1px 2px 1px 2px; white-space:nowrap;}" +
	"table#stla td.stlahh {background-color:#ECECEC; text-align:center; line-height:18px; font-size:8pt; font-weight:normal; width:5%;}" +
	"table#stla td.stlahh1 {background-color:#ECECEC; text-align:center; line-height:18px; font-size:8pt; font-weight:normal; width:10%;}" +
	"table#stla td.stlahh2 {background-color:#ECECEC; text-align:center; line-height:18px; font-size:8pt; font-weight:normal;}" +
	"table#stla td.stlac {background-color:white; text-align:center; line-height:18px; font-size:8pt; font-weight:normal;}" +
	
	"table#soff {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white;}" +
	"table#soff tr {line-height:18px; font-size:8pt; text-align:center; background-color:white;}" +
	"table#soff td {border:1px solid silver; font-size:normal; font-size:8pt; color:black; text-align:" + docDir[1] + "; vertical-align:middle; line-height:18px; padding:2px 3px 2px 1px; white-space:nowrap;}" +
	"table#soff td.soffhh {background-color:#ECECEC; text-align:center; line-height:18px; width:16%; font-size:8pt; font-weight:normal;}" +
	"table#soff td.soffc {background-color:white; text-align:center; line-height:18px; font-size:8pt; font-weight:normal;}" +
	
	"table#resbar, table#resbar tr, table#resbar td.tb3c {border-collapse:collapse; border:0px thin transparent; background-color:white; width:auto; line-height:13px; font-size:8pt; padding:2px; margin:1px; white-space:nowrap;}" +
	"table#resbar td.lr {border:0px thin transparent; background-color:white; font-size:8pt; padding:2px; margin:1px; white-space:nowrap; text-align:" + docDir[1] + ";}" +
	"table#resbar td.tb3cvn {line-height:13px; text-align:center; font-weight:bold; font-size:8pt; color:blue; background-color:#E9EEFC; padding:2px;}" +
	"table#resbar td.tb3chtot {line-height:13px; text-align:" + docDir[1] + "; font-weight:bold; font-size:8pt; border-" + docDir[0] + ":2px solid silver; background-color:#FFFFC0; padding:2px;}" +
	"table#resbar td.tb3ctot {line-height:13px; text-align:" + docDir[1] + "; font-size:8pt; border-" + docDir[0] + ":2px solid silver; background-color:#FFFFC0; padding:2px;}" +
	"table#resbar td.tb3ctotv {line-height:13px; text-align:" + docDir[1] + "; font-size:8pt; border-top:2px solid silver;border-bottom:2px solid silver; border-" + docDir[0] + ":1px solid silver; background-color:#ECECEC; padding:2px;}" +
	"table#resbar td.tb3cresbar {border:1px solid silver; background-color:white; padding:0px; width:100px;}" +

	"table#vl2table {border-collapse:collapse; border:0px medium none; background-color:white; line-height:13px; font-size:10pt; text-align:center; padding:2px; margin:0px; white-space:nowrap;}" +
	"table#vl2table tr td {border:0 thin none; background-color:white; text-align:" + docDir[0] + "; font-size:10pt; padding:2px; margin:0px; white-space:nowrap;}" +
	"table#vl2table td.av {color:#FF8000;}" +
	"table#vl2table td.coord {font-size:8pt;}" +

	"table#vlist	{width:auto; background-color:transparent !important; border-collapse:collapse; border:0px medium none; margin:0px; font-size:13px; font-weight:normal;}" +
	"table#vlist tr	{background-color:transparent !important;}" +
	"table#vlist tbody td {background-color:transparent; border:0px none transparent; padding:0px 2px 0px 2px; white-space:nowrap;}" +
	"table#vlist tr:hover, table#vlist td:hover {background-color:#E5E5F0 !important;}" +
	"table#vlist img {border:0 medium none;}" +
	
	"div.fldiv {position:absolute; display:block; padding:1px; z-index:50; clear:both; border:1px solid #C0C0C0; background-color:#FFFFFF; z-index:1000;}" +
	"div.dragdiv {text-align:center; font-weight:bold; height:20px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:#ECECEC; z-index:1000;}" +
	"div.mmdiv {height:20px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:#ECECEC; width:25px;}" +
	"div.closediv {height:20px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:#ECECEC; width:25px;}" +

	"p.delacc {position:absolute; display:block; padding:4px; z-index:2; border:1px solid #00C000; background-color:#FEFFE3; width:130px; text-align:center; " + docDir[1] + ":0px; top:0px;}" +
	"p.delacc span {color:orange;}" +

	"#noteblockcontent {border:1px solid silver; padding:0px 2px 0px 2px; overflow:auto; font-size:10pt; white-space:nowrap;}" +

	"table#noteblock {border-collapse:collapse; border:0px none white; text-align:center; padding:2px; margin:1px; background-color:white;}" +
	"table#noteblock tr {border:0px none white;}" +
	"table#noteblock td {border:0px none transparent; background-color:white; text-align:center; padding:2px;}" +

	"div#build.gid17 table#target_select {border-collapse:collapse; border:0px none transparent; background-color:white; line-height:21px; width:34%; float:left; margin-" + docDir[0] + ":10px;}" +
	"div#build.gid17 table#target_select td.vil input.text {width:90px;}" +
	
	"table#dorf3table, table#dorf3table tr {width:100%; border-collapse:collapse; border:1px solid silver; text-align:center; background-color:white; padding:2px; margin:1px; font-size:10pt;}" +
	"table#dorf3table td {border:1px solid silver;}" +

	"div.npc-general {margin:3px 0 0; font-size:7pt; float:none;} " +
	"span.npc-red {color:#DD0000;} " +
	"span.npc-green {color:#009900;}" +

	"div.CNbuildingtags {background-color:" + TB3O.CNc[1] + "; border:#000000 thin solid; -moz-border-radius:2em; " +
	"padding-top:3px; font-family:Arial, Helvetica, Verdana, sans-serif; font-size:9pt; font-weight:bold; " +
	"color:" + TB3O.CNc[0] + "; text-align:center; position:absolute; width:21px; height:18px; cursor:pointer; visibility:hidden; z-index:26;}" +

	"table#bttable	{width:100%; height:129px; text-align:left; border-collapse:collapse; background-color:white;}" +

	"#resNtable		{border:0px none white;}" +

	"table.tb3tb	{width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table.tb3tb tr, table.tb3tb td {border:1px solid silver;}" +

	"table.allvtroops, table.allvtroops tr td {border-collapse:collapse; border:1px solid silver; text-align:center; padding:2px;}" +
	"table.allvtroops tr th {border-collapse:collapse; border:1px solid silver; text-align:" + docDir[0] + "; padding:2px 7px; width:20%;}" +

	"tr.cbgx td, td.cbgx {background-color:#FFFFC0; border-collapse:collapse; border:1px solid silver; padding:2px; text-align:center;}" +

	"table.tb3tbnb	{border-collapse:collapse; border:0px none white; font-size:8pt; text-align:center; padding:2px; margin:1px; background-color:white;}" +
	"table.tb3tbnb tr, table.tb3tbnb td, table.tb3tbnb td.tb3cnb {border:0px none white;}" +
	"tr.tb3rh		{background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"tr.tb3rhb		{background-color:#ECECEC; text-align:center; border:1px solid silver; font-weight:bold;}" +
	"tr.tb3rhnb		{background-color:#ECECEC; text-align:center;}" +
	"tr.tb3r 		{border-collapse:collapse; border:1px solid silver; text-align:center;}" +
	"tr.tb3rnb		{border-collapse:collapse; border:0px none white; text-align:center; white-space:nowrap;}" +
	"td.tb3chbb		{border:1px solid silver; background-color:#ECECEC; padding:2px; font-weight:bold; font-size:10pt;}" +
	"td.tb3chb		{border:1px solid silver; background-color:#ECECEC; padding:2px; font-weight:bold;}" +
	"td.tb3ch		{border:1px solid silver; background-color:#ECECEC; padding:2px; text-align:center;}" +
	"td.tb3chnb		{border:0px none white; background-color:#ECECEC; padding:2px; text-align:center;}" +
	"td.tb3c		{border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse;}" +
	"td.tb3cnb		{border:0px none transparent; background-color:white; text-align:center; padding:2px;}" +
	"td.tb3cbt		{border-top:1px solid silver; font-size:8pt; color:#000000; text-align:center;}" +
	"td.tb3cbrh1	{background-color:#F3F3F3; font-size:10pt; font-weight:bold; color:#000000; text-align:center; border:1px solid silver;}" +
	"td.tb3cbrh2	{background-color:#F3F3F3; font-size:10pt; font-weight:bold; color:#FF8000; text-align:center; border:1px solid silver;}" +
	"td.tb3cbrh3	{background-color:#F3F3F3; font-size:10pt; font-weight:bold; color:#71D000; text-align:center; border:1px solid silver;}" +
	"td.tb3cbr1		{border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse; font-size:8pt; text-align:center;}" +
	"td.tb3cbr2		{border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse; font-size:8pt; text-align:" + docDir[1] + ";}" +
	"td.tb3cbr2b	{border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse; font-size:8pt; font-weight:bold; text-align:" + docDir[1] + ";}" +
	"td.tb3cbr2br	{border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse; font-size:8pt; font-weight:bold; color:red; text-align:" + docDir[1] + ";}" +
	"td.tb3cbr2r	{border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse; font-size:8pt; color:red; text-align:" + docDir[1] + ";}" +
	"td.tb3cnbhal	{border:0px none white; text-align:left;}" +
	"td.tb3cCinTT	{text-align:center; font-size:10pt; font-weight:bold; color:green; border-bottom:1px solid grey;}" +
	
	"td.desc, td.desc div, td.desc span {font-size:8pt;}" +
	"h1 {z-index:300; padding-top:16px;}" +

	"div#side_info td.link {font-size:10pt;}" +

	"table#Merchanttimetable {border-collapse:collapse; empty-cells:show; width:100%; line-height:16px; background-color:white;}" +

	"div#tb_tooltip {position:absolute; display:none; padding:2px; z-index:9000; border:1px solid #00C000; background-color:#FFFFCC; -moz-border-radius:5px;}" +
	"div#tb_tooltip table, div#tb_tooltip tr, div#tb_tooltip td {font-size:8pt; border:0px medium none; padding:2px; background-color:#FFFFCC;}" +

	"table#TB3S	{width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#TB3S tr.srh {background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"table#TB3S td.srst {border:1px solid silver; background-color:#ECECEC; padding:2px; text-align:" + docDir[0] + "; font-size:9pt; font-weight:bold; color:darkblue;}" +
	"table#TB3S td.srsc1 {border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse; text-align:" + docDir[0] + "; font-size:8pt}" +
	"table#TB3S td.srsc2 {border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse; text-align:" + docDir[0] + "; font-size:8pt}" +
	"table#TB3S td.s1 {border:1px solid silver; background-color:#ECECEC; padding:2px; text-align:center; width:70%; font-weight:bold;}" +
	"table#TB3S td.s2 {border:1px solid silver; background-color:#ECECEC; padding:2px; text-align:center; width:20%;}" +
	"table#TB3S select, table#TB3S input {font-size:8pt;}" +
	"table#TB3S span {font-size:8pt; font-weight: bold;}" +
	"table#TB3S td.s3 {border:1px solid silver; background-color:#ECECEC; padding:2px; text-align:center; width:10%;}" +
	"table#TB3S img {cursor:pointer;}" +

	"table#br_table	{border:1px solid #C2C2C2; text-align:center; spacing:0px; padding:0px; border:1px solid silver; border-collapse:collapse; width:100%;}" +

	"table#cptable {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#cptable tr {background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"table#cptable td {border:1px solid silver; background-color:#ECECEC; padding:2px; font-size:8pt; font-weight:bold;}" +
	"table#cptable td.CG {border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse; font-size:8pt; font-weight:normal; background-color:#C8FFC8;}" +
	"table#cptable td.CR {border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse; font-size:8pt; font-weight:normal; background-color:#FFE1E1;}" +

	"table#mbuyf {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#mbuyf tr {border-collapse:collapse; border:1px solid silver; text-align:center;}" +
	"table#mbuyf td {border:1px solid silver; background-color:white; padding:2px; border-collapse:collapse;}" +
	"table#mbuyf td.sf {border:1px solid silver; padding:2px; border-collapse:collapse; background-color:#FFE4B5;}" +

	"table#delreptable {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#delreptable tr {border:1px solid silver; text-align:center;}" +
	"table#delreptable tr.rh {background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"table#delreptable td.cc {border:1px solid silver; padding:2px; font-weight:bold; font-size:10pt;}" +
	"table#delreptable td {border:1px solid silver; padding:2px;}";
	
	acss += ".reslevel {position:absolute; z-index:1; width:17px; height:12px;}" +
	".rf1 {left: 93px; top:27px;}" +
	".rf2 {left: 156px; top:26px;}" +
	".rf3 {left: 216px; top:41px;}" +
	".rf4 {left: 38px; top:59px;}" +
	".rf5 {left: 130px; top:67px;}" +
	".rf6 {left: 195px; top:87px;}" +
	".rf7 {left: 253px; top:81px;}" +
	".rf8 {left: 23px; top:111px;}" +
	".rf9 {left: 74px; top:104px;}" +
	".rf10 {left: 205px; top:136px;}" +
	".rf11 {left: 260px; top:139px;}" +
	".rf12 {left: 33px; top:165px;}" +
	".rf13 {left: 84px; top:158px;}" +
	".rf14 {left: 151px; top:178px;}" +
	".rf15 {left: 230px; top:192px;}" +
	".rf16 {left: 79px; top:211px;}" +
	".rf17 {left: 132px; top:223px;}" +
	".rf18 {left: 182px; top:227px;}";
	GM_addStyle(acss);
	
	//fix for mixed T3.1 & T3.5
	fcss = ".village2_mapTB3 {width:540px; height:448px; position:relative; left:-19px;}" +
	".village2_mapTB3 .building {position:absolute;}" +
	"div#sright table {width:100%}";
	GM_addStyle(fcss);

	//------------------------------------------
	//Modified by Lux
	//------------------------------------------
	cssSetup =	".MsgPageOff {visibility:hidden; display:none; position:absolute; top:-100px; left:-100px;}" +
	".OuterMsgPageOn {position:absolute; top:0px; left:0px; visibility:visible; width:150%; height:100%; background-color:#000; z-index:1998; opacity:0.75;}" +
	//".divCloseMsgPageOn {position: absolute; left:73.5%; top:0.2%; visibility:visible; opacity:1; z-index:2000;}" +
	".InnerMsgPageOn {position: absolute; left:25%; top:2.8%; visibility:visible; opacity:1; z-index:1999;}";
	GM_addStyle(cssSetup);
	//------------------------------------------

var xLng = new Array();

function setDefLang() {
//default = English
//setup
xLng['0'] = "Script language"; //please, do not translate !!! translation will never be included into the script !
xLng['1'] = "Travian v2.x server";
xLng['2'] = 'Remove ad banners';
xLng['3'] = 'Force T3.1 Legionnaire & Phalanx capacity calculation<br>(for mixed T3.1 & T3.5 servers)';
xLng['4'] = 'Market';
xLng['5'] = 'Rally point/Barracks/Workshop/Stable';
xLng['6'] = "Town hall/Hero's mansion/Armoury/Blacksmith";
xLng['7'] = "Palace/Residence/Academy/Treasury";
xLng['8'] = 'Alliance';
xLng['9'] = "Show additional links in left menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['10'] = "Combat simulator link to use:"; //menu left"
xLng['11'] = "Link to use for posting reports site";
xLng['12'] = "Show 'dorf1.php' and 'dorf2.php' links";
xLng['13'] = 'Show "Center map on this village" icon';
xLng['14'] = "Show 'Send troops/Send resources' icons in village list";
xLng['15'] = "Show lumber, clay, iron production per hour in village list";
xLng['16'] = "Show effective crop production in village list";
xLng['17'] = "Show population in village list";
xLng['18'] = 'Show additional (2 columns) village list as floating window';
xLng['19'] = 'Show information about buildings in progress and troop movements<br>in village list';
xLng['20'] = 'Show bookmarks';
xLng['21'] = "Show 'User Bookmarks' as floating window";
xLng['22'] = 'Show note block';
xLng['23'] = "Show 'NoteBlock' as floating window";
xLng['24'] = 'Note block size';
xLng['25'] = 'Note block height';
xLng['26'] = 'Show NPC Assistant calculations/links';
xLng['27'] = "World Analyser to use";
xLng['28'] = "Show analyser statistic links";
xLng['29'] = 'Map Analyser to use';
xLng['30'] = 'Show links to map for users';
xLng['31'] = 'Show links to map for alliances';
xLng['32'] = "Show 'Search Bar'";
xLng['33'] = "Show 'Search Bar' as floating window";
xLng['34'] = "Show CP/day information in upgrade tables";
xLng['35'] = "Show crop consumption in upgrade tables";
xLng['36'] = "Show 'Until then/Residue' calculation in upgrade/training tables";
xLng['37'] = "Show resource fields upgrade table";
xLng['38'] = 'Show resource level colours';
xLng['39'] = "Show 'Resource Bar' table";
xLng['40'] = "Show 'Resource Bar' table as floating window";
xLng['41'] = "Show buildings upgrade table";
xLng['42'] = 'Sort buildings by name in upgrade table';
xLng['43'] = 'Show center numbers';
xLng['44'] = 'Show building level colours';
xLng['45'] = "Show blinking levels for buildings being upgraded";
xLng['46'] = "Show additional information for every merchant arrival";
xLng['47'] = "Show last market transport";
xLng['48'] = "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
xLng['49'] = 'Rally point default action';
xLng['50'] = 'No. of scouts for the "Select scout" function';
xLng['51'] = "Show last attack";
xLng['52'] = "Show/use coordinates for last attack";
xLng['53'] = 'Show troops information in tooltips';
xLng['54'] = 'Show distance and times to villages in tooltips'; 
xLng['55'] = "Auto fill in available troops for the internal war simulator";
xLng['56'] = "Show cell type/oasis info<br>while mousing over the map";
xLng['57'] = 'Show distances & times';
xLng['58'] = 'Show table of players/villages/occupied oasis';
xLng['59'] = 'Number of message/report pages to preload<br>(Default = 1)';
xLng['60'] = 'Show links to open messages/reports in a pop-up';
xLng['61'] = 'Show "Delete all" table on the Reports page';
xLng['62'] = 'Show the "Send IGM" icon for me, too';
xLng['63'] = 'Show TB3 enhanced Battle Reports';
xLng['64'] = 'Show details in Report Statistics';
xLng['65'] = 'Color upgrade available<br>(Default = Empty)';
xLng['66'] = 'Color max level<br>(Default = Empty)';
xLng['67'] = 'Color upgrade not possible<br>(Default = Empty)';
xLng['68'] = 'Color upgrade via NPC<br>(Default = Empty)';
xLng['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0)";
//no xLng items [70..79] & [80..83]
//xLng['80'] = xLng['53'] and xLng['81'] = xLng['54'] - both will be set after switchlanguage()
xLng['82.L'] = 'Lock bookmarks (Hide delete, move up, move down icons)';
xLng['82.U'] = 'Unlock bookmarks (Show delete, move up, move down icons)';
//setup end
//user info
xLng['U.2'] = 'Race';
xLng['U.3'] = 'Name of your capital<br><b>Visit your Profile for an update</b>';
xLng['U.6'] = 'Coordinates of your capital<br><b>Visit your Profile for an update</b>';
//user info end
xLng['SIM'] = 'Combat simulator';
xLng['QSURE'] = 'Are you sure?';
xLng['LOSS'] = 'Loss';
xLng['PROFIT'] = 'Profit';
xLng['EXTAV'] = 'Extension available';
xLng['PLAYER'] = 'Player';
xLng['VILLAGE'] = 'Village';
xLng['POPULATION'] = 'Population';
xLng['COORDS'] = 'Coordinates';
xLng['MAPTBACTS'] = 'Actions';
xLng['SAVED'] = 'Saved';
xLng['YOUNEED'] = 'You need';
xLng['TODAY'] = 'today';
xLng['TOMORROW'] = 'tomorrow';
xLng['DAYAFTERTOM'] = 'day after tomorrow';
xLng['MARKET'] = 'Marketplace';
xLng['BARRACKS'] = 'Barracks';
xLng['RALLYPOINT'] = 'Rally point';
xLng['STABLE'] = 'Stable';
xLng['WORKSHOP'] = 'Workshop';
xLng['SENDRES'] = 'Send resources';
xLng['BUY'] = 'Buy';
xLng['SELL'] = 'Sell';
xLng['SENDIGM'] = 'Send IGM';
xLng['LISTO'] = 'Available';
xLng['ON'] = 'on';
xLng['AT'] = 'at';
xLng['EFICIENCIA'] = 'Efficiency';
xLng['NEVER'] = 'Never';
xLng['ALDEAS'] = 'Village(s)';
xLng['TIEMPO'] = 'Time';
xLng['OFREZCO'] = 'Offering';
xLng['BUSCO'] = 'Searching';
xLng['TIPO'] = 'Type';
xLng['DISPONIBLE'] = 'Only available';
xLng['CUALQUIERA'] = 'Any';
xLng['YES'] = 'Yes';
xLng['NO'] = 'No';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Bookmarks';
xLng['ANYADIR'] = 'Add';
xLng['UBU'] = 'New Bookmark URL';
xLng['UBT'] = 'New Bookmark Text';
xLng['ELIMINAR'] = 'Delete';
xLng['MAPA'] = 'Map';
xLng['MAXTIME'] = 'Maximum time';
xLng['ARCHIVE'] = 'Archive';
xLng['SUMMARY'] = 'Summary';
xLng['TROPAS'] = 'Troops';
xLng['CHKSCRV'] = 'Update TBeyond';
xLng['ACTUALIZAR'] = 'Update village information';
xLng['VENTAS'] = 'Saved Offers';
xLng['MAPSCAN']  = 'Scan the Map';
xLng['BIGICONS'] = 'Show extended icons';
xLng['SAVE'] = 'Save';
xLng['AT2'] = 'Reinforcement';
xLng['AT3'] = 'Attack: Normal';
xLng['AT4'] = 'Attack: Raid';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normal (small)';
xLng['NBSIZEBIG'] = 'Large screen (large)';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automatic expand height';
xLng['NBKEEPHEIGHT'] = 'Default height';
xLng['NPCSAVETIME'] = 'Save: ';
xLng['TOTALTROOPS'] = 'Total village troops';
xLng['SELECTALLTROOPS'] = "Select all troops";
xLng['PARTY'] = "Festivities";
xLng['CPPERDAY'] = "CP/day";
xLng['SLOT'] = "Slot";
xLng['TOTAL'] = "Total";
xLng['SELECTSCOUT'] = "Select scout";
xLng['SELECTFAKE'] = "Select fake";
xLng['NOSCOUT2FAKE'] = "It's impossible to use scouts for a fake attack !";
xLng['NOTROOP2FAKE'] = "There aren't troops for a fake attack!";
xLng['NOTROOP2SCOUT'] = "There aren't troops to scout !";
xLng['NOTROOPS'] = "There aren't troops in the village !";
xLng['ALL'] = "All";
xLng['SH2'] = "In color fields you may enter:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
xLng['SHOWORIGREPORT'] = "Show original report (for posting)";
xLng['WARSIMOPTION1'] = "Internal (provided by the game)";
xLng['WARSIMOPTION2'] = "External (provided by kirilloid.ru)";
xLng['NONEWVER'] = "You have the latest version available";
xLng['BVER'] = "You may have a beta version";
xLng['NVERAV'] = "A new version of the script is available";
xLng['UPDATESCRIPT'] = "Update script now ?";
xLng['CHECKUPDATE'] = "Checking for script update.<br>Please wait...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Average population per village";
xLng['AVPOPPERPLAYER'] = "Average population per player";
xLng['MAX'] = 'Max';
//version 3.0.7
xLng['TOTALTROOPSTRAINING'] = 'Total troops training';
//version 3.1.3
xLng['TBSETUPLINK'] = TB3O.shN + ' Setup';
xLng['UPDATEALLVILLAGES'] = 'Update all villages.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
//version 3.1.7
xLng['LARGEMAP'] = 'Large map';
//version 3.1.9
xLng['USETHEMPR'] = 'Use them (proportional)';
xLng['USETHEMEQ'] = 'Use them (equal)';
//version 3.2
xLng['TOWNHALL'] = 'Town Hall';
xLng['GAMESERVERTYPE'] = 'Game server';
xLng['ACCINFO'] = 'Account Information';
xLng['NOTEBLOCKOPTIONS'] = 'Noteblock';
xLng['MENULEFT'] = 'Menu on the left side';
xLng['STATISTICS'] = 'Statistics';
xLng['RESOURCEFIELDS'] = 'Resource fields';
xLng['VILLAGECENTER'] = 'Village center';
xLng['MAPOPTIONS'] = 'Map options';
xLng['COLOROPTIONS'] = 'Color options';
xLng['DEBUGOPTIONS'] = 'Debug options';
xLng['HEROSMANSION'] = "Hero's mansion";
xLng['BLACKSMITH'] = 'Blacksmith';
xLng['ARMOURY'] = 'Armoury';
xLng['NOW'] = 'Now';
xLng['CLOSE'] = 'Close';
xLng['USE'] = 'Use';
xLng['USETHEM1H'] = 'Use them (1 hour production)';
xLng['OVERVIEW'] = 'Overview';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Attacks';
xLng['NEWS'] = 'News';
xLng['ADDCRTPAGE'] = 'Add current';
xLng['SCRPURL'] = 'TBeyond page';
xLng['SPACER'] = 'Spacer';
xLng['MESREPOPTIONS'] = 'Messages & Reports';
xLng['ATTABLES'] = 'Troop tables';
xLng['MTW'] = 'Wasted';
xLng['MTX'] = 'Exceeding';
xLng['MTC'] = 'Current load';
xLng['ALLIANCEFORUMLINK'] = 'Link to external forum<br>(Leave empty for internal forum)';
xLng['MTCL'] = 'Clear all';
xLng['CLICKSORT'] = 'Click to sort';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Shared among villages';
xLng['VILLAGELIST'] = 'Village List';
xLng['UPDATEPOP'] = 'Update population';
xLng['EDIT'] = 'Edit';
xLng['NPCOPTIONS'] = 'NPC Assistant options';
xLng['NEWVILLAGEAV'] = 'Date/Time';
xLng['TIMEUNTIL'] = 'Time to wait';
xLng['CENTERMAP'] = 'Center map on this village';
xLng['SENDTROOPS'] = 'Send troops';
xLng['PALACE'] = "Palace";
xLng['RESIDENCE'] = "Residence";
xLng['ACADEMY'] = "Academy";
xLng['TREASURY'] = "Treasury";
xLng['UPGTABLES'] = "Resource fields/buildings upgrade tables";
xLng['RESBARTABLETITLE'] = "Resource Bar";
//3.8.7.5
xLng['RESIDUE'] = 'The residue if you build it ';
xLng['RESOURCES'] = 'Resources';
//3.8.7.6.3
xLng['SH1'] = "Open your Profile for automatic capital/coordinates detection<br>Build the barracks for automatic race detection and then open the village center";
xLng['RESEND'] = "Send again ?";
//3.8.8.8.9
xLng['WSI'] = "War simulator provided by the game";
xLng['TTT'] = "General troops/distance tooltips";
};

function switchLanguage() {
switch (arAvLang[TB3O.O[0]]) {
case "it":
//IcEye, rosfe y Danielle, Lello, Zippo, Nux, ns65, Acr111, onetmt, matteo466
xLng['8'] = 'Alleanza';
xLng['SIM'] = 'Simulatore di combattimento';
xLng['QSURE'] = 'Sei sicuro?';
xLng['LOSS'] = 'Perdita in materiale';
xLng['PROFIT'] = 'Guadagno';
xLng['EXTAV'] = 'Ampliamento disponibile';
xLng['PLAYER'] = 'Proprietario';
xLng['VILLAGE'] = 'Villaggio';
xLng['POPULATION'] = 'Popolazione';
xLng['COORDS'] = 'Coordinate';
xLng['MAPTBACTS'] = 'Azioni';
xLng['SAVED'] = 'Salvato';
xLng['YOUNEED'] = 'Mancano';
xLng['TODAY'] = 'oggi';
xLng['TOMORROW'] = 'domani';
xLng['DAYAFTERTOM'] = 'dopodomani';
xLng['MARKET'] = 'Mercato';
xLng['BARRACKS'] = "Campo d'addestramento";
xLng['RALLYPOINT'] = 'Caserma';
xLng['STABLE'] = 'Scuderia';
xLng['WORKSHOP'] = 'Officina';
xLng['SENDRES'] = 'Invia risorse';
xLng['BUY'] = 'Compra risorse';
xLng['SELL'] = 'Vendi risorse';
xLng['SENDIGM'] = 'Invia messaggio';
xLng['LISTO'] = 'Disponibile';
xLng['ON'] = 'il';
xLng['AT'] = 'alle';
xLng['EFICIENCIA'] = 'Efficienza';
xLng['NEVER'] = 'Mai';
xLng['ALDEAS'] = 'Villaggi';
xLng['TIEMPO'] = 'Tempo';
xLng['OFREZCO'] = 'Offerta';
xLng['BUSCO'] = 'Richiesta';
xLng['TIPO'] = 'Percentuale di scambio';
xLng['DISPONIBLE'] = 'Disponibile';
xLng['CUALQUIERA'] = 'Tutti';
xLng['YES'] = 'Si';
xLng['NO'] = 'No';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Segnalibri';
xLng['ANYADIR'] = 'Aggiungi';
xLng['UBU'] = 'URL segnalibro';
xLng['UBT'] = 'Nome segnalibro';
xLng['ELIMINAR'] = 'Eliminare';
xLng['MAPA'] = 'Mappa';
xLng['MAXTIME'] = 'Tempo massimo';
xLng['ARCHIVE'] = 'Archivio';
xLng['SUMMARY'] = "Riepilogo";
xLng['TROPAS'] = 'Truppe';
xLng['CHKSCRV'] = 'Verifica Aggiornamenti';
xLng['ACTUALIZAR'] = 'Aggiorna le informazioni sul villaggio';
xLng['VENTAS'] = 'Offerte salvate';
xLng['MAPSCAN'] = "Scansiona la mappa";
xLng['BIGICONS'] = 'Icone aggiuntive per accesso rapido';
xLng['22'] = 'Mostra blocco note';
xLng['SAVE'] = 'Salva';
xLng['49'] = "Azione predefinita per 'Invia truppe'";
xLng['AT2'] = 'Rinforzo';
xLng['AT3'] = 'Attacco: Normale';
xLng['AT4'] = 'Attacco: Raid';
xLng['24'] = 'Larghezza blocco note';
xLng['NBSIZEAUTO'] = 'Automatica';
xLng['NBSIZENORMAL'] = 'Normale (Piccolo)';
xLng['NBSIZEBIG'] = 'Schermi grandi (Grande)';
xLng['25'] = 'Altezza blocco note';
xLng['NBAUTOEXPANDHEIGHT'] = "Adatta l'altezza automaticamente";
xLng['NBKEEPHEIGHT'] = "Altezza predefinita";
xLng['43'] = 'Mostra livelli edifici';
xLng['NPCSAVETIME'] = 'Tempo guadagnato: ';
xLng['38'] = 'Mostra colori livelli campi';
xLng['44'] = 'Mostra colori livelli edifici';
xLng['65'] = 'Colore ampliamento disponibile <br>(Vuoto = default)';
xLng['66'] = 'Colore livello massimo raggiunto <br>(Vuoto = default)';
xLng['67'] = 'Colore ampliamento non disponibile <br>(Vuoto = default)';
xLng['68'] = 'Colore ampliamento col mercato nero <br> (Vuoto = default)';
xLng['TOTALTROOPS'] = "Truppe del villaggio complessive";
xLng['20'] = 'Mostra segnalibri';
xLng['U.2'] = 'Popolo';
xLng['1'] = "Server Travian v2.x";
xLng['SELECTALLTROOPS'] = "Seleziona tutte le truppe";
xLng['PARTY'] = "Party";
xLng['CPPERDAY'] = "PC/giorno";
xLng['TOTAL'] = "Totale";
xLng['SELECTSCOUT'] = "Spiata";
xLng['SELECTFAKE'] = "Fake";
xLng['NOSCOUT2FAKE'] = "Non si possono usare le spie per mandare un fake!";
xLng['NOTROOP2FAKE'] = "Non ci sono truppe per mandare un fake!";
xLng['NOTROOP2SCOUT'] = "Non ci sono truppe per fare la spiata!";
xLng['NOTROOPS'] = "Non ci sono truppe nel villaggio!";
xLng['ALL'] = "Tutto";
xLng['SH2'] = "Nei campi dei colori puoi inserire:<br>- il nome (in inglese) <b>green</b> o <b>red</b> o <b>orange</b>, etc.<br>- il codice esadecimale del colore <b>#004523</b><br>- lasciare vuoto per usare i colori predefiniti";
xLng['SHOWORIGREPORT'] = "Mostra report originale (per postare sul forum)";
xLng['56'] = "Mostra informazioni sul tipo di terreno/oasi<br>mentre il mouse passa sulla mappa";
xLng['10'] = "Simulatore di combattimento da usare:<br>(nel menu a sinistra)";
xLng['WARSIMOPTION1'] = "Interno (quello presente nel gioco)";
xLng['WARSIMOPTION2'] = "Esterno (fornito da kirilloid.ru)";
xLng['27'] = "World Analyser da utilizzare";
xLng['28'] = "Mostra link statistiche World Analyser";
xLng['NONEWVER'] = "É già installata l'ultima versione disponibile";
xLng['BVER'] = "Potresti avere una versione Beta";
xLng['NVERAV'] = "É disponibile una nuova versione";
xLng['UPDATESCRIPT'] = "Aggiornare ora lo script?";
xLng['CHECKUPDATE'] = "Controllo dell'ultima versione disponibile.<br>Attendere prego...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Popolazione media villaggi";
xLng['AVPOPPERPLAYER'] = "Popolazione media giocatori";
xLng['37'] = 'Mostra tabella ampliamento campi';
xLng['41'] = 'Mostra tabella ampliamento edifici';
xLng['69'] = "Livello di logging della console<br>SOLO PER SVILUPPATORI O PER DEBUGGING<br>(Default = 0)";
xLng['48'] = "Numero di pagine di offerte da precaricare<br>nella pagina 'Mercato => Visualizza offerte'<br>(Default = 1)";
xLng['U.3'] = 'Nome del villaggio capitale<br><b>Vai alla pagina del tuo Profilo per aggiornare i dati</b>';
xLng['U.6'] = 'Coordinate del villaggio capitale<br><b>Vai alla pagina del tuo Profilo per aggiornare i dati</b>';
xLng['TOTALTROOPSTRAINING'] = 'Totale truppe in addestramento';
xLng['57'] = 'Mostra distanze e tempi';
xLng['TBSETUPLINK'] = 'Impostazioni ' + TB3O.shN;
xLng['UPDATEALLVILLAGES'] = "Aggiorna tutti i villaggi.  USARE CON CAUTELA, potrebbe comportare il BAN dell`account!";
xLng['9'] = "Mostra links aggiuntivi nel menu di sinistra<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Mappa estesa';
xLng['USETHEMPR'] = 'Completa proporzionalmente';
xLng['USETHEMEQ'] = 'Completa equamente';
xLng['TOWNHALL'] = 'Municipio';
xLng['GAMESERVERTYPE'] = 'Server di gioco';
xLng['ACCINFO'] = 'Informazioni Account';
xLng['NOTEBLOCKOPTIONS'] = 'Blocco note';
xLng['MENULEFT'] = 'Menu di sinistra';
xLng['STATISTICS'] = 'Statistiche';
xLng['RESOURCEFIELDS'] = 'Campi di risorse';
xLng['VILLAGECENTER'] = 'Centro del villaggio';
xLng['MAPOPTIONS'] = 'Opzioni mappa';
xLng['COLOROPTIONS'] = 'Opzioni colori';
xLng['DEBUGOPTIONS'] = 'Opzioni di debug';
xLng['4'] = 'Mercato';
xLng['5'] = "Caserma/Campo d'addestramento/Officina/Scuderia";
xLng['6'] = "Municipio/Circolo degli eroi/Armeria/Fabbro";
xLng['HEROSMANSION'] = "Circolo degli eroi";
xLng['BLACKSMITH'] = 'Fabbro';
xLng['ARMOURY'] = 'Armeria';
xLng['NOW'] = 'Adesso';
xLng['CLOSE'] = 'Chiudi';
xLng['USE'] = 'Usa';
xLng['USETHEM1H'] = 'Completa con la produzione oraria';
xLng['OVERVIEW'] = 'Riepilogo';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Attacchi';
xLng['NEWS'] = 'News';
xLng['ADDCRTPAGE'] = 'Aggiungi pagina corrente';
xLng['SCRPURL'] = TB3O.shN;
xLng['50'] = "Numero di spie per l'invio di spiate";
xLng['SPACER'] = 'Separatore';
xLng['53'] = 'Mostra i tooltip con le informazioni sulle truppe';
xLng['MESREPOPTIONS'] = 'Messaggi e Report';
xLng['59'] = 'Numero di pagine di messaggi/report da precaricare<br>(Default = 1)';
xLng['ATTABLES'] = 'Tabella truppe';
xLng['MTW'] = 'Sprecate';
xLng['MTX'] = 'In eccesso';
xLng['MTC'] = 'Carico corrente';
xLng['ALLIANCEFORUMLINK'] = 'Link al forum esterno<br>(Lasciare vuoto per il forum interno)';
xLng['82.L'] = 'Blocca segnalibri (Nasconde le icone cancella, sposta in alto e sposta in basso)';
xLng['MTCL'] = 'Cancella tutto';
xLng['82.U'] = 'Sblocca segnalibri (Mostra le icone cancella, sposta in alto e sposta in basso)';
xLng['CLICKSORT'] = 'Clicca per ordinare';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Condivisa tra i villaggi';
xLng['VILLAGELIST'] = 'Elenco villaggi';
xLng['12'] = "Mostra i collegamenti a 'dorf1.php' e 'dorf2.php'";
xLng['UPDATEPOP'] = 'Aggiorna popolazione';
xLng['54'] = 'Mostra tooltip con tempi e distanza dai villaggi';
xLng['EDIT'] = 'Modifica';
xLng['NPCOPTIONS'] = 'Opzioni Mercato Nero';
xLng['26'] = 'Mostra calcoli/links per il Mercato Nero';
xLng['58'] = 'Mostra tabella dei giocatori/villaggi/oasi occupate';
xLng['NEWVILLAGEAV'] = 'Data/Ora';
xLng['TIMEUNTIL'] = 'Tempo di attesa';
xLng['61'] = 'Mostra tabella "Eliminare" nella pagina dei report';
xLng['62'] = "Mostra l'icona 'Invia messaggio' anche per me";
xLng['CENTERMAP'] = 'Centra la mappa su questo villaggio';
xLng['13'] = "Mostra l'icona 'Centra la mappa su questo villaggio'";
xLng['SENDTROOPS'] = 'Invia truppe';
xLng['64'] = 'Mostra dettagli nelle statistiche dei Reports';
xLng['7'] = "Castello/Residence/Accademia/Camera del tesoro";
xLng['PALACE'] = "Castello";
xLng['RESIDENCE'] = "Residence";
xLng['ACADEMY'] = "Accademia";
xLng['TREASURY'] = "Camera del tesoro";
xLng['45'] = "Mostra il livello delle strutture in costruzione lampeggiante";
xLng['14']= "Mostra le icone 'Invia truppe/Invia risorse'";
xLng['34'] = "Mostra PC/giorno nelle tabelle";
xLng['UPGTABLES'] = "Tabella risorse/costruzioni";
xLng['35'] = "Mostra consumo di grano nelle tabelle";
xLng['16'] = "Mostra la produzione di grano netta";
xLng['39'] = "Mostra grafici a barre delle risorse";
xLng['RESBARTABLETITLE'] = "Grafici a barre delle risorse";
xLng['40'] = "Mastra i grafici a barre delle risorse in una finestra";
xLng['21'] = "Mostra i segnalibri in una finestra";
xLng['23'] = "Mostra il blocco note in una finestra";
xLng['17'] = "Mostra la popolazione";
xLng['29'] = 'Map Analyser da usare';
xLng['30'] = 'Mostra il link alla mappa per gli utenti';
xLng['31'] = 'Mostra il link alla mappa per le alleanze';
xLng['3'] = 'Forza il calcolo della capacità di legionari e lancieri gallici<br>come nella versione 3.1<br>(per server con versione mista 3.1 & 3.5 - per adesso solo per server .de)';
xLng['63'] = 'Mostra report avanzati di TB3';
xLng['18'] = 'Mostra una lista dei villaggi aggiuntiva (su 2 colonne) in una finestra';
xLng['60'] = 'Mostra links per aprire i messaggi in un pop-up';
xLng['2'] = "Rimuovi banner pubblicitari";
xLng['19'] = 'Mostra informazioni su ampliamenti di costruzioni e movimenti di truppe';
xLng['32'] = "Mostra la 'barra di ricerca'";
xLng['33'] = "Mostra la 'barra di ricerca' in una finestra";
xLng['36'] = "Mostra i calcoli 'Risorse il/Residue' nelle tabelle di ampliamento/addestramento";
xLng['RESIDUE'] = 'Risorse residue se costruisci';
xLng['RESOURCES'] = 'Risorse';
xLng['SH1'] = "Apri il Profilo per il riconoscimento automatico delle informazioni sulla capitale<br>Costruisci il Campo di addestramento per il riconoscimento automatico del popolo e dopo apri il centro del villaggio";
xLng['46'] = "Mostra informazioni aggiuntive sui mercanti in arrivo";
xLng['42'] = 'Ordina le strutture per nome nella tabella di ampliamento';
xLng['15'] = "Mostra la produzione oraria di legno, argilla e ferro";
break;
case "de":
//by ms99
xLng['8'] = 'Allianz';
xLng['SIM'] = 'Kampfsimulator';
xLng['QSURE'] = 'Sind Sie sicher?';
xLng['LOSS'] = 'Rohstoff-Verluste';
xLng['PROFIT'] = 'Rentabilit&auml;t';
xLng['EXTAV'] = 'Ausbau m&ouml;glich';
xLng['PLAYER'] = 'Spieler';
xLng['VILLAGE'] = 'Dorf';
xLng['POPULATION'] = 'Einwohner';
xLng['COORDS'] = 'Koordinaten';
xLng['MAPTBACTS'] = 'Aktion';
xLng['SENDRES'] = 'H&auml;ndler schicken';
xLng['SAVED'] = 'Gespeichert';
xLng['YOUNEED'] = 'Ben&ouml;tige';
xLng['TODAY'] = 'heute';
xLng['TOMORROW'] = 'morgen';
xLng['DAYAFTERTOM'] = '&uuml;bermorgen';
xLng['MARKET'] = 'Marktplatz';
xLng['BARRACKS'] = 'Kaserne';
xLng['RALLYPOINT'] = 'Versammlungsplatz';
xLng['STABLE'] = 'Stall';
xLng['WORKSHOP'] = 'Werkstatt';
xLng['BUY'] = 'Kaufen';
xLng['SELL'] = 'Verkaufen';
xLng['SENDIGM'] = 'IGM schreiben';
xLng['LISTO'] = 'Genug';
xLng['ON'] = '';
xLng['AT'] = 'um';
xLng['EFICIENCIA'] = 'Effektivit&auml;t';
xLng['NEVER'] = 'Nie';
xLng['ALDEAS'] = 'Dörfer';
xLng['MAXTIME'] = 'Maximale Dauer';
xLng['TIEMPO'] = 'Zeit';
xLng['MAPA'] = 'Karte';
xLng['OFREZCO'] = 'Biete';
xLng['BUSCO'] = 'Suche';
xLng['TIPO'] = 'Tauschverh&auml;ltnis';
xLng['DISPONIBLE'] = 'Nur annehmbare Angebote';
xLng['CUALQUIERA'] = 'Beliebig';
xLng['YES'] = 'Ja';
xLng['NO'] = 'Nein';
xLng['MARCADORES'] = 'Lesezeichen';
xLng['ANYADIR'] = 'Hinzuf&uuml;gen';
xLng['UBU'] = 'Lesezeichen URL';
xLng['UBT'] = 'Lesezeichen Text';
xLng['ELIMINAR'] = 'Entfernen';
xLng['CHKSCRV'] = 'Update TBeyond';
xLng['ACTUALIZAR'] = 'Update Dorf Info';
xLng['ARCHIVE'] = 'Archiv';
xLng['VENTAS'] = 'Gespeicherte Angebote';
xLng['SUMMARY'] = 'Zusammenfassung';
xLng['BIGICONS'] = 'Zusätzliche Icons';
xLng['22'] = 'Notizblock anzeigen';
xLng['SAVE'] = 'Speichern';
xLng['49'] = 'Standard Aktion Versammlungsplatz';
xLng['AT2'] = 'Unterstützung';
xLng['AT3'] = 'Angriff: Normal';
xLng['AT4'] = 'Angriff: Raubzug';
xLng['24'] = 'Gr&ouml;sse Notizblock';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normal (klein)';
xLng['NBSIZEBIG'] = 'Breiter Monitor (breit)';
xLng['25'] = 'Notizblock: Höhe';
xLng['NBAUTOEXPANDHEIGHT'] = 'Höhe automatisch anpassen';
xLng['NBKEEPHEIGHT'] = 'Standard Höhe';
xLng['43'] = 'Levels im Dorfzentrum anzeigen';
xLng['NPCSAVETIME'] = 'Zeitgewinn';
xLng['38'] = 'Ressilevel Farbcode anzeigen';
xLng['44'] = 'Geb&auml;udelevel Farbcode anzeigen';
xLng['TOTALTROOPS'] = 'Truppen dieses Dorfes';
xLng['20'] = 'Lesezeichen anzeigen';
xLng['U.2'] = 'Volk';
xLng['1'] = "Travian v2.x Server";
xLng['28'] = "Analyser Statistiklinks anzeigen";
xLng['SELECTALLTROOPS'] = "Alle Truppen ausw&auml;hlen";
xLng['PARTY'] = "Feste";
xLng['CPPERDAY'] = "KPs/Tag";
xLng['SLOT'] = "Slots";
xLng['SELECTSCOUT'] = "Sp&auml;her ausw&auml;hlen";
xLng['SELECTFAKE'] = "Fake Truppen ausw&auml;hlen";
xLng['NOSCOUT2FAKE'] = "Es ist unmöglich Späher für einen Fake zu benutzen!";
xLng['NOTROOP2FAKE'] = "Keine Truppen vorhanden um einen Fake Angriff zu starten!";
xLng['NOTROOP2SCOUT'] = "Keine Truppen vorhanden um einen Spähangriff zu starten!";
xLng['NOTROOPS'] = "Keine Truppen im Dorf!";
xLng['ALL'] = "Alles";
xLng['SH1'] = "Öffne Dein Profil für die automatische Erkennung des Hauptdorfs/Koordinaten<br>Kaserne bauen und dann Dorfzentrum öffnen für automatische Erkennung des Volkes";
xLng['SH2'] = "Was man in Farbfelder eintragen kann:<br>- (Englisch) <b>green</b> oder <b>red</b> oder <b>orange</b>, etc.<br>- HEX Farbkod, z.B. <b>#004523</b><br>- leer für Standardfarbe";
xLng['56'] = "Zelltyp auf der Karte anzeigen wenn Mauszeiger &uuml;ber Zelle";
xLng['WARSIMOPTION1'] = "Intern (vom Spiel zur Verfügung gestellt)";
xLng['WARSIMOPTION2'] = "Extern (von der kirilloid.ru Seite)";
xLng['27'] = "Benutze World Analyser";
xLng['28'] = "World Analyser Statistiklinks anzeigen";
xLng['NONEWVER'] = "Sie haben die letzte Version installiert";
xLng['BVER'] = "Sie haben vielleicht eine Beta Version installiert";
xLng['NVERAV'] = "Eine neue Version des Scripts steht zur Verfügung";
xLng['UPDATESCRIPT'] = "Script jetzt aktualisieren ?";
xLng['CHECKUPDATE'] = "Es wird nach einer neuen Scriptversion gesucht.<br>Bitte warten...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Durchschnitt: Bewohner/Dorf";
xLng['AVPOPPERPLAYER'] = "Durchschnitt: Bewohner/Spieler";
xLng['41'] = "Upgradetabelle f&uuml;r Gebäude anzeigen";
xLng['69'] = "Log Level Konsole - Nur f&uuml;r Programmierer (Standard = 0)";
xLng['48'] = "Anzahl der Angebotsseiten auf der 'Markt => Kaufen' Seite,<br />die vom Server automatisch runtergeladen werden sollen (Standard = 1)";
xLng['TOTALTROOPSTRAINING'] = 'Total Truppen in Ausbildung';
xLng['57'] = 'Entfernungen & Zeiten anzeigen';
xLng['TBSETUPLINK'] = TB3O.shN + ' Einstellungen';
xLng['SHOWORIGREPORT'] = "Original Bericht anzeigen";
xLng['10'] = "Option Kampfsimulatorlink";
xLng['37'] = "Upgradetabelle f&uuml;r Resifelder anzeigen";
xLng['U.3'] = 'Name des Hauptdorfs';
xLng['U.6'] = 'Koordinaten des Hauptdorfs';
xLng['UPDATEALLVILLAGES'] = 'Alle Dörfer aktualisieren. BITTE MIT VORSICHT BENUTZEN, DIES KÖNNTE ZUR SPERRUNG DES ACCOUNTS FÜHREN !';
xLng['9'] = "Zusätzliche Links im linken Menü anzeigen<br />(Traviantoolbox, World Analyser, Travilog, Map, usw.)";
xLng['LARGEMAP'] = 'Große Karte';
xLng['USETHEMPR'] = 'Rohstoffe proportional verteilen';
xLng['USETHEMEQ'] = 'Rohstoffe gleichmäßig verteilen';
xLng['TOWNHALL'] = 'Rathaus';
xLng['GAMESERVERTYPE'] = 'Server';
xLng['ACCINFO'] = 'Account Info';
xLng['NOTEBLOCKOPTIONS'] = 'Notizblock';
xLng['MENULEFT'] = 'Menü links';
xLng['STATISTICS'] = 'Statistiken';
xLng['RESOURCEFIELDS'] = 'Rohstofffelder';
xLng['VILLAGECENTER'] = 'Dorfzentrum';
xLng['MAPOPTIONS'] = 'Karten Einstellung';
xLng['COLOROPTIONS'] = 'Farbeinstellungen  (Standard = Leer)';
xLng['65'] = 'Farbe "Upgrade möglich"';
xLng['66'] = 'Farbe "Max Level"';
xLng['67'] = 'Farbe "Upgrade nicht möglich"';
xLng['68'] = 'Farbe "Upgrade via NPC"';
xLng['DEBUGOPTIONS'] = 'Fehlersuche';
xLng['4'] = 'Marktplatz';
xLng['5'] = 'Versammlungsplatz/Kaserne/Stall/Werkstatt';
xLng['6'] = "Rathaus/Heldenhof/Rüstungs-/Waffenschmiede";
xLng['HEROSMANSION'] = "Heldenhof";
xLng['BLACKSMITH'] = 'Waffenschmiede';
xLng['ARMOURY'] = 'Rüstungsschmiede';
xLng['NOW'] = 'Jetzt';
xLng['CLOSE'] = 'Schließen';
xLng['USE'] = 'Benutze';
xLng['USETHEM1H'] = '1 Stundenproduktion schicken';
xLng['OVERVIEW'] = 'Übersicht';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Angriffe';
xLng['NEWS'] = 'News';
xLng['ADDCRTPAGE'] = 'Aktuelle Seite hinzufügen';
xLng['SCRPURL'] = 'TB-Homepage';
xLng['50'] = 'Anzahl der Späher für die "Späher auswählen" Funktion';
xLng['SPACER'] = 'Abstandshalter';
xLng['53'] = 'Truppeninformationen anzeigen (in Informations-Boxen)';
xLng['MESREPOPTIONS'] = 'Nachrichten & Berichte';
xLng['59'] = 'Anzahl der "Nachrichten & Berichte" Seiten<br />die vom Server automatisch runtergeladen werden sollen (Standard = 1)';
xLng['ATTABLES'] = 'Truppenübersicht';
xLng['MTW'] = 'Noch verfügbaren Platz verschwendet';
xLng['MTX'] = 'Zuviel';
xLng['MTC'] = 'Aktuell verwendet';
xLng['ALLIANCEFORUMLINK'] = 'Link externes Forum (Für internes Forum leer lassen)';
xLng['MTCL'] = 'Alle entfernen';
xLng['82.L'] = 'Lesezeichen sperren (Die Icons werden ausgeblendet)';
xLng['82.U'] = 'Lesezeichen entsperren (Die Icons f&uuml;rs L&ouml;schen und sortieren werden wieder angezeigt)';
xLng['CLICKSORT'] = 'Zum Sortieren klicken';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'F&uuml;r alle D&ouml;rfer verf&uuml;gbar';
xLng['VILLAGELIST'] = 'Dorfübersicht';
xLng['12'] = "Zeige die Links 'dorf1.php' und 'dorf2.php' an";
xLng['UPDATEPOP'] = 'Einwohnerzahl aktualisieren';
xLng['54'] = 'Zeige Entfernung & Zeiten zu den D&ouml;rfern in ToolTips an';
xLng['EDIT'] = 'Bearbeiten';
xLng['60']= 'Links um IGMs/KB in Pop-ups zu &ouml;ffnen anzeigen';
xLng['NPCOPTIONS'] = 'Optionen NPC Assistent';
xLng['26'] = 'NPC Assistent Kalkulation/Links anzeigen';
xLng['58'] = 'Tabelle der Spieler/D&ouml;rfer/besetzte Oasen anzeigen';
xLng['NEWVILLAGEAV'] = 'Datum/Uhrzeit';
xLng['TIMEUNTIL'] = 'Wartezeit';
xLng['61'] = '"Alle l&ouml;schen" Tabelle auf Berichte Seite anzeigen';
xLng['62'] = 'Zeige das "Sende IGM" Icon auch f&uuml;r mich an';
xLng['CENTERMAP'] = 'Zentriere Karte auf dieses Dorf';
xLng['13'] = 'Zeige "Zentriere Karte auf dieses Dorf" Icon an';
xLng['SENDTROOPS'] = 'Truppen schicken';
xLng['64'] = 'Details in Berichte Statistiken anzeigen';
xLng['7'] = "Palast/Residenz/Akademie/Schatzkammer";
xLng['PALACE'] = "Palast";
xLng['RESIDENCE'] = "Residenz";
xLng['ACADEMY'] = "Akademie";
xLng['TREASURY'] = "Schatzkammer";
xLng['45'] = "Blinkende Levels f&uuml;r Geb&auml;ude die gerade ausgebaut werden";
xLng['14']= "Zeige 'Truppen schicken/Rohstoffe verschicken' Icons in der Liste der D&ouml;rfer an";
xLng['34'] = "Zeige KP/Tag Info in den Upgradetabellen an";
xLng['UPGTABLES'] = "Ressifelder/Geb&auml;ude Upgradetabellen";
xLng['35'] = "Zeige Getreide-Verbrauch in Upgradetabellen an";
xLng['16'] = "Zeige effektive Getreide-Produktion in the Liste der D&ouml;fer an";
xLng['39'] = "Zeige die Ressi-Bar an";
xLng['RESBARTABLETITLE'] = "Ressi-Bar";
xLng['30'] = 'Links zur Karte anzeigen - Spieler';
xLng['31'] = 'Links zur Karte anzeigen - Allianzen';
xLng['40'] = "Zeige 'Ressi-Bar' als Floating-Fenster an";
xLng['21'] = "Zeige 'User Bookmarks' als Floating-Fenster an";
xLng['23'] = "Zeige 'NoteBlock' als Floating-Fenster an";
xLng['17'] = "Zeige Anzahl der Einwohner in der Liste der D&ouml;rfer an";
xLng['29'] = 'Option Karten-Analyser';
xLng['63'] = 'Zeige TB3 erweiterte Kampfreports';
xLng['3'] = 'T3.1 Tragekapazit&auml;t f&uuml;r Legion&auml;r & Phalanx erzwingen<br>(f&uuml;r T3.1 & T3.5 Spieleserver)';
xLng['18'] = 'Zeige eine zus&auml;tzliche D&ouml;rferliste (2 Spalten) als Floating-Fenster an';
xLng['42'] = 'Sortiere Geb&auml;ude nach Name in der Upgradetabelle';
xLng['19'] = 'Zeige Informationen &uuml;ber Geb&auml;ude die ausgebaut werden und<br>Truppenbewegungen in der Liste der D&ouml;rfer';
xLng['32'] = "Zeige 'Suche-Bar' an";
xLng['33'] = "Zeige 'Suche-Bar' als Floating-Fenster an";
xLng['36'] = "Zeige 'Am/Rest' Kalkulation in Upgrade/Ausbildungstabellen an";
xLng['RESIDUE'] = 'Rest wenn gebaut ';
xLng['RESOURCES'] = 'Rohstoffe';
xLng['2'] = 'Banners entfernen';
xLng['SH1'] = "Öffne Dein Profil f&uuml;r automatische Erkennung des Hauptdorfs und Koordinated<br>Baue eine Kaserne f&uuml;r die automatische Volkserkennung und &ouml;ffne dann das Dorfzentrum";
xLng['46'] = "Zeige zus&auml;tzliche Infos f&uuml;r jede H&auml;ndlerankunft";
xLng['15'] = "Zeige Produktion von Holz, Lehm, Eisen pro Stunde in der Liste der D&ouml;rfer an";
xLng['11'] = "Option Sitelink f&uuml;r das Hochladen der Reports";
break;
case "ro":
//by ms99
xLng['8'] = 'Alianţă';
xLng['SIM'] = 'Simulator luptă';
xLng['QSURE'] = 'Eşti sigur?';
xLng['LOSS'] = 'Pierderi';
xLng['PROFIT'] = 'Profit';
xLng['EXTAV'] = 'Upgrade posibil acum';
xLng['PLAYER'] = 'Jucător';
xLng['VILLAGE'] = 'Sat';
xLng['POPULATION'] = 'Populaţie';
xLng['COORDS'] = 'Coordonate';
xLng['MAPTBACTS'] = 'Acţiuni';
xLng['SAVED'] = 'Salvat';
xLng['YOUNEED'] = 'Ai nevoie de';
xLng['TODAY'] = 'azi';
xLng['TOMORROW'] = 'mâine';
xLng['DAYAFTERTOM'] = 'poimâine';
xLng['MARKET'] = 'Târg';
xLng['BARRACKS'] = 'Cazarmă';
xLng['RALLYPOINT'] = 'Adunare';
xLng['STABLE'] = 'Grajd';
xLng['WORKSHOP'] = 'Atelier';
xLng['SENDRES'] = 'Trimite resurse';
xLng['BUY'] = 'Cumpară';
xLng['SELL'] = 'Vinde';
xLng['SENDIGM'] = 'Trimite mesaj';
xLng['LISTO'] = 'Upgrade posibil';
xLng['ON'] = 'în';
xLng['AT'] = 'la';
xLng['EFICIENCIA'] = 'Eficienţă';
xLng['NEVER'] = 'Niciodată';
xLng['ALDEAS'] = 'Sat(e)';
xLng['TROPAS'] = 'Adunare';
xLng['TIEMPO'] = 'Timp';
xLng['OFREZCO'] = 'Oferă';
xLng['BUSCO'] = 'Caută';
xLng['TIPO'] = 'Tip';
xLng['DISPONIBLE'] = 'Doar cele disponibile';
xLng['CUALQUIERA'] = 'Oricare';
xLng['YES'] = 'Da';
xLng['NO'] = 'Nu';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Link-uri';
xLng['ANYADIR'] = 'Adaugă';
xLng['UBU'] = 'URL';
xLng['UBT'] = 'Text';
xLng['ELIMINAR'] = 'Şterge';
xLng['MAPA'] = 'Hartă';
xLng['MAXTIME'] = 'Timp maxim';
xLng['ARCHIVE'] = 'Arhivă';
xLng['SUMMARY'] = 'Rezumat';
xLng['TROPAS'] = 'Trupe';
xLng['CHKSCRV'] = 'Update TBeyond';
xLng['ACTUALIZAR'] = 'Actualizează informaţie sat';
xLng['VENTAS'] = 'Oferte salvate';
xLng['MAPSCAN'] = 'Scanează harta';
xLng['BIGICONS'] = 'Afişează icoane suplimentare';
xLng['22'] = 'Afişează bloc-notes';
xLng['SAVE'] = 'Salvează';
xLng['49'] = 'Acţiune standard adunare';
xLng['AT2'] = 'Întăriri';
xLng['AT3'] = 'Atac: Normal';
xLng['AT4'] = 'Atac: Raid';
xLng['24'] = 'Lăţime bloc-notes';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normal (ingust)';
xLng['NBSIZEBIG'] = 'Ecran lat (lat)';
xLng['25'] = 'Înălţime bloc-notes';
xLng['NBAUTOEXPANDHEIGHT'] = "Măreşte inălţimea automat";
xLng['NBKEEPHEIGHT'] = "Înălţime normală";
xLng['43'] = 'Afişează nivel clădiri';
xLng['NPCSAVETIME'] = 'Timp economisit';
xLng['38'] = 'Afişează culori nivel câmpuri resurse';
xLng['44'] = 'Afişează culori nivel clădiri';
xLng['65'] = 'Culoare upgrade posibil (Nimic = standard)';
xLng['66'] = 'Culoare nivel maxim (Nimic = standard)';
xLng['67'] = 'Culoare upgrade imposibil (Nimic = standard)';
xLng['68'] = 'Culoare upgrade posibil via NPC (Nimic = standard)';
xLng['TOTALTROOPS'] = 'Total trupe sat';
xLng['20'] = 'Afişează link-uri';
xLng['U.2'] = 'Rasă';
xLng['1'] = "Server Travian v2.x";
xLng['SELECTALLTROOPS'] = "Selectează toate trupele";
xLng['PARTY'] = "Festivităţi";
xLng['CPPERDAY'] = "PC/zi";
xLng['SLOT'] = "Slot";
xLng['TOTAL'] = "Total";
xLng['SELECTSCOUT'] = "Selectează spioni";
xLng['SELECTFAKE'] = "Selectează trupe fake";
xLng['NOSCOUT2FAKE'] = "Nu puteţi selecta spioni pentru un fake !";
xLng['NOTROOP2FAKE'] = "Nu există trupe pentru un fake !";
xLng['NOTROOP2SCOUT'] = "Nu există trupe pentru un atac de spionaj !";
xLng['NOTROOPS'] = "Nu există trupe in sat !";
xLng['ALL'] = "Tot";
xLng['SH1'] = "Deschide pagina Profil pentru detectarea automată a capitalei/coordonate<br>Contruieşte cazarma şi deschide pagina 'Centrul satului' pentru detectarea automată a rasei";
xLng['SH2'] = "În câmpurile de culori puteţi introduce:<br>- <b>green</b> sau <b>red</b> sau <b>orange</b>, etc.<br>- codul HEX al culorii, ex. <b>#004523</b><br>- loc liber = culoare standard";
xLng['SHOWORIGREPORT'] = "Afişează raport original (pentru forumuri)";
xLng['56'] = "Afişează tip celula/info vale părăsită (mousing over)";
xLng['10'] = "Link către simulator luptă<br>";
xLng['WARSIMOPTION1'] = "Intern (inclus in joc)";
xLng['WARSIMOPTION2'] = "Extern (pus la dispoziţie de către kirilloid.ru)";
xLng['27'] = "Utilizează World Analyser";
xLng['28'] = "Afişează link-uri către World Anlyser";
xLng['NONEWVER'] = "Ultima versiune disponibilă este instalată";
xLng['BVER'] = "Se poate să aveţi o versiune beta instalată";
xLng['NVERAV'] = "O versiune nouă a scriptului este disponibilă";
xLng['UPDATESCRIPT'] = "Doriţi să actualizaţi acum ?";
xLng['CHECKUPDATE'] = "Verific existenţa unei versiuni noi a scriptului...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Populaţie medie/sat";
xLng['AVPOPPERPLAYER'] = "Populaţie medie/jucător";
xLng['37'] = "Afişează tabel upgrade câmpuri de resurse";
xLng['41'] = "Afişează tabel upgrade clădiri";
xLng['69'] = "Log level consolă (DOAR PENTRU PROGRAMATORI)<br>(Standard = 0)";
xLng['48'] = "Numărul paginilor de oferte pre-încărcate pe pagina 'Târg => Cumpără'<br>(Standard = 1)";
xLng['U.3'] = 'Numele capitalei<br><b>Deschide Profilul pentru actualizare automată</b>';
xLng['U.6'] = 'Coordonatele capitalei<br><b>Deschide Profilul pentru actualizare automată</b>';
xLng['TOTALTROOPSTRAINING'] = 'Total trupe antrenate';
xLng['57'] = 'Afişează distanţe şi timpi de deplasare';
xLng['TBSETUPLINK'] = 'Opţiuni ' + TB3O.shN;
xLng['UPDATEALLVILLAGES'] = 'Actualizează toate satele.  Utilizează cu maximă atenţie.  Urmarea ar putea fi un cont banat !';
xLng['9'] = "Afişează link-uri adiţionale în meniul din stânga<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Harta mare';
xLng['USETHEMPR'] = 'Use them (proportional)';
xLng['USETHEMEQ'] = 'Use them (egal)';
xLng['TOWNHALL'] = 'Casa de cultură';
xLng['ACCINFO'] = 'Informaţii cont';
xLng['NOTEBLOCKOPTIONS'] = 'Bloc-notes';
xLng['MENULEFT'] = 'Meniu stânga';
xLng['STATISTICS'] = 'Statistică';
xLng['RESOURCEFIELDS'] = 'Câmpuri resurse';
xLng['VILLAGECENTER'] = 'Centrul satului';
xLng['MAPOPTIONS'] = 'Opţiuni hartă';
xLng['COLOROPTIONS'] = 'Opţiuni culori';
xLng['DEBUGOPTIONS'] = 'Opţiuni Debug';
xLng['4'] = 'Târg';
xLng['5'] = 'Adunare/Cazarmă/Atelier/Grajd';
xLng['6'] = "Casa de cultură/Reşedinţa eroului/Armurărie/Fierărie";
xLng['HEROSMANSION'] = "Reşedinţa eroului";
xLng['BLACKSMITH'] = 'Fierărie';
xLng['ARMOURY'] = 'Armurărie';
xLng['NOW'] = 'Acum';
xLng['CLOSE'] = 'Inchide';
xLng['USE'] = 'Use';
xLng['USETHEM1H'] = 'Use them (producţia/ora)';
xLng['OVERVIEW'] = 'Perspectivă';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Atacuri';
xLng['NEWS'] = 'Stiri';
xLng['ADDCRTPAGE'] = 'Pagina curentă';
xLng['SCRPURL'] = 'Pagina TBeyond';
xLng['50'] = 'Număr de spioni pentru funcţia "Selectează spioni"';
xLng['SPACER'] = 'Delimitator';
xLng['53'] = 'Afişează informaţii despre trupe în tooltips';
xLng['MESREPOPTIONS'] = 'Mesaje & Rapoarte';
xLng['59'] = 'Numărul paginilor de mesaje/rapoarte pre-încărcate<br>(Standard = 1)';
xLng['ATTABLES'] = 'Tabele trupe';
xLng['MTW'] = 'Risipă';
xLng['MTX'] = 'Excedent';
xLng['MTC'] = 'Transport actual';
xLng['ALLIANCEFORUMLINK'] = 'Link către forum extern (Forum intern = loc liber)';
xLng['MTCL'] = 'Sterge tot';
xLng['82.L'] = 'Ascunde icoanele "Sterge", "în sus", "în jos"';
xLng['82.U'] = 'Afişează icoanele "Sterge", "în sus", "în jos"';
xLng['CLICKSORT'] = 'Click pentru sortare';
xLng['SAVEGLOBAL'] = 'Valabilă în toate satele';
xLng['VILLAGELIST'] = 'Lista satelor';
xLng['12'] = "Afişează icoanele pentru 'dorf1.php' şi 'dorf2.php'";
xLng['UPDATEPOP'] = 'Actualizează populaţia satelor';
xLng['54'] = 'Afişează distanţe/timpi către sate în tooltips';
xLng['EDIT'] = 'Modifică';
xLng['60'] = 'Afişează icoane pentru a deschide mesajele/rapoartele într-un pop-up';
xLng['NPCOPTIONS'] = 'Opţiuni NPC Assistant';
xLng['26'] = 'Afişează calcule/link-uri NPC Assistant';
xLng['58'] = 'Afişează tabel jucători/sate/oaze ocupate';
xLng['NEWVILLAGEAV'] = 'Data/Ora';
xLng['TIMEUNTIL'] = 'Timp de aşteptare';
xLng['61'] = 'Afişează tabela "Sterge toate" pe pagina de rapoarte';
xLng['62'] = 'Afişează icon-ul "Trimite IGM" şi pentru mine';
xLng['CENTERMAP'] = 'Centrează harta pe acest sat';
xLng['13'] = 'Afişează icon-ul "Centrează harta pe acest sat"';
xLng['SENDTROOPS'] = 'Trimite trupe';
xLng['64'] = 'Afişează detalii in statistica raport';
xLng['7'] = "Palat/Vilă/Academie/Trezorerie";
xLng['PALACE'] = "Palat";
xLng['RESIDENCE'] = "Vilă";
xLng['ACADEMY'] = "Academie";
xLng['TREASURY'] = "Trezorerie";
xLng['45'] = "Nivelul clădirilor aflate în construcţie clipeşte";
xLng['14']= "Afişează icoanele 'Trimite trupe' si 'Trimite resurse'<br>în lista satelor";
xLng['34'] = "Afişează PC/zi în tabelele de upgrade";
xLng['UPGTABLES'] = "Tabele Upgrade campuri de resurse/clădiri";
xLng['35'] = "Afişează consumul de hrană în tabelele de upgrade";
xLng['16'] = "Afişează producţia efectivă de hrană în lista satelor";
xLng['39'] = "Afişează tabela 'Bară resurse'";
xLng['RESBARTABLETITLE'] = "Bară resurse";
xLng['30'] = 'Afişează link-uri către hartă - jucători';
xLng['31'] = 'Afişează link-uri către hartă - alianţe';
xLng['40'] = "Afişează 'Bară resurse' ca fereastră separată (floating)";
xLng['21'] = "Afişează 'Link-uri' ca fereastră separată (floating)";
xLng['23'] = "Afişează 'Bloc-notes' ca fereastră separată (floating)";
xLng['17'] = "Afişează populaţia în lista satelor";
xLng['29'] = 'Utilizează "Map Analyser"';
xLng['63'] = 'Afişează rapoarte extinse TB3';
xLng['3'] = 'Utilizează capacitatea de transport din T3.1 (legionari & scutieri)<br>(servere mixte T3.1 & T3.5)';
xLng['18'] = 'Afişează o listă adiţională a satelor (2 coloane)<br> ca fereastră separată (floating)';
xLng['42'] = 'Sortează după nume clădirile în tabelul upgrade clădiri';
xLng['19'] = 'Afişează informaţii despre clădirile în extindere şi<br>mişcarile de trupe în lista satelor';
xLng['32'] = "Afişează 'Bară căutare'";
xLng['33'] = "Afişează 'Bară căutare' ca fereastră separată (floating)";
xLng['36'] = "Afişează calcule 'Resurse la/Rest' în tabelele de <br>upgrade/instruire trupe";
xLng['RESIDUE'] = 'Rest în cazul construcţiei ';
xLng['RESOURCES'] = 'Resurse';
xLng['2'] = 'Elimină banere reclame';
xLng['SH1'] = "Deschide Profilul pentru recunoaşterea automată a capitalei/coordonatelor<br>Construieşte cazarma şi deschide centrul satului pentru recunoaşterea automată a rasei";
xLng['46'] = "Afişează informaţii suplimentare pentru fiecare negustor care soseşte";
xLng['15'] = "Afişează producţia de lemn, lut, fier pe oră în lista satelor";
xLng['11'] = "Link către site-ul pentru postat rapoarte";
break;
case "ar":
case "cl":
case "mx":
//by Leonel (aka Phob0z) & Gabraham
xLng['8'] = 'Alianza';
xLng['SIM'] = 'Simulador de combate';
xLng['QSURE'] = "\u00bfEst\u00e1s seguro?";
xLng['LOSS'] = 'P&eacute;rdidas';
xLng['PROFIT'] = 'Ganancias';
xLng['EXTAV'] = 'Subir nivel';
xLng['PLAYER'] = 'Jugador';
xLng['VILLAGE'] = 'Aldea';
xLng['POPULATION'] = 'Poblaci&oacute;n';
xLng['COORDS'] = 'Coordenadas';
xLng['MAPTBACTS'] = 'Acciones';
xLng['SAVED'] = 'Guardado';
xLng['YOUNEED'] = 'Te falta';
xLng['TODAY'] = 'hoy';
xLng['TOMORROW'] = 'ma&ntilde;ana';
xLng['DAYAFTERTOM'] = 'pasado ma&ntilde;ana';
xLng['MARKET'] = 'Mercado';
xLng['BARRACKS'] = 'Cuartel';
xLng['RALLYPOINT'] = 'Plaza de reuniones';
xLng['STABLE'] = 'Establo';
xLng['WORKSHOP'] = 'Taller';
xLng['SENDRES'] = 'Enviar recursos';
xLng['BUY'] = 'Comprar';
xLng['SELL'] = 'Vender';
xLng['SENDIGM'] = 'Enviar IGM';
xLng['LISTO'] = 'Listo';
xLng['ON'] = 'el';
xLng['AT'] = 'a las';
xLng['EFICIENCIA'] = 'Eficiencia';
xLng['NEVER'] = 'Nunca';
xLng['ALDEAS'] = 'Aldea(s)';
xLng['TIEMPO'] = 'Tiempo';
xLng['OFREZCO'] = 'Ofrezco';
xLng['BUSCO'] = 'Busco';
xLng['TIPO'] = 'Tipo';
xLng['DISPONIBLE'] = 'Solo disponible';
xLng['CUALQUIERA'] = 'Cualquiera';
xLng['YES'] = 'Si';
xLng['NO'] = 'No';
xLng['LOGIN'] = 'Ingresar';
xLng['MARCADORES'] = 'Marcadores';
xLng['ANYADIR'] = 'A\u00f1adir';
xLng['UBU'] = 'URL del nuevo Marcador';
xLng['UBT'] = 'Nombre del nuevo Marcador';
xLng['ELIMINAR'] = 'Eliminar';
xLng['MAPA'] = 'Mapa';
xLng['MAXTIME'] = 'Tiempo m&aacute;ximo';
xLng['ARCHIVE'] = 'Archivar';
xLng['SUMMARY'] = 'Resumen';
xLng['TROPAS'] = 'Tropas';
xLng['CHKSCRV']  = 'Actualice TBeyond';
xLng['ACTUALIZAR'] = 'Actualizar informaci&oacute;n de aldea';
xLng['VENTAS'] = 'Guardar ofertas';
xLng['MAPSCAN'] = 'Escanear el Mapa';
xLng['BIGICONS'] = 'Mostrar iconos de acceso r&aacute;pido';
xLng['22'] = 'Mostrar hoja de notas';
xLng['SAVE'] = 'Guardar';
xLng['49'] = 'Opci&oacute;n por defecto cuando se mandan tropas';
xLng['AT2'] = 'Refuerzos';
xLng['AT3'] = 'Ataque: Normal';
xLng['AT4'] = 'Ataque: Asalto';
xLng['24'] = 'Tama&ntilde;o de la hoja de notas';
xLng['NBSIZEAUTO'] = 'Autom\u00e1tico';
xLng['NBSIZENORMAL'] = 'Normal';
xLng['NBSIZEBIG'] = 'Grande';
xLng['25'] = 'Altura de la hoja de notas';
xLng['NBAUTOEXPANDHEIGHT'] = 'Expandir altura autom\u00e1ticamente';
xLng['NBKEEPHEIGHT'] = 'Altura por defecto';
xLng['43'] = 'Mostrar el nivel de las construcciones en el centro de la aldea';
xLng['NPCSAVETIME'] = 'Tiempo ahorrado: ';
xLng['38'] = 'Mostrar colores en el nivel de los recursos';
xLng['44'] = 'Mostrar colores en el nivel de las construcciones';
xLng['65'] = 'Color para las actualizaciones disponibles';
xLng['66'] = 'Color para los niveles m&aacute;ximos';
xLng['67'] = 'Color para las actualizaciones no disponibles';
xLng['68'] = 'Color para actualizar por medio de NPC';
xLng['TOTALTROOPS'] = 'Tropas totales de la aldea';
xLng['20'] = 'Mostrar marcadores';
xLng['U.2'] = 'Raza';
xLng['1'] = "Servidor Travian v2.x?";
xLng['SELECTALLTROOPS'] = "Seleccionar todas las tropas";
xLng['PARTY'] = "Fiesta";
xLng['CPPERDAY'] = "PC/d\u00eda";
xLng['SLOT'] = "Espacios disp.";
xLng['TOTAL'] = "Total";
xLng['SELECTSCOUT'] = "Seleccionar esp&iacute;as";
xLng['SELECTFAKE'] = "Seleccionar unidad para fake";
xLng['NOSCOUT2FAKE'] = "No es posible usar esp\u00edas para un fake!";
xLng['NOTROOP2FAKE'] = "No hay tropas para usar como fake!";
xLng['NOTROOP2SCOUT'] = "No hay esp\u00edas!";
xLng['NOTROOPS'] = "No hay tropas en la aldea!";
xLng['ALL'] = "Todo";
xLng['SH2'] = "En los campos para escribir en el color, puedes poner:<br>- <b>green</b> o <b>red</b> o <b>orange</b>, etc.<br>- El c&oacute;digo Hexadecimal del color.<br>- D&eacute;jalo vac&iacute;o para usar el color por defecto";
xLng['SHOWORIGREPORT'] = "Mostrar reporte original (para poner en foros)";
xLng['56'] = "Mostrar el tipo de casilla al ponerle el cursor encima";
xLng['10'] = "&iquest;Qu&eacute; simulador de combate usar?:<br>(men&uacute; izquierdo)";
xLng['WARSIMOPTION1'] = "Interno (el que trae travian por defecto)";
xLng['WARSIMOPTION2'] = "Externo (kirilloid.ru)";
xLng['27'] = "&iquest;Qu&eacute; analizador usar para las estad&iacute;sticas?";
xLng['28'] = "Mostrar enlaces del analizador de estadisticas<br>(icono del mundo al lado de usuarios/alianzas)";
xLng['NONEWVER'] = "Tiene la \u00faltima versi\u00f3n disponible";
xLng['BVER'] = "Tal ves tengas una versi\u00f3n beta";
xLng['NVERAV'] = "Hay una nueva versi\u00f3n del script disponible";
xLng['UPDATESCRIPT'] = "Actualizar el script?";
xLng['CHECKUPDATE'] = "Buscando nuevas versiones del script.<br>Por favor espera...";
xLng['CROPFINDER'] = 'Buscar Cultivos';
xLng['AVPOPPERVIL'] = "Poblaci&oacute;n promedio por aldea";
xLng['AVPOPPERPLAYER'] = "Poblaci&oacute;n promedio por jugador";
xLng['37'] = "Mostrar la tabla de actualizaci&oacute;n de los recursos";
xLng['41'] = "Mostrar la tabla de actualizaci&oacute;n de las construcciones";
xLng['69'] = "Nivel de Registro de la Consola<br>SOLO PARA PROGRAMADORES O DEPURACI&Oacute;N<br>(Valor por defecto = 0)";
xLng['48'] = "P&aacute;ginas mostradas en la secci&oacute;n 'Comprar' del mercado<br>(Valor por defecto = 1)";
xLng['U.3'] = 'Nombre de tu capital<br><b>Revisa tu perfil para actualizarla</b>';
xLng['U.6'] = 'Coordenadas de tu capital<br><b>Revisa tu perfil para actualizarla</b>';
xLng['MAX'] = 'Max.';
xLng['TOTALTROOPSTRAINING'] = 'Tropas totales que se estan creando';
xLng['57'] = 'Mostrar distancias y tiempos en tooltips';
xLng['TBSETUPLINK'] = 'Config. de TBeyond';
xLng['UPDATEALLVILLAGES'] = 'Actualizar todas las aldeas. USAR CON MUCHO CUIDADO, PUEDE LLEVAR A QUE BORREN TU CUENTA!';
xLng['9'] = "Mostrar enlaces adicionales en el menu de la izquierda<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Mapa grande';
xLng['USETHEMPR'] = 'Llenar proporcionalmente a la cantidad de cada recurso que hay en los almacenes';
xLng['USETHEMEQ'] = 'Llenar con la misma cantidad de cada recurso';
xLng['TOWNHALL'] = 'Ayuntamiento';
xLng['GAMESERVERTYPE'] = 'Versi&oacute;n del servidor';
xLng['ACCINFO'] = 'Informaci\u00f3n de la Cuenta';
xLng['NOTEBLOCKOPTIONS'] = 'Hoja de notas';
xLng['MENULEFT'] = 'Men&uacute; en el lado izquierdo';
xLng['STATISTICS'] = 'Estad&iacute;sticas';
xLng['RESOURCEFIELDS'] = 'Campos de recursos';
xLng['VILLAGECENTER'] = 'Centro de la aldea';
xLng['MAPOPTIONS'] = 'Opciones del Mapa';
xLng['COLOROPTIONS'] = 'Opciones de color';
xLng['DEBUGOPTIONS'] = 'Opciones de depuraci&oacute;n (DEBUG)';
xLng['4'] = 'Mercado';
xLng['5'] = 'Plaza de reuniones/Cuartel/Taller/Establo';
xLng['6'] = "Ayuntamiento/Hogar del H&eacute;roe/Armer&iacute;a/Herrer&iacute;a";
xLng['HEROSMANSION'] = "Hogar del H&eacute;roe";
xLng['BLACKSMITH'] = 'Armer&iacute;a';
xLng['ARMOURY'] = 'Herrer&iacute;a';
xLng['NOW'] = 'Ahora';
xLng['CLOSE'] = 'Cerrar';
xLng['USE'] = 'Usar';
xLng['USETHEM1H'] = 'Llenar con 1 hora de producci&oacute;n de esta aldea';
xLng['OVERVIEW'] = 'Resumen';
xLng['FORUM'] = 'Foro';
xLng['ATTACKS'] = 'Ataques';
xLng['NEWS'] = 'Noticias';
xLng['ADDCRTPAGE'] = 'A\u00F1adir P\u00E1gina Actual';
xLng['SCRPURL'] = 'P\u00E1g. de TBeyond';
xLng['50'] = 'N° de esp&iacute;as para selecionar por defecto en "Seleccionar espías"';
xLng['SPACER'] = 'Separador';
xLng['53'] = 'Mostrar informaci&oacute;n de tropas en tooltips';
xLng['MESREPOPTIONS'] = 'Mensajes y Reportes';
xLng['59'] = 'N&uacute;mero de pag&iacute;nas de mensajes/reportes precargadas<br>(Valor por defecto = 1)';
xLng['ATTABLES'] = 'Tabla de tropas';
xLng['MTW'] = 'Disponible';
xLng['MTX'] = 'Excedido';
xLng['MTC'] = 'Carga actual';
xLng['ALLIANCEFORUMLINK'] = 'V&iacute;nculo a foro externo<br>(Dejar en blanco para foro interno)';
xLng['82.L'] = 'Bloquear marcadores (Ocultar iconos de eliminar, subir, bajar)';
xLng['MTCL'] = 'Limpiar todo';
xLng['82.U'] = 'Desbloquear marcadores (Mostrar iconos de eliminar, subir, bajar)';
xLng['CLICKSORT'] = 'Haga clic para ordenar';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = "Compartir entre las aldeas";
xLng['VILLAGELIST'] = 'Lista de Aldeas';
xLng['12'] = "Mostrar enlaces 'dorf1.php' y 'dorf2.php'";
xLng['UPDATEPOP'] = 'Actualizar habitantes';
xLng['54'] = 'Mostrar tiempos y distancias a aldeas en tooltips';
xLng['EDIT'] = 'Editar';
xLng['58'] = 'Mostrar tabla de Jugadores/Aldeas/Oasis ocupados';
xLng['NEWVILLAGEAV'] = 'Fecha/Hora';
xLng['TIMEUNTIL'] = 'Tiempo a esperar';
xLng['61'] = 'Mostrar la tabla "Borrar todo" en la p\u00e1gina de Informes';
xLng['62'] = 'Mostrar \u00edcono "Enviar IGM" tambi\u00e9n para mi';
xLng['CENTERMAP'] = 'Centrar mapa sobre esta aldea';
xLng['13'] = 'Mostrar \u00edcono "Centrar mapa sobre esta aldea"';
xLng['SENDTROOPS'] = 'Enviar tropas';
xLng['64'] = 'Mostrar detalles en Inf\u00f3rmes Estad\u00edsticos';
xLng['7'] = "Palacio/Residencia/Academia/Tesoro";
xLng['PALACE'] = "Palacio";
xLng['RESIDENCE'] = "Residencia";
xLng['ACADEMY'] = "Academia";
xLng['TREASURY'] = "Tesoro";
xLng['45'] = "Mostrar nivel parpadeando en los edificios que est\u00e1n siendo ampliados";
xLng['14'] = "Mostrar \u00edcono 'Enviar tropas/Enviar recursos' en lista de aldeas";
xLng['36'] = "Mostrar los cálculos de 'Hasta entonces/Excedentes'<br>en las tablas de entrenamiento/mejora";
xLng['RESIDUE'] = 'Excedentes si construyes ';
xLng['RESOURCES'] = 'Recursos';
xLng['34'] = 'Mostrar PC/d\u00EDa en tablas de actualizaci\u00F3n';
xLng['UPGTABLES'] = 'Tablas de actualizaci\u00F3n de Recursos y Edificios';
xLng['35'] = 'Mostrar consumo de cereales en tablas de actualizaci\u00F3n';
xLng['16'] = 'Mostrar producci\u00F3n efectiva de cereales en lista de aldeas';
xLng['RESBARTABLETITLE'] = 'Barras de Recursos';
xLng['39'] = "Mostrar tabla 'Barras de Recursos'";
xLng['40'] = "Mostrar tabla 'Barras de Recursos' como ventana flotante";
xLng['21'] = "Mostrar 'marcadores' como ventana flotante";
xLng['23'] = "Mostrar 'hoja de notas' como ventana flotante";
xLng['17'] = 'Mostrar cantidad de habitantes en lista de aldeas';
xLng['29'] = 'Analizador de Mapas a ser usado';
xLng['30'] = 'Mostrar v\u00EDnculo a mapa, para un usuario';
xLng['31'] = 'Mostrar v\u00EDnculo a mapa, para una alianza';
xLng['63'] = 'Mostrar Reportes de Batalla mejorados de TB3';
xLng['18'] = 'Mostrar lista de aldeas adicional (2 columnas) como ventana flotante';
xLng['60'] = 'Mostrar v\u00EDnculos para abrir mensajes/informes como ventanas emergentes';
xLng['42'] = 'Ordenar edificios por su nombre en tablas de actualizaci\u00F3n';
xLng['19'] = 'Mostrar informaci\u00F3n acerca de edificios en construcci\u00F3n y movimiento de tropas<br>en lista de aldeas';
xLng['32'] = "Mostrar 'Buscador'";
xLng['3'] = 'Forzar el c\u00E1lculo de capacidad de Legionarios y Falanges seg\u00FAn T3.1<br>(para servidores mixtos T3.1 & T3.5)';
xLng['33'] = "Mostrar 'Buscador' como ventana flotante";
xLng['2'] = 'Quitar banners publicitarios';
xLng['SH1'] = "Abra su Perfil para detectar autom\u00E1ticamente la capital/coordenadas<br>Construya el cuartel para la detecci\u00F3n autom\u00E1tica de la raza y<br>abra entonces el centro de la aldea";
xLng['46'] = "Mostrar informaci\u00F3n adicional para cada mercader en camino";
break;
case "es":
//by Psicothika
xLng['8'] = 'Alianza';
xLng['SIM'] = 'Simulador de combate';
xLng['QSURE'] = '¿Estás seguro?';
xLng['LOSS'] = 'Pérdidas';
xLng['PROFIT'] = 'Ganancias';
xLng['EXTAV'] = 'Subir nivel';
xLng['PLAYER'] = 'Jugador';
xLng['VILLAGE'] = 'Aldea';
xLng['POPULATION'] = 'Población';
xLng['COORDS'] = 'Coordenadas';
xLng['MAPTBACTS'] = 'Acciones';
xLng['SAVED'] = 'Guardado';
xLng['YOUNEED'] = 'Te falta';
xLng['TODAY'] = 'hoy';
xLng['TOMORROW'] = 'mañana';
xLng['DAYAFTERTOM'] = 'pasado mañana';
xLng['MARKET'] = 'Mercado';
xLng['BARRACKS'] = 'Cuartel';
xLng['RALLYPOINT'] = 'Plaza de reuniones';
xLng['STABLE'] = 'Establo';
xLng['WORKSHOP'] = 'Taller';
xLng['SENDRES'] = 'Enviar recursos';
xLng['BUY'] = 'Comprar';
xLng['SELL'] = 'Vender';
xLng['SENDIGM'] = 'Enviar IGM';
xLng['LISTO'] = 'Disponible';
xLng['ON'] = 'el';
xLng['AT'] = 'a las';
xLng['EFICIENCIA'] = 'Eficacia';
xLng['NEVER'] = 'Nunca';
xLng['ALDEAS'] = 'Aldea(s)';
xLng['TIEMPO'] = 'Tiempo';
xLng['OFREZCO'] = 'Ofrezco';
xLng['BUSCO'] = 'Busco';
xLng['TIPO'] = 'Tipo';
xLng['DISPONIBLE'] = 'Solo disponible';
xLng['CUALQUIERA'] = 'Cualquiera';
xLng['YES'] = 'Si';
xLng['NO'] = 'No';
xLng['LOGIN'] = 'Identificarse';
xLng['MARCADORES'] = 'Marcadores';
xLng['ANYADIR'] = 'Añadir';
xLng['UBU'] = 'URL del nuevo Marcador';
xLng['UBT'] = 'Nombre del nuevo Marcador';
xLng['ELIMINAR'] = 'Eliminar';
xLng['MAPA'] = 'Mapa';
xLng['MAXTIME'] = 'Tiempo máximo';
xLng['ARCHIVE'] = 'Archivar';
xLng['SUMMARY'] = 'Resumen';
xLng['TROPAS'] = 'Tropas';
xLng['CHKSCRV'] = 'Actualizar TBeyond';
xLng['ACTUALIZAR'] = 'Actualizar información sobre la aldea';
xLng['VENTAS'] = 'Guardar ofertas';
xLng['MAPSCAN'] = 'Escanear el Mapa';
xLng['BIGICONS'] = 'Mostrar iconos de acceso rápido';
xLng['22'] = 'Mostrar block de notas';
xLng['SAVE'] = 'Guardar';
xLng['49'] = 'Opción por defecto para el envió de tropas';
xLng['AT2'] = 'Refuerzos';
xLng['AT3'] = 'Ataque: Normal';
xLng['AT4'] = 'Ataque: Atraco';
xLng['24'] = 'Tamaño del block de notas';
xLng['NBSIZEAUTO'] = 'Automático';
xLng['NBSIZENORMAL'] = 'Normal (pequeño)';
xLng['NBSIZEBIG'] = 'Grande (alargado)';
xLng['25'] = 'Altura del block de notas';
xLng['NBAUTOEXPANDHEIGHT'] = 'Expandir altura automáticamente';
xLng['NBKEEPHEIGHT'] = 'Altura por defecto';
xLng['43'] = 'Mostrar el nivel de las construcciones en el centro de la aldea';
xLng['NPCSAVETIME'] = 'Tiempo ahorrado: ';
xLng['38'] = 'Mostrar colores en el nivel de los recursos';
xLng['44'] = 'Mostrar colores en el nivel de las construcciones';
xLng['65'] = 'Color para las actualizaciones disponibles <br>(Defecto = En blanco)';
xLng['66'] = 'Color para los niveles máximos<br>(Defecto = En blanco)';
xLng['67'] = 'Color para las actualizaciones no disponibles<br>(Defecto = En blanco)';
xLng['68'] = 'Color para actualizar por medio de NPC<br>(Defecto = En blanco)';
xLng['TOTALTROOPS'] = 'Total de tropas de la aldea';
xLng['20'] = 'Mostrar marcadores';
xLng['U.2'] = 'Raza';
xLng['1'] = "Servidor de Travian v2.x?";
xLng['SELECTALLTROOPS'] = "Seleccionar todas las tropas";
xLng['PARTY'] = "Fiesta";
xLng['CPPERDAY'] = "PC por día";
xLng['SLOT'] = "Espacio disponible";
xLng['TOTAL'] = "Total";
xLng['SELECTSCOUT'] = "Seleccionar espías";
xLng['SELECTFAKE'] = "Seleccionar unidad para fake (Engaño)";
xLng['NOSCOUT2FAKE'] = "No es posible usar espías para hacer un fake!";
xLng['NOTROOP2FAKE'] = "No hay tropas para usar como fake!";
xLng['NOTROOP2SCOUT'] = "No hay espías!";
xLng['NOTROOPS'] = "No hay tropas en la aldea!";
xLng['ALL'] = "Todo";
xLng['NORACE'] = "Construir el cuartel para determinar automáticamente la raza y / o abrir el centro de la aldea ...";
xLng['SH2'] = "Puedes modificar o personalizar los colores, escribiendo en los campos destinados al color:<br>- Green, Red, orange, etc.<br>- El código Hexadecimal del color como por ejemplo #004523.<br>- Dejar en blanco para usar el color por defecto.";
xLng['SHOWORIGREPORT'] = "Mostrar el reporte original (para poner en foros)";
xLng['56'] = "Mostar la descripción del tipo de casilla/oasis<br>al pasar el mouse por encima de la casilla.";
xLng['10'] = "¿Qué simulador de ataque deseas usar?:<br>(menú izquierdo)";
xLng['WARSIMOPTION1'] = "Interno (el que trae travian por defecto)";
xLng['WARSIMOPTION2'] = "Externo (promovido por kirilloid.ru)";
xLng['27'] = "¿Qué Analizador de estadísticas deseas usar?";
xLng['28'] = "Mostrar enlaces del analizador de estadísticas<br>(icono de la bola del mundo al lado de usuarios/alianzas)";
xLng['NONEWVER'] = "Usted tiene la última versión disponible";
xLng['BVER'] = "Usted dispone de una versión de prueba";
xLng['NVERAV'] = "Una nueva versión del script está disponible";
xLng['UPDATESCRIPT'] = "¿Actualizar el script?";
xLng['CHECKUPDATE'] = "Buscando una nueva versión del script.<br>Por favor espere...";
xLng['CROPFINDER'] = "Búsqueda 9c / 15c";
xLng['AVPOPPERVIL'] = "Promedio de población por aldea";
xLng['AVPOPPERPLAYER'] = "Promedio de población por jugador";
xLng['37'] = "Mostrar la tabla de actualización de recursos";
xLng['41'] = "Mostrar la tabla de actualización de las construcciones";
xLng['69'] = "Nivel de Registro de la Consola<br>SOLO PARA PROGRAMADORES O DEPURACIÓN<br>(Valor por defecto = 0)";
xLng['48'] = "Páginas mostradas en la sección 'Comprar' del mercado<br>(Valor por defecto = 1)";
xLng['U.3'] = 'Nombre de tu capital<br>Entra en tu perfil para actualizarla';
xLng['U.6'] = 'Coordenadas de tu capital<br>Entra en tu perfil para actualizarlas';
xLng['MAX'] = 'Máximo.';
xLng['TOTALTROOPSTRAINING'] = 'Tropas totales que se están creando';
xLng['57'] = 'Mostrar distancias y tiempos en un mensaje emergente';
xLng['TBSETUPLINK'] = 'Configurar TBeyond';
xLng['UPDATEALLVILLAGES'] = 'Actualizar todas las aldeas. USAR CON MUCHO CUIDADO, PUEDE LLEVAR A QUE BORREN TU CUENTA!';
xLng['9'] = "Mostrar enlaces adicionales en el menú de la izquierda<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Mapa grande';
xLng['USETHEMPR'] = 'Repartir la cantidad de recursos de los almacenes (de manera proporcional)';
xLng['USETHEMEQ'] = 'Repartir la cantidad de recursos de los almacenes (equitativa=misma cantidad)';
xLng['TOWNHALL'] = 'Ayuntamiento';
xLng['GAMESERVERTYPE'] = 'Versión del servidor';
xLng['ACCINFO'] = 'Información de la Cuenta';
xLng['BOOKMARKOPTIONS'] = 'Marcadores';
xLng['NOTEBLOCKOPTIONS'] = 'Block de notas';
xLng['MENULEFT'] = 'Menú en el lado izquierdo';
xLng['STATISTICS'] = 'Estadísticas';
xLng['RESOURCEFIELDS'] = 'Campos de recursos';
xLng['VILLAGECENTER'] = 'Centro de la aldea';
xLng['MAPOPTIONS'] = 'Opciones del mapa';
xLng['COLOROPTIONS'] = 'Opciones de color';
xLng['DEBUGOPTIONS'] = 'Opciones de depuración (DEBUG MODE)';
xLng['4'] = 'Mercado';
xLng['5'] = 'Plaza de reuniones/Cuartel/Taller/Establo';
xLng['6'] = "Ayuntamiento/Hogar del Héroe/Armería/Herrería";
xLng['HEROSMANSION'] = "Hogar del Héroe";
xLng['BLACKSMITH'] = 'Herrería';
xLng['ARMOURY'] = 'Armería';
xLng['NOW'] = 'Ahora';
xLng['CLOSE'] = 'Cerrar';
xLng['USE'] = 'Usar';
xLng['USETHEM1H'] = 'Repartir materias primas de esta aldea (1 hora de producción)';
xLng['OVERVIEW'] = 'Resumen';
xLng['FORUM'] = 'Foro';
xLng['ATTACKS'] = 'Ataques';
xLng['NEWS'] = 'Noticias';
xLng['ADDCRTPAGE'] = 'Añadir página actual';
xLng['SCRPURL'] = 'Página de TBeyond';
xLng['50'] = 'N° de espías para seleccionar por defecto en<br>"Seleccionar espías"';
xLng['SPACER'] = 'Espacio';
xLng['53'] = 'Mostrar información de las tropas en mensajes emergentes';
xLng['MESREPOPTIONS'] = 'Mensajes y Reportes';
xLng['59'] = 'Número de páginas de mensajes/reportes precargados<br>(Valor por defecto = 1)';
xLng['ATTABLES'] = 'Tabla de tropas';
xLng['MTW'] = 'Disponible';
xLng['MTX'] = 'Excedido';
xLng['MTC'] = 'Carga actual';
xLng['ALLIANCEFORUMLINK'] = 'Vínculo a foro externo<br>(Dejar en blanco para foro interno)';
xLng['82.L'] = 'Bloquear marcadores (Ocultar iconos de eliminar, subir, bajar)';
xLng['MTCL'] = 'Limpiar todo';
xLng['82.U'] = 'Desbloquear marcadores (Mostrar iconos de eliminar, subir, bajar)';
xLng['CLICKSORT'] = 'Haga clic aquí para ordenar';
xLng['MIN'] = 'Mínimo';
xLng['SAVEGLOBAL'] = 'Repartir entre las aldeas';
xLng['VILLAGELIST'] = 'Lista de Aldeas';
xLng['12'] = "Mostrar enlaces 'dorf1.php' y 'dorf2.php'";
xLng['UPDATEPOP'] = 'Actualizar habitantes';
xLng['54'] = 'Mostrar tiempos y distancias a aldeas en mensajes emergentes';
xLng['EDIT'] = 'Editar';
xLng['NPCOPTIONS'] = 'Asistente de opciones del NPC';
xLng['26'] = 'Mostrar Asistente de NPC para calculadora/enlaces';
xLng['58'] = 'Mostrar tabla de Jugadores/Aldeas/Oasis ocupados';
xLng['NEWVILLAGEAV'] = 'Fecha/Hora';
xLng['TIMEUNTIL'] = 'Tiempo de espera';
xLng['61'] = 'Mostar "Borrar todo" en la página de informes';
xLng['62'] = 'Mostrar icono "Enviar IGM" para mitambién';
xLng['CENTERMAP'] = 'Centrar mapa sobre esta aldea';
xLng['13'] = 'Mostrar icono "Centrar mapa sobre esta aldea"';
xLng['SENDTROOPS'] = 'Enviar tropas';
xLng['64'] = 'Mostrar detalles estadísticos en los reportes';
xLng['7'] = "Palacio/Residencia/Academia/Tesoro";
xLng['PALACE'] = "Palacio";
xLng['RESIDENCE'] = "Residencia";
xLng['ACADEMY'] = "Academia";
xLng['TREASURY'] = "Tesoro";
xLng['45'] = "Mostrar nivel parpadeando en los edificios que están siendo ampliados";
xLng['14'] = "Mostrar icono 'Enviar tropas/Enviar recursos' en lista de aldeas";
xLng['34'] = "Ver información de CP por día en la actualización de las tablas";
xLng['UPGTABLES'] = "Mostrar actualizaciones en las tablas de  recursos y edificios.";
xLng['35'] = "Mostrar actualizaciones en las tablas de consumo de cereal.";
xLng['16'] = "Mostrar eficacia de producción de cereal en el listado de aldeas";
xLng['RESBARTABLETITLE'] = "Recursos";
xLng['39'] = "Ver tabla de 'Recursos'";
xLng['40'] = "Ver tabla de 'Recursos' en una ventana flotante";
xLng['21'] = "Ver tabla de 'Enlaces' en una ventana flotante";
xLng['23'] = "Ver 'Block de notas' en una ventana flotante";
xLng['17'] = "Mostrar población en el listado de aldeas";
xLng['29'] = 'Usar el analizador del mapa';
xLng['30'] = 'Mostrar mapa de enlaces para usuarios';
xLng['31'] = 'Mostrar mapa de enlaces para alianzas';
xLng['63'] = 'Mostar TB3 en los informes de batalla';
xLng['18'] = 'Muestra en 2 columnas una lista de aldeas en una ventana flotante';
xLng['60'] = 'Mostrar vínculos para abrir los mensajes e informes en ventanas emergentes';
xLng['42'] = 'Ordenar edificios por su nombre en la tabla de actualizaciones';
xLng['19'] = 'Mostrar información sobre los avances en los edificios y los movimientos de tropas en el listado de aldeas';
xLng['32'] = "Mostrar 'Barra de Búsqueda'";
xLng['3'] = 'Forzar T3.1 Legionnaire & Phalanx capacity calculation<br>(para servidores mixtos T3.1 & T3.5)';
xLng['33'] = "Ver 'Barra de Búsqueda' en una ventana flotante";
xLng['36'] = "Mostrar los cálculos de 'Hasta entonces/Excedentes'<br>en las tablas de entrenamiento/mejora";
xLng['RESIDUE'] = 'Excedentes si construyes ';
xLng['RESOURCES'] = 'Recursos';
xLng['2'] = 'Eliminar anuncios';
xLng['15'] = "Mostrar la produccion por hora de madera, barro, hierro y cereal en el listado de aldeas";
xLng['11'] = "Enlace para la publicación de informes";
break;
case "fr":
//by fr3nchlover & britch &  sp4m4me
xLng['SIM'] = 'Simulateur';
xLng['QSURE'] = 'Es-tu certain ?';
xLng['LOSS'] = 'Pertes en matériels';
xLng['PROFIT'] = 'Rentabilité';
xLng['EXTAV'] = 'Tu peux déjà augmenter son niveau';
xLng['PLAYER'] = 'Joueur';
xLng['POPULATION'] = 'Population';
xLng['COORDS'] = 'Coordonnées';
xLng['SAVED'] = 'Sauvegarde';
xLng['YOUNEED'] = 'Il manque';
xLng['TODAY'] = 'aujourd\'hui';
xLng['TOMORROW'] = 'demain';
xLng['DAYAFTERTOM'] = 'après-demain';
xLng['MARKET'] = 'Place du marché';
xLng['BARRACKS'] = 'Caserne';
xLng['RALLYPOINT'] = 'Place de rassemblement';
xLng['STABLE'] = 'Ecurie';
xLng['WORKSHOP'] = 'Atelier';
xLng['SENDRES'] = 'Envoyer des ressources';
xLng['BUY'] = 'Acheter des ressources';
xLng['SELL'] = 'Vendre des ressources';
xLng['SENDIGM'] = 'Envoyer MSG';
xLng['LISTO'] = 'Prêt';
xLng['ON'] = 'le';
xLng['AT'] = 'à';
xLng['EFICIENCIA'] = 'Efficacité';
xLng['NEVER'] = 'Jamais';
xLng['TIEMPO'] = 'Temps';
xLng['OFREZCO'] = 'Offre';
xLng['BUSCO'] = 'Recherche';
xLng['DISPONIBLE'] = 'Disponible';
xLng['CUALQUIERA'] = 'Toutes';
xLng['YES'] = 'Oui';
xLng['NO'] = 'Non';
xLng['MARCADORES'] = 'Liens';
xLng['ANYADIR'] = 'Ajouter';
xLng['UBU'] = 'URL du nouveau lien';
xLng['UBT'] = 'Texte du nouveau lien';
xLng['ELIMINAR'] = 'Supprimer';
xLng['MAPA'] = 'Carte';
xLng['MAXTIME'] = 'Temps maximum';
xLng['SUMMARY'] = 'Résumé';
xLng['TROPAS'] = 'Troupes';
xLng['CHKSCRV'] = 'MàJ TBeyond';
xLng['ACTUALIZAR'] = 'Mise a jour informations village';
xLng['VENTAS'] = 'Paramètres Vente';
xLng['MAPSCAN'] = 'Analyse de la carte - ATTENTION NE PAS UTILISER- RISQUE BLOCAGE OP !';
xLng['BIGICONS'] = 'Afficher les icones étendues';
xLng['22'] = 'Afficher le bloc-notes';
xLng['SAVE'] = 'Sauver';
xLng['49'] = 'Action par défaut sur place de rassemblement';
xLng['AT2'] = 'Assistance';
xLng['AT3'] = 'Attaque: Normal';
xLng['AT4'] = 'Attaque: Pillage';
xLng['24'] = 'Taille Bloc-notes';
xLng['NBSIZENORMAL'] = 'Normal';
xLng['NBSIZEBIG'] = 'Large';
xLng['25'] = 'Hauteur Bloc-notes';
xLng['NBAUTOEXPANDHEIGHT'] = 'Hauteur Auto';
xLng['NBKEEPHEIGHT'] = 'Hauteur par défaut';
xLng['43'] = 'Afficher nombres';
xLng['NPCSAVETIME'] = 'Sauver : ';
xLng['38'] = 'Afficher les ressources en couleur';
xLng['44'] = 'Afficher les batiments en couleur';
xLng['65'] = 'Couleur pour Construction possible<br>(Vide = couleur par défaut)';
xLng['66'] = "Couleur pour 'Niveau max'<br>(Vide = couleur par défaut)";
xLng['67'] = "Couleur pour 'Construction impossible'<br>(Vide = couleur par défaut)";
xLng['68'] = "Couleur pour 'Construction avec NPC'<br>(Vide = défaut)";
xLng['TOTALTROOPS'] = 'Troupes totales du village';
xLng['20'] = 'Afficher les liens favoris';
xLng['U.2'] = 'Peuple';
xLng['1'] = "Serveur Travian v2.x";
xLng['SELECTALLTROOPS'] = "Tout sélectionner";
xLng['PARTY'] = "Festivités";
xLng['CPPERDAY'] = "PC/jour";
xLng['SELECTSCOUT'] = "Eclaireur";
xLng['SELECTFAKE'] = "Diversion";
xLng['NOSCOUT2FAKE'] = "Un Eclaireur ne peut pas faire diversion !";
xLng['NOTROOP2FAKE'] = "Pas de troupes pour une diversion !";
xLng['NOTROOP2SCOUT'] = "Pas de troupes pour partir en reconnaissance !";
xLng['NOTROOPS'] = "Pas de troupes dans le village !";
xLng['ALL'] = "Tout";
xLng['SH2'] = "Dans case 'Couleur' vous pouvez saisir :<br>-red ou orange, etc.<br>- ou une couleur HEX exemple :#004523<br>- Laisser vide pour couleur par défaut";
xLng['SHOWORIGREPORT'] = "Rapport original (A cocher obligatoirement avant diffusion du RC)";
xLng['56'] = "Affiche le type de case (sur carte)<br>lorsdu survol du curseur";
xLng['10'] = "Simulateur de combat à utiliser :<br>(menu gauche)";
xLng['WARSIMOPTION1'] = "Interne (celui du jeu)";
xLng['WARSIMOPTION2'] = "Externe (fourni par kirilloid.ru)";
xLng['27'] = "Analyseur à utiliser ";
xLng['28'] = "Afficher liens Analyseur";
xLng['NONEWVER'] = "Pas de mise à jour disponible";
xLng['BVER'] = "Tu as une version Beta du script (supérieure à version officielle) - Mise à jour impossible";
xLng['NVERAV'] = "Une nouvelle version du script est disponible";
xLng['UPDATESCRIPT'] = "Mettre à jour le script ?";
xLng['CHECKUPDATE'] = "Recherche de nouvelle version du script.<br>Veuillez patienter...";
xLng['CROPFINDER'] = "Recherche 15C";
xLng['AVPOPPERVIL'] = "Population moyenne par village";
xLng['AVPOPPERPLAYER'] = "Population moyenne par joueur";
xLng['37'] = "Afficher tableau sur page ressources";
xLng['41'] = "Afficher tableau sur page batiments";
xLng['69'] = "Console Log - RÉSERVÉ aux DEVELOPPEURS et DEBUGGEURS<br>(Défaut = 0)";
xLng['48'] = "Nombre de pages des offres marché ('Marché => Offre')<br>à charger/consulter (Défaut = 1)";
xLng['U.3'] = 'Nom de la Capitale';
xLng['U.6'] ='Coordonnées de la Capitale';
xLng['TOTALTROOPSTRAINING'] = 'Total troupes en fabrication ';
xLng['57'] = 'Afficher distance & temps';
xLng['UPDATEALLVILLAGES'] = 'Actualiser tous les villages. ATTENTION : NE PAS UTILISER - RISQUE BLOCAGE OP. !';
xLng['9'] = "Ajouter liens dans menu gauche<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Carte étendue';
xLng['USETHEMPR'] = 'Calculer (proportionnel)';
xLng['USETHEMEQ'] = 'Calculer (égalité)';
xLng['TOWNHALL'] = 'Hotel de ville';
xLng['GAMESERVERTYPE'] = 'Type de serveur';
xLng['ACCINFO'] = 'Données personnelles';
xLng['NOTEBLOCKOPTIONS'] = 'Bloc-notes';
xLng['MENULEFT'] = 'Menu à gauche';
xLng['STATISTICS'] = 'Statistiques';
xLng['RESOURCEFIELDS'] = 'Vue globale';
xLng['VILLAGECENTER'] = 'Centre village';
xLng['MAPOPTIONS'] = 'options Carte';
xLng['COLOROPTIONS'] = 'options Couleur';
xLng['DEBUGOPTIONS'] = 'options Debug';
xLng['4'] = 'Marché';
xLng['5'] = 'Rassemblement/Caserne/Atelier/Etable';
xLng['6'] = "Hotel de ville/Manoir héros/Armurerie/Usine";
xLng['HEROSMANSION'] = "Manoir Héros";
xLng['BLACKSMITH'] = "Armurerie";
xLng['ARMOURY'] = "Usine armure";
xLng['NOW'] = 'Maintenant';
xLng['CLOSE'] = 'Fermer';
xLng['USE'] = 'Utiliser';
xLng['USETHEM1H'] = 'Calculer 1h de Prod.';
xLng['OVERVIEW'] = 'Vue globale';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Attaques';
xLng['NEWS'] = 'Nouvelles';
xLng['ADDCRTPAGE'] = 'Marquer cette page';
xLng['SCRPURL'] = 'Page TBeyond';
xLng['50'] = 'Nb. d\'éclaireurs lors du clic sur "Eclaireur"';
xLng['SPACER'] = 'Séparateur';
xLng['53'] = 'Afficher info troupes dans info-bulle';
xLng['MESREPOPTIONS'] = 'Messages & Rapports';
xLng['59'] = 'Nb. de pages message/rapport à charger<br>(Défaut = 1)';
xLng['ATTABLES'] = 'Liste troupes';
xLng['MTW'] = 'Non utilisé';
xLng['MTX'] = 'En trop';
xLng['MTC'] = 'Transporté';
xLng['ALLIANCEFORUMLINK'] = 'Lien vers forum externe<br>(Laisser vide pour forum interne)';
xLng['82.L'] = 'Verrouiller (Cache icones pour gérer les liens)';
xLng['MTCL'] = 'Tout effacer';
xLng['82.U'] = 'Déverrouiller (Affiche icones pour gérer les liens)';
xLng['CLICKSORT'] = 'Cliquer pour trier';
xLng['SAVEGLOBAL'] = 'Sauver pour tous';
xLng['VILLAGELIST'] = 'Liste des Villages';
xLng['12'] = "Afficher liens 'Global' et 'Centre' sur liste des Villages";
xLng['UPDATEPOP'] = 'MaJ pop.';
xLng['54'] = 'Afficher distance temps dans info bulle';
xLng['EDIT'] = 'Editer';
xLng['NPCOPTIONS'] = 'Options assistant NPC';
xLng['26'] = 'Afficher options NPC Assistant';
xLng['58'] = 'Afficher tableau joueurs/villages/oasis';
xLng['NEWVILLAGEAV'] = 'Date/Heure';
xLng['TIMEUNTIL'] = 'Temps d attente';
xLng['61'] = 'Afficher "Tout supprimer" dans page de rapports';
xLng['62'] = 'Afficher icone "Envoi message" pour moi aussi';
xLng['CENTERMAP'] = 'Centrer la carte sur ce village';
xLng['13'] = 'Afficher l icone "Centrer sur ce village"';
xLng['ALLOWINETGP'] = 'Permettre packs graphiques Internet';
xLng['SENDTROOPS'] = 'Envoyer troupes';
xLng['64'] = 'Afficher detail Statistiques dans rapport';
xLng['7'] = "Palais/Residence/Academie/Tresor";
xLng['PALACE'] = "Palais";
xLng['RESIDENCE'] = "Résidence";
xLng['ACADEMY'] = "Académie";
xLng['TREASURY'] = "Trésor";
xLng['45'] = "Afficher niveau clignotant sur batiment constructible";
xLng['14'] = "Afficher icones 'Envoyer troupes/Envoyer ressources' dans la liste des villages";
xLng['34'] = "Afficher PC/jour dans le tableau";
xLng['UPGTABLES'] = "Tableau de mise a jour des batiments/champs";
xLng['35'] = "Afficher la consommation de cereales dans le tableau";
xLng['16'] = "Afficher la production de cereales dans la liste des villages";
xLng['RESBARTABLETITLE'] = "Barre de ressource";
xLng['39'] = "Afficher le tableau de 'Barre de ressource'";
xLng['40'] = "Afficher le tableau de 'Barre de ressource' comme une fenetre flotante";
xLng['21'] = "Afficher 'Liens favoris' comme une fenetre flotante";
xLng['23'] = "Afficher 'Bloc note' comme une fenetre flotante";
xLng['17'] = "Afficher la population dans la liste des villages";
xLng['29'] = 'Analyser de carte a utiliser';
xLng['30'] = 'Afficher un lien vers la carte pour les joueurs';
xLng['31'] = 'Afficher un lien vers la carte pour les alliances';
xLng['63'] = 'Montrer les RC ameliores TB3';
xLng['3'] = 'Forcer le calcul des Légionnaires & Phalanges T3.1<br>(pour les serveurs mixtes 3.1 et 3.5)';
xLng['18'] = 'Afficher en plus une liste des villages (2 colonnes) en fenêtre flottante';
xLng['60'] = 'Montrer liens pour ouvrir les messages/rapports dans une popup';
xLng['42'] = 'Classer les batiments par nom dans le tableau';
xLng['19'] = 'Afficher les informations sur les constructions et les mouvements de troupes<br>dans la liste de villages';
xLng['32'] = "Afficher 'Rechercher'";
xLng['33'] = "Afficher 'Rechercher' dans fenêtre flottante";
break;
case "nl":
//by anonymous author & Boeruh & TforAgree & Dakkie
xLng['8'] = 'Alliantie';
xLng['SIM'] = 'Gevecht simulator';
xLng['QSURE'] = 'Weet je het zeker?';
xLng['LOSS'] = 'Verlies';
xLng['PROFIT'] = 'Winst';
xLng['EXTAV'] = 'Uitbreiding beschikbaar';
xLng['PLAYER'] = 'Speler';
xLng['VILLAGE'] = 'Dorp';
xLng['POPULATION'] = 'Populatie';
xLng['COORDS'] = 'Co&ouml;rd';
xLng['MAPTBACTS'] = 'Acties';
xLng['SAVED'] = 'Bewaard';
xLng['YOUNEED'] = 'Nog nodig';
xLng['TODAY'] = 'vandaag';
xLng['TOMORROW'] = 'morgen';
xLng['DAYAFTERTOM'] = 'overmorgen';
xLng['MARKET'] = 'Marktplaats';
xLng['BARRACKS'] = 'Barakken';
xLng['RALLYPOINT'] = 'Verzamelpunt';
xLng['STABLE'] = 'Stal';
xLng['WORKSHOP'] = 'Werkplaats';
xLng['SENDRES'] = 'Stuur grondstoffen';
xLng['BUY'] = 'Koop';
xLng['SELL'] = 'Verkoop';
xLng['SENDIGM'] = 'Stuur IGM';
xLng['LISTO'] = 'Uitbreiding beschikbaar';
xLng['ON'] = 'om';
xLng['AT'] = 'om';
xLng['EFICIENCIA'] = 'Effici&euml;ntie';
xLng['NEVER'] = 'Nooit';
xLng['ALDEAS'] = 'Dorp(en)';
xLng['TIEMPO'] = 'Tijd';
xLng['OFREZCO'] = 'Bieden';
xLng['BUSCO'] = 'Zoeken';
xLng['TIPO'] = 'Type';
xLng['DISPONIBLE'] = 'Alleen beschikbaar';
xLng['CUALQUIERA'] = 'Elke';
xLng['YES'] = 'Ja';
xLng['NO'] = 'Nee';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Links';
xLng['ANYADIR'] = 'Toevoegen';
xLng['UBU'] = 'Nieuwe link URL';
xLng['UBT'] = 'Nieuwe link Text';
xLng['ELIMINAR'] = 'Verwijder';
xLng['MAPA'] = 'Map';
xLng['MAXTIME'] = 'Max. tijd';
xLng['ARCHIVE'] = 'Archiveer';
xLng['SUMMARY'] = 'Samenvatting';
xLng['TROPAS'] = 'Troepen';
xLng['CHKSCRV'] = 'Update TBeyond';
xLng['ACTUALIZAR'] = 'Update dorp informatie';
xLng['VENTAS'] = 'Opgeslagen verkopen';
xLng['MAPSCAN'] = 'Scan de map';
xLng['BIGICONS'] = 'Uitgebreide iconen zichtbaar';
xLng['SAVE'] = 'Opslaan';
xLng['49'] = 'Verzamelplaats standaard aktie';
xLng['AT2'] = 'Versterking';
xLng['AT3'] = 'Aanval';
xLng['AT4'] = 'Overval';
xLng['22'] = 'Kladblok zichtbaar';
xLng['24'] = 'Kladblok grote';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normaal (klein)';
xLng['NBSIZEBIG'] = 'Groot';
xLng['25'] = 'Kladblok hoogte';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automatisch groter maken';
xLng['NBKEEPHEIGHT'] = 'Standaard hoogte';
xLng['43'] = 'Dorp nummers weergeven';
xLng['NPCSAVETIME'] = 'Bespaar: ';
xLng['38'] = 'Grondstof kleur niveau weergeven';
xLng['44'] = 'Gebouwen kleur niveau weergeven';
xLng['65'] = 'Kleur voor uitbreidbaar<br>(Standaard leeg)';
xLng['66'] = 'Kleur max level<br>(Standaard leeg)';
xLng['67'] = 'Kleur niet uitbreidbaar<br>(Standaard leeg)';
xLng['68'] = 'Kleur uitbreidbaar via NPC<br>(Standaard leeg)';
xLng['TOTALTROOPS'] = 'Totaal dorp troepen';
xLng['SHOWDISTANCES'] = 'Afstand weergeven';
xLng['20'] = 'Links laten zien';
xLng['U.2'] = 'Ras';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Selecteer alle troepen";
xLng['PARTY'] = "Feest";
xLng['CPPERDAY'] = "CP/dag";
xLng['SLOT'] = "Slot";
xLng['TOTAL'] = "Totaal";
xLng['SELECTSCOUT'] = "Selecteer verkenners";
xLng['SELECTFAKE'] = "Selecteer fake";
xLng['NOSCOUT2FAKE'] = "Je kunt geen verkenners gebruiken voor een nep aanval";
xLng['NOTROOP2FAKE'] = "Er zijn geen troepen voor een nep aanval";
xLng['NOTROOP2SCOUT'] = "Er zijn geen troepen om te verkennen";
xLng['NOTROOPS'] = "Geen troepen in dit dorp";
xLng['ALL'] = "Alles";
xLng['SH2'] = "In de kleur velen mag je invullen:<br>- <b>green</b>, <b>red</b> or <b>orange</b>, etc.<br>- de HEX kleur code zoals <b>#004523</b><br>- leeg laten voor standaard kleur";
xLng['SHOWORIGREPORT'] = "Laat orgineel bericht zien (voor verzenden)";
xLng['56'] = "Laat veld type/oase info zien<br>bij muisover het veld";
xLng['10'] = "Veldslagsimulator link gebruiken:<br>(in menu links)";
xLng['WARSIMOPTION1'] = "Die van het spel";
xLng['WARSIMOPTION2'] = "Externe (door kirilloid.ru)";
xLng['27'] = "World Analyser gebruiken";
xLng['28'] = "Show analyser statistic links";
xLng['NONEWVER'] = "Je hebt de laatste versie";
xLng['BVER'] = "Je hebt waarschijnlijk een beta versie";
xLng['NVERAV'] = "Er is een nieuwe versie beschikbaar";
xLng['UPDATESCRIPT'] = "Update script nu ?";
xLng['CHECKUPDATE'] = "Voor updates controleren... Een moment.";
xLng['CROPFINDER'] = "Graanvelden zoeker";
xLng['AVPOPPERVIL'] = "Gemiddelde populatie per dorp";
xLng['AVPOPPERPLAYER'] = "Gemiddelde populatie per speler";
xLng['37'] = "Grondstofvelden uitbreidings tabel weergeven";
xLng['41'] = "Gebouwen uitbereidings tabel weergeven";
xLng['69'] = "Console Log Niveau (Standaard = 0)<br>(alleen voor programeurs of debugging)";
xLng['48'] = "Aantal pagina's voorladen<br>bij 'Marktplaats => kopen'<br>(Standaard = 1)";
xLng['U.3'] = 'Naam van hoofddorp<br><b>Niet bewerken, ga hiervoor naar je profiel</b>';
xLng['U.6'] = 'Coordinaten van hoofddorp<br><b>Niet bewerken, ga hiervoor naar je profiel</b>';
xLng['TOTALTROOPSTRAINING'] = 'Totaal aantal troepen';
xLng['57'] = 'Afstanden en tijden laten zien';
xLng['UPDATEALLVILLAGES'] = 'Update alle dorpen. LETOP: Bij vaak gebruik kan dit lijden tot een ban van travain!';
xLng['LARGEMAP'] = 'Grote map';
xLng['9'] = 'Extra link laten zien in linker menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)';
xLng['USETHEMPR'] = 'Verdeel (procentueel)';
xLng['USETHEMEQ'] = 'Verdeel (Gelijkmatig)';
xLng['TOWNHALL'] = 'Raadhuis';
xLng['GAMESERVERTYPE'] = 'Server versie';
xLng['NOTEBLOCKOPTIONS'] = 'Kladblok';
xLng['MENULEFT'] = 'Linker menu';
xLng['STATISTICS'] = 'Statistieken';
xLng['RESOURCEFIELDS'] = 'Grondstof velden';
xLng['VILLAGECENTER'] = 'Dorp centrum';
xLng['MAPOPTIONS'] = 'Map opties';
xLng['COLOROPTIONS'] = 'Kleur opties';
xLng['DEBUGOPTIONS'] = 'Debug opties';
xLng['4'] = 'Marktplaats';
xLng['5'] = 'Verzamelplaats/Barakken/Werkplaatsen/Stal';
xLng['6'] = "Raadhuis/Heldenhof/Uitrustingssmederij/Wapensmid";
xLng['HEROSMANSION'] = "Heldenhof";
xLng['BLACKSMITH'] = "Wapensmid";
xLng['ARMOURY'] = "Uitrustingssmederij";
xLng['NOW'] = 'Nu';
xLng['CLOSE'] = 'Sluit';
xLng['USE'] = 'Verdeel het';
xLng['USETHEM1H'] = 'Verdeel (1 uur productie)';
xLng['OVERVIEW'] = 'Overzicht';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Aanvallen';
xLng['NEWS'] = 'Nieuws';
xLng['ADDCRTPAGE'] = 'Huidige pagina';
xLng['SCRPURL'] = 'TBeyond pagina';
xLng['50'] = 'Aantal scouts voor de<br>"Selecteer verkenners" functie';
xLng['SPACER'] = 'Scheidingsteken';
xLng['53'] = 'Troepen info laten zien bij muis op plaatjes.';
xLng['MESREPOPTIONS'] = 'Berichten & Raportages';
xLng['59'] = 'Aantal paginas voorladen<br>(Standaard = 1)';
xLng['ATTABLES'] = 'Troepen tabellen';
xLng['MTW'] = 'Ruimte over';
xLng['MTX'] = 'Te veel';
xLng['MTC'] = 'Huidige lading';
xLng['ALLIANCEFORUMLINK'] = 'Link naar extern forum<br>(Leeg laten voor intern forum)';
xLng['82.L'] = 'Bladwijzers vast zetten (Verberg de verwijder en verplaats iconen)';
xLng['MTCL'] = 'Leeg alle velden';
xLng['SAVEGLOBAL'] = 'Beschikbaar voor alle dorpen';
xLng['CLICKSORT'] = 'Klik voor sorteren';
xLng['SAVEGLOBAL'] = 'Voor elk dorp gebruiken';
xLng['VILLAGELIST'] = 'Dorpen lijst';
xLng['12'] = "Laat de 'dorf1.php' en 'dorf2.php' links zien";
xLng['54'] = 'Afstand en tijd laten zien naar dorp in tooltip';
xLng['ACCINFO'] = 'Account info';
xLng['EDIT'] = 'Bewerk';
xLng['NPCOPTIONS'] = 'NPC Handel opties';
xLng['26'] = 'NPC Handelaar links en info laten zien';
xLng['NEWVILLAGEAV'] = 'Datum/Tijd';
xLng['TIMEUNTIL'] = 'Wacht tijd';
xLng['61'] = 'Tabel met "Verwijder" laten zien op raporten pagina';
xLng['62'] = 'Ook mijn "Stuur IGM" icoon laten zien';
xLng['CENTERMAP'] = 'Centreer map op dit dorp';
xLng['13'] = 'Icoon voor "Centreer map op dit dorp" laten zien';
xLng['45'] = "Laat knipperend icoon zien voor gebouwen die worden gebouwd";
xLng['3'] = 'Forceer T3.1 Phalanx en Legionair Capaciteits berekening.<br>(Voor gemixte T3.1 & T3.5 servers - meestal .de servers)';
xLng['7'] = 'Paleis/Residentie/Academie/Schatkamer';
xLng['14'] = 'Laat "Stuur troepen/Stuur Handelaren" Icoon zien in de dorpen lijst';
xLng['16'] = 'Laat netto graanproductie zien in de dorpen lijst zien';
xLng['17'] = 'Laat de Populatie zien in de dorpen lijst zien';
xLng['18'] = 'Laat extra (2 Kolommen) dorpenlijst zien als zwevend venster';
xLng['21'] = 'Laat "Gebruikers Links" als zwevend venster zien';
xLng['23'] = 'Laat "Kladblok" als zwevend venster zien';
xLng['28'] = 'Laat Analyser statistieken links zien';
xLng['29'] = 'Welke map analyser te gebruiken:';
xLng['30'] = 'Laat links naar de kaart zien voor spelers';
xLng['31'] = 'Laat links naar de kaart zien voor allianties';
xLng['34'] = 'Laat CP/dag zien in de uitbreidingstabel';
xLng['35'] = 'Laat graanverbruik zien in de uitbreidingstabel';
xLng['39'] = 'Laat het "Grondstof productie venster" zien';
xLng['40'] = 'Laat het "Grondstof productie venster" als zwevend venster zien';
xLng['58'] = 'Laat de tabel zien van Spelers/Dorpen/Oases';
xLng['63'] = 'Laat TB3.5 Uitgebreide Aanvalsrapporten zien';
xLng['64'] = 'Laat uitgebreide details zien in de statistieken';
break;
case "pt":
//by sepacavi & Fujis & VicSilveira
xLng['8'] = 'Aliança';
xLng['SIM'] = 'Simulador de Combates';
xLng['QSURE']= 'Tens a Certeza?';
xLng['LOSS'] = 'Perdas';
xLng['PROFIT']= 'Lucro';
xLng['EXTAV'] = 'Podes subir de nível';
xLng['PLAYER']= 'Jogador';
xLng['VILLAGE'] = 'Aldeia';
xLng['POPULATION']= 'População';
xLng['COORDS']= 'Coordenadas';
xLng['MAPTBACTS'] = 'Acções';
xLng['SAVED'] = 'Guardado';
xLng['YOUNEED'] = 'Precisa de';
xLng['TODAY'] = 'Hoje';
xLng['TOMORROW'] = 'Amanhã';
xLng['DAYAFTERTOM'] = 'Depois de Amanhã';
xLng['MARKET']= 'Mercado';
xLng['BARRACKS'] = 'Quartel';
xLng['RALLYPOINT']= 'Ponto de Reunião Militar';
xLng['STABLE']= 'Cavalariça';
xLng['WORKSHOP'] = 'Oficina';
xLng['SENDRES'] = 'Enviar Recursos';
xLng['BUY'] = 'Comprar';
xLng['SELL'] = 'Vender';
xLng['SENDIGM'] = 'Enviar IGM';
xLng['LISTO'] = 'Disponível';
xLng['ON']= 'em';
xLng['AT'] = 'às';
xLng['EFICIENCIA']= 'Eficiência';
xLng['NEVER'] = 'Nunca';
xLng['ALDEAS']= 'Aldeia(s)';
xLng['TIEMPO']= 'Tempo';
xLng['OFREZCO'] = 'Ofereço';
xLng['BUSCO'] = 'Procuro';
xLng['TIPO'] = 'Tipo';
xLng['DISPONIBLE']= 'Apenas Disponíveis';
xLng['CUALQUIERA']= 'Qualquer';
xLng['YES'] = 'Sim';
xLng['NO']= 'Não';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES']= 'Favoritos';
xLng['ANYADIR'] = 'Adicionar';
xLng['UBU']= 'URL de Novo Marcador';
xLng['UBT'] = 'Novo Marcador de Texto';
xLng['ELIMINAR'] = 'Apagar';
xLng['MAPA'] = 'Mapa';
xLng['MAXTIME'] = 'Tempo Máximo';
xLng['ARCHIVE'] = 'Arquivo';
xLng['SUMMARY'] = 'Resumo';
xLng['TROPAS'] = 'Tropas';
xLng['CHKSCRV'] = 'Actualizar TBeyond';
xLng['ACTUALIZAR']= 'Actualizar Informação da Aldeia';
xLng['VENTAS']= 'Ofertas Guardadas';
xLng['MAPSCAN'] = 'Procurar no Mapa';
xLng['BIGICONS'] = 'Mostrar Icons Avançados';
xLng['22'] = 'Mostrar Bloco de Notas';
xLng['SAVE'] = 'Guardar';
xLng['49'] = 'Acção por Defeito no Ponto de Reunião Militar';
xLng['AT2'] = 'Reforços';
xLng['AT3'] = 'Ataque: Normal';
xLng['AT4'] = 'Ataque: Assalto';
xLng['24']= 'Tamanho do Bloco de Notas';
xLng['NBSIZEAUTO']= 'Automático';
xLng['NBSIZENORMAL'] = 'Normal (pequeno)';
xLng['NBSIZEBIG'] = 'Ecrã Grande (largo)';
xLng['25'] = 'Altura do Bloco de Notas';
xLng['NBAUTOEXPANDHEIGHT'] = 'Expandir Altura automaticamente';
xLng['NBKEEPHEIGHT'] = 'Altura por defeito';
xLng['43'] = 'Mostrar Números no centro';
xLng['NPCSAVETIME'] = 'Guardar: ';
xLng['38']= 'Mostrar Cores dos Níveis de Recursos';
xLng['44'] = 'Mostrar Cores dos Níveis dos Edifícios';
xLng['65']= 'Cor de Elevação de Nível Disponível<br>(Defeito = Vazio)';
xLng['66'] = 'Cor do Nível Máximo<br>(Defeito = Vazio)';
xLng['67'] = 'Cor de Elevação de Nível Impossível<br>(Defeito = Vazio)';
xLng['68'] = 'Cor de Elevação de Nível via NPC<br>(Defeito = Vazio)';
xLng['TOTALTROOPS'] = 'Total de Tropas da Aldeia';
xLng['20'] = 'Mostrar Favoritos';
xLng['U.2'] = 'Tribo';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Seleccionar Todas as Tropas";
xLng['PARTY'] = "Celebrações";
xLng['CPPERDAY'] = "PsC/Dia";
xLng['SLOT'] = "Slot";
xLng['TOTAL'] = "Total";
xLng['SELECTSCOUT'] = "Seleccionar Espião";
xLng['SELECTFAKE']= "Seleccionar Fake";
xLng['NOSCOUT2FAKE'] = "Impossível Utilizar Espiões para Ataque Fake!";
xLng['NOTROOP2FAKE'] = "Não há Tropas para Ataque Fake!";
xLng['NOTROOP2SCOUT'] = "Não há Tropas para Espiar!";
xLng['NOTROOPS'] = "Não há Tropas na Aldeia!";
xLng['ALL'] = "Todas";
xLng['SH2'] = "Nas Cores de Campos pode utilizar:<br>- green or red or orange, etc.<br>- Código de Cor HEX#004523<br>- deixar Vazio para cor por defeito";
xLng['SHOWORIGREPORT']= "Mostrar Relatório Original (para postar)";
xLng['56'] = "Mostrar Informação do Tipo de Vale/Oásis<br>quando o Rato passar por cima";
xLng['10']= "Link para Simulador de Combates<br>(Menu Esquerdo)";
xLng['WARSIMOPTION1'] = "Interno (fornecido pelo Jogo)";
xLng['WARSIMOPTION2'] = "Externo (fornecido por kirilloid.ru)";
xLng['27']= "World Analyser";
xLng['28'] = "Mostrar links para Analisador de Estatísticas";
xLng['NONEWVER'] = "Tens a última Versão disponível";
xLng['BVER'] = "Talvez tenhas uma versão Beta";
xLng['NVERAV'] = "Uma Nova Versão do Script Está Disponível";
xLng['UPDATESCRIPT'] = "Actualizar Script Agora?";
xLng['CHECKUPDATE'] = "A procurar actualização para o Script.<br>Por Favor Esperar...";
xLng['CROPFINDER']= "Crop Finder";
xLng['AVPOPPERVIL'] = "População Média por Aldeia";
xLng['AVPOPPERPLAYER']= "População Média por Jogador";
xLng['37'] = "Mostrar Tabela de Evolução de Campos de Recursos";
xLng['41'] = "Mostrar Tabela de Evolução de Edifícios";
xLng['69'] = "Console Log Level<br>APENAS PARA PROGRAMADORES OU DEBBUGING<br>(Defeito = 1)";
xLng['48'] = "N.º de Páginas de Ofertas para Pré-Carregar enquanto 'Mercado => Comprar'<br>(Defeito = 1)";
xLng['U.3'] = 'Nome da tua Capital<br><b>Acede ao teu Perfil para actualizar</b>';
xLng['U.6'] = 'Coordenadas da tua Capital<br><b>Acede ao teu Perfil para actualizar</b>';
xLng['MAX'] = 'Máx';
xLng['TOTALTROOPSTRAINING'] = 'Total de Tropas em Treino';
xLng['57'] = 'Mostrar Distâncias e Tempos';
xLng['UPDATEALLVILLAGES'] = 'Actualizar todas as Aldeias. MUITA ATENÇÃO: UTILIZAR COM A MÁXIMA PRECAUÇÃO. PODE LEVAR AO BAN DA CONTA!';
xLng['9'] = "Mostrar links adicionais no Menu à Esquerda<br>(Traviantoolbox, World Analyser, Travilog, Mapa, etc.)";
xLng['LARGEMAP'] = 'Mapa Grande';
xLng['USETHEMPR'] = 'Usar (Proporcional)';
xLng['USETHEMEQ'] = 'Usar (Igual)';
xLng['TOWNHALL'] = 'Casa do Povo';
xLng['GAMESERVERTYPE'] = 'Servidor do Jogo';
xLng['ACCINFO'] = 'Informação da Conta';
xLng['NOTEBLOCKOPTIONS'] = 'Bloco de Notas';
xLng['MENULEFT'] = 'Menu Esquerdo';
xLng['STATISTICS'] = 'Estatísticas';
xLng['RESOURCEFIELDS'] = 'Campos de Recursos';
xLng['VILLAGECENTER'] = 'Centro da Aldeia';
xLng['MAPOPTIONS'] = 'Opções do Mapa';
xLng['COLOROPTIONS'] = 'Opções de Cores';
xLng['DEBUGOPTIONS'] = 'Opções de Debug';
xLng['4'] = 'Mercado';
xLng['5'] = 'Ponto de Reunião Militar/Quartel/Oficina/Cavalariça';
xLng['6'] = "Casa do Povo/Mansão do Herói/Fábrica de Armaduras/Ferreiro";
xLng['HEROSMANSION'] = "Mansão do Herói";
xLng['BLACKSMITH'] = 'Ferreiro';
xLng['ARMOURY'] = 'Fábrica de Armaduras';
xLng['NOW'] = 'Agora';
xLng['CLOSE'] = 'Fechar';
xLng['USE'] = 'Usar';
xLng['USETHEM1H'] = 'Usar (1 Hora de Produção)';
xLng['OVERVIEW'] = 'Vista Geral';
xLng['FORUM'] = 'Fórum';
xLng['ATTACKS'] = 'Ataques';
xLng['NEWS'] = 'Notícias';
xLng['ADDCRTPAGE'] = 'Adicionar Página Actual';
xLng['SCRPURL'] = 'Página TBeyond';
xLng['50'] = 'N.º de Espiões para a Função<br>"Seleccionar Espiões"';
xLng['SPACER'] = 'Spacer';
xLng['53'] = 'Mostrar Informação de Tropas em Tooltips';
xLng['MESREPOPTIONS'] = 'Mensagens e Relatórios';
xLng['59'] = 'N.º Páginas de Relatórios/Mensagens para Pré-Carregar<br>(Defeito = 1)';
xLng['ATTABLES'] = 'Tabelas de Tropas';
xLng['MTW'] = 'Carga desperdiçada';
xLng['MTX'] = 'Carga em excesso';
xLng['MTC'] = 'Carga Actual';
xLng['ALLIANCEFORUMLINK'] = 'Link para Fórum Externo<br>(Deixar vazio para Fórum Interno)';
xLng['82.L'] = 'Bloquear Favoritos (Mostrar icons: Esconder, Apagar, Mover Acima, Mover Abaixo)';
xLng['MTCL'] = 'Limpar Tudo';
xLng['82.U'] = 'Desbloquear Favoritos (Mostrar icons: Apagar, Mover Acima, Mover Abaixo)';
xLng['CLICKSORT'] = 'Clique para Ordenar';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Partilhar Entre Aldeias';
xLng['VILLAGELIST'] = 'Lista de Aldeias';
xLng['12'] = "Mostrar links 'dorf1.php' e 'dorf2.php'";
xLng['UPDATEPOP'] = 'Actualizar População';
xLng['54'] = 'Mostrar Distâncias e Tempos entre as Aldeias';
xLng['EDIT'] = 'Editar';
xLng['NPCOPTIONS'] = 'Assistente de Opções do NPC';
xLng['26'] = 'Mostrar Assistente de Cálculos/Links do NPC';
xLng['58'] = 'Mostrar Tabela de Jogadores/Aldeias/Oásis ocupados';
xLng['NEWVILLAGEAV'] = 'Data/Hora';
xLng['TIMEUNTIL'] = 'Tempo de Espera';
xLng['61'] = 'Mostrar "Excluir tudo" na Tabela da página Relatórios';
xLng['62'] = 'Mostrar icon "Enviar IGM", também para mim';
xLng['CENTERMAP'] = 'Centralizar Mapa nesta Aldeia';
xLng['13'] = 'Mostrar icon "Centralizar Mapa nesta Aldeia"';
xLng['SENDTROOPS'] = 'Enviar Tropas';
xLng['64'] = 'Mostrar detalhes no Relatório Estatísticas';
xLng['7'] = "Palácio/Residência/Academia/Tesouraria";
xLng['PALACE'] = "Palácio";
xLng['RESIDENCE'] = "Residência";
xLng['ACADEMY'] = "Academia";
xLng['TREASURY'] = "Tesouraria";
xLng['45'] = "Mostrar os níveis a piscar quando os Edifícios estão a evoluir";
xLng['14']= "Mostrar icons 'Envio de Tropas' e 'Envio de Recursos' na Lista de Aldeias";
xLng['34'] = "Mostrar informação PsC/dia nas tabelas de evolução";
xLng['UPGTABLES'] = "Tabelas de Evolução de Campos de Recursos/Edifícios";
xLng['35'] = "Mostrar Consumo de Cereais na Tabela de Evolução de Edifícios";
xLng['16'] = "Mostrar Produção de Cereais na Lista de Aldeias";
xLng['RESBARTABLETITLE'] = "Barra de Recursos";
xLng['39'] = "Mostrar 'Barra de Recursos'";
xLng['40'] = "Mostrar 'Barra de Recursos' como janela flutuante";
xLng['21'] = "Mostrar 'Favoritos' como janela flutuante";
xLng['23'] = "Mostrar 'Bloco de Notas' como janela flutuante";
xLng['17'] = "Mostrar População na Lista de Aldeias";
xLng['29'] = 'Analisador de Mapa';
xLng['30'] = 'Mostrar links para Mapa para Jogadores';
xLng['31'] = 'Mostrar links para Mapa para Alianças';
xLng['63'] = 'Mostrar Relatório de Batalhas TB3 desenvolvido';
xLng['18'] = 'Mostrar adicional (2 colunas) na Lista de Aldeias como janela flutuante';
xLng['60'] = 'Mostrar links para abrir as Mensagens e Relatórios numa janela pop-up';
xLng['42'] = 'Ordenar Edifícios por nome na Tabela de Evolução de Edifícios';
xLng['3'] = 'Forçar cálculo da capacidade Legionário & Falange T3.1 <br>(para servers mistos T3.1 & T3.5)';
xLng['19'] = 'Mostrar informação sobre Edifícios a Evoluir e Movimentos de Tropas na Lista de Aldeias';
xLng['32'] = "Mostrar 'Barra de Pesquisas (Estatísticas)'";
xLng['33'] = "Mostrar 'Barra de Pesquisas (Estatísticas)' como janela flutuante";
xLng['36'] = "Mostrar o cálculo 'Até então/Excedente' nas Tabelas de Evolução/Treino";
xLng['RESIDUE'] = 'O Excedente se o construíres ';
xLng['RESOURCES'] = 'Recursos';
xLng['2'] = 'Remover ad banners';
xLng['SH1'] = "Abrir o Perfil para detectar automaticamente as coordenadas da Capital<br>Construir o Quartel para detectar a Tribo automaticamente e então abrir o Centro da Aldeia";
xLng['46'] = "Mostrar informação adicional para cada chegada de mercadores";
xLng['15'] = "Mostrar a produção por hora de madeira, de barro e de ferro na Lista de Aldeias";
xLng['11'] = "Link para o site indicado para postar relatórios";
xLng['RESEND'] = "Enviar outra vez ?";
break;
case "br":
//by Bruno Guerreiro - brunogc@limao.com.br
xLng['8'] = 'Aliança';
xLng['SIM'] = 'Simulador de Combate';
xLng['QSURE'] = 'Tem certeza?';
xLng['LOSS'] = 'Perdas';
xLng['PROFIT'] = 'Lucro';
xLng['EXTAV'] = 'Recursos suficientes';
xLng['PLAYER'] = 'Jogador';
xLng['VILLAGE'] = 'Aldeia';
xLng['POPULATION'] = 'População';
xLng['COORDS'] = 'Coords';
xLng['MAPTBACTS'] = 'Ações';
xLng['SAVED'] = 'Configurações salvas';
xLng['YOUNEED'] = 'Você precisa';
xLng['TODAY'] = 'hoje';
xLng['TOMORROW'] = 'amanhã';
xLng['DAYAFTERTOM'] = 'depois de amanhã';
xLng['MARKET'] = 'Mercado';
xLng['BARRACKS'] = 'Quartel';
xLng['RALLYPOINT'] = 'Enviar tropas';
xLng['STABLE'] = 'Cavalaria';
xLng['WORKSHOP'] = 'Oficina';
xLng['SENDRES'] = 'Enviar recursos';
xLng['BUY'] = 'Comprar';
xLng['SELL'] = 'Vender';
xLng['SENDIGM'] = 'Enviar IGM';
xLng['LISTO'] = 'Disponível';
xLng['ON'] = 'em';
xLng['AT'] = 'as';
xLng['EFICIENCIA'] = 'Eficiência';
xLng['NEVER'] = 'Nunca';
xLng['ALDEAS'] = 'Aldeias';
xLng['TIEMPO'] = 'Tempo';
xLng['OFREZCO'] = 'Oferecendo';
xLng['BUSCO'] = 'Procurando';
xLng['TIPO'] = 'Tipo';
xLng['DISPONIBLE'] = 'Somente disponível?';
xLng['CUALQUIERA'] = 'Qualquer';
xLng['YES'] = 'Sim';
xLng['NO'] = 'Não';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Favoritos';
xLng['ANYADIR'] = 'Adicionar';
xLng['UBU'] = 'URL do novo favorito';
xLng['UBT'] = 'Texto do novo favorito';
xLng['ELIMINAR'] = 'Deletar';
xLng['MAPA'] = 'Mapa';
xLng['MAXTIME'] = 'Tempo máximo';
xLng['ARCHIVE'] = 'Arquivo';
xLng['SUMMARY'] = 'Sumário';
xLng['TROPAS'] = 'Tropas';
xLng['CHKSCRV'] = 'Atualizar TBeyond';
xLng['ACTUALIZAR'] = 'Atualizar informação da aldeia';
xLng['VENTAS'] = 'Ofertas salvas';
xLng['MAPSCAN'] = 'Analisar mapa';
xLng['BIGICONS'] = 'Exibir ícones adicionais';
xLng['22'] = 'Exibir bloco de anotações';
xLng['SAVE'] = 'Salvo';
xLng['49'] = 'Ação padrão do Ponto de Encontro';
xLng['AT2'] = 'Reforço';
xLng['AT3'] = 'Ataque: Normal';
xLng['AT4'] = 'Ataque: Assalto';
xLng['24'] = 'Tamanho do bloco de anotações';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normal (pequeno)';
xLng['NBSIZEBIG'] = 'Grande';
xLng['25'] = 'Altura do bloco de anotações';
xLng['NBAUTOEXPANDHEIGHT'] = 'Altura automática';
xLng['NBKEEPHEIGHT'] = 'Altura padrão';
xLng['43'] = 'Exibir níveis de construção';
xLng['NPCSAVETIME'] = 'Salvo: ';
xLng['38'] = 'Exibir cores nos recursos';
xLng['44'] = 'Exibir cores nos edifícios';
xLng['65'] = 'Cores disponíveis<br>(Default = Empty)';
xLng['66'] = 'Cor de nível máximo<br>(Default = Empty)';
xLng['67'] = 'Cor de não disponível<br>(Default = Empty)';
xLng['68'] = 'Cor de atualização via NPC<br>(Default = Empty)';
xLng['TOTALTROOPS'] = 'Total de tropas da aldeia';
xLng['20'] = 'Exibir favoritos';
xLng['U.2'] = 'Raça';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Selecionar todas as tropas";
xLng['PARTY'] = "Festividades";
xLng['CPPERDAY'] = "CP/dia";
xLng['SLOT'] = "Slot";
xLng['TOTAL'] = "Total";
xLng['SELECTSCOUT'] = "Enviar espiões";
xLng['SELECTFAKE'] = "Enviar fakes";
xLng['NOSCOUT2FAKE'] = "É impossível enviar ataques fakes !";
xLng['NOTROOP2FAKE'] = "Não existem tropas para ser usadas como fake!";
xLng['NOTROOP2SCOUT'] = "Não existe tropas/unidade de espionagem !";
xLng['NOTROOPS'] = "Não há tropas nesta aldeia !";
xLng['ALL'] = "Todos";
xLng['SHOWORIGREPORT'] = "Exibir relatório original";
xLng['WARSIMOPTION1'] = "Interno (provided by the game)";
xLng['WARSIMOPTION2'] = "Externo (provided by kirilloid.ru)";
xLng['NONEWVER'] = "Você tem a última versão instalada.";
xLng['BVER'] = "VOcê tem uma versão beta.";
xLng['NVERAV'] = "Uma nova versão do script foi encontrada";
xLng['UPDATESCRIPT'] = "Atualizar script agora ?";
xLng['CHECKUPDATE'] = "Checando novas atualizações.<br>Aguarde...";
xLng['CROPFINDER'] = "Localizador de CROPs";
xLng['AVPOPPERVIL'] = "Média de população por aldeia";
xLng['AVPOPPERPLAYER'] = "Média de população por jogadores";
xLng['37'] = "Exibir recursos disponíveis para elevar";
xLng['41'] = "Exibir construções disponíveis para elevar";
xLng['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0)";
xLng['48'] = "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
xLng['U.3'] = 'Nome da sua capital<br>Visite seu perfil';
xLng['U.6'] = 'Coordenadas da sua capital<br>Visite seu perfil';
xLng['MAX'] = 'Máximo';
xLng['TOTALTROOPSTRAINING'] = 'Total de tropas sendo treinadas';
xLng['57'] = 'Exibir distâncias e tempos';
xLng['TBSETUPLINK'] = 'Configurações do Script';
xLng['UPDATEALLVILLAGES'] = 'Atualizar todas as aldeias.  UTILIZAR COM O MÁXIMO DE CAUTELA, ESSA FUNÇÃO PODE FAZER SUA CONTA SER BANIDA DO JOGO !';
xLng['9'] = "Exibir links adicionais no menu esquerdo?<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Mapa maior';
xLng['USETHEMPR'] = 'Usar tudo (proporcional)';
xLng['USETHEMEQ'] = 'Usar tudo (equilibrar)';
xLng['TOWNHALL'] = 'Edifício Principal';
xLng['NOTEBLOCKOPTIONS'] = 'Bloco de anotações';
xLng['MENULEFT'] = 'Menu on the left side';
xLng['STATISTICS'] = 'Statistics';
xLng['RESOURCEFIELDS'] = 'Resource fields';
xLng['VILLAGECENTER'] = 'Centro da Aldeia';
xLng['MAPOPTIONS'] = 'Opções de Mapa';
xLng['COLOROPTIONS'] = 'Opções de Cor';
xLng['DEBUGOPTIONS'] = 'Opções de DEBUG';
xLng['4'] = 'Mercado';
xLng['5'] = 'Ponto de encontro/Quartel/Oficina/Cavalaria';
xLng['6'] = "Edifício Principaç/Mansão do Herói/Fábrica de Armaduras/Ferreiro";
xLng['HEROSMANSION'] = "Mansão do Herói";
xLng['BLACKSMITH'] = 'Ferreiro';
xLng['ARMOURY'] = 'Fábrica de Armaduras';
xLng['NOW'] = 'Agora';
xLng['CLOSE'] = 'Fechar';
xLng['USE'] = 'Usar';
xLng['USETHEM1H'] = 'Usar tudo (1 hora de produção)';
xLng['OVERVIEW'] = 'Visão geral';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'LOG de ataques';
xLng['NEWS'] = 'Notícias';
xLng['ADDCRTPAGE'] = 'Adicionar atual';
xLng['SCRPURL'] = 'TBeyond page';
xLng['50'] = 'Nº de tropas espiãs<br>"Select scout" fuction';
xLng['SPACER'] = 'Separador';
xLng['53'] = 'Mostrar informações de tropas';
xLng['MESREPOPTIONS'] = 'Mensagens e Relatórios';
xLng['59'] = 'Número de mensagens/relatórios por página<br>(Default = 1)';
xLng['ATTABLES'] = 'Tabela de tropas';
xLng['MTW'] = 'Capacidade desperdiçada';
xLng['MTX'] = 'Capacidade excedida';
xLng['MTC'] = 'Capacidade utilizada';
xLng['ALLIANCEFORUMLINK'] = 'Link para fórum externo<br>(deixe vazio o fórum interno)';
xLng['82.L'] = 'Fechar favoritos (ocultar ícones de edição)';
xLng['MTCL'] = 'Apagar tudo';
xLng['82.U'] = 'Abrir Favoritos (Mostrar ícones de edição)';
xLng['CLICKSORT'] = 'Click to sort';
xLng['MIN'] = 'Mínimo';
xLng['SAVEGLOBAL'] = 'Shared among villages';
xLng['VILLAGELIST'] = 'Lista de Aldeias';
xLng['12'] = "Mostrar 'dorf1.php' and 'dorf2.php' links";
xLng['UPDATEPOP'] = 'Atualizar habitantes';
xLng['RESIDUE'] = 'Se construir, sobra';
xLng['RESOURCES'] = 'Recursos';
break;
case "cz":
//by Rypi
xLng['8'] = 'Aliance';
xLng['SIM'] = 'Bitevní simulátor';
xLng['QSURE'] = 'Jsi si jistý?';
xLng['LOSS'] = 'Materiální ztráta';
xLng['PROFIT'] = 'Výnos';
xLng['EXTAV'] = 'Rozšířit';
xLng['PLAYER'] = 'Hráč';
xLng['VILLAGE'] = 'Vesnice';
xLng['POPULATION'] = 'Populace';
xLng['COORDS'] = 'Souřadnice';
xLng['MAPTBACTS'] = 'Akce';
xLng['SAVED'] = 'Uloženo';
xLng['YOUNEED'] = 'Potřebuješ:';
xLng['TODAY'] = 'dnes';
xLng['TOMORROW'] = 'zítra';
xLng['DAYAFTERTOM'] = 'pozítří';
xLng['MARKET'] = 'Tržiště';
xLng['BARRACKS'] = 'Kasárny';
xLng['RALLYPOINT'] = 'Shromaždiště';
xLng['STABLE'] = 'Stáje';
xLng['WORKSHOP'] = 'Dílna';
xLng['SENDRES'] = 'Poslat suroviny';
xLng['BUY'] = 'Koupit';
xLng['SELL'] = 'Prodat';
xLng['SENDIGM'] = 'Poslat zprávu';
xLng['LISTO'] = 'Dostupné';
xLng['ON'] = 'v';
xLng['AT'] = 'v';
xLng['EFICIENCIA'] = 'Efektivita';
xLng['NEVER'] = 'Nikdy';
xLng['ALDEAS'] = 'Vesnic';
xLng['TIEMPO'] = 'Čas';
xLng['OFREZCO'] = 'Nabízí';
xLng['BUSCO'] = 'Hledá';
xLng['TIPO'] = 'Poměr';
xLng['DISPONIBLE'] = 'Pouze dostupné';
xLng['CUALQUIERA'] = 'Cokoli';
xLng['YES'] = 'Ano';
xLng['NO'] = 'Ne';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Záložky';
xLng['ANYADIR'] = 'Přidat';
xLng['UBU'] = 'URL odkazu';
xLng['UBT'] = 'Název záložky';
xLng['ELIMINAR'] = 'Odstranit';
xLng['MAPA'] = 'Mapa';
xLng['MAXTIME'] = 'Maximální čas';
xLng['ARCHIVE'] = 'Archiv';
xLng['SUMMARY'] = 'Souhrn';
xLng['TROPAS'] = 'Vojsko';
xLng['CHKSCRV'] = 'Aktualizuj T3Beyond';
xLng['ACTUALIZAR'] = 'Aktualizovat informace o vesnici';
xLng['VENTAS'] = 'Nabídky tržiště (neměnit)';
xLng['MAPSCAN'] = 'Prohledat mapu';
xLng['BIGICONS'] = 'Nastavení rozšiřujících ikon';
xLng['22'] = 'Zobrazit poznámkový blok';
xLng['SAVE'] = 'Uložit';
xLng['49'] = 'Výchozí vojenská akce';
xLng['AT2'] = 'Podpora';
xLng['AT3'] = 'Normální';
xLng['AT4'] = 'Loupež';
xLng['24'] = 'Velikost poznámkového bloku';
xLng['NBSIZEAUTO'] = 'Automatická';
xLng['NBSIZENORMAL'] = 'Malý';
xLng['NBSIZEBIG'] = 'Velký';
xLng['25'] = 'Výška poznámkového bloku';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automatická výška';
xLng['NBKEEPHEIGHT'] = 'Výchozí výška';
xLng['43'] = 'Zobrazit úrovně budov';
xLng['NPCSAVETIME'] = 'Ušetříš: ';
xLng['38'] = 'Obarvit úrovně polí';
xLng['44'] = 'Obarvit úrovně budov';
xLng['65'] = 'Možnost vylepšení (barva)<br>(Nezadáno = Výchozí)';
xLng['66'] = 'Maximální úroveň (barva)<br>(Nezadáno = Výchozí)';
xLng['67'] = 'Vylepšení nemožné (barva)<br>(Nezadáno = Výchozí)';
xLng['68'] = 'Vylepšení pomocí NPC (barva)<br>(Nezadáno = Výchozí)';
xLng['TOTALTROOPS'] = 'Všechny jednotky vyrobené ve vesnici';
xLng['20'] = 'Zobrazit záložky';
xLng['U.2'] = 'Národ';
xLng['1'] = "Travian verze 2.x";
xLng['SELECTALLTROOPS'] = "Všechny jednotky";
xLng['PARTY'] = "Slavnosti";
xLng['CPPERDAY'] = "KB/den";
xLng['SLOT'] = "Sloty";
xLng['TOTAL'] = "Celkem";
xLng['SELECTSCOUT'] = "Špehy";
xLng['SELECTFAKE'] = "Fake";
xLng['NOSCOUT2FAKE'] = "Špehy nelze použít jako fake!";
xLng['NOTROOP2FAKE'] = "Žádné jednotky pro fake!";
xLng['NOTROOP2SCOUT'] = "Žádní špehové!";
xLng['NOTROOPS'] = "Žádné jednotky ve vesnici!";
xLng['ALL'] = "Vše";
xLng['SH2'] = "Barvy můžeš zadat jako:<br>- <b>green</b> , <b>red</b> nebo <b>orange</b> atd.<br>- HEX kód barvy např. <b>#004523</b><br>- nechat prázdné pro výchozí barvu";
xLng['SHOWORIGREPORT'] = "Zobrazit originální report";
xLng['56'] = "Zobrazit typ vesnic<br>při najetí myší na mapu";
xLng['10'] = "Bitevní simulátor:<br>(levé menu)";
xLng['WARSIMOPTION1'] = "Interní (travian.cz)";
xLng['WARSIMOPTION2'] = "Externí (kirilloid.ru)";
xLng['27'] = "Analyser:";
xLng['28'] = "Zobrazit odkaz na analyser";
xLng['NONEWVER'] = "Máš poslední verzi";
xLng['BVER'] = "Máš betaverzi";
xLng['NVERAV'] = "Je dostupná nová verze";
xLng['UPDATESCRIPT'] = "Aktualizovat nyní?";
xLng['CHECKUPDATE'] = "Kontroluji novou verzi.<br>Prosím čekej...";
xLng['CROPFINDER'] = "Vyhledávač MC";
xLng['AVPOPPERVIL'] = "Průměrná populace vesnic";
xLng['AVPOPPERPLAYER'] = "Průměrná populace hráčů";
xLng['37'] = "Zobrazit tabulku rozšíření polí";
xLng['41'] = "Zobrazit tabulku rozšíření budov";
xLng['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Výchozí= 0)";
xLng['48'] = "Počet kontrolovaných stránek<br>na 'Tržiště => Koupit'<br>(Výchozí= 1)";
xLng['U.3'] = 'Jméno hlavní vesnice<br><b>Pro aktualizaci navštiv svůj profil</b>';
xLng['U.6'] = 'Souřadnice hlavní vesnice<br><b>Pro aktualizaci navštiv svůj profil</b>';
xLng['TOTALTROOPSTRAINING'] = 'Celkem jednotek ve výuce';
xLng['57'] = 'Zobrazit vzdálenosti a časy';
xLng['TBSETUPLINK'] = 'Nastavení T3Beyond';
xLng['UPDATEALLVILLAGES'] = 'Aktualizovat všechny vesnice. POZOR! MŮŽE VÉST K ZABLOKOVÁNÍ ÚČTU';
xLng['9'] = "Zobrazit odkazy v levém menu<br>(Traviantoolbox, World Analyser, Travilog, Mapa)";
xLng['LARGEMAP'] = 'Velká mapa';
xLng['USETHEMPR'] = 'Rozdělit (proportional)';
xLng['USETHEMEQ'] = 'Rozdělit (equal)';
xLng['TOWNHALL'] = 'Radnice';
xLng['GAMESERVERTYPE'] = 'Nastavení serveru';
xLng['ACCINFO'] = 'Nastavení hráče <b>Čeština: <a href="http://www.rypi.cz">Rypi</a></b>';
xLng['NOTEBLOCKOPTIONS'] = 'Nastavení poznámkového bloku';
xLng['MENULEFT'] = 'Nastavení levého menu';
xLng['STATISTICS'] = 'Nastavení statistik';
xLng['RESOURCEFIELDS'] = 'Nastavení surovinových polí';
xLng['VILLAGECENTER'] = 'Nastavení centra vesnice';
xLng['MAPOPTIONS'] = 'Nastavení mapy';
xLng['COLOROPTIONS'] = 'Nastavení barev';
xLng['DEBUGOPTIONS'] = 'Nastavení ladění (pouze pro programátory)';
xLng['4'] = 'Tržiště';
xLng['5'] = 'Shromaždiště/Kasárny/Dílny/Stáje';
xLng['6'] = "Radnice/Hrdinský dvůr/Zbrojnice/Kovárna";
xLng['HEROSMANSION'] = "Hrdinský dvůr";
xLng['BLACKSMITH'] = "Kovárna";
xLng['ARMOURY'] = "Zbrojnice";
xLng['NOW'] = 'Teď';
xLng['CLOSE'] = 'Zavřít';
xLng['USE'] = 'Použít';
xLng['USETHEM1H'] = 'Rozdělit (1 hodinová produkce)';
xLng['OVERVIEW'] = 'Přehled';
xLng['FORUM'] = 'Fórum';
xLng['ATTACKS'] = 'Útoky';
xLng['NEWS'] = 'Novinky';
xLng['ADDCRTPAGE'] = 'Přidat aktuální stránku';
xLng['SCRPURL'] = 'Stránka TBeyond';
xLng['50'] = 'Počet špehů při použití<br>funkce poslat špehy';
xLng['SPACER'] = 'Oddělovač';
xLng['53'] = 'Informace o jednotkách při najetí myší';
xLng['MESREPOPTIONS'] = 'Zprávy & Reporty';
xLng['59'] = 'Počet stránek zpráv/reportů k načtení<br>(Výchozí= 1)';
xLng['ATTABLES'] = 'Přehled jednotek';
xLng['MTW'] = 'Zbývá';
xLng['MTX'] = 'Přebývá';
xLng['MTC'] = 'Současný náklad';
xLng['ALLIANCEFORUMLINK'] = 'Odkaz na externí fórum<br>(nevyplněno = interní fórum)';
xLng['82.L'] = 'Uzamknout záložky (skryje ikony smazat a přesunout)';
xLng['MTCL'] = 'Vyčistit vše';
xLng['82.U'] = 'Odemknout záložky (zobrazí ikony smazat a přesunout)';
xLng['CLICKSORT'] = 'Klikni pro seřazení';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Pro všechny vesnice';
xLng['VILLAGELIST'] = 'Seznam vesnic';
xLng['12'] = "Zobrazit odkazy 'dorf1.php' a 'dorf2.php'";
xLng['UPDATEPOP'] = 'Aktualizovat populaci';
xLng['54'] = 'Zobrazit vzdálenosti a časy při najetí myší';
xLng['EDIT'] = 'Upravit';
xLng['NPCOPTIONS'] = 'Nastavení NPC pomocníka';
xLng['26'] = 'Zobrazit NPC pomocníky (výpočty a odkazy)';
xLng['58'] = 'Zobrazit tabulku hráčů/vesnic/oáz';
xLng['NEWVILLAGEAV'] = 'Datum/čas';
xLng['TIMEUNTIL'] = 'Čas čekání';
xLng['61'] = 'Zobrazit tabulku "Smazat vše" na stránce s reporty';
xLng['62'] = 'Zobrazit "Poslat zprávu" i pro mě';
xLng['CENTERMAP'] = 'Vycentruj mapu kolem této vesnice';
xLng['13'] = 'Zobrazit ikonu centra vesnice';
//xLng['64'] = 'Zobrazit detaily ve statistikách reportu';
xLng['SENDTROOPS'] = 'Poslat jednotky';
xLng['64'] = 'Zobrazit detaily ve statistice reportu';
xLng['7'] = "Palác/Rezidence/Akademie/Pokladnice";
xLng['PALACE'] = "Palác";
xLng['RESIDENCE'] = "Rezidence";
xLng['ACADEMY'] = "Akademie";
xLng['TREASURY'] = "Pokladnice";
xLng['45'] = "Zobrazit blikající levely pro budovy, které se staví";
xLng['14'] = "Zobrazit ikony 'poslat jednotky/suroviny' v seznamu vesnic";
xLng['34'] = "Zobrazit KB/den v tabulce staveb";
xLng['UPGTABLES'] = "Tabulka vylepšení surovinových polí/budov";
xLng['35'] = "Zobrazit spotřebu obilí v tabulce staveb";
xLng['16'] = "Zobrazit produkci obilí v seznamu vesnic";
xLng['RESBARTABLETITLE'] = "Tabulka surovin";
xLng['39'] = "Zobrazit tabulku 'suroviny'";
xLng['40'] = "Zobrazit tabulku 'suroviny' jako okno";
xLng['21'] = "Zobrazit 'záložky' jako okno";
xLng['23'] = "Zobrazit 'poznámkový blok' jako okno";
xLng['17'] = "Zobrazit populaci v seznamu vesnic";
xLng['29'] = 'Mapy k použití';
xLng['30'] = 'Zobrazit odkazy na mapu pro hráče';
xLng['31'] = 'Zobrazit odkazy na mapu pro aliance';
xLng['60'] = 'Zobrazit odkaz pro otevření zprávy v novém okně.';
break;
case "ru":
//by millioner & MMIROSLAV & EXEMOK & AHTOH & d00mw01f
xLng['8'] = 'Альянс';
xLng['SIM'] = 'Симулятор боя';
xLng['QSURE'] = 'Вы уверены?';
xLng['LOSS'] = 'Потери';
xLng['PROFIT'] = 'Прибыль';
xLng['EXTAV'] = 'Возможно развитие';
xLng['PLAYER'] = 'Игрок';
xLng['VILLAGE'] = 'Деревня';
xLng['POPULATION'] = 'Население';
xLng['COORDS'] = 'Координаты';
xLng['MAPTBACTS'] = 'Действия';
xLng['SAVED'] = 'Сохранено';
xLng['YOUNEED'] = 'Не хватает';
xLng['TODAY'] = 'Сегодня';
xLng['TOMORROW'] = 'Завтра';
xLng['DAYAFTERTOM'] = 'Послезавтра';
xLng['MARKET'] = 'Рынок';
xLng['BARRACKS'] = 'Казарма';
xLng['RALLYPOINT'] = 'Пункт сбора';
xLng['STABLE'] = 'Конюшня';
xLng['WORKSHOP'] = 'Мастерская';
xLng['SENDRES'] = 'Послать ресурсы';
xLng['BUY'] = 'Купить';
xLng['SELL'] = 'Продать';
xLng['SENDIGM'] = 'Послать сообщение';
xLng['LISTO'] = 'Развитие будет возможно';
xLng['ON'] = 'на';
xLng['AT'] = 'в';
xLng['EFICIENCIA'] = 'Эффективность';
xLng['NEVER'] = 'Никогда';
xLng['ALDEAS'] = 'Деревни';
xLng['TIEMPO'] = 'Время';
xLng['OFREZCO'] = 'Продажа';
xLng['BUSCO'] = 'Покупка';
xLng['TIPO'] = 'Соотношение';
xLng['DISPONIBLE'] = 'Только доступные для покупки';
xLng['CUALQUIERA'] = 'Все';
xLng['YES'] = 'Да';
xLng['NO'] = 'Нет';
xLng['LOGIN'] = 'Логин';
xLng['MARCADORES'] = 'Закладки';
xLng['ANYADIR'] = 'Добавить';
xLng['UBU'] = 'Добавить адрес (Http://***) в закладки';
xLng['UBT'] = 'Название закладки';
xLng['ELIMINAR'] = 'Удалить';
xLng['MAPA'] = 'Карта';
xLng['MAXTIME'] = 'Максимальное время';
xLng['ARCHIVE'] = 'Архив';
xLng['SUMMARY'] = 'Суммарно';
xLng['TROPAS'] = 'Послать войска';
xLng['CHKSCRV'] = 'Обновить TBeyond';
xLng['ACTUALIZAR'] = 'Обновить информацию о деревне';
xLng['VENTAS'] = 'Сохраненный предложения';
xLng['MAPSCAN']  = 'Сканировать карту';
xLng['BIGICONS'] = 'Отображение иконок';
xLng['22'] = 'Показывать блок заметок';
xLng['SAVE'] = 'Сохранить';
xLng['49'] = 'Действие понкта сбора, по умолчанию:';
xLng['AT2'] = 'Подкрепление';
xLng['AT3'] = 'Нападение: обычное';
xLng['AT4'] = 'Нападение: набег';
xLng['24'] = 'Размер поля заметок';
xLng['NBSIZEAUTO'] = 'Автоматически';
xLng['NBSIZENORMAL'] = 'Нормальный (маленький)';
xLng['NBSIZEBIG'] = 'Во весь экран (большой)';
xLng['25'] = 'Высота поля заметок';
xLng['NBAUTOEXPANDHEIGHT'] = 'Автоподбор высоты';
xLng['NBKEEPHEIGHT'] = 'По умолчанию';
xLng['43'] = 'Показывать уровни зданий в центре';
xLng['NPCSAVETIME'] = 'Время: ';
xLng['38'] = 'Показывать уровни ресурсных полей цветами';
xLng['44'] = 'Показывать уровни зданий цветами';
xLng['65'] = 'Цвет, если развитие возможно<br>(по умолчанию = пусто)';
xLng['66'] = 'Цвет максимального уровня развития<br>(по умолчанию = пусто)';
xLng['67'] = 'Цвет, если развитие не возможно<br>(по умолчанию = пусто)';
xLng['68'] = 'Цвет, когда доступно развитие посредством NPC-ассистента<br>(по умолчанию = пусто)';
xLng['TOTALTROOPS'] = 'Собственные войска в деревне';
xLng['20'] = 'Показывать закладки';
xLng['U.2'] = 'Раса';
xLng['1'] = "Travian сервер версии v2.x";
xLng['SELECTALLTROOPS'] = "Выбрать все войска";
xLng['PARTY'] = "Праздники";
xLng['CPPERDAY'] = "ЕК/день";
xLng['SLOT'] = "Слот";
xLng['TOTAL'] = "Всего";
xLng['SELECTSCOUT'] = "Выбрать разведку";
xLng['SELECTFAKE'] = "Выбрать спам";
xLng['NOSCOUT2FAKE'] = "Невозможно использовать разведчика для спама !";
xLng['NOTROOP2FAKE'] = "Недостаточно войск для спама !";
xLng['NOTROOP2SCOUT'] = "Недостаточно войск для разведки !";
xLng['NOTROOPS'] = "Недостаточно войск в деревне !";
xLng['ALL'] = "Все";
xLng['SH2'] = "В полях ввода цветов можно ввести одно значение:<br>- green (зеленый), red (красный) или orange (оранжевый), и т.д.<br> - HEX-код цвета #004523<br>- оставить пустым для значения по умолчанию";
xLng['SHOWORIGREPORT'] = "Убрать описание (для отправки)";
xLng['56'] = "Показывать тип клетки<br>во время передвижения мышки над картой ";
xLng['10'] = "Использовать симулятор боя:<br>(левое меню)";
xLng['WARSIMOPTION1'] = "Внутренний (предлагаемый игрой)";
xLng['WARSIMOPTION2'] = "Внешний (предлагаемый kirilloid.ru)";
xLng['27'] = "Какой World Analyser (анализатор мира) использовать";
xLng['28'] = "Показывать ссылки на статистику анализатора";
xLng['NONEWVER'] = "У вас последняя версия";
xLng['BVER'] = "Вы можете установить бета версию";
xLng['NVERAV'] = "Доступна новая версия скрипта";
xLng['UPDATESCRIPT'] = "Вы хотите обновить скрипт сейчас ?";
xLng['CHECKUPDATE'] = "Поиск обновлений скрипта.<br>Пожалуйста, подождите...";
xLng['CROPFINDER'] = "Поиск зерна";
xLng['AVPOPPERVIL'] = "Среднее население среди деревень";
xLng['AVPOPPERPLAYER'] = "Среденее население среди игроков";
xLng['37'] = "Показыть таблицу развития ресурсных полей";
xLng['41'] = "Показывать таблицу развития зданий";
xLng['69'] = "Console Log Level<br>ТОЛЬКО ДЛЯ ПРОГРАММИСТОВ И ОТЛАДЧИКОВ<br>(по умолчанию = 0)";
xLng['48'] = "количество страниц отображаемых в разделе<br>'Рынок => Покупка' страниц<br>(по умолчанию =1)";
xLng['U.3'] = 'Название вашей Столицы<br>Посетите свой профиль для обновления';
xLng['U.6'] = 'Координаты вашей Столицы<br>Посетите свой профиль для обновления';
xLng['MAX'] = 'Максимум';
xLng['TOTALTROOPSTRAINING'] = 'Общее число обучаемых войск';
xLng['57'] = 'Показывать расстояния и время';
xLng['TBSETUPLINK'] = TB3O.shN + ' Установка';
xLng['UPDATEALLVILLAGES'] = 'Обновить все деревни. ИСПОЛЬЗУЙТЕ С КРАЙНЕЙ ОСТОРОЖНОСТЬЮ. ПОТОМУ ЧТО ЭТО МОЖЕТ ПРИВЕСТИ К БАНУ АККАУНТА !';
xLng['9'] = "Показывать дополнительные ссылки в левом меню<br>(Traviantoolbox, World Analyser, Travilog, Map и т.д.)";
xLng['LARGEMAP'] = 'Большая карта';
xLng['USETHEMPR'] = 'Использовать (в % содержании). ';
xLng['USETHEMEQ'] = 'Использовать (равномерно).';
xLng['TOWNHALL'] = 'Ратуша';
xLng['GAMESERVERTYPE'] = 'Игровой сервер';
xLng['ACCINFO'] = 'Информация аккаунта';
xLng['NOTEBLOCKOPTIONS'] = 'Блок заметок';
xLng['MENULEFT'] = 'Меню с левой стороны';
xLng['STATISTICS'] = 'Статистика';
xLng['RESOURCEFIELDS'] = 'Ресурсные поля';
xLng['VILLAGECENTER'] = 'Центр деревни';
xLng['MAPOPTIONS'] = 'Настройки карты';
xLng['COLOROPTIONS'] = 'Цветовые настройки';
xLng['DEBUGOPTIONS'] = 'Опции отладки скрипта';
xLng['4'] = 'Рынок';
xLng['5'] = 'Пункт сбора/Казарма/Мастермкая/Конюшня';
xLng['6'] = "Ратуша/Таверна/Кузница доспехов/Кузница оружия";
xLng['HEROSMANSION'] = "Таверна";
xLng['BLACKSMITH'] = 'Кузница оружия';
xLng['ARMOURY'] = 'Кузница доспехов';
xLng['NOW'] = 'Сейчас';
xLng['CLOSE'] = 'Закрыть';
xLng['USE'] = 'Использовать';
xLng['USETHEM1H'] = 'Использовать (часовая выработка).';
xLng['OVERVIEW'] = 'Обзор';
xLng['FORUM'] = 'Форум';
xLng['ATTACKS'] = 'Нападения';
xLng['NEWS'] = 'Новости';
xLng['ADDCRTPAGE'] = 'Добавить текущее';
xLng['SCRPURL'] = 'Страница TBeyond';
xLng['50'] = 'Количество разведчиков для функции<br>"Разведать"';
xLng['SPACER'] = 'Пространство';
xLng['53'] = 'Показывать информацию о войсках в подсказках';
xLng['MESREPOPTIONS'] = 'Сообщения и Отчеты';
xLng['59'] = 'Количество страниц для презагрузки<br>(Стандартно = 1)';
xLng['ATTABLES'] = 'Таблица войск';
xLng['MTW'] = 'Свободно';
xLng['MTX'] = 'Перебор';
xLng['MTC'] = 'Нагруженно';
xLng['ALLIANCEFORUMLINK'] = 'Ссылки на внешние форум<br>(Оставить пустым для внутренне-игрового форума)';
xLng['82.L'] = 'Заблокировать закоадки (Спрятать иконки удалить, переместить вверх, переместить вниз)';
xLng['MTCL'] = 'Очистить все';
xLng['82.U'] = 'Разблокировать заклдаки< (Показать иконки удалить, переместить вверх, переместить вниз)';
xLng['CLICKSORT'] = 'Кликните для сортировки';
xLng['MIN'] = 'Минимум';
xLng['SAVEGLOBAL'] = 'Общее для всех деревень';
xLng['VILLAGELIST'] = 'Список деревень';
xLng['12'] = "Показывать ссылки на 'dorf1.php' и 'dorf2.php'";
xLng['UPDATEPOP'] = 'Обновить население';
xLng['54'] = 'Показывать расстояние и время до поселения в подсказках';
xLng['EDIT'] = 'Редактировать';
xLng['NPCOPTIONS'] = 'Опции NPC помощника';
xLng['26'] = 'Показывать NPC помощника калькулятор / ссылки';
xLng['58'] = 'Показать таблицу игроков / деревень / захваченых оазисов';
xLng['NEWVILLAGEAV'] = 'Дата/Время';
xLng['TIMEUNTIL'] = 'Осталось времени';
xLng['61'] = 'Показывать "Удалить все" на странице отчетов';
xLng['62'] = 'Для меня также показывать иконку "Отправить сообщение"';
xLng['CENTERMAP'] = 'Центрировать деревню на карте';
xLng['13'] = 'Показывать иконку "Центрировать деревню на карте"';
xLng['SENDTROOPS'] = 'Отправка войск';
xLng['64'] = 'Показывать подробности в статистике отчетов';
xLng['7'] = "Дворец/Резиденция/Академия/Сокровищница";
xLng['PALACE'] = "Дворец";
xLng['RESIDENCE'] = "Резиденция";
xLng['ACADEMY'] = "Академия";
xLng['TREASURY'] = "Сокровищница";
xLng['45'] = "Уровень строящегося здания будет мигать";
xLng['14'] = "Показывать иконку 'Отправить войска/Отправить ресурсы' в списке деревень";
xLng['34'] = "Показывать Единиц Культуры(ЕК)/день в таблицах развития";
xLng['UPGTABLES'] = "Возможности ресурсов/зданий в таблицах развития";
xLng['35'] = "Показывать потребление зерна в таблицах развития";
xLng['16'] = "Показывать прибыль зерна в списке деревень";
xLng['RESBARTABLETITLE'] = "Таблица ресурсов";
xLng['39'] = "Показывать Таблицу ресурсов";
xLng['40'] = "Показывать таблицу ресурсов в плавающим окне";
xLng['21'] = "Показывать закладки в плавающим окне";
xLng['23'] = "Показывать заметки в плавающим окне";
xLng['17'] = "Показывать население в списке деревень";
xLng['29'] = 'Используемый  анализатор карты';
xLng['30'] = 'Показывать ссылку на карту для пользователей';
xLng['31'] = 'Показывать ссылку на карту для альянсов';
xLng['63'] = 'Показывать расширенные отчеты боев (TB3)';
xLng['18'] = 'Показывать дополнительно (2 колонки) список деревень в плавующим окне';
xLng['60'] = 'Показывать ссылки для открытия в новом окне';
xLng['42'] = 'Упорядочить здания по названию в таблицах развития';
xLng['19'] = 'Показывать информацию о здании, которые развиваются в данный момент<br>и войска, которые сейчас в походе в списке деревень';
xLng['32'] = "Показывать 'Поиск'";
xLng['3'] = 'Заменить расчеты грузоподьемности Легионера и Фаланги T3.1<br>(Для T3.1 и T3.5 серверов)';
xLng['33'] = "Показывать 'Поиск' в плаваюцим окне";
xLng['36'] = "Показывать 'К тому времени/Остатки' расчеты в таблице развития построек";
xLng['RESIDUE'] = 'Остатки ресурсов, когда построите это';
xLng['RESOURCES'] = 'Ресурсы';
xLng['SH1'] = "Открыть ваш профиль для автоматического определения столицы/координат<br>Постройте казарму для автоматического определения расы, а потом откройте центр деревни";
xLng['46'] = "Показывать дополнительную информацию для каждого прибывающего тогровца";
xLng['2'] = 'Убрать рекламу';
break;
case "ua":
//by jin
xLng['8'] = 'Альянс';
xLng['LOGIN'] = 'Логін';
xLng['SIM'] = 'Симулятор бою';
xLng['QSURE'] = 'Ви впевнені?';
xLng['LOSS'] = 'Втрати';
xLng['PROFIT'] = 'Прибуток';
xLng['EXTAV'] = 'Розвиток доступний';
xLng['PLAYER'] = 'Гравець';
xLng['VILLAGE'] = 'Поселення';
xLng['POPULATION'] = 'Населення';
xLng['COORDS'] = 'Координати';
xLng['MAPTBACTS'] = 'Дії';
xLng['SAVED'] = 'Збережено';
xLng['YOUNEED'] = 'Не вистачає';
xLng['TODAY'] = 'сьогодні';
xLng['TOMORROW'] = 'завтра';
xLng['DAYAFTERTOM'] = 'післязавтра';
xLng['MARKET'] = 'Ринок';
xLng['BARRACKS'] = 'Казарма';
xLng['RALLYPOINT'] = 'Пункт збору';
xLng['STABLE'] = 'Стайня';
xLng['WORKSHOP'] = 'Майстерня';
xLng['ENVIAR'] = 'Відправити ресурси';
xLng['BUY'] = 'Купити';
xLng['SELL'] = 'Продати';
xLng['SENDIGM'] = 'Відправити повідомлення';
xLng['LISTO'] = 'Доступний';
xLng['ON'] = 'на';
xLng['AT'] = 'о';
xLng['EFICIENCIA'] = 'Ефективність';
xLng['NEVER'] = 'Ніколи';
xLng['ALDEAS'] = 'Поселення';
xLng['TROPAS'] = 'Відправити  військо';
xLng['TIEMPO'] = 'Час';
xLng['OFREZCO'] = 'Продаж';
xLng['BUSCO'] = 'Купівля';
xLng['TIPO'] = 'Співвідношення';
xLng['CUALQUIERA'] = 'Всі';
xLng['YES'] = 'Так';
xLng['NO'] = 'Ні';
xLng['ANYADIR'] = 'Додати';
xLng['UBU'] = 'Додати адресу (http://***) в закладки';
xLng['UBT'] = 'Назва закладки';
xLng['ELIMINAR'] = 'Видалити';
xLng['MAPA'] = 'Карта';
xLng['DISPONIBLE'] = 'Лише доступні';
xLng['TOTALTROOPSTRAINING'] = 'Загальна кількість військ для навчання';
xLng['TOTAL'] = "Загалом";
xLng['NPCSAVETIME'] = 'Час: ';
xLng['NONEWVER'] = "В тебе остання версія";
xLng['NVERAV'] = "Доступна нова версія скрипта";
xLng['UPDATESCRIPT'] = "Ви хочече обновити скрипт зараз?";
xLng['CHECKUPDATE'] = "Пошук обновлень скрипта.<br>Будь ласка, зачекайте...";
xLng['TOTALTROOPS'] = 'Власні війська в поселенні';
xLng['CHKSCRV'] = 'Оновити TBeyond';
xLng['ACTUALIZAR'] = 'Оновити інформацію про поселення';
xLng['ARCHIVE'] = 'Архів';
xLng['UPDATEALLVILLAGES'] = 'Оновити всі поселення';
xLng['SHOWORIGREPORT'] = 'Прибрати опис(для відправлення)';
xLng['SCRPURL'] = 'Сторінка TBeyond';
xLng['CPPERDAY'] = "Од.культ./день";
xLng['PARTY'] = "Свята";
xLng['SLOT'] = "Комірка";
xLng['USETHEMPR'] = 'Використовувати (пропорційно). ';
xLng['USETHEMEQ'] = 'Використовувати (рівномірно).';
xLng['USETHEM1H'] = 'Використовувати (годинний видобуток).';
xLng['MTCL'] = 'Очистити все';
xLng['MAXTIME'] = 'Максимальний час';
xLng['SAVE'] = 'Зберегти';
xLng['MAPSCAN'] = 'Сканувати карту';
xLng['U.2'] = 'Раса';
xLng['MARCADORES'] = 'Закладки';
xLng['20'] = 'Показувати закладки';
xLng['GAMESERVERTYPE'] = 'Ігровий сервер';
xLng['ACCINFO'] = 'Інформація про акаунт';
xLng['U.3'] = 'Назва твоєї столиці<br>Відвідай свій профіль для обновлення';
xLng['U.6'] = 'Координати твоєї столиці<br>Відвідай свій профіль для обновлення';
xLng['48'] = "Кількість сторінок, які відображатимуться в розділі<br>'Ринок => Купівля' сторінок<br>(за замовчуванням =1)";
xLng['BIGICONS'] = 'Відображення іконок';
xLng['1'] = "Сервер Travian 2.x версії";
xLng['4'] = 'Ринок';
xLng['5'] = 'Пункт збору/Казарма/Майстерня/Стайня';
xLng['6'] = "Ратуша/Таверна/Кузня обладунків/Кузня зброї";
xLng['TOWNHALL'] = 'Ратуша';
xLng['HEROSMANSION'] = "Таверна";
xLng['BLACKSMITH'] = 'Кузня зброї';
xLng['ARMOURY'] = 'Кузня обладунків';
xLng['PROFILE'] = 'Профіль';
xLng['MENULEFT'] = 'Меню з лівого боку';
xLng['9'] = "Показувати додаткові посилання в лівому меню<br>(Traviantoolbox, World Analyser, Travilog, Map і т.д.)";
xLng['10'] = "Використовувати симулятор бою:<br>(ліве меню)";
xLng['WARSIMOPTION1'] = "Внутрішній (travian.com.ua)";
xLng['WARSIMOPTION2'] = "Зовнішній (kirilloid.ru)";
xLng['VILLAGELIST'] = 'Список поселень';
xLng['12'] = "Показувати посилання на 'dorf1.php' и 'dorf2.php'";
xLng['22'] = 'Показувати поле заміток';
xLng['NOTEBLOCKOPTIONS'] = 'Поле заміток';
xLng['NPCOPTIONS'] = 'Опції NPC-асистента';
xLng['26'] = 'Показувати розрахунки NPC-асистента/ посилання';
xLng['STATISTICS'] = 'Статистика';
xLng['27'] = "Який аналізатор світу використовувати?";
xLng['28'] = "Показувати посилання на статистику аналізатора";
xLng['37'] = "Показувати таблицю розвитку ресурсних полів";
xLng['41'] = "Показувати таблицю развитку споруд";
xLng['RESOURCEFIELDS'] = 'Ресурсні поля';
xLng['38'] = 'Показувати рівні ресурсних полів кольорами';
xLng['VILLAGECENTER'] = 'Центр поселення';
xLng['44'] = 'Показувати рівні споруд кольорами';
xLng['43'] = 'Показувати рівні споруд в центрі';
xLng['CROPFINDER'] = 'Пошук зерна';
xLng['SENDTROOPS'] = 'Відправлення війск';
xLng['7'] = "Палац/Резиденція/Академія/Скарбниця";
xLng['ALLIANCEFORUMLINK'] = 'Посилання на зновнішній форум<br>(Залишити порожнім для внутрішнього форуму)';
xLng['13'] = 'Показувати іконку "Центрувати поселення на карті"';
xLng['14'] = "Показувати іконку 'Відправити війська/Відправити ресурси' в списку поселень";
xLng['16'] = "Показувати прибуток зерна у списку поселень";
xLng['39'] = 'Показувати таблицю "Ресурси"';
xLng['RESBARTABLETITLE'] = 'Таблиця "Ресурси"';
xLng['45'] = "Блимання рівня споруди, що будується";
xLng['VENTAS'] = 'Збережені пропозиції';
xLng['49'] = 'Дії пункту збору за замовчуванням:';
xLng['AT2'] = 'Підкріплення';
xLng['AT3'] = 'Напад: звичайний';
xLng['AT4'] = 'Напад: розбійницький набіг';
xLng['50'] = 'Кількість розвідників для функції<br>"Розвідка"';
xLng['53'] = 'Показувати інформацію про війска в підказках';
xLng['56'] = "Показувати тип клітинки <br>під час пересування мишки над картою ";
xLng['57'] = 'Показувати відстань і час';
xLng['58'] = 'Показати таблицю гравців / поселень / захоплених оазисів';
xLng['59'] = 'Кількість сторінок для перезавантаження <br>(за замовчуванням = 1)';
xLng['61'] = 'Показувати "Видалити всі" на сторінці звітів';
xLng['64'] = 'Показувати подробиці в статистиці звітів';
xLng['MESREPOPTIONS'] = 'Повідомлення і Звіти';
xLng['MAPOPTIONS'] = 'Налаштування карти';
xLng['60'] = 'Показувати посилання для відкриття в новому вікні';
xLng['24'] = 'Розмір поля заміток';
xLng['SUMMARY'] = 'Сумарно';
xLng['NBSIZEAUTO'] = 'Автоматично';
xLng['NBSIZENORMAL'] = 'Нормальний (маленький)';
xLng['NBSIZEBIG'] = 'Великий екран (великий)';
xLng['25'] = 'Висота поля заміток';
xLng['NBAUTOEXPANDHEIGHT'] = 'Автоматичне збільшення висоти';
xLng['NBKEEPHEIGHT'] = 'Висота за замовчуванням';
xLng['65'] = 'Колір, коли доступний розвиток<br>(за замовчуванням = порожнє)';
xLng['66'] = 'Колір максимального рівня<br>(за замовчуванням = порожнє)';
xLng['67'] = 'Колір, коли розвиток не доступний<br>(за замовчуванням = порожнє)';
xLng['68'] = 'Колір, коли доступний розвиток за допомогою NPC-асистента<br>(за замовчуванням = порожнє)';
xLng['SELECTALLTROOPS'] = "Вибрати все військо";
xLng['SELECTSCOUT'] = "Відправити розвідника";
xLng['SELECTFAKE'] = "Відправити спам";
xLng['NOSCOUT2FAKE'] = "Використовувати розвідників, як спам неможливо!";
xLng['NOTROOP2FAKE'] = "Немає воїнів для спаму!";
xLng['NOTROOP2SCOUT'] = "Немає воїнів для розвідки !";
xLng['NOTROOPS'] = "В поселенні немає військ!";
xLng['ALL'] = "Всі";
xLng['SH2'] = "В полях введення кольорів можна ввести:<br>- green(зелений) чи red(червоний) чи  orange(оранжевий), і т.д.<br>- HEX-код кольору #004523<br>- залишити порожнім для значення за замовчуванням";
xLng['BVER'] = "Ви можете мати бета-версію";
xLng['AVPOPPERVIL'] = "Середня кількість населення на поселення";
xLng['AVPOPPERPLAYER'] = "Середня кількість населення на гравця";
xLng['69'] = "Console Log Level<br>ТІЛЬКИ ДЛЯ ПРОГРАМІСТІВ ЧИ ВІДЛАДЧИКІВ<br>(за замовчуванням = 0)";
xLng['MAX'] = 'Максимум';
xLng['TBSETUPLINK'] = 'Налаштування ' + TB3O.shN;
xLng['LARGEMAP'] = 'Велика карта';
xLng['COLOROPTIONS'] = 'Опції кольорів';
xLng['DEBUGOPTIONS'] = 'Опції відладки';
xLng['NOW'] = 'Вже';
xLng['CLOSE'] = 'Закрити';
xLng['USE'] = 'Використати';
xLng['OVERVIEW'] = 'Огляд';
xLng['FORUM'] = 'Форум';
xLng['ATTACKS'] = 'Напади';
xLng['NEWS'] = 'Новини';
xLng['ADDCRTPAGE'] = 'Додати поточну';
xLng['SPACER'] = 'Spacer';
xLng['ATTABLES'] = 'Таблиці військ';
xLng['MTW'] = 'Марнування';
xLng['MTX'] = 'Перевищення';
xLng['MTC'] = 'Завантажено';
xLng['82.L'] = 'Заблокувати закладки (Приховати видалити, рухати вверх, рухати вниз іконки)';
xLng['82.U'] = 'Розблокувати закладки (Приховати видалити, рухати вверх, рухати вниз іконки)';
xLng['CLICKSORT'] = 'Сортування';
xLng['MIN'] = 'Мінімум';
xLng['SAVEGLOBAL'] = 'Розподілити між поселеннями';
xLng['UPDATEPOP'] = 'Оновити населення';
xLng['54'] = 'Показувати відстань і час до поселення у підказках';
xLng['EDIT'] = 'Редагувати';
xLng['NEWVILLAGEAV'] = 'Дата/Час';
xLng['TIMEUNTIL'] = 'Час очікування';
xLng['62'] = 'Для мене також показувати іконку "Відправити повідомлення"';
xLng['CENTERMAP'] = 'Центрувати карту на цьому поселенні';
xLng['ACADEMY'] = "Академія";
xLng['TREASURY'] = "Скарбниця";
xLng['34'] = "Показувати одиниці культури/день в таблиці модернізації";
xLng['UPGTABLES'] = "Можливості полів/будівель в таблицях модернізації";
xLng['35'] = "Показувати споживання зерна у таблиці модернізації";
xLng['40'] = 'Показувати таблицю "Ресурси" у плаваючому вікні';
xLng['21'] = 'Показувати "Закладки" в плаваючому вікні';
xLng['23'] = 'Показувати "Замітки" в плаваючому вікні';
xLng['17'] = "Показувати населення в списку поселень";
xLng['29'] = 'Використати аналізатор карти';
xLng['30'] = 'Показувати посилання на карту для користувачів';
xLng['31'] = 'Показувати посилання до карти для альянсів';
xLng['63'] = 'Показувати розширені звіти боїв (TB3)';
xLng['18'] = 'Показати додатковий (2 колонки) список поселень у плаваючому вікні';
xLng['42'] = 'Сортувати за назвою будівлі у таблиці модернізації';
xLng['19'] = 'Показувати інформацію про будівлі, що розвиваються в даний час<br> і війська, які зараз у поході в списку поселень';
xLng['32'] = 'Показати "Пошук"';
xLng['33'] = 'Показувати "Пошук" в плаваючому вікні';
xLng['36'] = 'Показувати "До тих пір/Залишок" підрахунок в таблицях модернізації';
xLng['RESIDUE'] = 'Залишок після розвитку ';
xLng['RESOURCES'] = 'Ресурси';
break;
case "hu":
//by geo.
xLng['8'] = 'Klán';
xLng['SIM'] = 'Harc szimulátor';
xLng['QSURE'] = 'Biztos vagy benne?';
xLng['LOSS'] = 'Veszteség';
xLng['PROFIT'] = 'Nyereség';
xLng['EXTAV'] = 'Fejlesztés elérhetõ';
xLng['PLAYER'] = 'Játékos';
xLng['VILLAGE'] = 'Falu';
xLng['POPULATION'] = 'Népesség';
xLng['COORDS'] = 'Koordináták';
xLng['MAPTBACTS'] = 'Mozgás:';
xLng['SAVED'] = 'Mentve';
xLng['YOUNEED'] = 'Kell';
xLng['TODAY'] = 'ma';
xLng['TOMORROW'] = 'holnap';
xLng['DAYAFTERTOM'] = 'holnapután';
xLng['MARKET'] = 'Piac';
xLng['BARRACKS'] = 'Kaszárnya';
xLng['RALLYPOINT'] = 'Gyülekezõtér';
xLng['STABLE'] = 'Istálló';
xLng['WORKSHOP'] = 'Mûhely';
xLng['SENDRES'] = 'Nyersanyag küldése';
xLng['BUY'] = 'Vétel';
xLng['SELL'] = 'Eladás';
xLng['SENDIGM'] = 'Üzenet küldése';
xLng['LISTO'] = 'Elérhetõ';
xLng['ON'] = 'ezen a napon:';
xLng['AT'] = 'ekkor:';
xLng['EFICIENCIA'] = 'Hatékonyság';
xLng['NEVER'] = 'Soha';
xLng['ALDEAS'] = 'Falvak';
xLng['TIEMPO'] = 'Idõ';
xLng['OFREZCO'] = 'Felajánlás';
xLng['BUSCO'] = 'Keresés';
xLng['TIPO'] = 'Típus';
xLng['DISPONIBLE'] = 'Csak elfogadhatót';
xLng['CUALQUIERA'] = 'Mind';
xLng['YES'] = 'Igen';
xLng['NO'] = 'Nem';
xLng['LOGIN'] = 'Bejelentkezés';
xLng['MARCADORES'] = 'Könyvjelzõk';
xLng['ANYADIR'] = 'Hozzáad';
xLng['UBU'] = 'Könyvjelzõ URL';
xLng['UBT'] = 'Könyvjelzõ szövege';
xLng['ELIMINAR'] = 'Törlés';
xLng['MAPA'] = 'Térkép';
xLng['MAXTIME'] = 'Maximum idõ';
xLng['ARCHIVE'] = 'Archívum';
xLng['SUMMARY'] = 'Összefoglalás';
xLng['TROPAS'] = 'Egységek';
xLng['CHKSCRV'] = 'TBeyond frissítése';
xLng['ACTUALIZAR'] = 'Falu információ frissítése';
xLng['VENTAS'] = 'Mentett ajánlatok';
xLng['MAPSCAN'] = 'Térkép vizsgálata';
xLng['BIGICONS'] = 'Bõvített ikonok';
xLng['22'] = 'Jegyzettömb mutatása';
xLng['SAVE'] = 'Mentés';
xLng['49'] = 'Gyülekezõtér alapmûvelet';
xLng['AT2'] = 'Támogatás';
xLng['AT3'] = 'Normál támadás';
xLng['AT4'] = 'Rablótámadás';
xLng['24'] = 'Jegyzettömb mérete';
xLng['NBSIZEAUTO'] = 'Automatikus';
xLng['NBSIZENORMAL'] = 'Normál (kicsi)';
xLng['NBSIZEBIG'] = 'Nagy képernyõ (nagy)';
xLng['25'] = 'Jegyzettömb magassága';
xLng['NBAUTOEXPANDHEIGHT'] = 'Magasság automatikus bõvítése';
xLng['NBKEEPHEIGHT'] = 'Alap magasság';
xLng['43'] = 'Épület szintek mutatása';
xLng['NPCSAVETIME'] = 'Spórolsz: ';
xLng['38'] = 'Külterület színjelzése';
xLng['44'] = 'Épületek színjelzése';
xLng['65'] = 'Szín, ha fejleszthetõ<br>(az alaphoz hagyd üresen)';
xLng['66'] = 'Szín, ha teljesen ki van építve<br>(az alaphoz hagyd üresen)';
xLng['67'] = 'Szín, ha nem elérhetõ a fejlesztés<br>(az alaphoz hagyd üresen)';
xLng['68'] = 'Szín, ha NPC-vel fejleszthetõ<br>(az alaphoz hagyd üresen)';
xLng['TOTALTROOPS'] = 'A faluban képzett egységek';
xLng['20'] = 'Könyvjelzõk mutatása';
xLng['U.2'] = 'Nép';
xLng['1'] = "Travian v2.x kiszolgáló";
xLng['SELECTALLTROOPS'] = "Minden egység kiválasztása";
xLng['PARTY'] = "Ünnepségek";
xLng['CPPERDAY'] = "KP/nap";
xLng['SLOT'] = "Hely";
xLng['TOTAL'] = "Teljes";
xLng['SELECTSCOUT'] = "Kémek kiválasztása";
xLng['SELECTFAKE'] = "Fake kiválasztása";
xLng['NOSCOUT2FAKE'] = "Nem használhatsz kémeket fake támadásra!";
xLng['NOTROOP2FAKE'] = "Nincsenek egységek fake támadáshoz!";
xLng['NOTROOP2SCOUT'] = "Nincsenek egységek kémleléshez!";
xLng['NOTROOPS'] = "Nincsenek egységek a faluban!";
xLng['ALL'] = "Mind";
xLng['SH2'] = "A színeket így add meg:<br>- green vagy red vagy  orange stb.<br>- vagy HEX színkóddal #004523<br>- hagyd üresen az alapértelmezett színhez";
xLng['SHOWORIGREPORT'] = "Eredeti jelentés (küldéshez)";
xLng['56'] = "Mezõ-típus, oázis infó mutatása<br>az egérmutató alatt";
xLng['10'] = "Harcszimulátor link:<br>(bal oldali menü)";
xLng['WARSIMOPTION1'] = "Beépített";
xLng['WARSIMOPTION2'] = "Külsõ (kirilloid.ru által)";
xLng['27'] = "World Analyser választása";
xLng['28'] = "Linkek a statisztika elemzõhöz";
xLng['NONEWVER'] = "A legújabb verziót használod";
xLng['BVER'] = "Lehet hogy BETA verziód van";
xLng['NVERAV'] = "A szkript új verziója elérhetõ";
xLng['UPDATESCRIPT'] = "Frissíted most?";
xLng['CHECKUPDATE'] = "Szkript-frissítés keresése.<br>Kérlek várj...";
xLng['CROPFINDER'] = "Búzakeresõ";
xLng['AVPOPPERVIL'] = "Falunkénti átlag népesség";
xLng['AVPOPPERPLAYER'] = "Játékosonkénti átlag népesség";
xLng['37'] = "Külterület fejlesztési táblája";
xLng['41'] = "Épületek fejlesztési táblája";
xLng['69'] = "Konzol naplózási szint<br>CSAK PROGRAMOZÓKNAK VAGY HIBAKERESÉSHEZ<br>(Alap = 0)";
xLng['48'] = "Piaci ajánlatoknál több oldal elõre betöltése<br>A Piac -Vásárlás- oldalán<br>(Alap = 1)";
xLng['U.3'] = 'Fõfalud neve<br><a href="spieler.php">Nézd meg a profilodat a frissítéshez</a>';
xLng['U.6'] = 'Fõfalud koordinátái<br><a href="spieler.php">Nézd meg a profilodat a frissítéshez</a>';
xLng['TOTALTROOPSTRAINING'] = 'Összes kiképzés alatt álló egység';
xLng['57'] = 'Távolság/idõ mutatása';
xLng['TBSETUPLINK'] = TB3O.shN + ' Beállítások';
xLng['UPDATEALLVILLAGES'] = 'Minden falu frissítése. HASZNÁLD ÓVATOSAN, TILTÁS JÁRHAT ÉRTE!';
xLng['9'] = "További linkek bal oldalon<br>(Traviantoolbox, World Analyser, Travilog, Térkép, stb.)";
xLng['LARGEMAP'] = 'Nagy térkép';
xLng['USETHEMPR'] = 'Arányos elosztás';
xLng['USETHEMEQ'] = 'Egyenlõ elosztás';
xLng['TOWNHALL'] = 'Tanácsháza';
xLng['GAMESERVERTYPE'] = 'Játék kiszolgáló';
xLng['ACCINFO'] = 'Felhasználó információ';
xLng['NOTEBLOCKOPTIONS'] = 'Jegyzettömb';
xLng['MENULEFT'] = 'Baloldali menü';
xLng['STATISTICS'] = 'Statisztikák';
xLng['RESOURCEFIELDS'] = 'Külterület';
xLng['VILLAGECENTER'] = 'Faluközpont';
xLng['MAPOPTIONS'] = 'Térkép beállítások';
xLng['COLOROPTIONS'] = 'Szín beállítások';
xLng['DEBUGOPTIONS'] = 'Hibakeresési beállítások';
xLng['4'] = 'Piac';
xLng['5'] = 'Gyülekezõtér/Kaszárnya/Mûhely/Istálló';
xLng['6'] = "Tanácsháza/Hõsök háza/Páncélkovács/Fegyverkovács";
xLng['HEROSMANSION'] = "Hõsök háza";
xLng['BLACKSMITH'] = 'Fegyverkovács';
xLng['ARMOURY'] = 'Páncélkovács';
xLng['NOW'] = 'Most';
xLng['CLOSE'] = 'Bezárás';
xLng['USE'] = 'Használat';
xLng['USETHEM1H'] = 'Egy órai termelés';
xLng['OVERVIEW'] = 'Áttekintés';
xLng['FORUM'] = 'Fórum';
xLng['ATTACKS'] = 'Támadások';
xLng['NEWS'] = 'Hírek';
xLng['ADDCRTPAGE'] = 'Jelenlegi hozzáadása';
xLng['SCRPURL'] = 'TBeyond oldal';
xLng['50'] = 'Kémek száma a<br>"Kémek választása" funkcióhoz';
xLng['SPACER'] = 'Elválasztó';
xLng['53'] = 'Egység információ mutatása gyorstippben';
xLng['MESREPOPTIONS'] = 'Üzenetek & Jelentések';
xLng['59'] = 'Üzenetek/jelentések elõre betöltött oldalainak száma<br>(Default = 1)';
xLng['ATTABLES'] = 'Egység tábla';
xLng['MTW'] = 'Elpazarolva';
xLng['MTX'] = 'Meghaladja';
xLng['MTC'] = 'Jelenlegi rakomány';
xLng['ALLIANCEFORUMLINK'] = 'Link külsõ fórumhoz<br>(belsõhöz hagyd üresen)';
xLng['82.L'] = 'Könyvjelzõk lezárása (Törlés és mozgatás ikonok eltüntetése)';
xLng['MTCL'] = 'Mindet törölni';
xLng['82.U'] = 'Könyvjelzõk feloldása (Törlés és mozgatás ikonok mutatása)';
xLng['CLICKSORT'] = 'Rendezéshez kattints';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Minden faluhoz menteni';
xLng['VILLAGELIST'] = 'Falu lista';
xLng['12'] = "'dorf1.php' és 'dorf2.php' linkek mutatása";
xLng['UPDATEPOP'] = 'Népesség frissítése';
xLng['54'] = 'Távolság és idõ mutatása falvakhoz';
xLng['EDIT'] = 'Szerkesztés';
xLng['NPCOPTIONS'] = 'NPC segítõ beállításai';
xLng['26'] = 'NPC segítõ számítások és linkek mutatása';
xLng['58'] = 'Játékosok/falvak/oázisok mutatása a térképnél';
xLng['NEWVILLAGEAV'] = 'Dátum/Idõ';
xLng['TIMEUNTIL'] = 'Várakozás';
xLng['61'] = '"Mindet törölni" mutatása a jelentésekhez';
xLng['62'] = '"Üzenet küldése" mutatása magam részére is';
xLng['CENTERMAP'] = 'Térkép középpontjába ezt a falut';
xLng['13'] = 'Mutasd a "Térkép központosítása" ikont';
xLng['SENDTROOPS'] = 'Egységek kiküldése';
xLng['64'] = 'Jelentés statisztika részletezése';
xLng['7'] = "Palota/Rezidencia/Akadémia/Kincstár";
xLng['PALACE'] = "Palota";
xLng['RESIDENCE'] = "Rezidencia";
xLng['ACADEMY'] = "Akadémia";
xLng['TREASURY'] = "Kincstár";
xLng['45'] = "Villogó szintjelzés az éppen fejlesztett épületekhez";
xLng['60'] = 'Linkek az üzenetek felugró ablakban mutatásához';
break;
case "no":
//by ThePirate
xLng['8'] = 'Allianse';
xLng['SIM'] = 'Kamp-simulator';
xLng['QSURE'] = 'Er du sikker?';
xLng['LOSS'] = 'Tap';
xLng['PROFIT'] = 'Profit';
xLng['EXTAV'] = 'Utvidelse tilgjengelig';
xLng['PLAYER'] = 'Spiller';
xLng['VILLAGE'] = 'By';
xLng['POPULATION'] = 'Befolknong';
xLng['COORDS'] = 'Koordinater';
xLng['MAPTBACTS'] = 'Handlinger';
xLng['SAVED'] = 'Lagret';
xLng['YOUNEED'] = 'Du trenger';
xLng['TODAY'] = 'idag';
xLng['TOMORROW'] = 'imorgen';
xLng['DAYAFTERTOM'] = 'dagen etter imorgen';
xLng['MARKET'] = 'Markedsplass';
xLng['BARRACKS'] = 'Kaserne';
xLng['RALLYPOINT'] = 'Møteplass';
xLng['STABLE'] = 'Stall';
xLng['WORKSHOP'] = 'Verksted';
xLng['SENDRES'] = 'Send ressurser';
xLng['BUY'] = 'Kjøp';
xLng['SELL'] = 'Selg';
xLng['SENDIGM'] = 'Send IGM';
xLng['LISTO'] = 'Kan bygges';
xLng['ON'] = 'den';
xLng['AT'] = 'klokken';
xLng['EFICIENCIA'] = 'Effektivitet';
xLng['NEVER'] = 'Aldri';
xLng['ALDEAS'] = 'By(er)';
xLng['TIEMPO'] = 'Tid';
xLng['OFREZCO'] = 'Tilbyr';
xLng['BUSCO'] = 'Leter etter';
xLng['TIPO'] = 'Type';
xLng['DISPONIBLE'] = 'Kun tigjengelig';
xLng['CUALQUIERA'] = 'Alle';
xLng['YES'] = 'Ja';
xLng['NO'] = 'Nei';
xLng['LOGIN'] = 'Logg inn';
xLng['MARCADORES'] = 'Bokmerker';
xLng['ANYADIR'] = 'Legg til';
xLng['UBU'] = 'Nytt bokmerke URL';
xLng['UBT'] = 'Nytt nokmerke Text';
xLng['ELIMINAR'] = 'Slett';
xLng['MAPA'] = 'Kart';
xLng['MAXTIME'] = 'Maximum tid';
xLng['ARCHIVE'] = 'Arkiv';
xLng['SUMMARY'] = 'Resume';
xLng['TROPAS'] = 'Tropper';
xLng['CHKSCRV'] = 'Oppdater TBeyond';
xLng['ACTUALIZAR'] = 'Oppdater by-informasjon';
xLng['VENTAS'] = 'Lagrede tilbud';
xLng['MAPSCAN'] = 'Scan Kartet';
xLng['BIGICONS'] = 'Vis utvidede iconer';
xLng['22'] = 'Vis notatblokk';
xLng['SAVE'] = 'Lagre';
xLng['49'] = 'Møteplass standard handling ';
xLng['AT2'] = 'Forsterkninger';
xLng['AT3'] = 'Angrep: Normalt';
xLng['AT4'] = 'Angrep: Plyndringstokt';
xLng['24'] = 'Notisblokk størrelse';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normal (Liten)';
xLng['NBSIZEBIG'] = 'Større';
xLng['25'] = 'Notisblokk høyde';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automatisk utvid høyde';
xLng['NBKEEPHEIGHT'] = 'Standard høyde';
xLng['43'] = 'Vis bygnings nivå';
xLng['NPCSAVETIME'] = 'Lagre: ';
xLng['38'] = 'Vi farge på ressurs nivået';
xLng['44'] = 'Vis bygnings nivå farger';
xLng['65'] = 'Farge utvidelse tilgjengelig<br>(Standard = Tom)';
xLng['66'] = 'Farge maksimalt nivål<br>(Standard = Tom)';
xLng['67'] = 'Farge utvidelse ikke tilgjengelig<br>(Standard = Tom)';
xLng['68'] = 'Farge utvidelse via NPC<br>(Standard = Tom)';
xLng['TOTALTROOPS'] = 'Totale tropper i byen';
xLng['20'] = 'Vis bokmerker';
xLng['U.2'] = 'Stamme';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Velg alle tropper";
xLng['PARTY'] = "Fester";
xLng['CPPERDAY'] = "KP/dag";
xLng['SLOT'] = "Utvidelse";
xLng['TOTAL'] = "Totalt";
xLng['SELECTSCOUT'] = "Velg scout";
xLng['SELECTFAKE'] = "Velg fake";
xLng['NOSCOUT2FAKE'] = "Det er umulig å bruke scouts til et fake angrep !";
xLng['NOTROOP2FAKE'] = "Det er ikke nok tropper til et fake angrep !";
xLng['NOTROOP2SCOUT'] = "Det er ikke nok tropper til å scoute med !";
xLng['NOTROOPS'] = "Det er ikke noen tropper i byen !";
xLng['ALL'] = "Alle";
xLng['SH2'] = "I farge-felt kan du skrive:<br>- <b>green</b> eller <b>red</b> eller  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
xLng['SHOWORIGREPORT'] = "Vis orginal rapport (for posting)";
xLng['56'] = "Vis rute/oase type<br>ved musepekeren over kartet";
xLng['10'] = "Kampsimulator link:<br>(menyen til venstre)";
xLng['28'] = "Show analyser statistic links";
xLng['NONEWVER'] = "Du har den siste versjonen tilgjengelig";
xLng['BVER'] = "Du har kansje en beta versjon";
xLng['NVERAV'] = "En ny versjon er tilgjengelig";
xLng['UPDATESCRIPT'] = "Oppdatere nå ?";
xLng['CHECKUPDATE'] = "Leter etter script oppdatering.<br>Venligst vent...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Gjennomsnittlig befolkning per by";
xLng['AVPOPPERPLAYER'] = "Gjennomsnittlig befolkning per spiller";
xLng['37'] = "Vis utvidelseshjelp for ressursfelt";
xLng['41'] = "Vis utvidelseshjelp for bygninger";
xLng['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0)";
xLng['48'] = "Mengde av 'tilbyr' sider som skal lastes<br>i 'Marked => Kjøp' side<br>(Standard = 1)";
xLng['U.3'] = 'Navn på din hovedby<br><b>Ikke endre på dette, besøk profilen din!</b>';
xLng['U.6'] = 'Koordinater til hovedbyen din<br><b>Ikke endre på dette, besøk profilen din!</b>';
xLng['TOTALTROOPSTRAINING'] = 'Total troppe utviklings tid';
xLng['57'] = 'Vis avstand og tid';
xLng['UPDATEALLVILLAGES'] = 'Oppdater alle byer.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
xLng['9'] = 'Vis flere lenker i menyen til venstre<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)';
xLng['LARGEMAP'] = 'Stort kart';
break;
case "si":
//by BmW
xLng['8'] = 'Aliansa';
xLng['SIM'] = 'Simulator bitk';
xLng['QSURE'] = 'Ali ste prepričani?';
xLng['LOSS'] = 'Izguba';
xLng['PROFIT'] = 'Profit';
xLng['EXTAV'] = 'Nadgradnja možna';
xLng['PLAYER'] = 'Igralec';
xLng['VILLAGE'] = 'Naselbine';
xLng['POPULATION'] = 'Populacija';
xLng['COORDS'] = 'Koordinate';
xLng['MAPTBACTS'] = 'Možnosti';
xLng['SAVED'] = 'Shranjeno';
xLng['YOUNEED'] = 'Manjka';
xLng['TODAY'] = 'Danes';
xLng['TOMORROW'] = 'Jutri';
xLng['DAYAFTERTOM'] = 'Pojutrišnjem';
xLng['MARKET'] = 'Tržnica';
xLng['BARRACKS'] = 'Barake';
xLng['RALLYPOINT'] = 'Zbirališče';
xLng['STABLE'] = 'Konjušnica';
xLng['WORKSHOP'] = 'Izdelovalec oblegovalnih naprav';
xLng['SENDRES'] = 'Pošlji surovine';
xLng['BUY'] = 'Kupi';
xLng['SELL'] = 'Ponudi';
xLng['SENDIGM'] = 'Pošlji sporočilo';
xLng['LISTO'] = 'Dovolj';
xLng['ON'] = '';
xLng['AT'] = 'ob';
xLng['EFICIENCIA'] = 'Izkoristek';
xLng['NEVER'] = 'Nikoli';
xLng['ALDEAS'] = 'Vas(i)';
xLng['TIEMPO'] = 'Čas';
xLng['OFREZCO'] = 'Ponuja';
xLng['BUSCO'] = 'Išče';
xLng['TIPO'] = 'Tip';
xLng['DISPONIBLE'] = 'Samo možne ponudbe';
xLng['CUALQUIERA'] = 'Karkoli';
xLng['YES'] = 'Da';
xLng['NO'] = 'Ne';
xLng['LOGIN'] = 'Prijava';
xLng['MARCADORES'] = 'Povezave';
xLng['ANYADIR'] = 'Dodaj';
xLng['UBU'] = 'Cilj povezave';
xLng['UBT'] = 'Ime povezave';
xLng['ELIMINAR'] = 'Izbriši';
xLng['MAPA'] = 'Zemljevid';
xLng['MAXTIME'] = 'Maksimalen čas';
xLng['ARCHIVE'] = 'Arhiv';
xLng['SUMMARY'] = 'Pregled';
xLng['TROPAS'] = 'Enote';
xLng['CHKSCRV'] = 'Posodobi skripto';
xLng['ACTUALIZAR'] = 'Posodobi informacije o naseljih';
xLng['VENTAS'] = 'Shranjene ponudbe';
xLng['MAPSCAN'] = 'Preglej mapo';
xLng['BIGICONS'] = 'Dodatne ikone';
xLng['22'] = 'Prikaži beležko';
xLng['SAVE'] = 'Shrani';
xLng['49'] = 'Privzeta izbira Zbirališča';
xLng['AT2'] = 'Okrepitve';
xLng['AT3'] = 'Napad:  Polni napad';
xLng['AT4'] = 'Napad:  Roparski pohod';
xLng['24'] = 'Velikost';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normalna (majhna)';
xLng['NBSIZEBIG'] = 'Velik zaslon (velika)';
xLng['25'] = 'Višina';
xLng['NBAUTOEXPANDHEIGHT'] = 'Samodejno prilagajaj velikost';
xLng['NBKEEPHEIGHT'] = 'Privzeta višina';
xLng['43'] = 'Stopnje';
xLng['NPCSAVETIME'] = 'Prihrani: ';
xLng['38'] = 'Barvne stopnje';
xLng['44'] = 'Barvne stopnje';
xLng['65'] = 'Barva: Nadgradnja možna<br>(Prazno = privzeto)';
xLng['66'] = 'Barva: Najvišja stopnja<br>(Prazno = privzeto)';
xLng['67'] = 'Barva: Nadgradnja ni možna<br>(Prazno = privzeto)';
xLng['68'] = 'Barva: Nadgradnja možna preko NPC Trgovanja<br>(Prazno = privzeto)';
xLng['TOTALTROOPS'] = 'Skupno število enot';
xLng['20'] = 'Prikaži povezave';
xLng['U.2'] = 'Pleme';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Vse enote";
xLng['PARTY'] = "Festivali";
xLng['CPPERDAY'] = "KT/Dan";
xLng['SLOT'] = "Reže";
xLng['TOTAL'] = "Vsota";
xLng['SELECTSCOUT'] = "Skavti";
xLng['SELECTFAKE'] = "Fake";
xLng['NOSCOUT2FAKE'] = "Ni mogoče poslati skavtov kot fake napad";
xLng['NOTROOP2FAKE'] = "Ni dovolj enot za fake napad!";
xLng['NOTROOP2SCOUT'] = "Ni dovolj enot za poizvedbo!";
xLng['NOTROOPS'] = "V naselju ni enot!";
xLng['ALL'] = "Vse";
xLng['SH2'] = "V polja za barvo lahko vnesete:<br>- npr. green(zelena) ali red(rdeča) ali orange(oranžna)<br>- HEX kodo kot #004523<br>- pustite prazno za privzete barve";
xLng['SHOWORIGREPORT'] = "Prikaži originalno poročilo (za pošiljanje)";
xLng['56'] = "Prikaži tip polja/info oaze<br>med premikanjem miške po mapi";
xLng['10'] = "Simulator bitk:<br>(levi meni)";
xLng['WARSIMOPTION1'] = "Notranji (ponujen v igri)";
xLng['WARSIMOPTION2'] = "Zunanji (ponujen pri kirilloid.ru)";
xLng['27'] = "Uporabi World Analyser";
xLng['28'] = "Povezave Analyser statistike";
xLng['NONEWVER'] = "Skripte ni treba posodobiti";
xLng['BVER'] = "Lahko, da imate beta različico";
xLng['NVERAV'] = "Nova različica skripte je na voljo";
xLng['UPDATESCRIPT'] = "Posodobi skripto";
xLng['CHECKUPDATE'] = "Preverjam za posodobitev.<br>Prosim počakajte...";
xLng['CROPFINDER'] = "Iskalec Žita";
xLng['AVPOPPERVIL'] = "Povprečna populacija naselja";
xLng['AVPOPPERPLAYER'] = "Povprečna populacija igralca";
xLng['37'] = "Tabela nadgradenj";
xLng['41'] = "Tabela nadgradenj";
xLng['69'] = "Konzola (Za stopnje)<br>SAMO ZA PROGRAMERJE ALI RAZHROŠČEVANJE<br>(Privzeto = 0)";
xLng['48'] = 'Število strani ponudb, ki se naj naložijo:<br>medtem ko ste na "Tržnici => Kupi" strani<br>(Privzeto = 1)';
xLng['U.3'] = 'Ime metropole';
xLng['U.6'] = 'Koordinate metropole';
xLng['MAX'] = 'Maksimalno';
xLng['TOTALTROOPSTRAINING'] = 'Skupno število enot v postopku';
xLng['57'] = 'Razdalje in časi';
xLng['TBSETUPLINK'] = TB3O.shN + 'Nastavitve';
xLng['UPDATEALLVILLAGES'] = 'Osveži vsa naselja.';
xLng['9'] = 'Dodatne povezave v levem meniju<br>(Traviantoolbox, World Analyser, Travilog, Map.)';
xLng['LARGEMAP'] = 'Velik zemljevid';
xLng['USETHEMPR'] = 'Uporabi (izmenično)';
xLng['USETHEMEQ'] = 'Uporabi (enako)';
xLng['TOWNHALL'] = 'Mestna hiša';
xLng['GAMESERVERTYPE'] = 'Tip Serverja';
xLng['ACCINFO'] = 'Informacije o računu';
xLng['NOTEBLOCKOPTIONS'] = 'Beležka';
xLng['MENULEFT'] = 'Meni na levi strani';
xLng['STATISTICS'] = 'Statistika';
xLng['RESOURCEFIELDS'] = 'Surovinska polja';
xLng['VILLAGECENTER'] = 'Center naselja';
xLng['MAPOPTIONS'] = 'Možnosti zemljevida';
xLng['COLOROPTIONS'] = 'Barve';
xLng['DEBUGOPTIONS'] = 'Možnosti razhroščevanja';
xLng['4'] = 'Tržnica';
xLng['5'] = 'Zbirališče/Barake/Konjušnica/Izdelovalec oblegovalnih naprav';
xLng['6'] = 'Mestna hiša/Herojeva residenca<br>Izdelovalec oklepov/Izdelovalec orožja';
xLng['HEROSMANSION'] = 'Herojeva residenca';
xLng['BLACKSMITH'] = 'Izdelovalec orožja';
xLng['ARMOURY'] = 'Izdelovalec oklepov';
xLng['NOW'] = 'Sedaj';
xLng['CLOSE'] = 'Zapri';
xLng['USE'] = 'Uporabi';
xLng['USETHEM1H'] = 'Uporabi (1 urna proizvodnja)';
xLng['OVERVIEW'] = 'Pregled';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Napadi';
xLng['NEWS'] = 'Novice';
xLng['ADDCRTPAGE'] = 'Dodaj trenutno stran';
xLng['SCRPURL'] = 'TBeyond stran';
xLng['50'] = 'Število skavtov za "Skavti" funkcijo';
xLng['SPACER'] = 'Ločilna črta';
xLng['53'] = 'Prikaži informacije o enoti, ki je v vasi<br>(Ko greste z miško na enoto)';
xLng['MESREPOPTIONS'] = 'Sporočila in Poročila';
xLng['59'] = 'Število strani Sporočil/Poročil, ki se naj naložijo<br>(Privzeto = 1)';
xLng['ATTABLES'] = 'Tabela enot';
xLng['MTW'] = 'Ostane';
xLng['MTX'] = 'Preseženo';
xLng['MTC'] = 'Skupaj';
xLng['ALLIANCEFORUMLINK'] = 'Povezava do zunanjega Foruma<br>(Pusti prazno za notranji Forum)';
xLng['MTCL'] = 'Počisti vse';
xLng['82.L'] = 'Zakleni povezave';
xLng['82.U'] = 'Odkleni povezave';
xLng['CLICKSORT'] = 'Razvrsti';
xLng['MIN'] = 'Minimalno';
xLng['SAVEGLOBAL'] = 'Shrani za vse vasi';
xLng['VILLAGELIST'] = 'Naselja';
xLng['12'] = "Prikaži 'dorf1' in 'dorf2' povezave";
xLng['UPDATEPOP'] = 'Posodobi populacijo';
xLng['54'] = 'Razdalje in časi do vasi';
xLng['EDIT'] = 'Uredi';
xLng['NPCOPTIONS'] = 'Možnosti NPC trgovanja';
xLng['26'] = 'NPC izračune/povezave';
xLng['NEWVILLAGEAV'] = 'Nova vas';
xLng['58'] = 'Tabela Igralcev/Vasi/Okupiranih pokrajin';
xLng['NEWVILLAGEAV'] = 'Datum/Čas';
xLng['TIMEUNTIL'] = 'Čas čakanja';
xLng['61'] = '"Izbriši Vse" tabela na strani poročil';
xLng['62'] = '"Pošlji IGM" ikona tudi za mene';
xLng['CENTERMAP'] = 'Centriraj zemljevid';
xLng['13'] = '"Centriraj zemljevid" ikona';
xLng['SENDTROOPS'] = 'Pošlji enote';
xLng['64'] = 'Podrobnosti pri poročilih';
xLng['7'] = "Palača/Rezidenca/Akademija/Zakladnica";
xLng['PALACE'] = "Palača";
xLng['RESIDENCE'] = "Rezidenca";
xLng['ACADEMY'] = "Akademija";
xLng['TREASURY'] = "Zakladnica";
xLng['45'] = "Utripanje stopenj zgradb, ki se nadgrajujejo";
xLng['UPGTABLES'] = "Tabele surovinskih polj/zgradb";
xLng['34'] = "Prikaži KT/Dan v tabeli nadgradenj";
xLng['35'] = "Poraba žita v tabeli nadgradenj";
xLng['14'] = "Prikaži ikone 'Pošlji enote/Pošlji surovine' v tabeli naselij";
xLng['16'] = "Efektivna proizvodnja žita v tabeli naselij";
xLng['RESBARTABLETITLE'] = "Diagram surovin";
xLng['39'] = "'Diagram surovin' tabela";
xLng['40'] = "'Diagram surovin' tabela kot plavajoče okno";
xLng['21'] = "'Zaznamki' kot kot plavajoče okno";
xLng['23'] = "'Beležka' as kot plavajoče okno";
xLng['17'] = "Populacija v listi naselij";
xLng['29'] = 'Uporabi Map Analyser';
xLng['30'] = 'Povezave do mape za uporabnike';
xLng['31'] = 'Povezave do mape za alianse';
xLng['63'] = 'Napredna TB3 poročila';
xLng['60'] = 'Ikona za odpiranje sporočil v novem oknu (Pop-up)';
xLng['18'] = 'Dodatna (stolpca) v listi naselij kot plavajoče okno';
xLng['42'] = 'Razporedi zgradbe po imenu v tabeli nadgradenj';
xLng['19'] = 'Prikaži informacije o zgradbah in premikanju enot<br>v listi naselij';
xLng['32'] = "Prikaži 'Iskanje'";
xLng['3'] = 'Vsili T3.1 kapaciteto za Legionarje in Falange<br>(za različne T3.1 in T3.5 serverje)';
xLng['33'] = "'Iskalnik' kot plavajoče okno";
xLng['36'] = "'Dokler/Ostanek' v tabelah nadgradi/uri";
xLng['RESIDUE'] = 'Ostanek, če zgradiš';
xLng['RESOURCES'] = 'Surovine';
xLng['2'] = 'Odstrani reklame';
xLng['SH1'] = "Odpri Profil za samodejno odkrvanje metropole/koordinat<br>Zgradite Barake za samodejno odkrivanje plemena in potem odprite Center naselja";
xLng['46'] = "Dodatne informacije za vsakega prihajajočega trgovca";
break;
case "tw":
case "hk":
//by MarioCheng & chihsun
xLng['8'] = '聯盟';
xLng['SIM'] = '戰鬥模擬器';
xLng['QSURE'] = '是否確定?';
xLng['LOSS'] = '損失';
xLng['PROFIT'] = '獲益';
xLng['EXTAV'] = '已可升級!';
xLng['PLAYER'] = '玩家';
xLng['VILLAGE'] = '村莊';
xLng['POPULATION'] = '人口';
xLng['COORDS'] = '座標';
xLng['MAPTBACTS'] = '行動';
xLng['SAVED'] = '儲存';
xLng['YOUNEED'] = '您要';
xLng['TODAY'] = '今天';
xLng['TOMORROW'] = '明天';
xLng['DAYAFTERTOM'] = '後天';
xLng['MARKET'] = '市場';
xLng['BARRACKS'] = '兵營';
xLng['RALLYPOINT'] = '集結點';
xLng['STABLE'] = '馬廄';
xLng['WORKSHOP'] = '工場';
xLng['SENDRES'] = '運送資源';
xLng['BUY'] = '買進';
xLng['SELL'] = '賣出';
xLng['SENDIGM'] = '發送IGM';
xLng['LISTO'] = '升級可於';
xLng['ON'] = '-';
xLng['AT'] = '-';
xLng['EFICIENCIA'] = '效率';
xLng['NEVER'] = '永不';
xLng['ALDEAS'] = '村莊';
xLng['TIEMPO'] = '時間';
xLng['OFREZCO'] = '提供';
xLng['BUSCO'] = '搜索';
xLng['TIPO'] = '比例';
xLng['DISPONIBLE'] = '忽略過少物資';
xLng['CUALQUIERA'] = '所有';
xLng['YES'] = '是';
xLng['NO'] = '否';
xLng['LOGIN'] = '登入';
xLng['MARCADORES'] = '書籤';
xLng['ANYADIR'] = '加入';
xLng['UBU'] = '新書籤網址';
xLng['UBT'] = '新書籤標題(只限英文及數字)';
xLng['ELIMINAR'] = '刪除';
xLng['MAPA'] = '地圖 (TravMap)';
xLng['MAXTIME'] = '最大運輸時間';
xLng['ARCHIVE'] = '儲存';
xLng['SUMMARY'] = '概要';
xLng['TROPAS'] = '軍隊';
xLng['CHKSCRV'] = '檢查版本更新';
xLng['ACTUALIZAR'] = '更新此村莊的資料';
xLng['VENTAS'] = '賣出紀錄';
xLng['MAPSCAN'] = '搜尋此地圖';
xLng['BIGICONS'] = '顯示更多快捷圖示';
xLng['22'] = '顯示筆記欄';
xLng['SAVE'] = '儲存';
xLng['49'] = '集結點的預設行動';
xLng['AT2'] = '增援';
xLng['AT3'] = '攻擊：正常';
xLng['AT4'] = '攻擊：搶奪';
xLng['24'] = '筆記欄大小';
xLng['NBSIZEAUTO'] = '自動';
xLng['NBSIZENORMAL'] = '普通 (細)';
xLng['NBSIZEBIG'] = '大畫面 (大)';
xLng['25'] = '筆記欄高度';
xLng['NBAUTOEXPANDHEIGHT'] = '自動變更高度';
xLng['NBKEEPHEIGHT'] = '固定高度';
xLng['43'] = '顯示建築物等級';
xLng['NPCSAVETIME'] = '儲存資源需時：';
xLng['38'] = '顯示資源田等級顏色';
xLng['44'] = '顯示建築物等級顏色';
xLng['65'] = '已可升級的顏色<br>(預設 = 空白)';
xLng['66'] = '已達最高等級的顏色<br>(預設 = 空白)';
xLng['67'] = '不可升級的顏色<br>(預設 = 空白)';
xLng['68'] = '可利用NPC交易來升級的顏色<br>(預設 = 空白)';
xLng['TOTALTROOPS'] = '此村莊的軍隊總數';
xLng['20'] = '顯示書籤';
xLng['U.2'] = '種族';
xLng['1'] = "Travian v2.x 伺服器";
xLng['SELECTALLTROOPS'] = "選取全部士兵";
xLng['PARTY'] = "慶祝";
xLng['CPPERDAY'] = "文明點（每天）";
xLng['SLOT'] = "擴展量";
xLng['TOTAL'] = "總數";
xLng['SELECTSCOUT'] = "選取偵察軍隊";
xLng['SELECTFAKE'] = "選取佯攻軍隊";
xLng['NOSCOUT2FAKE'] = "無法使用偵察軍種來發出佯攻!";
xLng['NOTROOP2FAKE'] = "沒有軍隊可以發出佯攻!";
xLng['NOTROOP2SCOUT'] = "沒有偵察軍隊!";
xLng['NOTROOPS'] = "此村莊無軍隊!";
xLng['ALL'] = "全部";
xLng['SH2'] = "在欄位中，可以輸入：<br>- green 或 red 或 orange, 等等...<br>- 或是輸入顏色的16進制碼，如 #004523<br>- 也可以保留空白來使用預設顏色";
xLng['SHOWORIGREPORT'] = "顯示原始的報告 (給張貼用)";
xLng['56'] = "當滑鼠移到時<br>顯示村莊種類或綠洲資料";
xLng['10'] = "左側選單的戰鬥模擬器連結";
xLng['WARSIMOPTION1'] = "內置 (由遊戲所提供)";
xLng['WARSIMOPTION2'] = "外連 (由kirilloid.ru提供)";
xLng['27'] = "選取世界分析網站";
xLng['28'] = "在玩家名稱右側顯示分析連結";
xLng['NONEWVER'] = "您正在使用最新版本";
xLng['BVER'] = "目前正在使用測試版";
xLng['NVERAV'] = "目前已有更新的版本，";
xLng['UPDATESCRIPT'] = "是否需要更新？";
xLng['CHECKUPDATE'] = "正在檢查程式更新，請稍候...";
xLng['CROPFINDER'] = "搜田工具";
xLng['AVPOPPERVIL'] = "平均每村人口";
xLng['AVPOPPERPLAYER'] = "平均每玩家人口";
xLng['37'] = "顯示全資源田升級表單";
xLng['41'] = "顯示全建築物升級表單";
xLng['69'] = "程式記錄等級<br>只適用於程式開發員 或 除蟲工作<br>(預設 = 0)";
xLng['48'] = "預先載入的頁數<br>'市場 → 買進' 的頁面中<br>(預設 = 1, 最多 = 5)";
xLng['U.3'] = '您村莊的名稱<br>請瀏覽個人資料來進行自動更新，不要手動修改此欄';
xLng['U.6'] = '您村莊的坐標<br>請瀏覽個人資料來進行自動更新，不要手動修改此欄';
xLng['MAX'] = '最多';
xLng['TOTALTROOPSTRAINING'] = '所有正在訓練的士兵';
xLng['57'] = '顯示距離及時間';
xLng['TBSETUPLINK'] = '設定 TBeyond ML&CN';
xLng['UPDATEALLVILLAGES'] = '更新所有村莊資料。(有機會導致被鎖帳號)';
xLng['9'] = "在左側選單中顯示更多連結<br>(Traviantoolbox, World Analyser, Travilog, Map, 等等.)";
xLng['LARGEMAP'] = '大地圖';
xLng['USETHEMPR'] = '派出所有商人 (按資源比例分配)';
xLng['USETHEMEQ'] = '派出所有商人 (平均分配)';
xLng['TOWNHALL'] = '村會堂';
xLng['GAMESERVERTYPE'] = '遊戲伺服器';
xLng['ACCINFO'] = '帳號資料';
xLng['NOTEBLOCKOPTIONS'] = '筆記欄';
xLng['MENULEFT'] = '左側選單';
xLng['STATISTICS'] = '統計';
xLng['RESOURCEFIELDS'] = '資源田';
xLng['VILLAGECENTER'] = '城鎮中心';
xLng['MAPOPTIONS'] = '地圖設定';
xLng['COLOROPTIONS'] = '顏色設定';
xLng['DEBUGOPTIONS'] = '除蟲設定';
xLng['4'] = '市場';
xLng['5'] = '集結點/兵營/工場/馬廄';
xLng['6'] = "村會堂/英雄宅/鐵匠/盔甲廠";
xLng['HEROSMANSION'] = "英雄宅";
xLng['BLACKSMITH'] = "鐵匠";
xLng['ARMOURY'] = "盔甲廠";
xLng['NOW'] = '現在';
xLng['CLOSE'] = '關閉';
xLng['USE'] = '送出';
xLng['USETHEM1H'] = '派出所有商人 (資源1小時產量)';
xLng['OVERVIEW'] = '概要';
xLng['FORUM'] = '論壇';
xLng['ATTACKS'] = '攻擊';
xLng['NEWS'] = '新聞';
xLng['ADDCRTPAGE'] = '加入此頁';
xLng['SCRPURL'] = 'TB ML&CN 官網';
xLng['50'] = '設定"選取偵察軍隊"時<br>預設派出的軍隊數量';
xLng['SPACER'] = '分隔線';
xLng['53'] = '在tooltip中顯示軍隊資料';
xLng['MESREPOPTIONS'] = '訊息和報告';
xLng['59'] = '預先載入的頁數<br> 訊息和報告 的頁面中<br>(預設 = 1, 最多 = 5)';
xLng['ATTABLES'] = '軍隊列表';
xLng['MTW'] = '浪費負載';
xLng['MTX'] = '超載量';
xLng['MTC'] = '目前總搬運量';
xLng['ALLIANCEFORUMLINK'] = '連結到自設聯盟論壇<br>(保留空白來使用預設聯盟論壇)';
xLng['82.L'] = '鎖定書籤 (隱藏 刪除, 移上, 移下的圖示)';
xLng['MTCL'] = '全部清除';
xLng['82.U'] = '解鎖書籤 (顯示 刪除, 移上, 移下的圖示)';
xLng['CLICKSORT'] = '點擊來排序';
xLng['MIN'] = '最少';
xLng['SAVEGLOBAL'] = '分享記錄到其他村莊';
xLng['VILLAGELIST'] = '村莊列表';
xLng['12'] = "在村莊旁顯示 'dorf1.php'和'dorf2.php'的圖示";
xLng['UPDATEPOP'] = '更新人口';
xLng['54'] = '在tooltip中顯示距離和時間';
xLng['EDIT'] = '編輯';
xLng['NPCOPTIONS'] = 'NPC交易選項';
xLng['26'] = '顯示NPC交易的連結和計算';
xLng['58'] = '在地圖顯示 玩家/村莊/綠洲 表單';
xLng['NEWVILLAGEAV'] = '日期/時間';
xLng['TIMEUNTIL'] = '需要等待的時間';
xLng['61'] = '在報告頁面顯示 "全部刪除" 表單';
xLng['62'] = '顯示 "發IGM給自己" 的圖示';
xLng['CENTERMAP'] = '將村莊在地圖置中';
xLng['13'] = "在村莊旁顯示 '地圖置中'的圖示";
xLng['SENDTROOPS'] = '派遣軍隊';
xLng['64'] = '顯示詳細戰鬥統計報告';
xLng['7'] = "皇宮/行宮/研究院/寶物庫";
xLng['PALACE'] = "皇宮";
xLng['RESIDENCE'] = "行宮";
xLng['ACADEMY'] = "研究院";
xLng['TREASURY'] = "寶物庫";
xLng['45'] = "閃爍顯示正在升級的建築";
xLng['14'] = "在村莊旁顯示 '集結點/運送資源'的圖示";
xLng['34'] = "在升級表單顯示 文明點資訊";
xLng['UPGTABLES'] = "資源田/建築物升級表單";
xLng['35'] = "在升級表單顯示 糧食消耗";
xLng['16'] = "在村莊旁顯示 有效糧產";
xLng['39'] = "顯示資源列表單";
xLng['RESBARTABLETITLE'] = "資源列";
xLng['34'] = "在升級表單顯示 文明點資訊";
xLng['UPGTABLES'] = "資源田/建築物升級表單";
xLng['35'] = "在升級表單顯示 糧食消耗";
xLng['16'] = "在村莊旁顯示 有效糧產";
xLng['RESBARTABLETITLE'] = "資源列";
xLng['39'] = "顯示資源列表單";
xLng['40'] = "在浮動視窗顯示資源列表單";
xLng['21'] = "在浮動視窗顯示書籤";
xLng['23'] = "在浮動視窗顯示筆記欄";
xLng['17'] = "在村莊旁顯示 村莊人口";
xLng['29'] = '選取地圖分析網站';
xLng['30'] = '在玩家名稱右側顯示分析連結';
xLng['31'] = '在聯盟名稱右側顯示分析連結';
xLng['63'] = '顯示強化的戰鬥報告';
xLng['18'] = '在浮動視窗顯示額外的村莊列表(兩列排序)';
xLng['60'] = '顯示以彈出視窗方式讀取IGM的連結';
xLng['3'] = '修正古羅馬步兵及方陣兵的負載量<br>(僅適用於混合 T3.1 & T3.5 的伺服器)';
xLng['18'] = '在浮動視窗顯示額外的村莊列表(兩列排序)';
xLng['60'] = '顯示以彈出視窗方式讀取IGM的連結';
xLng['42'] = '在升級表單顯示 以建築名稱排序的表單';
xLng['19'] = '在村莊旁顯示 建造中建築和軍隊移動的訊息';
xLng['32'] = "顯示 '搜尋列'";
xLng['33'] = "在浮動視窗顯示搜尋列";
xLng['36'] = "在升級表單顯示 建造時已存資源及建造後剩餘資源";
xLng['RESIDUE'] = '建造後剩餘資源';
xLng['RESOURCES'] = '建造時已存資源';
xLng['2'] = '移除廣告列';
xLng['SH1'] = "點擊玩家資料連結以取得首都相關資料<br>接著建造或點擊兵營以偵測種族，然後再開啟村莊大樓。";
xLng['46'] = "顯示每筆抵達商人的額外詳細資訊";
xLng['15'] = "在村莊旁顯示 木材、磚塊、鋼鐵的每小時產量";
xLng['11'] = "張貼戰鬥報告的網站連結";
break;
case "cn":
//by 独自疯狂 & congxz6688
xLng['8'] = '联盟';
xLng['SIM'] = '战斗模拟器';
xLng['QSURE'] = '你确定吗?';
xLng['LOSS'] = '损失';
xLng['PROFIT'] = '获益';
xLng['EXTAV'] = '可以升级!';
xLng['PLAYER'] = '玩家';
xLng['VILLAGE'] = '村庄';
xLng['POPULATION'] = '人口';
xLng['COORDS'] = '坐标';
xLng['MAPTBACTS'] = '行动';
xLng['SAVED'] = '已保存';
xLng['YOUNEED'] = '您要';
xLng['TODAY'] = '今天';
xLng['TOMORROW'] = '明天';
xLng['DAYAFTERTOM'] = '后天';
xLng['MARKET'] = '市场';
xLng['BARRACKS'] = '兵营';
xLng['RALLYPOINT'] = '集结点';
xLng['STABLE'] = '马厩';
xLng['WORKSHOP'] = '工场';
xLng['SENDRES'] = '运送资源';
xLng['BUY'] = '买';
xLng['SELL'] = '卖';
xLng['SENDIGM'] = '发送IGM';
xLng['LISTO'] = '需要等到';
xLng['ON'] = '-';
xLng['AT'] = '-';
xLng['EFICIENCIA'] = '效率';
xLng['NEVER'] = '仓位不足，无法实现';
xLng['ALDEAS'] = '村庄';
xLng['TIEMPO'] = '时间';
xLng['OFREZCO'] = '提供';
xLng['BUSCO'] = '搜索';
xLng['TIPO'] = '比例';
xLng['DISPONIBLE'] = '忽略过少物资';
xLng['CUALQUIERA'] = '所有';
xLng['YES'] = '是';
xLng['NO'] = '否';
xLng['LOGIN'] = '登入';
xLng['MARCADORES'] = '书签';
xLng['ANYADIR'] = '加入';
xLng['UBU'] = '新书签网址';
xLng['UBT'] = '新书签标题(只限英文及数字)';
xLng['MAXTIME'] = '最大运输时间';
xLng['ELIMINAR'] = '删除';
xLng['MAPA'] = 'TravMap';
xLng['CHKSCRV'] = '检查更新';
xLng['ARCHIVE'] = '保存';
xLng['SUMMARY'] = '概要';
xLng['TOTALTROOPS'] = '此村庄的士兵总数';
xLng['SELECTALLTROOPS'] = "选择全部士兵";
xLng['SELECTSCOUT'] = "选择侦察兵";
xLng['SELECTFAKE'] = "选择佯攻";
xLng['TOTAL'] = "总数";
xLng['AVPOPPERVIL'] = "平均每村人口";
xLng['AVPOPPERPLAYER'] = "平均每玩家人口";
xLng['PARTY'] = "活动";
xLng['CPPERDAY'] = "文明点（每天）";
xLng['SLOT'] = "扩张";
xLng['TROPAS'] = '军队';
xLng['AT2'] = '增援';
xLng['AT3'] = '攻击：普通';
xLng['AT4'] = '攻击：抢夺';
xLng['ALL'] = "全部";
xLng['CHECKUPDATE'] = "正在检查插件更新，请等等...";
xLng['NONEWVER'] = "你正在使用最新版本";
xLng['24'] = '笔记栏大小';
xLng['NBSIZEAUTO'] = '自动';
xLng['NBSIZENORMAL'] = '普通 (细)';
xLng['NBSIZEBIG'] = '大画面 (大)';
xLng['25'] = '笔记栏高度';
xLng['NBAUTOEXPANDHEIGHT'] = '高度自动伸展';
xLng['NBKEEPHEIGHT'] = '基本高度';
xLng['43'] = '显示建筑物等级';
xLng['NPCSAVETIME'] = '资源满足需时：';
xLng['38'] = '显示资源田等级颜色';
xLng['44'] = '显示建筑物等级颜色';
xLng['69'] = "控制台日志等级<br>只适用于程序开发员 或 BUG调试<br>(默认 = 0 or 空白)";
xLng['48'] = "页数预先加载<br>在 '市场 => 买入' 页面中<br>(默认 = 1 或 空白; 最多 = 5)";
xLng['65'] = '已可升级的颜色<br>(默认 = 空白)';
xLng['66'] = '已达最高等级的颜色<br>(默认 = 空白)';
xLng['67'] = '不可升级的颜色<br>(默认 = 空白)';
xLng['68'] = '可利用npc交易来升级的颜色<br>(默认 = 空白)';
xLng['20'] = '显示书签';
xLng['U.2'] = '种族';
xLng['1'] = "Travian v2.x 服务器";
xLng['U.3'] = '主村名称<br>请浏览自己的个人资料来进行自动更新，不要自己修改此栏';
xLng['U.6'] = '主村坐标<br>请浏览自己的个人资料来进行自动更新，不要自己修改此栏';
xLng['MAX'] = '最多';
xLng['CROPFINDER'] = "找田助手";
xLng['VENTAS'] = '卖出纪录';
xLng['SAVE'] = '保存';
xLng['49'] = '集结点的默认行动';
xLng['BIGICONS'] = '显示更多快捷图标';
xLng['22'] = '显示笔记栏';
xLng['SHOWORIGREPORT'] = "显示原始报告";
xLng['56'] = "当鼠标移到时<br>显示村庄种类或绿洲数据";
xLng['10'] = "左边选单的战斗模拟器链接";
xLng['WARSIMOPTION1'] = "内置 (由游戏所提供)";
xLng['WARSIMOPTION2'] = "外部 (由kirilloid.ru提供)";
xLng['27'] = "所选用的世界分析";
xLng['28'] = "在玩家名称右边显示分析链接";
xLng['37'] = "显示资源田升级信息";
xLng['41'] = "显示建筑物升级信息";
xLng['SH2'] = "在字段中，你可输入：<br>- green 或 red 或 orange, 等等...<br>- 也可输入颜色的16进制码，如 #004523<br>- 也可以什么也不填来用默认颜色";
xLng['NVERAV'] = "已有新版本插件推出了，";
xLng['UPDATESCRIPT'] = "要进行更新吗？";
xLng['MAPSCAN'] = '扫描此地图';
xLng['TOTALTROOPSTRAINING'] = '所有正在训练的士兵';
xLng['57'] = '显示距离及时间';
xLng['9'] = "在左边的选单显示更多链接<br>(Travilog,Traviantoolbox,TravMap,World Analyser等等.)";
xLng['TBSETUPLINK'] = 'TB设置';
xLng['UPDATEALLVILLAGES'] = '更新所有村庄。(有可能导致账号被锁)';
xLng['LARGEMAP'] = '大地图';
xLng['USETHEMPR'] = '派出所有商人 (按资源比例分配)';
xLng['USETHEMEQ'] = '派出所有商人 (平均分配)';
xLng['TOWNHALL'] = '市政厅';
xLng['GAMESERVERTYPE'] = '游戏服务器';
xLng['ACCINFO'] = '个人资料';
xLng['NOTEBLOCKOPTIONS'] = '笔记栏';
xLng['MENULEFT'] = '左边选单';
xLng['STATISTICS'] = '统计';
xLng['RESOURCEFIELDS'] = '村落概貌';
xLng['VILLAGECENTER'] = '村庄中心';
xLng['MAPOPTIONS'] = '地图设定';
xLng['COLOROPTIONS'] = '颜色设定';
xLng['DEBUGOPTIONS'] = '调试设定';
xLng['4'] = '市场';
xLng['5'] = '集结点/兵营/马厩/工场';
xLng['6'] = "市政厅/英雄园/铁匠铺/军械库";
xLng['HEROSMANSION'] = "英雄园";
xLng['BLACKSMITH'] = "铁匠铺";
xLng['ARMOURY'] = "军械库";
xLng['NOW'] = '现在';
xLng['CLOSE'] = '关闭';
xLng['USE'] = '送出';
xLng['USETHEM1H'] = '派出所有商人 (资源1小时产量)';
xLng['OVERVIEW'] = '概要';
xLng['FORUM'] = '论坛';
xLng['ATTACKS'] = '攻击';
xLng['NEWS'] = '新闻';
xLng['ADDCRTPAGE'] = '加入本页';
xLng['SCRPURL'] = 'TB脚本支持';
xLng['ACTUALIZAR'] = '更新此村庄的数据';
xLng['50'] = '利用"选择侦察兵"时<br>所派出侦察兵的数量';
xLng['SPACER'] = '分隔线';
xLng['53'] = '快速显示士兵数据';
xLng['MESREPOPTIONS'] = '讯息&报告';
xLng['59'] = '在讯息和报告的页面中<br>预先加载的页数<br>(默认 = 1 或 空白; 最多 = 5)';
xLng['ATTABLES'] = '军队的列表';
xLng['MTW'] = '浪费负载';
xLng['MTX'] = '超载量';
xLng['MTC'] = '现时总搬运数';
xLng['ALLIANCEFORUMLINK'] = '链接到外置论坛<br>(留空来使用内置论坛)';
xLng['82.L'] = '锁定书签 (隐藏 删除, 移上, 移下的图示)';
xLng['MTCL'] = '全部清除';
xLng['82.U'] = '解锁书签 (显示 删除, 移上, 移下的图示)';
xLng['CLICKSORT'] = '点击来排序';
xLng['MIN'] = '最少';
xLng['SAVEGLOBAL'] = '分享记录到其村庄';
xLng['VILLAGELIST'] = '村庄列表';
xLng['12'] = "显示'dorf1.php'和'dorf2.php'的链接";
xLng['UPDATEPOP'] = '更新人口数据';
xLng['54'] = '在tooltip中显示距离和时间';
xLng['EDIT'] = '修改';
xLng['NPCOPTIONS'] = 'NPC交易选项';
xLng['26'] = '显示NPC交易的链接和计算';
xLng['NEWVILLAGEAV'] = '日期';
xLng['TIMEUNTIL'] = '需要等待的时间';
xLng['58'] = '在"karte.php"显示 玩家/村庄/绿洲 信息';
xLng['61'] = '在报告页面显示 "全删除"的选项';
xLng['62'] = '显示 发IGM给自己的图示';
xLng['CENTERMAP'] = '此村庄居中的地图';
xLng['13'] = '在村庄旁 显示 "居中地图"的图示';
xLng['SENDTROOPS'] = '出兵';
xLng['64'] = '显示战报的详细数据';
xLng['7'] = "皇宫/行宫/研发所/宝库";
xLng['PALACE'] = "皇宫";
xLng['RESIDENCE'] = "行宫";
xLng['ACADEMY'] = "研发所";
xLng['TREASURY'] = "宝库";
xLng['45'] = "闪烁显示正在升级的建筑物等级";
xLng['14'] = "在村庄旁显示'发兵/运送资源'的图示";
xLng['34'] = "在升级信息中显示文明度变化";
xLng['UPGTABLES'] = "资源田和建筑物的升级信息表";
xLng['35'] = "在升级信息中显示粮耗变化";
xLng['16'] = "在村庄旁显示粮产余额";
xLng['RESBARTABLETITLE'] = "仓位统计表";
xLng['39'] = "显示仓位统计表";
xLng['40'] = "在悬浮窗显示仓位统计表";
xLng['21'] = "在悬浮窗显示自定义书签";
xLng['23'] = "在悬浮窗显示笔记栏";
xLng['17'] = "在村庄旁显示村庄人口";
xLng['29'] = '选取地图分析网站';
xLng['30'] = '在玩家名称右侧显示分析链接';
xLng['31'] = '在联盟名称右侧显示分析链接';
xLng['3'] = '修正古罗马步兵及方阵兵的负载量（仅适用于部分德服）';
xLng['18'] = '在悬浮窗显示额外的村庄列表（两列，便于多村切换）';
xLng['63'] = '显示TB3的强化战报信息';
xLng['60'] = '使用弹出窗口显示报告和消息';
xLng['42'] = '按名称排列建筑升级表（按英文）';
xLng['19'] = '在村庄列表中显示升级、建造及部队移动的信息';
xLng['32'] = '显示搜索条';
xLng['33'] =  "在悬浮窗中显示搜索条";
xLng['36'] = "在升级列表中显示已存资源及升级后剩余资源";
xLng['RESIDUE'] = '升级后剩余资源';
xLng['RESOURCES'] = '升级时已存资源';
xLng['2'] = '移除广告并回复服务器时间';
xLng['46'] = "运向本村的资源和商队显示附加信息";
break;
case "lt":
//by Domas & Zrip & Vykintas
xLng['8'] = 'Aljansas';
xLng['SIM'] = 'Mūšių simuliat.';
xLng['QSURE'] = 'Tikrai pašalinti?';
xLng['LOSS'] = 'Nuostoliai';
xLng['PROFIT'] = 'Pelnas';
xLng['EXTAV'] = 'Galima kelti lygį';
xLng['PLAYER'] = 'Žaidėjas';
xLng['VILLAGE'] = 'Gyvenvietės pavadinimas';
xLng['POPULATION'] = 'Populiacija';
xLng['COORDS'] = 'Koordinatės';
xLng['MAPTBACTS'] = 'Veiksmai';
xLng['SAVED'] = 'Išsaugota';
xLng['YOUNEED'] = 'Jums reikia';
xLng['TODAY'] = 'šiandien';
xLng['TOMORROW'] = 'rytoj';
xLng['DAYAFTERTOM'] = 'poryt';
xLng['MARKET'] = 'Turgavietė';
xLng['BARRACKS'] = 'Kareivinės';
xLng['RALLYPOINT'] = 'Susibūrimo vieta';
xLng['STABLE'] = 'Arklidė';
xLng['WORKSHOP'] = 'Dirbtuvės';
xLng['SENDRES'] = 'Siųsti resursus';
xLng['BUY'] = 'Pirkti';
xLng['SELL'] = 'Parduoti';
xLng['SENDIGM'] = 'Siųsti žinutę';
xLng['LISTO'] = 'Resursų bus';
xLng['ON'] = '';
xLng['AT'] = '';
xLng['EFICIENCIA'] = 'Efektyvumas';
xLng['NEVER'] = 'Niekada';
xLng['ALDEAS'] = 'Gyvenvietė(-s)';
xLng['TIEMPO'] = 'Laikas';
xLng['OFREZCO'] = 'Siūloma';
xLng['BUSCO'] = 'Ieškoma';
xLng['TIPO'] = 'Santykis';
xLng['DISPONIBLE'] = 'Tik įmanomi';
xLng['CUALQUIERA'] = 'Nesvarbu';
xLng['YES'] = 'Taip';
xLng['NO'] = 'Ne';
xLng['LOGIN'] = 'Prisijungti';
xLng['MARCADORES'] = 'Žymos';
xLng['ANYADIR'] = 'Pridėti';
xLng['UBU'] = 'Nauja URL nuoroda';
xLng['UBT'] = 'Nauja tekstinė nuoroda';
xLng['ELIMINAR'] = 'Ištrinti';
xLng['MAPA'] = 'Žemėlapis';
xLng['MAXTIME'] = 'Gabenimo laikas (iki)';
xLng['ARCHIVE'] = 'Archyvas';
xLng['SUMMARY'] = 'Santrauka';
xLng['LARGEMAP'] = 'Didelis žemėlapis';
xLng['TROPAS'] = 'Kariai';
xLng['CHKSCRV'] = 'Atnaujinti TB';
xLng['ACTUALIZAR'] = 'Atnaujinti gyvenvietės informaciją';
xLng['VENTAS'] = 'Išsaugoti pasiūlymai';
xLng['MAPSCAN'] = 'Skanuoti žemėlapį';
xLng['BIGICONS'] = 'Išplėsti naršymo juostą';
xLng['22'] = 'Rodyti užrašų knygelę';
xLng['SAVE'] = 'Išsaugoti';
xLng['49'] = 'Susibūrimo vietos pagrindinis veiksmas';
xLng['AT2'] = 'Pastiprinimas';
xLng['AT3'] = 'Puolimas: ataka';
xLng['AT4'] = 'Puolimas: reidas';
xLng['24'] = 'Užrašų knygelės dydis';
xLng['NBSIZEAUTO'] = 'Automatinis';
xLng['NBSIZENORMAL'] = 'Normalus (maža)';
xLng['NBSIZEBIG'] = 'Dideliems ekranams (didelė)';
xLng['25'] = 'Užrašų knygelės aukštis';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automatiškai išsiplečianti';
xLng['NBKEEPHEIGHT'] = 'Fiksuoto dydžio';
xLng['43'] = 'Rodyti gyvenvietės centro lygius';
xLng['NPCSAVETIME'] = 'Bus sukaupta po: ';
xLng['38'] = 'Rodyti resursų lygių spalvas';
xLng['65'] = 'Galimo lygio kėlimo spalva<br>(Tuščia = pradinė)';
xLng['66'] = 'Aukščiausio lygio spalva<br>(Tuščia = pradinė)';
xLng['67'] = 'Negalimo lygio kėlimo spalva<br>(Tuščia = pradinė)';
xLng['68'] = 'Galimo lygio kėlimo per NPC prekeivį spalva<br>(Tuščia = pradinė)';
xLng['TOTALTROOPS'] = 'Visi gyvenvietės kariai';
xLng['20'] = 'Rodyti žymas';
xLng['U.2'] = 'Gentis';
xLng['1'] = "Travian v2.x serveris";
xLng['28'] = "Rodyti statistikos nuorodas";
xLng['SELECTALLTROOPS'] = "Pasirinkti visus karius";
xLng['44'] = 'Rodyti pastatų lygių spalvas';
xLng['PARTY'] = "Taškai";
xLng['CPPERDAY'] = "KT per dieną";
xLng['SLOT'] = "Vietos";
xLng['TOTAL'] = "Iš viso";
xLng['SELECTSCOUT'] = "Pasirinkti žvalgus";
xLng['SELECTFAKE'] = "Pasirinkti netikrą ataką";
xLng['NOSCOUT2FAKE'] = "Netikram puolimui negalima naudoti žvalgų!";
xLng['NOTROOP2FAKE'] = "Netikram puolimui nėra karių!";
xLng['NOTROOP2SCOUT'] = "Šioje gyvenvietėje nėra žvalgų!";
xLng['NOTROOPS'] = "Šioje gyvenvietėje nėra karių!";
xLng['ALL'] = "Visi";
xLng['SH2'] = "Spalvų laukuose galite įvesti:<br>- green arba red arba orange, ir t.t.<br>- taip pat HEX spalvų kodą, pvz.: #004523<br>- jei norite palikti standartinę spalvą, laukelį palikite tuščią";
xLng['SHOWORIGREPORT'] = "Rodyti originalią ataskaitą (kopijavimui)";
xLng['56'] = "Rodyti laukų/oazių informaciją,<br>kai pelė rodo į žemėlapio laukelį";
xLng['10'] = "Naudojama nuoroda kovos simuliatoriui:<br>(kairiajame meniu)";
xLng['WARSIMOPTION1'] = "Vidinė (siūloma žaidimo)";
xLng['WARSIMOPTION2'] = "Išorinė (siūloma kirilloid.ru)";
xLng['27'] = "Naudojamas statistikos tiekėjas";
xLng['28'] = "Rodyti statistikos nuorodas";
xLng['NONEWVER'] = "Jūs turite naujausią versiją";
xLng['BVER'] = "Jūs galite turėti beta versiją";
xLng['NVERAV'] = 'Dabartinė versija';
xLng['UPDATESCRIPT'] = "Atnaujinti dabar?";
xLng['CHECKUPDATE'] = "Ieškoma atnaujinimų.<br>Prašome palaukti...";
xLng['CROPFINDER'] = "Crop Finder";
xLng['AVPOPPERVIL'] = "Gyventojų vidurkis gyvenvietei";
xLng['AVPOPPERPLAYER'] = "Gyventojų vidurkis žaidėjui";
xLng['37'] = "Rodyti resursų laukų lygių kėlimo lentelę";
xLng['41'] = "Rodyti pastatų lygių kėlimo lentelę";
xLng['69'] = "Konsolės registro lygis<br>TIK PROGRAMUOTOJAMS ARBA KLAIDŲ PAIEŠKAI<br>(Numatyta = 0)";
xLng['48'] = "Pasiūlymų puslapių skaičius užkrovimui<br>esant puslapyje 'Turgavietė => Pirkti'<br>(Numatyta = 1)";
xLng['U.3'] = 'Jūsų sostinės pavadinimas';
xLng['U.6'] = 'Jūsų sostinės koordinatės';
xLng['MAX'] = 'Daugiausiai';
xLng['TOTALTROOPSTRAINING'] = 'Iš viso treniruojamų karių';
xLng['57'] = 'Rodyti atstumą ir laiką';
xLng['TBSETUPLINK'] = TB3O.shN + ' nustatymai';
xLng['UPDATEALLVILLAGES'] = 'Atnaujinti visas gyvenvietes.  NAUDOTI ITIN ATSARGIAI, NES DĖL TO GALI BŪTITE BŪTI UŽBLOKUOTAS !';
xLng['9'] = "Rodyti papildomas nuorodas kairiajame meniu<br>(Traviantoolbox, World Analyser, Travilog, žemėlapis ir t.t.)";
xLng['LARGEMAP'] = 'Didelis žemėlapis';
xLng['USETHEMPR'] = 'Naudoti (proporcingai)';
xLng['USETHEMEQ'] = 'Naudoti (lygiai)';
xLng['TOWNHALL'] = 'Rotušė';
xLng['GAMESERVERTYPE'] = 'Žaidimo serveris';
xLng['ACCINFO'] = 'Registracijos informacija';
xLng['NOTEBLOCKOPTIONS'] = 'Užrašinė';
xLng['MENULEFT'] = 'Meniu kairėje pusėje';
xLng['STATISTICS'] = 'Statistika';
xLng['RESOURCEFIELDS'] = 'Resursų laukai';
xLng['VILLAGECENTER'] = 'Gyvenvietės centras';
xLng['MAPOPTIONS'] = 'Žemėlapio parinktys';
xLng['COLOROPTIONS'] = 'Spalvų parinktys';
xLng['DEBUGOPTIONS'] = "Debug'inimo parinktys";
xLng['4'] = 'Turgavietė';
xLng['5'] = 'Susibūrimo vieta/Kareivinės/Dirbtuvės/Arklidė';
xLng['6'] = "Rotušė/Karžygio namai/Šarvų kalvė/Ginklų kalvė";
xLng['HEROSMANSION'] = "Karžygio namai";
xLng['BLACKSMITH'] = 'Ginklų kalvė';
xLng['ARMOURY'] = 'Šarvų kalvė';
xLng['NOW'] = 'Dabar';
xLng['CLOSE'] = 'Atšaukti';
xLng['USE'] = 'Naudoti';
xLng['USETHEM1H'] = 'Naudoti (1 valandos produkcija)';
xLng['OVERVIEW'] = 'Apžvalga';
xLng['FORUM'] = 'Forumas';
xLng['ATTACKS'] = 'Puolimai';
xLng['NEWS'] = 'Naujienos';
xLng['ADDCRTPAGE'] = 'Pridėti šį puslapį';
xLng['SCRPURL'] = 'TB puslapis';
xLng['50'] = 'Žvalgų kiekis<br>Funkcijai "Pasirinkti žvalgus"';
xLng['SPACER'] = 'Pridėti skirtuką';
xLng['53'] = 'Pranešimų lentelėje rodyti karių informaciją';
xLng['MESREPOPTIONS'] = 'Pranešimai ir ataskaitos';
xLng['59'] = 'Užkraunamų pranešimų/ataskaitų puslapių skaičius<br>(Numatyta = 1)';
xLng['ATTABLES'] = 'Karių lentelė';
xLng['MTW'] = 'Neišnaudota';
xLng['MTX'] = 'Viršyta';
xLng['MTC'] = 'Esamas pakrovimas';
xLng['ALLIANCEFORUMLINK'] = 'Nuoroda į įšorini forumą<br>(jei naudojate vidinį, nerašykite nieko)';
xLng['82.L'] = 'Fiksuoti žymas (nerodyti trynimo, perkėlimo aukštyn bei žemyn ikonų)';
xLng['MTCL'] = 'Viską išvalyti';
xLng['82.U'] = 'Nefiksuoti žymų (rodyti trynimo, perkėlimo aukštyn bei žemyn ikonas)';
xLng['CLICKSORT'] = 'Rūšiuoti';
xLng['MIN'] = 'Mažiausiai';
xLng['SAVEGLOBAL'] = 'Visose gyvenvietėse';
xLng['VILLAGELIST'] = 'Gyvenviečių sąrašas';
xLng['12'] = "Rodyti 'dorf1.php' ir 'dorf2.php' nuorodas";
xLng['UPDATEPOP'] = 'Atnaujinti populiaciją';
xLng['54'] = 'Atstumą ir laikus iki gyvenvietės rodyti pranešimų lentelėje';
xLng['EDIT'] = 'Redaguoti';
xLng['NPCOPTIONS'] = 'NPC asistentas';
xLng['26'] = 'Rodyti NPC asistento skaičiavimus/nuorodas';
xLng['58'] = 'Rodyti žaidėjų/gyvenviečių/oazių lentelę';
xLng['NEWVILLAGEAV'] = 'Data/Laikas';
xLng['TIMEUNTIL'] = 'Laukimo laikas';
xLng['61'] = 'Rodyti "Trinti viską" lentelę ataskaitų puslapyje';
xLng['62'] = 'Rodyti "Siųsti IGM" piktogramą ir man';
xLng['CENTERMAP'] = 'Centruoti šią gyvenvietę žemėlapyje';
xLng['13'] = 'Rodyti nuorodą "Centruoti šią gyvenvietę žemėlapyje"';
xLng['SENDTROOPS'] = 'Siųsti karius';
xLng['64'] = 'Ataskaitų statistikoje rodyti detales';
xLng['7'] = "Valdomų rūmai/Rezidencija/Akademija/Iždinė";
xLng['PALACE'] = "Valdovų rūmai";
xLng['RESIDENCE'] = "Rezidencija";
xLng['ACADEMY'] = "Akademija";
xLng['TREASURY'] = "Iždinė";
xLng['45'] = "Rodyti mirksinčius statomų pastatų lygius";
xLng['14'] = "Rodyti 'Siųsti karius/Siųsti resursus' nuorodas";
xLng['34'] = "Lygių kėlimo lentelėse rodyti KT per dieną";
xLng['UPGTABLES'] = "Resursų laukų ir pastatų lygių kėlimo lentelės";
xLng['35'] = "Rodyti grūdų sunaudojimą";
xLng['16'] = "Rodyti efektyvią grūdų gamybą";
xLng['39'] = "Rodyti resursų lentelę";
xLng['RESBARTABLETITLE'] = "Resursų lentelė";
xLng['60'] = 'Rodyti nuorodas laiškų atidarymui iškylančiajame lange';
break;
case "ae":
//by Dream1 & Me_TheKing & kaser15 & aatkco & ghooost
xLng['0'] = "Script language"; //please, do not translate !!! translation will never be included into the script !
xLng['1'] = "Travian v2.x server";
xLng['2'] = "إزالة الإعلانات";
xLng['3'] = 'T3.1 حساب الحمولة جندي أول & الكتيبة <br> (نسخة ترافيان T3.1 تختلف عن T3.5 )';
xLng['4'] = 'السوق';
xLng['5'] = 'نقطة التجمع / الثكنة / المصانع الحربية / الإسطبل';
xLng['6'] = "البلدية / قصر الأبطال / مستودع الأسلحة / الحداد";
xLng['7'] = "القصر / السكن / الأكاديمية / الخزنة";
xLng['8'] = 'التحالف';
xLng['9'] = "إظهار الروابط الإضافية في القائمة اليمنى <br> (Traviantoolbox, World Analyser, Travilog, Map, وغيره.)";
xLng['10'] = "تغيير نوع محاكي المعركة: <br> (في القائمة اليسرى)";
xLng['11'] = "وصلة لاستخدامها لنشر التقارير";
xLng['12'] = "أظهار روابط 'dorf1.php' و 'dorf2.php'";
xLng['13'] = ' إظهار أيقونة "توسيط هذه القرية على الخريطة';
xLng['14'] = "إظهار 'إرسال قوات / أرسل الموارد 'الرموز في قائمة القرية";
xLng['15'] = "إظهار الخشب والطين والحديد الإنتاج لكل ساعة في قائمة القرية";
xLng['16'] = "أظهار أنتاج القمح بجانب كل قرية";
xLng['17'] = "أظهار عدد السكان بجانب كل قرية";
xLng['18'] = "أظهار عمودين لقائمة القرية بصفحة عائمة";
xLng['19'] = 'عرض معلومات عن تقدم تطوير المباني وتحركات القوات في قائمة القرى';
xLng['20'] = 'أظهار الروابط';
xLng['21'] = "إظهار الروابط بصفحة عائمة ";
xLng['22'] = 'أظهار دفتر الملاحظات';
xLng['23'] = "إظهار دفتر الملاحظات بصفحة عائمة";
xLng['24'] = 'مقاس دفتر الملاحظات';
xLng['25'] = 'ارتفاع دفتر الملاحظات';
xLng['26'] = "إظهار الحسابات/الروابط للمساعد NPC";
xLng['27'] = "اختيار نوع محلل عالم ترافيان";
xLng['28'] = "أظهار رابط محلل الإحصائيات";
xLng['29'] = "اختيار  نوع محلل الإحصائيات";
xLng['30'] = "إظهار روابط الخريطة للمستخدمين";
xLng['31'] = "إظهار روابط الخريطة للتحالفات";
xLng['32'] = "عرض شريط البحث";
xLng['33'] = "إذا اخترت بالأعلى عرض شريط البحث  <br>  تستطيع جعله في نافذة عائمة بالضغط هنا" ;
xLng['34'] = "أظهار مستوى النقاط الحضارية في جدول الترقية";
xLng['35'] = "أظهار استهلاك القمح في جدول الترقية";
xLng['36'] = 'عرض الموارد المتبقية بعد البناء <br> والموارد في هذا الوقت في جدول الترقية والتطوير';
xLng['37'] = "إظهار جدول رفع مستوى الموارد  <br>  الجدول الكبير أسفل الصفحة";
xLng['38'] = 'إظهار الألوان على مستويات الموارد';
xLng['39'] = 'إظهار شريط الموارد';
xLng['40'] = 'إظهار شريط الموارد في صفحة عائمة';
xLng['41'] = "إظهار جدول رفع مستوى المباني";
xLng['42'] = 'فرز المباني بالاسم في جدول الترقية';
xLng['43'] = 'أظهار الأرقام على المباني';
xLng['44'] = 'أظهار الألوان على مستويات المباني';
xLng['45'] = "تفعيل خاصية الوميض عند تطوير المباني ";
xLng['46'] = "عرض معلومات إضافية عن وصول كل تاجر";
xLng['47'] = "أظهار آخر عملية نقل موارد في السوق";
xLng['48'] = "عدد صفحات العروض <br> في 'السوق => شراء' <br> (الوضع الافتراضي = 1 أو فارغ ؛ الحد الأقصى = 5)";
xLng['49'] = 'الاختصار الافتراضي في نقطة التجمع';
xLng['50'] = 'عدد الكشافة في <br> وظيفة "اختيار الكشافة"';
xLng['51'] = "أظهار آخر هجوم في نقطة التجمع";
xLng['52'] = "أظهار الإحداثيات في قائمة آخر هجوم";
xLng['53'] = 'إظهار معلومات القوات';
xLng['54'] = "إظهار المسافة و الوقت للقرى كتلميحات";
xLng['55'] = "ملء قوات القرية في محاكي المعركة داخل اللعبة";
xLng['56'] = "عرض نوع القرية <br> عند المرور بالماوس على الخريطة";
xLng['57'] = 'إظهار المسافات & الوقت';
xLng['58'] = "إظهار جدول اللاعبين ( القرى / الواحات المحتلة )";
xLng['59'] = 'عدد الصفحات في الرسائل/التقارير <br> (الوضع الافتراضي = 1 أو فارغ ؛ الحد الأقصى = 5)';
xLng['60'] = "إظهار وصلات لفتح الرسائل في نافذة منبثقة";
xLng['61'] = 'إظهار جدول "حذف الجميع" على صفحة التقارير';
xLng['62'] = 'إظهار أيقونة "أرسال رسالة"';
xLng['63'] = "عرض الإحصائيات في تقارير المعركة";
xLng['64'] = 'إظهار التفاصيل في تقرير الإحصاءات';
xLng['65'] = 'لون التطوير متاح <br> المربع فارغ = افتراضي)';
xLng['66'] = 'لون الحد الأقصى <br> (المربع فارغ = افتراضي)';
xLng['67'] = 'لون التطوير لا يمكن <br> (المربع فارغ = افتراضي)';
xLng['68'] = 'لون التطوير عن طريق NPC <br> (المربع فارغ = افتراضي)';
xLng['69'] = "مستوى الدخول فقط لتصحيح الأخطاء للمبرمجين <br> (الافتراضي = 0 أو أتركه فارغ)";
xLng['82.L'] = "إغلاق لوحة الروابط   إخفاء أيقونة ( حذف، فوق، تحت";
xLng['82.U'] = "فتح لوحة الروابط   إظهار أيقونة ( حذف، فوق، تحت)";
xLng['SIM'] = 'محاكي المعركة';
xLng['QSURE'] = 'هل أنت متأكد؟';
xLng['LOSS'] = 'الخسائر';
xLng['PROFIT'] = 'الفائدة';
xLng['EXTAV'] = 'متاح';
xLng['PLAYER'] = 'اللاعب';
xLng['VILLAGE'] = 'اسم القرية';
xLng['POPULATION'] = 'السكان';
xLng['COORDS'] = 'الإحداثيات';
xLng['MAPTBACTS'] = 'الأمر';
xLng['SAVED'] = 'تم حفظ الإعدادات';
xLng['YOUNEED'] = 'تحتاج';
xLng['TODAY'] = 'اليوم';
xLng['TOMORROW'] = 'غداً';
xLng['DAYAFTERTOM'] = 'بعد غداً';
xLng['MARKET'] = 'السوق';
xLng['BARRACKS'] = 'الثكنة';
xLng['RALLYPOINT'] = 'نقطة التجمع';
xLng['STABLE'] = 'الإسطبل';
xLng['WORKSHOP'] = 'المصانع الحربية';
xLng['SENDRES'] = 'إرسال الموارد';
xLng['BUY'] = 'شراء';
xLng['SELL'] = 'بيع';
xLng['SENDIGM'] = 'إرسال رسالة';
xLng['LISTO'] = 'يتاح';
xLng['ON'] = 'على';
xLng['AT'] = 'في';
xLng['EFICIENCIA'] = 'الفعالية';
xLng['NEVER'] = 'أبدا';
xLng['ALDEAS'] = 'القرية-القرى';
xLng['TIEMPO'] = 'الوقت';
xLng['OFREZCO'] = 'العرض';
xLng['BUSCO'] = 'البحث';
xLng['TIPO'] = 'النوع';
xLng['DISPONIBLE'] = 'فقط المتاح';
xLng['CUALQUIERA'] = 'أي';
xLng['YES'] = 'نعم';
xLng['NO'] = 'لا';
xLng['LOGIN'] = 'تسجيل الدخول';
xLng['MARCADORES'] = 'الروابط';
xLng['ANYADIR'] = 'إضافة رابط +نص';
xLng['UBU'] = 'ضع الرابط هنا';
xLng['UBT'] = 'ضع نص الرابط هنا';
xLng['ELIMINAR'] = 'حذف';
xLng['MAPA'] = 'الخريطة';
xLng['MAXTIME'] = 'الحد الأقصى للوقت';
xLng['ARCHIVE'] = 'الأرشيف';
xLng['SUMMARY'] = 'الموجز';
xLng['TROPAS'] = 'القوات';
xLng['CHKSCRV'] = 'أضغط هنا لتحديث السكربت مباشرة';
xLng['ACTUALIZAR'] = 'تحديث معلومات القرية';
xLng['VENTAS'] = 'حفظ العروض';
xLng['MAPSCAN'] = 'فحص الخريطة';
xLng['BIGICONS'] = 'الإيقونات المختصرة';
xLng['SAVE'] = 'حفظ';
xLng['AT2'] = 'مساندة';
xLng['AT3'] = 'هجوم: كامل';
xLng['AT4'] = 'هجوم: للنهب';
xLng['NBSIZEAUTO'] = 'تلقائي';
xLng['NBSIZENORMAL'] = 'عادي (صغيره)';
xLng['NBSIZEBIG'] = 'ملء الشاشة (كبيرة)';
xLng['NBAUTOEXPANDHEIGHT'] = 'توسيع تلقائي للارتفاع';
xLng['NBKEEPHEIGHT'] = 'ارتفاع افتراضي';
xLng['NPCSAVETIME'] = 'حفظ: ';
xLng['TOTALTROOPS'] = 'مجموع القوات في القرية';
xLng['U.2'] = 'القبيلة';
xLng['SELECTALLTROOPS'] = "اختيار كل القوات";
xLng['PARTY'] = "الاحتفالات";
xLng['CPPERDAY'] = "نقاط حضارية يومياً";
xLng['SLOT'] = "فتح قرية";
xLng['TOTAL'] = "المجموع";
xLng['SELECTSCOUT'] = "اختيار الكشافة";
xLng['SELECTFAKE'] = "اختيار هجوم وهمي";
xLng['NOSCOUT2FAKE'] = "مستحيل اختيار الكشافة في الهجوم الوهمي !";
xLng['NOTROOP2FAKE'] = "لا توجد قوات للهجوم الوهمي !";
xLng['NOTROOP2SCOUT'] = "لا توجد قوات كشافة !";
xLng['NOTROOPS'] = "لا توجد قوات في القرية !";
xLng['ALL'] = "الكل";
xLng['SH2'] = "يمكنك إدخال الألوان كالأتي:<br>- green أو red أو  orange, الخ.<br>- رمز اللون مثل #004523<br>- تركه فارغ لألون الافتراضي";
xLng['SHOWORIGREPORT'] = "أظهار النسخة الأصلية للتقرير";
xLng['WARSIMOPTION1'] = "داخلي (محاكي المعركة العادي)";
xLng['WARSIMOPTION2'] = "خارجي (محاكي المعركة المطور kirilloid.ru)";
xLng['U.3'] = 'أسم العاصمة <br> لا يمكنك التعديل, فقط قم بزيارة بطاقة العضوية';
xLng['NONEWVER'] = "لديك أحدث نسخة";
xLng['BVER'] = "قد يكون لديك نسخة تجريبية";
xLng['NVERAV'] = "يوجد نسخة جديدة من السكربت";
xLng['UPDATESCRIPT'] = "هل تريد تحديث السكربت الآن؟";
xLng['CHECKUPDATE'] = "التحقق من وجود تحديث للسكربت. الرجاء الانتظار...";
xLng['CROPFINDER'] = "بحث عن القرى القمحية";
xLng['AVPOPPERVIL'] = "متوسط عدد السكان للقرية الواحدة ";
xLng['AVPOPPERPLAYER'] = "متوسط عدد السكان للاعب الواحد";
xLng['U.6'] = 'إحداثيات العاصمة <br> لا يمكنك التعديل, فقط قم بزيارة بطاقة العضوية';
xLng['MAX'] = 'الحد الأقصى';
xLng['TOTALTROOPSTRAINING'] = 'أجمالي القوات التي يتم تدريبها';
xLng['TBSETUPLINK'] = 'أعدادات ترافيان بايوند';
xLng['UPDATEALLVILLAGES'] = 'تحديث جميع القرى. لا تستخدمها بكثرة فقد يؤدي ذالك إلى حظر حسابك !';
xLng['LARGEMAP'] = 'خريطة كبيرة';
xLng['USETHEMPR'] = 'الاستخدام (النسبي)';
xLng['USETHEMEQ'] = 'الاستخدام (المتساوي)';
xLng['TOWNHALL'] = 'البلدية';
xLng['GAMESERVERTYPE'] = 'سيرفر اللعبة';
xLng['ACCINFO'] = 'معلومات الحساب';
xLng['NOTEBLOCKOPTIONS'] = 'دفتر الملاحظات';
xLng['MENULEFT'] = 'القائمة على الجانب الأيمن';
xLng['STATISTICS'] = 'إحصائيات';
xLng['RESOURCEFIELDS'] = 'حقول الموارد';
xLng['VILLAGECENTER'] = 'مركز القرية';
xLng['MAPOPTIONS'] = 'خيارات الخريطة';
xLng['COLOROPTIONS'] = 'خيارات الألوان';
xLng['DEBUGOPTIONS'] = 'خيارات التصحيح';
xLng['HEROSMANSION'] = "قصر الأبطال";
xLng['BLACKSMITH'] = 'الحداد';
xLng['ARMOURY'] = 'مستودع الأسلحة';
xLng['NOW'] = 'الآن';
xLng['CLOSE'] = 'إغلاق';
xLng['USE'] = 'استخدام';
xLng['USETHEM1H'] = 'الاستخدام (1 ساعة الإنتاج)';
xLng['OVERVIEW'] = 'العرض';
xLng['FORUM'] = 'المنتدى';
xLng['ATTACKS'] = 'الهجمات';
xLng['NEWS'] = 'الإخبار';
xLng['ADDCRTPAGE'] = 'إضافة نص للصفحة الحالية';
xLng['SCRPURL'] = 'اضغط هنا لفتح الصفحة الرسمية للسكربت';
xLng['SPACER'] = 'إضافة فاصل';
xLng['MESREPOPTIONS'] = 'رسائل & تقارير';
xLng['ATTABLES'] = 'جدول القوات';
xLng['MTW'] = 'الباقي';
xLng['MTX'] = 'الزائد';
xLng['MTC'] = "الحمولة الحالية";
xLng['ALLIANCEFORUMLINK'] = "رابط خارجي للمنتدى <br> (المربع فارغ = إذا كان المنتدى داخلي)";
xLng['MTCL'] = "مسح الكل";
xLng['CLICKSORT'] = "أضغط لترتيب";
xLng['MIN'] = "الأدنى";
xLng['SAVEGLOBAL'] = "عرض مشترك بين القرى";
xLng['VILLAGELIST'] = "قائمة القرية";
xLng['UPDATEPOP'] = "تحديث السكان";
xLng['EDIT'] = "تحرير";
xLng['NPCOPTIONS'] = "خيارات المساعدة NPC";
xLng['NEWVILLAGEAV'] = "التاريخ/الوقت";
xLng['TIMEUNTIL'] = "الوقت اللازم للانتظار";
xLng['CENTERMAP'] = "توسيط هذه القرية على الخريطة";
xLng['SENDTROOPS'] = 'إرسال القوات';
xLng['PALACE'] = "القصر";
xLng['RESIDENCE'] = "السكن";
xLng['ACADEMY'] = "الأكاديمية";
xLng['TREASURY'] = "الخزنة";
xLng['UPGTABLES'] = "جدول الترقية ( المباني/الحقول )";
xLng['RESBARTABLETITLE'] = "شريط الموارد";
xLng['RESIDUE'] = "الموارد بعد البناء ";
xLng['RESOURCES'] = "الموارد قبل البناء ";
xLng['SH1'] = "أفتح بطاقة العضوية ليتعرف السكربت تلقائياً على العاصمة <br> أبني الثكنة للكشف تلقائياً على نوع القبيلة ومن ثم الدخول على نقطة التجمع";
xLng['RESEND'] = "إرسال مرة أخرى ؟";
xLng['WSI'] = "محاكي المعركة داخل اللعبة";
break;
case "rs":
//by David Maćej & rsinisa
xLng['8'] = 'Савез';
xLng['SIM'] = 'Симулатор борбе';
xLng['QSURE'] = 'Да ли сте сигурни?';
xLng['LOSS'] = 'Губитак';
xLng['PROFIT'] = 'Добит';
xLng['EXTAV'] = 'Надоградња могућа';
xLng['PLAYER'] = 'Играч';
xLng['VILLAGE'] = 'Село';
xLng['POPULATION'] = 'Популација';
xLng['COORDS'] = 'Координате';
xLng['MAPTBACTS'] = 'Акције';
xLng['SAVED'] = 'Сачувано';
xLng['YOUNEED'] = 'Потребно је';
xLng['TODAY'] = 'данас';
xLng['TOMORROW'] = 'сутра';
xLng['DAYAFTERTOM'] = 'прекосутра';
xLng['MARKET'] = 'Пијаца';
xLng['BARRACKS'] = 'Касарна';
xLng['RALLYPOINT'] = 'Место окупљања';
xLng['STABLE'] = 'Штала';
xLng['WORKSHOP'] = 'Радионица';
xLng['SENDRES'] = 'Пошаљи ресурсе';
xLng['BUY'] = 'Купи';
xLng['SELL'] = 'Продај';
xLng['SENDIGM'] = 'Пошаљи поруку';
xLng['LISTO'] = 'Доступно';
xLng['ON'] = ''; // on
xLng['AT'] = 'у'; // at
xLng['EFICIENCIA'] = 'Ефикасност';
xLng['NEVER'] = 'Никада';
xLng['ALDEAS'] = 'Село(а)';
xLng['TIEMPO'] = 'Време';
xLng['OFREZCO'] = 'Нуди';
xLng['BUSCO'] = 'Тражи';
xLng['TIPO'] = 'Однос';
xLng['DISPONIBLE'] = 'Само доступно';
xLng['CUALQUIERA'] = 'Све';
xLng['YES'] = 'Да';
xLng['NO'] = 'Не';
xLng['LOGIN'] = 'Пријави се';
xLng['MARCADORES'] = 'Линкови';
xLng['ANYADIR'] = 'Додај';
xLng['UBU'] = 'Адреса новог линка';
xLng['UBT'] = 'Назив новог линка';
xLng['ELIMINAR'] = 'Обриши';
xLng['MAPA'] = 'Мапа';
xLng['MAXTIME'] = 'Максимално време';
xLng['ARCHIVE'] = 'Архива';
xLng['SUMMARY'] = 'Збир'; // summary
xLng['TROPAS'] = 'Војска';
xLng['CHKSCRV'] = 'Унапреди TBeyond';
xLng['ACTUALIZAR'] = 'Освежи информације о селима';
xLng['VENTAS'] = 'Сачувај понуду';
xLng['MAPSCAN'] = 'Претражи мапу';
xLng['BIGICONS'] = 'Прикажи додатне иконе';
xLng['22'] = 'Прикажи бележницу';
xLng['SAVE'] = 'Сачувај';
xLng['49'] = 'Основна акција на месту окупљања';
xLng['AT2'] = 'Појачање';
xLng['AT3'] = 'Напад';
xLng['AT4'] = 'Пљачка';
xLng['24'] = 'Величина бележнице';
xLng['NBSIZEAUTO'] = 'Аутоматски';
xLng['NBSIZENORMAL'] = 'Нормална';
xLng['NBSIZEBIG'] = 'Велика';
xLng['25'] = 'Висина бележнице';
xLng['NBAUTOEXPANDHEIGHT'] = 'Аутоматски повећај висину';
xLng['NBKEEPHEIGHT'] = 'Основна висина';
xLng['43'] = 'Прикажи бројеве у центру села';
xLng['NPCSAVETIME'] = 'Убрзај за: ';
xLng['38'] = 'Прикажи нивое ресурса у боји';
xLng['44'] = 'Прикажи нивое грађевина у боји';
xLng['65'] = 'Боја за унапређење могуће<br>(Основна = празно)';
xLng['66'] = 'Боја за максимални ниво<br>(Основна = празно)';
xLng['67'] = 'Боја за унапређење није могуће<br>(Основна = празно)';
xLng['68'] = 'Боја за унапређење помоћу НПЦ<br>(Основна = празно)';
xLng['TOTALTROOPS'] = 'Сва војска из села';
xLng['20'] = 'Прикажи линкове';
xLng['U.2'] = 'Племе';
xLng['1'] = "Травиан 2.x сервер";
xLng['SELECTALLTROOPS'] = "Сва војска";
xLng['PARTY'] = "Забаве";
xLng['CPPERDAY'] = "КП/дан";
xLng['SLOT'] = "Место за проширење";
xLng['TOTAL'] = "Укупно";
xLng['SELECTSCOUT'] = "Извиђање";
xLng['SELECTFAKE'] = "Лажни напад";
xLng['NOSCOUT2FAKE'] = "Немогуће је послати извиђаче у лажни напад!";
xLng['NOTROOP2FAKE'] = "У селу нема војске са лажни напад!";
xLng['NOTROOP2SCOUT'] = "У селу нема извиђача!";
xLng['NOTROOPS'] = "Нема војске у селу!";
xLng['ALL'] = "Све";
xLng['SH2'] = "У поље за избор боје можете унети:<br>- green или red или orange, итд.<br>- или HEX колорни код нпр. #004523<br>- оставите празно за основне боје.";
xLng['SHOWORIGREPORT'] = "Прикажи оригинални извештај (за постовање)";
xLng['56'] = "Прикажи тип поља/информацију о оази<br>док се миш креће преко мапе";
xLng['10'] = "Користи следећи симулатор борбе:<br>(у менију лево)";
xLng['WARSIMOPTION1'] = "Из игре";
xLng['WARSIMOPTION2'] = "Са сајта kirilloid.ru";
xLng['27'] = "Травиан анализатор";
xLng['28'] = "Прикажи анализатор као линк";
xLng['NONEWVER'] = "Имате последњу верзију скрипта!";
xLng['BVER'] = "Можда имате бетаверзију скрипта";
xLng['NVERAV'] = "Постоји нова верзија скрипта";
xLng['UPDATESCRIPT'] = "Да ли унапредим скрипту сада?";
xLng['CHECKUPDATE'] = "Проверавам да ли постоји нова верзија.<br>Молим сачекајте...";
xLng['CROPFINDER'] = "Нађи житнице";
xLng['AVPOPPERVIL'] = "Просечна популација по селу";
xLng['AVPOPPERPLAYER'] = "Просечна популација по играчу";
xLng['37'] = "Прикажи табелу унапређења ресурса";
xLng['41'] = "Прикажи табелу унапређења грађевина";
xLng['69'] = "Console Log Level<br>САМО ЗА ПРОГРАМЕРЕ или ТРАЖЕЊЕ ГРЕШАКА<br>(Основно = 0)";
xLng['48'] = "Број страна са понудама ѕа приказ<br>на пијаци => страна ѕа куповину<br>(Основно = 1)";
xLng['U.3'] = 'Назив главног града<br>Идите у профил';
xLng['U.6'] = 'Координате главног града<br>Идите у профил';
xLng['MAX'] = 'Максимум';
xLng['TOTALTROOPSTRAINING'] = 'Укупна број јединица на обуци';
xLng['57'] = 'Прикази даљине и времена';
xLng['TBSETUPLINK'] = TB3O.shN + ' подешавање';
xLng['UPDATEALLVILLAGES'] = 'Освежи сва села. КОРИСТИТИ СА ОПРЕЗОМ, МОГУЋЕ ЈЕ БУДЕТЕ БАНОВАНИ!!!';
xLng['9'] = "Прикажи додатне линкове у менију лево<br>(Traviantoolbox, World Analyser, Travilog, Map, итд.)";
xLng['LARGEMAP'] = 'Велика мапа';
xLng['USETHEMPR'] = 'Пропорционална подела';
xLng['USETHEMEQ'] = 'Једнака подела';
xLng['TOWNHALL'] = 'Општина';
xLng['GAMESERVERTYPE'] = 'Сервер';
xLng['NOTEBLOCKOPTIONS'] = 'Бележница';
xLng['MENULEFT'] = 'Мени са леве стране';
xLng['STATISTICS'] = 'Статистика';
xLng['RESOURCEFIELDS'] = 'Ресурсна поља';
xLng['VILLAGECENTER'] = 'Центар села';
xLng['MAPOPTIONS'] = 'Мапа';
xLng['COLOROPTIONS'] = 'Боје';
xLng['DEBUGOPTIONS'] = 'Тражење грешака';
xLng['4'] = 'Пијаца';
xLng['5'] = 'Место окупљања/Касарна/радионица/Штала';
xLng['6'] = "Општина/Дворац хероја/Ковачница оклопа/Ковачница оружја";
xLng['HEROSMANSION'] = "Дворац хероја";
xLng['BLACKSMITH'] = 'Ковачница оружја';
xLng['ARMOURY'] = 'Ковачница оклопа';
xLng['NOW'] = 'Сада';
xLng['CLOSE'] = 'Затвори';
xLng['USE'] = 'Користи';
xLng['USETHEM1H'] = 'Једночасовна производња';
xLng['OVERVIEW'] = 'Преглед';
xLng['FORUM'] = 'Форум';
xLng['ATTACKS'] = 'Напади';
xLng['NEWS'] = 'Вести';
xLng['ADDCRTPAGE'] = 'Додај тренутну страну као линк';
xLng['SCRPURL'] = 'TBeyond сајт';
xLng['50'] = 'Број извиђача за<br>"Извиђање" функцију';
xLng['SPACER'] = 'Размак';
xLng['53'] = 'Прикажи информације о јединици кад миш пређе преко ње';
xLng['MESREPOPTIONS'] = 'Поруке и извештаји';
xLng['59'] = 'Број страна порука/извештаја за приказ<br>(Основно = 1)';
xLng['ATTABLES'] = 'Преглед војске';
xLng['MTW'] = 'Неискоришћено';
xLng['MTX'] = 'Има више';
xLng['MTC'] = 'Тренутно се шаље';
xLng['ALLIANCEFORUMLINK'] = 'Линк до спољног форума<br>(Оставити празно за форум из игре)';
xLng['82.L'] = 'Закључај линкове (Уклони, обриши, горе, доле иконе)';
xLng['MTCL'] = 'Обриши све';
xLng['82.U'] = 'Откључај линкове (Уклони, обриши, горе, доле иконе)';
xLng['CLICKSORT'] = 'Кликни за сортирање';
xLng['MIN'] = 'Минимум';
xLng['SAVEGLOBAL'] = 'Важи за сва села';
xLng['VILLAGELIST'] = 'Списак села';
xLng['12'] = "Прикажи линкове до 'dorf1.php' и 'dorf2.php'";
xLng['UPDATEPOP'] = 'Освежи популацију';
xLng['54'] = 'Прикажи даљине и времена до села кад миш пређе преко';
xLng['EDIT'] = 'Уреди';
xLng['NPCOPTIONS'] = 'NPC помоћник';
xLng['26'] = 'Прикажи NPC помоћника';
xLng['58'] = 'Прикажи табелу играча/села/освојених долина';
xLng['NEWVILLAGEAV'] = 'Датум/Време';
xLng['TIMEUNTIL'] = 'Време чекања';
xLng['61'] = 'Прикажи "Обриши све" табелу у извештајима';
xLng['62'] = 'Прикажи "Пошаљи поруку" икону и за мој налог';
xLng['CENTERMAP'] = 'Центритрај мапу на овом селу';
xLng['13'] = 'Прикажи "Центритрај мапу на овом селу" икону';
xLng['SENDTROOPS'] = 'Пошаљи војску';
xLng['64'] = 'Прикажи статистику у извештајима';
xLng['7'] = "Палата/Резиденција/Академија/Ризница";
xLng['PALACE'] = "Палата";
xLng['RESIDENCE'] = "Резиденција";
xLng['ACADEMY'] = "Академија";
xLng['TREASURY'] = "Ризница";
xLng['60'] = 'Прикажи линк за отварање порука у посебном прозору';
break;
case "gr":
case "el":
//by maintanosgr & ChuckNorris & Velonis Petros
xLng['8'] = 'Συμμαχία';
xLng['SIM'] = 'Προσομοιωτής μάχης';
xLng['QSURE'] = 'Είσαι σίγουρος;';
xLng['LOSS'] = 'Ζημιά';
xLng['PROFIT'] = 'Κέρδος';
xLng['EXTAV'] = 'Διαθέσιμη αναβάθμιση';
xLng['PLAYER'] = 'Παίκτης';
xLng['VILLAGE'] = 'Χωριό';
xLng['POPULATION'] = 'Πληθυσμός';
xLng['COORDS'] = 'Συντεταγμένες';
xLng['MAPTBACTS'] = 'Ενέργειες';
xLng['SAVED'] = 'Αποθηκεύτηκε';
xLng['YOUNEED'] = 'Χρειάζεσαι';
xLng['TODAY'] = 'σήμερα';
xLng['TOMORROW'] = 'αύριο';
xLng['DAYAFTERTOM'] = 'μεθαύριο';
xLng['MARKET'] = 'Αγορά';
xLng['BARRACKS'] = 'Στρατόπεδο';
xLng['RALLYPOINT'] = 'Πλατεία συγκεντρώσεως';
xLng['STABLE'] = 'Στάβλος';
xLng['WORKSHOP'] = 'Εργαστήριο';
xLng['SENDRES'] = 'Αποστολή πρώτων υλών';
xLng['BUY'] = 'Αγόρασε';
xLng['SELL'] = 'Πούλησε';
xLng['SENDIGM'] = 'Αποστολή μηνύματος';
xLng['LISTO'] = 'Διαθέσιμο';
xLng['ON'] = 'την';
xLng['AT'] = 'στις';
xLng['EFICIENCIA'] = 'Πληρότητα';
xLng['NEVER'] = 'Ποτέ';
xLng['ALDEAS'] = 'Χωριό(ά)';
xLng['TIEMPO'] = 'Χρόνος';
xLng['OFREZCO'] = 'Προσφέρει';
xLng['BUSCO'] = 'Αναζητεί';
xLng['TIPO'] = 'Τύπος';
xLng['DISPONIBLE'] = 'Μόνο διαθέσιμα';
xLng['CUALQUIERA'] = 'Όλα';
xLng['YES'] = 'Ναι';
xLng['NO'] = 'Όχι';
xLng['LOGIN'] = 'Σύνδεση';
xLng['MARCADORES'] = 'Αγαπημένα';
xLng['ANYADIR'] = 'Προσθήκη';
xLng['UBU'] = 'Νέο αγαπημένο URL';
xLng['UBT'] = 'Κείμενο';
xLng['ELIMINAR'] = 'Διαγραφή';
xLng['MAXTIME'] = 'Μέγιστος χρόνος';
xLng['ARCHIVE'] = 'Αρχείο';
xLng['SUMMARY'] = 'Σύνοψη';
xLng['TROPAS'] = 'Στρατεύματα';
xLng['CHKSCRV'] = 'Αναβάθμιση TBeyond';
xLng['ACTUALIZAR'] = 'Ανανέωσε πληροφορίες χωριού';
xLng['VENTAS'] = 'Αποθηκευμένες Προσφορές';
xLng['MAPSCAN'] = 'Σάρωση του χάρτη';
xLng['BIGICONS'] = 'Εμφάνιση μεγάλων εικονιδίων';
xLng['22'] = 'Εμφάνιση του σημειωματάριου';
xLng['SAVE'] = 'Αποθήκευση';
xLng['49'] = 'Προεπιλογή πλατείας συγκεντρώσεως';
xLng['AT2'] = 'Ενισχύσεις';
xLng['AT3'] = 'Επίθεση: Εισβολή';
xLng['AT4'] = 'Επίθεση: Εισβολή αρπαγής';
xLng['24'] = 'Μέγεθος σημειωματάριου';
xLng['NBSIZEAUTO'] = 'Αυτόματο';
xLng['NBSIZENORMAL'] = 'Κανονικό (μικρό)';
xLng['NBSIZEBIG'] = 'Μεγάλη οθόνη (μεγάλο)';
xLng['25'] = 'Ύψος σημειωματάριου';
xLng['NBAUTOEXPANDHEIGH'] = 'Αυτόματη επέκταση ύψους';
xLng['NBKEEPHEIGHT'] = 'Προεπιλεγμένο ύψος';
xLng['43'] = 'Εμφάνιση κεντρικών αριθμών';
xLng['NPCSAVETIME'] = 'Κερδίζεις: ';
xLng['38'] = 'Δείξε χρώματα για το επίπεδο των πρώτων υλών';
xLng['44'] = 'Δείξε χρώματα για το επίπεδο των κτηρίων';
xLng['65'] = 'Χρώμα όταν υπάρχει διαθέσιμη αναβάθμιση<br>(Προεπιλογή = άδειο)';
xLng['66'] = 'Χρώμα όταν είναι στο επίπεδο<br>(Προεπιλογή = άδειο)';
xLng['67'] = 'Χρώμα όταν δεν υπάρχει διαθέσιμη αναβάθμιση<br>(Προεπιλογή = άδειο)';
xLng['68'] = 'Χρώμα για αναβάθμιση μέσω του NPC<br>(Προεπιλογή = άδειο)';
xLng['TOTALTROOPS'] = 'Συνολικά στρατεύματα χωριού';
xLng['20'] = 'Εμφάνιση σελιδοδεικτών';
xLng['U.2'] = 'Φυλή';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Επιλογή όλων των στρατευμάτων";
xLng['PARTY'] = "Εορταστικές εκδηλώσεις";
xLng['CPPERDAY'] = "Πόντοι Πολιτισμού/μέρα";
xLng['SLOT'] = "Διαθέσιμος χώρος";
xLng['TOTAL'] = "Σύνολο";
xLng['SELECTSCOUT'] = "Ανίχνευση";
xLng['SELECTFAKE'] = "Αντιπερισπασμός";
xLng['NOSCOUT2FAKE'] = "Είναι αδύνατο να χρησιμοποιήσεις ανιχνευτές για αντιπερισπασμό!";
xLng['NOTROOP2FAKE'] = "Δεν υπάρχουν στρατεύματα για αντιπερισπασμό!";
xLng['NOTROOP2SCOUT'] = "Δεν υπάρχουν ανιχνευτές!";
xLng['NOTROOPS'] = "Δεν υπάρχουν στρατεύματα στο χωριό!";
xLng['ALL'] = "Όλα";
xLng['SH2'] = "Στα πεδία χρωμάτων μπορείς να βάλεις:<br>- <b>green</b> ή <b>reb</b> ή <b>orange</b>, κτλ.<br>- κώδικα HEX για χρώμματα όπως <b>#004523</b><br>- άφησε κενό για προεπιλεγμένο χρώμα";
xLng['SHOWORIGREPORT'] = "Δείξε κανονική αναφορά (για ποστάρισμα)";
xLng['56'] = "Δείξε τον τύπο του χωραφιού/της όασης<br>όταν πηγαίνω πάνω με το ποντίκι";
xLng['10'] = "Link για προσομοιωτή μάχης:<br>(αριστερό μενού)";
xLng['WARSIMOPTION1'] = "Εσωτερικός (παρέχεται από το παιχνίδι)";
xLng['WARSIMOPTION2'] = "Εξωτερικός (παρέχεται από το kirilloid.ru)";
xLng['27'] = "Χρήση World Analyser";
xLng['28'] = "Δείξε link για αναλυτικά στατιστικά";
xLng['NONEWVER'] = "Έχεις την νεότερη δυνατή έκδοση";
xLng['BVER'] = "Έχεις δοκιμαστική έκδοση";
xLng['NVERAV'] = 'Διαθέσιμη νέα έκδοση';
xLng['UPDATESCRIPT'] = "Να ενημερωθεί το scipt τώρα;";
xLng['CHECKUPDATE'] = "Έλεγχος για ενημέρωση του script.<br>Παρακαλώ περιμένετε...";
xLng['AVPOPPERVIL'] = "Μέσος πληθυσμός ανα χωριό";
xLng['AVPOPPERPLAYER'] = "Μέσος πληθυσμός ανά παίκτη";
xLng['37'] = "Δείξε τον πίνακα αναβαθμίσεων για τις πρώτες ύλες";
xLng['41'] = "Δείξε τον πίνακα αναβαθμίσεων για τα κτήρια";
xLng['69'] = "Console Log Level<br><b>ΜΟΝΟ ΓΙΑ ΠΡΟΓΡΑΜΜΑΤΑΤΙΣΤΕΣ Ή ΑΠΑΣΦΑΛΜΑΤΩΣΗ</b><br>(Προεπιλογή = 0)";
xLng['48'] = "Αριθμός των σελίδων για φόρτωση<br>μέσα στην αγορά => στην σελίδα 'Αγοράστε'<br>(Προεπιλογή = 1, Μέγιστο = 5)";
xLng['U.3'] = "Όνομα πρωτεύουσας<br><b>Μην το πειράζεις, αν' αυτού επισκέψου το προφίλ σου</b>";
xLng['U.6'] = "Συντεταγμένες πρωτεύουσας<br><b>Μην το πειράζεις, αν' αυτού επισκέψου το προφίλ σου</b>";
xLng['MAX'] = 'Μέγιστο';
xLng['TOTALTROOPSTRAINING'] = 'Συνολικά στρατεύματα σε εκπαίδευση';
xLng['57'] = 'Δείξε αποστάσεις και χρόνους';
xLng['TBSETUPLINK'] = TB3O.shN + ' Ρυθμίσεις';
xLng['UPDATEALLVILLAGES'] = 'Ενημέρωσε όλα τα χωριά. ΧΡΗΣΙΜΟΠΟΙΗΣΕ ΤΟ ΜΕ ΜΕΓΑΛΗ ΠΡΟΣΟΧΗ ΚΑΘΩΣ ΜΠΟΡΕΙ ΝΑ ΑΠΟΒΛΗΘΕΙΣ !!!';
xLng['9'] = "Δείξε επιπλέον link στο αριστερό μενού<br>(Traviantoolbox, World Analyser, Travilog, TravMap, κτλ.)";
xLng['LARGEMAP'] = 'Μεγάλος χάρτης';
xLng['USETHEMPR'] = 'Χρησιμοποίησε τα (αναλογικά)';
xLng['USETHEMEQ'] = 'Χρησιμοποίησε τα (ίσα)';
xLng['TOWNHALL'] = 'Δημαρχείο';
xLng['GAMESERVERTYPE'] = 'Server Παιχνιδιού';
xLng['ACCINFO'] = 'Πληροφορίες λογαριασμού';
xLng['NOTEBLOCKOPTIONS'] = 'Σημειωματάριο';
xLng['MENULEFT'] = 'Μενού στο αριστερό μέρος';
xLng['STATISTICS'] = 'Στατιστικά';
xLng['RESOURCEFIELDS'] = 'Χωράφια πρώτων υλών';
xLng['VILLAGECENTER'] = 'Κέντρο χωριού';
xLng['MAPOPTIONS'] = 'Επιλογές χάρτη';
xLng['COLOROPTIONS'] = 'Επιλογές χρωμάτων';
xLng['DEBUGOPTIONS'] = 'Επιλογές απασφαλμάτωσης';
xLng['4'] = 'Αγορά';
xLng['5'] = '>Πλατεία συγκεντρώσεως/Στρατόπεδο/Εργαστήριο/Στάβλος';
xLng['6'] = "Δημαρχείο/Περιοχή ηρώων/Πανοπλοποιείο/Οπλοποιείο";
xLng['HEROSMANSION'] = "Περιοχή ηρώων";
xLng['BLACKSMITH'] = 'Οπλοποιείο';
xLng['ARMOURY'] = 'Πανοπλοποιείο';
xLng['NOW'] = 'Τώρα';
xLng['CLOSE'] = 'Κλείσιμο';
xLng['USE'] = 'Χρήση';
xLng['USETHEM1H'] = 'Χρησιμοποίησε τα (1 ωριαία παραγωγή)';
xLng['OVERVIEW'] = 'Επισκόπηση';
xLng['FORUM'] = 'Φόρουμ (Forum)';
xLng['ATTACKS'] = 'Επιθέσεις';
xLng['NEWS'] = 'Νέα';
xLng['ADDCRTPAGE'] = 'Πρόσθεσε τρέχουσα σελίδα ως σελιδοδείκτη';
xLng['SCRPURL'] = 'TBeyond website';
xLng['50'] = 'Αριθμός ανιχνευτών για την<br>λειτουργία "Ανίχνευση"';
xLng['SPACER'] = 'Διάστημα';
xLng['53'] = 'Δείξε πληροφορίες στρατιωτών<br>σε παράθυρο συμβουλών';
xLng['MESREPOPTIONS'] = 'Μηνύματα & Αναφορές';
xLng['59'] = 'Αριθμός μηνυμάτων/αναφορών για φόρτωμα<br>(Προεπιλογή =1, Μέγιστο = 5)';
xLng['ATTABLES'] = 'Πίνακες στρατευμάτων';
xLng['MTW'] = 'Χάσιμο';
xLng['MTX'] = 'Υπέρβαση';
xLng['MTC'] = 'Τρέχον φορτίο';
xLng['ALLIANCEFORUMLINK'] = 'Link σε εξωτερικό φόρουμ<br>(’φησε το άδειο για το εσωτερικό φόρουμ)';
xLng['82.L'] = 'Κλείδωσε τους σελιδοδείκτες (κρύψε τα διαγραφή, μετακίνησε πάνω/πάτω εικονίδια)';
xLng['MTCL'] = 'Καθαρισμός';
xLng['82.U'] = 'Ξεκλείδωσε τους σελιδοδείκτες (δείξε τα διαγραφή, μετακίνησε πάνω/πάτω εικονίδια)';
xLng['CLICKSORT'] = 'Κλικ για ταξινόμηση';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Κοινό σε όλα τα χωριά';
xLng['VILLAGELIST'] = 'Λίστα χωριών';
xLng['12'] = "Δείξε τα link 'dorf1.php' και 'dorf2.php'";
xLng['UPDATEPOP'] = 'Ενημέρωσε τον πληθυσμό';
xLng['54'] = 'Δείξε απόσταση και χρόνους στα χωριά<br>σε παράθυρο συμβουλών';
xLng['EDIT'] = 'Επεξεργασία';
xLng['NPCOPTIONS'] = 'Επιλογές του NPC βοηθού';
xLng['26'] = 'Δείξε τους υπολογισμούς/link του NPC βοηθού';
xLng['58'] = 'Δείξε τον πίνακα των παικτών/χωριών/κατειλημένων οάσεων';
xLng['NEWVILLAGEAV'] = 'Ημερομηνία/Ώρα';
xLng['TIMEUNTIL'] = 'Χρόνος να περιμένεις';
xLng['61'] = 'Δείξε τον πίνακα "Διαγραφή" στην σελίδα αναφορών';
xLng['62'] = 'Δείξε το "Αποστολή μηνύματος IGM" εικονίδιο για μένα, επείσης';
xLng['CENTERMAP'] = 'Επικέντρωση χάρτη σε αυτό το χωριό';
xLng['13'] = 'Δείξε το "Επικέντρωση χάρτη σε αυτό το χωριό" εικονίδιο';
xLng['SENDTROOPS'] = 'Αποστολή στρατευμάτων';
xLng['64'] = 'Δείξε λεπτομέρειες στατιστικών στις Αναφορές';
xLng['7'] = "Παλάτι/Μέγαρο/Ακαδημία/Θησαυροφυλάκιο";
xLng['PALACE'] = "Παλάτι";
xLng['RESIDENCE'] = "Μέγαρο";
xLng['ACADEMY'] = "Ακαδημία";
xLng['TREASURY'] = "Θησαυροφυλάκιο";
xLng['45'] = "Δείξε το επίπεδο του κτηρίου που αναβαθμίζεται να αναβοσβήνει";
xLng['60'] = 'Δείξε links για να ανοίγουν τα μυνήματα<br>σε αναδυόμενο παράθυρο';
xLng['36'] = "Εμφάνιση Υπολογισμών 'Μέχρι<br>τότε/Υπόλοιπο' στους πίνακες αναβάθμισης/εκπαίδευσης";
xLng['RESIDUE'] = 'Υπόλοιπο αν χτίσεις';
xLng['RESOURCES'] = ' Ύλες';
break;
case "kr":
//by Daniel Cliff & Sapziller
xLng['1'] = "Travian v2.x 서버";
xLng['2'] = '광고 배너 제거';
xLng['3'] = 'Force T3.1 Legionnaire & Phalanx capacity calculation<br>(for mixed T3.1 & T3.5 servers)';
xLng['4'] = '시장';
xLng['5'] = '집결지/병영/공방/마구간';
xLng['6'] = "마을회관/영웅 저택/병기고/대장간";
xLng['7'] = "궁전/저택/연구소/보물창고";
xLng['8'] = '동맹';
xLng['9'] = "왼쪽 메뉴에 추가 링크 보이기 <br>(Traviantoolbox, World Analyser, Travilog, Map, 등.)";
xLng['10'] = "사용할 전투 시뮬레이터:<br>(왼쪽메뉴)";
xLng['11'] = "글 쓰기를 위해 사용할 보고서 사이트";
xLng['12'] = "'dorf1.php(마을 둘러보기)' 과 'dorf2.php(마을 중심)' 링크 보이기";
xLng['13'] = '"중앙 지도" 아이콘 보이기';
xLng['14'] = "마을 목록에 '부대 보내기/자원 보내기' 아이콘 보이기";
xLng['15'] = "마을 목록에 시간당 자원 생산량 보이기";
xLng['16'] = "마을 목록에 실제 농작물 생산량 보이기";
xLng['17'] = "마을 목록에 인구 수 보이기";
xLng['18'] = '마을 목록 창을 이동 가능한 창으로 보이기';
xLng['19'] = '마을 목록에 건물 짓기 상황과 부대 이동 상황 보이기';
xLng['20'] = '북마크 보이기';
xLng['21'] = "'북마크'를 이동 가능한 창으로 보이기";
xLng['22'] = '노트 보이기';
xLng['23'] = "'노트'를 이동 가능한 창으로 보이기";
xLng['24'] = '노트 크기';
xLng['25'] = '노트 높이';
xLng['26'] = 'NPC 교역 링크 및 계산값 보이기';
xLng['27'] = "사용할 World Analyser";
xLng['28'] = "World Analyser 통계 링크 보이기";
xLng['29'] = '사용할 Map Analyser';
xLng['30'] = '사용자의 지도 상 위치 링크 보이기';
xLng['31'] = '동맹원의 지도 상 위치 링크 보이기';
xLng['32'] = "'찾기 바' 보이기";
xLng['33'] = "'찾기 바'를 이동 가능한 창으로 보이기";
xLng['34'] = "업그레이드 테이블에 하루 당 문화점수 획득 정보 보이기";
xLng['35'] = "업그레이드 테이블에 작물 소비량 증가 보이기";
xLng['36'] = "업그레이드/훈련 테이블에 예상 자원과 건축/업그레이드 후 남는 예상 자원 표시";
xLng['37'] = "자원 필드에 업그레이드 테이블 보이기";
xLng['38'] = '자원필드 레벨 색 보이기';
xLng['39'] = "'자원 바' 테이블 보이기";
xLng['40'] = "'자원 바' 테이블을 이동 가능한 창으로 보이기";
xLng['41'] = "건물에 업그레이드 테이블 보이기";
xLng['42'] = '업그레이드 테이블의 건물 정보를 이름순으로 정렬';
xLng['43'] = '마을 건물에 레벨 보이기';
xLng['44'] = '빌딩 레벨 색 보이기';
xLng['45'] = "업그레이드 중인 건물의 레벨 깜빡이기";
xLng['46'] = "상인이 도착했을 때 총 자원 정보 보이기";
xLng['47'] = "마지막으로 운반한 자원량 보이기";
xLng['48'] = "'장터 => 구입' 선택시 미리 읽어들일 제안 페이지 수 (기본값 = 1)";
xLng['49'] = '집결지 기본 행동 설정';
xLng['50'] = '"정찰병 선택"에 사용할 수 있는 정찰병의 수';
xLng['51'] = "마지막 공격 설정 보이기";
xLng['52'] = "마지막 공격 대상 좌표 보이기/사용하기";
xLng['53'] = '툴팁에 부대 정보 보이기';
xLng['54'] = '툴팁에 마을까지의 거리와 시간 보이기';
xLng['55'] = "내장 전투 시뮬레이터에 사용 가능한 부대 내역을 자동으로 채우기";
xLng['56'] = "지도 위에 마우스를 올리면 지역의 종류와 오아시스 정보 보이기";
xLng['57'] = '거리와 시간 보이기';
xLng['58'] = '사용자/마을/차지한 오아시스에 대한 목록 보이기';
xLng['59'] = '미리 읽어들일 메시지와 보고서 페이지의 수 (기본값 = 1)';
xLng['60'] = '메시지/리포트를 팝업창으로 보기 위한 아이콘 보이기';
xLng['61'] = '보고서 페이지에 "모두보기 삭제" 보이기';
xLng['62'] = '자기 자신에게도 "메시지 보내기" 아이콘 표시';
xLng['63'] = 'TB3 확장 전투보고서 보이기';
xLng['64'] = '보고서 통계에 세부 사항 보이기';
xLng['65'] = '색 : 업그레이드 가능(기본값 = 빈 칸)';
xLng['66'] = '색 : 최고 레벨 (기본값 = 빈 칸)';
xLng['67'] = '색 : 업그레이드 불가능(기본값 = 빈 칸)';
xLng['68'] = '색 : NPC거래 후 업그레이드 가능(기본값 = 빈 칸)';
xLng['69'] = "Console Log 표시 등급 설정<br>주의: 개발자나 디버깅 용도로만 사용해야 함(기본값 = 0)";
xLng['82.L'] = '북마크 잠금(삭제, 위로 이동, 아래로 이동 아이콘 숨김)';
xLng['82.U'] = '북마크 잠금 해제(삭제, 위로 이동, 아래로 이동 아이콘 보이기)';
xLng['SIM'] = '전투 시뮬레이터';
xLng['QSURE'] = '확실합니까?';
xLng['LOSS'] = '손실';
xLng['PROFIT'] = '이득';
xLng['EXTAV'] = '확장 가능';
xLng['PLAYER'] = '플레이어';
xLng['VILLAGE'] = '마을';
xLng['POPULATION'] = '인구';
xLng['COORDS'] = '좌표';
xLng['MAPTBACTS'] = '행동';
xLng['SAVED'] = '저장됨';
xLng['YOUNEED'] = '필요';
xLng['TODAY'] = '오늘';
xLng['TOMORROW'] = '내일';
xLng['DAYAFTERTOM'] = '모레';
xLng['MARKET'] = '시장';
xLng['BARRACKS'] = '병영';
xLng['RALLYPOINT'] = '집결지';
xLng['STABLE'] = '마구간';
xLng['WORKSHOP'] = '공방';
xLng['SENDRES'] = '자원 보내기';
xLng['BUY'] = '구입';
xLng['SELL'] = '판매';
xLng['SENDIGM'] = '메시지 보내기';
xLng['LISTO'] = '가능한';
xLng['ON'] = '날짜';
xLng['AT'] = '시간';
xLng['EFICIENCIA'] = '효율';
xLng['NEVER'] = '불가능';
xLng['ALDEAS'] = '마을(들)';
xLng['TIEMPO'] = '시간';
xLng['OFREZCO'] = '제안';
xLng['BUSCO'] = '검색';
xLng['TIPO'] = '종류';
xLng['DISPONIBLE'] = '가능한 거래만 표시';
xLng['CUALQUIERA'] = '모두';
xLng['YES'] = '네';
xLng['NO'] = '아니오';
xLng['LOGIN'] = '로그인';
xLng['MARCADORES'] = '북마크';
xLng['ANYADIR'] = '추가';
xLng['UBU'] = '새 북마크 주소';
xLng['UBT'] = '새 북마크 이름';
xLng['ELIMINAR'] = '삭제';
xLng['MAPA'] = '지도';
xLng['MAXTIME'] = '최대 시간';
xLng['ARCHIVE'] = '보관';
xLng['SUMMARY'] = '요약';
xLng['TROPAS'] = '부대';
xLng['CHKSCRV'] = 'TBeyond 업데이트';
xLng['ACTUALIZAR'] = '마을 정보 업데이트';
xLng['VENTAS'] = '저장된 판매리스트';
xLng['MAPSCAN'] = '지도 검색';
xLng['BIGICONS'] = '상단 메뉴 추가 아이콘 보이기';
xLng['SAVE'] = '저장';
xLng['AT2'] = '지원';
xLng['AT3'] = '공격: 통상';
xLng['AT4'] = '공격: 약탈';
xLng['NBSIZEAUTO'] = '자동';
xLng['NBSIZENORMAL'] = '보통 (작음)';
xLng['NBSIZEBIG'] = '큰 스크린 (큼)';
xLng['NBAUTOEXPANDHEIGHT'] = '높이 자동 설정';
xLng['NBKEEPHEIGHT'] = '기본 높이';
xLng['NPCSAVETIME'] = '저장: ';
xLng['TOTALTROOPS'] = '모든 마을 병력 총합';
xLng['U.2'] = '종족';
xLng['SELECTALLTROOPS'] = "부대 모두 선택";
xLng['PARTY'] = "잔치";
xLng['CPPERDAY'] = "문화점수/일";
xLng['SLOT'] = "슬롯";
xLng['TOTAL'] = "총합";
xLng['SELECTSCOUT'] = "정찰병 선택";
xLng['SELECTFAKE'] = "위장 공격";
xLng['NOSCOUT2FAKE'] = "정찰병은 위장 공격을 위해 사용할 수 없습니다!";
xLng['NOTROOP2FAKE'] = "위장 공격을 위해 사용할 수 있는 부대가 없습니다!";
xLng['NOTROOP2SCOUT'] = "정찰을 위해 사용할 수 있는 부대가 없습니다!";
xLng['NOTROOPS'] = "마을에 부대가 없습니다!";
xLng['ALL'] = "모두";
xLng['SH2'] = "색상 필드에 입력할 수 있는 값:<br>- green, red 혹은 orange 등의 영어 색상 단어.<br>- #004523 같은 HEX 색상 코드<br>- 빈 칸으로 두면 기본 색상 적용";
xLng['SHOWORIGREPORT'] = "원래의 보고서 형식으로 보이기(글쓰기용)";
xLng['WARSIMOPTION1'] = "내부 (게임에서 제공)";
xLng['WARSIMOPTION2'] = "외부 (kirilloid.ru 에서 제공)";
xLng['U.3'] = '수도 이름<br>업데이트를 위해 프로필 페이지를 방문해 주세요';
xLng['NONEWVER'] = "이미 최신 버젼이 설치되어 있습니다.";
xLng['BVER'] = "베타 버젼이 설치되어 있습니다.";
xLng['NVERAV'] = "새 버젼의 스크립트를 사용하실 수 있습니다.";
xLng['UPDATESCRIPT'] = "지금 스크립트를 업그레이드 하시겠습니까?";
xLng['CHECKUPDATE'] = "스크립트 업데이트를 확인하고 있습니다.<br> 기다려 주십시오...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "마을 당 평균 인구 수";
xLng['AVPOPPERPLAYER'] = "사용자 당 평균 인구 수";
xLng['U.6'] = '수도의 좌표<br>업데이트를 위해 프로필 페이지를 방문해 주세요';
xLng['MAX'] = '최대';
xLng['TOTALTROOPSTRAINING'] = '훈련 중인 병사 수';
xLng['TBSETUPLINK'] = TB3O.shN + ' 설정';
xLng['UPDATEALLVILLAGES'] = '모든 마을 정보 갱신. <br>경고: 이 명령어 사용시 밴 당할 수 있으므로 주의해야 합니다!';
xLng['LARGEMAP'] = '큰 지도';
xLng['USETHEMPR'] = '비율';
xLng['USETHEMEQ'] = '동일한 양';
xLng['TOWNHALL'] = '마을회관';
xLng['GAMESERVERTYPE'] = '게임 서버';
xLng['ACCINFO'] = '결제 정보';
xLng['NOTEBLOCKOPTIONS'] = '노트';
xLng['MENULEFT'] = '왼쪽 메뉴';
xLng['STATISTICS'] = '통계';
xLng['RESOURCEFIELDS'] = '자원 필드';
xLng['VILLAGECENTER'] = '마을 중심';
xLng['MAPOPTIONS'] = '지도 옵션';
xLng['COLOROPTIONS'] = '색상 옵션';
xLng['DEBUGOPTIONS'] = '디버그 옵션';
xLng['HEROSMANSION'] = "영웅 저택";
xLng['BLACKSMITH'] = '대장간';
xLng['ARMOURY'] = '병기고';
xLng['NOW'] = '지금';
xLng['CLOSE'] = 'Close';
xLng['USE'] = '사용';
xLng['USETHEM1H'] = '1시간 생산량';
xLng['OVERVIEW'] = '정보';
xLng['FORUM'] = '포럼';
xLng['ATTACKS'] = '전투 기록';
xLng['NEWS'] = '소식';
xLng['ADDCRTPAGE'] = '지금 페이지를 추가';
xLng['SCRPURL'] = 'TBeyond 홈페이지';
xLng['SPACER'] = '구분자 추가';
xLng['MESREPOPTIONS'] = '메시지 & 보고서';
xLng['ATTABLES'] = '부대 테이블';
xLng['MTW'] = '낭비';
xLng['MTX'] = '초과';
xLng['MTC'] = '현재 운반양';
xLng['ALLIANCEFORUMLINK'] = '외부 포럼에 연결<br>(빈 칸으로 두면 내부 포럼에 연결)';
xLng['MTCL'] = '모두 초기화';
xLng['CLICKSORT'] = '정렬';
xLng['MIN'] = '최소';
xLng['SAVEGLOBAL'] = '마을간 공유';
xLng['VILLAGELIST'] = '마을 목록';
xLng['UPDATEPOP'] = '인구 업데이트';
xLng['EDIT'] = '편집';
xLng['NPCOPTIONS'] = 'NPC 교역 옵션';
xLng['NEWVILLAGEAV'] = '날짜/시간';
xLng['TIMEUNTIL'] = '대기 시간';
xLng['CENTERMAP'] = '중앙 지도';
xLng['SENDTROOPS'] = '부대 보내기';
xLng['PALACE'] = "궁전";
xLng['RESIDENCE'] = "저택";
xLng['ACADEMY'] = "연구소";
xLng['TREASURY'] = "보물창고";
xLng['UPGTABLES'] = "자원 필드/건물 업그레이드 테이블";
xLng['RESBARTABLETITLE'] = "자원 바";
xLng['RESIDUE'] = '건축 명령 후 남게 될 예상 자원 ';
xLng['RESOURCES'] = '예상 획득 자원';
xLng['SH1'] = "수도 및 각 마을 좌표 자동 인식을 위해 프로필을 확인해 주세요<br>종족 자동 인식을 위해 병영을 지은 후 마을 중심을 열어 주세요";
xLng['RESEND'] = "다시 보내기";
xLng['WSI'] = "게임에서 제공하는 전투 시뮬레이터";
xLng['TTT'] = "General troops/distance tooltips";
break;
case "my":
//by Light@fei & dihaz06-47
xLng['8'] = 'Persekutuan';
xLng['SIM'] = 'Simulator Peperangan';
xLng['QSURE'] = 'Adakah anda pasti?';
xLng['LOSS'] = 'Kerugian';
xLng['PROFIT'] = 'Keuntungan';
xLng['EXTAV'] = 'Boleh dibesarkan';
xLng['PLAYER'] = 'Pemain';
xLng['VILLAGE'] = 'Kampung';
xLng['POPULATION'] = 'Populasi';
xLng['COORDS'] = 'Koordinat';
xLng['MAPTBACTS'] = 'Aksi';
xLng['SAVED'] = 'Disimpan';
xLng['YOUNEED'] = 'Anda Perlu';
xLng['TODAY'] = 'Hari ini';
xLng['TOMORROW'] = 'Esok';
xLng['DAYAFTERTOM'] = 'Lusa';
xLng['MARKET'] = 'Pasar';
xLng['BARRACKS'] = 'Berek';
xLng['RALLYPOINT'] = 'Titik Perhimpunan';
xLng['STABLE'] = 'Kandang Kuda';
xLng['WORKSHOP'] = 'Bengkel';
xLng['SENDRES'] = 'Hantarkan Sumber-sumber';
xLng['BUY'] = 'Beli';
xLng['SELL'] = 'Tawar';
xLng['SENDIGM'] = 'Hantar IGM';
xLng['LISTO'] = 'Ada';
xLng['ON'] = 'pada';
xLng['AT'] = 'di';
xLng['EFICIENCIA'] = 'Kecekapan';
xLng['NEVER'] = 'Tidak pernah';
xLng['ALDEAS'] = 'Kampung(-kampung)';
xLng['TIEMPO'] = 'Masa';
xLng['OFREZCO'] = 'Menawar';
xLng['BUSCO'] = 'Mencari';
xLng['TIPO'] = 'Jenis';
xLng['DISPONIBLE'] = 'Hanya Ada';
xLng['CUALQUIERA'] = 'Mana-mana';
xLng['YES'] = 'Ya';
xLng['NO'] = 'Tidak';
xLng['LOGIN'] = 'Log Masuk';
xLng['MARCADORES'] = 'Bookmark';
xLng['ANYADIR'] = 'Tambah';
xLng['UBU'] = 'URL Bookmark Baru';
xLng['UBT'] = 'Teks Bookmark Baru';
xLng['ELIMINAR'] = 'Padam';
xLng['MAPA'] = 'Peta';
xLng['MAXTIME'] = 'Masa Maksimum';
xLng['ARCHIVE'] = 'Arkib';
xLng['SUMMARY'] = 'Rumusan';
xLng['TROPAS'] = 'Askar-askar';
xLng['CHKSCRV'] = 'Kemaskini TBeyond';
xLng['ACTUALIZAR'] = 'Kemaskini informasi kampung';
xLng['VENTAS'] = 'Tawaran tersimpan';
xLng['MAPSCAN'] = 'Imbaskan Peta';
xLng['BIGICONS'] = 'Tunjukkan lebih ikon';
xLng['22'] = 'Tunjukkan blok nota';
xLng['SAVE'] = 'Simpan';
xLng['49'] = 'Aksi Titik perhimpunan';
xLng['AT2'] = 'Bantuan';
xLng['AT3'] = 'Serangan: Normal';
xLng['AT4'] = 'Serangan: Serbuan';
xLng['24'] = 'Saiz blok nota';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normal (kecil)';
xLng['NBSIZEBIG'] = 'Skrin besar (besar)';
xLng['25'] = 'Ketinggian blok nota';
xLng['NBAUTOEXPANDHEIGHT'] = 'Laras Tinggi Automatik';
xLng['NBKEEPHEIGHT'] = 'Ketinggian Default';
xLng['43'] = 'Tunjukkan nombor-nombor di pusat kampung';
xLng['NPCSAVETIME'] = 'Jimat: ';
xLng['38'] = 'Tunjukkan warna-warna tahap sumber';
xLng['44'] = 'Tunjukkan warna-warna tahap bangunan';
xLng['65'] = 'Warna naiktaraf ada<br>(Default = Kosong)';
xLng['66'] = 'Warna tahap maksimum<br>(Default = Kosong)';
xLng['67'] = 'Warna naiktaraf tak mungkin<br>(Default = Kosong)';
xLng['68'] = 'Warna naiktaraf menggunakan NPC<br>(Default = Kosong)';
xLng['TOTALTROOPS'] = 'Jumlah askar-askar dalam kampung';
xLng['20'] = 'Tunjukkan bookmarks';
xLng['U.2'] = 'Puak';
xLng['1'] = "Server Travian v2.x";
xLng['SELECTALLTROOPS'] = "Pilihkan semua askar";
xLng['PARTY'] = "Perayaan";
xLng['CPPERDAY'] = "MB/hari";
xLng['SLOT'] = "Slot";
xLng['TOTAL'] = "Jumlah";
xLng['SELECTSCOUT'] = "Pilihkan peninjau";
xLng['SELECTFAKE'] = "Pilihkan fake";
xLng['NOSCOUT2FAKE'] = "Adalah mustahil menggunakan peninjau untuk serangan fake !";
xLng['NOTROOP2FAKE'] = "Tiada askar untuk serangan fake!";
xLng['NOTROOP2SCOUT'] = "Tiada unit peninjau !";
xLng['NOTROOPS'] = "Tiada askar-askar didalam kampung !";
xLng['ALL'] = "Semua";
xLng['SH2'] = "Didalam ruang warna anda boleh memasuskkan:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>-  Kod warna HEX seperti<b>#004523</b><br>- Tinggalkan kosong untuk warna default";
xLng['SHOWORIGREPORT'] = "Tunjukkan laporan original (untuk dipost)";
xLng['56'] = "Tunjukkan informasi jenis petak/oasis <br>semasa meletakkan cursor diatas peta";
xLng['10'] = "Link simulator peperangan untuk digunakan:<br>(menu disebelah kiri)";
xLng['WARSIMOPTION1'] = "Dalaman (disediakan oleh permainan)";
xLng['WARSIMOPTION2'] = "Luaran (disediakan oleh kirilloid.ru)";
xLng['27'] = "World Analyser untuk digunakan";
xLng['28'] = "Tunjukkan link penganalisa statistik";
xLng['NONEWVER'] = "Anda mempunyai versi yang terbaru";
xLng['BVER'] = "Anda mempunyai versi beta";
xLng['NVERAV'] = "A Terdapat versi skrip yang lebih baru";
xLng['UPDATESCRIPT'] = "Kemaskini skrip sekarang ?";
xLng['CHECKUPDATE'] = "Memeriksa untuk kemaskini skrip.<br>Sila tunggu...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Populasi purata per kampung";
xLng['AVPOPPERPLAYER'] = "Populasi purata per pemain";
xLng['37'] = "Tunjukkan jadual naiktaraf tapak sumber";
xLng['41'] = "Tunjukkan jadual naiktaraf bangunan";
xLng['48'] = "Jumlah mukasurat tawaran untuk dipreload<br>Semasa di 'Pasar => Mukasurat beli' <br>(Default = 1)";
xLng['U.3'] = 'Namakan ibukota anda<br><b>Lawat Profile anda untuk kemaskini</b>';
xLng['U.6'] = 'Koordinat ibukota<br><b>Lawat Profile anda untuk kemaskini</b>';
xLng['MAX'] = 'Maksimum';
xLng['TOTALTROOPSTRAINING'] = 'Jumlah askar sedang dilatih';
xLng['57'] = 'Tunjukkan jarak & masa';
xLng['TBSETUPLINK'] = 'Setup ' + TB3O.shN;
xLng['UPDATEALLVILLAGES'] = 'Kemaskini semua kampung.  GUNAKAN DENGAN BERHATI-HATI KERANA INI BOLEH MEMBAWA KEPADA PEMBEKUAN AKAUN ANDA !';
xLng['9'] = "Tunjukkan link tambahan di menu sebelah kiri<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Peta Besar';
xLng['USETHEMPR'] = 'Guna (Dalam Peratus)';
xLng['USETHEMEQ'] = 'Guna (Samarata)';
xLng['TOWNHALL'] = 'Dewan Perbandaran';
xLng['GAMESERVERTYPE'] = 'Server dunia permainan';
xLng['ACCINFO'] = 'Informasi Akaun';
xLng['NOTEBLOCKOPTIONS'] = 'Tiadablok';
xLng['MENULEFT'] = 'Menu di sebelah kiri';
xLng['STATISTICS'] = 'Statistik';
xLng['RESOURCEFIELDS'] = 'Tapak sumber';
xLng['VILLAGECENTER'] = 'Pusat Kampung';
xLng['MAPOPTIONS'] = 'Pilihan peta';
xLng['COLOROPTIONS'] = 'Pilihan warna';
xLng['DEBUGOPTIONS'] = 'Pilihan debug';
xLng['4'] = 'Pasar';
xLng['5'] = 'Titik perhimpunan/Berek/Bengkel/Kandang kuda';
xLng['6'] = "Dewan perbandaran/Rumah agam wira/Kedai perisai/Kedai senjata";
xLng['HEROSMANSION'] = "Rumah Agam Wira";
xLng['BLACKSMITH'] = 'Kedai Senjata';
xLng['ARMOURY'] = 'Kedai Perisai';
xLng['NOW'] = 'Sekarang';
xLng['CLOSE'] = 'Tutup';
xLng['USE'] = 'Guna';
xLng['USETHEM1H'] = 'Guna (Produksi sejam)';
xLng['OVERVIEW'] = 'Keseluruhan';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Serangan';
xLng['NEWS'] = 'Berita';
xLng['ADDCRTPAGE'] = 'Tambahkan mukasurat sekarang';
xLng['SCRPURL'] = 'Mukasurat TBeyond';
xLng['50'] = 'Bilangan peninjau untuk fungsi<br>"Pilihkan peninjau"';
xLng['SPACER'] = 'Penambah jarak';
xLng['53'] = 'Tunjukkan informasi askar-askar di tooltips';
xLng['MESREPOPTIONS'] = 'Mesej & Laporan';
xLng['59'] = 'Bilangan mukasurat mesej/laporan untuk dipreload<br>(Default = 1)';
xLng['ATTABLES'] = 'Jadual askar-askar';
xLng['MTW'] = 'Dibazirkan';
xLng['MTX'] = 'Melebihi';
xLng['MTC'] = 'Kapasiti sekarang';
xLng['ALLIANCEFORUMLINK'] = 'Linkkan ke forum luaran<br>(Tinggalkan kosong untuk forum dalaman)';
xLng['82.L'] = 'Kunci bookmark (Sorokkan ikon padam, keatas, kebawah)';
xLng['MTCL'] = 'Padamkan semua';
xLng['82.U'] = 'Buka kunci bookmark (Tunjukkan ikon padam, keatas, kebawah)';
xLng['CLICKSORT'] = 'Klikkan untuk membahagi';
xLng['MIN'] = 'Minimum';
xLng['SAVEGLOBAL'] = 'Kongsikan antara kampung';
xLng['VILLAGELIST'] = 'List kampung-kampung';
xLng['12'] = "Tunjukkan link 'dorf1.php' and 'dorf2.php'";
xLng['UPDATEPOP'] = 'Kemaskini populasi';
xLng['54'] = 'Tunjukkan jarak dan masa kepada sesuatu kampung di tooltips';
xLng['EDIT'] = 'Edit';
xLng['NPCOPTIONS'] = 'Pilihan Pembantu NPC';
xLng['26'] = 'Tunjukkan pengiraan/link Pembantu NPC';
xLng['58'] = 'Tunjukkan jadual pemain/kampung/oasis berpenduduk';
xLng['NEWVILLAGEAV'] = 'Tarikh/Masa';
xLng['TIMEUNTIL'] = 'Masa untuk menunggu';
xLng['61'] = 'Tunjukkan jadual "Padam semua" di mukasurat laporan';
xLng['62'] = 'Tunjukkan ikon "Hantar IGM" kepada saya juga';
xLng['CENTERMAP'] = 'Ketengahkan peta untuk kampung ini';
xLng['13'] = 'Tunjukkan ikon "Ketengahkan peta untuk kampung ini" ';
xLng['SENDTROOPS'] = 'Hantarkan askar-askar';
xLng['64'] = 'Tunjukkan detail di dalam Statistic Laporan';
xLng['7'] = "Istana/Residen/Akademi/Perbendaharaan";
xLng['PALACE'] = "Istana";
xLng['RESIDENCE'] = "Residen";
xLng['ACADEMY'] = "Akademi";
xLng['TREASURY'] = "Perbendaharaan";
xLng['45'] = "Tunjukkan level berkedip untuk bangunan yang sedang dinaiktaraf";
xLng['14'] = "Tunjukkan ikon 'Hantar askar-askar/Hantar sumber-sumber' didalam list kampung";
xLng['34'] = "Tunjukkan informasi MB/Hari di dalam jadual naiktaraf";
xLng['UPGTABLES'] = " Jadual naiktaraf Tapak sumber/Bangunan";
xLng['35'] = "Tunjukkan penggunaan makanan didalam jadual naik taraf";
xLng['16'] = "Tunjukkan produksi tanaman efektif di dalam list kampung";
xLng['39'] = "Tunjukkan jadual bar sumber";
xLng['RESBARTABLETITLE'] = "Bar Sumber";
xLng['60'] = 'Tunjukkan link untuk membuka mesej sebagai pop-up';
break;
case "lv":
//
xLng['8'] = 'Alianse';
xLng['SIM'] = 'Kaujas simulātors';
xLng['QSURE'] = 'Vai esi pārliecināts?';
xLng['LOSS'] = 'Zaudējumi';
xLng['PROFIT'] = 'Guvums';
xLng['EXTAV'] = 'Celšana pieejama';
xLng['PLAYER'] = 'Spēlētājs';
xLng['VILLAGE'] = 'Ciems';
xLng['POPULATION'] = 'Populācija';
xLng['COORDS'] = 'Koordinātes';
xLng['MAPTBACTS'] = 'Notikumi';
xLng['SAVED'] = 'Saglabāts';
xLng['YOUNEED'] = 'Nepieciešams';
xLng['TODAY'] = 'šodien';
xLng['TOMORROW'] = 'rītdien';
xLng['DAYAFTERTOM'] = 'aizparīt';
xLng['MARKET'] = 'Tirgus';
xLng['BARRACKS'] = 'Kazarmas';
xLng['RALLYPOINT'] = 'Mītiņa vieta';
xLng['STABLE'] = 'Stallis';
xLng['WORKSHOP'] = 'Darbnīca';
xLng['SENDRES'] = 'Sūtīt resursus';
xLng['BUY'] = 'Pirkt';
xLng['SELL'] = 'Pārdot';
xLng['SENDIGM'] = 'Sūtīt ziņu';
xLng['LISTO'] = 'Pieejams';
xLng['ON'] = 'ap';
xLng['AT'] = 'ap';
xLng['EFICIENCIA'] = 'Lietderība';
xLng['NEVER'] = 'Ne tagad';
xLng['ALDEAS'] = 'Ciemi';
xLng['TIEMPO'] = 'Laiks';
xLng['OFREZCO'] = 'Piedāvājumi';
xLng['BUSCO'] = 'Meklē';
xLng['TIPO'] = 'Tips';
xLng['DISPONIBLE'] = 'Tikai pieejamos';
xLng['CUALQUIERA'] = 'Jebkurš';
xLng['YES'] = 'Jā';
xLng['NO'] = 'Nē';
xLng['LOGIN'] = 'Ieiet';
xLng['MARCADORES'] = 'Saglabātās saites';
xLng['ANYADIR'] = 'Pievienot';
xLng['UBU'] = 'Jaunās saites URL';
xLng['UBT'] = 'Jaunās saites nosaukums';
xLng['ELIMINAR'] = 'Dzēst';
xLng['MAPA'] = 'Karte';
xLng['MAXTIME'] = 'Maksimālais laiks';
xLng['ARCHIVE'] = 'Arhīvs';
xLng['SUMMARY'] = 'Pārskats';
xLng['TROPAS'] = 'Karavīri';
xLng['CHKSCRV'] = 'Atjaunot versiju';
xLng['ACTUALIZAR'] = 'Atjaunot ciema informāciju';
xLng['VENTAS'] = 'Saglabātie piedāvājumi';
xLng['MAPSCAN'] = 'Meklēt kartē';
xLng['BIGICONS'] = 'Rādīt papildus ikonas';
xLng['22'] = 'Rādīt pierakstu blociņu';
xLng['SAVE'] = 'Saglabāt';
xLng['49'] = 'Mītiņa vietas noklusētā darbība';
xLng['AT2'] = 'Papildspēki';
xLng['AT3'] = 'Uzbrukums: Parasts';
xLng['AT4'] = 'Uzbrukums: Iebrukums';
xLng['24'] = 'Piezīmju blociņa izmērs';
xLng['NBSIZEAUTO'] = 'Automātisks';
xLng['NBSIZENORMAL'] = 'Normāls (mazais)';
xLng['NBSIZEBIG'] = 'Platiem ekrāniem (lielais)';
xLng['25'] = 'Pierakstu blociņa augstums';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automātiski izstiepts augstums';
xLng['NBKEEPHEIGHT'] = 'Noklusētais augstums';
xLng['43'] = 'Numurus rādīt centrētus';
xLng['NPCSAVETIME'] = 'Saglabāt:';
xLng['38'] = 'Rādīt resursu līmeņu krāsas';
xLng['44'] = 'Rādīt celtņu līmeņu krāsas';
xLng['65'] = 'Krāsa: Iespējams uzlabot<br>(Noklusētais = Tukšs)';
xLng['66'] = 'Krāsa: Maksimālā līmeņa krāsa l<br>(Noklusētais = Tukšs)';
xLng['67'] = 'Krāsa: Līmeni nevar uzlabot<br>( Noklusētais = Tukšs)';
xLng['68'] = 'Krāsa: Uzlabošana caur NPC<br>( Noklusētais = Tukšs)';
xLng['TOTALTROOPS'] = 'Kopējais karaspēka skaits';
xLng['20'] = 'Rādīt saglabātās saites';
xLng['U.2'] = 'Rase';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Izvēlēties visu karaspēku";
xLng['PARTY'] = "Svinības";
xLng['CPPERDAY'] = "Kultūras punkti/Dienā";
xLng['SLOT'] = "Vieta";
xLng['TOTAL'] = "Kopā";
xLng['SELECTSCOUT'] = "Izvēlieties izlūku";
xLng['SELECTFAKE'] = "Izvēlieties ne-īsto";
xLng['NOSCOUT2FAKE'] = "Nav iespējams izmantot skautus kā māņu uzbrukumu!";
xLng['NOTROOP2FAKE'] = "Jums nav karaspēka, lai izpildītu māņu uzbrukumu!";
xLng['NOTROOP2SCOUT'] = "Nav karspēka, lai veiktu izspiegošanu !";
xLng['NOTROOPS'] = "Jums šajā ciema nav karaspēka!";
xLng['ALL'] = "Visi";
xLng['SH2'] = "Krāsu laukumos varat ievadīt šādas krāsas:<br>- <b>green</b> vai <b>red</b> vai  <b>orange</b>, utt.<br>- kā arī krāsu kodus <b>#004523</b><br>- vai arī atstājat tukšu, lai izmantotu noklusētās krāsas";
xLng['SHOWORIGREPORT'] = "Rādīt oriģinālo ziņojumu (priekš kopēšanas utt)";
xLng['56'] = "Rādīt sūnas tipu/oāzes informācijuShow <br>while kamēr peles kursors ir uz kartes";
xLng['10'] = "Kaujas simulatora saite:<br>(kreisā izvēlnes josla)";
xLng['WARSIMOPTION1'] = "Iekšējais (nodrošinājusi spēle)";
xLng['WARSIMOPTION2'] = "Ārējais (nodršinājis kirilloid.ru)";
xLng['27'] = "Pasaules analīze";
xLng['28'] = "Rādīt analīzes ikonu pie saitēm";
xLng['NONEWVER'] = "Jūs jau lietojat pēdējo " + TB3O.shN + " versiju";
xLng['BVER'] = "Jūs varat lietot arī Beta versiju";
xLng['NVERAV'] = "Jaunākā skripta versija ir pieejama";
xLng['UPDATESCRIPT'] = "Atjaunot skriptu tagad?";
xLng['CHECKUPDATE'] = "Meklēju skripta jauninājumu.<br>Lūdzu uzgaidiet...";
xLng['CROPFINDER'] = "Labības lauku meklētajs";
xLng['AVPOPPERVIL'] = "Vidējā populācija pret ciemu";
xLng['AVPOPPERPLAYER'] = "Vidējā populācija pret spēlētāju";
xLng['37'] = "Rādīt resursu līmeņu tabulu";
xLng['41'] = "Rādīt celtņu līmeņu tabulu";
xLng['69'] = "Konsules Log līmenis<br>TIKAI PRIEKŠ PROGRAMĒTĀJIEM  VAI KĻŪDU NOVĒRŠANAS<br>(Noklusētais = 0)";
xLng['48'] = "Piedāvājumu lapu skaits <br>kamēr ‘Tirgus => Pirkt' page<br>(Noklusētais = 1)";
xLng['U.3'] = 'Galvaspilsētas nosaukums<br><b>Apmeklē savu profilu</b>';
xLng['U.6'] = 'Galvaspilsētas koordinātes<br><b> Apmeklē savu profilu</b>';
xLng['MAX'] = 'Maksimālais';
xLng['TOTALTROOPSTRAINING'] = 'Kopējais karaspēka skaits, kas tiek trenēts';
xLng['57'] = 'Rādīt distanci un laiku';
xLng['TBSETUPLINK'] = TB3O.shN + ' opcijas';
xLng['UPDATEALLVILLAGES'] = 'Uzlabot visus ciemus. ŠO LABĀK NEIZMANTOT, JO TAS VAR NOVEST PIE KONTA BLOĶĒŠANAS';
xLng['9'] = "Rādīt papildus saites kreisajā izvēlnes joslā<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Lielā karte';
xLng['USETHEMPR'] = 'Lietot tos (proporcionāli)';
xLng['USETHEMEQ'] = 'Lietot tos (vienlīdzīgi)';
xLng['TOWNHALL'] = 'Rātsnams';
xLng['GAMESERVERTYPE'] = 'Spēles serveris';
xLng['NOTEBLOCKOPTIONS'] = 'Pierakstu blociņs';
xLng['MENULEFT'] = 'Kreisās puses izvēles josla';
xLng['STATISTICS'] = 'Statistika';
xLng['RESOURCEFIELDS'] = 'Resursu lauki';
xLng['VILLAGECENTER'] = 'Ciema centrs';
xLng['MAPOPTIONS'] = 'Kastes iestatījumi';
xLng['COLOROPTIONS'] = 'Krāsu iestatījumi';
xLng['DEBUGOPTIONS'] = 'Kļūdu ziņojumu iestatījumi';
xLng['4'] = 'Tirgus';
xLng['5'] = 'Mītiņa vieta/Kazarmas/Darbnīca/Stallis';
xLng['6'] = "Rātsnams/Varoņu Savrupmāja/Ieroču kaltuve/Bruņu kaltuve";
xLng['HEROSMANSION'] = " Varoņu Savrupmāja";
xLng['BLACKSMITH'] =  ' Ieroču kaltuve ';
xLng['ARMOURY'] = 'Bruņu kaltuve ';
xLng['NOW'] = 'Tagad';
xLng['CLOSE'] = 'Aizvērt';
xLng['USE'] = 'Lietot';
xLng['USETHEM1H'] = 'Lietot tos (1 stundas produkcija)';
xLng['OVERVIEW'] = 'Pārskats';
xLng['FORUM'] = 'Forums';
xLng['ATTACKS'] = 'Uzbrukumi';
xLng['NEWS'] = 'Ziņojumi';
xLng['ADDCRTPAGE'] = 'Pievienot atvērto lapu';
xLng['SCRPURL'] = 'TBeyond mājaslapa';
xLng['50'] = 'Skautu skaits priekš <br>"Izvēlēties skautus" funkcijas';
xLng['SPACER'] = 'Starp';
xLng['53'] = 'Rādīt karaspēka informāciju Tooltip’os';
xLng['MESREPOPTIONS'] = 'Saņemtās ziņas un ziņojumi';
xLng['59'] = 'Ziņojumu skaits <br>(Noklusētais = 1)';
xLng['ATTABLES'] = 'Karaspēka saraksti';
xLng['MTW'] = 'Izniekots';
xLng['MTX'] = 'Pārmērīgs';
xLng['MTC'] = 'Pašreizējā krava';
xLng['ALLIANCEFORUMLINK'] = 'Saite uz ārējo Travian forumu<br>(atstāj tukšu, lai saite būtu uz starptautisko forumu)';
xLng['82.L'] = 'Slēgt saites (Slēpt dzēst, pārvietot uz augšu, uz leju ikonas)';
xLng['MTCL'] = 'Nodzēst visu';
xLng['82.U'] = 'Atslēgt saites ( Rādīt dzēst, pārvietot uz augšu, uz leju ikonas)';
xLng['12'] = "Rādīt 'dorf1.php' un 'dorf2.php' saites";
xLng['VILLAGELIST'] = 'Ciemu saraksts';
break;
case "jp":
//by Jackie Jack & baan
xLng['8'] = '同盟';
xLng['SIM'] = '戦闘シミュレータ';
xLng['QSURE'] = 'ホントに良いですか？';
xLng['LOSS'] = '損失';
xLng['PROFIT'] = '利益';
xLng['EXTAV'] = '準備完了';
xLng['PLAYER'] = 'プレイヤー';
xLng['VILLAGE'] = '村名';
xLng['POPULATION'] = '人口';
xLng['COORDS'] = '座標';
xLng['MAPTBACTS'] = 'アクション';
xLng['SAVED'] = '保存しました';
xLng['YOUNEED'] = '不足';
xLng['TODAY'] = '今日';
xLng['TOMORROW'] = '明日';
xLng['DAYAFTERTOM'] = '明後日';
xLng['MARKET'] = '市場';
xLng['BARRACKS'] = '兵舎';
xLng['RALLYPOINT'] = '集兵所';
xLng['STABLE'] = '馬舎';
xLng['WORKSHOP'] = '作業場';
xLng['SENDRES'] = '資源の送付';
xLng['BUY'] = '売方';
xLng['SELL'] = '買方';
xLng['SENDIGM'] = 'メッセージの送付';
xLng['LISTO'] = '準備完了予定';
xLng['ON'] = 'on';
xLng['AT'] = 'at';
xLng['EFICIENCIA'] = '効率';
xLng['NEVER'] = '容量不足';
xLng['ALDEAS'] = '村';
xLng['TIEMPO'] = '時間';
xLng['OFREZCO'] = '売方';
xLng['BUSCO'] = '買方';
xLng['TIPO'] = 'タイプ';
xLng['CUALQUIERA'] = '全て';
xLng['LARGEMAP'] = '拡張マップ';
xLng['DISPONIBLE'] = '取引可能';
xLng['YES'] = 'はい';
xLng['NO'] = 'いいえ';
xLng['LOGIN'] = 'ログイン';
xLng['MARCADORES'] = 'ブックマーク';
xLng['ANYADIR'] = 'ブックマークへ追加';
xLng['UBU'] = '追加するブックマークのURL';
xLng['UBT'] = '追加するブックマークのタイトル';
xLng['ELIMINAR'] = '削除';
xLng['MAPA'] = 'TravMap';
xLng['MAXTIME'] = '最大時間';
xLng['CHKSCRV'] = '最新バージョンのチェック';
xLng['TROPAS'] = '兵士';
xLng['ARCHIVE'] = 'アーカイブ';
xLng['SUMMARY'] = '要約';
xLng['NVERAV'] = '最新バージョン';
xLng['UPDATESCRIPT'] = "スクリプトをアップデートしますか?";
xLng['CHECKUPDATE'] = "アップデートが無いか確認しています...";
xLng['AVPOPPERVIL'] = "村当たりの平均人口";
xLng['AVPOPPERPLAYER'] = "プレイヤー当たりの平均人口";
xLng['37'] = "資源タイルのアップグレードテーブルを表示する";
xLng['69'] = "コンソールログレベル<br>プログラマーやデバッグのために<br>(Default = 0)";
xLng['48'] = "トレードページの同時に読み込むページ数<br>(Default = 1)";
xLng['U.3'] = 'あなたの村の名前<br><b>Visit your Profile for an update</b>';
xLng['U.6'] = 'あなたの村の座標<br><b>Visit your Profile for an update</b>';
xLng['MAX'] = '最大';
xLng['57'] = '距離と時間を表示する';
xLng['TBSETUPLINK'] = TB3O.shN + 'をセットアップ';
xLng['9'] = "左側のメニューに追加のリンクを表示<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = '地図を大きくする';
xLng['TOWNHALL'] = '集会所';
xLng['GAMESERVERTYPE'] = 'ゲームサーバー';
xLng['ACCINFO'] = 'アカウント情報';
xLng['NOTEBLOCKOPTIONS'] = 'ノートブック';
xLng['MENULEFT'] = '左メニューのリンク設定';
xLng['STATISTICS'] = '統計';
xLng['RESOURCEFIELDS'] = 'リソースフィールド';
xLng['MAPOPTIONS'] = '地図オプション';
xLng['COLOROPTIONS'] = '文字色オプション';
xLng['DEBUGOPTIONS'] = 'デバッグオプション';
xLng['4'] = '市場';
xLng['5'] = '集兵所/兵舎/作業場/馬舎';
xLng['6'] = "集会所/英雄の館/防具工場/鍛冶場";
xLng['HEROSMANSION'] = "英雄の館";
xLng['BLACKSMITH'] = '鍛冶場';
xLng['ARMOURY'] = '防具工場';
xLng['CLOSE'] = '閉じる';
xLng['ADDCRTPAGE'] = 'このページをブックマークに追加する';
xLng['SPACER'] = 'スペーサー';
xLng['MESREPOPTIONS'] = 'メッセージ・レポート';
xLng['MTCL'] = 'すべてを削除';
xLng['82.L'] = 'ブックマークのロック (削除,編集,上移動,下移動アイコンを隠す)';
xLng['82.U'] = 'ブックマークのアンロック (削除,編集,上移動,下移動アイコンの表示)';
xLng['BIGICONS'] = '拡張アイコンを表示する';
xLng['20'] = 'ブックマークを表示する';
xLng['UPDATEPOP'] = '最新の情報に更新';
xLng['OVERVIEW'] = '概要';
xLng['FORUM'] = 'フォーラム';
xLng['ATTACKS'] = '戦闘';
xLng['NEWS'] = 'ニュース';
xLng['AT2'] = '援兵';
xLng['AT3'] = '通常攻撃';
xLng['AT4'] = '奇襲';
xLng['MAPSCAN'] = 'マップをスキャン';
xLng['ALLIANCEFORUMLINK'] = '外部のフォーラムへのリンク<br>(内部フォーラムを使う場合は書かないでください。)';
xLng['22'] = 'メモ帳を表示する';
xLng['24'] = 'メモ帳のサイズ';
xLng['25'] = 'メモ帳の高さ';
xLng['10'] = "戦闘シミュレータリンク設定<br>(メニュー左)";
xLng['28'] = "analyserへのリンクを表示";
xLng['27'] = "World Analyserの設定";
xLng['38'] = '色でリソースのレベルを表示';
xLng['43'] = 'センターの数字を表示';
xLng['44'] = '色で建物のレベルを表示';
xLng['56'] = "グリッドのタイプを表示/オアシスインフォメーション";
xLng['VILLAGECENTER'] = '村の中心';
xLng['41'] = "建物のアップグレードテーブルを表示する";
xLng['59'] = 'レポートページの同時に読み込むページ数<br>(Default = 1)';
xLng['NONEWVER'] = "あなたは最新バージョンを持っています。";
xLng['MTC'] = '総輸送量';
xLng['MTW'] = '余剰輸送量';
xLng['SHOWORIGREPORT'] = "オリジナルレポートを見る";
xLng['EDIT'] = '編集';
xLng['MTX'] = '不足輸送量';
xLng['VILLAGELIST'] = '村のリスト';
xLng['TOTALTROOPS'] = '全村の兵士';
xLng['SELECTALLTROOPS'] = "すべての兵士を選択";
xLng['SELECTSCOUT'] = "スカウトを選択";
xLng['SELECTFAKE'] = "フェイクを選択";
xLng['NPCSAVETIME'] = '時間を節約:';
xLng['SAVE'] = '保存';
xLng['NOTROOP2SCOUT'] = "スカウトが居ません!";
xLng['SAVEGLOBAL'] = '全村で共有する';
xLng['49'] = '集兵所の基本アクション';
xLng['50'] = 'スカウトを選んだ際、選択する人数';
xLng['53'] = '兵士アイコンを選んだ際、詳細情報を表示';
xLng['54'] = '村の名前を選んだ際、距離・時間を表示する';
xLng['NPCOPTIONS'] = 'NPCトレードオプション';
xLng['26'] = 'NPCトレードへのリンクの表示';
xLng['USETHEM1H'] = '1時間生産量';
xLng['NEWVILLAGEAV'] = '新しい村';
xLng['58'] = 'プレイヤーリストの表示(村・オアシス)';
xLng['USETHEMEQ'] = '均等';
xLng['USETHEMPR'] = '比例';
xLng['NEWVILLAGEAV'] = '日付/時刻';
xLng['TIMEUNTIL'] = '待ち時間';
xLng['61'] = 'レポートページに「全て削除」ボタンを追加';
xLng['CENTERMAP'] = '村を中心にMAP表示';
xLng['13'] = '「村を中心にマップを表示」アイコンの追加';
xLng['SENDTROOPS'] = '兵士を送る';
xLng['7'] = "宮殿/官邸/学院/金庫";
xLng['PALACE'] = "宮殿";
xLng['RESIDENCE'] = "官邸";
xLng['ACADEMY'] = "学院";
xLng['TREASURY'] = "金庫";
xLng['45'] = "アップグレードを行っている建物のLVを点滅表示";
xLng['14'] = "村の一覧に「兵士・資源を送る」アイコンの追加";
xLng['34'] = "アップグレードテーブルにCPの生産量の表示";
xLng['UPGTABLES'] = "アップグレードテーブル";
xLng['35'] = "アップグレードテーブルに穀物消費量を表示";
xLng['16'] = "村の一覧に穀物生産量を表示";
xLng['39'] = "リソースバーを追加する";
xLng['40'] = "リソースバーテーブルをフローティングウィンドウ化する";
xLng['21'] = "ブックマークをフローティングウィンドウ化する";
xLng['23'] = "ノートブックををフローティングウィンドウ化する";
xLng['64'] = '戦闘レポートの統計の詳細を表示する';
xLng['17'] = "村の一覧に人口を表示";
xLng['29'] = 'Map Analyser の設定';
xLng['30'] = 'ユーザー名にMAPへのリンクアイコンを追加';
xLng['31'] = '同盟名にMAPへのリンクアイコンを追加';
xLng['60'] = 'ポップアップとしてメッセージを表示するアイコンの追加';
xLng['63'] = '戦闘レポートの統計を表示する';
xLng['18'] = '村のリストを2列にしてフローティングウィンドウ化する';
xLng['60'] = 'メッセージ/レポートをポップアップで表示するリンクの追加';
xLng['42'] = 'アップグレードテーブルを名前順に表示';
xLng['19'] = '村のリストに建設している建物の情報を表示';
xLng['32'] = 'サーチバーを追加';
xLng['3'] = 'ファランクス・レジョネアをT3.1として計算する<br>(for mixed T3.1 & T3.5 servers)jp1～jp3';
xLng['33'] = "サーチバーをフローティングウィンドウ化する";
xLng['36'] = "アップグレード/トレーニングテーブルの詳細な計算を表示";
xLng['RESIDUE'] = '実行後';
xLng['RESOURCES'] = '実行可能時';
xLng['2'] = '広告バナーを削除し、サーバ時間の位置を変更';
xLng['12'] = "村の概観・村の中心のリンクを表示";
xLng['15'] = "村のリストに資源(木・粘土・鉄)の生産量を追加";
xLng['46'] = "輸送中の物資の詳細を表示";
break;
case "sk":
//by Matthew-PoP
xLng['8'] = 'Aliancia';
xLng['SIM'] = 'Bojový simulátor';
xLng['QSURE'] = 'Naozaj?';
xLng['LOSS'] = 'Strata';
xLng['PROFIT'] = 'Zisk';
xLng['EXTAV'] = 'Môžeš stavať';
xLng['PLAYER'] = 'Hráč;';
xLng['VILLAGE'] = 'Dedina';
xLng['POPULATION'] = 'Populácia';
xLng['COORDS'] = 'Súradnice';
xLng['MAPTBACTS'] = 'Akcie';
xLng['SAVED'] = 'Uložené';
xLng['YOUNEED'] = 'Potrebuješ';
xLng['TODAY'] = 'dnes';
xLng['TOMORROW'] = 'zajtra';
xLng['DAYAFTERTOM'] = 'pozajtra';
xLng['MARKET'] = 'Trh';
xLng['BARRACKS'] = 'Kasárne';
xLng['RALLYPOINT'] = 'Zhromaždište';
xLng['STABLE'] = 'Stajňa';
xLng['WORKSHOP'] = 'Dielňa';
xLng['SENDRES'] = 'Pošli suroviny';
xLng['BUY'] = 'Kúpiť';
xLng['SELL'] = 'Predať';
xLng['SENDIGM'] = 'Pošli správu';
xLng['LISTO'] = 'Môžeš stavať';
xLng['ON'] = 'Dňa';
xLng['AT'] = 'o';
xLng['EFICIENCIA'] = 'Efektivnosť';
xLng['NEVER'] = 'Nikdy';
xLng['ALDEAS'] = 'Počet dedín';
xLng['TIEMPO'] = 'Čas';
xLng['OFREZCO'] = 'Ponuka';
xLng['BUSCO'] = 'Vyhľadať';
xLng['TIPO'] = 'Typ';
xLng['DISPONIBLE'] = 'Len dostupné';
xLng['CUALQUIERA'] = 'Hociaká';
xLng['YES'] = 'Áno';
xLng['NO'] = 'Nie';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Záložka';
xLng['ANYADIR'] = 'Pridať;';
xLng['UBU'] = 'Url adresa';
xLng['UBT'] = 'Názov záložky';
xLng['ELIMINAR'] = 'Vymazať;';
xLng['MAPA'] = 'Mapa';
xLng['MAXTIME'] = 'Maximálny čas';
xLng['ARCHIVE'] = 'Archivovať';
xLng['SUMMARY'] = 'Hlásenie';
xLng['TROPAS'] = 'Vojsko';
xLng['CHKSCRV'] = 'Aktualizuj';
xLng['ACTUALIZAR'] = 'Aktualizovať informácie o dedine';
xLng['VENTAS'] = 'Uložiť ponuky';
xLng['MAPSCAN'] = 'Skenovať mapu';
xLng['BIGICONS'] = 'Ukáž rozširujúce ikony';
xLng['22'] = 'Ukáz poznámkový blok';
xLng['SAVE'] = 'Uložené';
xLng['49'] = 'Prednastavená akcia zhromaždištia';
xLng['AT2'] = 'Podpora';
xLng['AT3'] = 'Normálny útok ';
xLng['AT4'] = 'Lúpež';
xLng['24'] = 'Veľkosť poznamkového bloku';
xLng['NBSIZEAUTO'] = 'Automatická';
xLng['NBSIZENORMAL'] = 'Normálna (malá)';
xLng['NBSIZEBIG'] = 'veľká';
xLng['25'] = 'Výška poznamkového bloku';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automatické rozšírenie výšky';
xLng['NBKEEPHEIGHT'] = 'Prednastavená výška';
xLng['43'] = 'Úkáž stredové čísla';
xLng['NPCSAVETIME'] = 'Ušetrite:';
xLng['38'] = 'Ukáž úroveň surovinových polí farebne';
xLng['44'] = 'Ukáž úroveň budov farebne';
xLng['65'] = 'Farba, upgradu<br>(Prednastavené = Prázdne)';
xLng['66'] = 'Farba, maximálnej úrovne<br>(Prednastavené = Prázdne)';
xLng['67'] = 'Farba, nemožného upgradu<br>(Prednastavené = Prázdne)';
xLng['68'] = 'Farba, upgradu cez NPC<br>(Prednastavené = Prázdne)';
xLng['TOTALTROOPS'] = 'Všetky jednotky vycvičené v tejto dedine';
xLng['20'] = 'Ukáž záložky';
xLng['U.2'] = 'Národy';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Vybrať všetky jednotky";
xLng['PARTY'] = "Oslavy";
xLng['CPPERDAY'] = "KB/denne";
xLng['SLOT'] = "Slot";
xLng['TOTAL'] = "Spolu";
xLng['SELECTSCOUT'] = "Vyber počet špehov";
xLng['SELECTFAKE'] = "Vyber jednotky na fake";
xLng['NOSCOUT2FAKE'] = "Je nemožné použiť špeha na fake!";
xLng['NOTROOP2FAKE'] = "Nemáte jednotky na fake!";
xLng['NOTROOP2SCOUT'] = "Nemáte jednotky na špehovanie !";
xLng['NOTROOPS'] = "Žiadne jednotky v dedine !";
xLng['ALL'] = "Všetko";
xLng['SH2'] = "Môžeš vložiť farby :<br>- green alebo red alebo orange, atď. Farby zadávajte len v Anglištine.<br>- Napríklad HEX farba #004523.<br>- Nechajte prázdne ak chcete mať prednastavené farby";
xLng['PLAYER'] = 'Hráč';
xLng['SHOWORIGREPORT'] = "Ukáž originálne správy";
xLng['56'] = "Ukaž typ bunky/oázy info<br>keď chodiš myšou po mape";
xLng['10'] = "Link na bojový simulátor:<br>(ľavé menu)";
xLng['WARSIMOPTION1'] = "Interný (poskytovaný hrou)";
xLng['WARSIMOPTION2'] = "Externý (poskytnutý kirilloid.ru)";
xLng['27'] = "Analyzátor";
xLng['28'] = "Ukaž link na analyzátor ";
xLng['NONEWVER'] = "Máte poslednú verziu";
xLng['BVER'] = "Máte beta verziu";
xLng['NVERAV'] = "Je novšia verzia";
xLng['UPDATESCRIPT'] = "Aktualizovať script teraz?";
xLng['CHECKUPDATE'] = "Kontrolujem aktualizácie...";
xLng['CROPFINDER'] = "Vyhľadávač obilia";
xLng['AVPOPPERVIL'] = "Priemerná populácia na dedinu";
xLng['AVPOPPERPLAYER'] = "Priemerná populácia na hráča";
xLng['37'] = "Ukáž tabuľku pre upgrade surovinových poli";
xLng['41'] = "Ukáž tabuľku pre upgrade budov";
xLng['69'] = "Úroveň konzoly. Len pre programátorov alebo na odstránenie chýb.<br>(Prednastavené = 0)";
xLng['48'] = "Počet kontrolovaných stránok na trhovovisku => Nákupných stránok<br>(Prednastavené = 1)";
xLng['U.3'] = 'Meno hlavnej dediny<br>Pozri profil pre zmenenie';
xLng['U.6'] = 'Súradnice hlavnej dediny.<br>Pozri svôj profil';
xLng['MAX'] = 'Maximum';
xLng['TOTALTROOPSTRAINING'] = 'Všetci vojaci vo výcviku';
xLng['57'] = 'Ukáž zdialenosť a čas';
xLng['TBSETUPLINK'] = TB3O.shN + ' nastavenia';
xLng['UPDATEALLVILLAGES'] = 'Updatuj všetký dediny. POUŽIVAJTE S MAXIMÁLNOU STAROSTLIVOSŤOU<br>LEBO TO MôžE VIESŤ K ZRUŠENIU ÚČTU !';
xLng['9'] = "Ukáž prídavné linky v ľavom menu<br>(Traviantoolbox, World Analyser, Travilog, Mapu, atď.)";
xLng['LARGEMAP'] = 'Veľká mapa';
xLng['USETHEMPR'] = 'Použí ich (proporčne)';
xLng['USETHEMEQ'] = 'Použí ich (rovným dielom)';
xLng['TOWNHALL'] = 'Radnica';
xLng['GAMESERVERTYPE'] = 'Server hry';
xLng['ACCINFO'] = 'Informácie o účte';
xLng['NOTEBLOCKOPTIONS'] = 'Poznámkový blok';
xLng['MENULEFT'] = 'Menu na ľavom boku';
xLng['STATISTICS'] = 'Štatistika';
xLng['RESOURCEFIELDS'] = 'Surovinové polia';
xLng['VILLAGECENTER'] = 'Centrum dediny';
xLng['MAPOPTIONS'] = 'Nastavenia mapy';
xLng['COLOROPTIONS'] = 'Nastavenia farieb';
xLng['DEBUGOPTIONS'] = 'Nastavenia v ladení';
xLng['4'] = 'Trhovisko';
xLng['5'] = 'Zhromaždisko/Kasárne/Dielňa/Stájňa';
xLng['6'] = "Radnica/Hrdinský dvor/Výzbroj/Kováč";
xLng['HEROSMANSION'] = "Hrdinský dvor";
xLng['BLACKSMITH'] = 'Kováč';
xLng['ARMOURY'] = 'Zbrojnica';
xLng['NOW'] = 'Teraz';
xLng['CLOSE'] = 'Zavrieť';
xLng['USE'] = 'Použiť';
xLng['USETHEM1H'] = 'Použiť (1 h. produkcia)';
xLng['OVERVIEW'] = 'Náhľad';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Útok;';
xLng['NEWS'] = 'Noviny';
xLng['ADDCRTPAGE'] = 'Pridať túto stránku';
xLng['SCRPURL'] = 'TBeyond stránka';
xLng['50'] = 'Niesu špehovia<br>"Vyberte funkciu špeha';
xLng['SPACER'] = 'Odeľovač';
xLng['53'] = 'Ukáž informácie o vojakoch v bublinách';
xLng['MESREPOPTIONS'] = 'Správy & Hlásenia';
xLng['59'] = 'Počet správ/hlásení stránka na preload<br>(Prednastavené = 1)';
xLng['ATTABLES'] = 'Tabuľka jednotiek';
xLng['MTW'] = 'Obchodníci ešte unesú';
xLng['MTX'] = 'Presahuje o';
xLng['MTC'] = 'Zaťaženie obchodníka';
xLng['ALLIANCEFORUMLINK'] = 'Link na externé forum<br>(Nechaj prázdne pre interné forum)';
xLng['82.L'] = 'Zamkni záložku (Skry vymaž, posuň hore/dole ikony)';
xLng['MTCL'] = 'Vyčistiť všetko';
xLng['82.U'] = 'Odomkni záložky (Ukáž vymaž, posuň hore/dole ikony)';
xLng['CLICKSORT'] = 'Klikni roztiediť';
xLng['MIN'] = 'Minimum';
xLng['SAVEGLOBAL'] = 'Pre všetky dediny';
xLng['VILLAGELIST'] = 'Zoznam dedin';
xLng['12'] = "Ukáž 'dorf1.php' a 'dorf2.php' linky";
xLng['UPDATEPOP'] = 'Updatuj populáciu';
xLng['54'] = 'Ukáž zdialenosť a čas od dediny v bublinách';
xLng['EDIT'] = 'Edituj';
xLng['NPCOPTIONS'] = 'Nastavenia NPC asistenta';
xLng['26'] = 'Ukáž kalkulačku/linky NPC asistenta';
xLng['58'] = 'Ukáž tabuľku s hráčmy/dedinamy/okupovaými oázami';
xLng['NEWVILLAGEAV'] = 'Dátum/čaš';
xLng['TIMEUNTIL'] = 'Čas vyčkávania';
xLng['61'] = 'Ukáž "Vymazať všetký" tabuľky na stránke s hláseniami';
xLng['62'] = 'Ukáž " v pošli správu" ikonu aj pre mňa';
xLng['CENTERMAP'] = 'Vycentruj mapu na túto dedinu ';
xLng['13'] = 'Ukáž ikonu" vycentruj mapu na dedinu ';
xLng['SENDTROOPS'] = 'Poslať jednotky';
xLng['64'] = 'Ukáž detaily v štatistikách hlásení';
xLng['7'] = "Palác/Rezidencia/Akadémia/Pokladnica";
xLng['PALACE'] = "Palác";
xLng['RESIDENCE'] = "Rezidencia";
xLng['ACADEMY'] = "Akadémia";
xLng['TREASURY'] = "Pokladnica";
xLng['45'] = "Ukázať blikajúc budovy ktoré sa upgradujú?";
xLng['60'] = 'Ukáž link na otvorenie správy v pop-up';
break;
case "tr":
//by greench, alinafiz, LeventT
xLng['1'] = "Travian v2.x sunucusu";
xLng['3'] = 'T3.1 Lejyoner & Phalanx kapasite hesaplayıcıyı zorla<br>(karışık T3.1 & T3.5 sunucuları için)';
xLng['4'] = 'Pazar yeri';
xLng['5'] = 'Askeri Üs/Kışla/Tamirhane/Ahır';
xLng['6'] = "Belediye/Kahraman Kışlası/Silah Dökümhanesi/Zırh Dökümhanesi";
xLng['7'] = "Saray/Köşk/Akademi/Hazine Binası";
xLng['8'] = 'Birlik';
xLng['9'] = "Sol menüde ek bağlantılar göster<br>(Traviantoolbox, World Analyser, Travilog, Map, benzeri.)";
xLng['10'] = "Savaş simülatörü kullanımı:<br>(sol menü)";
xLng['12'] = "'dorf1.php' ve 'dorf2.php' bağlantılarını göster";
xLng['13'] = '"Bu köyü haritada ortala" simgesini göster';
xLng['14'] = "Köy listesinde 'Destek gönder/Hammadde gönder' simgelerini göster";
xLng['15'] = "Saatlik odun, tuğla, demir üretimini köy listesinde göster";
xLng['16'] = "Köy listesinde net tahıl üretimini göster";
xLng['17'] = "Köy listesinde nüfusu göster";
xLng['18'] = 'Kayan pencere olarak ek köy listesini göster (2 sütunlu)';
xLng['19'] = 'Köy listesinde asker hareketleri ve inşaat bilgilerini göster';
xLng['20'] = 'Yerimlerini göster';
xLng['21'] = "'Kullanıcı Yerimleri'ni kayan pencere olarak göster";
xLng['22'] = 'Not defterini göster';
xLng['23'] = "'Not Defteri'ni kayan pencere olarak göster";
xLng['24'] = 'Not defteri boyutu';
xLng['25'] = 'Not defteri yüksekliği';
xLng['26'] = 'NPC Asistanı hesaplayıcısını/bağlantılarını göster';
xLng['27'] = "İstatistik sitesi kullanımı";
xLng['28'] = "Bağlantılarda istatistik bağlantısını göster";
xLng['29'] = 'Kullanıcılacak harita analizi sitesi';
xLng['30'] = 'Oyuncular için harita bağlantısını göster';
xLng['31'] = 'Birlikler için harita bağlantısını göster';
xLng['32'] = "'Arama Çubuğu'nu göster";
xLng['33'] = "'Arama Çubuğu'nu kayan pencere olarak göster ";
xLng['34'] = "Geliştirme tablosunda KP/gün bilgisini göster";
xLng['35'] = "Geliştirme tablosunda tahıl tüketimini göster";
xLng['37'] = "Kaynak alanlarını geliştirme tablosunu göster";
xLng['38'] = 'Kaynak düzeyleri renklerini göster';
xLng['39'] = "'Hammadde Grafiği'ni göster";
xLng['40'] = "'Hammadde Grafiği'ni kayan pencere olarak göster";
xLng['41'] = "Binaların geliştirme tablosunu göster";
xLng['42'] = 'Geliştirme tablosunda binaları isme göre sırala';
xLng['43'] = 'Orta numaraları göster';
xLng['44'] = 'Bina düzeyleri renklerini göster';
xLng['45'] = "Binalar için yükseltilen seviyeyi parlat";
xLng['46'] = 'Her pazarcı gelişi için ilave bilgi göster';
xLng['47'] = 'Son pazar naklini göster';
xLng['48'] = "'Pazar Yeri=> Satın al' sayfasındayken<br>önyüklenen sayfa sayısı<br>(Varsayılan= 1 ya da Boş ; Maks = 5)";
xLng['49'] = 'Askeri üs varsayılan eylemi';
xLng['50'] = '"Casus seç" işlevi için<br> casus sayısı';
xLng['53'] = 'Araç ipuçları bölümünde asker bilgisini göster';
xLng['54'] = 'Araç ipuçlarında köye ulaşım süresini ve uzaklığı göster';
xLng['56'] = "Haritada fare ile üzerine gelindiğinde<br>köy türünü göster/vadi bilgisini göster";
xLng['57'] = 'Mesafe ve süreyi göster';
xLng['58'] = 'Haritada oyuncu/köy/fethedilmiş vahalar tablosunu göster';
xLng['59'] = 'Önyüklenen Mesaj/Rapor sayfası sayısı<br>(Default = 1)';
xLng['60'] = 'Açılır pencerede mesaj/rapor açma bağlantısını göster';
xLng['61'] = 'Raporlar sayfasına "Tümünü sil" tablosu ekle';
xLng['62'] = '"IGM Gönder" simgesini benim için de göster';
xLng['63'] = 'TB3 geliştirilmiş Savaş Raporlarını göster';
xLng['64'] = 'Rapor İstatistiklerinde detayları göster';
xLng['65'] = 'Geliştirme olanaklı rengi<br>(Varsayılan = Boş)';
xLng['66'] = 'En üst düzey rengi<br>(Varsayılan = Boş)';
xLng['67'] = 'Geliştirme olanaklı değil rengi<br>(Varsayılan = Boş)';
xLng['68'] = 'NPC üzerinden geliştirme rengi<br>(Varsayılan = Boş)';
xLng['69'] = "Konsolun Kayıt Düzeyi<br>PROGRAMCILAR VE SORUN GİDERME İÇİN<br>(Varsayılan = 0)";
xLng['82.L'] = 'Yerimlerini kitle (Sil, yukarı taşı, aşağı taşı simgelerini gizler)';
xLng['82.U'] = 'Yerimleri kilidini aç (Sil, yukarı taşı, aşağı taşı simgelerini gösterir)';
xLng['U.2'] = 'Irk';
xLng['U.3'] = 'Merkez Köyün Adı<br>Değiştirmeyin,onun yerine Profilinizi ziyaret edin';
xLng['U.6'] = 'Merkez Köyün koordinatları<br>Değiştirmeyin,onun yerine Profilinizi ziyaret edin';
xLng['SIM'] = 'Savaş Simülatörü';
xLng['QSURE'] = 'Emin misiniz?';
xLng['PROFIT'] = 'Kazanç';
xLng['LOSS'] = 'Kayıp';
xLng['EXTAV'] = 'Geliştirilebilir';
xLng['PLAYER'] = 'Oyuncu';
xLng['VILLAGE'] = 'Köy';
xLng['POPULATION'] = 'Nüfus';
xLng['COORDS'] = 'Koordinatlar';
xLng['MAPTBACTS'] = 'Eylemler';
xLng['SAVED'] = 'Kaydedildi';
xLng['YOUNEED'] = 'İhtiyacınız olan';
xLng['TODAY'] = 'bugün';
xLng['TOMORROW'] = 'yarın';
xLng['DAYAFTERTOM'] = 'ertesi gün';
xLng['MARKET'] = 'Pazar yeri';
xLng['BARRACKS'] = 'Kışla';
xLng['RALLYPOINT'] = 'Askeri üs';
xLng['STABLE'] = 'Ahır';
xLng['WORKSHOP'] = 'Tamirhane';
xLng['SENDRES'] = 'Hammdde gönder';
xLng['BUY'] = 'Satın al';
xLng['SELL'] = 'Sat';
xLng['SENDIGM'] = 'Genel mesaj gönder';
xLng['LISTO'] = 'Mümkün';
xLng['ON'] = ' ';
xLng['AT'] = ' ';
xLng['EFICIENCIA'] = 'Verimlilik';
xLng['NEVER'] = 'Hiç bir zaman';
xLng['ALDEAS'] = 'Köy(ler)';
xLng['TIEMPO'] = 'Süre';
xLng['OFREZCO'] = 'Önerilen';
xLng['BUSCO'] = 'İstenilen';
xLng['TIPO'] = 'Oran';
xLng['DISPONIBLE'] = 'Sadece olanaklı olanlar';
xLng['CUALQUIERA'] = 'Hiçbiri';
xLng['YES'] = 'Evet';
xLng['NO'] = 'Hayır';
xLng['LOGIN'] = 'Giriş';
xLng['MARCADORES'] = 'Yerimleri';
xLng['ANYADIR'] = 'Ekle';
xLng['UBU'] = 'Yeni yerimi adresi';
xLng['UBT'] = 'Yeni yerimi yazısı';
xLng['ELIMINAR'] = 'Sil';
xLng['MAPA'] = 'Harita';
xLng['MAXTIME'] = 'En fazla süre';
xLng['ARCHIVE'] = 'Arşiv';
xLng['SUMMARY'] = 'Özet';
xLng['TROPAS'] = 'Destekler';
xLng['CHKSCRV'] = 'TBeyond u güncelle';
xLng['ACTUALIZAR'] = 'Köy bilgisini güncelle';
xLng['VENTAS'] = 'Kayıtlı Teklifler';
xLng['MAPSCAN'] = 'Haritayı Tara';
xLng['BIGICONS'] = 'Ek simgeleri göster';
xLng['SAVE'] = 'Kaydet';
xLng['AT2'] = 'Destek';
xLng['AT3'] = 'Saldırı: Normal';
xLng['AT4'] = 'Saldırı: Yağma';
xLng['NBSIZEAUTO'] = 'Oto';
xLng['NBSIZENORMAL'] = 'Normal (küçük)';
xLng['NBSIZEBIG'] = 'geniş ekran (büyük)';
xLng['NBAUTOEXPANDHEIGHT'] = 'Yüksekliği otomatik genişlet';
xLng['NBKEEPHEIGHT'] = 'Varsayılan yükseklik';
xLng['NPCSAVETIME'] = 'Kazanılan zaman: ';
xLng['TOTALTROOPS'] = 'Köydeki toplam asker';
xLng['SELECTALLTROOPS'] = "Tüm askerleri seç";
xLng['PARTY'] = "Festivaller";
xLng['CPPERDAY'] = "KP/gün";
xLng['SLOT'] = "Boşluk";
xLng['TOTAL'] = "Toplam";
xLng['SELECTSCOUT'] = "Casus seç";
xLng['SELECTFAKE'] = "Sahte saldırı seç";
xLng['NOSCOUT2FAKE'] = "Sahte saldırı için casusları kullanmak olanaklı değil !";
xLng['NOTROOP2FAKE'] = "Sahte saldırı için asker yok!";
xLng['NOTROOP2SCOUT'] = "Gözetlemek için asker yok !";
xLng['NOTROOPS'] = "Köyde asker yok !";
xLng['ALL'] = "Tümü";
xLng['SH2'] = "renk alanına şunları girebilirsiniz:<br>- green ya da red ya da orange, vb.<br>- HEX renk kodları, örneğin #004523<br>- varsayılan renkler için boş bırakın";
xLng['SHOWORIGREPORT'] = "Özgün raporu göster (foruma aktarmak için)";
xLng['WARSIMOPTION1'] = "Oyunun kendi hesaplayıcısı (oyun tarafından sağlanan)";
xLng['WARSIMOPTION2'] = "Harici (kirilloid.ru tarafından sağlanan)";
xLng['NONEWVER'] = "Son sürüme sahipsiniz";
xLng['BVER'] = "Beta sürümüne sahip olabilirsiniz";
xLng['NVERAV'] = "Betiğin(script) yeni sürümü var";
xLng['UPDATESCRIPT'] = "Betik şimdi güncellensin mi ?";
xLng['CHECKUPDATE'] = "Betik güncellemesi denetleniyor.<br>Lütfen bekleyin...";
xLng['CROPFINDER'] = "Tarla bulucu";
xLng['AVPOPPERVIL'] = "Köy başına ortalama nüfus";
xLng['AVPOPPERPLAYER'] = "Oyuncu başına ortalama  nüfus";
xLng['MAX'] = 'En fazla';
xLng['TOTALTROOPSTRAINING'] = 'Eğitimdeki asker sayısı';
xLng['TBSETUPLINK'] = TB3O.shN + ' Ayarları';
xLng['UPDATEALLVILLAGES'] = 'Tüm köyleri güncelle. DİKKATLİ KULLANIN, HESABINIZ CEZA ALABİLİR!';
xLng['LARGEMAP'] = 'Büyük harita';
xLng['USETHEMPR'] = 'Bunları kullan (oransal)';
xLng['USETHEMEQ'] = 'Bunları kullan (eş miktarda)';
xLng['TOWNHALL'] = 'Belediye';
xLng['GAMESERVERTYPE'] = 'Oyun sunucusu';
xLng['ACCINFO'] = 'Hesap Bilgisi';
xLng['NOTEBLOCKOPTIONS'] = 'Not defteri';
xLng['MENULEFT'] = 'Soldaki menü';
xLng['STATISTICS'] = 'İstatistikler';
xLng['RESOURCEFIELDS'] = 'Hammadde alanları';
xLng['VILLAGECENTER'] = 'Köy merkezi';
xLng['MAPOPTIONS'] = 'Harita ayarları';
xLng['COLOROPTIONS'] = 'Renk seçenekleri';
xLng['DEBUGOPTIONS'] = 'Sorun giderme seçenekleri';
xLng['HEROSMANSION'] = "Kahraman kışlası";
xLng['BLACKSMITH'] = 'Silah dökümhanesi';
xLng['ARMOURY'] = 'Zırh dökümhanesi';
xLng['NOW'] = 'Şimdi';
xLng['CLOSE'] = 'Kapat';
xLng['USE'] = 'Kullan';
xLng['USETHEM1H'] = 'Bunları Kullan (1 saatlik üretim)';
xLng['OVERVIEW'] = 'Genel bakış';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Saldırılar';
xLng['NEWS'] = 'Haberler';
xLng['ADDCRTPAGE'] = 'Bu sayfayı yerimine ekle';
xLng['SCRPURL'] = 'TBeyond sayfası';
xLng['SPACER'] = 'Ayırıcı';
xLng['MESREPOPTIONS'] = 'Mesajlar & Raporlar';
xLng['ATTABLES'] = 'Asker tablosu';
xLng['MTW'] = 'Artan';
xLng['MTX'] = 'Aşan';
xLng['MTC'] = 'Güncel yük';
xLng['ALLIANCEFORUMLINK'] = 'Harici forumun adresi<br>(Dahili forum için boş bırakın)';
xLng['MTCL'] = 'Tümünü temizle';
xLng['CLICKSORT'] = 'Sıralamak için tıklayın';
xLng['MIN'] = 'En az';
xLng['SAVEGLOBAL'] = 'Köyler arasında paylaştır';
xLng['VILLAGELIST'] = 'Köy Listesi';
xLng['UPDATEPOP'] = 'Nüfusu güncelle';
xLng['EDIT'] = 'Düzenle';
xLng['NPCOPTIONS'] = 'NPC Asistanı ayarları';
xLng['NEWVILLAGEAV'] = 'Tarih/Zaman';
xLng['TIMEUNTIL'] = 'Bekleme süresi';
xLng['CENTERMAP'] = 'Bu köyü haritada ortala';
xLng['SENDTROOPS'] = 'Asker gönder';
xLng['PALACE'] = "Saray";
xLng['RESIDENCE'] = "Köşk";
xLng['ACADEMY'] = "Akademi";
xLng['TREASURY'] = "Hazine Binası";
xLng['UPGTABLES'] = "Hammadde alanlarını ve binaları geliştirme tablosu";
xLng['RESBARTABLETITLE'] = "Hammadde Grafiği";
xLng['RESIDUE'] = "İnşa edilmesi halinde kalan";
xLng['RESOURCES'] = "Kaynaklar";
break;
case "id":
//by CuPliz13. & adudutz
xLng['8'] = 'Aliansi';
xLng['SIM'] = 'Simulator Perang';
xLng['QSURE'] = 'Apakah Anda yakin?';
xLng['LOSS'] = 'Kerugian';
xLng['PROFIT'] = 'Laba';
xLng['EXTAV'] = 'Naikkan tingkat';
xLng['PLAYER'] = 'Pemain';
xLng['VILLAGE'] = 'Desa';
xLng['POPULATION'] = 'Populasi';
xLng['COORDS'] = 'Koordinat';
xLng['MAPTBACTS'] = 'Aksi';
xLng['SAVED'] = 'Disimpan';
xLng['YOUNEED'] = 'Anda butuh';
xLng['TODAY'] = 'hari ini';
xLng['TOMORROW'] = 'besok';
xLng['DAYAFTERTOM'] = 'lusa';
xLng['MARKET'] = 'Pasar';
xLng['BARRACKS'] = 'Barak';
xLng['RALLYPOINT'] = 'Titik Temu';
xLng['STABLE'] = 'Istal';
xLng['WORKSHOP'] = 'Bengkel';
xLng['SENDRES'] = 'Kirim sumberdaya';
xLng['BUY'] = 'Beli';
xLng['SELL'] = 'Jual';
xLng['SENDIGM'] = 'Kirim Pesan';
xLng['LISTO'] = 'Tersedia';
xLng['ON'] = 'pada';
xLng['AT'] = 'pukul';
xLng['EFICIENCIA'] = 'Efisiensi';
xLng['NEVER'] = 'jika gudang ditingkatkan';
xLng['ALDEAS'] = 'Desa';
xLng['TIEMPO'] = 'Waktu';
xLng['OFREZCO'] = 'Penawaran';
xLng['BUSCO'] = 'Cari';
xLng['TIPO'] = 'Tipe';
xLng['DISPONIBLE'] = 'Hanya tersedia';
xLng['CUALQUIERA'] = 'Apapun';
xLng['YES'] = 'Ya';
xLng['NO'] = 'Tidak';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Bookmark';
xLng['ANYADIR'] = 'Tambah';
xLng['UBU'] = 'URL Bookmark';
xLng['UBT'] = 'Nama Bookmark';
xLng['ELIMINAR'] = 'Hapus';
xLng['MAPA'] = 'Peta';
xLng['MAXTIME'] = 'Waktu maks';
xLng['ARCHIVE'] = 'Arsip';
xLng['SUMMARY'] = 'Laporan';
xLng['TROPAS'] = 'Pasukan';
xLng['ACTUALIZAR'] = 'Informasi Desa diubah';
xLng['VENTAS'] = 'Simpan penawaran';
xLng['MAPSCAN'] = 'Pindai peta';
xLng['BIGICONS'] = 'Tampilkan ikon tambahan';
xLng['22'] = 'Tampilkan blok catatan';
xLng['SAVE'] = 'Simpan';
xLng['49'] = 'Aksi default dari titik temu';
xLng['AT2'] = 'Bantuan';
xLng['AT3'] = 'Serangan: Normal';
xLng['AT4'] = 'Serangan: Raid';
xLng['24'] = 'Ukuran blok catatan';
xLng['NBSIZEAUTO'] = 'Otomatis';
xLng['NBSIZENORMAL'] = 'Normal (kecil)';
xLng['NBSIZEBIG'] = 'Layar lebar (besar)';
xLng['25'] = 'Lebar blok catatan';
xLng['NBAUTOEXPANDHEIGHT'] = 'Lebar menyesuaikan otomatis';
xLng['NBKEEPHEIGHT'] = 'Lebar asal';
xLng['43'] = 'Tampilkan angka pusat';
xLng['NPCSAVETIME'] = 'Simpan: ';
xLng['38'] = 'Tampilkan warna tingkatan sumberdaya';
xLng['44'] = 'Tampilkan warna tingkatan bangunan';
xLng['65'] = 'Upgrade tersedia<br>(Default = Kosong)';
xLng['66'] = 'Warna level maks<br>(Default = Kosong)';
xLng['67'] = 'Upgrade tidak tersedia<br>(Default = Kosong)';
xLng['68'] = 'Upgrade lewat NPC<br>(Default = Kosong)';
xLng['TOTALTROOPS'] = 'Jumlah pasukan';
xLng['20'] = 'Tampilkan bookmark';
xLng['U.2'] = 'Suku';
xLng['1'] = "Server Travian v2.x";
xLng['SELECTALLTROOPS'] = "Pilih semua pasukan";
xLng['PARTY'] = "Festivalitas";
xLng['CPPERDAY'] = "NB/hari";
xLng['SLOT'] = "Slot";
xLng['TOTAL'] = "Total";
xLng['SELECTSCOUT'] = "Pilih pengintai";
xLng['SELECTFAKE'] = "Pilih penipu";
xLng['NOSCOUT2FAKE'] = "Tidak dimungkinkan untuk memakai pengintai untuk serangan tipuan!";
xLng['NOTROOP2FAKE'] = "Tidak ada pasukan untuk serangan tipuan!";
xLng['NOTROOP2SCOUT'] = "Tidak ada pasukan untuk mengintai!";
xLng['NOTROOPS'] = "Tidak ada pasukan di desa!";
xLng['ALL'] = "Seluruh";
xLng['SH2'] = "Di kolom warna Anda bisa mengisi:<br>- <b>green</b> atau <b>red</b> atau <b>orange</b>, dll.<br>- warna menggunakan kode heksadesilmal (HEX), seperti <b>#004523</b><br>- kosongkan untuk warna default";
xLng['SHOWORIGREPORT'] = "Tampilkan laporan asli (untuk posting dalam forum)";
xLng['56'] = "Tampilkan tipe info bidang/oasis<br>saat kursor mouse berada di atas peta";
xLng['10'] = "Link simulator perang untuk dipakai:<br>(menu kiri)";
xLng['WARSIMOPTION1'] = "Internal (dari permainan)";
xLng['WARSIMOPTION2'] = "Eksternal (dari kirilloid.ru)";
xLng['27'] = "World Analyser untuk dipakai";
xLng['28'] = "Tampilkan link Analyser Statistic";
xLng['NONEWVER'] = "Anda memiliki versi terakhir yang tersedia";
xLng['BVER'] = "Anda memiliki versi beta";
xLng['NVERAV'] = "Versi script terbaru telah tersedia";
xLng['UPDATESCRIPT'] = "Update script sekarang?";
xLng['CHECKUPDATE'] = "Mengecek update script.<br>Harap tunggu...";
xLng['CROPFINDER'] = "Crop Finder";
xLng['AVPOPPERVIL'] = "Populasi rata-rata per desa";
xLng['AVPOPPERPLAYER'] = "Populasi rata-rata per pemain";
xLng['37'] = "Tampilkan tabel tingkatan lahan sumberdaya";
xLng['41'] = "Tampilkan tabel tingkatan bangunan";
xLng['69'] = "Console Log Level<br>HANYA UNTUK PROGRAMMERS SAAT DEBUGGING<br>(Default = 0)";
xLng['48'] = "Jumlah halaman penawaran untuk ditampilkan<br>saat ada di halaman 'Pasar => Beli'<br>(Default = 1)";
xLng['U.3'] = 'Nama Ibukota<br><b>Kunjungi profil Anda untuk perubahan</b>';
xLng['U.6'] = 'Koordinat Ibukota Anda<br><b>Kunjungi profil Anda untuk perubahan</b>';
xLng['MAX'] = 'Maks';
xLng['TOTALTROOPSTRAINING'] = 'Total pelatihan pasukan';
xLng['57'] = 'Tampilkan jarak & waktu';
xLng['UPDATEALLVILLAGES'] = 'Update semua desa. PEMAKAIAN MAKSIMUM BISA MENYEBABKAN AKUN ANDA DIHAPUS!';
xLng['9'] = "Tampilkan link tambahan di menu kiri<br>(Travian Toolbox, World Analyser, Travilog, Map, dll.)";
xLng['LARGEMAP'] = 'Peta lebar';
xLng['USETHEMPR'] = 'Pakai (proporsional)';
xLng['USETHEMEQ'] = 'Pakai (sama)';
xLng['TOWNHALL'] = 'Balai Desa';
xLng['GAMESERVERTYPE'] = 'Server permainan';
xLng['ACCINFO'] = 'Informasi Akun';
xLng['NOTEBLOCKOPTIONS'] = 'Catatan';
xLng['MENULEFT'] = 'Menu di sebelah kanan';
xLng['STATISTICS'] = 'Statistik';
xLng['RESOURCEFIELDS'] = 'Lahan Sumberdaya';
xLng['VILLAGECENTER'] = 'Pusat desa';
xLng['MAPOPTIONS'] = 'Opsi peta';
xLng['COLOROPTIONS'] = 'Opsi warna';
xLng['DEBUGOPTIONS'] = 'Opsi debug';
xLng['4'] = 'Pasar';
xLng['5'] = 'Titik temu|Barak|Bengkel|Istal';
xLng['6'] = "Balai desa|Padepokan|Pabrik perisai|Pandai besi";
xLng['HEROSMANSION'] = "Padepokan";
xLng['BLACKSMITH'] = 'Pandai besi';
xLng['ARMOURY'] = 'Pabrik perisai';
xLng['NOW'] = 'Sekarang';
xLng['CLOSE'] = 'Tutup';
xLng['USE'] = 'Pakai';
xLng['USETHEM1H'] = 'Pakai (1 jam produksi)';
xLng['OVERVIEW'] = 'Peninjauan';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Serangan';
xLng['NEWS'] = 'Berita';
xLng['ADDCRTPAGE'] = 'Tambahkan halaman ini';
xLng['SCRPURL'] = 'TBeyond Home';
xLng['50'] = 'Jumlah pengintai untuk<br>fungsi "Pilih pengintai"';
xLng['SPACER'] = 'Penjeda';
xLng['53'] = 'Tampilkan info pasukan di tooltip';
xLng['MESREPOPTIONS'] = 'Pesan & Laporan';
xLng['59'] = 'Jumlah halaman pesan/laporan untuk ditampilkan<br>(Default = 1)';
xLng['ATTABLES'] = 'Tabel pasukan';
xLng['MTW'] = 'Sisa muatan';
xLng['MTX'] = 'Melampaui';
xLng['MTC'] = 'Muatan saat ini';
xLng['ALLIANCEFORUMLINK'] = 'Link ke forum luar<br>(kosongkan untuk memakai forum internal)';
xLng['82.L'] = 'Kunci bookmark (sembunyikan ikon hapus, naikkan, turunkan)';
xLng['MTCL'] = 'Kosongkan Semua';
xLng['82.U'] = 'Buka bookmark (tampilkan ikon hapus, naikkan, turunkan)';
xLng['CLICKSORT'] = 'Klik untuk mengurutkan';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Pembagian diantara desa-desa';
xLng['VILLAGELIST'] = 'Daftar Desa';
xLng['12'] = "tampilkan link 'Peninjauan Desa' dan 'Pusat Desa'";
xLng['UPDATEPOP'] = 'Update populasi';
xLng['54'] = 'Tampilkan jarak dan waktu ke desa-desa di tooltip';
xLng['EDIT'] = 'Ubah';
xLng['NPCOPTIONS'] = 'Opsi NPC Assistant';
xLng['26'] = 'Tampilkan link kalkulasi dari NPC Assistant';
xLng['58'] = 'Tampilkan tabel pemain, desa dan oasis yang dikuasai';
xLng['NEWVILLAGEAV'] = 'Tanggal/Waktu';
xLng['TIMEUNTIL'] = 'Waktu untuk menunggu';
xLng['61'] = 'Tampilkan tabel "Hapus semua" di halaman Laporan';
xLng['62'] = 'Tampilkan ikon "Kirim Pesan"';
xLng['CENTERMAP'] = 'Desa ini sebagai tengah-tengah peta';
xLng['13'] = 'Tampilkan ikon "Desa ini sebagai tengah-tengah peta"';
xLng['SENDTROOPS'] = 'Kirim Pasukan';
xLng['64'] = 'Tampilkan detail pada Laporan Statistik';
xLng['7'] = "Istana|Kastil|Akademi|Gudang Ilmu";
xLng['PALACE'] = "Istana";
xLng['RESIDENCE'] = "Kastil";
xLng['ACADEMY'] = "Akademi";
xLng['TREASURY'] = "Gudang Ilmu";
xLng['45'] = "Tampilkan kedipan untuk bangunan yang sedang ditingkatkan";
xLng['60'] = 'Tampilkan link untuk membuka pesan dalam popup';
xLng['RESBARTABLETITLE'] = "Tabel Sumberdaya";
xLng['39'] = "Tampilkan 'Tabel Sumberdaya'";
xLng['40'] = "Tampilkan 'Tabel Sumberdaya' sebagai jendela terpisah";
xLng['21'] = "Tampilkan bookmark sebagai jendela terpisah";
xLng['23'] = "Tampilkan blok catatan sebagai jendela terpisah";
xLng['16'] = "Tampilkan produksi gandum efektif di daftar desa";
xLng['36'] = "Tampilkan penghitungan sisa Sumberdaya di tabel tingkatan/pelatihan";
xLng['RESIDUE'] = 'Sisa Sumberdaya jika dibangun ';
xLng['RESOURCES'] = 'Sumberdaya';
xLng['34'] = "Tampilkan informasi NB/hari di tabel tingkatan";
xLng['35'] = "Tampilkan informasi penggunaan gandum di tabel tingkatan";
xLng['29'] = 'Map Analyser yang dipakai';
xLng['30'] = 'Tampilkan link ke Map Analyser untuk pemain';
xLng['31'] = 'Tampilkan link ke Map Analyser untuk aliansi';
xLng['32'] = "Tampilkan 'Tabel Pencarian'";
xLng['33'] = "Tampilkan 'Tabel Pencarian' sebagai jendela terpisah";
xLng['UPGTABLES'] = "Tabel Tingkatan Sumberdaya/Bangunan";
xLng['14'] = "Tampilkan ikon 'Kirim Sumberdaya/Kirim Pasukkan' di daftar desa";
xLng['17'] = "Tampilkan populasi di daftar desa";
xLng['18'] = 'Tampilkan daftar desa tambahan (2 kolom) sebagai jendela terpisah';
xLng['19'] = 'Tampilkan informasi tentang pembangunan dan pergerakan pasukkan<br>di daftar desa';
xLng['42'] = 'Urutkan bangunan berdasarkan nama di tabel tingkatan';
xLng['63'] = 'Tampilkan laporan penyerangan TB3 yang disempurnakan';
break;
case "bg"://by NUT 
xLng['8'] = 'Съюз';
xLng['SIM'] = 'Симулатор на битки';
xLng['QSURE'] = 'Сигурни ли сте?';
xLng['LOSS'] = 'Загуба';
xLng['PROFIT'] = 'Печалба';
xLng['EXTAV'] = 'Възможно надстрояване';
xLng['PLAYER'] = 'Играч';
xLng['VILLAGE'] = 'Село';
xLng['POPULATION'] = 'Популация';
xLng['COORDS'] = 'Координати';
xLng['MAPTBACTS'] = 'Действия';
xLng['SAVED'] = 'Промените са запазени';
xLng['YOUNEED'] = 'Имате нужда от';
xLng['TODAY'] = 'днес';
xLng['TOMORROW'] = 'утре';
xLng['DAYAFTERTOM'] = 'в други ден';
xLng['MARKET'] = 'Пазар';
xLng['BARRACKS'] = 'Казарма';
xLng['RALLYPOINT'] = 'Сборен пункт';
xLng['STABLE'] = 'Конюшня';
xLng['WORKSHOP'] = 'Работилница';
xLng['SENDRES'] = 'Изпрати ресурси';
xLng['BUY'] = 'Купи';
xLng['SELL'] = 'Продай';
xLng['SENDIGM'] = 'Изпрати лично съобщение';
xLng['LISTO'] = 'Възможно';
xLng['ON'] = 'на';
xLng['AT'] = 'в';
xLng['EFICIENCIA'] = 'Способност';
xLng['NEVER'] = 'Никога';
xLng['ALDEAS'] = 'Село(а)';
xLng['TIEMPO'] = 'Време';
xLng['OFREZCO'] = 'Предлагане';
xLng['BUSCO'] = 'Търсене';
xLng['TIPO'] = 'Вид';
xLng['DISPONIBLE'] = 'Само възможните';
xLng['CUALQUIERA'] = 'Всички';
xLng['YES'] = 'Да';
xLng['NO'] = 'Не';
xLng['LOGIN'] = 'Влизане';
xLng['MARCADORES'] = 'Отметки';
xLng['ANYADIR'] = 'Прибавяне';
xLng['UBU'] = 'Нова отметка URL';
xLng['UBT'] = 'Нова отметка Текст';
xLng['ELIMINAR'] = 'Изтриване';
xLng['MAPA'] = 'Карта';
xLng['MAXTIME'] = 'Максимално време';
xLng['ARCHIVE'] = 'Архив';
xLng['SUMMARY'] = 'Общо';
xLng['TROPAS'] = 'Войски';
xLng['CHKSCRV'] = 'Обнови TBeyond';
xLng['ACTUALIZAR'] = 'Обнови информацията за селото';
xLng['VENTAS'] = 'Запази офертите';
xLng['MAPSCAN'] = 'Сканирай картата';
xLng['BIGICONS'] = 'Покажи допълнителни икони';
xLng['22'] = 'Покажи бележка';
xLng['SAVE'] = 'Възможно:';
xLng['49'] = 'Сборен пункт нормално действие';
xLng['AT2'] = 'Подкрепление';
xLng['AT3'] = 'Атака: Нормална';
xLng['AT4'] = 'Атака: Набег';
xLng['24'] = 'Размер на бележката';
xLng['NBSIZEAUTO'] = 'Автоматично';
xLng['NBSIZENORMAL'] = 'Нормално (малко)';
xLng['NBSIZEBIG'] = 'Широк екран (голямо)';
xLng['25'] = 'Размер бележка - височина';
xLng['NBAUTOEXPANDHEIGHT'] = 'Автоматично уголеми височината';
xLng['NBKEEPHEIGHT'] = 'Стандартна височина';
xLng['43'] = 'Покажи нивата на сградите';
xLng['NPCSAVETIME'] = 'Запази: ';
xLng['38'] = 'Покажи цветни нива на ресурсите';
xLng['44'] = 'Покажи цветни нива на сградите';
xLng['65'] = 'Разрешена промяна на цвета<br>(Default = Empty)';
xLng['66'] = 'Цвят за максимално ниво<br>(Default = Empty)';
xLng['67'] = 'Невъзможна смяна на цвета<br>(Default = Empty)';
xLng['68'] = 'Смяна на цвета през NPC<br>(Default = Empty)';
xLng['TOTALTROOPS'] = 'Общо войски за селото';
xLng['20'] = 'Покажи отметките';
xLng['U.2'] = 'Раса';
xLng['1'] = "Travian v2.x сървър";
xLng['SELECTALLTROOPS'] = "Маркирай всички войски";
xLng['PARTY'] = "Празненства";
xLng['CPPERDAY'] = "КР/ден";
xLng['SLOT'] = "Слот";
xLng['TOTAL'] = "Общо";
xLng['SELECTSCOUT'] = "Избери шпионин";
xLng['SELECTFAKE'] = "Избери фалшив";
xLng['NOSCOUT2FAKE'] = "Не е възможно да използвате шпионин за фалшива атака !";
xLng['NOTROOP2FAKE'] = "Няма избрани войски за фалшива атака!";
xLng['NOTROOP2SCOUT'] = "Няма налични шпиони!";
xLng['NOTROOPS'] = "Няма налични войски !";
xLng['ALL'] = "Всички";
xLng['SH2'] = "В цветните полета можеш да поставяш:<br>- orange или red или green, и т.н.<br>- HEX цвят пример #004523<br>- остави празно за стандартния цвят";
xLng['SHOWORIGREPORT'] = "Покажи оригиналния доклад";
xLng['56'] = "Покажи информация за вида/оазиса<br>докато посочвам с мишката върху картата";
xLng['10'] = "Симулатор на битки:<br>(в лявото меню)";
xLng['WARSIMOPTION1'] = "Вътрешно (доставено от играта)";
xLng['WARSIMOPTION2'] = "Външно (доставено от kirilloid.ru)";
xLng['27'] = "Световен анализатор";
xLng['28'] = "Покажи връзка към анализатора";
xLng['NONEWVER'] = "Имате последната възможна версия";
xLng['BVER'] = "Вие разполагате с бета версия";
xLng['NVERAV'] = "Има нова версия на скрипта";
xLng['UPDATESCRIPT'] = "Обнови версията на скрипта сега ?";
xLng['CHECKUPDATE'] = "Проверка за обновявания.<br>Моля изчакайте...";
xLng['CROPFINDER'] = "Търсене на поля";
xLng['AVPOPPERVIL'] = "Средна популация за селото";
xLng['AVPOPPERPLAYER'] = "Средна популация за играч";
xLng['37'] = "Покажи таблица с надстройките на ресурсните полета";
xLng['41'] = "Покажи таблица с надстройките на сградите";
xLng['69'] = "Ниво на LOG<br>САМО ЗА ПРОГРАМИСТИ<br>(Default = 0)";
xLng['48'] = "Брой страници с оферти за презареждане<br>докато е в 'Пазара => Купи' страница<br>(Default = 1)";
xLng['U.3'] = 'Име на вашата столица<br>Посети твоя профил за обновяване';
xLng['U.6'] = 'Координати на твоята столица<br>Посети твоя профил за обновяване';
xLng['MAX'] = 'Максимално';
xLng['TOTALTROOPSTRAINING'] = 'Общо тренирани единици';
xLng['57'] = 'Покажи разстоянието & времето';
xLng['TBSETUPLINK'] = TB3O.shN + ' Настройка';
xLng['UPDATEALLVILLAGES'] = 'Обнови за всички села. ИЗПОЛЗВАЙ С МАКСИМАЛНО ВНИМАНИЕ ЗА ДА НЕ БЪДЕШ НАКАЗАН !';
xLng['9'] = "Покажи допълнителни връзки в лявото меню<br>(Traviantoolbox, World Analyser, Travilog, Map, и т.н.)";
xLng['LARGEMAP'] = 'Голяма карта';
xLng['USETHEMPR'] = 'Използвай ги (пропорционално)';
xLng['USETHEMEQ'] = 'Използвай ги (по равно)';
xLng['TOWNHALL'] = 'Кметство';
xLng['GAMESERVERTYPE'] = 'Сървър на играта';
xLng['ACCINFO'] = 'Информация за акаунта';
xLng['NOTEBLOCKOPTIONS'] = 'Бележник';
xLng['MENULEFT'] = 'Меню от лявата страна';
xLng['STATISTICS'] = 'Статистика';
xLng['RESOURCEFIELDS'] = 'Ресурсни полета';
xLng['VILLAGECENTER'] = 'Мегдан';
xLng['MAPOPTIONS'] = 'Опции на картата';
xLng['COLOROPTIONS'] = 'Опции за цвета';
xLng['DEBUGOPTIONS'] = 'Debug опции';
xLng['4'] = 'Пазар';
xLng['5'] = 'Сборен пункт/Казарма/Работилница/Конюшня';
xLng['6'] = "Кметство/Таверна/Ковачница за оръжия/Ковачница за брони";
xLng['HEROSMANSION'] = "Таверна";
xLng['ARMOURY'] = 'Ковачница за брони';
xLng['BLACKSMITH'] = 'Ковачница за оръжия';
xLng['NOW'] = 'Сега';
xLng['CLOSE'] = 'Затвори';
xLng['USE'] = 'Използвай';
xLng['USETHEM1H'] = 'Използвай ги (1 часова продукция)';
xLng['OVERVIEW'] = 'Общ изглед';
xLng['FORUM'] = 'Форум';
xLng['ATTACKS'] = 'Атаки';
xLng['NEWS'] = 'Новини';
xLng['ADDCRTPAGE'] = 'Добави текущо';
xLng['SCRPURL'] = 'TBeyond страница';
xLng['50'] = 'Бр. на шпионите за<br>"Избери шпиони" функция';
xLng['SPACER'] = 'Разстояния';
xLng['53'] = 'Покажи информация за войските в tooltips';
xLng['MESREPOPTIONS'] = 'Съобщения & Доклади';
xLng['59'] = 'Брой Съобщения/доклади страници за презареждане<br>(Default = 1)';
xLng['ATTABLES'] = 'Таблица на войските';
xLng['MTW'] = 'Налично';
xLng['MTX'] = 'В излишък';
xLng['MTC'] = 'Текущ товар';
xLng['ALLIANCEFORUMLINK'] = 'Връзка към форум<br>(Остави празно за вътрешния форум)';
xLng['82.L'] = 'Заключи отметките (Скрий изтриване, местене нагоре, местене на долу на иконите)';
xLng['MTCL'] = 'Изчисти всички';
xLng['82.U'] = 'Отключи отметките (Покажи изтриване, местене нагоре, местене на долу на иконите)';
xLng['CLICKSORT'] = 'Натисни за сортиране';
xLng['MIN'] = 'Минимално';
xLng['SAVEGLOBAL'] = 'Разпределяне между селата';
xLng['VILLAGELIST'] = 'Списък на селата';
xLng['12'] = "Покажи 'dorf1.php' и 'dorf2.php' връзки";
xLng['UPDATEPOP'] = 'Обнови популацията';
xLng['54'] = 'Покажи разстоянието и времето до селата в tooltips';
xLng['EDIT'] = 'Промяна';
xLng['NPCOPTIONS'] = 'NPC опции за помощ';
xLng['26'] = 'Покажи NPC помошник калкулатор/връзка';
xLng['58'] = 'Покажи таблица на играчите/селата/превзети оазиси';
xLng['NEWVILLAGEAV'] = 'Дата/Час';
xLng['TIMEUNTIL'] = 'Време за изчакване';
xLng['61'] = 'Покажи "Изтрий всички" таблица в страницата с докладите';
xLng['62'] = 'Покажи "Изпрати лично съобщение" икона за мен също';
xLng['CENTERMAP'] = 'Карта';
xLng['13'] = 'Покажи "Карта" икона';
xLng['SENDTROOPS'] = 'Изпрати войски';
xLng['64'] = 'Покажи детайли в докладите';
xLng['7'] = "Дворец/Резиденция/Академия/Съкровишница";
xLng['PALACE'] = "Дворец";
xLng['RESIDENCE'] = "Резиденция";
xLng['ACADEMY'] = "Академия";
xLng['TREASURY'] = "Съкровишница";
xLng['45'] = "Покажи мигащи нива на сградите които са надстроени";
xLng['14'] = "Покажи 'Изпрати войски/Изпрати ресурси' икони в списъка на селото";
xLng['34'] = "Покажи КР/ден информация в таблицата";
xLng['UPGTABLES'] = "Ресурсни полета/сгради таблица";
xLng['35'] = "Покажи консумацията на сградите в таблицата";
xLng['16'] = "Покажи ефективната продукция на полетата в списъка на селото";
xLng['RESBARTABLETITLE'] = "Лента на ресурсите";
xLng['39'] = "Покажи 'Лента на ресурсите' таблица";
xLng['40'] = "Покажи 'Лента на ресурсите' таблица в отделен прозорец";
xLng['21'] = "Покажи 'Потребителски отметки' в отделен прозорец";
xLng['23'] = "Покажи 'Бележник' в отделен прозорец";
xLng['17'] = "Покажи популацията в списъка на селото";
xLng['29'] = 'Анализатор на картата';
xLng['30'] = 'Покажи връзки към потребителите в картата';
xLng['31'] = 'Покажи връзки към съюзите в картата';
xLng['63'] = 'Покажи TB3 Разширен доклад на битки';
xLng['18'] = 'Покажи допълнителни (2 колони) в списъка на селото в отделен прозорец';
xLng['60'] = 'Покажи връзки към съобщенията/докладите в отворящ се прозорец';
xLng['42'] = 'Сортирай сградите по име в таблицата';
xLng['19'] = 'Покажи информация за сградите в прогрес и движението на войските<br>в списъка на селото';
xLng['32'] = "Покажи 'Лента за търсене'";
xLng['3'] = 'Изчисли T3.1 Легионери & Фаланги капацитет<br>(за смесени T3.1 & T3.5 сървъри)';
xLng['33'] = "Покажи 'Лента за търсене' в отделен прозорец";
xLng['36'] = "Покажи 'Докато/Остатък' калкулатор в надстрой/тренирай таблиците";
xLng['RESIDUE'] = 'Остатък ако построите ';
xLng['RESOURCES'] = 'Ресурси';
xLng['SH1'] = "Отвори твоя профил за автоматично намиране на столица/координати<br>Построй казарма за автоматично засичане на расата и после отвори мегдана";
xLng['46'] = "Покажи допълнителна информация за всеки пристигнал търговец";
xLng['2'] = 'Премахни рекламните банери';
xLng['15'] = "Покажи дърва, глина, желязо продукция за час в списъка на селото";
xLng['11'] = "Препратка за военни доклади";
break;
case "pl":
//by Dzikuska & Signum & llameth
xLng['8'] = 'Sojusz';
xLng['SIM'] = 'Symulator Walki';
xLng['QSURE'] = 'Jesteś pewien?';
xLng['LOSS'] = 'Strata';
xLng['PROFIT'] = 'Zysk';
xLng['EXTAV'] = 'Rozbudowa możliwa';
xLng['PLAYER'] = 'Gracz';
xLng['VILLAGE'] = 'Osada';
xLng['POPULATION'] = 'Populacja';
xLng['COORDS'] = 'Koordynaty';
xLng['MAPTBACTS'] = 'Akcje';
xLng['SAVED'] = 'Zapisane';
xLng['YOUNEED'] = 'Potrzebujesz';
xLng['TODAY'] = 'Dzisiaj';
xLng['TOMORROW'] = 'Jutro';
xLng['DAYAFTERTOM'] = 'Pojutrze';
xLng['MARKET'] = 'Rynek';
xLng['BARRACKS'] = 'Koszary';
xLng['RALLYPOINT'] = 'Miejsce Zbiórki';
xLng['STABLE'] = 'Stajnia';
xLng['WORKSHOP'] = 'Warsztat';
xLng['SENDRES'] = 'Wyślij surowce';
xLng['BUY'] = 'Kup';
xLng['SELL'] = 'Sprzedaj';
xLng['SENDIGM'] = 'Wyślij PW';
xLng['LISTO'] = 'Możliwe';
xLng['ON'] = 'na';
xLng['AT'] = 'o';
xLng['EFICIENCIA'] = 'Efektywność';
xLng['NEVER'] = 'Nigdy';
xLng['ALDEAS'] = 'Osada(y)';
xLng['TIEMPO'] = 'Czas';
xLng['OFREZCO'] = 'Oferuję';
xLng['BUSCO'] = 'Szukam';
xLng['TIPO'] = 'Rodzaj';
xLng['DISPONIBLE'] = 'Tylko możliwe';
xLng['CUALQUIERA'] = 'Jakikolwiek';
xLng['YES'] = 'Tak';
xLng['NO'] = 'Nie';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Zakładki';
xLng['ANYADIR'] = 'Dodaj';
xLng['UBU'] = 'Nowa zakładka URL';
xLng['UBT'] = 'Nowa zakładka Text';
xLng['ELIMINAR'] = 'Usuń';
xLng['MAPA'] = 'Mapa';
xLng['MAXTIME'] = 'Maksimum czasu';
xLng['ARCHIVE'] = 'Archiwum';
xLng['SUMMARY'] = 'Razem';
xLng['TROPAS'] = 'Jednostki';
xLng['CHKSCRV'] = 'Uaktualnij TBeyond';
xLng['ACTUALIZAR'] = 'Aktualizuj informacje o osadzie';
xLng['VENTAS'] = 'Zapisz ofertę';
xLng['MAPSCAN'] = 'Skanuj mapę';
xLng['BIGICONS'] = 'Pokaż rozszerzone ikony';
xLng['22'] = 'Pokaż notatnik';
xLng['SAVE'] = 'Zapisz';
xLng['49'] = 'Miejsce zbiórki, domyślna akcja';
xLng['AT2'] = 'Posiłki';
xLng['AT3'] = 'Atak: Normalny';
xLng['AT4'] = 'Atak: Grabież';
xLng['24'] = 'Notatnik - Rozmiar';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normalny (mały)';
xLng['NBSIZEBIG'] = 'Duży obraz (duży)';
xLng['25'] = 'Notatnik - wysokość';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automatycznie ustaw wysokość';
xLng['NBKEEPHEIGHT'] = 'Domyślna wysokość';
xLng['43'] = 'Pokaż centrum osady';
xLng['NPCSAVETIME'] = 'Zapisz: ';
xLng['38'] = 'Pokaż kolory poziomu surowców';
xLng['44'] = 'Pokaż kolory poziomu budynków';
xLng['65'] = 'Kolor: rozbudowa możliwa<br>(Domyślnie  = Brak)';
xLng['66'] = 'Kolor: poziomu maksymalnego<br>(Domyślnie  = Brak)';
xLng['67'] = 'Kolor: rozbudowa niemożliwa<br>(Domyślnie  = Brak)';
xLng['68'] = 'Kolor: rozbudowa przy pomocy NPC<br>(Domyślnie  = Brak)';
xLng['TOTALTROOPS'] = 'Wszystkie jednostki';
xLng['20'] = 'Pokaż zakładki';
xLng['U.2'] = 'Rasa';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Wybierz wszystkie jednostki";
xLng['PARTY'] = "Święto";
xLng['CPPERDAY'] = "PK/dzień";
xLng['SLOT'] = "Miejsce";
xLng['TOTAL'] = "Razem";
xLng['SELECTSCOUT'] = "Wybierz zwiadowców";
xLng['SELECTFAKE'] = "Wybierz fejka";
xLng['NOSCOUT2FAKE'] = "Nie można użyć zwiadowcy do wysłania fejka !";
xLng['NOTROOP2FAKE'] = "Brak jednostek aby wysłać fejka!";
xLng['NOTROOP2SCOUT'] = "Brak jednostek aby wysłać zwiadowcę !";
xLng['NOTROOPS'] = "Brak jednostek w osadzie !";
xLng['ALL'] = "Wszystko";
xLng['SH2'] = "Jako kolor pól możesz wpisać:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- lub kod koloru w HEX np. <b>#004523</b><br>- zostaw puste dla domyślnych kolorów";
xLng['SHOWORIGREPORT'] = "Pokaż oryginalny raport (do publikacji)";
xLng['56'] = "Pokaż zawartość i typ doliny<br>kiedy wskażesz myszką";
xLng['10'] = "Symulator walki link do:<br>(menu z lewej strony)";
xLng['WARSIMOPTION1'] = "Wewnętrzny (wbudowany w grę)";
xLng['WARSIMOPTION2'] = "Zewnętrzny (zrobiony przez kirilloid.ru)";
xLng['27'] = "Używany World Analyser ";
xLng['28'] = "Pokaż linki statystyki analysera";
xLng['NONEWVER'] = "Masz najnowszą wersję";
xLng['BVER'] = "Masz wersję beta";
xLng['NVERAV'] = "Nowa wersja skryptu jest możliwa do pobrania";
xLng['UPDATESCRIPT'] = "Uaktualnić skrypt teraz? ?";
xLng['CHECKUPDATE'] = "Sprawdzam aktualizację skryptu.<br>Proszę czekać...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Średnia populacja wg osady";
xLng['AVPOPPERPLAYER'] = "Średnia populacja wg gracza";
xLng['37'] = "Pokaż tabelkę rozbudowy surowców";
xLng['41'] = "Pokaż tabelkę rozbudowy budynków";
xLng['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0)";
xLng['48'] = "Liczba stron ofert na rynku <br>w zakładce 'Rynek => Kupowanie' Stron<br>(Domyślnie = 1)";
xLng['U.3'] = 'Nazwa Twojej stolicy<br><b>Wejdź do swojego profilu w ustawieniach aby zaktualizować</b>';
xLng['U.6'] = 'Współrzędne Twojej stolicy<br><b>Wejdź do swojego profilu w ustawieniach aby zaktualizować</b>';
xLng['MAX'] = 'Maks.';
xLng['TOTALTROOPSTRAINING'] = 'Suma szkolonych jednostek';
xLng['57'] = 'Pokaż dystans i czas';
xLng['UPDATEALLVILLAGES'] = 'Uaktualnij wszystkie osady. UŻYWAJ TEGO Z MAKSYMALNĄ ROZWAGĄ. MOŻE DOPROWADZIĆ DO ZABLOKOWANIA KONTA !';
xLng['9'] = "Pokaż dodatkowe linki w menu po lewej stronie<br>(Traviantoolbox, World Analyser, Travilog, Map, itp.)";
xLng['LARGEMAP'] = 'Duża mapa';
xLng['USETHEMPR'] = 'Użyj je  (proporcjonalnie)';
xLng['USETHEMEQ'] = 'Użyj je (równe)';
xLng['TOWNHALL'] = 'Ratusz';
xLng['GAMESERVERTYPE'] = 'Serwer gry';
xLng['ACCINFO'] = 'Informacje o koncie';
xLng['NOTEBLOCKOPTIONS'] = 'Notatnik';
xLng['MENULEFT'] = 'Menu po lewej stronie';
xLng['STATISTICS'] = 'Statystyki';
xLng['RESOURCEFIELDS'] = 'Pola surowców';
xLng['VILLAGECENTER'] = 'Centrum osady';
xLng['MAPOPTIONS'] = 'Opcje mapy';
xLng['COLOROPTIONS'] = 'Opcje kolorów';
xLng['DEBUGOPTIONS'] = 'Debug options';
xLng['4'] = 'Rynek';
xLng['5'] = 'Miejsce zbiórki/koszary/Warsztat/Stajnia';
xLng['6'] = "Ratusz/Dwór bohaterów/Kuźnia/Zbrojownia";
xLng['HEROSMANSION'] = "Dwór bohaterów";
xLng['BLACKSMITH'] = 'Zbrojownia';
xLng['ARMOURY'] = 'Kuźnia';
xLng['NOW'] = 'Teraz';
xLng['CLOSE'] = 'Zamknij';
xLng['USE'] = 'Użyj';
xLng['USETHEM1H'] = 'Użyj je (1 godzinna  produkcja)';
xLng['OVERVIEW'] = 'Ogólne';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Ataki';
xLng['NEWS'] = 'Nowości';
xLng['ADDCRTPAGE'] = 'Dodaj bieżącą';
xLng['SCRPURL'] = 'Strona TBeyond';
xLng['50'] = 'Ilość zwiadowców dla funkcji<br>"Wybierz zwiadowców"';
xLng['SPACER'] = 'Odstęp';
xLng['53'] = 'Pokaż informację o jednostkach w podpowiedziach';
xLng['MESREPOPTIONS'] = 'Wiadomości i raporty';
xLng['59'] = 'Liczba wiadomości/raportów na stronie  <br>(Domyslnie = 1)';
xLng['ATTABLES'] = 'Tabela jednostek';
xLng['MTW'] = 'Niewykorzystane';
xLng['MTX'] = 'Przekroczenie';
xLng['MTC'] = 'Bierząca ładowność';
xLng['ALLIANCEFORUMLINK'] = 'Link do zewnętrznego forum<br>(Zostaw puste dla wewnętrznego forum)';
xLng['82.L'] = 'Zablokuj zakładki (Ukryj usuń, do góry, na dół ikonki)';
xLng['MTCL'] = 'Wyczyść wszystko';
xLng['82.U'] = 'Odblokuj zakładki (Ukryj usuń, do góry, na dół ikonki)';
xLng['CLICKSORT'] = 'Kliknij aby posortować';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Zapisz również dla innych osad';
xLng['VILLAGELIST'] = 'Lista Osad';
xLng['12'] = "Pokaż 'dorf1.php' i 'dorf2.php' linki";
xLng['UPDATEPOP'] = 'Aktualizuj populację';
xLng['54'] = 'Pokaż odległość i czas dojścia do osady w podpowiedziach';
xLng['EDIT'] = 'Edytuj';
xLng['NPCOPTIONS'] = 'Opcje handlarza NPC';
xLng['26'] = 'Pokaż kalkulacje handlarza NPC /linki';
xLng['NEWVILLAGEAV'] = 'Nowa osada';
xLng['58'] = 'Pokaż tabelkę graczy/osad/zdobytych dolin';
xLng['NEWVILLAGEAV'] = 'Data/Czas';
xLng['TIMEUNTIL'] = 'Pozostało czasu';
xLng['61'] = 'Pokaż tabelkę "Usuń wszystko" na stronie z raportami';
xLng['62'] = 'Pokaż ikonkę "Wyślij PW" również dla mnie';
xLng['CENTERMAP'] = 'Centruj mapę na tej osadzie';
xLng['13'] = 'Pokaż ikonkę "Centruj mapę na tej osadzie"';
xLng['SENDTROOPS'] = 'Wyślij jednostki';
xLng['64'] = 'Pokaż szczegóły statystyk w raporcie';
xLng['7'] = "Pałac/Rezydencja/Akademia/Skarbiec";
xLng['PALACE'] = "Pałac";
xLng['RESIDENCE'] = "Rezydencja";
xLng['ACADEMY'] = "Akademia";
xLng['TREASURY'] = "Skarbiec";
xLng['45'] = "Pokaż poziom budynku który jest aktualnie budowany jako migający";
xLng['14'] = "W spisie osad pokaż ikonki 'Wyślij jednostki/Wyślij surowce'";
xLng['34'] = "Pokaż PK/dzień w tabelce rozbudowy";
xLng['UPGTABLES'] = "Tabelka rozbudowy Pola surowców/budynków";
xLng['35'] = "Pokaż zjadane zboże w tabelce rozbudowy";
xLng['60'] = 'Pokaż link do otwarcia wiadomości w okienku';
xLng['16'] = "Pokaż rzeczywistą produkcję zboża na liście osad";
xLng['RESBARTABLETITLE'] = "Tabela surowców";
xLng['39'] = "Pokaż 'Tabelę surowców'";
xLng['40'] = "Pokaż 'Tabelę surowców' jako 'pływające' okno";
xLng['21'] = "Pokaż 'Zakładki' jako 'pływające' okno";
xLng['23'] = "Pokaż 'Notatnik' jako 'pływające' okno";
xLng['17'] = "Pokaż liczbę ludnosci na liście osad";
xLng['29'] = 'Jakiego analizatora map chcesz używać';
xLng['30'] = 'Pokaż odwołania do mapy dla graczy';
xLng['31'] = ' Pokaż odwołania do mapy dla sojuszy';
xLng['63'] = 'Pokaz rozszerzone Raporty Bitewne TB3';
xLng['3'] = 'Wymuś obliczanie liczby Legionistów i Falang wg. wersji T3.1<br>(dla mieszanych serwerów T3.1 & T3.5 – zwykle tylko serwery .de)';
xLng['18'] = "Pokaż dodatkową (2-kolumnową) listę osad jako 'pływające okno'";
xLng['60'] = 'Pokaż ikonkę pozwalającą otwierać wiadomości/raporty<br>w osobnym okienku (pop-up)';
xLng['42'] = 'Sortowanie budynków wg. nazwy w tabeli rozbudowy osady';
break;
case "ba":
case "hr":
//by Nemanja
xLng['8'] = 'Alijansa';
xLng['SIM'] = 'Simulator borbe';
xLng['QSURE'] = 'Da li ste sigurni?';
xLng['LOSS'] = 'Gubitak';
xLng['PROFIT'] = 'Profit';
xLng['EXTAV'] = 'Dostupna ekstenzija';
xLng['PLAYER'] = 'Igrač';
xLng['VILLAGE'] = 'Selo';
xLng['POPULATION'] = 'Populacija';
xLng['COORDS'] = 'Koordinate';
xLng['MAPTBACTS'] = 'Akcije';
xLng['SAVED'] = 'Sačuvano';
xLng['YOUNEED'] = 'Potrebno';
xLng['TODAY'] = 'danas';
xLng['TOMORROW'] = 'sutra';
xLng['DAYAFTERTOM'] = 'prekosutra';
xLng['MARKET'] = 'Pijaca';
xLng['BARRACKS'] = 'Kasarna';
xLng['RALLYPOINT'] = 'Mjesto okupljanja';
xLng['STABLE'] = 'Štala';
xLng['WORKSHOP'] = 'Radionica';
xLng['SENDRES'] = 'Slanje resursa';
xLng['BUY'] = 'Kupovina';
xLng['SELL'] = 'Prodaja';
xLng['SENDIGM'] = 'Pošalji poruku';
xLng['LISTO'] = 'Dostupno';
xLng['ON'] = 'za';
xLng['AT'] = 'u';
xLng['EFICIENCIA'] = 'Učinkovitost';
xLng['NEVER'] = 'Nikad';
xLng['PC'] = 'Kulturalni poeni';
xLng['ALDEAS'] = 'Sela';
xLng['TIEMPO'] = 'Vrijemo';
xLng['OFREZCO'] = 'Nudi';
xLng['BUSCO'] = 'Traži';
xLng['TIPO'] = 'Tip';
xLng['DISPONIBLE'] = 'Dostupno samo';
xLng['CUALQUIERA'] = 'Svejedno';
xLng['YES'] = 'Da';
xLng['NO'] = 'Ne';
xLng['LOGIN'] = 'Prijava';
xLng['MARCADORES'] = 'Oznake';
xLng['ANYADIR'] = 'Dodaj';
xLng['UBU'] = 'Dodaj adresu u Oznake';
xLng['UBT'] = 'Dodaj tekst u Oznake';
xLng['ELIMINAR'] = 'Obriši';
xLng['MAPA'] = 'Mapa';
xLng['MAXTIME'] = 'Maksimalno vrijeme';
xLng['ARCHIVE'] = 'Arhiva';
xLng['SUMMARY'] = 'Rezime';
xLng['TROPAS'] = 'Vojska';
xLng['CHKSCRV'] = 'Update';
xLng['ACTUALIZAR'] = 'Ažuriraj podatke o selu';
xLng['VENTAS'] = 'Spremljenje ponude';
xLng['MAPSCAN'] = 'Skeniraj mapu';
xLng['BIGICONS'] = 'Prikazuj proširene ikone';
xLng['22'] = 'Prikaži notes';
xLng['SAVE'] = 'Spremi';
xLng['49'] = 'Standardna akcija za<br>mjesto okupljanja';
xLng['AT2'] = 'Pojačanje';
xLng['AT3'] = 'Napad: normalan';
xLng['AT4'] = 'Napad: pljačka';
xLng['24'] = 'Veličina notesa';
xLng['NBSIZEAUTO'] = 'Automatski';
xLng['NBSIZENORMAL'] = 'Normalno (malo)';
xLng['NBSIZEBIG'] = 'Veliki ekran (veliko)';
xLng['25'] = 'Visina notesa';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automatsko proširenje visine';
xLng['NBKEEPHEIGHT'] = 'Standardna visina';
xLng['43'] = 'Prikaži centralne brojeve';
xLng['NPCSAVETIME'] = 'Spremi: ';
xLng['38'] = 'Prikazuj boje nivoa resursa';
xLng['44'] = 'Prikazuj boje nivoa građevine';
xLng['65'] = 'Boja dostupne nadogradnje<br>(Zadano = prazno)';
xLng['66'] = 'Boja maksimalnog nivoa<br>(Zadano = prazno)';
xLng['67'] = 'Boja nemoguće nadogradnje<br>(Zadano = prazno)';
xLng['68'] = 'Boja nadogradnje pomoću NPC-a<br>(Zadano = prazno)';
xLng['TOTALTROOPS'] = 'Ukupna vojska sela';
xLng['20'] = 'Prikaži Oznake';
xLng['U.2'] = 'Pleme';
xLng['1'] = 'Travian v2.x server';
xLng['SELECTALLTROOPS'] = 'Izaberi sve vojnike';
xLng['PARTY'] = 'Zabave';
xLng['CPPERDAY'] = 'KP/dnevno';
xLng['SLOT'] = 'Slot';
xLng['TOTAL'] = 'Ukupno';
xLng['SELECTSCOUT'] = 'Izaberi izviđača';
xLng['SELECTFAKE'] = 'Izaberi lažnjak';
xLng['NOSCOUT2FAKE'] = 'Nije moguće koristiti izviđače za lažni napad!';
xLng['NOTROOP2FAKE'] = 'Nema jedinica za lažni napad!';
xLng['NOTROOP2SCOUT'] = 'Nema jedinica za izviđanje!';
xLng['NOTROOPS'] = 'Nema jedinica u selu!';
xLng['ALL'] = 'Sve';
xLng['SH2'] = 'U polja boje možeš unijeti:<br>- green ili red ili  orange, itd.<br>- HEX (heksadecimalni) kod boje poput #004523<br>- ostaviti prazno za standardnu boju';
xLng['SHOWORIGREPORT'] = 'Prikaži originalni izvještaj (za postanje)';
xLng['56'] = 'Prikazuj podatke o tipu/oazi ćelije pri prelazu miša preko mape';
xLng['10'] = 'Simulator borbe koji se koristi: (izbornik lijevo)';
xLng['WARSIMOPTION1'] = 'Interni (iz igre)';
xLng['WARSIMOPTION2'] = 'Eksterni (kirilloid.ru)';
xLng['27'] = 'Analizator svijeta koji se koristi';
xLng['28'] = 'Prikaži statističke linkove analizatora';
xLng['NONEWVER'] = 'Imate posljednju dostupnu verziju';
xLng['BVER'] = 'Moguće da imate beta verziju';
xLng['NVERAV'] = 'Dostupna je nova verzija skripte';
xLng['UPDATESCRIPT'] = 'Nadograditi odmah?';
xLng['CHECKUPDATE'] = 'Provjera nadogradnje skripte.<br>Molimo sačekajte...';
xLng['CROPFINDER'] = 'Crop finder';
xLng['AVPOPPERVIL'] = 'Prosječno populacije po selu';
xLng['AVPOPPERPLAYER'] = 'Prosječno populacije po igraču';
xLng['37'] = 'Prikazuj tablicu nadogradnje za polja resursa';
xLng['41'] = 'Prikazuj tablicu nadogradnje za infrastrukturu';
xLng['69'] = 'Nivo zapisa konzole<br>ONLY FOR PROGRAMMERS(Zadano = 0)';
xLng['48'] = 'Proj preučitanih stranica ponude<br>dok ste na stranici za kupovinu => na Pijaci<br>(Zadano = 1)';
xLng['U.3'] = 'Naziv glavnog grada<br>Za ažuriranje posjetite vaš profil';
xLng['U.6'] = 'Koordinate vašeg glavnog grada<br>Za ažuriranje posjetite vaš profil';
xLng['MAX'] = 'Maksimalno';
xLng['TOTALTROOPSTRAINING'] = 'Ukupno obučavane vojske';
xLng['57'] = 'Prikazuj udaljenosti i vremena';
xLng['TBSETUPLINK'] = TB3O.shN + ' Podešavanje';
xLng['UPDATEALLVILLAGES'] = 'Ažuriraj sva sela. KORISTITI OPREZNO JER MOŽE DOVESTI DO SUSPENZIJE NALOGA!';
xLng['9'] = 'Prikazuj dodatne linkove u lijevom<br>izborniku<br>(Traviantoolbox, World Analyser, Travilog, Map, itd.)';
xLng['LARGEMAP'] = 'Velika mapa';
xLng['USETHEMPR'] = 'Koristi ih (proporcionalno)';
xLng['USETHEMEQ'] = 'Koristi ih (jednako)';
xLng['TOWNHALL'] = 'Opština';
xLng['ACCINFO'] = 'Informacije o nalogu';
xLng['NOTEBLOCKOPTIONS'] = 'Notes';
xLng['MENULEFT'] = 'Izbornik s lijeve strane';
xLng['STATISTICS'] = 'Statistika';
xLng['RESOURCEFIELDS'] = 'Polja resursa';
xLng['VILLAGECENTER'] = 'Centar sela';
xLng['MAPOPTIONS'] = 'Opcije mape';
xLng['COLOROPTIONS'] = 'Opcije boje';
xLng['DEBUGOPTIONS'] = 'Debug opcije';
xLng['4'] = 'Pijaca';
xLng['5'] = 'Vojska Mjesto okupljanja/Kasarna/Radionica/Štala';
xLng['6'] = 'Opština/Herojska vila/Kovačnica oklopa/Kovačnica oružja';
xLng['HEROSMANSION'] = 'Herojska vila';
xLng['BLACKSMITH'] = 'Kovačnica oružja';
xLng['ARMOURY'] = 'Kovačnica oklopa';
xLng['NOW'] = 'Odmah';
xLng['CLOSE'] = 'Zatvori';
xLng['USE'] = 'Koristi';
xLng['USETHEM1H'] = 'Koristi ih (1 satna proizvodnja)';
xLng['OVERVIEW'] = 'Pregled';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Napadi';
xLng['NEWS'] = 'Vijesti';
xLng['ADDCRTPAGE'] = 'Dodaj trenutnu';
xLng['SCRPURL'] = 'TBeyond';
xLng['50'] = 'Broj izviđača za "Izaberi izviđača" funkciju';
xLng['SPACER'] = 'Spacer';
xLng['53'] = 'Prikazuj informacije o vojsci na napomenama';
xLng['MESREPOPTIONS'] = 'Poruke & Izvještaji';
xLng['59'] = 'Broj unaprijed učitanih<br>poruka/izvještaja<br>(Zadano = 1)';
xLng['ATTABLES'] = 'Vojne tabele';
xLng['MTW'] = 'Škart';
xLng['MTX'] = 'Premašuje';
xLng['MTC'] = 'Trenutni tovar';
xLng['ALLIANCEFORUMLINK'] = 'Link na eksterni forum<br>(Ostaviti prazno za interni forum)';
xLng['82.L'] = 'Zaključaj Oznake (Sakrij ikone za brisanje i pomjeranje)';
xLng['MTCL'] = 'Poništi sve';
xLng['82.U'] = 'Otključaj Oznake (Prikaži ikone za brisanje i pomjeranje)';
xLng['CLICKSORT'] = 'Klikni da sortiraš';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Djeljeno među selima';
xLng['VILLAGELIST'] = 'Lista sela';
xLng['12'] = "Prikazuj 'dorf1.php' i 'dorf2.php' linkove";
xLng['UPDATEPOP'] = 'Ažuriraj populaciju';
xLng['54'] = 'Prikazuj udaljenosti i vremena<br>do sela u napomenama';
xLng['EDIT'] = 'Uredi';
xLng['NPCOPTIONS'] = 'NPC Assistant opcije';
xLng['26'] = 'Prikazuj NPC Assistant kalkulacije/linkove';
xLng['58'] = 'Prikaži tabelu igrača/sela/oaza';
xLng['NEWVILLAGEAV'] = 'Datum/Vrijeme';
xLng['TIMEUNTIL'] = 'Vrijeme za sačekajte';
xLng['61'] = 'Prikaži "Izbriši sve" u izvještajima';
xLng['62'] = 'Prikaži "Pošalji IGM" ikonu i za mene';
xLng['CENTERMAP'] = 'Centriraj kartu na ovo selo';
xLng['13'] = 'Prikaži "Centriraj kartu na ovo selo" ikonu';
xLng['SENDTROOPS'] = 'Pošalji vojsku';
xLng['64'] = 'Prikaži detalje u izvještajima';
xLng['7'] = "Dvorac/Rezidencija/Akademija/Zgrada za blago";
xLng['PALACE'] = "Dvorac";
xLng['RESIDENCE'] = "Rezidencija";
xLng['ACADEMY'] = "Akademija";
xLng['TREASURY'] = "Zgrada za blago";
xLng['60'] = 'Prikazuj linkove na otvorene<br>poruke u pop-upu';
break;
case "ir":
//by mohammad6006 & Reza_na
xLng['8'] = 'اتحاد';
xLng['SIM'] = 'شبیه ساز نبرد';
xLng['QSURE'] = 'آیا مطمئن هستید؟';
xLng['LOSS'] = 'زیان';
xLng['PROFIT'] = 'سود';
xLng['EXTAV'] = 'قابل توسعه';
xLng['PLAYER'] = 'بازیکن';
xLng['VILLAGE'] = 'دهکده';
xLng['POPULATION'] = 'جمعیت';
xLng['COORDS'] = 'موقعیت';
xLng['MAPTBACTS'] = 'اقدامات';
xLng['SAVED'] = 'ذخیره شد';
xLng['YOUNEED'] = 'مورد نیاز';
xLng['TODAY'] = 'امروز';
xLng['TOMORROW'] = 'فردا';
xLng['DAYAFTERTOM'] = 'پس فردا';
xLng['MARKET'] = 'بازار';
xLng['BARRACKS'] = 'سربازخانه';
xLng['RALLYPOINT'] = 'اردوگاه';
xLng['STABLE'] = 'اصطبل';
xLng['WORKSHOP'] = 'کارگاه';
xLng['SENDRES'] = 'ارسال منابع';
xLng['BUY'] = 'خرید';
xLng['SELL'] = 'فروش';
xLng['SENDIGM'] = 'ارسال پیام خصوصی';
xLng['LISTO'] = 'در دسترس';
xLng['ON'] = 'در';
xLng['AT'] = 'در';
xLng['EFICIENCIA'] = 'بازدهی';
xLng['NEVER'] = 'هرگز';
xLng['ALDEAS'] = 'دهکده(ها)';
xLng['TIEMPO'] = 'زمان';
xLng['OFREZCO'] = 'گذاشتن پیشنهاد';
xLng['BUSCO'] = 'جستجو';
xLng['TIPO'] = 'نوع';
xLng['DISPONIBLE'] = 'فقط در دسترس';
xLng['CUALQUIERA'] = 'همه';
xLng['YES'] = 'بله';
xLng['NO'] = 'خیر';
xLng['LOGIN'] = 'ورود';
xLng['MARCADORES'] = 'برچسب ها';
xLng['ANYADIR'] = 'اضافه کردن';
xLng['UBU'] = 'نشانی برچسب جدید';
xLng['UBT'] = 'متن برچسب جدید';
xLng['ELIMINAR'] = 'پاک کردن';
xLng['MAPA'] = 'نقشه';
xLng['MAXTIME'] = 'حداکثر زمان';
xLng['ARCHIVE'] = 'بایگانی';
xLng['SUMMARY'] = 'خلاصه';
xLng['TROPAS'] = 'لشکریان';
xLng['CHKSCRV'] = 'بروز رسانی TBeyond';
xLng['ACTUALIZAR'] = 'بروز رسانی اطلاعات دهکده';
xLng['VENTAS'] = 'پیشنهاد های ذخیره شده';
xLng['MAPSCAN'] = 'پویش کردن نقشه';
xLng['BIGICONS'] = 'نمایش شمایل های (icon) رمز شده';
xLng['22'] = 'نمایش دفترچه یادداشت';
xLng['SAVE'] = 'ذخیره';
xLng['49'] = 'عملکرد پیشفرض اردوگاه';
xLng['AT2'] = 'نیروی کمکی';
xLng['AT3'] = 'حمله: عادی';
xLng['AT4'] = 'حمله: غارت';
xLng['24'] = 'اندازه دفترچه یادداشت';
xLng['NBSIZEAUTO'] = 'خودکار';
xLng['NBSIZENORMAL'] = 'عادی (کوچک)';
xLng['NBSIZEBIG'] = 'صفحه بزرگ (بزرگ)';
xLng['25'] = 'ارتفاع دفترچه یادداشت';
xLng['NBAUTOEXPANDHEIGHT'] = 'گسترش خودکار ارتفاع';
xLng['NBKEEPHEIGHT'] = 'ارتفاع پیشفرض';
xLng['43'] = 'نشان دادن شماره های مرکزی';
xLng['NPCSAVETIME'] = 'ذخیره: ';
xLng['38'] = 'نشاندادن رنگ های سطح منابع';
xLng['44'] = 'نشان دادن رنگ های سطح ساختمان ها';
xLng['65'] = 'رنگ قابل گسترش<br>(پیشفرض = خالی)';
xLng['66'] = 'رنگ حداکثر سطح<br>(پیشفرض = خالی)';
xLng['67'] = 'رنگ عدم امکان گسترش<br>(پیشفرض = خالی)';
xLng['68'] = 'رنگ امکان گسترش با تعدیل منابع<br>(پیشفرض = خالی)';
xLng['TOTALTROOPS'] = 'لشکریان موجود در روستا';
xLng['20'] = 'نشاندادن برچسب ها';
xLng['U.2'] = 'نژاد';
xLng['1'] = "تراویان نسخه*.2";
xLng['SELECTALLTROOPS'] = "انتخاب تمام لشکریان";
xLng['PARTY'] = "جشن ها";
xLng['CPPERDAY'] = "امتیاز فرهنگی در روز";
xLng['SLOT'] = "شکاف";
xLng['TOTAL'] = "مجموع";
xLng['SELECTSCOUT'] = "انتخاب مامور شناسایی(جاسوس)";
xLng['SELECTFAKE'] = "انتخاب حمله بدلی";
xLng['NOSCOUT2FAKE'] = "انتخاب مامور شناسایی برای حمله بدلی امکان پذیر نیست!";
xLng['NOTROOP2FAKE'] = "برای حمله بدلی سربازی موجود نیست!";
xLng['NOTROOP2SCOUT'] = "سربازی برای شناسایی وجود ندارد!";
xLng['NOTROOPS'] = "لشکریانی در دهکده موجود نیست!";
xLng['ALL'] = "همه";
xLng['SH2'] = "در فیلد رنگ شما می توانید وارد کنید:<br>- green یا red یا  orange و غیره.<br>- رمز رنگ در مبنای 16 مانند #004523<br>- برای پیش فرض خالی رها کنید";
xLng['SHOWORIGREPORT'] = "نمایش گزارش اصلی (برای ارسال پیغام)";
xLng['56'] = "وقتی که موس روی نقشه است<br>اطلاعات نوع سرزمین یا دهکده نمایش داده شود";
xLng['10'] = "پیوند به شبیه ساز نبرد برای استفاده:<br>(فهرست سمت راست)";
xLng['WARSIMOPTION1'] = "داخلی (مهیا شده به وسیله بازی)";
xLng['WARSIMOPTION2'] = "خارجی (مهیا شده به وسیله ی kirilloid.ru-با امکانت بیشتر)";
xLng['27'] = "تحلیلگر جهان برای استفاده";
xLng['28'] = "نمایش پیوند تحلیلگر آماری";
xLng['NONEWVER'] = "شما آخرین نسخه ی موجود را در اختیار دارید";
xLng['BVER'] = "ممکن است شما نشخه آزمایشی را در اختیار داشته باشید";
xLng['NVERAV'] = "نسخه جدید اسکریپت موجود می باشد";
xLng['UPDATESCRIPT'] = "هم اکنون به روز رسانی شود؟";
xLng['CHECKUPDATE'] = "بررسی برای بروز رسانی. لطفا صبر کنید...";
xLng['CROPFINDER'] = "کاوشگر گندمزار";
xLng['AVPOPPERVIL'] = "میلنگین جمعییت برای هر دهکده";
xLng['AVPOPPERPLAYER'] = "میانگین جمعییت برای هر بازیکن";
xLng['37'] = "نمایش جدول گسترش منابع";
xLng['41'] = "نمایش جدول گسترش ساختمان ها";
xLng['69'] = "Console Log Level<br>فقط برای برنامه نویس ها و خطایابی<br>(پیشفرض = 0)";
xLng['48'] = "تعداد صفحات پیشنهاد برای پیش بارگذاری<br>که در صفحه 'بازار => خرید' وجود دارد<br>(پیشفرض = 1)";
xLng['U.3'] = 'نام پایتخت شما <br>برای بروز رسانی به پروفایل خود بروید';
xLng['U.6'] = 'موقعیت پایتخت شما<br>برای به روز رسانی به پروفایل خود بروید';
xLng['MAX'] = 'حداکثر';
xLng['TOTALTROOPSTRAINING'] = 'مجموع سربازان در حال تعلیم';
xLng['57'] = 'نمایش فاصله و زمان';
xLng['TBSETUPLINK'] = 'تنظیمات فراتراویان ' + TB3O.shN;
xLng['UPDATEALLVILLAGES'] = 'بروز رسانی تمام دهکده ها. با دقت زیاد از این گزینه استفاده کنید زیرا ممکن است باعث توقیف حساب شما شود!';
xLng['9'] = "نمایش پیوند های اضافی در فهرست سمت راست<br>(جعبه ابزار تراویان، تحلیلگر جهان، ثبت گزارش نبرد، نقشه و غیره.)";
xLng['LARGEMAP'] = 'نقشه بزرگ';
xLng['USETHEMPR'] = 'استفاده از آنها (به نسبت)';
xLng['USETHEMEQ'] = 'استفاده از آنها (برابر)';
xLng['TOWNHALL'] = 'تالار دهکده';
xLng['GAMESERVERTYPE'] = 'خدمات رسان بازی(سرور)';
xLng['ACCINFO'] = 'اطلاعات حساب';
xLng['NOTEBLOCKOPTIONS'] = 'دفترچه یادداشت';
xLng['MENULEFT'] = 'فهرست سمت راست';
xLng['STATISTICS'] = 'آمار';
xLng['RESOURCEFIELDS'] = 'منابع';
xLng['VILLAGECENTER'] = 'مرکز دهکده';
xLng['MAPOPTIONS'] = 'تنظیمات نقشه';
xLng['COLOROPTIONS'] = 'تنظیمات رنگ';
xLng['DEBUGOPTIONS'] = 'تنظیمات خطا یابی (Debug)';
xLng['4'] = 'بازار';
xLng['5'] = 'اردوگاه/سربازخانه/کارگاه/اصطبل';
xLng['6'] = "تالار شهر/امارت قهرمان/زره سازی/اسلحه سازی";
xLng['HEROSMANSION'] = "امارت قهرمان";
xLng['BLACKSMITH'] = 'اسلحه سازی';
xLng['ARMOURY'] = 'زره سازی';
xLng['NOW'] = 'اکنون';
xLng['CLOSE'] = 'بستن';
xLng['USE'] = 'استفاده';
xLng['USETHEM1H'] = 'استفاده از آنها ( تولید 1 ساعت)';
xLng['OVERVIEW'] = 'دید کلی';
xLng['FORUM'] = 'تالار گفتمان';
xLng['ATTACKS'] = 'حملات';
xLng['NEWS'] = 'اخبار';
xLng['ADDCRTPAGE'] = 'اضافه کردن همین صفحه به برچسب ها';
xLng['SCRPURL'] = 'صفحه TBeyond';
xLng['50'] = 'تعداد ماموران شناسایی برای<br>تابع "انتخاب مامور شناسایی"';
xLng['SPACER'] = 'فضاساز (فاصله بندی)';
xLng['53'] = 'نمایش اطلاعات لشکریان در توضیحات یک خطی (tooltip)';
xLng['MESREPOPTIONS'] = 'پیغام ها و گزارشات';
xLng['59'] = 'تعداد پیغام ها یا گزارشات برای پیش بار گزاری<br>(پیشفرض = 1)';
xLng['ATTABLES'] = 'جداول لشکریان (فقط در حالت پلاس)';
xLng['MTW'] = 'تلف شده';
xLng['MTX'] = 'بیش از حد';
xLng['MTC'] = 'بار گزاری کنونی';
xLng['ALLIANCEFORUMLINK'] = 'پیوند به تالار گفتمان خارجی<br>(برای تالار گفتمان داخلی خالی رها شود)';
xLng['82.L'] = 'قفل برچسب ها (پنهان سازی دکمه های حذف، انتقال به بالا، انتقال به پایین)';
xLng['MTCL'] = 'پاک کردن همه';
xLng['82.U'] = 'باز کردن قفل برچسب ها (نشاندادن دکمه حذف، انتقال به بالا، انتقال به پایین)';
xLng['CLICKSORT'] = 'برای مرتب سازی کلیک کنید';
xLng['MIN'] = 'حداقل';
xLng['SAVEGLOBAL'] = 'سهیم کردن (در دست رس قرار دادن) میان دهکده ها';
xLng['VILLAGELIST'] = 'فهرست دهکده ها';
xLng['12'] = "نمایش پیوند های 'dorf1.php' و 'dorf2.php'";
xLng['UPDATEPOP'] = 'بروز رسانی جمعیت';
xLng['54'] = 'نمایش فاصله و زمان رسیدن به دهکده در توضیحات یک خطی (tooltip)';
xLng['EDIT'] = 'ویرایش';
xLng['NPCOPTIONS'] = 'تنظیمات دستیار تعدیل منابع';
xLng['26'] = 'نمایش محاسبات و پیوند به دستیار تعدیل منابع';
xLng['58'] = 'نمایش جدولی بازیکن ها/دهکده ها/سرزمین های تصرف شده';
xLng['NEWVILLAGEAV'] = 'روز/زمان';
xLng['TIMEUNTIL'] = 'مدت زمان انتظار';
xLng['61'] = "نمایش جدول 'حذف همه' در صفحه گزارشات";
xLng['62'] = 'نشان دادن دکمه ارسال پیام خصوصی برای من';
xLng['CENTERMAP'] = 'مرکز نقشه برای این دهکده';
xLng['13'] = 'نمایش دکمه "مرکز نقشه برای این دهکده"';
xLng['SENDTROOPS'] = 'ارسال لشکریان';
xLng['64'] = 'نمایش جزئیات در گزارشات آماری';
xLng['7'] = "قصر/اقامتگاه/دارالفنون/خزانه";
xLng['PALACE'] = "قصر";
xLng['RESIDENCE'] = "اقامتگاه";
xLng['ACADEMY'] = "دارالفنون";
xLng['TREASURY'] = "خزانه";
xLng['45'] = "نمایش سطح ساختمان و منابع به صورت چشمکزن برای ساختمان ها یا منابع در حال ارتقاء";
xLng['14'] = "نمایش  دکمه 'ارسال سرباز/ارسال منابع' در فهرست دهکده";
xLng['34'] = "نمایش اطلاعات 'امتیاز فرهنگی در روز' در جدول گسترش منابع و ساختمان ها";
xLng['UPGTABLES'] = "جدول گسترش منابع و ساختمان ها";
xLng['35'] = "نمایش میزان مصرف گندم در جدول گسترش";
xLng['16'] = "نمایش تولید مؤثر گندم در فهرست دهکده";
xLng['RESBARTABLETITLE'] = "نوار منابع";
xLng['39'] = "نمایش جدول 'نوار منابع'";
xLng['40'] = "نمایش جدول 'نوار منابع' به صورت پنجره شناور";
xLng['21'] = "نمایش 'برچسب های کاربر' به صورت پنجره شناور";
xLng['23'] = "نمایش 'دفترچه یادداشت' به صورت شناور";
xLng['17'] = "نمایش جمعیت در فهرست دهکده";
xLng['29'] = 'تحلیلگر نقشه برای استفاده';
xLng['30'] = 'نمایش پیوند به نقشه برای کاربران';
xLng['31'] = 'نمایش پیوند به نقشه برای اتحاد ها ';
xLng['63'] = 'نمایش تسهيلات گزارش نبرد فراتراویان 3 (TB3)';
xLng['18'] = 'نمایش فهرست دهکده اضافی (2 ستون) به صورت شناور';
xLng['60'] = 'نمایش پیوند برای باز کردن پیغام ها/گزارش ها در پنجره حبابی';
xLng['42'] = 'مرتبسازی ساختمان ها بر اساس نام در جدول گسترش';
xLng['19'] = 'نمایش اطلاعات درباره ساختمان های در حال گسترش و سربازان در حرکت<br>در فهرست دهکده';
xLng['32'] = "نمایش 'نوار جستجو'";
xLng['3'] = 'مجبور کردن برآورد گنجایش T3.1 سرباز لژیون و سرباز پیاده(تواما برای خدمات رسان های T3.1 و T3.5)';
xLng['33'] = "نمایش 'نوار جستجو' به صورت پنجره شناور";
xLng['36'] = "نمایش محاسبات 'سپس/پس مانده' در جدول های تعلیم/ارتقاء";
xLng['RESIDUE'] = 'پس مانده اگر شما آن را بسازید ';
xLng['RESOURCES'] = 'منابع';
xLng['2'] = 'پاک کردن پرچم های تبلیغاتی و تغییر مکان زمان خدمات گزار';
xLng['SH1'] = "باز کردن پرفایل شما برای بازیابی خودکار پایتخت/مختصات<br>برای نمایان سازی خودکار نژاد سربازخانه بسازید و سپس مرکز دهکده را باز کنید";
xLng['46'] = "نمایش اطلاعات اضافی برای هر بازرگان در حرکت";
xLng['2'] = 'پاک کردن تبلیغات';
xLng['15'] = "نمایش میزان تولید در ساعت چوب، خشت، آهن در فهرست دهکده";
xLng['11'] = "پیوند برای استفاده از پایگاه های ثبت گزارش(نبرد)";
xLng['RESEND'] = "ارسال دوباره؟";
break;
case "dk":
//by polle1
xLng['8'] = 'Alliance';
xLng['SIM'] = 'Kamp simulator';
xLng['QSURE'] = 'Er du sikker?';
xLng['LOSS'] = 'Tab';
xLng['PROFIT'] = 'Profit';
xLng['EXTAV'] = 'udvidelse mulig';
xLng['PLAYER'] = 'Spiller';
xLng['VILLAGE'] = 'By';
xLng['POPULATION'] = 'Indbygger';
xLng['COORDS'] = 'Koordinater';
xLng['MAPTBACTS'] = 'Actions';
xLng['SAVED'] = 'Gemt';
xLng['YOUNEED'] = 'Du mangler';
xLng['TODAY'] = 'i dag';
xLng['TOMORROW'] = 'i morgen';
xLng['DAYAFTERTOM'] = 'overmorgen';
xLng['MARKET'] = 'Markedsplads';
xLng['BARRACKS'] = 'Kaserne';
xLng['RALLYPOINT'] = 'Forsamlingsplads';
xLng['STABLE'] = 'Stald';
xLng['WORKSHOP'] = 'Værksted';
xLng['SENDRES'] = 'Send råstoffer';
xLng['BUY'] = 'Køb';
xLng['SELL'] = 'Sælg';
xLng['SENDIGM'] = 'Send IGM';
xLng['LISTO'] = 'Tilgænglig';
xLng['ON'] = 'on';
xLng['AT'] = 'at';
xLng['EFICIENCIA'] = 'Effektivit';
xLng['NEVER'] = 'Aldrig';
xLng['ALDEAS'] = 'By(er)';
xLng['TIEMPO'] = 'Tid';
xLng['OFREZCO'] = 'Tilbyder';
xLng['BUSCO'] = 'Søger';
xLng['TIPO'] = 'Type';
xLng['DISPONIBLE'] = 'Kun tilgænglig';
xLng['CUALQUIERA'] = 'Alle';
xLng['YES'] = 'Ja';
xLng['NO'] = 'Nej';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Links';
xLng['ANYADIR'] = 'Tilføj';
xLng['UBU'] = 'Nyt link URL';
xLng['UBT'] = 'Nyt link Tekst';
xLng['ELIMINAR'] = 'Slet';
xLng['MAPA'] = 'Kort';
xLng['MAXTIME'] = 'Maximum tid';
xLng['ARCHIVE'] = 'Arkive';
xLng['SUMMARY'] = 'Total';
xLng['TROPAS'] = 'Tropper';
xLng['CHKSCRV'] = 'Opdater TBeyond';
xLng['ACTUALIZAR'] = 'Opdater by information';
xLng['VENTAS'] = 'Gemte tilbud';
xLng['MAPSCAN'] = 'Skan kortet';
xLng['BIGICONS'] = 'Vis udvidet ikoner';
xLng['22'] = 'Vis notesbog';
xLng['SAVE'] = 'Gem';
xLng['49'] = 'Forsamlingsplads standart action';
xLng['AT2'] = 'Opbakning';
xLng['AT3'] = 'Angreb: Normal';
xLng['AT4'] = 'Angreb: Plyndringstogt';
xLng['24'] = 'Notesbog størrelse';
xLng['NBSIZEAUTO'] = 'Auto';
xLng['NBSIZENORMAL'] = 'Normal (lille)';
xLng['NBSIZEBIG'] = 'Stor skærm (Stor)';
xLng['25'] = 'Notesbog højde';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automatisk udvid højde';
xLng['NBKEEPHEIGHT'] = 'Standart højde';
xLng['43'] = 'Vis center nummer';
xLng['NPCSAVETIME'] = 'Gem: ';
xLng['38'] = 'Vis råstof trin farver';
xLng['44'] = 'Vis bygningstrin faver';
xLng['65'] = 'Farve opgradering mulig<br>(Default = Empty)';
xLng['66'] = 'Farve Fuldt udbygget<br>(Default = Empty)';
xLng['67'] = 'Farve opgradering ikke mulig<br>(Default = Empty)';
xLng['68'] = 'Farve opgradering via NPC<br>(Default = Empty)';
xLng['TOTALTROOPS'] = 'Byens totale troppeantal';
xLng['20'] = 'Vis links';
xLng['U.2'] = 'Race';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Vælg alle tropper";
xLng['PARTY'] = "Fest";
xLng['CPPERDAY'] = "KP/dag";
xLng['SLOT'] = "Slot";
xLng['TOTAL'] = "Total";
xLng['SELECTSCOUT'] = "Vælg spioner";
xLng['SELECTFAKE'] = "Vælg fake";
xLng['NOSCOUT2FAKE'] = "Det er ikke muligt at bruge spioner til fake angreb !";
xLng['NOTROOP2FAKE'] = "Der er ingen tropper til sende et fake angreb!";
xLng['NOTROOP2SCOUT'] = "Der er ingen spioner tilstede !";
xLng['NOTROOPS'] = "Der er ingen tropper i byen !";
xLng['ALL'] = "Alle";
xLng['SH2'] = "I farve felterne kan du skrive:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
xLng['SHOWORIGREPORT'] = "Vis original report (Til visning)";
xLng['56'] = "Vis celle type/oase info<br>Hold musen over kortet";
xLng['10'] = "Kampsimulator link der skal bruges:<br>(menu venstre)";
xLng['WARSIMOPTION1'] = "Inten (leveret af spillet)";
xLng['WARSIMOPTION2'] = "Extern (leveret af kirilloid.ru)";
xLng['27'] = "World Analyser der skal bruges";
xLng['28'] = "Vis analyser statistic links";
xLng['NONEWVER'] = "Du har den seneste version";
xLng['BVER'] = "Du må have en beta version";
xLng['NVERAV'] = "En ny version af scriptet er tilgænglig";
xLng['UPDATESCRIPT'] = "Opdater scriptet nu ?";
xLng['CHECKUPDATE'] = "Checker for script opdateringer.<br>Vent venligst...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Gennemsnitlig antal indbygger per by";
xLng['AVPOPPERPLAYER'] = "Gennemsnitlig antal indbygger per spiller";
xLng['37'] = "Vis råstoffelter opgradringstabel";
xLng['41'] = "vis bygnings opgradringstabel";
xLng['48'] = "Antallet af sider med tilbud der skal indlæsses<br>Mens du er på markede => køb' side<br>(Default = 1)";
xLng['U.3'] = 'Din hovedlandsbys navn<br><b>Visit your Profile for an update</b>';
xLng['U.6'] = 'Din hovedlandsbys koordinater<br><b>Visit your Profile for an update</b>';
xLng['TOTALTROOPSTRAINING'] = 'Totale antal tropper der trænes';
xLng['57'] = 'Vis afstand & tider';
xLng['UPDATEALLVILLAGES'] = 'opdater alle byer.  BRUGS MED STOR FORSIGTIGHED DA DET KAN FØRE TIL EN BANNED KONTO !';
xLng['9'] = "Vis extra links i venstre menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Stort kort';
xLng['USETHEMPR'] = 'Brug dem (proportional)';
xLng['USETHEMEQ'] = 'Brug dem (equal)';
xLng['TOWNHALL'] = 'Rådhus';
xLng['ACCINFO'] = 'Konto Information';
xLng['NOTEBLOCKOPTIONS'] = 'Notesblok';
xLng['MENULEFT'] = 'Menu i venstre side';
xLng['STATISTICS'] = 'Statestik';
xLng['RESOURCEFIELDS'] = 'Råstoffelter';
xLng['VILLAGECENTER'] = 'Landsbycenter';
xLng['MAPOPTIONS'] = 'Kort options';
xLng['COLOROPTIONS'] = 'Farve options';
xLng['DEBUGOPTIONS'] = 'Debug options';
xLng['4'] = 'Markedesplads';
xLng['5'] = 'Forsamlingsplads/Kaserne/Værksted/Stald';
xLng['6'] = "Rådhus/Heltegården/Armoury/Blacksmith";
xLng['HEROSMANSION'] = "Hero's mansion";
xLng['BLACKSMITH'] = 'våbensmedje';
xLng['ARMOURY'] = 'Rustningssmedje';
xLng['NOW'] = 'Nu';
xLng['CLOSE'] = 'Luk';
xLng['USE'] = 'Brug';
xLng['USETHEM1H'] = 'brug dem (1 times produktion)';
xLng['OVERVIEW'] = 'oversigt';
xLng['FORUM'] = 'Forum';
xLng['ATTACKS'] = 'Angreb';
xLng['NEWS'] = 'Nyheder';
xLng['ADDCRTPAGE'] = 'tilføj nuværende';
xLng['SCRPURL'] = 'TBeyond page';
xLng['50'] = 'Antallet af spioner til<br>"Vælg spioner" funktion';
xLng['SPACER'] = 'Mellemrumslinje';
xLng['53'] = 'Vis troppe information i tooltips';
xLng['MESREPOPTIONS'] = 'Beskeder & Reporter';
xLng['59'] = 'antallet af besked/report sider som skal indlæses<br>(Default = 1)';
xLng['ATTABLES'] = 'Troppetabel';
xLng['MTW'] = 'mistede';
xLng['MTX'] = 'overskrider';
xLng['MTC'] = 'Nuværende last';
xLng['ALLIANCEFORUMLINK'] = 'Link til extern forum<br>(Tom for intern forum)';
xLng['82.L'] = 'Lock links (Gem slet, flyt op, flyt ned ikoner)';
xLng['MTCL'] = 'Clear all';
xLng['82.U'] = 'Unlock links (Vis slet, flyt op, flyt ned ikoner)';
xLng['CLICKSORT'] = 'Klik for at sorter';
xLng['MIN'] = 'Min';
xLng['SAVEGLOBAL'] = 'Del imellem byer';
xLng['VILLAGELIST'] = 'By Liste';
xLng['12'] = "Vis 'dorf1.php' and 'dorf2.php' links";
xLng['UPDATEPOP'] = 'opdater indbygger';
xLng['54'] = 'Vis afstande og tider til byer i tooltips';
xLng['EDIT'] = 'Edit';
xLng['NPCOPTIONS'] = 'NPC Assistant options';
xLng['26'] = 'Vis NPC Assistant calculations/links';
xLng['58'] = 'Vis tabel med spiller/byer/besatte oaser';
xLng['NEWVILLAGEAV'] = 'Dato/Tid';
xLng['TIMEUNTIL'] = 'Ventetid';
xLng['61'] = 'Vis "Slet alle" tabel på Report side';
xLng['62'] = 'Vis "Send IGM" ikon for mig, også';
xLng['CENTERMAP'] = 'Centré kortet på denne by';
xLng['13'] = 'Vis "Centré kortet på denne by" ikon';
xLng['SENDTROOPS'] = 'Send tropper';
xLng['64'] = 'Vis detaljer in Report Statestik';
xLng['7'] = "Palads/Residens/Akademi/Skattekammer";
xLng['PALACE'] = "Palads";
xLng['RESIDENCE'] = "Residens";
xLng['ACADEMY'] = "Akademi";
xLng['TREASURY'] = "Skattekammer";
xLng['45'] = "Vis blinkende ikoner for bygninger der bliver opgraderet";
xLng['14'] = "Vis 'Send tropper/Send råstoffer' ikoner i by listen";
xLng['34'] = "Vis kP/dag information i opgradringstabel";
xLng['UPGTABLES'] = "Råstoffelter/Bygnings opgradringstabel";
xLng['35'] = "Vis kornforbrug i opgradringstabel";
xLng['16'] = "Vis effektiv kornproduktion i by liste";
xLng['RESBARTABLETITLE'] = "Råstofbar";
xLng['39'] = "Vis 'Råstofbar' tabel";
xLng['40'] = "vis 'Råstofbar' tabel som flytbar vindue";
xLng['21'] = "vis 'Bruger links' som flytbar vindue";
xLng['23'] = "Vis 'Notesblok' som flytbar vindue";
xLng['17'] = "Vis indbygger i by liste";
xLng['29'] = 'Map Analyser der skal bruges';
xLng['30'] = 'Vis link til kort over spiller';
xLng['31'] = 'Vis link til kort over alliancer';
xLng['63'] = 'Vis extra information i kampreporter';
xLng['60'] = 'Vis link til at åbne beskeder i et pop-up';
break;
case "ph":
//by ahuks
xLng['8'] = 'Alyansa';
xLng['QSURE'] = 'Sigurado ka ba?';
xLng['LOSS'] = 'Kawalan';
xLng['PROFIT'] = 'Pakinabang';
xLng['EXTAV'] = 'Maari ng Gawin';
xLng['PLAYER'] = 'Manlalaro';
xLng['VILLAGE'] = 'Baryo';
xLng['POPULATION'] = 'Populasyon';
xLng['COORDS'] = 'Coordinate';
xLng['MAPTBACTS'] = 'Aksyon';
xLng['SAVED'] = 'Saved';
xLng['YOUNEED'] = 'Kailangan mo';
xLng['TODAY'] = 'ngayon';
xLng['TOMORROW'] = 'bukas';
xLng['DAYAFTERTOM'] = 'kinabukasan';
xLng['MARKET'] = 'Palengke';
xLng['BARRACKS'] = 'Kwartel';
xLng['RALLYPOINT'] = 'Pook Tipunan';
xLng['STABLE'] = 'Kuwadra';
xLng['WORKSHOP'] = 'Talyer';
xLng['SENDRES'] = 'Magpadala ng likas-yaman';
xLng['BUY'] = 'Bumili';
xLng['SELL'] = 'Alok';
xLng['SENDIGM'] = 'Sumulat ng Mensahe';
xLng['LISTO'] = 'Maari na';
xLng['ON'] = 'ng';
xLng['AT'] = 'sa';
xLng['EFICIENCIA'] = 'Kahusayan';
xLng['NEVER'] = 'Hindi Kailanman';
xLng['ALDEAS'] = 'Baryo';
xLng['TIEMPO'] = 'Oras';
xLng['OFREZCO'] = 'Nag-aalok';
xLng['BUSCO'] = 'Naghahanap';
xLng['TIPO'] = 'Uri';
xLng['DISPONIBLE'] = "Ito'y Maari lamang";
xLng['CUALQUIERA'] = 'Kahit Ano';
xLng['YES'] = 'Oo';
xLng['NO'] = 'Hindi';
xLng['MAPA'] = 'Mapa';
xLng['MAXTIME'] = 'Pinakamatagal na Oras';
xLng['SUMMARY'] = 'Ulat';
xLng['TROPAS'] = 'Mga Hukbo';
xLng['AT2'] = 'Dagdag ng Hukbo';
xLng['AT3'] = 'Salakay: Normal';
xLng['AT4'] = 'Salakay: Pagnakaw';
xLng['TOTALTROOPS'] = 'Kubuuan ng Hukbo';
xLng['U.2'] = 'Lahi';
xLng['SELECTALLTROOPS'] = "Piliin lahat ng Hukbo";
xLng['PARTY'] = "Kasiyahan";
xLng['CPPERDAY'] = "Pananim/Araw";
xLng['TOTAL'] = "Kabuuan";
xLng['SELECTSCOUT'] = "Piliin ang Scout";
xLng['SELECTFAKE'] = "Piliin ang Pekeng Atake";
xLng['NOSCOUT2FAKE'] = "Hindi maaari gamitin ang Scout para sa Pekeng Atake!";
xLng['NOTROOP2FAKE'] = "Walang Hukbo para sa Pekeng Atake!";
xLng['NOTROOP2SCOUT'] = "Walang Hukbo para pang Scout!";
xLng['NOTROOPS'] = "Walang Hukbo sa iyong Baryo!";
xLng['ALL'] = "Lahat";
xLng['SHOWORIGREPORT'] = "Ipakita ang Orihinal na Ulat";
xLng['AVPOPPERVIL'] = "Average na Population sa bawat Baryo";
xLng['AVPOPPERPLAYER'] = "Average na Population sa bawat Manlalaro";
xLng['37'] = "Show resource fields upgrade table";
xLng['41'] = "Show buildings upgrade table";
xLng['TOWNHALL'] = 'Bulwagan ng Baryo';
xLng['STATISTICS'] = 'Mga Estatistika';
xLng['RESOURCEFIELDS'] = 'Likas-yaman';
xLng['VILLAGECENTER'] = 'Gitna ng Baryo';
xLng['5'] = 'Pook Tipunan/Kwartel/Talyer/Kuwadra';
xLng['6'] = "Bulwagan ng Baryo/Mansyon ng Bayani/Balutian/Pandayan";
xLng['HEROSMANSION'] = "Mansyon ng Bayani";
xLng['BLACKSMITH'] = 'Pandayan';
xLng['ARMOURY'] = 'Balutian';
xLng['OVERVIEW'] = 'Pananaw';
xLng['FORUM'] = 'Porum';
xLng['ATTACKS'] = 'Atake';
xLng['NEWS'] = 'Ulat';
xLng['50'] = 'Bilang ng Scout para sa<br>"Piliin Scout" function';
xLng['CENTERMAP'] = 'Gitnang Mapa ng Baryo';
xLng['13'] = 'Show "Gitnang Mapa ng Baryo" icon';
xLng['SENDTROOPS'] = 'Magpadala ng Hukbo';
xLng['7'] = "Palasyo/Residensya/Akademya/Kaban-yaman";
xLng['PALACE'] = "Palasyo";
xLng['RESIDENCE'] = "Residensya";
xLng['ACADEMY'] = "Akademya";
xLng['TREASURY'] = "Kaban-yaman";
break;
case "fi"://by Syanidi, Haukka
xLng['8'] = 'Liittouma';
xLng['SIM'] = 'Taistelusimulaattori';
xLng['QSURE'] = 'Oletko varma?';
xLng['LOSS'] = 'Menetys';xLng['PROFIT'] = 'Hyöty';
xLng['EXTAV'] = 'Päivitys mahdollista ';
xLng['PLAYER'] = 'Pelaaja';
xLng['VILLAGE'] = 'Kylä';
xLng['POPULATION'] = 'Asukasluku';
xLng['COORDS'] = 'Koordinaatit';
xLng['MAPTBACTS'] = 'Toiminnot';
xLng['SAVED'] = 'Tallennettu';
xLng['YOUNEED'] = 'Tarvitset';
xLng['TODAY'] = 'tänään';
xLng['TOMORROW'] = 'huomenna';
xLng['DAYAFTERTOM'] = 'ylihuomenna';
xLng['MARKET'] = 'Tori';
xLng['BARRACKS'] = 'Kasarmi';
xLng['RALLYPOINT'] = 'Kokoontumispiste';
xLng['STABLE'] = 'Talli';
xLng['WORKSHOP'] = 'Työpaja';
xLng['SENDRES'] = 'Lähetä resursseja';
xLng['COMPRAR'] = 'Osta';
xLng['SELL'] = 'Myy';
xLng['SENDIGM'] = 'Lähetä viesti';
xLng['LISTO'] = 'Saatavilla';
xLng['ON'] = 'Saatavilla';
xLng['AT'] = 'kello';
xLng['EFICIENCIA'] = 'Hyötysuhde';
xLng['NEVER'] = 'Ei koskaan';
xLng['ALDEAS'] = 'Kylä(t)';
xLng['TIEMPO'] = 'Aika';
xLng['OFREZCO'] = 'Tarjonnut minulle';
xLng['BUSCO'] = 'Pyytänyt minulta';
xLng['TIPO'] = 'Suhde';
xLng['DISPONIBLE'] = 'Vain saatavilla olevat';
xLng['CUALQUIERA'] = 'Mikä tahansa';
xLng['YES'] = 'Kyllä';
xLng['NO'] = 'Ei';
xLng['LOGIN'] = 'Kirjaudu sisään';
xLng['MARCADORES'] = 'Kirjanmerkit';
xLng['ANYADIR'] = 'Lisää';
xLng['UBU'] = 'Uusi kirjanmerkin URL';
xLng['UBT'] = 'Uusi kirjanmerkkiteksti';
xLng['ELIMINAR'] = 'Poista';
xLng['MAPA'] = 'Kartta';
xLng['MAXTIME'] = 'Enimmäisaika';
xLng['ARCHIVE'] = 'Arkisto';
xLng['SUMMARY'] = 'Yhteenveto';
xLng['TROPAS'] = 'Joukot';
xLng['CHECKVERSION'] = 'Päivitä TBeyond';
xLng['ACTUALIZAR'] = 'Päivitä kylän tiedot';
xLng['VENTAS'] = 'Tallennetut tarjoukset';
xLng['MAPSCAN']  = 'Tutki kartta';
xLng['BIGICONS'] = 'Näytä laajennetut kuvakkeet';
xLng['22'] = 'Näytä muistilappu';
xLng['SAVE'] = 'Tallenna';
xLng['49'] = 'Kokoontumispisteen oletustoiminto';
xLng['AT2'] = 'Vahvistus';
xLng['AT3'] = 'Hyökkäys: Normaali';
xLng['AT4'] = 'Hyökkäys: Ryöstö';
xLng['24'] = 'Muistilapun koko';
xLng['NBSIZEAUTO'] = 'Automaattinen';
xLng['NBSIZENORMAL'] = 'Normaali';
xLng['NBSIZEBIG'] = 'Laaja';
xLng['25'] = 'Muistilapun korkeus';
xLng['NBAUTOEXPANDHEIGHT'] = 'Automaattinen korkeuden säätö';
xLng['NBKEEPHEIGHT'] = 'Oletus korkeus';
xLng['43'] = 'Näytä rakennuksien tasonumerot';
xLng['NPCSAVETIME'] = 'Säästä: ';
xLng['38'] = 'Näytä resurssipeltojen tasovärit';
xLng['44'] = 'Näytä rakennuksien tasovärit';
xLng['65'] = '"Päivitys mahdollinen" väri<br />(Oletus = Tyhjä)';
xLng['66'] = '"Korkein mahdollinen taso" väri<br />(Oletus = Tyhjä)';
xLng['67'] = '"Päivitys ei mahdollista" väri<br />(Oletus = Tyhjä)';
xLng['68'] = '"Päivitys mahdollinen NPC:llä" väri<br />(Oletus = Tyhjä)';
xLng['TOTALTROOPS'] = 'Kylän joukkojen kokonaismäärä';
xLng['20'] = 'Näytä kirjanmerkit';
xLng['U.2'] = 'Rotu';
xLng['1'] = "Travian v2.x serveri";
xLng['SELECTALLTROOPS'] = "Valitse kaikki joukot";
xLng['PARTY'] = "Juhlat";
xLng['CPPERDAY'] = "KP/päivä";
xLng['SLOT'] = "Kyliä";
xLng['TOTAL'] = "Yhteensä";
xLng['NOPALACERESIDENCE'] = "Ei virka-asuntoa/palatsia kylässä tai kylän keskustaa ei ole avattu vielä!";
xLng['SELECTSCOUT'] = "Valitse tiedustelija";
xLng['SELECTFAKE'] = "Valitse hämy";
xLng['NOSCOUT2FAKE'] = "Ei ole tiedustelijoita hämyyn!";
xLng['NOTROOP2FAKE'] = "Ei ole joukkoja hämyyn!";
xLng['NOTROOP2SCOUT'] = "Ei ole joukkoja tiedusteluun!";
xLng['NOTROOPS'] = "Kylässä ei ole joukkoja!";
xLng['ALL'] = "Kaikki";
xLng['SH2'] = "Värikentissä voit käyttää:<br />- <b>Green</b> , <b>red</b> , <b>orange</b> jne.<br />- HEX värikoodeja kuten <b>#004523</b><br />- Oletus: tyhjä";
xLng['SHOWORIGREPORT'] = "Näytä alkuperäinen raportti";
xLng['56'] = "Näytä kylätyypit ja keitaat<br />liikutellessasi hiirtä kartalla";
xLng['10'] = "Taistelusimulaattorilinkki käytössä:<br />(Vasemmanpuoleinen valikko)";
xLng['WARSIMOPTION1'] = "Sisäinen (Pelin tarjoama)";
xLng['WARSIMOPTION2'] = "Ulkoinen (kirilloid.ru tarjoama)";
xLng['27'] = "Valitse World Analyser";
xLng['28'] = "Näytä analyysitilastot linkkeinä";
xLng['NONEWVER'] = "Sinulla on uusin saatavilla oleva versio";
xLng['BVER'] = "Sinulla saattaa olla beta-versio";
xLng['NVERAV'] = "Scriptistä on saatavilla uusi versio";
xLng['UPDATESCRIPT'] = "Päivitä scripti nyt ?";
xLng['CHECKUPDATE'] = "Tarkistetaan päivitystä scriptille.<br />Odota hetki...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Kylien keskimääräinen asukasluku";
xLng['AVPOPPERPLAYER'] = "Pelaajien keskimääräinen asukasluku";
xLng['37'] = "Näytä resurssikenttien päivitystaulukko";
xLng['41'] = "Näytä rakennusten päivitystaulukko";
xLng['69'] = "Kirjautumistaso konsoliin<br>VAIN OHJELMOIJILLE JA TESTAAJILLE<br>(Oletus = 0)";
xLng['48'] = "Tarjoussivujen latautumismäärä<br />ollessasi torilla => Osta sivu<br />(Oletus = 1)";
xLng['U.3'] = 'Pääkaupunkisi nimi<br /><b>Käy profiilissa päivittääksesi</b>';
xLng['U.6'] = 'Pääkaupunkisi koordinaatit<br /><b>Käy profiilissa päivittääksesi</b>';
xLng['MAX'] = 'Enintään';
xLng['TOTALTROOPSTRAINING'] = 'Koulutuksessa olevien joukkojen kokonaismäärä';
xLng['57'] = 'Näytä matkat ja ajat';
xLng['TBSETUPLINK'] = TB3O.shN + ' Asetukset';
xLng['UPDATEALLVILLAGES'] = 'Päivitä kaikki kylät. HUOMIOI: SAATTAA JOHTAA TILIN JÄÄDYTTÄMISEEN!!';
xLng['9'] = "Näytä lisälinkit vasemmanpuoleisessa valikossa<br />(Traviantoolbox, World Analyser, Travilog, Map, jne.)";
xLng['LARGEMAP'] = 'Iso kartta';
xLng['USETHEMPR'] = 'Käytä ne (Prosentuaalisesti)';
xLng['USETHEMEQ'] = 'Käytä ne (tasaisesti)';
xLng['TOWNHALL'] = 'Kaupungintalo';
xLng['GAMESERVERTYPE'] = 'Serveri';
xLng['ACCINFO'] = 'Tilin tiedot';
xLng['NOTEBLOCKOPTIONS'] = 'Muistilappu';
xLng['MENULEFT'] = 'Vasemmanpuoleinen valikko';
xLng['STATISTICS'] = 'Tilastot';
xLng['RESOURCEFIELDS'] = 'Resurssikentät';
xLng['VILLAGECENTER'] = 'Kylän keskusta';
xLng['MAPOPTIONS'] = 'Kartta asetukset';
xLng['COLOROPTIONS'] = 'Väri asetukset';
xLng['DEBUGOPTIONS'] = 'Debug asetukset';
xLng['4'] = 'Tori';
xLng['5'] = 'Kokoontumispiste/Kasarmi/Työpaja/Talli';
xLng['6'] = "Kaupungintalo/Sankarinkartano/Haarniskapaja/Aseseppä";
xLng['HEROSMANSION'] = "Sankarinkartano";
xLng['BLACKSMITH'] = 'Aseseppä';
xLng['ARMOURY'] = 'Haarniskapaja';
xLng['NOW'] = 'Nyt';
xLng['CLOSE'] = 'Sulje';
xLng['USE'] = 'Käytä';
xLng['USETHEM1H'] = 'Käytä ne (Tunnin tuotto)';
xLng['OVERVIEW'] = 'Yleiskatsaus';
xLng['FORUM'] = 'Foorumi';
xLng['ATTACKS'] = 'Hyökkäykset';
xLng['NEWS'] = 'Uutiset';
xLng['ADDCRTPAGE'] = 'Lisää nykyinen';
xLng['SCRIPTPRESURL'] = 'TBeyond kotisivu';
xLng['50'] = 'Tiedustelijoiden määrä<br />"Valitse tiedustelija" ominaisuudelle';
xLng['SPACER'] = 'Väliviiva';
xLng['53'] = 'Näytä joukkotiedot vihjeissä';
xLng['MESREPOPTIONS'] = 'Viestit ja Raportit';
xLng['59'] = 'Esiladattujen viesti- ja raporttisivujen määrä<br />(Oletus = 1)';
xLng['ATTABLES'] = 'Joukko taulukot';
xLng['MTW'] = 'Tuhlattu';
xLng['MTX'] = 'Ylittää';
xLng['MTC'] = 'Nykyinen määrä';
xLng['ALLIANCEFORUMLINK'] = 'Linkki pelin ulkopuoliselle foorumille<br />(Jätä tyhjäksi kun käytät pelinsisäistä foorumia)';
xLng['82.L'] = 'Lukitse kirjanmerkit (Piilottaa: poista, siirrä ylös, siirrä alas ja muokkaa -painikkeet)';
xLng['MTCL'] = 'Tyhjennä kaikki';
xLng['82.U'] = 'Avaa kirjanmerkit (Näyttää: poista, siirrä ylös, siirrä alas ja muokkaa -painikkeet)';
xLng['CLICKSORT'] = 'Klikkaa järjestääksesi';
xLng['MIN'] = 'Vähintään';
xLng['SAVEGLOBAL'] = 'Jaa kylien välillä';
xLng['VILLAGELIST'] = 'Kylälista';
xLng['12'] = "Näytä 'dorf1.php' ja 'dorf2.php' linkit";
xLng['UPDATEPOP'] = 'Päivitä asukasluku';
xLng['54'] = 'Näytä välimatka ja ajat vihjeissä';
xLng['EDIT'] = 'Muokkaa';
xLng['NPCOPTIONS'] = 'NPC Avustajan asetukset';
xLng['26'] = 'Näytä NPC Avustajan laskelmat ja linkit';
xLng['58'] = 'Näytä taulukko pelaajista/kylistä/varatuista keitaista';
xLng['NEWVILLAGEAV'] = 'Päivä ja aika';
xLng['TIMEUNTIL'] = 'Aikaa jäljellä';
xLng['61'] = 'Näytä "Poista kaikki"-painike raporttisivulla';
xLng['62'] = 'Näytä "Lähetä viesti" kuvake myös itselleni';
xLng['CENTERMAP'] = 'Keskitä kartta tähän kylään';
xLng['13'] = 'Näytä "Keskitä kartta tähän kylään" kuvake';
xLng['SENDTROOPS'] = 'Lähetä joukkoja';
xLng['64'] = 'Näytä yksityiskohdat raporttitilastoissa';
xLng['7'] = "Palatsi/Virka-asunto/Akatemia/Aarrekammio";
xLng['PALACE'] = "Palatsi";
xLng['RESIDENCE'] = "Virka-asunto";
xLng['ACADEMY'] = "Akatemia";
xLng['TREASURY'] = "Aarrekammio";
xLng['45'] = "Näytä rakennuksien tasot vilkkuvina, kun niitä päivitetään";
xLng['14'] = "Näytä 'Lähetä joukkoja/Lähetä resursseja' kuvakkeet kylälistassa";
xLng['34'] = "Näytä KP/päivä päivitystaulukoissa";
xLng['UPGTABLES'] = "Resurssikentät/Rakennukset";
xLng['35'] = "Näytä viljan kulutus päivitystaulukoissa";
xLng['16'] = "Näytä viljantuotanto kylälistassa";
xLng['RESBARTABLETITLE'] = "Resurssipalkki";
xLng['39'] = "Näytä 'Resurssipalkki'";
xLng['40'] = "Näytä 'Resurssipalkki' siirrettävänä ikkunana";
xLng['21'] = "Näytä 'kirjanmerkit' siirrettävänä ikkunana";
xLng['23'] = "Näytä 'Muistilappu' siirrettävänä ikkunana";
xLng['17'] = "Näytä asukasluku kylälistassa";
xLng['29'] = 'Mitä kartta-analysoijaa käytetään';
xLng['30'] = 'Näytä pelaajien linkit karttaan';
xLng['31'] = 'Näytä liittojen linkit karttaan';
xLng['63'] = 'Näytä TB3 parannellut taisteluraportit';
xLng['18'] = 'Näytä lisäksi kahden palstan kylälista siirrettävänä ikkunana';
xLng['60'] = 'Näytä linkki ponnahdusikkunaan';
xLng['42'] = 'Järjestä rakennukset päivityslistassa nimen perusteella';
xLng['19'] = 'Näytä tiedot valmistuvista rakennuksista ja joukkojen liikkeistä <br />kylälistassa';
xLng['32'] = "Näytä Hakupalkki";
xLng['3'] = 'Pakota T3.1 Legioonalaisten ja Falangien kantomäärälaskenta<br />(sekoitetuille T3.1 ja T3.5 servereille)';
xLng['33'] = "Näytä 'Hakupalkki' siirrettävänä ikkunana";
xLng['36'] = "Näytä 'Siihen mennessä/Ylijäävät' laskelma, päivitys ja koulutus taulukoissa";
xLng['RESIDUE'] = 'Ylijäävät resurssit jos rakennat';
xLng['RESOURCES'] = 'Resurssit';
xLng['SH1'] = "Automaattinen kaupunki ja koordinaatti tunnistus, kun käyt profiilissasi<br />Automaattinen rotu tunnistus, kun rakennat ja avaat kasarmin";
xLng['46'] = "Näytä lisätiedot kaikille saapuville kauppiaille";
xLng['2'] = 'Poista mainosbannerit';
xLng['15'] = "Näytä puun, saven ja raudan tuntituotannot kylälistassa";
xLng['11'] = "Valitse sivu mitä käytetään raporttien lähettämiseen";
xLng['RESEND'] = "Lähetä uudelleen?"
xLng['WSI'] = "Pelin sisäinen taistelusimulaattori";
xLng['TTT'] = "Yleiset joukko ja matka vihjeet";
xLng['47'] = "Näytä viimeisin resurssilähetys";
xLng['51'] = "Näytä viimeisin hyökkäykseni";
xLng['52'] = "Näytä/käytä viimeisimmän hyökkäyksen koordinaatteja";
xLng['55'] = "Täytä simulaattori automaattisesti kylässä olevien joukkojen perusteella";
break;
case "il":
//by zZzMichel & BlueShark & yabash & removesoul & DMaster
xLng['8'] = 'ברית';
xLng['SIM'] = 'סימולטור קרב ';
xLng['QSURE'] = 'האם אתה בטוח?';
xLng['LOSS'] = 'הפסד';
xLng['PROFIT'] = 'רווח';
xLng['EXTAV'] = 'שידרוג זמין';
xLng['PLAYER'] = 'שחקן';
xLng['VILLAGE'] = 'כפר';
xLng['POPULATION'] = 'אוכלוסייה';
xLng['COORDS'] = 'קואורדינטות';
xLng['MAPTBACTS'] = 'פעולות';
xLng['SAVED'] = 'נשמר';
xLng['YOUNEED'] = 'את/ה צריכ/ה';
xLng['TODAY'] = 'היום';
xLng['TOMORROW'] = 'מחר';
xLng['DAYAFTERTOM'] = 'מחרתיים';
xLng['MARKET'] = 'שוק';
xLng['BARRACKS'] = 'מגורי חיילים';
xLng['RALLYPOINT'] = 'נקודת מפגש';
xLng['STABLE'] = 'אורווה';
xLng['WORKSHOP'] = 'בית מלאכה';
xLng['SENDRES'] = 'שלח משאבים';
xLng['BUY'] = 'קנה';
xLng['SELL'] = 'מכור';
xLng['SENDIGM'] = 'שלח הודעה';
xLng['LISTO'] = 'זמין';
xLng['ON'] = 'זמין';
xLng['AT'] = 'ב';
xLng['EFICIENCIA'] = 'יעילות';
xLng['NEVER'] = 'אף פעם';
xLng['ALDEAS'] = 'כפר(ים)';
xLng['TIEMPO'] = 'זמן';
xLng['OFREZCO'] = 'מציע';
xLng['BUSCO'] = 'מחפש';
xLng['TIPO'] = 'יחס ההחלפה';
xLng['DISPONIBLE'] = 'רק עסקאות אפשריות ?';
xLng['CUALQUIERA'] = 'כל סוג';
xLng['YES'] = 'כן';
xLng['NO'] = 'לא';
xLng['LOGIN'] = 'התחבר';
xLng['MARCADORES'] = 'מועדפים';
xLng['ANYADIR'] = 'הוסף';
xLng['UBU'] = 'לינק';
xLng['UBT'] = 'שם';
xLng['ELIMINAR'] = 'מחק';
xLng['MAPA'] = 'מפה';
xLng['MAXTIME'] = 'מקסימום זמן שליחה';
xLng['ARCHIVE'] = 'ארכיון';
xLng['SUMMARY'] = 'סיכום';
xLng['TROPAS'] = 'כוחות';
xLng['CHKSCRV'] = 'עדכן TBeyond';
xLng['ACTUALIZAR'] = 'עדכן מידע על הכפר';
xLng['VENTAS'] = 'הצעות שמורות';
xLng['MAPSCAN'] = 'סרוק מפה';
xLng['BIGICONS'] = 'הצג אייקונים מורחבים';
xLng['22'] = 'הצג פנקס הערות';
xLng['SAVE'] = 'שמור';
xLng['49'] = 'פעולת ברירת מחדל בנקודת המפגש';
xLng['AT2'] = 'תגבורת';
xLng['AT3'] = 'התקפה רגילה';
xLng['AT4'] = 'התקפת פשיטה';
xLng['24'] = 'גודל פנקס הערות';
xLng['NBSIZEAUTO'] = 'אוטומאטי';
xLng['NBSIZENORMAL'] = 'רגיל (קטן)';
xLng['NBSIZEBIG'] = 'מסך רחב';
xLng['25'] = 'גובה פנקס הערות';
xLng['NBAUTOEXPANDHEIGHT'] = 'הרחב גובה אוטומאטית';
xLng['NBKEEPHEIGHT'] = 'גובה ברירת מחדל';
xLng['43'] = 'הצג רמות מבנים';
xLng['NPCSAVETIME'] = 'שמור: ';
xLng['38'] = 'הצג רמת שדות משאבים בצבע';
xLng['44'] = 'הצג רמת מבנים בצבע';
xLng['65'] = 'צבע שדרוג זמין (ברירת מחדל = ריק)';
xLng['66'] = 'צבע שלב מקסימאלי (ברירת מחדל = ריק)';
xLng['67'] = 'צבע כאשר שדרוג לא אפשרי (ברירת מחדל = ריק)';
xLng['68'] = 'צבע שדרוג ע"י NPC (ברירת מחדל = ריק)';
xLng['TOTALTROOPS'] = 'סה"כ כוחות שיש לכפר זה';
xLng['20'] = 'הראה מועדפים';
xLng['U.2'] = '<b>גזע</b><br>אם מופיעה שגיאה/ריק, אנא הכנס למגורי החיילים';
xLng['1'] = "שרת טרוויאן גירסה 2.x";
xLng['SELECTALLTROOPS'] = "בחר את כל החיילים";
xLng['PARTY'] = "חגיגות";
xLng['CPPERDAY'] = "נקודות תרבות ליום";
xLng['SLOT'] = "מקום פנוי";
xLng['TOTAL'] = 'סה"כ';
xLng['SELECTSCOUT'] = "בחר סייר";
xLng['SELECTFAKE'] = "התקפה מזויפת";
xLng['NOSCOUT2FAKE'] = "אי אפשר להשתמש בסיירים להתקפה מזויפת!";
xLng['NOTROOP2FAKE'] = "אין חיילים להתקפה מזויפת!";
xLng['NOTROOP2SCOUT'] = "אין סיירים לריגול!";
xLng['NOTROOPS'] = "אין חיילים בכפר!";
xLng['ALL'] = "הכל";
xLng['SH2'] = "בשורות הצבעים אתה יכול להכניס:<br>- <b>green</b> או <b>red</b> או  <b>orange</b> וכו'<br>- קוד HEX  כמו <b>#004523</b><br>- השאר ריק בשביל ברירת המחדל";
xLng['SHOWORIGREPORT'] = "הראה דוח רגיל (לפרסום)";
xLng['56'] = "הראה סוג עמק נטוש/נווה מדבר בזמן העברת העכבר מעליו במפה";
xLng['10'] = "סימולטור קרב לשימוש (בתפריט הימני)";
xLng['WARSIMOPTION1'] = "פנימי (מסופק על ידי המשחק)";
xLng['WARSIMOPTION2'] = "חיצוני (מסופק על ידי kirilloid.ru)";
xLng['27'] = "מאגר נתונים לשימוש";
xLng['28'] = "הצג לינקים סטטיסטיים ממאגר נתונים";
xLng['NONEWVER'] = "יש לך את הגירסה העדכנית ביותר";
xLng['BVER'] = "אתה יכול להוריד את גירסת הבטא";
xLng['NVERAV'] = "קיימת גירסה חדשה לסקריפט";
xLng['UPDATESCRIPT'] = "עדכן את הסקיפט עכשיו?";
xLng['CHECKUPDATE'] = "בודק עדכונים לסקריפט. אנא המתן...";
xLng['CROPFINDER'] = "מוצא קרופרים";
xLng['AVPOPPERVIL'] = "ממוצע אוכלוסייה לכפר";
xLng['AVPOPPERPLAYER'] = "ממוצע אוכלוסייה לשחקן";
xLng['37'] = "הראה טבלת שדרוג שדות משאבים";
xLng['41'] = "הראה טבלת שדרוג מבנים";
xLng['69'] = "Console Log Level<br>רק בשביל מתכנתים או בודקי באגים, (ברירת מחדל = 0)";
xLng['48'] = "מספר דפי הצעות לטעינה בזמן שנמצאים בעמוד 'שוק => הצעות'<br>(ברירת מחדל = 1)";
xLng['U.3'] = '<b>שם הבירה</b><br>אם מופיעה שגיאה/ריק, אנא הכנס לדף הפרופיל';
xLng['U.6'] = '<b>קואורדינטות הבירה</b><br>אם מופיעה שגיאה/ריק, אנא הכנס לדף הפרופיל';
xLng['MAX'] = 'מקס';
xLng['TOTALTROOPSTRAINING'] = 'סה"כ חיילים באימון';
xLng['57'] = 'הצג מרחקים וזמנים';
xLng['TBSETUPLINK'] = 'הגדרות ' + TB3O.shN;
xLng['UPDATEALLVILLAGES'] = 'עדכן מידע על כל הכפרים. השתמשו בזהירות כי הדבר יכול להוביל לקבלת באן!';
xLng['9'] = "הראה לינקים נוספים בתפריט הימני<br>(Traviantoolbox, World Analyser, Travilog, מפה, וכו')";
xLng['LARGEMAP'] = 'מפה גדולה';
xLng['USETHEMPR'] = 'חלק משאבים (באופן פרופורציוני)';
xLng['USETHEMEQ'] = 'חלק משאבים (באופן שווה)';
xLng['TOWNHALL'] = 'בניין העירייה';
xLng['GAMESERVERTYPE'] = 'סוג השרת';
xLng['ACCINFO'] = 'מידע חשבון';
xLng['NOTEBLOCKOPTIONS'] = 'פנקס הרשימות';
xLng['MENULEFT'] = 'תוספות התפריט שבצד ימין';
xLng['STATISTICS'] = 'סטטיסטיקות';
xLng['RESOURCEFIELDS'] = 'שדות משאבים';
xLng['VILLAGECENTER'] = 'מרכז הכפר';
xLng['MAPOPTIONS'] = 'אפשרויות מפה';
xLng['COLOROPTIONS'] = 'אפשרויות צבעים';
xLng['DEBUGOPTIONS'] = 'מסוף שגיאות';
xLng['4'] = 'שוק';
xLng['5'] = 'נקודת מפגש/מגורי חיילים/בית-מלאכה/אורווה ';
xLng['6'] = "בניין העירייה/אחוזת הגיבור/חרש שריון/חרש נשק";
xLng['HEROSMANSION'] = "אחוזת הגיבור";
xLng['BLACKSMITH'] = "חרש נשק";
xLng['ARMOURY'] = "חרש שריון";
xLng['NOW'] = 'כעת';
xLng['CLOSE'] = 'סגור';
xLng['USE'] = 'השתמש';
xLng['USETHEM1H'] = 'חלק משאבים (תוצר של שעה)';
xLng['OVERVIEW'] = 'מבט-על';
xLng['FORUM'] = 'פורום';
xLng['ATTACKS'] = 'התקפות';
xLng['NEWS'] = 'חדשות';
xLng['ADDCRTPAGE'] = 'הוסף דף נוכחי';
xLng['SCRPURL'] = 'אתר הסקריפט';
xLng['SPACER'] = 'קו הפרדה';
xLng['50'] = "מספר הסיירים שירשם בשימוש בפונקציה 'שלח סייר'";
xLng['53'] = 'הצג מידע על החיילים בהצבעת העכבר על תמונותיהם';
xLng['MESREPOPTIONS'] = 'הודעות ודוחות';
xLng['59'] = 'מספר דפי ההודעות/דוחות שברצונך לטעון<br>(ברירת-מחדל = 1)';
xLng['ATTABLES'] = 'טבלאות חיילים';
xLng['MTW'] = 'מקום פנוי';
xLng['MTX'] = 'לא ניתן לשלוח';
xLng['MTC'] = 'סה"כ משאבים';
xLng['ALLIANCEFORUMLINK'] = 'קישור לפורום ברית חיצוני (השאר ריק כדי להשתמש בפורום שמספק המשחק)';
xLng['82.L'] = 'נעל מועדפים (מסתיר את סמלי המחיקה וההזזה)';
xLng['MTCL'] = 'נקה הכל';
xLng['82.U'] = 'בטל נעילת מועדפים (מציג את סמלי המחיקה וההזזה)';
xLng['CLICKSORT'] = 'לחץ כדי למיין';
xLng['MIN'] = 'מינימום';
xLng['SAVEGLOBAL'] = 'שתף את ההצעה השמורה בכל הכפרים שלי';
xLng['VILLAGELIST'] = 'רשימת הכפרים';
xLng['12'] = "הצג קישוריי 'dorf1.php' ו- 'dorf2.php' ברשימת הכפרים";
xLng['UPDATEPOP'] = 'עדכן אוכלוסייה';
xLng['54'] = 'הצג מרחקים וזמנים בהצבעת העכבר על שמות כפרים';
xLng['NPCOPTIONS'] = 'אפשרויות מְסַיֵּעַ ה- NPC';
xLng['26'] = 'הצג חישובים ולינקים של מְסַיֵּעַ ה- NPC';
xLng['NEWVILLAGEAV'] = 'מתי ?';
xLng['58'] = 'הצג טבלה של שחקנים/כפרים/עמקים תפוסים';
xLng['TIMEUNTIL'] = 'עוד כמה זמן ?';
xLng['61'] = 'הצג את טבלת כפתורי המחיקה בדפי הדוחות';
xLng['62'] = "הצג את סמל 'שליחת הודעה' גם ליד שם המשתמש שלי";
xLng['CENTERMAP'] = 'מַרְכֵּז כפר זה במפה';
xLng['13'] = 'הצג סמל "מַרְכֵּז כפר זה במפה" ברשימת הכפרים';
xLng['SENDTROOPS'] = 'שלח כוחות';
xLng['64'] = 'הצג פרטי סטטיסטיקה נוספים בדפי הדוחות';
xLng['7'] = "ארמון/מגורים/אקדמיה/משרד-האוצר";
xLng['PALACE'] = "ארמון";
xLng['RESIDENCE'] = "מגורים מלכותיים";
xLng['ACADEMY'] = "אקדמיה";
xLng['TREASURY'] = "משרד-האוצר";
xLng['45'] = "הצג מספרים מהבהבים למבנים שעוברים שידרוג";
xLng['14'] = "הצג את הסמלים 'שליחת כוחות/משאבים' ברשימת הכפרים";
xLng['34'] = "הצג נקודות תרבות ליום בטבלאת השידרוגים";
xLng['UPGTABLES'] = "טבלאות שידרוג משאבים/מבנים";
xLng['35'] = "הצג צריכת יבול בטבלאת השידרוגים";
xLng['16'] = "הצג נטו ייצור יבול של כל כפר ברשימת הכפרים";
xLng['39'] = "הצג טבלאת 'גרף בארים'";
xLng['RESBARTABLETITLE'] = "סרגל משאבים";
xLng['21'] = "הצג את ה'מועדפים' כחלון מרחף";
xLng['23'] = "הצג את 'פנקס הרשימות' כחלון צף";
xLng['17'] = "הצג אוכלוסייה ברשימת הכפרים";
xLng['29'] = 'מנתח מפה לשימוש';
xLng['30'] = 'הצג לינקים למפה - למיקומי שחקנים';
xLng['31'] = 'הצג לינקים למפה - למיקומי בריתות';
xLng['40'] = "הצג טבלאת 'גרף בארים' כחלון צף";
xLng['63'] = 'הצג סטטיסטיקה בסיסית בדפי הדוחות';
xLng['3'] = 'שנה חישובי יכולת נשיאה של ליגיונר ופלנקס בשרתי T3.1<br>(מיועד לשרתי T3.1 ו- T3.5 משולבים - מופיע בעיקר בשרתי .de)';
xLng['18'] = 'הצג טבלאת רשימת כפרים נוספת כחלון צף (יוצג בשני טורים)';
xLng['60'] = 'הצג קישור לפתיחת הודעות בחלון מוקפץ';
xLng['42'] = 'סדר את המבנים בטבלת שידרוג המבנים לפי שמות';
xLng['19'] = 'הצג סמל מידע אודות תנועת כוחות ובניינים בתהליכי שידרוג/בנייה ברשימת הכפרים';
xLng['32'] = "הצג מסגרת חיפוש'";
xLng['33'] = "הצג 'מסגרת חיפוש' כחלון צף";
xLng['36'] = "הצג חישוביי זמנים ומשאבים נחוצים בטבלאות שידרוג מבנים וייצור חיילים";
xLng['RESIDUE'] = 'משאבים שישארו לך אם תבנה ';
xLng['RESOURCES'] = 'משאבים';
xLng['SH1'] = "פתח את הפרופיל שלך לזיהוי עיר בירה/קוארדינטות<br>בנה מגורי חיילים בשביל זיהוי גזע אוטומטי ואז כנס למרכז הכפר";
xLng['46'] = "הצג מידע נוסף אצל כל סוחר שמגיע";
xLng['2'] = 'הסר באנרים';
break;
case "vn":
//Bao Bao
xLng['8'] = 'Liên minh';
xLng['SIM'] = 'Trận giả';
xLng['QSURE'] = 'Bạn có chắc chắn không?';
xLng['LOSS'] = 'Thất bại';
xLng['PROFIT'] = 'Tiền lãi';
xLng['EXTAV'] = 'Mở rộng';
xLng['PLAYER'] = 'Người chơi';
xLng['VILLAGE'] = 'Làng';
xLng['POPULATION'] = 'Dân số';
xLng['COORDS'] = 'Tọa độ';
xLng['MAPTBACTS'] = 'Công việc';
xLng['SAVED'] = 'Đã ghi';
xLng['YOUNEED'] = 'Bạn cần';
xLng['TODAY'] = 'hôm nay';
xLng['TOMORROW'] = 'ngày mai';
xLng['DAYAFTERTOM'] = 'ngày kia';
xLng['MARKET'] = 'Chợ';
xLng['BARRACKS'] = 'Doanh trại';
xLng['RALLYPOINT'] = 'Gửi lính';
xLng['STABLE'] = 'Chuồng ngựa';
xLng['WORKSHOP'] = 'Xưởng';
xLng['SENDRES'] = 'Gửi tài nguyên';
xLng['COMPRAR'] = 'Mua';
xLng['SELL'] = 'Bán';
xLng['SENDIGM'] = 'Gửi IGM';
xLng['LISTO'] = 'Có sẵn';
xLng['ON'] = 'bật';
xLng['AT'] = 'lúc';
xLng['EFICIENCIA'] = 'Efficiency';
xLng['NEVER'] = 'Never';
xLng['ALDEAS'] = 'Làng';
xLng['TIEMPO'] = 'Thời gian';
xLng['OFREZCO'] = 'Tặng';
xLng['BUSCO'] = 'Tìm kiếm';
xLng['TIPO'] = 'Loại';
xLng['DISPONIBLE'] = 'Chỉ có sẵn';
xLng['CUALQUIERA'] = 'Bất kỳ';
xLng['YES'] = 'Có';
xLng['NO'] = 'Không';
xLng['LOGIN'] = 'Login';
xLng['MARCADORES'] = 'Bookmarks';
xLng['ANYADIR'] = 'Thêm';
xLng['UBU'] = 'New Bookmark URL';
xLng['UBT'] = 'New Bookmark Text';
xLng['ELIMINAR'] = 'Xóa';
xLng['MAPA'] = 'Bản đồ';
xLng['MAXTIME'] = 'Thời gian tối đa';
xLng['ARCHIVE'] = 'Lưu trữ';
xLng['SUMMARY'] = 'Tóm tắt';
xLng['TROPAS'] = 'Lính';
xLng['CHKSCRV'] = 'Cập nhật TBeyond';
xLng['ACTUALIZAR'] = 'Cập  nhật thông tin làng';
xLng['VENTAS'] = 'Đề nghị đã lưu';
xLng['MAPSCAN']  = 'Tìm bản đồ';
xLng['BIGICONS'] = 'Hiện thị các biểu tượng mở rộng';
xLng['22'] = 'Hiện bảng ghi chú';
xLng['SAVE'] = 'Ghi';
xLng['49'] = 'Hoạt động mặc định của binh trường';
xLng['AT2'] = 'Tiếp viện';
xLng['AT3'] = 'Tấn công: Bình thường';
xLng['AT4'] = 'Tấn công: Cướp bóc';
xLng['24'] = 'Kích thước bảng ghi chú';
xLng['NBSIZEAUTO'] = 'Tự động';
xLng['NBSIZENORMAL'] = 'Bình thường (nhỏ)';
xLng['NBSIZEBIG'] = 'Màn hình lớn (lớn)';
xLng['25'] = 'Chiều cao bảng ghi chú';
xLng['NBAUTOEXPANDHEIGHT'] = 'Chiều cao mở rộng tự động';
xLng['NBKEEPHEIGHT'] = 'Chiều cao mặc định';
xLng['43'] = 'Hiện thị số ở giữa';
xLng['NPCSAVETIME'] = 'Ghi: ';
xLng['38'] = 'Hiện thị màu cấp của tài nguyên';
xLng['44'] = 'Hiện thị màu cấp của kiến trúc';
xLng['65'] = 'Màu nâng cấp<br>(Mặc định = Rỗng)';
xLng['66'] = 'Màu cấp lớn nhất<br>(Mặc định = Rỗng)';
xLng['67'] = 'Màu nâng cấp chưa khi chưa đủ<br>(Mặc định = Rỗng)';
xLng['68'] = 'Màu nâng cấp bằng NPC<br>(Mặc định = Rỗng)';
xLng['TOTALTROOPS'] = 'Tổng lính trong làng';
xLng['20'] = 'Hiện thị bookmarks';
xLng['U.2'] = 'Chủng tộc';
xLng['1'] = "Travian v2.x server";
xLng['SELECTALLTROOPS'] = "Chọn tất cả lính";
xLng['PARTY'] = "Lễ";
xLng['CPPERDAY'] = "CP/ngày";
xLng['SLOT'] = "Vị trí";
xLng['TOTAL'] = "Tổng";
xLng['SELECTSCOUT'] = "Lựa chọn trinh thám";
xLng['SELECTFAKE'] = "Lựa chọn giả";
xLng['NOSCOUT2FAKE'] = "Không thể sử dụng trinh thám cho trận giả !";
xLng['NOTROOP2FAKE'] = "Không có lính cho trận giả!";
xLng['NOTROOP2SCOUT'] = "Không có lính để do thám !";
xLng['NOTROOPS'] = "Không có lính trong làng !";
xLng['ALL'] = "Tất cả";
xLng['SH2'] = "Trong các trường màu, bạn có thể chọn:<br>- <b>xanh lá cây</b> or <b>đỏ</b> or  <b>da cam</b>, etc.<br>- mã HEX giống như <b>#004523</b><br>- leave empty for the default color";
xLng['SHOWORIGREPORT'] = "Hiện thị báo cáo gốc (cho thông báo)";
xLng['56'] = "Hiện thị ô thông tin loại/ốc đảo<br>khi di chuột qua bản đồ";
xLng['10'] = "Liên kết trận giả để sử dụng:";
xLng['WARSIMOPTION1'] = "Nội địa (do game cung cấp)";
xLng['WARSIMOPTION2'] = "Bên ngoài (do kirilloid.ru cung cấp)";
xLng['27'] = "Sử dụng bộ phân tích thế giới";
xLng['28'] = "Hiện thị liên kết thông kê bộ phân tích";
xLng['NONEWVER'] = "Phiên bản mới đã có";
xLng['BVER'] = "Bạn có thể sử dụng bảng beta";
xLng['NVERAV'] = "Phiên bản mới của script đã có";
xLng['UPDATESCRIPT'] = "Bạn có muốn cập nhật phiên bản mới không ?";
xLng['CHECKUPDATE'] = "Đang kiểm tra phiên bản mới.<br>Xin chờ...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "Bình quân dân số trên một làng";
xLng['AVPOPPERPLAYER'] = "Bình quân dân số trên một người chơi";
xLng['37'] = "Hiện thị bảng nâng cấp tài nguyên";
xLng['41'] = "Hiện thị bảng nâng cấp kiến trúc";
xLng['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0)";
xLng['48'] = "Số lượng trang được tải đặt trước<br>trong khi giao dịch trên trang 'Chợ => Mua'<br>(Mặc định = 1)";
xLng['U.3'] = 'Tên thủ đô<br><b>Xem Profile cho cập nhật</b>';
xLng['U.6'] = 'Tọa độ thủ đô<br><b>Xem Profile cho cập nhật</b>';
xLng['MAX'] = 'Lớn nhất';
xLng['TOTALTROOPSTRAINING'] = 'Tổng lính đang huấn luyện';
xLng['57'] = 'Hiện thị khoảng cách và thời gian';
xLng['TBSETUPLINK'] = TB3O.shN + ' Cài đặt';
xLng['UPDATEALLVILLAGES'] = 'Cập nhật tất cả các làng.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
xLng['9'] = "Hiện thị các liên kết mở rộng bên menu trái<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
xLng['LARGEMAP'] = 'Bản đồ lớn';
xLng['USETHEMPR'] = 'Sử dụng chúng (tỷ lệ)';
xLng['USETHEMEQ'] = 'Sử dụng (bằng)';
xLng['TOWNHALL'] = 'Tòa thị chính';
xLng['GAMESERVERTYPE'] = 'Game server';
xLng['ACCINFO'] = 'Thông tin tài khoản';
xLng['NOTEBLOCKOPTIONS'] = 'Bảng ghi chú';
xLng['MENULEFT'] = 'Menu hiện thị bên trái';
xLng['STATISTICS'] = 'Thống kê';
xLng['RESOURCEFIELDS'] = 'Ruộng tài nguyên';
xLng['VILLAGECENTER'] = 'Trung tâm làng';
xLng['MAPOPTIONS'] = 'Tùy chỉnh bản đồ';
xLng['COLOROPTIONS'] = 'Tùy chỉnh màu';
xLng['DEBUGOPTIONS'] = 'Debug options';
xLng['4'] = 'Chợ';
xLng['5'] = 'Binh trường/Doanh trại/Xưởng/Chuồng ngựa';
xLng['6'] = "Tòa thị chính/Lâu đài tướng/Lò luyện giáp/Lò rèn";
xLng['HEROSMANSION'] = "Lâu đài tướng";
xLng['BLACKSMITH'] = 'Lò rèn';
xLng['ARMOURY'] = 'Lò luyện giáp';
xLng['NOW'] = 'Bây giờ';
xLng['CLOSE'] = 'Đóng';
xLng['USE'] = 'Sử dụng';
xLng['USETHEM1H'] = 'Sử dụng (1 giờ sản lượng)';
xLng['OVERVIEW'] = 'Tổng quát';
xLng['FORUM'] = 'Diễn đàn';
xLng['ATTACKS'] = 'Tấn công';
xLng['NEWS'] = 'Tin tức';
xLng['ADDCRTPAGE'] = 'Thêm trang đang xem vào bookmarks';
xLng['SCRPURL'] = 'TBeyond trang';
xLng['50'] = 'Số lượng trinh sát sử dụng cho chức năng<br>"Lựa chọn trinh sát"';
xLng['SPACER'] = 'Dấu cách';
xLng['53'] = 'Hiện thị thông tinh lính trong tooltips';
xLng['MESREPOPTIONS'] = 'Tin nhắn & Báo cáo';
xLng['59'] = 'Số tin nhắn/trang báo cáo để tải trước<br>(Default = 1)';
xLng['ATTABLES'] = 'Các bảng lính';
xLng['MTW'] = 'Wasted';
xLng['MTX'] = 'Exceeding';
xLng['MTC'] = 'Tải hiện tại';
xLng['ALLIANCEFORUMLINK'] = 'Liên kết tới diễn đàn ngoài<br>(Để trống là mặc định diễn đàn của game)';
xLng['82.L'] = 'Khóa bookmarks (Ẩn các biểu tưởng xóa, di chuyển lên, di chuyển xuống)';
xLng['MTCL'] = 'Xóa tất cả';
xLng['82.U'] = 'Mở khóa bookmarks (Hiện các biểu tưởng xóa, di chuyển lên, di chuyển xuống)';
xLng['CLICKSORT'] = 'Click để sắp xếp';
xLng['MIN'] = 'Ít nhất';
xLng['SAVEGLOBAL'] = 'Chia sẽ các làng ở giữa';
xLng['VILLAGELIST'] = 'Danh sách làng';
xLng['12'] = "Hiện các liên kết 'dorf1.php' and 'dorf2.php'";
xLng['UPDATEPOP'] = 'Cập nhật dân số';
xLng['54'] = 'Hiện thị khoảng cách và thời gian tới làng trong tooltips';
xLng['EDIT'] = 'Sửa';
xLng['NPCOPTIONS'] = 'Tùy chỉnh NPC trợ giúp';
xLng['26'] = 'Hiện thị các liên kết/tính toán NPC trợ giúp';
xLng['58'] = 'Hiện thị bảng người chơi/làng/ốc đảo đầy';
xLng['NEWVILLAGEAV'] = 'Ngày/Thời gian';
xLng['TIMEUNTIL'] = 'Thời gian chờ';
xLng['61'] = 'Hiện thị bảng "Xóa tất cả" trên trang Báo cáo';
xLng['62'] = 'Cũng hiện thị biểu tưởng "Gửi IGM"';
xLng['CENTERMAP'] = 'Trung tâm bản đồ';
xLng['13'] = 'Hiện thị biểu tưởng "Trung tâm bản đồ"';
xLng['SENDTROOPS'] = 'Gửi lính';
xLng['64'] = 'Hiện thị chi tiết trong Thống kê';
xLng['7'] = "Cung điện/Dinh thự/Học viện/Kho bạc";
xLng['PALACE'] = "Cung điện";
xLng['RESIDENCE'] = "Dinh thự";
xLng['ACADEMY'] = "Học viện";
xLng['TREASURY'] = "Kho bạc";
xLng['45'] = "Hiện thị nhấp nháy cấp độ kiến trúc đang được nâng cấp";
xLng['14'] = "Hiện thị biểu tượng 'Gửi lính/Gửi tài nguyên' trong danh sách làng";
xLng['34'] = "Hiện thị thông tin CP/ngày trong bảng nâng cấp";
xLng['UPGTABLES'] = "Bảng nâng cấp Ruộng tài nguyên/kiến trúc";
xLng['35'] = "Hiện thị tiêu thụ trong bảng nâng cấp";
xLng['16'] = "Hiện thị sản lượng thực sự trong danh sách làng";
xLng['RESBARTABLETITLE'] = "Tóm tắt tài nguyên";
xLng['39'] = "Hiện thị bảng 'Tóm tắt tài nguyên'";
xLng['40'] = "Hiện thị bảng 'Tóm tắt tài nguyên' như là cửa sổ có thể di chuyển được";
xLng['21'] = "Hiện thị 'User Bookmarks' như là cửa sổ di chuyển được";
xLng['23'] = "Hiện thị 'Bảng ghi chú' như là cửa sổ di chuyển được";
xLng['17'] = "Hiện thị dân số trong danh sách làng";
xLng['29'] = 'Bộ phân tích bản đồ để sử dụng';
xLng['30'] = 'Hiện thị các liên kết tới bản đồ cho các user';
xLng['31'] = 'Hiện thị các liên kết tới bản đồ cho các liên minh';
xLng['63'] = 'Hiện thị Báo cáo trận đánh tăng cường TB3';
xLng['18'] = 'Hiện thị thêm danh sách  làng (2 cột) như là cửa sổ di chuyển được';
xLng['60'] = 'Hiện thị liên kết để mở tin nhắn/báo cáo trong cửa sổ pop-up';
xLng['42'] = 'Sắp xếp kiến trúc theo tên trong bảng nâng cấp';
xLng['19'] = 'Hiện thị thông tin về tiến độ xây dựng kiến trúc và di chuyển lính <br>ở danh sách làng';
xLng['32'] = "Hiện thị 'Thanh tìm kiếm'";
xLng['3'] = 'Force T3.1 Legionnaire & Phalanx capacity calculation<br>(for mixed T3.1 & T3.5 servers)';
xLng['33'] = "Hiện thị 'Thanh tìm kiếm' như là cửa sổ di chuyển được";
xLng['36'] = "Hiện thị tính toán 'Đến khi/Còn lại' trong bảng nâng cấp/huấn luyện";
xLng['RESIDUE'] = 'Còn lại nếu bạn xây dựng kiến trúc này';
xLng['RESOURCES'] = 'Tài nguyên';
xLng['SH1'] = "Mở profile của bạn để tự động phát hiện thủ đô/tọa độ<br>Xây dựng doanh trại để tự động phát hiện chủng tộc và sau đó mở trung tâm làng";
xLng['46'] = "Hiển thị thông tin bổ sung cho tất cả các thương gia đến";
xLng['2'] = 'Hủy bỏ quảng cáo biểu ngữ';
xLng['15'] = "Hiển thị gỗ, đất sét, sắt sản xuất cho mỗi giờ trong danh sách làng";
xLng['11'] = "Liên kết để sử dụng cho các trang web đăng tải các báo cáo";
break;
case "th":
xLng['8'] = 'พันธมิตร';
xLng['SIM'] = 'จำลองการต่อสู้';
xLng['QSURE'] = 'แน่ใจนะ?';
xLng['LOSS'] = 'ความเสียหาย';
xLng['PROFIT'] = 'กำไร';
xLng['EXTAV'] = 'พร้อมขยาย';
xLng['PLAYER'] = 'ผู้เล่น';
xLng['VILLAGE'] = 'หมู่บ้าน';
xLng['POPULATION'] = 'ประชากร';
xLng['COORD'] = 'พิกัด';
xLng['MAPTBACTS'] = 'การดำเนินการ';
xLng['SAVED'] = 'Saved';
xLng['YOUNEED'] = 'คุณต้องการ';
xLng['TODAY'] = 'วันนี้';
xLng['TOMORROW'] = 'วันพรุ่งนี้';
xLng['DAYAFTERTOM'] = 'วันมะรืนนี้';
xLng['MARKET'] = 'ตลาดสินค้า';
xLng['BARRACKS'] = 'ค่ายทหาร';
xLng['RALLYPOINT'] = 'จุดรวมกำลังพล';
xLng['STABLE'] = 'โรงม้า';
xLng['WORKSHOP'] = 'ห้องเครื่อง';
xLng['SENDRES'] = 'ส่งทรัพยากร';
xLng['BUY'] = 'ซื้อ';
xLng['SELL'] = 'ขาย';
xLng['SENDIGM'] = 'ส่ง IGM';
xLng['LISTO'] = 'พร้อม';
xLng['ON'] = 'วันที่';
xLng['AT'] = 'ณ เวลา';
xLng['EFICIENCIA'] = 'ประสิทธิผล';
xLng['NEVER'] = 'ไม่มีทาง';
xLng['ALDEAS'] = 'หมู่บ้าน';
xLng['TIEMPO'] = 'เวลา';
xLng['OFREZCO'] = 'สิ่งที่เสนอ';
xLng['BUSCO'] = 'สิ่งที่ต้องการ';
xLng['TIPO'] = 'รูปแบบ';
xLng['DISPONIBLE'] = 'พร้อมเท่านั้น';
xLng['CUALQUIERA'] = 'ทั้งหมด';
xLng['YES'] = 'ใช่';
xLng['NO'] = 'ไม่ใช่';
xLng['LOGIN'] = 'เข้าสู่ระบบ';
xLng['MARCADORES'] = 'บุ๊คมาร์ค';
xLng['ANYADIR'] = 'เพิ่ม';
xLng['UBU'] = 'URL บุ๊คมาร์คใหม่';
xLng['UBT'] = 'ข้อความบุ๊คมาร์คใหม่';
xLng['ELIMINAR'] = 'ลบ';
xLng['MAPA'] = 'แผนที่';
xLng['MAXTIME'] = 'เวลาสูงสุด';
xLng['ARCHIVE'] = 'เอกสารสำคัญ';
xLng['SUMMARY'] = 'สรุป';
xLng['TROPAS'] = 'กองกำลัง';
xLng['CHKSCRV'] = 'ปรับปรุง TBeyond';
xLng['ACTUALIZAR'] = 'ปรังปรุงข้อมูลหมู่บ้าน';
xLng['VENTAS'] = 'Saved Offers';
xLng['MAPSCAN'] = 'Scan แผนที่';
xLng['BIGICONS'] = 'แสดง extended icons';
xLng['22'] = 'แสดงกล่องข้อความ';
xLng['SAVE'] = 'บันทึก';
xLng['AT2'] = 'ส่งกองกำลังเสริม';
xLng['AT3'] = 'โจมตี: ปกติ';
xLng['AT4'] = 'โจมตี: ปล้น';
xLng['24'] = 'ขนาดกล่องข้อความ';
xLng['NBSIZEAUTO'] = 'อัตโนมัติ';
xLng['NBSIZENORMAL'] = 'ปกติ (เล็ก)';
xLng['NBSIZEBIG'] = 'จอขนาดใหญ่ (ใหญ่)';
xLng['25'] = 'กล่องข้อความ height';
xLng['NBAUTOEXPANDHEIGHT'] = 'ขยายความสูงอัตโนมัติ';
xLng['NBKEEPHEIGHT'] = 'ความสูงปกติ';
xLng['NPCSAVETIME'] = 'ประหยัดเวลา: ';
xLng['65'] = 'Color upgrade available<br>(ปกติ = ว่าง)';
xLng['66'] = 'Color max level<br>(ปกติ = ว่าง)';
xLng['67'] = 'Color upgrade not possible<br>(ปกติ = ว่าง)';
xLng['68'] = 'Color upgrade via NPC<br>(ปกติ = ว่าง)';
xLng['TOTALTROOPS'] = 'กองกำลังของหมู่บ้านทั้งหมด';
xLng['20'] = 'แสดงบุ๊คมาร์ค';
xLng['U.2'] = 'เผ่า';
xLng['SELECTALLTROOPS'] = "เลือกกองกำลังทั้งหมด";
xLng['PARTY'] = "การเฉลิมฉลอง";
xLng['CPPERDAY'] = "CP/วัน";
xLng['SLOT'] = "ช่อง";
xLng['TOTAL'] = "รวม";
xLng['SELECTSCOUT'] = "เลือกหน่วยสอดแนม";
xLng['SELECTFAKE'] = "เลือกโจมตีหลอก";
xLng['NOSCOUT2FAKE'] = "มันเป็นไปไม่ได้ที่จะใช้หน่วยสอดแนมสำหรับการโจมตีหลอก !";
xLng['NOTROOP2FAKE'] = "ไม่มีกองกำลังสำหรับสิ่งที่โจมตี!";
xLng['NOTROOP2SCOUT'] = "ไม่มีหน่วยสอดแนม !";
xLng['NOTROOPS'] = "ไม่มีกองกำลังในหมู่บ้าน !";
xLng['ALL'] = "ทั้งหมด";
xLng['SHOWORIGREPORT'] = "แสดงรายงานแบบเดิม (for posting)";
xLng['56'] = "แสดงข้อมูล ประเภทของcellหรือโอเอซิส<br>ขณะที่เมาส์อยู่บนแผนที่";
xLng['10'] = "ใช้ลิ้งค์จำลองการต่อสู้:<br>(เมนูด้านซ้าย)";
xLng['WARSIMOPTION1'] = "ภายใน (provided by the game)";
xLng['WARSIMOPTION2'] = "ภายนอก (provided by kirilloid.ru)";
xLng['27'] = "ใช้ World Analyser";
xLng['28'] = "แสดงลิ้งค์ analyser statistic";
xLng['UPDATESCRIPT'] = "ปรับปรุง script เดี๋ยวนี้?";
xLng['CHECKUPDATE'] = "กำลังปรับปรุง script. กรุณารอสักครู่...";
xLng['CROPFINDER'] = "Crop finder";
xLng['AVPOPPERVIL'] = "ประชากรเฉลี่ยต่อหมู่บ้าน";
xLng['AVPOPPERPLAYER'] = "ประชากรเฉลี่ยต่อผู้เล่น";
xLng['69'] = "Console Log Level<br>สำหรับ PROGRAMMERS หรือ DEBUGGING เท่านั้น<br>(ปกติ = 0)";
xLng['48'] = "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(ปกติ = 1)";
xLng['U.3'] = 'ชื่อเมืองหลวงของคุณ<br>Visit your Profile for an update';
xLng['U.6'] = 'พิกัดของเมืองหลวง<br>Visit your Profile for an update';
xLng['MAX'] = 'สูงสุด';
xLng['57'] = 'แสดงระยะทางและเวลา';
xLng['LARGEMAP'] = 'แผนที่ขนาดใหญ่';
xLng['TOWNHALL'] = 'ศาลากลาง';
xLng['ACCINFO'] = 'ข้อมูลบัญชี';
xLng['NOTEBLOCKOPTIONS'] = 'กล่องข้อความ';
xLng['MENULEFT'] = 'เมนูด้านซ้าย';
xLng['STATISTICS'] = 'สถิติ';
xLng['RESOURCEFIELDS'] = 'พื้นที่ทรัพยากร';
xLng['VILLAGECENTER'] = 'ศูนย์กลางหมู่บ้าน';
xLng['4'] = 'ตลาด';
xLng['5'] = 'จุดระดมพล/ค่ายทหาร/ห้องเครื่อง/โรงม้า';
xLng['6'] = "ศาลากลาง/คฤหาสน์ของฮีโร่/คลังแสง/ช่างตีเหล็ก";
xLng['HEROSMANSION'] = "คฤหาสน์ของฮีโร่";
xLng['BLACKSMITH'] = 'ช่างตีเหล็ก';
xLng['ARMOURY'] = 'คลังแสง';
xLng['NOW'] = 'เดี๋ยวนี้';
xLng['CLOSE'] = 'ปิด';
xLng['USE'] = 'ใช้';
xLng['OVERVIEW'] = 'ภาพรวม';
xLng['FORUM'] = 'ฟอรัม';
xLng['ATTACKS'] = 'โจมตี';
xLng['NEWS'] = 'ข่าว';
xLng['ADDCRTPAGE'] = 'เพิ่มหน้าปัจจุบัน';
xLng['SCRPURL'] = 'หน้า TBeyond';
xLng['50'] = 'จำนวนของหน่วยสอดแนมสำหรับ<br>ฟังก์ชัน "เลือกหน่วยสอดแนม"';
xLng['SPACER'] = 'คั่น';//Spacer
xLng['53'] = 'แสดงข้อมูลกองกำลังใน tooltips';
xLng['MESREPOPTIONS'] = 'ข่าวสาร & รายงาน';
xLng['59'] = 'Number of message/report pages to preload<br>(Default = 1)';
xLng['ATTABLES'] = 'Troop tables';
xLng['MTW'] = 'ไร้ประโยชน์';
xLng['MTX'] = 'มากมาย';
xLng['MTC'] = 'Current load';
xLng['ALLIANCEFORUMLINK'] = 'Link to external forum<br>(Leave empty for internal forum)';
xLng['82.L'] = 'ล็อคบุ๊คมาร์ค (ซ่อนปุ่ม ลบ, เลื่อนขึ้น, เลื่อนลง, แก้ไข)';
xLng['MTCL'] = 'ล้างทั้งหมด';
xLng['82.U'] = 'ปลดล็อคบุ๊คมาร์ค (แสดงปุ่ม ลบ, เลื่อนขึ้น, เลื่อนลง, แก้ไข)';
xLng['CLICKSORT'] = 'คลิกเพื่อจัดเรียง';
xLng['MIN'] = 'ต่ำสุด';
xLng['SAVEGLOBAL'] = 'แบ่งระหว่างหมู่บ้าน';
xLng['VILLAGELIST'] = 'รายชื่อหมู่บ้าน';
xLng['12'] = "แสดงลิ้งค์ 'dorf1.php' และ 'dorf2.php'";
xLng['UPDATEPOP'] = 'ปรับปรุงประชากร';
xLng['54'] = 'แสดงระยะทางและเวลาไปถึงหมู่บ้านใน tooltips';
xLng['EDIT'] = 'แก้ไข';
xLng['NEWVILLAGEAV'] = 'วันที่/เวลา';
xLng['TIMEUNTIL'] = 'เวลาที่รอ';
xLng['61'] = 'แสดงตาราง "ลบทั้งหมด" บนหน้ารายงาน';
xLng['62'] = 'แสดงไอคอน "ส่ง IGM"';
xLng['CENTERMAP'] = 'ไปยังกลางแผนที่';
xLng['13'] = 'แสดงไอคอน "ไปยังกลางแผนที่"';
xLng['SENDTROOPS'] = 'ส่งกองกำลัง';
xLng['7'] = "พระราชวัง/ที่พักอาศัย/สถานศึกษา/คลังสมบัติ";
xLng['PALACE'] = "พระราชวัง";
xLng['RESIDENCE'] = "ที่พักอาศัย";
xLng['ACADEMY'] = "สถานศึกษา";
xLng['TREASURY'] = "คลังสมบัติ";
break;
};
};

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

//Training cost for each unit (4), load capacity (1), attack power (1), def power infantery (1), def power cavalery (1), speed (1) - for normal servers, crop consumption(1)
var uc = new Array();
//Romans
uc[1] = [120,100,150,30,50,40,35,50,6,1];//Legionnaire
uc[2] = [100,130,160,70,20,30,65,35,5,1];//Praetorian
uc[3] = [150,160,210,80,50,70,40,25,7,1];//Imperian
uc[4] = [140,160,20,40,0,0,20,10,16,2];//Equites legati
uc[5] = [550,440,320,100,100,120,65,50,14,3];//Equites imperatoris
uc[6] = [550,640,800,180,70,180,80,105,10,4];//Equites cesaris
uc[7] = [900,360,500,70,0,60,30,75,4,3];//Battering ram
uc[8] = [950,1350,600,90,0,75,60,10,3,6];//Fire catapult
uc[9] = [30750,27200,45000,37500,0,50,40,30,4,5];//Senator
uc[10] = [5800,5300,7200,5500,3000,0,80,80,5,1];//Settler
//Teutons
uc[11] = [95,75,40,40,60,40,20,5,7,1];//Club swinger
uc[12] = [145,70,85,40,40,10,35,60,7,1];//Spearman
uc[13] = [130,120,170,70,50,60,30,30,6,1];//Axeman
uc[14] = [160,100,50,50,0,0,10,5,9,1];//Scout
uc[15] = [370,270,290,75,110,55,100,40,10,2];//Paladin
uc[16] = [450,515,480,80,80,150,50,75,9,3];//Teutonic knight
uc[17] = [1000,300,350,70,0,65,30,80,4,3];//Ram
uc[18] = [900,1200,600,60,0,50,60,10,3,6];//Catapult
uc[19] = [35500,26600,25000,27200,0,40,60,40,4,4];//Chief
uc[20] = [7200,5500,5800,6500,3000,10,80,80,5,1];//Settler
//Gauls
uc[21] = [100,130,55,30,35,15,40,50,7,1];//Phalanx
uc[22] = [140,150,185,60,45,65,35,20,6,1];//Swordsman
uc[23] = [170,150,20,40,0,0,20,10,17,2];//Pathfinder
uc[24] = [350,450,230,60,75,90,25,40,19,2];//Theutates thunder
uc[25] = [360,330,280,120,35,45,115,55,16,2];//Druidrider
uc[26] = [500,620,675,170,65,140,50,165,13,3];//Haeduan
uc[27] = [950,555,330,75,0,50,30,105,4,3];//Ram
uc[28] = [960,1450,630,90,0,70,45,10,3,6];//Trebuchet
uc[29] = [30750,45400,31000,37500,0,40,50,50,5,4];//Chieftain
uc[30] = [5500,7000,5300,4900,3000,0,80,80,5,1];//Settler
//Nature
uc[31] = [0,0,0,0,0,10,25,20,0,1];//Rat
uc[32] = [0,0,0,0,0,20,35,40,0,1];//Spider
uc[33] = [0,0,0,0,0,60,40,60,0,1];//Snake
uc[34] = [0,0,0,0,0,80,66,50,0,1];//Bat
uc[35] = [0,0,0,0,0,50,70,33,0,2];//Wild boar
uc[36] = [0,0,0,0,0,100,80,70,0,2];//Wolf
uc[37] = [0,0,0,0,0,250,140,200,0,3];//Bear
uc[38] = [0,0,0,0,0,450,380,240,0,3];//Crocodile
uc[39] = [0,0,0,0,0,200,170,250,0,3];//Tiger
uc[40] = [0,0,0,0,0,600,440,520,0,5];//Elephant
//Natarian - fr3nchlover
uc[41] = [0,0,0,0,0,20,35,50,0,1];//Pikeman
uc[42] = [0,0,0,0,0,65,30,10,0,1];//Thorned warrior
uc[43] = [0,0,0,0,0,100,90,75,0,1];//Guardsman
uc[44] = [0,0,0,0,0,0,10,0,0,1];//Birds of prey
uc[45] = [0,0,0,0,0,155,80,50,0,2];//Axerider
uc[46] = [0,0,0,0,0,170,140,80,0,3];//Natarian knight
uc[47] = [0,0,0,0,0,250,120,150,0,6];//Warelephant
uc[48] = [0,0,0,0,0,60,45,10,0,5];//Ballista
uc[49] = [0,0,0,0,0,80,50,50,0,0];//Natarian emperor
uc[50] = [0,0,0,0,0,30,40,40,0,0];//Settler
uc[98] = [20,30,10,20,0,0,0,0,0,0];//trap
uc[99] = [20,30,10,20,0,0,0,0,0,0];//trap

var imP = 'data:image/gif;base64,';
var imPNG = 'data:image/png;base64,';
//base64 coded images
var image = {
"igm":			imP + 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==',
"igmopen":		imP + 'R0lGODlhCwAPAPcAAEBAQAAm/4CAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACwAPAAAIRwAHABhIkOAAgQcTHgSwcECAhw8RSlQokSHEiAwnKsxo8SLCgRQXAhAgwKFHkiVLKkypUuWAljBRHiT5kiJLlysFjETJU2dAADs=',
"underline":	imP + 'R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=',
"globe":		imP + 'R0lGODlhDAANAPcAAAAAAAVrEwB0CgB4DQB7DQByHwplPQF+MRZlNxJwOQdcRAZYagRkTwFuTRhiUAFjditgawM/pQBHmxVHlx9UgwFApwNGqABGrQJJrwBQtQBUuwBevBJCpxREqRdFqxdWsgFrpQB1tAF4uitcgShOtCJXtjdXpDddvjhXuDtdvTxltQBcwgBrzQFuzQ1oxxxsxRV41EFdiUdemkRerVxsk1lsmkZxvgGCNiSoLDSxLgGGQQGETAGJWQyTcB6beD6NdSWkfky/LEK3RljFNWfNRWzPQ2LKU2/QVHTTan7YdQGAjQiHjw2Xgx6KnQKIoQiEohyilTazjQGJyQKD3AaS2AGG7QmY5BKe+xehxzSd6DCw+meBkHqJmHKQmHaIqnmGo06Qz0mj3kq+/nam2nbNrGfL13rU1JyisqOotKistqW6va6yuYir1pWnwY3YkIjcq4LStZDhkZPhpJ3mpJzlrqTpoqTjtpvV0p3K66rL0qHZ0KLH5qfjzabow7XwxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAA0AAAifAP8J/McHDpk7AwfaeSMnyRAgWfAMdINkjh86RqBMaZLnnx4hReLU6VMGi5MDP/6F8RGEyBEzYqzwIJBADYwnOHJE0XJFyo0CBrq4aLGkBxMqVZQMCOBgy4sVLETo2BECBAMEELiAwaBhQwMBDzJYGBEDzZ4PFS4sUCAhAgcTNASOKdGBwgQPJFDIWDOQjQ0VJ1LMqJEmocA2Xr6cSRgQADs=',
"usethempr":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAntJREFUSEuVlU1ME1EQx1dOHD169OjRo0eP3rTGLV5Mjdui3lCaQEy01bAtfiDRlIgEwbYkxBAwVVGCgZqI8WsNcjBNlYMJoYRaWNq1ZVtWVv6bvGa7fbv7mOSlzb7Z/29m3szbA5yLtQnR43DZbeGMXztr2eXeYa9VUz/F4zdVN92G/ZO+0MGuWyNjiYm5yvLvnIyluxjxm3z1Yfua+HSa9905xAQ9I0ROTL5YyGvav5obxGn/9ZxUuHClP+AI7RZHn6ys5l2zYQ2kIJe2eu6Pp6jQQOeDc+t5eZNVjNWvXFH/Xu4aCDdAUe+Xs1/W7ERyuZwuSZKezWapLtjDsrOPUmbjdLt4pA4N3x2b0TSNemapVEoXBMEQFEVRDwaDTboej0dHUE52e2Bi0QD6fKFWdJadM8TMZhUnwbiVeGZeUtH9HObMqe2tQGRJyheLxXQsFgPDmGneHz1fLJUVpwwJQFEUnQSAZ7Ty2umo1Zrq9Uc69oCRS3udVHaKEsJYKB8axwzGe25NA58dTdvhBbGbw6Dvd/aQJcBoFPxPp9N6MpmsZ08Lfm1d3vK2i6c4jMT8+++OGZoFkCnEYcjY3J14TvasUDDq113f4FSG5eDJiBBfa0OR0aFpDSXe/KnPIe/vOfpt6VfBCQoxKwDZmLvUmjHRw5Hh6Bpum6uh4XuVbZXarTgvwGjlAhAgLFTAavgI3OhNTDXdp7gA+oeeL1WrNdtLgKXsZh/A4s/eZoyBpxmgndcfP8z8XJH3K271RxmRmS3MHIDX33vs0ej06sLnHwramRW+sVkqfl3MFkfGZ4tNZ8byNW67GD2M2eED0TDL8gbEsw1fBQrkP6+jTExmIuLUAAAAAElFTkSuQmCC',
"usethemeq":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAflJREFUSEtjZCAAwpPbHUBK/jExgGlcgOkfwwGQHMefHycWLmz8QchcFHn/+HqB8qZ5Sxat3vvtzoNn70H4PwEAU7d2y9HvVa0LtobGd0kQZWlIcpvH2k1HXv358/cXIUvwyW/be+ZNUmF/Kl5LK1rnz3389BVB3xDrkDfvP31o6Vu+EaulqcUTY1++ev+OWMOIVff1248vmeVTG1AsBYX35l2nnhNrCKnqjp+5/jYorVUDbmlD95Idf/78oSjOCDmic+rq82AL4+PrOUApi5AGSuV37DvzA5T6GUD5jJhkP2XKlP9nzpzBijdu3Pj/5s2beN0EsgOcp0NT2hM+fvr6mZAPAgMD/9vY2ODEIMfgAz9+/voRltJWALSwLQOYkr4SsvDzZ4JuwmvE7z9/focmt1YwgDI6MXmP0iB9/vL9h7C01gAGUJbYd/gCQR9SGqQgO+DFXe+MdddpHaSzFm1/Dc+HoSktBmcv3n5DyFJy5UFRBoo6lNKmqH5Oz7fvPyhLGVhcBKoE6joWrcMoT0EFQP+s9Rd//vxFtUIAZNnClbuvgzM8NgCytLh25qTrtx5TXGOAghHkM5yWITsgLKXDYvr8rU+PnLz6GZSciY27t+8+fTx9/ubHect3fcSIM2Jq4/D0dgVQ3glNbW8gBoeltkag1ApYLAEAIKtp4+xd+jMAAAAASUVORK5CYII=',
"usethem1h":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8FJREFUSEudlUtsG2UQx01PPXLkyJEjR46coPQCQjjlgoJIUtITLRWkQoIEVCflWYFUAVEfJKpUoZICgUBUlAqJIkobmkdBVuq68Wu9tnfX6/V6n971n5kPOfL60USMtLI8+3l+8/jP54diu9ihkZkn+UhrX0x8DrJ9rdiv/G5/4N6Ym3vX3S1u5P2zw5MPT7x3/uL85RX7Xqao84NdrH1u4cffnbcSXy3Fhz94ZE/QF0amDywsXq8EQeh3Mnzfh240IFd05IsaspKKgqyhrNbQsBy0WmEkpZ9WVtVXjp0eeyD0ROLCubxEETssDANUdR3ZfAkFqYJyWYWqaNAUFUpFRVGuIEPvJPq0bTsCVfV67eQnl77vCx07/ulL5Ype7fxFMwgooILtrARN0+HZFkLXRmA16DHFZ+jY5Lchl1SktyXqghmBWrbbODJxZioC5X7/cPWm3Hmy1QIUzaDsZXiOg3q9TnAZDaOGgMBNhhLMNk2Uya8pClRKKp2lM9TiTvtjNak9fzjx2A506sOLy0EQRGbmek1kCxXU9BpavicC5wsScvkCfAK2PBeuZWErlcbt9Q1oqgoaJM1XodmqCDnjDnv/zOU1ARwentzPyuoWoWE6YjauWUeTAFyN2yDRyGWRhGs7oqJCsQSTkmmLpkotvU9V+n4zEnL52qrL6o/xnvWTvW5YAugxkNonoK6DkKrNFSvYTKZQNxs9y1IzLaQzNIYuIDPETsdHZ1426qSALmvYHrZzJZqZge8WvgE1A/dTdxE2faFGnapkXzabjfyypFSRKZRBaxXxu57vDo1OHyXg9DgpyeoGBmEIqVTFa0ePIXnnjgi+nb6HkJTLs2LrBtqOR6Ipgtahp3JSfDM+kjgR40Xv3r32advxhXBk2r3/gmcigdi3uLiI8fFxPHPwIJaWVyhJDZxst8llvTZ0OPFcjFfi2m/rPRXuQF1f3CgcfH3zb9iOC78ZUMsC4XvjzQlKSMPsuTk89fSBnla24zBj57r7+IsryZ6UOhycMQe/dXtTyD5HN05OUoTvxs01VOh629pKie+DbHb+Z2VnD+OjJx//ayNFizTY+gmk08fiGQTkkfHoIrfN65NnP6J29ai1ncL/BfKfwDun5q/03Kd8AZye/XbD8/zIJcCg7qe9CrtVyLC5r39JioXvZww9/vaXnyXv5vUHtXcv77iNXNlAWGcCQ6Onnvj8wpJ0/c9/TJbzXgB8RqvWjVtrW8b5S1eNnpn1LbHLeejVmUd5d+JjM1N7eYbGEi9G/hX6QP4F7nAoMfND3esAAAAASUVORK5CYII=',
"btnDel":		imP + 'R0lGODlhLQAUAPcAAAAAAHHQAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8i4tNanodqxqNqxqtqxrOC+ucrKyszMzM/Pz9PFw9LS0tnS0NjY2Nra2tzc3OTKxebQyujSzuPd2+Pe3enV0ODg4OLi4uTk5OXm5Obm5ufn5+ro5+jo6Onp6evr6+zs7O7t7e7v7e/v7/Hk4fHx8fPy8fPz8/T09PX19fb29vf29/n08vj4+Pn5+fr6+vz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAtABQAAAj/AP8J/BegoMGDCBMqXBhg4MCCriJKnEixosWLrgo+xMhx4h86eBh1jMiqIcGRrvzEkZPn1MQ+KKi40YLSVMMArXLq3LnTC5k0Y+B8yhmIAQs2bbLwXNqKVSlOBZuymkq16tQLU7CYOdMFUiMIJ9CsAWPHqtmppCwVZLWqrdu3bvlU2GHlCpYvFEpIURMmhCm4gNuOmlSwrarDiBMjPlQgRZQqVpgkKSPGAyfFmBGDklRQVSpUoEOLFn2JQ4MlUB5byfBotGvRniIV/Gyqtu3buE0NEEDEyZMmIHILtx27IKpSpJIrX858joEDQo4gUVLkDfPryzfJDmBqlKjv4MOH2r+jgEQOHzhUBDEyZIv49+A1KSpIShSo+/jz4we0oMQMGzF8sIEDOvwABAb6JXhfJokUNAoonkQo4YQRLnKDCS3IAEMHnIQyAgI05DABhSRGiAkiBYHSySYstugii1zw0IILL1jgSIt7aBCBCC/2uIkmkxhSECeaZGLkkUga2UMNK6wgQSFJRimlkZMgIiRBmFRCSSVcdullHQQ8kIAeXnaJZJldUhJJIoSYFEAkisQp55x01mnnnVYOMohJBAVgCCF6Biqonn8OauihegoiiEYO9cnQo5Ai5FBAADs=',
"btnSave":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC4AAAAUCAMAAADFhv/OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAIDBAMDBgMDhwMEBAQDhwUFBQUFhwUGBwEDigMDigIECgIEiwMECgMEiwMFCwQDiAQECAQEiQUEiQQECgQEiwUFCgUFCwUFiwYFiwYGiAaWqOYHiAcHiQQFDAUFjAUGDAYGDAYGjAYGDQYGjQcGjQcHDQcHjQcHjgcdAAcICQgHjQgHjggIDggIjwkIjgkIjwkJDgkJDwkJD/oJjgoJj/sLjAoKDwoKD/oKjwsKjwsKj/sLDwsLD/sLjwsLj/wLj/ysrKzMzMz8/PwMDQwMjQ0tLS2NjY2tra3NzcwMjgwMD/wNDg0Njw0ODw4ODg4uLi5OTk5ebk5ubm5+fn6Ojo6enp6+vr7Ozs7e3t7u/t7+/v4ODw4Ojw8PDw8fHx8/Pz9PT09fX19vb29/f38Pj/+Pj4+fn5+vr6/Pz8/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfr7zJgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAFpSURBVDhPlZNrUwFRGIBVJGldFosuNsVqY4mEaimUS5uE3JLWPbb+/1e9i+qcaZrR8+3M88x75sycVzEF2KWQS4UcfywFy8r5kjFMlNjfeSLB8xfRcDAY4LweBrt2ADn7jsMLp4tmSNvtqJP6TRZyCYMXTub58NWxasNU7wlyaYJxLnCLuq33UZjqliCfTMYoUeFoPrtd0DEUpsRHyMdvI5SwIL9Pru+1LgpTrSLkb6MBSlBwLeo7jdOEqVk+6vdQAtdXh/u0Q6/Tapw0iamGnA+6HRQuHo+F/JyPcTtpK4mpeh7yXkdE8V7GQmpgY5u2WoyYquUg74otFA/MViuUhYddi8VsxFQ1C7n43EBhzvycWrn30j4mzIQBNfVSBvJmvYbiDnFbK5HIze06QWyqUFPKQj5lq5Vy5YedAxtFUSaSNBoMqrXKtysXc+nZjyzm/wI12UwqJeewHpl0CgE/fYlkcr4e/1q+T12HLuCJR4bvAAAAAElFTkSuQmCC',
"btnOK":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC8AAAAWCAYAAABQUsXJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAgVJREFUWEfdl0urQVEUx93Bnd4PcL/lnXlMFMmAiZGUx4SBlDLwKJFHXhERoSiSkMhAKWld/1Vnd06329U+k3PuqT/rbNZev7VaZ7WPxfKfrq+BhYyqX+usAJOBLxXjm0gEi4/HwzQCrwb+fr+TWSTgYdxuN9OJE8DH9XrVrcvlQtvtls7ns+69XuER8Agsq8PhQLFYjGw2G1mtVlY4HKbNZsN7DodDXut0Ony/2+3I5/ORw+GgwWAgHVfAn04nkpUCns/naTabUbPZJJfLRX6/n47HIwMCvtVq0X6/p0AgwIkiGdmY8BPwqJ6MVqsVgyUSCY1/vV4XwL1ej22sBYNBYcvEU/sIePSqjLrdLsOUy2WN/3w+5/VMJsMVhu3xePjb6XTScrmUiqdmFPDr9Zpk1G63GahYLGr8J5MJr6fTaW4j5VmIx+Nso9Vk4ql9BPxisSAZjcdj7t9oNKrxLxQKDFkqlahWq7GdSqX4P6FQiO8rlYpUTIVTwE+nU5JVJBJhmGQyyVXO5XLcGl6vl5AcWgq/IyHEQKth0rjdbhqNRtJxBTw2kRWmCRKw2+2iPTBRMF2wJ1oK8NlsVsRQt49sXAHf7/dJr1BRTBQ8oHr3esVfwCOg2cTwzxPwO4xGo2Ea/ThVVqtVMos08M/qfygHfUwHo0ph/PONyoivgs8if/6bV+5vVrsE+rT9pU4AAAAASUVORK5CYII=',
"btnClose":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABMZJREFUSEu1lXtQlFUYxg+jIIXoBMw04vpH2i6sOoIkDgTeYBAFC2uhsBKScNcJqqGRSwiKEitXEa8tStSMOYOQkaloIFPCtGDo4AUQBANUZIGNm6i7sDy956yidvurvtlnzvu9531+z5z9vtm12BXoBVuryczG0oqNjBrFOtVqErOxsmTTabW1tmTiAn1gIQpYgJnGLdj4OJjRNMYM4+PswZiJ3Tea2LBxlN0zjhFjsljvEZPFrvTG6OgoxsbGJlZe/1cK91sBlrTKG0MXtejS5EB/rBD9pCHSSMmXeFBSCMO3hTCSRo//SY/6Bpq5T7pH80PFZr++qFDw+s+dQrjPUrDtq5dMhPTQRl9+NgZIw4ezcZ/0sCDnH2UoyBl5SDMjpCES93E/5zwOCVvuBZYW8OQkui+y0KfJQr8mE8P5mdBsjkXw26oJaWJjYSzIQn5s3LN9mhuiee7rI4buYNZEyPqlHmBqChmsqcKt3FTc3Z2KnrxU6PfswODeHVC8pYTJZMI4PWEuHqiJifnb/gB5uI/7u4hzO/dz6E8fx3uei8AyVnuhv/oc2tPicUsdjy5Sz854/J4ejwPR0QLMXwIexld+z18Ufs8VErpJzPXRvI58Xeo4dBKrXZ2A3tKjeNfdFSzd3wN9FafQHKdEW7wKHQlK3PlMCV2iEoPJKhxQKQXYYDDAaDROrLzmAfuVGzGQpEQ3zd8mXzv5OaclToW73xxGqIucvi5fd9w9WYL6SAXqw9eg4f1ANJNuRgSiN0qBvqhg7AsPE0Hd3d3Q6XRCPGAv9Xs/5DMKtG0w+66FB6I+bA0uE689PxfBzrPBUjzlaNifjWNSO5QtdEQF6bzbDNS+MgPXFkxDIylz5QrxHJ4O4aEZ1G+gfS4tzXMf9592dUSx9AVoYyLhN20KhXg442peOo5IrPHd7Odxcs5zKH/ZGuel1rgsnYRMX28R0N7eic7OJ+ro6KTTKZHh4y3mfqL5H+dYC/9x4hydNQXV0WHwtZn06CQHslAkm4bv59qibJ4tKufboHqBDTJWLRMBLS2taG01KyRUiRs3zDVfRRDNVdH8OfJxfylxiomn/TQCftOtwLZ5yXH90C6ULnRA2WIHVHja47yXPWqW2omAhsYmNDWZxQMyg3wEuPFRv5H6/F67xE74KjzsBeeEmwPqElXwd7Cmn5VX5Wg9sgdnfGahcpUE1YES1AZJcOnNmcgKXSkAj8Xvm99xRPa6v/YvvjETta9JUBUgQaW/BOX+L6F+ZwxenzkVbIv3XHSUHESVwhk165xQF+aEyx/I0LBJhuaPZGiLkf6rWj+R4nqUDFdVMtRHyFC33gla4mg3LMbFfdsQNv9FOsmyebhzQoNfI91Qt9ENlzYtRFOCC1qSXNCR7YLf0l1wM80FrSnmHt9riHXF1RjXZ+orH7uiPnoRrmz2FRzO4yGcz75WeGPk9FfoLdqKntIU9P6QAv2pbeg/m4z+ymQMVpFqkzB8KRFDF5Iw+EsyBn6mvXLqP1Xrz2yF/qxa+AWHeJzL+Wx3gDuKQ5fg0Fp3JCyXYouPFNtXO0GtkCMjRI70YLmo1WvlSAtyRuoaZ7G/1V/2TJ3kJ0Wir1mcw3mcy/nmf73/4bqQlzr1MfYPNcKdTI8iX3wAAAAASUVORK5CYII=',
"btnMin":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABHtJREFUSEu1lXlQlGUcxx+PGM0jO8WybMILddnFpnTAtDSnpqZj0tGZnI6xEq0YrzxQIWkByxQQMQSVAIHFRUUOFS8OWUDQRZCFZV1CXOISnClvOfbT82zWTH/pH/nOfPd53t/z+32+7/udnXn7zI7Kwm3wY8Jt8FDhNmiw6DdgoOjTt7/o26+/kD/igS5nr3A6ewS9PcJ5947ounlDdN24Jq63NAq3IcOEmDXnE7q7u+np6XkoUnwx/cMFlF7qYG/5ZVLPOkg1N2OsaMVY1cbBqg4OVXeQWd1JtkWq9io5NZ3kqPWesuV9luUqmRc6XP3pF9rYd74VQ0ULRfUdKL6Y9v7H/5vJgcor/zE5bb+C4guf9+Y/NBP1JoovprwzD9PFdnad/o09RQ0kljaSVOYg5VyLjK4FY2WbjO4KRhmHUUaXLqMzSqXL+FQtXdWr2jFUtpMiY04pb2bvGYeLc6quHcUXk2d/RL61le35dewosBFTYCdOmu0ubiShtImk8haSpWGKuZXUirZ7anetKWalVtd5Ylkz8aUO15ya31lYT66lDcUXk974gKMXmvnxcDWbj1jYkltL+HErkXl2ovLr2VHYQEzRJWKLL0s5iFMqaSK2xOG6jzU18os8j5Z9qn/bKRsRJ+rYeqyWjIomFF+Mfu1djGUNrEwtY5WhnDX7zKzbX8H6jCqCsqoJzrEQcqSGsFwrYcfq2HTMxqbjNsKk1Loptw790VqCD9cQlG0hMKNSzp9nrdFMosmO4ouBnjNYlWJixOIERvon8sKyZDy+S2Ps2nTe9Atlzny/B9LsJaFoAjMZJ+c8VqYxankyX+4qQPHFI+Om821CIY9+FsuQhbsY5hfP098k4b7MwJx5i+jt7cXpdN5Xc+XDPB9wkBHLUnlGzj++OJ4F0SdRfOE2fgZLk0wMXbiHJ7/6leFfJ8rGNJ5bf9BlYrfXU19/f82dv4iRodmMDJRGK9Jwl0afxuSh+GKA5+usNpQw3C8B9yUqLgOj1h7gxZAcl0ltrRWr9f5SJi9FnMQjNIdRAQdkXAa+2JmP4ouh2rcIkiZjlhvxWJ7GGPnK46XBBDkwc+XPqOEH0cw14XjuKWJi5Ek89YcZuy6DJfHFKL4Y4TOPrfuL8QnOQRNwCK/gI3hvPYV3XAneqefQZZ1He7waTb6VicU2JpTa8DwrVWZjYpHNVdedsOCdWYl3mpmXd5vQReSh0x9l6d4yFF9MX7jhb5OIQt6OKMA3Uir2DD7JZnzl33dK3kVeNTXwirkRncWBrqYJL+vv6Gqb0FU7XHV1PjXfztScaqbJB/ONk/OSt3pfJYrvMomt6SDmUidRzX+QXNdGvNzHyv22zpvo/7yN763bjO7qwr2ni6d6uxnk7MZNapDcPyFrz969w2jZ43vtFj90XndxFE9xXSaen2/gH032j0Djp0frH4Z2xWa8A8LRbYhEG7QN3cYoNPrtaEKkQqOZFBKNlz4K7feReAWG4xWwBe2qn9D4hzLJb+O/TMV2ffiW5lrlZ/DhXX8BmUnqCVosKVcAAAAASUVORK5CYII=',
"btnMax":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABERJREFUSEu1lQ9MlGUcxx/UmBqRWy1iBi0NFeE4IBMGAVZjbbX+LAqbzdpoglYIlvw5SSwk/v8RiBk5To4/h5z8BwEPkAMhhAPiBO84OP6GcQdSyUToDvj2PK+DDWeDrflu3/f3Pu/v+X2+v+d533evkWdqOYxNnibGJqbE+EkTsnHzFkKIETHauIls2LCJ0BMdr3FgiWBxgSwtUf0zTwz3Z8nS4iLR35uhukvIm16HYTAYsLCw8FjE+MT9g0/ROjyFnPZRiOVjEHfexuWOCRQptChR6FDSM4WKW3dwRck0jSrVNCpUf3KRid2rpPnynjsoU0yimNax+oLOcTRqJsH45LX3Dj1WE8YnLu8e/E+TU/GZ+Oig37oURucur6SwU7uyEsYnTm97o7lfhwtNg8i8PgRR6wiy239Hrnycg+v1eu6ZrSU2N79rAnm0LofWi1qHca1vAoxPHD0/RINqAmkNfUiXqXFeNsCZCVuGOZP1vhRsbvaNUVxsGUFm8xAymgZQc/MPMD6xff19VN+8jZgrPYir6kVCjRJJUjVSr6lXmXz8ydFHbttyE8wkXTZI6/qRXKtG0lUliumLxPjkZbd3IGkbwrfiNgTltyOkoBOniroRXtLNQbVaLXQ6HXcdK1UhlgJipP2Io408nI+ovIXwUgXCirshkHRARFfD+GSLtQeC8pphfjQLL/iLYBmYC6ugAtgILsPLe7WJW4wUbnF1cI+vh1tsHbweasLxTDlsBYXYHSzBDso5klEPxidP7HbH11mN2Pp5Bp7yuYBtfkKYHc+BxclLnMno6BjGxsZo174cdJW8fVflrUKLaJNimPvn4llfIQ6lXQXjE+M9HgjIboapTyaeOXIRZl+KsD2kAJaR5RxwYEADjUbDxUeJ5ZhYE1YRZdgZXASLADG2HxPhcHotGJ9stj6A4PxfYeaXhedpwjIwHy9GVGBHcjVnolSqoFKtLWayN7Yae06X0e0uxEvHxfD5RQbGJ6b8txBOTaxOSLDzxCVYCYqxK1EK658b8EZoEtfheuQZlAB+WgN40TWwDa+A9ckiHBPSHaJ8Yu7ijcTCFuyjCZ6gFHY/VMHhfBMc8uRwKO2CvbQXdg0q2FxXY29bH6zlDyIb28v68EpdL/ZVKuAk6YKT8AacU2XYH1XL8QJzWsH4xN3nO87ENboWbilNcD0ng3OOHE7lCjjXq+HUPIhXO0Zg3zMGvnIcfBUVjWy8v3MELvTLdmnUwKNKCQ+JAgeE8gccyguW/AbG50yiuqeRPjSFc+N/I3RyBgm6GQT/NQvXe/dhNTcHC4Mezy3osW3RgK1LBhhTscjGZjRnOT+PXbNzcLs7y9UzDuMx7oqJo38ylsXzOwu7gCjwg+PBFySCfzoZ9t+ngBeRBl7kT+D9SBVJr8+mgU/vszw/LAn2IXTuN9HgfxUJ2y/OwOaz0BWRlC6tyVo/vv+b/xcAf9f/4T3A6wAAAABJRU5ErkJggg==',
"info":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhpJREFUKFM1kd1Lk3EUxx/pQijqD/C+29qFBt7kosILQzFKijBKqSwpp6IVlClWhgjzLV2aMTOn5dRe1AUuc2K+ZeJcMVm2R1eTfC2VMt3z+31amh84FwfO93w55xui/Oezb1E39mVJv3NHqHFuOaBIQpRd27cpSyvr6bvDQrsj94SNbs0qvSPf9K0On1ppm8HUtcobt8ZLp0bR6zXyrXPU2HxqvW1cvyGY+PpD12CfVAtfzJHTJrnVruGZFTj9gqxWQUYzXKlborhFVe2DkzqltMltuFw9RZpVcvGZ5FKTpMQRoLBL43ywT26EpHpJQsk02Q9cBqWmw0tM8QIJZsHZRklKs6DHq2EbF5x5KklskJx8Iomv+kOO2Y2Sfn+UqNI1IsokR2ol51oCeOYFrhnJaavgeAPE10HsI8mx2yMoqSUfCDeusrcc9lXDqX+CBYFnUZDZKTgRvCH6seTgQ0Fc3hBKabObiHvfCa+SHAhaZ9g1Jn9KppYlhYOC5A7Yb5ZEli2TWRl0uGnqNxzOd6I3B4ixQn6/wL8imf0NtW5J2ls4ZBFE3XGTdNdhUN67/LobpkE1tnicxPZ1cgcEw9Man+Y1LB7Jtd4AR01eUo19amPHR91GFpZXY/rs8j41umA4+Bk/OY4VjMO/uGqbJc7o5ELROzWvomczuC26h7y6lAK74XrVAAm59mB1klXRx3PHBJY21+bmIH8BLUeFBNafPYwAAAAASUVORK5CYII=',
"help":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhVJREFUKFM1kU9Ik3Ecxl/pIBTR3XvX2sECL7mo8GAoRgw6SP8OHSSbRFb0B8WyjGpumi3N0LRZ6bSotkBFZzp1M3NaTVD36sRaDf9Mo6nv7/19GpofeG7f53n48iQp/5kILxhGp2LGnTuSLdFlTZEkKbu2b1OWVtYLdqckd6ftSRnZulV6h2eNbZ6wanf/oqY7zushQZNPYO1Yo6QlSq07rDrc48YNw+TsoqGpY1q99zbKw06Bf1onEpP8TMgbEhS7dPIbYpS3qmrH4LRBsTUHzedrZrjQImn0CxbjEs+UwDcj0HRwBjROv5CYrD8ofDJmVmpdITLL5zHV61xzC2yfNPLadOz9GnFN4h4XnGiU5FSvcrMuiFLwaIR02xqpFZKj9ZKTzYLWb4LIimRpVVLWI8hpgKxnkuO3hlHyrJ9JtcTZWwn7ayC3TTCxIJmN6TzoT6Q7JRnPJYee6mQX+1BsziD77kZIrZYcTFTnt0s6E493hXXKBiRnXXCgTpJWsczFx4mGG/Z+85GSAMY6jcwWKPJK/BGdQFRS/x3MXXDYoZN+O8iZUo9Z8Y/NGa7bB9Ws8nFyP6xT6tcJzutMLuk4JiRXejWO2UPkWbzqS9dXw8YWjnejxsJKr5pxZ4hTr+Yo7ftD5Ze/XHb/JtsS4Nz9PrW4qmdzuC26fSHDR6/K1eoBTEXtG7pU5eWNZxLH+7HN5AT/AFV8jI8kgcGCAAAAAElFTkSuQmCC',
"alliance":		imP + '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',
"alliance_gs":	imP + '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',
"mercado":		imP + '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',
"mercado_gs":	imP + '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',
"militar":		imP + 'R0lGODlhRgBkAPcAAAAAAP///8zMzPj4+Pb29u/v7+7w7+bm5t7e3rXG0xQxQqe7xZ6yu5+tsnewwlprcHSMkUtaXDGAhpWhokZHR/X29uPk5N7f346XljNoW0dPTO3v7uXn5s3PzsvNzGqHbt/h3/3+/fb39vX29e3u7enq6eXm5dTV1L/Av5qbmk9bToeahDJSK5WrivT286rNmE1rN2uDWsrbvtTdzXecV9jky+nv48bIxOLk4MzOyoqLie/w7rS1s4GGepmsfMbLvvf59OPq17i8sefr4KmwnKezjmBmVM/UxczPxtrd1O3w5+Tn3ru8uebn5Nvc2Xh7cNTYya6wqVhbT8vOwuHj297g2PHy7tHSzmh0QMDGq7W5qJaZjDEzKYuPe3FzZKSmmNDRyiUmHuHj0mhpXvLz6FRVRoqLa5qae7a2nEFBOd7eysTEtvv769fXzqiopv39+/b29Ozs6v///vn5+PX19PPz8vLy8e3t7OTk493d3M3NzMrKyXJxSKCfgtbVuM/Ou2hlR5SRdvPx3Pr58Ix/KbWraJaQYk9NP+3JApF8Co99FZmFF3ttFvfcSc+6QaaebYV/WXNuUaqmjuzDANi2BPHNDePBDN27DNGyC/rVDuzJDurGDpqDC6CIDJyFDMKmEJaADYt4GKuWKL6oNZqILop9PZSHSbOqfry0isW9lGBcSNLKpZl+BK6QDItzClBLNdDGmufcr9/VqriwkIFoCLqlVkxEJ11VOfDktW1WCnJdGychDllPLaCOVsm1d2hbNndYCGZPF4RtNnhlNkY7IDwwFaaHQn9uRl5BBpBkD1lCFXFZKxIPCa91D6RtDpxoDYZbEGVIEn9ZF3RSFaN0H3xeKWBJIJRyMoRlLWhQJVdEIKN+PrWOSHFLDZlrHIVcGHlUFnxWF3FOFVE4EN+dL8OLLLOBK6l9M6F3MZxzL6R5Mo9qLZt4PdamVcebUOSxXPW/ZapKEJxeNf39/fv7+/f39+fn5+Xl5djY2NfX19LS0llZWVVVVVNTU1BQUP///yH5BAEAAP8ALAAAAABGAGQAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2GOlKgEIDPnj039hDgE8AjRc0UAggEWDpvHj16T5o2XRqgAAqjLXXoG7CU3oCvYAf0CwuW3lICKHSkTIEgAL0hh2zd6pLERh2wY8mGNRtAn1qSOtrO+zqEWLBx44rRxau3cVMBf0HyaBq2wg9DvJbxIiKCcWPHQz7EoNFRh70AXzuHHRKFyJQldOjYEPv5MxAIoh/u2827N28ddLwOILOlSmMyXoxsWUG7tt4zrrIk8U29N4Hr2LMTKHAgy5YdX9GE//FCR2+BNMhKtaDHT7jzAfW0uGrVKwQBAQi0Xx+h/7oYO9kVUMAcXnDxx1dChCHFXWARQAceZSAjDAo8pMHDhTc4UcAIjREgGiOJtEHPffllt0MRTWAnoICSqEHCD1DEYc8cdAQSRiADDNKFBCoUAN8ISXzhBg9dFKOMEBdoAAI+V9zABA9R7BFHBWGJEcMHurRiyADzoIXAigWQMMEHWgiYXRd1rKHLOY8cYUQPfWDzBAFWaJCBEXbQcQEKWhCxRQlHEENMFCP4UwEddmxwhxNREIVCCQSElwsrnHSiSBJcWWVPdlGswEMF263YwxqQBANNMrukYYQZxJhBhwhejP+Hw5NXEFFGFBsowYQQLRTgTwEGGIBDEdc8U8QFHfCAwh31QCLKIp1EawoQXNrDhD0CNuEDFRuAKSAxtwRyxjCpcnHLE1wI8ZU/XmgRhRQ/2BNILVoYsMEGJcRggD8GUCHJNc4044w3M5QAggdR/CAMIaJU2gknWYDXlwD2rEFIImusiMDGefQCyQkILPFDCvEgo8EWavyRwh9Z/DAGF0bk0ccyT+SBgBtbGIEABQhEkozAzgRtCgJ54ONBF6RY40ginXjSCSEfrJAFPVH0Akq0j2ys9cZitKHPYAOsMc4vagwiyBiH6BAFFE9Q0AMCawBwSB5I2KJMGVVogIAkyTz/E3TQz2SNwBSlkMKMI4u4cjUhNHzgwyyEROs0KfhsnMLll5smHBlGSDLIAEuooIEXRETxgAQQpLBFGl2oDkwuY6TARQpmeOP3385AM8YTkIxSigKOjEILKKw84gMNhDjctCeK5ITUHgJAj8Ig1IbNBREDzKFDBhn0MUMHFCjQgwAoCLFHDpHQEgxSFAggSTm2B/wMOMFkQ4wwjazgQCGNKNJJKKgwhSui1bRoXc0QAkigAlGghCdIAg4DcEIW7lKPL3DvCAnsAQC24AEBdPAHtsgFMXQgAArsoQ/lMMczktGNYozDHO5oxygcgYpV8E94vSgEIa62PAOCQhFCUGAC/1EAhTGUQQxfqQd8nPCFMIQBCgJYAxe4EIUOJnAPkeAFF1rggfahEH7iKAYzlHGObbjjFKjARSxgUQhfQKIWoygGtJxWQFC4whMIFKI9eBCGMrAhLHaIQoXSgMEcROEGV3GDHsj3hSy0gIvtO0M5UlgOUkCiGuaYBSxiscZYyCIWq6hFIwixC1JwwhNOcxonKsUIITKBDYdQwAPI0KAOuAENZfjCIhN4g0iMgxg/QMIhxnEIIzxhDxTIgSTJQY1yGAMWx7gGLHxRilUE4pOxmIUoxWjKStERFD8kghAFIIg0yBKQQ/qDFoQYhWHkQhelEIIXchENLqzgBiWM3hnMYf+OcmTjFKeQhS+DAYlbHAOUsoBjGABAikWgsmmuEIXvssATfOjDHm/QQh9d8BV6TOEJo7pBPkaKAmIgIximkMQWohEMZrDgBSOlwEjzsQZDqGMYv+hFKmBhCFk84hg9xYUsUoEKWXiBYZVKxCKCZ4hZHAEfUBVA9rrghTL8oXpfeIIRfjDTfAhBG8MgxhncYFKXwuAFJ8iHTEea1jWg4hTHEMYjYqHGofaiGrBQoycLMQpWJEIUjigEGoigD6hClQlyGMQXznCGNnylDltwoRfSioQVRMEMkOhBErRQCluEQQU9IEJMuzrSNaDBEKjIhjBOQddhIGMYsJCFbHFRCFH/hGIUhfCDEvKAFKhuTB+ocVB5vpIEVSSjGlPYGBGM6QSt5eALH6DBCy5wgY3xbGta08IqUGsNU8AiFadYhV49GYtHmGIVgqAWAXSiNX20pTE3EAIX0jCDjQkBHPKYQQ6aiwAodEoGTrDZzrCL3TPIAhKo0EYq9PpJ2XqyBvD5CgHcgILKIQA/qNHLrsqQhidUQQdhQEwaiOGFPDjBC0kAgROqa10CY9cJgYAmJ2csW1kIgqNkiUIULEwxsJGFB0JAwhSOUIUyMGMXu0CGMsbwhR7sQcBbu66LOdZfSNC1wbH4AwrcUxYeuMG99uhxY3iAgAOY2QKAsEYxfmEILSwn/x8H4AAHzExnf9D5zng+QBOSIIYGqwEPeWAClzuKAjf0JMwFGPQA6MGEJNDZBELoQQ+ikAQqIAAEea7zPTKd6SZUwQ9iaMIBLMCEDIdlHoU+NAoSrRdUb/rOPhE1p+9s51nb+gD32HKrBZCCixbgBj3gRz+GTex+UMAfyE62spfN7GY7+9kUEHax+8EPDLjhSwXQxz18XJZHBevb4A63uPc17nKLuwQ3UPQACo3ti3I7iTewgLnnHSx+0dsAS6ACuLPwhC6kWy/10PEFBFQ5Uw8AB6L4xCge8YMN3Hvc9qb3GQBBBBwEawI9uGeHhoStegTF1HDoAyYqUYlLLHwN/f9JOXb6oXLsUIEXytAGIL5AAiEkAAP40As9CqCTAmAHuGCZQisusYlNaKISlvjEI7QAoJZnh+Utd4EZtKENa1hDG7/oQQImAAIlksUeSClAPa4jgAyXwBiUKDomMLGJSmgi6cZAAxX443Soa2cJSbjOFKpudauPQwoTeEIRDKAXfaQgH9nJOT1EcIpPWKLolrgE0TVh9KSTQhJUqEPL7Z4dMwjjDEeIRN/7rgzAM8AWfNCCFRp0lU0pJQAEQMA81tCKtBddE5Qv+u3fjglSzIIKc6CK8APAj+EHoAbYQEc6sEH10VtjHE9YQANgrg0+HGHRPEfB66mCDyeQghK4h/z/43VPft43TwTGJ/7wQwCJdKQDHepARzWab3ViMCABT1CG320BYQT0mi9UkQ99AAqUQHKUt3aWkHsHmICZgAnIUAw9UALGV3zClwXJhw7wh4HqUA1Xd3VjoArjYHXaQAzcYAozcBUHYHwjAAawkHCXQHKbsHZGp3uY8IKZkAvj8A3i4AVOMHwUuBRKIAzr8H7wF3/xlw4cqA3joH/1hw3csA180ANMQAfppw/0EAjSQAuO13aXkIAz2IWZ0ArjEA7fAA3goAonIHw/6AKGsA7Kl4EaGIfrkA18V3XcsAvL0A7DsAVAkH724ASQAA2n4gmfUINup3uW0IDRIA7SMA3h/yAN3XALQsAXFDgPRbAO14CBGqgO8ReH6aAO11AMI8gO3KANxtAO7cAHLjB8LpAFvXANfdM3zSAwnWAJXth2mkAL0fAN4TANvigNwfAFFbAUFNgG2MCJcViE8HcOnPh+1SAMVNcOMSSN7dAHIUAVZPcKygAMtxMws9gMrcAJI0dyiZCD0tCLvggOwuAEdAd1SoAGw3CM5/CJnUiPGpgOy+AOxFAMxuAO7LAM+XgGIoAdCcQDPcADTxAN0AA43ugM3YAMrbAJnzAO4sCL4JCO4TAMPKBA7eNBHnAG1ZAN8vh+72eE6nAOy2AM23ANtzCC2oAN6+AOZiBESzEFZpAKtf9QDdHQDckQMAwJDYRQCtTgDYwYDuBwlBd5DEkgB8RIFSGACu3wDthQDNVwDvOofJx4DuuwDNzADOzwRutADOuADe7QB8InINBBCYjQCuQgDUkmP+uQUvlwBfATDY9olL2YkWAALOT2bafQDvDADcWwC8WwDOlwlehwDtbQDuxQDNwQQ+yQDWPpDmfgLQXQCaxACZjgCswEAPN1DLPwBz6CA5JgDt5gl0bpiEd5DPjwbRG3AWgAmIIpRsywDNiQiefwjPAQle/ADoxpDZPZB90CJoQgDNyABm5gDtBwCKrDA1+BAFEACIRQl0dplOAAib+QCn5Qb99WALEZmMXABdn/cA2oiA3WEIruAA/w8A7uwAvbwA7AuQ7tUJneQgSQAAUb0AQ30AVmgFkHEnDL8AulUJficJ1HKQ3iMA2f4AglsAH+gC8W8AOQkJ7ccAuvcJvcwA58AAjZkA2yCQktYATCEJnrUA3cUCbecgOSACZ4IC69cAZRgAL2CQZeUA7UsIjpeJTdkAuJmANXQAG1Yga/YJvuwA19AAlmYASvUAQyUATs+Q7b0AVp4QXvqQ2R0AVIQARHsAH3sCIlgC0CwgRogACu+AiwEAlRUAUj4AXmcKM52g3WkAZcAAyf4BTtQQzp4DG3sA7W0AcvMARHwAf1AAdQGUOmEAU64AY9YAzc/9ACJVAARPAAZrAFXmCZYQoIkBAIvdALhtAFVzAAd8CmN2qU4qANaRABDwABD4ACXzEWvMAHy/ANJVoMWABhYjB4WQAJqNgOUPgF+RAI21ALM1AAXwAJaXAN2TABlloAQpBVgLAMkCAFW7AHPnIF5iANyhANxKABD5CqC8AAXxAHrToAW7ABa8AHtiAEgOADQTAAFTAHQKACY8Ce7rAN1cALeLAF3FALOAAFtsCntqAKT1AAClEMvBAJY3AD+kBmSNAKrQAMt/AAT4ABDLAAE8AETkB4zTEAQSAJNGADRWADc/AVQQAFOsAD1CgMZQAD/8CP3DAQxGALDjEGvzAQA++AACjwBZ8wCZNgCgkAAQzQADegsZ4xAEpQA0fgAiMLFi8gAyuwBdLoDo/wD1zwD1jwC1igEXEQBcagcIWAARiwB6unF3nxGQRgBy/gBisQCe8gjaYQEhugBYXwCMi5B/bgdWRRtmAxdgWAsymgA0XwAj4QQ+5wDCMxBwaAD17WKPhgJkrEHl4RKvagD1dxOTxwAnEQBAIxDMuQtSQxDxUwuYXmBm4gSCiAAhRwulHgBpjjBkxwUQQwDy8xIn2rD+RzIWMgSMoiAPnwJbFrE7QrIGDqcwRQDzdxvMibvMq7vMzbvM77vNAbvdI7vQgREAA7',
"militar_gs":	imP + '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',
"militar2":		imP + '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',
"militar2_gs":	imP + 'R0lGODlhRgBkAOdsAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAPwALAAAAABGAGQAAAj+APkJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2Gijz5Yobt3LlV57xhY0YLE0E1MD0xs+fv379+/fbtwwMVqtN6x/TsmaOHpaNfid6Vc4evrFl8U87iy7p1j1tCH7kg4fLFICZv/+xNQvQHnNqyac2+wzPHrds/iJgp6lilC5YsV+jyc4S3X9lEk/54+4vWbDxMvPQUNryn1D7FGqdg4cIlSxYsWK6sWXWMHb57oY7F49wZXzpHlpBhWkP6Txlf/ex5wkinihbXWbRweez6CZdMv2KVs8c78KQ0pnj+IVMz58+cNU1+vcO37x8ziNChi7lShTWX59LvZ9GvpUmUTN2VFQ8rtiBDzSplrPGHIjhwZ9Y/54ihByrDtEJHfBjao6GG9fxRxWNd5Mfac/tFJ4UauEQxTVn3tMheFfuUxYopBVKDySqyDILDOWbZA44rqEBCxyPBiNLJhkgmec8vWHwYXXT5YZjFE52g0okV6KhzDTG40EILDl7iYgkryPBCjTfBYBIGB+uhc8wpsyDTiiSy2ILKL5iAk6SG7/T5jjdcVBEdf1o8N91rWlShBy6dPFLDH7T4gkw024DTBDjbRMOgKcgYaMofeqwRyimo0HJLMcWgApqdv7wCjJ/+sCKZiRT7YdFFa6vhJ110T+ihhn+4IPEMO+/EQ089U9RDTzyTvBDHM2U+IsotwyzTqTDABFNMJ5gEY0snt+xyCj57+vlLFc61xtpr67omXRVTqLEBACfggsgY7MCjLzxQ7GuKF5J4g0wphfxBBR20DBPMwsPQooYndaISzDChoAMrrO2s8YStWjxmaGvQtfYEKqg8AAASjCJRyr786vsOKLZQE8wzp9TByBB86EEtw7cU0ogtpnQyDDKocHPxn950E8oaXDzhXKFQdvxkr8VMAgAAUeCCCx0nHOPN10d87Q3ECz8Tih5jRDEGG48Us7AwvbTyCCShtCJMMbQAI/b+3l+vMsleajjdBbsev1ZFJ4wC8ADKk+CwAR3bgC22J6wEQw0uhWBSJiZorAGMwgsDA8wuvyg8jC+o8O0NJqwTQk0fOIzRxxpTPPFkdI3VgEYmiMQeRRRKRIEGIaxjgkPxfLAi3i+D0AiKLGaLUky2wQhj/du97PJI8cUz430o1HSywQOdIGJ+7VgU6twak6AhRhtiSKHFF1EQ4r33Q9w/iSmWr6IHL5hogheQYYtQ7KIVoLvexG7xClTg4n4QZEYowoGIE2yAGpM4QRQQQYfaOY0LkxiDEuzwhT58gQ5fkAImIHiE+1niedTIhB5kwQg+cAAUz3jEK0QBDOv14hf+wqheK3Rxi0ZE8H6rwOAJHrCtebEBFX2YXRP6MIk24AEPbSBEG7bYCSPer4Xes0R4gpEIOmCCD3EAQHBKIQpd9MJ6uqBFEKuHDGA8YidHTGIGmYiKJU7iHV/YgBUmsQYqdqIYynCFK5RxOTrY4ov3w4QsQNG8KzQhDrYYBB+CwYo7Jqx6v5gYMnTRiVCsYhVHlGD4qBCCVC0REe+gg8nKh4pw9AkVTWgCLt6xtUVA0nuYAIUpBmEJSTSPGqyQhCk8oYZb6OJtqPrFIzohiV9gQycRPEYmivEOV+CBZPPqwzv6YDJcoIoavPzBD5Cwhlh+IRG/ZIYYg8GIQTBCEvj+FCYfBiEFUQzjc7+4BSaQgANLBIMWyqHF/bCBjV/8jZvUwOARHiBOWT7AnH1ABDXogIQaVKEJ1OjjH6RxjWscoaTXeCEyTFFDRliCEXGQRBMkcYVCdCoYp8hEIwDAgUEggxb9WAUtpMFQhjJjH+6wxSTQGQ5cEKIRgCxnMWaHCg9KAaSlEIMYbFHSk5Y0mJzERByGkAY02pMXfECEL1oxCFpQwxQciIMsWEGN06yCqEXFxT/K8g5bbPMd1CgGNdpwBABorQ8brMITkHBVXNwCgJnoKkqb4QhesOKMcYiDF1iKiUwOJwRDkIW3+AeKaLBndTzBxteksVcWJbUT6Hz+RzFWEQcH0oGKTvvBVSeRCDysghuS+1o3riHWQXghDmmIAz0tAcBnhAEAQ1BeMEyBC7KURTm+EJs08HKWFpUjE7B9R1NxQY0vIIEOT5DCD/6wCmR0g29hE9s2JIHcsT6gCTniFCiQ4YUX+FQWq4jGPc5ij1X4QrXeYAZ3/+ILXIQivLKlghiU8ARHvld13ojv165BJlbwIQ1X8AIjoMAIyyIDFJUDBS0G/JdTIpgZ57CMWu5Bi2h44xqlQEVEbRGMNoSiGRgWm4a9wQ1cgIIRk6jvcfkQTGRwUqG+iJFa9kGLu3rjHDCWsVpw4Q1zeHkbfluFJFbRDW54+cxoNkf+E9JsDnCAoxwpFU4wJCFGVvy2HNyI8l/24YtV9ATL75DyWfg8jjSf48zlKAeb0bxmNoOj0LiwBSiCI7BnKNoc5PCFP/7Sjz5fwye+CDSnfXHpRZua0ac2R6JVvehy6Fkt/WCGJ6Rxjncggw/wmoKudV2FIUDh17+mghSoAOxiG/vYyE52sYeQ611PoQqTWIU3+kRrLZuFz+pgWTmcAY53sOzbLOsXuMc9bnUgQ9Bn6fO031Htv9yDGOVgGTemAQ5yg1vc42ZHvuxNjqOWxRlmrsc9Trlu1bZ20Mzghr7c4VBHOOIY3ra3vvD9bWcM4hG46Aa5t7GNsnCjyM4wR4H+aVHrewTl4PcYBnnNsQ0NsYO2UIhDKOKxpz1NYU/wYFQwRtmJV3RjT9hoBzu09nFz7OMdOnnHhlhbFnM8YnvTtEU9NGQLXvDCFKugR82TdPMkvSJcpnNyJ0qhJw5Fwx7TGIaXXXSOFb7jHhpiRmtfgUBdtEIUhQAXMr2FCUcofesb6vqGugEuOS5sYssIRic6MQ17tIMZ8ZAFJsxxFmlgAhtIwgZ74IGIYSjsF7rQxS5osT1Z8MITeBjGNGgOeMFr6BS/QODhDz+0YaDiFLYAhyz2uQoH2cMXnjiHhpxiD2/0wxmY0AUQheH5IPZ9pWsoRCvkxg6nWP/6VbB+P1D+4Yte6AJ0h6feMFA1C0jc5RmrKMvRdWKP6/8DG//AhSgS9jnRBWMXdeDDMOneifm/wv3YZ310hwzDMEe0dwulQwu6IAwEOAlOJgtmsTrS0B7Xh3mvQAs/FHtP1wq/IApr0AkBVTSZIAr/B4BOkX1OYQ6hIAq74DazBzfAEHvVAwyvMAm8EAyX0A1l4QuYcA4AaA/bEAoY2DCiIAqY8AiFUAy3ICmP0Ah0wAWFgApNYYIo+A/+sDSQ8Auo8oJw80m0UAiEEDN/oAblgHS4QA8mGA0GNDGYUAeYQAtKoDnMdwuDgAQbMCqQUA8m+A9V6A+YEAvKoAaPQAsEOHvVAzf+AcQInaIIX7AI0eAI2NAPAOgPSkM6SjgvD1ADy+B5wfAIwEAILxALnTAIaEiF1vcLVpAJ5DEHYvAIv4AMBlg6HsgGeMApivAHX0AIq/AOe2gOFNJDtyAKdVADhbAMobcLkPANaHACbEAHpLiHKFgKT/AGscAFXjAHc9AFmTN+C/NMdYAGVGQKoIAJdEAHa/AM93B9SAJ+oeMLvrAwrQAMonBCfxALwEBIzeAONdd1i1AGb/ANeAAAP7AG2NiK0lMMw3ALCkIHNigcdIAIUdAMSXI/v9AJTnZ4xWA9c2hHmQAMrvAIZRCSZaAHiVAKpWALtvBAYFQKc/CPf/AAL1D+A0hQBueRBW+IDPP4B3TgCCgGCrJzPBHkFP4ACbegLcgwPaIwR7/QC7cgBUigBV5Ak2tAkAR5HljwA6HAh04xDHOAA41QCmjwAmJZA1pQlU9QCHXABrjoCLIgC6agBGjQBEhwCeVgfX4yDI+wBk8nCszTQ8EQSq2gBCGAAzJJk+exBl5QBWqACYvgbeI2DXrgCXHgComAAy+ABFZwAuzkBWygDDrZB0oQB6zjCFqgBFwgBkiABvFwMfAgC7GQCTiAA3VQCLpwlMOgC5jwAy9gBSJUAz+wMVzQCMeQDs6wMi0DD8egBvxUCqC4ATiABycQAjXwAI1QD6VAB2ygBJn+EAu3oAzYgAY/IAZe8AoXEw+4cArAoAxKYAViYAXR1wp4Uwg1gAPrOQZjAIpSYAu15g6yEAoTBw/vcA1f4JWxwAY4EAY4YARiGQIA8AftUApsYAVoEAvf8A3Y8A3TwAUhuUsXYwzBgA3A0AZWUJpSEJN1UAdqgAMPgAMfpgWlEJqoJA1BuArq8A5Q8A7qYA6/AAVfqU5agAM/EJsv8AB/AAylIEKJcAtFdaGZ0AQ10JgXUz6hMAi/AAyxOQQvEAKgxQfzAgWyIAknkAhRIAa/sA/2wA6h8EDRcATREA3SgAs4cAkBpFhdMAc18AI4EAJ4oAiNYAVW0AjAYKFFpQz+UfAIrgCgfgIP5okHgwCIYoAHjdAGeco6P3ACu3kFc6AGWaAEdGBdpcANUgEjUXEP1MAHv8BRVYAEWdCVOBCmkcqbmXChS4oNf1AM5Hk03IAjvxAKoeAFWqAMePAH34ALTdAJbzAHhYAEJ7AFc9AJzsAddAkYPcIOinAMhCCTtlIIsRkCVmCScFkK3Vmh2OCdt3cJRwMrAJqbNZBCjdAOrnAFuLAHdTAJbNAHduAWr2Abi1AO0tojAzYYv+kFf3CnG1ADUVAKVkAHt/AHLyAFsTqupfAK6eAnCWEHTzAHv8kF3+AKagBF+VqlpXAEUOAM8IAP+9qv7tYMtFMKioD+BHvwBntgPHQADG0ZBlKgDDhbCg5hBxqKBIXwBotQRqVADfVQFtOAC32ADmaxHSjLGfEgcu9wCW4BCaVwAm0ADM8TB22gpNigsxBBHkjBD/YgDQbmDfYAD9OACAHCG+TCbqugCDCrB41wAkoQC7GgSbeQnpmAEf3wDkQxVOnAYn8RGN1lD38CfI5wV90wDQRhRmGAB2VkBxuBD++ADVWGStjQJ/YwYPsAI237DucgDcCHCZ4wVOuBEC+QBiCRHKHbZ6ckVO54BO54Sp7AOquAC7RmD/2gEFuguiJhpu/QDdLADL7gJWkgVJHCE9OmuzYBvH1iDn6iIfdwE9RbvdYTe73Ym73au73c273e+73gixABAQA7',
"misc":			imP + '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',
"misc_gs":		imP + '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',
"setup":		imP + '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',
"alliance35":	imP + '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',
"alliance35_gs":imP + 'R0lGODlhRgBDAPcAAAAAABAQEBgYGB0dHR4eHikpKTIyMjU1NTc3N0NDQ0REREpKSktLS05OTlBQUFFRUVJSUlNTU1RUVFVVVVZWVllZWVpaWlxcXF5eXl9fX2FhYWNjY2RkZGdnZ2lpaWpqamtra2xsbG1tbW9vb3JycnV1dXZ2dnl5eXx8fH5+foCAgIGBgYKCgoODg4SEhIWFhYeHh4mJiYqKio6Ojo+Pj5GRkZKSkpOTk5SUlJeXl5iYmJmZmZqampubm52dnZ6enqCgoKGhoaKioqOjo6Wlpaampqenp6ioqKqqqqysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcPDw8TExMXFxcbGxsfHx8jIyMnJycvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tzc3N7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19ff39/j4+Pn5+fv7+/39/f7+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABGAEMAAAj/AP8JHEiwoEGDK35wOTMHEKAjgO7MORNFx8GLGDNqvPjjjCNKICdNkiSphEiRICkh4mJxo8uXBme0gQRSEqSbOCFFyIlTEkhHXFbAHJpRxx1KNnnmfLRTaU+QbYQSnfpvxtFJTpU2zYpT5BmpVDWeOLHjCJk9j7jm3KqWEZspcKfwCHsQw9i7MpiQaaT2JtusjuDyGMxDLl2Cdk/IKLtjLJMrjnhGXtsX0lseKjJn5pGFj+ewLuwesRNpEqM1Mk4wWTP5pqNHsCFJipAUJ5smjG4qkvtBs2YeYvDg4TOIKBe7SMosiQJmTHMZMo7sufnIUSA4YK5EiaJg+5UxdRCp/5mh5cyfMTBU9PbdO7hwPkR3YJBxpf6VMnPcjLmi+oqdM2As950addjRwB11qJFdFEuUsMODIKT3wYQUtoeHG3iIscdQHWBwRBljnHGGGnbc0YYdislAAw04aMFFGXDssYgjDTjCyCKIFCLIHDAwwYQMJdigXoUT7uDGkW5wkQdMWnRwwhVnuAGHG2rIoUcdfyi2QhddREFDCRGAsIIaiDSAyJlnGiLIET7KsMEKMBDZ2xRITnEETHbY0eERaMgxZRtowAHHGmOtoMQWXQAxBAU1JNGEIWaieaYgMzy4ww0rkDAhBpx+YIMbZYQ6BRNxvFRHHqHJ8MUc+VG53xGKpf+QxBZRAJFGFXCoUcIbB97hq69y3KAdGmXAgMEHnXZKwhRaNKuFGC61IckeM3B6hBty1DFHGdrdRcMUtOIwBpdRrICDAiX+eocbTahxRxbGcirvvBgAUYaz0GoEiCR1RECAaFqoUcYPjY0VQhDgRrEDHLgm4UMSK7gwww06VKzDxDrIGwGnG3ccQQQkOKsFEBpxQUkgGhDwMaeKFcxpCDQMgUUXScwwLhxH3OCDD5i60EQUTRwBAxFRfGz00Ui3qEUQOGTEBSKLgGAACCUYoDK9GMAchBVXdFEEEnB0oUYSKdygsw9FFLEiDQ/EQMMCDCCNNAMMuLA0EDP0gNHTJSj/QLUBAUxQAghGZxDCCjQYscXMPvxwRxdwJBFC2T4occUWX3yBxaFKwE3356B/bgIND17RkkHm/aBACSsoQAAFOvwAAtUahHDDEENMgQXjOlTRxRhDcFB2EVLsrgUWViRxQwqehx76AjPAMMMSdhyxxEFXQDJDA2CqrFC5Pfwwwg1OKKFFGVzMTEMSSUDBvgVlK2GF8WTjsMMDC+SvPwP658/ACjP4wRXqsAg5/OAgZ1jEFSpgAANU4Adg2EMQonCFJuAgCl1gFhh21wUadKEKdwBeBGznhN1hAWJIIAOPFKCA/rlwASsIAhfa0IdFVOcHUShIGwCxCDC0LgI6AIMg/+CwBAWBYARbCIMWNni5KOAAcuPKwQhvUDwsXOEGMyDDg7iwAAQoIAIvlMAKjnAGHk5mEsspyBkgwYg6LOEGEPyDI67ABTig4QgrwMK9dIeFL/hACFyqwhFysIEQ+EAKx5McEpCwAypwIQIIeMAGSjA4qlHyBm0gRGtkc4Y7EeQKlHjEIeDAhTH4wRGLKMIZ5DCDGdDgC2CIJRi00IUbJKELUBhDEnRQgQzEwAmLuwEHyEAFKuxgBAiIJAfMhsUb9CAIPTDEJmVzh9MJpA2UgIQjECGIQkSmD1Gowx2KlYIvvAh9XXpiFcaVhBqA4AE3wIIWpBADE3BhBhx4gCQXkP8BDkQBRGMYAxrUsIRCOMURChlIG47iFDSAoURCG0IXwIC+LVjhBoBUgyC6UIMVaCAFJdSCE0KwgHwiYAFIGIQJEBCCKKjrDnbgwnSU4ogjcGEgZ2CoUu7jqyaYwAcUTZ8ViuCCMajhg1XQQQgscMjdKSEDySxAADQwiEFQ4QEhMMFL7wAGNWRlCdcTSBmxopQouCsOQXCBEULFhS34IANGOUISqpCEIYAgBUrY3UUzYIIAAIAAJhjEHExQgAdw4AsvRQMXatOTKHjyH2N1ikv/sIciPGALFC3DFpIQAxdAYQhQcN8KMpCE+SGvs2QgAAEKoIAZ6C8DK2jCH2Y7Wzv/XIGxN5EEFx57BkTgVjZX2MNs7xCEiZZhg13AQgw4ANrPaiAGV9Ar2ZgwBwIEQAAFgN4cdqCADAjBD7SlLCiVMondDuRpvy0veP/wBSNQdINY2IISnOCDEHDABCtIgRWOhzwfrGAOXCCAALQrWBM8IAMbeEN4/bBY8p7hgALxodw+poAGNCACG3ACRRe3uy1IAW06m58SDoUFJyx3BhaAHhe4oEULJHOpGrCwjBUwgQnf4LFt+ANZc6JbQSCCDUMIw3GTcIXjdUEJPphfF6zgRx8srgghaKELkEAFJKCYhRvgQAYe8AVJCWIMv4WEea8JiB3j5BFg6MNKkkDRKRQh/77G24IWtlAEJXxBCUXQwlBDMGUycMEEHFDAAyywgyiM4MBHkNQe0vDbR4B1IHPQKY/PYAdEFJcLYJCv/I7nLCv4AJjNKjGmqEAGGARaASPQIhE2oIAQZGAEkqpDHQ56hBwORNJn/kMdGmGEKGjueE5ApAk9XLnk6plsOzA1C2dABSJwIdALaNsNLLAER1i7DoZQiiQQkVCFZlMpi2iDI1xAAx90YXGhNiGw5bc4JxSBeYJ2AQwAnE9Uc2EHKUiBBYpgbUeo4TVKAYQOzkCQM3x7KZEYwyHyQAYL3IDJX+CwujdnBSdYAclbJvQgduACFyNgA1VtwoFNwAZrGwINkf9wShus+Y85yEbbddiDtSOWuCJYIbkm7HCJpfBuC9h0BzN4AAIKIABUz2EQTBhBEJrQbz3MVDJcgDBB7mBmnDhCDnRYhBCaAIMRMFUK58658dydAhhEYQYKGLpfCfCAERx9BiXQQiJCMoe08GTb3SbIHA6+FDPQgQ6NfBAOXIA4JsvZeBXHFAwswEIEBCAAqm37IJBwBCjkAAhAeILmNZ8GROSkmm0wSN2dwggvmB4GTWjCDhYZvRXcIK9biL0UlJCCByigAABAgAUgXwC2cwAGCsjB2jCP+c0/QRA4YclFqK4UOhSTCmZ4EBKaMH1jdj2eTrjC7DOQXesa4AGQN0D/AVJcghCgYG0rIn7mnwAEQTyC21e4iLQk83wqeCESYBACEohABeoToZU0sAIx4AMpwFojADiCxnsAYFhV0AIO2AJrkwZpAAQ0UHzt1wYzkBH7khN4QAXERwV4QAmEoAWr12xEsEhCkGwckD8KYAIGkHsK8HgBYAAriAIP+IA0sAiUQIHpl3lF8FgH0QaLEAhE2IHqBwRUQAdEKAeq1wRV1n9E0AStFGgw8IIVoAB/BQJsAANZZQJe6IAm0AKah34V2AIuoBEe6IHE9wJsyIZHiIRHMAMrVmVOSAUjoAAu0EBwsAIEoAFx4AiC0AJeOIhimAZPQAMQSIYooBFA0IaO//iIj4h5cTgDTcAFxcQFdzgCDTABULACJVABOzAGXzAhgxiGxzcJQHCDa7OIGeEFbOgBsBiLshiLbEhGi4B/M+BsLIZMEeACJaABVKMDRTCEJkCKg/gBabCDYaiKrIgRS8ACIjCL0giLIsACPSBTZ5IHUbB1c4BMHjAuLtAoalAEfQAHRFKMyLgIgniDDtiMF1EGQQCNsAgB8+gB9EiP1TgDRYAGfyApeUCCLsYBUCAIVYAravADeVAGF1AhxdgCgpAGpUiI7viORSCPEHCR9oiRIjADfJIHboAGdxAIhoAmd7ADC7ABOqAGvlMFRfAFZ/AFC1khFwAEkfAEHxCRXv84kReBBkUgAhf5k0ApAkvgBt4kCY6gB2fQBuLkB900AXBwBj1QA0egA0qyCHaAAjE5IRfwBJNAAzdZii3wATnwEl5QAUB5lh7gBYhgd7JhlIVgIgOlAGogMHAUCDbxCHmgAxcQkwuZjKnIkCZwAUCYEUeQkWf5k17AF1lBEpIwAZIwEkrhB1EQAgu5l1spCHdgk8Z4AWf4EkAAlBUgAmb5k0CwCJXxFzmBCG4QBJSplR/ggERyAQcDEz55kdGoAR5glgkAASIQCKfJFdYBBjrgAHv5AZaZlbJZA0OxmwmAAAKxBDOAm2YpAnjAllmBmjnhCHtwRSFAnMe5lwcwAFO4cQAHIAAE0QZB8IsiAAR1YJ1OgZ05wQh3UC4RkAAOcJ/kKZ6HYRBjMAMg4AIe0Rfw6RqHgAY9QEkrkKD7qRExtQS1tkMApxVKUR2IcAdRp48wUgYL+hKFQAhy4FhLwBBnAnCzYRPbhAiA0AZRFztR0AZruaFEMQmOkKK7dQTWEwUrpgAr5qA/UDFHcAUQOgkwShdGWaFtcAZcsB0gsBw4yhB3gAiOIKRDCqNFeiZ+gCbW9ghT+g8BAQA7',
"mercado35":	imP + 'R0lGODlhRgBDAPcAAAAAABgPBRUpPSYcCDseBS8iCyMjHy4xEzksDDMqFDw5FzEuJBs4VzlNIj9DQj5LVCNFbUUsC0czDkExEUQ6GEk3E1Q6ClI8FEE5JnAvCnQ/JVZHHV9EEU9JMk5VKVVSPk1yDFN8EV13MmhLFHZQCnVRFHpYGWRcLG9oNUpZWVJSUlVVVFtbWkVbcl1lRmdeQmxyUWhta3h3ZDldhkxynViFFFyKF1+OGWOVHWqeI3WrL3+zPnaNUH+QmWWGqooyCLMdAKc0HrQ7JIJWCoRcFZtQDIpjGJVoF55uF5tzDohxMK9ADKREMaBsDKN0Gap4GLR9GaN6JZJURqNsX8gkANoqAPU1BcdBCtVFHMJAIv5VKMBsWvx2UZqBMqqMHLyDGrmPEb6WBrKGJ42FSoWHaY2ZeZSHfom1UY+wY6mNRKmWX6DJbsmQH8KcPtOYJNWvFNuhKOS9C+e8FOWpI/qWet3BFenGDuvICerIDuzKDO3DFfDNCvXRDIKFgo2PjY+XmpmVhZOVkpiYmJ2fnZipgJSgqJmos6KokKO9iauxnriglqKjoqioqKmtqq6urqOtsK+zsKi0ub+yqLS0tLC5vLm6ur+/v666wra/wLHSi7TCqbvJuLrEyLvI08u2sfqumcDVpcTQvMXFw8HNysjIx8vLysvMzMzMzM3Nzc3PzsDN08zQyc3cxcXQ1cfU0M/Q0MnU28zX3czb09bDwNTeyNjdz9LS0tPU1NbW1tfX19De2NjY2NnZ2dna2tvc3Nrf3N3d3d7e3sbW4c7a49Pf5dvm0dnl3Nbi69rl5Njl7d3s6tzp8fjNw+Xn3uDq2OHh4OLj4+Tk5OTm5ebm5ufn5+br4+Xq5+jo6Onq6evr6+zu6e3t7e7v7Ozv7e3v7u/v7+Hu9+bx4Orw5u/w7e7w7+/26ub0/e37//Xo5fbx7/Hx8fPz8/H18PT18/T19PX29vf39/f69/j4+Pn5+fv7+//8+/39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABGAEMAAAj/AP8JHEiwoEGDfQZZOrWLGjVChJSc0DRJ0MGLGDNqvDjo1Dt8IO1p00TGS504YcaUA/nNksWNMGMa9GNLHkh68uQ12zTGS5w8ePDw8aLpnTx6IN9Z6iOzaUZBwfDhzJmTUJo2b/bY2WoHT5wx7KgeBWmLqdOz//xEtSdW3qE0ceLc4Up3T5RqbXPau3fKLFqYk+yxFbsK0Agweu7MeYOHbtc3hPJStQdv0F+NfajhyyvKAxEkR57kuZPHMdcxxSTnRHrq8sU+86aKZdWByBMoSIi8KW3azp43h9qpzomPmuuCmmVTLXbiyJcnX6AcAaPVdB49bE7QGk78nanj375t/25bDRSPEtGfQyHihY9jPHnksCFCRhv31e9OBfv7TTN5QjBsQIEJUEDxhRO4OaFHY/DZ8cYbbCDBQyOlZGMUd/Yotd9ZUYlFyyEiXFBCCRxcIIET6jlhxG7xyTHHESKO4EEZmlRiCTYXqoZPS8Y1tYs9sonSAQUjjDiCiCYgAV10JrDBhxxwfEGEBByMUMAJJ6AAyCuTWLINhtRU0iNMwQhGVTyJKKCABxyYsMEIBhZY4BNPmKCiCSNMEIAERCSAyCEoUIBCIqI44os7w+FjS2sw7RKMcvKkiUgZH5BBhnNyPufEEwUMcMEIRJigghFsjECGDJvw8EIHLxziiJeq0f9DzySMamTLYGIl4kItgbBQhhlGfCGsek8cMcEISCDBhhJ9bCBsnYTwkAghE2BQRiWTYCNPKJrEIxY91DgCEzWQRupCKCkYAAMMRDiBhLDufgHjCEe44UYRBAzwggxH4HaCpTDIIIIffZThwQYbwJAIXnpN4tdFlozXViIwlMEAAwsccMEERMop3QUmPAEHFBksMMAhqvTxwhdudHECD4SIQIoohLywAQckbHCCJM0c9Y1lGFkinmSHeBDDxR4oEAEFFEgQLBTFXqAsHGI4wAACMfThwAlswAEHG1F4wIMppViyCAwHcFDCEBzA0LM9ljAStMRUaXMNIBwYwIABCGz/MAEHR8yXHhIFXPDFHGIIYEAEVpLgBhyPu2FEAJCUckrZZHjwQQcbKNBALT4rdNAp5LbljAv7OnGEBRxUcEGwUZIwLOEXEAGFGxwQwQYbIrvBxhdIVDDBAH2EwokmosjggQNlZMKDB6Af5Yi4BlWC63IuJECB4etx0DUUv8egRBNfmCDBBQUYYMLjkH/x+xEjIPB3AQtwMswgLySAAQSFyAPKCdGjxy5EV5BTXE8e89CECTKwhB9MoABi6J3vnmCIVshgBBFAQAEQ8IcFTKBeX4PCCIRXgQpEoAAUaAUsPmCBARRAAGXQRjNQED15vGMQkyiILahxQHkoYglYuEIG/wIwgGJ5jQ1OIEMkjmGOQiygAB34QydksIIBcEAMRJjABCrAAQkQ4ABkaEUfWHAEI0ggAgPYAA/MAMDJOCKHBDlFXkIBikP84AolGEMDGmCnkaHgD8mIRSuOAQ5OGKIRMXBAH/ogAwy4kAOQtMAG/ICJY1yCAhiwgBPmU0ILjAAFzqAKPU4hN4JUgm6ISAQyXNEHMsCAByIQAQJIoIRFDOMYxFgGMVSRDHCcAxYPWAAZlgELGMRgABI4nwyGAY5lgGMUMYCBCyhAAgMZwQ1D+EBqVhMMQdQqGLagmyuG0QlemoMYLmjA8mQgjHPcDxLHwOUxkrGMWHDiEs4UBjEi4f9IFlDiHBYsxDJ6oM5WUMJmSoKCDAqhiV9Q5YaWGIgtOkSVcGiCGK3gBDGGMYxD/IGJnJBBDC4QgUiAAxatiAUskpEMWPiBEGo4RCdaMQhdmCMSMHBAB2CQgj3GYJ6UkMEJBAGLcyyDEw9lREQFoh+6yYMd7NgELIbBCSbGkxMd4IAFEvCBQJwDlxsFRye6EIaTvEEMhwAHOIbBghekwQRtgMEAFtCHQZ7zEhzlBCu8IZbpDYR0PZQHJFahiV4SAxaW7AIbONACB3wAE+fkJSzI8IY5yOEOd9hDEigBDlV8IAommIAFJCAAB6gCE8NYRjxHMQpWhEWUkyjlPwArmUn/BIMVuhgFLIjRWRh8AQU+YEEANlCGlQpjE12Iwx4wewc5dIET4HiEEtqQJwwYIACmHeQx7KkJceSFHnH76zfKRY9KQGMa0QiFK4iZUjOkgAYPGAEkT8CIZSRDDWB4AxzqAIco9GEYu/SDGtrAugvIIBKqtacsgnHKvMBNtkIrF9yiMQ30QiMUlEhtJGbggw/8Tr4T6MM5ItGBUHRCFpyIAYJjQUhDyOAFC2CBObbLiVCwIhrRsISETwG0f4iiDytQgZCHvAIHDFnILOiDK1TxiAUIgAVjYJn5KDAGGfTBHODAch8ewQhOCJLFyXhEVTXRhxgc2QFBPrIKVhAI2dpi/xo9BC82vEFnb5CjG9XYRCwq4YdLCCMQXTCWA36QARaoghjE4MQHEhCAGMQil63ABCwoMQpakGMc3OCGN65BinLJI7wC2WEP4SGKaJDj1Kj2hjOKsQkVTjWkD/BBBzbIgRd8AAMFIMAPZHDSSHCiFbIwBqqHDQ1UlAsefhWIo5x6FFP4Ytip7oYzNoEJVQzDHK6IQQssYAQjlEC+I3ACETQACHAkWhWZsAa0Ud2LXkjmHYyAo0AoKhZ4TKMX78i3vvXdjnZ0YxOjaEUnOhEDBBjha8JywxxQUIhhJEMZv/jGOPZNcV58qS30+NlSQ81seajDFhQPeb6loYndprhJX/9jgxuQUG5KhELkIX+FO+CRF2p4M47Mhsc8SOENfYMiE0APeiZA0Y5qIGMUGhUEDAKthDH0oRPJYEU78s0MOlgdHRTfBirmIRlbvGQguzjKd3kBjXyPIxNrSLva066OfJODFUu2JCQ4oQpWWGMd7sg3OujAhb5/Iu/6fgY03m2JHg+kTO/mhT3wsY21O148ILnHO4qhC1gogxK0uAdINs93LWjB75u3xy5ojnGNG2QXHadHLtRxj2ugwfFpR8M1Nk/7FeDjHpqnfec973kuMIMlwVBNNw8yetWsAxj0iAYazsD85p8BDdTIfe1pH/lPcMEK2M/+55lBj0OpxiUXQfz/d33xDeUzfwdnQP/zo099fNie+p/QQvbnj33fP2MdkvlZJS5iC0/D4x248AxosAMEWIA7IHvSt3nvBxL1wAzyVwX0h30QyAXooBq24Ae7cBEO4WnykA2lgAY6EIIiqANnwH7Ut4D44IBVsIIs2IIraAVckA558Q2MIFsHUROqMQ+nwAM50IM+mANnMA0JCBILaA9aUAVUkIQu6IJWQAf491AXqBHB8CiSAQ/PwIM/2IM8UHYhpwL6lg30p4RUwIL0hyhU8TM2eBGT8A1iMQ9o8IZo0IM4MIdzqIVnwANocAp6eAoOsIeVMAVSEIhWgIRjmIRWkAVSMAVToAjU8FBL/xETckQV65ADdFiJlogDN4ADOTAPCrh501ARgWAGWJCEpDiGWxAIqFgJ0ZAT7xAMfiBvthJ2OTENhHADN2ADtpiLuoiLN0AIwYBqKoBq0GAKlmAJijCKpWiKkyAKpIALX/IOP/N1MGEJpfMMjcADNpCN2riNNZCNPMAIvACMqNYN1yAN0OAJyFiKVbAFz+AN29B28PANk+AHZyE08oANlhAIImADNdCP/uiPNjAw5nVq3hCMw+YN0CAJWUAFQAAEDJmEW3ANVBGPqNAHsCgTQuMOz8BnIlADIfCRIBkCNSACfbAIpOAL0jBnKuAN2CANwcALtlAKCtmQNOmQEflQFf9JPWhBjcfnMDYQkiA5MJPgC9cATqnwCg7wCq9wC8+wDe8AD7OQBTXZkFSwBdoSj33hCLxwGbtAjd+wC45ABiEAAmRJliQJCcDwhLJCDytAD0BCFe4QlVPZkBEZj5bgB2n4F5OQC9tgC4wgA2NJliFABo6wC+pAelShAnmxDrMgBHMJBFtADfLYB4V5HPNWCaUQDaZwNmUpA4xwC9+AmImZF3HpmHO5Ba8wCH6wcZb5D+9gC5NgC6IwCDAAAjDACK+wDaI5mm3hDrkwBUEQnMLJBGaQELbwDa1JEPIQDJYACZAgCH4wCKSQDbvJm2LRio5AMItUZiwQA5WwIclZEO+gkJqCYJLUkCN5oZhtAQ/YUAqOwAiL4AcxkDWVcA3heRH2kA1x4wivcJ7VKQ/qWW/rAA2nkJ19IAiWAAz3qRHy8A25EFuOwBDh8ZRH0ZY2FB7UYAuFJwg4dJzysKAwkSEZGjc1+EbF6ADF+J6DIAiCwAiVsEPvYA8g6hT0AI3gdAqWMAmTEANv1CUMEQzfEKMzehw1Gh7fMA1Gmm/wsKABAQA7',
"mercado35_gs":	imP + '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',
"militar35":	imP + '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',
"militar35_gs":	imP + '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',
"militar235":	imP + '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',
"militar235_gs":imP + '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',
"misc35": 		imP + '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',
"misc35_gs":	imP + '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',
"setup35":		imP + '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',
"arrowup":		imP + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjIAP8JHEiwoEGBWKocNHhFxYosCwfCOfECBoo4EeWYEAGDR4kLcw7aiaFBRAsXLDqkOGhFAYcQJEaQ6ABBSEEyBSps8ADigwcOFgi8GShHAAIJGDIozWCBQoIAdAQ6GHAgQYQIEyZIiLAAgQEG/8Y0kEHDxo0cOHLcuGGjxowHYnrskLLlCxgwYfKC8cJFyhMfQHQ0cQJFy5YuXbZoieKkCZMfRKiYQaPGzZo2bdi4SYPmTJkgd4oYOZJkyZTTp5MgGaKkTsSDAQEAOw==',
"arrowdown":	imP + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjKAP8JHEiw4L86SoYgSTKlYcMlSY4YKXInSJkzaNK4YdOmzRo3atCYoULkB5MmTqJo2dKlyxYtUJw00QHExxMpXLyACcMTDJgvW6Ts6CHmwYwaNm7cyIEjxw0bNGQ0GPOPgQEECyJImDAhQoQEBwY4EEgnQAIKFjKozYBBAgIBcga+IWCBg4cPIDxsqFCATEEhEDqQGEEiBAcFVgz+S9GBhYsWIjTEsKN4zoUSPGCIMBFX8b84KGC8OAHH88AsK1RcMU2wChbWsAUGBAA7',
"speedl":		imP + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8JHEiwoMAzOBpgqGKwoUAiQrAM1FIAAIATDgs+iTFAgAIQN5hYgWARRsaBQDQIsFCCQgABBkQQ6ZCiy8l/QxoAcHHlH5gWBCwGMXOzzAsABnwIDMOiQAEYCSSIGUhGBoqCZDxgYCJwSQYAF4r8swGAh0AnIQBEMAjGi8AcCQqoCCPwCwMGWo4sAOCBYcMpJCxuQAJmoA4AFgocoEHGYZEGAig4eGlhRpR/XiIAeKDE4ZYZTmlwufJjREUFVv4lWTHFoRQNASIYIVjjgAAWUzOO4aEAgAkqA6eI2NzjJhcTAg7sIAhF5wcpN7NUAMCBK8ElE2AQvdkEQQq6BrncAxwYEAA7',
"speedr":		imP + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==',
"capacity":		imP + 'R0lGODlhDwAQAOZ/AKqlmopuQKyMVpqETFdGI3psSqaXe6ySVczJwpWKcqSdjuLf2aWKWWdQLJqUhYRxQ3tjQLy3qtnTzk09IlpVRod9aP38+mFLLMLBtJ2FW/f38qmOXKWKVpd7RpuOaaKGVN7c1vTz7m5bMpODXHdfN////o12QqqPWqOFRaeNV5d9TotzRYtxQmhVLoBnP62PWJl6Sop1Rf7+/f39/aKhmqiGVI9xRaSHUph+TZGAZJyFYWFTP21WOqiLXY9ySuzp5J+MVJF4SZR5SOLh3Z2AVGVOJ722pfHu525iNrCkiLSvoLe3sk1EKcS7ZVlKNF9XPpF0SH59aczIv/n595GCaXdqMW9qUIVpPGFSNI99Tp6LWnJaK2tVMmpfPquKWNTLxMvGuKSRWKuPXefm4u/s6aGLUqSPUDsvGISBb3ttQIJnN7iuYYBsN5iQe4lrPIVwTZF+TIuAXPPz8/b19WJUKKCCUaKMYpmBULCTW5mAVJ2HU2NFJpp8SVZBIZ1+TP///yH5BAEAAH8ALAAAAAAPABAAAAfsgH+CfyFSVkoIDksyQwgWglMRCR5rdDwXbRFoURh/cxUtF2xNdHsuTxVgITQlDg0rKy5VSA8EFAoSMnIyCXYnLCoHYSJnFBgzg0cjQFkiDDEEE1gAMoMWcVVpLSQtRS4kfQDIfwsjbA8PJBB5KgFbBAB/GgZ3dRspH0QMHTZXF0wavmjhAwPPCwEfOJgI4uaCk3kfYLDgIOBFihQDBqjpU0GGDj81fEDhIEaMECE4uEwA8ScDCgE9OJwQw4BFBhc7FghKYubGhwMvDpSBk6YLS0FkPOgxUcfLgBgFHIwZJOiHkRwQ3lBRoJPqn0AAOw==',
"locked":		imP + 'R0lGODlhDAAQAOZ/APvx0qmIUvnqtc2ra//Fk/+bQ/p2Cf6xZvuROvp+HP15CZ6AT/6GHfV1GPRnAP+4ePnpuP54AfGtS/nowu2dFv7Opv/aufvmqu+0DfXEXvGuQPtzAfCvE/RoAf/y6P7Gj+2ZFfeWT/XCQf+RMPTRfvS7X/nqxMOaW/zbw/iQQOeDBumLB/qlZPPFVvK+NP/JmPjmve7PNf2WP/bYkPK/We2dBf+hTv7x6PvKpfydT/TThv2rWP7y6fmNOv/DjvnqwPK2If/Qpvd5GPDAHvbdo//r2Pvfp//hx/K8Yv+1c/25dfDVR/+iUPLTb/+/humQE+mQGfCiHvyFIvrciPz35u+lEeeDCvhuAemOD/+rYP+vaPHKVPO0OPO6PPvhu/CtIvjnuPTHcu/IK/LEb/uTP/+7f//Mn/C6F/zBkvXblvjovu+lBOuUBvh3D//XtPG3Se2dLv+pXP7fwPXYmv+fSvKrF/fSg/fotPRrB/qlQP+oW/9/DfqMNcGZV//z6f///yH5BAEAAH8ALAAAAAAMABAAAAesgH+CFQUMDExHgoosGwoIPQZ7boo4VzIegjxkI0WCKQp+in83Bk6CCTaignxxp1qqfwhZfyhtBRZBLwQEaFJ6fnhcXh9KBwc7eUZyZg5Ldz9qMBMmAgBUPg4xTSQ6AwNzRGAAZQ5iWy00CwtjJGkQDw5DLl1vfSdIYTMC8GdAdVEBAkgoYedCEgcYOFQB8QQKHA0ZptDpsKYGmxUqrGCh8EVEhBANQooUKSRHIAA7',
"unlockedl":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAYBQTFRFAAAA/sSU9XQV+4Ym/ta2/d3D9nEN/3kB7qsT/+LI/+ra8LMc/qJS8bti/ePP/4ES/7p+//37/vPq/+HG/c+t/pY8/+XN/eHM9deD9oMv/8CI+3oO/7h5/4MVq4xa9oQwp4ZS9n4n///+/5Mz/7Rx7JwW8MdK9+Kz8a8R/atl//fw+Iw5996g/byI7ak6/uTR+uvI++zP8bAs+ee38Lgc9Kwe78Nw//Tq+KFi+JRJ/30I+eSu/frx+oAg/PTg/+3E7Z8E/6RU6Y4H+HUS99WMuZFU+JxZ7J0t/tGr/u7j7qgE/7Jt/6le920E+9mH/KNZ+n0X+okw//v4/9Cl64MF6oQI8cs+6Y0PpYE8++zJ/+7IqolU88JY9chU765H8bMWzYYdmHtL+u/S++7U/+jU/d/J/9q68L4o88V666YN/4AP76oK17h89duh+XMJ9t2m9r9l//Xt/phA/XkK+3UG++Kn9tKF//v3/6BM8cxa+7F3//Hk8LBO+u3B9slM65cFJqizLQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AsOFwYDc4wxCQAAANVJREFUGNNjYEAA82AeUU1WQSQRpWoZK2npElsRJMFCmeIqcX3dADYWhLI0dkYQ7ZFnCRcLkmLmAtGComxwsXKVQE8wo8iXQYtLTFhYmDNFrMKWFSzGo83gZsTvqCzLnyWr7M0iBBJjFWFQDKuNNLCPMky2s2FMhZojmV4pIZEjl5uvniQlDhWTN1GLjUlUMCvTMRbgg4nFc3Bzyynw8mZYI8Q0uE1No11rClxK4WKS2ZkcHAkR7npxfj4wMUUvh3qnkNBwVaM6K5gdFmxMUODsLwQRAgAIGCOyrkYbMQAAAABJRU5ErkJggg==',
"unlockedr":	imP + 'R0lGODlhEwAQAOZ/AP7ElPV0FfuGJv7Wtv3dw/ZxDf95Ae6rE//iyP/q2vCzHP6iUvG7Yv3jz/+BEv+6fv/9+/7z6v/hxv3Prf6WPP/lzf3hzPXXg/aDL//AiPt6Dv+4ef+DFauMWvaEMKeGUvZ+J////v+TM/+0ceycFvDHSvfis/GvEf2rZf/38PiMOffeoP28iO2pOv7k0frryPvsz/GwLPnnt/C4HPSsHu/DcP/06vihYviUSf99CPnkrv368fqAIPz04P/txO2fBP+kVOmOB/h1EvfVjLmRVPicWeydLf7Rq/7u4+6oBP+ybf+pXvdtBPvZh/yjWfp9F/qJMP/7+P/QpeuDBeqECPHLPumND6WBPPvsyf/uyKqJVPPCWPXIVO+uR/GzFs2GHZh7S/rv0vvu1P/o1P3fyf/auvC+KPPFeuumDf+AD++qCte4fPXboflzCfbdpva/Zf/17f6YQP15Cvt1Bvvip/bShf/79/+gTPHMWvuxd//x5PCwTvrtwfbJTOuXBf///yH5BAEAAH8ALAAAAAATABAAAAfRgH8QBCgUC1I2f4qLjIITPHMaGjkbeiGNjAMFTywuFnlyG3CYizhtR4wABmWXpAUUEIwJAhlRpH9McY1IUCN2tyoLjQQ8dxVjCBLKFQkpEwSMEUUxDkAiHA5pHCJKA5hkIFV8WC8+WTBiPTsAmBYYZngXF2sdbG4mYRmYDR4zJVxbwHyoUWeFjAf7PHg5oEBBhw8MGJzRgbARvxMKaNDQQmTPmyF0KjJqgEENmgMHvlwx0qJLkyXtQCT54SfIFCpWSMTokwNThBsFAggdKlSIk0AAOw==',
"external":		imP + 'R0lGODlhCgAKAKIFAAChAf+AALjogArGASnGAf///wAAAAAAACH5BAEAAAUALAAAAAAKAAoAAAMlWFrRvoMsNsNYAWgQBAZKVwhXxnhCQ5gCkYIXOAaFXE+3su1LAgA7',
"iv":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFADs8ADw8ADw9AD0+AD4/AEdHAEhIAElJAExMAU5OAVFRAVJSAlNTAlRUAlZWWLGzW7O2XbS4Xba99AAA+QAA/wAA/wQE/wYG/wgI/wkJ/xMT/xQU/zk5/z09/0FB/0JC/1NT+Vpa/2Ji+WhqmNPTp9vbq9zcr97etODguOLivOTkwObmyenp7/n57/n7//n5////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKEwUCwAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAHlJREFUGFctzskSgjAURNFnRIIQcAw4zwxRhPv/X2dSZa/6bLpaoM91ksyyDwhr9cKnnqyQXn1Dh0GcmBru+911pEklhqe1dnOBWOZw9LAVmIBDQAmFaHj4vj2DFtPArSpPI87IWw3/6agVltMuyEUL/4Au03mh0xZ+eFQR+TbmyMoAAAAASUVORK5CYII=',
"ov":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAT0HBD8JCD4LFiwSGi0TIC8eJDIiMjMpOjcuPjoxPjszBEgJB08MDEIMCkwNC1MOAH4OAH4PAn4QA34RBH0SBX4SBX8TB34UB38VfXt7I4suIoovII0sIYwtIo0uI40vJIsvJI0wK482LI83KJE0L5A6fLuDfbqEf7qFfbyEg4CAm5aYgbuHg72JhL2Khr+MpKGh1OnW1unY7fXu7/Xv8PXw8ffx8vfy8/n0+Pf3+fn5/Pz8/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/pJ70gAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAIJJREFUGFctjtcSgkAUQ6+9a3btIqKCvQIWLPn/3/LujHlJzkMyETK7rIwJT09SmERdqMwioWSRi07BXc5q7VK5BditLIHO+MNDDpiLFgovklVgKD2g+FaoAX0Jgeb+y6sAEzlaoFGp53VgJ4/Zf9l4qTCeGofWi/UBbxt/NPDXKfkDJWUQtUYbGbQAAAAASUVORK5CYII=',
"centermap":	imP + 'R0lGODlhEAAQAPcAAAAAAAATfwx0FRB3GRZ8Hxh9IRl+IxQu/yQ+/yBG5S9J/0NZ/0Ve/0xj/2B1/xyAJSOELCmJMzCOOTaRPzeSQTuURT+XSE6gVk+gV1alX1ukal+pZmGsaXe4fnizvIC9h5up/5LHmJvLoKXQqbjbvKLjqbj/osvT/8LgxcvlztXq2ODv4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiHAAMs+EewoEGDDgIgOMiwIIMADRo2VBAAhESGBwKc+DeBwkWCAQJoKBDAwoqLI0KaCBCCwAeGKyxIKBEgQQATJi5AQFHwA4EQOD2oxGniwYZ/AirgDMmUKE4OA1JA+OC0Ks4HPP9doGAVZwYJJwuKeGA1QoeGKswSfUDiYwYKGCR8LGjAQMOAADs=',
"distl":		imP + 'R0lGODlhDAAMAPcAAAAAACpIgjJWmTdkqzhstDh0uzh7wEdhklJkiFRmiUNjoUhwsFJwqFZ7t1J/vTiExTiMyTiUzTWn1FmEv0mAwEiGxEeVy0CYzlOUy1aVzFacz06x2FKh0nCWxnyey2+k0X+hzHiq1Hus1VvB317D342pz4q02Jew0pW62qOuxajT5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAAwAAAhZAP8JFDiCxMCDAlVIkLAB4cELESJwcDjQAgQIGgZ+CCHCBAoMD0Jm+GegpMmTBioUWMmyZQEK/zp4AFHihAMCOCdQXDBgQAOKCgQIYEAxRYAABygKRJAAYUAAOw==',
"distr":		imP + 'R0lGODlhDAAMANUqADh0uzh7wDhstDiExTWn1DJWmTiUzTdkqypIgjiMyVvB33CWxlacz0eVy0CYzkdhkn+hzG+k0Yq02I2pz6jT5Hiq1FJwqHus1Zew0laVzFRmiVZ7t06x2FKh0lJ/vUiGxFOUy1JkiFmEv0NjoUhwsHyey17D30mAwJW62qOuxf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAMAAwAAAZIQJVQaFIMj0IOgUBBCjsGg8OpYiQSDWpmwAWhJJdKRPUJmM/owAnAbrsBKpFg7sFMIKXFcHM4kKhCFgUFI4AqDwgIKYYaIUhBADs=', // Distance Icon - RTL servers
"merchant":		imP + 'R0lGODlhCgAMAPcAAAAAAAAEBQQAAAACCw4GEwARAA8TAg8WDgQZEg8cFRMLAB0WBB0aCRwgHxQ0KSYoGywhHTUvHyInKy0tISwsJC45Kys+PDo1IjM1MjgyNBxFMzNFNzlLMyJMQjZISjxbXj94aU8/L0c6MUZFM1BQTktXY1xkT0V5Y0B4d1B2a2JfQGxeQ2xlS25sXXFsWHl6anR6el+LjmKupFXRyW3NyXLTyoKAZ5GHbpSRcJyXeZ6bfJqRgJ+Xio+hi6eZjq+qjaWikbOti7GtlLiykKamsrvEp8XFoczXt9POsdjUt83Hy+LW2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAKAAwAAAhuAP/9W7HggQqBCIOEgJBBwQ2E/3L4WEJAwA6ISEQoIWKhQhKIPBp4QNGBA8R/G1LQkKGhCEIbBU7MqAGih0AjBgKUiPEhgRCIMAY4QHAA4Y8WGCQcMTEBiEAWESiQ+DfkAgMdAl2MeCGQAQMcAQEAOw==',
"palisade":		imP + 'R0lGODlhSwBkAPcAAAAAABYJAREMFBIRBBYQKhk3ACIMByQdAiIaDS0YACwzHjQuBDoqBjsnEzgwHyotJiEtOC1HDCNSCD9bFChhAixyBDhsBjxuGzh/CEAkBUcsAEIwAEY+E048GVY8BFA8DlU4FUEvMWU3BGM7AktCAUBFElNBBUxGL0pTOFdPKF9ENlRbJ1pTOUh9FkJiLkp7KFp0LlN+OmxLAGpKEWJRAGRTDW9cBmNUGXNJDH5OBX1HEHlWCHRWGWlPJmVXJWVbNHdnDn9mD2NkIHtrLXxqOUhMQEVPUF11QV9qemNiRmBpWG5oUXdtRXZmXXtrUnJzV2BqaW51ZXJjekaSCVSMJV+bM1CoAlKhGFOzC1+/FmGxHGWSQG+QSnWKV32FdHavSH+LiotrAYdjEoVzA4RyGphjCJR/Dp18AJt6D5p7H4JmKYNmPoxoMJN+IKx9A6N1G651HLZwAIl/WKl/X4qCF5eIApCFOZqBOaeGBq2aHLePDrOUFayLKqOPMLqcO7qhAJaCSJGMT4KDZYqdbIGTcpGFe5mRZpOSc4eiXoKqYZGqdLSbW7enQ7yjVqulYLCofpXNbcWQBMCbAcWtFM6qFNSkEdq4Cs2rMcWyOOOxBcquSNe+WeDFTImWgZGThIKApZmlhZimkJ67hqWOl6WhhKSkk6q0h6q3lreylaqusai2oaq4o6CysbS0o6Cy0LfVjrjSnq/Mo7HNpb7Io7jIqLXGubnHsK/G2qjawLHJxrzFxcfIi87Hm8fQn8fBoMbEsMXHvs7Yss3butHKodnVrd3Wtdrtufb0lOnpu/bqtvTqvP3xvPz9vcTXyc3ZwcXb2c/X2dXYztjVwMHd6sXa+dfnzdnmxtzkzN3vx93k08vl+c/s99Ts59Dq79Dj/dXp9dLt/9b0/9z3++Duzuroxevsz+Ts2Ovl0eH02u321vHpwf3zxPvyzPr4wPn5yvzx1fny3fv41ebq5ubv+ur16eH39eDy++f+/f7n4/D34PL18fH2+ff68Pb7/v3//AAAACH5BAEAAP8ALAAAAABLAGQAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3HjxnLmP6KqJrHbNGi1aHFMO9Giu3Lhr5awJCxYMVi9RirjEiMFFFC1nP2c5u0buncqH5UKaE2mtmrVgsWCJSoRo54sXPBWJOnVqVjFk5JApU3d0YbWYTcc5rVYzUaIvX6pcvXDh6haqg04VU6eMnV++ZMsSPLvWqTW1Ml+9rXJlCpULMehSaVyFi6JZ5NwhU+eXnTpkggUuLWdYJjZjI0UxxqLlSoUYR1xcmHKldRVEvYqx0+zZcy9fgq+NtCZTGK1YxrBlQ4dtSxXbVLp4QfFiihYsVrRs2VUsGDFkyOIh/ws2K6/KbNmcORtpnJYtWsLQZeNXDVaMuQVMQSEUowWGxi1wYYopXSjSCzLslDMLKD9Zs1E00thiiyqnCCNMUyJhg05I8NiSDT24PACGJ0qc8EAUwnRRgAQXTPBIEhJUEMEKmh1yijPCxHQNRuk1U4sqpXjSSSjOHDbOONagI485sMAAQwwSXOECAoUc0oAT7vyigjSPnBLbBRZgYAEhMEQAX1PGgWJRNtE000oppbDCChhKhOKUWuhcs+EsW2AwBRZYSOCFAl2UcAQXPzDBjpMSxDhFBY1WgcEFsBAnDChPLEFRerbUwkoqrOiSChheeLHekeiMo2EXFWCRRRZYVP/QhQRVUEAFBi1IsMVkflpHAQZWwHqFIrY4o8oTP9wwEadA6qILNNCICoYRoQhXDjbjpHMKBdaxxpqtVvyZhRWSXvGqq1dw+2oWUyRiSyjI3mADGhGp924ooTwLzTfRQgFFFLagY0461pjTRQuw/ofFFBZUMe65FWBwHaxZaFGrFi1U8BohJfpgQxBnQCQhLaeE0kknoY4KRhRQeFFEKIcliQ4uFFyB3RRTUHCEBDhPIeYFFDBmRbg50xVBoy4UwYIPNYSBBr0OxYKTKKCY3EkUSkSBtRKqhHLjkUmNQ4sLvz4mQQStHHK20StEUNejLVAgASHZCJKEAiic0AMQQaD/cQYeBvlzkDVTJWJKLFyd4p4tIgmDozXYYJMOOqC0wo8wosCAggOt8IJPOa+UWYAgKpygCosWNCpIOvOgI0oRJ3AQhBhnnIGGHg7BAolbosQSzEzYxHxk5Nbkk00pUBShGzuHwKCIE00ogw884vXgxCwcYPpEKKxEM4s86dBihAIO3LDDGGHUjgfgDNHzCiRfbIFILBcalq1wIaEjzBOHoAIPO+/owgWo8AJTNGEEcwCEHRxBhA4UoQnFOEEoVIGIRHAhGNiIQioEYYIg9O1veOAD+xSSD2y8D36JUIRIBIYOZ+QjH+h4V0tmEY91sEM8LahNBSaQBDbgYAY3UIMO/0SQgR70oAQToMIUrHCFLoTiAEnwARDM8LS/ucF2DEGHMSABv/gpIj7LMUc+quEFabSCFPGIx27c0Q54ECOHWEjXE8JTjF/MAA54DMMiBKgFWGGhAEXggAlokAbbGRIPaeBDFk+oBS8Koxr5KFYrkgCKa6jRHexQxjqSYcNlOCJiFpjAIfLxi1YAAwRwiEMkAMEOW7ggRheQgAAQMMUwhGEPaLgiH9DQBkAwBBfvg0sVtqCIYHgiCaVAxSFAUY54LMMd61gHJtXYDs10IQYTWAEyUlGnfDziDW6QwSHGUY9chMIFBRjAADhgAzOc4Za1q10b7mAIhgTjLXF5wRZMgf8MUviimWqMhzrYuA5lQHMd6miHDdmBDGzM4gmFmEU68jGINMBhB4RwBzbo4YUF/KADM+jDGcSAhzPswQ1u4AMf7BAIUKhiIbhIxK4IyIVepLE30VRGO/ril2hKkxk8LcYj4AEMbGhUHqgoQxxyQAh6OOMHKTBAD8RghhCGAQ9okAQe9nCGXtropQqJhUy3oE9EFAOTmdTkQjlZ0GguQ6HsgMc5ktCJfIyDHBvKRyiUWgZBQEEDC9iBGcQATjzooQxneEMl9LCHOwTiEQyqxUJoMVbLiAKT7+DMQtuqyZ7aMB6POEQ5snGObGkIkqWIwxty8AMI9KEIbbCBDcZQByD/nGEMdKiDHurQBjsYwqW5aMZkFZEVU8ziEaTozDKWYcN3MHcdyHhHGn1hDTkIIikhGYc5mKPXi2bgAw9IgAAagIABBIAEAWhAAwbQgQb84LGkUEUtnrGNhdhCEQUyBSqcQIMeeNaG0USGOwZMjkOUIgrkOEyqqnGkajCHHKiAwwcSkIcFqOEAB2BECBYghA3cIAUD8AADlIAKVMg3F8/ohn0H0QVTEAMVHWDEENTIjk3yVJq8QMYsDnENemQrHdkaR/6qYYx0GAIOBmCADQ4wggPQwAQ1yAMD/DCGBTAgDTNQQifkm+Ju1FchtSAEKHihDFSoIA938MtBfeqXHPNC/xieiMYYkRQ8IV8jG8bIBhPiwIAPUKIDl+BAHsJQhkjUIBN4YMAOKmEDus63yypWyC+iIAhfKIMYDcjDDs46YGh2Zo3IKAYKPFQNgiHpkdaQhjGA8YM4cEAMlKBBJDYwiR2EwQ0zyAQaBhCGStxACax4xjS6QWxxLAQYT5CDL9hhDAfwgQ00XPOnB+qOYDzBZZ1IVfDUEwxfwCIXPYiEBtIgCRFIwgSW2AEf3CAEXQ+gDpRIASHoS2wvf+PYcjAEMajnADO4ARXsWG5n3KHW3qjDEKU4AMCcYYvEmdgJSk0AHoLQgzOQIBMkqAQaxJAJNQxgsSjIBbHDsQ1xbOPLCf+RhhwOUYx1MKMIN3BDKd6hjGX01OYL9UwayQEKQQCMFqEAhdAFcQI4pAEBegjDDPBAg0pcPAhhsAQPAkCJMCjhGeIIRzdIvo17KwQYcmCCIaTBDiQwYA+FyGQ0AfjcaLpjucyNhzusYQtQnEzMKFDADW4QgKTL4Aw2MHQmdoCGTPBgA+mOQjeybvKTg2MhxZgDGdTQgyY04QB5kIMaAdxZn761He14qzvIIQgUCB0UijCZIZRwgEqMwdZh0MMNKCEDNFhiBjWwBA3AII7ehyMc3+j6QnyxiDag4Q2HDwAe5ABAzwDY7Z0ecDKSUc0FdUIJqMdXKJSwgUzY0ga35gH/7c9gCQ/YIBMeYIXJey+Ob4BDGwv5RSNy6YY90MEAe/iAHFCxebUS/LMDpUmAQQy+cAiEMAhdcwpQAASZAH7gFwY0YAmxlwkaMAaUsAC5EA5ZFw7gcHLTsBC80AhmAE5uYAYGgAY+kAAncFY+5Q5pFA/FcAgsUAjn4Bd9kQzEoA6oYAjNoAq0UATnRzs1gAdhIAOWIAZ7gH55UAlFMA328HscqA1SGH+LkAa5ZAZ5YABi4AMIcAA1yFy7gQyPQHQBIAADcAAzl1YFxWy64AXCcAKFFwRu0AN4IAY7IIF6IAkzMAmS0ATiMA++935TKGmGAARicGt9wAEgQAYp4ADE/9BTmaQEH2UAISAAQ7ACAVAI8HAMy3AM+FBzx2AM09AAfFB+eCADk4AGOGAJaBAJlaADk1AHSEAPv3dy2uAN7hd/h8AEQ1ADMjAD7GUHo1AEj4hJgVCGgUAGU4QAGpAAC4AAvMBG7EB97uAMpVAIDkACQRAABxAAZFADBvABdPABJnBeQiAF95B1gth1kZYQwBAKghB2GxAAKMABeyAFhVBkvBACHHADA0ACZkAHesAAl7ABJOAAvxAPmdEO+eAIHfABZNADJ3ACGvQJeScFyYMEGqkESnAL29CBUqgN22AP9bAQPRgKg3AISeAAs6AAerAGy+EFJZBeMmACdBAJHv8gCQxQCR5wA84ICvHQRo8gBJiwCZrQB01AC82wDRy4DfXAeLW4DekoDu8HDvtAkl6XEM/QNfhyCAsgDA8gCWpQCgogAIGwAd23A3ugBzLgBmeHA23QAEJwAMxADE3gB5twCXvAB33QB3YQCtzADdQQDvfQDeBActxQD+HADerYe/XwhFmJEM+AC4QQdIJQAtbwADXAd0pgADVgBgyIA5IgBmJABiaABzgwCRuQAAdACj9AB5vABzwQBkHgB5zABj/gCfZwDyXHfoz5exsoDvYgnN9QnAsBDfjSCZjCAqrwAAEwAAhQAxlwCWhgBpkwA5UABHpgAzxwiJbACATAAAb/cAecIAY9YAY7cAeY0AM7QAYzUAjQMJWHGQ7ekHXaIJzh8ITraJJd03NOEADOOQACsAJ5IAKVkAN4UAk0kAlCEAkdcIg58Ac0sABDsAF3IAZDkAc00AiLkAEyQAcygAmOEAW3EA7oIJzg0HvcEA5PyYHeIIXf8IFfpwpCEgUnQAALIJAb4AaX8AGZIAZ6kAewhgOUQAJnAAQ2cIiYsAHQSQd5YAONkAYakKEe4AeUMAN3AASgwIHzQJjccA8pSpXruA3tiBDR0ApeEAUskAIp4EFOVwl74AESSAnvJHUX+AY2sAM7cAZ5sAEPEAIkQASXkAYZtgcZwAeb0ABhkAcr/2AHclCfLEpyVLkN3vCiJ9cNzyBc7ugJUZAEKUADmICavpYJZiADlQBr6CMJd7gBeNA0MjAGHhAADuAAHMAJgGAAfPkBfbAJJqAGdkADNrAJJMAE6icOYEpy0yCFH4mpzbAKkraLTGMGlpAGsReBYdAGmRAElOBvSXeBkiADZmACaJAAAbABCOADQcAAfJAGDNAHl9ABN5AHKpChGUCUQnAK81Cf4uBlH5l1mWoLw2cIQ0AGQYAHlmADbhAJQWAJQVAHlRAEmTAGemA7knAAf3ADYUACepAAG4AJJcAAN4AHbdABmoAJIMADshcGgJAAQZAGfeAHJgAG3hAO03ByjP/XDT4CVgnhC41wB07jBgfLVWHQgHugsN6nB2+wB3vAAJLgAWhgAnnQARvwByRwA5cQkZuABxkwBHwwAnmgCRlABmOQAW2AB43QA0qQC4UJhfXQg6owCyDYCH3wNHqQrZVQO9lKCZHAgLH3BnTqAJSgAW5AA5LQABkgCSQABHTQA0f5A2agBynQCHygAnRggm3AB41AA0AACD/ACk9orPSgCqBwCrEQt7vUipFABplwRYwmCZFwfjaAB2/wB2UQAJMAAmUgBHiwAR5QCQHQA7YJCB6gCW1AA5pABgwwBkRgAGSgB3xQAsGqCWLgBKmQn/KgnIojDAtBDJKLBuQmCVH/9wZ5oKqUcFiWEAl6YAJCMJGwSppmYAPYqQAwxwh7kAZiEASMILx+EAYaAAh5gAYeIAacQAZDAARqwANz0ApR8DLuob0KEYK75AaLhQaVsAOSIAk6IAnvRAk/+gFR0AmlEAIeUAelGQSypgCpAAhMcANAYJSkyQl9kAFs4AdDEK+bsAavagJ9sAhmoABJIAhbBh8LMQyN4AfuJAng9KN/QAllQAmWkAcJ4AEqcAhgkArz8Ak10AbgWgMICwGfMgosYAeMAH6bMAkdsAZ5gGWbsAlAUAMH3AZBkAdj0AEl9gQuhRIL0QiGdQaS4AZ6cKCS8MQ8QAMk0AS8YApgwAqL//cNRpC8eKABEwcBueAKrsAKcrABbLAJnCCuNFwDmKAJPGAHdDADbDAEmDAERKAOxUAOpyB0eKwQRawHeywJlBDHchwCTtAK2UALoDAN3LAN2oAOrvABnCAJhxsGRXALtzDJrqAERMAHYsADaIYDe8CrfFDDduABjPADWOIO6qAO5MALvgC3eSzLeqAHaJAHEppkKSAIjNOBHIgL2kAN24ALDhB4GiAJNoAC1JALzOwKT0ACGboGNdAHjVADjNAIDXADnszNA/YXl0YMDSG5hoXONQAEDlAEMOACinALz2Ci4EAN4PB+1GAPrrAAvlYJIKAE4jBs/9wJJVADfsAHav/wAZqQf2tABIzAAVjCDHClDMogFg3hCHwAQmTA0waoFbgwDRwIDtMQ0ocJDr9cBCNAApbAAbzXDdRADcucC3MiA0TABm0Awz2QBmTACBsgB9XEDtUE1MqQDMow0WkwBso4BIKACqZACBlI0lutDfOpgb93CwKAigiQC73nZdqgzMoMBiUABJzwBjjQCHVABBtgCGjFZmMB1A4xBD7gA9YFCoSgCiIH1drAgVD4hL93D9ogAG3Qw0xtcu6X2LegCxyTAjewq3ewAR/wCC7oac8HXQ8hB9ZFCqXAPSlWs0z510+I2lBoBAtwAGDwkcldnPKQC7RdCKXgADWAvE7QF5j/RA7PN2A29BCtgC+i/QzQoA01C4W/16LsrYEtPSK9V9oaaA/cUA2oAApgoA+dcAIlsABywBc2hCDqUFDivQ4iEwq10AzBJ91QWHLgcA8SfqzAuZiEqYHgEHz1kA3NAC+gAD7GEAylEg/MQGNrJk2a4Q4QwQ3PkGK9x5SAvYH24A/3YA/z4Ne+x37zWQ/30LaiyxXEcRgOdQqacVM19nyaFBFPuHglt3VMyX7CCabgUKkpeg+/t6IRDg70QA89SAiEEDmqImTVEDmx8ASEsHlrp0lxHRH74OReRnLsfQ/9cA/zMOXeMA9P+JviUA/c0A3cIAyiSwin0AvYciQYAjnV/0AL4/wI3wzUmcQOE2FyJLd4xfaUvWcP3jDSh8l4+4qpPxJ0QmcLF0IOwlENF9IUh04ys4AN5MAZgYEQgpMQJzfr+yqc9vANyqoN34Cf+8oNPhIKhfAETJAEYkYLDHbo12AhqIYms9AVs0AMxXARtx583VCcxRmS24DcxNbitRB0yJICHMCmSnAKZ1E8IrEUxCESJcEWsdDsGhF81r4NN16c0/ANXobeXt0JhGA3KfABH+ABGgACLNAJRYIN1WAOSEIaQW4ppi4LKSGS6o3ruj4Nw/YM+d6pbMoBHOABM4ADHtADP3AIv3ANSMJgJr/wxCEY3pCsMZpiZDoNz6ALpW7gBD0wAz3wkByfAzuAAyB/CKIuHKh+DSVxDevhDKHxD9be8i1u8aywizwgAzgwAjPgATiQA2Lwi04gB9m7FheS7A5y9GB/9PsQ9mQ/9mR/9mif9mq/9mzf9m7/9nAf93I/93Rf93Z/93if9w8REAA7',
"citywall":		imP + 'R0lGODlhSwBkAPcAAAAAAAkFBA8OAxkIDBoZCBwZFhQxACYTAyofAC4lGSspFCkpGiwyETEpDT0hACgnITsoKzg1JjI3MDs0MSRQBDRdEzxTGjdCKCtsBjltCjl/CUYoAEEzBUA2GFw9H00+LFtKFUdEKENJO0hFMUhFOkdUKlJLJ1RUIFVSPVtTOkJvH0x6GUZrK0x8KlZ8OlpyOGBBD21KCHxTDXZeInFfL2lmL0NESFxLTVNSRVZUT1xlRFlnVGBeTmliR2JhXmpnV213VHRoQX1gWndwVWp0YW9xbH1tY3JxYHtxZXt+a0aAF0SUBU2SG1WNJVaLLVCmDli5E1+hMWSNQGuJTnqKUnGeTX6WTXmbXWiIc3eHYX6BeHysVnu9SnXCOn6DgoRXCYZpC4BoH4plH5NmEp57E4BvPIxwNJV8Kox/ToB9YZiFFK6DAK6NKLGbIoeEX4iDWIuEaoaBcoSIdYmbaoeWcZeRbJyRZ5SSdZKSfZaseZCydJ6xd62bWaWWf6ekd6akfbWteY/CbpjQcIOahI6UhYmTlJmNgJWShZSpg52khZqljpamlp+npKCfkaekhqWjjqyihamnmqG5haO6kK62l6u2nrCyibu2iLe0lraznruylKa2paKyu6i1s7Ozpa/ckrzEjLDImLTemL/GrLzJornJrbzFtLjHvbzbqLXGybrR3ci+i8S2mMnKi8DHls3El8jDntHDntLOmcPAqcXIo8XEvcnFs8fXucrXsMjVv8rZvdnEs9PUrdjSrNnbq9DTu9vUvuDRrujivPLqu/r1vcvYzsPY2s3T19fTxNbVzdDdwdjcw8Pb+dfnzdrnx93lzdvsw93k0t3m3M/k6Mvm+c3q9NPn9NHj/NXu8tzs8dTx/Njz/t74++Hvzunpz+Hm0uPj3eLu1Obu3Ozm0+rq3Oj22fLrxP3nxvfzzPz0xf3wzfnz3P781fj43uXt4uzt6eLu8eHu/+fw4erx4+vx6ePy+O/09/Xz4/Hz6v397fX38/X6/fn79/3//AAAAAAAACH5BAEAAP8ALAAAAABLAGQAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3MhRnDdv4jiKRIgP3ziB38KFe7ZSoC5coSTNuTLlykiL4u5F87byWbdmzcIpUwYTlZ6jUly0aOHiip5Jk24yJCdQHMtnLMM1c8a1GdFQerZsieLEyVIVLZxUuXJljiVcUg+uEycuGtZnQJ0NzasXV9ixUZiYZcEigwYmUZpIycNLGLq4AukFxYu3Gd6hym4NheYMGqpQY58sEewCSwkVS56ojmLFlS9z5oZJnbeSK95ly5Qt83oL1y3NmXFJChQlcJMWVLBcaJEaypMoVUDx4uXLF6+R81hG4/07szLevnF9/+89SU8VKUtZZCGCxYUSJUyYKLGSZ+YeULJIWeJol/cvU6NUUkl3Q2kGVGaTSKLHFS68AMQQKEyAxDJUGFDBCi/MUQMLLbxAxR5+0EHEEBnNI85uy9xSyiaLKEKIIqUow1lnlt0C1nlOKMECCkfA8UEP7NjiQTCQOKKDChlksIIKDerAYxoX4bNdM7eYskkjjETCCCFEVDJUV0DdkkcVTTAhmgpEKDAFAy9cccIQ6FChAgUUKIlBBRWUcEEad8BBIkX84PNMiisy0kknx3DihRdamMJXZ6VcocETUDinxBQUNLGCEhooUYELK6imwRJQIKkCAW6sEoshC+AhUT/6SP9JqCeL1JLKMbhyooUPi2gWjjPd3CKJE2Y65xwGUYhW6RNMTFopFF08YYEFBrgRDCx1HBDJSRD10w8+VKpIySC13oprKkUUsYOj4XTzUx5OqMZEalFQwMSzlWLg7LNPGKCAI8HEAgcBdxSBhBwQ4SMOLlBNgoiLhCxyaCGFqKvFDooo40wzP02CrGpLLEHBFCow0UQUGqigAgbRqqaEASbEYQgkcBTgCTvj8HDIQ/iEY5QeeUhCCSKDEIKHHHIQscMOiyyCCMfdaFXOLSzo28ScFjySBQUWVGCAAAIEYIABLHytAyyQNIICAp7cEw4ySeDhKkM9fyLIWFfkMUkllFD/ImAlBw71DDTdlFPOIJngo8weL+iZySvg5LPH1xfcYIQNExAQQAA+7EILKCYsUIsjsIxDRCaHxBFHQ6gI0gUXUWyhdym/GaiMu9BwVs4zjRRBQjDreDPHC3T0IEQw54wDwQh0OAIJIJZ4ksPmf8gyiwIRNMJDBHH8sEkaj8ShRUOCcPE6F1s85ZvGQe0eTjnNlKMMEXCM0s467MipqStGwICGEAFAARwgAQlLpIEABfBBADDxhwVEIBrraEQjPDGOTCTiEYTwgiEY4rouvE4seUAFUEZYDnGE4xSK+Agu0MGOdKzDFysgFQYo0AMz0OADBIgAAghwABQEAAnJQEYB/yRAgB6M4x7r4MERUGALYCzjEXiIAyM4eD70VUEPtBNcNKIxCGU4whHtYIc50kEMYrRjGKFyDguAYA50oCACmEjEEEYQgAkgcRwBSIAP8rEOZLzRE43AQyQOQQg5EMITCxFF+aq4FlKM4hejGAUlUnCHZ7DjkuwYBjqGkY5MWiEDSrhTHdYBjAgsABJ/uAQktucNdNhCAeDIgSceIQdbjAMZcUid6gRpC4WgIhDl4wLsFJMHUvBtFLNwRCLa0Q5ikLGT0EyHNKnggjwJYxY/eAAJHOEHP1ziCCnIRzsS0QBkHGEWh7AFMmahujhEIglyOCYyEhIK4hSnOE6QgiRoMf+LWCzDHGEUozTTMYwWtpAY7FDHOQiKiyPIQRlJIIAjLvGHPxyBB8g4RAFwoIU4wOEHcSBBLn/wi0MkIRKVeKQy6HkFMjWhCUpYQWuEIQxvOGag6TCHOgg6DGJwsoznYMcr/uANW0AjHLUIgAncAIlM+HBzAWBEI7SAjEfYAg85Q0YjkrAJSkSyFPNEyCTQswINrCAtVvAFOhQ6jjESQ6E5VYc61kFGhLIjeChQhOHgpw8cCCAEKeDBABZwBFvkYALIWMc65LCOX8DtECJIxCxowc9TFCMhiHABkpYyhUBIAhqxQcc51FFGhLq1tOxARzouUQeetCMoR42GBIaACR//BSAS+ciHJ+x4VTjYAgU88AQB4DCLUsyiEqawbELo4AIWqGwKkvAFLQABCXRssq49TW1pO6kJdADhDu3Qyk+gIT8CpOGLkCjALBQbCRL8Ag53eMQR8hEJASThGbCgRSU2cYpjZAMhuaDDCyrAAhfMgRe26EEYaPDMMnZyHNgagQAm4E45dINwQCnH+44qDgbcwQ9/0MQC4uCNCBrhHnf4xSz4IQ0cLKAZwtCvxIwxjWkgxBRZeMELWDCFS/hiFx9oQxkGutZHGOEGBAhBHHJQgACQ4AelKEfhugGscBxVGQS7hB/qkAA5MJMHRchEA8CIjAgQYR3PGAUmHlEMbEwD/xv/PQiOS0DnOdBCGMFIQBvOMFB27EIAAxgAHiCRX1hQAgkCIIApysEVd3WmG9G4AB1ADAkBHKId0UiAIZCRiUaMgwBEGFQpEkGEU2ADG9U4NUJ+8YYZgMAEb4jFMHoR5BgIw6CQSAAKErA5AqTAEUO4QAAEsAjDUVljP1FGDxLRzfQ2Ih+IrgU+kiCBBaTBG87gBSV0kApuePvU2LgxH84ABhAEARbC8EUE2HCGWaADoXdIgTf8gIQIQFUEtihFAu/RjNzVrhS1EEEQLKHKCUCABAsIgBeSoblGNKM6lFDEJrRB8YpvIyF82LMZ6iALcwgDAWdYAyRSi440DAEWr/94BSx4QIBG/OKIEwhAEn5TCr45rBIiyCMc0jCAABDhHocIgAQYoAhgTGcUi0jFNrbhbW6c+uII4QMb1GAGO6CbGBEAwRr6gA5zsKMHKaDFKi7Ri3rnIxzrsEUACJEGINS8EopARCWSEDYBiGB6R7hfUiUwCExQAhOOGIW3l74Ni4c76mwgQxiCYIdeCMMHHWCDITLpxiGIfRUrR0Hw1jGLAPyCHb4YNR3oMAhFXEACtYgED/xqC3SswxMFwIMiEkGJNBDCHdwo/NK1cWptxPkg41Z8GMJQhjj4AAFqgMMY2ZEAI9hiFar6UTuEYY5dHCAWBH2DDuK+CBEQgATg4Ef/JB7wgGVQfxz2rSgdFjENwue+4tqwhjYwTm4wkOH+MeDAANiABjKiIwIJgASZ0AsrBwft4A3toHa9kEmkkAh0oAODIAALsABg5lcDAA7r0A6aoAB0MAdZsAnYwA3UsHTYwHQVRw3UkBB2EAZgYH9ksAZroAYD0AYgUAOw4AgIEAECcAB1MAtHEAnM1Ag5QADL4FPC0Au0MAdy8C9pkAKP4A27FQfjAAwhgAJZkAWd4HSEt3sUVw1eWA0qWAYseH8wqAYHQAY10AABsABD0AuzMAEDYEqNsAk8sDlxMAvSdA7nkG7XAwm9AAkpAAd9FAcRoABEsAmdUAzcUA27V3j1/6ANhVcNKJiCCJEIQHACYxiDbQAB+TcAluMHrXAJEKA5wxYAOeAFASACKRAEwqAOrZgO7WACfxALKgcHKDAL7TALOCACjOB0I7iFhEdxk0iJB0EIQKADIDADMQAGagAGmtMBcAAMmZAAH/AAPmALEiABAkAJ64APAfBsPeAGLWQOo2UCkOAHdgAIsgAIPTAEyMAPXmADhRAP7udt1bCI2zCJ1kCMBrEIWKADOnACIMABDjAAHVADvRAMjpACCoADnkBfHxAHC8BMtlAARYAMcBACCSVN45ACNDME8AULAvMBeMAPx+ADRdBthUdx3ACJ2qCPv2cQm4AFWEAEOmACHf/QAEYwC2mQBj9AACMADIp1Dw6EBDhQYp4QNhFwBD+QBrdmDjkwABOQAAkAgHEACwQYBClgC/lgC0XgBdPAiNsQgtrwhSUYkwWxCYOABTsAXGnQCq2wC0UQQNuCRN7wUROQAzxwP0L0UUaAD4TwA3dwAROgBTlAAp7gCYeAAybgkcAACdDIDu5ACCLgBcbwbV5oDdtQD9lQDwmxlmwpmLAAC3ewAAkQCfcwDj+QiyiQCJkQATZAAvcTBxBQiyhQCy22AJHwA4iJBIp5BE82AijwCLsAdrOQD/MjAZzQCT5QCKqQDZ0pf5+5Az9wBEMQB3IAAQNggLvAlUkwAkeQC7r/FQE+8AP5MAthAwivEAuQgAJxAA6RsABysFWEsAATlAPJkAy7OQKZoAkp0APIkA+dIAEPUAg+IAGdUGPWYA0JgTR9EAc9MAETcJEZGAcokJrAMA6PMAuRQAATEAFPhAMBYHWjGQw9cIvjkAQoEAlH8GyNYAOYYwiR8FtwEAxwEIj5oAU4gA/3YAs+wAnTsKAJAQd14AbbMwS2EEb30wOZkJrR8AOe4A5xADYBtA7jUABwEAuXMHaxUAcReQ+N8AORYJgTIKOHQAI8sA6PoANBEAyaoESZ8AGZYKU44JzVMH8IcQRLFAee4A2Z8Ajr0F5xYKX3cAR3oFhFwANxQAC//9AOv1AAfiAL6zmpq/ABKRAN0sADtaQJOWALtpA9OIAD90AIPIAJwTAEKYAEJJAD2Winh3cQ1Tmj64BiKFCdtaBY47AOkJCh+WAEPOCT9+ANwCAAqMoDQ4AEA9QLvZAGIXCcclAEh8ADCbBR4BANSNAIyXAE5uimPRCRImCRqvBmCWEIwBANjTBfGmoL94APpJSBcNADwtCrcRAC5jkOnWeKi1IEPiACO5AGs2AJJjAE7ZAMluMJhsADwaUFI8ADjTALH6AJmtALpZkuRRCut5AQtYAMwJA6VuUN4zAOnjALH/Gxd2AL3kACkBACRvAO+SBEhFAMtXAonbAJFSMCff/QC0HwAZ5gD3GABKpXC4dwBMUwCoeKCR8QC7CwCjggDotiDM1QCgkRDbbQCKojB4+wDLYQPlIorMx0gB8AByPwl8CAAg+ACWqWmIZyKIwgAkNgowhwobaAA4bAm4ZwkUlwBJ4wAmkAC4AwAvhQBIVQDKWACAnRaYdwCI1gC8oADLNwnZlgC0nApC/XDhGAByMAuARAAIQQCn+QCJVwCp3ACIzACctZnv/aARGADOOwACgpAEUgBz/wA4rbAdjCA/kgAoMwCHQQFQiBuJEwQZ66DMDgCJkQCXFQSHiQBPdwD0QUNhJAB5YwLixSCKkAuodCuugiAqO5PY8wAp7AD57/EADfKwcPyQNwAAdH4A4SQAR0gAgXixCJ6QmREAlWNQ66cVXqNEHbIgcFIAcigHq3MAclcKdlWQ2qYAycsAmbQLqKMgKasAuZwAMFQABx4AUFsGn+KweGQAJGcATgAGqkwBUJYQuZ4AmeOguz8LgqlgnAAAyaMAty8AAFEGW8kJCV0DQErJmFpwqgy8CcUAg24AqqMgRSaQMPYAtxMAKeigQ5kAOPIA6a2w7OUA4JkQyeagu7MAuP0AdWFQmegAxTSwIRUAjSsAy98AuwkAimEILUAIlbSA3GkAo+rCghEAt2fAg2MD0/UAuNkAmzkEMJcAi1IAA44A5UUcW2gMJ//5oJnbbIveMDcYAM6WYLwfAIRLAITbeF9bAPS2fAqZAKncDAIgAHuxALmmB3OeADkaAMCoAAkGALDZAAKVAEZrYQ4+Cpf4oJszBL86undwhJvHAJsbAJctAJXtiS7qd7S3fAn8zAheDAsZAGKIAPWmAI4JACIUALlwQLPaAJvzAupqAQ4ADGfmwLo/CnXJIEGUMKfjAHuLAMvzAIxnCCkJh7W0iPY1m9qaAKpJsDffAKbjACQGcEI5ACt9ZC6bBJNEULCxFEnlDCKdwIRNADjTAKuOAKe7AHk3AL2KCI2yCJKIjPhBcPbrx0xqAK+7zPXpACsJAGOpAPCgSvYuRMZf80DDbtCwsBDrbw0PQrB2kgB15FCqQwB1QwCKdwmS0J0igIjFtIcflIDSgtx50QApjQA+Y5AYeaSc80UDbtEJ1mNPFFC6PAC6CQB+t3CoyIgswwiUxd0o3YyTzMCafAA3cQAYcwDh8QDAIlTc4EG13dEISAQZkAC7MwmrAwCYlwCi9JDczQ2G3s1kzd1NSQatNgDIRQCyMgB/yJDAsQVG71TDYtGw7RCJHQN6XgCrSgCHiwCIqNgteAghanDcjc1m+9oMZQDIXAm4QIxhHwipxEUNL0GA+RCZtQCcc1Ci5y1NOw2Mrc1MHY1m48DdlwDLVACEkgAj/wQHiQArDB113/N0brABGb8LgplVzGoNQlncmRHdksmQ3SIL9ZEA5YEDYo0AN0JU3DsFOwYQ4SYSX81WbY8JJOrcxNZ89baOCEN4LucAqDAASJwGjNUAkRgAK3hlPBnQ4UcQqpYAzGUIK7Z+C5xw/cUA/UcA1Ll3sgvnTxUA/GsAmIMAmWAA3xYzilQAkHqA5avVPqUBHK7YVu7NQtOeLcEA/XUOQj+H72jOKKUwlZgAi5c1S/cmHQgAsObl08dRFeGJYE7Mbetg/8EA8lbuJMh+KyTYLVgAhZQAeSEAo/4Q4qIeVTXuOjYAm+AA0ZYZZA3uW5xwz4zMlMp+L2AA6j4AqggAjua2zl/+AOwHE7F4ZtpIAIrsARHw1uIVgP+fjak12PTjcNtYAEKABYWXAL8MMZWhE4yiBeegG1IqGZvLd01oDpbfx+9YwKkjAJJcABuM4BCMAAUdYNwqBh3cAT/eYN7mJlUmEN2bCg+ziJBVwN0/DJm3AHWQAEDcABGwADDuAAAVBsU6wV7eIM3sAxeQEZk63s1LCPWW4MnUAI4PQBIVDtMRDvMAADHtAI7fITQBHlWyHCkPEPJE4NQerszv7sjTAEJgACMLABHAADMTAGY/AFMGACd7AMjfYrG7MVltHvBGEN06AKzs7hLY4HZcDwMQADCy8DDg/xlDQKt4Dx+54bCvENCaHxDhYBDyB/CqfQCHZQBmLwBV8gA/H+BQ4vAzAQBG5ACb+x75YhDwoxD/2O81bSB29gBmLw8F9Q8kLv8DEQBGlACbTjFc/g9BrfEJvgCHCABmbg8A/P8DMgBm5PA2VAB16vGcvAEPQw9gWhCaxQ9W7vajNQBoD/Bm9Ae6UQDQ2BD3if+Iq/+Izf+I7/+JAf+ZI/+ZQfF97SD5Wf+Zq/+RYREAA7',
"earthwall":	imP + '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',
"rallypoint":	imPNG + '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',
"upgr0":		imP + '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',
"upgr1":		imP + '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',
"upgr2":		imP + 'R0lGODlhKAAnAPcAAC5KFzVMGDlXGENbHE1PLERfI1tXOlpeNUVmH0pnKE1lM051JFdtOlJ4Kld3MlZ6MlxzPVl8Nl58OmtkOFZTQVtgWmNgSGNhUmxsWWZ3R2p3UnZ6Unx4WWRpb2txbWxwdX9+ZH58bHV5fHp+gV6ELWCLMmiZLmWTMWyTPGydNGuZOnWnOWSDQWSATGiGR2iGSmyKTW+HU2+KUm+aQHCNT3uCV3CURXGXTnWcTHmWWnmAaXyWZXehSH2Bg4B0TIiTXYuLb46NcIiYbIWTfIuecYueepWSaZSdbZ2bcpybfoWkXImlaI2oc5GhfJGucJOrepird5i1eKGrfqPDfIyNjoWLkYmNkY2ThoyQlo+UmpSbjZ2fgpeck5qdnpuepJ6eq5ajgJargZuhi5ynl5yomp22g6CeoqCmh6Sphairgamrk6G0hqCyi6K9hKS7iqm3lraulLO0lLO2mrC7lbi1nb69k6CipKKmq6WspaWpraqtrq22oKywq6u8pa2wsrG2prK7o7a/rLm7p7u9q7W6tLW6vLa2wLS6wrm+xby/yKjGh63HkrLNjrfDn7HMk7TNnLvNm7nWmrXFoLbMprjEoLnCrbvPpbrDsr3Eu7PSoLzUor3cor3aqL/Xs77gpMXNm8HbncHJpcDLrcLLs8TKvMLco8PTs8XRusTZssvWtsvUusjbs8vZu9HKo9rbrtXTvtLbtdLfvcLhncLgpMvhtc/gv9LjvPHrs/Drv//xtv35tfz4u8XHxsDEyMTJysjLyMbM1MnN0szVws/dxczR1c/V3NLXxNDVy9LexNPZy9ncz9HU1tLV29Tb0tPZ3trc1NHU4dXa4djc4tvd69TixNfmy9rly97sx9rozNzj097k297r0eLiweTmze/nxuTl1+Hk3eLs1OTq3Onr3eTx1Ofz2P31wP/2yP76w/v5yPr53OPl4+Hl6uXr4ent4+rs6u/v8Ory4+7x6+7x8PDv5/L05/H06/P46/n67PL08vX49Pf4+fj59fz9+wAAAAAAACH5BAEAAP8ALAAAAAAoACcAAAj/APsJHEiwYD4zVN4VXMiwocN+zOyIsPOwosWBeXqNELFPoDx59uzVu2fPnbt8+fRdbOhFmh8Ry/K9SxYu3Laa4bBtE8fTHb+VBN/ZYRcszwcuw6zh3IaNVTVsTeMYswdU4LsRPYAVO4TFg6o9lWqSE3blFLZalJDQcVe1X547HaowYwbMioceV7CRI4fJihZryBqhifMtH9B8XpwVqnLImbNDWb50UUUOG6FDVXqcMpWK1bifK9f5YRdNS4gLFgwQuFBhTDlTeKT5ItOiyChq4aiuXFYIhAUQaEK5SnerDhIOFKhhInTpRYoXTcKkigf01wUgcNSdQ2fO3K3u545f/wi3CoeJEg9uuNmm0vBDeNdz5TKHrv6u7ubuuzJyAVkTGS+ogIIb1Iijj0oPXZCEN/Rx16B9u6BzizdJXNDNZlEoYQk12aD0UAgctNJdffThZ1936bzCgTWVkROONUrJ4x5D61BQxy731cedjt3hGGEudVBQGYzWsDJKMgoxFAyIuOyiC4k8mnNOOg3mtwsIT2iyii1vbJHEIO0wdBUGaKTj5Ig86shdhPWhAUIZmqBShBxACLIOQ7zcgYGIZ5b44Hdo5leHBUw88QgaZ6gxCDgM6UEMBbCko2aVVU45JTrEGbDEDm0I8YYYgTBakFDEGHCOLrtImmaD96VDJY7pGP/gxBJlQKFBCG88UxA+f5hhCAVNYqrmpJiO6B0uFORQAxNLkIACEcl0JBA/o+jARyEX8OlnmlQOa04rFyiyRA5LzMDDE7oaxg8yQyDiizTFJPHqg/SqumM6RlgQBSNutJEDDm50KJA7i/SRCDTTSMMBLmYSW9855/iZzjkcZCCBIhhjbEk7+diTDyCOlNIMNMG84QYa57BJL4k43jIxHBckAEAGGEehSCTxvKNMH5p4wskik3QSCSgZtNKtt9s5ucs5rXAAQQILJGDzFIpoIs46lbwRySybcL1JJGAbcQux9E3p4y1IWJBAAw3IvIQiU0CSjTaibF3K3aVoskgkpRz/8IPL6Dipy+A5prPfAQokgMADCRTAgiJRLFIgK1/PMosim2ReCiil0FBDHRNDLOl26aRRQwIQCIDCAgUokIHNijhiyjvUlCLL3W1kPgvfjjigAgE1INHKOd5404rpkezAQALj5uAE7DdHgoo81qwCCuelRGKzI7NoAsMJK6RQQ2oHlF8D35GU4cjNjDgSCcayRKIJMvKIU/vmd2+yCPezPNHACjyAwSZK8YQlaGIWpfAEAr8GNrAx4WaPSIU1ZCIObNDCcqXomu1KsYMEDAACZZhEDAIwgDIw4m6e8ETluvY+TryhEclohz46Jo94xCMcl+NeJDaRCUVMQAplyMEAzRzQAAnMYGucsxwC76YJRbxhFOBQyAxn2A994BCBsuDaLHxwBBYwrgELEAAJlqBET1wve25gwxsq0Yx1JKmK09JHPKhBi+ztbgM1WAIMEgC1BjwOgWb8miPW8IY3XOIY7XjHjArCj3vEwxbZ014b9raIBPBgCksYmiYa6Ig5vIEOpHiGG+exSGkJpCP3sEYpIMEIRshPE2WI3gBXCYpPpMIYyXhGFGXkIYZISx/yCAcsSvGJUsTCGlBBBSqoASNucKMb44CHPeRBSsN0JCAAOw==',
"upgr3":		imP + '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',
"reload":		imP + 'R0lGODlhEAAQAPcAAAAAAB82YSlGfTBTlDZgpjhqsjhwuDh3vTh+wjiHxjiOyjeXzjSo1TK12pqmv7CytLKztpKrzp2rx5G726Cyz6u40r/AwqLH4aPL46zM4qHS58rKzMrKzcvMzszMzsLH0MbM2N3e38ze683n7uDh4eDh4uLi4uHi4+Pj5OXl5ubm5+bn6Ozs7e/v7+/v8PDw8PDw8fLy8vLy8/T09AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiVAP8JFDhjBouBCBPKaNBgxImECVVoYBBjBcSEIhZgSHERoYkLCjKEGIgCBoqBJFy4SJBggsoSJV4kePHwXwsEOHMiUJnTRYl/HFQcGDpUhVCiB1QI7LDCgFOjTqM+FehhRYEVHDisUBGhQAGjHAZW7TDQQgUCFMJ2FMhBwgAQD9YCVSHAgdqOED4ECKBU7lwVG/yuDQgAOw==',
"smap":			imP + 'R0lGODlhDAAMAPcAAAB/DgAm//8AAP/YAICAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIPgAJCBxIcKAAAQQKKEy4kMBBhgUgClyoMGKBAAEmWqSIUaPEih5BgmSYcMAAiSQLmEQJAMDHhi1fRixIk0BAADs=',
"addbookmark":	imP + 'R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==',
"addbmthispage":imP + 'R0lGODlhFwAQAOZ/AP/69v+rQ/l8GPV+AfaEMf/RlfqKL/2qDP3Zvf/Kmv6SMvuuI/738f/x5v/kzf/m0vacBP/48v/PgPlxBfumZf/v4f717fu7i/dxCv/27//HlP/BivWRAv/GZv/59faEA/mscf/8+vmlCP16CfyMBf+1MvzHnv/BW/ZsBP/Fkf6ubf/Ytf+DFfulYvuzef26RP7n1fypZv///v/s3f7q2fqhWv/9/P57B//Sqv+zb/mAIf/fwv/69f/+/f+6ff7dwv6mWv2HIf6zLP/VsPvLqP+sYv/Oif2taf+fSfZ/JvigBvR4APicWPqpGf+LJP6/VPuWB//UpPmna//coP/frP/79/mvef7r3feNQPSMAf/juPy3gPhzCPeTSfyWQv+aQPyhL/7z6vmeDPvBl/qpbfusbviECf2qaPeiEvqmH/2pYv/AdP/o1f+uZ/6jNP+oWv+zXP/hx/zRsfuTHP7Xtf/Ylv/Lc//Ej//NoP/Ibf+/eft5DP58DPq4h/+9gv///yH5BAEAAH8ALAAAAAAXABAAAAf/gH9/PAkbgocAFRmHgkM4EYdVGgqQjBU+OIx/AG13kD0rLJWMO3pHNpo8RRshGUgqmn8NGkYCP7EJCjMafAiHMiFVO1F1YDEVHj2HcSxnTgYwIQ8PDjsreFp1JyNfPikadCFsBjojLX8efgFwawVUUxIdTwFuc2ZlkGoYNzWCHlsT0rzIY6fDiRcL0HwAwUAQkAn8EPVBIWZBiRJCmkAYYKWhoDdcbpxD5ILEgZMHlHyQ4lFQDi5BDDxglMCkiJtKBlywpEDHGQy+BFXJAUUEhwEcIGRhEubQjj0UZqAgc6iBl41YxnRZwoEAjUMqUFwJAUKAB0EOMCQhYuFPBjkEKZbc+lNFAIgQbikYOEvDRANNFkzAoKuAwiJBFlzs/IMqlg1lG1y0/RMIADs=',
"addbmspacer":	imP + 'R0lGODlhEwAQAOZrAP/+/f/8+vZrAPumZP/59f/7+P/JmP+SMf57B/x0APhuAPmAIf7r3fuiWvlvAP/69f/Gkvy0ef/BivqCIv727/+rYf/Ej/3ZvP/Ci/2qZ/dyDPdxCPqRPvumYv56CP/s3f6RMvytbPulYv58DP/t3f95AfqmZ/+JIP/9/Py8iv6nWv2NLvp+F/mIL/+EFvmKMv/hxv+aQPuxeP+uZ/VrBPqtcf/Sqv/GlPyqaP/69v+oWvhxB/uyef/Aiv/48//17f61ePxzAP/p1f/27/mrcf2QMf+MJv/27v7s3f57CP+LJPqpbf/Ytv/48vdtBP/9+/dsAPhyB/3Kov/79//59P/Wsv+CFP7n1f3YvPqILv/t3Pd4F//ewf3l0/+fSPyUPvt5DP/VsP/48f2pYv6vbfhzCP2HIf+IH/+mVv717f+wa////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGsALAAAAAATABAAAAengGtrDwYSgoeIYTZihwU3RVSIkjkzFk1rAEwuPpKdDxUYAUdeIZ2mBgcfECMXpp0wVjhKWVcorodPQisLHiKYt4hjGwgNaydnQUBVMSUJJGhGCV9rKjvEaw4KAjJSDlACDBPaHGs6UUkdwJJqZWYtXeqCWgcLGRpY8WtcYCZINEv5yDhhEKDGFgLqprAgEmDNkAEvEAIwVQDEAAqHfvBIcatHhDSCAgEAOw==',
"editbookmark": imP + 'R0lGODlhEAAQAOZ/AP/x5P7z6v7t3/SdBv/8+fq3hv/lzv/69P/cvP/17PiYUffYS/VuCfpzBfhuAfV5HfVqAffZhf/Fkfq8jvmqcf/7+f7p2PZ/KfV2Gf+3d/K/NvVqBPeuKP738fu+j//+/fZyEP/38f/Djv+cRfngqP/38PVzE/nplfbcb/+zb/isMf/Hlv+9hPXaZvTCSPTRYfnWZfeCKvXHWf+4efq6jPffefp+HP+gS/WcEfXTav/o0/jhiPbcaf+MJ/7IkvrbofVxEP/GkvXUJP/Qpv/TrPyrVfLMJf+uZvfQPPfhZvmwevz03P7v5P7m1P/Ytf7ox/PCQvadIvzJovLLQvjNTvnaafjWUvveqvjaU/G4Hf/XtO/DHP1+EPixNf2gUfu5XP+oW//jyv/kyvzln/2xcfZxEPdvBv+SMvqdMPSYFPafF/u9jPjUX/XMLf53Af+8f/qHKvnnifvqw/SeCv7q3P+JIP/u3/+fS/nWbPnfo/vuzP7uz//Il//LnP/o1P///yH5BAEAAH8ALAAAAAAQABAAAAfYgH+CgwRBd3aDiX8fJYs6TiIsBH8Jk4IJWnxhRAgAe24jK2deAoIARwB9Fno5UzVPEmNmTYNDGSdQUSBlaRpJHBSJGWIaGxMBARMbWW0xlwYpcg4TiR4OLQ5rATdvBi8gHYkhXBFVag82aFRbQOGDB3URC3MmAVIMRhAeiQg9KBAFLAiCg8dFAxEhDhiQ8IPNhURkvsSRUQTMDB9XlqhQMshPgwUckPDIQ2IHjC5CMAj8I0DBAwoXIGCxguMCBQYKSgkiwORPhQIDBtCo8IeOJUUsMTxwlygQADs=',
"del":			imP + 'R0lGODlhEAAQAPcAAAAAAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8W9u8i4tNanodqxqNqxqtqxrOC+udPFw9nS0NjT0t/c2+TKxebQyujSzuPd2+Pe3enV0O3e2+vj4ezl4+ro5+7o5+zr6+/t7fHk4fDs6/bt6vTt7PXu7fPy8fXy8fX19Pf29/n08vr29fr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjcAP8JHEjw3585dw4J9AMnDh5OBPucmNImyyVLXcagEfNmksBAC1asYYMFEiULUq6UMcNlEaIHJs6o+VJHIB8KOqpYueJlAokoacCA2DRwEAEUUKhUWYKETJgOkgo+2sBAyZOkVTAoKigwk4AAQ5o4YfKBq0A5BQwEMXIkCRE3lQraSTACR48bKYAUEaKF0UBACkjIqAHDg4YGOXz8uCDQkI0SLGK84CAJk4gDM3BIaNRpyw4WLVxUSDRQTwYIIf454kFDhYoIggpqKiTQE50BDhDkMVsw0h5CvAcGBAA7',
"bau": 			imP + 'R0lGODlhCgAQALMJAJyfokhLU5xmNlRXXl0xCnN2fMzNzX9LHY6RlP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAKABAAAAQwMMlJq73i4ENs7tV3cVdCludkAEiaGMWADAUyxUENGNKcI7ve4BeUDGsG3oSGUFIiADs=',
"ww":			imP + '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',
"pop":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAOCAYAAAAMn20lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAOFJREFUKFNNUEELAWEQnc2WC32/wJbyAxxwdXGS8gfsyUH8Bcqd3OVAFDflorg6bHKU4m+QtNoY84avbE07vTfvvZmP6PeVyhVOJJOczRdYocP74c6CnYKD4YSbnbb2tI/umfF2wynP4zB6KoGegvDmYBJT7UGf07ksV31fCRe+IGyJqkij+bIIAHJJ5a6UKA3ZMIBaLdIcgg2mVXH5ElhdFQBhZ61UEYTXzP9xGKjVG0zn98vBmnZd/EVhKIiuDnJAri9n8+sNrU5HFxkyFZdeCbE21FtMjT1MborJ8+ER+QOubZgWE4PrQAAAAABJRU5ErkJggg==',
"search":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAASxJREFUOE9jYBiaoHlTw//Qxf7/zWcaAenA/zuO7fy/89gOHpy+yViV9t94mh4GBolj1di0vuG/0WTd//mrcsGmg0wG0QVAvuFkHbgYio2B8wL+G03U/b/9yDawBhjYeWTHfwOgOEgew4mmfYb/9ft0MCWAKg36dP+D5DE0+c/0+6/bCXTGEYjTYGDbwW1gcf+Z/piaQO7Xbtf+n704B64RpCFrQdZ/rRYt7H7ymOj937bH/r9Wkw4GTp2X/n/HwR0WKM7z6vP5r1Wv89+63fZ/+eLK/34TA/7r1huA6foVjf93HdmNrsH3v2aNzn+bFgeQJNaAQLWhx/e/do3hf7t2l/97ju0lrMG/L/S/TpXRf/t21//7Tx4krAFk3eLty/47tXgAbdhPnAagHgBQL7l6a7VQzwAAAABJRU5ErkJggg==',
"vmkls":		imPNG + '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'
};

	//update script (by Richard Gibson, changed by ms99)
	function updScript() {
		divUpd = $d("<b><br>" + T('CHECKUPDATE') + "&nbsp;<br>&nbsp;</b>", [['id', 'updDiv']]);
		aD = $g(dmid1);
		if (aD) aD.appendChild(divUpd);
		if (!GM_getValue) return;
		GM_xmlhttpRequest({
			method: 'GET',
			url: TB3O.url + '?source', //don't increase the 'installed' count; just checking
			onload: function(result) {
				removeElement(divUpd);
				if (result.status != 200) return;
				if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
				nv = RegExp.$1;
				if (nv == TB3O.version) {
					alert(T('NONEWVER') + ' (v' + TB3O.version + ') !');
					return;
				} else if (nv < TB3O.version) {
					alert(T('BVER') + ' (v' + TB3O.version + ') ?!');
					return;
				} else if (window.confirm(T('NVERAV') + ' (v ' + nv + ')!\n\n' + T('UPDATESCRIPT') + '\n')) window.location.href = TB3O.url;
			}});
	};

	function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
	function $t(att) {var aTb = document.createElement("TABLE"); $at(aTb, att);	return aTb;};
	function $r(att) {var aRow = document.createElement("TR"); $at(aRow, att); return aRow;};
	function $c(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; $at(aCell, att); return aCell;};
	function $img(att) {var aImg = document.createElement("IMG"); $at(aImg, att); return aImg;};
	function $a(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; $at(aLink, att); return aLink;};
	function $i(att) {var aInput = document.createElement("INPUT"); $at(aInput, att); return aInput;};
	function $d(iHTML, att) {var aDiv = document.createElement("DIV"); aDiv.innerHTML = iHTML; $at(aDiv, att); return aDiv;};
	function dummy() {return;};//does nothing. Used when there is no other choice but need to use a function
	function getRndTime(maxrange) {return Math.floor(maxrange * (0.6 + 0.4 * Math.random())); };
	function basename(path) {return path.replace(/.*\//, "");}; //name of a file from a path or URL
	function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);};//returns the element with the aID id (wrapper for getElementById)
	function arrayByN(a, n) {var b = arrayClone(a); for (var i in b) {b[i] *= n;}; return b;};//multiply every element of the "a" array by "n"
	function arrayClone(a) {var b = new Array(); for (var i in a) {b[i] = a[i];}; return b;};//return a copy of the "a" array
	function dF(s) {var s1 = unescape(s.substr(0, s.length - 1)); var t = ''; for (i = 0; i < s1.length; i++) t += String.fromCharCode(s1.charCodeAt(i) - s.substr(s.length - 1, 1)); return t;};
	function arrayAdd(a, b) {if (!a) return arrayClone(b); if (!b) return arrayClone(a); var c = new Array(); for (var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]); return c;};
	function removeElement(ex) {if (ex && ex.parentNode) ex.parentNode.removeChild(ex);};//remove the "ex" element from the current document
	function T(xT) {if (xLng[xT] != undefined) return xLng[xT]; else return '---';};//translated xLng item if available
	function moveElement(ex, dest) {removeElement(ex); dest.appendChild(ex);};//move the "ex" element from the current parent to the destination "dest" node of the DOM
	function arrayToInt(arr) {var h = 0; for (var i in arr) {h += arr[i];}; return h;};//Sum all the values of the arr array
	function insertAfter(node, referenceNode) {node.parentNode.insertBefore(referenceNode, node.nextSibling);};//insert a referenceNode after a specified node
	function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;};//Create a new element of the DOM (type, innerHTML)
	function $ls(aX) {return aX.toLocaleString();};//convert a number to local string
	function getCrtServer() {crtPage.search(/http:\/\/(.*)\//); TB3O.fullServerName = RegExp.$1; TB3O.gServer = TB3O.fullServerName.replace(/\.travian\./,''); return;};
	function getUserID() {uLink = $xf("//div[@id='" + dleft + "']//a[contains(@href, 'spieler.php')]"); if (uLink) TB3O.UserID = uLink.href.split("uid=")[1]; uLink = null; return;};
	function composeGMcookieName(aName, addNewDid) {nC = (addNewDid && addNewDid == true ? TB3O.gServer + '_' + TB3O.UserID + '_' + actV.vNewdid + '_' + aName : TB3O.gServer + '_' + TB3O.UserID + '_' + aName); return nC;};
	function getGMcookie(aName, addNewDid) {return decodeURIComponent(GM_getValue(composeGMcookieName(aName, addNewDid), false));};
	function deleteGMcookie(aName, addNewDid) {nc = composeGMcookieName(aName, addNewDid); GM_deleteValue(nc);};
	function xy2id(x, y) {return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));};//get the vID of the cell having the x,y coordinates
	function toSeconds(hTime) {p = hTime.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);};//Compute the seconds for a given human time
	function log(level, msg) {if (console != undefined && level <= TB3O.O[69]) console.log(msg);};//Custom log function (log level, message to log)
	function getNewdidFromLink(aLink) {aLink.search(/\?newdid=(\d+)/);return RegExp.$1;};
	function insertTravMapUserLink(aNode, uid, strName) {aNode.parentNode.insertBefore(createMapLink("user", uid, strName), aNode.nextSibling);};//insert Travmap link
	function insertWALink(aNode, uid) {aNode.parentNode.insertBefore(createStatLink("user", uid), aNode.nextSibling);};//insert Travian World Analyser link
	function getColorResBarTooltip(p) {return (p < 90 ? "rgb(" + parseInt(p / 90 * 255) + "," + (100 + p) + ",0)" : "rgb(255," + parseInt((100 - p) / (100 - 90) * 170) + ",0)");};	//by Acr111 (adapted by ms99)
	function getOrigBRTable() {var oT = $xf("//table[@class='tbg'] | //table[@class='std reports_read'] | //table[@class='reports std']"); if (!oT) oT = $g("report_surround"); return oT;};
	function getDR(race) {var tt = 1;switch (race) {case "Teutons" : tt = 11; break; case "Gauls" : tt = 21; break;}; return tt;};
	function getTTime(iTT, xRace, arX) {var tt = getDR(xRace); return Math.round(arX[0] * 3600 / uc[tt + iTT][8] / arX[4] + arX[1] * 3600 / uc[tt + iTT][8] / arX[4] / (1 + arX[2]/10));};
	function getMTime(qDist, xRace) {return Math.round(qDist * 3600 / mts[xRace] / (crtPage.match(/speed/) || crtPage.match(/research/) ? 3 : 1));};	
	function setOfferFilter(aOffer, aFilter) {$at(aOffer, [['style', 'display:none;'], ["filtro" + aFilter, "on"]]);};
	function isPostNPC() {return $xf('//p/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[@class="res"]', 'r').snapshotLength == 8;};//check if we are on the page where the NPC trade has been finished
	function composeGMcookieNameV2(aName) {return TB3O.gServer + '_' + TB3O.UserID + '_' + aName;};
	function getGMcookieV2(aName) {var nC = composeGMcookieNameV2(aName); return gmcookie = eval(GM_getValue(nC, '({})'));};
	function toJSvoid() {aX = $xf("//a[@href='#']", 'l'); for (var i = 0; i < aX.snapshotLength; i++) aX.snapshotItem(i).href = jsVoid;};//convert # links to jsVoid
	function toNumber(aValue) {return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));};
	function hideTT() {$g("tb_tooltip").style.display = 'none';};
	function createTooltip() {var ttD = $d("", [["id", "tb_tooltip"]]); document.body.appendChild(ttD); document.addEventListener("mousemove", updateTooltip, 0); return ttD;};
	function reloadMapFunctions() {TB3O.origMap = false; mapFunctions();};
	function updProcRBTT(i, procNo, prC) {prSpan = $e("SPAN", procNo + "%"); $at(prSpan, [["id", "resbarProc_" + i], ["style", "color:" + prC + ";" + (procNo > 90 ? ' ;text-decoration:blink; ' : '')]]); return prSpan;};
	function createCNDiv(lvl, nlvl) {var csB = ((TB3O.O[45] == '1' && nlvl && nlvl[1].indexOf("(") != -1) ? 'text-decoration:blink;' : ''); return $d(lvl, [['style', 'visibility:visible;' + csB], ['class', 'CNbuildingtags']]);};
	function isThisNPC()  {return $xf('//table[@id="npc"] | //tr[@class="rbg"]/td[@colspan="5"]', 'r').snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;};//check if NPC page
	
	function $xf(xpath, xpt, startnode, aDoc) {
		if (!aDoc) aDoc = document;
		if (!startnode) startnode = document;
		var xpres = XPFirst;
		switch (xpt) {
			case "i": xpres = XPIterator; break;
			case "l": xpres = XPList; break;
			case "r": xpres = XPResult; break;
		};
		var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
		return (xpres == XPFirst ? ret.singleNodeValue : ret);
	};

	function setUserName(aTb) {
		var aTxt = aTb.rows[0].cells[0].textContent;
		var bSUN = false;
		var xi = aTxt.indexOf(" ");
		var aUN = aTxt.substring(xi + 1);
		if (crtPage.indexOf('spieler.php?uid=') != -1) {
			if (crtPage.indexOf(TB3O.UserID) != -1) bSUN = true;
		} else bSUN = true;
		if (bSUN == true) {TB3O.U[0] = aUN; setGMcookieV2('UserInfo', TB3O.U, 'UsI');};
		return aUN;
	};
	
	function getUserName() {
		if (TB3O.U[0] == '') {
			var ansdoc, ans, aValue;
			var profileLink = "/spieler.php";
			ajaxRequest(profileLink, 'GET', null, function(AJAXrespX) {
				ansdoc = document.implementation.createDocument("", "", null);
				ans = $e('DIV');
				ans.innerHTML = AJAXrespX.responseText;
				ansdoc.appendChild(ans);
				aValue = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg'] | //*[@id='profile']", 'f', ans, ansdoc);
				if (aValue) setUserName(aValue);
			});
			profileLink = null;
			aDoc = null;
			ans = null;
			aValue = null;
		}
		return;
	};

	function getLanguageAndPlusStatus() {
		iP = $g("logo");
		if (iP) {
			if (iP.nodeName == "A") {
				if (iP.firstChild && iP.firstChild.className == "logo_plus") TB3O.plusAcc = true;
				ahref = iP.href;
				TB3O.M35 = 2;
			} else if (iP.nodeName == "IMG") {
				if (iP.className && (iP.className == "plus" || iP.className == "logo_plus")) TB3O.plusAcc = true;
				ahref = iP.parentNode.href;
				TB3O.M35 = 1;
			};
			if (ahref) {
				aLang = ahref.split(".");
				TB3O.language = aLang[aLang.length - 1].replace("/", "");
			};
			ahref = null;
		} else {
			//T3.1
			iP = $xf("//img[contains(@src, 'plus.gif')]");
			if (iP) {
				iP.src.search(/\/img\/([^\/]+)\//);
				TB3O.language = RegExp.$1.substring(0,2);
			};
			if ($xf("//img[contains(@src, 'travian1.gif')]")) TB3O.plusAcc = true;
		};
		iP = null;
	};

	function setGMcookie(aName, aValue, addNewDid) {
		if (TB3O.UserID != '0') {
			nc = composeGMcookieName(aName, addNewDid);
			if (aValue) GM_setValue(nC, encodeURIComponent(aValue)); else GM_setValue(nC, false);
		};
	};

	function addGMcookieValue(aName, values, addNewDid) {
		var newValue = '';
		for (var i = 0; i < values.length; i++){
			if (values[i] != ''){
				newValue += values[i];
				if (i != values.length - 1) newValue += '$';
			} else return;
		};
		var valC = getGMcookie(aName, addNewDid);
		if (valC != "false" && valC != '') valC += "$$" + newValue; else valC = newValue;
		setGMcookie(aName, valC, addNewDid);
	};

	function removeGMcookieValue(aName, indexNo, reloadPage, aFunctionToRunAfter, addNewDid) {
		return function(){
			if (confirm(T('ELIMINAR') + ". " + T('QSURE'))) {
				var valC = getGMcookie(aName, addNewDid);
				if (valC != "false" && valC != '') {
					valC = valC.split("$$");
					valC.splice(indexNo, 1);
					valC = valC.join("$$");
					setGMcookie(aName, valC, addNewDid);
					removeElement($xf("//*[@id='" + aName + "']"));
					if (reloadPage) history.go(0); else aFunctionToRunAfter();
				};
			};
		};
	};

	/**
	 * Create the path of the image, taking into account a local GP
	 * Params: ref Relative path of the image
	 * Returns: Absolute path of the image
	 */
	function img(ref, ld) {
		var imgPath = '';
		if (TB3O.T35 == true) imgPath = (!ld ? localGP + "img/" + ref : localGP + "img/lang/" + TB3O.language + '/' + ref); else imgPath = (!ld ? localGP + "img/un/" + ref : localGP + "img/" + TB3O.language + '/' + ref);
		return imgPath;
	};
	
	//Inverse function for xy2id(x,y) => id2xy(vid) - fr3nchlover.
	function id2xy(vid) {
		var arrXY = new Array;
		var ivid = parseInt(vid);
		arrXY[0] = (ivid%801?(ivid%801)-401:400);
		arrXY[1] = 400 - (ivid - 401 - arrXY[0]) / 801;
		return arrXY;
	};

	//inverse of "toSeconds" -> convert seconds to "human understandable time" => format h:mm:ss (or h:mm:s?)
	function formatTime(sec, aFormat){
		//aFormat: 0 = h:mm:ss (h = 0->... can be more than 24); 1 = days, h:mm:ss; 2 = h:mm:ss (h = 0->23:59:59 = only time)
		if (sec > -1) {
			var h = Math.floor(sec/3600);
			var m = Math.floor(sec/60) % 60;
			var s = parseInt(sec % 60);
			var ht = "";
			switch (aFormat) {
				case 1: var d = Math.floor(h/24); h = h - d * 24; ht += d + ", "; break;
				case 2: h = h % 24; break;
			};
			ht += h + ":" + (m > 9 ? m: '0' + m) + ":" + (s > 9 ? s : '0' + s);
		} else ht = "0:00:0?";
		return ht;
	};

	//get the active village from the villageList
	function getActiveVillage() {
		var aV = $xf("//td[@class='dot hl'] | //div[@id='vlist']//table[@class='vlist']//tr[@class='sel']//a | //a[@class='active_vl']/../../td/table/tbody/tr/td");
		var v = ['', '', '', -1000, -1000, ''];

		if (aV) {
			try {
				if (TB3O.M35 == 2) {
					var tr = aV.parentNode;
					if (tr.cells.length > 3) {
						v[3] = tr.cells[2].textContent.replace("(", "");
						v[4] = tr.cells[4].textContent.replace(")", "");
						v[1] = xy2id(v[3], v[4]);
						v[0] = tr.cells[1].textContent;
						v[5] = tr.cells[1].firstChild;
						v[2] = getNewdidFromLink(v[5].href);
					} else {
						var tmpC = tr.cells[2].textContent.replace("(", "").replace(")", "").split("|");
						v[3] = parseInt(tmpC[0]);
						v[4] = parseInt(tmpC[1]);
						v[1] = xy2id(v[3], v[4]);
						v[0] = tr.cells[1].textContent;
						v[5] = tr.cells[1].firstChild;
						v[2] = getNewdidFromLink(v[5].href);
					};
				} else if (TB3O.M35 == 0) {
					v[3] = aV.textContent.replace("(", "");
					aV = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]');
					v[4] = aV.textContent.replace(")", "");
					v[1] = xy2id(v[3], v[4]);
					v[5] = $xf('//a[@class="active_vl"]');
					if (v[5]) v[0] = v[5].textContent;
					v[2] = getNewdidFromLink(v[5].href);
				} else if (TB3O.M35 == 1) {
					v[3] = aV.parentNode.parentNode.cells[2].textContent.replace("(", "");
					v[4] = aV.parentNode.parentNode.cells[4].textContent.replace(")", "");
					v[1] = xy2id(v[3], v[4]);
					v[0] = aV.textContent;
					v[5] = aV;
					v[2] = getNewdidFromLink(v[5].href);
				};
				actV = new xVillage(v[0], v[1], v[2], v[3], v[4], v[5].href);
			} catch(e) {
				getActiveVillageFromCookie();
			};
		} else getActiveVillageFromCookie();
		v = null;

		function getActiveVillageFromCookie() {
			var xy = id2xy(TB3O.U[4]);
			actV = new xVillage(TB3O.U[3], TB3O.U[4], TB3O.U[5], xy[0], xy[1], 'dorf1.php?newdid=' + TB3O.U[5]);
		};
	};

	//used to move down the resource field/building upgrade tables
	function deltaTopY(aTb){
		var maxY = 0;
		if (TB3O.T35 == false) {
			var y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			var de = $g(dTop1); if (de) y[0] = parseInt(de.clientHeight);
			de = $g(dlright1); if (de) y[1] = y[0] + parseInt(de.clientHeight);
			de = $xf("//td[@class='menu']"); if (de) y[4] = y[0] + parseInt(de.clientHeight);
			de = $g("navi_table"); if (de) y[9] = y[0] + parseInt(de.clientHeight) + 30;
			de = $g(dleft); if (de) y[2] = y[0] + parseInt(de.clientHeight);
			de = $g("lmidlc"); if (de) y[3] = y[0] + parseInt(de.clientHeight);
			de = $g(dmid); if (de) y[7] = y[0] + parseInt(de.clientHeight);
			de = $g("lres0"); if (de) y[8] = y[0] + parseInt(de.clientHeight);
			de = $g("ltbw1"); if (de) y[8] += parseInt(de.clientHeight);
			de = $g("lrpr"); if (de) y[8] += parseInt(de.clientHeight);
			de = $g("ltrm"); if (de) y[8] += parseInt(de.clientHeight);
			de = $g("lbau1"); if (de) y[8] += parseInt(de.clientHeight);
			de = $g("map_content"); if (de && de.firstChild) y[5] = y[0] + 10 + parseInt(de.firstChild.clientHeight);

			y[6] = y[2];
			if (y[9] >= y[6]) y[6] = y[9];
			if (y[4] >= y[6]) y[6] = y[4];
			if (y[3] >= y[6]) y[6] = y[3];
			if (y[7] >= y[6]) y[6] = y[7];
			if (y[8] >= y[6]) y[6] = y[8];
			if (y[5] >= y[6]) y[6] = y[5];
			if (y[6] < 0) y[6] = 0;
			maxY = y[6] - Math.floor(y[0] * 3/4 - 30);
			de = null;
		} else {
			dfooter = $g("footer");
			if (dfooter) maxY = dfooter.offsetTop + 50;
		};
		return maxY;
	};

	function computeTextTime(aD){
		var dtNow = new Date();
		//var h = ((aD.getTime() - dtNow.getTime()) / 1000 / 3600);
		//h += dtNow.getHours() + (dtNow.getMinutes() / 60);
		var h = ((aD.getTime() - dtNow.getTime()) / 1000 / 3600) + dtNow.getHours() + (dtNow.getMinutes() / 60);
		var timeR = '';
		if (h < 24) timeR = ""; else if (h < 48) timeR = T('TOMORROW'); else if (h < 72) timeR = T('DAYAFTERTOM'); else timeR = T('ON') + " " + to2Str(aD.getDate()) + "/" + to2Str((aD.getMonth()+1));
		return timeR + " " + T('AT') + " " + to2Str(aD.getHours()) + ":" + to2Str(aD.getMinutes());

		//convert to a 2 digit string (time representation)
		function to2Str(n) {return (n > 9 ? n : '0' + n);};
	};

	function calculateTime(needed){
		var maxTime = 0;
		var aTime = 0;
		for (var i = 0; i < 4; i++){
			restante = needed[i] - crtResUnits[i];
			if (restante > 0){
				aTime = Math.round(restante / (prodPerHour[i] / 3600));
				if (aTime > maxTime) maxTime = aTime;
				if (aTime < 0) maxTime = 'Infinity';
			};
		};
		if (maxTime > 0 && maxTime != 'Infinity') maxTime = formatTime(maxTime + 5, 0);//5 sec delay for JS timers
		return maxTime;
	};

	//add the fill time row
	function addFillTimeRow() {
		var tbe = $g('l4').parentNode.parentNode;
		var tbecn1 = tbe.childNodes[0];
		var aRow = getFillTimeRow();
		tbe.insertBefore(aRow, tbecn1);
	};

	//compute fill time
	function getFillTimeRow() {
		var ttfR = $r();
		var aC, aT, sttf;
		for (var i = 0; i < 4; i++){
			timeToFill[i][0] = -1;
			if (prodPerHour[i] < 0) {
				timeToFill[i][0] = Math.round(crtResUnits[i] / (-prodPerHour[i] / 3600));
				sttf = formatTime(timeToFill[i][0], 0);
			} else if (prodPerHour[i] > 0) {
				timeToFill[i][0] = Math.round((capacity[i] - crtResUnits[i]) / (prodPerHour[i] / 3600));
				sttf = formatTime(timeToFill[i][0], 0);
			} else if (prodPerHour[i] == 0) {
				timeToFill[i][0] = -1;
				sttf = "Infinity";
			};
			if (sttf == -1) {
				aC = "#008000";
				aT = T('NEVER');
			} else if (timeToFill[i][0] <= 0) {
				aC = "#FF0000";
				aT = sttf.blink();
			} else if (timeToFill[i][0] < 7200 || prodPerHour[i] < 0) {
				aC = "#FF0000";
				aT = sttf;
			} else {
				aC = "#008000";
				aT = sttf;
			};
			timeToFill[i][1] = "<span id='timeouta' style='font-weight:bold; font-size:7pt; color:" + aC + "; white-space:nowrap;'>" + aT + "</span>";
			var pS = (prodPerHour[i] < 0 ? "<span style='color:#FF0000'>" + prodPerHour[i] + "</span>" : "" + prodPerHour[i]);
			aCell = $c('(' + pS + ', ' + timeToFill[i][1] +')', [['style','font-size:7pt; text-align:' + docDir[0] + '; padding-' + docDir[0] + ':25px; white-space:nowrap; vertical-align:top;'], ['colspan','2']]);
			ttfR.appendChild(aCell);
		};
		return ttfR;
	};
	
	//get current resource units, capacity of warehouse/granary, production per hour
	function getResourceInfo() {
		crtResUnits[4] = 0;
		prodPerHour[5] = 0;
		intImg = 0;
		for (var i = 0; i < 4; i++){
			aX = $g('l' + (4-i));
			if (aX) {
				//available resource units
				resIppH = aX.textContent.split("/");
				crtResUnits[i] = parseInt(resIppH[0]);
				crtResUnits[4] += crtResUnits[i];
				//capacity of warehouse/granary
				capacity[i] = parseInt(resIppH[1]);
				//production/h for this resource
				prodPerHour[i] = parseInt(aX.title);
				//sum of production/h for this village (crop = effective production)
				prodPerHour[5] += prodPerHour[i];

				if (i > 0 && TB3O.T35 == false) intImg = 1;
				//resource titles
				aS = aX.previousSibling;
				if (aS) {
					cellImg = aS.previousSibling;
					if (cellImg) {
						resImg = cellImg.childNodes[intImg];
						if (resImg) xLng['RES' + (i + 1)] = resImg.title;
					};
				};
				if (i == 3) {
					//real crop production of this village (last cell of the row)
					cpRow = aX.parentNode;
					intLastCell = cpRow.cells.length;
					ccCell = cpRow.cells[intLastCell - 1];
					if (ccCell.id == "l" + (4-i)) {
						cpTable = cpRow.parentNode;
						intLastRow = cpTable.rows.length;
						cpRow = cpTable.rows[intLastRow - 1];
						intLastCell = cpRow.cells.length;
						ccCell = cpRow.cells[intLastCell - 1];
					};
					arrCcTxt = ccCell.textContent.split("/");
					//real total crop production of this village
					prodPerHour[4] = parseInt(arrCcTxt[1]);
					prodPerHour[6] = parseInt(arrCcTxt[0]);
					try {
						//text for "crop consumption"
						aX = ccCell.previousSibling.previousSibling.getElementsByTagName("IMG");
						xLng['RES5'] = aX[0].title;
					} catch(e) {};
				};
			};
		};
	};

	//change the browser title, get active village coords and coords for the cell/oasis/village opened from the map
	function getCrtLocation() {
		crtLocTitle = '';
		var locX;
		
		if (crtPage.indexOf('dorf3') != -1) {
			//the dorf3 page
			TB3O.xCrt = actV.vx;
			TB3O.yCrt = actV.vy;
			crtLocTitle = T("ALDEAS") + " (" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
		} else {
			locX = $xf("//h1");
			locXx = $xf("//span[@id='x']");
			locXy = $xf("//span[@id='y']");

			if (locXx) TB3O.xCrt = parseInt(locXx.textContent);
			if (locXy) TB3O.yCrt = parseInt(locXy.textContent);

			if (locX && !locXx && !locXy) {
				aH = new Array();
				theName = locX.textContent;
				ipLast = theName.lastIndexOf(")");
				if (ipLast + 1 == theName.length || ipLast + 2 == theName.length) {
					if (ipLast > 0) theName = theName.substring(0, ipLast + 1);
					ipLast = theName.lastIndexOf("(");
					if (ipLast != -1) {
						aH[0] = theName.substring(0, ipLast);
						aH[1] = theName.substr(ipLast + 1);
					} else aH[0] = theName;
					crtLocTitle = aH[0];
					if (aH.length > 1) {
						strXY = aH[1].replace(")", "").replace(" ", "").replace(" ", "");
						aCoord = strXY.split("|");
						TB3O.xCrt = parseInt(aCoord[0]);
						TB3O.yCrt = parseInt(aCoord[1]);
						crtLocTitle += " (" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
					} else {
						TB3O.xCrt = actV.vx;
						TB3O.yCrt = actV.vy;
						strXY = "(" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
						if (crtLocTitle.indexOf(strXY) == -1) crtLocTitle += " " + strXY;
					};
				} else {
					TB3O.xCrt = actV.vx;
					TB3O.yCrt = actV.vy;
					crtLocTitle = theName + " (" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
				};
			} else {
				if (locX != null) {
					crtLocTitle = locX.textContent;
					strXY = "(" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
					if (crtLocTitle.indexOf(strXY) == -1) crtLocTitle += " " + strXY;
				};
			};
		};
		//change browser title
		TB3O.BrT = crtLocTitle.replace(/\n/g, "");
		document.title += " - " + TB3O.BrT;
		return true;
	};

	/**
	 * Function to get/post information via asynchronous request (AJAX) to/from a server
	 * Parameters:
	 *	url: URL of the page to get/post from/to the game server
	 *	method: GET or POST (usually only get)
	 *	param: Parameters URI encoded Parametros (only for POST)
	 *	onSuccess: Function to call if the request is successfully
	 *	onFailure: Function to call in case the request is not successfully
	 */
	function ajaxRequest(url, aMethod, param, onSuccess, onFailure){
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = function() {
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);
			else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);
		};

		xmlHttpRequest.open(aMethod, url, true);
		if (aMethod == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		xmlHttpRequest.send(param);
	};

	function getRaceV3() {
		//co-author Booboo
		imgQM = $g("qgei");
		if (!imgQM) return false;
		clName = imgQM.className;
		if (clName) {
			if (clName.indexOf("l1") != -1) {TB3O.U[1] = avRace[0]; TB3O.U[7] = 1;};
			if (clName.indexOf("l2") != -1) {TB3O.U[1] = avRace[1]; TB3O.U[7] = 11;};
			if (clName.indexOf("l3") != -1) {TB3O.U[1] = avRace[2]; TB3O.U[7] = 21;};
			setGMcookieV2('UserInfo', TB3O.U, 'UsI');
			getDisplayRace();
			return TB3O.U[1];
		};
	};
	
	function getDisplayRace() {
		//get display race from the Profile page
		profileLink = "/spieler.php";
		ajaxRequest(profileLink, 'GET', null, function(AJAXrespX) {
			var ansdoc = document.implementation.createDocument("", "", null);
			var ans = $e('DIV');
			ans.innerHTML = AJAXrespX.responseText;
			ansdoc.appendChild(ans);
			var aValue = $xf("//table[@class='tbg']/tbody/tr[5]/td[2] | //td[@class='details']//table/tbody/tr[2]/td[1] | //table[@id='profile']/tbody/tr[3]/td[1]", 'f', ans, ansdoc);
			if (aValue) {
				TB3O.U[2] = aValue.textContent;
				setGMcookieV2('UserInfo', TB3O.U, 'UsI');
			}
		});
		return true;
	};
	
	function setRace(ti) {
		switch (ti) {
			case '1': TB3O.U[1] = avRace[0]; TB3O.U[7] = 1; break;
			case '11': TB3O.U[1] = avRace[1]; TB3O.U[7] = 11; break;
			case '21': TB3O.U[1] = avRace[2]; TB3O.U[7] = 21; break;
		};
		setGMcookieV2('UserInfo', TB3O.U, 'UsI');
	};
	
	function getRace() {
		if (TB3O.U[1] == '' || TB3O.U[2] == '') getRaceV3();
		if ((TB3O.U[1] == '' || TB3O.U[2] == '') && TB3O.avBar == true) {
			//race cookies are undefined - enter the barracks
			var barracksLink = "build.php?gid=19";
			ajaxRequest(barracksLink, 'GET', null, function(AJAXrespX) {
				var ansdoc = document.implementation.createDocument("", "", null);
				var ans = $e('DIV');
				ans.innerHTML = AJAXrespX.responseText;
				ansdoc.appendChild(ans);
				var aValue = $xf("//img[starts-with(@class, 'unit')] | //img[@class='unit']", 'f', ans, ansdoc);
				//log(3, "aValue = " + aValue.className);
				if (aValue) setRace(getTroopIndexTitleFromImg(aValue)[0]); //race recognition - first image in table of troops
			});
			getDisplayRace();
		};
		if (TB3O.U[1] != '') TB3O.U[7] = (TB3O.U[1] == "Teutons" ? 11 : (TB3O.U[1] == "Gauls" ? 21 : 1));
		return TB3O.U[1];
	};

	//Get general information
	function getGeneralData() {
		//pre-logging
		TB3O.O[69] = 10;

		//Path to the graphic pack (if available)
		//empty graphics set support added
		cssDeclaration = $xf("//link[starts-with(@href, 'file') and @rel='stylesheet']");
		if (cssDeclaration) {
			csshr = cssDeclaration.href;
			csshr.search(/^file:\/\/[^\/]*\/(.*\/)?(.*)\.css/);
			localGP = RegExp.$1;
			localGP = 'file://' + localGP;
		};
		log(3, "localGP = " + localGP);
		//game version
		if (!$g(dTop5)) setT35Constants();
		
		getLanguageAndPlusStatus();
		getUserID();
		getCrtServer();
		
		//setup options
		var tmpTB3SV;
		var aTB3S = getGMcookieV2("TB3Setup");
		if (!aTB3S || !aTB3S['SETUP']) {
			//try to get old values
			var boolSaveTB3O = false;
			for (var xi = 0; xi < TB3O.oldOpt.length; xi ++) {
				tmpTB3SV = getGMcookie(TB3O.oldOpt[xi], false);
				if (tmpTB3SV != 'false') {
					if (tmpTB3SV == 'min') tmpTB3SV = '0'; else if (tmpTB3SV == 'max') tmpTB3SV = '1';
					TB3O.O[xi] = tmpTB3SV;
					boolSaveTB3O = true;
					GM_deleteValue(TB3O.oldOpt[xi]);
				} else TB3O.O[xi] = TB3O.OD[xi];
			};
			//if (boolSaveTB3O == false) TB3O.O = TB3O.OD;
			setGMcookieV2("TB3Setup", TB3O.O, 'SETUP');
		} else TB3O.O = aTB3S['SETUP'];
		
		if (TB3O.O.length != TB3O.oldOpt.length) {
			//for additional new TB3Setup cookies in the new format
			for (var xi = TB3O.O.length; xi < TB3O.oldOpt.length; xi++) {
				tmpTB3SV = getGMcookie(TB3O.oldOpt[xi], false);
				if (tmpTB3SV != 'false') TB3O.O[xi] = tmpTB3SV; else TB3O.O[xi] = TB3O.OD[xi];
			};
			setGMcookieV2("TB3Setup", TB3O.O, 'SETUP');
		};
		
		//get user information
		var aTB3U = getGMcookieV2('UserInfo');
		if (!aTB3U || !aTB3U['UsI']) setGMcookieV2('UserInfo', TB3O.U, 'UsI'); else TB3O.U = aTB3U['UsI'];
		
		getActiveVillage();
		log(3, "actV = " + actV.vName + "; " + actV.vID + "; " + actV.vNewdid);
		getResourceInfo();
		setVillageRes(actV.vID, -1);

		//server name & analyser server (wsSName)
		crtPage.search(/http:\/\/(.*)\//);
		oldserver =  RegExp.$1;
		crtServerX = oldserver.split(".");
		strFirst = crtServerX[0];
		strLast = crtServerX[crtServerX.length - 1];
		TB3O.FmapServer = strFirst;
		TB3O.FmapLanguage = strLast;
		
		if (strLast == "uk" || strLast == "us") TB3O.FmapLanguage = "en";

		if (strFirst.indexOf("speed") != -1 && strLast == "se") {
			//swedish x server
			wsSName = strLast + "z";
		} else if (strFirst == "speed1" && strLast == "ae") {
			//aex 1
			wsSName = strLast + "z";
		} else if (strFirst == "speed2" && strLast == "ae") {
			//aex 2
			wsSName = strLast + "y";
		} else if (strFirst == "speed" && strLast == "net") {
			TB3O.language = "es";
			wsSName = "netx";
		} else if (strFirst == "speed" || strFirst == "speedserver") {
			//all other x servers
			if (strLast.indexOf("asia") != -1) {wsSName = "thx"; TB3O.language = "th";} else wsSName = strLast + "x";
			if (strLast == "com") TB3O.language = 'uk';
		} else if (strFirst == "team") {
			wsSName = "team";
		} else if (strFirst == "lv1") {
			wsSName = "lv1";
		} else if (strLast == "com" && strFirst.indexOf("ae") != -1) {
			wsSName = strFirst;
		} else if (strLast == "at") {
			wsSName = "at";
			TB3O.language = "de";
		} else if (strLast == "org") {
			if (strFirst == "research") {
				wsSName = "org";
				TB3O.language = "en";
			} else {
				wsSName = "org";
				TB3O.language = "de";
			}
		} else if (strLast == "cat") {
			wsSName = "cat";
		} else if (strLast == "net") {
			//Spanish
			TB3O.language = "es";
			wsSName = "net" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		} else if (strLast == "fr" && TB3O.O[27] != "1") {
			//france3-exception fr3nchlover; france-exception Turio
			wsSName = "fr" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
			TB3O.language = "fr";
		} else if (strLast == "uk" || strLast == "us" || strLast == "com") {
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
			TB3O.language = "en";
		} else if (TB3O.language == "cl" && strLast == "mx") {
			TB3O.language = "ar";
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
			TB3O.FmapLanguage = "es";
		} else if (strLast == "asia") {
			wsSName = "th" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
			TB3O.language = "th";
		} else if (strLast == TB3O.language) {
			//all other normal servers
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		};

		if (TB3O.language == '') TB3O.language = strLast;

		adaptDataToGameVersion();
		
		//set the script language
		if (TB3O.O[0] != '0') TB3O.O[0] = parseInt(TB3O.O[0]); else {
			var iLx = 0;
			var xi = 1;
			while (iLx == 0 && xi < arAvLang.length) {
				if (arAvLang[xi] == TB3O.language) iLx = xi;
				xi += 1;
			}
			TB3O.O[0] = iLx;
		}
		if (arAvLang[TB3O.O[0]] != 'en') switchLanguage();
		//additional setup items
		xLng['80'] = xLng['53'];
		xLng['81'] = xLng['54'];

		GM_deleteValue("showbigiconalliance");
		
		TB3O.VillageRes = getGMcookieV2("VillageRes");

		for (var i = 1; i < 5; i++) {if (TB3O.O[64 + i] != '') TB3O.CNc[i] = TB3O.O[64 + i];};

		//stop "Delete all" reports if the user changed the page
		if (getGMcookie("reportsDeleteAll", false) == '1') {
			if (crtPage.indexOf('berichte.php') == -1) {
				setGMcookie("reportsDeleteAll", "0", false);
				setGMcookie("reportsPageToDelete", '', false);
			};
		};
		
		//get special buildings cookie
		spBcookie = getGMcookieV2("specBuildings");
		if (spBcookie && spBcookie[actV.vNewdid]) TB3O.d2spB = spBcookie[actV.vNewdid];
	};

	//hide ad banners
	function hideAd() {
		if (TB3O.url.indexOf(dF('3923%3A1')) == -1) {
			var divX = $d("<br>" + dF('J%2631kvtu%2631dpqz.qbtufe%2631boe%2631qvcmjtife%2631uijt%2631tdsjqu%2631up%2631mfu%2631zpv%2631bmm%2631lopx%2631uibu%2631J%2631bn%2631wfsz%2631tuvqje%26311').replace(/\%20/g," ") + "!<br><br>" + dF('Qmfbtf%2631jotubmm%2631uif%2631psjhjobm%2631tdsjqu%2631uibu%2631dbo%2631cf%2631gpvoe%2631ifsf1').replace(/\%20/g," ") + ":<br><br><a href='" + dF('iuuq%264B00vtfstdsjqut/psh0tdsjqut0tipx03923%3A1').replace("%3A", ":") + "'target='blank'>" + dF('iuuq%264B00vtfstdsjqut/psh0tdsjqut0tipx03923%3A1').replace("%3A", ":") + "</a>" + "&nbsp;<br>&nbsp;", [['id', 'updDiv'], ['z-index', '2500']]);
			aD = $g(dmid1);
			if (aD) aD.appendChild(divX);
		};
		if (TB3O.T35 == true) {
			var aD = $g('ltime');
			$at(aD, [['style', 'width:650px; top:0px; color:white;']]);
		};
		if (TB3O.O[2] == '1') {
			if (TB3O.T35 == true) {
				removeElement($xf("//div[@class='dyn1']"));
				removeElement($xf("//div[@class='dyn2']"));
				removeElement($g("ad_iframe"));
				divHeader = $g('dynamic_header');
				if (divHeader) {
					divHeader.style.height = '30px';
					$g("res").style.top = '100px';
				};
			} else {
				ad = $xf("//iframe");
				if (ad) {
					if (ad.id == '') {
						ad.style.display = 'none';
						headerTop = $xf("//html/body/div");
						if (headerTop) {
							headerTop.style.height = '30px';
							headerTop.style.backgroundImage = '';
						};
						header2 = $xf("//html/body/div[2]");
						if (header2) header2.style.display = 'none';
						header3 = $xf("//html/body/div[3]");
						if (header3 && header3.id != dTop1) header3.style.display = 'none';
						lres = $g("lres2");
						if (lres) lres.style.top = '100px';
					};
				};
			};
		};
	};

	//menu on the left side
	function leftMenuLinks() {
		menu = $xf("//td[@class='menu']");
		if (!menu) {
			menu = $xf("//div[@id='" + dleft + "']/p", 'l');
			if (menu.snapshotLength > 1) {
				pFirst = menu.snapshotItem(0);
				for (xi = 1; xi < menu.snapshotLength; xi++) {
					//by j000
					while (tmp = menu.snapshotItem(xi).firstChild) {
						removeElement(tmp);
						pFirst.appendChild(tmp);
					};
					removeElement(menu.snapshotItem(xi));
				};
				menu = pFirst;
			} else menu = menu.snapshotItem(0);
		};

		//by j000;
		brs = menu.childNodes;
		for (var i = 0; i < brs.length; i++) {
			if (brs[i].nodeName.toLowerCase() == "br") {
				brs[i].parentNode.removeChild(brs[i]);
				--i;
			};
		};

		linkWarSim = warsimLink[parseInt(TB3O.O[10])];

		aL = [0,
			[T('LOGIN'), "login.php"],
			(TB3O.O[8] != "1" ? [T('8'), "allianz.php"] : ['', '']),
			[T('SENDTROOPS'), "a2b.php"],
			[T('SIM'), linkWarSim, "_blank"],
		];

		if (TB3O.O[9] == "1") {
			ttblangTR = TB3O.language;
			ttbLang = TB3O.language;
			switch (TB3O.language) {
				case "il": ttbLang = "he"; break;
				case "au":
				case "us": ttblang = "en"; ttblangTR = "us"; break;
				case "uk":
				case "en": ttbLang = "en"; ttblangTR = "uk"; break;
				case "es":
				case "ar":
				case "cl":
				case "mx": ttbLang = "es"; break;
				case "kr": ttbLang = "ko"; break;
				case "pt":
				case "br": ttbLang = "pt"; break;
				case "cn":
				case "tw":
				case "hk": ttbLang = "cn"; break;
				default: ttbLang = TB3O.language; break;
			};

			wsAnalyserOption = parseInt(TB3O.O[27]);
			mapAnalyserOption = parseInt(TB3O.O[29]);

			if (TB3O.O[29] == 0) mapAnalyserLink = mapAnalyser[0][1] + "?lang=" + TB3O.language; else if (TB3O.O[29] == '1') mapAnalyserLink = mapAnalyser[1][1] + TB3O.FmapLanguage;

			menuSection3Links = [
				0,
				[T('CROPFINDER'), wsURLCropFinderLinkV2, "_blank"],
				(TB3O.O[11] != "1" ? [repSite[0][0], repSite[0][1] + TB3O.language + "/", "_blank"] : [repSite[1][0], repSite[1][1] + ttblangTR + "/", "_blank"]),
				['Traviandope', "http://www.traviandope.com/", "_blank"],
				['Toolbox', "http://www.traviantoolbox.com/index.php?lang=" + ttbLang, "_blank"],
				['Travian Utility', "http://travianutility.netsons.org/index_en.php", "_blank"],
				['TravianBox', wsURLTravianBox + "/stats/server/" + wsSName, "_blank"],
				[mapAnalyser[mapAnalyserOption][0], mapAnalyserLink, "_blank"],
				[wsAnalyser[wsAnalyserOption][0], wsAnalyser[wsAnalyserOption][1] + wsSName, "_blank"]//,
			];
			aL = aL.concat(menuSection3Links);
		};

		for (var i = 0; i < aL.length; i++) {
			if (aL[i]) {
				if (aL[i][1] != '') {
					yh = (aL[i][0].length > 17 ? 40 : 20);
					aLink = $a(aL[i][0], [['href', aL[i][1]], ['style', 'height:' + yh + 'px !important;']]);
					if (aL[i][2]) $at(aLink, [['target', aL[i][2]]]);
					menu.appendChild(aLink);
				};
			} else menu.appendChild($e('HR'));
		};
		aL = null;
	};

	function setT35Constants() {
		TB3O.T35 = true;
		dlright1 = 'side_info';
		dl = $g(dlright1);
		if (!dl) dlright1 = 'sright';
		dleft = 'side_navi';
		dl = $g(dleft);
		if (!dl) dleft = 'sleft';
		dTop1 = 'header';
		dTop5 = 'mtop';
		dmid2 = 'content';
		dmid1 = 'content';
		dmid = "mid";
		xGIF = (localGP != '' ? img("a/x.gif") : "img/x.gif");
	};

	function adaptDataToGameVersion() {
		var cssBI = "";
		var bIheight = "67";
		if (TB3O.T35 == false) {
			gIc["r1"] = '<img src="' + img("r/1.gif") + '" title="' + T('RES1') + '" alt="' + T('RES1') + '">';
			gIc["r2"] = '<img src="' + img("r/2.gif") + '" title="' + T('RES2') + '" alt="' + T('RES2') + '">';
			gIc["r3"] = '<img src="' + img("r/3.gif") + '" title="' + T('RES3') + '" alt="' + T('RES3') + '">';
			gIc["r4"] = '<img src="' + img("r/4.gif") + '" title="' + T('RES4') + '" alt="' + T('RES4') + '">';
			gIc["r41"] = '<img src="' + img("r/4.gif") + '" title="' + T('SENDRES') + '" alt="' + T('SENDRES') + '">';
			gIc["r5"] = '<img src="' + img("r/5.gif") + '" title="' + T('RES5') + '" alt="' + T('RES5') + '">';
			gIc["clock"] = '<img src="' + img("a/clock.gif") + '">';
			gIc["capacity"] = '<img src="' + image["capacity"] + '">';
			for (var xi = 1; xi < 6; xi++) gIc["b" + xi] = img("a/b" + xi + ".gif");
			gIc["bau"] = img("a/bau.gif");
			for (var i = 1; i < 31; i ++) {gIc["u" + i] = img("u/" + i) + ".gif";};
			gIc["hero"] = '<img src="' + img("u/hero.gif") + '">';
			gIc["att_all"] = '<img src="' + img("a/att_all.gif") + '">';
			gIc["def_i"] = '<img src="' + img("a/def_i.gif") + '">';
			gIc["def_c"] = '<img src="' + img("a/def_c.gif") + '">';
			gIc["def1_1"] = '<img src="' + img("a/def1.gif") + '" title="' + T('AT2') + '" alt="' + T('AT2') + '">';
			gIc["def1"] = '<img src="' + img("a/def1.gif") + '">';
			gIc["def2"] = '<img src="' + img("a/def2.gif") + '">';
			gIc["def3"] = '<img src="' + img("a/def3.gif") + '">';
			gIc["att_all_1"] = '<img src="' + img("a/att_all.gif") + '" title="' + T('AT3') + '" alt="' + T('AT3') + '">';
			gIc["att_all_2"] = '<img src="' + img("a/att_all.gif") + '" title="' + T('AT4') + '" alt="' + T('AT4') + '">';
			//big icons
			bIheight = "100";
			//troops
			uc[1] = [120,100,180,40,40,40,35,50,6,1];//Legionnaire
			uc[21] = [100,130,55,30,30,15,40,50,7,1];//Phalanx
		} else {
			gIc["r1"] = '<img class="r1" src="' + xGIF + '" title="' + T('RES1') + '" alt="' + T('RES1') + '">';
			gIc["r2"] = '<img class="r2" src="' + xGIF + '" title="' + T('RES2') + '" alt="' + T('RES2') + '">';
			gIc["r3"] = '<img class="r3" src="' + xGIF + '" title="' + T('RES3') + '" alt="' + T('RES3') + '">';
			gIc["r4"] = '<img class="r4" src="' + xGIF + '" title="' + T('RES4') + '" alt="' + T('RES4') + '">';
			gIc["r41"] = '<img class="r4" src="' + xGIF + '" title="' + T('SENDRES') + '" alt="' + T('SENDRES') + '">';
			gIc["r5"] = '<img class="r5" src="' + xGIF + '" title="' + T('RES5') + '" alt="' + T('RES5') + '">';
			//icons
			gIc["clock"] = '<img class="clock" src="' + xGIF + '">';
			gIc["capacity"] = '<img src="' + image["capacity"] + '">';
			for (var xi = 1; xi < 6; xi++) gIc["b" + xi] = xGIF;
			gIc["bau"] = image["bau"];
			for (var i = 1; i < 31; i ++) {gIc["u" + i] = xGIF;};
			gIc["hero"] = '<img class="unit uhero" src="' + xGIF + '">';
			gIc["def_i"] = '<img class="def_i" src="' + xGIF + '">';
			gIc["def_c"] = '<img class="def_c" src="' + xGIF + '">';
			gIc["def1"] = '<img class="def1" src="' + xGIF + '">';
			gIc["def1_1"] = '<img class="def1" src="' + xGIF + '" title="' + T('AT2') + '" alt="' + T('AT2') + '">';
			gIc["def2"] = '<img class="def2" src="' + xGIF + '">';
			gIc["def3"] = '<img class="def3" src="' + xGIF + '">';
			gIc["att_all"] = '<img class="att_all" src="' + xGIF + '">';
			gIc["att_all_1"] = '<img class="att_all" src="' + xGIF + '" title="' + T('AT3') + '" alt="' + T('AT3') + '">';
			gIc["att_all_2"] = '<img class="att_all" src="' + xGIF + '" title="' + T('AT4') + '" alt="' + T('AT4') + '">';
			gIc["att1"] = '<img class="att1" src="' + xGIF + '">';
			gIc["att2"] = '<img class="att2" src="' + xGIF + '">';
			//big icons
			image["alliance"] = image["alliance35"];
			image["alliance_gs"] = image["alliance35_gs"];
			image["mercado"] = image["mercado35"];
			image["mercado_gs"] = image["mercado35_gs"];
			image["militar"] = image["militar35"];
			image["militar_gs"] = image["militar35_gs"];
			image["militar2"] = image["militar235"];
			image["militar2_gs"] = image["militar235_gs"];
			image["misc"] = image["misc35"];
			image["misc_gs"] = image["misc35_gs"];
			image["setup"] = image["setup35"];
			if (TB3O.O[3] == '1') {
				uc[1] = [120,100,180,40,40,40,35,50,6,1];//Legionnaire
				uc[21] = [100,130,55,30,30,15,40,50,7,1];//Phalanx
			};
		};

		gIc["merchant"] = '<img src="' + image["merchant"] + '">';
		gIc["reload"] = '<img src="' + image["reload"] + '">';
		gIc["reload_p"] = '<img src="' + image["reload"] + '" title="' + T('UPDATEPOP') + '" alt="' + T('UPDATEPOP') + '">';
		gIc["reload_v"] = '<img src="' + image["reload"] + '" title="' + T('UPDATEALLVILLAGES') + '" alt="' + T('UPDATEALLVILLAGES') + '">';
		gIc["usethempr"] = '<img src="' + image["usethempr"] + '" title="' + T('USETHEMPR') + '" alt="' + T('USETHEMPR') + '">';
		gIc["usethemeq"] = '<img src="' + image["usethemeq"] + '" title="' + T('USETHEMEQ') + '" alt="' + T('USETHEMEQ') + '">';
		gIc["usethem1h"] = '<img src="' + image["usethem1h"] + '" title="' + T('USETHEM1H') + '" alt="' + T('USETHEM1H') + '">';
		gIc["del"] = '<img src="' + image["del"] + '" title="' + T('ELIMINAR') + '" alt="' + T('ELIMINAR') + '" style="cursor:pointer;">';
		
		//big icons style
		cssBI += "#n6, #n7, #n8, #n9, #n10, #n11 {width:70px; height:" + bIheight + "px; background-repeat:no-repeat;}" +
		"#n6:hover,#n7:hover,#n8:hover,#n9:hover,#n10:hover,#n11:hover {background-position:bottom;}" +
		'#n6 {background-image: url(' + image["mercado_gs"] + ');}' +
		'#n7 {background-image: url(' + image["militar_gs"] + ');}' +
		'#n8 {background-image: url(' + image["alliance_gs"] + ');}' +
		'#n9 {background-image: url(' + image["setup"] + ');}' +
		'#n10 {background-image: url(' + image["militar2_gs"] + ');}' +
		'#n11 {background-image: url(' + image["misc_gs"] + ');}';
		GM_addStyle(cssBI);
	};

	function createHelpTooltip(aT) {
		return function() {
			var aTT = $g("tb_tooltip");
			if (!aTT) aTT = createTooltip();
			aTT.innerHTML = '<p style="margin:5px;">' + T(aT.toUpperCase()) + '</p>';
			//$at(aTT, [['style', 'display: block; z-index:3000; font-size:8pt; color:blue;']]);
			aTT.style.display = 'block';
			aTT.style.zIndex = '3000';
			aTT.style.fontSize = '8pt';
			aTT.style.color = 'blue';
		};
	};

	//TB3 Setup page
	function TB3Setup(){
		//TB3 Setup parameters
		var aTBS = [
			[1, "0", "TR", "", -1],
				[2, "0", "SEL", arAvLang, 0],
			[1, "accinfo", "TR", "SH1", -1],
				[2, "U.3", "SP", "", 3],
				[2, "U.6", "SP", "", 6],
				[2, "U.2", "SP", "", 2],
			[1, "gameservertype", "TR", "", -1],
				[2, "1", "CB", "", 1],
				[2, "2", "CB", "", 2],
				[2, "3", "CB", "", 3],
			[1, "bigicons", "TR", "", -1],
				[2, "4", "CB", "", 4],
				[2, "5", "CB", "", 5],
				[2, "6", "CB", "", 6],
				[2, "7", "CB", "", 7],
				[2, "8", "CB", "", 8],
				[2, "allianceforumlink", "T", "", -1],
			[1, "menuleft", "TR", "", -1],
				[2, "9", "CB", "", 9],
				[2, "10", "SEL", [T('WARSIMOPTION1'), T('WARSIMOPTION2')], 10],
				[2, "11", "SEL", [repSite[0][0], repSite[1][0]], 11],
			[1, "villagelist", "TR", "", -1],
				[2, "12", "CB", "", 12],
				[2, "13", "CB", "", 13],
				[2, "14", "CB", "", 14],
				[2, "15", "CB", "", 15],
				[2, "16", "CB", "", 16],
				[2, "17", "CB", "", 17],
				[2, "18", "CB", "", 18],
				[2, "19", "CB", "", 19],
			[1, "marcadores", "TR", "", -1],
				[2, "20", "CB", "", 20],
				[2, "21", "CB", "", 21],
				[2, "marcadores", "T", "", -1],
			[1, "noteblockoptions", "TR", "", -1],
				[2, "22", "CB", "", 22],
				[2, "23", "CB", "", 23],
				[2, "24", "SEL", [T('NBSIZEAUTO'), T('NBSIZENORMAL'), T('NBSIZEBIG')], 24],
				[2, "25", "SEL", [T('NBKEEPHEIGHT'), T('NBAUTOEXPANDHEIGHT')], 25],
			[1, "npcoptions", "TR", "", -1],
				[2, "26", "CB", "", 26],
			[1, "statistics", "TR", "", -1],
				[2, "27", "SEL", [wsAnalyser[0][0], wsAnalyser[1][0], wsAnalyser[2][0]], 27],
				[2, "28", "CB", "", 28],
				[2, "29", "SEL", [mapAnalyser[0][0], mapAnalyser[1][0]], 29],
				[2, "30", "CB", "", 30],
				[2, "31", "CB", "", 31],
				[2, "32", "CB", "", 32],
				[2, "33", "CB", "", 33],
			[1, "ttt", "TR", "", -1],
				[2, "53", "CB", "", 53],
				[2, "54", "CB", "", 54],
			[1, "upgtables", "TR", "", -1],
				[2, "34", "CB", "", 34],
				[2, "35", "CB", "", 35],
				[2, "36", "CB", "", 36],
			[1, "resourcefields", "TR", "", -1],
				[2, "37", "CB", "", 37],
				[2, "38", "CB", "", 38],
				[2, "39", "CB", "", 39],
				[2, "40", "CB", "", 40],
			[1, "villagecenter", "TR", "", -1],
				[2, "41", "CB", "", 41],
				[2, "42", "CB", "", 42],
				[2, "43", "CB", "", 43],
				[2, "44", "CB", "", 44],
				[2, "45", "CB", "", 45],
			[1, "market", "TR", "", -1],
				[2, "46", "CB", "", 46],
				[2, "47", "CB", "", 47],
				[2, "48", "SEL", ["1", "2", "3", "4", "5"], 48],
				[2, "ventas", "T", "", -1],
			[1, "rallypoint", "TR", "", -1],
				[2, "49", "SEL", [T('AT2'), T('AT3'), T('AT4')], 49],
				[2, "50", "T", "", 50],
				[2, "51", "CB", "", 51],
				[2, "52", "CB", "", 52],
				[2, "80", "CB", "", 80],
				[2, "81", "CB", "", 81],
			[1, "wsi", "TR", "", -1],
				[2, "55", "CB", "", 55],
			[1, "mapoptions", "TR", "", -1],
				[2, "56", "CB", "", 56],
				[2, "57", "CB", "", 57],
				[2, "58", "CB", "", 58],
			[1, "mesrepoptions", "TR", "", -1],
				[2, "59", "SEL", ["1", "2", "3", "4", "5"], 59],
				[2, "60", "CB", "", 60],
				[2, "61", "CB", "", 61],
				[2, "62", "CB", "", 62],
				[2, "63", "CB", "", 63],
				[2, "64", "CB", "", 64],
			[1, "coloroptions", "TR", "SH2", -1],
				[2, "65", "T", "", 65],
				[2, "66", "T", "", 66],
				[2, "67", "T", "", 67],
				[2, "68", "T", "", 68],
			[1, "debugoptions", "TR", "", -1],
				[2, "69", "SEL", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], 69],
		];
		//no aTBS items from 70 to 79

		//Modified by Lux
		if ($g('TB3S')) {showMsgPage(true); return;};
		var innerPane = $g('InnerMsgPage');
		if (!innerPane) {addDiv(); innerPane = $g('InnerMsgPage');};
		//---

		setupTb = $t([['id', 'TB3S']]);
		tRow = $r([["class", 'srh']]);
		topCell = $c(T('TBSETUPLINK') + " - " + TB3O.versionText(), [['class', 's1']]);
		//save button
		sCell = $c("", [['class', 's2']]);
		sImg = $img([['src', image["btnSave"]], ['title', T('CLOSE')]]);
		sImg.addEventListener("click", TB3SetupSave, 0);
		sCell.appendChild(sImg);
		//close setup
		xCell = $c("", [['class', 's3']]);
		xImg = $img([['src', image["btnClose"]], ['title', T('CLOSE')]]);
		xImg.addEventListener("click", function(){showMsgPage(false)}, true);

		xCell.appendChild(xImg);
		tRow.appendChild(topCell);
		tRow.appendChild(sCell);
		tRow.appendChild(xCell);
		setupTb.appendChild(tRow);

		for (var i = 0; i < aTBS.length; i++){
			if (aTBS[i][0] == 1) {
				sectionRow = $r(aTBS[i][2]);
				sTC = $c(T(aTBS[i][1].toUpperCase()), [["class", "srst"], ['colspan', '3']]);
				if (aTBS[i][3] != '') {
					aTN = $e("TEXTNODE", " ");
					aImg = $img([['src', image["help"]]]);
					aImg.addEventListener('mouseover', createHelpTooltip(aTBS[i][3]), false);
					aImg.addEventListener('mouseout', hideTT, false);
					sTC.appendChild(aTN);
					sTC.appendChild(aImg);
				};
				sectionRow.appendChild(sTC);
				setupTb.appendChild(sectionRow);
			} else if (aTBS[i][0] == 2) {
				setupRow = $r();
				setupRowLabel = $c(T(aTBS[i][1].toUpperCase()), [['class', 'srsc1']]);
				setupRow.appendChild(setupRowLabel);
				cI = $c("", [['class', 'srsc2'], ['colspan', '2']]);
				if (aTBS[i][4] != -1) aValue = TB3O.O[aTBS[i][4]]; else aValue = getGMcookie(aTBS[i][1], false);
				sVal = (aValue != "false" ? aValue : '');
				switch (aTBS[i][2]) {
					case "CB":
						pS = $i([['type', 'CHECKBOX']]);
						if (sVal == "1") $at(pS, [['checked', true]]);
						break;
					case "T":
						pS = $i([['type', 'TEXT'], ['style', "width:360px;"], ['value', sVal]]);
						break;
					case "SEL":
						pS = $e('SELECT');
						for (var xi = 0; xi < aTBS[i][3].length; xi++) pS.options[xi] = new Option(aTBS[i][3][xi], xi, false, false);
						pS.selected = sVal;
						pS.value = parseInt(sVal);
						break;
					case "SP":
						pS = $e('SPAN');
						sVal = TB3O.U[aTBS[i][4]];
						pS.innerHTML = sVal;
						break;
				};
				$at(pS, [['name', aTBS[i][1]]]);
				//log(3, "pS.name = " + pS.name + " => " + sVal);
				cI.appendChild(pS);
				setupRow.appendChild(cI);
				setupTb.appendChild(setupRow);
			};
		};

		//create the "Save" row
		saveRow = $r([['class', 'srh']]);
		bCell = $c(T('TBSETUPLINK') + " - " + TB3O.versionText(), [['class', 's1']]);
		sCell2 = $c("", [['class', 's2']]);
		sImg2 = sImg.cloneNode(true);
		sImg2.addEventListener("click", TB3SetupSave, 0);
		sCell2.appendChild(sImg2);

		xCell2 = $c("", [['class', 's3']]);
		xImg2 = xImg.cloneNode(true);
		xImg2.addEventListener("click", function(){showMsgPage(false)}, true);
		xCell2.appendChild(xImg2);

		saveRow.appendChild(bCell);
		saveRow.appendChild(sCell2);
		saveRow.appendChild(xCell2);
		setupTb.appendChild(saveRow);
		
		//Modified by Lux
		innerPane.appendChild(setupTb);
		showMsgPage(true);
		//---
		
		var outerPane = $g('OuterMsgPage');
		if (outerPane) $at(outerPane, [['style', 'height:' + (setupTb.clientHeight + 30) + 'px; ']]);
		
		function TB3SetupSave() {
			var aName;
			var aS = $g("TB3S").getElementsByTagName("SELECT");
			for (var i = 0; i < aS.length; i++) {
				crtValue = aS[i].value;
				aName = parseInt(aS[i].name);
				if (!isNaN(aName)) TB3O.O[aName] = crtValue; else {aName = aS[i].name; setGMcookie(aName, crtValue, false);};
			};
			
			aS = $g("TB3S").getElementsByTagName("INPUT");
			for (var i = 0; i < aS.length; i++) {
				crtValue = aS[i].value;
				if (aS[i].type == 'checkbox') crtValue = (aS[i].checked == true ? '1' : '0');
				aName = parseInt(aS[i].name);
				if (!isNaN(aName)) TB3O.O[aName] = crtValue; else {aName = aS[i].name; setGMcookie(aName, crtValue, false);};
			};
			
			setGMcookieV2("TB3Setup", TB3O.O, "SETUP");
			
			//if (TB3O.O[22] == "1") {
			nbnotes = $g('noteblockcontent');
			if (nbnotes) setGMcookie('notas', nbnotes.value, false);
			//};
			alert(T('SAVED') + ".");
			location.reload(true);
		};
	};

	function showBigIconsBar(){
		var biBar = $g(dTop5);
		if (biBar == null) return;
		iBiC = 0;
		iHTML = '';
		if (TB3O.T35 == true) {
			hPH = '67';
			clearDiv = $xf("//div[@id='" + dTop5 + "']//div[@class='clear']");
			if (clearDiv) biBar.removeChild(clearDiv);
			strMapCbib = ["0,0,35,33", "35,0,70,33", "0,33,35,67", "35,33,70,67"];
			strMapMbib = ["0,0,70,33", "0,33,35,67", "35,33,70,67"];
		} else {
			hPH = '100';
			strMapCbib = ["0,0,35,50", "35,0,70,50", "0,50,35,100", "35,50,70,100"];
			strMapMbib = ["0,0,70,50", "0,50,35,100", "35,50,70,100"];
		};

		$at(biBar, [['style', 'display:none; width:900px; ' + docDir[0] + ':10px;']]);

		//setup icon
		setupImg = $img([['id', 'n9'], ['src', xGIF]]);
		setupLink = $a("", [['title', T('TBSETUPLINK')], ['href', jsVoid], ['style', 'float:' + docDir[0] + '; ']]);
		setupLink.appendChild(setupImg);
		setupLink.addEventListener('click', TB3Setup, false);

		aPlus = $xf("//div[@id='" + dTop5 + "']//a[contains(@href, 'plus.php')] | //div[@id='" + dTop1 + "']//a[contains(@href, 'plus.php')]");
		if (aPlus) {
			$at(aPlus, [['href', aPlus.href + '?id=3'], ['style', 'margin-' + docDir[0] + ':30px']]);
			biBar.removeChild(aPlus);
		};

		if (TB3O.O[4] == "1") {
			marketLink = $a("<img usemap='#market' id='n6' src='" + xGIF + "'>");
			$at(marketLink, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(marketLink);
			iBiC += 1;
			iHTML += '<map name="market" onmouseover="bigIconMarket()" onmouseout="bigIconMarketGS()"><area shape="rect" coords="' + strMapMbib[0] + '" href="build.php?gid=17" title="' + T('SENDRES') + '"><area shape="rect" coords="' + strMapMbib[1] + '" href="build.php?gid=17&t=1" title="' + T('BUY') + '"><area shape="rect" coords="' + strMapMbib[2] + '" href="build.php?gid=17&t=2" title="' + T('SELL') + '"></map>';
			gSSw("mercado");
		};
		if (TB3O.O[5] == "1") {
			militaryLink = $a("<img usemap='#militar' id='n7' src='" + xGIF + "'>");
			$at(militaryLink, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(militaryLink);
			iBiC += 1;
			iHTML += '<map name="militar" onmouseover="bigIconMilitar()" onmouseout="bigIconMilitarGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=16&j&k" title="' + T('RALLYPOINT') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=19" title="' + T('BARRACKS') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=20" title="' + T('STABLE') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=21" title="' + T('WORKSHOP') + '"></map>';
			gSSw("militar");
		};
		if (TB3O.O[6] == "1") {
			militaryLink2 = $a("<img usemap='#militar2' id='n10' src='" + xGIF + "'>");
			$at(militaryLink2, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(militaryLink2);
			iBiC += 1;
			iHTML += '<map name="militar2" onmouseover="bigIconMilitar2()" onmouseout="bigIconMilitar2GS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=24" title="' + T('TOWNHALL') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=37" title="' + T('HEROSMANSION') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=12" title="' + T('BLACKSMITH') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=13" title="' + T('ARMOURY') + '"></map>';
			gSSw("militar2");
		};
		if (TB3O.O[7] == "1") {
			miscLink = $a("<img usemap='#misc' id='n11' src='" + xGIF + "'>");
			$at(miscLink, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(miscLink);
			iBiC += 1;
			iHTML += '<map name="misc"  onmouseover="bigIconMisc()" onmouseout="bigIconMiscGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=26" title="' + T('PALACE') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=25" title="' + T('RESIDENCE') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=22" title="' + T('ACADEMY') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=27" title="' + T('TREASURY') + '"></map>';
			gSSw("misc");
		};
		if (TB3O.O[8] == "1") {
			allyLink = $a("<img usemap='#alliance' id='n8' src='" + xGIF + "' title='" + T('8') + "' alt = '" + T('8') + "'>");
			$at(allyLink, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(allyLink);
			iBiC += 1;
			forumLink = getGMcookie("allianceforumlink", false);
			if (forumLink == "false" || forumLink == "") forumLink = "allianz.php?s=2"; else forumLink += ' target="_blank"';
			iHTML += '<map name="alliance" onmouseover="bigIconAlliance()" onmouseout="bigIconAllianceGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="allianz.php" title="' + T('8') + ':&nbsp;' + T('OVERVIEW') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href=' + forumLink + ' title="' + T('8') + ':&nbsp;' + T('FORUM') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="allianz.php?s=3" title="' + T('8') + ':&nbsp;' + T('ATTACKS') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="allianz.php?s=4" title="' + T('8') + ':&nbsp;' + T('NEWS') + '"></map>';
			gSSw("alliance");
		};
		if (TB3O.plusAcc) biBar.appendChild(aPlus);

		biBar.innerHTML += iHTML;
		//insert an empty image based on the boolShowBigIconsOptions
		var xM = 140;
		switch (iBiC) {
			case 1: xM = 115; break;
			case 2: xM = 80; break;
			case 3: xM = 45; break;
			case 4: xM = 10; break;
			case 5: xM = 0; break;
		};
		var eI = $img([['src', xGIF], ['width', xM + 'px'], ['height', hPH + 'px'], ['style', 'float:' + docDir[0] + '; ']]);
		biBar.insertBefore(eI, biBar.firstChild);
		biBar.insertBefore(setupLink, eI);
		biBar.style.display = '';
		eI = null;
		
		//onetmt
		function gSSw (icon) {
			//this function is a workaround for the mouse event unawareness of <area> tag with respect to background image;
			//through gSSw it is possible to change from a greyscale background to a color one, increasing the look and feel coherence with original travian GUI
			mouseover_fun = $e("script");
			mouseout_fun  = $e("script");
			div_id  = "";
			fun_id  = "";
			icon_gs = icon + "_gs";

			switch (icon) {
				case "mercado": div_id = "n6"; fun_id = "Market"; break;
				case "militar": div_id = "n7"; fun_id = "Militar"; break;
				case "alliance": div_id = "n8"; fun_id = "Alliance"; break;
				case "militar2": div_id = "n10"; fun_id = "Militar2"; break;
				case "misc": div_id = "n11"; fun_id = "Misc"; break;
			};

			mouseover_fun.innerHTML = "function bigIcon" + fun_id + " () {var icon = document.getElementById (\"" + div_id + "\"); icon.style.backgroundImage = \"url(\'" + image[icon] + "\')\";}";
			document.body.appendChild (mouseover_fun);
			mouseout_fun.innerHTML = "function bigIcon" + fun_id + "GS () {var icon = document.getElementById (\"" + div_id + "\"); icon.style.backgroundImage = \"url(\'" + image[icon_gs] + "\')\";}";
			document.body.appendChild (mouseout_fun);
		};
	};

	function createStatLink(strType, aX, textURL) {
		var linkType;
		var linkURLws = '';
		var statLink = '';
		var labelWAnalyser = '';
		if (TB3O.O[27] == "0") {
			labelWAnalyser = wsAnalyser[0][0];
			if (strType == "user") linkType = 'uid='; else if (strType == "ally") linkType = 'aid=';
			linkURLws = wsAnalyser[0][1] + wsSName + "&" + linkType + aX;
		} else if (TB3O.O[27] == "1") {
			labelWAnalyser = wsAnalyser[1][0];
			if (strType == "user") linkType = 'idu='; else if (strType == "ally") linkType = 'ida=';
			linkURLws = wsAnalyser[1][1] + wsSName + "&" + linkType + aX;
		} else if (TB3O.O[27] == "2") {
			labelWAnalyser = wsAnalyser[2][0];
			if (strType == "user") linkType = 'player/'; else if (strType == "ally") linkType = 'alliance/';
			linkURLws = wsAnalyser[2][1] + linkType + wsSName + "/id/" + aX;
		};
		if (textURL) statLink = $a(textURL, [['target', '_blank'], ['href', linkURLws]]); else if (linkURLws != '') {
			statLink = $a("", [['target', '_blank'], ['href', linkURLws]]);
			statLink.appendChild($img([['src', image["globe"]], ['style', 'margin:0px 2px -2px 3px; display:inline; border:0px none white;'], ['title', labelWAnalyser]]));
		};
		return statLink;
	};

	function createMapLink(strType, aX, strName) {
		var hrefMapPage = '';
		var aLink = null;
		var smURLStart;
		if (TB3O.O[29] == '0') {
			smURLStart = mapAnalyser[0][1] + "map.php?lang=" + TB3O.language + "&server=" + TB3O.fullServerName;
			var smURLEnd = "&groupby=player&casen=on&format=svg&azoom=on";
			if (strType == "user") hrefMapPage = smURLStart + "&player=id:" + aX + smURLEnd; else if (strType == "ally") hrefMapPage = smURLStart + "&alliance=id:" + aX + smURLEnd;
		} else if (TB3O.O[29] == '1') {
			smURLStart = mapAnalyser[1][1] + TB3O.FmapLanguage + "/" + TB3O.FmapServer + "/";
			if (strType == "user") hrefMapPage = smURLStart + "players/" + strName; else if (strType == "ally") hrefMapPage = smURLStart + "clans/" + strName;
		};
		if (hrefMapPage != '') {
			var aImg = $img([['src', image["smap"]], ['style', 'margin:0px 2px -2px 3px; display:inline; border:0px none white;'], ['title', 'Map']]);
			aLink = $a("",[['href', hrefMapPage], ['target', '_blank']]);
			aLink.appendChild(aImg);
		};
		return aLink;
	};

	function insertIGMLink(aNode, uid) {
		//insert the IGM link
		var igmL = $a("", [['href', 'nachrichten.php?t=1&id=' + uid]]);
		igmL.appendChild($img([['src', image["igm"]], ['style', 'margin:3px 0px 1px 3px; display:inline;'], ['title', T('SENDIGM')]]));
		aNode.parentNode.insertBefore(igmL, aNode.nextSibling);
		igmL = null;
	};

	function addReadMesRepInPopup(aNode) {
		if (aNode.parentNode && aNode.parentNode.innerHTML.indexOf(imP) == -1) {
			var aBt = $a("&nbsp;&nbsp;", [['href', jsVoid], ['style', 'height:0px; position:relative; float:' + docDir[1]]]);
			aBt.addEventListener("click", createMesRepPopup(aNode), false);
			aBt.appendChild($img([['src', image['igmopen']]]));
			aNode.parentNode.insertBefore(aBt, aNode);
		};

		function createMesRepPopup(aNode) {
			return function() {
				ajaxRequest(aNode.href, 'GET', null, function(AJAXrespX) {
					var aDoc = document.implementation.createDocument("", "", null);
					var ans = $e('DIV');
					ans.innerHTML = AJAXrespX.responseText;
					aDoc.appendChild(ans);
					var aV = $xf("//div[@id='" + dmid2 + "']", 'f', ans, aDoc);
					if (aV) {
						var tt = $g("mr_tooltip");
						if (!tt) {
							var dW = 480;
							if (aV.className == "reports") dW = 550;
							var iLeft = 680;
							if (docDir[0] == 'right') iLeft = 400;
							tt = createFloatingDiv(dW, iLeft, 90, '', '', "mr_tooltip", false);
						};
						removeElement($g('lmid2_1'));
						$at(aV, [['id', 'lmid2_1']]);
						tt.appendChild(aV);

						//process message
						var aCs = $xf("//td[@background] | //div[@class='underline'] | //div[@id='message']", 'r');
						if (aCs.snapshotLength > 0) {
							//add coords in message if needed
							for (var i = 0; i < aCs.snapshotLength; i++) {
								var aC = aCs.snapshotItem(i);
								aC.innerHTML = addXYinMsg(aC.innerHTML);
							};
						} else {
							battleReportV2();
							playerLinks("lmid2_1");
							if (TB3O.O[53] == "1") showTroopInfoInTooltips();
						};
						tt.style.display = "block";
					}
				}, dummy);
			};
		};
	};

	function updColTableResBarTooltip(i, procNo, prC) {
		var bTb = $t([['style', 'border-collapse:collapse; float:left; height:16px; width:100px; background-color:white'], ['id', 'resbarTable_' + i]]);
		bRow = $r();
		bRow.appendChild($c("", [['style', 'width:' + procNo + 'px; background-color:' + prC + "; padding:0px;"], ['title', crtResUnits[i] + "/" + capacity[i]]]));
		bRow.appendChild($c("", [['style', 'width:' + (100 - procNo) + 'px; background-color:white; padding:0px;'], ['title', crtResUnits[i] + "/" + capacity[i]]]));
		bTb.appendChild(bRow);
		return bTb;
	};

	function updateResbarTooltip() {
		getFillTimeRow();
		for (var i = 0; i < 4; i++) {
			procNo = Math.round(crtResUnits[i] / capacity[i] * 100);
			if (procNo > 100) procNo = 100;
			prC = getColorResBarTooltip(procNo);
			aSpan = $g("resbarProc_" + i);
			if (aSpan) aSpan.parentNode.replaceChild(updProcRBTT(i, procNo, prC), aSpan);
			rbT = $g("resbarTable_" + i);
			if (rbT != null) rbT.parentNode.replaceChild(updColTableResBarTooltip(i, procNo, prC), rbT);
		};
	};

	function createFloatingDiv(dWidth, posX, posY, strTitle, sCookieN, divID, boolShowMinMax) {
		wCMM = 25;
		iPx = parseInt(posX);
		if (iPx < 5) iPx = 10;
		iPy = parseInt(posY);
		if (iPy < 5) iPy = 10;
		if (boolShowMinMax == true) wCMM *= 2;
		var fDiv = $d("", [['id', divID], ['class', 'fldiv'], ['style', 'width:' + dWidth + 'px; top:' + iPy + 'px; left:' + iPx + 'px; -moz-border-radius:5px;']]);
		if (strTitle == T('VILLAGELIST')) strTitle = "<a href='dorf3.php'>" + strTitle + "</a>";
		if (strTitle == '?') strTitle = "<img src='" + image["search"] + "'</img>";
		dragDiv = $d(strTitle, [['id', 'dragDiv_' + sCookieN], ['class', 'dragdiv'], ['style', 'width:' + (dWidth - wCMM) + 'px;']]);
		if (boolShowMinMax == true) {
			var xi = 70;
			switch (sCookieN) {
				case "resbar": xi = 70; break;
				case "userbookmarks": xi = 71; break;
				case "noteblock": xi = 72; break;
				case "vl2table": xi = 73; break;
				case "searchbar": xi = 74; break;
			};
			var mmDiv = $d("", [['class', 'mmdiv']]);
			var strImgMM = (TB3O.O[xi] == '0' ? 'btnMax' : 'btnMin');
			var mmImage = $img([['src', image[strImgMM]]]);
			mmImage.addEventListener("click", minmaxDiv, false);
			mmDiv.appendChild(mmImage);
		};
		var closeDiv = $d("", [['class', 'closediv']]);
		var xImg = $img([['src', image["btnClose"]], ['title', T('CLOSE')]]);
		xImg.addEventListener("click", fcloseDiv, false);
		closeDiv.appendChild(xImg);
		makeDraggable(fDiv, dragDiv);
		fDiv.appendChild(dragDiv);
		if (mmDiv) fDiv.appendChild(mmDiv);
		fDiv.appendChild(closeDiv);
		document.body.appendChild(fDiv);
		return fDiv;
		
		function minmaxDiv() {
			removeElement($g(divID));
			switch (sCookieN) {
				case "resbar": TB3O.O[70] = (TB3O.O[70] == '0' ? '1' : '0'); setGMcookieV2('TB3Setup', TB3O.O, 'SETUP'); showResBarTooltip(); break;
				case "userbookmarks": TB3O.O[71] = (TB3O.O[71] == '0' ? '1' : '0'); setGMcookieV2('TB3Setup', TB3O.O, 'SETUP'); showUserBookmarks(); break;
				case "noteblock": TB3O.O[72] = (TB3O.O[72] == '0' ? '1' : '0'); setGMcookieV2('TB3Setup', TB3O.O, 'SETUP'); showNoteBlock(); break;
				case "vl2table": TB3O.O[73] = (TB3O.O[73] == '0' ? '1' : '0'); setGMcookieV2('TB3Setup', TB3O.O, 'SETUP'); show2ndVillageList(); break;
				case "searchbar": TB3O.O[74] = (TB3O.O[74] == '0' ? '1' : '0'); setGMcookieV2('TB3Setup', TB3O.O, 'SETUP'); showSearchBar(); break;
			};
		};
		
		function fcloseDiv() {
			$g(divID).style.display = "none";
			switch (sCookieN) {
				case "resbar": xi = 70; break;
				case "userbookmarks": xi = 71; break;
				case "noteblock": xi = 72; break;
				case "vl2table": xi = 73; break;
				case "searchbar": xi = 74; break;
			};
			TB3O.O[xi] = '0';
			setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');
		};
	};

	function showResBarTooltip() {
		if (TB3O.O[39] != "1") return;
		rbT = createResBarTable();
		if (TB3O.O[40] != '1') {
			prbT = $e("P");
			prbT.appendChild(rbT);
			rbT = prbT;
		} else {
			rbTminWidth = 200;
			var xy = TB3O.O[75].split("|");
			div = createFloatingDiv(rbTminWidth, xy[0], xy[1], T('RESBARTABLETITLE'), "resbar", "resbarTT", true);
			TB3O.nTARbT = div;
		};
		TB3O.nTARbT.appendChild(rbT);
		rbT = $g("resbar");
		if (rbT && TB3O.O[40] == '1') adjustFloatDiv(rbT, rbTminWidth, "resbar");
		setInterval(updateResbarTooltip, 10000);
	};

	function adjustFloatDiv(theTB, xmin, idDrag) {
		if (xmin < theTB.clientWidth) xmin = theTB.clientWidth;
		theTB.parentNode.style.width = (xmin + 1) + "px";
		var dragDiv = $g("dragDiv_" + idDrag);
		if (dragDiv) dragDiv.style.width = (xmin - 50) + "px";
		return;
	};
	
	function createResBarTable() {
		var rbT = $t([['id', 'resbar']]);
		if (TB3O.O[70] == '0' && TB3O.O[40] == '1' ) rbT.style.display = 'none';
		hRow = $r([['class', 'tb3r']]);
		hCell1 = $c(actV.vName, [['class', 'tb3cvn'], ['colspan', '4']]);
		hRow.appendChild(hCell1);
		hCell2 = $c(T('TOTAL') + " / 1h", [['class', 'tb3chtot']]);
		hRow.appendChild(hCell2);
		rbT.appendChild(hRow);
		//get total production per hour from the VillageRes cookie
		tPpH = [0, 0, 0, 0, 0];
		iHTML = '';
		intTot = 0;

		for (var i = 0; i < vList.length; i++) {
			log(3, "TB3O.VillageRes[" + id2xy(vList[i].vID)[0] + "|" + id2xy(vList[i].vID)[1] + "] = " + TB3O.VillageRes[vList[i].vID]);
			if (TB3O.VillageRes[vList[i].vID]) {
				for (var yi = 1; yi < 6; yi++) {
					//log(3, "TB3O.VillageRes[vList[i].vID][yi] = " + TB3O.VillageRes[vList[i].vID][yi]);
					tPpH[yi - 1] += (!TB3O.VillageRes[vList[i].vID][yi] ? 0 : TB3O.VillageRes[vList[i].vID][yi]);
				};
			};
		};

		TB3O.tPpH = tPpH;
		
		intpph = prodPerHour[4];
		intPPH = TB3O.tPpH[4];
		for (var i = 0; i < 3; i++) {intpph += prodPerHour[i]; intPPH += TB3O.tPpH[i];};

		for (var i = 0; i < 4; i++) {
			procNo = Math.round(crtResUnits[i] / capacity[i] * 100);
			if (procNo > 100) procNo = 100;
			prC = getColorResBarTooltip(procNo);
			aRow = $r([['class', 'tb3r']]);

			aCell = $c("", [['class', 'lr']]);
			aCell.appendChild(updProcRBTT(i, procNo, prC));

			bCell = $c("", [['class', 'tb3cresbar']]);
			bCell.appendChild(updColTableResBarTooltip(i, procNo, prC));

			strSpan = timeToFill[i][1];
			strSpanNew = strSpan.replace("font-weight:bold", "font-weight:normal;");
			cCell = $c(strSpanNew, [['class', 'lr']]);

			//intTpPh;
			intTpPh = (i == 3 ? TB3O.tPpH[4] : TB3O.tPpH[i]);
			dCell = $c($ls(intTpPh), [['class', 'tb3ctot']]);

			aRow.appendChild($c(gIc["r" + (i + 1)], [['class', 'tb3c']]));
			aRow.appendChild(aCell);
			aRow.appendChild(bCell);
			aRow.appendChild(cCell);
			aRow.appendChild(dCell);
			rbT.appendChild(aRow);
		};
		//Append a row for totals per hour

		tRow = $r([['class', 'tb3r']]);
		tRow.appendChild($c(gIc["r1"] + " + " + gIc["r2"] + " + " + gIc["r3"] + " + " + gIc["r4"] + " / 1h", [['class', 'tb3ctotv'], ['colspan', '3']]));
		tRow.appendChild($c($ls(intpph), [['class', 'tb3ctotv']]));
		tRow.appendChild($c($ls(intPPH), [['class', 'tb3ctot'], ['style', 'border-top:2px solid silver; border-bottom:2px solid silver;']]));
		rbT.appendChild(tRow);
		
		//append a row for total crop consumption
		bRow = $r([['class', 'tb3r']]);
		bRow.appendChild($c(gIc["r5"], [['class', 'tb3c'], ['colspan', '2']]));
		bRow.appendChild($c("", [['class', 'tb3c']]));
		bRow.appendChild($c($ls(prodPerHour[6]), [['class', 'lr']]));
		bRow.appendChild($c($ls(tPpH[4] - tPpH[3]), [['class', 'tb3ctot']]));
		rbT.appendChild(bRow);

		//append a row for effective crop production
		cRow = $r([['class', 'tb3r']]);
		cRow.appendChild($c(gIc["r4"] + " - " + gIc["r5"], [['class', 'tb3c'], ['colspan', '2']]));
		cRow.appendChild($c("", [['class', 'tb3c']]));
		cRow.appendChild($c($ls(prodPerHour[3]), [['class', 'lr']]));
		cRow.appendChild($c($ls(tPpH[3]), [['class', 'tb3ctot']]));
		rbT.appendChild(cRow);
		return rbT;
	};

	function insertUserLinks(aNode, uid, strName) {
		if (aNode.parentNode) {
			if (aNode.parentNode.innerHTML.indexOf(imP) == -1) {
				if (TB3O.O[30] == "1") insertTravMapUserLink(aNode, uid, strName);
				if (TB3O.O[28] == "1") insertWALink(aNode, uid);
				if (TB3O.UserID != uid || (TB3O.UserID == uid && TB3O.O[62] != "0")) insertIGMLink(aNode, uid);
			};
		};
	};

	function insertAttSendResLinks(aNode, newdid) {
		aP = aNode.parentNode;
		if (aP && aP.innerHTML.indexOf("att_link_" + newdid) == -1) {
			//insert a market link for this village
			var aSR = $a("&nbsp;" + gIc["r41"], [['href', aNode.href.replace("karte.php?d", "build.php?z") + "&gid=17"]]);
			aP.insertBefore(aSR, aNode.nextSibling);
			var aAT = $a("&nbsp;" + gIc[getRPDefAction()], [['href', 'a2b.php?z=' + newdid], ['id', 'att_link_' + newdid]]);
			aP.insertBefore(aAT, aNode.nextSibling);
		};
	};

	function insertAllyLinks(aNode, aid, strName) {
		aP = aNode.parentNode;
		if (aP && aP.innerHTML.indexOf(imP) == -1) {
			//insert the Travmap link
			if (TB3O.O[31] == "1") aP.insertBefore(createMapLink("ally", aid, strName), aNode.nextSibling);
			//insert the Travian World Analyser link
			if (TB3O.O[28] == "1") aP.insertBefore(createStatLink("ally", aid), aNode.nextSibling);
		};
	};

	function getTroopIndexTitleFromImg(tImg) {
		tInfo = [0, ""];
		if (tImg.src.match(/img\/un\/u\/(\d+)\.gif/)) tInfo[0] = RegExp.$1; else {
			imgCN = tImg.getAttribute("class");
			if (imgCN && imgCN.indexOf("unit") != -1 && imgCN.search(/(\d+)/) != -1) tInfo[0] = RegExp.$1;
		};
		tInfo[1] = tImg.title;
		return tInfo;
	};
	
	//add player & ally links - IGM, World Analyser, Map Analyser
	function playerLinks(idNode){
		var wrp = $g(idNode);
		if (!wrp) return;
		var aL = wrp.getElementsByTagName("a");
		for(var i = 0; i < aL.length; i++) {
			//a player link
			if (aL[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
				var a = RegExp.$1;
				if (a == 0) continue;
				if (aL[i].parentNode.className == 'menu' || aL[i].parentNode.nodeName == 'P') continue;
				insertUserLinks(aL[i], a, aL[i].textContent);
			//the attack link for karte.php links
			} else if (aL[i].href.search(/karte.php\?d=(\d+)/) > 0  && crtPage.indexOf("build.php?gid=17") == -1) {
				var vID = RegExp.$1;
				if (vID != actV.vID) {
					insertAttSendResLinks(aL[i], vID);
					//if (TB3O.O[54] == "1" && (crtPage.indexOf("build.php?id=39") != -1 || crtPage.indexOf("gid=16") != -1 || crtPage.indexOf("berichte.php") != -1) || crtPage.indexOf("spieler.php?") != -1 || crtPage.indexOf("allianz.php?s=3") != -1) {
					if (TB3O.O[54] == "1" && (crtPage.indexOf("berichte.php") != -1 || crtPage.indexOf("spieler.php?") != -1 || crtPage.indexOf("allianz.php?s=3") != -1)) {
						//add a tooltip including distance and troop times - general
						aL[i].addEventListener("mouseover", showCoordAndDist(vID), false);
						aL[i].addEventListener("mouseout", hideTT, false);
					} else if (TB3O.O[81] == '1' && (crtPage.indexOf("gid=16") != -1 || crtPage.indexOf("id=39") != -1)) {
						//add a tooltip including distance and troop times - rally point
						aL[i].addEventListener("mouseover", showCoordAndDist(vID), false);
						aL[i].addEventListener("mouseout", hideTT, false);
					};
				};
			//an alliance link
			} else if (aL[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				insertAllyLinks(aL[i], a, aL[i].textContent);
			//a message link
			} else if (TB3O.O[60] == "1" && (aL[i].href.indexOf("nachrichten.php?id=") != -1 || aL[i].href.indexOf("berichte.php?id=") != -1)) addReadMesRepInPopup(aL[i]);
		};

		function showCoordAndDist(vID) {
			return function() {
				var cdT = $t();
				var cdR = $r();
				var xy = id2xy(vID);
				cdR.appendChild($c("(" + xy[0] + "|" + xy[1] + ")", [['class', 'tb3cCinTT'], ['colspan', '2']]));
				cdT.appendChild(cdR);
				var ttHTML = cdT.innerHTML;
				ttHTML += getTroopMerchantTooltipHTML(vID, "blue", false, true, true);
				ttHTML = "<table>" + ttHTML + "</table>";
				var ttDiv = $g("tb_tooltip");
				if (ttDiv == null) ttDiv = createTooltip();
				ttDiv.innerHTML = ttHTML;
				ttDiv.style.display = 'block';
				cdT = null;
			};
		};
	};

	//just to add the time tables for troops and merchants
	function quickCity() {
		var formInput = $xf("//form[@name='snd']");
		if (!formInput) return;
		if (crtPage.indexOf('a2b.php') != -1 || crtPage.indexOf('karte.php?d=') != -1) {
			var x = null;
			var y = null;
			strSearch = "//form[@name='snd']";
			aForm = $xf(strSearch);
			if (aForm) {
				x = $xf(strSearch + "//input[@name='x']");
				y = $xf(strSearch + "//input[@name='y']");
			};
			if (x) x.addEventListener('keyup', function() {captureDestination();}, 0);
			if (y) y.addEventListener('keyup', function() {captureDestination();}, 0);
			if (crtPage.indexOf('a2b.php?z=') != -1) captureDestination();
			if (crtPage.indexOf('a2b.php?newdid=') != -1 && crtPage.indexOf('z=') != -1) captureDestination();
		};

		function captureDestination() {
			xD = x.value;
			yD = y.value;
			parOK = null;
			var oldTb = $g("trooptimetable");
			if (xD != "" && yD != "") {
				if (oldTb) {
					parOK = oldTb.parentNode;
					oldTb.parentNode.removeChild(oldTb);
				};
				//compatibility to Travian Battle Analyser
				if (!parOK) {
					//consider Travian Battle Analyser script
					parOK = $xf("//form[@name='snd']/p[4] | //form[@name='snd']/p[3]");
					if (!parOK) {
						btnOK = $g("btn_ok");
						if (btnOK) {
							parOK = $e("P", "");
							btnOK.parentNode.appendChild(parOK);
						};
					};
				};
				createTimeTroopTable(parOK, xD, yD, true);
			} else {
				//oldTb = $g("trooptimetable");
				if (oldTb) oldTb.style.visibility = "hidden";
			};
			return;
		};
	};

	function battleReportV2(aFrom){
		var origT = getOrigBRTable();
		if (!origT) return;
		var txtorigT = origT.innerHTML;
		if (TB3O.O[63] != '1') return;

		var t = $xf("//table[@class='std reports_read']//table[@class='std'] | //table[@class='tbg']//table[@class='tbg']", 'l');
		if (t.snapshotLength < 2) t = $xf("//table[@class='std reports_read']//table[@class='tbg']", 'l');
		if (t.snapshotLength < 2) t = $xf("//table[starts-with(@id, 'attacker') or starts-with(@class, 'defender')]", 'l');
		if (t.snapshotLength < 2) return;

		if (aFrom == "orig") {
			var neworigT = origT.cloneNode(true);
			var divlmid2 = $g(dmid2);
			divlmid2.removeChild(origT);
			//add a paragraph, a table with a text and a checkbox
			var input = $i([['type', 'checkbox'], ['id', 'tb_battlereport']]);
			input.addEventListener("click", function() { showHideOriginalBattleReport(p1, neworigT, origT); }, 0);

			var p2 = $e("P", "");
			var ptable = $t([['style', 'background-color:white; width:auto;']]);
			var aRow = $r([['class', 'tb3rnb']]);
			var aCell = $c(T('SHOWORIGREPORT') + ":", [['class', 'tb3cnb'], ['style', 'text-align:'+ docDir[0] + ';']]);
			aRow.appendChild(aCell);
			var bCell = $c("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
			bCell.appendChild(input);
			aRow.appendChild(bCell);
			ptable.appendChild(aRow);
			p2.appendChild(ptable);
			divlmid2.appendChild(p2);

			//create a  second paragraph (for displaying the tables)
			var p1 = $e("P", "");
			//append the paragraph to the divlmid2
			var divlmid2 = $g(dmid2);
			divlmid2.appendChild(p1);
			p1.appendChild(origT);
		};

		//get the total booty info (PLUS accounts)
		var gBooty = $xf("//div[@class='carry']");
		var bgBooty = null;
		if (gBooty) bgBooty = gBooty.cloneNode(true);

		//get the total booty
		var booty = 0;
		var labelReward = gIc["capacity"];
		var imgRes = new Array;
		for (var i = 0; i < 4; i++) {imgRes[i] = gIc["r" + (i + 1)];};
		var stBooty = [0, 0, 0, 0];

		if (TB3O.T35 == false) {
			var aX = $xf("//tr[@class='cbg1'] | //table[@class='tbg']//tr", 'l');
			if (aX.snapshotLength >= 3){
				var intToProcess = -1;
				for (var i = 0; i < aX.snapshotLength; i++) {if (aX.snapshotItem(i).childNodes.length == 4) intToProcess = i;};
				if (intToProcess > -1) {
					var b = aX.snapshotItem(intToProcess).childNodes[3];
				} else {
					var b = aX.snapshotItem(1).childNodes[1];
					if (b.innerHTML.indexOf('class="res"') == -1) b = aX.snapshotItem(2).childNodes[1];
				};
				if (b.childNodes.length == 8){
					var qBooty = new Array();
					var infoBooty = '';
					for (var i = 0; i < 4; i++) {
						qBooty[i] = parseInt(b.childNodes[i*2 + 1].nodeValue);
						infoBooty += imgRes[i];
						infoBooty += qBooty[i];
						infoBooty += (i < 3 ? ' + ' : ' = ');
						stBooty[i] = qBooty[i];
					};
					booty = arrayToInt(qBooty);
					infoBooty += booty;
					b.innerHTML = infoBooty;
					if (bgBooty != null) b.appendChild(bgBooty);
				};
			};
		} else {
			var aX = t.snapshotItem(0);
			var infoBooty = '';
			//var b1Table = aX.snapshotItem(0).parentNode;
			var b1Table = aX;
			if (!b1Table.rows[4]) return;
			var xi = 4;
			var gata = false;
			while (xi < b1Table.rows.length && !gata) {
				var bootyCell = b1Table.rows[xi].cells[1];
				if (bootyCell.textContent.indexOf("|") != -1) gata = true;
				xi += 1;
			};
			if (gata) {
				var resInfo = bootyCell;
				for (var xi = 0; xi < bootyCell.childNodes.length; xi++) {
					var aChild = bootyCell.childNodes[xi];
					if (aChild.className == "goods" || aChild.className == "res") resInfo = aChild;
				};
				var aqBooty = resInfo.textContent.split("|");
				if (aqBooty.length > 1) {
					var qBooty = new Array();
					for (var i = 0; i < 4; i++) {
						qBooty[i] = parseInt(aqBooty[i].replace(" ", "").replace(" ", ""));
						infoBooty += imgRes[i];
						infoBooty += qBooty[i];
						if (i < 3) infoBooty += ' + '; else infoBooty += ' = ';
						stBooty[i] = qBooty[i];
					};
					booty = arrayToInt(qBooty);
					infoBooty += booty;
					bootyCell.innerHTML = infoBooty;
					if (bgBooty != null) bootyCell.appendChild(bgBooty);
				};
			};
		};

		var arrLoss = new Array();
		var arrCarry = new Array();
		//there are more tables for the attack (1 = attacker, 1 = attacked and x = reinforcements)
		//tadPower => 0 = attack power; 1 = def_i power; 2 = def_c power; 3 = total loss; 4 = loss res 1; 5 = loss res 2; 6 = loss res 3; 7 = loss ress 4; 8 = crop consumption of killed troops; 9 = hero no.; 10 = crop consumption of initial troops
		var tadPower = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
		var atkLabelCell;
		var defLabelCell;
		var brCell = t.snapshotItem(0).parentNode;

		for (var g = 0; g < t.snapshotLength; g++){
			arrCarry[g] = 0;
			tTable = t.snapshotItem(g);
			attdefPower = [0,0,0];
			intNoOfCells = tTable.rows[1].cells.length - 1;
			if (intNoOfCells == 11) {
				//corrected by JOPS
				if (g == 0) tadPower[0][9] += 1; else tadPower[1][9] += parseInt(tTable.rows[2].cells[11].textContent);
			};
			if (g == 0) atkLabelCell = tTable.rows[0].cells[0].textContent; else defLabelCell = tTable.rows[0].cells[0].textContent;
			for(var j = 1; j < 11; j++){
				tImg = tTable.rows[1].cells[j].getElementsByTagName('img')[0];
				tInd = getTroopIndexTitleFromImg(tImg)[0];
				tNo = parseInt(tTable.rows[2].cells[j].textContent);
				tNoLost = 0;
				if (tTable.rows[3]) tNoLost = parseInt(tTable.rows[3].cells[j].textContent);
				if (!isNaN(tNo)) {
					if (g == 0) {
						attdefPower[0] += uc[tInd][5] * tNo;
						tadPower[0][0] += uc[tInd][5] * tNo;
						tadPower[0][1] += uc[tInd][6] * tNo;
						tadPower[0][2] += uc[tInd][7] * tNo;
						tadPower[0][8] += uc[tInd][9] * tNoLost;
						tadPower[0][10] += uc[tInd][9] * tNo;
					} else {
						attdefPower[0] += uc[tInd][5] * tNo;
						attdefPower[1] += uc[tInd][6] * tNo;
						attdefPower[2] += uc[tInd][7] * tNo;
						tadPower[1][0] += uc[tInd][5] * tNo;
						tadPower[1][1] += uc[tInd][6] * tNo;
						tadPower[1][2] += uc[tInd][7] * tNo;
						tadPower[1][8] += uc[tInd][9] * tNoLost;
						tadPower[1][10] += uc[tInd][9] * tNo;
					};
				};
				u = uc[tInd];
				p = tTable.rows[3] ? tTable.rows[3].cells[j].innerHTML : 0;
				ptu = arrayByN(u, p);
				arrLoss[g] = arrayAdd(arrLoss[g], ptu.slice(0, 4));
				arrCarry[g] += (tTable.rows[2] ? tTable.rows[2].cells[j].innerHTML - p : 0) * u[4];
			};
			//add the attack/def power to the row[1].cells[0]
			var attdefCell = tTable.rows[1].cells[0];
			if (g == 0) {
				//the attacking power
				$at(attdefCell, [['style', 'font-size:8pt; color:#FF8000; text-align:center;']]);
				attdefCell.innerHTML = $ls(attdefPower[0]) + " " + gIc["att_all"];
			} else {
				//the defense power of the defender (per table)
				$at(attdefCell, [['style', 'font-size:8pt; color:green; text-align:center;']]);
				attdefCell.innerHTML = $ls(attdefPower[1]) + " " + gIc["def_i"] + "<br>" + $ls(attdefPower[2]) + " " + gIc["def_c"];
			};

			//add the loss row to the att/def table
			var iHTML = '';
			for (var i = 0; i < 4; i++){
				iHTML += imgRes[i];
				iHTML += arrLoss[g][i];
				if (i < 3) iHTML += ' + '; else iHTML += ' = ';
				if (g == 0) tadPower[0][4 + i] += arrLoss[g][i]; else tadPower[1][4 + i] += arrLoss[g][i];
			};
			var lossTotal = arrayToInt(arrLoss[g]);
			if (g == 0) tadPower[0][3] += lossTotal; else tadPower[1][3] += lossTotal;
			if (lossTotal > 0) iHTML += " <b><font color='red'>" + lossTotal + "</font></b>"; else iHTML += lossTotal;
			var informe = $c(iHTML, [['colspan', intNoOfCells], ['class', 's7']]);
			var aRow = $r([['class', 'cbg1']]);
			aRow.appendChild($c(T('LOSS'), [['style', 'text-align:center;']]));
			aRow.appendChild(informe);
			tTable.appendChild(aRow);

			//For the attacker we'll compute the profit and efficiency of the attack
			if (g == 0){
				// Profit compared to lossTotal
				var profit = 0;
				if (arrCarry[g] == 0) {
					booty = 0;
					for (var i = 0; i < 4; i++) {stBooty[i] = 0;};
				} else  {
					profit = ((booty - lossTotal) * 100 / booty).toFixed(2);
				};
				if (booty == 0)	if (lossTotal == 0) profit = 0; else profit = -100;
				var bCell = $c(profit + "%", [['colspan', intNoOfCells], ['class', 's7']]);
				var pRow = $r([['class', 'cbg1']]);
				pRow.appendChild($c(T('PROFIT'), [['style', 'text-align:center;']]));
				pRow.appendChild(bCell);
				tTable.appendChild(pRow);

				// Efficiency -> the entire booty compared to how much the attacker can carry back (considering only the troops that survived)
				var efficiency = 100 - ((arrCarry[g] - booty) * 100 / arrCarry[g]);
				if (arrCarry[g] == 0) efficiency = 0;
				var bCell = $c(efficiency.toFixed(2) + "% (" + booty + "/" + arrCarry[g] + ")", [['colspan', intNoOfCells], ['class', 's7']]);
				var eRow = $r([['class', 'cbg1']]);
				eRow.appendChild($c(T('EFICIENCIA'), [['style', 'text-align:center;']]));
				eRow.appendChild(bCell);
				tTable.appendChild(eRow);
			};
		};

		//add a simple statistics table
		var sTable = $t([['id', 'br_table']]);

		//add the title row
		var sTitleRow = $r([['class', 'tb3r']]);
		sTitleRow.appendChild($c(T('STATISTICS'), [['class', 'tb3cbrh1']]));
		sTitleRow.appendChild($c(atkLabelCell, [['class', 'tb3cbrh2']]));
		sTitleRow.appendChild($c(defLabelCell, [['class', 'tb3cbrh3']]));
		sTable.appendChild(sTitleRow);

		//attack power row
		var atkRow = $r();
		atkRow.appendChild($c(gIc["att_all"], [['class', 'tb3cbr1']]));
		atkRow.appendChild($c($ls(tadPower[0][0]), [['class', 'tb3cbr2']]));
		atkRow.appendChild($c($ls(tadPower[1][0]), [['class', 'tb3cbr2']]));
		sTable.appendChild(atkRow);

		//def power rows
		var defiRow = $r();
		defiRow.appendChild($c(gIc["def_i"], [['class', 'tb3cbr1']]));
		defiRow.appendChild($c($ls(tadPower[0][1]), [['class', 'tb3cbr2']]));
		defiRow.appendChild($c($ls(tadPower[1][1]), [['class', 'tb3cbr2']]));
		sTable.appendChild(defiRow);

		var defcRow = $r();
		defcRow.appendChild($c(gIc["def_c"], [['class', 'tb3cbr1']]));
		defcRow.appendChild($c($ls(tadPower[0][2]), [['class', 'tb3cbr2']]));
		defcRow.appendChild($c($ls(tadPower[1][2]), [['class', 'tb3cbr2']]));
		sTable.appendChild(defcRow);

		//reward row (for the attacker only)
		var rewATotal = $c($ls(booty) + (TB3O.O[64] == '1' ? " " + T('TOTAL') : ''), [['class', 'tb3crb2'], ['style', 'font-weight:bold;']]);

		var rewRow1 = $r();
		var intDetailRowSpan = 1 + parseInt(TB3O.O[64]);
		var rewLabelCell = $c(labelReward, [['class', 'tb3cbr1'], ['rowspan', intDetailRowSpan]]);
		rewRow1.appendChild(rewLabelCell);

		if (TB3O.O[64] == '1') {
			var rewA = '';
			for (var i = 1; i < 5; i++) {rewA += $ls(stBooty[i - 1]) + " " + imgRes[i - 1] + "<br>";};
			rewADetail = $c(rewA, [['class', 'tb3cbr2']]);
			rewRow1.appendChild(rewADetail);
		} else rewRow1.appendChild(rewATotal);

		rewRow1.appendChild($c('-', [['class', 'tb3cbr2'], ['rowspan', intDetailRowSpan]]));
		sTable.appendChild(rewRow1);

		if (TB3O.O[64] == '1') {
			var rewRow2 = $r();
			rewRow2.appendChild($c($ls(booty) + " " + T('TOTAL'), [['class', 'tb3cbr2b']]));
			sTable.appendChild(rewRow2);
		};

		//loss row
		var strLossATotal = $ls(tadPower[0][3]) + (TB3O.O[64] == '1' ? " " + T('TOTAL') : '');
		var lossATotal = $c(strLossATotal, [['class', 'tb3cbr2b']]);
		if (tadPower[0][3] > 0) $at(lossATotal, [['class', 'tb3cbr2br']]);

		var strLossDTotal = $ls(tadPower[1][3] + booty) + (TB3O.O[64] == '1' ? " " + T('TOTAL') : '');
		lossDTotal = $c(strLossDTotal, [['class', 'tb3cbr2b']]);
		if (tadPower[1][3] + booty > 0) $at(lossDTotal, [['class', 'tb3cbr2br']]);

		var lossRow1 = $r();
		lossRow1.appendChild($c(T('LOSS'), [['class', 'tb3cbr1'], ['rowspan', intDetailRowSpan]]));

		if (TB3O.O[64] == '1') {
			var iLossA = '';
			var iLossD = '';
			for (var i = 1; i < 5; i++) {
				iLossA += $ls(tadPower[0][i + 3]) + " " + imgRes[i - 1] + "<br>";
				iLossD += $ls(tadPower[1][i + 3] + stBooty[i - 1]) + " " + imgRes[i - 1] + "<br>";
			};
			var lossADetail = $c(iLossA, [['class', 'tb3cbr2']]);
			if (tadPower[0][3] > 0) $at(lossADetail,[['class', 'tb3cbr2r']]);
			lossRow1.appendChild(lossADetail);
			var lossDDetail = $c(iLossD, [['class', 'tb3cbr2']]);
			if (tadPower[1][3] + booty > 0) $at(lossDDetail, [['class', 'tb3cbr2r']]);
			lossRow1.appendChild(lossDDetail);
		} else {
			lossRow1.appendChild(lossATotal);
			lossRow1.appendChild(lossDTotal);
		};
		sTable.appendChild(lossRow1);

		if (TB3O.O[64] == '1') {
			var lossRow2 = $r();
			lossRow2.appendChild(lossATotal);
			lossRow2.appendChild(lossDTotal);
			sTable.appendChild(lossRow2);
		};

		//crop consumption of initial troops
		var ccRow = $r();
		ccRow.appendChild($c(gIc["r5"], [['class', 'tb3cbr1']]));
		ccRow.appendChild($c(tadPower[0][10] + " (-" + tadPower[0][8] + ")", [['class', 'tb3cbr2']]));
		ccRow.appendChild($c(tadPower[1][10] + " (-" + tadPower[1][8] + ")", [['class', 'tb3cbr2']]));
		sTable.appendChild(ccRow);

		//hero row
		var heroRow = $r();
		heroRow.appendChild($c(gIc["hero"], [['class', 'tb3cbr1']]));
		var accA = (tadPower[0][9] > 0 ? tadPower[1][8] : 0);
		var accD = (tadPower[1][9] > 0 ? Math.floor(tadPower[0][8] / tadPower[1][9]) : 0);
		heroRow.appendChild($c(accA, [['class', 'tb3cbr2b']]));
		heroRow.appendChild($c(accD, [['class', 'tb3cbr2b']]));
		sTable.appendChild(heroRow);

		//simple paragraph
		brCell.appendChild($e("P"));
		brCell.appendChild(sTable);

		function showHideOriginalBattleReport(p1, neworigT, origT) {
			var input = $g("tb_battlereport");
			if (input) {
				if (input.checked == true) {
					p1.removeChild(origT);
					p1.appendChild(neworigT);
				} else {
					p1.removeChild(neworigT);
					p1.appendChild(origT);
				};
			};
		};
	};

	//get the troop movements from the "dorf1.php" page
	function getTroopMovements() {
		var arrAtt = new Array();
		var aTM = $xf("//div[@id='troop_movements']//table/tbody/tr | //div[starts-with(@id, 'ltbw')]//table[@class='f10']/tbody/tr | //table[@id='movements']/tbody/tr", 'l');
		var intNo = 0;
		if (aTM.snapshotLength > 0) {
			for (var i = 0; i < aTM.snapshotLength; i++) {
				var aRow = aTM.snapshotItem(i);
				if (aRow.cells.length > 1) {
					var aImg = aRow.cells[0].getElementsByTagName("IMG");
					if (aImg.length > 0) {
						var imgType = aImg[0].className;
						if (imgType == '') imgType = aImg[0].src.substring(aImg.src.lastIndexOf("/") + 1);
						var strTime;
						if (aRow.cells[4]) {
							strTime = aRow.cells[4].getElementsByTagName("SPAN")[0].textContent;
							intNo = parseInt(aRow.cells[1].textContent.replace("»", "").replace("«", ""));
						} else {
							if (aRow.cells[1].getElementsByTagName("SPAN").length == 2) {
								strTime = aRow.cells[1].getElementsByTagName("SPAN")[1].textContent;
								intNo = parseInt(aRow.cells[1].getElementsByTagName("SPAN")[0].textContent);
							} else {
								intNo = parseInt(aRow.cells[1].getElementsByTagName("SPAN")[0].textContent);
								strTime = aRow.nextSibling.cells[1].getElementsByTagName("SPAN")[0].textContent;
							};
						};
						var dFirst = new Date();
						dFirst.setTime(dFirst.getTime() + toSeconds(strTime) * 1000);
						arrAtt[arrAtt.length] = new xTrMov(imgType, intNo, dFirst.getTime());
					};
				};
			};
		};
		setGMcookieV2('TroopMovements', arrAtt, actV.vNewdid);
	};

	//Create the resource fields upgrade table
	function processDorf1() {
		getTroopMovements();
		var vXY = TB3O.U[6].split('|');
		var bIsC = (xy2id(vXY[0], vXY[1]) == parseInt(actV.vID));//is this the capital
		//get the buildings in progress
		var arrBiP = getArrBiP();

		if (TB3O.O[38] == "1") {
			//create the DIV for the coloured level numbers
			var intTop = 69;
			if (TB3O.M35 == 1) intTop = 47; else if (TB3O.M35 == 2) intTop = 90;

			var posDIV = $d("", [['id', 'resDiv'], ['style', 'position:absolute; top:' + intTop + 'px; left:12px; z-index:11;']]);
			if (TB3O.T35 == false) {
				if (docDir[0] == 'right') $at(posDIV, [['style', 'position:absolute; top:69px; left:257px; z-index:20;']]);
			} else {
				if (docDir[0] == 'right') {
					if (TB3O.M35 == 2) pDs = 'position:absolute; top:' + intTop + 'px; left:240px; z-index:20;'; else pDs = 'position:absolute; top:30px; left:257px; z-index:20;';
					$at(posDIV, [['style', pDs]]);
				};
			};
			$g(dmid2).appendChild(posDIV);
		};

		var grid = new Array(4);
		for (var i = 0; i < 4; i ++) {
			grid[i] = new Array(26);
			for (var j = 0; j <= 25; j++) {grid[i][j] = 0;};
		};

		//12 types of villages (only 6 if < T3.5)
		var dist = [
			[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //9 crop
			[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-4-6
			[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3], //15 crop
			[0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-3-7
			[2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-4-7
			[2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-3-4-7
			[2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-5-4-6
			[2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3], //4-3-5-6
			[0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1]  //5-4-3-6
		];

		var rDiv = $xf("//div[starts-with(@id,'village_map')]");
		var aTitle;
		if (rDiv) aTitle = $xf("//map[starts-with(@id, 'rx')]"); else {
			rDiv = $xf("//div[starts-with(@id,'f')]");
			aTitle = $xf("//map[starts-with(@name, 'rx')]");
		};

		if (rDiv) {
			if (rDiv.className) rDiv.className.search(/f(\d+)/); else rDiv.id.search(/f(\d+)/);
			var tipo = RegExp.$1;
		};
		for (var i = 1; i <= 18; i++){
			if (TB3O.T35 == false) {var imgLvl = $xf("//img[@class='rf" + i + "']");} else {
				var imgLvl = 0;
				var aLvl = $xf("//img[starts-with(@class, 'reslevel rf" + i + " ')]");
				if (aLvl != null) imgLvl = aLvl.className.split(" ")[2].replace("level", "")
			};
			var crtLevel = 0;
			var strNewLevel = null;
			if (imgLvl && imgLvl != 0) {
				if (TB3O.T35 == false) {
					imgLvl.src.search(/\/s(\d+).gif$/);
					crtLevel = parseInt(RegExp.$1);
				} else crtLevel = parseInt(imgLvl);
				if (arrBiP != null) {
					strNewLevel = getNewUpgradeLevel(arrBiP, '', crtLevel);
					crtLevel = strNewLevel[0];
				};
				grid[dist[tipo - 1][i - 1]][crtLevel] = i;
			} else grid[dist[tipo - 1][i - 1]][0] = i;

			var strClass = (TB3O.T35 == false ? "rf" : "reslevel rf") + i;
			var resLink = $a("", [['href', "build.php?id=" + i], ['id', "RES" + i], ['class', strClass], ['title', aTitle.areas[i-1].title]]);

			if (posDIV) {
				posDIV.appendChild(resLink);
				aDIV = createCNDiv(crtLevel, strNewLevel);
				resLink.appendChild(aDIV);
			};

			if (TB3O.O[38] == "1") {
				aDIV.style.visibility = 'visible';
				var theDivColor = TB3O.CNc[1];
				if ((bIsC == false && crtLevel < 10) || (bIsC == true && TB3O.O[1] != "1") || (bIsC == true && TB3O.O[1] == "1" && crtLevel < 12)) {
					//select resource type
					var aCol = colorLvl(crtLevel, dist[tipo - 1][i - 1] + 1);
					if (aCol == 2) theDivColor = TB3O.CNc[4]; else if (aCol == 0) theDivColor = TB3O.CNc[3];
				} else theDivColor =  TB3O.CNc[2];
				aDIV.style.backgroundColor = theDivColor;
			};
		};

		if (TB3O.O[37] == '1') {
			//create the resource fields upgrade table
			var table = $t([['id', 'upgTable']]);
			var aRow1 = $r();
			var showUpgTable = false;
			table.appendChild(aRow1);
			var noOfEntries = [0, 0, 0, 0];
			var noOfRow = 0;
			for (var i = 0; i < 4; i++) {
				var td1 = $c(gIc["r" + (i + 1)], [['class', 'tb3uthc']]);
				aRow1.appendChild(td1);
				for (var j = 0; j < 25; j++){
					if ((bIsC) || (!bIsC && j < 10)){
						if (grid[i][j] > 0 && bCost[i + 1][j+1] != null){
							noOfEntries[i] = noOfEntries[i] + 1;
							for (k = 0; k < 4; k++) {
								if (noOfRow < noOfEntries[k]) {
									noOfRow = noOfEntries[i];
									var bRow = $r();
									for (xi = 0; xi < 4; xi++) {bRow.appendChild($c("", [['class', 'tb3utbc']]));};
									table.appendChild(bRow);
								};
							};
							var table2 = $t([['class', 'tb3tbnb'], ['style', 'text-align:' + docDir[1] + '; vertical-align:top;']]);
							var td4 = table.rows[noOfEntries[i]].cells[i];
							td4.appendChild(table2);

							showUpgTable = true;
							var aRow3 = $r();

							var intxOffset = 17;
							if (j > 9) intxOffset = 13;
							var cDIV = $d(j, [['style', 'font-family: Arial,Helvetica,Verdana,sans-serif; font-size:9pt; color:black; position:relative; top:-28px;' + docDir[0] + ':' + intxOffset +'px; z-index:100;']]);

							aLink = $a("", [['href', "/build.php?id=" + grid[i][j]]]);
							aDiv = $d("", [['style', 'width:0%;']]);
							aDiv.appendChild($img([['src', image["upgr" + i]], ['title', T('RES' + (i + 1))]]));
							aDiv.appendChild(cDIV);
							aLink.appendChild(aDiv);

							var td = $c("", [['class', 'tb3cnb'], ['style', 'vertical-align:top;']]);
							td.appendChild(aLink);
							aRow3.appendChild(td);

							restante = calculateResourceTime(bCost[i + 1][j+1], "100");
							var td3 = $c("", [['class', 'tb3cnb']]);
							aRow3.appendChild(td3);
							table2.appendChild(aRow3);
							cpB = [bCost[i + 1][j][4], bCost[i + 1][j + 1][4]];
							ccB = [bCost[i + 1][j][5], bCost[i + 1][j + 1][5]];
							//********************
							if (restante != null) {
								if (TB3O.O[34] == '1') restante.appendChild(getCpcRow(cpB, "cp"));
								if (TB3O.O[35] == '1') restante.appendChild(getCpcRow(ccB, "cc"));
								$at(td3, [['class', 'tb3cnb'], ['style', 'vertical-align:bottom;']]);
								td3.appendChild(restante);
							} else {
								$at(td3, [['style', 'vertical-align:middle;']]);
								var aTb = $t([['class', 'tb3tbnb']]);
								var aRow = $r();
								var aCell = $c('<a href="/build.php?id=' + grid[i][j] + '">' + T('EXTAV') + '</a>', [['class', 'tb3cnb'], ['style', 'font-size:8pt; font-weight:bold;']]);
								aRow.appendChild(aCell);
								aTb.appendChild(aRow);
								if (TB3O.O[34] == '1') aTb.appendChild(getCpcRow(cpB, "cp"));
								if (TB3O.O[35] == '1') aTb.appendChild(getCpcRow(ccB, "cc"));
								td3.appendChild(aTb);
							};
						};
					};
				};
			};
			//position of the upgrade table
			if (showUpgTable == true)  {
				var middleblock = $g(dmid);
				table.style.top = deltaTopY(table) + 'px';
				middleblock.appendChild(table);
			};
		};
		arrBiP = null; dist = null; bCost = null; grid = null; aDiv = null;
	};

	function getCpcRow(cpcPerDay, aType) {
		var cpcRow = $r();
		var dAr = (docDir[0] == 'right' ? dAr = '←' : '→');
		if (aType == "cp") {strIn = T('CPPERDAY'); tColor = "blue"} else if (aType == "cc") {strIn = gIc["r5"]; tColor = "red";};
		cpcRow.appendChild($c(strIn + ": " + cpcPerDay[0] + " " + dAr + " " + cpcPerDay[1], [['class', 'tb3cnb'], ['colspan', '3'], ['style', 'font-size:8pt; color:' + tColor + ';']]));
		return cpcRow;
	};

	function getNewUpgradeLevel(aB, bName, lvl) {
		var nlvl = [parseInt(lvl), ''];
		for (var xi = 0; xi < aB.length; xi++) {
			if (aB[xi].name != '') {
				if (aB[xi].name == bName && parseInt(aB[xi].lvl) == nlvl[0] + 1) {
					nlvl[0] += 1;
					nlvl[1] = " (↑ " + (nlvl[0] + 1) + ")";
				};
			};
		};
		return nlvl;
	};

	//Create the buildings upgrade table & center numbers if necessary
	function processDorf2() {
		var mapB = $g('map2');
		if (!mapB) mapB = $xf("//map[@name='" + dmap + "']");
		if (!mapB) return;

		intCpR = 3;
		boolShowTable = false;
		arrBiP = getArrBiP();
		bData = new Array();

		function xBinfo(title, href, xy, bImg) {
			//current level and name of the building
			var bName = title;
			var bLevel = title.split(" ");
			var blvl = -1;
			if (bLevel.length > 1) {
				blvl = parseInt(bLevel[bLevel.length - 1]);
				if (isNaN(blvl)) blvl = -1;
				bName = bLevel.pop();
				bName = bLevel.pop();
				bName = bLevel;
				bName = bLevel.join(" ");
			};
			//gid of the building
			var gid = -1;
			var arrGid = bImg.split("/");
			var imgGid = arrGid[arrGid.length-1].split(".");
			if (imgGid[0].search(/(\d+)/) != -1) gid = parseInt(RegExp.$1);
			//create the bInfo object
			this.title = title;
			this.link = href;
			this.xy = xy;
			this.lvl = blvl;
			this.gid = gid;
			this.name = bName;
			this.bImg = bImg;
			return this;
		};

		function sortBuildingsInUpgTable(bData, k) {
			//insertion sort
			for (var i = 0; i < k; i++) {
				var kData = bData[i];
				var j = i;
				while (j > 0 && bData[j - 1].name > kData.name) {
					bData[j] = bData[j - 1];
					j--;
				};
				bData[j] = kData;
			};
			return bData;
		};

		//get the building images
		var bImg = new Array();
		if (TB3O.T35 == false) {
			var aXP = $xf("//div[@id='" + dmid2 + "']/img/@src", 'l');
		} else {
			var aXP = $xf("//div[starts-with(@id, 'village_map')]/img[starts-with(@class, 'building') or starts-with(@class, 'dx') or starts-with(@class, 'ww')] | //div[starts-with(@class, 'village2_map') and not (@id='village2_levels')]//img[starts-with(@class, 'building') or starts-with(@class, 'dx')]", 'l');
		};
		if (TB3O.T35 == false) bImg[0] = img('g/g16.gif');
		for (var i = 0; i < aXP.snapshotLength; i++) {
			if (TB3O.T35 == false) {
				bImg[bImg.length] = aXP.snapshotItem(i).nodeValue;
			} else {
				clName = aXP.snapshotItem(i).getAttribute("class");
				if (clName != null && clName != '') {
					clName1 = clName.split(" ");
					if (clName1.length > 1) bImg[bImg.length] = clName1[clName1.length - 1] + ".gif";
				};
			};
		};
		
		//get the type of wall
		var ahref = $xf("//area[@href='build.php?id=40']");
		if (ahref) {
			b = '';
			switch (TB3O.U[1]) {
				case avRace[0]: b = "g/g31.gif"; break;
				case avRace[1]: b = "g/g32.gif"; break;
				case avRace[2]: b = "g/g33.gif"; break;
			};
			if (b != '') {if (TB3O.T35 == false) bImg[bImg.length - 2] = img(b); else bImg[bImg.length] = b;};
		};

		//get building array and set the required cookies
		var maxB = bImg.length;
		for (var i = 0; i < bImg.length; i++) {
			bData[i] = new xBinfo(mapB.areas[i].title, mapB.areas[i].href, mapB.areas[i].coords, bImg[i]);
			switch (bData[i].gid) {
				case 25: TB3O.d2spB[0] = 25; break; //residence is available
				case 26: TB3O.d2spB[0] = 26; break; //palace is available
				case 19: TB3O.d2spB[1] = 19; TB3O.avBar = true; if (TB3O.U[1] == '' || TB3O.U[2] == '') getRace(); break;
				case 29: TB3O.d2spB[2] = 29; break;
				case 21: TB3O.d2spB[3] = 21; break;
				case 20: TB3O.d2spB[4] = 20; break;
				case 30: TB3O.d2spB[5] = 30; break;
				case 14: TB3O.d2spB[6] = bData[i].lvl; break;
				case 24: TB3O.d2spB[7] = 24; break;
				case 41: TB3O.d2spB[8] = bData[i].lvl; break;
			};
		};
		setGMcookieV2('specBuildings', TB3O.d2spB, actV.vNewdid);
		
		var aTb = $t([['id', 'upgTable']]);
		j = 0;
		k = bImg.length;
		if (TB3O.T35 == false) k = k - 1;

		if (TB3O.O[42] == '1') bData = sortBuildingsInUpgTable(bData, k);

		divmap2 = $xf("//div[starts-with(@class, 'village2_map d2_')]");
		if (divmap2 && TB3O.O[43] == '1') {
			var dm2c = divmap2.className.split(" ");
			divmap2.className = 'village2_mapTB3 ' + dm2c[1];
		};
		
		dy = ((TB3O.M35 == 0 || TB3O.M35 == 2) ? 60 : 30);
		for (var i = 0; i < k; i++) {
			if (bData[i].gid != -1 && bData[i].lvl != -1) {
				var strNewLevel = [bData[i].lvl, ''];
				var bLevel = bData[i].lvl;
				if (arrBiP != null) {
					strNewLevel = getNewUpgradeLevel(arrBiP, bData[i].name, bData[i].lvl);
					bLevel = strNewLevel[0];
				};
				if (TB3O.O[43] == '1' && bLevel != -1) {
					//show center numbers if required
					aDIV = createCNDiv(bData[i].lvl, strNewLevel);
					var xy = bData[i].xy.split(",");
					aDIV.style.top = parseInt(xy[1]) + dy + 'px';
					aDIV.style.left = parseInt(xy[0]) + 95 + 'px';

					var bMaxLevel = getBmaxLevel(bData[i].gid);
					var theDivColor = TB3O.CNc[1];
					if (TB3O.O[44] == '1') {
						if (bLevel == bMaxLevel || bLevel == 100) {
							theDivColor =  TB3O.CNc[2];
						} else {
							var aCol = colorLvl(bLevel, bData[i].gid);
							switch (aCol) {
								case 0: theDivColor = TB3O.CNc[3]; break;
								case 2: theDivColor = TB3O.CNc[4]; break;
							};
						};
					};
					aDIV.style.backgroundColor = theDivColor;
					$g(dmid2).appendChild(aDIV);
				};

				if (TB3O.O[41] == '1') {
					//create a new cell in the building uprade table id necessary
					if (bCost[bData[i].gid] != null && bCost[bData[i].gid][bLevel + 1] != null) {
						// check/create a new row if necessary
						if (j % intCpR == 0){
							var aRow = $r([['class', 'tb3r']]);
							aTb.appendChild(aRow);
						};
						j++;

						boolShowTable = true;
						//Switch image for the roman wall/pallisade/earth wall/rally point
						if (TB3O.M35 != 0) strBc = "building "; else strBc = "";
						var imgB = 'class="' + strBc + 'g' + bData[i].gid + '" src="' + xGIF + '"';
						var strImgWidth = '';
						switch (bData[i].gid) {
							//31,32,33 - citywall, earth wall, palisade
							case 31: bData[i].bImg = image["citywall"]; imgB = 'src="' + bData[i].bImg + '"'; break;
							case 32: bData[i].bImg = image["earthwall"]; imgB = 'src="' + bData[i].bImg + '"'; break;
							case 33: bData[i].bImg = image["palisade"]; imgB = 'src="' + bData[i].bImg + '"'; break;
							case 16: if (TB3O.T35 == false) {bData[i].bImg = image["rallypoint"]; imgB = 'src="' + bData[i].bImg + '"';}; break;
							case 40: bData[i].bImg = image["ww"]; imgB = 'src="' + bData[i].bImg + '"'; break;
						};

						var td = $c("", [['class', 'tb3c'], ['width', Math.floor(100/intCpR) + '%'], ['style', 'vertical-align:top; border:1px solid silver;']]);
						aRow.appendChild(td);

						var tb2 = $t([['id','bttable']]);
						td.appendChild(tb2);

						var nametr = $r();
						var namea = $a(bData[i].title + strNewLevel[1], [['href', bData[i].link]]);
						var nametd = $c('', [['colspan',"2"], ['class', 'tb3cnb']]);
						nametd.appendChild(namea);
						nametr.appendChild(nametd);
						tb2.appendChild(nametr);

						var bRow = $r();
						if (TB3O.T35 == false) {imgB = 'src="' + bData[i].bImg + '"'; strImgWidth = " width='90%' ";} else if (TB3O.M35 == 2) strImgWidth = "width='70px' height='100px'";
						var a2 = $a("<img '" + imgB + strImgWidth + "'></img>", [['href', bData[i].link]]);
						var td2 = $c('', [['class', 'tb3cnb'], ['style', 'vertical-align:top;']]);
						td2.appendChild(a2);
						bRow.appendChild(td2);
						tb2.appendChild(bRow);

						var restante = calculateResourceTime(bCost[bData[i].gid][bLevel + 1], "100");
						var td3 = $c("", [['class', 'tb3cnb'], ['style','vertical-align:bottom;']]);
						bRow.appendChild(td3);
						var cpB = [bCost[bData[i].gid][bLevel][4], bCost[bData[i].gid][bLevel + 1][4]];
						var ccB = [bCost[bData[i].gid][bLevel][5], bCost[bData[i].gid][bLevel + 1][5]];

						if (restante != null) {
							if (TB3O.O[34] == '1') restante.appendChild(getCpcRow(cpB, "cp"));
							if (TB3O.O[35] == '1') restante.appendChild(getCpcRow(ccB, "cc"));
							$at(td3, [['style', 'vertical-align:bottom;']]);
							td3.appendChild(restante);
						} else {
							$at(td3, [['style', 'vertical-align:middle;']]);
							var xTable = $t([['class', 'tb3tbnb']]);
							var xRow = $r();
							xRow.appendChild($c('<a href="' + bData[i].link + '">' + T('EXTAV') + '</a>', [['class', 'tb3cnb'],['style', 'font-size:8pt; font-weight:bold;']]));
							xTable.appendChild(xRow);
							if (TB3O.O[34] == '1') xTable.appendChild(getCpcRow(cpB, "cp"));
							if (TB3O.O[35] == '1') xTable.appendChild(getCpcRow(ccB, "cc"));
							td3.appendChild(xTable);
						};
					};
				};
			};
		};
		while (j % intCpR != 0) {
			aRow.appendChild($c("", [['class', 'tb3c']]));
			j++;
		};

		//reposition the building upgrade table vertically
		if (TB3O.O[41] == '1') {
			if (boolShowTable == true)  {
				var middleblock = $g(dmid);
				aTb.style.top = deltaTopY(aTb) + 'px';
				middleblock.appendChild(aTb);
			};
		};
		arrBiP = null;
		bData = null;
		bImg = null;
		bCost = null;
		aDIV = null;
	};

	function sortTable(sTableID, iCol, sDataType) {
		return function(){
			var oTb = $g(sTableID);
			var oB = oTb.tBodies[0];
			var arR = oB.rows;
			var aTRs = new Array;
			for (var i = 0; i < arR.length; i++) aTRs[i] = arR[i];
			if (oTb.getAttribute("sortCol") == iCol) aTRs.reverse(); else aTRs.sort(generateCompareTRs(iCol, sDataType));
			var oFrg = document.createDocumentFragment();
			for (var i = 0; i < aTRs.length; i++) oFrg.appendChild(aTRs[i]);
			oB.appendChild(oFrg);
			$at(oTb, [['sortCol', iCol]]);
			aTRs = null; arR = null; oB = null; oTb = null;
		};
	};

	function convert(aE, sDataType) {
		switch(sDataType) {
			case "int": return ((aE.nodeValue == null) || !aE.nodeValue.match(/\d+/)) ? 0 : parseInt(aE.nodeValue);
			case "float": return ((aE.nodeValue == null) || !aE.nodeValue.match(/\d+/)) ? 0 : parseFloat(aE.nodeValue);
			default: return (aE == null) ? '' : aE.textContent.toLowerCase();
		};
	};

	function generateCompareTRs(iCol, sDataType) {
		return function compareTRs(oTR1, oTR2) {
			var v1 = convert(oTR1.cells[iCol].firstChild, sDataType);
			var v2 = convert(oTR2.cells[iCol].firstChild, sDataType);
			if (v1 < v2) return -1; else if (v1 > v2) return 1; else return 0;
		};
	};

	function showNoteBlock() {
		//add the noteblock if necessary
		if (TB3O.O[22] != '1') return;

		var aTb = createNoteBlock();
		if (TB3O.O[23] != '1') {
			var parNB = $e("P");
			parNB.appendChild(aTb);
			aTb = parNB;
		} else {
			var nbXY = TB3O.O[77].split("|");
			var nbWidth = aTb.style.width;
			var div = createFloatingDiv(parseInt(nbWidth), nbXY[0], nbXY[1], T('NOTEBLOCKOPTIONS'), 'noteblock', "noteblockTT", true);
			TB3O.nTANb = div;
		};
		TB3O.nTANb.appendChild(aTb);
	};

	//Create a noteblock (data from GM cookie)
	function createNoteBlock(){
		var sDisp = '';
		if (TB3O.O[72] == '0' && TB3O.O[23] == '1' ) sDisp = ' display:none;';

		var tr2 = $r();
		var td2 = $c("");

		var nbValue = getGMcookie("notas", false);
		if (nbValue == "false") nbValue = "";

		//height of the note block
		var nl = 10;
		if (parseInt(TB3O.O[25]) > 0 && nbValue != '') nl = 3 + nbValue.split("\n").length;
		if (nl > 30) nl = 30;

		//width of the note block
		var nboption = parseInt(TB3O.O[24]);
		var dInfo = ((nboption == 0 && screen.width >= 1200 || nboption == 2) ? [545, '60'] : [280, '30']);

		var aTb = $t([['id', 'noteblock']]);
		$at(aTb, [['style', "width:" + dInfo[0] + "px;" + sDisp]]);
		
		var tArea = $e("TEXTAREA", nbValue);
		$at(tArea, [["cols", dInfo[1]], ["id", "noteblockcontent"], ['style', 'background-image: url(' + image["underline"] + '); width:' + (dInfo[0] - 10) + 'px;'], ["rows", nl]]);

		td2.appendChild(tArea);
		tr2.appendChild(td2);

		var tr3 = $r();
		var td3 = $c("", [['style', 'text-align:center;']]);

		var btnS = $i([['type', 'image'], ['src', image["btnSave"]], ['title', T('SAVE')]]);
		if (TB3O.O[23] != '1') $at(btnS, [['style', 'padding:3px']]);
		btnS.addEventListener("click", function(){setGMcookie("notas", tArea.value, false); alert(T('SAVED')); }, 0);
		td3.appendChild(btnS);
		tr3.appendChild(td3);
		aTb.appendChild(tr2);
		aTb.appendChild(tr3);
		return aTb;
	};

	function getTroopsDetails(qDist, xRace, boolIgnoreTS) {
		arX = [qDist, 0, 0, 1, 1];
		if (boolIgnoreTS == false) {
			//get the tournament square level
			strtsLevel = TB3O.d2spB[6];
			if (strtsLevel != 0) {
				//split the distance in 2 parts for distances > 30
				arX[2] = parseInt(strtsLevel);
				if (qDist > 30) {arX[0] = 30; arX[1] = qDist - 30;};
			};
		};
		//troop image ZERO index
		arX[3] = getDR(xRace);
		//troop speed multiplier for speed servers
		if (crtPage.indexOf('speed') != -1) arX[4] = 2;
		return arX;
	};

	function createTimeTroopTable(pNode, x2, y2, boolAllRaces) {
		aTb = $t([['class', 'tb3tbnb'], ['style', 'width:350px;']]);
		if (TB3O.T35 == false) aTb = $t([['class', 'tb3tbnb']]);
		aTb.innerHTML = getTroopMerchantTooltipHTML(xy2id(x2, y2), "blue", true, true, true, boolAllRaces);
		aD = $d("", [['style', 'font-size:8pt;'], ['id', 'trooptimetable']]);
		aD.appendChild(aTb);
		pNode.appendChild(aD);
	};

	function createTimeMerchantTable(pNode, x2, y2) {
		dR = $r();
		insertAfter(pNode, dR);
		mW = (TB3O.T35) ? ' style=width:50%;' : '';
		aD = $d('<table' + mW + ' class="tb3tbnb">' + getTroopMerchantTooltipHTML(xy2id(x2, y2), "blue", true, true, false) + '</table>', [['style', 'font-size:8pt;']]);
		dR.parentNode.appendChild(aD);
		dR.parentNode.id = "Merchanttimetable";
	};

	function saveLastMarketSend() {
		var tbDest = $xf("//table[@id='target_validate']");
		if (!tbDest) return;
		var mkls = ['0', '0', '0', '0', -1000, -1000];
		var strDest = tbDest.rows[0].cells[0].textContent;
		var aDest = strDest.match(/\((-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)/g);
		var xyDest = aDest[0].replace("(", "").replace(")", "").split("|");
		var rtS = $xf("//input[starts-with(@name, 'r')]", 'l');
		if (rtS.snapshotLength > 0) {
			for (var xi = 0; xi < 4; xi++) {
				if (rtS.snapshotItem(xi).value == '') mkls[xi] = '0'; else mkls[xi] = rtS.snapshotItem(xi).value;
			}
			mkls[4] = xyDest[0];
			mkls[5] = xyDest[1];
			setGMcookieV2("mkls", mkls, actV.vID);
		};
	};
	
	function getLastMarketSend() {
		if (TB3O.O[47] != '1') return;
		var cmkls = getGMcookieV2('mkls');
		if (cmkls && cmkls[actV.vID]) {
			var mkls = cmkls[actV.vID];
			var bsh = false;
			for (var xi = 0; xi < 4; xi++) {if (mkls[xi] != 0) bsh = true;};
			if (bsh == true) {
				//create the last send table for this village
				var aTb = $t([['id', 'mkls'], ['class', 'tb3tb']]);
				var aRow = $r();
				aRow.appendChild($c('<img src="' + image["vmkls"] + '">', [['class', 'mklshh']]));
				for (var xi = 1; xi < 5; xi++) {aRow.appendChild($c(gIc["r" + xi], [['class', 'mklshh']]));};
				aRow.appendChild($c(T('RESEND'), [['class', 'mklshh']]));
				aRow.appendChild($c(T('ELIMINAR'), [['class', 'mklshh']]));
				var bRow = $r();
				bRow.appendChild($c("(" + mkls[4] + "|" + mkls[5] + ")", [['class', 'mklsc'], ['style', 'background-color:white;']]));
				for (var xi = 0; xi < 4; xi++) {bRow.appendChild($c(mkls[xi]));};
				bRow.appendChild($c('<a href=' + jsVoid + ' onClick = "' + (mkls[0] != 0 ? 'snd.r1.value=' + mkls[0] : '') + (mkls[1] != 0 ? '; snd.r2.value=' + mkls[1] : '') + (mkls[2] != 0 ? '; snd.r3.value=' + mkls[2] : '') + (mkls[3] != 0 ? '; snd.r4.value=' + mkls[3] : '') + '; snd.x.value=' + mkls[4] + '; snd.y.value=' + mkls[5] + ';"><img src="' + image["btnOK"] + '" title="' + T('YES') + '" alt="' + T('YES') + '"></a>', [['class', 'mklsc']]));
				
				aLink = $a(gIc["del"], [['href', jsVoid]]);
				aLink.addEventListener("click", hideLastMarketSend(mkls), 0);
				dC = $c("", [['class', 'mklsc']]);
				dC.appendChild(aLink);
				bRow.appendChild(dC);
				
				aTb.appendChild(aRow);
				aTb.appendChild(bRow);
				var ln = $xf("//form[@name = 'snd']//p");
				insertAfter(ln, aTb);
			};
		};
		
		function hideLastMarketSend(mkls) {
			return function() {
				for (var xi = 0; xi < 4; xi++) {mkls[xi] = 0;};
				setGMcookieV2("mkls", mkls, actV.vID);
				$g('mkls').style.display = 'none';
			};
		};
	};
	
	function isMarketSend() {
		//try to save the last transport for this village
		saveLastMarketSend();
		var bML1 = false;
		var bML2 = false;
		var retValue = 0;
		if ($xf("//form[@action='build.php' and @name='snd']")) {
			var mL = document.getElementsByTagName("a");
			for (xi = 0; xi < mL.length; xi++) {
				if (mL[xi].href.indexOf("&t=1") != -1) bML1 = true;
				if (mL[xi].href.indexOf("&t=2") != -1) bML2 = true;
			};
			var iText = $xf("//input[@type='Text']|//input[@type='text']", 'l');
			if (bML1 && bML2) retValue = iText.snapshotLength;
		};
		iText = null;
		return (retValue >= 6);
	};

	function setMerchantsCell(tM, colM, rTb) {
		var cM = $g("mhMerchants");
		if (!cM) {
			rM = $r();
			cM = $c(tM, [["id", "mhMerchants"], ["style", 'font-size:11px; color:' + colM + ';line-height:16px;'], ["colspan", '9']]);
			rM.appendChild(cM);
			rTb.appendChild(rM);
		} else {
			cM.innerHTML = tM;
			$at(cM, [['style', 'font-size:11px; color:' + colM + ';line-height:16px;']]);
		};
	};
	
	function marketSend() {
		//we are inside the market, option "Send resources"
		getLastMarketSend();
		// Array of new quantities
		var aQcarry = [100, 250, 500, 1000];
		var bAdjMc = true;
		var strMaxC = $xf("//form//p/b");
		var maxC = 0;
		if (strMaxC) {
			maxC = toNumber(strMaxC.innerHTML);
			for (var i = 0; i < aQcarry.length; i++) {
				if (maxC == aQcarry[i]) {
					bAdjMc = false;
					break;
				};
			};
			setGMcookieV2("merchantscapacity", maxC, actV.vID);
		} else maxC = TB3O.Mcap;
		//Insert new quantities selectable via links on the market -> send resources page
		if (bAdjMc) aQcarry = [100, 500, 1000, maxC];
		var moC = $xf("//td[@class='mer'] | //table[@class='f10']//tr//td[@colspan='2']");
		if (moC) {
			mCIHTML = moC.innerHTML;
			addCumulativeArrivals(maxC, moC.textContent);
			mName = mCIHTML.split(' ')[0];
			setGMcookie("merchantsName", mName, false);
			maxM = parseInt(mCIHTML.split(' ')[1].split('/')[0]);
		};
		var maxTr = maxM * maxC;
		var resTb = $xf("//table[@class='f10']");
		if (resTb == null) resTb = $g('send_res');
		if (resTb == null) resTb = $g("send_select");
		var rxI = new Array();
		for (var i = 0; i < 4; i++){
			//Remove original options
			var aRow = resTb.rows[i];
			aRow.removeChild(aRow.cells[3]);

			//clear single resource - code provided by matteo466
			var aCell = $c("", [['style', 'vertical-align:middle; text-align:center;']]);
			var delLink = $a(gIc["del"], [['href', jsVoid]]);
			delLink.addEventListener("click", clearTransportRes(i + 1), false);
			aCell.appendChild(delLink);
			aRow.appendChild(aCell);
			//end code provided by matteo466

			//For each new quantity and resource create a new link with the associated request
			for(var j = 0; j < aQcarry.length; j++){
				var xLink = $a('&nbsp;' + aQcarry[j], [['href', jsVoid], ['style', 'font-size:8pt; white-space:nowrap;']]);
				xLink.addEventListener('click', createEventmarketSend(i, aQcarry[j]), false);
				var aCell = $c("", [['style', 'text-align:center; vertical-align:middle;']]);
				aCell.appendChild(xLink);
				aRow.appendChild(aCell);
			};
			//add the ALL option to the list of links
			var xLink = $a('&nbsp;' + T('ALL'), [['href', jsVoid], ['style', 'font-size:8pt; white-space:nowrap;']]);
			xLink.addEventListener('click', createEventmarketSend(i, crtResUnits[i]), false);
			var aCell = $c("", [['style', 'text-align:center;']]);
			aCell.appendChild(xLink);
			aRow.appendChild(aCell);

			rxI[i + 1] = $xf("//input[@name='r" + (i + 1) + "']");
			rxI[i + 1].addEventListener('keyup', mhRowUpdate, false);
			rxI[i + 1].addEventListener('change', mhRowUpdate, false);
		};

		//add all resource type images and the clear all button
		var clAllRow = $r();

		var aCell = $c(gIc["r1"] + gIc["r2"] + gIc["r3"] + gIc["r4"], [['colspan', '2'], ['style', 'vertical-align:middle; white-space:nowrap;']]);
		clAllRow.appendChild(aCell);
		var aCell = $c("", [['style', 'text-align:center; vertical-align:middle;']]);
		var clAllImg = $img([['src', image["btnDel"]], ['title', T('MTCL')]]);
		var clAllLink = $a("", [['href', jsVoid]]);
		clAllLink.appendChild(clAllImg);
		clAllLink.addEventListener("click", clearTransport, false);
		aCell.appendChild(clAllLink);
		clAllRow.appendChild(aCell);

		var emptyCell = $c("");
		clAllRow.appendChild(emptyCell);

		//add the quantities links for all res
		for (var i = 0; i < 4; i++) {
			var uCellA1 = $c("", [['style', 'text-align:center;']]);
			var useThemLinkA1 = $a('<span style="white-space:nowrap;">&nbsp;' + aQcarry[i] + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
			useThemLinkA1.addEventListener('click', createEventmarketSendAll(aQcarry[i]), false);
			uCellA1.appendChild(useThemLinkA1);
			clAllRow.appendChild(uCellA1);
		};

		//add the real ALL resources link (don't know if it really makes sense)
		var uCellA1 = $c("", [['style', 'text-align:center;']]);
		var useThemLinkA1 = $a('<span style="white-space:nowrap;">&nbsp;' + T('ALL') + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
		useThemLinkA1.addEventListener('click', createEventMarketAllRes, false);
		uCellA1.appendChild(useThemLinkA1);
		clAllRow.appendChild(uCellA1);

		resTb.appendChild(clAllRow);

		var merchantsRow = moC.parentNode;
		$at(moC, [['colspan', '3']]);
		var bgTb = $g("target");
		if (!bgTb) bgTb = $g("target_select");
		if (bgTb == null) {
			bgTb = merchantsRow.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			if (bgTb) {
				if (!bgTb.rows) return;
				var bgR = bgTb.rows[0];
				var bgC0 = bgR.cells[0];
				$at(bgC0, [['width', '70%']]);
				var bgC1 = bgR.cells[1];
				$at(bgC1, [['width', '30%']]);
				var bgR1 = $r();
				var bgC2 = $c("", [["width", "70%"]]);
				bgR1.appendChild(bgC2);
				var bgC3 = $c(moC.innerHTML, [["style", "font-weight:bold; color:darkblue;"], ["width", "30%"]]);
				bgR1.appendChild(bgC3);
				bgTb.removeChild(bgR.parentNode);
				bgTb.appendChild(bgR1);
				bgTb.appendChild(bgR);
				merchantsRow.removeChild(moC);
				for (var xi = 1; xi < 4; xi++) {$at(merchantsRow.parentNode.rows[xi].cells[0], [['colspan', '4']]);};
			};
		} else {
			var p1 = $xf("//div[@id='build']//p");
			if (p1) intY = p1.offsetTop + p1.clientHeight + 35; else intY = (docDir[0] == 'left' ? 185 : 150);
			$at(bgTb, [['style', 'position:absolute; ' + docDir[0] + ':350px; top:' + intY + 'px;']]);
			var bgR = bgTb.rows[0];
			var bgC0 = bgR.cells[0];
			$at(bgC0, [['style', 'font-weight:bold; color:darkblue;']]);
			var ccoo = $xf("//td[@class='coo']");
			$at(ccoo, [['colspan', '3']]);
			var cvil = $xf("//td[@class='vil']");
			$at(cvil,[['colspan', '3']]);
		};

		var uTRc = getGMcookie('usethemres', false);
		if (uTRc == 'false') {
			var uTRc = 'true|true|true|true';
			setGMcookie('usethemres', uTRc, false);
		};
		var aUTR = uTRc.split("|");

		var uRow1 = $r();
		var uCell1 = $c(gIc["r1"], [['style', 'width:30px;']]);
		uRow1.appendChild(uCell1);
		var uCell2 = $c("", [['style', 'width:30px']]);
		var i1Check = $i([['type', 'checkbox'], ['id', 'res1x'], ['title', T('USE') + " " + T('RES1')]]);
		i1Check.checked = eval(aUTR[0]);
		i1Check.addEventListener('click', saveUseThemResOption(1), false);
		uCell2.appendChild(i1Check);
		uRow1.appendChild(uCell2);

		var uCell3 = $c("");
		var useThemLink = $a(gIc["usethempr"], [['href', jsVoid]]);
		useThemLink.addEventListener('click', createEventUseThemAllPr, false);
		uCell3.appendChild(useThemLink);
		uRow1.appendChild(uCell3);

		insertAfter(merchantsRow, uRow1);

		var uRow2 = $r();
		var uCell4 = $c(gIc["r2"]);
		uRow2.appendChild(uCell4);
		var uCell5 = $c("");
		var i2Check = $i([['type', 'checkbox'], ['id', 'res2x'], ['title', T('USE') + " " + T('RES2')]]);
		i2Check.checked = eval(aUTR[1]);
		i2Check.addEventListener('click', saveUseThemResOption(2), false);
		uCell5.appendChild(i2Check);
		uRow2.appendChild(uCell5);

		var uCell6 = $c("");
		var useThemLinkEq = $a(gIc["usethemeq"], [['href', jsVoid]]);
		useThemLinkEq.addEventListener('click', createEventUseThemAllEq, false);
		uCell6.appendChild(useThemLinkEq);
		uRow2.appendChild(uCell6);

		insertAfter(uRow1, uRow2);

		var uRow3 = $r();
		var uCell7 = $c(gIc["r3"]);
		uRow3.appendChild(uCell7);
		var uCell8 = $c("");
		var i3Check = $i([['type', 'checkbox'], ['id', 'res3x'], ['title', T('USE') + " " + T('RES3')]]);
		i3Check.checked = eval(aUTR[2]);
		i3Check.addEventListener('click', saveUseThemResOption(3), false);
		uCell8.appendChild(i3Check);
		uRow3.appendChild(uCell8);

		var uCell9 = $c("");
		var useThemLink1H = $a(gIc["usethem1h"], [['href', jsVoid]]);;
		useThemLink1H.addEventListener('click', createEventUseThemAll1H, false);
		uCell9.appendChild(useThemLink1H);
		uRow3.appendChild(uCell9);

		insertAfter(uRow2, uRow3);

		var uRow4 = $r();
		var uCell10 = $c(gIc["r4"]);
		uRow4.appendChild(uCell10);
		var uCell11 = $c("");
		var i4Check = $i([['type', 'checkbox'], ['id', 'res4x'], ['title', T('USE') + " " + T('RES4')]]);
		i4Check.checked = eval(aUTR[3]);
		i4Check.addEventListener('click', saveUseThemResOption(4), false);
		uCell11.appendChild(i4Check);
		uRow4.appendChild(uCell11);
		uRow4.appendChild($c(""));

		insertAfter(uRow3, uRow4);

		var xyD = new Array();
		xyD[0] = $xf("//form[@name='snd']//input[@name='x']");
		xyD[1] = $xf("//form[@name='snd']//input[@name='y']");
		xyD[0].addEventListener('keyup', captureMerchantDestination, 0);
		xyD[1].addEventListener('keyup', captureMerchantDestination, 0);
		if (crtPage.indexOf("z=") != -1) captureMerchantDestination();

		function saveUseThemResOption(i) {
			return function() {
				var uR = $g('res' + i + 'x');
				if (uR) {
					var uTRc = getGMcookie('usethemres', false);
					var aUTR = uTRc.split("|");
					if (uR.checked == true) aUTR[i - 1] = 'true'; else aUTR[i - 1] = 'false';
					uTRc = aUTR.join("|");
					setGMcookie("usethemres", uTRc, false);
				};
			};
		};

		//function provided by matteo466
		function clearTransportRes(i) {return function() {rxI[i].value = ''; mhRowUpdate();};};

		function clearTransport() {for (var i = 1; i < 5; i++) {rxI[i].value = '';}; mhRowUpdate();};

		function createEventUseThemAllPr() {
			var totRes = 0;
			for (var i = 0; i < 4; i++) {
				var useRes = $g("res" + (i + 1) + "x");
				if (useRes && useRes.checked == true) totRes += crtResUnits[i];
			};
			var dmx = maxTr / totRes;

			//changes by darkytoothpaste to use the full merchants capacity
			var minResource = 99999;
			var minResourceType = 0;
			var totalResourceSent = 0;

			for (var i = 1; i < 5; i++) {
				var useRes = $g("res" + i + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {
					aRes = Math.floor(crtResUnits[i - 1] * dmx);
					if (aRes > crtResUnits[i - 1]) aRes = crtResUnits[i - 1];
					if (aRes < minResource) {
						minResource = aRes;
						minResourceType = i;
					};
				};
				rxI[i].value = aRes;
				totalResourceSent += aRes;
			};
			//ensure that we maximise our merchants
			if (crtResUnits[minResourceType - 1] >= (minResource + (maxTr - totalResourceSent))) rxI[minResourceType].value = minResource + (maxTr - totalResourceSent);
			mhRowUpdate();
		};

		function createEventUseThemAllEq() {
			var totRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 4; i++) {
				var useRes = $g("res" + (i + 1) + "x");
				if (useRes && useRes.checked == true) {
					totRes += crtResUnits[i];
					intSelected += 1;
				};
			};
			var minA = maxTr / intSelected;
			var minB = totRes / intSelected;
			minX = Math.min(parseInt(minA), parseInt(minB));
			for (var i = 1; i < 5; i++) {
				var useRes = $g("res" + i + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {
					aRes = minX;
					if (aRes > crtResUnits[i - 1]) aRes = crtResUnits[i - 1];
				};
				rxI[i].value = aRes;
			};
			mhRowUpdate();
		};

		function createEventUseThemAll1H() {
			var totalRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 4; i++) {
				totalRes += (i == 3 ? prodPerHour[4] : prodPerHour[i]);
				var useRes = $g("res" + (i + 1) + "x");
				if (useRes.checked == true) intSelected += 1;
			};
			var prod1H = [prodPerHour[0], prodPerHour[1],  prodPerHour[2], prodPerHour[4]];

			for (var i = 0; i < 4; i++) {
				var useRes = $g("res" + (i + 1) + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {
					aRes = (intSelected == 4 ? prod1H[i] : Math.floor(totalRes / intSelected));
					if (aRes > crtResUnits[i]) aRes = crtResUnits[i];
				};
				rxI[i + 1].value = aRes;
			};
			mhRowUpdate();
		};

		function createEventMarketAllRes() {for (var i = 0; i < 4; i++) {rxI[i + 1].value = crtResUnits[i];}; mhRowUpdate();};

		function mhRowUpdate() {
			totTransport = 0;
			for (var xi = 1; xi < 5; xi++) {
				var aR = parseInt(rxI[xi].value);
				if (!isNaN(aR)) totTransport += aR;
			};
			totMerchants = Math.ceil(totTransport / maxC);
			mhColor = 'darkgreen';
			crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
			crtExceed = totTransport - maxTr;
			mhText = gIc["merchant"] + "<b>" + " (" + mName + "): " + totMerchants + "/" + maxM + "<br>" + T('MAX') + ": " + maxM * maxC + "<br>";

			if (totMerchants > maxM) {
				mhColor = "red";
				mhText += T('MTX') + ": "+ crtExceed;
			} else mhText += T('MTW') + ": "+ crtWaste;
			mhText += "<br>" + T('MTC') + ": " + totTransport + "</b>";
			setMerchantsCell(mhText, mhColor, resTb);
		};

		function createEventmarketSend(i, q) {
			return function(){
				var aI = document.getElementsByTagName('INPUT')[i + 1];
				var aV = aI.value;
				var aS = 0;
				if (aV != '') aS = parseInt(aV);
				aS += q;
				if (aS > crtResUnits[i]) aS = crtResUnits[i];
				if (aS > maxTr) aS = maxTr;
				aI.value = aS;
				mhRowUpdate();
			};
		};

		function createEventmarketSendAll(q) {
			return function(){
				var arrInp = document.getElementsByTagName('INPUT');
				for (var i = 0; i < 4; i++) {
					var aI = arrInp[i + 1];
					var aV = aI.value;
					var aS = 0;
					if (aV != '') aS = parseInt(aV);
					aS += q;
					if (aS > crtResUnits[i]) aS = crtResUnits[i];
					if (aS > maxTr) aS = maxTr;
					aI.value = aS;
				};
				mhRowUpdate();
			};
		};

		function captureMerchantDestination() {
			var x = xyD[0].value;
			var y = xyD[1].value;
			var oldTable = $g("Merchanttimetable");
			if (x != "" && y != "") {
				if (oldTable) var oldChild = oldTable.parentNode.removeChild(oldTable);
				var aRow = $r();
				var bRow = $r();
				aRow.appendChild(bRow);
				var mtTable = $t();
				mtTable.appendChild(aRow);
				var parOK = $xf("//form[@name='snd']/p[2]");
				parOK.appendChild(mtTable);
				createTimeMerchantTable(aRow, x, y);
			} else {
				if (oldTable) oldTable.style.visibility = "hidden";
			};
		};

		//initial function provided by david.macej
		//modified by ms99
		function MerchantArrivingTitles(maxC, strAvTotM) {
			var retValue = '';
			var strMparTitles = $xf("//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/h4", 'r');
			if (strMparTitles.snapshotLength == 0) {return retValue;};
			var retValue1 = strMparTitles.snapshotItem(0).textContent;
			if (strMparTitles.snapshotLength == 2) return retValue1;//2 groups: 1st is arriving mercs, 2nd is own mercs

			var otherMercs = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[1]/td[1]/a[1][not(contains(@href, 'spieler.php?uid=" + TB3O.UserID + "'))]", 'r');
			if (otherMercs.snapshotLength == 0) otherMercs = $xf("//div[@id='" + dmid2 + "']//form/table[@class='traders']/thead/tr[1]/td[1]/a[1][not(contains(@href, 'spieler.php?uid=" + TB3O.UserID + "'))]", 'r');
			if (otherMercs.snapshotLength > 0) return retValue1; //only 1 group: the arriving mercs group
			var arrAvTotM = strAvTotM.split(" ")[1].split("/");
			var mercsOnWay = arrAvTotM[1] - arrAvTotM[0];

			var resSpanOnMercTables = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[3]/td[2]/span[@class='f10']", 'r');
			if (resSpanOnMercTables.snapshotLength == 0) resSpanOnMercTables = $xf("//div[@id='" + dmid2 + "']//form/table[@class='traders']//tr[@class='res']//span[@class='f10']", 'r');
			var totalMercsOnTables = 0;

			for(var i = 0; i < resSpanOnMercTables.snapshotLength; i++) {
				var resSpan = resSpanOnMercTables.snapshotItem(i);
				var mercWood = parseInt(resSpan.childNodes[1].nodeValue.replace("|", ""));
				var mercClay = parseInt(resSpan.childNodes[3].nodeValue.replace("|", ""));
				var mercIron = parseInt(resSpan.childNodes[5].nodeValue.replace("|", ""));
				var mercCrop = parseInt(resSpan.childNodes[7].nodeValue.replace("|", ""));

				var totalResOnThisTable = mercWood + mercClay + mercIron + mercCrop;

				var mercsOnThisTable = totalResOnThisTable / maxC;
				totalMercsOnTables += Math.ceil(mercsOnThisTable);
			};
			if (totalMercsOnTables > mercsOnWay) return retValue1; else return retValue;
		};

		//initial function provided by david.macej
		//modified by ms99
		function addCumulativeArrivals(maxC, strAvTotM) {
			//selects the receiving merchants
			var origPar = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']|//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/h4");
			if (!origPar) return;
			var sendReceive = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']|//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/table[@class='traders']|//div[@id='" + dmid2 + "']//form/h4", 'r');

			if (sendReceive.snapshotLength == 0) return;
			var strMercArrTitles = MerchantArrivingTitles(maxC, strAvTotM);

			if (strMercArrTitles != origPar.textContent) return;
			var tRow = null;
			var allValues = [0, 0, 0, 0, 0];

			//create table to sum the resources
			var txtPar = origPar.textContent.replace(":", "");
			armTable = $t([['class', 'tb3tb'], ['style', 'line-height:16px; border-collapse:collapse;']]);
			var hRow = $r([['class', 'tb3r']]);
			var hCell = $c(T('SUMMARY') + " - " + txtPar, [['class', 'cbgx'], ['colspan', '6'], ['style', 'font-size:10pt; font-weight:bold;']]);
			hRow.appendChild(hCell);
			armTable.appendChild(hRow);
			var rRow = $r();
			var qRow = $r();
			tRow = $r();

			var cCell = $c(gIc["clock"], [['style', 'background-color:#F3F3F3;']]);
			rRow.appendChild(cCell);
			var tCell = $c("", [["id", "timeouta"], ['style', 'font-weight:bold; font-size:9pt;']]);
			qRow.appendChild(tCell);
			var eCell = $c("");
			tRow.appendChild(eCell);

			for (var xi = 1; xi < 6; xi++) {
				if (xi < 5) {
					var iCell = $c(gIc["r" + xi], [['style', 'background-color:#F3F3F3;']]);
					var tCell = $c("00:00:00", [['id', 'timeouta'], ['style', 'font-weight:normal; font-size:9pt;']]);
				} else {
					var iCell = $c(T('TOTAL'), [['style', 'font-weight:bold; background-color:#F3F3F3;']]);
					var tCell = $c("");
				};
				rRow.appendChild(iCell);
				var qCell = $c("0", [['class', 'tb3c'], ['id', "arrmQ" + xi], ['style', 'font-weight:bold; font-size:9pt;']]);
				qRow.appendChild(qCell);
				tRow.appendChild(tCell);
			};

			armTable.appendChild(rRow);
			armTable.appendChild(qRow);
			armTable.appendChild(tRow);
			var aPar = $e("P", "");
			aPar.appendChild(armTable);
			origPar.appendChild(aPar);
			//finished creating the additional sum table

			//get server time
			var sT = $g("tp1").textContent.split(":");
			var arrRes = [0, 0, 0, 0];
			var sTs = toSeconds(sT[0] + ":" + sT[1] + ":" + sT[2]);
			var aTs = 0;
			var rAtArr = [crtResUnits[0], crtResUnits[1], crtResUnits[2], crtResUnits[3]];

			for (var i = 0; i < sendReceive.snapshotLength; i++) {
				var aTb = sendReceive.snapshotItem(i);
				nName = aTb.nodeName;
				if (i > 0 && (nName == "P" || nName == "H4")) break;
				if (nName == "TABLE") {
					//this is a table for incoming/outgoing/returning merchants
					var iHTML = '';
					var boolAddRow2 = false;
					var bTb = $t([['class', 'tb3tbnb']]);
					var bTbR1 = $r([['class', 'tb3rnb']]);
					var bTbR2 = $r([['class', 'tb3rnb']]);
					var tdRes = aTb.rows[2].cells[1].textContent;
					var inRes = tdRes.split(" | ");
					var tdTime = $g('timer' + i);//anyway only the last timer will be used in the armTable
					if (tdTime.offsetParent.nodeName == "P") tdTime = $g('timer' + (i + 1)); //account in the deletion process
					var pTot = 0;
					for (var zi = 0; zi < 4; zi++) {
						var aValue = parseInt(inRes[zi]);
						arrRes[zi] += aValue;
						pTot += aValue;
						allValues[zi] += aValue;
						allValues[4] += aValue;
					};
					insertAfter(aTb.rows[2].cells[1].lastChild, $e("TEXTNODE", "<b> = " + $ls(pTot) + "</b>"));//arrRes[zi]));

					if (TB3O.O[46] == '1') {
						var aR = $r([['class', 'tb3r']]);
						xts = toSeconds(tdTime.textContent);
						var deltaS = xts - aTs;
						var xt = formatTime(sTs + xts, 2);
						var aC1 = $c(gIc['clock'] + " " + xt, [['class', 'tb3c'], ['style', 'padding-' + docDir[0] + ':2px; text-align:' + docDir[0] + '; font-weight:bold; font-size:8pt; color:blue;']]);
						var strBorder = 'border-' + docDir[1] + ':1px solid black; ';
						for (xi = 0; xi < 4; xi++) {
							var strColor = '';
							var qu = rAtArr[xi] + parseInt((prodPerHour[xi] / 3600) * deltaS + parseInt(inRes[xi]));
							if (xi == 3) strBorder = '';
							var iHTML1 = " " + gIc['r' + (xi + 1)] + " ";
							var iHTML2 = '';
							if (qu > capacity[xi]) {
								strColor = 'background-color:darkgreen; font-weight:bold; color:white; ';
								iHTML1 += capacity[xi];
								iHTML2 += "(+" + (qu - capacity[xi]) + ")";
								rAtArr[xi] = capacity[xi];
								boolAddRow2 = true;
							} else if (qu < 0) {
								rAtArr[xi] = parseInt(inRes[xi]);
								iHTML2 = "(" + (qu + rAtArr[xi]) + ")";
								iHTML1 += rAtArr[xi];
								strColor = 'background-color:red; font-weight:bold; color:white; ';
								boolAddRow2 = true;
							} else {
								iHTML1 += qu;
								rAtArr[xi] = qu;
							};
							var bC1 = $c(iHTML1, [['class', 'tb3c'], ['style', 'width:25%; padding:0px; padding-' + docDir[0] + ':2px; text-align:' + docDir[0] + '; font-size:8pt;' + strColor + strBorder]]);
							var bC2 = $c(iHTML2, [['class', 'tb3c'], ['style', 'width:25%; padding:0px; padding-' + docDir[0] + ':2px; text-align:center; font-size:8pt;' + strColor + strBorder]]);
							bTbR1.appendChild(bC1);
							bTbR2.appendChild(bC2);
						};
						aTs = xts;
						var aC2 = $c("", [['class', 'tb3c'], ['colspan', '2'], ['style', 'padding:1px; text-align:' + docDir[0] + ';']]);
						bTb.appendChild(bTbR1);
						if (boolAddRow2) bTb.appendChild(bTbR2);
						aC2.appendChild(bTb);
						aR.appendChild(aC1);
						aR.appendChild(aC2);
						aTb.appendChild(aR);
					};
				};
			};

			//add the values  (res1...res4 & Total) to the armTable
			for (var xi = 0; xi < 5; xi++) $g("arrmQ" + (xi + 1)).innerHTML = $ls(allValues[xi]);
			//add the timer for the last arrival
			armTable.rows[2].cells[0].innerHTML = tdTime.textContent;

			var tdTimeSeconds = toSeconds(tdTime.textContent);
			// compute time to fill for total transport
			for (var zi = 0; zi < 4; zi++) {
				var aValue = allValues[zi];
				var timeToEmpty = 0;
				var timeToFill;
				var timeToShow;
				//txtStyle => font color, cell background color, font-weigth
				var txtStyle = ['black', 'white', 'normal'];
				var strX = "";
				var PpS = parseInt(prodPerHour[zi]) / 3600;
				var totalAtArrival = crtResUnits[zi] + PpS * tdTimeSeconds + aValue;

				if (prodPerHour[zi] < 0) {
					timeToEmpty = crtResUnits[zi] / Math.abs(PpS);
					if (timeToEmpty <= tdTimeSeconds) {
						timeToShow = timeToEmpty;
						txtStyle[0] = 'red';
						if (timeToEmpty < 7200) {
							strX = 'text-decoration: blink; ';
							txtStyle = ['white', 'red', 'bold'];
						};
					} else if (timeToEmpty > tdTimeSeconds) {
						timeToEmpty = totalAtArrival / Math.abs(PpS);
						timeToShow = timeToEmpty;
						if (timeToEmpty < 7200) txtStyle = ['white', 'red', 'bold'];
					};
				} else if (prodPerHour[zi] == 0) {
					if (totalAtArrival >= capacity[zi]) {
						timeToFill = tdTimeSeconds;
						timeToShow = timeToFill;
						if (timeToFill < 7200) txtStyle = ['white', 'darkgreen', 'bold'];
					} else {
						timeToShow = T('NEVER');
					};
				} else if (prodPerHour[zi] > 0) {
					timeToFill = (capacity[zi] - crtResUnits[zi]) / PpS;
					timeToFillAtArrival = (capacity[zi] - totalAtArrival) / PpS;
					if (timeToFill <= tdTimeSeconds || timeToFillAtArrival < 0) {
						timeToShow = tdTimeSeconds;
						txtStyle[0] = 'darkgreen';
						strX = 'text-decoration:blink; ';
					} else {
						timeToShow = tdTimeSeconds + timeToFillAtArrival;
						txtStyle[0] = 'darkgreen';
					};
					if (timeToShow < 7200) txtStyle = ['white', 'darkgreen', 'bold'];
				};
				timeToShow = formatTime(timeToShow, 0);

				if (tRow != null) {
					var rtCell = tRow.cells[zi + 1];
					$at(rtCell, [['id', 'timeouta'], ['style', 'font-weight:normal; font-size:9pt; background-color:' + txtStyle[1] + ' !important; font-weight:' + txtStyle[2] + ' !important; color:' + txtStyle[0] + '; important;' + strX]]);
					rtCell.innerHTML = timeToShow;
				};
			};
		};
	};

	//return the number of villages that can be built based on the number of CP available
	function cp2villages(cp){
		var retValue;
		if (crtPage.indexOf("speed") > -1) retValue = Math.round(Math.pow(3*cp/1600, 1 / 2.3)); else {
			if (TB3O.O[1] == "1") retValue = Math.round(Math.pow(cp/2000, 1 / 2)); else retValue = Math.round(Math.pow(cp/1600, 1 / 2.3));
		};
		return retValue;
	};

	//return the no of CP needed to create a specific no of villages (version from fr3nchlover)
	function villages2cp(noVil){
		var retValue;
		if (crtPage.indexOf("speed") != -1) {
			retValue = Math.round(1.6/3 * Math.pow(noVil, 2.3)*10) * 100;
		} else {
			retValue = 2000;
			if (noVil > 1) {
				if (TB3O.O[1] == "1") retValue = Math.round(2 * Math.pow(noVil, 2)*10) * 100; else retValue = Math.round(1.6 * Math.pow(noVil, 2.3)) * 1000;
			};
		};
		return retValue;
	};

	function culturePoints(){
		var aX = $xf("//div[@id='" + dmid2 + "']//b", 'l');
		var intAdd = 0;
		if (TB3O.T35 == false) {
			if (aX.snapshotLength != 5) return;
			intAdd = 1;
		} else if (aX.snapshotLength != 4) return;
		
		//CP for all villages
		var prodTotalCP = toNumber(aX.snapshotItem(intAdd + 1).innerHTML);
		//Current no of CP
		var crtTotalCP = toNumber(aX.snapshotItem(intAdd + 2).innerHTML);
		//CP needed to create a new village
		var pc_aldea_prox = toNumber(aX.snapshotItem(intAdd + 3).innerHTML);

		//No of current villages
		var crtVil = cp2villages(pc_aldea_prox);
		//No of villages to be build with current CP

		var textMenu = $xf("//p[@class='txt_menue']");
		if (!textMenu) textMenu = $g("textmenu");
		if (textMenu) var aV = textMenu.textContent.replace('\n', '').split(" |");

		//create the new cp to villages table
		var cpTable = $t([['id', 'cptable']]);
		//header row 11
		var rCP1 = $r();
		var c11 = $c(T('VILLAGE'), [['rowspan', 2]]);
		rCP1.appendChild(c11);
		var c12 = $c(aV[1], [['colspan', 2]]);
		rCP1.appendChild(c12);
		var c13 = $c(gIc["clock"], [['colspan', 2]]);
		rCP1.appendChild(c13);
		cpTable.appendChild(rCP1);
		//header row 2
		var rCP2 = $r();
		var c22 = $c(T('TOTAL'));
		rCP2.appendChild(c22);
		var c23 = $c(T('YOUNEED'));
		rCP2.appendChild(c23);
		var c24 = $c(T('NEWVILLAGEAV'));
		rCP2.appendChild(c24);
		var c25 = $c(T('TIMEUNTIL'));
		rCP2.appendChild(c25);
		cpTable.appendChild(rCP2);

		var maxNewVillages = 1;
		var boolReachedMaxNewVillages = false;
		var strClass = 'CG';

		for (var i = 0; i < maxNewVillages && i < 50; i++) {
			var cpRow = $r();
			var iHTML = [crtVil + i + 1, '', '', '', ''];
			//get the necessary CP for building/conquering a new village
			var reqCP = villages2cp(crtVil + i);

			if (reqCP <= crtTotalCP) {
				var iHTML = [crtVil + i + 1, reqCP, '0', T('NOW'), '0:00:00'];
				strClass = 'CG';
				maxNewVillages += 1;
			} else {
				if (boolReachedMaxNewVillages == false) {
					maxNewVillages += 2;
					boolReachedMaxNewVillages = true;
				};
				//time until able to build/conquer a new village
				var tiempo = ((reqCP - crtTotalCP) / prodTotalCP) * 86400;
				var dtNow = new Date();
				dtNow.setTime(dtNow.getTime() + (tiempo * 1000));
				var iHTML = [crtVil + i + 1, reqCP, reqCP - crtTotalCP, computeTextTime(dtNow), formatTime(tiempo, 1)];
				strClass = 'CR';
			};
			for (var xi = 0; xi < 5; xi++) {
				var cpCellx = $c(iHTML[xi], [['class', strClass]]);
				cpRow.appendChild(cpCellx);
			};
			cpTable.appendChild(cpRow);
		};
		aX.snapshotItem(intAdd + 3).parentNode.parentNode.appendChild(cpTable);
	};

	function getBuyRatioCell(aRow) {
		var tC;
		var aC;
		var aR;
		if (aRow.cells.length > 7) {
			aR = parseInt(aRow.cells[1].textContent) / parseInt(aRow.cells[3].textContent);
			tC = aRow.cells[5];
			aC = aRow.cells[6];
		} else {//M35 = 3;
			aR = parseInt(aRow.cells[0].textContent) / parseInt(aRow.cells[1].textContent);
			tC = aRow.cells[3];
			aC = aRow.cells[4];
		};
		var aCol = ['black', 'white'];
		if (aR < 1.00) aCol = ['red', '#FFE1E1']; else if (aR > 1.00) aCol = ['darkgreen', '#C8FFC8'];
		var rC = $c(aR.toFixed(2), [["style", "font-size:8pt; background-color:" + aCol[1] + "; color:" + aCol[0] + ";"]]);
		if (tC) $at(tC, [['style', 'font-size:8pt; padding:1px; width:11%;']]);
		if (aC) $at(aC, [['style', 'font-size:8pt; width:20%;']]);
		return rC;
	};

	function getBuyAllyCell(aR) {
		//aliance info from the title property of the player
		var iPC = (aR.cells.length > 6 ? 4 : 2);
		var aN = aR.cells[iPC].getAttribute('title');
		if (!aN || aN == "") aN = "-";
		var aC = $c(aN, [['style', 'font-size:8pt; width:15%;']]);
		return aC;
	};

	function addMarketOfferCellEvents(aR) {
		var noC = [1, 4];
		if (aR.cells.length > 7) noC = [3, 6];
		var aC = aR.cells[noC[0]];
		var bC = aR.cells[noC[1]];
		var quantity = parseInt(aC.textContent);
		aC.addEventListener('mouseover', showNeededMerchants, false);
		aC.addEventListener("mouseout", hideTT, 0);
		bC.addEventListener('mouseover', showNeededMerchants, false);
		bC.addEventListener("mouseout", hideTT, 0);

		function showNeededMerchants() {
			var tt = $g("tb_tooltip");
			if (!tt) tt = createTooltip();
			var mTot = (TB3O.Mcap != 0 ? Math.ceil(quantity / TB3O.Mcap) + " x " + gIc["merchant"] + ' (' + T('MERCHANTS') + ')' : 0);
			var iW = parseInt(mTot) * TB3O.Mcap - quantity;
			var aTb = $t([['class', 'tb3tbnb']]);
			var aRow = $r([['class', 'tb3rnb']]);
			aRow.appendChild($c(mTot, [['class', 'tb3cnb'], ['style', 'font-size:8pt; font-weight:bold; color:blue; text-align:' + docDir[0] + ';']]));
			aTb.appendChild(aRow);
			if (iW > 0) {
				var bRow = $r([['class', 'tb3rnb']]);
				bRow.appendChild($c(T('MTW') + ": " + iW, [['class', 'tb3cnb'], ['style', 'font-size:8pt; color:red; text-align:' + docDir[0] + ';']]));
				aTb.appendChild(bRow);
			};
			tt.innerHTML = "";
			tt.appendChild(aTb);
			tt.style.display = 'block';
		};
	};

	 //Create a new column showing the alliance of the player that offers resources for trade at the market and a ratio column
	function addAllyColumnForMarketOffers() {
		if (crtPage.indexOf('&t=1') == -1 && crtPage.indexOf('build.php?') == -1) return;
		if ($g("summary")) return;

		var aX = $xf("//*[@id='range'] | //*[@id='market_buy']");
		if (!aX) {aX = $xf("//tr[@class='rbg']"); if (aX) aX = aX.parentNode;};

		//prepare insertion of column
		var b = aX.rows;
		$at(b[0].cells[0], [['colspan', '9']]);
		$at(b[b.length - 1].cells[0], [['colspan', '9']]);

		//Create and insert the alliance & ratio columns
		b[1].appendChild($c(T('8')));
		b[1].appendChild($c("%"));

		for(var i = 2; i < b.length - 1; i++){
			b[i].appendChild(getBuyAllyCell(b[i]));
			b[i].appendChild(getBuyRatioCell(b[i]));
			addMarketOfferCellEvents(b[i]);
		};
	};

	function quitMarketFilter(aOffer, aFilter, filtros) {
		aOffer.removeAttribute("filtro" + aFilter);
		var remove = true;
		for (var i = 0; i < filtros.length; i++) if (aOffer.getAttribute("filtro" + filtros[i]) == 'on') remove = false;
		if (remove == true) aOffer.removeAttribute("style");
	};

	function marketBuy() {
		if (crtPage.indexOf('&t=1&') != -1 && crtPage.indexOf('&t=1&u=') == -1) return;
		//get the original offers table
		var orOffersTb = $xf("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]");
		if (!orOffersTb) orOffersTb = $g("market_buy");
		if (!orOffersTb) orOffersTb = $g("range");

		getSavedMarketFilters();

		createFilterTable(orOffersTb);

		if (TB3O.T35 == false) {
			var linkid = $xf('//td[@class="rowpic"]/a', 'f', orOffersTb).href.match('id=([0-9]*)&')[1];
		} else {
			var lastCell = orOffersTb.rows[orOffersTb.rows.length - 1].cells[0];
			var linkid = lastCell.lastChild.href.match('id=([0-9]*)&')[1];
		};
		//market preload
		marketpreload = parseInt(TB3O.O[48]) + 1;

		var pageNo1 = crtPage.indexOf("&u=");
		var intPage = 0;
		if (pageNo1 != -1) {
			var pageNo2 = crtPage.indexOf("#h2");
			var pageNoS1 = crtPage.substring(pageNo1 + 3, pageNo2);
			var intPage = Math.round(parseInt(pageNoS1) / 40);
		};
		if (marketpreload > 1) {
			for (var i = 1; i < marketpreload; i++) {setTimeout(createPreloadFunc(i + intPage), getRndTime(1302));};
			var X2 = (marketpreload + intPage) * 40;
			var X1 = (intPage - marketpreload) * 40;
			var backLink = "build.php?id=" + linkid + "&t=1&u=" + X1 + "#h2";
			var forwardLink = "build.php?id=" + linkid + "&t=1&u=" + X2 + "#h2";
			var tdbfLinks = $xf('//td[@class="rowpic"]');
			if (!tdbfLinks) tdbfLinks = orOffersTb.rows[orOffersTb.rows.length - 1].cells[0];
			if (tdbfLinks) {
				if (X1 < 0) {
					var aSpan = $e("SPAN", "«");
					$at(aSpan, [["style", "font-weight:bold;"], ["class", "c"]]);
				} else {
					var aSpan = $a("« ", [['href', backLink]]);
				};
				var fwLink = $a("»&nbsp;", [['href', forwardLink]]);
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			};
		};

		function prepareOrigFilters() {
			var sTb = $g("search_select");
			if (!sTb) return;
			var bTb = $g("bid_select");
			var arrA = sTb.getElementsByTagName("A");
			if (arrA) {for (var i = 0; i < arrA.length; i++) {arrA[i].addEventListener("click", addAllyColumnForMarketOffers, false);};};
			arrA = bTb.getElementsByTagName("A");
			if (arrA) {for (var i = 0; i < arrA.length; i++) {arrA[i].addEventListener("click", addAllyColumnForMarketOffers, false);};};
		};

		function applyFilter(orOffersTb, aType, aOpt) {
			return function () {marketFilters[aType] = aOpt; setGMcookieV2("marketfilters", marketFilters, 'all'); filterMarket(orOffersTb, aType, aOpt);};
		};

		function applyAllFilters(orOffersTb) {for (var i = 0; i < 5; i++) {if (marketFilters[i] != defaultMF[i]) filterMarket(orOffersTb, i , marketFilters[i]);};};

		function filterMarket(orOffersTb, aType, aOpt) {
			for (var i = 2; i < orOffersTb.rows.length - 1; i++) {
				b = orOffersTb.rows[i];
				if (TB3O.T35 == false) {
					var isOfPos = true;
					var error = false;
					if (b.childNodes.length > 8) error = true;
					b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/);
					var rOf = RegExp.$1;
					b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/);
					var rSearch = RegExp.$1;
					var qOf = parseInt(b.childNodes[error ? 2 : 1].textContent);
					var qSearch = parseInt(b.childNodes[error ? 6 : 3].textContent);
					if (b.childNodes[error ? 11 : 6].className == 'c') isOfPos = false;
					var trTime = toSeconds(b.childNodes[error ? 10 : 5].textContent);
				} else {
					if (b.cells[0].firstChild.className) {//M35 = 2;
						var rOf = b.cells[0].firstChild.className.replace("r", "");
						var qOf = parseInt(b.cells[1].textContent);
					} else {//M35 = 3;
						var rOf = b.cells[0].getElementsByTagName("IMG")[0].className.replace("r", "");
						var qOf = parseInt(b.cells[0].textContent);
					};
					var isOfPos = false;
					if (b.cells[2].firstChild.className) {//M35 = 2;
						var rSearch = b.cells[2].firstChild.className.replace("r", "");
						var qSearch = parseInt(b.cells[3].textContent);
						if (b.cells[6].className == 'act') isOfPos = true;
						var trTime = toSeconds(b.cells[5].textContent);
					} else {//M35 = 3;
						var rSearch = b.cells[1].getElementsByTagName("IMG")[0].className.replace("r", "");
						var qSearch = parseInt(b.cells[1].textContent);
						if (b.cells[4].className == 'act') isOfPos = true;
						var trTime = toSeconds(b.cells[3].textContent);
					};
				};

				switch (aType) {
					case 0: if ((rOf != aOpt) && aOpt != 5) setOfferFilter(b, "Ofrezco"); else quitMarketFilter(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]); break;
					case 1: if ((rSearch != aOpt) && aOpt != 5) setOfferFilter(b, "Busco"); else quitMarketFilter(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]); break;
					case 2: switch(aOpt) {
						case 1: if (qOf <= qSearch) setOfferFilter(b, "Tipo"); else quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
						case 2: if (qOf != qSearch) setOfferFilter(b, "Tipo"); else quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
						case 3: if (qOf >= qSearch) setOfferFilter(b, "Tipo"); else quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
						case 4: quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
					} break;
					case 3: switch(aOpt) {
						case 1: if (isOfPos == false) setOfferFilter(b, "Carencia"); else quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]); break;
						case 2: quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]); break;
					} break;
					case 4: switch(aOpt) {
						case 1: if (trTime > (60*60)) setOfferFilter(b, "Tiempo"); else quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
						case 2: if (trTime > (2*60*60)) setOfferFilter(b, "Tiempo"); else quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
						case 3: if (trTime > (3*60*60)) setOfferFilter(b, "Tiempo"); else quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
						case 4: quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
					} break;
				};
			};

			for (var i = 0; i < 5; i++){
				for (var j = 0; j < 6; j++){
					var aFilters = $xf("//td[@id='filtro" + i + j + "']");
					if (aFilters) {
						if (i == aType && j == (aOpt - 1)) $at(aFilters, [['class', 'sf']]); else if (i == aType) aFilters.removeAttribute('class');
					};
				};
			};
		};

		function getSavedMarketFilters() {
			var cookieMF = getGMcookieV2('marketfilters');
			if (cookieMF && cookieMF['all']) marketFilters = cookieMF['all']; else {
				marketFilters = defaultMF;
				setGMcookieV2('marketfilters', marketFilters, 'all');
			};
		};

		function processOfferPage(t) {
			var ans = $d(t.responseText);
			var ansdoc = document.implementation.createDocument("", "", null);
			ansdoc.appendChild(ans);
			if (TB3O.T35 == false) {
				var strOffersTableRows = "//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr";
				var xpres = $xf(strOffersTableRows, 'l', ans, ansdoc);
				var aRows = $xf(strOffersTableRows, 'l');
				var linktr = aRows.snapshotItem(aRows.snapshotLength - 1);
			} else {
				var strOffersTableRows = "//table[@id='market_buy']/tbody/tr | //table[@id='range']/tbody/tr";
				var xpres = $xf(strOffersTableRows, 'l', ans, ansdoc);
				var aRows = $xf(strOffersTableRows, 'l');
				var linktr = aRows.snapshotItem(1).parentNode;
			};
			
			for (var i = 2; i < xpres.snapshotLength - 1; i++) {
				var mrow = xpres.snapshotItem(i);
				mrow.appendChild(getBuyAllyCell(mrow));
				mrow.appendChild(getBuyRatioCell(mrow));
				addMarketOfferCellEvents(mrow);
				if (TB3O.T35 == false) linktr.parentNode.insertBefore(mrow, linktr); else linktr.appendChild(mrow);
			};
			applyAllFilters(orOffersTb);
		};

		function createPreloadFunc(page) {
			return function() {
				ajaxRequest("build.php?id=" + linkid + "&t=1&u=" + (page * 40) + "#h2", "GET", null, processOfferPage, dummy);
			};
		};

		function createFilterTable(orOffersTb) {
			var aTb = $t([['id', 'mbuyf']]);
			//filters for offers, searches and ratio
			var aLabels = [orOffersTb.rows[1].cells[0].textContent, orOffersTb.rows[1].cells[1].textContent];
			for (var j = 0; j < 2; j++){
				var tr = $r();
				tr.appendChild($c(aLabels[j]));
				//4 res for offer and search
				for (var i = 0; i < 4; i++){
					var td = $c("", [['id', 'filtro' + j + i]]);
					var ref = $a(gIc['r' + (i + 1)]);
					if (i + 1 == marketFilters[j]) $at(td, [['class', 'sf']]);
					td.addEventListener('click', applyFilter(orOffersTb, j, i  + 1), 0);
					td.appendChild(ref);
					tr.appendChild(td);
				};
				var td = $c("", [['id', 'filtro' + j + '4']]);
				if (marketFilters[j] == 5) $at(td, [['class', 'sf']]);
				var ref = $a(T('CUALQUIERA'), [['href', jsVoid]]);
				td.addEventListener('click', applyFilter(orOffersTb, j, 5), 0);
				td.appendChild(ref);
				tr.appendChild(td);
				aTb.appendChild(tr);
			};
			//Transation ratio (offer/search)
			var tr = $r();
			tr.appendChild($c(T('TIPO')));
			aLabels = ['1:>1', '1:1', '1:<1', '1:x'];
			for (var i = 0; i < 4; i++){
				var td = $c("", [['id', 'filtro' + 2 + i]]);
				if (i + 1 == marketFilters[2]) $at(td, [['class', 'sf']]);
				var ref = $a(aLabels[i], [['href', jsVoid]]);
				td.addEventListener('click', applyFilter(orOffersTb, 2, i + 1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			};
			tr.appendChild($c(""));
			aTb.appendChild(tr);

			//Max. transport time
			var tr = $r();
			tr.appendChild($c(T('MAXTIME')));
			aLabels = ['1', '2', '3', '>3'];
			for (var i = 0; i < 4; i++){
				var td = $c("", [['id', 'filtro' + 4 + i]]);
				if (i + 1 == marketFilters[4]) $at(td, [['class', 'sf']]);
				var ref = $a(aLabels[i], [['href', jsVoid]]);
				td.addEventListener('click', applyFilter(orOffersTb, 4, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			};
			tr.appendChild($c(""));
			aTb.appendChild(tr);

			//Filter for possible/impossible offers because of the res/merchants availability
			var tr = $r();
			tr.appendChild($c(T('DISPONIBLE')));
			aLabels = [T('YES'), T('NO')];

			for (var i = 0; i < 2; i++){
				var td = $c("", [['colspan', '2'], ['id', 'filtro' + 3 + i]]);
				if (i + 1 == marketFilters[3]) $at(td, [['class', 'sf']]);
				var ref = $a(aLabels[i], [['href', jsVoid]]);
				td.addEventListener('click', applyFilter(orOffersTb, 3, i + 1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			};

			tr.appendChild($c(""));
			aTb.appendChild(tr);

			applyAllFilters(orOffersTb);
			var p = $e("P");
			p.appendChild(aTb);
			orOffersTb.parentNode.insertBefore(p, orOffersTb);
			aLabels = null;
		};
	};

	function TimeToExplore() {
		var shC = true;
		var arrY = $xf('//td[@class="required"] | //p[@id="contract"] | //table[@class="new_building"]//td[@class="res"] | //div[@id="' + dmid2 + '"]//table[@class="f10"]/tbody/tr[1]/td', 'l');
		if (arrY.snapshotLength > 0) {
			for (var i = 0; i < arrY.snapshotLength; i++) {
				var aY = arrY.snapshotItem(i);
				var arRes = getRequiredRes(aY);
				if (arRes == null || arRes.length < 4) shC = false;
				if  (shC == true) {
					$at(aY, [['id', 'npcXX_1']]);
					var e = calculateResourceTime(arRes, "30");
					if (e) {
						var xC = aY.parentNode;
						if (xC) {
							if (xC.nodeName == "TR") {
								var aE = $c("");
								var aR = $r([['class', 'tb3rnb']]);
								aR.appendChild(aE);
								xC.parentNode.appendChild(aR);
								$at(e, [['style', 'width:30%;']]);
							} else if (xC.nodeName == "FORM" || xC.nodeName == "DIV") {
								var aE = $e("P");
								xC.appendChild(aE);
							};
						};
						$at(aE, [['id', 'resNtable']]);
						aE.appendChild(e);
					};
				};
			};
		};
		
		var arrTNPC = $xf("//*[starts-with(@id, 'NPCTT_')]", 'l');
		var aTb = $g("selecttraintroops");
		if (!aTb) {
			aTb = $xf("//table[@class='build_details']");
			if (aTb) {
				for (var i = 0; i < arrTNPC.snapshotLength; i++) {
					var ex = calculateResourceTime(arrTtT[i].aRes, "30");
					if (ex) {
						xN = aTb.rows[i + 1].cells[aTb.rows[i + 1].cells.length - 1];
						xN.innerHTML = '';
						xN.appendChild(ex);
					};
				};
			};
		};
		return;
	};

	//change to the default attack type on the "Rally Point -> Send Troops" page
	function defaultAttackType(){
		//2:Defend, 3:Attack, 4:Raid
		//OASIS - only attack:raid (fr3nchlover)
		if (crtPage.match(/a2b.php\?(.*)&o/)) act = 4; else {
			act = (parseInt(TB3O.O[49]) + 2);
			//action = 2 if the destination is one of your own villages
			if (crtPage.search(/z=(\d+)/) >= 0) {
				z = RegExp.$1;
				for (var i = 0; i < vList.length; i++) {if (z == vList[i].vID) act = 2;};
			};
		};
		var rbA = $xf("//input[@value='" + act + "' and @name='c']");
		if (rbA) rbA.checked = true;
	};

	function prepareDivDocking() {
		var dD = $g(dlright1);
		if (!dD){
			dD = $d("", [["id", dlright1]]);
			divlmidall = $g(dmid);
			divlmidall.appendChild(dD);
		};
		if (dD) {
			TB3O.nTAUb = dD;
			TB3O.nTANb = dD;
			TB3O.nTARbT = dD;
			TB3O.nTASb = dD;
		};
	};

	//Bookmarks on the right side
	function showUserBookmarks() {
		if (TB3O.O[20] != '1') return;
		removeElement($g("userbookmarksTT"));
		removeElement($g("userbookmarks"));
		aTb = getUserBookmarksTable();
		if (TB3O.O[71] == '0' && TB3O.O[21] == '1') aTb.style.display = 'none';
		if (TB3O.O[21] != '1') {
			parBM = $g("parBM");
			if (!parBM) {
				parBM = $e("P");
				$at(parBM, [['id', 'parBM']]);
				TB3O.nTAUb.appendChild(parBM);
			};
			parBM.appendChild(aTb);
		} else {
			uBminWidth = 200;
			var ubXY = TB3O.O[76].split("|");
			div = createFloatingDiv(uBminWidth, ubXY[0], ubXY[1], T('MARCADORES'), 'userbookmarks', "userbookmarksTT", true);
			div.appendChild(aTb);
		};
		playerLinks("userbookmarks");
		aTb = $g('userbookmarks');
		if (aTb && TB3O.O[21] == '1') adjustFloatDiv(aTb, uBminWidth, "userbookmarks");
		
		function getUserBookmarksTable() {
			var aTb = $t([['id', 'userbookmarks']]);
			//header row
			aTb.appendChild($r("").appendChild(getUserBookmarksHeader()));
			//bookmarks string
			var strBM = getGMcookie("marcadores", false);
			if (strBM == "false") {setGMcookie("marcadores", '', false); strBM = '';};

			if (strBM != ''){
				marcadores = new Array();
				strBM = strBM.split("$$");
				for (var i = 0; i < strBM.length; i++) marcadores[i] = strBM[i].split("$");
				for (var i = 0; i < marcadores.length; i++) {
					bmRow = $r();
					strBookmark = marcadores[i][0];
					if (TB3O.O[82] != "1") {
						var aDel = $a(gIc["del"], [['href', jsVoid]]);
						aDel.addEventListener("click", removeGMcookieValue("marcadores", i, false, showUserBookmarks, false), 0);
						aC = $c("");
						aC.appendChild(aDel);
						bmRow.appendChild(aC);

						bmRow.appendChild($c("&nbsp;"));

						upC = $c("");
						if (i > 0) {
							aUp = $a("", [['href', jsVoid]]);
							aUp.appendChild($img([['src', image["arrowup"]]]));
							aUp.addEventListener("click", moveUserBookmark(i, -1), false);
							upC.appendChild(aUp);
						};
						bmRow.appendChild(upC);

						downC = $c("");
						if (i < marcadores.length - 1) {
							var aDown = $a("", [['href', jsVoid]]);
							aDown.appendChild($img([['src', image["arrowdown"]]]));
							aDown.addEventListener("click", moveUserBookmark(i, 1), false);
							downC.appendChild(aDown);
						};
						bmRow.appendChild(downC);
						bmRow.appendChild($c("&nbsp;"));
						eC = $c("");
						aEdit = $a("", [['href', jsVoid]]);
						aEdit.appendChild($img([['src', image["editbookmark"]], ['title', T('EDIT')]]));
						aEdit.addEventListener("click", editUserBookmark(i), false);
						eC.appendChild(aEdit);
						bmRow.appendChild(eC);
						bmRow.appendChild($c("&nbsp;"));
					} else {
						sCol = "black";
						if (marcadores[i][1] == crtPage) sCol = "#FF8000";
						var aC = $c("<span>&#8226;&nbsp;&nbsp;</span>", [['style', 'width:10px; color:' + sCol + ';']]);
						bmRow.appendChild(aC);
					};
					//additions by fr3nchlover
					if (marcadores[i][1].indexOf("*") != -1) {
						iL = $a(strBookmark + " ", [['href', marcadores[i][1].substring(0, marcadores[i][1].length-1)], ['target','_blank']]);
						iL.appendChild($img([['src', image["external"]]]));
					} else {
						iL = $a(strBookmark);
						if (marcadores[i][1] != "#") $at(iL, [['href', marcadores[i][1].substring(0, marcadores[i][1].length)]]);
					};
					bmC = $c("");
					bmC.appendChild(iL);
					bmRow.appendChild(bmC);
					aTb.appendChild(bmRow);
				};
			};
			return aTb;

			function getUserBookmarksHeader() {
				var hText = $e("B", T('MARCADORES') + ':');
				var aL = new Array();

				aL[0] = $a("",[['href', jsVoid]]);
				aL[0].appendChild($img([['src', image["addbookmark"]], ['title', T('ANYADIR')]]));
				aL[0].addEventListener("click", function() {addUserBookmark();}, 0);
				aL[1] = $a("",[['href', jsVoid]]);
				aL[1].appendChild($img([['src', image["addbmthispage"]], ['title', T('ADDCRTPAGE')]]));
				aL[1].addEventListener("click", function() {addUserBookmark(window.location.href);}, 0);
				aL[2] = $a("", [['href', jsVoid]]);
				aL[2].appendChild($img([['src', image["addbmspacer"]], ['title', T('SPACER')]]));
				aL[2].addEventListener("click", function() {addGMcookieValue("marcadores", ["<hr size='2' width='100%' noshade color=darkgrey>", "#"], false); showUserBookmarks();}, 0);
				var dInfo = (TB3O.O[82] != "1" ? ["unlocked" + docDir[0].substring(0, 1), '82.L', "1", '8'] : ["locked", '82.U', "0", '2']);
				aL[3] = $a("", [['href', jsVoid]]);
				aL[3].appendChild($img([['src', image[dInfo[0]]], ['title', T(dInfo[1])]]));
				aL[3].addEventListener("click", function() {TB3O.O[82] = dInfo[2]; setGMcookieV2("TB3Setup", TB3O.O, 'SETUP'); showUserBookmarks(); }, false);
				var hCell = $c("", [['class', 'tb3cnb'],['colspan', dInfo[3]]]);
				hCell.appendChild(hText);
				var strVbar = '';
				for (var i = 0; i < 4; i++) {
					strVbar = (i > 0 ? '| ' : ' ');
					hCell.appendChild(document.createTextNode(" " + strVbar));
					hCell.appendChild(aL[i]);
				};
				return hCell;
			};
		};

		function addUserBookmark(ubURL) {
			if (!ubURL) {
				ubURL = prompt(T('UBU'));
				if (!ubURL || ubURL == '') return;
			};
			var ubLabel = prompt(T('UBT'));
			if (!ubLabel || ubLabel == '') return;
			addGMcookieValue("marcadores", [ubLabel, ubURL], false);
			showUserBookmarks();
		};

		function moveUserBookmark(i, updown) {
			return function(){
				ubC = getGMcookie("marcadores", false);
				arrUbC = ubC.split("$$");
				tmpUb = arrUbC[i + updown];
				arrUbC[i + updown] = arrUbC[i];
				arrUbC[i] = tmpUb;
				ubC = arrUbC.join("$$");
				setGMcookie("marcadores", ubC, false);
				showUserBookmarks();
			};
		};

		function editUserBookmark(i) {
			return function() {
				ubC = getGMcookie("marcadores", false);
				arrUbC = ubC.split("$$");
				tmpUb = arrUbC[i].split("$");

				ubLabel = prompt(T('UBT'), tmpUb[0]);
				ubURL = null;
				if (ubLabel != '') ubURL = prompt(T('UBU'), tmpUb[1]);

				if (!ubLabel) ubLabel = tmpUb[0];
				if (!ubURL) ubURL = tmpUb[1];

				if (ubLabel != '' && ubURL != '' && (ubLabel != tmpUb[0] || ubURL != tmpUb[1])) {
					arrUbC[i] = ubLabel + "$" + ubURL;
					ubC = arrUbC.join("$$");
					setGMcookie("marcadores", ubC, false);
					showUserBookmarks();
				};
			};
		};
	};

	function getSingleTown() {
		//we'll do the AJAX Request if the user has only one village
		//get the list of villages
		vTable = $xf("//div[@id='" + dlright1 + "']//table[@id='vlist'] | //div[@id='" + dlright1 + "']//table[@class='f10']");
		if (!vTable || (vTable && vList.length < 2)) {
			//get town coordinates from the spieler.php page via AJAX request
			ajaxRequest("/spieler.php", 'GET', null, function(AJAXrespX) {
				var ansdoc = document.implementation.createDocument("", "", null);
				var ans = $e('DIV');
				ans.innerHTML = AJAXrespX.responseText;
				ansdoc.appendChild(ans);
				var aValue = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7']//a[contains(@href,'karte.php?d=')] | //div[@id='" + dmid2 + "']//table[@id='villages']//a[contains(@href, 'karte.php?d=')]", 'f', ans, ansdoc);
				TB3O.U[4] = aValue.href.match(/\?d=(\d+)/)[1];
				TB3O.U[3] = aValue.textContent;
				var xyCap = id2xy(vId);
				TB3O.U[6] = xyCap[0] + "|" + xyCap[1];
				setGMcookieV2('UserInfo', TB3O.U, 'UsI');
			});
			//get the newdid from the dorf3.php page via AJAX request
			ajaxRequest("/dorf3.php", 'GET', null, function(AJAXrespX) {
				var ansdoc = document.implementation.createDocument("", "", null);
				var ans = $e('DIV');
				ans.innerHTML = AJAXrespX.responseText;
				ansdoc.appendChild(ans);
				var aValue = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7 li ou']//a[contains(@href,'dorf1.php?newdid=')] | //div[@id='" + dmid2 + "']//table[@id='overview']//a[contains(@href, 'dorf1.php?newdid=')]", 'f', ans, ansdoc);
				TB3O.U[5] = aValue.href.split("=")[1];
				setGMcookieV2('UserInfo', TB3O.U, 'UsI');
			});
		};
	};

	function createVillageList(dlr1) {
		//single village
		if (TB3O.U[3] == '' || TB3O.U[5] == '') getSingleTown();
		if (TB3O.U[4] != '') {
			//idea from Ali Mojallali Hacked FR (mik french (fr), A_r_e_s (br), Booboo(hu))
			//create village list for single village accounts
			xy = id2xy(TB3O.U[4]);
			if (!dlr1) {
				dlr1 = $d("", [['id', dlright1]]);
				divlmidall = $g(dmid);
				divlmidall.appendChild(dlr1);
			};
			var vTb;
			if (TB3O.T35 == false) {
				dlr1.style.position = "relative";
				xVil = $a('<span class="f10 c0 s7 b">' + T('VILLAGE') + ':</span>', [['href', 'dorf3.php']]);
				dlr1.insertBefore(xVil, dlr1.firstChild);
				vTb = $t([['class', "f10"]]);
				aBody = $e("TBODY", "");
				vTb.appendChild(aBody);
				aRow = $r();
				aBody.appendChild(aRow);
				var aC = $c('<span class="c2">&#8226;</span>&nbsp;&nbsp;', [['class', 'nbr']]);
				aRow.appendChild(aC);
				bLink = $a(TB3O.U[3], [['class', 'active_vl'], ['href', (TB3O.U[5] == 'false' ? '?newdid=0' : '?newdid=' + TB3O.U[5])]]);
				aC.appendChild(bLink);
				bCell = $c("", [['class', 'right']]);
				aRow.appendChild(bCell);
				aTb = $t([["class", "dtbl"]]);
				bCell.appendChild(aTb);
				bBody = $e("TBODY", "");
				aTb.appendChild(bBody);
				bRow = $r();
				bBody.appendChild(bRow);
				bRow.appendChild($c("(" + xy[0], [["class", "right dlist1"]]));
				bRow.appendChild($c("|", [["class", "center dlist2"]]));
				bRow.appendChild($c(xy[1] + ")", [["class", "left dlist3"]]));
				insertAfter(xVil, vTb);
			} else if (TB3O.M35 == 1) {
				vDiv = $d("", [['class', 'vlist']]);
				vTb = $t([['class', 'vlist']]);
				tbody = $e("TBODY", "");
				aRow = $r([['class', 'sel']]);
				aRow.appendChild($c("●", [['class', 'dot']]));
				var aC = $c("", [['class', 'text']]);
				xVil = $a(TB3O.U[3], [['href', (TB3O.U[5] == 'false' ? '?newdid=0' : '?newdid=' + TB3O.U[5])]]);
				aC.appendChild(xVil);
				aRow.appendChild(aC);
				aRow.appendChild($c("(" + xy[0], [['class', "x"]]));
				aRow.appendChild($c("|"));
				aRow.appendChild($c(xy[1] + ")", [['class', "y"]]));
				tbody.appendChild(aRow);
				vTb.appendChild(tbody);
				xVil = $a('<span class="f10 c0 s7 b">' + T('VILLAGE') + ':</span>', [['href', 'dorf3.php']]);
				xVil.setAttribute('accesskey', '9');
				vDiv.appendChild(xVil);
				vDiv.appendChild(vTb);
				dlr1.insertBefore(vDiv, dlr1.firstChild);
			} else {
				vTb = $t([['id', 'vlist']]);
				ahead = $e("THEAD", "");
				hrow = $r();
				hCell = $c("", [['colspan', '3']]);
				hLink = $a(T('VILLAGE') + ':', [['href', 'dorf3.php'], ['accesskey', '9']]);
				hCell.appendChild(hLink);
				hrow.appendChild(hCell);
				ahead.appendChild(hrow);
				tbody = $e("TBODY", "");
				aRow = $r();
				aRow.appendChild($c("●", [['class', 'dot hl']]));
				bCell = $c("", [['class', 'link']]);
				bLink = $a(TB3O.U[3], [['href', '?newdid=' + (TB3O.U[5] == 'false' ? '0' : TB3O.U[5])]]);
				bCell.appendChild(bLink);
				cCell = $c("", [['class', 'aligned_coords']]);
				xD = $d(" (" + xy[0], [['class', 'cox'], ['style', 'padding-' + docDir[0] + ':5px; float:' + docDir[0] + ';']]);
				piD = $d(" | ", [['class', 'pi'], ['style', 'float:' + docDir[0] + ';']]);
				yD = $d(xy[1] + ") ", [['class', 'pi'], ['style', 'padding-' + docDir[1] + ':5px; float:' + docDir[0] + ';']]);
				cCell.appendChild(xD);
				cCell.appendChild(piD);
				cCell.appendChild(yD);
				aRow.appendChild(bCell);
				aRow.appendChild(cCell);
				tbody.appendChild(aRow);
				vTb.appendChild(ahead);
				vTb.appendChild(tbody);
				if ($g("qge")) dlr1.insertBefore(vTb, $g("qge")); else dlr1.insertBefore(vTb, dlr1.fistChild);
			};
			return vTb;
		};
	};

	function vilCount(vCount) {
		vlHead = $xf("//div[@id='" + dlright1 + "']//a[contains(@href, 'dorf3.php')]");
		if (vlHead) {
			if (vlHead.parentNode.nodeName == "TD") vlHead.innerHTML = T('ALDEAS') + " (" + (vCount - 1) + "):&nbsp;&nbsp;"; else vlHead.firstChild.innerHTML = T('ALDEAS') + " (" + vCount + "):&nbsp;&nbsp;";
			l = $a(gIc["reload_p"], [['href', jsVoid]]);
			l.addEventListener("click", updatePopulation, false);
			insertAfter(vlHead, l);
		};

		function updatePopulation() {
			ajaxRequest('spieler.php', 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var ans = $e('DIV');
				ans.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(ans);
				var aTb = $xf("//table[@id='villages'] | //div[@id='" + dmid2 + "']//table[@class='tbg'][2]", 'f', ans, aDoc);
				if (aTb) {
					parsePlayerTable(aTb, true);
					pauseScript(892);
					location.href = crtPage;
				}
			});
			return;
		};
	};

	function parsePlayerTable(aTb, boolUpdate) {
		var vPop = 0;
		var totP = 0;
		for (i = 2; i < aTb.rows.length; i++) {
			vPop = parseInt(aTb.rows[i].cells[1].innerHTML);
			totP += vPop;
			var vLink = aTb.rows[i].cells[0].getElementsByTagName("A")[0];
			var arrLink = vLink.href.split("=");
			var cxy = id2xy(arrLink[1]);
			var xy = "(" + cxy[0] + "|" + cxy[1] + ")";
			var vID = xy2id(cxy[0], cxy[1]);
			if (boolUpdate == true) setVillageRes(vID, vPop);
		};
		return totP;
	};

	function getBiPTMTable(vNewdid) {
		//create the BiP & troop movements table for this village
		var cBiP = getGMcookieV2("BiP");
		var cTM = getGMcookieV2("TroopMovements");
		var arrBiP = null;
		var arrTM = null;
		var iHTML = '';
		var boolShow = false;

		if (cBiP && cBiP[vNewdid] != undefined) arrBiP = cBiP[vNewdid];
		if (cTM && cTM[vNewdid] != undefined) arrTM = cTM[vNewdid];
		var fDiv = $e("DIV");
		fDiv.innerHTML = '';

		if (arrBiP != null) {
			var tr1 = $r([['class', 'tb3r']]);
			var aC1 = $c("<img src='" + gIc["bau"] + "'>", [['class', 'tb3c'], ['style', 'text-align:center;'],['colspan', '3']]);
			tr1.appendChild(aC1);
			for (var i = 0; i < arrBiP.length; i++) {
				var bipT = arrBiP[i].endTime;
				var crtDate = new Date();
				var crtTime = crtDate.getTime();
				if (crtTime < bipT) {
					var tr2 = $r([['class', 'tb3r']]);
					var aC2 = $c(arrBiP[i].name, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var aC3 = $c(arrBiP[i].txtLvl, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var strEndTime = new Date();
					strEndTime.setTime(arrBiP[i].endTime);
					var strH = strEndTime.getHours();
					if (strH < 10) strH = '0' + strH;
					var strM = strEndTime.getMinutes();
					if (strM < 10) strM = '0' + strM;
					var aC4 = $c(strH + ":" + strM,  [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					tr2.appendChild(aC2);
					tr2.appendChild(aC3);
					tr2.appendChild(aC4);
					if (boolShow == false) {
						fDiv.appendChild(tr1);
						boolShow = true;
					};
					fDiv.appendChild(tr2);
				};
			};
		};

		boolShow = false;

		if (arrTM != null) {
			var tr1 = $r([['class', 'tb3r']]);
			var aC1 = $c(gIc["att_all"], [['class', 'tb3c'], ['style', 'text-align:center;'],['colspan', '3']]);
			tr1.appendChild(aC1);
			for (var i = 0; i < arrTM.length; i++) {
				var atT = arrTM[i].fT;
				var crtDate = new Date();
				var crtTime = crtDate.getTime();
				if (crtTime < atT) {
					var tr2 = $r([['class', 'tb3r']]);
					var xImg;
					if (TB3O.T35 == false) xImg = '<img src="' + img("a/" + arrTM[i].type) + '" height="12px" width= "12px">'; else xImg = gIc[arrTM[i].type];
					var aC2 = $c(xImg, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var aC3 = $c(arrTM[i].no, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var strFTime = new Date();
					strFTime.setTime(arrTM[i].fT);
					var strH = strFTime.getHours();
					var strM = strFTime.getMinutes();
					var aC4 = $c((strH > 9 ? strH : '0' + strH) + ":" + (strM > 9 ? strM : '0' + strM),  [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					tr2.appendChild(aC2);
					tr2.appendChild(aC3);
					tr2.appendChild(aC4);
					if (boolShow == false) {
						fDiv.appendChild(tr1);
						boolShow = true;
					};
					fDiv.appendChild(tr2);
				};
			};
		};
		return fDiv.innerHTML;
	};

	function showBiPTMinTT(vNewdid) {
		//show Buildings in Progress and Troop Movements in a tooltip
		return function() {
			var tadInfo = getBiPTMTable(vNewdid);
			if (tadInfo != '') {
				var adtHTML = "<table class='tb3tb' width='100px'>" + tadInfo + "</table>";
				var aTooltip = $g("tb_tooltip");
				if (aTooltip == null) aTooltip = createTooltip();
				aTooltip.innerHTML = adtHTML;
				aTooltip.style.display = 'block';
			};
		};
	};

	function villageList() {
		//list of villages
		dlr1 = $g(dlright1);

		var vTable = $g('vlist');
		if (!vTable) vTable = $xf("//table[@class='vlist'] | //div[@id='" + dlright1 + "']//table[@class='f10']");

		if (!vTable) vTable = createVillageList(dlr1); else {TB3O.U[4] = ''; TB3O.U[5] = ''; setGMcookieV2('UserInfo', TB3O.U, 'UsI');};
		if (!vTable) return;

		vilCount(vTable.rows.length);

		if (dlr1.childNodes[1] && dlr1.childNodes.nodeName == "DIV" || dlr1.childNodes[0] && dlr1.childNodes[0].nodeName == "DIV") vTable = vTable.firstChild;

		zi = 0;
		if (vTable.parentNode.nodeName == "DIV" && (vTable.parentNode.id == 'sright' || vTable.parentNode.id == 'side_info')) zi = 1;
		$at(dlr1, [['style', 'position:absolute; top:97px; ' + docDir[0] + ':682px;']]);

		if (TB3O.VillageRes && TB3O.VillageRes[actV.vID]) TB3O.AVP = TB3O.VillageRes[actV.vID][0];
		for (var i = zi; i < vTable.rows.length; i++){
			v = vTable.rows[i];
			vCell = v.cells[1];
			if (!vCell) continue;
			if (zi == 1) {
				vName = vCell.textContent;
				vLink = vCell.childNodes[0].href;
			} else {
				if (vCell.className == 'text') {
					vName = vCell.textContent;
					vLink = vCell.childNodes[0].href;
				} else {
					vCell = v.cells[0];
					vChild = vCell.childNodes[2];
					if (vChild.nodeName != "A") vChild = vCell.childNodes[3];
					vName = vChild.textContent;
					vLink = vChild.href;
				};
			};
			
			vNewdid = getNewdidFromLink(vLink);
			if (vNewdid != actV.vNewdid) vNames += '"' + vName + '",'; //else $at(v, [['style', 'background-color:#F1F1F1;']]);

			if (vCell.nextSibling.childNodes[0].nodeName == "TABLE") {
				strCoords = vCell.nextSibling.childNodes[0].textContent;
				strCoords.search(/\((.*)\n?\|\n?(.*)\)/);
				tmpX = RegExp.$1;
				tmpY = RegExp.$2;
			} else if (vCell.nextSibling.className == 'aligned_coords') {
				tmpC = vCell.nextSibling.textContent.replace("(", "").replace(")", "").split("|");
				tmpX = parseInt(tmpC[0]);
				tmpY = parseInt(tmpC[1]);
			} else {
				tmpX = vCell.nextSibling.textContent.replace("(", "");
				tmpY = vCell.nextSibling.nextSibling.nextSibling.textContent.replace(")", "");
			};

			vID = xy2id(tmpX, tmpY);

			vList[vList.length] = new xVillage(vName, vID, vNewdid, tmpX, tmpY, vLink);
			yi = vList.length - 1;

			popX = [0, 0, 0, 0, 0, 0];
			if (TB3O.VillageRes[vList[yi].vID]) popX = TB3O.VillageRes[vList[yi].vID];

			if (TB3O.O[17] == '1') {
				if (TB3O.VillageRes == "false") {
					popCell = $c("<a href='spieler.php?uid=" + TB3O.UserID + "'>?</a>");
				} else {
					popCell = $c(popX[0], [['style', 'text-align:' + docDir[1] + '; font-size:8pt; color:darkgreen;']]);
				};
				v.appendChild($c(" " + "<img src='" + image["pop"] + "'>", [['style', 'text-align:' + docDir[0] + ';']]));
				v.appendChild(popCell);
			};

			//show res prod/h
			if (TB3O.O[15] == '1' && TB3O.VillageRes[vList[yi].vID]) {
				for (var xi = 1; xi < 4; xi++) {
					v.appendChild($c(" " + gIc["r" + xi], [['style', 'text-align:' + docDir[0] + ';']]));
					v.appendChild($c(TB3O.VillageRes[vList[yi].vID][xi], [['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]));
				};
			};
			
			//show effective crop prod/h
			if (TB3O.O[16] == "1") {
				cpphColor = "black";
				cpph = parseInt(popX[4]);
				if (cpph > 0) {
					cpph = "+" + cpph;
					cpphColor = "darkgreen";
				} else if (cpph < 0) cpphColor = "red";
				v.appendChild($c(" " + gIc["r4"], [['style', 'text-align:' + docDir[0] + ';']]));
				v.appendChild($c(cpph, [['style', 'font-size:8pt; color:' + cpphColor + '; text-align:' + docDir[1] + ';']]));
			};

			if (TB3O.O[12] == "1") {
				for (var xi = 1; xi < 3; xi++) {
					aCell = $c("");
					aLink = $a("", [['href', 'dorf' + xi + '.php?newdid=' + vList[yi].vNewdid]]);
					if (xi == 1) strImg = "ov"; else strImg = "iv";
					aLink.appendChild($img([['src', image[strImg]], ['title', vList[yi].vName + " (dorf" + xi + ".php)"]]));
					aCell.appendChild(aLink);
					v.appendChild(aCell);
				};
			};
			if (TB3O.O[13] == '1') {
				aCell = $c("");
				aLink = $a("", [['href', 'karte.php?z=' + vList[yi].vID]]);
				aLink.appendChild($img([['src', image["centermap"]],['title', T('CENTERMAP') + " (" + vList[yi].vName + ")"]]));
				aCell.appendChild(aLink);
				v.appendChild(aCell);
			};

			if (TB3O.O[19] == '1') {
				aCell = $c("");
				aCell.addEventListener("mouseover", showBiPTMinTT(vNewdid), false);
				aCell.addEventListener("mouseout",  hideTT, 0);
				aCell.appendChild($img([['src', image["info"]]]));
				v.appendChild(aCell);
			};

			if (TB3O.O[14] == '1') {
				v.appendChild($c("<a href='a2b.php?z=" + vList[yi].vID + "'>" + gIc["def1_1"] + "</a>"));
				v.appendChild($c("<a href='build.php?z=" + vList[yi].vID + "&gid=17'>" + gIc["r41"] + "</a>"));
			};
			if (crtPage.indexOf('karte') != -1) {
				if (TB3O.O[57] == "1" && TB3O.xCrt != -1000 && TB3O.yCrt != -1000) {
					var lDist = getDistance(vList[yi].vx, vList[yi].vy, TB3O.xCrt, TB3O.yCrt);
					v.appendChild($c(" " + "<img src='" + image["dist" + docDir[0].substr(0,1)] + "'>" + " " + lDist.toFixed(2), [['style', 'font-size:8pt; color:blue;']]));
				};
			};
		};
		dlr1.style.width = (v.clientWidth + 150) + 'px';
	};

	function addVillageNamesScript() {
		//own villages for market & rally point send pages
		isAddV = $g("build");
		if (!isAddV) isAddV = $xf('//form[@name="snd" and @action="a2b.php"]');
		iDN = document.getElementsByName("dname");
		if (isAddV && iDN.length > 0) {
			dorfnamen = $e("script");
			dorfnamen.setAttribute("language", "JavaScript");
			iHTML = 'var dorfnamen = new Array(' + vNames.substring(0, vNames.lastIndexOf(',')) + ')';
			dorfnamen.innerHTML = iHTML;
			isAddV.appendChild(dorfnamen);
			iDN[0].setAttribute("onkeyup", "my_village()");
		};
	};
	
	function show2ndVillageList() {
		if (TB3O.O[18] != "1") return;
		var VL2W = 250;
		var vL2Tb = create2ndVLtable();
		var vL2XY = TB3O.O[78].split("|");
		var vl2div = createFloatingDiv(VL2W, vL2XY[0], vL2XY[1], T('VILLAGELIST'), "vl2table", "vl2tableTT", true);
		vl2div.appendChild(vL2Tb);
		vL2Tb = $g("vl2table");
		if (vL2Tb) adjustFloatDiv(vL2Tb, VL2W, "vl2table");
	};

	function create2ndVLtable() {
		var aTb = $t([['id', 'vl2table']]);
		if (TB3O.O[73] == '0') aTb.style.display = 'none';
		var strBx = '&nbsp;&#8226&nbsp;&nbsp';
		var maxRows = Math.ceil(vList.length / 2);
		for (var i = 1; i <= maxRows; i++) {
			aRow = $r();
			aCell = $c(strBx);
			if (vList[i - 1].vID == actV.vID) $at(aCell, [['class', 'av']]);
			aLink = $a(vList[i - 1].vName, [['href', vList[i - 1].vLink]]);
			aCell.appendChild(aLink);
			aRow.appendChild(aCell);
			bCell = $c("(" + vList[i - 1].vx + "|" + vList[i - 1].vy + ")", [['class', 'coord']]);
			aRow.appendChild(bCell);
			aRow.appendChild($c("<a href='a2b.php?z=" + vList[i - 1].vID + "'>" + gIc["def1_1"] + "</a>"));
			aRow.appendChild($c("<a href='build.php?z=" + vList[i - 1].vID + "&gid=17'>" + gIc["r41"] + "</a>"));
			tdE = $c('', [['width', '10px']]);
			aRow.appendChild(tdE);
			if (i + maxRows <= vList.length ) {
				cCell = $c(strBx);
				if (vList[i - 1 + maxRows].vID == actV.vID) $at(cCell, [['class', 'av']]);
				bLink = $a(vList[i - 1 + maxRows].vName, [['href', vList[i - 1 + maxRows].vLink]]);
				cCell.appendChild(bLink);
				aRow.appendChild(cCell);
				dCell = $c("(" + vList[i - 1 + maxRows].vx + "|" + vList[i - 1 + maxRows].vy + ")", [['class', 'coord']]);
				aRow.appendChild(dCell);
				aRow.appendChild($c("<a href='a2b.php?z=" + vList[i - 1 + maxRows].vID + "'>" + gIc["def1_1"] + "</a>"));
				aRow.appendChild($c("<a href='build.php?z=" + vList[i - 1 + maxRows].vID + "&gid=17'>" + gIc["r41"] + "</a>"));
			} else {
				cCell = $c("", [['colspan', '4']]);
				if (vList.length == 1) $at(cCell, [['width', '250px']]);
				aRow.appendChild(cCell);
			};
			aTb.appendChild(aRow);
		};
		return aTb;
	};

	function selectFakeTroopsCell(boolShowAll) {
		aCell = null;
		if (TB3O.U[1] != '') {
			aCell = $c("", [['id', 'selectfaketroopscell']]);
			for (var xi = 0; xi < 8; xi++) {
				if ((TB3O.U[1] != 'Gauls' && xi != 4) || (TB3O.U[1] == 'Gauls' && xi != 3)) {
					tAv = $g("troopsav_" + xi);
					if (tAv || boolShowAll) {
						aInput = $i([['type', 'checkbox'], ['id', 'faketroop_' + (xi)], ['value', '1']]);
						aCell.appendChild(aInput);
						aImg = $img([['src', gIc["u" + (xi + TB3O.U[7] - 1)]]]);
						if (TB3O.T35 != false) $at(aImg, [['class', "unit u" + (xi + TB3O.U[7] - 1)]]);
						aCell.appendChild(aImg);
						aTxt = document.createTextNode("  ")
						aCell.appendChild(aTxt);
					};
				};
			};
		};
		return aCell;
	};

	function showLastAttack() {
		if (TB3O.O[51] != '1') return;
		var aF = $xf("//form[@name='snd']");
		if (!aF) return;
		
		var btnOK = $xf("//*[@id='btn_ok' and @name='s1']");
		if (btnOK) btnOK.addEventListener('click', saveLastAttack, false);
		
		var cstla = getGMcookieV2('stla');
		if (cstla && cstla[actV.vID]) {
			var stla = cstla[actV.vID];
			var bsh = false;
			for (var xi = 2; xi < stla.length - 2; xi++) {if (stla[xi] != 0) bsh = true;};
			if (bsh == true) {
				//create the last send attack table for this village
				var aTb = $t([['id', 'stla']]);
				var aRow = $r();
				aRow.appendChild($c('<img class="unit u' + (TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh1']]));
				aRow.appendChild($c(stla[2]));
				aRow.appendChild($c('<img class="unit u' + (3 + TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				aRow.appendChild($c(stla[5]));
				aRow.appendChild($c('<img class="unit u' + (6 + TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				aRow.appendChild($c(stla[8]));
				aRow.appendChild($c('<img class="unit u' + (8 + TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				aRow.appendChild($c(stla[10]));
				var bRow = $r();
				bRow.appendChild($c('<img class="unit u' + (1 + TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh1']]));
				bRow.appendChild($c(stla[3]));
				bRow.appendChild($c('<img class="unit u' + (4 + TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				bRow.appendChild($c(stla[6]));
				bRow.appendChild($c('<img class="unit u' + (7 + TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				bRow.appendChild($c(stla[9]));
				bRow.appendChild($c('<img class="unit u' + (9 + TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				bRow.appendChild($c(stla[11]));
				var cRow = $r();
				cRow.appendChild($c('<img class="unit u' + (2 + TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh1']]));
				cRow.appendChild($c(stla[4]));
				cRow.appendChild($c('<img class="unit u' + (5 + TB3O.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				cRow.appendChild($c(stla[7]));
				cRow.appendChild($c('', [['colspan', '2']]));
				if (stla.length > 14) {
					cRow.appendChild($c('<img class="unit uhero" src="' + xGIF + '">', [['class', 'stlahh']]));
					cRow.appendChild($c(stla[12]));
				} else {
					cRow.appendChild($c('', [['class', 'stlahh']]));
					cRow.appendChild($c(''));
				}
				
				var eRow = $r();
				eRow.appendChild($c(T('RESEND'), [['class', 'stlahh1'], ['colspan', '2']]));
				var aL = $a('<img src="' + image["btnOK"] + '" title="' + T('YES') + '" alt="' + T('YES') + '">', [['href', jsVoid]]);
				aL.addEventListener("click", setLastAttack, false);
				var sC = $c("", [['class', 'stlac'], ['colspan', '3'], ['style', 'width:100px;']]);
				sC.appendChild(aL);
				eRow.appendChild(sC);
				var fRow = $r();
				eRow.appendChild($c(T('ELIMINAR'), [['class', 'stlahh2'], ['colspan', '2']]));
				aDel = $a(gIc["del"], [['href', jsVoid]]);
				aDel.addEventListener("click", hideLastAttackSend, 0);
				var dC = $c("", [['class', 'stlac']]);
				dC.appendChild(aDel);
				eRow.appendChild(dC);
				aTb.appendChild(aRow);
				aTb.appendChild(bRow);
				aTb.appendChild(cRow);
				if (TB3O.O[52] == '1') {
					var dRow = $r();
					dRow.appendChild($c('<img src="' + image["vmkls"] + '">', [['class', 'stlahh1']]));
					dRow.appendChild($c("(" + stla[0] + "|" + stla[1] + ")", [['class', 'stlac'], ['colspan', '4']]));
					dRow.appendChild($c(stla[stla.length - 1], [['class', 'stlac'], ['colspan', '3']]));
					aTb.appendChild(dRow);
				};
				aTb.appendChild(eRow);
				//aTb.appendChild(fRow);
				var aP = $e("P", "");
				aP.appendChild(aTb);
				var ln = $g("troops");
				insertAfter(ln, aP);
			};
		};
		
		function setLastAttack() {
			var t;
			for (var i = 2; i < stla.length - 2; i++) {
				t = $xf("//form[@name='snd']//*[@name='t" + (i - 1) + "']");
				if (stla[i] != 0 && t.className != 'text disabled') t.value = stla[i]; else t.value = '';
			};
			updateTroopsPower();
			if (TB3O.O[52] == '1') {
				$xf("//form[@name='snd']//*[@name='x']").value = stla[0];
				$xf("//form[@name='snd']//*[@name='y']").value = stla[1];
			}
			var rbc = $xf("//form//input[@name='c' and @value='" + stla[stla.length - 2] + "']");
			if (rbc) rbc.checked = true;
		};
		
		function hideLastAttackSend() {
			for (var xi = 2; xi < stla.length; xi++) {stla[xi] = 0;};
			setGMcookieV2("stla", stla, actV.vID);
			var aTb = $g('stla');
			aTb.style.display = 'none';
		};
		
		function saveLastAttack() {
			var aT = $xf("//form[@name='snd']//table//input[starts-with (@name, 't')]", 'l');
			var stla = new Array();
			stla[0] = $xf("//form[@name='snd']//*[@name='x']").value;
			stla[1] = $xf("//form[@name='snd']//*[@name='y']").value;
			for (var i = 0; i < aT.snapshotLength; i++) {stla[i + 2] = 0; stla[1 + parseInt(aT.snapshotItem(i).name.replace("t", ""))] = (aT.snapshotItem(i).value != '' ? parseInt(aT.snapshotItem(i).value) : 0);};
			var rbl = $xf("//form//input[@name='c']", 'l');
			var rb;
			for (var i = 0; i < rbl.snapshotLength; i++) {
				if (rbl.snapshotItem(i).checked == true) {
					stla[stla.length] = rbl.snapshotItem(i).value;
					stla[stla.length] = rbl.snapshotItem(i).parentNode.textContent;
				};
			};
			setGMcookieV2('stla', stla, actV.vID);
		};
	};
	
	function updateTroopsPower() {
		totals = [["troopsattpower", "att_all", 5, 0], ["troopsdefipower", "def_i", 6, 0], ["troopsdefcpower", "def_c", 7, 0], ["troopscapacity", "capacity", 4, 0], ["troopscropconsumption", "img5", 9, 0]];
		for (var i = 1; i < 11; i++) {
			tInput = $g("t" + i);
			if (tInput) {
				if (TB3O.T35 == false) tImg = tInput.parentNode.previousSibling.firstChild; else tImg = tInput.parentNode.childNodes[1];
				tType = getTroopIndexTitleFromImg(tImg)[0];
				if (tInput.value != "") {
					intTinput = parseInt(tInput.value);
					for (var j = 0; j < 5; j++) {totals[j][3] += intTinput * uc[tType][totals[j][2]];};
				};
			};
		};
		for (var j = 0; j < 5; j++) {
			cX = $g(totals[j][0]);
			if (cX) {
				strX = " *";
				switch (j) {
					case 3: imgPath = gIc["capacity"]; strX = ""; break;
					case 4: imgPath = gIc["r5"]; strX = ""; break;
					default: imgPath = gIc[totals[j][1]]; break;
				};
				cX.innerHTML = imgPath + strX + " " + $ls(totals[j][3]);
			};
		};
		return;
	};
	
	//someweirdnobody (initial), Nux (selectScout & selectFake), ms99 (final), Acr111 (change)
	function selectAllTroops() {
		iField = $xf("//input[@name='t1' and not (@type='hidden')]");
		if (iField == null) return;
		//add EventListener to all input fields
		for (var i = 1; i < 12; i++) {
			troopInput = $xf("//input[@name='t" + i + "']");
			if (troopInput) {
				$at(troopInput, [['id', 't' + i]]);
				troopInput.addEventListener('keyup', updateTroopsPower, false);
				troopInput.addEventListener('change', updateTroopsPower, false);
				if (TB3O.T35 == false) {
					troopLink = troopInput.parentNode.nextSibling.firstChild;
				} else {
					troopLink = troopInput.parentNode.childNodes[5];
					if (!troopLink) troopLink = troopInput.parentNode.childNodes[5].childNodes[0];
				};
				if (troopLink) {
					xxx = troopLink.textContent.replace("(", "").replace(")", "");
					if (xxx != '0') {
						$at(troopLink, [['id', 'troopsav_' + i]]);
						troopLink.addEventListener('click', addUpdateTroopsPower(i, troopLink), false);
					};
				};
			};
		};

		//original position
		header = $xf("//div[@id='" + dmid2 + "']//h1");
		//move the table as suggested by Acr111
		//var header = $xf("//td[@width='33%']");
		arrSelect = [[T('SELECTALLTROOPS'), getAllTroops], [T('SELECTSCOUT'), getScout], [T('SELECTFAKE'), getFakeUnitV2]];
		aTb = $t([["class", "tb3tbnb"], ['style', 'width:auto;']]);
		//change the style of the table as suggested by Acr111
		//aTb.setAttribute("style", "position:relative; left:-20px; z-index: 100; border: 1px solid #00C000; font-size:11px;");
		for (var i = 0; i < 3; i++) {
			aRow = $r([['class', 'tb3rnb']]);
			aCell = $c("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + '; font-size:8pt;']]);
			//change as suggested by Acr111
			//if (i == 0) aCell.setAttribute("colspan", "3");
			aLink = $a(arrSelect[i][0], [['href', jsVoid]]);
			aLink.addEventListener("click", arrSelect[i][1], true);
			aCell.appendChild(aLink);
			aRow.appendChild(aCell);
			if (i == 0) {
				bCell = $c("", [['colspan', '2']]);
				aRow.appendChild(bCell);
			};
			if (i == 1){
				//insert no of fakes cell
				bCell = $c("");
				scoutInput = $i([['type', 'text'], ['id', 'selectscoutnumber'], ['style', 'width:30px; font-size:8pt']]);
				if (isNaN(parseInt(TB3O.O[50]))) scoutInput.value = 3; else scoutInput.value = parseInt(TB3O.O[50]);
				bCell.appendChild(scoutInput);
				aRow.appendChild(bCell);
				//insert save option to change the setup option directly from the Rally point -> Send troops page
				//cCell = $c("&nbsp;<input type='checkbox' id='savescoutnumber' value='1'></input>&nbsp;" + T('SAVE'));
				//aRow.appendChild(cCell);
			};
			if (i == 2) {
				//allow selection of fake unit
				aCell = selectFakeTroopsCell();
				if (aCell != null) {
					aCell.setAttribute('colspan', '2');
					aRow.appendChild(aCell);
				};
			};
			aTb.appendChild(aRow);
		};

		insertAfter(header, aTb);

		troopTable = $g("troops");
		if (!troopTable) troopTable = $xf("//table[@class='troops'] | //table[@class='dashed'] | //table[@class='f10']");
		
		//fix for unusual icons appearing under the list of villages - fr3nchlover
		tags7 = $xf("//div[@id='" + dmid2 + "']//td[@class='s7']");
		if ((TB3O.T35 == false && troopTable != null && !tags7) || (TB3O.T35 == true && troopTable != null)) {
			//add the "clear all" button
			aRow = $r();
			delCell = $c("", [['colspan', '12'], ['style', 'text-align:center']]);
			clAllLink = $a("<img src='" + image["btnDel"] + "' title='" + T('MTCL') + "' alt='" + T('MTCL') + "'>");
			clAllLink.href = jsVoid;
			clAllLink.addEventListener("click", clearAllTroops, false);
			delCell.appendChild(clAllLink);
			aRow.appendChild(delCell);
			troopTable.appendChild(aRow);

			//add additional table as requested by users
			if (TB3O.T35 == false) parX = $xf("//table[@class='p1']"); else parX = troopTable;
			if (parX) {
				attdefTable = $t([['class', 'tb3tb']]);
				hRow = $r([['class', 'tb3r']]);
				hCell = $c(T('STATISTICS') + " (* = " + T('MIN') + ")", [['colspan', '4'], ['style', 'font-weight:bold;'], ['class', 'tb3ch']]);
				hRow.appendChild(hCell);
				attdefTable.appendChild(hRow);

				//add the total attack, def_i and def_c power for the selected troops
				bRow = $r([['style', 'text-align:' + docDir[0] + ';']]);

				aCell = $c(gIc["att_all"] + " *", [['id', "troopsattpower"], ['width', "33,3%"]]);
				bCell = $c(gIc["def_i"] + " *", [['id', "troopsdefipower"], ['colspan', "2"], ['width', "33,3%"]]);
				cCell = $c(gIc["def_c"] + " *", [['id', "troopsdefcpower"], ['width', "33,3%"]]);

				bRow.appendChild(aCell);
				bRow.appendChild(bCell);
				bRow.appendChild(cCell);
				attdefTable.appendChild(bRow);
				dRow = $r();

				//total capacity
				dCell = $c(gIc["capacity"], [['id', 'troopscapacity'], ['style', 'text-align:' + docDir[0] + ';'], ['colspan', "2"], ['width', '50%']]);

				//crop consumption
				eCell = $c(gIc["r5"], [['id', 'troopscropconsumption'], ['style', 'text-align:' + docDir[0] + ';'], ['colspan', "2"], ['width', '50%']]);

				dRow.appendChild(dCell);
				dRow.appendChild(eCell);
				attdefTable.appendChild(dRow);

				aDiv = $d("");
				pX = $e("P", "");
				aDiv.appendChild(pX);
				aDiv.appendChild(attdefTable);
				insertAfter(parX, aDiv);
			};
		};

		function addUpdateTroopsPower(i, troopLink) {
			return function() {
				aNo = parseInt(troopLink.textContent.replace("(", "").replace(")", ""));
				troopInput = $g("t" + i);
				if (troopInput) {
					troopInput.value = aNo;
					updateTroopsPower();
				};
			};
		};

		function clearAllTroops() {
			for (var i = 1; i < 12; i++) {
				troopInput = $g("t" + i);
				if (troopInput) troopInput.value = '';
			};
			updateTroopsPower();
			return;
		};

		function getTroopInputFields() {
			strSearch = "//form[@name='snd']//table//input[(@type='text' or @type='Text') and not (@name='x') and not (@name='y')]";
			if (TB3O.T35 == false) strSearch = "//table[@class='p1']//table[@class='f10']//input[@type='Text' or @type='text']";
			nodeRes = $xf(strSearch, 'l');
			return nodeRes;
		};

		function getTroopInputMaxFields() {
			strSearch = "//form[@name='snd']//table//a";
			if (TB3O.T35 == false) strSearch = "//table[@class='p1']//table[@class='f10']//a";
			nodes = $xf(strSearch, 'l');
			return nodes;
		};

		function getAllTroops() {
			nodeRes = getTroopInputFields();
			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) {nodeRes.snapshotItem(i).value = ""; };
			troopsForm = document.forms.namedItem("snd");
			nodes = getTroopInputMaxFields();
			if (nodes.snapshotLength > 1) {
				for (var i = 0; i < nodes.snapshotLength; i++) {
					node = nodes.snapshotItem (i);
					if (node.getAttribute("onClick")) {
						node.getAttribute("onClick").search(/document\.snd\.(.*)\.value=(.*); return false;/);
						inputName = RegExp.$1;
						troopValue = RegExp.$2;
						troopInput = troopsForm.elements.namedItem(inputName);
						troopInput.value = troopValue;
					};
				};
				updateTroopsPower();
			} else alert(T('NOTROOPS'));
		};

		function getScout() {
			var indCol = (TB3O.U[1] == "Gauls" ? 't3' : 't4');
			var nodeRes = getTroopInputFields();

			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) { nodeRes.snapshotItem(i).value = ""; };

			//set the attack:raid as action
			rbAction = $xf("//input[@value='4' and @name='c']");
			if (rbAction) rbAction.checked = true;

			troopsForm = document.forms.namedItem("snd");
			maxScout = $xf("//a[contains(@onclick, '" + indCol + "')]");
			if (maxScout) {
				maxScout.getAttribute("onClick").search(/document\.snd\.(.*)\.value=(.*); return false;/);
				inputName = RegExp.$1;
				if (inputName != 't9' && inputName != 't10') {
					scoutInput = troopsForm.elements.namedItem(inputName);
					maxNoOfScouts = parseInt(maxScout.textContent.replace("(", "").replace(")", ""));
					iNoOfScouts = $g('selectscoutnumber');
					if (iNoOfScouts) wNoOfScouts = parseInt(iNoOfScouts.value); else wNoOfScouts = 3;
					if (wNoOfScouts > maxNoOfScouts) wNoOfScouts = maxNoOfScouts;
					scoutInput.value = wNoOfScouts;
					if (scoutInput.value != "" && parseInt(scoutInput.value) > 0) {TB3O.O[50] = parseInt(scoutInput.value); setGMcookieV2("TB3Setup", TB3O.O, "SETUP");};
					updateTroopsPower();
				};
			} else alert(T('NOTROOP2SCOUT'));
		};

		function getFakeUnitV2() {
			nodeRes = getTroopInputFields();
			//remove previously selected units
			for (var i = 0; i < nodeRes.snapshotLength; i++) {nodeRes.snapshotItem(i).value = "";};

			//set the attack:normal as action
			rbA = $xf("//input[@value='3' and @name='c']");
			if (rbA) rbA.checked = true;

			nodeUnits = getTroopInputMaxFields();
			if (nodeUnits.snapshotLength > 1) {
				chk = false;
				for (var xi = 1; xi < 9; xi++) {
					faketroopselected = $g("faketroop_" + xi);
					if (faketroopselected && faketroopselected.checked) {
						avFake = $g('troopsav_' + xi);
						if (avFake) {
							//there are units available from selected fake troop type
							aInput = $g("t" + xi);
							if (aInput) {
								aInput.value = 1;
								chk = true;
							};
						};
					};
				};
				if (chk == false) {
					//no troops for fake selected or nothing availabe => use default
					tTroop = 2;
					avFake = $g('troopsav_2');
					if (!avFake) {
						avFake = $g('troopsav_1');
						tTroop = 1;
					};
					if (avFake) {
						aInput = $g("t" + tTroop);
						if (aInput) {
							aInput.value = 1;
							chk = true;
						};
					};
				};
				if (chk == false) alert(T('NOSCOUT2FAKE')); else updateTroopsPower();
			} else alert(T('NOTROOPS'));
		};
	};

	function addAttDefInfoTable() {
		tTable = $xf("//div[@id='troop_village']//table | //div[@id='ltrm']/table | //div[@id='map_details']/table[@id='troops']");
		if (!tTable) return;

		var bS = false;

		if (TB3O.M35 != 2) {
			tDiv = tTable.previousSibling;
			if (tDiv.nodeName != "DIV") tDiv = tDiv.previousSibling;
			if (tDiv.nodeName == "DIV") bS = true;
		} else {
			tDiv = tTable.rows[0].cells[0];
			bS = true;
		};

		if (bS == true) {
			tDiv.innerHTML += " ";
			iImg = $img([['src', image["info"]]]);
			tDiv.appendChild(iImg);
			tDiv.addEventListener("mouseover", showAttDefTooltip(), false);
			tDiv.addEventListener("mouseout",  hideTT, 0);
		};

		function showAttDefTooltip() {
			return function() {
				tadInfo = getTroopsAttDefInfoTable(tTable, false, true);
				adtHTML = "<table class='tb3tbnb' width='100px'>" + tadInfo + "</table>";
				aTooltip = $g("tb_tooltip");
				if (!aTooltip) aTooltip = createTooltip();
				aTooltip.innerHTML = adtHTML;
				aTooltip.style.display = 'block';
			};
		};
	};

	function getTroopsAttDefInfoTable(tNTroops, bMap, bMin) {
		if (!tNTroops) return '';
		tNinfo = [0, 0, 0, 0];
		iHTML = '';
		bInfo = false;
		strMinInfo = '';
		strMinX = '';
		if (!tNTroops.rows) return iHTML;
		for (var i = 0; i < tNTroops.rows.length; i++) {
			aRow = tNTroops.rows[i];
			aImg = aRow.cells[0].firstChild;
			if (aImg.nodeName != 'IMG') aImg = aRow.cells[0].firstChild.firstChild;
			if (aImg && aImg.src) {
				index = getTroopIndexTitleFromImg(aImg)[0];
				if (!isNaN(index) && index > 0) {
					if (bMap) {
						imgHTML = '<img class="' + aImg.className + '" src="' + xGIF + '">';
						if (TB3O.T35 == false) imgHTML = "<img src=" + aRow.childNodes[0].firstChild.src + ">";
						iHTML += "<td style='text-align:" + docDir[0] + ";'>" + imgHTML + "</td><td style='text-align:" + docDir[1] + ";'>" + aRow.cells[1].textContent + "</td></tr>";
					};
					tNo = parseInt(aRow.cells[1].textContent);
					tNinfo[0] += tNo * uc[index][5];
					tNinfo[1] += tNo * uc[index][6];
					tNinfo[2] += tNo * uc[index][7];
					tNinfo[3] += tNo * uc[index][9];
					bInfo = true;
				} else tNinfo[3] += 6; //hero
			} else if (crtPage.indexOf("dorf1.php") != -1) iHTML += "<tr><td>" + aRow.cells[0].textContent + "</td></tr>";
		};
		if (bInfo == true) {
			if (tNinfo[0] != 0 + tNinfo[1] + tNinfo[2] > 0) {
				if (bMap == true) iHTML += "<tr><td>&nbsp;</td></tr>";
				if (bMin == true) {
					strMinInfo = "* = " + T('MIN');
					strMinX = "*";
					iHTML += "<tr><td colspan='2' style='font-weight:bold; text-align:center;'>" + T('STATISTICS') + "</td></tr>";
				};
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIc["att_all"] + strMinX + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + $ls(tNinfo[0]) + "</td></tr>";
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIc["def_i"] + strMinX + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + $ls(tNinfo[1]) + "</td></tr>";
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIc["def_c"] + strMinX + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + $ls(tNinfo[2]) + "</td></tr>";
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIc["r5"] + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + $ls(tNinfo[3]) + "</td></tr>";
				if (bMin == true) iHTML += "<tr><td colspan='2' style='text-align:" + docDir[0] + "; font-size:8pt;'>" + strMinInfo + "</td></tr>";
			};
		};
		return iHTML;
	};

	function addTroopTimes() {
		//append the distance and time for the case the user opened a cell from the map
		if (TB3O.xCrt != -1000 && TB3O.yCrt != -1000 && TB3O.O[57] == "1") {
			lastRowActions = $g('options');
			if (!lastRowActions) {
				idType = '@id';
				if (TB3O.T35 == false) idType = '@class';
				lastRowActions = $xf("//div[" + idType + "='map_details_actions']");
			};
			if (lastRowActions) {
				createTimeTroopTable(lastRowActions, TB3O.xCrt, TB3O.yCrt, true);
				imgOasis = $xf("//img[starts-with(@class, 'w')] | //img[starts-with(@id, 'w')]");
				if (!imgOasis) imgOasis = $g("resfeld");
				if (imgOasis) {
					//we are probably inside an oasis
					if (TB3O.T35 == true) {
						tNTroops = $xf("//div[@id='map_details_troops']//table");
						if (tNTroops) {
							tNTroopsS = tNTroops.childNodes[1];
						} else {
							tNTroops = $xf("//table[@id='troop_info']");
							if (tNTroops) tNTroopsS = tNTroops.childNodes[3];
						};
					} else {
						tNTroops = $xf("//table[@class='f10']");
						if (tNTroops) tNTroopsS = tNTroops.childNodes[0];
					};
					if (tNTroopsS) {
						tNInfo = getTroopsAttDefInfoTable(tNTroopsS, false);
						if (tNInfo != '') {
							if (tNTroops.id && tNTroops.id == 'troop_info') {
								tNTroops.innerHTML += tNInfo;
							} else {
								tNInfoT = $t([['class', 'b'], ['style', 'width:100px; border:0px none white']]);
								tNInfoT.innerHTML = tNInfo;
								aPar = $e("P", "");
								aPar.appendChild(tNInfoT);
								tNTroops.parentNode.appendChild(aPar);
							};
						};
					};
				};
			};
		};
	};

	function showFieldInfoInTooltip(vID, fieldtype, anTb) {
		ttDiv = $g("tb_tooltip");
		if (!ttDiv) ttDiv = createTooltip();
		tDisplay = "none";
		if (fieldtype != 0) {
			//a map cell or a village
			tmTableHTML = "";
			ttHTML = "<table class='tb3tbnb'>";
			if (fieldtype) {
				//there are 12 types of cells
				dist = [[3, 3, 3, 9], [3, 4, 5, 6], [4, 4, 4, 6], [4, 5, 3, 6], [5, 3, 4, 6], [1, 1, 1, 15], [4, 4, 3, 7], [3, 4, 4, 7], [4, 3, 4, 7], [3, 5, 4, 6], [4, 3, 5, 6], [5, 4, 3, 6]];
				info = dist[fieldtype-1];
				ttHTML += "<tr><td colspan='2'>";
				for (var i = 1; i < 5; i++) {ttHTML += gIc["r" + i] + " " + info[i-1] + ' ';};
				ttHTML += "</td></tr><tr><td>&nbsp;</td></tr>";
			};
			if (TB3O.O[57] == "1") tmTableHTML = getTroopMerchantTooltipHTML(vID, "blue", false, true, true);
			tDisplay = "block";
			ttDiv.innerHTML = ttHTML + tmTableHTML + "</table>";
			ttDiv.style.display = tDisplay;
		} else {
			//an oasis
			ttHTML = getTroopsAttDefInfoTable(anTb, true);
			tDisplay = "block";
			if (TB3O.O[57] == "1") ttHTML += "<tr><td>&nbsp;</td></tr>";
			ttHTML = "<table class='tb3tbnb'>" + ttHTML;
			ttHTML += getTroopMerchantTooltipHTML(vID, "blue", false, false, true) + "</table>";
			ttDiv.innerHTML = ttHTML;
			ttDiv.style.display = tDisplay;
		};
	};

	function createMapInfoObjV2(area, pos) {
		var mev = new Object();
		mev.area = area;
		mev.pos = pos;
		mev.timeout = 0;
		var fieldtype;
		mev.mouseOverEvent = function() {
			var strRegExp1 = false;
			var strRegExp2 = false;
			mev.area.removeAttribute("title");
			var crtPos = mev.area.href.match(/d=(\d+)/).pop();
			if (TB3O.T35 == false) {
				mev.pict = $g("i_"+ area.id.substring(2)).src;
				if (mev.pict.match(/\/(d|t)\d*.gif$/)) strRegExp1 = true; else if (mev.pict.match(/\/(o)\d*.gif$/)) strRegExp2 = true;
				//all AJAX requests
				if (TB3O.O[56] == '1')  {
					mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
				} else {
					if (strRegExp1 == true || strRegExp2 == true) showFieldInfoInTooltip(crtPos, null);
				};
			} else {
				if (TB3O.O[56] == '1') {
					if (TB3O.origMap == true) {
						//this is the case where the user just opened the map
						var kx = area.id.substring(2).split("_");
						var origFieldType = unsafeWindow.m_c;
						fieldtype = origFieldType.ad[kx[0]][kx[1]][2];
						if (fieldtype != 0) {
							//this is an empty cell or a village
							showCellInfo(mev.pos + 1, fieldtype);
							showFieldInfoInTooltip(crtPos, fieldtype);
						} else {
							//this is an oasis
							if (mev.area.href != '') mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout != 0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
						};
					} else {
						//we try to use the map_infobox
						mapInfoBox = $g("map_infobox");
						if (mapInfoBox) {
							aRowContent = mapInfoBox.rows[0].textContent;
							if (aRowContent.indexOf(":") != -1 && aRowContent.indexOf("-")) {
								strType = aRowContent.split(": ");
								if (strType.length > 1) {
									fieldtype = showCellInfo(mev.pos + 1, strType[1]);
									showFieldInfoInTooltip(crtPos, fieldtype);
								};
							} else {
								//second alternative - to generate AJAX requests to get the information
								mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
							};
						} else {
							//second alternative - to generate AJAX requests to get the information
							mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
						};
					};
				} else {
					//show only distance and time
					showFieldInfoInTooltip(crtPos, null);
				};
			};
		};
		mev.mouseOutEvent = function() {clearTimeout(mev.timeout); mev.timeout = 0; hideTT(); };
		mev.scan = function() { ajaxRequest(mev.area.href, "GET", null, function(t) {processMapCell(t, mev, null);}, dummy); };
		return mev;
	};

	function showCellInfo(pos, aType) {
		if (typeof(aType) == 'string') {
			if (aType.indexOf("-") != -1) {
				switch(aType) {
					case "3-3-3-9":  aType = 1; break;
					case "3-4-5-6":  aType = 2; break;
					case "4-4-4-6":  aType = 3; break;
					case "4-5-3-6":  aType = 4; break;
					case "5-3-4-6":  aType = 5; break;
					case "1-1-1-15": aType = 6; break;
					case "4-4-3-7":  aType = 7; break;
					case "3-4-4-7":  aType = 8; break;
					case "4-3-4-7":  aType = 9; break;
					case "3-5-4-6":  aType = 10; break;
					case "4-3-5-6":  aType = 11; break;
					case "5-4-3-6":  aType = 12; break;
				};
			};
		};
		mcDiv = $g('map_info_' + pos);
		if (mcDiv) {
			if (aType < 13) {
				itext = ['', '&nbsp;9', gIc["r3"], '&nbsp;6', gIc["r2"], gIc["r1"], '15', '&nbsp;7', '&nbsp;7', '&nbsp;7', gIc["r2"], gIc["r3"], gIc["r1"]];
				if (TB3O.T35 == false) itext = ['', '(9)', gIc["r3"], '(6)', gIc["r2"], gIc["r1"], '(15)', '(7)', '(7)', '(7)', gIc["r2"], gIc["r3"], gIc["r1"]];
				mcDiv.innerHTML = itext[aType];
				if (TB3O.T35 == true) $at(mcDiv, [['style', "position:relative; height:16px; width:20px; " + docDir[0] + ":31px; top:45px; z-index:8000; border:1px solid #00C000; background-color:#FEFFE3; -moz-border-radius:10px;"]]);
			};
		};
		return aType;
	};

	function processMapCell(t, mev, crtPos) {
		var fieldType;
		var ans = $e('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		if (TB3O.T35 == false) {
			aField = $xf("//img[@id='resfeld']", 'f', ans, ansdoc);
			if (aField) aField = aField.src.search(/\/w(\d+)\.jpg$/); else aField = $xf("//img[starts-with(@id, 'w')]", 'f', ans, ansdoc);

			if (aField) {
				//this is an oasis
				if (crtPos) {
					anTb = $xf("//table[@class='f10']", 'f', ans, ansdoc);
					if (anTb) anTb = anTb.childNodes[0]; //we need only the table not the body
					fieldType = 0;
					showFieldInfoInTooltip(crtPos, 0, anTb);
				};
			} else {
				aField = $xf("//div[starts-with(@id, 'f')]", 'f', ans, ansdoc);
				aField.id.search(/f(\d)/);
				fieldtype = RegExp.$1;
				//this is an empty cell or a village
				showCellInfo(mev.pos + 1, fieldtype);
				if (crtPos) showFieldInfoInTooltip(crtPos, fieldtype);
			};
		} else {
			imgID = $xf("//img[starts-with(@id, 'f')] | //img[starts-with(@class, 'f')]", 'f', ans, ansdoc);
			if (imgID) {
				//a cell or village
				fieldTypeC = imgID.getAttribute("class");
				if (!fieldTypeC) fieldType = imgID.getAttribute("alt"); else fieldType = parseInt(fieldTypeC.replace("f", ""));
				fieldtype = showCellInfo(mev.pos + 1, fieldType);
				if (crtPos) showFieldInfoInTooltip(crtPos, fieldtype);
			} else {
				//perhaps an oasis
				if (crtPos) {
					imgID = $xf("//img[starts-with(@id, 'w')] | //img[starts-with(@class, 'w')]", 'f', ans, ansdoc);
					if (imgID) {
						anTb = $xf("//div[@id='map_details_troops']//table", 'f', ans, ansdoc);
						if (anTb) {
							anTb = anTb.childNodes[1]; //we need only the table not the body
						} else {
							anTb = $xf("//table[@id='troop_info']", 'f', ans, ansdoc);
							if (anTb) anTb = anTb.childNodes[3];
						};
						showFieldInfoInTooltip(crtPos, 0, anTb);
						fieldType = 0;
					};
				};
			};
		};
		return fieldType;
	};

	function getRPDefAction() {
		var dRPA = 'def1_1';
		switch (parseInt(TB3O.O[49])) {
			case 1: dRPA = 'att_all_1'; break;
			case 2: dRPA = 'att_all_2'; break;
			default: dRPA = 'def1_1'; break;
		};
		return dRPA;
	};

	function getTroopMerchantTooltipHTML(vID, aColor, addCoords, addMTime, addTTime, boolAllRaces) {
		var iHTML = "";
		xy = id2xy(vID);
		qDist = getDistance(xy[0], xy[1], actV.vx, actV.vy);
		//add the distance row
		if (aColor == undefined) aColor = 'black';
		strDist = '';
		aRow = $r();
		aCell = $c("", [['style', 'font-size:8pt; color:' + aColor + ';text-align:' + docDir[0] + ';']]);
		imgDist = $img([['src', image["dist" + docDir[0].substr(0,1)]]]);
		aCell.appendChild(imgDist);
		aRow.appendChild(aCell);

		if (qDist != 0) {
			strDist = qDist.toFixed(2);
			bCell = $c(strDist, [['style', 'font-size:8pt; color:' + aColor + '; text-align:' + docDir[1] + ';']]);
			aRow.appendChild(bCell);

			strDist = "";
			if (addCoords && addCoords == true) strDist = "(" + actV.vx + "|" + actV.vy + ") " + "<img src= '" + image["dist" + docDir[0].substr(0,1)] + "'>" + " (" + xy[0] + "|" + xy[1] + ")";
			if (strDist != "") {
				c1Cell = $c("&nbsp;&nbsp;");
				intCols = '1';
				if (boolAllRaces == true) intCols = '4';
				cCell = $c(strDist, [['style', 'font-size:8pt; color:' + aColor + "; text-align:" + docDir[1] +";"], ['colspan', intCols]]);
				aRow.appendChild(c1Cell);
				aRow.appendChild(cCell);
			};
			iHTML = "<tr class='tb3rnb'>" + aRow.innerHTML + "</tr>";
		};

		if (strDist != '') strDist = "<td></td>";

		if (TB3O.U[1] != '' && qDist != 0) {
			switch (TB3O.U[1]) {
				case avRace[0]: arrRaces = [avRace[1], avRace[2]]; break;
				case avRace[1]: arrRaces = [avRace[0], avRace[2]]; break;
				case avRace[2]: arrRaces = [avRace[0], avRace[1]]; break;
			};
			aColspan = '';
			aAlign = '';
			if (addTTime == true) {
				aColspan = "colspan='2' ";
				aAlign = "style='text-align:center;' ";
			};
			clockCell = "<td " + aColspan + aAlign + gIc["clock"] + "</td> ";
			if (addTTime == true) {
				//add the clock row
				iHTML += "<tr>" + clockCell;
				clockCell = '';
				if (boolAllRaces == true) iHTML += "<td colspan='6'</td>";
				iHTML += "</tr>";
			};

			if (addMTime == true) {
				//add the merchant row
				aTime = getMTime(qDist, TB3O.U[1]);
				aMalign = docDir[1];
				iHTML += "<tr>" + clockCell + "<td>" + gIc["merchant"] + "</td><td style='font-size:8pt; color:blue; text-align:" + aMalign + "; white-space:nowrap;'>" + formatTime(aTime, 0) + " h</td>" + strDist;
				if (boolAllRaces) {
					aTime = getMTime(qDist, arrRaces[0]);
					iHTML += "<td>" + gIc["merchant"] + "</td><td style='font-size:8pt; color:blue; text-align:" + aMalign + "; white-space:nowrap;'>" + formatTime(aTime, 0) + " h</td><td></td>";
					aTime = getMTime(qDist, arrRaces[1]);
					iHTML += "<td>" + gIc["merchant"] + "</td><td style='font-size:8pt; color:blue; text-align: " + aMalign +"; white-space:nowrap;'>" + formatTime(aTime, 0) + " h</td>";
				};
				iHTML += "</tr>";
			};
			if (addTTime == true) {
				//add the troop rows
				var arX = getTroopsDetails(qDist, TB3O.U[1], false);
				var arY = getTroopsDetails(qDist, arrRaces[0], true);
				var arZ = getTroopsDetails(qDist, arrRaces[1], true);
				for (var iTT = 0; iTT < 10; iTT++) {
					imgNo = iTT + arX[3];
					imgName = "src='" + gIc["u" + imgNo] + "'";
					if (TB3O.T35 != false) imgName = 'class="unit u' + imgNo + '" src="' + xGIF + '"';
					aTime = getTTime(iTT, TB3O.U[1], arX);
					iHTML += "<tr><td><img " + imgName + "></td><td style='font-size:8pt; text-align:" + docDir[1] + "; white-space:nowrap;'>" + "&nbsp;" + formatTime(aTime, 0) + " h</td>" + strDist;
					if (boolAllRaces) {
						imgNo = iTT + arY[3];
						imgName = "src='" + gIc["u" + imgNo] + "'";
						if (TB3O.T35 != false) imgName = 'class="unit u' + imgNo + '" src="' + xGIF + '"';
						aTime = getTTime(iTT, arrRaces[0], arY);
						iHTML += "<td ><img " + imgName + "></td><td style='font-size:8pt; text-align:" + docDir[1] +"; white-space:nowrap;'>" + "&nbsp;" + formatTime(aTime, 0) + " h</td><td>&nbsp;&nbsp;&nbsp</td>";
						imgNo = iTT + arZ[3];
						imgName = "src='" + gIc["u" + imgNo] + "'";
						if (TB3O.T35 != false) imgName = 'class="unit u' + imgNo + '" src="' + xGIF + '"';
						aTime = getTTime(iTT, arrRaces[1], arZ);
						iHTML += "<td><img " + imgName + "></td><td style='font-size:8pt; text-align:" + docDir[1] + "; white-space:nowrap;'>" + "&nbsp;" + formatTime(aTime, 0) + " h</td>";
					};
					iHTML += "</tr>";
				};
			};
		};
		return iHTML;
	};

	//update tooltip position
	function updateTooltip(e){
		var ttD = $g("tb_tooltip");
		var x = (e.pageX + 8);
		var y = (e.pageY + 8);
		var dH = ttD.clientHeight;
		var dW = ttD.clientWidth;
		ttD.style.left = x + "px";
		if (y + dH > TB3O.wH) y = y - dH;
		if (crtPage.match(/karte.php/) != -1 && y < 180) {
			x = 700;
			if (y < 180) y = 180;
		}
		ttD.style.top = y + "px";
		if (docDir[0] == 'left') {
			if (x + dW > TB3O.wW) x = x - dW;
		} else if (x < 0) x = 5;
		ttD.style.left = x + "px";
	};

	// Map functions
	function mapFunctions() {
		aTimeOut = getRndTime(1800);
		allArrows = $xf("//area[starts-with(@id, 'ma_n')]", 'l');
		for (var xi = 0; xi < allArrows.snapshotLength; xi++) {
			if (TB3O.origMap == true) allArrows.snapshotItem(xi).addEventListener('click', reloadMapFunctions, false);
		};

		if (!$g("tb_tooltip")) createTooltip();
		mapcontent = $g('map_content');
		areas = $xf("//map//area[@shape='poly' and (@coords)]", 'l', mapcontent);

		//the village/player/oasis table needs a delay because maps are loaded via AJAX requests
		setTimeout(genMapTable, aTimeOut);
		//recompute the title of the browser because of clicking the arrows
		setTimeout(getCrtLocation, aTimeOut);
		addMapScanLink();
		document.addEventListener("mousemove", updateTooltip, 0);
		installMapEventHandler();

		function installMapEventHandler() {
			for (var i = 1; i < 50; i++) {
				var k1 = (i - 1) % 7;
				var k2 = Math.floor((49 - i) / 7);
				var area = $g("a_" + k1 + "_" + k2);
				var mevobj = createMapInfoObjV2(area, i - 1);
				if (TB3O.origMap == true) {
					area.addEventListener("mouseover", mevobj.mouseOverEvent, false);
					area.addEventListener("mouseout",  mevobj.mouseOutEvent, false);
				};
			};
		};

		//the functions needed for the map
		function mapScan() {
			j = 0;
			for (var i = 1; i < 50; i++) {
				if ($g('map_info_' + i).innerHTML == '') {
					k1 = (i - 1) % 7;
					k2 = Math.floor((49-i)/7);
					if ($g("i_" + k1 + "_" + k2).src.match(/\/(d|t)\d*.gif$/)) {
						area = $g("a_" + k1 + "_" + k2);
						mevobj = createMapInfoObjV2(area, i-1);
						setTimeout(mevobj.scan, j * 600 + getRndTime(600));
						j++;
					};
				};
			};
		};

		function addMapScanLink() {
			removeElement($g('map_opts'));
			if (TB3O.O[56] == '1' && TB3O.T35 == false) {
				//create the "Scan the Map" link
				b = $xf("//form[@method='post']").parentNode;
				ctable = $t([["id", "map_opts"]]);
				ctbody = $e("TBODY");
				mapScanA = $a(T('MAPSCAN'), [['id', 'mapscan'], ['href', jsVoid]]);
				mapScanA.addEventListener("click", mapScan, 0);
				trc = $r();
				tdc = $c("", [["colspan", '2']]);
				tdc.appendChild(mapScanA);
				trc.appendChild(tdc);
				ctbody.appendChild(trc);
				ctable.appendChild(ctbody);
				b.appendChild(ctable);
			};
		};

		//generate the table on the "karte.php" page
		function genMapTable(){
			if (areas.snapshotLength > 0 && TB3O.O[56] == '1') genMapCellInfoDivs();
			//select the correct images and link titles for the reinf/attack icons

			if (TB3O.O[58] != '1') return;
			var dRPA = getRPDefAction();
			removeElement($g('mapTable'));
			var aTb = $t([['id', 'mapTable'], ['sortCol', -1]]);
			var thead = $e("THEAD");
			var tbody = $e("TBODY");
			var aRow = $r();
			var cL = ['PLAYER', '8', 'ALDEAS', 'POPULATION', 'COORDS', 'MAPTBACTS'];
			var aTd;
			for (var i = 0; i < cL.length; i++){
				if (i < 4) {
					aTd = $c(T(cL[i]) + " (<img src='" + image["arrowdown"] + "' width='8' style='cursor:pointer;'><img src='" + image["arrowup"] + "' width='8' style='cursor:pointer'>)", [['title', T('CLICKSORT')], ['class', 'tb3mthcp']]);
					switch(i){
						case 3:	aTd.addEventListener("click", sortTable('mapTable', i, 'int'), 0);	break;
						default: aTd.addEventListener("click", sortTable('mapTable', i), 0);
					};
				} else aTd = $c(T(cL[i]), [['class', 'tb3mthc']]);
				aRow.appendChild(aTd);
			};
			thead.appendChild(aRow);
			aTb.appendChild(thead);
			var boolMapTable = false;
			var anArea;
			var aClass;
			for (var i = 0; i < 7; i++) {
				for (var j = 0; j < 7; j++) {
					anArea = $g('a_' + i + '_' + j).wrappedJSObject;
					var cInfo = anArea.details;
					if (cInfo && cInfo.name) {
						boolMapTable = true;
						var iRow = $r();
						var aName = cInfo.name;
						var vID = xy2id(cInfo.x, cInfo.y);
						aClass = 'tb3mtc';
						if (aName == TB3O.U[0]) aClass = 'tb3mtcu';
						iRow.appendChild($c(aName, [['class', aClass]]));
						iRow.appendChild($c(cInfo.ally, [['class', 'tb3mtc']]));
						if (TB3O.T35 == false) aHref = anArea.href; else aHref = "karte.php?" + cInfo.querystring;
						iRow.appendChild($c('<a href="' + aHref + '">' + cInfo.dname + '</a>', [['class', 'tb3mtc']]));
						iRow.appendChild($c(cInfo.ew, [['class', 'tb3mtcp']]));
						iRow.appendChild($c('<a href="' + aHref + '">' + cInfo.x + " | " + cInfo.y + '</a>', [['class', 'tb3mtc']]));
						iRow.appendChild($c('<a href="a2b.php?z=' + vID + '">' + gIc[dRPA] + '</a>' + '  ' + '<a href="build.php?z=' + vID + '&gid=17">' + gIc["r41"] + '</a>', [['class', 'tb3mtc']]));
						tbody.appendChild(iRow);
					};
				};
			};
			aTb.appendChild(tbody);
			if (boolMapTable == true)  {
				var middleblock = $g(dmid);
				aTb.style.top = deltaTopY(aTb) + 'px';
				middleblock.appendChild(aTb);
			};
		};

		function genMapCellInfoDivs() {
			var mapinfoX = $g("map_info");
			if (mapinfoX) {
				//remove the big DIV
				removeElement(mapinfoX);
			} else {
				//remove all the small DIVs
				for (var i = 1; i < 50; i++) {removeElement($g('map_info_' + i));};
			};
			if (TB3O.T35 == false) {var mapinfo = $d("", [['id', 'map_info']]);};

			for(var i = 1; i < 50; i++){
				if (TB3O.T35 == false) {
					var divsX = $d("", [['id', 'map_info_' + i], ['class', 'mt' + i], ['style', 'position:relative; left:31px; top:54px; z-index:90; border:1px solid #00C000; background-color:#FFFFCC; -moz-border-radius:10px;']]);
					var divs = $d("", [['class', 'mt' + i], ['style', 'z-index:2;']]);
					divs.appendChild(divsX);
					mapinfo.appendChild(divs);
				} else {
					var divs = $d("", [['id', 'map_info_' + i], ['style', 'position:relative; height:1px; width:1px; ' + docDir[0] +':31px; top:45px; z-index:90; border:1px solid #00C000; background-color:#FFFFCC; -moz-border-radius:10px']]);
					var k1 = (i - 1) % 7;
					var k2 = Math.floor((49-i)/7);
					var mapCell = $g("i_" + k1 + "_" + k2);
					mapCell.appendChild(divs);
				};
			};
			if (TB3O.T35 == false) {
				var iniCell = $g("a_0_6");
				if (iniCell) iniCell.parentNode.appendChild(mapinfo);
			};
		};
	};

	function marketSell(){
		//global/local option provided by Zippo.
		marketSellMinMax();
		if (!$xf("//input[@type='hidden' and @name='t' and @value='2']")) return;
		$xf("//form").setAttribute("name", "sell");
		var aX = $xf("//input[@type='image' and @name='s1']");
		aX.addEventListener("click", function(){
			var soff = $g('saveofferoption');
			var soffG = $g('saveofferglobal');
			var bSOf = true;
			var bSOfG = true;
			if (soff && soff.checked == false) bSOf = false;
			if (soffG && soffG.checked == false) bSOfG = false;
			if (bSOf == true) {
				param = ["m1", "m2", "rid1", "rid2", "d2"];
				checks = ["d1", "ally"];
				values = new Array();
				for (var i = 0; i < param.length; i++) eval("values[" + i + "] = $xf(\"//*[@name='" + param[i] + "']\").value");
				for (var i = 0; i < checks.length; i++){
					try {
						eval("var b = $xf(\"//*[@name='" + checks[i] + "']\").checked");
						if (b == true) values[i + param.length] = '1'; else values[i + param.length] = '0';
					} catch(e) {};
				};
				if (bSOfG == false) values[7] = actV.vID;
				addGMcookieValue("ventas", values, false);
			}
		}, 0);

		//get offers string
		strOffers = getGMcookie("ventas", false);
		if (strOffers == "false") {
			setGMcookie("ventas", '', false);
			strOffers = '';
		};

		ventas = new Array();
		if (strOffers != ''){
			strOffers = strOffers.split("$$");
			j = 0;
			for (var i = 0; i < strOffers.length; i++) {
				strVillage = strOffers[i].split("$")[7];
				if (strVillage == actV.vID || strVillage == undefined ) {
					ventas[j] = strOffers[i].split("$");
					ventas[j][8] = i;
					j++;
				};
			};
		};

		if (ventas.length > 0){
			var aTb = $t([["id", "soff"]]);
			var aR = $r();
			var arH = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('8'), T('SELL'), T('ELIMINAR')];
			for (var i = 0; i < arH.length; i++) aR.appendChild($c(arH[i], [['class', 'soffhh']]));
			aTb.appendChild(aR);
			var bR, aC;
			for (var i = 0; i < ventas.length; i++){
				bR = $r();
				bR.appendChild($c(gIc["r" + (ventas[i][2])] + ' ' + ventas[i][0]));
				bR.appendChild($c(gIc["r" + (ventas[i][3])] + ' ' + ventas[i][1]));
				bR.appendChild($c(ventas[i][5] == '1' ? ventas[i][4] : T('NO'), [['class', 'soffc']]));
				bR.appendChild($c(ventas[i][6] == '1' ? T('YES') : T('NO'), [['class', 'soffc']]));
				var sally = '';
				if ($xf("//*[@name='ally']")) sally = '; sell.ally.checked=' + (ventas[i][6] == '1');
				bR.appendChild($c('<a href=' + jsVoid + ' onClick = "sell.m1.value=' + ventas[i][0] + '; sell.m2.value=' + ventas[i][1] + '; sell.rid1.value=' + ventas[i][2] + '; sell.rid2.value=' + ventas[i][3] + '; sell.d2.value=' + ventas[i][4] + '; sell.d1.checked=' + (ventas[i][5] == '1') + sally + '; sell.submit();"><img src="' + image["btnOK"] + '" title="' + T('SELL') + '" alt="' + T('SELL') + '"></a>', [['class', 'soffc']]));

				aL = $a(gIc["del"], [['href', jsVoid]]);
				aL.addEventListener("click", removeGMcookieValue("ventas", ventas[i][8] , true, marketSell, false), 0);
				aC = $c("", [['class', 'soffc']]);
				aC.appendChild(aL);
				bR.appendChild(aC);
				aTb.appendChild(bR);
			};
			
			aPar = $e("P", "");
			aPar.appendChild(aTb);
			insertAfter(aX, aPar);
		};
	};

	function getdorf3SelectedVinfo(ansdoc, ans) {
		// newdid of the village
		vID = 0;
		retValue = [-1000, -1000];
		try {
			if (TB3O.T35 == false) {
				avLink = $xf("//a[@class='active_vl']", 'f', ans, ansdoc);
				newdid = getNewdidFromLink(avLink.href);
				aX = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td', 'f', ans, ansdoc);
				if (aX) {
					X = parseInt(aX.innerHTML.replace("(", ""));
					aY = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', ans, ansdoc);
					if (aY) {
						Y = parseInt(aY.innerHTML.replace(")", ""));
						vID = xy2id(X, Y);
					};
				};
			} else {
				if (TB3O.M35 == 2) {
					aV = $xf("//td[@class='dot hl']", 'f', ans, ansdoc);
					var tr = aV.parentNode;
					if (tr.cells.length > 3) {
						vx = tr.cells[2].textContent.replace("(", "");
						vy = tr.cells[4].textContent.replace(")", "");				
						newdid = getNewdidFromLink(tr.cells[1].firstChild.href);
					} else {
						var tmpC = tr.cells[2].textContent.replace("(", "").replace(")", "").split("|");
						vx = parseInt(tmpC[0]);
						vy = parseInt(tmpC[1]);
						newdid = getNewdidFromLink(tr.cells[1].firstChild.href);
					};
				} else if (TB3O.M35 == 1) {
					aV = $xf("//div[@id='vlist']//table[@class='vlist']//tr[@class='sel']//a", 'f', ans, ansdoc);
					vx = aV.parentNode.parentNode.cells[2].textContent.replace("(", "");
					vy = aV.parentNode.parentNode.cells[4].textContent.replace(")", "");
					newdid = getNewdidFromLink(aV.href);
				};
				vID = xy2id(vx, vy);
			};
		} catch(e) {
			newdid = actV.vNewdid;
			vID = actV.vID;
		};
		retValue[0] = vID;
		retValue[1] = newdid;
		return retValue;
	};

	function processVillage11(){
		var cBiP = getGMcookieV2("BiP");
		var cTM = getGMcookieV2("TroopMovements");
		var arrBiP = null;
		var arrTM = null;

		var crtDate = new Date();
		var crtTime = crtDate.getTime();

		for (var i = 0; i < vList.length; i++) {
			var vNewdid = vList[i].vNewdid;
			if (cBiP && cBiP[vNewdid] != undefined) arrBiP = cBiP[vNewdid]; else arrBiP = null;
			if (cTM && cTM[vNewdid] != undefined) arrTM = cTM[vNewdid]; else arrTM = null;
			var aCell = $xf("//td[@id='aldea" + vNewdid + "_1_3" + "']");
			if (arrBiP != null) {
				var b = new Array();
				b[0] = '-';
				var xi = 0;
				for (var j = 0; j < arrBiP.length; j++) {
					var bipT = arrBiP[j].endTime;
					if (bipT > crtTime) {
						b[xi] = "<img src='" + gIc["bau"] +  "' title='" + arrBiP[j].name + " " +arrBiP[j].txtLvl + " - " + formatTime((bipT - crtTime) / 1000, 0) + "'>";
						xi += 1;
					};
				};
				aCell.innerHTML = b.join(" ");
			} else aCell.innerHTML = '-';
			var aCell = $xf("//td[@id='aldea" + vNewdid + "_1_2" + "']");
			if (arrTM != null) {
				var c = new Array();
				c[0] = '-';
				var yi = 0;
				for (var j = 0; j < arrTM.length; j++) {
					var atT = arrTM[j].fT;
					if (atT > crtTime) {
						var xImg;
						if (TB3O.T35 == false) xImg = '<img src="' + img("a/" + arrTM[j].type) + '" height="12px" width= "12px">'; else xImg = gIc[arrTM[j].type];
						c[yi] = '<a href="build.php?newdid=' + vNewdid + '&gid=16" title="' + arrTM[j].no + ' - ' + formatTime((atT - crtTime) / 1000, 0) + '">' + xImg + "</a>";
						yi += 1;
					};
				};
				aCell.innerHTML = c.join(" ");
			} else aCell.innerHTML = '-';
		};
	};

	function processVillage119(t) {
		var ans = $d(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var newdid = getdorf3SelectedVinfo(ansdoc, ans)[1];

		//Baracks,Big barracks,Stable,BigStable,Workshop,Residence/Palace troops training
		var a = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='5%']", 'f', ans, ansdoc);
		if (a){
			var aCell = $xf("//td[@id='aldea" + newdid + "_1_4" + "']");
			var aTb = a.parentNode.parentNode;
			//var troopTraining = getTroopTrainingArray(aTb); needs rework

			var iHTML = aCell.innerHTML;
			if (iHTML == "-") iHTML = "";
			var gid = "false";
			for (var xi = 0; xi < troopTraining.length; xi++) {
				if (troopTraining[xi][0] > 0) {
					imgNo = xi + TB3O.U[7];
					imgName = "src='" + gIc["u" + imgNo] + "'";
					if (TB3O.T35 != false) imgName = 'class="unit u' + imgNo + '" src="' + xGIF + '"';
					if (gid != "" && gid != "false") {
						iHTML += "<a href='build.php?newdid=" + newdid + "&gid=" + gid + "'><img " + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					} else {
						iHTML += "<img " + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					};
				};
			};
			aCell.innerHTML = iHTML;
		};
	};

	function processVillage2() {
		//Resources
		var tPpH = [0, 0, 0, 0, 0];
		var tPpHc = 0;
		var bgC = 'white';
		var txC = 'black';
		var pr = 0;

		for (var i = 0; i < vList.length; i++) {
			if (TB3O.VillageRes[vList[i].vID]) {
				for (var yi = 6; yi < 10; yi++) {
					var iX = TB3O.VillageRes[vList[i].vID][yi];
					tPpH[yi - 6] += iX;
					var aCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_2_" + (yi - 4) + "']");
					if (aCell) {
						aCell.innerHTML = $ls(iX);
						//background color reintroduced by suggestion of PRO$TI
						pr = Math.ceil(iX / TB3O.VillageRes[vList[i].vID][yi + 4] * 100);
						bgC = getColorResBarTooltip(pr);
						txC = ((pr > 60 && pr < 90) ? 'black' : 'white');
						$at(aCell, [['style', 'background-color:' + bgC + '; font-size:8pt; text-align:' + docDir[1] + '; color:' + txC + '; ']]);
					};
				};
				tPpHc += TB3O.VillageRes[vList[i].vID][4];
				var bCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_2_6" + "']");
				var aVal = TB3O.VillageRes[vList[i].vID][4];
				bCell.innerHTML = $ls(aVal);
				var strColor = "black";
				if (aVal < 0) strColor = "red";
				$at(bCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + '; color:' + strColor + ' !important;']]);
			};
		};

		for (var i = 0; i < 4; i++) {
			var aCell = $xf("//td[@id='aldea_s_2_" + (i + 2) + "']");
			aCell.innerHTML = $ls(tPpH[i]);
			$at(aCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]);
		};
		var sCell = $xf("//td[@id='aldea_s_2_6" + "']");
		sCell.innerHTML = $ls(tPpHc);
		$at(sCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]);
	};

	function processVillage3() {
		//Resources
		for (var i = 0; i < vList.length; i++) {
			var ttFillG;
			var ttFillW = Infinity;
			var ttTemp;
			if (TB3O.VillageRes[vList[i].vID]) {
				for (var yi = 6; yi < 10; yi++) {
					var cellNo = yi - 4;
					if (yi == 9) {
						cellNo = 6;
						var cropPerSec = TB3O.VillageRes[vList[i].vID][4] / 3600;
						if (cropPerSec > 0 ) {
							ttFillG = (TB3O.VillageRes[vList[i].vID][yi + 4] - TB3O.VillageRes[vList[i].vID][yi]) / (cropPerSec);
						} else {
							ttFillG = - (TB3O.VillageRes[vList[i].vID][yi] / cropPerSec);
						};
					} else {
						var ppS = TB3O.VillageRes[vList[i].vID][yi - 5] / 3600;
						ttTemp = (TB3O.VillageRes[vList[i].vID][yi + 4] - TB3O.VillageRes[vList[i].vID][yi]) / (ppS);
						if (ttTemp < ttFillW) ttFillW = ttTemp;
					};
					var aCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_3_" + cellNo + "']");
					aCell.innerHTML = Math.round((TB3O.VillageRes[vList[i].vID][yi] / TB3O.VillageRes[vList[i].vID][yi + 4]) * 100) + " %";
					$at(aCell, [['style', 'font-size:10pt; text-align:' + docDir[1] + ';']]);
				};
				//time to empty/fill the warehouse
				var bCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_3_5" + "']");
				bCell.innerHTML = formatTime(ttFillW, 0);
				if (ttFillW < 7200) $at(bCell, [['style', 'color:red']]);
				$at(bCell, [['id', 'timeouta']]);
				//time to empty/fill granary
				var cCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_3_7" + "']");
				cCell.innerHTML = formatTime(ttFillG, 0);
				if (ttFillG < 7200 || cropPerSec < 0) $at(cCell, [['style', 'color:red']]);
				$at(cCell, [['id', 'timeouta']]);
			};
		};
	};

	function processVillage42(t){

		var ans = $d(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var newdid = getdorf3SelectedVinfo(ansdoc, ans)[1];

		//var a = ansdoc.evaluate("//div[@id='" + dmid2 + "']//b", ans, null, XPList, null);
		var a = $xf("//div[@id='" + dmid2 + "']//b", 'l', ans, ansdoc);
		var cpi = 0;
		var cpt = 0;
		if (a && a.snapshotLength > 0) {
			var intAdd = (TB3O.T35 == false ? 1 : 0);
			cpi = a.snapshotItem(intAdd).textContent;
			cpt = a.snapshotItem(intAdd + 1).textContent;
		};

		var aCell = $xf("//td[@id='aldea" + newdid + "_4_2" + "']");
		aCell.innerHTML = cpi;

		aCell = $xf("//td[@id='aldea_s_4_2']");
		aCell.innerHTML = cpt;

		updD3Bullets(newdid, 2);
		//$xf("//span[@class='c2']").removeAttribute("class");
		//$xf("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]").parentNode.firstChild.className = 'c2';
	};

	//function provided by MarioCheng for checking the Townhall and the parties thrown.
	function processVillage43(t){

		var ans = $d(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var newdid = getdorf3SelectedVinfo(ansdoc, ans)[1];
		log(3, "processVillage44: newdid = " + newdid);
		var lvl = 0;
		var bTitle = $xf("//div[@id='" + dmid2 + "']//h1", 'f', ans, ansdoc);
		if (bTitle) {
			var aLvl = bTitle.textContent.split(" ");
			for (i = 0; i < aLvl.length; i++) {
				if (!isNaN(parseInt(aLvl[i]))) lvl = parseInt(aLvl[i]);
			};
		};

		var aCell = $xf("//td[@id='aldea" + newdid + "_4_3" + "']");
		var showLvl = "Lvl " + lvl;
		var partyTime = "";

		var a = $xf("//td[@width='25%']//span[@id='timer1'] | //table[@class='under_progress']//span[@id='timer1']", 'f', ans, ansdoc);
		if (a) {
			partyTime = a.textContent;
			aCell.innerHTML = "<span id='timeouta' title='" + showLvl + "'>" + partyTime + "</span>";
			aCell.innerHTML = "<a id='timeouta' title = '" + showLvl + "' href='build.php?newdid=" + newdid + "&gid=24'>" + partyTime + "</a>";
		} else {
			if (lvl > 0) {
				partyTime = "•";
				aCell.innerHTML = "<a href='build.php?newdid=" + newdid + "&gid=24' title='" + showLvl + "'>" + partyTime + "</a>";
			};
		};
		updD3Bullets(newdid, 2);
		//$xf("//span[@class='c2']").removeAttribute("class");
		//$xf("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]").parentNode.firstChild.className = 'c2';
	};

	function processVillage44(t) {
		//get available senators/chiefs/settlers
		var ans = $d(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var vInfo = getdorf3SelectedVinfo(ansdoc, ans);
		var villageID = vInfo[0];
		var newdid = vInfo[1];
		log(3, "processVillage44: newdid = " + newdid);

		if (villageID != 0) {
			//var allTables = ansdoc.evaluate("//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + villageID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16']", ans, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='troop_details']//a[contains(@href, " + villageID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r', ans, ansdoc);
			if (allTables) {
				var aCell = $g('aldea' + newdid + '_4_4');
				aCell.innerHTML = "";
				var aValue;
				//loop through all table of troops
				for (i = 0; i < allTables.snapshotLength; i++) {
					var aTb = allTables.snapshotItem(i);
					if (aTb.nodeName == "P") break;
					var allTroopCells = aTb.rows[2].cells;
					aValue = toNumber(allTroopCells[9].innerHTML);
					if (aValue != 0) {
						//senators, chiefs, etc.
						for (var xi = 1; xi < aValue + 1; xi++) {
							var aImg = aTb.rows[1].cells[9].firstChild;
							var dImg = aImg.cloneNode(true);
							//dImg.setAttribute("class", 'unit');
							//dImg.setAttribute('border', '0');
							aCell.appendChild(dImg);
							aCell.innerHTML += " ";
						};
					};
					aValue = toNumber(allTroopCells[10].innerHTML);
					if (aValue != 0) {
						//settlers
						for (var xi = 1; xi < aValue + 1; xi++) {
							var aImg = aTb.rows[1].cells[10].firstChild;
							var dImg = aImg.cloneNode(true);
							//dImg.setAttribute("class", 'unit');
							//dImg.setAttribute('border', '0');
							aCell.appendChild(dImg);
							aCell.innerHTML += " ";
						};
					};
				};
				if (aCell.innerHTML == "") aCell.innerHTML = "-";
			};
		};
		updD3Bullets(newdid, 2);
		//$xf("//span[@class='c2']").removeAttribute("class");
		//$xf("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]").parentNode.firstChild.className = 'c2';
	};

	function processVillage45(t){
		var ans = $d(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var newdid = getdorf3SelectedVinfo(ansdoc, ans)[1];
		log(3, "processVillage45: newdid = " + newdid);
		var lvl = 0;
		var maxSlots = 0;
		var bTitle = $xf("//div[@id='" + dmid2 + "']//h1", 'f', ans, ansdoc);
		if (bTitle) {
			var aLvl = bTitle.textContent.split(" ");
			lvl = parseInt(aLvl[aLvl.length - 1]);
		};
		var cpbuilding = 0;
		var ocSlots = 0;
		if (lvl != 0) {
			var spBcookie = getGMcookieV2("specBuildings");
			if (spBcookie && spBcookie[newdid]) cpbuilding = spBcookie[newdid][0];
			//cpbuilding = TB3O.d2spB[0];
		};

		var maxSlots = 0;
		maxSlots = (cpbuilding == 26)?((lvl==20)?3:(lvl>=15)?2:(lvl>=10)?1:0):(lvl==20)?2:(lvl>=10)?1:0;

		var expTable = $xf("//div[@id='" + dmid2 + "']//table[@id='expansion'] | //div[@id='" + dmid2 + "']//table[@class='tbg']", 'f', ans, ansdoc);
		if (expTable) {
			var intRows = expTable.rows.length;
			var lrtd = expTable.rows[intRows-1].cells[0];
			var aColspan;
			ocSlots = intRows - 2;
			if (lrtd) aColspan = lrtd.getAttribute("colspan");
			if (aColspan) ocSlots = ocSlots - 1;
		};

		var slots = "" + ocSlots + "/" + maxSlots;

		var aCell = $xf("//td[@id='aldea" + newdid + "_4_5" + "']");
		var oldSlots = aCell.innerHTML;
		if (oldSlots != "-") oldSlots = oldSlots.split("/"); else oldSlots = ["0", "0"];

		aCell.innerHTML = slots;
		var sumCell = $xf("//td[@id='aldea_s_4_5']");
		if (sumCell) {
			var sumCellValue = sumCell.innerHTML.replace(",", "").replace(".", "").replace(" ", "").replace("&nbsp;", "");
			if (sumCellValue == "-") {
				sumCell.innerHTML = slots;
			} else {
				sumCell.innerHTML = (parseInt(sumCellValue.split("/")[0]) + ocSlots - parseInt(oldSlots[0])) + "/" + (parseInt(sumCellValue.split("/")[1]) + maxSlots - parseInt(oldSlots[1]));
			};
		};

		updD3Bullets(newdid, 2);
		//$xf("//span[@class='c2']").removeAttribute("class");
		//$xf("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]").parentNode.firstChild.className = 'c2';
	};

	function processVillage5() {
		//Available troops
		var infoX = getGMcookieV2("Troops");
		var arrTT;
		var sumTT = [0,0,0,0,0,0,0,0,0,0,0];

		for (var i = 0; i < vList.length; i++) {
			var vNewdid = vList[i].vNewdid;
			if (infoX && infoX[vNewdid] != undefined) arrTT = infoX[vNewdid]; else arrTT = null;
			if (arrTT) {
				for (var j = 0; j < arrTT.length; j++) {
					var aCell = $xf("//td[@id='aldea" + vNewdid + "_5_" + (j + 2) + "']");
					if (arrTT[j] != 0) {
						aCell.innerHTML = arrTT[j];
						$at(aCell, [['style', 'font-size:8pt; color:black; text-align:center;']]);
					} else {
						aCell.innerHTML = "-";
						$at(aCell, [['style', 'color:lightgrey; text-align:center;']]);
					};
					sumTT[j] += arrTT[j];
				};
			};
		};
		//sum of the troops
		for (var i = 2; i < 13; i++) {
			var aCell = $xf("//td[@id='aldea_s_5_" + i + "']");
			if (sumTT[i - 2] != 0) {
				aCell.innerHTML = sumTT[i - 2];
				$at(aCell, [['style', 'font-size:8pt; color:black; text-align:center;']]);
			} else {
				aCell.innerHTML = "-";
				$at(aCell, [['style', 'color:lightgrey; text-align:center;']]);
			};
		};
	};


	function refreshVillageV2(newdid, xi){
		return function(){
			updD3Bullets(newdid, 3);
			var specBcookie = getGMcookieV2("specBuildings");
			var d3specBuildings;
			if (specBcookie && specBcookie[newdid]) d3specBuildings = specBcookie[newdid];
			if (xi == 1) {
				//buildings and attacks in progress
				//fix provided by MarioCheng
				var aCell = $xf("//td[@id='aldea" + newdid + "_1_4" + "']");
				aCell.innerHTML = "-";
				//end fix provided by MarioCheng
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage11, updD3Bullets(newdid, 4));

				var updTroopsTraining = $g("d3Upd_1_3");
				var boolUpdTroopsTraining = false;
				if (updTroopsTraining) boolUpdTroopsTraining = updTroopsTraining.checked;

				if (boolUpdTroopsTraining) {
					//troops in training in the barracks
					var isAvailableBarracks = d3specBuildings[1];
					if (isAvailableBarracks != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + isAvailableBarracks;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					};
					//troops in training in the big barracks
					var isAvailableBigBarracks = d3specBuildings[2];
					if (isAvailableBigBarracks != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + isAvailableBigBarracks;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					};
					//troops in training in the stable
					var isAvailableStable = d3specBuildings[4];
					if (isAvailableStable != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableStable;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					};
					//troops in training in the big stable
					var isAvailableBigStable = d3specBuildings[5];
					if (isAvailableBigStable != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + isAvailableBigStable;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					};
					//troops in training in the workshop
					var isAvailableWorkshop = d3specBuildings[3];
					if (isAvailableWorkshop != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableWorkshop;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					};
					//troops in training in the residence/palace
					var cpbuilding = d3specBuildings[0];
					if (cpbuilding != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + cpbuilding;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					};
				};
				//cannot get the correct request and table as no residence/palace level 10 available in test accounts
			} else if (xi == 2) {
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage2, updD3Bullets(newdid, 4));
			} else if (xi == 3) {
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage3, updD3Bullets(newdid, 4));
			} else if (xi == 4) {
				var cpbuilding = d3specBuildings[0];
				if (cpbuilding != 0) {

					var updPCperDay = $g("d3Upd_4_2");
					var boolupdPCperDay = false;
					if (updPCperDay) boolupdPCperDay = updPCperDay.checked;

					var updSlots = $g("d3Upd_4_5");
					var boolupdSlots = false;
					if (updSlots) boolupdSlots = updSlots.checked;

					var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + cpbuilding;
					if (boolupdPCperDay == true) {
						var pgAjaxRequest2 = pgAjaxRequest + "&s=2";
						ajaxRequest(pgAjaxRequest2, "GET", null, processVillage42, updD3Bullets(newdid, 4));
					};
					if (boolupdSlots == true) {
						var pgAjaxRequest5 = pgAjaxRequest + "&s=4";
						ajaxRequest(pgAjaxRequest5, "GET", null, processVillage45, updD3Bullets(newdid, 4));
					};
				} else {
					updD3Bullets(newdid, 5);
					var aCell = $xf("//td[@id='aldea" + newdid + "_4_5" + "']");
					aCell.innerHTML = "0/0";
				};

				//parties thrown in the village
				updParty = $g("d3Upd_4_3");
				boolupdParty = false;
				if (updParty) boolupdParty = updParty.checked;

				if (boolupdParty == true) {
					if (d3specBuildings[7] != 0) {
						pgAjaxRequestParty = "build.php?newdid=" + newdid + "&gid=24";
						ajaxRequest(pgAjaxRequestParty, "GET", null, processVillage43, updD3Bullets(newdid, 4));
					};
				};

				updSenSettlers = $g("d3Upd_4_4");
				boolupdSenSettlers = false;
				if (updSenSettlers) boolupdSenSettlers = updSenSettlers.checked;

				if (boolupdSenSettlers == true) {
					//available senators/chiefs/settlers
					ajaxRequest("build.php?newdid=" + newdid + "&gid=16&j&k", "GET", null, processVillage44, updD3Bullets(newdid, 4));
				};

			} else if (xi == 5) {
				//added "&j&k" as suggested by MarioCheng.
				ajaxRequest("build.php?newdid=" + newdid + "&gid=16&j&k", "GET", null, processVillage5, updD3Bullets(newdid, 4));
			};
		};
	};

	function removeDorf3Table() {removeElement($g("dorf3table"));};

	function createDorf35Table(newPar, topRowText, secRowText) {
		removeDorf3Table();
		var aTb = $t([['id', 'dorf3table']]);
		var trTop = $r([["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(5);
		trTop.appendChild(updAllCell);

		var tdTop = $c(topRowText[4], [['class', 'tb3chnb'], ["colspan", "11"], ['style', 'font-weight:bold;']]);
		trTop.appendChild(tdTop);
		//trTop.setAttribute("class", "rbg");
		aTb.appendChild(trTop);
		var trTop2 = $r([['class', 'tb3rh']]);
		var tdTop2 = $c(secRowText[0], [['class', 'tb3chnb'], ['width', '150']]);
		trTop2.appendChild(tdTop2);

		for (xi = 0; xi < 10; xi++) {
			var tdTop2 = $c("-", [["class", "c"]]);
			if (TB3O.U[1] != '') {
				var imgName = 'class="unit u' + (xi + TB3O.U[7]) + '" src="' + xGIF + '"';
				if (TB3O.T35 == false) imgName = "src='" + gIc["u" + (xi + TB3O.U[7])] + "'";
				tdTop2 = $c("<img " + imgName + ">", [['class', 'tb3chnb']]);
			};
			trTop2.appendChild(tdTop2);
		};
		var tdTopHero = $c(gIc["hero"], [['class', 'tb3chnb']]);
		//if (TB3O.U[1] != '') tdTopHero.setAttribute("class", "c");
		trTop2.appendChild(tdTopHero);
		aTb.appendChild(trTop2);

		//create the rows for the villages
		rowsDorf3(aTb, 11, 5);
		//Sum row
		sumRowDorf3(aTb, 11, 5);
		if (newPar) insertAfter(newPar, aTb);
		processVillage5();
	};

	function createDorf34Table(newPar, topRowText, secRowText) {

		removeDorf3Table();
		var aTb = $t([['id', 'dorf3table']]);
		var trTop = $r([["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(4);
		trTop.appendChild(updAllCell);
		var tdTop = $c(topRowText[3], [['class', 'tb3chnb'], ["colspan", "4"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);

		var trTop2 = $r();
		for (xi = 0; xi < 5; xi++){
			var tdTop2 = $c('', [['class', 'tb3chnb']]);
			var iHTML = '';
			switch (xi) {
				case 0: iHTML = secRowText[0]; break;
				case 1: iHTML = T('CPPERDAY'); break;
				case 2: iHTML = T('PARTY'); break;
				case 3: iHTML = T('TROPAS'); break;
				case 4: iHTML = T('SLOT'); break;
			};
			tdTop2.innerHTML = iHTML;
			if (xi > 0) {
				var aCB = createDorf3Checkbox();
				aCB.setAttribute('id', 'd3Upd_4_' + (xi + 1));
				tdTop2.appendChild(aCB);
			} else if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);
		};

		aTb.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTb, 4, 4);
		//Sum row
		sumRowDorf3(aTb, 4, 4);
		if (newPar) insertAfter(newPar, aTb);
	};

	function createDorf33Table(newPar, topRowText, secRowText) {
		removeDorf3Table();
		var aTb = $t([['id', 'dorf3table']]);
		var trTop = $r([["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(3);
		trTop.appendChild(updAllCell);
		var tdTop = $c(topRowText[2], [['class', 'tb3chnb'], ["colspan", "6"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);

		var trTop2 = $r();
		for (xi = 0; xi < 7; xi++){
			var tdTop2 = $c('', [['class', 'tb3chnb']]);
			var iHTML = '';
			switch (xi) {
				case 0: iHTML = secRowText[0]; break;
				case 1:
				case 2:
				case 3: iHTML = gIc["r" + xi]; break;
				case 5: iHTML = gIc['r4']; break;
				case 4:
				case 6: iHTML = gIc["clock"]; break;
			};
			tdTop2.innerHTML = iHTML;
			if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);
		};

		aTb.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTb, 6, 3);
		if (newPar) insertAfter(newPar, aTb);
		processVillage3();
	};

	function createDorf32Table(newPar, topRowText, secRowText, merchant) {
		removeDorf3Table();
		var aTb = $t([['id', 'dorf3table']]);
		var trTop = $r([["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(2);
		trTop.appendChild(updAllCell);
		var tdTop = $c(topRowText[1], [['class', 'tb3chnb'], ["colspan", "6"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);

		aTb.appendChild(trTop);

		var trTop2 = $r([['class', 'tb3rh']]);
		for (xi = 0; xi < 7; xi++){
			var tdTop2 = $c("", [['class', 'tb3chnb']]);
			var iHTML = '';
			switch (xi) {
				case 0: iHTML = secRowText[0]; break;
				case 1:
				case 2:
				case 3:
				case 4: iHTML = gIc["r" + xi]; break;
				case 5: iHTML = gIc["r4"] + "/" + gIc["clock"]; break;
				case 6: iHTML = secRowText[4]; break;
			};
			tdTop2.innerHTML = iHTML;
			if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);
		};

		aTb.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTb, 6, 2, merchant);
		//Sum row
		sumRowDorf3(aTb, 6, 2, merchant);
		if (newPar) insertAfter(newPar, aTb);
		processVillage2();
	};

	function createDorf31Table(newPar, topRowText, secRowText, merchant) {
		removeDorf3Table();
		aTb = $t([['id', 'dorf3table']]);
		trTop = $r([["class", "tb3rhb"]]);
		updAllCell = createUpdAllCell(1);
		trTop.appendChild(updAllCell);
		tdTop = $c(topRowText[0], [['class', 'tb3chnb'], ['colspan', '4'], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);
		if (secRowText) {
			trTop2 = $r([['class', 'tb3rh']]);
			for (xi = 0; xi < secRowText.length; xi++){
				tdTop2 = $c(secRowText[xi], [['class', 'tb3chnb']]);
				if (xi == 3) {
					aS = 'd3Upd_1_3';
					aCB = createDorf3Checkbox();
					aCB.setAttribute('id', aS);
					aCBI = getGMcookie(aS, false);
					aCB.checked = eval(aCBI);
					aCB.addEventListener('click', setDorf3CheckOption(aS), false);
					tdTop2.appendChild(aCB);
				} else if (xi == 0) tdTop2.setAttribute('width', '150');
				trTop2.appendChild(tdTop2);
			};
		};
		aTb.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTb, secRowText.length - 1, 1, merchant);
		if (newPar) insertAfter(newPar, aTb);
		processVillage11();
	};

	function setDorf3CheckOption(aStr) {
		return function() {
			var aCB = $g(aStr);
			if (aCB) {
				if (aCB.checked == true) aCBI = 'true'; else aCBI = 'false';
				setGMcookie(aStr, aCBI, false);
			};
		};
	};

	function createUpdAllCell(xi) {
		tdUA = $c("", [['class', 'tb3chnb']]);
		if (xi == 4) {
			uAL = $a(gIc["reload_v"], [['href', jsVoid]]);
			uAL.addEventListener('click', function () {updateAllVillages(xi);}, false);
			tdUA.appendChild(uAL);
		};
		return tdUA;
	};

	function updateAllVillages(xi) {
		for (var i = 0; i < vList.length; i++) {
			var aTimeOut = getRndTime(1971);
			setTimeout(refreshVillageV2(vList[i].vNewdid, xi), aTimeOut);
		};
		return;
	};

	function createDorf3Checkbox() {
		return $i([['type', 'checkbox'], ['value', '1'], ['checked', 'true']]);
	};

	function sumRowDorf3(pNode, maxTD, tabNo, merchant) {
		//Separator row
		trSeparator = $r([['class', 'tb3r']]);
		trSeparator.appendChild($c("", [['class', 'tb3rnb'], ["colspan", "" + (maxTD + 1)]]));
		pNode.appendChild(trSeparator);

		//sum row
		trSum = $r([['class', 'tb3r']]);
		//first sum cell
		ts1 = $c(T('TOTAL'), [['class', 'tb3cnb'], ['style', 'font-weight:bold']]);
		trSum.appendChild(ts1);
		totalMerchants = new Array();
		totalMerchants = [0, 0];
		if (merchant) {
			for (xi = 0; xi < merchant.length; xi++) {
				merchants = merchant[xi].split("/");
				posX = merchants[0].lastIndexOf(">");
				totalMerchants[0] += parseInt(merchants[0].substring(posX + 1));
				posX = merchants[1].indexOf("<");
				totalMerchants[1] += parseInt(merchants[1].substring(0, posX));
			};
		};
		for (var yi = 0; yi < maxTD; yi++) {
			if (merchant && yi == maxTD - 1) {
				ts = $c("" + totalMerchants[0] + "/" + totalMerchants[1], [['class', 'tb3cnb']]);
			} else if (tabNo == 4 && yi == 1) {
				ts = $c("", [["colspan", "2"], ['class', 'tb3cnb']]);
			} else if (tabNo == 4 && yi == 2) {
			} else {
				ts = $c("-", [['class', 'tb3cnb']]);
			};
			ts.setAttribute("id", "aldea_s_" + tabNo + "_" + (yi+2));
			trSum.appendChild(ts);
		};
		pNode.appendChild(trSum);
		//return trSeparator;
	};

	function updD3Bullets(newdid, intVal) {
		var aE = $g('aldea' + newdid + '_boton');
		if (TB3O.T35 == false) aE.src = gIc["b" + intVal]; else aE.className = "online" + intVal;
	};
	
	function rowsDorf3(pNode, maxTD, tabNo, merchant) {
		for (var i = 0; i < vList.length; i++){
			var tr = $r([['class', 'tb3r']]);
			//first cell
			var td1 = $c("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
			var nobr = $e("NOBR", "");
			if (tabNo == 4) {
				var aLink = $a("<img class='online5' src='" + gIc["b5"] + "' title='" + T('ACTUALIZAR') + " (" + vList[i].vName + "-" + vList[i].vNewdid + ")' id='aldea" + vList[i].vNewdid + "_boton'>", [['href', jsVoid]]);
				aLink.addEventListener("click", refreshVillageV2(vList[i].vNewdid, tabNo), 0);
				nobr.appendChild(aLink);
			};
			nobr.appendChild($e("SPAN", ' <a href="dorf1.php?newdid=' + vList[i].vNewdid + '">' + vList[i].vName + '</a>'));
			td1.appendChild(nobr);
			tr.appendChild(td1);
			//second cell and the other ones
			for (yi = 0; yi < maxTD; yi++) {
				var td = $c("-", [['class', 'tb3cnb'], ["id", "aldea" + vList[i].vNewdid + "_" + tabNo + "_" + (yi+2)]]);
				if (yi == maxTD - 1 && (tabNo == 1 || tabNo == 2)) td.innerHTML = merchant[i];
				tr.appendChild(td);
			};
			pNode.style.textAlign = docDir[0];
			pNode.appendChild(tr);
		};
	};

	function processDorf3() {
		var origParTop = $xf("//div[@id='" + dmid2 + "']//p | //div[@id='" + dmid2 + "']//*[@id='textmenu'] | //div[@id='" + dmid2 + "']//*[@class='txt_menue']");
		if (TB3O.plusAcc == true) {
			origParTop.innerHTML += ' | <a href="dorf3.php?s=6">' + T('ATTABLES') + '</a>';
			return;
		};

		var origT = $xf("//div[@id='" + dmid2 + "']//table[@id='overview'] | //div[@id='" + dmid2 + "']//table[@class='tbg']");
		if (origT) origT.style.visibility = "hidden";

		if (origParTop) {
			var arrParTopLinks = origParTop.textContent.split("\n");
			var arrParTopText = new Array();
			for (xi = 0; xi < arrParTopLinks.length; xi++) {
				arrParTopText[xi] = arrParTopLinks[xi].replace("|", "");
			};
			arrParTopText.shift();
			origParTop.style.visibility = "hidden";
		};

		var origSecRow = origT.rows[1];
		var arrSecRow = origSecRow.textContent.split("\n");
		arrSecRow.pop();
		arrSecRow.shift();

		//get the merchant array
		var arrM = new Array();
		for (i = 0; i < vList.length; i++) {arrM[i] = origT.rows[2 + i].cells[4].innerHTML;};

		//replace the original Paragraph with a new one providing the same options as in Travian Plus
		var nP = $e("P", "");
		var a = $g(dmid2);
		if (a.firstChild) a.insertBefore(nP, a.firstChild); else a.appendChild(nP);

		for (xi = 0; xi < arrParTopText.length; xi++) {
			var nPelem = $a(arrParTopText[xi], [['class', "newDorf3elem_" + xi], ['href', jsVoid]]);
			switch (xi) {
				case 0: nPelem.addEventListener("click", function() {createDorf31Table(nP, arrParTopText, arrSecRow, arrM);}, 0); break;
				case 1: nPelem.addEventListener("click", function() {createDorf32Table(nP, arrParTopText, arrSecRow, arrM);}, 0); break;
				case 2: nPelem.addEventListener("click", function() {createDorf33Table(nP, arrParTopText, arrSecRow);}, 0); break;
				case 3: nPelem.addEventListener("click", function() {createDorf34Table(nP, arrParTopText, arrSecRow);}, 0); break;
				case 4:	nPelem.addEventListener("click", function() {createDorf35Table(nP, arrParTopText, arrSecRow);}, 0); break;
			};
			nP.appendChild(nPelem);
			if (xi < arrParTopText.length - 1) {
				var nPsep = $e("SPAN", " | ");
				nP.appendChild(nPsep);
			};
		};
		removeElement(origParTop);
		createDorf31Table(nP, arrParTopText, arrSecRow, arrM);
	};

	function showDeleteAccount(){
		var aP = $xf("//*[@class='deltimer'] | //p[parent::div[@id='" + dleft + "'] and @style]");
		if (aP) {
			moveElement(aP, document.body);
			$at(aP, [['class', 'delacc']]);
		};
	};

	//time and resource counters
	function setTimers(){
		function createResourceTimer(i){
			return function(){
				var sTimeouts = $xf("//*[@id='timeout" + i + "']", 'l');
				//increase the required amount of the i type resource
				crtResUnits[i]++;
				crtResUnits[4] = 0;
				for (var xi = 0; xi < 4; xi++) crtResUnits[4] += crtResUnits[xi];
				for (var j = 0; j < sTimeouts.snapshotLength; j++){
					var aTimeout = sTimeouts.snapshotItem(j);
					if (aTimeout) {
						var quantity = aTimeout.textContent - 1; // calculate needed resource quantity
						if (quantity >= 0) aTimeout.innerHTML = quantity; else {
							var aParentNode = aTimeout.parentNode;
							if (aParentNode != null) {
								var tbodyNode = aParentNode.parentNode;
								if (tbodyNode) {
									if (tbodyNode.childNodes.length <= 2) {
										var resourceCellNode = tbodyNode.parentNode.parentNode;
										removeElement(tbodyNode.parentNode);
										if (resourceCellNode != null) {
											$at(resourceCellNode, [['class', 'tb3cnb']]);
											resourceCellNode.innerHTML = T('EXTAV');
										};
									} else removeElement(aTimeout.parentNode);
								};
							};
						};
					};
				};
			};
		};

		function createTimerHandler(){
			return function () {
				var allTimeouts = $xf("//*[@id='timeout' or @id='timeouta']", 'l');
				//decrease time
				for (var i = 0; i < allTimeouts.snapshotLength; i++){
					var aTimeout = allTimeouts.snapshotItem(i);
					var xTime = toSeconds(aTimeout.textContent) - 1;
					if (xTime >= 0)	aTimeout.textContent = formatTime(xTime, 0);//not reached
				};
				if (TB3O.boolIsNPCExluded == false) NPCUpdate();//fr3nchlover
			};
		};

		var arrFrequency = new Array(4);
		for (var i = 0; i < 4; i++){
			arrFrequency[i] = (1000 / Math.abs(prodPerHour[i]/3600));
			if (!isFinite(arrFrequency[i]) || arrFrequency[i] < 0 || capacity[i] - crtResUnits[i] == 0) arrFrequency[i] = Number.POSITIVE_INFINITY; else setInterval(createResourceTimer(i), Math.floor(arrFrequency[i]));
		};
		setInterval(createTimerHandler(),1000);
	};

	function getBmaxLevel(gid) {
		var maxLevel;
		switch (gid) {
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:	maxLevel = 5; break;
			case 23:
			case 35: maxLevel = 10; break;
			case 27: maxLevel = 20; break; //treasury -> we'll keep the level 20 as max level, even if for older game versions it is 10
			case 40: maxLevel = 100; break;
			default: maxLevel = 20;
		};
		return (maxLevel);
	};

	function colorLvl(crtLvl, gid){
		var result = 1;
		var neededResNPC = 0;
		var XY = bCost[parseInt(gid)][parseInt(crtLvl) + 1];
		if (XY) {
			for (var i = 0; i < 4; i++) {
				if (crtResUnits[i] < XY[i]) result = 0;
				neededResNPC += XY[i];
			};
			if (result == 0 && neededResNPC <= crtResUnits[4]) result = 2;
		};
		return result;
	};

	// market => offer: function marketSellMinMax automatically selects as offering the resource from which you have the most units and searching the resource with the minimum units for the current village
	// add option to save the offer
	// add option to save the offer as global (Zippo)
	function marketSellMinMax() {
		var aX = $xf("//a[@class='selected' and contains(@href, '&t=2')] | //input[@name='d2'] | //input[@class='fm fm25']");
		if (!aX) return;
		maxRes = crtResUnits[0];
		minRes = crtResUnits[0];
		idMax = 0;
		idMin = 0;
		pS = $g('soff');

		for (var i = 0; i < 4; i++){
			if (maxRes <= parseInt(crtResUnits[i])) {maxRes = crtResUnits[i]; idMax = i;};
			if (minRes >= parseInt(crtResUnits[i])) {minRes = crtResUnits[i]; idMin = i;};
		}
		try {
			offerTypeMax = document.getElementsByName("rid1");
			offerTypeMin = document.getElementsByName("rid2");
			if (offerTypeMax) {offerTypeMax[0].value = "" + (idMax + 1) + ""; };
			if (offerTypeMin) {offerTypeMin[0].value = "" + (idMin + 1) + ""; };
		} catch(e) {};

		if (!pS) {
			var aTb = $xf("//*[@id='sell'] | //table[@class='f10']");
			if (aTb) {
				sRow = $r();
				iSave = $e("INPUT", "");
				$at(iSave, [['type', 'checkbox'], ['id', 'soff'], ['value', '1'], ['style', 'margin:0px']]);
				iSaveGlobal = $e("INPUT", "");
				$at(iSaveGlobal, [['type', 'checkbox'], ['id', 'soffG'], ['value', '1']]);
				sCell = $c("");
				sCell.appendChild(iSave);
				sCell.appendChild($e("TEXTNODE", "&nbsp;" + T('SAVE') + "&nbsp;"));
				sCell.appendChild(iSaveGlobal);
				sCell.appendChild($e("TEXTNODE", "&nbsp;" + T('SAVEGLOBAL')));
				maxCells = 4;
				if (TB3O.M35 == 2) maxCells = 3;
				for (var i = 0; i < maxCells; i++) {sRow.appendChild($c(""));};
				sRow.appendChild(sCell);
				aTb.appendChild(sRow);
			};
		};

		//add information about capacity of the merchants and make transport functions available to this page, too
		merchantsPar = $xf("//form//p | //form//p[@class='f10']");
		if (merchantsPar) {
			mHTML = merchantsPar.textContent;
			mhMH = mHTML.split(" ")[0];
			avMerchants = parseInt(mHTML.split(" ")[1].split("/")[0]);
			if (mHTML.indexOf("(") == -1) merchantsPar.innerHTML += " (" + TB3O.Mcap + " / " + gIc["merchant"] + ")";
		};

		rxI = $xf("//input[@class='text' and @name='m1'] | //input[@class='fm' and @name='m1']");
		if (rxI) rxI.addEventListener('keyup', function() {mhRowUpdate3(avMerchants);}, false);
		rxType = $xf("//select[@class='dropdown' and @name='rid1'] | //select[@class='fm' and @name='rid1']");
		if (rxType) rxType.addEventListener('change', function() {mhRowUpdate3(avMerchants);}, false);

		function mhRowUpdate3(maxM) {
			totalTransport = 0;
			maxC = TB3O.Mcap;
			aR = parseInt(rxI.value);

			if (rxType && crtResUnits[parseInt(rxType.value) - 1] < aR) rxI.value = crtResUnits[parseInt(rxType.value) - 1];

			if (!isNaN(aR)) totalTransport += aR;

			totMerchants = Math.ceil(totalTransport / maxC);

			//by MarioCheng & DMaster for wasted/exceeding resources
			crtWaste = maxC - (totalTransport - (totMerchants-1) * maxC);
			crtExceed = totalTransport - (maxM * maxC);
			//finished
			mhText = "<b>" + mhMH + ": " + totMerchants + "/" + maxM + "<br>" + T('MAX') + ": " + maxM * maxC + "<br>";

			if (totMerchants > maxM) {
				mhColor = "red";
				mhText += T('MTX') + ": "+ crtExceed;
			} else {
				mhColor = "darkgreen";
				mhText += T('MTW') + ": "+ crtWaste;
			};
			mhText += "<br>" + T('MTC') + ": " + totalTransport + "</b>";
			setMerchantsCell(mhText, mhColor, aTb);
			return;
		};
	};

	//show hero extended status
	function showHeroStatus() {
		hmLink = $xf("//div[@id='" + dmid2 + "']//a[contains(@href, '&rename')]");
		if (!hmLink) return;
		hoT = hmLink.parentNode.parentNode.parentNode.parentNode;
		posType = hoT.rows[0].cells[0].textContent.indexOf(" (");
		hHeader = hoT.rows[0].cells[0].textContent.substr(0, posType);
		hABonus = hoT.rows[3].cells[1].textContent.replace("%", "");
		setGMcookie("heroV", hABonus, false);
		xLevel = "";
		notgata = true;
		for (xi = hHeader.length; xi > 0; xi--) {
			if (hHeader.charAt(xi) != " " && notgata) xLevel = hHeader.charAt(xi) + xLevel; else notgata = false;
		};
		hLevel = parseInt(xLevel);
		hPercent = parseInt(hoT.rows[hoT.rows.length - 1].cells[1].textContent);

		crtExp = (hLevel + 1) * 100;
		crtLevelExp = ((crtExp) / 2) * hLevel;
		nextLevelExp = crtLevelExp + crtExp;

		expGainedCrtLevel = (hLevel+1) * hPercent;
		expToLevelUp = (hLevel + 1) * (100 - hPercent);

		strLevel = hoT.rows[0].cells[0].childNodes[1].textContent;
		strLevel = strLevel.substr(0, strLevel.indexOf(hLevel) - 1);

		xRow = $r([['style', 'background-color:white']]);
		hCell = $c("", [['colSpan', '5'], ['style', 'padding:1px 2px 1px 1px; margin:0px;']]);

		hTable = $t([['class', 'tb3tb'], ['width', '100%'], ['style', 'border:1px solid silver;']]);
		aRow = $r();
		aCell = $c(strLevel + " " + hLevel, [['class', 'tb3cbt']]);
		bCell = $c("" + hPercent + "%", [['class', 'tb3cbt']]);
		cCell = $c("" + (100 - hPercent) + "%", [['class', 'tb3cbt']]);
		dCell = $c(strLevel + " " + (hLevel + 1), [['class', 'tb3cbt']]);
		aRow.appendChild(aCell);
		aRow.appendChild(bCell);
		aRow.appendChild(cCell);
		aRow.appendChild(dCell);

		bRow = $r();
		a1Cell = $c('', [['width', '100px'], ['class', 'tb3cbt']]);
		bRow.appendChild(a1Cell);
		b1Cell = $c('', [['colSpan', 2], ['style', 'padding:2px 2px 1px 2px; border:0px medium none; margin:0px;']]);
		bRow.appendChild(b1Cell);

		graphBar = $t([['style', 'height:16px; width:100%; margin:0px; border:0px medium none; border-collapse:collapse;']]);

		rX = $r([['style', 'border:0px medium none; padding:0px; margin:0px;']]);

		x1Cell = $c('', [['style', 'width: ' + hPercent + '%; background-color: blue; padding:0px; border:0px medium none; margin:0px;']]);
		x2Cell = $c('', [['style', 'width: ' + (100 - hPercent) + '%; background-color: lightgrey; padding:0px; border:0px medium none; margin:0px']]);

		rX.appendChild(x1Cell);
		rX.appendChild(x2Cell);
		graphBar.appendChild(rX);
		b1Cell.appendChild(graphBar);

		c1Cell = $c('', [['colSpan', 2], ['class','tb3cbt']]);
		bRow.appendChild(c1Cell);

		cRow = $r();
		a2Cell = $c(crtLevelExp, [['class', 'tb3cbt']]);
		cRow.appendChild(a2Cell);
		b2Cell = $c(expGainedCrtLevel, [['title', "" + crtLevelExp + " + " + expGainedCrtLevel + " = " + (crtLevelExp + expGainedCrtLevel)], ['class', 'tb3cbt']]);
		cRow.appendChild(b2Cell);
		c2Cell = $c(expToLevelUp, [['class', 'tb3cbt']]);
		cRow.appendChild(c2Cell);
		d2Cell = $c(nextLevelExp, [['class', 'tb3cbt']]);
		cRow.appendChild(d2Cell);

		hTable.appendChild(aRow);
		hTable.appendChild(bRow);
		hTable.appendChild(cRow);
		hCell.appendChild(hTable);
		xRow.appendChild(hCell);
		hoT.appendChild(xRow);
	};
	
	//check if NPC excluded
	function isThisNPCexcluded() {
		return (TB3O.O[26] != '1' ||
			TB3O.boolIsThisNPC == true ||
			crtPage.indexOf("build.php") == -1 ||
			crtPage.match(/build.php\?(.*)&t=(\d+)/) != null ||
			$g("map1") != null || $xf("//map[@name='map1']") != null);
	};

	//insert the NPC assistant back link
	function insertNPCHistoryLink() {
		var bname = getQueryParameters(urlNow, NPCbacklinkName);
		if (!bname) bname = "Go back";
		var div = $g(dmid2);
		div.innerHTML += '<p>&nbsp;<a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';
	};

	//fill in the NPC Merchant fields
	function fillinNPCfields(aURL) {
		if (aURL.indexOf('&' + NPCResources) != NPCURL.length) return false;
		var needed = getQueryParameters(aURL, NPCResources).split(',');
		var inputs = document.getElementsByName('m2[]');
		for (var i = 0; i < 4; i++) {inputs[i].value = needed[i];};
		unsafeWindow.calculateRest();
	};

	function getTroopsToBeTrained() {
		var xp = $xf('//input[starts-with(@id, "inputTroopNo_")]', 'r');
		if (xp.snapshotLength > 0) {
			var inputs = new Array();
			for (var i = 0; i < xp.snapshotLength; i++) {
				var f = xp.snapshotItem(i).value;
				inputs.push(f.length == 0 || isNaN(f) ? 0 : parseInt(f));
			};
			return inputs;
		} else return;
	};

	function parseURL(aURL) {
		var urlParts = aURL.split('?', 2);
		if (urlParts.length == 1) urlParts[1] = '';
		var parts = {path: urlParts[0], query: urlParts[1]};
		return parts;
	};

	function getQueryParameters(aURL, param) {
		var urlParts = parseURL(aURL).query.split('&');
		for (var i = 0; i < urlParts.length; i++) {
			var ki = urlParts[i].split('=');
			if (ki[0] == param) return decodeURIComponent(ki[1]);
		};
	};

	function addQueryParameter(aURL, param, aVal) {
		var add_pair = param + '=' + encodeURIComponent(aVal);
		var added = false;
		var urlParts = parseURL(aURL);
		var pairs = urlParts.query.split('&');
		for (var i = 0; i < pairs.length; i++) {
			var ki = pairs[i].split('=');
			if (ki[0] == param) {
				pairs[i] = add_pair;
				added = true;
				break;
			};
		};
		if (!added) pairs.push(add_pair);
		return urlParts.path + '?' + pairs.join('&');
	};

	function NPCUpdate() {
		var arrTrain = null;
		//NPC for buildings/resource fields/armoury/blacksmith/town hall/academy
		xpNeeded = $xf("//*[@id='npcXX_1']", 'r');
		if (xpNeeded.snapshotLength != 0) NPCAssistant(1, xpNeeded, arrTrain);
		if (TB3O.isTtB == true && document.getElementsByName('s1').length > 0) arrTrain = getTroopsToBeTrained();
		xpNeeded = $xf('//*[starts-with(@id, "npc_tt_r")]', 'r');
		if (xpNeeded.snapshotLength == 0) xpNeeded = $xf('//*[starts-with(@id,"NPCTT")]', 'r');
		if (xpNeeded.snapshotLength != 0) NPCAssistant(2, xpNeeded, arrTrain);
	};
	
	
	function setTroopsNPC() {
		var aX = $xf('//div[@id="' + dmid2 + '"]//table[@class="build_details"]//td[@class="desc"]', 'l');
		for (var i = 0; i < aX.snapshotLength; i++) {
			var tdX = aX.snapshotItem(i);
			$at(tdX, [['id', 'NPCTT_' + (i + 1)]]);
			getRequiredRes(tdX);
		};
	};

	function getRequiredRes(td) {
		var strTC = td.textContent.replace(/\n/g, "").replace(/\s/g, "");
		var iktC = strTC.indexOf(")");
		if (iktC == -1) iktC = strTC.indexOf("）");
		var intC = strTC.indexOf(T("TOTAL"));
		var tC = strTC;
		if (iktC != -1) {
			if (intC != -1 && intC > iktC + 1) {
				tC = strTC.substring(iktC + 1, intC);
			} else if (intC != -1) {
				tC = strTC.substring(0, intC - 1);
			} else if (intC == -1 && strTC.length > iktC + 1) {
				tC = strTC.substr(iktC + 1);
			} else if (intC == -1) {
				tC = strTC;
			};
		} else {
			tC = strTC.substring(iktC).replace(/[a-zA-Z]/g, "");
			fiI = tC.search(/(\d+)/);
			if (fiI > 0) tC = tC.substring(fiI);
		};
		dX = tC.split(":");
		if (dX.length > 1 && td.nodeName != "TD") iX = 1; else iX = 0;
		var arC = dX[iX].split("|");
		var arX = new Array();
		var necRes = 0;
		for (var xi = 0; xi < 4; xi++) {arX[xi] = parseInt(arC[xi]); necRes += arX[xi];};
		if (td.id.indexOf("NPCTT_") != -1) {
			var aImg = td.parentNode.getElementsByTagName("IMG")[0];
			var arrX = tC.split("|");
			var strTime = arrX[arrX.length - 1];
			var aTtT = new xTtT(getTroopIndexTitleFromImg(aImg)[0], necRes, strTime, arX);
			td.id.search(/(\d)/);
			var index = RegExp.$1;
			arrTtT[index - 1] = aTtT;
			//log(3, "arrTtT[" + (index - 1) + "] : tType = " + arrTtT[index - 1].tType + "; necRes = " + arrTtT[index - 1].necRes + "; tTime = " + arrTtT[index - 1].tTime + "; aRes = " + arrTtT[index - 1].aRes);
		};
		return arX;
	};
	
	//function for the NPC entries on pages where an NCP trade is possible
	function NPCAssistant(typeNPC, xpNeeded, arrTrain) {
		//Needed resources
		for (var i = 0; i < xpNeeded.snapshotLength; i++) {
			td = xpNeeded.snapshotItem(i);
			var arrayRes;
			if (typeNPC == 1) arrayRes = getRequiredRes(td); else if (typeNPC == 2) arrayRes = arrTtT[i].aRes;
			if (arrayRes == null || arrayRes.length < 4) continue;
			//Read needed resources and calculate total
			needRes = new Array();
			needResTotal = 0;
			for (var j = 0; j < 4; j++) {
				needRes.push(arrTrain ? arrayRes[j] * arrTrain[i] : arrayRes[j]);
				needResTotal += arrayRes[j];
			};

			//suggested by fr3nchlover.
			neededTotal = (arrTrain && arrTrain[i] != 0 ? needResTotal * arrTrain[i] : needResTotal);

			// Get or create HTML container
			container_id = 'npcXX_' + typeNPC + '_' + i;
			container = $g(container_id);
			if (container == null) {
				if (td.nodeName == "DIV") td = td.parentNode;
				td.innerHTML += '<br>';
				if (needResTotal > 20000  && typeNPC == 2) td.innerHTML += "<br>";
				td.innerHTML += '<div id="' + container_id + '" class="npc-general"> </div>';
				container = $g(container_id);
			};
			//Show total & deficit/surplus
			r = crtResUnits[4] - neededTotal;
			r_s = '[' + r + ']';
			if (r < 0) r_s = '<span class="npc-red">[' + r + ']</span>'; else if (r > 0) r_s = '<span class="npc-green">[+' + r + ']</span>';
			container.innerHTML = '<b>' + T("TOTAL") + '</b>: ' + neededTotal + ' ' + r_s;

			// Show time estimate
			dtNow = new Date();
			dtEstimated = new Date();
			if (neededTotal > 0 && r < 0) {
				sEst = Math.ceil(Math.abs(r) / (prodPerHour[5] / 3600));
				dtEstimated.setTime(dtNow.getTime() + (sEst * 1000));
				formatDtEstimated =
					(dtEstimated.getDate() < 10 ? '0' + dtEstimated.getDate() : dtEstimated.getDate()) + '.' +
					(dtEstimated.getMonth() < 9 ? '0' + (dtEstimated.getMonth() + 1) : (dtEstimated.getMonth() + 1)) +
					(dtNow.getFullYear() < dtEstimated.getFullYear() ? dtEstimated.getYear() : '');
				if (dtEstimated.getDate() == dtNow.getDate() && dtEstimated.getMonth() == dtNow.getMonth()) {
					formatDtEstimated = "";
				} else {
					formatDtEstimated = '&nbsp;' + formatDtEstimated;
				};
				formatTimeEstimated =
					(dtEstimated.getHours() < 10 ? '0' + dtEstimated.getHours() : dtEstimated.getHours()) + ':' +
					(dtEstimated.getMinutes() < 10 ? '0' + dtEstimated.getMinutes() : dtEstimated.getMinutes());
					container.innerHTML += ' | ' + T('LISTO') + '<span class="npc-red">' + formatDtEstimated + '&nbsp;' + '</span>' + T('AT') + '&nbsp;' + '<span class="npc-red">' + formatTimeEstimated + '</span>';
			};

			//Show time saved by NPC
			var time_saved = 0;

			if (neededTotal > 0) {
				for (var j = 0; j < 4; j++) {
					PpMt = prodPerHour[j] / 60;
					mUntilNPC = (dtEstimated.getTime() - dtNow.getTime()) / 1000 / 60;
					resAtNPCtime = parseInt(crtResUnits[j]) + (mUntilNPC * PpMt);
					deficitUntilNPC = needRes[j] - resAtNPCtime;
					if (deficitUntilNPC <= 0) continue;
					if (PpMt <= 0) {
						time_saved = null;
						break;
					};
					diffCalc = Math.ceil(deficitUntilNPC / PpMt);
					if (diffCalc > time_saved) time_saved = diffCalc;
				};
			};

			if (time_saved == null) {
				container.innerHTML += ' | &#8734;';
			} else if (r < 0) {
			} else if (time_saved > 0) {
				diffHours = Math.floor(time_saved / 60);
				if (diffHours < 10) diffHours = "0" + diffHours;
				diffMinutes = time_saved % 60;
				if (diffMinutes < 10) diffMinutes = "0" + diffMinutes;
				delta_str = T('NPCSAVETIME') + '&nbsp;' + diffHours + ':' + diffMinutes + ' h';
				if (diffHours < 1) delta_str = '<span class="npc-red">' + delta_str + '</span>';
				container.innerHTML += ' | ' + delta_str;
			};

			// Show max.
			if (arrTrain) {
				maxY = Math.floor(crtResUnits[4] / needResTotal);
				container.innerHTML += ' | ' + T('MAX') + '. ';
				aLink = $a(maxY, [['href', jsVoid]]);
				aLink.addEventListener('click', clickOnNPCAssistant(i, maxY), false);
				container.appendChild(aLink);
			};

			// Show NPC link
			if (neededTotal > 0 && r >= 0 && (time_saved > 0 || time_saved == null) && TB3O.boolShowNPCLink) {
				urlNPCback = addQueryParameter(NPCURL, NPCResources, needRes.join(','));
				urlNPCback = addQueryParameter(urlNPCback, NPCbacklinkName, TB3O.BrT);
				container.innerHTML += '&nbsp;<a href="' + urlNPCback + '"> &raquo; NPC</a>';
			};
		};

		function clickOnNPCAssistant(i, maxY) {
			return function() {
				aI = $g("inputTroopNo_" + (i + 1));
				//log(3, "aI = " + aI);
				if (aI) aI.value = maxY;
			};
		};
	};

	function getBootyCellInfo(booty) {
		iHTML = '';
		for (var i = 0; i < 4; i++) {iHTML += gIc["r" + (i + 1)] + booty[i] + (i < 3 ? ' + ' : ' = ' + booty[4]);};
		return iHTML;
	};

	function getBootyFromTable(aTb) {
		retValue = [0,0,0,0,0];
		xi = 3;
		gata = false;
		while (xi < aTb.rows.length && !gata) {
			bootyCell = aTb.rows[xi].cells[1];
			if (bootyCell.textContent.indexOf("|") != -1) gata = true;
			xi += 1;
		};
		if (gata) {
			resInfo = bootyCell;
			for (var xi = 0; xi < bootyCell.childNodes.length; xi++) {
				aChild = bootyCell.childNodes[xi];
				if (aChild.className == "goods" || aChild.className == "res") resInfo = aChild;
			};

			aqBooty = resInfo.textContent.split("|");
			if (aqBooty.length > 1) {
				for (var i = 0; i < 4; i++) {
					retValue[i] = parseInt(aqBooty[i].replace(" ", "").replace(" ", ""));
					retValue[4] += retValue[i];
				};
			};
			bootyCell.innerHTML = getBootyCellInfo(retValue);
		};
		return retValue;
	};

	function getRaceM2(aRow) {
		aValue = aRow.getElementsByTagName("IMG");
		if (aValue && aValue.length > 0) setRace(getTroopIndexTitleFromImg(aValue[0])[0]);
		getDisplayRace();
		return TB3O.U[1];
	};
	
	function tableTotalVillageTroopsV3() {
		if (actV.vID != "") {
			//new search function
			//first search for tables, if search successfull then search for tables and oasis
			allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='troop_details']//a[contains(@href, " + actV.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r');
			if (allTables.snapshotLength == 0) {
				allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='std troop_details']//a[contains(@href, " + actV.vID + ")]/../../../..", 'r');
				if (allTables.snapshotLength == 0) {
					allTables = $xf("//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + actV.vID + ")]/../../../..", 'r');
					if (allTables.snapshotLength == 0) {
						allTables = $xf("//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + actV.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r');
					};
				} else {
					allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='std troop_details']//a[contains(@href, " + actV.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r');
				};
			};

			if (allTables.snapshotLength > 0) {
				ntCc = 0;
				booty = [0,0,0,0,0];
				sumbooty = [0,0,0,0,0];
				ccLabel = getGMcookie("tvtccLabel", false);
				if (ccLabel == 'false') ccLabel = '';
				//horse drinking through level

				hdtLevel = 0;
				if (TB3O.d2spB.length > 8) TB3O.d2spB[8];
				//Search for first troop table from this village (david.macej)
				firstVillageTable = 0;
				while (allTables.snapshotItem(firstVillageTable).rows[0].cells[0].innerHTML.search(actV.vID) == -1) {firstVillageTable++;};

				tTable = allTables.snapshotItem(firstVillageTable).cloneNode(true);
				$at(tTable, [['class', 'allvtroops']]);
				booty = getBootyFromTable(allTables.snapshotItem(firstVillageTable));
				for (var xi = 0; xi < 5; xi++) {sumbooty[xi] += booty[xi];};
				tTable.rows[0].cells[1].innerHTML = '<b>' + T('TOTALTROOPS') + '</b>';
				tTable.rows[0].setAttribute("class", "cbgx");
				tTable.rows[0].cells[0].setAttribute('class', 'cbgx');
				tTable.rows[0].cells[1].setAttribute('class', 'cbgx');
				rowTrIcons = tTable.rows[1];
				//another race recognition method here
				if (TB3O.U[1] == '' || TB3O.U[2] == '') getRaceM2(rowTrIcons);
				rowTrUnits = tTable.rows[2];
				if (tTable.rows.length == 4) {
					rowCc = tTable.rows[3];
					rowB = $r();
					b1Cell = $c('<img src="' + image["capacity"] + '">', [['style', 'text-align:center;']]);
					strColspan = rowCc.cells[1].colSpan;
					b2Cell = $c("0", [['colspan', strColspan], ['id','tb3bountycell']]);
					rowB.appendChild(b1Cell);
					rowB.appendChild(b2Cell);
					rowCc.parentNode.insertBefore(rowB, rowCc);
				};
				rowB = tTable.rows[tTable.rows.length - 2];
				rowCc = tTable.rows[tTable.rows.length - 1];
				intCC = 0;

				for (var i = firstVillageTable + 1; i < allTables.snapshotLength; i++) {
					aTb = allTables.snapshotItem(i);
					if (aTb.nodeName == "P") break;

					//add the crop consumption label if found
					if (ccLabel == '') {
						lastCell = aTb.rows[aTb.rows.length - 1].cells[1];
						if (lastCell) {
							arrImg = lastCell.getElementsByTagName("IMG");
							if (arrImg.length > 0 && arrImg[0].className == 'r4') {
								ccLabel = aTb.rows[aTb.rows.length - 1].cells[0].innerHTML;
								setGMcookie("tvtccLabel", ccLabel, false);
							};
						};
					};

					//fix for the troops in oasis
					nSibling = aTb.nextSibling;
					if (nSibling && nSibling.nodeName == "P" && nSibling.className == 'b f16') i = allTables.snapshotLength;

					//fix provided by fr3nchlover
					allTroopCells = aTb.rows[2].cells;
					if (allTroopCells.length == 12) {
						heroIconCell = aTb.rows[1].cells[11];
						//add extra hero cell only if cell does not exist in total troop table (david.macej)
						if (rowTrIcons.cells.length == 11) {
							rowTrIcons.appendChild(heroIconCell.cloneNode(true)); //<= add a new cell to first line
							rowTrUnits.appendChild(allTroopCells[11].cloneNode(true)); //<= add a new cell to second line
							rowTrUnits.cells[11].innerHTML = ""; // clean new cell
							rowCc.cells[1].colSpan = 11; // add 1 to cols
							rowB.cells[1].colSpan = 11;
							$at(tTable.rows[0].cells[1], [['colspan', 12]]);
						};
					};

					 //if troops not in village stop summing (david.macej)
					if (aTb.rows[0].cells[0].innerHTML.search(actV.vID) == -1) continue;

					//add the troop units from the current table to the new created table
					if (aTb.rows[0].cells[0].textContent.indexOf(actV.vName) != -1) {
						for (var j = 1; j < allTroopCells.length; j++) {
							iHTML = rowTrUnits.cells[j].innerHTML;
							intTroops = parseInt(allTroopCells[j].innerHTML);
							if (iHTML == "") rowTrUnits.cells[j].innerHTML = intTroops; else rowTrUnits.cells[j].innerHTML = parseInt(iHTML) + intTroops;
						};
					} else {
						ntCc = 1;
					};
					booty = getBootyFromTable(aTb);
					for (var xi = 0; xi < 5; xi++) {sumbooty[xi] += booty[xi];};
				};
				//compute crop consumption
				arrTT = [0,0,0,0,0,0,0,0,0,0,0];
				for (var j = 1; j < rowTrUnits.cells.length; j++) {
					rowTrUnits.cells[j].className = (rowTrUnits.cells[j].innerHTML == "0") ? "c" : "";
					switch (j) {
						case 11: intCC += 6; arrTT[10] = 1; break;
						default:
							tImg = rowTrIcons.cells[j].getElementsByTagName("IMG");
							if (tImg[0]) {
								tType = getTroopIndexTitleFromImg(tImg[0])[0];
								arrTT[j - 1] = parseInt(rowTrUnits.cells[j].textContent);
								ccCoef = 1;
								if (hdtLevel > 9 && tType == 4) ccCoef = 0.5;
								if (hdtLevel > 14 && tType == 5) ccCoef = 0.667;
								if (hdtLevel > 19 && tType == 6) ccCoef = 0.75;
								intCC += Math.ceil(uc[tType][9] * arrTT[j - 1] * ccCoef);
							} break;
					};
				};
				intCC += ntCc;
				setGMcookieV2("Troops", arrTT, actV.vNewdid);

				rowCc.cells[1].innerHTML = (intCC) + " " + gIc["r5"] + " / " + gIc["clock"];
				rowCc.cells[0].innerHTML = ccLabel;
				$at(rowCc.cells[0], [['style', 'background-color:#F3F3F3']]);
				$at(rowCc.cells[1], [['style', 'background-color:#F3F3F3; text-align:' + docDir[0] + ';']]);

				if (sumbooty[4] != 0) rowB.cells[1].innerHTML = getBootyCellInfo(sumbooty); else rowB.style.display = 'none';

				if (TB3O.T35 == false) {
					p = $xf("//div[@id='" + dmid2 + "']/p[@class='txt_menue']", 'r').snapshotItem(0);
				} else {
					menu = $xf("//div[@id='" + dmid2 + "']/p/a", 'r');
					if (menu.snapshotLength > 0) p = menu.snapshotItem(0).parentNode; else p = $g("textmenu");
				};
				p.parentNode.insertBefore(tTable, p.nextSibling);

				newP = $e('P', '');
				newP.innerHTML += '<b>' + T('TOTALTROOPS') + '</b>';
				p.parentNode.insertBefore(newP, p.nextSibling);
				arrTT = null;
			};
		};
	};

	function getDistance(sx1, sy1, sx2, sy2) {
		var x1 = parseInt(sx1); var y1 = parseInt(sy1); var x2 = parseInt(sx2); var y2 = parseInt(sy2);
		dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));
		dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));
		dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
		return dist;
	};

	//------------------------------------------
	//Modified by Lux
	//------------------------------------------
	function showMsgPage(aState) {
		scroll(0,0);
		var outerPane = $g('OuterMsgPage');
		var innerPane = $g('InnerMsgPage');

		if (aState) {
			diplayElements("none");
			outerPane.className = 'OuterMsgPageOn';
			innerPane.className = 'InnerMsgPageOn';

			var aButton = $g('ButtonCloseMsgPage');
			//ms99
			if (aButton) aButton.addEventListener("click", function(){showMsgPage(false)}, true);
		} else {
			outerPane.className = 'MsgPageOff';
			innerPane.className = 'MsgPageOff';
			diplayElements("");
		};
	};

	function addDiv() {
		div = $e("div");
		//ms99
		div.innerHTML = '<div id="OuterMsgPage" class="MsgPageOff"></div><div id="InnerMsgPage" class="MsgPageOff"></div>';
		document.body.insertBefore(div, document.body.firstChild);
	};

	function diplayElements(aType) {
		uTb = $g('upgTable');
		mTb = $g('mapTable');
		ttTb = $g('trooptimetable');
		if (uTb) uTb.style.display = aType;
		if (mTb) mTb.style.display = aType;
		if (ttTb) ttTb.style.display = aType;
	};
	//------------------------------------------

	function allyCalculation() {
		if (crtPage.match(/allianz.php\?aid/)) {
			allyTable = $xf("//div[@id='" + dmid2 + "']//table | //div[@id='" + dmid2 + "']//table[@class='tbg']");
			if (allyTable) {
				iHTML = allyTable.rows[0].cells[0].innerHTML;
				if (TB3O.M35 == 2) {
					tbd = $xf("//td[@class='details']//table");
					if (tbd) allyName = tbd.rows[0].cells[1].textContent;
				} else allyName = allyTable.rows[3].cells[1].textContent;

				iHTML2 = iHTML.replace(allyName, "");
				allyTable.rows[0].cells[0].innerHTML = iHTML + " " + "<a href='" + crtPage + "'>" + allyName + "</a>";
			};
		};

		aTb = $g("member");
		if (!aTb) {
			a = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='6%']");
			if (a) aTb = a.parentNode.parentNode;
		};
		if (aTb) {
			totP = 0;
			totV = 0;
			totalBullets = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""]]; //blue, green, yellow, red, grey
			boolMyAlly = true;
			for (var i = 1; i < aTb.rows.length; i++) {
				totP += parseInt(aTb.rows[i].cells[2].textContent);
				totV += parseInt(aTb.rows[i].cells[3].textContent);
				if (boolMyAlly) {
					if (aTb.rows[i].cells[4]) {
						imgBullet = aTb.rows[i].cells[4].firstChild;
						if (imgBullet.src.indexOf("x.gif") == -1) {
							xf = basename(imgBullet.src).replace("b", "").replace(".gif", "");
							j = parseInt(xf);
							totalBullets[j - 1][0] += 1;
							totalBullets[j - 1][1] = imgBullet.title;
						} else if (imgBullet.className.match(/online/)) {
							aClass = imgBullet.className;
							imgBullet.className.search(/(\d)/);
							j = RegExp.$1;
							totalBullets[j - 1][0] += 1;
							totalBullets[j - 1][1] = imgBullet.title;
						};
					} else boolMyAlly = false;
				};
			};
			popPerPlayer = Math.round(totP/(aTb.rows.length - 1));
			boolIsMyAlly = aTb.rows[1].cells.length == 5;

			trT = $r([['class', 'tb3r']]);
			aTb.appendChild(trT);
			aCell = $c(T('TOTAL'), [['class', 'tb3chnb'], ["colspan", "2"]]);
			trT.appendChild(aCell);
			bCell = $c(totP, [['class', 'tb3chnb'], ['style', 'text-align:center']]);
			trT.appendChild(bCell);
			cCell = $c(totV, [['class', 'tb3chnb'], ['style', 'text-align:center']]);
			trT.appendChild(cCell);
			if (boolIsMyAlly) trT.appendChild($c("", [['class', 'tb3ch']]));

			//average population per member of aliance
			trAv = $r([['class', 'tb3r']]);
			aTb.appendChild(trAv);
			dCell = $c(T('AVPOPPERPLAYER'), [['class', 'tb3chnb'], ["colspan", "2"]]);
			trAv.appendChild(dCell);
			eCell = $c(popPerPlayer, [['class', 'tb3chnb'], ["colspan", "2"], ['style', 'text-align:center']]);
			trAv.appendChild(eCell);
			if (boolIsMyAlly) trAv.appendChild($c("", [['class', 'tb3chnb']]));

			//average population per village
			trAv = $r([['class', 'tb3r']]);
			aTb.appendChild(trAv);
			dCell = $c(T('AVPOPPERVIL'), [['class', 'tb3chnb'], ["colspan", "2"]]);
			trAv.appendChild(dCell);
			eCell = $c(Math.round(totP/totV), [['class', 'tb3chnb'], ["colspan", "2"], ['style', 'text-align:center']]);
			trAv.appendChild(eCell);
			if (boolIsMyAlly) trAv.appendChild($c("", [['class', 'tb3chnb']]));

			//number of bullets by type
			if (boolMyAlly) {
				rowBullets = $r([['class', 'tb3r']]);
				cellBullets = $c("", [['class', 'tb3chnb'], ['colspan', '5'], ['style', 'text-align:center']]);
				cBiHTML = "";
				addSpacer = " | ";
				for (var j = 0; j < 5; j++) {
					if (totalBullets[j][0] > 0) cBiHTML += "<img class='online" + (j + 1) + "' src='" + gIc["b" + (j+1)] + "' title='" + totalBullets[j][1] + "' alt='" + totalBullets[j][1] + "'> = &nbsp;" + totalBullets[j][0] + addSpacer + " ";
				};
				cellBullets.innerHTML = cBiHTML.substring(0, cBiHTML.length - 3);
				rowBullets.appendChild(cellBullets);
				aTb.appendChild(rowBullets);
			};
			totalBullets = null;
		};
	};

	function adjustTtT() {
		var aTb = $xf("//table[@class='build_details']");
		if (aTb) {
			aTb.rows[0].appendChild($c(gIc["clock"] + " & " + gIc["r5"]));
			for (var xi = 1; xi < aTb.rows.length; xi++) aTb.rows[xi].appendChild($c("", [['id', 'TtT_' + xi]]));
			aTb.id = "selecttraintroops";
		};
	};
	
	function adjustTiT() {
		var titTb = $xf("//table[starts-with(@class, 'under')]");
		if (titTb) {
			var csp = titTb.rows[titTb.rows.length - 1].cells[0].getAttribute("colspan");
			log(3, "csp = " + csp);
			var aCell = $c(T('TOTALTROOPSTRAINING') + " & " + gIc["r5"], [['class', 'tb3chnb'], ["colspan", csp], ['style', 'text-align:center;']]);
			var aRow = $r();
			aRow.appendChild(aCell);
			titTb.appendChild(aRow);
			
			var arrTiT = new Array;
			
			for (var xi = 1; xi < titTb.rows.length - 2; xi++) {
				var aInf = titTb.rows[xi].cells[0];
				var aImg = aInf.getElementsByTagName("IMG")[0];
				var aX = getTroopIndexTitleFromImg(aImg);
				var intNo = parseInt(aInf.textContent.replace(/\n/g, ""));
				gata = -1;
				for (var yi = 0; yi < arrTiT.length; yi++) {if (arrTiT[yi].tType == aX[0]) gata = yi;};
				if (gata > -1) arrTiT[gata].intNo += intNo; else {
					var aTiT = new yTiT(parseInt(aX[0]), parseInt(intNo), aX[1]);
					arrTiT[arrTiT.length] = aTiT;
				};
			};
			var TotCropCons = 0;
			var imgName;
			for (var xi = 0; xi < arrTiT.length; xi++) {
				TotCropCons += uc[arrTiT[xi].tType][9] * arrTiT[xi].intNo;//calculate the total crop consumtion for troops being trained		
				aRow = $r([['class', 'tb3rnb']]);
				if (TB3O.T35 != false) imgName = 'class="unit u' + arrTiT[xi].tType + '" src="' + xGIF + '"'; else imgName = "src='" + gIc["u" + arrTiT[xi].tType] + "'";
				aRow.appendChild($c("<img " + imgName + ">", [['class', 'tb3cnb'], ['style', 'border:0px solid none;']]));
				aRow.appendChild($c(arrTiT[xi].strName, [['class', 'tb3cnb'], ['style', 'border:0px solid none;']]));
				aRow.appendChild($c(arrTiT[xi].intNo, [['class', 'tb3cnb'], ['style', 'text-align:center; border:0px solid none;']]));
				titTb.appendChild(aRow);
			};
			//crop consumption for training troops-matteo466
			var cRow = $r([['class', 'tb3rnb']]);
			cRow.appendChild($c(gIc["r5"] ,[['class', 'tb3cnb'], ["colspan", csp - 1], ['style', 'border:0px solid none;']]));
			cRow.appendChild($c(TotCropCons, [['class', 'tb3cnb'], ['style', 'text-align:center; border:0px solid none;']]));
			titTb.appendChild(cRow);
		};
	};
	
	function isThisTroopTrainingBuilding() {
		var retValue = false;
		var cValue = $xf("//input[starts-with(@name, 't')]", 'l');// | //input[starts-with(@name,'z')]");
		if (cValue.snapshotLength > 0) {
			var mValue = $xf("//td[@class='max']//a", 'l');
			var aValue = $xf("//div[@id='" + dmid2 + "']//img[starts-with(@class, 'unit')]");
			if (aValue) {
				for (var xi = 0; xi < cValue.snapshotLength; xi++) {
					var aInput = cValue.snapshotItem(xi);
					aInput.id = "inputTroopNo_" + (xi + 1);
					aInput.addEventListener("keyup", addTimeToTrainSelectedTroops, false);
					mValue.snapshotItem(xi).addEventListener("click", addTimeToTrainSelectedTroops, false);
				};
				adjustTtT();
				adjustTiT();
				retValue = true;
			};
		};
		return retValue;
	};

	function calculateResourceTime(need, procWidth) {
		maxTime = 0;
		boolTb = false;
		cSt = ['font-size:8pt; ', 'text-align:' + docDir[0] + '; ', 'text-align:' + docDir[1] + '; ', 'color:#404040; ', 'color:#000000; '];
		cRst = [cSt[2] + cSt[0] + cSt[3], cSt[2] + 'font-size:6pt; ' + cSt[3]];
		cVst = [cSt[0] + cSt[1] + cSt[4], cSt[0] + cSt[2] + cSt[4]];

		resTable = $t([['class', 'tb3tbnb'], ['style', 'background-color:white; border-collapse:collapse; width:' + procWidth + '%;']]);
		//if(TB3O.M35 == 2) resTable.setAttribute('style', 'width:' + procWidth + '%');
		for (var i = 0; i < 4; i++){
			restante = parseInt(need[i]) - crtResUnits[i];
			if (restante > 100000) cRTstyle = cRst[1]; else cRTstyle = cRst[0];
			if (restante > 0) {
				tiempo = -1;
				if (prodPerHour[i] != 0) tiempo = Math.round(restante / (prodPerHour[i] / 3600));
				if (tiempo < 0 || capacity[i] - parseInt(need[i]) < 0) {
					maxTime = 'Infinity';
					aCell = $c(gIc["r" + (i + 1)], [['class', 'tb3cnb'], ['style', cSt[1]]]);
					bCell = $c(' ' + restante +' ', [['class', 'tb3cnb'], ['style', cRTstyle], ['id', "timeout" + i]]);
					cCell = $c(' ' + T('NEVER') + ' ', [['class', 'tb3cnb'], ['width', '220'], ['style', cRTstyle]]);
					boolTb = true;
				} else {
					if (tiempo > maxTime && maxTime !='Infinity') maxTime = tiempo;
					tiempo = formatTime(tiempo + 5, 0);
					aCell = $c(gIc["r" + (i + 1)], [['class', 'tb3cnb'], ['style', cSt[0]]]);
					bCell = $c(' ' + restante +' ', [['class', 'tb3cnb'], ['style', cRTstyle], ['id', "timeout" + i]]);
					cCell = $c(' ' + tiempo + ' ', [['class', 'tb3cnb'] , ['width', '60'], ['style', cRTstyle], ['id', 'timeouta']]);
					boolTb = true;
				};
				if (boolTb) {
					aRow = $r([['class', 'tb3rnb']]);
					aRow.appendChild(aCell);
					aRow.appendChild(bCell);
					aRow.appendChild(cCell);
					resTable.appendChild(aRow);
				};
			};
		};

		if (maxTime == 'Infinity'){
			xRow = $r();
			xRow.appendChild($c(T('LISTO'), [['class', 'tb3cnb'], ['style', cVst[0]], ['colspan' ,"2"]]));
			xRow.appendChild($c(T('NEVER'), [['class', 'tb3cnb'], ['style', cVst[1]]]));
			resTable.appendChild(xRow);
			boolTb = true;
		} else if (maxTime > 0) {
			tiempo2 = formatTime(maxTime + 5, 0); // a 5 seconds addition to compensate differences between JS timer and server
			aDate = new Date();
			aDate.setTime(aDate.getTime() + (maxTime * 1000));
			xRow = $r();
			txtDate = computeTextTime(aDate);
			xRow.appendChild($c(T('LISTO'), [['class', 'tb3cnb'], ['style', cVst[0]], ['colspan', '2']]));
			xRow.appendChild($c(txtDate, [['class', 'tb3cnb'], ['style', cVst[1]]]));
			resTable.appendChild(xRow);

			if (TB3O.O[36] == '1') {
				//added by Velonis Petros - start of addition - the until then row
				uthen = new Array(4);//obtained until the max time
				//residue row
				residue = new Array(4);//obtained until the max time
				for (var i = 0; i < 4; i++){
					uthen[i] = crtResUnits[i] + Math.round(maxTime*prodPerHour[i]/3600);
					residue[i] = uthen[i] - parseInt(need[i]);
				};
				uiHTML = createCRrows(T('RESOURCES') + " " + txtDate, uthen);
				riHTML = createCRrows(T('RESIDUE') + txtDate, residue);
				resTable.innerHTML += uiHTML;
				resTable.innerHTML += riHTML;
				//end of Velonis' addition
			};
			boolTb = true;
		};
		cSt = null;
		cRst = null;
		cVst = null;
		cRTstyle = null;
		if (boolTb == true) return resTable; else return null;

		//added by Velonis Petros
		function createCRrows(aTitle, aV) {
			aTb = $t([['class', 'tb3tbnb']]);
			xRow = $r();
			aCell = $c(aTitle, [['class', 'tb3cnb'], ['style', cVst[0] + "border-top:1px solid silver;"], ['colspan', '3']]);
			xRow.appendChild(aCell);
			aTb.appendChild(xRow);
			for (var i = 0; i < 4; i++) {
				yRow = $r();
				bCell = $c(gIc["r" + (i + 1)], [['class', 'tb3cnb'], ['style', cVst[0]]]);
				cCell = $c(aV[i], [['class', 'tb3cnb'], ['style', cVst[1]], ['colspan', '2']]);
				yRow.appendChild(bCell);
				yRow.appendChild(cCell);
				aTb.appendChild(yRow);
			};
			return aTb.innerHTML;
		};
		//end of Velonis' addition
	};
	
	function addTimeToTrainSelectedTroops() {
		var aTb = $g("selecttraintroops");
		var arrInputs = $xf("//*[starts-with(@id, 'inputTroopNo_')]", 'l');
		var arrAddCells = $xf("//*[starts-with(@id, 'TtT_')]", 'l');
		var tCC = 0;
		var tTtT = 0;
		var sT = 0;
		var gHTML = '';
		for (var i = 0; i < arrInputs.snapshotLength; i++) {
			var vTtT = parseInt(arrInputs.snapshotItem(i).value);
			if (isNaN(vTtT)) vTtT = 0;
			if (!isNaN(vTtT)) {
				var bTb = $t([['class', 'tb3tbnb']]);
				var xCell = arrAddCells.snapshotItem(i);
				var xaRow = $r([['class', 'tb3rnb']]);
				var xbRow = $r([['class', 'tb3rnb']]);
				var tT = toSeconds(arrTtT[i].tTime) * vTtT;
				tTtT += tT;
				var xaCell = $c(formatTime(tT, 0), [['class', 'tb3cnb'], ['style', 'font-size:8pt;']]);
				tCC += uc[arrTtT[i].tType][9] * vTtT;
				var xbCell = $c(gIc["r5"] + " " + uc[arrTtT[i].tType][9] * vTtT, [['class', 'tb3cnb'], ['style', 'font-size:8pt;']]);
				xaRow.appendChild(xaCell);
				xbRow.appendChild(xbCell);
				xCell.innerHTML = '';
				bTb.appendChild(xaRow);
				bTb.appendChild(xbRow);
				xCell.appendChild(bTb);
				sT += parseInt(vTtT);

				imgName = 'class="unit u' + arrTtT[i].tType + '" src="' + xGIF + '"';
				if (TB3O.T35 == false) imgName = "src='" + gIc["u" + arrTtT[i].tType] + "'";
				gHTML += "<img " + imgName + "> " + vTtT;
				if (i < arrInputs.snapshotLength - 1) gHTML += " | ";
				if (vTtT != 0) {
					var ix = $g('trNPC_' + (i + 1));
					if (ix) removeElement(ix);
					var ex = calculateResourceTime(arrayByN(arrTtT[i].aRes, vTtT), "100");
					if (ex) {
						$at(ex, [['id', 'trNPC_' + (i + 1)]]);
						var nC = aTb.rows[i + 1].cells.length;
						var xNode = (nC > 4 ? aTb.rows[i + 1].cells[1] : aTb.rows[i + 1].cells[0]);
						xNode.appendChild(ex);
					};
				};
			};
		};
		var aRow = $g('aRselecttraintroops');
		if (!aRow) {
			var csp = aTb.rows[0].cells[0].getAttribute("colspan");
			aRow = $r([['id', 'aRselecttraintroops'], ['class', 'tb3r']]);
			var aCell = $c("", [['id', 'gTtT'], ['class', 'tb3cnb'], ['colspan', csp]]);
			var bCell = $c(sT, [['id', 'sTtT'], ['class', 'tb3cnb']]);
			var cCell = $c("", [['class', 'tb3cnb']]);
			var dCell = $c("", [['id', 'tTtT'], ['class', 'tb3cnb']]);
			aRow.appendChild(aCell);
			aRow.appendChild(bCell);
			aRow.appendChild(cCell);
			aRow.appendChild(dCell);
			aTb.appendChild(aRow);
		} else {
			var aCell = $g("gTtT");
			if (aCell) aCell.innerHTML = '';
			var bCell = $g("sTtT");
			if (bCell) bCell.innerHTML = sT;
			var dCell = $g("tTtT");
			if (dCell) dCell.innerHTML = '';
		};
		//graphic of troops to be trained
		aCell.innerHTML = gHTML;
		//total cell
		var tTb = $t([['class', 'tb3tbnb']]);
		var taRow = $r([['class', 'tb3rnb']]);
		var tbRow = $r([['class', 'tb3rnb']]);
		var taCell = $c(formatTime(tTtT, 0), [['class', 'tb3cnb'], ['style', 'font-size:8pt;']]);
		var tbCell = $c(gIc["r5"] + " " + tCC, [['class', 'tb3cnb'], ['style', 'font-size:8pt;']]);
		taRow.appendChild(taCell);
		tbRow.appendChild(tbCell);
		tTb.appendChild(taRow);
		tTb.appendChild(tbRow);
		dCell.appendChild(tTb);
	};

	function addXYinMsg(iHTML) {
		var arXY = iHTML.match(/\((-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)/g);
		if (arXY) {
			for (var j = 0; j < arXY.length; j++) {
				var xy = arXY[j].replace(" ", "").replace(",", "|").replace(";", "|").replace("/", "|").replace("\\", "|");
				if (xy.indexOf("(") == 0 && xy.indexOf(")") != -1  && xy.indexOf("|") != -1) {
					xy = xy.replace("(", "").replace(")", "");
					var xy = xy.split("|");
					var idVillage = xy2id(xy[0], xy[1]);
					var villageLink = "<a href='karte.php?z=" + idVillage + "'>" + "( " + xy[0] + "|" + xy[1] + " )" + "</a>" +
					"&nbsp;<a href='a2b.php?z=" + idVillage + "'>" + gIc[getRPDefAction()] + "</a>" +
					"&nbsp;<a href='build.php?z=" + idVillage + "&gid=17'>" + gIc["r41"] + "</a>";
					iHTML = iHTML.replace(arXY[j], villageLink);
				};
			};
		};
		return iHTML;
	};

	function convertCoordsInMessagesToLinks() {
		var cM = $xf("//td[@background] | //div[@class='underline']");
		if (!cM) cM = $g('message');
		if (cM) cM.innerHTML = addXYinMsg(cM.innerHTML);
	};

	function setVillageRes(vID, vPop) {
		TB3O.VillageRes = getGMcookieV2("VillageRes");
		if (TB3O.VillageRes[vID] == undefined) TB3O.VillageRes[vID] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (vPop != -1) TB3O.VillageRes[vID][0] = vPop;
		if (vID == actV.vID) {
			for (var i = 0; i < 5; i++) {TB3O.VillageRes[vID][i + 1] = prodPerHour[i];};
		};
		if (vPop == -1) {
			for (var i = 0; i < 4; i++) {
				TB3O.VillageRes[vID][i + 6] = crtResUnits[i];
				TB3O.VillageRes[vID][i + 10] = capacity[i];
			};
		};
		setGMcookieV2("VillageRes", TB3O.VillageRes[vID], vID);
	};

	function addPlayerStatistics() {
		var uTb = $xf("//*[@id='profile'] | //div[@id='" + dmid2 + "']//table[@class='tbg']");
		if (uTb) {
			var pName = setUserName(uTb);
			var iHTML = uTb.rows[0].cells[0].innerHTML.replace(pName, "");
			uTb.rows[0].cells[0].innerHTML = iHTML +  "<a href='" + crtPage + "'>" + pName + "</a>";
		};
		uTb = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg'][2]");
		if (!uTb) uTb = $g("villages");
		if (uTb) {
			var totV = uTb.rows.length - 2;
			var boolUpdate = crtPage.indexOf("spieler.php?uid=" + TB3O.UserID) != -1;
			var totP = parsePlayerTable(uTb, boolUpdate);
			var csp = uTb.rows[2].cells.length - 2;
			//total row (population, villages)
			var trT = $r([['class', 'tb3rnb']]);
			uTb.appendChild(trT);
			var aCell = $c(T('TOTAL'), [['class', 'tb3chnb']]);
			trT.appendChild(aCell);
			var bCell = $c(totP, [['class', 'tb3chnb'], ['style', 'text-align:center;']]);
			trT.appendChild(bCell);
			cCell = $c("", [['class', 'tb3chnb'], ['colspan', csp]]);
			trT.appendChild(cCell);

			//average population per village
			var trAv = $r([['class', 'tb3rnb']]);
			uTb.appendChild(trAv);
			var dCell = $c(T('AVPOPPERVIL'), [['class', 'tb3chnb']]);
			trAv.appendChild(dCell);
			var eCell = $c(Math.round(totP/totV), [['class', 'tb3chnb'], ['style', 'text-align:center;']]);
			trAv.appendChild(eCell);
			var fCell = $c("", [['class', 'tb3chnb'], ['colspan', csp]]);
			trAv.appendChild(fCell);
			//move the "(capital)" string to the same line as the name of the capital
			var aSpan = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7']//span[@class='c'] | //div[@id='" + dmid2 +"']//table[@id='villages']//span");
			if (aSpan) {
				aSpan.style.cssFloat = '';
				aSpan.style.display = '';
				//save capital name and capital coordinates as GM "cookies"
				if (crtPage.indexOf("spieler.php?uid=" + TB3O.UserID) != -1) {
					var aCap = aSpan.parentNode.getElementsByTagName("A")[0];
					var nCap = aCap.textContent;
					TB3O.U[3] = nCap;
					TB3O.U[4] = aCap.href.match(/\?d=(\d+)/)[1];
					cxy = id2xy(TB3O.U[4]);
					var xyCap = cxy[0] + "|" + cxy[1];
					//log(3, "nCap = " + TB3O.U[3] + "; vID = " + TB3O.U[4] + "; xyCap = " + xyCap);
					TB3O.U[6] = xyCap;
					setGMcookieV2('UserInfo', TB3O.U, 'UsI');
				};
			};
		};
		uTb = null;
	};

	function createTroopInfoTooltip(tt, tInfo) {
		return function() {
			cSt0 = 'padding:2px; font-size:8pt; ';
			cSt1 = cSt0 + 'text-align:' + docDir[0] + '; ';
			cSt2 = cSt0 + 'text-align:' + docDir[1] + '; ';
			cSt3 = 'border-' + docDir[1] + ':1px grey solid; ';
			cSt4 = 'border-bottom:1px grey solid;';

			imgSpeed = "speed" + docDir[0].substring(0,1);
			tSpeed = "-";
			aTb = $t([['class', 'tb3tbnb']]);

			if (tInfo[1] != "") {
				aRow1 = $r();
				aRow1.appendChild($c(tInfo[1], [['style', 'text-align:center; font-size:8pt; font-weight:bold;'], ['colspan', '6']]));
				aTb.appendChild(aRow1);
			};
			aRow2 = $r();
			//attack power row
			aRow2.appendChild($c(gIc["att_all"], [['style', cSt1 + cSt4]]));
			aRow2.appendChild($c(uc[tInfo[0]][5], [['style', cSt2 + cSt4 + cSt3]]));
			//def power infantry row
			aRow2.appendChild($c(gIc["def_i"], [['style', cSt1 + cSt4]]));
			aRow2.appendChild($c(uc[tInfo[0]][6], [['style', cSt2 + cSt4 + cSt3]]));
			//def power cavalry row
			aRow2.appendChild($c(gIc["def_c"], [['style', cSt1 + cSt4]]));
			aRow2.appendChild($c(uc[tInfo[0]][7], [['style', cSt2 + cSt4]]));
			aTb.appendChild(aRow2);

			aRow3 = $r();
			//speed only for troops as animals do not move
			if (tInfo[0] < 31) {
				tSpeed = uc[tInfo[0]][8];
				if (crtPage.indexOf('speed') != -1) tSpeed = tSpeed * 2;
			};
			aRow3.appendChild($c("<img src='" + image[imgSpeed] + "'>", [['style', cSt1]]));
			aRow3.appendChild($c(tSpeed, [['style', cSt2 + cSt3]]));
			//can carry
			aRow3.appendChild($c(gIc["capacity"], [['style', cSt1]]));
			aRow3.appendChild($c(uc[tInfo[0]][4], [['style', cSt2 + cSt3]]));
			//crop consumption
			aRow3.appendChild($c(gIc["r5"], [['style', cSt1]]));
			aRow3.appendChild($c(uc[tInfo[0]][9], [['style', cSt2]]));
			aTb.appendChild(aRow3);

			tt.innerHTML = "";
			tt.appendChild(aTb);
			tt.style.display = 'block';
			tt.style.zIndex = 20000;
		};
	};

	function showTroopInfoInTooltips() {
		var arImg = document.images;
		var aTooltip = $g('tb_tooltip');
		if (!aTooltip) aTooltip = createTooltip();
		for (var i = 0; i < arImg.length; i++) {
			var tImg = arImg[i];
			var tInfo = getTroopIndexTitleFromImg(tImg);
			if (tInfo[0] > 0 && tInfo[0] < 51) {
				if (tInfo[1] == '') {
					//for the dorf1.php page where there is no title attribute to the image
					var xRow = tImg.parentNode;
					if (xRow) {
						if (xRow.getAttribute("href")) {
							xRow = xRow.parentNode;
							if (xRow) xRow = xRow.parentNode;
						} else xRow = xRow.parentNode;
						if (xRow) {
							try {
								tCell = xRow.cells[2];
								if (tCell) tInfo[1] = tCell.textContent;
							} catch(e) {};
						};
					};
				};
				tImg.removeAttribute('title');
				tImg.addEventListener("mouseover", createTroopInfoTooltip(aTooltip, tInfo), 0);
				tImg.addEventListener("mouseout", function() {aTooltip.style.display = 'none';}, 0);
			};
		};
	};

	function addSelectAllCheckbox(intRows, mrTable) {
		//check for the "s10" element to avoid double checkbox from other scripts
		if (!$g("s10")) {
			//selectAll
			sAcell = mrTable.rows[intRows - 1].cells[0];
			sAcolspan = sAcell.getAttribute("colspan");
			if (sAcolspan) {
				if (sAcolspan == "2") {
					$at(sAcell, [['colspan', '1']]);
					sAcell.removeAttribute('class');
					if (TB3O.T35 == false) {
						bCell = $c(sAcell.innerHTML, [['style', 'text-align:' + docDir[0] + ';']]);
					} else {
						bCell = $e("TH", sAcell.innerHTML);
						$at(bCell, [['class', 'buttons']]);
					};
					insertAfter(sAcell, bCell);
				};
			};
			sAcell.innerHTML = '<input id="s10" name="s10" onclick="Allmsg(this.form);" style="vertical-align:bottom;" type="checkbox">';
			//now append the archive button if necessary
			if (!TB3O.plusAcc) {
				bRow = mrTable.rows[intRows - 1].cells[1];
				if (bRow) {
					bRiHTML = bRow.innerHTML;
					if (TB3O.T35 == false) {
						if (bRiHTML.toUpperCase().indexOf("ARCHIVE") == -1) bRow.innerHTML += '<input class="std" type="submit" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					} else {
						if (bRiHTML.toUpperCase().indexOf("BTN_ARCHIV") == -1) bRow.innerHTML += '&nbsp;&nbsp;<input id="btn_archiv" class="dynamic_img" type="image" src="' + xGIF + '" alt="' + T('ARCHIVE') + '" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					};
				};
			};
		};
	};

	function createDelRepTable(arA) {
		//cSt = 'text-align:center;';
		var delTb = $t([['id', 'delreptable']]);
		var iMax = (arA.length > 5 ? 5 : arA.length);
		var tRow = $r([['class', 'rh']]);
		var tCell = $c(T('MTCL'), [['class', 'cc'], ['colspan', iMax]]);
		tRow.appendChild(tCell);
		var bRow = $r([['class', 'rh']]);
		var cRow = $r();
		for (var i = 0; i < iMax; i++) {
			bTitle = arA[i].firstChild.nodeValue;
			bCell = $c(bTitle, [['class', 'cc']]);
			bRow.appendChild(bCell);
			cLink = $a("", [['href', jsVoid]]);
			cLink.appendChild($img([['src', image["btnDel"]], ['title', T('ELIMINAR') + " " + bTitle]]));
			cLink.addEventListener('click', delete10Reports(i, arA), false);
			cCell = $c("");
			cCell.appendChild(cLink);
			cRow.appendChild(cCell);
		};
		delTb.appendChild(tRow);
		delTb.appendChild(bRow);
		delTb.appendChild(cRow);
		return delTb;
	};

	function delete10Reports(i, arA) {
		return function() {
			setGMcookie("reportsPageToDelete", arA[i].href, false);
			setGMcookie("reportsPageToReturnTo", crtPage, false);
			setGMcookie("reportsDeleteAll", "1", false);
			location.href = arA[i].href;
		};
	};

	function MessageOptions(){
		if (crtPage.indexOf("nachrichten.php") != -1) {
			genLink = "nachrichten.php?s=";
			archLink = ' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>';

			//code provided by rtellezi for enabling sending message by pressing the CTRL+ENTER keys.
			//modified by ms99 to apply only to the "igm" textarea
			if (document.evaluate) {
				arrInp = $xf("//textarea[@id='igm']", 'l');
				for (var i = 0; i < arrInp.snapshotLength; i++) {
					t = arrInp.snapshotItem(i);
					t.addEventListener("keydown", sendMessage, 0);
				};
			};
		} else if (crtPage.indexOf("berichte.php") != -1) {
			genLink = "berichte.php?s=";
			archLink = ' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>';
		};

		if ($g("adressbuch") || $g("adbook")) return;
		topMenu = $xf("//p[@class='txt_menue']");
		if (!topMenu) topMenu = $g('textmenu');

		if (document.evaluate) {
			arrInp = $xf("//textarea[@id='igm']", 'l');
			for (var i = 0; i < arrInp.snapshotLength; i++) {
				t = arrInp.snapshotItem(i);
				t.addEventListener("keydown", sendMessage, 0);
			};
			navLinks = $xf("//div[@id='" + dmid2 + "']//a[contains(@href, 'berichte.php?s=')] | //div[@id='" + dmid2 + "']//a[contains(@href, 'nachrichten.php?s=')]", 'l');
			if (navLinks.snapshotLength > 0) document.addEventListener("keydown", navToPage, 0);
		};

		//add the Archive option to the menu if PLUS not available and if the Archive link is not already present (added by other scripts)
		if (!TB3O.plusAcc) {
			if (topMenu) {
				tMiHTML = topMenu.innerHTML.split("|");
				bAddArchL = false;
				if (genLink.indexOf("nachrichten.php") != -1 && tMiHTML.length < 4) bAddArchL = true;
				if (genLink.indexOf("berichte.php") != -1 && tMiHTML.length < 6) bAddArchL = true;
				if (bAddArchL == true) topMenu.innerHTML += archLink;
			};
		};

		if (crtPage.indexOf("berichte.php") != -1 && crtPage.indexOf("&id=") == -1 && topMenu) {
			var arrMLinks = $xf("//p[@class='txt_menue']//a | //div[@id='textmenu']//a", 'l');
			if (TB3O.O[61] == '1') {
				var aLinks = new Array();
				for (var i = 0; i < arrMLinks.snapshotLength; i++) {aLinks[i] = arrMLinks.snapshotItem(i);};
				var delTb = createDelRepTable(aLinks);
				var lastDiv = $g(dmid2);
				if (lastDiv) {
					var newPar = $e("P", "");
					insertAfter(lastDiv.lastChild, newPar);
					newPar.appendChild(delTb);
				};
			};
		};

		if (crtPage.indexOf("?newdid=") != -1 && crtPage.indexOf("&id=") != -1) return;

		//general variables needed for this function
		var mrTable;
		mrTable = $g("overview");
		if (!mrTable) {
			mrTable = $xf("//table[@class='reports std'] | //table[@class='tbg']");
			mrTable.id = "overview";
		};
		
		addSelectAllCheckbox(mrTable.rows.length, mrTable);

		deleteReports();

		//get the number of pages to preload from server
		intMRP = parseInt(TB3O.O[59]) + 1;
		if (intMRP > 5) intMRP = 4;
		var pageNo1 = crtPage.indexOf("?s=");
		var intPage = 0;
		if (pageNo1 != -1) {
			var pageNoS1 = crtPage.substring(pageNo1 + 3);
			intPage = Math.round(parseInt(pageNoS1) / 10);
		};
		if (intMRP > 1) {
			for (var i = 1; i < intMRP; i++) {setTimeout(createMrPreloadFunc(i + intPage), getRndTime(i * 498));};
			var X2 = (intMRP + intPage) * 10;
			var X1 = (intPage - intMRP) * 10;

			var addLink = (crtPage.indexOf("t=") != -1 ? "&" + crtPage.substr(crtPage.indexOf("t="),3) : "");

			var tdbfLinks = mrTable.rows[mrTable.rows.length - 1].cells[2];
			if (tdbfLinks) {
				//var aSpan;
				if (X1 < 0) {
					var aSpan = $e("SPAN", "«");
					$at(aSpan, [['class', 'c'], ["style", "font-weight:bold;"]]);
				} else var aSpan = $a("« ", [['style', 'font-weigth:bold'], ['href', genLink + X1 + addLink]]);
				var fwLink = $a("»&nbsp;", [['style', 'font-weight:bold'], ['href', genLink + X2 + addLink]]);
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			};
		};

		//code provided by rtellezi for sending message by pressing CTRL+ENTER
		//modified by ms99 to work only on the form action='nachrichten.php' and form name='msg'
		function sendMessage(event) {if (event.keyCode == 13 && event.ctrlKey) {var mF = $xf("//form[@name='msg']"); if (mF) mF.submit();}; return;};

		function navToPage(event) {
			var evCode = event.keyCode;
			if (evCode == 37) {
				for (var i = 0; i < navLinks.snapshotLength; i++) {
					if (navLinks.snapshotItem(i).textContent == "«") location.href = navLinks.snapshotItem(i).href; break;
				};
			} else if (evCode == 39) {
				for (var i = 0; i < navLinks.snapshotLength; i++) {
					if (navLinks.snapshotItem(i).textContent == "»") location.href = navLinks.snapshotItem(i).href; break;
				};
			};
			return;
		};

		function createMrPreloadFunc(page) {
			var aX = (crtPage.indexOf("t=") != -1 ? "&" + crtPage.substr(crtPage.indexOf("t="), 3) : "");
			return function() {ajaxRequest(genLink + (page * 10) + aX, "GET", null, processMrPage, dummy);};
		};

		function processMrPage(t) {
			var ans = $d(t.responseText);
			var ansdoc = document.implementation.createDocument("", "", null);
			ansdoc.appendChild(ans);
			
			var aTb = $xf("//table[@id='overview'] | //table[@class='reports std'] | //table[@class='tbg']", 'f', ans, ansdoc);
			if (aTb) {
				var maxR = aTb.rows.length;
				var mrTb = $g("overview");
				var mrFoot = mrTb.tFoot;
				if (!mrFoot) {var lastRow = mrTb.rows[mrTb.rows.length - 1]; removeElement(lastRow);};
				if (maxR > 3) {
					xBody = mrTb.tBodies[0];
					var oFragment = null;
					if (xBody) oFragment = document.createDocumentFragment();
					for (var xi = 1; xi < maxR - 1; xi++) {
						var aRow = aTb.rows[xi];
						var xRow = $r();
						var noC = aRow.cells.length;
						if (noC > 1) {
							for (var yi = 0; yi < noC; yi++) {
								var xCell = $c(aRow.cells[yi].innerHTML);
								if (TB3O.T35 == true) xCell.className = aRow.cells[yi].className;
								var iHTML = xCell.innerHTML;
								if (iHTML.indexOf("spieler.php") != -1) {
									var aNode = xCell.childNodes[0];
									xCell.className = 'topic';
									if (aNode.href.search(/spieler.php\?uid=(\d+$)/) > 0) {
										uid = RegExp.$1;
										insertUserLinks(aNode, uid, aNode.textContent);
									};
								};
								if (TB3O.O[60] == "1" && (iHTML.indexOf("nachrichten.php?id=") != -1 || iHTML.indexOf("berichte.php?id=") != -1)) addReadMesRepInPopup(xCell.childNodes[0]);
								if (yi == 1) {
									$at(xCell, [['style', 'text-align:' + docDir[0] + ';']]);
									if (TB3O.TB35 == false) $at(xCell, [['class', 's7']]);
								};
								xRow.appendChild(xCell);
							};
							if (oFragment) oFragment.appendChild(xRow); else mrTb.appendChild(xRow);
						};
					};
					if (oFragment) xBody.appendChild(oFragment);
				};
				if (!mrFoot) mrTb.appendChild(lastRow);
			};
		};
	};

	function pauseScript(ms) {
		var ms1 = getRndTime(ms);
		var aDate = new Date();
		var crtDate = new Date();
		do {crtDate = new Date();}
		while (crtDate - aDate < ms1);
	};

	function deleteReports() {
		var bDR = getGMcookie("reportsDeleteAll", false);
		if (bDR != '1') return;
		if (getGMcookie("reportsPageToDelete", false) == '') return;
		if (crtPage.indexOf("berichte.php") != -1) {
			pauseScript(500);
			allCB = $xf("//input[@type='checkbox' and not (@id)]", 'l');
			btnSa = document.getElementsByName("s10");
			btnDel = document.getElementsByName("del");
			if (!btnDel) btnDel = $g("btn_delete");
			if (allCB.snapshotLength > 0 && btnSa && btnDel) {
				//now delete the reports without checking the correct address of the reports page
				btnSa[0].click();
				pauseScript(500);
				btnDel[0].click();
			} else {
				setGMcookie("reportsDeleteAll", "0", false);
				setGMcookie("reportsPageToDelete", '', false);
			};
		} else {
			setGMcookie("reportsDeleteAll", "0", false);
			setGMcookie("reportsPageToDelete", '', false);
		};
	};

	function getMerchantsInformation() {
		//get the current capacity of the merchants for this village
		var mCc = getGMcookieV2("merchantscapacity");
		if (mCc && mCc[actV.vID]) TB3O.Mcap = parseInt(mCc[actV.vID]);
		xLng['MERCHANTS'] = getGMcookie("merchantsName", false);
		if (xLng['MERCHANTS'] == "false") xLng['MERCHANTS'] = '';
	};

	function getStatisticsMenu() {
		var arStat = new Array();
		var tM = $xf("//div[@id='" + dmid2 + "']//p//a | //div[@id='" + dmid2 + "']//div[@id='textmenu']//a | //p[@class='txt_menue']//a", 'l');
		var im = 0;
		if (tM.snapshotLength > 0) {
			for (var xi = 0; xi < tM.snapshotLength; xi++) {
				arStat[0] = tM.snapshotItem(xi).text;
				var aLink = tM.snapshotItem(xi).href;
				arStat[1] = aLink.substring(aLink.lastIndexOf("/"));
				var aX = arStat[1].split("=");
				im = (aX.length > 1 ? parseInt(aX[1]) : 1);
				setGMcookieV2('statistics', arStat, im);
			};
		};
		tM = $xf("//div[@class='sub']//a | //div[@id='submenu']//a", 'l');
		if (tM.snapshotLength > 0) {
			for (var i = 0; i < tM.snapshotLength; i++) {
				arStat[0] = tM.snapshotItem(i).title;
				var aLink = tM.snapshotItem(i).href;
				arStat[1] = aLink.substring(aLink.lastIndexOf("/"));
				im = parseInt(arStat[1].split("=")[1]);
				setGMcookieV2('statistics', arStat, im);
			};
		};
	};

	function showSearchBar() {
		if (TB3O.O[32] != "1") return;

		sbc = getGMcookieV2('statistics');
		if (!sbc || !sbc[1]) return;

		aForm = createSearchForm(sbc);
		if (TB3O.O[33] == '1') {
			if (TB3O.O[74] == '0') aForm.style.display = 'none';
			var xy = TB3O.O[79].split("|");
			div = createFloatingDiv(300, xy[0], xy[1], "?", "searchbar", "searchbarTT", true);
			TB3O.nTASb = div;
			TB3O.nTASb.appendChild(aForm);
		} else $g(dlright1).insertBefore(aForm, $g(dlright1).firstChild);
	};

	function createSearchForm(sbc) {
		var aForm = $e("FORM");
		$at(aForm, [['id', 'searchform'], ['action', 'statistiken.php?id=' + TB3O.O[83]], ['method', 'POST'], ['style', 'padding:10px; border:1px solid #C0C0C0; width:277px;']]);
		
		var aPar = $e("P", "");
		aPar.setAttribute('style', 'margin-top:20px;');
		var i1 = $e("INPUT", "");
		$at(i1, [['id', 'searchopt'], ['type', 'hidden'], ['value', TB3O.O[83]]]);
		var i2 = $e("INPUT", "");
		$at([['type', 'text'], ['maxlength', '20'], ['size', '10'], ['value', ''], ['style', 'font-size:8pt; margin:2px;']]);
		var i3 = $e("INPUT", "");
		$at(i3, [['type', 'submit'], ['name', 'submit'], ['value', '?'], ['style', 'font-size:8pt']]);

		if (TB3O.M35 == 2) {i2.name = 'name'; i2.className = 'text name';} else if (TB3O.M35 == 1) {i2.name = 'name'; i2.className = "spieler fm";} else if (TB3O.T35 == false) {i2.name = 'spieler'; i2.className = 'fm f80';};

		var s1 = $e("SELECT", "");
		s1.id = 'searchtype';
		s1.setAttribute('style', 'font-size:8pt; margin:2px;');
		s1.options[0] = new Option(sbc[1][0], 1, false, iSS(1000));
		s1.options[1] = new Option(sbc[2][0], 2, false, iSS(2));
		s1.options[2] = new Option(sbc[4][0], 4, false, iSS(4));
		s1.options[3] = new Option(sbc[31][0], 31, false, iSS(31));
		s1.options[4] = new Option(sbc[32][0], 32, false, iSS(32));
		if (TB3O.T35 != false && sbc[8]) s1.options[5] = new Option(sbc[8][0], 8, false, iSS(8));
		s1.addEventListener('change', setSearchBarOption, false);

		if (TB3O.O[33] == '1') aForm.appendChild(aPar);
		aForm.appendChild(i1);
		aForm.appendChild(i2);
		aForm.appendChild(s1);
		aForm.appendChild(i3);

		return aForm;

		function iSS(opt) {return (opt == parseInt(TB3O.O[83])) ? true : false;};
		function setSearchBarOption() {
			var searchType = $g("searchtype").value;
			TB3O.O[83] = '' + searchType;
			setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');
			var i1 = $g("searchopt");
			if (i1) i1.value = searchType;
			var aForm = $g("searchform");
			if (aForm && TB3O.T35 == true) aForm.action = 'statistiken.php?id=' + searchType;
			i1 = null;
			aForm = null;
		};
	};

	function setGMcookieV2(aName, aValue, newdid) {
		if (newdid == 0) return;
		var nC = composeGMcookieNameV2(aName);
		var cV = getGMcookieV2(aName);
		if (cV == 'false' | cV == false) cV = {};
		cV[newdid] = aValue;
		if (aValue) GM_setValue(nC, uneval(cV)); else GM_setValue(nC, false);
	};

	function getArrBiP() {
		var arrBiP = new Array();
		retVal = null;	
		divName = "building_contract";
		dlB = $g(divName);
		if (!dlB) {
			divName = divName = "building_contract2"; dlB = $g(divName);
			if (!dlB) {
				divName = "lbau1"; dlB = $g(divName);
				if (!dlB) {divName = "lbau2"; dlB = $g(divName);};
			};
		};
		if (dlB) {
			BiPtb = $xf("//div[@id='" + divName + "']//table | //div[@id='" + dmid1 + "']//table[@id='" + divName + "']");
			for (xi = 0; xi < BiPtb.rows.length; xi++) {
				if (BiPtb.rows[xi].cells.length > 1)	{
					tdD = BiPtb.rows[xi].cells[2];
					tdDS = tdD.getElementsByTagName("SPAN")[0];
					dEnd = new Date();
					dEnd.setTime(dEnd.getTime() + toSeconds(tdDS.textContent) * 1000);
					arrBiP[arrBiP.length] = new xBiP(BiPtb.rows[xi].cells[1].textContent.split(" ("), dEnd.getTime());
				};
			};
			retVal = arrBiP;
		};
		setGMcookieV2('BiP', arrBiP, actV.vNewdid);
		arrBiP = null;
		return retVal;
	};
	
	function fillinwarsim() {
		if (TB3O.O[55] != '1') return;
		var aTb = $xf("//table[@id='attacker'] | //table[@class='fill_in']");
		if (!aTb) return;
		TB3O.hOffBonus = getGMcookie("heroV", false);
		if (TB3O.hOffBonus == "false") setGMcookie("heroV", "0", false);
		tTc = getGMcookieV2("Troops");
		if (tTc && tTc[actV.vNewdid]) eT = tTc[actV.vNewdid]; else return;
		aInputs = aTb.getElementsByTagName("INPUT");
		if (aInputs.length > 0) {
			j = 1;
			for (var i = 0; i < aInputs.length; i++) {
				if (aInputs[i].name == "a1_" + j) {
					//only the troop number input fields
					aInputs[i].value = (eT[j - 1] > 0 ? eT[j - 1] : "");
					j += 1;
				} else if (aInputs[i].name == "ew1") aInputs[i].value = TB3O.AVP; else if (aInputs[i].name = "h_off_bonus") aInputs[i].value = TB3O.hOffBonus;
			};
		};
		aTb = null;
		aInputs = null;
	};
	
	//© Copyright 2007 Richard Laffers
	//Start of Drag-n-drop
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;

	function mouseCoords(ev) {return {x:ev.pageX, y:ev.pageY};};

	function getMouseOffset(target, ev){
		var docPos = getPosition(target);
		var mousePos = mouseCoords(ev);
		return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
	};

	function getPosition(e) {
		var dx = 0;
		var dy = 0;
		while (e.offsetParent){
			dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
			dy += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
			e = e.offsetParent;
		};
		dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		dy  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		return {x:dx, y:dy};
	};

	function mouseMove(ev) {
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		if (dragObject) {
			oSpos = dragObject.style.position;
			dragObject.style.position = 'absolute';
			dragObject.style.top = (mousePos.y - mouseOffset.y) + 'px';
			dragObject.style.left = (mousePos.x - mouseOffset.x) + 'px';
			dragObject.style.position = oSpos;
		};
		lMouseState = iMouseDown;
		return false;
	};

	function mouseUp(ev){
		if (dragObject) {
			var dOx = dragObject.style.left;
			var dOy = dragObject.style.top;
			var strXY = (dOx + "|" + dOy).replace("px", '').replace("px", '');
			switch (dragObject.id) {
				case "resbarTT": i = 75; break;
				case "userbookmarksTT": i = 76; break;
				case "noteblockTT": i = 77; break;
				case "vl2tableTT": i = 78; break;
				case "searchbarTT": i = 79; break;
			};
			TB3O.O[i] = strXY;
			setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');
		};
		dragObject = null;
		iMouseDown = false;
	};

	function mouseDown(ev){
		var target = ev.target;
		iMouseDown = true;
		if (target.getAttribute('DragObj')) return false;
	};

	function makeDraggable(parent, item){
		document.addEventListener('mousemove', mouseMove, false);
		document.addEventListener('mousedown', mouseDown, false);
		document.addEventListener('mouseup', mouseUp, false);
		if (!parent || !item) return;
		item.addEventListener('mousedown',function(ev){
			dragObject = parent;
			mouseOffset = getMouseOffset(parent, ev);
			document.body.appendChild(parent);
			return false;
		}, false);
	};
	//End of Drag-n-drop

	//script runtime
	function showTBTotalRuntime(){
		var aD = $xf("//div[@id='ltime']/br");
		if (aD) {
			TB3O.TBEndTime = new Date().getTime();
			tt = $e('SPAN', '');
			tt.appendChild($e("TEXTNODE", " | "));
			tt.appendChild($a(TB3O.shN, [['href', TB3O.usoA], ['target', '_blank'], ['title', T('SCRPURL')], ['style', 'font-size:8pt; font-weight:bold; color:#00FF00']]));
			tt.appendChild($e("TEXTNODE", "&nbsp;(v"));
			tu = $a(TB3O.version, [['href', jsVoid], ['title', T('CHKSCRV')], ['style', 'font-size:8pt; font-weight:bold; color:#00FF00']]);
			tu.addEventListener('click', function() {updScript()}, false);
			tt.appendChild(tu);
			tt.appendChild($e("TEXTNODE", ') time: <b>' + TB3O.TBTRT() + '</b> ms'));
			if (TB3O.T35 == false || TB3O.M35 != 2) tt.appendChild($e("TEXTNODE", ' | (' + (TB3O.T35 == false ? "T3" : "T35") + "-" + TB3O.M35 + ")")); //info GV
			$at(tt, [['style', 'z-index:2000; color:#FFFFFF; width:450px']]);
			aD.parentNode.insertBefore(tt, aD);
		};
	};
	
	//General actions
	setDefLang();
	getGeneralData();
	if (!crtPage.match(/nachrichten/)) {
		//PepiX
		var aI = $xf("//input[@type!='hidden']");
		if (aI) aI.focus();
	};
	if (crtPage.match(/statistiken.php/)) getStatisticsMenu();
	if (!crtPage.match(/karte2.php/)) {
		hideAd(); toJSvoid(); showBigIconsBar(); showDeleteAccount(); leftMenuLinks(); getRace(); addFillTimeRow(); getCrtLocation(); prepareDivDocking(); villageList();
		if (TB3O.plusAcc == false && vNames != '') addVillageNamesScript();
		show2ndVillageList(); showResBarTooltip(); showUserBookmarks(); showNoteBlock(); showHeroStatus();
		if (!crtPage.match(/karte.php/)) {TB3O.boolIsThisNPC = isThisNPC(); TB3O.boolIsNPCExluded = isThisNPCexcluded(); if (TB3O.boolIsThisNPC == true) fillinNPCfields(urlNow);};
	};
	//Actions for specific pages
	if (crtPage.match(/allianz.php/)) allyCalculation();
	if (crtPage.match(/karte.php\?/) && crtPage.match(/d=/)) addTroopTimes();
	if (crtPage.match(/build.php/))	{setTroopsNPC(); TB3O.isTtB = isThisTroopTrainingBuilding(); TimeToExplore(); quickCity(); getMerchantsInformation(); if (isMarketSend() == true) marketSend(); marketSell();};
	if (crtPage.match(/build.php\?(.*)&t=1/)) {addAllyColumnForMarketOffers(); marketBuy();};
	if (crtPage.match(/dorf1/)) {processDorf1(); addAttDefInfoTable();};
	if (crtPage.match(/a2b\.php($|\?newdid=|\?z=)/)) selectAllTroops();//Send troops page
	if (crtPage.match(/dorf2/) || crtPage.match(/build.php\?newdid=/)) processDorf2();
	if (crtPage.match(/a2b.php/)) {quickCity(); defaultAttackType();showLastAttack();};
	if (crtPage.match(/dorf3.php($|\?newdid=(\d+)$)/) || crtPage.match(/dorf3.php/)) processDorf3();
	if (crtPage.match(/build.php\?(.*)&s=2/)) culturePoints();
	if (crtPage.match(/karte.php($|\?z=|\?new)/) || crtPage.match(/karte.php($|\?newdid=(\d+)$)/)) {getUserName(); mapFunctions();};
	if (crtPage.match(/gid=16/) || crtPage.match(/\?id=39/)) tableTotalVillageTroopsV3();
	if (crtPage.match(/nachrichten.php($|\?t=|\?s=|\?newdid=)/) || crtPage.match(/berichte.php($|\?t=|\?s=|\?newdid=)/)) MessageOptions();
	if (crtPage.match(/nachrichten.php\?/)) convertCoordsInMessagesToLinks();
	if (crtPage.match(/berichte.php\?/)) battleReportV2("orig");
	if (crtPage.match(/spieler.php\?/) && crtPage.match(/uid/)) addPlayerStatistics();
	if (crtPage.match(/spieler.php/) && !crtPage.match(/\?/) && vList.length < 2) getSingleTown(); //to capture the change of the singleTown name while in the Profile
	if (TB3O.boolIsNPCExluded == false) NPCUpdate();
	if (isPostNPC()) insertNPCHistoryLink();
	if (crtPage.match(/warsim.php/)) fillinwarsim();

	//General actions continued
	if (getGMcookie("starttimers", false) == "false") setTimers();
	if ((crtPage.match(/gid=16/) || crtPage.match(/\?id=39/)) && TB3O.O[80] == '1') showTroopInfoInTooltips();
	if (!crtPage.match(/gid=16/) && !crtPage.match(/\?id=39/) && TB3O.O[53] == '1') showTroopInfoInTooltips();
	showSearchBar();
	if (!crtPage.match(/\&t=1/)) playerLinks(dmid2);
	playerLinks("llist");
	showTBTotalRuntime();
};

if (window.addEventListener) {
	window.addEventListener('load', functionMain, false);
	document.body.setAttribute("onbeforeunload", '{xLng = null; bCost = null; uc = null; image = null; TB3O = null; wsAnalyser = null; mapAnalyser = null; repSite = null; crtResUnits = null; capacity = null; prodPerHour = null; timeToFill = null; gIc = null; vList = null;}');
} else {
	window.attachEvent('onload', functionMain);
};
