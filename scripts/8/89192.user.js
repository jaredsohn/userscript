// ==UserScript==
// @name 		Script.
// @author		Me.
// @namespace 	T3
// @version 	6.0
// @description	Travian3 Beyond - ML&CN (multilanguage & center numbers)
// @copyright   ֲ© Dream1 2010 ֲ© ms99, 2008-2010 (parts of this script ֲ© Nux, Lux, onetmt, Velonis Petros, Richard Laffers, Szabka, Victor Garcia-aka Croc-)
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
*Copyright ֲ© ms99, 2008-2010
*Parts of this script Copyright ֲ© Nux, 2008
*Setup page behavior Copyright ֲ© Lux, 2008
*Big icons behavior (except default & except Setup) Copyright ֲ© onetmt, 2009
*Until then & Residue calculations Copyright ֲ© Velonis Petros (mail: velonis.gr) , 2009
*Parts of this script Copyright ֲ© Szabka, 2008
*Initial script Copyright Victor Garcia (aka Croc) ֲ©, 2007
*Parts of this script (functions for moving a report/message displayed as a pop-up with the mouse) Copyright ֲ© Richard Laffers, 2007
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
	TB3O.version = '6.0';
	TB3O.TBEndTime = TB3O.TBStartTime;
	TB3O.usoL = 'http://ar-travian.com/showthread.php?t=366973';
	TB3O.usoNo = '';
	TB3O.url = TB3O.usoL + 'source/' + TB3O.usoNo + '.user.js';
	TB3O.shN = 'TB3-ML&CN';
	TB3O.sn = 'Waiting for the storm';
	TB3O.usoA = TB3O.usoL;
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
	TB3O.avBKS = false;
	TB3O.boolShowNPCLink = crtPage.indexOf(".org") == -1;
	TB3O.gServer;
	TB3O.fullServerName;
	TB3O.UserID = '0';
	TB3O.plAc = false;
	TB3O.AVP = 0;
	TB3O.Mcap = 0;
	TB3O.VillageRes = '';
	TB3O.hOffBonus = 0;
	TB3O.speed = false;
	TB3O.tPpH = [0, 0, 0, 0, 0];//total production per hour for all villages -> requires to open all villages on a regular basis to get current data
	TB3O.d2spB = [0, 0, 0, 0, 0, 0, 0, 0, 0];//cpbuilding, barracks, big barracks, workshop, stable, big stable, tournament square, townhall, horse drinking through
	//crt coords
	TB3O.xCrt = -1000;
	TB3O.yCrt = -1000;
	//CN colors (CN_COL_TXT, CN_COL_NEUTRAL, CN_COL_MAX_LVL, CN_COL_NO_UPG, CN_COL_UPG_VIA_NPC)
	TB3O.CNc = ['#000000', '#FDF8C1', '#7DFF7D', '#FF9696', '#FFC84B'];
	TB3O.DFc = ['#000000', 'white'];

	TB3O.wH = window.innerHeight;
	TB3O.wW = window.innerWidth;
	
	TB3O.isTtB = false;
	
	TB3O.lng = 'en';
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
	'1', '1', '1', '1', '1', '1', '1', '0', ddX + '|500', ddX + '|500', ddX + '|500'];
	
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
	'81','lockbookmarks','83', '84', '85', '86', '87', '88', '89', '90'];
	
	//link to the profile
	var spLnk = '';
	//link to the barracks
	var bksLnk = 'build.php?gid=19';
	//available races
	avRace = ['Romans', 'Teutons', 'Gauls'];
	//merchants speed (normal servers)
	var mts = {'Romans': 16, 'Teutons': 12, 'Gauls': 24};
	var mmts = {'Romans': 10.66, 'Teutons': 8, 'Gauls': 16}; 
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
	acss =
	"#upgTable {width:682px; border-collapse:collapse; border:1px solid silver; background-color:" + TB3O.DFc[1] + "; font-size:8pt; margin:1px; padding:2px; text-align:" + docDir[0] + "; empty-cells:show; line-height:16px;}" +
	"table#upgTable table {background-color:transparent; border-collapse:collapse; border:0px none transparent; font-size:8pt; padding:2px; margin:1px; text-align:" + docDir[1] + "; vertical-align:top;}" +
	"table#upgTable tr {background-color:transparent; border-collapse:collapse; border:0px none transparent; font-size:8pt; padding:2px; margin:1px; text-align:" + docDir[1] + "; vertical-align:top;}" +
	"table#upgTable td {background-color:transparent; border:0px none transparent; font-size:8pt; text-align:" + docDir[1] + "; padding:2px; vertical-align:top;}" +
	"table#upgTable td.center {text-align:center; vertical-align:middle;}" +
	"table#upgTable td.tb3uthc {background-color:#ECECEC; border:1px solid silver; vertical-align:middle; font-weight:normal; text-align:center; width:25%; height:18px;}" +
	"table#upgTable td.tb3utbc {background-color:transparent; border:1px solid silver; margin:0px; text-align:center; vertical-align:top; width:25%; height:18px;}" +
	"table#upgTable a {font-size:8pt; font-weight:bold;}" +
	
	"table.rNt {background-color:transparent; border-collapse:collapse; border:0px none transparent; font-size:8pt; padding:2px; margin:1px; text-align:" + docDir[1] + "; vertical-align:top;}" +
	"table.rNt tr {background-color:transparent; border-collapse:collapse; border:0px none transparent; font-size:8pt; padding:2px; margin:1px; text-align:" + docDir[1] + "; vertical-align:top;}" +
	"table.rNt td {background-color:transparent; border:0px none transparent; font-size:8pt; text-align:" + docDir[1] + "; padding:2px; vertical-align:top;}" +
	"table.rNt td.center {text-align:center; vertical-align:middle;}" +
	
	"table#mapTable {width:682px; border-collapse:collapse; border:1px solid silver; background-color:" + TB3O.DFc[1] + "; font-size:8pt; margin:0px; padding:0px; text-align:center; empty-cells:show; line-height:16px;}" +
	"table#mapTable thead td {border:1px solid silver; background-color:#ECECEC; font-size:9pt; font-weight:bold; text-align:center; padding:1px; cursor:default; vertical-align:middle;}" +
	"table#mapTable thead td.tb3mthcp {cursor:pointer;}" +
	"table#mapTable td {border:1px solid silver; background-color:transparent; padding:1px; margin:0px; font-size:8pt; font-weight:normal; text-align:center; vertical-align:middle;}" +
	"table#mapTable td.tb3mtcu {font-weight:bold; color:blue;}" +
	"table#mapTable td.tb3mtcp {padding-" + docDir[1] + ":10px; color:black; text-align:" + docDir[1] + ";}" +

	"div#updDiv {position:absolute; top:200px; " + docDir[0] + ":120px; display:block; padding:1px; z-index:50; clear:both; border:2px solid #C0C0C0; background-color:black; color:yellow;}" +
	
	"table#userbookmarks {border-collapse:collapse; border:0px none transparent; background-color:" + TB3O.DFc[1] + "; line-height:16px;}" +
	"table#userbookmarks tr {text-align:" + docDir[0] + "; vertical-align:middle; padding:0 0 0 2px; margin:0px; white-space:nowrap; border-collapse:collapse; border:0px none transparent;}" +	
	"table#userbookmarks td {border:0px none transparent; background-color:" + TB3O.DFc[1] + "; text-align:" + docDir[0] + "; font-size:13px; font-weight:normal; color:black; padding:2px; vertical-align:middle;}" +
	"table#userbookmarks td.noact {width:10px;}" +
	"table#userbookmarks td.act {width:10px; color:#FF8000;}" +
	"table#userbookmarks img {cursor:pointer;}" +
	"table#userbookmarks span {padding:0 0 0 4px;}" +

	"table#mkls {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB3O.DFc[1] + "; padding:2px; margin:1px; line-height:18px;}" +
	"table#mkls tr {background-color:transparent;}" +
	"table#mkls td {background-color:transparent; border:1px solid silver; font-weight:normal; font-size:8pt; color:black; text-align:" + docDir[1] + "; vertical-align:middle; padding:2px 3px 2px 3px; white-space:nowrap;}" +
	"table#mkls td.mklshh {background-color:#ECECEC; text-align:center; width:16%;}" +
	"table#mkls td.mklsc {text-align:center;}" +
	
	"table#br_table, table#br_table tr {background-color:transparent; border:1px solid #C2C2C2; text-align:center; padding:0px; margin:0px; border-collapse:collapse; width:100%;}" +
	"table#br_table td {background-color: transparent; border:1px solid #C2C2C2; font-size:8pt; text-align:" + docDir[1] + "; padding:2px 7px 2px 2px; margin:0px;}" +
	"table#br_table td.tb3cbrh1 {background-color:#F3F3F3; font-size:10pt; font-weight:bold; color:#000000; text-align:center;}" +
	"table#br_table td.tb3cbrh2 {background-color:#F3F3F3; font-size:10pt; font-weight:bold; color:#FF8000; text-align:center;}" +
	"table#br_table td.tb3cbrh3 {background-color:#F3F3F3; font-size:10pt; font-weight:bold; color:#71D000; text-align:center;}" +
	"table#br_table td.tb3cbrc {text-align:center;}" +
	"table#br_table td.tb3cbrb {font-weight:bold;}" +
	"table#br_table td.tb3cbrr {color:red;}" +
	"table#br_table td.tb3cbrg {color:darkgreen;}" +
	"table#br_table td.tb3cbrbr {font-weight:bold; color:red;}" +
	"table#br_table td.tb3cbrbg {font-weight:bold; color:darkgreen;}" +
	
	"table#mhtt {border-collapse:collapse; border:0px none transparent; font-weight:normal; font-size:8pt; text-align:" + docDir[1] + "; padding:2px; margin:1px; background-color:transparent; empty-cells:show; line-height:16px; white-space:nowrap;}" +
	"table#mhtt tr {border:0px none transparent;}" +
	"table#mhtt td {background-color:transparent; border:0px none transparent; font-weight:normal; font-size:8pt; text-align:" + docDir[1] + "; color:black; padding:2px 7px 2px 0px; margin:0px; vertical-align:middle;}" +
	"table#mhtt td.mCol {color:blue;}" +
	"table#mhtt td.center {text-align:center;}" +
	"table#mhtt td.ld {text-align:" + docDir[0] + "; padding-left:2px;}" +
	"table#mhtt td.dec {text-align:center; font-size:10pt; font-weight:bold; color:green; border-bottom:1px solid grey;}" +
	
	"table#resbar, table#resbar {border-collapse:collapse; border:1px solid silver; background-color:" + TB3O.DFc[1] + "; width:auto; line-height:13px; font-weight:normal; font-size:8pt; padding:2px; margin:1px; white-space:nowrap;}" +
	"table#resbar tr {border-collapse:collapse; border:0px none transparent; padding:0px;}" +
	"table#resbar td.tb3c {border-collapse:collapse; border:1px solid silver; background-color:" + TB3O.DFc[1] + "; width:auto; line-height:13px; font-weight:normal; font-size:8pt; padding:2px; margin:1px; white-space:nowrap;}" +
	"table#resbar td.lr {border:1px solid silver; background-color:transparent; font-weight:normal; font-size:8pt; text-align:" + docDir[1] + ";}" +
	"table#resbar td.tb3cvn {text-align:center; font-weight:bold; font-size:8pt; color:blue; background-color:#E9EEFC; padding:2px;}" +
	"table#resbar td.tb3chtot {text-align:" + docDir[1] + "; font-weight:bold; font-size:8pt; border-" + docDir[0] + ":2px solid silver; background-color:#FFFFC0; padding:2px;}" +
	"table#resbar td.tb3ctot {border:1px solid silver; text-align:" + docDir[1] + "; font-size:8pt; border-" + docDir[0] + ":2px solid silver; background-color:#FFFFC0; padding:2px;}" +
	"table#resbar td.tb3ctotv {text-align:" + docDir[1] + "; font-size:8pt; border-top:2px solid silver;border-bottom:2px solid silver; border-" + docDir[0] + ":1px solid silver; background-color:#ECECEC; padding:2px;}" +
	"table#resbar td.tb3cresbar {border:1px solid silver; background-color:transparent; padding:0px; width:100px;}" +
	"table.rbrtb {border-collapse:collapse; border:0px none transparent; float:left; height:16px; width:100px; background-color:" + TB3O.DFc[1] + ";}" +
	"table.rbrtb tr.rbrtbr, table.rbrtb td {border-collapse:collapse; border:0px none transparent; padding:0px;}" +
	
	"table#vl2table {border-collapse:collapse; border:0 none transparent; background-color:" + TB3O.DFc[1] + "; line-height:13px; font-size:10pt; text-align:center; padding:2px; margin:0px; white-space:nowrap; vertical-align:middle;}" +
	"table#vl2table tr td {border:0 none transparent; background-color:transparent; text-align:" + docDir[0] + "; padding:2px; margin:0px; font-weight:normal; font-size:10pt;}" +
	"table#vl2table td.av {color:#FF8000;}" +
	"table#vl2table td.coord {font-size:8pt;}" +

	"div#side_info {width:700px;}" +
	"div#side_info table tbody td {font-size:8pt; white-space:nowrap; text-align:" + docDir[0] + ";}" +
	"div#side_info table tbody td.link {font-size:10pt;}" +
		
	"table#vlist tbody td.aligned_coords {display:block;}" +       
	"table#vlist {width:auto; background-color:transparent !important; border-collapse:collapse; border:0px none transparent; margin:0px; font-size:13px; font-weight:normal; white-space:nowrap;}" +
	"table#vlist tr	{background-color:transparent;}" +
	"table#vlist tbody td {background-color:transparent; border:0px none transparent; padding:0px 2px 0px 2px; text-align:" + docDir[1] + "; font-size:8pt;}" +
	"table#vlist tr:hover, table#vlist td:hover {background-color:#E5E5F0;}" +
	
	"div.fldiv {position:absolute; display:block; padding:1px; z-index:50; clear:both; border:1px solid #C0C0C0; background-color:" + TB3O.DFc[1] + "; z-index:1000;}" +
	"div.dragdiv {text-align:center; font-weight:bold; height:18px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:#ECECEC; z-index:1000; vertical-align:middle;}" +
	"div.mmdiv {height:18px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:" + TB3O.DFc[1] + "; width:25px;}" +
	"div.closediv {height:18px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:" + TB3O.DFc[1] + "; width:25px;}" +

	"p.delacc {position:absolute; display:block; padding:4px; z-index:2; border:1px solid #00C000; background-color:#FEFFE3; width:130px; text-align:center; " + docDir[1] + ":0px; top:0px;}" +
	"p.delacc span {color:orange;}" +

	"table#noteblock {border-collapse:collapse; border:0px none white; text-align:center; padding:2px; margin:1px; background-color:" + TB3O.DFc[1] + ";}" +
	"table#noteblock tr {background-color:transparent; border:0px none transparent;}" +
	"table#noteblock td {border:0px none transparent; background-color:transparent; text-align:center; padding:2px;}" +
	"#noteblockcontent {border:1px solid silver; padding:0px 2px 0px 2px; overflow:auto; font-size:10pt; white-space:nowrap;}" +
	
	"table#delreptable {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB3O.DFc[1] + "; padding:2px; margin:1px;}" +
	"table#delreptable tr {border:1px solid silver; text-align:center;}" +
	"table#delreptable tr.rh {background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"table#delreptable td {border:1px solid silver; padding:2px;}" +
	"table#delreptable td.cc {font-weight:bold; font-size:10pt;}" +
	
	"table#stla {width:100%; border-collapse:collapse; border:1px solid silver; font-weight:normal; font-size:8pt; color:black; text-align:center; background-color:" + TB3O.DFc[1] + "; padding:1px; margin:1px; line-height:18px;}" +
	"table#stla tr {background-color:transparent;}" +
	"table#stla td {border:1px solid silver; font-size:8pt; text-align:" + docDir[1] + "; vertical-align:middle; padding:1px 2px 1px 2px; white-space:nowrap;}" +
	"table#stla td.stlahh {background-color:#ECECEC; text-align:center; width:5%;}" +
	"table#stla td.stlahh1 {background-color:#ECECEC; text-align:center; width:10%;}" +
	"table#stla td.stlahh2 {background-color:#ECECEC; text-align:center;}" +
	"table#stla td.stlac {background-color:transparent; text-align:center;}" +
	
	"table#soff {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB3O.DFc[1] + "; line-height:18px;}" +
	"table#soff tr {background-color:transparent;}" +
	"table#soff td {background-color:transparent; border:1px solid silver; color:black; text-align:" + docDir[1] + "; vertical-align:middle; padding:2px 3px 2px 1px; white-space:nowrap;}" +
	"table#soff td.soffhh {background-color:#ECECEC; text-align:center; width:16%;}" +
	"table#soff td.soffc {text-align:center;}" +
	
	"input#soff, input#soffG {margin-top:3px;" + (docDir[0] == 'right' ? "margin-right:0px" : "margin-right:3px") + "; margin-bottom:3px;" + (docDir[0] == 'right' ? "margin-left:3px" : "margin-left:0px") + "; padding:0px;}" +

	"table#TB3S	{width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB3O.DFc[1] + "; padding:2px; margin:1px;}" +
	"table#TB3S tr.srh {background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"table#TB3S td {border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse; text-align:" + docDir[0] + "; font-size:8pt;}" +
	"table#TB3S td.srst {background-color:#ECECEC; text-align:" + docDir[0] + "; font-size:9pt; font-weight:bold; color:darkblue;}" +
	"table#TB3S td.s1 {background-color:#ECECEC; text-align:center; width:70%; font-weight:bold;}" +
	"table#TB3S td.s2 {background-color:#ECECEC; text-align:center; width:20%;}" +
	"table#TB3S select, table#TB3S input {font-size:8pt;}" +
	"table#TB3S span {font-size:8pt; font-weight: bold;}" +
	"table#TB3S td.s3 {background-color:#ECECEC; text-align:center; width:10%;}" +
	"table#TB3S img {cursor:pointer;}" +

	"table#cptable {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB3O.DFc[1] + "; padding:2px; margin:1px;}" +
	"table#cptable tr {background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"table#cptable td {border-collapse:collapse; border:1px solid silver; background-color:#ECECEC; padding:2px; font-size:8pt; font-weight:bold;}" +
	"table#cptable td.CG {font-weight:normal; background-color:#C8FFC8;}" +
	"table#cptable td.CR {font-weight:normal; background-color:#FFE1E1;}" +

	"table#mbuyf {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB3O.DFc[1] + "; padding:2px; margin:1px;}" +
	"table#mbuyf tr {border-collapse:collapse; border:1px solid silver; text-align:center;}" +
	"table#mbuyf td {border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse;}" +
	"table#mbuyf td.sf {background-color:#FFE4B5;}" +
	
	"table.allvtroops, table.allvtroops tr td {border-collapse:collapse; border:1px solid silver; text-align:center; padding:2px;}" +
	"table.allvtroops tr th {border-collapse:collapse; border:1px solid silver; text-align:" + docDir[0] + "; padding:2px 7px; width:20%;}" +

	"table#dorf3table, table#dorf3table tr {width:100%; border-collapse:collapse; border:1px solid silver; text-align:center; background-color:" + TB3O.DFc[1] + "; padding:2px; margin:1px; font-size:10pt;}" +
	"table#dorf3table td {border:1px solid silver;}" +
	
	"tr#aRselecttraintroops {border-collapse:collapse; background-color:" + TB3O.DFc[1] + ";}" +
	"tr#aRselecttraintroops td {border:0px none transparent; background-color:transparent; text-align:center; padding:0px 2px 0px 7px;}" +
	
	"table#BiPTM {border-collapse:collapse; border:1px solid silver; background-color:" + TB3O.DFc[1] + ";}" +
	"table#BiPTM tr {border:0px none transparent;}" +
	"table#BiPTM td {border:1px solid silver; font-size:8pt; padding:4px;}" +
	
	//"table#bttable	{width:100%; height:129px; text-align:left; border-collapse:collapse; background-color:transparent;}" +
	
	"tr.cbgx td, td.cbgx {background-color:#FFFFC0; border-collapse:collapse; border:1px solid silver; padding:2px; text-align:center;}" +
		
	"div#tb_tooltip {position:absolute; display:none; padding:2px; z-index:9000; border:1px solid #00C000; background-color:#FFFFCC; -moz-border-radius:5px;}" +
	//"div#tb_tooltip table, div#tb_tooltip tr, div#tb_tooltip td {font-size:8pt; border:0px none transparent; padding:2px; background-color:#FFFFCC;}" +
	//"div#tb_tooptip table#BiPTM {border-collapse:collapse; border:1px solid silver; background-color:" + TB3O.DFc[1] + ";}" +
	
	"div#build.gid17 table#target_select {border-collapse:collapse; border:0px none transparent; background-color:transparent; line-height:21px; width:34%; float:left; margin-" + docDir[0] + ":10px;}" +
	"div#build.gid17 table#target_select td.vil input.text {width:90px;}" +

	"div.npc-general {margin:3px 0 0; font-size:7pt; float:none;} " +
	"span.npc-red {color:#DD0000;} " +
	"span.npc-green {color:#009900;}" +

	"div.CNBT {background-color:" + TB3O.CNc[1] + "; border:1px solid black; -moz-border-radius:2em; " +
	"padding-top:3px; font-family:Arial, Helvetica, Verdana, sans-serif; font-size:9pt; font-weight:bold; " +
	"color:" + TB3O.CNc[0] + "; text-align:center; position:absolute; width:21px; height:18px; cursor:pointer; visibility:hidden; z-index:26;}" +

	//...
	
	"table.tb3tb	{width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB3O.DFc[1] + "; padding:2px; margin:1px;}" +
	"table.tb3tb tr, table.tb3tb td {border:1px solid silver;}" +

	"table.tb3tbnb	{border-collapse:collapse; border:0px none white; font-size:8pt; text-align:center; padding:2px; margin:1px; background-color:" + TB3O.DFc[1] + ";}" +
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
	"td.tb3c		{border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse;}" +
	"td.tb3cnb		{border:0px none transparent; background-color:transparent; text-align:center; padding:2px;}" +
	"td.tb3cbt		{border-top:1px solid silver; font-size:8pt; color:#000000; text-align:center;}" +
	
	"td.desc, td.desc div, td.desc span {font-size:8pt;}" +
	"h1 {z-index:300; padding-top:16px;}";
	
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
	".OuterMsgPageOn {position:absolute; top:0px; left:0px; visibility:visible; width:150%; height:100%; background-color:#000000; z-index:1998; opacity:0.75;}" +
	//".divCloseMsgPageOn {position: absolute; left:73.5%; top:0.2%; visibility:visible; opacity:1; z-index:2000;}" +
	".InnerMsgPageOn {position: absolute; left:25%; top:2.8%; visibility:visible; opacity:1; z-index:1999;}";
	GM_addStyle(cssSetup);
	//------------------------------------------

var t = new Array();

function setDefLang() {
//default = English
//setup

t['0'] = "Script language"; //please, do not translate !!! translation will never be included into the script !
t['1'] = "Travian v2.x server";
t['2'] = 'Remove ad banners';
t['3'] = 'Force T3.1 Legionnaire & Phalanx capacity calculation<br>(for mixed T3.1 & T3.5 servers)';
t['4'] = 'Market';
t['5'] = 'Rally point/Barracks/Workshop/Stable';
t['6'] = "Town hall/Hero's mansion/Armoury/Blacksmith";
t['7'] = "Palace/Residence/Academy/Treasury";
t['8'] = 'Alliance';
t['9'] = "Show additional links in left menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['10'] = "Combat simulator link to use:"; //menu left"
t['11'] = "Link to use for posting reports site";
t['12'] = "Show 'dorf1.php' and 'dorf2.php' links";
t['13'] = 'Show "Center map on this village" icon';
t['14'] = "Show 'Send troops/Send resources' icons in village list";
t['15'] = "Show lumber, clay, iron production per hour in village list";
t['16'] = "Show effective crop production in village list";
t['17'] = "Show population in village list";
t['18'] = 'Show additional (2 columns) village list as floating window';
t['19'] = 'Show information about buildings in progress and troop movements<br>in village list';
t['20'] = 'Show bookmarks';
t['21'] = "Show 'User Bookmarks' as floating window";
t['22'] = 'Show note block';
t['23'] = "Show 'NoteBlock' as floating window";
t['24'] = 'Note block size';
t['25'] = 'Note block height';
t['26'] = 'Show NPC Assistant calculations/links';
t['27'] = "World Analyser to use";
t['28'] = "Show analyser statistic links";
t['29'] = 'Map Analyser to use';
t['30'] = 'Show links to map for users';
t['31'] = 'Show links to map for alliances';
t['32'] = "Show 'Search Bar'";
t['33'] = "Show 'Search Bar' as floating window";
t['34'] = "Show CP/day information in upgrade tables";
t['35'] = "Show crop consumption in upgrade tables";
t['36'] = "Show 'Until then/Residue' calculation in upgrade/training tables";
t['37'] = "Show resource fields upgrade table";
t['38'] = 'Show resource level colours';
t['39'] = "Show 'Resource Bar' table";
t['40'] = "Show 'Resource Bar' table as floating window";
t['41'] = "Show buildings upgrade table";
t['42'] = 'Sort buildings by name in upgrade table';
t['43'] = 'Show center numbers';
t['44'] = 'Show building level colours';
t['45'] = "Show blinking levels for buildings being upgraded";
t['46'] = "Show additional information for every merchant arrival";
t['47'] = "Show last market transport";
t['48'] = "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
t['49'] = 'Rally point default action';
t['50'] = 'No. of scouts for the "Select scout" function';
t['51'] = "Show last attack";
t['52'] = "Show/use coordinates for last attack";
t['53'] = 'Show troops information in tooltips';
t['54'] = 'Show distance and times to villages in tooltips'; 
t['55'] = "Auto fill in available troops for the internal war simulator";
t['56'] = "Show cell type/oasis info<br>while mousing over the map";
t['57'] = 'Show distances & times';
t['58'] = 'Show table of players/villages/occupied oasis';
t['59'] = 'Number of message/report pages to preload<br>(Default = 1)';
t['60'] = 'Show links to open messages/reports in a pop-up';
t['61'] = 'Show "Delete all" table on the Reports page';
t['62'] = 'Show the "Send IGM" icon for me, too';
t['63'] = 'Show TB3 enhanced Battle Reports';
t['64'] = 'Show details in Report Statistics';
t['65'] = 'Color upgrade available<br>(Default = Empty)';
t['66'] = 'Color max level<br>(Default = Empty)';
t['67'] = 'Color upgrade not possible<br>(Default = Empty)';
t['68'] = 'Color upgrade via NPC<br>(Default = Empty)';
t['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING (Default = 0)";
//no t items [70..79] & [80..83]
//t['80'] = t['53'] and t['81'] = t['54'] - both will be set after switchlanguage()
t['82.L'] = 'Lock bookmarks (Hide delete, move up, move down icons)';
t['82.U'] = 'Unlock bookmarks (Show delete, move up, move down icons)';
t['85'] = "Show 'Send troops/Send resources' icons";
t['87'] = "Remember last 1x/2x/3x market send option (if available)";
//setup end
//user info
t['U.2'] = 'Race';
t['U.3'] = 'Name of your capital<br><b>Visit your Profile for an update</b>';
t['U.6'] = 'Coordinates of your capital<br><b>Visit your Profile for an update</b>';
//user info end
t['SIM'] = 'Combat simulator';
t['QSURE'] = 'Are you sure?';
t['LOSS'] = 'Loss';
t['PROFIT'] = 'Profit';
t['EXTAV'] = 'Extension available';
t['PLAYER'] = 'Player';
t['VILLAGE'] = 'Village';
t['POPULATION'] = 'Population';
t['COORDS'] = 'Coordinates';
t['MAPTBACTS'] = 'Actions';
t['SAVED'] = 'Saved';
t['YOUNEED'] = 'You need';
t['TODAY'] = 'today';
t['TOMORROW'] = 'tomorrow';
t['DAYAFTERTOM'] = 'day after tomorrow';
t['MARKET'] = 'Marketplace';
t['BARRACKS'] = 'Barracks';
t['RAP'] = 'Rally point';
t['STABLE'] = 'Stable';
t['WORKSHOP'] = 'Workshop';
t['SENDRES'] = 'Send resources';
t['BUY'] = 'Buy';
t['SELL'] = 'Sell';
t['SENDIGM'] = 'Send IGM';
t['LISTO'] = 'Available';
t['ON'] = 'on';
t['AT'] = 'at';
t['EFICIENCIA'] = 'Efficiency';
t['NEVER'] = 'Never';
t['ALDEAS'] = 'Village(s)';
t['TIEMPO'] = 'Time';
t['OFREZCO'] = 'Offering';
t['BUSCO'] = 'Searching';
t['TIPO'] = 'Type';
t['DISPONIBLE'] = 'Only available';
t['CUALQUIERA'] = 'Any';
t['YES'] = 'Yes';
t['NO'] = 'No';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Bookmarks';
t['ANYADIR'] = 'Add';
t['UBU'] = 'New Bookmark URL';
t['UBT'] = 'New Bookmark Text';
t['DEL'] = 'Delete';
t['MAPA'] = 'Map';
t['MAXTIME'] = 'Maximum time';
t['ARCHIVE'] = 'Archive';
t['SUMMARY'] = 'Summary';
t['TROPAS'] = 'Troops';
t['CHKSCRV'] = 'Update TBeyond';
t['ACTUALIZAR'] = 'Update village information';
t['VENTAS'] = 'Saved Offers';
t['MAPSCAN']  = 'Scan the Map';
t['BIC'] = 'Show extended icons';
t['SAVE'] = 'Save';
t['AT2'] = 'Reinforcement';
t['AT3'] = 'Attack: Normal';
t['AT4'] = 'Attack: Raid';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normal (small)';
t['NBSB'] = 'Large screen (large)';
t['NBHAX'] = 'Automatic expand height';
t['NBHK'] = 'Default height';
t['NPCSAVETIME'] = 'Save: ';
t['TOTALTROOPS'] = 'Total village troops';
t['SELECTALLTROOPS'] = "Select all troops";
t['PARTY'] = "Festivities";
t['CPPERDAY'] = "CP/day";
t['SLOT'] = "Slot";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Select scout";
t['SELECTFAKE'] = "Select fake";
t['NOSCOUT2FAKE'] = "It's impossible to use scouts for a fake attack !";
t['NOTROOP2FAKE'] = "There aren't troops for a fake attack!";
t['NOTROOP2SCOUT'] = "There aren't troops to scout !";
t['NOTROOPS'] = "There aren't troops in the village !";
t['ALL'] = "All";
t['SH2'] = "In color fields you may enter:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
t['SOREP'] = "Show original report (for posting)";
t['WSIMO1'] = "Internal (provided by the game)";
t['WSIMO2'] = "External (provided by kirilloid.ru)";
t['NONEWVER'] = "You have the latest version available";
t['BVER'] = "You may have a beta version";
t['NVERAV'] = "A new version of the script is available";
t['UPDSCR'] = "Update script now ?";
t['CHECKUPDATE'] = "Checking for script update.<br>Please wait...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Average population per village";
t['AVPPP'] = "Average population per player";
t['MAX'] = 'Max';
//version 3.0.7
t['TOTTRTR'] = 'Total troops training';
//version 3.1.3
t['TB3SL'] = TB3O.shN + ' Setup';
t['UPDALLV'] = 'Update all villages.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
//version 3.1.7
t['LARGEMAP'] = 'Large map';
//version 3.1.9
t['USETHEMPR'] = 'Use them (proportional)';
t['USETHEMEQ'] = 'Use them (equal)';
//version 3.2
t['TOWNHALL'] = 'Town Hall';
t['GSRVT'] = 'Game server';
t['ACCINFO'] = 'Account Information';
t['NBO'] = 'Noteblock';
t['MNUL'] = 'Menu on the left side';
t['STAT'] = 'Statistics';
t['RESF'] = 'Resource fields';
t['VLC'] = 'Village center';
t['MAPO'] = 'Map options';
t['COLO'] = 'Color options';
t['DBGO'] = 'Debug options';
t['HEROSMANSION'] = "Hero's mansion";
t['BLACKSMITH'] = 'Blacksmith';
t['ARMOURY'] = 'Armoury';
t['NOW'] = 'Now';
t['CLOSE'] = 'Close';
t['USE'] = 'Use';
t['USETHEM1H'] = 'Use them (1 hour production)';
t['OVERVIEW'] = 'Overview';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Attacks';
t['NEWS'] = 'News';
t['ADDCRTPAGE'] = 'Add current';
t['SCRPURL'] = 'TBeyond page';
t['SPACER'] = 'Spacer';
t['MEREO'] = 'Messages & Reports';
t['ATTABLES'] = 'Troop tables';
t['MTW'] = 'Wasted';
t['MTX'] = 'Exceeding';
t['MTC'] = 'Current load';
t['ALFL'] = 'Link to external forum<br>(Leave empty for internal forum)';
t['MTCL'] = 'Clear all';
t['CKSORT'] = 'Click to sort';
t['MIN'] = 'Min';
t['SVGL'] = 'Shared among villages';
t['VGL'] = 'Village List';
t['UPDATEPOP'] = 'Update population';
t['EDIT'] = 'Edit';
t['NPCO'] = 'NPC Assistant options';
t['NEWVILLAGEAV'] = 'Date/Time';
t['TIMEUNTIL'] = 'Time to wait';
t['CENTERMAP'] = 'Center map on this village';
t['SENDTROOPS'] = 'Send troops';
t['PALACE'] = "Palace";
t['RESIDENCE'] = "Residence";
t['ACADEMY'] = "Academy";
t['TREASURY'] = "Treasury";
t['UPGTB'] = "Resource fields/buildings upgrade tables";
t['RBTT'] = "Resource Bar";
//3.8.7.5
t['RESIDUE'] = 'The residue if you build it ';
t['RESOURCES'] = 'Resources';
//3.8.7.6.3
t['SH1'] = "Open your Profile for automatic capital/coordinates detection<br>Build the barracks for automatic race detection and then open the village center";
t['RESEND'] = "Send again ?";
//3.8.8.8.9
t['WSI'] = "War simulator provided by the game";
t['TTT'] = "General troops/distance tooltips";
};

function switchLanguage() {
switch (arAvLang[TB3O.O[0]]) {
case "it"://IcEye, rosfe y Danielle, Lello, Zippo, Nux, ns65, Acr111, onetmt, matteo466
//avRace = ['Romani', 'Teutoni', 'Galli'];
t['8'] = 'Alleanza';
t['SIM'] = 'Simulatore di combattimento';
t['QSURE'] = 'Sei sicuro?';
t['LOSS'] = 'Perdita in materiale';
t['PROFIT'] = 'Guadagno';
t['EXTAV'] = 'Ampliamento disponibile';
t['PLAYER'] = 'Proprietario';
t['VILLAGE'] = 'Villaggio';
t['POPULATION'] = 'Popolazione';
t['COORDS'] = 'Coordinate';
t['MAPTBACTS'] = 'Azioni';
t['SAVED'] = 'Salvato';
t['YOUNEED'] = 'Mancano';
t['TODAY'] = 'oggi';
t['TOMORROW'] = 'domani';
t['DAYAFTERTOM'] = 'dopodomani';
t['MARKET'] = 'Mercato';
t['BARRACKS'] = "Campo d'addestramento";
t['RAP'] = 'Caserma';
t['STABLE'] = 'Scuderia';
t['WORKSHOP'] = 'Officina';
t['SENDRES'] = 'Invia risorse';
t['BUY'] = 'Compra risorse';
t['SELL'] = 'Vendi risorse';
t['SENDIGM'] = 'Invia messaggio';
t['LISTO'] = 'Disponibile';
t['ON'] = 'il';
t['AT'] = 'alle';
t['EFICIENCIA'] = 'Efficienza';
t['NEVER'] = 'Mai';
t['ALDEAS'] = 'Villaggi';
t['TIEMPO'] = 'Tempo';
t['OFREZCO'] = 'Offerta';
t['BUSCO'] = 'Richiesta';
t['TIPO'] = 'Percentuale di scambio';
t['DISPONIBLE'] = 'Disponibile';
t['CUALQUIERA'] = 'Tutti';
t['YES'] = 'Si';
t['NO'] = 'No';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Segnalibri';
t['ANYADIR'] = 'Aggiungi';
t['UBU'] = 'URL segnalibro';
t['UBT'] = 'Nome segnalibro';
t['DEL'] = 'Eliminare';
t['MAPA'] = 'Mappa';
t['MAXTIME'] = 'Tempo massimo';
t['ARCHIVE'] = 'Archivio';
t['SUMMARY'] = "Riepilogo";
t['TROPAS'] = 'Truppe';
t['CHKSCRV'] = 'Verifica Aggiornamenti';
t['ACTUALIZAR'] = 'Aggiorna le informazioni sul villaggio';
t['VENTAS'] = 'Offerte salvate';
t['MAPSCAN'] = "Scansiona la mappa";
t['BIC'] = 'Icone aggiuntive per accesso rapido';
t['22'] = 'Mostra blocco note';
t['SAVE'] = 'Salva';
t['49'] = "Azione predefinita per 'Invia truppe'";
t['AT2'] = 'Rinforzo';
t['AT3'] = 'Attacco: Normale';
t['AT4'] = 'Attacco: Raid';
t['24'] = 'Larghezza blocco note';
t['NBSA'] = 'Automatica';
t['NBSN'] = 'Normale (Piccolo)';
t['NBSB'] = 'Schermi grandi (Grande)';
t['25'] = 'Altezza blocco note';
t['NBHAX'] = "Adatta l'altezza automaticamente";
t['NBHK'] = "Altezza predefinita";
t['43'] = 'Mostra livelli edifici';
t['NPCSAVETIME'] = 'Tempo guadagnato: ';
t['38'] = 'Mostra colori livelli campi';
t['44'] = 'Mostra colori livelli edifici';
t['65'] = 'Colore ampliamento disponibile <br>(Vuoto = default)';
t['66'] = 'Colore livello massimo raggiunto <br>(Vuoto = default)';
t['67'] = 'Colore ampliamento non disponibile <br>(Vuoto = default)';
t['68'] = 'Colore ampliamento col mercato nero <br> (Vuoto = default)';
t['TOTALTROOPS'] = "Truppe del villaggio complessive";
t['20'] = 'Mostra segnalibri';
t['U.2'] = 'Popolo';
t['1'] = "Server Travian v2.x";
t['SELECTALLTROOPS'] = "Seleziona tutte le truppe";
t['PARTY'] = "Party";
t['CPPERDAY'] = "PC/giorno";
t['TOTAL'] = "Totale";
t['SELECTSCOUT'] = "Spiata";
t['SELECTFAKE'] = "Fake";
t['NOSCOUT2FAKE'] = "Non si possono usare le spie per mandare un fake!";
t['NOTROOP2FAKE'] = "Non ci sono truppe per mandare un fake!";
t['NOTROOP2SCOUT'] = "Non ci sono truppe per fare la spiata!";
t['NOTROOPS'] = "Non ci sono truppe nel villaggio!";
t['ALL'] = "Tutto";
t['SH2'] = "Nei campi dei colori puoi inserire:<br>- il nome (in inglese) <b>green</b> o <b>red</b> o <b>orange</b>, etc.<br>- il codice esadecimale del colore <b>#004523</b><br>- lasciare vuoto per usare i colori predefiniti";
t['SOREP'] = "Mostra report originale (per postare sul forum)";
t['56'] = "Mostra informazioni sul tipo di terreno/oasi<br>mentre il mouse passa sulla mappa";
t['10'] = "Simulatore di combattimento da usare:<br>(nel menu a sinistra)";
t['WSIMO1'] = "Interno (quello presente nel gioco)";
t['WSIMO2'] = "Esterno (fornito da kirilloid.ru)";
t['27'] = "World Analyser da utilizzare";
t['28'] = "Mostra link statistiche World Analyser";
t['NONEWVER'] = "ֳƒג€° giֳƒֲ  installata l'ultima versione disponibile";
t['BVER'] = "Potresti avere una versione Beta";
t['NVERAV'] = "ֳƒג€° disponibile una nuova versione";
t['UPDSCR'] = "Aggiornare ora lo script?";
t['CHECKUPDATE'] = "Controllo dell'ultima versione disponibile.<br>Attendere prego...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Popolazione media villaggi";
t['AVPPP'] = "Popolazione media giocatori";
t['37'] = 'Mostra tabella ampliamento campi';
t['41'] = 'Mostra tabella ampliamento edifici';
t['69'] = "Livello di logging della console<br>SOLO PER SVILUPPATORI O PER DEBUGGING<br>(Default = 0)";
t['48'] = "Numero di pagine di offerte da precaricare<br>nella pagina 'Mercato => Visualizza offerte'<br>(Default = 1)";
t['U.3'] = 'Nome del villaggio capitale<br><b>Vai alla pagina del tuo Profilo per aggiornare i dati</b>';
t['U.6'] = 'Coordinate del villaggio capitale<br><b>Vai alla pagina del tuo Profilo per aggiornare i dati</b>';
t['TOTTRTR'] = 'Totale truppe in addestramento';
t['57'] = 'Mostra distanze e tempi';
t['TB3SL'] = 'Impostazioni ' + TB3O.shN;
t['UPDALLV'] = "Aggiorna tutti i villaggi.  USARE CON CAUTELA, potrebbe comportare il BAN dell`account!";
t['9'] = "Mostra links aggiuntivi nel menu di sinistra<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Mappa estesa';
t['USETHEMPR'] = 'Completa proporzionalmente';
t['USETHEMEQ'] = 'Completa equamente';
t['TOWNHALL'] = 'Municipio';
t['GSRVT'] = 'Server di gioco';
t['ACCINFO'] = 'Informazioni Account';
t['NBO'] = 'Blocco note';
t['MNUL'] = 'Menu di sinistra';
t['STAT'] = 'Statistiche';
t['RESF'] = 'Campi di risorse';
t['VLC'] = 'Centro del villaggio';
t['MAPO'] = 'Opzioni mappa';
t['COLO'] = 'Opzioni colori';
t['DBGO'] = 'Opzioni di debug';
t['4'] = 'Mercato';
t['5'] = "Caserma/Campo d'addestramento/Officina/Scuderia";
t['6'] = "Municipio/Circolo degli eroi/Armeria/Fabbro";
t['HEROSMANSION'] = "Circolo degli eroi";
t['BLACKSMITH'] = 'Fabbro';
t['ARMOURY'] = 'Armeria';
t['NOW'] = 'Adesso';
t['CLOSE'] = 'Chiudi';
t['USE'] = 'Usa';
t['USETHEM1H'] = 'Completa con la produzione oraria';
t['OVERVIEW'] = 'Riepilogo';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Attacchi';
t['NEWS'] = 'News';
t['ADDCRTPAGE'] = 'Aggiungi pagina corrente';
t['SCRPURL'] = TB3O.shN;
t['50'] = "Numero di spie per l'invio di spiate";
t['SPACER'] = 'Separatore';
t['53'] = 'Mostra i tooltip con le informazioni sulle truppe';
t['MEREO'] = 'Messaggi e Report';
t['59'] = 'Numero di pagine di messaggi/report da precaricare<br>(Default = 1)';
t['ATTABLES'] = 'Tabella truppe';
t['MTW'] = 'Sprecate';
t['MTX'] = 'In eccesso';
t['MTC'] = 'Carico corrente';
t['ALFL'] = 'Link al forum esterno<br>(Lasciare vuoto per il forum interno)';
t['82.L'] = 'Blocca segnalibri (Nasconde le icone cancella, sposta in alto e sposta in basso)';
t['MTCL'] = 'Cancella tutto';
t['82.U'] = 'Sblocca segnalibri (Mostra le icone cancella, sposta in alto e sposta in basso)';
t['CKSORT'] = 'Clicca per ordinare';
t['MIN'] = 'Min';
t['SVGL'] = 'Condivisa tra i villaggi';
t['VGL'] = 'Elenco villaggi';
t['12'] = "Mostra i collegamenti a 'dorf1.php' e 'dorf2.php'";
t['UPDATEPOP'] = 'Aggiorna popolazione';
t['54'] = 'Mostra tooltip con tempi e distanza dai villaggi';
t['EDIT'] = 'Modifica';
t['NPCO'] = 'Opzioni Mercato Nero';
t['26'] = 'Mostra calcoli/links per il Mercato Nero';
t['58'] = 'Mostra tabella dei giocatori/villaggi/oasi occupate';
t['NEWVILLAGEAV'] = 'Data/Ora';
t['TIMEUNTIL'] = 'Tempo di attesa';
t['61'] = 'Mostra tabella "Eliminare" nella pagina dei report';
t['62'] = "Mostra l'icona 'Invia messaggio' anche per me";
t['CENTERMAP'] = 'Centra la mappa su questo villaggio';
t['13'] = "Mostra l'icona 'Centra la mappa su questo villaggio'";
t['SENDTROOPS'] = 'Invia truppe';
t['64'] = 'Mostra dettagli nelle statistiche dei Reports';
t['7'] = "Castello/Residence/Accademia/Camera del tesoro";
t['PALACE'] = "Castello";
t['RESIDENCE'] = "Residence";
t['ACADEMY'] = "Accademia";
t['TREASURY'] = "Camera del tesoro";
t['45'] = "Mostra il livello delle strutture in costruzione lampeggiante";
t['14']= "Mostra le icone 'Invia truppe/Invia risorse'";
t['34'] = "Mostra PC/giorno nelle tabelle";
t['UPGTB'] = "Tabella risorse/costruzioni";
t['35'] = "Mostra consumo di grano nelle tabelle";
t['16'] = "Mostra la produzione di grano netta";
t['39'] = "Mostra grafici a barre delle risorse";
t['RBTT'] = "Grafici a barre delle risorse";
t['40'] = "Mastra i grafici a barre delle risorse in una finestra";
t['21'] = "Mostra i segnalibri in una finestra";
t['23'] = "Mostra il blocco note in una finestra";
t['17'] = "Mostra la popolazione";
t['29'] = 'Map Analyser da usare';
t['30'] = 'Mostra il link alla mappa per gli utenti';
t['31'] = 'Mostra il link alla mappa per le alleanze';
t['3'] = 'Forza il calcolo della capacitֳƒֲ  di legionari e lancieri gallici<br>come nella versione 3.1<br>(per server con versione mista 3.1 & 3.5 - per adesso solo per server .de)';
t['63'] = 'Mostra report avanzati di TB3';
t['18'] = 'Mostra una lista dei villaggi aggiuntiva (su 2 colonne) in una finestra';
t['60'] = 'Mostra links per aprire i messaggi in un pop-up';
t['2'] = "Rimuovi banner pubblicitari";
t['19'] = 'Mostra informazioni su ampliamenti di costruzioni e movimenti di truppe';
t['32'] = "Mostra la 'barra di ricerca'";
t['33'] = "Mostra la 'barra di ricerca' in una finestra";
t['36'] = "Mostra i calcoli 'Risorse il/Residue' nelle tabelle di ampliamento/addestramento";
t['RESIDUE'] = 'Risorse residue se costruisci';
t['RESOURCES'] = 'Risorse';
t['SH1'] = "Apri il Profilo per il riconoscimento automatico delle informazioni sulla capitale<br>Costruisci il Campo di addestramento per il riconoscimento automatico del popolo e dopo apri il centro del villaggio";
t['46'] = "Mostra informazioni aggiuntive sui mercanti in arrivo";
t['42'] = 'Ordina le strutture per nome nella tabella di ampliamento';
t['15'] = "Mostra la produzione oraria di legno, argilla e ferro";
break;
case "de"://by ms99
//avRace = ['Rֳ¶mer', 'Germanen', 'Gallier'];
t['8'] = 'Allianz';
t['SIM'] = 'Kampfsimulator';
t['QSURE'] = 'Sind Sie sicher?';
t['LOSS'] = 'Rohstoff-Verluste';
t['PROFIT'] = 'Rentabilit&auml;t';
t['EXTAV'] = 'Ausbau m&ouml;glich';
t['PLAYER'] = 'Spieler';
t['VILLAGE'] = 'Dorf';
t['POPULATION'] = 'Einwohner';
t['COORDS'] = 'Koordinaten';
t['MAPTBACTS'] = 'Aktion';
t['SENDRES'] = 'H&auml;ndler schicken';
t['SAVED'] = 'Gespeichert';
t['YOUNEED'] = 'Ben&ouml;tige';
t['TODAY'] = 'heute';
t['TOMORROW'] = 'morgen';
t['DAYAFTERTOM'] = '&uuml;bermorgen';
t['MARKET'] = 'Marktplatz';
t['BARRACKS'] = 'Kaserne';
t['RAP'] = 'Versammlungsplatz';
t['STABLE'] = 'Stall';
t['WORKSHOP'] = 'Werkstatt';
t['BUY'] = 'Kaufen';
t['SELL'] = 'Verkaufen';
t['SENDIGM'] = 'IGM schreiben';
t['LISTO'] = 'Genug';
t['ON'] = '';
t['AT'] = 'um';
t['EFICIENCIA'] = 'Effektivitֳ₪t';
t['NEVER'] = 'Nie';
t['ALDEAS'] = 'Dֳ¶rfer';
t['MAXTIME'] = 'Maximale Dauer';
t['TIEMPO'] = 'Zeit';
t['MAPA'] = 'Karte';
t['OFREZCO'] = 'Biete';
t['BUSCO'] = 'Suche';
t['TIPO'] = 'Tauschverhֳ₪ltnis';
t['DISPONIBLE'] = 'Nur annehmbare Angebote';
t['CUALQUIERA'] = 'Beliebig';
t['YES'] = 'Ja';
t['NO'] = 'Nein';
t['MARCADORES'] = 'Lesezeichen';
t['ANYADIR'] = 'Hinzuf&uuml;gen';
t['UBU'] = 'Lesezeichen URL';
t['UBT'] = 'Lesezeichen Text';
t['DEL'] = 'Entfernen';
t['CHKSCRV'] = 'Update TBeyond';
t['ACTUALIZAR'] = 'Update Dorf Info';
t['ARCHIVE'] = 'Archiv';
t['VENTAS'] = 'Gespeicherte Angebote';
t['SUMMARY'] = 'Zusammenfassung';
t['BIC'] = 'Zusֳ₪tzliche Icons';
t['22'] = 'Notizblock anzeigen';
t['SAVE'] = 'Speichern';
t['49'] = 'Standard Aktion Versammlungsplatz';
t['AT2'] = 'Unterstֳ¼tzung';
t['AT3'] = 'Angriff: Normal';
t['AT4'] = 'Angriff: Raubzug';
t['24'] = 'Grֳ¶sse Notizblock';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normal (klein)';
t['NBSB'] = 'Breiter Monitor (breit)';
t['25'] = 'Notizblock: Hֳ¶he';
t['NBHAX'] = 'Hֳ¶he automatisch anpassen';
t['NBHK'] = 'Standard Hֳ¶he';
t['43'] = 'Levels im Dorfzentrum anzeigen';
t['NPCSAVETIME'] = 'Zeitgewinn';
t['38'] = 'Ressilevel Farbcode anzeigen';
t['44'] = 'Gebֳ₪udelevel Farbcode anzeigen';
t['TOTALTROOPS'] = 'Truppen dieses Dorfes';
t['20'] = 'Lesezeichen anzeigen';
t['U.2'] = 'Volk';
t['1'] = "Travian v2.x Server";
t['28'] = "Analyser Statistiklinks anzeigen";
t['SELECTALLTROOPS'] = "Alle Truppen ausw&auml;hlen";
t['PARTY'] = "Feste";
t['CPPERDAY'] = "KPs/Tag";
t['SLOT'] = "Slots";
t['SELECTSCOUT'] = "Spֳ₪her auswֳ₪hlen";
t['SELECTFAKE'] = "Fake Truppen auswֳ₪hlen";
t['NOSCOUT2FAKE'] = "Es ist unmֳ¶glich Spֳ₪her fֳ¼r einen Fake zu benutzen!";
t['NOTROOP2FAKE'] = "Keine Truppen vorhanden um einen Fake Angriff zu starten!";
t['NOTROOP2SCOUT'] = "Keine Truppen vorhanden um einen Spֳ₪hangriff zu starten!";
t['NOTROOPS'] = "Keine Truppen im Dorf!";
t['ALL'] = "Alles";
t['SH1'] = "ֳ–ffne Dein Profil fֳ¼r die automatische Erkennung des Hauptdorfs/Koordinaten<br>Kaserne bauen und dann Dorfzentrum ֳ¶ffnen fֳ¼r automatische Erkennung des Volkes";
t['SH2'] = "Was man in Farbfelder eintragen kann:<br>- (Englisch) <b>green</b> oder <b>red</b> oder <b>orange</b>, etc.<br>- HEX Farbkod, z.B. <b>#004523</b><br>- leer fֳ¼r Standardfarbe";
t['56'] = "Zelltyp auf der Karte anzeigen wenn Mauszeiger &uuml;ber Zelle";
t['WSIMO1'] = "Intern (vom Spiel zur Verfֳ¼gung gestellt)";
t['WSIMO2'] = "Extern (von der kirilloid.ru Seite)";
t['27'] = "Benutze World Analyser";
t['28'] = "World Analyser Statistiklinks anzeigen";
t['NONEWVER'] = "Sie haben die letzte Version installiert";
t['BVER'] = "Sie haben vielleicht eine Beta Version installiert";
t['NVERAV'] = "Eine neue Version des Scripts steht zur Verfֳ¼gung";
t['UPDSCR'] = "Script jetzt aktualisieren ?";
t['CHECKUPDATE'] = "Es wird nach einer neuen Scriptversion gesucht.<br>Bitte warten...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Durchschnitt: Bewohner/Dorf";
t['AVPPP'] = "Durchschnitt: Bewohner/Spieler";
t['41'] = "Upgradetabelle f&uuml;r Gebֳ₪ude anzeigen";
t['69'] = "Log Level Konsole - Nur f&uuml;r Programmierer (Standard = 0)";
t['48'] = "Anzahl der Angebotsseiten auf der 'Markt => Kaufen' Seite,<br />die vom Server automatisch runtergeladen werden sollen (Standard = 1)";
t['TOTTRTR'] = 'Total Truppen in Ausbildung';
t['57'] = 'Entfernungen & Zeiten anzeigen';
t['TB3SL'] = TB3O.shN + ' Einstellungen';
t['SOREP'] = "Original Bericht anzeigen";
t['10'] = "Option Kampfsimulatorlink";
t['37'] = "Upgradetabelle f&uuml;r Resifelder anzeigen";
t['U.3'] = 'Name des Hauptdorfs';
t['U.6'] = 'Koordinaten des Hauptdorfs';
t['UPDALLV'] = 'Alle Dֳ¶rfer aktualisieren. BITTE MIT VORSICHT BENUTZEN, DIES Kֳ–NNTE ZUR SPERRUNG DES ACCOUNTS Fֳ�HREN !';
t['9'] = "Zusֳ₪tzliche Links im linken Menֳ¼ anzeigen<br />(Traviantoolbox, World Analyser, Travilog, Map, usw.)";
t['LARGEMAP'] = 'Groֳ�e Karte';
t['USETHEMPR'] = 'Rohstoffe proportional verteilen';
t['USETHEMEQ'] = 'Rohstoffe gleichmֳ₪ֳ�ig verteilen';
t['TOWNHALL'] = 'Rathaus';
t['GSRVT'] = 'Server';
t['ACCINFO'] = 'Account Info';
t['NBO'] = 'Notizblock';
t['MNUL'] = 'Menֳ¼ links';
t['STAT'] = 'Statistiken';
t['RESF'] = 'Rohstofffelder';
t['VLC'] = 'Dorfzentrum';
t['MAPO'] = 'Karten Einstellung';
t['COLO'] = 'Farbeinstellungen  (Standard = Leer)';
t['65'] = 'Farbe "Upgrade mֳ¶glich"';
t['66'] = 'Farbe "Max Level"';
t['67'] = 'Farbe "Upgrade nicht mֳ¶glich"';
t['68'] = 'Farbe "Upgrade via NPC"';
t['DBGO'] = 'Fehlersuche';
t['4'] = 'Marktplatz';
t['5'] = 'Versammlungsplatz/Kaserne/Stall/Werkstatt';
t['6'] = "Rathaus/Heldenhof/Rֳ¼stungs-/Waffenschmiede";
t['HEROSMANSION'] = "Heldenhof";
t['BLACKSMITH'] = 'Waffenschmiede';
t['ARMOURY'] = 'Rֳ¼stungsschmiede';
t['NOW'] = 'Jetzt';
t['CLOSE'] = 'Schlieֳ�en';
t['USE'] = 'Benutze';
t['USETHEM1H'] = '1 Stundenproduktion schicken';
t['OVERVIEW'] = 'ֳ�bersicht';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Angriffe';
t['NEWS'] = 'News';
t['ADDCRTPAGE'] = 'Aktuelle Seite hinzufֳ¼gen';
t['SCRPURL'] = 'TB-Homepage';
t['50'] = 'Anzahl der Spֳ₪her fֳ¼r die "Spֳ₪her auswֳ₪hlen" Funktion';
t['SPACER'] = 'Abstandshalter';
t['53'] = 'Truppeninformationen anzeigen (in Informations-Boxen)';
t['MEREO'] = 'Nachrichten & Berichte';
t['59'] = 'Anzahl der "Nachrichten & Berichte" Seiten<br />die vom Server automatisch runtergeladen werden sollen (Standard = 1)';
t['ATTABLES'] = 'Truppenֳ¼bersicht';
t['MTW'] = 'Noch verfֳ¼gbaren Platz verschwendet';
t['MTX'] = 'Zuviel';
t['MTC'] = 'Aktuell verwendet';
t['ALFL'] = 'Link externes Forum (Fֳ¼r internes Forum leer lassen)';
t['MTCL'] = 'Alle entfernen';
t['82.L'] = 'Lesezeichen sperren (Die Icons werden ausgeblendet)';
t['82.U'] = 'Lesezeichen entsperren (Die Icons fֳ¼rs Lֳ¶schen und sortieren werden wieder angezeigt)';
t['CKSORT'] = 'Zum Sortieren klicken';
t['MIN'] = 'Min';
t['SVGL'] = 'Fֳ¼r alle Dֳ¶rfer verfֳ¼gbar';
t['VGL'] = 'Dorfֳ¼bersicht';
t['12'] = "Zeige die Links 'dorf1.php' und 'dorf2.php' an";
t['UPDATEPOP'] = 'Einwohnerzahl aktualisieren';
t['54'] = 'Zeige Entfernung & Zeiten zu den Dֳ¶rfern in ToolTips an';
t['EDIT'] = 'Bearbeiten';
t['60']= 'Links um IGMs/KB in Pop-ups zu ֳ¶ffnen anzeigen';
t['NPCO'] = 'Optionen NPC Assistent';
t['26'] = 'NPC Assistent Kalkulation/Links anzeigen';
t['58'] = 'Tabelle der Spieler/Dֳ¶rfer/besetzte Oasen anzeigen';
t['NEWVILLAGEAV'] = 'Datum/Uhrzeit';
t['TIMEUNTIL'] = 'Wartezeit';
t['61'] = '"Alle lֳ¶schen" Tabelle auf Berichte Seite anzeigen';
t['62'] = 'Zeige das "Sende IGM" Icon auch f&uuml;r mich an';
t['CENTERMAP'] = 'Zentriere Karte auf dieses Dorf';
t['13'] = 'Zeige "Zentriere Karte auf dieses Dorf" Icon an';
t['SENDTROOPS'] = 'Truppen schicken';
t['64'] = 'Details in Berichte Statistiken anzeigen';
t['7'] = "Palast/Residenz/Akademie/Schatzkammer";
t['PALACE'] = "Palast";
t['RESIDENCE'] = "Residenz";
t['ACADEMY'] = "Akademie";
t['TREASURY'] = "Schatzkammer";
t['45'] = "Blinkende Levels fֳ¼r Gebֳ₪ude die gerade ausgebaut werden";
t['14']= "Zeige 'Truppen schicken/Rohstoffe verschicken' Icons in der Liste der D&ouml;rfer an";
t['34'] = "Zeige KP/Tag Info in den Upgradetabellen an";
t['UPGTB'] = "Ressifelder/Gebֳ₪ude Upgradetabellen";
t['35'] = "Zeige Getreide-Verbrauch in Upgradetabellen an";
t['16'] = "Zeige effektive Getreide-Produktion in the Liste der D&ouml;fer an";
t['39'] = "Zeige die Ressi-Bar an";
t['RBTT'] = "Ressi-Bar";
t['30'] = 'Links zur Karte anzeigen - Spieler';
t['31'] = 'Links zur Karte anzeigen - Allianzen';
t['40'] = "Zeige 'Ressi-Bar' als Floating-Fenster an";
t['21'] = "Zeige 'User Bookmarks' als Floating-Fenster an";
t['23'] = "Zeige 'NoteBlock' als Floating-Fenster an";
t['17'] = "Zeige Anzahl der Einwohner in der Liste der D&ouml;rfer an";
t['29'] = 'Option Karten-Analyser';
t['63'] = 'Zeige TB3 erweiterte Kampfreports';
t['3'] = 'T3.1 Tragekapazitֳ₪t fֳ¼r Legionֳ₪r & Phalanx erzwingen<br>(fֳ¼r T3.1 & T3.5 Spieleserver)';
t['18'] = 'Zeige eine zusֳ₪tzliche Dֳ¶rferliste (2 Spalten) als Floating-Fenster an';
t['42'] = 'Sortiere Gebֳ₪ude nach Name in der Upgradetabelle';
t['19'] = 'Zeige Informationen ֳ¼ber Gebֳ₪ude die ausgebaut werden und<br>Truppenbewegungen in der Liste der Dֳ¶rfer';
t['32'] = "Zeige 'Suche-Bar' an";
t['33'] = "Zeige 'Suche-Bar' als Floating-Fenster an";
t['36'] = "Zeige 'Am/Rest' Kalkulation in Upgrade/Ausbildungstabellen an";
t['RESIDUE'] = 'Rest wenn gebaut ';
t['RESOURCES'] = 'Rohstoffe';
t['2'] = 'Banners entfernen';
t['SH1'] = "ֳ–ffne Dein Profil fֳ¼r automatische Erkennung des Hauptdorfs und Koordinated<br>Baue eine Kaserne f&uuml;r die automatische Volkserkennung und ֳ¶ffne dann das Dorfzentrum";
t['46'] = "Zeige zus&auml;tzliche Infos fֳ¼r jede Hֳ₪ndlerankunft";
t['15'] = "Zeige Produktion von Holz, Lehm, Eisen pro Stunde in der Liste der Dֳ¶rfer an";
t['11'] = "Option Sitelink fֳ¼r das Hochladen der Reports";
break;
case "ro"://by ms99
//avRace = ['Romani', 'Barbari', 'Daci'];
t['8'] = 'Alianֵ£ִƒ';
t['SIM'] = 'Simulator luptִƒ';
t['QSURE'] = 'Eֵ�ti sigur?';
t['LOSS'] = 'Pierderi';
t['PROFIT'] = 'Profit';
t['EXTAV'] = 'Upgrade posibil acum';
t['PLAYER'] = 'Jucִƒtor';
t['VILLAGE'] = 'Sat';
t['POPULATION'] = 'Populaֵ£ie';
t['COORDS'] = 'Coordonate';
t['MAPTBACTS'] = 'Acֵ£iuni';
t['SAVED'] = 'Salvat';
t['YOUNEED'] = 'Ai nevoie de';
t['TODAY'] = 'azi';
t['TOMORROW'] = 'mֳ¢ine';
t['DAYAFTERTOM'] = 'poimֳ¢ine';
t['MARKET'] = 'Tֳ¢rg';
t['BARRACKS'] = 'Cazarmִƒ';
t['RAP'] = 'Adunare';
t['STABLE'] = 'Grajd';
t['WORKSHOP'] = 'Atelier';
t['SENDRES'] = 'Trimite resurse';
t['BUY'] = 'Cumparִƒ';
t['SELL'] = 'Vinde';
t['SENDIGM'] = 'Trimite mesaj';
t['LISTO'] = 'Upgrade posibil';
t['ON'] = 'ֳ®n';
t['AT'] = 'la';
t['EFICIENCIA'] = 'Eficienֵ£ִƒ';
t['NEVER'] = 'Niciodatִƒ';
t['ALDEAS'] = 'Sat(e)';
t['TROPAS'] = 'Adunare';
t['TIEMPO'] = 'Timp';
t['OFREZCO'] = 'Oferִƒ';
t['BUSCO'] = 'Cautִƒ';
t['TIPO'] = 'Tip';
t['DISPONIBLE'] = 'Doar cele disponibile';
t['CUALQUIERA'] = 'Oricare';
t['YES'] = 'Da';
t['NO'] = 'Nu';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Link-uri';
t['ANYADIR'] = 'Adaugִƒ';
t['UBU'] = 'URL';
t['UBT'] = 'Text';
t['DEL'] = 'ֵ�terge';
t['MAPA'] = 'Hartִƒ';
t['MAXTIME'] = 'Timp maxim';
t['ARCHIVE'] = 'Arhivִƒ';
t['SUMMARY'] = 'Rezumat';
t['TROPAS'] = 'Trupe';
t['CHKSCRV'] = 'Update TBeyond';
t['ACTUALIZAR'] = 'Actualizeazִƒ informaֵ£ie sat';
t['VENTAS'] = 'Oferte salvate';
t['MAPSCAN'] = 'Scaneazִƒ harta';
t['BIC'] = 'Afiֵ�eazִƒ icoane suplimentare';
t['22'] = 'Afiֵ�eazִƒ bloc-notes';
t['SAVE'] = 'Salveazִƒ';
t['49'] = 'Acֵ£iune standard adunare';
t['AT2'] = 'ֳ�ntִƒriri';
t['AT3'] = 'Atac: Normal';
t['AT4'] = 'Atac: Raid';
t['24'] = 'Lִƒֵ£ime bloc-notes';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normal (ingust)';
t['NBSB'] = 'Ecran lat (lat)';
t['25'] = 'ֳ�nִƒlֵ£ime bloc-notes';
t['NBHAX'] = "Mִƒreֵ�te inִƒlֵ£imea automat";
t['NBHK'] = "ֳ�nִƒlֵ£ime normalִƒ";
t['43'] = 'Afiֵ�eazִƒ nivel clִƒdiri';
t['NPCSAVETIME'] = 'Timp economisit';
t['38'] = 'Afiֵ�eazִƒ culori nivel cֳ¢mpuri resurse';
t['44'] = 'Afiֵ�eazִƒ culori nivel clִƒdiri';
t['65'] = 'Culoare upgrade posibil (Nimic = standard)';
t['66'] = 'Culoare nivel maxim (Nimic = standard)';
t['67'] = 'Culoare upgrade imposibil (Nimic = standard)';
t['68'] = 'Culoare upgrade posibil via NPC (Nimic = standard)';
t['TOTALTROOPS'] = 'Total trupe sat';
t['20'] = 'Afiֵ�eazִƒ link-uri';
t['U.2'] = 'Rasִƒ';
t['1'] = "Server Travian v2.x";
t['SELECTALLTROOPS'] = "Selecteazִƒ toate trupele";
t['PARTY'] = "Festivitִƒֵ£i";
t['CPPERDAY'] = "PC/zi";
t['SLOT'] = "Slot";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Selecteazִƒ spioni";
t['SELECTFAKE'] = "Selecteazִƒ trupe fake";
t['NOSCOUT2FAKE'] = "Nu puteֵ£i selecta spioni pentru un fake !";
t['NOTROOP2FAKE'] = "Nu existִƒ trupe pentru un fake !";
t['NOTROOP2SCOUT'] = "Nu existִƒ trupe pentru un atac de spionaj !";
t['NOTROOPS'] = "Nu existִƒ trupe in sat !";
t['ALL'] = "Tot";
t['SH1'] = "Deschide pagina Profil pentru detectarea automatִƒ a capitalei/coordonate<br>Contruieֵ�te cazarma ֵ�i deschide pagina 'Centrul satului' pentru detectarea automatִƒ a rasei";
t['SH2'] = "ֳ�n cֳ¢mpurile de culori puteֵ£i introduce:<br>- <b>green</b> sau <b>red</b> sau <b>orange</b>, etc.<br>- codul HEX al culorii, ex. <b>#004523</b><br>- loc liber = culoare standard";
t['SOREP'] = "Afiֵ�eazִƒ raport original (pentru forumuri)";
t['56'] = "Afiֵ�eazִƒ tip celula/info vale pִƒrִƒsitִƒ (mousing over)";
t['10'] = "Link cִƒtre simulator luptִƒ<br>";
t['WSIMO1'] = "Intern (inclus in joc)";
t['WSIMO2'] = "Extern (pus la dispoziֵ£ie de cִƒtre kirilloid.ru)";
t['27'] = "Utilizeazִƒ World Analyser";
t['28'] = "Afiֵ�eazִƒ link-uri cִƒtre World Anlyser";
t['NONEWVER'] = "Ultima versiune disponibilִƒ este instalatִƒ";
t['BVER'] = "Se poate sִƒ aveֵ£i o versiune beta instalatִƒ";
t['NVERAV'] = "O versiune nouִƒ a scriptului este disponibilִƒ";
t['UPDSCR'] = "Doriֵ£i sִƒ actualizaֵ£i acum ?";
t['CHECKUPDATE'] = "Verific existenֵ£a unei versiuni noi a scriptului...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Populaֵ£ie medie/sat";
t['AVPPP'] = "Populaֵ£ie medie/jucִƒtor";
t['37'] = "Afiֵ�eazִƒ tabel upgrade cֳ¢mpuri de resurse";
t['41'] = "Afiֵ�eazִƒ tabel upgrade clִƒdiri";
t['69'] = "Log level consolִƒ (DOAR PENTRU PROGRAMATORI)<br>(Standard = 0)";
t['48'] = "Numִƒrul paginilor de oferte pre-ֳ®ncִƒrcate pe pagina 'Tֳ¢rg => Cumpִƒrִƒ'<br>(Standard = 1)";
t['U.3'] = 'Numele capitalei<br><b>Deschide Profilul pentru actualizare automatִƒ</b>';
t['U.6'] = 'Coordonatele capitalei<br><b>Deschide Profilul pentru actualizare automatִƒ</b>';
t['TOTTRTR'] = 'Total trupe antrenate';
t['57'] = 'Afiֵ�eazִƒ distanֵ£e ֵ�i timpi de deplasare';
t['TB3SL'] = 'Opֵ£iuni ' + TB3O.shN;
t['UPDALLV'] = 'Actualizeazִƒ toate satele.  Utilizeazִƒ cu maximִƒ atenֵ£ie.  Urmarea ar putea fi un cont banat !';
t['9'] = "Afiֵ�eazִƒ link-uri adiֵ£ionale ֳ®n meniul din stֳ¢nga<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Harta mare';
t['USETHEMPR'] = 'Use them (proportional)';
t['USETHEMEQ'] = 'Use them (egal)';
t['TOWNHALL'] = 'Casa de culturִƒ';
t['ACCINFO'] = 'Informaֵ£ii cont';
t['NBO'] = 'Bloc-notes';
t['MNUL'] = 'Meniu stֳ¢nga';
t['STAT'] = 'Statisticִƒ';
t['RESF'] = 'Cֳ¢mpuri resurse';
t['VLC'] = 'Centrul satului';
t['MAPO'] = 'Opֵ£iuni hartִƒ';
t['COLO'] = 'Opֵ£iuni culori';
t['DBGO'] = 'Opֵ£iuni Debug';
t['4'] = 'Tֳ¢rg';
t['5'] = 'Adunare/Cazarmִƒ/Atelier/Grajd';
t['6'] = "Casa de culturִƒ/Reֵ�edinֵ£a eroului/Armurִƒrie/Fierִƒrie";
t['HEROSMANSION'] = "Reֵ�edinֵ£a eroului";
t['BLACKSMITH'] = 'Fierִƒrie';
t['ARMOURY'] = 'Armurִƒrie';
t['NOW'] = 'Acum';
t['CLOSE'] = 'Inchide';
t['USE'] = 'Use';
t['USETHEM1H'] = 'Use them (producֵ£ia/ora)';
t['OVERVIEW'] = 'Perspectivִƒ';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Atacuri';
t['NEWS'] = 'Stiri';
t['ADDCRTPAGE'] = 'Pagina curentִƒ';
t['SCRPURL'] = 'Pagina TBeyond';
t['50'] = 'Numִƒr de spioni pentru funcֵ£ia "Selecteazִƒ spioni"';
t['SPACER'] = 'Delimitator';
t['53'] = 'Afiֵ�eazִƒ informaֵ£ii despre trupe ֳ®n tooltips';
t['MEREO'] = 'Mesaje & Rapoarte';
t['59'] = 'Numִƒrul paginilor de mesaje/rapoarte pre-ֳ®ncִƒrcate<br>(Standard = 1)';
t['ATTABLES'] = 'Tabele trupe';
t['MTW'] = 'Risipִƒ';
t['MTX'] = 'Excedent';
t['MTC'] = 'Transport actual';
t['ALFL'] = 'Link cִƒtre forum extern (Forum intern = loc liber)';
t['MTCL'] = 'Sterge tot';
t['82.L'] = 'Ascunde icoanele "Sterge", "ֳ®n sus", "ֳ®n jos"';
t['82.U'] = 'Afiֵ�eazִƒ icoanele "Sterge", "ֳ®n sus", "ֳ®n jos"';
t['CKSORT'] = 'Click pentru sortare';
t['SVGL'] = 'Valabilִƒ ֳ®n toate satele';
t['VGL'] = 'Lista satelor';
t['12'] = "Afiֵ�eazִƒ icoanele pentru 'dorf1.php' ֵ�i 'dorf2.php'";
t['UPDATEPOP'] = 'Actualizeazִƒ populaֵ£ia satelor';
t['54'] = 'Afiֵ�eazִƒ distanֵ£e/timpi cִƒtre sate ֳ®n tooltips';
t['EDIT'] = 'Modificִƒ';
t['60'] = 'Afiֵ�eazִƒ icoane pentru a deschide mesajele/rapoartele ֳ®ntr-un pop-up';
t['NPCO'] = 'Opֵ£iuni NPC Assistant';
t['26'] = 'Afiֵ�eazִƒ calcule/link-uri NPC Assistant';
t['58'] = 'Afiֵ�eazִƒ tabel jucִƒtori/sate/oaze ocupate';
t['NEWVILLAGEAV'] = 'Data/Ora';
t['TIMEUNTIL'] = 'Timp de aֵ�teptare';
t['61'] = 'Afiֵ�eazִƒ tabela "Sterge toate" pe pagina de rapoarte';
t['62'] = 'Afiֵ�eazִƒ icon-ul "Trimite IGM" ֵ�i pentru mine';
t['CENTERMAP'] = 'Centreazִƒ harta pe acest sat';
t['13'] = 'Afiֵ�eazִƒ icon-ul "Centreazִƒ harta pe acest sat"';
t['SENDTROOPS'] = 'Trimite trupe';
t['64'] = 'Afiֵ�eazִƒ detalii in statistica raport';
t['7'] = "Palat/Vilִƒ/Academie/Trezorerie";
t['PALACE'] = "Palat";
t['RESIDENCE'] = "Vilִƒ";
t['ACADEMY'] = "Academie";
t['TREASURY'] = "Trezorerie";
t['45'] = "Nivelul clִƒdirilor aflate ֳ®n construcֵ£ie clipeֵ�te";
t['14']= "Afiֵ�eazִƒ icoanele 'Trimite trupe' si 'Trimite resurse'<br>ֳ®n lista satelor";
t['34'] = "Afiֵ�eazִƒ PC/zi ֳ®n tabelele de upgrade";
t['UPGTB'] = "Tabele Upgrade campuri de resurse/clִƒdiri";
t['35'] = "Afiֵ�eazִƒ consumul de hranִƒ ֳ®n tabelele de upgrade";
t['16'] = "Afiֵ�eazִƒ producֵ£ia efectivִƒ de hranִƒ ֳ®n lista satelor";
t['39'] = "Afiֵ�eazִƒ tabela 'Barִƒ resurse'";
t['RBTT'] = "Barִƒ resurse";
t['30'] = 'Afiֵ�eazִƒ link-uri cִƒtre hartִƒ - jucִƒtori';
t['31'] = 'Afiֵ�eazִƒ link-uri cִƒtre hartִƒ - alianֵ£e';
t['40'] = "Afiֵ�eazִƒ 'Barִƒ resurse' ca fereastrִƒ separatִƒ (floating)";
t['21'] = "Afiֵ�eazִƒ 'Link-uri' ca fereastrִƒ separatִƒ (floating)";
t['23'] = "Afiֵ�eazִƒ 'Bloc-notes' ca fereastrִƒ separatִƒ (floating)";
t['17'] = "Afiֵ�eazִƒ populaֵ£ia ֳ®n lista satelor";
t['29'] = 'Utilizeazִƒ "Map Analyser"';
t['63'] = 'Afiֵ�eazִƒ rapoarte extinse TB3';
t['3'] = 'Utilizeazִƒ capacitatea de transport din T3.1 (legionari & scutieri)<br>(servere mixte T3.1 & T3.5)';
t['18'] = 'Afiֵ�eazִƒ o listִƒ adiֵ£ionalִƒ a satelor (2 coloane)<br> ca fereastrִƒ separatִƒ (floating)';
t['42'] = 'Sorteazִƒ dupִƒ nume clִƒdirile ֳ®n tabelul upgrade clִƒdiri';
t['19'] = 'Afiֵ�eazִƒ informaֵ£ii despre clִƒdirile ֳ®n extindere ֵ�i<br>miֵ�carile de trupe ֳ®n lista satelor';
t['32'] = "Afiֵ�eazִƒ 'Barִƒ cִƒutare'";
t['33'] = "Afiֵ�eazִƒ 'Barִƒ cִƒutare' ca fereastrִƒ separatִƒ (floating)";
t['36'] = "Afiֵ�eazִƒ calcule 'Resurse la/Rest' ֳ®n tabelele de <br>upgrade/instruire trupe";
t['RESIDUE'] = 'Rest ֳ®n cazul construcֵ£iei ';
t['RESOURCES'] = 'Resurse';
t['2'] = 'Eliminִƒ banere reclame';
t['SH1'] = "Deschide Profilul pentru recunoaֵ�terea automatִƒ a capitalei/coordonatelor<br>Construieֵ�te cazarma ֵ�i deschide centrul satului pentru recunoaֵ�terea automatִƒ a rasei";
t['46'] = "Afiֵ�eazִƒ informaֵ£ii suplimentare pentru fiecare negustor care soseֵ�te";
t['15'] = "Afiֵ�eazִƒ producֵ£ia de lemn, lut, fier pe orִƒ ֳ®n lista satelor";
t['11'] = "Link cִƒtre site-ul pentru postat rapoarte";
break;
case "ar":
case "cl":
case "mx"://by Leonel (aka Phob0z) & Gabraham
//avRace = ['Romanos', 'Germanos', 'Galos'];
t['8'] = 'Alianza';
t['SIM'] = 'Simulador de combate';
t['QSURE'] = "\u00bfEst\u00e1s seguro?";
t['LOSS'] = 'P&eacute;rdidas';
t['PROFIT'] = 'Ganancias';
t['EXTAV'] = 'Subir nivel';
t['PLAYER'] = 'Jugador';
t['VILLAGE'] = 'Aldea';
t['POPULATION'] = 'Poblaci&oacute;n';
t['COORDS'] = 'Coordenadas';
t['MAPTBACTS'] = 'Acciones';
t['SAVED'] = 'Guardado';
t['YOUNEED'] = 'Te falta';
t['TODAY'] = 'hoy';
t['TOMORROW'] = 'ma&ntilde;ana';
t['DAYAFTERTOM'] = 'pasado ma&ntilde;ana';
t['MARKET'] = 'Mercado';
t['BARRACKS'] = 'Cuartel';
t['RAP'] = 'Plaza de reuniones';
t['STABLE'] = 'Establo';
t['WORKSHOP'] = 'Taller';
t['SENDRES'] = 'Enviar recursos';
t['BUY'] = 'Comprar';
t['SELL'] = 'Vender';
t['SENDIGM'] = 'Enviar IGM';
t['LISTO'] = 'Listo';
t['ON'] = 'el';
t['AT'] = 'a las';
t['EFICIENCIA'] = 'Eficiencia';
t['NEVER'] = 'Nunca';
t['ALDEAS'] = 'Aldea(s)';
t['TIEMPO'] = 'Tiempo';
t['OFREZCO'] = 'Ofrezco';
t['BUSCO'] = 'Busco';
t['TIPO'] = 'Tipo';
t['DISPONIBLE'] = 'Solo disponible';
t['CUALQUIERA'] = 'Cualquiera';
t['YES'] = 'Si';
t['NO'] = 'No';
t['LOGIN'] = 'Ingresar';
t['MARCADORES'] = 'Marcadores';
t['ANYADIR'] = 'A\u00f1adir';
t['UBU'] = 'URL del nuevo Marcador';
t['UBT'] = 'Nombre del nuevo Marcador';
t['DEL'] = 'Eliminar';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Tiempo m&aacute;ximo';
t['ARCHIVE'] = 'Archivar';
t['SUMMARY'] = 'Resumen';
t['TROPAS'] = 'Tropas';
t['CHKSCRV']  = 'Actualice TBeyond';
t['ACTUALIZAR'] = 'Actualizar informaci&oacute;n de aldea';
t['VENTAS'] = 'Guardar ofertas';
t['MAPSCAN'] = 'Escanear el Mapa';
t['BIC'] = 'Mostrar iconos de acceso r&aacute;pido';
t['22'] = 'Mostrar hoja de notas';
t['SAVE'] = 'Guardar';
t['49'] = 'Opci&oacute;n por defecto cuando se mandan tropas';
t['AT2'] = 'Refuerzos';
t['AT3'] = 'Ataque: Normal';
t['AT4'] = 'Ataque: Asalto';
t['24'] = 'Tama&ntilde;o de la hoja de notas';
t['NBSA'] = 'Autom\u00e1tico';
t['NBSN'] = 'Normal';
t['NBSB'] = 'Grande';
t['25'] = 'Altura de la hoja de notas';
t['NBHAX'] = 'Expandir altura autom\u00e1ticamente';
t['NBHK'] = 'Altura por defecto';
t['43'] = 'Mostrar el nivel de las construcciones en el centro de la aldea';
t['NPCSAVETIME'] = 'Tiempo ahorrado: ';
t['38'] = 'Mostrar colores en el nivel de los recursos';
t['44'] = 'Mostrar colores en el nivel de las construcciones';
t['65'] = 'Color para las actualizaciones disponibles';
t['66'] = 'Color para los niveles m&aacute;ximos';
t['67'] = 'Color para las actualizaciones no disponibles';
t['68'] = 'Color para actualizar por medio de NPC';
t['TOTALTROOPS'] = 'Tropas totales de la aldea';
t['20'] = 'Mostrar marcadores';
t['U.2'] = 'Raza';
t['1'] = "Servidor Travian v2.x?";
t['SELECTALLTROOPS'] = "Seleccionar todas las tropas";
t['PARTY'] = "Fiesta";
t['CPPERDAY'] = "PC/d\u00eda";
t['SLOT'] = "Espacios disp.";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Seleccionar esp&iacute;as";
t['SELECTFAKE'] = "Seleccionar unidad para fake";
t['NOSCOUT2FAKE'] = "No es posible usar esp\u00edas para un fake!";
t['NOTROOP2FAKE'] = "No hay tropas para usar como fake!";
t['NOTROOP2SCOUT'] = "No hay esp\u00edas!";
t['NOTROOPS'] = "No hay tropas en la aldea!";
t['ALL'] = "Todo";
t['SH2'] = "En los campos para escribir en el color, puedes poner:<br>- <b>green</b> o <b>red</b> o <b>orange</b>, etc.<br>- El c&oacute;digo Hexadecimal del color.<br>- D&eacute;jalo vac&iacute;o para usar el color por defecto";
t['SOREP'] = "Mostrar reporte original (para poner en foros)";
t['56'] = "Mostrar el tipo de casilla al ponerle el cursor encima";
t['10'] = "&iquest;Qu&eacute; simulador de combate usar?:<br>(men&uacute; izquierdo)";
t['WSIMO1'] = "Interno (el que trae travian por defecto)";
t['WSIMO2'] = "Externo (kirilloid.ru)";
t['27'] = "&iquest;Qu&eacute; analizador usar para las estad&iacute;sticas?";
t['28'] = "Mostrar enlaces del analizador de estadisticas<br>(icono del mundo al lado de usuarios/alianzas)";
t['NONEWVER'] = "Tiene la \u00faltima versi\u00f3n disponible";
t['BVER'] = "Tal ves tengas una versi\u00f3n beta";
t['NVERAV'] = "Hay una nueva versi\u00f3n del script disponible";
t['UPDSCR'] = "Actualizar el script?";
t['CHECKUPDATE'] = "Buscando nuevas versiones del script.<br>Por favor espera...";
t['CROPFINDER'] = 'Buscar Cultivos';
t['AVPPV'] = "Poblaci&oacute;n promedio por aldea";
t['AVPPP'] = "Poblaci&oacute;n promedio por jugador";
t['37'] = "Mostrar la tabla de actualizaci&oacute;n de los recursos";
t['41'] = "Mostrar la tabla de actualizaci&oacute;n de las construcciones";
t['69'] = "Nivel de Registro de la Consola<br>SOLO PARA PROGRAMADORES O DEPURACI&Oacute;N<br>(Valor por defecto = 0)";
t['48'] = "P&aacute;ginas mostradas en la secci&oacute;n 'Comprar' del mercado<br>(Valor por defecto = 1)";
t['U.3'] = 'Nombre de tu capital<br><b>Revisa tu perfil para actualizarla</b>';
t['U.6'] = 'Coordenadas de tu capital<br><b>Revisa tu perfil para actualizarla</b>';
t['MAX'] = 'Max.';
t['TOTTRTR'] = 'Tropas totales que se estan creando';
t['57'] = 'Mostrar distancias y tiempos en tooltips';
t['TB3SL'] = 'Config. de TBeyond';
t['UPDALLV'] = 'Actualizar todas las aldeas. USAR CON MUCHO CUIDADO, PUEDE LLEVAR A QUE BORREN TU CUENTA!';
t['9'] = "Mostrar enlaces adicionales en el menu de la izquierda<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Mapa grande';
t['USETHEMPR'] = 'Llenar proporcionalmente a la cantidad de cada recurso que hay en los almacenes';
t['USETHEMEQ'] = 'Llenar con la misma cantidad de cada recurso';
t['TOWNHALL'] = 'Ayuntamiento';
t['GSRVT'] = 'Versi&oacute;n del servidor';
t['ACCINFO'] = 'Informaci\u00f3n de la Cuenta';
t['NBO'] = 'Hoja de notas';
t['MNUL'] = 'Men&uacute; en el lado izquierdo';
t['STAT'] = 'Estad&iacute;sticas';
t['RESF'] = 'Campos de recursos';
t['VLC'] = 'Centro de la aldea';
t['MAPO'] = 'Opciones del Mapa';
t['COLO'] = 'Opciones de color';
t['DBGO'] = 'Opciones de depuraci&oacute;n (DEBUG)';
t['4'] = 'Mercado';
t['5'] = 'Plaza de reuniones/Cuartel/Taller/Establo';
t['6'] = "Ayuntamiento/Hogar del H&eacute;roe/Armer&iacute;a/Herrer&iacute;a";
t['HEROSMANSION'] = "Hogar del H&eacute;roe";
t['BLACKSMITH'] = 'Armer&iacute;a';
t['ARMOURY'] = 'Herrer&iacute;a';
t['NOW'] = 'Ahora';
t['CLOSE'] = 'Cerrar';
t['USE'] = 'Usar';
t['USETHEM1H'] = 'Llenar con 1 hora de producci&oacute;n de esta aldea';
t['OVERVIEW'] = 'Resumen';
t['FORUM'] = 'Foro';
t['ATTACKS'] = 'Ataques';
t['NEWS'] = 'Noticias';
t['ADDCRTPAGE'] = 'A\u00F1adir P\u00E1gina Actual';
t['SCRPURL'] = 'P\u00E1g. de TBeyond';
t['50'] = 'Nֲ° de esp&iacute;as para selecionar por defecto en "Seleccionar espֳ­as"';
t['SPACER'] = 'Separador';
t['53'] = 'Mostrar informaci&oacute;n de tropas en tooltips';
t['MEREO'] = 'Mensajes y Reportes';
t['59'] = 'N&uacute;mero de pag&iacute;nas de mensajes/reportes precargadas<br>(Valor por defecto = 1)';
t['ATTABLES'] = 'Tabla de tropas';
t['MTW'] = 'Disponible';
t['MTX'] = 'Excedido';
t['MTC'] = 'Carga actual';
t['ALFL'] = 'V&iacute;nculo a foro externo<br>(Dejar en blanco para foro interno)';
t['82.L'] = 'Bloquear marcadores (Ocultar iconos de eliminar, subir, bajar)';
t['MTCL'] = 'Limpiar todo';
t['82.U'] = 'Desbloquear marcadores (Mostrar iconos de eliminar, subir, bajar)';
t['CKSORT'] = 'Haga clic para ordenar';
t['MIN'] = 'Min';
t['SVGL'] = "Compartir entre las aldeas";
t['VGL'] = 'Lista de Aldeas';
t['12'] = "Mostrar enlaces 'dorf1.php' y 'dorf2.php'";
t['UPDATEPOP'] = 'Actualizar habitantes';
t['54'] = 'Mostrar tiempos y distancias a aldeas en tooltips';
t['EDIT'] = 'Editar';
t['58'] = 'Mostrar tabla de Jugadores/Aldeas/Oasis ocupados';
t['NEWVILLAGEAV'] = 'Fecha/Hora';
t['TIMEUNTIL'] = 'Tiempo a esperar';
t['61'] = 'Mostrar la tabla "Borrar todo" en la p\u00e1gina de Informes';
t['62'] = 'Mostrar \u00edcono "Enviar IGM" tambi\u00e9n para mi';
t['CENTERMAP'] = 'Centrar mapa sobre esta aldea';
t['13'] = 'Mostrar \u00edcono "Centrar mapa sobre esta aldea"';
t['SENDTROOPS'] = 'Enviar tropas';
t['64'] = 'Mostrar detalles en Inf\u00f3rmes Estad\u00edsticos';
t['7'] = "Palacio/Residencia/Academia/Tesoro";
t['PALACE'] = "Palacio";
t['RESIDENCE'] = "Residencia";
t['ACADEMY'] = "Academia";
t['TREASURY'] = "Tesoro";
t['45'] = "Mostrar nivel parpadeando en los edificios que est\u00e1n siendo ampliados";
t['14'] = "Mostrar \u00edcono 'Enviar tropas/Enviar recursos' en lista de aldeas";
t['36'] = "Mostrar los cֳ¡lculos de 'Hasta entonces/Excedentes'<br>en las tablas de entrenamiento/mejora";
t['RESIDUE'] = 'Excedentes si construyes ';
t['RESOURCES'] = 'Recursos';
t['34'] = 'Mostrar PC/d\u00EDa en tablas de actualizaci\u00F3n';
t['UPGTB'] = 'Tablas de actualizaci\u00F3n de Recursos y Edificios';
t['35'] = 'Mostrar consumo de cereales en tablas de actualizaci\u00F3n';
t['16'] = 'Mostrar producci\u00F3n efectiva de cereales en lista de aldeas';
t['RBTT'] = 'Barras de Recursos';
t['39'] = "Mostrar tabla 'Barras de Recursos'";
t['40'] = "Mostrar tabla 'Barras de Recursos' como ventana flotante";
t['21'] = "Mostrar 'marcadores' como ventana flotante";
t['23'] = "Mostrar 'hoja de notas' como ventana flotante";
t['17'] = 'Mostrar cantidad de habitantes en lista de aldeas';
t['29'] = 'Analizador de Mapas a ser usado';
t['30'] = 'Mostrar v\u00EDnculo a mapa, para un usuario';
t['31'] = 'Mostrar v\u00EDnculo a mapa, para una alianza';
t['63'] = 'Mostrar Reportes de Batalla mejorados de TB3';
t['18'] = 'Mostrar lista de aldeas adicional (2 columnas) como ventana flotante';
t['60'] = 'Mostrar v\u00EDnculos para abrir mensajes/informes como ventanas emergentes';
t['42'] = 'Ordenar edificios por su nombre en tablas de actualizaci\u00F3n';
t['19'] = 'Mostrar informaci\u00F3n acerca de edificios en construcci\u00F3n y movimiento de tropas<br>en lista de aldeas';
t['32'] = "Mostrar 'Buscador'";
t['3'] = 'Forzar el c\u00E1lculo de capacidad de Legionarios y Falanges seg\u00FAn T3.1<br>(para servidores mixtos T3.1 & T3.5)';
t['33'] = "Mostrar 'Buscador' como ventana flotante";
t['2'] = 'Quitar banners publicitarios';
t['SH1'] = "Abra su Perfil para detectar autom\u00E1ticamente la capital/coordenadas<br>Construya el cuartel para la detecci\u00F3n autom\u00E1tica de la raza y<br>abra entonces el centro de la aldea";
t['46'] = "Mostrar informaci\u00F3n adicional para cada mercader en camino";
break;
case "es"://by Psicothika
//avRace = ['Romanos', 'Germanos', 'Galos'];
t['8'] = 'Alianza';
t['SIM'] = 'Simulador de combate';
t['QSURE'] = 'ֲ¿Estֳ¡s seguro?';
t['LOSS'] = 'Pֳ©rdidas';
t['PROFIT'] = 'Ganancias';
t['EXTAV'] = 'Subir nivel';
t['PLAYER'] = 'Jugador';
t['VILLAGE'] = 'Aldea';
t['POPULATION'] = 'Poblaciֳ³n';
t['COORDS'] = 'Coordenadas';
t['MAPTBACTS'] = 'Acciones';
t['SAVED'] = 'Guardado';
t['YOUNEED'] = 'Te falta';
t['TODAY'] = 'hoy';
t['TOMORROW'] = 'maֳ±ana';
t['DAYAFTERTOM'] = 'pasado maֳ±ana';
t['MARKET'] = 'Mercado';
t['BARRACKS'] = 'Cuartel';
t['RAP'] = 'Plaza de reuniones';
t['STABLE'] = 'Establo';
t['WORKSHOP'] = 'Taller';
t['SENDRES'] = 'Enviar recursos';
t['BUY'] = 'Comprar';
t['SELL'] = 'Vender';
t['SENDIGM'] = 'Enviar IGM';
t['LISTO'] = 'Disponible';
t['ON'] = 'el';
t['AT'] = 'a las';
t['EFICIENCIA'] = 'Eficacia';
t['NEVER'] = 'Nunca';
t['ALDEAS'] = 'Aldea(s)';
t['TIEMPO'] = 'Tiempo';
t['OFREZCO'] = 'Ofrezco';
t['BUSCO'] = 'Busco';
t['TIPO'] = 'Tipo';
t['DISPONIBLE'] = 'Solo disponible';
t['CUALQUIERA'] = 'Cualquiera';
t['YES'] = 'Si';
t['NO'] = 'No';
t['LOGIN'] = 'Identificarse';
t['MARCADORES'] = 'Marcadores';
t['ANYADIR'] = 'Aֳ±adir';
t['UBU'] = 'URL del nuevo Marcador';
t['UBT'] = 'Nombre del nuevo Marcador';
t['DEL'] = 'Eliminar';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Tiempo mֳ¡ximo';
t['ARCHIVE'] = 'Archivar';
t['SUMMARY'] = 'Resumen';
t['TROPAS'] = 'Tropas';
t['CHKSCRV'] = 'Actualizar TBeyond';
t['ACTUALIZAR'] = 'Actualizar informaciֳ³n sobre la aldea';
t['VENTAS'] = 'Guardar ofertas';
t['MAPSCAN'] = 'Escanear el Mapa';
t['BIC'] = 'Mostrar iconos de acceso rֳ¡pido';
t['22'] = 'Mostrar block de notas';
t['SAVE'] = 'Guardar';
t['49'] = 'Opciֳ³n por defecto para el enviֳ³ de tropas';
t['AT2'] = 'Refuerzos';
t['AT3'] = 'Ataque: Normal';
t['AT4'] = 'Ataque: Atraco';
t['24'] = 'Tamaֳ±o del block de notas';
t['NBSA'] = 'Automֳ¡tico';
t['NBSN'] = 'Normal (pequeֳ±o)';
t['NBSB'] = 'Grande (alargado)';
t['25'] = 'Altura del block de notas';
t['NBHAX'] = 'Expandir altura automֳ¡ticamente';
t['NBHK'] = 'Altura por defecto';
t['43'] = 'Mostrar el nivel de las construcciones en el centro de la aldea';
t['NPCSAVETIME'] = 'Tiempo ahorrado: ';
t['38'] = 'Mostrar colores en el nivel de los recursos';
t['44'] = 'Mostrar colores en el nivel de las construcciones';
t['65'] = 'Color para las actualizaciones disponibles <br>(Defecto = En blanco)';
t['66'] = 'Color para los niveles mֳ¡ximos<br>(Defecto = En blanco)';
t['67'] = 'Color para las actualizaciones no disponibles<br>(Defecto = En blanco)';
t['68'] = 'Color para actualizar por medio de NPC<br>(Defecto = En blanco)';
t['TOTALTROOPS'] = 'Total de tropas de la aldea';
t['20'] = 'Mostrar marcadores';
t['U.2'] = 'Raza';
t['1'] = "Servidor de Travian v2.x?";
t['SELECTALLTROOPS'] = "Seleccionar todas las tropas";
t['PARTY'] = "Fiesta";
t['CPPERDAY'] = "PC por dֳ­a";
t['SLOT'] = "Espacio disponible";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Seleccionar espֳ­as";
t['SELECTFAKE'] = "Seleccionar unidad para fake (Engaֳ±o)";
t['NOSCOUT2FAKE'] = "No es posible usar espֳ­as para hacer un fake!";
t['NOTROOP2FAKE'] = "No hay tropas para usar como fake!";
t['NOTROOP2SCOUT'] = "No hay espֳ­as!";
t['NOTROOPS'] = "No hay tropas en la aldea!";
t['ALL'] = "Todo";
t['NORACE'] = "Construir el cuartel para determinar automֳ¡ticamente la raza y / o abrir el centro de la aldea ...";
t['SH2'] = "Puedes modificar o personalizar los colores, escribiendo en los campos destinados al color:<br>- Green, Red, orange, etc.<br>- El cֳ³digo Hexadecimal del color como por ejemplo #004523.<br>- Dejar en blanco para usar el color por defecto.";
t['SOREP'] = "Mostrar el reporte original (para poner en foros)";
t['56'] = "Mostar la descripciֳ³n del tipo de casilla/oasis<br>al pasar el mouse por encima de la casilla.";
t['10'] = "ֲ¿Quֳ© simulador de ataque deseas usar?:<br>(menֳ÷ izquierdo)";
t['WSIMO1'] = "Interno (el que trae travian por defecto)";
t['WSIMO2'] = "Externo (promovido por kirilloid.ru)";
t['27'] = "ֲ¿Quֳ© Analizador de estadֳ­sticas deseas usar?";
t['28'] = "Mostrar enlaces del analizador de estadֳ­sticas<br>(icono de la bola del mundo al lado de usuarios/alianzas)";
t['NONEWVER'] = "Usted tiene la ֳ÷ltima versiֳ³n disponible";
t['BVER'] = "Usted dispone de una versiֳ³n de prueba";
t['NVERAV'] = "Una nueva versiֳ³n del script estֳ¡ disponible";
t['UPDSCR'] = "ֲ¿Actualizar el script?";
t['CHECKUPDATE'] = "Buscando una nueva versiֳ³n del script.<br>Por favor espere...";
t['CROPFINDER'] = "Bֳ÷squeda 9c / 15c";
t['AVPPV'] = "Promedio de poblaciֳ³n por aldea";
t['AVPPP'] = "Promedio de poblaciֳ³n por jugador";
t['37'] = "Mostrar la tabla de actualizaciֳ³n de recursos";
t['41'] = "Mostrar la tabla de actualizaciֳ³n de las construcciones";
t['69'] = "Nivel de Registro de la Consola<br>SOLO PARA PROGRAMADORES O DEPURACIֳ“N<br>(Valor por defecto = 0)";
t['48'] = "Pֳ¡ginas mostradas en la secciֳ³n 'Comprar' del mercado<br>(Valor por defecto = 1)";
t['U.3'] = 'Nombre de tu capital<br>Entra en tu perfil para actualizarla';
t['U.6'] = 'Coordenadas de tu capital<br>Entra en tu perfil para actualizarlas';
t['MAX'] = 'Mֳ¡ximo.';
t['TOTTRTR'] = 'Tropas totales que se estֳ¡n creando';
t['57'] = 'Mostrar distancias y tiempos en un mensaje emergente';
t['TB3SL'] = 'Configurar TBeyond';
t['UPDALLV'] = 'Actualizar todas las aldeas. USAR CON MUCHO CUIDADO, PUEDE LLEVAR A QUE BORREN TU CUENTA!';
t['9'] = "Mostrar enlaces adicionales en el menֳ÷ de la izquierda<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Mapa grande';
t['USETHEMPR'] = 'Repartir la cantidad de recursos de los almacenes (de manera proporcional)';
t['USETHEMEQ'] = 'Repartir la cantidad de recursos de los almacenes (equitativa=misma cantidad)';
t['TOWNHALL'] = 'Ayuntamiento';
t['GSRVT'] = 'Versiֳ³n del servidor';
t['ACCINFO'] = 'Informaciֳ³n de la Cuenta';
t['BOOKMARKOPTIONS'] = 'Marcadores';
t['NBO'] = 'Block de notas';
t['MNUL'] = 'Menֳ÷ en el lado izquierdo';
t['STAT'] = 'Estadֳ­sticas';
t['RESF'] = 'Campos de recursos';
t['VLC'] = 'Centro de la aldea';
t['MAPO'] = 'Opciones del mapa';
t['COLO'] = 'Opciones de color';
t['DBGO'] = 'Opciones de depuraciֳ³n (DEBUG MODE)';
t['4'] = 'Mercado';
t['5'] = 'Plaza de reuniones/Cuartel/Taller/Establo';
t['6'] = "Ayuntamiento/Hogar del Hֳ©roe/Armerֳ­a/Herrerֳ­a";
t['HEROSMANSION'] = "Hogar del Hֳ©roe";
t['BLACKSMITH'] = 'Herrerֳ­a';
t['ARMOURY'] = 'Armerֳ­a';
t['NOW'] = 'Ahora';
t['CLOSE'] = 'Cerrar';
t['USE'] = 'Usar';
t['USETHEM1H'] = 'Repartir materias primas de esta aldea (1 hora de producciֳ³n)';
t['OVERVIEW'] = 'Resumen';
t['FORUM'] = 'Foro';
t['ATTACKS'] = 'Ataques';
t['NEWS'] = 'Noticias';
t['ADDCRTPAGE'] = 'Aֳ±adir pֳ¡gina actual';
t['SCRPURL'] = 'Pֳ¡gina de TBeyond';
t['50'] = 'Nֲ° de espֳ­as para seleccionar por defecto en<br>"Seleccionar espֳ­as"';
t['SPACER'] = 'Espacio';
t['53'] = 'Mostrar informaciֳ³n de las tropas en mensajes emergentes';
t['MEREO'] = 'Mensajes y Reportes';
t['59'] = 'Nֳ÷mero de pֳ¡ginas de mensajes/reportes precargados<br>(Valor por defecto = 1)';
t['ATTABLES'] = 'Tabla de tropas';
t['MTW'] = 'Disponible';
t['MTX'] = 'Excedido';
t['MTC'] = 'Carga actual';
t['ALFL'] = 'Vֳ­nculo a foro externo<br>(Dejar en blanco para foro interno)';
t['82.L'] = 'Bloquear marcadores (Ocultar iconos de eliminar, subir, bajar)';
t['MTCL'] = 'Limpiar todo';
t['82.U'] = 'Desbloquear marcadores (Mostrar iconos de eliminar, subir, bajar)';
t['CKSORT'] = 'Haga clic aquֳ­ para ordenar';
t['MIN'] = 'Mֳ­nimo';
t['SVGL'] = 'Repartir entre las aldeas';
t['VGL'] = 'Lista de Aldeas';
t['12'] = "Mostrar enlaces 'dorf1.php' y 'dorf2.php'";
t['UPDATEPOP'] = 'Actualizar habitantes';
t['54'] = 'Mostrar tiempos y distancias a aldeas en mensajes emergentes';
t['EDIT'] = 'Editar';
t['NPCO'] = 'Asistente de opciones del NPC';
t['26'] = 'Mostrar Asistente de NPC para calculadora/enlaces';
t['58'] = 'Mostrar tabla de Jugadores/Aldeas/Oasis ocupados';
t['NEWVILLAGEAV'] = 'Fecha/Hora';
t['TIMEUNTIL'] = 'Tiempo de espera';
t['61'] = 'Mostar "Borrar todo" en la pֳ¡gina de informes';
t['62'] = 'Mostrar icono "Enviar IGM" para mitambiֳ©n';
t['CENTERMAP'] = 'Centrar mapa sobre esta aldea';
t['13'] = 'Mostrar icono "Centrar mapa sobre esta aldea"';
t['SENDTROOPS'] = 'Enviar tropas';
t['64'] = 'Mostrar detalles estadֳ­sticos en los reportes';
t['7'] = "Palacio/Residencia/Academia/Tesoro";
t['PALACE'] = "Palacio";
t['RESIDENCE'] = "Residencia";
t['ACADEMY'] = "Academia";
t['TREASURY'] = "Tesoro";
t['45'] = "Mostrar nivel parpadeando en los edificios que estֳ¡n siendo ampliados";
t['14'] = "Mostrar icono 'Enviar tropas/Enviar recursos' en lista de aldeas";
t['34'] = "Ver informaciֳ³n de CP por dֳ­a en la actualizaciֳ³n de las tablas";
t['UPGTB'] = "Mostrar actualizaciones en las tablas de  recursos y edificios.";
t['35'] = "Mostrar actualizaciones en las tablas de consumo de cereal.";
t['16'] = "Mostrar eficacia de producciֳ³n de cereal en el listado de aldeas";
t['RBTT'] = "Recursos";
t['39'] = "Ver tabla de 'Recursos'";
t['40'] = "Ver tabla de 'Recursos' en una ventana flotante";
t['21'] = "Ver tabla de 'Enlaces' en una ventana flotante";
t['23'] = "Ver 'Block de notas' en una ventana flotante";
t['17'] = "Mostrar poblaciֳ³n en el listado de aldeas";
t['29'] = 'Usar el analizador del mapa';
t['30'] = 'Mostrar mapa de enlaces para usuarios';
t['31'] = 'Mostrar mapa de enlaces para alianzas';
t['63'] = 'Mostar TB3 en los informes de batalla';
t['18'] = 'Muestra en 2 columnas una lista de aldeas en una ventana flotante';
t['60'] = 'Mostrar vֳ­nculos para abrir los mensajes e informes en ventanas emergentes';
t['42'] = 'Ordenar edificios por su nombre en la tabla de actualizaciones';
t['19'] = 'Mostrar informaciֳ³n sobre los avances en los edificios y los movimientos de tropas en el listado de aldeas';
t['32'] = "Mostrar 'Barra de Bֳ÷squeda'";
t['3'] = 'Forzar T3.1 Legionnaire & Phalanx capacity calculation<br>(para servidores mixtos T3.1 & T3.5)';
t['33'] = "Ver 'Barra de Bֳ÷squeda' en una ventana flotante";
t['36'] = "Mostrar los cֳ¡lculos de 'Hasta entonces/Excedentes'<br>en las tablas de entrenamiento/mejora";
t['RESIDUE'] = 'Excedentes si construyes ';
t['RESOURCES'] = 'Recursos';
t['2'] = 'Eliminar anuncios';
t['15'] = "Mostrar la produccion por hora de madera, barro, hierro y cereal en el listado de aldeas";
t['11'] = "Enlace para la publicaciֳ³n de informes";
break;
case "fr"://by fr3nchlover & britch & sp4m4me
//avRace = ['Romains', 'Germains', 'Gaulois'];
t['SIM'] = 'Simulateur';
t['QSURE'] = 'Es-tu certain ?';
t['LOSS'] = 'Pertes en matֳ©riels';
t['PROFIT'] = 'Rentabilitֳ©';
t['EXTAV'] = 'Tu peux dֳ©jֳ  augmenter son niveau';
t['PLAYER'] = 'Joueur';
t['POPULATION'] = 'Population';
t['COORDS'] = 'Coordonnֳ©es';
t['SAVED'] = 'Sauvegarde';
t['YOUNEED'] = 'Il manque';
t['TODAY'] = 'aujourd\'hui';
t['TOMORROW'] = 'demain';
t['DAYAFTERTOM'] = 'aprֳ¨s-demain';
t['MARKET'] = 'Place du marchֳ©';
t['BARRACKS'] = 'Caserne';
t['RAP'] = 'Place de rassemblement';
t['STABLE'] = 'Ecurie';
t['WORKSHOP'] = 'Atelier';
t['SENDRES'] = 'Envoyer des ressources';
t['BUY'] = 'Acheter des ressources';
t['SELL'] = 'Vendre des ressources';
t['SENDIGM'] = 'Envoyer MSG';
t['LISTO'] = 'Prֳ×t';
t['ON'] = 'le';
t['AT'] = 'ֳ ';
t['EFICIENCIA'] = 'Efficacitֳ©';
t['NEVER'] = 'Jamais';
t['TIEMPO'] = 'Temps';
t['OFREZCO'] = 'Offre';
t['BUSCO'] = 'Recherche';
t['DISPONIBLE'] = 'Disponible';
t['CUALQUIERA'] = 'Toutes';
t['YES'] = 'Oui';
t['NO'] = 'Non';
t['MARCADORES'] = 'Liens';
t['ANYADIR'] = 'Ajouter';
t['UBU'] = 'URL du nouveau lien';
t['UBT'] = 'Texte du nouveau lien';
t['DEL'] = 'Supprimer';
t['MAPA'] = 'Carte';
t['MAXTIME'] = 'Temps maximum';
t['SUMMARY'] = 'Rֳ©sumֳ©';
t['TROPAS'] = 'Troupes';
t['CHKSCRV'] = 'Mֳ J TBeyond';
t['ACTUALIZAR'] = 'Mise a jour informations village';
t['VENTAS'] = 'Paramֳ¨tres Vente';
t['MAPSCAN'] = 'Analyse de la carte - ATTENTION NE PAS UTILISER- RISQUE BLOCAGE OP !';
t['BIC'] = 'Afficher les icones ֳ©tendues';
t['22'] = 'Afficher le bloc-notes';
t['SAVE'] = 'Sauver';
t['49'] = 'Action par dֳ©faut sur place de rassemblement';
t['AT2'] = 'Assistance';
t['AT3'] = 'Attaque: Normal';
t['AT4'] = 'Attaque: Pillage';
t['24'] = 'Taille Bloc-notes';
t['NBSN'] = 'Normal';
t['NBSB'] = 'Large';
t['25'] = 'Hauteur Bloc-notes';
t['NBHAX'] = 'Hauteur Auto';
t['NBHK'] = 'Hauteur par dֳ©faut';
t['43'] = 'Afficher nombres';
t['NPCSAVETIME'] = 'Sauver : ';
t['38'] = 'Afficher les ressources en couleur';
t['44'] = 'Afficher les batiments en couleur';
t['65'] = 'Couleur pour Construction possible<br>(Vide = couleur par dֳ©faut)';
t['66'] = "Couleur pour 'Niveau max'<br>(Vide = couleur par dֳ©faut)";
t['67'] = "Couleur pour 'Construction impossible'<br>(Vide = couleur par dֳ©faut)";
t['68'] = "Couleur pour 'Construction avec NPC'<br>(Vide = dֳ©faut)";
t['TOTALTROOPS'] = 'Troupes totales du village';
t['20'] = 'Afficher les liens favoris';
t['U.2'] = 'Peuple';
t['1'] = "Serveur Travian v2.x";
t['SELECTALLTROOPS'] = "Tout sֳ©lectionner";
t['PARTY'] = "Festivitֳ©s";
t['CPPERDAY'] = "PC/jour";
t['SELECTSCOUT'] = "Eclaireur";
t['SELECTFAKE'] = "Diversion";
t['NOSCOUT2FAKE'] = "Un Eclaireur ne peut pas faire diversion !";
t['NOTROOP2FAKE'] = "Pas de troupes pour une diversion !";
t['NOTROOP2SCOUT'] = "Pas de troupes pour partir en reconnaissance !";
t['NOTROOPS'] = "Pas de troupes dans le village !";
t['ALL'] = "Tout";
t['SH2'] = "Dans case 'Couleur' vous pouvez saisir :<br>-red ou orange, etc.<br>- ou une couleur HEX exemple :#004523<br>- Laisser vide pour couleur par dֳ©faut";
t['SOREP'] = "Rapport original (A cocher obligatoirement avant diffusion du RC)";
t['56'] = "Affiche le type de case (sur carte)<br>lorsdu survol du curseur";
t['10'] = "Simulateur de combat ֳ  utiliser :<br>(menu gauche)";
t['WSIMO1'] = "Interne (celui du jeu)";
t['WSIMO2'] = "Externe (fourni par kirilloid.ru)";
t['27'] = "Analyseur ֳ  utiliser ";
t['28'] = "Afficher liens Analyseur";
t['NONEWVER'] = "Pas de mise ֳ  jour disponible";
t['BVER'] = "Tu as une version Beta du script (supֳ©rieure ֳ  version officielle) - Mise ֳ  jour impossible";
t['NVERAV'] = "Une nouvelle version du script est disponible";
t['UPDSCR'] = "Mettre ֳ  jour le script ?";
t['CHECKUPDATE'] = "Recherche de nouvelle version du script.<br>Veuillez patienter...";
t['CROPFINDER'] = "Recherche 15C";
t['AVPPV'] = "Population moyenne par village";
t['AVPPP'] = "Population moyenne par joueur";
t['37'] = "Afficher tableau sur page ressources";
t['41'] = "Afficher tableau sur page batiments";
t['69'] = "Console Log - Rֳ‰SERVֳ‰ aux DEVELOPPEURS et DEBUGGEURS<br>(Dֳ©faut = 0)";
t['48'] = "Nombre de pages des offres marchֳ© ('Marchֳ© => Offre')<br>ֳ  charger/consulter (Dֳ©faut = 1)";
t['U.3'] = 'Nom de la Capitale';
t['U.6'] ='Coordonnֳ©es de la Capitale';
t['TOTTRTR'] = 'Total troupes en fabrication ';
t['57'] = 'Afficher distance & temps';
t['UPDALLV'] = 'Actualiser tous les villages. ATTENTION : NE PAS UTILISER - RISQUE BLOCAGE OP. !';
t['9'] = "Ajouter liens dans menu gauche<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Carte ֳ©tendue';
t['USETHEMPR'] = 'Calculer (proportionnel)';
t['USETHEMEQ'] = 'Calculer (ֳ©galitֳ©)';
t['TOWNHALL'] = 'Hotel de ville';
t['GSRVT'] = 'Type de serveur';
t['ACCINFO'] = 'Donnֳ©es personnelles';
t['NBO'] = 'Bloc-notes';
t['MNUL'] = 'Menu ֳ  gauche';
t['STAT'] = 'Statistiques';
t['RESF'] = 'Vue globale';
t['VLC'] = 'Centre village';
t['MAPO'] = 'options Carte';
t['COLO'] = 'options Couleur';
t['DBGO'] = 'options Debug';
t['4'] = 'Marchֳ©';
t['5'] = 'Rassemblement/Caserne/Atelier/Etable';
t['6'] = "Hotel de ville/Manoir hֳ©ros/Armurerie/Usine";
t['HEROSMANSION'] = "Manoir Hֳ©ros";
t['BLACKSMITH'] = "Armurerie";
t['ARMOURY'] = "Usine armure";
t['NOW'] = 'Maintenant';
t['CLOSE'] = 'Fermer';
t['USE'] = 'Utiliser';
t['USETHEM1H'] = 'Calculer 1h de Prod.';
t['OVERVIEW'] = 'Vue globale';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Attaques';
t['NEWS'] = 'Nouvelles';
t['ADDCRTPAGE'] = 'Marquer cette page';
t['SCRPURL'] = 'Page TBeyond';
t['50'] = 'Nb. d\'ֳ©claireurs lors du clic sur "Eclaireur"';
t['SPACER'] = 'Sֳ©parateur';
t['53'] = 'Afficher info troupes dans info-bulle';
t['MEREO'] = 'Messages & Rapports';
t['59'] = 'Nb. de pages message/rapport ֳ  charger<br>(Dֳ©faut = 1)';
t['ATTABLES'] = 'Liste troupes';
t['MTW'] = 'Non utilisֳ©';
t['MTX'] = 'En trop';
t['MTC'] = 'Transportֳ©';
t['ALFL'] = 'Lien vers forum externe<br>(Laisser vide pour forum interne)';
t['82.L'] = 'Verrouiller (Cache icones pour gֳ©rer les liens)';
t['MTCL'] = 'Tout effacer';
t['82.U'] = 'Dֳ©verrouiller (Affiche icones pour gֳ©rer les liens)';
t['CKSORT'] = 'Cliquer pour trier';
t['SVGL'] = 'Sauver pour tous';
t['VGL'] = 'Liste des Villages';
t['12'] = "Afficher liens 'Global' et 'Centre' sur liste des Villages";
t['UPDATEPOP'] = 'MaJ pop.';
t['54'] = 'Afficher distance temps dans info bulle';
t['EDIT'] = 'Editer';
t['NPCO'] = 'Options assistant NPC';
t['26'] = 'Afficher options NPC Assistant';
t['58'] = 'Afficher tableau joueurs/villages/oasis';
t['NEWVILLAGEAV'] = 'Date/Heure';
t['TIMEUNTIL'] = 'Temps d attente';
t['61'] = 'Afficher "Tout supprimer" dans page de rapports';
t['62'] = 'Afficher icone "Envoi message" pour moi aussi';
t['CENTERMAP'] = 'Centrer la carte sur ce village';
t['13'] = 'Afficher l icone "Centrer sur ce village"';
t['ALLOWINETGP'] = 'Permettre packs graphiques Internet';
t['SENDTROOPS'] = 'Envoyer troupes';
t['64'] = 'Afficher detail Statistiques dans rapport';
t['7'] = "Palais/Residence/Academie/Tresor";
t['PALACE'] = "Palais";
t['RESIDENCE'] = "Rֳ©sidence";
t['ACADEMY'] = "Acadֳ©mie";
t['TREASURY'] = "Trֳ©sor";
t['45'] = "Afficher niveau clignotant sur batiment constructible";
t['14'] = "Afficher icones 'Envoyer troupes/Envoyer ressources' dans la liste des villages";
t['34'] = "Afficher PC/jour dans le tableau";
t['UPGTB'] = "Tableau de mise a jour des batiments/champs";
t['35'] = "Afficher la consommation de cereales dans le tableau";
t['16'] = "Afficher la production de cereales dans la liste des villages";
t['RBTT'] = "Barre de ressource";
t['39'] = "Afficher le tableau de 'Barre de ressource'";
t['40'] = "Afficher le tableau de 'Barre de ressource' comme une fenetre flotante";
t['21'] = "Afficher 'Liens favoris' comme une fenetre flotante";
t['23'] = "Afficher 'Bloc note' comme une fenetre flotante";
t['17'] = "Afficher la population dans la liste des villages";
t['29'] = 'Analyser de carte a utiliser';
t['30'] = 'Afficher un lien vers la carte pour les joueurs';
t['31'] = 'Afficher un lien vers la carte pour les alliances';
t['63'] = 'Montrer les RC ameliores TB3';
t['3'] = 'Forcer le calcul des Lֳ©gionnaires & Phalanges T3.1<br>(pour les serveurs mixtes 3.1 et 3.5)';
t['18'] = 'Afficher en plus une liste des villages (2 colonnes) en fenֳ×tre flottante';
t['60'] = 'Montrer liens pour ouvrir les messages/rapports dans une popup';
t['42'] = 'Classer les batiments par nom dans le tableau';
t['19'] = 'Afficher les informations sur les constructions et les mouvements de troupes<br>dans la liste de villages';
t['32'] = "Afficher 'Rechercher'";
t['33'] = "Afficher 'Rechercher' dans fenֳ×tre flottante";
break;
case "nl"://by anonymous author & Boeruh & TforAgree & Dakkie
//avRace = ['Romeinen', 'Germanen', 'Galliֳ«rs'];
t['8'] = 'Alliantie';
t['SIM'] = 'Gevecht simulator';
t['QSURE'] = 'Weet je het zeker?';
t['LOSS'] = 'Verlies';
t['PROFIT'] = 'Winst';
t['EXTAV'] = 'Uitbreiding beschikbaar';
t['PLAYER'] = 'Speler';
t['VILLAGE'] = 'Dorp';
t['POPULATION'] = 'Populatie';
t['COORDS'] = 'Co&ouml;rd';
t['MAPTBACTS'] = 'Acties';
t['SAVED'] = 'Bewaard';
t['YOUNEED'] = 'Nog nodig';
t['TODAY'] = 'vandaag';
t['TOMORROW'] = 'morgen';
t['DAYAFTERTOM'] = 'overmorgen';
t['MARKET'] = 'Marktplaats';
t['BARRACKS'] = 'Barakken';
t['RAP'] = 'Verzamelpunt';
t['STABLE'] = 'Stal';
t['WORKSHOP'] = 'Werkplaats';
t['SENDRES'] = 'Stuur grondstoffen';
t['BUY'] = 'Koop';
t['SELL'] = 'Verkoop';
t['SENDIGM'] = 'Stuur IGM';
t['LISTO'] = 'Uitbreiding beschikbaar';
t['ON'] = 'om';
t['AT'] = 'om';
t['EFICIENCIA'] = 'Effici&euml;ntie';
t['NEVER'] = 'Nooit';
t['ALDEAS'] = 'Dorp(en)';
t['TIEMPO'] = 'Tijd';
t['OFREZCO'] = 'Bieden';
t['BUSCO'] = 'Zoeken';
t['TIPO'] = 'Type';
t['DISPONIBLE'] = 'Alleen beschikbaar';
t['CUALQUIERA'] = 'Elke';
t['YES'] = 'Ja';
t['NO'] = 'Nee';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Links';
t['ANYADIR'] = 'Toevoegen';
t['UBU'] = 'Nieuwe link URL';
t['UBT'] = 'Nieuwe link Text';
t['DEL'] = 'Verwijder';
t['MAPA'] = 'Map';
t['MAXTIME'] = 'Max. tijd';
t['ARCHIVE'] = 'Archiveer';
t['SUMMARY'] = 'Samenvatting';
t['TROPAS'] = 'Troepen';
t['CHKSCRV'] = 'Update TBeyond';
t['ACTUALIZAR'] = 'Update dorp informatie';
t['VENTAS'] = 'Opgeslagen verkopen';
t['MAPSCAN'] = 'Scan de map';
t['BIC'] = 'Uitgebreide iconen zichtbaar';
t['SAVE'] = 'Opslaan';
t['49'] = 'Verzamelplaats standaard aktie';
t['AT2'] = 'Versterking';
t['AT3'] = 'Aanval';
t['AT4'] = 'Overval';
t['22'] = 'Kladblok zichtbaar';
t['24'] = 'Kladblok grote';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normaal (klein)';
t['NBSB'] = 'Groot';
t['25'] = 'Kladblok hoogte';
t['NBHAX'] = 'Automatisch groter maken';
t['NBHK'] = 'Standaard hoogte';
t['43'] = 'Dorp nummers weergeven';
t['NPCSAVETIME'] = 'Bespaar: ';
t['38'] = 'Grondstof kleur niveau weergeven';
t['44'] = 'Gebouwen kleur niveau weergeven';
t['65'] = 'Kleur voor uitbreidbaar<br>(Standaard leeg)';
t['66'] = 'Kleur max level<br>(Standaard leeg)';
t['67'] = 'Kleur niet uitbreidbaar<br>(Standaard leeg)';
t['68'] = 'Kleur uitbreidbaar via NPC<br>(Standaard leeg)';
t['TOTALTROOPS'] = 'Totaal dorp troepen';
t['SHOWDISTANCES'] = 'Afstand weergeven';
t['20'] = 'Links laten zien';
t['U.2'] = 'Ras';
t['1'] = "Travian v2.x server";
t['SELECTALLTROOPS'] = "Selecteer alle troepen";
t['PARTY'] = "Feest";
t['CPPERDAY'] = "CP/dag";
t['SLOT'] = "Slot";
t['TOTAL'] = "Totaal";
t['SELECTSCOUT'] = "Selecteer verkenners";
t['SELECTFAKE'] = "Selecteer fake";
t['NOSCOUT2FAKE'] = "Je kunt geen verkenners gebruiken voor een nep aanval";
t['NOTROOP2FAKE'] = "Er zijn geen troepen voor een nep aanval";
t['NOTROOP2SCOUT'] = "Er zijn geen troepen om te verkennen";
t['NOTROOPS'] = "Geen troepen in dit dorp";
t['ALL'] = "Alles";
t['SH2'] = "In de kleur velen mag je invullen:<br>- <b>green</b>, <b>red</b> or <b>orange</b>, etc.<br>- de HEX kleur code zoals <b>#004523</b><br>- leeg laten voor standaard kleur";
t['SOREP'] = "Laat orgineel bericht zien (voor verzenden)";
t['56'] = "Laat veld type/oase info zien<br>bij muisover het veld";
t['10'] = "Veldslagsimulator link gebruiken:<br>(in menu links)";
t['WSIMO1'] = "Die van het spel";
t['WSIMO2'] = "Externe (door kirilloid.ru)";
t['27'] = "World Analyser gebruiken";
t['28'] = "Show analyser statistic links";
t['NONEWVER'] = "Je hebt de laatste versie";
t['BVER'] = "Je hebt waarschijnlijk een beta versie";
t['NVERAV'] = "Er is een nieuwe versie beschikbaar";
t['UPDSCR'] = "Update script nu ?";
t['CHECKUPDATE'] = "Voor updates controleren... Een moment.";
t['CROPFINDER'] = "Graanvelden zoeker";
t['AVPPV'] = "Gemiddelde populatie per dorp";
t['AVPPP'] = "Gemiddelde populatie per speler";
t['37'] = "Grondstofvelden uitbreidings tabel weergeven";
t['41'] = "Gebouwen uitbereidings tabel weergeven";
t['69'] = "Console Log Niveau (Standaard = 0)<br>(alleen voor programeurs of debugging)";
t['48'] = "Aantal pagina's voorladen<br>bij 'Marktplaats => kopen'<br>(Standaard = 1)";
t['U.3'] = 'Naam van hoofddorp<br><b>Niet bewerken, ga hiervoor naar je profiel</b>';
t['U.6'] = 'Coordinaten van hoofddorp<br><b>Niet bewerken, ga hiervoor naar je profiel</b>';
t['TOTTRTR'] = 'Totaal aantal troepen';
t['57'] = 'Afstanden en tijden laten zien';
t['UPDALLV'] = 'Update alle dorpen. LETOP: Bij vaak gebruik kan dit lijden tot een ban van travain!';
t['LARGEMAP'] = 'Grote map';
t['9'] = 'Extra link laten zien in linker menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)';
t['USETHEMPR'] = 'Verdeel (procentueel)';
t['USETHEMEQ'] = 'Verdeel (Gelijkmatig)';
t['TOWNHALL'] = 'Raadhuis';
t['GSRVT'] = 'Server versie';
t['NBO'] = 'Kladblok';
t['MNUL'] = 'Linker menu';
t['STAT'] = 'Statistieken';
t['RESF'] = 'Grondstof velden';
t['VLC'] = 'Dorp centrum';
t['MAPO'] = 'Map opties';
t['COLO'] = 'Kleur opties';
t['DBGO'] = 'Debug opties';
t['4'] = 'Marktplaats';
t['5'] = 'Verzamelplaats/Barakken/Werkplaatsen/Stal';
t['6'] = "Raadhuis/Heldenhof/Uitrustingssmederij/Wapensmid";
t['HEROSMANSION'] = "Heldenhof";
t['BLACKSMITH'] = "Wapensmid";
t['ARMOURY'] = "Uitrustingssmederij";
t['NOW'] = 'Nu';
t['CLOSE'] = 'Sluit';
t['USE'] = 'Verdeel het';
t['USETHEM1H'] = 'Verdeel (1 uur productie)';
t['OVERVIEW'] = 'Overzicht';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Aanvallen';
t['NEWS'] = 'Nieuws';
t['ADDCRTPAGE'] = 'Huidige pagina';
t['SCRPURL'] = 'TBeyond pagina';
t['50'] = 'Aantal scouts voor de<br>"Selecteer verkenners" functie';
t['SPACER'] = 'Scheidingsteken';
t['53'] = 'Troepen info laten zien bij muis op plaatjes.';
t['MEREO'] = 'Berichten & Raportages';
t['59'] = 'Aantal paginas voorladen<br>(Standaard = 1)';
t['ATTABLES'] = 'Troepen tabellen';
t['MTW'] = 'Ruimte over';
t['MTX'] = 'Te veel';
t['MTC'] = 'Huidige lading';
t['ALFL'] = 'Link naar extern forum<br>(Leeg laten voor intern forum)';
t['82.L'] = 'Bladwijzers vast zetten (Verberg de verwijder en verplaats iconen)';
t['MTCL'] = 'Leeg alle velden';
t['SVGL'] = 'Beschikbaar voor alle dorpen';
t['CKSORT'] = 'Klik voor sorteren';
t['SVGL'] = 'Voor elk dorp gebruiken';
t['VGL'] = 'Dorpen lijst';
t['12'] = "Laat de 'dorf1.php' en 'dorf2.php' links zien";
t['54'] = 'Afstand en tijd laten zien naar dorp in tooltip';
t['ACCINFO'] = 'Account info';
t['EDIT'] = 'Bewerk';
t['NPCO'] = 'NPC Handel opties';
t['26'] = 'NPC Handelaar links en info laten zien';
t['NEWVILLAGEAV'] = 'Datum/Tijd';
t['TIMEUNTIL'] = 'Wacht tijd';
t['61'] = 'Tabel met "Verwijder" laten zien op raporten pagina';
t['62'] = 'Ook mijn "Stuur IGM" icoon laten zien';
t['CENTERMAP'] = 'Centreer map op dit dorp';
t['13'] = 'Icoon voor "Centreer map op dit dorp" laten zien';
t['45'] = "Laat knipperend icoon zien voor gebouwen die worden gebouwd";
t['3'] = 'Forceer T3.1 Phalanx en Legionair Capaciteits berekening.<br>(Voor gemixte T3.1 & T3.5 servers - meestal .de servers)';
t['7'] = 'Paleis/Residentie/Academie/Schatkamer';
t['14'] = 'Laat "Stuur troepen/Stuur Handelaren" Icoon zien in de dorpen lijst';
t['16'] = 'Laat netto graanproductie zien in de dorpen lijst zien';
t['17'] = 'Laat de Populatie zien in de dorpen lijst zien';
t['18'] = 'Laat extra (2 Kolommen) dorpenlijst zien als zwevend venster';
t['21'] = 'Laat "Gebruikers Links" als zwevend venster zien';
t['23'] = 'Laat "Kladblok" als zwevend venster zien';
t['28'] = 'Laat Analyser statistieken links zien';
t['29'] = 'Welke map analyser te gebruiken:';
t['30'] = 'Laat links naar de kaart zien voor spelers';
t['31'] = 'Laat links naar de kaart zien voor allianties';
t['34'] = 'Laat CP/dag zien in de uitbreidingstabel';
t['35'] = 'Laat graanverbruik zien in de uitbreidingstabel';
t['39'] = 'Laat het "Grondstof productie venster" zien';
t['40'] = 'Laat het "Grondstof productie venster" als zwevend venster zien';
t['55'] = "Automatisch aanwezige troepen invullen";
t['58'] = 'Laat de tabel zien van Spelers/Dorpen/Oases';
t['63'] = 'Laat TB3.5 Uitgebreide Aanvalsrapporten zien';
t['64'] = 'Laat uitgebreide details zien in de statistieken';
t['WSI'] = "In-game gevechts simulator";
break;
case "pt"://by sepacavi & Fujis & VicSilveira
//avRace = ['Romanos', 'Teutֳµes', 'Gauleses'];
t['1'] = "Travian v2.x server";
t['2'] = 'Remover ad banners';
t['3'] = 'Forֳ§ar cֳ¡lculo da capacidade Legionֳ¡rio & Falange T3.1 <br>(para servers mistos T3.1 & T3.5)';
t['4'] = 'Mercado';
t['5'] = 'Ponto de Reuniֳ£o Militar/Quartel/Oficina/Cavalariֳ§a';
t['6'] = "Casa do Povo/Mansֳ£o do Herֳ³i/Fֳ¡brica de Armaduras/Ferreiro";
t['7'] = "Palֳ¡cio/Residֳ×ncia/Academia/Tesouraria";
t['8'] = 'Alianֳ§a';
t['9'] = "Mostrar links adicionais no Menu ֳ  Esquerda<br>(Traviantoolbox, World Analyser, Travilog, Mapa, etc.)";
t['10']= "Link para Simulador de Combates<br>(Menu Esquerdo)";
t['11'] = "Link para o site indicado para postar relatֳ³rios";
t['12'] = "Mostrar links 'dorf1.php' e 'dorf2.php'";
t['13'] = 'Mostrar icon "Centralizar Mapa nesta Aldeia"';
t['14'] = "Mostrar icons 'Envio de Tropas' e 'Envio de Recursos' na Lista de Aldeias";
t['15'] = "Mostrar a produֳ§ֳ£o por hora de madeira, de barro e de ferro na Lista de Aldeias";
t['16'] = "Mostrar Produֳ§ֳ£o de Cereais na Lista de Aldeias";
t['20'] = 'Mostrar Favoritos';
t['39'] = "Mostrar 'Barra de Recursos'";
t['40'] = "Mostrar 'Barra de Recursos' como janela flutuante";
t['17'] = "Mostrar Populaֳ§ֳ£o na Lista de Aldeias";
t['18'] = 'Mostrar adicional (2 colunas) na Lista de Aldeias como janela flutuante';
t['19'] = 'Mostrar informaֳ§ֳ£o sobre Edifֳ­cios a Evoluir e Movimentos de Tropas na Lista de Aldeias';
t['21'] = "Mostrar 'Favoritos' como janela flutuante";
t['22'] = 'Mostrar Bloco de Notas';
t['23'] = "Mostrar 'Bloco de Notas' como janela flutuante";
t['24'] = 'Tamanho do Bloco de Notas';
t['25'] = 'Altura do Bloco de Notas';
t['26'] = 'Mostrar Assistente de Cֳ¡lculos/Links do NPC';
t['27'] = "World Analyser";
t['28'] = "Mostrar links para Analisador de Estatֳ­sticas";
t['29'] = 'Analisador de Mapa';
t['30'] = 'Mostrar links para Mapa para Jogadores';
t['31'] = 'Mostrar links para Mapa para Alianֳ§as';
t['32'] = "Mostrar 'Barra de Pesquisas (Estatֳ­sticas)'";
t['33'] = "Mostrar 'Barra de Pesquisas (Estatֳ­sticas)' como janela flutuante";
t['34'] = "Mostrar informaֳ§ֳ£o PsC/dia nas tabelas de evoluֳ§ֳ£o";
t['35'] = "Mostrar Consumo de Cereais na Tabela de Evoluֳ§ֳ£o de Edifֳ­cios";
t['36'] = "Mostrar o cֳ¡lculo 'Atֳ© entֳ£o/Excedente' nas Tabelas de Evoluֳ§ֳ£o/Treino";
t['37'] = "Mostrar Tabela de Evoluֳ§ֳ£o de Campos de Recursos";
t['38'] = 'Mostrar Cores dos Nֳ­veis de Recursos';
t['41'] = "Mostrar Tabela de Evoluֳ§ֳ£o de Edifֳ­cios";
t['42'] = 'Ordenar Edifֳ­cios por nome na Tabela de Evoluֳ§ֳ£o de Edifֳ­cios';
t['43'] = 'Mostrar Nֳ÷meros no centro';
t['44'] = 'Mostrar Cores dos Nֳ­veis dos Edifֳ­cios';
t['45'] = "Mostrar os nֳ­veis a piscar quando os Edifֳ­cios estֳ£o a evoluir";
t['46'] = "Mostrar informaֳ§ֳ£o adicional para cada chegada de mercadores";
t['47'] = "Mostrar o ֳ÷ltimo transporte de Mercado";
t['48'] = "N.ֲ÷ de Pֳ¡ginas de Ofertas para Prֳ©-Carregar enquanto 'Mercado => Comprar'<br>(Defeito = 1)";
t['49'] = 'Acֳ§ֳ£o por Defeito no Ponto de Reuniֳ£o Militar';
t['50'] = 'N.ֲ÷ de Espiֳµes para a Funֳ§ֳ£o<br>"Seleccionar Espiֳµes"';
t['51'] = "Mostrar o ֳ÷ltimo ataque";
t['52'] = "Mostrar/usar as coordenadas do ֳ÷ltimo ataque";
t['53'] = 'Mostrar Informaֳ§ֳ£o de Tropas em Tooltips';
t['54'] = 'Mostrar Distֳ¢ncias e Tempos entre as Aldeias';
t['55'] = "Auto-preencher com as Tropas disponֳ­veis para o Simulador de Combates interno";
t['56'] = "Mostrar Informaֳ§ֳ£o do Tipo de Vale/Oֳ¡sis<br>quando o Rato passar por cima";
t['57'] = 'Mostrar Distֳ¢ncias e Tempos';
t['58'] = 'Mostrar Tabela de Jogadores/Aldeias/Oֳ¡sis ocupados';
t['59'] = 'N.ֲ÷ Pֳ¡ginas de Relatֳ³rios/Mensagens para Prֳ©-Carregar<br>(Defeito = 1)';
t['60'] = 'Mostrar links para abrir as Mensagens e Relatֳ³rios numa janela pop-up';
t['61'] = 'Mostrar "Excluir tudo" na Tabela da pֳ¡gina Relatֳ³rios';
t['62'] = 'Mostrar icon "Enviar IGM", tambֳ©m para mim';
t['63'] = 'Mostrar Relatֳ³rio de Batalhas TB3 desenvolvido';
t['64'] = 'Mostrar detalhes no Relatֳ³rio Estatֳ­sticas';
t['65'] = 'Cor de Elevaֳ§ֳ£o de Nֳ­vel Disponֳ­vel<br>(Defeito = Vazio)';
t['66'] = 'Cor do Nֳ­vel Mֳ¡ximo<br>(Defeito = Vazio)';
t['67'] = 'Cor de Elevaֳ§ֳ£o de Nֳ­vel Impossֳ­vel<br>(Defeito = Vazio)';
t['68'] = 'Cor de Elevaֳ§ֳ£o de Nֳ­vel via NPC<br>(Defeito = Vazio)';
t['69'] = "Console Log Level<br>APENAS PARA PROGRAMADORES OU DEBBUGING<br>(Defeito = 1)";
t['85'] = "Mostrar icons 'Enviar Tropas/Enviar Recursos'";
t['87'] = "Lembrar a ֳ÷ltima opֳ§ֳ£o 1x/2x/3x de envio de Mercado (se disponֳ­vel)";
t['TOTALTROOPS'] = 'Total de Tropas da Aldeia';
t['U.2'] = 'Tribo';
t['SIM'] = 'Simulador de Combates';
t['QSURE']= 'Tens a Certeza?';
t['LOSS'] = 'Perdas';
t['PROFIT']= 'Lucro';
t['EXTAV'] = 'Podes subir de nֳ­vel';
t['PLAYER']= 'Jogador';
t['VILLAGE'] = 'Aldeia';
t['POPULATION']= 'Populaֳ§ֳ£o';
t['COORDS']= 'Coordenadas';
t['MAPTBACTS'] = 'Acֳ§ֳµes';
t['SAVED'] = 'Guardado';
t['YOUNEED'] = 'Precisa de';
t['TODAY'] = 'Hoje';
t['TOMORROW'] = 'Amanhֳ£';
t['DAYAFTERTOM'] = 'Depois de Amanhֳ£';
t['MARKET']= 'Mercado';
t['BARRACKS'] = 'Quartel';
t['RAP']= 'Ponto de Reuniֳ£o Militar';
t['STABLE']= 'Cavalariֳ§a';
t['WORKSHOP'] = 'Oficina';
t['SENDRES'] = 'Enviar Recursos';
t['BUY'] = 'Comprar';
t['SELL'] = 'Vender';
t['SENDIGM'] = 'Enviar IGM';
t['LISTO'] = 'Disponֳ­vel';
t['ON']= 'em';
t['AT'] = 'ֳ s';
t['EFICIENCIA']= 'Eficiֳ×ncia';
t['NEVER'] = 'Nunca';
t['ALDEAS']= 'Aldeia(s)';
t['TIEMPO']= 'Tempo';
t['OFREZCO'] = 'Ofereֳ§o';
t['BUSCO'] = 'Procuro';
t['TIPO'] = 'Tipo';
t['DISPONIBLE']= 'Apenas Disponֳ­veis';
t['CUALQUIERA']= 'Qualquer';
t['YES'] = 'Sim';
t['NO']= 'Nֳ£o';
t['LOGIN'] = 'Login';
t['MARCADORES']= 'Favoritos';
t['ANYADIR'] = 'Adicionar';
t['UBU']= 'URL de Novo Marcador';
t['UBT'] = 'Novo Marcador de Texto';
t['DEL'] = 'Apagar';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Tempo Mֳ¡ximo';
t['ARCHIVE'] = 'Arquivo';
t['SUMMARY'] = 'Resumo';
t['TROPAS'] = 'Tropas';
t['CHKSCRV'] = 'Actualizar TBeyond';
t['ACTUALIZAR']= 'Actualizar Informaֳ§ֳ£o da Aldeia';
t['VENTAS']= 'Ofertas Guardadas';
t['MAPSCAN'] = 'Procurar no Mapa';
t['BIC'] = 'Mostrar Icons Avanֳ§ados';
t['SAVE'] = 'Guardar';
t['AT2'] = 'Reforֳ§os';
t['AT3'] = 'Ataque: Normal';
t['AT4'] = 'Ataque: Assalto';
t['NBSA']= 'Automֳ¡tico';
t['NBSN'] = 'Normal (pequeno)';
t['NBSB'] = 'Ecrֳ£ Grande (largo)';
t['NBHAX'] = 'Expandir Altura automaticamente';
t['NBHK'] = 'Altura por defeito';
t['NPCSAVETIME'] = 'Guardar: ';
t['SELECTALLTROOPS'] = "Seleccionar Todas as Tropas";
t['PARTY'] = "Celebraֳ§ֳµes";
t['CPPERDAY'] = "PsC/Dia";
t['SLOT'] = "Slot";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Seleccionar Espiֳ£o";
t['SELECTFAKE']= "Seleccionar Fake";
t['NOSCOUT2FAKE'] = "Impossֳ­vel Utilizar Espiֳµes para Ataque Fake!";
t['NOTROOP2FAKE'] = "Nֳ£o hֳ¡ Tropas para Ataque Fake!";
t['NOTROOP2SCOUT'] = "Nֳ£o hֳ¡ Tropas para Espiar!";
t['NOTROOPS'] = "Nֳ£o hֳ¡ Tropas na Aldeia!";
t['ALL'] = "Todas";
t['SH2'] = "Nas Cores de Campos pode utilizar:<br>- green or red or orange, etc.<br>- Cֳ³digo de Cor HEX#004523<br>- deixar Vazio para cor por defeito";
t['SOREP']= "Mostrar Relatֳ³rio Original (para postar)";
t['WSIMO1'] = "Interno (fornecido pelo Jogo)";
t['WSIMO2'] = "Externo (fornecido por kirilloid.ru)";
t['NONEWVER'] = "Tens a ֳ÷ltima Versֳ£o disponֳ­vel";
t['BVER'] = "Talvez tenhas uma versֳ£o Beta";
t['NVERAV'] = "Uma Nova Versֳ£o do Script Estֳ¡ Disponֳ­vel";
t['UPDSCR'] = "Actualizar Script Agora?";
t['CHECKUPDATE'] = "A procurar actualizaֳ§ֳ£o para o Script.<br>Por Favor Esperar...";
t['CROPFINDER']= "Crop Finder";
t['AVPPV'] = "Populaֳ§ֳ£o Mֳ©dia por Aldeia";
t['AVPPP']= "Populaֳ§ֳ£o Mֳ©dia por Jogador";
t['U.3'] = 'Nome da tua Capital<br><b>Acede ao teu Perfil para actualizar</b>';
t['U.6'] = 'Coordenadas da tua Capital<br><b>Acede ao teu Perfil para actualizar</b>';
t['MAX'] = 'Mֳ¡x';
t['TOTTRTR'] = 'Total de Tropas em Treino';
t['UPDALLV'] = 'Actualizar todas as Aldeias. MUITA ATENֳ‡ֳƒO: UTILIZAR COM A Mֳ�XIMA PRECAUֳ‡ֳƒO. PODE LEVAR AO BAN DA CONTA!';
t['LARGEMAP'] = 'Mapa Grande';
t['USETHEMPR'] = 'Usar (Proporcional)';
t['USETHEMEQ'] = 'Usar (Igual)';
t['TOWNHALL'] = 'Casa do Povo';
t['GSRVT'] = 'Servidor do Jogo';
t['ACCINFO'] = 'Informaֳ§ֳ£o da Conta';
t['NBO'] = 'Bloco de Notas';
t['MNUL'] = 'Menu Esquerdo';
t['STAT'] = 'Estatֳ­sticas';
t['RESF'] = 'Campos de Recursos';
t['VLC'] = 'Centro da Aldeia';
t['MAPO'] = 'Opֳ§ֳµes do Mapa';
t['COLO'] = 'Opֳ§ֳµes de Cores';
t['DBGO'] = 'Opֳ§ֳµes de Debug';
t['HEROSMANSION'] = "Mansֳ£o do Herֳ³i";
t['BLACKSMITH'] = 'Ferreiro';
t['ARMOURY'] = 'Fֳ¡brica de Armaduras';
t['NOW'] = 'Agora';
t['CLOSE'] = 'Fechar';
t['USE'] = 'Usar';
t['USETHEM1H'] = 'Usar (1 Hora de Produֳ§ֳ£o)';
t['OVERVIEW'] = 'Vista Geral';
t['FORUM'] = 'Fֳ³rum';
t['ATTACKS'] = 'Ataques';
t['NEWS'] = 'Notֳ­cias';
t['ADDCRTPAGE'] = 'Adicionar Pֳ¡gina Actual';
t['SCRPURL'] = 'Pֳ¡gina TBeyond';
t['SPACER'] = 'Spacer';
t['MEREO'] = 'Mensagens e Relatֳ³rios';
t['ATTABLES'] = 'Tabelas de Tropas';
t['MTW'] = 'Carga desperdiֳ§ada';
t['MTX'] = 'Carga em excesso';
t['MTC'] = 'Carga Actual';
t['ALFL'] = 'Link para Fֳ³rum Externo<br>(Deixar vazio para Fֳ³rum Interno)';
t['82.L'] = 'Bloquear Favoritos (Mostrar icons: Esconder, Apagar, Mover Acima, Mover Abaixo)';
t['MTCL'] = 'Limpar Tudo';
t['82.U'] = 'Desbloquear Favoritos (Mostrar icons: Apagar, Mover Acima, Mover Abaixo)';
t['CKSORT'] = 'Clique para Ordenar';
t['MIN'] = 'Min';
t['SVGL'] = 'Partilhar Entre Aldeias';
t['VGL'] = 'Lista de Aldeias';
t['UPDATEPOP'] = 'Actualizar Populaֳ§ֳ£o';
t['EDIT'] = 'Editar';
t['NPCO'] = 'Assistente de Opֳ§ֳµes do NPC';
t['NEWVILLAGEAV'] = 'Data/Hora';
t['TIMEUNTIL'] = 'Tempo de Espera';
t['CENTERMAP'] = 'Centralizar Mapa nesta Aldeia';
t['SENDTROOPS'] = 'Enviar Tropas';
t['PALACE'] = "Palֳ¡cio";
t['RESIDENCE'] = "Residֳ×ncia";
t['ACADEMY'] = "Academia";
t['TREASURY'] = "Tesouraria";
t['RBTT'] = "Barra de Recursos";
t['UPGTB'] = "Tabelas de Evoluֳ§ֳ£o de Campos de Recursos/Edifֳ­cios";
t['RESIDUE'] = 'O Excedente se o construֳ­res ';
t['RESOURCES'] = 'Recursos';
t['SH1'] = "Abrir o Perfil para detectar automaticamente as coordenadas da Capital<br>Construir o Quartel para detectar a Tribo automaticamente e entֳ£o abrir o Centro da Aldeia";
t['RESEND'] = "Enviar outra vez ?";
t['WSI'] = "Simulador de Combates fornecido pelo jogo";
t['TTT'] = "Tooltips geral para Tropas/Distֳ¢ncia";
break;
case "br"://by Bruno Guerreiro - brunogc@limao.com.br
//avRace = ['Romanos', 'Teutֳµes', 'Gauleses'];
t['8'] = 'Alianֳ§a';
t['SIM'] = 'Simulador de Combate';
t['QSURE'] = 'Tem certeza?';
t['LOSS'] = 'Perdas';
t['PROFIT'] = 'Lucro';
t['EXTAV'] = 'Recursos suficientes';
t['PLAYER'] = 'Jogador';
t['VILLAGE'] = 'Aldeia';
t['POPULATION'] = 'Populaֳ§ֳ£o';
t['COORDS'] = 'Coords';
t['MAPTBACTS'] = 'Aֳ§ֳµes';
t['SAVED'] = 'Configuraֳ§ֳµes salvas';
t['YOUNEED'] = 'Vocֳ× precisa';
t['TODAY'] = 'hoje';
t['TOMORROW'] = 'amanhֳ£';
t['DAYAFTERTOM'] = 'depois de amanhֳ£';
t['MARKET'] = 'Mercado';
t['BARRACKS'] = 'Quartel';
t['RAP'] = 'Enviar tropas';
t['STABLE'] = 'Cavalaria';
t['WORKSHOP'] = 'Oficina';
t['SENDRES'] = 'Enviar recursos';
t['BUY'] = 'Comprar';
t['SELL'] = 'Vender';
t['SENDIGM'] = 'Enviar IGM';
t['LISTO'] = 'Disponֳ­vel';
t['ON'] = 'em';
t['AT'] = 'as';
t['EFICIENCIA'] = 'Eficiֳ×ncia';
t['NEVER'] = 'Nunca';
t['ALDEAS'] = 'Aldeias';
t['TIEMPO'] = 'Tempo';
t['OFREZCO'] = 'Oferecendo';
t['BUSCO'] = 'Procurando';
t['TIPO'] = 'Tipo';
t['DISPONIBLE'] = 'Somente disponֳ­vel?';
t['CUALQUIERA'] = 'Qualquer';
t['YES'] = 'Sim';
t['NO'] = 'Nֳ£o';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Favoritos';
t['ANYADIR'] = 'Adicionar';
t['UBU'] = 'URL do novo favorito';
t['UBT'] = 'Texto do novo favorito';
t['DEL'] = 'Deletar';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Tempo mֳ¡ximo';
t['ARCHIVE'] = 'Arquivo';
t['SUMMARY'] = 'Sumֳ¡rio';
t['TROPAS'] = 'Tropas';
t['CHKSCRV'] = 'Atualizar TBeyond';
t['ACTUALIZAR'] = 'Atualizar informaֳ§ֳ£o da aldeia';
t['VENTAS'] = 'Ofertas salvas';
t['MAPSCAN'] = 'Analisar mapa';
t['BIC'] = 'Exibir ֳ­cones adicionais';
t['22'] = 'Exibir bloco de anotaֳ§ֳµes';
t['SAVE'] = 'Salvo';
t['49'] = 'Aֳ§ֳ£o padrֳ£o do Ponto de Encontro';
t['AT2'] = 'Reforֳ§o';
t['AT3'] = 'Ataque: Normal';
t['AT4'] = 'Ataque: Assalto';
t['24'] = 'Tamanho do bloco de anotaֳ§ֳµes';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normal (pequeno)';
t['NBSB'] = 'Grande';
t['25'] = 'Altura do bloco de anotaֳ§ֳµes';
t['NBHAX'] = 'Altura automֳ¡tica';
t['NBHK'] = 'Altura padrֳ£o';
t['43'] = 'Exibir nֳ­veis de construֳ§ֳ£o';
t['NPCSAVETIME'] = 'Salvo: ';
t['38'] = 'Exibir cores nos recursos';
t['44'] = 'Exibir cores nos edifֳ­cios';
t['65'] = 'Cores disponֳ­veis<br>(Default = Empty)';
t['66'] = 'Cor de nֳ­vel mֳ¡ximo<br>(Default = Empty)';
t['67'] = 'Cor de nֳ£o disponֳ­vel<br>(Default = Empty)';
t['68'] = 'Cor de atualizaֳ§ֳ£o via NPC<br>(Default = Empty)';
t['TOTALTROOPS'] = 'Total de tropas da aldeia';
t['20'] = 'Exibir favoritos';
t['U.2'] = 'Raֳ§a';
t['1'] = "Travian v2.x server";
t['SELECTALLTROOPS'] = "Selecionar todas as tropas";
t['PARTY'] = "Festividades";
t['CPPERDAY'] = "CP/dia";
t['SLOT'] = "Slot";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Enviar espiֳµes";
t['SELECTFAKE'] = "Enviar fakes";
t['NOSCOUT2FAKE'] = "ֳ‰ impossֳ­vel enviar ataques fakes !";
t['NOTROOP2FAKE'] = "Nֳ£o existem tropas para ser usadas como fake!";
t['NOTROOP2SCOUT'] = "Nֳ£o existe tropas/unidade de espionagem !";
t['NOTROOPS'] = "Nֳ£o hֳ¡ tropas nesta aldeia !";
t['ALL'] = "Todos";
t['SOREP'] = "Exibir relatֳ³rio original";
t['WSIMO1'] = "Interno (provided by the game)";
t['WSIMO2'] = "Externo (provided by kirilloid.ru)";
t['NONEWVER'] = "Vocֳ× tem a ֳ÷ltima versֳ£o instalada.";
t['BVER'] = "VOcֳ× tem uma versֳ£o beta.";
t['NVERAV'] = "Uma nova versֳ£o do script foi encontrada";
t['UPDSCR'] = "Atualizar script agora ?";
t['CHECKUPDATE'] = "Checando novas atualizaֳ§ֳµes.<br>Aguarde...";
t['CROPFINDER'] = "Localizador de CROPs";
t['AVPPV'] = "Mֳ©dia de populaֳ§ֳ£o por aldeia";
t['AVPPP'] = "Mֳ©dia de populaֳ§ֳ£o por jogadores";
t['37'] = "Exibir recursos disponֳ­veis para elevar";
t['41'] = "Exibir construֳ§ֳµes disponֳ­veis para elevar";
t['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0)";
t['48'] = "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
t['U.3'] = 'Nome da sua capital<br>Visite seu perfil';
t['U.6'] = 'Coordenadas da sua capital<br>Visite seu perfil';
t['MAX'] = 'Mֳ¡ximo';
t['TOTTRTR'] = 'Total de tropas sendo treinadas';
t['57'] = 'Exibir distֳ¢ncias e tempos';
t['TB3SL'] = 'Configuraֳ§ֳµes do Script';
t['UPDALLV'] = 'Atualizar todas as aldeias.  UTILIZAR COM O Mֳ�XIMO DE CAUTELA, ESSA FUNֳ‡ֳƒO PODE FAZER SUA CONTA SER BANIDA DO JOGO !';
t['9'] = "Exibir links adicionais no menu esquerdo?<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Mapa maior';
t['USETHEMPR'] = 'Usar tudo (proporcional)';
t['USETHEMEQ'] = 'Usar tudo (equilibrar)';
t['TOWNHALL'] = 'Edifֳ­cio Principal';
t['NBO'] = 'Bloco de anotaֳ§ֳµes';
t['MNUL'] = 'Menu on the left side';
t['STAT'] = 'Statistics';
t['RESF'] = 'Resource fields';
t['VLC'] = 'Centro da Aldeia';
t['MAPO'] = 'Opֳ§ֳµes de Mapa';
t['COLO'] = 'Opֳ§ֳµes de Cor';
t['DBGO'] = 'Opֳ§ֳµes de DEBUG';
t['4'] = 'Mercado';
t['5'] = 'Ponto de encontro/Quartel/Oficina/Cavalaria';
t['6'] = "Edifֳ­cio Principaֳ§/Mansֳ£o do Herֳ³i/Fֳ¡brica de Armaduras/Ferreiro";
t['HEROSMANSION'] = "Mansֳ£o do Herֳ³i";
t['BLACKSMITH'] = 'Ferreiro';
t['ARMOURY'] = 'Fֳ¡brica de Armaduras';
t['NOW'] = 'Agora';
t['CLOSE'] = 'Fechar';
t['USE'] = 'Usar';
t['USETHEM1H'] = 'Usar tudo (1 hora de produֳ§ֳ£o)';
t['OVERVIEW'] = 'Visֳ£o geral';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'LOG de ataques';
t['NEWS'] = 'Notֳ­cias';
t['ADDCRTPAGE'] = 'Adicionar atual';
t['SCRPURL'] = 'TBeyond page';
t['50'] = 'Nֲ÷ de tropas espiֳ£s<br>"Select scout" fuction';
t['SPACER'] = 'Separador';
t['53'] = 'Mostrar informaֳ§ֳµes de tropas';
t['MEREO'] = 'Mensagens e Relatֳ³rios';
t['59'] = 'Nֳ÷mero de mensagens/relatֳ³rios por pֳ¡gina<br>(Default = 1)';
t['ATTABLES'] = 'Tabela de tropas';
t['MTW'] = 'Capacidade desperdiֳ§ada';
t['MTX'] = 'Capacidade excedida';
t['MTC'] = 'Capacidade utilizada';
t['ALFL'] = 'Link para fֳ³rum externo<br>(deixe vazio o fֳ³rum interno)';
t['82.L'] = 'Fechar favoritos (ocultar ֳ­cones de ediֳ§ֳ£o)';
t['MTCL'] = 'Apagar tudo';
t['82.U'] = 'Abrir Favoritos (Mostrar ֳ­cones de ediֳ§ֳ£o)';
t['CKSORT'] = 'Click to sort';
t['MIN'] = 'Mֳ­nimo';
t['SVGL'] = 'Shared among villages';
t['VGL'] = 'Lista de Aldeias';
t['12'] = "Mostrar 'dorf1.php' and 'dorf2.php' links";
t['UPDATEPOP'] = 'Atualizar habitantes';
t['RESIDUE'] = 'Se construir, sobra';
t['RESOURCES'] = 'Recursos';
break;
case "cz"://by Rypi
//avRace = ['ֵ˜ֳ­manֳ©', 'Germֳ¡ni', 'Galovֳ©'];
t['8'] = 'Aliance';
t['SIM'] = 'Bitevnֳ­ simulֳ¡tor';
t['QSURE'] = 'Jsi si jistֳ½?';
t['LOSS'] = 'Materiֳ¡lnֳ­ ztrֳ¡ta';
t['PROFIT'] = 'Vֳ½nos';
t['EXTAV'] = 'Rozֵ¡ֳ­ֵ™it';
t['PLAYER'] = 'Hrֳ¡ִ�';
t['VILLAGE'] = 'Vesnice';
t['POPULATION'] = 'Populace';
t['COORDS'] = 'Souֵ™adnice';
t['MAPTBACTS'] = 'Akce';
t['SAVED'] = 'Uloֵ¾eno';
t['YOUNEED'] = 'Potֵ™ebujeֵ¡:';
t['TODAY'] = 'dnes';
t['TOMORROW'] = 'zֳ­tra';
t['DAYAFTERTOM'] = 'pozֳ­tֵ™ֳ­';
t['MARKET'] = 'Trֵ¾iֵ¡tִ›';
t['BARRACKS'] = 'Kasֳ¡rny';
t['RAP'] = 'Shromaֵ¾diֵ¡tִ›';
t['STABLE'] = 'Stֳ¡je';
t['WORKSHOP'] = 'Dֳ­lna';
t['SENDRES'] = 'Poslat suroviny';
t['BUY'] = 'Koupit';
t['SELL'] = 'Prodat';
t['SENDIGM'] = 'Poslat zprֳ¡vu';
t['LISTO'] = 'Dostupnֳ©';
t['ON'] = 'v';
t['AT'] = 'v';
t['EFICIENCIA'] = 'Efektivita';
t['NEVER'] = 'Nikdy';
t['ALDEAS'] = 'Vesnic';
t['TIEMPO'] = 'ִ�as';
t['OFREZCO'] = 'Nabֳ­zֳ­';
t['BUSCO'] = 'Hledֳ¡';
t['TIPO'] = 'Pomִ›r';
t['DISPONIBLE'] = 'Pouze dostupnֳ©';
t['CUALQUIERA'] = 'Cokoli';
t['YES'] = 'Ano';
t['NO'] = 'Ne';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Zֳ¡loֵ¾ky';
t['ANYADIR'] = 'Pֵ™idat';
t['UBU'] = 'URL odkazu';
t['UBT'] = 'Nֳ¡zev zֳ¡loֵ¾ky';
t['DEL'] = 'Odstranit';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Maximֳ¡lnֳ­ ִ�as';
t['ARCHIVE'] = 'Archiv';
t['SUMMARY'] = 'Souhrn';
t['TROPAS'] = 'Vojsko';
t['CHKSCRV'] = 'Aktualizuj T3Beyond';
t['ACTUALIZAR'] = 'Aktualizovat informace o vesnici';
t['VENTAS'] = 'Nabֳ­dky trֵ¾iֵ¡tִ› (nemִ›nit)';
t['MAPSCAN'] = 'Prohledat mapu';
t['BIC'] = 'Nastavenֳ­ rozֵ¡iֵ™ujֳ­cֳ­ch ikon';
t['22'] = 'Zobrazit poznֳ¡mkovֳ½ blok';
t['SAVE'] = 'Uloֵ¾it';
t['49'] = 'Vֳ½chozֳ­ vojenskֳ¡ akce';
t['AT2'] = 'Podpora';
t['AT3'] = 'Normֳ¡lnֳ­';
t['AT4'] = 'Loupeֵ¾';
t['24'] = 'Velikost poznֳ¡mkovֳ©ho bloku';
t['NBSA'] = 'Automatickֳ¡';
t['NBSN'] = 'Malֳ½';
t['NBSB'] = 'Velkֳ½';
t['25'] = 'Vֳ½ֵ¡ka poznֳ¡mkovֳ©ho bloku';
t['NBHAX'] = 'Automatickֳ¡ vֳ½ֵ¡ka';
t['NBHK'] = 'Vֳ½chozֳ­ vֳ½ֵ¡ka';
t['43'] = 'Zobrazit ֳ÷rovnִ› budov';
t['NPCSAVETIME'] = 'Uֵ¡etֵ™ֳ­ֵ¡: ';
t['38'] = 'Obarvit ֳ÷rovnִ› polֳ­';
t['44'] = 'Obarvit ֳ÷rovnִ› budov';
t['65'] = 'Moֵ¾nost vylepֵ¡enֳ­ (barva)<br>(Nezadֳ¡no = Vֳ½chozֳ­)';
t['66'] = 'Maximֳ¡lnֳ­ ֳ÷roveֵˆ (barva)<br>(Nezadֳ¡no = Vֳ½chozֳ­)';
t['67'] = 'Vylepֵ¡enֳ­ nemoֵ¾nֳ© (barva)<br>(Nezadֳ¡no = Vֳ½chozֳ­)';
t['68'] = 'Vylepֵ¡enֳ­ pomocֳ­ NPC (barva)<br>(Nezadֳ¡no = Vֳ½chozֳ­)';
t['TOTALTROOPS'] = 'Vֵ¡echny jednotky vyrobenֳ© ve vesnici';
t['20'] = 'Zobrazit zֳ¡loֵ¾ky';
t['U.2'] = 'Nֳ¡rod';
t['1'] = "Travian verze 2.x";
t['SELECTALLTROOPS'] = "Vֵ¡echny jednotky";
t['PARTY'] = "Slavnosti";
t['CPPERDAY'] = "KB/den";
t['SLOT'] = "Sloty";
t['TOTAL'] = "Celkem";
t['SELECTSCOUT'] = "ֵ pehy";
t['SELECTFAKE'] = "Fake";
t['NOSCOUT2FAKE'] = "ֵ pehy nelze pouֵ¾ֳ­t jako fake!";
t['NOTROOP2FAKE'] = "ֵ½ֳ¡dnֳ© jednotky pro fake!";
t['NOTROOP2SCOUT'] = "ֵ½ֳ¡dnֳ­ ֵ¡pehovֳ©!";
t['NOTROOPS'] = "ֵ½ֳ¡dnֳ© jednotky ve vesnici!";
t['ALL'] = "Vֵ¡e";
t['SH2'] = "Barvy mֵ¯ֵ¾eֵ¡ zadat jako:<br>- <b>green</b> , <b>red</b> nebo <b>orange</b> atd.<br>- HEX kֳ³d barvy napֵ™. <b>#004523</b><br>- nechat prֳ¡zdnֳ© pro vֳ½chozֳ­ barvu";
t['SOREP'] = "Zobrazit originֳ¡lnֳ­ report";
t['56'] = "Zobrazit typ vesnic<br>pֵ™i najetֳ­ myֵ¡ֳ­ na mapu";
t['10'] = "Bitevnֳ­ simulֳ¡tor:<br>(levֳ© menu)";
t['WSIMO1'] = "Internֳ­ (travian.cz)";
t['WSIMO2'] = "Externֳ­ (kirilloid.ru)";
t['27'] = "Analyser:";
t['28'] = "Zobrazit odkaz na analyser";
t['NONEWVER'] = "Mֳ¡ֵ¡ poslednֳ­ verzi";
t['BVER'] = "Mֳ¡ֵ¡ betaverzi";
t['NVERAV'] = "Je dostupnֳ¡ novֳ¡ verze";
t['UPDSCR'] = "Aktualizovat nynֳ­?";
t['CHECKUPDATE'] = "Kontroluji novou verzi.<br>Prosֳ­m ִ�ekej...";
t['CROPFINDER'] = "Vyhledֳ¡vaִ� MC";
t['AVPPV'] = "Prֵ¯mִ›rnֳ¡ populace vesnic";
t['AVPPP'] = "Prֵ¯mִ›rnֳ¡ populace hrֳ¡ִ�ֵ¯";
t['37'] = "Zobrazit tabulku rozֵ¡ֳ­ֵ™enֳ­ polֳ­";
t['41'] = "Zobrazit tabulku rozֵ¡ֳ­ֵ™enֳ­ budov";
t['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Vֳ½chozֳ­= 0)";
t['48'] = "Poִ�et kontrolovanֳ½ch strֳ¡nek<br>na 'Trֵ¾iֵ¡tִ› => Koupit'<br>(Vֳ½chozֳ­= 1)";
t['U.3'] = 'Jmֳ©no hlavnֳ­ vesnice<br><b>Pro aktualizaci navֵ¡tiv svֵ¯j profil</b>';
t['U.6'] = 'Souֵ™adnice hlavnֳ­ vesnice<br><b>Pro aktualizaci navֵ¡tiv svֵ¯j profil</b>';
t['TOTTRTR'] = 'Celkem jednotek ve vֳ½uce';
t['57'] = 'Zobrazit vzdֳ¡lenosti a ִ�asy';
t['TB3SL'] = 'Nastavenֳ­ T3Beyond';
t['UPDALLV'] = 'Aktualizovat vֵ¡echny vesnice. POZOR! Mֵ®ֵ½E Vֳ‰ST K ZABLOKOVֳ�Nֳ� ֳ�ִ�TU';
t['9'] = "Zobrazit odkazy v levֳ©m menu<br>(Traviantoolbox, World Analyser, Travilog, Mapa)";
t['LARGEMAP'] = 'Velkֳ¡ mapa';
t['USETHEMPR'] = 'Rozdִ›lit (proportional)';
t['USETHEMEQ'] = 'Rozdִ›lit (equal)';
t['TOWNHALL'] = 'Radnice';
t['GSRVT'] = 'Nastavenֳ­ serveru';
t['ACCINFO'] = 'Nastavenֳ­ hrֳ¡ִ�e <b>ִ�eֵ¡tina: <a href="http://www.rypi.cz">Rypi</a></b>';
t['NBO'] = 'Nastavenֳ­ poznֳ¡mkovֳ©ho bloku';
t['MNUL'] = 'Nastavenֳ­ levֳ©ho menu';
t['STAT'] = 'Nastavenֳ­ statistik';
t['RESF'] = 'Nastavenֳ­ surovinovֳ½ch polֳ­';
t['VLC'] = 'Nastavenֳ­ centra vesnice';
t['MAPO'] = 'Nastavenֳ­ mapy';
t['COLO'] = 'Nastavenֳ­ barev';
t['DBGO'] = 'Nastavenֳ­ ladִ›nֳ­ (pouze pro programֳ¡tory)';
t['4'] = 'Trֵ¾iֵ¡tִ›';
t['5'] = 'Shromaֵ¾diֵ¡tִ›/Kasֳ¡rny/Dֳ­lny/Stֳ¡je';
t['6'] = "Radnice/Hrdinskֳ½ dvֵ¯r/Zbrojnice/Kovֳ¡rna";
t['HEROSMANSION'] = "Hrdinskֳ½ dvֵ¯r";
t['BLACKSMITH'] = "Kovֳ¡rna";
t['ARMOURY'] = "Zbrojnice";
t['NOW'] = 'Teִ�';
t['CLOSE'] = 'Zavֵ™ֳ­t';
t['USE'] = 'Pouֵ¾ֳ­t';
t['USETHEM1H'] = 'Rozdִ›lit (1 hodinovֳ¡ produkce)';
t['OVERVIEW'] = 'Pֵ™ehled';
t['FORUM'] = 'Fֳ³rum';
t['ATTACKS'] = 'ֳ�toky';
t['NEWS'] = 'Novinky';
t['ADDCRTPAGE'] = 'Pֵ™idat aktuֳ¡lnֳ­ strֳ¡nku';
t['SCRPURL'] = 'Strֳ¡nka TBeyond';
t['50'] = 'Poִ�et ֵ¡pehֵ¯ pֵ™i pouֵ¾itֳ­<br>funkce poslat ֵ¡pehy';
t['SPACER'] = 'Oddִ›lovaִ�';
t['53'] = 'Informace o jednotkֳ¡ch pֵ™i najetֳ­ myֵ¡ֳ­';
t['MEREO'] = 'Zprֳ¡vy & Reporty';
t['59'] = 'Poִ�et strֳ¡nek zprֳ¡v/reportֵ¯ k naִ�tenֳ­<br>(Vֳ½chozֳ­= 1)';
t['ATTABLES'] = 'Pֵ™ehled jednotek';
t['MTW'] = 'Zbֳ½vֳ¡';
t['MTX'] = 'Pֵ™ebֳ½vֳ¡';
t['MTC'] = 'Souִ�asnֳ½ nֳ¡klad';
t['ALFL'] = 'Odkaz na externֳ­ fֳ³rum<br>(nevyplnִ›no = internֳ­ fֳ³rum)';
t['82.L'] = 'Uzamknout zֳ¡loֵ¾ky (skryje ikony smazat a pֵ™esunout)';
t['MTCL'] = 'Vyִ�istit vֵ¡e';
t['82.U'] = 'Odemknout zֳ¡loֵ¾ky (zobrazֳ­ ikony smazat a pֵ™esunout)';
t['CKSORT'] = 'Klikni pro seֵ™azenֳ­';
t['MIN'] = 'Min';
t['SVGL'] = 'Pro vֵ¡echny vesnice';
t['VGL'] = 'Seznam vesnic';
t['12'] = "Zobrazit odkazy 'dorf1.php' a 'dorf2.php'";
t['UPDATEPOP'] = 'Aktualizovat populaci';
t['54'] = 'Zobrazit vzdֳ¡lenosti a ִ�asy pֵ™i najetֳ­ myֵ¡ֳ­';
t['EDIT'] = 'Upravit';
t['NPCO'] = 'Nastavenֳ­ NPC pomocnֳ­ka';
t['26'] = 'Zobrazit NPC pomocnֳ­ky (vֳ½poִ�ty a odkazy)';
t['58'] = 'Zobrazit tabulku hrֳ¡ִ�ֵ¯/vesnic/oֳ¡z';
t['NEWVILLAGEAV'] = 'Datum/ִ�as';
t['TIMEUNTIL'] = 'ִ�as ִ�ekֳ¡nֳ­';
t['61'] = 'Zobrazit tabulku "Smazat vֵ¡e" na strֳ¡nce s reporty';
t['62'] = 'Zobrazit "Poslat zprֳ¡vu" i pro mִ›';
t['CENTERMAP'] = 'Vycentruj mapu kolem tֳ©to vesnice';
t['13'] = 'Zobrazit ikonu centra vesnice';
//t['64'] = 'Zobrazit detaily ve statistikֳ¡ch reportu';
t['SENDTROOPS'] = 'Poslat jednotky';
t['64'] = 'Zobrazit detaily ve statistice reportu';
t['7'] = "Palֳ¡c/Rezidence/Akademie/Pokladnice";
t['PALACE'] = "Palֳ¡c";
t['RESIDENCE'] = "Rezidence";
t['ACADEMY'] = "Akademie";
t['TREASURY'] = "Pokladnice";
t['45'] = "Zobrazit blikajֳ­cֳ­ levely pro budovy, kterֳ© se stavֳ­";
t['14'] = "Zobrazit ikony 'poslat jednotky/suroviny' v seznamu vesnic";
t['34'] = "Zobrazit KB/den v tabulce staveb";
t['UPGTB'] = "Tabulka vylepֵ¡enֳ­ surovinovֳ½ch polֳ­/budov";
t['35'] = "Zobrazit spotֵ™ebu obilֳ­ v tabulce staveb";
t['16'] = "Zobrazit produkci obilֳ­ v seznamu vesnic";
t['RBTT'] = "Tabulka surovin";
t['39'] = "Zobrazit tabulku 'suroviny'";
t['40'] = "Zobrazit tabulku 'suroviny' jako okno";
t['21'] = "Zobrazit 'zֳ¡loֵ¾ky' jako okno";
t['23'] = "Zobrazit 'poznֳ¡mkovֳ½ blok' jako okno";
t['17'] = "Zobrazit populaci v seznamu vesnic";
t['29'] = 'Mapy k pouֵ¾itֳ­';
t['30'] = 'Zobrazit odkazy na mapu pro hrֳ¡ִ�e';
t['31'] = 'Zobrazit odkazy na mapu pro aliance';
t['60'] = 'Zobrazit odkaz pro otevֵ™enֳ­ zprֳ¡vy v novֳ©m oknִ›.';
break;
case "ru"://by millioner & MMIROSLAV & EXEMOK & AHTOH & d00mw01f
//avRace = ['׀ ׀¸׀¼׀»ׁ�׀½׀µ', '׀“׀µׁ€׀¼׀°׀½ׁ†ׁ‹', '׀“׀°׀»׀»ׁ‹'];
t['8'] = '׀�׀»ׁ�ׁ�׀½ׁ�';
t['SIM'] = '׀¡׀¸׀¼ׁƒ׀»ׁ�ׁ‚׀¾ׁ€ ׀±׀¾ׁ�';
t['QSURE'] = '׀’ׁ‹ ׁƒ׀²׀µׁ€׀µ׀½ׁ‹?';
t['LOSS'] = '׀�׀¾ׁ‚׀µׁ€׀¸';
t['PROFIT'] = '׀�ׁ€׀¸׀±ׁ‹׀»ׁ�';
t['EXTAV'] = '׀’׀¾׀·׀¼׀¾׀¶׀½׀¾ ׁ€׀°׀·׀²׀¸ׁ‚׀¸׀µ';
t['PLAYER'] = '׀˜׀³ׁ€׀¾׀÷';
t['VILLAGE'] = '׀”׀µׁ€׀µ׀²׀½ׁ�';
t['POPULATION'] = '׀�׀°ׁ�׀µ׀»׀µ׀½׀¸׀µ';
t['COORDS'] = '׀�׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚ׁ‹';
t['MAPTBACTS'] = '׀”׀µ׀¹ׁ�ׁ‚׀²׀¸ׁ�';
t['SAVED'] = '׀¡׀¾ׁ…ׁ€׀°׀½׀µ׀½׀¾';
t['YOUNEED'] = '׀�׀µ ׁ…׀²׀°ׁ‚׀°׀µׁ‚';
t['TODAY'] = '׀¡׀µ׀³׀¾׀´׀½ׁ�';
t['TOMORROW'] = '׀—׀°׀²ׁ‚ׁ€׀°';
t['DAYAFTERTOM'] = '׀�׀¾ׁ�׀»׀µ׀·׀°׀²ׁ‚ׁ€׀°';
t['MARKET'] = '׀ ׁ‹׀½׀¾׀÷';
t['BARRACKS'] = '׀�׀°׀·׀°ׁ€׀¼׀°';
t['RAP'] = '׀�ׁƒ׀½׀÷ׁ‚ ׁ�׀±׀¾ׁ€׀°';
t['STABLE'] = '׀�׀¾׀½ׁ�ׁˆ׀½ׁ�';
t['WORKSHOP'] = '׀�׀°ׁ�ׁ‚׀µׁ€ׁ�׀÷׀°ׁ�';
t['SENDRES'] = '׀�׀¾ׁ�׀»׀°ׁ‚ׁ� ׁ€׀µׁ�ׁƒׁ€ׁ�ׁ‹';
t['BUY'] = '׀�ׁƒ׀¿׀¸ׁ‚ׁ�';
t['SELL'] = '׀�ׁ€׀¾׀´׀°ׁ‚ׁ�';
t['SENDIGM'] = '׀�׀¾ׁ�׀»׀°ׁ‚ׁ� ׁ�׀¾׀¾׀±ׁ‰׀µ׀½׀¸׀µ';
t['LISTO'] = '׀ ׀°׀·׀²׀¸ׁ‚׀¸׀µ ׀±ׁƒ׀´׀µׁ‚ ׀²׀¾׀·׀¼׀¾׀¶׀½׀¾';
t['ON'] = '׀½׀°';
t['AT'] = '׀²';
t['EFICIENCIA'] = '׀­ׁ„ׁ„׀µ׀÷ׁ‚׀¸׀²׀½׀¾ׁ�ׁ‚ׁ�';
t['NEVER'] = '׀�׀¸׀÷׀¾׀³׀´׀°';
t['ALDEAS'] = '׀”׀µׁ€׀µ׀²׀½׀¸';
t['TIEMPO'] = '׀’ׁ€׀µ׀¼ׁ�';
t['OFREZCO'] = '׀�ׁ€׀¾׀´׀°׀¶׀°';
t['BUSCO'] = '׀�׀¾׀÷ׁƒ׀¿׀÷׀°';
t['TIPO'] = '׀¡׀¾׀¾ׁ‚׀½׀¾ׁˆ׀µ׀½׀¸׀µ';
t['DISPONIBLE'] = '׀¢׀¾׀»ׁ�׀÷׀¾ ׀´׀¾ׁ�ׁ‚ׁƒ׀¿׀½ׁ‹׀µ ׀´׀»ׁ� ׀¿׀¾׀÷ׁƒ׀¿׀÷׀¸';
t['CUALQUIERA'] = '׀’ׁ�׀µ';
t['YES'] = '׀”׀°';
t['NO'] = '׀�׀µׁ‚';
t['LOGIN'] = '׀›׀¾׀³׀¸׀½';
t['MARCADORES'] = '׀—׀°׀÷׀»׀°׀´׀÷׀¸';
t['ANYADIR'] = '׀”׀¾׀±׀°׀²׀¸ׁ‚ׁ�';
t['UBU'] = '׀”׀¾׀±׀°׀²׀¸ׁ‚ׁ� ׀°׀´ׁ€׀µׁ� (Http://***) ׀² ׀·׀°׀÷׀»׀°׀´׀÷׀¸';
t['UBT'] = '׀�׀°׀·׀²׀°׀½׀¸׀µ ׀·׀°׀÷׀»׀°׀´׀÷׀¸';
t['DEL'] = '׀£׀´׀°׀»׀¸ׁ‚ׁ�';
t['MAPA'] = '׀�׀°ׁ€ׁ‚׀°';
t['MAXTIME'] = '׀�׀°׀÷ׁ�׀¸׀¼׀°׀»ׁ�׀½׀¾׀µ ׀²ׁ€׀µ׀¼ׁ�';
t['ARCHIVE'] = '׀�ׁ€ׁ…׀¸׀²';
t['SUMMARY'] = '׀¡ׁƒ׀¼׀¼׀°ׁ€׀½׀¾';
t['TROPAS'] = '׀�׀¾ׁ�׀»׀°ׁ‚ׁ� ׀²׀¾׀¹ׁ�׀÷׀°';
t['CHKSCRV'] = '׀�׀±׀½׀¾׀²׀¸ׁ‚ׁ� TBeyond';
t['ACTUALIZAR'] = '׀�׀±׀½׀¾׀²׀¸ׁ‚ׁ� ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀¾ ׀´׀µׁ€׀µ׀²׀½׀µ';
t['VENTAS'] = '׀¡׀¾ׁ…ׁ€׀°׀½׀µ׀½׀½ׁ‹׀µ ׀¿ׁ€׀µ׀´׀»׀¾׀¶׀µ׀½׀¸ׁ�';
t['MAPSCAN']  = '׀¡׀÷׀°׀½׀¸ׁ€׀¾׀²׀°ׁ‚ׁ� ׀÷׀°ׁ€ׁ‚ׁƒ';
t['BIC'] = '׀�ׁ‚׀¾׀±ׁ€׀°׀¶׀µ׀½׀¸׀µ ׀¸׀÷׀¾׀½׀¾׀÷';
t['22'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀±׀»׀¾׀÷ ׀·׀°׀¼׀µׁ‚׀¾׀÷';
t['SAVE'] = '׀¡׀¾ׁ…ׁ€׀°׀½׀¸ׁ‚ׁ�';
t['49'] = '׀”׀µ׀¹ׁ�ׁ‚׀²׀¸׀µ ׀¿ׁƒ׀½׀÷ׁ‚׀° ׁ�׀±׀¾ׁ€׀°, ׀¿׀¾ ׁƒ׀¼׀¾׀»ׁ‡׀°׀½׀¸ׁ�:';
t['AT2'] = '׀�׀¾׀´׀÷ׁ€׀µ׀¿׀»׀µ׀½׀¸׀µ';
t['AT3'] = '׀�׀°׀¿׀°׀´׀µ׀½׀¸׀µ: ׀¾׀±ׁ‹ׁ‡׀½׀¾׀µ';
t['AT4'] = '׀�׀°׀¿׀°׀´׀µ׀½׀¸׀µ: ׀½׀°׀±׀µ׀³';
t['24'] = '׀ ׀°׀·׀¼׀µׁ€ ׀¿׀¾׀»ׁ� ׀·׀°׀¼׀µׁ‚׀¾׀÷';
t['NBSA'] = '׀�׀²ׁ‚׀¾׀¼׀°ׁ‚׀¸ׁ‡׀µׁ�׀÷׀¸';
t['NBSN'] = '׀�׀¾ׁ€׀¼׀°׀»ׁ�׀½ׁ‹׀¹ (׀¼׀°׀»׀µ׀½ׁ�׀÷׀¸׀¹)';
t['NBSB'] = '׀’׀¾ ׀²׀µׁ�ׁ� ׁ�׀÷ׁ€׀°׀½ (׀±׀¾׀»ׁ�ׁˆ׀¾׀¹)';
t['25'] = '׀’ׁ‹ׁ�׀¾ׁ‚׀° ׀¿׀¾׀»ׁ� ׀·׀°׀¼׀µׁ‚׀¾׀÷';
t['NBHAX'] = '׀�׀²ׁ‚׀¾׀¿׀¾׀´׀±׀¾ׁ€ ׀²ׁ‹ׁ�׀¾ׁ‚ׁ‹';
t['NBHK'] = '׀�׀¾ ׁƒ׀¼׀¾׀»ׁ‡׀°׀½׀¸ׁ�';
t['43'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁƒׁ€׀¾׀²׀½׀¸ ׀·׀´׀°׀½׀¸׀¹ ׀² ׁ†׀µ׀½ׁ‚ׁ€׀µ';
t['NPCSAVETIME'] = '׀’ׁ€׀µ׀¼ׁ�: ';
t['38'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁƒׁ€׀¾׀²׀½׀¸ ׁ€׀µׁ�ׁƒׁ€ׁ�׀½ׁ‹ׁ… ׀¿׀¾׀»׀µ׀¹ ׁ†׀²׀µׁ‚׀°׀¼׀¸';
t['44'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁƒׁ€׀¾׀²׀½׀¸ ׀·׀´׀°׀½׀¸׀¹ ׁ†׀²׀µׁ‚׀°׀¼׀¸';
t['65'] = '׀¦׀²׀µׁ‚, ׀µׁ�׀»׀¸ ׁ€׀°׀·׀²׀¸ׁ‚׀¸׀µ ׀²׀¾׀·׀¼׀¾׀¶׀½׀¾<br>(׀¿׀¾ ׁƒ׀¼׀¾׀»ׁ‡׀°׀½׀¸ׁ� = ׀¿ׁƒׁ�ׁ‚׀¾)';
t['66'] = '׀¦׀²׀µׁ‚ ׀¼׀°׀÷ׁ�׀¸׀¼׀°׀»ׁ�׀½׀¾׀³׀¾ ׁƒׁ€׀¾׀²׀½ׁ� ׁ€׀°׀·׀²׀¸ׁ‚׀¸ׁ�<br>(׀¿׀¾ ׁƒ׀¼׀¾׀»ׁ‡׀°׀½׀¸ׁ� = ׀¿ׁƒׁ�ׁ‚׀¾)';
t['67'] = '׀¦׀²׀µׁ‚, ׀µׁ�׀»׀¸ ׁ€׀°׀·׀²׀¸ׁ‚׀¸׀µ ׀½׀µ ׀²׀¾׀·׀¼׀¾׀¶׀½׀¾<br>(׀¿׀¾ ׁƒ׀¼׀¾׀»ׁ‡׀°׀½׀¸ׁ� = ׀¿ׁƒׁ�ׁ‚׀¾)';
t['68'] = '׀¦׀²׀µׁ‚, ׀÷׀¾׀³׀´׀° ׀´׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀¾ ׁ€׀°׀·׀²׀¸ׁ‚׀¸׀µ ׀¿׀¾ׁ�ׁ€׀µ׀´ׁ�ׁ‚׀²׀¾׀¼ NPC-׀°ׁ�ׁ�׀¸ׁ�ׁ‚׀µ׀½ׁ‚׀°<br>(׀¿׀¾ ׁƒ׀¼׀¾׀»ׁ‡׀°׀½׀¸ׁ� = ׀¿ׁƒׁ�ׁ‚׀¾)';
t['TOTALTROOPS'] = '׀¡׀¾׀±ׁ�ׁ‚׀²׀µ׀½׀½ׁ‹׀µ ׀²׀¾׀¹ׁ�׀÷׀° ׀² ׀´׀µׁ€׀µ׀²׀½׀µ';
t['20'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀·׀°׀÷׀»׀°׀´׀÷׀¸';
t['U.2'] = '׀ ׀°ׁ�׀°';
t['1'] = "Travian ׁ�׀µׁ€׀²׀µׁ€ ׀²׀µׁ€ׁ�׀¸׀¸ v2.x";
t['SELECTALLTROOPS'] = "׀’ׁ‹׀±ׁ€׀°ׁ‚ׁ� ׀²ׁ�׀µ ׀²׀¾׀¹ׁ�׀÷׀°";
t['PARTY'] = "׀�ׁ€׀°׀·׀´׀½׀¸׀÷׀¸";
t['CPPERDAY'] = "׀•׀�/׀´׀µ׀½ׁ�";
t['SLOT'] = "׀¡׀»׀¾ׁ‚";
t['TOTAL'] = "׀’ׁ�׀µ׀³׀¾";
t['SELECTSCOUT'] = "׀’ׁ‹׀±ׁ€׀°ׁ‚ׁ� ׁ€׀°׀·׀²׀µ׀´׀÷ׁƒ";
t['SELECTFAKE'] = "׀’ׁ‹׀±ׁ€׀°ׁ‚ׁ� ׁ�׀¿׀°׀¼";
t['NOSCOUT2FAKE'] = "׀�׀µ׀²׀¾׀·׀¼׀¾׀¶׀½׀¾ ׀¸ׁ�׀¿׀¾׀»ׁ�׀·׀¾׀²׀°ׁ‚ׁ� ׁ€׀°׀·׀²׀µ׀´ׁ‡׀¸׀÷׀° ׀´׀»ׁ� ׁ�׀¿׀°׀¼׀° !";
t['NOTROOP2FAKE'] = "׀�׀µ׀´׀¾ׁ�ׁ‚׀°ׁ‚׀¾ׁ‡׀½׀¾ ׀²׀¾׀¹ׁ�׀÷ ׀´׀»ׁ� ׁ�׀¿׀°׀¼׀° !";
t['NOTROOP2SCOUT'] = "׀�׀µ׀´׀¾ׁ�ׁ‚׀°ׁ‚׀¾ׁ‡׀½׀¾ ׀²׀¾׀¹ׁ�׀÷ ׀´׀»ׁ� ׁ€׀°׀·׀²׀µ׀´׀÷׀¸ !";
t['NOTROOPS'] = "׀�׀µ׀´׀¾ׁ�ׁ‚׀°ׁ‚׀¾ׁ‡׀½׀¾ ׀²׀¾׀¹ׁ�׀÷ ׀² ׀´׀µׁ€׀µ׀²׀½׀µ !";
t['ALL'] = "׀’ׁ�׀µ";
t['SH2'] = "׀’ ׀¿׀¾׀»ׁ�ׁ… ׀²׀²׀¾׀´׀° ׁ†׀²׀µׁ‚׀¾׀² ׀¼׀¾׀¶׀½׀¾ ׀²׀²׀µׁ�ׁ‚׀¸ ׀¾׀´׀½׀¾ ׀·׀½׀°ׁ‡׀µ׀½׀¸׀µ:<br>- green (׀·׀µ׀»׀µ׀½ׁ‹׀¹), red (׀÷ׁ€׀°ׁ�׀½ׁ‹׀¹) ׀¸׀»׀¸ orange (׀¾ׁ€׀°׀½׀¶׀µ׀²ׁ‹׀¹), ׀¸ ׁ‚.׀´.<br> - HEX-׀÷׀¾׀´ ׁ†׀²׀µׁ‚׀° #004523<br>- ׀¾ׁ�ׁ‚׀°׀²׀¸ׁ‚ׁ� ׀¿ׁƒׁ�ׁ‚ׁ‹׀¼ ׀´׀»ׁ� ׀·׀½׀°ׁ‡׀µ׀½׀¸ׁ� ׀¿׀¾ ׁƒ׀¼׀¾׀»ׁ‡׀°׀½׀¸ׁ�";
t['SOREP'] = "׀£׀±ׁ€׀°ׁ‚ׁ� ׀¾׀¿׀¸ׁ�׀°׀½׀¸׀µ (׀´׀»ׁ� ׀¾ׁ‚׀¿ׁ€׀°׀²׀÷׀¸)";
t['56'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ‚׀¸׀¿ ׀÷׀»׀µׁ‚׀÷׀¸<br>׀²׀¾ ׀²ׁ€׀µ׀¼ׁ� ׀¿׀µׁ€׀µ׀´׀²׀¸׀¶׀µ׀½׀¸ׁ� ׀¼ׁ‹ׁˆ׀÷׀¸ ׀½׀°׀´ ׀÷׀°ׁ€ׁ‚׀¾׀¹ ";
t['10'] = "׀˜ׁ�׀¿׀¾׀»ׁ�׀·׀¾׀²׀°ׁ‚ׁ� ׁ�׀¸׀¼ׁƒ׀»ׁ�ׁ‚׀¾ׁ€ ׀±׀¾ׁ�:<br>(׀»׀µ׀²׀¾׀µ ׀¼׀µ׀½ׁ�)";
t['WSIMO1'] = "׀’׀½ׁƒׁ‚ׁ€׀µ׀½׀½׀¸׀¹ (׀¿ׁ€׀µ׀´׀»׀°׀³׀°׀µ׀¼ׁ‹׀¹ ׀¸׀³ׁ€׀¾׀¹)";
t['WSIMO2'] = "׀’׀½׀µׁˆ׀½׀¸׀¹ (׀¿ׁ€׀µ׀´׀»׀°׀³׀°׀µ׀¼ׁ‹׀¹ kirilloid.ru)";
t['27'] = "׀�׀°׀÷׀¾׀¹ ׀°׀½׀°׀»׀¸׀·׀°ׁ‚׀¾ׁ€ ׀¼׀¸ׁ€׀° (World Analyser) ׀¸ׁ�׀¿׀¾׀»ׁ�׀·׀¾׀²׀°ׁ‚ׁ�";
t['28'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ�ׁ�ׁ‹׀»׀÷׀¸ ׀½׀° ׁ�ׁ‚׀°ׁ‚׀¸ׁ�ׁ‚׀¸׀÷ׁƒ ׀°׀½׀°׀»׀¸׀·׀°ׁ‚׀¾ׁ€׀°";
t['NONEWVER'] = "׀£ ׀²׀°ׁ� ׀¿׀¾ׁ�׀»׀µ׀´׀½ׁ�ׁ� ׀²׀µׁ€ׁ�׀¸ׁ�";
t['BVER'] = "׀’ׁ‹ ׀¼׀¾׀¶׀µׁ‚׀µ ׁƒׁ�ׁ‚׀°׀½׀¾׀²׀¸ׁ‚ׁ� ׀±׀µׁ‚׀° ׀²׀µׁ€ׁ�׀¸ׁ�";
t['NVERAV'] = "׀”׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀° ׀½׀¾׀²׀°ׁ� ׀²׀µׁ€ׁ�׀¸ׁ� ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀°";
t['UPDSCR'] = "׀’ׁ‹ ׁ…׀¾ׁ‚׀¸ׁ‚׀µ ׀¾׀±׀½׀¾׀²׀¸ׁ‚ׁ� ׁ�׀÷ׁ€׀¸׀¿ׁ‚ ׁ�׀µ׀¹ׁ‡׀°ׁ� ?";
t['CHECKUPDATE'] = "׀�׀¾׀¸ׁ�׀÷ ׀¾׀±׀½׀¾׀²׀»׀µ׀½׀¸׀¹ ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀°.<br>׀�׀¾׀¶׀°׀»ׁƒ׀¹ׁ�ׁ‚׀°, ׀¿׀¾׀´׀¾׀¶׀´׀¸ׁ‚׀µ...";
t['CROPFINDER'] = "׀�׀¾׀¸ׁ�׀÷ ׀·׀µׁ€׀½׀°";
t['AVPPV'] = "׀¡ׁ€׀µ׀´׀½׀µ׀µ ׀½׀°ׁ�׀µ׀»׀µ׀½׀¸׀µ ׁ�ׁ€׀µ׀´׀¸ ׀´׀µׁ€׀µ׀²׀µ׀½ׁ�";
t['AVPPP'] = "׀¡ׁ€׀µ׀´׀µ׀½׀µ׀µ ׀½׀°ׁ�׀µ׀»׀µ׀½׀¸׀µ ׁ�ׁ€׀µ׀´׀¸ ׀¸׀³ׁ€׀¾׀÷׀¾׀²";
t['37'] = "׀�׀¾׀÷׀°׀·ׁ‹ׁ‚ׁ� ׁ‚׀°׀±׀»׀¸ׁ†ׁƒ ׁ€׀°׀·׀²׀¸ׁ‚׀¸ׁ� ׁ€׀µׁ�ׁƒׁ€ׁ�׀½ׁ‹ׁ… ׀¿׀¾׀»׀µ׀¹";
t['41'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ‚׀°׀±׀»׀¸ׁ†ׁƒ ׁ€׀°׀·׀²׀¸ׁ‚׀¸ׁ� ׀·׀´׀°׀½׀¸׀¹";
t['69'] = "Console Log Level<br>׀¢׀�׀›׀¬׀�׀� ׀”׀›׀¯ ׀�׀ ׀�׀“׀ ׀�׀�׀�׀˜׀¡׀¢׀�׀’ ׀˜ ׀�׀¢׀›׀�׀”׀§׀˜׀�׀�׀’<br>(׀¿׀¾ ׁƒ׀¼׀¾׀»ׁ‡׀°׀½׀¸ׁ� = 0)";
t['48'] = "׀÷׀¾׀»׀¸ׁ‡׀µׁ�ׁ‚׀²׀¾ ׁ�ׁ‚ׁ€׀°׀½׀¸ׁ† ׀¾ׁ‚׀¾׀±ׁ€׀°׀¶׀°׀µ׀¼ׁ‹ׁ… ׀² ׁ€׀°׀·׀´׀µ׀»׀µ<br>'׀ ׁ‹׀½׀¾׀÷ => ׀�׀¾׀÷ׁƒ׀¿׀÷׀°' ׁ�ׁ‚ׁ€׀°׀½׀¸ׁ†<br>(׀¿׀¾ ׁƒ׀¼׀¾׀»ׁ‡׀°׀½׀¸ׁ� =1)";
t['U.3'] = '׀�׀°׀·׀²׀°׀½׀¸׀µ ׀²׀°ׁˆ׀µ׀¹ ׀¡ׁ‚׀¾׀»׀¸ׁ†ׁ‹<br>׀�׀¾ׁ�׀µׁ‚׀¸ׁ‚׀µ ׁ�׀²׀¾׀¹ ׀¿ׁ€׀¾ׁ„׀¸׀»ׁ� ׀´׀»ׁ� ׀¾׀±׀½׀¾׀²׀»׀µ׀½׀¸ׁ�';
t['U.6'] = '׀�׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚ׁ‹ ׀²׀°ׁˆ׀µ׀¹ ׀¡ׁ‚׀¾׀»׀¸ׁ†ׁ‹<br>׀�׀¾ׁ�׀µׁ‚׀¸ׁ‚׀µ ׁ�׀²׀¾׀¹ ׀¿ׁ€׀¾ׁ„׀¸׀»ׁ� ׀´׀»ׁ� ׀¾׀±׀½׀¾׀²׀»׀µ׀½׀¸ׁ�';
t['MAX'] = '׀�׀°׀÷ׁ�׀¸׀¼ׁƒ׀¼';
t['TOTTRTR'] = '׀�׀±ׁ‰׀µ׀µ ׁ‡׀¸ׁ�׀»׀¾ ׀¾׀±ׁƒׁ‡׀°׀µ׀¼ׁ‹ׁ… ׀²׀¾׀¹ׁ�׀÷';
t['57'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ€׀°ׁ�ׁ�ׁ‚׀¾ׁ�׀½׀¸ׁ� ׀¸ ׀²ׁ€׀µ׀¼ׁ�';
t['TB3SL'] = TB3O.shN + ' ׀£ׁ�ׁ‚׀°׀½׀¾׀²׀÷׀°';
t['UPDALLV'] = '׀�׀±׀½׀¾׀²׀¸ׁ‚ׁ� ׀²ׁ�׀µ ׀´׀µׁ€׀µ׀²׀½׀¸. ׀˜׀¡׀�׀�׀›׀¬׀—׀£׀™׀¢׀• ׀¡ ׀�׀ ׀�׀™׀�׀•׀™ ׀�׀¡׀¢׀�׀ ׀�׀–׀�׀�׀¡׀¢׀¬׀®. ׀�׀�׀¢׀�׀�׀£ ׀§׀¢׀� ׀­׀¢׀� ׀�׀�׀–׀•׀¢ ׀�׀ ׀˜׀’׀•׀¡׀¢׀˜ ׀� ׀‘׀�׀�׀£ ׀�׀�׀�׀�׀£׀�׀¢׀� !';
t['9'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀´׀¾׀¿׀¾׀»׀½׀¸ׁ‚׀µ׀»ׁ�׀½ׁ‹׀µ ׁ�ׁ�ׁ‹׀»׀÷׀¸ ׀² ׀»׀µ׀²׀¾׀¼ ׀¼׀µ׀½ׁ�<br>(Traviantoolbox, World Analyser, Travilog, Map ׀¸ ׁ‚.׀´.)";
t['LARGEMAP'] = '׀‘׀¾׀»ׁ�ׁˆ׀°ׁ� ׀÷׀°ׁ€ׁ‚׀°';
t['USETHEMPR'] = '׀˜ׁ�׀¿׀¾׀»ׁ�׀·׀¾׀²׀°ׁ‚ׁ� (׀² % ׁ�׀¾׀´׀µׁ€׀¶׀°׀½׀¸׀¸). ';
t['USETHEMEQ'] = '׀˜ׁ�׀¿׀¾׀»ׁ�׀·׀¾׀²׀°ׁ‚ׁ� (ׁ€׀°׀²׀½׀¾׀¼׀µׁ€׀½׀¾).';
t['TOWNHALL'] = '׀ ׀°ׁ‚ׁƒׁˆ׀°';
t['GSRVT'] = '׀˜׀³ׁ€׀¾׀²׀¾׀¹ ׁ�׀µׁ€׀²׀µׁ€';
t['ACCINFO'] = '׀˜׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀°׀÷׀÷׀°ׁƒ׀½ׁ‚׀°';
t['NBO'] = '׀‘׀»׀¾׀÷ ׀·׀°׀¼׀µׁ‚׀¾׀÷';
t['MNUL'] = '׀�׀µ׀½ׁ� ׁ� ׀»׀µ׀²׀¾׀¹ ׁ�ׁ‚׀¾ׁ€׀¾׀½ׁ‹';
t['STAT'] = '׀¡ׁ‚׀°ׁ‚׀¸ׁ�ׁ‚׀¸׀÷׀°';
t['RESF'] = '׀ ׀µׁ�ׁƒׁ€ׁ�׀½ׁ‹׀µ ׀¿׀¾׀»ׁ�';
t['VLC'] = '׀¦׀µ׀½ׁ‚ׁ€ ׀´׀µׁ€׀µ׀²׀½׀¸';
t['MAPO'] = '׀�׀°ׁ�ׁ‚ׁ€׀¾׀¹׀÷׀¸ ׀÷׀°ׁ€ׁ‚ׁ‹';
t['COLO'] = '׀¦׀²׀µׁ‚׀¾׀²ׁ‹׀µ ׀½׀°ׁ�ׁ‚ׁ€׀¾׀¹׀÷׀¸';
t['DBGO'] = '׀�׀¿ׁ†׀¸׀¸ ׀¾ׁ‚׀»׀°׀´׀÷׀¸ ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀°';
t['4'] = '׀ ׁ‹׀½׀¾׀÷';
t['5'] = '׀�ׁƒ׀½׀÷ׁ‚ ׁ�׀±׀¾ׁ€׀°/׀�׀°׀·׀°ׁ€׀¼׀°/׀�׀°ׁ�ׁ‚׀µׁ€ׁ�׀÷׀°ׁ�/׀�׀¾׀½ׁ�ׁˆ׀½ׁ�';
t['6'] = "׀ ׀°ׁ‚ׁƒׁˆ׀°/׀¢׀°׀²׀µׁ€׀½׀°/׀�ׁƒ׀·׀½׀¸ׁ†׀° ׀´׀¾ׁ�׀¿׀µׁ…׀¾׀²/׀�ׁƒ׀·׀½׀¸ׁ†׀° ׀¾ׁ€ׁƒ׀¶׀¸ׁ�";
t['HEROSMANSION'] = "׀¢׀°׀²׀µׁ€׀½׀°";
t['BLACKSMITH'] = '׀�ׁƒ׀·׀½׀¸ׁ†׀° ׀¾ׁ€ׁƒ׀¶׀¸ׁ�';
t['ARMOURY'] = '׀�ׁƒ׀·׀½׀¸ׁ†׀° ׀´׀¾ׁ�׀¿׀µׁ…׀¾׀²';
t['NOW'] = '׀¡׀µ׀¹ׁ‡׀°ׁ�';
t['CLOSE'] = '׀—׀°׀÷ׁ€ׁ‹ׁ‚ׁ�';
t['USE'] = '׀˜ׁ�׀¿׀¾׀»ׁ�׀·׀¾׀²׀°ׁ‚ׁ�';
t['USETHEM1H'] = '׀˜ׁ�׀¿׀¾׀»ׁ�׀·׀¾׀²׀°ׁ‚ׁ� (ׁ‡׀°ׁ�׀¾׀²׀°ׁ� ׀²ׁ‹ׁ€׀°׀±׀¾ׁ‚׀÷׀°).';
t['OVERVIEW'] = '׀�׀±׀·׀¾ׁ€';
t['FORUM'] = '׀₪׀¾ׁ€ׁƒ׀¼';
t['ATTACKS'] = '׀�׀°׀¿׀°׀´׀µ׀½׀¸ׁ�';
t['NEWS'] = '׀�׀¾׀²׀¾ׁ�ׁ‚׀¸';
t['ADDCRTPAGE'] = '׀”׀¾׀±׀°׀²׀¸ׁ‚ׁ� ׁ‚׀µ׀÷ׁƒׁ‰׀µ׀µ';
t['SCRPURL'] = '׀¡ׁ‚ׁ€׀°׀½׀¸ׁ†׀° TBeyond';
t['50'] = '׀�׀¾׀»׀¸ׁ‡׀µׁ�ׁ‚׀²׀¾ ׁ€׀°׀·׀²׀µ׀´ׁ‡׀¸׀÷׀¾׀² ׀´׀»ׁ� ׁ„ׁƒ׀½׀÷ׁ†׀¸׀¸<br>"׀ ׀°׀·׀²׀µ׀´׀°ׁ‚ׁ�"';
t['SPACER'] = '׀�ׁ€׀¾ׁ�ׁ‚ׁ€׀°׀½ׁ�ׁ‚׀²׀¾';
t['53'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀¾ ׀²׀¾׀¹ׁ�׀÷׀°ׁ… ׀² ׀¿׀¾׀´ׁ�׀÷׀°׀·׀÷׀°ׁ…';
t['MEREO'] = '׀¡׀¾׀¾׀±ׁ‰׀µ׀½׀¸ׁ� ׀¸ ׀�ׁ‚ׁ‡׀µׁ‚ׁ‹';
t['59'] = '׀�׀¾׀»׀¸ׁ‡׀µׁ�ׁ‚׀²׀¾ ׁ�ׁ‚ׁ€׀°׀½׀¸ׁ† ׀´׀»ׁ� ׀¿ׁ€׀µ׀·׀°׀³ׁ€ׁƒ׀·׀÷׀¸<br>(׀¡ׁ‚׀°׀½׀´׀°ׁ€ׁ‚׀½׀¾ = 1)';
t['ATTABLES'] = '׀¢׀°׀±׀»׀¸ׁ†׀° ׀²׀¾׀¹ׁ�׀÷';
t['MTW'] = '׀¡׀²׀¾׀±׀¾׀´׀½׀¾';
t['MTX'] = '׀�׀µׁ€׀µ׀±׀¾ׁ€';
t['MTC'] = '׀�׀°׀³ׁ€ׁƒ׀¶׀µ׀½׀½׀¾';
t['ALFL'] = '׀¡ׁ�ׁ‹׀»׀÷׀° ׀½׀° ׀²׀½׀µׁˆ׀½׀¸׀¹ ׁ„׀¾ׁ€ׁƒ׀¼ (׀�ׁ�ׁ‚׀°׀²׀¸ׁ‚ׁ� ׀¿ׁƒׁ�ׁ‚ׁ‹׀¼ ׀´׀»ׁ� ׀²׀½ׁƒׁ‚ׁ€׀µ׀½׀½׀µ-׀¸׀³ׁ€׀¾׀²׀¾׀³׀¾ ׁ„׀¾ׁ€ׁƒ׀¼׀°)';
t['82.L'] = '׀—׀°׀±׀»׀¾׀÷׀¸ׁ€׀¾׀²׀°ׁ‚ׁ� ׀·׀°׀÷׀»׀°׀´׀÷׀¸ (׀¡׀¿ׁ€ׁ�ׁ‚׀°ׁ‚ׁ� ׀¸׀÷׀¾׀½׀÷׀¸ ׁƒ׀´׀°׀»׀¸ׁ‚ׁ�, ׀¿׀µׁ€׀µ׀¼׀µׁ�ׁ‚׀¸ׁ‚ׁ� ׀²׀²׀µׁ€ׁ…, ׀¿׀µׁ€׀µ׀¼׀µׁ�ׁ‚׀¸ׁ‚ׁ� ׀²׀½׀¸׀·)';
t['MTCL'] = '׀�ׁ‡׀¸ׁ�ׁ‚׀¸ׁ‚ׁ� ׀²ׁ�׀µ';
t['82.U'] = '׀ ׀°׀·׀±׀»׀¾׀÷׀¸ׁ€׀¾׀²׀°ׁ‚ׁ� ׀·׀°׀÷׀»׀°׀´׀÷׀¸< (׀�׀¾׀÷׀°׀·׀°ׁ‚ׁ� ׀¸׀÷׀¾׀½׀÷׀¸ ׁƒ׀´׀°׀»׀¸ׁ‚ׁ�, ׀¿׀µׁ€׀µ׀¼׀µׁ�ׁ‚׀¸ׁ‚ׁ� ׀²׀²׀µׁ€ׁ…, ׀¿׀µׁ€׀µ׀¼׀µׁ�ׁ‚׀¸ׁ‚ׁ� ׀²׀½׀¸׀·)';
t['CKSORT'] = '׀�׀»׀¸׀÷׀½׀¸ׁ‚׀µ ׀´׀»ׁ� ׁ�׀¾ׁ€ׁ‚׀¸ׁ€׀¾׀²׀÷׀¸';
t['MIN'] = '׀�׀¸׀½׀¸׀¼ׁƒ׀¼';
t['SVGL'] = '׀�׀±ׁ‰׀µ׀µ ׀´׀»ׁ� ׀²ׁ�׀µׁ… ׀´׀µׁ€׀µ׀²׀µ׀½ׁ�';
t['VGL'] = '׀¡׀¿׀¸ׁ�׀¾׀÷ ׀´׀µׁ€׀µ׀²׀µ׀½ׁ�';
t['12'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ�ׁ�ׁ‹׀»׀÷׀¸ ׀½׀° 'dorf1.php' ׀¸ 'dorf2.php'";
t['UPDATEPOP'] = '׀�׀±׀½׀¾׀²׀¸ׁ‚ׁ� ׀½׀°ׁ�׀µ׀»׀µ׀½׀¸׀µ';
t['54'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ€׀°ׁ�ׁ�ׁ‚׀¾ׁ�׀½׀¸׀µ ׀¸ ׀²ׁ€׀µ׀¼ׁ� ׀´׀¾ ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀¸ׁ� ׀² ׀¿׀¾׀´ׁ�׀÷׀°׀·׀÷׀°ׁ…';
t['EDIT'] = '׀ ׀µ׀´׀°׀÷ׁ‚׀¸ׁ€׀¾׀²׀°ׁ‚ׁ�';
t['NPCO'] = '׀�׀¿ׁ†׀¸׀¸ NPC ׀¿׀¾׀¼׀¾ׁ‰׀½׀¸׀÷׀°';
t['26'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� NPC ׀¿׀¾׀¼׀¾ׁ‰׀½׀¸׀÷׀° ׀÷׀°׀»ׁ�׀÷ׁƒ׀»ׁ�ׁ‚׀¾ׁ€ / ׁ�ׁ�ׁ‹׀»׀÷׀¸';
t['58'] = '׀�׀¾׀÷׀°׀·׀°ׁ‚ׁ� ׁ‚׀°׀±׀»׀¸ׁ†ׁƒ ׀¸׀³ׁ€׀¾׀÷׀¾׀² / ׀´׀µׁ€׀µ׀²׀µ׀½ׁ� / ׀·׀°ׁ…׀²׀°ׁ‡׀µ׀½ׁ‹ׁ… ׀¾׀°׀·׀¸ׁ�׀¾׀²';
t['NEWVILLAGEAV'] = '׀”׀°ׁ‚׀°/׀’ׁ€׀µ׀¼ׁ�';
t['TIMEUNTIL'] = '׀�ׁ�ׁ‚׀°׀»׀¾ׁ�ׁ� ׀²ׁ€׀µ׀¼׀µ׀½׀¸';
t['61'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� "׀£׀´׀°׀»׀¸ׁ‚ׁ� ׀²ׁ�׀µ" ׀½׀° ׁ�ׁ‚ׁ€׀°׀½׀¸ׁ†׀µ ׀¾ׁ‚ׁ‡׀µׁ‚׀¾׀²';
t['62'] = '׀”׀»ׁ� ׀¼׀µ׀½ׁ� ׁ‚׀°׀÷׀¶׀µ ׀¿׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀¸׀÷׀¾׀½׀÷ׁƒ "׀�ׁ‚׀¿ׁ€׀°׀²׀¸ׁ‚ׁ� ׁ�׀¾׀¾׀±ׁ‰׀µ׀½׀¸׀µ"';
t['CENTERMAP'] = '׀¦׀µ׀½ׁ‚ׁ€׀¸ׁ€׀¾׀²׀°ׁ‚ׁ� ׀´׀µׁ€׀µ׀²׀½ׁ� ׀½׀° ׀÷׀°ׁ€ׁ‚׀µ';
t['13'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀¸׀÷׀¾׀½׀÷ׁƒ "׀¦׀µ׀½ׁ‚ׁ€׀¸ׁ€׀¾׀²׀°ׁ‚ׁ� ׀´׀µׁ€׀µ׀²׀½ׁ� ׀½׀° ׀÷׀°ׁ€ׁ‚׀µ"';
t['SENDTROOPS'] = '׀�ׁ‚׀¿ׁ€׀°׀²׀÷׀° ׀²׀¾׀¹ׁ�׀÷';
t['64'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀¿׀¾׀´ׁ€׀¾׀±׀½׀¾ׁ�ׁ‚׀¸ ׀² ׁ�ׁ‚׀°ׁ‚׀¸ׁ�ׁ‚׀¸׀÷׀µ ׀¾ׁ‚ׁ‡׀µׁ‚׀¾׀²';
t['7'] = "׀”׀²׀¾ׁ€׀µׁ†/׀ ׀µ׀·׀¸׀´׀µ׀½ׁ†׀¸ׁ�/׀�׀÷׀°׀´׀µ׀¼׀¸ׁ�/׀¡׀¾׀÷ׁ€׀¾׀²׀¸ׁ‰׀½׀¸ׁ†׀°";
t['PALACE'] = "׀”׀²׀¾ׁ€׀µׁ†";
t['RESIDENCE'] = "׀ ׀µ׀·׀¸׀´׀µ׀½ׁ†׀¸ׁ�";
t['ACADEMY'] = "׀�׀÷׀°׀´׀µ׀¼׀¸ׁ�";
t['TREASURY'] = "׀¡׀¾׀÷ׁ€׀¾׀²׀¸ׁ‰׀½׀¸ׁ†׀°";
t['45'] = "׀£ׁ€׀¾׀²׀µ׀½ׁ� ׁ�ׁ‚ׁ€׀¾ׁ�ׁ‰׀µ׀³׀¾ׁ�ׁ� ׀·׀´׀°׀½׀¸ׁ� ׀±ׁƒ׀´׀µׁ‚ ׀¼׀¸׀³׀°ׁ‚ׁ�";
t['14'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀¸׀÷׀¾׀½׀÷ׁƒ '׀�ׁ‚׀¿ׁ€׀°׀²׀¸ׁ‚ׁ� ׀²׀¾׀¹ׁ�׀÷׀°/׀�ׁ‚׀¿ׁ€׀°׀²׀¸ׁ‚ׁ� ׁ€׀µׁ�ׁƒׁ€ׁ�ׁ‹' ׀² ׁ�׀¿׀¸ׁ�׀÷׀µ ׀´׀µׁ€׀µ׀²׀µ׀½ׁ�";
t['34'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀•׀´׀¸׀½׀¸ׁ† ׀�ׁƒ׀»ׁ�ׁ‚ׁƒׁ€ׁ‹(׀•׀�)/׀´׀µ׀½ׁ� ׀² ׁ‚׀°׀±׀»׀¸ׁ†׀°ׁ… ׁ€׀°׀·׀²׀¸ׁ‚׀¸ׁ�";
t['UPGTB'] = "׀’׀¾׀·׀¼׀¾׀¶׀½׀¾ׁ�ׁ‚׀¸ ׁ€׀µׁ�ׁƒׁ€ׁ�׀¾׀²/׀·׀´׀°׀½׀¸׀¹ ׀² ׁ‚׀°׀±׀»׀¸ׁ†׀°ׁ… ׁ€׀°׀·׀²׀¸ׁ‚׀¸ׁ�";
t['35'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀¿׀¾ׁ‚ׁ€׀µ׀±׀»׀µ׀½׀¸׀µ ׀·׀µׁ€׀½׀° ׀² ׁ‚׀°׀±׀»׀¸ׁ†׀°ׁ… ׁ€׀°׀·׀²׀¸ׁ‚׀¸ׁ�";
t['16'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀¿ׁ€׀¸׀±ׁ‹׀»ׁ� ׀·׀µׁ€׀½׀° ׀² ׁ�׀¿׀¸ׁ�׀÷׀µ ׀´׀µׁ€׀µ׀²׀µ׀½ׁ�";
t['RBTT'] = "׀¢׀°׀±׀»׀¸ׁ†׀° ׁ€׀µׁ�ׁƒׁ€ׁ�׀¾׀²";
t['39'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀¢׀°׀±׀»׀¸ׁ†ׁƒ ׁ€׀µׁ�ׁƒׁ€ׁ�׀¾׀²";
t['40'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ‚׀°׀±׀»׀¸ׁ†ׁƒ ׁ€׀µׁ�ׁƒׁ€ׁ�׀¾׀² ׀² ׀¿׀»׀°׀²׀°ׁ�ׁ‰׀¸׀¼ ׀¾׀÷׀½׀µ";
t['21'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀·׀°׀÷׀»׀°׀´׀÷׀¸ ׀² ׀¿׀»׀°׀²׀°ׁ�ׁ‰׀¸׀¼ ׀¾׀÷׀½׀µ";
t['23'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀·׀°׀¼׀µׁ‚׀÷׀¸ ׀² ׀¿׀»׀°׀²׀°ׁ�ׁ‰׀¸׀¼ ׀¾׀÷׀½׀µ";
t['17'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀½׀°ׁ�׀µ׀»׀µ׀½׀¸׀µ ׀² ׁ�׀¿׀¸ׁ�׀÷׀µ ׀´׀µׁ€׀µ׀²׀µ׀½ׁ�";
t['29'] = '׀˜ׁ�׀¿׀¾׀»ׁ�׀·ׁƒ׀µ׀¼ׁ‹׀¹  ׀°׀½׀°׀»׀¸׀·׀°ׁ‚׀¾ׁ€ ׀÷׀°ׁ€ׁ‚ׁ‹';
t['30'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ�ׁ�ׁ‹׀»׀÷ׁƒ ׀½׀° ׀÷׀°ׁ€ׁ‚ׁƒ ׀´׀»ׁ� ׀¿׀¾׀»ׁ�׀·׀¾׀²׀°ׁ‚׀µ׀»׀µ׀¹';
t['31'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ�ׁ�ׁ‹׀»׀÷ׁƒ ׀½׀° ׀÷׀°ׁ€ׁ‚ׁƒ ׀´׀»ׁ� ׀°׀»ׁ�ׁ�׀½ׁ�׀¾׀²';
t['63'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ€׀°ׁ�ׁˆ׀¸ׁ€׀µ׀½׀½ׁ‹׀µ ׀¾ׁ‚ׁ‡׀µׁ‚ׁ‹ ׀±׀¾׀µ׀² (TB3)';
t['18'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀´׀¾׀¿׀¾׀»׀½׀¸ׁ‚׀µ׀»ׁ�׀½׀¾ (2 ׀÷׀¾׀»׀¾׀½׀÷׀¸) ׁ�׀¿׀¸ׁ�׀¾׀÷ ׀´׀µׁ€׀µ׀²׀µ׀½ׁ� ׀² ׀¿׀»׀°׀²ׁƒׁ�ׁ‰׀¸׀¼ ׀¾׀÷׀½׀µ';
t['60'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׁ�ׁ�ׁ‹׀»׀÷׀¸ ׀´׀»ׁ� ׀¾ׁ‚׀÷ׁ€ׁ‹ׁ‚׀¸ׁ� ׀² ׀½׀¾׀²׀¾׀¼ ׀¾׀÷׀½׀µ';
t['42'] = '׀£׀¿׀¾ׁ€ׁ�׀´׀¾ׁ‡׀¸ׁ‚ׁ� ׀·׀´׀°׀½׀¸ׁ� ׀¿׀¾ ׀½׀°׀·׀²׀°׀½׀¸ׁ� ׀² ׁ‚׀°׀±׀»׀¸ׁ†׀°ׁ… ׁ€׀°׀·׀²׀¸ׁ‚׀¸ׁ�';
t['19'] = '׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀¾ ׀·׀´׀°׀½׀¸׀¸, ׀÷׀¾ׁ‚׀¾ׁ€ׁ‹׀µ ׁ€׀°׀·׀²׀¸׀²׀°ׁ�ׁ‚ׁ�ׁ� ׀² ׀´׀°׀½׀½ׁ‹׀¹ ׀¼׀¾׀¼׀µ׀½ׁ‚<br>׀¸ ׀²׀¾׀¹ׁ�׀÷׀°, ׀÷׀¾ׁ‚׀¾ׁ€ׁ‹׀µ ׁ�׀µ׀¹ׁ‡׀°ׁ� ׀² ׀¿׀¾ׁ…׀¾׀´׀µ ׀² ׁ�׀¿׀¸ׁ�׀÷׀µ ׀´׀µׁ€׀µ׀²׀µ׀½ׁ�';
t['32'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� '׀�׀¾׀¸ׁ�׀÷'";
t['3'] = '׀—׀°׀¼׀µ׀½׀¸ׁ‚ׁ� ׁ€׀°ׁ�ׁ‡׀µׁ‚ׁ‹ ׀³ׁ€ׁƒ׀·׀¾׀¿׀¾׀´ׁ�׀µ׀¼׀½׀¾ׁ�ׁ‚׀¸ ׀›׀µ׀³׀¸׀¾׀½׀µׁ€׀° ׀¸ ׀₪׀°׀»׀°׀½׀³׀¸ T3.1<br>(׀”׀»ׁ� T3.1 ׀¸ T3.5 ׁ�׀µׁ€׀²׀µׁ€׀¾׀²)';
t['33'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� '׀�׀¾׀¸ׁ�׀÷' ׀² ׀¿׀»׀°׀²׀°ׁ�ׁ†׀¸׀¼ ׀¾׀÷׀½׀µ";
t['36'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� '׀� ׁ‚׀¾׀¼ׁƒ ׀²ׁ€׀µ׀¼׀µ׀½׀¸/׀�ׁ�ׁ‚׀°ׁ‚׀÷׀¸' ׁ€׀°ׁ�ׁ‡׀µׁ‚ׁ‹ ׀² ׁ‚׀°׀±׀»׀¸ׁ†׀µ ׁ€׀°׀·׀²׀¸ׁ‚׀¸ׁ� ׀¿׀¾ׁ�ׁ‚ׁ€׀¾׀µ׀÷";
t['RESIDUE'] = '׀�ׁ�ׁ‚׀°ׁ‚׀÷׀¸ ׁ€׀µׁ�ׁƒׁ€ׁ�׀¾׀², ׀÷׀¾׀³׀´׀° ׀¿׀¾ׁ�ׁ‚ׁ€׀¾׀¸ׁ‚׀µ ׁ�ׁ‚׀¾';
t['RESOURCES'] = '׀ ׀µׁ�ׁƒׁ€ׁ�ׁ‹';
t['SH1'] = "׀�ׁ‚׀÷ׁ€ׁ‹ׁ‚ׁ� ׀²׀°ׁˆ ׀¿ׁ€׀¾ׁ„׀¸׀»ׁ� ׀´׀»ׁ� ׀°׀²ׁ‚׀¾׀¼׀°ׁ‚׀¸ׁ‡׀µׁ�׀÷׀¾׀³׀¾ ׀¾׀¿ׁ€׀µ׀´׀µ׀»׀µ׀½׀¸ׁ� ׁ�ׁ‚׀¾׀»׀¸ׁ†ׁ‹/׀÷׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚<br>׀�׀¾ׁ�ׁ‚ׁ€׀¾׀¹ׁ‚׀µ ׀÷׀°׀·׀°ׁ€׀¼ׁƒ ׀´׀»ׁ� ׀°׀²ׁ‚׀¾׀¼׀°ׁ‚׀¸ׁ‡׀µׁ�׀÷׀¾׀³׀¾ ׀¾׀¿ׁ€׀µ׀´׀µ׀»׀µ׀½׀¸ׁ� ׁ€׀°ׁ�ׁ‹, ׀° ׀¿׀¾ׁ‚׀¾׀¼ ׀¾ׁ‚׀÷ׁ€׀¾׀¹ׁ‚׀µ ׁ†׀µ׀½ׁ‚ׁ€ ׀´׀µׁ€׀µ׀²׀½׀¸";
t['46'] = "׀�׀¾׀÷׀°׀·ׁ‹׀²׀°ׁ‚ׁ� ׀´׀¾׀¿׀¾׀»׀½׀¸ׁ‚׀µ׀»ׁ�׀½ׁƒׁ� ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀´׀»ׁ� ׀÷׀°׀¶׀´׀¾׀³׀¾ ׀¿ׁ€׀¸׀±ׁ‹׀²׀°ׁ�ׁ‰׀µ׀³׀¾ ׁ‚׀¾ׁ€׀³׀¾׀²ׁ†׀°";
t['2'] = '׀£׀±ׁ€׀°ׁ‚ׁ� ׁ€׀µ׀÷׀»׀°׀¼ׁƒ';
t['3'] = '׀—׀°׀¼׀µ׀½׀¸ׁ‚ׁ� ׁ€׀°ׁ�ׁ‡׀µׁ‚ׁ‹ ׀³ׁ€ׁƒ׀·׀¾׀¿׀¾׀´ׁ�׀µ׀¼׀½׀¾ׁ�ׁ‚׀¸ ׀›׀µ׀³׀¸׀¾׀½׀µׁ€׀° ׀¸ ׀₪׀°׀»׀°׀½׀³׀¸ T3.1 (׀”׀»ׁ� T3.1 ׀¸ T3.5 ׁ�׀µׁ€׀²׀µׁ€׀¾׀²)';

break;
case "ua"://by jin
//avRace = ['׀ ׀¸׀¼׀»ׁ�׀½׀¸', '׀¢׀µ׀²ׁ‚׀¾׀½ׁ†ׁ–', '׀“׀°׀»׀»׀¸'];
t['8'] = '׀�׀»ׁ�ׁ�׀½ׁ�';
t['LOGIN'] = '׀›׀¾׀³ׁ–׀½';
t['SIM'] = '׀¡׀¸׀¼ׁƒ׀»ׁ�ׁ‚׀¾ׁ€ ׀±׀¾ׁ�';
t['QSURE'] = '׀’׀¸ ׀²׀¿׀µ׀²׀½׀µ׀½ׁ–?';
t['LOSS'] = '׀’ׁ‚ׁ€׀°ׁ‚׀¸';
t['PROFIT'] = '׀�ׁ€׀¸׀±ׁƒׁ‚׀¾׀÷';
t['EXTAV'] = '׀ ׀¾׀·׀²׀¸ׁ‚׀¾׀÷ ׀´׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀¸׀¹';
t['PLAYER'] = '׀“ׁ€׀°׀²׀µׁ†ׁ�';
t['VILLAGE'] = '׀�׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ�';
t['POPULATION'] = '׀�׀°ׁ�׀µ׀»׀µ׀½׀½ׁ�';
t['COORDS'] = '׀�׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚׀¸';
t['MAPTBACTS'] = '׀”ׁ–ׁ—';
t['SAVED'] = '׀—׀±׀µׁ€׀µ׀¶׀µ׀½׀¾';
t['YOUNEED'] = '׀�׀µ ׀²׀¸ׁ�ׁ‚׀°ׁ‡׀°ׁ”';
t['TODAY'] = 'ׁ�ׁ�׀¾׀³׀¾׀´׀½ׁ–';
t['TOMORROW'] = '׀·׀°׀²ׁ‚ׁ€׀°';
t['DAYAFTERTOM'] = '׀¿ׁ–ׁ�׀»ׁ�׀·׀°׀²ׁ‚ׁ€׀°';
t['MARKET'] = '׀ ׀¸׀½׀¾׀÷';
t['BARRACKS'] = '׀�׀°׀·׀°ׁ€׀¼׀°';
t['RAP'] = '׀�ׁƒ׀½׀÷ׁ‚ ׀·׀±׀¾ׁ€ׁƒ';
t['STABLE'] = '׀¡ׁ‚׀°׀¹׀½ׁ�';
t['WORKSHOP'] = '׀�׀°׀¹ׁ�ׁ‚׀µׁ€׀½ׁ�';
t['ENVIAR'] = '׀’ׁ–׀´׀¿ׁ€׀°׀²׀¸ׁ‚׀¸ ׁ€׀µׁ�ׁƒׁ€ׁ�׀¸';
t['BUY'] = '׀�ׁƒ׀¿׀¸ׁ‚׀¸';
t['SELL'] = '׀�ׁ€׀¾׀´׀°ׁ‚׀¸';
t['SENDIGM'] = '׀’ׁ–׀´׀¿ׁ€׀°׀²׀¸ׁ‚׀¸ ׀¿׀¾׀²ׁ–׀´׀¾׀¼׀»׀µ׀½׀½ׁ�';
t['LISTO'] = '׀”׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀¸׀¹';
t['ON'] = '׀½׀°';
t['AT'] = '׀¾';
t['EFICIENCIA'] = '׀•ׁ„׀µ׀÷ׁ‚׀¸׀²׀½ׁ–ׁ�ׁ‚ׁ�';
t['NEVER'] = '׀�ׁ–׀÷׀¾׀»׀¸';
t['ALDEAS'] = '׀�׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ�';
t['TROPAS'] = '׀’ׁ–׀´׀¿ׁ€׀°׀²׀¸ׁ‚׀¸  ׀²ׁ–׀¹ׁ�ׁ�׀÷׀¾';
t['TIEMPO'] = '׀§׀°ׁ�';
t['OFREZCO'] = '׀�ׁ€׀¾׀´׀°׀¶';
t['BUSCO'] = '׀�ׁƒ׀¿ׁ–׀²׀»ׁ�';
t['TIPO'] = '׀¡׀¿ׁ–׀²׀²ׁ–׀´׀½׀¾ׁˆ׀µ׀½׀½ׁ�';
t['CUALQUIERA'] = '׀’ׁ�ׁ–';
t['YES'] = '׀¢׀°׀÷';
t['NO'] = '׀�ׁ–';
t['ANYADIR'] = '׀”׀¾׀´׀°ׁ‚׀¸';
t['UBU'] = '׀”׀¾׀´׀°ׁ‚׀¸ ׀°׀´ׁ€׀µׁ�ׁƒ (http://***) ׀² ׀·׀°׀÷׀»׀°׀´׀÷׀¸';
t['UBT'] = '׀�׀°׀·׀²׀° ׀·׀°׀÷׀»׀°׀´׀÷׀¸';
t['DEL'] = '׀’׀¸׀´׀°׀»׀¸ׁ‚׀¸';
t['MAPA'] = '׀�׀°ׁ€ׁ‚׀°';
t['DISPONIBLE'] = '׀›׀¸ׁˆ׀µ ׀´׀¾ׁ�ׁ‚ׁƒ׀¿׀½ׁ–';
t['TOTTRTR'] = '׀—׀°׀³׀°׀»ׁ�׀½׀° ׀÷ׁ–׀»ׁ�׀÷ׁ–ׁ�ׁ‚ׁ� ׀²ׁ–׀¹ׁ�ׁ�׀÷ ׀´׀»ׁ� ׀½׀°׀²ׁ‡׀°׀½׀½ׁ�';
t['TOTAL'] = "׀—׀°׀³׀°׀»׀¾׀¼";
t['NPCSAVETIME'] = '׀§׀°ׁ�: ';
t['NONEWVER'] = "׀’ ׁ‚׀µ׀±׀µ ׀¾ׁ�ׁ‚׀°׀½׀½ׁ� ׀²׀µׁ€ׁ�ׁ–ׁ�";
t['NVERAV'] = "׀”׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀° ׀½׀¾׀²׀° ׀²׀µׁ€ׁ�ׁ–ׁ� ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀°";
t['UPDSCR'] = "׀’׀¸ ׁ…׀¾ׁ‡׀µׁ‡׀µ ׀¾׀±׀½׀¾׀²׀¸ׁ‚׀¸ ׁ�׀÷ׁ€׀¸׀¿ׁ‚ ׀·׀°ׁ€׀°׀·?";
t['CHECKUPDATE'] = "׀�׀¾ׁˆׁƒ׀÷ ׀¾׀±׀½׀¾׀²׀»׀µ׀½ׁ� ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀°.<br>׀‘ׁƒ׀´ׁ� ׀»׀°ׁ�׀÷׀°, ׀·׀°ׁ‡׀µ׀÷׀°׀¹ׁ‚׀µ...";
t['TOTALTROOPS'] = '׀’׀»׀°ׁ�׀½ׁ– ׀²ׁ–׀¹ׁ�ׁ�׀÷׀° ׀² ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ–';
t['CHKSCRV'] = '׀�׀½׀¾׀²׀¸ׁ‚׀¸ TBeyond';
t['ACTUALIZAR'] = '׀�׀½׀¾׀²׀¸ׁ‚׀¸ ׁ–׀½ׁ„׀¾ׁ€׀¼׀°ׁ†ׁ–ׁ� ׀¿ׁ€׀¾ ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ�';
t['ARCHIVE'] = '׀�ׁ€ׁ…ׁ–׀²';
t['UPDALLV'] = '׀�׀½׀¾׀²׀¸ׁ‚׀¸ ׀²ׁ�ׁ– ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ�';
t['SOREP'] = '׀�ׁ€׀¸׀±ׁ€׀°ׁ‚׀¸ ׀¾׀¿׀¸ׁ�(׀´׀»ׁ� ׀²ׁ–׀´׀¿ׁ€׀°׀²׀»׀µ׀½׀½ׁ�)';
t['SCRPURL'] = '׀¡ׁ‚׀¾ׁ€ׁ–׀½׀÷׀° TBeyond';
t['CPPERDAY'] = "׀�׀´.׀÷ׁƒ׀»ׁ�ׁ‚./׀´׀µ׀½ׁ�";
t['PARTY'] = "׀¡׀²ׁ�ׁ‚׀°";
t['SLOT'] = "׀�׀¾׀¼ׁ–ׁ€׀÷׀°";
t['USETHEMPR'] = '׀’׀¸׀÷׀¾ׁ€׀¸ׁ�ׁ‚׀¾׀²ׁƒ׀²׀°ׁ‚׀¸ (׀¿ׁ€׀¾׀¿׀¾ׁ€ׁ†ׁ–׀¹׀½׀¾). ';
t['USETHEMEQ'] = '׀’׀¸׀÷׀¾ׁ€׀¸ׁ�ׁ‚׀¾׀²ׁƒ׀²׀°ׁ‚׀¸ (ׁ€ׁ–׀²׀½׀¾׀¼ׁ–ׁ€׀½׀¾).';
t['USETHEM1H'] = '׀’׀¸׀÷׀¾ׁ€׀¸ׁ�ׁ‚׀¾׀²ׁƒ׀²׀°ׁ‚׀¸ (׀³׀¾׀´׀¸׀½׀½׀¸׀¹ ׀²׀¸׀´׀¾׀±ׁƒׁ‚׀¾׀÷).';
t['MTCL'] = '׀�ׁ‡׀¸ׁ�ׁ‚׀¸ׁ‚׀¸ ׀²ׁ�׀µ';
t['MAXTIME'] = '׀�׀°׀÷ׁ�׀¸׀¼׀°׀»ׁ�׀½׀¸׀¹ ׁ‡׀°ׁ�';
t['SAVE'] = '׀—׀±׀µׁ€׀µ׀³ׁ‚׀¸';
t['MAPSCAN'] = '׀¡׀÷׀°׀½ׁƒ׀²׀°ׁ‚׀¸ ׀÷׀°ׁ€ׁ‚ׁƒ';
t['U.2'] = '׀ ׀°ׁ�׀°';
t['MARCADORES'] = '׀—׀°׀÷׀»׀°׀´׀÷׀¸';
t['20'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀·׀°׀÷׀»׀°׀´׀÷׀¸';
t['GSRVT'] = '׀†׀³ׁ€׀¾׀²׀¸׀¹ ׁ�׀µׁ€׀²׀µׁ€';
t['ACCINFO'] = '׀†׀½ׁ„׀¾ׁ€׀¼׀°ׁ†ׁ–ׁ� ׀¿ׁ€׀¾ ׀°׀÷׀°ׁƒ׀½ׁ‚';
t['U.3'] = '׀�׀°׀·׀²׀° ׁ‚׀²׀¾ׁ”ׁ— ׁ�ׁ‚׀¾׀»׀¸ׁ†ׁ–<br>׀’ׁ–׀´׀²ׁ–׀´׀°׀¹ ׁ�׀²ׁ–׀¹ ׀¿ׁ€׀¾ׁ„ׁ–׀»ׁ� ׀´׀»ׁ� ׀¾׀±׀½׀¾׀²׀»׀µ׀½׀½ׁ�';
t['U.6'] = '׀�׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚׀¸ ׁ‚׀²׀¾ׁ”ׁ— ׁ�ׁ‚׀¾׀»׀¸ׁ†ׁ–<br>׀’ׁ–׀´׀²ׁ–׀´׀°׀¹ ׁ�׀²ׁ–׀¹ ׀¿ׁ€׀¾ׁ„ׁ–׀»ׁ� ׀´׀»ׁ� ׀¾׀±׀½׀¾׀²׀»׀µ׀½׀½ׁ�';
t['48'] = "׀�ׁ–׀»ׁ�׀÷ׁ–ׁ�ׁ‚ׁ� ׁ�ׁ‚׀¾ׁ€ׁ–׀½׀¾׀÷, ׁ�׀÷ׁ– ׀²ׁ–׀´׀¾׀±ׁ€׀°׀¶׀°ׁ‚׀¸׀¼ׁƒׁ‚ׁ�ׁ�ׁ� ׀² ׁ€׀¾׀·׀´ׁ–׀»ׁ–<br>'׀ ׀¸׀½׀¾׀÷ => ׀�ׁƒ׀¿ׁ–׀²׀»ׁ�' ׁ�ׁ‚׀¾ׁ€ׁ–׀½׀¾׀÷<br>(׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼ =1)";
t['BIC'] = '׀’ׁ–׀´׀¾׀±ׁ€׀°׀¶׀µ׀½׀½ׁ� ׁ–׀÷׀¾׀½׀¾׀÷';
t['1'] = "׀¡׀µׁ€׀²׀µׁ€ Travian 2.x ׀²׀µׁ€ׁ�ׁ–ׁ—";
t['4'] = '׀ ׀¸׀½׀¾׀÷';
t['5'] = '׀�ׁƒ׀½׀÷ׁ‚ ׀·׀±׀¾ׁ€ׁƒ/׀�׀°׀·׀°ׁ€׀¼׀°/׀�׀°׀¹ׁ�ׁ‚׀µׁ€׀½ׁ�/׀¡ׁ‚׀°׀¹׀½ׁ�';
t['6'] = "׀ ׀°ׁ‚ׁƒׁˆ׀°/׀¢׀°׀²׀µׁ€׀½׀°/׀�ׁƒ׀·׀½ׁ� ׀¾׀±׀»׀°׀´ׁƒ׀½׀÷ׁ–׀²/׀�ׁƒ׀·׀½ׁ� ׀·׀±ׁ€׀¾ׁ—";
t['TOWNHALL'] = '׀ ׀°ׁ‚ׁƒׁˆ׀°';
t['HEROSMANSION'] = "׀¢׀°׀²׀µׁ€׀½׀°";
t['BLACKSMITH'] = '׀�ׁƒ׀·׀½ׁ� ׀·׀±ׁ€׀¾ׁ—';
t['ARMOURY'] = '׀�ׁƒ׀·׀½ׁ� ׀¾׀±׀»׀°׀´ׁƒ׀½׀÷ׁ–׀²';
t['PROFILE'] = '׀�ׁ€׀¾ׁ„ׁ–׀»ׁ�';
t['MNUL'] = '׀�׀µ׀½ׁ� ׀· ׀»ׁ–׀²׀¾׀³׀¾ ׀±׀¾׀÷ׁƒ';
t['9'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀´׀¾׀´׀°ׁ‚׀÷׀¾׀²ׁ– ׀¿׀¾ׁ�׀¸׀»׀°׀½׀½ׁ� ׀² ׀»ׁ–׀²׀¾׀¼ׁƒ ׀¼׀µ׀½ׁ�<br>(Traviantoolbox, World Analyser, Travilog, Map ׁ– ׁ‚.׀´.)";
t['10'] = "׀’׀¸׀÷׀¾ׁ€׀¸ׁ�ׁ‚׀¾׀²ׁƒ׀²׀°ׁ‚׀¸ ׁ�׀¸׀¼ׁƒ׀»ׁ�ׁ‚׀¾ׁ€ ׀±׀¾ׁ�:<br>(׀»ׁ–׀²׀µ ׀¼׀µ׀½ׁ�)";
t['WSIMO1'] = "׀’׀½ׁƒׁ‚ׁ€ׁ–ׁˆ׀½ׁ–׀¹ (travian.com.ua)";
t['WSIMO2'] = "׀—׀¾׀²׀½ׁ–ׁˆ׀½ׁ–׀¹ (kirilloid.ru)";
t['VGL'] = '׀¡׀¿׀¸ׁ�׀¾׀÷ ׀¿׀¾ׁ�׀µ׀»׀µ׀½ׁ�';
t['12'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀¿׀¾ׁ�׀¸׀»׀°׀½׀½ׁ� ׀½׀° 'dorf1.php' ׀¸ 'dorf2.php'";
t['22'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀¿׀¾׀»׀µ ׀·׀°׀¼ׁ–ׁ‚׀¾׀÷';
t['NBO'] = '׀�׀¾׀»׀µ ׀·׀°׀¼ׁ–ׁ‚׀¾׀÷';
t['NPCO'] = '׀�׀¿ׁ†ׁ–ׁ— NPC-׀°ׁ�׀¸ׁ�ׁ‚׀µ׀½ׁ‚׀°';
t['26'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ€׀¾׀·ׁ€׀°ׁ…ׁƒ׀½׀÷׀¸ NPC-׀°ׁ�׀¸ׁ�ׁ‚׀µ׀½ׁ‚׀°/ ׀¿׀¾ׁ�׀¸׀»׀°׀½׀½ׁ�';
t['STAT'] = '׀¡ׁ‚׀°ׁ‚׀¸ׁ�ׁ‚׀¸׀÷׀°';
t['27'] = "׀¯׀÷׀¸׀¹ ׀°׀½׀°׀»ׁ–׀·׀°ׁ‚׀¾ׁ€ ׁ�׀²ׁ–ׁ‚ׁƒ ׀²׀¸׀÷׀¾ׁ€׀¸ׁ�ׁ‚׀¾׀²ׁƒ׀²׀°ׁ‚׀¸?";
t['28'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀¿׀¾ׁ�׀¸׀»׀°׀½׀½ׁ� ׀½׀° ׁ�ׁ‚׀°ׁ‚׀¸ׁ�ׁ‚׀¸׀÷ׁƒ ׀°׀½׀°׀»ׁ–׀·׀°ׁ‚׀¾ׁ€׀°";
t['37'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ‚׀°׀±׀»׀¸ׁ†ׁ� ׁ€׀¾׀·׀²׀¸ׁ‚׀÷ׁƒ ׁ€׀µׁ�ׁƒׁ€ׁ�׀½׀¸ׁ… ׀¿׀¾׀»ׁ–׀²";
t['41'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ‚׀°׀±׀»׀¸ׁ†ׁ� ׁ€׀°׀·׀²׀¸ׁ‚׀÷ׁƒ ׁ�׀¿׀¾ׁ€ׁƒ׀´";
t['RESF'] = '׀ ׀µׁ�ׁƒׁ€ׁ�׀½ׁ– ׀¿׀¾׀»ׁ�';
t['38'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ€ׁ–׀²׀½ׁ– ׁ€׀µׁ�ׁƒׁ€ׁ�׀½׀¸ׁ… ׀¿׀¾׀»ׁ–׀² ׀÷׀¾׀»ׁ�׀¾ׁ€׀°׀¼׀¸';
t['VLC'] = '׀¦׀µ׀½ׁ‚ׁ€ ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ�';
t['44'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ€ׁ–׀²׀½ׁ– ׁ�׀¿׀¾ׁ€ׁƒ׀´ ׀÷׀¾׀»ׁ�׀¾ׁ€׀°׀¼׀¸';
t['43'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ€ׁ–׀²׀½ׁ– ׁ�׀¿׀¾ׁ€ׁƒ׀´ ׀² ׁ†׀µ׀½ׁ‚ׁ€ׁ–';
t['CROPFINDER'] = '׀�׀¾ׁˆׁƒ׀÷ ׀·׀µׁ€׀½׀°';
t['SENDTROOPS'] = '׀’ׁ–׀´׀¿ׁ€׀°׀²׀»׀µ׀½׀½ׁ� ׀²ׁ–׀¹ׁ�׀÷';
t['7'] = "׀�׀°׀»׀°ׁ†/׀ ׀µ׀·׀¸׀´׀µ׀½ׁ†ׁ–ׁ�/׀�׀÷׀°׀´׀µ׀¼ׁ–ׁ�/׀¡׀÷׀°ׁ€׀±׀½׀¸ׁ†ׁ�";
t['ALFL'] = '׀�׀¾ׁ�׀¸׀»׀°׀½׀½ׁ� ׀½׀° ׀·׀½׀¾׀²׀½ׁ–ׁˆ׀½ׁ–׀¹ ׁ„׀¾ׁ€ׁƒ׀¼<br>(׀—׀°׀»׀¸ׁˆ׀¸ׁ‚׀¸ ׀¿׀¾ׁ€׀¾׀¶׀½ׁ–׀¼ ׀´׀»ׁ� ׀²׀½ׁƒׁ‚ׁ€ׁ–ׁˆ׀½ׁ�׀¾׀³׀¾ ׁ„׀¾ׁ€ׁƒ׀¼ׁƒ)';
t['13'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ–׀÷׀¾׀½׀÷ׁƒ "׀¦׀µ׀½ׁ‚ׁ€ׁƒ׀²׀°ׁ‚׀¸ ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ� ׀½׀° ׀÷׀°ׁ€ׁ‚ׁ–"';
t['14'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ–׀÷׀¾׀½׀÷ׁƒ '׀’ׁ–׀´׀¿ׁ€׀°׀²׀¸ׁ‚׀¸ ׀²ׁ–׀¹ׁ�ׁ�׀÷׀°/׀’ׁ–׀´׀¿ׁ€׀°׀²׀¸ׁ‚׀¸ ׁ€׀µׁ�ׁƒׁ€ׁ�׀¸' ׀² ׁ�׀¿׀¸ׁ�׀÷ׁƒ ׀¿׀¾ׁ�׀µ׀»׀µ׀½ׁ�";
t['16'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀¿ׁ€׀¸׀±ׁƒׁ‚׀¾׀÷ ׀·׀µׁ€׀½׀° ׁƒ ׁ�׀¿׀¸ׁ�׀÷ׁƒ ׀¿׀¾ׁ�׀µ׀»׀µ׀½ׁ�";
t['39'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ‚׀°׀±׀»׀¸ׁ†ׁ� "׀ ׀µׁ�ׁƒׁ€ׁ�׀¸"';
t['RBTT'] = '׀¢׀°׀±׀»׀¸ׁ†ׁ� "׀ ׀µׁ�ׁƒׁ€ׁ�׀¸"';
t['45'] = "׀‘׀»׀¸׀¼׀°׀½׀½ׁ� ׁ€ׁ–׀²׀½ׁ� ׁ�׀¿׀¾ׁ€ׁƒ׀´׀¸, ׁ‰׀¾ ׀±ׁƒ׀´ׁƒׁ”ׁ‚ׁ�ׁ�ׁ�";
t['VENTAS'] = '׀—׀±׀µׁ€׀µ׀¶׀µ׀½ׁ– ׀¿ׁ€׀¾׀¿׀¾׀·׀¸ׁ†ׁ–ׁ—';
t['49'] = '׀”ׁ–ׁ— ׀¿ׁƒ׀½׀÷ׁ‚ׁƒ ׀·׀±׀¾ׁ€ׁƒ ׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼:';
t['AT2'] = '׀�ׁ–׀´׀÷ׁ€ׁ–׀¿׀»׀µ׀½׀½ׁ�';
t['AT3'] = '׀�׀°׀¿׀°׀´: ׀·׀²׀¸ׁ‡׀°׀¹׀½׀¸׀¹';
t['AT4'] = '׀�׀°׀¿׀°׀´: ׁ€׀¾׀·׀±ׁ–׀¹׀½׀¸ׁ†ׁ�׀÷׀¸׀¹ ׀½׀°׀±ׁ–׀³';
t['50'] = '׀�ׁ–׀»ׁ�׀÷ׁ–ׁ�ׁ‚ׁ� ׁ€׀¾׀·׀²ׁ–׀´׀½׀¸׀÷ׁ–׀² ׀´׀»ׁ� ׁ„ׁƒ׀½׀÷ׁ†ׁ–ׁ—<br>"׀ ׀¾׀·׀²ׁ–׀´׀÷׀°"';
t['53'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ–׀½ׁ„׀¾ׁ€׀¼׀°ׁ†ׁ–ׁ� ׀¿ׁ€׀¾ ׀²ׁ–׀¹ׁ�׀÷׀° ׀² ׀¿ׁ–׀´׀÷׀°׀·׀÷׀°ׁ…';
t['56'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ‚׀¸׀¿ ׀÷׀»ׁ–ׁ‚׀¸׀½׀÷׀¸ <br>׀¿ׁ–׀´ ׁ‡׀°ׁ� ׀¿׀µׁ€׀µׁ�ׁƒ׀²׀°׀½׀½ׁ� ׀¼׀¸ׁˆ׀÷׀¸ ׀½׀°׀´ ׀÷׀°ׁ€ׁ‚׀¾ׁ� ";
t['57'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀²ׁ–׀´ׁ�ׁ‚׀°׀½ׁ� ׁ– ׁ‡׀°ׁ�';
t['58'] = '׀�׀¾׀÷׀°׀·׀°ׁ‚׀¸ ׁ‚׀°׀±׀»׀¸ׁ†ׁ� ׀³ׁ€׀°׀²ׁ†ׁ–׀² / ׀¿׀¾ׁ�׀µ׀»׀µ׀½ׁ� / ׀·׀°ׁ…׀¾׀¿׀»׀µ׀½׀¸ׁ… ׀¾׀°׀·׀¸ׁ�ׁ–׀²';
t['59'] = '׀�ׁ–׀»ׁ�׀÷ׁ–ׁ�ׁ‚ׁ� ׁ�ׁ‚׀¾ׁ€ׁ–׀½׀¾׀÷ ׀´׀»ׁ� ׀¿׀µׁ€׀µ׀·׀°׀²׀°׀½ׁ‚׀°׀¶׀µ׀½׀½ׁ� <br>(׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼ = 1)';
t['61'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ "׀’׀¸׀´׀°׀»׀¸ׁ‚׀¸ ׀²ׁ�ׁ–" ׀½׀° ׁ�ׁ‚׀¾ׁ€ׁ–׀½ׁ†ׁ– ׀·׀²ׁ–ׁ‚ׁ–׀²';
t['64'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀¿׀¾׀´ׁ€׀¾׀±׀¸ׁ†ׁ– ׀² ׁ�ׁ‚׀°ׁ‚׀¸ׁ�ׁ‚׀¸ׁ†ׁ– ׀·׀²ׁ–ׁ‚ׁ–׀²';
t['MEREO'] = '׀�׀¾׀²ׁ–׀´׀¾׀¼׀»׀µ׀½׀½ׁ� ׁ– ׀—׀²ׁ–ׁ‚׀¸';
t['MAPO'] = '׀�׀°׀»׀°ׁˆׁ‚ׁƒ׀²׀°׀½׀½ׁ� ׀÷׀°ׁ€ׁ‚׀¸';
t['60'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀¿׀¾ׁ�׀¸׀»׀°׀½׀½ׁ� ׀´׀»ׁ� ׀²ׁ–׀´׀÷ׁ€׀¸ׁ‚ׁ‚ׁ� ׀² ׀½׀¾׀²׀¾׀¼ׁƒ ׀²ׁ–׀÷׀½ׁ–';
t['24'] = '׀ ׀¾׀·׀¼ׁ–ׁ€ ׀¿׀¾׀»ׁ� ׀·׀°׀¼ׁ–ׁ‚׀¾׀÷';
t['SUMMARY'] = '׀¡ׁƒ׀¼׀°ׁ€׀½׀¾';
t['NBSA'] = '׀�׀²ׁ‚׀¾׀¼׀°ׁ‚׀¸ׁ‡׀½׀¾';
t['NBSN'] = '׀�׀¾ׁ€׀¼׀°׀»ׁ�׀½׀¸׀¹ (׀¼׀°׀»׀µ׀½ׁ�׀÷׀¸׀¹)';
t['NBSB'] = '׀’׀µ׀»׀¸׀÷׀¸׀¹ ׀µ׀÷ׁ€׀°׀½ (׀²׀µ׀»׀¸׀÷׀¸׀¹)';
t['25'] = '׀’׀¸ׁ�׀¾ׁ‚׀° ׀¿׀¾׀»ׁ� ׀·׀°׀¼ׁ–ׁ‚׀¾׀÷';
t['NBHAX'] = '׀�׀²ׁ‚׀¾׀¼׀°ׁ‚׀¸ׁ‡׀½׀µ ׀·׀±ׁ–׀»ׁ�ׁˆ׀µ׀½׀½ׁ� ׀²׀¸ׁ�׀¾ׁ‚׀¸';
t['NBHK'] = '׀’׀¸ׁ�׀¾ׁ‚׀° ׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼';
t['65'] = '׀�׀¾׀»ׁ–ׁ€, ׀÷׀¾׀»׀¸ ׀´׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀¸׀¹ ׁ€׀¾׀·׀²׀¸ׁ‚׀¾׀÷<br>(׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼ = ׀¿׀¾ׁ€׀¾׀¶׀½ׁ”)';
t['66'] = '׀�׀¾׀»ׁ–ׁ€ ׀¼׀°׀÷ׁ�׀¸׀¼׀°׀»ׁ�׀½׀¾׀³׀¾ ׁ€ׁ–׀²׀½ׁ�<br>(׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼ = ׀¿׀¾ׁ€׀¾׀¶׀½ׁ”)';
t['67'] = '׀�׀¾׀»ׁ–ׁ€, ׀÷׀¾׀»׀¸ ׁ€׀¾׀·׀²׀¸ׁ‚׀¾׀÷ ׀½׀µ ׀´׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀¸׀¹<br>(׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼ = ׀¿׀¾ׁ€׀¾׀¶׀½ׁ”)';
t['68'] = '׀�׀¾׀»ׁ–ׁ€, ׀÷׀¾׀»׀¸ ׀´׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀¸׀¹ ׁ€׀¾׀·׀²׀¸ׁ‚׀¾׀÷ ׀·׀° ׀´׀¾׀¿׀¾׀¼׀¾׀³׀¾ׁ� NPC-׀°ׁ�׀¸ׁ�ׁ‚׀µ׀½ׁ‚׀°<br>(׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼ = ׀¿׀¾ׁ€׀¾׀¶׀½ׁ”)';
t['SELECTALLTROOPS'] = "׀’׀¸׀±ׁ€׀°ׁ‚׀¸ ׀²ׁ�׀µ ׀²ׁ–׀¹ׁ�ׁ�׀÷׀¾";
t['SELECTSCOUT'] = "׀’ׁ–׀´׀¿ׁ€׀°׀²׀¸ׁ‚׀¸ ׁ€׀¾׀·׀²ׁ–׀´׀½׀¸׀÷׀°";
t['SELECTFAKE'] = "׀’ׁ–׀´׀¿ׁ€׀°׀²׀¸ׁ‚׀¸ ׁ�׀¿׀°׀¼";
t['NOSCOUT2FAKE'] = "׀’׀¸׀÷׀¾ׁ€׀¸ׁ�ׁ‚׀¾׀²ׁƒ׀²׀°ׁ‚׀¸ ׁ€׀¾׀·׀²ׁ–׀´׀½׀¸׀÷ׁ–׀², ׁ�׀÷ ׁ�׀¿׀°׀¼ ׀½׀µ׀¼׀¾׀¶׀»׀¸׀²׀¾!";
t['NOTROOP2FAKE'] = "׀�׀µ׀¼׀°ׁ” ׀²׀¾ׁ—׀½ׁ–׀² ׀´׀»ׁ� ׁ�׀¿׀°׀¼ׁƒ!";
t['NOTROOP2SCOUT'] = "׀�׀µ׀¼׀°ׁ” ׀²׀¾ׁ—׀½ׁ–׀² ׀´׀»ׁ� ׁ€׀¾׀·׀²ׁ–׀´׀÷׀¸ !";
t['NOTROOPS'] = "׀’ ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ– ׀½׀µ׀¼׀°ׁ” ׀²ׁ–׀¹ׁ�ׁ�׀÷!";
t['ALL'] = "׀’ׁ�ׁ–";
t['SH2'] = "׀’ ׀¿׀¾׀»ׁ�ׁ… ׀²׀²׀µ׀´׀µ׀½׀½ׁ� ׀÷׀¾׀»ׁ�׀¾ׁ€ׁ–׀² ׀¼׀¾׀¶׀½׀° ׀²׀²׀µׁ�ׁ‚׀¸:<br>- green(׀·׀µ׀»׀µ׀½׀¸׀¹) ׁ‡׀¸ red(ׁ‡׀µׁ€׀²׀¾׀½׀¸׀¹) ׁ‡׀¸  orange(׀¾ׁ€׀°׀½׀¶׀µ׀²׀¸׀¹), ׁ– ׁ‚.׀´.<br>- HEX-׀÷׀¾׀´ ׀÷׀¾׀»ׁ�׀¾ׁ€ׁƒ #004523<br>- ׀·׀°׀»׀¸ׁˆ׀¸ׁ‚׀¸ ׀¿׀¾ׁ€׀¾׀¶׀½ׁ–׀¼ ׀´׀»ׁ� ׀·׀½׀°ׁ‡׀µ׀½׀½ׁ� ׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼";
t['BVER'] = "׀’׀¸ ׀¼׀¾׀¶׀µׁ‚׀µ ׀¼׀°ׁ‚׀¸ ׀±׀µׁ‚׀°-׀²׀µׁ€ׁ�ׁ–ׁ�";
t['AVPPV'] = "׀¡׀µׁ€׀µ׀´׀½ׁ� ׀÷ׁ–׀»ׁ�׀÷ׁ–ׁ�ׁ‚ׁ� ׀½׀°ׁ�׀µ׀»׀µ׀½׀½ׁ� ׀½׀° ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ�";
t['AVPPP'] = "׀¡׀µׁ€׀µ׀´׀½ׁ� ׀÷ׁ–׀»ׁ�׀÷ׁ–ׁ�ׁ‚ׁ� ׀½׀°ׁ�׀µ׀»׀µ׀½׀½ׁ� ׀½׀° ׀³ׁ€׀°׀²ׁ†ׁ�";
t['69'] = "Console Log Level<br>׀¢׀†׀›׀¬׀�׀˜ ׀”׀›׀¯ ׀�׀ ׀�׀“׀ ׀�׀�׀†׀¡׀¢׀†׀’ ׀§׀˜ ׀’׀†׀”׀›׀�׀”׀§׀˜׀�׀†׀’<br>(׀·׀° ׀·׀°׀¼׀¾׀²ׁ‡ׁƒ׀²׀°׀½׀½ׁ�׀¼ = 0)";
t['MAX'] = '׀�׀°׀÷ׁ�׀¸׀¼ׁƒ׀¼';
t['TB3SL'] = '׀�׀°׀»׀°ׁˆׁ‚ׁƒ׀²׀°׀½׀½ׁ� ' + TB3O.shN;
t['LARGEMAP'] = '׀’׀µ׀»׀¸׀÷׀° ׀÷׀°ׁ€ׁ‚׀°';
t['COLO'] = '׀�׀¿ׁ†ׁ–ׁ— ׀÷׀¾׀»ׁ�׀¾ׁ€ׁ–׀²';
t['DBGO'] = '׀�׀¿ׁ†ׁ–ׁ— ׀²ׁ–׀´׀»׀°׀´׀÷׀¸';
t['NOW'] = '׀’׀¶׀µ';
t['CLOSE'] = '׀—׀°׀÷ׁ€׀¸ׁ‚׀¸';
t['USE'] = '׀’׀¸׀÷׀¾ׁ€׀¸ׁ�ׁ‚׀°ׁ‚׀¸';
t['OVERVIEW'] = '׀�׀³׀»ׁ�׀´';
t['FORUM'] = '׀₪׀¾ׁ€ׁƒ׀¼';
t['ATTACKS'] = '׀�׀°׀¿׀°׀´׀¸';
t['NEWS'] = '׀�׀¾׀²׀¸׀½׀¸';
t['ADDCRTPAGE'] = '׀”׀¾׀´׀°ׁ‚׀¸ ׀¿׀¾ׁ‚׀¾ׁ‡׀½ׁƒ';
t['SPACER'] = 'Spacer';
t['ATTABLES'] = '׀¢׀°׀±׀»׀¸ׁ†ׁ– ׀²ׁ–׀¹ׁ�ׁ�׀÷';
t['MTW'] = '׀�׀°ׁ€׀½ׁƒ׀²׀°׀½׀½ׁ�';
t['MTX'] = '׀�׀µׁ€׀µ׀²׀¸ׁ‰׀µ׀½׀½ׁ�';
t['MTC'] = '׀—׀°׀²׀°׀½ׁ‚׀°׀¶׀µ׀½׀¾';
t['82.L'] = '׀—׀°׀±׀»׀¾׀÷ׁƒ׀²׀°ׁ‚׀¸ ׀·׀°׀÷׀»׀°׀´׀÷׀¸ (׀�ׁ€׀¸ׁ…׀¾׀²׀°ׁ‚׀¸ ׀²׀¸׀´׀°׀»׀¸ׁ‚׀¸, ׁ€ׁƒׁ…׀°ׁ‚׀¸ ׀²׀²׀µׁ€ׁ…, ׁ€ׁƒׁ…׀°ׁ‚׀¸ ׀²׀½׀¸׀· ׁ–׀÷׀¾׀½׀÷׀¸)';
t['82.U'] = '׀ ׀¾׀·׀±׀»׀¾׀÷ׁƒ׀²׀°ׁ‚׀¸ ׀·׀°׀÷׀»׀°׀´׀÷׀¸ (׀�ׁ€׀¸ׁ…׀¾׀²׀°ׁ‚׀¸ ׀²׀¸׀´׀°׀»׀¸ׁ‚׀¸, ׁ€ׁƒׁ…׀°ׁ‚׀¸ ׀²׀²׀µׁ€ׁ…, ׁ€ׁƒׁ…׀°ׁ‚׀¸ ׀²׀½׀¸׀· ׁ–׀÷׀¾׀½׀÷׀¸)';
t['CKSORT'] = '׀¡׀¾ׁ€ׁ‚ׁƒ׀²׀°׀½׀½ׁ�';
t['MIN'] = '׀�ׁ–׀½ׁ–׀¼ׁƒ׀¼';
t['SVGL'] = '׀ ׀¾׀·׀¿׀¾׀´ׁ–׀»׀¸ׁ‚׀¸ ׀¼ׁ–׀¶ ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ�׀¼׀¸';
t['UPDATEPOP'] = '׀�׀½׀¾׀²׀¸ׁ‚׀¸ ׀½׀°ׁ�׀µ׀»׀µ׀½׀½ׁ�';
t['54'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀²ׁ–׀´ׁ�ׁ‚׀°׀½ׁ� ׁ– ׁ‡׀°ׁ� ׀´׀¾ ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ� ׁƒ ׀¿ׁ–׀´׀÷׀°׀·׀÷׀°ׁ…';
t['EDIT'] = '׀ ׀µ׀´׀°׀³ׁƒ׀²׀°ׁ‚׀¸';
t['NEWVILLAGEAV'] = '׀”׀°ׁ‚׀°/׀§׀°ׁ�';
t['TIMEUNTIL'] = '׀§׀°ׁ� ׀¾ׁ‡ׁ–׀÷ׁƒ׀²׀°׀½׀½ׁ�';
t['62'] = '׀”׀»ׁ� ׀¼׀µ׀½׀µ ׁ‚׀°׀÷׀¾׀¶ ׀¿׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ–׀÷׀¾׀½׀÷ׁƒ "׀’ׁ–׀´׀¿ׁ€׀°׀²׀¸ׁ‚׀¸ ׀¿׀¾׀²ׁ–׀´׀¾׀¼׀»׀µ׀½׀½ׁ�"';
t['CENTERMAP'] = '׀¦׀µ׀½ׁ‚ׁ€ׁƒ׀²׀°ׁ‚׀¸ ׀÷׀°ׁ€ׁ‚ׁƒ ׀½׀° ׁ†ׁ�׀¾׀¼ׁƒ ׀¿׀¾ׁ�׀µ׀»׀µ׀½׀½ׁ–';
t['ACADEMY'] = "׀�׀÷׀°׀´׀µ׀¼ׁ–ׁ�";
t['TREASURY'] = "׀¡׀÷׀°ׁ€׀±׀½׀¸ׁ†ׁ�";
t['34'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀¾׀´׀¸׀½׀¸ׁ†ׁ– ׀÷ׁƒ׀»ׁ�ׁ‚ׁƒׁ€׀¸/׀´׀µ׀½ׁ� ׀² ׁ‚׀°׀±׀»׀¸ׁ†ׁ– ׀¼׀¾׀´׀µׁ€׀½ׁ–׀·׀°ׁ†ׁ–ׁ—";
t['UPGTB'] = "׀�׀¾׀¶׀»׀¸׀²׀¾ׁ�ׁ‚ׁ– ׀¿׀¾׀»ׁ–׀²/׀±ׁƒ׀´ׁ–׀²׀µ׀»ׁ� ׀² ׁ‚׀°׀±׀»׀¸ׁ†ׁ�ׁ… ׀¼׀¾׀´׀µׁ€׀½ׁ–׀·׀°ׁ†ׁ–ׁ—";
t['35'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ�׀¿׀¾׀¶׀¸׀²׀°׀½׀½ׁ� ׀·׀µׁ€׀½׀° ׁƒ ׁ‚׀°׀±׀»׀¸ׁ†ׁ– ׀¼׀¾׀´׀µׁ€׀½ׁ–׀·׀°ׁ†ׁ–ׁ—";
t['40'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ‚׀°׀±׀»׀¸ׁ†ׁ� "׀ ׀µׁ�ׁƒׁ€ׁ�׀¸" ׁƒ ׀¿׀»׀°׀²׀°ׁ�ׁ‡׀¾׀¼ׁƒ ׀²ׁ–׀÷׀½ׁ–';
t['21'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ "׀—׀°׀÷׀»׀°׀´׀÷׀¸" ׀² ׀¿׀»׀°׀²׀°ׁ�ׁ‡׀¾׀¼ׁƒ ׀²ׁ–׀÷׀½ׁ–';
t['23'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ "׀—׀°׀¼ׁ–ׁ‚׀÷׀¸" ׀² ׀¿׀»׀°׀²׀°ׁ�ׁ‡׀¾׀¼ׁƒ ׀²ׁ–׀÷׀½ׁ–';
t['17'] = "׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀½׀°ׁ�׀µ׀»׀µ׀½׀½ׁ� ׀² ׁ�׀¿׀¸ׁ�׀÷ׁƒ ׀¿׀¾ׁ�׀µ׀»׀µ׀½ׁ�";
t['29'] = '׀’׀¸׀÷׀¾ׁ€׀¸ׁ�ׁ‚׀°ׁ‚׀¸ ׀°׀½׀°׀»ׁ–׀·׀°ׁ‚׀¾ׁ€ ׀÷׀°ׁ€ׁ‚׀¸';
t['30'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀¿׀¾ׁ�׀¸׀»׀°׀½׀½ׁ� ׀½׀° ׀÷׀°ׁ€ׁ‚ׁƒ ׀´׀»ׁ� ׀÷׀¾ׁ€׀¸ׁ�ׁ‚ׁƒ׀²׀°ׁ‡ׁ–׀²';
t['31'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׀¿׀¾ׁ�׀¸׀»׀°׀½׀½ׁ� ׀´׀¾ ׀÷׀°ׁ€ׁ‚׀¸ ׀´׀»ׁ� ׀°׀»ׁ�ׁ�׀½ׁ�ׁ–׀²';
t['63'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ€׀¾׀·ׁˆ׀¸ׁ€׀µ׀½ׁ– ׀·׀²ׁ–ׁ‚׀¸ ׀±׀¾ׁ—׀² (TB3)';
t['18'] = '׀�׀¾׀÷׀°׀·׀°ׁ‚׀¸ ׀´׀¾׀´׀°ׁ‚׀÷׀¾׀²׀¸׀¹ (2 ׀÷׀¾׀»׀¾׀½׀÷׀¸) ׁ�׀¿׀¸ׁ�׀¾׀÷ ׀¿׀¾ׁ�׀µ׀»׀µ׀½ׁ� ׁƒ ׀¿׀»׀°׀²׀°ׁ�ׁ‡׀¾׀¼ׁƒ ׀²ׁ–׀÷׀½ׁ–';
t['42'] = '׀¡׀¾ׁ€ׁ‚ׁƒ׀²׀°ׁ‚׀¸ ׀·׀° ׀½׀°׀·׀²׀¾ׁ� ׀±ׁƒ׀´ׁ–׀²׀»ׁ– ׁƒ ׁ‚׀°׀±׀»׀¸ׁ†ׁ– ׀¼׀¾׀´׀µׁ€׀½ׁ–׀·׀°ׁ†ׁ–ׁ—';
t['19'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ ׁ–׀½ׁ„׀¾ׁ€׀¼׀°ׁ†ׁ–ׁ� ׀¿ׁ€׀¾ ׀±ׁƒ׀´ׁ–׀²׀»ׁ–, ׁ‰׀¾ ׁ€׀¾׀·׀²׀¸׀²׀°ׁ�ׁ‚ׁ�ׁ�ׁ� ׀² ׀´׀°׀½׀¸׀¹ ׁ‡׀°ׁ�<br> ׁ– ׀²ׁ–׀¹ׁ�ׁ�׀÷׀°, ׁ�׀÷ׁ– ׀·׀°ׁ€׀°׀· ׁƒ ׀¿׀¾ׁ…׀¾׀´ׁ– ׀² ׁ�׀¿׀¸ׁ�׀÷ׁƒ ׀¿׀¾ׁ�׀µ׀»׀µ׀½ׁ�';
t['32'] = '׀�׀¾׀÷׀°׀·׀°ׁ‚׀¸ "׀�׀¾ׁˆׁƒ׀÷"';
t['33'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ "׀�׀¾ׁˆׁƒ׀÷" ׀² ׀¿׀»׀°׀²׀°ׁ�ׁ‡׀¾׀¼ׁƒ ׀²ׁ–׀÷׀½ׁ–';
t['36'] = '׀�׀¾׀÷׀°׀·ׁƒ׀²׀°ׁ‚׀¸ "׀”׀¾ ׁ‚׀¸ׁ… ׀¿ׁ–ׁ€/׀—׀°׀»׀¸ׁˆ׀¾׀÷" ׀¿ׁ–׀´ׁ€׀°ׁ…ׁƒ׀½׀¾׀÷ ׀² ׁ‚׀°׀±׀»׀¸ׁ†ׁ�ׁ… ׀¼׀¾׀´׀µׁ€׀½ׁ–׀·׀°ׁ†ׁ–ׁ—';
t['RESIDUE'] = '׀—׀°׀»׀¸ׁˆ׀¾׀÷ ׀¿ׁ–ׁ�׀»ׁ� ׁ€׀¾׀·׀²׀¸ׁ‚׀÷ׁƒ ';
t['RESOURCES'] = '׀ ׀µׁ�ׁƒׁ€ׁ�׀¸';
break;
case "hu"://by geo
//avRace = ['Rֳ³mai', 'Germֳ¡n', 'Gall'];
t['8'] = 'Klֳ¡n';
t['SIM'] = 'Harc szimulֳ¡tor';
t['QSURE'] = 'Biztos vagy benne?';
t['LOSS'] = 'Vesztesֳ©g';
t['PROFIT'] = 'Nyeresֳ©g';
t['EXTAV'] = 'Fejlesztֳ©s elֳ©rhetֳµ';
t['PLAYER'] = 'Jֳ¡tֳ©kos';
t['VILLAGE'] = 'Falu';
t['POPULATION'] = 'Nֳ©pessֳ©g';
t['COORDS'] = 'Koordinֳ¡tֳ¡k';
t['MAPTBACTS'] = 'Mozgֳ¡s:';
t['SAVED'] = 'Mentve';
t['YOUNEED'] = 'Kell';
t['TODAY'] = 'ma';
t['TOMORROW'] = 'holnap';
t['DAYAFTERTOM'] = 'holnaputֳ¡n';
t['MARKET'] = 'Piac';
t['BARRACKS'] = 'Kaszֳ¡rnya';
t['RAP'] = 'Gyֳ¼lekezֳµtֳ©r';
t['STABLE'] = 'Istֳ¡llֳ³';
t['WORKSHOP'] = 'Mֳ»hely';
t['SENDRES'] = 'Nyersanyag kֳ¼ldֳ©se';
t['BUY'] = 'Vֳ©tel';
t['SELL'] = 'Eladֳ¡s';
t['SENDIGM'] = 'ֳ�zenet kֳ¼ldֳ©se';
t['LISTO'] = 'Elֳ©rhetֳµ';
t['ON'] = 'ezen a napon:';
t['AT'] = 'ekkor:';
t['EFICIENCIA'] = 'Hatֳ©konysֳ¡g';
t['NEVER'] = 'Soha';
t['ALDEAS'] = 'Falvak';
t['TIEMPO'] = 'Idֳµ';
t['OFREZCO'] = 'Felajֳ¡nlֳ¡s';
t['BUSCO'] = 'Keresֳ©s';
t['TIPO'] = 'Tֳ­pus';
t['DISPONIBLE'] = 'Csak elfogadhatֳ³t';
t['CUALQUIERA'] = 'Mind';
t['YES'] = 'Igen';
t['NO'] = 'Nem';
t['LOGIN'] = 'Bejelentkezֳ©s';
t['MARCADORES'] = 'Kֳ¶nyvjelzֳµk';
t['ANYADIR'] = 'Hozzֳ¡ad';
t['UBU'] = 'Kֳ¶nyvjelzֳµ URL';
t['UBT'] = 'Kֳ¶nyvjelzֳµ szֳ¶vege';
t['DEL'] = 'Tֳ¶rlֳ©s';
t['MAPA'] = 'Tֳ©rkֳ©p';
t['MAXTIME'] = 'Maximum idֳµ';
t['ARCHIVE'] = 'Archֳ­vum';
t['SUMMARY'] = 'ֳ–sszefoglalֳ¡s';
t['TROPAS'] = 'Egysֳ©gek';
t['CHKSCRV'] = 'TBeyond frissֳ­tֳ©se';
t['ACTUALIZAR'] = 'Falu informֳ¡ciֳ³ frissֳ­tֳ©se';
t['VENTAS'] = 'Mentett ajֳ¡nlatok';
t['MAPSCAN'] = 'Tֳ©rkֳ©p vizsgֳ¡lata';
t['BIC'] = 'Bֳµvֳ­tett ikonok';
t['22'] = 'Jegyzettֳ¶mb mutatֳ¡sa';
t['SAVE'] = 'Mentֳ©s';
t['49'] = 'Gyֳ¼lekezֳµtֳ©r alapmֳ»velet';
t['AT2'] = 'Tֳ¡mogatֳ¡s';
t['AT3'] = 'Normֳ¡l tֳ¡madֳ¡s';
t['AT4'] = 'Rablֳ³tֳ¡madֳ¡s';
t['24'] = 'Jegyzettֳ¶mb mֳ©rete';
t['NBSA'] = 'Automatikus';
t['NBSN'] = 'Normֳ¡l (kicsi)';
t['NBSB'] = 'Nagy kֳ©pernyֳµ (nagy)';
t['25'] = 'Jegyzettֳ¶mb magassֳ¡ga';
t['NBHAX'] = 'Magassֳ¡g automatikus bֳµvֳ­tֳ©se';
t['NBHK'] = 'Alap magassֳ¡g';
t['43'] = 'ֳ‰pֳ¼let szintek mutatֳ¡sa';
t['NPCSAVETIME'] = 'Spֳ³rolsz: ';
t['38'] = 'Kֳ¼lterֳ¼let szֳ­njelzֳ©se';
t['44'] = 'ֳ‰pֳ¼letek szֳ­njelzֳ©se';
t['65'] = 'Szֳ­n, ha fejleszthetֳµ<br>(az alaphoz hagyd ֳ¼resen)';
t['66'] = 'Szֳ­n, ha teljesen ki van ֳ©pֳ­tve<br>(az alaphoz hagyd ֳ¼resen)';
t['67'] = 'Szֳ­n, ha nem elֳ©rhetֳµ a fejlesztֳ©s<br>(az alaphoz hagyd ֳ¼resen)';
t['68'] = 'Szֳ­n, ha NPC-vel fejleszthetֳµ<br>(az alaphoz hagyd ֳ¼resen)';
t['TOTALTROOPS'] = 'A faluban kֳ©pzett egysֳ©gek';
t['20'] = 'Kֳ¶nyvjelzֳµk mutatֳ¡sa';
t['U.2'] = 'Nֳ©p';
t['1'] = "Travian v2.x kiszolgֳ¡lֳ³";
t['SELECTALLTROOPS'] = "Minden egysֳ©g kivֳ¡lasztֳ¡sa";
t['PARTY'] = "ֳ�nnepsֳ©gek";
t['CPPERDAY'] = "KP/nap";
t['SLOT'] = "Hely";
t['TOTAL'] = "Teljes";
t['SELECTSCOUT'] = "Kֳ©mek kivֳ¡lasztֳ¡sa";
t['SELECTFAKE'] = "Fake kivֳ¡lasztֳ¡sa";
t['NOSCOUT2FAKE'] = "Nem hasznֳ¡lhatsz kֳ©meket fake tֳ¡madֳ¡sra!";
t['NOTROOP2FAKE'] = "Nincsenek egysֳ©gek fake tֳ¡madֳ¡shoz!";
t['NOTROOP2SCOUT'] = "Nincsenek egysֳ©gek kֳ©mlelֳ©shez!";
t['NOTROOPS'] = "Nincsenek egysֳ©gek a faluban!";
t['ALL'] = "Mind";
t['SH2'] = "A szֳ­neket ֳ­gy add meg:<br>- green vagy red vagy  orange stb.<br>- vagy HEX szֳ­nkֳ³ddal #004523<br>- hagyd ֳ¼resen az alapֳ©rtelmezett szֳ­nhez";
t['SOREP'] = "Eredeti jelentֳ©s (kֳ¼ldֳ©shez)";
t['56'] = "Mezֳµ-tֳ­pus, oֳ¡zis infֳ³ mutatֳ¡sa<br>az egֳ©rmutatֳ³ alatt";
t['10'] = "Harcszimulֳ¡tor link:<br>(bal oldali menֳ¼)";
t['WSIMO1'] = "Beֳ©pֳ­tett";
t['WSIMO2'] = "Kֳ¼lsֳµ (kirilloid.ru ֳ¡ltal)";
t['27'] = "World Analyser vֳ¡lasztֳ¡sa";
t['28'] = "Linkek a statisztika elemzֳµhֳ¶z";
t['NONEWVER'] = "A legֳ÷jabb verziֳ³t hasznֳ¡lod";
t['BVER'] = "Lehet hogy BETA verziֳ³d van";
t['NVERAV'] = "A szkript ֳ÷j verziֳ³ja elֳ©rhetֳµ";
t['UPDSCR'] = "Frissֳ­ted most?";
t['CHECKUPDATE'] = "Szkript-frissֳ­tֳ©s keresֳ©se.<br>Kֳ©rlek vֳ¡rj...";
t['CROPFINDER'] = "Bֳ÷zakeresֳµ";
t['AVPPV'] = "Falunkֳ©nti ֳ¡tlag nֳ©pessֳ©g";
t['AVPPP'] = "Jֳ¡tֳ©kosonkֳ©nti ֳ¡tlag nֳ©pessֳ©g";
t['37'] = "Kֳ¼lterֳ¼let fejlesztֳ©si tֳ¡blֳ¡ja";
t['41'] = "ֳ‰pֳ¼letek fejlesztֳ©si tֳ¡blֳ¡ja";
t['69'] = "Konzol naplֳ³zֳ¡si szint<br>CSAK PROGRAMOZֳ“KNAK VAGY HIBAKERESֳ‰SHEZ<br>(Alap = 0)";
t['48'] = "Piaci ajֳ¡nlatoknֳ¡l tֳ¶bb oldal elֳµre betֳ¶ltֳ©se<br>A Piac -Vֳ¡sֳ¡rlֳ¡s- oldalֳ¡n<br>(Alap = 1)";
t['U.3'] = 'Fֳµfalud neve<br><a href="spieler.php">Nֳ©zd meg a profilodat a frissֳ­tֳ©shez</a>';
t['U.6'] = 'Fֳµfalud koordinֳ¡tֳ¡i<br><a href="spieler.php">Nֳ©zd meg a profilodat a frissֳ­tֳ©shez</a>';
t['TOTTRTR'] = 'ֳ–sszes kikֳ©pzֳ©s alatt ֳ¡llֳ³ egysֳ©g';
t['57'] = 'Tֳ¡volsֳ¡g/idֳµ mutatֳ¡sa';
t['TB3SL'] = TB3O.shN + ' Beֳ¡llֳ­tֳ¡sok';
t['UPDALLV'] = 'Minden falu frissֳ­tֳ©se. HASZNֳ�LD ֳ“VATOSAN, TILTֳ�S Jֳ�RHAT ֳ‰RTE!';
t['9'] = "Tovֳ¡bbi linkek bal oldalon<br>(Traviantoolbox, World Analyser, Travilog, Tֳ©rkֳ©p, stb.)";
t['LARGEMAP'] = 'Nagy tֳ©rkֳ©p';
t['USETHEMPR'] = 'Arֳ¡nyos elosztֳ¡s';
t['USETHEMEQ'] = 'Egyenlֳµ elosztֳ¡s';
t['TOWNHALL'] = 'Tanֳ¡cshֳ¡za';
t['GSRVT'] = 'Jֳ¡tֳ©k kiszolgֳ¡lֳ³';
t['ACCINFO'] = 'Felhasznֳ¡lֳ³ informֳ¡ciֳ³';
t['NBO'] = 'Jegyzettֳ¶mb';
t['MNUL'] = 'Baloldali menֳ¼';
t['STAT'] = 'Statisztikֳ¡k';
t['RESF'] = 'Kֳ¼lterֳ¼let';
t['VLC'] = 'Falukֳ¶zpont';
t['MAPO'] = 'Tֳ©rkֳ©p beֳ¡llֳ­tֳ¡sok';
t['COLO'] = 'Szֳ­n beֳ¡llֳ­tֳ¡sok';
t['DBGO'] = 'Hibakeresֳ©si beֳ¡llֳ­tֳ¡sok';
t['4'] = 'Piac';
t['5'] = 'Gyֳ¼lekezֳµtֳ©r/Kaszֳ¡rnya/Mֳ»hely/Istֳ¡llֳ³';
t['6'] = "Tanֳ¡cshֳ¡za/Hֳµsֳ¶k hֳ¡za/Pֳ¡ncֳ©lkovֳ¡cs/Fegyverkovֳ¡cs";
t['HEROSMANSION'] = "Hֳµsֳ¶k hֳ¡za";
t['BLACKSMITH'] = 'Fegyverkovֳ¡cs';
t['ARMOURY'] = 'Pֳ¡ncֳ©lkovֳ¡cs';
t['NOW'] = 'Most';
t['CLOSE'] = 'Bezֳ¡rֳ¡s';
t['USE'] = 'Hasznֳ¡lat';
t['USETHEM1H'] = 'Egy ֳ³rai termelֳ©s';
t['OVERVIEW'] = 'ֳ�ttekintֳ©s';
t['FORUM'] = 'Fֳ³rum';
t['ATTACKS'] = 'Tֳ¡madֳ¡sok';
t['NEWS'] = 'Hֳ­rek';
t['ADDCRTPAGE'] = 'Jelenlegi hozzֳ¡adֳ¡sa';
t['SCRPURL'] = 'TBeyond oldal';
t['50'] = 'Kֳ©mek szֳ¡ma a<br>"Kֳ©mek vֳ¡lasztֳ¡sa" funkciֳ³hoz';
t['SPACER'] = 'Elvֳ¡lasztֳ³';
t['53'] = 'Egysֳ©g informֳ¡ciֳ³ mutatֳ¡sa gyorstippben';
t['MEREO'] = 'ֳ�zenetek & Jelentֳ©sek';
t['59'] = 'ֳ�zenetek/jelentֳ©sek elֳµre betֳ¶ltֳ¶tt oldalainak szֳ¡ma<br>(Default = 1)';
t['ATTABLES'] = 'Egysֳ©g tֳ¡bla';
t['MTW'] = 'Elpazarolva';
t['MTX'] = 'Meghaladja';
t['MTC'] = 'Jelenlegi rakomֳ¡ny';
t['ALFL'] = 'Link kֳ¼lsֳµ fֳ³rumhoz<br>(belsֳµhֳ¶z hagyd ֳ¼resen)';
t['82.L'] = 'Kֳ¶nyvjelzֳµk lezֳ¡rֳ¡sa (Tֳ¶rlֳ©s ֳ©s mozgatֳ¡s ikonok eltֳ¼ntetֳ©se)';
t['MTCL'] = 'Mindet tֳ¶rֳ¶lni';
t['82.U'] = 'Kֳ¶nyvjelzֳµk feloldֳ¡sa (Tֳ¶rlֳ©s ֳ©s mozgatֳ¡s ikonok mutatֳ¡sa)';
t['CKSORT'] = 'Rendezֳ©shez kattints';
t['MIN'] = 'Min';
t['SVGL'] = 'Minden faluhoz menteni';
t['VGL'] = 'Falu lista';
t['12'] = "'dorf1.php' ֳ©s 'dorf2.php' linkek mutatֳ¡sa";
t['UPDATEPOP'] = 'Nֳ©pessֳ©g frissֳ­tֳ©se';
t['54'] = 'Tֳ¡volsֳ¡g ֳ©s idֳµ mutatֳ¡sa falvakhoz';
t['EDIT'] = 'Szerkesztֳ©s';
t['NPCO'] = 'NPC segֳ­tֳµ beֳ¡llֳ­tֳ¡sai';
t['26'] = 'NPC segֳ­tֳµ szֳ¡mֳ­tֳ¡sok ֳ©s linkek mutatֳ¡sa';
t['58'] = 'Jֳ¡tֳ©kosok/falvak/oֳ¡zisok mutatֳ¡sa a tֳ©rkֳ©pnֳ©l';
t['NEWVILLAGEAV'] = 'Dֳ¡tum/Idֳµ';
t['TIMEUNTIL'] = 'Vֳ¡rakozֳ¡s';
t['61'] = '"Mindet tֳ¶rֳ¶lni" mutatֳ¡sa a jelentֳ©sekhez';
t['62'] = '"ֳ�zenet kֳ¼ldֳ©se" mutatֳ¡sa magam rֳ©szֳ©re is';
t['CENTERMAP'] = 'Tֳ©rkֳ©p kֳ¶zֳ©ppontjֳ¡ba ezt a falut';
t['13'] = 'Mutasd a "Tֳ©rkֳ©p kֳ¶zpontosֳ­tֳ¡sa" ikont';
t['SENDTROOPS'] = 'Egysֳ©gek kikֳ¼ldֳ©se';
t['64'] = 'Jelentֳ©s statisztika rֳ©szletezֳ©se';
t['7'] = "Palota/Rezidencia/Akadֳ©mia/Kincstֳ¡r";
t['PALACE'] = "Palota";
t['RESIDENCE'] = "Rezidencia";
t['ACADEMY'] = "Akadֳ©mia";
t['TREASURY'] = "Kincstֳ¡r";
t['45'] = "Villogֳ³ szintjelzֳ©s az ֳ©ppen fejlesztett ֳ©pֳ¼letekhez";
t['60'] = 'Linkek az ֳ¼zenetek felugrֳ³ ablakban mutatֳ¡sֳ¡hoz';
break;
case "no"://by ThePirate
//avRace = ['Romere', 'Germanere', 'Gallere'];
t['8'] = 'Allianse';
t['SIM'] = 'Kamp-simulator';
t['QSURE'] = 'Er du sikker?';
t['LOSS'] = 'Tap';
t['PROFIT'] = 'Profit';
t['EXTAV'] = 'Utvidelse tilgjengelig';
t['PLAYER'] = 'Spiller';
t['VILLAGE'] = 'By';
t['POPULATION'] = 'Befolknong';
t['COORDS'] = 'Koordinater';
t['MAPTBACTS'] = 'Handlinger';
t['SAVED'] = 'Lagret';
t['YOUNEED'] = 'Du trenger';
t['TODAY'] = 'idag';
t['TOMORROW'] = 'imorgen';
t['DAYAFTERTOM'] = 'dagen etter imorgen';
t['MARKET'] = 'Markedsplass';
t['BARRACKS'] = 'Kaserne';
t['RAP'] = 'Mֳ¸teplass';
t['STABLE'] = 'Stall';
t['WORKSHOP'] = 'Verksted';
t['SENDRES'] = 'Send ressurser';
t['BUY'] = 'Kjֳ¸p';
t['SELL'] = 'Selg';
t['SENDIGM'] = 'Send IGM';
t['LISTO'] = 'Kan bygges';
t['ON'] = 'den';
t['AT'] = 'klokken';
t['EFICIENCIA'] = 'Effektivitet';
t['NEVER'] = 'Aldri';
t['ALDEAS'] = 'By(er)';
t['TIEMPO'] = 'Tid';
t['OFREZCO'] = 'Tilbyr';
t['BUSCO'] = 'Leter etter';
t['TIPO'] = 'Type';
t['DISPONIBLE'] = 'Kun tigjengelig';
t['CUALQUIERA'] = 'Alle';
t['YES'] = 'Ja';
t['NO'] = 'Nei';
t['LOGIN'] = 'Logg inn';
t['MARCADORES'] = 'Bokmerker';
t['ANYADIR'] = 'Legg til';
t['UBU'] = 'Nytt bokmerke URL';
t['UBT'] = 'Nytt nokmerke Text';
t['DEL'] = 'Slett';
t['MAPA'] = 'Kart';
t['MAXTIME'] = 'Maximum tid';
t['ARCHIVE'] = 'Arkiv';
t['SUMMARY'] = 'Resume';
t['TROPAS'] = 'Tropper';
t['CHKSCRV'] = 'Oppdater TBeyond';
t['ACTUALIZAR'] = 'Oppdater by-informasjon';
t['VENTAS'] = 'Lagrede tilbud';
t['MAPSCAN'] = 'Scan Kartet';
t['BIC'] = 'Vis utvidede iconer';
t['22'] = 'Vis notatblokk';
t['SAVE'] = 'Lagre';
t['49'] = 'Mֳ¸teplass standard handling ';
t['AT2'] = 'Forsterkninger';
t['AT3'] = 'Angrep: Normalt';
t['AT4'] = 'Angrep: Plyndringstokt';
t['24'] = 'Notisblokk stֳ¸rrelse';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normal (Liten)';
t['NBSB'] = 'Stֳ¸rre';
t['25'] = 'Notisblokk hֳ¸yde';
t['NBHAX'] = 'Automatisk utvid hֳ¸yde';
t['NBHK'] = 'Standard hֳ¸yde';
t['43'] = 'Vis bygnings nivֳ¥';
t['NPCSAVETIME'] = 'Lagre: ';
t['38'] = 'Vi farge pֳ¥ ressurs nivֳ¥et';
t['44'] = 'Vis bygnings nivֳ¥ farger';
t['65'] = 'Farge utvidelse tilgjengelig<br>(Standard = Tom)';
t['66'] = 'Farge maksimalt nivֳ¥l<br>(Standard = Tom)';
t['67'] = 'Farge utvidelse ikke tilgjengelig<br>(Standard = Tom)';
t['68'] = 'Farge utvidelse via NPC<br>(Standard = Tom)';
t['TOTALTROOPS'] = 'Totale tropper i byen';
t['20'] = 'Vis bokmerker';
t['U.2'] = 'Stamme';
t['1'] = "Travian v2.x server";
t['SELECTALLTROOPS'] = "Velg alle tropper";
t['PARTY'] = "Fester";
t['CPPERDAY'] = "KP/dag";
t['SLOT'] = "Utvidelse";
t['TOTAL'] = "Totalt";
t['SELECTSCOUT'] = "Velg scout";
t['SELECTFAKE'] = "Velg fake";
t['NOSCOUT2FAKE'] = "Det er umulig ֳ¥ bruke scouts til et fake angrep !";
t['NOTROOP2FAKE'] = "Det er ikke nok tropper til et fake angrep !";
t['NOTROOP2SCOUT'] = "Det er ikke nok tropper til ֳ¥ scoute med !";
t['NOTROOPS'] = "Det er ikke noen tropper i byen !";
t['ALL'] = "Alle";
t['SH2'] = "I farge-felt kan du skrive:<br>- <b>green</b> eller <b>red</b> eller  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
t['SOREP'] = "Vis orginal rapport (for posting)";
t['56'] = "Vis rute/oase type<br>ved musepekeren over kartet";
t['10'] = "Kampsimulator link:<br>(menyen til venstre)";
t['28'] = "Show analyser statistic links";
t['NONEWVER'] = "Du har den siste versjonen tilgjengelig";
t['BVER'] = "Du har kansje en beta versjon";
t['NVERAV'] = "En ny versjon er tilgjengelig";
t['UPDSCR'] = "Oppdatere nֳ¥ ?";
t['CHECKUPDATE'] = "Leter etter script oppdatering.<br>Venligst vent...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Gjennomsnittlig befolkning per by";
t['AVPPP'] = "Gjennomsnittlig befolkning per spiller";
t['37'] = "Vis utvidelseshjelp for ressursfelt";
t['41'] = "Vis utvidelseshjelp for bygninger";
t['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0)";
t['48'] = "Mengde av 'tilbyr' sider som skal lastes<br>i 'Marked => Kjֳ¸p' side<br>(Standard = 1)";
t['U.3'] = 'Navn pֳ¥ din hovedby<br><b>Ikke endre pֳ¥ dette, besֳ¸k profilen din!</b>';
t['U.6'] = 'Koordinater til hovedbyen din<br><b>Ikke endre pֳ¥ dette, besֳ¸k profilen din!</b>';
t['TOTTRTR'] = 'Total troppe utviklings tid';
t['57'] = 'Vis avstand og tid';
t['UPDALLV'] = 'Oppdater alle byer.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
t['9'] = 'Vis flere lenker i menyen til venstre<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)';
t['LARGEMAP'] = 'Stort kart';
break;
case "si"://by BmW
//avRace = ['Rimljani', 'Tevtoni', 'Galci'];
t['8'] = 'Aliansa';
t['SIM'] = 'Simulator bitk';
t['QSURE'] = 'Ali ste prepriִ�ani?';
t['LOSS'] = 'Izguba';
t['PROFIT'] = 'Profit';
t['EXTAV'] = 'Nadgradnja moֵ¾na';
t['PLAYER'] = 'Igralec';
t['VILLAGE'] = 'Naselbine';
t['POPULATION'] = 'Populacija';
t['COORDS'] = 'Koordinate';
t['MAPTBACTS'] = 'Moֵ¾nosti';
t['SAVED'] = 'Shranjeno';
t['YOUNEED'] = 'Manjka';
t['TODAY'] = 'Danes';
t['TOMORROW'] = 'Jutri';
t['DAYAFTERTOM'] = 'Pojutriֵ¡njem';
t['MARKET'] = 'Trֵ¾nica';
t['BARRACKS'] = 'Barake';
t['RAP'] = 'Zbiraliֵ¡ִ�e';
t['STABLE'] = 'Konjuֵ¡nica';
t['WORKSHOP'] = 'Izdelovalec oblegovalnih naprav';
t['SENDRES'] = 'Poֵ¡lji surovine';
t['BUY'] = 'Kupi';
t['SELL'] = 'Ponudi';
t['SENDIGM'] = 'Poֵ¡lji sporoִ�ilo';
t['LISTO'] = 'Dovolj';
t['ON'] = '';
t['AT'] = 'ob';
t['EFICIENCIA'] = 'Izkoristek';
t['NEVER'] = 'Nikoli';
t['ALDEAS'] = 'Vas(i)';
t['TIEMPO'] = 'ִ�as';
t['OFREZCO'] = 'Ponuja';
t['BUSCO'] = 'Iֵ¡ִ�e';
t['TIPO'] = 'Tip';
t['DISPONIBLE'] = 'Samo moֵ¾ne ponudbe';
t['CUALQUIERA'] = 'Karkoli';
t['YES'] = 'Da';
t['NO'] = 'Ne';
t['LOGIN'] = 'Prijava';
t['MARCADORES'] = 'Povezave';
t['ANYADIR'] = 'Dodaj';
t['UBU'] = 'Cilj povezave';
t['UBT'] = 'Ime povezave';
t['DEL'] = 'Izbriֵ¡i';
t['MAPA'] = 'Zemljevid';
t['MAXTIME'] = 'Maksimalen ִ�as';
t['ARCHIVE'] = 'Arhiv';
t['SUMMARY'] = 'Pregled';
t['TROPAS'] = 'Enote';
t['CHKSCRV'] = 'Posodobi skripto';
t['ACTUALIZAR'] = 'Posodobi informacije o naseljih';
t['VENTAS'] = 'Shranjene ponudbe';
t['MAPSCAN'] = 'Preglej mapo';
t['BIC'] = 'Dodatne ikone';
t['22'] = 'Prikaֵ¾i beleֵ¾ko';
t['SAVE'] = 'Shrani';
t['49'] = 'Privzeta izbira Zbiraliֵ¡ִ�a';
t['AT2'] = 'Okrepitve';
t['AT3'] = 'Napad:  Polni napad';
t['AT4'] = 'Napad:  Roparski pohod';
t['24'] = 'Velikost';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normalna (majhna)';
t['NBSB'] = 'Velik zaslon (velika)';
t['25'] = 'Viֵ¡ina';
t['NBHAX'] = 'Samodejno prilagajaj velikost';
t['NBHK'] = 'Privzeta viֵ¡ina';
t['43'] = 'Stopnje';
t['NPCSAVETIME'] = 'Prihrani: ';
t['38'] = 'Barvne stopnje';
t['44'] = 'Barvne stopnje';
t['65'] = 'Barva: Nadgradnja moֵ¾na<br>(Prazno = privzeto)';
t['66'] = 'Barva: Najviֵ¡ja stopnja<br>(Prazno = privzeto)';
t['67'] = 'Barva: Nadgradnja ni moֵ¾na<br>(Prazno = privzeto)';
t['68'] = 'Barva: Nadgradnja moֵ¾na preko NPC Trgovanja<br>(Prazno = privzeto)';
t['TOTALTROOPS'] = 'Skupno ֵ¡tevilo enot';
t['20'] = 'Prikaֵ¾i povezave';
t['U.2'] = 'Pleme';
t['1'] = "Travian v2.x server";
t['SELECTALLTROOPS'] = "Vse enote";
t['PARTY'] = "Festivali";
t['CPPERDAY'] = "KT/Dan";
t['SLOT'] = "Reֵ¾e";
t['TOTAL'] = "Vsota";
t['SELECTSCOUT'] = "Skavti";
t['SELECTFAKE'] = "Fake";
t['NOSCOUT2FAKE'] = "Ni mogoִ�e poslati skavtov kot fake napad";
t['NOTROOP2FAKE'] = "Ni dovolj enot za fake napad!";
t['NOTROOP2SCOUT'] = "Ni dovolj enot za poizvedbo!";
t['NOTROOPS'] = "V naselju ni enot!";
t['ALL'] = "Vse";
t['SH2'] = "V polja za barvo lahko vnesete:<br>- npr. green(zelena) ali red(rdeִ�a) ali orange(oranֵ¾na)<br>- HEX kodo kot #004523<br>- pustite prazno za privzete barve";
t['SOREP'] = "Prikaֵ¾i originalno poroִ�ilo (za poֵ¡iljanje)";
t['56'] = "Prikaֵ¾i tip polja/info oaze<br>med premikanjem miֵ¡ke po mapi";
t['10'] = "Simulator bitk:<br>(levi meni)";
t['WSIMO1'] = "Notranji (ponujen v igri)";
t['WSIMO2'] = "Zunanji (ponujen pri kirilloid.ru)";
t['27'] = "Uporabi World Analyser";
t['28'] = "Povezave Analyser statistike";
t['NONEWVER'] = "Skripte ni treba posodobiti";
t['BVER'] = "Lahko, da imate beta razliִ�ico";
t['NVERAV'] = "Nova razliִ�ica skripte je na voljo";
t['UPDSCR'] = "Posodobi skripto";
t['CHECKUPDATE'] = "Preverjam za posodobitev.<br>Prosim poִ�akajte...";
t['CROPFINDER'] = "Iskalec ֵ½ita";
t['AVPPV'] = "Povpreִ�na populacija naselja";
t['AVPPP'] = "Povpreִ�na populacija igralca";
t['37'] = "Tabela nadgradenj";
t['41'] = "Tabela nadgradenj";
t['69'] = "Konzola (Za stopnje)<br>SAMO ZA PROGRAMERJE ALI RAZHROֵ ִ�EVANJE<br>(Privzeto = 0)";
t['48'] = 'ֵ tevilo strani ponudb, ki se naj naloֵ¾ijo:<br>medtem ko ste na "Trֵ¾nici => Kupi" strani<br>(Privzeto = 1)';
t['U.3'] = 'Ime metropole';
t['U.6'] = 'Koordinate metropole';
t['MAX'] = 'Maksimalno';
t['TOTTRTR'] = 'Skupno ֵ¡tevilo enot v postopku';
t['57'] = 'Razdalje in ִ�asi';
t['TB3SL'] = TB3O.shN + 'Nastavitve';
t['UPDALLV'] = 'Osveֵ¾i vsa naselja.';
t['9'] = 'Dodatne povezave v levem meniju<br>(Traviantoolbox, World Analyser, Travilog, Map.)';
t['LARGEMAP'] = 'Velik zemljevid';
t['USETHEMPR'] = 'Uporabi (izmeniִ�no)';
t['USETHEMEQ'] = 'Uporabi (enako)';
t['TOWNHALL'] = 'Mestna hiֵ¡a';
t['GSRVT'] = 'Tip Serverja';
t['ACCINFO'] = 'Informacije o raִ�unu';
t['NBO'] = 'Beleֵ¾ka';
t['MNUL'] = 'Meni na levi strani';
t['STAT'] = 'Statistika';
t['RESF'] = 'Surovinska polja';
t['VLC'] = 'Center naselja';
t['MAPO'] = 'Moֵ¾nosti zemljevida';
t['COLO'] = 'Barve';
t['DBGO'] = 'Moֵ¾nosti razhroֵ¡ִ�evanja';
t['4'] = 'Trֵ¾nica';
t['5'] = 'Zbiraliֵ¡ִ�e/Barake/Konjuֵ¡nica/Izdelovalec oblegovalnih naprav';
t['6'] = 'Mestna hiֵ¡a/Herojeva residenca<br>Izdelovalec oklepov/Izdelovalec oroֵ¾ja';
t['HEROSMANSION'] = 'Herojeva residenca';
t['BLACKSMITH'] = 'Izdelovalec oroֵ¾ja';
t['ARMOURY'] = 'Izdelovalec oklepov';
t['NOW'] = 'Sedaj';
t['CLOSE'] = 'Zapri';
t['USE'] = 'Uporabi';
t['USETHEM1H'] = 'Uporabi (1 urna proizvodnja)';
t['OVERVIEW'] = 'Pregled';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Napadi';
t['NEWS'] = 'Novice';
t['ADDCRTPAGE'] = 'Dodaj trenutno stran';
t['SCRPURL'] = 'TBeyond stran';
t['50'] = 'ֵ tevilo skavtov za "Skavti" funkcijo';
t['SPACER'] = 'Loִ�ilna ִ�rta';
t['53'] = 'Prikaֵ¾i informacije o enoti, ki je v vasi<br>(Ko greste z miֵ¡ko na enoto)';
t['MEREO'] = 'Sporoִ�ila in Poroִ�ila';
t['59'] = 'ֵ tevilo strani Sporoִ�il/Poroִ�il, ki se naj naloֵ¾ijo<br>(Privzeto = 1)';
t['ATTABLES'] = 'Tabela enot';
t['MTW'] = 'Ostane';
t['MTX'] = 'Preseֵ¾eno';
t['MTC'] = 'Skupaj';
t['ALFL'] = 'Povezava do zunanjega Foruma<br>(Pusti prazno za notranji Forum)';
t['MTCL'] = 'Poִ�isti vse';
t['82.L'] = 'Zakleni povezave';
t['82.U'] = 'Odkleni povezave';
t['CKSORT'] = 'Razvrsti';
t['MIN'] = 'Minimalno';
t['SVGL'] = 'Shrani za vse vasi';
t['VGL'] = 'Naselja';
t['12'] = "Prikaֵ¾i 'dorf1' in 'dorf2' povezave";
t['UPDATEPOP'] = 'Posodobi populacijo';
t['54'] = 'Razdalje in ִ�asi do vasi';
t['EDIT'] = 'Uredi';
t['NPCO'] = 'Moֵ¾nosti NPC trgovanja';
t['26'] = 'NPC izraִ�une/povezave';
t['NEWVILLAGEAV'] = 'Nova vas';
t['58'] = 'Tabela Igralcev/Vasi/Okupiranih pokrajin';
t['NEWVILLAGEAV'] = 'Datum/ִ�as';
t['TIMEUNTIL'] = 'ִ�as ִ�akanja';
t['61'] = '"Izbriֵ¡i Vse" tabela na strani poroִ�il';
t['62'] = '"Poֵ¡lji IGM" ikona tudi za mene';
t['CENTERMAP'] = 'Centriraj zemljevid';
t['13'] = '"Centriraj zemljevid" ikona';
t['SENDTROOPS'] = 'Poֵ¡lji enote';
t['64'] = 'Podrobnosti pri poroִ�ilih';
t['7'] = "Palaִ�a/Rezidenca/Akademija/Zakladnica";
t['PALACE'] = "Palaִ�a";
t['RESIDENCE'] = "Rezidenca";
t['ACADEMY'] = "Akademija";
t['TREASURY'] = "Zakladnica";
t['45'] = "Utripanje stopenj zgradb, ki se nadgrajujejo";
t['UPGTB'] = "Tabele surovinskih polj/zgradb";
t['34'] = "Prikaֵ¾i KT/Dan v tabeli nadgradenj";
t['35'] = "Poraba ֵ¾ita v tabeli nadgradenj";
t['14'] = "Prikaֵ¾i ikone 'Poֵ¡lji enote/Poֵ¡lji surovine' v tabeli naselij";
t['16'] = "Efektivna proizvodnja ֵ¾ita v tabeli naselij";
t['RBTT'] = "Diagram surovin";
t['39'] = "'Diagram surovin' tabela";
t['40'] = "'Diagram surovin' tabela kot plavajoִ�e okno";
t['21'] = "'Zaznamki' kot kot plavajoִ�e okno";
t['23'] = "'Beleֵ¾ka' as kot plavajoִ�e okno";
t['17'] = "Populacija v listi naselij";
t['29'] = 'Uporabi Map Analyser';
t['30'] = 'Povezave do mape za uporabnike';
t['31'] = 'Povezave do mape za alianse';
t['63'] = 'Napredna TB3 poroִ�ila';
t['60'] = 'Ikona za odpiranje sporoִ�il v novem oknu (Pop-up)';
t['18'] = 'Dodatna (stolpca) v listi naselij kot plavajoִ�e okno';
t['42'] = 'Razporedi zgradbe po imenu v tabeli nadgradenj';
t['19'] = 'Prikaֵ¾i informacije o zgradbah in premikanju enot<br>v listi naselij';
t['32'] = "Prikaֵ¾i 'Iskanje'";
t['3'] = 'Vsili T3.1 kapaciteto za Legionarje in Falange<br>(za razliִ�ne T3.1 in T3.5 serverje)';
t['33'] = "'Iskalnik' kot plavajoִ�e okno";
t['36'] = "'Dokler/Ostanek' v tabelah nadgradi/uri";
t['RESIDUE'] = 'Ostanek, ִ�e zgradiֵ¡';
t['RESOURCES'] = 'Surovine';
t['2'] = 'Odstrani reklame';
t['SH1'] = "Odpri Profil za samodejno odkrvanje metropole/koordinat<br>Zgradite Barake za samodejno odkrivanje plemena in potem odprite Center naselja";
t['46'] = "Dodatne informacije za vsakega prihajajoִ�ega trgovca";
break;
case "tw":
case "hk"://by MarioCheng & chihsun
//avRace = ['ח¾…י¦¬ה÷÷', 'ז¢�י “ה÷÷', 'י«˜ח›§ה÷÷'];
t['8'] = 'ט�¯ח›�';
t['SIM'] = 'זˆ°י¬¥ז¨¡ז“¬ו™¨';
t['QSURE'] = 'ז˜¯ו�¦ח¢÷ו®�?';
t['LOSS'] = 'ז��ו₪±';
t['PROFIT'] = 'ח�²ח›�';
t['EXTAV'] = 'ו·²ו�¯ו�‡ח´�!';
t['PLAYER'] = 'ח�©ו®¶';
t['VILLAGE'] = 'ז�‘ט��';
t['POPULATION'] = 'ה÷÷ו�£';
t['COORDS'] = 'ו÷§ז¨™';
t['MAPTBACTS'] = 'ט¡�ו‹•';
t['SAVED'] = 'ו„²ו­˜';
t['YOUNEED'] = 'ז‚¨ט¦�';
t['TODAY'] = 'ה»�ו₪©';
t['TOMORROW'] = 'ז˜�ו₪©';
t['DAYAFTERTOM'] = 'ו¾�ו₪©';
t['MARKET'] = 'ו¸‚ו ´';
t['BARRACKS'] = 'ו…µח‡�';
t['RAP'] = 'י›†חµ�י»�';
t['STABLE'] = 'י¦¬ו»„';
t['WORKSHOP'] = 'ו·¥ו ´';
t['SENDRES'] = 'י�‹י€�ט³‡ז÷�';
t['BUY'] = 'ט²·י€²';
t['SELL'] = 'ט³£ו‡÷';
t['SENDIGM'] = 'ח™¼י€�IGM';
t['LISTO'] = 'ו�‡ח´�ו�¯ז–¼';
t['ON'] = '-';
t['AT'] = '-';
t['EFICIENCIA'] = 'ז•ˆח�‡';
t['NEVER'] = 'ז°¸ה¸�';
t['ALDEAS'] = 'ז�‘ט��';
t['TIEMPO'] = 'ז™‚י–“';
t['OFREZCO'] = 'ז��ה¾›';
t['BUSCO'] = 'ז��ח´¢';
t['TIPO'] = 'ז¯”ה¾‹';
t['DISPONIBLE'] = 'ו¿½ח•¥י��ו°‘ח‰©ט³‡';
t['CUALQUIERA'] = 'ז‰€ז�‰';
t['YES'] = 'ז˜¯';
t['NO'] = 'ו�¦';
t['LOGIN'] = 'ח™»ו…¥';
t['MARCADORES'] = 'ז›¸ח±₪';
t['ANYADIR'] = 'ו� ו…¥';
t['UBU'] = 'ז–°ז›¸ח±₪ח¶²ו�€';
t['UBT'] = 'ז–°ז›¸ח±₪ז¨™י¡�(ו�×י™�ט‹±ז–‡ו��ז•¸ו­—)';
t['DEL'] = 'וˆ×י™₪';
t['MAPA'] = 'ו�°ו�– (TravMap)';
t['MAXTIME'] = 'ז�€ו₪§י�‹ט¼¸ז™‚י–“';
t['ARCHIVE'] = 'ו„²ו­˜';
t['SUMMARY'] = 'ז¦‚ט¦�';
t['TROPAS'] = 'ט»�י��';
t['CHKSCRV'] = 'ז×¢ז�¥ח‰ˆז�¬ז›´ז–°';
t['ACTUALIZAR'] = 'ז›´ז–°ז­₪ז�‘ט��ח�„ט³‡ז–™';
t['VENTAS'] = 'ט³£ו‡÷ח´€י�„';
t['MAPSCAN'] = 'ז��ו°‹ז­₪ו�°ו�–';
t['BIC'] = 'י¡¯ח₪÷ז›´ו₪�ו¿«ז�·ו�–ח₪÷';
t['22'] = 'י¡¯ח₪÷ח­†ט¨˜ז¬„';
t['SAVE'] = 'ו„²ו­˜';
t['49'] = 'י›†חµ�י»�ח�„י �ט¨­ט¡�ו‹•';
t['AT2'] = 'ו¢�ז�´';
t['AT3'] = 'ז”»ז“�ן¼�ז­£ו¸¸';
t['AT4'] = 'ז”»ז“�ן¼�ז�¶ו¥×';
t['24'] = 'ח­†ט¨˜ז¬„ו₪§ו°�';
t['NBSA'] = 'ט‡×ו‹•';
t['NBSN'] = 'ז™®י€� (ח´°)';
t['NBSB'] = 'ו₪§ח•«י�¢ (ו₪§)';
t['25'] = 'ח­†ט¨˜ז¬„י«˜ו÷¦';
t['NBHAX'] = 'ט‡×ו‹•ט®�ז›´י«˜ו÷¦';
t['NBHK'] = 'ו›÷ו®�י«˜ו÷¦';
t['43'] = 'י¡¯ח₪÷ו»÷ח¯‰ח‰©ח­‰ח´�';
t['NPCSAVETIME'] = 'ו„²ו­˜ט³‡ז÷�י�€ז™‚ן¼�';
t['38'] = 'י¡¯ח₪÷ט³‡ז÷�ח”°ח­‰ח´�י¡�ט‰²';
t['44'] = 'י¡¯ח₪÷ו»÷ח¯‰ח‰©ח­‰ח´�י¡�ט‰²';
t['65'] = 'ו·²ו�¯ו�‡ח´�ח�„י¡�ט‰²<br>(י �ט¨­ = ח©÷ח™½)';
t['66'] = 'ו·²י�”ז�€י«˜ח­‰ח´�ח�„י¡�ט‰²<br>(י �ט¨­ = ח©÷ח™½)';
t['67'] = 'ה¸�ו�¯ו�‡ח´�ח�„י¡�ט‰²<br>(י �ט¨­ = ח©÷ח™½)';
t['68'] = 'ו�¯וˆ©ח”¨NPCה÷₪ז˜“ה¾†ו�‡ח´�ח�„י¡�ט‰²<br>(י �ט¨­ = ח©÷ח™½)';
t['TOTALTROOPS'] = 'ז­₪ז�‘ט��ח�„ט»�י��ח¸½ז•¸';
t['20'] = 'י¡¯ח₪÷ז›¸ח±₪';
t['U.2'] = 'ח¨®ז—�';
t['1'] = "Travian v2.x ה¼÷ז��ו™¨";
t['SELECTALLTROOPS'] = "י�¸ו�–ו…¨יƒ¨ו£«ו…µ";
t['PARTY'] = "ז…¶ח¥�";
t['CPPERDAY'] = "ז–‡ז˜�י»�ן¼ˆז¯�ו₪©ן¼‰";
t['SLOT'] = "ז“´ו±•י‡�";
t['TOTAL'] = "ח¸½ז•¸";
t['SELECTSCOUT'] = "י�¸ו�–ו�µו¯�ט»�י��";
t['SELECTFAKE'] = "י�¸ו�–ה½¯ז”»ט»�י��";
t['NOSCOUT2FAKE'] = "ח„¡ז³•ה½¿ח”¨ו�µו¯�ט»�ח¨®ה¾†ח™¼ו‡÷ה½¯ז”»!";
t['NOTROOP2FAKE'] = "ז²’ז�‰ט»�י��ו�¯ה»¥ח™¼ו‡÷ה½¯ז”»!";
t['NOTROOP2SCOUT'] = "ז²’ז�‰ו�µו¯�ט»�י��!";
t['NOTROOPS'] = "ז­₪ז�‘ט��ח„¡ט»�י��!";
t['ALL'] = "ו…¨יƒ¨";
t['SH2'] = "ו�¨ז¬„ה½�ה¸­ן¼�ו�¯ה»¥ט¼¸ו…¥ן¼�<br>- green זˆ– red זˆ– orange, ח­‰ח­‰...<br>- זˆ–ז˜¯ט¼¸ו…¥י¡�ט‰²ח�„16י€²וˆ¶ח¢¼ן¼�ו¦‚ #004523<br>- ה¹�ו�¯ה»¥ה¿�ח•™ח©÷ח™½ה¾†ה½¿ח”¨י �ט¨­י¡�ט‰²";
t['SOREP'] = "י¡¯ח₪÷ו��ו§‹ח�„ו ±ו‘� (חµ¦ו¼µט²¼ח”¨)";
t['56'] = "ח•¶ז»‘י¼ ח§»וˆ°ז™‚<br>י¡¯ח₪÷ז�‘ט��ח¨®י¡�זˆ–ח¶ ז´²ט³‡ז–™";
t['10'] = "ו·¦ו�´י�¸ו–®ח�„זˆ°י¬¥ז¨¡ז“¬ו™¨י€£חµ�";
t['WSIMO1'] = "ו…§ח½® (ח”±י��זˆ²ז‰€ז��ה¾›)";
t['WSIMO2'] = "ו₪–י€£ (ח”±kirilloid.ruז��ה¾›)";
t['27'] = "י�¸ו�–ה¸–ח•�וˆ†ז��ח¶²ח«™";
t['28'] = "ו�¨ח�©ו®¶ו��ח¨±ו�³ו�´י¡¯ח₪÷וˆ†ז��י€£חµ�";
t['NONEWVER'] = "ז‚¨ז­£ו�¨ה½¿ח”¨ז�€ז–°ח‰ˆז�¬";
t['BVER'] = "ח›®ו‰�ז­£ו�¨ה½¿ח”¨ז¸¬ט©¦ח‰ˆ";
t['NVERAV'] = "ח›®ו‰�ו·²ז�‰ז›´ז–°ח�„ח‰ˆז�¬ן¼�";
t['UPDSCR'] = "ז˜¯ו�¦י�€ט¦�ז›´ז–°ן¼�";
t['CHECKUPDATE'] = "ז­£ו�¨ז×¢ז�¥ח¨‹ו¼�ז›´ז–°ן¼�ט«‹ח¨�ו€™...";
t['CROPFINDER'] = "ז��ח”°ו·¥ו…·";
t['AVPPV'] = "ו¹³ו�‡ז¯�ז�‘ה÷÷ו�£";
t['AVPPP'] = "ו¹³ו�‡ז¯�ח�©ו®¶ה÷÷ו�£";
t['37'] = "י¡¯ח₪÷ו…¨ט³‡ז÷�ח”°ו�‡ח´�ט¡¨ו–®";
t['41'] = "י¡¯ח₪÷ו…¨ו»÷ח¯‰ח‰©ו�‡ח´�ט¡¨ו–®";
t['69'] = "ח¨‹ו¼�ט¨˜י�„ח­‰ח´�<br>ו�×י�©ח”¨ז–¼ח¨‹ו¼�י–‹ח™¼ו“¡ זˆ– י™₪ט�²ו·¥ה½�<br>(י �ט¨­ = 0)";
t['48'] = "י �ו…ˆט¼‰ו…¥ח�„י �ז•¸<br>'ו¸‚ו ´ ג†’ ט²·י€²' ח�„י �י�¢ה¸­<br>(י �ט¨­ = 1, ז�€ו₪� = 5)";
t['U.3'] = 'ז‚¨ז�‘ט��ח�„ו��ח¨±<br>ט«‹ח€�ט¦½ו€‹ה÷÷ט³‡ז–™ה¾†י€²ט¡�ט‡×ו‹•ז›´ז–°ן¼�ה¸�ט¦�ז‰‹ו‹•ה¿®ז”¹ז­₪ז¬„';
t['U.6'] = 'ז‚¨ז�‘ט��ח�„ו��ז¨™<br>ט«‹ח€�ט¦½ו€‹ה÷÷ט³‡ז–™ה¾†י€²ט¡�ט‡×ו‹•ז›´ז–°ן¼�ה¸�ט¦�ז‰‹ו‹•ה¿®ז”¹ז­₪ז¬„';
t['MAX'] = 'ז�€ו₪�';
t['TOTTRTR'] = 'ז‰€ז�‰ז­£ו�¨ט¨“ח·´ח�„ו£«ו…µ';
t['57'] = 'י¡¯ח₪÷ט·�י›¢ו��ז™‚י–“';
t['TB3SL'] = 'ט¨­ו®� TBeyond ML&CN';
t['UPDALLV'] = 'ז›´ז–°ז‰€ז�‰ז�‘ט��ט³‡ז–™ד€‚(ז�‰ז©�ז�ƒו°�ט‡´ט¢«י�–ו¸³ט™�)';
t['9'] = "ו�¨ו·¦ו�´י�¸ו–®ה¸­י¡¯ח₪÷ז›´ו₪�י€£חµ�<br>(Traviantoolbox, World Analyser, Travilog, Map, ח­‰ח­‰.)";
t['LARGEMAP'] = 'ו₪§ו�°ו�–';
t['USETHEMPR'] = 'ז´¾ו‡÷ז‰€ז�‰ו•†ה÷÷ (ז�‰ט³‡ז÷�ז¯”ה¾‹וˆ†י…�)';
t['USETHEMEQ'] = 'ז´¾ו‡÷ז‰€ז�‰ו•†ה÷÷ (ו¹³ו�‡וˆ†י…�)';
t['TOWNHALL'] = 'ז�‘ז�ƒו ‚';
t['GSRVT'] = 'י��זˆ²ה¼÷ז��ו™¨';
t['ACCINFO'] = 'ו¸³ט™�ט³‡ז–™';
t['NBO'] = 'ח­†ט¨˜ז¬„';
t['MNUL'] = 'ו·¦ו�´י�¸ו–®';
t['STAT'] = 'חµ±ט¨ˆ';
t['RESF'] = 'ט³‡ז÷�ח”°';
t['VLC'] = 'ו��י�®ה¸­ו¿ƒ';
t['MAPO'] = 'ו�°ו�–ט¨­ו®�';
t['COLO'] = 'י¡�ט‰²ט¨­ו®�';
t['DBGO'] = 'י™₪ט�²ט¨­ו®�';
t['4'] = 'ו¸‚ו ´';
t['5'] = 'י›†חµ�י»�/ו…µח‡�/ו·¥ו ´/י¦¬ו»„';
t['6'] = "ז�‘ז�ƒו ‚/ט‹±י›„ו®…/י�µו� /ח›”ח”²ו» ";
t['HEROSMANSION'] = "ט‹±י›„ו®…";
t['BLACKSMITH'] = "י�µו� ";
t['ARMOURY'] = "ח›”ח”²ו» ";
t['NOW'] = 'ח�¾ו�¨';
t['CLOSE'] = 'י—�י–‰';
t['USE'] = 'י€�ו‡÷';
t['USETHEM1H'] = 'ז´¾ו‡÷ז‰€ז�‰ו•†ה÷÷ (ט³‡ז÷�1ו°�ז™‚ח”¢י‡�)';
t['OVERVIEW'] = 'ז¦‚ט¦�';
t['FORUM'] = 'ט«–ו£‡';
t['ATTACKS'] = 'ז”»ז“�';
t['NEWS'] = 'ז–°ט��';
t['ADDCRTPAGE'] = 'ו� ו…¥ז­₪י �';
t['SCRPURL'] = 'TB ML&CN ו®˜ח¶²';
t['50'] = 'ט¨­ו®�"י�¸ו�–ו�µו¯�ט»�י��"ז™‚<br>י �ט¨­ז´¾ו‡÷ח�„ט»�י��ז•¸י‡�';
t['SPACER'] = 'וˆ†י�”ח·�';
t['53'] = 'ו�¨tooltipה¸­י¡¯ח₪÷ט»�י��ט³‡ז–™';
t['MEREO'] = 'ט¨�ז�¯ו’�ו ±ו‘�';
t['59'] = 'י �ו…ˆט¼‰ו…¥ח�„י �ז•¸<br> ט¨�ז�¯ו’�ו ±ו‘� ח�„י �י�¢ה¸­<br>(י �ט¨­ = 1, ז�€ו₪� = 5)';
t['ATTABLES'] = 'ט»�י��וˆ—ט¡¨';
t['MTW'] = 'זµ×ט²»ט² ט¼‰';
t['MTX'] = 'ט¶…ט¼‰י‡�';
t['MTC'] = 'ח›®ו‰�ח¸½ז�¬י�‹י‡�';
t['ALFL'] = 'י€£חµ�וˆ°ט‡×ט¨­ט�¯ח›�ט«–ו£‡<br>(ה¿�ח•™ח©÷ח™½ה¾†ה½¿ח”¨י �ט¨­ט�¯ח›�ט«–ו£‡)';
t['82.L'] = 'י�–ו®�ז›¸ח±₪ (י�±ט—� וˆ×י™₪, ח§»ה¸�, ח§»ה¸‹ח�„ו�–ח₪÷)';
t['MTCL'] = 'ו…¨יƒ¨ז¸…י™₪';
t['82.U'] = 'ט§£י�–ז›¸ח±₪ (י¡¯ח₪÷ וˆ×י™₪, ח§»ה¸�, ח§»ה¸‹ח�„ו�–ח₪÷)';
t['CKSORT'] = 'י»�ז“�ה¾†ז�’ו÷�';
t['MIN'] = 'ז�€ו°‘';
t['SVGL'] = 'וˆ†ה÷«ט¨˜י�„וˆ°ו…¶ה»–ז�‘ט��';
t['VGL'] = 'ז�‘ט��וˆ—ט¡¨';
t['12'] = "ו�¨ז�‘ט��ז—�י¡¯ח₪÷ 'dorf1.php'ו’�'dorf2.php'ח�„ו�–ח₪÷";
t['UPDATEPOP'] = 'ז›´ז–°ה÷÷ו�£';
t['54'] = 'ו�¨tooltipה¸­י¡¯ח₪÷ט·�י›¢ו’�ז™‚י–“';
t['EDIT'] = 'ח·¨ט¼¯';
t['NPCO'] = 'NPCה÷₪ז˜“י�¸י …';
t['26'] = 'י¡¯ח₪÷NPCה÷₪ז˜“ח�„י€£חµ�ו’�ט¨ˆח®—';
t['58'] = 'ו�¨ו�°ו�–י¡¯ח₪÷ ח�©ו®¶/ז�‘ט��/ח¶ ז´² ט¡¨ו–®';
t['NEWVILLAGEAV'] = 'ז—¥ז��/ז™‚י–“';
t['TIMEUNTIL'] = 'י�€ט¦�ח­‰ו¾…ח�„ז™‚י–“';
t['61'] = 'ו�¨ו ±ו‘�י �י�¢י¡¯ח₪÷ "ו…¨יƒ¨וˆ×י™₪" ט¡¨ו–®';
t['62'] = 'י¡¯ח₪÷ "ח™¼IGMחµ¦ט‡×ו·±" ח�„ו�–ח₪÷';
t['CENTERMAP'] = 'ו°‡ז�‘ט��ו�¨ו�°ו�–ח½®ה¸­';
t['13'] = "ו�¨ז�‘ט��ז—�י¡¯ח₪÷ 'ו�°ו�–ח½®ה¸­'ח�„ו�–ח₪÷";
t['SENDTROOPS'] = 'ז´¾י�£ט»�י��';
t['64'] = 'י¡¯ח₪÷ט©³ח´°זˆ°י¬¥חµ±ט¨ˆו ±ו‘�';
t['7'] = "ח�‡ו®®/ט¡�ו®®/ח ”ח©¶י™¢/ו¯¶ח‰©ו÷«";
t['PALACE'] = "ח�‡ו®®";
t['RESIDENCE'] = "ט¡�ו®®";
t['ACADEMY'] = "ח ”ח©¶י™¢";
t['TREASURY'] = "ו¯¶ח‰©ו÷«";
t['45'] = "י–ƒחˆ�י¡¯ח₪÷ז­£ו�¨ו�‡ח´�ח�„ו»÷ח¯‰";
t['14'] = "ו�¨ז�‘ט��ז—�י¡¯ח₪÷ 'י›†חµ�י»�/י�‹י€�ט³‡ז÷�'ח�„ו�–ח₪÷";
t['34'] = "ו�¨ו�‡ח´�ט¡¨ו–®י¡¯ח₪÷ ז–‡ז˜�י»�ט³‡ט¨�";
t['UPGTB'] = "ט³‡ז÷�ח”°/ו»÷ח¯‰ח‰©ו�‡ח´�ט¡¨ו–®";
t['35'] = "ו�¨ו�‡ח´�ט¡¨ו–®י¡¯ח₪÷ ח³§י£�ז¶ˆט€—";
t['16'] = "ו�¨ז�‘ט��ז—�י¡¯ח₪÷ ז�‰ז•ˆח³§ח”¢";
t['39'] = "י¡¯ח₪÷ט³‡ז÷�וˆ—ט¡¨ו–®";
t['34'] = "ו�¨ו�‡ח´�ט¡¨ו–®י¡¯ח₪÷ ז–‡ז˜�י»�ט³‡ט¨�";
t['UPGTB'] = "ט³‡ז÷�ח”°/ו»÷ח¯‰ח‰©ו�‡ח´�ט¡¨ו–®";
t['35'] = "ו�¨ו�‡ח´�ט¡¨ו–®י¡¯ח₪÷ ח³§י£�ז¶ˆט€—";
t['16'] = "ו�¨ז�‘ט��ז—�י¡¯ח₪÷ ז�‰ז•ˆח³§ח”¢";
t['RBTT'] = "ט³‡ז÷�וˆ—";
t['39'] = "י¡¯ח₪÷ט³‡ז÷�וˆ—ט¡¨ו–®";
t['40'] = "ו�¨זµ®ו‹•ט¦–ח×—י¡¯ח₪÷ט³‡ז÷�וˆ—ט¡¨ו–®";
t['21'] = "ו�¨זµ®ו‹•ט¦–ח×—י¡¯ח₪÷ז›¸ח±₪";
t['23'] = "ו�¨זµ®ו‹•ט¦–ח×—י¡¯ח₪÷ח­†ט¨˜ז¬„";
t['17'] = "ו�¨ז�‘ט��ז—�י¡¯ח₪÷ ז�‘ט��ה÷÷ו�£";
t['29'] = 'י�¸ו�–ו�°ו�–וˆ†ז��ח¶²ח«™';
t['30'] = 'ו�¨ח�©ו®¶ו��ח¨±ו�³ו�´י¡¯ח₪÷וˆ†ז��י€£חµ�';
t['31'] = 'ו�¨ט�¯ח›�ו��ח¨±ו�³ו�´י¡¯ח₪÷וˆ†ז��י€£חµ�';
t['63'] = 'י¡¯ח₪÷ו¼·ו�–ח�„זˆ°י¬¥ו ±ו‘�';
t['18'] = 'ו�¨זµ®ו‹•ט¦–ח×—י¡¯ח₪÷י¡�ו₪–ח�„ז�‘ט��וˆ—ט¡¨(ו…©וˆ—ז�’ו÷�)';
t['60'] = 'י¡¯ח₪÷ה»¥ו½ˆו‡÷ט¦–ח×—ז–¹ו¼�ט®€ו�–IGMח�„י€£חµ�';
t['3'] = 'ה¿®ז­£ו�₪ח¾…י¦¬ז­¥ו…µו��ז–¹י™£ו…µח�„ט² ט¼‰י‡�<br>(וƒ…י�©ח”¨ז–¼ז··ו�ˆ T3.1 & T3.5 ח�„ה¼÷ז��ו™¨)';
t['18'] = 'ו�¨זµ®ו‹•ט¦–ח×—י¡¯ח₪÷י¡�ו₪–ח�„ז�‘ט��וˆ—ט¡¨(ו…©וˆ—ז�’ו÷�)';
t['60'] = 'י¡¯ח₪÷ה»¥ו½ˆו‡÷ט¦–ח×—ז–¹ו¼�ט®€ו�–IGMח�„י€£חµ�';
t['42'] = 'ו�¨ו�‡ח´�ט¡¨ו–®י¡¯ח₪÷ ה»¥ו»÷ח¯‰ו��ח¨±ז�’ו÷�ח�„ט¡¨ו–®';
t['19'] = 'ו�¨ז�‘ט��ז—�י¡¯ח₪÷ ו»÷י€ ה¸­ו»÷ח¯‰ו’�ט»�י��ח§»ו‹•ח�„ט¨�ז�¯';
t['32'] = "י¡¯ח₪÷ 'ז��ו°‹וˆ—'";
t['33'] = "ו�¨זµ®ו‹•ט¦–ח×—י¡¯ח₪÷ז��ו°‹וˆ—";
t['36'] = "ו�¨ו�‡ח´�ט¡¨ו–®י¡¯ח₪÷ ו»÷י€ ז™‚ו·²ו­˜ט³‡ז÷�ו��ו»÷י€ ו¾�ו‰©י₪˜ט³‡ז÷�";
t['RESIDUE'] = 'ו»÷י€ ו¾�ו‰©י₪˜ט³‡ז÷�';
t['RESOURCES'] = 'ו»÷י€ ז™‚ו·²ו­˜ט³‡ז÷�';
t['2'] = 'ח§»י™₪ו»£ו‘�וˆ—';
t['SH1'] = "י»�ז“�ח�©ו®¶ט³‡ז–™י€£חµ�ה»¥ו�–ו¾—י¦–יƒ½ח›¸י—�ט³‡ז–™<br>ז�¥ט‘—ו»÷י€ זˆ–י»�ז“�ו…µח‡�ה»¥ו�µז¸¬ח¨®ז—�ן¼�ח„¶ו¾�ו†�י–‹ו•�ז�‘ט��ו₪§ז¨“ד€‚";
t['46'] = "י¡¯ח₪÷ז¯�ח­†ז�µי�”ו•†ה÷÷ח�„י¡�ו₪–ט©³ח´°ט³‡ט¨�";
t['15'] = "ו�¨ז�‘ט��ז—�י¡¯ח₪÷ ז�¨ז��ד€�ח£�ו¡�ד€�י‹¼י�µח�„ז¯�ו°�ז™‚ח”¢י‡�";
t['11'] = "ו¼µט²¼זˆ°י¬¥ו ±ו‘�ח�„ח¶²ח«™י€£חµ�";
break;
case "cn"://by ח‹¬ט‡×ח–¯ח‹‚ & congxz6688
//avRace = ['ח½—י©¬ה÷÷', 'ז—¥ו°”ז›¼ה÷÷', 'י«˜ו�¢ה÷÷'];
t['8'] = 'ט�”ח›�';
t['SIM'] = 'זˆ˜ז–—ז¨¡ז‹�ו™¨';
t['QSURE'] = 'ה½ ח¡®ו®�ו�—?';
t['LOSS'] = 'ז��ו₪±';
t['PROFIT'] = 'ט�·ח›�';
t['EXTAV'] = 'ו�¯ה»¥ו�‡ח÷§!';
t['PLAYER'] = 'ח�©ו®¶';
t['VILLAGE'] = 'ז�‘ו÷„';
t['POPULATION'] = 'ה÷÷ו�£';
t['COORDS'] = 'ו��ז ‡';
t['MAPTBACTS'] = 'ט¡�ו�¨';
t['SAVED'] = 'ו·²ה¿�ו­˜';
t['YOUNEED'] = 'ז‚¨ט¦�';
t['TODAY'] = 'ה»�ו₪©';
t['TOMORROW'] = 'ז˜�ו₪©';
t['DAYAFTERTOM'] = 'ו��ו₪©';
t['MARKET'] = 'ו¸‚ו�÷';
t['BARRACKS'] = 'ו…µט�¥';
t['RAP'] = 'י›†ח»“ח‚¹';
t['STABLE'] = 'י©¬ו�©';
t['WORKSHOP'] = 'ו·¥ו�÷';
t['SENDRES'] = 'ט¿�י€�טµ„ז÷�';
t['BUY'] = 'ה¹°';
t['SELL'] = 'ו�–';
t['SENDIGM'] = 'ו�‘י€�IGM';
t['LISTO'] = 'י�€ט¦�ח­‰וˆ°';
t['ON'] = '-';
t['AT'] = '-';
t['EFICIENCIA'] = 'ז•ˆח�‡';
t['NEVER'] = 'ה»“ה½�ה¸�ט¶³ן¼�ז— ז³•ו®�ח�°';
t['ALDEAS'] = 'ז�‘ו÷„';
t['TIEMPO'] = 'ז—¶י—´';
t['OFREZCO'] = 'ז��ה¾›';
t['BUSCO'] = 'ז��ח´¢';
t['TIPO'] = 'ז¯”ה¾‹';
t['DISPONIBLE'] = 'ו¿½ח•¥ט¿‡ו°‘ח‰©טµ„';
t['CUALQUIERA'] = 'ז‰€ז�‰';
t['YES'] = 'ז˜¯';
t['NO'] = 'ו�¦';
t['LOGIN'] = 'ח™»ו…¥';
t['MARCADORES'] = 'ה¹¦ח­¾';
t['ANYADIR'] = 'ו� ו…¥';
t['UBU'] = 'ז–°ה¹¦ח­¾ח½‘ו�€';
t['UBT'] = 'ז–°ה¹¦ח­¾ז ‡י¢˜(ו�×י™�ט‹±ז–‡ו��ז•°ו­—)';
t['MAXTIME'] = 'ז�€ו₪§ט¿�ט¾“ז—¶י—´';
t['DEL'] = 'וˆ י™₪';
t['MAPA'] = 'TravMap';
t['CHKSCRV'] = 'ז£€ז�¥ז›´ז–°';
t['ARCHIVE'] = 'ה¿�ו­˜';
t['SUMMARY'] = 'ז¦‚ט¦�';
t['TOTALTROOPS'] = 'ז­₪ז�‘ו÷„ח�„ו£«ו…µז€»ז•°';
t['SELECTALLTROOPS'] = "י€‰ז‹©ו…¨יƒ¨ו£«ו…µ";
t['SELECTSCOUT'] = "י€‰ז‹©ה¾¦ו¯�ו…µ";
t['SELECTFAKE'] = "י€‰ז‹©ה½¯ז”»";
t['TOTAL'] = "ז€»ז•°";
t['AVPPV'] = "ו¹³ו�‡ז¯�ז�‘ה÷÷ו�£";
t['AVPPP'] = "ו¹³ו�‡ז¯�ח�©ו®¶ה÷÷ו�£";
t['PARTY'] = "ז´»ו�¨";
t['CPPERDAY'] = "ז–‡ז˜�ח‚¹ן¼ˆז¯�ו₪©ן¼‰";
t['SLOT'] = "ז‰©ו¼ ";
t['TROPAS'] = 'ו†›י˜�';
t['AT2'] = 'ו¢�ז�´';
t['AT3'] = 'ז”»ו‡»ן¼�ז™®י€�';
t['AT4'] = 'ז”»ו‡»ן¼�ז�¢ו₪÷';
t['ALL'] = "ו…¨יƒ¨";
t['CHECKUPDATE'] = "ז­£ו�¨ז£€ז�¥ז�’ה»¶ז›´ז–°ן¼�ט¯·ח­‰ח­‰...";
t['NONEWVER'] = "ה½ ז­£ו�¨ה½¿ח”¨ז�€ז–°ח‰ˆז�¬";
t['24'] = 'ח¬”ט®°ז �ו₪§ו°�';
t['NBSA'] = 'ט‡×ו�¨';
t['NBSN'] = 'ז™®י€� (ח»†)';
t['NBSB'] = 'ו₪§ח”»י�¢ (ו₪§)';
t['25'] = 'ח¬”ט®°ז �י«˜ו÷¦';
t['NBHAX'] = 'י«˜ו÷¦ט‡×ו�¨ה¼¸ו±•';
t['NBHK'] = 'ו�÷ז�¬י«˜ו÷¦';
t['43'] = 'ז˜¾ח₪÷ו»÷ח­‘ח‰©ח­‰ח÷§';
t['NPCSAVETIME'] = 'טµ„ז÷�ז»¡ט¶³י�€ז—¶ן¼�';
t['38'] = 'ז˜¾ח₪÷טµ„ז÷�ח”°ח­‰ח÷§י¢�ט‰²';
t['44'] = 'ז˜¾ח₪÷ו»÷ח­‘ח‰©ח­‰ח÷§י¢�ט‰²';
t['69'] = "ז�§וˆ¶ו�°ז—¥ו¿—ח­‰ח÷§<br>ו�×י€‚ח”¨ה÷�ח¨‹ו÷�ו¼€ו�‘ו‘˜ זˆ– BUGט°ƒט¯•<br>(י»˜ט®₪ = 0 or ח©÷ח™½)";
t['48'] = "י¡µז•°י¢„ו…ˆו� ט½½<br>ו�¨ 'ו¸‚ו�÷ => ה¹°ו…¥' י¡µי�¢ה¸­<br>(י»˜ט®₪ = 1 זˆ– ח©÷ח™½; ז�€ו₪� = 5)";
t['65'] = 'ו·²ו�¯ו�‡ח÷§ח�„י¢�ט‰²<br>(י»˜ט®₪ = ח©÷ח™½)';
t['66'] = 'ו·²ט¾¾ז�€י«˜ח­‰ח÷§ח�„י¢�ט‰²<br>(י»˜ט®₪ = ח©÷ח™½)';
t['67'] = 'ה¸�ו�¯ו�‡ח÷§ח�„י¢�ט‰²<br>(י»˜ט®₪ = ח©÷ח™½)';
t['68'] = 'ו�¯וˆ©ח”¨npcה÷₪ז˜“ז�¥ו�‡ח÷§ח�„י¢�ט‰²<br>(י»˜ט®₪ = ח©÷ח™½)';
t['20'] = 'ז˜¾ח₪÷ה¹¦ח­¾';
t['U.2'] = 'ח§�ז—�';
t['1'] = "Travian v2.x ז��ו�¡ו™¨";
t['U.3'] = 'ה¸»ז�‘ו��ח§°<br>ט¯·זµ�ט§ˆט‡×ו·±ח�„ה¸×ה÷÷טµ„ז–™ז�¥ט¿›ט¡�ט‡×ו�¨ז›´ז–°ן¼�ה¸�ט¦�ט‡×ו·±ה¿®ז”¹ז­₪ז �';
t['U.6'] = 'ה¸»ז�‘ו��ז ‡<br>ט¯·זµ�ט§ˆט‡×ו·±ח�„ה¸×ה÷÷טµ„ז–™ז�¥ט¿›ט¡�ט‡×ו�¨ז›´ז–°ן¼�ה¸�ט¦�ט‡×ו·±ה¿®ז”¹ז­₪ז �';
t['MAX'] = 'ז�€ו₪�';
t['CROPFINDER'] = "ז‰¾ח”°ו�©ז‰‹";
t['VENTAS'] = 'ו�–ו‡÷ח÷×ו½•';
t['SAVE'] = 'ה¿�ו­˜';
t['49'] = 'י›†ח»“ח‚¹ח�„י»˜ט®₪ט¡�ו�¨';
t['BIC'] = 'ז˜¾ח₪÷ז›´ו₪�ו¿«ז�·ו›¾ז ‡';
t['22'] = 'ז˜¾ח₪÷ח¬”ט®°ז �';
t['SOREP'] = "ז˜¾ח₪÷ו��ו§‹ז�¥ו‘�";
t['56'] = "ו½“י¼ ז ‡ח§»וˆ°ז—¶<br>ז˜¾ח₪÷ז�‘ו÷„ח§�ח±»זˆ–ח»¿ז´²ז•°ז�®";
t['10'] = "ו·¦ט¾¹י€‰ו�•ח�„זˆ˜ז–—ז¨¡ז‹�ו™¨י“¾ז�¥";
t['WSIMO1'] = "ו†…ח½® (ח”±ז¸¸זˆ�ז‰€ז��ה¾›)";
t['WSIMO2'] = "ו₪–יƒ¨ (ח”±kirilloid.ruז��ה¾›)";
t['27'] = "ז‰€י€‰ח”¨ח�„ה¸–ח•�וˆ†ז��";
t['28'] = "ו�¨ח�©ו®¶ו��ח§°ו�³ט¾¹ז˜¾ח₪÷וˆ†ז��י“¾ז�¥";
t['37'] = "ז˜¾ח₪÷טµ„ז÷�ח”°ו�‡ח÷§ה¿¡ז�¯";
t['41'] = "ז˜¾ח₪÷ו»÷ח­‘ח‰©ו�‡ח÷§ה¿¡ז�¯";
t['SH2'] = "ו�¨ו­—ז®µה¸­ן¼�ה½ ו�¯ט¾“ו…¥ן¼�<br>- green זˆ– red זˆ– orange, ח­‰ח­‰...<br>- ה¹�ו�¯ט¾“ו…¥י¢�ט‰²ח�„16ט¿›וˆ¶ח �ן¼�ו¦‚ #004523<br>- ה¹�ו�¯ה»¥ה»€ה¹ˆה¹�ה¸�ו¡«ז�¥ח”¨י»˜ט®₪י¢�ט‰²";
t['NVERAV'] = "ו·²ז�‰ז–°ח‰ˆז�¬ז�’ה»¶ז�¨ו‡÷ה÷†ן¼�";
t['UPDSCR'] = "ט¦�ט¿›ט¡�ז›´ז–°ו�—ן¼�";
t['MAPSCAN'] = 'ז‰«ז��ז­₪ו�°ו›¾';
t['TOTTRTR'] = 'ז‰€ז�‰ז­£ו�¨ט®­ח»ƒח�„ו£«ו…µ';
t['57'] = 'ז˜¾ח₪÷ט·�ח¦»ו��ז—¶י—´';
t['9'] = "ו�¨ו·¦ט¾¹ח�„י€‰ו�•ז˜¾ח₪÷ז›´ו₪�י“¾ז�¥<br>(Travilog,Traviantoolbox,TravMap,World Analyserח­‰ח­‰.)";
t['TB3SL'] = 'TBט®¾ח½®';
t['UPDALLV'] = 'ז›´ז–°ז‰€ז�‰ז�‘ו÷„ד€‚(ז�‰ו�¯טƒ½ו¯¼ט‡´ט´¦ו�·ט¢«י”�)';
t['LARGEMAP'] = 'ו₪§ו�°ו›¾';
t['USETHEMPR'] = 'ז´¾ו‡÷ז‰€ז�‰ו•†ה÷÷ (ז�‰טµ„ז÷�ז¯”ה¾‹וˆ†י…�)';
t['USETHEMEQ'] = 'ז´¾ו‡÷ז‰€ז�‰ו•†ה÷÷ (ו¹³ו�‡וˆ†י…�)';
t['TOWNHALL'] = 'ו¸‚ז”¿ו�…';
t['GSRVT'] = 'ז¸¸זˆ�ז��ו�¡ו™¨';
t['ACCINFO'] = 'ה¸×ה÷÷טµ„ז–™';
t['NBO'] = 'ח¬”ט®°ז �';
t['MNUL'] = 'ו·¦ט¾¹י€‰ו�•';
t['STAT'] = 'ח»�ט®¡';
t['RESF'] = 'ז�‘ט�½ז¦‚ט²�';
t['VLC'] = 'ז�‘ו÷„ה¸­ו¿ƒ';
t['MAPO'] = 'ו�°ו›¾ט®¾ו®�';
t['COLO'] = 'י¢�ט‰²ט®¾ו®�';
t['DBGO'] = 'ט°ƒט¯•ט®¾ו®�';
t['4'] = 'ו¸‚ו�÷';
t['5'] = 'י›†ח»“ח‚¹/ו…µט�¥/י©¬ו�©/ו·¥ו�÷';
t['6'] = "ו¸‚ז”¿ו�…/ט‹±י›„ו›­/י“�ו� י“÷/ו†›ז¢°ו÷“";
t['HEROSMANSION'] = "ט‹±י›„ו›­";
t['BLACKSMITH'] = "י“�ו� י“÷";
t['ARMOURY'] = "ו†›ז¢°ו÷“";
t['NOW'] = 'ח�°ו�¨';
t['CLOSE'] = 'ו…³י—­';
t['USE'] = 'י€�ו‡÷';
t['USETHEM1H'] = 'ז´¾ו‡÷ז‰€ז�‰ו•†ה÷÷ (טµ„ז÷�1ו°�ז—¶ה÷§י‡�)';
t['OVERVIEW'] = 'ז¦‚ט¦�';
t['FORUM'] = 'ט®÷ו�›';
t['ATTACKS'] = 'ז”»ו‡»';
t['NEWS'] = 'ז–°י—»';
t['ADDCRTPAGE'] = 'ו� ו…¥ז�¬י¡µ';
t['SCRPURL'] = 'TBט„�ז�¬ז”¯ז��';
t['ACTUALIZAR'] = 'ז›´ז–°ז­₪ז�‘ו÷„ח�„ז•°ז�®';
t['50'] = 'וˆ©ח”¨"י€‰ז‹©ה¾¦ו¯�ו…µ"ז—¶<br>ז‰€ז´¾ו‡÷ה¾¦ו¯�ו…µח�„ז•°י‡�';
t['SPACER'] = 'וˆ†י�”ח÷¿';
t['53'] = 'ו¿«י€�ז˜¾ח₪÷ו£«ו…µז•°ז�®';
t['MEREO'] = 'ט®¯ז�¯&ז�¥ו‘�';
t['59'] = 'ו�¨ט®¯ז�¯ו’�ז�¥ו‘�ח�„י¡µי�¢ה¸­<br>י¢„ו…ˆו� ט½½ח�„י¡µז•°<br>(י»˜ט®₪ = 1 זˆ– ח©÷ח™½; ז�€ו₪� = 5)';
t['ATTABLES'] = 'ו†›י˜�ח�„וˆ—ט¡¨';
t['MTW'] = 'זµ×ט´¹ט´�ט½½';
t['MTX'] = 'ט¶…ט½½י‡�';
t['MTC'] = 'ח�°ז—¶ז€»ז�¬ט¿�ז•°';
t['ALFL'] = 'י“¾ז�¥וˆ°ו₪–ח½®ט®÷ו�›<br>(ח•™ח©÷ז�¥ה½¿ח”¨ו†…ח½®ט®÷ו�›)';
t['82.L'] = 'י”�ו®�ה¹¦ח­¾ (י��ט—� וˆ י™₪, ח§»ה¸�, ח§»ה¸‹ח�„ו›¾ח₪÷)';
t['MTCL'] = 'ו…¨יƒ¨ז¸…י™₪';
t['82.U'] = 'ט§£י”�ה¹¦ח­¾ (ז˜¾ח₪÷ וˆ י™₪, ח§»ה¸�, ח§»ה¸‹ח�„ו›¾ח₪÷)';
t['CKSORT'] = 'ח‚¹ו‡»ז�¥ז�’ו÷�';
t['MIN'] = 'ז�€ו°‘';
t['SVGL'] = 'וˆ†ה÷«ט®°ו½•וˆ°ו…¶ז�‘ו÷„';
t['VGL'] = 'ז�‘ו÷„וˆ—ט¡¨';
t['12'] = "ז˜¾ח₪÷'dorf1.php'ו’�'dorf2.php'ח�„י“¾ז�¥";
t['UPDATEPOP'] = 'ז›´ז–°ה÷÷ו�£ז•°ז�®';
t['54'] = 'ו�¨tooltipה¸­ז˜¾ח₪÷ט·�ח¦»ו’�ז—¶י—´';
t['EDIT'] = 'ה¿®ז”¹';
t['NPCO'] = 'NPCה÷₪ז˜“י€‰י¡¹';
t['26'] = 'ז˜¾ח₪÷NPCה÷₪ז˜“ח�„י“¾ז�¥ו’�ט®¡ח®—';
t['NEWVILLAGEAV'] = 'ז—¥ז��';
t['TIMEUNTIL'] = 'י�€ט¦�ח­‰ו¾…ח�„ז—¶י—´';
t['58'] = 'ו�¨"karte.php"ז˜¾ח₪÷ ח�©ו®¶/ז�‘ו÷„/ח»¿ז´² ה¿¡ז�¯';
t['61'] = 'ו�¨ז�¥ו‘�י¡µי�¢ז˜¾ח₪÷ "ו…¨וˆ י™₪"ח�„י€‰י¡¹';
t['62'] = 'ז˜¾ח₪÷ ו�‘IGMח»™ט‡×ו·±ח�„ו›¾ח₪÷';
t['CENTERMAP'] = 'ז­₪ז�‘ו÷„ו±…ה¸­ח�„ו�°ו›¾';
t['13'] = 'ו�¨ז�‘ו÷„ז—� ז˜¾ח₪÷ "ו±…ה¸­ו�°ו›¾"ח�„ו›¾ח₪÷';
t['SENDTROOPS'] = 'ו‡÷ו…µ';
t['64'] = 'ז˜¾ח₪÷זˆ˜ז�¥ח�„ט¯¦ח»†ז•°ז�®';
t['7'] = "ח�‡ו®«/ט¡�ו®«/ח ”ו�‘ז‰€/ו®�ו÷“";
t['PALACE'] = "ח�‡ו®«";
t['RESIDENCE'] = "ט¡�ו®«";
t['ACADEMY'] = "ח ”ו�‘ז‰€";
t['TREASURY'] = "ו®�ו÷“";
t['45'] = "י—×חƒ�ז˜¾ח₪÷ז­£ו�¨ו�‡ח÷§ח�„ו»÷ח­‘ח‰©ח­‰ח÷§";
t['14'] = "ו�¨ז�‘ו÷„ז—�ז˜¾ח₪÷'ו�‘ו…µ/ט¿�י€�טµ„ז÷�'ח�„ו›¾ח₪÷";
t['34'] = "ו�¨ו�‡ח÷§ה¿¡ז�¯ה¸­ז˜¾ח₪÷ז–‡ז˜�ו÷¦ו�˜ו�–";
t['UPGTB'] = "טµ„ז÷�ח”°ו’�ו»÷ח­‘ח‰©ח�„ו�‡ח÷§ה¿¡ז�¯ט¡¨";
t['35'] = "ו�¨ו�‡ח÷§ה¿¡ז�¯ה¸­ז˜¾ח₪÷ח²®ט€—ו�˜ו�–";
t['16'] = "ו�¨ז�‘ו÷„ז—�ז˜¾ח₪÷ח²®ה÷§ה½™י¢�";
t['RBTT'] = "ה»“ה½�ח»�ט®¡ט¡¨";
t['39'] = "ז˜¾ח₪÷ה»“ה½�ח»�ט®¡ט¡¨";
t['40'] = "ו�¨ז‚¬זµ®ח×—ז˜¾ח₪÷ה»“ה½�ח»�ט®¡ט¡¨";
t['21'] = "ו�¨ז‚¬זµ®ח×—ז˜¾ח₪÷ט‡×ו®�ה¹‰ה¹¦ח­¾";
t['23'] = "ו�¨ז‚¬זµ®ח×—ז˜¾ח₪÷ח¬”ט®°ז �";
t['17'] = "ו�¨ז�‘ו÷„ז—�ז˜¾ח₪÷ז�‘ו÷„ה÷÷ו�£";
t['29'] = 'י€‰ו�–ו�°ו›¾וˆ†ז��ח½‘ח«™';
t['30'] = 'ו�¨ח�©ו®¶ו��ח§°ו�³ה¾§ז˜¾ח₪÷וˆ†ז��י“¾ז�¥';
t['31'] = 'ו�¨ט�”ח›�ו��ח§°ו�³ה¾§ז˜¾ח₪÷וˆ†ז��י“¾ז�¥';
t['3'] = 'ה¿®ז­£ו�₪ח½—י©¬ז­¥ו…µו��ז–¹י˜µו…µח�„ט´�ט½½י‡�ן¼ˆה»…י€‚ח”¨ה÷�יƒ¨וˆ†ו¾·ז��ן¼‰';
t['18'] = 'ו�¨ז‚¬זµ®ח×—ז˜¾ח₪÷י¢�ו₪–ח�„ז�‘ו÷„וˆ—ט¡¨ן¼ˆה¸₪וˆ—ן¼�ה¾¿ה÷�ו₪�ז�‘וˆ‡ז�¢ן¼‰';
t['63'] = 'ז˜¾ח₪÷TB3ח�„ו¼÷ו�–זˆ˜ז�¥ה¿¡ז�¯';
t['60'] = 'ה½¿ח”¨ו¼¹ו‡÷ח×—ו�£ז˜¾ח₪÷ז�¥ו‘�ו’�ז¶ˆז�¯';
t['42'] = 'ז�‰ו��ח§°ז�’וˆ—ו»÷ח­‘ו�‡ח÷§ט¡¨ן¼ˆז�‰ט‹±ז–‡ן¼‰';
t['19'] = 'ו�¨ז�‘ו÷„וˆ—ט¡¨ה¸­ז˜¾ח₪÷ו�‡ח÷§ד€�ו»÷י€ ו��יƒ¨י˜�ח§»ו�¨ח�„ה¿¡ז�¯';
t['32'] = 'ז˜¾ח₪÷ז��ח´¢ז�¡';
t['33'] =  "ו�¨ז‚¬זµ®ח×—ה¸­ז˜¾ח₪÷ז��ח´¢ז�¡";
t['36'] = "ו�¨ו�‡ח÷§וˆ—ט¡¨ה¸­ז˜¾ח₪÷ו·²ו­˜טµ„ז÷�ו��ו�‡ח÷§ו��ו‰©ה½™טµ„ז÷�";
t['RESIDUE'] = 'ו�‡ח÷§ו��ו‰©ה½™טµ„ז÷�';
t['RESOURCES'] = 'ו�‡ח÷§ז—¶ו·²ו­˜טµ„ז÷�';
t['2'] = 'ח§»י™₪ו¹¿ו‘�ו¹¶ו›�ו₪�ז��ו�¡ו™¨ז—¶י—´';
t['46'] = "ט¿�ו�‘ז�¬ז�‘ח�„טµ„ז÷�ו’�ו•†י˜�ז˜¾ח₪÷י™„ו� ה¿¡ז�¯";
break;
case "lt"://by Domas & Zrip & Vykintas
//avRace = ['romִ—nai', 'germanai', 'galai'];
t['8'] = 'Aljansas';
t['SIM'] = 'Mֵ«ֵ¡iֵ³ simuliat.';
t['QSURE'] = 'Tikrai paֵ¡alinti?';
t['LOSS'] = 'Nuostoliai';
t['PROFIT'] = 'Pelnas';
t['EXTAV'] = 'Galima kelti lygִ¯';
t['PLAYER'] = 'ֵ½aidִ—jas';
t['VILLAGE'] = 'Gyvenvietִ—s pavadinimas';
t['POPULATION'] = 'Populiacija';
t['COORDS'] = 'Koordinatִ—s';
t['MAPTBACTS'] = 'Veiksmai';
t['SAVED'] = 'Iֵ¡saugota';
t['YOUNEED'] = 'Jums reikia';
t['TODAY'] = 'ֵ¡iandien';
t['TOMORROW'] = 'rytoj';
t['DAYAFTERTOM'] = 'poryt';
t['MARKET'] = 'Turgavietִ—';
t['BARRACKS'] = 'Kareivinִ—s';
t['RAP'] = 'Susibֵ«rimo vieta';
t['STABLE'] = 'Arklidִ—';
t['WORKSHOP'] = 'Dirbtuvִ—s';
t['SENDRES'] = 'Siֵ³sti resursus';
t['BUY'] = 'Pirkti';
t['SELL'] = 'Parduoti';
t['SENDIGM'] = 'Siֵ³sti ֵ¾inutִ™';
t['LISTO'] = 'Resursֵ³ bus';
t['ON'] = '';
t['AT'] = '';
t['EFICIENCIA'] = 'Efektyvumas';
t['NEVER'] = 'Niekada';
t['ALDEAS'] = 'Gyvenvietִ—(-s)';
t['TIEMPO'] = 'Laikas';
t['OFREZCO'] = 'Siֵ«loma';
t['BUSCO'] = 'Ieֵ¡koma';
t['TIPO'] = 'Santykis';
t['DISPONIBLE'] = 'Tik ִ¯manomi';
t['CUALQUIERA'] = 'Nesvarbu';
t['YES'] = 'Taip';
t['NO'] = 'Ne';
t['LOGIN'] = 'Prisijungti';
t['MARCADORES'] = 'ֵ½ymos';
t['ANYADIR'] = 'Pridִ—ti';
t['UBU'] = 'Nauja URL nuoroda';
t['UBT'] = 'Nauja tekstinִ— nuoroda';
t['DEL'] = 'Iֵ¡trinti';
t['MAPA'] = 'ֵ½emִ—lapis';
t['MAXTIME'] = 'Gabenimo laikas (iki)';
t['ARCHIVE'] = 'Archyvas';
t['SUMMARY'] = 'Santrauka';
t['LARGEMAP'] = 'Didelis ֵ¾emִ—lapis';
t['TROPAS'] = 'Kariai';
t['CHKSCRV'] = 'Atnaujinti TB';
t['ACTUALIZAR'] = 'Atnaujinti gyvenvietִ—s informacijִ…';
t['VENTAS'] = 'Iֵ¡saugoti pasiֵ«lymai';
t['MAPSCAN'] = 'Skanuoti ֵ¾emִ—lapִ¯';
t['BIC'] = 'Iֵ¡plִ—sti narֵ¡ymo juostִ…';
t['22'] = 'Rodyti uֵ¾raֵ¡ֵ³ knygelִ™';
t['SAVE'] = 'Iֵ¡saugoti';
t['49'] = 'Susibֵ«rimo vietos pagrindinis veiksmas';
t['AT2'] = 'Pastiprinimas';
t['AT3'] = 'Puolimas: ataka';
t['AT4'] = 'Puolimas: reidas';
t['24'] = 'Uֵ¾raֵ¡ֵ³ knygelִ—s dydis';
t['NBSA'] = 'Automatinis';
t['NBSN'] = 'Normalus (maֵ¾a)';
t['NBSB'] = 'Dideliems ekranams (didelִ—)';
t['25'] = 'Uֵ¾raֵ¡ֵ³ knygelִ—s aukֵ¡tis';
t['NBHAX'] = 'Automatiֵ¡kai iֵ¡sipleִ�ianti';
t['NBHK'] = 'Fiksuoto dydֵ¾io';
t['43'] = 'Rodyti gyvenvietִ—s centro lygius';
t['NPCSAVETIME'] = 'Bus sukaupta po: ';
t['38'] = 'Rodyti resursֵ³ lygiֵ³ spalvas';
t['65'] = 'Galimo lygio kִ—limo spalva<br>(Tuֵ¡ִ�ia = pradinִ—)';
t['66'] = 'Aukֵ¡ִ�iausio lygio spalva<br>(Tuֵ¡ִ�ia = pradinִ—)';
t['67'] = 'Negalimo lygio kִ—limo spalva<br>(Tuֵ¡ִ�ia = pradinִ—)';
t['68'] = 'Galimo lygio kִ—limo per NPC prekeivִ¯ spalva<br>(Tuֵ¡ִ�ia = pradinִ—)';
t['TOTALTROOPS'] = 'Visi gyvenvietִ—s kariai';
t['20'] = 'Rodyti ֵ¾ymas';
t['U.2'] = 'Gentis';
t['1'] = "Travian v2.x serveris";
t['28'] = "Rodyti statistikos nuorodas";
t['SELECTALLTROOPS'] = "Pasirinkti visus karius";
t['44'] = 'Rodyti pastatֵ³ lygiֵ³ spalvas';
t['PARTY'] = "Taֵ¡kai";
t['CPPERDAY'] = "KT per dienִ…";
t['SLOT'] = "Vietos";
t['TOTAL'] = "Iֵ¡ viso";
t['SELECTSCOUT'] = "Pasirinkti ֵ¾valgus";
t['SELECTFAKE'] = "Pasirinkti netikrִ… atakִ…";
t['NOSCOUT2FAKE'] = "Netikram puolimui negalima naudoti ֵ¾valgֵ³!";
t['NOTROOP2FAKE'] = "Netikram puolimui nִ—ra kariֵ³!";
t['NOTROOP2SCOUT'] = "ֵ ioje gyvenvietִ—je nִ—ra ֵ¾valgֵ³!";
t['NOTROOPS'] = "ֵ ioje gyvenvietִ—je nִ—ra kariֵ³!";
t['ALL'] = "Visi";
t['SH2'] = "Spalvֵ³ laukuose galite ִ¯vesti:<br>- green arba red arba orange, ir t.t.<br>- taip pat HEX spalvֵ³ kodִ…, pvz.: #004523<br>- jei norite palikti standartinִ™ spalvִ…, laukelִ¯ palikite tuֵ¡ִ�iִ…";
t['SOREP'] = "Rodyti originaliִ… ataskaitִ… (kopijavimui)";
t['56'] = "Rodyti laukֵ³/oaziֵ³ informacijִ…,<br>kai pelִ— rodo ִ¯ ֵ¾emִ—lapio laukelִ¯";
t['10'] = "Naudojama nuoroda kovos simuliatoriui:<br>(kairiajame meniu)";
t['WSIMO1'] = "Vidinִ— (siֵ«loma ֵ¾aidimo)";
t['WSIMO2'] = "Iֵ¡orinִ— (siֵ«loma kirilloid.ru)";
t['27'] = "Naudojamas statistikos tiekִ—jas";
t['28'] = "Rodyti statistikos nuorodas";
t['NONEWVER'] = "Jֵ«s turite naujausiִ… versijִ…";
t['BVER'] = "Jֵ«s galite turִ—ti beta versijִ…";
t['NVERAV'] = 'Dabartinִ— versija';
t['UPDSCR'] = "Atnaujinti dabar?";
t['CHECKUPDATE'] = "Ieֵ¡koma atnaujinimֵ³.<br>Praֵ¡ome palaukti...";
t['CROPFINDER'] = "Crop Finder";
t['AVPPV'] = "Gyventojֵ³ vidurkis gyvenvietei";
t['AVPPP'] = "Gyventojֵ³ vidurkis ֵ¾aidִ—jui";
t['37'] = "Rodyti resursֵ³ laukֵ³ lygiֵ³ kִ—limo lentelִ™";
t['41'] = "Rodyti pastatֵ³ lygiֵ³ kִ—limo lentelִ™";
t['69'] = "Konsolִ—s registro lygis<br>TIK PROGRAMUOTOJAMS ARBA KLAIDֵ² PAIEֵ KAI<br>(Numatyta = 0)";
t['48'] = "Pasiֵ«lymֵ³ puslapiֵ³ skaiִ�ius uֵ¾krovimui<br>esant puslapyje 'Turgavietִ— => Pirkti'<br>(Numatyta = 1)";
t['U.3'] = 'Jֵ«sֵ³ sostinִ—s pavadinimas';
t['U.6'] = 'Jֵ«sֵ³ sostinִ—s koordinatִ—s';
t['MAX'] = 'Daugiausiai';
t['TOTTRTR'] = 'Iֵ¡ viso treniruojamֵ³ kariֵ³';
t['57'] = 'Rodyti atstumִ… ir laikִ…';
t['TB3SL'] = TB3O.shN + ' nustatymai';
t['UPDALLV'] = 'Atnaujinti visas gyvenvietes.  NAUDOTI ITIN ATSARGIAI, NES Dִ–L TO GALI Bֵ×TITE Bֵ×TI Uֵ½BLOKUOTAS !';
t['9'] = "Rodyti papildomas nuorodas kairiajame meniu<br>(Traviantoolbox, World Analyser, Travilog, ֵ¾emִ—lapis ir t.t.)";
t['LARGEMAP'] = 'Didelis ֵ¾emִ—lapis';
t['USETHEMPR'] = 'Naudoti (proporcingai)';
t['USETHEMEQ'] = 'Naudoti (lygiai)';
t['TOWNHALL'] = 'Rotuֵ¡ִ—';
t['GSRVT'] = 'ֵ½aidimo serveris';
t['ACCINFO'] = 'Registracijos informacija';
t['NBO'] = 'Uֵ¾raֵ¡inִ—';
t['MNUL'] = 'Meniu kairִ—je pusִ—je';
t['STAT'] = 'Statistika';
t['RESF'] = 'Resursֵ³ laukai';
t['VLC'] = 'Gyvenvietִ—s centras';
t['MAPO'] = 'ֵ½emִ—lapio parinktys';
t['COLO'] = 'Spalvֵ³ parinktys';
t['DBGO'] = "Debug'inimo parinktys";
t['4'] = 'Turgavietִ—';
t['5'] = 'Susibֵ«rimo vieta/Kareivinִ—s/Dirbtuvִ—s/Arklidִ—';
t['6'] = "Rotuֵ¡ִ—/Karֵ¾ygio namai/ֵ arvֵ³ kalvִ—/Ginklֵ³ kalvִ—";
t['HEROSMANSION'] = "Karֵ¾ygio namai";
t['BLACKSMITH'] = 'Ginklֵ³ kalvִ—';
t['ARMOURY'] = 'ֵ arvֵ³ kalvִ—';
t['NOW'] = 'Dabar';
t['CLOSE'] = 'Atֵ¡aukti';
t['USE'] = 'Naudoti';
t['USETHEM1H'] = 'Naudoti (1 valandos produkcija)';
t['OVERVIEW'] = 'Apֵ¾valga';
t['FORUM'] = 'Forumas';
t['ATTACKS'] = 'Puolimai';
t['NEWS'] = 'Naujienos';
t['ADDCRTPAGE'] = 'Pridִ—ti ֵ¡ִ¯ puslapִ¯';
t['SCRPURL'] = 'TB puslapis';
t['50'] = 'ֵ½valgֵ³ kiekis<br>Funkcijai "Pasirinkti ֵ¾valgus"';
t['SPACER'] = 'Pridִ—ti skirtukִ…';
t['53'] = 'Praneֵ¡imֵ³ lentelִ—je rodyti kariֵ³ informacijִ…';
t['MEREO'] = 'Praneֵ¡imai ir ataskaitos';
t['59'] = 'Uֵ¾kraunamֵ³ praneֵ¡imֵ³/ataskaitֵ³ puslapiֵ³ skaiִ�ius<br>(Numatyta = 1)';
t['ATTABLES'] = 'Kariֵ³ lentelִ—';
t['MTW'] = 'Neiֵ¡naudota';
t['MTX'] = 'Virֵ¡yta';
t['MTC'] = 'Esamas pakrovimas';
t['ALFL'] = 'Nuoroda ִ¯ ִ¯ֵ¡orini forumִ…<br>(jei naudojate vidinִ¯, neraֵ¡ykite nieko)';
t['82.L'] = 'Fiksuoti ֵ¾ymas (nerodyti trynimo, perkִ—limo aukֵ¡tyn bei ֵ¾emyn ikonֵ³)';
t['MTCL'] = 'Viskִ… iֵ¡valyti';
t['82.U'] = 'Nefiksuoti ֵ¾ymֵ³ (rodyti trynimo, perkִ—limo aukֵ¡tyn bei ֵ¾emyn ikonas)';
t['CKSORT'] = 'Rֵ«ֵ¡iuoti';
t['MIN'] = 'Maֵ¾iausiai';
t['SVGL'] = 'Visose gyvenvietִ—se';
t['VGL'] = 'Gyvenvieִ�iֵ³ sִ…raֵ¡as';
t['12'] = "Rodyti 'dorf1.php' ir 'dorf2.php' nuorodas";
t['UPDATEPOP'] = 'Atnaujinti populiacijִ…';
t['54'] = 'Atstumִ… ir laikus iki gyvenvietִ—s rodyti praneֵ¡imֵ³ lentelִ—je';
t['EDIT'] = 'Redaguoti';
t['NPCO'] = 'NPC asistentas';
t['26'] = 'Rodyti NPC asistento skaiִ�iavimus/nuorodas';
t['58'] = 'Rodyti ֵ¾aidִ—jֵ³/gyvenvieִ�iֵ³/oaziֵ³ lentelִ™';
t['NEWVILLAGEAV'] = 'Data/Laikas';
t['TIMEUNTIL'] = 'Laukimo laikas';
t['61'] = 'Rodyti "Trinti viskִ…" lentelִ™ ataskaitֵ³ puslapyje';
t['62'] = 'Rodyti "Siֵ³sti IGM" piktogramִ… ir man';
t['CENTERMAP'] = 'Centruoti ֵ¡iִ… gyvenvietִ™ ֵ¾emִ—lapyje';
t['13'] = 'Rodyti nuorodִ… "Centruoti ֵ¡iִ… gyvenvietִ™ ֵ¾emִ—lapyje"';
t['SENDTROOPS'] = 'Siֵ³sti karius';
t['64'] = 'Ataskaitֵ³ statistikoje rodyti detales';
t['7'] = "Valdomֵ³ rֵ«mai/Rezidencija/Akademija/Iֵ¾dinִ—";
t['PALACE'] = "Valdovֵ³ rֵ«mai";
t['RESIDENCE'] = "Rezidencija";
t['ACADEMY'] = "Akademija";
t['TREASURY'] = "Iֵ¾dinִ—";
t['45'] = "Rodyti mirksinִ�ius statomֵ³ pastatֵ³ lygius";
t['14'] = "Rodyti 'Siֵ³sti karius/Siֵ³sti resursus' nuorodas";
t['34'] = "Lygiֵ³ kִ—limo lentelִ—se rodyti KT per dienִ…";
t['UPGTB'] = "Resursֵ³ laukֵ³ ir pastatֵ³ lygiֵ³ kִ—limo lentelִ—s";
t['35'] = "Rodyti grֵ«dֵ³ sunaudojimִ…";
t['16'] = "Rodyti efektyviִ… grֵ«dֵ³ gamybִ…";
t['39'] = "Rodyti resursֵ³ lentelִ™";
t['RBTT'] = "Resursֵ³ lentelִ—";
t['60'] = 'Rodyti nuorodas laiֵ¡kֵ³ atidarymui iֵ¡kylanִ�iajame lange';
break;
case "ae"://by Dream1 & Me_TheKing & kaser15 & aatkco & ghooost
//avRace = ['״§�„״±�ˆ�…״§�†', '״§�„״¬״±�…״§�†', '״§�„״¥״÷״±���‚'];
t['0'] = "Script language"; //please, do not translate !!! translation will never be included into the script !
t['1'] = "Travian v2.x server";
t['2'] = "״¥״²״§�„״© ״§�„״¥״¹�„״§�†״§״×";
t['3'] = 'T3.1 ״­״³״§״¨ ״§�„״­�…�ˆ�„״© ״¬�†״¯�� ״£�ˆ�„ & ״§�„�ƒ״×��״¨״© <br> (�†״³״®״© ״×״±״§����״§�† T3.1 ״×״®״×�„�� ״¹�† T3.5 )';
t['4'] = '״§�„״³�ˆ�‚';
t['5'] = '�†�‚״·״© ״§�„״×״¬�…״¹ / ״§�„״«�ƒ�†״© / ״§�„�…״µ״§�†״¹ ״§�„״­״±״¨��״© / ״§�„״¥״³״·״¨�„';
t['6'] = "״§�„״¨�„״¯��״© / �‚״µ״± ״§�„״£״¨״·״§�„ / �…״³״×�ˆ״¯״¹ ״§�„״£״³�„״­״© / ״§�„״­״¯״§״¯";
t['7'] = "״§�„�‚״µ״± / ״§�„״³�ƒ�† / ״§�„״£�ƒ״§״¯���…��״© / ״§�„״®״²�†״©";
t['8'] = '״§�„״×״­״§�„��';
t['9'] = "״¥״¸�‡״§״± ״§�„״±�ˆ״§״¨״· ״§�„״¥״¶״§����״© ���� ״§�„�‚״§״¦�…״© ״§�„���…�†�‰ <br> (Traviantoolbox, World Analyser, Travilog, Map, �ˆ״÷��״±�‡.)";
t['10'] = "״×״÷����״± �†�ˆ״¹ �…״­״§�ƒ�� ״§�„�…״¹״±�ƒ״©: <br> (���� ״§�„�‚״§״¦�…״© ״§�„��״³״±�‰)";
t['11'] = "�ˆ״µ�„״© �„״§״³״×״®״¯״§�…�‡״§ �„�†״´״± ״§�„״×�‚״§״±��״±";
t['12'] = "״£״¸�‡״§״± ״±�ˆ״§״¨״· 'dorf1.php' �ˆ 'dorf2.php'";
t['13'] = ' ״¥״¸�‡״§״± ״£���‚�ˆ�†״© "״×�ˆ״³��״· �‡״°�‡ ״§�„�‚״±��״© ״¹�„�‰ ״§�„״®״±��״·״©';
t['14'] = "״¥״¸�‡״§״± '״¥״±״³״§�„ �‚�ˆ״§״× / ״£״±״³�„ ״§�„�…�ˆ״§״±״¯ '״§�„״±�…�ˆ״² ���� �‚״§״¦�…״© ״§�„�‚״±��״©";
t['15'] = "״¥״¸�‡״§״± ״§�„״®״´״¨ �ˆ״§�„״·���† �ˆ״§�„״­״¯��״¯ ״§�„״¥�†״×״§״¬ �„�ƒ�„ ״³״§״¹״© ���� �‚״§״¦�…״© ״§�„�‚״±��״©";
t['16'] = "״£״¸�‡״§״± ״£�†״×״§״¬ ״§�„�‚�…״­ ״¨״¬״§�†״¨ �ƒ�„ �‚״±��״©";
t['17'] = "״£״¸�‡״§״± ״¹״¯״¯ ״§�„״³�ƒ״§�† ״¨״¬״§�†״¨ �ƒ�„ �‚״±��״©";
t['18'] = "״£״¸�‡״§״± ״¹�…�ˆ״¯���† �„�‚״§״¦�…״© ״§�„�‚״±��״© ״¨״µ��״­״© ״¹״§״¦�…״©";
t['19'] = '״¹״±״¶ �…״¹�„�ˆ�…״§״× ״¹�† ״×�‚״¯�… ״×״·�ˆ��״± ״§�„�…״¨״§�†�� �ˆ״×״­״±�ƒ״§״× ״§�„�‚�ˆ״§״× ���� �‚״§״¦�…״© ״§�„�‚״±�‰';
t['20'] = '״£״¸�‡״§״± ״§�„״±�ˆ״§״¨״·';
t['21'] = "״¥״¸�‡״§״± ״§�„״±�ˆ״§״¨״· ״¨״µ��״­״© ״¹״§״¦�…״© ";
t['22'] = '״£״¸�‡״§״± ״¯��״×״± ״§�„�…�„״§״­״¸״§״×';
t['23'] = "״¥״¸�‡״§״± ״¯��״×״± ״§�„�…�„״§״­״¸״§״× ״¨״µ��״­״© ״¹״§״¦�…״©";
t['24'] = '�…�‚״§״³ ״¯��״×״± ״§�„�…�„״§״­״¸״§״×';
t['25'] = '״§״±״×��״§״¹ ״¯��״×״± ״§�„�…�„״§״­״¸״§״×';
t['26'] = "״¥״¸�‡״§״± ״§�„״­״³״§״¨״§״×/״§�„״±�ˆ״§״¨״· �„�„�…״³״§״¹״¯ NPC";
t['27'] = "״§״®״×��״§״± �†�ˆ״¹ �…״­�„�„ ״¹״§�„�… ״×״±״§����״§�†";
t['28'] = "״£״¸�‡״§״± ״±״§״¨״· �…״­�„�„ ״§�„״¥״­״µ״§״¦��״§״×";
t['29'] = "״§״®״×��״§״±  �†�ˆ״¹ �…״­�„�„ ״§�„״¥״­״µ״§״¦��״§״×";
t['30'] = "״¥״¸�‡״§״± ״±�ˆ״§״¨״· ״§�„״®״±��״·״© �„�„�…״³״×״®״¯�…���†";
t['31'] = "״¥״¸�‡״§״± ״±�ˆ״§״¨״· ״§�„״®״±��״·״© �„�„״×״­״§�„��״§״×";
t['32'] = "״¹״±״¶ ״´״±��״· ״§�„״¨״­״«";
t['33'] = "״¥״°״§ ״§״®״×״±״× ״¨״§�„״£״¹�„�‰ ״¹״±״¶ ״´״±��״· ״§�„״¨״­״«  <br>  ״×״³״×״·��״¹ ״¬״¹�„�‡ ���� �†״§��״°״© ״¹״§״¦�…״© ״¨״§�„״¶״÷״· �‡�†״§" ;
t['34'] = "״£״¸�‡״§״± �…״³״×�ˆ�‰ ״§�„�†�‚״§״· ״§�„״­״¶״§״±��״© ���� ״¬״¯�ˆ�„ ״§�„״×״±�‚��״©";
t['35'] = "״£״¸�‡״§״± ״§״³״×�‡�„״§�ƒ ״§�„�‚�…״­ ���� ״¬״¯�ˆ�„ ״§�„״×״±�‚��״©";
t['36'] = '״¹״±״¶ ״§�„�…�ˆ״§״±״¯ ״§�„�…״×״¨�‚��״© ״¨״¹״¯ ״§�„״¨�†״§״¡ <br> �ˆ״§�„�…�ˆ״§״±״¯ ���� �‡״°״§ ״§�„�ˆ�‚״× ���� ״¬״¯�ˆ�„ ״§�„״×״±�‚��״© �ˆ״§�„״×״·�ˆ��״±';
t['37'] = "״¥״¸�‡״§״± ״¬״¯�ˆ�„ ״±��״¹ �…״³״×�ˆ�‰ ״§�„�…�ˆ״§״±״¯  <br>  ״§�„״¬״¯�ˆ�„ ״§�„�ƒ״¨��״± ״£״³���„ ״§�„״µ��״­״©";
t['38'] = '״¥״¸�‡״§״± ״§�„״£�„�ˆ״§�† ״¹�„�‰ �…״³״×�ˆ��״§״× ״§�„�…�ˆ״§״±״¯';
t['39'] = '״¥״¸�‡״§״± ״´״±��״· ״§�„�…�ˆ״§״±״¯';
t['40'] = '״¥״¸�‡״§״± ״´״±��״· ״§�„�…�ˆ״§״±״¯ ���� ״µ��״­״© ״¹״§״¦�…״©';
t['41'] = "״¥״¸�‡״§״± ״¬״¯�ˆ�„ ״±��״¹ �…״³״×�ˆ�‰ ״§�„�…״¨״§�†��";
t['42'] = '��״±״² ״§�„�…״¨״§�†�� ״¨״§�„״§״³�… ���� ״¬״¯�ˆ�„ ״§�„״×״±�‚��״©';
t['43'] = '״£״¸�‡״§״± ״§�„״£״±�‚״§�… ״¹�„�‰ ״§�„�…״¨״§�†��';
t['44'] = '״£״¸�‡״§״± ״§�„״£�„�ˆ״§�† ״¹�„�‰ �…״³״×�ˆ��״§״× ״§�„�…״¨״§�†��';
t['45'] = "״×��״¹���„ ״®״§״µ��״© ״§�„�ˆ�…��״¶ ״¹�†״¯ ״×״·�ˆ��״± ״§�„�…״¨״§�†�� ";
t['46'] = "״¹״±״¶ �…״¹�„�ˆ�…״§״× ״¥״¶״§����״© ״¹�† �ˆ״µ�ˆ�„ �ƒ�„ ״×״§״¬״±";
t['47'] = "״£״¸�‡״§״± ״¢״®״± ״¹�…�„��״© �†�‚�„ �…�ˆ״§״±״¯ ���� ״§�„״³�ˆ�‚";
t['48'] = "״¹״¯״¯ ״µ��״­״§״× ״§�„״¹״±�ˆ״¶ <br> ���� '״§�„״³�ˆ�‚ => ״´״±״§״¡' <br> (״§�„�ˆ״¶״¹ ״§�„״§��״×״±״§״¶�� = 1 ״£�ˆ ��״§״±״÷ ״› ״§�„״­״¯ ״§�„״£�‚״µ�‰ = 5)";
t['49'] = '״§�„״§״®״×״µ״§״± ״§�„״§��״×״±״§״¶�� ���� �†�‚״·״© ״§�„״×״¬�…״¹';
t['50'] = '״¹״¯״¯ ״§�„�ƒ״´״§��״© ���� <br> �ˆ״¸����״© "״§״®״×��״§״± ״§�„�ƒ״´״§��״©"';
t['51'] = "״£״¸�‡״§״± ״¢״®״± �‡״¬�ˆ�… ���� �†�‚״·״© ״§�„״×״¬�…״¹";
t['52'] = "״£״¸�‡״§״± ״§�„״¥״­״¯״§״«��״§״× ���� �‚״§״¦�…״© ״¢״®״± �‡״¬�ˆ�…";
t['53'] = '״¥״¸�‡״§״± �…״¹�„�ˆ�…״§״× ״§�„�‚�ˆ״§״×';
t['54'] = "״¥״¸�‡״§״± ״§�„�…״³״§��״© �ˆ ״§�„�ˆ�‚״× �„�„�‚״±�‰ �ƒ״×�„�…��״­״§״×";
t['55'] = "�…�„״¡ �‚�ˆ״§״× ״§�„�‚״±��״© ���� �…״­״§�ƒ�� ״§�„�…״¹״±�ƒ״© ״¯״§״®�„ ״§�„�„״¹״¨״©";
t['56'] = "״¹״±״¶ �†�ˆ״¹ ״§�„�‚״±��״© <br> ״¹�†״¯ ״§�„�…״±�ˆ״± ״¨״§�„�…״§�ˆ״³ ״¹�„�‰ ״§�„״®״±��״·״©";
t['57'] = '״¥״¸�‡״§״± ״§�„�…״³״§��״§״× & ״§�„�ˆ�‚״×';
t['58'] = "״¥״¸�‡״§״± ״¬״¯�ˆ�„ ״§�„�„״§״¹״¨���† ( ״§�„�‚״±�‰ / ״§�„�ˆ״§״­״§״× ״§�„�…״­״×�„״© )";
t['59'] = '״¹״¯״¯ ״§�„״µ��״­״§״× ���� ״§�„״±״³״§״¦�„/״§�„״×�‚״§״±��״± <br> (״§�„�ˆ״¶״¹ ״§�„״§��״×״±״§״¶�� = 1 ״£�ˆ ��״§״±״÷ ״› ״§�„״­״¯ ״§�„״£�‚״µ�‰ = 5)';
t['60'] = "״¥״¸�‡״§״± �ˆ״µ�„״§״× �„��״×״­ ״§�„״±״³״§״¦�„ ���� �†״§��״°״© �…�†״¨״«�‚״©";
t['61'] = '״¥״¸�‡״§״± ״¬״¯�ˆ�„ "״­״°�� ״§�„״¬�…��״¹" ״¹�„�‰ ״µ��״­״© ״§�„״×�‚״§״±��״±';
t['62'] = '״¥״¸�‡״§״± ״£���‚�ˆ�†״© "״£״±״³״§�„ ״±״³״§�„״©"';
t['63'] = "״¹״±״¶ ״§�„״¥״­״µ״§״¦��״§״× ���� ״×�‚״§״±��״± ״§�„�…״¹״±�ƒ״©";
t['64'] = '״¥״¸�‡״§״± ״§�„״×��״§״µ���„ ���� ״×�‚״±��״± ״§�„״¥״­״µ״§״¡״§״×';
t['65'] = '�„�ˆ�† ״§�„״×״·�ˆ��״± �…״×״§״­ <br> ״§�„�…״±״¨״¹ ��״§״±״÷ = ״§��״×״±״§״¶��)';
t['66'] = '�„�ˆ�† ״§�„״­״¯ ״§�„״£�‚״µ�‰ <br> (״§�„�…״±״¨״¹ ��״§״±״÷ = ״§��״×״±״§״¶��)';
t['67'] = '�„�ˆ�† ״§�„״×״·�ˆ��״± �„״§ ���…�ƒ�† <br> (״§�„�…״±״¨״¹ ��״§״±״÷ = ״§��״×״±״§״¶��)';
t['68'] = '�„�ˆ�† ״§�„״×״·�ˆ��״± ״¹�† ״·״±���‚ NPC <br> (״§�„�…״±״¨״¹ ��״§״±״÷ = ״§��״×״±״§״¶��)';
t['69'] = "�…״³״×�ˆ�‰ ״§�„״¯״®�ˆ�„ ���‚״· �„״×״µ״­��״­ ״§�„״£״®״·״§״¡ �„�„�…״¨״±�…״¬���† <br> (״§�„״§��״×״±״§״¶�� = 0 ״£�ˆ ״£״×״±�ƒ�‡ ��״§״±״÷)";
t['82.L'] = "״¥״÷�„״§�‚ �„�ˆ״­״© ״§�„״±�ˆ״§״¨״·   ״¥״®��״§״¡ ״£���‚�ˆ�†״© ( ״­״°��״� ���ˆ�‚״� ״×״­״×";
t['82.U'] = "��״×״­ �„�ˆ״­״© ״§�„״±�ˆ״§״¨״·   ״¥״¸�‡״§״± ״£���‚�ˆ�†״© ( ״­״°��״� ���ˆ�‚״� ״×״­״×)";
t['SIM'] = '�…״­״§�ƒ�� ״§�„�…״¹״±�ƒ״©';
t['QSURE'] = '�‡�„ ״£�†״× �…״×״£�ƒ״¯״�';
t['LOSS'] = '״§�„״®״³״§״¦״±';
t['PROFIT'] = '״§�„��״§״¦״¯״©';
t['EXTAV'] = '�…״×״§״­';
t['PLAYER'] = '״§�„�„״§״¹״¨';
t['VILLAGE'] = '״§״³�… ״§�„�‚״±��״©';
t['POPULATION'] = '״§�„״³�ƒ״§�†';
t['COORDS'] = '״§�„״¥״­״¯״§״«��״§״×';
t['MAPTBACTS'] = '״§�„״£�…״±';
t['SAVED'] = '״×�… ״­��״¸ ״§�„״¥״¹״¯״§״¯״§״×';
t['YOUNEED'] = '״×״­״×״§״¬';
t['TODAY'] = '״§�„���ˆ�…';
t['TOMORROW'] = '״÷״¯״§�‹';
t['DAYAFTERTOM'] = '״¨״¹״¯ ״÷״¯״§�‹';
t['MARKET'] = '״§�„״³�ˆ�‚';
t['BARRACKS'] = '״§�„״«�ƒ�†״©';
t['RAP'] = '�†�‚״·״© ״§�„״×״¬�…״¹';
t['STABLE'] = '״§�„״¥״³״·״¨�„';
t['WORKSHOP'] = '״§�„�…״µ״§�†״¹ ״§�„״­״±״¨��״©';
t['SENDRES'] = '״¥״±״³״§�„ ״§�„�…�ˆ״§״±״¯';
t['BUY'] = '״´״±״§״¡';
t['SELL'] = '״¨��״¹';
t['SENDIGM'] = '״¥״±״³״§�„ ״±״³״§�„״©';
t['LISTO'] = '��״×״§״­';
t['ON'] = '״¹�„�‰';
t['AT'] = '����';
t['EFICIENCIA'] = '״§�„��״¹״§�„��״©';
t['NEVER'] = '״£״¨״¯״§';
t['ALDEAS'] = '״§�„�‚״±��״©-״§�„�‚״±�‰';
t['TIEMPO'] = '״§�„�ˆ�‚״×';
t['OFREZCO'] = '״§�„״¹״±״¶';
t['BUSCO'] = '״§�„״¨״­״«';
t['TIPO'] = '״§�„�†�ˆ״¹';
t['DISPONIBLE'] = '���‚״· ״§�„�…״×״§״­';
t['CUALQUIERA'] = '״£��';
t['YES'] = '�†״¹�…';
t['NO'] = '�„״§';
t['LOGIN'] = '״×״³״¬���„ ״§�„״¯״®�ˆ�„';
t['MARCADORES'] = '״§�„״±�ˆ״§״¨״·';
t['ANYADIR'] = '״¥״¶״§��״© ״±״§״¨״· +�†״µ';
t['UBU'] = '״¶״¹ ״§�„״±״§״¨״· �‡�†״§';
t['UBT'] = '״¶״¹ �†״µ ״§�„״±״§״¨״· �‡�†״§';
t['DEL'] = '״­״°��';
t['MAPA'] = '״§�„״®״±��״·״©';
t['MAXTIME'] = '״§�„״­״¯ ״§�„״£�‚״µ�‰ �„�„�ˆ�‚״×';
t['ARCHIVE'] = '״§�„״£״±״´����';
t['SUMMARY'] = '״§�„�…�ˆ״¬״²';
t['TROPAS'] = '״§�„�‚�ˆ״§״×';
t['CHKSCRV'] = '״£״¶״÷״· �‡�†״§ �„״×״­״¯��״« ״§�„״³�ƒ״±״¨״× �…״¨״§״´״±״©';
t['ACTUALIZAR'] = '״×״­״¯��״« �…״¹�„�ˆ�…״§״× ״§�„�‚״±��״©';
t['VENTAS'] = '״­��״¸ ״§�„״¹״±�ˆ״¶';
t['MAPSCAN'] = '��״­״µ ״§�„״®״±��״·״©';
t['BIC'] = '״§�„״¥���‚�ˆ�†״§״× ״§�„�…״®״×״µ״±״©';
t['SAVE'] = '״­��״¸';
t['AT2'] = '�…״³״§�†״¯״©';
t['AT3'] = '�‡״¬�ˆ�…: �ƒ״§�…�„';
t['AT4'] = '�‡״¬�ˆ�…: �„�„�†�‡״¨';
t['NBSA'] = '״×�„�‚״§״¦��';
t['NBSN'] = '״¹״§״¯�� (״µ״÷��״±�‡)';
t['NBSB'] = '�…�„״¡ ״§�„״´״§״´״© (�ƒ״¨��״±״©)';
t['NBHAX'] = '״×�ˆ״³��״¹ ״×�„�‚״§״¦�� �„�„״§״±״×��״§״¹';
t['NBHK'] = '״§״±״×��״§״¹ ״§��״×״±״§״¶��';
t['NPCSAVETIME'] = '״­��״¸: ';
t['TOTALTROOPS'] = '�…״¬�…�ˆ״¹ ״§�„�‚�ˆ״§״× ���� ״§�„�‚״±��״©';
t['U.2'] = '״§�„�‚״¨���„״©';
t['SELECTALLTROOPS'] = "״§״®״×��״§״± �ƒ�„ ״§�„�‚�ˆ״§״×";
t['PARTY'] = "״§�„״§״­״×��״§�„״§״×";
t['CPPERDAY'] = "�†�‚״§״· ״­״¶״§״±��״© ���ˆ�…��״§�‹";
t['SLOT'] = "��״×״­ �‚״±��״©";
t['TOTAL'] = "״§�„�…״¬�…�ˆ״¹";
t['SELECTSCOUT'] = "״§״®״×��״§״± ״§�„�ƒ״´״§��״©";
t['SELECTFAKE'] = "״§״®״×��״§״± �‡״¬�ˆ�… �ˆ�‡�…��";
t['NOSCOUT2FAKE'] = "�…״³״×״­���„ ״§״®״×��״§״± ״§�„�ƒ״´״§��״© ���� ״§�„�‡״¬�ˆ�… ״§�„�ˆ�‡�…�� !";
t['NOTROOP2FAKE'] = "�„״§ ״×�ˆ״¬״¯ �‚�ˆ״§״× �„�„�‡״¬�ˆ�… ״§�„�ˆ�‡�…�� !";
t['NOTROOP2SCOUT'] = "�„״§ ״×�ˆ״¬״¯ �‚�ˆ״§״× �ƒ״´״§��״© !";
t['NOTROOPS'] = "�„״§ ״×�ˆ״¬״¯ �‚�ˆ״§״× ���� ״§�„�‚״±��״© !";
t['ALL'] = "״§�„�ƒ�„";
t['SH2'] = "���…�ƒ�†�ƒ ״¥״¯״®״§�„ ״§�„״£�„�ˆ״§�† �ƒ״§�„״£״×��:<br>- green ״£�ˆ red ״£�ˆ  orange, ״§�„״®.<br>- ״±�…״² ״§�„�„�ˆ�† �…״«�„ #004523<br>- ״×״±�ƒ�‡ ��״§״±״÷ �„״£�„�ˆ�† ״§�„״§��״×״±״§״¶��";
t['SOREP'] = "״£״¸�‡״§״± ״§�„�†״³״®״© ״§�„״£״µ�„��״© �„�„״×�‚״±��״±";
t['WSIMO1'] = "״¯״§״®�„�� (�…״­״§�ƒ�� ״§�„�…״¹״±�ƒ״© ״§�„״¹״§״¯��)";
t['WSIMO2'] = "״®״§״±״¬�� (�…״­״§�ƒ�� ״§�„�…״¹״±�ƒ״© ״§�„�…״·�ˆ״± kirilloid.ru)";
t['U.3'] = '״£״³�… ״§�„״¹״§״µ�…״© <br> �„״§ ���…�ƒ�†�ƒ ״§�„״×״¹״¯���„, ���‚״· �‚�… ״¨״²��״§״±״© ״¨״·״§�‚״© ״§�„״¹״¶�ˆ��״©';
t['NONEWVER'] = "�„״¯���ƒ ״£״­״¯״« �†״³״®״©";
t['BVER'] = "�‚״¯ ���ƒ�ˆ�† �„״¯���ƒ �†״³״®״© ״×״¬״±��״¨��״©";
t['NVERAV'] = "���ˆ״¬״¯ �†״³״®״© ״¬״¯��״¯״© �…�† ״§�„״³�ƒ״±״¨״×";
t['UPDSCR'] = "�‡�„ ״×״±��״¯ ״×״­״¯��״« ״§�„״³�ƒ״±״¨״× ״§�„״¢�†״�";
t['CHECKUPDATE'] = "״§�„״×״­�‚�‚ �…�† �ˆ״¬�ˆ״¯ ״×״­״¯��״« �„�„״³�ƒ״±״¨״×. ״§�„״±״¬״§״¡ ״§�„״§�†״×״¸״§״±...";
t['CROPFINDER'] = "״¨״­״« ״¹�† ״§�„�‚״±�‰ ״§�„�‚�…״­��״©";
t['AVPPV'] = "�…״×�ˆ״³״· ״¹״¯״¯ ״§�„״³�ƒ״§�† �„�„�‚״±��״© ״§�„�ˆ״§״­״¯״© ";
t['AVPPP'] = "�…״×�ˆ״³״· ״¹״¯״¯ ״§�„״³�ƒ״§�† �„�„״§״¹״¨ ״§�„�ˆ״§״­״¯";
t['U.6'] = '״¥״­״¯״§״«��״§״× ״§�„״¹״§״µ�…״© <br> �„״§ ���…�ƒ�†�ƒ ״§�„״×״¹״¯���„, ���‚״· �‚�… ״¨״²��״§״±״© ״¨״·״§�‚״© ״§�„״¹״¶�ˆ��״©';
t['MAX'] = '״§�„״­״¯ ״§�„״£�‚״µ�‰';
t['TOTTRTR'] = '״£״¬�…״§�„�� ״§�„�‚�ˆ״§״× ״§�„״×�� ��״×�… ״×״¯״±��״¨�‡״§';
t['TB3SL'] = '״£״¹״¯״§״¯״§״× ״×״±״§����״§�† ״¨״§���ˆ�†״¯';
t['UPDALLV'] = '״×״­״¯��״« ״¬�…��״¹ ״§�„�‚״±�‰. �„״§ ״×״³״×״®״¯�…�‡״§ ״¨�ƒ״«״±״© ���‚״¯ ��״₪״¯�� ״°״§�„�ƒ ״¥�„�‰ ״­״¸״± ״­״³״§״¨�ƒ !';
t['LARGEMAP'] = '״®״±��״·״© �ƒ״¨��״±״©';
t['USETHEMPR'] = '״§�„״§״³״×״®״¯״§�… (״§�„�†״³״¨��)';
t['USETHEMEQ'] = '״§�„״§״³״×״®״¯״§�… (״§�„�…״×״³״§�ˆ��)';
t['TOWNHALL'] = '״§�„״¨�„״¯��״©';
t['GSRVT'] = '״³��״±��״± ״§�„�„״¹״¨״©';
t['ACCINFO'] = '�…״¹�„�ˆ�…״§״× ״§�„״­״³״§״¨';
t['NBO'] = '״¯��״×״± ״§�„�…�„״§״­״¸״§״×';
t['MNUL'] = '״§�„�‚״§״¦�…״© ״¹�„�‰ ״§�„״¬״§�†״¨ ״§�„״£���…�†';
t['STAT'] = '״¥״­״µ״§״¦��״§״×';
t['RESF'] = '״­�‚�ˆ�„ ״§�„�…�ˆ״§״±״¯';
t['VLC'] = '�…״±�ƒ״² ״§�„�‚״±��״©';
t['MAPO'] = '״®��״§״±״§״× ״§�„״®״±��״·״©';
t['COLO'] = '״®��״§״±״§״× ״§�„״£�„�ˆ״§�†';
t['DBGO'] = '״®��״§״±״§״× ״§�„״×״µ״­��״­';
t['HEROSMANSION'] = "�‚״µ״± ״§�„״£״¨״·״§�„";
t['BLACKSMITH'] = '״§�„״­״¯״§״¯';
t['ARMOURY'] = '�…״³״×�ˆ״¯״¹ ״§�„״£״³�„״­״©';
t['NOW'] = '״§�„״¢�†';
t['CLOSE'] = '״¥״÷�„״§�‚';
t['USE'] = '״§״³״×״®״¯״§�…';
t['USETHEM1H'] = '״§�„״§״³״×״®״¯״§�… (1 ״³״§״¹״© ״§�„״¥�†״×״§״¬)';
t['OVERVIEW'] = '״§�„״¹״±״¶';
t['FORUM'] = '״§�„�…�†״×״¯�‰';
t['ATTACKS'] = '״§�„�‡״¬�…״§״×';
t['NEWS'] = '״§�„״¥״®״¨״§״±';
t['ADDCRTPAGE'] = '״¥״¶״§��״© �†״µ �„�„״µ��״­״© ״§�„״­״§�„��״©';
t['SCRPURL'] = '״§״¶״÷״· �‡�†״§ �„��״×״­ ״§�„״µ��״­״© ״§�„״±״³�…��״© �„�„״³�ƒ״±״¨״×';
t['SPACER'] = '״¥״¶״§��״© ��״§״µ�„';
t['MEREO'] = '״±״³״§״¦�„ & ״×�‚״§״±��״±';
t['ATTABLES'] = '״¬״¯�ˆ�„ ״§�„�‚�ˆ״§״×';
t['MTW'] = '״§�„״¨״§�‚��';
t['MTX'] = '״§�„״²״§״¦״¯';
t['MTC'] = "״§�„״­�…�ˆ�„״© ״§�„״­״§�„��״©";
t['ALFL'] = "״±״§״¨״· ״®״§״±״¬�� �„�„�…�†״×״¯�‰ <br> (״§�„�…״±״¨״¹ ��״§״±״÷ = ״¥״°״§ �ƒ״§�† ״§�„�…�†״×״¯�‰ ״¯״§״®�„��)";
t['MTCL'] = "�…״³״­ ״§�„�ƒ�„";
t['CKSORT'] = "״£״¶״÷״· �„״×״±״×��״¨";
t['MIN'] = "״§�„״£״¯�†�‰";
t['SVGL'] = "״¹״±״¶ �…״´״×״±�ƒ ״¨���† ״§�„�‚״±�‰";
t['VGL'] = "�‚״§״¦�…״© ״§�„�‚״±��״©";
t['UPDATEPOP'] = "״×״­״¯��״« ״§�„״³�ƒ״§�†";
t['EDIT'] = "״×״­״±��״±";
t['NPCO'] = "״®��״§״±״§״× ״§�„�…״³״§״¹״¯״© NPC";
t['NEWVILLAGEAV'] = "״§�„״×״§״±��״®/״§�„�ˆ�‚״×";
t['TIMEUNTIL'] = "״§�„�ˆ�‚״× ״§�„�„״§״²�… �„�„״§�†״×״¸״§״±";
t['CENTERMAP'] = "״×�ˆ״³��״· �‡״°�‡ ״§�„�‚״±��״© ״¹�„�‰ ״§�„״®״±��״·״©";
t['SENDTROOPS'] = '״¥״±״³״§�„ ״§�„�‚�ˆ״§״×';
t['PALACE'] = "״§�„�‚״µ״±";
t['RESIDENCE'] = "״§�„״³�ƒ�†";
t['ACADEMY'] = "״§�„״£�ƒ״§״¯���…��״©";
t['TREASURY'] = "״§�„״®״²�†״©";
t['UPGTB'] = "״¬״¯�ˆ�„ ״§�„״×״±�‚��״© ( ״§�„�…״¨״§�†��/״§�„״­�‚�ˆ�„ )";
t['RBTT'] = "״´״±��״· ״§�„�…�ˆ״§״±״¯";
t['RESIDUE'] = "״§�„�…�ˆ״§״±״¯ ״¨״¹״¯ ״§�„״¨�†״§״¡ ";
t['RESOURCES'] = "״§�„�…�ˆ״§״±״¯ �‚״¨�„ ״§�„״¨�†״§״¡ ";
t['SH1'] = "״£��״×״­ ״¨״·״§�‚״© ״§�„״¹״¶�ˆ��״© �„��״×״¹״±�� ״§�„״³�ƒ״±״¨״× ״×�„�‚״§״¦��״§�‹ ״¹�„�‰ ״§�„״¹״§״µ�…״© <br> ״£״¨�†�� ״§�„״«�ƒ�†״© �„�„�ƒ״´�� ״×�„�‚״§״¦��״§�‹ ״¹�„�‰ �†�ˆ״¹ ״§�„�‚״¨���„״© �ˆ�…�† ״«�… ״§�„״¯״®�ˆ�„ ״¹�„�‰ �†�‚״·״© ״§�„״×״¬�…״¹";
t['RESEND'] = "״¥״±״³״§�„ �…״±״© ״£״®״±�‰ ״�";
t['WSI'] = "�…״­״§�ƒ�� ״§�„�…״¹״±�ƒ״© ״¯״§״®�„ ״§�„�„״¹״¨״©";
break;
case "rs"://by David Maִ‡ej & rsinisa
//avRace = ['׀ ׀¸׀¼ׁ™׀°׀½׀¸', '׀¢׀µ׀²ׁ‚׀¾׀½ׁ†׀¸', '׀“׀°׀»׀¸'];
t['8'] = '׀¡׀°׀²׀µ׀·';
t['SIM'] = '׀¡׀¸׀¼ׁƒ׀»׀°ׁ‚׀¾ׁ€ ׀±׀¾ׁ€׀±׀µ';
t['QSURE'] = '׀”׀° ׀»׀¸ ׁ�ׁ‚׀µ ׁ�׀¸׀³ׁƒׁ€׀½׀¸?';
t['LOSS'] = '׀“ׁƒ׀±׀¸ׁ‚׀°׀÷';
t['PROFIT'] = '׀”׀¾׀±׀¸ׁ‚';
t['EXTAV'] = '׀�׀°׀´׀¾׀³ׁ€׀°׀´ׁ�׀° ׀¼׀¾׀³ׁƒׁ›׀°';
t['PLAYER'] = '׀˜׀³ׁ€׀°ׁ‡';
t['VILLAGE'] = '׀¡׀µ׀»׀¾';
t['POPULATION'] = '׀�׀¾׀¿ׁƒ׀»׀°ׁ†׀¸ׁ˜׀°';
t['COORDS'] = '׀�׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚׀µ';
t['MAPTBACTS'] = '׀�׀÷ׁ†׀¸ׁ˜׀µ';
t['SAVED'] = '׀¡׀°ׁ‡ׁƒ׀²׀°׀½׀¾';
t['YOUNEED'] = '׀�׀¾ׁ‚ׁ€׀µ׀±׀½׀¾ ׁ˜׀µ';
t['TODAY'] = '׀´׀°׀½׀°ׁ�';
t['TOMORROW'] = 'ׁ�ׁƒׁ‚ׁ€׀°';
t['DAYAFTERTOM'] = '׀¿ׁ€׀µ׀÷׀¾ׁ�ׁƒׁ‚ׁ€׀°';
t['MARKET'] = '׀�׀¸ׁ˜׀°ׁ†׀°';
t['BARRACKS'] = '׀�׀°ׁ�׀°ׁ€׀½׀°';
t['RAP'] = '׀�׀µׁ�ׁ‚׀¾ ׀¾׀÷ׁƒ׀¿ׁ™׀°ׁ�׀°';
t['STABLE'] = '׀¨ׁ‚׀°׀»׀°';
t['WORKSHOP'] = '׀ ׀°׀´׀¸׀¾׀½׀¸ׁ†׀°';
t['SENDRES'] = '׀�׀¾ׁˆ׀°ׁ™׀¸ ׁ€׀µׁ�ׁƒׁ€ׁ�׀µ';
t['BUY'] = '׀�ׁƒ׀¿׀¸';
t['SELL'] = '׀�ׁ€׀¾׀´׀°ׁ˜';
t['SENDIGM'] = '׀�׀¾ׁˆ׀°ׁ™׀¸ ׀¿׀¾ׁ€ׁƒ׀÷ׁƒ';
t['LISTO'] = '׀”׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀¾';
t['ON'] = ''; // on
t['AT'] = 'ׁƒ'; // at
t['EFICIENCIA'] = '׀•ׁ„׀¸׀÷׀°ׁ�׀½׀¾ׁ�ׁ‚';
t['NEVER'] = '׀�׀¸׀÷׀°׀´׀°';
t['ALDEAS'] = '׀¡׀µ׀»׀¾(׀°)';
t['TIEMPO'] = '׀’ׁ€׀µ׀¼׀µ';
t['OFREZCO'] = '׀�ׁƒ׀´׀¸';
t['BUSCO'] = '׀¢ׁ€׀°׀¶׀¸';
t['TIPO'] = '׀�׀´׀½׀¾ׁ�';
t['DISPONIBLE'] = '׀¡׀°׀¼׀¾ ׀´׀¾ׁ�ׁ‚ׁƒ׀¿׀½׀¾';
t['CUALQUIERA'] = '׀¡׀²׀µ';
t['YES'] = '׀”׀°';
t['NO'] = '׀�׀µ';
t['LOGIN'] = '׀�ׁ€׀¸ׁ˜׀°׀²׀¸ ׁ�׀µ';
t['MARCADORES'] = '׀›׀¸׀½׀÷׀¾׀²׀¸';
t['ANYADIR'] = '׀”׀¾׀´׀°ׁ˜';
t['UBU'] = '׀�׀´ׁ€׀µׁ�׀° ׀½׀¾׀²׀¾׀³ ׀»׀¸׀½׀÷׀°';
t['UBT'] = '׀�׀°׀·׀¸׀² ׀½׀¾׀²׀¾׀³ ׀»׀¸׀½׀÷׀°';
t['DEL'] = '׀�׀±ׁ€׀¸ׁˆ׀¸';
t['MAPA'] = '׀�׀°׀¿׀°';
t['MAXTIME'] = '׀�׀°׀÷ׁ�׀¸׀¼׀°׀»׀½׀¾ ׀²ׁ€׀µ׀¼׀µ';
t['ARCHIVE'] = '׀�ׁ€ׁ…׀¸׀²׀°';
t['SUMMARY'] = '׀—׀±׀¸ׁ€'; // summary
t['TROPAS'] = '׀’׀¾ׁ˜ׁ�׀÷׀°';
t['CHKSCRV'] = '׀£׀½׀°׀¿ׁ€׀µ׀´׀¸ TBeyond';
t['ACTUALIZAR'] = '׀�ׁ�׀²׀µ׀¶׀¸ ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ˜׀µ ׀¾ ׁ�׀µ׀»׀¸׀¼׀°';
t['VENTAS'] = '׀¡׀°ׁ‡ׁƒ׀²׀°ׁ˜ ׀¿׀¾׀½ׁƒ׀´ׁƒ';
t['MAPSCAN'] = '׀�ׁ€׀µׁ‚ׁ€׀°׀¶׀¸ ׀¼׀°׀¿ׁƒ';
t['BIC'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀´׀¾׀´׀°ׁ‚׀½׀µ ׀¸׀÷׀¾׀½׀µ';
t['22'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀±׀µ׀»׀µ׀¶׀½׀¸ׁ†ׁƒ';
t['SAVE'] = '׀¡׀°ׁ‡ׁƒ׀²׀°ׁ˜';
t['49'] = '׀�ׁ�׀½׀¾׀²׀½׀° ׀°׀÷ׁ†׀¸ׁ˜׀° ׀½׀° ׀¼׀µׁ�ׁ‚ׁƒ ׀¾׀÷ׁƒ׀¿ׁ™׀°ׁ�׀°';
t['AT2'] = '׀�׀¾ׁ˜׀°ׁ‡׀°ׁ�׀µ';
t['AT3'] = '׀�׀°׀¿׀°׀´';
t['AT4'] = '׀�ׁ™׀°ׁ‡׀÷׀°';
t['24'] = '׀’׀µ׀»׀¸ׁ‡׀¸׀½׀° ׀±׀µ׀»׀µ׀¶׀½׀¸ׁ†׀µ';
t['NBSA'] = '׀�ׁƒׁ‚׀¾׀¼׀°ׁ‚ׁ�׀÷׀¸';
t['NBSN'] = '׀�׀¾ׁ€׀¼׀°׀»׀½׀°';
t['NBSB'] = '׀’׀µ׀»׀¸׀÷׀°';
t['25'] = '׀’׀¸ׁ�׀¸׀½׀° ׀±׀µ׀»׀µ׀¶׀½׀¸ׁ†׀µ';
t['NBHAX'] = '׀�ׁƒׁ‚׀¾׀¼׀°ׁ‚ׁ�׀÷׀¸ ׀¿׀¾׀²׀µׁ›׀°ׁ˜ ׀²׀¸ׁ�׀¸׀½ׁƒ';
t['NBHK'] = '׀�ׁ�׀½׀¾׀²׀½׀° ׀²׀¸ׁ�׀¸׀½׀°';
t['43'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀±ׁ€׀¾ׁ˜׀µ׀²׀µ ׁƒ ׁ†׀µ׀½ׁ‚ׁ€ׁƒ ׁ�׀µ׀»׀°';
t['NPCSAVETIME'] = '׀£׀±ׁ€׀·׀°ׁ˜ ׀·׀°: ';
t['38'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀½׀¸׀²׀¾׀µ ׁ€׀µׁ�ׁƒׁ€ׁ�׀° ׁƒ ׀±׀¾ׁ˜׀¸';
t['44'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀½׀¸׀²׀¾׀µ ׀³ׁ€׀°ׁ’׀µ׀²׀¸׀½׀° ׁƒ ׀±׀¾ׁ˜׀¸';
t['65'] = '׀‘׀¾ׁ˜׀° ׀·׀° ׁƒ׀½׀°׀¿ׁ€׀µׁ’׀µׁ�׀µ ׀¼׀¾׀³ׁƒׁ›׀µ<br>(׀�ׁ�׀½׀¾׀²׀½׀° = ׀¿ׁ€׀°׀·׀½׀¾)';
t['66'] = '׀‘׀¾ׁ˜׀° ׀·׀° ׀¼׀°׀÷ׁ�׀¸׀¼׀°׀»׀½׀¸ ׀½׀¸׀²׀¾<br>(׀�ׁ�׀½׀¾׀²׀½׀° = ׀¿ׁ€׀°׀·׀½׀¾)';
t['67'] = '׀‘׀¾ׁ˜׀° ׀·׀° ׁƒ׀½׀°׀¿ׁ€׀µׁ’׀µׁ�׀µ ׀½׀¸ׁ˜׀µ ׀¼׀¾׀³ׁƒׁ›׀µ<br>(׀�ׁ�׀½׀¾׀²׀½׀° = ׀¿ׁ€׀°׀·׀½׀¾)';
t['68'] = '׀‘׀¾ׁ˜׀° ׀·׀° ׁƒ׀½׀°׀¿ׁ€׀µׁ’׀µׁ�׀µ ׀¿׀¾׀¼׀¾ׁ›ׁƒ ׀�׀�׀¦<br>(׀�ׁ�׀½׀¾׀²׀½׀° = ׀¿ׁ€׀°׀·׀½׀¾)';
t['TOTALTROOPS'] = '׀¡׀²׀° ׀²׀¾ׁ˜ׁ�׀÷׀° ׀¸׀· ׁ�׀µ׀»׀°';
t['20'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀»׀¸׀½׀÷׀¾׀²׀µ';
t['U.2'] = '׀�׀»׀µ׀¼׀µ';
t['1'] = "׀¢ׁ€׀°׀²׀¸׀°׀½ 2.x ׁ�׀µׁ€׀²׀µׁ€";
t['SELECTALLTROOPS'] = "׀¡׀²׀° ׀²׀¾ׁ˜ׁ�׀÷׀°";
t['PARTY'] = "׀—׀°׀±׀°׀²׀µ";
t['CPPERDAY'] = "׀�׀�/׀´׀°׀½";
t['SLOT'] = "׀�׀µׁ�ׁ‚׀¾ ׀·׀° ׀¿ׁ€׀¾ׁˆ׀¸ׁ€׀µׁ�׀µ";
t['TOTAL'] = "׀£׀÷ׁƒ׀¿׀½׀¾";
t['SELECTSCOUT'] = "׀˜׀·׀²׀¸ׁ’׀°ׁ�׀µ";
t['SELECTFAKE'] = "׀›׀°׀¶׀½׀¸ ׀½׀°׀¿׀°׀´";
t['NOSCOUT2FAKE'] = "׀�׀µ׀¼׀¾׀³ׁƒׁ›׀µ ׁ˜׀µ ׀¿׀¾ׁ�׀»׀°ׁ‚׀¸ ׀¸׀·׀²׀¸ׁ’׀°ׁ‡׀µ ׁƒ ׀»׀°׀¶׀½׀¸ ׀½׀°׀¿׀°׀´!";
t['NOTROOP2FAKE'] = "׀£ ׁ�׀µ׀»ׁƒ ׀½׀µ׀¼׀° ׀²׀¾ׁ˜ׁ�׀÷׀µ ׁ�׀° ׀»׀°׀¶׀½׀¸ ׀½׀°׀¿׀°׀´!";
t['NOTROOP2SCOUT'] = "׀£ ׁ�׀µ׀»ׁƒ ׀½׀µ׀¼׀° ׀¸׀·׀²׀¸ׁ’׀°ׁ‡׀°!";
t['NOTROOPS'] = "׀�׀µ׀¼׀° ׀²׀¾ׁ˜ׁ�׀÷׀µ ׁƒ ׁ�׀µ׀»ׁƒ!";
t['ALL'] = "׀¡׀²׀µ";
t['SH2'] = "׀£ ׀¿׀¾ׁ™׀µ ׀·׀° ׀¸׀·׀±׀¾ׁ€ ׀±׀¾ׁ˜׀µ ׀¼׀¾׀¶׀µׁ‚׀µ ׁƒ׀½׀µׁ‚׀¸:<br>- green ׀¸׀»׀¸ red ׀¸׀»׀¸ orange, ׀¸ׁ‚׀´.<br>- ׀¸׀»׀¸ HEX ׀÷׀¾׀»׀¾ׁ€׀½׀¸ ׀÷׀¾׀´ ׀½׀¿ׁ€. #004523<br>- ׀¾ׁ�ׁ‚׀°׀²׀¸ׁ‚׀µ ׀¿ׁ€׀°׀·׀½׀¾ ׀·׀° ׀¾ׁ�׀½׀¾׀²׀½׀µ ׀±׀¾ׁ˜׀µ.";
t['SOREP'] = "׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀¾ׁ€׀¸׀³׀¸׀½׀°׀»׀½׀¸ ׀¸׀·׀²׀µׁˆׁ‚׀°ׁ˜ (׀·׀° ׀¿׀¾ׁ�ׁ‚׀¾׀²׀°ׁ�׀µ)";
t['56'] = "׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׁ‚׀¸׀¿ ׀¿׀¾ׁ™׀°/׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ˜ׁƒ ׀¾ ׀¾׀°׀·׀¸<br>׀´׀¾׀÷ ׁ�׀µ ׀¼׀¸ׁˆ ׀÷ׁ€׀µׁ›׀µ ׀¿ׁ€׀µ׀÷׀¾ ׀¼׀°׀¿׀µ";
t['10'] = "׀�׀¾ׁ€׀¸ׁ�ׁ‚׀¸ ׁ�׀»׀µ׀´׀µׁ›׀¸ ׁ�׀¸׀¼ׁƒ׀»׀°ׁ‚׀¾ׁ€ ׀±׀¾ׁ€׀±׀µ:<br>(ׁƒ ׀¼׀µ׀½׀¸ׁ˜ׁƒ ׀»׀µ׀²׀¾)";
t['WSIMO1'] = "׀˜׀· ׀¸׀³ׁ€׀µ";
t['WSIMO2'] = "׀¡׀° ׁ�׀°ׁ˜ׁ‚׀° kirilloid.ru";
t['27'] = "׀¢ׁ€׀°׀²׀¸׀°׀½ ׀°׀½׀°׀»׀¸׀·׀°ׁ‚׀¾ׁ€";
t['28'] = "׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀°׀½׀°׀»׀¸׀·׀°ׁ‚׀¾ׁ€ ׀÷׀°׀¾ ׀»׀¸׀½׀÷";
t['NONEWVER'] = "׀˜׀¼׀°ׁ‚׀µ ׀¿׀¾ׁ�׀»׀µ׀´ׁ�ׁƒ ׀²׀µׁ€׀·׀¸ׁ˜ׁƒ ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀°!";
t['BVER'] = "׀�׀¾׀¶׀´׀° ׀¸׀¼׀°ׁ‚׀µ ׀±׀µׁ‚׀°׀²׀µׁ€׀·׀¸ׁ˜ׁƒ ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀°";
t['NVERAV'] = "׀�׀¾ׁ�ׁ‚׀¾ׁ˜׀¸ ׀½׀¾׀²׀° ׀²׀µׁ€׀·׀¸ׁ˜׀° ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀°";
t['UPDSCR'] = "׀”׀° ׀»׀¸ ׁƒ׀½׀°׀¿ׁ€׀µ׀´׀¸׀¼ ׁ�׀÷ׁ€׀¸׀¿ׁ‚ׁƒ ׁ�׀°׀´׀°?";
t['CHECKUPDATE'] = "׀�ׁ€׀¾׀²׀µׁ€׀°׀²׀°׀¼ ׀´׀° ׀»׀¸ ׀¿׀¾ׁ�ׁ‚׀¾ׁ˜׀¸ ׀½׀¾׀²׀° ׀²׀µׁ€׀·׀¸ׁ˜׀°.<br>׀�׀¾׀»׀¸׀¼ ׁ�׀°ׁ‡׀µ׀÷׀°ׁ˜ׁ‚׀µ...";
t['CROPFINDER'] = "׀�׀°ׁ’׀¸ ׀¶׀¸ׁ‚׀½׀¸ׁ†׀µ";
t['AVPPV'] = "׀�ׁ€׀¾ׁ�׀µׁ‡׀½׀° ׀¿׀¾׀¿ׁƒ׀»׀°ׁ†׀¸ׁ˜׀° ׀¿׀¾ ׁ�׀µ׀»ׁƒ";
t['AVPPP'] = "׀�ׁ€׀¾ׁ�׀µׁ‡׀½׀° ׀¿׀¾׀¿ׁƒ׀»׀°ׁ†׀¸ׁ˜׀° ׀¿׀¾ ׀¸׀³ׁ€׀°ׁ‡ׁƒ";
t['37'] = "׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׁ‚׀°׀±׀µ׀»ׁƒ ׁƒ׀½׀°׀¿ׁ€׀µׁ’׀µׁ�׀° ׁ€׀µׁ�ׁƒׁ€ׁ�׀°";
t['41'] = "׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׁ‚׀°׀±׀µ׀»ׁƒ ׁƒ׀½׀°׀¿ׁ€׀µׁ’׀µׁ�׀° ׀³ׁ€׀°ׁ’׀µ׀²׀¸׀½׀°";
t['69'] = "Console Log Level<br>׀¡׀�׀�׀� ׀—׀� ׀�׀ ׀�׀“׀ ׀�׀�׀•׀ ׀• ׀¸׀»׀¸ ׀¢׀ ׀�׀–׀•׀�׀• ׀“׀ ׀•׀¨׀�׀�׀�<br>(׀�ׁ�׀½׀¾׀²׀½׀¾ = 0)";
t['48'] = "׀‘ׁ€׀¾ׁ˜ ׁ�ׁ‚ׁ€׀°׀½׀° ׁ�׀° ׀¿׀¾׀½ׁƒ׀´׀°׀¼׀° ׁ•׀° ׀¿ׁ€׀¸׀÷׀°׀·<br>׀½׀° ׀¿׀¸ׁ˜׀°ׁ†׀¸ => ׁ�ׁ‚ׁ€׀°׀½׀° ׁ•׀° ׀÷ׁƒ׀¿׀¾׀²׀¸׀½ׁƒ<br>(׀�ׁ�׀½׀¾׀²׀½׀¾ = 1)";
t['U.3'] = '׀�׀°׀·׀¸׀² ׀³׀»׀°׀²׀½׀¾׀³ ׀³ׁ€׀°׀´׀°<br>׀˜׀´׀¸ׁ‚׀µ ׁƒ ׀¿ׁ€׀¾ׁ„׀¸׀»';
t['U.6'] = '׀�׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚׀µ ׀³׀»׀°׀²׀½׀¾׀³ ׀³ׁ€׀°׀´׀°<br>׀˜׀´׀¸ׁ‚׀µ ׁƒ ׀¿ׁ€׀¾ׁ„׀¸׀»';
t['MAX'] = '׀�׀°׀÷ׁ�׀¸׀¼ׁƒ׀¼';
t['TOTTRTR'] = '׀£׀÷ׁƒ׀¿׀½׀° ׀±ׁ€׀¾ׁ˜ ׁ˜׀µ׀´׀¸׀½׀¸ׁ†׀° ׀½׀° ׀¾׀±ׁƒׁ†׀¸';
t['57'] = '׀�ׁ€׀¸׀÷׀°׀·׀¸ ׀´׀°ׁ™׀¸׀½׀µ ׀¸ ׀²ׁ€׀µ׀¼׀µ׀½׀°';
t['TB3SL'] = TB3O.shN + ' ׀¿׀¾׀´׀µׁˆ׀°׀²׀°ׁ�׀µ';
t['UPDALLV'] = '׀�ׁ�׀²׀µ׀¶׀¸ ׁ�׀²׀° ׁ�׀µ׀»׀°. ׀�׀�׀ ׀˜׀¡׀¢׀˜׀¢׀˜ ׀¡׀� ׀�׀�׀ ׀•׀—׀�׀�, ׀�׀�׀“׀£׀‹׀• ׀ˆ׀• ׀‘׀£׀”׀•׀¢׀• ׀‘׀�׀�׀�׀’׀�׀�׀˜!!!';
t['9'] = "׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀´׀¾׀´׀°ׁ‚׀½׀µ ׀»׀¸׀½׀÷׀¾׀²׀µ ׁƒ ׀¼׀µ׀½׀¸ׁ˜ׁƒ ׀»׀µ׀²׀¾<br>(Traviantoolbox, World Analyser, Travilog, Map, ׀¸ׁ‚׀´.)";
t['LARGEMAP'] = '׀’׀µ׀»׀¸׀÷׀° ׀¼׀°׀¿׀°';
t['USETHEMPR'] = '׀�ׁ€׀¾׀¿׀¾ׁ€ׁ†׀¸׀¾׀½׀°׀»׀½׀° ׀¿׀¾׀´׀µ׀»׀°';
t['USETHEMEQ'] = '׀ˆ׀µ׀´׀½׀°׀÷׀° ׀¿׀¾׀´׀µ׀»׀°';
t['TOWNHALL'] = '׀�׀¿ׁˆׁ‚׀¸׀½׀°';
t['GSRVT'] = '׀¡׀µׁ€׀²׀µׁ€';
t['NBO'] = '׀‘׀µ׀»׀µ׀¶׀½׀¸ׁ†׀°';
t['MNUL'] = '׀�׀µ׀½׀¸ ׁ�׀° ׀»׀µ׀²׀µ ׁ�ׁ‚ׁ€׀°׀½׀µ';
t['STAT'] = '׀¡ׁ‚׀°ׁ‚׀¸ׁ�ׁ‚׀¸׀÷׀°';
t['RESF'] = '׀ ׀µׁ�ׁƒׁ€ׁ�׀½׀° ׀¿׀¾ׁ™׀°';
t['VLC'] = '׀¦׀µ׀½ׁ‚׀°ׁ€ ׁ�׀µ׀»׀°';
t['MAPO'] = '׀�׀°׀¿׀°';
t['COLO'] = '׀‘׀¾ׁ˜׀µ';
t['DBGO'] = '׀¢ׁ€׀°׀¶׀µׁ�׀µ ׀³ׁ€׀µׁˆ׀°׀÷׀°';
t['4'] = '׀�׀¸ׁ˜׀°ׁ†׀°';
t['5'] = '׀�׀µׁ�ׁ‚׀¾ ׀¾׀÷ׁƒ׀¿ׁ™׀°ׁ�׀°/׀�׀°ׁ�׀°ׁ€׀½׀°/ׁ€׀°׀´׀¸׀¾׀½׀¸ׁ†׀°/׀¨ׁ‚׀°׀»׀°';
t['6'] = "׀�׀¿ׁˆׁ‚׀¸׀½׀°/׀”׀²׀¾ׁ€׀°ׁ† ׁ…׀µׁ€׀¾ׁ˜׀°/׀�׀¾׀²׀°ׁ‡׀½׀¸ׁ†׀° ׀¾׀÷׀»׀¾׀¿׀°/׀�׀¾׀²׀°ׁ‡׀½׀¸ׁ†׀° ׀¾ׁ€ׁƒ׀¶ׁ˜׀°";
t['HEROSMANSION'] = "׀”׀²׀¾ׁ€׀°ׁ† ׁ…׀µׁ€׀¾ׁ˜׀°";
t['BLACKSMITH'] = '׀�׀¾׀²׀°ׁ‡׀½׀¸ׁ†׀° ׀¾ׁ€ׁƒ׀¶ׁ˜׀°';
t['ARMOURY'] = '׀�׀¾׀²׀°ׁ‡׀½׀¸ׁ†׀° ׀¾׀÷׀»׀¾׀¿׀°';
t['NOW'] = '׀¡׀°׀´׀°';
t['CLOSE'] = '׀—׀°ׁ‚׀²׀¾ׁ€׀¸';
t['USE'] = '׀�׀¾ׁ€׀¸ׁ�ׁ‚׀¸';
t['USETHEM1H'] = '׀ˆ׀µ׀´׀½׀¾ׁ‡׀°ׁ�׀¾׀²׀½׀° ׀¿ׁ€׀¾׀¸׀·׀²׀¾׀´ׁ�׀°';
t['OVERVIEW'] = '׀�ׁ€׀µ׀³׀»׀µ׀´';
t['FORUM'] = '׀₪׀¾ׁ€ׁƒ׀¼';
t['ATTACKS'] = '׀�׀°׀¿׀°׀´׀¸';
t['NEWS'] = '׀’׀µׁ�ׁ‚׀¸';
t['ADDCRTPAGE'] = '׀”׀¾׀´׀°ׁ˜ ׁ‚ׁ€׀µ׀½ׁƒׁ‚׀½ׁƒ ׁ�ׁ‚ׁ€׀°׀½ׁƒ ׀÷׀°׀¾ ׀»׀¸׀½׀÷';
t['SCRPURL'] = 'TBeyond ׁ�׀°ׁ˜ׁ‚';
t['50'] = '׀‘ׁ€׀¾ׁ˜ ׀¸׀·׀²׀¸ׁ’׀°ׁ‡׀° ׀·׀°<br>"׀˜׀·׀²׀¸ׁ’׀°ׁ�׀µ" ׁ„ׁƒ׀½׀÷ׁ†׀¸ׁ˜ׁƒ';
t['SPACER'] = '׀ ׀°׀·׀¼׀°׀÷';
t['53'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ˜׀µ ׀¾ ׁ˜׀µ׀´׀¸׀½׀¸ׁ†׀¸ ׀÷׀°׀´ ׀¼׀¸ׁˆ ׀¿ׁ€׀µׁ’׀µ ׀¿ׁ€׀µ׀÷׀¾ ׁ�׀µ';
t['MEREO'] = '׀�׀¾ׁ€ׁƒ׀÷׀µ ׀¸ ׀¸׀·׀²׀µׁˆׁ‚׀°ׁ˜׀¸';
t['59'] = '׀‘ׁ€׀¾ׁ˜ ׁ�ׁ‚ׁ€׀°׀½׀° ׀¿׀¾ׁ€ׁƒ׀÷׀°/׀¸׀·׀²׀µׁˆׁ‚׀°ׁ˜׀° ׀·׀° ׀¿ׁ€׀¸׀÷׀°׀·<br>(׀�ׁ�׀½׀¾׀²׀½׀¾ = 1)';
t['ATTABLES'] = '׀�ׁ€׀µ׀³׀»׀µ׀´ ׀²׀¾ׁ˜ׁ�׀÷׀µ';
t['MTW'] = '׀�׀µ׀¸ׁ�׀÷׀¾ׁ€׀¸ׁˆׁ›׀µ׀½׀¾';
t['MTX'] = '׀˜׀¼׀° ׀²׀¸ׁˆ׀µ';
t['MTC'] = '׀¢ׁ€׀µ׀½ׁƒׁ‚׀½׀¾ ׁ�׀µ ׁˆ׀°ׁ™׀µ';
t['ALFL'] = '׀›׀¸׀½׀÷ ׀´׀¾ ׁ�׀¿׀¾ׁ™׀½׀¾׀³ ׁ„׀¾ׁ€ׁƒ׀¼׀°<br>(׀�ׁ�ׁ‚׀°׀²׀¸ׁ‚׀¸ ׀¿ׁ€׀°׀·׀½׀¾ ׀·׀° ׁ„׀¾ׁ€ׁƒ׀¼ ׀¸׀· ׀¸׀³ׁ€׀µ)';
t['82.L'] = '׀—׀°׀÷ׁ™ׁƒׁ‡׀°ׁ˜ ׀»׀¸׀½׀÷׀¾׀²׀µ (׀£׀÷׀»׀¾׀½׀¸, ׀¾׀±ׁ€׀¸ׁˆ׀¸, ׀³׀¾ׁ€׀µ, ׀´׀¾׀»׀µ ׀¸׀÷׀¾׀½׀µ)';
t['MTCL'] = '׀�׀±ׁ€׀¸ׁˆ׀¸ ׁ�׀²׀µ';
t['82.U'] = '׀�ׁ‚׀÷ׁ™ׁƒׁ‡׀°ׁ˜ ׀»׀¸׀½׀÷׀¾׀²׀µ (׀£׀÷׀»׀¾׀½׀¸, ׀¾׀±ׁ€׀¸ׁˆ׀¸, ׀³׀¾ׁ€׀µ, ׀´׀¾׀»׀µ ׀¸׀÷׀¾׀½׀µ)';
t['CKSORT'] = '׀�׀»׀¸׀÷׀½׀¸ ׀·׀° ׁ�׀¾ׁ€ׁ‚׀¸ׁ€׀°ׁ�׀µ';
t['MIN'] = '׀�׀¸׀½׀¸׀¼ׁƒ׀¼';
t['SVGL'] = '׀’׀°׀¶׀¸ ׀·׀° ׁ�׀²׀° ׁ�׀µ׀»׀°';
t['VGL'] = '׀¡׀¿׀¸ׁ�׀°׀÷ ׁ�׀µ׀»׀°';
t['12'] = "׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀»׀¸׀½׀÷׀¾׀²׀µ ׀´׀¾ 'dorf1.php' ׀¸ 'dorf2.php'";
t['UPDATEPOP'] = '׀�ׁ�׀²׀µ׀¶׀¸ ׀¿׀¾׀¿ׁƒ׀»׀°ׁ†׀¸ׁ˜ׁƒ';
t['54'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀´׀°ׁ™׀¸׀½׀µ ׀¸ ׀²ׁ€׀µ׀¼׀µ׀½׀° ׀´׀¾ ׁ�׀µ׀»׀° ׀÷׀°׀´ ׀¼׀¸ׁˆ ׀¿ׁ€׀µׁ’׀µ ׀¿ׁ€׀µ׀÷׀¾';
t['EDIT'] = '׀£ׁ€׀µ׀´׀¸';
t['NPCO'] = 'NPC ׀¿׀¾׀¼׀¾ׁ›׀½׀¸׀÷';
t['26'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ NPC ׀¿׀¾׀¼׀¾ׁ›׀½׀¸׀÷׀°';
t['58'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׁ‚׀°׀±׀µ׀»ׁƒ ׀¸׀³ׁ€׀°ׁ‡׀°/ׁ�׀µ׀»׀°/׀¾ׁ�׀²׀¾ׁ˜׀µ׀½׀¸ׁ… ׀´׀¾׀»׀¸׀½׀°';
t['NEWVILLAGEAV'] = '׀”׀°ׁ‚ׁƒ׀¼/׀’ׁ€׀µ׀¼׀µ';
t['TIMEUNTIL'] = '׀’ׁ€׀µ׀¼׀µ ׁ‡׀µ׀÷׀°ׁ�׀°';
t['61'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ "׀�׀±ׁ€׀¸ׁˆ׀¸ ׁ�׀²׀µ" ׁ‚׀°׀±׀µ׀»ׁƒ ׁƒ ׀¸׀·׀²׀µׁˆׁ‚׀°ׁ˜׀¸׀¼׀°';
t['62'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ "׀�׀¾ׁˆ׀°ׁ™׀¸ ׀¿׀¾ׁ€ׁƒ׀÷ׁƒ" ׀¸׀÷׀¾׀½ׁƒ ׀¸ ׀·׀° ׀¼׀¾ׁ˜ ׀½׀°׀»׀¾׀³';
t['CENTERMAP'] = '׀¦׀µ׀½ׁ‚ׁ€׀¸ׁ‚ׁ€׀°ׁ˜ ׀¼׀°׀¿ׁƒ ׀½׀° ׀¾׀²׀¾׀¼ ׁ�׀µ׀»ׁƒ';
t['13'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ "׀¦׀µ׀½ׁ‚ׁ€׀¸ׁ‚ׁ€׀°ׁ˜ ׀¼׀°׀¿ׁƒ ׀½׀° ׀¾׀²׀¾׀¼ ׁ�׀µ׀»ׁƒ" ׀¸׀÷׀¾׀½ׁƒ';
t['SENDTROOPS'] = '׀�׀¾ׁˆ׀°ׁ™׀¸ ׀²׀¾ׁ˜ׁ�׀÷ׁƒ';
t['64'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׁ�ׁ‚׀°ׁ‚׀¸ׁ�ׁ‚׀¸׀÷ׁƒ ׁƒ ׀¸׀·׀²׀µׁˆׁ‚׀°ׁ˜׀¸׀¼׀°';
t['7'] = "׀�׀°׀»׀°ׁ‚׀°/׀ ׀µ׀·׀¸׀´׀µ׀½ׁ†׀¸ׁ˜׀°/׀�׀÷׀°׀´׀µ׀¼׀¸ׁ˜׀°/׀ ׀¸׀·׀½׀¸ׁ†׀°";
t['PALACE'] = "׀�׀°׀»׀°ׁ‚׀°";
t['RESIDENCE'] = "׀ ׀µ׀·׀¸׀´׀µ׀½ׁ†׀¸ׁ˜׀°";
t['ACADEMY'] = "׀�׀÷׀°׀´׀µ׀¼׀¸ׁ˜׀°";
t['TREASURY'] = "׀ ׀¸׀·׀½׀¸ׁ†׀°";
t['60'] = '׀�ׁ€׀¸׀÷׀°׀¶׀¸ ׀»׀¸׀½׀÷ ׀·׀° ׀¾ׁ‚׀²׀°ׁ€׀°ׁ�׀µ ׀¿׀¾ׁ€ׁƒ׀÷׀° ׁƒ ׀¿׀¾ׁ�׀µ׀±׀½׀¾׀¼ ׀¿ׁ€׀¾׀·׀¾ׁ€ׁƒ';
break;
case "gr":
case "el"://by maintanosgr & ChuckNorris & Velonis Petros
//avRace = ['־¡ֿ‰־¼־±־¯־¿־¹', '־₪־µֿ�ֿ„־¿־½־µֿ‚', '־“־±־»־¬ֿ„־µֿ‚'];
t['8'] = '־£ֿ…־¼־¼־±ֿ‡־¯־±';
t['SIM'] = '־ ֿ�־¿ֿƒ־¿־¼־¿־¹ֿ‰ֿ„־®ֿ‚ ־¼־¬ֿ‡־·ֿ‚';
t['QSURE'] = '־•־¯ֿƒ־±־¹ ֿƒ־¯־³־¿ֿ…ֿ�־¿ֿ‚;';
t['LOSS'] = '־–־·־¼־¹־¬';
t['PROFIT'] = '־�־­ֿ�־´־¿ֿ‚';
t['EXTAV'] = '־”־¹־±־¸־­ֿƒ־¹־¼־· ־±־½־±־²־¬־¸־¼־¹ֿƒ־·';
t['PLAYER'] = '־ ־±־¯־÷ֿ„־·ֿ‚';
t['VILLAGE'] = '־§ֿ‰ֿ�־¹ֿ�';
t['POPULATION'] = '־ ־»־·־¸ֿ…ֿƒ־¼ֿ�ֿ‚';
t['COORDS'] = '־£ֿ…־½ֿ„־µֿ„־±־³־¼־­־½־µֿ‚';
t['MAPTBACTS'] = '־•־½־­ֿ�־³־µ־¹־µֿ‚';
t['SAVED'] = '־‘ֿ€־¿־¸־·־÷־µֿ�ֿ„־·־÷־µ';
t['YOUNEED'] = '־§ֿ�־µ־¹־¬־¶־µֿƒ־±־¹';
t['TODAY'] = 'ֿƒ־®־¼־µֿ�־±';
t['TOMORROW'] = '־±ֿ�ֿ�־¹־¿';
t['DAYAFTERTOM'] = '־¼־µ־¸־±ֿ�ֿ�־¹־¿';
t['MARKET'] = '־‘־³־¿ֿ�־¬';
t['BARRACKS'] = '־£ֿ„ֿ�־±ֿ„ֿ�ֿ€־µ־´־¿';
t['RAP'] = '־ ־»־±ֿ„־µ־¯־± ֿƒֿ…־³־÷־µ־½ֿ„ֿ�ֿ�ֿƒ־µֿ‰ֿ‚';
t['STABLE'] = '־£ֿ„־¬־²־»־¿ֿ‚';
t['WORKSHOP'] = '־•ֿ�־³־±ֿƒֿ„־®ֿ�־¹־¿';
t['SENDRES'] = '־‘ֿ€־¿ֿƒֿ„־¿־»־® ֿ€ֿ�ֿ�ֿ„ֿ‰־½ ֿ…־»ֿ�־½';
t['BUY'] = '־‘־³ֿ�ֿ�־±ֿƒ־µ';
t['SELL'] = '־ ־¿ֿ�־»־·ֿƒ־µ';
t['SENDIGM'] = '־‘ֿ€־¿ֿƒֿ„־¿־»־® ־¼־·־½ֿ�־¼־±ֿ„־¿ֿ‚';
t['LISTO'] = '־”־¹־±־¸־­ֿƒ־¹־¼־¿';
t['ON'] = 'ֿ„־·־½';
t['AT'] = 'ֿƒֿ„־¹ֿ‚';
t['EFICIENCIA'] = '־ ־»־·ֿ�ֿ�ֿ„־·ֿ„־±';
t['NEVER'] = '־ ־¿ֿ„־­';
t['ALDEAS'] = '־§ֿ‰ֿ�־¹ֿ�(־¬)';
t['TIEMPO'] = '־§ֿ�ֿ�־½־¿ֿ‚';
t['OFREZCO'] = '־ ֿ�־¿ֿƒֿ†־­ֿ�־µ־¹';
t['BUSCO'] = '־‘־½־±־¶־·ֿ„־µ־¯';
t['TIPO'] = '־₪ֿ�ֿ€־¿ֿ‚';
t['DISPONIBLE'] = '־�ֿ�־½־¿ ־´־¹־±־¸־­ֿƒ־¹־¼־±';
t['CUALQUIERA'] = '־�־»־±';
t['YES'] = '־�־±־¹';
t['NO'] = '־�ֿ‡־¹';
t['LOGIN'] = '־£ֿ�־½־´־µֿƒ־·';
t['MARCADORES'] = '־‘־³־±ֿ€־·־¼־­־½־±';
t['ANYADIR'] = '־ ֿ�־¿ֿƒ־¸־®־÷־·';
t['UBU'] = '־�־­־¿ ־±־³־±ֿ€־·־¼־­־½־¿ URL';
t['UBT'] = '־�־µ־¯־¼־µ־½־¿';
t['DEL'] = '־”־¹־±־³ֿ�־±ֿ†־®';
t['MAXTIME'] = '־�־­־³־¹ֿƒֿ„־¿ֿ‚ ֿ‡ֿ�ֿ�־½־¿ֿ‚';
t['ARCHIVE'] = '־‘ֿ�ֿ‡־µ־¯־¿';
t['SUMMARY'] = '־£ֿ�־½־¿ֿˆ־·';
t['TROPAS'] = '־£ֿ„ֿ�־±ֿ„־µֿ�־¼־±ֿ„־±';
t['CHKSCRV'] = '־‘־½־±־²־¬־¸־¼־¹ֿƒ־· TBeyond';
t['ACTUALIZAR'] = '־‘־½־±־½־­ֿ‰ֿƒ־µ ֿ€־»־·ֿ�־¿ֿ†־¿ֿ�־¯־µֿ‚ ֿ‡ֿ‰ֿ�־¹־¿ֿ�';
t['VENTAS'] = '־‘ֿ€־¿־¸־·־÷־µֿ…־¼־­־½־µֿ‚ ־ ֿ�־¿ֿƒֿ†־¿ֿ�־­ֿ‚';
t['MAPSCAN'] = '־£־¬ֿ�ֿ‰ֿƒ־· ֿ„־¿ֿ… ֿ‡־¬ֿ�ֿ„־·';
t['BIC'] = '־•־¼ֿ†־¬־½־¹ֿƒ־· ־¼־µ־³־¬־»ֿ‰־½ ־µ־¹־÷־¿־½־¹־´־¯ֿ‰־½';
t['22'] = '־•־¼ֿ†־¬־½־¹ֿƒ־· ֿ„־¿ֿ… ֿƒ־·־¼־µ־¹ֿ‰־¼־±ֿ„־¬ֿ�־¹־¿ֿ…';
t['SAVE'] = '־‘ֿ€־¿־¸־®־÷־µֿ…ֿƒ־·';
t['49'] = '־ ֿ�־¿־µֿ€־¹־»־¿־³־® ֿ€־»־±ֿ„־µ־¯־±ֿ‚ ֿƒֿ…־³־÷־µ־½ֿ„ֿ�ֿ�ֿƒ־µֿ‰ֿ‚';
t['AT2'] = '־•־½־¹ֿƒֿ‡ֿ�ֿƒ־µ־¹ֿ‚';
t['AT3'] = '־•ֿ€־¯־¸־µֿƒ־·: ־•־¹ֿƒ־²־¿־»־®';
t['AT4'] = '־•ֿ€־¯־¸־µֿƒ־·: ־•־¹ֿƒ־²־¿־»־® ־±ֿ�ֿ€־±־³־®ֿ‚';
t['24'] = '־�־­־³־µ־¸־¿ֿ‚ ֿƒ־·־¼־µ־¹ֿ‰־¼־±ֿ„־¬ֿ�־¹־¿ֿ…';
t['NBSA'] = '־‘ֿ…ֿ„ֿ�־¼־±ֿ„־¿';
t['NBSN'] = '־�־±־½־¿־½־¹־÷ֿ� (־¼־¹־÷ֿ�ֿ�)';
t['NBSB'] = '־�־µ־³־¬־»־· ־¿־¸ֿ�־½־· (־¼־µ־³־¬־»־¿)';
t['25'] = '־�ֿˆ־¿ֿ‚ ֿƒ־·־¼־µ־¹ֿ‰־¼־±ֿ„־¬ֿ�־¹־¿ֿ…';
t['NBAUTOEXPANDHEIGH'] = '־‘ֿ…ֿ„ֿ�־¼־±ֿ„־· ־µֿ€־­־÷ֿ„־±ֿƒ־· ֿ�ֿˆ־¿ֿ…ֿ‚';
t['NBHK'] = '־ ֿ�־¿־µֿ€־¹־»־µ־³־¼־­־½־¿ ֿ�ֿˆ־¿ֿ‚';
t['43'] = '־•־¼ֿ†־¬־½־¹ֿƒ־· ־÷־µ־½ֿ„ֿ�־¹־÷ֿ�־½ ־±ֿ�־¹־¸־¼ֿ�־½';
t['NPCSAVETIME'] = '־�־µֿ�־´־¯־¶־µ־¹ֿ‚: ';
t['38'] = '־”־µ־¯־¾־µ ֿ‡ֿ�ֿ�־¼־±ֿ„־± ־³־¹־± ֿ„־¿ ־µֿ€־¯ֿ€־µ־´־¿ ֿ„ֿ‰־½ ֿ€ֿ�ֿ�ֿ„ֿ‰־½ ֿ…־»ֿ�־½';
t['44'] = '־”־µ־¯־¾־µ ֿ‡ֿ�ֿ�־¼־±ֿ„־± ־³־¹־± ֿ„־¿ ־µֿ€־¯ֿ€־µ־´־¿ ֿ„ֿ‰־½ ־÷ֿ„־·ֿ�־¯ֿ‰־½';
t['65'] = '־§ֿ�ֿ�־¼־± ֿ�ֿ„־±־½ ֿ…ֿ€־¬ֿ�ֿ‡־µ־¹ ־´־¹־±־¸־­ֿƒ־¹־¼־· ־±־½־±־²־¬־¸־¼־¹ֿƒ־·<br>(־ ֿ�־¿־µֿ€־¹־»־¿־³־® = ־¬־´־µ־¹־¿)';
t['66'] = '־§ֿ�ֿ�־¼־± ֿ�ֿ„־±־½ ־µ־¯־½־±־¹ ֿƒֿ„־¿ ־µֿ€־¯ֿ€־µ־´־¿<br>(־ ֿ�־¿־µֿ€־¹־»־¿־³־® = ־¬־´־µ־¹־¿)';
t['67'] = '־§ֿ�ֿ�־¼־± ֿ�ֿ„־±־½ ־´־µ־½ ֿ…ֿ€־¬ֿ�ֿ‡־µ־¹ ־´־¹־±־¸־­ֿƒ־¹־¼־· ־±־½־±־²־¬־¸־¼־¹ֿƒ־·<br>(־ ֿ�־¿־µֿ€־¹־»־¿־³־® = ־¬־´־µ־¹־¿)';
t['68'] = '־§ֿ�ֿ�־¼־± ־³־¹־± ־±־½־±־²־¬־¸־¼־¹ֿƒ־· ־¼־­ֿƒֿ‰ ֿ„־¿ֿ… NPC<br>(־ ֿ�־¿־µֿ€־¹־»־¿־³־® = ־¬־´־µ־¹־¿)';
t['TOTALTROOPS'] = '־£ֿ…־½־¿־»־¹־÷־¬ ֿƒֿ„ֿ�־±ֿ„־µֿ�־¼־±ֿ„־± ֿ‡ֿ‰ֿ�־¹־¿ֿ�';
t['20'] = '־•־¼ֿ†־¬־½־¹ֿƒ־· ֿƒ־µ־»־¹־´־¿־´־µ־¹־÷ֿ„ֿ�־½';
t['U.2'] = '־¦ֿ…־»־®';
t['1'] = "Travian v2.x server";
t['SELECTALLTROOPS'] = "־•ֿ€־¹־»־¿־³־® ֿ�־»ֿ‰־½ ֿ„ֿ‰־½ ֿƒֿ„ֿ�־±ֿ„־µֿ…־¼־¬ֿ„ֿ‰־½";
t['PARTY'] = "־•־¿ֿ�ֿ„־±ֿƒֿ„־¹־÷־­ֿ‚ ־µ־÷־´־·־»ֿ�ֿƒ־µ־¹ֿ‚";
t['CPPERDAY'] = "־ ֿ�־½ֿ„־¿־¹ ־ ־¿־»־¹ֿ„־¹ֿƒ־¼־¿ֿ�/־¼־­ֿ�־±";
t['SLOT'] = "־”־¹־±־¸־­ֿƒ־¹־¼־¿ֿ‚ ֿ‡ֿ�ֿ�־¿ֿ‚";
t['TOTAL'] = "־£ֿ�־½־¿־»־¿";
t['SELECTSCOUT'] = "־‘־½־¯ֿ‡־½־µֿ…ֿƒ־·";
t['SELECTFAKE'] = "־‘־½ֿ„־¹ֿ€־µֿ�־¹ֿƒֿ€־±ֿƒ־¼ֿ�ֿ‚";
t['NOSCOUT2FAKE'] = "־•־¯־½־±־¹ ־±־´ֿ�־½־±ֿ„־¿ ־½־± ֿ‡ֿ�־·ֿƒ־¹־¼־¿ֿ€־¿־¹־®ֿƒ־µ־¹ֿ‚ ־±־½־¹ֿ‡־½־µֿ…ֿ„־­ֿ‚ ־³־¹־± ־±־½ֿ„־¹ֿ€־µֿ�־¹ֿƒֿ€־±ֿƒ־¼ֿ�!";
t['NOTROOP2FAKE'] = "־”־µ־½ ֿ…ֿ€־¬ֿ�ֿ‡־¿ֿ…־½ ֿƒֿ„ֿ�־±ֿ„־µֿ�־¼־±ֿ„־± ־³־¹־± ־±־½ֿ„־¹ֿ€־µֿ�־¹ֿƒֿ€־±ֿƒ־¼ֿ�!";
t['NOTROOP2SCOUT'] = "־”־µ־½ ֿ…ֿ€־¬ֿ�ֿ‡־¿ֿ…־½ ־±־½־¹ֿ‡־½־µֿ…ֿ„־­ֿ‚!";
t['NOTROOPS'] = "־”־µ־½ ֿ…ֿ€־¬ֿ�ֿ‡־¿ֿ…־½ ֿƒֿ„ֿ�־±ֿ„־µֿ�־¼־±ֿ„־± ֿƒֿ„־¿ ֿ‡ֿ‰ֿ�־¹ֿ�!";
t['ALL'] = "־�־»־±";
t['SH2'] = "־£ֿ„־± ֿ€־µ־´־¯־± ֿ‡ֿ�ֿ‰־¼־¬ֿ„ֿ‰־½ ־¼ֿ€־¿ֿ�־µ־¯ֿ‚ ־½־± ־²־¬־»־µ־¹ֿ‚:<br>- <b>green</b> ־® <b>reb</b> ־® <b>orange</b>, ־÷ֿ„־».<br>- ־÷ֿ�־´־¹־÷־± HEX ־³־¹־± ֿ‡ֿ�ֿ�־¼־¼־±ֿ„־± ֿ�ֿ€ֿ‰ֿ‚ <b>#004523</b><br>- ־¬ֿ†־·ֿƒ־µ ־÷־µ־½ֿ� ־³־¹־± ֿ€ֿ�־¿־µֿ€־¹־»־µ־³־¼־­־½־¿ ֿ‡ֿ�ֿ�־¼־±";
t['SOREP'] = "־”־µ־¯־¾־µ ־÷־±־½־¿־½־¹־÷־® ־±־½־±ֿ†־¿ֿ�־¬ (־³־¹־± ֿ€־¿ֿƒֿ„־¬ֿ�־¹ֿƒ־¼־±)";
t['56'] = "־”־µ־¯־¾־µ ֿ„־¿־½ ֿ„ֿ�ֿ€־¿ ֿ„־¿ֿ… ֿ‡ֿ‰ֿ�־±ֿ†־¹־¿ֿ�/ֿ„־·ֿ‚ ֿ�־±ֿƒ־·ֿ‚<br>ֿ�ֿ„־±־½ ֿ€־·־³־±־¯־½ֿ‰ ֿ€־¬־½ֿ‰ ־¼־µ ֿ„־¿ ֿ€־¿־½ֿ„־¯־÷־¹";
t['10'] = "Link ־³־¹־± ֿ€ֿ�־¿ֿƒ־¿־¼־¿־¹ֿ‰ֿ„־® ־¼־¬ֿ‡־·ֿ‚:<br>(־±ֿ�־¹ֿƒֿ„־µֿ�ֿ� ־¼־µ־½־¿ֿ�)";
t['WSIMO1'] = "־•ֿƒֿ‰ֿ„־µֿ�־¹־÷ֿ�ֿ‚ (ֿ€־±ֿ�־­ֿ‡־µֿ„־±־¹ ־±ֿ€ֿ� ֿ„־¿ ֿ€־±־¹ֿ‡־½־¯־´־¹)";
t['WSIMO2'] = "־•־¾ֿ‰ֿ„־µֿ�־¹־÷ֿ�ֿ‚ (ֿ€־±ֿ�־­ֿ‡־µֿ„־±־¹ ־±ֿ€ֿ� ֿ„־¿ kirilloid.ru)";
t['27'] = "־§ֿ�־®ֿƒ־· World Analyser";
t['28'] = "־”־µ־¯־¾־µ link ־³־¹־± ־±־½־±־»ֿ…ֿ„־¹־÷־¬ ֿƒֿ„־±ֿ„־¹ֿƒֿ„־¹־÷־¬";
t['NONEWVER'] = "־ˆֿ‡־µ־¹ֿ‚ ֿ„־·־½ ־½־µֿ�ֿ„־µֿ�־· ־´ֿ…־½־±ֿ„־® ־­־÷־´־¿ֿƒ־·";
t['BVER'] = "־ˆֿ‡־µ־¹ֿ‚ ־´־¿־÷־¹־¼־±ֿƒֿ„־¹־÷־® ־­־÷־´־¿ֿƒ־·";
t['NVERAV'] = '־”־¹־±־¸־­ֿƒ־¹־¼־· ־½־­־± ־­־÷־´־¿ֿƒ־·';
t['UPDSCR'] = "־�־± ־µ־½־·־¼־µֿ�ֿ‰־¸־µ־¯ ֿ„־¿ scipt ֿ„ֿ�ֿ�־±;";
t['CHECKUPDATE'] = "־ˆ־»־µ־³ֿ‡־¿ֿ‚ ־³־¹־± ־µ־½־·־¼־­ֿ�ֿ‰ֿƒ־· ֿ„־¿ֿ… script.<br>־ ־±ֿ�־±־÷־±־»ֿ� ֿ€־µֿ�־¹־¼־­־½־µֿ„־µ...";
t['AVPPV'] = "־�־­ֿƒ־¿ֿ‚ ֿ€־»־·־¸ֿ…ֿƒ־¼ֿ�ֿ‚ ־±־½־± ֿ‡ֿ‰ֿ�־¹ֿ�";
t['AVPPP'] = "־�־­ֿƒ־¿ֿ‚ ֿ€־»־·־¸ֿ…ֿƒ־¼ֿ�ֿ‚ ־±־½־¬ ֿ€־±־¯־÷ֿ„־·";
t['37'] = "־”־µ־¯־¾־µ ֿ„־¿־½ ֿ€־¯־½־±־÷־± ־±־½־±־²־±־¸־¼־¯ֿƒ־µֿ‰־½ ־³־¹־± ֿ„־¹ֿ‚ ֿ€ֿ�ֿ�ֿ„־µֿ‚ ֿ�־»־µֿ‚";
t['41'] = "־”־µ־¯־¾־µ ֿ„־¿־½ ֿ€־¯־½־±־÷־± ־±־½־±־²־±־¸־¼־¯ֿƒ־µֿ‰־½ ־³־¹־± ֿ„־± ־÷ֿ„־®ֿ�־¹־±";
t['69'] = "Console Log Level<br><b>־�־�־�־� ־“־™־‘ ־ ־¡־�־“־¡־‘־�־�־‘־₪־‘־₪־™־£־₪־•־£ ־‰ ־‘־ ־‘־£־¦־‘־›־�־‘־₪־©־£־—</b><br>(־ ֿ�־¿־µֿ€־¹־»־¿־³־® = 0)";
t['48'] = "־‘ֿ�־¹־¸־¼ֿ�ֿ‚ ֿ„ֿ‰־½ ֿƒ־µ־»־¯־´ֿ‰־½ ־³־¹־± ֿ†ֿ�ֿ�ֿ„ֿ‰ֿƒ־·<br>־¼־­ֿƒ־± ֿƒֿ„־·־½ ־±־³־¿ֿ�־¬ => ֿƒֿ„־·־½ ֿƒ־µ־»־¯־´־± '־‘־³־¿ֿ�־¬ֿƒֿ„־µ'<br>(־ ֿ�־¿־µֿ€־¹־»־¿־³־® = 1, ־�־­־³־¹ֿƒֿ„־¿ = 5)";
t['U.3'] = "־�־½־¿־¼־± ֿ€ֿ�ֿ‰ֿ„־µֿ�־¿ֿ…ֿƒ־±ֿ‚<br><b>־�־·־½ ֿ„־¿ ֿ€־µ־¹ֿ�־¬־¶־µ־¹ֿ‚, ־±־½' ־±ֿ…ֿ„־¿ֿ� ־µֿ€־¹ֿƒ־÷־­ֿˆ־¿ֿ… ֿ„־¿ ֿ€ֿ�־¿ֿ†־¯־» ֿƒ־¿ֿ…</b>";
t['U.6'] = "־£ֿ…־½ֿ„־µֿ„־±־³־¼־­־½־µֿ‚ ֿ€ֿ�ֿ‰ֿ„־µֿ�־¿ֿ…ֿƒ־±ֿ‚<br><b>־�־·־½ ֿ„־¿ ֿ€־µ־¹ֿ�־¬־¶־µ־¹ֿ‚, ־±־½' ־±ֿ…ֿ„־¿ֿ� ־µֿ€־¹ֿƒ־÷־­ֿˆ־¿ֿ… ֿ„־¿ ֿ€ֿ�־¿ֿ†־¯־» ֿƒ־¿ֿ…</b>";
t['MAX'] = '־�־­־³־¹ֿƒֿ„־¿';
t['TOTTRTR'] = '־£ֿ…־½־¿־»־¹־÷־¬ ֿƒֿ„ֿ�־±ֿ„־µֿ�־¼־±ֿ„־± ֿƒ־µ ־µ־÷ֿ€־±־¯־´־µֿ…ֿƒ־·';
t['57'] = '־”־µ־¯־¾־µ ־±ֿ€־¿ֿƒֿ„־¬ֿƒ־µ־¹ֿ‚ ־÷־±־¹ ֿ‡ֿ�ֿ�־½־¿ֿ…ֿ‚';
t['TB3SL'] = TB3O.shN + ' ־¡ֿ…־¸־¼־¯ֿƒ־µ־¹ֿ‚';
t['UPDALLV'] = '־•־½־·־¼־­ֿ�ֿ‰ֿƒ־µ ֿ�־»־± ֿ„־± ֿ‡ֿ‰ֿ�־¹־¬. ־§־¡־—־£־™־�־�־ ־�־™־—־£־• ־₪־� ־�־• ־�־•־“־‘־›־— ־ ־¡־�־£־�־§־— ־�־‘־˜־©־£ ־�־ ־�־¡־•־™ ־�־‘ ־‘־ ־�־’־›־—־˜־•־™־£ !!!';
t['9'] = "־”־µ־¯־¾־µ ־µֿ€־¹ֿ€־»־­־¿־½ link ֿƒֿ„־¿ ־±ֿ�־¹ֿƒֿ„־µֿ�ֿ� ־¼־µ־½־¿ֿ�<br>(Traviantoolbox, World Analyser, Travilog, TravMap, ־÷ֿ„־».)";
t['LARGEMAP'] = '־�־µ־³־¬־»־¿ֿ‚ ֿ‡־¬ֿ�ֿ„־·ֿ‚';
t['USETHEMPR'] = '־§ֿ�־·ֿƒ־¹־¼־¿ֿ€־¿־¯־·ֿƒ־µ ֿ„־± (־±־½־±־»־¿־³־¹־÷־¬)';
t['USETHEMEQ'] = '־§ֿ�־·ֿƒ־¹־¼־¿ֿ€־¿־¯־·ֿƒ־µ ֿ„־± (־¯ֿƒ־±)';
t['TOWNHALL'] = '־”־·־¼־±ֿ�ֿ‡־µ־¯־¿';
t['GSRVT'] = 'Server ־ ־±־¹ֿ‡־½־¹־´־¹־¿ֿ�';
t['ACCINFO'] = '־ ־»־·ֿ�־¿ֿ†־¿ֿ�־¯־µֿ‚ ־»־¿־³־±ֿ�־¹־±ֿƒ־¼־¿ֿ�';
t['NBO'] = '־£־·־¼־µ־¹ֿ‰־¼־±ֿ„־¬ֿ�־¹־¿';
t['MNUL'] = '־�־µ־½־¿ֿ� ֿƒֿ„־¿ ־±ֿ�־¹ֿƒֿ„־µֿ�ֿ� ־¼־­ֿ�־¿ֿ‚';
t['STAT'] = '־£ֿ„־±ֿ„־¹ֿƒֿ„־¹־÷־¬';
t['RESF'] = '־§ֿ‰ֿ�־¬ֿ†־¹־± ֿ€ֿ�ֿ�ֿ„ֿ‰־½ ֿ…־»ֿ�־½';
t['VLC'] = '־�־­־½ֿ„ֿ�־¿ ֿ‡ֿ‰ֿ�־¹־¿ֿ�';
t['MAPO'] = '־•ֿ€־¹־»־¿־³־­ֿ‚ ֿ‡־¬ֿ�ֿ„־·';
t['COLO'] = '־•ֿ€־¹־»־¿־³־­ֿ‚ ֿ‡ֿ�ֿ‰־¼־¬ֿ„ֿ‰־½';
t['DBGO'] = '־•ֿ€־¹־»־¿־³־­ֿ‚ ־±ֿ€־±ֿƒֿ†־±־»־¼־¬ֿ„ֿ‰ֿƒ־·ֿ‚';
t['4'] = '־‘־³־¿ֿ�־¬';
t['5'] = '>־ ־»־±ֿ„־µ־¯־± ֿƒֿ…־³־÷־µ־½ֿ„ֿ�ֿ�ֿƒ־µֿ‰ֿ‚/־£ֿ„ֿ�־±ֿ„ֿ�ֿ€־µ־´־¿/־•ֿ�־³־±ֿƒֿ„־®ֿ�־¹־¿/־£ֿ„־¬־²־»־¿ֿ‚';
t['6'] = "־”־·־¼־±ֿ�ֿ‡־µ־¯־¿/־ ־µֿ�־¹־¿ֿ‡־® ־·ֿ�ֿ�ֿ‰־½/־ ־±־½־¿ֿ€־»־¿ֿ€־¿־¹־µ־¯־¿/־�ֿ€־»־¿ֿ€־¿־¹־µ־¯־¿";
t['HEROSMANSION'] = "־ ־µֿ�־¹־¿ֿ‡־® ־·ֿ�ֿ�ֿ‰־½";
t['BLACKSMITH'] = '־�ֿ€־»־¿ֿ€־¿־¹־µ־¯־¿';
t['ARMOURY'] = '־ ־±־½־¿ֿ€־»־¿ֿ€־¿־¹־µ־¯־¿';
t['NOW'] = '־₪ֿ�ֿ�־±';
t['CLOSE'] = '־�־»־µ־¯ֿƒ־¹־¼־¿';
t['USE'] = '־§ֿ�־®ֿƒ־·';
t['USETHEM1H'] = '־§ֿ�־·ֿƒ־¹־¼־¿ֿ€־¿־¯־·ֿƒ־µ ֿ„־± (1 ֿ‰ֿ�־¹־±־¯־± ֿ€־±ֿ�־±־³ֿ‰־³־®)';
t['OVERVIEW'] = '־•ֿ€־¹ֿƒ־÷ֿ�ֿ€־·ֿƒ־·';
t['FORUM'] = '־¦ֿ�ֿ�־¿ֿ…־¼ (Forum)';
t['ATTACKS'] = '־•ֿ€־¹־¸־­ֿƒ־µ־¹ֿ‚';
t['NEWS'] = '־�־­־±';
t['ADDCRTPAGE'] = '־ ֿ�ֿ�ֿƒ־¸־µֿƒ־µ ֿ„ֿ�־­ֿ‡־¿ֿ…ֿƒ־± ֿƒ־µ־»־¯־´־± ֿ‰ֿ‚ ֿƒ־µ־»־¹־´־¿־´־µ־¯־÷ֿ„־·';
t['SCRPURL'] = 'TBeyond website';
t['50'] = '־‘ֿ�־¹־¸־¼ֿ�ֿ‚ ־±־½־¹ֿ‡־½־µֿ…ֿ„ֿ�־½ ־³־¹־± ֿ„־·־½<br>־»־µ־¹ֿ„־¿ֿ…ֿ�־³־¯־± "־‘־½־¯ֿ‡־½־µֿ…ֿƒ־·"';
t['SPACER'] = '־”־¹־¬ֿƒֿ„־·־¼־±';
t['53'] = '־”־µ־¯־¾־µ ֿ€־»־·ֿ�־¿ֿ†־¿ֿ�־¯־µֿ‚ ֿƒֿ„ֿ�־±ֿ„־¹ֿ‰ֿ„ֿ�־½<br>ֿƒ־µ ֿ€־±ֿ�־¬־¸ֿ…ֿ�־¿ ֿƒֿ…־¼־²־¿ֿ…־»ֿ�־½';
t['MEREO'] = '־�־·־½ֿ�־¼־±ֿ„־± & ־‘־½־±ֿ†־¿ֿ�־­ֿ‚';
t['59'] = '־‘ֿ�־¹־¸־¼ֿ�ֿ‚ ־¼־·־½ֿ…־¼־¬ֿ„ֿ‰־½/־±־½־±ֿ†־¿ֿ�ֿ�־½ ־³־¹־± ֿ†ֿ�ֿ�ֿ„ֿ‰־¼־±<br>(־ ֿ�־¿־µֿ€־¹־»־¿־³־® =1, ־�־­־³־¹ֿƒֿ„־¿ = 5)';
t['ATTABLES'] = '־ ־¯־½־±־÷־µֿ‚ ֿƒֿ„ֿ�־±ֿ„־µֿ…־¼־¬ֿ„ֿ‰־½';
t['MTW'] = '־§־¬ֿƒ־¹־¼־¿';
t['MTX'] = '־¥ֿ€־­ֿ�־²־±ֿƒ־·';
t['MTC'] = '־₪ֿ�־­ֿ‡־¿־½ ֿ†־¿ֿ�ֿ„־¯־¿';
t['ALFL'] = 'Link ֿƒ־µ ־µ־¾ֿ‰ֿ„־µֿ�־¹־÷ֿ� ֿ†ֿ�ֿ�־¿ֿ…־¼<br>(ג€™ֿ†־·ֿƒ־µ ֿ„־¿ ־¬־´־µ־¹־¿ ־³־¹־± ֿ„־¿ ־µֿƒֿ‰ֿ„־µֿ�־¹־÷ֿ� ֿ†ֿ�ֿ�־¿ֿ…־¼)';
t['82.L'] = '־�־»־µ־¯־´ֿ‰ֿƒ־µ ֿ„־¿ֿ…ֿ‚ ֿƒ־µ־»־¹־´־¿־´־µ־¯־÷ֿ„־µֿ‚ (־÷ֿ�ֿ�ֿˆ־µ ֿ„־± ־´־¹־±־³ֿ�־±ֿ†־®, ־¼־µֿ„־±־÷־¯־½־·ֿƒ־µ ֿ€־¬־½ֿ‰/ֿ€־¬ֿ„ֿ‰ ־µ־¹־÷־¿־½־¯־´־¹־±)';
t['MTCL'] = '־�־±־¸־±ֿ�־¹ֿƒ־¼ֿ�ֿ‚';
t['82.U'] = '־�־µ־÷־»־µ־¯־´ֿ‰ֿƒ־µ ֿ„־¿ֿ…ֿ‚ ֿƒ־µ־»־¹־´־¿־´־µ־¯־÷ֿ„־µֿ‚ (־´־µ־¯־¾־µ ֿ„־± ־´־¹־±־³ֿ�־±ֿ†־®, ־¼־µֿ„־±־÷־¯־½־·ֿƒ־µ ֿ€־¬־½ֿ‰/ֿ€־¬ֿ„ֿ‰ ־µ־¹־÷־¿־½־¯־´־¹־±)';
t['CKSORT'] = '־�־»־¹־÷ ־³־¹־± ֿ„־±־¾־¹־½ֿ�־¼־·ֿƒ־·';
t['MIN'] = 'Min';
t['SVGL'] = '־�־¿־¹־½ֿ� ֿƒ־µ ֿ�־»־± ֿ„־± ֿ‡ֿ‰ֿ�־¹־¬';
t['VGL'] = '־›־¯ֿƒֿ„־± ֿ‡ֿ‰ֿ�־¹ֿ�־½';
t['12'] = "־”־µ־¯־¾־µ ֿ„־± link 'dorf1.php' ־÷־±־¹ 'dorf2.php'";
t['UPDATEPOP'] = '־•־½־·־¼־­ֿ�ֿ‰ֿƒ־µ ֿ„־¿־½ ֿ€־»־·־¸ֿ…ֿƒ־¼ֿ�';
t['54'] = '־”־µ־¯־¾־µ ־±ֿ€ֿ�ֿƒֿ„־±ֿƒ־· ־÷־±־¹ ֿ‡ֿ�ֿ�־½־¿ֿ…ֿ‚ ֿƒֿ„־± ֿ‡ֿ‰ֿ�־¹־¬<br>ֿƒ־µ ֿ€־±ֿ�־¬־¸ֿ…ֿ�־¿ ֿƒֿ…־¼־²־¿ֿ…־»ֿ�־½';
t['EDIT'] = '־•ֿ€־µ־¾־µֿ�־³־±ֿƒ־¯־±';
t['NPCO'] = '־•ֿ€־¹־»־¿־³־­ֿ‚ ֿ„־¿ֿ… NPC ־²־¿־·־¸־¿ֿ�';
t['26'] = '־”־µ־¯־¾־µ ֿ„־¿ֿ…ֿ‚ ֿ…ֿ€־¿־»־¿־³־¹ֿƒ־¼־¿ֿ�ֿ‚/link ֿ„־¿ֿ… NPC ־²־¿־·־¸־¿ֿ�';
t['58'] = '־”־µ־¯־¾־µ ֿ„־¿־½ ֿ€־¯־½־±־÷־± ֿ„ֿ‰־½ ֿ€־±־¹־÷ֿ„ֿ�־½/ֿ‡ֿ‰ֿ�־¹ֿ�־½/־÷־±ֿ„־µ־¹־»־·־¼־­־½ֿ‰־½ ־¿־¬ֿƒ־µֿ‰־½';
t['NEWVILLAGEAV'] = '־—־¼־µֿ�־¿־¼־·־½־¯־±/־�ֿ�־±';
t['TIMEUNTIL'] = '־§ֿ�ֿ�־½־¿ֿ‚ ־½־± ֿ€־µֿ�־¹־¼־­־½־µ־¹ֿ‚';
t['61'] = '־”־µ־¯־¾־µ ֿ„־¿־½ ֿ€־¯־½־±־÷־± "־”־¹־±־³ֿ�־±ֿ†־®" ֿƒֿ„־·־½ ֿƒ־µ־»־¯־´־± ־±־½־±ֿ†־¿ֿ�ֿ�־½';
t['62'] = '־”־µ־¯־¾־µ ֿ„־¿ "־‘ֿ€־¿ֿƒֿ„־¿־»־® ־¼־·־½ֿ�־¼־±ֿ„־¿ֿ‚ IGM" ־µ־¹־÷־¿־½־¯־´־¹־¿ ־³־¹־± ־¼־­־½־±, ־µֿ€־µ־¯ֿƒ־·ֿ‚';
t['CENTERMAP'] = '־•ֿ€־¹־÷־­־½ֿ„ֿ�ֿ‰ֿƒ־· ֿ‡־¬ֿ�ֿ„־· ֿƒ־µ ־±ֿ…ֿ„ֿ� ֿ„־¿ ֿ‡ֿ‰ֿ�־¹ֿ�';
t['13'] = '־”־µ־¯־¾־µ ֿ„־¿ "־•ֿ€־¹־÷־­־½ֿ„ֿ�ֿ‰ֿƒ־· ֿ‡־¬ֿ�ֿ„־· ֿƒ־µ ־±ֿ…ֿ„ֿ� ֿ„־¿ ֿ‡ֿ‰ֿ�־¹ֿ�" ־µ־¹־÷־¿־½־¯־´־¹־¿';
t['SENDTROOPS'] = '־‘ֿ€־¿ֿƒֿ„־¿־»־® ֿƒֿ„ֿ�־±ֿ„־µֿ…־¼־¬ֿ„ֿ‰־½';
t['64'] = '־”־µ־¯־¾־µ ־»־µֿ€ֿ„־¿־¼־­ֿ�־µ־¹־µֿ‚ ֿƒֿ„־±ֿ„־¹ֿƒֿ„־¹־÷ֿ�־½ ֿƒֿ„־¹ֿ‚ ־‘־½־±ֿ†־¿ֿ�־­ֿ‚';
t['7'] = "־ ־±־»־¬ֿ„־¹/־�־­־³־±ֿ�־¿/־‘־÷־±־´־·־¼־¯־±/־˜־·ֿƒ־±ֿ…ֿ�־¿ֿ†ֿ…־»־¬־÷־¹־¿";
t['PALACE'] = "־ ־±־»־¬ֿ„־¹";
t['RESIDENCE'] = "־�־­־³־±ֿ�־¿";
t['ACADEMY'] = "־‘־÷־±־´־·־¼־¯־±";
t['TREASURY'] = "־˜־·ֿƒ־±ֿ…ֿ�־¿ֿ†ֿ…־»־¬־÷־¹־¿";
t['45'] = "־”־µ־¯־¾־µ ֿ„־¿ ־µֿ€־¯ֿ€־µ־´־¿ ֿ„־¿ֿ… ־÷ֿ„־·ֿ�־¯־¿ֿ… ֿ€־¿ֿ… ־±־½־±־²־±־¸־¼־¯־¶־µֿ„־±־¹ ־½־± ־±־½־±־²־¿ֿƒ־²־®־½־µ־¹";
t['60'] = '־”־µ־¯־¾־µ links ־³־¹־± ־½־± ־±־½־¿־¯־³־¿ֿ…־½ ֿ„־± ־¼ֿ…־½־®־¼־±ֿ„־±<br>ֿƒ־µ ־±־½־±־´ֿ…ֿ�־¼־µ־½־¿ ֿ€־±ֿ�־¬־¸ֿ…ֿ�־¿';
t['36'] = "־•־¼ֿ†־¬־½־¹ֿƒ־· ־¥ֿ€־¿־»־¿־³־¹ֿƒ־¼ֿ�־½ '־�־­ֿ‡ֿ�־¹<br>ֿ„ֿ�ֿ„־µ/־¥ֿ€ֿ�־»־¿־¹ֿ€־¿' ֿƒֿ„־¿ֿ…ֿ‚ ֿ€־¯־½־±־÷־µֿ‚ ־±־½־±־²־¬־¸־¼־¹ֿƒ־·ֿ‚/־µ־÷ֿ€־±־¯־´־µֿ…ֿƒ־·ֿ‚";
t['RESIDUE'] = '־¥ֿ€ֿ�־»־¿־¹ֿ€־¿ ־±־½ ֿ‡ֿ„־¯ֿƒ־µ־¹ֿ‚';
t['RESOURCES'] = ' ־�־»־µֿ‚';
break;
case "kr"://by Daniel Cliff & Sapziller
//avRace = ['כ¡�כ§ˆ', 'ם��ם„´', 'ך°ˆכ¦¬ל•„'];
t['1'] = "Travian v2.x ל„�כ²„";
t['2'] = 'ך´‘ך³  כ°°כ„ˆ ל �ך±°';
t['3'] = 'Force T3.1 Legionnaire & Phalanx capacity calculation<br>(for mixed T3.1 & T3.5 servers)';
t['4'] = 'ל‹�ל�¥';
t['5'] = 'ל§‘ך²°ל§€/כ³‘ל˜�/ך³µכ°©/כ§ˆךµ¬ך°„';
t['6'] = "כ§ˆל�„ם��ך´€/ל˜�ל›… ל €םƒ�/כ³‘ך¸°ך³ /כ�€ל�¥ך°„";
t['7'] = "ך¶�ל „/ל €םƒ�/ל—°ךµ¬ל†�/כ³´כ¬¼ל°½ך³ ";
t['8'] = 'כ�™כ§¹';
t['9'] = "ל™¼ל×½ כ©”כ‰´ל—� ל¶”ך°€ כ§�ם�¬ כ³´ל�´ך¸° <br>(Traviantoolbox, World Analyser, Travilog, Map, כ“±.)";
t['10'] = "ל‚¬ל�©ם•  ל „םˆ¬ ל‹�כ®¬כ ˆל�´ם„°:<br>(ל™¼ל×½כ©”כ‰´)";
t['11'] = "ך¸€ ל“°ך¸°כ¥¼ ל�„ם•´ ל‚¬ל�©ם•  כ³´ך³ ל„� ל‚¬ל�´ם�¸";
t['12'] = "'dorf1.php(כ§ˆל�„ כ‘˜כ�¬כ³´ך¸°)' ך³¼ 'dorf2.php(כ§ˆל�„ ל₪‘ל‹¬)' כ§�ם�¬ כ³´ל�´ך¸°";
t['13'] = '"ל₪‘ל•™ ל§€כ�„" ל•„ל�´ל½˜ כ³´ל�´ך¸°';
t['14'] = "כ§ˆל�„ כ×©כ¡�ל—� 'כ¶€כ�€ כ³´כ‚´ך¸°/ל��ל›� כ³´כ‚´ך¸°' ל•„ל�´ל½˜ כ³´ל�´ך¸°";
t['15'] = "כ§ˆל�„ כ×©כ¡�ל—� ל‹�ך°„כ‹¹ ל��ל›� לƒ�ל‚°כ�‰ כ³´ל�´ך¸°";
t['16'] = "כ§ˆל�„ כ×©כ¡�ל—� ל‹₪ל � כ†�ל�‘כ¬¼ לƒ�ל‚°כ�‰ כ³´ל�´ך¸°";
t['17'] = "כ§ˆל�„ כ×©כ¡�ל—� ל�¸ךµ¬ לˆ˜ כ³´ל�´ך¸°";
t['18'] = 'כ§ˆל�„ כ×©כ¡� ל°½ל�„ ל�´כ�™ ך°€כ�¥ם•� ל°½ל�¼כ¡� כ³´ל�´ך¸°';
t['19'] = 'כ§ˆל�„ כ×©כ¡�ל—� ך±´כ¬¼ ל§“ך¸° לƒ�ם™©ך³¼ כ¶€כ�€ ל�´כ�™ לƒ�ם™© כ³´ל�´ך¸°';
t['20'] = 'כ¶�כ§ˆם�¬ כ³´ל�´ך¸°';
t['21'] = "'כ¶�כ§ˆם�¬'כ¥¼ ל�´כ�™ ך°€כ�¥ם•� ל°½ל�¼כ¡� כ³´ל�´ך¸°";
t['22'] = 'כ…¸ם�¸ כ³´ל�´ך¸°';
t['23'] = "'כ…¸ם�¸'כ¥¼ ל�´כ�™ ך°€כ�¥ם•� ל°½ל�¼כ¡� כ³´ל�´ך¸°";
t['24'] = 'כ…¸ם�¸ ם�¬ך¸°';
t['25'] = 'כ…¸ם�¸ כ†’ל�´';
t['26'] = 'NPC ךµ�ל—­ כ§�ם�¬ כ°� ך³„ל‚°ך°’ כ³´ל�´ך¸°';
t['27'] = "ל‚¬ל�©ם•  World Analyser";
t['28'] = "World Analyser ם†µך³„ כ§�ם�¬ כ³´ל�´ך¸°";
t['29'] = 'ל‚¬ל�©ם•  Map Analyser';
t['30'] = 'ל‚¬ל�©ל��ל�˜ ל§€כ�„ לƒ� ל�„ל¹˜ כ§�ם�¬ כ³´ל�´ך¸°';
t['31'] = 'כ�™כ§¹ל›�ל�˜ ל§€כ�„ לƒ� ל�„ל¹˜ כ§�ם�¬ כ³´ל�´ך¸°';
t['32'] = "'ל°¾ך¸° כ°”' כ³´ל�´ך¸°";
t['33'] = "'ל°¾ך¸° כ°”'כ¥¼ ל�´כ�™ ך°€כ�¥ם•� ל°½ל�¼כ¡� כ³´ל�´ך¸°";
t['34'] = "ל—…ך·¸כ ˆל�´כ“� ם…�ל�´כ¸”ל—� ם•˜כ£¨ כ‹¹ כ¬¸ם™”ל �לˆ˜ ם��כ“� ל •כ³´ כ³´ל�´ך¸°";
t['35'] = "ל—…ך·¸כ ˆל�´כ“� ם…�ל�´כ¸”ל—� ל�‘כ¬¼ ל†�כ¹„כ�‰ ל¦�ך°€ כ³´ל�´ך¸°";
t['36'] = "ל—…ך·¸כ ˆל�´כ“�/ם›ˆכ ¨ ם…�ל�´כ¸”ל—� ל˜ˆלƒ� ל��ל›�ך³¼ ך±´ל¶•/ל—…ך·¸כ ˆל�´כ“� ם›„ כ‚¨כ�” ל˜ˆלƒ� ל��ל›� ם‘�ל‹�";
t['37'] = "ל��ל›� ם•„כ“�ל—� ל—…ך·¸כ ˆל�´כ“� ם…�ל�´כ¸” כ³´ל�´ך¸°";
t['38'] = 'ל��ל›�ם•„כ“� כ ˆכ²¨ לƒ‰ כ³´ל�´ך¸°';
t['39'] = "'ל��ל›� כ°”' ם…�ל�´כ¸” כ³´ל�´ך¸°";
t['40'] = "'ל��ל›� כ°”' ם…�ל�´כ¸”ל�„ ל�´כ�™ ך°€כ�¥ם•� ל°½ל�¼כ¡� כ³´ל�´ך¸°";
t['41'] = "ך±´כ¬¼ל—� ל—…ך·¸כ ˆל�´כ“� ם…�ל�´כ¸” כ³´ל�´ך¸°";
t['42'] = 'ל—…ך·¸כ ˆל�´כ“� ם…�ל�´כ¸”ל�˜ ך±´כ¬¼ ל •כ³´כ¥¼ ל�´כ¦„לˆ�ל�¼כ¡� ל •כ ¬';
t['43'] = 'כ§ˆל�„ ך±´כ¬¼ל—� כ ˆכ²¨ כ³´ל�´ך¸°';
t['44'] = 'כ¹�כ”© כ ˆכ²¨ לƒ‰ כ³´ל�´ך¸°';
t['45'] = "ל—…ך·¸כ ˆל�´כ“� ל₪‘ל�¸ ך±´כ¬¼ל�˜ כ ˆכ²¨ ך¹�כ¹¡ל�´ך¸°";
t['46'] = "לƒ�ל�¸ל�´ כ�„ל°©ם–ˆל�„ כ•� ל´� ל��ל›� ל •כ³´ כ³´ל�´ך¸°";
t['47'] = "כ§ˆל§€כ§‰ל�¼כ¡� ל�´כ°˜ם•� ל��ל›�כ�‰ כ³´ל�´ך¸°";
t['48'] = "'ל�¥ם„° => ךµ¬ל�…' ל„ םƒ�ל‹� כ¯¸כ¦¬ ל�½ל–´כ“₪ל�¼ ל �ל•ˆ ם�˜ל�´ל§€ לˆ˜ (ך¸°כ³¸ך°’ = 1)";
t['49'] = 'ל§‘ך²°ל§€ ך¸°כ³¸ ם–‰כ�™ ל„₪ל •';
t['50'] = '"ל •ל°°כ³‘ ל„ םƒ�"ל—� ל‚¬ל�©ם•  לˆ˜ ל�ˆכ�” ל •ל°°כ³‘ל�˜ לˆ˜';
t['51'] = "כ§ˆל§€כ§‰ ך³µך²© ל„₪ל • כ³´ל�´ך¸°";
t['52'] = "כ§ˆל§€כ§‰ ך³µך²© כ�€לƒ� ל¢�ם‘� כ³´ל�´ך¸°/ל‚¬ל�©ם•˜ך¸°";
t['53'] = 'םˆ´ם��ל—� כ¶€כ�€ ל •כ³´ כ³´ל�´ך¸°';
t['54'] = 'םˆ´ם��ל—� כ§ˆל�„ך¹�ל§€ל�˜ ך±°כ¦¬ל™€ ל‹�ך°„ כ³´ל�´ך¸°';
t['55'] = "כ‚´ל�¥ ל „םˆ¬ ל‹�כ®¬כ ˆל�´ם„°ל—� ל‚¬ל�© ך°€כ�¥ם•� כ¶€כ�€ כ‚´ל—­ל�„ ל��כ�™ל�¼כ¡� ל±„ל�°ך¸°";
t['56'] = "ל§€כ�„ ל�„ל—� כ§ˆל�°ל�₪כ¥¼ ל˜¬כ¦¬כ©´ ל§€ל—­ל�˜ ל¢…כ¥˜ל™€ ל˜₪ל•„ל‹�ל�₪ ל •כ³´ כ³´ל�´ך¸°";
t['57'] = 'ך±°כ¦¬ל™€ ל‹�ך°„ כ³´ל�´ך¸°';
t['58'] = 'ל‚¬ל�©ל��/כ§ˆל�„/ל°¨ל§€ם•� ל˜₪ל•„ל‹�ל�₪ל—� כ�€ם•� כ×©כ¡� כ³´ל�´ך¸°';
t['59'] = 'כ¯¸כ¦¬ ל�½ל–´כ“₪ל�¼ כ©”ל‹�ל§€ל™€ כ³´ך³ ל„� ם�˜ל�´ל§€ל�˜ לˆ˜ (ך¸°כ³¸ך°’ = 1)';
t['60'] = 'כ©”ל‹�ל§€/כ¦¬ם�¬ם�¸כ¥¼ ם��ל—…ל°½ל�¼כ¡� כ³´ך¸° ל�„ם•� ל•„ל�´ל½˜ כ³´ל�´ך¸°';
t['61'] = 'כ³´ך³ ל„� ם�˜ל�´ל§€ל—� "כ×¨כ‘�כ³´ך¸° ל‚­ל �" כ³´ל�´ך¸°';
t['62'] = 'ל��ך¸° ל��ל‹ ל—�ך²�כ�„ "כ©”ל‹�ל§€ כ³´כ‚´ך¸°" ל•„ל�´ל½˜ ם‘�ל‹�';
t['63'] = 'TB3 ם™•ל�¥ ל „םˆ¬כ³´ך³ ל„� כ³´ל�´ך¸°';
t['64'] = 'כ³´ך³ ל„� ם†µך³„ל—� ל„¸כ¶€ ל‚¬ם•­ כ³´ל�´ך¸°';
t['65'] = 'לƒ‰ : ל—…ך·¸כ ˆל�´כ“� ך°€כ�¥(ך¸°כ³¸ך°’ = כ¹ˆ ל¹¸)';
t['66'] = 'לƒ‰ : לµ�ך³  כ ˆכ²¨ (ך¸°כ³¸ך°’ = כ¹ˆ ל¹¸)';
t['67'] = 'לƒ‰ : ל—…ך·¸כ ˆל�´כ“� כ¶ˆך°€כ�¥(ך¸°כ³¸ך°’ = כ¹ˆ ל¹¸)';
t['68'] = 'לƒ‰ : NPCך±°כ�˜ ם›„ ל—…ך·¸כ ˆל�´כ“� ך°€כ�¥(ך¸°כ³¸ך°’ = כ¹ˆ ל¹¸)';
t['69'] = "Console Log ם‘�ל‹� כ“±ך¸‰ ל„₪ל •<br>ל£¼ל�˜: ך°�כ°�ל��כ‚˜ כ””כ²„ך¹… ל�©כ�„כ¡�כ§� ל‚¬ל�©ם•´ל•¼ ם•¨(ך¸°כ³¸ך°’ = 0)";
t['82.L'] = 'כ¶�כ§ˆם�¬ ל� ך¸ˆ(ל‚­ל �, ל�„כ¡� ל�´כ�™, ל•„כ�˜כ¡� ל�´כ�™ ל•„ל�´ל½˜ לˆ¨ך¹€)';
t['82.U'] = 'כ¶�כ§ˆם�¬ ל� ך¸ˆ ם•´ל �(ל‚­ל �, ל�„כ¡� ל�´כ�™, ל•„כ�˜כ¡� ל�´כ�™ ל•„ל�´ל½˜ כ³´ל�´ך¸°)';
t['SIM'] = 'ל „םˆ¬ ל‹�כ®¬כ ˆל�´ם„°';
t['QSURE'] = 'ם™•ל‹₪ם•©כ‹ˆך¹�?';
t['LOSS'] = 'ל†�ל‹₪';
t['PROFIT'] = 'ל�´כ“�';
t['EXTAV'] = 'ם™•ל�¥ ך°€כ�¥';
t['PLAYER'] = 'ם”�כ ˆל�´ל–´';
t['VILLAGE'] = 'כ§ˆל�„';
t['POPULATION'] = 'ל�¸ךµ¬';
t['COORDS'] = 'ל¢�ם‘�';
t['MAPTBACTS'] = 'ם–‰כ�™';
t['SAVED'] = 'ל €ל�¥כ�¨';
t['YOUNEED'] = 'ם•„ל�”';
t['TODAY'] = 'ל˜₪כ�˜';
t['TOMORROW'] = 'כ‚´ל�¼';
t['DAYAFTERTOM'] = 'כ×¨כ ˆ';
t['MARKET'] = 'ל‹�ל�¥';
t['BARRACKS'] = 'כ³‘ל˜�';
t['RAP'] = 'ל§‘ך²°ל§€';
t['STABLE'] = 'כ§ˆךµ¬ך°„';
t['WORKSHOP'] = 'ך³µכ°©';
t['SENDRES'] = 'ל��ל›� כ³´כ‚´ך¸°';
t['BUY'] = 'ךµ¬ל�…';
t['SELL'] = 'ם��כ§₪';
t['SENDIGM'] = 'כ©”ל‹�ל§€ כ³´כ‚´ך¸°';
t['LISTO'] = 'ך°€כ�¥ם•�';
t['ON'] = 'כ‚ ל§�';
t['AT'] = 'ל‹�ך°„';
t['EFICIENCIA'] = 'ם�¨ל�¨';
t['NEVER'] = 'כ¶ˆך°€כ�¥';
t['ALDEAS'] = 'כ§ˆל�„(כ“₪)';
t['TIEMPO'] = 'ל‹�ך°„';
t['OFREZCO'] = 'ל �ל•ˆ';
t['BUSCO'] = 'ך²€לƒ‰';
t['TIPO'] = 'ל¢…כ¥˜';
t['DISPONIBLE'] = 'ך°€כ�¥ם•� ך±°כ�˜כ§� ם‘�ל‹�';
t['CUALQUIERA'] = 'כ×¨כ‘�';
t['YES'] = 'כ„₪';
t['NO'] = 'ל•„כ‹ˆל˜₪';
t['LOGIN'] = 'כ¡�ך·¸ל�¸';
t['MARCADORES'] = 'כ¶�כ§ˆם�¬';
t['ANYADIR'] = 'ל¶”ך°€';
t['UBU'] = 'לƒˆ כ¶�כ§ˆם�¬ ל£¼ל†�';
t['UBT'] = 'לƒˆ כ¶�כ§ˆם�¬ ל�´כ¦„';
t['DEL'] = 'ל‚­ל �';
t['MAPA'] = 'ל§€כ�„';
t['MAXTIME'] = 'לµ�כ�€ ל‹�ך°„';
t['ARCHIVE'] = 'כ³´ך´€';
t['SUMMARY'] = 'ל�”ל•½';
t['TROPAS'] = 'כ¶€כ�€';
t['CHKSCRV'] = 'TBeyond ל—…כ�°ל�´ם�¸';
t['ACTUALIZAR'] = 'כ§ˆל�„ ל •כ³´ ל—…כ�°ל�´ם�¸';
t['VENTAS'] = 'ל €ל�¥כ�� ם��כ§₪כ¦¬ל�₪ם�¸';
t['MAPSCAN'] = 'ל§€כ�„ ך²€לƒ‰';
t['BIC'] = 'לƒ�כ‹¨ כ©”כ‰´ ל¶”ך°€ ל•„ל�´ל½˜ כ³´ל�´ך¸°';
t['SAVE'] = 'ל €ל�¥';
t['AT2'] = 'ל§€ל›�';
t['AT3'] = 'ך³µך²©: ם†µלƒ�';
t['AT4'] = 'ך³µך²©: ל•½םƒˆ';
t['NBSA'] = 'ל��כ�™';
t['NBSN'] = 'כ³´ם†µ (ל�‘ל��)';
t['NBSB'] = 'ם�° ל�₪ם�¬כ¦° (ם�¼)';
t['NBHAX'] = 'כ†’ל�´ ל��כ�™ ל„₪ל •';
t['NBHK'] = 'ך¸°כ³¸ כ†’ל�´';
t['NPCSAVETIME'] = 'ל €ל�¥: ';
t['TOTALTROOPS'] = 'כ×¨כ“  כ§ˆל�„ כ³‘כ ¥ ל´�ם•©';
t['U.2'] = 'ל¢…ל¡±';
t['SELECTALLTROOPS'] = "כ¶€כ�€ כ×¨כ‘� ל„ םƒ�";
t['PARTY'] = "ל�”ל¹˜";
t['CPPERDAY'] = "כ¬¸ם™”ל �לˆ˜/ל�¼";
t['SLOT'] = "ל�¬כ¡¯";
t['TOTAL'] = "ל´�ם•©";
t['SELECTSCOUT'] = "ל •ל°°כ³‘ ל„ םƒ�";
t['SELECTFAKE'] = "ל�„ל�¥ ך³µך²©";
t['NOSCOUT2FAKE'] = "ל •ל°°כ³‘ל�€ ל�„ל�¥ ך³µך²©ל�„ ל�„ם•´ ל‚¬ל�©ם•  לˆ˜ ל—†ל�µכ‹ˆכ‹₪!";
t['NOTROOP2FAKE'] = "ל�„ל�¥ ך³µך²©ל�„ ל�„ם•´ ל‚¬ל�©ם•  לˆ˜ ל�ˆכ�” כ¶€כ�€ך°€ ל—†ל�µכ‹ˆכ‹₪!";
t['NOTROOP2SCOUT'] = "ל •ל°°ל�„ ל�„ם•´ ל‚¬ל�©ם•  לˆ˜ ל�ˆכ�” כ¶€כ�€ך°€ ל—†ל�µכ‹ˆכ‹₪!";
t['NOTROOPS'] = "כ§ˆל�„ל—� כ¶€כ�€ך°€ ל—†ל�µכ‹ˆכ‹₪!";
t['ALL'] = "כ×¨כ‘�";
t['SH2'] = "לƒ‰לƒ� ם•„כ“�ל—� ל�…כ ¥ם•  לˆ˜ ל�ˆכ�” ך°’:<br>- green, red ם˜¹ל�€ orange כ“±ל�˜ ל˜�ל–´ לƒ‰לƒ� כ‹¨ל–´.<br>- #004523 ך°™ל�€ HEX לƒ‰לƒ� ל½”כ“�<br>- כ¹ˆ ל¹¸ל�¼כ¡� כ‘�כ©´ ך¸°כ³¸ לƒ‰לƒ� ל �ל�©";
t['SOREP'] = "ל›�כ�˜ל�˜ כ³´ך³ ל„� ם˜•ל‹�ל�¼כ¡� כ³´ל�´ך¸°(ך¸€ל“°ך¸°ל�©)";
t['WSIMO1'] = "כ‚´כ¶€ (ך²�ל�„ל—�ל„� ל �ך³µ)";
t['WSIMO2'] = "ל™¸כ¶€ (kirilloid.ru ל—�ל„� ל �ך³µ)";
t['U.3'] = 'לˆ˜כ�„ ל�´כ¦„<br>ל—…כ�°ל�´ם�¸כ¥¼ ל�„ם•´ ם”„כ¡�ם•„ ם�˜ל�´ל§€כ¥¼ כ°©כ¬¸ם•´ ל£¼ל„¸ל�”';
t['NONEWVER'] = "ל�´כ¯¸ לµ�ל‹  כ²„ל ¼ל�´ ל„₪ל¹˜כ�˜ל–´ ל�ˆל�µכ‹ˆכ‹₪.";
t['BVER'] = "כ² םƒ€ כ²„ל ¼ל�´ ל„₪ל¹˜כ�˜ל–´ ל�ˆל�µכ‹ˆכ‹₪.";
t['NVERAV'] = "לƒˆ כ²„ל ¼ל�˜ ל�₪ם�¬כ¦½ם�¸כ¥¼ ל‚¬ל�©ם•˜ל‹₪ לˆ˜ ל�ˆל�µכ‹ˆכ‹₪.";
t['UPDSCR'] = "ל§€ך¸ˆ ל�₪ם�¬כ¦½ם�¸כ¥¼ ל—…ך·¸כ ˆל�´כ“� ם•˜ל‹�ך² ל�µכ‹ˆך¹�?";
t['CHECKUPDATE'] = "ל�₪ם�¬כ¦½ם�¸ ל—…כ�°ל�´ם�¸כ¥¼ ם™•ל�¸ם•˜ך³  ל�ˆל�µכ‹ˆכ‹₪.<br> ך¸°כ‹₪כ ₪ ל£¼ל‹­ל‹�ל˜₪...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "כ§ˆל�„ כ‹¹ ם�‰ך·  ל�¸ךµ¬ לˆ˜";
t['AVPPP'] = "ל‚¬ל�©ל�� כ‹¹ ם�‰ך·  ל�¸ךµ¬ לˆ˜";
t['U.6'] = 'לˆ˜כ�„ל�˜ ל¢�ם‘�<br>ל—…כ�°ל�´ם�¸כ¥¼ ל�„ם•´ ם”„כ¡�ם•„ ם�˜ל�´ל§€כ¥¼ כ°©כ¬¸ם•´ ל£¼ל„¸ל�”';
t['MAX'] = 'לµ�כ�€';
t['TOTTRTR'] = 'ם›ˆכ ¨ ל₪‘ל�¸ כ³‘ל‚¬ לˆ˜';
t['TB3SL'] = TB3O.shN + ' ל„₪ל •';
t['UPDALLV'] = 'כ×¨כ“  כ§ˆל�„ ל •כ³´ ך°±ל‹ . <br>ך²½ך³ : ל�´ כ×…כ ¹ל–´ ל‚¬ל�©ל‹� כ°´ כ‹¹ם•  לˆ˜ ל�ˆל�¼כ¯€כ¡� ל£¼ל�˜ם•´ל•¼ ם•©כ‹ˆכ‹₪!';
t['LARGEMAP'] = 'ם�° ל§€כ�„';
t['USETHEMPR'] = 'כ¹„ל�¨';
t['USETHEMEQ'] = 'כ�™ל�¼ם•� ל–‘';
t['TOWNHALL'] = 'כ§ˆל�„ם��ך´€';
t['GSRVT'] = 'ך²�ל�„ ל„�כ²„';
t['ACCINFO'] = 'ך²°ל � ל •כ³´';
t['NBO'] = 'כ…¸ם�¸';
t['MNUL'] = 'ל™¼ל×½ כ©”כ‰´';
t['STAT'] = 'ם†µך³„';
t['RESF'] = 'ל��ל›� ם•„כ“�';
t['VLC'] = 'כ§ˆל�„ ל₪‘ל‹¬';
t['MAPO'] = 'ל§€כ�„ ל˜µל…˜';
t['COLO'] = 'לƒ‰לƒ� ל˜µל…˜';
t['DBGO'] = 'כ””כ²„ך·¸ ל˜µל…˜';
t['HEROSMANSION'] = "ל˜�ל›… ל €םƒ�";
t['BLACKSMITH'] = 'כ�€ל�¥ך°„';
t['ARMOURY'] = 'כ³‘ך¸°ך³ ';
t['NOW'] = 'ל§€ך¸ˆ';
t['CLOSE'] = 'Close';
t['USE'] = 'ל‚¬ל�©';
t['USETHEM1H'] = '1ל‹�ך°„ לƒ�ל‚°כ�‰';
t['OVERVIEW'] = 'ל •כ³´';
t['FORUM'] = 'ם�¬כ�¼';
t['ATTACKS'] = 'ל „םˆ¬ ך¸°כ¡�';
t['NEWS'] = 'ל†�ל‹�';
t['ADDCRTPAGE'] = 'ל§€ך¸ˆ ם�˜ל�´ל§€כ¥¼ ל¶”ך°€';
t['SCRPURL'] = 'TBeyond ם™ˆם�˜ל�´ל§€';
t['SPACER'] = 'ךµ¬כ¶„ל�� ל¶”ך°€';
t['MEREO'] = 'כ©”ל‹�ל§€ & כ³´ך³ ל„�';
t['ATTABLES'] = 'כ¶€כ�€ ם…�ל�´כ¸”';
t['MTW'] = 'כ‚­כ¹„';
t['MTX'] = 'ל´ˆך³¼';
t['MTC'] = 'ם˜„ל�¬ ל�´כ°˜ל–‘';
t['ALFL'] = 'ל™¸כ¶€ ם�¬כ�¼ל—� ל—°ך²°<br>(כ¹ˆ ל¹¸ל�¼כ¡� כ‘�כ©´ כ‚´כ¶€ ם�¬כ�¼ל—� ל—°ך²°)';
t['MTCL'] = 'כ×¨כ‘� ל´ˆך¸°ם™”';
t['CKSORT'] = 'ל •כ ¬';
t['MIN'] = 'לµ�ל†�';
t['SVGL'] = 'כ§ˆל�„ך°„ ך³µל� ';
t['VGL'] = 'כ§ˆל�„ כ×©כ¡�';
t['UPDATEPOP'] = 'ל�¸ךµ¬ ל—…כ�°ל�´ם�¸';
t['EDIT'] = 'ם�¸ל§‘';
t['NPCO'] = 'NPC ךµ�ל—­ ל˜µל…˜';
t['NEWVILLAGEAV'] = 'כ‚ ל§�/ל‹�ך°„';
t['TIMEUNTIL'] = 'כ�€ך¸° ל‹�ך°„';
t['CENTERMAP'] = 'ל₪‘ל•™ ל§€כ�„';
t['SENDTROOPS'] = 'כ¶€כ�€ כ³´כ‚´ך¸°';
t['PALACE'] = "ך¶�ל „";
t['RESIDENCE'] = "ל €םƒ�";
t['ACADEMY'] = "ל—°ךµ¬ל†�";
t['TREASURY'] = "כ³´כ¬¼ל°½ך³ ";
t['UPGTB'] = "ל��ל›� ם•„כ“�/ך±´כ¬¼ ל—…ך·¸כ ˆל�´כ“� ם…�ל�´כ¸”";
t['RBTT'] = "ל��ל›� כ°”";
t['RESIDUE'] = 'ך±´ל¶• כ×…כ ¹ ם›„ כ‚¨ך²� כ�  ל˜ˆלƒ� ל��ל›� ';
t['RESOURCES'] = 'ל˜ˆלƒ� ם��כ“� ל��ל›�';
t['SH1'] = "לˆ˜כ�„ כ°� ך°� כ§ˆל�„ ל¢�ם‘� ל��כ�™ ל�¸ל‹�ל�„ ל�„ם•´ ם”„כ¡�ם•„ל�„ ם™•ל�¸ם•´ ל£¼ל„¸ל�”<br>ל¢…ל¡± ל��כ�™ ל�¸ל‹�ל�„ ל�„ם•´ כ³‘ל˜�ל�„ ל§€ל�€ ם›„ כ§ˆל�„ ל₪‘ל‹¬ל�„ ל—´ל–´ ל£¼ל„¸ל�”";
t['RESEND'] = "כ‹₪ל‹� כ³´כ‚´ך¸°";
t['WSI'] = "ך²�ל�„ל—�ל„� ל �ך³µם•˜כ�” ל „םˆ¬ ל‹�כ®¬כ ˆל�´ם„°";
t['TTT'] = "General troops/distance tooltips";
break;
case "my"://by Light@fei & dihaz06-47
//avRace = ['Rom', 'Teuton', 'Gaul'];
t['8'] = 'Persekutuan';
t['SIM'] = 'Simulator Peperangan';
t['QSURE'] = 'Adakah anda pasti?';
t['LOSS'] = 'Kerugian';
t['PROFIT'] = 'Keuntungan';
t['EXTAV'] = 'Boleh dibesarkan';
t['PLAYER'] = 'Pemain';
t['VILLAGE'] = 'Kampung';
t['POPULATION'] = 'Populasi';
t['COORDS'] = 'Koordinat';
t['MAPTBACTS'] = 'Aksi';
t['SAVED'] = 'Disimpan';
t['YOUNEED'] = 'Anda Perlu';
t['TODAY'] = 'Hari ini';
t['TOMORROW'] = 'Esok';
t['DAYAFTERTOM'] = 'Lusa';
t['MARKET'] = 'Pasar';
t['BARRACKS'] = 'Berek';
t['RAP'] = 'Titik Perhimpunan';
t['STABLE'] = 'Kandang Kuda';
t['WORKSHOP'] = 'Bengkel';
t['SENDRES'] = 'Hantarkan Sumber-sumber';
t['BUY'] = 'Beli';
t['SELL'] = 'Tawar';
t['SENDIGM'] = 'Hantar IGM';
t['LISTO'] = 'Ada';
t['ON'] = 'pada';
t['AT'] = 'di';
t['EFICIENCIA'] = 'Kecekapan';
t['NEVER'] = 'Tidak pernah';
t['ALDEAS'] = 'Kampung(-kampung)';
t['TIEMPO'] = 'Masa';
t['OFREZCO'] = 'Menawar';
t['BUSCO'] = 'Mencari';
t['TIPO'] = 'Jenis';
t['DISPONIBLE'] = 'Hanya Ada';
t['CUALQUIERA'] = 'Mana-mana';
t['YES'] = 'Ya';
t['NO'] = 'Tidak';
t['LOGIN'] = 'Log Masuk';
t['MARCADORES'] = 'Bookmark';
t['ANYADIR'] = 'Tambah';
t['UBU'] = 'URL Bookmark Baru';
t['UBT'] = 'Teks Bookmark Baru';
t['DEL'] = 'Padam';
t['MAPA'] = 'Peta';
t['MAXTIME'] = 'Masa Maksimum';
t['ARCHIVE'] = 'Arkib';
t['SUMMARY'] = 'Rumusan';
t['TROPAS'] = 'Askar-askar';
t['CHKSCRV'] = 'Kemaskini TBeyond';
t['ACTUALIZAR'] = 'Kemaskini informasi kampung';
t['VENTAS'] = 'Tawaran tersimpan';
t['MAPSCAN'] = 'Imbaskan Peta';
t['BIC'] = 'Tunjukkan lebih ikon';
t['22'] = 'Tunjukkan blok nota';
t['SAVE'] = 'Simpan';
t['49'] = 'Aksi Titik perhimpunan';
t['AT2'] = 'Bantuan';
t['AT3'] = 'Serangan: Normal';
t['AT4'] = 'Serangan: Serbuan';
t['24'] = 'Saiz blok nota';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normal (kecil)';
t['NBSB'] = 'Skrin besar (besar)';
t['25'] = 'Ketinggian blok nota';
t['NBHAX'] = 'Laras Tinggi Automatik';
t['NBHK'] = 'Ketinggian Default';
t['43'] = 'Tunjukkan nombor-nombor di pusat kampung';
t['NPCSAVETIME'] = 'Jimat: ';
t['38'] = 'Tunjukkan warna-warna tahap sumber';
t['44'] = 'Tunjukkan warna-warna tahap bangunan';
t['65'] = 'Warna naiktaraf ada<br>(Default = Kosong)';
t['66'] = 'Warna tahap maksimum<br>(Default = Kosong)';
t['67'] = 'Warna naiktaraf tak mungkin<br>(Default = Kosong)';
t['68'] = 'Warna naiktaraf menggunakan NPC<br>(Default = Kosong)';
t['TOTALTROOPS'] = 'Jumlah askar-askar dalam kampung';
t['20'] = 'Tunjukkan bookmarks';
t['U.2'] = 'Puak';
t['1'] = "Server Travian v2.x";
t['SELECTALLTROOPS'] = "Pilihkan semua askar";
t['PARTY'] = "Perayaan";
t['CPPERDAY'] = "MB/hari";
t['SLOT'] = "Slot";
t['TOTAL'] = "Jumlah";
t['SELECTSCOUT'] = "Pilihkan peninjau";
t['SELECTFAKE'] = "Pilihkan fake";
t['NOSCOUT2FAKE'] = "Adalah mustahil menggunakan peninjau untuk serangan fake !";
t['NOTROOP2FAKE'] = "Tiada askar untuk serangan fake!";
t['NOTROOP2SCOUT'] = "Tiada unit peninjau !";
t['NOTROOPS'] = "Tiada askar-askar didalam kampung !";
t['ALL'] = "Semua";
t['SH2'] = "Didalam ruang warna anda boleh memasuskkan:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>-  Kod warna HEX seperti<b>#004523</b><br>- Tinggalkan kosong untuk warna default";
t['SOREP'] = "Tunjukkan laporan original (untuk dipost)";
t['56'] = "Tunjukkan informasi jenis petak/oasis <br>semasa meletakkan cursor diatas peta";
t['10'] = "Link simulator peperangan untuk digunakan:<br>(menu disebelah kiri)";
t['WSIMO1'] = "Dalaman (disediakan oleh permainan)";
t['WSIMO2'] = "Luaran (disediakan oleh kirilloid.ru)";
t['27'] = "World Analyser untuk digunakan";
t['28'] = "Tunjukkan link penganalisa statistik";
t['NONEWVER'] = "Anda mempunyai versi yang terbaru";
t['BVER'] = "Anda mempunyai versi beta";
t['NVERAV'] = "A Terdapat versi skrip yang lebih baru";
t['UPDSCR'] = "Kemaskini skrip sekarang ?";
t['CHECKUPDATE'] = "Memeriksa untuk kemaskini skrip.<br>Sila tunggu...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Populasi purata per kampung";
t['AVPPP'] = "Populasi purata per pemain";
t['37'] = "Tunjukkan jadual naiktaraf tapak sumber";
t['41'] = "Tunjukkan jadual naiktaraf bangunan";
t['48'] = "Jumlah mukasurat tawaran untuk dipreload<br>Semasa di 'Pasar => Mukasurat beli' <br>(Default = 1)";
t['U.3'] = 'Namakan ibukota anda<br><b>Lawat Profile anda untuk kemaskini</b>';
t['U.6'] = 'Koordinat ibukota<br><b>Lawat Profile anda untuk kemaskini</b>';
t['MAX'] = 'Maksimum';
t['TOTTRTR'] = 'Jumlah askar sedang dilatih';
t['57'] = 'Tunjukkan jarak & masa';
t['TB3SL'] = 'Setup ' + TB3O.shN;
t['UPDALLV'] = 'Kemaskini semua kampung.  GUNAKAN DENGAN BERHATI-HATI KERANA INI BOLEH MEMBAWA KEPADA PEMBEKUAN AKAUN ANDA !';
t['9'] = "Tunjukkan link tambahan di menu sebelah kiri<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Peta Besar';
t['USETHEMPR'] = 'Guna (Dalam Peratus)';
t['USETHEMEQ'] = 'Guna (Samarata)';
t['TOWNHALL'] = 'Dewan Perbandaran';
t['GSRVT'] = 'Server dunia permainan';
t['ACCINFO'] = 'Informasi Akaun';
t['NBO'] = 'Tiadablok';
t['MNUL'] = 'Menu di sebelah kiri';
t['STAT'] = 'Statistik';
t['RESF'] = 'Tapak sumber';
t['VLC'] = 'Pusat Kampung';
t['MAPO'] = 'Pilihan peta';
t['COLO'] = 'Pilihan warna';
t['DBGO'] = 'Pilihan debug';
t['4'] = 'Pasar';
t['5'] = 'Titik perhimpunan/Berek/Bengkel/Kandang kuda';
t['6'] = "Dewan perbandaran/Rumah agam wira/Kedai perisai/Kedai senjata";
t['HEROSMANSION'] = "Rumah Agam Wira";
t['BLACKSMITH'] = 'Kedai Senjata';
t['ARMOURY'] = 'Kedai Perisai';
t['NOW'] = 'Sekarang';
t['CLOSE'] = 'Tutup';
t['USE'] = 'Guna';
t['USETHEM1H'] = 'Guna (Produksi sejam)';
t['OVERVIEW'] = 'Keseluruhan';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Serangan';
t['NEWS'] = 'Berita';
t['ADDCRTPAGE'] = 'Tambahkan mukasurat sekarang';
t['SCRPURL'] = 'Mukasurat TBeyond';
t['50'] = 'Bilangan peninjau untuk fungsi<br>"Pilihkan peninjau"';
t['SPACER'] = 'Penambah jarak';
t['53'] = 'Tunjukkan informasi askar-askar di tooltips';
t['MEREO'] = 'Mesej & Laporan';
t['59'] = 'Bilangan mukasurat mesej/laporan untuk dipreload<br>(Default = 1)';
t['ATTABLES'] = 'Jadual askar-askar';
t['MTW'] = 'Dibazirkan';
t['MTX'] = 'Melebihi';
t['MTC'] = 'Kapasiti sekarang';
t['ALFL'] = 'Linkkan ke forum luaran<br>(Tinggalkan kosong untuk forum dalaman)';
t['82.L'] = 'Kunci bookmark (Sorokkan ikon padam, keatas, kebawah)';
t['MTCL'] = 'Padamkan semua';
t['82.U'] = 'Buka kunci bookmark (Tunjukkan ikon padam, keatas, kebawah)';
t['CKSORT'] = 'Klikkan untuk membahagi';
t['MIN'] = 'Minimum';
t['SVGL'] = 'Kongsikan antara kampung';
t['VGL'] = 'List kampung-kampung';
t['12'] = "Tunjukkan link 'dorf1.php' and 'dorf2.php'";
t['UPDATEPOP'] = 'Kemaskini populasi';
t['54'] = 'Tunjukkan jarak dan masa kepada sesuatu kampung di tooltips';
t['EDIT'] = 'Edit';
t['NPCO'] = 'Pilihan Pembantu NPC';
t['26'] = 'Tunjukkan pengiraan/link Pembantu NPC';
t['58'] = 'Tunjukkan jadual pemain/kampung/oasis berpenduduk';
t['NEWVILLAGEAV'] = 'Tarikh/Masa';
t['TIMEUNTIL'] = 'Masa untuk menunggu';
t['61'] = 'Tunjukkan jadual "Padam semua" di mukasurat laporan';
t['62'] = 'Tunjukkan ikon "Hantar IGM" kepada saya juga';
t['CENTERMAP'] = 'Ketengahkan peta untuk kampung ini';
t['13'] = 'Tunjukkan ikon "Ketengahkan peta untuk kampung ini" ';
t['SENDTROOPS'] = 'Hantarkan askar-askar';
t['64'] = 'Tunjukkan detail di dalam Statistic Laporan';
t['7'] = "Istana/Residen/Akademi/Perbendaharaan";
t['PALACE'] = "Istana";
t['RESIDENCE'] = "Residen";
t['ACADEMY'] = "Akademi";
t['TREASURY'] = "Perbendaharaan";
t['45'] = "Tunjukkan level berkedip untuk bangunan yang sedang dinaiktaraf";
t['14'] = "Tunjukkan ikon 'Hantar askar-askar/Hantar sumber-sumber' didalam list kampung";
t['34'] = "Tunjukkan informasi MB/Hari di dalam jadual naiktaraf";
t['UPGTB'] = " Jadual naiktaraf Tapak sumber/Bangunan";
t['35'] = "Tunjukkan penggunaan makanan didalam jadual naik taraf";
t['16'] = "Tunjukkan produksi tanaman efektif di dalam list kampung";
t['39'] = "Tunjukkan jadual bar sumber";
t['RBTT'] = "Bar Sumber";
t['60'] = 'Tunjukkan link untuk membuka mesej sebagai pop-up';
break;
case "lv":
//avRace = ['Romieֵ¡i', 'ִ¢ermִ�ֵ†i', 'Galli'];
t['8'] = 'Alianse';
t['SIM'] = 'Kaujas simulִ�tors';
t['QSURE'] = 'Vai esi pִ�rliecinִ�ts?';
t['LOSS'] = 'Zaudִ“jumi';
t['PROFIT'] = 'Guvums';
t['EXTAV'] = 'Celֵ¡ana pieejama';
t['PLAYER'] = 'Spִ“lִ“tִ�js';
t['VILLAGE'] = 'Ciems';
t['POPULATION'] = 'Populִ�cija';
t['COORDS'] = 'Koordinִ�tes';
t['MAPTBACTS'] = 'Notikumi';
t['SAVED'] = 'Saglabִ�ts';
t['YOUNEED'] = 'Nepiecieֵ¡ams';
t['TODAY'] = 'ֵ¡odien';
t['TOMORROW'] = 'rִ«tdien';
t['DAYAFTERTOM'] = 'aizparִ«t';
t['MARKET'] = 'Tirgus';
t['BARRACKS'] = 'Kazarmas';
t['RAP'] = 'Mִ«tiֵ†a vieta';
t['STABLE'] = 'Stallis';
t['WORKSHOP'] = 'Darbnִ«ca';
t['SENDRES'] = 'Sֵ«tִ«t resursus';
t['BUY'] = 'Pirkt';
t['SELL'] = 'Pִ�rdot';
t['SENDIGM'] = 'Sֵ«tִ«t ziֵ†u';
t['LISTO'] = 'Pieejams';
t['ON'] = 'ap';
t['AT'] = 'ap';
t['EFICIENCIA'] = 'Lietderִ«ba';
t['NEVER'] = 'Ne tagad';
t['ALDEAS'] = 'Ciemi';
t['TIEMPO'] = 'Laiks';
t['OFREZCO'] = 'Piedִ�vִ�jumi';
t['BUSCO'] = 'Meklִ“';
t['TIPO'] = 'Tips';
t['DISPONIBLE'] = 'Tikai pieejamos';
t['CUALQUIERA'] = 'Jebkurֵ¡';
t['YES'] = 'Jִ�';
t['NO'] = 'Nִ“';
t['LOGIN'] = 'Ieiet';
t['MARCADORES'] = 'Saglabִ�tִ�s saites';
t['ANYADIR'] = 'Pievienot';
t['UBU'] = 'Jaunִ�s saites URL';
t['UBT'] = 'Jaunִ�s saites nosaukums';
t['DEL'] = 'Dzִ“st';
t['MAPA'] = 'Karte';
t['MAXTIME'] = 'Maksimִ�lais laiks';
t['ARCHIVE'] = 'Arhִ«vs';
t['SUMMARY'] = 'Pִ�rskats';
t['TROPAS'] = 'Karavִ«ri';
t['CHKSCRV'] = 'Atjaunot versiju';
t['ACTUALIZAR'] = 'Atjaunot ciema informִ�ciju';
t['VENTAS'] = 'Saglabִ�tie piedִ�vִ�jumi';
t['MAPSCAN'] = 'Meklִ“t kartִ“';
t['BIC'] = 'Rִ�dִ«t papildus ikonas';
t['22'] = 'Rִ�dִ«t pierakstu blociֵ†u';
t['SAVE'] = 'Saglabִ�t';
t['49'] = 'Mִ«tiֵ†a vietas noklusִ“tִ� darbִ«ba';
t['AT2'] = 'Papildspִ“ki';
t['AT3'] = 'Uzbrukums: Parasts';
t['AT4'] = 'Uzbrukums: Iebrukums';
t['24'] = 'Piezִ«mju blociֵ†a izmִ“rs';
t['NBSA'] = 'Automִ�tisks';
t['NBSN'] = 'Normִ�ls (mazais)';
t['NBSB'] = 'Platiem ekrִ�niem (lielais)';
t['25'] = 'Pierakstu blociֵ†a augstums';
t['NBHAX'] = 'Automִ�tiski izstiepts augstums';
t['NBHK'] = 'Noklusִ“tais augstums';
t['43'] = 'Numurus rִ�dִ«t centrִ“tus';
t['NPCSAVETIME'] = 'Saglabִ�t:';
t['38'] = 'Rִ�dִ«t resursu lִ«meֵ†u krִ�sas';
t['44'] = 'Rִ�dִ«t celtֵ†u lִ«meֵ†u krִ�sas';
t['65'] = 'Krִ�sa: Iespִ“jams uzlabot<br>(Noklusִ“tais = Tukֵ¡s)';
t['66'] = 'Krִ�sa: Maksimִ�lִ� lִ«meֵ†a krִ�sa l<br>(Noklusִ“tais = Tukֵ¡s)';
t['67'] = 'Krִ�sa: Lִ«meni nevar uzlabot<br>( Noklusִ“tais = Tukֵ¡s)';
t['68'] = 'Krִ�sa: Uzlaboֵ¡ana caur NPC<br>( Noklusִ“tais = Tukֵ¡s)';
t['TOTALTROOPS'] = 'Kopִ“jais karaspִ“ka skaits';
t['20'] = 'Rִ�dִ«t saglabִ�tִ�s saites';
t['U.2'] = 'Rase';
t['1'] = "Travian v2.x server";
t['SELECTALLTROOPS'] = "Izvִ“lִ“ties visu karaspִ“ku";
t['PARTY'] = "Svinִ«bas";
t['CPPERDAY'] = "Kultֵ«ras punkti/Dienִ�";
t['SLOT'] = "Vieta";
t['TOTAL'] = "Kopִ�";
t['SELECTSCOUT'] = "Izvִ“lieties izlֵ«ku";
t['SELECTFAKE'] = "Izvִ“lieties ne-ִ«sto";
t['NOSCOUT2FAKE'] = "Nav iespִ“jams izmantot skautus kִ� mִ�ֵ†u uzbrukumu!";
t['NOTROOP2FAKE'] = "Jums nav karaspִ“ka, lai izpildִ«tu mִ�ֵ†u uzbrukumu!";
t['NOTROOP2SCOUT'] = "Nav karspִ“ka, lai veiktu izspiegoֵ¡anu !";
t['NOTROOPS'] = "Jums ֵ¡ajִ� ciema nav karaspִ“ka!";
t['ALL'] = "Visi";
t['SH2'] = "Krִ�su laukumos varat ievadִ«t ֵ¡ִ�das krִ�sas:<br>- <b>green</b> vai <b>red</b> vai  <b>orange</b>, utt.<br>- kִ� arִ« krִ�su kodus <b>#004523</b><br>- vai arִ« atstִ�jat tukֵ¡u, lai izmantotu noklusִ“tִ�s krִ�sas";
t['SOREP'] = "Rִ�dִ«t oriִ£inִ�lo ziֵ†ojumu (priekֵ¡ kopִ“ֵ¡anas utt)";
t['56'] = "Rִ�dִ«t sֵ«nas tipu/oִ�zes informִ�cijuShow <br>while kamִ“r peles kursors ir uz kartes";
t['10'] = "Kaujas simulatora saite:<br>(kreisִ� izvִ“lnes josla)";
t['WSIMO1'] = "Iekֵ¡ִ“jais (nodroֵ¡inִ�jusi spִ“le)";
t['WSIMO2'] = "ִ€rִ“jais (nodrֵ¡inִ�jis kirilloid.ru)";
t['27'] = "Pasaules analִ«ze";
t['28'] = "Rִ�dִ«t analִ«zes ikonu pie saitִ“m";
t['NONEWVER'] = "Jֵ«s jau lietojat pִ“dִ“jo " + TB3O.shN + " versiju";
t['BVER'] = "Jֵ«s varat lietot arִ« Beta versiju";
t['NVERAV'] = "Jaunִ�kִ� skripta versija ir pieejama";
t['UPDSCR'] = "Atjaunot skriptu tagad?";
t['CHECKUPDATE'] = "Meklִ“ju skripta jauninִ�jumu.<br>Lֵ«dzu uzgaidiet...";
t['CROPFINDER'] = "Labִ«bas lauku meklִ“tajs";
t['AVPPV'] = "Vidִ“jִ� populִ�cija pret ciemu";
t['AVPPP'] = "Vidִ“jִ� populִ�cija pret spִ“lִ“tִ�ju";
t['37'] = "Rִ�dִ«t resursu lִ«meֵ†u tabulu";
t['41'] = "Rִ�dִ«t celtֵ†u lִ«meֵ†u tabulu";
t['69'] = "Konsules Log lִ«menis<br>TIKAI PRIEKֵ  PROGRAMִ’Tִ€JIEM  VAI Kִ»ֵ×DU NOVִ’Rֵ ANAS<br>(Noklusִ“tais = 0)";
t['48'] = "Piedִ�vִ�jumu lapu skaits <br>kamִ“r ג€˜Tirgus => Pirkt' page<br>(Noklusִ“tais = 1)";
t['U.3'] = 'Galvaspilsִ“tas nosaukums<br><b>Apmeklִ“ savu profilu</b>';
t['U.6'] = 'Galvaspilsִ“tas koordinִ�tes<br><b> Apmeklִ“ savu profilu</b>';
t['MAX'] = 'Maksimִ�lais';
t['TOTTRTR'] = 'Kopִ“jais karaspִ“ka skaits, kas tiek trenִ“ts';
t['57'] = 'Rִ�dִ«t distanci un laiku';
t['TB3SL'] = TB3O.shN + ' opcijas';
t['UPDALLV'] = 'Uzlabot visus ciemus. ֵ O LABִ€K NEIZMANTOT, JO TAS VAR NOVEST PIE KONTA BLOִ¶ִ’ֵ ANAS';
t['9'] = "Rִ�dִ«t papildus saites kreisajִ� izvִ“lnes joslִ�<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Lielִ� karte';
t['USETHEMPR'] = 'Lietot tos (proporcionִ�li)';
t['USETHEMEQ'] = 'Lietot tos (vienlִ«dzִ«gi)';
t['TOWNHALL'] = 'Rִ�tsnams';
t['GSRVT'] = 'Spִ“les serveris';
t['NBO'] = 'Pierakstu blociֵ†s';
t['MNUL'] = 'Kreisִ�s puses izvִ“les josla';
t['STAT'] = 'Statistika';
t['RESF'] = 'Resursu lauki';
t['VLC'] = 'Ciema centrs';
t['MAPO'] = 'Kastes iestatִ«jumi';
t['COLO'] = 'Krִ�su iestatִ«jumi';
t['DBGO'] = 'Kִ¼ֵ«du ziֵ†ojumu iestatִ«jumi';
t['4'] = 'Tirgus';
t['5'] = 'Mִ«tiֵ†a vieta/Kazarmas/Darbnִ«ca/Stallis';
t['6'] = "Rִ�tsnams/Varoֵ†u Savrupmִ�ja/Ieroִ�u kaltuve/Bruֵ†u kaltuve";
t['HEROSMANSION'] = " Varoֵ†u Savrupmִ�ja";
t['BLACKSMITH'] =  ' Ieroִ�u kaltuve ';
t['ARMOURY'] = 'Bruֵ†u kaltuve ';
t['NOW'] = 'Tagad';
t['CLOSE'] = 'Aizvִ“rt';
t['USE'] = 'Lietot';
t['USETHEM1H'] = 'Lietot tos (1 stundas produkcija)';
t['OVERVIEW'] = 'Pִ�rskats';
t['FORUM'] = 'Forums';
t['ATTACKS'] = 'Uzbrukumi';
t['NEWS'] = 'Ziֵ†ojumi';
t['ADDCRTPAGE'] = 'Pievienot atvִ“rto lapu';
t['SCRPURL'] = 'TBeyond mִ�jaslapa';
t['50'] = 'Skautu skaits priekֵ¡ <br>"Izvִ“lִ“ties skautus" funkcijas';
t['SPACER'] = 'Starp';
t['53'] = 'Rִ�dִ«t karaspִ“ka informִ�ciju Tooltipג€™os';
t['MEREO'] = 'Saֵ†emtִ�s ziֵ†as un ziֵ†ojumi';
t['59'] = 'Ziֵ†ojumu skaits <br>(Noklusִ“tais = 1)';
t['ATTABLES'] = 'Karaspִ“ka saraksti';
t['MTW'] = 'Izniekots';
t['MTX'] = 'Pִ�rmִ“rִ«gs';
t['MTC'] = 'Paֵ¡reizִ“jִ� krava';
t['ALFL'] = 'Saite uz ִ�rִ“jo Travian forumu<br>(atstִ�j tukֵ¡u, lai saite bֵ«tu uz starptautisko forumu)';
t['82.L'] = 'Slִ“gt saites (Slִ“pt dzִ“st, pִ�rvietot uz augֵ¡u, uz leju ikonas)';
t['MTCL'] = 'Nodzִ“st visu';
t['82.U'] = 'Atslִ“gt saites ( Rִ�dִ«t dzִ“st, pִ�rvietot uz augֵ¡u, uz leju ikonas)';
t['12'] = "Rִ�dִ«t 'dorf1.php' un 'dorf2.php' saites";
t['VGL'] = 'Ciemu saraksts';
break;
case "jp"://by Jackie Jack & baan
//avRace = ['דƒ­דƒ¼דƒ�דƒ³', 'דƒ�דƒ¥דƒ¼דƒˆדƒ³', 'ד‚¬ד‚¦דƒ«'];
t['8'] = 'ו��ח›�';
t['SIM'] = 'זˆ¦י—˜ד‚·דƒ�דƒ¥דƒ¬דƒ¼ד‚¿';
t['QSURE'] = 'דƒ›דƒ³דƒˆד�«ט‰¯ד�„ד�§ד�™ד�‹ן¼�';
t['LOSS'] = 'ז��ו₪±';
t['PROFIT'] = 'וˆ©ח›�';
t['EXTAV'] = 'ז÷–ו‚™ו®�ה÷†';
t['PLAYER'] = 'דƒ—דƒ¬ד‚₪דƒ₪דƒ¼';
t['VILLAGE'] = 'ז�‘ו��';
t['POPULATION'] = 'ה÷÷ו�£';
t['COORDS'] = 'ו÷§ז¨™';
t['MAPTBACTS'] = 'ד‚¢ד‚¯ד‚·דƒ§דƒ³';
t['SAVED'] = 'ה¿�ו­˜ד�—ד�¾ד�—ד��';
t['YOUNEED'] = 'ה¸�ט¶³';
t['TODAY'] = 'ה»�ז—¥';
t['TOMORROW'] = 'ז˜�ז—¥';
t['DAYAFTERTOM'] = 'ז˜�ו¾�ז—¥';
t['MARKET'] = 'ו¸‚ו ´';
t['BARRACKS'] = 'ו…µטˆ�';
t['RAP'] = 'י›†ו…µז‰€';
t['STABLE'] = 'י¦¬טˆ�';
t['WORKSHOP'] = 'ה½�ז¥­ו ´';
t['SENDRES'] = 'ט³‡ז÷�ד�®י€�ה»˜';
t['BUY'] = 'ו£²ז–¹';
t['SELL'] = 'ט²·ז–¹';
t['SENDIGM'] = 'דƒ¡דƒƒד‚»דƒ¼ד‚¸ד�®י€�ה»˜';
t['LISTO'] = 'ז÷–ו‚™ו®�ה÷†ה÷ˆו®�';
t['ON'] = 'on';
t['AT'] = 'at';
t['EFICIENCIA'] = 'ו�¹ח�‡';
t['NEVER'] = 'ו®¹י‡�ה¸�ט¶³';
t['ALDEAS'] = 'ז�‘';
t['TIEMPO'] = 'ז™‚י–“';
t['OFREZCO'] = 'ו£²ז–¹';
t['BUSCO'] = 'ט²·ז–¹';
t['TIPO'] = 'ד‚¿ד‚₪דƒ—';
t['CUALQUIERA'] = 'ו…¨ד�¦';
t['LARGEMAP'] = 'ז‹¡ו¼µדƒ�דƒƒדƒ—';
t['DISPONIBLE'] = 'ו�–ו¼•ו�¯טƒ½';
t['YES'] = 'ד�¯ד�„';
t['NO'] = 'ד�„ד�„ד�ˆ';
t['LOGIN'] = 'דƒ­ד‚°ד‚₪דƒ³';
t['MARCADORES'] = 'דƒ–דƒƒד‚¯דƒ�דƒ¼ד‚¯';
t['ANYADIR'] = 'דƒ–דƒƒד‚¯דƒ�דƒ¼ד‚¯ד�¸ט¿½ו� ';
t['UBU'] = 'ט¿½ו� ד�™ד‚‹דƒ–דƒƒד‚¯דƒ�דƒ¼ד‚¯ד�®URL';
t['UBT'] = 'ט¿½ו� ד�™ד‚‹דƒ–דƒƒד‚¯דƒ�דƒ¼ד‚¯ד�®ד‚¿ד‚₪דƒˆדƒ«';
t['DEL'] = 'ו‰�י™₪';
t['MAPA'] = 'TravMap';
t['MAXTIME'] = 'ז�€ו₪§ז™‚י–“';
t['CHKSCRV'] = 'ז�€ז–°דƒ�דƒ¼ד‚¸דƒ§דƒ³ד�®דƒ�ד‚§דƒƒד‚¯';
t['TROPAS'] = 'ו…µו£«';
t['ARCHIVE'] = 'ד‚¢דƒ¼ד‚«ד‚₪דƒ–';
t['SUMMARY'] = 'ט¦�ח´„';
t['NVERAV'] = 'ז�€ז–°דƒ�דƒ¼ד‚¸דƒ§דƒ³';
t['UPDSCR'] = "ד‚¹ד‚¯דƒ×דƒ—דƒˆד‚’ד‚¢דƒƒדƒ—דƒ‡דƒ¼דƒˆד�—ד�¾ד�™ד�‹?";
t['CHECKUPDATE'] = "ד‚¢דƒƒדƒ—דƒ‡דƒ¼דƒˆד��ח„¡ד�„ד�‹ח¢÷ט×�ד�—ד�¦ד�„ד�¾ד�™...";
t['AVPPV'] = "ז�‘ו½“ד��ד‚�ד�®ו¹³ו�‡ה÷÷ו�£";
t['AVPPP'] = "דƒ—דƒ¬ד‚₪דƒ₪דƒ¼ו½“ד��ד‚�ד�®ו¹³ו�‡ה÷÷ו�£";
t['37'] = "ט³‡ז÷�ד‚¿ד‚₪דƒ«ד�®ד‚¢דƒƒדƒ—ד‚°דƒ¬דƒ¼דƒ‰דƒ†דƒ¼דƒ–דƒ«ד‚’ט¡¨ח₪÷ד�™ד‚‹";
t['69'] = "ד‚³דƒ³ד‚½דƒ¼דƒ«דƒ­ד‚°דƒ¬דƒ™דƒ«<br>דƒ—דƒ­ד‚°דƒ©דƒ�דƒ¼ד‚„דƒ‡דƒ�דƒƒד‚°ד�®ד��ד‚�ד�«<br>(Default = 0)";
t['48'] = "דƒˆדƒ¬דƒ¼דƒ‰דƒ�דƒ¼ד‚¸ד�®ו��ז™‚ד�«ט×­ד�¿ט¾¼ד‚€דƒ�דƒ¼ד‚¸ז•°<br>(Default = 1)";
t['U.3'] = 'ד�‚ד�×ד��ד�®ז�‘ד�®ו��ו‰�<br><b>Visit your Profile for an update</b>';
t['U.6'] = 'ד�‚ד�×ד��ד�®ז�‘ד�®ו÷§ז¨™<br><b>Visit your Profile for an update</b>';
t['MAX'] = 'ז�€ו₪§';
t['57'] = 'ט·�י›¢ד�¨ז™‚י–“ד‚’ט¡¨ח₪÷ד�™ד‚‹';
t['TB3SL'] = TB3O.shN + 'ד‚’ד‚»דƒƒדƒˆד‚¢דƒƒדƒ—';
t['9'] = "ו·¦ו�´ד�®דƒ¡דƒ‹דƒ¥דƒ¼ד�«ט¿½ו� ד�®דƒ×דƒ³ד‚¯ד‚’ט¡¨ח₪÷<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'ו�°ו›³ד‚’ו₪§ד��ד��ד�™ד‚‹';
t['TOWNHALL'] = 'י›†ה¼�ז‰€';
t['GSRVT'] = 'ד‚²דƒ¼דƒ ד‚µדƒ¼דƒ�דƒ¼';
t['ACCINFO'] = 'ד‚¢ד‚«ד‚¦דƒ³דƒˆזƒ…ו ±';
t['NBO'] = 'דƒ�דƒ¼דƒˆדƒ–דƒƒד‚¯';
t['MNUL'] = 'ו·¦דƒ¡דƒ‹דƒ¥דƒ¼ד�®דƒ×דƒ³ד‚¯ט¨­ו®�';
t['STAT'] = 'חµ±ט¨ˆ';
t['RESF'] = 'דƒ×ד‚½דƒ¼ד‚¹דƒ•ד‚£דƒ¼דƒ«דƒ‰';
t['MAPO'] = 'ו�°ו›³ד‚×דƒ—ד‚·דƒ§דƒ³';
t['COLO'] = 'ז–‡ו­—ט‰²ד‚×דƒ—ד‚·דƒ§דƒ³';
t['DBGO'] = 'דƒ‡דƒ�דƒƒד‚°ד‚×דƒ—ד‚·דƒ§דƒ³';
t['4'] = 'ו¸‚ו ´';
t['5'] = 'י›†ו…µז‰€/ו…µטˆ�/ה½�ז¥­ו ´/י¦¬טˆ�';
t['6'] = "י›†ה¼�ז‰€/ט‹±י›„ד�®י₪¨/י˜²ו…·ו·¥ו ´/י�›ו†¶ו ´";
t['HEROSMANSION'] = "ט‹±י›„ד�®י₪¨";
t['BLACKSMITH'] = 'י�›ו†¶ו ´';
t['ARMOURY'] = 'י˜²ו…·ו·¥ו ´';
t['CLOSE'] = 'י–‰ד�˜ד‚‹';
t['ADDCRTPAGE'] = 'ד�“ד�®דƒ�דƒ¼ד‚¸ד‚’דƒ–דƒƒד‚¯דƒ�דƒ¼ד‚¯ד�«ט¿½ו� ד�™ד‚‹';
t['SPACER'] = 'ד‚¹דƒ�דƒ¼ד‚µדƒ¼';
t['MEREO'] = 'דƒ¡דƒƒד‚»דƒ¼ד‚¸דƒ»דƒ¬דƒ�דƒ¼דƒˆ';
t['MTCL'] = 'ד�™ד�¹ד�¦ד‚’ו‰�י™₪';
t['82.L'] = 'דƒ–דƒƒד‚¯דƒ�דƒ¼ד‚¯ד�®דƒ­דƒƒד‚¯ (ו‰�י™₪,ח·¨י›†,ה¸�ח§»ו‹•,ה¸‹ח§»ו‹•ד‚¢ד‚₪ד‚³דƒ³ד‚’י� ד�™)';
t['82.U'] = 'דƒ–דƒƒד‚¯דƒ�דƒ¼ד‚¯ד�®ד‚¢דƒ³דƒ­דƒƒד‚¯ (ו‰�י™₪,ח·¨י›†,ה¸�ח§»ו‹•,ה¸‹ח§»ו‹•ד‚¢ד‚₪ד‚³דƒ³ד�®ט¡¨ח₪÷)';
t['BIC'] = 'ז‹¡ו¼µד‚¢ד‚₪ד‚³דƒ³ד‚’ט¡¨ח₪÷ד�™ד‚‹';
t['20'] = 'דƒ–דƒƒד‚¯דƒ�דƒ¼ד‚¯ד‚’ט¡¨ח₪÷ד�™ד‚‹';
t['UPDATEPOP'] = 'ז�€ז–°ד�®זƒ…ו ±ד�«ז›´ז–°';
t['OVERVIEW'] = 'ז¦‚ט¦�';
t['FORUM'] = 'דƒ•ד‚©דƒ¼דƒ©דƒ ';
t['ATTACKS'] = 'זˆ¦י—˜';
t['NEWS'] = 'דƒ‹דƒ¥דƒ¼ד‚¹';
t['AT2'] = 'ז�´ו…µ';
t['AT3'] = 'י€�ו¸¸ז”»ז’ƒ';
t['AT4'] = 'ו¥‡ט¥²';
t['MAPSCAN'] = 'דƒ�דƒƒדƒ—ד‚’ד‚¹ד‚­דƒ£דƒ³';
t['ALFL'] = 'ו₪–יƒ¨ד�®דƒ•ד‚©דƒ¼דƒ©דƒ ד�¸ד�®דƒ×דƒ³ד‚¯<br>(ו†…יƒ¨דƒ•ד‚©דƒ¼דƒ©דƒ ד‚’ה½¿ד�†ו ´ו�ˆד�¯ז›¸ד�‹ד�×ד�„ד�§ד��ד� ד�•ד�„ד€‚)';
t['22'] = 'דƒ¡דƒ¢ו¸³ד‚’ט¡¨ח₪÷ד�™ד‚‹';
t['24'] = 'דƒ¡דƒ¢ו¸³ד�®ד‚µד‚₪ד‚÷';
t['25'] = 'דƒ¡דƒ¢ו¸³ד�®י«˜ד�•';
t['10'] = "זˆ¦י—˜ד‚·דƒ�דƒ¥דƒ¬דƒ¼ד‚¿דƒ×דƒ³ד‚¯ט¨­ו®�<br>(דƒ¡דƒ‹דƒ¥דƒ¼ו·¦)";
t['28'] = "analyserד�¸ד�®דƒ×דƒ³ד‚¯ד‚’ט¡¨ח₪÷";
t['27'] = "World Analyserד�®ט¨­ו®�";
t['38'] = 'ט‰²ד�§דƒ×ד‚½דƒ¼ד‚¹ד�®דƒ¬דƒ™דƒ«ד‚’ט¡¨ח₪÷';
t['43'] = 'ד‚»דƒ³ד‚¿דƒ¼ד�®ז•°ו­—ד‚’ט¡¨ח₪÷';
t['44'] = 'ט‰²ד�§ו»÷ח‰©ד�®דƒ¬דƒ™דƒ«ד‚’ט¡¨ח₪÷';
t['56'] = "ד‚°דƒ×דƒƒדƒ‰ד�®ד‚¿ד‚₪דƒ—ד‚’ט¡¨ח₪÷/ד‚×ד‚¢ד‚·ד‚¹ד‚₪דƒ³דƒ•ד‚©דƒ¡דƒ¼ד‚·דƒ§דƒ³";
t['VLC'] = 'ז�‘ד�®ה¸­ו¿ƒ';
t['41'] = "ו»÷ח‰©ד�®ד‚¢דƒƒדƒ—ד‚°דƒ¬דƒ¼דƒ‰דƒ†דƒ¼דƒ–דƒ«ד‚’ט¡¨ח₪÷ד�™ד‚‹";
t['59'] = 'דƒ¬דƒ�דƒ¼דƒˆדƒ�דƒ¼ד‚¸ד�®ו��ז™‚ד�«ט×­ד�¿ט¾¼ד‚€דƒ�דƒ¼ד‚¸ז•°<br>(Default = 1)';
t['NONEWVER'] = "ד�‚ד�×ד��ד�¯ז�€ז–°דƒ�דƒ¼ד‚¸דƒ§דƒ³ד‚’ז��ד�£ד�¦ד�„ד�¾ד�™ד€‚";
t['MTC'] = 'ח·�ט¼¸י€�י‡�';
t['MTW'] = 'ה½™ו‰°ט¼¸י€�י‡�';
t['SOREP'] = "ד‚×דƒ×ד‚¸דƒ�דƒ«דƒ¬דƒ�דƒ¼דƒˆד‚’ט¦‹ד‚‹";
t['EDIT'] = 'ח·¨י›†';
t['MTX'] = 'ה¸�ט¶³ט¼¸י€�י‡�';
t['VGL'] = 'ז�‘ד�®דƒ×ד‚¹דƒˆ';
t['TOTALTROOPS'] = 'ו…¨ז�‘ד�®ו…µו£«';
t['SELECTALLTROOPS'] = "ד�™ד�¹ד�¦ד�®ו…µו£«ד‚’י�¸ז��";
t['SELECTSCOUT'] = "ד‚¹ד‚«ד‚¦דƒˆד‚’י�¸ז��";
t['SELECTFAKE'] = "דƒ•ד‚§ד‚₪ד‚¯ד‚’י�¸ז��";
t['NPCSAVETIME'] = 'ז™‚י–“ד‚’ח¯€ח´„:';
t['SAVE'] = 'ה¿�ו­˜';
t['NOTROOP2SCOUT'] = "ד‚¹ד‚«ד‚¦דƒˆד��ו±…ד�¾ד�›ד‚“!";
t['SVGL'] = 'ו…¨ז�‘ד�§ו…±ז�‰ד�™ד‚‹';
t['49'] = 'י›†ו…µז‰€ד�®ו�÷ז�¬ד‚¢ד‚¯ד‚·דƒ§דƒ³';
t['50'] = 'ד‚¹ד‚«ד‚¦דƒˆד‚’י�¸ד‚“ד� י�›ד€�י�¸ז��ד�™ד‚‹ה÷÷ז•°';
t['53'] = 'ו…µו£«ד‚¢ד‚₪ד‚³דƒ³ד‚’י�¸ד‚“ד� י�›ד€�ט©³ח´°זƒ…ו ±ד‚’ט¡¨ח₪÷';
t['54'] = 'ז�‘ד�®ו��ו‰�ד‚’י�¸ד‚“ד� י�›ד€�ט·�י›¢דƒ»ז™‚י–“ד‚’ט¡¨ח₪÷ד�™ד‚‹';
t['NPCO'] = 'NPCדƒˆדƒ¬דƒ¼דƒ‰ד‚×דƒ—ד‚·דƒ§דƒ³';
t['26'] = 'NPCדƒˆדƒ¬דƒ¼דƒ‰ד�¸ד�®דƒ×דƒ³ד‚¯ד�®ט¡¨ח₪÷';
t['USETHEM1H'] = '1ז™‚י–“ח”�ח”£י‡�';
t['NEWVILLAGEAV'] = 'ז–°ד�—ד�„ז�‘';
t['58'] = 'דƒ—דƒ¬ד‚₪דƒ₪דƒ¼דƒ×ד‚¹דƒˆד�®ט¡¨ח₪÷(ז�‘דƒ»ד‚×ד‚¢ד‚·ד‚¹)';
t['USETHEMEQ'] = 'ו�‡ח­‰';
t['USETHEMPR'] = 'ז¯”ה¾‹';
t['NEWVILLAGEAV'] = 'ז—¥ה»˜/ז™‚וˆ»';
t['TIMEUNTIL'] = 'ו¾…ד�¡ז™‚י–“';
t['61'] = 'דƒ¬דƒ�דƒ¼דƒˆדƒ�דƒ¼ד‚¸ד�«ד€�ו…¨ד�¦ו‰�י™₪ד€�דƒ�ד‚¿דƒ³ד‚’ט¿½ו� ';
t['CENTERMAP'] = 'ז�‘ד‚’ה¸­ו¿ƒד�«MAPט¡¨ח₪÷';
t['13'] = 'ד€�ז�‘ד‚’ה¸­ו¿ƒד�«דƒ�דƒƒדƒ—ד‚’ט¡¨ח₪÷ד€�ד‚¢ד‚₪ד‚³דƒ³ד�®ט¿½ו� ';
t['SENDTROOPS'] = 'ו…µו£«ד‚’י€�ד‚‹';
t['7'] = "ו®®ז®¿/ו®˜י‚¸/ו­¦י™¢/י‡‘ו÷«";
t['PALACE'] = "ו®®ז®¿";
t['RESIDENCE'] = "ו®˜י‚¸";
t['ACADEMY'] = "ו­¦י™¢";
t['TREASURY'] = "י‡‘ו÷«";
t['45'] = "ד‚¢דƒƒדƒ—ד‚°דƒ¬דƒ¼דƒ‰ד‚’ט¡�ד�£ד�¦ד�„ד‚‹ו»÷ח‰©ד�®LVד‚’ח‚¹ז»…ט¡¨ח₪÷";
t['14'] = "ז�‘ד�®ה¸€ט¦§ד�«ד€�ו…µו£«דƒ»ט³‡ז÷�ד‚’י€�ד‚‹ד€�ד‚¢ד‚₪ד‚³דƒ³ד�®ט¿½ו� ";
t['34'] = "ד‚¢דƒƒדƒ—ד‚°דƒ¬דƒ¼דƒ‰דƒ†דƒ¼דƒ–דƒ«ד�«CPד�®ח”�ח”£י‡�ד�®ט¡¨ח₪÷";
t['UPGTB'] = "ד‚¢דƒƒדƒ—ד‚°דƒ¬דƒ¼דƒ‰דƒ†דƒ¼דƒ–דƒ«";
t['35'] = "ד‚¢דƒƒדƒ—ד‚°דƒ¬דƒ¼דƒ‰דƒ†דƒ¼דƒ–דƒ«ד�«ח©€ח‰©ז¶ˆט²»י‡�ד‚’ט¡¨ח₪÷";
t['16'] = "ז�‘ד�®ה¸€ט¦§ד�«ח©€ח‰©ח”�ח”£י‡�ד‚’ט¡¨ח₪÷";
t['39'] = "דƒ×ד‚½דƒ¼ד‚¹דƒ�דƒ¼ד‚’ט¿½ו� ד�™ד‚‹";
t['40'] = "דƒ×ד‚½דƒ¼ד‚¹דƒ�דƒ¼דƒ†דƒ¼דƒ–דƒ«ד‚’דƒ•דƒ­דƒ¼דƒ†ד‚£דƒ³ד‚°ד‚¦ד‚£דƒ³דƒ‰ד‚¦ו�–ד�™ד‚‹";
t['21'] = "דƒ–דƒƒד‚¯דƒ�דƒ¼ד‚¯ד‚’דƒ•דƒ­דƒ¼דƒ†ד‚£דƒ³ד‚°ד‚¦ד‚£דƒ³דƒ‰ד‚¦ו�–ד�™ד‚‹";
t['23'] = "דƒ�דƒ¼דƒˆדƒ–דƒƒד‚¯ד‚’ד‚’דƒ•דƒ­דƒ¼דƒ†ד‚£דƒ³ד‚°ד‚¦ד‚£דƒ³דƒ‰ד‚¦ו�–ד�™ד‚‹";
t['64'] = 'זˆ¦י—˜דƒ¬דƒ�דƒ¼דƒˆד�®חµ±ט¨ˆד�®ט©³ח´°ד‚’ט¡¨ח₪÷ד�™ד‚‹';
t['17'] = "ז�‘ד�®ה¸€ט¦§ד�«ה÷÷ו�£ד‚’ט¡¨ח₪÷";
t['29'] = 'Map Analyser ד�®ט¨­ו®�';
t['30'] = 'דƒ¦דƒ¼ד‚¶דƒ¼ו��ד�«MAPד�¸ד�®דƒ×דƒ³ד‚¯ד‚¢ד‚₪ד‚³דƒ³ד‚’ט¿½ו� ';
t['31'] = 'ו��ח›�ו��ד�«MAPד�¸ד�®דƒ×דƒ³ד‚¯ד‚¢ד‚₪ד‚³דƒ³ד‚’ט¿½ו� ';
t['60'] = 'דƒ�דƒƒדƒ—ד‚¢דƒƒדƒ—ד�¨ד�—ד�¦דƒ¡דƒƒד‚»דƒ¼ד‚¸ד‚’ט¡¨ח₪÷ד�™ד‚‹ד‚¢ד‚₪ד‚³דƒ³ד�®ט¿½ו� ';
t['63'] = 'זˆ¦י—˜דƒ¬דƒ�דƒ¼דƒˆד�®חµ±ט¨ˆד‚’ט¡¨ח₪÷ד�™ד‚‹';
t['18'] = 'ז�‘ד�®דƒ×ד‚¹דƒˆד‚’2וˆ—ד�«ד�—ד�¦דƒ•דƒ­דƒ¼דƒ†ד‚£דƒ³ד‚°ד‚¦ד‚£דƒ³דƒ‰ד‚¦ו�–ד�™ד‚‹';
t['60'] = 'דƒ¡דƒƒד‚»דƒ¼ד‚¸/דƒ¬דƒ�דƒ¼דƒˆד‚’דƒ�דƒƒדƒ—ד‚¢דƒƒדƒ—ד�§ט¡¨ח₪÷ד�™ד‚‹דƒ×דƒ³ד‚¯ד�®ט¿½ו� ';
t['42'] = 'ד‚¢דƒƒדƒ—ד‚°דƒ¬דƒ¼דƒ‰דƒ†דƒ¼דƒ–דƒ«ד‚’ו��ו‰�י †ד�«ט¡¨ח₪÷';
t['19'] = 'ז�‘ד�®דƒ×ד‚¹דƒˆד�«ו»÷ט¨­ד�—ד�¦ד�„ד‚‹ו»÷ח‰©ד�®זƒ…ו ±ד‚’ט¡¨ח₪÷';
t['32'] = 'ד‚µדƒ¼דƒ�דƒ�דƒ¼ד‚’ט¿½ו� ';
t['3'] = 'דƒ•ד‚¡דƒ©דƒ³ד‚¯ד‚¹דƒ»דƒ¬ד‚¸דƒ§דƒ�ד‚¢ד‚’T3.1ד�¨ד�—ד�¦ט¨ˆח®—ד�™ד‚‹<br>(for mixed T3.1 & T3.5 servers)jp1ן½�jp3';
t['33'] = "ד‚µדƒ¼דƒ�דƒ�דƒ¼ד‚’דƒ•דƒ­דƒ¼דƒ†ד‚£דƒ³ד‚°ד‚¦ד‚£דƒ³דƒ‰ד‚¦ו�–ד�™ד‚‹";
t['36'] = "ד‚¢דƒƒדƒ—ד‚°דƒ¬דƒ¼דƒ‰/דƒˆדƒ¬דƒ¼דƒ‹דƒ³ד‚°דƒ†דƒ¼דƒ–דƒ«ד�®ט©³ח´°ד�×ט¨ˆח®—ד‚’ט¡¨ח₪÷";
t['RESIDUE'] = 'ו®�ט¡�ו¾�';
t['RESOURCES'] = 'ו®�ט¡�ו�¯טƒ½ז™‚';
t['2'] = 'ו÷ƒו‘�דƒ�דƒ�דƒ¼ד‚’ו‰�י™₪ד�—ד€�ד‚µדƒ¼דƒ�ז™‚י–“ד�®ה½�ח½®ד‚’ו₪‰ז›´';
t['12'] = "ז�‘ד�®ז¦‚ט¦³דƒ»ז�‘ד�®ה¸­ו¿ƒד�®דƒ×דƒ³ד‚¯ד‚’ט¡¨ח₪÷";
t['15'] = "ז�‘ד�®דƒ×ד‚¹דƒˆד�«ט³‡ז÷�(ז�¨דƒ»ח²˜ו��דƒ»י‰„)ד�®ח”�ח”£י‡�ד‚’ט¿½ו� ";
t['46'] = "ט¼¸י€�ה¸­ד�®ח‰©ט³‡ד�®ט©³ח´°ד‚’ט¡¨ח₪÷";
t['ATTABLES'] = 'י…�ו‚™ה¸€ט¦§'; 
break;
case "sk"://by NeWbie (a.k.a. Matthew-PoP), kupony
//avRace = ['Rimania', 'Germֳ¡ni', 'Galovia'];
t['1'] = "Travian v2.x server";
t['2'] = 'Vymazaֵ¥ reklamnֳ© bannery';
t['3'] = 'Vypoִ�itaֵ¥ kapacitu vojakov T3.1 Legionֳ¡rov & Falangov<br>(pre mixovanֳ© T3.1 & T3.5 servery)';
t['4'] = 'Trhovisko';
t['5'] = 'Zhromaֵ¾disko/Kasֳ¡rne/Dielֵˆa/Stֳ¡jֵˆa';
t['6'] = "Radnica/Hrdinskֳ½ dvor/Vֳ½zbroj/Kovֳ¡ִ�";
t['7'] = "Palֳ¡c/Rezidencia/Akadֳ©mia/Pokladnica";
t['8'] = 'Aliancia';
t['9'] = "Ukֳ¡ֵ¾ prֳ­davnֳ© linky v ִ¾avom menu<br>(Traviantoolbox, World Analyser, Travilog, Mapu, atִ�.)";
t['10'] = "Link na bojovֳ½ simulֳ¡tor:<br>(ִ¾avֳ© menu)";
t['11'] = "Link na poslanie spravodajskֳ½ch sprֳ¡v";
t['12'] = "Ukֳ¡ֵ¾ 'dorf1.php' a 'dorf2.php' linky";
t['13'] = 'Ukֳ¡ֵ¾ ikonu" vycentruj mapu na dedinu ';
t['14'] = "Ukֳ¡ֵ¾ 'Poslaֵ¥ vojakov/Poslaֵ¥ suroviny' ikonky v zozname dedֳ­n";
t['15'] = "Ukֳ¡ֵ¾ produkciu drevo, hliny, ֵ¾elezo v zozname dedֳ­n";
t['16'] = "Ukֳ¡ֵ¾ produkciu obilia v zozname dedֳ­n";
t['17'] = "Zobraziֵ¥ populaciu v zozname dedֳ­n";
t['18'] = 'Ukֳ¡ֵ¾ dalֵ¡ie 2 stִ÷py zoznamu dedֳ­n posuvne ';
t['19'] = 'Ukֳ¡ֵ¾ informֳ¡cie o budovֳ¡ch vo vֳ½stavbe a a pohybe jednotie<br>v zozname dedֳ­n';
t['20'] = 'Ukֳ¡ֵ¾ zֳ¡loֵ¾ky';
t['21'] = "Zobraziֵ¥ 'zֳ¡loֵ¾ky' ako posuvne okno";
t['22'] = "Zobraziֵ¥ ikony 'poslaֵ¥ jednotky/suroviny' v zoznamu dediny";
t['23'] = "Zobraziֵ¥ 'poznֳ¡mkovֳ½ blok' ako posuvne okno";
t['24'] = "Zobraziֵ¥ produkciu obilia v zozname dedine";
t['25'] = 'Vֳ½ֵ¡ka poznamkovֳ©ho bloku';
t['26'] = 'Ukֳ¡ֵ¾ kalkulaִ�ku/linky NPC asistenta';
t['27'] = "Analyzֳ¡tor";
t['28'] = "Ukaֵ¾ link na analyzֳ¡tor ";
t['29'] = 'Mapy k pouֵ¾itiu';
t['30'] = 'Zobraziֵ¥ odkazy na mapu pre hrֳ¡ִ�a';
t['31'] = 'Zobraziֵ¥ odkazy na mapu pre alianciu';
t['32'] = "Ukֳ¡ֵ¾ 'Tabuִ¾ku vyhִ¾adavanie'";
t['33'] = "Ukֳ¡ֵ¾ 'Tabuִ¾ku vyhִ¾adavanie' ako posuvne okno";
t['34'] = "Ukֳ¡ֵ¾ KB/deֵˆ v tabuִ¾kֳ¡ch upgradu";
t['35'] = "Ukֳ¡ֵ¾ spotrebu obilia v upgrade tabuִ¾kֳ¡ch";
t['36'] = "Ukֳ¡ֵ¾ vֳ½poִ�et 'Do/Zostֳ¡va' vupgrade/trֳ©novacֳ­ch tabuִ¾kֳ¡";
t['37'] = "Ukֳ¡ֵ¾ tabuִ¾ku pre upgrade surovinovֳ½ch poli";
t['38'] = 'Ukֳ¡ֵ¾ ֳ÷roveֵˆ surovinovֳ½ch polֳ­ farebne';
t['39'] = "Ukֳ¡ֵ¾ 'Tabuִ¾ku surovin'";
t['40'] = "Zobraziֵ¥ 'Tabuִ¾ku surovin' ako posuvne okno";
t['41'] = "Ukֳ¡ֵ¾ tabuִ¾ku pre upgrade budov";
t['42'] = "Zobraziֵ¥ KB/den v tabuִ¾ke stavieb";
t['43'] = "Zobraziֵ¥ spotrebu obilia v tabuִ¾ke stavieb";
t['44'] = 'Ukֳ¡ֵ¾ ֳ÷roveֵˆ budov farebne';
t['45'] = "Ukֳ¡zaֵ¥ blikajֳ÷c budovy ktorֳ© sa upgradujֳ÷?";
t['46'] = "Ukֳ¡ֵ¾ rozֵ¡irujֳ÷ce informֳ¡cie pri kaֵ¾dom prֳ­chode obchodnֳ­ka";
t['47'] = "Ukֳ¡ֵ¾ poslednֳ½ transport obchodnֳ­kom";
t['48'] = "Poִ�et kontrolovanֳ½ch strֳ¡nok na trhovovisku => Nֳ¡kupnֳ½ch strֳ¡nok<br>(Prednastavenֳ© = 1)";
t['49'] = 'Prednastavenֳ¡ akcia zhromaֵ¾diֵ¡tia';
t['50'] = 'Niesu ֵ¡pehovia<br>"Vyberte funkciu ֵ¡peha';
t['51'] = "Ukֳ¡ֵ¾ poslednֳ½ ֳ÷tok";
t['52'] = "Ukֳ¡ֵ¾/pouֵ¾i sֳ÷radnice poslednֳ©ho ֳ÷toku";
t['53'] = 'Ukֳ¡ֵ¾ informֳ¡cie o vojakoch v bublinֳ¡ch';
t['54'] = 'Ukֳ¡ֵ¾ zdialenosֵ¥ a ִ�as od dediny v bublinֳ¡ch';
t['55'] = "Vo vojnovom simulֳ¡tory automatcky doplֵˆ";
t['56'] = "Ukaֵ¾ typ bunky/oֳ¡zy info<br>keִ� chodiֵ¡ myֵ¡ou po mape";
t['57'] = 'Ukֳ¡ֵ¾ zdialenosֵ¥ a ִ�as';
t['58'] = 'Ukֳ¡ֵ¾ tabuִ¾ku s hrֳ¡ִ�my/dedinamy/okupovaֳ½mi oֳ¡zami';
t['59'] = 'Poִ�et sprֳ¡v/hlֳ¡senֳ­ strֳ¡nka na preload<br>(Prednastavenֳ© = 1)';
t['60'] = 'Ukֳ¡ֵ¾ link na otvorenie sprֳ¡vy v pop-up';
t['61'] = 'Ukֳ¡ֵ¾ "Vymazaֵ¥ vֵ¡etkֳ½" tabuִ¾ky na strֳ¡nke s hlֳ¡seniami';
t['62'] = 'Ukֳ¡ֵ¾ " v poֵ¡li sprֳ¡vu" ikonu aj pre mֵˆa';
t['63'] = 'Ukֳ¡ֵ¾ TB3 rozֵ¡ֳ­renֳ© Hlֳ¡senie vojny';
t['64'] = 'Ukֳ¡ֵ¾ detaily v ֵ¡tatistikֳ¡ch hlֳ¡senֳ­';
t['65'] = 'Farba, upgradu<br>(Prednastavenֳ© = Prֳ¡zdne)';
t['66'] = 'Farba, maximֳ¡lnej ֳ÷rovne<br>(Prednastavenֳ© = Prֳ¡zdne)';
t['67'] = 'Farba, nemoֵ¾nֳ©ho upgradu<br>(Prednastavenֳ© = Prֳ¡zdne)';
t['68'] = 'Farba, upgradu cez NPC<br>(Prednastavenֳ© = Prֳ¡zdne)';
t['69'] = "ֳ�roveֵˆ konzoly. Len pre programֳ¡torov alebo na odstrֳ¡nenie chֳ½b.<br>(Prednastavenֳ© = 0)";
//no t items [70..79] & [80..83]
//t['80'] = t['53'] and t['81'] = t['54'] - both will be set after switchlanguage()
t['82.L'] = 'Zamkni zֳ¡loֵ¾ku (Skry vymaֵ¾, posuֵˆ hore/dole ikony)';
t['82.U'] = 'Odomkni zֳ¡loֵ¾ky (Ukֳ¡ֵ¾ vymaֵ¾, posuֵˆ hore/dole ikony)';
t['85'] = "Ukֳ¡ֵ¾ ikonky 'Poslaֵ¥ jednotky/suroviny'";
t['87'] = "Zapamֳ₪taֵ¥ si 1x/2x/3x nastavenia obchodu (pokiaִ¾ je dostupne)";
t['SIM'] = 'Bojovֳ½ simulֳ¡tor';
//setup end
//user info
t['U.2'] = 'Kmeֵˆ';
t['U.3'] = 'Meno tvojej hlavnej dediny<br>Pozry si svoj profil pre opravu';
t['U.6'] = 'Sֳ÷radnice hlavnej dediny.<br>Pozri svֳ´j profil';
t['SIM'] = 'Bojovֳ½ simulֳ¡tor';
t['QSURE'] = 'Naozaj?';
t['LOSS'] = 'Strata';
t['PROFIT'] = 'Zisk';
t['EXTAV'] = 'Mֳ´ֵ¾eֵ¡ stavaֵ¥';
t['PLAYER'] = 'Hrֳ¡ִ�;';
t['VILLAGE'] = 'Dedina';
t['POPULATION'] = 'Populֳ¡cia';
t['COORDS'] = 'Sֳ÷radnice';
t['MAPTBACTS'] = 'Akcie';
t['SAVED'] = 'Uloֵ¾enֳ©';
t['YOUNEED'] = 'Potrebujeֵ¡';
t['TODAY'] = 'dnes';
t['TOMORROW'] = 'zajtra';
t['DAYAFTERTOM'] = 'pozajtra';
t['MARKET'] = 'Trh';
t['BARRACKS'] = 'Kasֳ¡rne';
t['RAP'] = 'Zhromaֵ¾diֵ¡te';
t['STABLE'] = 'Stajֵˆa';
t['WORKSHOP'] = 'Dielֵˆa';
t['SENDRES'] = 'Poֵ¡li suroviny';
t['BUY'] = 'Kֳ÷piֵ¥';
t['SELL'] = 'Predaֵ¥';
t['SENDIGM'] = 'Poֵ¡li sprֳ¡vu';
t['LISTO'] = 'Mֳ´ֵ¾eֵ¡ stavaֵ¥';
t['ON'] = 'Dֵˆa';
t['AT'] = 'o';
t['EFICIENCIA'] = 'Efektivnosֵ¥';
t['NEVER'] = 'Nikdy';
t['ALDEAS'] = 'Poִ�et dedֳ­n';
t['TIEMPO'] = 'ִ�as';
t['OFREZCO'] = 'Ponuka';
t['BUSCO'] = 'Vyhִ¾adaֵ¥';
t['TIPO'] = 'Typ';
t['DISPONIBLE'] = 'Len dostupnֳ©';
t['CUALQUIERA'] = 'Hociakֳ¡';
t['YES'] = 'ֳ�NO';
t['NO'] = 'NIE';
t['LOGIN'] = 'Prihlֳ¡siֵ¥';
t['MARCADORES'] = 'Zֳ¡loֵ¾ka';
t['ANYADIR'] = 'Pridaֵ¥;';
t['UBU'] = 'Url adresa';
t['UBT'] = 'Nֳ¡zov zֳ¡loֵ¾ky';
t['DEL'] = 'Vymazaֵ¥;';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Maximֳ¡lny ִ�as';
t['ARCHIVE'] = 'Archivovaֵ¥';
t['SUMMARY'] = 'Hlֳ¡senie';
t['TROPAS'] = 'Vojsko';
t['CHKSCRV'] = 'Aktualizuj';
t['ACTUALIZAR'] = 'Aktualizovaֵ¥ informֳ¡cie o dedine';
t['VENTAS'] = 'Uloֵ¾iֵ¥ ponuky';
t['MAPSCAN'] = 'Skenovaֵ¥ mapu';
t['BIC'] = 'Ukֳ¡ֵ¾ rozֵ¡irujֳ÷ce ikony';
t['SAVE'] = 'Uloֵ¾enֳ©';
t['AT2'] = 'Podpora';
t['AT3'] = 'Normֳ¡lny ֳ÷tok ';
t['AT4'] = 'Lֳ÷peֵ¾';
t['NBSA'] = 'Automatickֳ¡';
t['NBSN'] = 'Normֳ¡lna (malֳ¡)';
t['NBSB'] = 'veִ¾kֳ¡';
t['NBHAX'] = 'Automatickֳ© rozֵ¡ֳ­renie vֳ½ֵ¡ky';
t['NBHK'] = 'Prednastavenֳ¡ vֳ½ֵ¡ka';
t['NPCSAVETIME'] = 'Uֵ¡etrite:';
t['TOTALTROOPS'] = 'Vֵ¡etky jednotky vycviִ�enֳ© v tejto dedine';
t['SELECTALLTROOPS'] = "Vybraֵ¥ vֵ¡etky jednotky";
t['PARTY'] = "Oslavy";
t['CPPERDAY'] = "KB/denne";
t['SLOT'] = "Slot";
t['TOTAL'] = "Spolu";
t['SELECTSCOUT'] = "Vyber poִ�et ֵ¡pehov";
t['SELECTFAKE'] = "Vyber jednotky na fake";
t['NOSCOUT2FAKE'] = "Je nemoֵ¾nֳ© pouֵ¾iֵ¥ ֵ¡peha na fake!";
t['NOTROOP2FAKE'] = "Nemֳ¡te jednotky na fake!";
t['NOTROOP2SCOUT'] = "Nemֳ¡te jednotky na ֵ¡pehovanie !";
t['NOTROOPS'] = "ֵ½iadne jednotky v dedine !";
t['ALL'] = "Vֵ¡etko";
t['SH2'] = "Mֳ´ֵ¾eֵ¡ vloֵ¾iֵ¥ farby :<br>- green alebo red alebo orange, atִ�. Farby zadֳ¡vajte len v Angliֵ¡tine.<br>- Naprֳ­klad HEX farba #004523.<br>- Nechajte prֳ¡zdne ak chcete maֵ¥ prednastavenֳ© farby";
t['SOREP'] = "Ukֳ¡ֵ¾ originֳ¡lne sprֳ¡vy";
t['WSIMO1'] = "Internֳ½ (poskytovanֳ½ hrou)";
t['WSIMO2'] = "Externֳ½ (poskytnutֳ½ kirilloid.ru)";
t['NONEWVER'] = "Mֳ¡te poslednֳ÷ verziu";
t['BVER'] = "Mֳ¡te beta verziu";
t['NVERAV'] = "Je novֵ¡ia verzia";
t['UPDSCR'] = "Aktualizovaֵ¥ script teraz?";
t['CHECKUPDATE'] = "Kontrolujem aktualizֳ¡cie...";
t['CROPFINDER'] = "Vyhִ¾adֳ¡vaִ� obilia";
t['AVPPV'] = "Priemernֳ¡ populֳ¡cia na dedinu";
t['AVPPP'] = "Priemernֳ¡ populֳ¡cia na hrֳ¡ִ�a";
t['MAX'] = 'Maximum';
//version 3.0.7
t['TOTTRTR'] = 'Vֵ¡etci vojaci vo vֳ½cviku';
//version 3.1.3
t['TB3SL'] = TB3O.shN + ' nastavenia';
t['UPDALLV'] = 'Updatuj vֵ¡etkֳ½ dediny. POUֵ½IVAJTE S MAXIMֳ�LNOU STAROSTLIVOSֵ₪OU<br>LEBO TO Mֳ´ֵ¾E VIESֵ₪ K ZRUֵ ENIU ֳ�ִ�TU !';
//version 3.1.7
t['LARGEMAP'] = 'Veִ¾kֳ¡ mapa';
//version 3.1.9
t['USETHEMPR'] = 'Pouֵ¾ֳ­ ich (proporִ�ne)';
t['USETHEMEQ'] = 'Pouֵ¾ֳ­ ich (rovnֳ½m dielom)';
//version 3.2
t['TOWNHALL'] = 'Radnica';
t['GSRVT'] = 'Server hry';
t['ACCINFO'] = 'Informֳ¡cie o ֳ÷ִ�te';
t['NBO'] = 'Poznֳ¡mkovֳ½ blok';
t['MNUL'] = 'Menu na ִ¾avom boku';
t['STAT'] = 'ֵ tatistika';
t['RESF'] = 'Surovinovֳ© polia';
t['VLC'] = 'Centrum dediny';
t['MAPO'] = 'Nastavenia mapy';
t['COLO'] = 'Nastavenia farieb';
t['DBGO'] = 'Nastavenia v ladenֳ­';
t['HEROSMANSION'] = "Hrdinskֳ½ dvor";
t['BLACKSMITH'] = 'Kovֳ¡ִ�';
t['ARMOURY'] = 'Zbrojnica';
t['NOW'] = 'Teraz';
t['CLOSE'] = 'Zavrieֵ¥';
t['USE'] = 'Pouֵ¾iֵ¥';
t['USETHEM1H'] = 'Pouֵ¾iֵ¥ (1 h. produkcia)';
t['OVERVIEW'] = 'Nֳ¡hִ¾ad';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'ֳ�tok;';
t['NEWS'] = 'Noviny';
t['ADDCRTPAGE'] = 'Pridaֵ¥ tֳ÷to strֳ¡nku';
t['SCRPURL'] = 'TBeyond strֳ¡nka';
t['SPACER'] = 'Odeִ¾ovaִ�';
t['MEREO'] = 'Sprֳ¡vy & Hlֳ¡senia';
t['ATTABLES'] = 'Tabuִ¾ka jednotiek';
t['MTW'] = 'Obchodnֳ­ci eֵ¡te unesֳ÷';
t['MTX'] = 'Presahuje o';
t['MTC'] = 'Zaֵ¥aֵ¾enie obchodnֳ­ka';
t['ALFL'] = 'Link na externֳ© forum<br>(Nechaj prֳ¡zdne pre internֳ© forum)';
t['MTCL'] = 'Vyִ�istiֵ¥ vֵ¡etko';
t['CKSORT'] = 'Klikni roztiediֵ¥';
t['MIN'] = 'Minimum';
t['SVGL'] = 'Pre vֵ¡etky dediny';
t['VGL'] = 'Zoznam dedin';
t['UPDATEPOP'] = 'Updatuj populֳ¡ciu';
t['EDIT'] = 'Edituj';
t['NPCO'] = 'Nastavenia NPC asistenta';
t['NEWVILLAGEAV'] = 'Dֳ¡tum/ִ�aֵ¡';
t['TIMEUNTIL'] = 'ִ�as vyִ�kֳ¡vania';
t['CENTERMAP'] = 'Vycentruj mapu na tֳ÷to dedinu ';
t['SENDTROOPS'] = 'Poslaֵ¥ jednotky';
t['PALACE'] = "Palֳ¡c";
t['RESIDENCE'] = "Rezidencia";
t['ACADEMY'] = "Akadֳ©mia";
t['TREASURY'] = "Pokladnica";
t['UPGTB'] = "Ukֳ¡ֵ¾ Surovinove polia/tabuִ¾ky upgradu budou";
t['RBTT'] = "Tabuִ¾ka surovin";
t['UPGTB']	= "Tabuִ¾ka vylepֵ¡enֳ­ surovinovֳ½ch polֳ­/budou";
t['RESIDUE'] = 'Ak vybudujeֵ¡ zostane ti ';
t['RESOURCES'] = 'Suroviny';
//3.8.7.6.3
t['SH1'] = "Otvoriֵ¥ tvoj Profil pre automaticke zistenie Hlavnej dediny/sֳ÷radnֳ­c<br>Vybuduj kasֳ¡rne pree automaticke zistetie kmeֵˆa a otvor stred dediny";
t['RESEND'] = "Poslaֵ¥ znova ?";
//3.8.8.8.9
t['WSI'] = "Vojnovֳ½ simulֳ¡tor prevֳ¡dzkovanֳ½ hrou";
t['TTT'] = "Vֵ¡eobecnֳ© vojsko/bublinky o vzdialenosti";
break;
case "tr"://by greench, alinafiz, LeventT
//avRace = ['Romalִ±lar', 'Cermenler', 'Galyalִ±lar'];
t['1'] = "Travian v2.x sunucusu";
t['3'] = 'T3.1 Lejyoner & Phalanx kapasite hesaplayִ±cִ±yִ± zorla<br>(karִ±ֵ�ִ±k T3.1 & T3.5 sunucularִ± iֳ§in)';
t['4'] = 'Pazar yeri';
t['5'] = 'Askeri ֳ�s/Kִ±ֵ�la/Tamirhane/Ahִ±r';
t['6'] = "Belediye/Kahraman Kִ±ֵ�lasִ±/Silah Dֳ¶kֳ¼mhanesi/Zִ±rh Dֳ¶kֳ¼mhanesi";
t['7'] = "Saray/Kֳ¶ֵ�k/Akademi/Hazine Binasִ±";
t['8'] = 'Birlik';
t['9'] = "Sol menֳ¼de ek baִ�lantִ±lar gֳ¶ster<br>(Traviantoolbox, World Analyser, Travilog, Map, benzeri.)";
t['10'] = "Savaֵ� simֳ¼latֳ¶rֳ¼ kullanִ±mִ±:<br>(sol menֳ¼)";
t['12'] = "'dorf1.php' ve 'dorf2.php' baִ�lantִ±larִ±nִ± gֳ¶ster";
t['13'] = '"Bu kֳ¶yֳ¼ haritada ortala" simgesini gֳ¶ster';
t['14'] = "Kֳ¶y listesinde 'Destek gֳ¶nder/Hammadde gֳ¶nder' simgelerini gֳ¶ster";
t['15'] = "Saatlik odun, tuִ�la, demir ֳ¼retimini kֳ¶y listesinde gֳ¶ster";
t['16'] = "Kֳ¶y listesinde net tahִ±l ֳ¼retimini gֳ¶ster";
t['17'] = "Kֳ¶y listesinde nֳ¼fusu gֳ¶ster";
t['18'] = 'Kayan pencere olarak ek kֳ¶y listesini gֳ¶ster (2 sֳ¼tunlu)';
t['19'] = 'Kֳ¶y listesinde asker hareketleri ve inֵ�aat bilgilerini gֳ¶ster';
t['20'] = 'Yerimlerini gֳ¶ster';
t['21'] = "'Kullanִ±cִ± Yerimleri'ni kayan pencere olarak gֳ¶ster";
t['22'] = 'Not defterini gֳ¶ster';
t['23'] = "'Not Defteri'ni kayan pencere olarak gֳ¶ster";
t['24'] = 'Not defteri boyutu';
t['25'] = 'Not defteri yֳ¼ksekliִ�i';
t['26'] = 'NPC Asistanִ± hesaplayִ±cִ±sִ±nִ±/baִ�lantִ±larִ±nִ± gֳ¶ster';
t['27'] = "ִ°statistik sitesi kullanִ±mִ±";
t['28'] = "Baִ�lantִ±larda istatistik baִ�lantִ±sִ±nִ± gֳ¶ster";
t['29'] = 'Kullanִ±cִ±lacak harita analizi sitesi';
t['30'] = 'Oyuncular iֳ§in harita baִ�lantִ±sִ±nִ± gֳ¶ster';
t['31'] = 'Birlikler iֳ§in harita baִ�lantִ±sִ±nִ± gֳ¶ster';
t['32'] = "'Arama ֳ‡ubuִ�u'nu gֳ¶ster";
t['33'] = "'Arama ֳ‡ubuִ�u'nu kayan pencere olarak gֳ¶ster ";
t['34'] = "Geliֵ�tirme tablosunda KP/gֳ¼n bilgisini gֳ¶ster";
t['35'] = "Geliֵ�tirme tablosunda tahִ±l tֳ¼ketimini gֳ¶ster";
t['37'] = "Kaynak alanlarִ±nִ± geliֵ�tirme tablosunu gֳ¶ster";
t['38'] = 'Kaynak dֳ¼zeyleri renklerini gֳ¶ster';
t['39'] = "'Hammadde Grafiִ�i'ni gֳ¶ster";
t['40'] = "'Hammadde Grafiִ�i'ni kayan pencere olarak gֳ¶ster";
t['41'] = "Binalarִ±n geliֵ�tirme tablosunu gֳ¶ster";
t['42'] = 'Geliֵ�tirme tablosunda binalarִ± isme gֳ¶re sִ±rala';
t['43'] = 'Orta numaralarִ± gֳ¶ster';
t['44'] = 'Bina dֳ¼zeyleri renklerini gֳ¶ster';
t['45'] = "Binalar iֳ§in yֳ¼kseltilen seviyeyi parlat";
t['46'] = 'Her pazarcִ± geliֵ�i iֳ§in ilave bilgi gֳ¶ster';
t['47'] = 'Son pazar naklini gֳ¶ster';
t['48'] = "'Pazar Yeri=> Satִ±n al' sayfasִ±ndayken<br>ֳ¶nyֳ¼klenen sayfa sayִ±sִ±<br>(Varsayִ±lan= 1 ya da Boֵ� ; Maks = 5)";
t['49'] = 'Askeri ֳ¼s varsayִ±lan eylemi';
t['50'] = '"Casus seֳ§" iֵ�levi iֳ§in<br> casus sayִ±sִ±';
t['53'] = 'Araֳ§ ipuֳ§larִ± bֳ¶lֳ¼mֳ¼nde asker bilgisini gֳ¶ster';
t['54'] = 'Araֳ§ ipuֳ§larִ±nda kֳ¶ye ulaֵ�ִ±m sֳ¼resini ve uzaklִ±ִ�ִ± gֳ¶ster';
t['56'] = "Haritada fare ile ֳ¼zerine gelindiִ�inde<br>kֳ¶y tֳ¼rֳ¼nֳ¼ gֳ¶ster/vadi bilgisini gֳ¶ster";
t['57'] = 'Mesafe ve sֳ¼reyi gֳ¶ster';
t['58'] = 'Haritada oyuncu/kֳ¶y/fethedilmiֵ� vahalar tablosunu gֳ¶ster';
t['59'] = 'ֳ–nyֳ¼klenen Mesaj/Rapor sayfasִ± sayִ±sִ±<br>(Default = 1)';
t['60'] = 'Aֳ§ִ±lִ±r pencerede mesaj/rapor aֳ§ma baִ�lantִ±sִ±nִ± gֳ¶ster';
t['61'] = 'Raporlar sayfasִ±na "Tֳ¼mֳ¼nֳ¼ sil" tablosu ekle';
t['62'] = '"IGM Gֳ¶nder" simgesini benim iֳ§in de gֳ¶ster';
t['63'] = 'TB3 geliֵ�tirilmiֵ� Savaֵ� Raporlarִ±nִ± gֳ¶ster';
t['64'] = 'Rapor ִ°statistiklerinde detaylarִ± gֳ¶ster';
t['65'] = 'Geliֵ�tirme olanaklִ± rengi<br>(Varsayִ±lan = Boֵ�)';
t['66'] = 'En ֳ¼st dֳ¼zey rengi<br>(Varsayִ±lan = Boֵ�)';
t['67'] = 'Geliֵ�tirme olanaklִ± deִ�il rengi<br>(Varsayִ±lan = Boֵ�)';
t['68'] = 'NPC ֳ¼zerinden geliֵ�tirme rengi<br>(Varsayִ±lan = Boֵ�)';
t['69'] = "Konsolun Kayִ±t Dֳ¼zeyi<br>PROGRAMCILAR VE SORUN Gִ°DERME ִ°ֳ‡ִ°N<br>(Varsayִ±lan = 0)";
t['82.L'] = 'Yerimlerini kitle (Sil, yukarִ± taֵ�ִ±, aֵ�aִ�ִ± taֵ�ִ± simgelerini gizler)';
t['82.U'] = 'Yerimleri kilidini aֳ§ (Sil, yukarִ± taֵ�ִ±, aֵ�aִ�ִ± taֵ�ִ± simgelerini gֳ¶sterir)';
t['U.2'] = 'Irk';
t['U.3'] = 'Merkez Kֳ¶yֳ¼n Adִ±<br>Deִ�iֵ�tirmeyin,onun yerine Profilinizi ziyaret edin';
t['U.6'] = 'Merkez Kֳ¶yֳ¼n koordinatlarִ±<br>Deִ�iֵ�tirmeyin,onun yerine Profilinizi ziyaret edin';
t['SIM'] = 'Savaֵ� Simֳ¼latֳ¶rֳ¼';
t['QSURE'] = 'Emin misiniz?';
t['PROFIT'] = 'Kazanֳ§';
t['LOSS'] = 'Kayִ±p';
t['EXTAV'] = 'Geliֵ�tirilebilir';
t['PLAYER'] = 'Oyuncu';
t['VILLAGE'] = 'Kֳ¶y';
t['POPULATION'] = 'Nֳ¼fus';
t['COORDS'] = 'Koordinatlar';
t['MAPTBACTS'] = 'Eylemler';
t['SAVED'] = 'Kaydedildi';
t['YOUNEED'] = 'ִ°htiyacִ±nִ±z olan';
t['TODAY'] = 'bugֳ¼n';
t['TOMORROW'] = 'yarִ±n';
t['DAYAFTERTOM'] = 'ertesi gֳ¼n';
t['MARKET'] = 'Pazar yeri';
t['BARRACKS'] = 'Kִ±ֵ�la';
t['RAP'] = 'Askeri ֳ¼s';
t['STABLE'] = 'Ahִ±r';
t['WORKSHOP'] = 'Tamirhane';
t['SENDRES'] = 'Hammdde gֳ¶nder';
t['BUY'] = 'Satִ±n al';
t['SELL'] = 'Sat';
t['SENDIGM'] = 'Genel mesaj gֳ¶nder';
t['LISTO'] = 'Mֳ¼mkֳ¼n';
t['ON'] = ' ';
t['AT'] = ' ';
t['EFICIENCIA'] = 'Verimlilik';
t['NEVER'] = 'Hiֳ§ bir zaman';
t['ALDEAS'] = 'Kֳ¶y(ler)';
t['TIEMPO'] = 'Sֳ¼re';
t['OFREZCO'] = 'ֳ–nerilen';
t['BUSCO'] = 'ִ°stenilen';
t['TIPO'] = 'Oran';
t['DISPONIBLE'] = 'Sadece olanaklִ± olanlar';
t['CUALQUIERA'] = 'Hiֳ§biri';
t['YES'] = 'Evet';
t['NO'] = 'Hayִ±r';
t['LOGIN'] = 'Giriֵ�';
t['MARCADORES'] = 'Yerimleri';
t['ANYADIR'] = 'Ekle';
t['UBU'] = 'Yeni yerimi adresi';
t['UBT'] = 'Yeni yerimi yazִ±sִ±';
t['DEL'] = 'Sil';
t['MAPA'] = 'Harita';
t['MAXTIME'] = 'En fazla sֳ¼re';
t['ARCHIVE'] = 'Arֵ�iv';
t['SUMMARY'] = 'ֳ–zet';
t['TROPAS'] = 'Destekler';
t['CHKSCRV'] = 'TBeyond u gֳ¼ncelle';
t['ACTUALIZAR'] = 'Kֳ¶y bilgisini gֳ¼ncelle';
t['VENTAS'] = 'Kayִ±tlִ± Teklifler';
t['MAPSCAN'] = 'Haritayִ± Tara';
t['BIC'] = 'Ek simgeleri gֳ¶ster';
t['SAVE'] = 'Kaydet';
t['AT2'] = 'Destek';
t['AT3'] = 'Saldִ±rִ±: Normal';
t['AT4'] = 'Saldִ±rִ±: Yaִ�ma';
t['NBSA'] = 'Oto';
t['NBSN'] = 'Normal (kֳ¼ֳ§ֳ¼k)';
t['NBSB'] = 'geniֵ� ekran (bֳ¼yֳ¼k)';
t['NBHAX'] = 'Yֳ¼ksekliִ�i otomatik geniֵ�let';
t['NBHK'] = 'Varsayִ±lan yֳ¼kseklik';
t['NPCSAVETIME'] = 'Kazanִ±lan zaman: ';
t['TOTALTROOPS'] = 'Kֳ¶ydeki toplam asker';
t['SELECTALLTROOPS'] = "Tֳ¼m askerleri seֳ§";
t['PARTY'] = "Festivaller";
t['CPPERDAY'] = "KP/gֳ¼n";
t['SLOT'] = "Boֵ�luk";
t['TOTAL'] = "Toplam";
t['SELECTSCOUT'] = "Casus seֳ§";
t['SELECTFAKE'] = "Sahte saldִ±rִ± seֳ§";
t['NOSCOUT2FAKE'] = "Sahte saldִ±rִ± iֳ§in casuslarִ± kullanmak olanaklִ± deִ�il !";
t['NOTROOP2FAKE'] = "Sahte saldִ±rִ± iֳ§in asker yok!";
t['NOTROOP2SCOUT'] = "Gֳ¶zetlemek iֳ§in asker yok !";
t['NOTROOPS'] = "Kֳ¶yde asker yok !";
t['ALL'] = "Tֳ¼mֳ¼";
t['SH2'] = "renk alanִ±na ֵ�unlarִ± girebilirsiniz:<br>- green ya da red ya da orange, vb.<br>- HEX renk kodlarִ±, ֳ¶rneִ�in #004523<br>- varsayִ±lan renkler iֳ§in boֵ� bִ±rakִ±n";
t['SOREP'] = "ֳ–zgֳ¼n raporu gֳ¶ster (foruma aktarmak iֳ§in)";
t['WSIMO1'] = "Oyunun kendi hesaplayִ±cִ±sִ± (oyun tarafִ±ndan saִ�lanan)";
t['WSIMO2'] = "Harici (kirilloid.ru tarafִ±ndan saִ�lanan)";
t['NONEWVER'] = "Son sֳ¼rֳ¼me sahipsiniz";
t['BVER'] = "Beta sֳ¼rֳ¼mֳ¼ne sahip olabilirsiniz";
t['NVERAV'] = "Betiִ�in(script) yeni sֳ¼rֳ¼mֳ¼ var";
t['UPDSCR'] = "Betik ֵ�imdi gֳ¼ncellensin mi ?";
t['CHECKUPDATE'] = "Betik gֳ¼ncellemesi denetleniyor.<br>Lֳ¼tfen bekleyin...";
t['CROPFINDER'] = "Tarla bulucu";
t['AVPPV'] = "Kֳ¶y baֵ�ִ±na ortalama nֳ¼fus";
t['AVPPP'] = "Oyuncu baֵ�ִ±na ortalama  nֳ¼fus";
t['MAX'] = 'En fazla';
t['TOTTRTR'] = 'Eִ�itimdeki asker sayִ±sִ±';
t['TB3SL'] = TB3O.shN + ' Ayarlarִ±';
t['UPDALLV'] = 'Tֳ¼m kֳ¶yleri gֳ¼ncelle. Dִ°KKATLִ° KULLANIN, HESABINIZ CEZA ALABִ°Lִ°R!';
t['LARGEMAP'] = 'Bֳ¼yֳ¼k harita';
t['USETHEMPR'] = 'Bunlarִ± kullan (oransal)';
t['USETHEMEQ'] = 'Bunlarִ± kullan (eֵ� miktarda)';
t['TOWNHALL'] = 'Belediye';
t['GSRVT'] = 'Oyun sunucusu';
t['ACCINFO'] = 'Hesap Bilgisi';
t['NBO'] = 'Not defteri';
t['MNUL'] = 'Soldaki menֳ¼';
t['STAT'] = 'ִ°statistikler';
t['RESF'] = 'Hammadde alanlarִ±';
t['VLC'] = 'Kֳ¶y merkezi';
t['MAPO'] = 'Harita ayarlarִ±';
t['COLO'] = 'Renk seֳ§enekleri';
t['DBGO'] = 'Sorun giderme seֳ§enekleri';
t['HEROSMANSION'] = "Kahraman kִ±ֵ�lasִ±";
t['BLACKSMITH'] = 'Silah dֳ¶kֳ¼mhanesi';
t['ARMOURY'] = 'Zִ±rh dֳ¶kֳ¼mhanesi';
t['NOW'] = 'ֵ�imdi';
t['CLOSE'] = 'Kapat';
t['USE'] = 'Kullan';
t['USETHEM1H'] = 'Bunlarִ± Kullan (1 saatlik ֳ¼retim)';
t['OVERVIEW'] = 'Genel bakִ±ֵ�';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Saldִ±rִ±lar';
t['NEWS'] = 'Haberler';
t['ADDCRTPAGE'] = 'Bu sayfayִ± yerimine ekle';
t['SCRPURL'] = 'TBeyond sayfasִ±';
t['SPACER'] = 'Ayִ±rִ±cִ±';
t['MEREO'] = 'Mesajlar & Raporlar';
t['ATTABLES'] = 'Asker tablosu';
t['MTW'] = 'Artan';
t['MTX'] = 'Aֵ�an';
t['MTC'] = 'Gֳ¼ncel yֳ¼k';
t['ALFL'] = 'Harici forumun adresi<br>(Dahili forum iֳ§in boֵ� bִ±rakִ±n)';
t['MTCL'] = 'Tֳ¼mֳ¼nֳ¼ temizle';
t['CKSORT'] = 'Sִ±ralamak iֳ§in tִ±klayִ±n';
t['MIN'] = 'En az';
t['SVGL'] = 'Kֳ¶yler arasִ±nda paylaֵ�tִ±r';
t['VGL'] = 'Kֳ¶y Listesi';
t['UPDATEPOP'] = 'Nֳ¼fusu gֳ¼ncelle';
t['EDIT'] = 'Dֳ¼zenle';
t['NPCO'] = 'NPC Asistanִ± ayarlarִ±';
t['NEWVILLAGEAV'] = 'Tarih/Zaman';
t['TIMEUNTIL'] = 'Bekleme sֳ¼resi';
t['CENTERMAP'] = 'Bu kֳ¶yֳ¼ haritada ortala';
t['SENDTROOPS'] = 'Asker gֳ¶nder';
t['PALACE'] = "Saray";
t['RESIDENCE'] = "Kֳ¶ֵ�k";
t['ACADEMY'] = "Akademi";
t['TREASURY'] = "Hazine Binasִ±";
t['UPGTB'] = "Hammadde alanlarִ±nִ± ve binalarִ± geliֵ�tirme tablosu";
t['RBTT'] = "Hammadde Grafiִ�i";
t['RESIDUE'] = "ִ°nֵ�a edilmesi halinde kalan";
t['RESOURCES'] = "Kaynaklar";
break;
case "id"://by CuPliz13 & adudutz
//avRace = ['Romawi', 'Teuton', 'Galia'];
t['8'] = 'Aliansi';
t['SIM'] = 'Simulator Perang';
t['QSURE'] = 'Apakah Anda yakin?';
t['LOSS'] = 'Kerugian';
t['PROFIT'] = 'Laba';
t['EXTAV'] = 'Naikkan tingkat';
t['PLAYER'] = 'Pemain';
t['VILLAGE'] = 'Desa';
t['POPULATION'] = 'Populasi';
t['COORDS'] = 'Koordinat';
t['MAPTBACTS'] = 'Aksi';
t['SAVED'] = 'Disimpan';
t['YOUNEED'] = 'Anda butuh';
t['TODAY'] = 'hari ini';
t['TOMORROW'] = 'besok';
t['DAYAFTERTOM'] = 'lusa';
t['MARKET'] = 'Pasar';
t['BARRACKS'] = 'Barak';
t['RAP'] = 'Titik Temu';
t['STABLE'] = 'Istal';
t['WORKSHOP'] = 'Bengkel';
t['SENDRES'] = 'Kirim sumberdaya';
t['BUY'] = 'Beli';
t['SELL'] = 'Jual';
t['SENDIGM'] = 'Kirim Pesan';
t['LISTO'] = 'Tersedia';
t['ON'] = 'pada';
t['AT'] = 'pukul';
t['EFICIENCIA'] = 'Efisiensi';
t['NEVER'] = 'jika gudang ditingkatkan';
t['ALDEAS'] = 'Desa';
t['TIEMPO'] = 'Waktu';
t['OFREZCO'] = 'Penawaran';
t['BUSCO'] = 'Cari';
t['TIPO'] = 'Tipe';
t['DISPONIBLE'] = 'Hanya tersedia';
t['CUALQUIERA'] = 'Apapun';
t['YES'] = 'Ya';
t['NO'] = 'Tidak';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Bookmark';
t['ANYADIR'] = 'Tambah';
t['UBU'] = 'URL Bookmark';
t['UBT'] = 'Nama Bookmark';
t['DEL'] = 'Hapus';
t['MAPA'] = 'Peta';
t['MAXTIME'] = 'Waktu maks';
t['ARCHIVE'] = 'Arsip';
t['SUMMARY'] = 'Laporan';
t['TROPAS'] = 'Pasukan';
t['ACTUALIZAR'] = 'Informasi Desa diubah';
t['VENTAS'] = 'Simpan penawaran';
t['MAPSCAN'] = 'Pindai peta';
t['BIC'] = 'Tampilkan ikon tambahan';
t['22'] = 'Tampilkan blok catatan';
t['SAVE'] = 'Simpan';
t['49'] = 'Aksi default dari titik temu';
t['AT2'] = 'Bantuan';
t['AT3'] = 'Serangan: Normal';
t['AT4'] = 'Serangan: Raid';
t['24'] = 'Ukuran blok catatan';
t['NBSA'] = 'Otomatis';
t['NBSN'] = 'Normal (kecil)';
t['NBSB'] = 'Layar lebar (besar)';
t['25'] = 'Lebar blok catatan';
t['NBHAX'] = 'Lebar menyesuaikan otomatis';
t['NBHK'] = 'Lebar asal';
t['43'] = 'Tampilkan angka pusat';
t['NPCSAVETIME'] = 'Simpan: ';
t['38'] = 'Tampilkan warna tingkatan sumberdaya';
t['44'] = 'Tampilkan warna tingkatan bangunan';
t['65'] = 'Upgrade tersedia<br>(Default = Kosong)';
t['66'] = 'Warna level maks<br>(Default = Kosong)';
t['67'] = 'Upgrade tidak tersedia<br>(Default = Kosong)';
t['68'] = 'Upgrade lewat NPC<br>(Default = Kosong)';
t['TOTALTROOPS'] = 'Jumlah pasukan';
t['20'] = 'Tampilkan bookmark';
t['U.2'] = 'Suku';
t['1'] = "Server Travian v2.x";
t['SELECTALLTROOPS'] = "Pilih semua pasukan";
t['PARTY'] = "Festivalitas";
t['CPPERDAY'] = "NB/hari";
t['SLOT'] = "Slot";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Pilih pengintai";
t['SELECTFAKE'] = "Pilih penipu";
t['NOSCOUT2FAKE'] = "Tidak dimungkinkan untuk memakai pengintai untuk serangan tipuan!";
t['NOTROOP2FAKE'] = "Tidak ada pasukan untuk serangan tipuan!";
t['NOTROOP2SCOUT'] = "Tidak ada pasukan untuk mengintai!";
t['NOTROOPS'] = "Tidak ada pasukan di desa!";
t['ALL'] = "Seluruh";
t['SH2'] = "Di kolom warna Anda bisa mengisi:<br>- <b>green</b> atau <b>red</b> atau <b>orange</b>, dll.<br>- warna menggunakan kode heksadesilmal (HEX), seperti <b>#004523</b><br>- kosongkan untuk warna default";
t['SOREP'] = "Tampilkan laporan asli (untuk posting dalam forum)";
t['56'] = "Tampilkan tipe info bidang/oasis<br>saat kursor mouse berada di atas peta";
t['10'] = "Link simulator perang untuk dipakai:<br>(menu kiri)";
t['WSIMO1'] = "Internal (dari permainan)";
t['WSIMO2'] = "Eksternal (dari kirilloid.ru)";
t['27'] = "World Analyser untuk dipakai";
t['28'] = "Tampilkan link Analyser Statistic";
t['NONEWVER'] = "Anda memiliki versi terakhir yang tersedia";
t['BVER'] = "Anda memiliki versi beta";
t['NVERAV'] = "Versi script terbaru telah tersedia";
t['UPDSCR'] = "Update script sekarang?";
t['CHECKUPDATE'] = "Mengecek update script.<br>Harap tunggu...";
t['CROPFINDER'] = "Crop Finder";
t['AVPPV'] = "Populasi rata-rata per desa";
t['AVPPP'] = "Populasi rata-rata per pemain";
t['37'] = "Tampilkan tabel tingkatan lahan sumberdaya";
t['41'] = "Tampilkan tabel tingkatan bangunan";
t['69'] = "Console Log Level<br>HANYA UNTUK PROGRAMMERS SAAT DEBUGGING<br>(Default = 0)";
t['48'] = "Jumlah halaman penawaran untuk ditampilkan<br>saat ada di halaman 'Pasar => Beli'<br>(Default = 1)";
t['U.3'] = 'Nama Ibukota<br><b>Kunjungi profil Anda untuk perubahan</b>';
t['U.6'] = 'Koordinat Ibukota Anda<br><b>Kunjungi profil Anda untuk perubahan</b>';
t['MAX'] = 'Maks';
t['TOTTRTR'] = 'Total pelatihan pasukan';
t['57'] = 'Tampilkan jarak & waktu';
t['UPDALLV'] = 'Update semua desa. PEMAKAIAN MAKSIMUM BISA MENYEBABKAN AKUN ANDA DIHAPUS!';
t['9'] = "Tampilkan link tambahan di menu kiri<br>(Travian Toolbox, World Analyser, Travilog, Map, dll.)";
t['LARGEMAP'] = 'Peta lebar';
t['USETHEMPR'] = 'Pakai (proporsional)';
t['USETHEMEQ'] = 'Pakai (sama)';
t['TOWNHALL'] = 'Balai Desa';
t['GSRVT'] = 'Server permainan';
t['ACCINFO'] = 'Informasi Akun';
t['NBO'] = 'Catatan';
t['MNUL'] = 'Menu di sebelah kanan';
t['STAT'] = 'Statistik';
t['RESF'] = 'Lahan Sumberdaya';
t['VLC'] = 'Pusat desa';
t['MAPO'] = 'Opsi peta';
t['COLO'] = 'Opsi warna';
t['DBGO'] = 'Opsi debug';
t['4'] = 'Pasar';
t['5'] = 'Titik temu|Barak|Bengkel|Istal';
t['6'] = "Balai desa|Padepokan|Pabrik perisai|Pandai besi";
t['HEROSMANSION'] = "Padepokan";
t['BLACKSMITH'] = 'Pandai besi';
t['ARMOURY'] = 'Pabrik perisai';
t['NOW'] = 'Sekarang';
t['CLOSE'] = 'Tutup';
t['USE'] = 'Pakai';
t['USETHEM1H'] = 'Pakai (1 jam produksi)';
t['OVERVIEW'] = 'Peninjauan';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Serangan';
t['NEWS'] = 'Berita';
t['ADDCRTPAGE'] = 'Tambahkan halaman ini';
t['SCRPURL'] = 'TBeyond Home';
t['50'] = 'Jumlah pengintai untuk<br>fungsi "Pilih pengintai"';
t['SPACER'] = 'Penjeda';
t['53'] = 'Tampilkan info pasukan di tooltip';
t['MEREO'] = 'Pesan & Laporan';
t['59'] = 'Jumlah halaman pesan/laporan untuk ditampilkan<br>(Default = 1)';
t['ATTABLES'] = 'Tabel pasukan';
t['MTW'] = 'Sisa muatan';
t['MTX'] = 'Melampaui';
t['MTC'] = 'Muatan saat ini';
t['ALFL'] = 'Link ke forum luar<br>(kosongkan untuk memakai forum internal)';
t['82.L'] = 'Kunci bookmark (sembunyikan ikon hapus, naikkan, turunkan)';
t['MTCL'] = 'Kosongkan Semua';
t['82.U'] = 'Buka bookmark (tampilkan ikon hapus, naikkan, turunkan)';
t['CKSORT'] = 'Klik untuk mengurutkan';
t['MIN'] = 'Min';
t['SVGL'] = 'Pembagian diantara desa-desa';
t['VGL'] = 'Daftar Desa';
t['12'] = "tampilkan link 'Peninjauan Desa' dan 'Pusat Desa'";
t['UPDATEPOP'] = 'Update populasi';
t['54'] = 'Tampilkan jarak dan waktu ke desa-desa di tooltip';
t['EDIT'] = 'Ubah';
t['NPCO'] = 'Opsi NPC Assistant';
t['26'] = 'Tampilkan link kalkulasi dari NPC Assistant';
t['58'] = 'Tampilkan tabel pemain, desa dan oasis yang dikuasai';
t['NEWVILLAGEAV'] = 'Tanggal/Waktu';
t['TIMEUNTIL'] = 'Waktu untuk menunggu';
t['61'] = 'Tampilkan tabel "Hapus semua" di halaman Laporan';
t['62'] = 'Tampilkan ikon "Kirim Pesan"';
t['CENTERMAP'] = 'Desa ini sebagai tengah-tengah peta';
t['13'] = 'Tampilkan ikon "Desa ini sebagai tengah-tengah peta"';
t['SENDTROOPS'] = 'Kirim Pasukan';
t['64'] = 'Tampilkan detail pada Laporan Statistik';
t['7'] = "Istana|Kastil|Akademi|Gudang Ilmu";
t['PALACE'] = "Istana";
t['RESIDENCE'] = "Kastil";
t['ACADEMY'] = "Akademi";
t['TREASURY'] = "Gudang Ilmu";
t['45'] = "Tampilkan kedipan untuk bangunan yang sedang ditingkatkan";
t['60'] = 'Tampilkan link untuk membuka pesan dalam popup';
t['RBTT'] = "Tabel Sumberdaya";
t['39'] = "Tampilkan 'Tabel Sumberdaya'";
t['40'] = "Tampilkan 'Tabel Sumberdaya' sebagai jendela terpisah";
t['21'] = "Tampilkan bookmark sebagai jendela terpisah";
t['23'] = "Tampilkan blok catatan sebagai jendela terpisah";
t['16'] = "Tampilkan produksi gandum efektif di daftar desa";
t['36'] = "Tampilkan penghitungan sisa Sumberdaya di tabel tingkatan/pelatihan";
t['RESIDUE'] = 'Sisa Sumberdaya jika dibangun ';
t['RESOURCES'] = 'Sumberdaya';
t['34'] = "Tampilkan informasi NB/hari di tabel tingkatan";
t['35'] = "Tampilkan informasi penggunaan gandum di tabel tingkatan";
t['29'] = 'Map Analyser yang dipakai';
t['30'] = 'Tampilkan link ke Map Analyser untuk pemain';
t['31'] = 'Tampilkan link ke Map Analyser untuk aliansi';
t['32'] = "Tampilkan 'Tabel Pencarian'";
t['33'] = "Tampilkan 'Tabel Pencarian' sebagai jendela terpisah";
t['UPGTB'] = "Tabel Tingkatan Sumberdaya/Bangunan";
t['14'] = "Tampilkan ikon 'Kirim Sumberdaya/Kirim Pasukkan' di daftar desa";
t['17'] = "Tampilkan populasi di daftar desa";
t['18'] = 'Tampilkan daftar desa tambahan (2 kolom) sebagai jendela terpisah';
t['19'] = 'Tampilkan informasi tentang pembangunan dan pergerakan pasukkan<br>di daftar desa';
t['42'] = 'Urutkan bangunan berdasarkan nama di tabel tingkatan';
t['63'] = 'Tampilkan laporan penyerangan TB3 yang disempurnakan';
break;
case "bg"://by NUT 
//avRace = ['׀ ׀¸׀¼׀»ׁ�׀½׀¸', '׀¢׀µ׀²ׁ‚׀¾׀½ׁ†׀¸', '׀“׀°׀»׀¸'];
t['8'] = '׀¡ׁ�ׁ�׀·';
t['SIM'] = '׀¡׀¸׀¼ׁƒ׀»׀°ׁ‚׀¾ׁ€ ׀½׀° ׀±׀¸ׁ‚׀÷׀¸';
t['QSURE'] = '׀¡׀¸׀³ׁƒׁ€׀½׀¸ ׀»׀¸ ׁ�ׁ‚׀µ?';
t['LOSS'] = '׀—׀°׀³ׁƒ׀±׀°';
t['PROFIT'] = '׀�׀µׁ‡׀°׀»׀±׀°';
t['EXTAV'] = '׀’ׁ�׀·׀¼׀¾׀¶׀½׀¾ ׀½׀°׀´ׁ�ׁ‚ׁ€׀¾ׁ�׀²׀°׀½׀µ';
t['PLAYER'] = '׀˜׀³ׁ€׀°ׁ‡';
t['VILLAGE'] = '׀¡׀µ׀»׀¾';
t['POPULATION'] = '׀�׀¾׀¿ׁƒ׀»׀°ׁ†׀¸ׁ�';
t['COORDS'] = '׀�׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚׀¸';
t['MAPTBACTS'] = '׀”׀µ׀¹ׁ�ׁ‚׀²׀¸ׁ�';
t['SAVED'] = '׀�ׁ€׀¾׀¼׀µ׀½׀¸ׁ‚׀µ ׁ�׀° ׀·׀°׀¿׀°׀·׀µ׀½׀¸';
t['YOUNEED'] = '׀˜׀¼׀°ׁ‚׀µ ׀½ׁƒ׀¶׀´׀° ׀¾ׁ‚';
t['TODAY'] = '׀´׀½׀µׁ�';
t['TOMORROW'] = 'ׁƒׁ‚ׁ€׀µ';
t['DAYAFTERTOM'] = '׀² ׀´ׁ€ׁƒ׀³׀¸ ׀´׀µ׀½';
t['MARKET'] = '׀�׀°׀·׀°ׁ€';
t['BARRACKS'] = '׀�׀°׀·׀°ׁ€׀¼׀°';
t['RAP'] = '׀¡׀±׀¾ׁ€׀µ׀½ ׀¿ׁƒ׀½׀÷ׁ‚';
t['STABLE'] = '׀�׀¾׀½ׁ�ׁˆ׀½ׁ�';
t['WORKSHOP'] = '׀ ׀°׀±׀¾ׁ‚׀¸׀»׀½׀¸ׁ†׀°';
t['SENDRES'] = '׀˜׀·׀¿ׁ€׀°ׁ‚׀¸ ׁ€׀µׁ�ׁƒׁ€ׁ�׀¸';
t['BUY'] = '׀�ׁƒ׀¿׀¸';
t['SELL'] = '׀�ׁ€׀¾׀´׀°׀¹';
t['SENDIGM'] = '׀˜׀·׀¿ׁ€׀°ׁ‚׀¸ ׀»׀¸ׁ‡׀½׀¾ ׁ�ׁ�׀¾׀±ׁ‰׀µ׀½׀¸׀µ';
t['LISTO'] = '׀’ׁ�׀·׀¼׀¾׀¶׀½׀¾';
t['ON'] = '׀½׀°';
t['AT'] = '׀²';
t['EFICIENCIA'] = '׀¡׀¿׀¾ׁ�׀¾׀±׀½׀¾ׁ�ׁ‚';
t['NEVER'] = '׀�׀¸׀÷׀¾׀³׀°';
t['ALDEAS'] = '׀¡׀µ׀»׀¾(׀°)';
t['TIEMPO'] = '׀’ׁ€׀µ׀¼׀µ';
t['OFREZCO'] = '׀�ׁ€׀µ׀´׀»׀°׀³׀°׀½׀µ';
t['BUSCO'] = '׀¢ׁ�ׁ€ׁ�׀µ׀½׀µ';
t['TIPO'] = '׀’׀¸׀´';
t['DISPONIBLE'] = '׀¡׀°׀¼׀¾ ׀²ׁ�׀·׀¼׀¾׀¶׀½׀¸ׁ‚׀µ';
t['CUALQUIERA'] = '׀’ׁ�׀¸ׁ‡׀÷׀¸';
t['YES'] = '׀”׀°';
t['NO'] = '׀�׀µ';
t['LOGIN'] = '׀’׀»׀¸׀·׀°׀½׀µ';
t['MARCADORES'] = '׀�ׁ‚׀¼׀µׁ‚׀÷׀¸';
t['ANYADIR'] = '׀�ׁ€׀¸׀±׀°׀²ׁ�׀½׀µ';
t['UBU'] = '׀�׀¾׀²׀° ׀¾ׁ‚׀¼׀µׁ‚׀÷׀° URL';
t['UBT'] = '׀�׀¾׀²׀° ׀¾ׁ‚׀¼׀µׁ‚׀÷׀° ׀¢׀µ׀÷ׁ�ׁ‚';
t['DEL'] = '׀˜׀·ׁ‚ׁ€׀¸׀²׀°׀½׀µ';
t['MAPA'] = '׀�׀°ׁ€ׁ‚׀°';
t['MAXTIME'] = '׀�׀°׀÷ׁ�׀¸׀¼׀°׀»׀½׀¾ ׀²ׁ€׀µ׀¼׀µ';
t['ARCHIVE'] = '׀�ׁ€ׁ…׀¸׀²';
t['SUMMARY'] = '׀�׀±ׁ‰׀¾';
t['TROPAS'] = '׀’׀¾׀¹ׁ�׀÷׀¸';
t['CHKSCRV'] = '׀�׀±׀½׀¾׀²׀¸ TBeyond';
t['ACTUALIZAR'] = '׀�׀±׀½׀¾׀²׀¸ ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ�ׁ‚׀° ׀·׀° ׁ�׀µ׀»׀¾ׁ‚׀¾';
t['VENTAS'] = '׀—׀°׀¿׀°׀·׀¸ ׀¾ׁ„׀µׁ€ׁ‚׀¸ׁ‚׀µ';
t['MAPSCAN'] = '׀¡׀÷׀°׀½׀¸ׁ€׀°׀¹ ׀÷׀°ׁ€ׁ‚׀°ׁ‚׀°';
t['BIC'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀´׀¾׀¿ׁ�׀»׀½׀¸ׁ‚׀µ׀»׀½׀¸ ׀¸׀÷׀¾׀½׀¸';
t['22'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀±׀µ׀»׀µ׀¶׀÷׀°';
t['SAVE'] = '׀’ׁ�׀·׀¼׀¾׀¶׀½׀¾:';
t['49'] = '׀¡׀±׀¾ׁ€׀µ׀½ ׀¿ׁƒ׀½׀÷ׁ‚ ׀½׀¾ׁ€׀¼׀°׀»׀½׀¾ ׀´׀µ׀¹ׁ�ׁ‚׀²׀¸׀µ';
t['AT2'] = '׀�׀¾׀´׀÷ׁ€׀µ׀¿׀»׀µ׀½׀¸׀µ';
t['AT3'] = '׀�ׁ‚׀°׀÷׀°: ׀�׀¾ׁ€׀¼׀°׀»׀½׀°';
t['AT4'] = '׀�ׁ‚׀°׀÷׀°: ׀�׀°׀±׀µ׀³';
t['24'] = '׀ ׀°׀·׀¼׀µׁ€ ׀½׀° ׀±׀µ׀»׀µ׀¶׀÷׀°ׁ‚׀°';
t['NBSA'] = '׀�׀²ׁ‚׀¾׀¼׀°ׁ‚׀¸ׁ‡׀½׀¾';
t['NBSN'] = '׀�׀¾ׁ€׀¼׀°׀»׀½׀¾ (׀¼׀°׀»׀÷׀¾)';
t['NBSB'] = '׀¨׀¸ׁ€׀¾׀÷ ׀µ׀÷ׁ€׀°׀½ (׀³׀¾׀»ׁ�׀¼׀¾)';
t['25'] = '׀ ׀°׀·׀¼׀µׁ€ ׀±׀µ׀»׀µ׀¶׀÷׀° - ׀²׀¸ׁ�׀¾ׁ‡׀¸׀½׀°';
t['NBHAX'] = '׀�׀²ׁ‚׀¾׀¼׀°ׁ‚׀¸ׁ‡׀½׀¾ ׁƒ׀³׀¾׀»׀µ׀¼׀¸ ׀²׀¸ׁ�׀¾ׁ‡׀¸׀½׀°ׁ‚׀°';
t['NBHK'] = '׀¡ׁ‚׀°׀½׀´׀°ׁ€ׁ‚׀½׀° ׀²׀¸ׁ�׀¾ׁ‡׀¸׀½׀°';
t['43'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀½׀¸׀²׀°ׁ‚׀° ׀½׀° ׁ�׀³ׁ€׀°׀´׀¸ׁ‚׀µ';
t['NPCSAVETIME'] = '׀—׀°׀¿׀°׀·׀¸: ';
t['38'] = '׀�׀¾׀÷׀°׀¶׀¸ ׁ†׀²׀µׁ‚׀½׀¸ ׀½׀¸׀²׀° ׀½׀° ׁ€׀µׁ�ׁƒׁ€ׁ�׀¸ׁ‚׀µ';
t['44'] = '׀�׀¾׀÷׀°׀¶׀¸ ׁ†׀²׀µׁ‚׀½׀¸ ׀½׀¸׀²׀° ׀½׀° ׁ�׀³ׁ€׀°׀´׀¸ׁ‚׀µ';
t['65'] = '׀ ׀°׀·ׁ€׀µׁˆ׀µ׀½׀° ׀¿ׁ€׀¾׀¼ׁ�׀½׀° ׀½׀° ׁ†׀²׀µׁ‚׀°<br>(Default = Empty)';
t['66'] = '׀¦׀²ׁ�ׁ‚ ׀·׀° ׀¼׀°׀÷ׁ�׀¸׀¼׀°׀»׀½׀¾ ׀½׀¸׀²׀¾<br>(Default = Empty)';
t['67'] = '׀�׀µ׀²ׁ�׀·׀¼׀¾׀¶׀½׀° ׁ�׀¼ׁ�׀½׀° ׀½׀° ׁ†׀²׀µׁ‚׀°<br>(Default = Empty)';
t['68'] = '׀¡׀¼ׁ�׀½׀° ׀½׀° ׁ†׀²׀µׁ‚׀° ׀¿ׁ€׀µ׀· NPC<br>(Default = Empty)';
t['TOTALTROOPS'] = '׀�׀±ׁ‰׀¾ ׀²׀¾׀¹ׁ�׀÷׀¸ ׀·׀° ׁ�׀µ׀»׀¾ׁ‚׀¾';
t['20'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀¾ׁ‚׀¼׀µׁ‚׀÷׀¸ׁ‚׀µ';
t['U.2'] = '׀ ׀°ׁ�׀°';
t['1'] = "Travian v2.x ׁ�ׁ�ׁ€׀²ׁ�ׁ€";
t['SELECTALLTROOPS'] = "׀�׀°ׁ€׀÷׀¸ׁ€׀°׀¹ ׀²ׁ�׀¸ׁ‡׀÷׀¸ ׀²׀¾׀¹ׁ�׀÷׀¸";
t['PARTY'] = "׀�ׁ€׀°׀·׀½׀µ׀½ׁ�ׁ‚׀²׀°";
t['CPPERDAY'] = "׀�׀ /׀´׀µ׀½";
t['SLOT'] = "׀¡׀»׀¾ׁ‚";
t['TOTAL'] = "׀�׀±ׁ‰׀¾";
t['SELECTSCOUT'] = "׀˜׀·׀±׀µׁ€׀¸ ׁˆ׀¿׀¸׀¾׀½׀¸׀½";
t['SELECTFAKE'] = "׀˜׀·׀±׀µׁ€׀¸ ׁ„׀°׀»ׁˆ׀¸׀²";
t['NOSCOUT2FAKE'] = "׀�׀µ ׀µ ׀²ׁ�׀·׀¼׀¾׀¶׀½׀¾ ׀´׀° ׀¸׀·׀¿׀¾׀»׀·׀²׀°ׁ‚׀µ ׁˆ׀¿׀¸׀¾׀½׀¸׀½ ׀·׀° ׁ„׀°׀»ׁˆ׀¸׀²׀° ׀°ׁ‚׀°׀÷׀° !";
t['NOTROOP2FAKE'] = "׀�ׁ�׀¼׀° ׀¸׀·׀±ׁ€׀°׀½׀¸ ׀²׀¾׀¹ׁ�׀÷׀¸ ׀·׀° ׁ„׀°׀»ׁˆ׀¸׀²׀° ׀°ׁ‚׀°׀÷׀°!";
t['NOTROOP2SCOUT'] = "׀�ׁ�׀¼׀° ׀½׀°׀»׀¸ׁ‡׀½׀¸ ׁˆ׀¿׀¸׀¾׀½׀¸!";
t['NOTROOPS'] = "׀�ׁ�׀¼׀° ׀½׀°׀»׀¸ׁ‡׀½׀¸ ׀²׀¾׀¹ׁ�׀÷׀¸ !";
t['ALL'] = "׀’ׁ�׀¸ׁ‡׀÷׀¸";
t['SH2'] = "׀’ ׁ†׀²׀µׁ‚׀½׀¸ׁ‚׀µ ׀¿׀¾׀»׀µׁ‚׀° ׀¼׀¾׀¶׀µׁˆ ׀´׀° ׀¿׀¾ׁ�ׁ‚׀°׀²ׁ�ׁˆ:<br>- orange ׀¸׀»׀¸ red ׀¸׀»׀¸ green, ׀¸ ׁ‚.׀½.<br>- HEX ׁ†׀²ׁ�ׁ‚ ׀¿ׁ€׀¸׀¼׀µׁ€ #004523<br>- ׀¾ׁ�ׁ‚׀°׀²׀¸ ׀¿ׁ€׀°׀·׀½׀¾ ׀·׀° ׁ�ׁ‚׀°׀½׀´׀°ׁ€ׁ‚׀½׀¸ׁ� ׁ†׀²ׁ�ׁ‚";
t['SOREP'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀¾ׁ€׀¸׀³׀¸׀½׀°׀»׀½׀¸ׁ� ׀´׀¾׀÷׀»׀°׀´";
t['56'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀·׀° ׀²׀¸׀´׀°/׀¾׀°׀·׀¸ׁ�׀°<br>׀´׀¾׀÷׀°ׁ‚׀¾ ׀¿׀¾ׁ�׀¾ׁ‡׀²׀°׀¼ ׁ� ׀¼׀¸ׁˆ׀÷׀°ׁ‚׀° ׀²ׁ�ׁ€ׁ…ׁƒ ׀÷׀°ׁ€ׁ‚׀°ׁ‚׀°";
t['10'] = "׀¡׀¸׀¼ׁƒ׀»׀°ׁ‚׀¾ׁ€ ׀½׀° ׀±׀¸ׁ‚׀÷׀¸:<br>(׀² ׀»ׁ�׀²׀¾ׁ‚׀¾ ׀¼׀µ׀½ׁ�)";
t['WSIMO1'] = "׀’ׁ�ׁ‚ׁ€׀µׁˆ׀½׀¾ (׀´׀¾ׁ�ׁ‚׀°׀²׀µ׀½׀¾ ׀¾ׁ‚ ׀¸׀³ׁ€׀°ׁ‚׀°)";
t['WSIMO2'] = "׀’ׁ�׀½ׁˆ׀½׀¾ (׀´׀¾ׁ�ׁ‚׀°׀²׀µ׀½׀¾ ׀¾ׁ‚ kirilloid.ru)";
t['27'] = "׀¡׀²׀µׁ‚׀¾׀²׀µ׀½ ׀°׀½׀°׀»׀¸׀·׀°ׁ‚׀¾ׁ€";
t['28'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀²ׁ€ׁ�׀·׀÷׀° ׀÷ׁ�׀¼ ׀°׀½׀°׀»׀¸׀·׀°ׁ‚׀¾ׁ€׀°";
t['NONEWVER'] = "׀˜׀¼׀°ׁ‚׀µ ׀¿׀¾ׁ�׀»׀µ׀´׀½׀°ׁ‚׀° ׀²ׁ�׀·׀¼׀¾׀¶׀½׀° ׀²׀µׁ€ׁ�׀¸ׁ�";
t['BVER'] = "׀’׀¸׀µ ׁ€׀°׀·׀¿׀¾׀»׀°׀³׀°ׁ‚׀µ ׁ� ׀±׀µׁ‚׀° ׀²׀µׁ€ׁ�׀¸ׁ�";
t['NVERAV'] = "׀˜׀¼׀° ׀½׀¾׀²׀° ׀²׀µׁ€ׁ�׀¸ׁ� ׀½׀° ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀°";
t['UPDSCR'] = "׀�׀±׀½׀¾׀²׀¸ ׀²׀µׁ€ׁ�׀¸ׁ�ׁ‚׀° ׀½׀° ׁ�׀÷ׁ€׀¸׀¿ׁ‚׀° ׁ�׀µ׀³׀° ?";
t['CHECKUPDATE'] = "׀�ׁ€׀¾׀²׀µׁ€׀÷׀° ׀·׀° ׀¾׀±׀½׀¾׀²ׁ�׀²׀°׀½׀¸ׁ�.<br>׀�׀¾׀»ׁ� ׀¸׀·ׁ‡׀°׀÷׀°׀¹ׁ‚׀µ...";
t['CROPFINDER'] = "׀¢ׁ�ׁ€ׁ�׀µ׀½׀µ ׀½׀° ׀¿׀¾׀»ׁ�";
t['AVPPV'] = "׀¡ׁ€׀µ׀´׀½׀° ׀¿׀¾׀¿ׁƒ׀»׀°ׁ†׀¸ׁ� ׀·׀° ׁ�׀µ׀»׀¾ׁ‚׀¾";
t['AVPPP'] = "׀¡ׁ€׀µ׀´׀½׀° ׀¿׀¾׀¿ׁƒ׀»׀°ׁ†׀¸ׁ� ׀·׀° ׀¸׀³ׁ€׀°ׁ‡";
t['37'] = "׀�׀¾׀÷׀°׀¶׀¸ ׁ‚׀°׀±׀»׀¸ׁ†׀° ׁ� ׀½׀°׀´ׁ�ׁ‚ׁ€׀¾׀¹׀÷׀¸ׁ‚׀µ ׀½׀° ׁ€׀µׁ�ׁƒׁ€ׁ�׀½׀¸ׁ‚׀µ ׀¿׀¾׀»׀µׁ‚׀°";
t['41'] = "׀�׀¾׀÷׀°׀¶׀¸ ׁ‚׀°׀±׀»׀¸ׁ†׀° ׁ� ׀½׀°׀´ׁ�ׁ‚ׁ€׀¾׀¹׀÷׀¸ׁ‚׀µ ׀½׀° ׁ�׀³ׁ€׀°׀´׀¸ׁ‚׀µ";
t['69'] = "׀�׀¸׀²׀¾ ׀½׀° LOG<br>׀¡׀�׀�׀� ׀—׀� ׀�׀ ׀�׀“׀ ׀�׀�׀˜׀¡׀¢׀˜<br>(Default = 0)";
t['48'] = "׀‘ׁ€׀¾׀¹ ׁ�ׁ‚ׁ€׀°׀½׀¸ׁ†׀¸ ׁ� ׀¾ׁ„׀µׁ€ׁ‚׀¸ ׀·׀° ׀¿ׁ€׀µ׀·׀°ׁ€׀µ׀¶׀´׀°׀½׀µ<br>׀´׀¾׀÷׀°ׁ‚׀¾ ׀µ ׀² '׀�׀°׀·׀°ׁ€׀° => ׀�ׁƒ׀¿׀¸' ׁ�ׁ‚ׁ€׀°׀½׀¸ׁ†׀°<br>(Default = 1)";
t['U.3'] = '׀˜׀¼׀µ ׀½׀° ׀²׀°ׁˆ׀°ׁ‚׀° ׁ�ׁ‚׀¾׀»׀¸ׁ†׀°<br>׀�׀¾ׁ�׀µׁ‚׀¸ ׁ‚׀²׀¾ׁ� ׀¿ׁ€׀¾ׁ„׀¸׀» ׀·׀° ׀¾׀±׀½׀¾׀²ׁ�׀²׀°׀½׀µ';
t['U.6'] = '׀�׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚׀¸ ׀½׀° ׁ‚׀²׀¾ׁ�ׁ‚׀° ׁ�ׁ‚׀¾׀»׀¸ׁ†׀°<br>׀�׀¾ׁ�׀µׁ‚׀¸ ׁ‚׀²׀¾ׁ� ׀¿ׁ€׀¾ׁ„׀¸׀» ׀·׀° ׀¾׀±׀½׀¾׀²ׁ�׀²׀°׀½׀µ';
t['MAX'] = '׀�׀°׀÷ׁ�׀¸׀¼׀°׀»׀½׀¾';
t['TOTTRTR'] = '׀�׀±ׁ‰׀¾ ׁ‚ׁ€׀µ׀½׀¸ׁ€׀°׀½׀¸ ׀µ׀´׀¸׀½׀¸ׁ†׀¸';
t['57'] = '׀�׀¾׀÷׀°׀¶׀¸ ׁ€׀°׀·ׁ�ׁ‚׀¾ׁ�׀½׀¸׀µׁ‚׀¾ & ׀²ׁ€׀µ׀¼׀µׁ‚׀¾';
t['TB3SL'] = TB3O.shN + ' ׀�׀°ׁ�ׁ‚ׁ€׀¾׀¹׀÷׀°';
t['UPDALLV'] = '׀�׀±׀½׀¾׀²׀¸ ׀·׀° ׀²ׁ�׀¸ׁ‡׀÷׀¸ ׁ�׀µ׀»׀°. ׀˜׀—׀�׀�׀›׀—׀’׀�׀™ ׀¡ ׀�׀�׀�׀¡׀˜׀�׀�׀›׀�׀� ׀’׀�׀˜׀�׀�׀�׀˜׀• ׀—׀� ׀”׀� ׀�׀• ׀‘׀×׀”׀•׀¨ ׀�׀�׀�׀�׀—׀�׀� !';
t['9'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀´׀¾׀¿ׁ�׀»׀½׀¸ׁ‚׀µ׀»׀½׀¸ ׀²ׁ€ׁ�׀·׀÷׀¸ ׀² ׀»ׁ�׀²׀¾ׁ‚׀¾ ׀¼׀µ׀½ׁ�<br>(Traviantoolbox, World Analyser, Travilog, Map, ׀¸ ׁ‚.׀½.)";
t['LARGEMAP'] = '׀“׀¾׀»ׁ�׀¼׀° ׀÷׀°ׁ€ׁ‚׀°';
t['USETHEMPR'] = '׀˜׀·׀¿׀¾׀»׀·׀²׀°׀¹ ׀³׀¸ (׀¿ׁ€׀¾׀¿׀¾ׁ€ׁ†׀¸׀¾׀½׀°׀»׀½׀¾)';
t['USETHEMEQ'] = '׀˜׀·׀¿׀¾׀»׀·׀²׀°׀¹ ׀³׀¸ (׀¿׀¾ ׁ€׀°׀²׀½׀¾)';
t['TOWNHALL'] = '׀�׀¼׀µׁ‚ׁ�ׁ‚׀²׀¾';
t['GSRVT'] = '׀¡ׁ�ׁ€׀²ׁ�ׁ€ ׀½׀° ׀¸׀³ׁ€׀°ׁ‚׀°';
t['ACCINFO'] = '׀˜׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀·׀° ׀°׀÷׀°ׁƒ׀½ׁ‚׀°';
t['NBO'] = '׀‘׀µ׀»׀µ׀¶׀½׀¸׀÷';
t['MNUL'] = '׀�׀µ׀½ׁ� ׀¾ׁ‚ ׀»ׁ�׀²׀°ׁ‚׀° ׁ�ׁ‚ׁ€׀°׀½׀°';
t['STAT'] = '׀¡ׁ‚׀°ׁ‚׀¸ׁ�ׁ‚׀¸׀÷׀°';
t['RESF'] = '׀ ׀µׁ�ׁƒׁ€ׁ�׀½׀¸ ׀¿׀¾׀»׀µׁ‚׀°';
t['VLC'] = '׀�׀µ׀³׀´׀°׀½';
t['MAPO'] = '׀�׀¿ׁ†׀¸׀¸ ׀½׀° ׀÷׀°ׁ€ׁ‚׀°ׁ‚׀°';
t['COLO'] = '׀�׀¿ׁ†׀¸׀¸ ׀·׀° ׁ†׀²׀µׁ‚׀°';
t['DBGO'] = 'Debug ׀¾׀¿ׁ†׀¸׀¸';
t['4'] = '׀�׀°׀·׀°ׁ€';
t['5'] = '׀¡׀±׀¾ׁ€׀µ׀½ ׀¿ׁƒ׀½׀÷ׁ‚/׀�׀°׀·׀°ׁ€׀¼׀°/׀ ׀°׀±׀¾ׁ‚׀¸׀»׀½׀¸ׁ†׀°/׀�׀¾׀½ׁ�ׁˆ׀½ׁ�';
t['6'] = "׀�׀¼׀µׁ‚ׁ�ׁ‚׀²׀¾/׀¢׀°׀²׀µׁ€׀½׀°/׀�׀¾׀²׀°ׁ‡׀½׀¸ׁ†׀° ׀·׀° ׀¾ׁ€ׁ�׀¶׀¸ׁ�/׀�׀¾׀²׀°ׁ‡׀½׀¸ׁ†׀° ׀·׀° ׀±ׁ€׀¾׀½׀¸";
t['HEROSMANSION'] = "׀¢׀°׀²׀µׁ€׀½׀°";
t['ARMOURY'] = '׀�׀¾׀²׀°ׁ‡׀½׀¸ׁ†׀° ׀·׀° ׀±ׁ€׀¾׀½׀¸';
t['BLACKSMITH'] = '׀�׀¾׀²׀°ׁ‡׀½׀¸ׁ†׀° ׀·׀° ׀¾ׁ€ׁ�׀¶׀¸ׁ�';
t['NOW'] = '׀¡׀µ׀³׀°';
t['CLOSE'] = '׀—׀°ׁ‚׀²׀¾ׁ€׀¸';
t['USE'] = '׀˜׀·׀¿׀¾׀»׀·׀²׀°׀¹';
t['USETHEM1H'] = '׀˜׀·׀¿׀¾׀»׀·׀²׀°׀¹ ׀³׀¸ (1 ׁ‡׀°ׁ�׀¾׀²׀° ׀¿ׁ€׀¾׀´ׁƒ׀÷ׁ†׀¸ׁ�)';
t['OVERVIEW'] = '׀�׀±ׁ‰ ׀¸׀·׀³׀»׀µ׀´';
t['FORUM'] = '׀₪׀¾ׁ€ׁƒ׀¼';
t['ATTACKS'] = '׀�ׁ‚׀°׀÷׀¸';
t['NEWS'] = '׀�׀¾׀²׀¸׀½׀¸';
t['ADDCRTPAGE'] = '׀”׀¾׀±׀°׀²׀¸ ׁ‚׀µ׀÷ׁƒׁ‰׀¾';
t['SCRPURL'] = 'TBeyond ׁ�ׁ‚ׁ€׀°׀½׀¸ׁ†׀°';
t['50'] = '׀‘ׁ€. ׀½׀° ׁˆ׀¿׀¸׀¾׀½׀¸ׁ‚׀µ ׀·׀°<br>"׀˜׀·׀±׀µׁ€׀¸ ׁˆ׀¿׀¸׀¾׀½׀¸" ׁ„ׁƒ׀½׀÷ׁ†׀¸ׁ�';
t['SPACER'] = '׀ ׀°׀·ׁ�ׁ‚׀¾ׁ�׀½׀¸ׁ�';
t['53'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀·׀° ׀²׀¾׀¹ׁ�׀÷׀¸ׁ‚׀µ ׀² tooltips';
t['MEREO'] = '׀¡ׁ�׀¾׀±ׁ‰׀µ׀½׀¸ׁ� & ׀”׀¾׀÷׀»׀°׀´׀¸';
t['59'] = '׀‘ׁ€׀¾׀¹ ׀¡ׁ�׀¾׀±ׁ‰׀µ׀½׀¸ׁ�/׀´׀¾׀÷׀»׀°׀´׀¸ ׁ�ׁ‚ׁ€׀°׀½׀¸ׁ†׀¸ ׀·׀° ׀¿ׁ€׀µ׀·׀°ׁ€׀µ׀¶׀´׀°׀½׀µ<br>(Default = 1)';
t['ATTABLES'] = '׀¢׀°׀±׀»׀¸ׁ†׀° ׀½׀° ׀²׀¾׀¹ׁ�׀÷׀¸ׁ‚׀µ';
t['MTW'] = '׀�׀°׀»׀¸ׁ‡׀½׀¾';
t['MTX'] = '׀’ ׀¸׀·׀»׀¸ׁˆׁ�׀÷';
t['MTC'] = '׀¢׀µ׀÷ׁƒׁ‰ ׁ‚׀¾׀²׀°ׁ€';
t['ALFL'] = '׀’ׁ€ׁ�׀·׀÷׀° ׀÷ׁ�׀¼ ׁ„׀¾ׁ€ׁƒ׀¼<br>(׀�ׁ�ׁ‚׀°׀²׀¸ ׀¿ׁ€׀°׀·׀½׀¾ ׀·׀° ׀²ׁ�ׁ‚ׁ€׀µׁˆ׀½׀¸ׁ� ׁ„׀¾ׁ€ׁƒ׀¼)';
t['82.L'] = '׀—׀°׀÷׀»ׁ�ׁ‡׀¸ ׀¾ׁ‚׀¼׀µׁ‚׀÷׀¸ׁ‚׀µ (׀¡׀÷ׁ€׀¸׀¹ ׀¸׀·ׁ‚ׁ€׀¸׀²׀°׀½׀µ, ׀¼׀µׁ�ׁ‚׀µ׀½׀µ ׀½׀°׀³׀¾ׁ€׀µ, ׀¼׀µׁ�ׁ‚׀µ׀½׀µ ׀½׀° ׀´׀¾׀»ׁƒ ׀½׀° ׀¸׀÷׀¾׀½׀¸ׁ‚׀µ)';
t['MTCL'] = '׀˜׀·ׁ‡׀¸ׁ�ׁ‚׀¸ ׀²ׁ�׀¸ׁ‡׀÷׀¸';
t['82.U'] = '׀�ׁ‚׀÷׀»ׁ�ׁ‡׀¸ ׀¾ׁ‚׀¼׀µׁ‚׀÷׀¸ׁ‚׀µ (׀�׀¾׀÷׀°׀¶׀¸ ׀¸׀·ׁ‚ׁ€׀¸׀²׀°׀½׀µ, ׀¼׀µׁ�ׁ‚׀µ׀½׀µ ׀½׀°׀³׀¾ׁ€׀µ, ׀¼׀µׁ�ׁ‚׀µ׀½׀µ ׀½׀° ׀´׀¾׀»ׁƒ ׀½׀° ׀¸׀÷׀¾׀½׀¸ׁ‚׀µ)';
t['CKSORT'] = '׀�׀°ׁ‚׀¸ׁ�׀½׀¸ ׀·׀° ׁ�׀¾ׁ€ׁ‚׀¸ׁ€׀°׀½׀µ';
t['MIN'] = '׀�׀¸׀½׀¸׀¼׀°׀»׀½׀¾';
t['SVGL'] = '׀ ׀°׀·׀¿ׁ€׀µ׀´׀µ׀»ׁ�׀½׀µ ׀¼׀µ׀¶׀´ׁƒ ׁ�׀µ׀»׀°ׁ‚׀°';
t['VGL'] = '׀¡׀¿׀¸ׁ�ׁ�׀÷ ׀½׀° ׁ�׀µ׀»׀°ׁ‚׀°';
t['12'] = "׀�׀¾׀÷׀°׀¶׀¸ 'dorf1.php' ׀¸ 'dorf2.php' ׀²ׁ€ׁ�׀·׀÷׀¸";
t['UPDATEPOP'] = '׀�׀±׀½׀¾׀²׀¸ ׀¿׀¾׀¿ׁƒ׀»׀°ׁ†׀¸ׁ�ׁ‚׀°';
t['54'] = '׀�׀¾׀÷׀°׀¶׀¸ ׁ€׀°׀·ׁ�ׁ‚׀¾ׁ�׀½׀¸׀µׁ‚׀¾ ׀¸ ׀²ׁ€׀µ׀¼׀µׁ‚׀¾ ׀´׀¾ ׁ�׀µ׀»׀°ׁ‚׀° ׀² tooltips';
t['EDIT'] = '׀�ׁ€׀¾׀¼ׁ�׀½׀°';
t['NPCO'] = 'NPC ׀¾׀¿ׁ†׀¸׀¸ ׀·׀° ׀¿׀¾׀¼׀¾ׁ‰';
t['26'] = '׀�׀¾׀÷׀°׀¶׀¸ NPC ׀¿׀¾׀¼׀¾ׁˆ׀½׀¸׀÷ ׀÷׀°׀»׀÷ׁƒ׀»׀°ׁ‚׀¾ׁ€/׀²ׁ€ׁ�׀·׀÷׀°';
t['58'] = '׀�׀¾׀÷׀°׀¶׀¸ ׁ‚׀°׀±׀»׀¸ׁ†׀° ׀½׀° ׀¸׀³ׁ€׀°ׁ‡׀¸ׁ‚׀µ/ׁ�׀µ׀»׀°ׁ‚׀°/׀¿ׁ€׀µ׀²׀·׀µׁ‚׀¸ ׀¾׀°׀·׀¸ׁ�׀¸';
t['NEWVILLAGEAV'] = '׀”׀°ׁ‚׀°/׀§׀°ׁ�';
t['TIMEUNTIL'] = '׀’ׁ€׀µ׀¼׀µ ׀·׀° ׀¸׀·ׁ‡׀°׀÷׀²׀°׀½׀µ';
t['61'] = '׀�׀¾׀÷׀°׀¶׀¸ "׀˜׀·ׁ‚ׁ€׀¸׀¹ ׀²ׁ�׀¸ׁ‡׀÷׀¸" ׁ‚׀°׀±׀»׀¸ׁ†׀° ׀² ׁ�ׁ‚ׁ€׀°׀½׀¸ׁ†׀°ׁ‚׀° ׁ� ׀´׀¾׀÷׀»׀°׀´׀¸ׁ‚׀µ';
t['62'] = '׀�׀¾׀÷׀°׀¶׀¸ "׀˜׀·׀¿ׁ€׀°ׁ‚׀¸ ׀»׀¸ׁ‡׀½׀¾ ׁ�ׁ�׀¾׀±ׁ‰׀µ׀½׀¸׀µ" ׀¸׀÷׀¾׀½׀° ׀·׀° ׀¼׀µ׀½ ׁ�ׁ�ׁ‰׀¾';
t['CENTERMAP'] = '׀�׀°ׁ€ׁ‚׀°';
t['13'] = '׀�׀¾׀÷׀°׀¶׀¸ "׀�׀°ׁ€ׁ‚׀°" ׀¸׀÷׀¾׀½׀°';
t['SENDTROOPS'] = '׀˜׀·׀¿ׁ€׀°ׁ‚׀¸ ׀²׀¾׀¹ׁ�׀÷׀¸';
t['64'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀´׀µׁ‚׀°׀¹׀»׀¸ ׀² ׀´׀¾׀÷׀»׀°׀´׀¸ׁ‚׀µ';
t['7'] = "׀”׀²׀¾ׁ€׀µׁ†/׀ ׀µ׀·׀¸׀´׀µ׀½ׁ†׀¸ׁ�/׀�׀÷׀°׀´׀µ׀¼׀¸ׁ�/׀¡ׁ�׀÷ׁ€׀¾׀²׀¸ׁˆ׀½׀¸ׁ†׀°";
t['PALACE'] = "׀”׀²׀¾ׁ€׀µׁ†";
t['RESIDENCE'] = "׀ ׀µ׀·׀¸׀´׀µ׀½ׁ†׀¸ׁ�";
t['ACADEMY'] = "׀�׀÷׀°׀´׀µ׀¼׀¸ׁ�";
t['TREASURY'] = "׀¡ׁ�׀÷ׁ€׀¾׀²׀¸ׁˆ׀½׀¸ׁ†׀°";
t['45'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀¼׀¸׀³׀°ׁ‰׀¸ ׀½׀¸׀²׀° ׀½׀° ׁ�׀³ׁ€׀°׀´׀¸ׁ‚׀µ ׀÷׀¾׀¸ׁ‚׀¾ ׁ�׀° ׀½׀°׀´ׁ�ׁ‚ׁ€׀¾׀µ׀½׀¸";
t['14'] = "׀�׀¾׀÷׀°׀¶׀¸ '׀˜׀·׀¿ׁ€׀°ׁ‚׀¸ ׀²׀¾׀¹ׁ�׀÷׀¸/׀˜׀·׀¿ׁ€׀°ׁ‚׀¸ ׁ€׀µׁ�ׁƒׁ€ׁ�׀¸' ׀¸׀÷׀¾׀½׀¸ ׀² ׁ�׀¿׀¸ׁ�ׁ�׀÷׀° ׀½׀° ׁ�׀µ׀»׀¾ׁ‚׀¾";
t['34'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀�׀ /׀´׀µ׀½ ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀² ׁ‚׀°׀±׀»׀¸ׁ†׀°ׁ‚׀°";
t['UPGTB'] = "׀ ׀µׁ�ׁƒׁ€ׁ�׀½׀¸ ׀¿׀¾׀»׀µׁ‚׀°/ׁ�׀³ׁ€׀°׀´׀¸ ׁ‚׀°׀±׀»׀¸ׁ†׀°";
t['35'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀÷׀¾׀½ׁ�ׁƒ׀¼׀°ׁ†׀¸ׁ�ׁ‚׀° ׀½׀° ׁ�׀³ׁ€׀°׀´׀¸ׁ‚׀µ ׀² ׁ‚׀°׀±׀»׀¸ׁ†׀°ׁ‚׀°";
t['16'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀µׁ„׀µ׀÷ׁ‚׀¸׀²׀½׀°ׁ‚׀° ׀¿ׁ€׀¾׀´ׁƒ׀÷ׁ†׀¸ׁ� ׀½׀° ׀¿׀¾׀»׀µׁ‚׀°ׁ‚׀° ׀² ׁ�׀¿׀¸ׁ�ׁ�׀÷׀° ׀½׀° ׁ�׀µ׀»׀¾ׁ‚׀¾";
t['RBTT'] = "׀›׀µ׀½ׁ‚׀° ׀½׀° ׁ€׀µׁ�ׁƒׁ€ׁ�׀¸ׁ‚׀µ";
t['39'] = "׀�׀¾׀÷׀°׀¶׀¸ '׀›׀µ׀½ׁ‚׀° ׀½׀° ׁ€׀µׁ�ׁƒׁ€ׁ�׀¸ׁ‚׀µ' ׁ‚׀°׀±׀»׀¸ׁ†׀°";
t['40'] = "׀�׀¾׀÷׀°׀¶׀¸ '׀›׀µ׀½ׁ‚׀° ׀½׀° ׁ€׀µׁ�ׁƒׁ€ׁ�׀¸ׁ‚׀µ' ׁ‚׀°׀±׀»׀¸ׁ†׀° ׀² ׀¾ׁ‚׀´׀µ׀»׀µ׀½ ׀¿ׁ€׀¾׀·׀¾ׁ€׀µׁ†";
t['21'] = "׀�׀¾׀÷׀°׀¶׀¸ '׀�׀¾ׁ‚ׁ€׀µ׀±׀¸ׁ‚׀µ׀»ׁ�׀÷׀¸ ׀¾ׁ‚׀¼׀µׁ‚׀÷׀¸' ׀² ׀¾ׁ‚׀´׀µ׀»׀µ׀½ ׀¿ׁ€׀¾׀·׀¾ׁ€׀µׁ†";
t['23'] = "׀�׀¾׀÷׀°׀¶׀¸ '׀‘׀µ׀»׀µ׀¶׀½׀¸׀÷' ׀² ׀¾ׁ‚׀´׀µ׀»׀µ׀½ ׀¿ׁ€׀¾׀·׀¾ׁ€׀µׁ†";
t['17'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀¿׀¾׀¿ׁƒ׀»׀°ׁ†׀¸ׁ�ׁ‚׀° ׀² ׁ�׀¿׀¸ׁ�ׁ�׀÷׀° ׀½׀° ׁ�׀µ׀»׀¾ׁ‚׀¾";
t['29'] = '׀�׀½׀°׀»׀¸׀·׀°ׁ‚׀¾ׁ€ ׀½׀° ׀÷׀°ׁ€ׁ‚׀°ׁ‚׀°';
t['30'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀²ׁ€ׁ�׀·׀÷׀¸ ׀÷ׁ�׀¼ ׀¿׀¾ׁ‚ׁ€׀µ׀±׀¸ׁ‚׀µ׀»׀¸ׁ‚׀µ ׀² ׀÷׀°ׁ€ׁ‚׀°ׁ‚׀°';
t['31'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀²ׁ€ׁ�׀·׀÷׀¸ ׀÷ׁ�׀¼ ׁ�ׁ�ׁ�׀·׀¸ׁ‚׀µ ׀² ׀÷׀°ׁ€ׁ‚׀°ׁ‚׀°';
t['63'] = '׀�׀¾׀÷׀°׀¶׀¸ TB3 ׀ ׀°׀·ׁˆ׀¸ׁ€׀µ׀½ ׀´׀¾׀÷׀»׀°׀´ ׀½׀° ׀±׀¸ׁ‚׀÷׀¸';
t['18'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀´׀¾׀¿ׁ�׀»׀½׀¸ׁ‚׀µ׀»׀½׀¸ (2 ׀÷׀¾׀»׀¾׀½׀¸) ׀² ׁ�׀¿׀¸ׁ�ׁ�׀÷׀° ׀½׀° ׁ�׀µ׀»׀¾ׁ‚׀¾ ׀² ׀¾ׁ‚׀´׀µ׀»׀µ׀½ ׀¿ׁ€׀¾׀·׀¾ׁ€׀µׁ†';
t['60'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀²ׁ€ׁ�׀·׀÷׀¸ ׀÷ׁ�׀¼ ׁ�ׁ�׀¾׀±ׁ‰׀µ׀½׀¸ׁ�ׁ‚׀°/׀´׀¾׀÷׀»׀°׀´׀¸ׁ‚׀µ ׀² ׀¾ׁ‚׀²׀¾ׁ€ׁ�ׁ‰ ׁ�׀µ ׀¿ׁ€׀¾׀·׀¾ׁ€׀µׁ†';
t['42'] = '׀¡׀¾ׁ€ׁ‚׀¸ׁ€׀°׀¹ ׁ�׀³ׁ€׀°׀´׀¸ׁ‚׀µ ׀¿׀¾ ׀¸׀¼׀µ ׀² ׁ‚׀°׀±׀»׀¸ׁ†׀°ׁ‚׀°';
t['19'] = '׀�׀¾׀÷׀°׀¶׀¸ ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀·׀° ׁ�׀³ׁ€׀°׀´׀¸ׁ‚׀µ ׀² ׀¿ׁ€׀¾׀³ׁ€׀µׁ� ׀¸ ׀´׀²׀¸׀¶׀µ׀½׀¸׀µׁ‚׀¾ ׀½׀° ׀²׀¾׀¹ׁ�׀÷׀¸ׁ‚׀µ<br>׀² ׁ�׀¿׀¸ׁ�ׁ�׀÷׀° ׀½׀° ׁ�׀µ׀»׀¾ׁ‚׀¾';
t['32'] = "׀�׀¾׀÷׀°׀¶׀¸ '׀›׀µ׀½ׁ‚׀° ׀·׀° ׁ‚ׁ�ׁ€ׁ�׀µ׀½׀µ'";
t['3'] = '׀˜׀·ׁ‡׀¸ׁ�׀»׀¸ T3.1 ׀›׀µ׀³׀¸׀¾׀½׀µׁ€׀¸ & ׀₪׀°׀»׀°׀½׀³׀¸ ׀÷׀°׀¿׀°ׁ†׀¸ׁ‚׀µׁ‚<br>(׀·׀° ׁ�׀¼׀µׁ�׀µ׀½׀¸ T3.1 & T3.5 ׁ�ׁ�ׁ€׀²ׁ�ׁ€׀¸)';
t['33'] = "׀�׀¾׀÷׀°׀¶׀¸ '׀›׀µ׀½ׁ‚׀° ׀·׀° ׁ‚ׁ�ׁ€ׁ�׀µ׀½׀µ' ׀² ׀¾ׁ‚׀´׀µ׀»׀µ׀½ ׀¿ׁ€׀¾׀·׀¾ׁ€׀µׁ†";
t['36'] = "׀�׀¾׀÷׀°׀¶׀¸ '׀”׀¾׀÷׀°ׁ‚׀¾/׀�ׁ�ׁ‚׀°ׁ‚ׁ�׀÷' ׀÷׀°׀»׀÷ׁƒ׀»׀°ׁ‚׀¾ׁ€ ׀² ׀½׀°׀´ׁ�ׁ‚ׁ€׀¾׀¹/ׁ‚ׁ€׀µ׀½׀¸ׁ€׀°׀¹ ׁ‚׀°׀±׀»׀¸ׁ†׀¸ׁ‚׀µ";
t['RESIDUE'] = '׀�ׁ�ׁ‚׀°ׁ‚ׁ�׀÷ ׀°׀÷׀¾ ׀¿׀¾ׁ�ׁ‚ׁ€׀¾׀¸ׁ‚׀µ ';
t['RESOURCES'] = '׀ ׀µׁ�ׁƒׁ€ׁ�׀¸';
t['SH1'] = "׀�ׁ‚׀²׀¾ׁ€׀¸ ׁ‚׀²׀¾ׁ� ׀¿ׁ€׀¾ׁ„׀¸׀» ׀·׀° ׀°׀²ׁ‚׀¾׀¼׀°ׁ‚׀¸ׁ‡׀½׀¾ ׀½׀°׀¼׀¸ׁ€׀°׀½׀µ ׀½׀° ׁ�ׁ‚׀¾׀»׀¸ׁ†׀°/׀÷׀¾׀¾ׁ€׀´׀¸׀½׀°ׁ‚׀¸<br>׀�׀¾ׁ�ׁ‚ׁ€׀¾׀¹ ׀÷׀°׀·׀°ׁ€׀¼׀° ׀·׀° ׀°׀²ׁ‚׀¾׀¼׀°ׁ‚׀¸ׁ‡׀½׀¾ ׀·׀°ׁ�׀¸ׁ‡׀°׀½׀µ ׀½׀° ׁ€׀°ׁ�׀°ׁ‚׀° ׀¸ ׀¿׀¾ׁ�׀»׀µ ׀¾ׁ‚׀²׀¾ׁ€׀¸ ׀¼׀µ׀³׀´׀°׀½׀°";
t['46'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀´׀¾׀¿ׁ�׀»׀½׀¸ׁ‚׀µ׀»׀½׀° ׀¸׀½ׁ„׀¾ׁ€׀¼׀°ׁ†׀¸ׁ� ׀·׀° ׀²ׁ�׀µ׀÷׀¸ ׀¿ׁ€׀¸ׁ�ׁ‚׀¸׀³׀½׀°׀» ׁ‚ׁ�ׁ€׀³׀¾׀²׀µׁ†";
t['2'] = '׀�ׁ€׀µ׀¼׀°ׁ…׀½׀¸ ׁ€׀µ׀÷׀»׀°׀¼׀½׀¸ׁ‚׀µ ׀±׀°׀½׀µׁ€׀¸';
t['15'] = "׀�׀¾׀÷׀°׀¶׀¸ ׀´ׁ�ׁ€׀²׀°, ׀³׀»׀¸׀½׀°, ׀¶׀µ׀»ׁ�׀·׀¾ ׀¿ׁ€׀¾׀´ׁƒ׀÷ׁ†׀¸ׁ� ׀·׀° ׁ‡׀°ׁ� ׀² ׁ�׀¿׀¸ׁ�ׁ�׀÷׀° ׀½׀° ׁ�׀µ׀»׀¾ׁ‚׀¾";
t['11'] = "׀�ׁ€׀µ׀¿ׁ€׀°ׁ‚׀÷׀° ׀·׀° ׀²׀¾׀µ׀½׀½׀¸ ׀´׀¾׀÷׀»׀°׀´׀¸";
break;
case "pl"://by Dzikuska & Signum & llameth
//avRace = ['Rzymianie', 'Germanie', 'Galowie'];
t['8'] = 'Sojusz';
t['SIM'] = 'Symulator Walki';
t['QSURE'] = 'Jesteֵ› pewien?';
t['LOSS'] = 'Strata';
t['PROFIT'] = 'Zysk';
t['EXTAV'] = 'Rozbudowa moֵ¼liwa';
t['PLAYER'] = 'Gracz';
t['VILLAGE'] = 'Osada';
t['POPULATION'] = 'Populacja';
t['COORDS'] = 'Koordynaty';
t['MAPTBACTS'] = 'Akcje';
t['SAVED'] = 'Zapisane';
t['YOUNEED'] = 'Potrzebujesz';
t['TODAY'] = 'Dzisiaj';
t['TOMORROW'] = 'Jutro';
t['DAYAFTERTOM'] = 'Pojutrze';
t['MARKET'] = 'Rynek';
t['BARRACKS'] = 'Koszary';
t['RAP'] = 'Miejsce Zbiֳ³rki';
t['STABLE'] = 'Stajnia';
t['WORKSHOP'] = 'Warsztat';
t['SENDRES'] = 'Wyֵ›lij surowce';
t['BUY'] = 'Kup';
t['SELL'] = 'Sprzedaj';
t['SENDIGM'] = 'Wyֵ›lij PW';
t['LISTO'] = 'Moֵ¼liwe';
t['ON'] = 'na';
t['AT'] = 'o';
t['EFICIENCIA'] = 'Efektywnoֵ›ִ‡';
t['NEVER'] = 'Nigdy';
t['ALDEAS'] = 'Osada(y)';
t['TIEMPO'] = 'Czas';
t['OFREZCO'] = 'Oferujִ™';
t['BUSCO'] = 'Szukam';
t['TIPO'] = 'Rodzaj';
t['DISPONIBLE'] = 'Tylko moֵ¼liwe';
t['CUALQUIERA'] = 'Jakikolwiek';
t['YES'] = 'Tak';
t['NO'] = 'Nie';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Zakֵ‚adki';
t['ANYADIR'] = 'Dodaj';
t['UBU'] = 'Nowa zakֵ‚adka URL';
t['UBT'] = 'Nowa zakֵ‚adka Text';
t['DEL'] = 'Usuֵ„';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Maksimum czasu';
t['ARCHIVE'] = 'Archiwum';
t['SUMMARY'] = 'Razem';
t['TROPAS'] = 'Jednostki';
t['CHKSCRV'] = 'Uaktualnij TBeyond';
t['ACTUALIZAR'] = 'Aktualizuj informacje o osadzie';
t['VENTAS'] = 'Zapisz ofertִ™';
t['MAPSCAN'] = 'Skanuj mapִ™';
t['BIC'] = 'Pokaֵ¼ rozszerzone ikony';
t['22'] = 'Pokaֵ¼ notatnik';
t['SAVE'] = 'Zapisz';
t['49'] = 'Miejsce zbiֳ³rki, domyֵ›lna akcja';
t['AT2'] = 'Posiֵ‚ki';
t['AT3'] = 'Atak: Normalny';
t['AT4'] = 'Atak: Grabieֵ¼';
t['24'] = 'Notatnik - Rozmiar';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normalny (maֵ‚y)';
t['NBSB'] = 'Duֵ¼y obraz (duֵ¼y)';
t['25'] = 'Notatnik - wysokoֵ›ִ‡';
t['NBHAX'] = 'Automatycznie ustaw wysokoֵ›ִ‡';
t['NBHK'] = 'Domyֵ›lna wysokoֵ›ִ‡';
t['43'] = 'Pokaֵ¼ centrum osady';
t['NPCSAVETIME'] = 'Zapisz: ';
t['38'] = 'Pokaֵ¼ kolory poziomu surowcֳ³w';
t['44'] = 'Pokaֵ¼ kolory poziomu budynkֳ³w';
t['65'] = 'Kolor: rozbudowa moֵ¼liwa<br>(Domyֵ›lnie  = Brak)';
t['66'] = 'Kolor: poziomu maksymalnego<br>(Domyֵ›lnie  = Brak)';
t['67'] = 'Kolor: rozbudowa niemoֵ¼liwa<br>(Domyֵ›lnie  = Brak)';
t['68'] = 'Kolor: rozbudowa przy pomocy NPC<br>(Domyֵ›lnie  = Brak)';
t['TOTALTROOPS'] = 'Wszystkie jednostki';
t['20'] = 'Pokaֵ¼ zakֵ‚adki';
t['U.2'] = 'Rasa';
t['1'] = "Travian v2.x server";
t['SELECTALLTROOPS'] = "Wybierz wszystkie jednostki";
t['PARTY'] = "ֵ�wiִ™to";
t['CPPERDAY'] = "PK/dzieֵ„";
t['SLOT'] = "Miejsce";
t['TOTAL'] = "Razem";
t['SELECTSCOUT'] = "Wybierz zwiadowcֳ³w";
t['SELECTFAKE'] = "Wybierz fejka";
t['NOSCOUT2FAKE'] = "Nie moֵ¼na uֵ¼yִ‡ zwiadowcy do wysֵ‚ania fejka !";
t['NOTROOP2FAKE'] = "Brak jednostek aby wysֵ‚aִ‡ fejka!";
t['NOTROOP2SCOUT'] = "Brak jednostek aby wysֵ‚aִ‡ zwiadowcִ™ !";
t['NOTROOPS'] = "Brak jednostek w osadzie !";
t['ALL'] = "Wszystko";
t['SH2'] = "Jako kolor pֳ³l moֵ¼esz wpisaִ‡:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- lub kod koloru w HEX np. <b>#004523</b><br>- zostaw puste dla domyֵ›lnych kolorֳ³w";
t['SOREP'] = "Pokaֵ¼ oryginalny raport (do publikacji)";
t['56'] = "Pokaֵ¼ zawartoֵ›ִ‡ i typ doliny<br>kiedy wskaֵ¼esz myszkִ…";
t['10'] = "Symulator walki link do:<br>(menu z lewej strony)";
t['WSIMO1'] = "Wewnִ™trzny (wbudowany w grִ™)";
t['WSIMO2'] = "Zewnִ™trzny (zrobiony przez kirilloid.ru)";
t['27'] = "Uֵ¼ywany World Analyser ";
t['28'] = "Pokaֵ¼ linki statystyki analysera";
t['NONEWVER'] = "Masz najnowszִ… wersjִ™";
t['BVER'] = "Masz wersjִ™ beta";
t['NVERAV'] = "Nowa wersja skryptu jest moֵ¼liwa do pobrania";
t['UPDSCR'] = "Uaktualniִ‡ skrypt teraz? ?";
t['CHECKUPDATE'] = "Sprawdzam aktualizacjִ™ skryptu.<br>Proszִ™ czekaִ‡...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "ֵ�rednia populacja wg osady";
t['AVPPP'] = "ֵ�rednia populacja wg gracza";
t['37'] = "Pokaֵ¼ tabelkִ™ rozbudowy surowcֳ³w";
t['41'] = "Pokaֵ¼ tabelkִ™ rozbudowy budynkֳ³w";
t['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0)";
t['48'] = "Liczba stron ofert na rynku <br>w zakֵ‚adce 'Rynek => Kupowanie' Stron<br>(Domyֵ›lnie = 1)";
t['U.3'] = 'Nazwa Twojej stolicy<br><b>Wejdֵ÷ do swojego profilu w ustawieniach aby zaktualizowaִ‡</b>';
t['U.6'] = 'Wspֳ³ֵ‚rzִ™dne Twojej stolicy<br><b>Wejdֵ÷ do swojego profilu w ustawieniach aby zaktualizowaִ‡</b>';
t['MAX'] = 'Maks.';
t['TOTTRTR'] = 'Suma szkolonych jednostek';
t['57'] = 'Pokaֵ¼ dystans i czas';
t['UPDALLV'] = 'Uaktualnij wszystkie osady. Uֵ»YWAJ TEGO Z MAKSYMALNִ„ ROZWAGִ„. MOֵ»E DOPROWADZIִ† DO ZABLOKOWANIA KONTA !';
t['9'] = "Pokaֵ¼ dodatkowe linki w menu po lewej stronie<br>(Traviantoolbox, World Analyser, Travilog, Map, itp.)";
t['LARGEMAP'] = 'Duֵ¼a mapa';
t['USETHEMPR'] = 'Uֵ¼yj je  (proporcjonalnie)';
t['USETHEMEQ'] = 'Uֵ¼yj je (rֳ³wne)';
t['TOWNHALL'] = 'Ratusz';
t['GSRVT'] = 'Serwer gry';
t['ACCINFO'] = 'Informacje o koncie';
t['NBO'] = 'Notatnik';
t['MNUL'] = 'Menu po lewej stronie';
t['STAT'] = 'Statystyki';
t['RESF'] = 'Pola surowcֳ³w';
t['VLC'] = 'Centrum osady';
t['MAPO'] = 'Opcje mapy';
t['COLO'] = 'Opcje kolorֳ³w';
t['DBGO'] = 'Debug options';
t['4'] = 'Rynek';
t['5'] = 'Miejsce zbiֳ³rki/koszary/Warsztat/Stajnia';
t['6'] = "Ratusz/Dwֳ³r bohaterֳ³w/Kuֵ÷nia/Zbrojownia";
t['HEROSMANSION'] = "Dwֳ³r bohaterֳ³w";
t['BLACKSMITH'] = 'Zbrojownia';
t['ARMOURY'] = 'Kuֵ÷nia';
t['NOW'] = 'Teraz';
t['CLOSE'] = 'Zamknij';
t['USE'] = 'Uֵ¼yj';
t['USETHEM1H'] = 'Uֵ¼yj je (1 godzinna  produkcja)';
t['OVERVIEW'] = 'Ogֳ³lne';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Ataki';
t['NEWS'] = 'Nowoֵ›ci';
t['ADDCRTPAGE'] = 'Dodaj bieֵ¼ִ…cִ…';
t['SCRPURL'] = 'Strona TBeyond';
t['50'] = 'Iloֵ›ִ‡ zwiadowcֳ³w dla funkcji<br>"Wybierz zwiadowcֳ³w"';
t['SPACER'] = 'Odstִ™p';
t['53'] = 'Pokaֵ¼ informacjִ™ o jednostkach w podpowiedziach';
t['MEREO'] = 'Wiadomoֵ›ci i raporty';
t['59'] = 'Liczba wiadomoֵ›ci/raportֳ³w na stronie  <br>(Domyslnie = 1)';
t['ATTABLES'] = 'Tabela jednostek';
t['MTW'] = 'Niewykorzystane';
t['MTX'] = 'Przekroczenie';
t['MTC'] = 'Bierzִ…ca ֵ‚adownoֵ›ִ‡';
t['ALFL'] = 'Link do zewnִ™trznego forum<br>(Zostaw puste dla wewnִ™trznego forum)';
t['82.L'] = 'Zablokuj zakֵ‚adki (Ukryj usuֵ„, do gֳ³ry, na dֳ³ֵ‚ ikonki)';
t['MTCL'] = 'Wyczyֵ›ִ‡ wszystko';
t['82.U'] = 'Odblokuj zakֵ‚adki (Ukryj usuֵ„, do gֳ³ry, na dֳ³ֵ‚ ikonki)';
t['CKSORT'] = 'Kliknij aby posortowaִ‡';
t['MIN'] = 'Min';
t['SVGL'] = 'Zapisz rֳ³wnieֵ¼ dla innych osad';
t['VGL'] = 'Lista Osad';
t['12'] = "Pokaֵ¼ 'dorf1.php' i 'dorf2.php' linki";
t['UPDATEPOP'] = 'Aktualizuj populacjִ™';
t['54'] = 'Pokaֵ¼ odlegֵ‚oֵ›ִ‡ i czas dojֵ›cia do osady w podpowiedziach';
t['EDIT'] = 'Edytuj';
t['NPCO'] = 'Opcje handlarza NPC';
t['26'] = 'Pokaֵ¼ kalkulacje handlarza NPC /linki';
t['NEWVILLAGEAV'] = 'Nowa osada';
t['58'] = 'Pokaֵ¼ tabelkִ™ graczy/osad/zdobytych dolin';
t['NEWVILLAGEAV'] = 'Data/Czas';
t['TIMEUNTIL'] = 'Pozostaֵ‚o czasu';
t['61'] = 'Pokaֵ¼ tabelkִ™ "Usuֵ„ wszystko" na stronie z raportami';
t['62'] = 'Pokaֵ¼ ikonkִ™ "Wyֵ›lij PW" rֳ³wnieֵ¼ dla mnie';
t['CENTERMAP'] = 'Centruj mapִ™ na tej osadzie';
t['13'] = 'Pokaֵ¼ ikonkִ™ "Centruj mapִ™ na tej osadzie"';
t['SENDTROOPS'] = 'Wyֵ›lij jednostki';
t['64'] = 'Pokaֵ¼ szczegֳ³ֵ‚y statystyk w raporcie';
t['7'] = "Paֵ‚ac/Rezydencja/Akademia/Skarbiec";
t['PALACE'] = "Paֵ‚ac";
t['RESIDENCE'] = "Rezydencja";
t['ACADEMY'] = "Akademia";
t['TREASURY'] = "Skarbiec";
t['45'] = "Pokaֵ¼ poziom budynku ktֳ³ry jest aktualnie budowany jako migajִ…cy";
t['14'] = "W spisie osad pokaֵ¼ ikonki 'Wyֵ›lij jednostki/Wyֵ›lij surowce'";
t['34'] = "Pokaֵ¼ PK/dzieֵ„ w tabelce rozbudowy";
t['UPGTB'] = "Tabelka rozbudowy Pola surowcֳ³w/budynkֳ³w";
t['35'] = "Pokaֵ¼ zjadane zboֵ¼e w tabelce rozbudowy";
t['60'] = 'Pokaֵ¼ link do otwarcia wiadomoֵ›ci w okienku';
t['16'] = "Pokaֵ¼ rzeczywistִ… produkcjִ™ zboֵ¼a na liֵ›cie osad";
t['RBTT'] = "Tabela surowcֳ³w";
t['39'] = "Pokaֵ¼ 'Tabelִ™ surowcֳ³w'";
t['40'] = "Pokaֵ¼ 'Tabelִ™ surowcֳ³w' jako 'pֵ‚ywajִ…ce' okno";
t['21'] = "Pokaֵ¼ 'Zakֵ‚adki' jako 'pֵ‚ywajִ…ce' okno";
t['23'] = "Pokaֵ¼ 'Notatnik' jako 'pֵ‚ywajִ…ce' okno";
t['17'] = "Pokaֵ¼ liczbִ™ ludnosci na liֵ›cie osad";
t['29'] = 'Jakiego analizatora map chcesz uֵ¼ywaִ‡';
t['30'] = 'Pokaֵ¼ odwoֵ‚ania do mapy dla graczy';
t['31'] = ' Pokaֵ¼ odwoֵ‚ania do mapy dla sojuszy';
t['63'] = 'Pokaz rozszerzone Raporty Bitewne TB3';
t['3'] = 'Wymuֵ› obliczanie liczby Legionistֳ³w i Falang wg. wersji T3.1<br>(dla mieszanych serwerֳ³w T3.1 & T3.5 ג€“ zwykle tylko serwery .de)';
t['18'] = "Pokaֵ¼ dodatkowִ… (2-kolumnowִ…) listִ™ osad jako 'pֵ‚ywajִ…ce okno'";
t['60'] = 'Pokaֵ¼ ikonkִ™ pozwalajִ…cִ… otwieraִ‡ wiadomoֵ›ci/raporty<br>w osobnym okienku (pop-up)';
t['42'] = 'Sortowanie budynkֳ³w wg. nazwy w tabeli rozbudowy osady';
t['46'] = "Wyֵ›wietl dodatkowe informacje dla kaֵ¼dego przybywajִ…cego handlarza";
t['47'] = "Pokaֵ¼ ostatni transport na rynku"; t['51'] = "Pokaֵ¼ ostatni atak";
t['52'] = "Pokaֵ¼/uֵ¼yj wspֳ³ֵ‚rzִ™dnych ostatniego ataku";
t['55'] = "Automatycznie uֵ¼yj dostִ™pnych jednostek w wewnִ™trznym symulatorze bitwy";
t['57'] = "Pokaֵ¼ odlegֵ‚oֵ›ci i czasy dojֵ›cia jednostek";
t['61'] = "Pokaֵ¼ tabelִ™ 'Usuֵ„ wszystko' na stronie z raportami";
//3.8.7.5
t['RESIDUE'] = "Pozostaֵ‚e surowce (jeֵ›li wybudujesz)";
t['RESOURCES'] = "Surowce";
//3.8.7.6.3
t['SH1'] = "Otwֳ³rz swֳ³j profil w celu automatycznego rozpoznania stolicy<br>Wybuduj koszary w celu rozpoznania nacji i przejdֵ÷ do centrum osady";
t['RESEND'] = "Wysֵ‚aִ‡ ponownie?";
//3.8.8.8.9
t['WSI'] = "Symulator bitwy wbudowany w grִ™";
t['TTT'] = "Ogֳ³lne podpowiedzi n.t. jednostek/odlegֵ‚oֵ›ci";
break;
case "ba":
case "hr"://by Nemanja
//avRace = ['Rimljani', 'Teutonci', 'Gali'];
t['8'] = 'Alijansa';
t['SIM'] = 'Simulator borbe';
t['QSURE'] = 'Da li ste sigurni?';
t['LOSS'] = 'Gubitak';
t['PROFIT'] = 'Profit';
t['EXTAV'] = 'Dostupna ekstenzija';
t['PLAYER'] = 'Igraִ�';
t['VILLAGE'] = 'Selo';
t['POPULATION'] = 'Populacija';
t['COORDS'] = 'Koordinate';
t['MAPTBACTS'] = 'Akcije';
t['SAVED'] = 'Saִ�uvano';
t['YOUNEED'] = 'Potrebno';
t['TODAY'] = 'danas';
t['TOMORROW'] = 'sutra';
t['DAYAFTERTOM'] = 'prekosutra';
t['MARKET'] = 'Pijaca';
t['BARRACKS'] = 'Kasarna';
t['RAP'] = 'Mjesto okupljanja';
t['STABLE'] = 'ֵ tala';
t['WORKSHOP'] = 'Radionica';
t['SENDRES'] = 'Slanje resursa';
t['BUY'] = 'Kupovina';
t['SELL'] = 'Prodaja';
t['SENDIGM'] = 'Poֵ¡alji poruku';
t['LISTO'] = 'Dostupno';
t['ON'] = 'za';
t['AT'] = 'u';
t['EFICIENCIA'] = 'Uִ�inkovitost';
t['NEVER'] = 'Nikad';
t['PC'] = 'Kulturalni poeni';
t['ALDEAS'] = 'Sela';
t['TIEMPO'] = 'Vrijemo';
t['OFREZCO'] = 'Nudi';
t['BUSCO'] = 'Traֵ¾i';
t['TIPO'] = 'Tip';
t['DISPONIBLE'] = 'Dostupno samo';
t['CUALQUIERA'] = 'Svejedno';
t['YES'] = 'Da';
t['NO'] = 'Ne';
t['LOGIN'] = 'Prijava';
t['MARCADORES'] = 'Oznake';
t['ANYADIR'] = 'Dodaj';
t['UBU'] = 'Dodaj adresu u Oznake';
t['UBT'] = 'Dodaj tekst u Oznake';
t['DEL'] = 'Obriֵ¡i';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Maksimalno vrijeme';
t['ARCHIVE'] = 'Arhiva';
t['SUMMARY'] = 'Rezime';
t['TROPAS'] = 'Vojska';
t['CHKSCRV'] = 'Update';
t['ACTUALIZAR'] = 'Aֵ¾uriraj podatke o selu';
t['VENTAS'] = 'Spremljenje ponude';
t['MAPSCAN'] = 'Skeniraj mapu';
t['BIC'] = 'Prikazuj proֵ¡irene ikone';
t['22'] = 'Prikaֵ¾i notes';
t['SAVE'] = 'Spremi';
t['49'] = 'Standardna akcija za<br>mjesto okupljanja';
t['AT2'] = 'Pojaִ�anje';
t['AT3'] = 'Napad: normalan';
t['AT4'] = 'Napad: pljaִ�ka';
t['24'] = 'Veliִ�ina notesa';
t['NBSA'] = 'Automatski';
t['NBSN'] = 'Normalno (malo)';
t['NBSB'] = 'Veliki ekran (veliko)';
t['25'] = 'Visina notesa';
t['NBHAX'] = 'Automatsko proֵ¡irenje visine';
t['NBHK'] = 'Standardna visina';
t['43'] = 'Prikaֵ¾i centralne brojeve';
t['NPCSAVETIME'] = 'Spremi: ';
t['38'] = 'Prikazuj boje nivoa resursa';
t['44'] = 'Prikazuj boje nivoa graִ‘evine';
t['65'] = 'Boja dostupne nadogradnje<br>(Zadano = prazno)';
t['66'] = 'Boja maksimalnog nivoa<br>(Zadano = prazno)';
t['67'] = 'Boja nemoguִ‡e nadogradnje<br>(Zadano = prazno)';
t['68'] = 'Boja nadogradnje pomoִ‡u NPC-a<br>(Zadano = prazno)';
t['TOTALTROOPS'] = 'Ukupna vojska sela';
t['20'] = 'Prikaֵ¾i Oznake';
t['U.2'] = 'Pleme';
t['1'] = 'Travian v2.x server';
t['SELECTALLTROOPS'] = 'Izaberi sve vojnike';
t['PARTY'] = 'Zabave';
t['CPPERDAY'] = 'KP/dnevno';
t['SLOT'] = 'Slot';
t['TOTAL'] = 'Ukupno';
t['SELECTSCOUT'] = 'Izaberi izviִ‘aִ�a';
t['SELECTFAKE'] = 'Izaberi laֵ¾njak';
t['NOSCOUT2FAKE'] = 'Nije moguִ‡e koristiti izviִ‘aִ�e za laֵ¾ni napad!';
t['NOTROOP2FAKE'] = 'Nema jedinica za laֵ¾ni napad!';
t['NOTROOP2SCOUT'] = 'Nema jedinica za izviִ‘anje!';
t['NOTROOPS'] = 'Nema jedinica u selu!';
t['ALL'] = 'Sve';
t['SH2'] = 'U polja boje moֵ¾eֵ¡ unijeti:<br>- green ili red ili  orange, itd.<br>- HEX (heksadecimalni) kod boje poput #004523<br>- ostaviti prazno za standardnu boju';
t['SOREP'] = 'Prikaֵ¾i originalni izvjeֵ¡taj (za postanje)';
t['56'] = 'Prikazuj podatke o tipu/oazi ִ‡elije pri prelazu miֵ¡a preko mape';
t['10'] = 'Simulator borbe koji se koristi: (izbornik lijevo)';
t['WSIMO1'] = 'Interni (iz igre)';
t['WSIMO2'] = 'Eksterni (kirilloid.ru)';
t['27'] = 'Analizator svijeta koji se koristi';
t['28'] = 'Prikaֵ¾i statistiִ�ke linkove analizatora';
t['NONEWVER'] = 'Imate posljednju dostupnu verziju';
t['BVER'] = 'Moguִ‡e da imate beta verziju';
t['NVERAV'] = 'Dostupna je nova verzija skripte';
t['UPDSCR'] = 'Nadograditi odmah?';
t['CHECKUPDATE'] = 'Provjera nadogradnje skripte.<br>Molimo saִ�ekajte...';
t['CROPFINDER'] = 'Crop finder';
t['AVPPV'] = 'Prosjeִ�no populacije po selu';
t['AVPPP'] = 'Prosjeִ�no populacije po igraִ�u';
t['37'] = 'Prikazuj tablicu nadogradnje za polja resursa';
t['41'] = 'Prikazuj tablicu nadogradnje za infrastrukturu';
t['69'] = 'Nivo zapisa konzole<br>ONLY FOR PROGRAMMERS(Zadano = 0)';
t['48'] = 'Proj preuִ�itanih stranica ponude<br>dok ste na stranici za kupovinu => na Pijaci<br>(Zadano = 1)';
t['U.3'] = 'Naziv glavnog grada<br>Za aֵ¾uriranje posjetite vaֵ¡ profil';
t['U.6'] = 'Koordinate vaֵ¡eg glavnog grada<br>Za aֵ¾uriranje posjetite vaֵ¡ profil';
t['MAX'] = 'Maksimalno';
t['TOTTRTR'] = 'Ukupno obuִ�avane vojske';
t['57'] = 'Prikazuj udaljenosti i vremena';
t['TB3SL'] = TB3O.shN + ' Podeֵ¡avanje';
t['UPDALLV'] = 'Aֵ¾uriraj sva sela. KORISTITI OPREZNO JER MOֵ½E DOVESTI DO SUSPENZIJE NALOGA!';
t['9'] = 'Prikazuj dodatne linkove u lijevom<br>izborniku<br>(Traviantoolbox, World Analyser, Travilog, Map, itd.)';
t['LARGEMAP'] = 'Velika mapa';
t['USETHEMPR'] = 'Koristi ih (proporcionalno)';
t['USETHEMEQ'] = 'Koristi ih (jednako)';
t['TOWNHALL'] = 'Opֵ¡tina';
t['ACCINFO'] = 'Informacije o nalogu';
t['NBO'] = 'Notes';
t['MNUL'] = 'Izbornik s lijeve strane';
t['STAT'] = 'Statistika';
t['RESF'] = 'Polja resursa';
t['VLC'] = 'Centar sela';
t['MAPO'] = 'Opcije mape';
t['COLO'] = 'Opcije boje';
t['DBGO'] = 'Debug opcije';
t['4'] = 'Pijaca';
t['5'] = 'Vojska Mjesto okupljanja/Kasarna/Radionica/ֵ tala';
t['6'] = 'Opֵ¡tina/Herojska vila/Kovaִ�nica oklopa/Kovaִ�nica oruֵ¾ja';
t['HEROSMANSION'] = 'Herojska vila';
t['BLACKSMITH'] = 'Kovaִ�nica oruֵ¾ja';
t['ARMOURY'] = 'Kovaִ�nica oklopa';
t['NOW'] = 'Odmah';
t['CLOSE'] = 'Zatvori';
t['USE'] = 'Koristi';
t['USETHEM1H'] = 'Koristi ih (1 satna proizvodnja)';
t['OVERVIEW'] = 'Pregled';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Napadi';
t['NEWS'] = 'Vijesti';
t['ADDCRTPAGE'] = 'Dodaj trenutnu';
t['SCRPURL'] = 'TBeyond';
t['50'] = 'Broj izviִ‘aִ�a za "Izaberi izviִ‘aִ�a" funkciju';
t['SPACER'] = 'Spacer';
t['53'] = 'Prikazuj informacije o vojsci na napomenama';
t['MEREO'] = 'Poruke & Izvjeֵ¡taji';
t['59'] = 'Broj unaprijed uִ�itanih<br>poruka/izvjeֵ¡taja<br>(Zadano = 1)';
t['ATTABLES'] = 'Vojne tabele';
t['MTW'] = 'ֵ kart';
t['MTX'] = 'Premaֵ¡uje';
t['MTC'] = 'Trenutni tovar';
t['ALFL'] = 'Link na eksterni forum<br>(Ostaviti prazno za interni forum)';
t['82.L'] = 'Zakljuִ�aj Oznake (Sakrij ikone za brisanje i pomjeranje)';
t['MTCL'] = 'Poniֵ¡ti sve';
t['82.U'] = 'Otkljuִ�aj Oznake (Prikaֵ¾i ikone za brisanje i pomjeranje)';
t['CKSORT'] = 'Klikni da sortiraֵ¡';
t['MIN'] = 'Min';
t['SVGL'] = 'Djeljeno meִ‘u selima';
t['VGL'] = 'Lista sela';
t['12'] = "Prikazuj 'dorf1.php' i 'dorf2.php' linkove";
t['UPDATEPOP'] = 'Aֵ¾uriraj populaciju';
t['54'] = 'Prikazuj udaljenosti i vremena<br>do sela u napomenama';
t['EDIT'] = 'Uredi';
t['NPCO'] = 'NPC Assistant opcije';
t['26'] = 'Prikazuj NPC Assistant kalkulacije/linkove';
t['58'] = 'Prikaֵ¾i tabelu igraִ�a/sela/oaza';
t['NEWVILLAGEAV'] = 'Datum/Vrijeme';
t['TIMEUNTIL'] = 'Vrijeme za saִ�ekajte';
t['61'] = 'Prikaֵ¾i "Izbriֵ¡i sve" u izvjeֵ¡tajima';
t['62'] = 'Prikaֵ¾i "Poֵ¡alji IGM" ikonu i za mene';
t['CENTERMAP'] = 'Centriraj kartu na ovo selo';
t['13'] = 'Prikaֵ¾i "Centriraj kartu na ovo selo" ikonu';
t['SENDTROOPS'] = 'Poֵ¡alji vojsku';
t['64'] = 'Prikaֵ¾i detalje u izvjeֵ¡tajima';
t['7'] = "Dvorac/Rezidencija/Akademija/Zgrada za blago";
t['PALACE'] = "Dvorac";
t['RESIDENCE'] = "Rezidencija";
t['ACADEMY'] = "Akademija";
t['TREASURY'] = "Zgrada za blago";
t['60'] = 'Prikazuj linkove na otvorene<br>poruke u pop-upu';
break;
case "ir"://by mohammad6006 & Reza_na
//avRace = ['״±�ˆ�…�� �‡״§', '״×�ˆ״×�† �‡״§', '�¯�ˆ�„ �‡״§'];
t['1'] = "״×״±״§�ˆ��״§�† �†״³״®�‡*.2";
t['2'] = '�¾״§�© �©״±״¯�† ״×״¨�„��״÷״§״×';
t['3'] = '�…״¬״¨�ˆ״± �©״±״¯�† ״¨״±״¢�ˆ״±״¯ �¯�†״¬״§��״´ T3.1 ״³״±״¨״§״² �„�˜���ˆ�† �ˆ ״³״±״¨״§״² �¾��״§״¯�‡(״×�ˆ״§�…״§ ״¨״±״§�� ״®״¯�…״§״× ״±״³״§�† �‡״§�� T3.1 �ˆ T3.5)';
t['4'] = '״¨״§״²״§״±';
t['5'] = '״§״±״¯�ˆ�¯״§�‡/״³״±״¨״§״²״®״§�†�‡/�©״§״±�¯״§�‡/״§״µ״·״¨�„';
t['6'] = "״×״§�„״§״± ״´�‡״±/״§�…״§״±״× �‚�‡״±�…״§�†/״²״±�‡ ״³״§״²��/״§״³�„״­�‡ ״³״§״²��";
t['7'] = "�‚״µ״±/״§�‚״§�…״×�¯״§�‡/״¯״§״±״§�„���†�ˆ�†/״®״²״§�†�‡";
t['8'] = '״§״×״­״§״¯';
t['9'] = "�†�…״§��״´ �¾���ˆ�†״¯ �‡״§�� ״§״¶״§���� ״¯״± ���‡״±״³״× ״³�…״× ״±״§״³״×<br>(״¬״¹״¨�‡ ״§״¨״²״§״± ״×״±״§�ˆ��״§�†״� ״×״­�„���„�¯״± ״¬�‡״§�†״� ״«״¨״× �¯״²״§״±״´ �†״¨״±״¯״� �†�‚״´�‡ �ˆ ״÷��״±�‡.)";
t['10'] = "�¾���ˆ�†״¯ ״¨�‡ ״´״¨���‡ ״³״§״² �†״¨״±״¯ ״¨״±״§�� ״§״³״×��״§״¯�‡:<br>(���‡״±״³״× ״³�…״× ״±״§״³״×)";
t['11'] = "�¾���ˆ�†״¯ ״¨״±״§�� ״§״³״×��״§״¯�‡ ״§״² �¾״§���¯״§�‡ �‡״§�� ״«״¨״× �¯״²״§״±״´(�†״¨״±״¯)";
t['12'] = "�†�…״§��״´ �¾���ˆ�†״¯ �‡״§�� 'dorf1.php' �ˆ 'dorf2.php'";
t['13'] = '�†�…״§��״´ ״¯�©�…�‡ "�…״±�©״² �†�‚״´�‡ ״¨״±״§�� ״§���† ״¯�‡�©״¯�‡"';
t['14'] = "�†�…״§��״´  ״¯�©�…�‡ '״§״±״³״§�„ ״³״±״¨״§״²/״§״±״³״§�„ �…�†״§״¨״¹' ״¯״± ���‡״±״³״× ״¯�‡�©״¯�‡";
t['15'] = "�†�…״§��״´ �…��״²״§�† ״×�ˆ�„��״¯ ״¯״± ״³״§״¹״× �†�ˆ״¨״� ״®״´״×״� ״¢�‡�† ״¯״± ���‡״±״³״× ״¯�‡�©״¯�‡";
t['16'] = "�†�…״§��״´ ״×�ˆ�„��״¯ �…״₪״«״± �¯�†״¯�… ״¯״± ���‡״±״³״× ״¯�‡�©״¯�‡";
t['17'] = "�†�…״§��״´ ״¬�…״¹��״× ״¯״± ���‡״±״³״× ״¯�‡�©״¯�‡";
t['18'] = '�†�…״§��״´ ���‡״±״³״× ״¯�‡�©״¯�‡ ״§״¶״§���� (2 ״³״×�ˆ�†) ״¨�‡ ״µ�ˆ״±״× ״´�†״§�ˆ״±';
t['19'] = '�†�…״§��״´ ״§״·�„״§״¹״§״× ״¯״±״¨״§״±�‡ ״³״§״®״×�…״§�† �‡״§�� ״¯״± ״­״§�„ �¯״³״×״±״´ �ˆ ״³״±״¨״§״²״§�† ״¯״± ״­״±�©״×<br>״¯״± ���‡״±״³״× ״¯�‡�©״¯�‡';
t['20'] = '�†״´״§�†״¯״§״¯�† ״¨״±�†״³״¨ �‡״§';
t['21'] = "�†�…״§��״´ '״¨״±�†״³״¨ �‡״§�� �©״§״±״¨״±' ״¨�‡ ״µ�ˆ״±״× �¾�†״¬״±�‡ ״´�†״§�ˆ״±";
t['22'] = '�†�…״§��״´ ״¯��״×״±�†�‡ ��״§״¯״¯״§״´״×';
t['23'] = "�†�…״§��״´ '״¯��״×״±�†�‡ ��״§״¯״¯״§״´״×' ״¨�‡ ״µ�ˆ״±״× ״´�†״§�ˆ״±";
t['24'] = '״§�†״¯״§״²�‡ ״¯��״×״±�†�‡ ��״§״¯״¯״§״´״×';
t['25'] = '״§״±״×��״§״¹ ״¯��״×״±�†�‡ ��״§״¯״¯״§״´״×';
t['26'] = '�†�…״§��״´ �…״­״§״³״¨״§״× �ˆ �¾���ˆ�†״¯ ״¨�‡ ״¯״³״×��״§״± ״×״¹״¯���„ �…�†״§״¨״¹';
t['27'] = "״×״­�„���„�¯״± ״¬�‡״§�† ״¨״±״§�� ״§״³״×��״§״¯�‡";
t['28'] = "�†�…״§��״´ �¾���ˆ�†״¯ ״×״­�„���„�¯״± ״¢�…״§״±��";
t['29'] = '״×״­�„���„�¯״± �†�‚״´�‡ ״¨״±״§�� ״§״³״×��״§״¯�‡';
t['30'] = '�†�…״§��״´ �¾���ˆ�†״¯ ״¨�‡ �†�‚״´�‡ ״¨״±״§�� �©״§״±״¨״±״§�†';
t['31'] = '�†�…״§��״´ �¾���ˆ�†״¯ ״¨�‡ �†�‚״´�‡ ״¨״±״§�� ״§״×״­״§״¯ �‡״§ ';
t['32'] = "�†�…״§��״´ '�†�ˆ״§״± ״¬״³״×״¬�ˆ'";
t['33'] = "�†�…״§��״´ '�†�ˆ״§״± ״¬״³״×״¬�ˆ' ״¨�‡ ״µ�ˆ״±״× �¾�†״¬״±�‡ ״´�†״§�ˆ״±";
t['34'] = "�†�…״§��״´ ״§״·�„״§״¹״§״× '״§�…״×��״§״² ��״±�‡�†�¯�� ״¯״± ״±�ˆ״²' ״¯״± ״¬״¯�ˆ�„ �¯״³״×״±״´ �…�†״§״¨״¹ �ˆ ״³״§״®״×�…״§�† �‡״§";
t['35'] = "�†�…״§��״´ �…��״²״§�† �…״µ״±�� �¯�†״¯�… ״¯״± ״¬״¯�ˆ�„ �¯״³״×״±״´";
t['36'] = "�†�…״§��״´ �…״­״§״³״¨״§״× '״³�¾״³/�¾״³ �…״§�†״¯�‡' ״¯״± ״¬״¯�ˆ�„ �‡״§�� ״×״¹�„���…/״§״±״×�‚״§״¡";
t['37'] = "�†�…״§��״´ ״¬״¯�ˆ�„ �¯״³״×״±״´ �…�†״§״¨״¹";
t['38'] = '�†״´״§�†״¯״§״¯�† ״±�†�¯ �‡״§�� ״³״·״­ �…�†״§״¨״¹';
t['39'] = "�†�…״§��״´ ״¬״¯�ˆ�„ '�†�ˆ״§״± �…�†״§״¨״¹'";
t['40'] = "�†�…״§��״´ ״¬״¯�ˆ�„ '�†�ˆ״§״± �…�†״§״¨״¹' ״¨�‡ ״µ�ˆ״±״× �¾�†״¬״±�‡ ״´�†״§�ˆ״±";
t['41'] = "�†�…״§��״´ ״¬״¯�ˆ�„ �¯״³״×״±״´ ״³״§״®״×�…״§�† �‡״§";
t['42'] = '�…״±״×״¨״³״§״²�� ״³״§״®״×�…״§�† �‡״§ ״¨״± ״§״³״§״³ �†״§�… ״¯״± ״¬״¯�ˆ�„ �¯״³״×״±״´';
t['43'] = '�†״´״§�† ״¯״§״¯�† ״´�…״§״±�‡ �‡״§�� �…״±�©״²��';
t['44'] = '�†״´״§�† ״¯״§״¯�† ״±�†�¯ �‡״§�� ״³״·״­ ״³״§״®״×�…״§�† �‡״§';
t['45'] = "�†�…״§��״´ ״³״·״­ ״³״§״®״×�…״§�† �ˆ �…�†״§״¨״¹ ״¨�‡ ״µ�ˆ״±״× �†״´�…�©״²�† ״¨״±״§�� ״³״§״®״×�…״§�† �‡״§ ��״§ �…�†״§״¨״¹ ״¯״± ״­״§�„ ״§״±״×�‚״§״¡";
t['46'] = "�†�…״§��״´ ״§״·�„״§״¹״§״× ״§״¶״§���� ״¨״±״§�� �‡״± ״¨״§״²״±�¯״§�† ״¯״± ״­״±�©״×";
t['47'] = "�†״´״§�†״¯״§״¯�† ״¢״®״±���† ״×״¨״§״¯�„ ״¨״§״²״§״±";
t['48'] = "״×״¹״¯״§״¯ ״µ��״­״§״× �¾��״´�†�‡״§״¯ ״¨״±״§�� �¾��״´ ״¨״§״±�¯״°״§״±��<br>�©�‡ ״¯״± ״µ��״­�‡ '״¨״§״²״§״± => ״®״±��״¯' �ˆ״¬�ˆ״¯ ״¯״§״±״¯<br>(�¾��״´��״±״¶ = 1)";
t['49'] = '״¹�…�„�©״±״¯ �¾��״´��״±״¶ ״§״±״¯�ˆ�¯״§�‡';
t['50'] = '״×״¹״¯״§״¯ �…״§�…�ˆ״±״§�† ״´�†״§״³״§���� ״¨״±״§��<br>״×״§״¨״¹ "״§�†״×״®״§״¨ �…״§�…�ˆ״± ״´�†״§״³״§����"';
t['51'] = "�†�…״§��״´ ״¢״®״±���† ״­�…�„�‡";
t['52'] = "�†״´״§�†״¯״§״¯�†/״§״³״×��״§״¯�‡ �…״®״×״µ״§״× ״¨״±״§�� ״¢״®״±���† ״­�…�„�‡";
t['53'] = '�†�…״§��״´ ״§״·�„״§״¹״§״× �„״´�©״±��״§�† ״¯״± ״×�ˆ״¶��״­״§״× ���© ״®״·�� (tooltip)';
t['54'] = '�†�…״§��״´ ��״§״µ�„�‡ �ˆ ״²�…״§�† ״±״³��״¯�† ״¨�‡ ״¯�‡�©״¯�‡ ״¯״± ״×�ˆ״¶��״­״§״× ���© ״®״·�� (tooltip)';
t['55'] = "�¾״± �©״±״¯�† ״®�ˆ״¯�©״§״± ״´״¨���‡ ״³״§״² �†״¨״±״¯ ״¯״§״®�„�� ״¨״§ �„״´�©״±��״§�† �…�ˆ״¬�ˆ״¯";
t['56'] = "�ˆ�‚״×�� �©�‡ �…�ˆ״³ ״±�ˆ�� �†�‚״´�‡ ״§״³״×<br>״§״·�„״§״¹״§״× �†�ˆ״¹ ״³״±״²�…���† ��״§ ״¯�‡�©״¯�‡ �†�…״§��״´ ״¯״§״¯�‡ ״´�ˆ״¯";
t['57'] = '�†�…״§��״´ ��״§״µ�„�‡ �ˆ ״²�…״§�†';
t['58'] = '�†�…״§��״´ ״¬״¯�ˆ�„�� ״¨״§״²���©�† �‡״§/״¯�‡�©״¯�‡ �‡״§/״³״±״²�…���† �‡״§�� ״×״µ״±�� ״´״¯�‡';
t['59'] = '״×״¹״¯״§״¯ �¾��״÷״§�… �‡״§ ��״§ �¯״²״§״±״´״§״× ״¨״±״§�� �¾��״´ ״¨״§״± �¯״²״§״±��<br>(�¾��״´��״±״¶ = 1)';
t['60'] = '�†�…״§��״´ �¾���ˆ�†״¯ ״¨״±״§�� ״¨״§״² �©״±״¯�† �¾��״÷״§�… �‡״§/�¯״²״§״±״´ �‡״§ ״¯״± �¾�†״¬״±�‡ ״­״¨״§״¨��';
t['61'] = "�†�…״§��״´ ״¬״¯�ˆ�„ '״­״°�� �‡�…�‡' ״¯״± ״µ��״­�‡ �¯״²״§״±״´״§״×";
t['62'] = '�†״´״§�† ״¯״§״¯�† ״¯�©�…�‡ ״§״±״³״§�„ �¾��״§�… ״®״µ�ˆ״µ�� ״¨״±״§�� �…�†';
t['63'] = '�†�…״§��״´ ״×״³�‡���„״§״× �¯״²״§״±״´ �†״¨״±״¯ ��״±״§״×״±״§�ˆ��״§�† 3 (TB3)';
t['64'] = '�†�…״§��״´ ״¬״²״¦��״§״× ״¯״± �¯״²״§״±״´״§״× ״¢�…״§״±��';
t['65'] = '״±�†�¯ �‚״§״¨�„ �¯״³״×״±״´<br>(�¾��״´��״±״¶ = ״®״§�„��)';
t['66'] = '״±�†�¯ ״­״¯״§�©״«״± ״³״·״­<br>(�¾��״´��״±״¶ = ״®״§�„��)';
t['67'] = '״±�†�¯ ״¹״¯�… ״§�…�©״§�† �¯״³״×״±״´<br>(�¾��״´��״±״¶ = ״®״§�„��)';
t['68'] = '״±�†�¯ ״§�…�©״§�† �¯״³״×״±״´ ״¨״§ ״×״¹״¯���„ �…�†״§״¨״¹<br>(�¾��״´��״±״¶ = ״®״§�„��)';
t['69'] = "Console Log Level<br>���‚״· ״¨״±״§�� ״¨״±�†״§�…�‡ �†�ˆ��״³ �‡״§ �ˆ ״®״·״§��״§״¨��<br>(�¾��״´��״±״¶ = 0)";
t['82.L'] = '�‚���„ ״¨״±�†״³״¨ �‡״§ (�¾�†�‡״§�† ״³״§״²�� ״¯�©�…�‡ �‡״§�� ״­״°��״� ״§�†״×�‚״§�„ ״¨�‡ ״¨״§�„״§״� ״§�†״×�‚״§�„ ״¨�‡ �¾״§�����†)';
t['82.U'] = '״¨״§״² �©״±״¯�† �‚���„ ״¨״±�†״³״¨ �‡״§ (�†״´״§�†״¯״§״¯�† ״¯�©�…�‡ ״­״°��״� ״§�†״×�‚״§�„ ״¨�‡ ״¨״§�„״§״� ״§�†״×�‚״§�„ ״¨�‡ �¾״§�����†)';
t['85'] = "�†״´״§�†״¯״§״¯�† ״´�…״§���„ '״§״±״³״§�„ �„״´�©״±��״§�†/״§״±״³״§�„ �…�†״§״¨״¹'";
t['87'] = "״¨�‡ ��״§״¯ ״¯״§״´״×�† ״¢״®״±���† �¯״²���†�‡ �‡״§�� '1/2/3 ״¨״±״§״¨״±' ״§״±״³״§�„ ״¨״§״²״§״± (״¯״± ״µ�ˆ״±״× �…�ˆ״¬�ˆ״¯��״×)";
t['U.2'] = '�†�˜״§״¯';
t['U.3'] = '�†״§�… �¾״§��״×״®״× ״´�…״§ <br>״¨״±״§�� ״¨״±�ˆ״² ״±״³״§�†�� ״¨�‡ �¾״±�ˆ��״§���„ ״®�ˆ״¯ ״¨״±�ˆ��״¯';
t['U.6'] = '�…�ˆ�‚״¹��״× �¾״§��״×״®״× ״´�…״§<br>״¨״±״§�� ״¨�‡ ״±�ˆ״² ״±״³״§�†�� ״¨�‡ �¾״±�ˆ��״§���„ ״®�ˆ״¯ ״¨״±�ˆ��״¯';
t['SIM'] = '״´״¨���‡ ״³״§״² �†״¨״±״¯';
t['QSURE'] = '״¢��״§ �…״·�…״¦�† �‡״³״×��״¯״�';
t['LOSS'] = '״²��״§�†';
t['PROFIT'] = '״³�ˆ״¯';
t['EXTAV'] = '�‚״§״¨�„ ״×�ˆ״³״¹�‡';
t['PLAYER'] = '״¨״§״²���©�†';
t['VILLAGE'] = '״¯�‡�©״¯�‡';
t['POPULATION'] = '״¬�…״¹��״×';
t['COORDS'] = '�…�ˆ�‚״¹��״×';
t['MAPTBACTS'] = '״§�‚״¯״§�…״§״×';
t['SAVED'] = '״°״®��״±�‡ ״´״¯';
t['YOUNEED'] = '�…�ˆ״±״¯ �†��״§״²';
t['TODAY'] = '״§�…״±�ˆ״²';
t['TOMORROW'] = '��״±״¯״§';
t['DAYAFTERTOM'] = '�¾״³ ��״±״¯״§';
t['MARKET'] = '״¨״§״²״§״±';
t['BARRACKS'] = '״³״±״¨״§״²״®״§�†�‡';
t['RAP'] = '״§״±״¯�ˆ�¯״§�‡';
t['STABLE'] = '״§״µ״·״¨�„';
t['WORKSHOP'] = '�©״§״±�¯״§�‡';
t['SENDRES'] = '״§״±״³״§�„ �…�†״§״¨״¹';
t['BUY'] = '״®״±��״¯';
t['SELL'] = '��״±�ˆ״´';
t['SENDIGM'] = '״§״±״³״§�„ �¾��״§�… ״®״µ�ˆ״µ��';
t['LISTO'] = '״¯״± ״¯״³״×״±״³';
t['ON'] = '״¯״±';
t['AT'] = '״¯״±';
t['EFICIENCIA'] = '״¨״§״²״¯�‡��';
t['NEVER'] = '�‡״±�¯״²';
t['ALDEAS'] = '״¯�‡�©״¯�‡(�‡״§)';
t['TIEMPO'] = '״²�…״§�†';
t['OFREZCO'] = '�¯״°״§״´״×�† �¾��״´�†�‡״§״¯';
t['BUSCO'] = '״¬״³״×״¬�ˆ';
t['TIPO'] = '�†�ˆ״¹';
t['DISPONIBLE'] = '���‚״· ״¯״± ״¯״³״×״±״³';
t['CUALQUIERA'] = '�‡�…�‡';
t['YES'] = '״¨�„�‡';
t['NO'] = '״®��״±';
t['LOGIN'] = '�ˆ״±�ˆ״¯';
t['MARCADORES'] = '״¨״±�†״³״¨ �‡״§';
t['ANYADIR'] = '״§״¶״§���‡ �©״±״¯�†';
t['UBU'] = '�†״´״§�†�� ״¨״±�†״³״¨ ״¬״¯��״¯';
t['UBT'] = '�…״×�† ״¨״±�†״³״¨ ״¬״¯��״¯';
t['DEL'] = '�¾״§�© �©״±״¯�†';
t['MAPA'] = '�†�‚״´�‡';
t['MAXTIME'] = '״­״¯״§�©״«״± ״²�…״§�†';
t['ARCHIVE'] = '״¨״§���¯״§�†��';
t['SUMMARY'] = '״®�„״§״µ�‡';
t['TROPAS'] = '�„״´�©״±��״§�†';
t['CHKSCRV'] = '״¨״±�ˆ״² ״±״³״§�†�� TBeyond';
t['ACTUALIZAR'] = '״¨״±�ˆ״² ״±״³״§�†�� ״§״·�„״§״¹״§״× ״¯�‡�©״¯�‡';
t['VENTAS'] = '�¾��״´�†�‡״§״¯ �‡״§�� ״°״®��״±�‡ ״´״¯�‡';
t['MAPSCAN'] = '�¾�ˆ��״´ �©״±״¯�† �†�‚״´�‡';
t['BIC'] = '�†�…״§��״´ ״´�…״§���„ �‡״§�� (icon) ״±�…״² ״´״¯�‡';
t['SAVE'] = '״°״®��״±�‡';
t['AT2'] = '�†��״±�ˆ�� �©�…�©��';
t['AT3'] = '״­�…�„�‡: ״¹״§״¯��';
t['AT4'] = '״­�…�„�‡: ״÷״§״±״×';
t['NBSA'] = '״®�ˆ״¯�©״§״±';
t['NBSN'] = '״¹״§״¯�� (�©�ˆ�†�©)';
t['NBSB'] = '״µ��״­�‡ ״¨״²״±�¯ (״¨״²״±�¯)';
t['NBHAX'] = '�¯״³״×״±״´ ״®�ˆ״¯�©״§״± ״§״±״×��״§״¹';
t['NBHK'] = '״§״±״×��״§״¹ �¾��״´��״±״¶';
t['NPCSAVETIME'] = '״°״®��״±�‡: ';
t['TOTALTROOPS'] = '�„״´�©״±��״§�† �…�ˆ״¬�ˆ״¯ ״¯״± ״±�ˆ״³״×״§';
t['SELECTALLTROOPS'] = "״§�†״×״®״§״¨ ״×�…״§�… �„״´�©״±��״§�†";
t['PARTY'] = "״¬״´�† �‡״§";
t['CPPERDAY'] = "״§�…״×��״§״² ��״±�‡�†�¯�� ״¯״± ״±�ˆ״²";
t['SLOT'] = "״´�©״§��";
t['TOTAL'] = "�…״¬�…�ˆ״¹";
t['SELECTSCOUT'] = "״§�†״×״®״§״¨ �…״§�…�ˆ״± ״´�†״§״³״§����(״¬״§״³�ˆ״³)";
t['SELECTFAKE'] = "״§�†״×״®״§״¨ ״­�…�„�‡ ״¨״¯�„��";
t['NOSCOUT2FAKE'] = "״§�†״×״®״§״¨ �…״§�…�ˆ״± ״´�†״§״³״§���� ״¨״±״§�� ״­�…�„�‡ ״¨״¯�„�� ״§�…�©״§�† �¾״°��״± �†��״³״×!";
t['NOTROOP2FAKE'] = "״¨״±״§�� ״­�…�„�‡ ״¨״¯�„�� ״³״±״¨״§״²�� �…�ˆ״¬�ˆ״¯ �†��״³״×!";
t['NOTROOP2SCOUT'] = "״³״±״¨״§״²�� ״¨״±״§�� ״´�†״§״³״§���� �ˆ״¬�ˆ״¯ �†״¯״§״±״¯!";
t['NOTROOPS'] = "�„״´�©״±��״§�†�� ״¯״± ״¯�‡�©״¯�‡ �…�ˆ״¬�ˆ״¯ �†��״³״×!";
t['ALL'] = "�‡�…�‡";
t['SH2'] = "״¯״± �����„״¯ ״±�†�¯ ״´�…״§ �…�� ״×�ˆ״§�†��״¯ �ˆ״§״±״¯ �©�†��״¯:<br>- green ��״§ red ��״§  orange �ˆ ״÷��״±�‡.<br>- ״±�…״² ״±�†�¯ ״¯״± �…״¨�†״§�� 16 �…״§�†�†״¯ #004523<br>- ״¨״±״§�� �¾��״´ ��״±״¶ ״®״§�„�� ״±�‡״§ �©�†��״¯";
t['SOREP'] = "�†�…״§��״´ �¯״²״§״±״´ ״§״µ�„�� (״¨״±״§�� ״§״±״³״§�„ �¾��״÷״§�…)";
t['WSIMO1'] = "״¯״§״®�„�� (�…�‡��״§ ״´״¯�‡ ״¨�‡ �ˆ״³���„�‡ ״¨״§״²��)";
t['WSIMO2'] = "״®״§״±״¬�� (�…�‡��״§ ״´״¯�‡ ״¨�‡ �ˆ״³���„�‡ �� kirilloid.ru-״¨״§ ״§�…�©״§�†״× ״¨��״´״×״±)";
t['NONEWVER'] = "״´�…״§ ״¢״®״±���† �†״³״®�‡ �� �…�ˆ״¬�ˆ״¯ ״±״§ ״¯״± ״§״®״×��״§״± ״¯״§״±��״¯";
t['BVER'] = "�…�…�©�† ״§״³״× ״´�…״§ �†״´״®�‡ ״¢״²�…״§��״´�� ״±״§ ״¯״± ״§״®״×��״§״± ״¯״§״´״×�‡ ״¨״§״´��״¯";
t['NVERAV'] = "�†״³״®�‡ ״¬״¯��״¯ ״§״³�©״±���¾״× �…�ˆ״¬�ˆ״¯ �…�� ״¨״§״´״¯";
t['UPDSCR'] = "�‡�… ״§�©�†�ˆ�† ״¨�‡ ״±�ˆ״² ״±״³״§�†�� ״´�ˆ״¯״�";
t['CHECKUPDATE'] = "״¨״±״±״³�� ״¨״±״§�� ״¨״±�ˆ״² ״±״³״§�†��. �„״·��״§ ״µ״¨״± �©�†��״¯...";
t['CROPFINDER'] = "�©״§�ˆ״´�¯״± �¯�†״¯�…״²״§״±";
t['AVPPV'] = "�…���„�†�¯���† ״¬�…״¹����״× ״¨״±״§�� �‡״± ״¯�‡�©״¯�‡";
t['AVPPP'] = "�…��״§�†�¯���† ״¬�…״¹����״× ״¨״±״§�� �‡״± ״¨״§״²���©�†";
t['MAX'] = '״­״¯״§�©״«״±';
t['TOTTRTR'] = '�…״¬�…�ˆ״¹ ״³״±״¨״§״²״§�† ״¯״± ״­״§�„ ״×״¹�„���…';
t['TB3SL'] = '״×�†״¸���…״§״× ��״±״§״×״±״§�ˆ��״§�† ' + TB3O.shN;
t['UPDALLV'] = '״¨״±�ˆ״² ״±״³״§�†�� ״×�…״§�… ״¯�‡�©״¯�‡ �‡״§. ״¨״§ ״¯�‚״× ״²��״§״¯ ״§״² ״§���† �¯״²���†�‡ ״§״³״×��״§״¯�‡ �©�†��״¯ ״²��״±״§ �…�…�©�† ״§״³״× ״¨״§״¹״« ״×�ˆ�‚���� ״­״³״§״¨ ״´�…״§ ״´�ˆ״¯!';
t['LARGEMAP'] = '�†�‚״´�‡ ״¨״²״±�¯';
t['USETHEMPR'] = '״§״³״×��״§״¯�‡ ״§״² ״¢�†�‡״§ (״¨�‡ �†״³״¨״×)';
t['USETHEMEQ'] = '״§״³״×��״§״¯�‡ ״§״² ״¢�†�‡״§ (״¨״±״§״¨״±)';
t['TOWNHALL'] = '״×״§�„״§״± ״¯�‡�©״¯�‡';
t['GSRVT'] = '״®״¯�…״§״× ״±״³״§�† ״¨״§״²��(״³״±�ˆ״±)';
t['ACCINFO'] = '״§״·�„״§״¹״§״× ״­״³״§״¨';
t['NBO'] = '״¯��״×״±�†�‡ ��״§״¯״¯״§״´״×';
t['MNUL'] = '���‡״±״³״× ״³�…״× ״±״§״³״×';
t['STAT'] = '״¢�…״§״±';
t['RESF'] = '�…�†״§״¨״¹';
t['VLC'] = '�…״±�©״² ״¯�‡�©״¯�‡';
t['MAPO'] = '״×�†״¸���…״§״× �†�‚״´�‡';
t['COLO'] = '״×�†״¸���…״§״× ״±�†�¯';
t['DBGO'] = '״×�†״¸���…״§״× ״®״·״§ ��״§״¨��';
t['HEROSMANSION'] = "״§�…״§״±״× �‚�‡״±�…״§�†";
t['BLACKSMITH'] = '״§״³�„״­�‡ ״³״§״²��';
t['ARMOURY'] = '״²״±�‡ ״³״§״²��';
t['NOW'] = '״§�©�†�ˆ�†';
t['CLOSE'] = '״¨״³״×�†';
t['USE'] = '״§״³״×��״§״¯�‡';
t['USETHEM1H'] = '״§״³״×��״§״¯�‡ ״§״² ״¢�†�‡״§ ( ״×�ˆ�„��״¯ 1 ״³״§״¹״×)';
t['OVERVIEW'] = '״¯��״¯ �©�„��';
t['FORUM'] = '״×״§�„״§״± �¯��״×�…״§�†';
t['ATTACKS'] = '״­�…�„״§״×';
t['NEWS'] = '״§״®״¨״§״±';
t['ADDCRTPAGE'] = '״§״¶״§���‡ �©״±״¯�† �‡�…���† ״µ��״­�‡ ״¨�‡ ״¨״±�†״³״¨ �‡״§';
t['SCRPURL'] = '״µ��״­�‡ TBeyond';
t['SPACER'] = '��״¶״§״³״§״² (��״§״µ�„�‡ ״¨�†״¯��)';
t['MEREO'] = '�¾��״÷״§�… �‡״§ �ˆ �¯״²״§״±״´״§״×';
t['ATTABLES'] = '״¬״¯״§�ˆ�„ �„״´�©״±��״§�† (���‚״· ״¯״± ״­״§�„״× �¾�„״§״³)';
t['MTW'] = '״×�„�� ״´״¯�‡';
t['MTX'] = '״¨��״´ ״§״² ״­״¯';
t['MTC'] = '״¨״§״± �¯״²״§״±�� �©�†�ˆ�†��';
t['ALFL'] = '�¾���ˆ�†״¯ ״¨�‡ ״×״§�„״§״± �¯��״×�…״§�† ״®״§״±״¬��<br>(״¨״±״§�� ״×״§�„״§״± �¯��״×�…״§�† ״¯״§״®�„�� ״®״§�„�� ״±�‡״§ ״´�ˆ״¯)';
t['MTCL'] = '�¾״§�© �©״±״¯�† �‡�…�‡';
t['CKSORT'] = '״¨״±״§�� �…״±״×״¨ ״³״§״²�� �©�„���© �©�†��״¯';
t['MIN'] = '״­״¯״§�‚�„';
t['SVGL'] = '״³�‡���… �©״±״¯�† (״¯״± ״¯״³״× ״±״³ �‚״±״§״± ״¯״§״¯�†) �…��״§�† ״¯�‡�©״¯�‡ �‡״§';
t['VGL'] = '���‡״±״³״× ״¯�‡�©״¯�‡ �‡״§';
t['UPDATEPOP'] = '״¨״±�ˆ״² ״±״³״§�†�� ״¬�…״¹��״×';
t['EDIT'] = '�ˆ��״±״§��״´';
t['NPCO'] = '״×�†״¸���…״§״× ״¯״³״×��״§״± ״×״¹״¯���„ �…�†״§״¨״¹';
t['NEWVILLAGEAV'] = '״±�ˆ״²/״²�…״§�†';
t['TIMEUNTIL'] = '�…״¯״× ״²�…״§�† ״§�†״×״¸״§״±';
t['CENTERMAP'] = '�…״±�©״² �†�‚״´�‡ ״¨״±״§�� ״§���† ״¯�‡�©״¯�‡';
t['SENDTROOPS'] = '״§״±״³״§�„ �„״´�©״±��״§�†';
t['PALACE'] = "�‚״µ״±";
t['RESIDENCE'] = "״§�‚״§�…״×�¯״§�‡";
t['ACADEMY'] = "״¯״§״±״§�„���†�ˆ�†";
t['TREASURY'] = "״®״²״§�†�‡";
t['UPGTB'] = "״¬״¯�ˆ�„ �¯״³״×״±״´ �…�†״§״¨״¹ �ˆ ״³״§״®״×�…״§�† �‡״§";
t['RBTT'] = "�†�ˆ״§״± �…�†״§״¨״¹";
t['RESIDUE'] = '�¾״³ �…״§�†״¯�‡ ״§�¯״± ״´�…״§ ״¢�† ״±״§ ״¨״³״§״²��״¯ ';
t['RESOURCES'] = '�…�†״§״¨״¹';
t['SH1'] = "״¨״§״² �©״±״¯�† �¾״±��״§���„ ״´�…״§ ״¨״±״§�� ״¨״§״²��״§״¨�� ״®�ˆ״¯�©״§״± �¾״§��״×״®״×/�…״®״×״µ״§״×<br>״¨״±״§�� �†�…״§��״§�† ״³״§״²�� ״®�ˆ״¯�©״§״± �†�˜״§״¯ ״³״±״¨״§״²״®״§�†�‡ ״¨״³״§״²��״¯ �ˆ ״³�¾״³ �…״±�©״² ״¯�‡�©״¯�‡ ״±״§ ״¨״§״² �©�†��״¯";
t['RESEND'] = "״§״±״³״§�„ ״¯�ˆ״¨״§״±�‡״�";
t['WSI'] = "״´״¨���‡ ״³״§״² �†״¨״±״¯ �…״­��״§ ״´״¯�‡ ״¨�‡ �ˆ״³���„�‡ ״¨״§״²��";
t['TTT'] = "״×�†״¸���…״§״× ״¹�…�ˆ�…�� ״×�ˆ״¶��״­ ״®״·�� �„״´�©״±��״§�†/�…״µ״§��״×";
break;
case "dk"://by polle1
//avRace = ['Romere', 'Germanere', 'Gallere'];
t['8'] = 'Alliance';
t['SIM'] = 'Kamp simulator';
t['QSURE'] = 'Er du sikker?';
t['LOSS'] = 'Tab';
t['PROFIT'] = 'Profit';
t['EXTAV'] = 'udvidelse mulig';
t['PLAYER'] = 'Spiller';
t['VILLAGE'] = 'By';
t['POPULATION'] = 'Indbygger';
t['COORDS'] = 'Koordinater';
t['MAPTBACTS'] = 'Actions';
t['SAVED'] = 'Gemt';
t['YOUNEED'] = 'Du mangler';
t['TODAY'] = 'i dag';
t['TOMORROW'] = 'i morgen';
t['DAYAFTERTOM'] = 'overmorgen';
t['MARKET'] = 'Markedsplads';
t['BARRACKS'] = 'Kaserne';
t['RAP'] = 'Forsamlingsplads';
t['STABLE'] = 'Stald';
t['WORKSHOP'] = 'Vֳ¦rksted';
t['SENDRES'] = 'Send rֳ¥stoffer';
t['BUY'] = 'Kֳ¸b';
t['SELL'] = 'Sֳ¦lg';
t['SENDIGM'] = 'Send IGM';
t['LISTO'] = 'Tilgֳ¦nglig';
t['ON'] = 'on';
t['AT'] = 'at';
t['EFICIENCIA'] = 'Effektivit';
t['NEVER'] = 'Aldrig';
t['ALDEAS'] = 'By(er)';
t['TIEMPO'] = 'Tid';
t['OFREZCO'] = 'Tilbyder';
t['BUSCO'] = 'Sֳ¸ger';
t['TIPO'] = 'Type';
t['DISPONIBLE'] = 'Kun tilgֳ¦nglig';
t['CUALQUIERA'] = 'Alle';
t['YES'] = 'Ja';
t['NO'] = 'Nej';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Links';
t['ANYADIR'] = 'Tilfֳ¸j';
t['UBU'] = 'Nyt link URL';
t['UBT'] = 'Nyt link Tekst';
t['DEL'] = 'Slet';
t['MAPA'] = 'Kort';
t['MAXTIME'] = 'Maximum tid';
t['ARCHIVE'] = 'Arkive';
t['SUMMARY'] = 'Total';
t['TROPAS'] = 'Tropper';
t['CHKSCRV'] = 'Opdater TBeyond';
t['ACTUALIZAR'] = 'Opdater by information';
t['VENTAS'] = 'Gemte tilbud';
t['MAPSCAN'] = 'Skan kortet';
t['BIC'] = 'Vis udvidet ikoner';
t['22'] = 'Vis notesbog';
t['SAVE'] = 'Gem';
t['49'] = 'Forsamlingsplads standart action';
t['AT2'] = 'Opbakning';
t['AT3'] = 'Angreb: Normal';
t['AT4'] = 'Angreb: Plyndringstogt';
t['24'] = 'Notesbog stֳ¸rrelse';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normal (lille)';
t['NBSB'] = 'Stor skֳ¦rm (Stor)';
t['25'] = 'Notesbog hֳ¸jde';
t['NBHAX'] = 'Automatisk udvid hֳ¸jde';
t['NBHK'] = 'Standart hֳ¸jde';
t['43'] = 'Vis center nummer';
t['NPCSAVETIME'] = 'Gem: ';
t['38'] = 'Vis rֳ¥stof trin farver';
t['44'] = 'Vis bygningstrin faver';
t['65'] = 'Farve opgradering mulig<br>(Default = Empty)';
t['66'] = 'Farve Fuldt udbygget<br>(Default = Empty)';
t['67'] = 'Farve opgradering ikke mulig<br>(Default = Empty)';
t['68'] = 'Farve opgradering via NPC<br>(Default = Empty)';
t['TOTALTROOPS'] = 'Byens totale troppeantal';
t['20'] = 'Vis links';
t['U.2'] = 'Race';
t['1'] = "Travian v2.x server";
t['SELECTALLTROOPS'] = "Vֳ¦lg alle tropper";
t['PARTY'] = "Fest";
t['CPPERDAY'] = "KP/dag";
t['SLOT'] = "Slot";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Vֳ¦lg spioner";
t['SELECTFAKE'] = "Vֳ¦lg fake";
t['NOSCOUT2FAKE'] = "Det er ikke muligt at bruge spioner til fake angreb !";
t['NOTROOP2FAKE'] = "Der er ingen tropper til sende et fake angreb!";
t['NOTROOP2SCOUT'] = "Der er ingen spioner tilstede !";
t['NOTROOPS'] = "Der er ingen tropper i byen !";
t['ALL'] = "Alle";
t['SH2'] = "I farve felterne kan du skrive:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
t['SOREP'] = "Vis original report (Til visning)";
t['56'] = "Vis celle type/oase info<br>Hold musen over kortet";
t['10'] = "Kampsimulator link der skal bruges:<br>(menu venstre)";
t['WSIMO1'] = "Inten (leveret af spillet)";
t['WSIMO2'] = "Extern (leveret af kirilloid.ru)";
t['27'] = "World Analyser der skal bruges";
t['28'] = "Vis analyser statistic links";
t['NONEWVER'] = "Du har den seneste version";
t['BVER'] = "Du mֳ¥ have en beta version";
t['NVERAV'] = "En ny version af scriptet er tilgֳ¦nglig";
t['UPDSCR'] = "Opdater scriptet nu ?";
t['CHECKUPDATE'] = "Checker for script opdateringer.<br>Vent venligst...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Gennemsnitlig antal indbygger per by";
t['AVPPP'] = "Gennemsnitlig antal indbygger per spiller";
t['37'] = "Vis rֳ¥stoffelter opgradringstabel";
t['41'] = "vis bygnings opgradringstabel";
t['48'] = "Antallet af sider med tilbud der skal indlֳ¦sses<br>Mens du er pֳ¥ markede => kֳ¸b' side<br>(Default = 1)";
t['U.3'] = 'Din hovedlandsbys navn<br><b>Visit your Profile for an update</b>';
t['U.6'] = 'Din hovedlandsbys koordinater<br><b>Visit your Profile for an update</b>';
t['TOTTRTR'] = 'Totale antal tropper der trֳ¦nes';
t['57'] = 'Vis afstand & tider';
t['UPDALLV'] = 'opdater alle byer.  BRUGS MED STOR FORSIGTIGHED DA DET KAN Fֳ˜RE TIL EN BANNED KONTO !';
t['9'] = "Vis extra links i venstre menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Stort kort';
t['USETHEMPR'] = 'Brug dem (proportional)';
t['USETHEMEQ'] = 'Brug dem (equal)';
t['TOWNHALL'] = 'Rֳ¥dhus';
t['ACCINFO'] = 'Konto Information';
t['NBO'] = 'Notesblok';
t['MNUL'] = 'Menu i venstre side';
t['STAT'] = 'Statestik';
t['RESF'] = 'Rֳ¥stoffelter';
t['VLC'] = 'Landsbycenter';
t['MAPO'] = 'Kort options';
t['COLO'] = 'Farve options';
t['DBGO'] = 'Debug options';
t['4'] = 'Markedesplads';
t['5'] = 'Forsamlingsplads/Kaserne/Vֳ¦rksted/Stald';
t['6'] = "Rֳ¥dhus/Heltegֳ¥rden/Armoury/Blacksmith";
t['HEROSMANSION'] = "Hero's mansion";
t['BLACKSMITH'] = 'vֳ¥bensmedje';
t['ARMOURY'] = 'Rustningssmedje';
t['NOW'] = 'Nu';
t['CLOSE'] = 'Luk';
t['USE'] = 'Brug';
t['USETHEM1H'] = 'brug dem (1 times produktion)';
t['OVERVIEW'] = 'oversigt';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Angreb';
t['NEWS'] = 'Nyheder';
t['ADDCRTPAGE'] = 'tilfֳ¸j nuvֳ¦rende';
t['SCRPURL'] = 'TBeyond page';
t['50'] = 'Antallet af spioner til<br>"Vֳ¦lg spioner" funktion';
t['SPACER'] = 'Mellemrumslinje';
t['53'] = 'Vis troppe information i tooltips';
t['MEREO'] = 'Beskeder & Reporter';
t['59'] = 'antallet af besked/report sider som skal indlֳ¦ses<br>(Default = 1)';
t['ATTABLES'] = 'Troppetabel';
t['MTW'] = 'mistede';
t['MTX'] = 'overskrider';
t['MTC'] = 'Nuvֳ¦rende last';
t['ALFL'] = 'Link til extern forum<br>(Tom for intern forum)';
t['82.L'] = 'Lock links (Gem slet, flyt op, flyt ned ikoner)';
t['MTCL'] = 'Clear all';
t['82.U'] = 'Unlock links (Vis slet, flyt op, flyt ned ikoner)';
t['CKSORT'] = 'Klik for at sorter';
t['MIN'] = 'Min';
t['SVGL'] = 'Del imellem byer';
t['VGL'] = 'By Liste';
t['12'] = "Vis 'dorf1.php' and 'dorf2.php' links";
t['UPDATEPOP'] = 'opdater indbygger';
t['54'] = 'Vis afstande og tider til byer i tooltips';
t['EDIT'] = 'Edit';
t['NPCO'] = 'NPC Assistant options';
t['26'] = 'Vis NPC Assistant calculations/links';
t['58'] = 'Vis tabel med spiller/byer/besatte oaser';
t['NEWVILLAGEAV'] = 'Dato/Tid';
t['TIMEUNTIL'] = 'Ventetid';
t['61'] = 'Vis "Slet alle" tabel pֳ¥ Report side';
t['62'] = 'Vis "Send IGM" ikon for mig, ogsֳ¥';
t['CENTERMAP'] = 'Centrֳ© kortet pֳ¥ denne by';
t['13'] = 'Vis "Centrֳ© kortet pֳ¥ denne by" ikon';
t['SENDTROOPS'] = 'Send tropper';
t['64'] = 'Vis detaljer in Report Statestik';
t['7'] = "Palads/Residens/Akademi/Skattekammer";
t['PALACE'] = "Palads";
t['RESIDENCE'] = "Residens";
t['ACADEMY'] = "Akademi";
t['TREASURY'] = "Skattekammer";
t['45'] = "Vis blinkende ikoner for bygninger der bliver opgraderet";
t['14'] = "Vis 'Send tropper/Send rֳ¥stoffer' ikoner i by listen";
t['34'] = "Vis kP/dag information i opgradringstabel";
t['UPGTB'] = "Rֳ¥stoffelter/Bygnings opgradringstabel";
t['35'] = "Vis kornforbrug i opgradringstabel";
t['16'] = "Vis effektiv kornproduktion i by liste";
t['RBTT'] = "Rֳ¥stofbar";
t['39'] = "Vis 'Rֳ¥stofbar' tabel";
t['40'] = "vis 'Rֳ¥stofbar' tabel som flytbar vindue";
t['21'] = "vis 'Bruger links' som flytbar vindue";
t['23'] = "Vis 'Notesblok' som flytbar vindue";
t['17'] = "Vis indbygger i by liste";
t['29'] = 'Map Analyser der skal bruges';
t['30'] = 'Vis link til kort over spiller';
t['31'] = 'Vis link til kort over alliancer';
t['63'] = 'Vis extra information i kampreporter';
t['60'] = 'Vis link til at ֳ¥bne beskeder i et pop-up';
break;
case "ph"://by ahuks
//avRace = ['Romano', 'Teutono', 'Gaul'];
t['8'] = 'Alyansa';
t['QSURE'] = 'Sigurado ka ba?';
t['LOSS'] = 'Kawalan';
t['PROFIT'] = 'Pakinabang';
t['EXTAV'] = 'Maari ng Gawin';
t['PLAYER'] = 'Manlalaro';
t['VILLAGE'] = 'Baryo';
t['POPULATION'] = 'Populasyon';
t['COORDS'] = 'Coordinate';
t['MAPTBACTS'] = 'Aksyon';
t['SAVED'] = 'Saved';
t['YOUNEED'] = 'Kailangan mo';
t['TODAY'] = 'ngayon';
t['TOMORROW'] = 'bukas';
t['DAYAFTERTOM'] = 'kinabukasan';
t['MARKET'] = 'Palengke';
t['BARRACKS'] = 'Kwartel';
t['RAP'] = 'Pook Tipunan';
t['STABLE'] = 'Kuwadra';
t['WORKSHOP'] = 'Talyer';
t['SENDRES'] = 'Magpadala ng likas-yaman';
t['BUY'] = 'Bumili';
t['SELL'] = 'Alok';
t['SENDIGM'] = 'Sumulat ng Mensahe';
t['LISTO'] = 'Maari na';
t['ON'] = 'ng';
t['AT'] = 'sa';
t['EFICIENCIA'] = 'Kahusayan';
t['NEVER'] = 'Hindi Kailanman';
t['ALDEAS'] = 'Baryo';
t['TIEMPO'] = 'Oras';
t['OFREZCO'] = 'Nag-aalok';
t['BUSCO'] = 'Naghahanap';
t['TIPO'] = 'Uri';
t['DISPONIBLE'] = "Ito'y Maari lamang";
t['CUALQUIERA'] = 'Kahit Ano';
t['YES'] = 'Oo';
t['NO'] = 'Hindi';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Pinakamatagal na Oras';
t['SUMMARY'] = 'Ulat';
t['TROPAS'] = 'Mga Hukbo';
t['AT2'] = 'Dagdag ng Hukbo';
t['AT3'] = 'Salakay: Normal';
t['AT4'] = 'Salakay: Pagnakaw';
t['TOTALTROOPS'] = 'Kubuuan ng Hukbo';
t['U.2'] = 'Lahi';
t['SELECTALLTROOPS'] = "Piliin lahat ng Hukbo";
t['PARTY'] = "Kasiyahan";
t['CPPERDAY'] = "Pananim/Araw";
t['TOTAL'] = "Kabuuan";
t['SELECTSCOUT'] = "Piliin ang Scout";
t['SELECTFAKE'] = "Piliin ang Pekeng Atake";
t['NOSCOUT2FAKE'] = "Hindi maaari gamitin ang Scout para sa Pekeng Atake!";
t['NOTROOP2FAKE'] = "Walang Hukbo para sa Pekeng Atake!";
t['NOTROOP2SCOUT'] = "Walang Hukbo para pang Scout!";
t['NOTROOPS'] = "Walang Hukbo sa iyong Baryo!";
t['ALL'] = "Lahat";
t['SOREP'] = "Ipakita ang Orihinal na Ulat";
t['AVPPV'] = "Average na Population sa bawat Baryo";
t['AVPPP'] = "Average na Population sa bawat Manlalaro";
t['37'] = "Show resource fields upgrade table";
t['41'] = "Show buildings upgrade table";
t['TOWNHALL'] = 'Bulwagan ng Baryo';
t['STAT'] = 'Mga Estatistika';
t['RESF'] = 'Likas-yaman';
t['VLC'] = 'Gitna ng Baryo';
t['5'] = 'Pook Tipunan/Kwartel/Talyer/Kuwadra';
t['6'] = "Bulwagan ng Baryo/Mansyon ng Bayani/Balutian/Pandayan";
t['HEROSMANSION'] = "Mansyon ng Bayani";
t['BLACKSMITH'] = 'Pandayan';
t['ARMOURY'] = 'Balutian';
t['OVERVIEW'] = 'Pananaw';
t['FORUM'] = 'Porum';
t['ATTACKS'] = 'Atake';
t['NEWS'] = 'Ulat';
t['50'] = 'Bilang ng Scout para sa<br>"Piliin Scout" function';
t['CENTERMAP'] = 'Gitnang Mapa ng Baryo';
t['13'] = 'Show "Gitnang Mapa ng Baryo" icon';
t['SENDTROOPS'] = 'Magpadala ng Hukbo';
t['7'] = "Palasyo/Residensya/Akademya/Kaban-yaman";
t['PALACE'] = "Palasyo";
t['RESIDENCE'] = "Residensya";
t['ACADEMY'] = "Akademya";
t['TREASURY'] = "Kaban-yaman";
break;
case "fi"://by Syanidi, Haukka
//avRace = ['Roomalaist', 'Teutonit', 'Gallialaist'];
t['8'] = 'Liittouma';
t['SIM'] = 'Taistelusimulaattori';
t['QSURE'] = 'Oletko varma?';
t['LOSS'] = 'Menetys';t['PROFIT'] = 'Hyֳ¶ty';
t['EXTAV'] = 'Pֳ₪ivitys mahdollista ';
t['PLAYER'] = 'Pelaaja';
t['VILLAGE'] = 'Kylֳ₪';
t['POPULATION'] = 'Asukasluku';
t['COORDS'] = 'Koordinaatit';
t['MAPTBACTS'] = 'Toiminnot';
t['SAVED'] = 'Tallennettu';
t['YOUNEED'] = 'Tarvitset';
t['TODAY'] = 'tֳ₪nֳ₪ֳ₪n';
t['TOMORROW'] = 'huomenna';
t['DAYAFTERTOM'] = 'ylihuomenna';
t['MARKET'] = 'Tori';
t['BARRACKS'] = 'Kasarmi';
t['RAP'] = 'Kokoontumispiste';
t['STABLE'] = 'Talli';
t['WORKSHOP'] = 'Tyֳ¶paja';
t['SENDRES'] = 'Lֳ₪hetֳ₪ resursseja';
t['COMPRAR'] = 'Osta';
t['SELL'] = 'Myy';
t['SENDIGM'] = 'Lֳ₪hetֳ₪ viesti';
t['LISTO'] = 'Saatavilla';
t['ON'] = 'Saatavilla';
t['AT'] = 'kello';
t['EFICIENCIA'] = 'Hyֳ¶tysuhde';
t['NEVER'] = 'Ei koskaan';
t['ALDEAS'] = 'Kylֳ₪(t)';
t['TIEMPO'] = 'Aika';
t['OFREZCO'] = 'Tarjonnut minulle';
t['BUSCO'] = 'Pyytֳ₪nyt minulta';
t['TIPO'] = 'Suhde';
t['DISPONIBLE'] = 'Vain saatavilla olevat';
t['CUALQUIERA'] = 'Mikֳ₪ tahansa';
t['YES'] = 'Kyllֳ₪';
t['NO'] = 'Ei';
t['LOGIN'] = 'Kirjaudu sisֳ₪ֳ₪n';
t['MARCADORES'] = 'Kirjanmerkit';
t['ANYADIR'] = 'Lisֳ₪ֳ₪';
t['UBU'] = 'Uusi kirjanmerkin URL';
t['UBT'] = 'Uusi kirjanmerkkiteksti';
t['DEL'] = 'Poista';
t['MAPA'] = 'Kartta';
t['MAXTIME'] = 'Enimmֳ₪isaika';
t['ARCHIVE'] = 'Arkisto';
t['SUMMARY'] = 'Yhteenveto';
t['TROPAS'] = 'Joukot';
t['CHECKVERSION'] = 'Pֳ₪ivitֳ₪ TBeyond';
t['ACTUALIZAR'] = 'Pֳ₪ivitֳ₪ kylֳ₪n tiedot';
t['VENTAS'] = 'Tallennetut tarjoukset';
t['MAPSCAN']  = 'Tutki kartta';
t['BIC'] = 'Nֳ₪ytֳ₪ laajennetut kuvakkeet';
t['22'] = 'Nֳ₪ytֳ₪ muistilappu';
t['SAVE'] = 'Tallenna';
t['49'] = 'Kokoontumispisteen oletustoiminto';
t['AT2'] = 'Vahvistus';
t['AT3'] = 'Hyֳ¶kkֳ₪ys: Normaali';
t['AT4'] = 'Hyֳ¶kkֳ₪ys: Ryֳ¶stֳ¶';
t['24'] = 'Muistilapun koko';
t['NBSA'] = 'Automaattinen';
t['NBSN'] = 'Normaali';
t['NBSB'] = 'Laaja';
t['25'] = 'Muistilapun korkeus';
t['NBHAX'] = 'Automaattinen korkeuden sֳ₪ֳ₪tֳ¶';
t['NBHK'] = 'Oletus korkeus';
t['43'] = 'Nֳ₪ytֳ₪ rakennuksien tasonumerot';
t['NPCSAVETIME'] = 'Sֳ₪ֳ₪stֳ₪: ';
t['38'] = 'Nֳ₪ytֳ₪ resurssipeltojen tasovֳ₪rit';
t['44'] = 'Nֳ₪ytֳ₪ rakennuksien tasovֳ₪rit';
t['65'] = '"Pֳ₪ivitys mahdollinen" vֳ₪ri<br />(Oletus = Tyhjֳ₪)';
t['66'] = '"Korkein mahdollinen taso" vֳ₪ri<br />(Oletus = Tyhjֳ₪)';
t['67'] = '"Pֳ₪ivitys ei mahdollista" vֳ₪ri<br />(Oletus = Tyhjֳ₪)';
t['68'] = '"Pֳ₪ivitys mahdollinen NPC:llֳ₪" vֳ₪ri<br />(Oletus = Tyhjֳ₪)';
t['TOTALTROOPS'] = 'Kylֳ₪n joukkojen kokonaismֳ₪ֳ₪rֳ₪';
t['20'] = 'Nֳ₪ytֳ₪ kirjanmerkit';
t['U.2'] = 'Rotu';
t['1'] = "Travian v2.x serveri";
t['SELECTALLTROOPS'] = "Valitse kaikki joukot";
t['PARTY'] = "Juhlat";
t['CPPERDAY'] = "KP/pֳ₪ivֳ₪";
t['SLOT'] = "Kyliֳ₪";
t['TOTAL'] = "Yhteensֳ₪";
t['SELECTSCOUT'] = "Valitse tiedustelija";
t['SELECTFAKE'] = "Valitse hֳ₪my";
t['NOSCOUT2FAKE'] = "Ei ole tiedustelijoita hֳ₪myyn!";
t['NOTROOP2FAKE'] = "Ei ole joukkoja hֳ₪myyn!";
t['NOTROOP2SCOUT'] = "Ei ole joukkoja tiedusteluun!";
t['NOTROOPS'] = "Kylֳ₪ssֳ₪ ei ole joukkoja!";
t['ALL'] = "Kaikki";
t['SH2'] = "Vֳ₪rikentissֳ₪ voit kֳ₪yttֳ₪ֳ₪:<br />- <b>Green</b> , <b>red</b> , <b>orange</b> jne.<br />- HEX vֳ₪rikoodeja kuten <b>#004523</b><br />- Oletus: tyhjֳ₪";
t['SOREP'] = "Nֳ₪ytֳ₪ alkuperֳ₪inen raportti";
t['56'] = "Nֳ₪ytֳ₪ kylֳ₪tyypit ja keitaat<br />liikutellessasi hiirtֳ₪ kartalla";
t['10'] = "Taistelusimulaattorilinkki kֳ₪ytֳ¶ssֳ₪:<br />(Vasemmanpuoleinen valikko)";
t['WSIMO1'] = "Sisֳ₪inen (Pelin tarjoama)";
t['WSIMO2'] = "Ulkoinen (kirilloid.ru tarjoama)";
t['27'] = "Valitse World Analyser";
t['28'] = "Nֳ₪ytֳ₪ analyysitilastot linkkeinֳ₪";
t['NONEWVER'] = "Sinulla on uusin saatavilla oleva versio";
t['BVER'] = "Sinulla saattaa olla beta-versio";
t['NVERAV'] = "Scriptistֳ₪ on saatavilla uusi versio";
t['UPDSCR'] = "Pֳ₪ivitֳ₪ scripti nyt ?";
t['CHECKUPDATE'] = "Tarkistetaan pֳ₪ivitystֳ₪ scriptille.<br />Odota hetki...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Kylien keskimֳ₪ֳ₪rֳ₪inen asukasluku";
t['AVPPP'] = "Pelaajien keskimֳ₪ֳ₪rֳ₪inen asukasluku";
t['37'] = "Nֳ₪ytֳ₪ resurssikenttien pֳ₪ivitystaulukko";
t['41'] = "Nֳ₪ytֳ₪ rakennusten pֳ₪ivitystaulukko";
t['69'] = "Kirjautumistaso konsoliin<br>VAIN OHJELMOIJILLE JA TESTAAJILLE<br>(Oletus = 0)";
t['48'] = "Tarjoussivujen latautumismֳ₪ֳ₪rֳ₪<br />ollessasi torilla => Osta sivu<br />(Oletus = 1)";
t['U.3'] = 'Pֳ₪ֳ₪kaupunkisi nimi<br /><b>Kֳ₪y profiilissa pֳ₪ivittֳ₪ֳ₪ksesi</b>';
t['U.6'] = 'Pֳ₪ֳ₪kaupunkisi koordinaatit<br /><b>Kֳ₪y profiilissa pֳ₪ivittֳ₪ֳ₪ksesi</b>';
t['MAX'] = 'Enintֳ₪ֳ₪n';
t['TOTTRTR'] = 'Koulutuksessa olevien joukkojen kokonaismֳ₪ֳ₪rֳ₪';
t['57'] = 'Nֳ₪ytֳ₪ matkat ja ajat';
t['TB3SL'] = TB3O.shN + ' Asetukset';
t['UPDALLV'] = 'Pֳ₪ivitֳ₪ kaikki kylֳ₪t. HUOMIOI: SAATTAA JOHTAA TILIN Jֳ„ֳ„DYTTֳ„MISEEN!!';
t['9'] = "Nֳ₪ytֳ₪ lisֳ₪linkit vasemmanpuoleisessa valikossa<br />(Traviantoolbox, World Analyser, Travilog, Map, jne.)";
t['LARGEMAP'] = 'Iso kartta';
t['USETHEMPR'] = 'Kֳ₪ytֳ₪ ne (Prosentuaalisesti)';
t['USETHEMEQ'] = 'Kֳ₪ytֳ₪ ne (tasaisesti)';
t['TOWNHALL'] = 'Kaupungintalo';
t['GSRVT'] = 'Serveri';
t['ACCINFO'] = 'Tilin tiedot';
t['NBO'] = 'Muistilappu';
t['MNUL'] = 'Vasemmanpuoleinen valikko';
t['STAT'] = 'Tilastot';
t['RESF'] = 'Resurssikentֳ₪t';
t['VLC'] = 'Kylֳ₪n keskusta';
t['MAPO'] = 'Kartta asetukset';
t['COLO'] = 'Vֳ₪ri asetukset';
t['DBGO'] = 'Debug asetukset';
t['4'] = 'Tori';
t['5'] = 'Kokoontumispiste/Kasarmi/Tyֳ¶paja/Talli';
t['6'] = "Kaupungintalo/Sankarinkartano/Haarniskapaja/Aseseppֳ₪";
t['HEROSMANSION'] = "Sankarinkartano";
t['BLACKSMITH'] = 'Aseseppֳ₪';
t['ARMOURY'] = 'Haarniskapaja';
t['NOW'] = 'Nyt';
t['CLOSE'] = 'Sulje';
t['USE'] = 'Kֳ₪ytֳ₪';
t['USETHEM1H'] = 'Kֳ₪ytֳ₪ ne (Tunnin tuotto)';
t['OVERVIEW'] = 'Yleiskatsaus';
t['FORUM'] = 'Foorumi';
t['ATTACKS'] = 'Hyֳ¶kkֳ₪ykset';
t['NEWS'] = 'Uutiset';
t['ADDCRTPAGE'] = 'Lisֳ₪ֳ₪ nykyinen';
t['SCRIPTPRESURL'] = 'TBeyond kotisivu';
t['50'] = 'Tiedustelijoiden mֳ₪ֳ₪rֳ₪<br />"Valitse tiedustelija" ominaisuudelle';
t['SPACER'] = 'Vֳ₪liviiva';
t['53'] = 'Nֳ₪ytֳ₪ joukkotiedot vihjeissֳ₪';
t['MEREO'] = 'Viestit ja Raportit';
t['59'] = 'Esiladattujen viesti- ja raporttisivujen mֳ₪ֳ₪rֳ₪<br />(Oletus = 1)';
t['ATTABLES'] = 'Joukko taulukot';
t['MTW'] = 'Tuhlattu';
t['MTX'] = 'Ylittֳ₪ֳ₪';
t['MTC'] = 'Nykyinen mֳ₪ֳ₪rֳ₪';
t['ALFL'] = 'Linkki pelin ulkopuoliselle foorumille<br />(Jֳ₪tֳ₪ tyhjֳ₪ksi kun kֳ₪ytֳ₪t pelinsisֳ₪istֳ₪ foorumia)';
t['82.L'] = 'Lukitse kirjanmerkit (Piilottaa: poista, siirrֳ₪ ylֳ¶s, siirrֳ₪ alas ja muokkaa -painikkeet)';
t['MTCL'] = 'Tyhjennֳ₪ kaikki';
t['82.U'] = 'Avaa kirjanmerkit (Nֳ₪yttֳ₪ֳ₪: poista, siirrֳ₪ ylֳ¶s, siirrֳ₪ alas ja muokkaa -painikkeet)';
t['CKSORT'] = 'Klikkaa jֳ₪rjestֳ₪ֳ₪ksesi';
t['MIN'] = 'Vֳ₪hintֳ₪ֳ₪n';
t['SVGL'] = 'Jaa kylien vֳ₪lillֳ₪';
t['VGL'] = 'Kylֳ₪lista';
t['12'] = "Nֳ₪ytֳ₪ 'dorf1.php' ja 'dorf2.php' linkit";
t['UPDATEPOP'] = 'Pֳ₪ivitֳ₪ asukasluku';
t['54'] = 'Nֳ₪ytֳ₪ vֳ₪limatka ja ajat vihjeissֳ₪';
t['EDIT'] = 'Muokkaa';
t['NPCO'] = 'NPC Avustajan asetukset';
t['26'] = 'Nֳ₪ytֳ₪ NPC Avustajan laskelmat ja linkit';
t['58'] = 'Nֳ₪ytֳ₪ taulukko pelaajista/kylistֳ₪/varatuista keitaista';
t['NEWVILLAGEAV'] = 'Pֳ₪ivֳ₪ ja aika';
t['TIMEUNTIL'] = 'Aikaa jֳ₪ljellֳ₪';
t['61'] = 'Nֳ₪ytֳ₪ "Poista kaikki"-painike raporttisivulla';
t['62'] = 'Nֳ₪ytֳ₪ "Lֳ₪hetֳ₪ viesti" kuvake myֳ¶s itselleni';
t['CENTERMAP'] = 'Keskitֳ₪ kartta tֳ₪hֳ₪n kylֳ₪ֳ₪n';
t['13'] = 'Nֳ₪ytֳ₪ "Keskitֳ₪ kartta tֳ₪hֳ₪n kylֳ₪ֳ₪n" kuvake';
t['SENDTROOPS'] = 'Lֳ₪hetֳ₪ joukkoja';
t['64'] = 'Nֳ₪ytֳ₪ yksityiskohdat raporttitilastoissa';
t['7'] = "Palatsi/Virka-asunto/Akatemia/Aarrekammio";
t['PALACE'] = "Palatsi";
t['RESIDENCE'] = "Virka-asunto";
t['ACADEMY'] = "Akatemia";
t['TREASURY'] = "Aarrekammio";
t['45'] = "Nֳ₪ytֳ₪ rakennuksien tasot vilkkuvina, kun niitֳ₪ pֳ₪ivitetֳ₪ֳ₪n";
t['14'] = "Nֳ₪ytֳ₪ 'Lֳ₪hetֳ₪ joukkoja/Lֳ₪hetֳ₪ resursseja' kuvakkeet kylֳ₪listassa";
t['34'] = "Nֳ₪ytֳ₪ KP/pֳ₪ivֳ₪ pֳ₪ivitystaulukoissa";
t['UPGTB'] = "Resurssikentֳ₪t/Rakennukset";
t['35'] = "Nֳ₪ytֳ₪ viljan kulutus pֳ₪ivitystaulukoissa";
t['16'] = "Nֳ₪ytֳ₪ viljantuotanto kylֳ₪listassa";
t['RBTT'] = "Resurssipalkki";
t['39'] = "Nֳ₪ytֳ₪ 'Resurssipalkki'";
t['40'] = "Nֳ₪ytֳ₪ 'Resurssipalkki' siirrettֳ₪vֳ₪nֳ₪ ikkunana";
t['21'] = "Nֳ₪ytֳ₪ 'kirjanmerkit' siirrettֳ₪vֳ₪nֳ₪ ikkunana";
t['23'] = "Nֳ₪ytֳ₪ 'Muistilappu' siirrettֳ₪vֳ₪nֳ₪ ikkunana";
t['17'] = "Nֳ₪ytֳ₪ asukasluku kylֳ₪listassa";
t['29'] = 'Mitֳ₪ kartta-analysoijaa kֳ₪ytetֳ₪ֳ₪n';
t['30'] = 'Nֳ₪ytֳ₪ pelaajien linkit karttaan';
t['31'] = 'Nֳ₪ytֳ₪ liittojen linkit karttaan';
t['63'] = 'Nֳ₪ytֳ₪ TB3 parannellut taisteluraportit';
t['18'] = 'Nֳ₪ytֳ₪ lisֳ₪ksi kahden palstan kylֳ₪lista siirrettֳ₪vֳ₪nֳ₪ ikkunana';
t['60'] = 'Nֳ₪ytֳ₪ linkki ponnahdusikkunaan';
t['42'] = 'Jֳ₪rjestֳ₪ rakennukset pֳ₪ivityslistassa nimen perusteella';
t['19'] = 'Nֳ₪ytֳ₪ tiedot valmistuvista rakennuksista ja joukkojen liikkeistֳ₪ <br />kylֳ₪listassa';
t['32'] = "Nֳ₪ytֳ₪ Hakupalkki";
t['3'] = 'Pakota T3.1 Legioonalaisten ja Falangien kantomֳ₪ֳ₪rֳ₪laskenta<br />(sekoitetuille T3.1 ja T3.5 servereille)';
t['33'] = "Nֳ₪ytֳ₪ 'Hakupalkki' siirrettֳ₪vֳ₪nֳ₪ ikkunana";
t['36'] = "Nֳ₪ytֳ₪ 'Siihen mennessֳ₪/Ylijֳ₪ֳ₪vֳ₪t' laskelma, pֳ₪ivitys ja koulutus taulukoissa";
t['RESIDUE'] = 'Ylijֳ₪ֳ₪vֳ₪t resurssit jos rakennat';
t['RESOURCES'] = 'Resurssit';
t['SH1'] = "Automaattinen kaupunki ja koordinaatti tunnistus, kun kֳ₪yt profiilissasi<br />Automaattinen rotu tunnistus, kun rakennat ja avaat kasarmin";
t['46'] = "Nֳ₪ytֳ₪ lisֳ₪tiedot kaikille saapuville kauppiaille";
t['2'] = 'Poista mainosbannerit';
t['15'] = "Nֳ₪ytֳ₪ puun, saven ja raudan tuntituotannot kylֳ₪listassa";
t['11'] = "Valitse sivu mitֳ₪ kֳ₪ytetֳ₪ֳ₪n raporttien lֳ₪hettֳ₪miseen";
t['RESEND'] = "Lֳ₪hetֳ₪ uudelleen?"
t['WSI'] = "Pelin sisֳ₪inen taistelusimulaattori";
t['TTT'] = "Yleiset joukko ja matka vihjeet";
t['47'] = "Nֳ₪ytֳ₪ viimeisin resurssilֳ₪hetys";
t['51'] = "Nֳ₪ytֳ₪ viimeisin hyֳ¶kkֳ₪ykseni";
t['52'] = "Nֳ₪ytֳ₪/kֳ₪ytֳ₪ viimeisimmֳ₪n hyֳ¶kkֳ₪yksen koordinaatteja";
t['55'] = "Tֳ₪ytֳ₪ simulaattori automaattisesti kylֳ₪ssֳ₪ olevien joukkojen perusteella";
break;
case "il":
//by zZzMichel & BlueShark & yabash & removesoul & DMaster
//avRace = ['׳¨׳•׳�׳�׳™׳�', '׳˜׳�׳•׳˜׳•׳ ׳™׳�', '׳’׳�׳�׳™׳�'];
t['8'] = '׳‘׳¨׳™׳×';
t['SIM'] = '׳¡׳™׳�׳•׳�׳˜׳•׳¨ ׳§׳¨׳‘ ';
t['QSURE'] = '׳”׳�׳� ׳�׳×׳” ׳‘׳˜׳•׳—?';
t['LOSS'] = '׳”׳₪׳¡׳“';
t['PROFIT'] = '׳¨׳•׳•׳—';
t['EXTAV'] = '׳©׳™׳“׳¨׳•׳’ ׳–׳�׳™׳�';
t['PLAYER'] = '׳©׳—׳§׳�';
t['VILLAGE'] = '׳›׳₪׳¨';
t['POPULATION'] = '׳�׳•׳›׳�׳•׳¡׳™׳™׳”';
t['COORDS'] = '׳§׳•׳�׳•׳¨׳“׳™׳ ׳˜׳•׳×';
t['MAPTBACTS'] = '׳₪׳¢׳•׳�׳•׳×';
t['SAVED'] = '׳ ׳©׳�׳¨';
t['YOUNEED'] = '׳�׳×/׳” ׳¦׳¨׳™׳›/׳”';
t['TODAY'] = '׳”׳™׳•׳�';
t['TOMORROW'] = '׳�׳—׳¨';
t['DAYAFTERTOM'] = '׳�׳—׳¨׳×׳™׳™׳�';
t['MARKET'] = '׳©׳•׳§';
t['BARRACKS'] = '׳�׳’׳•׳¨׳™ ׳—׳™׳™׳�׳™׳�';
t['RAP'] = '׳ ׳§׳•׳“׳× ׳�׳₪׳’׳©';
t['STABLE'] = '׳�׳•׳¨׳•׳•׳”';
t['WORKSHOP'] = '׳‘׳™׳× ׳�׳�׳�׳›׳”';
t['SENDRES'] = '׳©׳�׳— ׳�׳©׳�׳‘׳™׳�';
t['BUY'] = '׳§׳ ׳”';
t['SELL'] = '׳�׳›׳•׳¨';
t['SENDIGM'] = '׳©׳�׳— ׳”׳•׳“׳¢׳”';
t['LISTO'] = '׳–׳�׳™׳�';
t['ON'] = '׳–׳�׳™׳�';
t['AT'] = '׳‘';
t['EFICIENCIA'] = '׳™׳¢׳™׳�׳•׳×';
t['NEVER'] = '׳�׳£ ׳₪׳¢׳�';
t['ALDEAS'] = '׳›׳₪׳¨(׳™׳�)';
t['TIEMPO'] = '׳–׳�׳�';
t['OFREZCO'] = '׳�׳¦׳™׳¢';
t['BUSCO'] = '׳�׳—׳₪׳©';
t['TIPO'] = '׳™׳—׳¡ ׳”׳”׳—׳�׳₪׳”';
t['DISPONIBLE'] = '׳¨׳§ ׳¢׳¡׳§׳�׳•׳× ׳�׳₪׳©׳¨׳™׳•׳× ?';
t['CUALQUIERA'] = '׳›׳� ׳¡׳•׳’';
t['YES'] = '׳›׳�';
t['NO'] = '׳�׳�';
t['LOGIN'] = '׳”׳×׳—׳‘׳¨';
t['MARCADORES'] = '׳�׳•׳¢׳“׳₪׳™׳�';
t['ANYADIR'] = '׳”׳•׳¡׳£';
t['UBU'] = '׳�׳™׳ ׳§';
t['UBT'] = '׳©׳�';
t['DEL'] = '׳�׳—׳§';
t['MAPA'] = '׳�׳₪׳”';
t['MAXTIME'] = '׳�׳§׳¡׳™׳�׳•׳� ׳–׳�׳� ׳©׳�׳™׳—׳”';
t['ARCHIVE'] = '׳�׳¨׳›׳™׳•׳�';
t['SUMMARY'] = '׳¡׳™׳›׳•׳�';
t['TROPAS'] = '׳›׳•׳—׳•׳×';
t['CHKSCRV'] = '׳¢׳“׳›׳� TBeyond';
t['ACTUALIZAR'] = '׳¢׳“׳›׳� ׳�׳™׳“׳¢ ׳¢׳� ׳”׳›׳₪׳¨';
t['VENTAS'] = '׳”׳¦׳¢׳•׳× ׳©׳�׳•׳¨׳•׳×';
t['MAPSCAN'] = '׳¡׳¨׳•׳§ ׳�׳₪׳”';
t['BIC'] = '׳”׳¦׳’ ׳�׳™׳™׳§׳•׳ ׳™׳� ׳�׳•׳¨׳—׳‘׳™׳�';
t['22'] = '׳”׳¦׳’ ׳₪׳ ׳§׳¡ ׳”׳¢׳¨׳•׳×';
t['SAVE'] = '׳©׳�׳•׳¨';
t['49'] = '׳₪׳¢׳•׳�׳× ׳‘׳¨׳™׳¨׳× ׳�׳—׳“׳� ׳‘׳ ׳§׳•׳“׳× ׳”׳�׳₪׳’׳©';
t['AT2'] = '׳×׳’׳‘׳•׳¨׳×';
t['AT3'] = '׳”׳×׳§׳₪׳” ׳¨׳’׳™׳�׳”';
t['AT4'] = '׳”׳×׳§׳₪׳× ׳₪׳©׳™׳˜׳”';
t['24'] = '׳’׳•׳“׳� ׳₪׳ ׳§׳¡ ׳”׳¢׳¨׳•׳×';
t['NBSA'] = '׳�׳•׳˜׳•׳�׳�׳˜׳™';
t['NBSN'] = '׳¨׳’׳™׳� (׳§׳˜׳�)';
t['NBSB'] = '׳�׳¡׳� ׳¨׳—׳‘';
t['25'] = '׳’׳•׳‘׳” ׳₪׳ ׳§׳¡ ׳”׳¢׳¨׳•׳×';
t['NBHAX'] = '׳”׳¨׳—׳‘ ׳’׳•׳‘׳” ׳�׳•׳˜׳•׳�׳�׳˜׳™׳×';
t['NBHK'] = '׳’׳•׳‘׳” ׳‘׳¨׳™׳¨׳× ׳�׳—׳“׳�';
t['43'] = '׳”׳¦׳’ ׳¨׳�׳•׳× ׳�׳‘׳ ׳™׳�';
t['NPCSAVETIME'] = '׳©׳�׳•׳¨: ';
t['38'] = '׳”׳¦׳’ ׳¨׳�׳× ׳©׳“׳•׳× ׳�׳©׳�׳‘׳™׳� ׳‘׳¦׳‘׳¢';
t['44'] = '׳”׳¦׳’ ׳¨׳�׳× ׳�׳‘׳ ׳™׳� ׳‘׳¦׳‘׳¢';
t['65'] = '׳¦׳‘׳¢ ׳©׳“׳¨׳•׳’ ׳–׳�׳™׳� (׳‘׳¨׳™׳¨׳× ׳�׳—׳“׳� = ׳¨׳™׳§)';
t['66'] = '׳¦׳‘׳¢ ׳©׳�׳‘ ׳�׳§׳¡׳™׳�׳�׳�׳™ (׳‘׳¨׳™׳¨׳× ׳�׳—׳“׳� = ׳¨׳™׳§)';
t['67'] = '׳¦׳‘׳¢ ׳›׳�׳©׳¨ ׳©׳“׳¨׳•׳’ ׳�׳� ׳�׳₪׳©׳¨׳™ (׳‘׳¨׳™׳¨׳× ׳�׳—׳“׳� = ׳¨׳™׳§)';
t['68'] = '׳¦׳‘׳¢ ׳©׳“׳¨׳•׳’ ׳¢"׳™ NPC (׳‘׳¨׳™׳¨׳× ׳�׳—׳“׳� = ׳¨׳™׳§)';
t['TOTALTROOPS'] = '׳¡׳”"׳› ׳›׳•׳—׳•׳× ׳©׳™׳© ׳�׳›׳₪׳¨ ׳–׳”';
t['20'] = '׳”׳¨׳�׳” ׳�׳•׳¢׳“׳₪׳™׳�';
t['U.2'] = '<b>׳’׳–׳¢</b><br>׳�׳� ׳�׳•׳₪׳™׳¢׳” ׳©׳’׳™׳�׳”/׳¨׳™׳§, ׳�׳ ׳� ׳”׳›׳ ׳¡ ׳�׳�׳’׳•׳¨׳™ ׳”׳—׳™׳™׳�׳™׳�';
t['1'] = "׳©׳¨׳× ׳˜׳¨׳•׳•׳™׳�׳� ׳’׳™׳¨׳¡׳” 2.x";
t['SELECTALLTROOPS'] = "׳‘׳—׳¨ ׳�׳× ׳›׳� ׳”׳—׳™׳™׳�׳™׳�";
t['PARTY'] = "׳—׳’׳™׳’׳•׳×";
t['CPPERDAY'] = "׳ ׳§׳•׳“׳•׳× ׳×׳¨׳‘׳•׳× ׳�׳™׳•׳�";
t['SLOT'] = "׳�׳§׳•׳� ׳₪׳ ׳•׳™";
t['TOTAL'] = '׳¡׳”"׳›';
t['SELECTSCOUT'] = "׳‘׳—׳¨ ׳¡׳™׳™׳¨";
t['SELECTFAKE'] = "׳”׳×׳§׳₪׳” ׳�׳–׳•׳™׳₪׳×";
t['NOSCOUT2FAKE'] = "׳�׳™ ׳�׳₪׳©׳¨ ׳�׳”׳©׳×׳�׳© ׳‘׳¡׳™׳™׳¨׳™׳� ׳�׳”׳×׳§׳₪׳” ׳�׳–׳•׳™׳₪׳×!";
t['NOTROOP2FAKE'] = "׳�׳™׳� ׳—׳™׳™׳�׳™׳� ׳�׳”׳×׳§׳₪׳” ׳�׳–׳•׳™׳₪׳×!";
t['NOTROOP2SCOUT'] = "׳�׳™׳� ׳¡׳™׳™׳¨׳™׳� ׳�׳¨׳™׳’׳•׳�!";
t['NOTROOPS'] = "׳�׳™׳� ׳—׳™׳™׳�׳™׳� ׳‘׳›׳₪׳¨!";
t['ALL'] = "׳”׳›׳�";
t['SH2'] = "׳‘׳©׳•׳¨׳•׳× ׳”׳¦׳‘׳¢׳™׳� ׳�׳×׳” ׳™׳›׳•׳� ׳�׳”׳›׳ ׳™׳¡:<br>- <b>green</b> ׳�׳• <b>red</b> ׳�׳•  <b>orange</b> ׳•׳›׳•'<br>- ׳§׳•׳“ HEX  ׳›׳�׳• <b>#004523</b><br>- ׳”׳©׳�׳¨ ׳¨׳™׳§ ׳‘׳©׳‘׳™׳� ׳‘׳¨׳™׳¨׳× ׳”׳�׳—׳“׳�";
t['SOREP'] = "׳”׳¨׳�׳” ׳“׳•׳— ׳¨׳’׳™׳� (׳�׳₪׳¨׳¡׳•׳�)";
t['56'] = "׳”׳¨׳�׳” ׳¡׳•׳’ ׳¢׳�׳§ ׳ ׳˜׳•׳©/׳ ׳•׳•׳” ׳�׳“׳‘׳¨ ׳‘׳–׳�׳� ׳”׳¢׳‘׳¨׳× ׳”׳¢׳›׳‘׳¨ ׳�׳¢׳�׳™׳• ׳‘׳�׳₪׳”";
t['10'] = "׳¡׳™׳�׳•׳�׳˜׳•׳¨ ׳§׳¨׳‘ ׳�׳©׳™׳�׳•׳© (׳‘׳×׳₪׳¨׳™׳˜ ׳”׳™׳�׳ ׳™)";
t['WSIMO1'] = "׳₪׳ ׳™׳�׳™ (׳�׳¡׳•׳₪׳§ ׳¢׳� ׳™׳“׳™ ׳”׳�׳©׳—׳§)";
t['WSIMO2'] = "׳—׳™׳¦׳•׳ ׳™ (׳�׳¡׳•׳₪׳§ ׳¢׳� ׳™׳“׳™ kirilloid.ru)";
t['27'] = "׳�׳�׳’׳¨ ׳ ׳×׳•׳ ׳™׳� ׳�׳©׳™׳�׳•׳©";
t['28'] = "׳”׳¦׳’ ׳�׳™׳ ׳§׳™׳� ׳¡׳˜׳˜׳™׳¡׳˜׳™׳™׳� ׳�׳�׳�׳’׳¨ ׳ ׳×׳•׳ ׳™׳�";
t['NONEWVER'] = "׳™׳© ׳�׳� ׳�׳× ׳”׳’׳™׳¨׳¡׳” ׳”׳¢׳“׳›׳ ׳™׳× ׳‘׳™׳•׳×׳¨";
t['BVER'] = "׳�׳×׳” ׳™׳›׳•׳� ׳�׳”׳•׳¨׳™׳“ ׳�׳× ׳’׳™׳¨׳¡׳× ׳”׳‘׳˜׳�";
t['NVERAV'] = "׳§׳™׳™׳�׳× ׳’׳™׳¨׳¡׳” ׳—׳“׳©׳” ׳�׳¡׳§׳¨׳™׳₪׳˜";
t['UPDSCR'] = "׳¢׳“׳›׳� ׳�׳× ׳”׳¡׳§׳™׳₪׳˜ ׳¢׳›׳©׳™׳•?";
t['CHECKUPDATE'] = "׳‘׳•׳“׳§ ׳¢׳“׳›׳•׳ ׳™׳� ׳�׳¡׳§׳¨׳™׳₪׳˜. ׳�׳ ׳� ׳”׳�׳×׳�...";
t['CROPFINDER'] = "׳�׳•׳¦׳� ׳§׳¨׳•׳₪׳¨׳™׳�";
t['AVPPV'] = "׳�׳�׳•׳¦׳¢ ׳�׳•׳›׳�׳•׳¡׳™׳™׳” ׳�׳›׳₪׳¨";
t['AVPPP'] = "׳�׳�׳•׳¦׳¢ ׳�׳•׳›׳�׳•׳¡׳™׳™׳” ׳�׳©׳—׳§׳�";
t['37'] = "׳”׳¨׳�׳” ׳˜׳‘׳�׳× ׳©׳“׳¨׳•׳’ ׳©׳“׳•׳× ׳�׳©׳�׳‘׳™׳�";
t['41'] = "׳”׳¨׳�׳” ׳˜׳‘׳�׳× ׳©׳“׳¨׳•׳’ ׳�׳‘׳ ׳™׳�";
t['69'] = "Console Log Level<br>׳¨׳§ ׳‘׳©׳‘׳™׳� ׳�׳×׳›׳ ׳×׳™׳� ׳�׳• ׳‘׳•׳“׳§׳™ ׳‘׳�׳’׳™׳�, (׳‘׳¨׳™׳¨׳× ׳�׳—׳“׳� = 0)";
t['48'] = "׳�׳¡׳₪׳¨ ׳“׳₪׳™ ׳”׳¦׳¢׳•׳× ׳�׳˜׳¢׳™׳ ׳” ׳‘׳–׳�׳� ׳©׳ ׳�׳¦׳�׳™׳� ׳‘׳¢׳�׳•׳“ '׳©׳•׳§ => ׳”׳¦׳¢׳•׳×'<br>(׳‘׳¨׳™׳¨׳× ׳�׳—׳“׳� = 1)";
t['U.3'] = '<b>׳©׳� ׳”׳‘׳™׳¨׳”</b><br>׳�׳� ׳�׳•׳₪׳™׳¢׳” ׳©׳’׳™׳�׳”/׳¨׳™׳§, ׳�׳ ׳� ׳”׳›׳ ׳¡ ׳�׳“׳£ ׳”׳₪׳¨׳•׳₪׳™׳�';
t['U.6'] = '<b>׳§׳•׳�׳•׳¨׳“׳™׳ ׳˜׳•׳× ׳”׳‘׳™׳¨׳”</b><br>׳�׳� ׳�׳•׳₪׳™׳¢׳” ׳©׳’׳™׳�׳”/׳¨׳™׳§, ׳�׳ ׳� ׳”׳›׳ ׳¡ ׳�׳“׳£ ׳”׳₪׳¨׳•׳₪׳™׳�';
t['MAX'] = '׳�׳§׳¡';
t['TOTTRTR'] = '׳¡׳”"׳› ׳—׳™׳™׳�׳™׳� ׳‘׳�׳™׳�׳•׳�';
t['57'] = '׳”׳¦׳’ ׳�׳¨׳—׳§׳™׳� ׳•׳–׳�׳ ׳™׳�';
t['TB3SL'] = '׳”׳’׳“׳¨׳•׳× ' + TB3O.shN;
t['UPDALLV'] = '׳¢׳“׳›׳� ׳�׳™׳“׳¢ ׳¢׳� ׳›׳� ׳”׳›׳₪׳¨׳™׳�. ׳”׳©׳×׳�׳©׳• ׳‘׳–׳”׳™׳¨׳•׳× ׳›׳™ ׳”׳“׳‘׳¨ ׳™׳›׳•׳� ׳�׳”׳•׳‘׳™׳� ׳�׳§׳‘׳�׳× ׳‘׳�׳�!';
t['9'] = "׳”׳¨׳�׳” ׳�׳™׳ ׳§׳™׳� ׳ ׳•׳¡׳₪׳™׳� ׳‘׳×׳₪׳¨׳™׳˜ ׳”׳™׳�׳ ׳™<br>(Traviantoolbox, World Analyser, Travilog, ׳�׳₪׳”, ׳•׳›׳•')";
t['LARGEMAP'] = '׳�׳₪׳” ׳’׳“׳•׳�׳”';
t['USETHEMPR'] = '׳—׳�׳§ ׳�׳©׳�׳‘׳™׳� (׳‘׳�׳•׳₪׳� ׳₪׳¨׳•׳₪׳•׳¨׳¦׳™׳•׳ ׳™)';
t['USETHEMEQ'] = '׳—׳�׳§ ׳�׳©׳�׳‘׳™׳� (׳‘׳�׳•׳₪׳� ׳©׳•׳•׳”)';
t['TOWNHALL'] = '׳‘׳ ׳™׳™׳� ׳”׳¢׳™׳¨׳™׳™׳”';
t['GSRVT'] = '׳¡׳•׳’ ׳”׳©׳¨׳×';
t['ACCINFO'] = '׳�׳™׳“׳¢ ׳—׳©׳‘׳•׳�';
t['NBO'] = '׳₪׳ ׳§׳¡ ׳”׳¨׳©׳™׳�׳•׳×';
t['MNUL'] = '׳×׳•׳¡׳₪׳•׳× ׳”׳×׳₪׳¨׳™׳˜ ׳©׳‘׳¦׳“ ׳™׳�׳™׳�';
t['STAT'] = '׳¡׳˜׳˜׳™׳¡׳˜׳™׳§׳•׳×';
t['RESF'] = '׳©׳“׳•׳× ׳�׳©׳�׳‘׳™׳�';
t['VLC'] = '׳�׳¨׳›׳– ׳”׳›׳₪׳¨';
t['MAPO'] = '׳�׳₪׳©׳¨׳•׳™׳•׳× ׳�׳₪׳”';
t['COLO'] = '׳�׳₪׳©׳¨׳•׳™׳•׳× ׳¦׳‘׳¢׳™׳�';
t['DBGO'] = '׳�׳¡׳•׳£ ׳©׳’׳™׳�׳•׳×';
t['4'] = '׳©׳•׳§';
t['5'] = '׳ ׳§׳•׳“׳× ׳�׳₪׳’׳©/׳�׳’׳•׳¨׳™ ׳—׳™׳™׳�׳™׳�/׳‘׳™׳×-׳�׳�׳�׳›׳”/׳�׳•׳¨׳•׳•׳” ';
t['6'] = "׳‘׳ ׳™׳™׳� ׳”׳¢׳™׳¨׳™׳™׳”/׳�׳—׳•׳–׳× ׳”׳’׳™׳‘׳•׳¨/׳—׳¨׳© ׳©׳¨׳™׳•׳�/׳—׳¨׳© ׳ ׳©׳§";
t['HEROSMANSION'] = "׳�׳—׳•׳–׳× ׳”׳’׳™׳‘׳•׳¨";
t['BLACKSMITH'] = "׳—׳¨׳© ׳ ׳©׳§";
t['ARMOURY'] = "׳—׳¨׳© ׳©׳¨׳™׳•׳�";
t['NOW'] = '׳›׳¢׳×';
t['CLOSE'] = '׳¡׳’׳•׳¨';
t['USE'] = '׳”׳©׳×׳�׳©';
t['USETHEM1H'] = '׳—׳�׳§ ׳�׳©׳�׳‘׳™׳� (׳×׳•׳¦׳¨ ׳©׳� ׳©׳¢׳”)';
t['OVERVIEW'] = '׳�׳‘׳˜-׳¢׳�';
t['FORUM'] = '׳₪׳•׳¨׳•׳�';
t['ATTACKS'] = '׳”׳×׳§׳₪׳•׳×';
t['NEWS'] = '׳—׳“׳©׳•׳×';
t['ADDCRTPAGE'] = '׳”׳•׳¡׳£ ׳“׳£ ׳ ׳•׳›׳—׳™';
t['SCRPURL'] = '׳�׳×׳¨ ׳”׳¡׳§׳¨׳™׳₪׳˜';
t['SPACER'] = '׳§׳• ׳”׳₪׳¨׳“׳”';
t['50'] = "׳�׳¡׳₪׳¨ ׳”׳¡׳™׳™׳¨׳™׳� ׳©׳™׳¨׳©׳� ׳‘׳©׳™׳�׳•׳© ׳‘׳₪׳•׳ ׳§׳¦׳™׳” '׳©׳�׳— ׳¡׳™׳™׳¨'";
t['53'] = '׳”׳¦׳’ ׳�׳™׳“׳¢ ׳¢׳� ׳”׳—׳™׳™׳�׳™׳� ׳‘׳”׳¦׳‘׳¢׳× ׳”׳¢׳›׳‘׳¨ ׳¢׳� ׳×׳�׳•׳ ׳•׳×׳™׳”׳�';
t['MEREO'] = '׳”׳•׳“׳¢׳•׳× ׳•׳“׳•׳—׳•׳×';
t['59'] = '׳�׳¡׳₪׳¨ ׳“׳₪׳™ ׳”׳”׳•׳“׳¢׳•׳×/׳“׳•׳—׳•׳× ׳©׳‘׳¨׳¦׳•׳ ׳� ׳�׳˜׳¢׳•׳�<br>(׳‘׳¨׳™׳¨׳×-׳�׳—׳“׳� = 1)';
t['ATTABLES'] = '׳˜׳‘׳�׳�׳•׳× ׳—׳™׳™׳�׳™׳�';
t['MTW'] = '׳�׳§׳•׳� ׳₪׳ ׳•׳™';
t['MTX'] = '׳�׳� ׳ ׳™׳×׳� ׳�׳©׳�׳•׳—';
t['MTC'] = '׳¡׳”"׳› ׳�׳©׳�׳‘׳™׳�';
t['ALFL'] = '׳§׳™׳©׳•׳¨ ׳�׳₪׳•׳¨׳•׳� ׳‘׳¨׳™׳× ׳—׳™׳¦׳•׳ ׳™ (׳”׳©׳�׳¨ ׳¨׳™׳§ ׳›׳“׳™ ׳�׳”׳©׳×׳�׳© ׳‘׳₪׳•׳¨׳•׳� ׳©׳�׳¡׳₪׳§ ׳”׳�׳©׳—׳§)';
t['82.L'] = '׳ ׳¢׳� ׳�׳•׳¢׳“׳₪׳™׳� (׳�׳¡׳×׳™׳¨ ׳�׳× ׳¡׳�׳�׳™ ׳”׳�׳—׳™׳§׳” ׳•׳”׳”׳–׳–׳”)';
t['MTCL'] = '׳ ׳§׳” ׳”׳›׳�';
t['82.U'] = '׳‘׳˜׳� ׳ ׳¢׳™׳�׳× ׳�׳•׳¢׳“׳₪׳™׳� (׳�׳¦׳™׳’ ׳�׳× ׳¡׳�׳�׳™ ׳”׳�׳—׳™׳§׳” ׳•׳”׳”׳–׳–׳”)';
t['CKSORT'] = '׳�׳—׳¥ ׳›׳“׳™ ׳�׳�׳™׳™׳�';
t['MIN'] = '׳�׳™׳ ׳™׳�׳•׳�';
t['SVGL'] = '׳©׳×׳£ ׳�׳× ׳”׳”׳¦׳¢׳” ׳”׳©׳�׳•׳¨׳” ׳‘׳›׳� ׳”׳›׳₪׳¨׳™׳� ׳©׳�׳™';
t['VGL'] = '׳¨׳©׳™׳�׳× ׳”׳›׳₪׳¨׳™׳�';
t['12'] = "׳”׳¦׳’ ׳§׳™׳©׳•׳¨׳™׳™ 'dorf1.php' ׳•- 'dorf2.php' ׳‘׳¨׳©׳™׳�׳× ׳”׳›׳₪׳¨׳™׳�";
t['UPDATEPOP'] = '׳¢׳“׳›׳� ׳�׳•׳›׳�׳•׳¡׳™׳™׳”';
t['54'] = '׳”׳¦׳’ ׳�׳¨׳—׳§׳™׳� ׳•׳–׳�׳ ׳™׳� ׳‘׳”׳¦׳‘׳¢׳× ׳”׳¢׳›׳‘׳¨ ׳¢׳� ׳©׳�׳•׳× ׳›׳₪׳¨׳™׳�';
t['NPCO'] = '׳�׳₪׳©׳¨׳•׳™׳•׳× ׳�ײ°׳¡ײ·׳™ײ¼ײµ׳¢ײ· ׳”- NPC';
t['26'] = '׳”׳¦׳’ ׳—׳™׳©׳•׳‘׳™׳� ׳•׳�׳™׳ ׳§׳™׳� ׳©׳� ׳�ײ°׳¡ײ·׳™ײ¼ײµ׳¢ײ· ׳”- NPC';
t['NEWVILLAGEAV'] = '׳�׳×׳™ ?';
t['58'] = '׳”׳¦׳’ ׳˜׳‘׳�׳” ׳©׳� ׳©׳—׳§׳ ׳™׳�/׳›׳₪׳¨׳™׳�/׳¢׳�׳§׳™׳� ׳×׳₪׳•׳¡׳™׳�';
t['TIMEUNTIL'] = '׳¢׳•׳“ ׳›׳�׳” ׳–׳�׳� ?';
t['61'] = '׳”׳¦׳’ ׳�׳× ׳˜׳‘׳�׳× ׳›׳₪׳×׳•׳¨׳™ ׳”׳�׳—׳™׳§׳” ׳‘׳“׳₪׳™ ׳”׳“׳•׳—׳•׳×';
t['62'] = "׳”׳¦׳’ ׳�׳× ׳¡׳�׳� '׳©׳�׳™׳—׳× ׳”׳•׳“׳¢׳”' ׳’׳� ׳�׳™׳“ ׳©׳� ׳”׳�׳©׳×׳�׳© ׳©׳�׳™";
t['CENTERMAP'] = '׳�ײ·׳¨ײ°׳›ײ¼ײµ׳– ׳›׳₪׳¨ ׳–׳” ׳‘׳�׳₪׳”';
t['13'] = '׳”׳¦׳’ ׳¡׳�׳� "׳�ײ·׳¨ײ°׳›ײ¼ײµ׳– ׳›׳₪׳¨ ׳–׳” ׳‘׳�׳₪׳”" ׳‘׳¨׳©׳™׳�׳× ׳”׳›׳₪׳¨׳™׳�';
t['SENDTROOPS'] = '׳©׳�׳— ׳›׳•׳—׳•׳×';
t['64'] = '׳”׳¦׳’ ׳₪׳¨׳˜׳™ ׳¡׳˜׳˜׳™׳¡׳˜׳™׳§׳” ׳ ׳•׳¡׳₪׳™׳� ׳‘׳“׳₪׳™ ׳”׳“׳•׳—׳•׳×';
t['7'] = "׳�׳¨׳�׳•׳�/׳�׳’׳•׳¨׳™׳�/׳�׳§׳“׳�׳™׳”/׳�׳©׳¨׳“-׳”׳�׳•׳¦׳¨";
t['PALACE'] = "׳�׳¨׳�׳•׳�";
t['RESIDENCE'] = "׳�׳’׳•׳¨׳™׳� ׳�׳�׳›׳•׳×׳™׳™׳�";
t['ACADEMY'] = "׳�׳§׳“׳�׳™׳”";
t['TREASURY'] = "׳�׳©׳¨׳“-׳”׳�׳•׳¦׳¨";
t['45'] = "׳”׳¦׳’ ׳�׳¡׳₪׳¨׳™׳� ׳�׳”׳‘׳”׳‘׳™׳� ׳�׳�׳‘׳ ׳™׳� ׳©׳¢׳•׳‘׳¨׳™׳� ׳©׳™׳“׳¨׳•׳’";
t['14'] = "׳”׳¦׳’ ׳�׳× ׳”׳¡׳�׳�׳™׳� '׳©׳�׳™׳—׳× ׳›׳•׳—׳•׳×/׳�׳©׳�׳‘׳™׳�' ׳‘׳¨׳©׳™׳�׳× ׳”׳›׳₪׳¨׳™׳�";
t['34'] = "׳”׳¦׳’ ׳ ׳§׳•׳“׳•׳× ׳×׳¨׳‘׳•׳× ׳�׳™׳•׳� ׳‘׳˜׳‘׳�׳�׳× ׳”׳©׳™׳“׳¨׳•׳’׳™׳�";
t['UPGTB'] = "׳˜׳‘׳�׳�׳•׳× ׳©׳™׳“׳¨׳•׳’ ׳�׳©׳�׳‘׳™׳�/׳�׳‘׳ ׳™׳�";
t['35'] = "׳”׳¦׳’ ׳¦׳¨׳™׳›׳× ׳™׳‘׳•׳� ׳‘׳˜׳‘׳�׳�׳× ׳”׳©׳™׳“׳¨׳•׳’׳™׳�";
t['16'] = "׳”׳¦׳’ ׳ ׳˜׳• ׳™׳™׳¦׳•׳¨ ׳™׳‘׳•׳� ׳©׳� ׳›׳� ׳›׳₪׳¨ ׳‘׳¨׳©׳™׳�׳× ׳”׳›׳₪׳¨׳™׳�";
t['39'] = "׳”׳¦׳’ ׳˜׳‘׳�׳�׳× '׳’׳¨׳£ ׳‘׳�׳¨׳™׳�'";
t['RBTT'] = "׳¡׳¨׳’׳� ׳�׳©׳�׳‘׳™׳�";
t['21'] = "׳”׳¦׳’ ׳�׳× ׳”'׳�׳•׳¢׳“׳₪׳™׳�' ׳›׳—׳�׳•׳� ׳�׳¨׳—׳£";
t['23'] = "׳”׳¦׳’ ׳�׳× '׳₪׳ ׳§׳¡ ׳”׳¨׳©׳™׳�׳•׳×' ׳›׳—׳�׳•׳� ׳¦׳£";
t['17'] = "׳”׳¦׳’ ׳�׳•׳›׳�׳•׳¡׳™׳™׳” ׳‘׳¨׳©׳™׳�׳× ׳”׳›׳₪׳¨׳™׳�";
t['29'] = '׳�׳ ׳×׳— ׳�׳₪׳” ׳�׳©׳™׳�׳•׳©';
t['30'] = '׳”׳¦׳’ ׳�׳™׳ ׳§׳™׳� ׳�׳�׳₪׳” - ׳�׳�׳™׳§׳•׳�׳™ ׳©׳—׳§׳ ׳™׳�';
t['31'] = '׳”׳¦׳’ ׳�׳™׳ ׳§׳™׳� ׳�׳�׳₪׳” - ׳�׳�׳™׳§׳•׳�׳™ ׳‘׳¨׳™׳×׳•׳×';
t['40'] = "׳”׳¦׳’ ׳˜׳‘׳�׳�׳× '׳’׳¨׳£ ׳‘׳�׳¨׳™׳�' ׳›׳—׳�׳•׳� ׳¦׳£";
t['63'] = '׳”׳¦׳’ ׳¡׳˜׳˜׳™׳¡׳˜׳™׳§׳” ׳‘׳¡׳™׳¡׳™׳× ׳‘׳“׳₪׳™ ׳”׳“׳•׳—׳•׳×';
t['3'] = '׳©׳ ׳” ׳—׳™׳©׳•׳‘׳™ ׳™׳›׳•׳�׳× ׳ ׳©׳™׳�׳” ׳©׳� ׳�׳™׳’׳™׳•׳ ׳¨ ׳•׳₪׳�׳ ׳§׳¡ ׳‘׳©׳¨׳×׳™ T3.1<br>(׳�׳™׳•׳¢׳“ ׳�׳©׳¨׳×׳™ T3.1 ׳•- T3.5 ׳�׳©׳•׳�׳‘׳™׳� - ׳�׳•׳₪׳™׳¢ ׳‘׳¢׳™׳§׳¨ ׳‘׳©׳¨׳×׳™ .de)';
t['18'] = '׳”׳¦׳’ ׳˜׳‘׳�׳�׳× ׳¨׳©׳™׳�׳× ׳›׳₪׳¨׳™׳� ׳ ׳•׳¡׳₪׳× ׳›׳—׳�׳•׳� ׳¦׳£ (׳™׳•׳¦׳’ ׳‘׳©׳ ׳™ ׳˜׳•׳¨׳™׳�)';
t['60'] = '׳”׳¦׳’ ׳§׳™׳©׳•׳¨ ׳�׳₪׳×׳™׳—׳× ׳”׳•׳“׳¢׳•׳× ׳‘׳—׳�׳•׳� ׳�׳•׳§׳₪׳¥';
t['42'] = '׳¡׳“׳¨ ׳�׳× ׳”׳�׳‘׳ ׳™׳� ׳‘׳˜׳‘׳�׳× ׳©׳™׳“׳¨׳•׳’ ׳”׳�׳‘׳ ׳™׳� ׳�׳₪׳™ ׳©׳�׳•׳×';
t['19'] = '׳”׳¦׳’ ׳¡׳�׳� ׳�׳™׳“׳¢ ׳�׳•׳“׳•׳× ׳×׳ ׳•׳¢׳× ׳›׳•׳—׳•׳× ׳•׳‘׳ ׳™׳™׳ ׳™׳� ׳‘׳×׳”׳�׳™׳›׳™ ׳©׳™׳“׳¨׳•׳’/׳‘׳ ׳™׳™׳” ׳‘׳¨׳©׳™׳�׳× ׳”׳›׳₪׳¨׳™׳�';
t['32'] = "׳”׳¦׳’ ׳�׳¡׳’׳¨׳× ׳—׳™׳₪׳•׳©'";
t['33'] = "׳”׳¦׳’ '׳�׳¡׳’׳¨׳× ׳—׳™׳₪׳•׳©' ׳›׳—׳�׳•׳� ׳¦׳£";
t['36'] = "׳”׳¦׳’ ׳—׳™׳©׳•׳‘׳™׳™ ׳–׳�׳ ׳™׳� ׳•׳�׳©׳�׳‘׳™׳� ׳ ׳—׳•׳¦׳™׳� ׳‘׳˜׳‘׳�׳�׳•׳× ׳©׳™׳“׳¨׳•׳’ ׳�׳‘׳ ׳™׳� ׳•׳™׳™׳¦׳•׳¨ ׳—׳™׳™׳�׳™׳�";
t['RESIDUE'] = '׳�׳©׳�׳‘׳™׳� ׳©׳™׳©׳�׳¨׳• ׳�׳� ׳�׳� ׳×׳‘׳ ׳” ';
t['RESOURCES'] = '׳�׳©׳�׳‘׳™׳�';
t['SH1'] = "׳₪׳×׳— ׳�׳× ׳”׳₪׳¨׳•׳₪׳™׳� ׳©׳�׳� ׳�׳–׳™׳”׳•׳™ ׳¢׳™׳¨ ׳‘׳™׳¨׳”/׳§׳•׳�׳¨׳“׳™׳ ׳˜׳•׳×<br>׳‘׳ ׳” ׳�׳’׳•׳¨׳™ ׳—׳™׳™׳�׳™׳� ׳‘׳©׳‘׳™׳� ׳–׳™׳”׳•׳™ ׳’׳–׳¢ ׳�׳•׳˜׳•׳�׳˜׳™ ׳•׳�׳– ׳›׳ ׳¡ ׳�׳�׳¨׳›׳– ׳”׳›׳₪׳¨";
t['46'] = "׳”׳¦׳’ ׳�׳™׳“׳¢ ׳ ׳•׳¡׳£ ׳�׳¦׳� ׳›׳� ׳¡׳•׳—׳¨ ׳©׳�׳’׳™׳¢";
t['2'] = '׳”׳¡׳¨ ׳‘׳�׳ ׳¨׳™׳�';
break;
case "vn":
//Bao Bao
//avRace = ['Tב»™c Romans', 'Tב»™c Teutons', 'Tב»™c Gauls'];
t['8'] = 'Liֳ×n minh';
t['SIM'] = 'Trב÷­n giב÷£';
t['QSURE'] = 'Bב÷¡n cֳ³ chב÷¯c chב÷¯n khֳ´ng?';
t['LOSS'] = 'Thב÷¥t bב÷¡i';
t['PROFIT'] = 'Tiב»�n lֳ£i';
t['EXTAV'] = 'Mב»� rב»™ng';
t['PLAYER'] = 'Ngֶ°ב»�i chֶ¡i';
t['VILLAGE'] = 'Lֳ ng';
t['POPULATION'] = 'Dֳ¢n sב»‘';
t['COORDS'] = 'Tב»�a ִ‘ב»™';
t['MAPTBACTS'] = 'Cֳ´ng viב»‡c';
t['SAVED'] = 'ִ�ֳ£ ghi';
t['YOUNEED'] = 'Bב÷¡n cב÷§n';
t['TODAY'] = 'hֳ´m nay';
t['TOMORROW'] = 'ngֳ y mai';
t['DAYAFTERTOM'] = 'ngֳ y kia';
t['MARKET'] = 'Chב»£';
t['BARRACKS'] = 'Doanh trב÷¡i';
t['RAP'] = 'Gב»­i lֳ­nh';
t['STABLE'] = 'Chuב»“ng ngב»±a';
t['WORKSHOP'] = 'Xֶ°ב»�ng';
t['SENDRES'] = 'Gב»­i tֳ i nguyֳ×n';
t['COMPRAR'] = 'Mua';
t['SELL'] = 'Bֳ¡n';
t['SENDIGM'] = 'Gב»­i IGM';
t['LISTO'] = 'Cֳ³ sב÷µn';
t['ON'] = 'bב÷­t';
t['AT'] = 'lֳ÷c';
t['EFICIENCIA'] = 'Efficiency';
t['NEVER'] = 'Never';
t['ALDEAS'] = 'Lֳ ng';
t['TIEMPO'] = 'Thב»�i gian';
t['OFREZCO'] = 'Tב÷·ng';
t['BUSCO'] = 'Tֳ¬m kiב÷¿m';
t['TIPO'] = 'Loב÷¡i';
t['DISPONIBLE'] = 'Chב»‰ cֳ³ sב÷µn';
t['CUALQUIERA'] = 'Bב÷¥t kב»³';
t['YES'] = 'Cֳ³';
t['NO'] = 'Khֳ´ng';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Bookmarks';
t['ANYADIR'] = 'Thֳ×m';
t['UBU'] = 'New Bookmark URL';
t['UBT'] = 'New Bookmark Text';
t['DEL'] = 'Xֳ³a';
t['MAPA'] = 'Bב÷£n ִ‘ב»“';
t['MAXTIME'] = 'Thב»�i gian tב»‘i ִ‘a';
t['ARCHIVE'] = 'Lֶ°u trב»¯';
t['SUMMARY'] = 'Tֳ³m tב÷¯t';
t['TROPAS'] = 'Lֳ­nh';
t['CHKSCRV'] = 'Cב÷­p nhב÷­t TBeyond';
t['ACTUALIZAR'] = 'Cב÷­p  nhב÷­t thֳ´ng tin lֳ ng';
t['VENTAS'] = 'ִ�ב»� nghב»‹ ִ‘ֳ£ lֶ°u';
t['MAPSCAN']  = 'Tֳ¬m bב÷£n ִ‘ב»“';
t['BIC'] = 'Hiב»‡n thב»‹ cֳ¡c biב»ƒu tֶ°ב»£ng mב»� rב»™ng';
t['22'] = 'Hiב»‡n bב÷£ng ghi chֳ÷';
t['SAVE'] = 'Ghi';
t['49'] = 'Hoב÷¡t ִ‘ב»™ng mב÷·c ִ‘ב»‹nh cב»§a binh trֶ°ב»�ng';
t['AT2'] = 'Tiב÷¿p viב»‡n';
t['AT3'] = 'Tב÷¥n cֳ´ng: Bֳ¬nh thֶ°ב»�ng';
t['AT4'] = 'Tב÷¥n cֳ´ng: Cֶ°ב»›p bֳ³c';
t['24'] = 'Kֳ­ch thֶ°ב»›c bב÷£ng ghi chֳ÷';
t['NBSA'] = 'Tב»± ִ‘ב»™ng';
t['NBSN'] = 'Bֳ¬nh thֶ°ב»�ng (nhב»�)';
t['NBSB'] = 'Mֳ n hֳ¬nh lב»›n (lב»›n)';
t['25'] = 'Chiב»�u cao bב÷£ng ghi chֳ÷';
t['NBHAX'] = 'Chiב»�u cao mב»� rב»™ng tב»± ִ‘ב»™ng';
t['NBHK'] = 'Chiב»�u cao mב÷·c ִ‘ב»‹nh';
t['43'] = 'Hiב»‡n thב»‹ sב»‘ ב»� giב»¯a';
t['NPCSAVETIME'] = 'Ghi: ';
t['38'] = 'Hiב»‡n thב»‹ mֳ u cב÷¥p cב»§a tֳ i nguyֳ×n';
t['44'] = 'Hiב»‡n thב»‹ mֳ u cב÷¥p cב»§a kiב÷¿n trֳ÷c';
t['65'] = 'Mֳ u nֳ¢ng cב÷¥p<br>(Mב÷·c ִ‘ב»‹nh = Rב»—ng)';
t['66'] = 'Mֳ u cב÷¥p lב»›n nhב÷¥t<br>(Mב÷·c ִ‘ב»‹nh = Rב»—ng)';
t['67'] = 'Mֳ u nֳ¢ng cב÷¥p chֶ°a khi chֶ°a ִ‘ב»§<br>(Mב÷·c ִ‘ב»‹nh = Rב»—ng)';
t['68'] = 'Mֳ u nֳ¢ng cב÷¥p bב÷±ng NPC<br>(Mב÷·c ִ‘ב»‹nh = Rב»—ng)';
t['TOTALTROOPS'] = 'Tב»•ng lֳ­nh trong lֳ ng';
t['20'] = 'Hiב»‡n thב»‹ bookmarks';
t['U.2'] = 'Chב»§ng tב»™c';
t['1'] = "Travian v2.x server";
t['SELECTALLTROOPS'] = "Chב»�n tב÷¥t cב÷£ lֳ­nh";
t['PARTY'] = "Lב»…";
t['CPPERDAY'] = "CP/ngֳ y";
t['SLOT'] = "Vב»‹ trֳ­";
t['TOTAL'] = "Tב»•ng";
t['SELECTSCOUT'] = "Lב»±a chב»�n trinh thֳ¡m";
t['SELECTFAKE'] = "Lב»±a chב»�n giב÷£";
t['NOSCOUT2FAKE'] = "Khֳ´ng thב»ƒ sב»­ dב»¥ng trinh thֳ¡m cho trב÷­n giב÷£ !";
t['NOTROOP2FAKE'] = "Khֳ´ng cֳ³ lֳ­nh cho trב÷­n giב÷£!";
t['NOTROOP2SCOUT'] = "Khֳ´ng cֳ³ lֳ­nh ִ‘ב»ƒ do thֳ¡m !";
t['NOTROOPS'] = "Khֳ´ng cֳ³ lֳ­nh trong lֳ ng !";
t['ALL'] = "Tב÷¥t cב÷£";
t['SH2'] = "Trong cֳ¡c trֶ°ב»�ng mֳ u, bב÷¡n cֳ³ thב»ƒ chב»�n:<br>- <b>xanh lֳ¡ cֳ¢y</b> or <b>ִ‘ב»�</b> or  <b>da cam</b>, etc.<br>- mֳ£ HEX giב»‘ng nhֶ° <b>#004523</b><br>- leave empty for the default color";
t['SOREP'] = "Hiב»‡n thב»‹ bֳ¡o cֳ¡o gב»‘c (cho thֳ´ng bֳ¡o)";
t['56'] = "Hiב»‡n thב»‹ ֳ´ thֳ´ng tin loב÷¡i/ב»‘c ִ‘ב÷£o<br>khi di chuב»™t qua bב÷£n ִ‘ב»“";
t['10'] = "Liֳ×n kב÷¿t trב÷­n giב÷£ ִ‘ב»ƒ sב»­ dב»¥ng:";
t['WSIMO1'] = "Nב»™i ִ‘ב»‹a (do game cung cב÷¥p)";
t['WSIMO2'] = "Bֳ×n ngoֳ i (do kirilloid.ru cung cב÷¥p)";
t['27'] = "Sב»­ dב»¥ng bב»™ phֳ¢n tֳ­ch thב÷¿ giב»›i";
t['28'] = "Hiב»‡n thב»‹ liֳ×n kב÷¿t thֳ´ng kֳ× bב»™ phֳ¢n tֳ­ch";
t['NONEWVER'] = "Phiֳ×n bב÷£n mב»›i ִ‘ֳ£ cֳ³";
t['BVER'] = "Bב÷¡n cֳ³ thב»ƒ sב»­ dב»¥ng bב÷£ng beta";
t['NVERAV'] = "Phiֳ×n bב÷£n mב»›i cב»§a script ִ‘ֳ£ cֳ³";
t['UPDSCR'] = "Bב÷¡n cֳ³ muב»‘n cב÷­p nhב÷­t phiֳ×n bב÷£n mב»›i khֳ´ng ?";
t['CHECKUPDATE'] = "ִ�ang kiב»ƒm tra phiֳ×n bב÷£n mב»›i.<br>Xin chב»�...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Bֳ¬nh quֳ¢n dֳ¢n sב»‘ trֳ×n mב»™t lֳ ng";
t['AVPPP'] = "Bֳ¬nh quֳ¢n dֳ¢n sב»‘ trֳ×n mב»™t ngֶ°ב»�i chֶ¡i";
t['37'] = "Hiב»‡n thב»‹ bב÷£ng nֳ¢ng cב÷¥p tֳ i nguyֳ×n";
t['41'] = "Hiב»‡n thב»‹ bב÷£ng nֳ¢ng cב÷¥p kiב÷¿n trֳ÷c";
t['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0)";
t['48'] = "Sב»‘ lֶ°ב»£ng trang ִ‘ֶ°ב»£c tב÷£i ִ‘ב÷·t trֶ°ב»›c<br>trong khi giao dב»‹ch trֳ×n trang 'Chב»£ => Mua'<br>(Mב÷·c ִ‘ב»‹nh = 1)";
t['U.3'] = 'Tֳ×n thב»§ ִ‘ֳ´<br><b>Xem Profile cho cב÷­p nhב÷­t</b>';
t['U.6'] = 'Tב»�a ִ‘ב»™ thב»§ ִ‘ֳ´<br><b>Xem Profile cho cב÷­p nhב÷­t</b>';
t['MAX'] = 'Lב»›n nhב÷¥t';
t['TOTTRTR'] = 'Tב»•ng lֳ­nh ִ‘ang huב÷¥n luyב»‡n';
t['57'] = 'Hiב»‡n thב»‹ khoב÷£ng cֳ¡ch vֳ  thב»�i gian';
t['TB3SL'] = TB3O.shN + ' Cֳ i ִ‘ב÷·t';
t['UPDALLV'] = 'Cב÷­p nhב÷­t tב÷¥t cב÷£ cֳ¡c lֳ ng.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
t['9'] = "Hiב»‡n thב»‹ cֳ¡c liֳ×n kב÷¿t mב»� rב»™ng bֳ×n menu trֳ¡i<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Bב÷£n ִ‘ב»“ lב»›n';
t['USETHEMPR'] = 'Sב»­ dב»¥ng chֳ÷ng (tב»· lב»‡)';
t['USETHEMEQ'] = 'Sב»­ dב»¥ng (bב÷±ng)';
t['TOWNHALL'] = 'Tֳ²a thב»‹ chֳ­nh';
t['GSRVT'] = 'Game server';
t['ACCINFO'] = 'Thֳ´ng tin tֳ i khoב÷£n';
t['NBO'] = 'Bב÷£ng ghi chֳ÷';
t['MNUL'] = 'Menu hiב»‡n thב»‹ bֳ×n trֳ¡i';
t['STAT'] = 'Thב»‘ng kֳ×';
t['RESF'] = 'Ruב»™ng tֳ i nguyֳ×n';
t['VLC'] = 'Trung tֳ¢m lֳ ng';
t['MAPO'] = 'Tֳ¹y chב»‰nh bב÷£n ִ‘ב»“';
t['COLO'] = 'Tֳ¹y chב»‰nh mֳ u';
t['DBGO'] = 'Debug options';
t['4'] = 'Chב»£';
t['5'] = 'Binh trֶ°ב»�ng/Doanh trב÷¡i/Xֶ°ב»�ng/Chuב»“ng ngב»±a';
t['6'] = "Tֳ²a thב»‹ chֳ­nh/Lֳ¢u ִ‘ֳ i tֶ°ב»›ng/Lֳ² luyב»‡n giֳ¡p/Lֳ² rֳ¨n";
t['HEROSMANSION'] = "Lֳ¢u ִ‘ֳ i tֶ°ב»›ng";
t['BLACKSMITH'] = 'Lֳ² rֳ¨n';
t['ARMOURY'] = 'Lֳ² luyב»‡n giֳ¡p';
t['NOW'] = 'Bֳ¢y giב»�';
t['CLOSE'] = 'ִ�ֳ³ng';
t['USE'] = 'Sב»­ dב»¥ng';
t['USETHEM1H'] = 'Sב»­ dב»¥ng (1 giב»� sב÷£n lֶ°ב»£ng)';
t['OVERVIEW'] = 'Tב»•ng quֳ¡t';
t['FORUM'] = 'Diב»…n ִ‘ֳ n';
t['ATTACKS'] = 'Tב÷¥n cֳ´ng';
t['NEWS'] = 'Tin tב»©c';
t['ADDCRTPAGE'] = 'Thֳ×m trang ִ‘ang xem vֳ o bookmarks';
t['SCRPURL'] = 'TBeyond trang';
t['50'] = 'Sב»‘ lֶ°ב»£ng trinh sֳ¡t sב»­ dב»¥ng cho chב»©c nִƒng<br>"Lב»±a chב»�n trinh sֳ¡t"';
t['SPACER'] = 'Dב÷¥u cֳ¡ch';
t['53'] = 'Hiב»‡n thב»‹ thֳ´ng tinh lֳ­nh trong tooltips';
t['MEREO'] = 'Tin nhב÷¯n & Bֳ¡o cֳ¡o';
t['59'] = 'Sב»‘ tin nhב÷¯n/trang bֳ¡o cֳ¡o ִ‘ב»ƒ tב÷£i trֶ°ב»›c<br>(Default = 1)';
t['ATTABLES'] = 'Cֳ¡c bב÷£ng lֳ­nh';
t['MTW'] = 'Wasted';
t['MTX'] = 'Exceeding';
t['MTC'] = 'Tב÷£i hiב»‡n tב÷¡i';
t['ALFL'] = 'Liֳ×n kב÷¿t tב»›i diב»…n ִ‘ֳ n ngoֳ i<br>(ִ�ב»ƒ trב»‘ng lֳ  mב÷·c ִ‘ב»‹nh diב»…n ִ‘ֳ n cב»§a game)';
t['82.L'] = 'Khֳ³a bookmarks (ב÷¨n cֳ¡c biב»ƒu tֶ°ב»�ng xֳ³a, di chuyב»ƒn lֳ×n, di chuyב»ƒn xuב»‘ng)';
t['MTCL'] = 'Xֳ³a tב÷¥t cב÷£';
t['82.U'] = 'Mב»� khֳ³a bookmarks (Hiב»‡n cֳ¡c biב»ƒu tֶ°ב»�ng xֳ³a, di chuyב»ƒn lֳ×n, di chuyב»ƒn xuב»‘ng)';
t['CKSORT'] = 'Click ִ‘ב»ƒ sב÷¯p xב÷¿p';
t['MIN'] = 'ֳ�t nhב÷¥t';
t['SVGL'] = 'Chia sב÷½ cֳ¡c lֳ ng ב»� giב»¯a';
t['VGL'] = 'Danh sֳ¡ch lֳ ng';
t['12'] = "Hiב»‡n cֳ¡c liֳ×n kב÷¿t 'dorf1.php' and 'dorf2.php'";
t['UPDATEPOP'] = 'Cב÷­p nhב÷­t dֳ¢n sב»‘';
t['54'] = 'Hiב»‡n thב»‹ khoב÷£ng cֳ¡ch vֳ  thב»�i gian tב»›i lֳ ng trong tooltips';
t['EDIT'] = 'Sב»­a';
t['NPCO'] = 'Tֳ¹y chב»‰nh NPC trב»£ giֳ÷p';
t['26'] = 'Hiב»‡n thב»‹ cֳ¡c liֳ×n kב÷¿t/tֳ­nh toֳ¡n NPC trב»£ giֳ÷p';
t['58'] = 'Hiב»‡n thב»‹ bב÷£ng ngֶ°ב»�i chֶ¡i/lֳ ng/ב»‘c ִ‘ב÷£o ִ‘ב÷§y';
t['NEWVILLAGEAV'] = 'Ngֳ y/Thב»�i gian';
t['TIMEUNTIL'] = 'Thב»�i gian chב»�';
t['61'] = 'Hiב»‡n thב»‹ bב÷£ng "Xֳ³a tב÷¥t cב÷£" trֳ×n trang Bֳ¡o cֳ¡o';
t['62'] = 'Cֵ©ng hiב»‡n thב»‹ biב»ƒu tֶ°ב»�ng "Gב»­i IGM"';
t['CENTERMAP'] = 'Trung tֳ¢m bב÷£n ִ‘ב»“';
t['13'] = 'Hiב»‡n thב»‹ biב»ƒu tֶ°ב»�ng "Trung tֳ¢m bב÷£n ִ‘ב»“"';
t['SENDTROOPS'] = 'Gב»­i lֳ­nh';
t['64'] = 'Hiב»‡n thב»‹ chi tiב÷¿t trong Thב»‘ng kֳ×';
t['7'] = "Cung ִ‘iב»‡n/Dinh thב»±/Hב»�c viב»‡n/Kho bב÷¡c";
t['PALACE'] = "Cung ִ‘iב»‡n";
t['RESIDENCE'] = "Dinh thב»±";
t['ACADEMY'] = "Hב»�c viב»‡n";
t['TREASURY'] = "Kho bב÷¡c";
t['45'] = "Hiב»‡n thב»‹ nhב÷¥p nhֳ¡y cב÷¥p ִ‘ב»™ kiב÷¿n trֳ÷c ִ‘ang ִ‘ֶ°ב»£c nֳ¢ng cב÷¥p";
t['14'] = "Hiב»‡n thב»‹ biב»ƒu tֶ°ב»£ng 'Gב»­i lֳ­nh/Gב»­i tֳ i nguyֳ×n' trong danh sֳ¡ch lֳ ng";
t['34'] = "Hiב»‡n thב»‹ thֳ´ng tin CP/ngֳ y trong bב÷£ng nֳ¢ng cב÷¥p";
t['UPGTB'] = "Bב÷£ng nֳ¢ng cב÷¥p Ruב»™ng tֳ i nguyֳ×n/kiב÷¿n trֳ÷c";
t['35'] = "Hiב»‡n thב»‹ tiֳ×u thב»¥ trong bב÷£ng nֳ¢ng cב÷¥p";
t['16'] = "Hiב»‡n thב»‹ sב÷£n lֶ°ב»£ng thב»±c sב»± trong danh sֳ¡ch lֳ ng";
t['RBTT'] = "Tֳ³m tב÷¯t tֳ i nguyֳ×n";
t['39'] = "Hiב»‡n thב»‹ bב÷£ng 'Tֳ³m tב÷¯t tֳ i nguyֳ×n'";
t['40'] = "Hiב»‡n thב»‹ bב÷£ng 'Tֳ³m tב÷¯t tֳ i nguyֳ×n' nhֶ° lֳ  cב»­a sב»• cֳ³ thב»ƒ di chuyב»ƒn ִ‘ֶ°ב»£c";
t['21'] = "Hiב»‡n thב»‹ 'User Bookmarks' nhֶ° lֳ  cב»­a sב»• di chuyב»ƒn ִ‘ֶ°ב»£c";
t['23'] = "Hiב»‡n thב»‹ 'Bב÷£ng ghi chֳ÷' nhֶ° lֳ  cב»­a sב»• di chuyב»ƒn ִ‘ֶ°ב»£c";
t['17'] = "Hiב»‡n thב»‹ dֳ¢n sב»‘ trong danh sֳ¡ch lֳ ng";
t['29'] = 'Bב»™ phֳ¢n tֳ­ch bב÷£n ִ‘ב»“ ִ‘ב»ƒ sב»­ dב»¥ng';
t['30'] = 'Hiב»‡n thב»‹ cֳ¡c liֳ×n kב÷¿t tב»›i bב÷£n ִ‘ב»“ cho cֳ¡c user';
t['31'] = 'Hiב»‡n thב»‹ cֳ¡c liֳ×n kב÷¿t tב»›i bב÷£n ִ‘ב»“ cho cֳ¡c liֳ×n minh';
t['63'] = 'Hiב»‡n thב»‹ Bֳ¡o cֳ¡o trב÷­n ִ‘ֳ¡nh tִƒng cֶ°ב»�ng TB3';
t['18'] = 'Hiב»‡n thב»‹ thֳ×m danh sֳ¡ch  lֳ ng (2 cב»™t) nhֶ° lֳ  cב»­a sב»• di chuyב»ƒn ִ‘ֶ°ב»£c';
t['60'] = 'Hiב»‡n thב»‹ liֳ×n kב÷¿t ִ‘ב»ƒ mב»� tin nhב÷¯n/bֳ¡o cֳ¡o trong cב»­a sב»• pop-up';
t['42'] = 'Sב÷¯p xב÷¿p kiב÷¿n trֳ÷c theo tֳ×n trong bב÷£ng nֳ¢ng cב÷¥p';
t['19'] = 'Hiב»‡n thב»‹ thֳ´ng tin vב»� tiב÷¿n ִ‘ב»™ xֳ¢y dב»±ng kiב÷¿n trֳ÷c vֳ  di chuyב»ƒn lֳ­nh <br>ב»� danh sֳ¡ch lֳ ng';
t['32'] = "Hiב»‡n thב»‹ 'Thanh tֳ¬m kiב÷¿m'";
t['3'] = 'Force T3.1 Legionnaire & Phalanx capacity calculation<br>(for mixed T3.1 & T3.5 servers)';
t['33'] = "Hiב»‡n thב»‹ 'Thanh tֳ¬m kiב÷¿m' nhֶ° lֳ  cב»­a sב»• di chuyב»ƒn ִ‘ֶ°ב»£c";
t['36'] = "Hiב»‡n thב»‹ tֳ­nh toֳ¡n 'ִ�ב÷¿n khi/Cֳ²n lב÷¡i' trong bב÷£ng nֳ¢ng cב÷¥p/huב÷¥n luyב»‡n";
t['RESIDUE'] = 'Cֳ²n lב÷¡i nב÷¿u bב÷¡n xֳ¢y dב»±ng kiב÷¿n trֳ÷c nֳ y';
t['RESOURCES'] = 'Tֳ i nguyֳ×n';
t['SH1'] = "Mב»� profile cב»§a bב÷¡n ִ‘ב»ƒ tב»± ִ‘ב»™ng phֳ¡t hiב»‡n thב»§ ִ‘ֳ´/tב»�a ִ‘ב»™<br>Xֳ¢y dב»±ng doanh trב÷¡i ִ‘ב»ƒ tב»± ִ‘ב»™ng phֳ¡t hiב»‡n chב»§ng tב»™c vֳ  sau ִ‘ֳ³ mב»� trung tֳ¢m lֳ ng";
t['46'] = "Hiב»ƒn thב»‹ thֳ´ng tin bב»• sung cho tב÷¥t cב÷£ cֳ¡c thֶ°ֶ¡ng gia ִ‘ב÷¿n";
t['2'] = 'Hב»§y bב»� quב÷£ng cֳ¡o biב»ƒu ngב»¯';
t['15'] = "Hiב»ƒn thב»‹ gב»—, ִ‘ב÷¥t sֳ©t, sב÷¯t sב÷£n xuב÷¥t cho mב»—i giב»� trong danh sֳ¡ch lֳ ng";
t['11'] = "Liֳ×n kב÷¿t ִ‘ב»ƒ sב»­ dב»¥ng cho cֳ¡c trang web ִ‘ִƒng tב÷£i cֳ¡c bֳ¡o cֳ¡o";
break;
case "th":
//avRace = ['א¹‚א¸£א¸¡א¸±א¸™א¸×א¹�', 'א¸—א¸¹א¸—א¸±א¹ˆא¸™א¸×א¹�', 'א¸�א¸­א¸¥א¸×א¹�'];
t['8'] = 'א¸�א¸±א¸™א¸˜א¸¡א¸´א¸•א¸£';
t['SIM'] = 'א¸ˆא¸³א¸¥א¸­א¸‡א¸�א¸²א¸£א¸•א¹ˆא¸­א¸×א¸¹א¹‰';
t['QSURE'] = 'א¹�א¸™א¹ˆא¹ƒא¸ˆא¸™א¸°?';
t['LOSS'] = 'א¸„א¸§א¸²א¸¡א¹€א¸×א¸µא¸¢א¸«א¸²א¸¢';
t['PROFIT'] = 'א¸�א¸³א¹„א¸£';
t['EXTAV'] = 'א¸�א¸£א¹‰א¸­א¸¡א¸‚א¸¢א¸²א¸¢';
t['PLAYER'] = 'א¸�א¸¹א¹‰א¹€א¸¥א¹ˆא¸™';
t['VILLAGE'] = 'א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™';
t['POPULATION'] = 'א¸›א¸£א¸°א¸�א¸²א¸�א¸£';
t['COORD'] = 'א¸�א¸´א¸�א¸±א¸”';
t['MAPTBACTS'] = 'א¸�א¸²א¸£א¸”א¸³א¹€א¸™א¸´א¸™א¸�א¸²א¸£';
t['SAVED'] = 'Saved';
t['YOUNEED'] = 'א¸„א¸¸א¸“א¸•א¹‰א¸­א¸‡א¸�א¸²א¸£';
t['TODAY'] = 'א¸§א¸±א¸™א¸™א¸µא¹‰';
t['TOMORROW'] = 'א¸§א¸±א¸™א¸�א¸£א¸¸א¹ˆא¸‡א¸™א¸µא¹‰';
t['DAYAFTERTOM'] = 'א¸§א¸±א¸™א¸¡א¸°א¸£א¸·א¸™א¸™א¸µא¹‰';
t['MARKET'] = 'א¸•א¸¥א¸²א¸”א¸×א¸´א¸™א¸„א¹‰א¸²';
t['BARRACKS'] = 'א¸„א¹ˆא¸²א¸¢א¸—א¸«א¸²א¸£';
t['RAP'] = 'א¸ˆא¸¸א¸”א¸£א¸§א¸¡א¸�א¸³א¸¥א¸±א¸‡א¸�א¸¥';
t['STABLE'] = 'א¹‚א¸£א¸‡א¸¡א¹‰א¸²';
t['WORKSHOP'] = 'א¸«א¹‰א¸­א¸‡א¹€א¸„א¸£א¸·א¹ˆא¸­א¸‡';
t['SENDRES'] = 'א¸×א¹ˆא¸‡א¸—א¸£א¸±א¸�א¸¢א¸²א¸�א¸£';
t['BUY'] = 'א¸‹א¸·א¹‰א¸­';
t['SELL'] = 'א¸‚א¸²א¸¢';
t['SENDIGM'] = 'א¸×א¹ˆא¸‡ IGM';
t['LISTO'] = 'א¸�א¸£א¹‰א¸­א¸¡';
t['ON'] = 'א¸§א¸±א¸™א¸—א¸µא¹ˆ';
t['AT'] = 'א¸“ א¹€א¸§א¸¥א¸²';
t['EFICIENCIA'] = 'א¸›א¸£א¸°א¸×א¸´א¸—א¸˜א¸´א¸�א¸¥';
t['NEVER'] = 'א¹„א¸¡א¹ˆא¸¡א¸µא¸—א¸²א¸‡';
t['ALDEAS'] = 'א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™';
t['TIEMPO'] = 'א¹€א¸§א¸¥א¸²';
t['OFREZCO'] = 'א¸×א¸´א¹ˆא¸‡א¸—א¸µא¹ˆא¹€א¸×א¸™א¸­';
t['BUSCO'] = 'א¸×א¸´א¹ˆא¸‡א¸—א¸µא¹ˆא¸•א¹‰א¸­א¸‡א¸�א¸²א¸£';
t['TIPO'] = 'א¸£א¸¹א¸›א¹�א¸�א¸�';
t['DISPONIBLE'] = 'א¸�א¸£א¹‰א¸­א¸¡א¹€א¸—א¹ˆא¸²א¸™א¸±א¹‰א¸™';
t['CUALQUIERA'] = 'א¸—א¸±א¹‰א¸‡א¸«א¸¡א¸”';
t['YES'] = 'א¹ƒא¸�א¹ˆ';
t['NO'] = 'א¹„א¸¡א¹ˆא¹ƒא¸�א¹ˆ';
t['LOGIN'] = 'א¹€א¸‚א¹‰א¸²א¸×א¸¹א¹ˆא¸£א¸°א¸�א¸�';
t['MARCADORES'] = 'א¸�א¸¸א¹�א¸„א¸¡א¸²א¸£א¹�א¸„';
t['ANYADIR'] = 'א¹€א¸�א¸´א¹ˆא¸¡';
t['UBU'] = 'URL א¸�א¸¸א¹�א¸„א¸¡א¸²א¸£א¹�א¸„א¹ƒא¸«א¸¡א¹ˆ';
t['UBT'] = 'א¸‚א¹‰א¸­א¸„א¸§א¸²א¸¡א¸�א¸¸א¹�א¸„א¸¡א¸²א¸£א¹�א¸„א¹ƒא¸«א¸¡א¹ˆ';
t['DEL'] = 'א¸¥א¸�';
t['MAPA'] = 'א¹�א¸�א¸™א¸—א¸µא¹ˆ';
t['MAXTIME'] = 'א¹€א¸§א¸¥א¸²א¸×א¸¹א¸‡א¸×א¸¸א¸”';
t['ARCHIVE'] = 'א¹€א¸­א¸�א¸×א¸²א¸£א¸×א¸³א¸„א¸±א¸�';
t['SUMMARY'] = 'א¸×א¸£א¸¸א¸›';
t['TROPAS'] = 'א¸�א¸­א¸‡א¸�א¸³א¸¥א¸±א¸‡';
t['CHKSCRV'] = 'א¸›א¸£א¸±א¸�א¸›א¸£א¸¸א¸‡ TBeyond';
t['ACTUALIZAR'] = 'א¸›א¸£א¸±א¸‡א¸›א¸£א¸¸א¸‡א¸‚א¹‰א¸­א¸¡א¸¹א¸¥א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™';
t['VENTAS'] = 'Saved Offers';
t['MAPSCAN'] = 'Scan א¹�א¸�א¸™א¸—א¸µא¹ˆ';
t['BIC'] = 'א¹�א¸×א¸”א¸‡ extended icons';
t['22'] = 'א¹�א¸×א¸”א¸‡א¸�א¸¥א¹ˆא¸­א¸‡א¸‚א¹‰א¸­א¸„א¸§א¸²א¸¡';
t['SAVE'] = 'א¸�א¸±א¸™א¸—א¸¶א¸�';
t['AT2'] = 'א¸×א¹ˆא¸‡א¸�א¸­א¸‡א¸�א¸³א¸¥א¸±א¸‡א¹€א¸×א¸£א¸´א¸¡';
t['AT3'] = 'א¹‚א¸ˆא¸¡א¸•א¸µ: א¸›א¸�א¸•א¸´';
t['AT4'] = 'א¹‚א¸ˆא¸¡א¸•א¸µ: א¸›א¸¥א¹‰א¸™';
t['24'] = 'א¸‚א¸™א¸²א¸”א¸�א¸¥א¹ˆא¸­א¸‡א¸‚א¹‰א¸­א¸„א¸§א¸²א¸¡';
t['NBSA'] = 'א¸­א¸±א¸•א¹‚א¸™א¸¡א¸±א¸•א¸´';
t['NBSN'] = 'א¸›א¸�א¸•א¸´ (א¹€א¸¥א¹‡א¸�)';
t['NBSB'] = 'א¸ˆא¸­א¸‚א¸™א¸²א¸”א¹ƒא¸«א¸�א¹ˆ (א¹ƒא¸«א¸�א¹ˆ)';
t['25'] = 'א¸�א¸¥א¹ˆא¸­א¸‡א¸‚א¹‰א¸­א¸„א¸§א¸²א¸¡ height';
t['NBHAX'] = 'א¸‚א¸¢א¸²א¸¢א¸„א¸§א¸²א¸¡א¸×א¸¹א¸‡א¸­א¸±א¸•א¹‚א¸™א¸¡א¸±א¸•א¸´';
t['NBHK'] = 'א¸„א¸§א¸²א¸¡א¸×א¸¹א¸‡א¸›א¸�א¸•א¸´';
t['NPCSAVETIME'] = 'א¸›א¸£א¸°א¸«א¸¢א¸±א¸”א¹€א¸§א¸¥א¸²: ';
t['65'] = 'Color upgrade available<br>(א¸›א¸�א¸•א¸´ = א¸§א¹ˆא¸²א¸‡)';
t['66'] = 'Color max level<br>(א¸›א¸�א¸•א¸´ = א¸§א¹ˆא¸²א¸‡)';
t['67'] = 'Color upgrade not possible<br>(א¸›א¸�א¸•א¸´ = א¸§א¹ˆא¸²א¸‡)';
t['68'] = 'Color upgrade via NPC<br>(א¸›א¸�א¸•א¸´ = א¸§א¹ˆא¸²א¸‡)';
t['TOTALTROOPS'] = 'א¸�א¸­א¸‡א¸�א¸³א¸¥א¸±א¸‡א¸‚א¸­א¸‡א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™א¸—א¸±א¹‰א¸‡א¸«א¸¡א¸”';
t['20'] = 'א¹�א¸×א¸”א¸‡א¸�א¸¸א¹�א¸„א¸¡א¸²א¸£א¹�א¸„';
t['U.2'] = 'א¹€א¸�א¹ˆא¸²';
t['SELECTALLTROOPS'] = "א¹€א¸¥א¸·א¸­א¸�א¸�א¸­א¸‡א¸�א¸³א¸¥א¸±א¸‡א¸—א¸±א¹‰א¸‡א¸«א¸¡א¸”";
t['PARTY'] = "א¸�א¸²א¸£א¹€א¸‰א¸¥א¸´א¸¡א¸‰א¸¥א¸­א¸‡";
t['CPPERDAY'] = "CP/א¸§א¸±א¸™";
t['SLOT'] = "א¸�א¹ˆא¸­א¸‡";
t['TOTAL'] = "א¸£א¸§א¸¡";
t['SELECTSCOUT'] = "א¹€א¸¥א¸·א¸­א¸�א¸«א¸™א¹ˆא¸§א¸¢א¸×א¸­א¸”א¹�א¸™א¸¡";
t['SELECTFAKE'] = "א¹€א¸¥א¸·א¸­א¸�א¹‚א¸ˆא¸¡א¸•א¸µא¸«א¸¥א¸­א¸�";
t['NOSCOUT2FAKE'] = "א¸¡א¸±א¸™א¹€א¸›א¹‡א¸™א¹„א¸›א¹„א¸¡א¹ˆא¹„א¸”א¹‰א¸—א¸µא¹ˆא¸ˆא¸°א¹ƒא¸�א¹‰א¸«א¸™א¹ˆא¸§א¸¢א¸×א¸­א¸”א¹�א¸™א¸¡א¸×א¸³א¸«א¸£א¸±א¸�א¸�א¸²א¸£א¹‚א¸ˆא¸¡א¸•א¸µא¸«א¸¥א¸­א¸� !";
t['NOTROOP2FAKE'] = "א¹„א¸¡א¹ˆא¸¡א¸µא¸�א¸­א¸‡א¸�א¸³א¸¥א¸±א¸‡א¸×א¸³א¸«א¸£א¸±א¸�א¸×א¸´א¹ˆא¸‡א¸—א¸µא¹ˆא¹‚א¸ˆא¸¡א¸•א¸µ!";
t['NOTROOP2SCOUT'] = "א¹„א¸¡א¹ˆא¸¡א¸µא¸«א¸™א¹ˆא¸§א¸¢א¸×א¸­א¸”א¹�א¸™א¸¡ !";
t['NOTROOPS'] = "א¹„א¸¡א¹ˆא¸¡א¸µא¸�א¸­א¸‡א¸�א¸³א¸¥א¸±א¸‡א¹ƒא¸™א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™ !";
t['ALL'] = "א¸—א¸±א¹‰א¸‡א¸«א¸¡א¸”";
t['SOREP'] = "א¹�א¸×א¸”א¸‡א¸£א¸²א¸¢א¸‡א¸²א¸™א¹�א¸�א¸�א¹€א¸”א¸´א¸¡ (for posting)";
t['56'] = "א¹�א¸×א¸”א¸‡א¸‚א¹‰א¸­א¸¡א¸¹א¸¥ א¸›א¸£א¸°א¹€א¸ א¸—א¸‚א¸­א¸‡cellא¸«א¸£א¸·א¸­א¹‚א¸­א¹€א¸­א¸‹א¸´א¸×<br>א¸‚א¸“א¸°א¸—א¸µא¹ˆא¹€א¸¡א¸²א¸×א¹�א¸­א¸¢א¸¹א¹ˆא¸�א¸™א¹�א¸�א¸™א¸—א¸µא¹ˆ";
t['10'] = "א¹ƒא¸�א¹‰א¸¥א¸´א¹‰א¸‡א¸„א¹�א¸ˆא¸³א¸¥א¸­א¸‡א¸�א¸²א¸£א¸•א¹ˆא¸­א¸×א¸¹א¹‰:<br>(א¹€א¸¡א¸™א¸¹א¸”א¹‰א¸²א¸™א¸‹א¹‰א¸²א¸¢)";
t['WSIMO1'] = "א¸ א¸²א¸¢א¹ƒא¸™ (provided by the game)";
t['WSIMO2'] = "א¸ א¸²א¸¢א¸™א¸­א¸� (provided by kirilloid.ru)";
t['27'] = "א¹ƒא¸�א¹‰ World Analyser";
t['28'] = "א¹�א¸×א¸”א¸‡א¸¥א¸´א¹‰א¸‡א¸„א¹� analyser statistic";
t['UPDSCR'] = "א¸›א¸£א¸±א¸�א¸›א¸£א¸¸א¸‡ script א¹€א¸”א¸µא¹‹א¸¢א¸§א¸™א¸µא¹‰?";
t['CHECKUPDATE'] = "א¸�א¸³א¸¥א¸±א¸‡א¸›א¸£א¸±א¸�א¸›א¸£א¸¸א¸‡ script. א¸�א¸£א¸¸א¸“א¸²א¸£א¸­א¸×א¸±א¸�א¸„א¸£א¸¹א¹ˆ...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "א¸›א¸£א¸°א¸�א¸²א¸�א¸£א¹€א¸‰א¸¥א¸µא¹ˆא¸¢א¸•א¹ˆא¸­א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™";
t['AVPPP'] = "א¸›א¸£א¸°א¸�א¸²א¸�א¸£א¹€א¸‰א¸¥א¸µא¹ˆא¸¢א¸•א¹ˆא¸­א¸�א¸¹א¹‰א¹€א¸¥א¹ˆא¸™";
t['69'] = "Console Log Level<br>א¸×א¸³א¸«א¸£א¸±א¸� PROGRAMMERS א¸«א¸£א¸·א¸­ DEBUGGING א¹€א¸—א¹ˆא¸²א¸™א¸±א¹‰א¸™<br>(א¸›א¸�א¸•א¸´ = 0)";
t['48'] = "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(א¸›א¸�א¸•א¸´ = 1)";
t['U.3'] = 'א¸�א¸·א¹ˆא¸­א¹€א¸¡א¸·א¸­א¸‡א¸«א¸¥א¸§א¸‡א¸‚א¸­א¸‡א¸„א¸¸א¸“<br>Visit your Profile for an update';
t['U.6'] = 'א¸�א¸´א¸�א¸±א¸”א¸‚א¸­א¸‡א¹€א¸¡א¸·א¸­א¸‡א¸«א¸¥א¸§א¸‡<br>Visit your Profile for an update';
t['MAX'] = 'א¸×א¸¹א¸‡א¸×א¸¸א¸”';
t['57'] = 'א¹�א¸×א¸”א¸‡א¸£א¸°א¸¢א¸°א¸—א¸²א¸‡א¹�א¸¥א¸°א¹€א¸§א¸¥א¸²';
t['LARGEMAP'] = 'א¹�א¸�א¸™א¸—א¸µא¹ˆא¸‚א¸™א¸²א¸”א¹ƒא¸«א¸�א¹ˆ';
t['TOWNHALL'] = 'א¸¨א¸²א¸¥א¸²א¸�א¸¥א¸²א¸‡';
t['ACCINFO'] = 'א¸‚א¹‰א¸­א¸¡א¸¹א¸¥א¸�א¸±א¸�א¸�א¸µ';
t['NBO'] = 'א¸�א¸¥א¹ˆא¸­א¸‡א¸‚א¹‰א¸­א¸„א¸§א¸²א¸¡';
t['MNUL'] = 'א¹€א¸¡א¸™א¸¹א¸”א¹‰א¸²א¸™א¸‹א¹‰א¸²א¸¢';
t['STAT'] = 'א¸×א¸–א¸´א¸•א¸´';
t['RESF'] = 'א¸�א¸·א¹‰א¸™א¸—א¸µא¹ˆא¸—א¸£א¸±א¸�א¸¢א¸²א¸�א¸£';
t['VLC'] = 'א¸¨א¸¹א¸™א¸¢א¹�א¸�א¸¥א¸²א¸‡א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™';
t['4'] = 'א¸•א¸¥א¸²א¸”';
t['5'] = 'א¸ˆא¸¸א¸”א¸£א¸°א¸”א¸¡א¸�א¸¥/א¸„א¹ˆא¸²א¸¢א¸—א¸«א¸²א¸£/א¸«א¹‰א¸­א¸‡א¹€א¸„א¸£א¸·א¹ˆא¸­א¸‡/א¹‚א¸£א¸‡א¸¡א¹‰א¸²';
t['6'] = "א¸¨א¸²א¸¥א¸²א¸�א¸¥א¸²א¸‡/א¸„א¸₪א¸«א¸²א¸×א¸™א¹�א¸‚א¸­א¸‡א¸®א¸µא¹‚א¸£א¹ˆ/א¸„א¸¥א¸±א¸‡א¹�א¸×א¸‡/א¸�א¹ˆא¸²א¸‡א¸•א¸µא¹€א¸«א¸¥א¹‡א¸�";
t['HEROSMANSION'] = "א¸„א¸₪א¸«א¸²א¸×א¸™א¹�א¸‚א¸­א¸‡א¸®א¸µא¹‚א¸£א¹ˆ";
t['BLACKSMITH'] = 'א¸�א¹ˆא¸²א¸‡א¸•א¸µא¹€א¸«א¸¥א¹‡א¸�';
t['ARMOURY'] = 'א¸„א¸¥א¸±א¸‡א¹�א¸×א¸‡';
t['NOW'] = 'א¹€א¸”א¸µא¹‹א¸¢א¸§א¸™א¸µא¹‰';
t['CLOSE'] = 'א¸›א¸´א¸”';
t['USE'] = 'א¹ƒא¸�א¹‰';
t['OVERVIEW'] = 'א¸ א¸²א¸�א¸£א¸§א¸¡';
t['FORUM'] = 'א¸�א¸­א¸£א¸±א¸¡';
t['ATTACKS'] = 'א¹‚א¸ˆא¸¡א¸•א¸µ';
t['NEWS'] = 'א¸‚א¹ˆא¸²א¸§';
t['ADDCRTPAGE'] = 'א¹€א¸�א¸´א¹ˆא¸¡א¸«א¸™א¹‰א¸²א¸›א¸±א¸ˆא¸ˆא¸¸א¸�א¸±א¸™';
t['SCRPURL'] = 'א¸«א¸™א¹‰א¸² TBeyond';
t['50'] = 'א¸ˆא¸³א¸™א¸§א¸™א¸‚א¸­א¸‡א¸«א¸™א¹ˆא¸§א¸¢א¸×א¸­א¸”א¹�א¸™א¸¡א¸×א¸³א¸«א¸£א¸±א¸�<br>א¸�א¸±א¸‡א¸�א¹�א¸�א¸±א¸™ "א¹€א¸¥א¸·א¸­א¸�א¸«א¸™א¹ˆא¸§א¸¢א¸×א¸­א¸”א¹�א¸™א¸¡"';
t['SPACER'] = 'א¸„א¸±א¹ˆא¸™';//Spacer
t['53'] = 'א¹�א¸×א¸”א¸‡א¸‚א¹‰א¸­א¸¡א¸¹א¸¥א¸�א¸­א¸‡א¸�א¸³א¸¥א¸±א¸‡א¹ƒא¸™ tooltips';
t['MEREO'] = 'א¸‚א¹ˆא¸²א¸§א¸×א¸²א¸£ & א¸£א¸²א¸¢א¸‡א¸²א¸™';
t['59'] = 'Number of message/report pages to preload<br>(Default = 1)';
t['ATTABLES'] = 'Troop tables';
t['MTW'] = 'א¹„א¸£א¹‰א¸›א¸£א¸°א¹‚א¸¢א¸�א¸™א¹�';
t['MTX'] = 'א¸¡א¸²א¸�א¸¡א¸²א¸¢';
t['MTC'] = 'Current load';
t['ALFL'] = 'Link to external forum<br>(Leave empty for internal forum)';
t['82.L'] = 'א¸¥א¹‡א¸­א¸„א¸�א¸¸א¹�א¸„א¸¡א¸²א¸£א¹�א¸„ (א¸‹א¹ˆא¸­א¸™א¸›א¸¸א¹ˆא¸¡ א¸¥א¸�, א¹€א¸¥א¸·א¹ˆא¸­א¸™א¸‚א¸¶א¹‰א¸™, א¹€א¸¥א¸·א¹ˆא¸­א¸™א¸¥א¸‡, א¹�א¸�א¹‰א¹„א¸‚)';
t['MTCL'] = 'א¸¥א¹‰א¸²א¸‡א¸—א¸±א¹‰א¸‡א¸«א¸¡א¸”';
t['82.U'] = 'א¸›א¸¥א¸”א¸¥א¹‡א¸­א¸„א¸�א¸¸א¹�א¸„א¸¡א¸²א¸£א¹�א¸„ (א¹�א¸×א¸”א¸‡א¸›א¸¸א¹ˆא¸¡ א¸¥א¸�, א¹€א¸¥א¸·א¹ˆא¸­א¸™א¸‚א¸¶א¹‰א¸™, א¹€א¸¥א¸·א¹ˆא¸­א¸™א¸¥א¸‡, א¹�א¸�א¹‰א¹„א¸‚)';
t['CKSORT'] = 'א¸„א¸¥א¸´א¸�א¹€א¸�א¸·א¹ˆא¸­א¸ˆא¸±א¸”א¹€א¸£א¸µא¸¢א¸‡';
t['MIN'] = 'א¸•א¹ˆא¸³א¸×א¸¸א¸”';
t['SVGL'] = 'א¹�א¸�א¹ˆא¸‡א¸£א¸°א¸«א¸§א¹ˆא¸²א¸‡א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™';
t['VGL'] = 'א¸£א¸²א¸¢א¸�א¸·א¹ˆא¸­א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™';
t['12'] = "א¹�א¸×א¸”א¸‡א¸¥א¸´א¹‰א¸‡א¸„א¹� 'dorf1.php' א¹�א¸¥א¸° 'dorf2.php'";
t['UPDATEPOP'] = 'א¸›א¸£א¸±א¸�א¸›א¸£א¸¸א¸‡א¸›א¸£א¸°א¸�א¸²א¸�א¸£';
t['54'] = 'א¹�א¸×א¸”א¸‡א¸£א¸°א¸¢א¸°א¸—א¸²א¸‡א¹�א¸¥א¸°א¹€א¸§א¸¥א¸²א¹„א¸›א¸–א¸¶א¸‡א¸«א¸¡א¸¹א¹ˆא¸�א¹‰א¸²א¸™א¹ƒא¸™ tooltips';
t['EDIT'] = 'א¹�א¸�א¹‰א¹„א¸‚';
t['NEWVILLAGEAV'] = 'א¸§א¸±א¸™א¸—א¸µא¹ˆ/א¹€א¸§א¸¥א¸²';
t['TIMEUNTIL'] = 'א¹€א¸§א¸¥א¸²א¸—א¸µא¹ˆא¸£א¸­';
t['61'] = 'א¹�א¸×א¸”א¸‡א¸•א¸²א¸£א¸²א¸‡ "א¸¥א¸�א¸—א¸±א¹‰א¸‡א¸«א¸¡א¸”" א¸�א¸™א¸«א¸™א¹‰א¸²א¸£א¸²א¸¢א¸‡א¸²א¸™';
t['62'] = 'א¹�א¸×א¸”א¸‡א¹„א¸­א¸„א¸­א¸™ "א¸×א¹ˆא¸‡ IGM"';
t['CENTERMAP'] = 'א¹„א¸›א¸¢א¸±א¸‡א¸�א¸¥א¸²א¸‡א¹�א¸�א¸™א¸—א¸µא¹ˆ';
t['13'] = 'א¹�א¸×א¸”א¸‡א¹„א¸­א¸„א¸­א¸™ "א¹„א¸›א¸¢א¸±א¸‡א¸�א¸¥א¸²א¸‡א¹�א¸�א¸™א¸—א¸µא¹ˆ"';
t['SENDTROOPS'] = 'א¸×א¹ˆא¸‡א¸�א¸­א¸‡א¸�א¸³א¸¥א¸±א¸‡';
t['7'] = "א¸�א¸£א¸°א¸£א¸²א¸�א¸§א¸±א¸‡/א¸—א¸µא¹ˆא¸�א¸±א¸�א¸­א¸²א¸¨א¸±א¸¢/א¸×א¸–א¸²א¸™א¸¨א¸¶א¸�א¸©א¸²/א¸„א¸¥א¸±א¸‡א¸×א¸¡א¸�א¸±א¸•א¸´";
t['PALACE'] = "א¸�א¸£א¸°א¸£א¸²א¸�א¸§א¸±א¸‡";
t['RESIDENCE'] = "א¸—א¸µא¹ˆא¸�א¸±א¸�א¸­א¸²א¸¨א¸±א¸¢";
t['ACADEMY'] = "א¸×א¸–א¸²א¸™א¸¨א¸¶א¸�א¸©א¸²";
t['TREASURY'] = "א¸„א¸¥א¸±א¸‡א¸×א¸¡א¸�א¸±א¸•א¸´";
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
"imgo":		imP + 'R0lGODlhCwAPAPcAAEBAQAAm/4CAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACwAPAAAIRwAHABhIkOAAgQcTHgSwcECAhw8RSlQokSHEiAwnKsxo8SLCgRQXAhAgwKFHkiVLKkypUuWAljBRHiT5kiJLlysFjETJU2dAADs=',
"underline":	imP + 'R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=',
"globe":		imP + 'R0lGODlhDAANAPcAAAAAAAVrEwB0CgB4DQB7DQByHwplPQF+MRZlNxJwOQdcRAZYagRkTwFuTRhiUAFjditgawM/pQBHmxVHlx9UgwFApwNGqABGrQJJrwBQtQBUuwBevBJCpxREqRdFqxdWsgFrpQB1tAF4uitcgShOtCJXtjdXpDddvjhXuDtdvTxltQBcwgBrzQFuzQ1oxxxsxRV41EFdiUdemkRerVxsk1lsmkZxvgGCNiSoLDSxLgGGQQGETAGJWQyTcB6beD6NdSWkfky/LEK3RljFNWfNRWzPQ2LKU2/QVHTTan7YdQGAjQiHjw2Xgx6KnQKIoQiEohyilTazjQGJyQKD3AaS2AGG7QmY5BKe+xehxzSd6DCw+meBkHqJmHKQmHaIqnmGo06Qz0mj3kq+/nam2nbNrGfL13rU1JyisqOotKistqW6va6yuYir1pWnwY3YkIjcq4LStZDhkZPhpJ3mpJzlrqTpoqTjtpvV0p3K66rL0qHZ0KLH5qfjzabow7XwxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAA0AAAifAP8J/McHDpk7AwfaeSMnyRAgWfAMdINkjh86RqBMaZLnnx4hReLU6VMGi5MDP/6F8RGEyBEzYqzwIJBADYwnOHJE0XJFyo0CBrq4aLGkBxMqVZQMCOBgy4sVLETo2BECBAMEELiAwaBhQwMBDzJYGBEDzZ4PFS4sUCAhAgcTNASOKdGBwgQPJFDIWDOQjQ0VJ1LMqJEmocA2Xr6cSRgQADs=',
"usethempr":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAntJREFUSEuVlU1ME1EQx1dOHD169OjRo0eP3rTGLV5Mjdui3lCaQEy01bAtfiDRlIgEwbYkxBAwVVGCgZqI8WsNcjBNlYMJoYRaWNq1ZVtWVv6bvGa7fbv7mOSlzb7Z/29m3szbA5yLtQnR43DZbeGMXztr2eXeYa9VUz/F4zdVN92G/ZO+0MGuWyNjiYm5yvLvnIyluxjxm3z1Yfua+HSa9905xAQ9I0ROTL5YyGvav5obxGn/9ZxUuHClP+AI7RZHn6ys5l2zYQ2kIJe2eu6Pp6jQQOeDc+t5eZNVjNWvXFH/Xu4aCDdAUe+Xs1/W7ERyuZwuSZKezWapLtjDsrOPUmbjdLt4pA4N3x2b0TSNemapVEoXBMEQFEVRDwaDTboej0dHUE52e2Bi0QD6fKFWdJadM8TMZhUnwbiVeGZeUtH9HObMqe2tQGRJyheLxXQsFgPDmGneHz1fLJUVpwwJQFEUnQSAZ7Ty2umo1Zrq9Uc69oCRS3udVHaKEsJYKB8axwzGe25NA58dTdvhBbGbw6Dvd/aQJcBoFPxPp9N6MpmsZ08Lfm1d3vK2i6c4jMT8+++OGZoFkCnEYcjY3J14TvasUDDq113f4FSG5eDJiBBfa0OR0aFpDSXe/KnPIe/vOfpt6VfBCQoxKwDZmLvUmjHRw5Hh6Bpum6uh4XuVbZXarTgvwGjlAhAgLFTAavgI3OhNTDXdp7gA+oeeL1WrNdtLgKXsZh/A4s/eZoyBpxmgndcfP8z8XJH3K271RxmRmS3MHIDX33vs0ej06sLnHwramRW+sVkqfl3MFkfGZ4tNZ8byNW67GD2M2eED0TDL8gbEsw1fBQrkP6+jTExmIuLUAAAAAElFTkSuQmCC',
"usethemeq":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAflJREFUSEtjZCAAwpPbHUBK/jExgGlcgOkfwwGQHMefHycWLmz8QchcFHn/+HqB8qZ5Sxat3vvtzoNn70H4PwEAU7d2y9HvVa0LtobGd0kQZWlIcpvH2k1HXv358/cXIUvwyW/be+ZNUmF/Kl5LK1rnz3389BVB3xDrkDfvP31o6Vu+EaulqcUTY1++ev+OWMOIVff1248vmeVTG1AsBYX35l2nnhNrCKnqjp+5/jYorVUDbmlD95Idf/78oSjOCDmic+rq82AL4+PrOUApi5AGSuV37DvzA5T6GUD5jJhkP2XKlP9nzpzBijdu3Pj/5s2beN0EsgOcp0NT2hM+fvr6mZAPAgMD/9vY2ODEIMfgAz9+/voRltJWALSwLQOYkr4SsvDzZ4JuwmvE7z9/focmt1YwgDI6MXmP0iB9/vL9h7C01gAGUJbYd/gCQR9SGqQgO+DFXe+MdddpHaSzFm1/Dc+HoSktBmcv3n5DyFJy5UFRBoo6lNKmqH5Oz7fvPyhLGVhcBKoE6joWrcMoT0EFQP+s9Rd//vxFtUIAZNnClbuvgzM8NgCytLh25qTrtx5TXGOAghHkM5yWITsgLKXDYvr8rU+PnLz6GZSciY27t+8+fTx9/ubHect3fcSIM2Jq4/D0dgVQ3glNbW8gBoeltkag1ApYLAEAIKtp4+xd+jMAAAAASUVORK5CYII=',
"usethem1h":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8FJREFUSEudlUtsG2UQx01PPXLkyJEjR46coPQCQjjlgoJIUtITLRWkQoIEVCflWYFUAVEfJKpUoZICgUBUlAqJIkobmkdBVuq68Wu9tnfX6/V6n971n5kPOfL60USMtLI8+3l+8/jP54diu9ihkZkn+UhrX0x8DrJ9rdiv/G5/4N6Ym3vX3S1u5P2zw5MPT7x3/uL85RX7Xqao84NdrH1u4cffnbcSXy3Fhz94ZE/QF0amDywsXq8EQeh3Mnzfh240IFd05IsaspKKgqyhrNbQsBy0WmEkpZ9WVtVXjp0eeyD0ROLCubxEETssDANUdR3ZfAkFqYJyWYWqaNAUFUpFRVGuIEPvJPq0bTsCVfV67eQnl77vCx07/ulL5Ype7fxFMwgooILtrARN0+HZFkLXRmA16DHFZ+jY5Lchl1SktyXqghmBWrbbODJxZioC5X7/cPWm3Hmy1QIUzaDsZXiOg3q9TnAZDaOGgMBNhhLMNk2Uya8pClRKKp2lM9TiTvtjNak9fzjx2A506sOLy0EQRGbmek1kCxXU9BpavicC5wsScvkCfAK2PBeuZWErlcbt9Q1oqgoaJM1XodmqCDnjDnv/zOU1ARwentzPyuoWoWE6YjauWUeTAFyN2yDRyGWRhGs7oqJCsQSTkmmLpkotvU9V+n4zEnL52qrL6o/xnvWTvW5YAugxkNonoK6DkKrNFSvYTKZQNxs9y1IzLaQzNIYuIDPETsdHZ1426qSALmvYHrZzJZqZge8WvgE1A/dTdxE2faFGnapkXzabjfyypFSRKZRBaxXxu57vDo1OHyXg9DgpyeoGBmEIqVTFa0ePIXnnjgi+nb6HkJTLs2LrBtqOR6Ipgtahp3JSfDM+kjgR40Xv3r32advxhXBk2r3/gmcigdi3uLiI8fFxPHPwIJaWVyhJDZxst8llvTZ0OPFcjFfi2m/rPRXuQF1f3CgcfH3zb9iOC78ZUMsC4XvjzQlKSMPsuTk89fSBnla24zBj57r7+IsryZ6UOhycMQe/dXtTyD5HN05OUoTvxs01VOh629pKie+DbHb+Z2VnD+OjJx//ayNFizTY+gmk08fiGQTkkfHoIrfN65NnP6J29ai1ncL/BfKfwDun5q/03Kd8AZye/XbD8/zIJcCg7qe9CrtVyLC5r39JioXvZww9/vaXnyXv5vUHtXcv77iNXNlAWGcCQ6Onnvj8wpJ0/c9/TJbzXgB8RqvWjVtrW8b5S1eNnpn1LbHLeejVmUd5d+JjM1N7eYbGEi9G/hX6QP4F7nAoMfND3esAAAAASUVORK5CYII=',
"bDel":		imP + 'R0lGODlhLQAUAPcAAAAAAHHQAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8i4tNanodqxqNqxqtqxrOC+ucrKyszMzM/Pz9PFw9LS0tnS0NjY2Nra2tzc3OTKxebQyujSzuPd2+Pe3enV0ODg4OLi4uTk5OXm5Obm5ufn5+ro5+jo6Onp6evr6+zs7O7t7e7v7e/v7/Hk4fHx8fPy8fPz8/T09PX19fb29vf29/n08vj4+Pn5+fr6+vz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAtABQAAAj/AP8J/BegoMGDCBMqXBhg4MCCriJKnEixosWLrgo+xMhx4h86eBh1jMiqIcGRrvzEkZPn1MQ+KKi40YLSVMMArXLq3LnTC5k0Y+B8yhmIAQs2bbLwXNqKVSlOBZuymkq16tQLU7CYOdMFUiMIJ9CsAWPHqtmppCwVZLWqrdu3bvlU2GHlCpYvFEpIURMmhCm4gNuOmlSwrarDiBMjPlQgRZQqVpgkKSPGAyfFmBGDklRQVSpUoEOLFn2JQ4MlUB5byfBotGvRniIV/Gyqtu3buE0NEEDEyZMmIHILtx27IKpSpJIrX858joEDQo4gUVLkDfPryzfJDmBqlKjv4MOH2r+jgEQOHzhUBDEyZIv49+A1KSpIShSo+/jz4we0oMQMGzF8sIEDOvwABAb6JXhfJokUNAoonkQo4YQRLnKDCS3IAEMHnIQyAgI05DABhSRGiAkiBYHSySYstugii1zw0IILL1jgSIt7aBCBCC/2uIkmkxhSECeaZGLkkUga2UMNK6wgQSFJRimlkZMgIiRBmFRCSSVcdullHQQ8kIAeXnaJZJldUhJJIoSYFEAkisQp55x01mnnnVYOMohJBAVgCCF6Biqonn8OauihegoiiEYO9cnQo5Ai5FBAADs=',
"bSave":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC4AAAAUCAMAAADFhv/OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAIDBAMDBgMDhwMEBAQDhwUFBQUFhwUGBwEDigMDigIECgIEiwMECgMEiwMFCwQDiAQECAQEiQUEiQQECgQEiwUFCgUFCwUFiwYFiwYGiAaWqOYHiAcHiQQFDAUFjAUGDAYGDAYGjAYGDQYGjQcGjQcHDQcHjQcHjgcdAAcICQgHjQgHjggIDggIjwkIjgkIjwkJDgkJDwkJD/oJjgoJj/sLjAoKDwoKD/oKjwsKjwsKj/sLDwsLD/sLjwsLj/wLj/ysrKzMzMz8/PwMDQwMjQ0tLS2NjY2tra3NzcwMjgwMD/wNDg0Njw0ODw4ODg4uLi5OTk5ebk5ubm5+fn6Ojo6enp6+vr7Ozs7e3t7u/t7+/v4ODw4Ojw8PDw8fHx8/Pz9PT09fX19vb29/f38Pj/+Pj4+fn5+vr6/Pz8/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfr7zJgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAFpSURBVDhPlZNrUwFRGIBVJGldFosuNsVqY4mEaimUS5uE3JLWPbb+/1e9i+qcaZrR8+3M88x75sycVzEF2KWQS4UcfywFy8r5kjFMlNjfeSLB8xfRcDAY4LweBrt2ADn7jsMLp4tmSNvtqJP6TRZyCYMXTub58NWxasNU7wlyaYJxLnCLuq33UZjqliCfTMYoUeFoPrtd0DEUpsRHyMdvI5SwIL9Pru+1LgpTrSLkb6MBSlBwLeo7jdOEqVk+6vdQAtdXh/u0Q6/Tapw0iamGnA+6HRQuHo+F/JyPcTtpK4mpeh7yXkdE8V7GQmpgY5u2WoyYquUg74otFA/MViuUhYddi8VsxFQ1C7n43EBhzvycWrn30j4mzIQBNfVSBvJmvYbiDnFbK5HIze06QWyqUFPKQj5lq5Vy5YedAxtFUSaSNBoMqrXKtysXc+nZjyzm/wI12UwqJeewHpl0CgE/fYlkcr4e/1q+T12HLuCJR4bvAAAAAElFTkSuQmCC',
"bOK":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC8AAAAWCAYAAABQUsXJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAgVJREFUWEfdl0urQVEUx93Bnd4PcL/lnXlMFMmAiZGUx4SBlDLwKJFHXhERoSiSkMhAKWld/1Vnd06329U+k3PuqT/rbNZev7VaZ7WPxfKfrq+BhYyqX+usAJOBLxXjm0gEi4/HwzQCrwb+fr+TWSTgYdxuN9OJE8DH9XrVrcvlQtvtls7ns+69XuER8Agsq8PhQLFYjGw2G1mtVlY4HKbNZsN7DodDXut0Ony/2+3I5/ORw+GgwWAgHVfAn04nkpUCns/naTabUbPZJJfLRX6/n47HIwMCvtVq0X6/p0AgwIkiGdmY8BPwqJ6MVqsVgyUSCY1/vV4XwL1ej22sBYNBYcvEU/sIePSqjLrdLsOUy2WN/3w+5/VMJsMVhu3xePjb6XTScrmUiqdmFPDr9Zpk1G63GahYLGr8J5MJr6fTaW4j5VmIx+Nso9Vk4ql9BPxisSAZjcdj7t9oNKrxLxQKDFkqlahWq7GdSqX4P6FQiO8rlYpUTIVTwE+nU5JVJBJhmGQyyVXO5XLcGl6vl5AcWgq/IyHEQKth0rjdbhqNRtJxBTw2kRWmCRKw2+2iPTBRMF2wJ1oK8NlsVsRQt49sXAHf7/dJr1BRTBQ8oHr3esVfwCOg2cTwzxPwO4xGo2Ea/ThVVqtVMos08M/qfygHfUwHo0ph/PONyoivgs8if/6bV+5vVrsE+rT9pU4AAAAASUVORK5CYII=',
"bClose":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABMZJREFUSEu1lXtQlFUYxg+jIIXoBMw04vpH2i6sOoIkDgTeYBAFC2uhsBKScNcJqqGRSwiKEitXEa8tStSMOYOQkaloIFPCtGDo4AUQBANUZIGNm6i7sDy956yidvurvtlnzvu9531+z5z9vtm12BXoBVuryczG0oqNjBrFOtVqErOxsmTTabW1tmTiAn1gIQpYgJnGLdj4OJjRNMYM4+PswZiJ3Tea2LBxlN0zjhFjsljvEZPFrvTG6OgoxsbGJlZe/1cK91sBlrTKG0MXtejS5EB/rBD9pCHSSMmXeFBSCMO3hTCSRo//SY/6Bpq5T7pH80PFZr++qFDw+s+dQrjPUrDtq5dMhPTQRl9+NgZIw4ezcZ/0sCDnH2UoyBl5SDMjpCES93E/5zwOCVvuBZYW8OQkui+y0KfJQr8mE8P5mdBsjkXw26oJaWJjYSzIQn5s3LN9mhuiee7rI4buYNZEyPqlHmBqChmsqcKt3FTc3Z2KnrxU6PfswODeHVC8pYTJZMI4PWEuHqiJifnb/gB5uI/7u4hzO/dz6E8fx3uei8AyVnuhv/oc2tPicUsdjy5Sz854/J4ejwPR0QLMXwIexld+z18Ufs8VErpJzPXRvI58Xeo4dBKrXZ2A3tKjeNfdFSzd3wN9FafQHKdEW7wKHQlK3PlMCV2iEoPJKhxQKQXYYDDAaDROrLzmAfuVGzGQpEQ3zd8mXzv5OaclToW73xxGqIucvi5fd9w9WYL6SAXqw9eg4f1ANJNuRgSiN0qBvqhg7AsPE0Hd3d3Q6XRCPGAv9Xs/5DMKtG0w+66FB6I+bA0uE689PxfBzrPBUjzlaNifjWNSO5QtdEQF6bzbDNS+MgPXFkxDIylz5QrxHJ4O4aEZ1G+gfS4tzXMf9592dUSx9AVoYyLhN20KhXg442peOo5IrPHd7Odxcs5zKH/ZGuel1rgsnYRMX28R0N7eic7OJ+ro6KTTKZHh4y3mfqL5H+dYC/9x4hydNQXV0WHwtZn06CQHslAkm4bv59qibJ4tKufboHqBDTJWLRMBLS2taG01KyRUiRs3zDVfRRDNVdH8OfJxfylxiomn/TQCftOtwLZ5yXH90C6ULnRA2WIHVHja47yXPWqW2omAhsYmNDWZxQMyg3wEuPFRv5H6/F67xE74KjzsBeeEmwPqElXwd7Cmn5VX5Wg9sgdnfGahcpUE1YES1AZJcOnNmcgKXSkAj8Xvm99xRPa6v/YvvjETta9JUBUgQaW/BOX+L6F+ZwxenzkVbIv3XHSUHESVwhk165xQF+aEyx/I0LBJhuaPZGiLkf6rWj+R4nqUDFdVMtRHyFC33gla4mg3LMbFfdsQNv9FOsmyebhzQoNfI91Qt9ENlzYtRFOCC1qSXNCR7YLf0l1wM80FrSnmHt9riHXF1RjXZ+orH7uiPnoRrmz2FRzO4yGcz75WeGPk9FfoLdqKntIU9P6QAv2pbeg/m4z+ymQMVpFqkzB8KRFDF5Iw+EsyBn6mvXLqP1Xrz2yF/qxa+AWHeJzL+Wx3gDuKQ5fg0Fp3JCyXYouPFNtXO0GtkCMjRI70YLmo1WvlSAtyRuoaZ7G/1V/2TJ3kJ0Wir1mcw3mcy/nmf73/4bqQlzr1MfYPNcKdTI8iX3wAAAAASUVORK5CYII=',
"bMin":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABHtJREFUSEu1lXlQlGUcxx+PGM0jO8WybMILddnFpnTAtDSnpqZj0tGZnI6xEq0YrzxQIWkByxQQMQSVAIHFRUUOFS8OWUDQRZCFZV1CXOISnClvOfbT82zWTH/pH/nOfPd53t/z+32+7/udnXn7zI7Kwm3wY8Jt8FDhNmiw6DdgoOjTt7/o26+/kD/igS5nr3A6ewS9PcJ5947ounlDdN24Jq63NAq3IcOEmDXnE7q7u+np6XkoUnwx/cMFlF7qYG/5ZVLPOkg1N2OsaMVY1cbBqg4OVXeQWd1JtkWq9io5NZ3kqPWesuV9luUqmRc6XP3pF9rYd74VQ0ULRfUdKL6Y9v7H/5vJgcor/zE5bb+C4guf9+Y/NBP1JoovprwzD9PFdnad/o09RQ0kljaSVOYg5VyLjK4FY2WbjO4KRhmHUUaXLqMzSqXL+FQtXdWr2jFUtpMiY04pb2bvGYeLc6quHcUXk2d/RL61le35dewosBFTYCdOmu0ubiShtImk8haSpWGKuZXUirZ7anetKWalVtd5Ylkz8aUO15ya31lYT66lDcUXk974gKMXmvnxcDWbj1jYkltL+HErkXl2ovLr2VHYQEzRJWKLL0s5iFMqaSK2xOG6jzU18os8j5Z9qn/bKRsRJ+rYeqyWjIomFF+Mfu1djGUNrEwtY5WhnDX7zKzbX8H6jCqCsqoJzrEQcqSGsFwrYcfq2HTMxqbjNsKk1Loptw790VqCD9cQlG0hMKNSzp9nrdFMosmO4ouBnjNYlWJixOIERvon8sKyZDy+S2Ps2nTe9Atlzny/B9LsJaFoAjMZJ+c8VqYxankyX+4qQPHFI+Om821CIY9+FsuQhbsY5hfP098k4b7MwJx5i+jt7cXpdN5Xc+XDPB9wkBHLUnlGzj++OJ4F0SdRfOE2fgZLk0wMXbiHJ7/6leFfJ8rGNJ5bf9BlYrfXU19/f82dv4iRodmMDJRGK9Jwl0afxuSh+GKA5+usNpQw3C8B9yUqLgOj1h7gxZAcl0ltrRWr9f5SJi9FnMQjNIdRAQdkXAa+2JmP4ouh2rcIkiZjlhvxWJ7GGPnK46XBBDkwc+XPqOEH0cw14XjuKWJi5Ek89YcZuy6DJfHFKL4Y4TOPrfuL8QnOQRNwCK/gI3hvPYV3XAneqefQZZ1He7waTb6VicU2JpTa8DwrVWZjYpHNVdedsOCdWYl3mpmXd5vQReSh0x9l6d4yFF9MX7jhb5OIQt6OKMA3Uir2DD7JZnzl33dK3kVeNTXwirkRncWBrqYJL+vv6Gqb0FU7XHV1PjXfztScaqbJB/ONk/OSt3pfJYrvMomt6SDmUidRzX+QXNdGvNzHyv22zpvo/7yN763bjO7qwr2ni6d6uxnk7MZNapDcPyFrz969w2jZ43vtFj90XndxFE9xXSaen2/gH032j0Djp0frH4Z2xWa8A8LRbYhEG7QN3cYoNPrtaEKkQqOZFBKNlz4K7feReAWG4xWwBe2qn9D4hzLJb+O/TMV2ffiW5lrlZ/DhXX8BmUnqCVosKVcAAAAASUVORK5CYII=',
"bMax":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABERJREFUSEu1lQ9MlGUcxx/UmBqRWy1iBi0NFeE4IBMGAVZjbbX+LAqbzdpoglYIlvw5SSwk/v8RiBk5To4/h5z8BwEPkAMhhAPiBO84OP6GcQdSyUToDvj2PK+DDWeDrflu3/f3Pu/v+X2+v+d533evkWdqOYxNnibGJqbE+EkTsnHzFkKIETHauIls2LCJ0BMdr3FgiWBxgSwtUf0zTwz3Z8nS4iLR35uhukvIm16HYTAYsLCw8FjE+MT9g0/ROjyFnPZRiOVjEHfexuWOCRQptChR6FDSM4WKW3dwRck0jSrVNCpUf3KRid2rpPnynjsoU0yimNax+oLOcTRqJsH45LX3Dj1WE8YnLu8e/E+TU/GZ+Oig37oURucur6SwU7uyEsYnTm97o7lfhwtNg8i8PgRR6wiy239Hrnycg+v1eu6ZrSU2N79rAnm0LofWi1qHca1vAoxPHD0/RINqAmkNfUiXqXFeNsCZCVuGOZP1vhRsbvaNUVxsGUFm8xAymgZQc/MPMD6xff19VN+8jZgrPYir6kVCjRJJUjVSr6lXmXz8ydFHbttyE8wkXTZI6/qRXKtG0lUliumLxPjkZbd3IGkbwrfiNgTltyOkoBOniroRXtLNQbVaLXQ6HXcdK1UhlgJipP2Io408nI+ovIXwUgXCirshkHRARFfD+GSLtQeC8pphfjQLL/iLYBmYC6ugAtgILsPLe7WJW4wUbnF1cI+vh1tsHbweasLxTDlsBYXYHSzBDso5klEPxidP7HbH11mN2Pp5Bp7yuYBtfkKYHc+BxclLnMno6BjGxsZo174cdJW8fVflrUKLaJNimPvn4llfIQ6lXQXjE+M9HgjIboapTyaeOXIRZl+KsD2kAJaR5RxwYEADjUbDxUeJ5ZhYE1YRZdgZXASLADG2HxPhcHotGJ9stj6A4PxfYeaXhedpwjIwHy9GVGBHcjVnolSqoFKtLWayN7Yae06X0e0uxEvHxfD5RQbGJ6b8txBOTaxOSLDzxCVYCYqxK1EK658b8EZoEtfheuQZlAB+WgN40TWwDa+A9ckiHBPSHaJ8Yu7ijcTCFuyjCZ6gFHY/VMHhfBMc8uRwKO2CvbQXdg0q2FxXY29bH6zlDyIb28v68EpdL/ZVKuAk6YKT8AacU2XYH1XL8QJzWsH4xN3nO87ENboWbilNcD0ng3OOHE7lCjjXq+HUPIhXO0Zg3zMGvnIcfBUVjWy8v3MELvTLdmnUwKNKCQ+JAgeE8gccyguW/AbG50yiuqeRPjSFc+N/I3RyBgm6GQT/NQvXe/dhNTcHC4Mezy3osW3RgK1LBhhTscjGZjRnOT+PXbNzcLs7y9UzDuMx7oqJo38ylsXzOwu7gCjwg+PBFySCfzoZ9t+ngBeRBl7kT+D9SBVJr8+mgU/vszw/LAn2IXTuN9HgfxUJ2y/OwOaz0BWRlC6tyVo/vv+b/xcAf9f/4T3A6wAAAABJRU5ErkJggg==',
"info":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhpJREFUKFM1kd1Lk3EUxx/pQijqD/C+29qFBt7kosILQzFKijBKqSwpp6IVlClWhgjzLV2aMTOn5dRe1AUuc2K+ZeJcMVm2R1eTfC2VMt3z+31amh84FwfO93w55xui/Oezb1E39mVJv3NHqHFuOaBIQpRd27cpSyvr6bvDQrsj94SNbs0qvSPf9K0On1ppm8HUtcobt8ZLp0bR6zXyrXPU2HxqvW1cvyGY+PpD12CfVAtfzJHTJrnVruGZFTj9gqxWQUYzXKlborhFVe2DkzqltMltuFw9RZpVcvGZ5FKTpMQRoLBL43ywT26EpHpJQsk02Q9cBqWmw0tM8QIJZsHZRklKs6DHq2EbF5x5KklskJx8Iomv+kOO2Y2Sfn+UqNI1IsokR2ol51oCeOYFrhnJaavgeAPE10HsI8mx2yMoqSUfCDeusrcc9lXDqX+CBYFnUZDZKTgRvCH6seTgQ0Fc3hBKabObiHvfCa+SHAhaZ9g1Jn9KppYlhYOC5A7Yb5ZEli2TWRl0uGnqNxzOd6I3B4ixQn6/wL8imf0NtW5J2ls4ZBFE3XGTdNdhUN67/LobpkE1tnicxPZ1cgcEw9Man+Y1LB7Jtd4AR01eUo19amPHR91GFpZXY/rs8j41umA4+Bk/OY4VjMO/uGqbJc7o5ELROzWvomczuC26h7y6lAK74XrVAAm59mB1klXRx3PHBJY21+bmIH8BLUeFBNafPYwAAAAASUVORK5CYII=',
"help":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhVJREFUKFM1kU9Ik3Ecxl/pIBTR3XvX2sECL7mo8GAoRgw6SP8OHSSbRFb0B8WyjGpumi3N0LRZ6bSotkBFZzp1M3NaTVD36sRaDf9Mo6nv7/19GpofeG7f53n48iQp/5kILxhGp2LGnTuSLdFlTZEkKbu2b1OWVtYLdqckd6ftSRnZulV6h2eNbZ6wanf/oqY7zushQZNPYO1Yo6QlSq07rDrc48YNw+TsoqGpY1q99zbKw06Bf1onEpP8TMgbEhS7dPIbYpS3qmrH4LRBsTUHzedrZrjQImn0CxbjEs+UwDcj0HRwBjROv5CYrD8ofDJmVmpdITLL5zHV61xzC2yfNPLadOz9GnFN4h4XnGiU5FSvcrMuiFLwaIR02xqpFZKj9ZKTzYLWb4LIimRpVVLWI8hpgKxnkuO3hlHyrJ9JtcTZWwn7ayC3TTCxIJmN6TzoT6Q7JRnPJYee6mQX+1BsziD77kZIrZYcTFTnt0s6E493hXXKBiRnXXCgTpJWsczFx4mGG/Z+85GSAMY6jcwWKPJK/BGdQFRS/x3MXXDYoZN+O8iZUo9Z8Y/NGa7bB9Ws8nFyP6xT6tcJzutMLuk4JiRXejWO2UPkWbzqS9dXw8YWjnejxsJKr5pxZ4hTr+Yo7ftD5Ze/XHb/JtsS4Nz9PrW4qmdzuC26fSHDR6/K1eoBTEXtG7pU5eWNZxLH+7HN5AT/AFV8jI8kgcGCAAAAAElFTkSuQmCC',
"alliance":		imP + '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',
"alliancegs":	imP + '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',
"mercado":		imP + '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',
"mercadogs":	imP + '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',
"militar":		imP + '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',
"militargs":	imP + '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',
"militar2":		imP + 'R0lGODlhRgBkAPcAAAAAAP///8zMzPj4+Pb29u/v7+7w7+bm5t7e3hccK1FYYo+gsGxyd8rW39Tg6a64wFNkcMTR2r7K0nqFjKm0u7O+xbjDyp6orpGanzU5O1lfYoWNkZC5zURTWWNqbZCXmomUmJmhpKWusXN+gUpOTz9ERPX29vP09Onq6svMzO3v7uTm5ePl5OLk48rMy+3w7pCUkOzv7OLj4t/g37O0s6qrqouQiYeLhbe5tpWakqu2o1txQ+3x6c3QylFSUPX29Ovs6ujp59rb2dDRz8fIxp65f+jv4MXTsuHp1t7h2tvf1K+/kFRgOtjfyVNUUfT18vP08fDx7m1+R73JoM/WvpGcc9LWyJ+qf+Tm3oaQZnd6bczOxb3BrpaahVFTSKmtl660fra4plRVTeDi0aGjjW1uXoSFdcfIuGNjViEhHd/f2Ojo4u7u6e/v7FVVVPf39vb29fX19Nzc29fX1o6LVYOAUFxbSpqWYr+7iZ6beKqnh7KmOqagZdDIhnp2VTAvJrWylZWHKLirUVZSM8S7e7OrcOHXkf3yqI6KbGxpUpGOd+3JBte5E7iiHcKtJuPMOqOUNp+SSGhhN3RtQfDkm2lkRltXPk5LOIWAYv32zebgvOvEAde0BOrFCO7JCuvHCuXBCd+9CsWnCfPODOfEC+/LDerGDPbRDurHDenGDeLADdq5DNGyDOzJDuvIDurHDunGDufFDuXDDrmdC6yTDqGJEI14DsmtF31tH9/ER97IYH91RLevhsjBndLLqL64mODZtfbux1xLCGVTC3RtUI17PH1rLywnFlNIKD44JnBbJ0Q0D2tSGyMbCl9MIBIPCJNsIY1eC39VDH1UDINYDW9MDGZFC3dSD4tiFnVUFlU9EJVgBotZBsZ+C3pOB35RCIFUCXRLCIJVCntRCptmDahuD4ZZDLd6EYFWDal2H+qUGIQ2KUhHR/7+/v39/fv7+/f39/Hx8e3t7efn5+Xl5d3d3djY2NLS0sTExL6+vp6enpiYmFlZWVNTU1BQUP///yH5BAEAAP8ALAAAAABGAGQAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2GN/TlE2Bv3rwa8xDYE0BjH0FjMPUJINAuQAB37t690wIVqtM4Z4qlK1eMpQ0uiNpgYTOgrNkB/c4OyLo1nVszH5VZUybJ4D4EAQjcoYNpjNqyac2q0FLOrdtzdATc6HjNHDhp2ej+s4HXXVlEdzCp+YvWbJR9FYoVNpxOzzvFGpmBo0ZNmjhw4LJN+nIGyIA3ZM5E4dx5QBAbHyR0IUf6HLZ87gjow7hrHDpp0NFRmyauejVlebgAwvKDd2AYHi5U/5BgrNy5cuSccSkw4F0AARD5yZ+PJts41tSeS88vLb84dM4Mkod3ZcUjwgMSNPDFNuRgckMGJpwVwDxoFHOLJ6zsMt+G8hHgoYdPYPLNNNKYsx9rz/UnDTreGEPIIFSUBc+M7bnxTlkiXIBgA13UQMEEGcxjFgFj8HILJLtE8okofMDx4ZNPvsEFOOOQqN9+0GUpTTh8FMKHJWugMAc+ONBAQwZm4vCBCBJU0IADFmAAQQLsrXGGIIyMwgoIFDzgSCezjAGlhwUUWoAaynyzIn/oNNofidOg800xhPARyTKY0JAPEUMIMQMJMwgxxIMXSJDgBZgUg8segjiySiillP9yCwYV+NkJJ70YquuTeXjzqDmtTcOodCuGU4wxARKCTA9AFBDPCXH0E8cJ8cDwBwMRtBmJKKEscsooo7gCyyulNIKBBQ80EgooggwwqKFcXONca6xJI2xr0VEzDjPGNAPAMYTQUQkQBhRsgD8GX6ABCA5IoEctmIixyyqevGJxK6sYs0Cft3ziyR5r6KqrPJOEA46JVvaHL3TUiFNNIYU8AwAylSKjh8EHF6xCCA80YEEEgtiyQQkjFBNKKxeHUosiD1zQiCej3NKEyAUggEA9ZEyiTDXfNHolOikb28cdAAAwCCGE+HHMGVYjwE7b+lBgwc97FFPJIJUQQ0spFrv/IgsrtECyByuulLJKL20nbvUXd+xlDNfm2DvdivZew0elADxD8x3JNOOHEFa/bbU+IljQAA615NBmF4ngYgrSFqeSCiidIN0KKYUojsA+vJthSB3JVFLHJMyE819045izTCJ50BH8IINcMkgiZvC+TwbWjyDCeFwEomMIFERAhiiljPuKK+j3LQsokVhvvQDwk2EIH808wwcd+DNTDTiNOjfJHYlAQxnQ4AU7SGIQZoAf/EqgQBhcwHRfKEYFMEACDUjgAXsABStgl75XtCIUnHAEDhRIQgGQgRJ0OEYzDHGHYwyCDrvQXzi+oYw7VOISUpBEHSSxC0l4oQskZIcC/z8AvgbkoRgU2MAIEhCCCESCE6KABfpkEQtXnI8VqgiFIkqowC+w8BjP6AP9AECMQtRheM6owx3KoAUtlMEMZYgjH7aoQHakAH4fEI8FEOEHDIyAAQAIjh5EoQpZoE8Vq7Di+UZhikjshItebGEYCwHGOxxCEs2wxB0moUY+9MEXvOCFLwyRtjDUUYH7oEAIJnABBZCAAQ+YwAgsIAJakGIVSHNFLDw4ClU0Yg9fqAEXTTg/MaShD5R8Bh0OsQuZ3a8QlDjEIQrhDGcQ4hCE2EUW4JcCIcIPAyG4wAQ+AAJWNkAEILjAAowRClX0LVaxoAUfQMAFe+ikhGfIQx8Owf8LLcDMX3U4RB1kRog+9MEQ2NSGNqwxCWZKAhGnxOMDNzCBDYDgouEcwQS8IIpWwKIVnQjFLJCRgQ9YgAbKoYEC7WEPLjRun4ZgITueEVA/POMZBa0DHQyxC2ss4xvOMAQlMXGPOcyBHUadAxElcAElbuADG2AACEgAAgXUAlyfEEQeFAGABExAAjRwRw1ocA+WslQA74hBGO6AUErgwQyKuCRB+zC8QhSvGt4I6hXQgIYwGBWpRs1BCGiJAQaUwAN/rGgFRkCHTbAiEDRowAUSwAAKiMAKp6lBWc2KgwCUpQ1h0OchDHHQMrADAGirwwuvUQ1r5JUQv6hADvLw16T/bsEGFRCBHxnAAA00FQOx3Acu0lACuTXNAiEYQnt2xxN7WO0eni3LG9gQBj4g9BB9+AIDCpFNNVbjGtrI6x0QoYUvyCF0bavHHHLAgAlogAEeYIAFnjrBCEAAACXYngUugAOylEU5+WjbPfBylje8AQt5sO4h3EoIQ0gCGbsIhze0gYkvEKEeihOd1YQAAvga9hkk+FGpQiABDfzhqxSowRDecBYC1CAfzkWAAAj8l3zggAwKxq4Y0HCJauwiDBjWndsSNwc2iWAEHlCABjbgjw3kVgIhKF0IaMDiv9SgBjEWwDwsoxZ40GAICJiDHgoR0wdYoAxk2IKQ26ZhBMgB/wch2AAMPPzeEYBTArSkgQvycSO1vIMGmkXAPLTMZbXgAAEHOMAKhMC4GoDgC0poQqInTekDkKDSB5jBDOihVAmcCwR5FEEN5EAPOfD5L+/IB5Z9IoAC9PksqZZBpecxaXrQA9OUvjSmkyBrHDwgBB8gAgKI0INbH6AF+WjHX9yh6jn4JB+uXnY+jI3raufa2gewdbZxTY9Tq8UdAtDHPeZRACKMwA39SLe63VACf7jb3U7wgRPeTe962/ve+KZ3CdCt7nS7AQY1QEChxl1os6QaBTjDwhHGoAKcORxnCHu4xCWOAiK8+iyqFngBCP4XeOCDBThrAhWSMPGHR1ziQP8gWMlbgNayHKEJSHgCPK6scedGF9YpkEPBYsAFGNjABmd4QckNdnKHHyEQkViCEiYuBCGUpQlNWMIRkOBiGpAbHkG5OTymsAQrHEAIHjKCdjvAADJEYVCD6segeLCERnyil40AgxIGZQ95GGEJS4A6Et5RAJ0U4EPQLQsSIkGLWcgzDHHw0AMqUIELfAEKaIeS2qEEhnXZbhSfaMQVkvChOAzBBFSYAhKQAA8Wz2MfrYaHhwQQXTBsUBWsEEUt+PALK5TuARiwwQtMEPkPTf5DSlBXIi3mwVNkng9UMIE8BBAFHXQBCWe5xz7s8SR7tIcHdFgE0mKhClWAYhW06AL/BSqwAC1MgQpn7/3vPSSITmyQ+MRvxSg8cQtBhGEGOtDoFyLkrnzoYx4e4hQEgADucASzoApV5Aqt0Aqu8AmzYANMhQu1wAqsEAlG4BQYmIFugIHuUAikIAuqADvEZz6tECuMAAld4AAR8AVlwXc6QQAZGAD2EABLIAq49FGwMC6gYAsjcAGBwAms0Ag2CAYxqIEY6HqjwIDw50GhEAsYowquMAqLcAd4pgNmsTv34B4ZaA8mAAarQEWxADi0wAqxIAq40AghVQhNkAeiQIRF6BQb6BRIsAeiAAp8A39+AwtheD6wwAl3UAEWUAVKUBb5sA/zUIQEIAR78IUYIwqi/2B4tVAKoUAKo0ALirALylALhdAUbxiHAdAOWQMJsRAreOg3uPQKq1ALZtAzmGAMWNB3OHACbzgEGeRBs2ALs7AKwjAL4fJBgYAMzUAGggAJT/CGAeCJ7dAFgOALxkALq5CESzhFs+AMG2AqNyAJWTAENmAP7lCE7aAEGTSKoeAvz7AMp7CAn0ALvWAGfwAIfBAIUGCMnsgFlpAH5VEO0UALsRAuxOeEZkgMWlAqN4AJkmAGNVAAxogEjuBRrhAKomALy1ALp9B9oAAJmpAIx0AMuwCP8ugUV1AN0AAIysAN5VAO5lALs1CCFqMKqGALiVAHDhQCOeAHfjAJPQAPGf/4JFOACqgwgqRACp+ACqwAC6IgCX6ACYDQC3eAC1vABmindiaQBdsADZqgBQCgDeRQkvlIPqXwQbiACX4AA+Mxk3QwCFsAJdzEBY0wCvBXCuijgKFgCrSQB73AC5GADduwDdhQDIhwBXoQBmGAA90EP1dQDlSJCc/wB8tgDduAHtKQi6NQlGBpA1EWAsKTDDlQQk7RDpAQCp9QCqNQPqKgSLEgC6EwDMiADtzQmOSQlVmJHtOgDWRwjE4xBeWQDIqgB4nwB7y5DOjwmtVQC7ZADARpAxRAARdwCYngDNZQBViAgYYyBZGAC7RAC6IQC4EgRa+wS6wgDGmQDIvZmOj/QQ7ccA3G0AVZIHQRRwXFsAAMwAuIkAx/gAyWcAzWQJ7E4AtgWQeXwAAYkHt2cAnKEA3WkAhRIDIGoAOAkAfJkAy2UAuqEJqtoAqzoA1/YAk3tAzaUA3ToAyKcAZBcAQ3kzMGcAbGMAE+oAfs2AzJoAXHkAbL8AyKkAl64AfEcAl5AAi/4AvAkAjaEA3cUAQiEw+EIAi94AuXYAloYAkSyAqGUwvLkAxJWgmVwI5eEAbzoAIxoANkUDAIUwBzIAkZoAiAQAzJAAHJsA68mQYAgAnBoAfEYAmJAAiaoAnAoAlUoAx5uQRU8wi5AAy9UAaWEKBeoJi2YAvGkAzPkAFI/2YHetCfX+AC9yAEZPAFKKAC/qACKLACXNABualQdpAB2tCgf/AMmNALenBDiPALwNCqd5oHzrAMWUA190MGE8AFvdCgJfAHaUBcI+AvHcABIHAMiDAIaMAF72ACQEAGS5ACQ8AOQzAE94ADGVAFXeAM4xAO5lAOy/AHyZAGWnADimAJlqAIvWCnruoLgxAJvGAAumIAUbAEWjABy4gGWqAIZZABadAFXaANx3Ch2VAOxsAPl+AHMVAWV9AEUmEjUfEGVjACXOAH1jAO1iAOt5kMxIqvGJoHd+qqrYoJugAGVPMCTfAFOsAFZEAGGmAHvqAFmKAJeOAMfAAN5dAN1v9wDExQDupwBN3hnIBhFiZgBDdwBmawmNNgDt3QoGlgCXrwqImgBztap8DAo4UgCFVANQXwAlprACrQr8vgQ4oQDLyQDYSQDrZwB8RQB1LgFkVgBAOQBVjws0DLYm2gBdoQDtxwDt3aDMswCHpgCX7wC5jwB17AsVOrB0UQBIaSEFIQDuVwt8qgCbxgDGbUtrh6BezQAUfAA28bt73xF2+wBcSjBzeADOkADenQBcngB72gAxwAAV7gC7KrBw4hBdSADdbQDdCQBXx0BVbwBGVBBUtQB2tgFtwht7wRDwfwAypQBW4BCXpwDGXQCyHAAQxQBqwKDFcQEeWBFP9AAPfE8GII8AM8QAV0QCC84S4bVwM3gLrFoAjHcAmAAAiy9AtHmgcY4Q4FQBRkFQRV9heBcRaqVzX+ZwOaVQ9UQBB+0AUQoAV8JAUbMQAFYA+AJkz2UCgEAA81ciMEUCjzcA/+tw/6QFbsgRB/sAMgkRwfrGpXNlb5kA/s8MJXpg+8UwM4MG4E4A4KwQQoLBLvQAAqUA/3IAD5YCYeMFaawhMCl8M28cOGcgCG4iHwcBNUXMVWfMVYnMVavMVc3MVe/MVgjBABAQA7',
"militar2gs":	imP + 'R0lGODlhRgBkAOdsAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAPwALAAAAABGAGQAAAj+APkJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2Gijz5Yobt3LlV57xhY0YLE0E1MD0xs+fv379+/fbtwwMVqtN6x/TsmaOHpaNfid6Vc4evrFl8U87iy7p1j1tCH7kg4fLFICZv/+xNQvQHnNqyac2+wzPHrds/iJgp6lilC5YsV+jyc4S3X9lEk/54+4vWbDxMvPQUNryn1D7FGqdg4cIlSxYsWK6sWXWMHb57oY7F49wZXzpHlpBhWkP6Txlf/ex5wkinihbXWbRweez6CZdMv2KVs8c78KQ0pnj+IVMz58+cNU1+vcO37x8ziNChi7lShTWX59LvZ9GvpUmUTN2VFQ8rtiBDzSplrPGHIjhwZ9Y/54ihByrDtEJHfBjao6GG9fxRxWNd5Mfac/tFJ4UauEQxTVn3tMheFfuUxYopBVKDySqyDILDOWbZA44rqEBCxyPBiNLJhkgmec8vWHwYXXT5YZjFE52g0okV6KhzDTG40EILDl7iYgkryPBCjTfBYBIGB+uhc8wpsyDTiiSy2ILKL5iAk6SG7/T5jjdcVBEdf1o8N91rWlShBy6dPFLDH7T4gkw024DTBDjbRMOgKcgYaMofeqwRyimo0HJLMcWgApqdv7wCjJ/+sCKZiRT7YdFFa6vhJ110T+ihhn+4IPEMO+/EQ089U9RDTzyTvBDHM2U+IsotwyzTqTDABFNMJ5gEY0snt+xyCj57+vlLFc61xtpr67omXRVTqLEBACfggsgY7MCjLzxQ7GuKF5J4g0wphfxBBR20DBPMwsPQooYndaISzDChoAMrrO2s8YStWjxmaGvQtfYEKqg8AAASjCJRyr786vsOKLZQE8wzp9TByBB86EEtw7cU0ogtpnQyDDKocHPxn950E8oaXDzhXKFQdvxkr8VMAgAAUeCCCx0nHOPN10d87Q3ECz8Tih5jRDEGG48Us7AwvbTyCCShtCJMMbQAI/b+3l+vMsleajjdBbsev1ZFJ4wC8ADKk+CwAR3bgC22J6wEQw0uhWBSJiZorAGMwgsDA8wuvyg8jC+o8O0NJqwTQk0fOIzRxxpTPPFkdI3VgEYmiMQeRRRKRIEGIaxjgkPxfLAi3i+D0AiKLGaLUky2wQhj/du97PJI8cUz430o1HSywQOdIGJ+7VgU6twak6AhRhtiSKHFF1EQ4r33Q9w/iSmWr6IHL5hogheQYYtQ7KIVoLvexG7xClTg4n4QZEYowoGIE2yAGpM4QRQQQYfaOY0LkxiDEuzwhT58gQ5fkAImIHiE+1niedTIhB5kwQg+cAAUz3jEK0QBDOv14hf+wqheK3Rxi0ZE8H6rwOAJHrCtebEBFX2YXRP6MIk24AEPbSBEG7bYCSPer4Xes0R4gpEIOmCCD3EAQHBKIQpd9MJ6uqBFEKuHDGA8YidHTGIGmYiKJU7iHV/YgBUmsQYqdqIYynCFK5RxOTrY4ov3w4QsQNG8KzQhDrYYBB+CwYo7Jqx6v5gYMnTRiVCsYhVHlGD4qBCCVC0REe+gg8nKh4pw9AkVTWgCLt6xtUVA0nuYAIUpBmEJSTSPGqyQhCk8oYZb6OJtqPrFIzohiV9gQycRPEYmivEOV+CBZPPqwzv6YDJcoIoavPzBD5Cwhlh+IRG/ZIYYg8GIQTBCEvj+FCYfBiEFUQzjc7+4BSaQgANLBIMWyqHF/bCBjV/8jZvUwOARHiBOWT7AnH1ABDXogIQaVKEJ1OjjH6RxjWscoaTXeCEyTFFDRliCEXGQRBMkcYVCdCoYp8hEIwDAgUEggxb9WAUtpMFQhjJjH+6wxSTQGQ5cEKIRgCxnMWaHCg9KAaSlEIMYbFHSk5Y0mJzERByGkAY02pMXfECEL1oxCFpQwxQciIMsWEGN06yCqEXFxT/K8g5bbPMd1CgGNdpwBABorQ8brMITkHBVXNwCgJnoKkqb4QhesOKMcYiDF1iKiUwOJwRDkIW3+AeKaLBndTzBxteksVcWJbUT6Hz+RzFWEQcH0oGKTvvBVSeRCDysghuS+1o3riHWQXghDmmIAz0tAcBnhAEAQ1BeMEyBC7KURTm+EJs08HKWFpUjE7B9R1NxQY0vIIEOT5DCD/6wCmR0g29hE9s2JIHcsT6gCTniFCiQ4YUX+FQWq4jGPc5ij1X4QrXeYAZ3/+ILXIQivLKlghiU8ARHvld13ojv165BJlbwIQ1X8AIjoMAIyyIDFJUDBS0G/JdTIpgZ57CMWu5Bi2h44xqlQEVEbRGMNoSiGRgWm4a9wQ1cgIIRk6jvcfkQTGRwUqG+iJFa9kGLu3rjHDCWsVpw4Q1zeHkbfluFJFbRDW54+cxoNkf+E9JsDnCAoxwpFU4wJCFGVvy2HNyI8l/24YtV9ATL75DyWfg8jjSf48zlKAeb0bxmNoOj0LiwBSiCI7BnKNoc5PCFP/7Sjz5fwye+CDSnfXHpRZua0ac2R6JVvehy6Fkt/WCGJ6Rxjncggw/wmoKudV2FIUDh17+mghSoAOxiG/vYyE52sYeQ611PoQqTWIU3+kRrLZuFz+pgWTmcAY53sOzbLOsXuMc9bnUgQ9Bn6fO031Htv9yDGOVgGTemAQ5yg1vc42ZHvuxNjqOWxRlmrsc9Trlu1bZ20Mzghr7c4VBHOOIY3ra3vvD9bWcM4hG46Aa5t7GNsnCjyM4wR4H+aVHrewTl4PcYBnnNsQ0NsYO2UIhDKOKxpz1NYU/wYFQwRtmJV3RjT9hoBzu09nFz7OMdOnnHhlhbFnM8YnvTtEU9NGQLXvDCFKugR82TdPMkvSJcpnNyJ0qhJw5Fwx7TGIaXXXSOFb7jHhpiRmtfgUBdtEIUhQAXMr2FCUcofesb6vqGugEuOS5sYssIRic6MQ17tIMZ8ZAFJsxxFmlgAhtIwgZ74IGIYSjsF7rQxS5osT1Z8MITeBjGNGgOeMFr6BS/QODhDz+0YaDiFLYAhyz2uQoH2cMXnjiHhpxiD2/0wxmY0AUQheH5IPZ9pWsoRCvkxg6nWP/6VbB+P1D+4Yte6AJ0h6feMFA1C0jc5RmrKMvRdWKP6/8DG//AhSgS9jnRBWMXdeDDMOneifm/wv3YZ310hwzDMEe0dwulQwu6IAwEOAlOJgtmsTrS0B7Xh3mvQAs/FHtP1wq/IApr0AkBVTSZIAr/B4BOkX1OYQ6hIAq74DazBzfAEHvVAwyvMAm8EAyX0A1l4QuYcA4AaA/bEAoY2DCiIAqY8AiFUAy3ICmP0Ah0wAWFgApNYYIo+A/+sDSQ8Auo8oJw80m0UAiEEDN/oAblgHS4QA8mGA0GNDGYUAeYQAtKoDnMdwuDgAQbMCqQUA8m+A9V6A+YEAvKoAaPQAsEOHvVAzf+AcQInaIIX7AI0eAI2NAPAOgPSkM6SjgvD1ADy+B5wfAIwEAILxALnTAIaEiF1vcLVpAJ5DEHYvAIv4AMBlg6HsgGeMApivAHX0AIq/AOe2gOFNJDtyAKdVADhbAMobcLkPANaHACbEAHpLiHKFgKT/AGscAFXjAHc9AFmTN+C/NMdYAGVGQKoIAJdEAHa/AM93B9SAJ+oeMLvrAwrQAMonBCfxALwEBIzeAONdd1i1AGb/ANeAAAP7AG2NiK0lMMw3ALCkIHNigcdIAIUdAMSXI/v9AJTnZ4xWA9c2hHmQAMrvAIZRCSZaAHiVAKpWALtvBAYFQKc/CPf/AAL1D+A0hQBueRBW+IDPP4B3TgCCgGCrJzPBHkFP4ACbegLcgwPaIwR7/QC7cgBUigBV5Ak2tAkAR5HljwA6HAh04xDHOAA41QCmjwAmJZA1pQlU9QCHXABrjoCLIgC6agBGjQBEhwCeVgfX4yDI+wBk8nCszTQ8EQSq2gBCGAAzJJk+exBl5QBWqACYvgbeI2DXrgCXHgComAAy+ABFZwAuzkBWygDDrZB0oQB6zjCFqgBFwgBkiABvFwMfAgC7GQCTiAA3VQCLpwlMOgC5jwAy9gBSJUAz+wMVzQCMeQDs6wMi0DD8egBvxUCqC4ATiABycQAjXwAI1QD6VAB2ygBJn+EAu3oAzYgAY/IAZe8AoXEw+4cArAoAxKYAViYAXR1wp4Uwg1gAPrOQZjAIpSYAu15g6yEAoTBw/vcA1f4JWxwAY4EAY4YARiGQIA8AftUApsYAVoEAvf8A3Y8A3TwAUhuUsXYwzBgA3A0AZWUJpSEJN1UAdqgAMPgAMfpgWlEJqoJA1BuArq8A5Q8A7qYA6/AAVfqU5agAM/EJsv8AB/AAylIEKJcAtFdaGZ0AQ10JgXUz6hMAi/AAyxOQQvEAKgxQfzAgWyIAknkAhRIAa/sA/2wA6h8EDRcATREA3SgAs4cAkBpFhdMAc18AI4EAJ4oAiNYAVW0AjAYKFFpQz+UfAIrgCgfgIP5okHgwCIYoAHjdAGeco6P3ACu3kFc6AGWaAEdGBdpcANUgEjUXEP1MAHv8BRVYAEWdCVOBCmkcqbmXChS4oNf1AM5Hk03IAjvxAKoeAFWqAMePAH34ALTdAJbzAHhYAEJ7AFc9AJzsAddAkYPcIOinAMhCCTtlIIsRkCVmCScFkK3Vmh2OCdt3cJRwMrAJqbNZBCjdAOrnAFuLAHdTAJbNAHduAWr2Abi1AO0tojAzYYv+kFf3CnG1ADUVAKVkAHt/AHLyAFsTqupfAK6eAnCWEHTzAHv8kF3+AKagBF+VqlpXAEUOAM8IAP+9qv7tYMtFMKioD+BHvwBntgPHQADG0ZBlKgDDhbCg5hBxqKBIXwBotQRqVADfVQFtOAC32ADmaxHSjLGfEgcu9wCW4BCaVwAm0ADM8TB22gpNigsxBBHkjBD/YgDQbmDfYAD9OACAHCG+TCbqugCDCrB41wAkoQC7GgSbeQnpmAEf3wDkQxVOnAYn8RGN1lD38CfI5wV90wDQRhRmGAB2VkBxuBD++ADVWGStjQJ/YwYPsAI237DucgDcCHCZ4wVOuBEC+QBiCRHKHbZ6ckVO54BO54Sp7AOquAC7RmD/2gEFuguiJhpu/QDdLADL7gJWkgVJHCE9OmuzYBvH1iDn6iIfdwE9RbvdYTe73Ym73au73c273e+73gixABAQA7',
"misc":			imP + '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',
"miscgs":		imP + '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',
"setup":		imP + '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',
"alliance35":	imP + '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',
"alliance35gs":imP + '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',
"mercado35":	imP + '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',
"mercado35gs":	imP + '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',
"militar35":	imP + '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',
"militar35gs":	imP + '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',
"militar235":	imP + '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',
"militar235gs":imP + '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',
"misc35": 		imP + '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',
"misc35gs":		imP + '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',
"setup35":		imP + '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',
"aup":		imP + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjIAP8JHEiwoEGBWKocNHhFxYosCwfCOfECBoo4EeWYEAGDR4kLcw7aiaFBRAsXLDqkOGhFAYcQJEaQ6ABBSEEyBSps8ADigwcOFgi8GShHAAIJGDIozWCBQoIAdAQ6GHAgQYQIEyZIiLAAgQEG/8Y0kEHDxo0cOHLcuGGjxowHYnrskLLlCxgwYfKC8cJFyhMfQHQ0cQJFy5YuXbZoieKkCZMfRKiYQaPGzZo2bdi4SYPmTJkgd4oYOZJkyZTTp5MgGaKkTsSDAQEAOw==',
"adn":	imP + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjKAP8JHEiw4L86SoYgSTKlYcMlSY4YKXInSJkzaNK4YdOmzRo3atCYoULkB5MmTqJo2dKlyxYtUJw00QHExxMpXLyACcMTDJgvW6Ts6CHmwYwaNm7cyIEjxw0bNGQ0GPOPgQEECyJImDAhQoQEBwY4EEgnQAIKFjKozYBBAgIBcga+IWCBg4cPIDxsqFCATEEhEDqQGEEiBAcFVgz+S9GBhYsWIjTEsKN4zoUSPGCIMBFX8b84KGC8OAHH88AsK1RcMU2wChbWsAUGBAA7',
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
"pa":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAMAAAD5aj07AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABYJAREMFBIRBBYQKhk3ACIMByQdAiIaDS0YACwzHjQuBDoqBjsnEzgwHyotJiEtOC1HDCNSCD9bFChhAixyBDhsBjxuGzh/CEAkBUcsAEIwAEY+E048GVY8BFA8DlU4FUEvMWU3BGM7AktCAUBFElNBBUxGL0pTOFdPKF9ENlRbJ1pTOUh9FkJiLkp7KFp0LlN+OmxLAGpKEWJRAGRTDW9cBmNUGXNJDH5OBX1HEHlWCHRWGWlPJmVXJWVbNHdnDn9mD2NkIHtrLXxqOUhMQEVPUF11QV9qemNiRmBpWG5oUXdtRXZmXXtrUnJzV2BqaW51ZXJjekaSCVSMJV+bM1CoAlKhGFOzC1+/FmGxHGWSQG+QSnWKV32FdHavSH+LiotrAYdjEoVzA4RyGphjCJR/Dp18AJt6D5p7H4JmKYNmPoxoMJN+IKx9A6N1G651HLZwAIl/WKl/X4qCF5eIApCFOZqBOaeGBq2aHLePDrOUFayLKqOPMLqcO7qhAJaCSJGMT4KDZYqdbIGTcpGFe5mRZpOSc4eiXoKqYZGqdLSbW7enQ7yjVqulYLCofpXNbcWQBMCbAcWtFM6qFNSkEdq4Cs2rMcWyOOOxBcquSNe+WeDFTImWgZGThIKApZmlhZimkJ67hqWOl6WhhKSkk6q0h6q3lreylaqusai2oaq4o6CysbS0o6Cy0LfVjrjSnq/Mo7HNpb7Io7jIqLXGubnHsK/G2qjawLHJxrzFxcfIi87Hm8fQn8fBoMbEsMXHvs7Yss3butHKodnVrd3Wtdrtufb0lOnpu/bqtvTqvP3xvPz9vcTXyc3ZwcXb2c/X2dXYztjVwMHd6sXa+dfnzdnmxtzkzN3vx93k08vl+c/s99Ts59Dq79Dj/dXp9dLt/9b0/9z3++Duzuroxevsz+Ts2Ovl0eH02u321vHpwf3zxPvyzPr4wPn5yvzx1fny3fv41ebq5ubv+ur16eH39eDy++f+/f7n4/D34PL18fH2+ff68Pb7/v3//AAAANncWdcAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAEeBJREFUWEftmXtUk2e2hweZgsrFSkFAIGiLIN7lkmABISJt4ShIEUERJAGTYCUoRU1CQEUUoVJKJGhEnIQRgxlsdRKjeLyRAzaGEqyYEAiRXIAGCNGoQDkzZ5z9UWsJ2rXadea/mS+LtbisPPnt/e533/jDy3/d84d/Herlvznrh4GBAb0Mnk65QPBb3Pqr/gJSv66zXy5qarp8q7Z0++rV22sFUoGUL+3se/J28q+x+vWyAZlMLpM3XblcW3J89eqVK1dvL63lcvkt4j6xZOhttF9hyfrlcpkOWE2XS0p27EhYudLZeeXK5JLjR7gtQxKDwTD0FtxbWbJ+oMjkcoCJvinZkZAYv9l5tbPz5sT4hO2l/D6jeAihiadrextrAGHJ5SLFPXB8bUJi0rZEp9Ufr3COT9yWmHD8VovBKDYMGYZu3Z4GewurEwhAEgmu3FN06RXJCUDYnJK6eGX8tqQt25L/u6WpWSw2iZv4R7jmsDdYXV1SKcBEAoFQINJ3/V12Gdzu/M6FTUWrl7skxi/ffuFCSuktsaGfzxZI5WawaazvHwqFPK5IBO6SKfR62VNh14vrc9LORfvMiROlvOPg/F55lIPT3KVGcTFXKuqXd06FmbG6pG1XeXXnajhSuU6nk+ufDVxetWq1Q+KKmUeL7WKMd5Y8LOeC3+a5zCtaNVcAHygSsKfAprK6vm+7VFfX0JAWzZHBGeo79Xp+skt8UpJD6uyURR9vD9tgWLXKwcEp3snBIcHF+TI4lR37X7/AprC6pMKrDRcbblxMS02VynQ6vU6hT3FK2ro1ySnFIcFxs8tyh+TNiS7x8dscXbZsTUos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',
"cw":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAMAAAD5aj07AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAkFBA8OAxkIDBoZCBwZFhQxACYTAyofAC4lGSspFCkpGiwyETEpDT0hACgnITsoKzg1JjI3MDs0MSRQBDRdEzxTGjdCKCtsBjltCjl/CUYoAEEzBUA2GFw9H00+LFtKFUdEKENJO0hFMUhFOkdUKlJLJ1RUIFVSPVtTOkJvH0x6GUZrK0x8KlZ8OlpyOGBBD21KCHxTDXZeInFfL2lmL0NESFxLTVNSRVZUT1xlRFlnVGBeTmliR2JhXmpnV213VHRoQX1gWndwVWp0YW9xbH1tY3JxYHtxZXt+a0aAF0SUBU2SG1WNJVaLLVCmDli5E1+hMWSNQGuJTnqKUnGeTX6WTXmbXWiIc3eHYX6BeHysVnu9SnXCOn6DgoRXCYZpC4BoH4plH5NmEp57E4BvPIxwNJV8Kox/ToB9YZiFFK6DAK6NKLGbIoeEX4iDWIuEaoaBcoSIdYmbaoeWcZeRbJyRZ5SSdZKSfZaseZCydJ6xd62bWaWWf6ekd6akfbWteY/CbpjQcIOahI6UhYmTlJmNgJWShZSpg52khZqljpamlp+npKCfkaekhqWjjqyihamnmqG5haO6kK62l6u2nrCyibu2iLe0lraznruylKa2paKyu6i1s7Ozpa/ckrzEjLDImLTemL/GrLzJornJrbzFtLjHvbzbqLXGybrR3ci+i8S2mMnKi8DHls3El8jDntHDntLOmcPAqcXIo8XEvcnFs8fXucrXsMjVv8rZvdnEs9PUrdjSrNnbq9DTu9vUvuDRrujivPLqu/r1vcvYzsPY2s3T19fTxNbVzdDdwdjcw8Pb+dfnzdrnx93lzdvsw93k0t3m3M/k6Mvm+c3q9NPn9NHj/NXu8tzs8dTx/Njz/t74++Hvzunpz+Hm0uPj3eLu1Obu3Ozm0+rq3Oj22fLrxP3nxvfzzPz0xf3wzfnz3P781fj43uXt4uzt6eLu8eHu/+fw4erx4+vx6ePy+O/09/Xz4/Hz6v397fX38/X6/fn79/3//AAAAAAAAK5rAZkAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAEg9JREFUWEftmXtU09eWx+8vBCtSqwGtj6sXeUgTFIU+LGBC9EIIKIpWLeID66uWtmoS0KBWsCUQHoYkkgghkKkTAdGphgZ+4Y7yCogxNA/KQ5SQMWaCCb/EmU7HG3JrF/f84oNotdO71l1r/un5wS+PlXzWd++zz9ln7/xh4p83/vDPQ038zpqYuGc03vutLn21v8bHzRMT/2Ey6Uy6iYl/bz53JjN1U+qvYl/FuufsNZp0uhGNxqRWN5+7cPz48Q+WhYcvSz1eVvYq4MtY/wlMA2p0JpNGq9VqAOr49u0b168PDw8LX78lNTXzbPNLcS9hIffu9ep0Oo1Gq1aDm1bdjKI2Jq8PX7p03vzkjes+OHZNaX0J7Res/9WYdBoA0mnUarVCrdZr9RfObd+YsjZ5/bKti8PWpqSkbPzwcuvoaOcvaC+yfjTptFqdpqdH3aNRK5oVgKZoPvMlkLUufPPWOeFrUzakbNzy9bVrra3XXoS9wPpRZ+oFDIBQqN2sZrVG0Vx2fMsH4eFL0+K3LluzJjl5zYfHMlNPfP3t+bPP015g9QLTFG21UqEQVYQCweuyM8dTly1fFYf3T+zZPGX2kuWZ7y0NX775RE5WfJwn7XnWj/d6ND2KGnFJMau4BrhKq9foFOeAqvVrluKptACSHf5TB680JmzevCVhy5bH4KkZHrDnWOO9Go2iVsw5zT/Niheq1SAgwBvHtqxLTlkbFj9t0+vLU9+Ks24OmzVr3pK5s2cvnpPBpHko82Q9Gtehok5XV9+oSk/fVosGhFZfkzo/ZcOGlDWbZq1bsmb+mtnLlqSkzF+7IWxeGPbQpYYC3+xn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',
"ew":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAEYAAABkCAMAAAAMlLaLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABUKBR0TAi8TIiggACE3HzEmDTAuGT0rHz86HS0vNTY2KitGFjVNDzlCGTZaFD1cKTBkDj1xFUUnAEQ0CWM9B0xFGFJHAVhFGk5HKkdGM1dVNlBbMkl5Ek9/JUl8LlxuLVN3Mll0P2FECGpMH3RaCn9TCnFZG2RYIGNbLW1aK31xLnxwPEtPS1hIT1hVQUxgR1x1ZWhURmZkSml0TWR1W3RvTHxmXnhwRHFxWWhtYWtxcECAEEqPFkqaDFiQLlqtHVGzAGKHOGSpM2q+KmmNSW2XRXGJWX6QUXidV2iRfHyGbXWOcH+DfW+nSHOpTX+2o4xsGZlnEolsLY9/KoJwN618EbN1Cqd8J4t/XJJ+S4mBGImiMqeFDaGLEr6eG4uDSoKDXomBUZmORp2TWYSCb4OeZYaZbo6YfpOUbZmSYZ2RbZaTfoOrWIO8WpmoWJSqeJCybpq4e6efbaWTeKugTayhWrWoR72rVLyxX6+nbKezcbuvZ7CjfbG+ary0doHJTZ7KfpLVZZ7Zd6XCVqnCX6PCabfDY9i3ZNG/debSFMrBbcfCdsTYasfVetLEYt7ReoKPgpOVlIe3mZumiJimkJ69h52oq5u0pa2ag6OlgKWlkKe7j662nKq5mbq0gLSznbi1kaKooKS6oq23tJvOo6jPiq7Glazfi7PJmLvLpbvKrLXIur7Jt7nYoYvXwLbLx7zO1MrFic7IntTTgtjWl8HFrMjGpMrcq8LQs8fctM7cvN7WrtLYv9rXtePOgujciPbXjOLOqufVv+jWt+bpu/XqvPvyu8DHw8PSyczdwsPa1M/Z2NHayN7Yytba0MXb48be9dbnzNnnx97ly9npwt7l1Mvl/tju7NLr99n0/fHc3uroxeDl2+ft0+Xu2+nu1uDw0Oj32vLpwfzmwfnsy/Xr1PDs3f3wxfz3zf/6yvT81vr31vjz3ebq4+Ht7enu4+jr6Or04+v26uX39/Tz6vjz5PT28vH2+fT4+vr8+QAAAAAAAAAAAAAAAAAAAFb4MNMAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAD8pJREFUWEftmG1YU2eax0dGQYwSUFAJCKLyDgKCGN4UoYqCMKIVC7MC4UUQUXBZMoIIbLcGWWgILAgDiIKOuxIZDSB0TAIpDYGN0GIIIWFC2CSESUJ2VYjS+qV7n5MEwbZz9ZqrH3tHDpJczy//+/U85/nN97+I/eYXoXz/K+an4/h3YrP05ueH/ycxr19NT08LBMgP2Ci9/cGDKw9y793+cfSPY5beoAyBgMkFY/JHue23rhy/dPT8iSi/I0d/90PUDzHv3r1+82r6m9HRHiaXDsZFUO3NV44fdziyy29/xJGwQ2FHPwR9gPnu3bu/vnkzLRjt6Lh3uwfWA4bH5FKbzx8/au+wy8/WNyriWFhY2JEPOKswS+/evFn82ysBv6Pj/t22ujoqd3x8nMfnccGjmEP2DuZ+trYREcccHMLswlZzVmJGBdNvpmdgVUdHXVtbW3X17R4eiqHfOhoScjDEfpf5rp07jxwJC7MDW8VZgflLS3s7ly/gcjvu3kesJrq6g8+TSqXj7ecPHQwNDQ+2x9rtCNmxw27HjpDgkODgFaBlzF+ac69caabSmXRqQ9v9YRqNVh/t2cDnAYefax8SGnr4YPiOYBB1MAQMua7kGDD/efz48aOXrtyiUqm11W3DI7Rh2v3ooMAOiUQ6vng++HDoQVi5A5aHhsJ6lBMcvHlZjx7zrzExhw7FxFy60tzckuEDHHApyKfau25iXCqV/ckCgQRbONgBIHizxWb4BRR7e3sDR4f5r9LQ8JDw8PCYo+ebWzIz9/sEBgb6eLdl1tGlMt6CjGu+Gb7aYuf1DAfsZotNtpsc0L8ddpmvxpSGgoWX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',
"rap":			imPNG + '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',
"upgr0":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABo0ByQtFCk9CyY6FTI9Hx9FBSNCBiRBCiVMBClEDitLCSxFEitAGipIEi9MGC1SDjVKGjVeCjdYGDZJJD1TKDhlCjZgEEFdHU1PLERWKENXNVVIJl1QKVpaN0VqHFFvHVd8HkVkJEtlM010JVFnN1V5KltzPl99M21HKGNYLGxZPHVdKmhmOGF/P3hiK3lkM05ZRlZUQ1BlQlxqSV1kVVp0RF9zS2RhSGRiU2Z4SWV6UHZsR3pzTHt3Vnx8Z1eKH0+AIVqIKlqBNF2SJ2eLOWGTLGOUMmiVNmuTPmqaOW6hOXOnO3izNmWDQ2mBTmiJRmyEVm+cSHuCWHGTTHaaS3qbTHeSW3aJZHmFYXiNYnqNanuFcX6QZHekQ4RZK4VqNYNwPIV4SYV6VoK2PYiCV4iTXZSFVYmKa42PcIWVaIeddI2VcYybdIybfJWNZJSTa5iaeIavW4O7QoajZ4uheJagbpWleJqzfqKZeKGsfIbFPobRO4vIRY3UQZbUToiLh5Odg5WcjJmdgp6fipWXk5agiZWqgpyhh56nj56thpuri52zjqOnh6OukaKonKKziqS8gqW2kKSwnKa8kqyxk6y2nam7lK27nbCvj7aulLa6l6q0oq+1rK+/orO8orW7qbq9ori/qry+s7u9uKzDlKzBmrbEnK3AobnHpbzDtr7DvLzLsb3UqcPEn8TIqcTLtMHLu8vOscPUrMTUtMfVusbZssrSssnUvMvbtM3avNHKo9fYrtPaus7jv9jkv/Drtvz4ucPGwcbJwcnPwsvOyszSw83Qy87cxNHVwtLWztLcw9TazNjexNjczNXW0tXZ0trb1drb2M3iw9jlyNbh0dfr0t3h2d3q093w1ejoyeDh0OHj2eHs0+fu3OLw0+Xx2uny1Ojx3P34wvr53AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADlQ5SkAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABEdJREFUOE+NlP9fE3Ucx8+iogIVh0hLtxpzmF8CF9lO8VZDmMhGGRkWMhdrsahwFy4qGkWkFnmAmc08E9FgnUY3BAU2FpvUHG4q6scci4vZ+j8+fY4N2MN4PPL9wz3uy/Pz/vJ63+OFwXsM7B45+H/gWT5R0AfnBa9dRx/3xUp9BuEkPPrh0Lxg22kIb+RBeOn3Ud/64KTvzIEdh7j5Stfuh7A35ayvrTfyXSobafJ1F79/IRH8ka91EcLS7N8CtYubpio67uQlV3DPnThRWmhPAEeVPLjvcq80o4PbvuQZf9brkfTkpT+n7bq1XbY3ATyed+PiqdufK3GF6DH82YyFFonwq+QHU/Hkx90vqlZh0Hf6GgPh+KXrmzJPjikVSoodjnpokpCnLElJffThRxaIk47+VCbEztRkZ8l+ILOEwsXLXsNNx/6JovB4o1GSwAULFj50/7K6pLbIYD5m2SGT6pIksifTMjJwkxcR0Sh/8XqHzQrBIpWg6NOXy78NEFjhVk2RWLJULEjNwMkwj02T6IQnTOLqRuvWLdqGV9sN2Da1RleiEoi1KiXhiuWKs9Gom2i0NtTVvVlUXFmFqZ8v0WlUArXVKqdjheNJ0YOXljd80tioKSpvJ7FiXZFULBFkipWEJxGc7sCrtFobrdJSBrixArWmUCYTqDQ4NVM1oTiltGpKXqjg0N9Tn/3AffL0Qq0ORx3OpvTE69MKrVqr2ggQ6GSI9YclKrVU7p5rcPbOI9I+oVp1EK0WC0VM8ne2abaoRbwkM+rEqqMXItnyTRYwhUCOqzYAsU6jlvPruCs8Hjmp990J8T1OhKqrBpZn6mSox/+GC/8+58qpiTBAPdrWrbOYn5YskjTPTj13wKx4O4f+YpdjDGL+ATvbz6xUNCcZwvHOEhITIlMuDUhqEmIH7CAcAgaDPU1KxQWMT4QkOoavIVa3+DuPBCG2t/xrWwSBNULBxsQueQlcxLsr3rPfdJ7rvAqxrlcKXroAAkNHVmxIN8d1jv0VXg+pqF1N/hr6spNFU9+q1xX2+bm/mKeYNaK3EInWE9vQsFlkatljYx00G+ANwN/FhAAA5t3te4y5ZfTsJJSR0FsYN0XSvoDjNm8AAEwB4CQNlnoqP19oJF3RcNhFldUcMuoV7TQ1yIWAf9pSQk6Gam6q7aSOU7kmcneZQoTCmGPuoz6iKbo/AtBeYt5zvrWZbGUDU4BdS5iI+jcMtuqWj/XGHjc30UszHFp0HBzvaKU6zgcHnfbczT2sXV81NGT/YK2hiwGc/ZeOiZhbTRtA8OT+yrJaBoz0jUwAe9XmHnCTYfsATV1hB4KTCSC8fHjnyqyd/eCPEDfSTZj6wd9oPpZ20X/O+mzcUkYPVhZssA2BQV4pFIHA8LDbkejGM94z7vimprvPCQASA5xjOll2Ltlcj7GT44EAr0TQMcbSg3dh81szhFcTi8bu/wUUhzueP53uUwAAAABJRU5ErkJggg==',
"upgr1":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABULBykVDC4lCEwiBkMsFks2G1cnDVQuEk09J1U+K2MsBno+Ck1PLFpaN0NoHVhjHVFzKG9OEXRGCnNCG3lXCnJSG29MKGddNn5IKHlVJnJaOmR9KXltP3txN1ZTQVBRXFVMclFaZF1eeVtgWlpjfWRba2ViSGRjU250Snx4THx4WWdofn59aFVcmVtkiVlho2Nqjmx1g2p0mHN6nmBqrVuHLWiVNHKqN2iCSG2TRHqDVXOaR3mcUX+AaHuBfX+cYX63QX7EOX+Ih3iBlnuGxoM+CohGFIdcBphLD5FaA59XGIBPKYBUOpdZK5NcNoxhCY9qH5hlB5plF4RtN5FmKJplNphzOqVOCqlRC6ZYG7lYC7hbFaNcKKJnBKx2CalkJadoNaN4ObJlKbRpNbNyO4l7Q4h3U5RrQZh1SJV5Wod4aa9sQKx2TL14Q7h9UMRYCcdiFd1mDdhnEsp5O+RlCsF7RpaGPISpOIqES4yKW4iTXZGDSpWKVJKUXoeJaYuTaYuZdZiGbZWWZ5uad4KoWYK/RYinaJWlepi3dq+HR6uBWLyASLiDVbmXRKeOZ6iPcKOZaqOXdryTaqmneYXHRIzTR5DXTc6dOcmCTMeHVNeJTdiMV9uSW8iUaMOadduVZMehSteoSdOkUeiWWfCVVuaYYeOsXOe4TO+1U/G5V+OhcoCKlZmahoiSvJmlipqol52xh5iloqacgKWnhKismaS3iae1lLWrhraulLa0irm5laiuoKyttai0pau3sLa5pLi9tK2zyKvDjrPDm7jRmbjJpr3FtrrQorzHxcSrl8y2lti8pOargemxh+u5lcbFp8XMt8HTp8nYttHKo9LOtdrbrtXVu9TlvPLGqfDSvPDrtvz4ucPKzczYw83R2NTZxdjc1tfmyd3q0t7w1uDfzejnyeLr1eLyyuLx1/34wvr53Orr5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ7PC0EAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABHdJREFUOE+FlI9fE2Ucx68faGVOJ1kZ2fqlO1sght6dDrGygsxwzoDyJxiNgCx+JAZiiJsKxqgZmIwNJx1XmQTWYMJyLsNBYXVjs1Eb63gON7b6H67nbmMs6/Xq+3rd3XPPvZ/P98fz3BfhoubsaVAfLnqiRkffCNyYmYx7IsKYdY07HGMjDguk1RcHR697PJ6baB4EtMPlAiwbmpoC42P9hw+qdbwNupmbFHlqeirEAkdfPQPv/Q3vV6tqDx3StdDXYyjCsX4wHQIMbdaptikVdDAIXEMtalVNdW0tRK0zqggHAAiZ71ds26Tcrdy9NfnK+Y19ll5Lj6amWqWqVg+6opoIC4LTzqUnFEoeVCqTvlqd9vCjy9I2WCyamoyGIdc4wwoo4rcPT0ibP8/KUkBMuSffbAd258TzK23A73IygLF09wnekSupax7Z+8W5vVmboOYeZVZ3BioVzUcfX9Vrs122/VB6bxI6IICXlpfe92nnudMKpWLx4sRkaYaZ9oS9Vo1MkpKSuuaxRVuXr1o9wYPXjG3ZBxLOfpaz6NY5SWjdwJ/hsC/s9YXDGhlq670zcenXK9Oem4Tgb4YlmXkJZzubEm55AK3zQYIn4eXzqFFNndQVZM6n/QHBHw0vb86943Rnc8JtqCbAYwIJV3gDGrTkiJ3963LKJQhebCKNb7yZ19w0J1nm5rUEzcjDIyON+04Gv03ZMMkhZyiSNBmrCnLvklgjjqMgfPFZJSRVAmypT37HIR0kb0aSSpZ540FB1VdKaukgWPZUA4fktgkk2Y6a/+E28mLO0IVCQX/9eheypcAAgywszEdhhDFJb9S/VVps9YDQhfVjyDt6kqx6tXx/pcQzG2Bs5BVRen2R1fH0EPIlSVKFO3e8mCjiSxLLOFJPX1gEP1MljsYR5BeYdcHc2+dlSqLu4nW9Xgl1oNg0am+8ivxugmvatmy+m4/xX87daG7rewtl645eRbifSKjZZcyeq4llPcurpfipVgLH079HuJ8pQzskTW8VBSKS8bqy4mPHMAyS/RCM1BveYCHjzAdjHkBVBNH6DIGv40EjX28Kkivc8RwUdstMDz37SStBYDx47UyHCSbU3lZVpY5P3OfzaqSmvPTWUwSG8TF6aNo9CnccHgzRQUjC7Yns0K9qkZE0iHECE2N81hwLWOZj6Ny066VMuTXm3SzXw01rWoiLFywQH3fxYJC18yfj3bKyF3LnyzXucCDgNstJUvt2m/4VHBNDa+SE3sM6i7TajtcrK7fPu8cgl4qg1RgpyqSvynmQICCKWQSQAxznZ6z5+yvKXsvcZRKqAK0Lxl2MEzyZPhwBoQU8BRUVFeVl25foig0R0KDV7itZATkCP87EQGDNK9+xMz8nWzPyDUV1kSa99qOWPqenHsNx/KgD/lwRQZYFIzRNwwYIQN8HBlL/Ic2wLJxuwHDxWsjNgJMMG5hphaz1ZFE34PjexLIX5GuldfD/j7kW5qPqsREssd/S0zMs9J7Z2f8aAdbl5/X+F5xd/DckPzbTuvnomAAAAABJRU5ErkJggg==',
"upgr2":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAC5KFzVMGDlXGENbHE1PLERfI1tXOlpeNUVmH0pnKE1lM051JFdtOlJ4Kld3MlZ6MlxzPV58OmtkOFZTQVtgWmNgSGNhUmxsWWZ3R2p3UnZ6Unx4WWRpb2txbWxwdX9+ZH58bHV5fHp+gV6ELWCLMmiZLmWTMWyTPGydNGuZOnWnOWSDQWSATGiGSmyKTW+HU2+KUm+aQHCNT3uCV3GXTnWcTHmWWnmAaXyWZXehSH2Bg4B0TIiTXYuLb4iYbIWTfIuecYueepWSaZSdbZ2bcpybfoWkXImlaI2oc5GhfJGucJOrepird5i1eKGrfqPDfIyNjoWLkYmNkY2ThoyQlo+UmpSbjZ2fgpeck5qdnpuepJ6eq5argZuhi5ynl5yomp22g6CeoqCmh6Sphairgamrk6G0hqCyi6K9hKS7iqm3lraulLO0lLO2mrC7lbi1nb69k6CipKKmq6WspaWpraqtrq22oKywq6u8pa2wsrG2prK7o7a/rLm7p7u9q7W6tLW6vLa2wLS6wrm+xby/yKjGh63HkrLNjrfDn7HMk7TNnLvNm7nWmrbMprjEoLnCrbvPpbrDsr3Eu7PSoLzUor3cor3aqL/Xs77gpMXNm8HbncHJpcDLrcLLs8TKvMLco8PTs8XRusTZssvWtsvUusjbs8vZu9HKo9rbrtXTvtLbtdLfvcLhncLgpMvhtc/gv9LjvPHrs/Drv//xtv35tfz4u8XHxsDEyMTJysjLyMbM1MnN0szVws/dxczR1c/V3NLXxNDVy9LexNPZy9ncz9HU1tLV29Tb0tPZ3tHU4dXa4djc4tvd69TixNrly9rozOLiwe/nxuLs1P31wP/2yP76w/v5yPr53OPl4+Hl6unt4+rs6u/v8Ory4/H06/L08gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKBcQJYAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABAZJREFUOE+NlP9fE3UcxzHRrZMm2NpJLeOLFSpB2XIBRSmNDl2L0LKyb7NZsdMSjEr7JpGfzcnH/NKdzZV9+CKOjDMHXJmUGiZhNBDvS9oq/pP1vtsYNvjBz+Nxt8c+99zr/Xq/Prt3Rvz/a2LjU7G0rcTXjLTdocaCxusCm34oLLgucMPIjoILE7Hz0+C00rHGqwNNdzz3c4I7pl1bzs3gMVZYcfpsy9OLjr67D57+tK49/t1njq0zgE3bbq8bGjq9dlHFOnh6cO36+OBuz5bp4MSG4ea6luHhlmdeeP5oPL6zpa6iva1TM5AWz5UdV39fn09bDHPoW16Ot709cuqVe1YdmSHHC815ljzPl91qpMFhNUcP7jxQsqRk9Yud0xR/pCs3/ykrkhSRJNlhpS93rbjrzuwHvOng33RlX5+kKIooSZIodVfRg6vvK1laNA2kq8cBkzRUEUUlMl5Nx9vbXI/vT1PMt4Y1SAIUPkBV/cY6dUBTJ3PF3CCKmpp+SSJo9jWYEycEnafAgXxrr9g/icmqpi2KeU6u6yT7bPXHKTBWuNCjiv0Jg4mbCDdPnpvrWPVm5Ucp8PttC8OSDuos5KNLNlhqnHs8r742pfjOGfNxNammM7Iqq4oaMTBl9Y+wL304qRhrPGOQ+8UkqjetquBRNaxh3E/cms9Ogu9v/MTcKyo6mNBVNReRXrPdVsMsLlqZBI88+F4zDR6TDjUswYdpxNiZ5eXOBDj46KenRs5WQ61Ujpo28FUWl99bb1/h1cG/fNt3XfxjxNqraono4ciyJq7K1twFSFv7Afx34oMA+e3iAOv1yAAmNaGRiCpvpqlZuQi5EAbw1+1c8JBv7xc4lBtOWoNwFLFflMPWHCqLcqFaxAG4j8UCL/A8xrgqkigtKbIKZx1xWCiTiZrFoNpWAL/CAoHF+TAxPhxRQQoWdKV2VxnnUTdmU3OLkcsH4DEeCwLieZ6EyP22BlWW4UhkRd1ko3JmF2XNnZfrQijQlhGPkh5C6nlewCQwf+kcmyMsj4+HN9lw2U0UY7evAQxh3JERH+0KhQjBLhQQuNK7ly2xWQxGo9GGCXYHEPYHMEI9mBuEHKMEihLeFxAEp2lZeSlPnAwnkKBAtAYxrkF4T6ce+NgJATYFsFBGZea49957Q6bbT0gwCO7BETrE7j6f+j8KUBnzn6Obn3TbM+ebFizHQogIIAB5IPaaV+Ey7PXA7x96rDibMmXNXswAFQT32PsGq02s1DvzT/QEwQK+zcaUUlSWqRiByxCPA6+z7IFf0mbPSYKxq96HfVR5LYNDHDQSeIvd+vUMY4+0+v2Y49wQHE9Ia+hw57nJ2Zs2cY+Tw+Tb0bGxjo7o6OilS9cM6P8AlcpIworLO5cAAAAASUVORK5CYII=',
"upgr3":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAE1PLFVMKlpaN39aFGVdOHJZNGpjLXJqNVZTQVtgWmBZRWNgSGphTm9sR2RiU250Snh6Rnx4WX59Z3F+gHF8iX2AVniCi3iCk4V7OoZ9Q4V4Yo2BPpSFP4uFRoaHVouTWpaKR5KJV5mVWIiKaY2JcoiRY4STfYaYcoiadp+PeJWSaZmVZJuWbZ2aYpydap2ceJikapumcZqrf6KTS6SXVKOgXqmiXLWmWqakaaOqaq2jYa+tb6akd6eqea6sdKqtfLiuZb2yabW0c7e2eb20c7m1er25f8G1ZMKyasW4b8y+bcK8csS+e8q+c8zAb8XBe8rEfdXGbNXJdNTKe9nHetjJdNnLfN7Se+LVeuTZeuvcfPDdfe/iffPjffXoffnof4OHiYyRgYqSn4yckJWcjJWlg5Kjjp+rhpysiZ6ulp6xiaaohaGzhKO2iqW5iquxjqq5hqm7jKK3kaaynKS4kqm8k6q9mraulLS6hLG9jbi3g7q7grm5jrC9kbC9m769k6Sqsqu6oKzBk6/EnbfCkLLDm7TKlrTJnLrJmrzVn7PEoLbKorjHpLrEqrnMo7zMq77Ft77NsLzSo7zQqcHBgcPGi8LIis/LgcfNns3UndbHidXUi93ThN3Rid7ak97bmsLKpMjMt8TTrMHZpcjXtdHKo9jarNPYuc7hvOLWguTZhOvcguzci+rbl/HegvDei+7hhe7gi+7jkPPjg/Pki/bqhPbpifjlhfjljPvshfvri/Pkk/Tlm/TplPTomvnmlPjnnPnrkfnqnfzxi/zwkvbnoPDrtvz4ucTFycTKxMfKzs7JwsvVws7cw9TbxtXU19TY2M3hwdPjxNrlxNvizNvqy9vj0tzq097q2Ozox+Hm2uHs1OPt2+Px2f34wvr53AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+2p9wAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABDNJREFUOE91lI1fE3Ucx8+W6YI6HTULaHAbUobh1F3NqBQztDKKWMk4WI9W1AClACujGYRDlqOGPRGUEYPgYEI3Hu53x8M52GXFSknmGq3/5Prdw2CQfV+vu9c9vO/z/f4+39/3EEGK30/dVuH0uN1tn7hcNVXVLlfT2x9VVDa89dr3v83LBAKPP34+teXuxjZny8fvHnjowLlHn9q7o8HpPuPxeE5v23bP7rrW5s/+EsFLr9yx5XWnu/ucxWItJQjCZqOsh08+8l5DveeMu7nWWdPYWN26iAi/vnT7q/WumoOWch+kCIIap2DYbGT/MwX7qrrboXBTdZ0bEe696eX5Ky3f0lDHDwmCAoAGYAye6dmBLz4/7oRkdaML+SXtxlvfbNv3QClNPUtRo9yhwouTDMNOsQwAozQY/ubB0+0/eJwe5NKH+luytiatx8gACADAdQ3NTc1NTbIdHUPsBFQF3P76nh97epCr0bP5pf1562/YWAzEYFmWYfzDnfj+oZ8Y3zh84ivqDYejyLWrJ8fAGF2St+FOagKMU0dT0CTVOvRmy+CFwQskBclZcHghvIREQ3upYZKgKEshSVFpSSn2832xoMOoUQ+QPrL8BbgwruRrqDgfKrCVW80lZJmPItCtJ/6JwQjG+JhRg5LEkWGYm6YHvvobeaengB61PtFPlpURaBbPi5x44vneHNSa95zoFQ2+u4J8GjoIF0tRL9oI9GhE4kQSfhGMGNGSUWmF4Es3shh6P3ARusb4UzTeuJyi2qcR/RGTFzUjS6EdAQ56wg6qHXJiRRTe8A41AH7oJthTiyxFj3HAz86wKZpgIiiJ8ymwPwAEBjJakXDYDm+mmU7ULr5RSozXYE9joN4IJoJL9k5oFZhCvXFO8kf+wpFcAgLFJmxXNyJEzz42OQ3ogLpvpcDlq6DKHxjAdbq6Bbhxw6ldM1BftSIIC5D95GOq0cdTTZsrLkujkGFgOECr4yYmCAcjajwdy62TZ+aafWMRB4BY43+Se1Fct/mN+HCF9AUQ9BmVhIl0TrIhs3V5Chfv0wVgAzQRpbIEUqPPbloZV6FNL/UJGpkQPLToBJol68lzLYS2S53fJPU6oYVeTYZL4WTwz1wJHMlRfJbN5oPG5No4p4BGChZJj6gyIclLAcneHFXVMieD0YcHaZrzD7Ks1rGc267NPr7CKaD9SRpMT3Ls3Nw6rdEbi0S8di2WWZnAyaBw/hDcQAAwzExXhzZZBUOry65J5BRwAafE2QDcJDPCcVYzjt2fUb2Kk8HFy3gx/NkQftigAHjebDLl7qpsvw4oCB/o8idmrQQA5BGzCcfxzErPak5JLfRo081PF1ryzSYMw3HDzjV5452BBh1LxdJ1ELoL12XuXL2MhBaKlwY9ZoJimC6jZU3SNaBg3643GPbsrr8upmyK/3m36vG/k4AtntEwBKYAAAAASUVORK5CYII=',
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
				} else if (window.confirm(T('NVERAV') + ' (v ' + nv + ')!\n\n' + T('UPDSCR') + '\n')) window.location.href = TB3O.url;
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
	function dF(s) {var s1 = unescape(s.substr(0, s.length - 1)); var ts = ''; for (i = 0; i < s1.length; i++) ts += String.fromCharCode(s1.charCodeAt(i) - s.substr(s.length - 1, 1)); return ts;};
	function arrayAdd(a, b) {if (!a) return arrayClone(b); if (!b) return arrayClone(a); var c = new Array(); for (var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]); return c;};
	function removeElement(ex) {if (ex && ex.parentNode) ex.parentNode.removeChild(ex);};//remove the "ex" element from the current document
	function T(xT) {if (t[xT] != undefined) return t[xT]; else return '---';};//translated t item if available
	function moveElement(ex, dest) {removeElement(ex); dest.appendChild(ex);};//move the "ex" element from the current parent to the destination "dest" node of the DOM
	function arrayToInt(arr) {var h = 0; for (var i in arr) {h += arr[i];}; return h;};//Sum all the values of the arr array
	function insertAfter(node, referenceNode) {node.parentNode.insertBefore(referenceNode, node.nextSibling);};//insert a referenceNode after a specified node
	function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;};//Create a new element of the DOM (type, innerHTML)
	function $ls(aX) {return aX.toLocaleString();};//convert a number to local string
	function getCrtServer() {crtPage.search(/http:\/\/(.*)\//); TB3O.fullServerName = RegExp.$1; TB3O.gServer = TB3O.fullServerName.replace(/\.travian\./,''); return;};
	function getUserID() {uLink = $xf("//div[@id='" + dleft + "']//a[contains(@href, 'spieler.php')]"); if (uLink) {TB3O.UserID = uLink.href.split("uid=")[1]; spLnk = 'spieler.php?uid=' + TB3O.UserID;}; uLink = null; return;};
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
	function getDR(race) {var tt = 1;switch (race) {case avRace[1] : tt = 11; break; case avRace[2] : tt = 21; break;}; return tt;};
	function getTTime(iTT, xRace, arX) {var tt = getDR(xRace); return Math.round(arX[0] * 3600 / uc[tt + iTT][8] / arX[4] + arX[1] * 3600 / uc[tt + iTT][8] / arX[4] / (1 + arX[2]/10));};
	function getMTime(qDist, xRace) {return Math.round(qDist * 3600 / mts[xRace] / (TB3O.speed == true ? 3 : 1));};	
	if (crtPage.indexOf("vip") != -1) {function getMTime(qDist, xRace) {return Math.round(qDist * 3600 / mmts[xRace] / (TB3O.speed == true ? 3 : 1));}; }															
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
	function createCNDiv(lvl, nlvl) {var csB = ((TB3O.O[45] == '1' && nlvl && nlvl[1].indexOf("(") != -1) ? 'text-decoration:blink;' : ''); return $d(lvl, [['style', 'visibility:visible;' + csB], ['class', 'CNBT']]);};
	function isThisNPC() {return $xf('//table[@id="npc"] | //tr[@class="rbg"]/td[@colspan="5"]', 'r').snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;};//check if NPC page
	function delD3Tb() {removeElement($g("dorf3table"));};
	function ajaxNDV2(aR) {var ad = document.createElement('div'); ad.innerHTML = aR.responseText;return ad;};
	function setDorf3CheckOption(aStr) {return function() {var aCB = $g(aStr); if (aCB) setGMcookie(aStr, aCB.checked == true ? true : false, false);};};
	function id2xy(vid) {var arrXY = new Array; var ivid = parseInt(vid); arrXY[0] = (ivid%801?(ivid%801)-401:400); arrXY[1] = 400 - (ivid - 401 - arrXY[0]) / 801; return arrXY;};//Inverse function for xy2id(x,y) => id2xy(vid) - fr3nchlover
	function addFillTimeRow() {var tbe = $g('l4').parentNode.parentNode; var tbecn1 = tbe.childNodes[0]; var aRow = getFillTimeRow(); tbe.insertBefore(aRow, tbecn1);};//add the fill time row
	function setUserName(aUN) {TB3O.U[0] = aUN; setGMcookieV2('UserInfo', TB3O.U, 'UsI');};
	function getCapitalInfo(cNode) {var aVal = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7']//span[@class='c'] | //div[@id='" + dmid2 +"']//table[@id='villages']//span", 'f', cNode); return aVal; aVal = null;};
	function setLngRace(drNode) {var aValue = $xf("//table[@class='tbg']/tbody/tr[5]/td[2] | //td[@class='details']//table/tbody/tr[2]/td[1] | //table[@id='profile']/tbody/tr[3]/td[1]", 'f', drNode); if (aValue) {TB3O.U[2] = aValue.textContent; setGMcookieV2('UserInfo', TB3O.U, 'UsI');};};
	function getPlayerName(pNode) {var uTb = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg'] | //*[@id='profile']", 'f', pNode); var aTxt = uTb.rows[0].cells[0].textContent; var xi = aTxt.indexOf(" "); var aUN = aTxt.substring(xi + 1).replace(/ /g, ""); return aUN;};
	function setCapitalInfo(aLnk) {var aVal = aLnk.parentNode.getElementsByTagName('A')[0]; TB3O.U[4] = aVal.href.match(/\?d=(\d+)/)[1]; TB3O.U[3] = aVal.textContent; var xy = id2xy(TB3O.U[4]); TB3O.U[6] = xy[0] + "|" + xy[1]; setGMcookieV2('UserInfo', TB3O.U, 'UsI'); xy = null; return;};
	function updateAllVillages(xi) {for (var i = 0; i < vList.length; i++) {var aTimeOut = getRndTime(1971); setTimeout(refreshVillageV2(vList[i].vNewdid, xi), aTimeOut);}; return;};
	function createDorf3Checkbox() {return $i([['type', 'checkbox'], ['value', '1'], ['checked', 'true']]);};
	function updD3Bullets(newdid, intVal) {var aE = $g('aldea' + newdid + '_boton'); if (TB3O.T35 == false) aE.src = gIc["b" + intVal]; else aE.className = "online" + intVal;};
	function getBootyCellInfo(booty) {iHTML = ''; for (var i = 0; i < 4; i++) {iHTML += gIc["r" + (i + 1)] + booty[i] + (i < 3 ? ' + ' : ' = ' + booty[4]);}; return iHTML;};
	function getRPDefAction() {switch (parseInt(TB3O.O[49])) {case 1: dRPA = 'att_all_1'; break; case 2: dRPA = 'att_all_2'; break; default: dRPA = 'def1_1'; break;}; return dRPA;};
	function showDeleteAccount(){var aP = $xf("//*[@class='deltimer'] | //p[parent::div[@id='" + dleft + "'] and @style]"); if (aP) {moveElement(aP, document.body); $at(aP, [['class', 'delacc']]);};};
	function isThisNPCexcluded() {return (TB3O.O[26] != '1' || TB3O.boolIsThisNPC == true || crtPage.indexOf("build.php") == -1 || crtPage.match(/build.php\?(.*)&t=(\d+)/) != null || $g("map1") != null || $xf("//map[@name='map1']") != null);};//check if NPC excluded
	function insertNPCHistoryLink() {var bname = getQueryParameters(urlNow, NPCbacklinkName); if (!bname) bname = "Go back"; var div = $g(dmid2); div.innerHTML += '<p>&nbsp;<a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';};//insert the NPC assistant back link
	function pauseScript(ms) {var ms1 = getRndTime(ms); var aDate = new Date(); var crtDate = new Date(); do {crtDate = new Date();} while (crtDate - aDate < ms1);};
	function $xf(xpath, xpt, startnode, aDoc) {if (!aDoc) aDoc = document; if (!startnode) startnode = document; var xpres = XPFirst; switch (xpt) {case 'i': xpres = XPIterator; break; case 'l': xpres = XPList; break; case 'r': xpres = XPResult; break;}; var ret = aDoc.evaluate(xpath, startnode, null, xpres, null); return (xpres == XPFirst ? ret.singleNodeValue : ret);};
	function setGMcookie(aName, aValue, addNewDid) {if (TB3O.UserID != '0' && TB3O.UserID != 0) {var nc = composeGMcookieName(aName, addNewDid); if (aValue) GM_setValue(nC, encodeURIComponent(aValue)); else GM_setValue(nC, false); nc = null;};};
	function removeGMcookieValue(aName, indexNo, reloadPage, aFunctionToRunAfter, addNewDid) {return function(){if (confirm(T('DEL') + ". " + T('QSURE'))) {var valC = getGMcookie(aName, addNewDid); if (valC != "false" && valC != '') {valC = valC.split("$$"); valC.splice(indexNo, 1); valC = valC.join("$$"); setGMcookie(aName, valC, addNewDid); removeElement($xf("//*[@id='" + aName + "']")); if (reloadPage) history.go(0); else aFunctionToRunAfter();};};};};
	function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {var aR = new XMLHttpRequest(); aR.onreadystatechange = function() {if (aR.readyState == 4 && aR.status == 200) onSuccess(aR); else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);}; aR.open(aMethod, url, true); if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8'); aR.send(param);};
	function setRace(ti) {switch (ti) {case '1': TB3O.U[1] = avRace[0]; break; case '11': TB3O.U[1] = avRace[1]; break; case '21': TB3O.U[1] = avRace[2]; break;}; TB3O.U[7] = parseInt(ti); setGMcookieV2('UserInfo', TB3O.U, 'UsI');};
	
	function getLanguageAndPlusStatus() {
		var iP = $g("logo");
		var ahref;
		if (iP) {
			if (iP.nodeName == "A") {
				if (iP.firstChild && iP.firstChild.className == "logo_plus") TB3O.plAc = true;
				ahref = iP.href;
				TB3O.M35 = 2;
			} else if (iP.nodeName == "IMG") {
				if (iP.className && (iP.className == "plus" || iP.className == "logo_plus")) TB3O.plAc = true;
				ahref = iP.parentNode.href;
				TB3O.M35 = 1;
			};
			if (ahref) {
				aLang = ahref.split(".");
				TB3O.lng = aLang[aLang.length - 1].replace("/", "");
			};
			ahref = null;
		} else {
			//T3.1
			iP = $xf("//img[contains(@src, 'plus.gif')]");
			if (iP) {
				iP.src.search(/\/img\/([^\/]+)\//);
				TB3O.lng = RegExp.$1.substring(0,2);
			};
			if ($xf("//img[contains(@src, 'travian1.gif')]")) TB3O.plAc = true;
		};
		iP = null; ahref = null;
	};

	function addGMcookieValue(aName, values, addNewDid) {
		var nV = '';
		for (var i = 0; i < values.length; i++){
			if (values[i] != ''){
				nV += values[i];
				if (i != values.length - 1) nV += '$';
			} else return;
		};
		var valC = getGMcookie(aName, addNewDid);
		if (valC != "false" && valC != '') valC += "$$" + nV; else valC = nV;
		setGMcookie(aName, valC, addNewDid);
		nV = null; valC = null;
	};

	/**
	 * Create the path of the image, taking into account a local GP
	 * Params: ref Relative path of the image
	 * Returns: Absolute path of the image
	 */
	function img(ref, ld) {
		var imgPath = '';
		if (TB3O.T35 == true) imgPath = (!ld ? localGP + "img/" + ref : localGP + "img/lang/" + TB3O.lng + '/' + ref); else imgPath = (!ld ? localGP + "img/un/" + ref : localGP + "img/" + TB3O.lng + '/' + ref);
		return imgPath;
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
		h = null; m = null; s = null; d = null;
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
						if(!v[5].href) v[5] = tr.cells[1].firstChild.childNodes[0];	
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
		v = null; aV = null;

		function getActiveVillageFromCookie() {
			var xy = id2xy(TB3O.U[4]);
			actV = new xVillage(TB3O.U[3], TB3O.U[4], TB3O.U[5], xy[0], xy[1], 'dorf1.php?newdid=' + TB3O.U[5]);
			xy = null;
		};
	};

	function computeTextTime(aD){
		var dtNow = new Date();
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
				timeToFill[i][0] = Math.round((capacity[i] - crtResUnits[i]) / (prodPerHour[i] / 3600)); sttf = formatTime(timeToFill[i][0], 0);
			} else if (prodPerHour[i] == 0) {
				timeToFill[i][0] = -1; sttf = "Infinity";
			};
			if (sttf == -1) {aC = "#008000"; aT = T('NEVER');} else if (timeToFill[i][0] <= 0) {aC = "#FF0000"; aT = sttf.blink();} else if (timeToFill[i][0] < 7200 || prodPerHour[i] < 0) {aC = "#FF0000"; aT = sttf;} else {aC = "#008000"; aT = sttf;};
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
				if (aS) {cellImg = aS.previousSibling; if (cellImg) {resImg = cellImg.childNodes[intImg]; if (resImg) t['RES' + (i + 1)] = resImg.title;};};
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
						t['RES5'] = aX[0].title;
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
			return TB3O.U[1];
		};
	};
	
	function getRace() {
		if (TB3O.U[1] == '') getRaceV3();
		if ((TB3O.U[1] == '') && TB3O.avBKS == true) {
			//race cookies are undefined - enter the barracks
			ajaxRequest(bksLnk, 'GET', null, function(ajaxResp) {
				ajaxResp.responseText.search(/unit u(\d+)/); //race recognition - first image in table of troops
				var xV = RegExp.$1;
				if (xV && xV != '') setRace(xV);
			});
		};
		if (TB3O.U[1] != '') TB3O.U[7] = (TB3O.U[1] == avRace[1] ? 11 : (TB3O.U[1] == avRace[2] ? 21 : 1));
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
				if (tmpTB3SV != 'false') {if (tmpTB3SV == 'min') tmpTB3SV = '0'; else if (tmpTB3SV == 'max') tmpTB3SV = '1'; TB3O.O[xi] = tmpTB3SV; boolSaveTB3O = true; GM_deleteValue(TB3O.oldOpt[xi]);} else TB3O.O[xi] = TB3O.OD[xi];
			};
			setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');
		} else TB3O.O = aTB3S['SETUP'];
		
		if (TB3O.O.length != TB3O.oldOpt.length) {
			//for additional new TB3Setup cookies in the new format
			for (var xi = TB3O.O.length; xi < TB3O.oldOpt.length; xi++) {tmpTB3SV = getGMcookie(TB3O.oldOpt[xi], false); if (tmpTB3SV != 'false') TB3O.O[xi] = tmpTB3SV; else TB3O.O[xi] = TB3O.OD[xi];};
			setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');
		};
		
		//get user information
		var aTB3U = getGMcookieV2('UserInfo');
		if (!aTB3U || !aTB3U['UsI']) setGMcookieV2('UserInfo', TB3O.U, 'UsI'); else TB3O.U = aTB3U['UsI'];
		
		getActiveVillage();
		//log(3, "actV = " + actV.vName + "; actV.vID = " + actV.vID + "; actV.vNewdid = " + actV.vNewdid);
		getResourceInfo();
		setVillageRes(actV.vID, -1);

		//speed server ?
		if (crtPage.indexOf("speed") != -1 || crtPage.indexOf("vip") != -1 || crtPage.indexOf("research")!= -1) TB3O.speed = true;
		
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
		} else if (strFirst == "vip1") {
				    //aex 3
				    wsSName = "vip1";
		}else  if (strFirst == "speed" && strLast == "net") {
			TB3O.lng = "es"; wsSName = "netx";
		} else if (strFirst == "speed" || strFirst == "speedserver") {
			//all other x servers
			if (strLast.indexOf("asia") != -1) {wsSName = "thx"; TB3O.lng = "th";} else wsSName = strLast + "x"; if (strLast == "com") TB3O.lng = 'uk';
		} else if (strFirst == "team") {
			wsSName = "team";
		} else if (strFirst == "lv1") {
			wsSName = "lv1";
		} else if (strLast == "com" && strFirst.indexOf("ae") != -1) {
			wsSName = strFirst;
		} else if (strLast == "at") {
			wsSName = "at"; TB3O.lng = "de";
		} else if (strLast == "org") {
			if (strFirst == "research") {wsSName = "org"; TB3O.lng = "en";} else {wsSName = "org"; TB3O.lng = "de";}
		} else if (strLast == "cat") {
			wsSName = "cat";
		} else if (strLast == "net") {
			//Spanish
			TB3O.lng = "es"; wsSName = "net" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		} else if (strLast == "fr" && TB3O.O[27] != "1") {
			//france3-exception fr3nchlover; france-exception Turio
			wsSName = "fr" + strFirst.substr(strFirst.search(/[0-9]{1,2}/)); TB3O.lng = "fr";
		} else if (strLast == "uk" || strLast == "us" || strLast == "com") {
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/)); TB3O.lng = "en";
		} else if (TB3O.lng == "cl" && strLast == "mx") {
			TB3O.lng = "ar"; wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/)); TB3O.FmapLanguage = "es";
		} else if (strLast == "asia") {
			wsSName = "th" + strFirst.substr(strFirst.search(/[0-9]{1,2}/)); TB3O.lng = "th";
		} else if (strLast == TB3O.lng) {
			//all other normal servers
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		};

		if (TB3O.lng == '') TB3O.lng = strLast;
		//set the script language
		if (TB3O.O[0] != '0') TB3O.O[0] = parseInt(TB3O.O[0]); else {var iLx = 0; var xi = 1; while (iLx == 0 && xi < arAvLang.length) {if (arAvLang[xi] == TB3O.lng) iLx = xi; xi += 1;}; TB3O.O[0] = iLx;};
		if (arAvLang[TB3O.O[0]] != 'en') switchLanguage();
		//additional setup items
		t['80'] = t['53'];
		t['81'] = t['54'];
		t['86'] = t['28'] + " &<br>" + t['30'];

		adaptDataToGameVersion();

		//GM_deleteValue("showbigiconalliance");	
		TB3O.VillageRes = getGMcookieV2("VillageRes");
		for (var i = 1; i < 5; i++) {if (TB3O.O[64 + i] != '') TB3O.CNc[i] = TB3O.O[64 + i];};
		//stop "Delete all" reports if the user changed the page
		if (getGMcookie("reportsDeleteAll", false) == '1') {if (crtPage.indexOf('berichte.php') == -1) {setGMcookie("reportsDeleteAll", "0", false); setGMcookie("reportsPageToDelete", '', false);};};
		
		//get special buildings cookie
		spBcookie = getGMcookieV2("specBuildings");
		if (spBcookie && spBcookie[actV.vNewdid]) TB3O.d2spB = spBcookie[actV.vNewdid];
	};

	//hide ad banners
	function hideAd() {
		/*
		if (TB3O.url.indexOf(dF('3923%3A1')) == -1) {
			var divX = $d("<br>" + dF('J%2631kvtu%2631dpqz.qbtufe%2631boe%2631qvcmjtife%2631uijt%2631tdsjqu%2631up%2631mfu%2631zpv%2631bmm%2631lopx%2631uibu%2631J%2631bn%2631wfsz%2631tuvqje%26311').replace(/\%20/g," ") + "!<br><br>" + dF('Qmfbtf%2631jotubmm%2631uif%2631psjhjobm%2631tdsjqu%2631uibu%2631dbo%2631cf%2631gpvoe%2631ifsf1').replace(/\%20/g," ") + ":<br><br><a href='" + dF('iuuq%264B00vtfstdsjqut/psh0tdsjqut0tipx03923%3A1').replace("%3A", ":") + "'target='blank'>" + dF('iuuq%264B00vtfstdsjqut/psh0tdsjqut0tipx03923%3A1').replace("%3A", ":") + "</a>" + "&nbsp;<br>&nbsp;", [['id', 'updDiv'], ['z-index', '2500']]);
			aD = $g(dmid1);
			if (aD) aD.appendChild(divX);
		};
		*/
		if (TB3O.T35 == true) {var aD = $xf("//div[starts-with(@id, 'ltime')]", 'f'); if (aD) $at(aD, [['style', 'width:650px; top:0px; color:white;']]);
		if(crtPage.indexOf("vip") != -1){$at(aD, [['style', 'width:650px; top:0px; color:#0000FF;']]);}};
		if (TB3O.O[2] == '1') {
			if (TB3O.T35 == true) {
				removeElement($xf("//div[@class='dyn1']"));
				removeElement($xf("//div[@class='dyn2']"));
				removeElement($g("ad_iframe"));
				divHeader = $g('dynamic_header');
				if (divHeader) {
					if (crtPage.indexOf("vip") == -1) {
						divHeader.style.height = '30px';
						$g("res").style.top = '100px';
					};
				};
			} else {
				ad = $xf("//iframe");
				if (ad) {
					if (ad.id == '') {
						ad.style.display = 'none'; headerTop = $xf("//html/body/div"); if (headerTop) {headerTop.style.height = '30px'; headerTop.style.backgroundImage = '';};
						header2 = $xf("//html/body/div[2]"); if (header2) header2.style.display = 'none'; header3 = $xf("//html/body/div[3]");if (header3 && header3.id != dTop1) header3.style.display = 'none'; lres = $g("lres2"); if (lres) lres.style.top = '100px';
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
				for (xi = 1; xi < menu.snapshotLength; xi++) {while (tmp = menu.snapshotItem(xi).firstChild) {removeElement(tmp); pFirst.appendChild(tmp);}; removeElement(menu.snapshotItem(xi));};//by j000
				menu = pFirst;
			} else menu = menu.snapshotItem(0);
		};

		//by j000;
		brs = menu.childNodes;
		for (var i = 0; i < brs.length; i++) {if (brs[i].nodeName.toLowerCase() == "br") {brs[i].parentNode.removeChild(brs[i]); --i;};};
		var aL = [0, [T('LOGIN'), "login.php"], (TB3O.O[8] != "1" ? [T('8'), "allianz.php"] : ['', '']), [T('SENDTROOPS'), "a2b.php"], [T('SIM'), warsimLink[parseInt(TB3O.O[10])], "_blank"]];

		if (TB3O.O[9] == '1') {
			ttblangTR = TB3O.lng;
			ttbLang = TB3O.lng;
			switch (TB3O.lng) {
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
				default: ttbLang = TB3O.lng; break;
			};

			var wsAO = parseInt(TB3O.O[27]);
			var mapAO = parseInt(TB3O.O[29]);
			var mapAL = TB3O.O[29] == 0 ? mapAnalyser[0][1] + "?lang=" + TB3O.lng : TB3O.O[29] == '1' ? mapAnalyser[1][1] + TB3O.FmapLanguage : '';
			var menuS3L = [0, [T('CROPFINDER'), wsURLCropFinderLinkV2, "_blank"], (TB3O.O[11] != "1" ? [repSite[0][0], repSite[0][1] + TB3O.lng + "/", "_blank"] : [repSite[1][0], repSite[1][1] + ttblangTR + "/", "_blank"]),	['Traviandope', "http://www.traviandope.com/", "_blank"], ['Toolbox', "http://www.traviantoolbox.com/index.php?lang=" + ttbLang, "_blank"], ['Travian Utility', "http://travianutility.netsons.org/index_en.php", "_blank"], ['TravianBox', wsURLTravianBox + "/stats/server/" + wsSName, "_blank"], [mapAnalyser[mapAO][0], mapAL, "_blank"], [wsAnalyser[wsAO][0], wsAnalyser[wsAO][1] + wsSName, "_blank"]];
			aL = aL.concat(menuS3L);
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
		aL = null; menuS3L = null;
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
			gIc["bau"] = img("a/bau.gif");
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
			for (var xi = 1; xi < 6; xi++) gIc["b" + xi] = img("a/b" + xi + ".gif");
			for (var i = 1; i < 31; i ++) {gIc["u" + i] = img("u/" + i) + ".gif";};
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
			gIc["clock"] = '<img class="clock" src="' + xGIF + '">';
			gIc["capacity"] = '<img src="' + image["capacity"] + '">';
			gIc["bau"] = image["bau"];
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
			image["alliancegs"] = image["alliance35gs"];
			image["mercado"] = image["mercado35"];
			image["mercadogs"] = image["mercado35gs"];
			image["militar"] = image["militar35"];
			image["militargs"] = image["militar35gs"];
			image["militar2"] = image["militar235"];
			image["militar2gs"] = image["militar235gs"];
			image["misc"] = image["misc35"];
			image["miscgs"] = image["misc35gs"];
			image["setup"] = image["setup35"];
			for (var xi = 1; xi < 6; xi++) gIc["b" + xi] = xGIF;
			for (var i = 1; i < 31; i ++) {gIc["u" + i] = xGIF;};
			if (TB3O.O[3] == '1') {
				uc[1] = [120,100,180,40,40,40,35,50,6,1];//Legionnaire
				uc[21] = [100,130,55,30,30,15,40,50,7,1];//Phalanx
			};
		};

		gIc["merchant"] = '<img src="' + image["merchant"] + '">';
		gIc["reload"] = '<img src="' + image["reload"] + '">';
		gIc["reload_p"] = '<img src="' + image["reload"] + '" title="' + T('UPDATEPOP') + '" alt="' + T('UPDATEPOP') + '">';
		gIc["reload_v"] = '<img src="' + image["reload"] + '" title="' + T('UPDALLV') + '" alt="' + T('UPDALLV') + '">';
		gIc["usethempr"] = '<img src="' + image["usethempr"] + '" title="' + T('USETHEMPR') + '" alt="' + T('USETHEMPR') + '">';
		gIc["usethemeq"] = '<img src="' + image["usethemeq"] + '" title="' + T('USETHEMEQ') + '" alt="' + T('USETHEMEQ') + '">';
		gIc["usethem1h"] = '<img src="' + image["usethem1h"] + '" title="' + T('USETHEM1H') + '" alt="' + T('USETHEM1H') + '">';
		gIc["del"] = '<img src="' + image["del"] + '" title="' + T('DEL') + '" alt="' + T('DEL') + '" style="cursor:pointer;">';
		
		//big icons style
		cssBI += "#n6, #n7, #n8, #n9, #n10, #n11 {width:70px; height:" + bIheight + "px; background-repeat:no-repeat;}" +
		"#n6:hover,#n7:hover,#n8:hover,#n9:hover,#n10:hover,#n11:hover {background-position:bottom;}" +
		'#n6 {background-image: url(' + image["mercadogs"] + ');}' +
		'#n7 {background-image: url(' + image["militargs"] + ');}' +
		'#n8 {background-image: url(' + image["alliancegs"] + ');}' +
		'#n9 {background-image: url(' + image["setup"] + ');}' +
		'#n10 {background-image: url(' + image["militar2gs"] + ');}' +
		'#n11 {background-image: url(' + image["miscgs"] + ');}';
		GM_addStyle(cssBI);
	};

	function createHelpTooltip(aT) {
		return function() {
			var aTT = $g("tb_tooltip");
			if (!aTT) aTT = createTooltip();
			aTT.innerHTML = '<p style="margin:5px;">' + T(aT.toUpperCase()) + '</p>';
			aTT.style.display = 'block'; aTT.style.zIndex = '3000'; aTT.style.fontSize = '8pt'; aTT.style.color = 'blue';
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
			[1, "gsrvt", "TR", "", -1],
				[2, "1", "CB", "", 1],
				[2, "2", "CB", "", 2],
				[2, "3", "CB", "", 3],
			[1, "bic", "TR", "", -1],
				[2, "4", "CB", "", 4],
				[2, "5", "CB", "", 5],
				[2, "6", "CB", "", 6],
				[2, "7", "CB", "", 7],
				[2, "8", "CB", "", 8],
				[2, "alfl", "T", "", -1],
			[1, "mnul", "TR", "", -1],
				[2, "9", "CB", "", 9],
				[2, "10", "SEL", [T('WSIMO1'), T('WSIMO2')], 10],
				[2, "11", "SEL", [repSite[0][0], repSite[1][0]], 11],
			[1, "vgl", "TR", "", -1],
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
			[1, "nbo", "TR", "", -1],
				[2, "22", "CB", "", 22],
				[2, "23", "CB", "", 23],
				[2, "24", "SEL", [T('NBSA'), T('NBSN'), T('NBSB')], 24],
				[2, "25", "SEL", [T('NBHK'), T('NBHAX')], 25],
			[1, "npco", "TR", "", -1],
				[2, "26", "CB", "", 26],
			[1, "stat", "TR", "", -1],
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
			[1, "upgtb", "TR", "", -1],
				[2, "34", "CB", "", 34],
				[2, "35", "CB", "", 35],
				[2, "36", "CB", "", 36],
			[1, "resf", "TR", "", -1],
				[2, "37", "CB", "", 37],
				[2, "38", "CB", "", 38],
				[2, "39", "CB", "", 39],
				[2, "40", "CB", "", 40],
			[1, "vlc", "TR", "", -1],
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
				[2, "87", "CB", "", 87],
			[1, "rap", "TR", "", -1],
				[2, "49", "SEL", [T('AT2'), T('AT3'), T('AT4')], 49],
				[2, "50", "T", "", 50],
				[2, "51", "CB", "", 51],
				[2, "52", "CB", "", 52],
				[2, "80", "CB", "", 80],
				[2, "81", "CB", "", 81],
				[2, "85", "CB", "", 85],
				[2, "86", "CB", "", 86],
			[1, "wsi", "TR", "", -1],
				[2, "55", "CB", "", 55],
			[1, "mapo", "TR", "", -1],
				[2, "56", "CB", "", 56],
				[2, "57", "CB", "", 57],
				[2, "58", "CB", "", 58],
			[1, "mereo", "TR", "", -1],
				[2, "59", "SEL", ["1", "2", "3", "4", "5"], 59],
				[2, "60", "CB", "", 60],
				[2, "61", "CB", "", 61],
				[2, "62", "CB", "", 62],
				[2, "63", "CB", "", 63],
				[2, "64", "CB", "", 64],
			[1, "colo", "TR", "SH2", -1],
				[2, "65", "T", "", 65],
				[2, "66", "T", "", 66],
				[2, "67", "T", "", 67],
				[2, "68", "T", "", 68],
			[1, "dbgo", "TR", "", -1],
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
		topCell = $c(T('TB3SL') + " - " + TB3O.versionText(), [['class', 's1']]);
		//save button
		sCell = $c("", [['class', 's2']]);
		sImg = $img([['src', image["bSave"]], ['title', T('CLOSE')]]);
		sImg.addEventListener("click", TB3SetupSave, 0);
		sCell.appendChild(sImg);
		//close setup
		xCell = $c("", [['class', 's3']]);
		xImg = $img([['src', image["bClose"]], ['title', T('CLOSE')]]);
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
					case "CB": pS = $i([['type', 'CHECKBOX']]); if (sVal == "1") $at(pS, [['checked', true]]); break;
					case "T": pS = $i([['type', 'TEXT'], ['style', 'width:360px;'], ['value', sVal]]); break;
					case "SEL": pS = $e('SELECT'); for (var xi = 0; xi < aTBS[i][3].length; xi++) pS.options[xi] = new Option(aTBS[i][3][xi], xi, false, false); pS.selected = sVal; pS.value = parseInt(sVal); break;
					case "SP": pS = $e('SPAN'); sVal = TB3O.U[aTBS[i][4]]; pS.innerHTML = sVal; break;
				};
				$at(pS, [['name', aTBS[i][1]]]);
				cI.appendChild(pS);
				setupRow.appendChild(cI);
				setupTb.appendChild(setupRow);
			};
		};

		//create the "Save" row
		saveRow = $r([['class', 'srh']]);
		bCell = $c(T('TB3SL') + " - " + TB3O.versionText(), [['class', 's1']]);
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
		innerPane.appendChild(setupTb); showMsgPage(true);
		//---
		
		var outerPane = $g('OuterMsgPage');
		if (outerPane) $at(outerPane, [['style', 'height:' + (setupTb.clientHeight + 30) + 'px; ']]);
		
		function TB3SetupSave() {
			var aName;
			var aS = $g("TB3S").getElementsByTagName("SELECT");
			for (var i = 0; i < aS.length; i++) {crtValue = aS[i].value; aName = parseInt(aS[i].name); if (!isNaN(aName)) TB3O.O[aName] = crtValue; else {aName = aS[i].name; setGMcookie(aName, crtValue, false);};};
			aS = $g("TB3S").getElementsByTagName("INPUT");
			for (var i = 0; i < aS.length; i++) {crtValue = aS[i].value; if (aS[i].type == 'checkbox') crtValue = (aS[i].checked == true ? '1' : '0'); aName = parseInt(aS[i].name); if (!isNaN(aName)) TB3O.O[aName] = crtValue; else {aName = aS[i].name; setGMcookie(aName, crtValue, false);};};
			setGMcookieV2('TB3Setup', TB3O.O, "SETUP");
			nbnotes = $g('noteblockcontent');
			if (nbnotes) setGMcookie('notas', nbnotes.value, false);
			alert(T('SAVED') + ".");
			location.reload(true);
		};
	};

	function showBigIconsBar(){
		var biBar = $g(dTop5);
		if (biBar == null) return;
		var iBiC = 0;
		var iHTML = '';
		var bbdx = 0;
		if (crtPage.indexOf("vip") != -1) {
		var bbdx = 224;
			 }
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
		if (docDir[0] == 'right') {if ($g("stime")) bbdx += parseInt(TB3O.wW) - parseInt(biBar.offsetLeft) - parseInt(biBar.clientWidth);};
		//log(3, "bbdx = " + bbdx + "; TB3O.wW = " + TB3O.wW + "; biBar.offsetLeft = " + biBar.offsetLeft + "; biBar.clientWidth = " + biBar.clientWidth);
		
		$at(biBar, [['style', 'display:none; width:900px;']]);
		
		//setup icon
		var sI = $img([['id', 'n9'], ['src', xGIF]]);
		var sL = $a("", [['title', T('TB3SL')], ['href', jsVoid], ['style', 'float:' + docDir[0] + '; ']]);
		sL.appendChild(sI);
		sL.addEventListener('click', TB3Setup, false);

		aPlus = $xf("//div[@id='" + dTop5 + "']//a[contains(@href, 'plus.php')] | //div[@id='" + dTop1 + "']//a[contains(@href, 'plus.php')]");
		if (aPlus) {
			$at(aPlus, [['href', aPlus.href + '?id=3'], ['style', 'margin-' + docDir[0] + ':30px']]);
			biBar.removeChild(aPlus);
		};

		if (TB3O.O[4] == "1") {
			var mkL = $a("<img usemap='#market' id='n6' src='" + xGIF + "'>");
			$at(mkL, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(mkL);
			iBiC += 1;
			iHTML += '<map name="market" onmouseover="bigIconMarket()" onmouseout="bigIconMarketGS()"><area shape="rect" coords="' + strMapMbib[0] + '" href="build.php?gid=17" title="' + T('SENDRES') + '"><area shape="rect" coords="' + strMapMbib[1] + '" href="build.php?gid=17&t=1" title="' + T('BUY') + '"><area shape="rect" coords="' + strMapMbib[2] + '" href="build.php?gid=17&t=2" title="' + T('SELL') + '"></map>';
			gSSw("mercado");
		};
		if (TB3O.O[5] == "1") {
			var miL = $a("<img usemap='#militar' id='n7' src='" + xGIF + "'>");
			$at(miL, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(miL);
			iBiC += 1;
			iHTML += '<map name="militar" onmouseover="bigIconMilitar()" onmouseout="bigIconMilitarGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=16&j&k" title="' + T('RAP') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="' + bksLnk +'" title="' + T('BARRACKS') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=20" title="' + T('STABLE') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=21" title="' + T('WORKSHOP') + '"></map>';
			gSSw("militar");
		};
		if (TB3O.O[6] == "1") {
			var miL2 = $a("<img usemap='#militar2' id='n10' src='" + xGIF + "'>");
			$at(miL2, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(miL2);
			iBiC += 1;
			iHTML += '<map name="militar2" onmouseover="bigIconMilitar2()" onmouseout="bigIconMilitar2GS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=24" title="' + T('TOWNHALL') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=37" title="' + T('HEROSMANSION') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=12" title="' + T('BLACKSMITH') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=13" title="' + T('ARMOURY') + '"></map>';
			gSSw("militar2");
		};
		if (TB3O.O[7] == "1") {
			var mscL = $a("<img usemap='#misc' id='n11' src='" + xGIF + "'>");
			$at(mscL, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(mscL);
			iBiC += 1;
			iHTML += '<map name="misc"  onmouseover="bigIconMisc()" onmouseout="bigIconMiscGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=26" title="' + T('PALACE') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=25" title="' + T('RESIDENCE') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=22" title="' + T('ACADEMY') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=27" title="' + T('TREASURY') + '"></map>';
			gSSw("misc");
		};
		if (TB3O.O[8] == "1") {
			var ayL = $a("<img usemap='#alliance' id='n8' src='" + xGIF + "' title='" + T('8') + "' alt = '" + T('8') + "'>");
			$at(ayL, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(ayL);
			iBiC += 1;
			
			//alliance forum link converter
			var alfl = getGMcookie('alfl', false);
			if (alfl == 'false') {
				alfl = getGMcookie("allianceforumlink");
				if (alfl != 'false') setGMcookie('alfl', alfl, false); else setGMcookie('alfl', false, false);
				GM_deleteValue("allianceforumlink");
			};
			
			if (alfl == "false" || alfl == "") alfl = "allianz.php?s=2"; else alfl += ' target="_blank"';
			iHTML += '<map name="alliance" onmouseover="bigIconAlliance()" onmouseout="bigIconAllianceGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="allianz.php" title="' + T('8') + ':&nbsp;' + T('OVERVIEW') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href=' + alfl + ' title="' + T('8') + ':&nbsp;' + T('FORUM') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="allianz.php?s=3" title="' + T('8') + ':&nbsp;' + T('ATTACKS') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="allianz.php?s=4" title="' + T('8') + ':&nbsp;' + T('NEWS') + '"></map>';
			gSSw("alliance");
		};
		if (TB3O.plAc) biBar.appendChild(aPlus);

		biBar.innerHTML += iHTML;
		//insert an empty image based on the boolShowBigIconsOptions
		var xM = 150 - iBiC * 35;
		var eI = $img([['src', xGIF], ['style', 'width:' + (xM < 0 ? 0 : xM) + 'px; height:' + hPH + 'px; float:' + docDir[0] + ';']]);
		//biBar.insertBefore(eI, biBar.firstChild);
		//biBar.insertBefore(sL, eI);
		biBar.insertBefore(sL, biBar.firstChild);
		biBar.style.display = '';
		if (docDir[0] == 'left') biBar.style.left = (parseInt(biBar.offsetLeft) - parseInt(sL.clientWidth)) + "px"; else biBar.style.right = (bbdx - parseInt(sL.clientWidth)) + 'px';
		eI = null; iHMTL = ''; mkL = null; miL = null; miL2 = null; mscL = null; ayL = null;
		
		//onetmt
		function gSSw (icon) {
			//this function is a workaround for the mouse event unawareness of <area> tag with respect to background image;
			//through gSSw it is possible to change from a greyscale background to a color one, increasing the look and feel coherence with original travian GUI
			icongs = icon + "gs";

			switch (icon) {
				case "mercado": divid = "n6"; funid = "Market"; break;
				case "militar": divid = "n7"; funid = "Militar"; break;
				case "alliance": divid = "n8"; funid = "Alliance"; break;
				case "militar2": divid = "n10"; funid = "Militar2"; break;
				case "misc": divid = "n11"; funid = "Misc"; break;
			};

			mouseoverfun = $e("script", "function bigIcon" + funid + " () {var icon = document.getElementById (\"" + divid + "\"); icon.style.backgroundImage = \"url(\'" + image[icon] + "\')\";}");
			document.body.appendChild (mouseoverfun);
			mouseoutfun = $e("script", "function bigIcon" + funid + "GS () {var icon = document.getElementById (\"" + divid + "\"); icon.style.backgroundImage = \"url(\'" + image[icongs] + "\')\";}");
			document.body.appendChild (mouseoutfun);
		};
	};

	function createStatLink(strType, aX, textURL) {
		var aT;
		var ahws = '';
		var ast = '';
		var tWA = '';
		if (TB3O.O[27] == "0") {
			tWA = wsAnalyser[0][0]; if (strType == "user") aT = 'uid='; else if (strType == "ally") aT = 'aid='; ahws = wsAnalyser[0][1] + wsSName + "&" + aT + aX;
		} else if (TB3O.O[27] == "1") {
			tWA = wsAnalyser[1][0]; if (strType == "user") aT = 'idu='; else if (strType == "ally") aT = 'ida='; ahws = wsAnalyser[1][1] + wsSName + "&" + aT + aX;
		} else if (TB3O.O[27] == "2") {
			tWA = wsAnalyser[2][0]; if (strType == "user") aT = 'player/'; else if (strType == "ally") aT = 'alliance/'; ahws = wsAnalyser[2][1] + aT + wsSName + "/id/" + aX;
		};
		if (textURL) ast = $a(textURL, [['target', '_blank'], ['href', ahws]]); else if (ahws != '') {
			ast = $a("", [['target', '_blank'], ['href', ahws]]); ast.appendChild($img([['src', image["globe"]], ['style', 'margin:0px 2px -2px 3px; display:inline; border:0px none white;'], ['title', tWA]]));
		};
		return ast;
	};

	function createMapLink(strType, aX, strName) {
		var hrefMapPage = '';
		var aLnk = null;
		var smLnk;
		if (TB3O.O[29] == '0') {
			smLnk = mapAnalyser[0][1] + "map.php?lang=" + TB3O.lng + "&server=" + TB3O.fullServerName; var smURLEnd = "&groupby=player&casen=on&format=svg&azoom=on"; if (strType == "user") hrefMapPage = smLnk + "&player=id:" + aX + smURLEnd; else if (strType == "ally") hrefMapPage = smLnk + "&alliance=id:" + aX + smURLEnd;
		} else if (TB3O.O[29] == '1') {
			smLnk = mapAnalyser[1][1] + TB3O.FmapLanguage + "/" + TB3O.FmapServer + "/"; if (strType == "user") hrefMapPage = smLnk + "players/" + strName; else if (strType == "ally") hrefMapPage = smLnk + "clans/" + strName;
		};
		if (hrefMapPage != '') {
			var aImg = $img([['src', image["smap"]], ['style', 'margin:0px 2px -2px 3px; display:inline; border:0px none white;'], ['title', 'Map']]); aLnk = $a("",[['href', hrefMapPage], ['target', '_blank']]); aLnk.appendChild(aImg);
		};
		return aLnk;
	};

	function insertIGMLink(aNode, uid) {
		//IGM link
		var igmL = $a("", [['href', 'nachrichten.php?t=1&id=' + uid]]);
		igmL.appendChild($img([['src', image["igm"]], ['style', 'margin:3px 0px 1px 3px; display:inline;'], ['title', T('SENDIGM')]]));
		aNode.parentNode.insertBefore(igmL, aNode.nextSibling);
		igmL = null;
	};
	
	function addMrInPopup(aNode) {
		if (aNode.parentNode && aNode.parentNode.innerHTML.indexOf(imP) == -1) {
			var aBt = $a("&nbsp;&nbsp;", [['href', jsVoid], ['style', 'height:0px; position:relative; float:' + docDir[1]]]);
			aBt.addEventListener("click", createMesRepPopup(aNode), false);
			aBt.appendChild($img([['src', image['imgo']]]));
			aNode.parentNode.insertBefore(aBt, aNode);
		};

		function createMesRepPopup(aNode) {
			return function() {
				ajaxRequest(aNode.href, 'GET', null, function(ajaxResp) {
					var ad = ajaxNDV2(ajaxResp);
					var aV = $xf("//div[@id='" + dmid2 + "']", 'f', ad);
					if (aV) {
						var tt = $g("mr_tooltip");
						if (!tt) {var dW = 480; if (aV.className == "reports") dW = 550; var iLeft = 680; if (docDir[0] == 'right') iLeft = 400; tt = $df(dW, iLeft, 90, '', '', "mr_tooltip", false);};
						removeElement($g('lmid2_1'));
						$at(aV, [['id', 'lmid2_1']]);
						tt.appendChild(aV);
						//process message
						var aCs = $xf("//td[@background] | //div[@class='underline'] | //div[@id='message']", 'r');
						if (aCs.snapshotLength > 0) {for (var i = 0; i < aCs.snapshotLength; i++) {var aC = aCs.snapshotItem(i); aC.innerHTML = addXYinMsg(aC.innerHTML);};//add coords in message if needed
						} else {battleReportV2(); playerLinks("lmid2_1"); if (TB3O.O[53] == "1") showTroopInfoInTooltips();};
						tt.style.display = "block";
					}
				}, dummy);
			};
		};
	};

	function updColTableResBarTooltip(i, procNo, prC) {
		var bTb = $t([['class', 'rbrtb'], ['id', 'resbarTable_' + i]]);
		bRow = $r([['class', 'rbrtbr']]);
		bRow.appendChild($c("", [['style', 'width:' + procNo + 'px; background-color:' + prC + ';'], ['title', crtResUnits[i] + "/" + capacity[i]]]));
		bRow.appendChild($c("", [['style', 'width:' + (100 - procNo) + 'px; background-color:transparent;'], ['title', crtResUnits[i] + "/" + capacity[i]]]));
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

	function $df(dWidth, posX, posY, strTitle, sCookieN, divID, boolShowMinMax) {
		var wCMM = 25;
		iPx = parseInt(posX);
		if (iPx < 5) iPx = 10;
		iPy = parseInt(posY);
		if (iPy < 5) iPy = 10;
		if (boolShowMinMax == true) wCMM *= 2;
		var fDiv = $d("", [['id', divID], ['class', 'fldiv'], ['style', 'width:' + dWidth + 'px; top:' + iPy + 'px; left:' + iPx + 'px; -moz-border-radius:5px;']]);
		if (strTitle == T('VGL')) strTitle = "<a href='dorf3.php'>" + strTitle + "</a>";
		if (strTitle == '?') strTitle = "<img src='" + image["search"] + "'</img>";
		dragDiv = $d(strTitle, [['id', 'dragDiv_' + sCookieN], ['class', 'dragdiv'], ['style', 'width:' + (dWidth - wCMM-2) + 'px;']]);
		if (boolShowMinMax == true) {
			var xi = 70;
			switch (sCookieN) {
				case "resbar": xi = 70; break;
				case "userbookmarks": xi = 71; break;
				case "noteblock": xi = 72; break;
				case "vl2table": xi = 73; break;
				case "searchbar": xi = 74; break;
			};
			var mmDiv = $d("", [['id', 'mmdiv_' + sCookieN], ['class', 'mmdiv']]);
			var strImgMM = (TB3O.O[xi] == '0' ? 'bMax' : 'bMin');
			var mmImage = $img([['src', image[strImgMM]]]);
			mmImage.addEventListener("click", minmaxDiv, false);
			mmDiv.appendChild(mmImage);
		};
		var closeDiv = $d("", [['class', 'closediv']]);
		var xImg = $img([['src', image["bClose"]], ['title', T('CLOSE')]]);
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
				case "resbar": TB3O.O[70] = (TB3O.O[70] == '0' ? '1' : '0'); showResBarTooltip(); break;
				case "userbookmarks": TB3O.O[71] = (TB3O.O[71] == '0' ? '1' : '0'); showUserBookmarks(); break;
				case "noteblock": TB3O.O[72] = (TB3O.O[72] == '0' ? '1' : '0'); showNoteBlock(); break;
				case "vl2table": TB3O.O[73] = (TB3O.O[73] == '0' ? '1' : '0'); show2ndVillageList(); break;
				case "searchbar": TB3O.O[74] = (TB3O.O[74] == '0' ? '1' : '0'); showSearchBar(); break;
			};
			setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');
		};
		
		function fcloseDiv() {
			$g(divID).style.display = "none";
			switch (sCookieN) {
				case "resbar": TB3O.O[39] = '0'; break;
				case "userbookmarks": TB3O.O[20] = '0'; break;
				case "noteblock": TB3O.O[22] = '0'; break;
				case "vl2table": TB3O.O[18] = '0'; break;
				case "searchbar": TB3O.O[32] = '0'; break;
				case "resupg": TB3O.O[37] = '0'; break;
				case "bupg": TB3O.O[41] = '0'; break;
				case "maptable": TB3O.O[58] = '0'; break;
			};
			setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');
		};
	};

	function showResBarTooltip() {
		if (TB3O.O[39] != "1") return;
		rbT = createResBarTable();
		if (TB3O.O[40] != '1') {prbT = $e("P"); prbT.appendChild(rbT); rbT = prbT;} else {rbTminWidth = 200; var xy = TB3O.O[75].split("|"); TB3O.nTARbT = $df(rbTminWidth, xy[0], xy[1], T('RBTT'), "resbar", "resbarTT", true);};
		TB3O.nTARbT.appendChild(rbT);
		rbT = $g("resbar");
		if (rbT && TB3O.O[40] == '1') adjustFloatDiv(rbT, rbTminWidth, "resbar");
		setInterval(updateResbarTooltip, 10000);
	};

	function adjustFloatDiv(theTB, xmin, idDrag) {
		if (xmin < theTB.clientWidth) xmin = theTB.clientWidth;
		theTB.parentNode.style.width = (xmin + 1) + 'px';
		var dragDiv = $g('dragDiv_' + idDrag);
		wCMM = 25;
		if ($g('mmdiv_' + idDrag)) wCMM *= 2;
		if (dragDiv) dragDiv.style.width = (xmin - wCMM) + 'px';
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
		for (var i = 0; i < vList.length; i++) {if (TB3O.VillageRes[vList[i].vID]) {for (var yi = 1; yi < 6; yi++) {tPpH[yi - 1] += (!TB3O.VillageRes[vList[i].vID][yi] ? 0 : TB3O.VillageRes[vList[i].vID][yi]);};};};
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
			intTpPh = (i == 3 ? TB3O.tPpH[4] : TB3O.tPpH[i]);
			aRow.appendChild($c(gIc["r" + (i + 1)], [['class', 'tb3c']]));
			aRow.appendChild(aCell);
			aRow.appendChild(bCell);
			aRow.appendChild($c(strSpanNew, [['class', 'lr']]));
			aRow.appendChild($c($ls(intTpPh), [['class', 'tb3ctot']]));
			rbT.appendChild(aRow);
		};
		//row for totals per hour
		tRow = $r([['class', 'tb3r']]);
		tRow.appendChild($c(gIc["r1"] + " + " + gIc["r2"] + " + " + gIc["r3"] + " + " + gIc["r4"] + " / 1h", [['class', 'tb3ctotv'], ['colspan', '3']]));
		tRow.appendChild($c($ls(intpph), [['class', 'tb3ctotv']]));
		tRow.appendChild($c($ls(intPPH), [['class', 'tb3ctot'], ['style', 'border-top:2px solid silver; border-bottom:2px solid silver;']]));
		rbT.appendChild(tRow);
		//row for total crop consumption
		bRow = $r([['class', 'tb3r']]);
		bRow.appendChild($c(gIc["r5"], [['class', 'tb3c'], ['colspan', '2']]));
		bRow.appendChild($c("", [['class', 'tb3c']]));
		bRow.appendChild($c($ls(prodPerHour[6]), [['class', 'lr']]));
		bRow.appendChild($c($ls(tPpH[4] - tPpH[3]), [['class', 'tb3ctot']]));
		rbT.appendChild(bRow);
		//row for effective crop production
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
			aP.insertBefore($a("&nbsp;" + gIc["r41"], [['href', aNode.href.replace("karte.php?d", "build.php?z") + "&gid=17"]]), aNode.nextSibling);
			aP.insertBefore($a("&nbsp;" + gIc[getRPDefAction()], [['href', 'a2b.php?z=' + newdid], ['id', 'att_link_' + newdid]]), aNode.nextSibling);
		};
	};

	function insertAllyLinks(aNode, aid, strName) {
		aP = aNode.parentNode;
		if (aP && aP.innerHTML.indexOf(imP) == -1) {
			if (TB3O.O[31] == "1") aP.insertBefore(createMapLink("ally", aid, strName), aNode.nextSibling);
			if (TB3O.O[28] == "1") aP.insertBefore(createStatLink("ally", aid), aNode.nextSibling);
		};
	};

	function getTroopIndexTitleFromImg(tImg) {
		tInfo = [0, ""];
		if (tImg.src.match(/img\/un\/u\/(\d+)\.gif/)) tInfo[0] = RegExp.$1; else {imgCN = tImg.getAttribute("class");if (imgCN && imgCN.indexOf("unit") != -1 && imgCN.search(/(\d+)/) != -1) tInfo[0] = RegExp.$1;};
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
				if (TB3O.O[86] == '1' && crtPage.indexOf("build.php?id=39") != -1 || crtPage.indexOf("build.php?id=39") == -1) insertUserLinks(aL[i], a, aL[i].textContent);
			//the attack link for karte.php links
			} else if (aL[i].href.search(/karte.php\?d=(\d+)/) > 0  && crtPage.indexOf("build.php?gid=17") == -1) {
				var vID = RegExp.$1;
				if (vID != actV.vID) {
					if (crtPage.indexOf("build.php?id=39") != -1 && TB3O.O[85] == '1' || crtPage.indexOf("build.php?id=39") == -1 && TB3O.O[14] == '1') insertAttSendResLinks(aL[i], vID);
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
			} else if (TB3O.O[60] == "1" && (aL[i].href.indexOf("nachrichten.php?id=") != -1 || aL[i].href.indexOf("berichte.php?id=") != -1)) addMrInPopup(aL[i]);
		};

		function showCoordAndDist(vID) {
			return function() {
				ttHTML = "<table id='mhtt'>" + getTroopMerchantTooltipHTML(vID, false, true, true, false, true) + "</table>";
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
			if (aForm) {x = $xf(strSearch + "//input[@name='x']"); y = $xf(strSearch + "//input[@name='y']");};
			if (x) x.addEventListener('keyup', function() {captureDestination();}, 0);
			if (y) y.addEventListener('keyup', function() {captureDestination();}, 0);
			if (crtPage.indexOf('a2b.php?z=') != -1 || (crtPage.indexOf('a2b.php?newdid=') != -1 && crtPage.indexOf('z=') != -1)) captureDestination();
		};

		function captureDestination() {
			var xD = x.value;
			var yD = y.value;
			var parOK = null;
			var oldTb = $g("trooptimetable");
			if (xD != "" && yD != "") {
				if (oldTb) {parOK = oldTb.parentNode; oldTb.parentNode.removeChild(oldTb);};
				//compatibility to Travian Battle Analyser
				if (!parOK) {parOK = $xf("//form[@name='snd']/p[4] | //form[@name='snd']/p[3]"); if (!parOK) {bOK = $g("btn_ok"); if (bOK) {parOK = $e("P", ""); bOK.parentNode.appendChild(parOK);};};};
				createTimeTroopTable(parOK, xD, yD, true);
			} else {if (oldTb) oldTb.style.visibility = "hidden";};
			return;
		};
	};

	function battleReportV2(aFrom){
		var origT = getOrigBRTable();
		if (!origT) return;
		var txtorigT = origT.innerHTML;
		if (TB3O.O[63] != '1') return;

		var tx = $xf("//table[@class='std reports_read']//table[@class='std'] | //table[@class='tbg']//table[@class='tbg']", 'l');
		if (tx.snapshotLength < 2) tx = $xf("//table[@class='std reports_read']//table[@class='tbg']", 'l');
		if (tx.snapshotLength < 2) tx = $xf("//table[starts-with(@id, 'attacker') or starts-with(@class, 'defender')]", 'l');
		if (tx.snapshotLength < 2) return;

		if (aFrom == "orig") {
			var neworigT = origT.cloneNode(true);
			var divlmid2 = $g(dmid2);
			divlmid2.removeChild(origT);
			//add a paragraph, a table with a text and a checkbox
			var input = $i([['type', 'checkbox'], ['id', 'tb_battlereport']]);
			input.addEventListener("click", function() { shoBR(p1, neworigT, origT); }, 0);

			var p2 = $e("P", "");
			var ptable = $t([['style', 'background-color:' + TB3O.DFc[1] + '; width:auto;']]);
			var aRow = $r([['class', 'tb3rnb']]);
			var aCell = $c(T('SOREP') + ":", [['class', 'tb3cnb'], ['style', 'text-align:'+ docDir[0] + ';']]);
			aRow.appendChild(aCell);
			var bCell = $c("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
			bCell.appendChild(input);
			aRow.appendChild(bCell);
			ptable.appendChild(aRow);
			p2.appendChild(ptable);
			divlmid2.appendChild(p2);
			//second paragraph (for displaying the tables)
			var p1 = $e("P", "");
			//append the paragraph to the divlmid2
			p1.appendChild(origT);
			divlmid2.appendChild(p1);
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
			var aX = tx.snapshotItem(0);
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
		var brCell = tx.snapshotItem(0).parentNode;

		for (var g = 0; g < tx.snapshotLength; g++){
			arrCarry[g] = 0;
			tTable = tx.snapshotItem(g);
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
			var informe = $c(iHTML, [['colspan', intNoOfCells]]);
			var aRow = $r();
			aRow.appendChild($c(T('LOSS'), [['style', 'text-align:left;']]));
			aRow.appendChild(informe);
			tTable.appendChild(aRow);

			//For the attacker we'll compute the profit and efficiency of the attack
			if (g == 0){
				//Profit compared to lossTotal
				var profit = 0;
				if (arrCarry[g] == 0) {booty = 0; for (var i = 0; i < 4; i++) {stBooty[i] = 0;};} else  {profit = ((booty - lossTotal) * 100 / booty).toFixed(2);};
				if (booty == 0)	if (lossTotal == 0) profit = 0; else profit = -100;
				var bCell = $c(profit + "%", [['colspan', intNoOfCells]]);
				var pRow = $r();
				pRow.appendChild($c(T('PROFIT'), [['style', 'text-align:left;']]));
				pRow.appendChild(bCell);
				tTable.appendChild(pRow);

				//Efficiency -> the entire booty compared to how much the attacker can carry back (considering only the troops that survived)
				var efficiency = 100 - ((arrCarry[g] - booty) * 100 / arrCarry[g]);
				if (arrCarry[g] == 0) efficiency = 0;
				var bCell = $c(efficiency.toFixed(2) + "% (" + booty + "/" + arrCarry[g] + ")", [['colspan', intNoOfCells]]);
				var eRow = $r();
				eRow.appendChild($c(T('EFICIENCIA'), [['style', 'text-align:left;']]));
				eRow.appendChild(bCell);
				tTable.appendChild(eRow);
			};
		};

		//add a simple statistics table
		var sTable = $t([['id', 'br_table']]);
		//add the title row
		var sTitleRow = $r();
		sTitleRow.appendChild($c(T('STAT'), [['class', 'tb3cbrh1']]));
		sTitleRow.appendChild($c(atkLabelCell, [['class', 'tb3cbrh2']]));
		sTitleRow.appendChild($c(defLabelCell, [['class', 'tb3cbrh3']]));
		sTable.appendChild(sTitleRow);
		//attack power row
		var atkRow = $r();
		atkRow.appendChild($c(gIc["att_all"], [['class', 'tb3cbrc']]));
		atkRow.appendChild($c($ls(tadPower[0][0])));
		atkRow.appendChild($c($ls(tadPower[1][0])));
		sTable.appendChild(atkRow);
		//def power rows
		var defiRow = $r();
		defiRow.appendChild($c(gIc["def_i"], [['class', 'tb3cbrc']]));
		defiRow.appendChild($c($ls(tadPower[0][1])));
		defiRow.appendChild($c($ls(tadPower[1][1])));
		sTable.appendChild(defiRow);
		var defcRow = $r();
		defcRow.appendChild($c(gIc["def_c"], [['class', 'tb3cbrc']]));
		defcRow.appendChild($c($ls(tadPower[0][2])));
		defcRow.appendChild($c($ls(tadPower[1][2])));
		sTable.appendChild(defcRow);
		//reward row (for the attacker only)
		var rewATotal = $c($ls(booty) + (TB3O.O[64] == '1' ? " " + T('TOTAL') : ''), [['class', 'tb3cbrbg']]);
		var rewRow1 = $r();
		var intDetailRowSpan = 1 + parseInt(TB3O.O[64]);
		var rewLabelCell = $c(labelReward, [['class', 'tb3cbrc'], ['rowspan', intDetailRowSpan]]);
		rewRow1.appendChild(rewLabelCell);
		if (TB3O.O[64] == '1') {var rewA = ''; for (var i = 1; i < 5; i++) {rewA += $ls(stBooty[i - 1]) + " " + imgRes[i - 1] + "<br>";}; rewADetail = $c(rewA, [['class', 'tb3cbrg']]);rewRow1.appendChild(rewADetail);} else rewRow1.appendChild(rewATotal);
		rewRow1.appendChild($c('-', [['class', 'tb3cbrb'], ['rowspan', intDetailRowSpan]]));
		sTable.appendChild(rewRow1);
		if (TB3O.O[64] == '1') {var rewRow2 = $r(); rewRow2.appendChild($c($ls(booty) + " " + T('TOTAL'), [['class', 'tb3cbrbg']])); sTable.appendChild(rewRow2);};
		//loss row
		var strLossATotal = $ls(tadPower[0][3]) + (TB3O.O[64] == '1' ? " " + T('TOTAL') : '');
		var lossATotal = $c(strLossATotal, [['class', 'tb3cbrb']]);
		if (tadPower[0][3] > 0) $at(lossATotal, [['class', 'tb3cbrbr']]);
		var strLossDTotal = $ls(tadPower[1][3] + booty) + (TB3O.O[64] == '1' ? " " + T('TOTAL') : '');
		lossDTotal = $c(strLossDTotal, [['class', 'tb3cbrb']]);
		if (tadPower[1][3] + booty > 0) $at(lossDTotal, [['class', 'tb3cbrbr']]);
		var lossRow1 = $r();
		lossRow1.appendChild($c(T('LOSS'), [['class', 'tb3cbrc'], ['rowspan', intDetailRowSpan]]));
		if (TB3O.O[64] == '1') {
			var iLossA = '';
			var iLossD = '';
			for (var i = 1; i < 5; i++) {iLossA += $ls(tadPower[0][i + 3]) + " " + imgRes[i - 1] + "<br>"; iLossD += $ls(tadPower[1][i + 3] + stBooty[i - 1]) + " " + imgRes[i - 1] + "<br>";};
			var lossADetail = $c(iLossA);
			if (tadPower[0][3] > 0) $at(lossADetail,[['class', 'tb3cbrr']]);
			lossRow1.appendChild(lossADetail);
			var lossDDetail = $c(iLossD);
			if (tadPower[1][3] + booty > 0) $at(lossDDetail, [['class', 'tb3cbrr']]);
			lossRow1.appendChild(lossDDetail);
		} else {lossRow1.appendChild(lossATotal); lossRow1.appendChild(lossDTotal);};
		sTable.appendChild(lossRow1);
		if (TB3O.O[64] == '1') {var lossRow2 = $r(); lossRow2.appendChild(lossATotal); lossRow2.appendChild(lossDTotal); sTable.appendChild(lossRow2);};
		//crop consumption of initial troops
		var ccRow = $r();
		ccRow.appendChild($c(gIc["r5"], [['class', 'tb3cbrc']]));
		ccRow.appendChild($c(tadPower[0][10] + " (-" + tadPower[0][8] + ")"));
		ccRow.appendChild($c(tadPower[1][10] + " (-" + tadPower[1][8] + ")"));
		sTable.appendChild(ccRow);
		//hero row
		var heroRow = $r();
		heroRow.appendChild($c(gIc["hero"], [['class', 'tb3cbrc']]));
		var accA = (tadPower[0][9] > 0 ? tadPower[1][8] : 0);
		var accD = (tadPower[1][9] > 0 ? Math.floor(tadPower[0][8] / tadPower[1][9]) : 0);
		heroRow.appendChild($c(accA, [['class', 'tb3cbrb']]));
		heroRow.appendChild($c(accD, [['class', 'tb3cbrb']]));
		sTable.appendChild(heroRow);
		//simple paragraph
		brCell.appendChild($e("P"));
		brCell.appendChild(sTable);

		function shoBR(aP, nT, oT) {var iC = $g("tb_battlereport"); if (iC) {if (iC.checked == true) {aP.removeChild(oT); aP.appendChild(nT);} else {aP.removeChild(nT); aP.appendChild(oT);};};};
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
							intNo = parseInt(aRow.cells[1].textContent.replace("ֲ»", "").replace("ֲ«", ""));
						} else {
							if (aRow.cells[1].getElementsByTagName("SPAN").length == 2) {
								strTime = aRow.cells[1].getElementsByTagName("SPAN")[1].textContent;
								intNo = parseInt(aRow.cells[1].getElementsByTagName("SPAN")[0].textContent);
							} else {
								intNo = parseInt(aRow.cells[1].getElementsByTagName("SPAN")[0].textContent);
								if (aRow.nextSibling) strTime = aRow.nextSibling.cells[1].getElementsByTagName("SPAN")[0].textContent; else strTime = "00:00:00"
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
		var bIsC = xy2id(vXY[0], vXY[1]) == parseInt(actV.vID);//is this the capital
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
				if (docDir[0] == 'right') {if (TB3O.M35 == 2) pDs = 'position:absolute; top:' + intTop + 'px; left:240px; z-index:20;'; else pDs = 'position:absolute; top:30px; left:257px; z-index:20;'; $at(posDIV, [['style', pDs]]);};
			};
			$g(dmid2).appendChild(posDIV);
		};

		var grid = new Array(4);
		for (var i = 0; i < 4; i ++) {grid[i] = new Array(26); for (var j = 0; j <= 25; j++) {grid[i][j] = 0;};};

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
		if (rDiv) aTitle = $xf("//map[starts-with(@id, 'rx')]"); else {rDiv = $xf("//div[starts-with(@id,'f')]"); aTitle = $xf("//map[starts-with(@name, 'rx')]");};
		if (rDiv) {if (rDiv.className) rDiv.className.search(/f(\d+)/); else rDiv.id.search(/f(\d+)/); var tipo = RegExp.$1;};
		var imgLvl;
		for (var i = 1; i <= 18; i++){
			imgLvl = 0;
			if (TB3O.T35 == false) {imgLvl = $xf("//img[@class='rf" + i + "']");} else {var aLvl = $xf("//img[starts-with(@class, 'reslevel rf" + i + " ')]"); if (aLvl != null) imgLvl = aLvl.className.split(" ")[2].replace("level", "");};
			var crtLevel = 0;
			var strNewLevel = null;
			if (imgLvl != 0) {
				if (TB3O.T35 == false) {imgLvl.src.search(/\/s(\d+).gif$/); crtLevel = parseInt(RegExp.$1);} else crtLevel = parseInt(imgLvl);
				if (arrBiP != null) {strNewLevel = getNewUpgradeLevel(arrBiP, '', crtLevel);crtLevel = strNewLevel[0];};
				grid[dist[tipo - 1][i - 1]][crtLevel] = i;
			} else grid[dist[tipo - 1][i - 1]][0] = i;

			var strClass = (TB3O.T35 == false ? "rf" : "reslevel rf") + i;
			var resLink = $a("", [['href', "build.php?id=" + i], ['id', "RES" + i], ['class', strClass], ['title', aTitle.areas[i-1].title]]);

			if (posDIV) {aDIV = createCNDiv(crtLevel, strNewLevel); resLink.appendChild(aDIV); posDIV.appendChild(resLink);};

			if (TB3O.O[38] == "1") {
				aDIV.style.visibility = 'visible';
				var theDC = TB3O.CNc[1];
				if ((bIsC == false && crtLevel < 10) || (bIsC == true && TB3O.O[1] != "1") || (bIsC == true && TB3O.O[1] == "1" && crtLevel < 12)) {
					//select resource type
					var aCol = colorLvl(crtLevel, dist[tipo - 1][i - 1] + 1);
					if (aCol == 2) theDC = TB3O.CNc[4]; else if (aCol == 0) theDC = TB3O.CNc[3];
				} else theDC =  TB3O.CNc[2];
				aDIV.style.backgroundColor = theDC;
			};
		};

		if (TB3O.O[37] == '1') {
			//create the resource fields upgrade table
			var tb1 = $t([['id', 'upgTable']]);
			var aRow1 = $r();
			var bsUT = false;
			tb1.appendChild(aRow1);
			var nE = [0, 0, 0, 0];
			var nR = 0;
			for (var i = 0; i < 4; i++) {
				var td1 = $c(gIc["r" + (i + 1)], [['class', 'tb3uthc']]);
				aRow1.appendChild(td1);
				for (var j = 0; j < 25; j++){
					if ((bIsC) || (!bIsC && j < 10)){
						if (grid[i][j] > 0 && bCost[i + 1][j+1] != null){
							nE[i] = nE[i] + 1;
							for (k = 0; k < 4; k++) {if (nR < nE[k]) {nR = nE[i]; var bRow = $r(); for (xi = 0; xi < 4; xi++) {bRow.appendChild($c("", [['class', 'tb3utbc']]));};tb1.appendChild(bRow);};};
							var tb2 = $t();
							var td4 = tb1.rows[nE[i]].cells[i];
							td4.appendChild(tb2);
							bsUT = true;
							var aRow3 = $r();
							var xOff = j > 9 ? 13 : 17;
							var cDIV = $d(j, [['style', 'font-family: Arial,Helvetica,Verdana,sans-serif; font-size:9pt; color:black; position:relative; top:-28px;' + docDir[0] + ':' + xOff +'px; z-index:100;']]);
							aLnk = $a("", [['href', "/build.php?id=" + grid[i][j]]]);
							aDiv = $d("", [['style', 'width:0%;']]);
							aDiv.appendChild($img([['src', image["upgr" + i]], ['title', T('RES' + (i + 1))]]));
							aDiv.appendChild(cDIV);
							aLnk.appendChild(aDiv);
							aRow3.appendChild($c("").appendChild(aLnk));
							var td3 = $c("");
							cpB = [bCost[i + 1][j][4], bCost[i + 1][j + 1][4]];
							ccB = [bCost[i + 1][j][5], bCost[i + 1][j + 1][5]];
							td3.appendChild(calculateResourceTime(bCost[i + 1][j+1], "100", "/build.php?id=" + grid[i][j], cpB, ccB));
							aRow3.appendChild(td3);
							tb2.appendChild(aRow3);
						};
					};
				};
			};
			if (bsUT == true)  {
				var dxy = TB3O.O[88].split("|");
				var drUpg = $df(parseInt(tb1.width), dxy[0], dxy[1], " ", 'resupg', "resupgTT", false);
				drUpg.appendChild(tb1);
				adjustFloatDiv(tb1, 682, 'resupg');
			};
		};
		arrBiP = null; dist = null; bCost = null; grid = null; aDiv = null; aLnk = null; cpB = null; ccB = null; cDIV = null;
	};

	function getNewUpgradeLevel(aB, bName, lvl) {
		var nlvl = [parseInt(lvl), ''];
		for (var xi = 0; xi < aB.length; xi++) {if (aB[xi].name != '') {if (aB[xi].name == bName && parseInt(aB[xi].lvl) == nlvl[0] + 1) {nlvl[0] += 1; nlvl[1] = " (ג†‘ " + (nlvl[0] + 1) + ")";};};};
		return nlvl;
	};

	//Create the buildings upgrade table & center numbers if necessary
	function processDorf2() {
		var mapB = $g('map2');
		if (!mapB) mapB = $xf("//map[@name='" + dmap + "']");
		if (!mapB) return;

		var intCpR = 3;
		var bsUT = false;
		var arrBiP = getArrBiP();
		var bData = new Array();

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

		function sortBuildingsInUpgTable(b, z) {for (var i = 0; i < z; i++) {var k = b[i]; var j = i; while (j > 0 && b[j - 1].name > k.name) {b[j] = b[j - 1]; j--;}; b[j] = k;}; return b;};//insertion sort

		//get the building images
		var bImg = new Array();
		if (TB3O.T35 == false) {
			var aXP = $xf("//div[@id='" + dmid2 + "']/img/@src", 'l');
		} else {
			var aXP = $xf("//div[starts-with(@id, 'village_map')]/img[starts-with(@class, 'building') or starts-with(@class, 'dx') or starts-with(@class, 'ww')] | //div[starts-with(@class, 'village2_map') and not (@id='village2_levels')]//img[starts-with(@class, 'building') or starts-with(@class, 'dx')]", 'l');
		};
		if (TB3O.T35 == false) bImg[0] = img('g/g16.gif');
		for (var i = 0; i < aXP.snapshotLength; i++) {if (TB3O.T35 == false) {bImg[bImg.length] = aXP.snapshotItem(i).nodeValue;} else {clName = aXP.snapshotItem(i).getAttribute("class"); if (clName != null && clName != '') {clName1 = clName.split(" "); if (clName1.length > 1) bImg[bImg.length] = clName1[clName1.length - 1] + ".gif";};};};
		
		//get the type of wall
		var ahref = $xf("//area[@href='build.php?id=40']");
		if (ahref) {
			var b = '';
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
				case 19: TB3O.d2spB[1] = 19; TB3O.avBKS = true; if (TB3O.U[1] == '' || TB3O.U[2] == '') getRace(); break;
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
		if (divmap2 && TB3O.O[43] == '1') {var dm2c = divmap2.className.split(" "); divmap2.className = 'village2_mapTB3 ' + dm2c[1];};
		
		dy = (TB3O.M35 == 0 || TB3O.M35 == 2) ? 60 : 30;
		var nr, na, nc, tb2, bLevel, strNewLevel, bRow, aCol, theDC, cpB, ccB, bC, bML, xy, iB;
		for (var i = 0; i < k; i++) {
			if (bData[i].gid != -1 && bData[i].lvl != -1) {
				var strNewLevel = [bData[i].lvl, ''];
				var bLevel = bData[i].lvl;
				if (arrBiP != null) {strNewLevel = getNewUpgradeLevel(arrBiP, bData[i].name, bData[i].lvl); bLevel = strNewLevel[0];};
				if (TB3O.O[43] == '1' && bLevel != -1) {
					//show center numbers if required
					aDIV = createCNDiv(bData[i].lvl, strNewLevel);
					xy = bData[i].xy.split(",");
					aDIV.style.top = parseInt(xy[1]) + dy + 'px';
					aDIV.style.left = parseInt(xy[0]) + 95 + 'px';
					bML = getBmaxLevel(bData[i].gid);
					theDC = TB3O.CNc[1];
					if (TB3O.O[44] == '1') {if (bLevel == bML || bLevel == 100) {theDC =  TB3O.CNc[2];} else {var aCol = colorLvl(bLevel, bData[i].gid); switch (aCol) {case 0: theDC = TB3O.CNc[3]; break; case 2: theDC = TB3O.CNc[4]; break;};};};
					aDIV.style.backgroundColor = theDC;
					$g(dmid2).appendChild(aDIV);
				};

				if (TB3O.O[41] == '1') {
					//create a new cell in the building uprade table id necessary
					if (bCost[bData[i].gid] != null && bCost[bData[i].gid][bLevel + 1] != null) {
						//create a new row if necessary
						if (j % intCpR == 0) {var aRow = $r(); aTb.appendChild(aRow);};
						j++;
						bsUT = true;
						//Switch image for the roman wall/pallisade/earth wall/rally point
						if (TB3O.M35 != 0) strBc = "building "; else strBc = "";
						var iB = 'class="' + strBc + 'g' + bData[i].gid + '" src="' + xGIF + '"';
						switch (bData[i].gid) {
							//31,32,33 - citywall, earthwall, palisade
							case 31: bData[i].bImg = image["cw"]; iB = 'src="' + bData[i].bImg + '"'; break;
							case 32: bData[i].bImg = image["ew"]; iB = 'src="' + bData[i].bImg + '"'; break;
							case 33: bData[i].bImg = image["pa"]; iB = 'src="' + bData[i].bImg + '"'; break;
							case 16: if (TB3O.T35 == false) {bData[i].bImg = image["rap"]; iB = 'src="' + bData[i].bImg + '"';}; break;
							case 40: bData[i].bImg = image["ww"]; iB = 'src="' + bData[i].bImg + '"'; break;
						};
						bC = $c("", [['class', 'tb3utbc'], ['style', 'width:' + Math.floor(100/intCpR) + '%;']]);
						aRow.appendChild(bC);
						tb2 = $t();
						bC.appendChild(tb2);
						nr = $r();
						na = $a(bData[i].title + strNewLevel[1], [['href', bData[i].link]]);
						nc = $c('', [['colspan',"2"], ['class', 'center']]);
						nc.appendChild(na);
						nr.appendChild(nc);
						tb2.appendChild(nr);
						bRow = $r();
						if (TB3O.T35 == false) iB = 'src="' + bData[i].bImg + '"';
						var td2 = $c('');
						td2.appendChild($a("<img '" + iB + "'></img>", [['href', bData[i].link]]));
						bRow.appendChild(td2);
						cpB = [bCost[bData[i].gid][bLevel][4], bCost[bData[i].gid][bLevel + 1][4]];
						ccB = [bCost[bData[i].gid][bLevel][5], bCost[bData[i].gid][bLevel + 1][5]];
						var td3 = $c("");
						td3.appendChild(calculateResourceTime(bCost[bData[i].gid][bLevel + 1], "100", bData[i].link, cpB, ccB));
						bRow.appendChild(td3);
						tb2.appendChild(bRow);
					};
				};
			};
		};
		while (j % intCpR != 0) {aRow.appendChild($c("")); j++;};
		if (TB3O.O[41] == '1') {
			if (bsUT == true)  {
				var dxy = TB3O.O[89].split("|");
				var drUpg = $df(parseInt(aTb.width), dxy[0], dxy[1], " ", 'bupg', "bupgTT", false);
				drUpg.appendChild(aTb);
				adjustFloatDiv(aTb, 682, 'bupg');
			};
		};
		arrBiP = null; bData = null; bImg = null; bCost = null; aDIV = null; cpB = null; ccB = null; nc = null; na = null; nr = null; mb = null;
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
		if (TB3O.O[23] != '1') {var parNB = $e("P"); parNB.appendChild(aTb); aTb = parNB;} else {var nbXY = TB3O.O[77].split("|"); var nbWidth = aTb.style.width; TB3O.nTANb = $df(parseInt(nbWidth), nbXY[0], nbXY[1], T('NBO'), 'noteblock', "noteblockTT", true);};
		TB3O.nTANb.appendChild(aTb);
	};

	//Create a noteblock (data from GM cookie)
	function createNoteBlock(){
		var sDisp = TB3O.O[72] == '0' && TB3O.O[23] == '1' ? ' display:none;' : '';
		var tr2 = $r();
		var td2 = $c("");
		var nT = getGMcookie("notas", false);
		if (nT == "false") nT = "";
		//height
		var nl = parseInt(TB3O.O[25]) > 0 && nT != '' ? 3 + nT.split("\n").length : 10;
		if (nl > 30) nl = 30;
		//width
		var nboption = parseInt(TB3O.O[24]);
		var dI = (nboption == 0 && screen.width >= 1200 || nboption == 2) ? [545, '60'] : [280, '30'];
		var aTb = $t([['id', 'noteblock'], ['style', "width:" + dI[0] + "px;" + sDisp]]);
		var tA = $e("TEXTAREA", nT);
		$at(tA, [["cols", dI[1]], ["id", "noteblockcontent"], ['style', 'background-image: url(' + image["underline"] + '); width:' + (dI[0] - 10) + 'px;'], ["rows", nl]]);
		td2.appendChild(tA);
		tr2.appendChild(td2);
		var tr3 = $r();
		var td3 = $c("", [['style', 'text-align:center;']]);
		var bS = $i([['type', 'image'], ['src', image["bSave"]], ['title', T('SAVE')]]);
		if (TB3O.O[23] != '1') $at(bS, [['style', 'padding:3px']]);
		bS.addEventListener("click", function(){setGMcookie("notas", tA.value, false); alert(T('SAVED')); }, 0);
		td3.appendChild(bS);
		tr3.appendChild(td3);
		aTb.appendChild(tr2);
		aTb.appendChild(tr3);
		nT = null;
		return aTb;
	};

	function getTroopsDetails(qDist, xRace, evTS) {
		arX = [qDist, 0, 0, 1, 1];
		if (evTS == true) {if (TB3O.d2spB[6] != 0) {arX[2] = parseInt(TB3O.d2spB[6]); if (qDist > 30) {arX[0] = 30; arX[1] = qDist - 30;};};};//get the tournament square level
		arX[3] = getDR(xRace);//troop image ZERO index
		if (TB3O.speed == true) arX[4] = 2;//multiplier for speed servers
		return arX;
	};

	function createTimeTroopTable(pNode, x2, y2, bAR) {
		var aTb = $t([['id', 'mhtt'],['style', 'width:350px;']]);
		aTb.innerHTML = getTroopMerchantTooltipHTML(xy2id(x2, y2), true, true, true, bAR, false);
		var aD = $d("", [['id', 'trooptimetable']]);
		aD.appendChild(aTb);
		pNode.appendChild(aD);
	};

	function createTimeMerchantTable(pNode, x2, y2) {
		var aTb = $t([['id', 'mhtt'], ['style', 'width:350px;']]);
		aTb.innerHTML = getTroopMerchantTooltipHTML(xy2id(x2, y2), true, true, false, false);
		var aD = $d("", [['id', 'merctt']]);
		aD.appendChild(aTb);
		pNode.appendChild(aD);
	};

	function saveLastMarketSend() {
		var tbDest = $xf("//table[@id='target_validate']");
		if (!tbDest) return;
		var iRep = $xf("//*[@name='x2']");
		if (iRep) {TB3O.O[84] = iRep.value; setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');};
		var mkls = ['0', '0', '0', '0', -1000, -1000];
		var strDest = tbDest.rows[0].cells[0].textContent;
		var aDest = strDest.match(/\((-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)/g);
		var xyDest = aDest[0].replace("(", "").replace(")", "").split("|");
		var rtS = $xf("//input[starts-with(@name, 'r')]", 'l');
		if (rtS.snapshotLength > 0) {for (var xi = 0; xi < 4; xi++) {if (rtS.snapshotItem(xi).value == '') mkls[xi] = '0'; else mkls[xi] = rtS.snapshotItem(xi).value;}; mkls[4] = xyDest[0]; mkls[5] = xyDest[1]; setGMcookieV2("mkls", mkls, actV.vID);};
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
				var aTb = $t([['id', 'mkls']]);
				var aRow = $r();
				aRow.appendChild($c('<img src="' + image["vmkls"] + '">', [['class', 'mklshh']]));
				for (var xi = 1; xi < 5; xi++) {aRow.appendChild($c(gIc["r" + xi], [['class', 'mklshh']]));};
				aRow.appendChild($c(T('RESEND'), [['class', 'mklshh']]));
				aRow.appendChild($c(T('DEL'), [['class', 'mklshh']]));
				var bRow = $r();
				bRow.appendChild($c("(" + mkls[4] + "|" + mkls[5] + ")", [['class', 'mklsc']]));
				for (var xi = 0; xi < 4; xi++) {bRow.appendChild($c(mkls[xi]));};
				bRow.appendChild($c('<a href=' + jsVoid + ' onClick = "' + (mkls[0] != 0 ? 'snd.r1.value=' + mkls[0] : '') + (mkls[1] != 0 ? '; snd.r2.value=' + mkls[1] : '') + (mkls[2] != 0 ? '; snd.r3.value=' + mkls[2] : '') + (mkls[3] != 0 ? '; snd.r4.value=' + mkls[3] : '') + '; snd.x.value=' + mkls[4] + '; snd.y.value=' + mkls[5] + ';"><img src="' + image["bOK"] + '" title="' + T('YES') + '" alt="' + T('YES') + '"></a>', [['class', 'mklsc']]));
				
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
		
		function hideLastMarketSend(mkls) {return function() {for (var xi = 0; xi < 4; xi++) {mkls[xi] = 0;}; setGMcookieV2("mkls", mkls, actV.vID); $g('mkls').style.display = 'none';};};
	};
	
	function isMarketSend() {
		//try to save the last transport for this village
		saveLastMarketSend();
		var bML1 = false;
		var bML2 = false;
		var retValue = 0;
		if ($xf("//form[@action='build.php' and @name='snd']")) {
			var mL = document.getElementsByTagName("a");
			for (xi = 0; xi < mL.length; xi++) {if (mL[xi].href.indexOf("&t=1") != -1) bML1 = true; if (mL[xi].href.indexOf("&t=2") != -1) bML2 = true;};
			var iText = $xf("//input[@type='Text']|//input[@type='text']", 'l');
			if (bML1 && bML2) retValue = iText.snapshotLength;
		};
		iText = null;
		return (retValue >= 6);
	};

	function setMerchantsCell(tM, colM, rTb) {
		var cM = $g("mhMerchants");
		if (!cM) {rM = $r(); cM = $c(tM, [["id", "mhMerchants"], ["style", 'font-size:11px; color:' + colM + ';line-height:16px;'], ["colspan", '9']]); rM.appendChild(cM); rTb.appendChild(rM);} else {cM.innerHTML = tM; $at(cM, [['style', 'font-size:11px; color:' + colM + ';line-height:16px;']]);};
	};
	
	function marketSend() {
		//we are inside the market, option "Send resources"
		getLastMarketSend();
		// Array of new quantities
		var aQcarry = [100, 250, 500, 1000];
		var bAdjMc = true;
		var strMaxC = $xf("//form//p/b");
		var maxC = 0;
		if (strMaxC) {maxC = toNumber(strMaxC.innerHTML); for (var i = 0; i < aQcarry.length; i++) {if (maxC == aQcarry[i]) {bAdjMc = false; break;};}; setGMcookieV2("merchantscapacity", maxC, actV.vID);} else maxC = TB3O.Mcap;
		//Insert new quantities selectable via links on the market -> send resources page
		if (bAdjMc) aQcarry = [100, 500, 1000, maxC];
		var moC = $xf("//td[@class='mer'] | //table[@class='f10']//tr//td[@colspan='2']");
		if (moC) {mCIHTML = moC.innerHTML;
		//for merchant routes - no of repeat actions
		var iRep = $xf("//*[@name='x2']");
		if (iRep && TB3O.O[87] == '1') iRep.value = TB3O.O[84];
		addCumulativeArrivals(maxC, moC.textContent);
		mName = mCIHTML.split(' ')[0]; setGMcookie("merchantsName", mName, false); maxM = parseInt(mCIHTML.split(' ')[1].split('/')[0]);};
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
		var clAllImg = $img([['src', image["bDel"]], ['title', T('MTCL')]]);
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
				$at(bgC0, [['style', 'width:70%;']]);
				var bgC1 = bgR.cells[1];
				$at(bgC1, [['style', 'width:30%']]);
				var bgR1 = $r();
				var bgC2 = $c("", [['style', 'width:70%;']]);
				bgR1.appendChild(bgC2);
				var bgC3 = $c(moC.innerHTML, [["style", "font-weight:bold; color:darkblue; width:30%;"]]);
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
		if (uTRc == 'false') {uTRc = 'true|true|true|true'; setGMcookie('usethemres', uTRc, false);};
		var aUTR = uTRc.split("|");

		var uRow1 = $r();
		var uCell1 = $c(gIc["r1"], [['style', 'width:30px;']]);
		uRow1.appendChild(uCell1);
		var uCell2 = $c("", [['style', 'width:30px;']]);
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
				if (uR) {var uTRc = getGMcookie('usethemres', false); var aUTR = uTRc.split("|"); if (uR.checked == true) aUTR[i - 1] = 'true'; else aUTR[i - 1] = 'false'; uTRc = aUTR.join("|"); setGMcookie("usethemres", uTRc, false);};
			};
		};

		//matteo466
		function clearTransportRes(i) {return function() {rxI[i].value = ''; mhRowUpdate();};};
		function clearTransport() {for (var i = 1; i < 5; i++) {rxI[i].value = '';}; mhRowUpdate();};

		function createEventUseThemAllPr() {
			var totRes = 0;
			for (var i = 0; i < 4; i++) {var useRes = $g("res" + (i + 1) + "x"); if (useRes && useRes.checked == true) totRes += crtResUnits[i];};
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
					if (aRes < minResource) {minResource = aRes; minResourceType = i;};
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
			for (var i = 0; i < 4; i++) {var useRes = $g("res" + (i + 1) + "x"); if (useRes && useRes.checked == true) {totRes += crtResUnits[i]; intSelected += 1;};};
			var minA = maxTr / intSelected;
			var minB = totRes / intSelected;
			minX = Math.min(parseInt(minA), parseInt(minB));
			for (var i = 1; i < 5; i++) {
				var useRes = $g("res" + i + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {aRes = minX; if (aRes > crtResUnits[i - 1]) aRes = crtResUnits[i - 1];};
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
				if (useRes && useRes.checked == true) {aRes = (intSelected == 4 ? prod1H[i] : Math.floor(totalRes / intSelected)); if (aRes > crtResUnits[i]) aRes = crtResUnits[i];};
				rxI[i + 1].value = aRes;
			};
			mhRowUpdate();
		};

		function createEventMarketAllRes() {for (var i = 0; i < 4; i++) {rxI[i + 1].value = crtResUnits[i];}; mhRowUpdate();};

		function mhRowUpdate() {
			totTransport = 0;
			for (var xi = 1; xi < 5; xi++) {var aR = parseInt(rxI[xi].value); if (!isNaN(aR)) totTransport += aR;};
			totMerchants = Math.ceil(totTransport / maxC);
			mhColor = 'darkgreen';
			crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
			crtExceed = totTransport - maxTr;
			mhText = gIc["merchant"] + "<b>" + " (" + mName + "): " + totMerchants + "/" + maxM + "<br>" + T('MAX') + ": " + maxM * maxC + "<br>";
			if (totMerchants > maxM) {mhColor = "red"; mhText += T('MTX') + ": "+ crtExceed;} else mhText += T('MTW') + ": "+ crtWaste;
			mhText += "<br>" + T('MTC') + ": " + totTransport + "</b>";
			setMerchantsCell(mhText, mhColor, resTb);
		};

		function createEventmarketSend(i, q) {
			return function(){
				var aI = document.getElementsByTagName('INPUT')[i + 1];
				var aV = aI.value;
				var aS = (aV != '' ? parseInt(aV) : 0);
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
					var aS = (aV != '' ? parseInt(aV) : 0);
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
			var oD = $g("merctt");
			if (!isNaN(x) && !isNaN(y) && x != '' && y != '') {if (oD) oD.parentNode.removeChild(oD); var pOK = $xf("//form[@name='snd']/p[2]"); createTimeMerchantTable(pOK, x, y);} else {if (oD) oD.style.visibility = "hidden";};
		};

		//initial function provided by david.macej
		//modified by ms99
		function MerchantArrivingTitles(maxC, strAvTotM) {
			var retValue = '';
			var strMparTitles = $xf("//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/h4", 'r');
			if (strMparTitles.snapshotLength == 0) {return retValue;};
			var retValue1 = strMparTitles.snapshotItem(0).textContent;
			if (strMparTitles.snapshotLength == 2) return retValue1;//2 groups: 1st is arriving mercs, 2nd is own mercs

			var otherMercs = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[1]/td[1]/a[1][not(contains(@href,'" + spLnk + "'))]", 'r');
			if (otherMercs.snapshotLength == 0) otherMercs = $xf("//div[@id='" + dmid2 + "']//form/table[@class='traders']/thead/tr[1]/td[1]/a[1][not(contains(@href,'" + spLnk + "'))]", 'r');
			if (otherMercs.snapshotLength > 0) return retValue1; //only 1 group: the arriving mercs group
			var arrAvTotM = strAvTotM.split(" ")[1].split("/");
			var mercsOnWay = arrAvTotM[1] - arrAvTotM[0];

			var resSpanOnMercTables = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[3]/td[2]/span[@class='f10']", 'r');
			if (resSpanOnMercTables.snapshotLength == 0) resSpanOnMercTables = $xf("//div[@id='" + dmid2 + "']//form/table[@class='traders']//tr[@class='res']//span[@class='f10']", 'r');
			var totalMercsOnTables = 0;

			for(var i = 0; i < resSpanOnMercTables.snapshotLength; i++) {
				var resSpan = resSpanOnMercTables.snapshotItem(i);
				var tdRes = resSpan.textContent;
				var xPos = tdRes.indexOf("x");
				if (xPos != -1) tdRes = tdRes.substring(xPos + 1);
				var inRes = tdRes.split(" | ");
				var mW = parseInt(inRes[0]);
				var mC = parseInt(inRes[1]);
				var mI = parseInt(inRes[2]);
				var mCr = parseInt(inRes[3]);
				var totalResOnThisTable = mW + mC + mI + mCr;
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
			var tC = $c("", [["id", "timeouta"], ['style', 'font-weight:bold; font-size:9pt;']]);
			qRow.appendChild(tC);
			var eC = $c("");
			tRow.appendChild(eC);

			for (var xi = 1; xi < 6; xi++) {
				if (xi < 5) {
					var iC = $c(gIc["r" + xi], [['style', 'background-color:#F3F3F3;']]);
					var tC = $c("00:00:00", [['id', 'timeouta'], ['style', 'font-weight:normal; font-size:9pt;']]);
				} else {
					var iC = $c(T('TOTAL'), [['style', 'font-weight:bold; background-color:#F3F3F3;']]);
					var tC = $c("");
				};
				rRow.appendChild(iC);
				var qC = $c("0", [['class', 'tb3c'], ['id', "arrmQ" + xi], ['style', 'font-weight:bold; font-size:9pt;']]);
				qRow.appendChild(qC);
				tRow.appendChild(tC);
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
					var xPos = tdRes.indexOf("x");
					if (xPos != -1) tdRes = tdRes.substring(xPos + 1);
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
						var aC2 = $c("", [['class', 'tb3c'], ['colspan', '2'], ['style', 'padding:1px; text-align:' + docDir[0] + '; background-color:white; border:0px none transparent;']]);
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
		var rV;
		if (crtPage.indexOf("speed") != -1) rV = Math.round(Math.pow(3*cp/1600, 1 / 2.3)); else {if (TB3O.O[1] == "1") rV = Math.round(Math.pow(cp/2000, 1 / 2)); else rV = Math.round(Math.pow(cp/1600, 1 / 2.3));};//provided by ghqwerty (???)
		if (crtPage.indexOf("vip") != -1) rV = Math.round(Math.pow(2*cp/1600, 1 / 2.3)); else {if (TB3O.O[1] == "1") rV = Math.round(Math.pow(cp/2000, 1 / 2)); else rV = Math.round(Math.pow(cp/1600, 1 / 2.3));};//provided by ghqwerty (???)
		return rV;
	};

	//return the no of CP needed to create a specific no of villages (version from fr3nchlover)
	function villages2cp(noVil){
		var rV;
		if (crtPage.indexOf("speed") != -1 || crtPage.indexOf("research") != -1) {
			rV = Math.round(1.6/3 * Math.pow(noVil, 2.3)*10) * 100;
		} else {
			rV = 2000;
			if (noVil > 1) {if (TB3O.O[1] == "1") rV = Math.round(2 * Math.pow(noVil, 2)*10) * 100; else rV = Math.round(1.6 * Math.pow(noVil, 2.3)) * 1000;};
		};
		if (crtPage.indexOf("vip") != -1 ) {
			rV = Math.round(1.6/2 * Math.pow(noVil, 2.3)*10) * 100;
		} else {
		       rV = 2000;
		       if (noVil > 1) {if (TB3O.O[1] == "1") rV = Math.round(2 * Math.pow(noVil, 2)*10) * 100; else rV = Math.round(1.6 * Math.pow(noVil, 2.3)) * 1000;};
			 };
		return rV;
	};

	function culturePoints(){
		var aX = $xf("//div[@id='" + dmid2 + "']//b", 'l');
		var intAdd = 0;
		if (TB3O.T35 == false) {if (aX.snapshotLength != 5) return; intAdd = 1;} else if (aX.snapshotLength != 4) return;
		
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
				if (boolReachedMaxNewVillages == false) {maxNewVillages += 2; boolReachedMaxNewVillages = true;};
				//time until able to build/conquer a new village
				var tiempo = ((reqCP - crtTotalCP) / prodTotalCP) * 86400;
				var dtNow = new Date();
				dtNow.setTime(dtNow.getTime() + (tiempo * 1000));
				var iHTML = [crtVil + i + 1, reqCP, reqCP - crtTotalCP, computeTextTime(dtNow), formatTime(tiempo, 1)];
				strClass = 'CR';
			};
			for (var xi = 0; xi < 5; xi++) {var cpCellx = $c(iHTML[xi], [['class', strClass]]); cpRow.appendChild(cpCellx);};
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
			if (iW > 0) {var bRow = $r([['class', 'tb3rnb']]); bRow.appendChild($c(T('MTW') + ": " + iW, [['class', 'tb3cnb'], ['style', 'font-size:8pt; color:red; text-align:' + docDir[0] + ';']])); aTb.appendChild(bRow);};
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
		for(var i = 2; i < b.length - 1; i++) {b[i].appendChild(getBuyAllyCell(b[i])); b[i].appendChild(getBuyRatioCell(b[i])); addMarketOfferCellEvents(b[i]);};
	};

	function quitMarketFilter(aOffer, aFilter, filtros) {
		aOffer.removeAttribute("filtro" + aFilter);
		var rAt = true;
		for (var i = 0; i < filtros.length; i++) if (aOffer.getAttribute("filtro" + filtros[i]) == 'on') rAt = false;
		if (rAt == true) aOffer.removeAttribute("style");
	};

	function marketBuy() {
		if (crtPage.indexOf('&t=1&') != -1 && crtPage.indexOf('&t=1&u=') == -1) return;
		//get the original offers table
		var orOffersTb = $xf("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]");
		if (!orOffersTb) orOffersTb = $g("market_buy");
		if (!orOffersTb) orOffersTb = $g("range");
		getSavedMarketFilters();
		createFilterTable(orOffersTb);
		if (TB3O.T35 == false) {var linkid = $xf('//td[@class="rowpic"]/a', 'f', orOffersTb).href.match('id=([0-9]*)&')[1];} else {var lastCell = orOffersTb.rows[orOffersTb.rows.length - 1].cells[0]; var linkid = lastCell.lastChild.href.match('id=([0-9]*)&')[1];};
		//market preload
		marketpreload = parseInt(TB3O.O[48]) + 1;
		var pageNo1 = crtPage.indexOf("&u=");
		var intPage = 0;
		if (pageNo1 != -1) {var pageNo2 = crtPage.indexOf("#h2"); var pageNoS1 = crtPage.substring(pageNo1 + 3, pageNo2); var intPage = Math.round(parseInt(pageNoS1) / 40);};
		if (marketpreload > 1) {
			for (var i = 1; i < marketpreload; i++) {setTimeout(createPreloadFunc(i + intPage), getRndTime(1302));};
			var X2 = (marketpreload + intPage) * 40;
			var X1 = (intPage - marketpreload) * 40;
			var backLink = "build.php?id=" + linkid + "&t=1&u=" + X1 + "#h2";
			var forwardLink = "build.php?id=" + linkid + "&t=1&u=" + X2 + "#h2";
			var tdbfLinks = $xf('//td[@class="rowpic"]');
			if (!tdbfLinks) tdbfLinks = orOffersTb.rows[orOffersTb.rows.length - 1].cells[0];
			if (tdbfLinks) {
				if (X1 < 0) {var aSpan = $e("SPAN", "ֲ«"); $at(aSpan, [["style", "font-weight:bold;"], ["class", "c"]]);} else {var aSpan = $a("ֲ« ", [['href', backLink]]);};
				var fwLink = $a("ֲ»&nbsp;", [['href', forwardLink]]);
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
			return function() {marketFilters[aType] = aOpt; setGMcookieV2("marketfilters", marketFilters, 'all'); filterMarket(orOffersTb, aType, aOpt);};
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
			for (var i = 0; i < 5; i++) {for (var j = 0; j < 6; j++){var aFilters = $xf("//td[@id='filtro" + i + j + "']"); if (aFilters) {if (i == aType && j == (aOpt - 1)) $at(aFilters, [['class', 'sf']]); else if (i == aType) aFilters.removeAttribute('class');};};};
		};

		function getSavedMarketFilters() {var cookieMF = getGMcookieV2('marketfilters'); if (cookieMF && cookieMF['all']) marketFilters = cookieMF['all']; else {marketFilters = defaultMF; setGMcookieV2('marketfilters', marketFilters, 'all');};};

		function processOfferPage(ajaxResp) {
			var ad = ajaxNDV2(ajaxResp);
			if (TB3O.T35 == false) {
				var strOffersTableRows = "//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr";
				var xpres = $xf(strOffersTableRows, 'l', ad);
				var aRows = $xf(strOffersTableRows, 'l');
				var linktr = aRows.snapshotItem(aRows.snapshotLength - 1);
			} else {
				var strOffersTableRows = "//table[@id='market_buy']/tbody/tr | //table[@id='range']/tbody/tr";
				var xpres = $xf(strOffersTableRows, 'l', ad);
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

		function createPreloadFunc(page) {return function() {ajaxRequest("build.php?id=" + linkid + "&t=1&u=" + (page * 40) + "#h2", "GET", null, processOfferPage, dummy);};};

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
			if (aTb) {for (var i = 0; i < arrTNPC.snapshotLength; i++) {var ex = calculateResourceTime(arrTtT[i].aRes, "30"); if (ex) {xN = aTb.rows[i + 1].cells[aTb.rows[i + 1].cells.length - 1]; xN.innerHTML = ''; xN.appendChild(ex);};};};
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
			if (crtPage.search(/z=(\d+)/) >= 0) {z = RegExp.$1; for (var i = 0; i < vList.length; i++) {if (z == vList[i].vID) act = 2;};};
		};
		var rbA = $xf("//input[@value='" + act + "' and @name='c']");
		if (rbA) rbA.checked = true;
		rbA = null;
	};

	function prepareDivDocking() {
		var dD = $g(dlright1);
		if (!dD){dD = $d("", [["id", dlright1]]); $g(dmid).appendChild(dD);};
		if (dD) {TB3O.nTAUb = dD; TB3O.nTANb = dD; TB3O.nTARbT = dD; TB3O.nTASb = dD;};
		dD = null;
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
			if (!parBM) {parBM = $e("P"); $at(parBM, [['id', 'parBM']]); TB3O.nTAUb.appendChild(parBM);};
			parBM.appendChild(aTb);
		} else {
			uBminWidth = 215;
			var ubXY = TB3O.O[76].split("|");
			$df(uBminWidth, ubXY[0], ubXY[1], T('MARCADORES'), 'userbookmarks', "userbookmarksTT", true).appendChild(aTb);
		};
		playerLinks("userbookmarks");
		aTb = $g('userbookmarks');
		if (aTb && TB3O.O[21] == '1') adjustFloatDiv(aTb, uBminWidth, "userbookmarks");
		
		function getUserBookmarksTable() {
			var aTb = $t([['id', 'userbookmarks']]);
			//header row
			var uHr = $r();
			uHr.appendChild(getUserBookmarksHeader());
			aTb.appendChild(uHr);
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
						if (i > 0) {aUp = $a("", [['href', jsVoid]]); aUp.appendChild($img([['src', image["aup"]]])); aUp.addEventListener("click", moveUserBookmark(i, -1), false); upC.appendChild(aUp);};
						bmRow.appendChild(upC);

						downC = $c("");
						if (i < marcadores.length - 1) {var aDown = $a("", [['href', jsVoid]]); aDown.appendChild($img([['src', image["adn"]]])); aDown.addEventListener("click", moveUserBookmark(i, 1), false); downC.appendChild(aDown);};
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
						aCl = 'noact';
						if (marcadores[i][1] == crtPage) aCl = 'act';
						var aC = $c("<span>&#8226;&nbsp;&nbsp;</span>", [['class', aCl]]);
						bmRow.appendChild(aC);
					};
					//fr3nchlover
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
				var dI = (TB3O.O[82] != "1" ? ["unlocked" + docDir[0].substring(0, 1), '82.L', "1", '8'] : ["locked", '82.U', "0", '2']);
				aL[3] = $a("", [['href', jsVoid]]);
				aL[3].appendChild($img([['src', image[dI[0]]], ['title', T(dI[1])]]));
				aL[3].addEventListener("click", function() {TB3O.O[82] = dI[2]; setGMcookieV2('TB3Setup', TB3O.O, 'SETUP'); showUserBookmarks(); }, false);
				var hCell = $c("", [['colspan', dI[3]]]);
				hCell.appendChild(hText);
				for (var i = 0; i < 4; i++) {hCell.appendChild(document.createTextNode(" " + (i > 0 ? '| ' : ' '))); hCell.appendChild(aL[i]);};
				hText = null; aL = null;
				return hCell;
			};
		};

		function addUserBookmark(ubURL) {
			if (!ubURL) {ubURL = prompt(T('UBU'), TB3O.BrT); if (!ubURL || ubURL == '') return;};
			var ubL = prompt(T('UBT'), TB3O.BrT);
			if (!ubL || ubL == '') return;
			addGMcookieValue("marcadores", [ubL, ubURL], false);
			showUserBookmarks();
			ubL = null;
		};

		function moveUserBookmark(i, updown) {
			return function(){
				var ubC = getGMcookie("marcadores", false);
				var arrUbC = ubC.split("$$");
				var tmpUb = arrUbC[i + updown];
				arrUbC[i + updown] = arrUbC[i];
				arrUbC[i] = tmpUb;
				ubC = arrUbC.join("$$");
				setGMcookie("marcadores", ubC, false);
				showUserBookmarks();
				ubC = null; arrUbC = null; tmpUb = null;
			};
		};

		function editUserBookmark(i) {
			return function() {
				var ubC = getGMcookie("marcadores", false);
				var arrUbC = ubC.split("$$");
				var tmpUb = arrUbC[i].split("$");
				var ubLabel = prompt(T('UBT'), tmpUb[0]);
				var ubURL = null;
				if (ubLabel != '') ubURL = prompt(T('UBU'), tmpUb[1]);
				if (!ubLabel) ubLabel = tmpUb[0];
				if (!ubURL) ubURL = tmpUb[1];
				if (ubLabel != '' && ubURL != '' && (ubLabel != tmpUb[0] || ubURL != tmpUb[1])) {arrUbC[i] = ubLabel + "$" + ubURL; ubC = arrUbC.join("$$"); setGMcookie("marcadores", ubC, false); showUserBookmarks();};
				ubC = null; arrUbC = null; utLabel = null; ubURL = null;
			};
		};
	};
	
	function getSpielerInfo() {
		if (crtPage.indexOf(spLnk) != -1) {
			var aV = getCapitalInfo();
			if (aV) {setCapitalInfo(aV); setUserName(getPlayerName()); setLngRace();};
		} else {
			//get town coordinates from the spieler.php page via AJAX request
			ajaxRequest(spLnk, 'GET', null, function(ajaxResp) {
				var ad = ajaxNDV2(ajaxResp);
				var aV = getCapitalInfo(ad);
				if (aV) {setCapitalInfo(aV); setUserName(getPlayerName(ad)); setLngRace(ad);};
			});
		};
		aV = null; ad = null;
		return;
	};
	
	function getSingleTownNewdid() {
		ajaxRequest("/dorf3.php", 'GET', null, function(ajaxResp) {
			if (ajaxResp) {
				ajaxResp.responseText.search(/dorf1.php\?newdid=(\d+)/);
				TB3O.U[5] = RegExp.$1;
				setGMcookieV2('UserInfo', TB3O.U, 'UsI');
			};
		});
		return;
	};

	function createVillageList(dlr1) {
		//single village
		if (TB3O.U[4] != '') {
			//idea from Travian3 Beyond Hacked FR (mik french (fr), A_r_e_s (br), Booboo(hu))
			//create village list for single village accounts
			xy = id2xy(TB3O.U[4]);
			if (!dlr1) {dlr1 = $d("", [['id', dlright1]]); divlmidall = $g(dmid); divlmidall.appendChild(dlr1);};
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
				bLink = $a(TB3O.U[3], [['class', 'active_vl'], ['href', (TB3O.U[5] == '' ? '?newdid=0' : '?newdid=' + TB3O.U[5])]]);
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
				aRow.appendChild($c("&#8226;ֲ�", [['class', 'dot']]));
				var aC = $c("", [['class', 'text']]);
				xVil = $a(TB3O.U[3], [['href', (TB3O.U[5] == '' ? '?newdid=0' : '?newdid=' + TB3O.U[5])]]);
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
				aRow.appendChild($c("&#8226;", [['class', 'dot hl']]));
				bCell = $c("", [['class', 'link']]);
				bLink = $a(TB3O.U[3], [['href', '?newdid=' + (TB3O.U[5] == '' ? '0' : TB3O.U[5])]]);
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
		var vlH = $xf("//div[@id='" + dlright1 + "']//a[contains(@href, 'dorf3.php')]");
		if (vlH) {
			if (vlH.parentNode.nodeName == "TD") vlH.innerHTML = T('ALDEAS') + " (" + (vCount - 1) + "):&nbsp;&nbsp;"; else vlH.firstChild.innerHTML = T('ALDEAS') + " (" + vCount + "):&nbsp;&nbsp;";
			l = $a(gIc["reload_p"], [['href', jsVoid]]);
			l.addEventListener("click", updatePopulation, false);
			insertAfter(vlH, l);
		};
		vlH = null;

		function updatePopulation() {
			ajaxRequest(spLnk, 'GET', null, function(ajaxResp) {
				var ad = ajaxNDV2(ajaxResp);
				var aTb = $xf("//table[@id='villages'] | //div[@id='" + dmid2 + "']//table[@class='tbg'][2]", 'f', ad);
				if (aTb) {parsePlayerTable(aTb, true); pauseScript(892); location.href = crtPage;}
			});
			return;
		};
	};

	function parsePlayerTable(aTb, bUpd) {
		var vPop = 0;
		var totP = 0;
		var vLnk, aLnk, cxy, vID;
		for (i = 2; i < aTb.rows.length; i++) {
			vPop = parseInt(aTb.rows[i].cells[1].innerHTML);
			totP += vPop;
			vLnk = aTb.rows[i].cells[0].getElementsByTagName("A")[0];
			aLnk = vLnk.href.split("=");
			cxy = id2xy(aLnk[1]);
			vID = xy2id(cxy[0], cxy[1]);
			if (bUpd == true) setVillageRes(vID, vPop);
		};
		vPop = null; vLnk = null; aLnk = null; cxy = null; vID = null;
		return totP;
	};

	function getBiPTMTable(vNewdid) {
		//create the BiP & troop movements table for this village
		var arrBiP = null;
		var arrTM = null;
		var bS = false;
		var xImg, dDT, tDT, atT, bipT, tr1, tr2, aC1, aC2, aC3, aC4, strH, strM;
		var fDiv = $e("DIV");
		var cBiP = getGMcookieV2("BiP");
		var cTM = getGMcookieV2("TroopMovements");
		
		fDiv.innerHTML = '';
		if (cBiP && cBiP[vNewdid] != undefined) arrBiP = cBiP[vNewdid];
		if (cTM && cTM[vNewdid] != undefined) arrTM = cTM[vNewdid];

		if (arrBiP != null) {
			tr1 = $r([['class', 'tb3r']]);
			aC1 = $c("<img src='" + gIc["bau"] + "'>", [['class', 'tb3c'], ['style', 'text-align:center;'],['colspan', '3']]);
			tr1.appendChild(aC1);
			for (var i = 0; i < arrBiP.length; i++) {
				bipT = arrBiP[i].endTime;
				dDT = new Date();
				tDT = dDT.getTime();
				if (tDT < bipT) {
					tr2 = $r();
					aC2 = $c(arrBiP[i].name, [['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					aC3 = $c(arrBiP[i].txtLvl, [['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var strEndTime = new Date();
					strEndTime.setTime(arrBiP[i].endTime);
					strH = strEndTime.getHours();
					if (strH < 10) strH = '0' + strH;
					strM = strEndTime.getMinutes();
					if (strM < 10) strM = '0' + strM;
					aC4 = $c(strH + ":" + strM,  [['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					tr2.appendChild(aC2);
					tr2.appendChild(aC3);
					tr2.appendChild(aC4);
					if (bS == false) {fDiv.appendChild(tr1); bS = true;};
					fDiv.appendChild(tr2);
				};
			};
		};

		bS = false;
		if (arrTM != null) {
			tr1 = $r([['class', 'tb3r']]);
			aC1 = $c(gIc["att_all"], [['class', 'tb3c'], ['style', 'text-align:center;'],['colspan', '3']]);
			tr1.appendChild(aC1);
			for (var i = 0; i < arrTM.length; i++) {
				atT = arrTM[i].fT;
				dDT = new Date();
				tDT = dDT.getTime();
				if (tDT < atT) {
					tr2 = $r([['class', 'tb3r']]);
					xImg = TB3O.T35 == true ? gIc[arrTM[i].type] : '<img src="' + img("a/" + arrTM[i].type) + '" height="12px" width= "12px">';
					aC2 = $c(xImg, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					aC3 = $c(arrTM[i].no, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var strFTime = new Date();
					strFTime.setTime(arrTM[i].fT);
					strH = strFTime.getHours();
					strM = strFTime.getMinutes();
					aC4 = $c((strH > 9 ? strH : '0' + strH) + ":" + (strM > 9 ? strM : '0' + strM),  [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					tr2.appendChild(aC2);
					tr2.appendChild(aC3);
					tr2.appendChild(aC4);
					if (bS == false) {fDiv.appendChild(tr1); bS = true;};
					fDiv.appendChild(tr2);
				};
			};
		};
		var vRet = fDiv.innerHTML;
		fDiv = null; xImg = null; dDT = null; tDT = null; atT = null; bipT = null; tr1 = null; tr2 = null; aC1 = null; aC2 = null; aC3 = null; aC4 = null; strH = null; strM = null;
		return vRet;
	};

	function showBiPTMinTT(vNewdid) {
		//show Buildings in Progress and Troop Movements in a tooltip
		return function() {
			var tI = getBiPTMTable(vNewdid);
			if (tI != '') {
				var aT = $g("tb_tooltip");
				if (aT == null) aT = createTooltip();
				aT.innerHTML = "<table id='BiPTM' + width='100px'>" + tI + "</table>";;
				aT.style.display = 'block';
				tI = null; aT = null;
			};
		};
	};

	function villageList() {
		//list of villages
		dlr1 = $g(dlright1);
		divlmid2 = $g(dmid2);
		var vTable = $g('vlist');
		if (!vTable) vTable = $xf("//table[@class='vlist'] | //div[@id='" + dlright1 + "']//table[@class='f10']");
		if (!vTable) vTable = createVillageList(dlr1); else if (TB3O.U[4] != '-' || TB3O.U[5] != '-') {TB3O.U[4] = '-'; TB3O.U[5] = '-'; setGMcookieV2('UserInfo', TB3O.U, 'UsI');};
		if (!vTable) return;
		vilCount(vTable.rows.length);
		if (dlr1.childNodes[1] && dlr1.childNodes.nodeName == "DIV" || dlr1.childNodes[0] && dlr1.childNodes[0].nodeName == "DIV") vTable = vTable.firstChild;
		zi = 0;
		if (vTable.parentNode.nodeName == "DIV" && (vTable.parentNode.id == 'sright' || vTable.parentNode.id == 'side_info')) zi = 1;
		$at(dlr1, [['style', 'position:absolute; top:97px; ' + docDir[0] + ':682px;']]);
		//$at(dlr1, [['style', 'display:none;']]);
		if (TB3O.VillageRes && TB3O.VillageRes[actV.vID]) TB3O.AVP = TB3O.VillageRes[actV.vID][0];
		for (var i = zi; i < vTable.rows.length; i++){
			v = vTable.rows[i];
			vCell = v.cells[1];
			if (!vCell) continue;
			/*
			if (zi == 1) {
				vName = vCell.textContent;
				vLink = vCell.childNodes[0].href;
			} else {
			*/
			if (zi == 1) {
				vName = vCell.textContent;
				vLink = vCell.childNodes[0].href;
				if (!vLink) vLink = vCell.childNodes[0].childNodes[0].href;
				if (!vLink) continue;
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
			if (vNewdid != actV.vNewdid) vNames += '"' + vName + '",';

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
				if (TB3O.VillageRes == "false") {popCell = $c("<a href='" + spLnk + "'>?</a>");} else {popCell = $c(popX[0], [['style', 'color:darkgreen;']]);};
				v.appendChild($c(" " + "<img src='" + image["pop"] + "'>", [['style', 'text-align:' + docDir[0] + ';']]));
				v.appendChild(popCell);
			};

			//show res prod/h
			if (TB3O.O[15] == '1' && TB3O.VillageRes[vList[yi].vID]) {
				for (var xi = 1; xi < 4; xi++) {v.appendChild($c(" " + gIc["r" + xi], [['style', 'text-align:' + docDir[0] + ';']])); v.appendChild($c(TB3O.VillageRes[vList[yi].vID][xi]));};
			};
			
			//show effective crop prod/h
			if (TB3O.O[16] == "1") {
				cpphColor = "black";
				cpph = parseInt(popX[4]);
				if (cpph > 0) {cpph = "+" + cpph; cpphColor = "darkgreen";} else if (cpph < 0) cpphColor = "red";
				v.appendChild($c(" " + gIc["r4"], [['style', 'text-align:' + docDir[0] + ';']]));
				v.appendChild($c(cpph, [['style', 'color:' + cpphColor + ';']]));
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
					v.appendChild($c(" " + "<img src='" + image["dist" + docDir[0].substr(0,1)] + "'>" + " " + lDist.toFixed(2), [['style', 'color:blue;']]));
				};
			};
		};
					 if (strFirst == "vip1" && strLast == "ae") {
				    //vip
			 
				    divlmid2 = $g(dmid2);
				    dlr1.style.width = (v.parentNode.clientWidth + 150) + 'px';
				    dx = docDir[0] == 'left' ? parseInt(divlmid2.offsetLeft) + parseInt(divlmid2.clientWidth) : parseInt(TB3O.wW) - parseInt(divlmid2.offsetLeft);// + parseInt(dlr1.clientWidth);
		  $at(dlr1, [['style', 'position:absolute; top:' + divlmid2.offsetTop + 'px; ' + docDir[0] + ':' + dx + 'px;']]); 
			 }
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
		var VL2W = 250; var vL2Tb = create2ndVLtable(); var vL2XY = TB3O.O[78].split("|"); $df(VL2W, vL2XY[0], vL2XY[1], T('VGL'), "vl2table", "vl2tableTT", true).appendChild(vL2Tb); vL2Tb = $g("vl2table"); if (vL2Tb) adjustFloatDiv(vL2Tb, VL2W, "vl2table");
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
			tdE = $c('', [['style', 'width:10px;']]);
			aRow.appendChild(tdE);
			if (i + maxRows <= vList.length ) {
				cCell = $c(strBx);
				if (vList[i - 1 + maxRows].vID == actV.vID) $at(cCell, [['class', 'av']]);
				bLink = $a(vList[i - 1 + maxRows].vName, [['href', vList[i - 1 + maxRows].vLink]]);
				cCell.appendChild(bLink);
				aRow.appendChild(cCell);
				aRow.appendChild($c("(" + vList[i - 1 + maxRows].vx + "|" + vList[i - 1 + maxRows].vy + ")", [['class', 'coord']]));
				aRow.appendChild($c("<a href='a2b.php?z=" + vList[i - 1 + maxRows].vID + "'>" + gIc["def1_1"] + "</a>"));
				aRow.appendChild($c("<a href='build.php?z=" + vList[i - 1 + maxRows].vID + "&gid=17'>" + gIc["r41"] + "</a>"));
			} else {
				cCell = $c("", [['colspan', '4']]);
				if (vList.length == 1) $at(cCell, [['style', 'width:250px;']]);
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
						aCell.appendChild($i([['type', 'checkbox'], ['id', 'faketroop_' + (xi)], ['value', '1']]));
						aImg = $img([['src', gIc["u" + (xi + TB3O.U[7] - 1)]]]);
						if (TB3O.T35 != false) $at(aImg, [['class', "unit u" + (xi + TB3O.U[7] - 1)]]);
						aCell.appendChild(aImg);
						aCell.appendChild(document.createTextNode("  "));
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
		
		var bOK = $xf("//*[@id='btn_ok' and @name='s1']");
		if (bOK) bOK.addEventListener('click', saveLastAttack, false);
		
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
				if (stla.length > 14) {cRow.appendChild($c('<img class="unit uhero" src="' + xGIF + '">', [['class', 'stlahh']])); cRow.appendChild($c(stla[12]));} else {cRow.appendChild($c('', [['class', 'stlahh']])); cRow.appendChild($c(''));};
				
				var eRow = $r();
				eRow.appendChild($c(T('RESEND'), [['class', 'stlahh1'], ['colspan', '2']]));
				var aL = $a('<img src="' + image["bOK"] + '" title="' + T('YES') + '" alt="' + T('YES') + '">', [['href', jsVoid]]);
				aL.addEventListener("click", setLastAttack, false);
				var sC = $c("", [['class', 'stlac'], ['colspan', '3'], ['style', 'width:100px;']]);
				sC.appendChild(aL);
				eRow.appendChild(sC);
				var fRow = $r();
				eRow.appendChild($c(T('DEL'), [['class', 'stlahh2'], ['colspan', '2']]));
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
			var tx;
			for (var i = 2; i < stla.length - 2; i++) {tx = $xf("//form[@name='snd']//*[@name='t" + (i - 1) + "']"); if (stla[i] != 0 && tx.className != 'text disabled') tx.value = stla[i]; else tx.value = '';};
			updateTroopsPower();
			if (TB3O.O[52] == '1') {$xf("//form[@name='snd']//*[@name='x']").value = stla[0]; $xf("//form[@name='snd']//*[@name='y']").value = stla[1];};
			var rbc = $xf("//form//input[@name='c' and @value='" + stla[stla.length - 2] + "']");
			if (rbc) rbc.checked = true;
		};
		
		function hideLastAttackSend() {for (var xi = 2; xi < stla.length; xi++) {stla[xi] = 0;}; setGMcookieV2("stla", stla, actV.vID); $g('stla').style.display = 'none';};
		
		function saveLastAttack() {
			var aT = $xf("//form[@name='snd']//table//input[starts-with (@name, 't')]", 'l');
			var stla = new Array();
			stla[0] = $xf("//form[@name='snd']//*[@name='x']").value;
			stla[1] = $xf("//form[@name='snd']//*[@name='y']").value;
			for (var i = 0; i < aT.snapshotLength; i++) {stla[i + 2] = 0; stla[1 + parseInt(aT.snapshotItem(i).name.replace("t", ""))] = (aT.snapshotItem(i).value != '' ? parseInt(aT.snapshotItem(i).value) : 0);};
			var rbl = $xf("//form//input[@name='c']", 'l');
			for (var i = 0; i < rbl.snapshotLength; i++) {if (rbl.snapshotItem(i).checked == true) {stla[stla.length] = rbl.snapshotItem(i).value; stla[stla.length] = rbl.snapshotItem(i).parentNode.textContent;};};
			setGMcookieV2('stla', stla, actV.vID);
		};
	};
	
	function updateTroopsPower() {
		totals = [["troopsattpower", "att_all", 5, 0], ["troopsdefipower", "def_i", 6, 0], ["troopsdefcpower", "def_c", 7, 0], ["troopscapacity", "capacity", 4, 0], ["troopscropconsumption", "img5", 9, 0]];
		for (var i = 1; i < 11; i++) {
			tInput = $g("t" + i);
			if (tInput) {
				/*
				if (TB3O.T35 == false) tImg = tInput.parentNode.previousSibling.firstChild; else tImg = tInput.parentNode.childNodes[1];
				*/
				if (TB3O.T35 == false) {
					tImg = tInput.parentNode.previousSibling.firstChild;
				} else {
					tImg = tInput.parentNode.childNodes[1];
					if (!tImg || tImg.nodeType == 3) {
						tImg =$xf(".//preceding-sibling::img", false, tInput);
					}
				}
				//
				tType = getTroopIndexTitleFromImg(tImg)[0];
				if (tInput.value != "") {intTinput = parseInt(tInput.value); for (var j = 0; j < 5; j++) {totals[j][3] += intTinput * uc[tType][totals[j][2]];};};
			};
		};
		for (var j = 0; j < 5; j++) {
			cX = $g(totals[j][0]);
			if (cX) {
				strX = " *";
				switch (j) {
					case 3: iP = gIc["capacity"]; strX = ""; break;
					case 4: iP = gIc["r5"]; strX = ""; break;
					default: iP = gIc[totals[j][1]]; break;
				};
				cX.innerHTML = iP + strX + " " + $ls(totals[j][3]);
			};
		};
		return;
	};
	
	//someweirdnobody (initial), Nux (selectScout & selectFake), ms99 (final), Acr111 (change)
	function selectAllTroops() {
		var iF = $xf("//input[@name='t1' and not (@type='hidden')]");
		if (iF == null) return;
		var tI;
		var tL;
		for (var i = 1; i < 12; i++) {
			tI = $xf("//input[@name='t" + i + "']");
			if (tI) {
				$at(tI, [['id', 't' + i]]);
				tI.addEventListener('keyup', updateTroopsPower, false);
				tI.addEventListener('change', updateTroopsPower, false);
				/*
				if (TB3O.T35 == false) {tL = tI.parentNode.nextSibling.firstChild;} else {tL = tI.parentNode.childNodes[5]; if (!tL) tL = tI.parentNode.childNodes[5].childNodes[0];};
				*/
				if (TB3O.T35 == false) {
					tL = tI.parentNode.nextSibling.firstChild;
				} else {
					tL = tI.parentNode.childNodes[5]; 
					if (!tL) tL = tI.parentNode.childNodes[5].childNodes[0];
					if (!tL || tL.nodeType == 3) {
						tL =$xf(".//following-sibling::a[@onclick]", false, tI);
					}
				};
				//
				if (tL) {xxx = tL.textContent.replace("(", "").replace(")", ""); if (xxx != '0') {$at(tL, [['id', 'troopsav_' + i]]); tL.addEventListener('click', addUpdateTroopsPower(i, tL), false);};};
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
			if (i == 0) {bCell = $c("", [['colspan', '2']]); aRow.appendChild(bCell);};
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
				if (aCell != null) {aCell.setAttribute('colspan', '2'); aRow.appendChild(aCell);};
			};
			aTb.appendChild(aRow);
		};

		insertAfter(header, aTb);

		troopTable = $g("troops");
		if (!troopTable) troopTable = $xf("//table[@class='troops'] | //table[@class='dashed'] | //table[@class='f10']");
		
		//fix for unusual icons appearing under the list of villages - fr3nchlover
		tags7 = $xf("//div[@id='" + dmid2 + "']//td[@class='s7']");
		if ((TB3O.T35 == false && troopTable != null && !tags7) || (TB3O.T35 == true && troopTable != null)) {
			//"clear all" button
			aRow = $r();
			delCell = $c("", [['colspan', '12'], ['style', 'text-align:center']]);
			clAllLink = $a("<img src='" + image["bDel"] + "' title='" + T('MTCL') + "' alt='" + T('MTCL') + "'>");
			clAllLink.href = jsVoid;
			clAllLink.addEventListener("click", clearAllTroops, false);
			delCell.appendChild(clAllLink);
			aRow.appendChild(delCell);
			troopTable.appendChild(aRow);

			//additional table as requested by users
			if (TB3O.T35 == false) parX = $xf("//table[@class='p1']"); else parX = troopTable;
			if (parX) {
				attdefTable = $t([['class', 'tb3tb']]);
				hRow = $r([['class', 'tb3r']]);
				hCell = $c(T('STAT') + " (* = " + T('MIN') + ")", [['colspan', '4'], ['style', 'font-weight:bold;'], ['class', 'tb3ch']]);
				hRow.appendChild(hCell);
				attdefTable.appendChild(hRow);

				//total attack, def_i and def_c power for the selected troops
				bRow = $r([['style', 'text-align:' + docDir[0] + ';']]);

				aCell = $c(gIc["att_all"] + " *", [['id', "troopsattpower"], ['style', 'width:33%;']]);
				bCell = $c(gIc["def_i"] + " *", [['id', "troopsdefipower"], ['colspan', "2"], ['style', 'width:33%;']]);
				cCell = $c(gIc["def_c"] + " *", [['id', "troopsdefcpower"], ['style', 'width:34%;']]);

				bRow.appendChild(aCell);
				bRow.appendChild(bCell);
				bRow.appendChild(cCell);
				attdefTable.appendChild(bRow);
				dRow = $r();

				dRow.appendChild($c(gIc["capacity"], [['id', 'troopscapacity'], ['style', 'text-align:' + docDir[0] + '; width:50%;'], ['colspan', "2"]]));//total capacity
				dRow.appendChild($c(gIc["r5"], [['id', 'troopscropconsumption'], ['style', 'text-align:' + docDir[0] + '; width:50%;'], ['colspan', "2"]]));//crop consumption
				attdefTable.appendChild(dRow);

				aDiv = $d("");
				aDiv.appendChild($e("P", ""));
				aDiv.appendChild(attdefTable);
				insertAfter(parX, aDiv);
			};
		};

		function addUpdateTroopsPower(i, troopLink) {
			return function() {var aNo = parseInt(troopLink.textContent.replace("(", "").replace(")", "")); troopInput = $g("t" + i); if (troopInput) {troopInput.value = aNo; updateTroopsPower();};};
		};

		function clearAllTroops() {for (var i = 1; i < 12; i++) {var troopInput = $g("t" + i); if (troopInput) troopInput.value = '';}; updateTroopsPower(); return;};
		function getTroopInputFields() {return $xf("//form[@name='snd']//table//input[(@type='text' or @type='Text') and not (@name='x') and not (@name='y')] | //table[@class='p1']//table[@class='f10']//input[@type='Text' or @type='text']", 'l');};
		function getTroopInputMaxFields() {return $xf("//form[@name='snd']//table//a | //table[@class='p1']//table[@class='f10']//a", 'l');};

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
					if (scoutInput.value != "" && parseInt(scoutInput.value) > 0) {TB3O.O[50] = parseInt(scoutInput.value); setGMcookieV2('TB3Setup', TB3O.O, "SETUP");};
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
							if (aInput) {aInput.value = 1; chk = true;};
						};
					};
				};
				if (chk == false) {
					//no troops for fake selected or nothing availabe => use default
					tTroop = 2;
					avFake = $g('troopsav_2');
					if (!avFake) {avFake = $g('troopsav_1'); tTroop = 1;};
					if (avFake) {aInput = $g("t" + tTroop); if (aInput) {aInput.value = 1; chk = true;};};
				};
				if (chk == false) alert(T('NOSCOUT2FAKE')); else updateTroopsPower();
			} else alert(T('NOTROOPS'));
		};
	};

	function addAttDefInfoTable() {
		tTable = $xf("//div[@id='troop_village']//table | //div[@id='ltrm']/table | //div[@id='map_details']/table[@id='troops']");
		if (!tTable) return;
		var bS = false;
		if (TB3O.M35 != 2) {tDiv = tTable.previousSibling; if (tDiv.nodeName != "DIV") tDiv = tDiv.previousSibling; if (tDiv.nodeName == "DIV") bS = true;} else {tDiv = tTable.rows[0].cells[0]; bS = true;};
		if (bS == true) {tDiv.innerHTML += " "; iImg = $img([['src', image["info"]]]); tDiv.appendChild(iImg); tDiv.addEventListener("mouseover", showAttDefTooltip(), false); tDiv.addEventListener("mouseout",  hideTT, 0);};

		function showAttDefTooltip() {
			return function() {
				adtHTML = "<table id='mhtt' width='100px'>" + getTroopsAttDefInfoTable(tTable, false, true) + "</table>";
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
						iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + imgHTML + "</td><td style='text-align:" + docDir[1] + ";'>" + aRow.cells[1].textContent + "</td></tr>";
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
				if (bMin == true) {strMinInfo = "* = " + T('MIN'); strMinX = "*"; iHTML += "<tr><td colspan='2' style='font-weight:bold; text-align:center;'>" + T('STAT') + "</td></tr>";};
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
						if (tNTroops) {tNTroopsS = tNTroops.childNodes[1];} else {tNTroops = $xf("//table[@id='troop_info']"); if (tNTroops) tNTroopsS = tNTroops.childNodes[3];};
					} else {
						tNTroops = $xf("//table[@class='f10']");
						if (tNTroops) tNTroopsS = tNTroops.childNodes[0];
					};
					if (tNTroopsS) {
						tNInfo = getTroopsAttDefInfoTable(tNTroopsS, false);
						if (tNInfo != '') {
							if (tNTroops.id && tNTroops.id == 'troop_info') {
								//tNTroops.innerHTML += tNInfo;
								var aTb = $t([['id', 'mhtt'], ['style', 'width:150px;']]);
								aTb.innerHTML = tNInfo;
								tNTroops.parentNode.appendChild(aTb);
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
		if (fieldtype != 0) {
			//a map cell or a village
			tmTableHTML = "";
			ttHTML = "<table id='mhtt'>";
			if (fieldtype) {
				//there are 12 types of cells
				dist = [[3, 3, 3, 9], [3, 4, 5, 6], [4, 4, 4, 6], [4, 5, 3, 6], [5, 3, 4, 6], [1, 1, 1, 15], [4, 4, 3, 7], [3, 4, 4, 7], [4, 3, 4, 7], [3, 5, 4, 6], [4, 3, 5, 6], [5, 4, 3, 6]];
				info = dist[fieldtype-1];
				ttHTML += "<tr><td colspan='2'>";
				for (var i = 1; i < 5; i++) {ttHTML += gIc["r" + i] + " " + info[i-1] + ' ';};
				ttHTML += "</td></tr><tr><td>&nbsp;</td></tr>";
			};
			if (TB3O.O[57] == "1") tmTableHTML = getTroopMerchantTooltipHTML(vID, false, true, true, false, false);
			ttDiv.innerHTML = ttHTML + tmTableHTML + "</table>";
		} else {
			//an oasis
			ttHTML = getTroopsAttDefInfoTable(anTb, true);
			if (TB3O.O[57] == "1") ttHTML += "<tr><td>&nbsp;</td></tr>";
			ttHTML = "<table id='mhtt'>" + ttHTML;
			ttHTML += getTroopMerchantTooltipHTML(vID, false, false, true, false, false) + "</table>";
			ttDiv.innerHTML = ttHTML;
		};
		ttDiv.style.display = 'block';
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
						//use the map_infobox
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
								//2nd alternative
								mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
							};
						} else {
							//2nd alternative
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

	function processMapCell(ajaxResp, mev, crtPos) {
		var fieldType;
		var ad = ajaxNDV2(ajaxResp);

		if (TB3O.T35 == false) {
			aField = $xf("//img[@id='resfeld']", 'f', ad);
			if (aField) aField = aField.src.search(/\/w(\d+)\.jpg$/); else aField = $xf("//img[starts-with(@id, 'w')]", 'f', ad);

			if (aField) {
				//this is an oasis
				if (crtPos) {
					anTb = $xf("//table[@class='f10']", 'f', ad);
					if (anTb) anTb = anTb.childNodes[0]; //we need only the table not the body
					fieldType = 0;
					showFieldInfoInTooltip(crtPos, 0, anTb);
				};
			} else {
				aField = $xf("//div[starts-with(@id, 'f')]", 'f', ad);
				aField.id.search(/f(\d)/);
				fieldtype = RegExp.$1;
				//this is an empty cell or a village
				showCellInfo(mev.pos + 1, fieldtype);
				if (crtPos) showFieldInfoInTooltip(crtPos, fieldtype);
			};
		} else {
			imgID = $xf("//img[starts-with(@id, 'f')] | //img[starts-with(@class, 'f')]", 'f', ad);
			if (imgID) {
				//a cell or village
				fieldTypeC = imgID.getAttribute("class");
				if (!fieldTypeC) fieldType = imgID.getAttribute("alt"); else fieldType = parseInt(fieldTypeC.replace("f", ""));
				fieldtype = showCellInfo(mev.pos + 1, fieldType);
				if (crtPos) showFieldInfoInTooltip(crtPos, fieldtype);
			} else {
				//perhaps an oasis
				if (crtPos) {
					imgID = $xf("//img[starts-with(@id, 'w')] | //img[starts-with(@class, 'w')]", 'f', ad);
					if (imgID) {
						anTb = $xf("//div[@id='map_details_troops']//table", 'f', ad);
						if (anTb) {
							anTb = anTb.childNodes[1]; //we need only the table not the body
						} else {
							anTb = $xf("//table[@id='troop_info']", 'f', ad);
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

	function getTroopMerchantTooltipHTML(vID, addCoords, addMTime, addTTime, bAR, bDist) {
		var iHTML = "";
		xy = id2xy(vID);
		qDist = getDistance(xy[0], xy[1], actV.vx, actV.vy);
		//add dest coords
		if (bDist == true) {var xyRow = $r(); xyRow.appendChild($c("(" + xy[0] + "|" + xy[1] + ")", [['class', 'dec'], ['colspan', '2']])); iHTML = "<tr>" + xyRow.innerHTML + "</tr>";};
		//add the distance row
		strDist = '';
		aRow = $r();
		aCell = $c("", [['class', 'center']]);
		aCell.appendChild($img([['src', image["dist" + docDir[0].substr(0,1)]]]));
		aRow.appendChild(aCell);

		if (qDist != 0) {
			aRow.appendChild($c(qDist.toFixed(2), [['class', 'mCol']]));
			if (addCoords == true) strDist = "(" + actV.vx + "|" + actV.vy + ") " + "<img src= '" + image["dist" + docDir[0].substr(0,1)] + "'>" + " (" + xy[0] + "|" + xy[1] + ")";
			if (strDist != "") {
				c1Cell = $c("&nbsp;&nbsp;");
				cCell = $c(strDist, [['class', 'mCol'], ['colspan', bAR == true ? '5' : '1']]);
				aRow.appendChild(c1Cell);
				aRow.appendChild(cCell);
			};
			iHTML += "<tr>" + aRow.innerHTML + "</tr>";
		};
		if (strDist != '') strDist = "<td></td>";

		if (TB3O.U[1] != '' && qDist != 0) {
			//var avRaceM = ['Romans', 'Teutons', 'Gauls'];
			switch (TB3O.U[1]) {
				case avRace[0]: arrRaces = [avRace[1], avRace[2]]; break;
				case avRace[1]: arrRaces = [avRace[0], avRace[2]]; break;
				case avRace[2]: arrRaces = [avRace[0], avRace[1]]; break;
			};
			aColspan = '';
			aAlign = '';
			if (addTTime == true) {aColspan = "colspan='2' "; aAlign = "class='center' ";};
			clockCell = "<td " + aColspan + aAlign + gIc["clock"] + "</td> ";
			if (addTTime == true) {
				//add the clock row
				iHTML += "<tr>" + clockCell;
				clockCell = '';
				if (bAR == true) iHTML += "<td colspan='6'</td>";
				iHTML += "</tr>";
			};
			if (addMTime == true) {
				//add the merchant row
				aTime = getMTime(qDist, TB3O.U[1]);
				aMalign = docDir[1];
				iHTML += "<tr>" + clockCell + "<td class='ld'>" + gIc["merchant"] + "</td><td class='mCol'> " + formatTime(aTime, 0) + " h</td>" + strDist;
				if (bAR == true) {
					aTime = getMTime(qDist, arrRaces[0]);
					iHTML += "<td class='ld'>" + gIc["merchant"] + "</td><td class='mCol'> " + formatTime(aTime, 0) + " h</td><td></td>";
					aTime = getMTime(qDist, arrRaces[1]);
					iHTML += "<td class='ld'>" + gIc["merchant"] + "</td><td class='mCol'> " + formatTime(aTime, 0) + " h</td>";
				};
				iHTML += "</tr>";
			};
			if (addTTime == true) {
				//add the troop rows
				var arX = getTroopsDetails(qDist, TB3O.U[1], true);
				var arY = getTroopsDetails(qDist, arrRaces[0], false);
				var arZ = getTroopsDetails(qDist, arrRaces[1], false);
				for (var iTT = 0; iTT < 10; iTT++) {
					imgNo = iTT + arX[3];
					aTime = getTTime(iTT, TB3O.U[1], arX);
					iHTML += "<tr><td class='ld'><img " + (TB3O.T35 == true ? 'class="unit u' + imgNo + '" src="' + xGIF + '"' : "src='" + gIc["u" + imgNo] + "'") + "></td><td>" + "&nbsp;" + formatTime(aTime, 0) + " h</td>" + strDist;
					if (bAR == true) {
						imgNo = iTT + arY[3];
						aTime = getTTime(iTT, arrRaces[0], arY);
						iHTML += "<td class='ld'><img " + (TB3O.T35 == true ? 'class="unit u' + imgNo + '" src="' + xGIF + '"' : "src='" + gIc["u" + imgNo] + "'") + "></td><td>" + "&nbsp;" + formatTime(aTime, 0) + " h</td><td>&nbsp;&nbsp;&nbsp</td>";
						imgNo = iTT + arZ[3];
						aTime = getTTime(iTT, arrRaces[1], arZ);
						iHTML += "<td class='ld'><img " + (TB3O.T35 == true ? 'class="unit u' + imgNo + '" src="' + xGIF + '"' : "src='" + gIc["u" + imgNo] + "'") + "></td><td>" + "&nbsp;" + formatTime(aTime, 0) + " h</td>";
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
		if (crtPage.match(/karte.php/) && y < 180) {x = 700; if (y < 180) y = 180;};
		ttD.style.top = y + "px";
		if (docDir[0] == 'left') {if (x + dW > TB3O.wW) x = x - dW;} else if (x < 0) x = 5;
		ttD.style.left = x + "px";
	};

	// Map functions
	function mapFunctions() {
		aTimeOut = getRndTime(1800);
		allArrows = $xf("//area[starts-with(@id, 'ma_n')]", 'l');
		for (var xi = 0; xi < allArrows.snapshotLength; xi++) {if (TB3O.origMap == true) allArrows.snapshotItem(xi).addEventListener('click', reloadMapFunctions, false);};

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
				if (TB3O.origMap == true) {area.addEventListener("mouseover", mevobj.mouseOverEvent, false); area.addEventListener("mouseout",  mevobj.mouseOutEvent, false);};
			};
		};

		//the functions needed for the map
		function mapScan() {
			j = 0;
			for (var i = 1; i < 50; i++) {
				if ($g('map_info_' + i).innerHTML == '') {
					k1 = (i - 1) % 7; k2 = Math.floor((49-i)/7);
					if ($g("i_" + k1 + "_" + k2).src.match(/\/(d|t)\d*.gif$/)) {area = $g("a_" + k1 + "_" + k2); mevobj = createMapInfoObjV2(area, i-1); setTimeout(mevobj.scan, j * 600 + getRndTime(600)); j++;};
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
				var aMS = $a(T('MAPSCAN'), [['id', 'mapscan'], ['href', jsVoid]]);
				aMS.addEventListener("click", mapScan, 0);
				trc = $r();
				tdc = $c("", [["colspan", '2']]);
				tdc.appendChild(aMS);
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
			removeElement($g('mapTableTT'));
			var aTb = $t([['id', 'mapTable'], ['sortCol', -1]]);
			var thead = $e("THEAD");
			var tbody = $e("TBODY");
			var aRow = $r();
			var cL = ['PLAYER', '8', 'ALDEAS', 'POPULATION', 'COORDS', 'MAPTBACTS'];
			var aTd;
			for (var i = 0; i < cL.length; i++){
				if (i < 4) {
					aTd = $c(T(cL[i]) + " (<img src='" + image["adn"] + "' width='8px' style='cursor:pointer;'><img src='" + image["aup"] + "' width='8px' style='cursor:pointer'>)", [['title', T('CKSORT')], ['class', 'tb3mthcp']]);
					switch(i){case 3: aTd.addEventListener("click", sortTable('mapTable', i, 'int'), 0); break; default: aTd.addEventListener("click", sortTable('mapTable', i), 0);};
				} else aTd = $c(T(cL[i]));
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
						aClass = '';
						if (aName == TB3O.U[0]) aClass = 'tb3mtcu';
						iRow.appendChild($c(aName, [['class', aClass]]));
						iRow.appendChild($c(cInfo.ally));
						if (TB3O.T35 == false) aHref = anArea.href; else aHref = "karte.php?" + cInfo.querystring;
						iRow.appendChild($c('<a href="' + aHref + '">' + cInfo.dname + '</a>'));
						iRow.appendChild($c(cInfo.ew, [['class', 'tb3mtcp']]));
						iRow.appendChild($c('<a href="' + aHref + '">' + cInfo.x + " | " + cInfo.y + '</a>'));
						iRow.appendChild($c('<a href="a2b.php?z=' + vID + '">' + gIc[dRPA] + '</a>' + '  ' + '<a href="build.php?z=' + vID + '&gid=17">' + gIc["r41"] + '</a>'));
						tbody.appendChild(iRow);
					};
				};
			};
			aTb.appendChild(tbody);
			if (boolMapTable == true) {
				var dxy = TB3O.O[90].split("|");
				var drUpg = $df(parseInt(aTb.width), dxy[0], dxy[1], " ", 'mapTable', "mapTableTT", false);
				drUpg.appendChild(aTb);
				adjustFloatDiv(aTb, 682, 'mapTable');
			};
		};

		function genMapCellInfoDivs() {
			var mapinfoX = $g("map_info");
			if (mapinfoX) {
				removeElement(mapinfoX);//remove the big DIV
			} else {
				for (var i = 1; i < 50; i++) {removeElement($g('map_info_' + i));};//remove all the small DIVs
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
			var soff = $g('soff');
			var soffG = $g('soffG');
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
			var arH = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('8'), T('SELL'), T('DEL')];
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
				bR.appendChild($c('<a href=' + jsVoid + ' onClick = "sell.m1.value=' + ventas[i][0] + '; sell.m2.value=' + ventas[i][1] + '; sell.rid1.value=' + ventas[i][2] + '; sell.rid2.value=' + ventas[i][3] + '; sell.d2.value=' + ventas[i][4] + '; sell.d1.checked=' + (ventas[i][5] == '1') + sally + '; sell.submit();"><img src="' + image["bOK"] + '" title="' + T('SELL') + '" alt="' + T('SELL') + '"></a>', [['class', 'soffc']]));

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

	function getdorf3SelectedVinfo(ad) {
		// newdid of the village
		vID = 0;
		retValue = [-1000, -1000];
		try {
			if (TB3O.T35 == false) {
				avLink = $xf("//a[@class='active_vl']", 'f', ad);
				newdid = getNewdidFromLink(avLink.href);
				aX = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td', 'f', ad);
				if (aX) {
					X = parseInt(aX.innerHTML.replace("(", ""));
					aY = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', ad);
					if (aY) {Y = parseInt(aY.innerHTML.replace(")", ""));vID = xy2id(X, Y);};
				};
			} else {
				if (TB3O.M35 == 2) {
					aV = $xf("//td[@class='dot hl']", 'f', ad);
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
					aV = $xf("//div[@id='vlist']//table[@class='vlist']//tr[@class='sel']//a", 'f', ad);
					vx = aV.parentNode.parentNode.cells[2].textContent.replace("(", "");
					vy = aV.parentNode.parentNode.cells[4].textContent.replace(")", "");
					newdid = getNewdidFromLink(aV.href);
				};
				vID = xy2id(vx, vy);
			};
		} catch(e) {newdid = actV.vNewdid; vID = actV.vID;};
		retValue[0] = vID;
		retValue[1] = newdid;
		return retValue;
	};

	function processVillage11() {
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
					if (bipT > crtTime) {b[xi] = "<img src='" + gIc["bau"] +  "' title='" + arrBiP[j].name + " " +arrBiP[j].txtLvl + " - " + formatTime((bipT - crtTime) / 1000, 0) + "'>"; xi += 1;};
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
						if (TB3O.T35 == false) xImg = '<img src="' + img("a/" + arrTM[j].type) + '" height="12px" width="12px">'; else xImg = gIc[arrTM[j].type];
						c[yi] = '<a href="build.php?newdid=' + vNewdid + '&gid=16" title="' + arrTM[j].no + ' - ' + formatTime((atT - crtTime) / 1000, 0) + '">' + xImg + "</a>";
						yi += 1;
					};
				};
				aCell.innerHTML = c.join(" ");
			} else aCell.innerHTML = '-';
		};
	};

	function processVillage119(ajaxResp) {
		var ad = ajaxNDV2(ajaxResp);
		var newdid = getdorf3SelectedVinfo(ad)[1];
		//Baracks,Big barracks,Stable,BigStable,Workshop,Residence/Palace troops training
		var a = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='5%']", 'f', ad);
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
						txC = ((pr > 60 && pr < 90) ? 'black' : TB3O.DFc[1]);
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

		for (var i = 0; i < 4; i++) {var aCell = $xf("//td[@id='aldea_s_2_" + (i + 2) + "']"); aCell.innerHTML = $ls(tPpH[i]); $at(aCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]);};
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
						if (cropPerSec > 0 ) ttFillG = (TB3O.VillageRes[vList[i].vID][yi + 4] - TB3O.VillageRes[vList[i].vID][yi]) / (cropPerSec); else ttFillG = - (TB3O.VillageRes[vList[i].vID][yi] / cropPerSec);
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

	function processVillage42(ajaxResp){
		var ad = ajaxNDV2(ajaxResp);
		var newdid = getdorf3SelectedVinfo(ad)[1];
		var a = $xf("//div[@id='" + dmid2 + "']//b", 'l', ad);
		var cpi = 0;
		var cpt = 0;
		if (a && a.snapshotLength > 0) {var intAdd = (TB3O.T35 == false ? 1 : 0); cpi = a.snapshotItem(intAdd).textContent; cpt = a.snapshotItem(intAdd + 1).textContent;};
		var aCell = $xf("//td[@id='aldea" + newdid + "_4_2" + "']");
		aCell.innerHTML = cpi;
		aCell = $xf("//td[@id='aldea_s_4_2']");
		aCell.innerHTML = cpt;
		updD3Bullets(newdid, 2);
	};

	//function provided by MarioCheng for checking the Townhall and the parties thrown.
	function processVillage43(ajaxResp){
		var ad = ajaxNDV2(ajaxResp);
		var newdid = getdorf3SelectedVinfo(ad)[1];
		var lvl = 0;
		var bTitle = $xf("//div[@id='" + dmid2 + "']//h1", 'f', ad);
		if (bTitle) {var aLvl = bTitle.textContent.split(" "); for (i = 0; i < aLvl.length; i++) {if (!isNaN(parseInt(aLvl[i]))) lvl = parseInt(aLvl[i]);};};
		var aCell = $xf("//td[@id='aldea" + newdid + "_4_3" + "']");
		var showLvl = "Lvl " + lvl;
		var partyTime = "";
		var a = $xf("//td[@width='25%']//span[@id='timer1'] | //table[@class='under_progress']//span[@id='timer1']", 'f', ad);
		if (a) {
			partyTime = a.textContent;
			aCell.innerHTML = "<span id='timeouta' title='" + showLvl + "'>" + partyTime + "</span>";
			aCell.innerHTML = "<a id='timeouta' title = '" + showLvl + "' href='build.php?newdid=" + newdid + "&gid=24'>" + partyTime + "</a>";
		} else {if (lvl > 0) {partyTime = "ג€¢"; aCell.innerHTML = "<a href='build.php?newdid=" + newdid + "&gid=24' title='" + showLvl + "'>" + partyTime + "</a>";};};
		updD3Bullets(newdid, 2);
	};

	function processVillage44(ajaxResp) {
		//get available senators/chiefs/settlers
		var ad = ajaxNDV2(ajaxResp);
		var vInfo = getdorf3SelectedVinfo(ad);
		var villageID = vInfo[0];
		var newdid = vInfo[1];

		if (villageID != 0) {
			var allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='troop_details']//a[contains(@href, " + villageID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r', ad);
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
							aCell.appendChild(dImg);
							aCell.innerHTML += " ";
						};
					};
				};
				if (aCell.innerHTML == "") aCell.innerHTML = "-";
			};
		};
		updD3Bullets(newdid, 2);
	};

	function processVillage45(ajaxResp){
		var ad = ajaxNDV2(ajaxResp);
		var newdid = getdorf3SelectedVinfo(ad)[1];
		var lvl = 0;
		var maxSlots = 0;
		var bTitle = $xf("//div[@id='" + dmid2 + "']//h1", 'f', ad);
		if (bTitle) {var aLvl = bTitle.textContent.split(" "); lvl = parseInt(aLvl[aLvl.length - 1]);};
		var cpbuilding = 0;
		var ocSlots = 0;
		if (lvl != 0) {var spBcookie = getGMcookieV2("specBuildings"); if (spBcookie && spBcookie[newdid]) cpbuilding = spBcookie[newdid][0];};

		var maxSlots = 0;
		maxSlots = (cpbuilding == 26)?((lvl==20)?3:(lvl>=15)?2:(lvl>=10)?1:0):(lvl==20)?2:(lvl>=10)?1:0;

		var expTable = $xf("//div[@id='" + dmid2 + "']//table[@id='expansion'] | //div[@id='" + dmid2 + "']//table[@class='tbg']", 'f', ad);
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
			if (sumCellValue == "-") {sumCell.innerHTML = slots;} else {sumCell.innerHTML = (parseInt(sumCellValue.split("/")[0]) + ocSlots - parseInt(oldSlots[0])) + "/" + (parseInt(sumCellValue.split("/")[1]) + maxSlots - parseInt(oldSlots[1]));};
		};

		updD3Bullets(newdid, 2);
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
					if (arrTT[j] != 0) {aCell.innerHTML = arrTT[j];	$at(aCell, [['style', 'font-size:8pt; color:black; text-align:center;']]);} else {aCell.innerHTML = "-"; $at(aCell, [['style', 'color:lightgrey; text-align:center;']]);};
					sumTT[j] += arrTT[j];
				};
			};
		};
		//sum of the troops
		for (var i = 2; i < 13; i++) {
			var aCell = $xf("//td[@id='aldea_s_5_" + i + "']");
			if (sumTT[i - 2] != 0) {aCell.innerHTML = sumTT[i - 2]; $at(aCell, [['style', 'font-size:8pt; color:black; text-align:center;']]);} else {aCell.innerHTML = "-"; $at(aCell, [['style', 'color:lightgrey; text-align:center;']]);};
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
				//end fix
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage11, updD3Bullets(newdid, 4));

				var updTroopsTraining = $g("d3Upd_1_3");
				var boolUpdTroopsTraining = false;
				if (updTroopsTraining) boolUpdTroopsTraining = updTroopsTraining.checked;

				if (boolUpdTroopsTraining) {
					//troops in training in the barracks
					var isAvBarracks = d3specBuildings[1];
					if (isAvBarracks != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=" + isAvBarracks, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the big barracks
					var isAvBigBarracks = d3specBuildings[2];
					if (isAvBigBarracks != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=" + isAvBigBarracks, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the stable
					var isAvStable = d3specBuildings[4];
					if (isAvStable != 0) ajaxRequest("build.php?newdid=" + newdid[i] + "&gid=" + isAvStable, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the big stable
					var isAvBigStable = d3specBuildings[5];
					if (isAvBigStable != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=" + isAvBigStable, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the workshop
					var isAvWorkshop = d3specBuildings[3];
					if (isAvWorkshop != 0) ajaxRequest("build.php?newdid=" + newdid[i] + "&gid=" + isAvWorkshop, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the residence/palace
					var cpbuilding = d3specBuildings[0];
					if (cpbuilding != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=" + cpbuilding, "GET", null, processVillage119, updD3Bullets(newdid, 4));
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
					if (boolupdPCperDay == true) ajaxRequest(pgAjaxRequest + "&s=2", "GET", null, processVillage42, updD3Bullets(newdid, 4));
					if (boolupdSlots == true) ajaxRequest(pgAjaxRequest + "&s=4", "GET", null, processVillage45, updD3Bullets(newdid, 4));
				} else {
					updD3Bullets(newdid, 5);
					var aCell = $xf("//td[@id='aldea" + newdid + "_4_5" + "']");
					aCell.innerHTML = "0/0";
				};

				//parties thrown in the village
				updParty = $g("d3Upd_4_3");
				boolupdParty = false;
				if (updParty) boolupdParty = updParty.checked;
				if (boolupdParty == true && d3specBuildings[7] != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=24", "GET", null, processVillage43, updD3Bullets(newdid, 4));
				updSenSettlers = $g("d3Upd_4_4");
				boolupdSenSettlers = false;
				if (updSenSettlers) boolupdSenSettlers = updSenSettlers.checked;
				if (boolupdSenSettlers == true) {ajaxRequest("build.php?newdid=" + newdid + "&gid=16&j&k", "GET", null, processVillage44, updD3Bullets(newdid, 4));};//available senators/chiefs/settlers

			} else if (xi == 5) ajaxRequest("build.php?newdid=" + newdid + "&gid=16&j&k", "GET", null, processVillage5, updD3Bullets(newdid, 4));//add "&j&k" => MarioCheng
		};
	};

	function crD35Tb(newPar, topRowText, secRowText) {
		delD3Tb();
		var aTb = $t([['id', 'dorf3table']]);
		var trTop = $r([["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(5);
		trTop.appendChild(updAllCell);

		var tdTop = $c(topRowText[4], [['class', 'tb3chnb'], ["colspan", "11"], ['style', 'font-weight:bold;']]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);
		var trTop2 = $r([['class', 'tb3rh']]);
		var tdTop2 = $c(secRowText[0], [['class', 'tb3chnb'], ['style', 'width:150px;']]);
		trTop2.appendChild(tdTop2);

		for (xi = 0; xi < 10; xi++) {
			var tdTop2 = $c("-", [["class", "c"]]);
			if (TB3O.U[1] != '') {var imgName = TB3O.T35 == false ? "src='" + gIc["u" + (xi + TB3O.U[7])] + "'" : 'class="unit u' + (xi + TB3O.U[7]) + '" src="' + xGIF + '"'; tdTop2 = $c("<img " + imgName + ">", [['class', 'tb3chnb']]);};
			trTop2.appendChild(tdTop2);
		};
		var tdTopHero = $c(gIc["hero"], [['class', 'tb3chnb']]);
		trTop2.appendChild(tdTopHero);
		aTb.appendChild(trTop2);
		rowsDorf3(aTb, 11, 5);
		sumRowDorf3(aTb, 11, 5);
		if (newPar) insertAfter(newPar, aTb);
		processVillage5();
	};

	function crD34Tb(newPar, topRowText, secRowText) {
		delD3Tb();
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
			} else if (xi == 0) $at(tdTop2, [['style', 'width:150px;']]);
			trTop2.appendChild(tdTop2);
		};

		aTb.appendChild(trTop2);
		rowsDorf3(aTb, 4, 4);
		sumRowDorf3(aTb, 4, 4);
		if (newPar) insertAfter(newPar, aTb);
	};

	function crD33Tb(newPar, topRowText, secRowText) {
		delD3Tb();
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
			if (xi == 0) $at(tdTop2, [['style', 'width:150px;']]);
			trTop2.appendChild(tdTop2);
		};
		aTb.appendChild(trTop2);
		rowsDorf3(aTb, 6, 3);
		if (newPar) insertAfter(newPar, aTb);
		processVillage3();
	};

	function crD32Tb(newPar, topRowText, secRowText, merchant) {
		delD3Tb();
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
			if (xi == 0) $at(tdTop2, [['style', 'width:150px;']]);
			trTop2.appendChild(tdTop2);
		};
		aTb.appendChild(trTop2);
		rowsDorf3(aTb, 6, 2, merchant);
		sumRowDorf3(aTb, 6, 2, merchant);
		if (newPar) insertAfter(newPar, aTb);
		processVillage2();
	};

	function crD31Tb(newPar, topRowText, secRowText, merchant) {
		delD3Tb();
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
				} else if (xi == 0) $at(tdTop2, [['style', 'width:150px;']]);
				trTop2.appendChild(tdTop2);
			};
		};
		aTb.appendChild(trTop2);
		rowsDorf3(aTb, secRowText.length - 1, 1, merchant);
		if (newPar) insertAfter(newPar, aTb);
		processVillage11();
	};

	function createUpdAllCell(xi) {
		tdUA = $c("", [['class', 'tb3chnb']]);
		if (xi == 4) {uAL = $a(gIc["reload_v"], [['href', jsVoid]]); uAL.addEventListener('click', function () {updateAllVillages(xi);}, false); tdUA.appendChild(uAL);};
		return tdUA;
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
		if (TB3O.plAc == true) {origParTop.innerHTML += ' | <a href="dorf3.php?s=6">' + T('ATTABLES') + '</a>'; return;};

		var origT = $xf("//div[@id='" + dmid2 + "']//table[@id='overview'] | //div[@id='" + dmid2 + "']//table[@class='tbg']");
		if (origT) origT.style.visibility = "hidden";

		if (origParTop) {
			var arrParTopLinks = origParTop.textContent.split("\n");
			var arrParTopText = new Array();
			for (xi = 0; xi < arrParTopLinks.length; xi++) {arrParTopText[xi] = arrParTopLinks[xi].replace("|", "");};
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
				case 0: nPelem.addEventListener("click", function() {crD31Tb(nP, arrParTopText, arrSecRow, arrM);}, 0); break;
				case 1: nPelem.addEventListener("click", function() {crD32Tb(nP, arrParTopText, arrSecRow, arrM);}, 0); break;
				case 2: nPelem.addEventListener("click", function() {crD33Tb(nP, arrParTopText, arrSecRow);}, 0); break;
				case 3: nPelem.addEventListener("click", function() {crD34Tb(nP, arrParTopText, arrSecRow);}, 0); break;
				case 4:	nPelem.addEventListener("click", function() {crD35Tb(nP, arrParTopText, arrSecRow);}, 0); break;
			};
			nP.appendChild(nPelem);
			if (xi < arrParTopText.length - 1) {var nPsep = $e("SPAN", " | "); nP.appendChild(nPsep);};
		};
		removeElement(origParTop);
		crD31Tb(nP, arrParTopText, arrSecRow, arrM);
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
										if (resourceCellNode != null) {$at(resourceCellNode, [['class', 'tb3cnb']]); resourceCellNode.innerHTML = T('EXTAV');};
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
		var rV = 1;
		var nRNPC = 0;
		var XY = bCost[parseInt(gid)][parseInt(crtLvl) + 1];
		if (XY) {for (var i = 0; i < 4; i++) {if (crtResUnits[i] < XY[i]) rV = 0; nRNPC += XY[i];}; if (rV == 0 && nRNPC <= crtResUnits[4]) rV = 2;};
		return rV;
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

		for (var i = 0; i < 4; i++) {if (maxRes <= parseInt(crtResUnits[i])) {maxRes = crtResUnits[i]; idMax = i;}; if (minRes >= parseInt(crtResUnits[i])) {minRes = crtResUnits[i]; idMin = i;};};
		try {
			offerTypeMax = document.getElementsByName("rid1");
			offerTypeMin = document.getElementsByName("rid2");
			if (offerTypeMax) {offerTypeMax[0].value = "" + (idMax + 1) + ""; };
			if (offerTypeMin) {offerTypeMin[0].value = "" + (idMin + 1) + ""; };
		} catch(e) {};

		if (!pS) {
			var aTb = $xf("//*[@id='sell']/tbody | //table[@class='f10']");
			if (aTb) {
				sRow1 = $r();
				sE1 = $c("", [['colspan', TB3O.M35 == 2 ? '3' : '4']]);
				ciS1 = $c("<input type='checkbox' id='soffG' value='1'></input>" + T('SVGL'));
				sRow1.appendChild(sE1);
				sRow1.appendChild(ciS1);
				aTb.appendChild(sRow1);
				sRow2 = $r();
				sE2 = $c("", [['colspan', TB3O.M35 == 2 ? '3' : '4']]);
				ciS2 = $c("<input type='checkbox' id='soff' value='1'></input>" + T('SAVE'));
				sRow2.appendChild(sE2);
				sRow2.appendChild(ciS2);
				aTb.appendChild(sRow2);
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
			//MarioCheng & DMaster wasted/exceeding resources
			crtWaste = maxC - (totalTransport - (totMerchants-1) * maxC);
			crtExceed = totalTransport - (maxM * maxC);
			mhText = "<b>" + mhMH + ": " + totMerchants + "/" + maxM + "<br>" + T('MAX') + ": " + maxM * maxC + "<br>";
			if (totMerchants > maxM) {mhColor = "red"; mhText += T('MTX') + ": "+ crtExceed;} else {mhColor = "darkgreen"; mhText += T('MTW') + ": "+ crtWaste;};
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
		for (xi = hHeader.length; xi > 0; xi--) {if (hHeader.charAt(xi) != " " && notgata) xLevel = hHeader.charAt(xi) + xLevel; else notgata = false;};
		hLevel = parseInt(xLevel);
		hPercent = parseInt(hoT.rows[hoT.rows.length - 1].cells[1].textContent);
		crtExp = (hLevel + 1) * 100;
		crtLevelExp = ((crtExp) / 2) * hLevel;
		nextLevelExp = crtLevelExp + crtExp;
		expGainedCrtLevel = (hLevel+1) * hPercent;
		expToLevelUp = (hLevel + 1) * (100 - hPercent);
		strLevel = hoT.rows[0].cells[0].childNodes[1].textContent;
		strLevel = strLevel.substr(0, strLevel.indexOf(hLevel) - 1);
		xRow = $r([['style', 'background-color:transparent;']]);
		hCell = $c("", [['colSpan', '5'], ['style', 'padding:1px 2px 1px 1px; margin:0px;']]);
		hTable = $t([['class', 'tb3tb'], ['style', 'border:1px solid silver; width:100%']]);
		aRow = $r();
		aRow.appendChild($c(strLevel + " " + hLevel, [['class', 'tb3cbt']]));
		aRow.appendChild($c("" + hPercent + "%", [['class', 'tb3cbt']]));
		aRow.appendChild($c("" + (100 - hPercent) + "%", [['class', 'tb3cbt']]));
		aRow.appendChild($c(strLevel + " " + (hLevel + 1), [['class', 'tb3cbt']]));
		bRow = $r();
		a1Cell = $c('', [['style', 'width:100px;'], ['class', 'tb3cbt']]);
		bRow.appendChild(a1Cell);
		b1Cell = $c('', [['colSpan', 2], ['style', 'padding:2px 2px 1px 2px; border:0px none transparent; margin:0px;']]);
		bRow.appendChild(b1Cell);
		graphBar = $t([['style', 'height:16px; width:100%; margin:0px; border:0px none transparent; border-collapse:collapse;']]);
		rX = $r([['style', 'border:0px none transparent; padding:0px; margin:0px;']]);
		x1Cell = $c('', [['style', 'width: ' + hPercent + '%; background-color:blue; padding:0px; border:0px none transparent; margin:0px;']]);
		x2Cell = $c('', [['style', 'width: ' + (100 - hPercent) + '%; background-color:lightgrey; padding:0px; border:0px none transparent; margin:0px']]);
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

	//fill in the NPC Merchant fields
	function fillinNPCfields(aURL) {
		var sumRes = parseInt(document.getElementById('org4').innerHTML);
		var rm1 = parseInt(getQueryParameters(aURL, 'r1'));
		var rm2 = parseInt(getQueryParameters(aURL, 'r2'));
		var rm3 = parseInt(getQueryParameters(aURL, 'r3'));
		var rm4 = parseInt(getQueryParameters(aURL, 'r4'));
		rm1_0 = rm1; rm2_0 = rm2; rm3_0 = rm3; rm4_0 = rm4;
		while(rm1_0 + rm2_0 + rm3_0 + rm4_0 + rm1 + rm2 + rm3 + rm4 < sumRes )  {
			rm1_0 += rm1;
			rm2_0 += rm2;
			rm3_0 += rm3;
			rm4_0 += rm4;
		}
		urlNPCback = addQueryParameter(NPCURL, 'bid', getQueryParameters(window.location.href,'bid'));
		urlNPCback = addQueryParameter(urlNPCback, 'r1', rm1_0);
		urlNPCback = addQueryParameter(urlNPCback, 'r2', rm2_0);
		urlNPCback = addQueryParameter(urlNPCback, 'r3', rm3_0);
		urlNPCback = addQueryParameter(urlNPCback, 'r4', rm4_0);

		document.getElementById("submitText").innerHTML += "<br><a href='"+urlNPCback+"'>Increse same Distribute resources :</a>";

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
		for (var i = 0; i < aX.snapshotLength; i++) {var tdX = aX.snapshotItem(i); $at(tdX, [['id', 'NPCTT_' + (i + 1)]]); getRequiredRes(tdX);};
	};

	function getRequiredRes(td) {
		var strTC = td.textContent.replace(/\n/g, "").replace(/\s/g, "");
		var iktC = strTC.indexOf(")");
		if (iktC == -1) iktC = strTC.indexOf("ֳ¯ֲ¼ג€°");
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
			if (strTime == '') // This line will detect if there is the Time Error
			{ strTime = arrX[arrX.length - 2]; } //Jacmer's Fix 
			var aTtT = new xTtT(getTroopIndexTitleFromImg(aImg)[0], necRes, strTime, arX);
			td.id.search(/(\d)/);
			var index = RegExp.$1;
			arrTtT[index - 1] = aTtT;
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
			//fr3nchlover
			neededTotal = (arrTrain && arrTrain[i] != 0 ? needResTotal * arrTrain[i] : needResTotal);
			//Get or create HTML container
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
				if (dtEstimated.getDate() == dtNow.getDate() && dtEstimated.getMonth() == dtNow.getMonth()) formatDtEstimated = ""; else formatDtEstimated = '&nbsp;' + formatDtEstimated;
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
					if (PpMt <= 0) {time_saved = null; break;};
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
			/*
			if (neededTotal > 0 && r >= 0 && (time_saved > 0 || time_saved == null) && TB3O.boolShowNPCLink) {
				urlNPCback = addQueryParameter(NPCURL, NPCResources, needRes.join(','));
				urlNPCback = addQueryParameter(urlNPCback, NPCbacklinkName, TB3O.BrT);
				container.innerHTML += '&nbsp;<a href="' + urlNPCback + '"> &raquo; NPC</a>';
			};
			*/			
			if (neededTotal > 0 && r >= 0 && (time_saved > 0 || time_saved == null) && TB3O.boolShowNPCLink) {
				//urlNPCback = addQueryParameter(NPCURL, NPCResources, needRes.join(','));
				//urlNPCback = addQueryParameter(urlNPCback, NPCbacklinkName, TB3O.BrT);
				var urlNPCback = addQueryParameter(NPCURL, 'bid', getQueryParameters(window.location.href,'id'));
				if(!getQueryParameters(window.location.href,'id'))  {urlNPCback = addQueryParameter(NPCURL, 'bid', getQueryParameters(window.location.href,'gid'));};
				for(var urli = 0; urli < needRes.length; urli++)  { urlNPCback = addQueryParameter(urlNPCback, 'r'+(urli+1), needRes[urli]);};
				container.innerHTML += '&nbsp;<a href="' + urlNPCback + '"> &raquo; NPC</a>';
			};
		};

		function clickOnNPCAssistant(i, maxY) {return function() {aI = $g("inputTroopNo_" + (i + 1)); if (aI) aI.value = maxY;};};
	};

	function getBootyFromTable(aTb) {
		retValue = [0,0,0,0,0];
		xi = 3;
		gata = false;
		while (xi < aTb.rows.length && !gata) {bootyCell = aTb.rows[xi].cells[1]; if (bootyCell.textContent.indexOf("|") != -1) gata = true; xi += 1;};
		if (gata) {
			resInfo = bootyCell;
			for (var xi = 0; xi < bootyCell.childNodes.length; xi++) {aChild = bootyCell.childNodes[xi]; if (aChild.className == "goods" || aChild.className == "res") resInfo = aChild;};
			aqBooty = resInfo.textContent.split("|");
			if (aqBooty.length > 1) {for (var i = 0; i < 4; i++) {retValue[i] = parseInt(aqBooty[i].replace(" ", "").replace(" ", "")); retValue[4] += retValue[i];};};
			bootyCell.innerHTML = getBootyCellInfo(retValue);
		};
		return retValue;
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
					if (allTables.snapshotLength == 0) {allTables = $xf("//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + actV.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r');};
				} else {allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='std troop_details']//a[contains(@href, " + actV.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r');};
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
							if (arrImg.length > 0 && arrImg[0].className == 'r4') {ccLabel = aTb.rows[aTb.rows.length - 1].cells[0].innerHTML; setGMcookie("tvtccLabel", ccLabel, false);};
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
					} else {ntCc = 1;};
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
				$at(rowCc.cells[0], [['style', 'background-color:#F3F3F3;']]);
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

	//---
	//Modified by Lux
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
	//---

	function addDiv() {
		div = $e("div");
		//ms99
		div.innerHTML = '<div id="OuterMsgPage" class="MsgPageOff"></div><div id="InnerMsgPage" class="MsgPageOff"></div>';
		document.body.insertBefore(div, document.body.firstChild);
	};

	function diplayElements(aType) {uTb = $g('upgTable'); mTb = $g('mapTable'); ttTb = $g('trooptimetable'); if (uTb) uTb.style.display = aType; if (mTb) mTb.style.display = aType;if (ttTb) ttTb.style.display = aType;};
	//---

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
		if (!aTb) {a = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='6%']"); if (a) aTb = a.parentNode.parentNode;};
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
			trT.appendChild($c(T('TOTAL'), [['class', 'tb3chnb'], ["colspan", "2"]]));
			trT.appendChild($c(totP, [['class', 'tb3chnb'], ['style', 'text-align:center']]));
			trT.appendChild($c(totV, [['class', 'tb3chnb'], ['style', 'text-align:center']]));
			if (boolIsMyAlly) trT.appendChild($c("", [['class', 'tb3ch']]));
			aTb.appendChild(trT);

			//average population per member of aliance
			trAv = $r([['class', 'tb3r']]);
			trAv.appendChild($c(T('AVPPP'), [['class', 'tb3chnb'], ["colspan", "2"]]));
			trAv.appendChild($c(popPerPlayer, [['class', 'tb3chnb'], ["colspan", "2"], ['style', 'text-align:center']]));
			if (boolIsMyAlly) trAv.appendChild($c("", [['class', 'tb3chnb']]));
			aTb.appendChild(trAv);

			//average population per village
			trAv = $r([['class', 'tb3r']]);
			trAv.appendChild($c(T('AVPPV'), [['class', 'tb3chnb'], ["colspan", "2"]]));
			trAv.appendChild($c(Math.round(totP/totV), [['class', 'tb3chnb'], ["colspan", "2"], ['style', 'text-align:center']]));
			if (boolIsMyAlly) trAv.appendChild($c("", [['class', 'tb3chnb']]));
			aTb.appendChild(trAv);

			//number of bullets by type
			if (boolMyAlly) {
				rowBullets = $r([['class', 'tb3r']]);
				cellBullets = $c("", [['class', 'tb3chnb'], ['colspan', '5'], ['style', 'text-align:center']]);
				cBiHTML = "";
				addSpacer = " | ";
				for (var j = 0; j < 5; j++) {if (totalBullets[j][0] > 0) cBiHTML += "<img class='online" + (j + 1) + "' src='" + gIc["b" + (j+1)] + "' title='" + totalBullets[j][1] + "' alt='" + totalBullets[j][1] + "'> = &nbsp;" + totalBullets[j][0] + addSpacer + " ";};
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
			//log(3, "csp = " + csp);
			var aCell = $c(T('TOTTRTR') + " & " + gIc["r5"], [['class', 'tb3chnb'], ["colspan", csp], ['style', 'text-align:center;']]);
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
				if (gata > -1) arrTiT[gata].intNo += intNo; else {var aTiT = new yTiT(parseInt(aX[0]), parseInt(intNo), aX[1]); arrTiT[arrTiT.length] = aTiT;};
			};
			var TotCropCons = 0;
			var imgName;
			for (var xi = 0; xi < arrTiT.length; xi++) {
				TotCropCons += uc[arrTiT[xi].tType][9] * arrTiT[xi].intNo;//calculate the total crop consumtion for troops being trained		
				aRow = $r([['class', 'tb3rnb']]);
				if (TB3O.T35 != false) imgName = 'class="unit u' + arrTiT[xi].tType + '" src="' + xGIF + '"'; else imgName = "src='" + gIc["u" + arrTiT[xi].tType] + "'";
				aRow.appendChild($c("<img " + imgName + ">", [['style', 'background-color:' + TB3O.DFc[1] + '; border:0px none transparent;']]));
				aRow.appendChild($c(arrTiT[xi].strName, [['style', 'background-color:' + TB3O.DFc[1] + '; border:0px none transparent; font-size:8pt;']]));
				aRow.appendChild($c(arrTiT[xi].intNo, [['style', 'background-color:' + TB3O.DFc[1] + '; text-align:center; border:0px none transparent;']]));
				titTb.appendChild(aRow);
			};
			//crop consumption for training troops-matteo466
			var cRow = $r([['class', 'tb3rnb']]);
			cRow.appendChild($c(gIc["r5"] ,[["colspan", csp - 1], ['style', 'background-color:' + TB3O.DFc[1] + '; border:0px none transparent;']]));
			cRow.appendChild($c(TotCropCons, [['style', 'background-color:' + TB3O.DFc[1] + '; text-align:center; border:0px none transparent;']]));
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

	function calculateResourceTime(need, pW, aLnk, cpB, ccB) {
		var maxTime = 0;
		var boolTb = false;
		var aTb = $t([['class', 'rNt'], ['style', 'width:' + pW + '%;']]);

		for (var i = 0; i < 4; i++){
			restante = parseInt(need[i]) - crtResUnits[i];
			var sfz = restante > 100000 ? 'font-size:6pt;' : '';
			if (restante > 0) {
				tiempo = -1;
				if (prodPerHour[i] != 0) tiempo = Math.round(restante / (prodPerHour[i] / 3600));
				if (tiempo < 0 || capacity[i] - parseInt(need[i]) < 0) {
					maxTime = 'Infinity';
					aCell = $c(gIc["r" + (i + 1)], [['class', 'center']]);
					bCell = $c(' ' + restante + ' ', [['id', 'timeout' + i], ['style', sfz]]);
					cCell = $c(' ' + T('NEVER') + ' ', [['style', sfz]]);
					boolTb = true;
				} else {
					if (tiempo > maxTime && maxTime !='Infinity') maxTime = tiempo;
					tiempo = formatTime(tiempo + 5, 0);
					aCell = $c(gIc["r" + (i + 1)], [['class', 'center']]);
					bCell = $c(' ' + restante +' ', [['id', 'timeout' + i], ['style', sfz]]);
					cCell = $c(' ' + tiempo + ' ', [['id', 'timeouta'], ['style', sfz]]);
					boolTb = true;
				};
				if (boolTb) {
					aRow = $r();
					aRow.appendChild(aCell);
					aRow.appendChild(bCell);
					aRow.appendChild(cCell);
					aTb.appendChild(aRow);
					aCell = null; bCell = null; cCell = null;
				};
			};
		};

		if (maxTime == 'Infinity'){
			xRow = $r();
			xRow.appendChild($c(T('LISTO'), [['colspan' ,"2"]]));
			xRow.appendChild($c(T('NEVER')));
			aTb.appendChild(xRow);
			boolTb = true;
		} else if (maxTime > 0) {
			tiempo2 = formatTime(maxTime + 5, 0); // a 5 seconds addition to compensate differences between JS timer and server
			aDate = new Date();
			aDate.setTime(aDate.getTime() + (maxTime * 1000));
			xRow = $r();
			txtDate = computeTextTime(aDate);
			xRow.appendChild($c(T('LISTO'), [['colspan', '2']]));
			xRow.appendChild($c(txtDate));
			aTb.appendChild(xRow);

			if (TB3O.O[36] == '1') {
				//added by Velonis Petros - start of addition - the until then row
				uthen = new Array(4);//obtained until the max time
				//residue row
				residue = new Array(4);//obtained until the max time
				for (var i = 0; i < 4; i++) {uthen[i] = crtResUnits[i] + Math.round(maxTime*prodPerHour[i]/3600); residue[i] = uthen[i] - parseInt(need[i]);};
				uiHTML = createCRrows(T('RESOURCES') + " " + txtDate, uthen);
				riHTML = createCRrows(T('RESIDUE') + txtDate, residue);
				aTb.innerHTML += uiHTML;
				aTb.innerHTML += riHTML;
				//end of Velonis' addition
			};
			boolTb = true;
		};

		if (aLnk && boolTb == false) {
			var aRow = $r();
			aRow.appendChild($c('<a href="' + aLnk + '">' + T('EXTAV') + '</a>', [['class', 'center']]));
			aTb.appendChild(aRow);
			boolTb = true;
		};
		if (cpB && TB3O.O[34] == '1') {aTb.appendChild(getCpcRow(cpB, "cp")); boolTb = true;};
		if (ccB && TB3O.O[35] == '1') {aTb.appendChild(getCpcRow(ccB, "cc")); boolTb = true;};

		if (boolTb == true) return aTb; else return null;

		function getCpcRow(x, y) {
			var cxR = $r();
			switch (y) {case 'cp': strIn = T('CPPERDAY'); tColor = 'color:blue;'; break; case 'cc': strIn = gIc["r5"]; tColor = 'color:red;'; break;};
			cxR.appendChild($c(strIn + ": " + x[0] + " " + (docDir[0] == 'right' ? 'ג†�' : 'ג†’') + " " + x[1], [['class', 'center'], ['colspan', '3'], ['style', tColor]]));
			return cxR;
		};

		//added by Velonis Petros
		function createCRrows(aTitle, aV) {
			var cTb = $t();
			var xR = $r();
			xR.appendChild($c(aTitle, [['style', 'border-top:1px solid silver;'], ['colspan', '3']]));
			cTb.appendChild(xR);
			for (var i = 0; i < 4; i++) {
				var yR = $r();
				yR.appendChild($c(gIc["r" + (i + 1)], [['class', 'center']]));
				yR.appendChild($c(aV[i], [['colspan', '2']]));
				cTb.appendChild(yR);
			};
			return cTb.innerHTML;
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
			var aCell = $c("", [['id', 'gTtT'], ['colspan', csp]]);
			aRow = $r([['id', 'aRselecttraintroops']]);
			aRow.appendChild(aCell);
			aRow.appendChild($c(sT, [['id', 'sTtT']]));
			aRow.appendChild($c(""));
			aRow.appendChild($c("", [['id', 'tTtT']]));
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
		if (dCell) dCell.appendChild(tTb);
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
		if (vID == actV.vID) {for (var i = 0; i < 5; i++) {TB3O.VillageRes[vID][i + 1] = prodPerHour[i];};};
		if (vPop == -1) {for (var i = 0; i < 4; i++) {TB3O.VillageRes[vID][i + 6] = crtResUnits[i]; TB3O.VillageRes[vID][i + 10] = capacity[i];};};
		setGMcookieV2("VillageRes", TB3O.VillageRes[vID], vID);
	};

	function addPlayerStatistics() {
		var pName = getPlayerName();
		var uTb = $xf("//*[@id='profile'] | //div[@id='" + dmid2 + "']//table[@class='tbg']");
		if (uTb) uTb.rows[0].cells[0].innerHTML = uTb.rows[0].cells[0].innerHTML.replace(pName, "") +  "<a href='" + crtPage + "'>" + pName + "</a>";
		uTb = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg'][2]");
		if (!uTb) uTb = $g("villages");
		if (uTb) {
			var totV = uTb.rows.length - 2;
			var boolUpdate = crtPage.indexOf(spLnk) != -1;
			var totP = parsePlayerTable(uTb, boolUpdate);
			var csp = uTb.rows[2].cells.length - 2;
			//total row (population, villages)
			var trT = $r([['class', 'tb3rnb']]);
			trT.appendChild($c(T('TOTAL'), [['class', 'tb3chnb']]));
			trT.appendChild($c(totP, [['class', 'tb3chnb'], ['style', 'text-align:center;']]));
			trT.appendChild($c("", [['class', 'tb3chnb'], ['colspan', csp]]));
			uTb.appendChild(trT);
			//average population per village
			var trAv = $r([['class', 'tb3rnb']]);
			trAv.appendChild($c(T('AVPPV'), [['class', 'tb3chnb']]));
			trAv.appendChild($c(Math.round(totP/totV), [['class', 'tb3chnb'], ['style', 'text-align:center;']]));
			trAv.appendChild($c("", [['class', 'tb3chnb'], ['colspan', csp]]));
			uTb.appendChild(trAv);
			//move the "(capital)" string to the same line as the name of the capital
			var aSpan = getCapitalInfo();
			if (aSpan) {aSpan.style.cssFloat = ''; aSpan.style.display = ''; if (crtPage.indexOf(spLnk) != -1) setCapitalInfo(aSpan);};//save capital info
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
			if (tInfo[1] != "") {aRow1 = $r(); aRow1.appendChild($c(tInfo[1], [['style', 'text-align:center; font-size:8pt; font-weight:bold;'], ['colspan', '6']])); aTb.appendChild(aRow1);};
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
			if (tInfo[0] < 31) {tSpeed = uc[tInfo[0]][8]; if (TB3O.speed == true) tSpeed = tSpeed * 2;};
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
		var aT = $g('tb_tooltip');
		if (!aT) aT = createTooltip();
		var tImg, tInfo, xR;
		for (var i = 0; i < arImg.length; i++) {
			tImg = arImg[i];
			tInfo = getTroopIndexTitleFromImg(tImg);
			if (tInfo[0] > 0 && tInfo[0] < 51) {
				if (tInfo[1] == '') {
					//for the dorf1.php page where there is no title attribute to the image
					xR = tImg.parentNode;
					if (xR) {if (xR.getAttribute("href")) {xR = xR.parentNode; if (xR) xR = xR.parentNode;} else xR = xR.parentNode; if (xR) {try {tCell = xR.cells[2]; if (tCell) tInfo[1] = tCell.textContent;} catch(e) {};};};
				};
				tImg.removeAttribute('title');
				tImg.addEventListener("mouseover", createTroopInfoTooltip(aT, tInfo), 0);
				tImg.addEventListener("mouseout", function() {aT.style.display = 'none';}, 0);
			};
		};
		arImg = null; tImg = null; tInfo = null; xR = null;
	};

	function addSelectAllCheckbox(intRows, mrTable) {
		//check for the "s10" element to avoid double checkbox
		if (!$g("s10")) {
			//selectAll
			var sAC = mrTable.rows[intRows - 1].cells[0];
			var sACS = sAC.getAttribute("colspan");
			if (sACS) {
				if (sACS == "2") {
					$at(sAC, [['colspan', '1']]);
					sAC.removeAttribute('class');
					if (TB3O.T35 == false) {bCell = $c(sAC.innerHTML, [['style', 'text-align:' + docDir[0] + ';']]);} else {bCell = $e("TH", sAC.innerHTML); $at(bCell, [['class', 'buttons']]);};
					insertAfter(sAC, bCell);
				};
			};
			sAC.innerHTML = '<input id="s10" name="s10" onclick="Allmsg(this.form);" style="vertical-align:bottom;" type="checkbox">';
			//now append the archive button if necessary
			if (!TB3O.plAc) {
				var bRow = mrTable.rows[intRows - 1].cells[1];
				if (bRow) {
					var bRiHTML = bRow.innerHTML;
					if (TB3O.T35 == false) {
						if (bRiHTML.toUpperCase().indexOf("ARCHIVE") == -1) bRow.innerHTML += '<input class="std" type="submit" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					} else {
						if (bRiHTML.toUpperCase().indexOf("BTN_ARCHIV") == -1) bRow.innerHTML += '&nbsp;&nbsp;<input id="btn_archiv" class="dynamic_img" type="image" src="' + xGIF + '" alt="' + T('ARCHIVE') + '" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					};
				};
			};
			sAC = null; sACS = null; bRow = null; bRiHTML = null;
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
		var bTitle = null;
		for (var i = 0; i < iMax; i++) {
			bTitle = arA[i].firstChild.nodeValue;
			bCell = $c(bTitle, [['class', 'cc']]);
			bRow.appendChild(bCell);
			cLink = $a("", [['href', jsVoid]]);
			cLink.appendChild($img([['src', image["bDel"]], ['title', T('DEL') + " " + bTitle]]));
			cLink.addEventListener('click', delete10Reports(i, arA), false);
			cCell = $c("");
			cCell.appendChild(cLink);
			cRow.appendChild(cCell);
		};
		delTb.appendChild(tRow);
		delTb.appendChild(bRow);
		delTb.appendChild(cRow);
		iMax = null; tRow = null;; tCell = null; bRow = null; cRow = null; bTitle = null;
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
			if (document.evaluate) {arrInp = $xf("//textarea[@id='igm']", 'l'); for (var i = 0; i < arrInp.snapshotLength; i++) {tx = arrInp.snapshotItem(i); tx.addEventListener("keydown", sendMessage, 0);};};
		} else if (crtPage.indexOf("berichte.php") != -1) {
			genLink = "berichte.php?s=";
			archLink = ' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>';
		};
		if ($g("adressbuch") || $g("adbook")) return;
		topMenu = $xf("//p[@class='txt_menue']");
		if (!topMenu) topMenu = $g('textmenu');
		if (document.evaluate) {
			arrInp = $xf("//textarea[@id='igm']", 'l');
			for (var i = 0; i < arrInp.snapshotLength; i++) {tx = arrInp.snapshotItem(i); tx.addEventListener("keydown", sendMessage, 0);};
			navLinks = $xf("//div[@id='" + dmid2 + "']//a[contains(@href, 'berichte.php?s=')] | //div[@id='" + dmid2 + "']//a[contains(@href, 'nachrichten.php?s=')]", 'l');
			if (navLinks.snapshotLength > 0) document.addEventListener("keydown", navToPage, 0);
		};
		//add the Archive option to the menu if PLUS not available and if the Archive link is not already present (added by other scripts)
		if (!TB3O.plAc) {
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
				if (lastDiv) {var newPar = $e("P", ""); insertAfter(lastDiv.lastChild, newPar); newPar.appendChild(delTb);};
			};
		};
		if (crtPage.indexOf("?newdid=") != -1 && crtPage.indexOf("&id=") != -1) return;
		//general variables needed for this function
		var mrTable;
		mrTable = $g("overview");
		if (!mrTable) {mrTable = $xf("//table[@class='reports std'] | //table[@class='tbg']"); mrTable.id = "overview";};
		addSelectAllCheckbox(mrTable.rows.length, mrTable);
		deleteReports();
		//get the number of pages to preload from server
		intMRP = parseInt(TB3O.O[59]) + 1;
		if (intMRP > 5) intMRP = 4;
		var pageNo1 = crtPage.indexOf("?s=");
		var intPage = 0;
		if (pageNo1 != -1) {var pageNoS1 = crtPage.substring(pageNo1 + 3); intPage = Math.round(parseInt(pageNoS1) / 10);};
		if (intMRP > 1) {
			for (var i = 1; i < intMRP; i++) {setTimeout(createMrPreloadFunc(i + intPage), getRndTime(i * 498));};
			var X2 = (intMRP + intPage) * 10;
			var X1 = (intPage - intMRP) * 10;
			var addLink = (crtPage.indexOf("t=") != -1 ? "&" + crtPage.substr(crtPage.indexOf("t="),3) : "");
			var tdbfLinks = mrTable.rows[mrTable.rows.length - 1].cells[2];
			if (tdbfLinks) {
				//var aSpan;
				if (X1 < 0) {var aSpan = $e("SPAN", "ֲ«");$at(aSpan, [['class', 'c'], ["style", "font-weight:bold;"]]);} else var aSpan = $a("ֲ« ", [['style', 'font-weigth:bold'], ['href', genLink + X1 + addLink]]);
				var fwLink = $a("ֲ»&nbsp;", [['style', 'font-weight:bold'], ['href', genLink + X2 + addLink]]);
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			};
			aSpan = null;
		};
		//code provided by rtellezi for sending message by pressing CTRL+ENTER
		//modified by ms99 to work only on the form action='nachrichten.php' and form name='msg'
		function sendMessage(event) {if (event.keyCode == 13 && event.ctrlKey) {var mF = $xf("//form[@name='msg']"); if (mF) mF.submit();}; return;};

		function navToPage(event) {
			var evCode = event.keyCode;
			if (evCode == 37) {
				for (var i = 0; i < navLinks.snapshotLength; i++) {if (navLinks.snapshotItem(i).textContent == "ֲ«") location.href = navLinks.snapshotItem(i).href; break;};
			} else if (evCode == 39) {
				for (var i = 0; i < navLinks.snapshotLength; i++) {if (navLinks.snapshotItem(i).textContent == "ֲ»") location.href = navLinks.snapshotItem(i).href; break;};
			};
			evCode = null;
			return;
		};

		function createMrPreloadFunc(page) {var aX = (crtPage.indexOf("t=") != -1 ? "&" + crtPage.substr(crtPage.indexOf("t="), 3) : ""); return function() {ajaxRequest(genLink + (page * 10) + aX, "GET", null, processMrPage, dummy);};};

		function processMrPage(ajaxResp) {
			var ad = ajaxNDV2(ajaxResp);
			var aTb = $xf("//table[@id='overview'] | //table[@class='reports std'] | //table[@class='tbg']", 'f', ad);
			if (aTb) {
				var maxR = aTb.rows.length;
				var mrTb = $g("overview");
				var mrFoot = mrTb.tFoot;
				if (!mrFoot) {var lastRow = mrTb.rows[mrTb.rows.length - 1]; removeElement(lastRow);};
				if (maxR > 3) {
					xBody = mrTb.tBodies[0];
					var oFrg = null;
					if (xBody) oFrg = document.createDocumentFragment();
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
									if (aNode.href.search(/spieler.php\?uid=(\d+$)/) > 0) {uid = RegExp.$1; insertUserLinks(aNode, uid, aNode.textContent);};
								};
								if (TB3O.O[60] == "1" && (iHTML.indexOf("nachrichten.php?id=") != -1 || iHTML.indexOf("berichte.php?id=") != -1)) addMrInPopup(xCell.childNodes[0]);
								if (yi == 1) {
									$at(xCell, [['style', 'text-align:' + docDir[0] + ';']]);
									if (TB3O.TB35 == false) $at(xCell, [['class', 's7']]);
								};
								xRow.appendChild(xCell);
							};
							if (oFrg) oFrg.appendChild(xRow); else mrTb.appendChild(xRow);
						};
					};
					if (oFrg) xBody.appendChild(oFrg);
				};
				if (!mrFoot) mrTb.appendChild(lastRow);
			};
		};
	};

	function deleteReports() {
		var bDR = getGMcookie("reportsDeleteAll", false);
		if (bDR != '1') return;
		if (getGMcookie("reportsPageToDelete", false) == '') return;
		if (crtPage.indexOf("berichte.php") != -1) {
			pauseScript(500);
			allCB = $xf("//input[@type='checkbox' and not (@id)]", 'l');
			btnSa = document.getElementsByName("s10");
			bDel = document.getElementsByName("del");
			if (!bDel) bDel = $g("btn_delete");
			if (allCB.snapshotLength > 0 && btnSa && bDel) {
				//now delete the reports without checking the correct address of the reports page
				btnSa[0].click();
				pauseScript(500);
				bDel[0].click();
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
		t['MERCHANTS'] = getGMcookie("merchantsName", false);
		if (t['MERCHANTS'] == "false") t['MERCHANTS'] = '';
		mCc = null;
	};

	function getStatisticsMenu() {
		var arS = new Array();
		var tM = $xf("//div[@id='" + dmid2 + "']//p//a | //div[@id='" + dmid2 + "']//div[@id='textmenu']//a | //p[@class='txt_menue']//a", 'l');
		var im = 0;
		var aLnk, aX;
		if (tM.snapshotLength > 0) {
			for (var xi = 0; xi < tM.snapshotLength; xi++) {
				arS[0] = tM.snapshotItem(xi).text;
				aLnk = tM.snapshotItem(xi).href;
				arS[1] = aLnk.substring(aLnk.lastIndexOf("/"));
				aX = arS[1].split("=");
				im = (aX.length > 1 ? parseInt(aX[1]) : 1);
				setGMcookieV2('statistics', arS, im);
			};
		};
		tM = $xf("//div[@class='sub']//a | //div[@id='submenu']//a", 'l');
		if (tM.snapshotLength > 0) {
			for (var i = 0; i < tM.snapshotLength; i++) {
				arS[0] = tM.snapshotItem(i).title;
				aLnk = tM.snapshotItem(i).href;
				arS[1] = aLnk.substring(aLnk.lastIndexOf("/"));
				im = parseInt(arS[1].split("=")[1]);
				setGMcookieV2('statistics', arS, im);
			};
		};
		aLnk = null; arS = null; aX = null; tM = null;
	};

	function showSearchBar() {
		if (TB3O.O[32] != "1") return;
		sbc = getGMcookieV2('statistics');
		if (!sbc || !sbc[1]) return;
		var aForm = createSearchForm(sbc);
		if (TB3O.O[33] == '1') {
			if (TB3O.O[74] == '0') aForm.style.display = 'none';
			var xy = TB3O.O[79].split("|");
			TB3O.nTASb = $df(300, xy[0], xy[1], "?", "searchbar", "searchbarTT", true);
			TB3O.nTASb.appendChild(aForm);
		} else $g(dlright1).insertBefore(aForm, $g(dlright1).firstChild);
	};

	function createSearchForm(sbc) {
		var aSF = $e("FORM");
		$at(aSF, [['id', 'searchform'], ['action', 'statistiken.php?id=' + TB3O.O[83]], ['method', 'POST'], ['style', 'padding:10px; border:1px solid #C0C0C0; width:277px;']]);
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
		if (TB3O.O[33] == '1') aSF.appendChild(aPar);
		aSF.appendChild(i1);
		aSF.appendChild(i2);
		aSF.appendChild(s1);
		aSF.appendChild(i3);
		return aSF;
		
		function iSS(opt) {return opt == parseInt(TB3O.O[83]) ? true : false;};
		function setSearchBarOption() {
			var searchType = $g("searchtype").value;
			TB3O.O[83] = '' + searchType;
			setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');
			var i1 = $g("searchopt");
			if (i1) i1.value = searchType;
			var aSF = $g("searchform");
			if (aSF && TB3O.T35 == true) aSF.action = 'statistiken.php?id=' + searchType;
			i1 = null; aSF = null;
		};
	};

	function setGMcookieV2(aName, aValue, newdid) {
		if (newdid == 0 || !TB3O.UserID || parseInt(TB3O.UserID) == 0) return;
		var nC = composeGMcookieNameV2(aName);
		var cV = getGMcookieV2(aName);
		if (cV == 'false' | cV == false) cV = {};
		cV[newdid] = aValue;
		if (aValue) GM_setValue(nC, uneval(cV)); else GM_setValue(nC, false);
	};

	function getArrBiP() {
		var arrBiP = new Array();
		var rV = null;	
		var divName = "building_contract";
		var dlB = $g(divName);
		var dEnd, tdD, tdDS;
		if (!dlB) {divName = divName = "building_contract2"; dlB = $g(divName); if (!dlB) {divName = "lbau1"; dlB = $g(divName); if (!dlB) {divName = "lbau2"; dlB = $g(divName);};};};
		if (dlB) {
			var BiPtb = $xf("//div[@id='" + divName + "']//table | //div[@id='" + dmid1 + "']//table[@id='" + divName + "']");
			for (xi = 0; xi < BiPtb.rows.length; xi++) {
				if (BiPtb.rows[xi].cells.length > 1)	{
					tdD = BiPtb.rows[xi].cells[2];
					tdDS = tdD.getElementsByTagName("SPAN")[0];
					dEnd = new Date();
					dEnd.setTime(dEnd.getTime() + toSeconds(tdDS.textContent) * 1000);
					arrBiP[arrBiP.length] = new xBiP(BiPtb.rows[xi].cells[1].textContent.split(" ("), dEnd.getTime());
				};
			};
			rV = arrBiP;
		};
		setGMcookieV2('BiP', arrBiP, actV.vNewdid);
		arrBiP = null; divName = null; dlB = null; BiPtb = null; dEnd = null; tdD = null; tdDS = null;
		return rV;
	};
	
	function fillinwarsim() {
		if (TB3O.O[55] != '1') return;
		var aTb = $xf("//table[@id='attacker'] | //table[@class='fill_in']");
		if (!aTb) return;
		TB3O.hOffBonus = getGMcookie("heroV", false);
		if (TB3O.hOffBonus == "false") {setGMcookie("heroV", "0", false); TB3O.hOffBonus = 0;};
		tTc = getGMcookieV2("Troops");
		if (tTc && tTc[actV.vNewdid]) eT = tTc[actV.vNewdid]; else return;
		var aI = aTb.getElementsByTagName("INPUT");
		if (aI.length > 0) {
			j = 1;
			for (var i = 0; i < aI.length; i++) {
				if (aI[i].name == "a1_" + j) {
					//only the troop number input fields
					aI[i].value = (eT[j - 1] > 0 ? eT[j - 1] : "");
					j += 1;
				} else if (aI[i].name == "ew1") aI[i].value = TB3O.AVP; else if (aI[i].name = "h_off_bonus" & aI[i].value != "") aI[i].value = TB3O.hOffBonus;
			};
		};
		aTb = null; aI = null;
	};
	
	//ֲ© Copyright 2007 Richard Laffers (http://userscripts.org/scripts/show/35277)
	//Start of Drag-n-drop
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;

	function mouseCoords(ev) {return {x:ev.pageX, y:ev.pageY};};
	function getMouseOffset(target, ev){var docPos = getPosition(target); var mousePos = mouseCoords(ev); return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};};
	function mouseDown(ev){var target = ev.target; iMouseDown = true; if (target.getAttribute('DragObj')) return false;};

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
				case "resbarTT": TB3O.O[75] = strXY; break;
				case "userbookmarksTT": TB3O.O[76] = strXY; break;
				case "noteblockTT": TB3O.O[77] = strXY; break;
				case "vl2tableTT": TB3O.O[78] = strXY; break;
				case "searchbarTT": TB3O.O[79] = strXY; break;
				case "resupgTT": TB3O.O[88] = strXY; break;
				case "bupgTT": TB3O.O[89] = strXY; break;
				case "mapTableTT": TB3O.O[90] = strXY; break;
			};
			setGMcookieV2('TB3Setup', TB3O.O, 'SETUP');
		};
		dragObject = null;
		iMouseDown = false;
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
		var aD = $xf("//div[starts-with(@id, 'ltime')]/br");
		if (aD) {
			var imgDN = $xf("//img[starts-with(@class, 'time_of_day')]");
			if (imgDN) {var nimgDN = imgDN.cloneNode(true); imgDN.parentNode.removeChild(imgDN); nimgDN.style.top = '5px';};
			TB3O.TBEndTime = new Date().getTime();
			var tt = $e('SPAN', '');
			if (nimgDN) tt.appendChild(nimgDN);
			tt.appendChild($e("TEXTNODE", " | "));
			tt.appendChild($a(TB3O.shN, [['href', TB3O.usoA], ['target', '_blank'], ['title', T('SCRPURL')], ['style', 'font-size:8pt; font-weight:bold; color:#FF5e5e']]));								    
			tt.appendChild($e("TEXTNODE", "&nbsp;(v"));
			var tu = $a(TB3O.version, [['href', jsVoid], ['title', T('CHKSCRV')], ['style', 'font-size:8pt; font-weight:bold; color:#FF5e5e']]);
			tu.addEventListener('click', function() {updScript()}, false);
			tt.appendChild(tu);
			tt.appendChild($e("TEXTNODE", ') time: <b>' + TB3O.TBTRT() + '</b> ms  '));
			if (TB3O.T35 == false || TB3O.M35 != 2) tt.appendChild($e("TEXTNODE", ' | (' + (TB3O.T35 == false ? "T3" : "T35") + "-" + TB3O.M35 + ")")); //info GV
			$at(tt, [['style', 'z-index:2000; color:#FFFFFF; width:450px']]);
			if(crtPage.indexOf("vip") != -1){$at(tt, [['href', jsVoid], ['title', T('CHKSCRV')],['style', 'z-index:2000; color:#0000FF; width:450px']]);}
			aD.parentNode.insertBefore(tt, aD);
			aD.parentNode.style.backgroundColor = "#0";
			aD = null; tt = null; ta = null; sDN = null;
		};
	};
	
	//General actions
	setDefLang();
	getGeneralData();
	if (!crtPage.match(/nachrichten/)) {var aI = $xf("//input[@type!='hidden']"); if (aI) aI.focus();};//PepiX
	
	if (TB3O.U[0] == '' || TB3O.U[2] == '' || TB3O.U[3] == '' || TB3O.U[4] == '' || TB3O.U[6] == '' || crtPage.indexOf('spieler.php') != -1) getSpielerInfo();
	if (TB3O.U[5] == '') getSingleTownNewdid();
	
	if (crtPage.match(/statistiken.php/)) getStatisticsMenu();
	if (!crtPage.match(/karte2.php/)) {
		hideAd(); toJSvoid(); showBigIconsBar(); showDeleteAccount(); leftMenuLinks(); getRace(); addFillTimeRow(); getCrtLocation(); prepareDivDocking(); villageList();
		if (TB3O.plAc == false && vNames != '') addVillageNamesScript();
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
	if (crtPage.match(/karte.php($|\?z=|\?new)/) || crtPage.match(/karte.php($|\?newdid=(\d+)$)/)) mapFunctions();
	if (crtPage.match(/gid=16/) || crtPage.match(/\?id=39/)) tableTotalVillageTroopsV3();
	if (crtPage.match(/nachrichten.php($|\?t=|\?s=|\?newdid=)/) || crtPage.match(/berichte.php($|\?t=|\?s=|\?newdid=)/)) MessageOptions();
	if (crtPage.match(/nachrichten.php\?/)) convertCoordsInMessagesToLinks();
	if (crtPage.match(/berichte.php\?/)) battleReportV2("orig");
	if (crtPage.match(/spieler.php\?/) && crtPage.match(/uid/)) addPlayerStatistics();
	if (TB3O.boolIsNPCExluded == false) NPCUpdate();
	if (isPostNPC()) insertNPCHistoryLink();
	if (crtPage.match(/warsim.php/)) fillinwarsim();

	//General actions continued
	setTimers();
	if ((crtPage.match(/gid=16/) || crtPage.match(/\?id=39/)) && TB3O.O[80] == '1') showTroopInfoInTooltips();
	if (!crtPage.match(/gid=16/) && !crtPage.match(/\?id=39/) && TB3O.O[53] == '1') showTroopInfoInTooltips();
	showSearchBar();
	if (!crtPage.match(/\&t=1/)) playerLinks(dmid2);
	playerLinks("llist");
	showTBTotalRuntime();
};

window.addEventListener('load', functionMain, false);
document.body.setAttribute("onbeforeunload", '{t = null; bCost = null; uc = null; image = null; TB3O = null; wsAnalyser = null; mapAnalyser = null; repSite = null; crtResUnits = null; capacity = null; prodPerHour = null; timeToFill = null; gIc = null; vList = null; acss = null;}');
